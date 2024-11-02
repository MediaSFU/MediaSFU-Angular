// requests.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Toggles the visibility state of the requests modal.
 *
 * @param {LaunchRequestsOptions} options - The options for launching requests.
 * @param {Function} options.updateIsRequestsModalVisible - Function to update the visibility state of the requests modal.
 * @param {boolean} options.isRequestsModalVisible - Current visibility state of the requests modal.
 * @returns {void}
 *
 * @remarks
 * This method is used to open or close the requests modal by toggling its visibility state.
 * It takes the current visibility state as input and updates it accordingly.
 *
 * @example
 * ```typescript
 * const options: LaunchRequestsOptions = {
 *   updateIsRequestsModalVisible: (isVisible) => {
 *     console.log('Requests modal visibility:', isVisible);
 *   },
 *   isRequestsModalVisible: false,
 * };
 *
 * const launchRequestsService = new LaunchRequests();
 * launchRequestsService.launchRequests(options);
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLXJlcXVlc3RzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9yZXF1ZXN0cy1tZXRob2RzL2xhdW5jaC1yZXF1ZXN0cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNCQUFzQjtBQUN0QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBTUgsTUFBTSxPQUFPLGNBQWM7SUFDekI7Ozs7Ozs7T0FPRztJQUVILGNBQWMsQ0FBQyxFQUNiLDRCQUE0QixFQUM1QixzQkFBc0IsR0FDQTtRQUN0Qix1REFBdUQ7UUFDdkQsNEJBQTRCLENBQUMsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBQ3hELENBQUM7dUdBaEJVLGNBQWM7MkdBQWQsY0FBYyxjQUZiLE1BQU07OzJGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gcmVxdWVzdHMuc2VydmljZS50c1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBMYXVuY2hSZXF1ZXN0c09wdGlvbnMge1xuICB1cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICBpc1JlcXVlc3RzTW9kYWxWaXNpYmxlOiBib29sZWFuO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBMYXVuY2hSZXF1ZXN0c1R5cGUgPSAob3B0aW9uczogTGF1bmNoUmVxdWVzdHNPcHRpb25zKSA9PiB2b2lkO1xuXG4vKipcbiAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIHJlcXVlc3RzIG1vZGFsLlxuICpcbiAqIEBwYXJhbSB7TGF1bmNoUmVxdWVzdHNPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGxhdW5jaGluZyByZXF1ZXN0cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlSXNSZXF1ZXN0c01vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgcmVxdWVzdHMgbW9kYWwuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuaXNSZXF1ZXN0c01vZGFsVmlzaWJsZSAtIEN1cnJlbnQgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgcmVxdWVzdHMgbW9kYWwuXG4gKiBAcmV0dXJucyB7dm9pZH1cbiAqXG4gKiBAcmVtYXJrc1xuICogVGhpcyBtZXRob2QgaXMgdXNlZCB0byBvcGVuIG9yIGNsb3NlIHRoZSByZXF1ZXN0cyBtb2RhbCBieSB0b2dnbGluZyBpdHMgdmlzaWJpbGl0eSBzdGF0ZS5cbiAqIEl0IHRha2VzIHRoZSBjdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgYXMgaW5wdXQgYW5kIHVwZGF0ZXMgaXQgYWNjb3JkaW5nbHkuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IG9wdGlvbnM6IExhdW5jaFJlcXVlc3RzT3B0aW9ucyA9IHtcbiAqICAgdXBkYXRlSXNSZXF1ZXN0c01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZSkgPT4ge1xuICogICAgIGNvbnNvbGUubG9nKCdSZXF1ZXN0cyBtb2RhbCB2aXNpYmlsaXR5OicsIGlzVmlzaWJsZSk7XG4gKiAgIH0sXG4gKiAgIGlzUmVxdWVzdHNNb2RhbFZpc2libGU6IGZhbHNlLFxuICogfTtcbiAqXG4gKiBjb25zdCBsYXVuY2hSZXF1ZXN0c1NlcnZpY2UgPSBuZXcgTGF1bmNoUmVxdWVzdHMoKTtcbiAqIGxhdW5jaFJlcXVlc3RzU2VydmljZS5sYXVuY2hSZXF1ZXN0cyhvcHRpb25zKTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIExhdW5jaFJlcXVlc3RzIHtcbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIHJlcXVlc3RzIG1vZGFsLlxuICAgKlxuICAgKiBAcGFyYW0ge0xhdW5jaFJlcXVlc3RzT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBsYXVuY2hpbmcgcmVxdWVzdHMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlSXNSZXF1ZXN0c01vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgcmVxdWVzdHMgbW9kYWwuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc1JlcXVlc3RzTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSByZXF1ZXN0cyBtb2RhbC5cbiAgICogQHJldHVybnMge3ZvaWR9XG4gICAqL1xuXG4gIGxhdW5jaFJlcXVlc3RzKHtcbiAgICB1cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlLFxuICAgIGlzUmVxdWVzdHNNb2RhbFZpc2libGUsXG4gIH06IExhdW5jaFJlcXVlc3RzT3B0aW9ucyk6IHZvaWQge1xuICAgIC8vIFRvZ2dsZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgZGlzcGxheSBzZXR0aW5ncyBtb2RhbC5cbiAgICB1cGRhdGVJc1JlcXVlc3RzTW9kYWxWaXNpYmxlKCFpc1JlcXVlc3RzTW9kYWxWaXNpYmxlKTtcbiAgfVxufVxuIl19