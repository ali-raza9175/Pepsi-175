var mainApp = angular.module('app');
mainApp.factory('UserFactory', function($q) {
   var factory = {};
   var Datastore = require('nedb');
   var users = new Datastore({ filename: './db/users.db', autoload: true });
   users.ensureIndex({fieldName : 'username'});

   factory.saveUser = function(userInfo)
   {
     return $q(function(resolve, reject) {
       users.findOne({ $and: [{ password: userInfo.password }, { username: userInfo.username }] }, function (err, docs) {
            console.log("error" + err);
            console.log("doc" + docs);
             if(docs != undefined && docs != null )
              {
                reject("user already exists");
              }
              else {
                users.insert(userInfo, function(err, doc) {
                      if(err )
                      {
                        reject("fail");
                      }
                      else{
                        resolve(doc.name);
                      }

                    });
              }
            });
      });
   }

   factory.getUser = function(username, password) {

     return $q(function(resolve, reject) {
       users.findOne({$and:[{ password: password }, { username: username }]}, function (err, docs) {
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

   factory.getAllUser = function() {

     return $q(function(resolve, reject) {
       users.find({}, function (err, docs) {
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
