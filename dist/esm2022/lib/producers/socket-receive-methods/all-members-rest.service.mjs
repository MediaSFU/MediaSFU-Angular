import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Manages participant settings and UI updates, including connecting IPs, reordering streams,
 * updating settings, and handling participant display based on various session parameters.
 *
 * @async
 * @param {AllMembersRestOptions} options - Parameters for managing members.
 * @param {Participant[]} options.members - The array of participant objects.
 * @param {Settings} options.settings - The session settings for audio, video, screenshare, and chat.
 * @param {string} [options.coHoste] - The current co-host name.
 * @param {CoHostResponsibility[]} [options.coHostRes] - The responsibilities assigned to the co-host.
 * @param {AllMembersRestParameters} options.parameters - Additional parameters for managing members and UI updates.
 * @param {ConsumeSocket[]} options.consume_sockets - Array of sockets for participant communication.
 * @param {string} options.apiUserName - API username for authentication.
 * @param {string} options.apiKey - API key for authentication.
 * @param {string} options.apiToken - API token for authentication.
 *
 * @returns {Promise<void>} A promise that resolves when updates and changes for members are completed.
 *
 * @example
 * ```typescript
 * const allMembersRestService = new AllMembersRest();
 * await allMembersRestService.allMembersRest({
 *   members: [{ name: 'John', isBanned: false, isSuspended: false, audioID: '123', videoID: '456' }],
 *   settings: ['enabled', 'HD', 'allowed', 'public'],
 *   coHoste: 'Jane',
 *   coHostRes: ['manage-chat'],
 *   parameters: {
 *     participantsAll: [],
 *     participants: [],
 *     dispActiveNames: ['John'],
 *     requestList: [],
 *     coHost: '',
 *     coHostResponsibility: [],
 *     lock_screen: false,
 *     firstAll: false,
 *     membersReceived: false,
 *     roomRecvIPs: [],
 *     deferScreenReceived: false,
 *     screenId: null,
 *     shareScreenStarted: false,
 *     meetingDisplayType: 'grid',
 *     audioSetting: '',
 *     videoSetting: '',
 *     screenshareSetting: '',
 *     chatSetting: '',
 *     updateParticipantsAll: (participantsAll) => console.log(participantsAll),
 *     updateParticipants: (participants) => console.log(participants),
 *     updateRequestList: (requestList) => console.log(requestList),
 *     updateCoHost: (coHost) => console.log(coHost),
 *     updateCoHostResponsibility: (coHostRes) => console.log(coHostRes),
 *     updateFirstAll: (firstAll) => console.log(firstAll),
 *     updateMembersReceived: (membersReceived) => console.log(membersReceived),
 *     updateDeferScreenReceived: (deferScreenReceived) => console.log(deferScreenReceived),
 *     updateShareScreenStarted: (shareScreenStarted) => console.log(shareScreenStarted),
 *     updateAudioSetting: (audioSetting) => console.log(audioSetting),
 *     updateVideoSetting: (videoSetting) => console.log(videoSetting),
 *     updateScreenshareSetting: (screenshareSetting) => console.log(screenshareSetting),
 *     updateChatSetting: (chatSetting) => console.log(chatSetting),
 *     updateConsume_sockets: (sockets) => console.log(sockets),
 *     updateRoomRecvIPs: (ips) => console.log(ips),
 *     updateIsLoadingModalVisible: (visible) => console.log(visible),
 *     onScreenChanges: (params) => console.log('onScreenChanges called with', params),
 *     connectIps: async (params) => [['socket1'], ['ip1']],
 *     sleep: async ({ ms }) => new Promise((resolve) => setTimeout(resolve, ms)),
 *     reorderStreams: async (params) => console.log('reorderStreams called with', params),
 *   },
 *   consume_sockets: [{ socketId: 'abc123' }],
 *   apiUserName: 'testUser',
 *   apiKey: 'apiKeyExample',
 *   apiToken: 'apiTokenExample',
 * });
 * ```
 */
