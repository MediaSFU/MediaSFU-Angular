import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Disconnects the send transport for video, closes the video producer, and updates the state.
 *
 * @param {DisconnectSendTransportVideoOptions} options - The options required for disconnecting the send transport.
 * @param {Object} options.parameters - The parameters for the disconnection.
 * @param {Producer} options.parameters.videoProducer - The video producer to be closed.
 * @param {Socket} options.parameters.socket - The socket instance for communication.
 * @param {string} options.parameters.islevel - The participant's level.
 * @param {string} options.parameters.roomName - The name of the room.
 * @param {boolean} options.parameters.lock_screen - Flag indicating if the screen is locked.
 * @param {boolean} options.parameters.updateMainWindow - Flag to update the main window.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
 * @param {Function} options.parameters.updateVideoProducer - Function to update the video producer state.
 * @param {Function} options.parameters.reorderStreams - Function to reorder streams.
 *
 * @returns {Promise<void>} A promise that resolves when the disconnection process is complete.
 *
 * @throws {Error} Throws an error if the disconnection process fails.
 *
 * @example
 * ```typescript
 * const options = {
 *   parameters: {
 *     videoProducer,
 *     socket,
 *     islevel: '1',
 *     roomName: 'Room 101',
 *     lock_screen: false,
 *     updateMainWindow: false,
 *     updateUpdateMainWindow: (state) => { console.log(updated) },
 *     updateVideoProducer: (producer) => { console.log(updated) },
 *     reorderStreams: (params) => { },
 *     getUpdatedAllParams: () => ({}),
 *   },
 * };
 *
 * disconnectSendTransportVideoService.disconnectSendTransportVideo(options)
 *   .then(() => {
 *     console.log('Video transport disconnected successfully');
 *   })
 *   .catch((error) => {
 *     console.error('Error disconnecting video transport:', error);
 *   });
 * ```
 */
