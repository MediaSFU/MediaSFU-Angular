// piped-producers.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class GetPipedProducersAlt {
    /**
     * Retrieves piped producers and signals new consumer transport for each retrieved producer.
     *
     * @param {Object} options - The options for retrieving piped producers.
     * @param {WebSocket} options.nsock - The WebSocket instance used for communication.
     * @param {boolean} options.islevel - A flag indicating the level of the request.
     * @param {Object} options.parameters - Additional parameters for the request.
     * @param {string} options.parameters.member - The member identifier.
     * @param {Function} options.parameters.signalNewConsumerTransport - A function to signal new consumer transport.
     *
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     *
     * @throws {Error} If an error occurs during the process of retrieving producers.
     */
    async getPipedProducersAlt({ nsock, islevel, parameters, }) {
        try {
            // Destructure parameters
            const { member, signalNewConsumerTransport } = parameters;
            // Emit request to get piped producers using WebSocket
            nsock.emit('getProducersPipedAlt', { islevel, member }, async (producerIds) => {
                // Check if producers are retrieved
                if (producerIds.length > 0) {
                    // Signal new consumer transport for each retrieved producer
                    for (const id of producerIds) {
                        await signalNewConsumerTransport({ nsock, remoteProducerId: id, islevel, parameters });
                    }
                }
            });
        }
        catch (error) {
            // Handle errors during the process of retrieving producers
            console.log('Error getting piped producers:', error.message);
            // throw error;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GetPipedProducersAlt, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GetPipedProducersAlt, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GetPipedProducersAlt, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXBpcGVkLXByb2R1Y2Vycy1hbHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvZ2V0LXBpcGVkLXByb2R1Y2Vycy1hbHQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2QkFBNkI7QUFDN0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUE0QjNDLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxFQUN6QixLQUFLLEVBQ0wsT0FBTyxFQUNQLFVBQVUsR0FDa0I7UUFDNUIsSUFBSSxDQUFDO1lBQ0gseUJBQXlCO1lBQ3pCLE1BQU0sRUFBRSxNQUFNLEVBQUUsMEJBQTBCLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFFMUQsc0RBQXNEO1lBQ3RELEtBQUssQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQXFCLEVBQUUsRUFBRTtnQkFDdEYsbUNBQW1DO2dCQUNuQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQzNCLDREQUE0RDtvQkFDNUQsS0FBSyxNQUFNLEVBQUUsSUFBSSxXQUFXLEVBQUUsQ0FBQzt3QkFDN0IsTUFBTSwwQkFBMEIsQ0FBQyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7b0JBQ3pGLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsMkRBQTJEO1lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdELGVBQWU7UUFDakIsQ0FBQztJQUNILENBQUM7dUdBdkNVLG9CQUFvQjsyR0FBcEIsb0JBQW9CLGNBRm5CLE1BQU07OzJGQUVQLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwaXBlZC1wcm9kdWNlcnMuc2VydmljZS50c1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmltcG9ydCB7XG4gIFNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0UGFyYW1ldGVycyxcbiAgU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnRUeXBlLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdldFBpcGVkUHJvZHVjZXJzQWx0UGFyYW1ldGVycyBleHRlbmRzIFNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0UGFyYW1ldGVycyB7XG4gIG1lbWJlcjogc3RyaW5nO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBzaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydDogU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnRUeXBlO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2V0UGlwZWRQcm9kdWNlcnNBbHRPcHRpb25zIHtcbiAgbnNvY2s6IFNvY2tldDtcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBHZXRQaXBlZFByb2R1Y2Vyc0FsdFBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEdldFBpcGVkUHJvZHVjZXJzQWx0VHlwZSA9IChvcHRpb25zOiBHZXRQaXBlZFByb2R1Y2Vyc0FsdE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBHZXRQaXBlZFByb2R1Y2Vyc0FsdCB7XG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgcGlwZWQgcHJvZHVjZXJzIGFuZCBzaWduYWxzIG5ldyBjb25zdW1lciB0cmFuc3BvcnQgZm9yIGVhY2ggcmV0cmlldmVkIHByb2R1Y2VyLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZXRyaWV2aW5nIHBpcGVkIHByb2R1Y2Vycy5cbiAgICogQHBhcmFtIHtXZWJTb2NrZXR9IG9wdGlvbnMubnNvY2sgLSBUaGUgV2ViU29ja2V0IGluc3RhbmNlIHVzZWQgZm9yIGNvbW11bmljYXRpb24uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc2xldmVsIC0gQSBmbGFnIGluZGljYXRpbmcgdGhlIGxldmVsIG9mIHRoZSByZXF1ZXN0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgcmVxdWVzdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZW1iZXIgLSBUaGUgbWVtYmVyIGlkZW50aWZpZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCAtIEEgZnVuY3Rpb24gdG8gc2lnbmFsIG5ldyBjb25zdW1lciB0cmFuc3BvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBvcGVyYXRpb24gaXMgY29tcGxldGUuXG4gICAqXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIHJldHJpZXZpbmcgcHJvZHVjZXJzLlxuICAgKi9cbiAgYXN5bmMgZ2V0UGlwZWRQcm9kdWNlcnNBbHQoe1xuICAgIG5zb2NrLFxuICAgIGlzbGV2ZWwsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogR2V0UGlwZWRQcm9kdWNlcnNBbHRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIERlc3RydWN0dXJlIHBhcmFtZXRlcnNcbiAgICAgIGNvbnN0IHsgbWVtYmVyLCBzaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCB9ID0gcGFyYW1ldGVycztcblxuICAgICAgLy8gRW1pdCByZXF1ZXN0IHRvIGdldCBwaXBlZCBwcm9kdWNlcnMgdXNpbmcgV2ViU29ja2V0XG4gICAgICBuc29jay5lbWl0KCdnZXRQcm9kdWNlcnNQaXBlZEFsdCcsIHsgaXNsZXZlbCwgbWVtYmVyIH0sIGFzeW5jIChwcm9kdWNlcklkczogc3RyaW5nW10pID0+IHtcbiAgICAgICAgLy8gQ2hlY2sgaWYgcHJvZHVjZXJzIGFyZSByZXRyaWV2ZWRcbiAgICAgICAgaWYgKHByb2R1Y2VySWRzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAvLyBTaWduYWwgbmV3IGNvbnN1bWVyIHRyYW5zcG9ydCBmb3IgZWFjaCByZXRyaWV2ZWQgcHJvZHVjZXJcbiAgICAgICAgICBmb3IgKGNvbnN0IGlkIG9mIHByb2R1Y2VySWRzKSB7XG4gICAgICAgICAgICBhd2FpdCBzaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCh7IG5zb2NrLCByZW1vdGVQcm9kdWNlcklkOiBpZCwgaXNsZXZlbCwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIC8vIEhhbmRsZSBlcnJvcnMgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIHJldHJpZXZpbmcgcHJvZHVjZXJzXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgZ2V0dGluZyBwaXBlZCBwcm9kdWNlcnM6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICAvLyB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==