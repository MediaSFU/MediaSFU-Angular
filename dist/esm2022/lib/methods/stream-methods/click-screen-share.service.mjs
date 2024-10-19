// screen-share.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2stc2NyZWVuLXNoYXJlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9jbGljay1zY3JlZW4tc2hhcmUuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSwwQkFBMEI7QUFDMUIsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFxRDNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0I7Ozs7O09BS0c7SUFDSCxnQkFBZ0IsR0FBRyxLQUFLLEVBQUUsRUFBRSxVQUFVLEVBQTJCLEVBQWlCLEVBQUU7UUFDbEYsVUFBVSxHQUFHLEVBQUUsR0FBRyxVQUFVLEVBQUUsR0FBRyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsRUFBRSxDQUFDO1FBQ3BFLElBQUksRUFDRixTQUFTLEVBQ1QsUUFBUSxFQUNSLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFlBQVksRUFDWixvQkFBb0IsRUFDcEIsWUFBWSxFQUNaLFlBQVksRUFDWixrQkFBa0IsRUFDbEIsV0FBVyxFQUNYLFlBQVksRUFDWixlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLGlCQUFpQixFQUNqQixhQUFhLEVBQ2IsNEJBQTRCLEVBQzVCLHdCQUF3QixFQUN4QixxQkFBcUIsRUFDckIsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixlQUFlLEdBQ2hCLEdBQUcsVUFBVSxDQUFDO1FBRWYsSUFBSSxhQUFhLEVBQUUsQ0FBQztZQUNsQixTQUFTLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQUUsd0RBQXdEO2dCQUNqRSxJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQUMsQ0FBQztZQUNILE9BQU87UUFDVCxDQUFDO1FBRUQsSUFBSSxRQUFRLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENB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QjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBzY3JlZW4tc2hhcmUuc2VydmljZS50c1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQge1xuICBDaGVja1Blcm1pc3Npb25UeXBlLFxuICBDaGVja1NjcmVlblNoYXJlUGFyYW1ldGVycyxcbiAgQ2hlY2tTY3JlZW5TaGFyZVR5cGUsXG4gIFNob3dBbGVydCxcbiAgU3RvcFNoYXJlU2NyZWVuUGFyYW1ldGVycyxcbiAgU3RvcFNoYXJlU2NyZWVuVHlwZSxcbn0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBDbGlja1NjcmVlblNoYXJlUGFyYW1ldGVyc1xuICBleHRlbmRzIENoZWNrU2NyZWVuU2hhcmVQYXJhbWV0ZXJzLFxuICAgIFN0b3BTaGFyZVNjcmVlblBhcmFtZXRlcnMge1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIG1lbWJlcjogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgaXNsZXZlbDogc3RyaW5nO1xuICB5b3VBcmVDb0hvc3Q6IGJvb2xlYW47XG4gIGFkbWluUmVzdHJpY3RTZXR0aW5nOiBib29sZWFuO1xuICBhdWRpb1NldHRpbmc6IHN0cmluZztcbiAgdmlkZW9TZXR0aW5nOiBzdHJpbmc7XG4gIHNjcmVlbnNoYXJlU2V0dGluZzogc3RyaW5nO1xuICBjaGF0U2V0dGluZzogc3RyaW5nO1xuICBzY3JlZW5BY3Rpb246IGJvb2xlYW47XG4gIHNjcmVlbkFscmVhZHlPbjogYm9vbGVhbjtcbiAgc2NyZWVuUmVxdWVzdFN0YXRlOiBzdHJpbmcgfCBudWxsO1xuICBzY3JlZW5SZXF1ZXN0VGltZTogbnVtYmVyO1xuICBhdWRpb09ubHlSb29tOiBib29sZWFuO1xuICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzOiBudW1iZXI7XG4gIHVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZTogKHN0YXRlOiBzdHJpbmcgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVTY3JlZW5BbHJlYWR5T246IChzdGF0dXM6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGNoZWNrUGVybWlzc2lvbjogQ2hlY2tQZXJtaXNzaW9uVHlwZTtcbiAgY2hlY2tTY3JlZW5TaGFyZTogQ2hlY2tTY3JlZW5TaGFyZVR5cGU7XG4gIHN0b3BTaGFyZVNjcmVlbjogU3RvcFNoYXJlU2NyZWVuVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBDbGlja1NjcmVlblNoYXJlUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENsaWNrU2NyZWVuU2hhcmVPcHRpb25zIHtcbiAgcGFyYW1ldGVyczogQ2xpY2tTY3JlZW5TaGFyZVBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENsaWNrU2NyZWVuU2hhcmVUeXBlID0gKG9wdGlvbnM6IENsaWNrU2NyZWVuU2hhcmVPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2xpY2tTY3JlZW5TaGFyZSB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBhY3Rpb24gZm9yIHRoZSBzY3JlZW4gYnV0dG9uLCBpbmNsdWRpbmcgc3RhcnRpbmcgYW5kIHN0b3BwaW5nIHNjcmVlbiBzaGFyaW5nLlxuICAgKlxuICAgKiBAcGFyYW0ge0NsaWNrU2NyZWVuU2hhcmVQYXJhbXN9IG9wdGlvbnMgLSBPcHRpb25zIGZvciBoYW5kbGluZyB0aGUgc2NyZWVuIGJ1dHRvbiBhY3Rpb24uXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fVxuICAgKi9cbiAgY2xpY2tTY3JlZW5TaGFyZSA9IGFzeW5jICh7IHBhcmFtZXRlcnMgfTogQ2xpY2tTY3JlZW5TaGFyZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBwYXJhbWV0ZXJzID0geyAuLi5wYXJhbWV0ZXJzLCAuLi5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKSB9O1xuICAgIGxldCB7XG4gICAgICBzaG93QWxlcnQsXG4gICAgICByb29tTmFtZSxcbiAgICAgIG1lbWJlcixcbiAgICAgIHNvY2tldCxcbiAgICAgIGlzbGV2ZWwsXG4gICAgICB5b3VBcmVDb0hvc3QsXG4gICAgICBhZG1pblJlc3RyaWN0U2V0dGluZyxcbiAgICAgIGF1ZGlvU2V0dGluZyxcbiAgICAgIHZpZGVvU2V0dGluZyxcbiAgICAgIHNjcmVlbnNoYXJlU2V0dGluZyxcbiAgICAgIGNoYXRTZXR0aW5nLFxuICAgICAgc2NyZWVuQWN0aW9uLFxuICAgICAgc2NyZWVuQWxyZWFkeU9uLFxuICAgICAgc2NyZWVuUmVxdWVzdFN0YXRlLFxuICAgICAgc2NyZWVuUmVxdWVzdFRpbWUsXG4gICAgICBhdWRpb09ubHlSb29tLFxuICAgICAgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kcyxcbiAgICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZSxcbiAgICAgIHVwZGF0ZVNjcmVlbkFscmVhZHlPbixcbiAgICAgIGNoZWNrUGVybWlzc2lvbixcbiAgICAgIGNoZWNrU2NyZWVuU2hhcmUsXG4gICAgICBzdG9wU2hhcmVTY3JlZW4sXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICBpZiAoYXVkaW9Pbmx5Um9vbSkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IGNhbm5vdCB0dXJuIG9uIHlvdXIgY2FtZXJhIGluIGFuIGF1ZGlvLW9ubHkgZXZlbnQuJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHJvb21OYW1lLnN0YXJ0c1dpdGgoJ2QnKSkge1xuICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnWW91IGNhbm5vdCBzdGFydCBzY3JlZW4gc2hhcmUgaW4gYSBkZW1vIHJvb20uJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHNjcmVlbkFscmVhZHlPbikge1xuICAgICAgc2NyZWVuQWxyZWFkeU9uID0gZmFsc2U7XG4gICAgICB1cGRhdGVTY3JlZW5BbHJlYWR5T24oc2NyZWVuQWxyZWFkeU9uKTtcbiAgICAgIGF3YWl0IHN0b3BTaGFyZVNjcmVlbih7IHBhcmFtZXRlcnMgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChhZG1pblJlc3RyaWN0U2V0dGluZykge1xuICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ1lvdSBjYW5ub3Qgc3RhcnQgc2NyZWVuIHNoYXJlLiBBY2Nlc3MgZGVuaWVkIGJ5IGhvc3QuJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgbGV0IHJlc3BvbnNlID0gMjtcbiAgICAgIGlmICghc2NyZWVuQWN0aW9uICYmIGlzbGV2ZWwgIT0gJzInICYmICF5b3VBcmVDb0hvc3QpIHtcbiAgICAgICAgcmVzcG9uc2UgPSBhd2FpdCBjaGVja1Blcm1pc3Npb24oe1xuICAgICAgICAgIHBlcm1pc3Npb25UeXBlOiAnc2NyZWVuc2hhcmVTZXR0aW5nJyxcbiAgICAgICAgICBhdWRpb1NldHRpbmcsXG4gICAgICAgICAgdmlkZW9TZXR0aW5nLFxuICAgICAgICAgIHNjcmVlbnNoYXJlU2V0dGluZyxcbiAgICAgICAgICBjaGF0U2V0dGluZyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXNwb25zZSA9IDA7XG4gICAgICB9XG5cbiAgICAgIHN3aXRjaCAocmVzcG9uc2UpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIGNoZWNrU2NyZWVuU2hhcmUoeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6IHtcbiAgICAgICAgICBpZiAoc2NyZWVuUmVxdWVzdFN0YXRlID09PSAncGVuZGluZycpIHtcbiAgICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgICAgbWVzc2FnZTogJ0EgcmVxdWVzdCBpcyBhbHJlYWR5IHBlbmRpbmcuIFBsZWFzZSB3YWl0IGZvciB0aGUgaG9zdCB0byByZXNwb25kLicsXG4gICAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHNjcmVlblJlcXVlc3RTdGF0ZSA9PT0gJ3JlamVjdGVkJyAmJlxuICAgICAgICAgICAgRGF0ZS5ub3coKSAtIHNjcmVlblJlcXVlc3RUaW1lIDwgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kc1xuICAgICAgICAgICkge1xuICAgICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgICBtZXNzYWdlOiAnWW91IGNhbm5vdCBzZW5kIGFub3RoZXIgcmVxdWVzdCBhdCB0aGlzIHRpbWUuJyxcbiAgICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiAnWW91ciByZXF1ZXN0IGhhcyBiZWVuIHNlbnQgdG8gdGhlIGhvc3QuJyxcbiAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgc2NyZWVuUmVxdWVzdFN0YXRlID0gJ3BlbmRpbmcnO1xuICAgICAgICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZShzY3JlZW5SZXF1ZXN0U3RhdGUpO1xuXG4gICAgICAgICAgbGV0IHVzZXJSZXF1ZXN0ID0geyBpZDogc29ja2V0LmlkLCBuYW1lOiBtZW1iZXIsIGljb246ICdmYS1kZXNrdG9wJyB9O1xuICAgICAgICAgIHNvY2tldC5lbWl0KCdwYXJ0aWNpcGFudFJlcXVlc3QnLCB7IHVzZXJSZXF1ZXN0LCByb29tTmFtZSB9KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgbWVzc2FnZTogJ1lvdSBhcmUgbm90IGFsbG93ZWQgdG8gc3RhcnQgc2NyZWVuIHNoYXJlLicsXG4gICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl19