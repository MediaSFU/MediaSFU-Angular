import { Injectable } from '@angular/core';
import { Poll, ShowAlert } from '../../@types/types';
import { Socket } from 'socket.io-client';
export interface HandleCreatePollOptions {
  poll: Poll;
  socket: Socket;
  roomName: string;
  showAlert?: ShowAlert;
  updateIsPollModalVisible: (visible: boolean) => void;
}

// Export the type definition for the function
export type HandleCreatePollType = (options: HandleCreatePollOptions) => Promise<void>;

/**
 * Handles the creation of a poll.
 *
 * This method sends a request to create a poll in the specified room via a socket event.
 * It also handles the response from the server to notify the user whether the poll was
 * created successfully or if there was an error.
 *
 * @param {HandleCreatePollOptions} options - The options for creating the poll.
 * @param {Poll} options.poll - The poll object containing the poll details.
 * @param {Socket} options.socket - The socket instance for emitting events.
 * @param {string} options.roomName - The name of the room where the poll will be created.
 * @param {Function} [options.showAlert] - Optional function to show alert messages.
 * @param {Function} options.updateIsPollModalVisible - Function to update the visibility of the poll modal.
 *
 * @returns {Promise<void>} A promise that resolves when the poll is created successfully.
 *
 * @throws Will handle any errors during the poll creation process silently.
 *
 * @example
 * ```typescript
 * const handleCreatePollService = new HandleCreatePoll();
 * const pollData = {
 *   question: 'What is your favorite color?',
 *   options: ['Red', 'Blue', 'Green'],
 * };
 * await handleCreatePollService.handleCreatePoll({
 *   poll: pollData,
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
export class HandleCreatePoll {
  /**
   * Handles the creation of a poll.
   *
   * @param {Object} options - The options for creating the poll.
   * @param {Poll} options.poll - The poll object containing the poll details.
   * @param {Object} options.parameters - Additional parameters for creating the poll.
   * @returns {Promise<void>} - A promise that resolves when the poll is created successfully.
   */

  async handleCreatePoll({
    poll,
    socket,
    roomName,
    showAlert,
    updateIsPollModalVisible,
  }: HandleCreatePollOptions): Promise<void> {
    try {
      socket.emit(
        'createPoll',
        { roomName, poll },
        (response: { success: boolean; reason?: string }) => {
          if (response.success) {
            showAlert?.({ message: 'Poll created successfully', type: 'success' });
            updateIsPollModalVisible(false);
          } else {
            showAlert?.({ message: response.reason || 'Failed to create poll', type: 'danger' });
          }
        },
      );
    } catch {
      /* handle error */
    }
  }
}
