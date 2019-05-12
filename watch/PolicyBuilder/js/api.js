console.log('starting to fetch...');
fetch('https://floating-sea-64607.herokuapp.com/users')
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

var sensors = tizen.sensorservice.getAvailableSensors();
console.log('Available sensor: ' + sensors.toString());

