var HRValue = 0;
console.log('page 1 js loaded');
function getHR(){

	
	//start HR sensor
	webapis.motion.start("HRM", onchangedCB);

	setTimeout(function(){
		webapis.motion.stop("HRM");
		
		console.log('HRValue', HRValue);
		
	}, 15000); //15 seconds for the sensor to register HR

	function onchangedCB(hrmInfo)
	{
		HRValue = hrmInfo.heartRate;
	}


	function onerror(error) {
	    console.log(error.name + ': ' + error.message);
	}
}

function getTodaySteps(){
	try {
	    tizen.humanactivitymonitor.readRecorderData(type, query, onread, onerror);
	} catch (error) {
	    console.log(error.name + ': ' + error.message);
	}
}




