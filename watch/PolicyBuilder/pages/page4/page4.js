( function () {
	window.addEventListener( 'tizenhwkey', function( ev ) {
		if( ev.keyName === "back" ) {
			
			window.history.back();
			
		}
	} );
} () );

function page4(){
	console.log('page 4 summoned');
	
	var HRValue = 0;
	
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
	
	
//	function onerror(error) {
//	    console.log(error.name + ': ' + error.message);
//	}
//
//	function onread(data) {
//	    for (var idx = 0; idx < data.length; ++idx) {
//	        console.log('average pressure: ' + data[idx].average);
//	    }
//	}
//
//	var type = 'PRESSURE';
//
//	try {
//	    tizen.humanactivitymonitor.readRecorderData(type, query, onread, onerror);
//	} catch (error) {
//	    console.log(error.name + ': ' + error.message);
//	}
}