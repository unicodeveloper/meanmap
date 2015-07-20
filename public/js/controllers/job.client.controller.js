app.controller('JobsController', ['$rootScope','$scope','$location','$window','$localStorage','$routeParams','toastr','Jobs', function($rootScope,$scope,$location,$window,$localStorage,$routeParams,toastr,Jobs) {

  $scope.createJob = function(){
    var details = {
      title: $scope.job.title,
      description: $scope.job.description,
      company: $scope.job.company
    };

    Jobs.create(details, function(success, data){
      if(success){
        toastr.success(data.message, { timeOut: 1000 });
      }else{
        toastr.error(data.message, 'Error', { timeOut: 2000 });
      }
    });
  };

  $scope.listJobs =  function(){
    Jobs.getAllJobs().then(function(response){
       $scope.allJobs = response.data;
    });
  };


  $scope.listJobs(); // Invoke listJobs function defined above

}]);


