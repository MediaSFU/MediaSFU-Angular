import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { PrepopulateUserMediaType, PrepopulateUserMediaParameters } from '../@types/types';
import { Producer } from 'mediasoup-client/lib/types';
export interface DisconnectSendTransportAudioParameters extends PrepopulateUserMediaParameters {
  audioProducer: Producer | null;
  socket: Socket;
  videoAlreadyOn: boolean;
  islevel: string;
  lock_screen: boolean;
  shared: boolean;
  updateMainWindow: boolean;
  hostLabel: string;
  roomName: string;
  updateAudioProducer: (audioProducer: Producer | null) => void;
  updateUpdateMainWindow: (updateMainWindow: boolean) => void;

  // mediasfu functions
  prepopulateUserMedia: PrepopulateUserMediaType;
  [key: string]: any;
}

export interface DisconnectSendTransportAudioOptions {
  parameters: DisconnectSendTransportAudioParameters;
}

// Export the type definition for the function
export type DisconnectSendTransportAudioType = (
  options: DisconnectSendTransportAudioOptions,
) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class DisconnectSendTransportAudio {
  /**
   * Disconnects the send transport for audio by pausing the audio producer and updating the UI accordingly.
   *
   * @param {DisconnectSendTransportAudioOptions} parameters - The parameters required to disconnect the send transport for audio.
   * @param {Object} parameters.audioProducer - The audio producer to be paused.
   * @param {Object} parameters.socket - The socket connection to notify the server.
   * @param {boolean} parameters.videoAlreadyOn - Flag indicating if the video is already on.
   * @param {string} parameters.islevel - The level of the user.
   * @param {boolean} parameters.lock_screen - Flag indicating if the screen is locked.
   * @param {boolean} parameters.shared - Flag indicating if the screen is shared.
   * @param {Function} parameters.updateMainWindow - Function to update the main window state.
   * @param {string} parameters.hostLabel - The label of the host.
   * @param {string} parameters.roomName - The name of the room.
   * @param {Function} parameters.updateAudioProducer - Function to update the audio producer state.
   * @param {Function} parameters.updateUpdateMainWindow - Function to update the main window update state.
   * @param {Function} parameters.prepopulateUserMedia - Function to prepopulate user media.
   *
   * @returns {Promise<void>} A promise that resolves when the send transport for audio is disconnected.
   *
   * @throws Will throw an error if the operation fails.
   */
  async disconnectSendTransportAudio({
    parameters,
  }: DisconnectSendTransportAudioOptions): Promise<void> {
    try {
      // Destructure parameters
      let {
        audioProducer,
        socket,
        videoAlreadyOn,
        islevel,
        lock_screen,
        shared,
        updateMainWindow,
        hostLabel,
        roomName,
        updateAudioProducer,
        updateUpdateMainWindow,
        prepopulateUserMedia,
      } = parameters;

      // Pause the audio producer
      audioProducer?.pause(); // actual logic is to close (await audioProducer.close()) but mediaSFU prefers pause if recording
      updateAudioProducer(audioProducer);

      // Update the UI
      if (!videoAlreadyOn && islevel === '2') {
        if (!lock_screen && !shared) {
          updateMainWindow = true;
          updateUpdateMainWindow(updateMainWindow);
          await prepopulateUserMedia({ name: hostLabel, parameters });
          updateMainWindow = false;
          updateUpdateMainWindow(updateMainWindow);
        }
      }

      // Notify the server about pausing audio producer
      socket.emit('pauseProducerMedia', { mediaTag: 'audio', roomName: roomName });
    } catch (error) {
      console.error('disconnectSendTransportAudio error', error);
    }
  }
}
