(function () {
    angular.module('app.inventory').controller('StockContrller', stockController);
    function stockController($scope, $rootScope, $state, $stateParams, InventoryFactory) {
        var vm = this;
        vm.inventory = {};
        vm.inventoryUpdate = {};
        vm.inventoryUpdate.quantity = 0;
        vm.inventoryUpdate.uquantity = 0;

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

        vm.AddStock = function() {

              var date = new Date();
              vm.inventory.updatedAt=  new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
              vm.inventory.isActive = true;
              vm.inventory.updatedBy = $rootScope.user;
              vm.inventoryUpdate.quantity = vm.inventoryUpdate.quantity;
              vm.inventory.units = vm.inventory.units;
              vm.inventoryUpdate.uquantity =vm.inventoryUpdate.uquantity;
              vm.inventory.quantity =  vm.inventory.quantity + (vm.inventoryUpdate.quantity * vm.inventory.units + vm.inventoryUpdate.uquantity);

              update_stock(vm.inventory);

          };

          vm.RemoveStock = function() {

                var date = new Date();
                vm.inventory.updatedAt=  new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
                vm.inventory.isActive = true;
                vm.inventory.updatedBy = $rootScope.user;
                vm.inventoryUpdate.quantity = vm.inventoryUpdate.quantity;
                vm.inventory.units = vm.inventory.units;
                vm.inventoryUpdate.uquantity = vm.inventoryUpdate.uquantity;
                vm.inventory.quantity =  vm.inventory.quantity - (vm.inventoryUpdate.quantity * vm.inventory.units + vm.inventoryUpdate.uquantity)
                if(vm.inventory.quantity > 0)
                {
                    update_stock(vm.inventory);
                }
                else{

                  // Error
                }

            };

            function update_stock (inventory) {

              var promise = InventoryFactory.updatStock(inventory);
              promise.then(function(response) {
                $state.go('app.inventory.list');
              }, function(reason) {
                console.log('Failed: ' + reason);
              });

            }

    }
}());
