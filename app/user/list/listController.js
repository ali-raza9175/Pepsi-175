(function () {
    angular.module('app.user').controller('UserListContrller', userController);
    function userController($scope , UserFactory) {
        var vm = this;
        vm.users = [];
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
    }
}());
