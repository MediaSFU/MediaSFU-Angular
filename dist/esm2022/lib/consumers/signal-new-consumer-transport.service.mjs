import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
export class SignalNewConsumerTransport {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2lnbmFsLW5ldy1jb25zdW1lci10cmFuc3BvcnQuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvc2lnbmFsLW5ldy1jb25zdW1lci10cmFuc3BvcnQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQW9DM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQW9DSztBQUlMLE1BQU0sT0FBTywwQkFBMEI7SUFFckMsMEJBQTBCLEdBQUcsS0FBSyxFQUFFLEVBQ2xDLGdCQUFnQixFQUNoQixPQUFPLEVBQ1AsS0FBSyxFQUNMLFVBQVUsR0FDd0IsRUFBNEIsRUFBRTtRQUNoRSxJQUFJLENBQUM7WUFDSCxJQUFJLEVBQ0YsTUFBTSxFQUNOLG1CQUFtQixFQUNuQixXQUFXLEVBQ1gseUJBQXlCLEVBQ3pCLG9CQUFvQixFQUNwQixjQUFjLEdBQ2YsR0FBRyxVQUFVLENBQUM7WUFFZix5QkFBeUI7WUFDekIsTUFBTSxhQUFhLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDdkQsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFDOUIsbUJBQW1CLEdBQUcsYUFBYSxDQUFDLG1CQUFtQixDQUFDO1lBRXhELDZCQUE2QjtZQUM3QixJQUFJLG1CQUFtQixDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7Z0JBQ25ELE9BQU8sbUJBQW1CLENBQUM7WUFDN0IsQ0FBQztZQUVELHNEQUFzRDtZQUN0RCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUMzQyx5QkFBeUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBRS9DLDREQUE0RDtZQUM1RCxLQUFLLENBQUMsSUFBSSxDQUNS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ICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHtcbiAgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICBSZW9yZGVyU3RyZWFtc1R5cGUsXG4gIENvbm5lY3RSZWN2VHJhbnNwb3J0VHlwZSxcbiAgQ29ubmVjdFJlY3ZUcmFuc3BvcnRQYXJhbWV0ZXJzLFxuICBDcmVhdGVXZWJSVENUcmFuc3BvcnRSZXNwb25zZSxcbn0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcbmltcG9ydCB7IERldmljZSwgRHRsc1BhcmFtZXRlcnMgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnRQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICAgIENvbm5lY3RSZWN2VHJhbnNwb3J0UGFyYW1ldGVycyB7XG4gIGRldmljZTogRGV2aWNlIHwgbnVsbDtcbiAgY29uc3VtaW5nVHJhbnNwb3J0czogc3RyaW5nW107XG4gIGxvY2tfc2NyZWVuOiBib29sZWFuO1xuICB1cGRhdGVDb25zdW1pbmdUcmFuc3BvcnRzOiAodHJhbnNwb3J0czogc3RyaW5nW10pID0+IHZvaWQ7XG4gIGNvbm5lY3RSZWN2VHJhbnNwb3J0OiBDb25uZWN0UmVjdlRyYW5zcG9ydFR5cGU7XG4gIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtc1R5cGU7XG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0UGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0T3B0aW9ucyB7XG4gIHJlbW90ZVByb2R1Y2VySWQ6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBuc29jazogU29ja2V0O1xuICBwYXJhbWV0ZXJzOiBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydFBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0VHlwZSA9IChcbiAgb3B0aW9uczogU2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnRPcHRpb25zLFxuKSA9PiBQcm9taXNlPHN0cmluZ1tdIHwgdm9pZD47XG5cbi8qKlxuICAgKiBTaWduYWxzIHRoZSBjcmVhdGlvbiBvZiBhIG5ldyBjb25zdW1lciB0cmFuc3BvcnQuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHNpZ25hbGluZyBhIG5ldyBjb25zdW1lciB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJlbW90ZVByb2R1Y2VySWQgLSBUaGUgSUQgb2YgdGhlIHJlbW90ZSBwcm9kdWNlci5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmlzbGV2ZWwgLSBJbmRpY2F0ZXMgdGhlIGxldmVsIG9mIHRoZSBjb25zdW1lci5cbiAgICogQHBhcmFtIHthbnl9IG9wdGlvbnMubnNvY2sgLSBUaGUgc29ja2V0IGluc3RhbmNlIGZvciBjb21tdW5pY2F0aW9uLlxuICAgKiBAcGFyYW0ge1NpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0T3B0aW9uc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHRoZSB0cmFuc3BvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHN0cmluZ1tdIHwgdm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGFuIGFycmF5IG9mIGNvbnN1bWluZyB0cmFuc3BvcnRzIG9yIHZvaWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgc2lnbmFsaW5nIHByb2Nlc3MgZmFpbHMuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAqICAgcmVtb3RlUHJvZHVjZXJJZDogJ3Byb2R1Y2VyLWlkJyxcbiAgICogICBpc2xldmVsOiB0cnVlLFxuICAgKiAgIG5zb2NrOiBzb2NrZXRJbnN0YW5jZSxcbiAgICogICBwYXJhbWV0ZXJzOiB7XG4gICAqICAgICBkZXZpY2U6IG1lZGlhRGV2aWNlLFxuICAgKiAgICAgY29uc3VtaW5nVHJhbnNwb3J0czogW10sXG4gICAqICAgICBsb2NrX3NjcmVlbjogZmFsc2UsXG4gICAqICAgICB1cGRhdGVDb25zdW1pbmdUcmFuc3BvcnRzOiB1cGRhdGVGdW5jdGlvbixcbiAgICogICAgIGNvbm5lY3RSZWN2VHJhbnNwb3J0OiBjb25uZWN0RnVuY3Rpb24sXG4gICAqICAgICByZW9yZGVyU3RyZWFtczogcmVvcmRlckZ1bmN0aW9uLFxuICAgKiAgICAgZ2V0VXBkYXRlZEFsbFBhcmFtczogZ2V0VXBkYXRlZFBhcmFtc0Z1bmN0aW9uLFxuICAgKiAgIH0sXG4gICAqIH07XG4gICAqXG4gICAqIHNpZ25hbE5ld0NvbnN1bWVyVHJhbnNwb3J0KG9wdGlvbnMpXG4gICAqICAgLnRoZW4oY29uc3VtaW5nVHJhbnNwb3J0cyA9PiB7XG4gICAqICAgICBjb25zb2xlLmxvZygnQ29uc3VtaW5nIFRyYW5zcG9ydHM6JywgY29uc3VtaW5nVHJhbnNwb3J0cyk7XG4gICAqICAgfSlcbiAgICogICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgKiAgICAgY29uc29sZS5lcnJvcignRXJyb3Igc2lnbmFsaW5nIG5ldyBjb25zdW1lciB0cmFuc3BvcnQ6JywgZXJyb3IpO1xuICAgKiAgIH0pO1xuICAgKi9cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCB7XG5cbiAgc2lnbmFsTmV3Q29uc3VtZXJUcmFuc3BvcnQgPSBhc3luYyAoe1xuICAgIHJlbW90ZVByb2R1Y2VySWQsXG4gICAgaXNsZXZlbCxcbiAgICBuc29jayxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBTaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydE9wdGlvbnMpOiBQcm9taXNlPHN0cmluZ1tdIHwgdm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQge1xuICAgICAgICBkZXZpY2UsXG4gICAgICAgIGNvbnN1bWluZ1RyYW5zcG9ydHMsXG4gICAgICAgIGxvY2tfc2NyZWVuLFxuICAgICAgICB1cGRhdGVDb25zdW1pbmdUcmFuc3BvcnRzLFxuICAgICAgICBjb25uZWN0UmVjdlRyYW5zcG9ydCxcbiAgICAgICAgcmVvcmRlclN0cmVhbXMsXG4gICAgICB9ID0gcGFyYW1ldGVycztcblxuICAgICAgLy8gR2V0IHVwZGF0ZWQgcGFyYW1ldGVyc1xuICAgICAgY29uc3QgdXBkYXRlZFBhcmFtcyA9IHBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgICAgZGV2aWNlID0gdXBkYXRlZFBhcmFtcy5kZXZpY2U7XG4gICAgICBjb25zdW1pbmdUcmFuc3BvcnRzID0gdXBkYXRlZFBhcmFtcy5jb25zdW1pbmdUcmFuc3BvcnRzO1xuXG4gICAgICAvLyBDaGVjayBpZiBhbHJlYWR5IGNvbnN1bWluZ1xuICAgICAgaWYgKGNvbnN1bWluZ1RyYW5zcG9ydHMuaW5jbHVkZXMocmVtb3RlUHJvZHVjZXJJZCkpIHtcbiAgICAgICAgcmV0dXJuIGNvbnN1bWluZ1RyYW5zcG9ydHM7XG4gICAgICB9XG5cbiAgICAgIC8vIEFkZCByZW1vdGUgcHJvZHVjZXIgSUQgdG8gY29uc3VtaW5nVHJhbnNwb3J0cyBhcnJheVxuICAgICAgY29uc3VtaW5nVHJhbnNwb3J0cy5wdXNoKHJlbW90ZVByb2R1Y2VySWQpO1xuICAgICAgdXBkYXRlQ29uc3VtaW5nVHJhbnNwb3J0cyhjb25zdW1pbmdUcmFuc3BvcnRzKTtcblxuICAgICAgLy8gRW1pdCBjcmVhdGVXZWJSdGNUcmFuc3BvcnQgZXZlbnQgdG8gc2lnbmFsIGEgbmV3IGNvbnN1bWVyXG4gICAgICBuc29jay5lbWl0KFxuICAgICAgICAnY3JlYXRlV2ViUnRjVHJhbnNwb3J0JyxcbiAgICAgICAgeyBjb25zdW1lcjogdHJ1ZSwgaXNsZXZlbCB9LFxuICAgICAgICBhc3luYyAoeyBwYXJhbXMgfTogeyBwYXJhbXM6IENyZWF0ZVdlYlJUQ1RyYW5zcG9ydFJlc3BvbnNlIH0pID0+IHtcbiAgICAgICAgICBpZiAocGFyYW1zLmVycm9yKSB7XG4gICAgICAgICAgICAvLyBIYW5kbGUgZXJyb3JcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gQ3JlYXRlIGEgbmV3IHJlY2VpdmluZyB0cmFuc3BvcnQgdXNpbmcgdGhlIHJlY2VpdmVkIHBhcmFtZXRlcnNcbiAgICAgICAgICAgIGlmICghZGV2aWNlKSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGV2aWNlIGlzIG5vdCBpbml0aWFsaXplZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY29uc3QgY29uc3VtZXJUcmFuc3BvcnQgPSBkZXZpY2UuY3JlYXRlUmVjdlRyYW5zcG9ydCh7IC4uLnBhcmFtcyB9KTtcblxuICAgICAgICAgICAgLy8gSGFuZGxlICdjb25uZWN0JyBldmVudCBmb3IgdGhlIGNvbnN1bWVyIHRyYW5zcG9ydFxuICAgICAgICAgICAgY29uc3VtZXJUcmFuc3BvcnQub24oXG4gICAgICAgICAgICAgICdjb25uZWN0JyxcbiAgICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICAgIHsgZHRsc1BhcmFtZXRlcnMgfTogeyBkdGxzUGFyYW1ldGVyczogRHRsc1BhcmFtZXRlcnMgfSxcbiAgICAgICAgICAgICAgICBjYWxsYmFjazogKCkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgICBlcnJiYWNrOiAoZXJyb3I6IGFueSkgPT4gdm9pZCxcbiAgICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIC8vIEVtaXQgdHJhbnNwb3J0LXJlY3YtY29ubmVjdCBldmVudCB0byBzaWduYWwgY29ubmVjdGlvblxuICAgICAgICAgICAgICAgICAgbnNvY2suZW1pdCgndHJhbnNwb3J0LXJlY3YtY29ubmVjdCcsIHtcbiAgICAgICAgICAgICAgICAgICAgZHRsc1BhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICAgIHNlcnZlckNvbnN1bWVyVHJhbnNwb3J0SWQ6IHBhcmFtcy5pZCxcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgICAgICAgZXJyYmFjayhlcnJvcik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgLy8gTGlzdGVuIGZvciBjb25uZWN0aW9uIHN0YXRlIGNoYW5nZVxuICAgICAgICAgICAgY29uc3VtZXJUcmFuc3BvcnQub24oJ2Nvbm5lY3Rpb25zdGF0ZWNoYW5nZScsIGFzeW5jIChzdGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgIHN3aXRjaCAoc3RhdGUpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdjb25uZWN0aW5nJzpcbiAgICAgICAgICAgICAgICAgIC8vIEhhbmRsZSBjb25uZWN0aW5nIHN0YXRlXG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Nvbm5lY3RlZCc6XG4gICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgY29ubmVjdGVkIHN0YXRlXG4gICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2ZhaWxlZCc6XG4gICAgICAgICAgICAgICAgICAvLyBIYW5kbGUgZmFpbGVkIHN0YXRlXG4gICAgICAgICAgICAgICAgICBjb25zdW1lclRyYW5zcG9ydC5jbG9zZSgpO1xuXG4gICAgICAgICAgICAgICAgICAvLyBSZW9yZGVyIHN0cmVhbXMgYmFzZWQgb24gY29uZGl0aW9uc1xuICAgICAgICAgICAgICAgICAgaWYgKGxvY2tfc2NyZWVuKSB7XG4gICAgICAgICAgICAgICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHsgYWRkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoeyBhZGQ6IGZhbHNlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBDb25uZWN0IHRoZSByZWNlaXZpbmcgdHJhbnNwb3J0XG4gICAgICAgICAgICBhd2FpdCBjb25uZWN0UmVjdlRyYW5zcG9ydCh7XG4gICAgICAgICAgICAgIGNvbnN1bWVyVHJhbnNwb3J0LFxuICAgICAgICAgICAgICByZW1vdGVQcm9kdWNlcklkLFxuICAgICAgICAgICAgICBzZXJ2ZXJDb25zdW1lclRyYW5zcG9ydElkOiBwYXJhbXMuaWQsXG4gICAgICAgICAgICAgIG5zb2NrLFxuICAgICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycm9yLCAnY3JlYXRlUmVjdlRyYW5zcG9ydCBlcnJvcicpO1xuICAgICAgICAgICAgLy8gSGFuZGxlIGVycm9yXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coZXJyb3IsICdzaWduYWxOZXdDb25zdW1lclRyYW5zcG9ydCBlcnJvcicpO1xuICAgICAgLy8gSGFuZGxlIGVycm9yXG4gICAgICByZXR1cm47XG4gICAgfVxuICB9O1xufVxuIl19