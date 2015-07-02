app.controller('AuthController', ['$rootScope','$scope','$http','$location','$window','$localStorage','$sessionStorage','Auth','User','toastr', function($rootScope,$scope,$http,$location,$window,$localStorage,$sessionStorage,Auth,User,toastr) {

  if($localStorage.mean_user){
    $rootScope.currentUser = $localStorage.mean_user;
  }

  $scope.isLoggedIn = function(){
    return Auth.isLoggedIn();
  };

  $scope.resetPassword = function(){
    var userEmail = $scope.user.email;
    Auth.resetPassword({ email: userEmail}, function(success, data){
      if(success){
        $sessionStorage.pwdhash = data.user.pwdResetHash;
        toastr.success("Please check your Email and follow the instructions there", {timeOut: 2000});
      }
      else{
        toastr.error(data.message, 'Error', { timeOut: 2000 });
      }
    });
  };

  $scope.logOut = function(){
    Auth.logOutUser();
    $rootScope.currentUser = null;
    toastr.success('You are Logged Out', { timeOut: 1000 });
    $location.path('/');
  };

  $scope.signUp = function(){
    var username      = $scope.user.username.toLowerCase(),
        fullname      = $scope.user.fullname,
        email         = $scope.user.email.toLowerCase(),
        password      = $scope.user.password,
        website       = $scope.user.website || '',
        address       = $scope.user.address,
        githubProfile = $scope.user.githubProfile.toLowerCase();

    var newUser =  {
      email:    email,
      username: username,
      password: password,
      fullname: fullname,
      website:  website,
      address:  address,
      github_profile: githubProfile
    };

    Auth.registerUser(newUser, function(success, data){
      if(success){
        toastr.success(data.message, { timeOut: 3000 });
        $location.path('/auth/login');
      }
      else{
        toastr.error(data.Error, 'Error', { timeOut: 2000 });
      }
    });

  };

  $scope.logIn =  function(){
    var credentials = {
      email: $scope.user.email,
      password: $scope.user.password
    };

    Auth.loginUser(credentials, function(success, data) {
      if(success) {
        var user = data.user;
        $localStorage.mean_token = data.token;
        $localStorage.mean_user = user;
        $rootScope.currentUser = $localStorage.mean_user;
        toastr.success('Login Successful', { timeOut: 1000 });
        $location.path('/account');
      }
      else {
        toastr.error(data.message, 'Error', { timeOut: 2000 });
      }
    });
  };
}]);