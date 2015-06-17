app.controller('NewsletterController', ['$rootScope','$scope','$http','Newsletter','toastr', function($rootScope, $scope, $http, Newsletter, toastr) {

  $scope.subscribeUser = function(){
    var email   = $scope.newsletter.email;

    Newsletter.subscribe({ email: email} ,function(success, data){
      if(success){
        toastr.success("Thanks for subscribing, Please check your email.", {timeOut: 2000});
      }
      else{
        toastr.error(data.error.error, 'Error', { timeOut: 2000 });
      }
    });
  };
}]);