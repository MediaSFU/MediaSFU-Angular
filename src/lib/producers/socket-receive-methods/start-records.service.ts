import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';

export interface StartRecordsOptions {
  roomName: string;
  member: string;
  socket: Socket;
}

// Export the type definition for the function
export type StartRecordsType = (options: StartRecordsOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class StartRecords {
  /**
   * Starts recording the room.
   *
   * @param {Object} options - The options for starting the recording.
   * @param {string} options.roomName - The name of the room to start recording.
   * @param {string} options.member - The member starting the recording.
   * @param {Socket} options.socket - The socket instance for communication.
   *
   * @returns {Promise<void>} A promise that resolves when the recording is started.
   */
  startRecords = async ({ roomName, member, socket }: StartRecordsOptions): Promise<void> => {
    // Send the 'startRecording' event to the server with roomName and member information
    socket.emit('startRecordIng', { roomName, member }, ({ success }: { success: boolean }) => {
      // Handle the success or failure of starting recording (if needed)
      if (success) {
        console.log('Recording started successfully');
      } else {
        console.log('Recording failed to start');
      }
    });
  };
}
