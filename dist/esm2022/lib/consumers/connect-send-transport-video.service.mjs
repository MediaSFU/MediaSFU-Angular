import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Connects the send transport for video by producing video data and updates the relevant states.
 *
 * @param {ConnectSendTransportVideoOptions} options - The options for connecting the send transport for video.
 * @param {ProducerOptions} options.videoParams - The parameters for producing video data.
 * @param {ConnectSendTransportVideoParameters} options.parameters - The parameters for updating the state.
 * @param {Producer} options.parameters.videoProducer - The video producer instance.
 * @param {Transport} options.parameters.producerTransport - The transport instance used for producing video.
 * @param {string} options.parameters.islevel - The connection level.
 * @param {boolean} options.parameters.updateMainWindow - The state of the main window update.
 * @param {Function} options.parameters.updateVideoProducer - Function to update the video producer.
 * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
 *
 * @returns {Promise<void>} A promise that resolves when the send transport for video is connected.
 *
 * @throws Will throw an error if the connection fails.
 *
 * @example
 * ```typescript
 * const videoParams = {
 *   codec: 'vp8',
 *   // Other producer options...
 * };
 *
 * const parameters = {
 *   videoProducer: null,
 *   producerTransport: transport, // Assume 'transport' is initialized and ready
 *   islevel: '1',
 *   updateMainWindow: false,
 *   updateVideoProducer: (producer) => { console.log(updated) },
 *   updateProducerTransport: (transport) => { console.log(updated) },
 *   updateUpdateMainWindow: (state) => { console.log(updated) },
 * };
 *
 * connectSendTransportVideo({ videoParams, parameters })
 *   .then(() => {
 *     console.log('Video transport connected successfully');
 *   })
 *   .catch((error) => {
 *     console.error('Error connecting video transport:', error);
 *   });
 * ```
 */
