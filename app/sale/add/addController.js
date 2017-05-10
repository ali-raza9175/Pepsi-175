(function () {
    angular.module('app.sale').controller('SaleAddController', saleController);
    function saleController($scope , $rootScope , $state , UserFactory , InventoryFactory , SaleFactory) {
      var vm  = this;
      var date = new Date();
      var oldQuantity;
      vm.sale = {};
      vm.error = undefined;
      vm.success = undefined;
      vm.sale.saleDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
      vm.sale.seller = undefined;
      vm.sellers = undefined;
      vm.inventory = undefined;
      vm.sale.inventory = undefined;
      vm.sale.quantity = undefined;
      vm.sale.uquantity = undefined;
      vm.addSale = undefined;
      vm.sellersSell = undefined;
      vm.editSale = undefined;
      vm.getQuantity = getQuantity;
      vm.getIndQuantity = getIndQuantity;

      activate();

      function activate (){

        var promise = UserFactory.getSellers();
        promise.then(function(response) {
          vm.sellers = response;
          console.log(vm.sellers);
        }, function(reason) {
          console.log('Failed: ' + reason);
        });

        promise = InventoryFactory.getAllInventory();
        promise.then(function(response) {
          vm.inventory = response;
        }, function(reason) {
          console.log('Failed: ' + reason);
        });
      }

      function getQuantity(sale)
      {
        if(sale!= undefined && sale != null && sale != "")
        {
          return Math.floor(sale.quantity / sale.inventory.units);
        }
        return 0;
      }

      function getIndQuantity(sale){
        if(sale != undefined && sale != null && sale != "")
        {
          return sale.quantity % sale.inventory.units;
        }
        return 0;
      }

      vm.selectInventory = function (sale) {
        vm.editSale = angular.copy(sale);
        oldQuantity = sale.quantity;
        vm.editSale.quantity = Math.floor(sale.quantity / vm.editSale.inventory.units);
        vm.editSale.uquantity = sale.quantity % vm.editSale.inventory.units;
      }

      vm.selectSeller = function(){

          console.log($rootScope.user);
          get_seller_sale();
      }

      vm.selectDate = function(){

        console.log(vm.sale.saleDate);
        get_seller_sale();
      }

      function get_seller_sale (){

        var promise = SaleFactory.getSellersSales(vm.sale.saleDate, vm.sale.seller);
        promise.then(function(response) {
          vm.sellersSell =  response;
        }, function(reason) {
          console.log('Failed: ' + reason);
        });

      }

      vm.updateSale = function (){
        var quantity = vm.editSale.quantity;
        var uquantity = vm.editSale.uquantity;
        if(vm.editSale.quantity >= 0 && vm.editSale.uquantity >= 0)
        {
          var promise = InventoryFactory.getInventoryById(vm.editSale.inventory._id);
          promise.then(function(response) {
            var inventory = response;

            vm.editSale.isActive = true;
            vm.editSale.sale = vm.editSale.quantity * vm.editSale.inventory.price + vm.editSale.uquantity * vm.editSale.inventory.unit_price;
            vm.editSale.quantity = vm.editSale.quantity * vm.editSale.inventory.units + vm.editSale.uquantity;
            if(oldQuantity - vm.editSale.quantity < 0)
            {
              inventory.quantity = inventory.quantity - (vm.editSale.quantity - oldQuantity);
            }
            else {
              inventory.quantity = inventory.quantity + (oldQuantity - vm.editSale.quantity);

            }
            inventory.seller = vm.editSale.seller;
            delete vm.editSale.uquantity;
            if(inventory.quantity < 0)
            {
              vm.error = "Stock Error . stock is less than 0";
              vm.success = undefined;
              // error
            }
            else if(oldQuantity - vm.editSale.quantity != 0){
              console.log(vm.editSale);
             promise = SaleFactory.updateSales(vm.editSale);
              promise.then(function(response) {
                var updateQuantity = InventoryFactory.updatStockSale(inventory);
                updateQuantity.then(function(updateResponse){
                 // success message
                updateSaleList(vm.editSale);
                 vm.editSale = undefined;
                 vm.success = "Sale updated succesfully";
                 vm.error = undefined;
               } , function(updateReason){
                    // delete entered sale in case stock update failds
                    var deleteSale = SaleFactory.deleteSale(response , $rootScope.user);
                    deleteSale.then(function (res) {
                       // show error
                       vm.success = undefined;
                       vm.error = "Error in sale update . but sale has been deleted";
                    }, function (reason){
                       // big trouble here
                       // show error
                       vm.success = undefined;
                       vm.error = "Big trouble ! Db file has been corrupted";
                    });

                })
              }, function(reason) {
                // show error
                vm.editSale.quantity = quantity;
                vm.editSale.uquantity = uquantity;
                console.log('Failed: ' + reason);
              });
            }
          }, function(reason) {
            console.log('Failed: ' + reason);
          });
        }

      }


      function updateSaleList(inv){

        for (var i =0 ; i <  vm.sellersSell.length ; i++)
        {
          if(vm.sellersSell[i]._id == inv._id)
          {
            vm.sellersSell[i].quantity = inv.quantity;
            vm.sellersSell[i].sale = inv.sale;
          }
        }

      }

      vm.showError = function (quantity) {
        console.log(quantity);
        if(quantity >= 0)
        return;

          return "quantity is required";
      }

      vm.submitForm = function(isValid){

        var quantity = vm.sale.quantity;
        var uquantity = vm.sale.uquantity;
        if(isValid)
        {
          var inventory = vm.sale.inventory;
          inventory.seller = vm.sale.seller;
          vm.sale.isActive = true;
          vm.sale.sale = vm.sale.quantity * vm.sale.inventory.price + vm.sale.uquantity * vm.sale.inventory.unit_price;
          vm.sale.quantity = vm.sale.quantity * vm.sale.inventory.units + vm.sale.uquantity;
          inventory.quantity = inventory.quantity - vm.sale.quantity;
          inventory.seller = vm.sale.seller;
          delete vm.sale.uquantity;
          delete vm.sale.seller.$$hashKey;
          delete vm.sale.inventory.$$hashKey;
          if(inventory.quantity < 0)
          {
            // error
          }
          else {
            console.log(vm.sale);
            var promise = SaleFactory.addSales(vm.sale);
            promise.then(function(response) {
              var updateQuantity = InventoryFactory.updatStockSale(inventory);
              updateQuantity.then(function(updateResponse){
               // success message
               vm.sale.quantity = 0;
               vm.sale.uquantity = 0;
               vm.saleForm.$setPristine();
               vm.saleForm.$setUntouched();
             } , function(updateReason){
                  // delete entered sale in case stock update failds
                  var deleteSale = SaleFactory.deleteSale(response , $rootScope.user);
                  deleteSale.then(function (res) {
                     // show error
                  }, function (reason){
                     // biug trouble here
                     // show error
                  });

              })
            }, function(reason) {
              // show error
              vm.sale.quantity = quantity;
              vm.sale.uquantity = uquantity;
              console.log('Failed: ' + reason);
            });
          }
          console.log(inventory);
          console.log(vm.sale);
        }
      }

    }
}());
