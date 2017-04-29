(function () {
    var app = angular.module('app.learn', ['ui.router'])

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/app');
        $stateProvider
             .state('app.learn', {
                  abstract : true,
                   url: '/learn',
                   templateUrl: './learn/learn.html',
                   controller: "LearnContrller as learn"
               })
               .state('app.learn.login', {
                     url: '/login',
                     templateUrl: './learn/login/login.html',
                     controller: "LoginContrller as vm"
                 })
               .state('app.learn.register', {
                     url: '/register',
                     templateUrl: './learn/register/register.html',
                     controller: "RegisterController as vm"
                 })
             });
}());
