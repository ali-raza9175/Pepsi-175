  (function () {
      angular.module('app.user').controller('UserListContrller', userController);
      function userController($rootScope, $scope , $window, UserFactory , ConstantFactory) {
        console.log("user list");
          var vm = this;
          vm.users = [];
          vm.loggedInUser = null;
          vm.admin = ConstantFactory.admin
          vm.removeUser = removeUser;
          activate();
          function activate(){
           vm.loggedInUser = $rootScope.user;
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
              var promise = UserFactory.deleteUser(userDel._id , vm.loggedInUser._id);
              promise.then(function(response) {
                console.log("success deleted" + response);
                if(response != null && response != undefined && response > 0)
                {
                  var index=vm.users.indexOf(userDel);
                  vm.users.splice(index,1);
                  if(userDel._id == $rootScope.user._id)
                  {
                         $scope.$parent.logOut();
                  }
                }

              }, function(reason) {
                console.log('Failed: ' + reason);
              });
            }
          }
      }
  }());
