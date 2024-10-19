import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzcC1zdHJlYW1zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2Rpc3Atc3RyZWFtcy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBa0gzQyxNQUFNLE9BQU8sV0FBVztJQUN0Qjs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILFdBQVcsR0FBRyxLQUFLLEVBQUUsRUFDbkIsUUFBUSxFQUNSLEdBQUcsRUFDSCxJQUFJLEdBQUcsS0FBSyxFQUNaLFFBQVEsR0FBRyxLQUFLLEVBQ2hCLFNBQVMsR0FBRyxJQUFJLEVBQ2hCLFVBQVUsRUFDVixTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQ2QsV0FBVyxHQUFHLEtBQUssR0FDQSxFQUFpQixFQUFFO1FBQ3RDLDhCQUE4QjtRQUM5QixJQUFJLEVBQUUsbUJBQW1CLEVBQUUsR0FBRyxVQUFVLENBQUM7UUFDekMsVUFBVSxHQUFHLG1CQUFtQixFQUFFLENBQUM7UUFFbkMsSUFBSSxFQUNGLGtCQUFrQixFQUNsQixXQUFXLEVBQ1gsY0FBYyxFQUNkLFlBQVksRUFDWixnQkFBZ0IsRUFDaEIsb0JBQW9CLEVBQ3BCLHVCQUF1QixFQUN2QixrQkFBa0IsRUFDbEIscUJBQXFCLEVBQ3JCLGVBQWUsRUFDZixTQUFTLEVBQ1QsZUFBZSxFQUNmLG1CQUFtQixFQUNuQixjQUFjLEVBQ2QsVUFBVSxFQUNWLFFBQVEsRUFDUixNQUFNLEVBQ04sa0JBQWtCLEVBQ2xCLFVBQVUsRUFDVixhQUFhLEVBQ2IsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQixXQUFXLEVBQ1gsZUFBZSxFQUNmLGlCQUFpQixFQUNqQixrQkFBa0IsRUFDbEIsV0FBVyxFQUNYLFdBQVcsRUFDWCxjQUFjLEVBQ2QsU0FBUyxFQUNULE9BQU8sRUFD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Q2QsUUFBUSxFQUFFLFNBQVM7Z0JBQ25CLE9BQU87Z0JBQ1AsT0FBTztnQkFDUCxVQUFVO2dCQUNWLFdBQVc7Z0JBQ1gsYUFBYTtnQkFDYixVQUFVO2FBQ1gsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELElBQUksZ0JBQWdCLEVBQUUsQ0FBQztZQUNyQixJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzVCLE1BQU0sb0JBQW9CLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDOUQsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztvQkFDakIsTUFBTSxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQztnQkFDOUQsQ0FBQztZQUNILENBQUM7UUFDSCxDQUFDO1FBRUQsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLFNBQVMsS0FBSyxNQUFNLEVBQUUsQ0FBQztZQUNyQyxNQUFNLE1BQU0sQ0FBQyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDL0IsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0FuaUJTLFdBQVc7MkdBQVgsV0FBVyxjQUZWLE1BQU07OzJGQUVQLFdBQVc7a0JBSHZCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBTdHJlYW0sXG4gIFBhcnRpY2lwYW50LFxuICBUcmFuc3BvcnQsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlLFxuICBSZVBvcnRQYXJhbWV0ZXJzLFxuICBSZVBvcnRUeXBlLFxuICBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzUGFyYW1ldGVycyxcbiAgUHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c1R5cGUsXG4gIFJlc3VtZVBhdXNlU3RyZWFtc1BhcmFtZXRlcnMsXG4gIFJlc3VtZVBhdXNlU3RyZWFtc1R5cGUsXG4gIFJlYWRqdXN0UGFyYW1ldGVycyxcbiAgUmVhZGp1c3RUeXBlLFxuICBBZGRWaWRlb3NHcmlkVHlwZSxcbiAgQWRkVmlkZW9zR3JpZFBhcmFtZXRlcnMsXG4gIEdldEVzdGltYXRlVHlwZSxcbiAgQ2hlY2tHcmlkVHlwZSxcbiAgUmVzdW1lUGF1c2VBdWRpb1N0cmVhbXNQYXJhbWV0ZXJzLFxuICBSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtc1R5cGUsXG4gIEdldEVzdGltYXRlUGFyYW1ldGVycyxcbiAgRXZlbnRUeXBlLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIERpc3BTdHJlYW1zUGFyYW1ldGVyc1xuICBleHRlbmRzIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgICBSZVBvcnRQYXJhbWV0ZXJzLFxuICAgIFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNQYXJhbWV0ZXJzLFxuICAgIFJlc3VtZVBhdXNlU3RyZWFtc1BhcmFtZXRlcnMsXG4gICAgUmVhZGp1c3RQYXJhbWV0ZXJzLFxuICAgIFJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zUGFyYW1ldGVycyxcbiAgICBHZXRFc3RpbWF0ZVBhcmFtZXRlcnMsXG4gICAgQWRkVmlkZW9zR3JpZFBhcmFtZXRlcnMge1xuICBjb25zdW1lclRyYW5zcG9ydHM6IFRyYW5zcG9ydFtdO1xuICBzdHJlYW1OYW1lczogU3RyZWFtW107XG4gIGF1ZFN0cmVhbU5hbWVzOiBTdHJlYW1bXTtcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICByZWZfcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICByZWNvcmRpbmdEaXNwbGF5VHlwZTogJ3ZpZGVvJyB8ICdtZWRpYScgfCAnYWxsJztcbiAgcmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQ6IGJvb2xlYW47XG4gIG1lZXRpbmdEaXNwbGF5VHlwZTogc3RyaW5nO1xuICBtZWV0aW5nVmlkZW9PcHRpbWl6ZWQ6IGJvb2xlYW47XG4gIGN1cnJlbnRVc2VyUGFnZTogbnVtYmVyO1xuICBob3N0TGFiZWw6IHN0cmluZztcbiAgbWFpbkhlaWdodFdpZHRoOiBudW1iZXI7XG4gIHByZXZNYWluSGVpZ2h0V2lkdGg6IG51bWJlcjtcbiAgcHJldkRvUGFnaW5hdGU6IGJvb2xlYW47XG4gIGRvUGFnaW5hdGU6IGJvb2xlYW47XG4gIGZpcnN0QWxsOiBib29sZWFuO1xuICBzaGFyZWQ6IGJvb2xlYW47XG4gIHNoYXJlU2NyZWVuU3RhcnRlZDogYm9vbGVhbjtcbiAgc2hhcmVFbmRlZDogYm9vbGVhbjtcbiAgb2xkQWxsU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICB1cGRhdGVNYWluV2luZG93OiBib29sZWFuO1xuICByZW1vdGVQcm9kdWNlcklkPzogc3RyaW5nO1xuICBhY3RpdmVOYW1lczogc3RyaW5nW107XG4gIGRpc3BBY3RpdmVOYW1lczogc3RyaW5nW107XG4gIHBfZGlzcEFjdGl2ZU5hbWVzOiBzdHJpbmdbXTtcbiAgbkZvclJlYWRqdXN0UmVjb3JkOiBudW1iZXI7XG4gIGZpcnN0X3JvdW5kOiBib29sZWFuO1xuICBsb2NrX3NjcmVlbjogYm9vbGVhbjtcbiAgY2hhdFJlZlN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgbG9jYWxTdHJlYW1WaWRlbzogTWVkaWFTdHJlYW0gfCBudWxsO1xuXG4gIGJyZWFrT3V0Um9vbVN0YXJ0ZWQ6IGJvb2xlYW47XG4gIGJyZWFrT3V0Um9vbUVuZGVkOiBib29sZWFuO1xuICBrZWVwQmFja2dyb3VuZDogYm9vbGVhbjtcbiAgdmlydHVhbFN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsO1xuXG4gIHVwZGF0ZUFjdGl2ZU5hbWVzOiAobmFtZXM6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICB1cGRhdGVEaXNwQWN0aXZlTmFtZXM6IChuYW1lczogc3RyaW5nW10pID0+IHZvaWQ7XG4gIHVwZGF0ZUxTdHJlYW1zOiAoc3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdKSA9PiB2b2lkO1xuICB1cGRhdGVDaGF0UmVmU3RyZWFtczogKHN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSkgPT4gdm9pZDtcbiAgdXBkYXRlTkZvclJlYWRqdXN0UmVjb3JkOiAobjogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVVcGRhdGVNYWluV2luZG93OiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVNob3dNaW5pVmlldzogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTogUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlO1xuICByZVBvcnQ6IFJlUG9ydFR5cGU7XG4gIHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHM6IFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNUeXBlO1xuICByZXN1bWVQYXVzZVN0cmVhbXM6IFJlc3VtZVBhdXNlU3RyZWFtc1R5cGU7XG4gIHJlYWRqdXN0OiBSZWFkanVzdFR5cGU7XG4gIGFkZFZpZGVvc0dyaWQ6IEFkZFZpZGVvc0dyaWRUeXBlO1xuICBnZXRFc3RpbWF0ZTogR2V0RXN0aW1hdGVUeXBlO1xuICBjaGVja0dyaWQ6IENoZWNrR3JpZFR5cGU7XG4gIHJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zOiBSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtc1R5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gRGlzcFN0cmVhbXNQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgRGlzcFN0cmVhbXNPcHRpb25zIHtcbiAgbFN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcbiAgaW5kOiBudW1iZXI7XG4gIGF1dG8/OiBib29sZWFuO1xuICBDaGF0U2tpcD86IGJvb2xlYW47XG4gIGZvckNoYXRDYXJkPzogYW55O1xuICBmb3JDaGF0SUQ/OiBhbnk7XG4gIHBhcmFtZXRlcnM6IERpc3BTdHJlYW1zUGFyYW1ldGVycztcbiAgYnJlYWtSb29tPzogbnVtYmVyO1xuICBpbkJyZWFrUm9vbT86IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIERpc3BTdHJlYW1zVHlwZSA9IChvcHRpb25zOiBEaXNwU3RyZWFtc09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBEaXNwU3RyZWFtcyB7XG4gIC8qKlxuICAgKiBGdW5jdGlvbiB0byBkaXNwbGF5IHN0cmVhbXMgYmFzZWQgb24gdmFyaW91cyBwYXJhbWV0ZXJzIGFuZCBjb25kaXRpb25zLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5sU3RyZWFtcyAtIExpc3Qgb2Ygc3RyZWFtcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMuaW5kIC0gSW5kZXggb2YgdGhlIGN1cnJlbnQgc3RyZWFtLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmF1dG89ZmFsc2VdIC0gRmxhZyB0byBpbmRpY2F0ZSBpZiB0aGUgZnVuY3Rpb24gc2hvdWxkIHJ1biBhdXRvbWF0aWNhbGx5LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLkNoYXRTa2lwPWZhbHNlXSAtIEZsYWcgdG8gaW5kaWNhdGUgaWYgY2hhdCBzaG91bGQgYmUgc2tpcHBlZC5cbiAgICogQHBhcmFtIHtzdHJpbmd8bnVsbH0gW29wdGlvbnMuZm9yQ2hhdElEPW51bGxdIC0gSUQgZm9yIGNoYXQgcmVmZXJlbmNlLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gUGFyYW1ldGVycyBvYmplY3QgY29udGFpbmluZyB2YXJpb3VzIHNldHRpbmdzIGFuZCBmdW5jdGlvbnMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5icmVha1Jvb209LTFdIC0gQnJlYWsgcm9vbSBudW1iZXIuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuaW5CcmVha1Jvb209ZmFsc2VdIC0gRmxhZyB0byBpbmRpY2F0ZSBpZiBpbiBicmVhayByb29tLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gLSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSBmdW5jdGlvbiBjb21wbGV0ZXMuXG4gICAqXG4gICAqIEBhc3luY1xuICAgKi9cbiAgZGlzcFN0cmVhbXMgPSBhc3luYyAoe1xuICAgIGxTdHJlYW1zLFxuICAgIGluZCxcbiAgICBhdXRvID0gZmFsc2UsXG4gICAgQ2hhdFNraXAgPSBmYWxzZSxcbiAgICBmb3JDaGF0SUQgPSBudWxsLFxuICAgIHBhcmFtZXRlcnMsXG4gICAgYnJlYWtSb29tID0gLTEsXG4gICAgaW5CcmVha1Jvb20gPSBmYWxzZSxcbiAgfTogRGlzcFN0cmVhbXNPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgLy8gZnVuY3Rpb24gdG8gZGlzcGxheSBzdHJlYW1zXG4gICAgbGV0IHsgZ2V0VXBkYXRlZEFsbFBhcmFtcyB9ID0gcGFyYW1ldGVycztcbiAgICBwYXJhbWV0ZXJzID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgbGV0IHtcbiAgICAgIGNvbnN1bWVyVHJhbnNwb3J0cyxcbiAgICAgIHN0cmVhbU5hbWVzLFxuICAgICAgYXVkU3RyZWFtTmFtZXMsXG4gICAgICBwYXJ0aWNpcGFudHMsXG4gICAgICByZWZfcGFydGljaXBhbnRzLFxuICAgICAgcmVjb3JkaW5nRGlzcGxheVR5cGUsXG4gICAgICByZWNvcmRpbmdWaWRlb09wdGltaXplZCxcbiAgICAgIG1lZXRpbmdEaXNwbGF5VHlwZSxcbiAgICAgIG1lZXRpbmdWaWRlb09wdGltaXplZCxcbiAgICAgIGN1cnJlbnRVc2VyUGFnZSxcbiAgICAgIGhvc3RMYWJlbCxcbiAgICAgIG1haW5IZWlnaHRXaWR0aCxcbiAgICAgIHByZXZNYWluSGVpZ2h0V2lkdGgsXG4gICAgICBwcmV2RG9QYWdpbmF0ZSxcbiAgICAgIGRvUGFnaW5hdGUsXG4gICAgICBmaXJzdEFsbCxcbiAgICAgIHNoYXJlZCxcbiAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICAgIHNoYXJlRW5kZWQsXG4gICAgICBvbGRBbGxTdHJlYW1zLFxuICAgICAgdXBkYXRlTWFpbldpbmRvdyxcbiAgICAgIHJlbW90ZVByb2R1Y2VySWQsXG4gICAgICBhY3RpdmVOYW1lcyxcbiAgICAgIGRpc3BBY3RpdmVOYW1lcyxcbiAgICAgIHBfZGlzcEFjdGl2ZU5hbWVzLFxuICAgICAgbkZvclJlYWRqdXN0UmVjb3JkLFxuICAgICAgZmlyc3Rfcm91bmQsXG4gICAgICBsb2NrX3NjcmVlbixcbiAgICAgIGNoYXRSZWZTdHJlYW1zLFxuICAgICAgZXZlbnRUeXBlLFxuICAgICAgaXNsZXZlbCxcbiAgICAgIGxvY2FsU3RyZWFtVmlkZW8sXG5cbiAgICAgIGJyZWFrT3V0Um9vbVN0YXJ0ZWQsXG4gICAgICBicmVha091dFJvb21FbmRlZCxcbiAgICAgIGtlZXBCYWNrZ3JvdW5kLFxuICAgICAgdmlydHVhbFN0cmVhbSxcblxuICAgICAgdXBkYXRlQWN0aXZlTmFtZXMsXG4gICAgICB1cGRhdGVEaXNwQWN0aXZlTmFtZXMsXG4gICAgICB1cGRhdGVMU3RyZWFtcyxcbiAgICAgIHVwZGF0ZUNoYXRSZWZTdHJlYW1zLFxuICAgICAgdXBkYXRlTkZvclJlYWRqdXN0UmVjb3JkLFxuICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyxcbiAgICAgIHVwZGF0ZVNob3dNaW5pVmlldyxcblxuICAgICAgcHJlcG9wdWxhdGVVc2VyTWVkaWEsXG4gICAgICByZVBvcnQsXG4gICAgICBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzLFxuICAgICAgcmVzdW1lUGF1c2VTdHJlYW1zLFxuICAgICAgcmVhZGp1c3QsXG4gICAgICBhZGRWaWRlb3NHcmlkLFxuICAgICAgY2hlY2tHcmlkLFxuICAgICAgZ2V0RXN0aW1hdGUsXG4gICAgICByZXN1bWVQYXVzZUF1ZGlvU3RyZWFtcyxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGxldCBwcm9jZWVkID0gdHJ1ZTtcblxuICAgIGxldCBsU3RyZWFtc18gPSBsU3RyZWFtcy5maWx0ZXIoXG4gICAgICAoc3RyZWFtKSA9PiBzdHJlYW0ucHJvZHVjZXJJZCAhPT0gJ3lvdXlvdScgJiYgc3RyZWFtLnByb2R1Y2VySWQgIT09ICd5b3V5b3V5b3UnLFxuICAgICk7XG4gICAgbFN0cmVhbXNfID0gbFN0cmVhbXNfLmZpbHRlcihcbiAgICAgIChzdHJlYW0pID0+XG4gICAgICAgIHN0cmVhbS5pZCAhPT0gJ3lvdXlvdScgJiZcbiAgICAgICAgc3RyZWFtLmlkICE9PSAneW91eW91eW91JyAmJlxuICAgICAgICBzdHJlYW0ubmFtZSAhPT0gJ3lvdXlvdScgJiZcbiAgICAgICAgc3RyZWFtLm5hbWUgIT09ICd5b3V5b3V5b3UnLFxuICAgICk7XG5cbiAgICBpZiAoZXZlbnRUeXBlID09PSAnY2hhdCcpIHtcbiAgICAgIHByb2NlZWQgPSB0cnVlO1xuICAgIH0gZWxzZSBpZiAoaW5kID09PSAwIHx8IChpc2xldmVsICE9PSAnMicgJiYgY3VycmVudFVzZXJQYWdlID09PSBpbmQpKSB7XG4gICAgICBwcm9jZWVkID0gZmFsc2U7XG5cbiAgICAgIGxTdHJlYW1zXy5mb3JFYWNoKChzdHJlYW0pID0+IHtcbiAgICAgICAgbGV0IGNoZWNrZXIgPSBmYWxzZTtcbiAgICAgICAgbGV0IGNoZWNrX2xldmVsID0gMDtcblxuICAgICAgICBpZiAocmVjb3JkaW5nRGlzcGxheVR5cGUgPT09ICd2aWRlbycpIHtcbiAgICAgICAgICBpZiAocmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9PSAnJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNoZWNrZXIgPSB0cnVlO1xuICAgICAgICAgICAgICBjaGVja19sZXZlbCA9IDA7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdwcm9kdWNlcklkJykgJiZcbiAgICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT09ICcnKSB8fFxuICAgICAgICAgICAgICAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ2F1ZGlvSUQnKSAmJlxuICAgICAgICAgICAgICAgIHN0cmVhbS5hdWRpb0lEICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICBzdHJlYW0uYXVkaW9JRCAhPT0gJycpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY2hlY2tlciA9IHRydWU7XG4gICAgICAgICAgICAgIGNoZWNrX2xldmVsID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAocmVjb3JkaW5nRGlzcGxheVR5cGUgPT09ICdtZWRpYScpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9PSAnJykgfHxcbiAgICAgICAgICAgIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAnYXVkaW9JRCcpICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5hdWRpb0lEICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLmF1ZGlvSUQgIT09ICcnKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgY2hlY2tlciA9IHRydWU7XG4gICAgICAgICAgICBjaGVja19sZXZlbCA9IDE7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAncHJvZHVjZXJJZCcpICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT09ICcnKSB8fFxuICAgICAgICAgICAgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdhdWRpb0lEJykgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLmF1ZGlvSUQgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBzdHJlYW0uYXVkaW9JRCAhPT0gJycpIHx8XG4gICAgICAgICAgICAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ25hbWUnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0ubmFtZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICBzdHJlYW0ubmFtZSAhPSAnJylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGNoZWNrZXIgPSB0cnVlO1xuICAgICAgICAgICAgY2hlY2tfbGV2ZWwgPSAyO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwYXJ0aWNpcGFudDtcblxuICAgICAgICBpZiAoY2hlY2tlcikge1xuICAgICAgICAgIGlmIChjaGVja19sZXZlbCA9PT0gMCkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAncHJvZHVjZXJJZCcpICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT09ICcnXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcGFydGljaXBhbnQgPSBzdHJlYW1OYW1lcy5maW5kKChvYmo6IGFueSkgPT4gb2JqLnByb2R1Y2VySWQgPT09IHN0cmVhbS5wcm9kdWNlcklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGNoZWNrX2xldmVsID09PSAxKSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdwcm9kdWNlcklkJykgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPT0gJydcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBwYXJ0aWNpcGFudCA9IHN0cmVhbU5hbWVzLmZpbmQoKG9iajogYW55KSA9PiBvYmoucHJvZHVjZXJJZCA9PT0gc3RyZWFtLnByb2R1Y2VySWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwYXJ0aWNpcGFudCkge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ2F1ZGlvSUQnKSAmJlxuICAgICAgICAgICAgICAgIHN0cmVhbS5hdWRpb0lEICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICBzdHJlYW0uYXVkaW9JRCAhPT0gJydcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQgPSBhdWRTdHJlYW1OYW1lcy5maW5kKChvYmo6IGFueSkgPT4gb2JqLnByb2R1Y2VySWQgPT09IHN0cmVhbS5hdWRpb0lEKTtcbiAgICAgICAgICAgICAgICBpZiAoIXBhcnRpY2lwYW50KSB7XG4gICAgICAgICAgICAgICAgICBwYXJ0aWNpcGFudCA9IHJlZl9wYXJ0aWNpcGFudHMuZmluZCgob2JqOiBhbnkpID0+IG9iai5hdWRpb0lEID09PSBzdHJlYW0uYXVkaW9JRCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChjaGVja19sZXZlbCA9PT0gMikge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAncHJvZHVjZXJJZCcpICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT09ICcnXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcGFydGljaXBhbnQgPSBzdHJlYW1OYW1lcy5maW5kKChvYmo6IGFueSkgPT4gb2JqLnByb2R1Y2VySWQgPT09IHN0cmVhbS5wcm9kdWNlcklkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICghcGFydGljaXBhbnQpIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdhdWRpb0lEJykgJiZcbiAgICAgICAgICAgICAgICBzdHJlYW0uYXVkaW9JRCAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgc3RyZWFtLmF1ZGlvSUQgIT09ICcnXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50ID0gYXVkU3RyZWFtTmFtZXMuZmluZCgob2JqOiBhbnkpID0+IG9iai5wcm9kdWNlcklkID09PSBzdHJlYW0uYXVkaW9JRCk7XG4gICAgICAgICAgICAgICAgaWYgKCFwYXJ0aWNpcGFudCkge1xuICAgICAgICAgICAgICAgICAgcGFydGljaXBhbnQgPSByZWZfcGFydGljaXBhbnRzLmZpbmQoKG9iajogYW55KSA9PiBvYmouYXVkaW9JRCA9PT0gc3RyZWFtLmF1ZGlvSUQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwYXJ0aWNpcGFudCkge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ25hbWUnKSAmJlxuICAgICAgICAgICAgICAgIHN0cmVhbS5uYW1lICE9PSBudWxsICYmXG4gICAgICAgICAgICAgICAgc3RyZWFtLm5hbWUgIT0gJydcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnQgPSByZWZfcGFydGljaXBhbnRzLmZpbmQoKG9iajogYW55KSA9PiBvYmoubmFtZSA9PT0gc3RyZWFtLm5hbWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKHBhcnRpY2lwYW50KSB7XG4gICAgICAgICAgICBpZiAocGFydGljaXBhbnQubmFtZSAmJiAhYWN0aXZlTmFtZXMuaW5jbHVkZXMocGFydGljaXBhbnQubmFtZSkpIHtcbiAgICAgICAgICAgICAgYWN0aXZlTmFtZXMucHVzaChwYXJ0aWNpcGFudC5uYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICB1cGRhdGVBY3RpdmVOYW1lcyhhY3RpdmVOYW1lcyk7XG5cbiAgICAgIGxTdHJlYW1zXy5mb3JFYWNoKChzdHJlYW0pID0+IHtcbiAgICAgICAgbGV0IGRpc3BfY2hlY2tlciA9IGZhbHNlO1xuICAgICAgICBsZXQgZGlzcF9jaGVja19sZXZlbCA9IDA7XG5cbiAgICAgICAgaWYgKG1lZXRpbmdEaXNwbGF5VHlwZSA9PT0gJ3ZpZGVvJykge1xuICAgICAgICAgIGlmIChtZWV0aW5nVmlkZW9PcHRpbWl6ZWQpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9PSAnJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGRpc3BfY2hlY2tlciA9IHRydWU7XG4gICAgICAgICAgICAgIGRpc3BfY2hlY2tfbGV2ZWwgPSAwO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAncHJvZHVjZXJJZCcpICYmXG4gICAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9PSAnJykgfHxcbiAgICAgICAgICAgICAgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdhdWRpb0lEJykgJiZcbiAgICAgICAgICAgICAgICBzdHJlYW0uYXVkaW9JRCAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgc3RyZWFtLmF1ZGlvSUQgIT09ICcnKVxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGRpc3BfY2hlY2tlciA9IHRydWU7XG4gICAgICAgICAgICAgIGRpc3BfY2hlY2tfbGV2ZWwgPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChtZWV0aW5nRGlzcGxheVR5cGUgPT09ICdtZWRpYScpIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9PSAnJykgfHxcbiAgICAgICAgICAgIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAnYXVkaW9JRCcpICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5hdWRpb0lEICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLmF1ZGlvSUQgIT09ICcnKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgZGlzcF9jaGVja2VyID0gdHJ1ZTtcbiAgICAgICAgICAgIGRpc3BfY2hlY2tfbGV2ZWwgPSAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9PSAnJykgfHxcbiAgICAgICAgICAgIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAnYXVkaW9JRCcpICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5hdWRpb0lEICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLmF1ZGlvSUQgIT09ICcnKSB8fFxuICAgICAgICAgICAgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICduYW1lJykgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLm5hbWUgIT09IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLm5hbWUgIT0gJycpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBkaXNwX2NoZWNrZXIgPSB0cnVlO1xuICAgICAgICAgICAgZGlzcF9jaGVja19sZXZlbCA9IDI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGV0IHBhcnRpY2lwYW50XztcblxuICAgICAgICBpZiAoZGlzcF9jaGVja2VyKSB7XG4gICAgICAgICAgaWYgKGRpc3BfY2hlY2tfbGV2ZWwgPT09IDApIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ3Byb2R1Y2VySWQnKSAmJlxuICAgICAgICAgICAgICBzdHJlYW0ucHJvZHVjZXJJZCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9PSAnJ1xuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIHBhcnRpY2lwYW50XyA9IHN0cmVhbU5hbWVzLmZpbmQoKG9iajogYW55KSA9PiBvYmoucHJvZHVjZXJJZCA9PT0gc3RyZWFtLnByb2R1Y2VySWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoZGlzcF9jaGVja19sZXZlbCA9PT0gMSkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAncHJvZHVjZXJJZCcpICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT09ICcnXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcGFydGljaXBhbnRfID0gc3RyZWFtTmFtZXMuZmluZCgob2JqOiBhbnkpID0+IG9iai5wcm9kdWNlcklkID09PSBzdHJlYW0ucHJvZHVjZXJJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXBhcnRpY2lwYW50Xykge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ2F1ZGlvSUQnKSAmJlxuICAgICAgICAgICAgICAgIHN0cmVhbS5hdWRpb0lEICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICBzdHJlYW0uYXVkaW9JRCAhPT0gJydcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnRfID0gYXVkU3RyZWFtTmFtZXMuZmluZCgob2JqOiBhbnkpID0+IG9iai5wcm9kdWNlcklkID09PSBzdHJlYW0uYXVkaW9JRCk7XG4gICAgICAgICAgICAgICAgaWYgKCFwYXJ0aWNpcGFudF8pIHtcbiAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50XyA9IHJlZl9wYXJ0aWNpcGFudHMuZmluZChcbiAgICAgICAgICAgICAgICAgICAgKG9iajogYW55KSA9PiBvYmouYXVkaW9JRCA9PT0gc3RyZWFtLmF1ZGlvSUQsXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAoZGlzcF9jaGVja19sZXZlbCA9PT0gMikge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAncHJvZHVjZXJJZCcpICYmXG4gICAgICAgICAgICAgIHN0cmVhbS5wcm9kdWNlcklkICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgc3RyZWFtLnByb2R1Y2VySWQgIT09ICcnXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcGFydGljaXBhbnRfID0gc3RyZWFtTmFtZXMuZmluZCgob2JqOiBhbnkpID0+IG9iai5wcm9kdWNlcklkID09PSBzdHJlYW0ucHJvZHVjZXJJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoIXBhcnRpY2lwYW50Xykge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ2F1ZGlvSUQnKSAmJlxuICAgICAgICAgICAgICAgIHN0cmVhbS5hdWRpb0lEICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICBzdHJlYW0uYXVkaW9JRCAhPT0gJydcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgcGFydGljaXBhbnRfID0gYXVkU3RyZWFtTmFtZXMuZmluZCgob2JqOiBhbnkpID0+IG9iai5wcm9kdWNlcklkID09PSBzdHJlYW0uYXVkaW9JRCk7XG4gICAgICAgICAgICAgICAgaWYgKCFwYXJ0aWNpcGFudF8pIHtcbiAgICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50XyA9IHJlZl9wYXJ0aWNpcGFudHMuZmluZChcbiAgICAgICAgICAgICAgICAgICAgKG9iajogYW55KSA9PiBvYmouYXVkaW9JRCA9PT0gc3RyZWFtLmF1ZGlvSUQsXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFwYXJ0aWNpcGFudF8pIHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICduYW1lJykgJiZcbiAgICAgICAgICAgICAgICBzdHJlYW0ubmFtZSAhPT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIHN0cmVhbS5uYW1lICE9ICcnXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHBhcnRpY2lwYW50XyA9IHJlZl9wYXJ0aWNpcGFudHMuZmluZCgob2JqOiBhbnkpID0+IG9iai5uYW1lID09PSBzdHJlYW0ubmFtZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAocGFydGljaXBhbnRfKSB7XG4gICAgICAgICAgICBpZiAocGFydGljaXBhbnRfLm5hbWUgJiYgIWRpc3BBY3RpdmVOYW1lcy5pbmNsdWRlcyhwYXJ0aWNpcGFudF8ubmFtZSkpIHtcbiAgICAgICAgICAgICAgZGlzcEFjdGl2ZU5hbWVzLnB1c2gocGFydGljaXBhbnRfLm5hbWUpO1xuICAgICAgICAgICAgICBpZiAoIXBfZGlzcEFjdGl2ZU5hbWVzLmluY2x1ZGVzKHBhcnRpY2lwYW50Xy5uYW1lKSkge1xuICAgICAgICAgICAgICAgIHByb2NlZWQgPSB0cnVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgdXBkYXRlRGlzcEFjdGl2ZU5hbWVzKGRpc3BBY3RpdmVOYW1lcyk7XG5cbiAgICAgIGlmIChsU3RyZWFtc18ubGVuZ3RoIDwgMSkge1xuICAgICAgICBpZiAoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkge1xuICAgICAgICAgIHByb2NlZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2UgaWYgKCFmaXJzdEFsbCkge1xuICAgICAgICAgIHByb2NlZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSB7XG4gICAgICAgIC8vIHNjcmVlbiBzaGFyZSBzdGFydGVkXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocHJldk1haW5IZWlnaHRXaWR0aCAhPT0gbWFpbkhlaWdodFdpZHRoKSB7XG4gICAgICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IHRydWU7XG4gICAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh1cGRhdGVNYWluV2luZG93KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBuRm9yUmVhZGp1c3RSZWNvcmQgPSBhY3RpdmVOYW1lcy5sZW5ndGg7XG4gICAgICB1cGRhdGVORm9yUmVhZGp1c3RSZWNvcmQobkZvclJlYWRqdXN0UmVjb3JkKTtcbiAgICB9XG5cbiAgICBpZiAoIXByb2NlZWQgJiYgYXV0bykge1xuICAgICAgaWYgKHVwZGF0ZU1haW5XaW5kb3cpIHtcbiAgICAgICAgaWYgKCFsb2NrX3NjcmVlbiAmJiAhc2hhcmVkKSB7XG4gICAgICAgICAgYXdhaXQgcHJlcG9wdWxhdGVVc2VyTWVkaWEoeyBuYW1lOiBob3N0TGFiZWwsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKCFmaXJzdF9yb3VuZCkge1xuICAgICAgICAgICAgYXdhaXQgcHJlcG9wdWxhdGVVc2VyTWVkaWEoeyBuYW1lOiBob3N0TGFiZWwsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChpbmQgPT09IDAgJiYgZXZlbnRUeXBlICE9PSAnY2hhdCcpIHtcbiAgICAgICAgYXdhaXQgcmVQb3J0KHsgcGFyYW1ldGVycyB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnRUeXBlID09PSAnYnJvYWRjYXN0Jykge1xuICAgICAgbFN0cmVhbXMgPSBsU3RyZWFtc187XG4gICAgICB1cGRhdGVMU3RyZWFtcyhsU3RyZWFtcyk7XG4gICAgfSBlbHNlIGlmIChldmVudFR5cGUgPT09ICdjaGF0Jykge1xuICAgICAgaWYgKGZvckNoYXRJRCAhPSBudWxsKSB7XG4gICAgICAgIGxTdHJlYW1zID0gY2hhdFJlZlN0cmVhbXM7XG4gICAgICAgIHVwZGF0ZUxTdHJlYW1zKGxTdHJlYW1zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVwZGF0ZVNob3dNaW5pVmlldyhmYWxzZSk7XG5cbiAgICAgICAgaWYgKGlzbGV2ZWwgIT09ICcyJykge1xuICAgICAgICAgIGxldCBob3N0ID0gcGFydGljaXBhbnRzLmZpbmQoKG9iajogYW55KSA9PiBvYmouaXNsZXZlbCA9PT0gJzInKTtcbiAgICAgICAgICBpZiAoaG9zdCkge1xuICAgICAgICAgICAgbGV0IHN0cmVhbWU7XG4gICAgICAgICAgICByZW1vdGVQcm9kdWNlcklkID0gaG9zdC52aWRlb0lEO1xuICAgICAgICAgICAgaWYgKGlzbGV2ZWwgPT09ICcyJykge1xuICAgICAgICAgICAgICBob3N0WydzdHJlYW0nXSA9IGtlZXBCYWNrZ3JvdW5kICYmIHZpcnR1YWxTdHJlYW0gPyB2aXJ0dWFsU3RyZWFtIDogbG9jYWxTdHJlYW1WaWRlbztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHN0cmVhbWUgPSBvbGRBbGxTdHJlYW1zLmZpbmQoXG4gICAgICAgICAgICAgICAgKHN0cmVhbWU6IGFueSkgPT4gc3RyZWFtZS5wcm9kdWNlcklkID09PSByZW1vdGVQcm9kdWNlcklkLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBpZiAoc3RyZWFtZSkge1xuICAgICAgICAgICAgICAgIGxTdHJlYW1zID0gbFN0cmVhbXMuZmlsdGVyKChzdHJlYW0pID0+IHN0cmVhbS5uYW1lICE9PSBob3N0Lm5hbWUpO1xuICAgICAgICAgICAgICAgIGxTdHJlYW1zLnB1c2goc3RyZWFtZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgeW91eW91ID0gbFN0cmVhbXMuZmluZChcbiAgICAgICAgICAob2JqOiBhbnkpID0+IG9iai5wcm9kdWNlcklkID09PSAneW91eW91JyB8fCBvYmoucHJvZHVjZXJJZCA9PT0gJ3lvdXlvdXlvdScsXG4gICAgICAgICk7XG4gICAgICAgIGxTdHJlYW1zID0gbFN0cmVhbXMuZmlsdGVyKFxuICAgICAgICAgIChzdHJlYW0pID0+IHN0cmVhbS5wcm9kdWNlcklkICE9PSAneW91eW91JyAmJiBzdHJlYW0ucHJvZHVjZXJJZCAhPT0gJ3lvdXlvdXlvdScsXG4gICAgICAgICk7XG4gICAgICAgIGlmICh5b3V5b3UpIHtcbiAgICAgICAgICBsU3RyZWFtcy5wdXNoKHlvdXlvdSk7XG4gICAgICAgIH1cblxuICAgICAgICBjaGF0UmVmU3RyZWFtcyA9IGxTdHJlYW1zO1xuICAgICAgICB1cGRhdGVMU3RyZWFtcyhsU3RyZWFtcyk7XG4gICAgICAgIHVwZGF0ZUNoYXRSZWZTdHJlYW1zKGNoYXRSZWZTdHJlYW1zKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgcmVmTGVuZ3RoID0gbFN0cmVhbXMubGVuZ3RoO1xuXG4gICAgY29uc3QgWywgcm93cywgY29sc10gPSBnZXRFc3RpbWF0ZSh7IG46IHJlZkxlbmd0aCwgcGFyYW1ldGVycyB9KTtcbiAgICBsZXQgcmVzdWx0ID0gKGF3YWl0IGNoZWNrR3JpZCh7IHJvd3MsIGNvbHMsIGFjdGl2ZXM6IHJlZkxlbmd0aCB9KSkgfHwgW2ZhbHNlLCAwLCAwLCAwLCAwLCAwLCAwXTtcbiAgICBsZXQgW3JlbW92ZUFsdEdyaWQsIG51bXRvYWRkZCwgbnVtUm93cywgbnVtQ29scywgLCBhY3R1YWxSb3dzLCBsYXN0cm93Y29sc10gPSByZXN1bHQ7XG5cbiAgICBpZiAoQ2hhdFNraXAgJiYgZXZlbnRUeXBlID09ICdjaGF0Jykge1xuICAgICAgbnVtUm93cyA9IDE7XG4gICAgICBudW1Db2xzID0gMTtcbiAgICAgIGFjdHVhbFJvd3MgPSAxO1xuICAgIH1cblxuICAgIC8vaWYgcmVtb3ZlQWx0R3JpZCBpcyB0cnVlIHRoZW4gcmVtb3ZlIGV2ZXJ5dGluZyBmcm9tIGFsdEdyaWQgYW5kIGFkZCB0byBtYWluR3JpZCxjaGVjayBmb3Igc3RyZWFtcyBvbiBhbHZpZGVvU3RyZWFtcyBhbmQgYWRkIHRvIG1haW5HcmlkIHRoYXQgYXJlIG5vdCBvbiBtYWluR3JpZCBhbmQgYWRkIHN3aXRjaGluZyB0byB0cnVlXG5cbiAgICBhd2FpdCByZWFkanVzdCh7IG46IGxTdHJlYW1zLmxlbmd0aCwgc3RhdGU6IGluZCwgcGFyYW1ldGVycyB9KTtcblxuICAgIC8vIHNwbGl0IHRoZSBzdHJlYW1zIGludG8gdHdvIGFycmF5cywgb25lIGZvciBtYWluR3JpZCBhbmQgb25lIGZvciBhbHRHcmlkXG4gICAgLy8gdGFrZSB1cCB0byBudW10b2FkZCBmcm9tIHRoZSBsU3RyZWFtcyBhbmQgYWRkIHRvIG1haW5HcmlkU3RyZWFtc1xuICAgIGxldCBtYWluR3JpZFN0cmVhbXMgPSBsU3RyZWFtcy5zbGljZSgwLCBudW10b2FkZGQpO1xuICAgIC8vIHRha2UgdGhlIHJlc3Qgb2YgdGhlIHN0cmVhbXMgYW5kIGFkZCB0byBhbHRHcmlkU3RyZWFtc1xuICAgIGxldCBhbHRHcmlkU3RyZWFtcyA9IGxTdHJlYW1zLnNsaWNlKG51bXRvYWRkZCwgbFN0cmVhbXMubGVuZ3RoKTtcbiAgICAvL2FkZCB0byBncmlkc1xuXG4gICAgaWYgKFxuICAgICAgZG9QYWdpbmF0ZSA9PSB0cnVlIHx8XG4gICAgICBwcmV2RG9QYWdpbmF0ZSAhPSBkb1BhZ2luYXRlIHx8XG4gICAgICBzaGFyZWQgfHxcbiAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCB8fFxuICAgICAgc2hhcmVFbmRlZFxuICAgICkge1xuICAgICAgbGV0IGxTdHJlYW1zX2FsdCA9IGxTdHJlYW1zXztcbiAgICAgIGF3YWl0IHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHMoeyBjb25zdW1lclRyYW5zcG9ydHMsIGxTdHJlYW1zXzogbFN0cmVhbXNfYWx0LCBwYXJhbWV0ZXJzIH0pO1xuXG4gICAgICB0cnkge1xuICAgICAgICBpZiAoYnJlYWtPdXRSb29tU3RhcnRlZCAmJiAhYnJlYWtPdXRSb29tRW5kZWQpIHtcbiAgICAgICAgICBhd2FpdCByZXN1bWVQYXVzZUF1ZGlvU3RyZWFtcyh7IGluQnJlYWtSb29tLCBicmVha1Jvb20sIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKCdFcnJvciBpbiByZXN1bWVQYXVzZUF1ZGlvU3RyZWFtczonLCBlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGlmICghYnJlYWtPdXRSb29tU3RhcnRlZCB8fCAoYnJlYWtPdXRSb29tU3RhcnRlZCAmJiBicmVha091dFJvb21FbmRlZCkpIHtcbiAgICAgICAgICBhd2FpdCByZXN1bWVQYXVzZVN0cmVhbXMoeyBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIHtcbiAgICAgICAgLyogaGFuZGxlIGVycm9yICovXG4gICAgICB9XG5cbiAgICAgIGlmIChzaGFyZUVuZGVkKSB7XG4gICAgICAgIHNoYXJlRW5kZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoQ2hhdFNraXAgJiYgZXZlbnRUeXBlID09ICdjaGF0Jykge1xuICAgICAgYXdhaXQgYWRkVmlkZW9zR3JpZCh7XG4gICAgICAgIG1haW5HcmlkU3RyZWFtcyxcbiAgICAgICAgYWx0R3JpZFN0cmVhbXMsXG4gICAgICAgIG51bXRvYWRkOiBudW10b2FkZGQgLSAxLFxuICAgICAgICBudW1Sb3dzLFxuICAgICAgICBudW1Db2xzLFxuICAgICAgICBhY3R1YWxSb3dzLFxuICAgICAgICBsYXN0cm93Y29scyxcbiAgICAgICAgcmVtb3ZlQWx0R3JpZCxcbiAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBhZGRWaWRlb3NHcmlkKHtcbiAgICAgICAgbWFpbkdyaWRTdHJlYW1zLFxuICAgICAgICBhbHRHcmlkU3RyZWFtcyxcbiAgICAgICAgbnVtdG9hZGQ6IG51bXRvYWRkZCxcbiAgICAgICAgbnVtUm93cyxcbiAgICAgICAgbnVtQ29scyxcbiAgICAgICAgYWN0dWFsUm93cyxcbiAgICAgICAgbGFzdHJvd2NvbHMsXG4gICAgICAgIHJlbW92ZUFsdEdyaWQsXG4gICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAodXBkYXRlTWFpbldpbmRvdykge1xuICAgICAgaWYgKCFsb2NrX3NjcmVlbiAmJiAhc2hhcmVkKSB7XG4gICAgICAgIGF3YWl0IHByZXBvcHVsYXRlVXNlck1lZGlhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCFmaXJzdF9yb3VuZCkge1xuICAgICAgICAgIGF3YWl0IHByZXBvcHVsYXRlVXNlck1lZGlhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGluZCA9PSAwICYmIGV2ZW50VHlwZSAhPT0gJ2NoYXQnKSB7XG4gICAgICBhd2FpdCByZVBvcnQoeyBwYXJhbWV0ZXJzIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==