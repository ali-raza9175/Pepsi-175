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
            // check to make sure the form is completely valid
            if (isValid) {
              var date = new Date();
              vm.user.createdAt =  new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
              vm.user.role = vm.user.role.Name;
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
