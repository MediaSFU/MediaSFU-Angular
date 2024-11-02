import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Connects the receiving transport to consume media from a remote producer.
 *
 * @param {ConnectRecvTransportOptions} options - The options for connecting the receiving transport.
 * @param {Transport} options.consumerTransport - The transport used for consuming media.
 * @param {string} options.remoteProducerId - The ID of the remote producer.
 * @param {string} options.serverConsumerTransportId - The ID of the server consumer transport.
 * @param {Socket} options.nsock - The socket used for communication.
 * @param {ConnectRecvTransportParameters} options.parameters - The parameters for the connection.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1yZWN2LXRyYW5zcG9ydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jb25uZWN0LXJlY3YtdHJhbnNwb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFzQ3pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQU1MLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BZ0NHO0lBRUgsb0JBQW9CLEdBQUcsS0FBSyxFQUFFLEVBQzVCLGlCQUFpQixFQUNqQixnQkFBZ0IsRUFDaEIseUJBQXlCLEVBQ3pCLEtBQUssRUFDTCxVQUFVLEdBQ2tCLEVBQWlCLEVBQUU7UUFDL0MsSUFBSSxDQUFDO1lBQ0gsVUFBVSxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzlDLE1BQU0sRUFBRSxNQUFNLEVBQUUsa0JBQWtCLEVBQUUsd0JBQXdCLEVBQUUsY0FBYyxFQUFFLEdBQUcsVUFBVSxDQUFDO1lBRTVGLHdEQUF3RDtZQUN4RCxLQUFLLENBQUMsSUFBSSxDQUNSLFNBQVMsRUFDVDtnQkFDRSxlQUFlLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUN2RCxnQkFBZ0I7Z0JBQ2hCLHlCQUF5QjthQUMxQixFQUNELEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBc0IsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDakIsZUFBZTtvQkFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsRUFBRSxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzNDLE9BQU87Z0JBQ1QsQ0FBQztnQkFFRCxJQUFJLENBQUM7b0JBQ0gsMENBQTBDO29CQUMxQyxNQUFNLFFBQVEsR0FBYSxNQUFNLGlCQUFpQixDQUFDLE9BQU8sQ0FBQzt3QkFDekQsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFO3dCQUNiLFVBQVUsRUFBRSxNQUFNLENBQUMsVUFBVTt3QkFDN0IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUF5Qjt3QkFDdEMsYUFBYSxFQUFFLE1BQU0sQ0FBQyxhQUFhO3FCQUNwQyxDQUFDLENBQUM7b0JBRUgsd0RBQXdEO29CQUN4RCxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7d0JBQ3RCLGlCQUFpQjt3QkFDakIseUJBQXlCLEVBQUUsTUFBTSxDQUFDLEVBQUU7d0JBQ3BDLFVBQVUsRUFBRSxnQkFBZ0I7d0JBQzVCLFFBQVE7d0JBQ1IsT0FBTyxFQUFFLEtBQUs7cUJBQ2YsQ0FBQyxDQUFDO29CQUVILHdCQUF3QixDQUFDLGtCQUFrQixDQUFDLENBQUM7b0JBRTdDLGtDQUFrQztvQkFDbEMsTUFBTSxFQUFFLEtBQUssRUFBRSxHQUFHLFFBQVEsQ0FBQztvQkFFM0IsNkRBQTZEO29CQUM3RCxLQUFLLENBQUMsSUFBSSxDQUNSLGlCQUFpQixFQUNqQixFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxFQUM3QyxLQUFLLEVBQUUsRUFBRSxPQUFPLEVBQU8sRUFBRSxFQUFFO3dCQUN6QixJQUFJLE9BQU8sRUFBRSxDQUFDOzRCQUNaLHdDQUF3Qzs0QkFDeEMsSUFBSSxDQUFDO2dDQUNILE1BQU0sY0FBYyxDQUFDO29DQUNuQixLQUFLO29DQUNMLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtvQ0FDakIsZ0JBQWdCO29DQUNoQixNQUFNO29DQUNOLFVBQVU7b0NBQ1YsS0FBSztpQ0FDTixDQUFDLENBQUM7NEJBQ0wsQ0FBQzs0QkFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO2dDQUNmLGVBQWU7Z0NBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxLQUFLLENBQUMsQ0FBQzs0QkFDN0MsQ0FBQzt3QkFDSCxDQUFDO29CQUNILENBQUMsQ0FDRixDQUFDO2dCQUNKLENBQUM7Z0JBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztvQkFDZixlQUFlO29CQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNwQyxPQUFPO2dCQUNULENBQUM7WUFDSCxDQUFDLENBQ0YsQ0FBQztRQUNKLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsZUFBZTtZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkQsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0F0SFMsb0JBQW9COzJHQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtcbiAgQ29uc3VtZXJSZXN1bWVUeXBlLFxuICBDb25zdW1lclJlc3VtZVBhcmFtZXRlcnMsXG4gIFRyYW5zcG9ydCBhcyBUcmFuc3BvcnRUeXBlLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgQ29uc3VtZXIsIERldmljZSwgVHJhbnNwb3J0IH0gZnJvbSAnbWVkaWFzb3VwLWNsaWVudC9saWIvdHlwZXMnO1xuaW50ZXJmYWNlIFBhcmFtcyB7XG4gIGlkOiBzdHJpbmc7XG4gIHByb2R1Y2VySWQ6IHN0cmluZztcbiAga2luZDogc3RyaW5nO1xuICBydHBQYXJhbWV0ZXJzOiBhbnk7XG4gIHNlcnZlckNvbnN1bWVySWQ6IHN0cmluZztcbiAgZXJyb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdFJlY3ZUcmFuc3BvcnRQYXJhbWV0ZXJzIGV4dGVuZHMgQ29uc3VtZXJSZXN1bWVQYXJhbWV0ZXJzIHtcbiAgZGV2aWNlOiBEZXZpY2UgfCBudWxsO1xuICBjb25zdW1lclRyYW5zcG9ydHM6IFRyYW5zcG9ydFR5cGVbXTtcbiAgdXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzOiAodHJhbnNwb3J0czogVHJhbnNwb3J0VHlwZVtdKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBjb25zdW1lclJlc3VtZTogQ29uc3VtZXJSZXN1bWVUeXBlO1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBDb25uZWN0UmVjdlRyYW5zcG9ydFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTsgLy8gRXh0ZW5kYWJsZSBmb3IgYWRkaXRpb25hbCBwYXJhbWV0ZXJzXG59XG5leHBvcnQgaW50ZXJmYWNlIENvbm5lY3RSZWN2VHJhbnNwb3J0T3B0aW9ucyB7XG4gIGNvbnN1bWVyVHJhbnNwb3J0OiBUcmFuc3BvcnQ7XG4gIHJlbW90ZVByb2R1Y2VySWQ6IHN0cmluZztcbiAgc2VydmVyQ29uc3VtZXJUcmFuc3BvcnRJZDogc3RyaW5nO1xuICBuc29jazogU29ja2V0O1xuICBwYXJhbWV0ZXJzOiBDb25uZWN0UmVjdlRyYW5zcG9ydFBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENvbm5lY3RSZWN2VHJhbnNwb3J0VHlwZSA9IChvcHRpb25zOiBDb25uZWN0UmVjdlRyYW5zcG9ydE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIENvbm5lY3RzIHRoZSByZWNlaXZpbmcgdHJhbnNwb3J0IHRvIGNvbnN1bWUgbWVkaWEgZnJvbSBhIHJlbW90ZSBwcm9kdWNlci5cbiAgICpcbiAgICogQHBhcmFtIHtDb25uZWN0UmVjdlRyYW5zcG9ydE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29ubmVjdGluZyB0aGUgcmVjZWl2aW5nIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtUcmFuc3BvcnR9IG9wdGlvbnMuY29uc3VtZXJUcmFuc3BvcnQgLSBUaGUgdHJhbnNwb3J0IHVzZWQgZm9yIGNvbnN1bWluZyBtZWRpYS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucmVtb3RlUHJvZHVjZXJJZCAtIFRoZSBJRCBvZiB0aGUgcmVtb3RlIHByb2R1Y2VyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5zZXJ2ZXJDb25zdW1lclRyYW5zcG9ydElkIC0gVGhlIElEIG9mIHRoZSBzZXJ2ZXIgY29uc3VtZXIgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5uc29jayAtIFRoZSBzb2NrZXQgdXNlZCBmb3IgY29tbXVuaWNhdGlvbi5cbiAgICogQHBhcmFtIHtDb25uZWN0UmVjdlRyYW5zcG9ydFBhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgY29ubmVjdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGNvbm5lY3Rpb24gaXMgZXN0YWJsaXNoZWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgY29ubmVjdGlvbiBvciBjb25zdW1wdGlvbiBmYWlscy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjb25zdCBvcHRpb25zID0ge1xuICAgKiAgIGNvbnN1bWVyVHJhbnNwb3J0LFxuICAgKiAgIHJlbW90ZVByb2R1Y2VySWQ6ICdwcm9kdWNlci1pZCcsXG4gICAqICAgc2VydmVyQ29uc3VtZXJUcmFuc3BvcnRJZDogJ3RyYW5zcG9ydC1pZCcsXG4gICAqICAgbnNvY2s6IHNvY2tldCxcbiAgICogICBwYXJhbWV0ZXJzOiBjb25uZWN0UmVjdlRyYW5zcG9ydE9wdGlvbnMsXG4gICAqIH07XG4gICAqXG4gICAqIGNvbm5lY3RSZWN2VHJhbnNwb3J0KG9wdGlvbnMpXG4gICAqICAgLnRoZW4oKCkgPT4ge1xuICAgKiAgICAgY29uc29sZS5sb2coJ1RyYW5zcG9ydCBjb25uZWN0ZWQgYW5kIGNvbnN1bWluZyBtZWRpYScpO1xuICAgKiAgIH0pXG4gICAqICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgKiAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY29ubmVjdGluZyB0cmFuc3BvcnQ6JywgZXJyb3IpO1xuICAgKiAgIH0pO1xuICAgKiBgYGBcbiAgICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbm5lY3RSZWN2VHJhbnNwb3J0IHtcbiAgLyoqXG4gICAqIENvbm5lY3RzIHRoZSByZWNlaXZpbmcgdHJhbnNwb3J0IHRvIGNvbnN1bWUgbWVkaWEgZnJvbSBhIHJlbW90ZSBwcm9kdWNlci5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29ubmVjdGluZyB0aGUgcmVjZWl2aW5nIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtUcmFuc3BvcnR9IG9wdGlvbnMuY29uc3VtZXJUcmFuc3BvcnQgLSBUaGUgdHJhbnNwb3J0IHVzZWQgZm9yIGNvbnN1bWluZyBtZWRpYS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucmVtb3RlUHJvZHVjZXJJZCAtIFRoZSBJRCBvZiB0aGUgcmVtb3RlIHByb2R1Y2VyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5zZXJ2ZXJDb25zdW1lclRyYW5zcG9ydElkIC0gVGhlIElEIG9mIHRoZSBzZXJ2ZXIgY29uc3VtZXIgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5uc29jayAtIFRoZSBzb2NrZXQgdXNlZCBmb3IgY29tbXVuaWNhdGlvbi5cbiAgICogQHBhcmFtIHtDb25uZWN0UmVjdlRyYW5zcG9ydE9wdGlvbnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgY29ubmVjdGlvbi5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGNvbm5lY3Rpb24gaXMgZXN0YWJsaXNoZWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgY29ubmVjdGlvbiBvciBjb25zdW1wdGlvbiBmYWlscy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjb25zdCBvcHRpb25zID0ge1xuICAgKiAgIGNvbnN1bWVyVHJhbnNwb3J0LFxuICAgKiAgIHJlbW90ZVByb2R1Y2VySWQ6ICdwcm9kdWNlci1pZCcsXG4gICAqICAgc2VydmVyQ29uc3VtZXJUcmFuc3BvcnRJZDogJ3RyYW5zcG9ydC1pZCcsXG4gICAqICAgbnNvY2s6IHNvY2tldCxcbiAgICogICBwYXJhbWV0ZXJzOiBjb25uZWN0UmVjdlRyYW5zcG9ydE9wdGlvbnMsXG4gICAqIH07XG4gICAqXG4gICAqIGNvbm5lY3RSZWN2VHJhbnNwb3J0KG9wdGlvbnMpXG4gICAqICAgLnRoZW4oKCkgPT4ge1xuICAgKiAgICAgY29uc29sZS5sb2coJ1RyYW5zcG9ydCBjb25uZWN0ZWQgYW5kIGNvbnN1bWluZyBtZWRpYScpO1xuICAgKiAgIH0pXG4gICAqICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgKiAgICAgY29uc29sZS5lcnJvcignRXJyb3IgY29ubmVjdGluZyB0cmFuc3BvcnQ6JywgZXJyb3IpO1xuICAgKiAgIH0pO1xuICAgKiBgYGBcbiAgICovXG5cbiAgY29ubmVjdFJlY3ZUcmFuc3BvcnQgPSBhc3luYyAoe1xuICAgIGNvbnN1bWVyVHJhbnNwb3J0LFxuICAgIHJlbW90ZVByb2R1Y2VySWQsXG4gICAgc2VydmVyQ29uc3VtZXJUcmFuc3BvcnRJZCxcbiAgICBuc29jayxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBDb25uZWN0UmVjdlRyYW5zcG9ydE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgcGFyYW1ldGVycyA9IHBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgICAgY29uc3QgeyBkZXZpY2UsIGNvbnN1bWVyVHJhbnNwb3J0cywgdXBkYXRlQ29uc3VtZXJUcmFuc3BvcnRzLCBjb25zdW1lclJlc3VtZSB9ID0gcGFyYW1ldGVycztcblxuICAgICAgLy8gRW1pdCAnY29uc3VtZScgZXZlbnQgdG8gc2lnbmFsIGNvbnN1bXB0aW9uIGluaXRpYXRpb25cbiAgICAgIG5zb2NrLmVtaXQoXG4gICAgICAgICdjb25zdW1lJyxcbiAgICAgICAge1xuICAgICAgICAgIHJ0cENhcGFiaWxpdGllczogZGV2aWNlID8gZGV2aWNlLnJ0cENhcGFiaWxpdGllcyA6IG51bGwsXG4gICAgICAgICAgcmVtb3RlUHJvZHVjZXJJZCxcbiAgICAgICAgICBzZXJ2ZXJDb25zdW1lclRyYW5zcG9ydElkLFxuICAgICAgICB9LFxuICAgICAgICBhc3luYyAoeyBwYXJhbXMgfTogeyBwYXJhbXM6IFBhcmFtcyB9KSA9PiB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5lcnJvcikge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGVycm9yXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnY29uc3VtZSBlcnJvcicsIHBhcmFtcy5lcnJvcik7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIENvbnN1bWUgbWVkaWEgdXNpbmcgcmVjZWl2ZWQgcGFyYW1ldGVyc1xuICAgICAgICAgICAgY29uc3QgY29uc3VtZXI6IENvbnN1bWVyID0gYXdhaXQgY29uc3VtZXJUcmFuc3BvcnQuY29uc3VtZSh7XG4gICAgICAgICAgICAgIGlkOiBwYXJhbXMuaWQsXG4gICAgICAgICAgICAgIHByb2R1Y2VySWQ6IHBhcmFtcy5wcm9kdWNlcklkLFxuICAgICAgICAgICAgICBraW5kOiBwYXJhbXMua2luZCBhcyAnYXVkaW8nIHwgJ3ZpZGVvJyxcbiAgICAgICAgICAgICAgcnRwUGFyYW1ldGVyczogcGFyYW1zLnJ0cFBhcmFtZXRlcnMsXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gVXBkYXRlIGNvbnN1bWVyVHJhbnNwb3J0cyBhcnJheSB3aXRoIHRoZSBuZXcgY29uc3VtZXJcbiAgICAgICAgICAgIGNvbnN1bWVyVHJhbnNwb3J0cy5wdXNoKHtcbiAgICAgICAgICAgICAgY29uc3VtZXJUcmFuc3BvcnQsXG4gICAgICAgICAgICAgIHNlcnZlckNvbnN1bWVyVHJhbnNwb3J0SWQ6IHBhcmFtcy5pZCxcbiAgICAgICAgICAgICAgcHJvZHVjZXJJZDogcmVtb3RlUHJvZHVjZXJJZCxcbiAgICAgICAgICAgICAgY29uc3VtZXIsXG4gICAgICAgICAgICAgIHNvY2tldF86IG5zb2NrLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHVwZGF0ZUNvbnN1bWVyVHJhbnNwb3J0cyhjb25zdW1lclRyYW5zcG9ydHMpO1xuXG4gICAgICAgICAgICAvLyBFeHRyYWN0IHRyYWNrIGZyb20gdGhlIGNvbnN1bWVyXG4gICAgICAgICAgICBjb25zdCB7IHRyYWNrIH0gPSBjb25zdW1lcjtcblxuICAgICAgICAgICAgLy8gRW1pdCAnY29uc3VtZXItcmVzdW1lJyBldmVudCB0byBzaWduYWwgY29uc3VtZXIgcmVzdW1wdGlvblxuICAgICAgICAgICAgbnNvY2suZW1pdChcbiAgICAgICAgICAgICAgJ2NvbnN1bWVyLXJlc3VtZScsXG4gICAgICAgICAgICAgIHsgc2VydmVyQ29uc3VtZXJJZDogcGFyYW1zLnNlcnZlckNvbnN1bWVySWQgfSxcbiAgICAgICAgICAgICAgYXN5bmMgKHsgcmVzdW1lZCB9OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAocmVzdW1lZCkge1xuICAgICAgICAgICAgICAgICAgLy8gQ29uc3VtZXIgcmVzdW1lZCBhbmQgcmVhZHkgdG8gYmUgdXNlZFxuICAgICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgY29uc3VtZXJSZXN1bWUoe1xuICAgICAgICAgICAgICAgICAgICAgIHRyYWNrLFxuICAgICAgICAgICAgICAgICAgICAgIGtpbmQ6IHBhcmFtcy5raW5kLFxuICAgICAgICAgICAgICAgICAgICAgIHJlbW90ZVByb2R1Y2VySWQsXG4gICAgICAgICAgICAgICAgICAgICAgcGFyYW1zLFxuICAgICAgICAgICAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICAgICAgbnNvY2ssXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIGVycm9yXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb25zdW1lclJlc3VtZSBlcnJvcicsIGVycm9yKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgZXJyb3JcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdjb25zdW1lIGVycm9yJywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIEhhbmRsZSBlcnJvclxuICAgICAgY29uc29sZS5sb2coJ2Nvbm5lY3RSZWN2VHJhbnNwb3J0IGVycm9yJywgZXJyb3IpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==