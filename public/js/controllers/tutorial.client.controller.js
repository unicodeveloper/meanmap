app.controller('TutsController', ['$rootScope','$scope','$location','$window','$localStorage','$routeParams','toastr','Tuts', function($rootScope,$scope,$location,$window,$localStorage,$routeParams,toastr,Tuts) {

  $scope.createTutorial = function(){
    var details = {
      title: $scope.tutorial.title,
      content: $scope.tutorial.content,
      postedBy: $rootScope.currentUser.username
    };

    Tuts.create(details, function(success, data){
      if(success){
        toastr.success(data.message, { timeOut: 1000 });
      }else{
        toastr.error(data.message, 'Error', { timeOut: 2000 });
      }
    });
  };

  $scope.listTutorials =  function(){
    Tuts.getAllTutorials().then(function(response){
       $scope.allTutorials = response.data;
    });
  };

  $scope.getEachTutorialDetails = function(){
    Tuts.getEachTutorialDetails($routeParams.slug, function(success, data){
      if(success){
        $scope.tutorialDetails = data.tutorial;
      }
    });
  };


  $scope.listTutorials(); // Invoke ListTutorials function defined above
  $scope.getEachTutorialDetails(); // Invoke getEachTutorialDetails defined above

}]);


