// This method is used to modify the co-host settings in the chat room.
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Modifies the co-host settings for a given room.
 *
 * This method allows you to update the co-host for a chat room, set their responsibilities,
 * and emit the relevant changes to the server. It also handles demo mode restrictions.
 *
 * @param {ModifyCoHostSettingsOptions} options - The options for modifying co-host settings.
 * @param {string} options.roomName - The name of the room.
 * @param {Function} options.showAlert - Function to show an alert message.
 * @param {string} options.selectedParticipant - The participant selected to be co-host.
 * @param {string} options.coHost - The current co-host.
 * @param {Array<CoHostResponsibility>} options.coHostResponsibility - The responsibilities assigned to the co-host.
 * @param {Function} options.updateIsCoHostModalVisible - Function to update the visibility of the co-host modal.
 * @param {Function} options.updateCoHostResponsibility - Function to update the co-host responsibility.
 * @param {Function} options.updateCoHost - Function to update the co-host.
 * @param {Socket} options.socket - The socket instance for emitting events.
 *
 * @returns {Promise<void>} A promise that resolves when the co-host settings have been modified.
 *
 * @remarks
 * - If the room is in demo mode (room name starts with "d"), co-host cannot be added and an alert is shown.
 * - If a valid participant is selected, they are set as the new co-host.
 * - The co-host responsibility is updated.
 * - A socket event is emitted to update the co-host information.
 * - The co-host modal is closed after updating the settings.
 *
 * @example
 * ```typescript
 * const options: ModifyCoHostSettingsOptions = {
 *   roomName: 'mainRoom',
 *   showAlert: (alert) => console.log(alert.message),
 *   selectedParticipant: 'JohnDoe',
 *   coHost: 'No coHost',
 *   coHostResponsibility: ['manage participants', 'start/stop recording'],
 *   updateIsCoHostModalVisible: (isVisible) => console.log('Co-host modal visible:', isVisible),
 *   updateCoHostResponsibility: (responsibility) => console.log('Updated co-host responsibility:', responsibility),
 *   updateCoHost: (coHost) => console.log('New co-host:', coHost),
 *   socket: socketInstance,
 * };
 *
 * const modifyCoHostService = new ModifyCoHostSettings();
 * await modifyCoHostService.modifyCoHostSettings(options);
 * ```
 */
