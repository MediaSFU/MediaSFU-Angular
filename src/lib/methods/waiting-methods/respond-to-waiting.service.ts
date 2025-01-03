import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { WaitingRoomParticipant } from '../../@types/types';

export interface RespondToWaitingOptions {
  participantId: string;
  participantName: string;
  updateWaitingList: (waitingList: WaitingRoomParticipant[]) => void;
  waitingList: WaitingRoomParticipant[];
  type: string | boolean;
  roomName: string;
  socket: Socket;
}

// Export the type definition for the function
export type RespondToWaitingType = (options: RespondToWaitingOptions) => Promise<void>;

/**
 * Handles the response to a participant in the waiting room, either allowing or denying their entry.
 *
 * @param {RespondToWaitingOptions} options - Options for handling the participant's entry request.
 * @param {string} options.participantId - Unique identifier for the participant.
 * @param {string} options.participantName - Name of the participant.
 * @param {Function} options.updateWaitingList - Function to update the waiting list by removing the responded participant.
 * @param {WaitingRoomParticipant[]} options.waitingList - Current list of participants in the waiting room.
 * @param {boolean | string} options.type - Indicates whether to allow ("true") or deny ("false") the participant's entry.
 * @param {string} options.roomName - The name of the room the participant is requesting to join.
 * @param {Socket} options.socket - The socket instance used to emit the response event.
 * @returns {Promise<void>} Resolves when the response has been processed.
 *
 * @example
 * ```typescript
 * const respondService = new RespondToWaiting();
 * respondService.respondToWaiting({
 *   participantId: '12345',
 *   participantName: 'John Doe',
 *   updateWaitingList: (newList) => console.log('Updated Waiting List:', newList),
 *   waitingList: currentWaitingList,
 *   type: 'true',
 *   roomName: 'Room1',
 *   socket: io('http://localhost:3000'),
 * });
 * ```
 *
 * In this example, the participant 'John Doe' is allowed to join 'Room1', and the updated waiting list is logged.
 */


@Injectable({
  providedIn: 'root',
})
export class RespondToWaiting {
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
  async respondToWaiting({
    participantId,
    participantName,
    updateWaitingList,
    waitingList,
    type,
    roomName,
    socket,
  }: RespondToWaitingOptions): Promise<void> {
    // Filter out the participant from the waiting list
    const newWaitingList = waitingList.filter((item) => item.name !== participantName);

    // Update the waiting list
    updateWaitingList(newWaitingList);

    const responseType = type === 'true' || type === true ? 'true' : 'false';

    // Emit an event to allow or deny the participant based on the response type
    await socket.emit('allowUserIn', {
      participantId,
      participantName,
      type: responseType,
      roomName,
    });
  }
}
