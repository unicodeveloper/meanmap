app.controller('UserController', ['$rootScope','$scope','$http','$location','$window','Auth','toastr', function($rootScope, $scope, $http, $location,$window, Auth, toastr) {

  $scope.isLoggedIn = function(){
    if($window.sessionStorage["users"]){
      $rootScope.currentUser = JSON.parse($window.sessionStorage["users"]);
    }
    return Auth.isLoggedIn();
  };

  $scope.logOut = function(){
    Auth.logOutUser();
    toastr.success('You are Logged Out');
    $location.path('/');
  };


  $scope.getProfile =  function(){
    var username = $scope.user.email, password = $scope.user.password;

    Auth.loginUser(username, password, function(success, data) {
      if(success) {
        $window.sessionStorage["token"] = data.token;
        $window.sessionStorage["users"] = JSON.stringify(data.user);
        toastr.success('Login Successful');
        $location.path('/account');
      }
      else {
        toastr.error( data.message, 'Error');
      }
    });
  };
}]);