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
              var quantity = vm.inventory.quantity;
              var uQuantity = vm.inventory.uquantity;
              vm.inventory.quantity = parseInt(vm.inventory.quantity);
              vm.inventory.units = parseInt(vm.inventory.units);
              vm.inventory.uquantity = parseInt(vm.inventory.uquantity);
              vm.inventory.seller = null;
              vm.inventory.isActive = true;
              vm.inventory.quantity = vm.inventory.quantity * vm.inventory.units + vm.inventory.uquantity;
              vm.inventory.unit_price = Math.floor(vm.inventory.price / vm.inventory.units);
              delete vm.inventory.uquantity;
              var promise = InventoryFactory.saveInventory(vm.inventory);
              promise.then(function(response) {
                console.log('Success: ' + response);
                $scope.inventoryForm.$setPristine();
                $scope.inventoryForm.$setUntouched();
                vm.inventory = {};
                $state.go("app.inventory.list");
              }, function(reason) {
                vm.inventory.quantity = quantity;
                vm.inventory.uquantity = uquantity;
                console.log('Failed: ' + reason);
              });

            }

          };

    }
}());
