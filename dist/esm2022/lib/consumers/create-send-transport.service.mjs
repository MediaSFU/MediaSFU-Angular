import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNlbmQtdHJhbnNwb3J0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2NyZWF0ZS1zZW5kLXRyYW5zcG9ydC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBZ0MzQyxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FrQkc7SUFDSCxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUE4QjtRQUMxRSxJQUFJLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsSUFBSSxFQUNGLE9BQU8sRUFDUCxNQUFNLEVBQ04sTUFBTSxFQUNOLE1BQU0sRUFDTixnQkFBZ0IsRUFDaEIsaUJBQWlCLEVBQ2pCLHVCQUF1QixFQUN2QixzQkFBc0IsRUFDdEIsb0JBQW9CLEVBQ3BCLG1CQUFtQixHQUNwQixHQUFHLFVBQVUsQ0FBQztZQUVmLE1BQU0sYUFBYSxHQUFHLG1CQUFtQixFQUFFLENBQUM7WUFDNUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFDOUIsTUFBTSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQUM7WUFFOUIsaURBQWlEO1lBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQ1QsdUJBQXVCLEVBQ3ZCLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLEVBQ3JDLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBTyxFQUFFLEVBQUU7Z0JBQ3hCLDZDQUE2QztnQkFDN0MsSUFBSSxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUMzQixPQUFPO2dCQUNULENBQUM7Z0JBRUQsaUNBQWlDO2dCQUNqQyxJQUFJLE1BQU0sRUFBRSxDQUFDO29CQUNY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QUM7WUFDNUQsQ0FBQztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDdkQsQ0FBQztJQUNILENBQUM7dUdBckpVLG1CQUFtQjsyR0FBbkIsbUJBQW1CLGNBRmxCLE1BQU07OzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IERldmljZSwgVHJhbnNwb3J0LCBEdGxzUGFyYW1ldGVycyB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmltcG9ydCB7IENvbm5lY3RTZW5kVHJhbnNwb3J0UGFyYW1ldGVycywgQ29ubmVjdFNlbmRUcmFuc3BvcnRUeXBlIH0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBDcmVhdGVTZW5kVHJhbnNwb3J0UGFyYW1ldGVycyBleHRlbmRzIENvbm5lY3RTZW5kVHJhbnNwb3J0UGFyYW1ldGVycyB7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIHNvY2tldDogU29ja2V0O1xuICBkZXZpY2U6IERldmljZSB8IG51bGw7XG4gIHRyYW5zcG9ydENyZWF0ZWQ6IGJvb2xlYW47XG4gIHByb2R1Y2VyVHJhbnNwb3J0OiBUcmFuc3BvcnQgfCBudWxsO1xuICB1cGRhdGVQcm9kdWNlclRyYW5zcG9ydDogKHByb2R1Y2VyVHJhbnNwb3J0OiBUcmFuc3BvcnQgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVUcmFuc3BvcnRDcmVhdGVkOiAodHJhbnNwb3J0Q3JlYXRlZDogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgY29ubmVjdFNlbmRUcmFuc3BvcnQ6IENvbm5lY3RTZW5kVHJhbnNwb3J0VHlwZTtcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gQ3JlYXRlU2VuZFRyYW5zcG9ydFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDcmVhdGVTZW5kVHJhbnNwb3J0T3B0aW9ucyB7XG4gIG9wdGlvbjogJ2F1ZGlvJyB8ICd2aWRlbycgfCAnc2NyZWVuJyB8ICdhbGwnO1xuICBwYXJhbWV0ZXJzOiBDcmVhdGVTZW5kVHJhbnNwb3J0UGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ3JlYXRlU2VuZFRyYW5zcG9ydFR5cGUgPSAob3B0aW9uczogQ3JlYXRlU2VuZFRyYW5zcG9ydE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDcmVhdGVTZW5kVHJhbnNwb3J0IHtcbiAgLyoqXG4gICAqIENyZWF0ZXMgYSBXZWJSVEMgc2VuZCB0cmFuc3BvcnQgYW5kIHNldHMgdXAgZXZlbnQgaGFuZGxlcnMgZm9yIHRoZSB0cmFuc3BvcnQuXG4gICAqXG4gICAqIEBwYXJhbSB7Q3JlYXRlU2VuZFRyYW5zcG9ydE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY3JlYXRpbmcgdGhlIHNlbmQgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5vcHRpb24gLSBBZGRpdGlvbmFsIG9wdGlvbnMgZm9yIHRoZSB0cmFuc3BvcnQgY3JlYXRpb24uXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3IgY3JlYXRpbmcgdGhlIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuaXNsZXZlbCAtIEluZGljYXRlcyB0aGUgbGV2ZWwgb2YgdGhlIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZW1iZXIgLSBUaGUgbWVtYmVyIG5hbWUgYXNzb2NpYXRlZCB3aXRoIHRoZSB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnBhcmFtZXRlcnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSBmb3IgY29tbXVuaWNhdGlvbi5cbiAgICogQHBhcmFtIHtEZXZpY2V9IG9wdGlvbnMucGFyYW1ldGVycy5kZXZpY2UgLSBUaGUgV2ViUlRDIGRldmljZSBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudHJhbnNwb3J0Q3JlYXRlZCAtIEZsYWcgaW5kaWNhdGluZyBpZiB0aGUgdHJhbnNwb3J0IGlzIGNyZWF0ZWQuXG4gICAqIEBwYXJhbSB7VHJhbnNwb3J0fSBvcHRpb25zLnBhcmFtZXRlcnMucHJvZHVjZXJUcmFuc3BvcnQgLSBUaGUgcHJvZHVjZXIgdHJhbnNwb3J0IGluc3RhbmNlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHByb2R1Y2VyIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHRyYW5zcG9ydCBjcmVhdGlvbiBzdGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbm5lY3RTZW5kVHJhbnNwb3J0IC0gRnVuY3Rpb24gdG8gY29ubmVjdCB0aGUgc2VuZCB0cmFuc3BvcnQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzZW5kIHRyYW5zcG9ydCBpcyBjcmVhdGVkIGFuZCBjb25maWd1cmVkLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYW4gaXNzdWUgY3JlYXRpbmcgdGhlIHNlbmQgdHJhbnNwb3J0LlxuICAgKi9cbiAgYXN5bmMgY3JlYXRlU2VuZFRyYW5zcG9ydCh7IG9wdGlvbiwgcGFyYW1ldGVycyB9OiBDcmVhdGVTZW5kVHJhbnNwb3J0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBEZXN0cnVjdHVyZSBwYXJhbWV0ZXJzXG4gICAgICBsZXQge1xuICAgICAgICBpc2xldmVsLFxuICAgICAgICBtZW1iZXIsXG4gICAgICAgIGRldmljZSxcbiAgICAgICAgc29ja2V0LFxuICAgICAgICB0cmFuc3BvcnRDcmVhdGVkLFxuICAgICAgICBwcm9kdWNlclRyYW5zcG9ydCxcbiAgICAgICAgdXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQsXG4gICAgICAgIHVwZGF0ZVRyYW5zcG9ydENyZWF0ZWQsXG4gICAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0LFxuICAgICAgICBnZXRVcGRhdGVkQWxsUGFyYW1zLFxuICAgICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIGNvbnN0IHVwZGF0ZWRQYXJhbXMgPSBnZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgICBkZXZpY2UgPSB1cGRhdGVkUGFyYW1zLmRldmljZTtcbiAgICAgIHNvY2tldCA9IHVwZGF0ZWRQYXJhbXMuc29ja2V0O1xuXG4gICAgICAvLyBFbWl0IGNyZWF0ZVdlYlJ0Y1RyYW5zcG9ydCBldmVudCB0byB0aGUgc2VydmVyXG4gICAgICBzb2NrZXQuZW1pdChcbiAgICAgICAgJ2NyZWF0ZVdlYlJ0Y1RyYW5zcG9ydCcsXG4gICAgICAgIHsgY29uc3VtZXI6IGZhbHNlLCBpc2xldmVsOiBpc2xldmVsIH0sXG4gICAgICAgIGFzeW5jICh7IHBhcmFtcyB9OiBhbnkpID0+IHtcbiAgICAgICAgICAvLyBDaGVjayBpZiB0aGVyZSBpcyBhbiBlcnJvciBpbiB0aGUgcmVzcG9uc2VcbiAgICAgICAgICBpZiAocGFyYW1zICYmIHBhcmFtcy5lcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIENyZWF0ZSBhIFdlYlJUQyBzZW5kIHRyYW5zcG9ydFxuICAgICAgICAgIGlmIChkZXZpY2UpIHtcbiAgICAgICAgICAgIHByb2R1Y2VyVHJhbnNwb3J0ID0gZGV2aWNlLmNyZWF0ZVNlbmRUcmFuc3BvcnQocGFyYW1zKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZXZpY2UgaXMgbnVsbCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVQcm9kdWNlclRyYW5zcG9ydChwcm9kdWNlclRyYW5zcG9ydCk7XG5cbiAgICAgICAgICAvLyBIYW5kbGUgJ2Nvbm5lY3QnIGV2ZW50XG4gICAgICAgICAgcHJvZHVjZXJUcmFuc3BvcnQub24oXG4gICAgICAgICAgICAnY29ubmVjdCcsXG4gICAgICAgICAgICBhc3luYyAoXG4gICAgICAgICAgICAgIHsgZHRsc1BhcmFtZXRlcnMgfTogeyBkdGxzUGFyYW1ldGVyczogRHRsc1BhcmFtZXRlcnMgfSxcbiAgICAgICAgICAgICAgY2FsbGJhY2s6ICgpID0+IHZvaWQsXG4gICAgICAgICAgICAgIGVycmJhY2s6IChlcnJvcjogYW55KSA9PiB2b2lkLFxuICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoJ3RyYW5zcG9ydC1jb25uZWN0Jywge1xuICAgICAgICAgICAgICAgICAgZHRsc1BhcmFtZXRlcnMsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlcnJiYWNrKGVycm9yKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy8gSGFuZGxlICdwcm9kdWNlJyBldmVudFxuICAgICAgICAgIHByb2R1Y2VyVHJhbnNwb3J0Lm9uKFxuICAgICAgICAgICAgJ3Byb2R1Y2UnLFxuICAgICAgICAgICAgYXN5bmMgKFxuICAgICAgICAgICAgICBwYXJhbWV0ZXJzOiBhbnksXG4gICAgICAgICAgICAgIGNhbGxiYWNrOiAoYXJnMDogeyBpZDogYW55IH0pID0+IHZvaWQsXG4gICAgICAgICAgICAgIGVycmJhY2s6IChlcnJvcjogYW55KSA9PiB2b2lkLFxuICAgICAgICAgICAgKSA9PiB7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgc29ja2V0LmVtaXQoXG4gICAgICAgICAgICAgICAgICAndHJhbnNwb3J0LXByb2R1Y2UnLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBraW5kOiBwYXJhbWV0ZXJzLmtpbmQsXG4gICAgICAgICAgICAgICAgICAgIHJ0cFBhcmFtZXRlcnM6IHBhcmFtZXRlcnMucnRwUGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgICAgICAgYXBwRGF0YTogcGFyYW1ldGVycy5hcHBEYXRhLFxuICAgICAgICAgICAgICAgICAgICBpc2xldmVsOiBpc2xldmVsLFxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBtZW1iZXIsXG4gICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgKHsgaWQgfTogeyBpZDogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2soeyBpZCB9KTtcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgICBlcnJiYWNrKGVycm9yKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgLy8gSGFuZGxlICdjb25uZWN0aW9uc3RhdGVjaGFuZ2UnIGV2ZW50XG4gICAgICAgICAgcHJvZHVjZXJUcmFuc3BvcnQub24oJ2Nvbm5lY3Rpb25zdGF0ZWNoYW5nZScsIChzdGF0ZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKHN0YXRlKSB7XG4gICAgICAgICAgICAgIGNhc2UgJ2Nvbm5lY3RpbmcnOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdjb25uZWN0ZWQnOlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlICdmYWlsZWQnOlxuICAgICAgICAgICAgICAgIHByb2R1Y2VyVHJhbnNwb3J0Py5jbG9zZSgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgLy8gVXBkYXRlIHRyYW5zcG9ydCBjcmVhdGlvbiBzdGF0ZVxuICAgICAgICAgIHRyYW5zcG9ydENyZWF0ZWQgPSB0cnVlO1xuICAgICAgICAgIGF3YWl0IGNvbm5lY3RTZW5kVHJhbnNwb3J0KHtcbiAgICAgICAgICAgIG9wdGlvbjogb3B0aW9uLFxuICAgICAgICAgICAgcGFyYW1ldGVyczoge1xuICAgICAgICAgICAgICAuLi5wYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICBwcm9kdWNlclRyYW5zcG9ydDogcHJvZHVjZXJUcmFuc3BvcnQsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgdXBkYXRlVHJhbnNwb3J0Q3JlYXRlZCh0cmFuc3BvcnRDcmVhdGVkKTtcbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIC8vIEhhbmRsZSBlcnJvcnMgZHVyaW5nIHRyYW5zcG9ydCBjcmVhdGlvblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBzaG93QWxlcnQgfSA9IHBhcmFtZXRlcnM7XG4gICAgICAgIGlmIChzaG93QWxlcnQpIHtcbiAgICAgICAgICBzaG93QWxlcnQoe1xuICAgICAgICAgICAgbWVzc2FnZTogJ0Vycm9yIGNyZWF0aW5nIHNlbmQgdHJhbnNwb3J0LicsXG4gICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChpbm5lckVycm9yKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBjcmVhdGluZyBzZW5kIHRyYW5zcG9ydDonLCBpbm5lckVycm9yKTtcbiAgICAgIH1cbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBjcmVhdGluZyBzZW5kIHRyYW5zcG9ydDonLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=