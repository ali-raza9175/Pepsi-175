(function () {
    angular.module('app.sale').controller('SaleAddController', saleController);
    function saleController($scope , $rootScope , $state , UserFactory , InventoryFactory , SaleFactory) {
      var vm  = this;
      var date = new Date();
      vm.sale = {};

      vm.sale.saleDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
      vm.sale.seller = undefined;
      vm.sellers = undefined;
      vm.inventory = undefined;
      vm.sale.inventory = undefined;
      vm.sale.quantity = undefined;
      vm.sale.uquantity = undefined;
      vm.addSale = undefined;
      vm.sellersSell = undefined;
      vm.selectSeller = function(){

        console.log(vm.sale.seller);
        console.log($rootScope.user);
        var promise = SaleFactory.getSellersSales(vm.sale.seller);
        promise.then(function(response) {
          vm.sellersSell =  response;
        }, function(reason) {
          console.log('Failed: ' + reason);
        });
      }

      vm.selectDate = function(){

        console.log(vm.sale.saleDate);
      }

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
          inventory.updatedAt = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
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
               $scope.saleForm.$setPristine();
               $scope.saleForm.$setUntouched();
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
