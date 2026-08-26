// ==========================================
// WEATHER MODULE
// ==========================================

import { fetchData } from './api.ts';

interface WeatherCurrent {
    temperature_2m: number;
    wind_speed_10m: number;
}

interface WeatherDaily {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
}

interface WeatherResponse {
    current: WeatherCurrent;
    daily: WeatherDaily;
}

// ==========================================
// LOAD WEATHER
// ==========================================

export async function loadWeather(
    weatherStatus: HTMLElement,
    weatherResult: HTMLElement
): Promise<void> {
    weatherStatus.textContent = 'Loading...';
    weatherResult.textContent = '';

    try {
        const data = await fetchData<WeatherResponse>(
            'https://api.open-meteo.com/v1/forecast?latitude=30.67&longitude=73.11&current=temperature_2m,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto'
        );

        const temperature = document.createElement('p');
        temperature.textContent = `Temperature: ${data.current.temperature_2m} °C`;

        const wind = document.createElement('p');
        wind.textContent = `Wind Speed: ${data.current.wind_speed_10m} km/h`;

        const max = document.createElement('p');
        max.textContent = `Today's Max: ${data.daily.temperature_2m_max[0]} °C`;

        const min = document.createElement('p');
        min.textContent = `Today's Min: ${data.daily.temperature_2m_min[0]} °C`;

        weatherResult.append(temperature, wind, max, min);

        weatherStatus.textContent = 'Weather loaded successfully.';
    } catch (error: unknown) {
        weatherStatus.textContent = 'Unable to load weather data.';
        weatherResult.textContent = '';

        if (error instanceof Error) {
            console.error('Weather error:', error.message);
        } else {
            console.error('Weather error:', error);
        }
    }
}
