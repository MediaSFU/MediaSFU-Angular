import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy1jb25zdW1lci10cmFuc3BvcnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3Byb2Nlc3MtY29uc3VtZXItdHJhbnNwb3J0cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBMkIzQyxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQW9CRztJQUNILHlCQUF5QixHQUFHLEtBQUssRUFBRSxFQUNqQyxrQkFBa0IsRUFDbEIsU0FBUyxFQUNULFVBQVUsR0FDdUIsRUFBaUIsRUFBRTtRQUNwRCxJQUFJLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsVUFBVSxDQUFDO1lBQ3pDLFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1lBRW5DLE1BQU0sRUFDSixrQkFBa0IsRUFDbEIsYUFBYSxFQUNiLGlCQUFpQjtZQUNqQixxQkFBcUI7WUFDckIsS0FBSyxHQUNOLEdBQUcsVUFBVSxDQUFDO1lBRWYsMEVBQTBFO1lBQzFFLE1BQU0saUJBQWlCLEdBQUcsQ0FDeEIsVUFBa0IsRUFDbEIsR0FBRyxZQUF3QyxFQUNsQyxFQUFFO2dCQUNYLE9BQU8sQ0FDTCxVQUFVLEtBQUssSUFBSTtvQkFDbkIsVUFBVSxLQUFLLEVBQUU7b0JBQ2pCLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTt3QkFDaEMsT0FBTyxDQUNMLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQzs0QkFDdEIsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsS0FBSyxVQUFVLENBQUMsQ0FDaEUsQ0FBQztvQkFDSixDQUFD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MkZBRVAseUJBQXlCO2tCQUhyQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0cmVhbSwgUGFydGljaXBhbnQsIFRyYW5zcG9ydCwgU2xlZXBUeXBlIH0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzUGFyYW1ldGVycyB7XG4gIHJlbW90ZVNjcmVlblN0cmVhbTogU3RyZWFtW107XG4gIG9sZEFsbFN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcbiAgbmV3TGltaXRlZFN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgc2xlZXA6IFNsZWVwVHlwZTtcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzT3B0aW9ucyB7XG4gIGNvbnN1bWVyVHJhbnNwb3J0czogVHJhbnNwb3J0W107XG4gIGxTdHJlYW1zXzogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBwYXJhbWV0ZXJzOiBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c1R5cGUgPSAoXG4gIG9wdGlvbnM6IFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNPcHRpb25zLFxuKSA9PiBQcm9taXNlPHZvaWQ+O1xuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHMge1xuICAvKipcbiAgICogUHJvY2Vzc2VzIGNvbnN1bWVyIHRyYW5zcG9ydHMgYnkgcGF1c2luZyBhbmQgcmVzdW1pbmcgdGhlbSBiYXNlZCBvbiBjZXJ0YWluIGNvbmRpdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHByb2Nlc3NpbmcgY29uc3VtZXIgdHJhbnNwb3J0cy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5jb25zdW1lclRyYW5zcG9ydHMgLSBUaGUgbGlzdCBvZiBjb25zdW1lciB0cmFuc3BvcnRzIHRvIHByb2Nlc3MuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMubFN0cmVhbXNfIC0gVGhlIGxpc3Qgb2YgbG9jYWwgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdCBjb250YWluaW5nIHZhcmlvdXMgc3RyZWFtIGFycmF5cyBhbmQgdXRpbGl0eSBmdW5jdGlvbnMuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHByb2Nlc3NpbmcgaXMgY29tcGxldGUuXG4gICAqXG4gICAqIEB0aHJvd3Mge0Vycm9yfSAtIFRocm93cyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBwcm9jZXNzaW5nIGNvbnN1bWVyIHRyYW5zcG9ydHMuXG4gICAqXG4gICAqIFRoZSBmdW5jdGlvbiBwZXJmb3JtcyB0aGUgZm9sbG93aW5nIHN0ZXBzOlxuICAgKiAxLiBEZXN0cnVjdHVyZXMgYW5kIHVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMuXG4gICAqIDIuIERlZmluZXMgYSBoZWxwZXIgZnVuY3Rpb24gdG8gY2hlY2sgaWYgYSBwcm9kdWNlcklkIGlzIHZhbGlkIGluIGdpdmVuIHN0cmVhbSBhcnJheXMuXG4gICAqIDMuIEZpbHRlcnMgY29uc3VtZXIgdHJhbnNwb3J0cyB0byByZXN1bWUgYmFzZWQgb24gY2VydGFpbiBjb25kaXRpb25zLlxuICAgKiA0LiBGaWx0ZXJzIGNvbnN1bWVyIHRyYW5zcG9ydHMgdG8gcGF1c2UgYmFzZWQgb24gY2VydGFpbiBjb25kaXRpb25zLlxuICAgKiA1LiBQYXVzZXMgY29uc3VtZXIgdHJhbnNwb3J0cyBhZnRlciBhIHNob3J0IGRlbGF5LlxuICAgKiA2LiBFbWl0cyBgY29uc3VtZXItcGF1c2VgIGV2ZW50IGZvciBlYWNoIGZpbHRlcmVkIHRyYW5zcG9ydCAobm90IGF1ZGlvKS5cbiAgICogNy4gRW1pdHMgYGNvbnN1bWVyLXJlc3VtZWAgZXZlbnQgZm9yIGVhY2ggZmlsdGVyZWQgdHJhbnNwb3J0IChub3QgYXVkaW8pLlxuICAgKi9cbiAgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0cyA9IGFzeW5jICh7XG4gICAgY29uc3VtZXJUcmFuc3BvcnRzLFxuICAgIGxTdHJlYW1zXyxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBEZXN0cnVjdHVyZSBwYXJhbWV0ZXJzXG4gICAgICBsZXQgeyBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSBwYXJhbWV0ZXJzO1xuICAgICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgICAgY29uc3Qge1xuICAgICAgICByZW1vdGVTY3JlZW5TdHJlYW0sXG4gICAgICAgIG9sZEFsbFN0cmVhbXMsXG4gICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zLFxuICAgICAgICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgICAgc2xlZXAsXG4gICAgICB9ID0gcGFyYW1ldGVycztcblxuICAgICAgLy8gRnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIHByb2R1Y2VySWQgaXMgdmFsaWQgaW4gdGhlIGdpdmVuIHN0cmVhbSBhcnJheXNcbiAgICAgIGNvbnN0IGlzVmFsaWRQcm9kdWNlcklkID0gKFxuICAgICAgICBwcm9kdWNlcklkOiBzdHJpbmcsXG4gICAgICAgIC4uLnN0cmVhbUFycmF5czogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdW11cbiAgICAgICk6IGJvb2xlYW4gPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIHByb2R1Y2VySWQgIT09IG51bGwgJiZcbiAgICAgICAgICBwcm9kdWNlcklkICE9PSAnJyAmJlxuICAgICAgICAgIHN0cmVhbUFycmF5cy5zb21lKChzdHJlYW1BcnJheSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgc3RyZWFtQXJyYXkubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICBzdHJlYW1BcnJheS5zb21lKChzdHJlYW0pID0+IHN0cmVhbT8ucHJvZHVjZXJJZCA9PT0gcHJvZHVjZXJJZClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIEdldCBwYXVzZWQgY29uc3VtZXIgdHJhbnNwb3J0cyB0aGF0IGFyZSBub3QgYXVkaW9cbiAgICAgIGNvbnN0IGNvbnN1bWVyVHJhbnNwb3J0c1RvUmVzdW1lID0gY29uc3VtZXJUcmFuc3BvcnRzLmZpbHRlcihcbiAgICAgICAgKHRyYW5zcG9ydCkgPT5cbiAgICAgICAgICBpc1ZhbGlkUHJvZHVjZXJJZChcbiAgICAgICAgICAgIHRyYW5zcG9ydC5wcm9kdWNlcklkLFxuICAgICAgICAgICAgbFN0cmVhbXNfLFxuICAgICAgICAgICAgcmVtb3RlU2NyZWVuU3RyZWFtLFxuICAgICAgICAgICAgb2xkQWxsU3RyZWFtcyxcbiAgICAgICAgICAgIG5ld0xpbWl0ZWRTdHJlYW1zLFxuICAgICAgICAgICkgJiZcbiAgICAgICAgICB0cmFuc3BvcnQuY29uc3VtZXI/LnBhdXNlZCA9PT0gdHJ1ZSAmJlxuICAgICAgICAgIHRyYW5zcG9ydC5jb25zdW1lci5raW5kICE9PSAnYXVkaW8nLFxuICAgICAgKTtcblxuICAgICAgLy8gR2V0IHVucGF1c2VkIGNvbnN1bWVyIHRyYW5zcG9ydHMgdGhhdCBhcmUgbm90IGF1ZGlvXG4gICAgICBjb25zdCBjb25zdW1lclRyYW5zcG9ydHNUb1BhdXNlID0gY29uc3VtZXJUcmFuc3BvcnRzLmZpbHRlcihcbiAgICAgICAgKHRyYW5zcG9ydCkgPT5cbiAgICAgICAgICB0cmFuc3BvcnQucHJvZHVjZXJJZCAmJlxuICAgICAgICAgIHRyYW5zcG9ydC5wcm9kdWNlcklkICE9PSBudWxsICYmXG4gICAgICAgICAgdHJhbnNwb3J0LnByb2R1Y2VySWQgIT09ICcnICYmXG4gICAgICAgICAgIWxTdHJlYW1zXy5zb21lKChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkID09PSB0cmFuc3BvcnQucHJvZHVjZXJJZCkgJiZcbiAgICAgICAgICB0cmFuc3BvcnQuY29uc3VtZXIgJiZcbiAgICAgICAgICB0cmFuc3BvcnQuY29uc3VtZXIua2luZCAmJlxuICAgICAgICAgIHRyYW5zcG9ydC5jb25zdW1lci5wYXVzZWQgIT09IHRydWUgJiZcbiAgICAgICAgICB0cmFuc3BvcnQuY29uc3VtZXIua2luZCAhPT0gJ2F1ZGlvJyAmJlxuICAgICAgICAgICFyZW1vdGVTY3JlZW5TdHJlYW0uc29tZSgoc3RyZWFtOiBhbnkpID0+IHN0cmVhbS5wcm9kdWNlcklkID09PSB0cmFuc3BvcnQucHJvZHVjZXJJZCkgJiZcbiAgICAgICAgICAhb2xkQWxsU3RyZWFtcy5zb21lKChzdHJlYW06IGFueSkgPT4gc3RyZWFtLnByb2R1Y2VySWQgPT09IHRyYW5zcG9ydC5wcm9kdWNlcklkKSAmJlxuICAgICAgICAgICFuZXdMaW1pdGVkU3RyZWFtcy5zb21lKChzdHJlYW06IGFueSkgPT4gc3RyZWFtLnByb2R1Y2VySWQgPT09IHRyYW5zcG9ydC5wcm9kdWNlcklkKSxcbiAgICAgICk7XG5cbiAgICAgIC8vIFBhdXNlIGNvbnN1bWVyIHRyYW5zcG9ydHMgYWZ0ZXIgYSBzaG9ydCBkZWxheVxuICAgICAgYXdhaXQgc2xlZXAoeyBtczogMTAwIH0pO1xuXG4gICAgICAvLyBFbWl0IGNvbnN1bWVyLnBhdXNlKCkgZm9yIGVhY2ggZmlsdGVyZWQgdHJhbnNwb3J0IChub3QgYXVkaW8pXG4gICAgICBmb3IgKGNvbnN0IHRyYW5zcG9ydCBvZiBjb25zdW1lclRyYW5zcG9ydHNUb1BhdXNlKSB7XG4gICAgICAgIHRyYW5zcG9ydC5jb25zdW1lci5wYXVzZSgpO1xuICAgICAgICB0cmFuc3BvcnQuc29ja2V0Xy5lbWl0KFxuICAgICAgICAgICdjb25zdW1lci1wYXVzZScsXG4gICAgICAgICAgeyBzZXJ2ZXJDb25zdW1lcklkOiB0cmFuc3BvcnQuc2VydmVyQ29uc3VtZXJUcmFuc3BvcnRJZCB9LFxuICAgICAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSB0aGUgcmVzcG9uc2UgaWYgbmVlZGVkXG4gICAgICAgICAgfSxcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gRW1pdCBjb25zdW1lci5yZXN1bWUoKSBmb3IgZWFjaCBmaWx0ZXJlZCB0cmFuc3BvcnQgKG5vdCBhdWRpbylcbiAgICAgIGZvciAoY29uc3QgdHJhbnNwb3J0IG9mIGNvbnN1bWVyVHJhbnNwb3J0c1RvUmVzdW1lKSB7XG4gICAgICAgIHRyYW5zcG9ydC5zb2NrZXRfLmVtaXQoXG4gICAgICAgICAgJ2NvbnN1bWVyLXJlc3VtZScsXG4gICAgICAgICAgeyBzZXJ2ZXJDb25zdW1lcklkOiB0cmFuc3BvcnQuc2VydmVyQ29uc3VtZXJUcmFuc3BvcnRJZCB9LFxuICAgICAgICAgIGFzeW5jICh7IHJlc3VtZWQgfTogeyByZXN1bWVkOiBib29sZWFuIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bWVkKSB7XG4gICAgICAgICAgICAgIHRyYW5zcG9ydC5jb25zdW1lci5yZXN1bWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIC8vIEhhbmRsZSBlcnJvcnMgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIHBhdXNpbmcgb3IgcmVzdW1pbmcgY29uc3VtZXIgdHJhbnNwb3J0c1xuICAgICAgY29uc29sZS5sb2coYEVycm9yIHByb2Nlc3NpbmcgY29uc3VtZXIgdHJhbnNwb3J0czogJHtlcnJvci5tZXNzYWdlfWApO1xuICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKGBFcnJvciBwcm9jZXNzaW5nIGNvbnN1bWVyIHRyYW5zcG9ydHM6ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICB9XG4gIH07XG59XG4iXX0=