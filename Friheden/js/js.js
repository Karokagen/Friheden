/*
Fil: oevelse.js
Formål: sådan virker API'en fra OpenWeatherMap
*/

// Token fra OpenWeatherMap
const appId = 'e36bf8dad45c50f9ba66b7732b1d6adf';

// Henter vejret via lat/lon for Tivoli Friheden
fetch("https://api.openweathermap.org/data/2.5/weather?lat=56.1356261242&lon=10.1908409033&appid=" + appId + "&units=metric&lang=da")
.then(response => {
    return response.json(); // får data som JSON
})
.then(data => {
    console.log(data); // viser data i konsollen

    // Konverter solopgang og solnedgang fra Unix-tid
    let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("da-DK");
    let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("da-DK");

    // Vejrtype og forslag til aktivitet
    let weather = data.weather[0].main.toLowerCase();
    let activitySuggestion = "";

    if (weather.includes("rain")) {
        activitySuggestion = "Tag regnjakken på og prøv en indendørs aktivitet i Tivoli Friheden.";
    } else if (weather.includes("clear")) {
        activitySuggestion = "Det er perfekt vejr til en tur i rutsjebanen og en is i solen.";
    } else if (weather.includes("cloud")) {
        activitySuggestion = "Mildt vejr – tag en afslappet tur i parken eller prøv pariserhjulet.";
    } else {
        activitySuggestion = "Tag på eventyr – vejret er ikke en undskyldning.";
    }

    // Tilføj farveklasse baseret på temperatur
    let tempClass = '';
    if (data.main.temp > 20) {
        tempClass = 'hot';
    } else if (data.main.temp < 10) {
        tempClass = 'cold';
    } else {
        tempClass = 'mild';
    }

    // Tilføj vejr-type som klasse på body (til baggrund)
    let weatherType = 'weather-' + weather; // fx 'clear' → 'weather-clear'
    document.body.className = weatherType;

    // Lægger vejrdata ind i #result
    document.getElementById('result').innerHTML = 
        '<section class="weatherInfo">' +

            '<h1>Tivoli Friheden – ' + data.name + '</h1>' +

            '<p class="' + tempClass + '">Temperatur: ' + data.main.temp + '°C</p>' +
            '<p>Føles som: ' + data.main.feels_like + '°C</p>' +

            '<figure>' +
                '<img src="http://openweathermap.org/img/wn/' + data.weather[0].icon + '.png" alt="Vejrsymbol">' +
                '<figcaption>' + data.weather[0].description + '</figcaption>' +
            '</figure>' +

            '<p>Vind: ' + data.wind.speed + ' m/s</p>' +
            '<p>Vindretning: ' + data.wind.deg + '°</p>' +
            '<p>Luftfugtighed: ' + data.main.humidity + '%</p>' +
            '<p>Lufttryk: ' + data.main.pressure + ' hPa</p>' +

            '<p>Solopgang: ' + sunrise + '</p>' +
            '<p>Solnedgang: ' + sunset + '</p>' +

            '<p><strong>Tip:</strong> ' + activitySuggestion + '</p>' +

        '</section>';
})
.catch(err => {
    console.log('Noget gik galt ... ' + err);
});