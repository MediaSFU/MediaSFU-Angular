import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Toggles the visibility state of the messages modal.
 *
 * This method updates the visibility state of the messages modal by calling the provided
 * function with the negated current visibility state. If the modal is currently visible,
 * it will be closed; if it's hidden, it will be opened.
 *
 * @param {LaunchMessagesOptions} options - The options for launching the messages modal.
 * @param {Function} options.updateIsMessagesModalVisible - Function to update the visibility state of the messages modal.
 * @param {boolean} options.isMessagesModalVisible - Current visibility state of the messages modal.
 *
 * @example
 * ```typescript
 * const launchMessagesService = new LaunchMessages();
 * launchMessagesService.launchMessages({
 *   updateIsMessagesModalVisible: (visible) => {
 *     console.log('Messages modal is now:', visible ? 'Visible' : 'Hidden');
 *   },
 *   isMessagesModalVisible: false, // Initially not visible
 * });
 * ```
 */
export class LaunchMessages {
    /**
     * Toggles the visibility state of the messages modal.
     * If the modal is currently visible, it will be closed. If it's hidden, it will be opened.
     *
     * @param updateIsMessagesModalVisible - Function to update the visibility state of the messages modal.
     * @param isMessagesModalVisible - Current visibility state of the messages modal.
     */
    launchMessages({ updateIsMessagesModalVisible, isMessagesModalVisible, }) {
        updateIsMessagesModalVisible(!isMessagesModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchMessages, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchMessages, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchMessages, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLW1lc3NhZ2VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9tZXNzYWdlLW1ldGhvZHMvbGF1bmNoLW1lc3NhZ2VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFTM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQU1ILE1BQU0sT0FBTyxjQUFjO0lBQ3pCOzs7Ozs7T0FNRztJQUNILGNBQWMsQ0FBQyxFQUNiLDRCQUE0QixFQUM1QixzQkFBc0IsR0FDQTtRQUN0Qiw0QkFBNEIsQ0FBQyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFDeEQsQ0FBQzt1R0FiVSxjQUFjOzJHQUFkLGNBQWMsY0FGYixNQUFNOzsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgTGF1bmNoTWVzc2FnZXNPcHRpb25zIHtcbiAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogKHZpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGlzTWVzc2FnZXNNb2RhbFZpc2libGU6IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIExhdW5jaE1lc3NhZ2VzVHlwZSA9IChvcHRpb25zOiBMYXVuY2hNZXNzYWdlc09wdGlvbnMpID0+IHZvaWQ7XG5cbi8qKlxuICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgbWVzc2FnZXMgbW9kYWwuXG4gKlxuICogVGhpcyBtZXRob2QgdXBkYXRlcyB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgbWVzc2FnZXMgbW9kYWwgYnkgY2FsbGluZyB0aGUgcHJvdmlkZWRcbiAqIGZ1bmN0aW9uIHdpdGggdGhlIG5lZ2F0ZWQgY3VycmVudCB2aXNpYmlsaXR5IHN0YXRlLiBJZiB0aGUgbW9kYWwgaXMgY3VycmVudGx5IHZpc2libGUsXG4gKiBpdCB3aWxsIGJlIGNsb3NlZDsgaWYgaXQncyBoaWRkZW4sIGl0IHdpbGwgYmUgb3BlbmVkLlxuICpcbiAqIEBwYXJhbSB7TGF1bmNoTWVzc2FnZXNPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGxhdW5jaGluZyB0aGUgbWVzc2FnZXMgbW9kYWwuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIG1lc3NhZ2VzIG1vZGFsLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmlzTWVzc2FnZXNNb2RhbFZpc2libGUgLSBDdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIG1lc3NhZ2VzIG1vZGFsLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBsYXVuY2hNZXNzYWdlc1NlcnZpY2UgPSBuZXcgTGF1bmNoTWVzc2FnZXMoKTtcbiAqIGxhdW5jaE1lc3NhZ2VzU2VydmljZS5sYXVuY2hNZXNzYWdlcyh7XG4gKiAgIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGU6ICh2aXNpYmxlKSA9PiB7XG4gKiAgICAgY29uc29sZS5sb2coJ01lc3NhZ2VzIG1vZGFsIGlzIG5vdzonLCB2aXNpYmxlID8gJ1Zpc2libGUnIDogJ0hpZGRlbicpO1xuICogICB9LFxuICogICBpc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiBmYWxzZSwgLy8gSW5pdGlhbGx5IG5vdCB2aXNpYmxlXG4gKiB9KTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIExhdW5jaE1lc3NhZ2VzIHtcbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIG1lc3NhZ2VzIG1vZGFsLlxuICAgKiBJZiB0aGUgbW9kYWwgaXMgY3VycmVudGx5IHZpc2libGUsIGl0IHdpbGwgYmUgY2xvc2VkLiBJZiBpdCdzIGhpZGRlbiwgaXQgd2lsbCBiZSBvcGVuZWQuXG4gICAqXG4gICAqIEBwYXJhbSB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBtZXNzYWdlcyBtb2RhbC5cbiAgICogQHBhcmFtIGlzTWVzc2FnZXNNb2RhbFZpc2libGUgLSBDdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIG1lc3NhZ2VzIG1vZGFsLlxuICAgKi9cbiAgbGF1bmNoTWVzc2FnZXMoe1xuICAgIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUsXG4gICAgaXNNZXNzYWdlc01vZGFsVmlzaWJsZSxcbiAgfTogTGF1bmNoTWVzc2FnZXNPcHRpb25zKTogdm9pZCB7XG4gICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZSghaXNNZXNzYWdlc01vZGFsVmlzaWJsZSk7XG4gIH1cbn1cbiJdfQ==