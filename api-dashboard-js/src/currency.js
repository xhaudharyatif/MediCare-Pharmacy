// ==========================================
// CURRENCY MODULE
// ==========================================

import { fetchWithRetry } from './api.js';

// ==========================================
// LOAD CURRENCY
// ==========================================

export async function loadCurrency(currencyStatus, currencyResult) {
    currencyStatus.textContent = 'Loading...';

    currencyResult.textContent = '';

    try {
        // ======================================
        // FETCH CURRENCY
        // ======================================

        const response = await fetchWithRetry(
            'https://open.er-api.com/v6/latest/USD'
        );

        // ======================================
        // 404
        // ======================================

        if (response.status === 404) {
            currencyStatus.textContent = 'Currency data not found.';

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
        // VALIDATE DATA
        // ======================================

        if (
            data.result !== 'success' ||
            !data.rates ||
            data.rates.PKR === undefined
        ) {
            throw new Error('Currency data unavailable.');
        }

        // ======================================
        // CREATE RESULT
        // ======================================

        const rate = document.createElement('p');

        rate.textContent = `1 USD = ${data.rates.PKR} PKR`;

        // ======================================
        // DISPLAY
        // ======================================

        currencyResult.append(rate);

        currencyStatus.textContent = 'Currency loaded successfully.';
    } catch (error) {
        currencyStatus.textContent = 'Unable to load currency data.';

        currencyResult.textContent = '';

        console.error('Currency error:', error);
    }
}
