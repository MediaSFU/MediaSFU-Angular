import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LaunchConfirmExit {
    /**
     * Toggles the visibility of the confirmation exit modal.
     *
     * @param updateIsConfirmExitModalVisible - Function to update the visibility state of the confirmation exit modal.
     * @param isConfirmExitModalVisible - Current visibility state of the confirmation exit modal.
     */
    launchConfirmExit({ updateIsConfirmExitModalVisible, isConfirmExitModalVisible, }) {
        updateIsConfirmExitModalVisible(!isConfirmExitModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchConfirmExit, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchConfirmExit, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchConfirmExit, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWNvbmZpcm0tZXhpdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvZXhpdC1tZXRob2RzL2xhdW5jaC1jb25maXJtLWV4aXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVkzQyxNQUFNLE9BQU8saUJBQWlCO0lBQzVCOzs7OztPQUtHO0lBRUgsaUJBQWlCLENBQUMsRUFDaEIsK0JBQStCLEVBQy9CLHlCQUF5QixHQUNBO1FBQ3pCLCtCQUErQixDQUFDLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUM5RCxDQUFDO3VHQWJVLGlCQUFpQjsyR0FBakIsaUJBQWlCLGNBRmhCLE1BQU07OzJGQUVQLGlCQUFpQjtrQkFIN0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5leHBvcnQgaW50ZXJmYWNlIExhdW5jaENvbmZpcm1FeGl0T3B0aW9ucyB7XG4gIHVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGlzQ29uZmlybUV4aXRNb2RhbFZpc2libGU6IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIExhdW5jaENvbmZpcm1FeGl0VHlwZSA9IChvcHRpb25zOiBMYXVuY2hDb25maXJtRXhpdE9wdGlvbnMpID0+IHZvaWQ7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBMYXVuY2hDb25maXJtRXhpdCB7XG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBjb25maXJtYXRpb24gZXhpdCBtb2RhbC5cbiAgICpcbiAgICogQHBhcmFtIHVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIGNvbmZpcm1hdGlvbiBleGl0IG1vZGFsLlxuICAgKiBAcGFyYW0gaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZSAtIEN1cnJlbnQgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgY29uZmlybWF0aW9uIGV4aXQgbW9kYWwuXG4gICAqL1xuXG4gIGxhdW5jaENvbmZpcm1FeGl0KHtcbiAgICB1cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlLFxuICAgIGlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUsXG4gIH06IExhdW5jaENvbmZpcm1FeGl0T3B0aW9ucyk6IHZvaWQge1xuICAgIHVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUoIWlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUpO1xuICB9XG59XG4iXX0=