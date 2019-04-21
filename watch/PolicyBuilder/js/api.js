setInterval(function(){ 
	console.log('starting to fetch...');
	fetch('http://localhost:8080/users')
	.then(
	  function(response) {
	    console.log('Get completed, response: ', response);
	    response.json().then(function(data) {
	        console.log('formattedData:',data);
	      });
	    },
	   function(err) {
	    	console.log(err);
	    }
	  );
}, 3000);

