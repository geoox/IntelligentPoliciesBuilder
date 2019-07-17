console.log('starting to fetch...');
fetch('https://in-fit.herokuapp.com/users')
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

