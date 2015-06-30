app.factory('User', ['$http','$q', '$window', function($http, $q, $window) {
  return {
    isLoggedIn: function(){
      return ($window.sessionStorage["token"])? true : false;
    },

    getProfile: function(user_id, cb){
      $http.get('/api/user/' + user_id).then( function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else{
          cb(false, response.data);
        }
      });
    },

    getEachUserDetails: function( username, cb ){
      $http.get('/api/users/' + username).then( function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else{
          cb(false, response.data);
        }
      });
    },

    updateEachUserDetails: function( user_id, user, cb){
      $http.put('/api/user/' + user_id, user).then( function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else{
          cb(false, response.data);
        }
      });
    },

    updateUserAvatar: function( user_id, user, cb){
      $http.put('/api/user/' + user_id, user).then( function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else{
          cb(false, response.data);
        }
      });
    },

    getAllUsers: function(){
      return $http.get('/api/users');
    },

    logOutUser: function(){
       delete $window.sessionStorage["users"];
       delete $window.sessionStorage["token"];
    }
  };
}]);