import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { ShowAlert } from '../../@types/types';

export interface HandleEndPollOptions {
  pollId: string;
  socket: Socket;
  showAlert?: ShowAlert;
  roomName: string;
  updateIsPollModalVisible: (visible: boolean) => void;
}

// Export the type definition for the function
export type HandleEndPollType = (options: HandleEndPollOptions) => Promise<void>;

/**
 * Handles the end of a poll by emitting an "endPoll" event through the provided socket.
 * Displays an alert based on the success or failure of the operation.
 *
 * @param {HandleEndPollOptions} options - The options for ending the poll.
 * @param {string} options.pollId - The ID of the poll to end.
 * @param {Socket} options.socket - The socket instance to emit the event.
 * @param {Function} [options.showAlert] - Optional function to display alerts.
 * @param {string} options.roomName - The name of the room where the poll is being conducted.
 * @param {Function} options.updateIsPollModalVisible - Function to update the visibility of the poll modal.
 *
 * @returns {Promise<void>} A promise that resolves when the poll end operation is complete.
 *
 * @throws Will log an error if the operation fails to emit the end poll event.
 *
 * @example
 * ```typescript
 * const handleEndPollService = new HandleEndPoll();
 * const pollId = '12345';
 * await handleEndPollService.handleEndPoll({
 *   pollId: pollId,
 *   socket: socketInstance,
 *   roomName: 'room1',
 *   showAlert: ({ message, type }) => {
 *     console.log(`Alert: ${message} - Type: ${type}`);
 *   },
 *   updateIsPollModalVisible: (isVisible) => {
 *     console.log('Poll modal visibility:', isVisible);
 *   },
 * });
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class HandleEndPoll {
  /**
   * Handles the end of a poll by emitting an "endPoll" event through the provided socket.
   * Displays an alert based on the success or failure of the operation.
   *
   * @param {Object} options - The options for ending the poll.
   * @param {string} options.pollId - The ID of the poll to end.
   * @param {Socket} options.socket - The socket instance to emit the event.
   * @param {Function} [options.showAlert] - Optional function to display alerts.
   * @param {string} options.roomName - The name of the room where the poll is being conducted.
   * @returns {Promise<void>} A promise that resolves when the poll end operation is complete.
   */

  async handleEndPoll({
    pollId,
    socket,
    showAlert,
    roomName,
    updateIsPollModalVisible,
  }: HandleEndPollOptions): Promise<void> {
    try {
      socket.emit(
        'endPoll',
        { roomName, poll_id: pollId },
        (response: { success: boolean; reason?: string }) => {
          if (response.success) {
            showAlert?.({ message: 'Poll ended successfully', type: 'success' });
            updateIsPollModalVisible(false);
          } else {
            showAlert?.({ message: response.reason || 'Failed to end poll', type: 'danger' });
          }
        },
      );
    } catch (error) {
      console.log(error);
    }
  }
}
