import { Participant, CoHostResponsibility, ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface MessageParticipantsOptions {
    coHostResponsibility: CoHostResponsibility[];
    participant: Participant;
    member: string;
    islevel: string;
    showAlert?: ShowAlert;
    coHost: string;
    updateIsMessagesModalVisible: (isVisible: boolean) => void;
    updateDirectMessageDetails: (participant: Participant | null) => void;
    updateStartDirectMessage: (start: boolean) => void;
}
export type MessageParticipantsType = (options: MessageParticipantsOptions) => void;
/**
 * Sends a direct message to a participant if certain conditions are met.
 *
 * This method checks the current user's level and their co-host responsibilities
 * to determine if they are allowed to send a direct message to a specified participant.
 * If the user has the appropriate permissions, the method updates the direct message
 * details and opens the messages modal. If the user is not allowed to send the message,
 * an alert is displayed.
 *
 * @param {MessageParticipantsOptions} options - The options for sending a message to a participant.
 * @param {CoHostResponsibility[]} options.coHostResponsibility - Array of responsibilities assigned to the co-host.
 * @param {Participant} options.participant - The participant to whom the message is to be sent.
 * @param {string} options.member - The current member attempting to send the message.
 * @param {string} options.islevel - The level of the current member.
 * @param {Function} [options.showAlert] - Function to show an alert message if the message cannot be sent.
 * @param {string} options.coHost - The co-host member.
 * @param {Function} options.updateIsMessagesModalVisible - Function to update the visibility of the messages modal.
 * @param {Function} options.updateDirectMessageDetails - Function to update the details of the direct message.
 * @param {Function} options.updateStartDirectMessage - Function to start the direct message.
 *
 * @returns {void}
 *
 * @example
 * ```typescript
 * const messageService = new MessageParticipants();
 * messageService.messageParticipants({
 *   coHostResponsibility: [{ name: 'chat', value: true }],
 *   participant: { name: 'John', islevel: '1' },
 *   member: 'Alice',
 *   islevel: '1',
 *   showAlert: ({ message, type, duration }) => {
 *     console.log(`Alert: ${message} - Type: ${type} - Duration: ${duration}`);
 *   },
 *   coHost: 'Bob',
 *   updateIsMessagesModalVisible: (isVisible) => {
 *     console.log(`Messages modal is now ${isVisible ? 'visible' : 'hidden'}`);
 *   },
 *   updateDirectMessageDetails: (participant) => {
 *     console.log(`Direct messaging: ${participant.name}`);
 *   },
 *   updateStartDirectMessage: (start) => {
 *     console.log(`Direct messaging started: ${start}`);
 *   },
 * });
 * ```
 */
export declare class MessageParticipants {
    /**
     * Sends a direct message to a participant if certain conditions are met.
     *s
     * @param coHostResponsibility - Array of responsibilities assigned to the co-host.
     * @param participant - The participant to whom the message is to be sent.
     * @param member - The current member attempting to send the message.
     * @param islevel - The level of the current member.
     * @param showAlert - Function to show an alert message.
     * @param coHost - The co-host member.
     * @param updateIsMessagesModalVisible - Function to update the visibility of the messages modal.
     * @param updateDirectMessageDetails - Function to update the details of the direct message.
     * @param updateStartDirectMessage - Function to start the direct message.
     *
     * @returns void
     */
    messageParticipants({ coHostResponsibility, participant, member, islevel, showAlert, coHost, updateIsMessagesModalVisible, updateDirectMessageDetails, updateStartDirectMessage, }: MessageParticipantsOptions): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessageParticipants, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<MessageParticipants>;
}
