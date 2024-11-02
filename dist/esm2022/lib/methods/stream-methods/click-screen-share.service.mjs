// screen-share.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Handles the action for the screen button, including starting and stopping screen sharing.
 *
 * @param {ClickScreenShareOptions} options - Options for handling the screen button action.
 * @param {Object} options.parameters - The parameters required for the screen share action.
 * @param {Function} options.parameters.showAlert - Function to show alert messages.
 * @param {string} options.parameters.roomName - The name of the room where the screen share is taking place.
 * @param {string} options.parameters.member - The member initiating the screen share.
 * @param {Socket} options.parameters.socket - The socket connection used for communication.
 * @param {string} options.parameters.islevel - The participant's level.
 * @param {boolean} options.parameters.youAreCoHost - Indicates if the user is a co-host.
 * @param {boolean} options.parameters.adminRestrictSetting - Indicates if there are restrictions set by the admin.
 * @param {string} options.parameters.audioSetting - Current audio setting.
 * @param {string} options.parameters.videoSetting - Current video setting.
 * @param {string} options.parameters.screenshareSetting - Current screen share setting.
 * @param {string} options.parameters.chatSetting - Current chat setting.
 * @param {boolean} options.parameters.screenAction - Indicates if a screen action is currently taking place.
 * @param {boolean} options.parameters.screenAlreadyOn - Indicates if screen sharing is currently active.
 * @param {string | null} options.parameters.screenRequestState - State of the screen share request.
 * @param {number} options.parameters.screenRequestTime - Timestamp of when the screen share request was made.
 * @param {boolean} options.parameters.audioOnlyRoom - Indicates if the room is audio-only.
 * @param {number} options.parameters.updateRequestIntervalSeconds - Interval time for updating request state.
 * @param {Function} options.parameters.updateScreenRequestState - Function to update the screen request state.
 * @param {Function} options.parameters.updateScreenAlreadyOn - Function to update the screen sharing status.
 * @param {Function} options.parameters.checkPermission - Function to check permissions for screen sharing.
 * @param {Function} options.parameters.checkScreenShare - Function to check and initiate screen sharing.
 * @param {Function} options.parameters.stopShareScreen - Function to stop screen sharing.
 *
 * @returns {Promise<void>} A promise that resolves when the screen share action has been handled.
 *
 * @remarks
 * This function checks the current status of screen sharing and handles the logic for starting or stopping screen sharing.
 * It validates permissions and room settings before allowing screen sharing to be activated or deactivated.
 *
 * @example
 * ```typescript
 * const options: ClickScreenShareOptions = {
 *   parameters: {
 *     showAlert: (alert) => console.log(alert.message),
 *     roomName: 'myRoom',
 *     member: 'John Doe',
 *     socket: socketInstance,
 *     islevel: '1',
 *     youAreCoHost: false,
 *     adminRestrictSetting: false,
 *     audioSetting: 'on',
 *     videoSetting: 'on',
 *     screenshareSetting: 'off',
 *     chatSetting: 'allow',
 *     screenAction: false,
 *     screenAlreadyOn: false,
 *     screenRequestState: null,
 *     screenRequestTime: 0,
 *     audioOnlyRoom: false,
 *     updateRequestIntervalSeconds: 30,
 *     updateScreenRequestState: (state) => console.log(`Screen request state: ${state}`),
 *     updateScreenAlreadyOn: (status) => console.log(`Screen already on: ${status}`),
 *     checkPermission: checkPermissionFunction,
 *     checkScreenShare: checkScreenShareFunction,
 *     stopShareScreen: stopShareScreenFunction,
 *     getUpdatedAllParams: () => parameters,
 *   },
 * };
 *
 * const clickScreenShareService = new ClickScreenShare();
 * await clickScreenShareService.clickScreenShare(options);
 * ```
 */
