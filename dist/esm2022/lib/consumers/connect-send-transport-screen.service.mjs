import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Connects and sets up the screen sharing transport for sending video streams.
 *
 * @param {ConnectSendTransportScreenOptions} options - The options for connecting the screen transport.
 * @param {MediaStream} options.stream - The media stream containing the screen video track.
 * @param {ConnectSendTransportScreenParameters} options.parameters - The parameters required for setting up the transport.
 * @param {Producer} options.parameters.screenProducer - The screen producer object.
 * @param {Device} options.parameters.device - The device object containing RTP capabilities.
 * @param {ProducerOptions} options.parameters.screenParams - The parameters for producing the screen share.
 * @param {Transport} options.parameters.producerTransport - The transport object used for producing the screen share.
 * @param {Function} options.parameters.updateScreenProducer - Function to update the screen producer object.
 * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport object.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to fetch updated device information.
 *
 * @returns {Promise<void>} A promise that resolves when the screen transport is successfully connected and set up.
 *
 * @throws Will throw an error if the connection or setup process fails.
 *
 * @example
 * ```typescript
 * const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
 * const parameters = {
 *   screenProducer: null,
 *   device: device, // Assume 'device' is initialized and ready
 *   screenParams: { codec: 'vp9' },
 *   producerTransport: transport, // Assume 'transport' is initialized
 *   updateScreenProducer: (producer) => { console.log(updated) },
 *   updateProducerTransport: (transport) => { console.log(updated) },
 *   getUpdatedAllParams: () => {  },
 * };
 *
 * connectSendTransportScreen({ stream, parameters })
 *   .then(() => {
 *     console.log('Screen transport connected successfully');
 *   })
 *   .catch((error) => {
 *     console.error('Error connecting screen transport:', error);
 *   });
 * ```
 */
