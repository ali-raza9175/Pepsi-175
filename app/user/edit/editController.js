(function () {
    angular.module('app.user').controller('EditUserContrller', registerController);
    function registerController($scope, $stateParams, UserFactory) {
        var vm = this;
        vm.submitted = false;
        vm.user = {};
        vm.roles = ["Admin","Seller"];

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
              vm.user.createdAt = new Date().toISOString().slice(0,10);
              vm.user.isActive = true;
              console.log(vm.user);
              var promise = UserFactory.removeUser(vm.user._id);
              promise.then(function(response) {
                console.log('Success: deletion' + response);
                delete vm.user._id;
                console.log(vm.user);
                var promise = UserFactory.saveUser(vm.user);
                promise.then(function(reponse)
                {
                  $scope.registerForm.$setPristine();
                  $scope.registerForm.$setUntouched();
                  vm.user = {};
                  console.log("user update to ");
                  console.log(response);
                }, function(response) {

                  console.log("user updation failed" + response);

                });
              }, function(reason) {
                console.log('deletion Failed: ' + reason);
              });
            }

          };

    }
}());
