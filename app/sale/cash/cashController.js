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
      vm.sellersSaleCash = undefined;
      vm.addCash = undefined;
      vm.AddCashForm = AddCashForm;
      vm.editSaleCash = undefined;
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

      vm.selectDate = function () {
        get_seller_cash();
      }


      function get_seller_cash (){

        if(vm.cash.seller)
        {
          var promise = CashFactory.getSellersCash(vm.cash.date, vm.cash.seller);
          promise.then(function(response) {
            vm.sellersSaleCash =  response;
          }, function(reason) {
            console.log('Failed: ' + reason);
          });
        }

      }

      vm.selectSaleCash = function (sale) {
        vm.editSaleCash = angular.copy(sale);
      }



      vm.showError = function (cash) {

        if(cash >= 0)
        return;

          return "Field is required!";
      }

      function AddCashForm (isValid){

        if(isValid)
        {
          delete vm.cash.seller.$$hashKey;
          var promise = CashFactory.addCash(vm.cash);
          promise.then(function(response) {
            vm.error = undefined;
            vm.success = "Sale's cash added succesfully!";
          }, function(reason) {
            console.log('Failed: ' + reason);
            vm.error = "Error while adding cash";
            vm.success = undefined;

          });
        }
        else{
        }


      }


      vm.updateSaleCash = function (){

          var promise = CashFactory.updateSaleCash(vm.editSaleCash);
          promise.then(function(response) {
            vm.error = undefined;
            vm.success = "Sale's cash Updated succesfully!";
            updateSaleCashList(vm.editSaleCash);
            vm.editSaleCash = undefined;

          }, function(reason) {
            console.log('Failed: ' + reason);
          })
        }

        function updateSaleCashList(saleCash){

          for (var i =0 ; i <  vm.sellersSaleCash.length ; i++)
          {
            if(vm.sellersSaleCash[i]._id == saleCash._id)
            {
              vm.sellersSaleCash[i].cash = saleCash.cash;
              vm.sellersSaleCash[i].discount = saleCash.discount;
              vm.sellersSaleCash[i].recovery = saleCash.recovery;
              vm.sellersSaleCash[i].lendmoney = saleCash.lendmoney;
            }
          }

        }

    }
}());
