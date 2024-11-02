import { Injectable } from '@angular/core';
import {
  BreakoutParticipant,
  BreakoutRoomUpdatedData,
  OnScreenChangesParameters,
  OnScreenChangesType,
  Participant,
  RePortParameters,
  RePortType,
} from '../../@types/types';

export interface BreakoutRoomUpdatedParameters extends OnScreenChangesParameters, RePortParameters {
  breakOutRoomStarted: boolean;
  breakOutRoomEnded: boolean;
  breakoutRooms: BreakoutParticipant[][];
  hostNewRoom: number;
  islevel: string;
  participantsAll: Participant[];
  participants: Participant[];
  meetingDisplayType: string;
  prevMeetingDisplayType: string;
  updateBreakoutRooms: (rooms: BreakoutParticipant[][]) => void;
  updateBreakOutRoomStarted: (started: boolean) => void;
  updateBreakOutRoomEnded: (ended: boolean) => void;
  updateHostNewRoom: (room: number) => void;
  updateMeetingDisplayType: (type: string) => void;
  updateParticipantsAll: (participants: Participant[]) => void;
  updateParticipants: (participants: Participant[]) => void;

  //mediasfu functions
  onScreenChanges: OnScreenChangesType;
  rePort: RePortType;

  getUpdatedAllParams: () => BreakoutRoomUpdatedParameters;
  [key: string]: any;
}

export interface BreakoutRoomUpdatedOptions {
  data: BreakoutRoomUpdatedData;
  parameters: BreakoutRoomUpdatedParameters;
}

// Export the type definition for the function
export type BreakoutRoomUpdatedType = (options: BreakoutRoomUpdatedOptions) => Promise<void>;

