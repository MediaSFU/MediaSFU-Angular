// display-settings.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LaunchDisplaySettings {
    /**
     * Toggles the visibility of the display settings modal.
     *
     * @param updateIsDisplaySettingsModalVisible - Function to update the visibility state of the display settings modal.
     * @param isDisplaySettingsModalVisible - Current visibility state of the display settings modal.
     */
    launchDisplaySettings({ updateIsDisplaySettingsModalVisible, isDisplaySettingsModalVisible, }) {
        // Toggle the visibility of the display settings modal.
        updateIsDisplaySettingsModalVisible(!isDisplaySettingsModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchDisplaySettings, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchDisplaySettings, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchDisplaySettings, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWRpc3BsYXktc2V0dGluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL2Rpc3BsYXktc2V0dGluZ3MtbWV0aG9kcy9sYXVuY2gtZGlzcGxheS1zZXR0aW5ncy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhCQUE4QjtBQUM5QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWEzQyxNQUFNLE9BQU8scUJBQXFCO0lBQ2hDOzs7OztPQUtHO0lBRUgscUJBQXFCLENBQUMsRUFDcEIsbUNBQW1DLEVBQ25DLDZCQUE2QixHQUNBO1FBQzdCLHVEQUF1RDtRQUN2RCxtQ0FBbUMsQ0FBQyxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDdEUsQ0FBQzt1R0FkVSxxQkFBcUI7MkdBQXJCLHFCQUFxQixjQUZwQixNQUFNOzsyRkFFUCxxQkFBcUI7a0JBSGpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZGlzcGxheS1zZXR0aW5ncy5zZXJ2aWNlLnRzXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTGF1bmNoRGlzcGxheVNldHRpbmdzT3B0aW9ucyB7XG4gIHVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICBpc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZTogYm9vbGVhbjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgTGF1bmNoRGlzcGxheVNldHRpbmdzVHlwZSA9IChvcHRpb25zOiBMYXVuY2hEaXNwbGF5U2V0dGluZ3NPcHRpb25zKSA9PiB2b2lkO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTGF1bmNoRGlzcGxheVNldHRpbmdzIHtcbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGRpc3BsYXkgc2V0dGluZ3MgbW9kYWwuXG4gICAqXG4gICAqIEBwYXJhbSB1cGRhdGVJc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgZGlzcGxheSBzZXR0aW5ncyBtb2RhbC5cbiAgICogQHBhcmFtIGlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlIC0gQ3VycmVudCB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBkaXNwbGF5IHNldHRpbmdzIG1vZGFsLlxuICAgKi9cblxuICBsYXVuY2hEaXNwbGF5U2V0dGluZ3Moe1xuICAgIHVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlLFxuICAgIGlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlLFxuICB9OiBMYXVuY2hEaXNwbGF5U2V0dGluZ3NPcHRpb25zKTogdm9pZCB7XG4gICAgLy8gVG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBkaXNwbGF5IHNldHRpbmdzIG1vZGFsLlxuICAgIHVwZGF0ZUlzRGlzcGxheVNldHRpbmdzTW9kYWxWaXNpYmxlKCFpc0Rpc3BsYXlTZXR0aW5nc01vZGFsVmlzaWJsZSk7XG4gIH1cbn1cbiJdfQ==