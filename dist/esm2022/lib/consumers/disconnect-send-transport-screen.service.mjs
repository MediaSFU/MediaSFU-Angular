import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1zY3JlZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvZGlzY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1zY3JlZW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXdCM0MsTUFBTSxPQUFPLDZCQUE2QjtJQUN4Qzs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxLQUFLLENBQUMsNkJBQTZCLENBQUMsRUFDbEMsVUFBVSxHQUMyQjtRQUNyQyxJQUFJLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsSUFBSSxFQUFFLGNBQWMsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLG9CQUFvQixFQUFFLEdBQzVELFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBRW5DLGlEQUFpRDtZQUNqRCxjQUFjLEVBQUUsS0FBSyxFQUFFLENBQUM7WUFDeEIsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFckMsaUZBQWlGO1lBQ2pGLE1BQU0sQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQ3RFLENBQUM7UUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1lBQ3BCLGlEQUFpRDtZQUNqRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdEQUFnRCxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMvRSxDQUFDO0lBQ0gsQ0FBQzt1R0FwQ1UsNkJBQTZCOzJHQUE3Qiw2QkFBNkIsY0FGNUIsTUFBTTs7MkZBRVAsNkJBQTZCO2tCQUh6QyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByb2R1Y2VyIH0gZnJvbSAnbWVkaWFzb3VwLWNsaWVudC9saWIvdHlwZXMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzIHtcbiAgc2NyZWVuUHJvZHVjZXI6IFByb2R1Y2VyIHwgbnVsbDtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHVwZGF0ZVNjcmVlblByb2R1Y2VyOiAoc2NyZWVuUHJvZHVjZXI6IFByb2R1Y2VyIHwgbnVsbCkgPT4gdm9pZDtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cbmV4cG9ydCBpbnRlcmZhY2UgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5PcHRpb25zIHtcbiAgcGFyYW1ldGVyczogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGUgPSAoXG4gIG9wdGlvbnM6IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuT3B0aW9ucyxcbikgPT4gUHJvbWlzZTx2b2lkPjtcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbiB7XG4gIC8qKlxuICAgKiBEaXNjb25uZWN0cyB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIHNjcmVlbiBzaGFyaW5nLlxuICAgKlxuICAgKiBUaGlzIGZ1bmN0aW9uIGNsb3NlcyB0aGUgc2NyZWVuIHByb2R1Y2VyLCB1cGRhdGVzIHRoZSBzdGF0ZSwgYW5kIG5vdGlmaWVzIHRoZSBzZXJ2ZXJcbiAgICogYWJvdXQgdGhlIGNsb3N1cmUgYW5kIHBhdXNpbmcgb2Ygc2NyZWVuIHNoYXJpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7RGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5PcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGRpc2Nvbm5lY3RpbmcgdGhlIHNlbmQgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIGRpc2Nvbm5lY3Rpb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zIC0gRnVuY3Rpb24gdG8gZ2V0IHVwZGF0ZWQgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycy5zY3JlZW5Qcm9kdWNlciAtIFRoZSBzY3JlZW4gcHJvZHVjZXIgdG8gYmUgY2xvc2VkLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgY29ubmVjdGlvbiB0byBub3RpZnkgdGhlIHNlcnZlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU2NyZWVuUHJvZHVjZXIgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHNjcmVlbiBwcm9kdWNlciBzdGF0ZS5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGRpc2Nvbm5lY3Rpb24gcHJvY2VzcyBpcyBjb21wbGV0ZS5cbiAgICogQHRocm93cyB7RXJyb3J9IElmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgdGhlIGRpc2Nvbm5lY3Rpb24gcHJvY2Vzcy5cbiAgICovXG4gIGFzeW5jIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuKHtcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbk9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgLy8gRGVzdHJ1Y3R1cmUgcGFyYW1ldGVyc1xuICAgICAgbGV0IHsgc2NyZWVuUHJvZHVjZXIsIHNvY2tldCwgcm9vbU5hbWUsIHVwZGF0ZVNjcmVlblByb2R1Y2VyIH0gPVxuICAgICAgICBwYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgICAgLy8gQ2xvc2UgdGhlIHNjcmVlbiBwcm9kdWNlciBhbmQgdXBkYXRlIHRoZSBzdGF0ZVxuICAgICAgc2NyZWVuUHJvZHVjZXI/LmNsb3NlKCk7XG4gICAgICB1cGRhdGVTY3JlZW5Qcm9kdWNlcihzY3JlZW5Qcm9kdWNlcik7XG5cbiAgICAgIC8vIE5vdGlmeSB0aGUgc2VydmVyIGFib3V0IGNsb3NpbmcgdGhlIHNjcmVlbiBwcm9kdWNlciBhbmQgcGF1c2luZyBzY3JlZW4gc2hhcmluZ1xuICAgICAgc29ja2V0LmVtaXQoJ2Nsb3NlU2NyZWVuUHJvZHVjZXInKTtcbiAgICAgIHNvY2tldC5lbWl0KCdwYXVzZVByb2R1Y2VyTWVkaWEnLCB7IG1lZGlhVGFnOiAnc2NyZWVuJywgcm9vbU5hbWUgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgLy8gSGFuZGxlIGVycm9ycyBkdXJpbmcgdGhlIGRpc2Nvbm5lY3Rpb24gcHJvY2Vzc1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGRpc2Nvbm5lY3Rpbmcgc2VuZCB0cmFuc3BvcnQgZm9yIHNjcmVlbjonLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==