import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LXByb2R1Y2Vycy1waXBlZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9nZXQtcHJvZHVjZXJzLXBpcGVkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF5QjNDLE1BQU0sT0FBTyxpQkFBaUI7SUFDNUI7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUVILEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUE0QjtRQUM5RSxJQUFJLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsTUFBTSxFQUFFLE1BQU0sRUFBRSwwQkFBMEIsRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUUxRCxzREFBc0Q7WUFDdEQsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsV0FBcUIsRUFBRSxFQUFFO2dCQUN0RixtQ0FBbUM7Z0JBQ25DLElBQUksV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDM0IsNERBQTREO29CQUM1RCxNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2YsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQ3JCLDBCQUEwQixDQUFDLEVBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FDakYsQ0FDRixDQUFDO2dCQUNKLENBQUM7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1lBQ3BCLDJEQUEyRDtZQUMzRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUM3RCxlQUFlO1FBQ2pCLENBQUM7SUFDSCxDQUFDO3VHQXRDVSxpQkFBaUI7MkdBQWpCLGlCQUFpQixjQUZoQixNQUFNOzsyRkFFUCxpQkFBaUI7a0JBSDdCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQge1xuICBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydFBhcmFtZXRlcnMsXG4gIFNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0VHlwZSxcbn0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgR2V0UHJvZHVjZXJzUGlwZWRQYXJhbWV0ZXJzIGV4dGVuZHMgU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnRQYXJhbWV0ZXJzIHtcbiAgbWVtYmVyOiBzdHJpbmc7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0OiBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydFR5cGU7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZXRQcm9kdWNlcnNQaXBlZE9wdGlvbnMge1xuICBuc29jazogU29ja2V0O1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHBhcmFtZXRlcnM6IEdldFByb2R1Y2Vyc1BpcGVkUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgR2V0UHJvZHVjZXJzUGlwZWRUeXBlID0gKG9wdGlvbnM6IEdldFByb2R1Y2Vyc1BpcGVkT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBHZXRQcm9kdWNlcnNQaXBlZCB7XG4gIC8qKlxuICAgKiBSZXRyaWV2ZXMgcGlwZWQgcHJvZHVjZXJzIGFuZCBzaWduYWxzIG5ldyBjb25zdW1lciB0cmFuc3BvcnQgZm9yIGVhY2ggcmV0cmlldmVkIHByb2R1Y2VyLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBnZXR0aW5nIHBpcGVkIHByb2R1Y2Vycy5cbiAgICogQHBhcmFtIHtXZWJTb2NrZXR9IG9wdGlvbnMubnNvY2sgLSBUaGUgV2ViU29ja2V0IGluc3RhbmNlIHVzZWQgZm9yIGNvbW11bmljYXRpb24uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc2xldmVsIC0gQSBmbGFnIGluZGljYXRpbmcgdGhlIGxldmVsIG9mIHRoZSBvcGVyYXRpb24uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBvcGVyYXRpb24uXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMubWVtYmVyIC0gVGhlIG1lbWJlciBpZGVudGlmaWVyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQgLSBUaGUgZnVuY3Rpb24gdG8gc2lnbmFsIG5ldyBjb25zdW1lciB0cmFuc3BvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBvcGVyYXRpb24gaXMgY29tcGxldGUuXG4gICAqXG4gICAqIEB0aHJvd3Mge0Vycm9yfSBJZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIHJldHJpZXZpbmcgcHJvZHVjZXJzLlxuICAgKi9cblxuICBhc3luYyBnZXRQcm9kdWNlcnNQaXBlZCh7IG5zb2NrLCBpc2xldmVsLCBwYXJhbWV0ZXJzIH06IEdldFByb2R1Y2Vyc1BpcGVkT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBEZXN0cnVjdHVyZSBwYXJhbWV0ZXJzXG4gICAgICBjb25zdCB7IG1lbWJlciwgc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIC8vIEVtaXQgcmVxdWVzdCB0byBnZXQgcGlwZWQgcHJvZHVjZXJzIHVzaW5nIFdlYlNvY2tldFxuICAgICAgbnNvY2suZW1pdCgnZ2V0UHJvZHVjZXJzUGlwZWRBbHQnLCB7IGlzbGV2ZWwsIG1lbWJlciB9LCBhc3luYyAocHJvZHVjZXJJZHM6IHN0cmluZ1tdKSA9PiB7XG4gICAgICAgIC8vIENoZWNrIGlmIHByb2R1Y2VycyBhcmUgcmV0cmlldmVkXG4gICAgICAgIGlmIChwcm9kdWNlcklkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgLy8gU2lnbmFsIG5ldyBjb25zdW1lciB0cmFuc3BvcnQgZm9yIGVhY2ggcmV0cmlldmVkIHByb2R1Y2VyXG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICBwcm9kdWNlcklkcy5tYXAoKGlkKSA9PlxuICAgICAgICAgICAgICBzaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCh7IHJlbW90ZVByb2R1Y2VySWQ6IGlkLCBpc2xldmVsLCBuc29jaywgcGFyYW1ldGVycyB9KSxcbiAgICAgICAgICAgICksXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgLy8gSGFuZGxlIGVycm9ycyBkdXJpbmcgdGhlIHByb2Nlc3Mgb2YgcmV0cmlldmluZyBwcm9kdWNlcnNcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBnZXR0aW5nIHBpcGVkIHByb2R1Y2VyczonLCBlcnJvci5tZXNzYWdlKTtcbiAgICAgIC8vIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufVxuIl19