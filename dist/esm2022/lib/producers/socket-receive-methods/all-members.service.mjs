import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxsLW1lbWJlcnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9wcm9kdWNlcnMvc29ja2V0LXJlY2VpdmUtbWV0aG9kcy9hbGwtbWVtYmVycy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBaUYzQyxNQUFNLE9BQU8sVUFBVTtJQUNyQjs7Ozs7Ozs7Ozs7OztPQWFHO0lBRUgsVUFBVSxHQUFHLEtBQUssRUFBRSxFQUNsQixPQUFPLEVBQ1AsU0FBUyxFQUNULE9BQU8sRUFDUCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGVBQWUsRUFDZixXQUFXLEVBQ1gsTUFBTSxFQUNOLFFBQVEsR0FDVSxFQUFpQixFQUFFO1FBQ3JDLElBQUksRUFDRixlQUFlLEVBQ2YsWUFBWSxFQUNaLGVBQWUsRUFDZixXQUFXLEVBQ1gsTUFBTSxFQUNOLG9CQUFvQixFQUNwQixXQUFXLEVBQ1gsUUFBUSxFQUNSLGVBQWUsRUFDZixXQUFXLEVBQ1gsbUJBQW1CLEVBQ25CLFFBQVEsRUFDUixrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLGVBQWUsRUFDZixlQUFlLEVBQ2YsT0FBTyxFQUNQLHFCQUFxQixFQUNyQixrQkFBa0IsRUFDbEIsaUJBQWlCLEVBQ2pCLFlBQVksRUFDWiwwQkFBMEIsRUFDMUIsY0FBYyxFQUNkLHFCQUFxQixFQUNyQix5QkFBeUIsRUFDekIsd0JBQXdCLEVBQ3hCLHFCQUFxQixFQUNyQixxQkFBcUIsRUFDckIsaUJBQWlCLEVBQ2pCLDJCQUEyQixFQUMzQixrQkFBa0IsRUFFbEIsZUFBZSxFQUNmLFVBQVUsRUFDVixjQUFjLEVBQ2QsS0FBSyxHQUNOLEdBQUcsVUFBVSxDQUFDO1FBRWYsMEVBQTBFO1FBQzFFLGVBQWUsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFD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UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM1QyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQTNNUyxVQUFVOzJHQUFWLFVBQVUsY0FGVCxNQUFNOzsyRkFFUCxVQUFVO2tCQUh0QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFBhcnRpY2lwYW50LFxuICBSZXF1ZXN0LFxuICBSZW9yZGVyU3RyZWFtc1R5cGUsXG4gIFJlb3JkZXJTdHJlYW1zUGFyYW1ldGVycyxcbiAgU2xlZXBUeXBlLFxuICBDb25uZWN0SXBzUGFyYW1ldGVycyxcbiAgT25TY3JlZW5DaGFuZ2VzUGFyYW1ldGVycyxcbiAgT25TY3JlZW5DaGFuZ2VzVHlwZSxcbiAgQ29ubmVjdElwc1R5cGUsXG4gIENvbnN1bWVTb2NrZXQsXG4gIENvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICBXYWl0aW5nUm9vbVBhcnRpY2lwYW50LFxufSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFsbE1lbWJlcnNQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICAgIENvbm5lY3RJcHNQYXJhbWV0ZXJzLFxuICAgIE9uU2NyZWVuQ2hhbmdlc1BhcmFtZXRlcnMge1xuICBwYXJ0aWNpcGFudHNBbGw6IFBhcnRpY2lwYW50W107XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgZGlzcEFjdGl2ZU5hbWVzOiBzdHJpbmdbXTtcbiAgcmVxdWVzdExpc3Q6IFJlcXVlc3RbXTtcbiAgY29Ib3N0OiBzdHJpbmc7XG4gIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdO1xuICBsb2NrX3NjcmVlbjogYm9vbGVhbjtcbiAgZmlyc3RBbGw6IGJvb2xlYW47XG4gIG1lbWJlcnNSZWNlaXZlZDogYm9vbGVhbjtcbiAgcm9vbVJlY3ZJUHM6IHN0cmluZ1tdO1xuICBkZWZlclNjcmVlblJlY2VpdmVkOiBib29sZWFuO1xuICBzY3JlZW5JZD86IHN0cmluZztcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBtZWV0aW5nRGlzcGxheVR5cGU6IHN0cmluZztcbiAgaG9zdEZpcnN0U3dpdGNoOiBib29sZWFuO1xuICB3YWl0aW5nUm9vbUxpc3Q6IFdhaXRpbmdSb29tUGFydGljaXBhbnRbXTtcbiAgaXNsZXZlbDogc3RyaW5nO1xuXG4gIHVwZGF0ZVBhcnRpY2lwYW50c0FsbDogKHBhcnRpY2lwYW50c0FsbDogUGFydGljaXBhbnRbXSkgPT4gdm9pZDtcbiAgdXBkYXRlUGFydGljaXBhbnRzOiAocGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xuICB1cGRhdGVSZXF1ZXN0TGlzdDogKHJlcXVlc3RMaXN0OiBSZXF1ZXN0W10pID0+IHZvaWQ7XG4gIHVwZGF0ZUNvSG9zdDogKGNvSG9zdDogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eTogKGNvSG9zdFJlczogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXSkgPT4gdm9pZDtcbiAgdXBkYXRlRmlyc3RBbGw6IChmaXJzdEFsbDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlTWVtYmVyc1JlY2VpdmVkOiAobWVtYmVyc1JlY2VpdmVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkOiAoZGVmZXJTY3JlZW5SZWNlaXZlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkOiAoc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVIb3N0Rmlyc3RTd2l0Y2g6IChob3N0Rmlyc3RTd2l0Y2g6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUNvbnN1bWVfc29ja2V0czogKHNvY2tldHM6IENvbnN1bWVTb2NrZXRbXSkgPT4gdm9pZDtcbiAgdXBkYXRlUm9vbVJlY3ZJUHM6IChpcHM6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICB1cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGU6ICh2aXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVUb3RhbFJlcVdhaXQ6ICh0b3RhbDogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBvblNjcmVlbkNoYW5nZXM6IE9uU2NyZWVuQ2hhbmdlc1R5cGU7XG4gIGNvbm5lY3RJcHM6IENvbm5lY3RJcHNUeXBlO1xuICBzbGVlcDogU2xlZXBUeXBlO1xuICByZW9yZGVyU3RyZWFtczogUmVvcmRlclN0cmVhbXNUeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IEFsbE1lbWJlcnNQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWxsTWVtYmVyc09wdGlvbnMge1xuICBtZW1iZXJzOiBQYXJ0aWNpcGFudFtdO1xuICByZXF1ZXN0c3M6IFJlcXVlc3RbXTtcbiAgY29Ib3N0ZTogc3RyaW5nO1xuICBjb0hvc3RSZXM6IENvSG9zdFJlc3BvbnNpYmlsaXR5W107XG4gIHBhcmFtZXRlcnM6IEFsbE1lbWJlcnNQYXJhbWV0ZXJzO1xuICBjb25zdW1lX3NvY2tldHM6IENvbnN1bWVTb2NrZXRbXTtcbiAgYXBpVXNlck5hbWU6IHN0cmluZztcbiAgYXBpS2V5OiBzdHJpbmc7XG4gIGFwaVRva2VuOiBzdHJpbmc7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEFsbE1lbWJlcnNUeXBlID0gKG9wdGlvbnM6IEFsbE1lbWJlcnNPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQWxsTWVtYmVycyB7XG4gIC8qKlxuICAgKiBhbGxNZW1iZXJzIC0gQSBtZXRob2QgZm9yIGhhbmRsaW5nIHZhcmlvdXMgdGFza3MgcmVsYXRlZCB0byBwYXJ0aWNpcGFudCBtYW5hZ2VtZW50IGFuZCBVSSB1cGRhdGVzLlxuICAgKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gVGhlIHBhcmFtZXRlcnMgcGFzc2VkIHRvIHRoZSBhbGxNZW1iZXJzIG1ldGhvZC5cbiAgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zLm1lbWJlcnMgLSBUaGUgYXJyYXkgb2YgcGFydGljaXBhbnQgbWVtYmVycy5cbiAgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zLnJlcXVlc3RzcyAtIFRoZSBhcnJheSBvZiByZXF1ZXN0cy5cbiAgICogQHBhcmFtIHtib29sZWFufSBwYXJhbXMuY29Ib3N0ZSAtIFRoZSBjby1ob3N0IHN0YXRlLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IHBhcmFtcy5jb0hvc3RSZXMgLSBUaGUgY28taG9zdCByZXNwb25zaWJpbGl0eSBzdGF0ZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcy5wYXJhbWV0ZXJzIC0gVGhlIG9iamVjdCBjb250YWluaW5nIHBhcmFtZXRlcnMgZm9yIHRoZSBhbGxNZW1iZXJzIG1ldGhvZC5cbiAgICogQHBhcmFtIHtBcnJheX0gcGFyYW1zLmNvbnN1bWVfc29ja2V0cyAtIFRoZSBhcnJheSBvZiBjb25zdW1lIHNvY2tldHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuYXBpVXNlck5hbWUgLSBUaGUgQVBJIHVzZXJuYW1lLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmFwaUtleSAtIFRoZSBBUEkga2V5LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmFwaVRva2VuIC0gVGhlIEFQSSB0b2tlbi5cbiAgICogQHJldHVybnMge3ZvaWR9IC0gTm8gcmV0dXJuIHZhbHVlLlxuICAgKi9cblxuICBhbGxNZW1iZXJzID0gYXN5bmMgKHtcbiAgICBtZW1iZXJzLFxuICAgIHJlcXVlc3RzcyxcbiAgICBjb0hvc3RlLFxuICAgIGNvSG9zdFJlcyxcbiAgICBwYXJhbWV0ZXJzLFxuICAgIGNvbnN1bWVfc29ja2V0cyxcbiAgICBhcGlVc2VyTmFtZSxcbiAgICBhcGlLZXksXG4gICAgYXBpVG9rZW4sXG4gIH06IEFsbE1lbWJlcnNPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgbGV0IHtcbiAgICAgIHBhcnRpY2lwYW50c0FsbCxcbiAgICAgIHBhcnRpY2lwYW50cyxcbiAgICAgIGRpc3BBY3RpdmVOYW1lcyxcbiAgICAgIHJlcXVlc3RMaXN0LFxuICAgICAgY29Ib3N0LFxuICAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHksXG4gICAgICBsb2NrX3NjcmVlbixcbiAgICAgIGZpcnN0QWxsLFxuICAgICAgbWVtYmVyc1JlY2VpdmVkLFxuICAgICAgcm9vbVJlY3ZJUHMsXG4gICAgICBkZWZlclNjcmVlblJlY2VpdmVkLFxuICAgICAgc2NyZWVuSWQsXG4gICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICBtZWV0aW5nRGlzcGxheVR5cGUsXG4gICAgICBob3N0Rmlyc3RTd2l0Y2gsXG4gICAgICB3YWl0aW5nUm9vbUxpc3QsXG4gICAgICBpc2xldmVsLFxuICAgICAgdXBkYXRlUGFydGljaXBhbnRzQWxsLFxuICAgICAgdXBkYXRlUGFydGljaXBhbnRzLFxuICAgICAgdXBkYXRlUmVxdWVzdExpc3QsXG4gICAgICB1cGRhdGVDb0hvc3QsXG4gICAgICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgICAgIHVwZGF0ZUZpcnN0QWxsLFxuICAgICAgdXBkYXRlTWVtYmVyc1JlY2VpdmVkLFxuICAgICAgdXBkYXRlRGVmZXJTY3JlZW5SZWNlaXZlZCxcbiAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICAgIHVwZGF0ZUhvc3RGaXJzdFN3aXRjaCxcbiAgICAgIHVwZGF0ZUNvbnN1bWVfc29ja2V0cyxcbiAgICAgIHVwZGF0ZVJvb21SZWN2SVBzLFxuICAgICAgdXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlLFxuICAgICAgdXBkYXRlVG90YWxSZXFXYWl0LFxuXG4gICAgICBvblNjcmVlbkNoYW5nZXMsXG4gICAgICBjb25uZWN0SXBzLFxuICAgICAgcmVvcmRlclN0cmVhbXMsXG4gICAgICBzbGVlcCxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIC8vIEZpbHRlciBvdXQgdGhlIHBhcnRpY2lwYW50IHRoYXQgaXNCYW5uZWQgPT0gdHJ1ZSBvciBpc1N1c3BlbmRlZCA9PSB0cnVlXG4gICAgcGFydGljaXBhbnRzQWxsID0gbWVtYmVycy5tYXAoKHBhcnRpY2lwYW50KSA9PiAoe1xuICAgICAgaXNCYW5uZWQ6IHBhcnRpY2lwYW50LmlzQmFubmVkLFxuICAgICAgaXNTdXNwZW5kZWQ6IHBhcnRpY2lwYW50LmlzU3VzcGVuZGVkLFxuICAgICAgbmFtZTogcGFydGljaXBhbnQubmFtZSxcbiAgICAgIGF1ZGlvSUQ6IHBhcnRpY2lwYW50LmF1ZGlvSUQsXG4gICAgICB2aWRlb0lEOiBwYXJ0aWNpcGFudC52aWRlb0lELFxuICAgIH0pKTtcbiAgICB1cGRhdGVQYXJ0aWNpcGFudHNBbGwocGFydGljaXBhbnRzQWxsKTtcblxuICAgIHBhcnRpY2lwYW50cyA9IG1lbWJlcnMuZmlsdGVyKFxuICAgICAgKHBhcnRpY2lwYW50KSA9PiAhcGFydGljaXBhbnQuaXNCYW5uZWQgJiYgIXBhcnRpY2lwYW50LmlzU3VzcGVuZGVkLFxuICAgICk7XG4gICAgdXBkYXRlUGFydGljaXBhbnRzKHBhcnRpY2lwYW50cyk7XG5cbiAgICAvLyBDaGVjayBpZiBkaXNwQWN0aXZlTmFtZXMgaXMgbm90IGVtcHR5IGFuZCBjb250YWlucyB0aGUgbmFtZSBvZiB0aGUgcGFydGljaXBhbnQgdGhhdCBpcyBub3QgaW4gdGhlIHBhcnRpY2lwYW50cyBhcnJheVxuICAgIGlmIChkaXNwQWN0aXZlTmFtZXMubGVuZ3RoID4gMCkge1xuICAgICAgbGV0IGRpc3BBY3RpdmVOYW1lc18gPSBkaXNwQWN0aXZlTmFtZXMuZmlsdGVyKFxuICAgICAgICAobmFtZTogc3RyaW5nKSA9PiAhcGFydGljaXBhbnRzLm1hcCgocGFydGljaXBhbnQ6IGFueSkgPT4gcGFydGljaXBhbnQubmFtZSkuaW5jbHVkZXMobmFtZSksXG4gICAgICApO1xuICAgICAgaWYgKGRpc3BBY3RpdmVOYW1lc18ubGVuZ3RoID4gMCkge1xuICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7IGFkZDogZmFsc2UsIHNjcmVlbkNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gT3BlcmF0aW9ucyB0byB1cGRhdGUgdGhlIFVJOyBtYWtlIHN1cmUgd2UgYXJlIGNvbm5lY3RlZCB0byB0aGUgc2VydmVyIGJlZm9yZSB1cGRhdGluZyB0aGUgVUlcbiAgICBpZiAoIW1lbWJlcnNSZWNlaXZlZCkge1xuICAgICAgaWYgKHJvb21SZWN2SVBzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgLy8gS2VlcCBjaGVja2luZyBldmVyeSAwLjAxc1xuICAgICAgICBsZXQgY2hlY2tJUHMgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgaWYgKHJvb21SZWN2SVBzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY2hlY2tJUHMpO1xuXG4gICAgICAgICAgICBpZiAoZGVmZXJTY3JlZW5SZWNlaXZlZCAmJiBzY3JlZW5JZCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZChzaGFyZVNjcmVlblN0YXJ0ZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBbc29ja2V0c18sIGlwc19dID0gYXdhaXQgY29ubmVjdElwcyh7XG4gICAgICAgICAgICAgIGNvbnN1bWVfc29ja2V0cyxcbiAgICAgICAgICAgICAgcmVtSVA6IHJvb21SZWN2SVBzLFxuICAgICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgICAgICBhcGlVc2VyTmFtZSxcbiAgICAgICAgICAgICAgYXBpS2V5LFxuICAgICAgICAgICAgICBhcGlUb2tlbixcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICBpZiAoc29ja2V0c18gJiYgaXBzXykge1xuICAgICAgICAgICAgICB1cGRhdGVDb25zdW1lX3NvY2tldHMoc29ja2V0c18pO1xuICAgICAgICAgICAgICB1cGRhdGVSb29tUmVjdklQcyhpcHNfKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWVtYmVyc1JlY2VpdmVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHVwZGF0ZU1lbWJlcnNSZWNlaXZlZChtZW1iZXJzUmVjZWl2ZWQpO1xuXG4gICAgICAgICAgICBhd2FpdCBzbGVlcCh7IG1zOiAyNTAgfSk7XG4gICAgICAgICAgICB1cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgICAgICAgICAgZGVmZXJTY3JlZW5SZWNlaXZlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdXBkYXRlRGVmZXJTY3JlZW5SZWNlaXZlZChkZWZlclNjcmVlblJlY2VpdmVkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sIDEwKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IFtzb2NrZXRzXywgaXBzX10gPSBhd2FpdCBjb25uZWN0SXBzKHtcbiAgICAgICAgICBjb25zdW1lX3NvY2tldHMsXG4gICAgICAgICAgcmVtSVA6IHJvb21SZWN2SVBzLFxuICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgYXBpVXNlck5hbWUsXG4gICAgICAgICAgYXBpS2V5LFxuICAgICAgICAgIGFwaVRva2VuLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoc29ja2V0c18gJiYgaXBzXykge1xuICAgICAgICAgIHVwZGF0ZUNvbnN1bWVfc29ja2V0cyhzb2NrZXRzXyk7XG4gICAgICAgICAgdXBkYXRlUm9vbVJlY3ZJUHMoaXBzXyk7XG4gICAgICAgIH1cbiAgICAgICAgbWVtYmVyc1JlY2VpdmVkID0gdHJ1ZTtcbiAgICAgICAgdXBkYXRlTWVtYmVyc1JlY2VpdmVkKG1lbWJlcnNSZWNlaXZlZCk7XG5cbiAgICAgICAgaWYgKGRlZmVyU2NyZWVuUmVjZWl2ZWQgJiYgc2NyZWVuSWQgIT0gbnVsbCkge1xuICAgICAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCA9IHRydWU7XG4gICAgICAgICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkKHNoYXJlU2NyZWVuU3RhcnRlZCk7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCBzbGVlcCh7IG1zOiAyNTAgfSk7XG4gICAgICAgIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgICAgIGRlZmVyU2NyZWVuUmVjZWl2ZWQgPSBmYWxzZTtcbiAgICAgICAgdXBkYXRlRGVmZXJTY3JlZW5SZWNlaXZlZChkZWZlclNjcmVlblJlY2VpdmVkKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHNjcmVlbklkICE9IG51bGwpIHtcbiAgICAgICAgbGV0IGhvc3QgPSBwYXJ0aWNpcGFudHMuZmluZChcbiAgICAgICAgICAocGFydGljaXBhbnQ6IGFueSkgPT4gcGFydGljaXBhbnQuU2NyZWVuSUQgPT0gc2NyZWVuSWQgJiYgcGFydGljaXBhbnQuU2NyZWVuT24gPT0gdHJ1ZSxcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKGRlZmVyU2NyZWVuUmVjZWl2ZWQgJiYgc2NyZWVuSWQgIT0gbnVsbCAmJiBob3N0KSB7XG4gICAgICAgICAgc2hhcmVTY3JlZW5TdGFydGVkID0gdHJ1ZTtcbiAgICAgICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQoc2hhcmVTY3JlZW5TdGFydGVkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiByZXF1ZXN0cyBmb3Igb25seSBpZHMgdGhhdCBhcmUgaW4gdGhlIHBhcnRpY2lwYW50cyBhcnJheSBhbmQgdXBkYXRlIHRoZSBjb3VudCBiYWRnZVxuICAgIHJlcXVlc3RMaXN0ID0gcmVxdWVzdHNzLmZpbHRlcigocmVxdWVzdCkgPT5cbiAgICAgIHBhcnRpY2lwYW50cy5zb21lKChwYXJ0aWNpcGFudDogYW55KSA9PiBwYXJ0aWNpcGFudC5pZCA9PSByZXF1ZXN0LmlkKSxcbiAgICApO1xuICAgIHVwZGF0ZVJlcXVlc3RMaXN0KHJlcXVlc3RMaXN0KTtcblxuICAgIHVwZGF0ZVRvdGFsUmVxV2FpdChyZXF1ZXN0TGlzdC5sZW5ndGggKyB3YWl0aW5nUm9vbUxpc3QubGVuZ3RoKTtcblxuICAgIGlmIChjb0hvc3RlICE9PSB1bmRlZmluZWQgJiYgY29Ib3N0ZSAhPT0gbnVsbCkge1xuICAgICAgY29Ib3N0ID0gY29Ib3N0ZTtcbiAgICB9XG4gICAgdXBkYXRlQ29Ib3N0KGNvSG9zdCk7XG4gICAgaWYgKGNvSG9zdFJlcykge1xuICAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHkgPSBjb0hvc3RSZXM7XG4gICAgfVxuICAgIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5KGNvSG9zdFJlc3BvbnNpYmlsaXR5KTtcblxuICAgIHRyeSB7XG4gICAgICBpZiAoIWxvY2tfc2NyZWVuICYmICFmaXJzdEFsbCkge1xuICAgICAgICBhd2FpdCBvblNjcmVlbkNoYW5nZXMoeyBwYXJhbWV0ZXJzIH0pO1xuXG4gICAgICAgIGlmIChtZWV0aW5nRGlzcGxheVR5cGUgIT0gJ2FsbCcpIHtcbiAgICAgICAgICBmaXJzdEFsbCA9IHRydWU7XG4gICAgICAgICAgdXBkYXRlRmlyc3RBbGwoZmlyc3RBbGwpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoaXNsZXZlbCA9PSAnMicpIHtcbiAgICAgICAgICBpZiAoIWhvc3RGaXJzdFN3aXRjaCkge1xuICAgICAgICAgICAgYXdhaXQgb25TY3JlZW5DaGFuZ2VzKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICAgIGhvc3RGaXJzdFN3aXRjaCA9IHRydWU7IC8vIEdldCBzZWxmIGRpc3BsYXlcbiAgICAgICAgICAgIHVwZGF0ZUhvc3RGaXJzdFN3aXRjaChob3N0Rmlyc3RTd2l0Y2gpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnYWxsTWVtYmVycyBPblNjcmVlbicsIGVycm9yKTtcbiAgICB9XG4gIH07XG59XG4iXX0=