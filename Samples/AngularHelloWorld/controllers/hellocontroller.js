var app = angular.module('myApp', []);

app.controller('sayHello', function($scope) {
	$scope.name = {text:'Your Name'};
});
