import { Injectable } from '@angular/core';

import { Socket } from 'socket.io-client';
import { CoHostResponsibility, Participant, ShowAlert } from '../@types/types';

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
// Export the type definition for the function
export type ControlMediaType = (options: ControlMediaOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ControlMedia {
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

  async controlMedia({
    participantId,
    participantName,
    type,
    socket,
    coHostResponsibility,
    participants,
    member,
    islevel,
    showAlert,
    coHost,
    roomName,
  }: ControlMediaOptions): Promise<void> {
    try {
      // Destructure parameters
      let mediaValue = false;

      try {
        mediaValue =
          coHostResponsibility.find((item: any) => item.name === 'media')?.value ?? false;
      } catch {
        /* handle error */
      }

      let participant = participants.find((obj: any) => obj.name === participantName);

      if (islevel === '2' || (coHost === member && mediaValue === true)) {
        // Check if the participant is not muted and is not a host
        if (
          participant &&
          ((!participant.muted && participant.islevel !== '2' && type == 'audio') ||
            (participant.islevel !== '2' && type == 'video' && participant['videoOn']))
        ) {
          // Emit controlMedia event to the server
          socket.emit('controlMedia', { participantId, participantName, type, roomName });
        }
      } else {
        // Display an alert if the participant is not allowed to mute other participants
        if (showAlert) {
          showAlert({
            message: 'You are not allowed to control media for other participants.',
            type: 'danger',
            duration: 3000,
          });
        }
      }
    } catch (error) {
      console.log('controlMedia error', error);
      // throw error;
    }
  }
}
