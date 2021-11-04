// API key should be in keys.js or secure in Google Cloud !!!
const apiKey = ea0bdc6d3ccc4ab1ab7111216211109;

const wDay = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const wMonth = ["January", "February", "March", "April", "June", "July", "August", "September", "October", "November", "December"];

const iconValue = {
    SUNNYDAY: 'sunny-day',
    CLEARNIGHT: 'clear-night',
    RAIN: 'rain',
    SNOW: 'snow',
    SLEET: 'sleet',
    WIND: 'wind',
    FOG: 'fog',
    CLOUDY: 'cloudy',
    PARTLY_CLOUDY_DAY: 'partly-cloudy-day',
    PARTLY_CLOUDY_NIGHT: 'partly-cloudy-night' 
}

// Fetch the weather from WeatherAPI.com
function fetchWeatherReport(apiKey, latitude, longitude) {

    // to avoid the cors issue you need to run though a proxy or make the call server side
    var DsProxyLink = `https://cors-anywhere.herokuapp.com/`;
    var DsApiLink = `${DsProxyLink}https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;

    fetch(DsApiLink)
        .then(response => {
            return response.json()
        })
        .then(data => {
            // work with the data
            var resultsHTML = "";
            var tableHTML = "";
            var summary = data.currently.summary;
            var temperature = data.currently.temperature;
            var icon = data.currently.icon;
            var precipProbability = data.currently.precipProbability;
            var humidity = data.currently.humidity;
            var windSpeed = data.currently.windSpeed;
            var ts = new Date(data.currently.time * 1000);
            var forecastDate = `${wDay[ts.getDay()]} ${wMonth[ts.getMonth()]} ${ts.getDate()}`;

            // Set values for the current conditions
            // document.getElementById("location").innerHTML = name;
            document.getElementById("dayTime").innerHTML = forecastDate;
            document.getElementById("summary").innerHTML = summary;
            document.getElementById("currentTemp").innerHTML = `${MAth.round(temperature)}&deg`;
            document.getElementById("weatherIcon").src = getICON(icon);
            document.getElementById("precipitation").innerHTML = `Precipitation ${precipProbability*100}%`;
            document.getElementById("humidity").innerHTML = `Humidity ${Math.round(humidity*100)}%`;
            document.getElementById("wind").innerHTML = `Winds ${Math.round(windSpeed)} mph`;

        })
        .catch(err => {
            // Do domething for an error here
            throw (`Sorry, an error ocurred. ${err}`);
        })

}

// Fetch the address
function fetchLocation(apiKey, latitude, longitude) {
    var api = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`;


    //var googleApiLink = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    fetch(api)
    .then(response => {
        return response.json()
    })
    .then(data => {
        //work json with data
        document.getElementById("location").innerHTML = data.results[4].formatted_address;
    })
    .catch (err => {
        throw (`Sorry, an error ocurred ${err}`);
    })

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

// Render the correct icon



// Locate latitud and longitud and set the position of the user

function setPosition(position) {
    // Add keys to the API (located at keys.js)
    // var dsKey = "";
    // var googleApiKey = "";

    fetchLocation(apiKey, position.coords.latitude, position.coords.longitude);
    fetchWeatherReport(apiKey, position.coords.latitude, position.coords.longitude);
}

// In case there's an error with Geolocation Services

function showError() {
    alert("Sorry, your browser does not support geolocation services.");
}