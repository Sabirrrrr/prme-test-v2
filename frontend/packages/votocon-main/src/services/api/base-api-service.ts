// Base API Service for HTTP Requests
export class BaseApiService {
    protected baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    protected async request<T>(
        endpoint: string, 
        method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', 
        body?: any
    ): Promise<T> {
        const url = `${this.baseUrl}/${endpoint}`;
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
                // Add authorization headers if needed
            },
            body: body ? JSON.stringify(body) : undefined
        };

        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    }
}
