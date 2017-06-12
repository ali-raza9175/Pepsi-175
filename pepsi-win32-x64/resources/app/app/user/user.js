(function () {
    var app = angular.module('app.user', ['ui.router'])

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/app');
        $stateProvider
             .state('app.user', {
                  abstract : true,
                   url: '/user',
                   templateUrl: './user/user.html',
                   controller: "UserContrller as vm"
               })
               .state('app.user.list' , {
                 url:'/list',
                 templateUrl: './user/list/list.html',
                 controller: "UserListContrller as vm"
               })
               .state('app.user.edit' , {
                 url:'/edit/:id',
                 templateUrl: './user/edit/edit.html',
                 controller: "EditUserContrller as vm"
               })
             });
}());
