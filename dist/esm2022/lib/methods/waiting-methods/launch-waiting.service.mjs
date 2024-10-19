import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LaunchWaiting {
    /**
     * Toggles the visibility of the waiting modal.
     *
     * @param updateIsWaitingModalVisible - Function to update the visibility state of the waiting modal.
     * @param isWaitingModalVisible - Current visibility state of the waiting modal.
     */
    launchWaiting({ updateIsWaitingModalVisible, isWaitingModalVisible, }) {
        // Open or close the menu modal
        updateIsWaitingModalVisible(!isWaitingModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchWaiting, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchWaiting, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchWaiting, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLXdhaXRpbmcuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3dhaXRpbmctbWV0aG9kcy9sYXVuY2gtd2FpdGluZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBWTNDLE1BQU0sT0FBTyxhQUFhO0lBQ3hCOzs7OztPQUtHO0lBRUgsYUFBYSxDQUFDLEVBQ1osMkJBQTJCLEVBQzNCLHFCQUFxQixHQUNBO1FBQ3JCLCtCQUErQjtRQUMvQiwyQkFBMkIsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFDdEQsQ0FBQzt1R0FkVSxhQUFhOzJHQUFiLGFBQWEsY0FGWixNQUFNOzsyRkFFUCxhQUFhO2tCQUh6QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgTGF1bmNoV2FpdGluZ09wdGlvbnMge1xuICB1cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGU6ICh2aXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICBpc1dhaXRpbmdNb2RhbFZpc2libGU6IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIExhdW5jaFdhaXRpbmdUeXBlID0gKG9wdGlvbnM6IExhdW5jaFdhaXRpbmdPcHRpb25zKSA9PiB2b2lkO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTGF1bmNoV2FpdGluZyB7XG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSB3YWl0aW5nIG1vZGFsLlxuICAgKlxuICAgKiBAcGFyYW0gdXBkYXRlSXNXYWl0aW5nTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSB3YWl0aW5nIG1vZGFsLlxuICAgKiBAcGFyYW0gaXNXYWl0aW5nTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSB3YWl0aW5nIG1vZGFsLlxuICAgKi9cblxuICBsYXVuY2hXYWl0aW5nKHtcbiAgICB1cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGUsXG4gICAgaXNXYWl0aW5nTW9kYWxWaXNpYmxlLFxuICB9OiBMYXVuY2hXYWl0aW5nT3B0aW9ucyk6IHZvaWQge1xuICAgIC8vIE9wZW4gb3IgY2xvc2UgdGhlIG1lbnUgbW9kYWxcbiAgICB1cGRhdGVJc1dhaXRpbmdNb2RhbFZpc2libGUoIWlzV2FpdGluZ01vZGFsVmlzaWJsZSk7XG4gIH1cbn1cbiJdfQ==