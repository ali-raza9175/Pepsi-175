(function () {
    angular.module('app.sale').controller('ReportController', saleController);
    function saleController($scope , $rootScope , $state , UserFactory , CashFactory , SaleFactory) {
      var vm  = this;
      var date = new Date();
      vm.date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
      vm.cashDetails = undefined;
      vm.saleDetails = undefined;
      vm.error = undefined;
      vm.success = undefined;

      activate();

      function activate (){
        var promise = CashFactory.getCashByDate(vm.date);
        promise.then(function(response) {
        vm.cashDetails = response;
                  console.log(vm.cashDetails);
        }, function(reason) {
          console.log('Failed: ' + reason);
          vm.error = "Error while fetching cash details";
          vm.success = undefined;

        });

        promise = SaleFactory.getSalesByDate(vm.date);
       promise.then(function(response) {
          vm.saleDetails = response;
          console.log(vm.saleDetails);
       }, function(reason) {
         console.log('Failed: ' + reason);
         vm.error = "Error while fetching sale details";
         vm.success = undefined;

       });

      }


    }
}());
