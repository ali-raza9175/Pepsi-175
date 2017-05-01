(function () {
    angular.module('app.inventory').controller('InventoryListContrller', inventoryController);
    function inventoryController($rootScope, $scope , $window, InventoryFactory) {
        var vm = this;
        vm.inventory = [];
        vm.removeInventory = removeUser;
        activate();

        function activate(){
          var promise = InventoryFactory.getAllInventory();
          promise.then(function(response) {
            vm.inventory = response;
          }, function(reason) {
            console.log('Failed: ' + reason);
          });
        }

        function removeUser (inventoryDel)
        {
          var deleteInv = $window.confirm('Are you absolutely sure you want to delete?');

          if (deleteInv) {
            var promise = InventoryFactory.deleteInevntory(inventoryDel._id , $rootScope.user._id);
            promise.then(function(response) {
              console.log("success deleted" + response);
              if(response != null && response != undefined && response > 0)
              {
                var index=vm.inventory.indexOf(inventoryDel);
                vm.inventory.splice(index,1);
              }

            }, function(reason) {
              console.log('Failed: ' + reason);
            });
          }
        }
    }
}());
