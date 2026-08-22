// ==========================================
// WEATHER MODULE
// ==========================================

// ==========================================
// LOAD WEATHER
// ==========================================

export async function loadWeather(weatherStatus, weatherResult) {
    weatherStatus.textContent = 'Loading...';

    weatherResult.textContent = '';

    try {
        // ======================================
        // TWO WEATHER REQUESTS IN PARALLEL
        // ======================================

        const [currentResponse, forecastResponse] = await Promise.all([
            fetch(
                'https://api.open-meteo.com/v1/forecast?latitude=24.8607&longitude=67.0011&current=temperature_2m,wind_speed_10m'
            ),

            fetch(
                'https://api.open-meteo.com/v1/forecast?latitude=24.8607&longitude=67.0011&daily=temperature_2m_max,temperature_2m_min&forecast_days=1'
            ),
        ]);

        // ======================================
        // CHECK RESPONSES
        // ======================================

        if (!currentResponse.ok) {
            throw new Error(`Current weather error: ${currentResponse.status}`);
        }

        if (!forecastResponse.ok) {
            throw new Error(`Forecast error: ${forecastResponse.status}`);
        }

        // ======================================
        // READ JSON IN PARALLEL
        // ======================================

        const [currentData, forecastData] = await Promise.all([
            currentResponse.json(),

            forecastResponse.json(),
        ]);

        if (!currentData.current || !forecastData.daily) {
            throw new Error('Weather data unavailable.');
        }

        // ======================================
        // TEMPERATURE
        // ======================================

        const temperature = document.createElement('p');

        temperature.textContent = `Temperature: ${currentData.current.temperature_2m} °C`;

        // ======================================
        // WIND
        // ======================================

        const wind = document.createElement('p');

        wind.textContent = `Wind Speed: ${currentData.current.wind_speed_10m} km/h`;

        // ======================================
        // MAXIMUM
        // ======================================

        const maximum = document.createElement('p');

        maximum.textContent = `Today's Max: ${forecastData.daily.temperature_2m_max[0]} °C`;

        // ======================================
        // MINIMUM
        // ======================================

        const minimum = document.createElement('p');

        minimum.textContent = `Today's Min: ${forecastData.daily.temperature_2m_min[0]} °C`;

        // ======================================
        // DISPLAY
        // ======================================

        weatherResult.append(temperature, wind, maximum, minimum);

        weatherStatus.textContent = 'Weather loaded successfully.';

        console.log('Two weather requests completed in parallel.');
    } catch (error) {
        weatherStatus.textContent = 'Unable to load weather.';

        weatherResult.textContent = '';

        console.error('Weather error:', error);
    }
}
