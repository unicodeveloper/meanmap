app.factory('Jobs', ['$http', function($http) {
  return {
    create: function(jobDetails, cb){
      $http.post('/api/jobs/create', jobDetails).then(function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else {
          cb(false, response.data);
        }
      });
    },

    getAllJobs: function(){
      return $http.get('/api/jobs');
    }
  };
}]);