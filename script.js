const apiKey = "7bc82ee862e8bcc5ba1b17bf5eb58fd9";
let searchButton = document.getElementById("search_button");
let cityName = document.getElementById("city_name");
let cityNameLabel = document.getElementById("city_name_label");
let tempLabel = document.getElementById("temp_label");
let humidityLabel = document.getElementById("humidity_label");
let windSpeedLabel = document.getElementById("wind_speed_label");
let weatherIcon = document.getElementById("weather_icon");

async function getData(api_key, city_name) {
    let headersList = {
        "Accept": "*/*",
        "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }

    try {
        let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${api_key}&units=metric`, {
            method: "GET",
            headers: headersList
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        let data = await response.json();
        console.log(data);
        cityNameLabel.innerText = data.name;
        tempLabel.innerText = data.main.temp + "°";
        humidityLabel.innerText = data.main.humidity + "%";
        windSpeedLabel.innerText = data.wind.speed + " km/h";

        switch (data.weather[0].main) {
            case "Clear":
                weatherIcon.src = "images/clear.png";
                break;
            case "Clouds":
                weatherIcon.src = "images/clouds.png";
                break;
            case "Rain":
                weatherIcon.src = "images/rain.png";
                break;
            case "Drizzle":
                weatherIcon.src = "images/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "images/mist.png";
                break;
            default:
                weatherIcon.src = "images/clear.png";
                break;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        cityNameLabel.innerText = 'Error fetching weather data';
        tempLabel.innerText = '';
        humidityLabel.innerText = '';
        windSpeedLabel.innerText = '';
        weatherIcon.src = '';
    }
}

searchButton.addEventListener("click", () => {
    getData(apiKey, cityName.value);
});
