import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Connects the send transport based on the specified option.
 *
 * @param {ConnectSendTransportOptions} options - The options for connecting the send transport.
 * @param {string} options.option - The type of transport to connect ("audio", "video", "screen", or "all").
 * @param {ConnectSendTransportParameters} options.parameters - The parameters required for connecting the transport.
 * @param {ProducerOptions} options.parameters.audioParams - The audio parameters.
 * @param {ProducerOptions} options.parameters.videoParams - The video parameters.
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
 *
 * @example
 * ```typescript
 * const options = {
 *   option: 'audio', // Can be 'audio', 'video', 'screen', or 'all'
 *   parameters: {
 *     audioParams: { codec: 'opus' },
 *     videoParams: { codec: 'vp8' },
 *     localStreamScreen: null, // Set to your local screen stream
 *     canvasStream: null, // Set to your canvas stream if using
 *     whiteboardStarted: false,
 *     whiteboardEnded: true,
 *     shared: false,
 *     islevel: '1',
 *     connectSendTransportAudio: connectSendTransportAudioFunction,
 *     connectSendTransportVideo: connectSendTransportVideoFunction,
 *     connectSendTransportScreen: connectSendTransportScreenFunction,
 *     updateVideoProducer: () => {},
 *     updateProducerTransport: () => {},
 *     updateScreenProducer: () => {},
 *     updateMainWindow: false,
 *   },
 * };
 *
 * connectSendTransport(options)
 *   .then(() => {
 *     console.log('Transport connected successfully');
 *   })
 *   .catch((error) => {
 *     console.error('Error connecting transport:', error);
 *   });
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1zZW5kLXRyYW5zcG9ydC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF1Q3pDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFERztBQU1MLE1BQU0sT0FBTyxvQkFBb0I7SUFDL0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXFCRztJQUVILEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQStCO1FBQzVFLElBQUksQ0FBQztZQUNILE1BQU0sRUFDSixXQUFXLEVBQ1gsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixNQUFNLEVBQ04sT0FBTyxFQUNQLHlCQUF5QixFQUN6Qix5QkFBeUIsRUFDekIsMEJBQTBCLEdBQzNCLEdBQUcsVUFBVSxDQUFDO1lBRWYsdURBQXVEO1lBQ3ZELElBQUksTUFBTSxLQUFLLE9BQU8sRUFBRSxDQUFDO2dCQUN2QixNQUFNLHlCQUF5QixDQUFDO29CQUM5QixXQUFXO29CQUNYLFVBQVU7aUJBQ1gsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztpQkFBTSxJQUFJLE1BQU0sS0FBSyxPQUFPLEVBQUUsQ0FBQztnQkFDOUIsTUFBTSx5QkFBeUIsQ0FBQztvQkFDOUIsV0FBVztvQkFDWCxVQUFVO2lCQUNYLENBQUMsQ0FBQztZQUNMLENBQUM7aUJBQU0sSUFBSSxNQUFNLEtBQUssUUFBUSxFQUFFLENBQUM7Z0JBQy9CLElBQUksaUJBQWlCLElBQUksQ0FBQyxlQUFlLElBQUksWUFBWSxJQUFJLE9BQU8sS0FBSyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDeEYsTUFBTSwwQkFBMEIsQ0FBQzt3QkFDL0IsTUFBTSxFQUFFLFlBQVk7d0JBQ3BCLFVBQVU7cUJBQ1gsQ0FBQyxDQUFDO2dCQUNMLENBQUM7cUJBQU0sQ0FBQztvQkFDTixJQUFJLGlCQUFpQixFQUFFLENBQUM7d0JBQ3RCLE1BQU0sMEJBQTBCLENBQUM7NEJBQy9CLE1BQU0sRUFBRSxpQkFBaUI7NEJBQ3pCLFVBQVU7eUJBQ1gsQ0FBQyxDQUFDO29CQUNMLENBQUM7eUJBQU0sQ0FBQzt3QkFDTixNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7b0JBQzVELENBQUM7Z0JBQ0gsQ0FBQztZQUNILENBQUM7aUJBQU0sQ0FBQztnQkFDTiwrQ0FBK0M7Z0JBQy9DLE1BQU0seUJBQXlCLENBQUM7b0JBQzlCLFdBQVc7b0JBQ1gsVUFBVTtpQkFDWCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSx5QkFBeUIsQ0FBQztvQkFDOUIsV0FBVztvQkFDWCxVQUFVO2lCQUNYLENBQUMsQ0FBQztZQUNMLENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbkQsQ0FBQztJQUNILENBQUM7dUdBakZVLG9CQUFvQjsyR0FBcEIsb0JBQW9CLGNBRm5CLE1BQU07OzJGQUVQLG9CQUFvQjtrQkFIaEMsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IFByb2R1Y2VyT3B0aW9ucyB9IGZyb20gJ21lZGlhc291cC1jbGllbnQvbGliL3R5cGVzJztcbmltcG9ydCB7XG4gIENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9UeXBlLFxuICBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvVHlwZSxcbiAgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5UeXBlLFxuICBDb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvUGFyYW1ldGVycyxcbiAgQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1BhcmFtZXRlcnMsXG4gIENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuUGFyYW1ldGVycyxcbn0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgQ29ubmVjdFNlbmRUcmFuc3BvcnRQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgQ29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1BhcmFtZXRlcnMsXG4gICAgQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1BhcmFtZXRlcnMsXG4gICAgQ29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzIHtcbiAgYXVkaW9QYXJhbXM6IFByb2R1Y2VyT3B0aW9ucztcbiAgdmlkZW9QYXJhbXM6IFByb2R1Y2VyT3B0aW9ucztcbiAgbG9jYWxTdHJlYW1TY3JlZW46IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgY2FudmFzU3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIHdoaXRlYm9hcmRTdGFydGVkOiBib29sZWFuO1xuICB3aGl0ZWJvYXJkRW5kZWQ6IGJvb2xlYW47XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgaXNsZXZlbDogc3RyaW5nO1xuXG4gIC8vbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW86IENvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9UeXBlO1xuICBjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvOiBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvVHlwZTtcbiAgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46IENvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuVHlwZTtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbm5lY3RTZW5kVHJhbnNwb3J0T3B0aW9ucyB7XG4gIG9wdGlvbjogJ2F1ZGlvJyB8ICd2aWRlbycgfCAnc2NyZWVuJyB8ICdhbGwnO1xuICBwYXJhbWV0ZXJzOiBDb25uZWN0U2VuZFRyYW5zcG9ydFBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENvbm5lY3RTZW5kVHJhbnNwb3J0VHlwZSA9IChvcHRpb25zOiBDb25uZWN0U2VuZFRyYW5zcG9ydE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbiAgLyoqXG4gICAqIENvbm5lY3RzIHRoZSBzZW5kIHRyYW5zcG9ydCBiYXNlZCBvbiB0aGUgc3BlY2lmaWVkIG9wdGlvbi5cbiAgICpcbiAgICogQHBhcmFtIHtDb25uZWN0U2VuZFRyYW5zcG9ydE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29ubmVjdGluZyB0aGUgc2VuZCB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm9wdGlvbiAtIFRoZSB0eXBlIG9mIHRyYW5zcG9ydCB0byBjb25uZWN0IChcImF1ZGlvXCIsIFwidmlkZW9cIiwgXCJzY3JlZW5cIiwgb3IgXCJhbGxcIikuXG4gICAqIEBwYXJhbSB7Q29ubmVjdFNlbmRUcmFuc3BvcnRQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3IgY29ubmVjdGluZyB0aGUgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge1Byb2R1Y2VyT3B0aW9uc30gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvUGFyYW1zIC0gVGhlIGF1ZGlvIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7UHJvZHVjZXJPcHRpb25zfSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9QYXJhbXMgLSBUaGUgdmlkZW8gcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuIC0gVGhlIGxvY2FsIHNjcmVlbiBzdHJlYW0uXG4gICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG9wdGlvbnMucGFyYW1ldGVycy5jYW52YXNTdHJlYW0gLSBUaGUgY2FudmFzIHN0cmVhbS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMud2hpdGVib2FyZFN0YXJ0ZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHdoaXRlYm9hcmQgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLndoaXRlYm9hcmRFbmRlZCAtIEluZGljYXRlcyBpZiB0aGUgd2hpdGVib2FyZCBoYXMgZW5kZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlZCAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIHNoYXJlZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5pc2xldmVsIC0gVGhlIGxldmVsIG9mIHRoZSBzY3JlZW4gc2hhcmluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gLSBGdW5jdGlvbiB0byBjb25uZWN0IHRoZSBhdWRpbyBzZW5kIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gLSBGdW5jdGlvbiB0byBjb25uZWN0IHRoZSB2aWRlbyBzZW5kIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIC0gRnVuY3Rpb24gdG8gY29ubmVjdCB0aGUgc2NyZWVuIHNlbmQgdHJhbnNwb3J0LlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgdHJhbnNwb3J0IGlzIGNvbm5lY3RlZC5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSBjb25uZWN0aW9uIGZhaWxzLlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAqICAgb3B0aW9uOiAnYXVkaW8nLCAvLyBDYW4gYmUgJ2F1ZGlvJywgJ3ZpZGVvJywgJ3NjcmVlbicsIG9yICdhbGwnXG4gICAqICAgcGFyYW1ldGVyczoge1xuICAgKiAgICAgYXVkaW9QYXJhbXM6IHsgY29kZWM6ICdvcHVzJyB9LFxuICAgKiAgICAgdmlkZW9QYXJhbXM6IHsgY29kZWM6ICd2cDgnIH0sXG4gICAqICAgICBsb2NhbFN0cmVhbVNjcmVlbjogbnVsbCwgLy8gU2V0IHRvIHlvdXIgbG9jYWwgc2NyZWVuIHN0cmVhbVxuICAgKiAgICAgY2FudmFzU3RyZWFtOiBudWxsLCAvLyBTZXQgdG8geW91ciBjYW52YXMgc3RyZWFtIGlmIHVzaW5nXG4gICAqICAgICB3aGl0ZWJvYXJkU3RhcnRlZDogZmFsc2UsXG4gICAqICAgICB3aGl0ZWJvYXJkRW5kZWQ6IHRydWUsXG4gICAqICAgICBzaGFyZWQ6IGZhbHNlLFxuICAgKiAgICAgaXNsZXZlbDogJzEnLFxuICAgKiAgICAgY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbzogY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb0Z1bmN0aW9uLFxuICAgKiAgICAgY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbzogY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb0Z1bmN0aW9uLFxuICAgKiAgICAgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW46IGNvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuRnVuY3Rpb24sXG4gICAqICAgICB1cGRhdGVWaWRlb1Byb2R1Y2VyOiAoKSA9PiB7fSxcbiAgICogICAgIHVwZGF0ZVByb2R1Y2VyVHJhbnNwb3J0OiAoKSA9PiB7fSxcbiAgICogICAgIHVwZGF0ZVNjcmVlblByb2R1Y2VyOiAoKSA9PiB7fSxcbiAgICogICAgIHVwZGF0ZU1haW5XaW5kb3c6IGZhbHNlLFxuICAgKiAgIH0sXG4gICAqIH07XG4gICAqXG4gICAqIGNvbm5lY3RTZW5kVHJhbnNwb3J0KG9wdGlvbnMpXG4gICAqICAgLnRoZW4oKCkgPT4ge1xuICAgKiAgICAgY29uc29sZS5sb2coJ1RyYW5zcG9ydCBjb25uZWN0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAqICAgfSlcbiAgICogICAuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAqICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBjb25uZWN0aW5nIHRyYW5zcG9ydDonLCBlcnJvcik7XG4gICAqICAgfSk7XG4gICAqIGBgYFxuICAgKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29ubmVjdFNlbmRUcmFuc3BvcnQge1xuICAvKipcbiAgICogQ29ubmVjdHMgdGhlIHNlbmQgdHJhbnNwb3J0IGJhc2VkIG9uIHRoZSBzcGVjaWZpZWQgb3B0aW9uLlxuICAgKlxuICAgKiBAcGFyYW0ge0Nvbm5lY3RTZW5kVHJhbnNwb3J0T3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBjb25uZWN0aW5nIHRoZSBzZW5kIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMub3B0aW9uIC0gVGhlIHR5cGUgb2YgdHJhbnNwb3J0IHRvIGNvbm5lY3QgKFwiYXVkaW9cIiwgXCJ2aWRlb1wiLCBcInNjcmVlblwiLCBvciBib3RoKS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciBjb25uZWN0aW5nIHRoZSB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9QYXJhbXMgLSBUaGUgYXVkaW8gcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycy52aWRlb1BhcmFtcyAtIFRoZSB2aWRlbyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4gLSBUaGUgbG9jYWwgc2NyZWVuIHN0cmVhbS5cbiAgICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNhbnZhc1N0cmVhbSAtIFRoZSBjYW52YXMgc3RyZWFtLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy53aGl0ZWJvYXJkU3RhcnRlZCAtIEluZGljYXRlcyBpZiB0aGUgd2hpdGVib2FyZCBoYXMgc3RhcnRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMud2hpdGVib2FyZEVuZGVkIC0gSW5kaWNhdGVzIGlmIHRoZSB3aGl0ZWJvYXJkIGhhcyBlbmRlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgc2hhcmVkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzbGV2ZWwgLSBUaGUgbGV2ZWwgb2YgdGhlIHNjcmVlbiBzaGFyaW5nLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyAtIEZ1bmN0aW9uIHRvIGNvbm5lY3QgdGhlIGF1ZGlvIHNlbmQgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyAtIEZ1bmN0aW9uIHRvIGNvbm5lY3QgdGhlIHZpZGVvIHNlbmQgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gLSBGdW5jdGlvbiB0byBjb25uZWN0IHRoZSBzY3JlZW4gc2VuZCB0cmFuc3BvcnQuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB0cmFuc3BvcnQgaXMgY29ubmVjdGVkLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGNvbm5lY3Rpb24gZmFpbHMuXG4gICAqL1xuXG4gIGFzeW5jIGNvbm5lY3RTZW5kVHJhbnNwb3J0KHsgb3B0aW9uLCBwYXJhbWV0ZXJzIH06IENvbm5lY3RTZW5kVHJhbnNwb3J0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGF1ZGlvUGFyYW1zLFxuICAgICAgICB2aWRlb1BhcmFtcyxcbiAgICAgICAgbG9jYWxTdHJlYW1TY3JlZW4sXG4gICAgICAgIGNhbnZhc1N0cmVhbSxcbiAgICAgICAgd2hpdGVib2FyZFN0YXJ0ZWQsXG4gICAgICAgIHdoaXRlYm9hcmRFbmRlZCxcbiAgICAgICAgc2hhcmVkLFxuICAgICAgICBpc2xldmVsLFxuICAgICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvLFxuICAgICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvLFxuICAgICAgICBjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbixcbiAgICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICAvLyBDb25uZWN0IHNlbmQgdHJhbnNwb3J0IGJhc2VkIG9uIHRoZSBzcGVjaWZpZWQgb3B0aW9uXG4gICAgICBpZiAob3B0aW9uID09PSAnYXVkaW8nKSB7XG4gICAgICAgIGF3YWl0IGNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8oe1xuICAgICAgICAgIGF1ZGlvUGFyYW1zLFxuICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb24gPT09ICd2aWRlbycpIHtcbiAgICAgICAgYXdhaXQgY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyh7XG4gICAgICAgICAgdmlkZW9QYXJhbXMsXG4gICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbiA9PT0gJ3NjcmVlbicpIHtcbiAgICAgICAgaWYgKHdoaXRlYm9hcmRTdGFydGVkICYmICF3aGl0ZWJvYXJkRW5kZWQgJiYgY2FudmFzU3RyZWFtICYmIGlzbGV2ZWwgPT09ICcyJyAmJiAhc2hhcmVkKSB7XG4gICAgICAgICAgYXdhaXQgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4oe1xuICAgICAgICAgICAgc3RyZWFtOiBjYW52YXNTdHJlYW0sXG4gICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChsb2NhbFN0cmVhbVNjcmVlbikge1xuICAgICAgICAgICAgYXdhaXQgY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4oe1xuICAgICAgICAgICAgICBzdHJlYW06IGxvY2FsU3RyZWFtU2NyZWVuLFxuICAgICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignbG9jYWxTdHJlYW1TY3JlZW4gaXMgbnVsbCBvciB1bmRlZmluZWQnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIENvbm5lY3QgYm90aCBhdWRpbyBhbmQgdmlkZW8gc2VuZCB0cmFuc3BvcnRzXG4gICAgICAgIGF3YWl0IGNvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8oe1xuICAgICAgICAgIGF1ZGlvUGFyYW1zLFxuICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgIH0pO1xuICAgICAgICBhd2FpdCBjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvKHtcbiAgICAgICAgICB2aWRlb1BhcmFtcyxcbiAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ2Nvbm5lY3RTZW5kVHJhbnNwb3J0IGVycm9yJywgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19