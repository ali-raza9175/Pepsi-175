var mainApp = angular.module('app');
mainApp.factory('UserFactory', function($q) {
   var factory = {};
   var Datastore = require('nedb');
   var users = new Datastore({ filename: './db/users.db', autoload: true });
   users.ensureIndex({fieldName : 'username'});

   factory.saveUser = function(userInfo)
   {
     return $q(function(resolve, reject) {
       users.findOne({username: userInfo.username }, function (err, docs) {
            console.log("error" + err);
            console.log("doc" + docs);
             if(docs != undefined && docs != null )
              {
                if(docs.isActive === false)
                {
                users.update({ username: userInfo.username} , { $set: { isActive: true }} ,{upsert: true}, function (err, docs) {
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
                users.insert(userInfo, function(err, doc) {
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

   factory.getUser = function(username, password) {

     return $q(function(resolve, reject) {
       users.findOne({$and:[{ password: password }, { username: username } , {isActive : true}]}, function (err, docs) {
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

   factory.getUserById = function(id) {

     return $q(function(resolve, reject) {
       users.findOne({ _id: id }, function (err, docs) {
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

   factory.removeUser = function(id) {

     return $q(function(resolve, reject) {
       users.update({_id : id} , {}, function (err, docs) {
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

   factory.deleteUser = function(id) {

     return $q(function(resolve, reject) {
       users.update({_id : id} , { $set: { isActive: false }} ,{}, function (err, docs) {
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

   factory.getAllUser = function(loggedId) {

     return $q(function(resolve, reject) {
       users.find({$and:[{isActive : true} , {_id : {$ne : loggedId}}]}, function (err, docs) {
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
