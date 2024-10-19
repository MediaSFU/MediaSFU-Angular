import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LaunchMenuModal {
    /**
     * Toggles the visibility of the menu modal.
     *
     * @param updateIsMenuModalVisible - Function to update the visibility state of the menu modal.
     * @param isMenuModalVisible - Current visibility state of the menu modal.
     */
    launchMenuModal({ updateIsMenuModalVisible, isMenuModalVisible }) {
        updateIsMenuModalVisible(!isMenuModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchMenuModal, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchMenuModal, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchMenuModal, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLW1lbnUtbW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL21lbnUtbWV0aG9kcy9sYXVuY2gtbWVudS1tb2RhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBWTNDLE1BQU0sT0FBTyxlQUFlO0lBQzFCOzs7OztPQUtHO0lBRUgsZUFBZSxDQUFDLEVBQUUsd0JBQXdCLEVBQUUsa0JBQWtCLEVBQTBCO1FBQ3RGLHdCQUF3QixDQUFDLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUNoRCxDQUFDO3VHQVZVLGVBQWU7MkdBQWYsZUFBZSxjQUZkLE1BQU07OzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBMYXVuY2hNZW51TW9kYWxPcHRpb25zIHtcbiAgdXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICBpc01lbnVNb2RhbFZpc2libGU6IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIExhdW5jaE1lbnVNb2RhbFR5cGUgPSAob3B0aW9uczogTGF1bmNoTWVudU1vZGFsT3B0aW9ucykgPT4gdm9pZDtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIExhdW5jaE1lbnVNb2RhbCB7XG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBtZW51IG1vZGFsLlxuICAgKlxuICAgKiBAcGFyYW0gdXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBtZW51IG1vZGFsLlxuICAgKiBAcGFyYW0gaXNNZW51TW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBtZW51IG1vZGFsLlxuICAgKi9cblxuICBsYXVuY2hNZW51TW9kYWwoeyB1cGRhdGVJc01lbnVNb2RhbFZpc2libGUsIGlzTWVudU1vZGFsVmlzaWJsZSB9OiBMYXVuY2hNZW51TW9kYWxPcHRpb25zKTogdm9pZCB7XG4gICAgdXBkYXRlSXNNZW51TW9kYWxWaXNpYmxlKCFpc01lbnVNb2RhbFZpc2libGUpO1xuICB9XG59XG4iXX0=