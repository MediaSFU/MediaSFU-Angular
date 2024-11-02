import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * @service ProducerClosed
 * @description Service to manage the closing of a producer, including resizing video elements and updating consumer transports.
 *
 * @method producerClosed
 * Closes a specific producer by its ID, adjusts any associated video elements, and updates the list of consumer transports.
 *
 * @param {ProducerClosedOptions} options - Options for closing the specified producer.
 * @param {string} options.remoteProducerId - Unique ID for the producer to close.
 * @param {ProducerClosedParameters} options.parameters - Parameters to configure the producer closure and related updates.
 *
 * @returns {Promise<void>} A promise that resolves when the producer has been closed and relevant updates have been made.
 *
 * @example
 * ```typescript
 * await producerClosedService.producerClosed({
 *   remoteProducerId: 'producer123',
 *   parameters: {
 *     consumerTransports: currentTransports,
 *     screenId: 'screen123',
 *     updateConsumerTransports: updateTransportList,
 *     closeAndResize: closeAndResizeFunction,
 *     getUpdatedAllParams: getUpdatedParamsFunction,
 *   }
 * });
 * ```
 */
export class ProducerClosed {
    /**
     * Handles the closing of a producer and resizes video elements.
     * @param {Object} options - The options object containing necessary variables.
     * @param {string} options.remoteProducerId - The ID of the remote producer.
     * @param {any} options.parameters - Additional parameters required for the function.
     * @returns {Promise<void>}
     */
    producerClosed = async ({ remoteProducerId, parameters, }) => {
        let { consumerTransports, screenId, updateConsumerTransports, 
        // mediasfu functions
        closeAndResize, } = parameters;
        // Handle producer closed
        const producerToClose = consumerTransports.find((transportData) => transportData.producerId === remoteProducerId);
        if (!producerToClose) {
            return;
        }
        // Check if the ID of the producer to close is == screenId
        let kind = producerToClose.consumer.kind;
        if (producerToClose.producerId == screenId) {
            kind = 'screenshare';
        }
        try {
            await producerToClose['consumerTransport'].close();
        }
        catch (error) {
            console.error('Error closing consumerTransport:', error);
        }
        try {
            producerToClose.consumer.close();
        }
        catch (error) {
            console.error('Error closing consumer:', error);
        }
        consumerTransports = consumerTransports.filter((transportData) => transportData.producerId !== remoteProducerId);
        updateConsumerTransports(consumerTransports);
        // Close and resize the videos
        await closeAndResize({ producerId: remoteProducerId, kind: kind, parameters: parameters });
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProducerClosed, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProducerClosed, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProducerClosed, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjZXItY2xvc2VkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcHJvZHVjZXItY2xvc2VkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFzQjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQU1ILE1BQU0sT0FBTyxjQUFjO0lBQ3pCOzs7Ozs7T0FNRztJQUNILGNBQWMsR0FBRyxLQUFLLEVBQUUsRUFDdEIsZ0JBQWdCLEVBQ2hCLFVBQVUsR0FDWSxFQUFpQixFQUFFO1FBQ3pDLElBQUksRUFDRixrQkFBa0IsRUFDbEIsUUFBUSxFQUNSLHdCQUF3QjtRQUV4QixxQkFBcUI7UUFDckIsY0FBYyxHQUNmLEdBQUcsVUFBVSxDQUFDO1FBRWYseUJBQXlCO1FBQ3pCLE1BQU0sZUFBZSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FDN0MsQ0FBQyxhQUFrQixFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxLQUFLLGdCQUFnQixDQUN0RSxDQUFDO1FBRUYsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3JCLE9BQU87UUFDVCxDQUFDO1FBRUQsMERBQTBEO1FBQzFELElBQUksSUFBSSxHQUFXLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRWpELElBQUksZUFBZSxDQUFDLFVBQVUsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUMzQyxJQUFJLEdBQUcsYUFBYSxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxJQUFJLENBQUM7WUFDSCxNQUFNLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JELENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBRUQsSUFBSSxDQUFDO1lBQ0gsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQyxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVELGtCQUFrQixHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FDNUMsQ0FBQyxhQUFrQixFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxLQUFLLGdCQUFnQixDQUN0RSxDQUFDO1FBQ0Ysd0JBQXdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUU3Qyw4QkFBOEI7UUFDOUIsTUFBTSxjQUFjLENBQUMsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUM3RixDQUFDLENBQUM7dUdBdkRTLGNBQWM7MkdBQWQsY0FBYyxjQUZiLE1BQU07OzJGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNwb3J0LCBDbG9zZUFuZFJlc2l6ZVBhcmFtZXRlcnMsIENsb3NlQW5kUmVzaXplVHlwZSB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjZXJDbG9zZWRQYXJhbWV0ZXJzIGV4dGVuZHMgQ2xvc2VBbmRSZXNpemVQYXJhbWV0ZXJzIHtcbiAgY29uc3VtZXJUcmFuc3BvcnRzOiBUcmFuc3BvcnRbXTtcbiAgc2NyZWVuSWQ/OiBzdHJpbmc7XG4gIHVwZGF0ZUNvbnN1bWVyVHJhbnNwb3J0czogKHRyYW5zcG9ydHM6IFRyYW5zcG9ydFtdKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBjbG9zZUFuZFJlc2l6ZTogQ2xvc2VBbmRSZXNpemVUeXBlO1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBQcm9kdWNlckNsb3NlZFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9kdWNlckNsb3NlZE9wdGlvbnMge1xuICByZW1vdGVQcm9kdWNlcklkOiBzdHJpbmc7XG4gIHBhcmFtZXRlcnM6IFByb2R1Y2VyQ2xvc2VkUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUHJvZHVjZXJDbG9zZWRUeXBlID0gKG9wdGlvbnM6IFByb2R1Y2VyQ2xvc2VkT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBAc2VydmljZSBQcm9kdWNlckNsb3NlZFxuICogQGRlc2NyaXB0aW9uIFNlcnZpY2UgdG8gbWFuYWdlIHRoZSBjbG9zaW5nIG9mIGEgcHJvZHVjZXIsIGluY2x1ZGluZyByZXNpemluZyB2aWRlbyBlbGVtZW50cyBhbmQgdXBkYXRpbmcgY29uc3VtZXIgdHJhbnNwb3J0cy5cbiAqXG4gKiBAbWV0aG9kIHByb2R1Y2VyQ2xvc2VkXG4gKiBDbG9zZXMgYSBzcGVjaWZpYyBwcm9kdWNlciBieSBpdHMgSUQsIGFkanVzdHMgYW55IGFzc29jaWF0ZWQgdmlkZW8gZWxlbWVudHMsIGFuZCB1cGRhdGVzIHRoZSBsaXN0IG9mIGNvbnN1bWVyIHRyYW5zcG9ydHMuXG4gKlxuICogQHBhcmFtIHtQcm9kdWNlckNsb3NlZE9wdGlvbnN9IG9wdGlvbnMgLSBPcHRpb25zIGZvciBjbG9zaW5nIHRoZSBzcGVjaWZpZWQgcHJvZHVjZXIuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yZW1vdGVQcm9kdWNlcklkIC0gVW5pcXVlIElEIGZvciB0aGUgcHJvZHVjZXIgdG8gY2xvc2UuXG4gKiBAcGFyYW0ge1Byb2R1Y2VyQ2xvc2VkUGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gUGFyYW1ldGVycyB0byBjb25maWd1cmUgdGhlIHByb2R1Y2VyIGNsb3N1cmUgYW5kIHJlbGF0ZWQgdXBkYXRlcy5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcHJvZHVjZXIgaGFzIGJlZW4gY2xvc2VkIGFuZCByZWxldmFudCB1cGRhdGVzIGhhdmUgYmVlbiBtYWRlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBhd2FpdCBwcm9kdWNlckNsb3NlZFNlcnZpY2UucHJvZHVjZXJDbG9zZWQoe1xuICogICByZW1vdGVQcm9kdWNlcklkOiAncHJvZHVjZXIxMjMnLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgY29uc3VtZXJUcmFuc3BvcnRzOiBjdXJyZW50VHJhbnNwb3J0cyxcbiAqICAgICBzY3JlZW5JZDogJ3NjcmVlbjEyMycsXG4gKiAgICAgdXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzOiB1cGRhdGVUcmFuc3BvcnRMaXN0LFxuICogICAgIGNsb3NlQW5kUmVzaXplOiBjbG9zZUFuZFJlc2l6ZUZ1bmN0aW9uLFxuICogICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6IGdldFVwZGF0ZWRQYXJhbXNGdW5jdGlvbixcbiAqICAgfVxuICogfSk7XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWNlckNsb3NlZCB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBjbG9zaW5nIG9mIGEgcHJvZHVjZXIgYW5kIHJlc2l6ZXMgdmlkZW8gZWxlbWVudHMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgbmVjZXNzYXJ5IHZhcmlhYmxlcy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucmVtb3RlUHJvZHVjZXJJZCAtIFRoZSBJRCBvZiB0aGUgcmVtb3RlIHByb2R1Y2VyLlxuICAgKiBAcGFyYW0ge2FueX0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciB0aGUgZnVuY3Rpb24uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgcHJvZHVjZXJDbG9zZWQgPSBhc3luYyAoe1xuICAgIHJlbW90ZVByb2R1Y2VySWQsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogUHJvZHVjZXJDbG9zZWRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgbGV0IHtcbiAgICAgIGNvbnN1bWVyVHJhbnNwb3J0cyxcbiAgICAgIHNjcmVlbklkLFxuICAgICAgdXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzLFxuXG4gICAgICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgIGNsb3NlQW5kUmVzaXplLFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgLy8gSGFuZGxlIHByb2R1Y2VyIGNsb3NlZFxuICAgIGNvbnN0IHByb2R1Y2VyVG9DbG9zZSA9IGNvbnN1bWVyVHJhbnNwb3J0cy5maW5kKFxuICAgICAgKHRyYW5zcG9ydERhdGE6IGFueSkgPT4gdHJhbnNwb3J0RGF0YS5wcm9kdWNlcklkID09PSByZW1vdGVQcm9kdWNlcklkLFxuICAgICk7XG5cbiAgICBpZiAoIXByb2R1Y2VyVG9DbG9zZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHRoZSBJRCBvZiB0aGUgcHJvZHVjZXIgdG8gY2xvc2UgaXMgPT0gc2NyZWVuSWRcbiAgICBsZXQga2luZDogc3RyaW5nID0gcHJvZHVjZXJUb0Nsb3NlLmNvbnN1bWVyLmtpbmQ7XG5cbiAgICBpZiAocHJvZHVjZXJUb0Nsb3NlLnByb2R1Y2VySWQgPT0gc2NyZWVuSWQpIHtcbiAgICAgIGtpbmQgPSAnc2NyZWVuc2hhcmUnO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgYXdhaXQgcHJvZHVjZXJUb0Nsb3NlWydjb25zdW1lclRyYW5zcG9ydCddLmNsb3NlKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNsb3NpbmcgY29uc3VtZXJUcmFuc3BvcnQ6JywgZXJyb3IpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBwcm9kdWNlclRvQ2xvc2UuY29uc3VtZXIuY2xvc2UoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY2xvc2luZyBjb25zdW1lcjonLCBlcnJvcik7XG4gICAgfVxuXG4gICAgY29uc3VtZXJUcmFuc3BvcnRzID0gY29uc3VtZXJUcmFuc3BvcnRzLmZpbHRlcihcbiAgICAgICh0cmFuc3BvcnREYXRhOiBhbnkpID0+IHRyYW5zcG9ydERhdGEucHJvZHVjZXJJZCAhPT0gcmVtb3RlUHJvZHVjZXJJZCxcbiAgICApO1xuICAgIHVwZGF0ZUNvbnN1bWVyVHJhbnNwb3J0cyhjb25zdW1lclRyYW5zcG9ydHMpO1xuXG4gICAgLy8gQ2xvc2UgYW5kIHJlc2l6ZSB0aGUgdmlkZW9zXG4gICAgYXdhaXQgY2xvc2VBbmRSZXNpemUoeyBwcm9kdWNlcklkOiByZW1vdGVQcm9kdWNlcklkLCBraW5kOiBraW5kLCBwYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzIH0pO1xuICB9O1xufVxuIl19