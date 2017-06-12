  var mainApp = angular.module('app');
  mainApp.factory('UserFactory', function($q , ConstantFactory , $rootScope) {
  var factory = {};
  var Datastore = require('nedb');
  var users = new Datastore({ filename: './db/users.db', autoload: true });
  users.ensureIndex({ fieldName: 'username', unique: true }, function (err) {
  });
  factory.updateUser = function(userInfo)
  {
  return $q(function(resolve, reject) {
  users.findOne({_id: userInfo._id }, function (err, docs) {
                       if(docs != undefined && docs != null )
                        {
                          users.update({ _id: userInfo._id} , { $set: { "isActive": true , name : userInfo.name , username : userInfo.username,
                                  role : userInfo.role , phone : userInfo.phone , password : userInfo.password , updatedBy  : $rootScope.user , updatedAt: ConstantFactory.getCurrentDate()
                                  }} ,
                                  {upsert: true},
                                  function (err, docs)
                                  {
                                    if(docs != undefined && docs != null )
                                    {
                                    resolve (docs);
                                    }
                                    else{
                                      reject("Error while updating user");
                                    }
                                  });
                        }
                        else {
                            reject("Error while updating user");
                        }
                      });
                    });
  }

  factory.updateUserPassword = function(userInfo)
  {
  return $q(function(resolve, reject) {
  users.findOne({$and : [{username: userInfo.username} , {isActive : true}] }, function (err, docs) {
       if(docs != undefined && docs != null )
        {
          users.update({ _id: docs._id} , { $set: { "isActive": true , password : userInfo.password
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
          reject(err);
        }
      });
  });
  }


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
          users.update({ username: userInfo.username} , { $set: { isActive: true , password : userInfo.password}} ,{upsert: true}, function (err, docs) {
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
          if($rootScope.user != undefined && $rootScope.user != null)
          {
            userInfo.createdBy = $rootScope.user;
          }
          userInfo.updatedBy = null;
          userInfo.updatedAt = null;
          userInfo.deletedBy = null;
          userInfo.createdAt = ConstantFactory.getCurrentDate();

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
       reject("Error while updating user");
          }
      });
  });
  }

  factory.deleteUser = function(id) {

  return $q(function(resolve, reject) {
  users.update({_id : id} , { $set: { isActive: false  , deletedBy : $rootScope.user}} ,{}, function (err, docs) {
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
  users.find({isActive : true}, function (err, docs) {
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

  factory.getSellers = function (){
    return $q (function (resolve , reject){
      users.find({$and:[{isActive : true} , {role : ConstantFactory.seller}]}, function (err, docs){
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
