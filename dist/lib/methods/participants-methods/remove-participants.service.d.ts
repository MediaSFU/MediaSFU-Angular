import { Socket } from 'socket.io-client';
import { CoHostResponsibility, Participant, ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface RemoveParticipantsOptions {
    coHostResponsibility: CoHostResponsibility[];
    participant: Participant;
    member: string;
    islevel: string;
    showAlert?: ShowAlert;
    coHost: string;
    participants: Participant[];
    socket: Socket;
    roomName: string;
    updateParticipants: (participants: Participant[]) => void;
}
export type RemoveParticipantsType = (options: RemoveParticipantsOptions) => Promise<void>;
/**
 * Removes a participant from the room if the user has the appropriate permissions.
 *
 * This method checks the current user's level and their co-host responsibilities
 * to determine if they are allowed to remove a specified participant. If allowed,
 * the method emits a socket event to disconnect the participant and updates
 * the local list of participants. If not allowed, an alert is displayed.
 *
 * @param {RemoveParticipantsOptions} options - The options for removing a participant.
 * @param {CoHostResponsibility[]} options.coHostResponsibility - The responsibilities of the co-host.
 * @param {Participant} options.participant - The participant to be removed.
 * @param {string} options.member - The current member attempting to remove the participant.
 * @param {string} options.islevel - The level of the current member.
 * @param {Function} [options.showAlert] - Optional function to show alert messages.
 * @param {string} options.coHost - The co-host information.
 * @param {Participant[]} options.participants - The list of current participants.
 * @param {Socket} options.socket - The socket instance for emitting events.
 * @param {string} options.roomName - The name of the room.
 * @param {Function} options.updateParticipants - Function to update the participants list.
 *
 * @returns {Promise<void>} A promise that resolves when the participant is removed.
 *
 * @throws Will log an error if there is an issue accessing co-host responsibilities.
 *
 * @example
 * ```typescript
 * const removeParticipantsService = new RemoveParticipants();
 * await removeParticipantsService.removeParticipants({
 *   coHostResponsibility: [{ name: 'participants', value: true }],
 *   participant: { id: '123', name: 'John', islevel: '1' },
 *   member: 'Alice',
 *   islevel: '1',
 *   showAlert: ({ message, type }) => {
 *     console.log(`Alert: ${message} - Type: ${type}`);
 *   },
 *   coHost: 'Bob',
 *   participants: [{ id: '123', name: 'John', islevel: '1' }],
 *   socket: socketInstance,
 *   roomName: 'room1',
 *   updateParticipants: (updatedList) => {
 *     console.log('Updated participants:', updatedList);
 *   },
 * });
 * ```
 */
export declare class RemoveParticipants {
    /**
     * Removes a participant from the room if the user has the appropriate permissions.
     *
     * @param {RemoveParticipantsOptions} options - The options for removing a participant.
     * @param {Array} options.coHostResponsibility - The responsibilities of the co-host.
     * @param {Object} options.participant - The participant to be removed.
     * @param {Object} options.member - The current member attempting to remove the participant.
     * @param {string} options.islevel - The level of the current member.
     * @param {Function} [options.showAlert] - Function to show an alert message.
     * @param {Object} options.coHost - The co-host information.
     * @param {Array} options.participants - The list of current participants.
     * @param {Object} options.socket - The socket instance for emitting events.
     * @param {string} options.roomName - The name of the room.
     * @param {Function} options.updateParticipants - Function to update the participants list.
     *
     * @returns {Promise<void>} - A promise that resolves when the participant is removed.
     */
    removeParticipants({ coHostResponsibility, participant, member, islevel, showAlert, coHost, participants, socket, roomName, updateParticipants, }: RemoveParticipantsOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RemoveParticipants, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RemoveParticipants>;
}
