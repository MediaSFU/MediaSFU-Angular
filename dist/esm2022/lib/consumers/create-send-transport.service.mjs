import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Creates a WebRTC send transport and sets up event handlers for the transport.
 *
 * @param {CreateSendTransportOptions} options - The options for creating the send transport.
 * @param {'audio' | 'video' | 'screen' | 'all'} options.option - The type of transport to create.
 * @param {CreateSendTransportParameters} options.parameters - The parameters required for creating the transport.
 * @param {string} options.parameters.islevel - Indicates the level of the transport.
 * @param {string} options.parameters.member - The member name associated with the transport.
 * @param {Socket} options.parameters.socket - The socket instance for communication.
 * @param {Device | null} options.parameters.device - The WebRTC device instance.
 * @param {boolean} options.parameters.transportCreated - Flag indicating if the transport is created.
 * @param {Transport | null} options.parameters.producerTransport - The producer transport instance.
 * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport.
 * @param {Function} options.parameters.updateTransportCreated - Function to update the transport creation state.
 * @param {Function} options.parameters.connectSendTransport - Function to connect the send transport.
 *
 * @returns {Promise<void>} A promise that resolves when the send transport is created and configured.
 *
 * @throws Will throw an error if there is an issue creating the send transport.
 *
 * @example
 * ```typescript
 * const options = {
 *   option: 'audio',
 *   parameters: {
 *     islevel: '2',
 *     member: 'currentMember',
 *     socket: socketInstance,
 *     device: deviceInstance,
 *     transportCreated: false,
 *     producerTransport: null,
 *     updateProducerTransport: (transport) => { console.log(updated) },
 *     updateTransportCreated: (state) => { console.log(updated) },
 *     connectSendTransport: connectSendTransportFunction,
 *   },
 * };
 *
 * createSendTransportService.createSendTransport(options)
 *   .then(() => {
 *     console.log('Send transport created successfully');
 *   })
 *   .catch((error) => {
 *     console.error('Error creating send transport:', error);
 *   });
 * ```
 */