export class ModifyCoHostSettings {
    /**
     * Modifies the co-host settings for a given room.
     *
     * @param {Object} options - The options for modifying co-host settings.
     * @param {string} options.roomName - The name of the room.
     * @param {Function} options.showAlert - Function to show an alert message.
     * @param {string} options.selectedParticipant - The participant selected to be co-host.
     * @param {string} options.coHost - The current co-host.
     * @param {string} options.coHostResponsibility - The responsibility assigned to the co-host.
     * @param {Function} options.updateIsCoHostModalVisible - Function to update the visibility of the co-host modal.
     * @param {Function} options.updateCoHostResponsibility - Function to update the co-host responsibility.
     * @param {Function} options.updateCoHost - Function to update the co-host.
     * @param {Object} options.socket - The socket instance for emitting events.
     * @returns {Promise<void>} A promise that resolves when the co-host settings have been modified.
     *
     * @remarks
     * - If the room is in demo mode (room name starts with "d"), co-host cannot be added and an alert is shown.
     * - If a valid participant is selected, they are set as the new co-host.
     * - The co-host responsibility is updated.
     * - A socket event is emitted to update the co-host information.
     * - The co-host modal is closed after updating the settings.
     */
    async modifyCoHostSettings({ roomName, showAlert, selectedParticipant, coHost, coHostResponsibility, updateIsCoHostModalVisible, updateCoHostResponsibility, updateCoHost, socket, }) {
        // Check if the chat room is in demo mode
        if (roomName.toLowerCase().startsWith('d')) {
            showAlert?.({
                message: 'You cannot add co-host in demo mode.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        let newCoHost = coHost;
        if (coHost != 'No coHost' ||
            (selectedParticipant && selectedParticipant != 'Select a participant')) {
            if (selectedParticipant && selectedParticipant != 'Select a participant') {
                newCoHost = selectedParticipant;
                updateCoHost(newCoHost);
            }
            updateCoHostResponsibility(coHostResponsibility);
            // Emit a socket event to update co-host information
            socket.emit('updateCoHost', { roomName, coHost: newCoHost, coHostResponsibility });
        }
        // Close the co-host modal
        updateIsCoHostModalVisible(false);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ModifyCoHostSettings, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ModifyCoHostSettings, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ModifyCoHostSettings, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LWNvLWhvc3Qtc2V0dGluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL2NvLWhvc3QtbWV0aG9kcy9tb2RpZnktY28taG9zdC1zZXR0aW5ncy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHVFQUF1RTtBQUV2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQW1CM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQ0c7QUFNSCxNQUFNLE9BQU8sb0JBQW9CO0lBQy9COzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FxQkc7SUFDSCxLQUFLLENBQUMsb0JBQW9CLENBQUMsRUFDekIsUUFBUSxFQUNSLFNBQVMsRUFDVCxtQkFBbUIsRUFDbkIsTUFBTSxFQUNOLG9CQUFvQixFQUNwQiwwQkFBMEIsRUFDMUIsMEJBQTBCLEVBQzFCLFlBQVksRUFDWixNQUFNLEdBQ3NCO1FBQzVCLHlDQUF5QztRQUN6QyxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMzQyxTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsc0NBQXNDO2dCQUMvQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztZQUVILE9BQU87UUFDVCxDQUFDO1FBRUQsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDO1FBRXZCLElBQ0UsTUFBTSxJQUFJLFdBQVc7WUFDckIsQ0FBQyxtQkFBbUIsSUFBSSxtQkFBbUIsSUFBSSxzQkFBc0IsQ0FBQyxFQUN0RSxDQUFDO1lBQ0QsSUFBSSxtQkFBbUIsSUFBSSxtQkFBbUIsSUFBSSxzQkFBc0IsRUFBRSxDQUFDO2dCQUN6RSxTQUFTLEdBQUcsbUJBQW1CLENBQUM7Z0JBQ2hDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUMxQixDQUFDO1lBRUQsMEJBQTBCLENBQUMsb0JBQW9CLENBQUMsQ0FBQztZQUVqRCxvREFBb0Q7WUFDcEQsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxvQkFBb0IsRUFBRSxDQUFDLENBQUM7UUFDckYsQ0FBQztRQUVELDBCQUEwQjtRQUMxQiwwQkFBMEIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNwQyxDQUFDO3VHQWhFVSxvQkFBb0I7MkdBQXBCLG9CQUFvQixjQUZuQixNQUFNOzsyRkFFUCxvQkFBb0I7a0JBSGhDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gVGhpcyBtZXRob2QgaXMgdXNlZCB0byBtb2RpZnkgdGhlIGNvLWhvc3Qgc2V0dGluZ3MgaW4gdGhlIGNoYXQgcm9vbS5cblxuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hvd0FsZXJ0LCBDb0hvc3RSZXNwb25zaWJpbGl0eSB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBNb2RpZnlDb0hvc3RTZXR0aW5nc09wdGlvbnMge1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIHNlbGVjdGVkUGFydGljaXBhbnQ6IHN0cmluZztcbiAgY29Ib3N0OiBzdHJpbmc7XG4gIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdO1xuICB1cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHk6IChjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXSkgPT4gdm9pZDtcbiAgdXBkYXRlQ29Ib3N0OiAoY29Ib3N0OiBzdHJpbmcpID0+IHZvaWQ7XG4gIHNvY2tldDogU29ja2V0O1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBNb2RpZnlDb0hvc3RTZXR0aW5nc1R5cGUgPSAob3B0aW9uczogTW9kaWZ5Q29Ib3N0U2V0dGluZ3NPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIE1vZGlmaWVzIHRoZSBjby1ob3N0IHNldHRpbmdzIGZvciBhIGdpdmVuIHJvb20uXG4gKlxuICogVGhpcyBtZXRob2QgYWxsb3dzIHlvdSB0byB1cGRhdGUgdGhlIGNvLWhvc3QgZm9yIGEgY2hhdCByb29tLCBzZXQgdGhlaXIgcmVzcG9uc2liaWxpdGllcyxcbiAqIGFuZCBlbWl0IHRoZSByZWxldmFudCBjaGFuZ2VzIHRvIHRoZSBzZXJ2ZXIuIEl0IGFsc28gaGFuZGxlcyBkZW1vIG1vZGUgcmVzdHJpY3Rpb25zLlxuICpcbiAqIEBwYXJhbSB7TW9kaWZ5Q29Ib3N0U2V0dGluZ3NPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIG1vZGlmeWluZyBjby1ob3N0IHNldHRpbmdzLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gc2hvdyBhbiBhbGVydCBtZXNzYWdlLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc2VsZWN0ZWRQYXJ0aWNpcGFudCAtIFRoZSBwYXJ0aWNpcGFudCBzZWxlY3RlZCB0byBiZSBjby1ob3N0LlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuY29Ib3N0IC0gVGhlIGN1cnJlbnQgY28taG9zdC5cbiAqIEBwYXJhbSB7QXJyYXk8Q29Ib3N0UmVzcG9uc2liaWxpdHk+fSBvcHRpb25zLmNvSG9zdFJlc3BvbnNpYmlsaXR5IC0gVGhlIHJlc3BvbnNpYmlsaXRpZXMgYXNzaWduZWQgdG8gdGhlIGNvLWhvc3QuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBjby1ob3N0IG1vZGFsLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgY28taG9zdCByZXNwb25zaWJpbGl0eS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlQ29Ib3N0IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjby1ob3N0LlxuICogQHBhcmFtIHtTb2NrZXR9IG9wdGlvbnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSBmb3IgZW1pdHRpbmcgZXZlbnRzLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBjby1ob3N0IHNldHRpbmdzIGhhdmUgYmVlbiBtb2RpZmllZC5cbiAqXG4gKiBAcmVtYXJrc1xuICogLSBJZiB0aGUgcm9vbSBpcyBpbiBkZW1vIG1vZGUgKHJvb20gbmFtZSBzdGFydHMgd2l0aCBcImRcIiksIGNvLWhvc3QgY2Fubm90IGJlIGFkZGVkIGFuZCBhbiBhbGVydCBpcyBzaG93bi5cbiAqIC0gSWYgYSB2YWxpZCBwYXJ0aWNpcGFudCBpcyBzZWxlY3RlZCwgdGhleSBhcmUgc2V0IGFzIHRoZSBuZXcgY28taG9zdC5cbiAqIC0gVGhlIGNvLWhvc3QgcmVzcG9uc2liaWxpdHkgaXMgdXBkYXRlZC5cbiAqIC0gQSBzb2NrZXQgZXZlbnQgaXMgZW1pdHRlZCB0byB1cGRhdGUgdGhlIGNvLWhvc3QgaW5mb3JtYXRpb24uXG4gKiAtIFRoZSBjby1ob3N0IG1vZGFsIGlzIGNsb3NlZCBhZnRlciB1cGRhdGluZyB0aGUgc2V0dGluZ3MuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IG9wdGlvbnM6IE1vZGlmeUNvSG9zdFNldHRpbmdzT3B0aW9ucyA9IHtcbiAqICAgcm9vbU5hbWU6ICdtYWluUm9vbScsXG4gKiAgIHNob3dBbGVydDogKGFsZXJ0KSA9PiBjb25zb2xlLmxvZyhhbGVydC5tZXNzYWdlKSxcbiAqICAgc2VsZWN0ZWRQYXJ0aWNpcGFudDogJ0pvaG5Eb2UnLFxuICogICBjb0hvc3Q6ICdObyBjb0hvc3QnLFxuICogICBjb0hvc3RSZXNwb25zaWJpbGl0eTogWydtYW5hZ2UgcGFydGljaXBhbnRzJywgJ3N0YXJ0L3N0b3AgcmVjb3JkaW5nJ10sXG4gKiAgIHVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlKSA9PiBjb25zb2xlLmxvZygnQ28taG9zdCBtb2RhbCB2aXNpYmxlOicsIGlzVmlzaWJsZSksXG4gKiAgIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5OiAocmVzcG9uc2liaWxpdHkpID0+IGNvbnNvbGUubG9nKCdVcGRhdGVkIGNvLWhvc3QgcmVzcG9uc2liaWxpdHk6JywgcmVzcG9uc2liaWxpdHkpLFxuICogICB1cGRhdGVDb0hvc3Q6IChjb0hvc3QpID0+IGNvbnNvbGUubG9nKCdOZXcgY28taG9zdDonLCBjb0hvc3QpLFxuICogICBzb2NrZXQ6IHNvY2tldEluc3RhbmNlLFxuICogfTtcbiAqXG4gKiBjb25zdCBtb2RpZnlDb0hvc3RTZXJ2aWNlID0gbmV3IE1vZGlmeUNvSG9zdFNldHRpbmdzKCk7XG4gKiBhd2FpdCBtb2RpZnlDb0hvc3RTZXJ2aWNlLm1vZGlmeUNvSG9zdFNldHRpbmdzKG9wdGlvbnMpO1xuICogYGBgXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTW9kaWZ5Q29Ib3N0U2V0dGluZ3Mge1xuICAvKipcbiAgICogTW9kaWZpZXMgdGhlIGNvLWhvc3Qgc2V0dGluZ3MgZm9yIGEgZ2l2ZW4gcm9vbS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgbW9kaWZ5aW5nIGNvLWhvc3Qgc2V0dGluZ3MuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMuc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gc2hvdyBhbiBhbGVydCBtZXNzYWdlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5zZWxlY3RlZFBhcnRpY2lwYW50IC0gVGhlIHBhcnRpY2lwYW50IHNlbGVjdGVkIHRvIGJlIGNvLWhvc3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNvSG9zdCAtIFRoZSBjdXJyZW50IGNvLWhvc3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNvSG9zdFJlc3BvbnNpYmlsaXR5IC0gVGhlIHJlc3BvbnNpYmlsaXR5IGFzc2lnbmVkIHRvIHRoZSBjby1ob3N0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBjby1ob3N0IG1vZGFsLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjby1ob3N0IHJlc3BvbnNpYmlsaXR5LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZUNvSG9zdCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgY28taG9zdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSBmb3IgZW1pdHRpbmcgZXZlbnRzLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgY28taG9zdCBzZXR0aW5ncyBoYXZlIGJlZW4gbW9kaWZpZWQuXG4gICAqXG4gICAqIEByZW1hcmtzXG4gICAqIC0gSWYgdGhlIHJvb20gaXMgaW4gZGVtbyBtb2RlIChyb29tIG5hbWUgc3RhcnRzIHdpdGggXCJkXCIpLCBjby1ob3N0IGNhbm5vdCBiZSBhZGRlZCBhbmQgYW4gYWxlcnQgaXMgc2hvd24uXG4gICAqIC0gSWYgYSB2YWxpZCBwYXJ0aWNpcGFudCBpcyBzZWxlY3RlZCwgdGhleSBhcmUgc2V0IGFzIHRoZSBuZXcgY28taG9zdC5cbiAgICogLSBUaGUgY28taG9zdCByZXNwb25zaWJpbGl0eSBpcyB1cGRhdGVkLlxuICAgKiAtIEEgc29ja2V0IGV2ZW50IGlzIGVtaXR0ZWQgdG8gdXBkYXRlIHRoZSBjby1ob3N0IGluZm9ybWF0aW9uLlxuICAgKiAtIFRoZSBjby1ob3N0IG1vZGFsIGlzIGNsb3NlZCBhZnRlciB1cGRhdGluZyB0aGUgc2V0dGluZ3MuXG4gICAqL1xuICBhc3luYyBtb2RpZnlDb0hvc3RTZXR0aW5ncyh7XG4gICAgcm9vbU5hbWUsXG4gICAgc2hvd0FsZXJ0LFxuICAgIHNlbGVjdGVkUGFydGljaXBhbnQsXG4gICAgY29Ib3N0LFxuICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgIHVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlLFxuICAgIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgIHVwZGF0ZUNvSG9zdCxcbiAgICBzb2NrZXQsXG4gIH06IE1vZGlmeUNvSG9zdFNldHRpbmdzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIENoZWNrIGlmIHRoZSBjaGF0IHJvb20gaXMgaW4gZGVtbyBtb2RlXG4gICAgaWYgKHJvb21OYW1lLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgnZCcpKSB7XG4gICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3UgY2Fubm90IGFkZCBjby1ob3N0IGluIGRlbW8gbW9kZS4nLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBuZXdDb0hvc3QgPSBjb0hvc3Q7XG5cbiAgICBpZiAoXG4gICAgICBjb0hvc3QgIT0gJ05vIGNvSG9zdCcgfHxcbiAgICAgIChzZWxlY3RlZFBhcnRpY2lwYW50ICYmIHNlbGVjdGVkUGFydGljaXBhbnQgIT0gJ1NlbGVjdCBhIHBhcnRpY2lwYW50JylcbiAgICApIHtcbiAgICAgIGlmIChzZWxlY3RlZFBhcnRpY2lwYW50ICYmIHNlbGVjdGVkUGFydGljaXBhbnQgIT0gJ1NlbGVjdCBhIHBhcnRpY2lwYW50Jykge1xuICAgICAgICBuZXdDb0hvc3QgPSBzZWxlY3RlZFBhcnRpY2lwYW50O1xuICAgICAgICB1cGRhdGVDb0hvc3QobmV3Q29Ib3N0KTtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHkoY29Ib3N0UmVzcG9uc2liaWxpdHkpO1xuXG4gICAgICAvLyBFbWl0IGEgc29ja2V0IGV2ZW50IHRvIHVwZGF0ZSBjby1ob3N0IGluZm9ybWF0aW9uXG4gICAgICBzb2NrZXQuZW1pdCgndXBkYXRlQ29Ib3N0JywgeyByb29tTmFtZSwgY29Ib3N0OiBuZXdDb0hvc3QsIGNvSG9zdFJlc3BvbnNpYmlsaXR5IH0pO1xuICAgIH1cblxuICAgIC8vIENsb3NlIHRoZSBjby1ob3N0IG1vZGFsXG4gICAgdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGUoZmFsc2UpO1xuICB9XG59XG4iXX0=