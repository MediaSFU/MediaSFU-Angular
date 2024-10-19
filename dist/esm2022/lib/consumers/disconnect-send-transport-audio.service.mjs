import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class DisconnectSendTransportAudio {
    /**
     * Disconnects the send transport for audio by pausing the audio producer and updating the UI accordingly.
     *
     * @param {DisconnectSendTransportAudioOptions} parameters - The parameters required to disconnect the send transport for audio.
     * @param {Object} parameters.audioProducer - The audio producer to be paused.
     * @param {Object} parameters.socket - The socket connection to notify the server.
     * @param {boolean} parameters.videoAlreadyOn - Flag indicating if the video is already on.
     * @param {string} parameters.islevel - The level of the user.
     * @param {boolean} parameters.lock_screen - Flag indicating if the screen is locked.
     * @param {boolean} parameters.shared - Flag indicating if the screen is shared.
     * @param {Function} parameters.updateMainWindow - Function to update the main window state.
     * @param {string} parameters.hostLabel - The label of the host.
     * @param {string} parameters.roomName - The name of the room.
     * @param {Function} parameters.updateAudioProducer - Function to update the audio producer state.
     * @param {Function} parameters.updateUpdateMainWindow - Function to update the main window update state.
     * @param {Function} parameters.prepopulateUserMedia - Function to prepopulate user media.
     *
     * @returns {Promise<void>} A promise that resolves when the send transport for audio is disconnected.
     *
     * @throws Will throw an error if the operation fails.
     */
    async disconnectSendTransportAudio({ parameters, }) {
        try {
            // Destructure parameters
            let { audioProducer, socket, videoAlreadyOn, islevel, lock_screen, shared, updateMainWindow, hostLabel, roomName, updateAudioProducer, updateUpdateMainWindow, prepopulateUserMedia, } = parameters;
            // Pause the audio producer
            audioProducer?.pause(); // actual logic is to close (await audioProducer.close()) but mediaSFU prefers pause if recording
            updateAudioProducer(audioProducer);
            // Update the UI
            if (!videoAlreadyOn && islevel === '2') {
                if (!lock_screen && !shared) {
                    updateMainWindow = true;
                    updateUpdateMainWindow(updateMainWindow);
                    await prepopulateUserMedia({ name: hostLabel, parameters });
                    updateMainWindow = false;
                    updateUpdateMainWindow(updateMainWindow);
                }
            }
            // Notify the server about pausing audio producer
            socket.emit('pauseProducerMedia', { mediaTag: 'audio', roomName: roomName });
        }
        catch (error) {
            console.error('disconnectSendTransportAudio error', error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: DisconnectSendTransportAudio, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: DisconnectSendTransportAudio, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: DisconnectSendTransportAudio, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1hdWRpby5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9kaXNjb25uZWN0LXNlbmQtdHJhbnNwb3J0LWF1ZGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFrQzNDLE1BQU0sT0FBTyw0QkFBNEI7SUFDdkM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JHO0lBQ0gsS0FBSyxDQUFDLDRCQUE0QixDQUFDLEVBQ2pDLFVBQVUsR0FDMEI7UUFDcEMsSUFBSSxDQUFDO1lBQ0gseUJBQXlCO1lBQ3pCLElBQUksRUFDRixhQUFhLEVBQ2IsTUFBTSxFQUNOLGNBQWMsRUFDZCxPQUFPLEVBQ1AsV0FBVyxFQUNYLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsU0FBUyxFQUNULFFBQVEsRUFDUixtQkFBbUIsRUFDbkIsc0JBQXNCLEVBQ3RCLG9CQUFvQixHQUNyQixHQUFHLFVBQVUsQ0FBQztZQUVmLDJCQUEyQjtZQUMzQixhQUFhLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxpR0FBaUc7WUFDekgsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7WUFFbkMsZ0JBQWdCO1lBQ2hCLElBQUksQ0FBQyxjQUFjLElBQUksT0FBTyxLQUFLLEdBQUcsRUFBRSxDQUFDO2dCQUN2QyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzVCLGdCQUFnQixHQUFHLElBQUksQ0FBQztvQkFDeEIsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztvQkFDekMsTUFBTSxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDNUQsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO29CQUN6QixzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2dCQUMzQyxDQUFDO1lBQ0gsQ0FBQztZQUVELGlEQUFpRDtZQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvRSxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0NBQW9DLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDN0QsQ0FBQztJQUNILENBQUM7dUdBOURVLDRCQUE0QjsyR0FBNUIsNEJBQTRCLGNBRjNCLE1BQU07OzJGQUVQLDRCQUE0QjtrQkFIeEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IFByZXBvcHVsYXRlVXNlck1lZGlhVHlwZSwgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcbmltcG9ydCB7IFByb2R1Y2VyIH0gZnJvbSAnbWVkaWFzb3VwLWNsaWVudC9saWIvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvUGFyYW1ldGVycyBleHRlbmRzIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyB7XG4gIGF1ZGlvUHJvZHVjZXI6IFByb2R1Y2VyIHwgbnVsbDtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHZpZGVvQWxyZWFkeU9uOiBib29sZWFuO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIGxvY2tfc2NyZWVuOiBib29sZWFuO1xuICBzaGFyZWQ6IGJvb2xlYW47XG4gIHVwZGF0ZU1haW5XaW5kb3c6IGJvb2xlYW47XG4gIGhvc3RMYWJlbDogc3RyaW5nO1xuICByb29tTmFtZTogc3RyaW5nO1xuICB1cGRhdGVBdWRpb1Byb2R1Y2VyOiAoYXVkaW9Qcm9kdWNlcjogUHJvZHVjZXIgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVVcGRhdGVNYWluV2luZG93OiAodXBkYXRlTWFpbldpbmRvdzogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgcHJlcG9wdWxhdGVVc2VyTWVkaWE6IFByZXBvcHVsYXRlVXNlck1lZGlhVHlwZTtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9PcHRpb25zIHtcbiAgcGFyYW1ldGVyczogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9UeXBlID0gKFxuICBvcHRpb25zOiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvT3B0aW9ucyxcbikgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8ge1xuICAvKipcbiAgICogRGlzY29ubmVjdHMgdGhlIHNlbmQgdHJhbnNwb3J0IGZvciBhdWRpbyBieSBwYXVzaW5nIHRoZSBhdWRpbyBwcm9kdWNlciBhbmQgdXBkYXRpbmcgdGhlIFVJIGFjY29yZGluZ2x5LlxuICAgKlxuICAgKiBAcGFyYW0ge0Rpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9PcHRpb25zfSBwYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgdG8gZGlzY29ubmVjdCB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIGF1ZGlvLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1ldGVycy5hdWRpb1Byb2R1Y2VyIC0gVGhlIGF1ZGlvIHByb2R1Y2VyIHRvIGJlIHBhdXNlZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtZXRlcnMuc29ja2V0IC0gVGhlIHNvY2tldCBjb25uZWN0aW9uIHRvIG5vdGlmeSB0aGUgc2VydmVyLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtZXRlcnMudmlkZW9BbHJlYWR5T24gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHZpZGVvIGlzIGFscmVhZHkgb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbWV0ZXJzLmlzbGV2ZWwgLSBUaGUgbGV2ZWwgb2YgdGhlIHVzZXIuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyYW1ldGVycy5sb2NrX3NjcmVlbiAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc2NyZWVuIGlzIGxvY2tlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBwYXJhbWV0ZXJzLnNoYXJlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc2NyZWVuIGlzIHNoYXJlZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyYW1ldGVycy51cGRhdGVNYWluV2luZG93IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIHdpbmRvdyBzdGF0ZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtZXRlcnMuaG9zdExhYmVsIC0gVGhlIGxhYmVsIG9mIHRoZSBob3N0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1ldGVycy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJhbWV0ZXJzLnVwZGF0ZUF1ZGlvUHJvZHVjZXIgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF1ZGlvIHByb2R1Y2VyIHN0YXRlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93IHVwZGF0ZSBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyYW1ldGVycy5wcmVwb3B1bGF0ZVVzZXJNZWRpYSAtIEZ1bmN0aW9uIHRvIHByZXBvcHVsYXRlIHVzZXIgbWVkaWEuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgYXVkaW8gaXMgZGlzY29ubmVjdGVkLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIG9wZXJhdGlvbiBmYWlscy5cbiAgICovXG4gIGFzeW5jIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8oe1xuICAgIHBhcmFtZXRlcnMsXG4gIH06IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIERlc3RydWN0dXJlIHBhcmFtZXRlcnNcbiAgICAgIGxldCB7XG4gICAgICAgIGF1ZGlvUHJvZHVjZXIsXG4gICAgICAgIHNvY2tldCxcbiAgICAgICAgdmlkZW9BbHJlYWR5T24sXG4gICAgICAgIGlzbGV2ZWwsXG4gICAgICAgIGxvY2tfc2NyZWVuLFxuICAgICAgICBzaGFyZWQsXG4gICAgICAgIHVwZGF0ZU1haW5XaW5kb3csXG4gICAgICAgIGhvc3RMYWJlbCxcbiAgICAgICAgcm9vbU5hbWUsXG4gICAgICAgIHVwZGF0ZUF1ZGlvUHJvZHVjZXIsXG4gICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3csXG4gICAgICAgIHByZXBvcHVsYXRlVXNlck1lZGlhLFxuICAgICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIC8vIFBhdXNlIHRoZSBhdWRpbyBwcm9kdWNlclxuICAgICAgYXVkaW9Qcm9kdWNlcj8ucGF1c2UoKTsgLy8gYWN0dWFsIGxvZ2ljIGlzIHRvIGNsb3NlIChhd2FpdCBhdWRpb1Byb2R1Y2VyLmNsb3NlKCkpIGJ1dCBtZWRpYVNGVSBwcmVmZXJzIHBhdXNlIGlmIHJlY29yZGluZ1xuICAgICAgdXBkYXRlQXVkaW9Qcm9kdWNlcihhdWRpb1Byb2R1Y2VyKTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBVSVxuICAgICAgaWYgKCF2aWRlb0FscmVhZHlPbiAmJiBpc2xldmVsID09PSAnMicpIHtcbiAgICAgICAgaWYgKCFsb2NrX3NjcmVlbiAmJiAhc2hhcmVkKSB7XG4gICAgICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IHRydWU7XG4gICAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh1cGRhdGVNYWluV2luZG93KTtcbiAgICAgICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7IG5hbWU6IGhvc3RMYWJlbCwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB1cGRhdGVNYWluV2luZG93ID0gZmFsc2U7XG4gICAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh1cGRhdGVNYWluV2luZG93KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBOb3RpZnkgdGhlIHNlcnZlciBhYm91dCBwYXVzaW5nIGF1ZGlvIHByb2R1Y2VyXG4gICAgICBzb2NrZXQuZW1pdCgncGF1c2VQcm9kdWNlck1lZGlhJywgeyBtZWRpYVRhZzogJ2F1ZGlvJywgcm9vbU5hbWU6IHJvb21OYW1lIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdkaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvIGVycm9yJywgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19