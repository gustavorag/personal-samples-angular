var app = angular.module('MathModule', []);

app.controller('SumeController', ['$scope',function($scope) {
	$scope.result = 0;
	$scope.add = function(a,b){
		$scope.result = a+b;
	};
	
}]);

app.controller('MultipleController', ['$scope',function($scope) {
	$scope.result = 0;
	$scope.multiple = function(a,b){
		$scope.result = a*b;
	};
	
}]);
