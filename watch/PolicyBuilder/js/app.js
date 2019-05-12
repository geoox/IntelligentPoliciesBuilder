  (function()
  {
	  tizen.ppm.requestPermission("http://tizen.org/privilege/healthinfo", function(){
		  tizen.ppm.requestPermission("http://tizen.org/privilege/location", function(){
			  console.log('sensors available');
			  
				//start tracking data

				var options = {
				    retentionPeriod: 48 /* 48 hours */
				}
				try {
				    tizen.humanactivitymonitor.startRecorder("PEDOMETER", options);
				} catch (err) {
				    console.log(err.name + ' - pedometer start err- : ' + err.message);
				}
				try {
				    tizen.humanactivitymonitor.startRecorder("SLEEP_MONITOR", options);
				} catch (err) {
				    console.log(err.name + ' - sleep start err- : ' + err.message);
				}
		  }, function(){
			  console.log('location sensors NOT available');
		  });
	  }, function(){
		  console.log('healthinfo sensors NOT available');
	  });

     var page = document.getElementById("main-page"),
	     changer = document.getElementById("main"),
	     sectionChanger,
	     elPageIndicator = document.getElementById("pageIndicator"),
	     pageIndicator,
	     pageIndicatorHandler;

		 page.addEventListener("pagebeforeshow", function()
		 {
		    /* Create PageIndicator */
		    pageIndicator =  tau.widget.PageIndicator(elPageIndicator, {numberOfPages: 4});
		    pageIndicator.setActive(0);
		
		    sectionChanger = new tau.widget.SectionChanger(changer,
		    {
		       circular: true,
		       orientation: "horizontal",
		       useBouncingEffect: false
		    });
		 });
		
		 page.addEventListener("pagehide", function()
		 {
		    sectionChanger.destroy();
		    pageIndicator.destroy();
		 });
		
		 /* Indicator setting handler */
		 pageIndicatorHandler = function(e)
		 {
		    pageIndicator.setActive(e.detail.active);
		 };
		 
		
		 /* Bind the callback */
		 changer.addEventListener("sectionchange", pageIndicatorHandler, false);
		 		
  })();
  