var app = angular.module('scheduler-dashboard', []);

app.controller('TaskController',  ['$scope', '$interval', '$http', '$filter', function($scope, $interval, $http, $filter) {
	
	$scope.isStarted = false;
	$scope.tasksStates = [];
  $scope.sebalImages = [];
  $scope.tasks = [];
  $scope.itemsByPage = 5;


  $scope.getImages = function() {

  //private String name;
  //private String downloadLink;
  //private ImageState state; {value}
  //private String federationMember;
  //private int priority;
    console.log('Getting imagens')
    $http.get('http://localhost:9192/images').success(function(data) {
      $scope.sebalImages = data;
    });
          
  };

  $scope.getTaskForImage = function(imgName) {

  //private String name;
  //private String downloadLink;
  //private ImageState state; {value}
  //private String federationMember;
  //private int priority;

    console.log('Add New Event...');
    console.log("Getting tasks for :"+imgName);
    $http.get('http://localhost:9192/tasks/'+imgName).success(function(data) {

      $scope.tasks = data;

      angular.forEach($scope.tasks, function(value, key) {

        //console.log('Key'+key+" : Value "+value.state);
         //new event
        var temp_task = {taskId : value.taskId , resourceId: value.resourceId };

        var imageTaskState = $filter('filter')($scope.tasksStates, function (d) {return d.state === value.state;})[0];
        
        if(!angular.isDefined(imageTaskState)){
          //console.log('Add New Task Type: '+value.state);
          var temp_tasksByState = [];
          imageTaskState = {state: value.state, tasks: temp_tasksByState}

          $scope.tasksStates.push(imageTaskState);

          //console.log('Add new Task state:'+JSON.stringify(imageTaskState));
        }

        //console.log('Add New Task...');
        //console.log('Task: '+JSON.stringify(temp_task));
        imageTaskState.tasks.push(temp_task);

      });
    });     
  };


}]);


app.controller("PaginationCtrl", function($scope) {

  $scope.itemsPerPage = 5;
  $scope.currentPage = 0;
  $scope.items = [];

  for (var i=0; i<50; i++) {
    $scope.items.push({
      id: i, name: "name "+ i, description: "description " + i
    });
  }

  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
  };

  $scope.prevPageDisabled = function() {
    return $scope.currentPage === 0 ? "disabled" : "";
  };

  $scope.pageCount = function() {
    return Math.ceil($scope.items.length/$scope.itemsPerPage)-1;
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount()) {
      $scope.currentPage++;
    }
  };

  $scope.nextPageDisabled = function() {
    return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
  };

});


