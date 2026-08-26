// ==========================================
// COUNTRY SEARCH MODULE
// ==========================================

import { fetchData } from './api.ts';

// ==========================================
// API RESPONSE TYPES
// ==========================================

interface CountryName {
    common: string;
    official: string;
}

interface Country {
    name: CountryName;
    cca2?: string;
    capital?: string[];
    region?: string;
    population?: number;
}

// ==========================================
// SEARCH COUNTRIES
// ==========================================

export function setupCountrySearch(
    countrySearch: HTMLInputElement,
    countryStatus: HTMLElement,
    countryResult: HTMLElement
): void {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    countrySearch.addEventListener('input', () => {
        clearTimeout(timeoutId);

        const query = countrySearch.value.trim();

        if (query === '') {
            countryStatus.textContent = '';
            countryResult.textContent = '';
            return;
        }

        timeoutId = setTimeout(() => {
            searchCountries(query, countryStatus, countryResult);
        }, 400);
    });
}

// ==========================================
// FETCH COUNTRIES
// ==========================================

async function searchCountries(
    query: string,
    countryStatus: HTMLElement,
    countryResult: HTMLElement
): Promise<void> {
    countryStatus.textContent = 'Searching...';
    countryResult.textContent = '';

    try {
        const data = await fetchData<Country[]>(
            `https://restcountries.com/v3.1/name/${encodeURIComponent(query)}`
        );

        countryStatus.textContent = `Found ${data.length} result(s).`;

        data.forEach((country) => {
            const item = document.createElement('article');

            const name = document.createElement('h3');
            name.textContent = country.name.common;

            item.append(name);

            if (country.capital?.[0]) {
                const capital = document.createElement('p');
                capital.textContent = `Capital: ${country.capital[0]}`;
                item.append(capital);
            }

            if (country.region) {
                const region = document.createElement('p');
                region.textContent = `Region: ${country.region}`;
                item.append(region);
            }

            if (country.population !== undefined) {
                const population = document.createElement('p');
                population.textContent = `Population: ${country.population.toLocaleString()}`;
                item.append(population);
            }

            countryResult.append(item);
        });
    } catch (error: unknown) {
        countryStatus.textContent = 'Unable to find country.';

        countryResult.textContent = '';

        if (error instanceof Error) {
            console.error('Country search error:', error.message);
        } else {
            console.error('Country search error:', error);
        }
    }
}
