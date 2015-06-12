app.controller('UserController', ['$rootScope','$scope','$http','$location','$window','$localStorage','Auth','User','toastr','leafletData','Geocoder', function($rootScope,$scope,$http,$location,$window,$localStorage,Auth,User,toastr,leafletData,Geocoder) {
  var userId =  $rootScope.currentUser[0]._id;
  User.getProfile(userId, function(success, data){
    if(success){
      $scope.userDetails = data.user;
      $rootScope.fullname = data.user.fullname;
      $rootScope.username = data.user.username;
      console.log("User Profile", data.user);
    }
    else{
      console.log("Nothing Found", data);
    }
  });

  console.log( userId);

  $scope.editProfile = function(){
   var username   = $scope.userDetails.username.toLowerCase(),
    fullname      = $scope.userDetails.fullname,
    email         = $scope.userDetails.email.toLowerCase(),
    website       = $scope.userDetails.website || '',
    address       = $scope.userDetails.address,
    githubProfile = $scope.userDetails.githubProfile.toLowerCase();
    hire_status   = $scope.userDetails.hire_status;
    githubProfile = $scope.userDetails.bio;
    profile_image = $scope.userDetails.profile_image;
  };

  Geocoder.geocodeAddress($rootScope.currentUser[0].address).then( function(response){
    angular.extend($scope, {

      markers: {
        Marker: {
            lat: response.lat,
            lng: response.lng,
            message: "You are here",
            focus: true,
            draggable: false,
        }
      },
      layers: {
        baselayers: {
          osm: {
              name: 'OpenStreetMap',
              url: 'https://{s}.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png',
              type: 'xyz'
          }
        }
      },
      defaults: {
        scrollWheelZoom: false
      }
    });
  });

  leafletData.getMap().then(function(map) {
    L.GeoIP.centerMapOnPosition(map, 15);
  });

}]);