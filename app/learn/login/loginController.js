(function () {
    angular.module('app.learn').controller('LoginContrller', loginController);
    function loginController($rootScope, $scope, $state , UserFactory) {
        var vm = this;
        vm.forgotPwd = false;
        vm.user = {};
        vm.error = undefined;

        vm.submitForm = function(isValid) {
            // check to make sure the form is completely valid
            if (isValid) {
              var promise = UserFactory.getUser(vm.user.username , vm.user.password);
              promise.then(function(response) {
                $rootScope.user = response;
                $scope.$parent.authenticate();
                console.log('Success: ' + response);
                $state.go("app.user.list");
              }, function(reason) {
                vm.forgotPwd = true;
                vm.error = "Invalid Credentials";
                console.log('Failed: ' + reason);
              });

            }

          };

    }
}());