export class ConnectSendTransportScreen {
    /**
     * Connects and sets up the screen sharing transport for sending video streams.
     *
     * @param {Object} options - The options for connecting the screen transport.
     * @param {MediaStream} options.stream - The media stream containing the screen video track.
     * @param {ConnectSendTransportScreenOptions} options.parameters - The parameters required for setting up the transport.
     * @param {Producer} options.parameters.screenProducer - The screen producer object.
     * @param {Device} options.parameters.device - The device object containing RTP capabilities.
     * @param {Promise<ScreenParams>} options.parameters.screenParams - A promise resolving to screen share parameters.
     * @param {Transport} options.parameters.producerTransport - The transport object used for producing the screen share.
     * @param {Params} options.parameters.params - The parameters for producing the screen share.
     * @param {Function} options.parameters.updateScreenProducer - Function to update the screen producer object.
     * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport object.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to fetch updated device information.
     *
     * @returns {Promise<void>} A promise that resolves when the screen transport is successfully connected and set up.
     *
     * @throws Will throw an error if the connection or setup process fails.
     */
    async connectSendTransportScreen({ stream, parameters, }) {
        try {
            let { screenProducer, device, screenParams, producerTransport, params, updateScreenProducer, updateProducerTransport, } = parameters;
            device = parameters.getUpdatedAllParams().device;
            // Connect the send transport for screen share by producing screen video data
            params = screenParams;
            // Find VP9 codec for screen share
            if (!device || !device.rtpCapabilities || !device.rtpCapabilities.codecs) {
                throw new Error('Device or its RTP capabilities are not available.');
            }
            let codec = device.rtpCapabilities.codecs.find((codec) => codec.mimeType.toLowerCase() === 'video/vp9' && codec.kind === 'video');
            // Produce screen share data using the producer transport
            if (!producerTransport) {
                throw new Error('Producer transport is not available.');
            }
            screenProducer = await producerTransport.produce({
                track: stream?.getVideoTracks()[0],
                ...params,
                codec: codec,
                appData: { mediaTag: 'screen-video' },
            });
            // Update the screen producer and producer transport objects
            updateScreenProducer(screenProducer);
            updateProducerTransport(producerTransport);
        }
        catch (error) {
            console.log('connectSendTransportScreen error', error);
            throw error;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportScreen, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportScreen, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportScreen, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1zY3JlZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1zY3JlZW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXlCekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQUtMLE1BQU0sT0FBTywwQkFBMEI7SUFDckM7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILEtBQUssQ0FBQywwQkFBMEIsQ0FBQyxFQUMvQixNQUFNLEVBQ04sVUFBVSxHQUN3QjtRQUNsQyxJQUFJLENBQUM7WUFDSCxJQUFJLEVBQ0YsY0FBYyxFQUNkLE1BQU0sRUFDTixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLE1BQU0sRUFDTixvQkFBb0IsRUFDcEIsdUJBQXVCLEdBQ3hCLEdBQUcsVUFBVSxDQUFDO1lBRWYsTUFBTSxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNqRCw2RUFBNkU7WUFDN0UsTUFBTSxHQUFHLFlBQVksQ0FBQztZQUV0QixrQ0FBa0M7WUFDbEMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLElBQUksQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUN6RSxNQUFNLElBQUksS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUM7WUFDdkUsQ0FBQztZQUVELElBQUksS0FBSyxHQUFHLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDNUMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLEtBQUssV0FBVyxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUN2RixDQUFDO1lBRUYseURBQXlEO1lBQ3pELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN2QixNQUFNLElBQUksS0FBSyxDQUFDLHNDQUFzQyxDQUFDLENBQUM7WUFDMUQsQ0FBQztZQUVELGNBQWMsR0FBRyxNQUFNLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztnQkFDL0MsS0FBSyxFQUFFLE1BQU0sRUFBRSxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEdBQUcsTUFBTTtnQkFDVCxLQUFLLEVBQUUsS0FBSztnQkFDWixPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFFO2FBQ3RDLENBQUMsQ0FBQztZQUVILDREQUE0RDtZQUM1RCxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUNyQyx1QkFBdUIsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1FBQzdDLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2RCxNQUFNLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO3VHQW5FVSwwQkFBMEI7MkdBQTFCLDBCQUEwQixjQUZ6QixNQUFNOzsyRkFFUCwwQkFBMEI7a0JBSHRDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNwb3J0LCBQcm9kdWNlciwgRGV2aWNlLCBQcm9kdWNlck9wdGlvbnMgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuUGFyYW1ldGVycyB7XG4gIHNjcmVlblByb2R1Y2VyOiBQcm9kdWNlciB8IG51bGw7XG4gIGRldmljZTogRGV2aWNlIHwgbnVsbDtcbiAgc2NyZWVuUGFyYW1zOiBQcm9kdWNlck9wdGlvbnM7XG4gIHByb2R1Y2VyVHJhbnNwb3J0OiBUcmFuc3BvcnQgfCBudWxsO1xuICBwYXJhbXM6IFByb2R1Y2VyT3B0aW9ucztcbiAgdXBkYXRlU2NyZWVuUHJvZHVjZXI6IChwcm9kdWNlcjogUHJvZHVjZXIgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVQcm9kdWNlclRyYW5zcG9ydDogKHRyYW5zcG9ydDogVHJhbnNwb3J0IHwgbnVsbCkgPT4gdm9pZDtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTsgLy8gRXh0ZW5kYWJsZSBmb3IgYWRkaXRpb25hbCBwYXJhbWV0ZXJzXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5PcHRpb25zIHtcbiAgc3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIHBhcmFtZXRlcnM6IENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5UeXBlID0gKFxuICBvcHRpb25zOiBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbk9wdGlvbnMsXG4pID0+IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIENvbm5lY3RzIGFuZCBzZXRzIHVwIHRoZSBzY3JlZW4gc2hhcmluZyB0cmFuc3BvcnQgZm9yIHNlbmRpbmcgdmlkZW8gc3RyZWFtcy5cbiAgICpcbiAgICogQHBhcmFtIHtDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbk9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29ubmVjdGluZyB0aGUgc2NyZWVuIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gb3B0aW9ucy5zdHJlYW0gLSBUaGUgbWVkaWEgc3RyZWFtIGNvbnRhaW5pbmcgdGhlIHNjcmVlbiB2aWRlbyB0cmFjay5cbiAgICogQHBhcmFtIHtDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBzZXR0aW5nIHVwIHRoZSB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7UHJvZHVjZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5zY3JlZW5Qcm9kdWNlciAtIFRoZSBzY3JlZW4gcHJvZHVjZXIgb2JqZWN0LlxuICAgKiBAcGFyYW0ge0RldmljZX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmRldmljZSAtIFRoZSBkZXZpY2Ugb2JqZWN0IGNvbnRhaW5pbmcgUlRQIGNhcGFiaWxpdGllcy5cbiAgICogQHBhcmFtIHtQcm9kdWNlck9wdGlvbnN9IG9wdGlvbnMucGFyYW1ldGVycy5zY3JlZW5QYXJhbXMgLSBUaGUgcGFyYW1ldGVycyBmb3IgcHJvZHVjaW5nIHRoZSBzY3JlZW4gc2hhcmUuXG4gICAqIEBwYXJhbSB7VHJhbnNwb3J0fSBvcHRpb25zLnBhcmFtZXRlcnMucHJvZHVjZXJUcmFuc3BvcnQgLSBUaGUgdHJhbnNwb3J0IG9iamVjdCB1c2VkIGZvciBwcm9kdWNpbmcgdGhlIHNjcmVlbiBzaGFyZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNjcmVlblByb2R1Y2VyIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW4gcHJvZHVjZXIgb2JqZWN0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHByb2R1Y2VyIHRyYW5zcG9ydCBvYmplY3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zIC0gRnVuY3Rpb24gdG8gZmV0Y2ggdXBkYXRlZCBkZXZpY2UgaW5mb3JtYXRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzY3JlZW4gdHJhbnNwb3J0IGlzIHN1Y2Nlc3NmdWxseSBjb25uZWN0ZWQgYW5kIHNldCB1cC5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBjb25uZWN0aW9uIG9yIHNldHVwIHByb2Nlc3MgZmFpbHMuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3Qgc3RyZWFtID0gYXdhaXQgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXREaXNwbGF5TWVkaWEoeyB2aWRlbzogdHJ1ZSB9KTtcbiAgICogY29uc3QgcGFyYW1ldGVycyA9IHtcbiAgICogICBzY3JlZW5Qcm9kdWNlcjogbnVsbCxcbiAgICogICBkZXZpY2U6IGRldmljZSwgLy8gQXNzdW1lICdkZXZpY2UnIGlzIGluaXRpYWxpemVkIGFuZCByZWFkeVxuICAgKiAgIHNjcmVlblBhcmFtczogeyBjb2RlYzogJ3ZwOScgfSxcbiAgICogICBwcm9kdWNlclRyYW5zcG9ydDogdHJhbnNwb3J0LCAvLyBBc3N1bWUgJ3RyYW5zcG9ydCcgaXMgaW5pdGlhbGl6ZWRcbiAgICogICB1cGRhdGVTY3JlZW5Qcm9kdWNlcjogKHByb2R1Y2VyKSA9PiB7IGNvbnNvbGUubG9nKHVwZGF0ZWQpIH0sXG4gICAqICAgdXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQ6ICh0cmFuc3BvcnQpID0+IHsgY29uc29sZS5sb2codXBkYXRlZCkgfSxcbiAgICogICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiB7ICB9LFxuICAgKiB9O1xuICAgKlxuICAgKiBjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7IHN0cmVhbSwgcGFyYW1ldGVycyB9KVxuICAgKiAgIC50aGVuKCgpID0+IHtcbiAgICogICAgIGNvbnNvbGUubG9nKCdTY3JlZW4gdHJhbnNwb3J0IGNvbm5lY3RlZCBzdWNjZXNzZnVsbHknKTtcbiAgICogICB9KVxuICAgKiAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICogICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNvbm5lY3Rpbmcgc2NyZWVuIHRyYW5zcG9ydDonLCBlcnJvcik7XG4gICAqICAgfSk7XG4gICAqIGBgYFxuICAgKi9cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIHtcbiAgLyoqXG4gICAqIENvbm5lY3RzIGFuZCBzZXRzIHVwIHRoZSBzY3JlZW4gc2hhcmluZyB0cmFuc3BvcnQgZm9yIHNlbmRpbmcgdmlkZW8gc3RyZWFtcy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29ubmVjdGluZyB0aGUgc2NyZWVuIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gb3B0aW9ucy5zdHJlYW0gLSBUaGUgbWVkaWEgc3RyZWFtIGNvbnRhaW5pbmcgdGhlIHNjcmVlbiB2aWRlbyB0cmFjay5cbiAgICogQHBhcmFtIHtDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbk9wdGlvbnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBzZXR0aW5nIHVwIHRoZSB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7UHJvZHVjZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5zY3JlZW5Qcm9kdWNlciAtIFRoZSBzY3JlZW4gcHJvZHVjZXIgb2JqZWN0LlxuICAgKiBAcGFyYW0ge0RldmljZX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmRldmljZSAtIFRoZSBkZXZpY2Ugb2JqZWN0IGNvbnRhaW5pbmcgUlRQIGNhcGFiaWxpdGllcy5cbiAgICogQHBhcmFtIHtQcm9taXNlPFNjcmVlblBhcmFtcz59IG9wdGlvbnMucGFyYW1ldGVycy5zY3JlZW5QYXJhbXMgLSBBIHByb21pc2UgcmVzb2x2aW5nIHRvIHNjcmVlbiBzaGFyZSBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge1RyYW5zcG9ydH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnByb2R1Y2VyVHJhbnNwb3J0IC0gVGhlIHRyYW5zcG9ydCBvYmplY3QgdXNlZCBmb3IgcHJvZHVjaW5nIHRoZSBzY3JlZW4gc2hhcmUuXG4gICAqIEBwYXJhbSB7UGFyYW1zfSBvcHRpb25zLnBhcmFtZXRlcnMucGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHByb2R1Y2luZyB0aGUgc2NyZWVuIHNoYXJlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU2NyZWVuUHJvZHVjZXIgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHNjcmVlbiBwcm9kdWNlciBvYmplY3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVQcm9kdWNlclRyYW5zcG9ydCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcHJvZHVjZXIgdHJhbnNwb3J0IG9iamVjdC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMgLSBGdW5jdGlvbiB0byBmZXRjaCB1cGRhdGVkIGRldmljZSBpbmZvcm1hdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNjcmVlbiB0cmFuc3BvcnQgaXMgc3VjY2Vzc2Z1bGx5IGNvbm5lY3RlZCBhbmQgc2V0IHVwLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGNvbm5lY3Rpb24gb3Igc2V0dXAgcHJvY2VzcyBmYWlscy5cbiAgICovXG4gIGFzeW5jIGNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuKHtcbiAgICBzdHJlYW0sXG4gICAgcGFyYW1ldGVycyxcbiAgfTogQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB7XG4gICAgICAgIHNjcmVlblByb2R1Y2VyLFxuICAgICAgICBkZXZpY2UsXG4gICAgICAgIHNjcmVlblBhcmFtcyxcbiAgICAgICAgcHJvZHVjZXJUcmFuc3BvcnQsXG4gICAgICAgIHBhcmFtcyxcbiAgICAgICAgdXBkYXRlU2NyZWVuUHJvZHVjZXIsXG4gICAgICAgIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0LFxuICAgICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIGRldmljZSA9IHBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpLmRldmljZTtcbiAgICAgIC8vIENvbm5lY3QgdGhlIHNlbmQgdHJhbnNwb3J0IGZvciBzY3JlZW4gc2hhcmUgYnkgcHJvZHVjaW5nIHNjcmVlbiB2aWRlbyBkYXRhXG4gICAgICBwYXJhbXMgPSBzY3JlZW5QYXJhbXM7XG5cbiAgICAgIC8vIEZpbmQgVlA5IGNvZGVjIGZvciBzY3JlZW4gc2hhcmVcbiAgICAgIGlmICghZGV2aWNlIHx8ICFkZXZpY2UucnRwQ2FwYWJpbGl0aWVzIHx8ICFkZXZpY2UucnRwQ2FwYWJpbGl0aWVzLmNvZGVjcykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RldmljZSBvciBpdHMgUlRQIGNhcGFiaWxpdGllcyBhcmUgbm90IGF2YWlsYWJsZS4nKTtcbiAgICAgIH1cblxuICAgICAgbGV0IGNvZGVjID0gZGV2aWNlLnJ0cENhcGFiaWxpdGllcy5jb2RlY3MuZmluZChcbiAgICAgICAgKGNvZGVjOiBhbnkpID0+IGNvZGVjLm1pbWVUeXBlLnRvTG93ZXJDYXNlKCkgPT09ICd2aWRlby92cDknICYmIGNvZGVjLmtpbmQgPT09ICd2aWRlbycsXG4gICAgICApO1xuXG4gICAgICAvLyBQcm9kdWNlIHNjcmVlbiBzaGFyZSBkYXRhIHVzaW5nIHRoZSBwcm9kdWNlciB0cmFuc3BvcnRcbiAgICAgIGlmICghcHJvZHVjZXJUcmFuc3BvcnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9kdWNlciB0cmFuc3BvcnQgaXMgbm90IGF2YWlsYWJsZS4nKTtcbiAgICAgIH1cblxuICAgICAgc2NyZWVuUHJvZHVjZXIgPSBhd2FpdCBwcm9kdWNlclRyYW5zcG9ydC5wcm9kdWNlKHtcbiAgICAgICAgdHJhY2s6IHN0cmVhbT8uZ2V0VmlkZW9UcmFja3MoKVswXSxcbiAgICAgICAgLi4ucGFyYW1zLFxuICAgICAgICBjb2RlYzogY29kZWMsXG4gICAgICAgIGFwcERhdGE6IHsgbWVkaWFUYWc6ICdzY3JlZW4tdmlkZW8nIH0sXG4gICAgICB9KTtcblxuICAgICAgLy8gVXBkYXRlIHRoZSBzY3JlZW4gcHJvZHVjZXIgYW5kIHByb2R1Y2VyIHRyYW5zcG9ydCBvYmplY3RzXG4gICAgICB1cGRhdGVTY3JlZW5Qcm9kdWNlcihzY3JlZW5Qcm9kdWNlcik7XG4gICAgICB1cGRhdGVQcm9kdWNlclRyYW5zcG9ydChwcm9kdWNlclRyYW5zcG9ydCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbiBlcnJvcicsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufVxuIl19