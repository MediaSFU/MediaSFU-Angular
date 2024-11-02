import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Toggles the visibility of the participants modal.
 *
 * This method checks the current visibility state of the participants modal
 * and updates it accordingly. If the modal is currently visible, it will be hidden.
 * If it is hidden, it will be displayed.
 *
 * @param {LaunchParticipantsOptions} options - The options for toggling the participants modal.
 * @param {Function} options.updateIsParticipantsModalVisible - Function to update the visibility state of the participants modal.
 * @param {boolean} options.isParticipantsModalVisible - Current visibility state of the participants modal.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * const launchParticipantsService = new LaunchParticipants();
 * launchParticipantsService.launchParticipants({
 *   updateIsParticipantsModalVisible: (isVisible) => {
 *     console.log(`Participants modal is now ${isVisible ? 'visible' : 'hidden'}`);
 *   },
 *   isParticipantsModalVisible: false,
 * });
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLXBhcnRpY2lwYW50cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvcGFydGljaXBhbnRzLW1ldGhvZHMvbGF1bmNoLXBhcnRpY2lwYW50cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQU1ILE1BQU0sT0FBTyxrQkFBa0I7SUFDN0I7Ozs7OztPQU1HO0lBRUgsa0JBQWtCLENBQUMsRUFDakIsZ0NBQWdDLEVBQ2hDLDBCQUEwQixHQUNBO1FBQzFCLGdDQUFnQyxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQztJQUNoRSxDQUFDO3VHQWRVLGtCQUFrQjsyR0FBbEIsa0JBQWtCLGNBRmpCLE1BQU07OzJGQUVQLGtCQUFrQjtrQkFIOUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5leHBvcnQgaW50ZXJmYWNlIExhdW5jaFBhcnRpY2lwYW50c09wdGlvbnMge1xuICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGU6IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIExhdW5jaFBhcnRpY2lwYW50c1R5cGUgPSAob3B0aW9uczogTGF1bmNoUGFydGljaXBhbnRzT3B0aW9ucykgPT4gdm9pZDtcblxuLyoqXG4gKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBwYXJ0aWNpcGFudHMgbW9kYWwuXG4gKlxuICogVGhpcyBtZXRob2QgY2hlY2tzIHRoZSBjdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIHBhcnRpY2lwYW50cyBtb2RhbFxuICogYW5kIHVwZGF0ZXMgaXQgYWNjb3JkaW5nbHkuIElmIHRoZSBtb2RhbCBpcyBjdXJyZW50bHkgdmlzaWJsZSwgaXQgd2lsbCBiZSBoaWRkZW4uXG4gKiBJZiBpdCBpcyBoaWRkZW4sIGl0IHdpbGwgYmUgZGlzcGxheWVkLlxuICpcbiAqIEBwYXJhbSB7TGF1bmNoUGFydGljaXBhbnRzT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB0b2dnbGluZyB0aGUgcGFydGljaXBhbnRzIG1vZGFsLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgcGFydGljaXBhbnRzIG1vZGFsLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBwYXJ0aWNpcGFudHMgbW9kYWwuXG4gKlxuICogQHJldHVybnMge3ZvaWR9XG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IGxhdW5jaFBhcnRpY2lwYW50c1NlcnZpY2UgPSBuZXcgTGF1bmNoUGFydGljaXBhbnRzKCk7XG4gKiBsYXVuY2hQYXJ0aWNpcGFudHNTZXJ2aWNlLmxhdW5jaFBhcnRpY2lwYW50cyh7XG4gKiAgIHVwZGF0ZUlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlKSA9PiB7XG4gKiAgICAgY29uc29sZS5sb2coYFBhcnRpY2lwYW50cyBtb2RhbCBpcyBub3cgJHtpc1Zpc2libGUgPyAndmlzaWJsZScgOiAnaGlkZGVuJ31gKTtcbiAqICAgfSxcbiAqICAgaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGU6IGZhbHNlLFxuICogfSk7XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBMYXVuY2hQYXJ0aWNpcGFudHMge1xuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgcGFydGljaXBhbnRzIG1vZGFsLlxuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyBuZWNlc3NhcnkgdmFyaWFibGVzIGFuZCBmdW5jdGlvbnMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIHBhcnRpY2lwYW50cyBtb2RhbC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmlzUGFydGljaXBhbnRzTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBwYXJ0aWNpcGFudHMgbW9kYWwuXG4gICAqL1xuXG4gIGxhdW5jaFBhcnRpY2lwYW50cyh7XG4gICAgdXBkYXRlSXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUsXG4gICAgaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUsXG4gIH06IExhdW5jaFBhcnRpY2lwYW50c09wdGlvbnMpOiB2b2lkIHtcbiAgICB1cGRhdGVJc1BhcnRpY2lwYW50c01vZGFsVmlzaWJsZSghaXNQYXJ0aWNpcGFudHNNb2RhbFZpc2libGUpO1xuICB9XG59XG4iXX0=