import { BreakoutParticipant, BreakoutRoomUpdatedData, OnScreenChangesParameters, OnScreenChangesType, Participant, RePortParameters, RePortType } from '../../@types/types';
import * as i0 from "@angular/core";
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
    onScreenChanges: OnScreenChangesType;
    rePort: RePortType;
    getUpdatedAllParams: () => BreakoutRoomUpdatedParameters;
    [key: string]: any;
}
export interface BreakoutRoomUpdatedOptions {
    data: BreakoutRoomUpdatedData;
    parameters: BreakoutRoomUpdatedParameters;
}
export type BreakoutRoomUpdatedType = (options: BreakoutRoomUpdatedOptions) => Promise<void>;
export declare class BreakoutRoomUpdated {
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
    breakoutRoomUpdated: ({ data, parameters }: BreakoutRoomUpdatedOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<BreakoutRoomUpdated, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BreakoutRoomUpdated>;
}
