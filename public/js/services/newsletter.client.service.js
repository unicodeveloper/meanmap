app.factory('Newsletter', ['$http', function($http) {
  return {
    subscribe: function(email, cb){
      $http.post('/api/newsletter', email).then( function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else {
          cb(false, response.data);
        }
      });
    }
  };
}]);