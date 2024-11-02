import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Toggles the visibility of the chat modal based on the current state and event settings.
 *
 * @param {ClickChatOptions} options - The options for the clickChat function.
 * @param {boolean} options.isMessagesModalVisible - Indicates if the messages modal is currently visible.
 * @param {Function} options.updateIsMessagesModalVisible - Function to update the visibility state of the messages modal.
 * @param {string} options.chatSetting - The chat setting for the event, which can be "allow" or other values.
 * @param {string} options.islevel - The participant's level, where "2" indicates a level that allows chat.
 * @param {Function} [options.showAlert] - Optional function to show an alert message.
 *
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *
 * @remarks
 * This function checks the current visibility state of the messages modal. If it is already visible, it will hide the modal.
 * If it is not visible, it checks the chat settings and the participant's level to determine whether to show an alert
 * indicating that chat is disabled or to display the chat modal.
 *
 * @example
 * ```typescript
 * const options: ClickChatOptions = {
 *   isMessagesModalVisible: false,
 *   updateIsMessagesModalVisible: (visible) => console.log(`Modal is now ${visible ? 'visible' : 'hidden'}`),
 *   chatSetting: 'allow',
 *   islevel: '1',
 *   showAlert: (alert) => console.log(`Alert: ${alert.message}`),
 * };
 *
 * const clickChatService = new ClickChat();
 * await clickChatService.clickChat(options);
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stY2hhdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvY2xpY2stY2hhdC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBYTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFNSCxNQUFNLE9BQU8sU0FBUztJQUNwQjs7Ozs7Ozs7Ozs7T0FXRztJQUVILEtBQUssQ0FBQyxTQUFTLENBQUMsRUFDZCxzQkFBc0IsRUFDdEIsNEJBQTRCLEVBQzVCLFdBQVcsRUFDWCxPQUFPLEVBQ1AsU0FBUyxHQUNRO1FBQ2pCLElBQUksc0JBQXNCLEVBQUUsQ0FBQztZQUMzQiw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDO2FBQU0sQ0FBQztZQUNOLHlFQUF5RTtZQUN6RSxJQUFJLFdBQVcsS0FBSyxPQUFPLElBQUksT0FBTyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUMvQyw0QkFBNEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDcEMsU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLGtDQUFrQztvQkFDM0MsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLDRCQUE0QixDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQzt1R0FwQ1UsU0FBUzsyR0FBVCxTQUFTLGNBRlIsTUFBTTs7MkZBRVAsU0FBUztrQkFIckIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBDbGlja0NoYXRPcHRpb25zIHtcbiAgaXNNZXNzYWdlc01vZGFsVmlzaWJsZTogYm9vbGVhbjtcbiAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgY2hhdFNldHRpbmc6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENsaWNrQ2hhdFR5cGUgPSAob3B0aW9uczogQ2xpY2tDaGF0T3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBUb2dnbGVzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBjaGF0IG1vZGFsIGJhc2VkIG9uIHRoZSBjdXJyZW50IHN0YXRlIGFuZCBldmVudCBzZXR0aW5ncy5cbiAqXG4gKiBAcGFyYW0ge0NsaWNrQ2hhdE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIGNsaWNrQ2hhdCBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc01lc3NhZ2VzTW9kYWxWaXNpYmxlIC0gSW5kaWNhdGVzIGlmIHRoZSBtZXNzYWdlcyBtb2RhbCBpcyBjdXJyZW50bHkgdmlzaWJsZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgbWVzc2FnZXMgbW9kYWwuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jaGF0U2V0dGluZyAtIFRoZSBjaGF0IHNldHRpbmcgZm9yIHRoZSBldmVudCwgd2hpY2ggY2FuIGJlIFwiYWxsb3dcIiBvciBvdGhlciB2YWx1ZXMuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pc2xldmVsIC0gVGhlIHBhcnRpY2lwYW50J3MgbGV2ZWwsIHdoZXJlIFwiMlwiIGluZGljYXRlcyBhIGxldmVsIHRoYXQgYWxsb3dzIGNoYXQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5zaG93QWxlcnRdIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gc2hvdyBhbiBhbGVydCBtZXNzYWdlLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBvcGVyYXRpb24gaXMgY29tcGxldGUuXG4gKlxuICogQHJlbWFya3NcbiAqIFRoaXMgZnVuY3Rpb24gY2hlY2tzIHRoZSBjdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIG1lc3NhZ2VzIG1vZGFsLiBJZiBpdCBpcyBhbHJlYWR5IHZpc2libGUsIGl0IHdpbGwgaGlkZSB0aGUgbW9kYWwuXG4gKiBJZiBpdCBpcyBub3QgdmlzaWJsZSwgaXQgY2hlY2tzIHRoZSBjaGF0IHNldHRpbmdzIGFuZCB0aGUgcGFydGljaXBhbnQncyBsZXZlbCB0byBkZXRlcm1pbmUgd2hldGhlciB0byBzaG93IGFuIGFsZXJ0XG4gKiBpbmRpY2F0aW5nIHRoYXQgY2hhdCBpcyBkaXNhYmxlZCBvciB0byBkaXNwbGF5IHRoZSBjaGF0IG1vZGFsLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBvcHRpb25zOiBDbGlja0NoYXRPcHRpb25zID0ge1xuICogICBpc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiBmYWxzZSxcbiAqICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogKHZpc2libGUpID0+IGNvbnNvbGUubG9nKGBNb2RhbCBpcyBub3cgJHt2aXNpYmxlID8gJ3Zpc2libGUnIDogJ2hpZGRlbid9YCksXG4gKiAgIGNoYXRTZXR0aW5nOiAnYWxsb3cnLFxuICogICBpc2xldmVsOiAnMScsXG4gKiAgIHNob3dBbGVydDogKGFsZXJ0KSA9PiBjb25zb2xlLmxvZyhgQWxlcnQ6ICR7YWxlcnQubWVzc2FnZX1gKSxcbiAqIH07XG4gKlxuICogY29uc3QgY2xpY2tDaGF0U2VydmljZSA9IG5ldyBDbGlja0NoYXQoKTtcbiAqIGF3YWl0IGNsaWNrQ2hhdFNlcnZpY2UuY2xpY2tDaGF0KG9wdGlvbnMpO1xuICogYGBgXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tDaGF0IHtcbiAgLyoqXG4gICAqIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGNoYXQgbW9kYWwgYmFzZWQgb24gdGhlIGN1cnJlbnQgc3RhdGUgYW5kIGV2ZW50IHNldHRpbmdzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB0aGUgY2xpY2tDaGF0IGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuaXNNZXNzYWdlc01vZGFsVmlzaWJsZSAtIEluZGljYXRlcyBpZiB0aGUgbWVzc2FnZXMgbW9kYWwgaXMgY3VycmVudGx5IHZpc2libGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgbWVzc2FnZXMgbW9kYWwuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNoYXRTZXR0aW5nIC0gVGhlIGNoYXQgc2V0dGluZyBmb3IgdGhlIGV2ZW50LCB3aGljaCBjYW4gYmUgXCJhbGxvd1wiIG9yIG90aGVyIHZhbHVlcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaXNsZXZlbCAtIFRoZSBwYXJ0aWNpcGFudCdzIGxldmVsLCB3aGVyZSBcIjJcIiBpbmRpY2F0ZXMgYSBsZXZlbCB0aGF0IGFsbG93cyBjaGF0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBbb3B0aW9ucy5zaG93QWxlcnRdIC0gT3B0aW9uYWwgZnVuY3Rpb24gdG8gc2hvdyBhbiBhbGVydCBtZXNzYWdlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgKi9cblxuICBhc3luYyBjbGlja0NoYXQoe1xuICAgIGlzTWVzc2FnZXNNb2RhbFZpc2libGUsXG4gICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZSxcbiAgICBjaGF0U2V0dGluZyxcbiAgICBpc2xldmVsLFxuICAgIHNob3dBbGVydCxcbiAgfTogQ2xpY2tDaGF0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChpc01lc3NhZ2VzTW9kYWxWaXNpYmxlKSB7XG4gICAgICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gQ2hlY2sgaWYgY2hhdCBpcyBhbGxvd2VkIGJhc2VkIG9uIGV2ZW50IHNldHRpbmdzIGFuZCBwYXJ0aWNpcGFudCBsZXZlbFxuICAgICAgaWYgKGNoYXRTZXR0aW5nICE9PSAnYWxsb3cnICYmIGlzbGV2ZWwgIT09ICcyJykge1xuICAgICAgICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdDaGF0IGlzIGRpc2FibGVkIGZvciB0aGlzIGV2ZW50LicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZSh0cnVlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdfQ==