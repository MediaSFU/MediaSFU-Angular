// This method is used to modify the co-host settings in the chat room.
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LWNvLWhvc3Qtc2V0dGluZ3Muc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL2NvLWhvc3QtbWV0aG9kcy9tb2RpZnktY28taG9zdC1zZXR0aW5ncy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHVFQUF1RTtBQUV2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXNCM0MsTUFBTSxPQUFPLG9CQUFvQjtJQUMvQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BcUJHO0lBQ0gsS0FBSyxDQUFDLG9CQUFvQixDQUFDLEVBQ3pCLFFBQVEsRUFDUixTQUFTLEVBQ1QsbUJBQW1CLEVBQ25CLE1BQU0sRUFDTixvQkFBb0IsRUFDcEIsMEJBQTBCLEVBQzFCLDBCQUEwQixFQUMxQixZQUFZLEVBQ1osTUFBTSxHQUNzQjtRQUM1Qix5Q0FBeUM7UUFDekMsSUFBSSxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDM0MsU0FBUyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLHNDQUFzQztnQkFDL0MsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsUUFBUSxFQUFFLElBQUk7YUFDZixDQUFDLENBQUM7WUFFSCxPQUFPO1FBQ1QsQ0FBQztRQUVELElBQUksU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUV2QixJQUNFLE1BQU0sSUFBSSxXQUFXO1lBQ3JCLENBQUMsbUJBQW1CLElBQUksbUJBQW1CLElBQUksc0JBQXNCLENBQUMsRUFDdEUsQ0FBQztZQUNELElBQUksbUJBQW1CLElBQUksbUJBQW1CLElBQUksc0JBQXNCLEVBQUUsQ0FBQztnQkFDekUsU0FBUyxHQUFHLG1CQUFtQixDQUFDO2dCQUNoQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDMUIsQ0FBQztZQUVELDBCQUEwQixDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFakQsb0RBQW9EO1lBQ3BELE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsb0JBQW9CLEVBQUUsQ0FBQyxDQUFDO1FBQ3JGLENBQUM7UUFFRCwwQkFBMEI7UUFDMUIsMEJBQTBCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDcEMsQ0FBQzt1R0FoRVUsb0JBQW9COzJHQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgbWV0aG9kIGlzIHVzZWQgdG8gbW9kaWZ5IHRoZSBjby1ob3N0IHNldHRpbmdzIGluIHRoZSBjaGF0IHJvb20uXG5cbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNob3dBbGVydCwgQ29Ib3N0UmVzcG9uc2liaWxpdHkgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTW9kaWZ5Q29Ib3N0U2V0dGluZ3NPcHRpb25zIHtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBzZWxlY3RlZFBhcnRpY2lwYW50OiBzdHJpbmc7XG4gIGNvSG9zdDogc3RyaW5nO1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5OiAoY29Ib3N0UmVzcG9uc2liaWxpdHk6IENvSG9zdFJlc3BvbnNpYmlsaXR5W10pID0+IHZvaWQ7XG4gIHVwZGF0ZUNvSG9zdDogKGNvSG9zdDogc3RyaW5nKSA9PiB2b2lkO1xuICBzb2NrZXQ6IFNvY2tldDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgTW9kaWZ5Q29Ib3N0U2V0dGluZ3NUeXBlID0gKG9wdGlvbnM6IE1vZGlmeUNvSG9zdFNldHRpbmdzT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIE1vZGlmeUNvSG9zdFNldHRpbmdzIHtcbiAgLyoqXG4gICAqIE1vZGlmaWVzIHRoZSBjby1ob3N0IHNldHRpbmdzIGZvciBhIGdpdmVuIHJvb20uXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIG1vZGlmeWluZyBjby1ob3N0IHNldHRpbmdzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnNob3dBbGVydCAtIEZ1bmN0aW9uIHRvIHNob3cgYW4gYWxlcnQgbWVzc2FnZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc2VsZWN0ZWRQYXJ0aWNpcGFudCAtIFRoZSBwYXJ0aWNpcGFudCBzZWxlY3RlZCB0byBiZSBjby1ob3N0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jb0hvc3QgLSBUaGUgY3VycmVudCBjby1ob3N0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jb0hvc3RSZXNwb25zaWJpbGl0eSAtIFRoZSByZXNwb25zaWJpbGl0eSBhc3NpZ25lZCB0byB0aGUgY28taG9zdC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgY28taG9zdCBtb2RhbC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgY28taG9zdCByZXNwb25zaWJpbGl0eS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVDb0hvc3QgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGNvLWhvc3QuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIGVtaXR0aW5nIGV2ZW50cy5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGNvLWhvc3Qgc2V0dGluZ3MgaGF2ZSBiZWVuIG1vZGlmaWVkLlxuICAgKlxuICAgKiBAcmVtYXJrc1xuICAgKiAtIElmIHRoZSByb29tIGlzIGluIGRlbW8gbW9kZSAocm9vbSBuYW1lIHN0YXJ0cyB3aXRoIFwiZFwiKSwgY28taG9zdCBjYW5ub3QgYmUgYWRkZWQgYW5kIGFuIGFsZXJ0IGlzIHNob3duLlxuICAgKiAtIElmIGEgdmFsaWQgcGFydGljaXBhbnQgaXMgc2VsZWN0ZWQsIHRoZXkgYXJlIHNldCBhcyB0aGUgbmV3IGNvLWhvc3QuXG4gICAqIC0gVGhlIGNvLWhvc3QgcmVzcG9uc2liaWxpdHkgaXMgdXBkYXRlZC5cbiAgICogLSBBIHNvY2tldCBldmVudCBpcyBlbWl0dGVkIHRvIHVwZGF0ZSB0aGUgY28taG9zdCBpbmZvcm1hdGlvbi5cbiAgICogLSBUaGUgY28taG9zdCBtb2RhbCBpcyBjbG9zZWQgYWZ0ZXIgdXBkYXRpbmcgdGhlIHNldHRpbmdzLlxuICAgKi9cbiAgYXN5bmMgbW9kaWZ5Q29Ib3N0U2V0dGluZ3Moe1xuICAgIHJvb21OYW1lLFxuICAgIHNob3dBbGVydCxcbiAgICBzZWxlY3RlZFBhcnRpY2lwYW50LFxuICAgIGNvSG9zdCxcbiAgICBjb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgICB1cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZSxcbiAgICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgICB1cGRhdGVDb0hvc3QsXG4gICAgc29ja2V0LFxuICB9OiBNb2RpZnlDb0hvc3RTZXR0aW5nc09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBDaGVjayBpZiB0aGUgY2hhdCByb29tIGlzIGluIGRlbW8gbW9kZVxuICAgIGlmIChyb29tTmFtZS50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoJ2QnKSkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IGNhbm5vdCBhZGQgY28taG9zdCBpbiBkZW1vIG1vZGUuJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgbmV3Q29Ib3N0ID0gY29Ib3N0O1xuXG4gICAgaWYgKFxuICAgICAgY29Ib3N0ICE9ICdObyBjb0hvc3QnIHx8XG4gICAgICAoc2VsZWN0ZWRQYXJ0aWNpcGFudCAmJiBzZWxlY3RlZFBhcnRpY2lwYW50ICE9ICdTZWxlY3QgYSBwYXJ0aWNpcGFudCcpXG4gICAgKSB7XG4gICAgICBpZiAoc2VsZWN0ZWRQYXJ0aWNpcGFudCAmJiBzZWxlY3RlZFBhcnRpY2lwYW50ICE9ICdTZWxlY3QgYSBwYXJ0aWNpcGFudCcpIHtcbiAgICAgICAgbmV3Q29Ib3N0ID0gc2VsZWN0ZWRQYXJ0aWNpcGFudDtcbiAgICAgICAgdXBkYXRlQ29Ib3N0KG5ld0NvSG9zdCk7XG4gICAgICB9XG5cbiAgICAgIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5KGNvSG9zdFJlc3BvbnNpYmlsaXR5KTtcblxuICAgICAgLy8gRW1pdCBhIHNvY2tldCBldmVudCB0byB1cGRhdGUgY28taG9zdCBpbmZvcm1hdGlvblxuICAgICAgc29ja2V0LmVtaXQoJ3VwZGF0ZUNvSG9zdCcsIHsgcm9vbU5hbWUsIGNvSG9zdDogbmV3Q29Ib3N0LCBjb0hvc3RSZXNwb25zaWJpbGl0eSB9KTtcbiAgICB9XG5cbiAgICAvLyBDbG9zZSB0aGUgY28taG9zdCBtb2RhbFxuICAgIHVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgfVxufVxuIl19