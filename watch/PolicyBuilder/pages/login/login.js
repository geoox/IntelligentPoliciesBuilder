console.log('loaded login.js');

var user_id;
var username;
var pin;

function usernameChanged() {
	username = document.getElementById('username').value;
	console.log(username);
}

function pinChanged() {
	pin = document.getElementById('pin').value;
	console.log(pin);
}

function onLoginTapped() {
	console.log('on login tapped');
	console.log('username is: ', username);
	console.log('pin is: ', pin);
	
	var postObj = {
			"email": username,
			"watchPin": pin
	}
	
	fetch('https://in-fit.herokuapp.com/users/signin-watch', {
	      method: 'POST', 
	      body: JSON.stringify(postObj),
	      headers:{
	        'Content-Type': 'application/json',
	      }
    })
    .then(
		  function(response) {
		    response.json().then(function(data) {
		        console.log('logged user:',data);
		        user_id = data.user_id;
		        localStorage.setItem('user_id', user_id);
		        window.location = "../../index.html";
		      });
		    },
		   function(err) {
		    	console.log(err);
		    }
		  );
}