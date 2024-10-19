import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ConnectSendTransportVideo {
    /**
     * Connects the send transport for video by producing video data and updates the relevant states.
     *
     * @param {ConnectSendTransportVideoOptions} options - The options for connecting the send transport for video.
     * @param {Object} options.videoParams - The parameters for producing video data.
     * @param {Object} options.parameters - The parameters for updating the state.
     * @param {Producer} options.parameters.videoProducer - The video producer instance.
     * @param {Transport} options.parameters.producerTransport - The transport instance used for producing video.
     * @param {string} options.parameters.islevel - The connection level.
     * @param {boolean} options.parameters.updateMainWindow - The state of the main window update.
     * @param {Function} options.parameters.updateVideoProducer - Function to update the video producer.
     * @param {Function} options.parameters.updateProducerTransport - Function to update the producer transport.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
     *
     * @returns {Promise<void>} A promise that resolves when the send transport for video is connected.
     *
     * @throws Will throw an error if the connection fails.
     */
    connectSendTransportVideo = async ({ videoParams, parameters, }) => {
        try {
            let { videoProducer, producerTransport, islevel, updateMainWindow, updateVideoProducer, updateProducerTransport, updateUpdateMainWindow, } = parameters;
            // Connect the send transport for video by producing video data
            if (producerTransport) {
                videoProducer = await producerTransport.produce(videoParams);
            }
            else {
                throw new Error('Producer transport is null');
            }
            // Update main window state based on the video connection level
            if (islevel === '2') {
                updateMainWindow = true;
            }
            // Update the video producer and producer transport objects
            updateVideoProducer(videoProducer);
            updateProducerTransport(producerTransport);
            updateUpdateMainWindow(updateMainWindow);
        }
        catch (error) {
            console.log('connectSendTransportVideo error', error);
            throw error;
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportVideo, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportVideo, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConnectSendTransportVideo, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29ubmVjdC1zZW5kLXRyYW5zcG9ydC12aWRlby5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jb25uZWN0LXNlbmQtdHJhbnNwb3J0LXZpZGVvLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUEyQjNDLE1BQU0sT0FBTyx5QkFBeUI7SUFDcEM7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gseUJBQXlCLEdBQUcsS0FBSyxFQUFFLEVBQ2pDLFdBQVcsRUFDWCxVQUFVLEdBQ3VCLEVBQWlCLEVBQUU7UUFDcEQsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUNGLGFBQWEsRUFDYixpQkFBaUIsRUFDakIsT0FBTyxFQUNQLGdCQUFnQixFQUNoQixtQkFBbUIsRUFDbkIsdUJBQXVCLEVBQ3ZCLHNCQUFzQixHQUN2QixHQUFHLFVBQVUsQ0FBQztZQUVmLCtEQUErRDtZQUMvRCxJQUFJLGlCQUFpQixFQUFFLENBQUM7Z0JBQ3RCLGFBQWEsR0FBRyxNQUFNLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUMvRCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sTUFBTSxJQUFJLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO1lBQ2hELENBQUM7WUFFRCwrREFBK0Q7WUFDL0QsSUFBSSxPQUFPLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBQ3BCLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUMxQixDQUFDO1lBRUQsMkRBQTJEO1lBQzNELG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQ25DLHVCQUF1QixDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDM0Msc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDdEQsTUFBTSxLQUFLLENBQUM7UUFDZCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQXREUyx5QkFBeUI7MkdBQXpCLHlCQUF5QixjQUZ4QixNQUFNOzsyRkFFUCx5QkFBeUI7a0JBSHJDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRGV2aWNlLCBQcm9kdWNlciwgUHJvZHVjZXJPcHRpb25zLCBUcmFuc3BvcnQgfSBmcm9tICdtZWRpYXNvdXAtY2xpZW50L2xpYi90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIENvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9QYXJhbWV0ZXJzIHtcbiAgdmlkZW9Qcm9kdWNlcjogUHJvZHVjZXIgfCBudWxsO1xuICBkZXZpY2U6IERldmljZSB8IG51bGw7XG4gIHByb2R1Y2VyVHJhbnNwb3J0OiBUcmFuc3BvcnQgfCBudWxsO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHVwZGF0ZU1haW5XaW5kb3c6IGJvb2xlYW47XG4gIHVwZGF0ZVZpZGVvUHJvZHVjZXI6IChwcm9kdWNlcjogUHJvZHVjZXIgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVQcm9kdWNlclRyYW5zcG9ydDogKHRyYW5zcG9ydDogVHJhbnNwb3J0IHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogKHN0YXRlOiBib29sZWFuKSA9PiB2b2lkO1xuICBba2V5OiBzdHJpbmddOiBhbnk7IC8vIEV4dGVuZGFibGUgZm9yIGFkZGl0aW9uYWwgcGFyYW1ldGVyc1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9PcHRpb25zIHtcbiAgdmlkZW9QYXJhbXM6IFByb2R1Y2VyT3B0aW9ucztcbiAgcGFyYW1ldGVyczogQ29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1BhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9UeXBlID0gKFxuICBvcHRpb25zOiBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvT3B0aW9ucyxcbikgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8ge1xuICAvKipcbiAgICogQ29ubmVjdHMgdGhlIHNlbmQgdHJhbnNwb3J0IGZvciB2aWRlbyBieSBwcm9kdWNpbmcgdmlkZW8gZGF0YSBhbmQgdXBkYXRlcyB0aGUgcmVsZXZhbnQgc3RhdGVzLlxuICAgKlxuICAgKiBAcGFyYW0ge0Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9PcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNvbm5lY3RpbmcgdGhlIHNlbmQgdHJhbnNwb3J0IGZvciB2aWRlby5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMudmlkZW9QYXJhbXMgLSBUaGUgcGFyYW1ldGVycyBmb3IgcHJvZHVjaW5nIHZpZGVvIGRhdGEuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdXBkYXRpbmcgdGhlIHN0YXRlLlxuICAgKiBAcGFyYW0ge1Byb2R1Y2VyfSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9Qcm9kdWNlciAtIFRoZSB2aWRlbyBwcm9kdWNlciBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtUcmFuc3BvcnR9IG9wdGlvbnMucGFyYW1ldGVycy5wcm9kdWNlclRyYW5zcG9ydCAtIFRoZSB0cmFuc3BvcnQgaW5zdGFuY2UgdXNlZCBmb3IgcHJvZHVjaW5nIHZpZGVvLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzbGV2ZWwgLSBUaGUgY29ubmVjdGlvbiBsZXZlbC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbldpbmRvdyAtIFRoZSBzdGF0ZSBvZiB0aGUgbWFpbiB3aW5kb3cgdXBkYXRlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVmlkZW9Qcm9kdWNlciAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlkZW8gcHJvZHVjZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVQcm9kdWNlclRyYW5zcG9ydCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcHJvZHVjZXIgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVXBkYXRlTWFpbldpbmRvdyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cgc3RhdGUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBzZW5kIHRyYW5zcG9ydCBmb3IgdmlkZW8gaXMgY29ubmVjdGVkLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIGNvbm5lY3Rpb24gZmFpbHMuXG4gICAqL1xuICBjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvID0gYXN5bmMgKHtcbiAgICB2aWRlb1BhcmFtcyxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBDb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQge1xuICAgICAgICB2aWRlb1Byb2R1Y2VyLFxuICAgICAgICBwcm9kdWNlclRyYW5zcG9ydCxcbiAgICAgICAgaXNsZXZlbCxcbiAgICAgICAgdXBkYXRlTWFpbldpbmRvdyxcbiAgICAgICAgdXBkYXRlVmlkZW9Qcm9kdWNlcixcbiAgICAgICAgdXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQsXG4gICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3csXG4gICAgICB9ID0gcGFyYW1ldGVycztcblxuICAgICAgLy8gQ29ubmVjdCB0aGUgc2VuZCB0cmFuc3BvcnQgZm9yIHZpZGVvIGJ5IHByb2R1Y2luZyB2aWRlbyBkYXRhXG4gICAgICBpZiAocHJvZHVjZXJUcmFuc3BvcnQpIHtcbiAgICAgICAgdmlkZW9Qcm9kdWNlciA9IGF3YWl0IHByb2R1Y2VyVHJhbnNwb3J0LnByb2R1Y2UodmlkZW9QYXJhbXMpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQcm9kdWNlciB0cmFuc3BvcnQgaXMgbnVsbCcpO1xuICAgICAgfVxuXG4gICAgICAvLyBVcGRhdGUgbWFpbiB3aW5kb3cgc3RhdGUgYmFzZWQgb24gdGhlIHZpZGVvIGNvbm5lY3Rpb24gbGV2ZWxcbiAgICAgIGlmIChpc2xldmVsID09PSAnMicpIHtcbiAgICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgdmlkZW8gcHJvZHVjZXIgYW5kIHByb2R1Y2VyIHRyYW5zcG9ydCBvYmplY3RzXG4gICAgICB1cGRhdGVWaWRlb1Byb2R1Y2VyKHZpZGVvUHJvZHVjZXIpO1xuICAgICAgdXBkYXRlUHJvZHVjZXJUcmFuc3BvcnQocHJvZHVjZXJUcmFuc3BvcnQpO1xuICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh1cGRhdGVNYWluV2luZG93KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8gZXJyb3InLCBlcnJvcik7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH07XG59XG4iXX0=