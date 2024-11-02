import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Connects the send transport for audio by producing audio data and updating the audio producer and producer transport objects.
 *
 * @param {ConnectSendTransportAudioOptions} options - The parameters for connecting the send transport.
 * @param {ProducerOptions} options.audioParams - The options for the audio producer.
 * @param {ConnectSendTransportAudioParameters} options.parameters - The parameters containing the audio producer, producer transport, and update functions.
 * @param {Producer} options.parameters.audioProducer - The current audio producer.
 * @param {Transport} options.parameters.producerTransport - The transport used to produce audio data.
 * @param {Function} options.parameters.updateAudioProducer - Function to update the audio producer.
 * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport.
 *
 * @returns {Promise<void>} A promise that resolves when the audio transport is successfully connected.
 *
 * @throws Will throw an error if the connection fails.
 *
 * @example
 * ```typescript
 * const audioParams: ProducerOptions = {
 *   codec: 'opus',
 *   // other options
 * };
 *
 * const parameters = {
 *   audioProducer: null,
 *   producerTransport: transport,
 *   updateAudioProducer: (producer) => { console.log(updated) },
  *   updateProducerTransport: (transport) => { console.log(updated) },
  * };
  *
  * connectSendTransportAudio({ audioParams, parameters })
  *   .then(() => {
  *     console.log('Audio transport connected successfully');
  *   })
  *   .catch((error) => {
  *     console.error('Error connecting audio transport:', error);
  *   });
  * ```
  */
