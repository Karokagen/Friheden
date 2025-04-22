const appId = 'e36bf8dad45c50f9ba66b7732b1d6adf';

fetch("https://api.openweathermap.org/data/2.5/weather?q=aarhus&appid=" + appId + "&units=metric&lang=da")
.then(response => response.json())
.then(data => {
    let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString("da-DK");
    let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString("da-DK");

    let weather = data.weather[0].main.toLowerCase();
    let iconCode = data.weather[0].icon; // fx "01d"
    let customIconPath = './images/${iconcode}.png';
    let activitySuggestion = "";
    let tipIcon = "";

    if (weather.includes("rain")) {
        activitySuggestion = "Tag regnjakken på og prøv en indendørs aktivitet i Tivoli Friheden.";
        tipIcon = "🌧️";
    } else if (weather.includes("clear")) {
        activitySuggestion = "Det er perfekt vejr til en tur i rutsjebanen og en is i solen.";
        tipIcon = "☀️";
    } else if (weather.includes("cloud")) {
        activitySuggestion = "Mildt vejr – tag en afslappet tur i parken eller prøv pariserhjulet.";
        tipIcon = "☁️";
    } else if (weather.includes("snow")) {
        activitySuggestion = "Klæd dig varmt på – måske er det tid til en kop varm kakao!";
        tipIcon = "❄️";
    } else if (weather.includes("thunderstorm")) {
        activitySuggestion = "Hold dig i tørvejr og oplev indendørs underholdning.";
        tipIcon = "⛈️";
    } else {
        activitySuggestion = "Tag på eventyr – vejret er ikke en undskyldning.";
        tipIcon = "🎢";
    }

    let tempClass = '';
    if (data.main.temp > 20) {
        tempClass = 'hot';
    } else if (data.main.temp < 10) {
        tempClass = 'cold';
    } else {
        tempClass = 'mild';
    }

    let weatherType = 'weather-' + weather;
    document.body.className = weatherType;

    document.getElementById('result').innerHTML = 
        '<section class="weatherInfo">' +

            '<h1>Tivoli Friheden – ' + data.name + '</h1>' +

            '<p class="' + tempClass + '">Temperatur: ' + data.main.temp + '°C</p>' +
            '<p>Føles som: ' + data.main.feels_like + '°C</p>' +

            '<figure>' +
                '<img class="ikoner" src="images/' + data.weather[0].icon + '.png" alt="Vejrsymbol">' +
                '<figcaption>' + data.weather[0].description + '</figcaption>' +
            '</figure>' +

            '<p>Vind: ' + data.wind.speed + ' m/s</p>' +
            '<p>Vindretning: ' + data.wind.deg + '°</p>' +
            '<p>Luftfugtighed: ' + data.main.humidity + '%</p>' +
            '<p>Lufttryk: ' + data.main.pressure + ' hPa</p>' +

            '<p>Solopgang: ' + sunrise + '</p>' +
            '<p>Solnedgang: ' + sunset + '</p>' +

            '<p class="tip ' + weatherType + '"><strong>' + tipIcon + ' Tip:</strong> ' + activitySuggestion + '</p>' +

        '</section>';
})
.catch(err => {
    console.log('Noget gik galt ... ' + err);
});