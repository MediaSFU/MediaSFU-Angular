import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLW1lc3NhZ2VzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9tZXNzYWdlLW1ldGhvZHMvbGF1bmNoLW1lc3NhZ2VzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFZM0MsTUFBTSxPQUFPLGNBQWM7SUFDekI7Ozs7OztPQU1HO0lBQ0gsY0FBYyxDQUFDLEVBQ2IsNEJBQTRCLEVBQzVCLHNCQUFzQixHQUNBO1FBQ3RCLDRCQUE0QixDQUFDLENBQUMsc0JBQXNCLENBQUMsQ0FBQztJQUN4RCxDQUFDO3VHQWJVLGNBQWM7MkdBQWQsY0FBYyxjQUZiLE1BQU07OzJGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBMYXVuY2hNZXNzYWdlc09wdGlvbnMge1xuICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiAodmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgaXNNZXNzYWdlc01vZGFsVmlzaWJsZTogYm9vbGVhbjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgTGF1bmNoTWVzc2FnZXNUeXBlID0gKG9wdGlvbnM6IExhdW5jaE1lc3NhZ2VzT3B0aW9ucykgPT4gdm9pZDtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIExhdW5jaE1lc3NhZ2VzIHtcbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIG1lc3NhZ2VzIG1vZGFsLlxuICAgKiBJZiB0aGUgbW9kYWwgaXMgY3VycmVudGx5IHZpc2libGUsIGl0IHdpbGwgYmUgY2xvc2VkLiBJZiBpdCdzIGhpZGRlbiwgaXQgd2lsbCBiZSBvcGVuZWQuXG4gICAqXG4gICAqIEBwYXJhbSB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBtZXNzYWdlcyBtb2RhbC5cbiAgICogQHBhcmFtIGlzTWVzc2FnZXNNb2RhbFZpc2libGUgLSBDdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIG1lc3NhZ2VzIG1vZGFsLlxuICAgKi9cbiAgbGF1bmNoTWVzc2FnZXMoe1xuICAgIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUsXG4gICAgaXNNZXNzYWdlc01vZGFsVmlzaWJsZSxcbiAgfTogTGF1bmNoTWVzc2FnZXNPcHRpb25zKTogdm9pZCB7XG4gICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZSghaXNNZXNzYWdlc01vZGFsVmlzaWJsZSk7XG4gIH1cbn1cbiJdfQ==