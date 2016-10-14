var app = angular.module('dataModule', []);

app.controller('dataController', ['$scope',function($scope) {
	
	$scope.contact = {name:'NameTest', phone:'9382112391', email:'teste@teste.com'};
	$scope.calculate = function(a,b){return (a+b)*3;}

}]);


