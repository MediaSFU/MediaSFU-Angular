import { Socket } from 'socket.io-client';
import { Participant, CoHostResponsibility, ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface MuteParticipantsOptions {
    socket: Socket;
    coHostResponsibility: CoHostResponsibility[];
    participant: Participant;
    member: string;
    islevel: string;
    showAlert?: ShowAlert;
    coHost: string;
    roomName: string;
}
export type MuteParticipantsType = (options: MuteParticipantsOptions) => Promise<void>;
/**
 * Mutes a participant in a media session if certain conditions are met.
 *
 * This method checks the current user's level and their co-host responsibilities
 * to determine if they are allowed to mute a specified participant. If allowed,
 * the method emits a socket event to mute the participant. If not allowed, an alert
 * is displayed.
 *
 * @param {MuteParticipantsOptions} options - The options for muting participants.
 * @param {Socket} options.socket - The socket instance for communication.
 * @param {CoHostResponsibility[]} options.coHostResponsibility - List of co-host responsibilities.
 * @param {Participant} options.participant - The participant to be muted.
 * @param {string} options.member - The current member attempting to mute.
 * @param {string} options.islevel - The level of the current member.
 * @param {Function} [options.showAlert] - Optional function to show alerts.
 * @param {string} options.coHost - The co-host information.
 * @param {string} options.roomName - The name of the room.
 *
 * @returns {Promise<void>} A promise that resolves when the participant is muted.
 *
 * @throws Will log an error if there is an issue accessing co-host responsibilities.
 *
 * @example
 * ```typescript
 * const muteService = new MuteParticipants();
 * muteService.muteParticipants({
 *   socket: socketInstance,
 *   coHostResponsibility: [{ name: 'media', value: true }],
 *   participant: { id: '123', name: 'John', islevel: '1', muted: false },
 *   member: 'Alice',
 *   islevel: '1',
 *   showAlert: ({ message, type }) => {
 *     console.log(`Alert: ${message} - Type: ${type}`);
 *   },
 *   coHost: 'Bob',
 *   roomName: 'room1',
 * });
 * ```
 */
export declare class MuteParticipants {
    /**
     * Mutes a participant in a media session if certain conditions are met.
     *
     * @param {Object} options - The options for muting participants.
     * @param {Socket} options.socket - The socket instance for communication.
     * @param {Array} options.coHostResponsibility - List of co-host responsibilities.
     * @param {Object} options.participant - The participant to be muted.
     * @param {Object} options.member - The current member attempting to mute.
     * @param {string} options.islevel - The level of the current member.
     * @param {Function} [options.showAlert] - Optional function to show alerts.
     * @param {Object} options.coHost - The co-host information.
     * @param {string} options.roomName - The name of the room.
     *
     * @returns {Promise<void>} A promise that resolves when the participant is muted.
     *
     * @throws Will log an error if there is an issue accessing co-host responsibilities.
     */
    muteParticipants({ socket, coHostResponsibility, participant, member, islevel, showAlert, coHost, roomName, }: MuteParticipantsOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<MuteParticipants, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MuteParticipants>;
}
