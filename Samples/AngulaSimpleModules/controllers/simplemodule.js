var app = angular.module('SimpleModule', []);

app.controller('ControllerA', ['$scope',function($scope) {
	$scope.title = "Simple Module ControllerA";
	$scope.result = 0;
	$scope.add = function(a,b){
		$scope.result = a+b;
	};
	$scope.multiple = function(a,b){
		$scope.result = a*b;
	};
}]);
