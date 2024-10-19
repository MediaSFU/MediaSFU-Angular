import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLW1lbWJlcnMtcmVzdC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL2FsbC1tZW1iZXJzLXJlc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQW9GM0MsTUFBTSxPQUFPLGNBQWM7SUFDekI7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILEtBQUssQ0FBQyxjQUFjLENBQUMsRUFDbkIsT0FBTyxFQUNQLFFBQVEsRUFDUixPQUFPLEVBQ1AsU0FBUyxFQUNULFVBQVUsRUFDVixlQUFlLEVBQ2YsV0FBVyxFQUNYLE1BQU0sRUFDTixRQUFRLEdBQ2M7UUFDdEIsSUFBSSxFQUNGLGVBQWUsRUFDZixZQUFZLEVBQ1osZUFBZSxFQUNmLFdBQVcsRUFDWCxNQUFNLEVBQ04sb0JBQW9CLEVBQ3BCLFdBQVcsRUFDWCxRQUFRLEVBQ1IsZUFBZSxFQUNmLFdBQVcsRUFDWCxtQkFBbUIsRUFDbkIsUUFBUSxFQUNSLGtCQUFrQixFQUNsQixrQkFBa0IsRUFDbEIsWUFBWSxFQUNaLFlBQVksRUFDWixrQkFBa0IsRUFDbEIsV0FBVyxFQUNYLHFCQUFxQixFQUNyQixrQkFBa0IsRUFDbEIsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWiwwQkFBMEIsRUFDMUIsY0FBYyxFQUNkLHFCQUFxQixFQUNyQix5QkFBeUIsRUFDekIsd0JBQXdCLEVBQ3hCLGtCQUFrQixFQUNsQixrQkFBa0IsRUFDbEIsd0JBQXdCLEVBQ3hCLGlCQUFpQixFQUNqQixxQkFBcUIsRUFDckIsaUJBQWlCLEVBQ2pCLDJCQUEyQixFQUUzQixlQUFlLEVBQ2YsVUFBVSxFQUNWLGNBQWMsRUFDZCxLQUFLLEdBQ04sR0FBRyxVQUFVLENBQUM7UUFFZiwwRUFB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QUFFLENBQUM7Z0JBQ3BCLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLFlBQVksR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLGtCQUFrQixHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakMsV0FBVyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFMUIsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ2pDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO2dCQUNqQyx3QkFBd0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO2dCQUM3QyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNqQyxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2hELENBQUM7SUFDSCxDQUFDO3VHQXROVSxjQUFjOzJHQUFkLGNBQWMsY0FGYixNQUFNOzsyRkFFUCxjQUFjO2tCQUgxQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgUGFydGljaXBhbnQsXG4gIENvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICBPblNjcmVlbkNoYW5nZXNUeXBlLFxuICBPblNjcmVlbkNoYW5nZXNQYXJhbWV0ZXJzLFxuICBSZXF1ZXN0LFxuICBDb25uZWN0SXBzUGFyYW1ldGVycyxcbiAgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICBDb25uZWN0SXBzVHlwZSxcbiAgU2xlZXBUeXBlLFxuICBSZW9yZGVyU3RyZWFtc1R5cGUsXG4gIFNldHRpbmdzLFxuICBDb25zdW1lU29ja2V0LFxufSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBBbGxNZW1iZXJzUmVzdFBhcmFtZXRlcnNcbiAgZXh0ZW5kcyBPblNjcmVlbkNoYW5nZXNQYXJhbWV0ZXJzLFxuICAgIENvbm5lY3RJcHNQYXJhbWV0ZXJzLFxuICAgIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyB7XG4gIHBhcnRpY2lwYW50c0FsbDogUGFydGljaXBhbnRbXTtcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBkaXNwQWN0aXZlTmFtZXM6IHN0cmluZ1tdO1xuICByZXF1ZXN0TGlzdDogUmVxdWVzdFtdO1xuICBjb0hvc3Q6IHN0cmluZztcbiAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IENvSG9zdFJlc3BvbnNpYmlsaXR5W107XG4gIGxvY2tfc2NyZWVuOiBib29sZWFuO1xuICBmaXJzdEFsbDogYm9vbGVhbjtcbiAgbWVtYmVyc1JlY2VpdmVkOiBib29sZWFuO1xuICByb29tUmVjdklQczogc3RyaW5nW107XG4gIGRlZmVyU2NyZWVuUmVjZWl2ZWQ6IGJvb2xlYW47XG4gIHNjcmVlbklkPzogc3RyaW5nO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIG1lZXRpbmdEaXNwbGF5VHlwZTogc3RyaW5nO1xuICBhdWRpb1NldHRpbmc6IHN0cmluZztcbiAgdmlkZW9TZXR0aW5nOiBzdHJpbmc7XG4gIHNjcmVlbnNoYXJlU2V0dGluZzogc3RyaW5nO1xuICBjaGF0U2V0dGluZzogc3RyaW5nO1xuXG4gIHVwZGF0ZVBhcnRpY2lwYW50c0FsbDogKHBhcnRpY2lwYW50c0FsbDogUGFydGljaXBhbnRbXSkgPT4gdm9pZDtcbiAgdXBkYXRlUGFydGljaXBhbnRzOiAocGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xuICB1cGRhdGVSZXF1ZXN0TGlzdDogKHJlcXVlc3RMaXN0OiBSZXF1ZXN0W10pID0+IHZvaWQ7XG4gIHVwZGF0ZUNvSG9zdDogKGNvSG9zdDogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eTogKGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdKSA9PiB2b2lkO1xuICB1cGRhdGVGaXJzdEFsbDogKGZpcnN0QWxsOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVNZW1iZXJzUmVjZWl2ZWQ6IChtZW1iZXJzUmVjZWl2ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQ6IChkZWZlclNjcmVlblJlY2VpdmVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQ6IChzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUF1ZGlvU2V0dGluZzogKGF1ZGlvU2V0dGluZzogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVWaWRlb1NldHRpbmc6ICh2aWRlb1NldHRpbmc6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nOiAoc2NyZWVuc2hhcmVTZXR0aW5nOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUNoYXRTZXR0aW5nOiAoY2hhdFNldHRpbmc6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlQ29uc3VtZV9zb2NrZXRzOiAoY29uc3VtZV9zb2NrZXRzOiBDb25zdW1lU29ja2V0W10pID0+IHZvaWQ7XG4gIHVwZGF0ZVJvb21SZWN2SVBzOiAoaXBzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgdXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlOiAodmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgb25TY3JlZW5DaGFuZ2VzOiBPblNjcmVlbkNoYW5nZXNUeXBlO1xuICBjb25uZWN0SXBzOiBDb25uZWN0SXBzVHlwZTtcbiAgc2xlZXA6IFNsZWVwVHlwZTtcbiAgcmVvcmRlclN0cmVhbXM6IFJlb3JkZXJTdHJlYW1zVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBBbGxNZW1iZXJzUmVzdFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBbGxNZW1iZXJzUmVzdE9wdGlvbnMge1xuICBtZW1iZXJzOiBQYXJ0aWNpcGFudFtdO1xuICBzZXR0aW5nczogU2V0dGluZ3M7XG4gIGNvSG9zdGU/OiBzdHJpbmc7XG4gIGNvSG9zdFJlcz86IENvSG9zdFJlc3BvbnNpYmlsaXR5W107XG4gIHBhcmFtZXRlcnM6IEFsbE1lbWJlcnNSZXN0UGFyYW1ldGVycztcbiAgY29uc3VtZV9zb2NrZXRzOiBDb25zdW1lU29ja2V0W107XG4gIGFwaVVzZXJOYW1lOiBzdHJpbmc7XG4gIGFwaUtleTogc3RyaW5nO1xuICBhcGlUb2tlbjogc3RyaW5nO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBBbGxNZW1iZXJzUmVzdFR5cGUgPSAob3B0aW9uczogQWxsTWVtYmVyc1Jlc3RPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQWxsTWVtYmVyc1Jlc3Qge1xuICAvKipcbiAgICogSGFuZGxlcyB2YXJpb3VzIHRhc2tzIHJlbGF0ZWQgdG8gcGFydGljaXBhbnQgbWFuYWdlbWVudCBhbmQgVUkgdXBkYXRlcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIFRoZSBwYXJhbWV0ZXJzIHBhc3NlZCB0byB0aGUgYWxsTWVtYmVyc1Jlc3QgbWV0aG9kLlxuICAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMubWVtYmVycyAtIFRoZSBhcnJheSBvZiBwYXJ0aWNpcGFudCBtZW1iZXJzLlxuICAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMuc2V0dGluZ3MgLSBUaGUgYXJyYXkgb2Ygc2V0dGluZ3MuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyYW1zLmNvSG9zdGUgLSBUaGUgY28taG9zdCBzdGF0ZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBwYXJhbXMuY29Ib3N0UmVzIC0gVGhlIGNvLWhvc3QgcmVzcG9uc2liaWxpdHkgc3RhdGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMucGFyYW1ldGVycyAtIFRoZSBvYmplY3QgY29udGFpbmluZyBwYXJhbWV0ZXJzIGZvciB0aGUgYWxsTWVtYmVyc1Jlc3QgbWV0aG9kLlxuICAgKiBAcGFyYW0ge0FycmF5fSBwYXJhbXMuY29uc3VtZV9zb2NrZXRzIC0gVGhlIGFycmF5IG9mIGNvbnN1bWUgc29ja2V0cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5hcGlVc2VyTmFtZSAtIFRoZSBBUEkgdXNlcm5hbWUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuYXBpS2V5IC0gVGhlIEFQSSBrZXkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuYXBpVG9rZW4gLSBUaGUgQVBJIHRva2VuLlxuICAgKiBAcmV0dXJucyB7dm9pZH0gLSBObyByZXR1cm4gdmFsdWUuXG4gICAqL1xuICBhc3luYyBhbGxNZW1iZXJzUmVzdCh7XG4gICAgbWVtYmVycyxcbiAgICBzZXR0aW5ncyxcbiAgICBjb0hvc3RlLFxuICAgIGNvSG9zdFJlcyxcbiAgICBwYXJhbWV0ZXJzLFxuICAgIGNvbnN1bWVfc29ja2V0cyxcbiAgICBhcGlVc2VyTmFtZSxcbiAgICBhcGlLZXksXG4gICAgYXBpVG9rZW4sXG4gIH06IEFsbE1lbWJlcnNSZXN0T3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxldCB7XG4gICAgICBwYXJ0aWNpcGFudHNBbGwsXG4gICAgICBwYXJ0aWNpcGFudHMsXG4gICAgICBkaXNwQWN0aXZlTmFtZXMsXG4gICAgICByZXF1ZXN0TGlzdCxcbiAgICAgIGNvSG9zdCxcbiAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgICAgbG9ja19zY3JlZW4sXG4gICAgICBmaXJzdEFsbCxcbiAgICAgIG1lbWJlcnNSZWNlaXZlZCxcbiAgICAgIHJvb21SZWN2SVBzLFxuICAgICAgZGVmZXJTY3JlZW5SZWNlaXZlZCxcbiAgICAgIHNjcmVlbklkLFxuICAgICAgc2hhcmVTY3JlZW5TdGFydGVkLFxuICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgYXVkaW9TZXR0aW5nLFxuICAgICAgdmlkZW9TZXR0aW5nLFxuICAgICAgc2NyZWVuc2hhcmVTZXR0aW5nLFxuICAgICAgY2hhdFNldHRpbmcsXG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudHNBbGwsXG4gICAgICB1cGRhdGVQYXJ0aWNpcGFudHMsXG4gICAgICB1cGRhdGVSZXF1ZXN0TGlzdCxcbiAgICAgIHVwZGF0ZUNvSG9zdCxcbiAgICAgIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgICAgdXBkYXRlRmlyc3RBbGwsXG4gICAgICB1cGRhdGVNZW1iZXJzUmVjZWl2ZWQsXG4gICAgICB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkLFxuICAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkLFxuICAgICAgdXBkYXRlQXVkaW9TZXR0aW5nLFxuICAgICAgdXBkYXRlVmlkZW9TZXR0aW5nLFxuICAgICAgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nLFxuICAgICAgdXBkYXRlQ2hhdFNldHRpbmcsXG4gICAgICB1cGRhdGVDb25zdW1lX3NvY2tldHMsXG4gICAgICB1cGRhdGVSb29tUmVjdklQcyxcbiAgICAgIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZSxcblxuICAgICAgb25TY3JlZW5DaGFuZ2VzLFxuICAgICAgY29ubmVjdElwcyxcbiAgICAgIHJlb3JkZXJTdHJlYW1zLFxuICAgICAgc2xlZXAsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAvLyBGaWx0ZXIgb3V0IHRoZSBwYXJ0aWNpcGFudCB0aGF0IGlzQmFubmVkID09IHRydWUgb3IgaXNTdXNwZW5kZWQgPT0gdHJ1ZVxuICAgIHBhcnRpY2lwYW50c0FsbCA9IG1lbWJlcnMubWFwKChwYXJ0aWNpcGFudCkgPT4gKHtcbiAgICAgIGlzQmFubmVkOiBwYXJ0aWNpcGFudC5pc0Jhbm5lZCxcbiAgICAgIGlzU3VzcGVuZGVkOiBwYXJ0aWNpcGFudC5pc1N1c3BlbmRlZCxcbiAgICAgIG5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICBhdWRpb0lEOiBwYXJ0aWNpcGFudC5hdWRpb0lELFxuICAgICAgdmlkZW9JRDogcGFydGljaXBhbnQudmlkZW9JRCxcbiAgICB9KSk7XG4gICAgdXBkYXRlUGFydGljaXBhbnRzQWxsKHBhcnRpY2lwYW50c0FsbCk7XG5cbiAgICBwYXJ0aWNpcGFudHMgPSBtZW1iZXJzLmZpbHRlcihcbiAgICAgIChwYXJ0aWNpcGFudCkgPT4gIXBhcnRpY2lwYW50LmlzQmFubmVkICYmICFwYXJ0aWNpcGFudC5pc1N1c3BlbmRlZCxcbiAgICApO1xuICAgIHVwZGF0ZVBhcnRpY2lwYW50cyhwYXJ0aWNpcGFudHMpO1xuXG4gICAgLy8gQ2hlY2sgaWYgZGlzcEFjdGl2ZU5hbWVzIGlzIG5vdCBlbXB0eSBhbmQgY29udGFpbnMgdGhlIG5hbWUgb2YgdGhlIHBhcnRpY2lwYW50IHRoYXQgaXMgbm90IGluIHRoZSBwYXJ0aWNpcGFudHMgYXJyYXlcbiAgICBpZiAoZGlzcEFjdGl2ZU5hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBkaXNwQWN0aXZlTmFtZXNfID0gZGlzcEFjdGl2ZU5hbWVzLmZpbHRlcihcbiAgICAgICAgKG5hbWU6IHN0cmluZykgPT4gIXBhcnRpY2lwYW50cy5tYXAoKHBhcnRpY2lwYW50OiBhbnkpID0+IHBhcnRpY2lwYW50Lm5hbWUpLmluY2x1ZGVzKG5hbWUpLFxuICAgICAgKTtcbiAgICAgIGlmIChkaXNwQWN0aXZlTmFtZXNfLmxlbmd0aCA+IDAgJiYgbWVtYmVyc1JlY2VpdmVkKSB7XG4gICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHsgYWRkOiBmYWxzZSwgc2NyZWVuQ2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBPcGVyYXRpb25zIHRvIHVwZGF0ZSB0aGUgVUk7IG1ha2Ugc3VyZSB3ZSBhcmUgY29ubmVjdGVkIHRvIHRoZSBzZXJ2ZXIgYmVmb3JlIHVwZGF0aW5nIHRoZSBVSVxuICAgIGlmICghbWVtYmVyc1JlY2VpdmVkKSB7XG4gICAgICBpZiAocm9vbVJlY3ZJUHMubGVuZ3RoIDwgMSkge1xuICAgICAgICAvLyBLZWVwIGNoZWNraW5nIGV2ZXJ5IDAuMDFzXG4gICAgICAgIGxldCBjaGVja0lQcyA9IHNldEludGVydmFsKGFzeW5jICgpID0+IHtcbiAgICAgICAgICBpZiAocm9vbVJlY3ZJUHMubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjaGVja0lQcyk7XG5cbiAgICAgICAgICAgIGlmIChkZWZlclNjcmVlblJlY2VpdmVkICYmIHNjcmVlbklkICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgc2hhcmVTY3JlZW5TdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkKHNoYXJlU2NyZWVuU3RhcnRlZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IFtzb2NrZXRzXywgaXBzX10gPSBhd2FpdCBjb25uZWN0SXBzKHtcbiAgICAgICAgICAgICAgY29uc3VtZV9zb2NrZXRzLFxuICAgICAgICAgICAgICByZW1JUDogcm9vbVJlY3ZJUHMsXG4gICAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgICAgIGFwaVVzZXJOYW1lLFxuICAgICAgICAgICAgICBhcGlLZXksXG4gICAgICAgICAgICAgIGFwaVRva2VuLFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGlmIChzb2NrZXRzXyAmJiBpcHNfKSB7XG4gICAgICAgICAgICAgIHVwZGF0ZUNvbnN1bWVfc29ja2V0cyhzb2NrZXRzXyk7XG4gICAgICAgICAgICAgIHVwZGF0ZVJvb21SZWN2SVBzKGlwc18pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBtZW1iZXJzUmVjZWl2ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdXBkYXRlTWVtYmVyc1JlY2VpdmVkKG1lbWJlcnNSZWNlaXZlZCk7XG5cbiAgICAgICAgICAgIGF3YWl0IHNsZWVwKHsgbXM6IDI1MCB9KTtcbiAgICAgICAgICAgIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgICAgICAgICBkZWZlclNjcmVlblJlY2VpdmVkID0gZmFsc2U7XG4gICAgICAgICAgICB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkKGRlZmVyU2NyZWVuUmVjZWl2ZWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgMTApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgW3NvY2tldHNfLCBpcHNfXSA9IGF3YWl0IGNvbm5lY3RJcHMoe1xuICAgICAgICAgIGNvbnN1bWVfc29ja2V0cyxcbiAgICAgICAgICByZW1JUDogcm9vbVJlY3ZJUHMsXG4gICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICBhcGlVc2VyTmFtZSxcbiAgICAgICAgICBhcGlLZXksXG4gICAgICAgICAgYXBpVG9rZW4sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChzb2NrZXRzXyAmJiBpcHNfKSB7XG4gICAgICAgICAgdXBkYXRlQ29uc3VtZV9zb2NrZXRzKHNvY2tldHNfKTtcbiAgICAgICAgICB1cGRhdGVSb29tUmVjdklQcyhpcHNfKTtcbiAgICAgICAgfVxuICAgICAgICBtZW1iZXJzUmVjZWl2ZWQgPSB0cnVlO1xuICAgICAgICB1cGRhdGVNZW1iZXJzUmVjZWl2ZWQobWVtYmVyc1JlY2VpdmVkKTtcblxuICAgICAgICBpZiAoZGVmZXJTY3JlZW5SZWNlaXZlZCAmJiBzY3JlZW5JZCAhPSBudWxsKSB7XG4gICAgICAgICAgc2hhcmVTY3JlZW5TdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQoc2hhcmVTY3JlZW5TdGFydGVkKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHNsZWVwKHsgbXM6IDI1MCB9KTtcbiAgICAgICAgdXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgZGVmZXJTY3JlZW5SZWNlaXZlZCA9IGZhbHNlO1xuICAgICAgICB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkKGRlZmVyU2NyZWVuUmVjZWl2ZWQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2NyZWVuSWQgIT0gbnVsbCkge1xuICAgICAgICBsZXQgaG9zdCA9IHBhcnRpY2lwYW50cy5maW5kKFxuICAgICAgICAgIChwYXJ0aWNpcGFudDogYW55KSA9PiBwYXJ0aWNpcGFudC5TY3JlZW5JRCA9PSBzY3JlZW5JZCAmJiBwYXJ0aWNpcGFudC5TY3JlZW5PbiA9PSB0cnVlLFxuICAgICAgICApO1xuICAgICAgICBpZiAoZGVmZXJTY3JlZW5SZWNlaXZlZCAmJiBzY3JlZW5JZCAhPSBudWxsICYmIGhvc3QpIHtcbiAgICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZChzaGFyZVNjcmVlblN0YXJ0ZWQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIHJlcXVlc3RzIGZvciBvbmx5IGlkcyB0aGF0IGFyZSBpbiB0aGUgcGFydGljaXBhbnRzIGFycmF5IGFuZCB1cGRhdGUgdGhlIGNvdW50IGJhZGdlXG4gICAgbGV0IHJlcXVlc3RzID0gcmVxdWVzdExpc3Q7XG4gICAgcmVxdWVzdExpc3QgPSByZXF1ZXN0cy5maWx0ZXIoKHJlcXVlc3Q6IGFueSkgPT5cbiAgICAgIHBhcnRpY2lwYW50cy5zb21lKChwYXJ0aWNpcGFudDogYW55KSA9PiBwYXJ0aWNpcGFudC5pZCA9PSByZXF1ZXN0LmlkKSxcbiAgICApO1xuICAgIHVwZGF0ZVJlcXVlc3RMaXN0KHJlcXVlc3RMaXN0KTtcblxuICAgIGlmIChjb0hvc3RlICE9PSB1bmRlZmluZWQgJiYgY29Ib3N0ZSAhPT0gbnVsbCkge1xuICAgICAgY29Ib3N0ID0gY29Ib3N0ZTtcbiAgICB9XG4gICAgaWYgKGNvSG9zdCAhPT0gdW5kZWZpbmVkICYmIGNvSG9zdCAhPT0gbnVsbCkge1xuICAgICAgdXBkYXRlQ29Ib3N0KGNvSG9zdCk7XG4gICAgfVxuICAgIGlmIChjb0hvc3RSZXMgIT09IHVuZGVmaW5lZCAmJiBjb0hvc3RSZXMgIT09IG51bGwpIHtcbiAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5ID0gY29Ib3N0UmVzO1xuICAgIH1cbiAgICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eShjb0hvc3RSZXNwb25zaWJpbGl0eSk7XG5cbiAgICB0cnkge1xuICAgICAgaWYgKCFsb2NrX3NjcmVlbiAmJiAhZmlyc3RBbGwpIHtcbiAgICAgICAgYXdhaXQgb25TY3JlZW5DaGFuZ2VzKHsgcGFyYW1ldGVycyB9KTtcblxuICAgICAgICBpZiAobWVldGluZ0Rpc3BsYXlUeXBlICE9ICdhbGwnKSB7XG4gICAgICAgICAgZmlyc3RBbGwgPSB0cnVlO1xuICAgICAgICAgIHVwZGF0ZUZpcnN0QWxsKGZpcnN0QWxsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnYWxsTWVtYmVyc1Jlc3QgT25TY3JlZW4nLCBlcnJvcik7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChtZW1iZXJzUmVjZWl2ZWQpIHtcbiAgICAgICAgYXVkaW9TZXR0aW5nID0gc2V0dGluZ3NbMF07XG4gICAgICAgIHZpZGVvU2V0dGluZyA9IHNldHRpbmdzWzFdO1xuICAgICAgICBzY3JlZW5zaGFyZVNldHRpbmcgPSBzZXR0aW5nc1syXTtcbiAgICAgICAgY2hhdFNldHRpbmcgPSBzZXR0aW5nc1szXTtcblxuICAgICAgICB1cGRhdGVBdWRpb1NldHRpbmcoYXVkaW9TZXR0aW5nKTtcbiAgICAgICAgdXBkYXRlVmlkZW9TZXR0aW5nKHZpZGVvU2V0dGluZyk7XG4gICAgICAgIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZyhzY3JlZW5zaGFyZVNldHRpbmcpO1xuICAgICAgICB1cGRhdGVDaGF0U2V0dGluZyhjaGF0U2V0dGluZyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdhbGxNZW1iZXJzUmVzdCBTZXR0aW5ncycsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==