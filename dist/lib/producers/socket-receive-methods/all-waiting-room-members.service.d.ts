import { WaitingRoomParticipant } from '../../@types/types';
import * as i0 from "@angular/core";
export interface AllWaitingRoomMembersOptions {
    waitingParticipants: WaitingRoomParticipant[];
    updateWaitingRoomList: (participants: WaitingRoomParticipant[]) => void;
    updateTotalReqWait: (totalReqs: number) => void;
}
export type AllWaitingRoomMembersType = (options: AllWaitingRoomMembersOptions) => Promise<void>;
export declare class AllWaitingRoomMembers {
    /**
     * Updates the waiting room participants list and the total count of waiting room participants.
     *
     * @param {Object} options - The options object.
     * @param {Array} options.waitingParticipants - An array of participants currently in the waiting room.
     * @param {Function} options.updateWaitingRoomList - A function to update the waiting room participants list.
     * @param {Function} options.updateTotalReqWait - A function to update the total count of waiting room participants.
     * @returns {Promise<void>} A promise that resolves when the updates are complete.
     */
    allWaitingRoomMembers: ({ waitingParticipants, updateWaitingRoomList, updateTotalReqWait, }: AllWaitingRoomMembersOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AllWaitingRoomMembers, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AllWaitingRoomMembers>;
}
