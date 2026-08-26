// ==========================================
// API HELPER
// ==========================================

export async function fetchData<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const response = await fetch(url, options);

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json() as Promise<T>;
}
