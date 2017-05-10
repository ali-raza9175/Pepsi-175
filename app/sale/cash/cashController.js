(function () {
    angular.module('app.sale').controller('SaleCashController', cashController);
    function cashController($scope , $rootScope , $state , UserFactory , CashFactory) {
      var vm  = this;
      var date = new Date();
      vm.cash = {};
      vm.error = undefined;
      vm.success = undefined;
      vm.cash.date = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
      vm.cash.seller = undefined;
      vm.sellers = undefined;
      vm.sellersCash = undefined;
      vm.addCash = undefined;
      vm.AddCashForm = AddCashForm;

      activate();

      function activate (){

        var promise = UserFactory.getSellers();
        promise.then(function(response) {
          vm.sellers = response;
          console.log(vm.sellers);
        }, function(reason) {
          console.log('Failed: ' + reason);
        });
    }

      vm.selectSeller = function(){

          get_seller_cash();
      }


      function get_seller_cash (){

        var promise = CashFactory.getSellersCash(vm.cash.date, vm.cash.seller);
        promise.then(function(response) {
          vm.sellersCash =  response;
        }, function(reason) {
          console.log('Failed: ' + reason);
        });

      }



      vm.showError = function (cash) {
        console.log(cash);
        if(cash >= 0)
        return;

          return "quantity is required";
      }

      function AddCashForm (isValid){

        if(isValid)
        {
          console.log(vm.cash);
        }
        else{
          console.log("not valid");
        }


      }

    }
}());
