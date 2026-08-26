// ==========================================
// CURRENCY MODULE
// ==========================================

import { fetchData } from './api.ts';

// ==========================================
// API RESPONSE TYPE
// ==========================================

interface CurrencyResponse {
    result: string;
    rates: {
        PKR?: number;
        [currency: string]: number | undefined;
    };
}

// ==========================================
// LOAD CURRENCY
// ==========================================

export async function loadCurrency(
    currencyStatus: HTMLElement,
    currencyResult: HTMLElement
): Promise<void> {
    currencyStatus.textContent = 'Loading...';
    currencyResult.textContent = '';

    try {
        const data = await fetchData<CurrencyResponse>(
            'https://open.er-api.com/v6/latest/USD'
        );

        if (
            data.result !== 'success' ||
            !data.rates ||
            data.rates.PKR === undefined
        ) {
            throw new Error('Currency data unavailable.');
        }

        const rate = document.createElement('p');

        rate.textContent = `1 USD = ${data.rates.PKR} PKR`;

        currencyResult.append(rate);

        currencyStatus.textContent = 'Currency loaded successfully.';
    } catch (error: unknown) {
        currencyStatus.textContent = 'Unable to load currency data.';

        currencyResult.textContent = '';

        if (error instanceof Error) {
            console.error('Currency error:', error.message);
        } else {
            console.error('Currency error:', error);
        }
    }
}
