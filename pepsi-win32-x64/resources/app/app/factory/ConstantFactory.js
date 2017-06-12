  var constantFactory = angular.module('app');
constantFactory.factory('ConstantFactory' , function(){

      var factory = {};
      factory.admin = "admin";
      factory.seller = "seller";
      factory.createdAt = "createdAt";
      factory.updatedAt = "updatedAt";
      factory.createdBy = "createdBy";
      factory.updatedBy = "updatedBy";
      factory.deletedBy = "deletedBy";
      factory.getCurrentDate = function (){

        var date = new Date();
        return  new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString().slice(0,10);
      }
      return factory;
});
