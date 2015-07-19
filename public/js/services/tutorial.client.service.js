app.factory('Tuts', ['$http', function($http) {
  return {
    create: function(tutorialDetails, cb){
      $http.post('/api/tutorial/create', tutorialDetails).then( function(response){
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