import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ConnectSendTransportScreen {
    /**
     * Connects and sets up the screen sharing transport for sending video streams.
     *
     * @param {Object} options - The options for connecting the screen transport.
     * @param {MediaStream} options.stream - The media stream containing the screen video track.
     * @param {ConnectSendTransportScreenOptions} options.parameters - The parameters required for setting up the transport.
     * @param {Producer} options.parameters.screenProducer - The screen producer object.
     * @param {Device} options.parameters.device - The device object containing RTP capabilities.
     * @param {Promise<ScreenParams>} options.parameters.screenParams - A promise resolving to screen share parameters.
     * @param {Transport} options.parameters.producerTransport - The transport object used for producing the screen share.
     * @param {Params} options.parameters.params - The parameters for producing the screen share.
     * @param {Function} options.parameters.updateScreenProducer - Function to update the screen producer object.
     * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport object.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to fetch updated device information.
     *
     * @returns {Promise<void>} A promise that resolves when the screen transport is successfully connected and set up.
     *
     * @throws Will throw an error if the connection or setup process fails.
     */
    async connectSendTransportScreen({ stream, parameters, }) {
        try {
            let { screenProducer, device, screenParams, producerTransport, params, updateScreenProducer, updateProducerTransport, } = parameters;
            device = parameters.getUpdatedAllParams().device;
            // Connect the send transport for screen share by producing screen video data
            params = screenParams;
            // Find VP9 codec for screen share
            if (!device || !device.rtpCapabilities || !device.rtpCapabilities.codecs) {
                throw new Error('Device or its RTP capabilities are not available.');
            }
            let codec = device.rtpCapabilities.codecs.find((codec) => codec.mimeType.toLowerCase() === 'video/vp9' && codec.kind === 'video');
            // Produce screen share data using the producer transport
            if (!producerTransport) {
                throw new Error('Producer transport is not available.');
            }
            screenProducer = await producerTransport.produce({
                track: stream?.getVideoTracks()[0],
                ...params,
                codec: codec,
                appData: { mediaTag: 'screen-video' },
            });
            // Update the screen producer and producer transport objects
            updateScreenProducer(screenProducer);
            updateProducerTransport(producerTransport);
        }
        catch (error) {
            console.log('connectSendTransportScreen error', error);
            throw error;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportScreen, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportScreen, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportScreen, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1zY3JlZW4uc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvY29ubmVjdC1zZW5kLXRyYW5zcG9ydC1zY3JlZW4uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQTJCM0MsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Ba0JHO0lBQ0gsS0FBSyxDQUFDLDBCQUEwQixDQUFDLEVBQy9CLE1BQU0sRUFDTixVQUFVLEdBQ3dCO1FBQ2xDLElBQUksQ0FBQztZQUNILElBQUksRUFDRixjQUFjLEVBQ2QsTUFBTSxFQUNOLFlBQVksRUFDWixpQkFBaUIsRUFDakIsTUFBTSxFQUNOLG9CQUFvQixFQUNwQix1QkFBdUIsR0FDeEIsR0FBRyxVQUFVLENBQUM7WUFFZixNQUFNLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ2pELDZFQUE2RTtZQUM3RSxNQUFNLEdBQUcsWUFBWSxDQUFDO1lBRXRCLGtDQUFrQztZQUNsQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ3pFLE1BQU0sSUFBSSxLQUFLLENBQUMsbURBQW1ELENBQUMsQ0FBQztZQUN2RSxDQUFDO1lBRUQsSUFBSSxLQUFLLEdBQUcsTUFBTSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUM1QyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsS0FBSyxXQUFXLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLENBQ3ZGLENBQUM7WUFFRix5REFBeUQ7WUFDekQsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztZQUMxRCxDQUFDO1lBRUQsY0FBYyxHQUFHLE1BQU0saUJBQWlCLENBQUMsT0FBTyxDQUFDO2dCQUMvQyxLQUFLLEVBQUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsR0FBRyxNQUFNO2dCQUNULEtBQUssRUFBRSxLQUFLO2dCQUNaLE9BQU8sRUFBRSxFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUU7YUFDdEMsQ0FBQyxDQUFDO1lBRUgsNERBQTREO1lBQzVELG9CQUFvQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ3JDLHVCQUF1QixDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGtDQUFrQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3ZELE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7dUdBbkVVLDBCQUEwQjsyR0FBMUIsMEJBQTBCLGNBRnpCLE1BQU07OzJGQUVQLDBCQUEwQjtrQkFIdEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUcmFuc3BvcnQsIFByb2R1Y2VyLCBEZXZpY2UsIFByb2R1Y2VyT3B0aW9ucyB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzIHtcbiAgc2NyZWVuUHJvZHVjZXI6IFByb2R1Y2VyIHwgbnVsbDtcbiAgZGV2aWNlOiBEZXZpY2UgfCBudWxsO1xuICBzY3JlZW5QYXJhbXM6IFByb2R1Y2VyT3B0aW9ucztcbiAgcHJvZHVjZXJUcmFuc3BvcnQ6IFRyYW5zcG9ydCB8IG51bGw7XG4gIHBhcmFtczogUHJvZHVjZXJPcHRpb25zO1xuICB1cGRhdGVTY3JlZW5Qcm9kdWNlcjogKHByb2R1Y2VyOiBQcm9kdWNlciB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0OiAodHJhbnNwb3J0OiBUcmFuc3BvcnQgfCBudWxsKSA9PiB2b2lkO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55OyAvLyBFeHRlbmRhYmxlIGZvciBhZGRpdGlvbmFsIHBhcmFtZXRlcnNcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbk9wdGlvbnMge1xuICBzdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgcGFyYW1ldGVyczogQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGUgPSAoXG4gIG9wdGlvbnM6IENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuT3B0aW9ucyxcbikgPT4gUHJvbWlzZTx2b2lkPjtcbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbiB7XG4gIC8qKlxuICAgKiBDb25uZWN0cyBhbmQgc2V0cyB1cCB0aGUgc2NyZWVuIHNoYXJpbmcgdHJhbnNwb3J0IGZvciBzZW5kaW5nIHZpZGVvIHN0cmVhbXMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNvbm5lY3RpbmcgdGhlIHNjcmVlbiB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG9wdGlvbnMuc3RyZWFtIC0gVGhlIG1lZGlhIHN0cmVhbSBjb250YWluaW5nIHRoZSBzY3JlZW4gdmlkZW8gdHJhY2suXG4gICAqIEBwYXJhbSB7Q29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5PcHRpb25zfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3Igc2V0dGluZyB1cCB0aGUgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge1Byb2R1Y2VyfSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuUHJvZHVjZXIgLSBUaGUgc2NyZWVuIHByb2R1Y2VyIG9iamVjdC5cbiAgICogQHBhcmFtIHtEZXZpY2V9IG9wdGlvbnMucGFyYW1ldGVycy5kZXZpY2UgLSBUaGUgZGV2aWNlIG9iamVjdCBjb250YWluaW5nIFJUUCBjYXBhYmlsaXRpZXMuXG4gICAqIEBwYXJhbSB7UHJvbWlzZTxTY3JlZW5QYXJhbXM+fSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuUGFyYW1zIC0gQSBwcm9taXNlIHJlc29sdmluZyB0byBzY3JlZW4gc2hhcmUgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtUcmFuc3BvcnR9IG9wdGlvbnMucGFyYW1ldGVycy5wcm9kdWNlclRyYW5zcG9ydCAtIFRoZSB0cmFuc3BvcnQgb2JqZWN0IHVzZWQgZm9yIHByb2R1Y2luZyB0aGUgc2NyZWVuIHNoYXJlLlxuICAgKiBAcGFyYW0ge1BhcmFtc30gb3B0aW9ucy5wYXJhbWV0ZXJzLnBhcmFtcyAtIFRoZSBwYXJhbWV0ZXJzIGZvciBwcm9kdWNpbmcgdGhlIHNjcmVlbiBzaGFyZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNjcmVlblByb2R1Y2VyIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW4gcHJvZHVjZXIgb2JqZWN0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHByb2R1Y2VyIHRyYW5zcG9ydCBvYmplY3QuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zIC0gRnVuY3Rpb24gdG8gZmV0Y2ggdXBkYXRlZCBkZXZpY2UgaW5mb3JtYXRpb24uXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzY3JlZW4gdHJhbnNwb3J0IGlzIHN1Y2Nlc3NmdWxseSBjb25uZWN0ZWQgYW5kIHNldCB1cC5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBjb25uZWN0aW9uIG9yIHNldHVwIHByb2Nlc3MgZmFpbHMuXG4gICAqL1xuICBhc3luYyBjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7XG4gICAgc3RyZWFtLFxuICAgIHBhcmFtZXRlcnMsXG4gIH06IENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQge1xuICAgICAgICBzY3JlZW5Qcm9kdWNlcixcbiAgICAgICAgZGV2aWNlLFxuICAgICAgICBzY3JlZW5QYXJhbXMsXG4gICAgICAgIHByb2R1Y2VyVHJhbnNwb3J0LFxuICAgICAgICBwYXJhbXMsXG4gICAgICAgIHVwZGF0ZVNjcmVlblByb2R1Y2VyLFxuICAgICAgICB1cGRhdGVQcm9kdWNlclRyYW5zcG9ydCxcbiAgICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICBkZXZpY2UgPSBwYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKS5kZXZpY2U7XG4gICAgICAvLyBDb25uZWN0IHRoZSBzZW5kIHRyYW5zcG9ydCBmb3Igc2NyZWVuIHNoYXJlIGJ5IHByb2R1Y2luZyBzY3JlZW4gdmlkZW8gZGF0YVxuICAgICAgcGFyYW1zID0gc2NyZWVuUGFyYW1zO1xuXG4gICAgICAvLyBGaW5kIFZQOSBjb2RlYyBmb3Igc2NyZWVuIHNoYXJlXG4gICAgICBpZiAoIWRldmljZSB8fCAhZGV2aWNlLnJ0cENhcGFiaWxpdGllcyB8fCAhZGV2aWNlLnJ0cENhcGFiaWxpdGllcy5jb2RlY3MpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdEZXZpY2Ugb3IgaXRzIFJUUCBjYXBhYmlsaXRpZXMgYXJlIG5vdCBhdmFpbGFibGUuJyk7XG4gICAgICB9XG5cbiAgICAgIGxldCBjb2RlYyA9IGRldmljZS5ydHBDYXBhYmlsaXRpZXMuY29kZWNzLmZpbmQoXG4gICAgICAgIChjb2RlYzogYW55KSA9PiBjb2RlYy5taW1lVHlwZS50b0xvd2VyQ2FzZSgpID09PSAndmlkZW8vdnA5JyAmJiBjb2RlYy5raW5kID09PSAndmlkZW8nLFxuICAgICAgKTtcblxuICAgICAgLy8gUHJvZHVjZSBzY3JlZW4gc2hhcmUgZGF0YSB1c2luZyB0aGUgcHJvZHVjZXIgdHJhbnNwb3J0XG4gICAgICBpZiAoIXByb2R1Y2VyVHJhbnNwb3J0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignUHJvZHVjZXIgdHJhbnNwb3J0IGlzIG5vdCBhdmFpbGFibGUuJyk7XG4gICAgICB9XG5cbiAgICAgIHNjcmVlblByb2R1Y2VyID0gYXdhaXQgcHJvZHVjZXJUcmFuc3BvcnQucHJvZHVjZSh7XG4gICAgICAgIHRyYWNrOiBzdHJlYW0/LmdldFZpZGVvVHJhY2tzKClbMF0sXG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgICAgY29kZWM6IGNvZGVjLFxuICAgICAgICBhcHBEYXRhOiB7IG1lZGlhVGFnOiAnc2NyZWVuLXZpZGVvJyB9LFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgc2NyZWVuIHByb2R1Y2VyIGFuZCBwcm9kdWNlciB0cmFuc3BvcnQgb2JqZWN0c1xuICAgICAgdXBkYXRlU2NyZWVuUHJvZHVjZXIoc2NyZWVuUHJvZHVjZXIpO1xuICAgICAgdXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQocHJvZHVjZXJUcmFuc3BvcnQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gZXJyb3InLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==