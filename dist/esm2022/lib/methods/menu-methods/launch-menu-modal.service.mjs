import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Toggles the visibility of the menu modal.
 *
 * This method updates the visibility state of the menu modal by calling the provided
 * function with the negated current visibility state. If the modal is currently visible,
 * it will be hidden, and vice versa.
 *
 * @param {LaunchMenuModalOptions} options - The options for launching the menu modal.
 * @param {Function} options.updateIsMenuModalVisible - Function to update the visibility state of the menu modal.
 * @param {boolean} options.isMenuModalVisible - Current visibility state of the menu modal.
 *
 * @example
 * ```typescript
 * const launchMenuModalService = new LaunchMenuModal();
 * launchMenuModalService.launchMenuModal({
 *   updateIsMenuModalVisible: (isVisible) => {
 *     console.log('Menu modal is now:', isVisible ? 'Visible' : 'Hidden');
 *   },
 *   isMenuModalVisible: false, // Initially not visible
 * });
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLW1lbnUtbW9kYWwuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL21lbnUtbWV0aG9kcy9sYXVuY2gtbWVudS1tb2RhbC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFLSCxNQUFNLE9BQU8sZUFBZTtJQUMxQjs7Ozs7T0FLRztJQUVILGVBQWUsQ0FBQyxFQUFFLHdCQUF3QixFQUFFLGtCQUFrQixFQUEwQjtRQUN0Rix3QkFBd0IsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDaEQsQ0FBQzt1R0FWVSxlQUFlOzJHQUFmLGVBQWUsY0FGZCxNQUFNOzsyRkFFUCxlQUFlO2tCQUgzQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgTGF1bmNoTWVudU1vZGFsT3B0aW9ucyB7XG4gIHVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgaXNNZW51TW9kYWxWaXNpYmxlOiBib29sZWFuO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBMYXVuY2hNZW51TW9kYWxUeXBlID0gKG9wdGlvbnM6IExhdW5jaE1lbnVNb2RhbE9wdGlvbnMpID0+IHZvaWQ7XG5cbi8qKlxuICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgbWVudSBtb2RhbC5cbiAqXG4gKiBUaGlzIG1ldGhvZCB1cGRhdGVzIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBtZW51IG1vZGFsIGJ5IGNhbGxpbmcgdGhlIHByb3ZpZGVkXG4gKiBmdW5jdGlvbiB3aXRoIHRoZSBuZWdhdGVkIGN1cnJlbnQgdmlzaWJpbGl0eSBzdGF0ZS4gSWYgdGhlIG1vZGFsIGlzIGN1cnJlbnRseSB2aXNpYmxlLFxuICogaXQgd2lsbCBiZSBoaWRkZW4sIGFuZCB2aWNlIHZlcnNhLlxuICpcbiAqIEBwYXJhbSB7TGF1bmNoTWVudU1vZGFsT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBsYXVuY2hpbmcgdGhlIG1lbnUgbW9kYWwuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgbWVudSBtb2RhbC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc01lbnVNb2RhbFZpc2libGUgLSBDdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIG1lbnUgbW9kYWwuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IGxhdW5jaE1lbnVNb2RhbFNlcnZpY2UgPSBuZXcgTGF1bmNoTWVudU1vZGFsKCk7XG4gKiBsYXVuY2hNZW51TW9kYWxTZXJ2aWNlLmxhdW5jaE1lbnVNb2RhbCh7XG4gKiAgIHVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZTogKGlzVmlzaWJsZSkgPT4ge1xuICogICAgIGNvbnNvbGUubG9nKCdNZW51IG1vZGFsIGlzIG5vdzonLCBpc1Zpc2libGUgPyAnVmlzaWJsZScgOiAnSGlkZGVuJyk7XG4gKiAgIH0sXG4gKiAgIGlzTWVudU1vZGFsVmlzaWJsZTogZmFsc2UsIC8vIEluaXRpYWxseSBub3QgdmlzaWJsZVxuICogfSk7XG4gKiBgYGBcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTGF1bmNoTWVudU1vZGFsIHtcbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG1lbnUgbW9kYWwuXG4gICAqXG4gICAqIEBwYXJhbSB1cGRhdGVJc01lbnVNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIG1lbnUgbW9kYWwuXG4gICAqIEBwYXJhbSBpc01lbnVNb2RhbFZpc2libGUgLSBDdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIG1lbnUgbW9kYWwuXG4gICAqL1xuXG4gIGxhdW5jaE1lbnVNb2RhbCh7IHVwZGF0ZUlzTWVudU1vZGFsVmlzaWJsZSwgaXNNZW51TW9kYWxWaXNpYmxlIH06IExhdW5jaE1lbnVNb2RhbE9wdGlvbnMpOiB2b2lkIHtcbiAgICB1cGRhdGVJc01lbnVNb2RhbFZpc2libGUoIWlzTWVudU1vZGFsVmlzaWJsZSk7XG4gIH1cbn1cbiJdfQ==