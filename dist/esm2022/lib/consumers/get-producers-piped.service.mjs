import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Retrieves piped producers and signals new consumer transport for each retrieved producer.
 *
 * @param {GetProducersPipedOptions} options - The options for getting piped producers.
 * @param {Socket} options.nsock - The WebSocket instance used for communication.
 * @param {string} options.islevel - A flag indicating the level of the operation.
 * @param {GetProducersPipedParameters} options.parameters - Additional parameters for the operation.
 * @param {string} options.parameters.member - The member identifier.
 * @param {SignalNewConsumerTransportType} options.parameters.signalNewConsumerTransport - The function to signal new consumer transport.
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
 *     signalNewConsumerTransport: async ({ remoteProducerId, islevel, nsock, parameters }) => {
 *       // Implementation to signal new consumer transport
 *       console.log(`Signaling new consumer transport for producer: ${remoteProducerId}`);
 *     },
 *   },
 * };
 *
 * const getProducersPipedService = new GetProducersPiped();
 * await getProducersPipedService.getProducersPiped(options);
 * console.log('Piped producers retrieved successfully.');
 * ```
 */
export class GetProducersPiped {
    /**
     * Retrieves piped producers and signals new consumer transport for each retrieved producer.
     *
     * @param {Object} options - The options for getting piped producers.
     * @param {WebSocket} options.nsock - The WebSocket instance used for communication.
     * @param {boolean} options.islevel - A flag indicating the level of the operation.
     * @param {Object} options.parameters - Additional parameters for the operation.
     * @param {string} options.parameters.member - The member identifier.
     * @param {Function} options.parameters.signalNewConsumerTransport - The function to signal new consumer transport.
     *
     * @returns {Promise<void>} A promise that resolves when the operation is complete.
     *
     * @throws {Error} If an error occurs during the process of retrieving producers.
     */
    async getProducersPiped({ nsock, islevel, parameters }) {
        try {
            // Destructure parameters
            const { member, signalNewConsumerTransport } = parameters;
            // Emit request to get piped producers using WebSocket
            nsock.emit('getProducersPipedAlt', { islevel, member }, async (producerIds) => {
                // Check if producers are retrieved
                if (producerIds.length > 0) {
                    // Signal new consumer transport for each retrieved producer
                    await Promise.all(producerIds.map((id) => signalNewConsumerTransport({ remoteProducerId: id, islevel, nsock, parameters })));
                }
            });
        }
        catch (error) {
            // Handle errors during the process of retrieving producers
            console.log('Error getting piped producers:', error.message);
            // throw error;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GetProducersPiped, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GetProducersPiped, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GetProducersPiped, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXByb2R1Y2Vycy1waXBlZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9nZXQtcHJvZHVjZXJzLXBpcGVkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF1QjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQUtILE1BQU0sT0FBTyxpQkFBaUI7SUFDNUI7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUVILEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUE0QjtRQUM5RSxJQUFJLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsTUFBTSxFQUFFLE1BQU0sRUFBRSwwQkFBMEIsRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUUxRCxzREFBc0Q7WUFDdEQsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsV0FBcUIsRUFBRSxFQUFFO2dCQUN0RixtQ0FBbUM7Z0JBQ25DLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDM0IsNERBQTREO29CQUM1RCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2YsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQ3JCLDBCQUEwQixDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FDakYsQ0FDRixDQUFDO2dCQUNKLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1lBQ3BCLDJEQUEyRDtZQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3RCxlQUFlO1FBQ2pCLENBQUM7SUFDSCxDQUFDO3VHQXRDVSxpQkFBaUI7MkdBQWpCLGlCQUFpQixjQUZoQixNQUFNOzsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQge1xuICBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydFBhcmFtZXRlcnMsXG4gIFNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0VHlwZSxcbn0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgR2V0UHJvZHVjZXJzUGlwZWRQYXJhbWV0ZXJzIGV4dGVuZHMgU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnRQYXJhbWV0ZXJzIHtcbiAgbWVtYmVyOiBzdHJpbmc7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0OiBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydFR5cGU7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZXRQcm9kdWNlcnNQaXBlZE9wdGlvbnMge1xuICBuc29jazogU29ja2V0O1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHBhcmFtZXRlcnM6IEdldFByb2R1Y2Vyc1BpcGVkUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgR2V0UHJvZHVjZXJzUGlwZWRUeXBlID0gKG9wdGlvbnM6IEdldFByb2R1Y2Vyc1BpcGVkT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBSZXRyaWV2ZXMgcGlwZWQgcHJvZHVjZXJzIGFuZCBzaWduYWxzIG5ldyBjb25zdW1lciB0cmFuc3BvcnQgZm9yIGVhY2ggcmV0cmlldmVkIHByb2R1Y2VyLlxuICpcbiAqIEBwYXJhbSB7R2V0UHJvZHVjZXJzUGlwZWRPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGdldHRpbmcgcGlwZWQgcHJvZHVjZXJzLlxuICogQHBhcmFtIHtTb2NrZXR9IG9wdGlvbnMubnNvY2sgLSBUaGUgV2ViU29ja2V0IGluc3RhbmNlIHVzZWQgZm9yIGNvbW11bmljYXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5pc2xldmVsIC0gQSBmbGFnIGluZGljYXRpbmcgdGhlIGxldmVsIG9mIHRoZSBvcGVyYXRpb24uXG4gKiBAcGFyYW0ge0dldFByb2R1Y2Vyc1BpcGVkUGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgb3BlcmF0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZW1iZXIgLSBUaGUgbWVtYmVyIGlkZW50aWZpZXIuXG4gKiBAcGFyYW0ge1NpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0VHlwZX0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0IC0gVGhlIGZ1bmN0aW9uIHRvIHNpZ25hbCBuZXcgY29uc3VtZXIgdHJhbnNwb3J0LlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBvcGVyYXRpb24gaXMgY29tcGxldGUuXG4gKlxuICogQHRocm93cyB7RXJyb3J9IElmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgdGhlIHByb2Nlc3Mgb2YgcmV0cmlldmluZyBwcm9kdWNlcnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gKiAgIG5zb2NrOiBzb2NrZXRJbnN0YW5jZSxcbiAqICAgaXNsZXZlbDogJzInLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgbWVtYmVyOiAndXNlcjEyMycsXG4gKiAgICAgc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQ6IGFzeW5jICh7IHJlbW90ZVByb2R1Y2VySWQsIGlzbGV2ZWwsIG5zb2NrLCBwYXJhbWV0ZXJzIH0pID0+IHtcbiAqICAgICAgIC8vIEltcGxlbWVudGF0aW9uIHRvIHNpZ25hbCBuZXcgY29uc3VtZXIgdHJhbnNwb3J0XG4gKiAgICAgICBjb25zb2xlLmxvZyhgU2lnbmFsaW5nIG5ldyBjb25zdW1lciB0cmFuc3BvcnQgZm9yIHByb2R1Y2VyOiAke3JlbW90ZVByb2R1Y2VySWR9YCk7XG4gKiAgICAgfSxcbiAqICAgfSxcbiAqIH07XG4gKlxuICogY29uc3QgZ2V0UHJvZHVjZXJzUGlwZWRTZXJ2aWNlID0gbmV3IEdldFByb2R1Y2Vyc1BpcGVkKCk7XG4gKiBhd2FpdCBnZXRQcm9kdWNlcnNQaXBlZFNlcnZpY2UuZ2V0UHJvZHVjZXJzUGlwZWQob3B0aW9ucyk7XG4gKiBjb25zb2xlLmxvZygnUGlwZWQgcHJvZHVjZXJzIHJldHJpZXZlZCBzdWNjZXNzZnVsbHkuJyk7XG4gKiBgYGBcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgR2V0UHJvZHVjZXJzUGlwZWQge1xuICAvKipcbiAgICogUmV0cmlldmVzIHBpcGVkIHByb2R1Y2VycyBhbmQgc2lnbmFscyBuZXcgY29uc3VtZXIgdHJhbnNwb3J0IGZvciBlYWNoIHJldHJpZXZlZCBwcm9kdWNlci5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgZ2V0dGluZyBwaXBlZCBwcm9kdWNlcnMuXG4gICAqIEBwYXJhbSB7V2ViU29ja2V0fSBvcHRpb25zLm5zb2NrIC0gVGhlIFdlYlNvY2tldCBpbnN0YW5jZSB1c2VkIGZvciBjb21tdW5pY2F0aW9uLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuaXNsZXZlbCAtIEEgZmxhZyBpbmRpY2F0aW5nIHRoZSBsZXZlbCBvZiB0aGUgb3BlcmF0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciB0aGUgb3BlcmF0aW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLm1lbWJlciAtIFRoZSBtZW1iZXIgaWRlbnRpZmllci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0IC0gVGhlIGZ1bmN0aW9uIHRvIHNpZ25hbCBuZXcgY29uc3VtZXIgdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgb3BlcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gSWYgYW4gZXJyb3Igb2NjdXJzIGR1cmluZyB0aGUgcHJvY2VzcyBvZiByZXRyaWV2aW5nIHByb2R1Y2Vycy5cbiAgICovXG5cbiAgYXN5bmMgZ2V0UHJvZHVjZXJzUGlwZWQoeyBuc29jaywgaXNsZXZlbCwgcGFyYW1ldGVycyB9OiBHZXRQcm9kdWNlcnNQaXBlZE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgLy8gRGVzdHJ1Y3R1cmUgcGFyYW1ldGVyc1xuICAgICAgY29uc3QgeyBtZW1iZXIsIHNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0IH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICAvLyBFbWl0IHJlcXVlc3QgdG8gZ2V0IHBpcGVkIHByb2R1Y2VycyB1c2luZyBXZWJTb2NrZXRcbiAgICAgIG5zb2NrLmVtaXQoJ2dldFByb2R1Y2Vyc1BpcGVkQWx0JywgeyBpc2xldmVsLCBtZW1iZXIgfSwgYXN5bmMgKHByb2R1Y2VySWRzOiBzdHJpbmdbXSkgPT4ge1xuICAgICAgICAvLyBDaGVjayBpZiBwcm9kdWNlcnMgYXJlIHJldHJpZXZlZFxuICAgICAgICBpZiAocHJvZHVjZXJJZHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIC8vIFNpZ25hbCBuZXcgY29uc3VtZXIgdHJhbnNwb3J0IGZvciBlYWNoIHJldHJpZXZlZCBwcm9kdWNlclxuICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgICAgcHJvZHVjZXJJZHMubWFwKChpZCkgPT5cbiAgICAgICAgICAgICAgc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQoeyByZW1vdGVQcm9kdWNlcklkOiBpZCwgaXNsZXZlbCwgbnNvY2ssIHBhcmFtZXRlcnMgfSksXG4gICAgICAgICAgICApLFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIC8vIEhhbmRsZSBlcnJvcnMgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIHJldHJpZXZpbmcgcHJvZHVjZXJzXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgZ2V0dGluZyBwaXBlZCBwcm9kdWNlcnM6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICAvLyB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==