export class ClickScreenShare {
    /**
     * Handles the action for the screen button, including starting and stopping screen sharing.
     *
     * @param {ClickScreenShareParams} options - Options for handling the screen button action.
     * @returns {Promise<void>}
     */
    clickScreenShare = async ({ parameters }) => {
        parameters = { ...parameters, ...parameters.getUpdatedAllParams() };
        let { showAlert, roomName, member, socket, islevel, youAreCoHost, adminRestrictSetting, audioSetting, videoSetting, screenshareSetting, chatSetting, screenAction, screenAlreadyOn, screenRequestState, screenRequestTime, audioOnlyRoom, updateRequestIntervalSeconds, updateScreenRequestState, updateScreenAlreadyOn, checkPermission, checkScreenShare, stopShareScreen, } = parameters;
        if (audioOnlyRoom) {
            showAlert?.({
                message: 'You cannot turn on your camera in an audio-only event.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        if (roomName.startsWith('d')) {
            showAlert?.({
                message: 'You cannot start screen share in a demo room.',
                type: 'danger',
                duration: 3000,
            });
            return;
        }
        if (screenAlreadyOn) {
            screenAlreadyOn = false;
            updateScreenAlreadyOn(screenAlreadyOn);
            await stopShareScreen({ parameters });
        }
        else {
            if (adminRestrictSetting) {
                showAlert?.({
                    message: 'You cannot start screen share. Access denied by host.',
                    type: 'danger',
                    duration: 3000,
                });
                return;
            }
            let response = 2;
            if (!screenAction && islevel != '2' && !youAreCoHost) {
                response = await checkPermission({
                    permissionType: 'screenshareSetting',
                    audioSetting,
                    videoSetting,
                    screenshareSetting,
                    chatSetting,
                });
            }
            else {
                response = 0;
            }
            switch (response) {
                case 0:
                    checkScreenShare({ parameters });
                    break;
                case 1: {
                    if (screenRequestState === 'pending') {
                        showAlert?.({
                            message: 'A request is already pending. Please wait for the host to respond.',
                            type: 'danger',
                            duration: 3000,
                        });
                        return;
                    }
                    if (screenRequestState === 'rejected' &&
                        Date.now() - screenRequestTime < updateRequestIntervalSeconds) {
                        showAlert?.({
                            message: 'You cannot send another request at this time.',
                            type: 'danger',
                            duration: 3000,
                        });
                        return;
                    }
                    showAlert?.({
                        message: 'Your request has been sent to the host.',
                        type: 'success',
                        duration: 3000,
                    });
                    screenRequestState = 'pending';
                    updateScreenRequestState(screenRequestState);
                    let userRequest = { id: socket.id, name: member, icon: 'fa-desktop' };
                    socket.emit('participantRequest', { userRequest, roomName });
                    break;
                }
                case 2:
                    showAlert?.({
                        message: 'You are not allowed to start screen share.',
                        type: 'danger',
                        duration: 3000,
                    });
                    break;
                default:
            }
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ClickScreenShare, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ClickScreenShare, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ClickScreenShare, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stc2NyZWVuLXNoYXJlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9jbGljay1zY3JlZW4tc2hhcmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBMEI7QUFDMUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFrRDNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUVHO0FBS0gsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQjs7Ozs7T0FLRztJQUNILGdCQUFnQixHQUFHLEtBQUssRUFBRSxFQUFFLFVBQVUsRUFBMkIsRUFBaUIsRUFBRTtRQUNsRixVQUFVLEdBQUcsRUFBRSxHQUFHLFVBQVUsRUFBRSxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxFQUFFLENBQUM7UUFDcEUsSUFBSSxFQUNGLFNBQVMsRUFDVCxRQUFRLEVBQ1IsTUFBTSxFQUNOLE1BQU0sRUFDTixPQUFPLEVBQ1AsWUFBWSxFQUNaLG9CQUFvQixFQUNwQixZQUFZLEVBQ1osWUFBWSxFQUNaLGtCQUFrQixFQUNsQixXQUFXLEVBQ1gsWUFBWSxFQUNaLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYiw0QkFBNEIsRUFDNUIsd0JBQXdCLEVBQ3hCLHFCQUFxQixFQUNyQixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLGVBQWUsR0FDaEIsR0FBRyxVQUFVLENBQUM7UUFFZixJQUFJLGFBQWEsRUFBRSxDQUFDO1lBQ2xCLFNBQVMsRUFBRSxDQUFDO2dCQUNWLE9BQU8sRUFBRSx3REFBd0Q7Z0JBQ2pFLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUM3QixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsK0NBQStDO2dCQUN4RCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztZQUNILE9BQU87UUFDVCxDQUFDO1FBRUQsSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUNwQixlQUFlLEdBQUcsS0FBSyxDQUFDO1lBQ3hCLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQ3ZDLE1BQU0sZUFBZSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN4QyxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksb0JBQW9CLEVBQUUsQ0FBQztnQkFDekIsU0FBUyxFQUFFLENBQUM7b0JBQ1YsT0FBTyxFQUFFLHVEQUF1RDtvQkFDaEUsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO2dCQUNILE9BQU87WUFDVCxDQUFDO1lBRUQsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxZQUFZLElBQUksT0FBTyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2dCQUNyRCxRQUFRLEdBQUcsTUFBTSxlQUFlLENBQUM7b0JBQy9CLGNBQWMsRUFBRSxvQkFBb0I7b0JBQ3BDLFlBQVk7b0JBQ1osWUFBWTtvQkFDWixrQkFBa0I7b0JBQ2xCLFdBQVc7aUJBQ1osQ0FBQyxDQUFDO1lBQ0wsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDZixDQUFDO1lBRUQsUUFBUSxRQUFRLEVBQUUsQ0FBQztnQkFDakIsS0FBSyxDQUFDO29CQUNKLGdCQUFnQixDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztvQkFDakMsTUFBTTtnQkFDUixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ1AsSUFBSSxrQkFBa0IsS0FBSyxTQUFTLEVBQUUsQ0FBQzt3QkFDckMsU0FBUyxFQUFFLENBQUM7NEJBQ1YsT0FBTyxFQUFFLG9FQUFvRTs0QkFDN0UsSUFBSSxFQUFFLFFBQVE7NEJBQ2QsUUFBUSxFQUFFLElBQUk7eUJBQ2YsQ0FBQyxDQUFDO3dCQUNILE9BQU87b0JBQ1QsQ0FBQztvQkFFRCxJQUNFLGtCQUFrQixLQUFLLFVBQVU7d0JBQ2pDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxpQkFBaUIsR0FBRyw0QkFBNEIsRUFDN0QsQ0FBQzt3QkFDRCxTQUFTLEVBQUUsQ0FBQzs0QkFDVixPQUFPLEVBQUUsK0NBQStDOzRCQUN4RCxJQUFJLEVBQUUsUUFBUTs0QkFDZCxRQUFRLEVBQUUsSUFBSTt5QkFDZixDQUFDLENBQUM7d0JBRUgsT0FBTztvQkFDVCxDQUFDO29CQUVELFNBQVMsRUFBRSxDQUFDO3dCQUNWLE9BQU8sRUFBRSx5Q0FBeUM7d0JBQ2xELElBQUksRUFBRSxTQUFTO3dCQUNmLFFBQVEsRUFBRSxJQUFJO3FCQUNmLENBQUMsQ0FBQztvQkFFSCxrQkFBa0IsR0FBRyxTQUFTLENBQUM7b0JBQy9CLHdCQUF3QixDQUFDLGtCQUFrQixDQUFDLENBQUM7b0JBRTdDLElBQUksV0FBVyxHQUFHLEVBQUUsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFFLENBQUM7b0JBQ3RFLE1BQU0sQ0FBQyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsRUFBRSxXQUFXLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztvQkFDN0QsTUFBTTtnQkFDUixDQUFDO2dCQUNELEtBQUssQ0FBQztvQkFDSixTQUFTLEVBQUUsQ0FBQzt3QkFDVixPQUFPLEVBQUUsNENBQTRDO3dCQUNyRCxJQUFJLEVBQUUsUUFBUTt3QkFDZCxRQUFRLEVBQUUsSUFBSTtxQkFDZixDQUFDLENBQUM7b0JBRUgsTUFBTTtnQkFDUixRQUFRO1lBQ1YsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDLENBQUM7dUdBbElTLGdCQUFnQjsyR0FBaEIsZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNjcmVlbi1zaGFyZS5zZXJ2aWNlLnRzXG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7XG4gIENoZWNrUGVybWlzc2lvblR5cGUsXG4gIENoZWNrU2NyZWVuU2hhcmVQYXJhbWV0ZXJzLFxuICBDaGVja1NjcmVlblNoYXJlVHlwZSxcbiAgU2hvd0FsZXJ0LFxuICBTdG9wU2hhcmVTY3JlZW5QYXJhbWV0ZXJzLFxuICBTdG9wU2hhcmVTY3JlZW5UeXBlLFxufSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENsaWNrU2NyZWVuU2hhcmVQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgQ2hlY2tTY3JlZW5TaGFyZVBhcmFtZXRlcnMsXG4gICAgU3RvcFNoYXJlU2NyZWVuUGFyYW1ldGVycyB7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIHNvY2tldDogU29ja2V0O1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHlvdUFyZUNvSG9zdDogYm9vbGVhbjtcbiAgYWRtaW5SZXN0cmljdFNldHRpbmc6IGJvb2xlYW47XG4gIGF1ZGlvU2V0dGluZzogc3RyaW5nO1xuICB2aWRlb1NldHRpbmc6IHN0cmluZztcbiAgc2NyZWVuc2hhcmVTZXR0aW5nOiBzdHJpbmc7XG4gIGNoYXRTZXR0aW5nOiBzdHJpbmc7XG4gIHNjcmVlbkFjdGlvbjogYm9vbGVhbjtcbiAgc2NyZWVuQWxyZWFkeU9uOiBib29sZWFuO1xuICBzY3JlZW5SZXF1ZXN0U3RhdGU6IHN0cmluZyB8IG51bGw7XG4gIHNjcmVlblJlcXVlc3RUaW1lOiBudW1iZXI7XG4gIGF1ZGlvT25seVJvb206IGJvb2xlYW47XG4gIHVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHM6IG51bWJlcjtcbiAgdXBkYXRlU2NyZWVuUmVxdWVzdFN0YXRlOiAoc3RhdGU6IHN0cmluZyB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZVNjcmVlbkFscmVhZHlPbjogKHN0YXR1czogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgY2hlY2tQZXJtaXNzaW9uOiBDaGVja1Blcm1pc3Npb25UeXBlO1xuICBjaGVja1NjcmVlblNoYXJlOiBDaGVja1NjcmVlblNoYXJlVHlwZTtcbiAgc3RvcFNoYXJlU2NyZWVuOiBTdG9wU2hhcmVTY3JlZW5UeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IENsaWNrU2NyZWVuU2hhcmVQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2xpY2tTY3JlZW5TaGFyZU9wdGlvbnMge1xuICBwYXJhbWV0ZXJzOiBDbGlja1NjcmVlblNoYXJlUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ2xpY2tTY3JlZW5TaGFyZVR5cGUgPSAob3B0aW9uczogQ2xpY2tTY3JlZW5TaGFyZU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogSGFuZGxlcyB0aGUgYWN0aW9uIGZvciB0aGUgc2NyZWVuIGJ1dHRvbiwgaW5jbHVkaW5nIHN0YXJ0aW5nIGFuZCBzdG9wcGluZyBzY3JlZW4gc2hhcmluZy5cbiAqXG4gKiBAcGFyYW0ge0NsaWNrU2NyZWVuU2hhcmVPcHRpb25zfSBvcHRpb25zIC0gT3B0aW9ucyBmb3IgaGFuZGxpbmcgdGhlIHNjcmVlbiBidXR0b24gYWN0aW9uLlxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIHJlcXVpcmVkIGZvciB0aGUgc2NyZWVuIHNoYXJlIGFjdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5zaG93QWxlcnQgLSBGdW5jdGlvbiB0byBzaG93IGFsZXJ0IG1lc3NhZ2VzLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5yb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tIHdoZXJlIHRoZSBzY3JlZW4gc2hhcmUgaXMgdGFraW5nIHBsYWNlLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZW1iZXIgLSBUaGUgbWVtYmVyIGluaXRpYXRpbmcgdGhlIHNjcmVlbiBzaGFyZS5cbiAqIEBwYXJhbSB7U29ja2V0fSBvcHRpb25zLnBhcmFtZXRlcnMuc29ja2V0IC0gVGhlIHNvY2tldCBjb25uZWN0aW9uIHVzZWQgZm9yIGNvbW11bmljYXRpb24uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzbGV2ZWwgLSBUaGUgcGFydGljaXBhbnQncyBsZXZlbC5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnlvdUFyZUNvSG9zdCAtIEluZGljYXRlcyBpZiB0aGUgdXNlciBpcyBhIGNvLWhvc3QuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5hZG1pblJlc3RyaWN0U2V0dGluZyAtIEluZGljYXRlcyBpZiB0aGVyZSBhcmUgcmVzdHJpY3Rpb25zIHNldCBieSB0aGUgYWRtaW4uXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmF1ZGlvU2V0dGluZyAtIEN1cnJlbnQgYXVkaW8gc2V0dGluZy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMudmlkZW9TZXR0aW5nIC0gQ3VycmVudCB2aWRlbyBzZXR0aW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5zY3JlZW5zaGFyZVNldHRpbmcgLSBDdXJyZW50IHNjcmVlbiBzaGFyZSBzZXR0aW5nLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5jaGF0U2V0dGluZyAtIEN1cnJlbnQgY2hhdCBzZXR0aW5nLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuQWN0aW9uIC0gSW5kaWNhdGVzIGlmIGEgc2NyZWVuIGFjdGlvbiBpcyBjdXJyZW50bHkgdGFraW5nIHBsYWNlLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuQWxyZWFkeU9uIC0gSW5kaWNhdGVzIGlmIHNjcmVlbiBzaGFyaW5nIGlzIGN1cnJlbnRseSBhY3RpdmUuXG4gKiBAcGFyYW0ge3N0cmluZyB8IG51bGx9IG9wdGlvbnMucGFyYW1ldGVycy5zY3JlZW5SZXF1ZXN0U3RhdGUgLSBTdGF0ZSBvZiB0aGUgc2NyZWVuIHNoYXJlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNjcmVlblJlcXVlc3RUaW1lIC0gVGltZXN0YW1wIG9mIHdoZW4gdGhlIHNjcmVlbiBzaGFyZSByZXF1ZXN0IHdhcyBtYWRlLlxuICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuYXVkaW9Pbmx5Um9vbSAtIEluZGljYXRlcyBpZiB0aGUgcm9vbSBpcyBhdWRpby1vbmx5LlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzIC0gSW50ZXJ2YWwgdGltZSBmb3IgdXBkYXRpbmcgcmVxdWVzdCBzdGF0ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHNjcmVlbiByZXF1ZXN0IHN0YXRlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNjcmVlbkFscmVhZHlPbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2NyZWVuIHNoYXJpbmcgc3RhdHVzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNoZWNrUGVybWlzc2lvbiAtIEZ1bmN0aW9uIHRvIGNoZWNrIHBlcm1pc3Npb25zIGZvciBzY3JlZW4gc2hhcmluZy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jaGVja1NjcmVlblNoYXJlIC0gRnVuY3Rpb24gdG8gY2hlY2sgYW5kIGluaXRpYXRlIHNjcmVlbiBzaGFyaW5nLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnN0b3BTaGFyZVNjcmVlbiAtIEZ1bmN0aW9uIHRvIHN0b3Agc2NyZWVuIHNoYXJpbmcuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHNjcmVlbiBzaGFyZSBhY3Rpb24gaGFzIGJlZW4gaGFuZGxlZC5cbiAqXG4gKiBAcmVtYXJrc1xuICogVGhpcyBmdW5jdGlvbiBjaGVja3MgdGhlIGN1cnJlbnQgc3RhdHVzIG9mIHNjcmVlbiBzaGFyaW5nIGFuZCBoYW5kbGVzIHRoZSBsb2dpYyBmb3Igc3RhcnRpbmcgb3Igc3RvcHBpbmcgc2NyZWVuIHNoYXJpbmcuXG4gKiBJdCB2YWxpZGF0ZXMgcGVybWlzc2lvbnMgYW5kIHJvb20gc2V0dGluZ3MgYmVmb3JlIGFsbG93aW5nIHNjcmVlbiBzaGFyaW5nIHRvIGJlIGFjdGl2YXRlZCBvciBkZWFjdGl2YXRlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3Qgb3B0aW9uczogQ2xpY2tTY3JlZW5TaGFyZU9wdGlvbnMgPSB7XG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICBzaG93QWxlcnQ6IChhbGVydCkgPT4gY29uc29sZS5sb2coYWxlcnQubWVzc2FnZSksXG4gKiAgICAgcm9vbU5hbWU6ICdteVJvb20nLFxuICogICAgIG1lbWJlcjogJ0pvaG4gRG9lJyxcbiAqICAgICBzb2NrZXQ6IHNvY2tldEluc3RhbmNlLFxuICogICAgIGlzbGV2ZWw6ICcxJyxcbiAqICAgICB5b3VBcmVDb0hvc3Q6IGZhbHNlLFxuICogICAgIGFkbWluUmVzdHJpY3RTZXR0aW5nOiBmYWxzZSxcbiAqICAgICBhdWRpb1NldHRpbmc6ICdvbicsXG4gKiAgICAgdmlkZW9TZXR0aW5nOiAnb24nLFxuICogICAgIHNjcmVlbnNoYXJlU2V0dGluZzogJ29mZicsXG4gKiAgICAgY2hhdFNldHRpbmc6ICdhbGxvdycsXG4gKiAgICAgc2NyZWVuQWN0aW9uOiBmYWxzZSxcbiAqICAgICBzY3JlZW5BbHJlYWR5T246IGZhbHNlLFxuICogICAgIHNjcmVlblJlcXVlc3RTdGF0ZTogbnVsbCxcbiAqICAgICBzY3JlZW5SZXF1ZXN0VGltZTogMCxcbiAqICAgICBhdWRpb09ubHlSb29tOiBmYWxzZSxcbiAqICAgICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzOiAzMCxcbiAqICAgICB1cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGU6IChzdGF0ZSkgPT4gY29uc29sZS5sb2coYFNjcmVlbiByZXF1ZXN0IHN0YXRlOiAke3N0YXRlfWApLFxuICogICAgIHVwZGF0ZVNjcmVlbkFscmVhZHlPbjogKHN0YXR1cykgPT4gY29uc29sZS5sb2coYFNjcmVlbiBhbHJlYWR5IG9uOiAke3N0YXR1c31gKSxcbiAqICAgICBjaGVja1Blcm1pc3Npb246IGNoZWNrUGVybWlzc2lvbkZ1bmN0aW9uLFxuICogICAgIGNoZWNrU2NyZWVuU2hhcmU6IGNoZWNrU2NyZWVuU2hhcmVGdW5jdGlvbixcbiAqICAgICBzdG9wU2hhcmVTY3JlZW46IHN0b3BTaGFyZVNjcmVlbkZ1bmN0aW9uLFxuICogICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IHBhcmFtZXRlcnMsXG4gKiAgIH0sXG4gKiB9O1xuICpcbiAqIGNvbnN0IGNsaWNrU2NyZWVuU2hhcmVTZXJ2aWNlID0gbmV3IENsaWNrU2NyZWVuU2hhcmUoKTtcbiAqIGF3YWl0IGNsaWNrU2NyZWVuU2hhcmVTZXJ2aWNlLmNsaWNrU2NyZWVuU2hhcmUob3B0aW9ucyk7XG4gKiBgYGBcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tTY3JlZW5TaGFyZSB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBhY3Rpb24gZm9yIHRoZSBzY3JlZW4gYnV0dG9uLCBpbmNsdWRpbmcgc3RhcnRpbmcgYW5kIHN0b3BwaW5nIHNjcmVlbiBzaGFyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge0NsaWNrU2NyZWVuU2hhcmVQYXJhbXN9IG9wdGlvbnMgLSBPcHRpb25zIGZvciBoYW5kbGluZyB0aGUgc2NyZWVuIGJ1dHRvbiBhY3Rpb24uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgY2xpY2tTY3JlZW5TaGFyZSA9IGFzeW5jICh7IHBhcmFtZXRlcnMgfTogQ2xpY2tTY3JlZW5TaGFyZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBwYXJhbWV0ZXJzID0geyAuLi5wYXJhbWV0ZXJzLCAuLi5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKSB9O1xuICAgIGxldCB7XG4gICAgICBzaG93QWxlcnQsXG4gICAgICByb29tTmFtZSxcbiAgICAgIG1lbWJlcixcbiAgICAgIHNvY2tldCxcbiAgICAgIGlzbGV2ZWwsXG4gICAgICB5b3VBcmVDb0hvc3QsXG4gICAgICBhZG1pblJlc3RyaWN0U2V0dGluZyxcbiAgICAgIGF1ZGlvU2V0dGluZyxcbiAgICAgIHZpZGVvU2V0dGluZyxcbiAgICAgIHNjcmVlbnNoYXJlU2V0dGluZyxcbiAgICAgIGNoYXRTZXR0aW5nLFxuICAgICAgc2NyZWVuQWN0aW9uLFxuICAgICAgc2NyZWVuQWxyZWFkeU9uLFxuICAgICAgc2NyZWVuUmVxdWVzdFN0YXRlLFxuICAgICAgc2NyZWVuUmVxdWVzdFRpbWUsXG4gICAgICBhdWRpb09ubHlSb29tLFxuICAgICAgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kcyxcbiAgICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZSxcbiAgICAgIHVwZGF0ZVNjcmVlbkFscmVhZHlPbixcbiAgICAgIGNoZWNrUGVybWlzc2lvbixcbiAgICAgIGNoZWNrU2NyZWVuU2hhcmUsXG4gICAgICBzdG9wU2hhcmVTY3JlZW4sXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICBpZiAoYXVkaW9Pbmx5Um9vbSkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IGNhbm5vdCB0dXJuIG9uIHlvdXIgY2FtZXJhIGluIGFuIGF1ZGlvLW9ubHkgZXZlbnQuJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHJvb21OYW1lLnN0YXJ0c1dpdGgoJ2QnKSkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IGNhbm5vdCBzdGFydCBzY3JlZW4gc2hhcmUgaW4gYSBkZW1vIHJvb20uJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHNjcmVlbkFscmVhZHlPbikge1xuICAgICAgc2NyZWVuQWxyZWFkeU9uID0gZmFsc2U7XG4gICAgICB1cGRhdGVTY3JlZW5BbHJlYWR5T24oc2NyZWVuQWxyZWFkeU9uKTtcbiAgICAgIGF3YWl0IHN0b3BTaGFyZVNjcmVlbih7IHBhcmFtZXRlcnMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhZG1pblJlc3RyaWN0U2V0dGluZykge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ1lvdSBjYW5ub3Qgc3RhcnQgc2NyZWVuIHNoYXJlLiBBY2Nlc3MgZGVuaWVkIGJ5IGhvc3QuJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlc3BvbnNlID0gMjtcbiAgICAgIGlmICghc2NyZWVuQWN0aW9uICYmIGlzbGV2ZWwgIT0gJzInICYmICF5b3VBcmVDb0hvc3QpIHtcbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBjaGVja1Blcm1pc3Npb24oe1xuICAgICAgICAgIHBlcm1pc3Npb25UeXBlOiAnc2NyZWVuc2hhcmVTZXR0aW5nJyxcbiAgICAgICAgICBhdWRpb1NldHRpbmcsXG4gICAgICAgICAgdmlkZW9TZXR0aW5nLFxuICAgICAgICAgIHNjcmVlbnNoYXJlU2V0dGluZyxcbiAgICAgICAgICBjaGF0U2V0dGluZyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNwb25zZSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAocmVzcG9uc2UpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGNoZWNrU2NyZWVuU2hhcmUoeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6IHtcbiAgICAgICAgICBpZiAoc2NyZWVuUmVxdWVzdFN0YXRlID09PSAncGVuZGluZycpIHtcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ0EgcmVxdWVzdCBpcyBhbHJlYWR5IHBlbmRpbmcuIFBsZWFzZSB3YWl0IGZvciB0aGUgaG9zdCB0byByZXNwb25kLicsXG4gICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHNjcmVlblJlcXVlc3RTdGF0ZSA9PT0gJ3JlamVjdGVkJyAmJlxuICAgICAgICAgICAgRGF0ZS5ub3coKSAtIHNjcmVlblJlcXVlc3RUaW1lIDwgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kc1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICBtZXNzYWdlOiAnWW91IGNhbm5vdCBzZW5kIGFub3RoZXIgcmVxdWVzdCBhdCB0aGlzIHRpbWUuJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiAnWW91ciByZXF1ZXN0IGhhcyBiZWVuIHNlbnQgdG8gdGhlIGhvc3QuJyxcbiAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgc2NyZWVuUmVxdWVzdFN0YXRlID0gJ3BlbmRpbmcnO1xuICAgICAgICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZShzY3JlZW5SZXF1ZXN0U3RhdGUpO1xuXG4gICAgICAgICAgbGV0IHVzZXJSZXF1ZXN0ID0geyBpZDogc29ja2V0LmlkLCBuYW1lOiBtZW1iZXIsIGljb246ICdmYS1kZXNrdG9wJyB9O1xuICAgICAgICAgIHNvY2tldC5lbWl0KCdwYXJ0aWNpcGFudFJlcXVlc3QnLCB7IHVzZXJSZXF1ZXN0LCByb29tTmFtZSB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgbWVzc2FnZTogJ1lvdSBhcmUgbm90IGFsbG93ZWQgdG8gc3RhcnQgc2NyZWVuIHNoYXJlLicsXG4gICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl19