(function () {
    angular.module('app').controller('AppController', appCtrl);
    function appCtrl($rootScope, $scope, $state, UserFactory) {
        var vm = this;
        vm.app = "App";
        vm.user = undefined;

        vm.btnClicked = btnClicked;
        vm.logOut = logOut;
        $scope.authenticate = authenticate;
        vm.logOut = logOut;

        activate();

        function activate(){

        }
        function logOut() {
          vm.user = undefined;
          delete $rootScope.user;
          $state.go("app");
        }

        function authenticate() {
          if($rootScope.user != undefined && $rootScope.user != null )
          vm.user = $rootScope.user;
          console.log("parent func");
                    console.log(vm.user);
        }


        function btnClicked(){
          console.log("button clicked");
          var promise = UserFactory.getUser("ali","abc123");
          promise.then(function(user) {
            console.log('Success: ' + user.name);
          }, function(reason) {
            console.log('Failed: ' + user);
          });
        }
    }
}());
