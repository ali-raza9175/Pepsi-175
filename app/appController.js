(function () {
    angular.module('app').controller('AppController', appCtrl);
    function appCtrl(UserFactory , $state) {
        var vm = this;
        vm.app = "App";

        vm.btnClicked = btnClicked;
        activate();

        function activate(){


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
