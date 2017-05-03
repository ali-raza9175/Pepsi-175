(function () {
    angular.module('app.stock').controller('StockAddController', stockController);
    function stockController($state , InventoryFactory) {
      var vm  = this;
      vm.inventories = [];
      vm.inventory = {};

      activate();

      function activate(){
      vm.inventory.date = new Date().toISOString().slice(0,10);
        var promise = InventoryFactory.getAllInventory();

        promise.then(function (response){
          vm.inventories = response;
        },function (reason){
        });
      }

    }
}());
