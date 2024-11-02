import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Disconnects the send transport for screen sharing.
 *
 * This function closes the screen producer, updates the state, and notifies the server
 * about the closure and pausing of screen sharing.
 *
 * @param {DisconnectSendTransportScreenOptions} options - The options for disconnecting the send transport.
 * @param {Object} options.parameters - The parameters required for disconnection.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {Producer | null} options.parameters.screenProducer - The screen producer to be closed.
 * @param {Socket} options.parameters.socket - The socket connection to notify the server.
 * @param {string} options.parameters.roomName - The name of the room.
 * @param {Function} options.parameters.updateScreenProducer - Function to update the screen producer state.
 *
 * @returns {Promise<void>} A promise that resolves when the disconnection process is complete.
 *
 * @throws {Error} If an error occurs during the disconnection process.
 *
 * @example
 * ```typescript
 * const options = {
 *   parameters: {
 *     screenProducer,
 *     socket,
 *     roomName: 'Room 101',
 *     updateScreenProducer: (producer) => { console.log(updated) },
 *     getUpdatedAllParams: () => ({}),
 *   },
 * };
 *
 * disconnectSendTransportScreenService.disconnectSendTransportScreen(options)
 *   .then(() => {
 *     console.log('Screen transport disconnected successfully');
 *   })
 *   .catch((error) => {
 *     console.error('Error disconnecting screen transport:', error);
 *   });
 * ```
 */
