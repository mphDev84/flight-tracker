let todosRequest = async () => {
	const response = await fetch("https://jsonplaceholder.typicode.com/users");
	const data = await response.json();
	console.log("Data received is: ", data);
};

todosRequest();

function populateData(e) {
	e.preventDefault();
	y = document.querySelector("#user-input").value; //access user-input value
	console.log(y); //unit test
	document.querySelector("#user-form").reset();
	if (y === "") {
		alert("please enter a flight number"); //make sure there is a value!
	}
	setInterval(fetchFlightData, 3000, y); //pass user input value to fetch function, so that API can be called
	//a 'setInterval' function is used here to refresh the map with new flight data from each fetch function call
}

//function to fetch flight data
const fetchFlightData = (flightNumber) => {
	console.log("info");
	const myFlightNumberValue = flightNumber;
	fetch(
		`https://airlabs.co/api/v9/flight?flight_icao=${flightNumber}&api_key=*API key goes here*`
	)
		.then((res) => res.json())
		.then((json) => {
			console.log("JSON Data is: "); //test to see fetched data
			console.log(json);
			//	const myError = json["error"]["code"];
			//	console.log(myError);
			//if no data exists, inform user:
			if (json["error"]["code"]) {
				return (document.querySelector("#flight-data").innerHTML =
					"ERROR!: " + json["error"]["code"]);
			} else {
				const myLat = json["response"]["lat"]; //extract latitude of aircraft from data
				const myLong = json["response"]["lng"]; //extract longitude of aircraft from data
				const departureTime = json["response"]["dep_time"]; // extract departure time
				const arrivalTime = json["response"]["arr_time"]; //extract arrival time
				displayFlightData(
					myLat,
					myLong,
					myFlightNumberValue,
					departureTime,
					arrivalTime
				);
				initMap(myLat, myLong, myFlightNumberValue);
			}
		});
};

//display flight data
function displayFlightData(
	latitude,
	longitude,
	myFlightNumberValue,
	departureTime,
	arrivalTime
) {
	document.querySelector("#flight-data").innerHTML =
		"Longitude is: " +
		longitude +
		", latitude is: " +
		latitude +
		"<br>" +
		"<br>" +
		"Flight Number: " +
		myFlightNumberValue +
		"<br>" +
		"Departure Time: " +
		departureTime +
		"<br>" +
		"Arrival Time: " +
		arrivalTime +
		"<br>";
}

// Initialize and add the map
function initMap(latitude, longitude, flightNumber) {
	// The location of Uluru
	const uluru = { lat: latitude, lng: longitude };
	// The map, centered at Uluru
	const map = new google.maps.Map(document.getElementById("map"), {
		zoom: 6,
		center: uluru,
	});
	// The marker, positioned at Uluru
	const marker = new google.maps.Marker({
		position: uluru,
		map: map,
	});
}
