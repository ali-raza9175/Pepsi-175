var mainApp = angular.module('app');
mainApp.factory('SaleFactory', function($q) {
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

    factory.addSales = function(data){
      console.log(data);
      return $q(function (resolve , reject){
        sale.findOne({$and :[{saleDate : data.saleDate } , {"seller._id" : data.seller._id} , {"inventory._id"  : data.inventory._id}]} , function (err, docs){
          if(docs == null)
          {
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

            sale.update({'_id' : data._id},{$set : {quantity : data.quantity , sale : data.sale}} , function(err, docs){
              if(err)
              reject (err.message);
              else
              resolve(docs);

            });

      });
    }

    factory.deleteSale = function(id, deletedBy) {

      return $q(function(resolve, reject) {
        sale.update({_id : id} , { $set: { isActive: false  , deletedBy : deletedBy }} ,{}, function (err, docs) {
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
