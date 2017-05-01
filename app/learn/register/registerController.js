(function () {
    angular.module('app.learn').controller('RegisterController', registerController);
    function registerController($scope, UserFactory) {
        var vm = this;
        vm.submitted = false;
        vm.user = {};
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
              }, function(reason) {
                console.log('Failed: ' + reason);
              });

              $scope.registerForm.$setPristine();
                               $scope.registerForm.$setUntouched();
              vm.user = {};
            }

          };

    }
}());
