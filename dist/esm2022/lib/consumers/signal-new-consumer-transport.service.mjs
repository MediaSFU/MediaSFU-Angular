import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class SignalNewConsumerTransport {
    /**
     * Signals the creation of a new consumer transport.
     *
     * @param {Object} options - The options for signaling a new consumer transport.
     * @param {string} options.remoteProducerId - The ID of the remote producer.
     * @param {boolean} options.islevel - Indicates the level of the consumer.
     * @param {any} options.nsock - The socket instance for communication.
     * @param {SignalNewConsumerTransportOptions} options.parameters - The parameters for the transport.
     *
     * @returns {Promise<string[] | void>} A promise that resolves to an array of consuming transports or void.
     *
     * @throws Will throw an error if the signaling process fails.
     *
     * @example
     * const options = {
     *   remoteProducerId: 'producer-id',
     *   islevel: true,
     *   nsock: socketInstance,
     *   parameters: {
     *     device: mediaDevice,
     *     consumingTransports: [],
     *     lock_screen: false,
     *     updateConsumingTransports: updateFunction,
     *     connectRecvTransport: connectFunction,
     *     reorderStreams: reorderFunction,
     *     getUpdatedAllParams: getUpdatedParamsFunction,
     *   },
     * };
     *
     * signalNewConsumerTransport(options)
     *   .then(consumingTransports => {
     *     console.log('Consuming Transports:', consumingTransports);
     *   })
     *   .catch(error => {
     *     console.error('Error signaling new consumer transport:', error);
     *   });
     */
    signalNewConsumerTransport = async ({ remoteProducerId, islevel, nsock, parameters, }) => {
        try {
            let { device, consumingTransports, lock_screen, updateConsumingTransports, connectRecvTransport, reorderStreams, } = parameters;
            // Get updated parameters
            const updatedParams = parameters.getUpdatedAllParams();
            device = updatedParams.device;
            consumingTransports = updatedParams.consumingTransports;
            // Check if already consuming
            if (consumingTransports.includes(remoteProducerId)) {
                return consumingTransports;
            }
            // Add remote producer ID to consumingTransports array
            consumingTransports.push(remoteProducerId);
            updateConsumingTransports(consumingTransports);
            // Emit createWebRtcTransport event to signal a new consumer
            nsock.emit('createWebRtcTransport', { consumer: true, islevel }, async ({ params }) => {
                if (params.error) {
                    // Handle error
                    return;
                }
                try {
                    // Create a new receiving transport using the received parameters
                    if (!device) {
                        throw new Error('Device is not initialized');
                    }
                    const consumerTransport = device.createRecvTransport({ ...params });
                    // Handle 'connect' event for the consumer transport
                    consumerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
                        try {
                            // Emit transport-recv-connect event to signal connection
                            nsock.emit('transport-recv-connect', {
                                dtlsParameters,
                                serverConsumerTransportId: params.id,
                            });
                            callback();
                        }
                        catch (error) {
                            errback(error);
                        }
                    });
                    // Listen for connection state change
                    consumerTransport.on('connectionstatechange', async (state) => {
                        switch (state) {
                            case 'connecting':
                                // Handle connecting state
                                break;
                            case 'connected':
                                // Handle connected state
                                break;
                            case 'failed':
                                // Handle failed state
                                consumerTransport.close();
                                // Reorder streams based on conditions
                                if (lock_screen) {
                                    await reorderStreams({ add: true, parameters });
                                }
                                else {
                                    await reorderStreams({ add: false, parameters });
                                }
                                break;
                            default:
                                break;
                        }
                    });
                    // Connect the receiving transport
                    await connectRecvTransport({
                        consumerTransport,
                        remoteProducerId,
                        serverConsumerTransportId: params.id,
                        nsock,
                        parameters,
                    });
                }
                catch (error) {
                    console.log(error, 'createRecvTransport error');
                    // Handle error
                    return;
                }
            });
        }
        catch (error) {
            console.log(error, 'signalNewConsumerTransport error');
            // Handle error
            return;
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SignalNewConsumerTransport, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SignalNewConsumerTransport, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SignalNewConsumerTransport, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsLW5ldy1jb25zdW1lci10cmFuc3BvcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvc2lnbmFsLW5ldy1jb25zdW1lci10cmFuc3BvcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXNDM0MsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0NHO0lBQ0gsMEJBQTBCLEdBQUcsS0FBSyxFQUFFLEVBQ2xDLGdCQUFnQixFQUNoQixPQUFPLEVBQ1AsS0FBSyxFQUNMLFVBQVUsR0FDd0IsRUFBNEIsRUFBRTtRQUNoRSxJQUFJLENBQUM7WUFDSCxJQUFJLEVBQ0YsTUFBTSxFQUNOLG1CQUFtQixFQUNuQixXQUFXLEVBQ1gseUJBQXlCLEVBQ3pCLG9CQUFvQixFQUNwQixjQUFjLEdBQ2YsR0FBRyxVQUFVLENBQUM7WUFFZix5QkFBeUI7WUFDekIsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDdkQsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFDOUIsbUJBQW1CLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDO1lBRXhELDZCQUE2QjtZQUM3QixJQUFJLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7Z0JBQ25ELE9BQU8sbUJBQW1CLENBQUM7WUFDN0IsQ0FBQztZQUVELHNEQUFzRDtZQUN0RCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMzQyx5QkFBeUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRS9DLDREQUE0RDtZQUM1RCxLQUFLLENBQUMsSUFBSSxDQUNS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ICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtcbiAgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICBSZW9yZGVyU3RyZWFtc1R5cGUsXG4gIENvbm5lY3RSZWN2VHJhbnNwb3J0VHlwZSxcbiAgQ29ubmVjdFJlY3ZUcmFuc3BvcnRQYXJhbWV0ZXJzLFxuICBDcmVhdGVXZWJSVENUcmFuc3BvcnRSZXNwb25zZSxcbn0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcbmltcG9ydCB7IERldmljZSwgRHRsc1BhcmFtZXRlcnMgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnRQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICAgIENvbm5lY3RSZWN2VHJhbnNwb3J0UGFyYW1ldGVycyB7XG4gIGRldmljZTogRGV2aWNlIHwgbnVsbDtcbiAgY29uc3VtaW5nVHJhbnNwb3J0czogc3RyaW5nW107XG4gIGxvY2tfc2NyZWVuOiBib29sZWFuO1xuICB1cGRhdGVDb25zdW1pbmdUcmFuc3BvcnRzOiAodHJhbnNwb3J0czogc3RyaW5nW10pID0+IHZvaWQ7XG4gIGNvbm5lY3RSZWN2VHJhbnNwb3J0OiBDb25uZWN0UmVjdlRyYW5zcG9ydFR5cGU7XG4gIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtc1R5cGU7XG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0UGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0T3B0aW9ucyB7XG4gIHJlbW90ZVByb2R1Y2VySWQ6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBuc29jazogU29ja2V0O1xuICBwYXJhbWV0ZXJzOiBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydFBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0VHlwZSA9IChcbiAgb3B0aW9uczogU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnRPcHRpb25zLFxuKSA9PiBQcm9taXNlPHN0cmluZ1tdIHwgdm9pZD47XG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQge1xuICAvKipcbiAgICogU2lnbmFscyB0aGUgY3JlYXRpb24gb2YgYSBuZXcgY29uc3VtZXIgdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBzaWduYWxpbmcgYSBuZXcgY29uc3VtZXIgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5yZW1vdGVQcm9kdWNlcklkIC0gVGhlIElEIG9mIHRoZSByZW1vdGUgcHJvZHVjZXIuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5pc2xldmVsIC0gSW5kaWNhdGVzIHRoZSBsZXZlbCBvZiB0aGUgY29uc3VtZXIuXG4gICAqIEBwYXJhbSB7YW55fSBvcHRpb25zLm5zb2NrIC0gVGhlIHNvY2tldCBpbnN0YW5jZSBmb3IgY29tbXVuaWNhdGlvbi5cbiAgICogQHBhcmFtIHtTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydE9wdGlvbnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxzdHJpbmdbXSB8IHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBhcnJheSBvZiBjb25zdW1pbmcgdHJhbnNwb3J0cyBvciB2b2lkLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIHNpZ25hbGluZyBwcm9jZXNzIGZhaWxzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBjb25zdCBvcHRpb25zID0ge1xuICAgKiAgIHJlbW90ZVByb2R1Y2VySWQ6ICdwcm9kdWNlci1pZCcsXG4gICAqICAgaXNsZXZlbDogdHJ1ZSxcbiAgICogICBuc29jazogc29ja2V0SW5zdGFuY2UsXG4gICAqICAgcGFyYW1ldGVyczoge1xuICAgKiAgICAgZGV2aWNlOiBtZWRpYURldmljZSxcbiAgICogICAgIGNvbnN1bWluZ1RyYW5zcG9ydHM6IFtdLFxuICAgKiAgICAgbG9ja19zY3JlZW46IGZhbHNlLFxuICAgKiAgICAgdXBkYXRlQ29uc3VtaW5nVHJhbnNwb3J0czogdXBkYXRlRnVuY3Rpb24sXG4gICAqICAgICBjb25uZWN0UmVjdlRyYW5zcG9ydDogY29ubmVjdEZ1bmN0aW9uLFxuICAgKiAgICAgcmVvcmRlclN0cmVhbXM6IHJlb3JkZXJGdW5jdGlvbixcbiAgICogICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6IGdldFVwZGF0ZWRQYXJhbXNGdW5jdGlvbixcbiAgICogICB9LFxuICAgKiB9O1xuICAgKlxuICAgKiBzaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydChvcHRpb25zKVxuICAgKiAgIC50aGVuKGNvbnN1bWluZ1RyYW5zcG9ydHMgPT4ge1xuICAgKiAgICAgY29uc29sZS5sb2coJ0NvbnN1bWluZyBUcmFuc3BvcnRzOicsIGNvbnN1bWluZ1RyYW5zcG9ydHMpO1xuICAgKiAgIH0pXG4gICAqICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICogICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIHNpZ25hbGluZyBuZXcgY29uc3VtZXIgdHJhbnNwb3J0OicsIGVycm9yKTtcbiAgICogICB9KTtcbiAgICovXG4gIHNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0ID0gYXN5bmMgKHtcbiAgICByZW1vdGVQcm9kdWNlcklkLFxuICAgIGlzbGV2ZWwsXG4gICAgbnNvY2ssXG4gICAgcGFyYW1ldGVycyxcbiAgfTogU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnRPcHRpb25zKTogUHJvbWlzZTxzdHJpbmdbXSB8IHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgbGV0IHtcbiAgICAgICAgZGV2aWNlLFxuICAgICAgICBjb25zdW1pbmdUcmFuc3BvcnRzLFxuICAgICAgICBsb2NrX3NjcmVlbixcbiAgICAgICAgdXBkYXRlQ29uc3VtaW5nVHJhbnNwb3J0cyxcbiAgICAgICAgY29ubmVjdFJlY3ZUcmFuc3BvcnQsXG4gICAgICAgIHJlb3JkZXJTdHJlYW1zLFxuICAgICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIC8vIEdldCB1cGRhdGVkIHBhcmFtZXRlcnNcbiAgICAgIGNvbnN0IHVwZGF0ZWRQYXJhbXMgPSBwYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcbiAgICAgIGRldmljZSA9IHVwZGF0ZWRQYXJhbXMuZGV2aWNlO1xuICAgICAgY29uc3VtaW5nVHJhbnNwb3J0cyA9IHVwZGF0ZWRQYXJhbXMuY29uc3VtaW5nVHJhbnNwb3J0cztcblxuICAgICAgLy8gQ2hlY2sgaWYgYWxyZWFkeSBjb25zdW1pbmdcbiAgICAgIGlmIChjb25zdW1pbmdUcmFuc3BvcnRzLmluY2x1ZGVzKHJlbW90ZVByb2R1Y2VySWQpKSB7XG4gICAgICAgIHJldHVybiBjb25zdW1pbmdUcmFuc3BvcnRzO1xuICAgICAgfVxuXG4gICAgICAvLyBBZGQgcmVtb3RlIHByb2R1Y2VyIElEIHRvIGNvbnN1bWluZ1RyYW5zcG9ydHMgYXJyYXlcbiAgICAgIGNvbnN1bWluZ1RyYW5zcG9ydHMucHVzaChyZW1vdGVQcm9kdWNlcklkKTtcbiAgICAgIHVwZGF0ZUNvbnN1bWluZ1RyYW5zcG9ydHMoY29uc3VtaW5nVHJhbnNwb3J0cyk7XG5cbiAgICAgIC8vIEVtaXQgY3JlYXRlV2ViUnRjVHJhbnNwb3J0IGV2ZW50IHRvIHNpZ25hbCBhIG5ldyBjb25zdW1lclxuICAgICAgbnNvY2suZW1pdChcbiAgICAgICAgJ2NyZWF0ZVdlYlJ0Y1RyYW5zcG9ydCcsXG4gICAgICAgIHsgY29uc3VtZXI6IHRydWUsIGlzbGV2ZWwgfSxcbiAgICAgICAgYXN5bmMgKHsgcGFyYW1zIH06IHsgcGFyYW1zOiBDcmVhdGVXZWJSVENUcmFuc3BvcnRSZXNwb25zZSB9KSA9PiB7XG4gICAgICAgICAgaWYgKHBhcmFtcy5lcnJvcikge1xuICAgICAgICAgICAgLy8gSGFuZGxlIGVycm9yXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIG5ldyByZWNlaXZpbmcgdHJhbnNwb3J0IHVzaW5nIHRoZSByZWNlaXZlZCBwYXJhbWV0ZXJzXG4gICAgICAgICAgICBpZiAoIWRldmljZSkge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RldmljZSBpcyBub3QgaW5pdGlhbGl6ZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IGNvbnN1bWVyVHJhbnNwb3J0ID0gZGV2aWNlLmNyZWF0ZVJlY3ZUcmFuc3BvcnQoeyAuLi5wYXJhbXMgfSk7XG5cbiAgICAgICAgICAgIC8vIEhhbmRsZSAnY29ubmVjdCcgZXZlbnQgZm9yIHRoZSBjb25zdW1lciB0cmFuc3BvcnRcbiAgICAgICAgICAgIGNvbnN1bWVyVHJhbnNwb3J0Lm9uKFxuICAgICAgICAgICAgICAnY29ubmVjdCcsXG4gICAgICAgICAgICAgIGFzeW5jIChcbiAgICAgICAgICAgICAgICB7IGR0bHNQYXJhbWV0ZXJzIH06IHsgZHRsc1BhcmFtZXRlcnM6IER0bHNQYXJhbWV0ZXJzIH0sXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHZvaWQsXG4gICAgICAgICAgICAgICAgZXJyYmFjazogKGVycm9yOiBhbnkpID0+IHZvaWQsXG4gICAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAvLyBFbWl0IHRyYW5zcG9ydC1yZWN2LWNvbm5lY3QgZXZlbnQgdG8gc2lnbmFsIGNvbm5lY3Rpb25cbiAgICAgICAgICAgICAgICAgIG5zb2NrLmVtaXQoJ3RyYW5zcG9ydC1yZWN2LWNvbm5lY3QnLCB7XG4gICAgICAgICAgICAgICAgICAgIGR0bHNQYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgICAgICBzZXJ2ZXJDb25zdW1lclRyYW5zcG9ydElkOiBwYXJhbXMuaWQsXG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgIGVycmJhY2soZXJyb3IpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIC8vIExpc3RlbiBmb3IgY29ubmVjdGlvbiBzdGF0ZSBjaGFuZ2VcbiAgICAgICAgICAgIGNvbnN1bWVyVHJhbnNwb3J0Lm9uKCdjb25uZWN0aW9uc3RhdGVjaGFuZ2UnLCBhc3luYyAoc3RhdGU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29ubmVjdGluZyc6XG4gICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgY29ubmVjdGluZyBzdGF0ZVxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjb25uZWN0ZWQnOlxuICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIGNvbm5lY3RlZCBzdGF0ZVxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmYWlsZWQnOlxuICAgICAgICAgICAgICAgICAgLy8gSGFuZGxlIGZhaWxlZCBzdGF0ZVxuICAgICAgICAgICAgICAgICAgY29uc3VtZXJUcmFuc3BvcnQuY2xvc2UoKTtcblxuICAgICAgICAgICAgICAgICAgLy8gUmVvcmRlciBzdHJlYW1zIGJhc2VkIG9uIGNvbmRpdGlvbnNcbiAgICAgICAgICAgICAgICAgIGlmIChsb2NrX3NjcmVlbikge1xuICAgICAgICAgICAgICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7IGFkZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHsgYWRkOiBmYWxzZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gQ29ubmVjdCB0aGUgcmVjZWl2aW5nIHRyYW5zcG9ydFxuICAgICAgICAgICAgYXdhaXQgY29ubmVjdFJlY3ZUcmFuc3BvcnQoe1xuICAgICAgICAgICAgICBjb25zdW1lclRyYW5zcG9ydCxcbiAgICAgICAgICAgICAgcmVtb3RlUHJvZHVjZXJJZCxcbiAgICAgICAgICAgICAgc2VydmVyQ29uc3VtZXJUcmFuc3BvcnRJZDogcGFyYW1zLmlkLFxuICAgICAgICAgICAgICBuc29jayxcbiAgICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnJvciwgJ2NyZWF0ZVJlY3ZUcmFuc3BvcnQgZXJyb3InKTtcbiAgICAgICAgICAgIC8vIEhhbmRsZSBlcnJvclxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKGVycm9yLCAnc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQgZXJyb3InKTtcbiAgICAgIC8vIEhhbmRsZSBlcnJvclxuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==