(function () {
    angular.module('app.learn').controller('RegisterController', registerController);
    function registerController($scope, $state, UserFactory , ConstantFactory) {
        var vm = this;
        vm.submitted = false;
        vm.user = {};
        vm.error = undefined;
        vm.success = undefined;
        vm.roles = [{Name:ConstantFactory.admin, value:ConstantFactory.admin},{Name:ConstantFactory.seller, value:ConstantFactory.seller}];


        vm.submitForm = function(isValid) {
           vm.submitted = true;

            if (isValid) {
              vm.user.role = vm.user.role.Name;
              vm.user.isActive = true;
              var promise = UserFactory.saveUser(vm.user);
              promise.then(function(response) {
                vm.success = "A new user has been added";
                vm.error - undefined;
              }, function(reason) {
                console.log('Failed: ' + reason);
                vm.success = undefined;
                vm.error = "Something went wrong while adding user";
              });

              $scope.registerForm.$setPristine();
              $scope.registerForm.$setUntouched();
              vm.user = {};
            }

          };

    }
}());
