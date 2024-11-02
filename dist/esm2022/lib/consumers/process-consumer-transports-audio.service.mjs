import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Processes consumer transports for audio streams by pausing and resuming them based on their current state and the provided streams.
 *
 * This method checks the state of each audio consumer transport and either pauses or resumes it depending on the presence of its producer ID in the provided list of streams.
 * It uses a sleep function to introduce a delay between the pause and resume operations to ensure smooth transitions.
 *
 * @param {ProcessConsumerTransportsAudioOptions} options - The options for processing consumer transports.
 * @param {Array<Transport>} options.consumerTransports - The list of consumer transports to process.
 * @param {Array<(Stream | Participant)>} options.lStreams - The list of local streams to check against.
 * @param {ProcessConsumerTransportsAudioParameters} options.parameters - Additional parameters for processing.
 * @param {Function} options.parameters.sleep - A function to pause execution for a specified duration.
 *
 * @returns {Promise<void>} A promise that resolves when the processing is complete.
 *
 * @throws {Error} Will throw an error if there is an issue processing the consumer transports.
 *
 * @example
 * ```typescript
 * const options = {
 *   consumerTransports: [,
 *   lStreams: [],
 *   parameters: {
 *     sleep: async ({ ms }) => new Promise(resolve => setTimeout(resolve, ms)),
 *   },
 * };
 *
 * await processConsumerTransportsAudio(options);
 * ```
 */
