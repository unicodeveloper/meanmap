app.controller('AuthController', ['$rootScope','$scope','$http','$location','$window','Auth','toastr', function($rootScope, $scope, $http, $location,$window, Auth, toastr) {

  $scope.isLoggedIn = function(){
    if($window.sessionStorage["users"]){
      $rootScope.currentUser = JSON.parse($window.sessionStorage["users"]);
    }
    return Auth.isLoggedIn();
  };



  $scope.logOut = function(){
    Auth.logOutUser();
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
    var username = $scope.user.email, password = $scope.user.password;

    Auth.loginUser(username, password, function(success, data) {
      if(success) {
        $window.sessionStorage["token"] = data.token;
        $window.sessionStorage["users"] = JSON.stringify(data.user);
        $scope.userData = data.user[0];
        $scope.userAvatar = data.user[0].user_avatar;
        console.log("Scope Object", $scope.userData);
        $scope.email = data.user[0].email;
        $rootScope.fullname = data.user[0].fullname;
        console.log("Email", $scope.email);
        console.log("Avatar", $scope.userAvatar);
        console.log("Full name", $scope.fullname);
        $rootScope.$apply();
        toastr.success('Login Successful', { timeOut: 1000 });
        $location.path('/account');
      }
      else {
        toastr.error(data.message, 'Error', { timeOut: 2000 });
      }
    });
  };
}]);