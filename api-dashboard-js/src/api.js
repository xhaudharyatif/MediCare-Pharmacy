// ==========================================
// API HELPER
// ==========================================

export async function fetchWithRetry(url, options = {}, maxAttempts = 3) {
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            console.log(`Request attempt ${attempt}: ${url}`);

            const response = await fetch(url, options);

            // 404 should not be retried

            if (response.status === 404) {
                return response;
            }

            // Handle other HTTP errors

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return response;
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error.message);

            // Final attempt

            if (attempt === maxAttempts) {
                throw error;
            }

            // Increasing delay

            const delay = attempt * 1000;

            console.log(`Retrying in ${delay / 1000} second(s)...`);

            await new Promise(function (resolve) {
                setTimeout(resolve, delay);
            });
        }
    }
}
