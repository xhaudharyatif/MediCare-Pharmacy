// ==========================================
// CACHE MODULE
// ==========================================

const cache = new Map();

const CACHE_DURATION = 5 * 60 * 1000;

// ==========================================
// SAVE DATA TO CACHE
// ==========================================

export function setCache(key, data) {
    cache.set(key, {
        data: data,
        timestamp: Date.now(),
    });
}

// ==========================================
// GET DATA FROM CACHE
// ==========================================

export function getCache(key) {
    const cached = cache.get(key);

    if (!cached) {
        return null;
    }

    const cacheAge = Date.now() - cached.timestamp;

    // Cache is still valid

    if (cacheAge < CACHE_DURATION) {
        return cached.data;
    }

    // Cache expired

    cache.delete(key);

    return null;
}

// ==========================================
// CLEAR CACHE
// ==========================================

export function clearCache() {
    cache.clear();
}