export class ConnectSendTransportVideo {
    /**
     * Connects the send transport for video by producing video data and updates the relevant states.
     *
     * @param {ConnectSendTransportVideoOptions} options - The options for connecting the send transport for video.
     * @param {Object} options.videoParams - The parameters for producing video data.
     * @param {Object} options.parameters - The parameters for updating the state.
     * @param {Producer} options.parameters.videoProducer - The video producer instance.
     * @param {Transport} options.parameters.producerTransport - The transport instance used for producing video.
     * @param {string} options.parameters.islevel - The connection level.
     * @param {boolean} options.parameters.updateMainWindow - The state of the main window update.
     * @param {Function} options.parameters.updateVideoProducer - Function to update the video producer.
     * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
     *
     * @returns {Promise<void>} A promise that resolves when the send transport for video is connected.
     *
     * @throws Will throw an error if the connection fails.
     */
    connectSendTransportVideo = async ({ videoParams, parameters, }) => {
        try {
            let { videoProducer, producerTransport, islevel, updateMainWindow, updateVideoProducer, updateProducerTransport, updateUpdateMainWindow, } = parameters;
            // Connect the send transport for video by producing video data
            if (producerTransport) {
                videoProducer = await producerTransport.produce(videoParams);
            }
            else {
                throw new Error('Producer transport is null');
            }
            // Update main window state based on the video connection level
            if (islevel === '2') {
                updateMainWindow = true;
            }
            // Update the video producer and producer transport objects
            updateVideoProducer(videoProducer);
            updateProducerTransport(producerTransport);
            updateUpdateMainWindow(updateMainWindow);
        }
        catch (error) {
            console.log('connectSendTransportVideo error', error);
            throw error;
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportVideo, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportVideo, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportVideo, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1zZW5kLXRyYW5zcG9ydC12aWRlby5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LXZpZGVvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF3QnpDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkNHO0FBS0wsTUFBTSxPQUFPLHlCQUF5QjtJQUNwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCx5QkFBeUIsR0FBRyxLQUFLLEVBQUUsRUFDakMsV0FBVyxFQUNYLFVBQVUsR0FDdUIsRUFBaUIsRUFBRTtRQUNwRCxJQUFJLENBQUM7WUFDSCxJQUFJLEVBQ0YsYUFBYSxFQUNiLGlCQUFpQixFQUNqQixPQUFPLEVBQ1AsZ0JBQWdCLEVBQ2hCLG1CQUFtQixFQUNuQix1QkFBdUIsRUFDdkIsc0JBQXNCLEdBQ3ZCLEdBQUcsVUFBVSxDQUFDO1lBRWYsK0RBQStEO1lBQy9ELElBQUksaUJBQWlCLEVBQUUsQ0FBQztnQkFDdEIsYUFBYSxHQUFHLE1BQU0saUJBQWlCLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQy9ELENBQUM7aUJBQU0sQ0FBQztnQkFDTixNQUFNLElBQUksS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7WUFDaEQsQ0FBQztZQUVELCtEQUErRDtZQUMvRCxJQUFJLE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQztnQkFDcEIsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDO1lBQzFCLENBQUM7WUFFRCwyREFBMkQ7WUFDM0QsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbkMsdUJBQXVCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUMzQyxzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQ0FBaUMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0RCxNQUFNLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBdERTLHlCQUF5QjsyR0FBekIseUJBQXlCLGNBRnhCLE1BQU07OzJGQUVQLHlCQUF5QjtrQkFIckMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEZXZpY2UsIFByb2R1Y2VyLCBQcm9kdWNlck9wdGlvbnMsIFRyYW5zcG9ydCB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1BhcmFtZXRlcnMge1xuICB2aWRlb1Byb2R1Y2VyOiBQcm9kdWNlciB8IG51bGw7XG4gIGRldmljZTogRGV2aWNlIHwgbnVsbDtcbiAgcHJvZHVjZXJUcmFuc3BvcnQ6IFRyYW5zcG9ydCB8IG51bGw7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgdXBkYXRlTWFpbldpbmRvdzogYm9vbGVhbjtcbiAgdXBkYXRlVmlkZW9Qcm9kdWNlcjogKHByb2R1Y2VyOiBQcm9kdWNlciB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0OiAodHJhbnNwb3J0OiBUcmFuc3BvcnQgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVVcGRhdGVNYWluV2luZG93OiAoc3RhdGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIFtrZXk6IHN0cmluZ106IGFueTsgLy8gRXh0ZW5kYWJsZSBmb3IgYWRkaXRpb25hbCBwYXJhbWV0ZXJzXG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb09wdGlvbnMge1xuICB2aWRlb1BhcmFtczogUHJvZHVjZXJPcHRpb25zO1xuICBwYXJhbWV0ZXJzOiBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1R5cGUgPSAoXG4gIG9wdGlvbnM6IENvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9PcHRpb25zLFxuKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBDb25uZWN0cyB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIHZpZGVvIGJ5IHByb2R1Y2luZyB2aWRlbyBkYXRhIGFuZCB1cGRhdGVzIHRoZSByZWxldmFudCBzdGF0ZXMuXG4gICAqXG4gICAqIEBwYXJhbSB7Q29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29ubmVjdGluZyB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIHZpZGVvLlxuICAgKiBAcGFyYW0ge1Byb2R1Y2VyT3B0aW9uc30gb3B0aW9ucy52aWRlb1BhcmFtcyAtIFRoZSBwYXJhbWV0ZXJzIGZvciBwcm9kdWNpbmcgdmlkZW8gZGF0YS5cbiAgICogQHBhcmFtIHtDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvUGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHVwZGF0aW5nIHRoZSBzdGF0ZS5cbiAgICogQHBhcmFtIHtQcm9kdWNlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnZpZGVvUHJvZHVjZXIgLSBUaGUgdmlkZW8gcHJvZHVjZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7VHJhbnNwb3J0fSBvcHRpb25zLnBhcmFtZXRlcnMucHJvZHVjZXJUcmFuc3BvcnQgLSBUaGUgdHJhbnNwb3J0IGluc3RhbmNlIHVzZWQgZm9yIHByb2R1Y2luZyB2aWRlby5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5pc2xldmVsIC0gVGhlIGNvbm5lY3Rpb24gbGV2ZWwuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5XaW5kb3cgLSBUaGUgc3RhdGUgb2YgdGhlIG1haW4gd2luZG93IHVwZGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVZpZGVvUHJvZHVjZXIgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpZGVvIHByb2R1Y2VyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHByb2R1Y2VyIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93IHN0YXRlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIHZpZGVvIGlzIGNvbm5lY3RlZC5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBjb25uZWN0aW9uIGZhaWxzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IHZpZGVvUGFyYW1zID0ge1xuICAgKiAgIGNvZGVjOiAndnA4JyxcbiAgICogICAvLyBPdGhlciBwcm9kdWNlciBvcHRpb25zLi4uXG4gICAqIH07XG4gICAqXG4gICAqIGNvbnN0IHBhcmFtZXRlcnMgPSB7XG4gICAqICAgdmlkZW9Qcm9kdWNlcjogbnVsbCxcbiAgICogICBwcm9kdWNlclRyYW5zcG9ydDogdHJhbnNwb3J0LCAvLyBBc3N1bWUgJ3RyYW5zcG9ydCcgaXMgaW5pdGlhbGl6ZWQgYW5kIHJlYWR5XG4gICAqICAgaXNsZXZlbDogJzEnLFxuICAgKiAgIHVwZGF0ZU1haW5XaW5kb3c6IGZhbHNlLFxuICAgKiAgIHVwZGF0ZVZpZGVvUHJvZHVjZXI6IChwcm9kdWNlcikgPT4geyBjb25zb2xlLmxvZyh1cGRhdGVkKSB9LFxuICAgKiAgIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0OiAodHJhbnNwb3J0KSA9PiB7IGNvbnNvbGUubG9nKHVwZGF0ZWQpIH0sXG4gICAqICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogKHN0YXRlKSA9PiB7IGNvbnNvbGUubG9nKHVwZGF0ZWQpIH0sXG4gICAqIH07XG4gICAqXG4gICAqIGNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8oeyB2aWRlb1BhcmFtcywgcGFyYW1ldGVycyB9KVxuICAgKiAgIC50aGVuKCgpID0+IHtcbiAgICogICAgIGNvbnNvbGUubG9nKCdWaWRlbyB0cmFuc3BvcnQgY29ubmVjdGVkIHN1Y2Nlc3NmdWxseScpO1xuICAgKiAgIH0pXG4gICAqICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgKiAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY29ubmVjdGluZyB2aWRlbyB0cmFuc3BvcnQ6JywgZXJyb3IpO1xuICAgKiAgIH0pO1xuICAgKiBgYGBcbiAgICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvIHtcbiAgLyoqXG4gICAqIENvbm5lY3RzIHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgdmlkZW8gYnkgcHJvZHVjaW5nIHZpZGVvIGRhdGEgYW5kIHVwZGF0ZXMgdGhlIHJlbGV2YW50IHN0YXRlcy5cbiAgICpcbiAgICogQHBhcmFtIHtDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBjb25uZWN0aW5nIHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgdmlkZW8uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnZpZGVvUGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHByb2R1Y2luZyB2aWRlbyBkYXRhLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHVwZGF0aW5nIHRoZSBzdGF0ZS5cbiAgICogQHBhcmFtIHtQcm9kdWNlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnZpZGVvUHJvZHVjZXIgLSBUaGUgdmlkZW8gcHJvZHVjZXIgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7VHJhbnNwb3J0fSBvcHRpb25zLnBhcmFtZXRlcnMucHJvZHVjZXJUcmFuc3BvcnQgLSBUaGUgdHJhbnNwb3J0IGluc3RhbmNlIHVzZWQgZm9yIHByb2R1Y2luZyB2aWRlby5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5pc2xldmVsIC0gVGhlIGNvbm5lY3Rpb24gbGV2ZWwuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5XaW5kb3cgLSBUaGUgc3RhdGUgb2YgdGhlIG1haW4gd2luZG93IHVwZGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVZpZGVvUHJvZHVjZXIgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpZGVvIHByb2R1Y2VyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHByb2R1Y2VyIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93IHN0YXRlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIHZpZGVvIGlzIGNvbm5lY3RlZC5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBjb25uZWN0aW9uIGZhaWxzLlxuICAgKi9cbiAgY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyA9IGFzeW5jICh7XG4gICAgdmlkZW9QYXJhbXMsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IHtcbiAgICAgICAgdmlkZW9Qcm9kdWNlcixcbiAgICAgICAgcHJvZHVjZXJUcmFuc3BvcnQsXG4gICAgICAgIGlzbGV2ZWwsXG4gICAgICAgIHVwZGF0ZU1haW5XaW5kb3csXG4gICAgICAgIHVwZGF0ZVZpZGVvUHJvZHVjZXIsXG4gICAgICAgIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0LFxuICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93LFxuICAgICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIC8vIENvbm5lY3QgdGhlIHNlbmQgdHJhbnNwb3J0IGZvciB2aWRlbyBieSBwcm9kdWNpbmcgdmlkZW8gZGF0YVxuICAgICAgaWYgKHByb2R1Y2VyVHJhbnNwb3J0KSB7XG4gICAgICAgIHZpZGVvUHJvZHVjZXIgPSBhd2FpdCBwcm9kdWNlclRyYW5zcG9ydC5wcm9kdWNlKHZpZGVvUGFyYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZHVjZXIgdHJhbnNwb3J0IGlzIG51bGwnKTtcbiAgICAgIH1cblxuICAgICAgLy8gVXBkYXRlIG1haW4gd2luZG93IHN0YXRlIGJhc2VkIG9uIHRoZSB2aWRlbyBjb25uZWN0aW9uIGxldmVsXG4gICAgICBpZiAoaXNsZXZlbCA9PT0gJzInKSB7XG4gICAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgdGhlIHZpZGVvIHByb2R1Y2VyIGFuZCBwcm9kdWNlciB0cmFuc3BvcnQgb2JqZWN0c1xuICAgICAgdXBkYXRlVmlkZW9Qcm9kdWNlcih2aWRlb1Byb2R1Y2VyKTtcbiAgICAgIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0KHByb2R1Y2VyVHJhbnNwb3J0KTtcbiAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvIGVycm9yJywgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9O1xufVxuIl19