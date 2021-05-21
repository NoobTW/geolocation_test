let button = document.getElementById('button');
let buttonWatch = document.getElementById('btnWatch');

button.onclick = getGPS;
buttonWatch.onclick = watchPosition;

/*
 * for GeoLocation API: https://developer.mozilla.org/zh-TW/docs/Web/API/Geolocation_API
 */
function getGPS() {
	if ("geolocation" in navigator) {
		function success(position) {
			// print in console. Press F12 on Browser and click "console".
			console.log(position.coords.latitude, position.coords.longitude);
			sendGPS(position.coords.latitude, position.coords.longitude);
		}

		function error() {
			alert('Geolocation error');
		}

		navigator.geolocation.getCurrentPosition(success, error);
	} else {
		alert('Geolocation is not available');
	}
}


/* 
 * for Fetch API: https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch
 */
function sendGPS(lat, lng) {
	// send to whatever Python or backend API
	const url = 'http://localhost:5000/';
	const data = { lat: lat, lng: lng };
	fetch(url, {
		  method: 'POST',
		  body: JSON.stringify(data),
		  headers: new Headers({
			  'Content-Type': 'application/json'
		})
	}).then(res => res.json())
		.catch(error => console.error('Error:', error))
		.then(response => console.log('Success:', response));
}

function watchPosition() {
	if ("geolocation" in navigator) {
		function success(position) {
			document.getElementById('location').innerText = position.coords.latitude + ', ' + position.coords.longitude;
		}

		function error() {
			document.getElementById('location').innerText = 'ERROR';
		}

		navigator.geolocation.watchPosition(success, error);
	} else {
		alert('Geolocation is not available');
	}
}
