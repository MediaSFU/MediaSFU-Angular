import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdW1lLXBhdXNlLWF1ZGlvLXN0cmVhbXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvcmVzdW1lLXBhdXNlLWF1ZGlvLXN0cmVhbXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQTZDM0MsTUFBTSxPQUFPLHVCQUF1QjtJQUNsQzs7Ozs7Ozs7Ozs7T0FXRztJQUVILHVCQUF1QixHQUFHLEtBQUssRUFBRSxFQUMvQixTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQ2QsV0FBVyxHQUFHLEtBQUssRUFDbkIsVUFBVSxHQUNxQixFQUFpQixFQUFFO1FBQ2xELElBQUksRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFVBQVUsQ0FBQztRQUN6QyxVQUFVLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztRQUVuQyxJQUFJLEVBQ0YsYUFBYSxFQUNiLGdCQUFnQixFQUNoQixlQUFlLEVBQ2YsWUFBWSxFQUNaLE9BQU8sRUFDUCxTQUFTLEVBQ1Qsa0JBQWtCLEVBQ2xCLFdBQVcsRUFDWCxNQUFNLEVBRU4sc0JBQXNCLEVBQ3RCLDhCQUE4QixHQUMvQixHQUFHLFVBQVUsQ0FBQztRQUVmLElBQUksSUFBSSxHQUEwQixFQUFFLENBQUM7UUFDckMsSUFBSSxjQUFjLEdBQTZCLEVBQUUsQ0FBQztRQUNsRCw4Q0FBOEM7UUFDOUMsSUFBSSxXQUFXLElBQUksU0FBUyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDcEMsSUFBSSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNsQyxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksR0FBRyxnQkFBZ0IsQ0FBQyxNQUFNLENBQzVCLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FDZCxDQUFDLGFBQWE7aUJBQ1gsSUFBSSxF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QW1DLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUQsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0F4SFMsdUJBQXVCOzJHQUF2Qix1QkFBdUIsY0FGdEIsTUFBTTs7MkZBRVAsdUJBQXVCO2tCQUhuQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFBhcnRpY2lwYW50LFxuICBTdHJlYW0sXG4gIFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpb1R5cGUsXG4gIFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpb1BhcmFtZXRlcnMsXG4gIFRyYW5zcG9ydCxcbiAgQnJlYWtvdXRQYXJ0aWNpcGFudCxcbiAgRXZlbnRUeXBlLFxufSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zUGFyYW1ldGVyc1xuICBleHRlbmRzIFByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpb1BhcmFtZXRlcnMge1xuICBicmVha291dFJvb21zOiBCcmVha291dFBhcnRpY2lwYW50W11bXTtcbiAgcmVmX3BhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgYWxsQXVkaW9TdHJlYW1zOiAoU3RyZWFtIHwgUGFydGljaXBhbnQpW107XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbiAgY29uc3VtZXJUcmFuc3BvcnRzOiBUcmFuc3BvcnRbXTtcbiAgbGltaXRlZEJyZWFrUm9vbTogQnJlYWtvdXRQYXJ0aWNpcGFudFtdO1xuICBob3N0TmV3Um9vbTogbnVtYmVyO1xuICBtZW1iZXI6IHN0cmluZztcbiAgdXBkYXRlTGltaXRlZEJyZWFrUm9vbTogKGxpbWl0ZWRCcmVha1Jvb206IEJyZWFrb3V0UGFydGljaXBhbnRbXSkgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgcHJvY2Vzc0NvbnN1bWVyVHJhbnNwb3J0c0F1ZGlvOiBQcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW9UeXBlO1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtc1BhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtc09wdGlvbnMge1xuICBicmVha1Jvb20/OiBudW1iZXI7XG4gIGluQnJlYWtSb29tPzogYm9vbGVhbjtcbiAgcGFyYW1ldGVyczogUmVzdW1lUGF1c2VBdWRpb1N0cmVhbXNQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBSZXN1bWVQYXVzZUF1ZGlvU3RyZWFtc1R5cGUgPSAoXG4gIG9wdGlvbnM6IFJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zT3B0aW9ucyxcbikgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zIHtcbiAgLyoqXG4gICAqIFJlc3VtZXMgb3IgcGF1c2VzIGF1ZGlvIHN0cmVhbXMgYmFzZWQgb24gdGhlIHByb3ZpZGVkIG9wdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7UmVzdW1lUGF1c2VBdWRpb1N0cmVhbXNPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHJlc3VtaW5nIG9yIHBhdXNpbmcgYXVkaW8gc3RyZWFtcy5cbiAgICogQHBhcmFtIHtudW1iZXJ9IFtvcHRpb25zLmJyZWFrUm9vbT0tMV0gLSBUaGUgSUQgb2YgdGhlIGJyZWFrIHJvb20uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuaW5CcmVha1Jvb209ZmFsc2VdIC0gSW5kaWNhdGVzIGlmIHRoZSBwYXJ0aWNpcGFudCBpcyBpbiBhIGJyZWFrIHJvb20uXG4gICAqIEBwYXJhbSB7UGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIHByb2Nlc3NpbmcgYXVkaW8gc3RyZWFtcy5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGF1ZGlvIHN0cmVhbXMgaGF2ZSBiZWVuIHByb2Nlc3NlZC5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIGxvZyBhbiBlcnJvciBtZXNzYWdlIGlmIHRoZXJlIGlzIGFuIGlzc3VlIHByb2Nlc3NpbmcgdGhlIGF1ZGlvIHN0cmVhbXMuXG4gICAqL1xuXG4gIHJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zID0gYXN5bmMgKHtcbiAgICBicmVha1Jvb20gPSAtMSxcbiAgICBpbkJyZWFrUm9vbSA9IGZhbHNlLFxuICAgIHBhcmFtZXRlcnMsXG4gIH06IFJlc3VtZVBhdXNlQXVkaW9TdHJlYW1zT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCB7IGdldFVwZGF0ZWRBbGxQYXJhbXMgfSA9IHBhcmFtZXRlcnM7XG4gICAgcGFyYW1ldGVycyA9IGdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcblxuICAgIGxldCB7XG4gICAgICBicmVha291dFJvb21zLFxuICAgICAgcmVmX3BhcnRpY2lwYW50cyxcbiAgICAgIGFsbEF1ZGlvU3RyZWFtcyxcbiAgICAgIHBhcnRpY2lwYW50cyxcbiAgICAgIGlzbGV2ZWwsXG4gICAgICBldmVudFR5cGUsXG4gICAgICBjb25zdW1lclRyYW5zcG9ydHMsXG4gICAgICBob3N0TmV3Um9vbSxcbiAgICAgIG1lbWJlcixcblxuICAgICAgdXBkYXRlTGltaXRlZEJyZWFrUm9vbSxcbiAgICAgIHByb2Nlc3NDb25zdW1lclRyYW5zcG9ydHNBdWRpbyxcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGxldCByb29tOiBCcmVha291dFBhcnRpY2lwYW50W10gPSBbXTtcbiAgICBsZXQgY3VycmVudFN0cmVhbXM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXSA9IFtdO1xuICAgIC8vIERldGVybWluZSB0aGUgcm9vbSBiYXNlZCBvbiBicmVha291dCBzdGF0dXNcbiAgICBpZiAoaW5CcmVha1Jvb20gJiYgYnJlYWtSb29tICE9PSAtMSkge1xuICAgICAgcm9vbSA9IGJyZWFrb3V0Um9vbXNbYnJlYWtSb29tXTtcbiAgICB9IGVsc2Uge1xuICAgICAgcm9vbSA9IHJlZl9wYXJ0aWNpcGFudHMuZmlsdGVyKFxuICAgICAgICAocGFydGljaXBhbnQpID0+XG4gICAgICAgICAgIWJyZWFrb3V0Um9vbXNcbiAgICAgICAgICAgIC5mbGF0KClcbiAgICAgICAgICAgIC5tYXAoKG9iaikgPT4gb2JqLm5hbWUpXG4gICAgICAgICAgICAuaW5jbHVkZXMocGFydGljaXBhbnQubmFtZSksXG4gICAgICApO1xuICAgIH1cblxuICAgIHVwZGF0ZUxpbWl0ZWRCcmVha1Jvb20ocm9vbSk7XG5cbiAgICB0cnkge1xuICAgICAgbGV0IGFkZEhvc3RBdWRpbyA9IGZhbHNlO1xuXG4gICAgICBpZiAoaXNsZXZlbCAhPT0gJzInICYmIGV2ZW50VHlwZSA9PT0gJ2NvbmZlcmVuY2UnKSB7XG4gICAgICAgIGNvbnN0IHJvb21NZW1iZXIgPSBicmVha291dFJvb21zLmZpbmQoKHIpID0+IHIuZmluZCgocCkgPT4gcC5uYW1lID09PSBtZW1iZXIpKTtcbiAgICAgICAgbGV0IG1lbWJlckJyZWFrUm9vbSA9IC0xO1xuICAgICAgICBpZiAocm9vbU1lbWJlcikge1xuICAgICAgICAgIG1lbWJlckJyZWFrUm9vbSA9IGJyZWFrb3V0Um9vbXMuaW5kZXhPZihyb29tTWVtYmVyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAoaW5CcmVha1Jvb20gJiYgYnJlYWtSb29tICE9PSBob3N0TmV3Um9vbSkgfHxcbiAgICAgICAgICAoIWluQnJlYWtSb29tICYmIGhvc3ROZXdSb29tICE9PSAtMSAmJiBob3N0TmV3Um9vbSAhPT0gbWVtYmVyQnJlYWtSb29tKVxuICAgICAgICApIHtcbiAgICAgICAgICBjb25zdCBob3N0ID0gcGFydGljaXBhbnRzLmZpbmQoKG9iaikgPT4gb2JqLmlzbGV2ZWwgPT09ICcyJyk7XG4gICAgICAgICAgLy8gUmVtb3ZlIHRoZSBob3N0IGZyb20gdGhlIHJvb21cbiAgICAgICAgICByb29tID0gcm9vbS5maWx0ZXIoKHBhcnRpY2lwYW50KSA9PiBwYXJ0aWNpcGFudC5uYW1lICE9PSBob3N0Py5uYW1lKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAoaW5CcmVha1Jvb20gJiYgYnJlYWtSb29tID09PSBob3N0TmV3Um9vbSkgfHxcbiAgICAgICAgICAgICghaW5CcmVha1Jvb20gJiYgaG9zdE5ld1Jvb20gPT09IC0xKSB8fFxuICAgICAgICAgICAgKCFpbkJyZWFrUm9vbSAmJiBob3N0TmV3Um9vbSA9PT0gbWVtYmVyQnJlYWtSb29tICYmIG1lbWJlckJyZWFrUm9vbSAhPT0gLTEpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBhZGRIb3N0QXVkaW8gPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBwYXJ0aWNpcGFudCBvZiByb29tKSB7XG4gICAgICAgIGxldCBzdHJlYW1zID0gYWxsQXVkaW9TdHJlYW1zLmZpbHRlcigoc3RyZWFtKSA9PiB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChzdHJlYW0sICdwcm9kdWNlcklkJykgJiYgc3RyZWFtLnByb2R1Y2VySWQpIHx8XG4gICAgICAgICAgICAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHN0cmVhbSwgJ2F1ZGlvSUQnKSAmJiBzdHJlYW0uYXVkaW9JRClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGxldCBwcm9kdWNlcklkID0gc3RyZWFtLnByb2R1Y2VySWQgfHwgc3RyZWFtLmF1ZGlvSUQ7XG4gICAgICAgICAgICBsZXQgbWF0Y2hpbmdQYXJ0aWNpcGFudCA9IHJlZl9wYXJ0aWNpcGFudHMuZmluZCgob2JqKSA9PiBvYmouYXVkaW9JRCA9PSBwcm9kdWNlcklkKTtcbiAgICAgICAgICAgIHJldHVybiBtYXRjaGluZ1BhcnRpY2lwYW50ICYmIG1hdGNoaW5nUGFydGljaXBhbnQubmFtZSA9PSBwYXJ0aWNpcGFudC5uYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBSZXR1cm4gZmFsc2UgaWYgdGhlIHN0cmVhbSBkb2Vzbid0IG1lZXQgdGhlIGNyaXRlcmlhXG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9KTtcblxuICAgICAgICBjdXJyZW50U3RyZWFtcy5wdXNoKC4uLnN0cmVhbXMpO1xuICAgICAgfVxuXG4gICAgICAvLyBJZiB3ZWJpbmFyLCBhZGQgdGhlIGhvc3QgYXVkaW8gc3RyZWFtIGlmIGl0IGlzIG5vdCBpbiB0aGUgY3VycmVudFN0cmVhbXNcbiAgICAgIGlmIChpc2xldmVsICE9PSAnMicgJiYgKGV2ZW50VHlwZSA9PT0gJ3dlYmluYXInIHx8IGFkZEhvc3RBdWRpbykpIHtcbiAgICAgICAgY29uc3QgaG9zdCA9IHBhcnRpY2lwYW50cy5maW5kKChvYmopID0+IG9iai5pc2xldmVsID09PSAnMicpO1xuICAgICAgICBjb25zdCBob3N0U3RyZWFtID0gYWxsQXVkaW9TdHJlYW1zLmZpbmQoKG9iaikgPT4gb2JqLnByb2R1Y2VySWQgPT09IGhvc3Q/LmF1ZGlvSUQpO1xuICAgICAgICBpZiAoaG9zdFN0cmVhbSAmJiAhY3VycmVudFN0cmVhbXMuaW5jbHVkZXMoaG9zdFN0cmVhbSkpIHtcbiAgICAgICAgICBjdXJyZW50U3RyZWFtcy5wdXNoKGhvc3RTdHJlYW0pO1xuICAgICAgICAgIGlmIChob3N0Py5uYW1lICYmICFyb29tLm1hcCgob2JqKSA9PiBvYmoubmFtZSkuaW5jbHVkZXMoaG9zdC5uYW1lKSkge1xuICAgICAgICAgICAgcm9vbS5wdXNoKHsgbmFtZTogaG9zdD8ubmFtZSB8fCAnJywgYnJlYWtSb29tOiAtMSB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlTGltaXRlZEJyZWFrUm9vbShyb29tKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhd2FpdCBwcm9jZXNzQ29uc3VtZXJUcmFuc3BvcnRzQXVkaW8oe1xuICAgICAgICBjb25zdW1lclRyYW5zcG9ydHMsXG4gICAgICAgIGxTdHJlYW1zOiBjdXJyZW50U3RyZWFtcyxcbiAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgaW4gcmVzdW1lUGF1c2VBdWRpb1N0cmVhbXM6JywgZXJyb3IpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==