/**
 * Updates the state of breakout rooms based on the provided data and parameters.
 *
 * This method handles changes in breakout rooms, updates the relevant state variables,
 * and triggers necessary UI updates based on the current status of the breakout rooms.
 *
 * @param {BreakoutRoomUpdatedOptions} options - The options object containing the data and parameters.
 * @param {BreakoutRoomUpdatedData} options.data - The data object containing information about the breakout rooms.
 * @param {BreakoutRoomUpdatedParameters} options.parameters - The parameters object containing various state update functions and other parameters.
 * @param {boolean} options.parameters.breakOutRoomStarted - Indicates if the breakout room has started.
 * @param {boolean} options.parameters.breakOutRoomEnded - Indicates if the breakout room has ended.
 * @param {Array<BreakoutParticipant[]>} options.parameters.breakoutRooms - The list of current breakout rooms.
 * @param {number} options.parameters.hostNewRoom - The ID of the new room for the host.
 * @param {string} options.parameters.islevel - The level of the breakout room (e.g., '2' for host).
 * @param {Array<Participant>} options.parameters.participantsAll - The list of all participants.
 * @param {Array<Participant>} options.parameters.participants - The list of participants who are not banned.
 * @param {string} options.parameters.meetingDisplayType - The current display type of the meeting.
 * @param {string} options.parameters.prevMeetingDisplayType - The previous display type of the meeting.
 * @param {Function} options.parameters.updateBreakoutRooms - Function to update the breakout rooms.
 * @param {Function} options.parameters.updateBreakOutRoomStarted - Function to update the breakout room started state.
 * @param {Function} options.parameters.updateBreakOutRoomEnded - Function to update the breakout room ended state.
 * @param {Function} options.parameters.updateHostNewRoom - Function to update the host's new room.
 * @param {Function} options.parameters.updateMeetingDisplayType - Function to update the meeting display type.
 * @param {Function} options.parameters.updateParticipantsAll - Function to update the list of all participants.
 * @param {Function} options.parameters.updateParticipants - Function to update the list of participants who are not banned.
 * @param {Function} options.parameters.onScreenChanges - Function to handle screen changes.
 * @param {Function} options.parameters.rePort - Function to handle reporting.
 *
 * @returns {Promise<void>} A promise that resolves when the breakout room state has been updated.
 *
 * @throws Will throw an error if the update process fails.
 *
 * @example
 * ```typescript
 * const options = {
 *   data: {
 *     forHost: true,
 *     newRoom: 3,
 *     status: 'started',
 *     members: [
 *       { name: 'user1', isBanned: false, audioID: 'audio1', videoID: 'video1' },
 *       { name: 'user2', isBanned: true, audioID: 'audio2', videoID: 'video2' },
 *     ],
 *     breakoutRooms: [[{ name: 'user1' }, { name: 'user2' }]],
 *   },
 *   parameters: {
 *     socket: socketInstance,
 *     roomName: 'mainRoom',
 *     screenStates: [{ mainScreenPerson: 'user1', mainScreenFilled: true, adminOnMainScreen: false }],
 *     participants: [{ name: 'admin', islevel: '2' }],
 *     breakOutRoomStarted: false,
 *     breakOutRoomEnded: false,
 *     hostNewRoom: 0,
 *     islevel: '2',
 *     participantsAll: [],
 *     updateBreakoutRooms: (rooms) => {},
 *     updateBreakOutRoomStarted: (started) => {},
 *     updateBreakOutRoomEnded: (ended) => {},
 *     updateHostNewRoom: (room) => {},
 *     updateMeetingDisplayType: (type) => {},
 *     updateParticipantsAll: (participants) => {},
 *     updateParticipants: (participants) => {},
 *     onScreenChanges: async () => {},
 *     rePort: async () => {},
 *   },
 * };
 *
 * const breakoutRoomService = new BreakoutRoomUpdated();
 * await breakoutRoomService.breakoutRoomUpdated(options);
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class BreakoutRoomUpdated {
  /**
   * Updates the state of breakout rooms based on the provided data and parameters.
   *
   * @param {Object} options - The options object.
   * @param {Object} options.data - The data object containing information about the breakout rooms.
   * @param {Object} options.parameters - The parameters object containing various state update functions and other parameters.
   * @param {boolean} options.parameters.breakOutRoomStarted - Indicates if the breakout room has started.
   * @param {boolean} options.parameters.breakOutRoomEnded - Indicates if the breakout room has ended.
   * @param {Array} options.parameters.breakoutRooms - The list of current breakout rooms.
   * @param {number} options.parameters.hostNewRoom - The ID of the new room for the host.
   * @param {string} options.parameters.islevel - The level of the breakout room.
   * @param {Array} options.parameters.participantsAll - The list of all participants.
   * @param {Array} options.parameters.participants - The list of participants who are not banned.
   * @param {string} options.parameters.meetingDisplayType - The current display type of the meeting.
   * @param {string} options.parameters.prevMeetingDisplayType - The previous display type of the meeting.
   * @param {Function} options.parameters.updateBreakoutRooms - Function to update the breakout rooms.
   * @param {Function} options.parameters.updateBreakOutRoomStarted - Function to update the breakout room started state.
   * @param {Function} options.parameters.updateBreakOutRoomEnded - Function to update the breakout room ended state.
   * @param {Function} options.parameters.updateHostNewRoom - Function to update the host's new room.
   * @param {Function} options.parameters.updateMeetingDisplayType - Function to update the meeting display type.
   * @param {Function} options.parameters.updateParticipantsAll - Function to update the list of all participants.
   * @param {Function} options.parameters.updateParticipants - Function to update the list of participants who are not banned.
   * @param {Function} options.parameters.onScreenChanges - Function to handle screen changes.
   * @param {Function} options.parameters.rePort - Function to handle reporting.
   *
   * @returns {Promise<void>} A promise that resolves when the breakout room state has been updated.
   *
   * @throws Will throw an error if the update process fails.
   */

  breakoutRoomUpdated = async ({ data, parameters }: BreakoutRoomUpdatedOptions): Promise<void> => {
    try {
      parameters = parameters.getUpdatedAllParams();

      let {
        breakOutRoomStarted,
        breakOutRoomEnded,
        breakoutRooms,
        islevel,
        participantsAll,
        participants,

        updateBreakoutRooms,
        updateBreakOutRoomStarted,
        updateBreakOutRoomEnded,
        updateHostNewRoom,
        updateMeetingDisplayType,
        meetingDisplayType,
        prevMeetingDisplayType,
        updateParticipantsAll,
        updateParticipants,

        //mediaSfu functions
        onScreenChanges,
        rePort,
      } = parameters;

      if (data.forHost) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        updateHostNewRoom(data.newRoom!);
        await onScreenChanges({ changed: true, parameters });
        return;
      }

      if (islevel == '2' && data.members) {
        //filter out the participant that isBanned == true
        participantsAll = data.members;
        //remove every field other than isBanned and name from participantsAll
        participantsAll = data.members.map((participant) => ({
          isBanned: participant.isBanned,
          name: participant.name,
          audioID: participant.audioID,
          videoID: participant.videoID,
        }));
        updateParticipantsAll(participantsAll);

        participants = data.members.filter(
          (participant: Participant) => participant.isBanned == false,
        );
        updateParticipants(participants);
      }

      breakoutRooms = data.breakoutRooms || [];
      updateBreakoutRooms(breakoutRooms);

      if (data.status == 'started' && (breakOutRoomStarted || !breakOutRoomEnded)) {
        breakOutRoomStarted = true;
        breakOutRoomEnded = false;
        updateBreakOutRoomStarted(true);
        updateBreakOutRoomEnded(false);
        prevMeetingDisplayType = meetingDisplayType;
        if (meetingDisplayType != 'all') {
          meetingDisplayType = 'all';
          updateMeetingDisplayType('all');
        }
        await onScreenChanges({ changed: true, parameters });
        if (islevel == '2') {
          await rePort({ restart: true, parameters });
        }
      } else if (data.status == 'ended') {
        breakOutRoomEnded = true;
        updateBreakOutRoomEnded(true);
        if (meetingDisplayType != prevMeetingDisplayType) {
          meetingDisplayType = prevMeetingDisplayType;
          updateMeetingDisplayType(prevMeetingDisplayType);
        }
        await onScreenChanges({ changed: true, parameters });
        if (islevel == '2') {
          await rePort({ restart: true, parameters });
        }
      } else if (data.status == 'started' && breakOutRoomStarted) {
        breakOutRoomStarted = true;
        breakOutRoomEnded = false;
        updateBreakOutRoomStarted(true);
        updateBreakOutRoomEnded(false);
        await onScreenChanges({ changed: true, parameters });
        if (islevel == '2') {
          await rePort({ restart: true, parameters });
        }
      }
    } catch (error: any) {
      // console.log('Error updating breakout room:', error.message);
    }
  };
}
