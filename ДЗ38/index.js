const countryInput = document.getElementById('country-input');
const cityInput = document.getElementById('city-input');
const getWeatherButton = document.getElementById('get-weather');
const currentWeather = document.querySelector('.current-weather');
const forecast = document.querySelector('.forecast');

const geoApiKey = '6c993d61fd2a4e48aa4e0309383d880a';
const weatherApiKey = 'cf5b57c21ae743cea3f172828230305';

countryInput.addEventListener('input', () => {
    autocomplete(countryInput, 'country');
});

cityInput.addEventListener('input', () => {
    const countryCode = countryInput.getAttribute('data-country-code');
    if (countryCode) {
        autocomplete(cityInput, 'city', countryCode);
    } else {
        autocomplete(cityInput, 'city');
    }
});

getWeatherButton.addEventListener('click', () => {
    getWeatherData(cityInput.value);
});

function autocomplete(input, type, countryCode) {
    const query = input.value;
    if (query.length < 2) return;

    let url = `https://api.geoapify.com/v1/geocode/autocomplete?text=${query}&type=${type}&apikey=${geoApiKey}`;

    if (countryCode) {
        url += `&filter=countrycode:${countryCode}`;
    }

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);

            if (data.features.length > 0) {
                const firstResult = data.features[0];
                input.value = firstResult.properties.name;
                if (type === 'country') {
                    input.setAttribute('data-country-code', firstResult.properties.country_code);
                }
            }
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function getWeatherData(city) {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${weatherApiKey}&q=${city}&days=4`;

    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            const location = {
                name: data.location.name,
                country: data.location.country
            };

            displayCurrentWeather(data.current, location);
            displayForecast(data.forecast.forecastday.slice(1), location);
        }
    };
    xhr.open('GET', url, true);
    xhr.send();
}

function displayCurrentWeather(currentData, location) {
    const html = `
        <h3>Текущая погода</h3>
        <p>Температура: ${currentData.temp_c}°C</p>
        <p>Ощущается как: ${currentData.feelslike_c}°C</p>
        <p>Скорость ветра: ${currentData.wind_kph} км/ч</p>
        <p>Направление ветра: ${currentData.wind_dir}</p>
        <p>Влажность: ${currentData.humidity}%</p>
        <p>Описание: ${currentData.condition.text}</p>
    `;
    currentWeather.innerHTML = html;
    document.getElementById("location").innerText = `${location.name}, ${location.country}`;
}

function displayForecast(forecastData, location) {
    const html = forecastData.map(day => `
        <div>
            <h4>${new Date(day.date).toLocaleDateString()}</h4>
            <p>Макс: ${day.day.maxtemp_c}°C</p>
            <p>Мин: ${day.day.mintemp_c}°C</p>
            <p>Описание: ${day.day.condition.text}</p>
        </div>
    `).join('');
    forecast.innerHTML = html;
    document.getElementById("location").innerText = `${location.name}, ${location.country}`;
}
