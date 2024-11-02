import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Disconnects the send transport for audio by pausing the audio producer and updating the UI accordingly.
 *
 * @param {DisconnectSendTransportAudioOptions} options - The options required to disconnect the send transport for audio.
 * @param {Object} options.parameters - The parameters required for the disconnection.
 * @param {Producer | null} options.parameters.audioProducer - The audio producer to be paused.
 * @param {Socket} options.parameters.socket - The socket connection to notify the server.
 * @param {boolean} options.parameters.videoAlreadyOn - Flag indicating if the video is already on.
 * @param {string} options.parameters.islevel - The level of the user.
 * @param {boolean} options.parameters.lock_screen - Flag indicating if the screen is locked.
 * @param {boolean} options.parameters.shared - Flag indicating if the screen is shared.
 * @param {Function} options.parameters.updateMainWindow - Function to update the main window state.
 * @param {string} options.parameters.hostLabel - The label of the host.
 * @param {string} options.parameters.roomName - The name of the room.
 * @param {Function} options.parameters.updateAudioProducer - Function to update the audio producer state.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window update state.
 * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
 *
 * @returns {Promise<void>} A promise that resolves when the send transport for audio is disconnected.
 *
 * @throws Will throw an error if the operation fails.
 *
 * @example
 * ```typescript
 * const options = {
 *   parameters: {
 *     audioProducer,
 *     socket,
 *     videoAlreadyOn: false,
 *     islevel: '1',
 *     lock_screen: false,
 *     shared: false,
 *     updateMainWindow: false,
 *     hostLabel: 'Host',
 *     roomName: 'Room 101',
 *     updateAudioProducer: (producer) => { console.log(updated) },
 *     updateUpdateMainWindow: (state) => { console.log(updated) },
 *     prepopulateUserMedia: async ({ name, parameters }) => { },
 *   },
 * };
 *
 * disconnectSendTransportAudioService.disconnectSendTransportAudio(options)
 *   .then(() => {
 *     console.log('Audio transport disconnected successfully');
 *   })
 *   .catch((error) => {
 *     console.error('Error disconnecting audio transport:', error);
 *   });
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1hdWRpby5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9kaXNjb25uZWN0LXNlbmQtdHJhbnNwb3J0LWF1ZGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUErQnpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBaURHO0FBTUwsTUFBTSxPQUFPLDRCQUE0QjtJQUN2Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkc7SUFDSCxLQUFLLENBQUMsNEJBQTRCLENBQUMsRUFDakMsVUFBVSxHQUMwQjtRQUNwQyxJQUFJLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsSUFBSSxFQUNGLGFBQWEsRUFDYixNQUFNLEVBQ04sY0FBYyxFQUNkLE9BQU8sRUFDUCxXQUFXLEVBQ1gsTUFBTSxFQUNOLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsUUFBUSxFQUNSLG1CQUFtQixFQUNuQixzQkFBc0IsRUFDdEIsb0JBQW9CLEdBQ3JCLEdBQUcsVUFBVSxDQUFDO1lBRWYsMkJBQTJCO1lBQzNCLGFBQWEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLGlHQUFpRztZQUN6SCxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUVuQyxnQkFBZ0I7WUFDaEIsSUFBSSxDQUFDLGNBQWMsSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDNUIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO29CQUN4QixzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUN6QyxNQUFNLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUM1RCxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7b0JBQ3pCLHNCQUFzQixDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQzNDLENBQUM7WUFDSCxDQUFDO1lBRUQsaURBQWlEO1lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM3RCxDQUFDO0lBQ0gsQ0FBQzt1R0E5RFUsNEJBQTRCOzJHQUE1Qiw0QkFBNEIsY0FGM0IsTUFBTTs7MkZBRVAsNEJBQTRCO2tCQUh4QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlLCBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMgfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgUHJvZHVjZXIgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9QYXJhbWV0ZXJzIGV4dGVuZHMgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzIHtcbiAgYXVkaW9Qcm9kdWNlcjogUHJvZHVjZXIgfCBudWxsO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgdmlkZW9BbHJlYWR5T246IGJvb2xlYW47XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgbG9ja19zY3JlZW46IGJvb2xlYW47XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgdXBkYXRlTWFpbldpbmRvdzogYm9vbGVhbjtcbiAgaG9zdExhYmVsOiBzdHJpbmc7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHVwZGF0ZUF1ZGlvUHJvZHVjZXI6IChhdWRpb1Byb2R1Y2VyOiBQcm9kdWNlciB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6ICh1cGRhdGVNYWluV2luZG93OiBib29sZWFuKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTogUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb09wdGlvbnMge1xuICBwYXJhbWV0ZXJzOiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1R5cGUgPSAoXG4gIG9wdGlvbnM6IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9PcHRpb25zLFxuKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIGF1ZGlvIGJ5IHBhdXNpbmcgdGhlIGF1ZGlvIHByb2R1Y2VyIGFuZCB1cGRhdGluZyB0aGUgVUkgYWNjb3JkaW5nbHkuXG4gICAqXG4gICAqIEBwYXJhbSB7RGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyByZXF1aXJlZCB0byBkaXNjb25uZWN0IHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgYXVkaW8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3IgdGhlIGRpc2Nvbm5lY3Rpb24uXG4gICAqIEBwYXJhbSB7UHJvZHVjZXIgfCBudWxsfSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9Qcm9kdWNlciAtIFRoZSBhdWRpbyBwcm9kdWNlciB0byBiZSBwYXVzZWQuXG4gICAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnBhcmFtZXRlcnMuc29ja2V0IC0gVGhlIHNvY2tldCBjb25uZWN0aW9uIHRvIG5vdGlmeSB0aGUgc2VydmVyLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy52aWRlb0FscmVhZHlPbiAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgdmlkZW8gaXMgYWxyZWFkeSBvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5pc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSB1c2VyLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5sb2NrX3NjcmVlbiAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc2NyZWVuIGlzIGxvY2tlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBzY3JlZW4gaXMgc2hhcmVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbldpbmRvdyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cgc3RhdGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaG9zdExhYmVsIC0gVGhlIGxhYmVsIG9mIHRoZSBob3N0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVBdWRpb1Byb2R1Y2VyIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhdWRpbyBwcm9kdWNlciBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93IHVwZGF0ZSBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnByZXBvcHVsYXRlVXNlck1lZGlhIC0gRnVuY3Rpb24gdG8gcHJlcG9wdWxhdGUgdXNlciBtZWRpYS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNlbmQgdHJhbnNwb3J0IGZvciBhdWRpbyBpcyBkaXNjb25uZWN0ZWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgb3BlcmF0aW9uIGZhaWxzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAqICAgcGFyYW1ldGVyczoge1xuICAgKiAgICAgYXVkaW9Qcm9kdWNlcixcbiAgICogICAgIHNvY2tldCxcbiAgICogICAgIHZpZGVvQWxyZWFkeU9uOiBmYWxzZSxcbiAgICogICAgIGlzbGV2ZWw6ICcxJyxcbiAgICogICAgIGxvY2tfc2NyZWVuOiBmYWxzZSxcbiAgICogICAgIHNoYXJlZDogZmFsc2UsXG4gICAqICAgICB1cGRhdGVNYWluV2luZG93OiBmYWxzZSxcbiAgICogICAgIGhvc3RMYWJlbDogJ0hvc3QnLFxuICAgKiAgICAgcm9vbU5hbWU6ICdSb29tIDEwMScsXG4gICAqICAgICB1cGRhdGVBdWRpb1Byb2R1Y2VyOiAocHJvZHVjZXIpID0+IHsgY29uc29sZS5sb2codXBkYXRlZCkgfSxcbiAgICogICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6IChzdGF0ZSkgPT4geyBjb25zb2xlLmxvZyh1cGRhdGVkKSB9LFxuICAgKiAgICAgcHJlcG9wdWxhdGVVc2VyTWVkaWE6IGFzeW5jICh7IG5hbWUsIHBhcmFtZXRlcnMgfSkgPT4geyB9LFxuICAgKiAgIH0sXG4gICAqIH07XG4gICAqXG4gICAqIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9TZXJ2aWNlLmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8ob3B0aW9ucylcbiAgICogICAudGhlbigoKSA9PiB7XG4gICAqICAgICBjb25zb2xlLmxvZygnQXVkaW8gdHJhbnNwb3J0IGRpc2Nvbm5lY3RlZCBzdWNjZXNzZnVsbHknKTtcbiAgICogICB9KVxuICAgKiAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICogICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGRpc2Nvbm5lY3RpbmcgYXVkaW8gdHJhbnNwb3J0OicsIGVycm9yKTtcbiAgICogICB9KTtcbiAgICogYGBgXG4gICAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvIHtcbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgYXVkaW8gYnkgcGF1c2luZyB0aGUgYXVkaW8gcHJvZHVjZXIgYW5kIHVwZGF0aW5nIHRoZSBVSSBhY2NvcmRpbmdseS5cbiAgICpcbiAgICogQHBhcmFtIHtEaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvT3B0aW9uc30gcGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIHRvIGRpc2Nvbm5lY3QgdGhlIHNlbmQgdHJhbnNwb3J0IGZvciBhdWRpby5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtZXRlcnMuYXVkaW9Qcm9kdWNlciAtIFRoZSBhdWRpbyBwcm9kdWNlciB0byBiZSBwYXVzZWQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgY29ubmVjdGlvbiB0byBub3RpZnkgdGhlIHNlcnZlci5cbiAgICogQHBhcmFtIHtib29sZWFufSBwYXJhbWV0ZXJzLnZpZGVvQWxyZWFkeU9uIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB2aWRlbyBpcyBhbHJlYWR5IG9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1ldGVycy5pc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSB1c2VyLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtZXRlcnMubG9ja19zY3JlZW4gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHNjcmVlbiBpcyBsb2NrZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyYW1ldGVycy5zaGFyZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHNjcmVlbiBpcyBzaGFyZWQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcmFtZXRlcnMudXBkYXRlTWFpbldpbmRvdyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cgc3RhdGUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbWV0ZXJzLmhvc3RMYWJlbCAtIFRoZSBsYWJlbCBvZiB0aGUgaG9zdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtZXRlcnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyYW1ldGVycy51cGRhdGVBdWRpb1Byb2R1Y2VyIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhdWRpbyBwcm9kdWNlciBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyYW1ldGVycy51cGRhdGVVcGRhdGVNYWluV2luZG93IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIHdpbmRvdyB1cGRhdGUgc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IHBhcmFtZXRlcnMucHJlcG9wdWxhdGVVc2VyTWVkaWEgLSBGdW5jdGlvbiB0byBwcmVwb3B1bGF0ZSB1c2VyIG1lZGlhLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIGF1ZGlvIGlzIGRpc2Nvbm5lY3RlZC5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBvcGVyYXRpb24gZmFpbHMuXG4gICAqL1xuICBhc3luYyBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvKHtcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBEZXN0cnVjdHVyZSBwYXJhbWV0ZXJzXG4gICAgICBsZXQge1xuICAgICAgICBhdWRpb1Byb2R1Y2VyLFxuICAgICAgICBzb2NrZXQsXG4gICAgICAgIHZpZGVvQWxyZWFkeU9uLFxuICAgICAgICBpc2xldmVsLFxuICAgICAgICBsb2NrX3NjcmVlbixcbiAgICAgICAgc2hhcmVkLFxuICAgICAgICB1cGRhdGVNYWluV2luZG93LFxuICAgICAgICBob3N0TGFiZWwsXG4gICAgICAgIHJvb21OYW1lLFxuICAgICAgICB1cGRhdGVBdWRpb1Byb2R1Y2VyLFxuICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93LFxuICAgICAgICBwcmVwb3B1bGF0ZVVzZXJNZWRpYSxcbiAgICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICAvLyBQYXVzZSB0aGUgYXVkaW8gcHJvZHVjZXJcbiAgICAgIGF1ZGlvUHJvZHVjZXI/LnBhdXNlKCk7IC8vIGFjdHVhbCBsb2dpYyBpcyB0byBjbG9zZSAoYXdhaXQgYXVkaW9Qcm9kdWNlci5jbG9zZSgpKSBidXQgbWVkaWFTRlUgcHJlZmVycyBwYXVzZSBpZiByZWNvcmRpbmdcbiAgICAgIHVwZGF0ZUF1ZGlvUHJvZHVjZXIoYXVkaW9Qcm9kdWNlcik7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgVUlcbiAgICAgIGlmICghdmlkZW9BbHJlYWR5T24gJiYgaXNsZXZlbCA9PT0gJzInKSB7XG4gICAgICAgIGlmICghbG9ja19zY3JlZW4gJiYgIXNoYXJlZCkge1xuICAgICAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSB0cnVlO1xuICAgICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG4gICAgICAgICAgYXdhaXQgcHJlcG9wdWxhdGVVc2VyTWVkaWEoeyBuYW1lOiBob3N0TGFiZWwsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IGZhbHNlO1xuICAgICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gTm90aWZ5IHRoZSBzZXJ2ZXIgYWJvdXQgcGF1c2luZyBhdWRpbyBwcm9kdWNlclxuICAgICAgc29ja2V0LmVtaXQoJ3BhdXNlUHJvZHVjZXJNZWRpYScsIHsgbWVkaWFUYWc6ICdhdWRpbycsIHJvb21OYW1lOiByb29tTmFtZSB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyBlcnJvcicsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==