(function () {
    angular.module('app.learn').controller('RegisterController', registerController);
    function registerController($scope, $state, UserFactory) {
        var vm = this;
        vm.submitted = false;
        vm.user = {};
        vm.error = undefined;
        vm.success = undefined;
        vm.roles = [{Name:"Admin", value:"Admin"},{Name:"Seller", value:"Seller"}];


        vm.submitForm = function(isValid) {
           vm.submitted = true;
            // check to make sure the form is completely valid
            if (isValid) {
              vm.user.role = vm.user.role.Name;
              vm.user.createdAt = new Date().toISOString().slice(0,10);
              vm.user.updatedAt = null;
              vm.user.isActive = true;
              var promise = UserFactory.saveUser(vm.user);
              promise.then(function(response) {
                console.log('Success: ' + response);
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
