import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ModifySettings {
    /**
     * Modifies the settings for a given room and updates the state accordingly.
     *
     * @param {Object} options - The options for modifying settings.
     * @param {Function} options.showAlert - Function to show alert messages.
     * @param {string} options.roomName - The name of the room.
     * @param {string} options.audioSet - The audio setting to be applied.
     * @param {string} options.videoSet - The video setting to be applied.
     * @param {string} options.screenshareSet - The screenshare setting to be applied.
     * @param {string} options.chatSet - The chat setting to be applied.
     * @param {Object} options.socket - The socket instance for emitting events.
     * @param {Function} options.updateAudioSetting - Function to update the audio setting state.
     * @param {Function} options.updateVideoSetting - Function to update the video setting state.
     * @param {Function} options.updateScreenshareSetting - Function to update the screenshare setting state.
     * @param {Function} options.updateChatSetting - Function to update the chat setting state.
     * @param {Function} options.updateIsSettingsModalVisible - Function to update the visibility of the settings modal.
     *
     * @returns {Promise<void>} A promise that resolves when the settings have been modified.
     *
     * @throws Will show an alert if any setting is set to "approval" in demo mode (room name starts with "d").
     */
    modifySettings = async ({ showAlert, roomName, audioSet, videoSet, screenshareSet, chatSet, socket, updateAudioSetting, updateVideoSetting, updateScreenshareSetting, updateChatSetting, updateIsSettingsModalVisible, }) => {
        if (roomName.toLowerCase().startsWith('d')) {
            // none should be approval
            if (audioSet === 'approval' ||
                videoSet === 'approval' ||
                screenshareSet === 'approval' ||
                chatSet === 'approval') {
                showAlert?.({
                    message: 'You cannot set approval for demo mode.',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
        }
        // Check and update state variables based on the provided logic
        if (audioSet) {
            updateAudioSetting(audioSet);
        }
        if (videoSet) {
            updateVideoSetting(videoSet);
        }
        if (screenshareSet) {
            updateScreenshareSetting(screenshareSet);
        }
        if (chatSet) {
            updateChatSetting(chatSet);
        }
        const settings = [audioSet, videoSet, screenshareSet, chatSet];
        socket.emit('updateSettingsForRequests', { settings, roomName });
        // Close modal
        updateIsSettingsModalVisible(false);
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ModifySettings, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ModifySettings, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ModifySettings, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kaWZ5LXNldHRpbmdzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9zZXR0aW5ncy1tZXRob2RzL21vZGlmeS1zZXR0aW5ncy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBd0IzQyxNQUFNLE9BQU8sY0FBYztJQUN6Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkc7SUFFSCxjQUFjLEdBQUcsS0FBSyxFQUFFLEVBQ3RCLFNBQVMsRUFDVCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixjQUFjLEVBQ2QsT0FBTyxFQUNQLE1BQU0sRUFDTixrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLHdCQUF3QixFQUN4QixpQkFBaUIsRUFDakIsNEJBQTRCLEdBQ04sRUFBaUIsRUFBRTtRQUN6QyxJQUFJLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUMzQywwQkFBMEI7WUFDMUIsSUFDRSxRQUFRLEtBQUssVUFBVTtnQkFDdkIsUUFBUSxLQUFLLFVBQVU7Z0JBQ3ZCLGNBQWMsS0FBSyxVQUFVO2dCQUM3QixPQUFPLEtBQUssVUFBVSxFQUN0QixDQUFDO2dCQUNELFNBQVMsRUFBRSxDQUFDO29CQUNWLE9BQU8sRUFBRSx3Q0FBd0M7b0JBQ2pELElBQUksRUFBRSxRQUFRO29CQUNkLFFBQVEsRUFBRSxJQUFJO2lCQUNmLENBQUMsQ0FBQztnQkFFSCxPQUFPO1lBQ1QsQ0FBQztRQUNILENBQUM7UUFFRCwrREFBK0Q7UUFDL0QsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUNiLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9CLENBQUM7UUFDRCxJQUFJLFFBQVEsRUFBRSxDQUFDO1lBQ2Isa0JBQWtCLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUNELElBQUksY0FBYyxFQUFFLENBQUM7WUFDbkIsd0JBQXdCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUNELElBQUksT0FBTyxFQUFFLENBQUM7WUFDWixpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsTUFBTSxRQUFRLEdBQUcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMvRCxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFFakUsY0FBYztRQUNkLDRCQUE0QixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUMsQ0FBQzt1R0ExRVMsY0FBYzsyR0FBZCxjQUFjLGNBRmIsTUFBTTs7MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBtb2RpZnktc2V0dGluZ3Muc2VydmljZS50c1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1vZGlmeVNldHRpbmdzT3B0aW9ucyB7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgYXVkaW9TZXQ6IHN0cmluZztcbiAgdmlkZW9TZXQ6IHN0cmluZztcbiAgc2NyZWVuc2hhcmVTZXQ6IHN0cmluZztcbiAgY2hhdFNldDogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgdXBkYXRlQXVkaW9TZXR0aW5nOiAoYXVkaW9TZXQ6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlVmlkZW9TZXR0aW5nOiAodmlkZW9TZXQ6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nOiAoc2NyZWVuc2hhcmVTZXQ6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlQ2hhdFNldHRpbmc6IChjaGF0U2V0OiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIE1vZGlmeVNldHRpbmdzVHlwZSA9IChvcHRpb25zOiBNb2RpZnlTZXR0aW5nc09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBNb2RpZnlTZXR0aW5ncyB7XG4gIC8qKlxuICAgKiBNb2RpZmllcyB0aGUgc2V0dGluZ3MgZm9yIGEgZ2l2ZW4gcm9vbSBhbmQgdXBkYXRlcyB0aGUgc3RhdGUgYWNjb3JkaW5nbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIG1vZGlmeWluZyBzZXR0aW5ncy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5zaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0IG1lc3NhZ2VzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5hdWRpb1NldCAtIFRoZSBhdWRpbyBzZXR0aW5nIHRvIGJlIGFwcGxpZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnZpZGVvU2V0IC0gVGhlIHZpZGVvIHNldHRpbmcgdG8gYmUgYXBwbGllZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc2NyZWVuc2hhcmVTZXQgLSBUaGUgc2NyZWVuc2hhcmUgc2V0dGluZyB0byBiZSBhcHBsaWVkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jaGF0U2V0IC0gVGhlIGNoYXQgc2V0dGluZyB0byBiZSBhcHBsaWVkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIGZvciBlbWl0dGluZyBldmVudHMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlQXVkaW9TZXR0aW5nIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhdWRpbyBzZXR0aW5nIHN0YXRlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZVZpZGVvU2V0dGluZyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlkZW8gc2V0dGluZyBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHNjcmVlbnNoYXJlIHNldHRpbmcgc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlQ2hhdFNldHRpbmcgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGNoYXQgc2V0dGluZyBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBzZXR0aW5ncyBtb2RhbC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNldHRpbmdzIGhhdmUgYmVlbiBtb2RpZmllZC5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIHNob3cgYW4gYWxlcnQgaWYgYW55IHNldHRpbmcgaXMgc2V0IHRvIFwiYXBwcm92YWxcIiBpbiBkZW1vIG1vZGUgKHJvb20gbmFtZSBzdGFydHMgd2l0aCBcImRcIikuXG4gICAqL1xuXG4gIG1vZGlmeVNldHRpbmdzID0gYXN5bmMgKHtcbiAgICBzaG93QWxlcnQsXG4gICAgcm9vbU5hbWUsXG4gICAgYXVkaW9TZXQsXG4gICAgdmlkZW9TZXQsXG4gICAgc2NyZWVuc2hhcmVTZXQsXG4gICAgY2hhdFNldCxcbiAgICBzb2NrZXQsXG4gICAgdXBkYXRlQXVkaW9TZXR0aW5nLFxuICAgIHVwZGF0ZVZpZGVvU2V0dGluZyxcbiAgICB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcsXG4gICAgdXBkYXRlQ2hhdFNldHRpbmcsXG4gICAgdXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZSxcbiAgfTogTW9kaWZ5U2V0dGluZ3NPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKHJvb21OYW1lLnRvTG93ZXJDYXNlKCkuc3RhcnRzV2l0aCgnZCcpKSB7XG4gICAgICAvLyBub25lIHNob3VsZCBiZSBhcHByb3ZhbFxuICAgICAgaWYgKFxuICAgICAgICBhdWRpb1NldCA9PT0gJ2FwcHJvdmFsJyB8fFxuICAgICAgICB2aWRlb1NldCA9PT0gJ2FwcHJvdmFsJyB8fFxuICAgICAgICBzY3JlZW5zaGFyZVNldCA9PT0gJ2FwcHJvdmFsJyB8fFxuICAgICAgICBjaGF0U2V0ID09PSAnYXBwcm92YWwnXG4gICAgICApIHtcbiAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdZb3UgY2Fubm90IHNldCBhcHByb3ZhbCBmb3IgZGVtbyBtb2RlLicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBDaGVjayBhbmQgdXBkYXRlIHN0YXRlIHZhcmlhYmxlcyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgbG9naWNcbiAgICBpZiAoYXVkaW9TZXQpIHtcbiAgICAgIHVwZGF0ZUF1ZGlvU2V0dGluZyhhdWRpb1NldCk7XG4gICAgfVxuICAgIGlmICh2aWRlb1NldCkge1xuICAgICAgdXBkYXRlVmlkZW9TZXR0aW5nKHZpZGVvU2V0KTtcbiAgICB9XG4gICAgaWYgKHNjcmVlbnNoYXJlU2V0KSB7XG4gICAgICB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcoc2NyZWVuc2hhcmVTZXQpO1xuICAgIH1cbiAgICBpZiAoY2hhdFNldCkge1xuICAgICAgdXBkYXRlQ2hhdFNldHRpbmcoY2hhdFNldCk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2V0dGluZ3MgPSBbYXVkaW9TZXQsIHZpZGVvU2V0LCBzY3JlZW5zaGFyZVNldCwgY2hhdFNldF07XG4gICAgc29ja2V0LmVtaXQoJ3VwZGF0ZVNldHRpbmdzRm9yUmVxdWVzdHMnLCB7IHNldHRpbmdzLCByb29tTmFtZSB9KTtcblxuICAgIC8vIENsb3NlIG1vZGFsXG4gICAgdXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZShmYWxzZSk7XG4gIH07XG59XG4iXX0=