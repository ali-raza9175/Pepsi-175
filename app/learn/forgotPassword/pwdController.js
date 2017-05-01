(function () {
    angular.module('app.learn').controller('PasswordForgotController', pwdController);
    function pwdController($scope, $state, UserFactory) {
        var vm = this;
        vm.user = {};


        vm.submitForm = function(isValid) {
           vm.submitted = true;
            // check to make sure the form is completely valid
            if (isValid) {
              vm.user.updatedAt = new Date().toISOString().slice(0,10);
              vm.user.isActive = true;
              var promise = UserFactory.updateUserPassword(vm.user);
              promise.then(function(response) {
                console.log('Success: ' + response);
              }, function(reason) {
                console.log('Failed: ' + reason); 
              });

              $scope.pwdForm.$setPristine();
              $scope.pwdForm.$setUntouched();
              vm.user = {};
            }

          };

    }
}());
