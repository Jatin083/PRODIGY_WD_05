const weatherApiKey = "781e1d539b83312fa9ef15f94d846ad5";
const weatherApiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const cityInputField = document.getElementById("city-input");
const searchButton = document.getElementById("search-btn");
const errorDisplay = document.getElementById("error-message");
const loadingIndicator = document.getElementById("loading");
const weatherDisplay = document.getElementById("weather-box");
const weatherIcon = document.getElementById("weather-icon");
const temperatureDisplay = document.getElementById("temperature");
const cityNameDisplay = document.getElementById("city-name");
const humidityDisplay = document.getElementById("humidity");
const windSpeedDisplay = document.getElementById("wind-speed");

const weatherIcons = {
    clear: "./images/clear.png",
    clouds: "./images/clouds.png",
    rain: "./images/rain.png",
    drizzle: "./images/drizzle.png",
    mist: "./images/mist.png",
    snow: "./images/snow.png",
    thunderstorm: "./images/thunderstorm.png",
    default: "./images/clear.png"
};

async function fetchWeather(city) {
    try {
        
        loadingIndicator.style.display = "block";
        errorDisplay.style.display = "none";

        
        const response = await fetch(`${weatherApiUrl}${city}&appid=${weatherApiKey}`);

        
        if (!response.ok) {
            if (response.status === 404) {
                errorDisplay.textContent = "City not found. Please try again.";
            } else {
                errorDisplay.textContent = "Oops! Something went wrong. Please try again later.";
            }
            errorDisplay.style.display = "block";
            weatherDisplay.style.display = "none";
            return;
        }

        const weatherData = await response.json();

        
        cityNameDisplay.textContent = weatherData.name;
        temperatureDisplay.textContent = `${Math.round(weatherData.main.temp)}°C`;
        humidityDisplay.textContent = `${weatherData.main.humidity}%`;
        windSpeedDisplay.textContent = `${weatherData.wind.speed} km/h`;

        
        const weatherCondition = weatherData.weather[0].main.toLowerCase();
        const iconPath = weatherIcons[weatherCondition] || weatherIcons.default;
        
        weatherIcon.src = iconPath;

        
        weatherDisplay.style.display = "block";

    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorDisplay.textContent = "An error occurred while fetching weather data. Please try again later.";
        errorDisplay.style.display = "block";
        weatherDisplay.style.display = "none";
    } finally {
        
        loadingIndicator.style.display = "none";
    }
}

function handleWeatherSearch() {
    const city = cityInputField.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        errorDisplay.textContent = "Please enter a city name.";
        errorDisplay.style.display = "block";
        weatherDisplay.style.display = "none";
    }
}

searchButton.addEventListener("click", handleWeatherSearch);

cityInputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleWeatherSearch();
    }
});
