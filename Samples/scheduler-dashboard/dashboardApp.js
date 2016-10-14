var app = angular.module('schedulerDashboard', [
	'dashboardControllers',
	'dashboardServices'
]).config(function($logProvider){
  $logProvider.debugEnabled(false);
}).constant("appConfig", {
	"urlSebalSchedulerService":"http://10.10.0.20:8687/sebal-scheduler/",
	"imagesServicePath":"images",
	"tasksServicePath":"tasks/:image"
}
);


//Template for Angular code organization
//var phonecatApp = angular.module('phonecatApp', [
//  'ngRoute',
//  'phonecatAnimations',
//
//  'phonecatControllers',
//  'phonecatFilters',
//  'phonecatServices'
//]);
//
//phonecatApp.config(['$routeProvider',
//  function($routeProvider) {
//    $routeProvider.
//      when('/phones', {
//        templateUrl: 'partials/phone-list.html',
//        controller: 'PhoneListCtrl'
//      }).
//      when('/phones/:phoneId', {
//        templateUrl: 'partials/phone-detail.html',
//        controller: 'PhoneDetailCtrl'
//      }).
//      otherwise({
//        redirectTo: '/phones'
//      });
//  }]);
