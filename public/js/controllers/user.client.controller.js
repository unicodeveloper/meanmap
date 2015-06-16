app.controller('UserController', ['$rootScope','$scope','$http','$location','$window','$localStorage','Upload','Auth','User','toastr','leafletData','Geocoder', function($rootScope,$scope,$http,$location,$window,$localStorage,Upload,Auth,User,toastr,leafletData,Geocoder) {
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
  var fullname      = $scope.userDetails.fullname,
    website         = $scope.userDetails.website || '',
    address         = $scope.userDetails.address,
    githubProfile   = $scope.userDetails.github_profile,
    hire_status     = $scope.userDetails.hire_status,
    bio             = $scope.userDetails.bio,
    twitter_handle  = $scope.userDetails.twitter_handle;

    $scope.username = 'prosper';
    $scope.$watch('files', function() {
      $scope.upload($scope.files, function(data){
        var profile_image = data;
        console.log("Profile image", profile_image);
        User.updateUserAvatar(userId, { user_avatar: profile_image }, function(success, data){
          if(success){
            toastr.success(data.message, { timeOut: 1000 });
            console.log( data );
          }
          else{
            console.log( data );
            toastr.error("Error occurred. Update Failed", 'Error', { timeOut: 2000 });
          }
        });
      });
    });

    $scope.upload = function(files, cb) {
      if(files && files.length) {
          var file = files[0];
          console.log("upload now");
          return Upload.upload({
            url: 'api/file/upload',
            method: 'POST',
            file: file
          })
          .then(function(response){
            if( response.status == 200){
              console.log("Destination", response.data.dest);
              console.log(response.data.dest);
              cb(response.data.dest);
            }else{
              console.log("Error in uploading file");
              toastr.error("There was an error in uploading the file", 'Error', { timeOut: 2000 });
            }
          });
      }
    };



    var userProfile =  {
      fullname: fullname,
      website:  website,
      address: address,
      bio: bio,
      hire_status:  hire_status,
      github_profile: githubProfile,
      twitter_handle: twitter_handle
    };
    console.log("UserProfile, ", userProfile);

    User.updateEachUserDetails(userId, userProfile, function(success, data){
      if(success){
        toastr.success(data.message, { timeOut: 1000 });
        console.log( data );
      }
      else{
        console.log( data );
        toastr.error("Error occurred. Update Failed", 'Error', { timeOut: 2000 });
      }
    });
  };

  User.getAllUsers().then( function(response){
    $scope.allUsers = response.data;
    console.log("No of users", $scope.allUsers.length );
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