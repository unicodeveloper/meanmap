app.controller('AuthController', ['$rootScope','$scope','$http','$location','$window','Auth','toastr', function($rootScope, $scope, $http, $location,$window, Auth, toastr) {

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

  // $scope.signUp = function(){
  //   if($scope.user.email && $scope.user.username && $scope.user.password){

  //     var newUser =  {
  //       email:    $scope.user.email,
  //       username: $scope.user.username,
  //       password: $scope.user.password
  //     };

  //     User.create(newUser).success(function(data){
  //         $scope.message = data.message;
  //     });
  //   }
  // };

  $scope.logIn =  function(){
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