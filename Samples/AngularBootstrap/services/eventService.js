var app = angular.module('EventModule', [ngResource]);

app.factory('Event', function($resource) {
  return $resource("http://localhost:9192/event");
});

app.controller('EventController', ['$scope',function($scope, Event) {
  
	$scope.getEvents = function() {
    	$scope.events = Event.query();
    };
  
});
