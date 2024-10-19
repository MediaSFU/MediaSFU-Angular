import { Socket } from 'socket.io-client';
import { WaitingRoomParticipant } from '../../@types/types';
import * as i0 from "@angular/core";
export interface RespondToWaitingOptions {
    participantId: string;
    participantName: string;
    updateWaitingList: (waitingList: WaitingRoomParticipant[]) => void;
    waitingList: WaitingRoomParticipant[];
    type: string | boolean;
    roomName: string;
    socket: Socket;
}
export type RespondToWaitingType = (options: RespondToWaitingOptions) => Promise<void>;
export declare class RespondToWaiting {
    /**
     * Responds to a participant waiting to join a room by either allowing or denying their entry.
     *
     * @param {Object} options - The options for responding to the waiting participant.
     * @param {string} options.participantId - The ID of the participant.
     * @param {string} options.participantName - The name of the participant.
     * @param {Function} options.updateWaitingList - The function to update the waiting list.
     * @param {Array} options.waitingList - The current waiting list of participants.
     * @param {boolean | string} options.type - The type of response, either "true" or "false".
     * @param {string} options.roomName - The name of the room.
     * @param {Object} options.socket - The socket instance to emit events.
     * @returns {Promise<void>} - A promise that resolves when the response has been processed.
     */
    respondToWaiting({ participantId, participantName, updateWaitingList, waitingList, type, roomName, socket, }: RespondToWaitingOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RespondToWaiting, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RespondToWaiting>;
}
