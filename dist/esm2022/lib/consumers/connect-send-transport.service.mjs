import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ConnectSendTransport {
    /**
     * Connects the send transport based on the specified option.
     *
     * @param {ConnectSendTransportOptions} options - The options for connecting the send transport.
     * @param {string} options.option - The type of transport to connect ("audio", "video", "screen", or both).
     * @param {Object} options.parameters - The parameters required for connecting the transport.
     * @param {Object} options.parameters.audioParams - The audio parameters.
     * @param {Object} options.parameters.videoParams - The video parameters.
     * @param {MediaStream} options.parameters.localStreamScreen - The local screen stream.
     * @param {MediaStream} options.parameters.canvasStream - The canvas stream.
     * @param {boolean} options.parameters.whiteboardStarted - Indicates if the whiteboard has started.
     * @param {boolean} options.parameters.whiteboardEnded - Indicates if the whiteboard has ended.
     * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
     * @param {string} options.parameters.islevel - The level of the screen sharing.
     * @param {Function} options.parameters.connectSendTransportAudio - Function to connect the audio send transport.
     * @param {Function} options.parameters.connectSendTransportVideo - Function to connect the video send transport.
     * @param {Function} options.parameters.connectSendTransportScreen - Function to connect the screen send transport.
     *
     * @returns {Promise<void>} A promise that resolves when the transport is connected.
     *
     * @throws Will throw an error if the connection fails.
     */
    async connectSendTransport({ option, parameters }) {
        try {
            const { audioParams, videoParams, localStreamScreen, canvasStream, whiteboardStarted, whiteboardEnded, shared, islevel, connectSendTransportAudio, connectSendTransportVideo, connectSendTransportScreen, } = parameters;
            // Connect send transport based on the specified option
            if (option === 'audio') {
                await connectSendTransportAudio({
                    audioParams,
                    parameters,
                });
            }
            else if (option === 'video') {
                await connectSendTransportVideo({
                    videoParams,
                    parameters,
                });
            }
            else if (option === 'screen') {
                if (whiteboardStarted && !whiteboardEnded && canvasStream && islevel === '2' && !shared) {
                    await connectSendTransportScreen({
                        stream: canvasStream,
                        parameters,
                    });
                }
                else {
                    if (localStreamScreen) {
                        await connectSendTransportScreen({
                            stream: localStreamScreen,
                            parameters,
                        });
                    }
                    else {
                        throw new Error('localStreamScreen is null or undefined');
                    }
                }
            }
            else {
                // Connect both audio and video send transports
                await connectSendTransportAudio({
                    audioParams,
                    parameters,
                });
                await connectSendTransportVideo({
                    videoParams,
                    parameters,
                });
            }
        }
        catch (error) {
            console.log('connectSendTransport error', error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransport, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransport, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransport, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1zZW5kLXRyYW5zcG9ydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUEwQzNDLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUVILEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQStCO1FBQzVFLElBQUksQ0FBQztZQUNILE1BQU0sRUFDSixXQUFXLEVBQ1gsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixNQUFNLEVBQ04sT0FBTyxFQUNQLHlCQUF5QixFQUN6Qix5QkFBeUIsRUFDekIsMEJBQTBCLEdBQzNCLEdBQUcsVUFBVSxDQUFDO1lBRWYsdURBQXVEO1lBQ3ZELElBQUksTUFBTSxLQUFLLE9BQU8sRUFBRSxDQUFDO2dCQUN2QixNQUFNLHlCQUF5QixDQUFDO29CQUM5QixXQUFXO29CQUNYLFVBQVU7aUJBQ1gsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztpQkFBTSxJQUFJLE1BQU0sS0FBSyxPQUFPLEVBQUUsQ0FBQztnQkFDOUIsTUFBTSx5QkFBeUIsQ0FBQztvQkFDOUIsV0FBVztvQkFDWCxVQUFVO2lCQUNYLENBQUMsQ0FBQztZQUNMLENBQUM7aUJBQU0sSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQy9CLElBQUksaUJBQWlCLElBQUksQ0FBQyxlQUFlLElBQUksWUFBWSxJQUFJLE9BQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDeEYsTUFBTSwwQkFBMEIsQ0FBQzt3QkFDL0IsTUFBTSxFQUFFLFlBQVk7d0JBQ3BCLFVBQVU7cUJBQ1gsQ0FBQyxDQUFDO2dCQUNMLENBQUM7cUJBQU0sQ0FBQztvQkFDTixJQUFJLGlCQUFpQixFQUFFLENBQUM7d0JBQ3RCLE1BQU0sMEJBQTBCLENBQUM7NEJBQy9CLE1BQU0sRUFBRSxpQkFBaUI7NEJBQ3pCLFVBQVU7eUJBQ1gsQ0FBQyxDQUFDO29CQUNMLENBQUM7eUJBQU0sQ0FBQzt3QkFDTixNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7b0JBQzVELENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7aUJBQU0sQ0FBQztnQkFDTiwrQ0FBK0M7Z0JBQy9DLE1BQU0seUJBQXlCLENBQUM7b0JBQzlCLFdBQVc7b0JBQ1gsVUFBVTtpQkFDWCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSx5QkFBeUIsQ0FBQztvQkFDOUIsV0FBVztvQkFDWCxVQUFVO2lCQUNYLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkQsQ0FBQztJQUNILENBQUM7dUdBakZVLG9CQUFvQjsyR0FBcEIsb0JBQW9CLGNBRm5CLE1BQU07OzJGQUVQLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFByb2R1Y2VyT3B0aW9ucyB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmltcG9ydCB7XG4gIENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9UeXBlLFxuICBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvVHlwZSxcbiAgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5UeXBlLFxuICBDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvUGFyYW1ldGVycyxcbiAgQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1BhcmFtZXRlcnMsXG4gIENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuUGFyYW1ldGVycyxcbn0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdFNlbmRUcmFuc3BvcnRQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnMsXG4gICAgQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1BhcmFtZXRlcnMsXG4gICAgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzIHtcbiAgYXVkaW9QYXJhbXM6IFByb2R1Y2VyT3B0aW9ucztcbiAgdmlkZW9QYXJhbXM6IFByb2R1Y2VyT3B0aW9ucztcbiAgbG9jYWxTdHJlYW1TY3JlZW46IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgY2FudmFzU3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIHdoaXRlYm9hcmRTdGFydGVkOiBib29sZWFuO1xuICB3aGl0ZWJvYXJkRW5kZWQ6IGJvb2xlYW47XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgaXNsZXZlbDogc3RyaW5nO1xuXG4gIC8vbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW86IENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9UeXBlO1xuICBjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvOiBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvVHlwZTtcbiAgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46IENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuVHlwZTtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbm5lY3RTZW5kVHJhbnNwb3J0T3B0aW9ucyB7XG4gIG9wdGlvbjogJ2F1ZGlvJyB8ICd2aWRlbycgfCAnc2NyZWVuJyB8ICdhbGwnO1xuICBwYXJhbWV0ZXJzOiBDb25uZWN0U2VuZFRyYW5zcG9ydFBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENvbm5lY3RTZW5kVHJhbnNwb3J0VHlwZSA9IChvcHRpb25zOiBDb25uZWN0U2VuZFRyYW5zcG9ydE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb25uZWN0U2VuZFRyYW5zcG9ydCB7XG4gIC8qKlxuICAgKiBDb25uZWN0cyB0aGUgc2VuZCB0cmFuc3BvcnQgYmFzZWQgb24gdGhlIHNwZWNpZmllZCBvcHRpb24uXG4gICAqXG4gICAqIEBwYXJhbSB7Q29ubmVjdFNlbmRUcmFuc3BvcnRPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNvbm5lY3RpbmcgdGhlIHNlbmQgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5vcHRpb24gLSBUaGUgdHlwZSBvZiB0cmFuc3BvcnQgdG8gY29ubmVjdCAoXCJhdWRpb1wiLCBcInZpZGVvXCIsIFwic2NyZWVuXCIsIG9yIGJvdGgpLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIGNvbm5lY3RpbmcgdGhlIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycy5hdWRpb1BhcmFtcyAtIFRoZSBhdWRpbyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLnZpZGVvUGFyYW1zIC0gVGhlIHZpZGVvIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG9wdGlvbnMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVNjcmVlbiAtIFRoZSBsb2NhbCBzY3JlZW4gc3RyZWFtLlxuICAgKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBvcHRpb25zLnBhcmFtZXRlcnMuY2FudmFzU3RyZWFtIC0gVGhlIGNhbnZhcyBzdHJlYW0uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRTdGFydGVkIC0gSW5kaWNhdGVzIGlmIHRoZSB3aGl0ZWJvYXJkIGhhcyBzdGFydGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy53aGl0ZWJvYXJkRW5kZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHdoaXRlYm9hcmQgaGFzIGVuZGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBpcyBzaGFyZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgc2NyZWVuIHNoYXJpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvIC0gRnVuY3Rpb24gdG8gY29ubmVjdCB0aGUgYXVkaW8gc2VuZCB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvIC0gRnVuY3Rpb24gdG8gY29ubmVjdCB0aGUgdmlkZW8gc2VuZCB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbiAtIEZ1bmN0aW9uIHRvIGNvbm5lY3QgdGhlIHNjcmVlbiBzZW5kIHRyYW5zcG9ydC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHRyYW5zcG9ydCBpcyBjb25uZWN0ZWQuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgY29ubmVjdGlvbiBmYWlscy5cbiAgICovXG5cbiAgYXN5bmMgY29ubmVjdFNlbmRUcmFuc3BvcnQoeyBvcHRpb24sIHBhcmFtZXRlcnMgfTogQ29ubmVjdFNlbmRUcmFuc3BvcnRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgYXVkaW9QYXJhbXMsXG4gICAgICAgIHZpZGVvUGFyYW1zLFxuICAgICAgICBsb2NhbFN0cmVhbVNjcmVlbixcbiAgICAgICAgY2FudmFzU3RyZWFtLFxuICAgICAgICB3aGl0ZWJvYXJkU3RhcnRlZCxcbiAgICAgICAgd2hpdGVib2FyZEVuZGVkLFxuICAgICAgICBzaGFyZWQsXG4gICAgICAgIGlzbGV2ZWwsXG4gICAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8sXG4gICAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8sXG4gICAgICAgIGNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuLFxuICAgICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIC8vIENvbm5lY3Qgc2VuZCB0cmFuc3BvcnQgYmFzZWQgb24gdGhlIHNwZWNpZmllZCBvcHRpb25cbiAgICAgIGlmIChvcHRpb24gPT09ICdhdWRpbycpIHtcbiAgICAgICAgYXdhaXQgY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyh7XG4gICAgICAgICAgYXVkaW9QYXJhbXMsXG4gICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbiA9PT0gJ3ZpZGVvJykge1xuICAgICAgICBhd2FpdCBjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvKHtcbiAgICAgICAgICB2aWRlb1BhcmFtcyxcbiAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9uID09PSAnc2NyZWVuJykge1xuICAgICAgICBpZiAod2hpdGVib2FyZFN0YXJ0ZWQgJiYgIXdoaXRlYm9hcmRFbmRlZCAmJiBjYW52YXNTdHJlYW0gJiYgaXNsZXZlbCA9PT0gJzInICYmICFzaGFyZWQpIHtcbiAgICAgICAgICBhd2FpdCBjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7XG4gICAgICAgICAgICBzdHJlYW06IGNhbnZhc1N0cmVhbSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGxvY2FsU3RyZWFtU2NyZWVuKSB7XG4gICAgICAgICAgICBhd2FpdCBjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7XG4gICAgICAgICAgICAgIHN0cmVhbTogbG9jYWxTdHJlYW1TY3JlZW4sXG4gICAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2NhbFN0cmVhbVNjcmVlbiBpcyBudWxsIG9yIHVuZGVmaW5lZCcpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gQ29ubmVjdCBib3RoIGF1ZGlvIGFuZCB2aWRlbyBzZW5kIHRyYW5zcG9ydHNcbiAgICAgICAgYXdhaXQgY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyh7XG4gICAgICAgICAgYXVkaW9QYXJhbXMsXG4gICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IGNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8oe1xuICAgICAgICAgIHZpZGVvUGFyYW1zLFxuICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnY29ubmVjdFNlbmRUcmFuc3BvcnQgZXJyb3InLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=