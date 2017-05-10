(function(){
var sale = angular.module('app.sale', ['ui.router']);

sale.config(function ($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('/app');
  $stateProvider
       .state('app.sale', {
            abstract : true,
             url: '/sale',
             templateUrl: './sale/sale.html',
             controller: "SaleContrller as learn"
         })
         .state('app.sale.add' , {
           url: '/add',
           templateUrl : './sale/add/add.html',
           controller : 'SaleAddController as vm'
         })
         .state('app.sale.cash' , {
           url: '/cash',
           templateUrl : './sale/cash/cash.html',
           controller : 'SaleCashController as vm'
         })

});

}());
