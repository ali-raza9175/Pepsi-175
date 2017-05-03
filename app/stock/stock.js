(function(){

  var app = angular.module('app.stock', ['ui.router'])

  app.config(function ($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/app');
      $stateProvider
           .state('app.stock', {
                abstract : true,
                 url: '/stock',
                 templateUrl: './stock/stock.html',
                 controller: "StockContrller as stock"
             })
             .state('app.stock.detail', {
                   url: '/detail',
                   templateUrl: './stock/details/details.html',
                   controller: "StockDetailsContrller as vm"
               })
             .state('app.stock.add', {
                   url: '/add',
                   templateUrl: './stock/add/add.html',
                   controller: "StockAddController as vm"
               })
           });

}());
