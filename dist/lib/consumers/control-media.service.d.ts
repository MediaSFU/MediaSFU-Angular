import { Socket } from 'socket.io-client';
import { CoHostResponsibility, Participant, ShowAlert } from '../@types/types';
import * as i0 from "@angular/core";
export interface ControlMediaOptions {
    participantId: string;
    participantName: string;
    type: 'audio' | 'video' | 'screenshare' | 'all';
    socket: Socket;
    coHostResponsibility: CoHostResponsibility[];
    participants: Participant[];
    member: string;
    islevel: string;
    showAlert?: ShowAlert;
    coHost: string;
    roomName: string;
}
export type ControlMediaType = (options: ControlMediaOptions) => Promise<void>;
/**
 * Controls the media of a participant in a media session if certain conditions are met.
 *
 * @param {ControlMediaOptions} options - The options for controlling media.
 * @param {string} options.participantId - The ID of the participant to control.
 * @param {string} options.participantName - The name of the participant to control.
 * @param {'audio' | 'video' | 'screenshare' | 'all'} options.type - The type of media to control.
 * @param {Socket} options.socket - The socket instance for communication.
 * @param {CoHostResponsibility[]} options.coHostResponsibility - List of co-host responsibilities.
 * @param {Participant[]} options.participants - List of participants in the session.
 * @param {string} options.member - The current member attempting to control media.
 * @param {string} options.islevel - The level of the current member.
 * @param {Function} [options.showAlert] - Optional function to show alerts.
 * @param {string} options.coHost - The co-host information.
 * @param {string} options.roomName - The name of the room.
 *
 * @returns {Promise<void>} A promise that resolves when the media control operation is complete.
 *
 * @throws Will log an error message if the operation fails.
 *
 * @example
 * ```typescript
 * const options = {
 *   participantId: '12345',
 *   participantName: 'John Doe',
 *   type: 'audio',
 *   socket: socketInstance,
 *   coHostResponsibility: [{ name: 'media', value: true }],
 *   participants: participantList,
 *   member: 'currentMember',
 *   islevel: '2',
 *   showAlert: showAlertFunction,
 *   coHost: 'coHostName',
 *   roomName: 'Room A',
 * };
 *
 * controlMediaService.controlMedia(options)
 *   .then(() => {
 *     console.log('Media control action completed');
 *   })
 *   .catch((error) => {
 *     console.error('Error controlling media:', error);
 *   });
 * ```
 */
export declare class ControlMedia {
    /**
     * Controls the media of a participant in a media session if certain conditions are met.
     *
     * @param {Object} options - The options for controlling media.
     * @param {string} options.participantId - The ID of the participant to control.
     * @param {string} options.participantName - The name of the participant to control.
     * @param {string} options.type - The type of media to control.
     * @param {Socket} options.socket - The socket instance for communication.
     * @param {Array} options.coHostResponsibility - List of co-host responsibilities.
     * @param {Array} options.participants - List of participants in the session.
     * @param {string} options.member - The current member attempting to control media.
     * @param {string} options.islevel - The level of the current member.
     * @param {Function} [options.showAlert] - Optional function to show alerts.
     * @param {string} options.coHost - The co-host information.
     * @param {string} options.roomName - The name of the room.
     *
     * @returns {Promise<void>} A promise that resolves when the media control operation is complete.
     */
    controlMedia({ participantId, participantName, type, socket, coHostResponsibility, participants, member, islevel, showAlert, coHost, roomName, }: ControlMediaOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlMedia, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ControlMedia>;
}
