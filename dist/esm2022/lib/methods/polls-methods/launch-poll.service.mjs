import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LaunchPoll {
    /**
     * Toggles the visibility of the poll modal.
     * @function
     * @param {Object} options - The options object containing necessary variables and functions.
     * @param {Function} options.updateIsPollModalVisible - Function to update the visibility state of the poll modal.
     * @param {boolean} options.isPollModalVisible - Current visibility state of the poll modal.
     */
    launchPoll({ updateIsPollModalVisible, isPollModalVisible }) {
        updateIsPollModalVisible(!isPollModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchPoll, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchPoll, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchPoll, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLXBvbGwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3BvbGxzLW1ldGhvZHMvbGF1bmNoLXBvbGwuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVkzQyxNQUFNLE9BQU8sVUFBVTtJQUNyQjs7Ozs7O09BTUc7SUFFSCxVQUFVLENBQUMsRUFBRSx3QkFBd0IsRUFBRSxrQkFBa0IsRUFBcUI7UUFDNUUsd0JBQXdCLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ2hELENBQUM7dUdBWFUsVUFBVTsyR0FBVixVQUFVLGNBRlQsTUFBTTs7MkZBRVAsVUFBVTtrQkFIdEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5leHBvcnQgaW50ZXJmYWNlIExhdW5jaFBvbGxPcHRpb25zIHtcbiAgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICBpc1BvbGxNb2RhbFZpc2libGU6IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIExhdW5jaFBvbGxUeXBlID0gKG9wdGlvbnM6IExhdW5jaFBvbGxPcHRpb25zKSA9PiB2b2lkO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTGF1bmNoUG9sbCB7XG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBwb2xsIG1vZGFsLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyBuZWNlc3NhcnkgdmFyaWFibGVzIGFuZCBmdW5jdGlvbnMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBwb2xsIG1vZGFsLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuaXNQb2xsTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBwb2xsIG1vZGFsLlxuICAgKi9cblxuICBsYXVuY2hQb2xsKHsgdXBkYXRlSXNQb2xsTW9kYWxWaXNpYmxlLCBpc1BvbGxNb2RhbFZpc2libGUgfTogTGF1bmNoUG9sbE9wdGlvbnMpOiB2b2lkIHtcbiAgICB1cGRhdGVJc1BvbGxNb2RhbFZpc2libGUoIWlzUG9sbE1vZGFsVmlzaWJsZSk7XG4gIH1cbn1cbiJdfQ==