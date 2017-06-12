(function () {
    angular.module('app.user').controller('EditUserContrller', registerController);
    function registerController($scope, $state, $stateParams, UserFactory , ConstantFactory) {
        var vm = this;
        vm.submitted = false;
        vm.user = {};
        vm.roles = [ConstantFactory.admin,ConstantFactory.seller];

        activate();

        function activate(){
          var id = $stateParams.id;
          var promise = UserFactory.getUserById(id);
          promise.then(function(response) {
            vm.user = response;
            console.log(vm.user);
          }, function(reason) {
            console.log('Failed: ' + reason);
          });
        }

        vm.submitForm = function(isValid) {
           vm.submitted = true;
            // check to make sure the form is completely valid
            if (isValid) {
              vm.user.isActive = true;
              console.log(vm.user);
              var promise = UserFactory.updateUser(vm.user);
              promise.then(function(response)
              {
                $scope.registerForm.$setPristine();
                $scope.registerForm.$setUntouched();
                vm.user = {};
                $state.go("app.user.list");
              }, function(response) {
                console.log("user updation failed" + response);
              });
            }

          };

    }
}());