export class ProcessConsumerTransportsAudio {
    /**
     * Processes consumer transports for audio streams by pausing and resuming them based on their current state and the provided streams.
     *
     * @param {Object} options - The options for processing consumer transports.
     * @param {Array} options.consumerTransports - The list of consumer transports to process.
     * @param {Array} options.lStreams - The list of local streams to check against.
     * @param {Object} options.parameters - Additional parameters for processing.
     * @param {Function} options.parameters.sleep - A function to pause execution for a specified duration.
     *
     * @returns {Promise<void>} A promise that resolves when the processing is complete.
     *
     * @throws Will throw an error if there is an issue processing the consumer transports.
     */
    processConsumerTransportsAudio = async ({ consumerTransports, lStreams, parameters, }) => {
        try {
            const { sleep } = parameters;
            // Function to check if the producerId is valid
            const isValidProducerId = (producerId, ...streamArrays) => {
                return (producerId !== null &&
                    producerId !== '' &&
                    streamArrays.some((streamArray) => {
                        return (streamArray.length > 0 &&
                            streamArray.some((stream) => stream?.producerId === producerId));
                    }));
            };
            // Get paused consumer transports that are audio
            const consumerTransportsToResume = consumerTransports.filter((transport) => isValidProducerId(transport.producerId, lStreams) &&
                transport.consumer?.paused === true &&
                transport.consumer.kind === 'audio');
            // Get unpaused consumer transports that are audio
            const consumerTransportsToPause = consumerTransports.filter((transport) => transport.producerId &&
                transport.producerId !== null &&
                transport.producerId !== '' &&
                !lStreams.some((stream) => stream.producerId === transport.producerId) &&
                transport.consumer &&
                transport.consumer.kind &&
                transport.consumer.paused !== true &&
                transport.consumer.kind === 'audio');
            await sleep({ ms: 100 });
            // Emit consumer.pause() for each transport to pause
            for (const transport of consumerTransportsToPause) {
                transport.consumer.pause();
                transport.socket_.emit('consumer-pause', { serverConsumerId: transport.serverConsumerTransportId }, async () => {
                    // Do something after the consumer is paused
                });
            }
            // Emit consumer.resume() for each transport to resume
            for (const transport of consumerTransportsToResume) {
                transport.socket_.emit('consumer-resume', { serverConsumerId: transport.serverConsumerTransportId }, async ({ resumed }) => {
                    if (resumed) {
                        transport.consumer.resume();
                    }
                });
            }
        }
        catch (error) {
            console.log(`Error in processConsumerTransportsAudio: ${error.message}`);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProcessConsumerTransportsAudio, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProcessConsumerTransportsAudio, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProcessConsumerTransportsAudio, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy1jb25zdW1lci10cmFuc3BvcnRzLWF1ZGlvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3Byb2Nlc3MtY29uc3VtZXItdHJhbnNwb3J0cy1hdWRpby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBb0IzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTRCRztBQU1ILE1BQU0sT0FBTyw4QkFBOEI7SUFDekM7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsOEJBQThCLEdBQUcsS0FBSyxFQUFFLEVBQ3RDLGtCQUFrQixFQUNsQixRQUFRLEVBQ1IsVUFBVSxHQUM0QixFQUFpQixFQUFFO1FBQ3pELElBQUksQ0FBQztZQUNILE1BQU0sRUFBRSxLQUFLLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFFN0IsK0NBQStDO1lBQy9DLE1BQU0saUJBQWlCLEdBQUcsQ0FDeEIsVUFBa0IsRUFDbEIsR0FBRyxZQUF3QyxFQUNsQyxFQUFFO2dCQUNYLE9BQU8sQ0FDTCxVQUFVLEtBQUssSUFBSTtvQkFDbkIsVUFBVSxLQUFLLEVBQUU7b0JBQ2pCLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTt3QkFDaEMsT0FBTyxDQUNMLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQzs0QkFDdEIsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FDaEUsQ0FBQztvQkFDSixDQUFDLENBQUMsQ0FDSCxDQUFDO1lBQ0osQ0FBQyxDQUFDO1lBRUYsZ0RBQWdEO1lBQ2hELE1BQU0sMEJBQTBCLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUMxRCxDQUFDLFNBQVMsRUFBRSxFQUFFLENBQ1osaUJBQWlCLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUM7Z0JBQ2pELFNBQVMsQ0FBQyxRQUFRLEVBQUUsTUFBTSxLQUFLLElBQUk7Z0JBQ25DLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FDdEMsQ0FBQztZQUVGLGtEQUFrRDtZQUNsRCxNQUFNLHlCQUF5QixHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FDekQsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUNaLFNBQVMsQ0FBQyxVQUFVO2dCQUNwQixTQUFTLENBQUMsVUFBVSxLQUFLLElBQUk7Z0JBQzdCLFNBQVMsQ0FBQyxVQUFVLEtBQUssRUFBRTtnQkFDM0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLFNBQVMsQ0FBQyxVQUFVLENBQUM7Z0JBQ3RFLFNBQVMsQ0FBQyxRQUFRO2dCQUNsQixTQUFTLENBQUMsUUFBUSxDQUFDLElBQUk7Z0JBQ3ZCLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxLQUFLLElBQUk7Z0JBQ2xDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FDdEMsQ0FBQztZQUVGLE1BQU0sS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7WUFFekIsb0RBQW9EO1lBQ3BELEtBQUssTUFBTSxTQUFTLElBQUkseUJBQXlCLEVBQUUsQ0FBQztnQkFDbEQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDM0IsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ3BCLGdCQUFnQixFQUNoQixFQUFFLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyx5QkFBeUIsRUFBRSxFQUN6RCxLQUFLLElBQUksRUFBRTtvQkFDVCw0Q0FBNEM7Z0JBQzlDLENBQUMsQ0FDRixDQUFDO1lBQ0osQ0FBQztZQUVELHNEQUFzRDtZQUN0RCxLQUFLLE1BQU0sU0FBUyxJQUFJLDBCQUEwQixFQUFFLENBQUM7Z0JBQ25ELFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNwQixpQkFBaUIsRUFDakIsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLENBQUMseUJBQXlCLEVBQUUsRUFDekQsS0FBSyxFQUFFLEVBQUUsT0FBTyxFQUF3QixFQUFFLEVBQUU7b0JBQzFDLElBQUksT0FBTyxFQUFFLENBQUM7d0JBQ1osU0FBUyxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDOUIsQ0FBQztnQkFDSCxDQUFDLENBQ0YsQ0FBQztZQUNKLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztZQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMzRSxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQXpGUyw4QkFBOEI7MkdBQTlCLDhCQUE4QixjQUY3QixNQUFNOzsyRkFFUCw4QkFBOEI7a0JBSDFDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RyZWFtLCBUcmFuc3BvcnQsIFBhcnRpY2lwYW50LCBTbGVlcFR5cGUgfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpb1BhcmFtZXRlcnMge1xuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgc2xlZXA6IFNsZWVwVHlwZTtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpb09wdGlvbnMge1xuICBjb25zdW1lclRyYW5zcG9ydHM6IFRyYW5zcG9ydFtdO1xuICBsU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBwYXJhbWV0ZXJzOiBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW9QYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW9UeXBlID0gKFxuICBvcHRpb25zOiBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW9PcHRpb25zLFxuKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFByb2Nlc3NlcyBjb25zdW1lciB0cmFuc3BvcnRzIGZvciBhdWRpbyBzdHJlYW1zIGJ5IHBhdXNpbmcgYW5kIHJlc3VtaW5nIHRoZW0gYmFzZWQgb24gdGhlaXIgY3VycmVudCBzdGF0ZSBhbmQgdGhlIHByb3ZpZGVkIHN0cmVhbXMuXG4gKlxuICogVGhpcyBtZXRob2QgY2hlY2tzIHRoZSBzdGF0ZSBvZiBlYWNoIGF1ZGlvIGNvbnN1bWVyIHRyYW5zcG9ydCBhbmQgZWl0aGVyIHBhdXNlcyBvciByZXN1bWVzIGl0IGRlcGVuZGluZyBvbiB0aGUgcHJlc2VuY2Ugb2YgaXRzIHByb2R1Y2VyIElEIGluIHRoZSBwcm92aWRlZCBsaXN0IG9mIHN0cmVhbXMuXG4gKiBJdCB1c2VzIGEgc2xlZXAgZnVuY3Rpb24gdG8gaW50cm9kdWNlIGEgZGVsYXkgYmV0d2VlbiB0aGUgcGF1c2UgYW5kIHJlc3VtZSBvcGVyYXRpb25zIHRvIGVuc3VyZSBzbW9vdGggdHJhbnNpdGlvbnMuXG4gKlxuICogQHBhcmFtIHtQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW9PcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHByb2Nlc3NpbmcgY29uc3VtZXIgdHJhbnNwb3J0cy5cbiAqIEBwYXJhbSB7QXJyYXk8VHJhbnNwb3J0Pn0gb3B0aW9ucy5jb25zdW1lclRyYW5zcG9ydHMgLSBUaGUgbGlzdCBvZiBjb25zdW1lciB0cmFuc3BvcnRzIHRvIHByb2Nlc3MuXG4gKiBAcGFyYW0ge0FycmF5PChTdHJlYW0gfCBQYXJ0aWNpcGFudCk+fSBvcHRpb25zLmxTdHJlYW1zIC0gVGhlIGxpc3Qgb2YgbG9jYWwgc3RyZWFtcyB0byBjaGVjayBhZ2FpbnN0LlxuICogQHBhcmFtIHtQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW9QYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHByb2Nlc3NpbmcuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2xlZXAgLSBBIGZ1bmN0aW9uIHRvIHBhdXNlIGV4ZWN1dGlvbiBmb3IgYSBzcGVjaWZpZWQgZHVyYXRpb24uXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHByb2Nlc3NpbmcgaXMgY29tcGxldGUuXG4gKlxuICogQHRocm93cyB7RXJyb3J9IFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYW4gaXNzdWUgcHJvY2Vzc2luZyB0aGUgY29uc3VtZXIgdHJhbnNwb3J0cy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgY29uc3VtZXJUcmFuc3BvcnRzOiBbLFxuICogICBsU3RyZWFtczogW10sXG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICBzbGVlcDogYXN5bmMgKHsgbXMgfSkgPT4gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIG1zKSksXG4gKiAgIH0sXG4gKiB9O1xuICpcbiAqIGF3YWl0IHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbyhvcHRpb25zKTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbyB7XG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgY29uc3VtZXIgdHJhbnNwb3J0cyBmb3IgYXVkaW8gc3RyZWFtcyBieSBwYXVzaW5nIGFuZCByZXN1bWluZyB0aGVtIGJhc2VkIG9uIHRoZWlyIGN1cnJlbnQgc3RhdGUgYW5kIHRoZSBwcm92aWRlZCBzdHJlYW1zLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBwcm9jZXNzaW5nIGNvbnN1bWVyIHRyYW5zcG9ydHMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuY29uc3VtZXJUcmFuc3BvcnRzIC0gVGhlIGxpc3Qgb2YgY29uc3VtZXIgdHJhbnNwb3J0cyB0byBwcm9jZXNzLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLmxTdHJlYW1zIC0gVGhlIGxpc3Qgb2YgbG9jYWwgc3RyZWFtcyB0byBjaGVjayBhZ2FpbnN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciBwcm9jZXNzaW5nLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2xlZXAgLSBBIGZ1bmN0aW9uIHRvIHBhdXNlIGV4ZWN1dGlvbiBmb3IgYSBzcGVjaWZpZWQgZHVyYXRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBwcm9jZXNzaW5nIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYW4gaXNzdWUgcHJvY2Vzc2luZyB0aGUgY29uc3VtZXIgdHJhbnNwb3J0cy5cbiAgICovXG4gIHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbyA9IGFzeW5jICh7XG4gICAgY29uc3VtZXJUcmFuc3BvcnRzLFxuICAgIGxTdHJlYW1zLFxuICAgIHBhcmFtZXRlcnMsXG4gIH06IFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpb09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBzbGVlcCB9ID0gcGFyYW1ldGVycztcblxuICAgICAgLy8gRnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIHByb2R1Y2VySWQgaXMgdmFsaWRcbiAgICAgIGNvbnN0IGlzVmFsaWRQcm9kdWNlcklkID0gKFxuICAgICAgICBwcm9kdWNlcklkOiBzdHJpbmcsXG4gICAgICAgIC4uLnN0cmVhbUFycmF5czogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdW11cbiAgICAgICk6IGJvb2xlYW4gPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIHByb2R1Y2VySWQgIT09IG51bGwgJiZcbiAgICAgICAgICBwcm9kdWNlcklkICE9PSAnJyAmJlxuICAgICAgICAgIHN0cmVhbUFycmF5cy5zb21lKChzdHJlYW1BcnJheSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgc3RyZWFtQXJyYXkubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICBzdHJlYW1BcnJheS5zb21lKChzdHJlYW0pID0+IHN0cmVhbT8ucHJvZHVjZXJJZCA9PT0gcHJvZHVjZXJJZClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIEdldCBwYXVzZWQgY29uc3VtZXIgdHJhbnNwb3J0cyB0aGF0IGFyZSBhdWRpb1xuICAgICAgY29uc3QgY29uc3VtZXJUcmFuc3BvcnRzVG9SZXN1bWUgPSBjb25zdW1lclRyYW5zcG9ydHMuZmlsdGVyKFxuICAgICAgICAodHJhbnNwb3J0KSA9PlxuICAgICAgICAgIGlzVmFsaWRQcm9kdWNlcklkKHRyYW5zcG9ydC5wcm9kdWNlcklkLCBsU3RyZWFtcykgJiZcbiAgICAgICAgICB0cmFuc3BvcnQuY29uc3VtZXI/LnBhdXNlZCA9PT0gdHJ1ZSAmJlxuICAgICAgICAgIHRyYW5zcG9ydC5jb25zdW1lci5raW5kID09PSAnYXVkaW8nLFxuICAgICAgKTtcblxuICAgICAgLy8gR2V0IHVucGF1c2VkIGNvbnN1bWVyIHRyYW5zcG9ydHMgdGhhdCBhcmUgYXVkaW9cbiAgICAgIGNvbnN0IGNvbnN1bWVyVHJhbnNwb3J0c1RvUGF1c2UgPSBjb25zdW1lclRyYW5zcG9ydHMuZmlsdGVyKFxuICAgICAgICAodHJhbnNwb3J0KSA9PlxuICAgICAgICAgIHRyYW5zcG9ydC5wcm9kdWNlcklkICYmXG4gICAgICAgICAgdHJhbnNwb3J0LnByb2R1Y2VySWQgIT09IG51bGwgJiZcbiAgICAgICAgICB0cmFuc3BvcnQucHJvZHVjZXJJZCAhPT0gJycgJiZcbiAgICAgICAgICAhbFN0cmVhbXMuc29tZSgoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCA9PT0gdHJhbnNwb3J0LnByb2R1Y2VySWQpICYmXG4gICAgICAgICAgdHJhbnNwb3J0LmNvbnN1bWVyICYmXG4gICAgICAgICAgdHJhbnNwb3J0LmNvbnN1bWVyLmtpbmQgJiZcbiAgICAgICAgICB0cmFuc3BvcnQuY29uc3VtZXIucGF1c2VkICE9PSB0cnVlICYmXG4gICAgICAgICAgdHJhbnNwb3J0LmNvbnN1bWVyLmtpbmQgPT09ICdhdWRpbycsXG4gICAgICApO1xuXG4gICAgICBhd2FpdCBzbGVlcCh7IG1zOiAxMDAgfSk7XG5cbiAgICAgIC8vIEVtaXQgY29uc3VtZXIucGF1c2UoKSBmb3IgZWFjaCB0cmFuc3BvcnQgdG8gcGF1c2VcbiAgICAgIGZvciAoY29uc3QgdHJhbnNwb3J0IG9mIGNvbnN1bWVyVHJhbnNwb3J0c1RvUGF1c2UpIHtcbiAgICAgICAgdHJhbnNwb3J0LmNvbnN1bWVyLnBhdXNlKCk7XG4gICAgICAgIHRyYW5zcG9ydC5zb2NrZXRfLmVtaXQoXG4gICAgICAgICAgJ2NvbnN1bWVyLXBhdXNlJyxcbiAgICAgICAgICB7IHNlcnZlckNvbnN1bWVySWQ6IHRyYW5zcG9ydC5zZXJ2ZXJDb25zdW1lclRyYW5zcG9ydElkIH0sXG4gICAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgLy8gRG8gc29tZXRoaW5nIGFmdGVyIHRoZSBjb25zdW1lciBpcyBwYXVzZWRcbiAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBFbWl0IGNvbnN1bWVyLnJlc3VtZSgpIGZvciBlYWNoIHRyYW5zcG9ydCB0byByZXN1bWVcbiAgICAgIGZvciAoY29uc3QgdHJhbnNwb3J0IG9mIGNvbnN1bWVyVHJhbnNwb3J0c1RvUmVzdW1lKSB7XG4gICAgICAgIHRyYW5zcG9ydC5zb2NrZXRfLmVtaXQoXG4gICAgICAgICAgJ2NvbnN1bWVyLXJlc3VtZScsXG4gICAgICAgICAgeyBzZXJ2ZXJDb25zdW1lcklkOiB0cmFuc3BvcnQuc2VydmVyQ29uc3VtZXJUcmFuc3BvcnRJZCB9LFxuICAgICAgICAgIGFzeW5jICh7IHJlc3VtZWQgfTogeyByZXN1bWVkOiBib29sZWFuIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bWVkKSB7XG4gICAgICAgICAgICAgIHRyYW5zcG9ydC5jb25zdW1lci5yZXN1bWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBFcnJvciBpbiBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW86ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICB9XG4gIH07XG59XG4iXX0=