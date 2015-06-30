app.controller('DeveloperController', ['$rootScope','$scope','$http','$location','$window','$localStorage','$routeParams','User', function($rootScope,$scope,$http,$location,$window,$localStorage,$routeParams,User) {

  User.getAllUsers().then( function(response){
    $scope.allUsers = response.data;
  });

}]);