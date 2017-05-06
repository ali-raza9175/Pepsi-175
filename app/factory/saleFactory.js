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

    factory.addSales = function(data){
      return $q(
        sale.findOne({$and :[{data : data.date } , {"seller._id" , data.seller._id} , {"inventory._id"  , data.inventory._id}]} , function (err, docs){
          if(docs == null)
          {
            sale.insert(data , function(err, docs){
              if(err)
              reject (err);
              else
              resolve(docs);

            });
          }
          else {
            reject("Sale already added");
          }

        });
      );
    }
    return factory;

});
