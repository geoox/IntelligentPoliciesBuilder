console.log('page 1 js loaded');
if(typeof currentHR === 'undefined'){
	document.getElementById("hr-display").innerHTML = "Data not available. Please sync data first"
} else {
	document.getElementById("hr-display").innerHTML = "Heart rate: " + currentHR + " bpm";
	document.getElementById("walk-display").innerHTML = "Walk: " + currentWalk+ " steps";
	document.getElementById("run-display").innerHTML = "Run: " + currentRun + " steps";
	document.getElementById("calories-display").innerHTML = "Running Calories: " + currentCalories;
	document.getElementById("distance-display").innerHTML = "Distance: " + currentDistance + " meters";
}





