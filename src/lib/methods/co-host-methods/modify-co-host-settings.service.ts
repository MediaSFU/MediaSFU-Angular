// This method is used to modify the co-host settings in the chat room.

import { Injectable } from '@angular/core';
import { ShowAlert, CoHostResponsibility } from '../../@types/types';
import { Socket } from 'socket.io-client';

export interface ModifyCoHostSettingsOptions {
  roomName: string;
  showAlert?: ShowAlert;
  selectedParticipant: string;
  coHost: string;
  coHostResponsibility: CoHostResponsibility[];
  updateIsCoHostModalVisible: (isVisible: boolean) => void;
  updateCoHostResponsibility: (coHostResponsibility: CoHostResponsibility[]) => void;
  updateCoHost: (coHost: string) => void;
  socket: Socket;
}

// Export the type definition for the function
export type ModifyCoHostSettingsType = (options: ModifyCoHostSettingsOptions) => Promise<void>;

/**
 * Modifies the co-host settings for a given room.
 *
 * This method allows you to update the co-host for a chat room, set their responsibilities,
 * and emit the relevant changes to the server. It also handles demo mode restrictions.
 *
 * @param {ModifyCoHostSettingsOptions} options - The options for modifying co-host settings.
 * @param {string} options.roomName - The name of the room.
 * @param {Function} options.showAlert - Function to show an alert message.
 * @param {string} options.selectedParticipant - The participant selected to be co-host.
 * @param {string} options.coHost - The current co-host.
 * @param {Array<CoHostResponsibility>} options.coHostResponsibility - The responsibilities assigned to the co-host.
 * @param {Function} options.updateIsCoHostModalVisible - Function to update the visibility of the co-host modal.
 * @param {Function} options.updateCoHostResponsibility - Function to update the co-host responsibility.
 * @param {Function} options.updateCoHost - Function to update the co-host.
 * @param {Socket} options.socket - The socket instance for emitting events.
 *
 * @returns {Promise<void>} A promise that resolves when the co-host settings have been modified.
 *
 * @remarks
 * - If the room is in demo mode (room name starts with "d"), co-host cannot be added and an alert is shown.
 * - If a valid participant is selected, they are set as the new co-host.
 * - The co-host responsibility is updated.
 * - A socket event is emitted to update the co-host information.
 * - The co-host modal is closed after updating the settings.
 *
 * @example
 * ```typescript
 * const options: ModifyCoHostSettingsOptions = {
 *   roomName: 'mainRoom',
 *   showAlert: (alert) => console.log(alert.message),
 *   selectedParticipant: 'JohnDoe',
 *   coHost: 'No coHost',
 *   coHostResponsibility: ['manage participants', 'start/stop recording'],
 *   updateIsCoHostModalVisible: (isVisible) => console.log('Co-host modal visible:', isVisible),
 *   updateCoHostResponsibility: (responsibility) => console.log('Updated co-host responsibility:', responsibility),
 *   updateCoHost: (coHost) => console.log('New co-host:', coHost),
 *   socket: socketInstance,
 * };
 *
 * const modifyCoHostService = new ModifyCoHostSettings();
 * await modifyCoHostService.modifyCoHostSettings(options);
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class ModifyCoHostSettings {
  /**
   * Modifies the co-host settings for a given room.
   *
   * @param {Object} options - The options for modifying co-host settings.
   * @param {string} options.roomName - The name of the room.
   * @param {Function} options.showAlert - Function to show an alert message.
   * @param {string} options.selectedParticipant - The participant selected to be co-host.
   * @param {string} options.coHost - The current co-host.
   * @param {string} options.coHostResponsibility - The responsibility assigned to the co-host.
   * @param {Function} options.updateIsCoHostModalVisible - Function to update the visibility of the co-host modal.
   * @param {Function} options.updateCoHostResponsibility - Function to update the co-host responsibility.
   * @param {Function} options.updateCoHost - Function to update the co-host.
   * @param {Object} options.socket - The socket instance for emitting events.
   * @returns {Promise<void>} A promise that resolves when the co-host settings have been modified.
   *
   * @remarks
   * - If the room is in demo mode (room name starts with "d"), co-host cannot be added and an alert is shown.
   * - If a valid participant is selected, they are set as the new co-host.
   * - The co-host responsibility is updated.
   * - A socket event is emitted to update the co-host information.
   * - The co-host modal is closed after updating the settings.
   */
  async modifyCoHostSettings({
    roomName,
    showAlert,
    selectedParticipant,
    coHost,
    coHostResponsibility,
    updateIsCoHostModalVisible,
    updateCoHostResponsibility,
    updateCoHost,
    socket,
  }: ModifyCoHostSettingsOptions): Promise<void> {
    // Check if the chat room is in demo mode
    if (roomName.toLowerCase().startsWith('d')) {
      showAlert?.({
        message: 'You cannot add co-host in demo mode.',
        type: 'danger',
        duration: 3000,
      });

      return;
    }

    let newCoHost = coHost;

    if (
      coHost != 'No coHost' ||
      (selectedParticipant && selectedParticipant != 'Select a participant')
    ) {
      if (selectedParticipant && selectedParticipant != 'Select a participant') {
        newCoHost = selectedParticipant;
        updateCoHost(newCoHost);
      }

      updateCoHostResponsibility(coHostResponsibility);

      // Emit a socket event to update co-host information
      socket.emit('updateCoHost', { roomName, coHost: newCoHost, coHostResponsibility });
    }

    // Close the co-host modal
    updateIsCoHostModalVisible(false);
  }
}
