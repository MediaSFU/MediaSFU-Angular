import { Socket } from 'socket.io-client';
import { CoHostResponsibility, ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface SendMessageOptions {
    member: string;
    islevel: string;
    showAlert?: ShowAlert;
    coHostResponsibility: CoHostResponsibility[];
    coHost: string;
    chatSetting: string;
    message: string;
    roomName: string;
    messagesLength: number;
    receivers: string[];
    group: boolean;
    sender: string;
    socket: Socket;
}
export type SendMessageType = (options: SendMessageOptions) => Promise<void>;
/**
 * Sends a message to the specified room.
 *
 * This method validates the message and its recipients, checks user permissions,
 * and then emits the message to the server via a socket connection. It also
 * handles alerting the user for any errors encountered during the process,
 * such as exceeding message limits or invalid input.
 *
 * @param {SendMessageOptions} options - The options for sending the message.
 * @param {string} options.member - The member sending the message.
 * @param {string} options.islevel - The level of the member.
 * @param {Function} options.showAlert - Function to show alert messages.
 * @param {Array} options.coHostResponsibility - List of co-host responsibilities.
 * @param {string} options.coHost - The co-host of the room.
 * @param {string} options.chatSetting - Chat setting for the room.
 * @param {string} options.message - The message to be sent.
 * @param {string} options.roomName - The name of the room.
 * @param {number} options.messagesLength - The current number of messages in the room.
 * @param {Array} options.receivers - List of receivers for the message.
 * @param {boolean} options.group - Indicates if the message is for a group.
 * @param {string} options.sender - The sender of the message.
 * @param {Object} options.socket - The socket instance for emitting events.
 *
 * @returns {Promise<void>} A promise that resolves when the message is sent.
 *
 * @throws Will throw an error if the message count limit is exceeded.
 * @throws Will throw an error if the message, sender, or receivers are not valid.
 * @throws Will throw an error if the user is not allowed to send a message in the event room.
 *
 * @example
 * ```typescript
 * const sendMessageService = new SendMessage();
 * await sendMessageService.sendMessage({
 *   member: 'JohnDoe',
 *   islevel: '1',
 *   showAlert: (alert) => console.log(alert.message),
 *   coHostResponsibility: [],
 *   coHost: 'JaneDoe',
 *   chatSetting: 'allowed',
 *   message: 'Hello everyone!',
 *   roomName: 'Room1',
 *   messagesLength: 50,
 *   receivers: ['user1', 'user2'],
 *   group: true,
 *   sender: 'JohnDoe',
 *   socket: socketInstance,
 * });
 * ```
 */
export declare class SendMessage {
    /**
     * Sends a message to the specified room.
     *
     * @param {Object} options - The options for sending the message.
     * @param {string} options.member - The member sending the message.
     * @param {string} options.islevel - The level of the member.
     * @param {Function} options.showAlert - Function to show alert messages.
     * @param {Array} options.coHostResponsibility - List of co-host responsibilities.
     * @param {string} options.coHost - The co-host of the room.
     * @param {boolean} options.chatSetting - Chat setting for the room.
     * @param {string} options.message - The message to be sent.
     * @param {string} options.roomName - The name of the room.
     * @param {number} options.messagesLength - The current number of messages in the room.
     * @param {Array} options.receivers - List of receivers for the message.
     * @param {boolean} options.group - Indicates if the message is for a group.
     * @param {string} options.sender - The sender of the message.
     * @param {Object} options.socket - The socket instance for communication.
     *
     * @returns {Promise<void>} A promise that resolves when the message is sent.
     *
     * @throws Will throw an error if the message count limit is exceeded.
     * @throws Will throw an error if the message, sender, or receivers are not valid.
     * @throws Will throw an error if the user is not allowed to send a message in the event room.
     */
    sendMessage({ member, islevel, showAlert, coHostResponsibility, coHost, chatSetting, message, roomName, messagesLength, receivers, group, sender, socket, }: SendMessageOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SendMessage, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SendMessage>;
}
