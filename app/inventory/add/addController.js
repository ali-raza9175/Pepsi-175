(function () {
    angular.module('app.inventory').controller('InventoryAddContrller', inventoryController);
    function inventoryController($scope, $rootScope, $state, InventoryFactory) {
        var vm = this;
        vm.inventory = {};

        vm.submitForm = function(isValid) {
           vm.submitted = true;
            // check to make sure the form is completely valid
            if (isValid) {
              var date = new Date();
              vm.inventory.createdAt=  new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
              vm.inventory.createdBy = $rootScope.user;
              vm.inventory.quantity = parseInt(vm.inventory.quantity);
              vm.inventory.units = parseInt(vm.inventory.units);
              vm.inventory.uquantity = parseInt(vm.inventory.uquantity);
              vm.inventory.updatedAt = null;
              vm.inventory.isActive = true;
              vm.inventory.quantity = vm.inventory.quantity * vm.inventory.units + vm.inventory.uquantity;
              vm.inventory.unit_price = Math.floor(vm.inventory.price / vm.inventory.units);
              var promise = InventoryFactory.saveInventory(vm.inventory);
              promise.then(function(response) {
                console.log('Success: ' + response);
                $scope.inventoryForm.$setPristine();
                $scope.inventoryForm.$setUntouched();
                vm.inventory = {};
                $state.go("app.inventory.list");
              }, function(reason) {
                vm.inventory.quantity = (vm.inventory.quantity -vm.inventory.uquantity) / vm.inventory.units; 
                console.log('Failed: ' + reason);
              });

            }

          };

    }
}());
