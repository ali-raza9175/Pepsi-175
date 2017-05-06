(function () {
    angular.module('app.sale').controller('SaleAddController', saleController);
    function saleController($state , UserFactory , InventoryFactory) {
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
      vm.selectSeller = function(){

        console.log(vm.sale.seller);
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

      vm.submitForm = function(){
          var inventory = vm.sale.inventory;
          inventory.seller = vm.sale.seller;
          inventory.quantity = inventory.quantity - (vm.sale.quantity * vm.sale.inventory.units + vm.sale.uquantity) ;
          inventory.updatedAt = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);

          if(inventory.quantity < 0)
          {
            // error
          }
          console.log(inventory);
        console.log(vm.sale);
      }

    }
}());
