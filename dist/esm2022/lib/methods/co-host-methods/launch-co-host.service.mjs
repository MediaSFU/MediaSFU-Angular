import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class launchCoHost {
    /**
     * Toggles the visibility of the co-host modal.
     *
     * @param updateIsCoHostModalVisible - Function to update the visibility state of the co-host modal.
     * @param isCoHostModalVisible - Current visibility state of the co-host modal.
     */
    launchCoHost({ updateIsCoHostModalVisible, isCoHostModalVisible }) {
        updateIsCoHostModalVisible(!isCoHostModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: launchCoHost, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: launchCoHost, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: launchCoHost, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWNvLWhvc3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL2NvLWhvc3QtbWV0aG9kcy9sYXVuY2gtY28taG9zdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBWTNDLE1BQU0sT0FBTyxZQUFZO0lBQ3ZCOzs7OztPQUtHO0lBRUgsWUFBWSxDQUFDLEVBQUUsMEJBQTBCLEVBQUUsb0JBQW9CLEVBQXVCO1FBQ3BGLDBCQUEwQixDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQztJQUNwRCxDQUFDO3VHQVZVLFlBQVk7MkdBQVosWUFBWSxjQUZYLE1BQU07OzJGQUVQLFlBQVk7a0JBSHhCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBMYXVuY2hDb0hvc3RPcHRpb25zIHtcbiAgdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGlzQ29Ib3N0TW9kYWxWaXNpYmxlOiBib29sZWFuO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBMYXVuY2hDb0hvc3RUeXBlID0gKG9wdGlvbnM6IExhdW5jaENvSG9zdE9wdGlvbnMpID0+IHZvaWQ7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBsYXVuY2hDb0hvc3Qge1xuICAvKipcbiAgICogVG9nZ2xlcyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgY28taG9zdCBtb2RhbC5cbiAgICpcbiAgICogQHBhcmFtIHVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBjby1ob3N0IG1vZGFsLlxuICAgKiBAcGFyYW0gaXNDb0hvc3RNb2RhbFZpc2libGUgLSBDdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIGNvLWhvc3QgbW9kYWwuXG4gICAqL1xuXG4gIGxhdW5jaENvSG9zdCh7IHVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlLCBpc0NvSG9zdE1vZGFsVmlzaWJsZSB9OiBMYXVuY2hDb0hvc3RPcHRpb25zKTogdm9pZCB7XG4gICAgdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGUoIWlzQ29Ib3N0TW9kYWxWaXNpYmxlKTtcbiAgfVxufVxuIl19