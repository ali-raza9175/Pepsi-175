var mainApp = angular.module('app');
mainApp.factory('CashFactory', function($q , $rootScope, ConstantFactory) {
  var factory = {};
  var Datastore = require('nedb');
  var cash = new Datastore({ filename: './db/cash.db', autoload: true });

    factory.getCash = function(date){
      return $q(
        function (resolve , reject)
        {
          cash.find({date : date} , function (err, docs){
            if(docs != null && docs != undefined)
            {
              resolve (docs);
            }
            else {
              reject ("failed" + err);
            }
          });
        }
      );
    }

    factory.getSellersCash = function(date , seller){
      return $q(
        function (resolve , reject)
        {
          cash.find({$and : [{"seller._id" : seller._id} , {date : date} , {isActive : true}]} , function (err, docs){
            if(docs != null && docs != undefined)
            {
              resolve (docs);
            }
            else {
              reject ("failed" + err);
            }
          });
        }
      );
    }

    factory.addCash = function(data){
      console.log(data);
      return $q(function (resolve , reject){
        cash.findOne({$and :[{date : data.date } , {"seller._id" : data.seller._id}]} , function (err, docs){
          if(docs == null)
          {
            if($rootScope.user != undefined && $rootScope.user != null)
            {
              data.createdBy = $rootScope.user;
            }
            data.updatedBy = null;
            data.updatedAt = null;
            data.deletedBy = null;
            data.createdAt = ConstantFactory.getCurrentDate();

            cash.insert(data , function(err, docs){
              if(err)
              reject (err.message);
              else
              resolve(docs);

            });
          }
          else {
            reject("cash already added");
          }

        });
      });
    }

    return factory;

});