export class CreateSendTransport {
    /**
     * Creates a WebRTC send transport and sets up event handlers for the transport.
     *
     * @param {CreateSendTransportOptions} options - The options for creating the send transport.
     * @param {Object} options.option - Additional options for the transport creation.
     * @param {Object} options.parameters - The parameters required for creating the transport.
     * @param {boolean} options.parameters.islevel - Indicates the level of the transport.
     * @param {string} options.parameters.member - The member name associated with the transport.
     * @param {Socket} options.parameters.socket - The socket instance for communication.
     * @param {Device} options.parameters.device - The WebRTC device instance.
     * @param {boolean} options.parameters.transportCreated - Flag indicating if the transport is created.
     * @param {Transport} options.parameters.producerTransport - The producer transport instance.
     * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport.
     * @param {Function} options.parameters.updateTransportCreated - Function to update the transport creation state.
     * @param {Function} options.parameters.connectSendTransport - Function to connect the send transport.
     * @returns {Promise<void>} A promise that resolves when the send transport is created and configured.
     *
     * @throws Will throw an error if there is an issue creating the send transport.
     */
    async createSendTransport({ option, parameters }) {
        try {
            // Destructure parameters
            let { islevel, member, device, socket, transportCreated, producerTransport, updateProducerTransport, updateTransportCreated, connectSendTransport, getUpdatedAllParams, } = parameters;
            const updatedParams = getUpdatedAllParams();
            device = updatedParams.device;
            socket = updatedParams.socket;
            // Emit createWebRtcTransport event to the server
            socket.emit('createWebRtcTransport', { consumer: false, islevel: islevel }, async ({ params }) => {
                // Check if there is an error in the response
                if (params && params.error) {
                    return;
                }
                // Create a WebRTC send transport
                if (device) {
                    producerTransport = device.createSendTransport(params);
                }
                else {
                    throw new Error('Device is null');
                }
                updateProducerTransport(producerTransport);
                // Handle 'connect' event
                producerTransport.on('connect', async ({ dtlsParameters }, callback, errback) => {
                    try {
                        socket.emit('transport-connect', {
                            dtlsParameters,
                        });
                        callback();
                    }
                    catch (error) {
                        errback(error);
                    }
                });
                // Handle 'produce' event
                producerTransport.on('produce', async (parameters, callback, errback) => {
                    try {
                        socket.emit('transport-produce', {
                            kind: parameters.kind,
                            rtpParameters: parameters.rtpParameters,
                            appData: parameters.appData,
                            islevel: islevel,
                            name: member,
                        }, ({ id }) => {
                            callback({ id });
                        });
                    }
                    catch (error) {
                        errback(error);
                    }
                });
                // Handle 'connectionstatechange' event
                producerTransport.on('connectionstatechange', (state) => {
                    switch (state) {
                        case 'connecting':
                            break;
                        case 'connected':
                            break;
                        case 'failed':
                            producerTransport?.close();
                            break;
                        default:
                            break;
                    }
                });
                // Update transport creation state
                transportCreated = true;
                await connectSendTransport({
                    option: option,
                    parameters: {
                        ...parameters,
                        producerTransport: producerTransport,
                    },
                });
                updateTransportCreated(transportCreated);
            });
        }
        catch (error) {
            // Handle errors during transport creation
            try {
                const { showAlert } = parameters;
                if (showAlert) {
                    showAlert({
                        message: 'Error creating send transport.',
                        type: 'danger',
                        duration: 3000,
                    });
                }
            }
            catch (innerError) {
                console.log('Error creating send transport:', innerError);
            }
            console.log('Error creating send transport:', error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CreateSendTransport, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CreateSendTransport, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CreateSendTransport, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNlbmQtdHJhbnNwb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2NyZWF0ZS1zZW5kLXRyYW5zcG9ydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBNkJ6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkNHO0FBTUwsTUFBTSxPQUFPLG1CQUFtQjtJQUM5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHO0lBQ0gsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBOEI7UUFDMUUsSUFBSSxDQUFDO1lBQ0gseUJBQXlCO1lBQ3pCLElBQUksRUFDRixPQUFPLEVBQ1AsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFNLEVBQ04sZ0JBQWdCLEVBQ2hCLGlCQUFpQixFQUNqQix1QkFBdUIsRUFDdkIsc0JBQXNCLEVBQ3RCLG9CQUFvQixFQUNwQixtQkFBbUIsR0FDcEIsR0FBRyxVQUFVLENBQUM7WUFFZixNQUFNLGFBQWEsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1lBQzVDLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBQzlCLE1BQU0sR0FBRyxhQUFhLENBQUMsTUFBTSxDQUFDO1lBRTlCLGlEQUFpRDtZQUNqRCxNQUFNLENBQUMsSUFBSSxDQUNULHVCQUF1QixFQUN2QixFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUNyQyxLQUFLLEVBQUUsRUFBRSxNQUFNLEVBQU8sRUFBRSxFQUFFO2dCQUN4Qiw2Q0FBNkM7Z0JBQzdDLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztvQkFDM0IsT0FBTztn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QUFDO2dCQUNwQixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzVELENBQUM7WUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELENBQUM7SUFDSCxDQUFDO3VHQXJKVSxtQkFBbUI7MkdBQW5CLG1CQUFtQixjQUZsQixNQUFNOzsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQgeyBEZXZpY2UsIFRyYW5zcG9ydCwgRHRsc1BhcmFtZXRlcnMgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5pbXBvcnQgeyBDb25uZWN0U2VuZFRyYW5zcG9ydFBhcmFtZXRlcnMsIENvbm5lY3RTZW5kVHJhbnNwb3J0VHlwZSB9IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3JlYXRlU2VuZFRyYW5zcG9ydFBhcmFtZXRlcnMgZXh0ZW5kcyBDb25uZWN0U2VuZFRyYW5zcG9ydFBhcmFtZXRlcnMge1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIG1lbWJlcjogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgZGV2aWNlOiBEZXZpY2UgfCBudWxsO1xuICB0cmFuc3BvcnRDcmVhdGVkOiBib29sZWFuO1xuICBwcm9kdWNlclRyYW5zcG9ydDogVHJhbnNwb3J0IHwgbnVsbDtcbiAgdXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQ6IChwcm9kdWNlclRyYW5zcG9ydDogVHJhbnNwb3J0IHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZDogKHRyYW5zcG9ydENyZWF0ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGNvbm5lY3RTZW5kVHJhbnNwb3J0OiBDb25uZWN0U2VuZFRyYW5zcG9ydFR5cGU7XG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IENyZWF0ZVNlbmRUcmFuc3BvcnRQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3JlYXRlU2VuZFRyYW5zcG9ydE9wdGlvbnMge1xuICBvcHRpb246ICdhdWRpbycgfCAndmlkZW8nIHwgJ3NjcmVlbicgfCAnYWxsJztcbiAgcGFyYW1ldGVyczogQ3JlYXRlU2VuZFRyYW5zcG9ydFBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENyZWF0ZVNlbmRUcmFuc3BvcnRUeXBlID0gKG9wdGlvbnM6IENyZWF0ZVNlbmRUcmFuc3BvcnRPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgV2ViUlRDIHNlbmQgdHJhbnNwb3J0IGFuZCBzZXRzIHVwIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0ge0NyZWF0ZVNlbmRUcmFuc3BvcnRPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRoZSBzZW5kIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHsnYXVkaW8nIHwgJ3ZpZGVvJyB8ICdzY3JlZW4nIHwgJ2FsbCd9IG9wdGlvbnMub3B0aW9uIC0gVGhlIHR5cGUgb2YgdHJhbnNwb3J0IHRvIGNyZWF0ZS5cbiAgICogQHBhcmFtIHtDcmVhdGVTZW5kVHJhbnNwb3J0UGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIGNyZWF0aW5nIHRoZSB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaXNsZXZlbCAtIEluZGljYXRlcyB0aGUgbGV2ZWwgb2YgdGhlIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZW1iZXIgLSBUaGUgbWVtYmVyIG5hbWUgYXNzb2NpYXRlZCB3aXRoIHRoZSB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnBhcmFtZXRlcnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSBmb3IgY29tbXVuaWNhdGlvbi5cbiAgICogQHBhcmFtIHtEZXZpY2UgfCBudWxsfSBvcHRpb25zLnBhcmFtZXRlcnMuZGV2aWNlIC0gVGhlIFdlYlJUQyBkZXZpY2UgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHRyYW5zcG9ydCBpcyBjcmVhdGVkLlxuICAgKiBAcGFyYW0ge1RyYW5zcG9ydCB8IG51bGx9IG9wdGlvbnMucGFyYW1ldGVycy5wcm9kdWNlclRyYW5zcG9ydCAtIFRoZSBwcm9kdWNlciB0cmFuc3BvcnQgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVQcm9kdWNlclRyYW5zcG9ydCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcHJvZHVjZXIgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVHJhbnNwb3J0Q3JlYXRlZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdHJhbnNwb3J0IGNyZWF0aW9uIHN0YXRlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuY29ubmVjdFNlbmRUcmFuc3BvcnQgLSBGdW5jdGlvbiB0byBjb25uZWN0IHRoZSBzZW5kIHRyYW5zcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNlbmQgdHJhbnNwb3J0IGlzIGNyZWF0ZWQgYW5kIGNvbmZpZ3VyZWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBjcmVhdGluZyB0aGUgc2VuZCB0cmFuc3BvcnQuXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3Qgb3B0aW9ucyA9IHtcbiAgICogICBvcHRpb246ICdhdWRpbycsXG4gICAqICAgcGFyYW1ldGVyczoge1xuICAgKiAgICAgaXNsZXZlbDogJzInLFxuICAgKiAgICAgbWVtYmVyOiAnY3VycmVudE1lbWJlcicsXG4gICAqICAgICBzb2NrZXQ6IHNvY2tldEluc3RhbmNlLFxuICAgKiAgICAgZGV2aWNlOiBkZXZpY2VJbnN0YW5jZSxcbiAgICogICAgIHRyYW5zcG9ydENyZWF0ZWQ6IGZhbHNlLFxuICAgKiAgICAgcHJvZHVjZXJUcmFuc3BvcnQ6IG51bGwsXG4gICAqICAgICB1cGRhdGVQcm9kdWNlclRyYW5zcG9ydDogKHRyYW5zcG9ydCkgPT4geyBjb25zb2xlLmxvZyh1cGRhdGVkKSB9LFxuICAgKiAgICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZDogKHN0YXRlKSA9PiB7IGNvbnNvbGUubG9nKHVwZGF0ZWQpIH0sXG4gICAqICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydDogY29ubmVjdFNlbmRUcmFuc3BvcnRGdW5jdGlvbixcbiAgICogICB9LFxuICAgKiB9O1xuICAgKlxuICAgKiBjcmVhdGVTZW5kVHJhbnNwb3J0U2VydmljZS5jcmVhdGVTZW5kVHJhbnNwb3J0KG9wdGlvbnMpXG4gICAqICAgLnRoZW4oKCkgPT4ge1xuICAgKiAgICAgY29uc29sZS5sb2coJ1NlbmQgdHJhbnNwb3J0IGNyZWF0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAqICAgfSlcbiAgICogICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAqICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjcmVhdGluZyBzZW5kIHRyYW5zcG9ydDonLCBlcnJvcik7XG4gICAqICAgfSk7XG4gICAqIGBgYFxuICAgKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ3JlYXRlU2VuZFRyYW5zcG9ydCB7XG4gIC8qKlxuICAgKiBDcmVhdGVzIGEgV2ViUlRDIHNlbmQgdHJhbnNwb3J0IGFuZCBzZXRzIHVwIGV2ZW50IGhhbmRsZXJzIGZvciB0aGUgdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAcGFyYW0ge0NyZWF0ZVNlbmRUcmFuc3BvcnRPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNyZWF0aW5nIHRoZSBzZW5kIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMub3B0aW9uIC0gQWRkaXRpb25hbCBvcHRpb25zIGZvciB0aGUgdHJhbnNwb3J0IGNyZWF0aW9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIGNyZWF0aW5nIHRoZSB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzbGV2ZWwgLSBJbmRpY2F0ZXMgdGhlIGxldmVsIG9mIHRoZSB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMubWVtYmVyIC0gVGhlIG1lbWJlciBuYW1lIGFzc29jaWF0ZWQgd2l0aCB0aGUgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNvY2tldCAtIFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIGNvbW11bmljYXRpb24uXG4gICAqIEBwYXJhbSB7RGV2aWNlfSBvcHRpb25zLnBhcmFtZXRlcnMuZGV2aWNlIC0gVGhlIFdlYlJUQyBkZXZpY2UgaW5zdGFuY2UuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnRyYW5zcG9ydENyZWF0ZWQgLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHRyYW5zcG9ydCBpcyBjcmVhdGVkLlxuICAgKiBAcGFyYW0ge1RyYW5zcG9ydH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnByb2R1Y2VyVHJhbnNwb3J0IC0gVGhlIHByb2R1Y2VyIHRyYW5zcG9ydCBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBwcm9kdWNlciB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVUcmFuc3BvcnRDcmVhdGVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB0cmFuc3BvcnQgY3JlYXRpb24gc3RhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jb25uZWN0U2VuZFRyYW5zcG9ydCAtIEZ1bmN0aW9uIHRvIGNvbm5lY3QgdGhlIHNlbmQgdHJhbnNwb3J0LlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgc2VuZCB0cmFuc3BvcnQgaXMgY3JlYXRlZCBhbmQgY29uZmlndXJlZC5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZXJlIGlzIGFuIGlzc3VlIGNyZWF0aW5nIHRoZSBzZW5kIHRyYW5zcG9ydC5cbiAgICovXG4gIGFzeW5jIGNyZWF0ZVNlbmRUcmFuc3BvcnQoeyBvcHRpb24sIHBhcmFtZXRlcnMgfTogQ3JlYXRlU2VuZFRyYW5zcG9ydE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgLy8gRGVzdHJ1Y3R1cmUgcGFyYW1ldGVyc1xuICAgICAgbGV0IHtcbiAgICAgICAgaXNsZXZlbCxcbiAgICAgICAgbWVtYmVyLFxuICAgICAgICBkZXZpY2UsXG4gICAgICAgIHNvY2tldCxcbiAgICAgICAgdHJhbnNwb3J0Q3JlYXRlZCxcbiAgICAgICAgcHJvZHVjZXJUcmFuc3BvcnQsXG4gICAgICAgIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0LFxuICAgICAgICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkLFxuICAgICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydCxcbiAgICAgICAgZ2V0VXBkYXRlZEFsbFBhcmFtcyxcbiAgICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICBjb25zdCB1cGRhdGVkUGFyYW1zID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgICAgZGV2aWNlID0gdXBkYXRlZFBhcmFtcy5kZXZpY2U7XG4gICAgICBzb2NrZXQgPSB1cGRhdGVkUGFyYW1zLnNvY2tldDtcblxuICAgICAgLy8gRW1pdCBjcmVhdGVXZWJSdGNUcmFuc3BvcnQgZXZlbnQgdG8gdGhlIHNlcnZlclxuICAgICAgc29ja2V0LmVtaXQoXG4gICAgICAgICdjcmVhdGVXZWJSdGNUcmFuc3BvcnQnLFxuICAgICAgICB7IGNvbnN1bWVyOiBmYWxzZSwgaXNsZXZlbDogaXNsZXZlbCB9LFxuICAgICAgICBhc3luYyAoeyBwYXJhbXMgfTogYW55KSA9PiB7XG4gICAgICAgICAgLy8gQ2hlY2sgaWYgdGhlcmUgaXMgYW4gZXJyb3IgaW4gdGhlIHJlc3BvbnNlXG4gICAgICAgICAgaWYgKHBhcmFtcyAmJiBwYXJhbXMuZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBDcmVhdGUgYSBXZWJSVEMgc2VuZCB0cmFuc3BvcnRcbiAgICAgICAgICBpZiAoZGV2aWNlKSB7XG4gICAgICAgICAgICBwcm9kdWNlclRyYW5zcG9ydCA9IGRldmljZS5jcmVhdGVTZW5kVHJhbnNwb3J0KHBhcmFtcyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRGV2aWNlIGlzIG51bGwnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQocHJvZHVjZXJUcmFuc3BvcnQpO1xuXG4gICAgICAgICAgLy8gSGFuZGxlICdjb25uZWN0JyBldmVudFxuICAgICAgICAgIHByb2R1Y2VyVHJhbnNwb3J0Lm9uKFxuICAgICAgICAgICAgJ2Nvbm5lY3QnLFxuICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICB7IGR0bHNQYXJhbWV0ZXJzIH06IHsgZHRsc1BhcmFtZXRlcnM6IER0bHNQYXJhbWV0ZXJzIH0sXG4gICAgICAgICAgICAgIGNhbGxiYWNrOiAoKSA9PiB2b2lkLFxuICAgICAgICAgICAgICBlcnJiYWNrOiAoZXJyb3I6IGFueSkgPT4gdm9pZCxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KCd0cmFuc3BvcnQtY29ubmVjdCcsIHtcbiAgICAgICAgICAgICAgICAgIGR0bHNQYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKCk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgZXJyYmFjayhlcnJvcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIC8vIEhhbmRsZSAncHJvZHVjZScgZXZlbnRcbiAgICAgICAgICBwcm9kdWNlclRyYW5zcG9ydC5vbihcbiAgICAgICAgICAgICdwcm9kdWNlJyxcbiAgICAgICAgICAgIGFzeW5jIChcbiAgICAgICAgICAgICAgcGFyYW1ldGVyczogYW55LFxuICAgICAgICAgICAgICBjYWxsYmFjazogKGFyZzA6IHsgaWQ6IGFueSB9KSA9PiB2b2lkLFxuICAgICAgICAgICAgICBlcnJiYWNrOiAoZXJyb3I6IGFueSkgPT4gdm9pZCxcbiAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHNvY2tldC5lbWl0KFxuICAgICAgICAgICAgICAgICAgJ3RyYW5zcG9ydC1wcm9kdWNlJyxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAga2luZDogcGFyYW1ldGVycy5raW5kLFxuICAgICAgICAgICAgICAgICAgICBydHBQYXJhbWV0ZXJzOiBwYXJhbWV0ZXJzLnJ0cFBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgICAgIGFwcERhdGE6IHBhcmFtZXRlcnMuYXBwRGF0YSxcbiAgICAgICAgICAgICAgICAgICAgaXNsZXZlbDogaXNsZXZlbCxcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbWVtYmVyLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICh7IGlkIH06IHsgaWQ6IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHsgaWQgfSk7XG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgICAgZXJyYmFjayhlcnJvcik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIC8vIEhhbmRsZSAnY29ubmVjdGlvbnN0YXRlY2hhbmdlJyBldmVudFxuICAgICAgICAgIHByb2R1Y2VyVHJhbnNwb3J0Lm9uKCdjb25uZWN0aW9uc3RhdGVjaGFuZ2UnLCAoc3RhdGU6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgc3dpdGNoIChzdGF0ZSkge1xuICAgICAgICAgICAgICBjYXNlICdjb25uZWN0aW5nJzpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnY29ubmVjdGVkJzpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSAnZmFpbGVkJzpcbiAgICAgICAgICAgICAgICBwcm9kdWNlclRyYW5zcG9ydD8uY2xvc2UoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFVwZGF0ZSB0cmFuc3BvcnQgY3JlYXRpb24gc3RhdGVcbiAgICAgICAgICB0cmFuc3BvcnRDcmVhdGVkID0gdHJ1ZTtcbiAgICAgICAgICBhd2FpdCBjb25uZWN0U2VuZFRyYW5zcG9ydCh7XG4gICAgICAgICAgICBvcHRpb246IG9wdGlvbixcbiAgICAgICAgICAgIHBhcmFtZXRlcnM6IHtcbiAgICAgICAgICAgICAgLi4ucGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgcHJvZHVjZXJUcmFuc3BvcnQ6IHByb2R1Y2VyVHJhbnNwb3J0LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQodHJhbnNwb3J0Q3JlYXRlZCk7XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBIYW5kbGUgZXJyb3JzIGR1cmluZyB0cmFuc3BvcnQgY3JlYXRpb25cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHsgc2hvd0FsZXJ0IH0gPSBwYXJhbWV0ZXJzO1xuICAgICAgICBpZiAoc2hvd0FsZXJ0KSB7XG4gICAgICAgICAgc2hvd0FsZXJ0KHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdFcnJvciBjcmVhdGluZyBzZW5kIHRyYW5zcG9ydC4nLFxuICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoaW5uZXJFcnJvcikge1xuICAgICAgICBjb25zb2xlLmxvZygnRXJyb3IgY3JlYXRpbmcgc2VuZCB0cmFuc3BvcnQ6JywgaW5uZXJFcnJvcik7XG4gICAgICB9XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgY3JlYXRpbmcgc2VuZCB0cmFuc3BvcnQ6JywgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19