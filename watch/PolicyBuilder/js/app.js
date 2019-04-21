  (function()
  {
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
		 
		window.addEventListener( 'tizenhwkey', function( ev ) {
			if( ev.keyName === "back" ) {
				window.history.back();
			}
		});
  })();
  