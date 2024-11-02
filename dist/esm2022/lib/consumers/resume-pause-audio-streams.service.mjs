import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Resumes or pauses audio streams based on the provided options.
 *
 * This method checks the current state of participants in breakout rooms and
 * updates the audio streams accordingly. It can add or remove audio streams
 * based on the participant's current status (in a breakout room or not)
 * and the event type (e.g., conference, webinar).
 *
 * @param {ResumePauseAudioStreamsOptions} options - The options for resuming or pausing audio streams.
 * @param {number} [options.breakRoom=-1] - The ID of the break room. Defaults to -1 if not specified.
 * @param {boolean} [options.inBreakRoom=false] - Indicates if the participant is in a break room. Defaults to false.
 * @param {ResumePauseAudioStreamsParameters} options.parameters - The parameters required for processing audio streams.
 * @param {Array<BreakoutParticipant[]>} options.parameters.breakoutRooms - Array of breakout rooms.
 * @param {Array<Participant>} options.parameters.ref_participants - Array of reference participants.
 * @param {Array<Stream | Participant>} options.parameters.allAudioStreams - Array of all audio streams.
 * @param {Array<Participant>} options.parameters.participants - Array of participants.
 * @param {string} options.parameters.islevel - The level of the participant.
 * @param {EventType} options.parameters.eventType - The type of event (e.g., conference, webinar).
 * @param {Array<Transport>} options.parameters.consumerTransports - Array of consumer transports.
 * @param {Array<BreakoutParticipant>} options.parameters.limitedBreakRoom - Array of participants in the limited break room.
 * @param {number} options.parameters.hostNewRoom - The ID of the host's new room.
 * @param {string} options.parameters.member - The name of the member.
 * @param {Function} options.parameters.updateLimitedBreakRoom - Function to update the limited break room.
 * @param {Function} options.parameters.processConsumerTransportsAudio - Function to process audio transports.
 *
 * @returns {Promise<void>} A promise that resolves when the audio streams have been processed.
 *
 * @throws Will log an error message if there is an issue processing the audio streams.
 *
 * @example
 * ```typescript
 * await resumePauseAudioStreams({
 *   breakRoom: 1,
 *   inBreakRoom: true,
 *   parameters: {
 *     breakoutRooms: [],
 *     ref_participants: [],
 *     allAudioStreams: [],
 *     participants: [],
 *     islevel: '1',
 *     eventType: 'conference',
 *     consumerTransports: [],
 *     limitedBreakRoom: [],
 *     hostNewRoom: 2,
 *     member: 'JohnDoe',
 *     updateLimitedBreakRoom: myUpdateFunction,
 *     processConsumerTransportsAudio: myProcessFunction,
 *   },
 * });
 * ```
 */
