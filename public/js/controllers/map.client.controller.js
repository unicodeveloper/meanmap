app.controller('MapController', ['$rootScope','$scope','$http','$location','$window','$localStorage','$routeParams','Auth','User','toastr','leafletData','Geocoder', function($rootScope,$scope,$http,$location,$window,$localStorage,$routeParams,Auth,User,toastr,leafletData,Geocoder) {

  User.getAllUsers().then( function(response){
    $scope.allUsers  = response.data;
    $scope.noOfUsers = $scope.allUsers.length;
    console.log("length", $scope.allUsers.length);
    $scope.userData = [];

    angular.forEach($scope.allUsers, function(val, key){
      var info = {};
      $scope.markers = {};
      info.username = val.username;
      info.address  = val.address;
      $scope.userData.push(info);
      Geocoder.geocodeAddress(info.address).then( function(response){
        var value = {};
        $scope.markers[info.username] = {};
        $scope.markers[info.username].lat       = response.lat;
        $scope.markers[info.username].lng       = response.lng;
        $scope.markers[info.username].message   = info.username;
        $scope.markers[info.username].focus     = true;
        $scope.markers[info.username].draggable = true;
      });
    });
  });

  $scope.layers = {
    baselayers: {
      osm: {
        name: 'OpenStreetMap',
        url: 'https://{s}.tiles.mapbox.com/v3/examples.map-i875mjb7/{z}/{x}/{y}.png',
        type: 'xyz'
      }
    }
  };

  $scope.defaults = {
    scrollWheelZoom: false
  };

  User.getEachUserDetails($routeParams.username, function(success, data){
    if(success){
      Geocoder.geocodeAddress(data.user.address).then( function(response){
        $scope.personalMapMarker = {
            marker: {
             lat: response.lat,
             lng: response.lng,
             message: data.user.username,
             focus: true,
             draggable: true
            }
        };
      });
    }
  });

  leafletData.getMap().then(function(map) {
    L.GeoIP.centerMapOnPosition(map, 15);
  });
}]);