import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Toggles the visibility of the confirmation exit modal.
 *
 * This method updates the state of the confirmation exit modal by inverting its current visibility status.
 *
 * @param {LaunchConfirmExitOptions} options - The options for toggling the confirmation exit modal visibility.
 * @param {Function} options.updateIsConfirmExitModalVisible - Function to update the visibility state of the confirmation exit modal.
 * @param {boolean} options.isConfirmExitModalVisible - Current visibility state of the confirmation exit modal.
 *
 * @example
 * ```typescript
 * const launchConfirmExitService = new LaunchConfirmExit();
 * launchConfirmExitService.launchConfirmExit({
 *   updateIsConfirmExitModalVisible: (isVisible) => {
 *     console.log('Confirm exit modal is now:', isVisible ? 'Visible' : 'Hidden');
 *   },
 *   isConfirmExitModalVisible: false, // Initially not visible
 * });
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWNvbmZpcm0tZXhpdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvZXhpdC1tZXRob2RzL2xhdW5jaC1jb25maXJtLWV4aXQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQU1ILE1BQU0sT0FBTyxpQkFBaUI7SUFDNUI7Ozs7O09BS0c7SUFFSCxpQkFBaUIsQ0FBQyxFQUNoQiwrQkFBK0IsRUFDL0IseUJBQXlCLEdBQ0E7UUFDekIsK0JBQStCLENBQUMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0lBQzlELENBQUM7dUdBYlUsaUJBQWlCOzJHQUFqQixpQkFBaUIsY0FGaEIsTUFBTTs7MkZBRVAsaUJBQWlCO2tCQUg3QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgTGF1bmNoQ29uZmlybUV4aXRPcHRpb25zIHtcbiAgdXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZTogYm9vbGVhbjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgTGF1bmNoQ29uZmlybUV4aXRUeXBlID0gKG9wdGlvbnM6IExhdW5jaENvbmZpcm1FeGl0T3B0aW9ucykgPT4gdm9pZDtcblxuLyoqXG4gKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBjb25maXJtYXRpb24gZXhpdCBtb2RhbC5cbiAqXG4gKiBUaGlzIG1ldGhvZCB1cGRhdGVzIHRoZSBzdGF0ZSBvZiB0aGUgY29uZmlybWF0aW9uIGV4aXQgbW9kYWwgYnkgaW52ZXJ0aW5nIGl0cyBjdXJyZW50IHZpc2liaWxpdHkgc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7TGF1bmNoQ29uZmlybUV4aXRPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHRvZ2dsaW5nIHRoZSBjb25maXJtYXRpb24gZXhpdCBtb2RhbCB2aXNpYmlsaXR5LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBjb25maXJtYXRpb24gZXhpdCBtb2RhbC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBjb25maXJtYXRpb24gZXhpdCBtb2RhbC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3QgbGF1bmNoQ29uZmlybUV4aXRTZXJ2aWNlID0gbmV3IExhdW5jaENvbmZpcm1FeGl0KCk7XG4gKiBsYXVuY2hDb25maXJtRXhpdFNlcnZpY2UubGF1bmNoQ29uZmlybUV4aXQoe1xuICogICB1cGRhdGVJc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlKSA9PiB7XG4gKiAgICAgY29uc29sZS5sb2coJ0NvbmZpcm0gZXhpdCBtb2RhbCBpcyBub3c6JywgaXNWaXNpYmxlID8gJ1Zpc2libGUnIDogJ0hpZGRlbicpO1xuICogICB9LFxuICogICBpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlOiBmYWxzZSwgLy8gSW5pdGlhbGx5IG5vdCB2aXNpYmxlXG4gKiB9KTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIExhdW5jaENvbmZpcm1FeGl0IHtcbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGNvbmZpcm1hdGlvbiBleGl0IG1vZGFsLlxuICAgKlxuICAgKiBAcGFyYW0gdXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgY29uZmlybWF0aW9uIGV4aXQgbW9kYWwuXG4gICAqIEBwYXJhbSBpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBjb25maXJtYXRpb24gZXhpdCBtb2RhbC5cbiAgICovXG5cbiAgbGF1bmNoQ29uZmlybUV4aXQoe1xuICAgIHVwZGF0ZUlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUsXG4gICAgaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZSxcbiAgfTogTGF1bmNoQ29uZmlybUV4aXRPcHRpb25zKTogdm9pZCB7XG4gICAgdXBkYXRlSXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZSghaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZSk7XG4gIH1cbn1cbiJdfQ==