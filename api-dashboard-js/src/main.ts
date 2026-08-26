import './style.css';

import { loadWeather } from './weather.ts';
import { loadCurrency } from './currency.ts';
import { setupCountrySearch } from './countries.ts';

// ==========================================
// APP HTML
// ==========================================

const app = document.querySelector<HTMLElement>('#app');

if (!app) {
    throw new Error('App element not found.');
}

app.innerHTML = `
    <main class="dashboard">

        <h1>API Dashboard</h1>

        <!-- WEATHER -->

        <section class="card">

            <h2>Weather</h2>

            <p id="weather-status">
                Loading...
            </p>

            <div id="weather-result"></div>

        </section>

        <!-- CURRENCY -->

        <section class="card">

            <h2>Currency</h2>

            <p id="currency-status">
                Loading...
            </p>

            <div id="currency-result"></div>

        </section>

        <!-- COUNTRY SEARCH -->

        <section class="card">

            <h2>Country Search</h2>

            <input
                id="country-search"
                type="search"
                placeholder="Search country..."
                autocomplete="off"
            >

            <p id="country-status"></p>

            <div id="country-result"></div>

        </section>

    </main>
`;

// ==========================================
// GET HTML ELEMENTS
// ==========================================

const weatherStatus = document.querySelector<HTMLElement>('#weather-status');

const weatherResult = document.querySelector<HTMLElement>('#weather-result');

const currencyStatus = document.querySelector<HTMLElement>('#currency-status');

const currencyResult = document.querySelector<HTMLElement>('#currency-result');

const countrySearch =
    document.querySelector<HTMLInputElement>('#country-search');

const countryStatus = document.querySelector<HTMLElement>('#country-status');

const countryResult = document.querySelector<HTMLElement>('#country-result');

// ==========================================
// VALIDATE REQUIRED ELEMENTS
// ==========================================

if (
    !weatherStatus ||
    !weatherResult ||
    !currencyStatus ||
    !currencyResult ||
    !countrySearch ||
    !countryStatus ||
    !countryResult
) {
    throw new Error('Required dashboard elements are missing.');
}

// ==========================================
// LOAD WEATHER
// ==========================================

loadWeather(weatherStatus, weatherResult);

// ==========================================
// LOAD CURRENCY
// ==========================================

loadCurrency(currencyStatus, currencyResult);

// ==========================================
// SETUP COUNTRY SEARCH
// ==========================================

setupCountrySearch(countrySearch, countryStatus, countryResult);
