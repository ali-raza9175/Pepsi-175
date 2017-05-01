var mainApp = angular.module('app');
mainApp.factory('InventoryFactory', function($q) {
   var factory = {};
   var Datastore = require('nedb');
   var inventory = new Datastore({ filename: './db/inventory.db', autoload: true });
   inventory.ensureIndex({fieldName : 'name'});


   factory.updateInventory = function(data)
   {
     return $q(function(resolve, reject) {
       inventory.findOne({_id: data._id }, function (err, docs) {
             if(docs != undefined && docs != null )
              {
                inventory.update({ _id: data._id} , { $set: { "isActive": true , name : data.name , price : data.price,
                             sprice : data.sprice
                            }} ,
                            {upsert: true},
                            function (err, docs)
                            {
                              if(docs != undefined && docs != null )
                              {
                                resolve (docs);
                              }
                              else{
                                reject(err);
                              }
                            });
              }
              else {
                reject(err.message);
              }
            });
      });
   }

   factory.saveInventory = function(data)
   {
     return $q(function(resolve, reject) {

       var regex = new RegExp( data.name, 'g' );
       inventory.findOne({name:  { $regex: regex } }, function (err, docs) {
            console.log("regex" +  regex);
            console.log("doc" + docs.name);
             if(docs != undefined && docs != null )
              {

                if(docs.isActive === false)
                {
                inventory.update({ name: docs.name} , { $set: { isActive: true }} ,{upsert: true}, function (err, docs) {
                    if(docs != undefined && docs != null )
                     {
                       resolve (docs);
                     }
                    else{
                      reject(err);
                         }
                     });
                  }
                  else{
                    reject("User already exists");
                  }
              }
              else {
                inventory.insert(data, function(err, doc) {
                      if(err )
                      {
                        reject("fail");
                      }
                      else{
                        resolve(doc);
                      }

                    });
              }
            });
      });
   }

   factory.getInventoryById = function(id) {

     return $q(function(resolve, reject) {
       inventory.findOne({ _id: id }, function (err, docs) {
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

   factory.removeInventory = function(id) {

     return $q(function(resolve, reject) {
       inventory.update({_id : id} , {}, function (err, docs) {
           if(docs != undefined && docs != null )
            {
              resolve (docs);
            }
           else{
             reject(err.message);
                }
            });
       });
   }

   factory.deleteInevntory = function(id) {

     return $q(function(resolve, reject) {
       inventory.update({_id : id} , { $set: { isActive: false }} ,{}, function (err, docs) {
           if(docs != undefined && docs != null )
            {
              resolve (docs);
            }
           else{
             reject(err.message);
                }
            });
       });
   }

   factory.getAllInventory = function(loggedId) {

     return $q(function(resolve, reject) {
       inventory.find({isActive : true }, function (err, docs) {
           if(docs != undefined && docs != null )
            {
              resolve (docs);
            }
           else{
             reject("fail");
                }
            });
       });
   }

   return factory;
});
