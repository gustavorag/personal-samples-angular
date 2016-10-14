var app = angular.module('EventModule', []);

app.controller('eventController',  ['$scope', '$interval', '$http', '$filter', function($scope, $interval, $http, $filter) {
	
	var stop;
	$scope.isStop = true;
	$scope.eventTypes = [];

	$scope.getEvents = function() {
      	$http.get('http://localhost:9192/events').success(function(data) {
      		
      		$scope.events = data;

      		angular.forEach($scope.events, function(value, key) {

      			//console.log('Key'+key+" : Value "+value.type);
  				//new event
  				var temp_event = {date : value.eventDate , description: value.description };

				var eventType = $filter('filter')($scope.eventTypes, function (d) {return d.type === value.type;})[0];
				
				if(!angular.isDefined(eventType)){
					//console.log('Add New Event Type: '+value.type);
					var temp_events = [];
					eventType = {type: value.type, events: temp_events}

					$scope.eventTypes.push(eventType);

					//console.log('Add new Event type:'+JSON.stringify(temp_eventType));
				}

				//console.log('Add New Event...');
				//console.log('Event: '+JSON.stringify(eventType));
				eventType.events.push(temp_event);
				

			});
  			
	    });
    };
	
	$scope.startAutoUpdate = function() {
		if ( angular.isDefined(stop) ) return;
        stop = $interval(function() {
        	$scope.isStop = false;
            $scope.getEvents();
        }, 2000);
    };

    $scope.stopAutoUpdate = function() {
        if (angular.isDefined(stop)) {
            $interval.cancel(stop);
            $scope.isStop = true;
            stop = undefined;
        }
    };
  	
	$scope.$on('$destroy', function() {
          // Make sure that the interval is destroyed too
          $scope.stopAutoUpdate();
    });

    $scope.autoUpdateButtonClick = function() {
    	console.log('auto update clicked...');
    	if($scope.isStop){
    		$scope.startAutoUpdate();
    	}else{
    		$scope.stopAutoUpdate();
    	}
    };
}]);