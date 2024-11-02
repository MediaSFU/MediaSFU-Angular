import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
 *
 *
 * @example
 * ```typescript
 * await changeVidsService.changeVids({
 *   screenChanged: true,
 *   parameters: {
 *     allVideoStreams: [], // Your array of video streams
 *     p_activeNames: [], // Active participant names
 *     activeNames: [], // Names of active streams
 *     dispActiveNames: [], // Names of displayed active streams
 *     shareScreenStarted: false,
 *     shared: false,
 *     newLimitedStreams: [], // New limited streams
 *     non_alVideoStreams: [], // Non-audio video streams
 *     ref_participants: [], // Reference participants
 *     participants: [], // All participants
 *     eventType: 'conference', // Type of event
 *     islevel: '1', // Level of the participant
 *     member: 'John Doe', // Member's name
 *     sortAudioLoudness: true,
 *     audioDecibels: [], // Audio decibel levels
 *     mixed_alVideoStreams: [], // Mixed audio/video streams
 *     non_alVideoStreams_muted: [], // Muted non-audio video streams
 *     remoteProducerId: 'abc123',
 *     localStreamVideo: null, // Local video stream
 *     oldAllStreams: [], // Previous streams
 *     screenPageLimit: 4, // Limit of streams per screen
 *     meetingDisplayType: 'grid', // Type of display
 *     meetingVideoOptimized: true, // Video optimization status
 *     recordingVideoOptimized: false, // Recording optimization status
 *     recordingDisplayType: 'video', // Recording display type
 *     paginatedStreams: [], // Paginated streams
 *     itemPageLimit: 2, // Items per page limit
 *     doPaginate: true, // Pagination flag
 *     prevDoPaginate: false, // Previous pagination state
 *     currentUserPage: 1, // Current page number
 *     breakoutRooms: [], // Breakout room information
 *     hostNewRoom: 0, // Host room number
 *     breakOutRoomStarted: false, // Breakout room status
 *     breakOutRoomEnded: false, // Breakout room end status
 *     virtualStream: null, // Virtual stream
 *     mainRoomsLength: 3, // Number of main rooms
 *     memberRoom: 1, // Member's room number
 *     updateP_activeNames: (names) => {}, // Update function for active names
 *     updateActiveNames: (names) => {}, // Update function for all names
 *     updateDispActiveNames: (names) => {}, // Update function for displayed names
 *     updateNewLimitedStreams: (streams) => {}, // Update function for limited streams
 *     updateNon_alVideoStreams: (participants) => {}, // Update function for non-audio streams
 *     updateRef_participants: (participants) => {}, // Update function for reference participants
 *     updateSortAudioLoudness: (sort) => {}, // Update function for sorting audio
 *     updateMixed_alVideoStreams: (streams) => {}, // Update function for mixed streams
 *     updateNon_alVideoStreams_muted: (participants) => {}, // Update function for muted streams
 *     updatePaginatedStreams: (streams) => {}, // Update function for paginated streams
 *     updateDoPaginate: (paginate) => {}, // Update function for pagination
 *     updatePrevDoPaginate: (paginate) => {}, // Update function for previous pagination
 *     updateCurrentUserPage: (page) => {}, // Update function for current page
 *     updateNumberPages: (pages) => {}, // Update function for number of pages
 *     updateMainRoomsLength: (length) => {}, // Update function for main room length
 *     updateMemberRoom: (room) => {}, // Update function for member's room
 *     mixStreams: async ({ streams, displayType }) => {}, // Function to mix streams
 *     dispStreams: async ({ streams, displayType }) => {}, // Function to display streams
 *   },
 * });
 * ```
 */
