import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjZXItY2xvc2VkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcHJvZHVjZXItY2xvc2VkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF5QjNDLE1BQU0sT0FBTyxjQUFjO0lBQ3pCOzs7Ozs7T0FNRztJQUNILGNBQWMsR0FBRyxLQUFLLEVBQUUsRUFDdEIsZ0JBQWdCLEVBQ2hCLFVBQVUsR0FDWSxFQUFpQixFQUFFO1FBQ3pDLElBQUksRUFDRixrQkFBa0IsRUFDbEIsUUFBUSxFQUNSLHdCQUF3QjtRQUV4QixxQkFBcUI7UUFDckIsY0FBYyxHQUNmLEdBQUcsVUFBVSxDQUFDO1FBRWYseUJBQXlCO1FBQ3pCLE1BQU0sZUFBZSxHQUFHLGtCQUFrQixDQUFDLElBQUksQ0FDN0MsQ0FBQyxhQUFrQixFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxLQUFLLGdCQUFnQixDQUN0RSxDQUFDO1FBRUYsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3JCLE9BQU87UUFDVCxDQUFDO1FBRUQsMERBQTBEO1FBQzFELElBQUksSUFBSSxHQUFXLGVBQWUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDO1FBRWpELElBQUksZUFBZSxDQUFDLFVBQVUsSUFBSSxRQUFRLEVBQUUsQ0FBQztZQUMzQyxJQUFJLEdBQUcsYUFBYSxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxJQUFJLENBQUM7WUFDSCxNQUFNLGVBQWUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ3JELENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUMzRCxDQUFDO1FBRUQsSUFBSSxDQUFDO1lBQ0gsZUFBZSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQyxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMseUJBQXlCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEQsQ0FBQztRQUVELGtCQUFrQixHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FDNUMsQ0FBQyxhQUFrQixFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsVUFBVSxLQUFLLGdCQUFnQixDQUN0RSxDQUFDO1FBQ0Ysd0JBQXdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUU3Qyw4QkFBOEI7UUFDOUIsTUFBTSxjQUFjLENBQUMsRUFBRSxVQUFVLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUM3RixDQUFDLENBQUM7dUdBdkRTLGNBQWM7MkdBQWQsY0FBYyxjQUZiLE1BQU07OzJGQUVQLGNBQWM7a0JBSDFCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJhbnNwb3J0LCBDbG9zZUFuZFJlc2l6ZVBhcmFtZXRlcnMsIENsb3NlQW5kUmVzaXplVHlwZSB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjZXJDbG9zZWRQYXJhbWV0ZXJzIGV4dGVuZHMgQ2xvc2VBbmRSZXNpemVQYXJhbWV0ZXJzIHtcbiAgY29uc3VtZXJUcmFuc3BvcnRzOiBUcmFuc3BvcnRbXTtcbiAgc2NyZWVuSWQ/OiBzdHJpbmc7XG4gIHVwZGF0ZUNvbnN1bWVyVHJhbnNwb3J0czogKHRyYW5zcG9ydHM6IFRyYW5zcG9ydFtdKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBjbG9zZUFuZFJlc2l6ZTogQ2xvc2VBbmRSZXNpemVUeXBlO1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBQcm9kdWNlckNsb3NlZFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9kdWNlckNsb3NlZE9wdGlvbnMge1xuICByZW1vdGVQcm9kdWNlcklkOiBzdHJpbmc7XG4gIHBhcmFtZXRlcnM6IFByb2R1Y2VyQ2xvc2VkUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUHJvZHVjZXJDbG9zZWRUeXBlID0gKG9wdGlvbnM6IFByb2R1Y2VyQ2xvc2VkT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFByb2R1Y2VyQ2xvc2VkIHtcbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGNsb3Npbmcgb2YgYSBwcm9kdWNlciBhbmQgcmVzaXplcyB2aWRlbyBlbGVtZW50cy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyBuZWNlc3NhcnkgdmFyaWFibGVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yZW1vdGVQcm9kdWNlcklkIC0gVGhlIElEIG9mIHRoZSByZW1vdGUgcHJvZHVjZXIuXG4gICAqIEBwYXJhbSB7YW55fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIHRoZSBmdW5jdGlvbi5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59XG4gICAqL1xuICBwcm9kdWNlckNsb3NlZCA9IGFzeW5jICh7XG4gICAgcmVtb3RlUHJvZHVjZXJJZCxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBQcm9kdWNlckNsb3NlZE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBsZXQge1xuICAgICAgY29uc3VtZXJUcmFuc3BvcnRzLFxuICAgICAgc2NyZWVuSWQsXG4gICAgICB1cGRhdGVDb25zdW1lclRyYW5zcG9ydHMsXG5cbiAgICAgIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICAgICAgY2xvc2VBbmRSZXNpemUsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAvLyBIYW5kbGUgcHJvZHVjZXIgY2xvc2VkXG4gICAgY29uc3QgcHJvZHVjZXJUb0Nsb3NlID0gY29uc3VtZXJUcmFuc3BvcnRzLmZpbmQoXG4gICAgICAodHJhbnNwb3J0RGF0YTogYW55KSA9PiB0cmFuc3BvcnREYXRhLnByb2R1Y2VySWQgPT09IHJlbW90ZVByb2R1Y2VySWQsXG4gICAgKTtcblxuICAgIGlmICghcHJvZHVjZXJUb0Nsb3NlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgdGhlIElEIG9mIHRoZSBwcm9kdWNlciB0byBjbG9zZSBpcyA9PSBzY3JlZW5JZFxuICAgIGxldCBraW5kOiBzdHJpbmcgPSBwcm9kdWNlclRvQ2xvc2UuY29uc3VtZXIua2luZDtcblxuICAgIGlmIChwcm9kdWNlclRvQ2xvc2UucHJvZHVjZXJJZCA9PSBzY3JlZW5JZCkge1xuICAgICAga2luZCA9ICdzY3JlZW5zaGFyZSc7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBwcm9kdWNlclRvQ2xvc2VbJ2NvbnN1bWVyVHJhbnNwb3J0J10uY2xvc2UoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY2xvc2luZyBjb25zdW1lclRyYW5zcG9ydDonLCBlcnJvcik7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHByb2R1Y2VyVG9DbG9zZS5jb25zdW1lci5jbG9zZSgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjbG9zaW5nIGNvbnN1bWVyOicsIGVycm9yKTtcbiAgICB9XG5cbiAgICBjb25zdW1lclRyYW5zcG9ydHMgPSBjb25zdW1lclRyYW5zcG9ydHMuZmlsdGVyKFxuICAgICAgKHRyYW5zcG9ydERhdGE6IGFueSkgPT4gdHJhbnNwb3J0RGF0YS5wcm9kdWNlcklkICE9PSByZW1vdGVQcm9kdWNlcklkLFxuICAgICk7XG4gICAgdXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzKGNvbnN1bWVyVHJhbnNwb3J0cyk7XG5cbiAgICAvLyBDbG9zZSBhbmQgcmVzaXplIHRoZSB2aWRlb3NcbiAgICBhd2FpdCBjbG9zZUFuZFJlc2l6ZSh7IHByb2R1Y2VySWQ6IHJlbW90ZVByb2R1Y2VySWQsIGtpbmQ6IGtpbmQsIHBhcmFtZXRlcnM6IHBhcmFtZXRlcnMgfSk7XG4gIH07XG59XG4iXX0=