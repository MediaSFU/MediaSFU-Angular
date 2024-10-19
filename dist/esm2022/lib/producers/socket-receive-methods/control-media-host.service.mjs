import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ControlMediaHost {
    /**
     * Controls the media (audio, video, screenshare, chat) of a participant as a host.
     *
     * @param {object} options - The function parameters.
     * @param {string} options.type - The type of media to control ('audio', 'video', 'screenshare', 'chat', 'all').
     * @param {object} options.parameters - Additional parameters needed for the function.
     * @param {boolean} options.parameters.adminRestrictSetting - The setting to restrict host control.
     * @param {function} options.parameters.updateAdminRestrictSetting - Function to update the adminRestrictSetting.
     * @param {MediaStream} options.parameters.localStream - The local audio and video stream.
     * @param {function} options.parameters.updateLocalStream - Function to update the local audio and video stream.
     * @param {boolean} options.parameters.audioAlreadyOn - Indicates whether audio is currently on.
     * @param {function} options.parameters.updateAudioAlreadyOn - Function to update the audioAlreadyOn status.
     * @param {MediaStream} options.parameters.localStreamScreen - The local screenshare stream.
     * @param {function} options.parameters.updateLocalStreamScreen - Function to update the local screenshare stream.
     * @param {MediaStream} options.parameters.localStreamVideo - The local video stream.
     * @param {function} options.parameters.updateLocalStreamVideo - Function to update the local video stream.
     * @param {boolean} options.parameters.screenAlreadyOn - Indicates whether screenshare is currently on.
     * @param {function} options.parameters.updateScreenAlreadyOn - Function to update the screenAlreadyOn status.
     * @param {boolean} options.parameters.videoAlreadyOn - Indicates whether video is currently on.
     * @param {function} options.parameters.updateVideoAlreadyOn - Function to update the videoAlreadyOn status.
     * @param {boolean} options.parameters.chatAlreadyOn - Indicates whether chat is currently on.
     * @param {function} options.parameters.updateChatAlreadyOn - Function to update the chatAlreadyOn status.
     * @param {function} options.parameters.onScreenChanges - Function to handle changes in screen status.
     * @param {function} options.parameters.stopShareScreen - Function to stop sharing the screen.
     * @param {function} options.parameters.disconnectSendTransportVideo - Function to disconnect video send transport.
     * @param {function} options.parameters.disconnectSendTransportAudio - Function to disconnect audio send transport.
     * @param {function} options.parameters.disconnectSendTransportScreen - Function to disconnect screenshare send transport.
     */
    controlMediaHost = async ({ type, parameters }) => {
        let { updateAdminRestrictSetting, updateLocalStream, updateAudioAlreadyOn, updateLocalStreamScreen, updateLocalStreamVideo, updateScreenAlreadyOn, updateVideoAlreadyOn, updateChatAlreadyOn, onScreenChanges, stopShareScreen, disconnectSendTransportVideo, disconnectSendTransportAudio, disconnectSendTransportScreen, } = parameters;
        let { localStream, localStreamScreen, localStreamVideo } = parameters.getUpdatedAllParams();
        try {
            updateAdminRestrictSetting(true);
            if (type === 'audio') {
                if (localStream) {
                    localStream.getAudioTracks()[0].enabled = false;
                }
                updateLocalStream(localStream);
                await disconnectSendTransportAudio({ parameters });
                updateAudioAlreadyOn(false);
            }
            else if (type === 'video') {
                try {
                    if (localStream) {
                        localStream.getVideoTracks()[0].enabled = false;
                    }
                    updateLocalStream(localStream);
                    await disconnectSendTransportVideo({ parameters });
                    await onScreenChanges({ changed: true, parameters });
                    updateVideoAlreadyOn(false);
                }
                catch {
                    /* handle error */
                }
                try {
                    if (localStreamVideo) {
                        localStreamVideo.getVideoTracks()[0].enabled = false;
                        updateLocalStreamVideo(localStreamVideo);
                        await disconnectSendTransportVideo({ parameters });
                        await onScreenChanges({ changed: true, parameters });
                        updateVideoAlreadyOn(false);
                    }
                }
                catch (error) {
                    onScreenChanges({ changed: true, parameters });
                }
            }
            else if (type === 'screenshare') {
                if (localStreamScreen) {
                    localStreamScreen.getVideoTracks()[0].enabled = false;
                }
                updateLocalStreamScreen(localStreamScreen);
                await disconnectSendTransportScreen({ parameters });
                await stopShareScreen({ parameters });
                updateScreenAlreadyOn(false);
            }
            else if (type === 'chat') {
                updateChatAlreadyOn(false);
            }
            else if (type === 'all') {
                try {
                    if (localStream) {
                        localStream.getAudioTracks()[0].enabled = false;
                    }
                    updateLocalStream(localStream);
                    await disconnectSendTransportAudio({ parameters });
                    updateAudioAlreadyOn(false);
                }
                catch {
                    /* handle error */
                }
                try {
                    if (localStreamScreen) {
                        localStreamScreen.getVideoTracks()[0].enabled = false;
                    }
                    updateLocalStreamScreen(localStreamScreen);
                    await disconnectSendTransportScreen({ parameters });
                    await stopShareScreen({ parameters });
                    updateScreenAlreadyOn(false);
                }
                catch {
                    /* handle error */
                }
                try {
                    if (localStream) {
                        localStream.getVideoTracks()[0].enabled = false;
                    }
                    updateLocalStream(localStream);
                    await disconnectSendTransportVideo({ parameters });
                    await onScreenChanges({ changed: true, parameters });
                    updateVideoAlreadyOn(false);
                }
                catch {
                    /* handle error */
                }
                try {
                    if (localStreamVideo) {
                        localStreamVideo.getVideoTracks()[0].enabled = false;
                    }
                    updateLocalStreamVideo(localStreamVideo);
                    await disconnectSendTransportVideo({ parameters });
                    await onScreenChanges({ changed: true, parameters });
                    updateVideoAlreadyOn(false);
                }
                catch (error) {
                    onScreenChanges({ changed: true, parameters });
                }
            }
        }
        catch (error) {
            console.error('Error in controlMediaHost:', error);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ControlMediaHost, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ControlMediaHost, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ControlMediaHost, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1tZWRpYS1ob3N0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvY29udHJvbC1tZWRpYS1ob3N0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFzRDNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILGdCQUFnQixHQUFHLEtBQUssRUFBRSxFQUFFLElBQUksRUFBRSxVQUFVLEVBQTJCLEVBQWlCLEVBQUU7UUFDeEYsSUFBSSxFQUNGLDBCQUEwQixFQUMxQixpQkFBaUIsRUFDakIsb0JBQW9CLEVBQ3BCLHVCQUF1QixFQUN2QixzQkFBc0IsRUFDdEIscUJBQXFCLEVBQ3JCLG9CQUFvQixFQUNwQixtQkFBbUIsRUFDbkIsZUFBZSxFQUNmLGVBQWUsRUFDZiw0QkFBNEIsRUFDNUIsNEJBQTRCLEVBQzVCLDZCQUE2QixHQUM5QixHQUFHLFVBQVUsQ0FBQztRQUVmLElBQUksRUFBRSxXQUFXLEVBQUUsaUJBQWlCLEVBQUUsZ0JBQWdCLEVBQUUsR0FBRyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUU1RixJQUFJLENBQUM7WUFDSCwwQkFBMEIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUVqQyxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxXQUFXLEVBQUUsQ0FBQztvQkFDaEIsV0FBVyxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7Z0JBQ2xELENBQUM7Z0JBQ0QsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQy9CLE1BQU0sNEJB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QUUsT0FBTyxFQUFFLElBQUksRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUNqRCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNyRCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQTdJUyxnQkFBZ0I7MkdBQWhCLGdCQUFnQixjQUZmLE1BQU07OzJGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBPblNjcmVlbkNoYW5nZXNUeXBlLFxuICBTdG9wU2hhcmVTY3JlZW5UeXBlLFxuICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvVHlwZSxcbiAgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1R5cGUsXG4gIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuVHlwZSxcbiAgT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycyxcbiAgU3RvcFNoYXJlU2NyZWVuUGFyYW1ldGVycyxcbiAgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1BhcmFtZXRlcnMsXG4gIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9QYXJhbWV0ZXJzLFxuICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnMsXG59IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIENvbnRyb2xNZWRpYUhvc3RQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycyxcbiAgICBTdG9wU2hhcmVTY3JlZW5QYXJhbWV0ZXJzLFxuICAgIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9QYXJhbWV0ZXJzLFxuICAgIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9QYXJhbWV0ZXJzLFxuICAgIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuUGFyYW1ldGVycyB7XG4gIHVwZGF0ZUFkbWluUmVzdHJpY3RTZXR0aW5nOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGxvY2FsU3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIHVwZGF0ZUxvY2FsU3RyZWFtOiAoc3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZUF1ZGlvQWxyZWFkeU9uOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGxvY2FsU3RyZWFtU2NyZWVuOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIHVwZGF0ZUxvY2FsU3RyZWFtU2NyZWVuOiAoc3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGwpID0+IHZvaWQ7XG4gIGxvY2FsU3RyZWFtVmlkZW86IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgdXBkYXRlTG9jYWxTdHJlYW1WaWRlbzogKHN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB2b2lkO1xuXG4gIHVwZGF0ZVNjcmVlbkFscmVhZHlPbjogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVWaWRlb0FscmVhZHlPbjogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVDaGF0QWxyZWFkeU9uOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIG9uU2NyZWVuQ2hhbmdlczogT25TY3JlZW5DaGFuZ2VzVHlwZTtcbiAgc3RvcFNoYXJlU2NyZWVuOiBTdG9wU2hhcmVTY3JlZW5UeXBlO1xuICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvOiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvVHlwZTtcbiAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbzogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpb1R5cGU7XG4gIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuOiBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gQ29udHJvbE1lZGlhSG9zdFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb250cm9sTWVkaWFIb3N0T3B0aW9ucyB7XG4gIHR5cGU6ICdhdWRpbycgfCAndmlkZW8nIHwgJ3NjcmVlbnNoYXJlJyB8ICdjaGF0JyB8ICdhbGwnO1xuICBwYXJhbWV0ZXJzOiBDb250cm9sTWVkaWFIb3N0UGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ29udHJvbE1lZGlhSG9zdFR5cGUgPSAob3B0aW9uczogQ29udHJvbE1lZGlhSG9zdE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDb250cm9sTWVkaWFIb3N0IHtcbiAgLyoqXG4gICAqIENvbnRyb2xzIHRoZSBtZWRpYSAoYXVkaW8sIHZpZGVvLCBzY3JlZW5zaGFyZSwgY2hhdCkgb2YgYSBwYXJ0aWNpcGFudCBhcyBhIGhvc3QuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIGZ1bmN0aW9uIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnR5cGUgLSBUaGUgdHlwZSBvZiBtZWRpYSB0byBjb250cm9sICgnYXVkaW8nLCAndmlkZW8nLCAnc2NyZWVuc2hhcmUnLCAnY2hhdCcsICdhbGwnKS5cbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycyBuZWVkZWQgZm9yIHRoZSBmdW5jdGlvbi5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYWRtaW5SZXN0cmljdFNldHRpbmcgLSBUaGUgc2V0dGluZyB0byByZXN0cmljdCBob3N0IGNvbnRyb2wuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVBZG1pblJlc3RyaWN0U2V0dGluZyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYWRtaW5SZXN0cmljdFNldHRpbmcuXG4gICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG9wdGlvbnMucGFyYW1ldGVycy5sb2NhbFN0cmVhbSAtIFRoZSBsb2NhbCBhdWRpbyBhbmQgdmlkZW8gc3RyZWFtLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTG9jYWxTdHJlYW0gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGxvY2FsIGF1ZGlvIGFuZCB2aWRlbyBzdHJlYW0uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvQWxyZWFkeU9uIC0gSW5kaWNhdGVzIHdoZXRoZXIgYXVkaW8gaXMgY3VycmVudGx5IG9uLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQXVkaW9BbHJlYWR5T24gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF1ZGlvQWxyZWFkeU9uIHN0YXR1cy5cbiAgICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtU2NyZWVuIC0gVGhlIGxvY2FsIHNjcmVlbnNoYXJlIHN0cmVhbS5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUxvY2FsU3RyZWFtU2NyZWVuIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBsb2NhbCBzY3JlZW5zaGFyZSBzdHJlYW0uXG4gICAqIEBwYXJhbSB7TWVkaWFTdHJlYW19IG9wdGlvbnMucGFyYW1ldGVycy5sb2NhbFN0cmVhbVZpZGVvIC0gVGhlIGxvY2FsIHZpZGVvIHN0cmVhbS5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUxvY2FsU3RyZWFtVmlkZW8gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGxvY2FsIHZpZGVvIHN0cmVhbS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuQWxyZWFkeU9uIC0gSW5kaWNhdGVzIHdoZXRoZXIgc2NyZWVuc2hhcmUgaXMgY3VycmVudGx5IG9uLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlU2NyZWVuQWxyZWFkeU9uIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW5BbHJlYWR5T24gc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy52aWRlb0FscmVhZHlPbiAtIEluZGljYXRlcyB3aGV0aGVyIHZpZGVvIGlzIGN1cnJlbnRseSBvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVZpZGVvQWxyZWFkeU9uIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aWRlb0FscmVhZHlPbiBzdGF0dXMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNoYXRBbHJlYWR5T24gLSBJbmRpY2F0ZXMgd2hldGhlciBjaGF0IGlzIGN1cnJlbnRseSBvbi5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUNoYXRBbHJlYWR5T24gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGNoYXRBbHJlYWR5T24gc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMub25TY3JlZW5DaGFuZ2VzIC0gRnVuY3Rpb24gdG8gaGFuZGxlIGNoYW5nZXMgaW4gc2NyZWVuIHN0YXR1cy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnN0b3BTaGFyZVNjcmVlbiAtIEZ1bmN0aW9uIHRvIHN0b3Agc2hhcmluZyB0aGUgc2NyZWVuLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyAtIEZ1bmN0aW9uIHRvIGRpc2Nvbm5lY3QgdmlkZW8gc2VuZCB0cmFuc3BvcnQuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvIC0gRnVuY3Rpb24gdG8gZGlzY29ubmVjdCBhdWRpbyBzZW5kIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuIC0gRnVuY3Rpb24gdG8gZGlzY29ubmVjdCBzY3JlZW5zaGFyZSBzZW5kIHRyYW5zcG9ydC5cbiAgICovXG4gIGNvbnRyb2xNZWRpYUhvc3QgPSBhc3luYyAoeyB0eXBlLCBwYXJhbWV0ZXJzIH06IENvbnRyb2xNZWRpYUhvc3RPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgbGV0IHtcbiAgICAgIHVwZGF0ZUFkbWluUmVzdHJpY3RTZXR0aW5nLFxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW0sXG4gICAgICB1cGRhdGVBdWRpb0FscmVhZHlPbixcbiAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtU2NyZWVuLFxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW1WaWRlbyxcbiAgICAgIHVwZGF0ZVNjcmVlbkFscmVhZHlPbixcbiAgICAgIHVwZGF0ZVZpZGVvQWxyZWFkeU9uLFxuICAgICAgdXBkYXRlQ2hhdEFscmVhZHlPbixcbiAgICAgIG9uU2NyZWVuQ2hhbmdlcyxcbiAgICAgIHN0b3BTaGFyZVNjcmVlbixcbiAgICAgIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW8sXG4gICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvLFxuICAgICAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4sXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICBsZXQgeyBsb2NhbFN0cmVhbSwgbG9jYWxTdHJlYW1TY3JlZW4sIGxvY2FsU3RyZWFtVmlkZW8gfSA9IHBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgdHJ5IHtcbiAgICAgIHVwZGF0ZUFkbWluUmVzdHJpY3RTZXR0aW5nKHRydWUpO1xuXG4gICAgICBpZiAodHlwZSA9PT0gJ2F1ZGlvJykge1xuICAgICAgICBpZiAobG9jYWxTdHJlYW0pIHtcbiAgICAgICAgICBsb2NhbFN0cmVhbS5nZXRBdWRpb1RyYWNrcygpWzBdLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVMb2NhbFN0cmVhbShsb2NhbFN0cmVhbSk7XG4gICAgICAgIGF3YWl0IGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8oeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB1cGRhdGVBdWRpb0FscmVhZHlPbihmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAobG9jYWxTdHJlYW0pIHtcbiAgICAgICAgICAgIGxvY2FsU3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0uZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVMb2NhbFN0cmVhbShsb2NhbFN0cmVhbSk7XG4gICAgICAgICAgYXdhaXQgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgYXdhaXQgb25TY3JlZW5DaGFuZ2VzKHsgY2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB1cGRhdGVWaWRlb0FscmVhZHlPbihmYWxzZSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKGxvY2FsU3RyZWFtVmlkZW8pIHtcbiAgICAgICAgICAgIGxvY2FsU3RyZWFtVmlkZW8uZ2V0VmlkZW9UcmFja3MoKVswXS5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgICB1cGRhdGVMb2NhbFN0cmVhbVZpZGVvKGxvY2FsU3RyZWFtVmlkZW8pO1xuICAgICAgICAgICAgYXdhaXQgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICBhd2FpdCBvblNjcmVlbkNoYW5nZXMoeyBjaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgdXBkYXRlVmlkZW9BbHJlYWR5T24oZmFsc2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBvblNjcmVlbkNoYW5nZXMoeyBjaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdzY3JlZW5zaGFyZScpIHtcbiAgICAgICAgaWYgKGxvY2FsU3RyZWFtU2NyZWVuKSB7XG4gICAgICAgICAgbG9jYWxTdHJlYW1TY3JlZW4uZ2V0VmlkZW9UcmFja3MoKVswXS5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlTG9jYWxTdHJlYW1TY3JlZW4obG9jYWxTdHJlYW1TY3JlZW4pO1xuICAgICAgICBhd2FpdCBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbih7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIGF3YWl0IHN0b3BTaGFyZVNjcmVlbih7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIHVwZGF0ZVNjcmVlbkFscmVhZHlPbihmYWxzZSk7XG4gICAgICB9IGVsc2UgaWYgKHR5cGUgPT09ICdjaGF0Jykge1xuICAgICAgICB1cGRhdGVDaGF0QWxyZWFkeU9uKGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2FsbCcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAobG9jYWxTdHJlYW0pIHtcbiAgICAgICAgICAgIGxvY2FsU3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF0uZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVMb2NhbFN0cmVhbShsb2NhbFN0cmVhbSk7XG4gICAgICAgICAgYXdhaXQgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgdXBkYXRlQXVkaW9BbHJlYWR5T24oZmFsc2UpO1xuICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKGxvY2FsU3RyZWFtU2NyZWVuKSB7XG4gICAgICAgICAgICBsb2NhbFN0cmVhbVNjcmVlbi5nZXRWaWRlb1RyYWNrcygpWzBdLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlTG9jYWxTdHJlYW1TY3JlZW4obG9jYWxTdHJlYW1TY3JlZW4pO1xuICAgICAgICAgIGF3YWl0IGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICBhd2FpdCBzdG9wU2hhcmVTY3JlZW4oeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIHVwZGF0ZVNjcmVlbkFscmVhZHlPbihmYWxzZSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAobG9jYWxTdHJlYW0pIHtcbiAgICAgICAgICAgIGxvY2FsU3RyZWFtLmdldFZpZGVvVHJhY2tzKClbMF0uZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVMb2NhbFN0cmVhbShsb2NhbFN0cmVhbSk7XG4gICAgICAgICAgYXdhaXQgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgYXdhaXQgb25TY3JlZW5DaGFuZ2VzKHsgY2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB1cGRhdGVWaWRlb0FscmVhZHlPbihmYWxzZSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgICB9XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgaWYgKGxvY2FsU3RyZWFtVmlkZW8pIHtcbiAgICAgICAgICAgIGxvY2FsU3RyZWFtVmlkZW8uZ2V0VmlkZW9UcmFja3MoKVswXS5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtVmlkZW8obG9jYWxTdHJlYW1WaWRlbyk7XG4gICAgICAgICAgYXdhaXQgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgYXdhaXQgb25TY3JlZW5DaGFuZ2VzKHsgY2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB1cGRhdGVWaWRlb0FscmVhZHlPbihmYWxzZSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgb25TY3JlZW5DaGFuZ2VzKHsgY2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBpbiBjb250cm9sTWVkaWFIb3N0OicsIGVycm9yKTtcbiAgICB9XG4gIH07XG59XG4iXX0=