export class DisconnectSendTransportVideo {
    /**
     * Disconnects the send transport for video, closes the video producer, and updates the state.
     *
     * @param {DisconnectSendTransportVideoOptions} parameters - The parameters required for disconnecting the send transport.
     * @param {Producer} parameters.videoProducer - The video producer to be closed.
     * @param {Socket} parameters.socket - The socket instance for communication.
     * @param {string} parameters.islevel - The participant's level.
     * @param {string} parameters.roomName - The name of the room.
     * @param {boolean} parameters.updateMainWindow - Flag to update the main window.
     * @param {boolean} parameters.lock_screen - Flag indicating if the screen is locked.
     * @param {Function} parameters.updateUpdateMainWindow - Function to update the main window state.
     * @param {Function} parameters.updateVideoProducer - Function to update the video producer state.
     * @param {Function} parameters.reorderStreams - Function to reorder streams.
     *
     * @returns {Promise<void>} - A promise that resolves when the disconnection process is complete.
     *
     * @throws {Error} - Throws an error if the disconnection process fails.
     */
    async disconnectSendTransportVideo({ parameters, }) {
        try {
            let { videoProducer, socket, islevel, roomName, lock_screen, updateMainWindow, updateUpdateMainWindow, updateVideoProducer, reorderStreams, } = parameters.getUpdatedAllParams();
            // Close the video producer and update the state
            await videoProducer.close();
            updateVideoProducer(null);
            // Notify the server about pausing video sharing
            socket.emit('pauseProducerMedia', { mediaTag: 'video', roomName });
            // Update the UI based on the participant's level and screen lock status
            if (islevel === '2') {
                updateMainWindow = true;
                updateUpdateMainWindow(updateMainWindow);
            }
            if (lock_screen) {
                await reorderStreams({ add: true, screenChanged: true, parameters });
            }
            else {
                await reorderStreams({ add: false, screenChanged: true, parameters });
            }
        }
        catch (error) {
            // Handle errors during the disconnection process
            console.log('Error disconnecting send transport for video:', error.message);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: DisconnectSendTransportVideo, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: DisconnectSendTransportVideo, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: DisconnectSendTransportVideo, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC12aWRlby5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9kaXNjb25uZWN0LXNlbmQtdHJhbnNwb3J0LXZpZGVvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUE0QnpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRDRztBQU1MLE1BQU0sT0FBTyw0QkFBNEI7SUFDdkM7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBRUgsS0FBSyxDQUFDLDRCQUE0QixDQUFDLEVBQ2pDLFVBQVUsR0FDMEI7UUFDcEMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUNGLGFBQWEsRUFDYixNQUFNLEVBQ04sT0FBTyxFQUNQLFFBQVEsRUFDUixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLHNCQUFzQixFQUN0QixtQkFBbUIsRUFDbkIsY0FBYyxHQUNmLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFFckMsZ0RBQWdEO1lBQ2hELE1BQU0sYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVCLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFCLGdEQUFnRDtZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRW5FLHdFQUF3RTtZQUN4RSxJQUFJLE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFFRCxJQUFJLFdBQVcsRUFBRSxDQUFDO2dCQUNoQixNQUFNLGNBQWMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLENBQUM7aUJBQU0sQ0FBQztnQkFDTixNQUFNLGNBQWMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3hFLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztZQUNwQixpREFBaUQ7WUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUUsQ0FBQztJQUNILENBQUM7dUdBMURVLDRCQUE0QjsyR0FBNUIsNEJBQTRCLGNBRjNCLE1BQU07OzJGQUVQLDRCQUE0QjtrQkFIeEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9kdWNlciB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgUmVvcmRlclN0cmVhbXNUeXBlLCBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMgfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvUGFyYW1ldGVycyBleHRlbmRzIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyB7XG4gIHZpZGVvUHJvZHVjZXI6IFByb2R1Y2VyIHwgbnVsbDtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgbG9ja19zY3JlZW46IGJvb2xlYW47XG4gIHVwZGF0ZU1haW5XaW5kb3c6IGJvb2xlYW47XG4gIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6IChzdGF0ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlVmlkZW9Qcm9kdWNlcjogKHByb2R1Y2VyOiBQcm9kdWNlciB8IG51bGwpID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtc1R5cGU7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvT3B0aW9ucyB7XG4gIHBhcmFtZXRlcnM6IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9QYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvVHlwZSA9IChcbiAgb3B0aW9uczogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb09wdGlvbnMsXG4pID0+IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgdmlkZW8sIGNsb3NlcyB0aGUgdmlkZW8gcHJvZHVjZXIsIGFuZCB1cGRhdGVzIHRoZSBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHtEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIHJlcXVpcmVkIGZvciBkaXNjb25uZWN0aW5nIHRoZSBzZW5kIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgZGlzY29ubmVjdGlvbi5cbiAgICogQHBhcmFtIHtQcm9kdWNlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnZpZGVvUHJvZHVjZXIgLSBUaGUgdmlkZW8gcHJvZHVjZXIgdG8gYmUgY2xvc2VkLlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIGNvbW11bmljYXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaXNsZXZlbCAtIFRoZSBwYXJ0aWNpcGFudCdzIGxldmVsLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2tfc2NyZWVuIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBzY3JlZW4gaXMgbG9ja2VkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVNYWluV2luZG93IC0gRmxhZyB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVXBkYXRlTWFpbldpbmRvdyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cgc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVWaWRlb1Byb2R1Y2VyIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aWRlbyBwcm9kdWNlciBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlb3JkZXJTdHJlYW1zIC0gRnVuY3Rpb24gdG8gcmVvcmRlciBzdHJlYW1zLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZGlzY29ubmVjdGlvbiBwcm9jZXNzIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIHRoZSBkaXNjb25uZWN0aW9uIHByb2Nlc3MgZmFpbHMuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3Qgb3B0aW9ucyA9IHtcbiAgICogICBwYXJhbWV0ZXJzOiB7XG4gICAqICAgICB2aWRlb1Byb2R1Y2VyLFxuICAgKiAgICAgc29ja2V0LFxuICAgKiAgICAgaXNsZXZlbDogJzEnLFxuICAgKiAgICAgcm9vbU5hbWU6ICdSb29tIDEwMScsXG4gICAqICAgICBsb2NrX3NjcmVlbjogZmFsc2UsXG4gICAqICAgICB1cGRhdGVNYWluV2luZG93OiBmYWxzZSxcbiAgICogICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6IChzdGF0ZSkgPT4geyBjb25zb2xlLmxvZyh1cGRhdGVkKSB9LFxuICAgKiAgICAgdXBkYXRlVmlkZW9Qcm9kdWNlcjogKHByb2R1Y2VyKSA9PiB7IGNvbnNvbGUubG9nKHVwZGF0ZWQpIH0sXG4gICAqICAgICByZW9yZGVyU3RyZWFtczogKHBhcmFtcykgPT4geyB9LFxuICAgKiAgICAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gKHt9KSxcbiAgICogICB9LFxuICAgKiB9O1xuICAgKlxuICAgKiBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvU2VydmljZS5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvKG9wdGlvbnMpXG4gICAqICAgLnRoZW4oKCkgPT4ge1xuICAgKiAgICAgY29uc29sZS5sb2coJ1ZpZGVvIHRyYW5zcG9ydCBkaXNjb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAqICAgfSlcbiAgICogICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAqICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkaXNjb25uZWN0aW5nIHZpZGVvIHRyYW5zcG9ydDonLCBlcnJvcik7XG4gICAqICAgfSk7XG4gICAqIGBgYFxuICAgKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyB7XG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIHZpZGVvLCBjbG9zZXMgdGhlIHZpZGVvIHByb2R1Y2VyLCBhbmQgdXBkYXRlcyB0aGUgc3RhdGUuXG4gICAqXG4gICAqIEBwYXJhbSB7RGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb09wdGlvbnN9IHBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3IgZGlzY29ubmVjdGluZyB0aGUgc2VuZCB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7UHJvZHVjZXJ9IHBhcmFtZXRlcnMudmlkZW9Qcm9kdWNlciAtIFRoZSB2aWRlbyBwcm9kdWNlciB0byBiZSBjbG9zZWQuXG4gICAqIEBwYXJhbSB7U29ja2V0fSBwYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIGNvbW11bmljYXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbWV0ZXJzLmlzbGV2ZWwgLSBUaGUgcGFydGljaXBhbnQncyBsZXZlbC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtZXRlcnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbS5cbiAgICogQHBhcmFtIHtib29sZWFufSBwYXJhbWV0ZXJzLnVwZGF0ZU1haW5XaW5kb3cgLSBGbGFnIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyYW1ldGVycy5sb2NrX3NjcmVlbiAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgc2NyZWVuIGlzIGxvY2tlZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyYW1ldGVycy51cGRhdGVVcGRhdGVNYWluV2luZG93IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIHdpbmRvdyBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyYW1ldGVycy51cGRhdGVWaWRlb1Byb2R1Y2VyIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aWRlbyBwcm9kdWNlciBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyYW1ldGVycy5yZW9yZGVyU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHJlb3JkZXIgc3RyZWFtcy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZGlzY29ubmVjdGlvbiBwcm9jZXNzIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gLSBUaHJvd3MgYW4gZXJyb3IgaWYgdGhlIGRpc2Nvbm5lY3Rpb24gcHJvY2VzcyBmYWlscy5cbiAgICovXG5cbiAgYXN5bmMgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyh7XG4gICAgcGFyYW1ldGVycyxcbiAgfTogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IHtcbiAgICAgICAgdmlkZW9Qcm9kdWNlcixcbiAgICAgICAgc29ja2V0LFxuICAgICAgICBpc2xldmVsLFxuICAgICAgICByb29tTmFtZSxcbiAgICAgICAgbG9ja19zY3JlZW4sXG4gICAgICAgIHVwZGF0ZU1haW5XaW5kb3csXG4gICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3csXG4gICAgICAgIHVwZGF0ZVZpZGVvUHJvZHVjZXIsXG4gICAgICAgIHJlb3JkZXJTdHJlYW1zLFxuICAgICAgfSA9IHBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgICAvLyBDbG9zZSB0aGUgdmlkZW8gcHJvZHVjZXIgYW5kIHVwZGF0ZSB0aGUgc3RhdGVcbiAgICAgIGF3YWl0IHZpZGVvUHJvZHVjZXIuY2xvc2UoKTtcbiAgICAgIHVwZGF0ZVZpZGVvUHJvZHVjZXIobnVsbCk7XG5cbiAgICAgIC8vIE5vdGlmeSB0aGUgc2VydmVyIGFib3V0IHBhdXNpbmcgdmlkZW8gc2hhcmluZ1xuICAgICAgc29ja2V0LmVtaXQoJ3BhdXNlUHJvZHVjZXJNZWRpYScsIHsgbWVkaWFUYWc6ICd2aWRlbycsIHJvb21OYW1lIH0pO1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIFVJIGJhc2VkIG9uIHRoZSBwYXJ0aWNpcGFudCdzIGxldmVsIGFuZCBzY3JlZW4gbG9jayBzdGF0dXNcbiAgICAgIGlmIChpc2xldmVsID09PSAnMicpIHtcbiAgICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IHRydWU7XG4gICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChsb2NrX3NjcmVlbikge1xuICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7IGFkZDogdHJ1ZSwgc2NyZWVuQ2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHsgYWRkOiBmYWxzZSwgc2NyZWVuQ2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAvLyBIYW5kbGUgZXJyb3JzIGR1cmluZyB0aGUgZGlzY29ubmVjdGlvbiBwcm9jZXNzXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgZGlzY29ubmVjdGluZyBzZW5kIHRyYW5zcG9ydCBmb3IgdmlkZW86JywgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9XG59XG4iXX0=