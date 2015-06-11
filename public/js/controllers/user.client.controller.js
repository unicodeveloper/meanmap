app.controller('UserController', ['$rootScope','$scope','$http','$location','$window','$localStorage','Auth','User','toastr','leafletData','Geocoder', function($rootScope,$scope,$http,$location,$window,$localStorage,Auth,User,toastr,leafletData,Geocoder) {

  var userId =  $rootScope.currentUser[0]._id;

  User.getProfile(userId, function(success, data){
    if(success){
      $scope.userDetails = data.user;
      $rootScope.fullname = data.user.fullname;
      console.log("User Profile", data.user);
    }
    else{
      console.log("Nothing Found", data);
    }
  });

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