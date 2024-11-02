import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Processes consumer transports by pausing and resuming them based on certain conditions.
 *
 * This method checks the state of each consumer transport and determines whether to pause or resume
 * based on the validity of the producer ID in relation to the provided streams.
 * It utilizes a sleep function to introduce a delay before pausing the transports.
 *
 * @param {ProcessConsumerTransportsOptions} options - The options for processing consumer transports.
 * @param {Array<Transport>} options.consumerTransports - The list of consumer transports to process.
 * @param {Array<Stream | Participant>} options.lStreams_ - The list of local streams.
 * @param {ProcessConsumerTransportsParameters} options.parameters - The parameters for processing, including:
 *   - {Array<Stream>} options.parameters.remoteScreenStream - The list of remote screen streams.
 *   - {Array<Stream | Participant>} options.parameters.oldAllStreams - The list of old streams.
 *   - {Array<Stream | Participant>} options.parameters.newLimitedStreams - The list of new limited streams.
 *   - {Function} options.parameters.sleep - A function to pause execution for a specified duration.
 *   - {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 *
 * @returns {Promise<void>} A promise that resolves when the processing is complete.
 *
 * @throws {Error} Will throw an error if there is an issue processing consumer transports.
 *
 * @example
 * ```typescript
 * const options = {
 *   consumerTransports: [],
 *   lStreams_: [],
 *   parameters: {
 *     remoteScreenStream: [],
 *     oldAllStreams: [],
 *     newLimitedStreams: [],
 *     sleep: async ({ ms }) => new Promise(resolve => setTimeout(resolve, ms)),
 *   },
 * };
 *
 * await processConsumerTransports(options);
 * ```
 */
export class ProcessConsumerTransports {
    /**
     * Processes consumer transports by pausing and resuming them based on certain conditions.
     *
     * @param {Object} options - The options for processing consumer transports.
     * @param {Array} options.consumerTransports - The list of consumer transports to process.
     * @param {Array} options.lStreams_ - The list of local streams.
     * @param {Object} options.parameters - The parameters object containing various stream arrays and utility functions.
     *
     * @returns {Promise<void>} - A promise that resolves when the processing is complete.
     *
     * @throws {Error} - Throws an error if there is an issue processing consumer transports.
     *
     * The function performs the following steps:
     * 1. Destructures and updates the parameters.
     * 2. Defines a helper function to check if a producerId is valid in given stream arrays.
     * 3. Filters consumer transports to resume based on certain conditions.
     * 4. Filters consumer transports to pause based on certain conditions.
     * 5. Pauses consumer transports after a short delay.
     * 6. Emits `consumer-pause` event for each filtered transport (not audio).
     * 7. Emits `consumer-resume` event for each filtered transport (not audio).
     */
    processConsumerTransports = async ({ consumerTransports, lStreams_, parameters, }) => {
        try {
            // Destructure parameters
            let { getUpdatedAllParams } = parameters;
            parameters = getUpdatedAllParams();
            const { remoteScreenStream, oldAllStreams, newLimitedStreams, 
            // mediasfu functions
            sleep, } = parameters;
            // Function to check if the producerId is valid in the given stream arrays
            const isValidProducerId = (producerId, ...streamArrays) => {
                return (producerId !== null &&
                    producerId !== '' &&
                    streamArrays.some((streamArray) => {
                        return (streamArray.length > 0 &&
                            streamArray.some((stream) => stream?.producerId === producerId));
                    }));
            };
            // Get paused consumer transports that are not audio
            const consumerTransportsToResume = consumerTransports.filter((transport) => isValidProducerId(transport.producerId, lStreams_, remoteScreenStream, oldAllStreams, newLimitedStreams) &&
                transport.consumer?.paused === true &&
                transport.consumer.kind !== 'audio');
            // Get unpaused consumer transports that are not audio
            const consumerTransportsToPause = consumerTransports.filter((transport) => transport.producerId &&
                transport.producerId !== null &&
                transport.producerId !== '' &&
                !lStreams_.some((stream) => stream.producerId === transport.producerId) &&
                transport.consumer &&
                transport.consumer.kind &&
                transport.consumer.paused !== true &&
                transport.consumer.kind !== 'audio' &&
                !remoteScreenStream.some((stream) => stream.producerId === transport.producerId) &&
                !oldAllStreams.some((stream) => stream.producerId === transport.producerId) &&
                !newLimitedStreams.some((stream) => stream.producerId === transport.producerId));
            // Pause consumer transports after a short delay
            await sleep({ ms: 100 });
            // Emit consumer.pause() for each filtered transport (not audio)
            for (const transport of consumerTransportsToPause) {
                transport.consumer.pause();
                transport.socket_.emit('consumer-pause', { serverConsumerId: transport.serverConsumerTransportId }, async () => {
                    // Handle the response if needed
                });
            }
            // Emit consumer.resume() for each filtered transport (not audio)
            for (const transport of consumerTransportsToResume) {
                transport.socket_.emit('consumer-resume', { serverConsumerId: transport.serverConsumerTransportId }, async ({ resumed }) => {
                    if (resumed) {
                        transport.consumer.resume();
                    }
                });
            }
        }
        catch (error) {
            // Handle errors during the process of pausing or resuming consumer transports
            console.log(`Error processing consumer transports: ${error.message}`);
            // throw new Error(`Error processing consumer transports: ${error.message}`);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProcessConsumerTransports, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProcessConsumerTransports, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProcessConsumerTransports, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy1jb25zdW1lci10cmFuc3BvcnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3Byb2Nlc3MtY29uc3VtZXItdHJhbnNwb3J0cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBeUIzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0NHO0FBS0gsTUFBTSxPQUFPLHlCQUF5QjtJQUNwQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkc7SUFDSCx5QkFBeUIsR0FBRyxLQUFLLEVBQUUsRUFDakMsa0JBQWtCLEVBQ2xCLFNBQVMsRUFDVCxVQUFVLEdBQ3VCLEVBQWlCLEVBQUU7UUFDcEQsSUFBSSxDQUFDO1lBQ0gseUJBQXlCO1lBQ3pCLElBQUksRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUN6QyxVQUFVLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztZQUVuQyxNQUFNLEVBQ0osa0JBQWtCLEVBQ2xCLGFBQWEsRUFDYixpQkFBaUI7WUFDakIscUJBQXFCO1lBQ3JCLEtBQUssR0FDTixHQUFHLFVBQVUsQ0FBQztZQUVmLDBFQUEwRTtZQUMxRSxNQUFNLGlCQUFpQixHQUFHLENBQ3hCLFVBQWtCLEVBQ2xCLEdBQUcsWUFBd0MsRUFDbEMsRUFBRTtnQkFDWCxPQUFPLENBQ0wsVUFBVSxLQUFLLElBQUk7b0JBQ25CLFVBQVUsS0FBSyxFQUFFO29CQUNqQixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7d0JBQ2hDLE9BQU8sQ0FDTCxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUM7NEJBQ3RCLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0s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LENBQUM7dUdBdkhTLHlCQUF5QjsyR0FBekIseUJBQXlCLGNBRnhCLE1BQU07OzJGQUVQLHlCQUF5QjtrQkFIckMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdHJlYW0sIFBhcnRpY2lwYW50LCBUcmFuc3BvcnQsIFNsZWVwVHlwZSB9IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c1BhcmFtZXRlcnMge1xuICByZW1vdGVTY3JlZW5TdHJlYW06IFN0cmVhbVtdO1xuICBvbGRBbGxTdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIG5ld0xpbWl0ZWRTdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHNsZWVwOiBTbGVlcFR5cGU7XG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c09wdGlvbnMge1xuICBjb25zdW1lclRyYW5zcG9ydHM6IFRyYW5zcG9ydFtdO1xuICBsU3RyZWFtc186IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcbiAgcGFyYW1ldGVyczogUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNUeXBlID0gKFxuICBvcHRpb25zOiBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzT3B0aW9ucyxcbikgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBQcm9jZXNzZXMgY29uc3VtZXIgdHJhbnNwb3J0cyBieSBwYXVzaW5nIGFuZCByZXN1bWluZyB0aGVtIGJhc2VkIG9uIGNlcnRhaW4gY29uZGl0aW9ucy5cbiAqXG4gKiBUaGlzIG1ldGhvZCBjaGVja3MgdGhlIHN0YXRlIG9mIGVhY2ggY29uc3VtZXIgdHJhbnNwb3J0IGFuZCBkZXRlcm1pbmVzIHdoZXRoZXIgdG8gcGF1c2Ugb3IgcmVzdW1lXG4gKiBiYXNlZCBvbiB0aGUgdmFsaWRpdHkgb2YgdGhlIHByb2R1Y2VyIElEIGluIHJlbGF0aW9uIHRvIHRoZSBwcm92aWRlZCBzdHJlYW1zLlxuICogSXQgdXRpbGl6ZXMgYSBzbGVlcCBmdW5jdGlvbiB0byBpbnRyb2R1Y2UgYSBkZWxheSBiZWZvcmUgcGF1c2luZyB0aGUgdHJhbnNwb3J0cy5cbiAqXG4gKiBAcGFyYW0ge1Byb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHByb2Nlc3NpbmcgY29uc3VtZXIgdHJhbnNwb3J0cy5cbiAqIEBwYXJhbSB7QXJyYXk8VHJhbnNwb3J0Pn0gb3B0aW9ucy5jb25zdW1lclRyYW5zcG9ydHMgLSBUaGUgbGlzdCBvZiBjb25zdW1lciB0cmFuc3BvcnRzIHRvIHByb2Nlc3MuXG4gKiBAcGFyYW0ge0FycmF5PFN0cmVhbSB8IFBhcnRpY2lwYW50Pn0gb3B0aW9ucy5sU3RyZWFtc18gLSBUaGUgbGlzdCBvZiBsb2NhbCBzdHJlYW1zLlxuICogQHBhcmFtIHtQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzUGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHByb2Nlc3NpbmcsIGluY2x1ZGluZzpcbiAqICAgLSB7QXJyYXk8U3RyZWFtPn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnJlbW90ZVNjcmVlblN0cmVhbSAtIFRoZSBsaXN0IG9mIHJlbW90ZSBzY3JlZW4gc3RyZWFtcy5cbiAqICAgLSB7QXJyYXk8U3RyZWFtIHwgUGFydGljaXBhbnQ+fSBvcHRpb25zLnBhcmFtZXRlcnMub2xkQWxsU3RyZWFtcyAtIFRoZSBsaXN0IG9mIG9sZCBzdHJlYW1zLlxuICogICAtIHtBcnJheTxTdHJlYW0gfCBQYXJ0aWNpcGFudD59IG9wdGlvbnMucGFyYW1ldGVycy5uZXdMaW1pdGVkU3RyZWFtcyAtIFRoZSBsaXN0IG9mIG5ldyBsaW1pdGVkIHN0cmVhbXMuXG4gKiAgIC0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2xlZXAgLSBBIGZ1bmN0aW9uIHRvIHBhdXNlIGV4ZWN1dGlvbiBmb3IgYSBzcGVjaWZpZWQgZHVyYXRpb24uXG4gKiAgIC0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHByb2Nlc3NpbmcgaXMgY29tcGxldGUuXG4gKlxuICogQHRocm93cyB7RXJyb3J9IFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYW4gaXNzdWUgcHJvY2Vzc2luZyBjb25zdW1lciB0cmFuc3BvcnRzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBvcHRpb25zID0ge1xuICogICBjb25zdW1lclRyYW5zcG9ydHM6IFtdLFxuICogICBsU3RyZWFtc186IFtdLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgcmVtb3RlU2NyZWVuU3RyZWFtOiBbXSxcbiAqICAgICBvbGRBbGxTdHJlYW1zOiBbXSxcbiAqICAgICBuZXdMaW1pdGVkU3RyZWFtczogW10sXG4gKiAgICAgc2xlZXA6IGFzeW5jICh7IG1zIH0pID0+IG5ldyBQcm9taXNlKHJlc29sdmUgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpLFxuICogICB9LFxuICogfTtcbiAqXG4gKiBhd2FpdCBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzKG9wdGlvbnMpO1xuICogYGBgXG4gKi9cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHMge1xuICAvKipcbiAgICogUHJvY2Vzc2VzIGNvbnN1bWVyIHRyYW5zcG9ydHMgYnkgcGF1c2luZyBhbmQgcmVzdW1pbmcgdGhlbSBiYXNlZCBvbiBjZXJ0YWluIGNvbmRpdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHByb2Nlc3NpbmcgY29uc3VtZXIgdHJhbnNwb3J0cy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5jb25zdW1lclRyYW5zcG9ydHMgLSBUaGUgbGlzdCBvZiBjb25zdW1lciB0cmFuc3BvcnRzIHRvIHByb2Nlc3MuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMubFN0cmVhbXNfIC0gVGhlIGxpc3Qgb2YgbG9jYWwgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdCBjb250YWluaW5nIHZhcmlvdXMgc3RyZWFtIGFycmF5cyBhbmQgdXRpbGl0eSBmdW5jdGlvbnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHByb2Nlc3NpbmcgaXMgY29tcGxldGUuXG4gICAqXG4gICAqIEB0aHJvd3Mge0Vycm9yfSAtIFRocm93cyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBwcm9jZXNzaW5nIGNvbnN1bWVyIHRyYW5zcG9ydHMuXG4gICAqXG4gICAqIFRoZSBmdW5jdGlvbiBwZXJmb3JtcyB0aGUgZm9sbG93aW5nIHN0ZXBzOlxuICAgKiAxLiBEZXN0cnVjdHVyZXMgYW5kIHVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMuXG4gICAqIDIuIERlZmluZXMgYSBoZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgaWYgYSBwcm9kdWNlcklkIGlzIHZhbGlkIGluIGdpdmVuIHN0cmVhbSBhcnJheXMuXG4gICAqIDMuIEZpbHRlcnMgY29uc3VtZXIgdHJhbnNwb3J0cyB0byByZXN1bWUgYmFzZWQgb24gY2VydGFpbiBjb25kaXRpb25zLlxuICAgKiA0LiBGaWx0ZXJzIGNvbnN1bWVyIHRyYW5zcG9ydHMgdG8gcGF1c2UgYmFzZWQgb24gY2VydGFpbiBjb25kaXRpb25zLlxuICAgKiA1LiBQYXVzZXMgY29uc3VtZXIgdHJhbnNwb3J0cyBhZnRlciBhIHNob3J0IGRlbGF5LlxuICAgKiA2LiBFbWl0cyBgY29uc3VtZXItcGF1c2VgIGV2ZW50IGZvciBlYWNoIGZpbHRlcmVkIHRyYW5zcG9ydCAobm90IGF1ZGlvKS5cbiAgICogNy4gRW1pdHMgYGNvbnN1bWVyLXJlc3VtZWAgZXZlbnQgZm9yIGVhY2ggZmlsdGVyZWQgdHJhbnNwb3J0IChub3QgYXVkaW8pLlxuICAgKi9cbiAgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0cyA9IGFzeW5jICh7XG4gICAgY29uc3VtZXJUcmFuc3BvcnRzLFxuICAgIGxTdHJlYW1zXyxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBEZXN0cnVjdHVyZSBwYXJhbWV0ZXJzXG4gICAgICBsZXQgeyBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSBwYXJhbWV0ZXJzO1xuICAgICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgICAgY29uc3Qge1xuICAgICAgICByZW1vdGVTY3JlZW5TdHJlYW0sXG4gICAgICAgIG9sZEFsbFN0cmVhbXMsXG4gICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zLFxuICAgICAgICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgICAgc2xlZXAsXG4gICAgICB9ID0gcGFyYW1ldGVycztcblxuICAgICAgLy8gRnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIHByb2R1Y2VySWQgaXMgdmFsaWQgaW4gdGhlIGdpdmVuIHN0cmVhbSBhcnJheXNcbiAgICAgIGNvbnN0IGlzVmFsaWRQcm9kdWNlcklkID0gKFxuICAgICAgICBwcm9kdWNlcklkOiBzdHJpbmcsXG4gICAgICAgIC4uLnN0cmVhbUFycmF5czogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdW11cbiAgICAgICk6IGJvb2xlYW4gPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIHByb2R1Y2VySWQgIT09IG51bGwgJiZcbiAgICAgICAgICBwcm9kdWNlcklkICE9PSAnJyAmJlxuICAgICAgICAgIHN0cmVhbUFycmF5cy5zb21lKChzdHJlYW1BcnJheSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgc3RyZWFtQXJyYXkubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICBzdHJlYW1BcnJheS5zb21lKChzdHJlYW0pID0+IHN0cmVhbT8ucHJvZHVjZXJJZCA9PT0gcHJvZHVjZXJJZClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIEdldCBwYXVzZWQgY29uc3VtZXIgdHJhbnNwb3J0cyB0aGF0IGFyZSBub3QgYXVkaW9cbiAgICAgIGNvbnN0IGNvbnN1bWVyVHJhbnNwb3J0c1RvUmVzdW1lID0gY29uc3VtZXJUcmFuc3BvcnRzLmZpbHRlcihcbiAgICAgICAgKHRyYW5zcG9ydCkgPT5cbiAgICAgICAgICBpc1ZhbGlkUHJvZHVjZXJJZChcbiAgICAgICAgICAgIHRyYW5zcG9ydC5wcm9kdWNlcklkLFxuICAgICAgICAgICAgbFN0cmVhbXNfLFxuICAgICAgICAgICAgcmVtb3RlU2NyZWVuU3RyZWFtLFxuICAgICAgICAgICAgb2xkQWxsU3RyZWFtcyxcbiAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zLFxuICAgICAgICAgICkgJiZcbiAgICAgICAgICB0cmFuc3BvcnQuY29uc3VtZXI/LnBhdXNlZCA9PT0gdHJ1ZSAmJlxuICAgICAgICAgIHRyYW5zcG9ydC5jb25zdW1lci5raW5kICE9PSAnYXVkaW8nLFxuICAgICAgKTtcblxuICAgICAgLy8gR2V0IHVucGF1c2VkIGNvbnN1bWVyIHRyYW5zcG9ydHMgdGhhdCBhcmUgbm90IGF1ZGlvXG4gICAgICBjb25zdCBjb25zdW1lclRyYW5zcG9ydHNUb1BhdXNlID0gY29uc3VtZXJUcmFuc3BvcnRzLmZpbHRlcihcbiAgICAgICAgKHRyYW5zcG9ydCkgPT5cbiAgICAgICAgICB0cmFuc3BvcnQucHJvZHVjZXJJZCAmJlxuICAgICAgICAgIHRyYW5zcG9ydC5wcm9kdWNlcklkICE9PSBudWxsICYmXG4gICAgICAgICAgdHJhbnNwb3J0LnByb2R1Y2VySWQgIT09ICcnICYmXG4gICAgICAgICAgIWxTdHJlYW1zXy5zb21lKChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkID09PSB0cmFuc3BvcnQucHJvZHVjZXJJZCkgJiZcbiAgICAgICAgICB0cmFuc3BvcnQuY29uc3VtZXIgJiZcbiAgICAgICAgICB0cmFuc3BvcnQuY29uc3VtZXIua2luZCAmJlxuICAgICAgICAgIHRyYW5zcG9ydC5jb25zdW1lci5wYXVzZWQgIT09IHRydWUgJiZcbiAgICAgICAgICB0cmFuc3BvcnQuY29uc3VtZXIua2luZCAhPT0gJ2F1ZGlvJyAmJlxuICAgICAgICAgICFyZW1vdGVTY3JlZW5TdHJlYW0uc29tZSgoc3RyZWFtOiBhbnkpID0+IHN0cmVhbS5wcm9kdWNlcklkID09PSB0cmFuc3BvcnQucHJvZHVjZXJJZCkgJiZcbiAgICAgICAgICAhb2xkQWxsU3RyZWFtcy5zb21lKChzdHJlYW06IGFueSkgPT4gc3RyZWFtLnByb2R1Y2VySWQgPT09IHRyYW5zcG9ydC5wcm9kdWNlcklkKSAmJlxuICAgICAgICAgICFuZXdMaW1pdGVkU3RyZWFtcy5zb21lKChzdHJlYW06IGFueSkgPT4gc3RyZWFtLnByb2R1Y2VySWQgPT09IHRyYW5zcG9ydC5wcm9kdWNlcklkKSxcbiAgICAgICk7XG5cbiAgICAgIC8vIFBhdXNlIGNvbnN1bWVyIHRyYW5zcG9ydHMgYWZ0ZXIgYSBzaG9ydCBkZWxheVxuICAgICAgYXdhaXQgc2xlZXAoeyBtczogMTAwIH0pO1xuXG4gICAgICAvLyBFbWl0IGNvbnN1bWVyLnBhdXNlKCkgZm9yIGVhY2ggZmlsdGVyZWQgdHJhbnNwb3J0IChub3QgYXVkaW8pXG4gICAgICBmb3IgKGNvbnN0IHRyYW5zcG9ydCBvZiBjb25zdW1lclRyYW5zcG9ydHNUb1BhdXNlKSB7XG4gICAgICAgIHRyYW5zcG9ydC5jb25zdW1lci5wYXVzZSgpO1xuICAgICAgICB0cmFuc3BvcnQuc29ja2V0Xy5lbWl0KFxuICAgICAgICAgICdjb25zdW1lci1wYXVzZScsXG4gICAgICAgICAgeyBzZXJ2ZXJDb25zdW1lcklkOiB0cmFuc3BvcnQuc2VydmVyQ29uc3VtZXJUcmFuc3BvcnRJZCB9LFxuICAgICAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgcmVzcG9uc2UgaWYgbmVlZGVkXG4gICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW1pdCBjb25zdW1lci5yZXN1bWUoKSBmb3IgZWFjaCBmaWx0ZXJlZCB0cmFuc3BvcnQgKG5vdCBhdWRpbylcbiAgICAgIGZvciAoY29uc3QgdHJhbnNwb3J0IG9mIGNvbnN1bWVyVHJhbnNwb3J0c1RvUmVzdW1lKSB7XG4gICAgICAgIHRyYW5zcG9ydC5zb2NrZXRfLmVtaXQoXG4gICAgICAgICAgJ2NvbnN1bWVyLXJlc3VtZScsXG4gICAgICAgICAgeyBzZXJ2ZXJDb25zdW1lcklkOiB0cmFuc3BvcnQuc2VydmVyQ29uc3VtZXJUcmFuc3BvcnRJZCB9LFxuICAgICAgICAgIGFzeW5jICh7IHJlc3VtZWQgfTogeyByZXN1bWVkOiBib29sZWFuIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bWVkKSB7XG4gICAgICAgICAgICAgIHRyYW5zcG9ydC5jb25zdW1lci5yZXN1bWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIC8vIEhhbmRsZSBlcnJvcnMgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIHBhdXNpbmcgb3IgcmVzdW1pbmcgY29uc3VtZXIgdHJhbnNwb3J0c1xuICAgICAgY29uc29sZS5sb2coYEVycm9yIHByb2Nlc3NpbmcgY29uc3VtZXIgdHJhbnNwb3J0czogJHtlcnJvci5tZXNzYWdlfWApO1xuICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKGBFcnJvciBwcm9jZXNzaW5nIGNvbnN1bWVyIHRyYW5zcG9ydHM6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICB9XG4gIH07XG59XG4iXX0=