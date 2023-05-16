const countryInput = document.getElementById('country-input');
const cityInput = document.getElementById('city-input');
const getWeatherButton = document.getElementById('get-weather');
const currentWeather = document.getElementById('current-weather-details');
const forecast = document.getElementById('forecast-details');

const countryList = document.getElementById('country-list');
const cityList = document.getElementById('city-list');

const geoApiKey = '7d2183b00c434181b6e7645c75f15233';
const weatherApiKey = 'cf5b57c21ae743cea3f172828230305';

countryInput.addEventListener('input', () => {
    autocomplete(countryInput, 'country', countryList);
});

cityInput.addEventListener('input', () => {
    const countryCode = countryInput.getAttribute('data-country-code');
    if (countryCode) {
        autocomplete(cityInput, 'city', cityList, countryCode);
    } else {
        autocomplete(cityInput, 'city', cityList);
    }
});

getWeatherButton.addEventListener('click', () => {
    getWeatherData(cityInput.value);
});

function autocomplete(input, type, listElement, countryCode) {
    const query = input.value;
    if (query.length < 2) return;

    let url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&apiKey=${geoApiKey}`;

    if (countryCode) {
        url += `&filter=countrycode:${countryCode}`;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            listElement.innerHTML = data.features.map(feat => {
                return `<div data-value="${feat.properties.name}" data-country-code="${feat.properties.country_code}">${feat.properties.name}</div>`;
            }).join('');

            listElement.querySelectorAll('div').forEach(div => {
                div.addEventListener('click', () => {
                    input.value = div.getAttribute('data-value');
                    listElement.innerHTML = '';
                    if (type === 'country') {
                        input.setAttribute('data-country-code', div.getAttribute('data-country-code'));
                    }
                });
            });
        });
}

function getWeatherData(city) {
    const currentWeatherUrl = `https://api.weatherapi.com/v1/current.json?key=${weatherApiKey}&q=${city}&aqi=no`;
    const forecastWeatherUrl = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=3&aqi=no&alerts=no`;


    fetch(currentWeatherUrl)
        .then(response => response.json())
        .then(data => {
            const location = {                name: data.location.name,
                country: data.location.country
            };

            displayCurrentWeather(data.current, location);

            fetch(forecastWeatherUrl)
                .then(response => response.json())
                .then(forecastData => {
                    displayForecast(forecastData.forecast.forecastday, location);
                });
        });
}

function displayCurrentWeather(currentData, location) {
    const html = `
    <h3>Текущая погода в ${location.name}, ${location.country}</h3>
    <p>Температура: ${currentData.temp_c}°C</p>
    <p>Ощущается как: ${currentData.feelslike_c}°C</p>
    <p>Влажность: ${currentData.humidity}%</p>
    <p>Скорость ветра: ${currentData.wind_kph} км/ч</p>
    <p>Направление ветра: ${currentData.wind_dir}</p>
    `;
    currentWeather.innerHTML = html;
}

function displayForecast(forecastData, location) {
    if (!forecastData) {
        console.log('No forecast data received');
        return;
    }
    const html = forecastData.map(day => {
        return `
            <div>
                <h3>Прогноз на ${day.date} для ${location.name}, ${location.country}</h3>
                <p>Макс. температура: ${day.day.maxtemp_c}°C</p>
                <p>Мин. температура: ${day.day.mintemp_c}°C</p>
                <p>Средняя скорость ветра: ${day.day.avgvis_km} км/ч</p>
                <p>Макс. порыв ветра: ${day.day.maxwind_kph} км/ч</p>
                <p>Вероятность осадков: ${day.day.daily_chance_of_rain}%</p>
            </div>
        `;
    }).join('');
    forecast.innerHTML = html;
}

