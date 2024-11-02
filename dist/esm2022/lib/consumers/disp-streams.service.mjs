import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Function to display streams based on various parameters and conditions.
 *
 * @param {DispStreamsOptions} options - The options object.
 * @param {Array<(Stream | Participant)>} options.lStreams - List of streams to display.
 * @param {number} options.ind - Index of the current stream.
 * @param {boolean} [options.auto=false] - Flag to indicate if the function should run automatically.
 * @param {boolean} [options.ChatSkip=false] - Flag to indicate if chat should be skipped.
 * @param {string|null} [options.forChatID=null] - ID for chat reference.
 * @param {DispStreamsParameters} options.parameters - Parameters object containing various settings and functions.
 * @param {number} [options.breakRoom=-1] - Break room number.
 * @param {boolean} [options.inBreakRoom=false] - Flag to indicate if in break room.
 *
 * @returns {Promise<void>} A promise that resolves when the function completes.
 *
 * @async
 *
 * @example
 * ```typescript
 * const options = {
 *   lStreams: [...], // Your streams data here
 *   ind: 0,
 *   auto: true,
 *   ChatSkip: false,
 *   parameters: {
 *     consumerTransports: [],
 *     streamNames: [],
 *     audStreamNames: [],
 *     participants: [],
 *     ref_participants: [],
 *     recordingDisplayType: 'video',
 *     recordingVideoOptimized: false,
 *     meetingDisplayType: 'video',
 *     meetingVideoOptimized: false,
 *     currentUserPage: 1,
 *     hostLabel: 'Host',
 *     mainHeightWidth: 100,
 *     prevMainHeightWidth: 100,
 *     prevDoPaginate: false,
 *     doPaginate: false,
 *     firstAll: false,
 *     shared: false,
 *     shareScreenStarted: false,
 *     shareEnded: false,
 *     oldAllStreams: [],
 *     updateMainWindow: false,
 *     remoteProducerId: null,
 *     activeNames: [],
 *     dispActiveNames: [],
 *     p_dispActiveNames: [],
 *     nForReadjustRecord: 0,
 *     first_round: false,
 *     lock_screen: false,
 *     chatRefStreams: [],
 *     eventType: 'normal',
 *     islevel: '1',
 *     localStreamVideo: null,
 *     breakOutRoomStarted: false,
 *     breakOutRoomEnded: false,
 *     keepBackground: false,
 *     virtualStream: null,
 *     updateActiveNames: (names) => {},
 *     updateDispActiveNames: (names) => {},
 *     updateLStreams: (streams) => {},
 *     updateChatRefStreams: (streams) => {},
 *     updateNForReadjustRecord: (n) => {},
 *     updateUpdateMainWindow: (value) => {},
 *     updateShowMiniView: (value) => {},
 *     prepopulateUserMedia: async () => {},
 *     rePort: async () => {},
 *     processConsumerTransports: async () => {},
 *     resumePauseStreams: async () => {},
 *     readjust: async () => {},
 *     addVideosGrid: async () => {},
 *     getEstimate: async () => {},
 *     checkGrid: async () => {},
 *     resumePauseAudioStreams: async () => {},
 *     getUpdatedAllParams: () => options.parameters,
 *   },
 *   breakRoom: -1,
 *   inBreakRoom: false,
 * };
 *
 * dispStreamsService.dispStreams(options)
 *   .then(() => {
 *     console.log('Streams displayed successfully');
 *   })
 *   .catch((error) => {
 *     console.error('Error displaying streams:', error);
 *   });
 * ```
 */
