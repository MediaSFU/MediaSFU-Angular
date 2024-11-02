import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Manages participant-related operations, including updates for participant lists, requests, co-host settings,
 * and other session details. This method filters out banned and suspended participants, reorders streams,
 * connects IPs, and updates the UI.
 *
 * @async
 * @param {AllMembersOptions} options - Parameters for managing all members.
 * @param {Participant[]} options.members - The array of participant objects.
 * @param {Request[]} options.requestss - The list of requests from participants.
 * @param {string} options.coHoste - The current co-host name.
 * @param {CoHostResponsibility[]} options.coHostRes - The responsibilities assigned to the co-host.
 * @param {AllMembersParameters} options.parameters - Additional parameters for member management and UI updates.
 * @param {ConsumeSocket[]} options.consume_sockets - Array of sockets for participant communication.
 * @param {string} options.apiUserName - API username for authentication.
 * @param {string} options.apiKey - API key for authentication.
 * @param {string} options.apiToken - API token for authentication.
 *
 * @returns {Promise<void>} A promise that resolves when all members have been processed and updates are complete.
 *
 * @example
 * ```typescript
 * const allMembersService = new AllMembers();
 * await allMembersService.allMembers({
 *   members: [{ name: 'John', isBanned: false, isSuspended: false, audioID: '123', videoID: '456' }],
 *   requestss: [{ id: '1', name: 'Jane', type: 'fa-microphone' }],
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
 *     hostFirstSwitch: false,
 *     waitingRoomList: [],
 *     islevel: '1',
 *     updateParticipantsAll: (participantsAll) => console.log(participantsAll),
 *     updateParticipants: (participants) => console.log(participants),
 *     updateRequestList: (requestList) => console.log(requestList),
 *     updateCoHost: (coHost) => console.log(coHost),
 *     updateCoHostResponsibility: (coHostRes) => console.log(coHostRes),
 *     updateFirstAll: (firstAll) => console.log(firstAll),
 *     updateMembersReceived: (membersReceived) => console.log(membersReceived),
 *     updateDeferScreenReceived: (deferScreenReceived) => console.log(deferScreenReceived),
 *     updateShareScreenStarted: (shareScreenStarted) => console.log(shareScreenStarted),
 *     updateHostFirstSwitch: (hostFirstSwitch) => console.log(hostFirstSwitch),
 *     updateConsume_sockets: (sockets) => console.log(sockets),
 *     updateRoomRecvIPs: (ips) => console.log(ips),
 *     updateIsLoadingModalVisible: (visible) => console.log(visible),
 *     updateTotalReqWait: (total) => console.log(total),
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
export class AllMembers {
    /**
     * allMembers - A method for handling various tasks related to participant management and UI updates.
     * @param {Object} params - The parameters passed to the allMembers method.
     * @param {Array} params.members - The array of participant members.
     * @param {Array} params.requestss - The array of requests.
     * @param {boolean} params.coHoste - The co-host state.
     * @param {boolean} params.coHostRes - The co-host responsibility state.
     * @param {Object} params.parameters - The object containing parameters for the allMembers method.
     * @param {Array} params.consume_sockets - The array of consume sockets.
     * @param {string} params.apiUserName - The API username.
     * @param {string} params.apiKey - The API key.
     * @param {string} params.apiToken - The API token.
     * @returns {void} - No return value.
     */
    allMembers = async ({ members, requestss, coHoste, coHostRes, parameters, consume_sockets, apiUserName, apiKey, apiToken, }) => {
        let { participantsAll, participants, dispActiveNames, requestList, coHost, coHostResponsibility, lock_screen, firstAll, membersReceived, roomRecvIPs, deferScreenReceived, screenId, shareScreenStarted, meetingDisplayType, hostFirstSwitch, waitingRoomList, islevel, updateParticipantsAll, updateParticipants, updateRequestList, updateCoHost, updateCoHostResponsibility, updateFirstAll, updateMembersReceived, updateDeferScreenReceived, updateShareScreenStarted, updateHostFirstSwitch, updateConsume_sockets, updateRoomRecvIPs, updateIsLoadingModalVisible, updateTotalReqWait, onScreenChanges, connectIps, reorderStreams, sleep, } = parameters;
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
            if (dispActiveNames_.length > 0) {
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
        requestList = requestss.filter((request) => participants.some((participant) => participant.id == request.id));
        updateRequestList(requestList);
        updateTotalReqWait(requestList.length + waitingRoomList.length);
        if (coHoste !== undefined && coHoste !== null) {
            coHost = coHoste;
        }
        updateCoHost(coHost);
        if (coHostRes) {
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
            else {
                if (islevel == '2') {
                    if (!hostFirstSwitch) {
                        await onScreenChanges({ parameters });
                        hostFirstSwitch = true; // Get self display
                        updateHostFirstSwitch(hostFirstSwitch);
                    }
                }
            }
        }
        catch (error) {
            console.log('allMembers OnScreen', error);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AllMembers, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AllMembers, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AllMembers, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLW1lbWJlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9hbGwtbWVtYmVycy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBOEUzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXNFRztBQU1ILE1BQU0sT0FBTyxVQUFVO0lBQ3JCOzs7Ozs7Ozs7Ozs7O09BYUc7SUFFSCxVQUFVLEdBQUcsS0FBSyxFQUFFLEVBQ2xCLE9BQU8sRUFDUCxTQUFTLEVBQ1QsT0FBTyxFQUNQLFNBQVMsRUFDVCxVQUFVLEVBQ1YsZUFBZSxFQUNmLFdBQVcsRUFDWCxNQUFNLEVBQ04sUUFBUSxHQUNVLEVBQWlCLEVBQUU7UUFDckMsSUFBSSxFQUNGLGVBQWUsRUFDZixZQUFZLEVBQ1osZUFBZSxFQUNmLFdBQVcsRUFDWCxNQUFNLEVBQ04sb0JBQW9CLEVBQ3BCLFdBQVcsRUFDWCxRQUFRLEVBQ1IsZUFBZSxFQUNmLFdBQVcsRUFDWCxtQkFBbUIsRUFDbkIsUUFBUSxFQUNSLGtCQUFrQixFQUNsQixrQkFBa0IsRUFDbEIsZUFBZSxFQUNmLGVBQWUsRUFDZixPQUFPLEVBQ1AscUJBQXFCLEVBQ3JCLGtCQUFrQixFQUNsQixpQkFBaUIsRUFDakIsWUFBWSxFQUNaLDBCQUEwQixFQUMxQixjQUFjLEVBQ2QscUJBQXFCLEVBQ3JCLHlCQUF5QixFQUN6Qix3QkFBd0IsRUFDeEIscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQixpQkFBaUIsRUFDakIsMkJBQTJCLEVBQzNCLGtCQUFrQixFQUVsQixlQUFlLEVBQ2YsVUFBVSxFQUNWLGNB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bUI7d0JBQzNDLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUN6QyxDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzVDLENBQUM7SUFDSCxDQUFDLENBQUM7dUdBM01TLFVBQVU7MkdBQVYsVUFBVSxjQUZULE1BQU07OzJGQUVQLFVBQVU7a0JBSHRCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgUGFydGljaXBhbnQsXG4gIFJlcXVlc3QsXG4gIFJlb3JkZXJTdHJlYW1zVHlwZSxcbiAgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICBTbGVlcFR5cGUsXG4gIENvbm5lY3RJcHNQYXJhbWV0ZXJzLFxuICBPblNjcmVlbkNoYW5nZXNQYXJhbWV0ZXJzLFxuICBPblNjcmVlbkNoYW5nZXNUeXBlLFxuICBDb25uZWN0SXBzVHlwZSxcbiAgQ29uc3VtZVNvY2tldCxcbiAgQ29Ib3N0UmVzcG9uc2liaWxpdHksXG4gIFdhaXRpbmdSb29tUGFydGljaXBhbnQsXG59IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWxsTWVtYmVyc1BhcmFtZXRlcnNcbiAgZXh0ZW5kcyBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gICAgQ29ubmVjdElwc1BhcmFtZXRlcnMsXG4gICAgT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycyB7XG4gIHBhcnRpY2lwYW50c0FsbDogUGFydGljaXBhbnRbXTtcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBkaXNwQWN0aXZlTmFtZXM6IHN0cmluZ1tdO1xuICByZXF1ZXN0TGlzdDogUmVxdWVzdFtdO1xuICBjb0hvc3Q6IHN0cmluZztcbiAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IENvSG9zdFJlc3BvbnNpYmlsaXR5W107XG4gIGxvY2tfc2NyZWVuOiBib29sZWFuO1xuICBmaXJzdEFsbDogYm9vbGVhbjtcbiAgbWVtYmVyc1JlY2VpdmVkOiBib29sZWFuO1xuICByb29tUmVjdklQczogc3RyaW5nW107XG4gIGRlZmVyU2NyZWVuUmVjZWl2ZWQ6IGJvb2xlYW47XG4gIHNjcmVlbklkPzogc3RyaW5nO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIG1lZXRpbmdEaXNwbGF5VHlwZTogc3RyaW5nO1xuICBob3N0Rmlyc3RTd2l0Y2g6IGJvb2xlYW47XG4gIHdhaXRpbmdSb29tTGlzdDogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdO1xuICBpc2xldmVsOiBzdHJpbmc7XG5cbiAgdXBkYXRlUGFydGljaXBhbnRzQWxsOiAocGFydGljaXBhbnRzQWxsOiBQYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xuICB1cGRhdGVQYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10pID0+IHZvaWQ7XG4gIHVwZGF0ZVJlcXVlc3RMaXN0OiAocmVxdWVzdExpc3Q6IFJlcXVlc3RbXSkgPT4gdm9pZDtcbiAgdXBkYXRlQ29Ib3N0OiAoY29Ib3N0OiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5OiAoY29Ib3N0UmVzOiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdKSA9PiB2b2lkO1xuICB1cGRhdGVGaXJzdEFsbDogKGZpcnN0QWxsOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVNZW1iZXJzUmVjZWl2ZWQ6IChtZW1iZXJzUmVjZWl2ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQ6IChkZWZlclNjcmVlblJlY2VpdmVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQ6IChzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUhvc3RGaXJzdFN3aXRjaDogKGhvc3RGaXJzdFN3aXRjaDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQ29uc3VtZV9zb2NrZXRzOiAoc29ja2V0czogQ29uc3VtZVNvY2tldFtdKSA9PiB2b2lkO1xuICB1cGRhdGVSb29tUmVjdklQczogKGlwczogc3RyaW5nW10pID0+IHZvaWQ7XG4gIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZTogKHZpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVRvdGFsUmVxV2FpdDogKHRvdGFsOiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIG9uU2NyZWVuQ2hhbmdlczogT25TY3JlZW5DaGFuZ2VzVHlwZTtcbiAgY29ubmVjdElwczogQ29ubmVjdElwc1R5cGU7XG4gIHNsZWVwOiBTbGVlcFR5cGU7XG4gIHJlb3JkZXJTdHJlYW1zOiBSZW9yZGVyU3RyZWFtc1R5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gQWxsTWVtYmVyc1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBBbGxNZW1iZXJzT3B0aW9ucyB7XG4gIG1lbWJlcnM6IFBhcnRpY2lwYW50W107XG4gIHJlcXVlc3RzczogUmVxdWVzdFtdO1xuICBjb0hvc3RlOiBzdHJpbmc7XG4gIGNvSG9zdFJlczogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgcGFyYW1ldGVyczogQWxsTWVtYmVyc1BhcmFtZXRlcnM7XG4gIGNvbnN1bWVfc29ja2V0czogQ29uc3VtZVNvY2tldFtdO1xuICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICBhcGlLZXk6IHN0cmluZztcbiAgYXBpVG9rZW46IHN0cmluZztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQWxsTWVtYmVyc1R5cGUgPSAob3B0aW9uczogQWxsTWVtYmVyc09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogTWFuYWdlcyBwYXJ0aWNpcGFudC1yZWxhdGVkIG9wZXJhdGlvbnMsIGluY2x1ZGluZyB1cGRhdGVzIGZvciBwYXJ0aWNpcGFudCBsaXN0cywgcmVxdWVzdHMsIGNvLWhvc3Qgc2V0dGluZ3MsXG4gKiBhbmQgb3RoZXIgc2Vzc2lvbiBkZXRhaWxzLiBUaGlzIG1ldGhvZCBmaWx0ZXJzIG91dCBiYW5uZWQgYW5kIHN1c3BlbmRlZCBwYXJ0aWNpcGFudHMsIHJlb3JkZXJzIHN0cmVhbXMsXG4gKiBjb25uZWN0cyBJUHMsIGFuZCB1cGRhdGVzIHRoZSBVSS5cbiAqXG4gKiBAYXN5bmNcbiAqIEBwYXJhbSB7QWxsTWVtYmVyc09wdGlvbnN9IG9wdGlvbnMgLSBQYXJhbWV0ZXJzIGZvciBtYW5hZ2luZyBhbGwgbWVtYmVycy5cbiAqIEBwYXJhbSB7UGFydGljaXBhbnRbXX0gb3B0aW9ucy5tZW1iZXJzIC0gVGhlIGFycmF5IG9mIHBhcnRpY2lwYW50IG9iamVjdHMuXG4gKiBAcGFyYW0ge1JlcXVlc3RbXX0gb3B0aW9ucy5yZXF1ZXN0c3MgLSBUaGUgbGlzdCBvZiByZXF1ZXN0cyBmcm9tIHBhcnRpY2lwYW50cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNvSG9zdGUgLSBUaGUgY3VycmVudCBjby1ob3N0IG5hbWUuXG4gKiBAcGFyYW0ge0NvSG9zdFJlc3BvbnNpYmlsaXR5W119IG9wdGlvbnMuY29Ib3N0UmVzIC0gVGhlIHJlc3BvbnNpYmlsaXRpZXMgYXNzaWduZWQgdG8gdGhlIGNvLWhvc3QuXG4gKiBAcGFyYW0ge0FsbE1lbWJlcnNQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIG1lbWJlciBtYW5hZ2VtZW50IGFuZCBVSSB1cGRhdGVzLlxuICogQHBhcmFtIHtDb25zdW1lU29ja2V0W119IG9wdGlvbnMuY29uc3VtZV9zb2NrZXRzIC0gQXJyYXkgb2Ygc29ja2V0cyBmb3IgcGFydGljaXBhbnQgY29tbXVuaWNhdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFwaVVzZXJOYW1lIC0gQVBJIHVzZXJuYW1lIGZvciBhdXRoZW50aWNhdGlvbi5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmFwaUtleSAtIEFQSSBrZXkgZm9yIGF1dGhlbnRpY2F0aW9uLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuYXBpVG9rZW4gLSBBUEkgdG9rZW4gZm9yIGF1dGhlbnRpY2F0aW9uLlxuICpcbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIGFsbCBtZW1iZXJzIGhhdmUgYmVlbiBwcm9jZXNzZWQgYW5kIHVwZGF0ZXMgYXJlIGNvbXBsZXRlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBhbGxNZW1iZXJzU2VydmljZSA9IG5ldyBBbGxNZW1iZXJzKCk7XG4gKiBhd2FpdCBhbGxNZW1iZXJzU2VydmljZS5hbGxNZW1iZXJzKHtcbiAqICAgbWVtYmVyczogW3sgbmFtZTogJ0pvaG4nLCBpc0Jhbm5lZDogZmFsc2UsIGlzU3VzcGVuZGVkOiBmYWxzZSwgYXVkaW9JRDogJzEyMycsIHZpZGVvSUQ6ICc0NTYnIH1dLFxuICogICByZXF1ZXN0c3M6IFt7IGlkOiAnMScsIG5hbWU6ICdKYW5lJywgdHlwZTogJ2ZhLW1pY3JvcGhvbmUnIH1dLFxuICogICBjb0hvc3RlOiAnSmFuZScsXG4gKiAgIGNvSG9zdFJlczogWydtYW5hZ2UtY2hhdCddLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgcGFydGljaXBhbnRzQWxsOiBbXSxcbiAqICAgICBwYXJ0aWNpcGFudHM6IFtdLFxuICogICAgIGRpc3BBY3RpdmVOYW1lczogWydKb2huJ10sXG4gKiAgICAgcmVxdWVzdExpc3Q6IFtdLFxuICogICAgIGNvSG9zdDogJycsXG4gKiAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IFtdLFxuICogICAgIGxvY2tfc2NyZWVuOiBmYWxzZSxcbiAqICAgICBmaXJzdEFsbDogZmFsc2UsXG4gKiAgICAgbWVtYmVyc1JlY2VpdmVkOiBmYWxzZSxcbiAqICAgICByb29tUmVjdklQczogW10sXG4gKiAgICAgZGVmZXJTY3JlZW5SZWNlaXZlZDogZmFsc2UsXG4gKiAgICAgc2NyZWVuSWQ6IG51bGwsXG4gKiAgICAgc2hhcmVTY3JlZW5TdGFydGVkOiBmYWxzZSxcbiAqICAgICBtZWV0aW5nRGlzcGxheVR5cGU6ICdncmlkJyxcbiAqICAgICBob3N0Rmlyc3RTd2l0Y2g6IGZhbHNlLFxuICogICAgIHdhaXRpbmdSb29tTGlzdDogW10sXG4gKiAgICAgaXNsZXZlbDogJzEnLFxuICogICAgIHVwZGF0ZVBhcnRpY2lwYW50c0FsbDogKHBhcnRpY2lwYW50c0FsbCkgPT4gY29uc29sZS5sb2cocGFydGljaXBhbnRzQWxsKSxcbiAqICAgICB1cGRhdGVQYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHMpID0+IGNvbnNvbGUubG9nKHBhcnRpY2lwYW50cyksXG4gKiAgICAgdXBkYXRlUmVxdWVzdExpc3Q6IChyZXF1ZXN0TGlzdCkgPT4gY29uc29sZS5sb2cocmVxdWVzdExpc3QpLFxuICogICAgIHVwZGF0ZUNvSG9zdDogKGNvSG9zdCkgPT4gY29uc29sZS5sb2coY29Ib3N0KSxcbiAqICAgICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eTogKGNvSG9zdFJlcykgPT4gY29uc29sZS5sb2coY29Ib3N0UmVzKSxcbiAqICAgICB1cGRhdGVGaXJzdEFsbDogKGZpcnN0QWxsKSA9PiBjb25zb2xlLmxvZyhmaXJzdEFsbCksXG4gKiAgICAgdXBkYXRlTWVtYmVyc1JlY2VpdmVkOiAobWVtYmVyc1JlY2VpdmVkKSA9PiBjb25zb2xlLmxvZyhtZW1iZXJzUmVjZWl2ZWQpLFxuICogICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQ6IChkZWZlclNjcmVlblJlY2VpdmVkKSA9PiBjb25zb2xlLmxvZyhkZWZlclNjcmVlblJlY2VpdmVkKSxcbiAqICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQ6IChzaGFyZVNjcmVlblN0YXJ0ZWQpID0+IGNvbnNvbGUubG9nKHNoYXJlU2NyZWVuU3RhcnRlZCksXG4gKiAgICAgdXBkYXRlSG9zdEZpcnN0U3dpdGNoOiAoaG9zdEZpcnN0U3dpdGNoKSA9PiBjb25zb2xlLmxvZyhob3N0Rmlyc3RTd2l0Y2gpLFxuICogICAgIHVwZGF0ZUNvbnN1bWVfc29ja2V0czogKHNvY2tldHMpID0+IGNvbnNvbGUubG9nKHNvY2tldHMpLFxuICogICAgIHVwZGF0ZVJvb21SZWN2SVBzOiAoaXBzKSA9PiBjb25zb2xlLmxvZyhpcHMpLFxuICogICAgIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZTogKHZpc2libGUpID0+IGNvbnNvbGUubG9nKHZpc2libGUpLFxuICogICAgIHVwZGF0ZVRvdGFsUmVxV2FpdDogKHRvdGFsKSA9PiBjb25zb2xlLmxvZyh0b3RhbCksXG4gKiAgICAgb25TY3JlZW5DaGFuZ2VzOiAocGFyYW1zKSA9PiBjb25zb2xlLmxvZygnb25TY3JlZW5DaGFuZ2VzIGNhbGxlZCB3aXRoJywgcGFyYW1zKSxcbiAqICAgICBjb25uZWN0SXBzOiBhc3luYyAocGFyYW1zKSA9PiBbWydzb2NrZXQxJ10sIFsnaXAxJ11dLFxuICogICAgIHNsZWVwOiBhc3luYyAoeyBtcyB9KSA9PiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpLFxuICogICAgIHJlb3JkZXJTdHJlYW1zOiBhc3luYyAocGFyYW1zKSA9PiBjb25zb2xlLmxvZygncmVvcmRlclN0cmVhbXMgY2FsbGVkIHdpdGgnLCBwYXJhbXMpLFxuICogICB9LFxuICogICBjb25zdW1lX3NvY2tldHM6IFt7IHNvY2tldElkOiAnYWJjMTIzJyB9XSxcbiAqICAgYXBpVXNlck5hbWU6ICd0ZXN0VXNlcicsXG4gKiAgIGFwaUtleTogJ2FwaUtleUV4YW1wbGUnLFxuICogICBhcGlUb2tlbjogJ2FwaVRva2VuRXhhbXBsZScsXG4gKiB9KTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEFsbE1lbWJlcnMge1xuICAvKipcbiAgICogYWxsTWVtYmVycyAtIEEgbWV0aG9kIGZvciBoYW5kbGluZyB2YXJpb3VzIHRhc2tzIHJlbGF0ZWQgdG8gcGFydGljaXBhbnQgbWFuYWdlbWVudCBhbmQgVUkgdXBkYXRlcy5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIFRoZSBwYXJhbWV0ZXJzIHBhc3NlZCB0byB0aGUgYWxsTWVtYmVycyBtZXRob2QuXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcy5tZW1iZXJzIC0gVGhlIGFycmF5IG9mIHBhcnRpY2lwYW50IG1lbWJlcnMuXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcy5yZXF1ZXN0c3MgLSBUaGUgYXJyYXkgb2YgcmVxdWVzdHMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcGFyYW1zLmNvSG9zdGUgLSBUaGUgY28taG9zdCBzdGF0ZS5cbiAgICogQHBhcmFtIHtib29sZWFufSBwYXJhbXMuY29Ib3N0UmVzIC0gVGhlIGNvLWhvc3QgcmVzcG9uc2liaWxpdHkgc3RhdGUuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMucGFyYW1ldGVycyAtIFRoZSBvYmplY3QgY29udGFpbmluZyBwYXJhbWV0ZXJzIGZvciB0aGUgYWxsTWVtYmVycyBtZXRob2QuXG4gICAqIEBwYXJhbSB7QXJyYXl9IHBhcmFtcy5jb25zdW1lX3NvY2tldHMgLSBUaGUgYXJyYXkgb2YgY29uc3VtZSBzb2NrZXRzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmFwaVVzZXJOYW1lIC0gVGhlIEFQSSB1c2VybmFtZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5hcGlLZXkgLSBUaGUgQVBJIGtleS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5hcGlUb2tlbiAtIFRoZSBBUEkgdG9rZW4uXG4gICAqIEByZXR1cm5zIHt2b2lkfSAtIE5vIHJldHVybiB2YWx1ZS5cbiAgICovXG5cbiAgYWxsTWVtYmVycyA9IGFzeW5jICh7XG4gICAgbWVtYmVycyxcbiAgICByZXF1ZXN0c3MsXG4gICAgY29Ib3N0ZSxcbiAgICBjb0hvc3RSZXMsXG4gICAgcGFyYW1ldGVycyxcbiAgICBjb25zdW1lX3NvY2tldHMsXG4gICAgYXBpVXNlck5hbWUsXG4gICAgYXBpS2V5LFxuICAgIGFwaVRva2VuLFxuICB9OiBBbGxNZW1iZXJzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCB7XG4gICAgICBwYXJ0aWNpcGFudHNBbGwsXG4gICAgICBwYXJ0aWNpcGFudHMsXG4gICAgICBkaXNwQWN0aXZlTmFtZXMsXG4gICAgICByZXF1ZXN0TGlzdCxcbiAgICAgIGNvSG9zdCxcbiAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgICAgbG9ja19zY3JlZW4sXG4gICAgICBmaXJzdEFsbCxcbiAgICAgIG1lbWJlcnNSZWNlaXZlZCxcbiAgICAgIHJvb21SZWN2SVBzLFxuICAgICAgZGVmZXJTY3JlZW5SZWNlaXZlZCxcbiAgICAgIHNjcmVlbklkLFxuICAgICAgc2hhcmVTY3JlZW5TdGFydGVkLFxuICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgaG9zdEZpcnN0U3dpdGNoLFxuICAgICAgd2FpdGluZ1Jvb21MaXN0LFxuICAgICAgaXNsZXZlbCxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50c0FsbCxcbiAgICAgIHVwZGF0ZVBhcnRpY2lwYW50cyxcbiAgICAgIHVwZGF0ZVJlcXVlc3RMaXN0LFxuICAgICAgdXBkYXRlQ29Ib3N0LFxuICAgICAgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHksXG4gICAgICB1cGRhdGVGaXJzdEFsbCxcbiAgICAgIHVwZGF0ZU1lbWJlcnNSZWNlaXZlZCxcbiAgICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQsXG4gICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICB1cGRhdGVIb3N0Rmlyc3RTd2l0Y2gsXG4gICAgICB1cGRhdGVDb25zdW1lX3NvY2tldHMsXG4gICAgICB1cGRhdGVSb29tUmVjdklQcyxcbiAgICAgIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZSxcbiAgICAgIHVwZGF0ZVRvdGFsUmVxV2FpdCxcblxuICAgICAgb25TY3JlZW5DaGFuZ2VzLFxuICAgICAgY29ubmVjdElwcyxcbiAgICAgIHJlb3JkZXJTdHJlYW1zLFxuICAgICAgc2xlZXAsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAvLyBGaWx0ZXIgb3V0IHRoZSBwYXJ0aWNpcGFudCB0aGF0IGlzQmFubmVkID09IHRydWUgb3IgaXNTdXNwZW5kZWQgPT0gdHJ1ZVxuICAgIHBhcnRpY2lwYW50c0FsbCA9IG1lbWJlcnMubWFwKChwYXJ0aWNpcGFudCkgPT4gKHtcbiAgICAgIGlzQmFubmVkOiBwYXJ0aWNpcGFudC5pc0Jhbm5lZCxcbiAgICAgIGlzU3VzcGVuZGVkOiBwYXJ0aWNpcGFudC5pc1N1c3BlbmRlZCxcbiAgICAgIG5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICBhdWRpb0lEOiBwYXJ0aWNpcGFudC5hdWRpb0lELFxuICAgICAgdmlkZW9JRDogcGFydGljaXBhbnQudmlkZW9JRCxcbiAgICB9KSk7XG4gICAgdXBkYXRlUGFydGljaXBhbnRzQWxsKHBhcnRpY2lwYW50c0FsbCk7XG5cbiAgICBwYXJ0aWNpcGFudHMgPSBtZW1iZXJzLmZpbHRlcihcbiAgICAgIChwYXJ0aWNpcGFudCkgPT4gIXBhcnRpY2lwYW50LmlzQmFubmVkICYmICFwYXJ0aWNpcGFudC5pc1N1c3BlbmRlZCxcbiAgICApO1xuICAgIHVwZGF0ZVBhcnRpY2lwYW50cyhwYXJ0aWNpcGFudHMpO1xuXG4gICAgLy8gQ2hlY2sgaWYgZGlzcEFjdGl2ZU5hbWVzIGlzIG5vdCBlbXB0eSBhbmQgY29udGFpbnMgdGhlIG5hbWUgb2YgdGhlIHBhcnRpY2lwYW50IHRoYXQgaXMgbm90IGluIHRoZSBwYXJ0aWNpcGFudHMgYXJyYXlcbiAgICBpZiAoZGlzcEFjdGl2ZU5hbWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIGxldCBkaXNwQWN0aXZlTmFtZXNfID0gZGlzcEFjdGl2ZU5hbWVzLmZpbHRlcihcbiAgICAgICAgKG5hbWU6IHN0cmluZykgPT4gIXBhcnRpY2lwYW50cy5tYXAoKHBhcnRpY2lwYW50OiBhbnkpID0+IHBhcnRpY2lwYW50Lm5hbWUpLmluY2x1ZGVzKG5hbWUpLFxuICAgICAgKTtcbiAgICAgIGlmIChkaXNwQWN0aXZlTmFtZXNfLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYXdhaXQgcmVvcmRlclN0cmVhbXMoeyBhZGQ6IGZhbHNlLCBzY3JlZW5DaGFuZ2VkOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIE9wZXJhdGlvbnMgdG8gdXBkYXRlIHRoZSBVSTsgbWFrZSBzdXJlIHdlIGFyZSBjb25uZWN0ZWQgdG8gdGhlIHNlcnZlciBiZWZvcmUgdXBkYXRpbmcgdGhlIFVJXG4gICAgaWYgKCFtZW1iZXJzUmVjZWl2ZWQpIHtcbiAgICAgIGlmIChyb29tUmVjdklQcy5sZW5ndGggPCAxKSB7XG4gICAgICAgIC8vIEtlZXAgY2hlY2tpbmcgZXZlcnkgMC4wMXNcbiAgICAgICAgbGV0IGNoZWNrSVBzID0gc2V0SW50ZXJ2YWwoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGlmIChyb29tUmVjdklQcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGNoZWNrSVBzKTtcblxuICAgICAgICAgICAgaWYgKGRlZmVyU2NyZWVuUmVjZWl2ZWQgJiYgc2NyZWVuSWQgIT0gbnVsbCkge1xuICAgICAgICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQoc2hhcmVTY3JlZW5TdGFydGVkKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgW3NvY2tldHNfLCBpcHNfXSA9IGF3YWl0IGNvbm5lY3RJcHMoe1xuICAgICAgICAgICAgICBjb25zdW1lX3NvY2tldHMsXG4gICAgICAgICAgICAgIHJlbUlQOiByb29tUmVjdklQcyxcbiAgICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICAgICAgYXBpVXNlck5hbWUsXG4gICAgICAgICAgICAgIGFwaUtleSxcbiAgICAgICAgICAgICAgYXBpVG9rZW4sXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHNvY2tldHNfICYmIGlwc18pIHtcbiAgICAgICAgICAgICAgdXBkYXRlQ29uc3VtZV9zb2NrZXRzKHNvY2tldHNfKTtcbiAgICAgICAgICAgICAgdXBkYXRlUm9vbVJlY3ZJUHMoaXBzXyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lbWJlcnNSZWNlaXZlZCA9IHRydWU7XG4gICAgICAgICAgICB1cGRhdGVNZW1iZXJzUmVjZWl2ZWQobWVtYmVyc1JlY2VpdmVkKTtcblxuICAgICAgICAgICAgYXdhaXQgc2xlZXAoeyBtczogMjUwIH0pO1xuICAgICAgICAgICAgdXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgICAgIGRlZmVyU2NyZWVuUmVjZWl2ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQoZGVmZXJTY3JlZW5SZWNlaXZlZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCAxMCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBbc29ja2V0c18sIGlwc19dID0gYXdhaXQgY29ubmVjdElwcyh7XG4gICAgICAgICAgY29uc3VtZV9zb2NrZXRzLFxuICAgICAgICAgIHJlbUlQOiByb29tUmVjdklQcyxcbiAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgIGFwaVVzZXJOYW1lLFxuICAgICAgICAgIGFwaUtleSxcbiAgICAgICAgICBhcGlUb2tlbixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaWYgKHNvY2tldHNfICYmIGlwc18pIHtcbiAgICAgICAgICB1cGRhdGVDb25zdW1lX3NvY2tldHMoc29ja2V0c18pO1xuICAgICAgICAgIHVwZGF0ZVJvb21SZWN2SVBzKGlwc18pO1xuICAgICAgICB9XG4gICAgICAgIG1lbWJlcnNSZWNlaXZlZCA9IHRydWU7XG4gICAgICAgIHVwZGF0ZU1lbWJlcnNSZWNlaXZlZChtZW1iZXJzUmVjZWl2ZWQpO1xuXG4gICAgICAgIGlmIChkZWZlclNjcmVlblJlY2VpdmVkICYmIHNjcmVlbklkICE9IG51bGwpIHtcbiAgICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZChzaGFyZVNjcmVlblN0YXJ0ZWQpO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgc2xlZXAoeyBtczogMjUwIH0pO1xuICAgICAgICB1cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgICAgICBkZWZlclNjcmVlblJlY2VpdmVkID0gZmFsc2U7XG4gICAgICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQoZGVmZXJTY3JlZW5SZWNlaXZlZCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChzY3JlZW5JZCAhPSBudWxsKSB7XG4gICAgICAgIGxldCBob3N0ID0gcGFydGljaXBhbnRzLmZpbmQoXG4gICAgICAgICAgKHBhcnRpY2lwYW50OiBhbnkpID0+IHBhcnRpY2lwYW50LlNjcmVlbklEID09IHNjcmVlbklkICYmIHBhcnRpY2lwYW50LlNjcmVlbk9uID09IHRydWUsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChkZWZlclNjcmVlblJlY2VpdmVkICYmIHNjcmVlbklkICE9IG51bGwgJiYgaG9zdCkge1xuICAgICAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkKHNoYXJlU2NyZWVuU3RhcnRlZCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gcmVxdWVzdHMgZm9yIG9ubHkgaWRzIHRoYXQgYXJlIGluIHRoZSBwYXJ0aWNpcGFudHMgYXJyYXkgYW5kIHVwZGF0ZSB0aGUgY291bnQgYmFkZ2VcbiAgICByZXF1ZXN0TGlzdCA9IHJlcXVlc3Rzcy5maWx0ZXIoKHJlcXVlc3QpID0+XG4gICAgICBwYXJ0aWNpcGFudHMuc29tZSgocGFydGljaXBhbnQ6IGFueSkgPT4gcGFydGljaXBhbnQuaWQgPT0gcmVxdWVzdC5pZCksXG4gICAgKTtcbiAgICB1cGRhdGVSZXF1ZXN0TGlzdChyZXF1ZXN0TGlzdCk7XG5cbiAgICB1cGRhdGVUb3RhbFJlcVdhaXQocmVxdWVzdExpc3QubGVuZ3RoICsgd2FpdGluZ1Jvb21MaXN0Lmxlbmd0aCk7XG5cbiAgICBpZiAoY29Ib3N0ZSAhPT0gdW5kZWZpbmVkICYmIGNvSG9zdGUgIT09IG51bGwpIHtcbiAgICAgIGNvSG9zdCA9IGNvSG9zdGU7XG4gICAgfVxuICAgIHVwZGF0ZUNvSG9zdChjb0hvc3QpO1xuICAgIGlmIChjb0hvc3RSZXMpIHtcbiAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5ID0gY29Ib3N0UmVzO1xuICAgIH1cbiAgICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eShjb0hvc3RSZXNwb25zaWJpbGl0eSk7XG5cbiAgICB0cnkge1xuICAgICAgaWYgKCFsb2NrX3NjcmVlbiAmJiAhZmlyc3RBbGwpIHtcbiAgICAgICAgYXdhaXQgb25TY3JlZW5DaGFuZ2VzKHsgcGFyYW1ldGVycyB9KTtcblxuICAgICAgICBpZiAobWVldGluZ0Rpc3BsYXlUeXBlICE9ICdhbGwnKSB7XG4gICAgICAgICAgZmlyc3RBbGwgPSB0cnVlO1xuICAgICAgICAgIHVwZGF0ZUZpcnN0QWxsKGZpcnN0QWxsKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzbGV2ZWwgPT0gJzInKSB7XG4gICAgICAgICAgaWYgKCFob3N0Rmlyc3RTd2l0Y2gpIHtcbiAgICAgICAgICAgIGF3YWl0IG9uU2NyZWVuQ2hhbmdlcyh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICBob3N0Rmlyc3RTd2l0Y2ggPSB0cnVlOyAvLyBHZXQgc2VsZiBkaXNwbGF5XG4gICAgICAgICAgICB1cGRhdGVIb3N0Rmlyc3RTd2l0Y2goaG9zdEZpcnN0U3dpdGNoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ2FsbE1lbWJlcnMgT25TY3JlZW4nLCBlcnJvcik7XG4gICAgfVxuICB9O1xufVxuIl19