export class AllMembersRest {
    /**
     * Handles various tasks related to participant management and UI updates.
     * @param {Object} params - The parameters passed to the allMembersRest method.
     * @param {Array} params.members - The array of participant members.
     * @param {Array} params.settings - The array of settings.
     * @param {boolean} params.coHoste - The co-host state.
     * @param {boolean} params.coHostRes - The co-host responsibility state.
     * @param {Object} params.parameters - The object containing parameters for the allMembersRest method.
     * @param {Array} params.consume_sockets - The array of consume sockets.
     * @param {string} params.apiUserName - The API username.
     * @param {string} params.apiKey - The API key.
     * @param {string} params.apiToken - The API token.
     * @returns {void} - No return value.
     */
    async allMembersRest({ members, settings, coHoste, coHostRes, parameters, consume_sockets, apiUserName, apiKey, apiToken, }) {
        let { participantsAll, participants, dispActiveNames, requestList, coHost, coHostResponsibility, lock_screen, firstAll, membersReceived, roomRecvIPs, deferScreenReceived, screenId, shareScreenStarted, meetingDisplayType, audioSetting, videoSetting, screenshareSetting, chatSetting, updateParticipantsAll, updateParticipants, updateRequestList, updateCoHost, updateCoHostResponsibility, updateFirstAll, updateMembersReceived, updateDeferScreenReceived, updateShareScreenStarted, updateAudioSetting, updateVideoSetting, updateScreenshareSetting, updateChatSetting, updateConsume_sockets, updateRoomRecvIPs, updateIsLoadingModalVisible, onScreenChanges, connectIps, reorderStreams, sleep, } = parameters;
        // Filter out the participant that isBanned == true or isSuspended == true
        participantsAll = members.map((participant) => ({
            isBanned: participant.isBanned,
            isSuspended: participant.isSuspended,
            name: participant.name,
            audioID: participant.audioID,
            videoID: participant.videoID,
        }));
        updateParticipantsAll(participantsAll);
        participants = members.filter((participant) => !participant.isBanned && !participant.isSuspended);
        updateParticipants(participants);
        // Check if dispActiveNames is not empty and contains the name of the participant that is not in the participants array
        if (dispActiveNames.length > 0) {
            let dispActiveNames_ = dispActiveNames.filter((name) => !participants.map((participant) => participant.name).includes(name));
            if (dispActiveNames_.length > 0 && membersReceived) {
                await reorderStreams({ add: false, screenChanged: true, parameters });
            }
        }
        // Operations to update the UI; make sure we are connected to the server before updating the UI
        if (!membersReceived) {
            if (roomRecvIPs.length < 1) {
                // Keep checking every 0.01s
                let checkIPs = setInterval(async () => {
                    if (roomRecvIPs.length > 0) {
                        clearInterval(checkIPs);
                        if (deferScreenReceived && screenId != null) {
                            shareScreenStarted = true;
                            updateShareScreenStarted(shareScreenStarted);
                        }
                        const [sockets_, ips_] = await connectIps({
                            consume_sockets,
                            remIP: roomRecvIPs,
                            parameters,
                            apiUserName,
                            apiKey,
                            apiToken,
                        });
                        if (sockets_ && ips_) {
                            updateConsume_sockets(sockets_);
                            updateRoomRecvIPs(ips_);
                        }
                        membersReceived = true;
                        updateMembersReceived(membersReceived);
                        await sleep({ ms: 250 });
                        updateIsLoadingModalVisible(false);
                        deferScreenReceived = false;
                        updateDeferScreenReceived(deferScreenReceived);
                    }
                }, 10);
            }
            else {
                const [sockets_, ips_] = await connectIps({
                    consume_sockets,
                    remIP: roomRecvIPs,
                    parameters,
                    apiUserName,
                    apiKey,
                    apiToken,
                });
                if (sockets_ && ips_) {
                    updateConsume_sockets(sockets_);
                    updateRoomRecvIPs(ips_);
                }
                membersReceived = true;
                updateMembersReceived(membersReceived);
                if (deferScreenReceived && screenId != null) {
                    shareScreenStarted = true;
                    updateShareScreenStarted(shareScreenStarted);
                }
                await sleep({ ms: 250 });
                updateIsLoadingModalVisible(false);
                deferScreenReceived = false;
                updateDeferScreenReceived(deferScreenReceived);
            }
        }
        else {
            if (screenId != null) {
                let host = participants.find((participant) => participant.ScreenID == screenId && participant.ScreenOn == true);
                if (deferScreenReceived && screenId != null && host) {
                    shareScreenStarted = true;
                    updateShareScreenStarted(shareScreenStarted);
                }
            }
        }
        // Return requests for only ids that are in the participants array and update the count badge
        let requests = requestList;
        requestList = requests.filter((request) => participants.some((participant) => participant.id == request.id));
        updateRequestList(requestList);
        if (coHoste !== undefined && coHoste !== null) {
            coHost = coHoste;
        }
        if (coHost !== undefined && coHost !== null) {
            updateCoHost(coHost);
        }
        if (coHostRes !== undefined && coHostRes !== null) {
            coHostResponsibility = coHostRes;
        }
        updateCoHostResponsibility(coHostResponsibility);
        try {
            if (!lock_screen && !firstAll) {
                await onScreenChanges({ parameters });
                if (meetingDisplayType != 'all') {
                    firstAll = true;
                    updateFirstAll(firstAll);
                }
            }
        }
        catch (error) {
            console.log('allMembersRest OnScreen', error);
        }
        try {
            if (membersReceived) {
                audioSetting = settings[0];
                videoSetting = settings[1];
                screenshareSetting = settings[2];
                chatSetting = settings[3];
                updateAudioSetting(audioSetting);
                updateVideoSetting(videoSetting);
                updateScreenshareSetting(screenshareSetting);
                updateChatSetting(chatSetting);
            }
        }
        catch (error) {
            console.log('allMembersRest Settings', error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AllMembersRest, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AllMembersRest, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AllMembersRest, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLW1lbWJlcnMtcmVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2FsbC1tZW1iZXJzLXJlc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWlGM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdFRztBQU1ILE1BQU0sT0FBTyxjQUFjO0lBQ3pCOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxLQUFLLENBQUMsY0FBYyxDQUFDLEVBQ25CLE9BQU8sRUFDUCxRQUFRLEVBQ1IsT0FBTyxFQUNQLFNBQVMsRUFDVCxVQUFVLEVBQ1YsZUFBZSxFQUNmLFdBQVcsRUFDWCxNQUFNLEVBQ04sUUFBUSxHQUNjO1FBQ3RCLElBQUksRUFDRixlQUFlLEVBQ2YsWUFBWSxFQUNaLGVBQWUsRUFDZixXQUFXLEVBQ1gsTUFBTSxFQUNOLG9CQUFvQixFQUNwQixXQUFXLEVBQ1gsUUFBUSxFQUNSLGVBQWUsRUFDZixXQUFXLEVBQ1gsbUJBQW1CLEVBQ25CLFFBQVEsRUFDUixrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLFlBQVksRUFDWixZQUFZLEVBQ1osa0JBQWtCLEVBQ2xCLFdBQVcsRUFDWCxxQkFBcUIsRUFDckIsa0JBQWtCLEVBQ2xCLGlCQUFpQixFQUNqQixZQUFZLEVBQ1osMEJBQTBCLEVBQzFCLGNBQWMsRUFDZCxxQkFBcUIsRUFDckIseUJBQXlCLEVBQ3pCLHdCQUF3QixFQUN4QixrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLHdCQUF3QixFQUN4QixpQkFBaUIsRUFDakIscUJBQXFCLEVBQ3JCLGlCQUFpQixF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QUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFFRCxJQUFJLENBQUM7WUFDSCxJQUFJLGVBQWUsRUFBRSxDQUFDO2dCQUNwQixZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixZQUFZLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixrQkFBa0IsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pDLFdBQVcsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRTFCLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDakMsd0JBQXdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztnQkFDN0MsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNILENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUNoRCxDQUFDO0lBQ0gsQ0FBQzt1R0F0TlUsY0FBYzsyR0FBZCxjQUFjLGNBRmIsTUFBTTs7MkZBRVAsY0FBYztrQkFIMUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIFBhcnRpY2lwYW50LFxuICBDb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgT25TY3JlZW5DaGFuZ2VzVHlwZSxcbiAgT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycyxcbiAgUmVxdWVzdCxcbiAgQ29ubmVjdElwc1BhcmFtZXRlcnMsXG4gIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyxcbiAgQ29ubmVjdElwc1R5cGUsXG4gIFNsZWVwVHlwZSxcbiAgUmVvcmRlclN0cmVhbXNUeXBlLFxuICBTZXR0aW5ncyxcbiAgQ29uc3VtZVNvY2tldCxcbn0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgQWxsTWVtYmVyc1Jlc3RQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycyxcbiAgICBDb25uZWN0SXBzUGFyYW1ldGVycyxcbiAgICBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMge1xuICBwYXJ0aWNpcGFudHNBbGw6IFBhcnRpY2lwYW50W107XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgZGlzcEFjdGl2ZU5hbWVzOiBzdHJpbmdbXTtcbiAgcmVxdWVzdExpc3Q6IFJlcXVlc3RbXTtcbiAgY29Ib3N0OiBzdHJpbmc7XG4gIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdO1xuICBsb2NrX3NjcmVlbjogYm9vbGVhbjtcbiAgZmlyc3RBbGw6IGJvb2xlYW47XG4gIG1lbWJlcnNSZWNlaXZlZDogYm9vbGVhbjtcbiAgcm9vbVJlY3ZJUHM6IHN0cmluZ1tdO1xuICBkZWZlclNjcmVlblJlY2VpdmVkOiBib29sZWFuO1xuICBzY3JlZW5JZD86IHN0cmluZztcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBtZWV0aW5nRGlzcGxheVR5cGU6IHN0cmluZztcbiAgYXVkaW9TZXR0aW5nOiBzdHJpbmc7XG4gIHZpZGVvU2V0dGluZzogc3RyaW5nO1xuICBzY3JlZW5zaGFyZVNldHRpbmc6IHN0cmluZztcbiAgY2hhdFNldHRpbmc6IHN0cmluZztcblxuICB1cGRhdGVQYXJ0aWNpcGFudHNBbGw6IChwYXJ0aWNpcGFudHNBbGw6IFBhcnRpY2lwYW50W10pID0+IHZvaWQ7XG4gIHVwZGF0ZVBhcnRpY2lwYW50czogKHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXSkgPT4gdm9pZDtcbiAgdXBkYXRlUmVxdWVzdExpc3Q6IChyZXF1ZXN0TGlzdDogUmVxdWVzdFtdKSA9PiB2b2lkO1xuICB1cGRhdGVDb0hvc3Q6IChjb0hvc3Q6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHk6IChjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXSkgPT4gdm9pZDtcbiAgdXBkYXRlRmlyc3RBbGw6IChmaXJzdEFsbDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlTWVtYmVyc1JlY2VpdmVkOiAobWVtYmVyc1JlY2VpdmVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkOiAoZGVmZXJTY3JlZW5SZWNlaXZlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkOiAoc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVBdWRpb1NldHRpbmc6IChhdWRpb1NldHRpbmc6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlVmlkZW9TZXR0aW5nOiAodmlkZW9TZXR0aW5nOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZzogKHNjcmVlbnNoYXJlU2V0dGluZzogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVDaGF0U2V0dGluZzogKGNoYXRTZXR0aW5nOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUNvbnN1bWVfc29ja2V0czogKGNvbnN1bWVfc29ja2V0czogQ29uc3VtZVNvY2tldFtdKSA9PiB2b2lkO1xuICB1cGRhdGVSb29tUmVjdklQczogKGlwczogc3RyaW5nW10pID0+IHZvaWQ7XG4gIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZTogKHZpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIG9uU2NyZWVuQ2hhbmdlczogT25TY3JlZW5DaGFuZ2VzVHlwZTtcbiAgY29ubmVjdElwczogQ29ubmVjdElwc1R5cGU7XG4gIHNsZWVwOiBTbGVlcFR5cGU7XG4gIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtc1R5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gQWxsTWVtYmVyc1Jlc3RQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWxsTWVtYmVyc1Jlc3RPcHRpb25zIHtcbiAgbWVtYmVyczogUGFydGljaXBhbnRbXTtcbiAgc2V0dGluZ3M6IFNldHRpbmdzO1xuICBjb0hvc3RlPzogc3RyaW5nO1xuICBjb0hvc3RSZXM/OiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdO1xuICBwYXJhbWV0ZXJzOiBBbGxNZW1iZXJzUmVzdFBhcmFtZXRlcnM7XG4gIGNvbnN1bWVfc29ja2V0czogQ29uc3VtZVNvY2tldFtdO1xuICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICBhcGlLZXk6IHN0cmluZztcbiAgYXBpVG9rZW46IHN0cmluZztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQWxsTWVtYmVyc1Jlc3RUeXBlID0gKG9wdGlvbnM6IEFsbE1lbWJlcnNSZXN0T3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBNYW5hZ2VzIHBhcnRpY2lwYW50IHNldHRpbmdzIGFuZCBVSSB1cGRhdGVzLCBpbmNsdWRpbmcgY29ubmVjdGluZyBJUHMsIHJlb3JkZXJpbmcgc3RyZWFtcyxcbiAqIHVwZGF0aW5nIHNldHRpbmdzLCBhbmQgaGFuZGxpbmcgcGFydGljaXBhbnQgZGlzcGxheSBiYXNlZCBvbiB2YXJpb3VzIHNlc3Npb24gcGFyYW1ldGVycy5cbiAqXG4gKiBAYXN5bmNcbiAqIEBwYXJhbSB7QWxsTWVtYmVyc1Jlc3RPcHRpb25zfSBvcHRpb25zIC0gUGFyYW1ldGVycyBmb3IgbWFuYWdpbmcgbWVtYmVycy5cbiAqIEBwYXJhbSB7UGFydGljaXBhbnRbXX0gb3B0aW9ucy5tZW1iZXJzIC0gVGhlIGFycmF5IG9mIHBhcnRpY2lwYW50IG9iamVjdHMuXG4gKiBAcGFyYW0ge1NldHRpbmdzfSBvcHRpb25zLnNldHRpbmdzIC0gVGhlIHNlc3Npb24gc2V0dGluZ3MgZm9yIGF1ZGlvLCB2aWRlbywgc2NyZWVuc2hhcmUsIGFuZCBjaGF0LlxuICogQHBhcmFtIHtzdHJpbmd9IFtvcHRpb25zLmNvSG9zdGVdIC0gVGhlIGN1cnJlbnQgY28taG9zdCBuYW1lLlxuICogQHBhcmFtIHtDb0hvc3RSZXNwb25zaWJpbGl0eVtdfSBbb3B0aW9ucy5jb0hvc3RSZXNdIC0gVGhlIHJlc3BvbnNpYmlsaXRpZXMgYXNzaWduZWQgdG8gdGhlIGNvLWhvc3QuXG4gKiBAcGFyYW0ge0FsbE1lbWJlcnNSZXN0UGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIGZvciBtYW5hZ2luZyBtZW1iZXJzIGFuZCBVSSB1cGRhdGVzLlxuICogQHBhcmFtIHtDb25zdW1lU29ja2V0W119IG9wdGlvbnMuY29uc3VtZV9zb2NrZXRzIC0gQXJyYXkgb2Ygc29ja2V0cyBmb3IgcGFydGljaXBhbnQgY29tbXVuaWNhdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFwaVVzZXJOYW1lIC0gQVBJIHVzZXJuYW1lIGZvciBhdXRoZW50aWNhdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFwaUtleSAtIEFQSSBrZXkgZm9yIGF1dGhlbnRpY2F0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuYXBpVG9rZW4gLSBBUEkgdG9rZW4gZm9yIGF1dGhlbnRpY2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHVwZGF0ZXMgYW5kIGNoYW5nZXMgZm9yIG1lbWJlcnMgYXJlIGNvbXBsZXRlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3QgYWxsTWVtYmVyc1Jlc3RTZXJ2aWNlID0gbmV3IEFsbE1lbWJlcnNSZXN0KCk7XG4gKiBhd2FpdCBhbGxNZW1iZXJzUmVzdFNlcnZpY2UuYWxsTWVtYmVyc1Jlc3Qoe1xuICogICBtZW1iZXJzOiBbeyBuYW1lOiAnSm9obicsIGlzQmFubmVkOiBmYWxzZSwgaXNTdXNwZW5kZWQ6IGZhbHNlLCBhdWRpb0lEOiAnMTIzJywgdmlkZW9JRDogJzQ1NicgfV0sXG4gKiAgIHNldHRpbmdzOiBbJ2VuYWJsZWQnLCAnSEQnLCAnYWxsb3dlZCcsICdwdWJsaWMnXSxcbiAqICAgY29Ib3N0ZTogJ0phbmUnLFxuICogICBjb0hvc3RSZXM6IFsnbWFuYWdlLWNoYXQnXSxcbiAqICAgcGFyYW1ldGVyczoge1xuICogICAgIHBhcnRpY2lwYW50c0FsbDogW10sXG4gKiAgICAgcGFydGljaXBhbnRzOiBbXSxcbiAqICAgICBkaXNwQWN0aXZlTmFtZXM6IFsnSm9obiddLFxuICogICAgIHJlcXVlc3RMaXN0OiBbXSxcbiAqICAgICBjb0hvc3Q6ICcnLFxuICogICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBbXSxcbiAqICAgICBsb2NrX3NjcmVlbjogZmFsc2UsXG4gKiAgICAgZmlyc3RBbGw6IGZhbHNlLFxuICogICAgIG1lbWJlcnNSZWNlaXZlZDogZmFsc2UsXG4gKiAgICAgcm9vbVJlY3ZJUHM6IFtdLFxuICogICAgIGRlZmVyU2NyZWVuUmVjZWl2ZWQ6IGZhbHNlLFxuICogICAgIHNjcmVlbklkOiBudWxsLFxuICogICAgIHNoYXJlU2NyZWVuU3RhcnRlZDogZmFsc2UsXG4gKiAgICAgbWVldGluZ0Rpc3BsYXlUeXBlOiAnZ3JpZCcsXG4gKiAgICAgYXVkaW9TZXR0aW5nOiAnJyxcbiAqICAgICB2aWRlb1NldHRpbmc6ICcnLFxuICogICAgIHNjcmVlbnNoYXJlU2V0dGluZzogJycsXG4gKiAgICAgY2hhdFNldHRpbmc6ICcnLFxuICogICAgIHVwZGF0ZVBhcnRpY2lwYW50c0FsbDogKHBhcnRpY2lwYW50c0FsbCkgPT4gY29uc29sZS5sb2cocGFydGljaXBhbnRzQWxsKSxcbiAqICAgICB1cGRhdGVQYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHMpID0+IGNvbnNvbGUubG9nKHBhcnRpY2lwYW50cyksXG4gKiAgICAgdXBkYXRlUmVxdWVzdExpc3Q6IChyZXF1ZXN0TGlzdCkgPT4gY29uc29sZS5sb2cocmVxdWVzdExpc3QpLFxuICogICAgIHVwZGF0ZUNvSG9zdDogKGNvSG9zdCkgPT4gY29uc29sZS5sb2coY29Ib3N0KSxcbiAqICAgICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eTogKGNvSG9zdFJlcykgPT4gY29uc29sZS5sb2coY29Ib3N0UmVzKSxcbiAqICAgICB1cGRhdGVGaXJzdEFsbDogKGZpcnN0QWxsKSA9PiBjb25zb2xlLmxvZyhmaXJzdEFsbCksXG4gKiAgICAgdXBkYXRlTWVtYmVyc1JlY2VpdmVkOiAobWVtYmVyc1JlY2VpdmVkKSA9PiBjb25zb2xlLmxvZyhtZW1iZXJzUmVjZWl2ZWQpLFxuICogICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQ6IChkZWZlclNjcmVlblJlY2VpdmVkKSA9PiBjb25zb2xlLmxvZyhkZWZlclNjcmVlblJlY2VpdmVkKSxcbiAqICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQ6IChzaGFyZVNjcmVlblN0YXJ0ZWQpID0+IGNvbnNvbGUubG9nKHNoYXJlU2NyZWVuU3RhcnRlZCksXG4gKiAgICAgdXBkYXRlQXVkaW9TZXR0aW5nOiAoYXVkaW9TZXR0aW5nKSA9PiBjb25zb2xlLmxvZyhhdWRpb1NldHRpbmcpLFxuICogICAgIHVwZGF0ZVZpZGVvU2V0dGluZzogKHZpZGVvU2V0dGluZykgPT4gY29uc29sZS5sb2codmlkZW9TZXR0aW5nKSxcbiAqICAgICB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmc6IChzY3JlZW5zaGFyZVNldHRpbmcpID0+IGNvbnNvbGUubG9nKHNjcmVlbnNoYXJlU2V0dGluZyksXG4gKiAgICAgdXBkYXRlQ2hhdFNldHRpbmc6IChjaGF0U2V0dGluZykgPT4gY29uc29sZS5sb2coY2hhdFNldHRpbmcpLFxuICogICAgIHVwZGF0ZUNvbnN1bWVfc29ja2V0czogKHNvY2tldHMpID0+IGNvbnNvbGUubG9nKHNvY2tldHMpLFxuICogICAgIHVwZGF0ZVJvb21SZWN2SVBzOiAoaXBzKSA9PiBjb25zb2xlLmxvZyhpcHMpLFxuICogICAgIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZTogKHZpc2libGUpID0+IGNvbnNvbGUubG9nKHZpc2libGUpLFxuICogICAgIG9uU2NyZWVuQ2hhbmdlczogKHBhcmFtcykgPT4gY29uc29sZS5sb2coJ29uU2NyZWVuQ2hhbmdlcyBjYWxsZWQgd2l0aCcsIHBhcmFtcyksXG4gKiAgICAgY29ubmVjdElwczogYXN5bmMgKHBhcmFtcykgPT4gW1snc29ja2V0MSddLCBbJ2lwMSddXSxcbiAqICAgICBzbGVlcDogYXN5bmMgKHsgbXMgfSkgPT4gbmV3IFByb21pc2UoKHJlc29sdmUpID0+IHNldFRpbWVvdXQocmVzb2x2ZSwgbXMpKSxcbiAqICAgICByZW9yZGVyU3RyZWFtczogYXN5bmMgKHBhcmFtcykgPT4gY29uc29sZS5sb2coJ3Jlb3JkZXJTdHJlYW1zIGNhbGxlZCB3aXRoJywgcGFyYW1zKSxcbiAqICAgfSxcbiAqICAgY29uc3VtZV9zb2NrZXRzOiBbeyBzb2NrZXRJZDogJ2FiYzEyMycgfV0sXG4gKiAgIGFwaVVzZXJOYW1lOiAndGVzdFVzZXInLFxuICogICBhcGlLZXk6ICdhcGlLZXlFeGFtcGxlJyxcbiAqICAgYXBpVG9rZW46ICdhcGlUb2tlbkV4YW1wbGUnLFxuICogfSk7XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBBbGxNZW1iZXJzUmVzdCB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHZhcmlvdXMgdGFza3MgcmVsYXRlZCB0byBwYXJ0aWNpcGFudCBtYW5hZ2VtZW50IGFuZCBVSSB1cGRhdGVzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgcGFzc2VkIHRvIHRoZSBhbGxNZW1iZXJzUmVzdCBtZXRob2QuXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcy5tZW1iZXJzIC0gVGhlIGFycmF5IG9mIHBhcnRpY2lwYW50IG1lbWJlcnMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcy5zZXR0aW5ncyAtIFRoZSBhcnJheSBvZiBzZXR0aW5ncy5cbiAgICogQHBhcmFtIHtib29sZWFufSBwYXJhbXMuY29Ib3N0ZSAtIFRoZSBjby1ob3N0IHN0YXRlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtcy5jb0hvc3RSZXMgLSBUaGUgY28taG9zdCByZXNwb25zaWJpbGl0eSBzdGF0ZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcy5wYXJhbWV0ZXJzIC0gVGhlIG9iamVjdCBjb250YWluaW5nIHBhcmFtZXRlcnMgZm9yIHRoZSBhbGxNZW1iZXJzUmVzdCBtZXRob2QuXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcy5jb25zdW1lX3NvY2tldHMgLSBUaGUgYXJyYXkgb2YgY29uc3VtZSBzb2NrZXRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmFwaVVzZXJOYW1lIC0gVGhlIEFQSSB1c2VybmFtZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5hcGlLZXkgLSBUaGUgQVBJIGtleS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5hcGlUb2tlbiAtIFRoZSBBUEkgdG9rZW4uXG4gICAqIEByZXR1cm5zIHt2b2lkfSAtIE5vIHJldHVybiB2YWx1ZS5cbiAgICovXG4gIGFzeW5jIGFsbE1lbWJlcnNSZXN0KHtcbiAgICBtZW1iZXJzLFxuICAgIHNldHRpbmdzLFxuICAgIGNvSG9zdGUsXG4gICAgY29Ib3N0UmVzLFxuICAgIHBhcmFtZXRlcnMsXG4gICAgY29uc3VtZV9zb2NrZXRzLFxuICAgIGFwaVVzZXJOYW1lLFxuICAgIGFwaUtleSxcbiAgICBhcGlUb2tlbixcbiAgfTogQWxsTWVtYmVyc1Jlc3RPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHtcbiAgICAgIHBhcnRpY2lwYW50c0FsbCxcbiAgICAgIHBhcnRpY2lwYW50cyxcbiAgICAgIGRpc3BBY3RpdmVOYW1lcyxcbiAgICAgIHJlcXVlc3RMaXN0LFxuICAgICAgY29Ib3N0LFxuICAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHksXG4gICAgICBsb2NrX3NjcmVlbixcbiAgICAgIGZpcnN0QWxsLFxuICAgICAgbWVtYmVyc1JlY2VpdmVkLFxuICAgICAgcm9vbVJlY3ZJUHMsXG4gICAgICBkZWZlclNjcmVlblJlY2VpdmVkLFxuICAgICAgc2NyZWVuSWQsXG4gICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICBtZWV0aW5nRGlzcGxheVR5cGUsXG4gICAgICBhdWRpb1NldHRpbmcsXG4gICAgICB2aWRlb1NldHRpbmcsXG4gICAgICBzY3JlZW5zaGFyZVNldHRpbmcsXG4gICAgICBjaGF0U2V0dGluZyxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50c0FsbCxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50cyxcbiAgICAgIHVwZGF0ZVJlcXVlc3RMaXN0LFxuICAgICAgdXBkYXRlQ29Ib3N0LFxuICAgICAgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHksXG4gICAgICB1cGRhdGVGaXJzdEFsbCxcbiAgICAgIHVwZGF0ZU1lbWJlcnNSZWNlaXZlZCxcbiAgICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQsXG4gICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICB1cGRhdGVBdWRpb1NldHRpbmcsXG4gICAgICB1cGRhdGVWaWRlb1NldHRpbmcsXG4gICAgICB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcsXG4gICAgICB1cGRhdGVDaGF0U2V0dGluZyxcbiAgICAgIHVwZGF0ZUNvbnN1bWVfc29ja2V0cyxcbiAgICAgIHVwZGF0ZVJvb21SZWN2SVBzLFxuICAgICAgdXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlLFxuXG4gICAgICBvblNjcmVlbkNoYW5nZXMsXG4gICAgICBjb25uZWN0SXBzLFxuICAgICAgcmVvcmRlclN0cmVhbXMsXG4gICAgICBzbGVlcCxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIC8vIEZpbHRlciBvdXQgdGhlIHBhcnRpY2lwYW50IHRoYXQgaXNCYW5uZWQgPT0gdHJ1ZSBvciBpc1N1c3BlbmRlZCA9PSB0cnVlXG4gICAgcGFydGljaXBhbnRzQWxsID0gbWVtYmVycy5tYXAoKHBhcnRpY2lwYW50KSA9PiAoe1xuICAgICAgaXNCYW5uZWQ6IHBhcnRpY2lwYW50LmlzQmFubmVkLFxuICAgICAgaXNTdXNwZW5kZWQ6IHBhcnRpY2lwYW50LmlzU3VzcGVuZGVkLFxuICAgICAgbmFtZTogcGFydGljaXBhbnQubmFtZSxcbiAgICAgIGF1ZGlvSUQ6IHBhcnRpY2lwYW50LmF1ZGlvSUQsXG4gICAgICB2aWRlb0lEOiBwYXJ0aWNpcGFudC52aWRlb0lELFxuICAgIH0pKTtcbiAgICB1cGRhdGVQYXJ0aWNpcGFudHNBbGwocGFydGljaXBhbnRzQWxsKTtcblxuICAgIHBhcnRpY2lwYW50cyA9IG1lbWJlcnMuZmlsdGVyKFxuICAgICAgKHBhcnRpY2lwYW50KSA9PiAhcGFydGljaXBhbnQuaXNCYW5uZWQgJiYgIXBhcnRpY2lwYW50LmlzU3VzcGVuZGVkLFxuICAgICk7XG4gICAgdXBkYXRlUGFydGljaXBhbnRzKHBhcnRpY2lwYW50cyk7XG5cbiAgICAvLyBDaGVjayBpZiBkaXNwQWN0aXZlTmFtZXMgaXMgbm90IGVtcHR5IGFuZCBjb250YWlucyB0aGUgbmFtZSBvZiB0aGUgcGFydGljaXBhbnQgdGhhdCBpcyBub3QgaW4gdGhlIHBhcnRpY2lwYW50cyBhcnJheVxuICAgIGlmIChkaXNwQWN0aXZlTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGRpc3BBY3RpdmVOYW1lc18gPSBkaXNwQWN0aXZlTmFtZXMuZmlsdGVyKFxuICAgICAgICAobmFtZTogc3RyaW5nKSA9PiAhcGFydGljaXBhbnRzLm1hcCgocGFydGljaXBhbnQ6IGFueSkgPT4gcGFydGljaXBhbnQubmFtZSkuaW5jbHVkZXMobmFtZSksXG4gICAgICApO1xuICAgICAgaWYgKGRpc3BBY3RpdmVOYW1lc18ubGVuZ3RoID4gMCAmJiBtZW1iZXJzUmVjZWl2ZWQpIHtcbiAgICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoeyBhZGQ6IGZhbHNlLCBzY3JlZW5DaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE9wZXJhdGlvbnMgdG8gdXBkYXRlIHRoZSBVSTsgbWFrZSBzdXJlIHdlIGFyZSBjb25uZWN0ZWQgdG8gdGhlIHNlcnZlciBiZWZvcmUgdXBkYXRpbmcgdGhlIFVJXG4gICAgaWYgKCFtZW1iZXJzUmVjZWl2ZWQpIHtcbiAgICAgIGlmIChyb29tUmVjdklQcy5sZW5ndGggPCAxKSB7XG4gICAgICAgIC8vIEtlZXAgY2hlY2tpbmcgZXZlcnkgMC4wMXNcbiAgICAgICAgbGV0IGNoZWNrSVBzID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGlmIChyb29tUmVjdklQcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGNoZWNrSVBzKTtcblxuICAgICAgICAgICAgaWYgKGRlZmVyU2NyZWVuUmVjZWl2ZWQgJiYgc2NyZWVuSWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQoc2hhcmVTY3JlZW5TdGFydGVkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgW3NvY2tldHNfLCBpcHNfXSA9IGF3YWl0IGNvbm5lY3RJcHMoe1xuICAgICAgICAgICAgICBjb25zdW1lX3NvY2tldHMsXG4gICAgICAgICAgICAgIHJlbUlQOiByb29tUmVjdklQcyxcbiAgICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgYXBpVXNlck5hbWUsXG4gICAgICAgICAgICAgIGFwaUtleSxcbiAgICAgICAgICAgICAgYXBpVG9rZW4sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHNvY2tldHNfICYmIGlwc18pIHtcbiAgICAgICAgICAgICAgdXBkYXRlQ29uc3VtZV9zb2NrZXRzKHNvY2tldHNfKTtcbiAgICAgICAgICAgICAgdXBkYXRlUm9vbVJlY3ZJUHMoaXBzXyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lbWJlcnNSZWNlaXZlZCA9IHRydWU7XG4gICAgICAgICAgICB1cGRhdGVNZW1iZXJzUmVjZWl2ZWQobWVtYmVyc1JlY2VpdmVkKTtcblxuICAgICAgICAgICAgYXdhaXQgc2xlZXAoeyBtczogMjUwIH0pO1xuICAgICAgICAgICAgdXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIGRlZmVyU2NyZWVuUmVjZWl2ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQoZGVmZXJTY3JlZW5SZWNlaXZlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBbc29ja2V0c18sIGlwc19dID0gYXdhaXQgY29ubmVjdElwcyh7XG4gICAgICAgICAgY29uc3VtZV9zb2NrZXRzLFxuICAgICAgICAgIHJlbUlQOiByb29tUmVjdklQcyxcbiAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgIGFwaVVzZXJOYW1lLFxuICAgICAgICAgIGFwaUtleSxcbiAgICAgICAgICBhcGlUb2tlbixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNvY2tldHNfICYmIGlwc18pIHtcbiAgICAgICAgICB1cGRhdGVDb25zdW1lX3NvY2tldHMoc29ja2V0c18pO1xuICAgICAgICAgIHVwZGF0ZVJvb21SZWN2SVBzKGlwc18pO1xuICAgICAgICB9XG4gICAgICAgIG1lbWJlcnNSZWNlaXZlZCA9IHRydWU7XG4gICAgICAgIHVwZGF0ZU1lbWJlcnNSZWNlaXZlZChtZW1iZXJzUmVjZWl2ZWQpO1xuXG4gICAgICAgIGlmIChkZWZlclNjcmVlblJlY2VpdmVkICYmIHNjcmVlbklkICE9IG51bGwpIHtcbiAgICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZChzaGFyZVNjcmVlblN0YXJ0ZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgc2xlZXAoeyBtczogMjUwIH0pO1xuICAgICAgICB1cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgICAgICBkZWZlclNjcmVlblJlY2VpdmVkID0gZmFsc2U7XG4gICAgICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQoZGVmZXJTY3JlZW5SZWNlaXZlZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzY3JlZW5JZCAhPSBudWxsKSB7XG4gICAgICAgIGxldCBob3N0ID0gcGFydGljaXBhbnRzLmZpbmQoXG4gICAgICAgICAgKHBhcnRpY2lwYW50OiBhbnkpID0+IHBhcnRpY2lwYW50LlNjcmVlbklEID09IHNjcmVlbklkICYmIHBhcnRpY2lwYW50LlNjcmVlbk9uID09IHRydWUsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChkZWZlclNjcmVlblJlY2VpdmVkICYmIHNjcmVlbklkICE9IG51bGwgJiYgaG9zdCkge1xuICAgICAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkKHNoYXJlU2NyZWVuU3RhcnRlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gcmVxdWVzdHMgZm9yIG9ubHkgaWRzIHRoYXQgYXJlIGluIHRoZSBwYXJ0aWNpcGFudHMgYXJyYXkgYW5kIHVwZGF0ZSB0aGUgY291bnQgYmFkZ2VcbiAgICBsZXQgcmVxdWVzdHMgPSByZXF1ZXN0TGlzdDtcbiAgICByZXF1ZXN0TGlzdCA9IHJlcXVlc3RzLmZpbHRlcigocmVxdWVzdDogYW55KSA9PlxuICAgICAgcGFydGljaXBhbnRzLnNvbWUoKHBhcnRpY2lwYW50OiBhbnkpID0+IHBhcnRpY2lwYW50LmlkID09IHJlcXVlc3QuaWQpLFxuICAgICk7XG4gICAgdXBkYXRlUmVxdWVzdExpc3QocmVxdWVzdExpc3QpO1xuXG4gICAgaWYgKGNvSG9zdGUgIT09IHVuZGVmaW5lZCAmJiBjb0hvc3RlICE9PSBudWxsKSB7XG4gICAgICBjb0hvc3QgPSBjb0hvc3RlO1xuICAgIH1cbiAgICBpZiAoY29Ib3N0ICE9PSB1bmRlZmluZWQgJiYgY29Ib3N0ICE9PSBudWxsKSB7XG4gICAgICB1cGRhdGVDb0hvc3QoY29Ib3N0KTtcbiAgICB9XG4gICAgaWYgKGNvSG9zdFJlcyAhPT0gdW5kZWZpbmVkICYmIGNvSG9zdFJlcyAhPT0gbnVsbCkge1xuICAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHkgPSBjb0hvc3RSZXM7XG4gICAgfVxuICAgIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5KGNvSG9zdFJlc3BvbnNpYmlsaXR5KTtcblxuICAgIHRyeSB7XG4gICAgICBpZiAoIWxvY2tfc2NyZWVuICYmICFmaXJzdEFsbCkge1xuICAgICAgICBhd2FpdCBvblNjcmVlbkNoYW5nZXMoeyBwYXJhbWV0ZXJzIH0pO1xuXG4gICAgICAgIGlmIChtZWV0aW5nRGlzcGxheVR5cGUgIT0gJ2FsbCcpIHtcbiAgICAgICAgICBmaXJzdEFsbCA9IHRydWU7XG4gICAgICAgICAgdXBkYXRlRmlyc3RBbGwoZmlyc3RBbGwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdhbGxNZW1iZXJzUmVzdCBPblNjcmVlbicsIGVycm9yKTtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgaWYgKG1lbWJlcnNSZWNlaXZlZCkge1xuICAgICAgICBhdWRpb1NldHRpbmcgPSBzZXR0aW5nc1swXTtcbiAgICAgICAgdmlkZW9TZXR0aW5nID0gc2V0dGluZ3NbMV07XG4gICAgICAgIHNjcmVlbnNoYXJlU2V0dGluZyA9IHNldHRpbmdzWzJdO1xuICAgICAgICBjaGF0U2V0dGluZyA9IHNldHRpbmdzWzNdO1xuXG4gICAgICAgIHVwZGF0ZUF1ZGlvU2V0dGluZyhhdWRpb1NldHRpbmcpO1xuICAgICAgICB1cGRhdGVWaWRlb1NldHRpbmcodmlkZW9TZXR0aW5nKTtcbiAgICAgICAgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nKHNjcmVlbnNoYXJlU2V0dGluZyk7XG4gICAgICAgIHVwZGF0ZUNoYXRTZXR0aW5nKGNoYXRTZXR0aW5nKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ2FsbE1lbWJlcnNSZXN0IFNldHRpbmdzJywgZXJyb3IpO1xuICAgIH1cbiAgfVxufVxuIl19