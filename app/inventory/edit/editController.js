(function () {
    angular.module('app.inventory').controller('EditInventoryContrller', inventoryController);
    function inventoryController($scope, $state, $stateParams, InventoryFactory) {
        var vm = this;
        vm.inventory = {};

        activate();

        function activate(){
          var id = $stateParams.id;
          var promise = InventoryFactory.getInventoryById(id);
          promise.then(function(response) {
            vm.inventory = response;
          }, function(reason) {
            console.log('Failed: ' + reason);
          });
        }

        vm.submitForm = function(isValid) {
            if (isValid) {
              var date = new Date();
              vm.inventory.updatedAt=  new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
              vm.inventory.isActive = true;
              var promise = InventoryFactory.updateInventory(vm.inventory);
              promise.then(function(response)
              {
                $scope.inventoryForm.$setPristine();
                $scope.inventoryForm.$setUntouched();
                vm.inventory = {};
                console.log("inventory update to ");
                console.log(response);
                $state.go("app.inventory.list");
              }, function(response) {
                console.log("user updation failed" + response);
              });
            }

          };

    }
}());
