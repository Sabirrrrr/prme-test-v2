export class AppStateService {
    private static state: Record<string, any> = {};

    static setState(key: string, value: any) {
        this.state[key] = value;
        // Optional: Trigger state change event
        this.notifyStateChange(key);
    }

    static getState(key: string) {
        return this.state[key];
    }

    private static notifyStateChange(key: string) {
        // Implement state change notification mechanism
        const event = new CustomEvent('app-state-change', { 
            detail: { key, value: this.state[key] } 
        });
        window.dispatchEvent(event);
    }
}