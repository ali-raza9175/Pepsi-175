(function () {
    var app = angular.module('app', ['ui.router', 'app.user' ,'app.learn' ,'app.inventory' , 'app.sale' , '720kb.datepicker' , 'ui.select', 'ngSanitize'])

    app.config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/app');
        $stateProvider
               .state('app', {
                   url: '/app',
                   templateUrl: './app.html',
                   controller: "AppController as vm"
               })
    });
}());
