import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvY2Vzcy1jb25zdW1lci10cmFuc3BvcnRzLWF1ZGlvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3Byb2Nlc3MtY29uc3VtZXItdHJhbnNwb3J0cy1hdWRpby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBdUIzQyxNQUFNLE9BQU8sOEJBQThCO0lBQ3pDOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILDhCQUE4QixHQUFHLEtBQUssRUFBRSxFQUN0QyxrQkFBa0IsRUFDbEIsUUFBUSxFQUNSLFVBQVUsR0FDNEIsRUFBaUIsRUFBRTtRQUN6RCxJQUFJLENBQUM7WUFDSCxNQUFNLEVBQUUsS0FBSyxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBRTdCLCtDQUErQztZQUMvQyxNQUFNLGlCQUFpQixHQUFHLENBQ3hCLFVBQWtCLEVBQ2xCLEdBQUcsWUFBd0MsRUFDbEMsRUFBRTtnQkFDWCxPQUFPLENBQ0wsVUFBVSxLQUFLLElBQUk7b0JBQ25CLFVBQVUsS0FBSyxFQUFFO29CQUNqQixZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7d0JBQ2hDLE9BQU8sQ0FDTCxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUM7NEJBQ3RCLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLEtBQUssVUFBVSxDQUFDLENBQ2hFLENBQUM7b0JBQ0osQ0FBQyxDQUFDLENBQ0gsQ0FBQztZQUNKLENBQUMsQ0FBQztZQUVGLGdEQUFnRDtZQUNoRCxNQUFNLDBCQUEwQixHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FDMUQsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUNaLGlCQUFpQixDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsUUFBUSxDQUFDO2dCQUNqRCxTQUFTLENBQUMsUUFBUSxFQUFFLE1BQU0sS0FBSyxJQUFJO2dCQUNuQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxPQUFPLENBQ3RDLENBQUM7WUFFRixrREFBa0Q7WUFDbEQsTUFBTSx5QkFBeUIsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQ3pELENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FDWixTQUFTLENBQUMsVUFBVTtnQkFDcEIsU0FBUyxDQUFDLFVBQVUsS0FBSyxJQUFJO2dCQUM3QixTQUFTLENBQUMsVUFBVSxLQUFLLEVBQUU7Z0JBQzNCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsVUFBVSxDQUFDO2dCQUN0RSxTQUFTLENBQUMsUUFBUTtnQkFDbEIsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJO2dCQUN2QixTQUFTLENBQUMsUUFBUSxDQUFDLE1BQU0sS0FBSyxJQUFJO2dCQUNsQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxPQUFPLENBQ3RDLENBQUM7WUFFRixNQUFNLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBRXpCLG9EQUFvRDtZQUNwRCxLQUFLLE1BQU0sU0FBUyxJQUFJLHlCQUF5QixFQUFFLENBQUM7Z0JBQ2xELFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQzNCLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNwQixnQkFBZ0IsRUFDaEIsRUFBRSxnQkFBZ0IsRUFBRSxTQUFTLENBQUMseUJBQXlCLEVBQUUsRUFDekQsS0FBSyxJQUFJLEVBQUU7b0JBQ1QsNENBQTRDO2dCQUM5QyxDQUFDLENBQ0YsQ0FBQztZQUNKLENBQUM7WUFFRCxzREFBc0Q7WUFDdEQsS0FBSyxNQUFNLFNBQVMsSUFBSSwwQkFBMEIsRUFBRSxDQUFDO2dCQUNuRCxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDcEIsaUJBQWlCLEVBQ2pCLEVBQUUsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLHlCQUF5QixFQUFFLEVBQ3pELEtBQUssRUFBRSxFQUFFLE9BQU8sRUFBd0IsRUFBRSxFQUFFO29CQUMxQyxJQUFJLE9BQU8sRUFBRSxDQUFDO3dCQUNaLFNBQVMsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUM7b0JBQzlCLENBQUM7Z0JBQ0gsQ0FBQyxDQUNGLENBQUM7WUFDSixDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7UUFDM0UsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0F6RlMsOEJBQThCOzJHQUE5Qiw4QkFBOEIsY0FGN0IsTUFBTTs7MkZBRVAsOEJBQThCO2tCQUgxQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFN0cmVhbSwgVHJhbnNwb3J0LCBQYXJ0aWNpcGFudCwgU2xlZXBUeXBlIH0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW9QYXJhbWV0ZXJzIHtcbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHNsZWVwOiBTbGVlcFR5cGU7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW9PcHRpb25zIHtcbiAgY29uc3VtZXJUcmFuc3BvcnRzOiBUcmFuc3BvcnRbXTtcbiAgbFN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcbiAgcGFyYW1ldGVyczogUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvVHlwZSA9IChcbiAgb3B0aW9uczogUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvT3B0aW9ucyxcbikgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbyB7XG4gIC8qKlxuICAgKiBQcm9jZXNzZXMgY29uc3VtZXIgdHJhbnNwb3J0cyBmb3IgYXVkaW8gc3RyZWFtcyBieSBwYXVzaW5nIGFuZCByZXN1bWluZyB0aGVtIGJhc2VkIG9uIHRoZWlyIGN1cnJlbnQgc3RhdGUgYW5kIHRoZSBwcm92aWRlZCBzdHJlYW1zLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBwcm9jZXNzaW5nIGNvbnN1bWVyIHRyYW5zcG9ydHMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMuY29uc3VtZXJUcmFuc3BvcnRzIC0gVGhlIGxpc3Qgb2YgY29uc3VtZXIgdHJhbnNwb3J0cyB0byBwcm9jZXNzLlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLmxTdHJlYW1zIC0gVGhlIGxpc3Qgb2YgbG9jYWwgc3RyZWFtcyB0byBjaGVjayBhZ2FpbnN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciBwcm9jZXNzaW5nLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2xlZXAgLSBBIGZ1bmN0aW9uIHRvIHBhdXNlIGV4ZWN1dGlvbiBmb3IgYSBzcGVjaWZpZWQgZHVyYXRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBwcm9jZXNzaW5nIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYW4gaXNzdWUgcHJvY2Vzc2luZyB0aGUgY29uc3VtZXIgdHJhbnNwb3J0cy5cbiAgICovXG4gIHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbyA9IGFzeW5jICh7XG4gICAgY29uc3VtZXJUcmFuc3BvcnRzLFxuICAgIGxTdHJlYW1zLFxuICAgIHBhcmFtZXRlcnMsXG4gIH06IFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpb09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBzbGVlcCB9ID0gcGFyYW1ldGVycztcblxuICAgICAgLy8gRnVuY3Rpb24gdG8gY2hlY2sgaWYgdGhlIHByb2R1Y2VySWQgaXMgdmFsaWRcbiAgICAgIGNvbnN0IGlzVmFsaWRQcm9kdWNlcklkID0gKFxuICAgICAgICBwcm9kdWNlcklkOiBzdHJpbmcsXG4gICAgICAgIC4uLnN0cmVhbUFycmF5czogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdW11cbiAgICAgICk6IGJvb2xlYW4gPT4ge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIHByb2R1Y2VySWQgIT09IG51bGwgJiZcbiAgICAgICAgICBwcm9kdWNlcklkICE9PSAnJyAmJlxuICAgICAgICAgIHN0cmVhbUFycmF5cy5zb21lKChzdHJlYW1BcnJheSkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgc3RyZWFtQXJyYXkubGVuZ3RoID4gMCAmJlxuICAgICAgICAgICAgICBzdHJlYW1BcnJheS5zb21lKChzdHJlYW0pID0+IHN0cmVhbT8ucHJvZHVjZXJJZCA9PT0gcHJvZHVjZXJJZClcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH07XG5cbiAgICAgIC8vIEdldCBwYXVzZWQgY29uc3VtZXIgdHJhbnNwb3J0cyB0aGF0IGFyZSBhdWRpb1xuICAgICAgY29uc3QgY29uc3VtZXJUcmFuc3BvcnRzVG9SZXN1bWUgPSBjb25zdW1lclRyYW5zcG9ydHMuZmlsdGVyKFxuICAgICAgICAodHJhbnNwb3J0KSA9PlxuICAgICAgICAgIGlzVmFsaWRQcm9kdWNlcklkKHRyYW5zcG9ydC5wcm9kdWNlcklkLCBsU3RyZWFtcykgJiZcbiAgICAgICAgICB0cmFuc3BvcnQuY29uc3VtZXI/LnBhdXNlZCA9PT0gdHJ1ZSAmJlxuICAgICAgICAgIHRyYW5zcG9ydC5jb25zdW1lci5raW5kID09PSAnYXVkaW8nLFxuICAgICAgKTtcblxuICAgICAgLy8gR2V0IHVucGF1c2VkIGNvbnN1bWVyIHRyYW5zcG9ydHMgdGhhdCBhcmUgYXVkaW9cbiAgICAgIGNvbnN0IGNvbnN1bWVyVHJhbnNwb3J0c1RvUGF1c2UgPSBjb25zdW1lclRyYW5zcG9ydHMuZmlsdGVyKFxuICAgICAgICAodHJhbnNwb3J0KSA9PlxuICAgICAgICAgIHRyYW5zcG9ydC5wcm9kdWNlcklkICYmXG4gICAgICAgICAgdHJhbnNwb3J0LnByb2R1Y2VySWQgIT09IG51bGwgJiZcbiAgICAgICAgICB0cmFuc3BvcnQucHJvZHVjZXJJZCAhPT0gJycgJiZcbiAgICAgICAgICAhbFN0cmVhbXMuc29tZSgoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCA9PT0gdHJhbnNwb3J0LnByb2R1Y2VySWQpICYmXG4gICAgICAgICAgdHJhbnNwb3J0LmNvbnN1bWVyICYmXG4gICAgICAgICAgdHJhbnNwb3J0LmNvbnN1bWVyLmtpbmQgJiZcbiAgICAgICAgICB0cmFuc3BvcnQuY29uc3VtZXIucGF1c2VkICE9PSB0cnVlICYmXG4gICAgICAgICAgdHJhbnNwb3J0LmNvbnN1bWVyLmtpbmQgPT09ICdhdWRpbycsXG4gICAgICApO1xuXG4gICAgICBhd2FpdCBzbGVlcCh7IG1zOiAxMDAgfSk7XG5cbiAgICAgIC8vIEVtaXQgY29uc3VtZXIucGF1c2UoKSBmb3IgZWFjaCB0cmFuc3BvcnQgdG8gcGF1c2VcbiAgICAgIGZvciAoY29uc3QgdHJhbnNwb3J0IG9mIGNvbnN1bWVyVHJhbnNwb3J0c1RvUGF1c2UpIHtcbiAgICAgICAgdHJhbnNwb3J0LmNvbnN1bWVyLnBhdXNlKCk7XG4gICAgICAgIHRyYW5zcG9ydC5zb2NrZXRfLmVtaXQoXG4gICAgICAgICAgJ2NvbnN1bWVyLXBhdXNlJyxcbiAgICAgICAgICB7IHNlcnZlckNvbnN1bWVySWQ6IHRyYW5zcG9ydC5zZXJ2ZXJDb25zdW1lclRyYW5zcG9ydElkIH0sXG4gICAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgLy8gRG8gc29tZXRoaW5nIGFmdGVyIHRoZSBjb25zdW1lciBpcyBwYXVzZWRcbiAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBFbWl0IGNvbnN1bWVyLnJlc3VtZSgpIGZvciBlYWNoIHRyYW5zcG9ydCB0byByZXN1bWVcbiAgICAgIGZvciAoY29uc3QgdHJhbnNwb3J0IG9mIGNvbnN1bWVyVHJhbnNwb3J0c1RvUmVzdW1lKSB7XG4gICAgICAgIHRyYW5zcG9ydC5zb2NrZXRfLmVtaXQoXG4gICAgICAgICAgJ2NvbnN1bWVyLXJlc3VtZScsXG4gICAgICAgICAgeyBzZXJ2ZXJDb25zdW1lcklkOiB0cmFuc3BvcnQuc2VydmVyQ29uc3VtZXJUcmFuc3BvcnRJZCB9LFxuICAgICAgICAgIGFzeW5jICh7IHJlc3VtZWQgfTogeyByZXN1bWVkOiBib29sZWFuIH0pID0+IHtcbiAgICAgICAgICAgIGlmIChyZXN1bWVkKSB7XG4gICAgICAgICAgICAgIHRyYW5zcG9ydC5jb25zdW1lci5yZXN1bWUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIGNvbnNvbGUubG9nKGBFcnJvciBpbiBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW86ICR7ZXJyb3IubWVzc2FnZX1gKTtcbiAgICB9XG4gIH07XG59XG4iXX0=