// requests.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LaunchRequests {
    /**
     * Toggles the visibility state of the requests modal.
     *
     * @param {LaunchRequestsOptions} options - The options for launching requests.
     * @param {Function} options.updateIsRequestsModalVisible - Function to update the visibility state of the requests modal.
     * @param {boolean} options.isRequestsModalVisible - Current visibility state of the requests modal.
     * @returns {void}
     */
    launchRequests({ updateIsRequestsModalVisible, isRequestsModalVisible, }) {
        // Toggle the visibility of the display settings modal.
        updateIsRequestsModalVisible(!isRequestsModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchRequests, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchRequests, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchRequests, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLXJlcXVlc3RzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9yZXF1ZXN0cy1tZXRob2RzL2xhdW5jaC1yZXF1ZXN0cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNCQUFzQjtBQUN0QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVkzQyxNQUFNLE9BQU8sY0FBYztJQUN6Qjs7Ozs7OztPQU9HO0lBRUgsY0FBYyxDQUFDLEVBQ2IsNEJBQTRCLEVBQzVCLHNCQUFzQixHQUNBO1FBQ3RCLHVEQUF1RDtRQUN2RCw0QkFBNEIsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDeEQsQ0FBQzt1R0FoQlUsY0FBYzsyR0FBZCxjQUFjLGNBRmIsTUFBTTs7MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZXF1ZXN0cy5zZXJ2aWNlLnRzXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5leHBvcnQgaW50ZXJmYWNlIExhdW5jaFJlcXVlc3RzT3B0aW9ucyB7XG4gIHVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGlzUmVxdWVzdHNNb2RhbFZpc2libGU6IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIExhdW5jaFJlcXVlc3RzVHlwZSA9IChvcHRpb25zOiBMYXVuY2hSZXF1ZXN0c09wdGlvbnMpID0+IHZvaWQ7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBMYXVuY2hSZXF1ZXN0cyB7XG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSByZXF1ZXN0cyBtb2RhbC5cbiAgICpcbiAgICogQHBhcmFtIHtMYXVuY2hSZXF1ZXN0c09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgbGF1bmNoaW5nIHJlcXVlc3RzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUlzUmVxdWVzdHNNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIHJlcXVlc3RzIG1vZGFsLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuaXNSZXF1ZXN0c01vZGFsVmlzaWJsZSAtIEN1cnJlbnQgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgcmVxdWVzdHMgbW9kYWwuXG4gICAqIEByZXR1cm5zIHt2b2lkfVxuICAgKi9cblxuICBsYXVuY2hSZXF1ZXN0cyh7XG4gICAgdXBkYXRlSXNSZXF1ZXN0c01vZGFsVmlzaWJsZSxcbiAgICBpc1JlcXVlc3RzTW9kYWxWaXNpYmxlLFxuICB9OiBMYXVuY2hSZXF1ZXN0c09wdGlvbnMpOiB2b2lkIHtcbiAgICAvLyBUb2dnbGUgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGRpc3BsYXkgc2V0dGluZ3MgbW9kYWwuXG4gICAgdXBkYXRlSXNSZXF1ZXN0c01vZGFsVmlzaWJsZSghaXNSZXF1ZXN0c01vZGFsVmlzaWJsZSk7XG4gIH1cbn1cbiJdfQ==