import { Socket } from 'socket.io-client';
import { Message } from '../@types/types';
import * as i0 from "@angular/core";
export interface ReceiveRoomMessagesOptions {
    socket: Socket;
    roomName: string;
    updateMessages: (messages: Message[]) => void;
}
export type ReceiveRoomMessagesType = (options: ReceiveRoomMessagesOptions) => Promise<void>;
/**
 * Asynchronously retrieves and updates messages for a specified room from the server.
 *
 * This method communicates with the server to request messages for a specific room and updates the messages array accordingly.
 *
 * @param {ReceiveRoomMessagesOptions} options - The function parameters.
 * @param {Socket} options.socket - The socket instance used for communication.
 * @param {string} options.roomName - The name of the room to retrieve messages for.
 * @param {function} options.updateMessages - Function to update the messages array with the retrieved messages.
 *
 * @returns {Promise<void>} A promise that resolves when the messages have been successfully retrieved and updated.
 *
 * @throws Will log an error message if an error occurs during the process of retrieving messages.
 *
 * @example
 * ```typescript
 * const options = {
 *   socket: socketInstance,
 *   roomName: 'Room1',
 *   updateMessages: (messages) => {
 *     // Logic to update messages
 *   },
 * };
 *
 * await receiveRoomMessages(options);
 * ```
 */
export declare class ReceiveRoomMessages {
    /**
     * Asynchronously retrieves and updates messages for a specified room from the server.
     *
     * @param {object} options - The function parameters.
     * @param {object} options.parameters - Additional parameters needed for the function.
     * @param {string} options.parameters.roomName - The name of the room to retrieve messages for.
     * @param {function} options.parameters.updateMessages - Function to update the messages array.
     */
    receiveRoomMessages({ socket, roomName, updateMessages, }: ReceiveRoomMessagesOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReceiveRoomMessages, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReceiveRoomMessages>;
}