export class DispStreams {
    /**
     * Function to display streams based on various parameters and conditions.
     *
     * @param {Object} options - The options object.
     * @param {Array} options.lStreams - List of streams.
     * @param {number} options.ind - Index of the current stream.
     * @param {boolean} [options.auto=false] - Flag to indicate if the function should run automatically.
     * @param {boolean} [options.ChatSkip=false] - Flag to indicate if chat should be skipped.
     * @param {string|null} [options.forChatID=null] - ID for chat reference.
     * @param {Object} options.parameters - Parameters object containing various settings and functions.
     * @param {number} [options.breakRoom=-1] - Break room number.
     * @param {boolean} [options.inBreakRoom=false] - Flag to indicate if in break room.
     *
     * @returns {Promise<void>} - A promise that resolves when the function completes.
     *
     * @async
     */
    dispStreams = async ({ lStreams, ind, auto = false, ChatSkip = false, forChatID = null, parameters, breakRoom = -1, inBreakRoom = false, }) => {
        // function to display streams
        let { getUpdatedAllParams } = parameters;
        parameters = getUpdatedAllParams();
        let { consumerTransports, streamNames, audStreamNames, participants, ref_participants, recordingDisplayType, recordingVideoOptimized, meetingDisplayType, meetingVideoOptimized, currentUserPage, hostLabel, mainHeightWidth, prevMainHeightWidth, prevDoPaginate, doPaginate, firstAll, shared, shareScreenStarted, shareEnded, oldAllStreams, updateMainWindow, remoteProducerId, activeNames, dispActiveNames, p_dispActiveNames, nForReadjustRecord, first_round, lock_screen, chatRefStreams, eventType, islevel, localStreamVideo, breakOutRoomStarted, breakOutRoomEnded, keepBackground, virtualStream, updateActiveNames, updateDispActiveNames, updateLStreams, updateChatRefStreams, updateNForReadjustRecord, updateUpdateMainWindow, updateShowMiniView, prepopulateUserMedia, rePort, processConsumerTransports, resumePauseStreams, readjust, addVideosGrid, checkGrid, getEstimate, resumePauseAudioStreams, } = parameters;
        let proceed = true;
        let lStreams_ = lStreams.filter((stream) => stream.producerId !== 'youyou' && stream.producerId !== 'youyouyou');
        lStreams_ = lStreams_.filter((stream) => stream.id !== 'youyou' &&
            stream.id !== 'youyouyou' &&
            stream.name !== 'youyou' &&
            stream.name !== 'youyouyou');
        if (eventType === 'chat') {
            proceed = true;
        }
        else if (ind === 0 || (islevel !== '2' && currentUserPage === ind)) {
            proceed = false;
            lStreams_.forEach((stream) => {
                let checker = false;
                let check_level = 0;
                if (recordingDisplayType === 'video') {
                    if (recordingVideoOptimized) {
                        if (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                            stream.producerId != null &&
                            stream.producerId !== '') {
                            checker = true;
                            check_level = 0;
                        }
                    }
                    else {
                        if ((Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                            stream.producerId != null &&
                            stream.producerId !== '') ||
                            (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                                stream.audioID != null &&
                                stream.audioID !== '')) {
                            checker = true;
                            check_level = 1;
                        }
                    }
                }
                else if (recordingDisplayType === 'media') {
                    if ((Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                        stream.producerId != null &&
                        stream.producerId !== '') ||
                        (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                            stream.audioID != null &&
                            stream.audioID !== '')) {
                        checker = true;
                        check_level = 1;
                    }
                }
                else {
                    if ((Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                        stream.producerId != null &&
                        stream.producerId !== '') ||
                        (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                            stream.audioID != null &&
                            stream.audioID !== '') ||
                        (Object.prototype.hasOwnProperty.call(stream, 'name') &&
                            stream.name !== null &&
                            stream.name != '')) {
                        checker = true;
                        check_level = 2;
                    }
                }
                let participant;
                if (checker) {
                    if (check_level === 0) {
                        if (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                            stream.producerId != null &&
                            stream.producerId !== '') {
                            participant = streamNames.find((obj) => obj.producerId === stream.producerId);
                        }
                    }
                    else if (check_level === 1) {
                        if (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                            stream.producerId != null &&
                            stream.producerId !== '') {
                            participant = streamNames.find((obj) => obj.producerId === stream.producerId);
                        }
                        if (!participant) {
                            if (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                                stream.audioID != null &&
                                stream.audioID !== '') {
                                participant = audStreamNames.find((obj) => obj.producerId === stream.audioID);
                                if (!participant) {
                                    participant = ref_participants.find((obj) => obj.audioID === stream.audioID);
                                }
                            }
                        }
                    }
                    else if (check_level === 2) {
                        if (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                            stream.producerId != null &&
                            stream.producerId !== '') {
                            participant = streamNames.find((obj) => obj.producerId === stream.producerId);
                        }
                        if (!participant) {
                            if (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                                stream.audioID != null &&
                                stream.audioID !== '') {
                                participant = audStreamNames.find((obj) => obj.producerId === stream.audioID);
                                if (!participant) {
                                    participant = ref_participants.find((obj) => obj.audioID === stream.audioID);
                                }
                            }
                        }
                        if (!participant) {
                            if (Object.prototype.hasOwnProperty.call(stream, 'name') &&
                                stream.name !== null &&
                                stream.name != '') {
                                participant = ref_participants.find((obj) => obj.name === stream.name);
                            }
                        }
                    }
                    if (participant) {
                        if (participant.name && !activeNames.includes(participant.name)) {
                            activeNames.push(participant.name);
                        }
                    }
                }
            });
            updateActiveNames(activeNames);
            lStreams_.forEach((stream) => {
                let disp_checker = false;
                let disp_check_level = 0;
                if (meetingDisplayType === 'video') {
                    if (meetingVideoOptimized) {
                        if (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                            stream.producerId != null &&
                            stream.producerId !== '') {
                            disp_checker = true;
                            disp_check_level = 0;
                        }
                    }
                    else {
                        if ((Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                            stream.producerId != null &&
                            stream.producerId !== '') ||
                            (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                                stream.audioID != null &&
                                stream.audioID !== '')) {
                            disp_checker = true;
                            disp_check_level = 1;
                        }
                    }
                }
                else if (meetingDisplayType === 'media') {
                    if ((Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                        stream.producerId != null &&
                        stream.producerId !== '') ||
                        (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                            stream.audioID != null &&
                            stream.audioID !== '')) {
                        disp_checker = true;
                        disp_check_level = 1;
                    }
                }
                else {
                    if ((Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                        stream.producerId != null &&
                        stream.producerId !== '') ||
                        (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                            stream.audioID != null &&
                            stream.audioID !== '') ||
                        (Object.prototype.hasOwnProperty.call(stream, 'name') &&
                            stream.name !== null &&
                            stream.name != '')) {
                        disp_checker = true;
                        disp_check_level = 2;
                    }
                }
                let participant_;
                if (disp_checker) {
                    if (disp_check_level === 0) {
                        if (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                            stream.producerId != null &&
                            stream.producerId !== '') {
                            participant_ = streamNames.find((obj) => obj.producerId === stream.producerId);
                        }
                    }
                    else if (disp_check_level === 1) {
                        if (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                            stream.producerId != null &&
                            stream.producerId !== '') {
                            participant_ = streamNames.find((obj) => obj.producerId === stream.producerId);
                        }
                        if (!participant_) {
                            if (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                                stream.audioID != null &&
                                stream.audioID !== '') {
                                participant_ = audStreamNames.find((obj) => obj.producerId === stream.audioID);
                                if (!participant_) {
                                    participant_ = ref_participants.find((obj) => obj.audioID === stream.audioID);
                                }
                            }
                        }
                    }
                    else if (disp_check_level === 2) {
                        if (Object.prototype.hasOwnProperty.call(stream, 'producerId') &&
                            stream.producerId != null &&
                            stream.producerId !== '') {
                            participant_ = streamNames.find((obj) => obj.producerId === stream.producerId);
                        }
                        if (!participant_) {
                            if (Object.prototype.hasOwnProperty.call(stream, 'audioID') &&
                                stream.audioID != null &&
                                stream.audioID !== '') {
                                participant_ = audStreamNames.find((obj) => obj.producerId === stream.audioID);
                                if (!participant_) {
                                    participant_ = ref_participants.find((obj) => obj.audioID === stream.audioID);
                                }
                            }
                        }
                        if (!participant_) {
                            if (Object.prototype.hasOwnProperty.call(stream, 'name') &&
                                stream.name !== null &&
                                stream.name != '') {
                                participant_ = ref_participants.find((obj) => obj.name === stream.name);
                            }
                        }
                    }
                    if (participant_) {
                        if (participant_.name && !dispActiveNames.includes(participant_.name)) {
                            dispActiveNames.push(participant_.name);
                            if (!p_dispActiveNames.includes(participant_.name)) {
                                proceed = true;
                            }
                        }
                    }
                }
            });
            updateDispActiveNames(dispActiveNames);
            if (lStreams_.length < 1) {
                if (shareScreenStarted || shared) {
                    proceed = true;
                }
                else if (!firstAll) {
                    proceed = true;
                }
            }
            if (shareScreenStarted || shared) {
                // screen share started
            }
            else {
                if (prevMainHeightWidth !== mainHeightWidth) {
                    updateMainWindow = true;
                    updateUpdateMainWindow(updateMainWindow);
                }
            }
            nForReadjustRecord = activeNames.length;
            updateNForReadjustRecord(nForReadjustRecord);
        }
        if (!proceed && auto) {
            if (updateMainWindow) {
                if (!lock_screen && !shared) {
                    await prepopulateUserMedia({ name: hostLabel, parameters });
                }
                else {
                    if (!first_round) {
                        await prepopulateUserMedia({ name: hostLabel, parameters });
                    }
                }
            }
            if (ind === 0 && eventType !== 'chat') {
                await rePort({ parameters });
            }
            return;
        }
        if (eventType === 'broadcast') {
            lStreams = lStreams_;
            updateLStreams(lStreams);
        }
        else if (eventType === 'chat') {
            if (forChatID != null) {
                lStreams = chatRefStreams;
                updateLStreams(lStreams);
            }
            else {
                updateShowMiniView(false);
                if (islevel !== '2') {
                    let host = participants.find((obj) => obj.islevel === '2');
                    if (host) {
                        let streame;
                        remoteProducerId = host.videoID;
                        if (islevel === '2') {
                            host['stream'] = keepBackground && virtualStream ? virtualStream : localStreamVideo;
                        }
                        else {
                            streame = oldAllStreams.find((streame) => streame.producerId === remoteProducerId);
                            if (streame) {
                                lStreams = lStreams.filter((stream) => stream.name !== host.name);
                                lStreams.push(streame);
                            }
                        }
                    }
                }
                let youyou = lStreams.find((obj) => obj.producerId === 'youyou' || obj.producerId === 'youyouyou');
                lStreams = lStreams.filter((stream) => stream.producerId !== 'youyou' && stream.producerId !== 'youyouyou');
                if (youyou) {
                    lStreams.push(youyou);
                }
                chatRefStreams = lStreams;
                updateLStreams(lStreams);
                updateChatRefStreams(chatRefStreams);
            }
        }
        let refLength = lStreams.length;
        const [, rows, cols] = getEstimate({ n: refLength, parameters });
        let result = (await checkGrid({ rows, cols, actives: refLength })) || [false, 0, 0, 0, 0, 0, 0];
        let [removeAltGrid, numtoaddd, numRows, numCols, , actualRows, lastrowcols] = result;
        if (ChatSkip && eventType == 'chat') {
            numRows = 1;
            numCols = 1;
            actualRows = 1;
        }
        //if removeAltGrid is true then remove everyting from altGrid and add to mainGrid,check for streams on alvideoStreams and add to mainGrid that are not on mainGrid and add switching to true
        await readjust({ n: lStreams.length, state: ind, parameters });
        // split the streams into two arrays, one for mainGrid and one for altGrid
        // take up to numtoadd from the lStreams and add to mainGridStreams
        let mainGridStreams = lStreams.slice(0, numtoaddd);
        // take the rest of the streams and add to altGridStreams
        let altGridStreams = lStreams.slice(numtoaddd, lStreams.length);
        //add to grids
        if (doPaginate == true ||
            prevDoPaginate != doPaginate ||
            shared ||
            shareScreenStarted ||
            shareEnded) {
            let lStreams_alt = lStreams_;
            await processConsumerTransports({ consumerTransports, lStreams_: lStreams_alt, parameters });
            try {
                if (breakOutRoomStarted && !breakOutRoomEnded) {
                    await resumePauseAudioStreams({ inBreakRoom, breakRoom, parameters });
                }
            }
            catch (error) {
                // console.log('Error in resumePauseAudioStreams:', error);
            }
            try {
                if (!breakOutRoomStarted || (breakOutRoomStarted && breakOutRoomEnded)) {
                    await resumePauseStreams({ parameters });
                }
            }
            catch {
                /* handle error */
            }
            if (shareEnded) {
                shareEnded = false;
            }
        }
        if (ChatSkip && eventType == 'chat') {
            await addVideosGrid({
                mainGridStreams,
                altGridStreams,
                numtoadd: numtoaddd - 1,
                numRows,
                numCols,
                actualRows,
                lastrowcols,
                removeAltGrid,
                parameters,
            });
        }
        else {
            await addVideosGrid({
                mainGridStreams,
                altGridStreams,
                numtoadd: numtoaddd,
                numRows,
                numCols,
                actualRows,
                lastrowcols,
                removeAltGrid,
                parameters,
            });
        }
        if (updateMainWindow) {
            if (!lock_screen && !shared) {
                await prepopulateUserMedia({ name: hostLabel, parameters });
            }
            else {
                if (!first_round) {
                    await prepopulateUserMedia({ name: hostLabel, parameters });
                }
            }
        }
        if (ind == 0 && eventType !== 'chat') {
            await rePort({ parameters });
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: DispStreams, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: DispStreams, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: DispStreams, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcC1zdHJlYW1zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2Rpc3Atc3RyZWFtcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBK0d6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJGRztBQUtMLE1BQU0sT0FBTyxXQUFXO0lBQ3RCOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsV0FBVyxHQUFHLEtBQUssRUFBRSxFQUNuQixRQUFRLEVBQ1IsR0FBRyxFQUNILElBQUksR0FBRyxLQUFLLEVBQ1osUUFBUSxHQUFHLEtBQUssRUFDaEIsU0FBUyxHQUFHLElBQUksRUFDaEIsVUFBVSxFQUNWLFNBQVMsR0FBRyxDQUFDLENBQUMsRUFDZCxXQUFXLEdBQUcsS0FBSyxHQUNBLEVBQWlCLEVBQUU7UUFDdEMsOEJBQThCO1FBQzlCLElBQUksRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUN6QyxVQUFVLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztRQUVuQyxJQUFJLEVBQ0Ysa0JBQWtCLEVBQ2xCLFdBQVcsRUFDWCxjQUFjLEVBQ2QsWUFBWSxFQUNaLGdCQUFnQixFQUNoQixvQkFBb0IsRUFDcEIsdUJBQXVCLEVBQ3ZCLGtCQUFrQixFQUNsQixxQkFBcUIsRUFDckIsZUFBZSxFQUNmLFNBQVMsRUFDVCxlQUFlLEVBQ2YsbUJBQW1CLEVBQ25CLGNBQWMsRUFDZCxVQUFVLEVBQ1YsUUFBUSxFQUNSLE1BQU0sRUFDTixrQkFBa0IsRUFDbEIsVUFBVSxFQUNWLGFBQWEsRUFDYixnQkFBZ0IsRUFDaEIsZ0JBQWdC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QUNYLGFBQWE7Z0JBQ2IsVUFBVTthQUNYLENBQUMsQ0FBQztRQUNMLENBQUM7YUFBTSxDQUFDO1lBQ04sTUFBTSxhQUFhLENBQUM7Z0JBQ2xCLGVBQWU7Z0JBQ2YsY0FBYztnQkFDZCxRQUFRLEVBQUUsU0FBUztnQkFDbkIsT0FBTztnQkFDUCxPQUFPO2dCQUNQLFVBQVU7Z0JBQ1YsV0FBVztnQkFDWCxhQUFhO2dCQUNiLFVBQVU7YUFDWCxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsSUFBSSxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDNUIsTUFBTSxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztZQUM5RCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO29CQUNqQixNQUFNLG9CQUFvQixDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO2dCQUM5RCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFRCxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksU0FBUyxLQUFLLE1BQU0sRUFBRSxDQUFDO1lBQ3JDLE1BQU0sTUFBTSxDQUFDLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQW5pQlMsV0FBVzsyR0FBWCxXQUFXLGNBRlYsTUFBTTs7MkZBRVAsV0FBVztrQkFIdkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIFN0cmVhbSxcbiAgUGFydGljaXBhbnQsXG4gIFRyYW5zcG9ydCxcbiAgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzLFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGUsXG4gIFJlUG9ydFBhcmFtZXRlcnMsXG4gIFJlUG9ydFR5cGUsXG4gIFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNQYXJhbWV0ZXJzLFxuICBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzVHlwZSxcbiAgUmVzdW1lUGF1c2VTdHJlYW1zUGFyYW1ldGVycyxcbiAgUmVzdW1lUGF1c2VTdHJlYW1zVHlwZSxcbiAgUmVhZGp1c3RQYXJhbWV0ZXJzLFxuICBSZWFkanVzdFR5cGUsXG4gIEFkZFZpZGVvc0dyaWRUeXBlLFxuICBBZGRWaWRlb3NHcmlkUGFyYW1ldGVycyxcbiAgR2V0RXN0aW1hdGVUeXBlLFxuICBDaGVja0dyaWRUeXBlLFxuICBSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtc1BhcmFtZXRlcnMsXG4gIFJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zVHlwZSxcbiAgR2V0RXN0aW1hdGVQYXJhbWV0ZXJzLFxuICBFdmVudFR5cGUsXG59IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzcFN0cmVhbXNQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgUHJlcG9wdWxhdGVVc2VyTWVkaWFQYXJhbWV0ZXJzLFxuICAgIFJlUG9ydFBhcmFtZXRlcnMsXG4gICAgUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c1BhcmFtZXRlcnMsXG4gICAgUmVzdW1lUGF1c2VTdHJlYW1zUGFyYW1ldGVycyxcbiAgICBSZWFkanVzdFBhcmFtZXRlcnMsXG4gICAgUmVzdW1lUGF1c2VBdWRpb1N0cmVhbXNQYXJhbWV0ZXJzLFxuICAgIEdldEVzdGltYXRlUGFyYW1ldGVycyxcbiAgICBBZGRWaWRlb3NHcmlkUGFyYW1ldGVycyB7XG4gIGNvbnN1bWVyVHJhbnNwb3J0czogVHJhbnNwb3J0W107XG4gIHN0cmVhbU5hbWVzOiBTdHJlYW1bXTtcbiAgYXVkU3RyZWFtTmFtZXM6IFN0cmVhbVtdO1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIHJlZl9wYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIHJlY29yZGluZ0Rpc3BsYXlUeXBlOiAndmlkZW8nIHwgJ21lZGlhJyB8ICdhbGwnO1xuICByZWNvcmRpbmdWaWRlb09wdGltaXplZDogYm9vbGVhbjtcbiAgbWVldGluZ0Rpc3BsYXlUeXBlOiBzdHJpbmc7XG4gIG1lZXRpbmdWaWRlb09wdGltaXplZDogYm9vbGVhbjtcbiAgY3VycmVudFVzZXJQYWdlOiBudW1iZXI7XG4gIGhvc3RMYWJlbDogc3RyaW5nO1xuICBtYWluSGVpZ2h0V2lkdGg6IG51bWJlcjtcbiAgcHJldk1haW5IZWlnaHRXaWR0aDogbnVtYmVyO1xuICBwcmV2RG9QYWdpbmF0ZTogYm9vbGVhbjtcbiAgZG9QYWdpbmF0ZTogYm9vbGVhbjtcbiAgZmlyc3RBbGw6IGJvb2xlYW47XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBzaGFyZUVuZGVkOiBib29sZWFuO1xuICBvbGRBbGxTdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIHVwZGF0ZU1haW5XaW5kb3c6IGJvb2xlYW47XG4gIHJlbW90ZVByb2R1Y2VySWQ/OiBzdHJpbmc7XG4gIGFjdGl2ZU5hbWVzOiBzdHJpbmdbXTtcbiAgZGlzcEFjdGl2ZU5hbWVzOiBzdHJpbmdbXTtcbiAgcF9kaXNwQWN0aXZlTmFtZXM6IHN0cmluZ1tdO1xuICBuRm9yUmVhZGp1c3RSZWNvcmQ6IG51bWJlcjtcbiAgZmlyc3Rfcm91bmQ6IGJvb2xlYW47XG4gIGxvY2tfc2NyZWVuOiBib29sZWFuO1xuICBjaGF0UmVmU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBsb2NhbFN0cmVhbVZpZGVvOiBNZWRpYVN0cmVhbSB8IG51bGw7XG5cbiAgYnJlYWtPdXRSb29tU3RhcnRlZDogYm9vbGVhbjtcbiAgYnJlYWtPdXRSb29tRW5kZWQ6IGJvb2xlYW47XG4gIGtlZXBCYWNrZ3JvdW5kOiBib29sZWFuO1xuICB2aXJ0dWFsU3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGw7XG5cbiAgdXBkYXRlQWN0aXZlTmFtZXM6IChuYW1lczogc3RyaW5nW10pID0+IHZvaWQ7XG4gIHVwZGF0ZURpc3BBY3RpdmVOYW1lczogKG5hbWVzOiBzdHJpbmdbXSkgPT4gdm9pZDtcbiAgdXBkYXRlTFN0cmVhbXM6IChzdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW10pID0+IHZvaWQ7XG4gIHVwZGF0ZUNoYXRSZWZTdHJlYW1zOiAoc3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdKSA9PiB2b2lkO1xuICB1cGRhdGVORm9yUmVhZGp1c3RSZWNvcmQ6IChuOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlU2hvd01pbmlWaWV3OiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIHByZXBvcHVsYXRlVXNlck1lZGlhOiBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGU7XG4gIHJlUG9ydDogUmVQb3J0VHlwZTtcbiAgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0czogUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c1R5cGU7XG4gIHJlc3VtZVBhdXNlU3RyZWFtczogUmVzdW1lUGF1c2VTdHJlYW1zVHlwZTtcbiAgcmVhZGp1c3Q6IFJlYWRqdXN0VHlwZTtcbiAgYWRkVmlkZW9zR3JpZDogQWRkVmlkZW9zR3JpZFR5cGU7XG4gIGdldEVzdGltYXRlOiBHZXRFc3RpbWF0ZVR5cGU7XG4gIGNoZWNrR3JpZDogQ2hlY2tHcmlkVHlwZTtcbiAgcmVzdW1lUGF1c2VBdWRpb1N0cmVhbXM6IFJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBEaXNwU3RyZWFtc1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBEaXNwU3RyZWFtc09wdGlvbnMge1xuICBsU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBpbmQ6IG51bWJlcjtcbiAgYXV0bz86IGJvb2xlYW47XG4gIENoYXRTa2lwPzogYm9vbGVhbjtcbiAgZm9yQ2hhdENhcmQ/OiBhbnk7XG4gIGZvckNoYXRJRD86IGFueTtcbiAgcGFyYW1ldGVyczogRGlzcFN0cmVhbXNQYXJhbWV0ZXJzO1xuICBicmVha1Jvb20/OiBudW1iZXI7XG4gIGluQnJlYWtSb29tPzogYm9vbGVhbjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgRGlzcFN0cmVhbXNUeXBlID0gKG9wdGlvbnM6IERpc3BTdHJlYW1zT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuICAvKipcbiAgICogRnVuY3Rpb24gdG8gZGlzcGxheSBzdHJlYW1zIGJhc2VkIG9uIHZhcmlvdXMgcGFyYW1ldGVycyBhbmQgY29uZGl0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtEaXNwU3RyZWFtc09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSB7QXJyYXk8KFN0cmVhbSB8IFBhcnRpY2lwYW50KT59IG9wdGlvbnMubFN0cmVhbXMgLSBMaXN0IG9mIHN0cmVhbXMgdG8gZGlzcGxheS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMuaW5kIC0gSW5kZXggb2YgdGhlIGN1cnJlbnQgc3RyZWFtLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmF1dG89ZmFsc2VdIC0gRmxhZyB0byBpbmRpY2F0ZSBpZiB0aGUgZnVuY3Rpb24gc2hvdWxkIHJ1biBhdXRvbWF0aWNhbGx5LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLkNoYXRTa2lwPWZhbHNlXSAtIEZsYWcgdG8gaW5kaWNhdGUgaWYgY2hhdCBzaG91bGQgYmUgc2tpcHBlZC5cbiAgICogQHBhcmFtIHtzdHJpbmd8bnVsbH0gW29wdGlvbnMuZm9yQ2hhdElEPW51bGxdIC0gSUQgZm9yIGNoYXQgcmVmZXJlbmNlLlxuICAgKiBAcGFyYW0ge0Rpc3BTdHJlYW1zUGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gUGFyYW1ldGVycyBvYmplY3QgY29udGFpbmluZyB2YXJpb3VzIHNldHRpbmdzIGFuZCBmdW5jdGlvbnMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5icmVha1Jvb209LTFdIC0gQnJlYWsgcm9vbSBudW1iZXIuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuaW5CcmVha1Jvb209ZmFsc2VdIC0gRmxhZyB0byBpbmRpY2F0ZSBpZiBpbiBicmVhayByb29tLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZnVuY3Rpb24gY29tcGxldGVzLlxuICAgKlxuICAgKiBAYXN5bmNcbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjb25zdCBvcHRpb25zID0ge1xuICAgKiAgIGxTdHJlYW1zOiBbLi4uXSwgLy8gWW91ciBzdHJlYW1zIGRhdGEgaGVyZVxuICAgKiAgIGluZDogMCxcbiAgICogICBhdXRvOiB0cnVlLFxuICAgKiAgIENoYXRTa2lwOiBmYWxzZSxcbiAgICogICBwYXJhbWV0ZXJzOiB7XG4gICAqICAgICBjb25zdW1lclRyYW5zcG9ydHM6IFtdLFxuICAgKiAgICAgc3RyZWFtTmFtZXM6IFtdLFxuICAgKiAgICAgYXVkU3RyZWFtTmFtZXM6IFtdLFxuICAgKiAgICAgcGFydGljaXBhbnRzOiBbXSxcbiAgICogICAgIHJlZl9wYXJ0aWNpcGFudHM6IFtdLFxuICAgKiAgICAgcmVjb3JkaW5nRGlzcGxheVR5cGU6ICd2aWRlbycsXG4gICAqICAgICByZWNvcmRpbmdWaWRlb09wdGltaXplZDogZmFsc2UsXG4gICAqICAgICBtZWV0aW5nRGlzcGxheVR5cGU6ICd2aWRlbycsXG4gICAqICAgICBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQ6IGZhbHNlLFxuICAgKiAgICAgY3VycmVudFVzZXJQYWdlOiAxLFxuICAgKiAgICAgaG9zdExhYmVsOiAnSG9zdCcsXG4gICAqICAgICBtYWluSGVpZ2h0V2lkdGg6IDEwMCxcbiAgICogICAgIHByZXZNYWluSGVpZ2h0V2lkdGg6IDEwMCxcbiAgICogICAgIHByZXZEb1BhZ2luYXRlOiBmYWxzZSxcbiAgICogICAgIGRvUGFnaW5hdGU6IGZhbHNlLFxuICAgKiAgICAgZmlyc3RBbGw6IGZhbHNlLFxuICAgKiAgICAgc2hhcmVkOiBmYWxzZSxcbiAgICogICAgIHNoYXJlU2NyZWVuU3RhcnRlZDogZmFsc2UsXG4gICAqICAgICBzaGFyZUVuZGVkOiBmYWxzZSxcbiAgICogICAgIG9sZEFsbFN0cmVhbXM6IFtdLFxuICAgKiAgICAgdXBkYXRlTWFpbldpbmRvdzogZmFsc2UsXG4gICAqICAgICByZW1vdGVQcm9kdWNlcklkOiBudWxsLFxuICAgKiAgICAgYWN0aXZlTmFtZXM6IFtdLFxuICAgKiAgICAgZGlzcEFjdGl2ZU5hbWVzOiBbXSxcbiAgICogICAgIHBfZGlzcEFjdGl2ZU5hbWVzOiBbXSxcbiAgICogICAgIG5Gb3JSZWFkanVzdFJlY29yZDogMCxcbiAgICogICAgIGZpcnN0X3JvdW5kOiBmYWxzZSxcbiAgICogICAgIGxvY2tfc2NyZWVuOiBmYWxzZSxcbiAgICogICAgIGNoYXRSZWZTdHJlYW1zOiBbXSxcbiAgICogICAgIGV2ZW50VHlwZTogJ25vcm1hbCcsXG4gICAqICAgICBpc2xldmVsOiAnMScsXG4gICAqICAgICBsb2NhbFN0cmVhbVZpZGVvOiBudWxsLFxuICAgKiAgICAgYnJlYWtPdXRSb29tU3RhcnRlZDogZmFsc2UsXG4gICAqICAgICBicmVha091dFJvb21FbmRlZDogZmFsc2UsXG4gICAqICAgICBrZWVwQmFja2dyb3VuZDogZmFsc2UsXG4gICAqICAgICB2aXJ0dWFsU3RyZWFtOiBudWxsLFxuICAgKiAgICAgdXBkYXRlQWN0aXZlTmFtZXM6IChuYW1lcykgPT4ge30sXG4gICAqICAgICB1cGRhdGVEaXNwQWN0aXZlTmFtZXM6IChuYW1lcykgPT4ge30sXG4gICAqICAgICB1cGRhdGVMU3RyZWFtczogKHN0cmVhbXMpID0+IHt9LFxuICAgKiAgICAgdXBkYXRlQ2hhdFJlZlN0cmVhbXM6IChzdHJlYW1zKSA9PiB7fSxcbiAgICogICAgIHVwZGF0ZU5Gb3JSZWFkanVzdFJlY29yZDogKG4pID0+IHt9LFxuICAgKiAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdzogKHZhbHVlKSA9PiB7fSxcbiAgICogICAgIHVwZGF0ZVNob3dNaW5pVmlldzogKHZhbHVlKSA9PiB7fSxcbiAgICogICAgIHByZXBvcHVsYXRlVXNlck1lZGlhOiBhc3luYyAoKSA9PiB7fSxcbiAgICogICAgIHJlUG9ydDogYXN5bmMgKCkgPT4ge30sXG4gICAqICAgICBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzOiBhc3luYyAoKSA9PiB7fSxcbiAgICogICAgIHJlc3VtZVBhdXNlU3RyZWFtczogYXN5bmMgKCkgPT4ge30sXG4gICAqICAgICByZWFkanVzdDogYXN5bmMgKCkgPT4ge30sXG4gICAqICAgICBhZGRWaWRlb3NHcmlkOiBhc3luYyAoKSA9PiB7fSxcbiAgICogICAgIGdldEVzdGltYXRlOiBhc3luYyAoKSA9PiB7fSxcbiAgICogICAgIGNoZWNrR3JpZDogYXN5bmMgKCkgPT4ge30sXG4gICAqICAgICByZXN1bWVQYXVzZUF1ZGlvU3RyZWFtczogYXN5bmMgKCkgPT4ge30sXG4gICAqICAgICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBvcHRpb25zLnBhcmFtZXRlcnMsXG4gICAqICAgfSxcbiAgICogICBicmVha1Jvb206IC0xLFxuICAgKiAgIGluQnJlYWtSb29tOiBmYWxzZSxcbiAgICogfTtcbiAgICpcbiAgICogZGlzcFN0cmVhbXNTZXJ2aWNlLmRpc3BTdHJlYW1zKG9wdGlvbnMpXG4gICAqICAgLnRoZW4oKCkgPT4ge1xuICAgKiAgICAgY29uc29sZS5sb2coJ1N0cmVhbXMgZGlzcGxheWVkIHN1Y2Nlc3NmdWxseScpO1xuICAgKiAgIH0pXG4gICAqICAgLmNhdGNoKChlcnJvcikgPT4ge1xuICAgKiAgICAgY29uc29sZS5lcnJvcignRXJyb3IgZGlzcGxheWluZyBzdHJlYW1zOicsIGVycm9yKTtcbiAgICogICB9KTtcbiAgICogYGBgXG4gICAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRGlzcFN0cmVhbXMge1xuICAvKipcbiAgICogRnVuY3Rpb24gdG8gZGlzcGxheSBzdHJlYW1zIGJhc2VkIG9uIHZhcmlvdXMgcGFyYW1ldGVycyBhbmQgY29uZGl0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBvYmplY3QuXG4gICAqIEBwYXJhbSB7QXJyYXl9IG9wdGlvbnMubFN0cmVhbXMgLSBMaXN0IG9mIHN0cmVhbXMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmluZCAtIEluZGV4IG9mIHRoZSBjdXJyZW50IHN0cmVhbS5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5hdXRvPWZhbHNlXSAtIEZsYWcgdG8gaW5kaWNhdGUgaWYgdGhlIGZ1bmN0aW9uIHNob3VsZCBydW4gYXV0b21hdGljYWxseS5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5DaGF0U2tpcD1mYWxzZV0gLSBGbGFnIHRvIGluZGljYXRlIGlmIGNoYXQgc2hvdWxkIGJlIHNraXBwZWQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfG51bGx9IFtvcHRpb25zLmZvckNoYXRJRD1udWxsXSAtIElEIGZvciBjaGF0IHJlZmVyZW5jZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFBhcmFtZXRlcnMgb2JqZWN0IGNvbnRhaW5pbmcgdmFyaW91cyBzZXR0aW5ncyBhbmQgZnVuY3Rpb25zLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuYnJlYWtSb29tPS0xXSAtIEJyZWFrIHJvb20gbnVtYmVyLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmluQnJlYWtSb29tPWZhbHNlXSAtIEZsYWcgdG8gaW5kaWNhdGUgaWYgaW4gYnJlYWsgcm9vbS5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IC0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgZnVuY3Rpb24gY29tcGxldGVzLlxuICAgKlxuICAgKiBAYXN5bmNcbiAgICovXG4gIGRpc3BTdHJlYW1zID0gYXN5bmMgKHtcbiAgICBsU3RyZWFtcyxcbiAgICBpbmQsXG4gICAgYXV0byA9IGZhbHNlLFxuICAgIENoYXRTa2lwID0gZmFsc2UsXG4gICAgZm9yQ2hhdElEID0gbnVsbCxcbiAgICBwYXJhbWV0ZXJzLFxuICAgIGJyZWFrUm9vbSA9IC0xLFxuICAgIGluQnJlYWtSb29tID0gZmFsc2UsXG4gIH06IERpc3BTdHJlYW1zT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIC8vIGZ1bmN0aW9uIHRvIGRpc3BsYXkgc3RyZWFtc1xuICAgIGxldCB7IGdldFVwZGF0ZWRBbGxQYXJhbXMgfSA9IHBhcmFtZXRlcnM7XG4gICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgIGxldCB7XG4gICAgICBjb25zdW1lclRyYW5zcG9ydHMsXG4gICAgICBzdHJlYW1OYW1lcyxcbiAgICAgIGF1ZFN0cmVhbU5hbWVzLFxuICAgICAgcGFydGljaXBhbnRzLFxuICAgICAgcmVmX3BhcnRpY2lwYW50cyxcbiAgICAgIHJlY29yZGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQsXG4gICAgICBtZWV0aW5nRGlzcGxheVR5cGUsXG4gICAgICBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQsXG4gICAgICBjdXJyZW50VXNlclBhZ2UsXG4gICAgICBob3N0TGFiZWwsXG4gICAgICBtYWluSGVpZ2h0V2lkdGgsXG4gICAgICBwcmV2TWFpbkhlaWdodFdpZHRoLFxuICAgICAgcHJldkRvUGFnaW5hdGUsXG4gICAgICBkb1BhZ2luYXRlLFxuICAgICAgZmlyc3RBbGwsXG4gICAgICBzaGFyZWQsXG4gICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICBzaGFyZUVuZGVkLFxuICAgICAgb2xkQWxsU3RyZWFtcyxcbiAgICAgIHVwZGF0ZU1haW5XaW5kb3csXG4gICAgICByZW1vdGVQcm9kdWNlcklkLFxuICAgICAgYWN0aXZlTmFtZXMsXG4gICAgICBkaXNwQWN0aXZlTmFtZXMsXG4gICAgICBwX2Rpc3BBY3RpdmVOYW1lcyxcbiAgICAgIG5Gb3JSZWFkanVzdFJlY29yZCxcbiAgICAgIGZpcnN0X3JvdW5kLFxuICAgICAgbG9ja19zY3JlZW4sXG4gICAgICBjaGF0UmVmU3RyZWFtcyxcbiAgICAgIGV2ZW50VHlwZSxcbiAgICAgIGlzbGV2ZWwsXG4gICAgICBsb2NhbFN0cmVhbVZpZGVvLFxuXG4gICAgICBicmVha091dFJvb21TdGFydGVkLFxuICAgICAgYnJlYWtPdXRSb29tRW5kZWQsXG4gICAgICBrZWVwQmFja2dyb3VuZCxcbiAgICAgIHZpcnR1YWxTdHJlYW0sXG5cbiAgICAgIHVwZGF0ZUFjdGl2ZU5hbWVzLFxuICAgICAgdXBkYXRlRGlzcEFjdGl2ZU5hbWVzLFxuICAgICAgdXBkYXRlTFN0cmVhbXMsXG4gICAgICB1cGRhdGVDaGF0UmVmU3RyZWFtcyxcbiAgICAgIHVwZGF0ZU5Gb3JSZWFkanVzdFJlY29yZCxcbiAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3csXG4gICAgICB1cGRhdGVTaG93TWluaVZpZXcsXG5cbiAgICAgIHByZXBvcHVsYXRlVXNlck1lZGlhLFxuICAgICAgcmVQb3J0LFxuICAgICAgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0cyxcbiAgICAgIHJlc3VtZVBhdXNlU3RyZWFtcyxcbiAgICAgIHJlYWRqdXN0LFxuICAgICAgYWRkVmlkZW9zR3JpZCxcbiAgICAgIGNoZWNrR3JpZCxcbiAgICAgIGdldEVzdGltYXRlLFxuICAgICAgcmVzdW1lUGF1c2VBdWRpb1N0cmVhbXMsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICBsZXQgcHJvY2VlZCA9IHRydWU7XG5cbiAgICBsZXQgbFN0cmVhbXNfID0gbFN0cmVhbXMuZmlsdGVyKFxuICAgICAgKHN0cmVhbSkgPT4gc3RyZWFtLnByb2R1Y2VySWQgIT09ICd5b3V5b3UnICYmIHN0cmVhbS5wcm9kdWNlcklkICE9PSAneW91eW91eW91JyxcbiAgICApO1xuICAgIGxTdHJlYW1zXyA9IGxTdHJlYW1zXy5maWx0ZXIoXG4gICAgICAoc3RyZWFtKSA9PlxuICAgICAgICBzdHJlYW0uaWQgIT09ICd5b3V5b3UnICYmXG4gICAgICAgIHN0cmVhbS5pZCAhPT0gJ3lvdXlvdXlvdScgJiZcbiAgICAgICAgc3RyZWFtLm5hbWUgIT09ICd5b3V5b3UnICYmXG4gICAgICAgIHN0cmVhbS5uYW1lICE9PSAneW91eW91eW91JyxcbiAgICApO1xuXG4gICAgaWYgKGV2ZW50VHlwZSA9PT0gJ2NoYXQnKSB7XG4gICAgICBwcm9jZWVkID0gdHJ1ZTtcbiAgICB9IGVsc2UgaWYgKGluZCA9PT0gMCB8fCAoaXNsZXZlbCAhPT0gJzInICYmIGN1cnJlbnRVc2VyUGFnZSA9PT0gaW5kKSkge1xuICAgICAgcHJvY2VlZCA9IGZhbHNlO1xuXG4gICAgICBsU3RyZWFtc18uZm9yRWFjaCgoc3RyZWFtKSA9PiB7XG4gICAgICAgIGxldCBjaGVja2VyID0gZmFsc2U7XG4gICAgICAgIGxldCBjaGVja19sZXZlbCA9IDA7XG5cbiAgICAgICAgaWYgKHJlY29yZGluZ0Rpc3BsYXlUeXBlID09PSAndmlkZW8nKSB7XG4gICAgICAgICAgaWYgKHJlY29yZGluZ1ZpZGVvT3B0aW1pemVkKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdwcm9kdWNlcklkJykgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPT0gJydcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjaGVja2VyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgY2hlY2tfbGV2ZWwgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAncHJvZHVjZXJJZCcpICYmXG4gICAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9PSAnJykgfHxcbiAgICAgICAgICAgICAgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdhdWRpb0lEJykgJiZcbiAgICAgICAgICAgICAgICBzdHJlYW0uYXVkaW9JRCAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgc3RyZWFtLmF1ZGlvSUQgIT09ICcnKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNoZWNrZXIgPSB0cnVlO1xuICAgICAgICAgICAgICBjaGVja19sZXZlbCA9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHJlY29yZGluZ0Rpc3BsYXlUeXBlID09PSAnbWVkaWEnKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdwcm9kdWNlcklkJykgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPT0gJycpIHx8XG4gICAgICAgICAgICAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ2F1ZGlvSUQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0uYXVkaW9JRCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5hdWRpb0lEICE9PSAnJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNoZWNrZXIgPSB0cnVlO1xuICAgICAgICAgICAgY2hlY2tfbGV2ZWwgPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9PSAnJykgfHxcbiAgICAgICAgICAgIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAnYXVkaW9JRCcpICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5hdWRpb0lEICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLmF1ZGlvSUQgIT09ICcnKSB8fFxuICAgICAgICAgICAgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICduYW1lJykgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLm5hbWUgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLm5hbWUgIT0gJycpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBjaGVja2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIGNoZWNrX2xldmVsID0gMjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgcGFydGljaXBhbnQ7XG5cbiAgICAgICAgaWYgKGNoZWNrZXIpIHtcbiAgICAgICAgICBpZiAoY2hlY2tfbGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9PSAnJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHBhcnRpY2lwYW50ID0gc3RyZWFtTmFtZXMuZmluZCgob2JqOiBhbnkpID0+IG9iai5wcm9kdWNlcklkID09PSBzdHJlYW0ucHJvZHVjZXJJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChjaGVja19sZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAncHJvZHVjZXJJZCcpICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT09ICcnXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcGFydGljaXBhbnQgPSBzdHJlYW1OYW1lcy5maW5kKChvYmo6IGFueSkgPT4gb2JqLnByb2R1Y2VySWQgPT09IHN0cmVhbS5wcm9kdWNlcklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcGFydGljaXBhbnQpIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdhdWRpb0lEJykgJiZcbiAgICAgICAgICAgICAgICBzdHJlYW0uYXVkaW9JRCAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgc3RyZWFtLmF1ZGlvSUQgIT09ICcnXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50ID0gYXVkU3RyZWFtTmFtZXMuZmluZCgob2JqOiBhbnkpID0+IG9iai5wcm9kdWNlcklkID09PSBzdHJlYW0uYXVkaW9JRCk7XG4gICAgICAgICAgICAgICAgaWYgKCFwYXJ0aWNpcGFudCkge1xuICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQgPSByZWZfcGFydGljaXBhbnRzLmZpbmQoKG9iajogYW55KSA9PiBvYmouYXVkaW9JRCA9PT0gc3RyZWFtLmF1ZGlvSUQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoY2hlY2tfbGV2ZWwgPT09IDIpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9PSAnJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHBhcnRpY2lwYW50ID0gc3RyZWFtTmFtZXMuZmluZCgob2JqOiBhbnkpID0+IG9iai5wcm9kdWNlcklkID09PSBzdHJlYW0ucHJvZHVjZXJJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXBhcnRpY2lwYW50KSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAnYXVkaW9JRCcpICYmXG4gICAgICAgICAgICAgICAgc3RyZWFtLmF1ZGlvSUQgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHN0cmVhbS5hdWRpb0lEICE9PSAnJ1xuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudCA9IGF1ZFN0cmVhbU5hbWVzLmZpbmQoKG9iajogYW55KSA9PiBvYmoucHJvZHVjZXJJZCA9PT0gc3RyZWFtLmF1ZGlvSUQpO1xuICAgICAgICAgICAgICAgIGlmICghcGFydGljaXBhbnQpIHtcbiAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50ID0gcmVmX3BhcnRpY2lwYW50cy5maW5kKChvYmo6IGFueSkgPT4gb2JqLmF1ZGlvSUQgPT09IHN0cmVhbS5hdWRpb0lEKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcGFydGljaXBhbnQpIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICduYW1lJykgJiZcbiAgICAgICAgICAgICAgICBzdHJlYW0ubmFtZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHN0cmVhbS5uYW1lICE9ICcnXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50ID0gcmVmX3BhcnRpY2lwYW50cy5maW5kKChvYmo6IGFueSkgPT4gb2JqLm5hbWUgPT09IHN0cmVhbS5uYW1lKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChwYXJ0aWNpcGFudCkge1xuICAgICAgICAgICAgaWYgKHBhcnRpY2lwYW50Lm5hbWUgJiYgIWFjdGl2ZU5hbWVzLmluY2x1ZGVzKHBhcnRpY2lwYW50Lm5hbWUpKSB7XG4gICAgICAgICAgICAgIGFjdGl2ZU5hbWVzLnB1c2gocGFydGljaXBhbnQubmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdXBkYXRlQWN0aXZlTmFtZXMoYWN0aXZlTmFtZXMpO1xuXG4gICAgICBsU3RyZWFtc18uZm9yRWFjaCgoc3RyZWFtKSA9PiB7XG4gICAgICAgIGxldCBkaXNwX2NoZWNrZXIgPSBmYWxzZTtcbiAgICAgICAgbGV0IGRpc3BfY2hlY2tfbGV2ZWwgPSAwO1xuXG4gICAgICAgIGlmIChtZWV0aW5nRGlzcGxheVR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICBpZiAobWVldGluZ1ZpZGVvT3B0aW1pemVkKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdwcm9kdWNlcklkJykgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPT0gJydcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBkaXNwX2NoZWNrZXIgPSB0cnVlO1xuICAgICAgICAgICAgICBkaXNwX2NoZWNrX2xldmVsID0gMDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPT0gJycpIHx8XG4gICAgICAgICAgICAgIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAnYXVkaW9JRCcpICYmXG4gICAgICAgICAgICAgICAgc3RyZWFtLmF1ZGlvSUQgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHN0cmVhbS5hdWRpb0lEICE9PSAnJylcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBkaXNwX2NoZWNrZXIgPSB0cnVlO1xuICAgICAgICAgICAgICBkaXNwX2NoZWNrX2xldmVsID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAobWVldGluZ0Rpc3BsYXlUeXBlID09PSAnbWVkaWEnKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdwcm9kdWNlcklkJykgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPT0gJycpIHx8XG4gICAgICAgICAgICAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ2F1ZGlvSUQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0uYXVkaW9JRCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5hdWRpb0lEICE9PSAnJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGRpc3BfY2hlY2tlciA9IHRydWU7XG4gICAgICAgICAgICBkaXNwX2NoZWNrX2xldmVsID0gMTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdwcm9kdWNlcklkJykgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPT0gJycpIHx8XG4gICAgICAgICAgICAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ2F1ZGlvSUQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0uYXVkaW9JRCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5hdWRpb0lEICE9PSAnJykgfHxcbiAgICAgICAgICAgIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAnbmFtZScpICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5uYW1lICE9PSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5uYW1lICE9ICcnKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgZGlzcF9jaGVja2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIGRpc3BfY2hlY2tfbGV2ZWwgPSAyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJ0aWNpcGFudF87XG5cbiAgICAgICAgaWYgKGRpc3BfY2hlY2tlcikge1xuICAgICAgICAgIGlmIChkaXNwX2NoZWNrX2xldmVsID09PSAwKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdwcm9kdWNlcklkJykgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPT0gJydcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBwYXJ0aWNpcGFudF8gPSBzdHJlYW1OYW1lcy5maW5kKChvYmo6IGFueSkgPT4gb2JqLnByb2R1Y2VySWQgPT09IHN0cmVhbS5wcm9kdWNlcklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGRpc3BfY2hlY2tfbGV2ZWwgPT09IDEpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9PSAnJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHBhcnRpY2lwYW50XyA9IHN0cmVhbU5hbWVzLmZpbmQoKG9iajogYW55KSA9PiBvYmoucHJvZHVjZXJJZCA9PT0gc3RyZWFtLnByb2R1Y2VySWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwYXJ0aWNpcGFudF8pIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdhdWRpb0lEJykgJiZcbiAgICAgICAgICAgICAgICBzdHJlYW0uYXVkaW9JRCAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgc3RyZWFtLmF1ZGlvSUQgIT09ICcnXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50XyA9IGF1ZFN0cmVhbU5hbWVzLmZpbmQoKG9iajogYW55KSA9PiBvYmoucHJvZHVjZXJJZCA9PT0gc3RyZWFtLmF1ZGlvSUQpO1xuICAgICAgICAgICAgICAgIGlmICghcGFydGljaXBhbnRfKSB7XG4gICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudF8gPSByZWZfcGFydGljaXBhbnRzLmZpbmQoXG4gICAgICAgICAgICAgICAgICAgIChvYmo6IGFueSkgPT4gb2JqLmF1ZGlvSUQgPT09IHN0cmVhbS5hdWRpb0lELFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGRpc3BfY2hlY2tfbGV2ZWwgPT09IDIpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9PSAnJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHBhcnRpY2lwYW50XyA9IHN0cmVhbU5hbWVzLmZpbmQoKG9iajogYW55KSA9PiBvYmoucHJvZHVjZXJJZCA9PT0gc3RyZWFtLnByb2R1Y2VySWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwYXJ0aWNpcGFudF8pIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdhdWRpb0lEJykgJiZcbiAgICAgICAgICAgICAgICBzdHJlYW0uYXVkaW9JRCAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgc3RyZWFtLmF1ZGlvSUQgIT09ICcnXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50XyA9IGF1ZFN0cmVhbU5hbWVzLmZpbmQoKG9iajogYW55KSA9PiBvYmoucHJvZHVjZXJJZCA9PT0gc3RyZWFtLmF1ZGlvSUQpO1xuICAgICAgICAgICAgICAgIGlmICghcGFydGljaXBhbnRfKSB7XG4gICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudF8gPSByZWZfcGFydGljaXBhbnRzLmZpbmQoXG4gICAgICAgICAgICAgICAgICAgIChvYmo6IGFueSkgPT4gb2JqLmF1ZGlvSUQgPT09IHN0cmVhbS5hdWRpb0lELFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcGFydGljaXBhbnRfKSB7XG4gICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAnbmFtZScpICYmXG4gICAgICAgICAgICAgICAgc3RyZWFtLm5hbWUgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgICBzdHJlYW0ubmFtZSAhPSAnJ1xuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudF8gPSByZWZfcGFydGljaXBhbnRzLmZpbmQoKG9iajogYW55KSA9PiBvYmoubmFtZSA9PT0gc3RyZWFtLm5hbWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcnRpY2lwYW50Xykge1xuICAgICAgICAgICAgaWYgKHBhcnRpY2lwYW50Xy5uYW1lICYmICFkaXNwQWN0aXZlTmFtZXMuaW5jbHVkZXMocGFydGljaXBhbnRfLm5hbWUpKSB7XG4gICAgICAgICAgICAgIGRpc3BBY3RpdmVOYW1lcy5wdXNoKHBhcnRpY2lwYW50Xy5uYW1lKTtcbiAgICAgICAgICAgICAgaWYgKCFwX2Rpc3BBY3RpdmVOYW1lcy5pbmNsdWRlcyhwYXJ0aWNpcGFudF8ubmFtZSkpIHtcbiAgICAgICAgICAgICAgICBwcm9jZWVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIHVwZGF0ZURpc3BBY3RpdmVOYW1lcyhkaXNwQWN0aXZlTmFtZXMpO1xuXG4gICAgICBpZiAobFN0cmVhbXNfLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgaWYgKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpIHtcbiAgICAgICAgICBwcm9jZWVkID0gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIGlmICghZmlyc3RBbGwpIHtcbiAgICAgICAgICBwcm9jZWVkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkge1xuICAgICAgICAvLyBzY3JlZW4gc2hhcmUgc3RhcnRlZFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHByZXZNYWluSGVpZ2h0V2lkdGggIT09IG1haW5IZWlnaHRXaWR0aCkge1xuICAgICAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSB0cnVlO1xuICAgICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbkZvclJlYWRqdXN0UmVjb3JkID0gYWN0aXZlTmFtZXMubGVuZ3RoO1xuICAgICAgdXBkYXRlTkZvclJlYWRqdXN0UmVjb3JkKG5Gb3JSZWFkanVzdFJlY29yZCk7XG4gICAgfVxuXG4gICAgaWYgKCFwcm9jZWVkICYmIGF1dG8pIHtcbiAgICAgIGlmICh1cGRhdGVNYWluV2luZG93KSB7XG4gICAgICAgIGlmICghbG9ja19zY3JlZW4gJiYgIXNoYXJlZCkge1xuICAgICAgICAgIGF3YWl0IHByZXBvcHVsYXRlVXNlck1lZGlhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmICghZmlyc3Rfcm91bmQpIHtcbiAgICAgICAgICAgIGF3YWl0IHByZXBvcHVsYXRlVXNlck1lZGlhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoaW5kID09PSAwICYmIGV2ZW50VHlwZSAhPT0gJ2NoYXQnKSB7XG4gICAgICAgIGF3YWl0IHJlUG9ydCh7IHBhcmFtZXRlcnMgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGV2ZW50VHlwZSA9PT0gJ2Jyb2FkY2FzdCcpIHtcbiAgICAgIGxTdHJlYW1zID0gbFN0cmVhbXNfO1xuICAgICAgdXBkYXRlTFN0cmVhbXMobFN0cmVhbXMpO1xuICAgIH0gZWxzZSBpZiAoZXZlbnRUeXBlID09PSAnY2hhdCcpIHtcbiAgICAgIGlmIChmb3JDaGF0SUQgIT0gbnVsbCkge1xuICAgICAgICBsU3RyZWFtcyA9IGNoYXRSZWZTdHJlYW1zO1xuICAgICAgICB1cGRhdGVMU3RyZWFtcyhsU3RyZWFtcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cGRhdGVTaG93TWluaVZpZXcoZmFsc2UpO1xuXG4gICAgICAgIGlmIChpc2xldmVsICE9PSAnMicpIHtcbiAgICAgICAgICBsZXQgaG9zdCA9IHBhcnRpY2lwYW50cy5maW5kKChvYmo6IGFueSkgPT4gb2JqLmlzbGV2ZWwgPT09ICcyJyk7XG4gICAgICAgICAgaWYgKGhvc3QpIHtcbiAgICAgICAgICAgIGxldCBzdHJlYW1lO1xuICAgICAgICAgICAgcmVtb3RlUHJvZHVjZXJJZCA9IGhvc3QudmlkZW9JRDtcbiAgICAgICAgICAgIGlmIChpc2xldmVsID09PSAnMicpIHtcbiAgICAgICAgICAgICAgaG9zdFsnc3RyZWFtJ10gPSBrZWVwQmFja2dyb3VuZCAmJiB2aXJ0dWFsU3RyZWFtID8gdmlydHVhbFN0cmVhbSA6IGxvY2FsU3RyZWFtVmlkZW87XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdHJlYW1lID0gb2xkQWxsU3RyZWFtcy5maW5kKFxuICAgICAgICAgICAgICAgIChzdHJlYW1lOiBhbnkpID0+IHN0cmVhbWUucHJvZHVjZXJJZCA9PT0gcmVtb3RlUHJvZHVjZXJJZCxcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKHN0cmVhbWUpIHtcbiAgICAgICAgICAgICAgICBsU3RyZWFtcyA9IGxTdHJlYW1zLmZpbHRlcigoc3RyZWFtKSA9PiBzdHJlYW0ubmFtZSAhPT0gaG9zdC5uYW1lKTtcbiAgICAgICAgICAgICAgICBsU3RyZWFtcy5wdXNoKHN0cmVhbWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHlvdXlvdSA9IGxTdHJlYW1zLmZpbmQoXG4gICAgICAgICAgKG9iajogYW55KSA9PiBvYmoucHJvZHVjZXJJZCA9PT0gJ3lvdXlvdScgfHwgb2JqLnByb2R1Y2VySWQgPT09ICd5b3V5b3V5b3UnLFxuICAgICAgICApO1xuICAgICAgICBsU3RyZWFtcyA9IGxTdHJlYW1zLmZpbHRlcihcbiAgICAgICAgICAoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCAhPT0gJ3lvdXlvdScgJiYgc3RyZWFtLnByb2R1Y2VySWQgIT09ICd5b3V5b3V5b3UnLFxuICAgICAgICApO1xuICAgICAgICBpZiAoeW91eW91KSB7XG4gICAgICAgICAgbFN0cmVhbXMucHVzaCh5b3V5b3UpO1xuICAgICAgICB9XG5cbiAgICAgICAgY2hhdFJlZlN0cmVhbXMgPSBsU3RyZWFtcztcbiAgICAgICAgdXBkYXRlTFN0cmVhbXMobFN0cmVhbXMpO1xuICAgICAgICB1cGRhdGVDaGF0UmVmU3RyZWFtcyhjaGF0UmVmU3RyZWFtcyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IHJlZkxlbmd0aCA9IGxTdHJlYW1zLmxlbmd0aDtcblxuICAgIGNvbnN0IFssIHJvd3MsIGNvbHNdID0gZ2V0RXN0aW1hdGUoeyBuOiByZWZMZW5ndGgsIHBhcmFtZXRlcnMgfSk7XG4gICAgbGV0IHJlc3VsdCA9IChhd2FpdCBjaGVja0dyaWQoeyByb3dzLCBjb2xzLCBhY3RpdmVzOiByZWZMZW5ndGggfSkpIHx8IFtmYWxzZSwgMCwgMCwgMCwgMCwgMCwgMF07XG4gICAgbGV0IFtyZW1vdmVBbHRHcmlkLCBudW10b2FkZGQsIG51bVJvd3MsIG51bUNvbHMsICwgYWN0dWFsUm93cywgbGFzdHJvd2NvbHNdID0gcmVzdWx0O1xuXG4gICAgaWYgKENoYXRTa2lwICYmIGV2ZW50VHlwZSA9PSAnY2hhdCcpIHtcbiAgICAgIG51bVJvd3MgPSAxO1xuICAgICAgbnVtQ29scyA9IDE7XG4gICAgICBhY3R1YWxSb3dzID0gMTtcbiAgICB9XG5cbiAgICAvL2lmIHJlbW92ZUFsdEdyaWQgaXMgdHJ1ZSB0aGVuIHJlbW92ZSBldmVyeXRpbmcgZnJvbSBhbHRHcmlkIGFuZCBhZGQgdG8gbWFpbkdyaWQsY2hlY2sgZm9yIHN0cmVhbXMgb24gYWx2aWRlb1N0cmVhbXMgYW5kIGFkZCB0byBtYWluR3JpZCB0aGF0IGFyZSBub3Qgb24gbWFpbkdyaWQgYW5kIGFkZCBzd2l0Y2hpbmcgdG8gdHJ1ZVxuXG4gICAgYXdhaXQgcmVhZGp1c3QoeyBuOiBsU3RyZWFtcy5sZW5ndGgsIHN0YXRlOiBpbmQsIHBhcmFtZXRlcnMgfSk7XG5cbiAgICAvLyBzcGxpdCB0aGUgc3RyZWFtcyBpbnRvIHR3byBhcnJheXMsIG9uZSBmb3IgbWFpbkdyaWQgYW5kIG9uZSBmb3IgYWx0R3JpZFxuICAgIC8vIHRha2UgdXAgdG8gbnVtdG9hZGQgZnJvbSB0aGUgbFN0cmVhbXMgYW5kIGFkZCB0byBtYWluR3JpZFN0cmVhbXNcbiAgICBsZXQgbWFpbkdyaWRTdHJlYW1zID0gbFN0cmVhbXMuc2xpY2UoMCwgbnVtdG9hZGRkKTtcbiAgICAvLyB0YWtlIHRoZSByZXN0IG9mIHRoZSBzdHJlYW1zIGFuZCBhZGQgdG8gYWx0R3JpZFN0cmVhbXNcbiAgICBsZXQgYWx0R3JpZFN0cmVhbXMgPSBsU3RyZWFtcy5zbGljZShudW10b2FkZGQsIGxTdHJlYW1zLmxlbmd0aCk7XG4gICAgLy9hZGQgdG8gZ3JpZHNcblxuICAgIGlmIChcbiAgICAgIGRvUGFnaW5hdGUgPT0gdHJ1ZSB8fFxuICAgICAgcHJldkRvUGFnaW5hdGUgIT0gZG9QYWdpbmF0ZSB8fFxuICAgICAgc2hhcmVkIHx8XG4gICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQgfHxcbiAgICAgIHNoYXJlRW5kZWRcbiAgICApIHtcbiAgICAgIGxldCBsU3RyZWFtc19hbHQgPSBsU3RyZWFtc187XG4gICAgICBhd2FpdCBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzKHsgY29uc3VtZXJUcmFuc3BvcnRzLCBsU3RyZWFtc186IGxTdHJlYW1zX2FsdCwgcGFyYW1ldGVycyB9KTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGJyZWFrT3V0Um9vbVN0YXJ0ZWQgJiYgIWJyZWFrT3V0Um9vbUVuZGVkKSB7XG4gICAgICAgICAgYXdhaXQgcmVzdW1lUGF1c2VBdWRpb1N0cmVhbXMoeyBpbkJyZWFrUm9vbSwgYnJlYWtSb29tLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAvLyBjb25zb2xlLmxvZygnRXJyb3IgaW4gcmVzdW1lUGF1c2VBdWRpb1N0cmVhbXM6JywgZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICBpZiAoIWJyZWFrT3V0Um9vbVN0YXJ0ZWQgfHwgKGJyZWFrT3V0Um9vbVN0YXJ0ZWQgJiYgYnJlYWtPdXRSb29tRW5kZWQpKSB7XG4gICAgICAgICAgYXdhaXQgcmVzdW1lUGF1c2VTdHJlYW1zKHsgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hhcmVFbmRlZCkge1xuICAgICAgICBzaGFyZUVuZGVkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKENoYXRTa2lwICYmIGV2ZW50VHlwZSA9PSAnY2hhdCcpIHtcbiAgICAgIGF3YWl0IGFkZFZpZGVvc0dyaWQoe1xuICAgICAgICBtYWluR3JpZFN0cmVhbXMsXG4gICAgICAgIGFsdEdyaWRTdHJlYW1zLFxuICAgICAgICBudW10b2FkZDogbnVtdG9hZGRkIC0gMSxcbiAgICAgICAgbnVtUm93cyxcbiAgICAgICAgbnVtQ29scyxcbiAgICAgICAgYWN0dWFsUm93cyxcbiAgICAgICAgbGFzdHJvd2NvbHMsXG4gICAgICAgIHJlbW92ZUFsdEdyaWQsXG4gICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgYWRkVmlkZW9zR3JpZCh7XG4gICAgICAgIG1haW5HcmlkU3RyZWFtcyxcbiAgICAgICAgYWx0R3JpZFN0cmVhbXMsXG4gICAgICAgIG51bXRvYWRkOiBudW10b2FkZGQsXG4gICAgICAgIG51bVJvd3MsXG4gICAgICAgIG51bUNvbHMsXG4gICAgICAgIGFjdHVhbFJvd3MsXG4gICAgICAgIGxhc3Ryb3djb2xzLFxuICAgICAgICByZW1vdmVBbHRHcmlkLFxuICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKHVwZGF0ZU1haW5XaW5kb3cpIHtcbiAgICAgIGlmICghbG9ja19zY3JlZW4gJiYgIXNoYXJlZCkge1xuICAgICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7IG5hbWU6IGhvc3RMYWJlbCwgcGFyYW1ldGVycyB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghZmlyc3Rfcm91bmQpIHtcbiAgICAgICAgICBhd2FpdCBwcmVwb3B1bGF0ZVVzZXJNZWRpYSh7IG5hbWU6IGhvc3RMYWJlbCwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChpbmQgPT0gMCAmJiBldmVudFR5cGUgIT09ICdjaGF0Jykge1xuICAgICAgYXdhaXQgcmVQb3J0KHsgcGFyYW1ldGVycyB9KTtcbiAgICB9XG4gIH07XG59XG4iXX0=