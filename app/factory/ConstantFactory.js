  var constantFactory = angular.module('app');
constantFactory.factory('ConstantFactory' , function(){

      var factory = {};
      factory.admin = "admin";
      factory.seller = "seller";
      return factory;
});
