var app = angular.module('meanmap', ['ngRoute','ngStorage','ngMessages','angularMoment','angular-loading-bar','ngFileUpload','leaflet-directive','ui.bootstrap','appRoutes','ngSanitize','toastr','geocoder','ngLodash'])
  .factory('authInterceptor', function($q, $location, $window){
    return {
      request: function(config){
        config.headers = config.headers || {};

        if($window.sessionStorage["token"]){
          config.headers.token = $window.sessionStorage["token"];
        }
        return config;
      },

      responseError: function(response){
        if(response.status == 401){
          $location.path('/auth/login');
        }
        return $q.reject(response);
      }
     };
  })
  .config(['cfpLoadingBarProvider','$httpProvider', function(cfpLoadingBarProvider, $httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
    cfpLoadingBarProvider.includeSpinner   = false;
    cfpLoadingBarProvider.includeBar       = true;
    cfpLoadingBarProvider.latencyThreshold = 5;
  }])
  .run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if($rootScope.currentUser === undefined  && next.requireAuth) {
        $location.path( "/" );
      }
    });
  }]);