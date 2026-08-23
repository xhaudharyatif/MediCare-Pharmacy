import './style.css';

import { loadWeather } from './weather.js';
import { loadCurrency } from './currency.js';
import { setupCountrySearch } from './countries.js';

// ==========================================
// APP HTML
// ==========================================

document.querySelector('#app').innerHTML = `

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

const weatherStatus = document.querySelector('#weather-status');

const weatherResult = document.querySelector('#weather-result');

const currencyStatus = document.querySelector('#currency-status');

const currencyResult = document.querySelector('#currency-result');

const countrySearch = document.querySelector('#country-search');

const countryStatus = document.querySelector('#country-status');

const countryResult = document.querySelector('#country-result');

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
