import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ClickChat {
    /**
     * Toggles the visibility of the chat modal based on the current state and event settings.
     *
     * @param {Object} options - The options for the clickChat function.
     * @param {boolean} options.isMessagesModalVisible - Indicates if the messages modal is currently visible.
     * @param {Function} options.updateIsMessagesModalVisible - Function to update the visibility state of the messages modal.
     * @param {string} options.chatSetting - The chat setting for the event, which can be "allow" or other values.
     * @param {string} options.islevel - The participant's level, where "2" indicates a level that allows chat.
     * @param {Function} [options.showAlert] - Optional function to show an alert message.
     *
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     */
    async clickChat({ isMessagesModalVisible, updateIsMessagesModalVisible, chatSetting, islevel, showAlert, }) {
        if (isMessagesModalVisible) {
            updateIsMessagesModalVisible(false);
        }
        else {
            // Check if chat is allowed based on event settings and participant level
            if (chatSetting !== 'allow' && islevel !== '2') {
                updateIsMessagesModalVisible(false);
                showAlert?.({
                    message: 'Chat is disabled for this event.',
                    type: 'danger',
                    duration: 3000,
                });
            }
            else {
                updateIsMessagesModalVisible(true);
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ClickChat, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ClickChat, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ClickChat, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stY2hhdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvY2xpY2stY2hhdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBZ0IzQyxNQUFNLE9BQU8sU0FBUztJQUNwQjs7Ozs7Ozs7Ozs7T0FXRztJQUVILEtBQUssQ0FBQyxTQUFTLENBQUMsRUFDZCxzQkFBc0IsRUFDdEIsNEJBQTRCLEVBQzVCLFdBQVcsRUFDWCxPQUFPLEVBQ1AsU0FBUyxHQUNRO1FBQ2pCLElBQUksc0JBQXNCLEVBQUUsQ0FBQztZQUMzQiw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDO2FBQU0sQ0FBQztZQUNOLHlFQUF5RTtZQUN6RSxJQUFJLFdBQVcsS0FBSyxPQUFPLElBQUksT0FBTyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUMvQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEMsU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLGtDQUFrQztvQkFDM0MsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLDRCQUE0QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQzt1R0FwQ1UsU0FBUzsyR0FBVCxTQUFTLGNBRlIsTUFBTTs7MkZBRVAsU0FBUztrQkFIckIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBDbGlja0NoYXRPcHRpb25zIHtcbiAgaXNNZXNzYWdlc01vZGFsVmlzaWJsZTogYm9vbGVhbjtcbiAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgY2hhdFNldHRpbmc6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENsaWNrQ2hhdFR5cGUgPSAob3B0aW9uczogQ2xpY2tDaGF0T3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENsaWNrQ2hhdCB7XG4gIC8qKlxuICAgKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBjaGF0IG1vZGFsIGJhc2VkIG9uIHRoZSBjdXJyZW50IHN0YXRlIGFuZCBldmVudCBzZXR0aW5ncy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIGNsaWNrQ2hhdCBmdW5jdGlvbi5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmlzTWVzc2FnZXNNb2RhbFZpc2libGUgLSBJbmRpY2F0ZXMgaWYgdGhlIG1lc3NhZ2VzIG1vZGFsIGlzIGN1cnJlbnRseSB2aXNpYmxlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIG1lc3NhZ2VzIG1vZGFsLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jaGF0U2V0dGluZyAtIFRoZSBjaGF0IHNldHRpbmcgZm9yIHRoZSBldmVudCwgd2hpY2ggY2FuIGJlIFwiYWxsb3dcIiBvciBvdGhlciB2YWx1ZXMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmlzbGV2ZWwgLSBUaGUgcGFydGljaXBhbnQncyBsZXZlbCwgd2hlcmUgXCIyXCIgaW5kaWNhdGVzIGEgbGV2ZWwgdGhhdCBhbGxvd3MgY2hhdC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gW29wdGlvbnMuc2hvd0FsZXJ0XSAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIHNob3cgYW4gYWxlcnQgbWVzc2FnZS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG9wZXJhdGlvbiBpcyBjb21wbGV0ZS5cbiAgICovXG5cbiAgYXN5bmMgY2xpY2tDaGF0KHtcbiAgICBpc01lc3NhZ2VzTW9kYWxWaXNpYmxlLFxuICAgIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUsXG4gICAgY2hhdFNldHRpbmcsXG4gICAgaXNsZXZlbCxcbiAgICBzaG93QWxlcnQsXG4gIH06IENsaWNrQ2hhdE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoaXNNZXNzYWdlc01vZGFsVmlzaWJsZSkge1xuICAgICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIENoZWNrIGlmIGNoYXQgaXMgYWxsb3dlZCBiYXNlZCBvbiBldmVudCBzZXR0aW5ncyBhbmQgcGFydGljaXBhbnQgbGV2ZWxcbiAgICAgIGlmIChjaGF0U2V0dGluZyAhPT0gJ2FsbG93JyAmJiBpc2xldmVsICE9PSAnMicpIHtcbiAgICAgICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnQ2hhdCBpcyBkaXNhYmxlZCBmb3IgdGhpcyBldmVudC4nLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGUodHJ1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iXX0=