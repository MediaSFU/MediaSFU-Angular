import { Injectable } from '@angular/core';
import { Producer } from 'mediasoup-client/lib/types';
import { Socket } from 'socket.io-client';
import { ReorderStreamsType, ReorderStreamsParameters } from '../@types/types';
export interface DisconnectSendTransportVideoParameters extends ReorderStreamsParameters {
  videoProducer: Producer | null;
  socket: Socket;
  islevel: string;
  roomName: string;
  lock_screen: boolean;
  updateMainWindow: boolean;
  updateUpdateMainWindow: (state: boolean) => void;
  updateVideoProducer: (producer: Producer | null) => void;

  // mediasfu functions
  reorderStreams: ReorderStreamsType;
  [key: string]: any;
}

export interface DisconnectSendTransportVideoOptions {
  parameters: DisconnectSendTransportVideoParameters;
}

// Export the type definition for the function
export type DisconnectSendTransportVideoType = (
  options: DisconnectSendTransportVideoOptions,
) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class DisconnectSendTransportVideo {
  /**
   * Disconnects the send transport for video, closes the video producer, and updates the state.
   *
   * @param {DisconnectSendTransportVideoOptions} parameters - The parameters required for disconnecting the send transport.
   * @param {Producer} parameters.videoProducer - The video producer to be closed.
   * @param {Socket} parameters.socket - The socket instance for communication.
   * @param {string} parameters.islevel - The participant's level.
   * @param {string} parameters.roomName - The name of the room.
   * @param {boolean} parameters.updateMainWindow - Flag to update the main window.
   * @param {boolean} parameters.lock_screen - Flag indicating if the screen is locked.
   * @param {Function} parameters.updateUpdateMainWindow - Function to update the main window state.
   * @param {Function} parameters.updateVideoProducer - Function to update the video producer state.
   * @param {Function} parameters.reorderStreams - Function to reorder streams.
   *
   * @returns {Promise<void>} - A promise that resolves when the disconnection process is complete.
   *
   * @throws {Error} - Throws an error if the disconnection process fails.
   */

  async disconnectSendTransportVideo({
    parameters,
  }: DisconnectSendTransportVideoOptions): Promise<void> {
    try {
      let {
        videoProducer,
        socket,
        islevel,
        roomName,
        lock_screen,
        updateMainWindow,
        updateUpdateMainWindow,
        updateVideoProducer,
        reorderStreams,
      } = parameters.getUpdatedAllParams();

      // Close the video producer and update the state
      await videoProducer.close();
      updateVideoProducer(null);

      // Notify the server about pausing video sharing
      socket.emit('pauseProducerMedia', { mediaTag: 'video', roomName });

      // Update the UI based on the participant's level and screen lock status
      if (islevel === '2') {
        updateMainWindow = true;
        updateUpdateMainWindow(updateMainWindow);
      }

      if (lock_screen) {
        await reorderStreams({ add: true, screenChanged: true, parameters });
      } else {
        await reorderStreams({ add: false, screenChanged: true, parameters });
      }
    } catch (error: any) {
      // Handle errors during the disconnection process
      console.log('Error disconnecting send transport for video:', error.message);
    }
  }
}
