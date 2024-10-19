import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LaunchBackground {
    /**
     * Toggles the visibility of the background modal.
     * @function
     * @param {Object} options - The options object containing necessary variables and functions.
     * @param {Function} options.updateIsBackgroundModalVisible - Function to update the visibility state of the background modal.
     * @param {boolean} options.isBackgroundModalVisible - Current visibility state of the background modal.
     */
    launchBackground({ updateIsBackgroundModalVisible, isBackgroundModalVisible, }) {
        updateIsBackgroundModalVisible(!isBackgroundModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchBackground, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchBackground, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchBackground, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWJhY2tncm91bmQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL2JhY2tncm91bmQtbWV0aG9kcy9sYXVuY2gtYmFja2dyb3VuZC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBWTNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0I7Ozs7OztPQU1HO0lBRUgsZ0JBQWdCLENBQUMsRUFDZiw4QkFBOEIsRUFDOUIsd0JBQXdCLEdBQ0E7UUFDeEIsOEJBQThCLENBQUMsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzVELENBQUM7dUdBZFUsZ0JBQWdCOzJHQUFoQixnQkFBZ0IsY0FGZixNQUFNOzsyRkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBMYXVuY2hCYWNrZ3JvdW5kT3B0aW9ucyB7XG4gIHVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgaXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlOiBib29sZWFuO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBMYXVuY2hCYWNrZ3JvdW5kVHlwZSA9IChvcHRpb25zOiBMYXVuY2hCYWNrZ3JvdW5kT3B0aW9ucykgPT4gdm9pZDtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIExhdW5jaEJhY2tncm91bmQge1xuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgYmFja2dyb3VuZCBtb2RhbC5cbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgbmVjZXNzYXJ5IHZhcmlhYmxlcyBhbmQgZnVuY3Rpb25zLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgYmFja2dyb3VuZCBtb2RhbC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZSAtIEN1cnJlbnQgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgYmFja2dyb3VuZCBtb2RhbC5cbiAgICovXG5cbiAgbGF1bmNoQmFja2dyb3VuZCh7XG4gICAgdXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlLFxuICAgIGlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZSxcbiAgfTogTGF1bmNoQmFja2dyb3VuZE9wdGlvbnMpOiB2b2lkIHtcbiAgICB1cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUoIWlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZSk7XG4gIH1cbn1cbiJdfQ==