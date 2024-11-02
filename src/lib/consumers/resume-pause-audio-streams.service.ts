import { Injectable } from '@angular/core';
import {
  Participant,
  Stream,
  ProcessConsumerTransportsAudioType,
  ProcessConsumerTransportsAudioParameters,
  Transport,
  BreakoutParticipant,
  EventType,
} from '../@types/types';

export interface ResumePauseAudioStreamsParameters
  extends ProcessConsumerTransportsAudioParameters {
  breakoutRooms: BreakoutParticipant[][];
  ref_participants: Participant[];
  allAudioStreams: (Stream | Participant)[];
  participants: Participant[];
  islevel: string;
  eventType: EventType;
  consumerTransports: Transport[];
  limitedBreakRoom: BreakoutParticipant[];
  hostNewRoom: number;
  member: string;
  updateLimitedBreakRoom: (limitedBreakRoom: BreakoutParticipant[]) => void;

  // mediasfu functions
  processConsumerTransportsAudio: ProcessConsumerTransportsAudioType;
  getUpdatedAllParams: () => ResumePauseAudioStreamsParameters;
  [key: string]: any;
}

export interface ResumePauseAudioStreamsOptions {
  breakRoom?: number;
  inBreakRoom?: boolean;
  parameters: ResumePauseAudioStreamsParameters;
}

// Export the type definition for the function
export type ResumePauseAudioStreamsType = (
  options: ResumePauseAudioStreamsOptions,
) => Promise<void>;

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


@Injectable({
  providedIn: 'root',
})
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

  resumePauseAudioStreams = async ({
    breakRoom = -1,
    inBreakRoom = false,
    parameters,
  }: ResumePauseAudioStreamsOptions): Promise<void> => {
    let { getUpdatedAllParams } = parameters;
    parameters = getUpdatedAllParams();

    let {
      breakoutRooms,
      ref_participants,
      allAudioStreams,
      participants,
      islevel,
      eventType,
      consumerTransports,
      hostNewRoom,
      member,

      updateLimitedBreakRoom,
      processConsumerTransportsAudio,
    } = parameters;

    let room: BreakoutParticipant[] = [];
    let currentStreams: (Stream | Participant)[] = [];
    // Determine the room based on breakout status
    if (inBreakRoom && breakRoom !== -1) {
      room = breakoutRooms[breakRoom];
    } else {
      room = ref_participants.filter(
        (participant) =>
          !breakoutRooms
            .flat()
            .map((obj) => obj.name)
            .includes(participant.name),
      );
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

        if (
          (inBreakRoom && breakRoom !== hostNewRoom) ||
          (!inBreakRoom && hostNewRoom !== -1 && hostNewRoom !== memberBreakRoom)
        ) {
          const host = participants.find((obj) => obj.islevel === '2');
          // Remove the host from the room
          room = room.filter((participant) => participant.name !== host?.name);
        } else {
          if (
            (inBreakRoom && breakRoom === hostNewRoom) ||
            (!inBreakRoom && hostNewRoom === -1) ||
            (!inBreakRoom && hostNewRoom === memberBreakRoom && memberBreakRoom !== -1)
          ) {
            addHostAudio = true;
          }
        }
      }

      for (let participant of room) {
        let streams = allAudioStreams.filter((stream) => {
          if (
            (Object.prototype.hasOwnProperty.call(stream, 'producerId') && stream.producerId) ||
            (Object.prototype.hasOwnProperty.call(stream, 'audioID') && stream.audioID)
          ) {
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
    } catch (error) {
      console.log('Error in resumePauseAudioStreams:', error);
    }
  };
}