export class ChangeVids {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhbmdlLXZpZHMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvY2hhbmdlLXZpZHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWtGekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FrSUc7QUFJTCxNQUFNLE9BQU8sVUFBVTtJQUVyQixVQUFVLEdBQUcsS0FBSyxFQUFFLEVBQUUsYUFBYSxHQUFHLEtBQUssRUFBRSxVQUFVLEVBQXFCLEVBQWlCLEVBQUU7UUFDN0YsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBRW5DLElBQUksRUFDRixlQUFlLEVBQ2YsYUFBYSxFQUNiLFdBQVcsRUFDWCxlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLE1BQU0sRUFDTixpQkFBaUIsRUFDakIsa0JBQWtCLEVBQ2xCLGdCQUFnQixFQUNoQixZQUFZLEVBQ1osU0FBUyxFQUNULE9BQU8sRUFDUCxNQUFNLEVBQ04saUJBQWlCLEVBQ2pCLGFBQWEsRUFDYixvQkFBb0IsRUFDcEIsd0JBQXdCLEVBQ3hCLGdCQUFnQixFQUNoQixnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIscUJBQXFCLEVBQ3JCLHVCQUF1QixFQUN2QixvQkFBb0IsRUFDcEIsZ0JBQWdCLEVBQ2hCLGFBQWEsRUFDYixVQUFVLEVBQ1YsY0FBYyxFQUNkLGVBQWUsRUFFZixhQUFhLEVBQ2Is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QkFDVixVQUFVO3FCQUNYLENBQUMsQ0FBQztnQkFDTCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN6QyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQTFoQlMsVUFBVTsyR0FBVixVQUFVLGNBRlQsTUFBTTs7MkZBRVAsVUFBVTtrQkFIdEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBTdHJlYW0sXG4gIFBhcnRpY2lwYW50LFxuICBEaXNwU3RyZWFtc1R5cGUsXG4gIERpc3BTdHJlYW1zUGFyYW1ldGVycyxcbiAgQXVkaW9EZWNpYmVscyxcbiAgTWl4U3RyZWFtc1R5cGUsXG4gIEJyZWFrb3V0UGFydGljaXBhbnQsXG4gIEV2ZW50VHlwZSxcbn0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBDaGFuZ2VWaWRzUGFyYW1ldGVycyBleHRlbmRzIERpc3BTdHJlYW1zUGFyYW1ldGVycyB7XG4gIGFsbFZpZGVvU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBwX2FjdGl2ZU5hbWVzOiBzdHJpbmdbXTtcbiAgYWN0aXZlTmFtZXM6IHN0cmluZ1tdO1xuICBkaXNwQWN0aXZlTmFtZXM6IHN0cmluZ1tdO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgbmV3TGltaXRlZFN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcbiAgbm9uX2FsVmlkZW9TdHJlYW1zOiBQYXJ0aWNpcGFudFtdO1xuICByZWZfcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIG1lbWJlcjogc3RyaW5nO1xuICBzb3J0QXVkaW9Mb3VkbmVzczogYm9vbGVhbjtcbiAgYXVkaW9EZWNpYmVsczogQXVkaW9EZWNpYmVsc1tdO1xuICBtaXhlZF9hbFZpZGVvU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQ6IFBhcnRpY2lwYW50W107XG4gIHJlbW90ZVByb2R1Y2VySWQ/OiBzdHJpbmc7XG4gIGxvY2FsU3RyZWFtVmlkZW86IE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgb2xkQWxsU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBzY3JlZW5QYWdlTGltaXQ6IG51bWJlcjtcbiAgbWVldGluZ0Rpc3BsYXlUeXBlOiBzdHJpbmc7XG4gIG1lZXRpbmdWaWRlb09wdGltaXplZDogYm9vbGVhbjtcbiAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQ6IGJvb2xlYW47XG4gIHJlY29yZGluZ0Rpc3BsYXlUeXBlOiAndmlkZW8nIHwgJ21lZGlhJyB8ICdhbGwnO1xuICBwYWdpbmF0ZWRTdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW11bXTtcbiAgaXRlbVBhZ2VMaW1pdDogbnVtYmVyO1xuICBkb1BhZ2luYXRlOiBib29sZWFuO1xuICBwcmV2RG9QYWdpbmF0ZTogYm9vbGVhbjtcbiAgY3VycmVudFVzZXJQYWdlOiBudW1iZXI7XG4gIGJyZWFrb3V0Um9vbXM6IEJyZWFrb3V0UGFydGljaXBhbnRbXVtdO1xuICBob3N0TmV3Um9vbTogbnVtYmVyO1xuICBicmVha091dFJvb21TdGFydGVkOiBib29sZWFuO1xuICBicmVha091dFJvb21FbmRlZDogYm9vbGVhbjtcbiAgdmlydHVhbFN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsO1xuICBtYWluUm9vbXNMZW5ndGg6IG51bWJlcjtcbiAgbWVtYmVyUm9vbTogbnVtYmVyO1xuICB1cGRhdGVQX2FjdGl2ZU5hbWVzOiAobmFtZXM6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICB1cGRhdGVBY3RpdmVOYW1lczogKG5hbWVzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgdXBkYXRlRGlzcEFjdGl2ZU5hbWVzOiAobmFtZXM6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtczogKHN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSkgPT4gdm9pZDtcbiAgdXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zOiAocGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xuICB1cGRhdGVSZWZfcGFydGljaXBhbnRzOiAocGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xuICB1cGRhdGVTb3J0QXVkaW9Mb3VkbmVzczogKHNvcnQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZU1peGVkX2FsVmlkZW9TdHJlYW1zOiAoc3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdKSA9PiB2b2lkO1xuICB1cGRhdGVOb25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQ6IChwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10pID0+IHZvaWQ7XG4gIHVwZGF0ZVBhZ2luYXRlZFN0cmVhbXM6IChzdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW11bXSkgPT4gdm9pZDtcbiAgdXBkYXRlRG9QYWdpbmF0ZTogKHBhZ2luYXRlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVQcmV2RG9QYWdpbmF0ZTogKHBhZ2luYXRlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVDdXJyZW50VXNlclBhZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZU51bWJlclBhZ2VzOiAocGFnZXM6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlTWFpblJvb21zTGVuZ3RoOiAobGVuZ3RoOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZU1lbWJlclJvb206IChyb29tOiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIG1peFN0cmVhbXM6IE1peFN0cmVhbXNUeXBlO1xuICBkaXNwU3RyZWFtczogRGlzcFN0cmVhbXNUeXBlO1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBDaGFuZ2VWaWRzUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENoYW5nZVZpZHNPcHRpb25zIHtcbiAgc2NyZWVuQ2hhbmdlZD86IGJvb2xlYW47XG4gIHBhcmFtZXRlcnM6IENoYW5nZVZpZHNQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBDaGFuZ2VWaWRzVHlwZSA9IChvcHRpb25zOiBDaGFuZ2VWaWRzT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogQXN5bmNocm9ub3VzbHkgY2hhbmdlcyB0aGUgdmlkZW8gc3RyZWFtcyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY2hhbmdpbmcgdmlkZW8gc3RyZWFtcy5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5zY3JlZW5DaGFuZ2VkPWZhbHNlXSAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGhhcyBjaGFuZ2VkLlxuICAgKiBAcGFyYW0ge0NoYW5nZVZpZHNPcHRpb25zfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgY2hhbmdpbmcgdmlkZW8gc3RyZWFtcy5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHZpZGVvIHN0cmVhbXMgaGF2ZSBiZWVuIGNoYW5nZWQuXG4gICAqXG4gICAqIEB0eXBlZGVmIHtPYmplY3R9IENoYW5nZVZpZHNPcHRpb25zXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IGdldFVwZGF0ZWRBbGxQYXJhbXMgLSBGdW5jdGlvbiB0byBnZXQgdXBkYXRlZCBwYXJhbWV0ZXJzLlxuICAgKiBAcHJvcGVydHkge0FycmF5fSBhbGxWaWRlb1N0cmVhbXMgLSBBcnJheSBvZiBhbGwgdmlkZW8gc3RyZWFtcy5cbiAgICogQHByb3BlcnR5IHtBcnJheX0gcF9hY3RpdmVOYW1lcyAtIEFycmF5IG9mIGFjdGl2ZSBwYXJ0aWNpcGFudCBuYW1lcy5cbiAgICogQHByb3BlcnR5IHtBcnJheX0gYWN0aXZlTmFtZXMgLSBBcnJheSBvZiBhY3RpdmUgbmFtZXMuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IGRpc3BBY3RpdmVOYW1lcyAtIEFycmF5IG9mIGRpc3BsYXllZCBhY3RpdmUgbmFtZXMuXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc2hhcmVTY3JlZW5TdGFydGVkIC0gSW5kaWNhdGVzIGlmIHNjcmVlbiBzaGFyaW5nIGhhcyBzdGFydGVkLlxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IHNoYXJlZCAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIHNoYXJlZC5cbiAgICogQHByb3BlcnR5IHtBcnJheX0gbmV3TGltaXRlZFN0cmVhbXMgLSBBcnJheSBvZiBuZXcgbGltaXRlZCBzdHJlYW1zLlxuICAgKiBAcHJvcGVydHkge0FycmF5fSBub25fYWxWaWRlb1N0cmVhbXMgLSBBcnJheSBvZiBub24tYWwgdmlkZW8gc3RyZWFtcy5cbiAgICogQHByb3BlcnR5IHtBcnJheX0gcmVmX3BhcnRpY2lwYW50cyAtIEFycmF5IG9mIHJlZmVyZW5jZSBwYXJ0aWNpcGFudHMuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IHBhcnRpY2lwYW50cyAtIEFycmF5IG9mIHBhcnRpY2lwYW50cy5cbiAgICogQHByb3BlcnR5IHtzdHJpbmd9IGV2ZW50VHlwZSAtIFR5cGUgb2YgdGhlIGV2ZW50LlxuICAgKiBAcHJvcGVydHkge3N0cmluZ30gaXNsZXZlbCAtIExldmVsIG9mIHRoZSBwYXJ0aWNpcGFudC5cbiAgICogQHByb3BlcnR5IHtzdHJpbmd9IG1lbWJlciAtIE5hbWUgb2YgdGhlIG1lbWJlci5cbiAgICogQHByb3BlcnR5IHtib29sZWFufSBzb3J0QXVkaW9Mb3VkbmVzcyAtIEluZGljYXRlcyBpZiBhdWRpbyBsb3VkbmVzcyBzaG91bGQgYmUgc29ydGVkLlxuICAgKiBAcHJvcGVydHkge0FycmF5fSBhdWRpb0RlY2liZWxzIC0gQXJyYXkgb2YgYXVkaW8gZGVjaWJlbHMuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IG1peGVkX2FsVmlkZW9TdHJlYW1zIC0gQXJyYXkgb2YgbWl4ZWQgYWwgdmlkZW8gc3RyZWFtcy5cbiAgICogQHByb3BlcnR5IHtBcnJheX0gbm9uX2FsVmlkZW9TdHJlYW1zX211dGVkIC0gQXJyYXkgb2YgbXV0ZWQgbm9uLWFsIHZpZGVvIHN0cmVhbXMuXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSByZW1vdGVQcm9kdWNlcklkIC0gSUQgb2YgdGhlIHJlbW90ZSBwcm9kdWNlci5cbiAgICogQHByb3BlcnR5IHtPYmplY3R9IGxvY2FsU3RyZWFtVmlkZW8gLSBMb2NhbCBzdHJlYW0gdmlkZW8gb2JqZWN0LlxuICAgKiBAcHJvcGVydHkge0FycmF5fSBvbGRBbGxTdHJlYW1zIC0gQXJyYXkgb2Ygb2xkIGFsbCBzdHJlYW1zLlxuICAgKiBAcHJvcGVydHkge251bWJlcn0gc2NyZWVuUGFnZUxpbWl0IC0gTGltaXQgb2Ygc3RyZWFtcyBwZXIgc2NyZWVuIHBhZ2UuXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZWV0aW5nRGlzcGxheVR5cGUgLSBUeXBlIG9mIG1lZXRpbmcgZGlzcGxheS5cbiAgICogQHByb3BlcnR5IHtib29sZWFufSBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQgLSBJbmRpY2F0ZXMgaWYgbWVldGluZyB2aWRlbyBpcyBvcHRpbWl6ZWQuXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQgLSBJbmRpY2F0ZXMgaWYgcmVjb3JkaW5nIHZpZGVvIGlzIG9wdGltaXplZC5cbiAgICogQHByb3BlcnR5IHtzdHJpbmd9IHJlY29yZGluZ0Rpc3BsYXlUeXBlIC0gVHlwZSBvZiByZWNvcmRpbmcgZGlzcGxheS5cbiAgICogQHByb3BlcnR5IHtBcnJheX0gcGFnaW5hdGVkU3RyZWFtcyAtIEFycmF5IG9mIHBhZ2luYXRlZCBzdHJlYW1zLlxuICAgKiBAcHJvcGVydHkge251bWJlcn0gaXRlbVBhZ2VMaW1pdCAtIExpbWl0IG9mIGl0ZW1zIHBlciBwYWdlLlxuICAgKiBAcHJvcGVydHkge2Jvb2xlYW59IGRvUGFnaW5hdGUgLSBJbmRpY2F0ZXMgaWYgcGFnaW5hdGlvbiBzaG91bGQgYmUgZG9uZS5cbiAgICogQHByb3BlcnR5IHtib29sZWFufSBwcmV2RG9QYWdpbmF0ZSAtIEluZGljYXRlcyBpZiBwYWdpbmF0aW9uIHdhcyBwcmV2aW91c2x5IGRvbmUuXG4gICAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjdXJyZW50VXNlclBhZ2UgLSBDdXJyZW50IHVzZXIgcGFnZSBudW1iZXIuXG4gICAqIEBwcm9wZXJ0eSB7QXJyYXl9IGJyZWFrb3V0Um9vbXMgLSBBcnJheSBvZiBicmVha291dCByb29tcy5cbiAgICogQHByb3BlcnR5IHtudW1iZXJ9IGhvc3ROZXdSb29tIC0gSW5kZXggb2YgdGhlIG5ldyByb29tIGZvciB0aGUgaG9zdC5cbiAgICogQHByb3BlcnR5IHtib29sZWFufSBicmVha091dFJvb21TdGFydGVkIC0gSW5kaWNhdGVzIGlmIGJyZWFrb3V0IHJvb20gaGFzIHN0YXJ0ZWQuXG4gICAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYnJlYWtPdXRSb29tRW5kZWQgLSBJbmRpY2F0ZXMgaWYgYnJlYWtvdXQgcm9vbSBoYXMgZW5kZWQuXG4gICAqIEBwcm9wZXJ0eSB7T2JqZWN0fSB2aXJ0dWFsU3RyZWFtIC0gVmlydHVhbCBzdHJlYW0gb2JqZWN0LlxuICAgKiBAcHJvcGVydHkge251bWJlcn0gbWFpblJvb21zTGVuZ3RoIC0gTGVuZ3RoIG9mIG1haW4gcm9vbXMuXG4gICAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZW1iZXJSb29tIC0gUm9vbSBvZiB0aGUgbWVtYmVyLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVQX2FjdGl2ZU5hbWVzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGFjdGl2ZSBwYXJ0aWNpcGFudCBuYW1lcy5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlQWN0aXZlTmFtZXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgYWN0aXZlIG5hbWVzLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVEaXNwQWN0aXZlTmFtZXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgZGlzcGxheWVkIGFjdGl2ZSBuYW1lcy5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlTmV3TGltaXRlZFN0cmVhbXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgbmV3IGxpbWl0ZWQgc3RyZWFtcy5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIG5vbi1hbCB2aWRlbyBzdHJlYW1zLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVSZWZfcGFydGljaXBhbnRzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHJlZmVyZW5jZSBwYXJ0aWNpcGFudHMuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZVNvcnRBdWRpb0xvdWRuZXNzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGF1ZGlvIGxvdWRuZXNzIHNvcnRpbmcuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZU1peGVkX2FsVmlkZW9TdHJlYW1zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIG1peGVkIGFsIHZpZGVvIHN0cmVhbXMuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBtdXRlZCBub24tYWwgdmlkZW8gc3RyZWFtcy5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlUGFnaW5hdGVkU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBwYWdpbmF0ZWQgc3RyZWFtcy5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlRG9QYWdpbmF0ZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBwYWdpbmF0aW9uIHN0YXR1cy5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlUHJldkRvUGFnaW5hdGUgLSBGdW5jdGlvbiB0byB1cGRhdGUgcHJldmlvdXMgcGFnaW5hdGlvbiBzdGF0dXMuXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZUN1cnJlbnRVc2VyUGFnZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBjdXJyZW50IHVzZXIgcGFnZS5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlTnVtYmVyUGFnZXMgLSBGdW5jdGlvbiB0byB1cGRhdGUgbnVtYmVyIG9mIHBhZ2VzLlxuICAgKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVNYWluUm9vbXNMZW5ndGggLSBGdW5jdGlvbiB0byB1cGRhdGUgbWFpbiByb29tcyBsZW5ndGguXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZU1lbWJlclJvb20gLSBGdW5jdGlvbiB0byB1cGRhdGUgbWVtYmVyIHJvb20uXG4gICAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IG1peFN0cmVhbXMgLSBGdW5jdGlvbiB0byBtaXggc3RyZWFtcy5cbiAgICogQHByb3BlcnR5IHtGdW5jdGlvbn0gZGlzcFN0cmVhbXMgLSBGdW5jdGlvbiB0byBkaXNwbGF5IHN0cmVhbXMuXG4gICAqXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogYXdhaXQgY2hhbmdlVmlkc1NlcnZpY2UuY2hhbmdlVmlkcyh7XG4gICAqICAgc2NyZWVuQ2hhbmdlZDogdHJ1ZSxcbiAgICogICBwYXJhbWV0ZXJzOiB7XG4gICAqICAgICBhbGxWaWRlb1N0cmVhbXM6IFtdLCAvLyBZb3VyIGFycmF5IG9mIHZpZGVvIHN0cmVhbXNcbiAgICogICAgIHBfYWN0aXZlTmFtZXM6IFtdLCAvLyBBY3RpdmUgcGFydGljaXBhbnQgbmFtZXNcbiAgICogICAgIGFjdGl2ZU5hbWVzOiBbXSwgLy8gTmFtZXMgb2YgYWN0aXZlIHN0cmVhbXNcbiAgICogICAgIGRpc3BBY3RpdmVOYW1lczogW10sIC8vIE5hbWVzIG9mIGRpc3BsYXllZCBhY3RpdmUgc3RyZWFtc1xuICAgKiAgICAgc2hhcmVTY3JlZW5TdGFydGVkOiBmYWxzZSxcbiAgICogICAgIHNoYXJlZDogZmFsc2UsXG4gICAqICAgICBuZXdMaW1pdGVkU3RyZWFtczogW10sIC8vIE5ldyBsaW1pdGVkIHN0cmVhbXNcbiAgICogICAgIG5vbl9hbFZpZGVvU3RyZWFtczogW10sIC8vIE5vbi1hdWRpbyB2aWRlbyBzdHJlYW1zXG4gICAqICAgICByZWZfcGFydGljaXBhbnRzOiBbXSwgLy8gUmVmZXJlbmNlIHBhcnRpY2lwYW50c1xuICAgKiAgICAgcGFydGljaXBhbnRzOiBbXSwgLy8gQWxsIHBhcnRpY2lwYW50c1xuICAgKiAgICAgZXZlbnRUeXBlOiAnY29uZmVyZW5jZScsIC8vIFR5cGUgb2YgZXZlbnRcbiAgICogICAgIGlzbGV2ZWw6ICcxJywgLy8gTGV2ZWwgb2YgdGhlIHBhcnRpY2lwYW50XG4gICAqICAgICBtZW1iZXI6ICdKb2huIERvZScsIC8vIE1lbWJlcidzIG5hbWVcbiAgICogICAgIHNvcnRBdWRpb0xvdWRuZXNzOiB0cnVlLFxuICAgKiAgICAgYXVkaW9EZWNpYmVsczogW10sIC8vIEF1ZGlvIGRlY2liZWwgbGV2ZWxzXG4gICAqICAgICBtaXhlZF9hbFZpZGVvU3RyZWFtczogW10sIC8vIE1peGVkIGF1ZGlvL3ZpZGVvIHN0cmVhbXNcbiAgICogICAgIG5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZDogW10sIC8vIE11dGVkIG5vbi1hdWRpbyB2aWRlbyBzdHJlYW1zXG4gICAqICAgICByZW1vdGVQcm9kdWNlcklkOiAnYWJjMTIzJyxcbiAgICogICAgIGxvY2FsU3RyZWFtVmlkZW86IG51bGwsIC8vIExvY2FsIHZpZGVvIHN0cmVhbVxuICAgKiAgICAgb2xkQWxsU3RyZWFtczogW10sIC8vIFByZXZpb3VzIHN0cmVhbXNcbiAgICogICAgIHNjcmVlblBhZ2VMaW1pdDogNCwgLy8gTGltaXQgb2Ygc3RyZWFtcyBwZXIgc2NyZWVuXG4gICAqICAgICBtZWV0aW5nRGlzcGxheVR5cGU6ICdncmlkJywgLy8gVHlwZSBvZiBkaXNwbGF5XG4gICAqICAgICBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQ6IHRydWUsIC8vIFZpZGVvIG9wdGltaXphdGlvbiBzdGF0dXNcbiAgICogICAgIHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkOiBmYWxzZSwgLy8gUmVjb3JkaW5nIG9wdGltaXphdGlvbiBzdGF0dXNcbiAgICogICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlOiAndmlkZW8nLCAvLyBSZWNvcmRpbmcgZGlzcGxheSB0eXBlXG4gICAqICAgICBwYWdpbmF0ZWRTdHJlYW1zOiBbXSwgLy8gUGFnaW5hdGVkIHN0cmVhbXNcbiAgICogICAgIGl0ZW1QYWdlTGltaXQ6IDIsIC8vIEl0ZW1zIHBlciBwYWdlIGxpbWl0XG4gICAqICAgICBkb1BhZ2luYXRlOiB0cnVlLCAvLyBQYWdpbmF0aW9uIGZsYWdcbiAgICogICAgIHByZXZEb1BhZ2luYXRlOiBmYWxzZSwgLy8gUHJldmlvdXMgcGFnaW5hdGlvbiBzdGF0ZVxuICAgKiAgICAgY3VycmVudFVzZXJQYWdlOiAxLCAvLyBDdXJyZW50IHBhZ2UgbnVtYmVyXG4gICAqICAgICBicmVha291dFJvb21zOiBbXSwgLy8gQnJlYWtvdXQgcm9vbSBpbmZvcm1hdGlvblxuICAgKiAgICAgaG9zdE5ld1Jvb206IDAsIC8vIEhvc3Qgcm9vbSBudW1iZXJcbiAgICogICAgIGJyZWFrT3V0Um9vbVN0YXJ0ZWQ6IGZhbHNlLCAvLyBCcmVha291dCByb29tIHN0YXR1c1xuICAgKiAgICAgYnJlYWtPdXRSb29tRW5kZWQ6IGZhbHNlLCAvLyBCcmVha291dCByb29tIGVuZCBzdGF0dXNcbiAgICogICAgIHZpcnR1YWxTdHJlYW06IG51bGwsIC8vIFZpcnR1YWwgc3RyZWFtXG4gICAqICAgICBtYWluUm9vbXNMZW5ndGg6IDMsIC8vIE51bWJlciBvZiBtYWluIHJvb21zXG4gICAqICAgICBtZW1iZXJSb29tOiAxLCAvLyBNZW1iZXIncyByb29tIG51bWJlclxuICAgKiAgICAgdXBkYXRlUF9hY3RpdmVOYW1lczogKG5hbWVzKSA9PiB7fSwgLy8gVXBkYXRlIGZ1bmN0aW9uIGZvciBhY3RpdmUgbmFtZXNcbiAgICogICAgIHVwZGF0ZUFjdGl2ZU5hbWVzOiAobmFtZXMpID0+IHt9LCAvLyBVcGRhdGUgZnVuY3Rpb24gZm9yIGFsbCBuYW1lc1xuICAgKiAgICAgdXBkYXRlRGlzcEFjdGl2ZU5hbWVzOiAobmFtZXMpID0+IHt9LCAvLyBVcGRhdGUgZnVuY3Rpb24gZm9yIGRpc3BsYXllZCBuYW1lc1xuICAgKiAgICAgdXBkYXRlTmV3TGltaXRlZFN0cmVhbXM6IChzdHJlYW1zKSA9PiB7fSwgLy8gVXBkYXRlIGZ1bmN0aW9uIGZvciBsaW1pdGVkIHN0cmVhbXNcbiAgICogICAgIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtczogKHBhcnRpY2lwYW50cykgPT4ge30sIC8vIFVwZGF0ZSBmdW5jdGlvbiBmb3Igbm9uLWF1ZGlvIHN0cmVhbXNcbiAgICogICAgIHVwZGF0ZVJlZl9wYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHMpID0+IHt9LCAvLyBVcGRhdGUgZnVuY3Rpb24gZm9yIHJlZmVyZW5jZSBwYXJ0aWNpcGFudHNcbiAgICogICAgIHVwZGF0ZVNvcnRBdWRpb0xvdWRuZXNzOiAoc29ydCkgPT4ge30sIC8vIFVwZGF0ZSBmdW5jdGlvbiBmb3Igc29ydGluZyBhdWRpb1xuICAgKiAgICAgdXBkYXRlTWl4ZWRfYWxWaWRlb1N0cmVhbXM6IChzdHJlYW1zKSA9PiB7fSwgLy8gVXBkYXRlIGZ1bmN0aW9uIGZvciBtaXhlZCBzdHJlYW1zXG4gICAqICAgICB1cGRhdGVOb25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQ6IChwYXJ0aWNpcGFudHMpID0+IHt9LCAvLyBVcGRhdGUgZnVuY3Rpb24gZm9yIG11dGVkIHN0cmVhbXNcbiAgICogICAgIHVwZGF0ZVBhZ2luYXRlZFN0cmVhbXM6IChzdHJlYW1zKSA9PiB7fSwgLy8gVXBkYXRlIGZ1bmN0aW9uIGZvciBwYWdpbmF0ZWQgc3RyZWFtc1xuICAgKiAgICAgdXBkYXRlRG9QYWdpbmF0ZTogKHBhZ2luYXRlKSA9PiB7fSwgLy8gVXBkYXRlIGZ1bmN0aW9uIGZvciBwYWdpbmF0aW9uXG4gICAqICAgICB1cGRhdGVQcmV2RG9QYWdpbmF0ZTogKHBhZ2luYXRlKSA9PiB7fSwgLy8gVXBkYXRlIGZ1bmN0aW9uIGZvciBwcmV2aW91cyBwYWdpbmF0aW9uXG4gICAqICAgICB1cGRhdGVDdXJyZW50VXNlclBhZ2U6IChwYWdlKSA9PiB7fSwgLy8gVXBkYXRlIGZ1bmN0aW9uIGZvciBjdXJyZW50IHBhZ2VcbiAgICogICAgIHVwZGF0ZU51bWJlclBhZ2VzOiAocGFnZXMpID0+IHt9LCAvLyBVcGRhdGUgZnVuY3Rpb24gZm9yIG51bWJlciBvZiBwYWdlc1xuICAgKiAgICAgdXBkYXRlTWFpblJvb21zTGVuZ3RoOiAobGVuZ3RoKSA9PiB7fSwgLy8gVXBkYXRlIGZ1bmN0aW9uIGZvciBtYWluIHJvb20gbGVuZ3RoXG4gICAqICAgICB1cGRhdGVNZW1iZXJSb29tOiAocm9vbSkgPT4ge30sIC8vIFVwZGF0ZSBmdW5jdGlvbiBmb3IgbWVtYmVyJ3Mgcm9vbVxuICAgKiAgICAgbWl4U3RyZWFtczogYXN5bmMgKHsgc3RyZWFtcywgZGlzcGxheVR5cGUgfSkgPT4ge30sIC8vIEZ1bmN0aW9uIHRvIG1peCBzdHJlYW1zXG4gICAqICAgICBkaXNwU3RyZWFtczogYXN5bmMgKHsgc3RyZWFtcywgZGlzcGxheVR5cGUgfSkgPT4ge30sIC8vIEZ1bmN0aW9uIHRvIGRpc3BsYXkgc3RyZWFtc1xuICAgKiAgIH0sXG4gICAqIH0pO1xuICAgKiBgYGBcbiAgICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2hhbmdlVmlkcyB7XG5cbiAgY2hhbmdlVmlkcyA9IGFzeW5jICh7IHNjcmVlbkNoYW5nZWQgPSBmYWxzZSwgcGFyYW1ldGVycyB9OiBDaGFuZ2VWaWRzT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCB7IGdldFVwZGF0ZWRBbGxQYXJhbXMgfSA9IHBhcmFtZXRlcnM7XG4gICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgIGxldCB7XG4gICAgICBhbGxWaWRlb1N0cmVhbXMsXG4gICAgICBwX2FjdGl2ZU5hbWVzLFxuICAgICAgYWN0aXZlTmFtZXMsXG4gICAgICBkaXNwQWN0aXZlTmFtZXMsXG4gICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICBzaGFyZWQsXG4gICAgICBuZXdMaW1pdGVkU3RyZWFtcyxcbiAgICAgIG5vbl9hbFZpZGVvU3RyZWFtcyxcbiAgICAgIHJlZl9wYXJ0aWNpcGFudHMsXG4gICAgICBwYXJ0aWNpcGFudHMsXG4gICAgICBldmVudFR5cGUsXG4gICAgICBpc2xldmVsLFxuICAgICAgbWVtYmVyLFxuICAgICAgc29ydEF1ZGlvTG91ZG5lc3MsXG4gICAgICBhdWRpb0RlY2liZWxzLFxuICAgICAgbWl4ZWRfYWxWaWRlb1N0cmVhbXMsXG4gICAgICBub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQsXG4gICAgICByZW1vdGVQcm9kdWNlcklkLFxuICAgICAgbG9jYWxTdHJlYW1WaWRlbyxcbiAgICAgIG9sZEFsbFN0cmVhbXMsXG4gICAgICBzY3JlZW5QYWdlTGltaXQsXG4gICAgICBtZWV0aW5nRGlzcGxheVR5cGUsXG4gICAgICBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQsXG4gICAgICByZWNvcmRpbmdWaWRlb09wdGltaXplZCxcbiAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgcGFnaW5hdGVkU3RyZWFtcyxcbiAgICAgIGl0ZW1QYWdlTGltaXQsXG4gICAgICBkb1BhZ2luYXRlLFxuICAgICAgcHJldkRvUGFnaW5hdGUsXG4gICAgICBjdXJyZW50VXNlclBhZ2UsXG5cbiAgICAgIGJyZWFrb3V0Um9vbXMsXG4gICAgICBob3N0TmV3Um9vbSxcbiAgICAgIGJyZWFrT3V0Um9vbVN0YXJ0ZWQsXG4gICAgICBicmVha091dFJvb21FbmRlZCxcbiAgICAgIHZpcnR1YWxTdHJlYW0sXG4gICAgICBtYWluUm9vbXNMZW5ndGgsXG4gICAgICBtZW1iZXJSb29tLFxuXG4gICAgICB1cGRhdGVQX2FjdGl2ZU5hbWVzLFxuICAgICAgdXBkYXRlQWN0aXZlTmFtZXMsXG4gICAgICB1cGRhdGVEaXNwQWN0aXZlTmFtZXMsXG4gICAgICB1cGRhdGVOZXdMaW1pdGVkU3RyZWFtcyxcbiAgICAgIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtcyxcbiAgICAgIHVwZGF0ZVJlZl9wYXJ0aWNpcGFudHMsXG4gICAgICB1cGRhdGVTb3J0QXVkaW9Mb3VkbmVzcyxcbiAgICAgIHVwZGF0ZU1peGVkX2FsVmlkZW9TdHJlYW1zLFxuICAgICAgdXBkYXRlTm9uX2FsVmlkZW9TdHJlYW1zX211dGVkLFxuICAgICAgdXBkYXRlUGFnaW5hdGVkU3RyZWFtcyxcbiAgICAgIHVwZGF0ZURvUGFnaW5hdGUsXG4gICAgICB1cGRhdGVQcmV2RG9QYWdpbmF0ZSxcbiAgICAgIHVwZGF0ZUN1cnJlbnRVc2VyUGFnZSxcbiAgICAgIHVwZGF0ZU51bWJlclBhZ2VzLFxuXG4gICAgICB1cGRhdGVNYWluUm9vbXNMZW5ndGgsXG4gICAgICB1cGRhdGVNZW1iZXJSb29tLFxuXG4gICAgICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgIG1peFN0cmVhbXMsXG4gICAgICBkaXNwU3RyZWFtcyxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIHRyeSB7XG4gICAgICBsZXQgYWxWaWRlb1N0cmVhbXMgPSBbLi4uYWxsVmlkZW9TdHJlYW1zXTtcbiAgICAgIHBfYWN0aXZlTmFtZXMgPSBbLi4uYWN0aXZlTmFtZXNdO1xuXG4gICAgICBsZXQgc3RyZWFtZTtcblxuICAgICAgaWYgKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpIHtcbiAgICAgICAgYWxWaWRlb1N0cmVhbXMgPSBbLi4ubmV3TGltaXRlZFN0cmVhbXNdO1xuICAgICAgICBhY3RpdmVOYW1lcyA9IFtdO1xuICAgICAgfVxuXG4gICAgICBhY3RpdmVOYW1lcyA9IFtdO1xuICAgICAgZGlzcEFjdGl2ZU5hbWVzID0gW107XG4gICAgICByZWZfcGFydGljaXBhbnRzID0gcGFydGljaXBhbnRzO1xuXG4gICAgICBsZXQgdGVtcCA9IGFsVmlkZW9TdHJlYW1zO1xuXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgdGVtcC5tYXAoYXN5bmMgKHN0cmVhbSkgPT4ge1xuICAgICAgICAgIGxldCBwYXJ0aWNpcGFudCA9IHJlZl9wYXJ0aWNpcGFudHMuZmluZCgob2JqKSA9PiBvYmoudmlkZW9JRCA9PT0gc3RyZWFtLnByb2R1Y2VySWQpO1xuICAgICAgICAgIGlmICghcGFydGljaXBhbnQgJiYgc3RyZWFtLnByb2R1Y2VySWQgIT09ICd5b3V5b3UnICYmIHN0cmVhbS5wcm9kdWNlcklkICE9PSAneW91eW91eW91Jykge1xuICAgICAgICAgICAgYWxWaWRlb1N0cmVhbXMgPSBhbFZpZGVvU3RyZWFtcy5maWx0ZXIoKG9iaikgPT4gb2JqLnByb2R1Y2VySWQgIT09IHN0cmVhbS5wcm9kdWNlcklkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pLFxuICAgICAgKTtcblxuICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ2Jyb2FkY2FzdCcgfHwgZXZlbnRUeXBlID09PSAnY2hhdCcpIHtcbiAgICAgICAgc29ydEF1ZGlvTG91ZG5lc3MgPSBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpIHtcbiAgICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zID0gW107XG4gICAgICAgIG5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZCA9IFtdO1xuICAgICAgICBtaXhlZF9hbFZpZGVvU3RyZWFtcyA9IFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGFsVmlkZW9TdHJlYW1zLmxlbmd0aCA+IHNjcmVlblBhZ2VMaW1pdCkge1xuICAgICAgICAgIGFsVmlkZW9TdHJlYW1zID0gYWxWaWRlb1N0cmVhbXMuZmlsdGVyKFxuICAgICAgICAgICAgKG9iaikgPT4gb2JqLnByb2R1Y2VySWQgIT09ICd5b3V5b3UnICYmIG9iai5wcm9kdWNlcklkICE9PSAneW91eW91eW91JyxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcmVmX3BhcnRpY2lwYW50cyA9IHJlZl9wYXJ0aWNpcGFudHMuc29ydCgoYSwgYikgPT5cbiAgICAgICAgICAgIChhLm11dGVkID8/IGZhbHNlKSA+IChiLm11dGVkID8/IGZhbHNlKSA/IDEgOiAtMSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgbGV0IHRlbXA6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSA9IFtdO1xuICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgICAgcmVmX3BhcnRpY2lwYW50cy5tYXAoKHBhcnRpY2lwYW50KSA9PiB7XG4gICAgICAgICAgICAgIGxldCBzdHJlYW0gPSBhbFZpZGVvU3RyZWFtcy5maW5kKChvYmopID0+IG9iai5wcm9kdWNlcklkID09PSBwYXJ0aWNpcGFudC52aWRlb0lEKTtcbiAgICAgICAgICAgICAgaWYgKHN0cmVhbSkge1xuICAgICAgICAgICAgICAgIHRlbXAucHVzaChzdHJlYW0pO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgYWxWaWRlb1N0cmVhbXMgPSB0ZW1wO1xuXG4gICAgICAgICAgbGV0IHlvdXlvdSA9IGFsbFZpZGVvU3RyZWFtcy5maW5kKChvYmopID0+IG9iai5wcm9kdWNlcklkID09PSAneW91eW91Jyk7XG4gICAgICAgICAgaWYgKCF5b3V5b3UpIHtcbiAgICAgICAgICAgIGxldCB5b3V5b3V5b3UgPSBhbGxWaWRlb1N0cmVhbXMuZmluZCgob2JqKSA9PiBvYmoucHJvZHVjZXJJZCA9PT0gJ3lvdXlvdXlvdScpO1xuICAgICAgICAgICAgaWYgKHlvdXlvdXlvdSkge1xuICAgICAgICAgICAgICBhbFZpZGVvU3RyZWFtcy51bnNoaWZ0KHlvdXlvdXlvdSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh5b3V5b3UpIHtcbiAgICAgICAgICAgICAgYWxWaWRlb1N0cmVhbXMudW5zaGlmdCh5b3V5b3UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGFkbWluID0gcGFydGljaXBhbnRzLmZpbHRlcigocGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50LmlzbGV2ZWwgPT09ICcyJyk7XG4gICAgICAgIGxldCBhZG1pbk5hbWUgPSAnJztcbiAgICAgICAgaWYgKGFkbWluLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBhZG1pbk5hbWUgPSBhZG1pblswXS5uYW1lIHx8ICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zID0gW107XG5cbiAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgcmVmX3BhcnRpY2lwYW50cy5tYXAoYXN5bmMgKHBhcnRpY2lwYW50KSA9PiB7XG4gICAgICAgICAgICBsZXQgc3RyZWFtID0gYWxWaWRlb1N0cmVhbXMuZmluZCgob2JqKSA9PiBvYmoucHJvZHVjZXJJZCA9PT0gcGFydGljaXBhbnQudmlkZW9JRCk7XG4gICAgICAgICAgICBpZiAoZXZlbnRUeXBlICE9PSAnY2hhdCcgJiYgZXZlbnRUeXBlICE9PSAnY29uZmVyZW5jZScpIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFzdHJlYW0gJiZcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudC5uYW1lICE9PSBtZW1iZXIgJiZcbiAgICAgICAgICAgICAgICAhcGFydGljaXBhbnRbJ211dGVkJ10gJiZcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudC5uYW1lICE9PSBhZG1pbk5hbWVcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zLnB1c2gocGFydGljaXBhbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBpZiAoIXN0cmVhbSAmJiBwYXJ0aWNpcGFudC5uYW1lICE9PSBtZW1iZXIgJiYgIXBhcnRpY2lwYW50WydtdXRlZCddKSB7XG4gICAgICAgICAgICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zLnB1c2gocGFydGljaXBhbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKHNvcnRBdWRpb0xvdWRuZXNzKSB7XG4gICAgICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zLnNvcnQoKGEsIGIpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGF2Z0xvdWRuZXNzQSA9XG4gICAgICAgICAgICAgIGF1ZGlvRGVjaWJlbHMuZmluZCgob2JqKSA9PiBvYmoubmFtZSA9PT0gYS5uYW1lKT8uYXZlcmFnZUxvdWRuZXNzIHx8IDEyNztcbiAgICAgICAgICAgIGNvbnN0IGF2Z0xvdWRuZXNzQiA9XG4gICAgICAgICAgICAgIGF1ZGlvRGVjaWJlbHMuZmluZCgob2JqKSA9PiBvYmoubmFtZSA9PT0gYi5uYW1lKT8uYXZlcmFnZUxvdWRuZXNzIHx8IDEyNztcbiAgICAgICAgICAgIHJldHVybiBhdmdMb3VkbmVzc0IgLSBhdmdMb3VkbmVzc0E7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhKG1lZXRpbmdEaXNwbGF5VHlwZSA9PT0gJ3ZpZGVvJyAmJiBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQpIHx8XG4gICAgICAgICAgICAhKHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkICYmIHJlY29yZGluZ0Rpc3BsYXlUeXBlID09PSAndmlkZW8nKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbWl4ZWRfYWxWaWRlb1N0cmVhbXMgPSBhd2FpdCBtaXhTdHJlYW1zKHtcbiAgICAgICAgICAgICAgYWxWaWRlb1N0cmVhbXMsXG4gICAgICAgICAgICAgIG5vbl9hbFZpZGVvU3RyZWFtcyxcbiAgICAgICAgICAgICAgcmVmX3BhcnRpY2lwYW50cyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZCA9IFtdO1xuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICByZWZfcGFydGljaXBhbnRzLm1hcChhc3luYyAocGFydGljaXBhbnQpID0+IHtcbiAgICAgICAgICAgIGxldCBzdHJlYW0gPSBhbFZpZGVvU3RyZWFtcy5maW5kKChvYmopID0+IG9iai5wcm9kdWNlcklkID09PSBwYXJ0aWNpcGFudC52aWRlb0lEKTtcbiAgICAgICAgICAgIGlmIChldmVudFR5cGUgIT09ICdjaGF0JyAmJiBldmVudFR5cGUgIT09ICdjb25mZXJlbmNlJykge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIXN0cmVhbSAmJlxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50Lm5hbWUgIT09IG1lbWJlciAmJlxuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50WydtdXRlZCddICYmXG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQubmFtZSAhPT0gYWRtaW5OYW1lXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIG5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZC5wdXNoKHBhcnRpY2lwYW50KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgaWYgKCFzdHJlYW0gJiYgcGFydGljaXBhbnQubmFtZSAhPT0gbWVtYmVyICYmIHBhcnRpY2lwYW50WydtdXRlZCddKSB7XG4gICAgICAgICAgICAgICAgbm9uX2FsVmlkZW9TdHJlYW1zX211dGVkLnB1c2gocGFydGljaXBhbnQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSksXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmIChldmVudFR5cGUgPT09ICdjb25mZXJlbmNlJyAmJiBpc2xldmVsICE9PSAnMicpIHtcbiAgICAgICAgbGV0IGhvc3QgPSBwYXJ0aWNpcGFudHMuZmluZCgob2JqKSA9PiBvYmouaXNsZXZlbCA9PT0gJzInKTtcbiAgICAgICAgaWYgKGhvc3QpIHtcbiAgICAgICAgICBpZiAoaG9zdC52aWRlb0lEKSB7XG4gICAgICAgICAgICByZW1vdGVQcm9kdWNlcklkID0gaG9zdC52aWRlb0lEO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoaXNsZXZlbCA9PT0gJzInKSB7XG4gICAgICAgICAgICBob3N0WydzdHJlYW0nXSA9IHZpcnR1YWxTdHJlYW0gfHwgbG9jYWxTdHJlYW1WaWRlbztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGV0IGhvc3RWaWRlbyA9IGFsVmlkZW9TdHJlYW1zLmZpbmQoKG9iaikgPT4gb2JqLnByb2R1Y2VySWQgPT09IHJlbW90ZVByb2R1Y2VySWQpO1xuICAgICAgICAgICAgaWYgKCFob3N0VmlkZW8pIHtcbiAgICAgICAgICAgICAgc3RyZWFtZSA9IG9sZEFsbFN0cmVhbXMuZmluZCgoc3RyZWFtZSkgPT4gc3RyZWFtZS5wcm9kdWNlcklkID09PSByZW1vdGVQcm9kdWNlcklkKTtcbiAgICAgICAgICAgICAgaWYgKHN0cmVhbWUpIHtcbiAgICAgICAgICAgICAgICBhbFZpZGVvU3RyZWFtcyA9IGFsVmlkZW9TdHJlYW1zLmZpbHRlcigob2JqKSA9PiBvYmoucHJvZHVjZXJJZCAhPT0gaG9zdC52aWRlb0lEKTtcbiAgICAgICAgICAgICAgICBub25fYWxWaWRlb1N0cmVhbXMgPSBub25fYWxWaWRlb1N0cmVhbXMuZmlsdGVyKChvYmopID0+IG9iai5uYW1lICE9PSBob3N0Lm5hbWUpO1xuICAgICAgICAgICAgICAgIG5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZCA9IG5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAob2JqKSA9PiBvYmoubmFtZSAhPT0gaG9zdC5uYW1lLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgaWYgKHNvcnRBdWRpb0xvdWRuZXNzKSB7XG4gICAgICAgICAgICAgICAgICBtaXhlZF9hbFZpZGVvU3RyZWFtcyA9IG1peGVkX2FsVmlkZW9TdHJlYW1zLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgKG9iaikgPT4gb2JqLm5hbWUgIT09IGhvc3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICBub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQgPSBub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAob2JqKSA9PiBvYmoubmFtZSAhPT0gaG9zdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIGlmIChtZWV0aW5nRGlzcGxheVR5cGUgPT0gJ3ZpZGVvJyAmJiBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYWxWaWRlb1N0cmVhbXMudW5zaGlmdChzdHJlYW1lKTtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIG1peGVkX2FsVmlkZW9TdHJlYW1zLnVuc2hpZnQoc3RyZWFtZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGFsVmlkZW9TdHJlYW1zLnVuc2hpZnQoc3RyZWFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICAgICAgcmVmX3BhcnRpY2lwYW50cy5tYXAoYXN5bmMgKHBhcnRpY2lwYW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHJlYW0gPSBhbFZpZGVvU3RyZWFtcy5maW5kKFxuICAgICAgICAgICAgICAgICAgICAgIChvYmopID0+XG4gICAgICAgICAgICAgICAgICAgICAgICBvYmoucHJvZHVjZXJJZCA9PSBwYXJ0aWNpcGFudC52aWRlb0lEICYmIHBhcnRpY2lwYW50Lm5hbWUgPT0gaG9zdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc3RyZWFtKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHNvcnRBdWRpb0xvdWRuZXNzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtaXhlZF9hbFZpZGVvU3RyZWFtcyA9IG1peGVkX2FsVmlkZW9TdHJlYW1zLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgKG9iaikgPT4gb2JqLm5hbWUgIT09IGhvc3QubmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgICAgICAgICBub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQgPSBub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAob2JqKSA9PiBvYmoubmFtZSAhPT0gaG9zdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG1peGVkX2FsVmlkZW9TdHJlYW1zLnVuc2hpZnQocGFydGljaXBhbnQpO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBub25fYWxWaWRlb1N0cmVhbXMgPSBub25fYWxWaWRlb1N0cmVhbXMuZmlsdGVyKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAob2JqKSA9PiBvYmoubmFtZSAhPT0gaG9zdC5uYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5vbl9hbFZpZGVvU3RyZWFtcy51bnNoaWZ0KHBhcnRpY2lwYW50KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IGFsbFN0cmVhbXNQYWdlZDogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdID0gW107XG4gICAgICBpZiAoc29ydEF1ZGlvTG91ZG5lc3MpIHtcbiAgICAgICAgaWYgKG1lZXRpbmdEaXNwbGF5VHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIGlmIChtZWV0aW5nVmlkZW9PcHRpbWl6ZWQpIHtcbiAgICAgICAgICAgIGFsbFN0cmVhbXNQYWdlZCA9IFsuLi5hbFZpZGVvU3RyZWFtc107XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFsbFN0cmVhbXNQYWdlZCA9IFsuLi5taXhlZF9hbFZpZGVvU3RyZWFtc107XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKG1lZXRpbmdEaXNwbGF5VHlwZSA9PT0gJ21lZGlhJykge1xuICAgICAgICAgIGFsbFN0cmVhbXNQYWdlZCA9IFsuLi5taXhlZF9hbFZpZGVvU3RyZWFtc107XG4gICAgICAgIH0gZWxzZSBpZiAobWVldGluZ0Rpc3BsYXlUeXBlID09PSAnYWxsJykge1xuICAgICAgICAgIGFsbFN0cmVhbXNQYWdlZCA9IFsuLi5taXhlZF9hbFZpZGVvU3RyZWFtcywgLi4ubm9uX2FsVmlkZW9TdHJlYW1zX211dGVkXTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKG1lZXRpbmdEaXNwbGF5VHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIGFsbFN0cmVhbXNQYWdlZCA9IFsuLi5hbFZpZGVvU3RyZWFtc107XG4gICAgICAgIH0gZWxzZSBpZiAobWVldGluZ0Rpc3BsYXlUeXBlID09PSAnbWVkaWEnKSB7XG4gICAgICAgICAgYWxsU3RyZWFtc1BhZ2VkID0gWy4uLmFsVmlkZW9TdHJlYW1zLCAuLi5ub25fYWxWaWRlb1N0cmVhbXNdO1xuICAgICAgICB9IGVsc2UgaWYgKG1lZXRpbmdEaXNwbGF5VHlwZSA9PT0gJ2FsbCcpIHtcbiAgICAgICAgICBhbGxTdHJlYW1zUGFnZWQgPSBbLi4uYWxWaWRlb1N0cmVhbXMsIC4uLm5vbl9hbFZpZGVvU3RyZWFtcywgLi4ubm9uX2FsVmlkZW9TdHJlYW1zX211dGVkXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBwYWdpbmF0ZWRTdHJlYW1zID0gW107XG4gICAgICBsZXQgbGltaXQgPSBpdGVtUGFnZUxpbWl0O1xuXG4gICAgICBpZiAoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkge1xuICAgICAgICBsaW1pdCA9IHNjcmVlblBhZ2VMaW1pdDtcbiAgICAgIH1cblxuICAgICAgbGV0IGZpcnN0UGFnZTogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdID0gW107XG4gICAgICBsZXQgcGFnZTogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdID0gW107XG4gICAgICBsZXQgbGltaXRfID0gbGltaXQgKyAxO1xuXG4gICAgICBpZiAoZXZlbnRUeXBlID09PSAnY29uZmVyZW5jZScgJiYgIXNoYXJlZCAmJiAhc2hhcmVTY3JlZW5TdGFydGVkKSB7XG4gICAgICAgIGxpbWl0XyA9IGxpbWl0XyAtIDE7XG4gICAgICB9XG5cbiAgICAgIC8vIENyZWF0ZSBwYWdpbmF0aW9uXG4gICAgICBsZXQgbWVtYmVySW5Sb29tID0gZmFsc2U7XG4gICAgICBsZXQgZmlsdGVySG9zdCA9IGZhbHNlO1xuICAgICAgaWYgKGJyZWFrT3V0Um9vbVN0YXJ0ZWQgJiYgIWJyZWFrT3V0Um9vbUVuZGVkKSB7XG4gICAgICAgIGxldCB0ZW1wQnJlYWtvdXRSb29tcyA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkoYnJlYWtvdXRSb29tcykpO1xuICAgICAgICBsZXQgaG9zdCA9IHBhcnRpY2lwYW50cy5maW5kKChvYmopID0+IG9iai5pc2xldmVsID09ICcyJyk7XG4gICAgICAgIGZvciAobGV0IHJvb20gb2YgdGVtcEJyZWFrb3V0Um9vbXMpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgbGV0IGN1cnJlbnRTdHJlYW1zID0gW107XG4gICAgICAgICAgICBjb25zdCByb29tSW5kZXggPSB0ZW1wQnJlYWtvdXRSb29tcy5pbmRleE9mKHJvb20pO1xuICAgICAgICAgICAgaWYgKGhvc3ROZXdSb29tICE9IC0xICYmIHJvb21JbmRleCA9PSBob3N0TmV3Um9vbSkge1xuICAgICAgICAgICAgICBpZiAoaG9zdCkge1xuICAgICAgICAgICAgICAgIGlmICghcm9vbS5tYXAoKG9iajogYW55KSA9PiBvYmoubmFtZSkuaW5jbHVkZXMoaG9zdC5uYW1lKSkge1xuICAgICAgICAgICAgICAgICAgcm9vbSA9IFsuLi5yb29tLCB7IG5hbWU6IGhvc3QubmFtZSwgYnJlYWtSb29tOiByb29tSW5kZXggfV07XG4gICAgICAgICAgICAgICAgICBmaWx0ZXJIb3N0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvciAobGV0IHBhcnRpY2lwYW50IG9mIHJvb20pIHtcbiAgICAgICAgICAgICAgaWYgKHBhcnRpY2lwYW50Lm5hbWUgPT0gbWVtYmVyICYmICFtZW1iZXJJblJvb20pIHtcbiAgICAgICAgICAgICAgICBtZW1iZXJJblJvb20gPSB0cnVlO1xuICAgICAgICAgICAgICAgIG1lbWJlclJvb20gPSBwYXJ0aWNpcGFudC5icmVha1Jvb207XG4gICAgICAgICAgICAgICAgdXBkYXRlTWVtYmVyUm9vbShtZW1iZXJSb29tKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBsZXQgc3RyZWFtcyA9IGFsbFN0cmVhbXNQYWdlZC5maWx0ZXIoKHN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAncHJvZHVjZXJJZCcpICYmXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT09ICcnKSB8fFxuICAgICAgICAgICAgICAgICAgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdhdWRpb0lEJykgJiZcbiAgICAgICAgICAgICAgICAgICAgc3RyZWFtWydhdWRpb0lEJ10gIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICBzdHJlYW1bJ2F1ZGlvSUQnXSAhPT0gJycpXG4gICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICBsZXQgcHJvZHVjZXJJZCA9IHN0cmVhbS5wcm9kdWNlcklkIHx8IHN0cmVhbVsnYXVkaW9JRCddO1xuICAgICAgICAgICAgICAgICAgbGV0IG1hdGNoaW5nUGFydGljaXBhbnQgPSByZWZfcGFydGljaXBhbnRzLmZpbmQoXG4gICAgICAgICAgICAgICAgICAgIChvYmopID0+XG4gICAgICAgICAgICAgICAgICAgICAgb2JqWydhdWRpb0lEJ10gPT09IHByb2R1Y2VySWQgfHxcbiAgICAgICAgICAgICAgICAgICAgICBvYmoudmlkZW9JRCA9PT0gcHJvZHVjZXJJZCB8fFxuICAgICAgICAgICAgICAgICAgICAgICgocHJvZHVjZXJJZCA9PSAneW91eW91JyB8fCBwcm9kdWNlcklkID09ICd5b3V5b3V5b3UnKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgbWVtYmVyID09IHBhcnRpY2lwYW50Lm5hbWUpLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgICAgIChtYXRjaGluZ1BhcnRpY2lwYW50ICYmIG1hdGNoaW5nUGFydGljaXBhbnQubmFtZSA9PT0gcGFydGljaXBhbnQubmFtZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgKHBhcnRpY2lwYW50Lm5hbWUgPT0gbWVtYmVyICYmXG4gICAgICAgICAgICAgICAgICAgICAgKHByb2R1Y2VySWQgPT0gJ3lvdXlvdScgfHwgcHJvZHVjZXJJZCA9PSAneW91eW91eW91JykpXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAnbmFtZScpICYmXG4gICAgICAgICAgICAgICAgICAgIHN0cmVhbS5uYW1lID09IHBhcnRpY2lwYW50Lm5hbWVcbiAgICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgc3RyZWFtIG9mIHN0cmVhbXMpIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFN0cmVhbXMubGVuZ3RoIDwgbGltaXRfKSB7XG4gICAgICAgICAgICAgICAgICBjdXJyZW50U3RyZWFtcy5wdXNoKHN0cmVhbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBwYWdpbmF0ZWRTdHJlYW1zLnB1c2goY3VycmVudFN0cmVhbXMpO1xuICAgICAgICAgIH0gY2F0Y2gge1xuICAgICAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHJlbWFpbmluZ1N0cmVhbXMgPSBhbGxTdHJlYW1zUGFnZWQuZmlsdGVyKChzdHJlYW0pID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9PSAnJykgfHxcbiAgICAgICAgICAgIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAnYXVkaW9JRCcpICYmXG4gICAgICAgICAgICAgIHN0cmVhbVsnYXVkaW9JRCddICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtWydhdWRpb0lEJ10gIT09ICcnKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbGV0IHByb2R1Y2VySWQgPSBzdHJlYW0ucHJvZHVjZXJJZCB8fCBzdHJlYW1bJ2F1ZGlvSUQnXTtcbiAgICAgICAgICAgIGxldCBtYXRjaGluZ1BhcnRpY2lwYW50ID0gcmVmX3BhcnRpY2lwYW50cy5maW5kKFxuICAgICAgICAgICAgICAob2JqKSA9PlxuICAgICAgICAgICAgICAgIG9ialsnYXVkaW9JRCddID09PSBwcm9kdWNlcklkIHx8XG4gICAgICAgICAgICAgICAgb2JqLnZpZGVvSUQgPT09IHByb2R1Y2VySWQgfHxcbiAgICAgICAgICAgICAgICAoKHByb2R1Y2VySWQgPT0gJ3lvdXlvdScgfHwgcHJvZHVjZXJJZCA9PSAneW91eW91eW91JykgJiYgbWVtYmVyID09IG9iai5uYW1lKSxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICBtYXRjaGluZ1BhcnRpY2lwYW50ICYmXG4gICAgICAgICAgICAgICFicmVha291dFJvb21zXG4gICAgICAgICAgICAgICAgLmZsYXQoKVxuICAgICAgICAgICAgICAgIC5tYXAoKG9iaikgPT4gb2JqLm5hbWUpXG4gICAgICAgICAgICAgICAgLmluY2x1ZGVzKG1hdGNoaW5nUGFydGljaXBhbnQubmFtZSkgJiZcbiAgICAgICAgICAgICAgKCFmaWx0ZXJIb3N0IHx8IG1hdGNoaW5nUGFydGljaXBhbnQubmFtZSAhPSBob3N0Py5uYW1lKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgIWJyZWFrb3V0Um9vbXNcbiAgICAgICAgICAgICAgICAuZmxhdCgpXG4gICAgICAgICAgICAgICAgLm1hcCgob2JqKSA9PiBvYmoubmFtZSlcbiAgICAgICAgICAgICAgICAuaW5jbHVkZXMoc3RyZWFtLm5hbWUgPz8gJycpICYmXG4gICAgICAgICAgICAgICghZmlsdGVySG9zdCB8fCBzdHJlYW0ubmFtZSAhPSBob3N0Py5uYW1lKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChtZW1iZXJJblJvb20pIHtcbiAgICAgICAgICBsZXQgbWVtYmVyU3RyZWFtID0gYWxsU3RyZWFtc1BhZ2VkLmZpbmQoKHN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAncHJvZHVjZXJJZCcpICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT09ICcnXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHN0cmVhbS5wcm9kdWNlcklkID09ICd5b3V5b3UnIHx8IHN0cmVhbS5wcm9kdWNlcklkID09ICd5b3V5b3V5b3UnO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlOyAvLyBBZGQgYSByZXR1cm4gc3RhdGVtZW50IGhlcmVcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAobWVtYmVyU3RyZWFtICYmICFyZW1haW5pbmdTdHJlYW1zLmluY2x1ZGVzKG1lbWJlclN0cmVhbSkpIHtcbiAgICAgICAgICAgIHJlbWFpbmluZ1N0cmVhbXMudW5zaGlmdChtZW1iZXJTdHJlYW0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBsZXQgcmVtYWluaW5nUGFnaW5hdGVkU3RyZWFtcyA9IFtdO1xuXG4gICAgICAgIGlmIChyZW1haW5pbmdTdHJlYW1zLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBmaXJzdFBhZ2UgPSByZW1haW5pbmdTdHJlYW1zLnNsaWNlKDAsIGxpbWl0Xyk7XG4gICAgICAgICAgcmVtYWluaW5nUGFnaW5hdGVkU3RyZWFtcy5wdXNoKGZpcnN0UGFnZSk7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IGxpbWl0XzsgaSA8IHJlbWFpbmluZ1N0cmVhbXMubGVuZ3RoOyBpICs9IGxpbWl0KSB7XG4gICAgICAgICAgICBwYWdlID0gcmVtYWluaW5nU3RyZWFtcy5zbGljZShpLCBpICsgbGltaXQpO1xuICAgICAgICAgICAgcmVtYWluaW5nUGFnaW5hdGVkU3RyZWFtcy5wdXNoKHBhZ2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIG1haW5Sb29tc0xlbmd0aCA9IHJlbWFpbmluZ1BhZ2luYXRlZFN0cmVhbXMubGVuZ3RoO1xuICAgICAgICB1cGRhdGVNYWluUm9vbXNMZW5ndGgobWFpblJvb21zTGVuZ3RoKTtcbiAgICAgICAgLy8gQWRkIHRoZSByZW1haW5pbmcgc3RyZWFtcyB0byB0aGUgYmVnaW5uaW5nIG9mIHRoZSBwYWdpbmF0ZWRTdHJlYW1zXG4gICAgICAgIGZvciAobGV0IGkgPSByZW1haW5pbmdQYWdpbmF0ZWRTdHJlYW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XG4gICAgICAgICAgcGFnaW5hdGVkU3RyZWFtcy51bnNoaWZ0KHJlbWFpbmluZ1BhZ2luYXRlZFN0cmVhbXNbaV0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmaXJzdFBhZ2UgPSBhbGxTdHJlYW1zUGFnZWQuc2xpY2UoMCwgbGltaXRfKTtcbiAgICAgICAgcGFnaW5hdGVkU3RyZWFtcy5wdXNoKGZpcnN0UGFnZSk7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IGxpbWl0XzsgaSA8IGFsbFN0cmVhbXNQYWdlZC5sZW5ndGg7IGkgKz0gbGltaXQpIHtcbiAgICAgICAgICBwYWdlID0gYWxsU3RyZWFtc1BhZ2VkLnNsaWNlKGksIGkgKyBsaW1pdCk7XG4gICAgICAgICAgcGFnaW5hdGVkU3RyZWFtcy5wdXNoKHBhZ2UpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFN0YXRlIHVwZGF0ZXNcbiAgICAgIHVwZGF0ZVBfYWN0aXZlTmFtZXMocF9hY3RpdmVOYW1lcyk7XG4gICAgICB1cGRhdGVBY3RpdmVOYW1lcyhhY3RpdmVOYW1lcyk7XG4gICAgICB1cGRhdGVEaXNwQWN0aXZlTmFtZXMoZGlzcEFjdGl2ZU5hbWVzKTtcbiAgICAgIHVwZGF0ZU5ld0xpbWl0ZWRTdHJlYW1zKG5ld0xpbWl0ZWRTdHJlYW1zKTtcbiAgICAgIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtcyhub25fYWxWaWRlb1N0cmVhbXMpO1xuICAgICAgdXBkYXRlUmVmX3BhcnRpY2lwYW50cyhyZWZfcGFydGljaXBhbnRzKTtcbiAgICAgIHVwZGF0ZVNvcnRBdWRpb0xvdWRuZXNzKHNvcnRBdWRpb0xvdWRuZXNzKTtcbiAgICAgIHVwZGF0ZU1peGVkX2FsVmlkZW9TdHJlYW1zKG1peGVkX2FsVmlkZW9TdHJlYW1zKTtcbiAgICAgIHVwZGF0ZU5vbl9hbFZpZGVvU3RyZWFtc19tdXRlZChub25fYWxWaWRlb1N0cmVhbXNfbXV0ZWQpO1xuICAgICAgdXBkYXRlUGFnaW5hdGVkU3RyZWFtcyhwYWdpbmF0ZWRTdHJlYW1zKTtcblxuICAgICAgcHJldkRvUGFnaW5hdGUgPSBkb1BhZ2luYXRlO1xuICAgICAgZG9QYWdpbmF0ZSA9IGZhbHNlO1xuICAgICAgdXBkYXRlUHJldkRvUGFnaW5hdGUocHJldkRvUGFnaW5hdGUpO1xuICAgICAgdXBkYXRlRG9QYWdpbmF0ZShkb1BhZ2luYXRlKTtcblxuICAgICAgbGV0IGlzQWN0aXZlID0gZmFsc2U7XG5cbiAgICAgIGlmIChwYWdpbmF0ZWRTdHJlYW1zLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgaWYgKCFzaGFyZVNjcmVlblN0YXJ0ZWQgJiYgIXNoYXJlZCkge1xuICAgICAgICAgIGRvUGFnaW5hdGUgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICAgIHVwZGF0ZURvUGFnaW5hdGUoZG9QYWdpbmF0ZSk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRVc2VyUGFnZSA+IHBhZ2luYXRlZFN0cmVhbXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgIGlmIChicmVha091dFJvb21TdGFydGVkICYmICFicmVha091dFJvb21FbmRlZCkge1xuICAgICAgICAgICAgY3VycmVudFVzZXJQYWdlID0gMDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3VycmVudFVzZXJQYWdlID0gcGFnaW5hdGVkU3RyZWFtcy5sZW5ndGggLSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChjdXJyZW50VXNlclBhZ2UgPT0gMCkge1xuICAgICAgICAgIGlzQWN0aXZlID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICB1cGRhdGVDdXJyZW50VXNlclBhZ2UoY3VycmVudFVzZXJQYWdlKTtcbiAgICAgICAgdXBkYXRlTnVtYmVyUGFnZXMocGFnaW5hdGVkU3RyZWFtcy5sZW5ndGggLSAxKTtcblxuICAgICAgICBpZiAoc2NyZWVuQ2hhbmdlZCkge1xuICAgICAgICAgIGF3YWl0IGRpc3BTdHJlYW1zKHtcbiAgICAgICAgICAgIGxTdHJlYW1zOiBwYWdpbmF0ZWRTdHJlYW1zWzBdLFxuICAgICAgICAgICAgaW5kOiAwLFxuICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhd2FpdCBkaXNwU3RyZWFtcyh7XG4gICAgICAgICAgICBsU3RyZWFtczogcGFnaW5hdGVkU3RyZWFtc1swXSxcbiAgICAgICAgICAgIGluZDogMCxcbiAgICAgICAgICAgIGF1dG86IHRydWUsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc0FjdGl2ZSkge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRQYWdlQnJlYWsgPSBjdXJyZW50VXNlclBhZ2UgLSBtYWluUm9vbXNMZW5ndGg7XG4gICAgICAgICAgYXdhaXQgZGlzcFN0cmVhbXMoe1xuICAgICAgICAgICAgbFN0cmVhbXM6IHBhZ2luYXRlZFN0cmVhbXNbY3VycmVudFVzZXJQYWdlXSxcbiAgICAgICAgICAgIGluZDogY3VycmVudFVzZXJQYWdlLFxuICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICAgIGJyZWFrUm9vbTogY3VycmVudFBhZ2VCcmVhayxcbiAgICAgICAgICAgIGluQnJlYWtSb29tOiBjdXJyZW50UGFnZUJyZWFrID49IDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGN1cnJlbnRVc2VyUGFnZSA9IDA7XG4gICAgICAgIHVwZGF0ZUN1cnJlbnRVc2VyUGFnZShjdXJyZW50VXNlclBhZ2UpO1xuXG4gICAgICAgIGlmIChzY3JlZW5DaGFuZ2VkKSB7XG4gICAgICAgICAgYXdhaXQgZGlzcFN0cmVhbXMoe1xuICAgICAgICAgICAgbFN0cmVhbXM6IHBhZ2luYXRlZFN0cmVhbXNbMF0sXG4gICAgICAgICAgICBpbmQ6IDAsXG4gICAgICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGF3YWl0IGRpc3BTdHJlYW1zKHtcbiAgICAgICAgICAgIGxTdHJlYW1zOiBwYWdpbmF0ZWRTdHJlYW1zWzBdLFxuICAgICAgICAgICAgaW5kOiAwLFxuICAgICAgICAgICAgYXV0bzogdHJ1ZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ2NoYW5nZVZpZHMgZXJyb3InLCBlcnJvcik7XG4gICAgfVxuICB9O1xufVxuIl19