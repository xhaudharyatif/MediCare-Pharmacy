// ==========================================
// COUNTRIES MODULE
// ==========================================

import { fetchWithRetry } from './api.js';

import { getCache, setCache } from './cache.js';

// ==========================================
// DISPLAY COUNTRIES
// ==========================================

function displayCountries(data, countryResult) {
    countryResult.textContent = '';

    data.forEach(function (country) {
        const countryItem = document.createElement('p');

        countryItem.textContent = country.name;

        countryResult.append(countryItem);
    });
}

// ==========================================
// SEARCH COUNTRY
// ==========================================

async function searchCountry(searchTerm, countryStatus, countryResult) {
    countryStatus.textContent = 'Loading...';

    countryResult.textContent = '';

    const cacheKey = searchTerm.toLowerCase();

    // ======================================
    // CHECK CACHE
    // ======================================

    const cached = getCache(cacheKey);

    if (cached) {
        console.log('Using cached country result:', cacheKey);

        displayCountries(cached, countryResult);

        countryStatus.textContent = 'Loaded from cache.';

        return;
    }

    // ======================================
    // API REQUEST
    // ======================================

    try {
        const response = await fetchWithRetry(
            `https://countries.dev/name/${encodeURIComponent(searchTerm)}`
        );

        // ======================================
        // 404
        // ======================================

        if (response.status === 404) {
            countryStatus.textContent = 'Country not found.';

            countryResult.textContent = '';

            return;
        }

        // ======================================
        // OTHER HTTP ERRORS
        // ======================================

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        // ======================================
        // JSON
        // ======================================

        const data = await response.json();

        // ======================================
        // EMPTY RESULT
        // ======================================

        if (!data || data.length === 0) {
            countryStatus.textContent = 'No countries found.';

            return;
        }

        // ======================================
        // SAVE TO CACHE
        // ======================================

        setCache(cacheKey, data);

        console.log('Country result saved to cache:', cacheKey);

        // ======================================
        // DISPLAY
        // ======================================

        displayCountries(data, countryResult);

        countryStatus.textContent = `Found ${data.length} result(s).`;
    } catch (error) {
        countryStatus.textContent = 'Server error. Please try again.';

        countryResult.textContent = '';

        console.error('Country search error:', error);
    }
}

// ==========================================
// SETUP COUNTRY SEARCH
// ==========================================

export function setupCountrySearch(
    countrySearch,
    countryStatus,
    countryResult
) {
    let countryDebounceTimer = null;

    countrySearch.addEventListener('input', function () {
        clearTimeout(countryDebounceTimer);

        countryStatus.textContent = 'Waiting...';

        countryResult.textContent = '';

        countryDebounceTimer = setTimeout(function () {
            const searchTerm = countrySearch.value.trim();

            if (searchTerm === '') {
                countryStatus.textContent = '';

                return;
            }

            searchCountry(searchTerm, countryStatus, countryResult);
        }, 400);
    });
}
