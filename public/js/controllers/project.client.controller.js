app.controller('ProjectController', ['$rootScope','$scope','$http','$location','$window','$localStorage','$routeParams','toastr','User','Project', function($rootScope,$scope,$http,$location,$window,$localStorage,$routeParams,toastr, User, Project) {

  $scope.ok = function(){
     $scope.modalInstance.close();
  };

  $scope.cancel = function () {
    $scope.modalInstance.dismiss('cancel');
  };

  $scope.shareTwitter = function(name){
    window.open(
    'https://twitter.com/share?url='+encodeURIComponent('http://meanmap.com')+'&amp;text='+encodeURIComponent('Check Out This Mean Stack Project: ' + name + ' ...Follow@meanmap') + '&amp;count=none/', 'twitter-share-dialog',
    'width=626,height=436,top='+((screen.height - 436) / 2)+',left='+((screen.width - 626)/2 ));
  };

  $scope.shareFacebook = function(name){
    window.open(
    'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent('http://meanmap.com') +'&amp;t=' + encodeURIComponent('Check Out This Mean Stack Project: ' + name),
    'facebook-share-dialog',
    'width=626,height=436,top='+((screen.height - 436) / 2)+',left='+((screen.width - 626)/2 ));
  };

  $scope.createProject = function(){
    var project =  {
      name: $scope.project.name,
      description:  $scope.project.description,
      url: $scope.project.url,
      postedBy: $rootScope.currentUser.username
    };

    Project.shareProject(project, function(success, data){
      if(success){
        $scope.ok();
        toastr.success( data.message, { timeOut: 1000 });
      } else{
        toastr.error( data.message, 'Error', { timeOut: 2000 });
      }
    });
  };

  Project.getAllProjects().then( function(response){
    $scope.allProjects = response.data;
  });

  Project.getEachProjectDetails( $routeParams.projectSlug, function(success, data){
    if(success){
      $scope.projectDetails = data.project;
    }
  });

}]);

