var app = angular
            .module('meanmap', [
              'ngCookies',
              'ngRoute',
              'ngStorage',
              'ngMessages',
              'angularMoment',
              'angular-loading-bar',
              'ngFileUpload',
              'leaflet-directive',
              'ui.bootstrap',
              'appRoutes',
              'ngSanitize',
              'toastr',
              'geocoder',
              'ngLodash',
              'hc.marked',
              'angularUtils.directives.dirDisqus'])
  .factory('authInterceptor', function($q, $location, $window, $localStorage){
    return {
      request: function(config){
        config.headers = config.headers || {};
        var token = $localStorage.mean_token;

        if(token){
          config.headers["x-access-token"] = token;
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

  }])
  .run(['$rootScope', '$location', function($rootScope, $location) {
    $rootScope.$on( "$routeChangeStart", function(event, next, current) {
      if($rootScope.currentUser === undefined  && next.requireAuth) {
        $location.path( "/" );
      }
    });
  }]);