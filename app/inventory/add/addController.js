(function () {
    angular.module('app.inventory').controller('InventoryAddContrller', inventoryController);
    function inventoryController($scope, $state, InventoryFactory) {
        var vm = this;
        vm.inventory = {};

        vm.submitForm = function(isValid) {
           vm.submitted = true;
            // check to make sure the form is completely valid
            if (isValid) {
              vm.inventory.createdAt = new Date().toISOString().slice(0,10);
              vm.inventory.updatedAt = null;
              vm.inventory.isActive = true;
              var promise = InventoryFactory.saveInventory(vm.inventory);
              promise.then(function(response) {
                console.log('Success: ' + response);
                $scope.inventoryForm.$setPristine();
                $scope.inventoryForm.$setUntouched();
                vm.inventory = {};
                $state.go("app.inventory.list");
              }, function(reason) {
                console.log('Failed: ' + reason);
              });

            }

          };

    }
}());
