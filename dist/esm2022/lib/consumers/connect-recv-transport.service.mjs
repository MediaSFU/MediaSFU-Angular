import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ConnectRecvTransport {
    /**
     * Connects the receiving transport to consume media from a remote producer.
     *
     * @param {Object} options - The options for connecting the receiving transport.
     * @param {Transport} options.consumerTransport - The transport used for consuming media.
     * @param {string} options.remoteProducerId - The ID of the remote producer.
     * @param {string} options.serverConsumerTransportId - The ID of the server consumer transport.
     * @param {Socket} options.nsock - The socket used for communication.
     * @param {ConnectRecvTransportOptions} options.parameters - The parameters for the connection.
     *
     * @returns {Promise<void>} A promise that resolves when the connection is established.
     *
     * @throws Will throw an error if the connection or consumption fails.
     *
     * @example
     * ```typescript
     * const options = {
     *   consumerTransport,
     *   remoteProducerId: 'producer-id',
     *   serverConsumerTransportId: 'transport-id',
     *   nsock: socket,
     *   parameters: connectRecvTransportOptions,
     * };
     *
     * connectRecvTransport(options)
     *   .then(() => {
     *     console.log('Transport connected and consuming media');
     *   })
     *   .catch((error) => {
     *     console.error('Error connecting transport:', error);
     *   });
     * ```
     */
    connectRecvTransport = async ({ consumerTransport, remoteProducerId, serverConsumerTransportId, nsock, parameters, }) => {
        try {
            parameters = parameters.getUpdatedAllParams();
            const { device, consumerTransports, updateConsumerTransports, consumerResume } = parameters;
            // Emit 'consume' event to signal consumption initiation
            nsock.emit('consume', {
                rtpCapabilities: device ? device.rtpCapabilities : null,
                remoteProducerId,
                serverConsumerTransportId,
            }, async ({ params }) => {
                if (params.error) {
                    // Handle error
                    console.log('consume error', params.error);
                    return;
                }
                try {
                    // Consume media using received parameters
                    const consumer = await consumerTransport.consume({
                        id: params.id,
                        producerId: params.producerId,
                        kind: params.kind,
                        rtpParameters: params.rtpParameters,
                    });
                    // Update consumerTransports array with the new consumer
                    consumerTransports.push({
                        consumerTransport,
                        serverConsumerTransportId: params.id,
                        producerId: remoteProducerId,
                        consumer,
                        socket_: nsock,
                    });
                    updateConsumerTransports(consumerTransports);
                    // Extract track from the consumer
                    const { track } = consumer;
                    // Emit 'consumer-resume' event to signal consumer resumption
                    nsock.emit('consumer-resume', { serverConsumerId: params.serverConsumerId }, async ({ resumed }) => {
                        if (resumed) {
                            // Consumer resumed and ready to be used
                            try {
                                await consumerResume({
                                    track,
                                    kind: params.kind,
                                    remoteProducerId,
                                    params,
                                    parameters,
                                    nsock,
                                });
                            }
                            catch (error) {
                                // Handle error
                                console.log('consumerResume error', error);
                            }
                        }
                    });
                }
                catch (error) {
                    // Handle error
                    console.log('consume error', error);
                    return;
                }
            });
        }
        catch (error) {
            // Handle error
            console.log('connectRecvTransport error', error);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectRecvTransport, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectRecvTransport, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectRecvTransport, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1yZWN2LXRyYW5zcG9ydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jb25uZWN0LXJlY3YtdHJhbnNwb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF5QzNDLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0NHO0lBRUgsb0JBQW9CLEdBQUcsS0FBSyxFQUFFLEVBQzVCLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIseUJBQXlCLEVBQ3pCLEtBQUssRUFDTCxVQUFVLEdBQ2tCLEVBQWlCLEVBQUU7UUFDL0MsSUFBSSxDQUFDO1lBQ0gsVUFBVSxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzlDLE1BQU0sRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQUUsY0FBYyxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBRTVGLHdEQUF3RDtZQUN4RCxLQUFLLENBQUMsSUFBSSxDQUNSLFNBQVMsRUFDVDtnQkFDRSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUN2RCxnQkFBZ0I7Z0JBQ2hCLHlCQUF5QjthQUMxQixFQUNELEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBc0IsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDakIsZUFBZTtvQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzNDLE9BQU87Z0JBQ1QsQ0FBQztnQkFFRCxJQUFJLENBQUM7b0JBQ0gsMENBQTBDO29CQUMxQyxNQUFNLFFBQVEsR0FBYSxNQUFNLGlCQUFpQixDQUFDLE9BQU8sQ0FBQzt3QkFDekQsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFO3dCQUNiLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVTt3QkFDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUF5Qjt3QkFDdEMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxhQUFhO3FCQUNwQyxDQUFDLENBQUM7b0JBRUgsd0RBQXdEO29CQUN4RCxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7d0JBQ3RCLGlCQUFpQjt3QkFDakIseUJBQXlCLEVBQUUsTUFBTSxDQUFDLEVBQUU7d0JBQ3BDLFVBQVUsRUFBRSxnQkFBZ0I7d0JBQzVCLFFBQVE7d0JBQ1IsT0FBTyxFQUFFLEtBQUs7cUJBQ2YsQ0FBQyxDQUFDO29CQUVILHdCQUF3QixDQUFDLGtCQUFrQixDQUFDLENBQUM7b0JBRTdDLGtDQUFrQztvQkFDbEMsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLFFBQVEsQ0FBQztvQkFFM0IsNkRBQTZEO29CQUM3RCxLQUFLLENBQUMsSUFBSSxDQUNSLGlCQUFpQixFQUNqQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxFQUM3QyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQU8sRUFBRSxFQUFFO3dCQUN6QixJQUFJLE9BQU8sRUFBRSxDQUFDOzRCQUNaLHdDQUF3Qzs0QkFDeEMsSUFBSSxDQUFDO2dDQUNILE1BQU0sY0FBYyxDQUFDO29DQUNuQixLQUFLO29DQUNMLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtvQ0FDakIsZ0JBQWdCO29DQUNoQixNQUFNO29DQUNOLFVBQVU7b0NBQ1YsS0FBSztpQ0FDTixDQUFDLENBQUM7NEJBQ0wsQ0FBQzs0QkFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dDQUNmLGVBQWU7Z0NBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQzs0QkFDN0MsQ0FBQzt3QkFDSCxDQUFDO29CQUNILENBQUMsQ0FDRixDQUFDO2dCQUNKLENBQUM7Z0JBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztvQkFDZixlQUFlO29CQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNwQyxPQUFPO2dCQUNULENBQUM7WUFDSCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsZUFBZTtZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkQsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0F0SFMsb0JBQW9COzJHQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtcbiAgQ29uc3VtZXJSZXN1bWVUeXBlLFxuICBDb25zdW1lclJlc3VtZVBhcmFtZXRlcnMsXG4gIFRyYW5zcG9ydCBhcyBUcmFuc3BvcnRUeXBlLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgQ29uc3VtZXIsIERldmljZSwgVHJhbnNwb3J0IH0gZnJvbSAnbWVkaWFzb3VwLWNsaWVudC9saWIvdHlwZXMnO1xuaW50ZXJmYWNlIFBhcmFtcyB7XG4gIGlkOiBzdHJpbmc7XG4gIHByb2R1Y2VySWQ6IHN0cmluZztcbiAga2luZDogc3RyaW5nO1xuICBydHBQYXJhbWV0ZXJzOiBhbnk7XG4gIHNlcnZlckNvbnN1bWVySWQ6IHN0cmluZztcbiAgZXJyb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdFJlY3ZUcmFuc3BvcnRQYXJhbWV0ZXJzIGV4dGVuZHMgQ29uc3VtZXJSZXN1bWVQYXJhbWV0ZXJzIHtcbiAgZGV2aWNlOiBEZXZpY2UgfCBudWxsO1xuICBjb25zdW1lclRyYW5zcG9ydHM6IFRyYW5zcG9ydFR5cGVbXTtcbiAgdXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzOiAodHJhbnNwb3J0czogVHJhbnNwb3J0VHlwZVtdKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBjb25zdW1lclJlc3VtZTogQ29uc3VtZXJSZXN1bWVUeXBlO1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBDb25uZWN0UmVjdlRyYW5zcG9ydFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTsgLy8gRXh0ZW5kYWJsZSBmb3IgYWRkaXRpb25hbCBwYXJhbWV0ZXJzXG59XG5leHBvcnQgaW50ZXJmYWNlIENvbm5lY3RSZWN2VHJhbnNwb3J0T3B0aW9ucyB7XG4gIGNvbnN1bWVyVHJhbnNwb3J0OiBUcmFuc3BvcnQ7XG4gIHJlbW90ZVByb2R1Y2VySWQ6IHN0cmluZztcbiAgc2VydmVyQ29uc3VtZXJUcmFuc3BvcnRJZDogc3RyaW5nO1xuICBuc29jazogU29ja2V0O1xuICBwYXJhbWV0ZXJzOiBDb25uZWN0UmVjdlRyYW5zcG9ydFBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENvbm5lY3RSZWN2VHJhbnNwb3J0VHlwZSA9IChvcHRpb25zOiBDb25uZWN0UmVjdlRyYW5zcG9ydE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb25uZWN0UmVjdlRyYW5zcG9ydCB7XG4gIC8qKlxuICAgKiBDb25uZWN0cyB0aGUgcmVjZWl2aW5nIHRyYW5zcG9ydCB0byBjb25zdW1lIG1lZGlhIGZyb20gYSByZW1vdGUgcHJvZHVjZXIuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNvbm5lY3RpbmcgdGhlIHJlY2VpdmluZyB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7VHJhbnNwb3J0fSBvcHRpb25zLmNvbnN1bWVyVHJhbnNwb3J0IC0gVGhlIHRyYW5zcG9ydCB1c2VkIGZvciBjb25zdW1pbmcgbWVkaWEuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJlbW90ZVByb2R1Y2VySWQgLSBUaGUgSUQgb2YgdGhlIHJlbW90ZSBwcm9kdWNlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc2VydmVyQ29uc3VtZXJUcmFuc3BvcnRJZCAtIFRoZSBJRCBvZiB0aGUgc2VydmVyIGNvbnN1bWVyIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtTb2NrZXR9IG9wdGlvbnMubnNvY2sgLSBUaGUgc29ja2V0IHVzZWQgZm9yIGNvbW11bmljYXRpb24uXG4gICAqIEBwYXJhbSB7Q29ubmVjdFJlY3ZUcmFuc3BvcnRPcHRpb25zfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIGNvbm5lY3Rpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBjb25uZWN0aW9uIGlzIGVzdGFibGlzaGVkLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGNvbm5lY3Rpb24gb3IgY29uc3VtcHRpb24gZmFpbHMuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3Qgb3B0aW9ucyA9IHtcbiAgICogICBjb25zdW1lclRyYW5zcG9ydCxcbiAgICogICByZW1vdGVQcm9kdWNlcklkOiAncHJvZHVjZXItaWQnLFxuICAgKiAgIHNlcnZlckNvbnN1bWVyVHJhbnNwb3J0SWQ6ICd0cmFuc3BvcnQtaWQnLFxuICAgKiAgIG5zb2NrOiBzb2NrZXQsXG4gICAqICAgcGFyYW1ldGVyczogY29ubmVjdFJlY3ZUcmFuc3BvcnRPcHRpb25zLFxuICAgKiB9O1xuICAgKlxuICAgKiBjb25uZWN0UmVjdlRyYW5zcG9ydChvcHRpb25zKVxuICAgKiAgIC50aGVuKCgpID0+IHtcbiAgICogICAgIGNvbnNvbGUubG9nKCdUcmFuc3BvcnQgY29ubmVjdGVkIGFuZCBjb25zdW1pbmcgbWVkaWEnKTtcbiAgICogICB9KVxuICAgKiAgIC5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICogICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNvbm5lY3RpbmcgdHJhbnNwb3J0OicsIGVycm9yKTtcbiAgICogICB9KTtcbiAgICogYGBgXG4gICAqL1xuXG4gIGNvbm5lY3RSZWN2VHJhbnNwb3J0ID0gYXN5bmMgKHtcbiAgICBjb25zdW1lclRyYW5zcG9ydCxcbiAgICByZW1vdGVQcm9kdWNlcklkLFxuICAgIHNlcnZlckNvbnN1bWVyVHJhbnNwb3J0SWQsXG4gICAgbnNvY2ssXG4gICAgcGFyYW1ldGVycyxcbiAgfTogQ29ubmVjdFJlY3ZUcmFuc3BvcnRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIHBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcbiAgICAgIGNvbnN0IHsgZGV2aWNlLCBjb25zdW1lclRyYW5zcG9ydHMsIHVwZGF0ZUNvbnN1bWVyVHJhbnNwb3J0cywgY29uc3VtZXJSZXN1bWUgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIC8vIEVtaXQgJ2NvbnN1bWUnIGV2ZW50IHRvIHNpZ25hbCBjb25zdW1wdGlvbiBpbml0aWF0aW9uXG4gICAgICBuc29jay5lbWl0KFxuICAgICAgICAnY29uc3VtZScsXG4gICAgICAgIHtcbiAgICAgICAgICBydHBDYXBhYmlsaXRpZXM6IGRldmljZSA/IGRldmljZS5ydHBDYXBhYmlsaXRpZXMgOiBudWxsLFxuICAgICAgICAgIHJlbW90ZVByb2R1Y2VySWQsXG4gICAgICAgICAgc2VydmVyQ29uc3VtZXJUcmFuc3BvcnRJZCxcbiAgICAgICAgfSxcbiAgICAgICAgYXN5bmMgKHsgcGFyYW1zIH06IHsgcGFyYW1zOiBQYXJhbXMgfSkgPT4ge1xuICAgICAgICAgIGlmIChwYXJhbXMuZXJyb3IpIHtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBlcnJvclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2NvbnN1bWUgZXJyb3InLCBwYXJhbXMuZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBDb25zdW1lIG1lZGlhIHVzaW5nIHJlY2VpdmVkIHBhcmFtZXRlcnNcbiAgICAgICAgICAgIGNvbnN0IGNvbnN1bWVyOiBDb25zdW1lciA9IGF3YWl0IGNvbnN1bWVyVHJhbnNwb3J0LmNvbnN1bWUoe1xuICAgICAgICAgICAgICBpZDogcGFyYW1zLmlkLFxuICAgICAgICAgICAgICBwcm9kdWNlcklkOiBwYXJhbXMucHJvZHVjZXJJZCxcbiAgICAgICAgICAgICAga2luZDogcGFyYW1zLmtpbmQgYXMgJ2F1ZGlvJyB8ICd2aWRlbycsXG4gICAgICAgICAgICAgIHJ0cFBhcmFtZXRlcnM6IHBhcmFtcy5ydHBQYXJhbWV0ZXJzLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBjb25zdW1lclRyYW5zcG9ydHMgYXJyYXkgd2l0aCB0aGUgbmV3IGNvbnN1bWVyXG4gICAgICAgICAgICBjb25zdW1lclRyYW5zcG9ydHMucHVzaCh7XG4gICAgICAgICAgICAgIGNvbnN1bWVyVHJhbnNwb3J0LFxuICAgICAgICAgICAgICBzZXJ2ZXJDb25zdW1lclRyYW5zcG9ydElkOiBwYXJhbXMuaWQsXG4gICAgICAgICAgICAgIHByb2R1Y2VySWQ6IHJlbW90ZVByb2R1Y2VySWQsXG4gICAgICAgICAgICAgIGNvbnN1bWVyLFxuICAgICAgICAgICAgICBzb2NrZXRfOiBuc29jayxcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB1cGRhdGVDb25zdW1lclRyYW5zcG9ydHMoY29uc3VtZXJUcmFuc3BvcnRzKTtcblxuICAgICAgICAgICAgLy8gRXh0cmFjdCB0cmFjayBmcm9tIHRoZSBjb25zdW1lclxuICAgICAgICAgICAgY29uc3QgeyB0cmFjayB9ID0gY29uc3VtZXI7XG5cbiAgICAgICAgICAgIC8vIEVtaXQgJ2NvbnN1bWVyLXJlc3VtZScgZXZlbnQgdG8gc2lnbmFsIGNvbnN1bWVyIHJlc3VtcHRpb25cbiAgICAgICAgICAgIG5zb2NrLmVtaXQoXG4gICAgICAgICAgICAgICdjb25zdW1lci1yZXN1bWUnLFxuICAgICAgICAgICAgICB7IHNlcnZlckNvbnN1bWVySWQ6IHBhcmFtcy5zZXJ2ZXJDb25zdW1lcklkIH0sXG4gICAgICAgICAgICAgIGFzeW5jICh7IHJlc3VtZWQgfTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VtZWQpIHtcbiAgICAgICAgICAgICAgICAgIC8vIENvbnN1bWVyIHJlc3VtZWQgYW5kIHJlYWR5IHRvIGJlIHVzZWRcbiAgICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IGNvbnN1bWVyUmVzdW1lKHtcbiAgICAgICAgICAgICAgICAgICAgICB0cmFjayxcbiAgICAgICAgICAgICAgICAgICAgICBraW5kOiBwYXJhbXMua2luZCxcbiAgICAgICAgICAgICAgICAgICAgICByZW1vdGVQcm9kdWNlcklkLFxuICAgICAgICAgICAgICAgICAgICAgIHBhcmFtcyxcbiAgICAgICAgICAgICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICAgICAgIG5zb2NrLFxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBlcnJvclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnY29uc3VtZXJSZXN1bWUgZXJyb3InLCBlcnJvcik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGVycm9yXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29uc3VtZSBlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBIYW5kbGUgZXJyb3JcbiAgICAgIGNvbnNvbGUubG9nKCdjb25uZWN0UmVjdlRyYW5zcG9ydCBlcnJvcicsIGVycm9yKTtcbiAgICB9XG4gIH07XG59XG4iXX0=