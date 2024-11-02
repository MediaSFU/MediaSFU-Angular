// piped-producers.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Retrieves piped producers and signals new consumer transport for each retrieved producer.
 *
 * @param {GetPipedProducersAltOptions} options - The options for retrieving piped producers.
 * @param {Socket} options.nsock - The WebSocket instance used for communication.
 * @param {string} options.islevel - A flag indicating the level of the request.
 * @param {GetPipedProducersAltParameters} options.parameters - Additional parameters for the request.
 * @param {string} options.parameters.member - The member identifier.
 * @param {SignalNewConsumerTransportType} options.parameters.signalNewConsumerTransport - A function to signal new consumer transport.
 *
 * @returns {Promise<void>} A promise that resolves when the operation is complete.
 *
 * @throws {Error} If an error occurs during the process of retrieving producers.
 *
 * @example
 * ```typescript
 * const options = {
 *   nsock: socketInstance,
 *   islevel: '2',
 *   parameters: {
 *     member: 'user123',
 *     signalNewConsumerTransport: async ({ nsock, remoteProducerId, islevel, parameters }) => {
 *       // Implementation to signal new consumer transport
 *       console.log(`Signaling new consumer transport for producer: ${remoteProducerId}`);
 *     },
 *   },
 * };
 *
 * const getPipedProducersService = new GetPipedProducersAlt();
 * await getPipedProducersService.getPipedProducersAlt(options);
 * console.log('Piped producers retrieved successfully.');
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXBpcGVkLXByb2R1Y2Vycy1hbHQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvZ2V0LXBpcGVkLXByb2R1Y2Vycy1hbHQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSw2QkFBNkI7QUFDN0IsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF5QjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQU1ILE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxFQUN6QixLQUFLLEVBQ0wsT0FBTyxFQUNQLFVBQVUsR0FDa0I7UUFDNUIsSUFBSSxDQUFDO1lBQ0gseUJBQXlCO1lBQ3pCLE1BQU0sRUFBRSxNQUFNLEVBQUUsMEJBQTBCLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFFMUQsc0RBQXNEO1lBQ3RELEtBQUssQ0FBQyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLFdBQXFCLEVBQUUsRUFBRTtnQkFDdEYsbUNBQW1DO2dCQUNuQyxJQUFJLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQzNCLDREQUE0RDtvQkFDNUQsS0FBSyxNQUFNLEVBQUUsSUFBSSxXQUFXLEVBQUUsQ0FBQzt3QkFDN0IsTUFBTSwwQkFBMEIsQ0FBQyxFQUFFLEtBQUssRUFBRSxnQkFBZ0IsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7b0JBQ3pGLENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsMkRBQTJEO1lBQzNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzdELGVBQWU7UUFDakIsQ0FBQztJQUNILENBQUM7dUdBdkNVLG9CQUFvQjsyR0FBcEIsb0JBQW9CLGNBRm5CLE1BQU07OzJGQUVQLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBwaXBlZC1wcm9kdWNlcnMuc2VydmljZS50c1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmltcG9ydCB7XG4gIFNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0UGFyYW1ldGVycyxcbiAgU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnRUeXBlLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdldFBpcGVkUHJvZHVjZXJzQWx0UGFyYW1ldGVycyBleHRlbmRzIFNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0UGFyYW1ldGVycyB7XG4gIG1lbWJlcjogc3RyaW5nO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBzaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydDogU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnRUeXBlO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2V0UGlwZWRQcm9kdWNlcnNBbHRPcHRpb25zIHtcbiAgbnNvY2s6IFNvY2tldDtcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBHZXRQaXBlZFByb2R1Y2Vyc0FsdFBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEdldFBpcGVkUHJvZHVjZXJzQWx0VHlwZSA9IChvcHRpb25zOiBHZXRQaXBlZFByb2R1Y2Vyc0FsdE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogUmV0cmlldmVzIHBpcGVkIHByb2R1Y2VycyBhbmQgc2lnbmFscyBuZXcgY29uc3VtZXIgdHJhbnNwb3J0IGZvciBlYWNoIHJldHJpZXZlZCBwcm9kdWNlci5cbiAqXG4gKiBAcGFyYW0ge0dldFBpcGVkUHJvZHVjZXJzQWx0T3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZXRyaWV2aW5nIHBpcGVkIHByb2R1Y2Vycy5cbiAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLm5zb2NrIC0gVGhlIFdlYlNvY2tldCBpbnN0YW5jZSB1c2VkIGZvciBjb21tdW5pY2F0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuaXNsZXZlbCAtIEEgZmxhZyBpbmRpY2F0aW5nIHRoZSBsZXZlbCBvZiB0aGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7R2V0UGlwZWRQcm9kdWNlcnNBbHRQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZW1iZXIgLSBUaGUgbWVtYmVyIGlkZW50aWZpZXIuXG4gKiBAcGFyYW0ge1NpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0VHlwZX0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0IC0gQSBmdW5jdGlvbiB0byBzaWduYWwgbmV3IGNvbnN1bWVyIHRyYW5zcG9ydC5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxuICpcbiAqIEB0aHJvd3Mge0Vycm9yfSBJZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIHJldHJpZXZpbmcgcHJvZHVjZXJzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBvcHRpb25zID0ge1xuICogICBuc29jazogc29ja2V0SW5zdGFuY2UsXG4gKiAgIGlzbGV2ZWw6ICcyJyxcbiAqICAgcGFyYW1ldGVyczoge1xuICogICAgIG1lbWJlcjogJ3VzZXIxMjMnLFxuICogICAgIHNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0OiBhc3luYyAoeyBuc29jaywgcmVtb3RlUHJvZHVjZXJJZCwgaXNsZXZlbCwgcGFyYW1ldGVycyB9KSA9PiB7XG4gKiAgICAgICAvLyBJbXBsZW1lbnRhdGlvbiB0byBzaWduYWwgbmV3IGNvbnN1bWVyIHRyYW5zcG9ydFxuICogICAgICAgY29uc29sZS5sb2coYFNpZ25hbGluZyBuZXcgY29uc3VtZXIgdHJhbnNwb3J0IGZvciBwcm9kdWNlcjogJHtyZW1vdGVQcm9kdWNlcklkfWApO1xuICogICAgIH0sXG4gKiAgIH0sXG4gKiB9O1xuICpcbiAqIGNvbnN0IGdldFBpcGVkUHJvZHVjZXJzU2VydmljZSA9IG5ldyBHZXRQaXBlZFByb2R1Y2Vyc0FsdCgpO1xuICogYXdhaXQgZ2V0UGlwZWRQcm9kdWNlcnNTZXJ2aWNlLmdldFBpcGVkUHJvZHVjZXJzQWx0KG9wdGlvbnMpO1xuICogY29uc29sZS5sb2coJ1BpcGVkIHByb2R1Y2VycyByZXRyaWV2ZWQgc3VjY2Vzc2Z1bGx5LicpO1xuICogYGBgXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgR2V0UGlwZWRQcm9kdWNlcnNBbHQge1xuICAvKipcbiAgICogUmV0cmlldmVzIHBpcGVkIHByb2R1Y2VycyBhbmQgc2lnbmFscyBuZXcgY29uc3VtZXIgdHJhbnNwb3J0IGZvciBlYWNoIHJldHJpZXZlZCBwcm9kdWNlci5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmV0cmlldmluZyBwaXBlZCBwcm9kdWNlcnMuXG4gICAqIEBwYXJhbSB7V2ViU29ja2V0fSBvcHRpb25zLm5zb2NrIC0gVGhlIFdlYlNvY2tldCBpbnN0YW5jZSB1c2VkIGZvciBjb21tdW5pY2F0aW9uLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuaXNsZXZlbCAtIEEgZmxhZyBpbmRpY2F0aW5nIHRoZSBsZXZlbCBvZiB0aGUgcmVxdWVzdC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIHJlcXVlc3QuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMubWVtYmVyIC0gVGhlIG1lbWJlciBpZGVudGlmaWVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQgLSBBIGZ1bmN0aW9uIHRvIHNpZ25hbCBuZXcgY29uc3VtZXIgdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgYW4gZXJyb3Igb2NjdXJzIGR1cmluZyB0aGUgcHJvY2VzcyBvZiByZXRyaWV2aW5nIHByb2R1Y2Vycy5cbiAgICovXG4gIGFzeW5jIGdldFBpcGVkUHJvZHVjZXJzQWx0KHtcbiAgICBuc29jayxcbiAgICBpc2xldmVsLFxuICAgIHBhcmFtZXRlcnMsXG4gIH06IEdldFBpcGVkUHJvZHVjZXJzQWx0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBEZXN0cnVjdHVyZSBwYXJhbWV0ZXJzXG4gICAgICBjb25zdCB7IG1lbWJlciwgc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIC8vIEVtaXQgcmVxdWVzdCB0byBnZXQgcGlwZWQgcHJvZHVjZXJzIHVzaW5nIFdlYlNvY2tldFxuICAgICAgbnNvY2suZW1pdCgnZ2V0UHJvZHVjZXJzUGlwZWRBbHQnLCB7IGlzbGV2ZWwsIG1lbWJlciB9LCBhc3luYyAocHJvZHVjZXJJZHM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICAgIC8vIENoZWNrIGlmIHByb2R1Y2VycyBhcmUgcmV0cmlldmVkXG4gICAgICAgIGlmIChwcm9kdWNlcklkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy8gU2lnbmFsIG5ldyBjb25zdW1lciB0cmFuc3BvcnQgZm9yIGVhY2ggcmV0cmlldmVkIHByb2R1Y2VyXG4gICAgICAgICAgZm9yIChjb25zdCBpZCBvZiBwcm9kdWNlcklkcykge1xuICAgICAgICAgICAgYXdhaXQgc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQoeyBuc29jaywgcmVtb3RlUHJvZHVjZXJJZDogaWQsIGlzbGV2ZWwsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAvLyBIYW5kbGUgZXJyb3JzIGR1cmluZyB0aGUgcHJvY2VzcyBvZiByZXRyaWV2aW5nIHByb2R1Y2Vyc1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGdldHRpbmcgcGlwZWQgcHJvZHVjZXJzOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgLy8gdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG4iXX0=