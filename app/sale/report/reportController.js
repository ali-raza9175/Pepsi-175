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
      vm.totalCollection = 0;
      vm.collection = 0;
      vm.discount = 0;
      vm.recovery = 0;
      vm.lentMoney = 0;
      vm.eCollection = 0;
      vm.sellers = undefined;


      activate();

      function activate (){
        getData();

       promise = UserFactory.getSellers();
        promise.then(function(response) {
          vm.sellers = response;
          console.log(vm.sellers);
        }, function(reason) {
          console.log('Failed: ' + reason);
        });

      }

      function getData () {

        vm.totalCollection = 0;
        vm.collection = 0;
        vm.discount = 0;
        vm.recovery = 0;
        vm.lentMoney = 0;
        vm.eCollection = 0;

          var promise = CashFactory.getCashByDate(vm.date);
          promise.then(function(response) {
          vm.cashDetails = response;
         getTotalCollection();
          }, function(reason) {
            console.log('Failed: ' + reason);
            vm.error = "Error while fetching cash details";
            vm.success = undefined;

          });

          promise = SaleFactory.getSalesByDate(vm.date);
         promise.then(function(response) {
            vm.saleDetails = response;
            console.log(vm.saleDetails);
                   getExpectedCollection();
         }, function(reason) {
           console.log('Failed: ' + reason);
           vm.error = "Error while fetching sale details";
           vm.success = undefined;

         });
      }

       function getTotalCollection (){

        if(vm.cashDetails == undefined || (vm.cashDetails != undefined && vm.cashDetails.length < 1))
        return ;

        for(var i= 0 ;i < vm.cashDetails.length ; i++)
        {
          vm.collection += vm.cashDetails[i].cash;
          vm.discount += vm.cashDetails[i].discount;
          vm.recovery += vm.cashDetails[i].recovery;
          vm.lentMoney += vm.cashDetails[i].lendmoney;
        }
        vm.totalCollection = vm.collection + vm.discount + vm.recovery + vm.lentMoney;
      }


        function getExpectedCollection (){

        if(vm.saleDetails == undefined || (vm.saleDetails != undefined && vm.saleDetails.length < 1))
        return;


        for(var i= 0 ;i < vm.saleDetails.length ; i++)
        {
          vm.eCollection += vm.saleDetails[i].sale;
        }
      }

      vm.getExpCollectionBySeller = function (id)
      {
        if(vm.saleDetails == undefined || (vm.saleDetails != undefined && vm.saleDetails.length < 1))
        return 0 ;

        var eCollection = 0;
        for(var i= 0 ;i < vm.saleDetails.length ; i++)
        {
          if(vm.saleDetails[i].seller._id == id)
          eCollection += vm.saleDetails[i].sale;
        }

        return eCollection;
      }
      vm.getLentMoneyBySeller = function (id)
      {
        if(vm.cashDetails == undefined || (vm.cashDetails != undefined && vm.cashDetails.length < 1))
        return 0;

        var lentMoney = 0;
        for(var i= 0 ;i < vm.cashDetails.length ; i++)
        {
          if(vm.cashDetails[i].seller._id == id)
          lentMoney += vm.cashDetails[i].lendmoney;
        }
        return lentMoney;
      }
      vm.getRecoveryBySeller = function (id)
      {
        if(vm.cashDetails == undefined || (vm.cashDetails != undefined && vm.cashDetails.length < 1))
        return 0;

        var recovery = 0;
        for(var i= 0 ;i < vm.cashDetails.length ; i++)
        {
          if(vm.cashDetails[i].seller._id == id)
          recovery += vm.cashDetails[i].recovery;
        }
        return recovery;
      }
      vm.getDiscountBySeller = function (id)
      {
        if(vm.cashDetails == undefined || (vm.cashDetails != undefined && vm.cashDetails.length < 1))
        return 0;

        var discount = 0;
        for(var i= 0 ;i < vm.cashDetails.length ; i++)
        {
          if(vm.cashDetails[i].seller._id == id)
          discount += vm.cashDetails[i].discount;
        }
        return discount;
      }
      vm.getCollectionBySeller = function (id)
      {
        if(vm.cashDetails == undefined || (vm.cashDetails != undefined && vm.cashDetails.length < 1))
        return 0;

        var collection = 0;
        for(var i= 0 ;i < vm.cashDetails.length ; i++)
        {
          if(vm.cashDetails[i].seller._id == id)
          collection += vm.cashDetails[i].cash;
        }
        return collection;
      }

      vm.selectDate = function () {
          getData();
      }

      vm.getQuantity = function (sale)
      {
        if(sale!= undefined && sale != null && sale != "")
        {
          return Math.floor(sale.quantity / sale.inventory.units);
        }
        return 0;
      }

      vm.getIndQuantity = function (sale){
        if(sale != undefined && sale != null && sale != "")
        {
          return sale.quantity % sale.inventory.units;
        }
        return 0;
      }
    }


}());
