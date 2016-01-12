'use strict';

/* Controllers */
  // signin controller
app.controller('Dashboard', ['$scope', '$http', '$state', '$cookieStore',function($scope, $http, $state, $cookieStore) {
    $scope.alerts = [];
    $scope.courses = {};
    $scope.httpStatus1 = false;
    $scope.httpStatus2 = false;
    $scope.found = false;
    $scope.found2 = false;  

    $scope.addAlert = function(type,message) {
      $scope.alerts.push({type: type, msg: message});
    };
    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };
    // console.log($cookieStore.get('globals'))
   if ($cookieStore.get('globals') != undefined){
      $scope.user_data = $cookieStore.get('globals').currentUser;
      $http.defaults.headers.common['Authorization'] = 'Token ' + $scope.user_data.token;
      // console.log($scope.user_data)

    }else{
      $state.go('access.signin');
    }  
     $http.get(baseUrl+'course/')
      .success(function (response) {
        for (var i = $scope.alerts.length - 1; i >= 0; i--) {
            $scope.closeAlert(i);
          };
        $scope.courses= response;
        $scope.httpStatus1 = true;
        if ($scope.courses.length == 0){
          $scope.addAlert('warning','No registered courses found!');
          return;
        }
        $scope.found = true;
      })
      .error(function (data, status, headers){
        $scope.addAlert('danger', 'Error loading course list');
        $scope.httpStatus1 = true;
      });

  }]);