export class ResumePauseAudioStreams {
    /**
     * Resumes or pauses audio streams based on the provided options.
     *
     * @param {ResumePauseAudioStreamsOptions} options - The options for resuming or pausing audio streams.
     * @param {number} [options.breakRoom=-1] - The ID of the break room.
     * @param {boolean} [options.inBreakRoom=false] - Indicates if the participant is in a break room.
     * @param {Parameters} options.parameters - The parameters required for processing audio streams.
     *
     * @returns {Promise<void>} A promise that resolves when the audio streams have been processed.
     *
     * @throws Will log an error message if there is an issue processing the audio streams.
     */
    resumePauseAudioStreams = async ({ breakRoom = -1, inBreakRoom = false, parameters, }) => {
        let { getUpdatedAllParams } = parameters;
        parameters = getUpdatedAllParams();
        let { breakoutRooms, ref_participants, allAudioStreams, participants, islevel, eventType, consumerTransports, hostNewRoom, member, updateLimitedBreakRoom, processConsumerTransportsAudio, } = parameters;
        let room = [];
        let currentStreams = [];
        // Determine the room based on breakout status
        if (inBreakRoom && breakRoom !== -1) {
            room = breakoutRooms[breakRoom];
        }
        else {
            room = ref_participants.filter((participant) => !breakoutRooms
                .flat()
                .map((obj) => obj.name)
                .includes(participant.name));
        }
        updateLimitedBreakRoom(room);
        try {
            let addHostAudio = false;
            if (islevel !== '2' && eventType === 'conference') {
                const roomMember = breakoutRooms.find((r) => r.find((p) => p.name === member));
                let memberBreakRoom = -1;
                if (roomMember) {
                    memberBreakRoom = breakoutRooms.indexOf(roomMember);
                }
                if ((inBreakRoom && breakRoom !== hostNewRoom) ||
                    (!inBreakRoom && hostNewRoom !== -1 && hostNewRoom !== memberBreakRoom)) {
                    const host = participants.find((obj) => obj.islevel === '2');
                    // Remove the host from the room
                    room = room.filter((participant) => participant.name !== host?.name);
                }
                else {
                    if ((inBreakRoom && breakRoom === hostNewRoom) ||
                        (!inBreakRoom && hostNewRoom === -1) ||
                        (!inBreakRoom && hostNewRoom === memberBreakRoom && memberBreakRoom !== -1)) {
                        addHostAudio = true;
                    }
                }
            }
            for (let participant of room) {
                let streams = allAudioStreams.filter((stream) => {
                    if ((Object.prototype.hasOwnProperty.call(stream, 'producerId') && stream.producerId) ||
                        (Object.prototype.hasOwnProperty.call(stream, 'audioID') && stream.audioID)) {
                        let producerId = stream.producerId || stream.audioID;
                        let matchingParticipant = ref_participants.find((obj) => obj.audioID == producerId);
                        return matchingParticipant && matchingParticipant.name == participant.name;
                    }
                    // Return false if the stream doesn't meet the criteria
                    return false;
                });
                currentStreams.push(...streams);
            }
            // If webinar, add the host audio stream if it is not in the currentStreams
            if (islevel !== '2' && (eventType === 'webinar' || addHostAudio)) {
                const host = participants.find((obj) => obj.islevel === '2');
                const hostStream = allAudioStreams.find((obj) => obj.producerId === host?.audioID);
                if (hostStream && !currentStreams.includes(hostStream)) {
                    currentStreams.push(hostStream);
                    if (host?.name && !room.map((obj) => obj.name).includes(host.name)) {
                        room.push({ name: host?.name || '', breakRoom: -1 });
                    }
                    updateLimitedBreakRoom(room);
                }
            }
            await processConsumerTransportsAudio({
                consumerTransports,
                lStreams: currentStreams,
                parameters,
            });
        }
        catch (error) {
            console.log('Error in resumePauseAudioStreams:', error);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ResumePauseAudioStreams, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ResumePauseAudioStreams, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ResumePauseAudioStreams, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdW1lLXBhdXNlLWF1ZGlvLXN0cmVhbXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvcmVzdW1lLXBhdXNlLWF1ZGlvLXN0cmVhbXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQTBDM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0RHO0FBTUgsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQzs7Ozs7Ozs7Ozs7T0FXRztJQUVILHVCQUF1QixHQUFHLEtBQUssRUFBRSxFQUMvQixTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQ2QsV0FBVyxHQUFHLEtBQUssRUFDbkIsVUFBVSxHQUNxQixFQUFpQixFQUFFO1FBQ2xELElBQUksRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUN6QyxVQUFVLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztRQUVuQyxJQUFJLEVBQ0YsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixlQUFlLEVBQ2YsWUFBWSxFQUNaLE9BQU8sRUFDUCxTQUFTLEVBQ1Qsa0JBQWtCLEVBQ2xCLFdBQVcsRUFDWCxNQUFNLEVBRU4sc0JBQXNCLEVBQ3RCLDhCQUE4QixHQUMvQixHQUFHLFVBQVUsQ0FBQztRQUVmLElBQUksSUFBSSxHQUEwQixFQUFFLENBQUM7UUFDckMsSUFBSSxjQUFjLEdBQTZCLEVBQUUsQ0FBQztRQUNsRCw4Q0FBOEM7UUFDOUMsSUFBSSxXQUFXLElBQUksU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDcEMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksR0FBRyxnQkFBZ0IsQ0FB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TCxDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNmLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUNBQW1DLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUQsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0F4SFMsdUJBQXVCOzJHQUF2Qix1QkFBdUIsY0FGdEIsTUFBTTs7MkZBRVAsdUJBQXVCO2tCQUhuQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFBhcnRpY2lwYW50LFxuICBTdHJlYW0sXG4gIFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpb1R5cGUsXG4gIFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpb1BhcmFtZXRlcnMsXG4gIFRyYW5zcG9ydCxcbiAgQnJlYWtvdXRQYXJ0aWNpcGFudCxcbiAgRXZlbnRUeXBlLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zUGFyYW1ldGVyc1xuICBleHRlbmRzIFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpb1BhcmFtZXRlcnMge1xuICBicmVha291dFJvb21zOiBCcmVha291dFBhcnRpY2lwYW50W11bXTtcbiAgcmVmX3BhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgYWxsQXVkaW9TdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbiAgY29uc3VtZXJUcmFuc3BvcnRzOiBUcmFuc3BvcnRbXTtcbiAgbGltaXRlZEJyZWFrUm9vbTogQnJlYWtvdXRQYXJ0aWNpcGFudFtdO1xuICBob3N0TmV3Um9vbTogbnVtYmVyO1xuICBtZW1iZXI6IHN0cmluZztcbiAgdXBkYXRlTGltaXRlZEJyZWFrUm9vbTogKGxpbWl0ZWRCcmVha1Jvb206IEJyZWFrb3V0UGFydGljaXBhbnRbXSkgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvOiBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW9UeXBlO1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtc1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtc09wdGlvbnMge1xuICBicmVha1Jvb20/OiBudW1iZXI7XG4gIGluQnJlYWtSb29tPzogYm9vbGVhbjtcbiAgcGFyYW1ldGVyczogUmVzdW1lUGF1c2VBdWRpb1N0cmVhbXNQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtc1R5cGUgPSAoXG4gIG9wdGlvbnM6IFJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zT3B0aW9ucyxcbikgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBSZXN1bWVzIG9yIHBhdXNlcyBhdWRpbyBzdHJlYW1zIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBvcHRpb25zLlxuICpcbiAqIFRoaXMgbWV0aG9kIGNoZWNrcyB0aGUgY3VycmVudCBzdGF0ZSBvZiBwYXJ0aWNpcGFudHMgaW4gYnJlYWtvdXQgcm9vbXMgYW5kXG4gKiB1cGRhdGVzIHRoZSBhdWRpbyBzdHJlYW1zIGFjY29yZGluZ2x5LiBJdCBjYW4gYWRkIG9yIHJlbW92ZSBhdWRpbyBzdHJlYW1zXG4gKiBiYXNlZCBvbiB0aGUgcGFydGljaXBhbnQncyBjdXJyZW50IHN0YXR1cyAoaW4gYSBicmVha291dCByb29tIG9yIG5vdClcbiAqIGFuZCB0aGUgZXZlbnQgdHlwZSAoZS5nLiwgY29uZmVyZW5jZSwgd2ViaW5hcikuXG4gKlxuICogQHBhcmFtIHtSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtc09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmVzdW1pbmcgb3IgcGF1c2luZyBhdWRpbyBzdHJlYW1zLlxuICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmJyZWFrUm9vbT0tMV0gLSBUaGUgSUQgb2YgdGhlIGJyZWFrIHJvb20uIERlZmF1bHRzIHRvIC0xIGlmIG5vdCBzcGVjaWZpZWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmluQnJlYWtSb29tPWZhbHNlXSAtIEluZGljYXRlcyBpZiB0aGUgcGFydGljaXBhbnQgaXMgaW4gYSBicmVhayByb29tLiBEZWZhdWx0cyB0byBmYWxzZS5cbiAqIEBwYXJhbSB7UmVzdW1lUGF1c2VBdWRpb1N0cmVhbXNQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3IgcHJvY2Vzc2luZyBhdWRpbyBzdHJlYW1zLlxuICogQHBhcmFtIHtBcnJheTxCcmVha291dFBhcnRpY2lwYW50W10+fSBvcHRpb25zLnBhcmFtZXRlcnMuYnJlYWtvdXRSb29tcyAtIEFycmF5IG9mIGJyZWFrb3V0IHJvb21zLlxuICogQHBhcmFtIHtBcnJheTxQYXJ0aWNpcGFudD59IG9wdGlvbnMucGFyYW1ldGVycy5yZWZfcGFydGljaXBhbnRzIC0gQXJyYXkgb2YgcmVmZXJlbmNlIHBhcnRpY2lwYW50cy5cbiAqIEBwYXJhbSB7QXJyYXk8U3RyZWFtIHwgUGFydGljaXBhbnQ+fSBvcHRpb25zLnBhcmFtZXRlcnMuYWxsQXVkaW9TdHJlYW1zIC0gQXJyYXkgb2YgYWxsIGF1ZGlvIHN0cmVhbXMuXG4gKiBAcGFyYW0ge0FycmF5PFBhcnRpY2lwYW50Pn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnBhcnRpY2lwYW50cyAtIEFycmF5IG9mIHBhcnRpY2lwYW50cy5cbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgcGFydGljaXBhbnQuXG4gKiBAcGFyYW0ge0V2ZW50VHlwZX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmV2ZW50VHlwZSAtIFRoZSB0eXBlIG9mIGV2ZW50IChlLmcuLCBjb25mZXJlbmNlLCB3ZWJpbmFyKS5cbiAqIEBwYXJhbSB7QXJyYXk8VHJhbnNwb3J0Pn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbnN1bWVyVHJhbnNwb3J0cyAtIEFycmF5IG9mIGNvbnN1bWVyIHRyYW5zcG9ydHMuXG4gKiBAcGFyYW0ge0FycmF5PEJyZWFrb3V0UGFydGljaXBhbnQ+fSBvcHRpb25zLnBhcmFtZXRlcnMubGltaXRlZEJyZWFrUm9vbSAtIEFycmF5IG9mIHBhcnRpY2lwYW50cyBpbiB0aGUgbGltaXRlZCBicmVhayByb29tLlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5ob3N0TmV3Um9vbSAtIFRoZSBJRCBvZiB0aGUgaG9zdCdzIG5ldyByb29tLlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5tZW1iZXIgLSBUaGUgbmFtZSBvZiB0aGUgbWVtYmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUxpbWl0ZWRCcmVha1Jvb20gLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGxpbWl0ZWQgYnJlYWsgcm9vbS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5wcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW8gLSBGdW5jdGlvbiB0byBwcm9jZXNzIGF1ZGlvIHRyYW5zcG9ydHMuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGF1ZGlvIHN0cmVhbXMgaGF2ZSBiZWVuIHByb2Nlc3NlZC5cbiAqXG4gKiBAdGhyb3dzIFdpbGwgbG9nIGFuIGVycm9yIG1lc3NhZ2UgaWYgdGhlcmUgaXMgYW4gaXNzdWUgcHJvY2Vzc2luZyB0aGUgYXVkaW8gc3RyZWFtcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogYXdhaXQgcmVzdW1lUGF1c2VBdWRpb1N0cmVhbXMoe1xuICogICBicmVha1Jvb206IDEsXG4gKiAgIGluQnJlYWtSb29tOiB0cnVlLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgYnJlYWtvdXRSb29tczogW10sXG4gKiAgICAgcmVmX3BhcnRpY2lwYW50czogW10sXG4gKiAgICAgYWxsQXVkaW9TdHJlYW1zOiBbXSxcbiAqICAgICBwYXJ0aWNpcGFudHM6IFtdLFxuICogICAgIGlzbGV2ZWw6ICcxJyxcbiAqICAgICBldmVudFR5cGU6ICdjb25mZXJlbmNlJyxcbiAqICAgICBjb25zdW1lclRyYW5zcG9ydHM6IFtdLFxuICogICAgIGxpbWl0ZWRCcmVha1Jvb206IFtdLFxuICogICAgIGhvc3ROZXdSb29tOiAyLFxuICogICAgIG1lbWJlcjogJ0pvaG5Eb2UnLFxuICogICAgIHVwZGF0ZUxpbWl0ZWRCcmVha1Jvb206IG15VXBkYXRlRnVuY3Rpb24sXG4gKiAgICAgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvOiBteVByb2Nlc3NGdW5jdGlvbixcbiAqICAgfSxcbiAqIH0pO1xuICogYGBgXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVzdW1lUGF1c2VBdWRpb1N0cmVhbXMge1xuICAvKipcbiAgICogUmVzdW1lcyBvciBwYXVzZXMgYXVkaW8gc3RyZWFtcyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtc09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmVzdW1pbmcgb3IgcGF1c2luZyBhdWRpbyBzdHJlYW1zLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuYnJlYWtSb29tPS0xXSAtIFRoZSBJRCBvZiB0aGUgYnJlYWsgcm9vbS5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5pbkJyZWFrUm9vbT1mYWxzZV0gLSBJbmRpY2F0ZXMgaWYgdGhlIHBhcnRpY2lwYW50IGlzIGluIGEgYnJlYWsgcm9vbS5cbiAgICogQHBhcmFtIHtQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3IgcHJvY2Vzc2luZyBhdWRpbyBzdHJlYW1zLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYXVkaW8gc3RyZWFtcyBoYXZlIGJlZW4gcHJvY2Vzc2VkLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgbG9nIGFuIGVycm9yIG1lc3NhZ2UgaWYgdGhlcmUgaXMgYW4gaXNzdWUgcHJvY2Vzc2luZyB0aGUgYXVkaW8gc3RyZWFtcy5cbiAgICovXG5cbiAgcmVzdW1lUGF1c2VBdWRpb1N0cmVhbXMgPSBhc3luYyAoe1xuICAgIGJyZWFrUm9vbSA9IC0xLFxuICAgIGluQnJlYWtSb29tID0gZmFsc2UsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogUmVzdW1lUGF1c2VBdWRpb1N0cmVhbXNPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgbGV0IHsgZ2V0VXBkYXRlZEFsbFBhcmFtcyB9ID0gcGFyYW1ldGVycztcbiAgICBwYXJhbWV0ZXJzID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgbGV0IHtcbiAgICAgIGJyZWFrb3V0Um9vbXMsXG4gICAgICByZWZfcGFydGljaXBhbnRzLFxuICAgICAgYWxsQXVkaW9TdHJlYW1zLFxuICAgICAgcGFydGljaXBhbnRzLFxuICAgICAgaXNsZXZlbCxcbiAgICAgIGV2ZW50VHlwZSxcbiAgICAgIGNvbnN1bWVyVHJhbnNwb3J0cyxcbiAgICAgIGhvc3ROZXdSb29tLFxuICAgICAgbWVtYmVyLFxuXG4gICAgICB1cGRhdGVMaW1pdGVkQnJlYWtSb29tLFxuICAgICAgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvLFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgbGV0IHJvb206IEJyZWFrb3V0UGFydGljaXBhbnRbXSA9IFtdO1xuICAgIGxldCBjdXJyZW50U3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdID0gW107XG4gICAgLy8gRGV0ZXJtaW5lIHRoZSByb29tIGJhc2VkIG9uIGJyZWFrb3V0IHN0YXR1c1xuICAgIGlmIChpbkJyZWFrUm9vbSAmJiBicmVha1Jvb20gIT09IC0xKSB7XG4gICAgICByb29tID0gYnJlYWtvdXRSb29tc1ticmVha1Jvb21dO1xuICAgIH0gZWxzZSB7XG4gICAgICByb29tID0gcmVmX3BhcnRpY2lwYW50cy5maWx0ZXIoXG4gICAgICAgIChwYXJ0aWNpcGFudCkgPT5cbiAgICAgICAgICAhYnJlYWtvdXRSb29tc1xuICAgICAgICAgICAgLmZsYXQoKVxuICAgICAgICAgICAgLm1hcCgob2JqKSA9PiBvYmoubmFtZSlcbiAgICAgICAgICAgIC5pbmNsdWRlcyhwYXJ0aWNpcGFudC5uYW1lKSxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdXBkYXRlTGltaXRlZEJyZWFrUm9vbShyb29tKTtcblxuICAgIHRyeSB7XG4gICAgICBsZXQgYWRkSG9zdEF1ZGlvID0gZmFsc2U7XG5cbiAgICAgIGlmIChpc2xldmVsICE9PSAnMicgJiYgZXZlbnRUeXBlID09PSAnY29uZmVyZW5jZScpIHtcbiAgICAgICAgY29uc3Qgcm9vbU1lbWJlciA9IGJyZWFrb3V0Um9vbXMuZmluZCgocikgPT4gci5maW5kKChwKSA9PiBwLm5hbWUgPT09IG1lbWJlcikpO1xuICAgICAgICBsZXQgbWVtYmVyQnJlYWtSb29tID0gLTE7XG4gICAgICAgIGlmIChyb29tTWVtYmVyKSB7XG4gICAgICAgICAgbWVtYmVyQnJlYWtSb29tID0gYnJlYWtvdXRSb29tcy5pbmRleE9mKHJvb21NZW1iZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIChpbkJyZWFrUm9vbSAmJiBicmVha1Jvb20gIT09IGhvc3ROZXdSb29tKSB8fFxuICAgICAgICAgICghaW5CcmVha1Jvb20gJiYgaG9zdE5ld1Jvb20gIT09IC0xICYmIGhvc3ROZXdSb29tICE9PSBtZW1iZXJCcmVha1Jvb20pXG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IGhvc3QgPSBwYXJ0aWNpcGFudHMuZmluZCgob2JqKSA9PiBvYmouaXNsZXZlbCA9PT0gJzInKTtcbiAgICAgICAgICAvLyBSZW1vdmUgdGhlIGhvc3QgZnJvbSB0aGUgcm9vbVxuICAgICAgICAgIHJvb20gPSByb29tLmZpbHRlcigocGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50Lm5hbWUgIT09IGhvc3Q/Lm5hbWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIChpbkJyZWFrUm9vbSAmJiBicmVha1Jvb20gPT09IGhvc3ROZXdSb29tKSB8fFxuICAgICAgICAgICAgKCFpbkJyZWFrUm9vbSAmJiBob3N0TmV3Um9vbSA9PT0gLTEpIHx8XG4gICAgICAgICAgICAoIWluQnJlYWtSb29tICYmIGhvc3ROZXdSb29tID09PSBtZW1iZXJCcmVha1Jvb20gJiYgbWVtYmVyQnJlYWtSb29tICE9PSAtMSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGFkZEhvc3RBdWRpbyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZvciAobGV0IHBhcnRpY2lwYW50IG9mIHJvb20pIHtcbiAgICAgICAgbGV0IHN0cmVhbXMgPSBhbGxBdWRpb1N0cmVhbXMuZmlsdGVyKChzdHJlYW0pID0+IHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ3Byb2R1Y2VySWQnKSAmJiBzdHJlYW0ucHJvZHVjZXJJZCkgfHxcbiAgICAgICAgICAgIChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoc3RyZWFtLCAnYXVkaW9JRCcpICYmIHN0cmVhbS5hdWRpb0lEKVxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbGV0IHByb2R1Y2VySWQgPSBzdHJlYW0ucHJvZHVjZXJJZCB8fCBzdHJlYW0uYXVkaW9JRDtcbiAgICAgICAgICAgIGxldCBtYXRjaGluZ1BhcnRpY2lwYW50ID0gcmVmX3BhcnRpY2lwYW50cy5maW5kKChvYmopID0+IG9iai5hdWRpb0lEID09IHByb2R1Y2VySWQpO1xuICAgICAgICAgICAgcmV0dXJuIG1hdGNoaW5nUGFydGljaXBhbnQgJiYgbWF0Y2hpbmdQYXJ0aWNpcGFudC5uYW1lID09IHBhcnRpY2lwYW50Lm5hbWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIFJldHVybiBmYWxzZSBpZiB0aGUgc3RyZWFtIGRvZXNuJ3QgbWVldCB0aGUgY3JpdGVyaWFcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGN1cnJlbnRTdHJlYW1zLnB1c2goLi4uc3RyZWFtcyk7XG4gICAgICB9XG5cbiAgICAgIC8vIElmIHdlYmluYXIsIGFkZCB0aGUgaG9zdCBhdWRpbyBzdHJlYW0gaWYgaXQgaXMgbm90IGluIHRoZSBjdXJyZW50U3RyZWFtc1xuICAgICAgaWYgKGlzbGV2ZWwgIT09ICcyJyAmJiAoZXZlbnRUeXBlID09PSAnd2ViaW5hcicgfHwgYWRkSG9zdEF1ZGlvKSkge1xuICAgICAgICBjb25zdCBob3N0ID0gcGFydGljaXBhbnRzLmZpbmQoKG9iaikgPT4gb2JqLmlzbGV2ZWwgPT09ICcyJyk7XG4gICAgICAgIGNvbnN0IGhvc3RTdHJlYW0gPSBhbGxBdWRpb1N0cmVhbXMuZmluZCgob2JqKSA9PiBvYmoucHJvZHVjZXJJZCA9PT0gaG9zdD8uYXVkaW9JRCk7XG4gICAgICAgIGlmIChob3N0U3RyZWFtICYmICFjdXJyZW50U3RyZWFtcy5pbmNsdWRlcyhob3N0U3RyZWFtKSkge1xuICAgICAgICAgIGN1cnJlbnRTdHJlYW1zLnB1c2goaG9zdFN0cmVhbSk7XG4gICAgICAgICAgaWYgKGhvc3Q/Lm5hbWUgJiYgIXJvb20ubWFwKChvYmopID0+IG9iai5uYW1lKS5pbmNsdWRlcyhob3N0Lm5hbWUpKSB7XG4gICAgICAgICAgICByb29tLnB1c2goeyBuYW1lOiBob3N0Py5uYW1lIHx8ICcnLCBicmVha1Jvb206IC0xIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVMaW1pdGVkQnJlYWtSb29tKHJvb20pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbyh7XG4gICAgICAgIGNvbnN1bWVyVHJhbnNwb3J0cyxcbiAgICAgICAgbFN0cmVhbXM6IGN1cnJlbnRTdHJlYW1zLFxuICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBpbiByZXN1bWVQYXVzZUF1ZGlvU3RyZWFtczonLCBlcnJvcik7XG4gICAgfVxuICB9O1xufVxuIl19