export class GlobalErrorHandler {
    static handle(error: Error) {
        console.error('Unhandled Error:', error);
        
        // Optional: Send error to logging service
        this.logError(error);

        // Optional: Show user-friendly error notification
        this.showErrorNotification(error);
    }

    private static logError(error: Error) {
        // Implement logging to external service
        console.log('Logging error:', error);
    }

    private static showErrorNotification(error: Error) {
        // Implement UI notification mechanism
        alert(`An error occurred: ${error.message}`);
    }
}