export class ConnectSendTransportAudio {
    /**
     * Connects the send transport for audio by producing audio data and updating the audio producer and producer transport objects.
     *
     * @param {Object} params - The parameters for connecting the send transport.
     * @param {ProducerOptions} params.audioParams - The options for the audio producer.
     * @param {ConnectSendTransportAudioParameters} params.parameters - The parameters containing the audio producer, producer transport, and update functions.
     * @param {Producer} params.parameters.audioProducer - The current audio producer.
     * @param {Transport} params.parameters.producerTransport - The transport used to produce audio data.
     * @param {Function} params.parameters.updateAudioProducer - Function to update the audio producer.
     * @param {Function} params.parameters.updateProducerTransport - Function to update the producer transport.
     *
     * @returns {Promise<void>} A promise that resolves when the audio transport is successfully connected.
     *
     * @throws Will throw an error if the connection fails.
     */
    async connectSendTransportAudio({ audioParams, parameters, }) {
        try {
            let { audioProducer, producerTransport, updateAudioProducer, updateProducerTransport } = parameters;
            // Connect the send transport for audio by producing audio data
            if (producerTransport) {
                audioProducer = await producerTransport.produce(audioParams);
            }
            else {
                throw new Error('Producer transport is null');
            }
            // Update the audio producer and producer transport objects
            updateAudioProducer(audioProducer);
            updateProducerTransport(producerTransport);
        }
        catch (error) {
            console.log('connectSendTransportAudio error', error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportAudio, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportAudio, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportAudio, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1hdWRpby5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LWF1ZGlvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFvQjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUNJO0FBS0osTUFBTSxPQUFPLHlCQUF5QjtJQUNwQzs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUVILEtBQUssQ0FBQyx5QkFBeUIsQ0FBQyxFQUM5QixXQUFXLEVBQ1gsVUFBVSxHQUN1QjtRQUNqQyxJQUFJLENBQUM7WUFDSCxJQUFJLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLG1CQUFtQixFQUFFLHVCQUF1QixFQUFFLEdBQ3BGLFVBQVUsQ0FBQztZQUViLCtEQUErRDtZQUMvRCxJQUFJLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3RCLGFBQWEsR0FBRyxNQUFNLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvRCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFFRCwyREFBMkQ7WUFDM0QsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7WUFDbkMsdUJBQXVCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUM3QyxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEQsQ0FBQztJQUNILENBQUM7dUdBdENVLHlCQUF5QjsyR0FBekIseUJBQXlCLGNBRnhCLE1BQU07OzJGQUVQLHlCQUF5QjtrQkFIckMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFRyYW5zcG9ydCwgUHJvZHVjZXIsIFByb2R1Y2VyT3B0aW9ucyB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnMge1xuICBhdWRpb1Byb2R1Y2VyOiBQcm9kdWNlciB8IG51bGw7XG4gIHByb2R1Y2VyVHJhbnNwb3J0OiBUcmFuc3BvcnQgfCBudWxsO1xuICB1cGRhdGVBdWRpb1Byb2R1Y2VyOiAocHJvZHVjZXI6IFByb2R1Y2VyIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQ6ICh0cmFuc3BvcnQ6IFRyYW5zcG9ydCB8IG51bGwpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb09wdGlvbnMge1xuICBhdWRpb1BhcmFtczogUHJvZHVjZXJPcHRpb25zO1xuICBwYXJhbWV0ZXJzOiBDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1R5cGUgPSAoXG4gIG9wdGlvbnM6IENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9PcHRpb25zLFxuKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIENvbm5lY3RzIHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgYXVkaW8gYnkgcHJvZHVjaW5nIGF1ZGlvIGRhdGEgYW5kIHVwZGF0aW5nIHRoZSBhdWRpbyBwcm9kdWNlciBhbmQgcHJvZHVjZXIgdHJhbnNwb3J0IG9iamVjdHMuXG4gKlxuICogQHBhcmFtIHtDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBwYXJhbWV0ZXJzIGZvciBjb25uZWN0aW5nIHRoZSBzZW5kIHRyYW5zcG9ydC5cbiAqIEBwYXJhbSB7UHJvZHVjZXJPcHRpb25zfSBvcHRpb25zLmF1ZGlvUGFyYW1zIC0gVGhlIG9wdGlvbnMgZm9yIHRoZSBhdWRpbyBwcm9kdWNlci5cbiAqIEBwYXJhbSB7Q29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGNvbnRhaW5pbmcgdGhlIGF1ZGlvIHByb2R1Y2VyLCBwcm9kdWNlciB0cmFuc3BvcnQsIGFuZCB1cGRhdGUgZnVuY3Rpb25zLlxuICogQHBhcmFtIHtQcm9kdWNlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvUHJvZHVjZXIgLSBUaGUgY3VycmVudCBhdWRpbyBwcm9kdWNlci5cbiAqIEBwYXJhbSB7VHJhbnNwb3J0fSBvcHRpb25zLnBhcmFtZXRlcnMucHJvZHVjZXJUcmFuc3BvcnQgLSBUaGUgdHJhbnNwb3J0IHVzZWQgdG8gcHJvZHVjZSBhdWRpbyBkYXRhLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUF1ZGlvUHJvZHVjZXIgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF1ZGlvIHByb2R1Y2VyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwcm9kdWNlciB0cmFuc3BvcnQuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGF1ZGlvIHRyYW5zcG9ydCBpcyBzdWNjZXNzZnVsbHkgY29ubmVjdGVkLlxuICpcbiAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgY29ubmVjdGlvbiBmYWlscy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3QgYXVkaW9QYXJhbXM6IFByb2R1Y2VyT3B0aW9ucyA9IHtcbiAqICAgY29kZWM6ICdvcHVzJyxcbiAqICAgLy8gb3RoZXIgb3B0aW9uc1xuICogfTtcbiAqXG4gKiBjb25zdCBwYXJhbWV0ZXJzID0ge1xuICogICBhdWRpb1Byb2R1Y2VyOiBudWxsLFxuICogICBwcm9kdWNlclRyYW5zcG9ydDogdHJhbnNwb3J0LFxuICogICB1cGRhdGVBdWRpb1Byb2R1Y2VyOiAocHJvZHVjZXIpID0+IHsgY29uc29sZS5sb2codXBkYXRlZCkgfSxcbiAgKiAgIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0OiAodHJhbnNwb3J0KSA9PiB7IGNvbnNvbGUubG9nKHVwZGF0ZWQpIH0sXG4gICogfTtcbiAgKlxuICAqIGNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8oeyBhdWRpb1BhcmFtcywgcGFyYW1ldGVycyB9KVxuICAqICAgLnRoZW4oKCkgPT4ge1xuICAqICAgICBjb25zb2xlLmxvZygnQXVkaW8gdHJhbnNwb3J0IGNvbm5lY3RlZCBzdWNjZXNzZnVsbHknKTtcbiAgKiAgIH0pXG4gICogICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICogICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNvbm5lY3RpbmcgYXVkaW8gdHJhbnNwb3J0OicsIGVycm9yKTtcbiAgKiAgIH0pO1xuICAqIGBgYFxuICAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyB7XG4gIC8qKlxuICAgKiBDb25uZWN0cyB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIGF1ZGlvIGJ5IHByb2R1Y2luZyBhdWRpbyBkYXRhIGFuZCB1cGRhdGluZyB0aGUgYXVkaW8gcHJvZHVjZXIgYW5kIHByb2R1Y2VyIHRyYW5zcG9ydCBvYmplY3RzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgZm9yIGNvbm5lY3RpbmcgdGhlIHNlbmQgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge1Byb2R1Y2VyT3B0aW9uc30gcGFyYW1zLmF1ZGlvUGFyYW1zIC0gVGhlIG9wdGlvbnMgZm9yIHRoZSBhdWRpbyBwcm9kdWNlci5cbiAgICogQHBhcmFtIHtDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvUGFyYW1ldGVyc30gcGFyYW1zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBjb250YWluaW5nIHRoZSBhdWRpbyBwcm9kdWNlciwgcHJvZHVjZXIgdHJhbnNwb3J0LCBhbmQgdXBkYXRlIGZ1bmN0aW9ucy5cbiAgICogQHBhcmFtIHtQcm9kdWNlcn0gcGFyYW1zLnBhcmFtZXRlcnMuYXVkaW9Qcm9kdWNlciAtIFRoZSBjdXJyZW50IGF1ZGlvIHByb2R1Y2VyLlxuICAgKiBAcGFyYW0ge1RyYW5zcG9ydH0gcGFyYW1zLnBhcmFtZXRlcnMucHJvZHVjZXJUcmFuc3BvcnQgLSBUaGUgdHJhbnNwb3J0IHVzZWQgdG8gcHJvZHVjZSBhdWRpbyBkYXRhLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwYXJhbXMucGFyYW1ldGVycy51cGRhdGVBdWRpb1Byb2R1Y2VyIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhdWRpbyBwcm9kdWNlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gcGFyYW1zLnBhcmFtZXRlcnMudXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHByb2R1Y2VyIHRyYW5zcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGF1ZGlvIHRyYW5zcG9ydCBpcyBzdWNjZXNzZnVsbHkgY29ubmVjdGVkLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGNvbm5lY3Rpb24gZmFpbHMuXG4gICAqL1xuXG4gIGFzeW5jIGNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8oe1xuICAgIGF1ZGlvUGFyYW1zLFxuICAgIHBhcmFtZXRlcnMsXG4gIH06IENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9PcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB7IGF1ZGlvUHJvZHVjZXIsIHByb2R1Y2VyVHJhbnNwb3J0LCB1cGRhdGVBdWRpb1Byb2R1Y2VyLCB1cGRhdGVQcm9kdWNlclRyYW5zcG9ydCB9ID1cbiAgICAgICAgcGFyYW1ldGVycztcblxuICAgICAgLy8gQ29ubmVjdCB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIGF1ZGlvIGJ5IHByb2R1Y2luZyBhdWRpbyBkYXRhXG4gICAgICBpZiAocHJvZHVjZXJUcmFuc3BvcnQpIHtcbiAgICAgICAgYXVkaW9Qcm9kdWNlciA9IGF3YWl0IHByb2R1Y2VyVHJhbnNwb3J0LnByb2R1Y2UoYXVkaW9QYXJhbXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9kdWNlciB0cmFuc3BvcnQgaXMgbnVsbCcpO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgdGhlIGF1ZGlvIHByb2R1Y2VyIGFuZCBwcm9kdWNlciB0cmFuc3BvcnQgb2JqZWN0c1xuICAgICAgdXBkYXRlQXVkaW9Qcm9kdWNlcihhdWRpb1Byb2R1Y2VyKTtcbiAgICAgIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0KHByb2R1Y2VyVHJhbnNwb3J0KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gZXJyb3InLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=