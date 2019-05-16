console.log('page 4 js loaded');
function onRefreshTapped(){
	var updatedData = new Date().toDateString();
	document.getElementById('lastRefresh').innerHTML = updatedData;
	
	getHRData();
	getPedometerData();
}

function getHRData(){
	var HRValue = 0;
	
	//start HR sensor
	webapis.motion.start("HRM", onchangedCB);
	
	setTimeout(function(){
		webapis.motion.stop("HRM");
		
		console.log('HRValue', HRValue);
		if(HRValue > 0) { // post only if reading is accurate
			postHRData(HRValue);
		}
		
		
	}, 15000); //15 seconds for the sensor to register HR

	function onchangedCB(hrmInfo)
	{
		HRValue = hrmInfo.heartRate;
	}
}

function postHRData(HRValue){
	fetch('https://floating-sea-64607.herokuapp.com/users/5cd9cafcb0903000049da772', {
	    method: 'PATCH',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify([{"propName":"heartRates","value": {"heartRate": HRValue,"date": Date.now()}}])
	  }).then(function(response){
		  console.log('hr post success', response);
	  },
	  function(err){
		console.log(err);  
	  });
}

function getPedometerData(){
	// steps, distance, run (with calories)
	function onerror(error) {
	    console.log(error.name + ': ' + error.message);
	}

	function onread(data) {
        console.log('pedometer data: ', data);
        
        var totalRecordings = data.length;
        var lastRecord = data[totalRecordings-1];
        
        var stepsObj = {};
        stepsObj['startTime'] = lastRecord['startTime'];
        stepsObj['endTime'] = lastRecord['endTime'];
        stepsObj['walkStepCount'] = lastRecord['walkStepCount'];
        
        console.log('stepsObj', stepsObj);
        postSteps(stepsObj);
        
        if(lastRecord.runStepCount > 250){
        	//register as workout
        	var runObj = {};
        	runObj['startTime'] = lastRecord['startTime'];
        	runObj['endTime'] = lastRecord['endTime'];
        	runObj['runStepCount'] = lastRecord['runStepCount'];
        	runObj['calories'] = lastRecord['calories'];
        	
        	console.log('runObj', runObj);
        	postWorkout(runObj);
        }
        
        var distanceObj={};
        distanceObj['startTime'] = lastRecord['startTime'];
        distanceObj['endTime'] = lastRecord['endTime'];
        distanceObj['distance'] = lastRecord['distance'];
        
        console.log('distanceObj', distanceObj);
        postDistance(distanceObj);
        
	}

	var type = 'PEDOMETER';
	var query = {};
	query['anchorTime'] = (new Date(2019, 4, 14, 0, 0)).getTime() / 1000;
	query['interval'] = 1440; /* 1 Day */

	try {
	    tizen.humanactivitymonitor.readRecorderData(type, query, onread, onerror);
	} catch (error) {
	    console.log(error.name + ': ' + error.message);
	}
}

function postSteps(stepsData){
	fetch('https://floating-sea-64607.herokuapp.com/users/5cd9cafcb0903000049da772/patchSteps', {
	    method: 'PATCH',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({"walkStepCount": stepsData['walkStepCount'],"startTime": stepsData['startTime'], "endTime": stepsData['endTime'] })
	  }).then(function(response){
		  console.log('steps post success', response);
	  },
	  function(err){
		console.log(err);  
	  });
}

function postWorkout(runData){
	fetch('https://floating-sea-64607.herokuapp.com/users/5cd9cafcb0903000049da772/patchWorkout', {
	    method: 'PATCH',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({"runStepCount": runData['runStepCount'], "startTime": runData['startTime'], "endTime": runData['endTime'] })
	  }).then(function(response){
		  console.log('workouts post success', response);
	  },
	  function(err){
		console.log(err);  
	  });
}

function postDistance(distanceData){
	fetch('https://floating-sea-64607.herokuapp.com/users/5cd9cafcb0903000049da772/patchDistance', {
	    method: 'PATCH',
	    headers: {
	      'Accept': 'application/json',
	      'Content-Type': 'application/json'
	    },
	    body: JSON.stringify({"distance": distanceData['distance'], "startTime": distanceData['startTime'], "endTime": distanceData['endTime'] })
	  }).then(function(response){
		  console.log('distance post success', response);
	  },
	  function(err){
		console.log(err);  
	  });
}