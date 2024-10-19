import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';

export interface ReInitiateRecordingOptions {
  roomName: string;
  member: string;
  socket: Socket;
  adminRestrictSetting: boolean;
}

// Export the type definition for the function
export type ReInitiateRecordingType = (options: ReInitiateRecordingOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ReInitiateRecording {
  /**
   * Re-initiates recording based on specific conditions.
   * @async
   * @function
   * @param {ReInitiateRecordingOptions} options - The options for re-initiating recording.
   * @param {string} options.roomName - The name of the room to re-initiate recording.
   * @param {string} options.member - The member re-initiating the recording.
   * @param {Socket} options.socket - The socket instance for communication.
   * @param {boolean} options.adminRestrictSetting - Indicates whether the admin restrict setting is enabled.
   * @returns {Promise<void>} A promise that resolves when the recording is re-initiated.
   */

  reInitiateRecording = async ({
    roomName,
    member,
    socket,
    adminRestrictSetting,
  }: ReInitiateRecordingOptions): Promise<void> => {
    if (!adminRestrictSetting) {
      await new Promise<void>((resolve, reject) => {
        socket.emit('startRecordIng', { roomName, member }, ({ success }: { success: boolean }) => {
          if (success) {
            resolve();
          } else {
            reject(new Error('Failed to re-initiate recording.'));
          }
        });
      });
    }
  };
}
