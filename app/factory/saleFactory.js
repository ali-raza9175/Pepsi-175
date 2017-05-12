var mainApp = angular.module('app');
mainApp.factory('SaleFactory', function($q , $rootScope, ConstantFactory) {
  var factory = {};
  var Datastore = require('nedb');
  var sale = new Datastore({ filename: './db/sale.db', autoload: true });

    factory.getSales = function(date){
      return $q(
        function (resolve , reject)
        {
          sale.find({date : date} , function (err, docs){
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

    factory.getSellersSales = function(saleDate , seller){
      return $q(
        function (resolve , reject)
        {
          sale.find({$and : [{"seller._id" : seller._id} , {saleDate : saleDate} , {isActive : true}]} , function (err, docs){
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


    factory.getSalesByDate = function(saleDate){
      return $q(
        function (resolve , reject)
        {
          sale.find({$and : [{saleDate : saleDate} , {isActive : true}]} , function (err, docs){
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

    factory.addSales = function(data){
      console.log(data);
      return $q(function (resolve , reject){
        sale.findOne({$and :[{saleDate : data.saleDate } , {"seller._id" : data.seller._id} , {"inventory._id"  : data.inventory._id}]} , function (err, docs){
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

            sale.insert(data , function(err, docs){
              if(err)
              reject (err.message);
              else

              resolve(docs);
            });
          }
          else {
            reject("Sale already added");
          }

        });
      });
    }

    factory.updateSales = function(data){
      console.log(data);
      return $q(function (resolve , reject){

            sale.update({'_id' : data._id},{$set : {quantity : data.quantity , sale : data.sale , updatedBy  : $rootScope.user , updatedAt: ConstantFactory.getCurrentDate()}} , function(err, docs){
              if(err)
              reject (err.message);
              else
              resolve(docs);

            });

      });
    }

    factory.deleteSale = function(id, deletedBy) {

      return $q(function(resolve, reject) {
        sale.update({_id : id} , { $set: { isActive: false  , deletedBy : $rootScope.user }} ,{}, function (err, docs) {
            if(docs != undefined && docs != null )
             {
               resolve (docs);
             }
            else{
              reject(err);
                 }
             });
        });
    }

    return factory;

});
