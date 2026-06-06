var choice = document.querySelectorAll('p');
choice.forEach(chosenCity => {chosenCity.addEventListener('click', async() => {

    button.value = "Fetching...";
    try{
    var search = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(chosenCity.textContent)}&count=1&language=en&format=json`);
    var object = await search.json();

    button.value = "View"

    if(object.results == null || object.results.length == 0)
    {
        document.getElementById('error').textContent = "ERROR: No matches found.";
        return;
    }
    else
    {
        document.getElementById('error').textContent = "";
    }

    var lat = object.results[0].latitude;
    var long = object.results[0].longitude;
    var name = object.results[0].name;

    var weather = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature,wind_speed_10m,relative_humidity_2m`);
    var weatherObjects = await weather.json();
    renderWeather(name, weatherObjects.current);
}
catch{}

});
});

function renderWeather(city, stats) {
    document.getElementById('name').textContent = city;
    document.getElementById('temp').textContent = `${stats.temperature}°C`;
    document.getElementById('winds').textContent = `${stats.wind_speed_10m} km/h`;
    document.getElementById('humid').textContent = `${stats.relative_humidity_2m}%`;
}