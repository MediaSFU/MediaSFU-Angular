import { Socket } from 'socket.io-client';
import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface HandleEndPollOptions {
    pollId: string;
    socket: Socket;
    showAlert?: ShowAlert;
    roomName: string;
    updateIsPollModalVisible: (visible: boolean) => void;
}
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
export declare class HandleEndPoll {
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
    handleEndPoll({ pollId, socket, showAlert, roomName, updateIsPollModalVisible, }: HandleEndPollOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HandleEndPoll, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HandleEndPoll>;
}
