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
