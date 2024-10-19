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
