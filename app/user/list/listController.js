(function () {
    angular.module('app.user').controller('UserListContrller', userController);
    function userController($rootScope, $scope , $window, UserFactory) {
      console.log("user list");
        var vm = this;
        vm.users = [];
        vm.removeUser = removeUser;
        activate();
        function activate(){
          var promise = UserFactory.getAllUser($rootScope.user._id);
          promise.then(function(response) {
            vm.users = response;
            console.log("users");
            console.log(vm.users);
          }, function(reason) {
            console.log('Failed: ' + reason);
          });
        }

        function removeUser (userDel)
        {
          var deleteUser = $window.confirm('Are you absolutely sure you want to delete?');
            console.log(userDel);
          if (deleteUser) {
            var promise = UserFactory.deleteUser(userDel._id);
            promise.then(function(response) {
              console.log("success deleted" + response);
              if(response != null && response != undefined && response > 0)
              {
                var index=vm.users.indexOf(userDel);
                vm.users.splice(index,1);
              }

            }, function(reason) {
              console.log('Failed: ' + reason);
            });
          }
        }
    }
}());
