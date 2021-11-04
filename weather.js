// API key should be in keys.js or secure in Google Cloud !!!
const apiKey = ea0bdc6d3ccc4ab1ab7111216211109;

// Select Elements
const locationElement = document.querySelector('#location');
const dayTimeElement = document.querySelector('#dayTime');
const summaryElement = document.querySelector('#summary');
const tempElement = document.querySelector('#currentTemp');
const iconElement = document.querySelector('#weatherIcon');

// Weather App data
const weather = {};
weather.temperature = {
    unit: 'celsius'
};

const KELVIN = 273;

// Function to set the location

function fetchLocation(apiKey, latitude, longitude) {
    var api = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;


    //var googleApiLink = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(api)
    .then(response => {
        return response.json()
    })
    .then(data => {
        //work json with data
        //document.getElementById("location").innerHTML = data.results[4].formatted_address;
        weather.locationElement = data.fetchLocation;
        
    })
    .then(function() {
        displayWeather();
    })
    .catch (err => {
        throw (`Sorry, an error ocurred ${err}`);
    })

}

// Display Weather to UI
function displayWeather() {
    iconElement.innerHTML = `<img src="icons/${weather.iconId}.png`;
    tempElement.innerHTML = `${weather.temperature.value}º <span>C</span>`;
    locationElement.innerHTML = `${weather.fetchLocation}`;
    summaryElement.innerHTML = weather.description;
    dayTimeElement.innerHTML = weather.localtime;
}

// Check if the user's browser supports Geolocation Services 

function initGeoLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setPosition, showError)
    }
    else {
        alert("Sorry, your browser does not support Geolocation Services.")
    }
}

// Locate latitud and longitud and set the position of the user

function setPosition(position) {
    // Add keys to the API (located at keys.js)
    // var dsKey = "";
    // var googleApiKey = "";

    fetchLocation(apiKey, position.coords.latitude, position.coords.longitude);
}

// In case there's an error with Geolocation Services

function showError() {
    alert("Sorry, your browser does not support geolocation services.");
}