export class DisconnectSendTransportScreen {
    /**
     * Disconnects the send transport for screen sharing.
     *
     * This function closes the screen producer, updates the state, and notifies the server
     * about the closure and pausing of screen sharing.
     *
     * @param {DisconnectSendTransportScreenOptions} options - The options for disconnecting the send transport.
     * @param {Object} options.parameters - The parameters required for disconnection.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {Object} options.parameters.screenProducer - The screen producer to be closed.
     * @param {Object} options.parameters.socket - The socket connection to notify the server.
     * @param {string} options.parameters.roomName - The name of the room.
     * @param {Function} options.parameters.updateScreenProducer - Function to update the screen producer state.
     * @returns {Promise<void>} A promise that resolves when the disconnection process is complete.
     * @throws {Error} If an error occurs during the disconnection process.
     */
    async disconnectSendTransportScreen({ parameters, }) {
        try {
            // Destructure parameters
            let { screenProducer, socket, roomName, updateScreenProducer } = parameters.getUpdatedAllParams();
            // Close the screen producer and update the state
            screenProducer?.close();
            updateScreenProducer(screenProducer);
            // Notify the server about closing the screen producer and pausing screen sharing
            socket.emit('closeScreenProducer');
            socket.emit('pauseProducerMedia', { mediaTag: 'screen', roomName });
        }
        catch (error) {
            // Handle errors during the disconnection process
            console.log('Error disconnecting send transport for screen:', error.message);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: DisconnectSendTransportScreen, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: DisconnectSendTransportScreen, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: DisconnectSendTransportScreen, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1zY3JlZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1zY3JlZW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXNCekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0NHO0FBTUwsTUFBTSxPQUFPLDZCQUE2QjtJQUN4Qzs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxLQUFLLENBQUMsNkJBQTZCLENBQUMsRUFDbEMsVUFBVSxHQUMyQjtRQUNyQyxJQUFJLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsSUFBSSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLEdBQzVELFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBRW5DLGlEQUFpRDtZQUNqRCxjQUFjLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDeEIsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFckMsaUZBQWlGO1lBQ2pGLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1lBQ3BCLGlEQUFpRDtZQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvRSxDQUFDO0lBQ0gsQ0FBQzt1R0FwQ1UsNkJBQTZCOzJHQUE3Qiw2QkFBNkIsY0FGNUIsTUFBTTs7MkZBRVAsNkJBQTZCO2tCQUh6QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2R1Y2VyIH0gZnJvbSAnbWVkaWFzb3VwLWNsaWVudC9saWIvdHlwZXMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzIHtcbiAgc2NyZWVuUHJvZHVjZXI6IFByb2R1Y2VyIHwgbnVsbDtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHVwZGF0ZVNjcmVlblByb2R1Y2VyOiAoc2NyZWVuUHJvZHVjZXI6IFByb2R1Y2VyIHwgbnVsbCkgPT4gdm9pZDtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5PcHRpb25zIHtcbiAgcGFyYW1ldGVyczogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGUgPSAoXG4gIG9wdGlvbnM6IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuT3B0aW9ucyxcbikgPT4gUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogRGlzY29ubmVjdHMgdGhlIHNlbmQgdHJhbnNwb3J0IGZvciBzY3JlZW4gc2hhcmluZy5cbiAgICpcbiAgICogVGhpcyBmdW5jdGlvbiBjbG9zZXMgdGhlIHNjcmVlbiBwcm9kdWNlciwgdXBkYXRlcyB0aGUgc3RhdGUsIGFuZCBub3RpZmllcyB0aGUgc2VydmVyXG4gICAqIGFib3V0IHRoZSBjbG9zdXJlIGFuZCBwYXVzaW5nIG9mIHNjcmVlbiBzaGFyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge0Rpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBkaXNjb25uZWN0aW5nIHRoZSBzZW5kIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBkaXNjb25uZWN0aW9uLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7UHJvZHVjZXIgfCBudWxsfSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuUHJvZHVjZXIgLSBUaGUgc2NyZWVuIHByb2R1Y2VyIHRvIGJlIGNsb3NlZC5cbiAgICogQHBhcmFtIHtTb2NrZXR9IG9wdGlvbnMucGFyYW1ldGVycy5zb2NrZXQgLSBUaGUgc29ja2V0IGNvbm5lY3Rpb24gdG8gbm90aWZ5IHRoZSBzZXJ2ZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNjcmVlblByb2R1Y2VyIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW4gcHJvZHVjZXIgc3RhdGUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBkaXNjb25uZWN0aW9uIHByb2Nlc3MgaXMgY29tcGxldGUuXG4gICAqXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHRoZSBkaXNjb25uZWN0aW9uIHByb2Nlc3MuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3Qgb3B0aW9ucyA9IHtcbiAgICogICBwYXJhbWV0ZXJzOiB7XG4gICAqICAgICBzY3JlZW5Qcm9kdWNlcixcbiAgICogICAgIHNvY2tldCxcbiAgICogICAgIHJvb21OYW1lOiAnUm9vbSAxMDEnLFxuICAgKiAgICAgdXBkYXRlU2NyZWVuUHJvZHVjZXI6IChwcm9kdWNlcikgPT4geyBjb25zb2xlLmxvZyh1cGRhdGVkKSB9LFxuICAgKiAgICAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gKHt9KSxcbiAgICogICB9LFxuICAgKiB9O1xuICAgKlxuICAgKiBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblNlcnZpY2UuZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4ob3B0aW9ucylcbiAgICogICAudGhlbigoKSA9PiB7XG4gICAqICAgICBjb25zb2xlLmxvZygnU2NyZWVuIHRyYW5zcG9ydCBkaXNjb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAqICAgfSlcbiAgICogICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAqICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBkaXNjb25uZWN0aW5nIHNjcmVlbiB0cmFuc3BvcnQ6JywgZXJyb3IpO1xuICAgKiAgIH0pO1xuICAgKiBgYGBcbiAgICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIHtcbiAgLyoqXG4gICAqIERpc2Nvbm5lY3RzIHRoZSBzZW5kIHRyYW5zcG9ydCBmb3Igc2NyZWVuIHNoYXJpbmcuXG4gICAqXG4gICAqIFRoaXMgZnVuY3Rpb24gY2xvc2VzIHRoZSBzY3JlZW4gcHJvZHVjZXIsIHVwZGF0ZXMgdGhlIHN0YXRlLCBhbmQgbm90aWZpZXMgdGhlIHNlcnZlclxuICAgKiBhYm91dCB0aGUgY2xvc3VyZSBhbmQgcGF1c2luZyBvZiBzY3JlZW4gc2hhcmluZy5cbiAgICpcbiAgICogQHBhcmFtIHtEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbk9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgZGlzY29ubmVjdGluZyB0aGUgc2VuZCB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3IgZGlzY29ubmVjdGlvbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMgLSBGdW5jdGlvbiB0byBnZXQgdXBkYXRlZCBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNjcmVlblByb2R1Y2VyIC0gVGhlIHNjcmVlbiBwcm9kdWNlciB0byBiZSBjbG9zZWQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMuc29ja2V0IC0gVGhlIHNvY2tldCBjb25uZWN0aW9uIHRvIG5vdGlmeSB0aGUgc2VydmVyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTY3JlZW5Qcm9kdWNlciAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2NyZWVuIHByb2R1Y2VyIHN0YXRlLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZGlzY29ubmVjdGlvbiBwcm9jZXNzIGlzIGNvbXBsZXRlLlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgYW4gZXJyb3Igb2NjdXJzIGR1cmluZyB0aGUgZGlzY29ubmVjdGlvbiBwcm9jZXNzLlxuICAgKi9cbiAgYXN5bmMgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4oe1xuICAgIHBhcmFtZXRlcnMsXG4gIH06IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBEZXN0cnVjdHVyZSBwYXJhbWV0ZXJzXG4gICAgICBsZXQgeyBzY3JlZW5Qcm9kdWNlciwgc29ja2V0LCByb29tTmFtZSwgdXBkYXRlU2NyZWVuUHJvZHVjZXIgfSA9XG4gICAgICAgIHBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgICAvLyBDbG9zZSB0aGUgc2NyZWVuIHByb2R1Y2VyIGFuZCB1cGRhdGUgdGhlIHN0YXRlXG4gICAgICBzY3JlZW5Qcm9kdWNlcj8uY2xvc2UoKTtcbiAgICAgIHVwZGF0ZVNjcmVlblByb2R1Y2VyKHNjcmVlblByb2R1Y2VyKTtcblxuICAgICAgLy8gTm90aWZ5IHRoZSBzZXJ2ZXIgYWJvdXQgY2xvc2luZyB0aGUgc2NyZWVuIHByb2R1Y2VyIGFuZCBwYXVzaW5nIHNjcmVlbiBzaGFyaW5nXG4gICAgICBzb2NrZXQuZW1pdCgnY2xvc2VTY3JlZW5Qcm9kdWNlcicpO1xuICAgICAgc29ja2V0LmVtaXQoJ3BhdXNlUHJvZHVjZXJNZWRpYScsIHsgbWVkaWFUYWc6ICdzY3JlZW4nLCByb29tTmFtZSB9KTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAvLyBIYW5kbGUgZXJyb3JzIGR1cmluZyB0aGUgZGlzY29ubmVjdGlvbiBwcm9jZXNzXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgZGlzY29ubmVjdGluZyBzZW5kIHRyYW5zcG9ydCBmb3Igc2NyZWVuOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgIH1cbiAgfVxufVxuIl19