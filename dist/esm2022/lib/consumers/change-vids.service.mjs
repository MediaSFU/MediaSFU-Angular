import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ChangeVids {
    /**
     * Asynchronously changes the video streams based on the provided options.
     *
     * @param {Object} options - The options for changing video streams.
     * @param {boolean} [options.screenChanged=false] - Indicates if the screen has changed.
     * @param {ChangeVidsOptions} options.parameters - The parameters for changing video streams.
     * @returns {Promise<void>} A promise that resolves when the video streams have been changed.
     *
     * @typedef {Object} ChangeVidsOptions
     * @property {Function} getUpdatedAllParams - Function to get updated parameters.
     * @property {Array} allVideoStreams - Array of all video streams.
     * @property {Array} p_activeNames - Array of active participant names.
     * @property {Array} activeNames - Array of active names.
     * @property {Array} dispActiveNames - Array of displayed active names.
     * @property {boolean} shareScreenStarted - Indicates if screen sharing has started.
     * @property {boolean} shared - Indicates if the screen is shared.
     * @property {Array} newLimitedStreams - Array of new limited streams.
     * @property {Array} non_alVideoStreams - Array of non-al video streams.
     * @property {Array} ref_participants - Array of reference participants.
     * @property {Array} participants - Array of participants.
     * @property {string} eventType - Type of the event.
     * @property {string} islevel - Level of the participant.
     * @property {string} member - Name of the member.
     * @property {boolean} sortAudioLoudness - Indicates if audio loudness should be sorted.
     * @property {Array} audioDecibels - Array of audio decibels.
     * @property {Array} mixed_alVideoStreams - Array of mixed al video streams.
     * @property {Array} non_alVideoStreams_muted - Array of muted non-al video streams.
     * @property {string} remoteProducerId - ID of the remote producer.
     * @property {Object} localStreamVideo - Local stream video object.
     * @property {Array} oldAllStreams - Array of old all streams.
     * @property {number} screenPageLimit - Limit of streams per screen page.
     * @property {string} meetingDisplayType - Type of meeting display.
     * @property {boolean} meetingVideoOptimized - Indicates if meeting video is optimized.
     * @property {boolean} recordingVideoOptimized - Indicates if recording video is optimized.
     * @property {string} recordingDisplayType - Type of recording display.
     * @property {Array} paginatedStreams - Array of paginated streams.
     * @property {number} itemPageLimit - Limit of items per page.
     * @property {boolean} doPaginate - Indicates if pagination should be done.
     * @property {boolean} prevDoPaginate - Indicates if pagination was previously done.
     * @property {number} currentUserPage - Current user page number.
     * @property {Array} breakoutRooms - Array of breakout rooms.
     * @property {number} hostNewRoom - Index of the new room for the host.
     * @property {boolean} breakOutRoomStarted - Indicates if breakout room has started.
     * @property {boolean} breakOutRoomEnded - Indicates if breakout room has ended.
     * @property {Object} virtualStream - Virtual stream object.
     * @property {number} mainRoomsLength - Length of main rooms.
     * @property {string} memberRoom - Room of the member.
     * @property {Function} updateP_activeNames - Function to update active participant names.
     * @property {Function} updateActiveNames - Function to update active names.
     * @property {Function} updateDispActiveNames - Function to update displayed active names.
     * @property {Function} updateNewLimitedStreams - Function to update new limited streams.
     * @property {Function} updateNon_alVideoStreams - Function to update non-al video streams.
     * @property {Function} updateRef_participants - Function to update reference participants.
     * @property {Function} updateSortAudioLoudness - Function to update audio loudness sorting.
     * @property {Function} updateMixed_alVideoStreams - Function to update mixed al video streams.
     * @property {Function} updateNon_alVideoStreams_muted - Function to update muted non-al video streams.
     * @property {Function} updatePaginatedStreams - Function to update paginated streams.
     * @property {Function} updateDoPaginate - Function to update pagination status.
     * @property {Function} updatePrevDoPaginate - Function to update previous pagination status.
     * @property {Function} updateCurrentUserPage - Function to update current user page.
     * @property {Function} updateNumberPages - Function to update number of pages.
     * @property {Function} updateMainRoomsLength - Function to update main rooms length.
     * @property {Function} updateMemberRoom - Function to update member room.
     * @property {Function} mixStreams - Function to mix streams.
     * @property {Function} dispStreams - Function to display streams.
     */
    changeVids = async ({ screenChanged = false, parameters }) => {
        let { getUpdatedAllParams } = parameters;
        parameters = getUpdatedAllParams();
        let { allVideoStreams, p_activeNames, activeNames, dispActiveNames, shareScreenStarted, shared, newLimitedStreams, non_alVideoStreams, ref_participants, participants, eventType, islevel, member, sortAudioLoudness, audioDecibels, mixed_alVideoStreams, non_alVideoStreams_muted, remoteProducerId, localStreamVideo, oldAllStreams, screenPageLimit, meetingDisplayType, meetingVideoOptimized, recordingVideoOptimized, recordingDisplayType, paginatedStreams, itemPageLimit, doPaginate, prevDoPaginate, currentUserPage, breakoutRooms, hostNewRoom, breakOutRoomStarted, breakOutRoomEnded, virtualStream, mainRoomsLength, memberRoom, updateP_activeNames, updateActiveNames, updateDispActiveNames, updateNewLimitedStreams, updateNon_alVideoStreams, updateRef_participants, updateSortAudioLoudness, updateMixed_alVideoStreams, updateNon_alVideoStreams_muted, updatePaginatedStreams, updateDoPaginate, updatePrevDoPaginate, updateCurrentUserPage, updateNumberPages, updateMainRoomsLength, updateMemberRoom, 
        // mediasfu functions
        mixStreams, dispStreams, } = parameters;
        try {
            let alVideoStreams = [...allVideoStreams];
            p_activeNames = [...activeNames];
            let streame;
            if (shareScreenStarted || shared) {
                alVideoStreams = [...newLimitedStreams];
                activeNames = [];
            }
            activeNames = [];
            dispActiveNames = [];
            ref_participants = participants;
            let temp = alVideoStreams;
            await Promise.all(temp.map(async (stream) => {
                let participant = ref_participants.find((obj) => obj.videoID === stream.producerId);
                if (!participant && stream.producerId !== 'youyou' && stream.producerId !== 'youyouyou') {
                    alVideoStreams = alVideoStreams.filter((obj) => obj.producerId !== stream.producerId);
                }
            }));
            if (eventType === 'broadcast' || eventType === 'chat') {
                sortAudioLoudness = false;
            }
            if (shareScreenStarted || shared) {
                non_alVideoStreams = [];
                non_alVideoStreams_muted = [];
                mixed_alVideoStreams = [];
            }
            else {
                if (alVideoStreams.length > screenPageLimit) {
                    alVideoStreams = alVideoStreams.filter((obj) => obj.producerId !== 'youyou' && obj.producerId !== 'youyouyou');
                    ref_participants = ref_participants.sort((a, b) => (a.muted ?? false) > (b.muted ?? false) ? 1 : -1);
                    let temp = [];
                    await Promise.all(ref_participants.map((participant) => {
                        let stream = alVideoStreams.find((obj) => obj.producerId === participant.videoID);
                        if (stream) {
                            temp.push(stream);
                        }
                    }));
                    alVideoStreams = temp;
                    let youyou = allVideoStreams.find((obj) => obj.producerId === 'youyou');
                    if (!youyou) {
                        let youyouyou = allVideoStreams.find((obj) => obj.producerId === 'youyouyou');
                        if (youyouyou) {
                            alVideoStreams.unshift(youyouyou);
                        }
                    }
                    else {
                        if (youyou) {
                            alVideoStreams.unshift(youyou);
                        }
                    }
                }
                const admin = participants.filter((participant) => participant.islevel === '2');
                let adminName = '';
                if (admin.length > 0) {
                    adminName = admin[0].name || '';
                }
                non_alVideoStreams = [];
                await Promise.all(ref_participants.map(async (participant) => {
                    let stream = alVideoStreams.find((obj) => obj.producerId === participant.videoID);
                    if (eventType !== 'chat' && eventType !== 'conference') {
                        if (!stream &&
                            participant.name !== member &&
                            !participant['muted'] &&
                            participant.name !== adminName) {
                            non_alVideoStreams.push(participant);
                        }
                    }
                    else {
                        if (!stream && participant.name !== member && !participant['muted']) {
                            non_alVideoStreams.push(participant);
                        }
                    }
                }));
                if (sortAudioLoudness) {
                    non_alVideoStreams.sort((a, b) => {
                        const avgLoudnessA = audioDecibels.find((obj) => obj.name === a.name)?.averageLoudness || 127;
                        const avgLoudnessB = audioDecibels.find((obj) => obj.name === b.name)?.averageLoudness || 127;
                        return avgLoudnessB - avgLoudnessA;
                    });
                    if (!(meetingDisplayType === 'video' && meetingVideoOptimized) ||
                        !(recordingVideoOptimized && recordingDisplayType === 'video')) {
                        mixed_alVideoStreams = await mixStreams({
                            alVideoStreams,
                            non_alVideoStreams,
                            ref_participants,
                        });
                    }
                }
                non_alVideoStreams_muted = [];
                await Promise.all(ref_participants.map(async (participant) => {
                    let stream = alVideoStreams.find((obj) => obj.producerId === participant.videoID);
                    if (eventType !== 'chat' && eventType !== 'conference') {
                        if (!stream &&
                            participant.name !== member &&
                            participant['muted'] &&
                            participant.name !== adminName) {
                            non_alVideoStreams_muted.push(participant);
                        }
                    }
                    else {
                        if (!stream && participant.name !== member && participant['muted']) {
                            non_alVideoStreams_muted.push(participant);
                        }
                    }
                }));
            }
            if (eventType === 'conference' && islevel !== '2') {
                let host = participants.find((obj) => obj.islevel === '2');
                if (host) {
                    if (host.videoID) {
                        remoteProducerId = host.videoID;
                    }
                    if (islevel === '2') {
                        host['stream'] = virtualStream || localStreamVideo;
                    }
                    else {
                        let hostVideo = alVideoStreams.find((obj) => obj.producerId === remoteProducerId);
                        if (!hostVideo) {
                            streame = oldAllStreams.find((streame) => streame.producerId === remoteProducerId);
                            if (streame) {
                                alVideoStreams = alVideoStreams.filter((obj) => obj.producerId !== host.videoID);
                                non_alVideoStreams = non_alVideoStreams.filter((obj) => obj.name !== host.name);
                                non_alVideoStreams_muted = non_alVideoStreams_muted.filter((obj) => obj.name !== host.name);
                                if (sortAudioLoudness) {
                                    mixed_alVideoStreams = mixed_alVideoStreams.filter((obj) => obj.name !== host.name);
                                    non_alVideoStreams_muted = non_alVideoStreams_muted.filter((obj) => obj.name !== host.name);
                                    if (meetingDisplayType == 'video' && meetingVideoOptimized) {
                                        alVideoStreams.unshift(streame);
                                    }
                                    else {
                                        mixed_alVideoStreams.unshift(streame);
                                    }
                                }
                                else {
                                    alVideoStreams.unshift(streame);
                                }
                            }
                            else {
                                await Promise.all(ref_participants.map(async (participant) => {
                                    let stream = alVideoStreams.find((obj) => obj.producerId == participant.videoID && participant.name == host.name);
                                    if (stream) {
                                        if (sortAudioLoudness) {
                                            mixed_alVideoStreams = mixed_alVideoStreams.filter((obj) => obj.name !== host.name);
                                            non_alVideoStreams_muted = non_alVideoStreams_muted.filter((obj) => obj.name !== host.name);
                                            mixed_alVideoStreams.unshift(participant);
                                        }
                                        else {
                                            non_alVideoStreams = non_alVideoStreams.filter((obj) => obj.name !== host.name);
                                            non_alVideoStreams.unshift(participant);
                                            return;
                                        }
                                    }
                                }));
                            }
                        }
                    }
                }
            }
            let allStreamsPaged = [];
            if (sortAudioLoudness) {
                if (meetingDisplayType === 'video') {
                    if (meetingVideoOptimized) {
                        allStreamsPaged = [...alVideoStreams];
                    }
                    else {
                        allStreamsPaged = [...mixed_alVideoStreams];
                    }
                }
                else if (meetingDisplayType === 'media') {
                    allStreamsPaged = [...mixed_alVideoStreams];
                }
                else if (meetingDisplayType === 'all') {
                    allStreamsPaged = [...mixed_alVideoStreams, ...non_alVideoStreams_muted];
                }
            }
            else {
                if (meetingDisplayType === 'video') {
                    allStreamsPaged = [...alVideoStreams];
                }
                else if (meetingDisplayType === 'media') {
                    allStreamsPaged = [...alVideoStreams, ...non_alVideoStreams];
                }
                else if (meetingDisplayType === 'all') {
                    allStreamsPaged = [...alVideoStreams, ...non_alVideoStreams, ...non_alVideoStreams_muted];
                }
            }
            paginatedStreams = [];
            let limit = itemPageLimit;
            if (shareScreenStarted || shared) {
                limit = screenPageLimit;
            }
            let firstPage = [];
            let page = [];
            let limit_ = limit + 1;
            if (eventType === 'conference' && !shared && !shareScreenStarted) {
                limit_ = limit_ - 1;
            }
            // Create pagination
            let memberInRoom = false;
            let filterHost = false;
            if (breakOutRoomStarted && !breakOutRoomEnded) {
                let tempBreakoutRooms = JSON.parse(JSON.stringify(breakoutRooms));
                let host = participants.find((obj) => obj.islevel == '2');
                for (let room of tempBreakoutRooms) {
                    try {
                        let currentStreams = [];
                        const roomIndex = tempBreakoutRooms.indexOf(room);
                        if (hostNewRoom != -1 && roomIndex == hostNewRoom) {
                            if (host) {
                                if (!room.map((obj) => obj.name).includes(host.name)) {
                                    room = [...room, { name: host.name, breakRoom: roomIndex }];
                                    filterHost = true;
                                }
                            }
                        }
                        for (let participant of room) {
                            if (participant.name == member && !memberInRoom) {
                                memberInRoom = true;
                                memberRoom = participant.breakRoom;
                                updateMemberRoom(memberRoom);
                            }
                            let streams = allStreamsPaged.filter((stream) => {
                                if ((Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                                    stream.producerId != null &&
                                    stream.producerId !== '') ||
                                    (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                                        stream['audioID'] != null &&
                                        stream['audioID'] !== '')) {
                                    let producerId = stream.producerId || stream['audioID'];
                                    let matchingParticipant = ref_participants.find((obj) => obj['audioID'] === producerId ||
                                        obj.videoID === producerId ||
                                        ((producerId == 'youyou' || producerId == 'youyouyou') &&
                                            member == participant.name));
                                    return ((matchingParticipant && matchingParticipant.name === participant.name) ||
                                        (participant.name == member &&
                                            (producerId == 'youyou' || producerId == 'youyouyou')));
                                }
                                else {
                                    return (Object.prototype.hasOwnProperty.call(stream, 'name') &&
                                        stream.name == participant.name);
                                }
                            });
                            for (let stream of streams) {
                                if (currentStreams.length < limit_) {
                                    currentStreams.push(stream);
                                }
                            }
                        }
                        paginatedStreams.push(currentStreams);
                    }
                    catch {
                        /* handle error */
                    }
                }
                let remainingStreams = allStreamsPaged.filter((stream) => {
                    if ((Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                        stream.producerId != null &&
                        stream.producerId !== '') ||
                        (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                            stream['audioID'] != null &&
                            stream['audioID'] !== '')) {
                        let producerId = stream.producerId || stream['audioID'];
                        let matchingParticipant = ref_participants.find((obj) => obj['audioID'] === producerId ||
                            obj.videoID === producerId ||
                            ((producerId == 'youyou' || producerId == 'youyouyou') && member == obj.name));
                        return (matchingParticipant &&
                            !breakoutRooms
                                .flat()
                                .map((obj) => obj.name)
                                .includes(matchingParticipant.name) &&
                            (!filterHost || matchingParticipant.name != host?.name));
                    }
                    else {
                        return (!breakoutRooms
                            .flat()
                            .map((obj) => obj.name)
                            .includes(stream.name ?? '') &&
                            (!filterHost || stream.name != host?.name));
                    }
                });
                if (memberInRoom) {
                    let memberStream = allStreamsPaged.find((stream) => {
                        if (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                            stream.producerId != null &&
                            stream.producerId !== '') {
                            return stream.producerId == 'youyou' || stream.producerId == 'youyouyou';
                        }
                        return false; // Add a return statement here
                    });
                    if (memberStream && !remainingStreams.includes(memberStream)) {
                        remainingStreams.unshift(memberStream);
                    }
                }
                let remainingPaginatedStreams = [];
                if (remainingStreams.length > 0) {
                    firstPage = remainingStreams.slice(0, limit_);
                    remainingPaginatedStreams.push(firstPage);
                    for (let i = limit_; i < remainingStreams.length; i += limit) {
                        page = remainingStreams.slice(i, i + limit);
                        remainingPaginatedStreams.push(page);
                    }
                }
                mainRoomsLength = remainingPaginatedStreams.length;
                updateMainRoomsLength(mainRoomsLength);
                // Add the remaining streams to the beginning of the paginatedStreams
                for (let i = remainingPaginatedStreams.length - 1; i >= 0; i--) {
                    paginatedStreams.unshift(remainingPaginatedStreams[i]);
                }
            }
            else {
                firstPage = allStreamsPaged.slice(0, limit_);
                paginatedStreams.push(firstPage);
                for (let i = limit_; i < allStreamsPaged.length; i += limit) {
                    page = allStreamsPaged.slice(i, i + limit);
                    paginatedStreams.push(page);
                }
            }
            // State updates
            updateP_activeNames(p_activeNames);
            updateActiveNames(activeNames);
            updateDispActiveNames(dispActiveNames);
            updateNewLimitedStreams(newLimitedStreams);
            updateNon_alVideoStreams(non_alVideoStreams);
            updateRef_participants(ref_participants);
            updateSortAudioLoudness(sortAudioLoudness);
            updateMixed_alVideoStreams(mixed_alVideoStreams);
            updateNon_alVideoStreams_muted(non_alVideoStreams_muted);
            updatePaginatedStreams(paginatedStreams);
            prevDoPaginate = doPaginate;
            doPaginate = false;
            updatePrevDoPaginate(prevDoPaginate);
            updateDoPaginate(doPaginate);
            let isActive = false;
            if (paginatedStreams.length > 1) {
                if (!shareScreenStarted && !shared) {
                    doPaginate = true;
                }
                updateDoPaginate(doPaginate);
                if (currentUserPage > paginatedStreams.length - 1) {
                    if (breakOutRoomStarted && !breakOutRoomEnded) {
                        currentUserPage = 0;
                    }
                    else {
                        currentUserPage = paginatedStreams.length - 1;
                    }
                }
                else if (currentUserPage == 0) {
                    isActive = true;
                }
                updateCurrentUserPage(currentUserPage);
                updateNumberPages(paginatedStreams.length - 1);
                if (screenChanged) {
                    await dispStreams({
                        lStreams: paginatedStreams[0],
                        ind: 0,
                        parameters,
                    });
                }
                else {
                    await dispStreams({
                        lStreams: paginatedStreams[0],
                        ind: 0,
                        auto: true,
                        parameters,
                    });
                }
                if (!isActive) {
                    const currentPageBreak = currentUserPage - mainRoomsLength;
                    await dispStreams({
                        lStreams: paginatedStreams[currentUserPage],
                        ind: currentUserPage,
                        parameters,
                        breakRoom: currentPageBreak,
                        inBreakRoom: currentPageBreak >= 0,
                    });
                }
            }
            else {
                currentUserPage = 0;
                updateCurrentUserPage(currentUserPage);
                if (screenChanged) {
                    await dispStreams({
                        lStreams: paginatedStreams[0],
                        ind: 0,
                        parameters,
                    });
                }
                else {
                    await dispStreams({
                        lStreams: paginatedStreams[0],
                        ind: 0,
                        auto: true,
                        parameters,
                    });
                }
            }
        }
        catch (error) {
            console.log('changeVids error', error);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ChangeVids, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ChangeVids, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ChangeVids, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLXZpZHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvY2hhbmdlLXZpZHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQXFGM0MsTUFBTSxPQUFPLFVBQVU7SUFDckI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUVHO0lBQ0gsVUFBVSxHQUFHLEtBQUssRUFBRSxFQUFFLGFBQWEsR0FBRyxLQUFLLEVBQUUsVUFBVSxFQUFxQixFQUFpQixFQUFFO1FBQzdGLElBQUksRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUN6QyxVQUFVLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztRQUVuQyxJQUFJLEVBQ0YsZUFBZSxFQUNmLGFBQWEsRUFDYixXQUFXLEVBQ1gsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsWUFBWSxFQUNaLFNBQVMsRUFDVCxPQUFPLEVBQ1AsTUFBTSxFQUNOLGlCQUFpQixFQUNqQixhQUFhLEVBQ2Isb0JBQW9CLEVBQ3BCLHdCQUF3QixFQUN4QixnQkFBZ0IsRUFDaEIsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLHFCQUFxQixFQUNyQix1QkFBdUIsRUFDdkIsb0JBQW9CLEVBQ3BCLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsVUFBVSxFQUNWLGNBQWMsRUFDZCxlQUFlLEVBRWYsYUFBYSxFQUNiLFdBQVcsRUFDWCxtQkFBbUIsRUFDbkIsaUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixlQUFlLEVBQ2YsVUFBVSxFQUVW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TyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDekMsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0EzbEJTLFVBQVU7MkdBQVYsVUFBVSxjQUZULE1BQU07OzJGQUVQLFVBQVU7a0JBSHRCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgU3RyZWFtLFxuICBQYXJ0aWNpcGFudCxcbiAgRGlzcFN0cmVhbXNUeXBlLFxuICBEaXNwU3RyZWFtc1BhcmFtZXRlcnMsXG4gIEF1ZGlvRGVjaWJlbHMsXG4gIE1peFN0cmVhbXNUeXBlLFxuICBCcmVha291dFBhcnRpY2lwYW50LFxuICBFdmVudFR5cGUsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhbmdlVmlkc1BhcmFtZXRlcnMgZXh0ZW5kcyBEaXNwU3RyZWFtc1BhcmFtZXRlcnMge1xuICBhbGxWaWRlb1N0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcbiAgcF9hY3RpdmVOYW1lczogc3RyaW5nW107XG4gIGFjdGl2ZU5hbWVzOiBzdHJpbmdbXTtcbiAgZGlzcEFjdGl2ZU5hbWVzOiBzdHJpbmdbXTtcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBzaGFyZWQ6IGJvb2xlYW47XG4gIG5ld0xpbWl0ZWRTdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIG5vbl9hbFZpZGVvU3RyZWFtczogUGFydGljaXBhbnRbXTtcbiAgcmVmX3BhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBtZW1iZXI6IHN0cmluZztcbiAgc29ydEF1ZGlvTG91ZG5lc3M6IGJvb2xlYW47XG4gIGF1ZGlvRGVjaWJlbHM6IEF1ZGlvRGVjaWJlbHNbXTtcbiAgbWl4ZWRfYWxWaWRlb1N0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcbiAgbm9uX2FsVmlkZW9TdHJlYW1zX211dGVkOiBQYXJ0aWNpcGFudFtdO1xuICByZW1vdGVQcm9kdWNlcklkPzogc3RyaW5nO1xuICBsb2NhbFN0cmVhbVZpZGVvOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIG9sZEFsbFN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcbiAgc2NyZWVuUGFnZUxpbWl0OiBudW1iZXI7XG4gIG1lZXRpbmdEaXNwbGF5VHlwZTogc3RyaW5nO1xuICBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQ6IGJvb2xlYW47XG4gIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkOiBib29sZWFuO1xuICByZWNvcmRpbmdEaXNwbGF5VHlwZTogJ3ZpZGVvJyB8ICdtZWRpYScgfCAnYWxsJztcbiAgcGFnaW5hdGVkU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdW107XG4gIGl0ZW1QYWdlTGltaXQ6IG51bWJlcjtcbiAgZG9QYWdpbmF0ZTogYm9vbGVhbjtcbiAgcHJldkRvUGFnaW5hdGU6IGJvb2xlYW47XG4gIGN1cnJlbnRVc2VyUGFnZTogbnVtYmVyO1xuICBicmVha291dFJvb21zOiBCcmVha291dFBhcnRpY2lwYW50W11bXTtcbiAgaG9zdE5ld1Jvb206IG51bWJlcjtcbiAgYnJlYWtPdXRSb29tU3RhcnRlZDogYm9vbGVhbjtcbiAgYnJlYWtPdXRSb29tRW5kZWQ6IGJvb2xlYW47XG4gIHZpcnR1YWxTdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgbWFpblJvb21zTGVuZ3RoOiBudW1iZXI7XG4gIG1lbWJlclJvb206IG51bWJlcjtcbiAgdXBkYXRlUF9hY3RpdmVOYW1lczogKG5hbWVzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgdXBkYXRlQWN0aXZlTmFtZXM6IChuYW1lczogc3RyaW5nW10pID0+IHZvaWQ7XG4gIHVwZGF0ZURpc3BBY3RpdmVOYW1lczogKG5hbWVzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXM6IChzdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW10pID0+IHZvaWQ7XG4gIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtczogKHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXSkgPT4gdm9pZDtcbiAgdXBkYXRlUmVmX3BhcnRpY2lwYW50czogKHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXSkgPT4gdm9pZDtcbiAgdXBkYXRlU29ydEF1ZGlvTG91ZG5lc3M6IChzb3J0OiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVNaXhlZF9hbFZpZGVvU3RyZWFtczogKHN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSkgPT4gdm9pZDtcbiAgdXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zX211dGVkOiAocGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xuICB1cGRhdGVQYWdpbmF0ZWRTdHJlYW1zOiAoc3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdW10pID0+IHZvaWQ7XG4gIHVwZGF0ZURvUGFnaW5hdGU6IChwYWdpbmF0ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUHJldkRvUGFnaW5hdGU6IChwYWdpbmF0ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQ3VycmVudFVzZXJQYWdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVOdW1iZXJQYWdlczogKHBhZ2VzOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZU1haW5Sb29tc0xlbmd0aDogKGxlbmd0aDogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVNZW1iZXJSb29tOiAocm9vbTogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBtaXhTdHJlYW1zOiBNaXhTdHJlYW1zVHlwZTtcbiAgZGlzcFN0cmVhbXM6IERpc3BTdHJlYW1zVHlwZTtcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gQ2hhbmdlVmlkc1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VWaWRzT3B0aW9ucyB7XG4gIHNjcmVlbkNoYW5nZWQ/OiBib29sZWFuO1xuICBwYXJhbWV0ZXJzOiBDaGFuZ2VWaWRzUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ2hhbmdlVmlkc1R5cGUgPSAob3B0aW9uczogQ2hhbmdlVmlkc09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDaGFuZ2VWaWRzIHtcbiAgLyoqXG4gICAqIEFzeW5jaHJvbm91c2x5IGNoYW5nZXMgdGhlIHZpZGVvIHN0cmVhbXMgYmFzZWQgb24gdGhlIHByb3ZpZGVkIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNoYW5naW5nIHZpZGVvIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuc2NyZWVuQ2hhbmdlZD1mYWxzZV0gLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBoYXMgY2hhbmdlZC5cbiAgICogQHBhcmFtIHtDaGFuZ2VWaWRzT3B0aW9uc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIGNoYW5naW5nIHZpZGVvIHN0cmVhbXMuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB2aWRlbyBzdHJlYW1zIGhhdmUgYmVlbiBjaGFuZ2VkLlxuICAgKlxuICAgKiBAdHlwZWRlZiB7T2JqZWN0fSBDaGFuZ2VWaWRzT3B0aW9uc1xuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBnZXRVcGRhdGVkQWxsUGFyYW1zIC0gRnVuY3Rpb24gdG8gZ2V0IHVwZGF0ZWQgcGFyYW1ldGVycy5cbiAgICogQHByb3BlcnR5IHtBcnJheX0gYWxsVmlkZW9TdHJlYW1zIC0gQXJyYXkgb2YgYWxsIHZpZGVvIHN0cmVhbXMuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHBfYWN0aXZlTmFtZXMgLSBBcnJheSBvZiBhY3RpdmUgcGFydGljaXBhbnQgbmFtZXMuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IGFjdGl2ZU5hbWVzIC0gQXJyYXkgb2YgYWN0aXZlIG5hbWVzLlxuICAgKiBAcHJvcGVydHkge0FycmF5fSBkaXNwQWN0aXZlTmFtZXMgLSBBcnJheSBvZiBkaXNwbGF5ZWQgYWN0aXZlIG5hbWVzLlxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHNoYXJlU2NyZWVuU3RhcnRlZCAtIEluZGljYXRlcyBpZiBzY3JlZW4gc2hhcmluZyBoYXMgc3RhcnRlZC5cbiAgICogQHByb3BlcnR5IHtib29sZWFufSBzaGFyZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHNjcmVlbiBpcyBzaGFyZWQuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IG5ld0xpbWl0ZWRTdHJlYW1zIC0gQXJyYXkgb2YgbmV3IGxpbWl0ZWQgc3RyZWFtcy5cbiAgICogQHByb3BlcnR5IHtBcnJheX0gbm9uX2FsVmlkZW9TdHJlYW1zIC0gQXJyYXkgb2Ygbm9uLWFsIHZpZGVvIHN0cmVhbXMuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHJlZl9wYXJ0aWNpcGFudHMgLSBBcnJheSBvZiByZWZlcmVuY2UgcGFydGljaXBhbnRzLlxuICAgKiBAcHJvcGVydHkge0FycmF5fSBwYXJ0aWNpcGFudHMgLSBBcnJheSBvZiBwYXJ0aWNpcGFudHMuXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBldmVudFR5cGUgLSBUeXBlIG9mIHRoZSBldmVudC5cbiAgICogQHByb3BlcnR5IHtzdHJpbmd9IGlzbGV2ZWwgLSBMZXZlbCBvZiB0aGUgcGFydGljaXBhbnQuXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZW1iZXIgLSBOYW1lIG9mIHRoZSBtZW1iZXIuXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc29ydEF1ZGlvTG91ZG5lc3MgLSBJbmRpY2F0ZXMgaWYgYXVkaW8gbG91ZG5lc3Mgc2hvdWxkIGJlIHNvcnRlZC5cbiAgICogQHByb3BlcnR5IHtBcnJheX0gYXVkaW9EZWNpYmVscyAtIEFycmF5IG9mIGF1ZGlvIGRlY2liZWxzLlxuICAgKiBAcHJvcGVydHkge0FycmF5fSBtaXhlZF9hbFZpZGVvU3RyZWFtcyAtIEFycmF5IG9mIG1peGVkIGFsIHZpZGVvIHN0cmVhbXMuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IG5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZCAtIEFycmF5IG9mIG11dGVkIG5vbi1hbCB2aWRlbyBzdHJlYW1zLlxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gcmVtb3RlUHJvZHVjZXJJZCAtIElEIG9mIHRoZSByZW1vdGUgcHJvZHVjZXIuXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBsb2NhbFN0cmVhbVZpZGVvIC0gTG9jYWwgc3RyZWFtIHZpZGVvIG9iamVjdC5cbiAgICogQHByb3BlcnR5IHtBcnJheX0gb2xkQWxsU3RyZWFtcyAtIEFycmF5IG9mIG9sZCBhbGwgc3RyZWFtcy5cbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IHNjcmVlblBhZ2VMaW1pdCAtIExpbWl0IG9mIHN0cmVhbXMgcGVyIHNjcmVlbiBwYWdlLlxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gbWVldGluZ0Rpc3BsYXlUeXBlIC0gVHlwZSBvZiBtZWV0aW5nIGRpc3BsYXkuXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gbWVldGluZ1ZpZGVvT3B0aW1pemVkIC0gSW5kaWNhdGVzIGlmIG1lZXRpbmcgdmlkZW8gaXMgb3B0aW1pemVkLlxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkIC0gSW5kaWNhdGVzIGlmIHJlY29yZGluZyB2aWRlbyBpcyBvcHRpbWl6ZWQuXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSByZWNvcmRpbmdEaXNwbGF5VHlwZSAtIFR5cGUgb2YgcmVjb3JkaW5nIGRpc3BsYXkuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHBhZ2luYXRlZFN0cmVhbXMgLSBBcnJheSBvZiBwYWdpbmF0ZWQgc3RyZWFtcy5cbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGl0ZW1QYWdlTGltaXQgLSBMaW1pdCBvZiBpdGVtcyBwZXIgcGFnZS5cbiAgICogQHByb3BlcnR5IHtib29sZWFufSBkb1BhZ2luYXRlIC0gSW5kaWNhdGVzIGlmIHBhZ2luYXRpb24gc2hvdWxkIGJlIGRvbmUuXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcHJldkRvUGFnaW5hdGUgLSBJbmRpY2F0ZXMgaWYgcGFnaW5hdGlvbiB3YXMgcHJldmlvdXNseSBkb25lLlxuICAgKiBAcHJvcGVydHkge251bWJlcn0gY3VycmVudFVzZXJQYWdlIC0gQ3VycmVudCB1c2VyIHBhZ2UgbnVtYmVyLlxuICAgKiBAcHJvcGVydHkge0FycmF5fSBicmVha291dFJvb21zIC0gQXJyYXkgb2YgYnJlYWtvdXQgcm9vbXMuXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBob3N0TmV3Um9vbSAtIEluZGV4IG9mIHRoZSBuZXcgcm9vbSBmb3IgdGhlIGhvc3QuXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYnJlYWtPdXRSb29tU3RhcnRlZCAtIEluZGljYXRlcyBpZiBicmVha291dCByb29tIGhhcyBzdGFydGVkLlxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGJyZWFrT3V0Um9vbUVuZGVkIC0gSW5kaWNhdGVzIGlmIGJyZWFrb3V0IHJvb20gaGFzIGVuZGVkLlxuICAgKiBAcHJvcGVydHkge09iamVjdH0gdmlydHVhbFN0cmVhbSAtIFZpcnR1YWwgc3RyZWFtIG9iamVjdC5cbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IG1haW5Sb29tc0xlbmd0aCAtIExlbmd0aCBvZiBtYWluIHJvb21zLlxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gbWVtYmVyUm9vbSAtIFJvb20gb2YgdGhlIG1lbWJlci5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlUF9hY3RpdmVOYW1lcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBhY3RpdmUgcGFydGljaXBhbnQgbmFtZXMuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZUFjdGl2ZU5hbWVzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGFjdGl2ZSBuYW1lcy5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlRGlzcEFjdGl2ZU5hbWVzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGRpc3BsYXllZCBhY3RpdmUgbmFtZXMuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIG5ldyBsaW1pdGVkIHN0cmVhbXMuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBub24tYWwgdmlkZW8gc3RyZWFtcy5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlUmVmX3BhcnRpY2lwYW50cyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSByZWZlcmVuY2UgcGFydGljaXBhbnRzLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVTb3J0QXVkaW9Mb3VkbmVzcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBhdWRpbyBsb3VkbmVzcyBzb3J0aW5nLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVNaXhlZF9hbFZpZGVvU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBtaXhlZCBhbCB2aWRlbyBzdHJlYW1zLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVOb25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgbXV0ZWQgbm9uLWFsIHZpZGVvIHN0cmVhbXMuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZVBhZ2luYXRlZFN0cmVhbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgcGFnaW5hdGVkIHN0cmVhbXMuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZURvUGFnaW5hdGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgcGFnaW5hdGlvbiBzdGF0dXMuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZVByZXZEb1BhZ2luYXRlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHByZXZpb3VzIHBhZ2luYXRpb24gc3RhdHVzLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVDdXJyZW50VXNlclBhZ2UgLSBGdW5jdGlvbiB0byB1cGRhdGUgY3VycmVudCB1c2VyIHBhZ2UuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZU51bWJlclBhZ2VzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIG51bWJlciBvZiBwYWdlcy5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlTWFpblJvb21zTGVuZ3RoIC0gRnVuY3Rpb24gdG8gdXBkYXRlIG1haW4gcm9vbXMgbGVuZ3RoLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVNZW1iZXJSb29tIC0gRnVuY3Rpb24gdG8gdXBkYXRlIG1lbWJlciByb29tLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBtaXhTdHJlYW1zIC0gRnVuY3Rpb24gdG8gbWl4IHN0cmVhbXMuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGRpc3BTdHJlYW1zIC0gRnVuY3Rpb24gdG8gZGlzcGxheSBzdHJlYW1zLlxuICAgKi9cbiAgY2hhbmdlVmlkcyA9IGFzeW5jICh7IHNjcmVlbkNoYW5nZWQgPSBmYWxzZSwgcGFyYW1ldGVycyB9OiBDaGFuZ2VWaWRzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCB7IGdldFVwZGF0ZWRBbGxQYXJhbXMgfSA9IHBhcmFtZXRlcnM7XG4gICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgIGxldCB7XG4gICAgICBhbGxWaWRlb1N0cmVhbXMsXG4gICAgICBwX2FjdGl2ZU5hbWVzLFxuICAgICAgYWN0aXZlTmFtZXMsXG4gICAgICBkaXNwQWN0aXZlTmFtZXMsXG4gICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICBzaGFyZWQsXG4gICAgICBuZXdMaW1pdGVkU3RyZWFtcyxcbiAgICAgIG5vbl9hbFZpZGVvU3RyZWFtcyxcbiAgICAgIHJlZl9wYXJ0aWNpcGFudHMsXG4gICAgICBwYXJ0aWNpcGFudHMsXG4gICAgICBldmVudFR5cGUsXG4gICAgICBpc2xldmVsLFxuICAgICAgbWVtYmVyLFxuICAgICAgc29ydEF1ZGlvTG91ZG5lc3MsXG4gICAgICBhdWRpb0RlY2liZWxzLFxuICAgICAgbWl4ZWRfYWxWaWRlb1N0cmVhbXMsXG4gICAgICBub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQsXG4gICAgICByZW1vdGVQcm9kdWNlcklkLFxuICAgICAgbG9jYWxTdHJlYW1WaWRlbyxcbiAgICAgIG9sZEFsbFN0cmVhbXMsXG4gICAgICBzY3JlZW5QYWdlTGltaXQsXG4gICAgICBtZWV0aW5nRGlzcGxheVR5cGUsXG4gICAgICBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQsXG4gICAgICByZWNvcmRpbmdWaWRlb09wdGltaXplZCxcbiAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgcGFnaW5hdGVkU3RyZWFtcyxcbiAgICAgIGl0ZW1QYWdlTGltaXQsXG4gICAgICBkb1BhZ2luYXRlLFxuICAgICAgcHJldkRvUGFnaW5hdGUsXG4gICAgICBjdXJyZW50VXNlclBhZ2UsXG5cbiAgICAgIGJyZWFrb3V0Um9vbXMsXG4gICAgICBob3N0TmV3Um9vbSxcbiAgICAgIGJyZWFrT3V0Um9vbVN0YXJ0ZWQsXG4gICAgICBicmVha091dFJvb21FbmRlZCxcbiAgICAgIHZpcnR1YWxTdHJlYW0sXG4gICAgICBtYWluUm9vbXNMZW5ndGgsXG4gICAgICBtZW1iZXJSb29tLFxuXG4gICAgICB1cGRhdGVQX2FjdGl2ZU5hbWVzLFxuICAgICAgdXBkYXRlQWN0aXZlTmFtZXMsXG4gICAgICB1cGRhdGVEaXNwQWN0aXZlTmFtZXMsXG4gICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtcyxcbiAgICAgIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtcyxcbiAgICAgIHVwZGF0ZVJlZl9wYXJ0aWNpcGFudHMsXG4gICAgICB1cGRhdGVTb3J0QXVkaW9Mb3VkbmVzcyxcbiAgICAgIHVwZGF0ZU1peGVkX2FsVmlkZW9TdHJlYW1zLFxuICAgICAgdXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zX211dGVkLFxuICAgICAgdXBkYXRlUGFnaW5hdGVkU3RyZWFtcyxcbiAgICAgIHVwZGF0ZURvUGFnaW5hdGUsXG4gICAgICB1cGRhdGVQcmV2RG9QYWdpbmF0ZSxcbiAgICAgIHVwZGF0ZUN1cnJlbnRVc2VyUGFnZSxcbiAgICAgIHVwZGF0ZU51bWJlclBhZ2VzLFxuXG4gICAgICB1cGRhdGVNYWluUm9vbXNMZW5ndGgsXG4gICAgICB1cGRhdGVNZW1iZXJSb29tLFxuXG4gICAgICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgIG1peFN0cmVhbXMsXG4gICAgICBkaXNwU3RyZWFtcyxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIHRyeSB7XG4gICAgICBsZXQgYWxWaWRlb1N0cmVhbXMgPSBbLi4uYWxsVmlkZW9TdHJlYW1zXTtcbiAgICAgIHBfYWN0aXZlTmFtZXMgPSBbLi4uYWN0aXZlTmFtZXNdO1xuXG4gICAgICBsZXQgc3RyZWFtZTtcblxuICAgICAgaWYgKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpIHtcbiAgICAgICAgYWxWaWRlb1N0cmVhbXMgPSBbLi4ubmV3TGltaXRlZFN0cmVhbXNdO1xuICAgICAgICBhY3RpdmVOYW1lcyA9IFtdO1xuICAgICAgfVxuXG4gICAgICBhY3RpdmVOYW1lcyA9IFtdO1xuICAgICAgZGlzcEFjdGl2ZU5hbWVzID0gW107XG4gICAgICByZWZfcGFydGljaXBhbnRzID0gcGFydGljaXBhbnRzO1xuXG4gICAgICBsZXQgdGVtcCA9IGFsVmlkZW9TdHJlYW1zO1xuXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgdGVtcC5tYXAoYXN5bmMgKHN0cmVhbSkgPT4ge1xuICAgICAgICAgIGxldCBwYXJ0aWNpcGFudCA9IHJlZl9wYXJ0aWNpcGFudHMuZmluZCgob2JqKSA9PiBvYmoudmlkZW9JRCA9PT0gc3RyZWFtLnByb2R1Y2VySWQpO1xuICAgICAgICAgIGlmICghcGFydGljaXBhbnQgJiYgc3RyZWFtLnByb2R1Y2VySWQgIT09ICd5b3V5b3UnICYmIHN0cmVhbS5wcm9kdWNlcklkICE9PSAneW91eW91eW91Jykge1xuICAgICAgICAgICAgYWxWaWRlb1N0cmVhbXMgPSBhbFZpZGVvU3RyZWFtcy5maWx0ZXIoKG9iaikgPT4gb2JqLnByb2R1Y2VySWQgIT09IHN0cmVhbS5wcm9kdWNlcklkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ2Jyb2FkY2FzdCcgfHwgZXZlbnRUeXBlID09PSAnY2hhdCcpIHtcbiAgICAgICAgc29ydEF1ZGlvTG91ZG5lc3MgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpIHtcbiAgICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zID0gW107XG4gICAgICAgIG5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZCA9IFtdO1xuICAgICAgICBtaXhlZF9hbFZpZGVvU3RyZWFtcyA9IFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGFsVmlkZW9TdHJlYW1zLmxlbmd0aCA+IHNjcmVlblBhZ2VMaW1pdCkge1xuICAgICAgICAgIGFsVmlkZW9TdHJlYW1zID0gYWxWaWRlb1N0cmVhbXMuZmlsdGVyKFxuICAgICAgICAgICAgKG9iaikgPT4gb2JqLnByb2R1Y2VySWQgIT09ICd5b3V5b3UnICYmIG9iai5wcm9kdWNlcklkICE9PSAneW91eW91eW91JyxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcmVmX3BhcnRpY2lwYW50cyA9IHJlZl9wYXJ0aWNpcGFudHMuc29ydCgoYSwgYikgPT5cbiAgICAgICAgICAgIChhLm11dGVkID8/IGZhbHNlKSA+IChiLm11dGVkID8/IGZhbHNlKSA/IDEgOiAtMSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbGV0IHRlbXA6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSA9IFtdO1xuICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgICAgcmVmX3BhcnRpY2lwYW50cy5tYXAoKHBhcnRpY2lwYW50KSA9PiB7XG4gICAgICAgICAgICAgIGxldCBzdHJlYW0gPSBhbFZpZGVvU3RyZWFtcy5maW5kKChvYmopID0+IG9iai5wcm9kdWNlcklkID09PSBwYXJ0aWNpcGFudC52aWRlb0lEKTtcbiAgICAgICAgICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICAgICAgICAgIHRlbXAucHVzaChzdHJlYW0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgYWxWaWRlb1N0cmVhbXMgPSB0ZW1wO1xuXG4gICAgICAgICAgbGV0IHlvdXlvdSA9IGFsbFZpZGVvU3RyZWFtcy5maW5kKChvYmopID0+IG9iai5wcm9kdWNlcklkID09PSAneW91eW91Jyk7XG4gICAgICAgICAgaWYgKCF5b3V5b3UpIHtcbiAgICAgICAgICAgIGxldCB5b3V5b3V5b3UgPSBhbGxWaWRlb1N0cmVhbXMuZmluZCgob2JqKSA9PiBvYmoucHJvZHVjZXJJZCA9PT0gJ3lvdXlvdXlvdScpO1xuICAgICAgICAgICAgaWYgKHlvdXlvdXlvdSkge1xuICAgICAgICAgICAgICBhbFZpZGVvU3RyZWFtcy51bnNoaWZ0KHlvdXlvdXlvdSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh5b3V5b3UpIHtcbiAgICAgICAgICAgICAgYWxWaWRlb1N0cmVhbXMudW5zaGlmdCh5b3V5b3UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFkbWluID0gcGFydGljaXBhbnRzLmZpbHRlcigocGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50LmlzbGV2ZWwgPT09ICcyJyk7XG4gICAgICAgIGxldCBhZG1pbk5hbWUgPSAnJztcbiAgICAgICAgaWYgKGFkbWluLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBhZG1pbk5hbWUgPSBhZG1pblswXS5uYW1lIHx8ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zID0gW107XG5cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgcmVmX3BhcnRpY2lwYW50cy5tYXAoYXN5bmMgKHBhcnRpY2lwYW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RyZWFtID0gYWxWaWRlb1N0cmVhbXMuZmluZCgob2JqKSA9PiBvYmoucHJvZHVjZXJJZCA9PT0gcGFydGljaXBhbnQudmlkZW9JRCk7XG4gICAgICAgICAgICBpZiAoZXZlbnRUeXBlICE9PSAnY2hhdCcgJiYgZXZlbnRUeXBlICE9PSAnY29uZmVyZW5jZScpIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFzdHJlYW0gJiZcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudC5uYW1lICE9PSBtZW1iZXIgJiZcbiAgICAgICAgICAgICAgICAhcGFydGljaXBhbnRbJ211dGVkJ10gJiZcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudC5uYW1lICE9PSBhZG1pbk5hbWVcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zLnB1c2gocGFydGljaXBhbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIXN0cmVhbSAmJiBwYXJ0aWNpcGFudC5uYW1lICE9PSBtZW1iZXIgJiYgIXBhcnRpY2lwYW50WydtdXRlZCddKSB7XG4gICAgICAgICAgICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zLnB1c2gocGFydGljaXBhbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHNvcnRBdWRpb0xvdWRuZXNzKSB7XG4gICAgICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGF2Z0xvdWRuZXNzQSA9XG4gICAgICAgICAgICAgIGF1ZGlvRGVjaWJlbHMuZmluZCgob2JqKSA9PiBvYmoubmFtZSA9PT0gYS5uYW1lKT8uYXZlcmFnZUxvdWRuZXNzIHx8IDEyNztcbiAgICAgICAgICAgIGNvbnN0IGF2Z0xvdWRuZXNzQiA9XG4gICAgICAgICAgICAgIGF1ZGlvRGVjaWJlbHMuZmluZCgob2JqKSA9PiBvYmoubmFtZSA9PT0gYi5uYW1lKT8uYXZlcmFnZUxvdWRuZXNzIHx8IDEyNztcbiAgICAgICAgICAgIHJldHVybiBhdmdMb3VkbmVzc0IgLSBhdmdMb3VkbmVzc0E7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhKG1lZXRpbmdEaXNwbGF5VHlwZSA9PT0gJ3ZpZGVvJyAmJiBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQpIHx8XG4gICAgICAgICAgICAhKHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkICYmIHJlY29yZGluZ0Rpc3BsYXlUeXBlID09PSAndmlkZW8nKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbWl4ZWRfYWxWaWRlb1N0cmVhbXMgPSBhd2FpdCBtaXhTdHJlYW1zKHtcbiAgICAgICAgICAgICAgYWxWaWRlb1N0cmVhbXMsXG4gICAgICAgICAgICAgIG5vbl9hbFZpZGVvU3RyZWFtcyxcbiAgICAgICAgICAgICAgcmVmX3BhcnRpY2lwYW50cyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZCA9IFtdO1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICByZWZfcGFydGljaXBhbnRzLm1hcChhc3luYyAocGFydGljaXBhbnQpID0+IHtcbiAgICAgICAgICAgIGxldCBzdHJlYW0gPSBhbFZpZGVvU3RyZWFtcy5maW5kKChvYmopID0+IG9iai5wcm9kdWNlcklkID09PSBwYXJ0aWNpcGFudC52aWRlb0lEKTtcbiAgICAgICAgICAgIGlmIChldmVudFR5cGUgIT09ICdjaGF0JyAmJiBldmVudFR5cGUgIT09ICdjb25mZXJlbmNlJykge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIXN0cmVhbSAmJlxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50Lm5hbWUgIT09IG1lbWJlciAmJlxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50WydtdXRlZCddICYmXG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQubmFtZSAhPT0gYWRtaW5OYW1lXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZC5wdXNoKHBhcnRpY2lwYW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFzdHJlYW0gJiYgcGFydGljaXBhbnQubmFtZSAhPT0gbWVtYmVyICYmIHBhcnRpY2lwYW50WydtdXRlZCddKSB7XG4gICAgICAgICAgICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zX211dGVkLnB1c2gocGFydGljaXBhbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudFR5cGUgPT09ICdjb25mZXJlbmNlJyAmJiBpc2xldmVsICE9PSAnMicpIHtcbiAgICAgICAgbGV0IGhvc3QgPSBwYXJ0aWNpcGFudHMuZmluZCgob2JqKSA9PiBvYmouaXNsZXZlbCA9PT0gJzInKTtcbiAgICAgICAgaWYgKGhvc3QpIHtcbiAgICAgICAgICBpZiAoaG9zdC52aWRlb0lEKSB7XG4gICAgICAgICAgICByZW1vdGVQcm9kdWNlcklkID0gaG9zdC52aWRlb0lEO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNsZXZlbCA9PT0gJzInKSB7XG4gICAgICAgICAgICBob3N0WydzdHJlYW0nXSA9IHZpcnR1YWxTdHJlYW0gfHwgbG9jYWxTdHJlYW1WaWRlbztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGhvc3RWaWRlbyA9IGFsVmlkZW9TdHJlYW1zLmZpbmQoKG9iaikgPT4gb2JqLnByb2R1Y2VySWQgPT09IHJlbW90ZVByb2R1Y2VySWQpO1xuICAgICAgICAgICAgaWYgKCFob3N0VmlkZW8pIHtcbiAgICAgICAgICAgICAgc3RyZWFtZSA9IG9sZEFsbFN0cmVhbXMuZmluZCgoc3RyZWFtZSkgPT4gc3RyZWFtZS5wcm9kdWNlcklkID09PSByZW1vdGVQcm9kdWNlcklkKTtcbiAgICAgICAgICAgICAgaWYgKHN0cmVhbWUpIHtcbiAgICAgICAgICAgICAgICBhbFZpZGVvU3RyZWFtcyA9IGFsVmlkZW9TdHJlYW1zLmZpbHRlcigob2JqKSA9PiBvYmoucHJvZHVjZXJJZCAhPT0gaG9zdC52aWRlb0lEKTtcbiAgICAgICAgICAgICAgICBub25fYWxWaWRlb1N0cmVhbXMgPSBub25fYWxWaWRlb1N0cmVhbXMuZmlsdGVyKChvYmopID0+IG9iai5uYW1lICE9PSBob3N0Lm5hbWUpO1xuICAgICAgICAgICAgICAgIG5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZCA9IG5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAob2JqKSA9PiBvYmoubmFtZSAhPT0gaG9zdC5uYW1lLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKHNvcnRBdWRpb0xvdWRuZXNzKSB7XG4gICAgICAgICAgICAgICAgICBtaXhlZF9hbFZpZGVvU3RyZWFtcyA9IG1peGVkX2FsVmlkZW9TdHJlYW1zLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgKG9iaikgPT4gb2JqLm5hbWUgIT09IGhvc3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQgPSBub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAob2JqKSA9PiBvYmoubmFtZSAhPT0gaG9zdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIGlmIChtZWV0aW5nRGlzcGxheVR5cGUgPT0gJ3ZpZGVvJyAmJiBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxWaWRlb1N0cmVhbXMudW5zaGlmdChzdHJlYW1lKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1peGVkX2FsVmlkZW9TdHJlYW1zLnVuc2hpZnQoc3RyZWFtZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGFsVmlkZW9TdHJlYW1zLnVuc2hpZnQoc3RyZWFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICAgICAgcmVmX3BhcnRpY2lwYW50cy5tYXAoYXN5bmMgKHBhcnRpY2lwYW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHJlYW0gPSBhbFZpZGVvU3RyZWFtcy5maW5kKFxuICAgICAgICAgICAgICAgICAgICAgIChvYmopID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvZHVjZXJJZCA9PSBwYXJ0aWNpcGFudC52aWRlb0lEICYmIHBhcnRpY2lwYW50Lm5hbWUgPT0gaG9zdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHNvcnRBdWRpb0xvdWRuZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaXhlZF9hbFZpZGVvU3RyZWFtcyA9IG1peGVkX2FsVmlkZW9TdHJlYW1zLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKG9iaikgPT4gb2JqLm5hbWUgIT09IGhvc3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQgPSBub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAob2JqKSA9PiBvYmoubmFtZSAhPT0gaG9zdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1peGVkX2FsVmlkZW9TdHJlYW1zLnVuc2hpZnQocGFydGljaXBhbnQpO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub25fYWxWaWRlb1N0cmVhbXMgPSBub25fYWxWaWRlb1N0cmVhbXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAob2JqKSA9PiBvYmoubmFtZSAhPT0gaG9zdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vbl9hbFZpZGVvU3RyZWFtcy51bnNoaWZ0KHBhcnRpY2lwYW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGFsbFN0cmVhbXNQYWdlZDogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdID0gW107XG4gICAgICBpZiAoc29ydEF1ZGlvTG91ZG5lc3MpIHtcbiAgICAgICAgaWYgKG1lZXRpbmdEaXNwbGF5VHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIGlmIChtZWV0aW5nVmlkZW9PcHRpbWl6ZWQpIHtcbiAgICAgICAgICAgIGFsbFN0cmVhbXNQYWdlZCA9IFsuLi5hbFZpZGVvU3RyZWFtc107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsbFN0cmVhbXNQYWdlZCA9IFsuLi5taXhlZF9hbFZpZGVvU3RyZWFtc107XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1lZXRpbmdEaXNwbGF5VHlwZSA9PT0gJ21lZGlhJykge1xuICAgICAgICAgIGFsbFN0cmVhbXNQYWdlZCA9IFsuLi5taXhlZF9hbFZpZGVvU3RyZWFtc107XG4gICAgICAgIH0gZWxzZSBpZiAobWVldGluZ0Rpc3BsYXlUeXBlID09PSAnYWxsJykge1xuICAgICAgICAgIGFsbFN0cmVhbXNQYWdlZCA9IFsuLi5taXhlZF9hbFZpZGVvU3RyZWFtcywgLi4ubm9uX2FsVmlkZW9TdHJlYW1zX211dGVkXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1lZXRpbmdEaXNwbGF5VHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIGFsbFN0cmVhbXNQYWdlZCA9IFsuLi5hbFZpZGVvU3RyZWFtc107XG4gICAgICAgIH0gZWxzZSBpZiAobWVldGluZ0Rpc3BsYXlUeXBlID09PSAnbWVkaWEnKSB7XG4gICAgICAgICAgYWxsU3RyZWFtc1BhZ2VkID0gWy4uLmFsVmlkZW9TdHJlYW1zLCAuLi5ub25fYWxWaWRlb1N0cmVhbXNdO1xuICAgICAgICB9IGVsc2UgaWYgKG1lZXRpbmdEaXNwbGF5VHlwZSA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICBhbGxTdHJlYW1zUGFnZWQgPSBbLi4uYWxWaWRlb1N0cmVhbXMsIC4uLm5vbl9hbFZpZGVvU3RyZWFtcywgLi4ubm9uX2FsVmlkZW9TdHJlYW1zX211dGVkXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwYWdpbmF0ZWRTdHJlYW1zID0gW107XG4gICAgICBsZXQgbGltaXQgPSBpdGVtUGFnZUxpbWl0O1xuXG4gICAgICBpZiAoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkge1xuICAgICAgICBsaW1pdCA9IHNjcmVlblBhZ2VMaW1pdDtcbiAgICAgIH1cblxuICAgICAgbGV0IGZpcnN0UGFnZTogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdID0gW107XG4gICAgICBsZXQgcGFnZTogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdID0gW107XG4gICAgICBsZXQgbGltaXRfID0gbGltaXQgKyAxO1xuXG4gICAgICBpZiAoZXZlbnRUeXBlID09PSAnY29uZmVyZW5jZScgJiYgIXNoYXJlZCAmJiAhc2hhcmVTY3JlZW5TdGFydGVkKSB7XG4gICAgICAgIGxpbWl0XyA9IGxpbWl0XyAtIDE7XG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSBwYWdpbmF0aW9uXG4gICAgICBsZXQgbWVtYmVySW5Sb29tID0gZmFsc2U7XG4gICAgICBsZXQgZmlsdGVySG9zdCA9IGZhbHNlO1xuICAgICAgaWYgKGJyZWFrT3V0Um9vbVN0YXJ0ZWQgJiYgIWJyZWFrT3V0Um9vbUVuZGVkKSB7XG4gICAgICAgIGxldCB0ZW1wQnJlYWtvdXRSb29tcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYnJlYWtvdXRSb29tcykpO1xuICAgICAgICBsZXQgaG9zdCA9IHBhcnRpY2lwYW50cy5maW5kKChvYmopID0+IG9iai5pc2xldmVsID09ICcyJyk7XG4gICAgICAgIGZvciAobGV0IHJvb20gb2YgdGVtcEJyZWFrb3V0Um9vbXMpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRTdHJlYW1zID0gW107XG4gICAgICAgICAgICBjb25zdCByb29tSW5kZXggPSB0ZW1wQnJlYWtvdXRSb29tcy5pbmRleE9mKHJvb20pO1xuICAgICAgICAgICAgaWYgKGhvc3ROZXdSb29tICE9IC0xICYmIHJvb21JbmRleCA9PSBob3N0TmV3Um9vbSkge1xuICAgICAgICAgICAgICBpZiAoaG9zdCkge1xuICAgICAgICAgICAgICAgIGlmICghcm9vbS5tYXAoKG9iajogYW55KSA9PiBvYmoubmFtZSkuaW5jbHVkZXMoaG9zdC5uYW1lKSkge1xuICAgICAgICAgICAgICAgICAgcm9vbSA9IFsuLi5yb29tLCB7IG5hbWU6IGhvc3QubmFtZSwgYnJlYWtSb29tOiByb29tSW5kZXggfV07XG4gICAgICAgICAgICAgICAgICBmaWx0ZXJIb3N0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IHBhcnRpY2lwYW50IG9mIHJvb20pIHtcbiAgICAgICAgICAgICAgaWYgKHBhcnRpY2lwYW50Lm5hbWUgPT0gbWVtYmVyICYmICFtZW1iZXJJblJvb20pIHtcbiAgICAgICAgICAgICAgICBtZW1iZXJJblJvb20gPSB0cnVlO1xuICAgICAgICAgICAgICAgIG1lbWJlclJvb20gPSBwYXJ0aWNpcGFudC5icmVha1Jvb207XG4gICAgICAgICAgICAgICAgdXBkYXRlTWVtYmVyUm9vbShtZW1iZXJSb29tKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsZXQgc3RyZWFtcyA9IGFsbFN0cmVhbXNQYWdlZC5maWx0ZXIoKHN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAncHJvZHVjZXJJZCcpICYmXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT09ICcnKSB8fFxuICAgICAgICAgICAgICAgICAgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdhdWRpb0lEJykgJiZcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtWydhdWRpb0lEJ10gIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICBzdHJlYW1bJ2F1ZGlvSUQnXSAhPT0gJycpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgcHJvZHVjZXJJZCA9IHN0cmVhbS5wcm9kdWNlcklkIHx8IHN0cmVhbVsnYXVkaW9JRCddO1xuICAgICAgICAgICAgICAgICAgbGV0IG1hdGNoaW5nUGFydGljaXBhbnQgPSByZWZfcGFydGljaXBhbnRzLmZpbmQoXG4gICAgICAgICAgICAgICAgICAgIChvYmopID0+XG4gICAgICAgICAgICAgICAgICAgICAgb2JqWydhdWRpb0lEJ10gPT09IHByb2R1Y2VySWQgfHxcbiAgICAgICAgICAgICAgICAgICAgICBvYmoudmlkZW9JRCA9PT0gcHJvZHVjZXJJZCB8fFxuICAgICAgICAgICAgICAgICAgICAgICgocHJvZHVjZXJJZCA9PSAneW91eW91JyB8fCBwcm9kdWNlcklkID09ICd5b3V5b3V5b3UnKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbWVtYmVyID09IHBhcnRpY2lwYW50Lm5hbWUpLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIChtYXRjaGluZ1BhcnRpY2lwYW50ICYmIG1hdGNoaW5nUGFydGljaXBhbnQubmFtZSA9PT0gcGFydGljaXBhbnQubmFtZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgKHBhcnRpY2lwYW50Lm5hbWUgPT0gbWVtYmVyICYmXG4gICAgICAgICAgICAgICAgICAgICAgKHByb2R1Y2VySWQgPT0gJ3lvdXlvdScgfHwgcHJvZHVjZXJJZCA9PSAneW91eW91eW91JykpXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAnbmFtZScpICYmXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbS5uYW1lID09IHBhcnRpY2lwYW50Lm5hbWVcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgc3RyZWFtIG9mIHN0cmVhbXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFN0cmVhbXMubGVuZ3RoIDwgbGltaXRfKSB7XG4gICAgICAgICAgICAgICAgICBjdXJyZW50U3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWdpbmF0ZWRTdHJlYW1zLnB1c2goY3VycmVudFN0cmVhbXMpO1xuICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlbWFpbmluZ1N0cmVhbXMgPSBhbGxTdHJlYW1zUGFnZWQuZmlsdGVyKChzdHJlYW0pID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9PSAnJykgfHxcbiAgICAgICAgICAgIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAnYXVkaW9JRCcpICYmXG4gICAgICAgICAgICAgIHN0cmVhbVsnYXVkaW9JRCddICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtWydhdWRpb0lEJ10gIT09ICcnKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbGV0IHByb2R1Y2VySWQgPSBzdHJlYW0ucHJvZHVjZXJJZCB8fCBzdHJlYW1bJ2F1ZGlvSUQnXTtcbiAgICAgICAgICAgIGxldCBtYXRjaGluZ1BhcnRpY2lwYW50ID0gcmVmX3BhcnRpY2lwYW50cy5maW5kKFxuICAgICAgICAgICAgICAob2JqKSA9PlxuICAgICAgICAgICAgICAgIG9ialsnYXVkaW9JRCddID09PSBwcm9kdWNlcklkIHx8XG4gICAgICAgICAgICAgICAgb2JqLnZpZGVvSUQgPT09IHByb2R1Y2VySWQgfHxcbiAgICAgICAgICAgICAgICAoKHByb2R1Y2VySWQgPT0gJ3lvdXlvdScgfHwgcHJvZHVjZXJJZCA9PSAneW91eW91eW91JykgJiYgbWVtYmVyID09IG9iai5uYW1lKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICBtYXRjaGluZ1BhcnRpY2lwYW50ICYmXG4gICAgICAgICAgICAgICFicmVha291dFJvb21zXG4gICAgICAgICAgICAgICAgLmZsYXQoKVxuICAgICAgICAgICAgICAgIC5tYXAoKG9iaikgPT4gb2JqLm5hbWUpXG4gICAgICAgICAgICAgICAgLmluY2x1ZGVzKG1hdGNoaW5nUGFydGljaXBhbnQubmFtZSkgJiZcbiAgICAgICAgICAgICAgKCFmaWx0ZXJIb3N0IHx8IG1hdGNoaW5nUGFydGljaXBhbnQubmFtZSAhPSBob3N0Py5uYW1lKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgIWJyZWFrb3V0Um9vbXNcbiAgICAgICAgICAgICAgICAuZmxhdCgpXG4gICAgICAgICAgICAgICAgLm1hcCgob2JqKSA9PiBvYmoubmFtZSlcbiAgICAgICAgICAgICAgICAuaW5jbHVkZXMoc3RyZWFtLm5hbWUgPz8gJycpICYmXG4gICAgICAgICAgICAgICghZmlsdGVySG9zdCB8fCBzdHJlYW0ubmFtZSAhPSBob3N0Py5uYW1lKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtZW1iZXJJblJvb20pIHtcbiAgICAgICAgICBsZXQgbWVtYmVyU3RyZWFtID0gYWxsU3RyZWFtc1BhZ2VkLmZpbmQoKHN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAncHJvZHVjZXJJZCcpICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT09ICcnXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHN0cmVhbS5wcm9kdWNlcklkID09ICd5b3V5b3UnIHx8IHN0cmVhbS5wcm9kdWNlcklkID09ICd5b3V5b3V5b3UnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBBZGQgYSByZXR1cm4gc3RhdGVtZW50IGhlcmVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAobWVtYmVyU3RyZWFtICYmICFyZW1haW5pbmdTdHJlYW1zLmluY2x1ZGVzKG1lbWJlclN0cmVhbSkpIHtcbiAgICAgICAgICAgIHJlbWFpbmluZ1N0cmVhbXMudW5zaGlmdChtZW1iZXJTdHJlYW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVtYWluaW5nUGFnaW5hdGVkU3RyZWFtcyA9IFtdO1xuXG4gICAgICAgIGlmIChyZW1haW5pbmdTdHJlYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmaXJzdFBhZ2UgPSByZW1haW5pbmdTdHJlYW1zLnNsaWNlKDAsIGxpbWl0Xyk7XG4gICAgICAgICAgcmVtYWluaW5nUGFnaW5hdGVkU3RyZWFtcy5wdXNoKGZpcnN0UGFnZSk7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGxpbWl0XzsgaSA8IHJlbWFpbmluZ1N0cmVhbXMubGVuZ3RoOyBpICs9IGxpbWl0KSB7XG4gICAgICAgICAgICBwYWdlID0gcmVtYWluaW5nU3RyZWFtcy5zbGljZShpLCBpICsgbGltaXQpO1xuICAgICAgICAgICAgcmVtYWluaW5nUGFnaW5hdGVkU3RyZWFtcy5wdXNoKHBhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1haW5Sb29tc0xlbmd0aCA9IHJlbWFpbmluZ1BhZ2luYXRlZFN0cmVhbXMubGVuZ3RoO1xuICAgICAgICB1cGRhdGVNYWluUm9vbXNMZW5ndGgobWFpblJvb21zTGVuZ3RoKTtcbiAgICAgICAgLy8gQWRkIHRoZSByZW1haW5pbmcgc3RyZWFtcyB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBwYWdpbmF0ZWRTdHJlYW1zXG4gICAgICAgIGZvciAobGV0IGkgPSByZW1haW5pbmdQYWdpbmF0ZWRTdHJlYW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgcGFnaW5hdGVkU3RyZWFtcy51bnNoaWZ0KHJlbWFpbmluZ1BhZ2luYXRlZFN0cmVhbXNbaV0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaXJzdFBhZ2UgPSBhbGxTdHJlYW1zUGFnZWQuc2xpY2UoMCwgbGltaXRfKTtcbiAgICAgICAgcGFnaW5hdGVkU3RyZWFtcy5wdXNoKGZpcnN0UGFnZSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGxpbWl0XzsgaSA8IGFsbFN0cmVhbXNQYWdlZC5sZW5ndGg7IGkgKz0gbGltaXQpIHtcbiAgICAgICAgICBwYWdlID0gYWxsU3RyZWFtc1BhZ2VkLnNsaWNlKGksIGkgKyBsaW1pdCk7XG4gICAgICAgICAgcGFnaW5hdGVkU3RyZWFtcy5wdXNoKHBhZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFN0YXRlIHVwZGF0ZXNcbiAgICAgIHVwZGF0ZVBfYWN0aXZlTmFtZXMocF9hY3RpdmVOYW1lcyk7XG4gICAgICB1cGRhdGVBY3RpdmVOYW1lcyhhY3RpdmVOYW1lcyk7XG4gICAgICB1cGRhdGVEaXNwQWN0aXZlTmFtZXMoZGlzcEFjdGl2ZU5hbWVzKTtcbiAgICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zKG5ld0xpbWl0ZWRTdHJlYW1zKTtcbiAgICAgIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtcyhub25fYWxWaWRlb1N0cmVhbXMpO1xuICAgICAgdXBkYXRlUmVmX3BhcnRpY2lwYW50cyhyZWZfcGFydGljaXBhbnRzKTtcbiAgICAgIHVwZGF0ZVNvcnRBdWRpb0xvdWRuZXNzKHNvcnRBdWRpb0xvdWRuZXNzKTtcbiAgICAgIHVwZGF0ZU1peGVkX2FsVmlkZW9TdHJlYW1zKG1peGVkX2FsVmlkZW9TdHJlYW1zKTtcbiAgICAgIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZChub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQpO1xuICAgICAgdXBkYXRlUGFnaW5hdGVkU3RyZWFtcyhwYWdpbmF0ZWRTdHJlYW1zKTtcblxuICAgICAgcHJldkRvUGFnaW5hdGUgPSBkb1BhZ2luYXRlO1xuICAgICAgZG9QYWdpbmF0ZSA9IGZhbHNlO1xuICAgICAgdXBkYXRlUHJldkRvUGFnaW5hdGUocHJldkRvUGFnaW5hdGUpO1xuICAgICAgdXBkYXRlRG9QYWdpbmF0ZShkb1BhZ2luYXRlKTtcblxuICAgICAgbGV0IGlzQWN0aXZlID0gZmFsc2U7XG5cbiAgICAgIGlmIChwYWdpbmF0ZWRTdHJlYW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgaWYgKCFzaGFyZVNjcmVlblN0YXJ0ZWQgJiYgIXNoYXJlZCkge1xuICAgICAgICAgIGRvUGFnaW5hdGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZURvUGFnaW5hdGUoZG9QYWdpbmF0ZSk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyUGFnZSA+IHBhZ2luYXRlZFN0cmVhbXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGlmIChicmVha091dFJvb21TdGFydGVkICYmICFicmVha091dFJvb21FbmRlZCkge1xuICAgICAgICAgICAgY3VycmVudFVzZXJQYWdlID0gMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudFVzZXJQYWdlID0gcGFnaW5hdGVkU3RyZWFtcy5sZW5ndGggLSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50VXNlclBhZ2UgPT0gMCkge1xuICAgICAgICAgIGlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVDdXJyZW50VXNlclBhZ2UoY3VycmVudFVzZXJQYWdlKTtcbiAgICAgICAgdXBkYXRlTnVtYmVyUGFnZXMocGFnaW5hdGVkU3RyZWFtcy5sZW5ndGggLSAxKTtcblxuICAgICAgICBpZiAoc2NyZWVuQ2hhbmdlZCkge1xuICAgICAgICAgIGF3YWl0IGRpc3BTdHJlYW1zKHtcbiAgICAgICAgICAgIGxTdHJlYW1zOiBwYWdpbmF0ZWRTdHJlYW1zWzBdLFxuICAgICAgICAgICAgaW5kOiAwLFxuICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCBkaXNwU3RyZWFtcyh7XG4gICAgICAgICAgICBsU3RyZWFtczogcGFnaW5hdGVkU3RyZWFtc1swXSxcbiAgICAgICAgICAgIGluZDogMCxcbiAgICAgICAgICAgIGF1dG86IHRydWUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlQnJlYWsgPSBjdXJyZW50VXNlclBhZ2UgLSBtYWluUm9vbXNMZW5ndGg7XG4gICAgICAgICAgYXdhaXQgZGlzcFN0cmVhbXMoe1xuICAgICAgICAgICAgbFN0cmVhbXM6IHBhZ2luYXRlZFN0cmVhbXNbY3VycmVudFVzZXJQYWdlXSxcbiAgICAgICAgICAgIGluZDogY3VycmVudFVzZXJQYWdlLFxuICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICAgIGJyZWFrUm9vbTogY3VycmVudFBhZ2VCcmVhayxcbiAgICAgICAgICAgIGluQnJlYWtSb29tOiBjdXJyZW50UGFnZUJyZWFrID49IDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnRVc2VyUGFnZSA9IDA7XG4gICAgICAgIHVwZGF0ZUN1cnJlbnRVc2VyUGFnZShjdXJyZW50VXNlclBhZ2UpO1xuXG4gICAgICAgIGlmIChzY3JlZW5DaGFuZ2VkKSB7XG4gICAgICAgICAgYXdhaXQgZGlzcFN0cmVhbXMoe1xuICAgICAgICAgICAgbFN0cmVhbXM6IHBhZ2luYXRlZFN0cmVhbXNbMF0sXG4gICAgICAgICAgICBpbmQ6IDAsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IGRpc3BTdHJlYW1zKHtcbiAgICAgICAgICAgIGxTdHJlYW1zOiBwYWdpbmF0ZWRTdHJlYW1zWzBdLFxuICAgICAgICAgICAgaW5kOiAwLFxuICAgICAgICAgICAgYXV0bzogdHJ1ZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ2NoYW5nZVZpZHMgZXJyb3InLCBlcnJvcik7XG4gICAgfVxuICB9O1xufVxuIl19