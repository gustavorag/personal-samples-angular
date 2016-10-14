var dashboardControllers = angular.module('dashboardControllers', []);

dashboardControllers.controller('MonitorController', function($scope, $log, $filter, SebalImagesResource, TaskResource) {
	
	$scope.isStarted = false;
	$scope.tasksStates = [];
  $scope.sebalImages = [];
  $scope.tasks = [];
  $scope.error = '';
  $scope.actualImage = '';
  $scope.warningTasks = false;


  $scope.getSebalImages = function() {
      $scope.isStarted = true;
      $log.info('Getting images into scope.sebalImages');
      SebalImagesResource.query(
          function(data) {
              $log.debug('Images: '+JSON.stringify(data));
              $scope.sebalImages = $filter('orderBy')(data, ['priority', 'name']);
              $scope.paginationItems = $scope.sebalImages;
          },
          function(error){
              $log.error('Error while trying to load images from Sebal Scheduler. Erro:'+error);
              $scope.error = 'Error while trying to load images from Sebal Scheduler. Erro:'+error;
          }
      ); 

      //Call with promisse exemple  
      //var imagesReturned = SebalImagesResource.query();
      //
      //imagesReturned.$promisse.then(function(result) {
      // 
      //    $log.debug('Images: '+JSON.stringify(data));
      //    $scope.sebalImages = data;
      //    $scope.paginationItems = $scope.sebalImages;
      //}); 

  };

  $scope.getTaskForImage = function(imageName) {

      $log.info("Getting tasks for :"+imageName);

      $scope.actualImage = imageName;

      TaskResource.get({ image: imageName }, function(data) {
          $scope.tasksStates = []; //Restart
          $scope.tasks = data;
          $log.debug(JSON.stringify(data));
         // if($scope.tasks.length > 0){
            $scope.warningTasks = false;
            angular.forEach($scope.tasks, function(value, key) {

                //new event
                var temp_task = {taskId : value.taskId , resourceId: value.resourceId };

                var imageTaskState = $filter('filter')($scope.tasksStates, function (d) {return d.state === value.state;})[0];
                
                if(!angular.isDefined(imageTaskState)){
                  $log.debug('Add New Task Type: '+value.state);
                  var temp_tasksByState = [];
                  imageTaskState = {state: value.state, tasks: temp_tasksByState}

                  $scope.tasksStates.push(imageTaskState);

                  $log.debug('Add new Task State:'+JSON.stringify(imageTaskState));
                }

                $log.debug('Add New Task: '+JSON.stringify(temp_task));
                imageTaskState.tasks.push(temp_task);
            });
          // }else{
          //   $scope.warningTasks = true;
          // }

      });
  };

  $scope.refreshTasks = function() {
      if(angular.isDefined($scope.actualImage)){
        $scope.getTaskForImage($scope.actualImage);
      }
  }

});



app.filter('offset', function() {
  return function(input, start) {
    start = parseInt(start, 10);
    return input.slice(start);
  };
});

dashboardControllers.controller("PaginationController", function($scope) {

  $scope.itemsPerPage = 50;
  $scope.itemsPerPageOptions = [10, 15, 20, 50];
  $scope.currentPage = 0;
  $scope.prevPageDisabled = true;
  $scope.nextPageDisabled = true;

  var pageCount;

  $scope.prevPage = function() {
    if ($scope.currentPage > 0) {
      $scope.currentPage--;
    }
    prevPageCheck();
  };
 
  $scope.pageCount = function() {
    
    pageCount = Math.ceil($scope.sebalImages.length/$scope.itemsPerPage)-1;
    prevPageCheck();
    nextPageCheck();
    return pageCount;
  };

  $scope.getPages = function() {
    var pages = [];
    var range = $scope.pageCount()+1;
    for (var i = 0; i < range; i++) {
      pages.push(i+1);
    };
    return pages;
  };

  $scope.setPage = function(n) {
    $scope.currentPage = n;
    prevPageCheck();
    nextPageCheck();
  };

  $scope.nextPage = function() {
    if ($scope.currentPage < $scope.pageCount()) {
      $scope.currentPage++;
    }
    nextPageCheck();
  };

  $scope.selectItensPerPage = function(n){
    $scope.itemsPerPage = n;
  };

  function prevPageCheck(){
    if($scope.currentPage === 0){
        $scope.prevPageDisabled = true;
    }else{
        $scope.prevPageDisabled = false;
    }
  }

  function nextPageCheck(){
    if($scope.currentPage === pageCount){
        $scope.nextPageDisabled = true;
    }else{
        $scope.nextPageDisabled = false;
    }
  }
  



});


