import { Injectable } from '@angular/core';
import { Participant, CoHostResponsibility, ShowAlert } from '../../@types/types';
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

// Export the type definition for the function
export type MessageParticipantsType = (options: MessageParticipantsOptions) => void;

@Injectable({
  providedIn: 'root',
})
export class MessageParticipants {
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
  messageParticipants({
    coHostResponsibility,
    participant,
    member,
    islevel,
    showAlert,
    coHost,
    updateIsMessagesModalVisible,
    updateDirectMessageDetails,
    updateStartDirectMessage,
  }: MessageParticipantsOptions): void {
    let chatValue = false;

    try {
      chatValue = coHostResponsibility.find((item) => item.name === 'chat')?.value ?? false;
    } catch (error) {
      console.error(error);
    }

    if (islevel === '2' || (coHost === member && chatValue === true)) {
      if (participant.islevel !== '2') {
        updateDirectMessageDetails(participant);
        updateStartDirectMessage(true);
        updateIsMessagesModalVisible(true);
      }
    } else {
      showAlert?.({
        message: 'You are not allowed to send this message',
        type: 'danger',
        duration: 3000,
      });

      return;
    }
  }
}
