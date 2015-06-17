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

  $scope.center = {
    lat: 6.523276500000000000,
    lng: 3.540790900000047300,
    zoom: 2
  };

  $scope.layers = {
    baselayers: {
       googleTerrain:{
          name: 'Google Terrain',
          layerType: 'TERRAIN',
          type: 'google'
       },
       googleHybrid: {
          name: 'Google Hybrid',
          layerType: 'HYBRID',
          type: 'google'
       },
      googleRoadmap: {
          name: 'Google Streets',
          layerType: 'ROADMAP',
          type: 'google'
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

}]);