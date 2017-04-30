(function () {
    angular.module('app.user').controller('UserListContrller', userController);
    function userController($scope , $window, UserFactory) {
        var vm = this;
        vm.users = [];
        vm.removeUser = removeUser;
        console.log("list controller");

        activate();

        function activate(){
          var promise = UserFactory.getAllUser();
          promise.then(function(response) {
            vm.users = response;
          }, function(reason) {
            console.log('Failed: ' + reason);
          });
        }

        function removeUser (id)
        {
          var deleteUser = $window.confirm('Are you absolutely sure you want to delete?');

          if (deleteUser) {
            console.log(id);
          }
        }
    }
}());
