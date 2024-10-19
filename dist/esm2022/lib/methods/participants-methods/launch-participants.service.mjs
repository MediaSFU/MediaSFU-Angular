import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LaunchParticipants {
    /**
     * Toggles the visibility of the participants modal.
     * @function
     * @param {Object} options - The options object containing necessary variables and functions.
     * @param {Function} options.updateIsParticipantsModalVisible - Function to update the visibility state of the participants modal.
     * @param {boolean} options.isParticipantsModalVisible - Current visibility state of the participants modal.
     */
    launchParticipants({ updateIsParticipantsModalVisible, isParticipantsModalVisible, }) {
        updateIsParticipantsModalVisible(!isParticipantsModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchParticipants, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchParticipants, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchParticipants, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLXBhcnRpY2lwYW50cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvcGFydGljaXBhbnRzLW1ldGhvZHMvbGF1bmNoLXBhcnRpY2lwYW50cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBWTNDLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0I7Ozs7OztPQU1HO0lBRUgsa0JBQWtCLENBQUMsRUFDakIsZ0NBQWdDLEVBQ2hDLDBCQUEwQixHQUNBO1FBQzFCLGdDQUFnQyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUNoRSxDQUFDO3VHQWRVLGtCQUFrQjsyR0FBbEIsa0JBQWtCLGNBRmpCLE1BQU07OzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5leHBvcnQgaW50ZXJmYWNlIExhdW5jaFBhcnRpY2lwYW50c09wdGlvbnMge1xuICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGU6IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIExhdW5jaFBhcnRpY2lwYW50c1R5cGUgPSAob3B0aW9uczogTGF1bmNoUGFydGljaXBhbnRzT3B0aW9ucykgPT4gdm9pZDtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIExhdW5jaFBhcnRpY2lwYW50cyB7XG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBwYXJ0aWNpcGFudHMgbW9kYWwuXG4gICAqIEBmdW5jdGlvblxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdCBjb250YWluaW5nIG5lY2Vzc2FyeSB2YXJpYWJsZXMgYW5kIGZ1bmN0aW9ucy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgcGFydGljaXBhbnRzIG1vZGFsLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUgLSBDdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIHBhcnRpY2lwYW50cyBtb2RhbC5cbiAgICovXG5cbiAgbGF1bmNoUGFydGljaXBhbnRzKHtcbiAgICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZSxcbiAgICBpc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZSxcbiAgfTogTGF1bmNoUGFydGljaXBhbnRzT3B0aW9ucyk6IHZvaWQge1xuICAgIHVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlKCFpc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZSk7XG4gIH1cbn1cbiJdfQ==