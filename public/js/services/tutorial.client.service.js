app.factory('Tuts', ['$http', function($http) {
  return {
    create: function(tutorialDetails, cb){
      $http.post('/api/tutorials/create', tutorialDetails).then( function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else {
          cb(false, response.data);
        }
      });
    },

    getAllTutorials: function(){
      return $http.get('/api/tutorials');
    },

    getEachTutorialDetails: function( slug, cb ){
      return $http.get('/api/tutorials/' + slug).then( function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else{
          cb(false, response.data);
        }
      });
    }
  };
}]);