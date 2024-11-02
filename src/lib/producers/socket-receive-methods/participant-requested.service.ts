import { Injectable } from '@angular/core';
import { Request, WaitingRoomParticipant } from '../../@types/types';
export interface ParticipantRequestedOptions {
  userRequest: Request;

  requestList: Request[];
  waitingRoomList: WaitingRoomParticipant[];
  updateTotalReqWait: (count: number) => void;
  updateRequestList: (list: Request[]) => void;
}

// Export the type definition for the function
export type ParticipantRequestedType = (options: ParticipantRequestedOptions) => Promise<void>;

/**
 * Service to handle participant requests in an event's waiting room.
 *
 * @class
 * @name ParticipantRequested
 * @description
 * Manages participant requests by adding new requests to the list and updating the total count of requests and waiting room participants.
 *
 * @method
 * participantRequested
 *
 * @param {ParticipantRequestedOptions} options - Contains request information and update functions:
 *   - `userRequest` {Request}: The new request from a participant.
 *   - `requestList` {Request[]}: The current list of requests.
 *   - `waitingRoomList` {WaitingRoomParticipant[]}: The list of participants in the waiting room.
 *   - `updateTotalReqWait` {Function}: Function to update the total count of requests and waiting room participants.
 *   - `updateRequestList` {Function}: Function to update the request list.
 *
 * @returns {Promise<void>} Updates the request list and total request count.
 *
 * @example
 * const options = {
 *   userRequest: { id: '123', name: 'John Doe', icon: 'fa-user', username: 'johndoe' },
 *   requestList: existingRequests,
 *   waitingRoomList: waitingParticipants,
 *   updateTotalReqWait: (count) => console.log(`Total requests: ${count}`),
 *   updateRequestList: (list) => console.log('Updated request list', list)
 * };
 * await participantRequestedService.participantRequested(options);
 * // Adds "John Doe" to request list and updates the total count.
 */


@Injectable({
  providedIn: 'root',
})
export class ParticipantRequested {
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
  participantRequested = async ({
    userRequest,
    requestList,
    waitingRoomList,
    updateTotalReqWait,
    updateRequestList,
  }: ParticipantRequestedOptions): Promise<void> => {
    // Add the user request to the request list
    const updatedRequestList = [...requestList, userRequest];
    updateRequestList(updatedRequestList);

    // Update the total count of requests and waiting room participants
    const reqCount = updatedRequestList.length + waitingRoomList.length;
    updateTotalReqWait(reqCount);
  };
}
