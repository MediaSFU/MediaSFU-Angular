// whiteboard.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LaunchConfigureWhiteboard {
    /**
     * Toggles the visibility of the configure whiteboard modal.
     *
     * @param updateIsConfigureWhiteboardModalVisible - Function to update the visibility state of the configure whiteboard modal.
     * @param isConfigureWhiteboardModalVisible - Current visibility state of the configure whiteboard modal.
     */
    launchConfigureWhiteboard({ updateIsConfigureWhiteboardModalVisible, isConfigureWhiteboardModalVisible, }) {
        // Open or close the menu modal
        updateIsConfigureWhiteboardModalVisible(!isConfigureWhiteboardModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchConfigureWhiteboard, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchConfigureWhiteboard, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchConfigureWhiteboard, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWNvbmZpZ3VyZS13aGl0ZWJvYXJkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy93aGl0ZWJvYXJkLW1ldGhvZHMvbGF1bmNoLWNvbmZpZ3VyZS13aGl0ZWJvYXJkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsd0JBQXdCO0FBQ3hCLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBWTNDLE1BQU0sT0FBTyx5QkFBeUI7SUFDcEM7Ozs7O09BS0c7SUFFSCx5QkFBeUIsQ0FBQyxFQUN4Qix1Q0FBdUMsRUFDdkMsaUNBQWlDLEdBQ0E7UUFDakMsK0JBQStCO1FBQy9CLHVDQUF1QyxDQUFDLENBQUMsaUNBQWlDLENBQUMsQ0FBQztJQUM5RSxDQUFDO3VHQWRVLHlCQUF5QjsyR0FBekIseUJBQXlCLGNBRnhCLE1BQU07OzJGQUVQLHlCQUF5QjtrQkFIckMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyB3aGl0ZWJvYXJkLnNlcnZpY2UudHNcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgTGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZE9wdGlvbnMge1xuICB1cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGU6ICh2aXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICBpc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGU6IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIExhdW5jaENvbmZpZ3VyZVdoaXRlYm9hcmRUeXBlID0gKG9wdGlvbnM6IExhdW5jaENvbmZpZ3VyZVdoaXRlYm9hcmRPcHRpb25zKSA9PiB2b2lkO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTGF1bmNoQ29uZmlndXJlV2hpdGVib2FyZCB7XG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBjb25maWd1cmUgd2hpdGVib2FyZCBtb2RhbC5cbiAgICpcbiAgICogQHBhcmFtIHVwZGF0ZUlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgY29uZmlndXJlIHdoaXRlYm9hcmQgbW9kYWwuXG4gICAqIEBwYXJhbSBpc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUgLSBDdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIGNvbmZpZ3VyZSB3aGl0ZWJvYXJkIG1vZGFsLlxuICAgKi9cblxuICBsYXVuY2hDb25maWd1cmVXaGl0ZWJvYXJkKHtcbiAgICB1cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUsXG4gICAgaXNDb25maWd1cmVXaGl0ZWJvYXJkTW9kYWxWaXNpYmxlLFxuICB9OiBMYXVuY2hDb25maWd1cmVXaGl0ZWJvYXJkT3B0aW9ucyk6IHZvaWQge1xuICAgIC8vIE9wZW4gb3IgY2xvc2UgdGhlIG1lbnUgbW9kYWxcbiAgICB1cGRhdGVJc0NvbmZpZ3VyZVdoaXRlYm9hcmRNb2RhbFZpc2libGUoIWlzQ29uZmlndXJlV2hpdGVib2FyZE1vZGFsVmlzaWJsZSk7XG4gIH1cbn1cbiJdfQ==