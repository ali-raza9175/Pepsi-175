(function () {
    var app = angular.module('app.inventory', ['ui.router'])

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/app');
        $stateProvider
             .state('app.inventory', {
                  abstract : true,
                   url: '/inventory',
                   templateUrl: './inventory/inventory.html',
                   controller: "InventoryContrller as vm"
               })
               .state('app.inventory.add' , {
                 url:'/add',
                 templateUrl: './inventory/add/add.html',
                 controller: "InventoryAddContrller as vm"
               })
               .state('app.inventory.list' , {
                 url:'/list',
                 templateUrl: './inventory/list/list.html',
                 controller: "InventoryListContrller as vm"
               })
               .state('app.inventory.edit' , {
                 url:'/edit/:id',
                 templateUrl: './inventory/edit/edit.html',
                 controller: "EditInventoryContrller as vm"
               })
             });
}());
