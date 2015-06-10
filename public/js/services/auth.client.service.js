app.factory('Auth', ['$http','$q', '$window', function($http, $q, $window) {
  return {

    isLoggedIn: function(){
      return ($window.sessionStorage["token"])? true : false;
    },

    loginUser: function(email, password, cb) {
      $http.post('/api/login', { email: email, password: password }).then(function(response ){
        if(response.data.success){
          cb(true, response.data);
        }
        else {
          cb(false, response.data);
        }
      });
    },

    registerUser: function(){

    },

    logOutUser: function(){
       delete $window.sessionStorage["users"];
       delete $window.sessionStorage["token"];
    }
  };
}]);