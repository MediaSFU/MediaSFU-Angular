import { Injectable } from '@angular/core';
import { WaitingRoomParticipant } from '../../@types/types';
export interface AllWaitingRoomMembersOptions {
  waitingParticipants: WaitingRoomParticipant[];
  updateWaitingRoomList: (participants: WaitingRoomParticipant[]) => void;
  updateTotalReqWait: (totalReqs: number) => void;
}

// Export the type definition for the function
export type AllWaitingRoomMembersType = (options: AllWaitingRoomMembersOptions) => Promise<void>;

/**
 * Service to handle updating the list and count of waiting room participants.
 *
 * @class
 * @name AllWaitingRoomMembers
 * @description This service updates the waiting room participants list and the total count of participants waiting to join.
 *
 * @method
 * @async
 * @name allWaitingRoomMembers
 * @param {AllWaitingRoomMembersOptions} options - The options for updating the waiting room data.
 * @param {WaitingRoomParticipant[]} options.waitingParticipants - An array of participants currently in the waiting room.
 * @param {Function} options.updateWaitingRoomList - Function to update the waiting room participants list.
 * @param {Function} options.updateTotalReqWait - Function to update the total count of waiting room participants.
 *
 * @returns {Promise<void>} A promise that resolves when the updates to the waiting room data are complete.
 *
 * @example
 * ```typescript
 * const allWaitingRoomMembersService = new AllWaitingRoomMembers();
 * await allWaitingRoomMembersService.allWaitingRoomMembers({
 *   waitingParticipants: [{ name: 'John Doe', isApproved: false }],
 *   updateWaitingRoomList: (participants) => console.log(participants),
 *   updateTotalReqWait: (total) => console.log(`Total requests: ${total}`)
 * });
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class AllWaitingRoomMembers {
  /**
   * Updates the waiting room participants list and the total count of waiting room participants.
   *
   * @param {Object} options - The options object.
   * @param {Array} options.waitingParticipants - An array of participants currently in the waiting room.
   * @param {Function} options.updateWaitingRoomList - A function to update the waiting room participants list.
   * @param {Function} options.updateTotalReqWait - A function to update the total count of waiting room participants.
   * @returns {Promise<void>} A promise that resolves when the updates are complete.
   */
  allWaitingRoomMembers = async ({
    waitingParticipants,
    updateWaitingRoomList,
    updateTotalReqWait,
  }: AllWaitingRoomMembersOptions): Promise<void> => {
    // Calculate the total number of waiting room participants
    const totalReqs = waitingParticipants.length;

    // Update the waiting room participants list
    updateWaitingRoomList(waitingParticipants);

    // Update the total count of waiting room participants
    updateTotalReqWait(totalReqs);
  };
}
