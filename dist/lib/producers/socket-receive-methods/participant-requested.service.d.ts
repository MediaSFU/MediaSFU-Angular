import { Request, WaitingRoomParticipant } from '../../@types/types';
import * as i0 from "@angular/core";
export interface ParticipantRequestedOptions {
    userRequest: Request;
    requestList: Request[];
    waitingRoomList: WaitingRoomParticipant[];
    updateTotalReqWait: (count: number) => void;
    updateRequestList: (list: Request[]) => void;
}
export type ParticipantRequestedType = (options: ParticipantRequestedOptions) => Promise<void>;
export declare class ParticipantRequested {
    /**
     * Handles a participant's request by adding it to the request list and updating the total count of requests and waiting room participants.
     *
     * @param {ParticipantRequestedOptions} options - The options for handling the participant's request.
     * @param {UserRequest} options.userRequest - The user request to be added to the request list.
     * @param {UserRequest[]} options.requestList - The current list of user requests.
     * @param {UserRequest[]} options.waitingRoomList - The current list of participants in the waiting room.
     * @param {Function} options.updateTotalReqWait - Function to update the total count of requests and waiting room participants.
     * @param {Function} options.updateRequestList - Function to update the request list.
     * @returns {Promise<void>} A promise that resolves when the participant's request has been handled.
     */
    participantRequested: ({ userRequest, requestList, waitingRoomList, updateTotalReqWait, updateRequestList, }: ParticipantRequestedOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ParticipantRequested, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ParticipantRequested>;
}
