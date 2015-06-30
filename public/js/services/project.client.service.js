app.factory('Project', ['$http','$q', function($http, $q) {
  return {

    shareProject: function(project, cb){
      $http.post('/api/project', project).then( function(response){
        if(response.data.success){
          cb(true, response.data);
        }
        else{
          cb(false, response.data);
        }
      });
    },

    getAllProjects: function(){
      return $http.get('/api/project');
    },

    getEachProjectDetails: function( slug, cb ){
      return $http.get('/api/projects/' + slug).then( function(response){
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