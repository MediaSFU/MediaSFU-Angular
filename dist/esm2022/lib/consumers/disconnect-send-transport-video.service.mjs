import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC12aWRlby5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9kaXNjb25uZWN0LXNlbmQtdHJhbnNwb3J0LXZpZGVvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUErQjNDLE1BQU0sT0FBTyw0QkFBNEI7SUFDdkM7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBRUgsS0FBSyxDQUFDLDRCQUE0QixDQUFDLEVBQ2pDLFVBQVUsR0FDMEI7UUFDcEMsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUNGLGFBQWEsRUFDYixNQUFNLEVBQ04sT0FBTyxFQUNQLFFBQVEsRUFDUixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLHNCQUFzQixFQUN0QixtQkFBbUIsRUFDbkIsY0FBYyxHQUNmLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFFckMsZ0RBQWdEO1lBQ2hELE1BQU0sYUFBYSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQzVCLG1CQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTFCLGdEQUFnRDtZQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1lBRW5FLHdFQUF3RTtZQUN4RSxJQUFJLE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO2dCQUN4QixzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQzNDLENBQUM7WUFFRCxJQUFJLFdBQVcsRUFBRSxDQUFDO2dCQUNoQixNQUFNLGNBQWMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3ZFLENBQUM7aUJBQU0sQ0FBQztnQkFDTixNQUFNLGNBQWMsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsYUFBYSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1lBQ3hFLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztZQUNwQixpREFBaUQ7WUFDakQsT0FBTyxDQUFDLEdBQUcsQ0FBQywrQ0FBK0MsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUUsQ0FBQztJQUNILENBQUM7dUdBMURVLDRCQUE0QjsyR0FBNUIsNEJBQTRCLGNBRjNCLE1BQU07OzJGQUVQLDRCQUE0QjtrQkFIeEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQcm9kdWNlciB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgUmVvcmRlclN0cmVhbXNUeXBlLCBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMgfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvUGFyYW1ldGVycyBleHRlbmRzIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyB7XG4gIHZpZGVvUHJvZHVjZXI6IFByb2R1Y2VyIHwgbnVsbDtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgbG9ja19zY3JlZW46IGJvb2xlYW47XG4gIHVwZGF0ZU1haW5XaW5kb3c6IGJvb2xlYW47XG4gIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6IChzdGF0ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlVmlkZW9Qcm9kdWNlcjogKHByb2R1Y2VyOiBQcm9kdWNlciB8IG51bGwpID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtc1R5cGU7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvT3B0aW9ucyB7XG4gIHBhcmFtZXRlcnM6IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9QYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvVHlwZSA9IChcbiAgb3B0aW9uczogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb09wdGlvbnMsXG4pID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvIHtcbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgdmlkZW8sIGNsb3NlcyB0aGUgdmlkZW8gcHJvZHVjZXIsIGFuZCB1cGRhdGVzIHRoZSBzdGF0ZS5cbiAgICpcbiAgICogQHBhcmFtIHtEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvT3B0aW9uc30gcGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBkaXNjb25uZWN0aW5nIHRoZSBzZW5kIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtQcm9kdWNlcn0gcGFyYW1ldGVycy52aWRlb1Byb2R1Y2VyIC0gVGhlIHZpZGVvIHByb2R1Y2VyIHRvIGJlIGNsb3NlZC5cbiAgICogQHBhcmFtIHtTb2NrZXR9IHBhcmFtZXRlcnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSBmb3IgY29tbXVuaWNhdGlvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtZXRlcnMuaXNsZXZlbCAtIFRoZSBwYXJ0aWNpcGFudCdzIGxldmVsLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1ldGVycy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtZXRlcnMudXBkYXRlTWFpbldpbmRvdyAtIEZsYWcgdG8gdXBkYXRlIHRoZSBtYWluIHdpbmRvdy5cbiAgICogQHBhcmFtIHtib29sZWFufSBwYXJhbWV0ZXJzLmxvY2tfc2NyZWVuIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSBzY3JlZW4gaXMgbG9ja2VkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93IHN0YXRlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJhbWV0ZXJzLnVwZGF0ZVZpZGVvUHJvZHVjZXIgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpZGVvIHByb2R1Y2VyIHN0YXRlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJhbWV0ZXJzLnJlb3JkZXJTdHJlYW1zIC0gRnVuY3Rpb24gdG8gcmVvcmRlciBzdHJlYW1zLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBkaXNjb25uZWN0aW9uIHByb2Nlc3MgaXMgY29tcGxldGUuXG4gICAqXG4gICAqIEB0aHJvd3Mge0Vycm9yfSAtIFRocm93cyBhbiBlcnJvciBpZiB0aGUgZGlzY29ubmVjdGlvbiBwcm9jZXNzIGZhaWxzLlxuICAgKi9cblxuICBhc3luYyBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvKHtcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQge1xuICAgICAgICB2aWRlb1Byb2R1Y2VyLFxuICAgICAgICBzb2NrZXQsXG4gICAgICAgIGlzbGV2ZWwsXG4gICAgICAgIHJvb21OYW1lLFxuICAgICAgICBsb2NrX3NjcmVlbixcbiAgICAgICAgdXBkYXRlTWFpbldpbmRvdyxcbiAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyxcbiAgICAgICAgdXBkYXRlVmlkZW9Qcm9kdWNlcixcbiAgICAgICAgcmVvcmRlclN0cmVhbXMsXG4gICAgICB9ID0gcGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICAgIC8vIENsb3NlIHRoZSB2aWRlbyBwcm9kdWNlciBhbmQgdXBkYXRlIHRoZSBzdGF0ZVxuICAgICAgYXdhaXQgdmlkZW9Qcm9kdWNlci5jbG9zZSgpO1xuICAgICAgdXBkYXRlVmlkZW9Qcm9kdWNlcihudWxsKTtcblxuICAgICAgLy8gTm90aWZ5IHRoZSBzZXJ2ZXIgYWJvdXQgcGF1c2luZyB2aWRlbyBzaGFyaW5nXG4gICAgICBzb2NrZXQuZW1pdCgncGF1c2VQcm9kdWNlck1lZGlhJywgeyBtZWRpYVRhZzogJ3ZpZGVvJywgcm9vbU5hbWUgfSk7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgVUkgYmFzZWQgb24gdGhlIHBhcnRpY2lwYW50J3MgbGV2ZWwgYW5kIHNjcmVlbiBsb2NrIHN0YXR1c1xuICAgICAgaWYgKGlzbGV2ZWwgPT09ICcyJykge1xuICAgICAgICB1cGRhdGVNYWluV2luZG93ID0gdHJ1ZTtcbiAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh1cGRhdGVNYWluV2luZG93KTtcbiAgICAgIH1cblxuICAgICAgaWYgKGxvY2tfc2NyZWVuKSB7XG4gICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHsgYWRkOiB0cnVlLCBzY3JlZW5DaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoeyBhZGQ6IGZhbHNlLCBzY3JlZW5DaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIC8vIEhhbmRsZSBlcnJvcnMgZHVyaW5nIHRoZSBkaXNjb25uZWN0aW9uIHByb2Nlc3NcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBkaXNjb25uZWN0aW5nIHNlbmQgdHJhbnNwb3J0IGZvciB2aWRlbzonLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==