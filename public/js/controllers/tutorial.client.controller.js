app.controller('TutsController', ['$rootScope','$scope','$http','$location','$window','$localStorage','$routeParams','toastr','Tuts', function($rootScope,$scope,$http,$location,$window,$localStorage,$routeParams,toastr,Tuts) {

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

}]);


