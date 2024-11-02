import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service for controlling participant media in a session, with options to manage audio, video, screenshare, and chat functionalities.
 *
 * @class
 * @name ControlMediaHost
 * @description This service provides the host with control over a participant's media (audio, video, screenshare, chat), with options to enable or disable these functionalities individually or all at once.
 *
 * @method
 * controlMediaHost
 * @async
 * @param {ControlMediaHostOptions} options - Options to specify which media type to control and provide necessary parameters.
 * @param {string} options.type - The media type to control ('audio', 'video', 'screenshare', 'chat', 'all').
 * @param {ControlMediaHostParameters} options.parameters - Additional parameters, functions, and media streams necessary to perform the media control operations.
 *
 * @returns {Promise<void>} - A promise that resolves when the media control operation is complete.
 *
 * @example
 * ```typescript
 * const controlMediaHostService = new ControlMediaHost();
 * await controlMediaHostService.controlMediaHost({
 *   type: 'audio',
 *   parameters: {
 *     updateAdminRestrictSetting: (value) => console.log(value),
 *     localStream: myLocalStream,
 *     updateLocalStream: (stream) => console.log(stream),
 *     updateAudioAlreadyOn: (value) => console.log(value),
 *     onScreenChanges: async () => { },
 *     disconnectSendTransportAudio: async () => { },
 *     getUpdatedAllParams: () => ({ }),
 *   }
 * });
 * ```
 *
 * @remarks
 * - This function handles the control of audio, video, screenshare, or chat for a participant based on the specified type.
 * - For `all` type, it sequentially controls each media type to ensure all are turned off.
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1tZWRpYS1ob3N0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvY29udHJvbC1tZWRpYS1ob3N0LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFtRDNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ0c7QUFLSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0EyQkc7SUFDSCxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUEyQixFQUFpQixFQUFFO1FBQ3hGLElBQUksRUFDRiwwQkFBMEIsRUFDMUIsaUJBQWlCLEVBQ2pCLG9CQUFvQixFQUNwQix1QkFBdUIsRUFDdkIsc0JBQXNCLEVBQ3RCLHFCQUFxQixFQUNyQixvQkFBb0IsRUFDcEIsbUJBQW1CLEVBQ25CLGVBQWUsRUFDZixlQUFlLEVBQ2YsNEJBQTRCLEVBQzVCLDRCQUE0QixFQUM1Qiw2QkFBNkIsR0FDOUIsR0FBRyxVQUFVLENBQUM7UUFFZixJQUFJLEVBQUUsV0FBVyxFQUFFLGlCQUFpQixFQUFFLGdCQUFnQixFQUFFLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFNUYsSUFBSSxDQUFDO1lBQ0gsMEJBQTBCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFakMsSUFBSSxJQUFJLEtBQUssT0FBTyxFQUFFLENBQUM7Z0JBQ3JCLElBQUksV0FBVyxFQUFFLENBQUM7b0JBQ2hCLFdBQVcsQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2dCQUNsRCxDQUFDO2dC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QztnQkFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO29CQUNmLGVBQWUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDakQsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDckQsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0E3SVMsZ0JBQWdCOzJHQUFoQixnQkFBZ0IsY0FGZixNQUFNOzsyRkFFUCxnQkFBZ0I7a0JBSDVCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgT25TY3JlZW5DaGFuZ2VzVHlwZSxcbiAgU3RvcFNoYXJlU2NyZWVuVHlwZSxcbiAgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1R5cGUsXG4gIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9UeXBlLFxuICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblR5cGUsXG4gIE9uU2NyZWVuQ2hhbmdlc1BhcmFtZXRlcnMsXG4gIFN0b3BTaGFyZVNjcmVlblBhcmFtZXRlcnMsXG4gIERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0VmlkZW9QYXJhbWV0ZXJzLFxuICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvUGFyYW1ldGVycyxcbiAgRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5QYXJhbWV0ZXJzLFxufSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBDb250cm9sTWVkaWFIb3N0UGFyYW1ldGVyc1xuICBleHRlbmRzIE9uU2NyZWVuQ2hhbmdlc1BhcmFtZXRlcnMsXG4gICAgU3RvcFNoYXJlU2NyZWVuUGFyYW1ldGVycyxcbiAgICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvUGFyYW1ldGVycyxcbiAgICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvUGFyYW1ldGVycyxcbiAgICBEaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlblBhcmFtZXRlcnMge1xuICB1cGRhdGVBZG1pblJlc3RyaWN0U2V0dGluZzogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuICBsb2NhbFN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsO1xuICB1cGRhdGVMb2NhbFN0cmVhbTogKHN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVBdWRpb0FscmVhZHlPbjogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuICBsb2NhbFN0cmVhbVNjcmVlbjogTWVkaWFTdHJlYW0gfCBudWxsO1xuICB1cGRhdGVMb2NhbFN0cmVhbVNjcmVlbjogKHN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsKSA9PiB2b2lkO1xuICBsb2NhbFN0cmVhbVZpZGVvOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIHVwZGF0ZUxvY2FsU3RyZWFtVmlkZW86IChzdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCkgPT4gdm9pZDtcblxuICB1cGRhdGVTY3JlZW5BbHJlYWR5T246ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlVmlkZW9BbHJlYWR5T246ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQ2hhdEFscmVhZHlPbjogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBvblNjcmVlbkNoYW5nZXM6IE9uU2NyZWVuQ2hhbmdlc1R5cGU7XG4gIHN0b3BTaGFyZVNjcmVlbjogU3RvcFNoYXJlU2NyZWVuVHlwZTtcbiAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbzogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlb1R5cGU7XG4gIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW86IERpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW9UeXBlO1xuICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbjogRGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW5UeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IENvbnRyb2xNZWRpYUhvc3RQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udHJvbE1lZGlhSG9zdE9wdGlvbnMge1xuICB0eXBlOiAnYXVkaW8nIHwgJ3ZpZGVvJyB8ICdzY3JlZW5zaGFyZScgfCAnY2hhdCcgfCAnYWxsJztcbiAgcGFyYW1ldGVyczogQ29udHJvbE1lZGlhSG9zdFBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENvbnRyb2xNZWRpYUhvc3RUeXBlID0gKG9wdGlvbnM6IENvbnRyb2xNZWRpYUhvc3RPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFNlcnZpY2UgZm9yIGNvbnRyb2xsaW5nIHBhcnRpY2lwYW50IG1lZGlhIGluIGEgc2Vzc2lvbiwgd2l0aCBvcHRpb25zIHRvIG1hbmFnZSBhdWRpbywgdmlkZW8sIHNjcmVlbnNoYXJlLCBhbmQgY2hhdCBmdW5jdGlvbmFsaXRpZXMuXG4gKlxuICogQGNsYXNzXG4gKiBAbmFtZSBDb250cm9sTWVkaWFIb3N0XG4gKiBAZGVzY3JpcHRpb24gVGhpcyBzZXJ2aWNlIHByb3ZpZGVzIHRoZSBob3N0IHdpdGggY29udHJvbCBvdmVyIGEgcGFydGljaXBhbnQncyBtZWRpYSAoYXVkaW8sIHZpZGVvLCBzY3JlZW5zaGFyZSwgY2hhdCksIHdpdGggb3B0aW9ucyB0byBlbmFibGUgb3IgZGlzYWJsZSB0aGVzZSBmdW5jdGlvbmFsaXRpZXMgaW5kaXZpZHVhbGx5IG9yIGFsbCBhdCBvbmNlLlxuICpcbiAqIEBtZXRob2RcbiAqIGNvbnRyb2xNZWRpYUhvc3RcbiAqIEBhc3luY1xuICogQHBhcmFtIHtDb250cm9sTWVkaWFIb3N0T3B0aW9uc30gb3B0aW9ucyAtIE9wdGlvbnMgdG8gc3BlY2lmeSB3aGljaCBtZWRpYSB0eXBlIHRvIGNvbnRyb2wgYW5kIHByb3ZpZGUgbmVjZXNzYXJ5IHBhcmFtZXRlcnMuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy50eXBlIC0gVGhlIG1lZGlhIHR5cGUgdG8gY29udHJvbCAoJ2F1ZGlvJywgJ3ZpZGVvJywgJ3NjcmVlbnNoYXJlJywgJ2NoYXQnLCAnYWxsJykuXG4gKiBAcGFyYW0ge0NvbnRyb2xNZWRpYUhvc3RQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMsIGZ1bmN0aW9ucywgYW5kIG1lZGlhIHN0cmVhbXMgbmVjZXNzYXJ5IHRvIHBlcmZvcm0gdGhlIG1lZGlhIGNvbnRyb2wgb3BlcmF0aW9ucy5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBtZWRpYSBjb250cm9sIG9wZXJhdGlvbiBpcyBjb21wbGV0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3QgY29udHJvbE1lZGlhSG9zdFNlcnZpY2UgPSBuZXcgQ29udHJvbE1lZGlhSG9zdCgpO1xuICogYXdhaXQgY29udHJvbE1lZGlhSG9zdFNlcnZpY2UuY29udHJvbE1lZGlhSG9zdCh7XG4gKiAgIHR5cGU6ICdhdWRpbycsXG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICB1cGRhdGVBZG1pblJlc3RyaWN0U2V0dGluZzogKHZhbHVlKSA9PiBjb25zb2xlLmxvZyh2YWx1ZSksXG4gKiAgICAgbG9jYWxTdHJlYW06IG15TG9jYWxTdHJlYW0sXG4gKiAgICAgdXBkYXRlTG9jYWxTdHJlYW06IChzdHJlYW0pID0+IGNvbnNvbGUubG9nKHN0cmVhbSksXG4gKiAgICAgdXBkYXRlQXVkaW9BbHJlYWR5T246ICh2YWx1ZSkgPT4gY29uc29sZS5sb2codmFsdWUpLFxuICogICAgIG9uU2NyZWVuQ2hhbmdlczogYXN5bmMgKCkgPT4geyB9LFxuICogICAgIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW86IGFzeW5jICgpID0+IHsgfSxcbiAqICAgICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiAoeyB9KSxcbiAqICAgfVxuICogfSk7XG4gKiBgYGBcbiAqXG4gKiBAcmVtYXJrc1xuICogLSBUaGlzIGZ1bmN0aW9uIGhhbmRsZXMgdGhlIGNvbnRyb2wgb2YgYXVkaW8sIHZpZGVvLCBzY3JlZW5zaGFyZSwgb3IgY2hhdCBmb3IgYSBwYXJ0aWNpcGFudCBiYXNlZCBvbiB0aGUgc3BlY2lmaWVkIHR5cGUuXG4gKiAtIEZvciBgYWxsYCB0eXBlLCBpdCBzZXF1ZW50aWFsbHkgY29udHJvbHMgZWFjaCBtZWRpYSB0eXBlIHRvIGVuc3VyZSBhbGwgYXJlIHR1cm5lZCBvZmYuXG4gKi9cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENvbnRyb2xNZWRpYUhvc3Qge1xuICAvKipcbiAgICogQ29udHJvbHMgdGhlIG1lZGlhIChhdWRpbywgdmlkZW8sIHNjcmVlbnNoYXJlLCBjaGF0KSBvZiBhIHBhcnRpY2lwYW50IGFzIGEgaG9zdC5cbiAgICpcbiAgICogQHBhcmFtIHtvYmplY3R9IG9wdGlvbnMgLSBUaGUgZnVuY3Rpb24gcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMudHlwZSAtIFRoZSB0eXBlIG9mIG1lZGlhIHRvIGNvbnRyb2wgKCdhdWRpbycsICd2aWRlbycsICdzY3JlZW5zaGFyZScsICdjaGF0JywgJ2FsbCcpLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIG5lZWRlZCBmb3IgdGhlIGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5hZG1pblJlc3RyaWN0U2V0dGluZyAtIFRoZSBzZXR0aW5nIHRvIHJlc3RyaWN0IGhvc3QgY29udHJvbC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUFkbWluUmVzdHJpY3RTZXR0aW5nIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhZG1pblJlc3RyaWN0U2V0dGluZy5cbiAgICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtIC0gVGhlIGxvY2FsIGF1ZGlvIGFuZCB2aWRlbyBzdHJlYW0uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVMb2NhbFN0cmVhbSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbG9jYWwgYXVkaW8gYW5kIHZpZGVvIHN0cmVhbS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9BbHJlYWR5T24gLSBJbmRpY2F0ZXMgd2hldGhlciBhdWRpbyBpcyBjdXJyZW50bHkgb24uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVBdWRpb0FscmVhZHlPbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYXVkaW9BbHJlYWR5T24gc3RhdHVzLlxuICAgKiBAcGFyYW0ge01lZGlhU3RyZWFtfSBvcHRpb25zLnBhcmFtZXRlcnMubG9jYWxTdHJlYW1TY3JlZW4gLSBUaGUgbG9jYWwgc2NyZWVuc2hhcmUgc3RyZWFtLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTG9jYWxTdHJlYW1TY3JlZW4gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGxvY2FsIHNjcmVlbnNoYXJlIHN0cmVhbS5cbiAgICogQHBhcmFtIHtNZWRpYVN0cmVhbX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmxvY2FsU3RyZWFtVmlkZW8gLSBUaGUgbG9jYWwgdmlkZW8gc3RyZWFtLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTG9jYWxTdHJlYW1WaWRlbyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbG9jYWwgdmlkZW8gc3RyZWFtLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zY3JlZW5BbHJlYWR5T24gLSBJbmRpY2F0ZXMgd2hldGhlciBzY3JlZW5zaGFyZSBpcyBjdXJyZW50bHkgb24uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTY3JlZW5BbHJlYWR5T24gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHNjcmVlbkFscmVhZHlPbiBzdGF0dXMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnZpZGVvQWxyZWFkeU9uIC0gSW5kaWNhdGVzIHdoZXRoZXIgdmlkZW8gaXMgY3VycmVudGx5IG9uLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVmlkZW9BbHJlYWR5T24gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHZpZGVvQWxyZWFkeU9uIHN0YXR1cy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuY2hhdEFscmVhZHlPbiAtIEluZGljYXRlcyB3aGV0aGVyIGNoYXQgaXMgY3VycmVudGx5IG9uLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQ2hhdEFscmVhZHlPbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgY2hhdEFscmVhZHlPbiBzdGF0dXMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5vblNjcmVlbkNoYW5nZXMgLSBGdW5jdGlvbiB0byBoYW5kbGUgY2hhbmdlcyBpbiBzY3JlZW4gc3RhdHVzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuc3RvcFNoYXJlU2NyZWVuIC0gRnVuY3Rpb24gdG8gc3RvcCBzaGFyaW5nIHRoZSBzY3JlZW4uXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5kaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvIC0gRnVuY3Rpb24gdG8gZGlzY29ubmVjdCB2aWRlbyBzZW5kIHRyYW5zcG9ydC5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8gLSBGdW5jdGlvbiB0byBkaXNjb25uZWN0IGF1ZGlvIHNlbmQgdHJhbnNwb3J0LlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4gLSBGdW5jdGlvbiB0byBkaXNjb25uZWN0IHNjcmVlbnNoYXJlIHNlbmQgdHJhbnNwb3J0LlxuICAgKi9cbiAgY29udHJvbE1lZGlhSG9zdCA9IGFzeW5jICh7IHR5cGUsIHBhcmFtZXRlcnMgfTogQ29udHJvbE1lZGlhSG9zdE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBsZXQge1xuICAgICAgdXBkYXRlQWRtaW5SZXN0cmljdFNldHRpbmcsXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbSxcbiAgICAgIHVwZGF0ZUF1ZGlvQWxyZWFkeU9uLFxuICAgICAgdXBkYXRlTG9jYWxTdHJlYW1TY3JlZW4sXG4gICAgICB1cGRhdGVMb2NhbFN0cmVhbVZpZGVvLFxuICAgICAgdXBkYXRlU2NyZWVuQWxyZWFkeU9uLFxuICAgICAgdXBkYXRlVmlkZW9BbHJlYWR5T24sXG4gICAgICB1cGRhdGVDaGF0QWxyZWFkeU9uLFxuICAgICAgb25TY3JlZW5DaGFuZ2VzLFxuICAgICAgc3RvcFNoYXJlU2NyZWVuLFxuICAgICAgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRWaWRlbyxcbiAgICAgIGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0QXVkaW8sXG4gICAgICBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFNjcmVlbixcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGxldCB7IGxvY2FsU3RyZWFtLCBsb2NhbFN0cmVhbVNjcmVlbiwgbG9jYWxTdHJlYW1WaWRlbyB9ID0gcGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICB0cnkge1xuICAgICAgdXBkYXRlQWRtaW5SZXN0cmljdFNldHRpbmcodHJ1ZSk7XG5cbiAgICAgIGlmICh0eXBlID09PSAnYXVkaW8nKSB7XG4gICAgICAgIGlmIChsb2NhbFN0cmVhbSkge1xuICAgICAgICAgIGxvY2FsU3RyZWFtLmdldEF1ZGlvVHJhY2tzKClbMF0uZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtKGxvY2FsU3RyZWFtKTtcbiAgICAgICAgYXdhaXQgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRBdWRpbyh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIHVwZGF0ZUF1ZGlvQWxyZWFkeU9uKGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChsb2NhbFN0cmVhbSkge1xuICAgICAgICAgICAgbG9jYWxTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXS5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtKGxvY2FsU3RyZWFtKTtcbiAgICAgICAgICBhd2FpdCBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICBhd2FpdCBvblNjcmVlbkNoYW5nZXMoeyBjaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIHVwZGF0ZVZpZGVvQWxyZWFkeU9uKGZhbHNlKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAobG9jYWxTdHJlYW1WaWRlbykge1xuICAgICAgICAgICAgbG9jYWxTdHJlYW1WaWRlby5nZXRWaWRlb1RyYWNrcygpWzBdLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtVmlkZW8obG9jYWxTdHJlYW1WaWRlbyk7XG4gICAgICAgICAgICBhd2FpdCBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgIGF3YWl0IG9uU2NyZWVuQ2hhbmdlcyh7IGNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICB1cGRhdGVWaWRlb0FscmVhZHlPbihmYWxzZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIG9uU2NyZWVuQ2hhbmdlcyh7IGNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3NjcmVlbnNoYXJlJykge1xuICAgICAgICBpZiAobG9jYWxTdHJlYW1TY3JlZW4pIHtcbiAgICAgICAgICBsb2NhbFN0cmVhbVNjcmVlbi5nZXRWaWRlb1RyYWNrcygpWzBdLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVMb2NhbFN0cmVhbVNjcmVlbihsb2NhbFN0cmVhbVNjcmVlbik7XG4gICAgICAgIGF3YWl0IGRpc2Nvbm5lY3RTZW5kVHJhbnNwb3J0U2NyZWVuKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgYXdhaXQgc3RvcFNoYXJlU2NyZWVuKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgdXBkYXRlU2NyZWVuQWxyZWFkeU9uKGZhbHNlKTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ2NoYXQnKSB7XG4gICAgICAgIHVwZGF0ZUNoYXRBbHJlYWR5T24oZmFsc2UpO1xuICAgICAgfSBlbHNlIGlmICh0eXBlID09PSAnYWxsJykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChsb2NhbFN0cmVhbSkge1xuICAgICAgICAgICAgbG9jYWxTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKVswXS5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtKGxvY2FsU3RyZWFtKTtcbiAgICAgICAgICBhd2FpdCBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydEF1ZGlvKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB1cGRhdGVBdWRpb0FscmVhZHlPbihmYWxzZSk7XG4gICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgICB9XG5cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAobG9jYWxTdHJlYW1TY3JlZW4pIHtcbiAgICAgICAgICAgIGxvY2FsU3RyZWFtU2NyZWVuLmdldFZpZGVvVHJhY2tzKClbMF0uZW5hYmxlZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVMb2NhbFN0cmVhbVNjcmVlbihsb2NhbFN0cmVhbVNjcmVlbik7XG4gICAgICAgICAgYXdhaXQgZGlzY29ubmVjdFNlbmRUcmFuc3BvcnRTY3JlZW4oeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIGF3YWl0IHN0b3BTaGFyZVNjcmVlbih7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgdXBkYXRlU2NyZWVuQWxyZWFkeU9uKGZhbHNlKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGlmIChsb2NhbFN0cmVhbSkge1xuICAgICAgICAgICAgbG9jYWxTdHJlYW0uZ2V0VmlkZW9UcmFja3MoKVswXS5lbmFibGVkID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIHVwZGF0ZUxvY2FsU3RyZWFtKGxvY2FsU3RyZWFtKTtcbiAgICAgICAgICBhd2FpdCBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICBhd2FpdCBvblNjcmVlbkNoYW5nZXMoeyBjaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIHVwZGF0ZVZpZGVvQWxyZWFkeU9uKGZhbHNlKTtcbiAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgIH1cbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAobG9jYWxTdHJlYW1WaWRlbykge1xuICAgICAgICAgICAgbG9jYWxTdHJlYW1WaWRlby5nZXRWaWRlb1RyYWNrcygpWzBdLmVuYWJsZWQgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlTG9jYWxTdHJlYW1WaWRlbyhsb2NhbFN0cmVhbVZpZGVvKTtcbiAgICAgICAgICBhd2FpdCBkaXNjb25uZWN0U2VuZFRyYW5zcG9ydFZpZGVvKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICBhd2FpdCBvblNjcmVlbkNoYW5nZXMoeyBjaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIHVwZGF0ZVZpZGVvQWxyZWFkeU9uKGZhbHNlKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBvblNjcmVlbkNoYW5nZXMoeyBjaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGluIGNvbnRyb2xNZWRpYUhvc3Q6JywgZXJyb3IpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==