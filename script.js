(function(){
  var app = angular.module('githubViewer', []);

var MainController = function($scope, $http, $interval, $log){
  var onUserComplete = function(response){
    $scope.user = response.data;
    $http.get($scope.user.repos_url).then(onRepos, onError)
  }

  var onRepos = function(response){
    $scope.repos = response.data
  }

   var countdownInterval = null;

  $scope.search = function(username){
    $log.info('searching for ' + username)
    $http.get('https://api.github.com/users/' + username ).then(onUserComplete, onError)

    if (countdownInterval){
      $interval.cancel(countdownInterval);
      $scope.countdown = null;
    }
  }

  var onError = function(reason){
    $scope.error = "Could not fetch user";
  }
 var startCountdown = function(){
   $interval(decrementCountdown, 1000, $scope.countdown)
 }

  var decrementCountdown = function(){
    $scope.countdown -= 1;
    if ($scope.countdown < 1){
      $scope.search($scope.username);
    }
  }

  $scope.username = "angular";
  $scope.message = "Hello Angular"
  $scope.limitFilter = 1;
  $scope.countdown = 5;
  startCountdown();

}



var FunnyController = function($scope){
  $scope.funny = "I don't know how to use Angular ";
}
app.controller('MainController', MainController)
  app.controller('FunnyController', FunnyController)
}());
