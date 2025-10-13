import { Injectable } from '@angular/core';
import { types } from 'mediasoup-client';
type Producer = types.Producer;
import { Socket } from 'socket.io-client';
import { ReorderStreamsType, ReorderStreamsParameters } from '../@types/types';
export interface DisconnectSendTransportVideoParameters extends ReorderStreamsParameters {
  videoProducer: Producer | null;
  localVideoProducer?: Producer | null;
  socket: Socket;
  localSocket?: Socket;
  islevel: string;
  roomName: string;
  lock_screen: boolean;
  updateMainWindow: boolean;
  updateUpdateMainWindow: (state: boolean) => void;
  updateVideoProducer: (producer: Producer | null) => void;
  updateLocalVideoProducer?: (producer: Producer | null) => void;

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

export const disconnectLocalSendTransportVideo = async({
  parameters,
}: DisconnectSendTransportVideoOptions): Promise<void> => {
  try {
    const {
      localVideoProducer,
      localSocket,
      roomName,
      updateLocalVideoProducer,
    } = parameters;

    if (localSocket && localSocket.id) {
      // continue
    } else {
      return
    }

    // Close the local video producer and notify the server
    if (localVideoProducer) {
      localVideoProducer.close();
      updateLocalVideoProducer?.(null);
    }


    localSocket.emit('pauseProducerMedia', { mediaTag: 'video', roomName: roomName });

  } catch (error) {
    console.error('Error disconnecting local video send transport:', error);
    throw error; // Re-throw to propagate the error
  }
};

/**
 * Disconnects the send transport for video, closes the video producer, and updates the state.
 *
 * This function supports both a primary and a local video producer, delegating local handling to a separate function.
 *
 * @param {DisconnectSendTransportVideoOptions} options - The options for disconnecting the send transport.
 * @param {DisconnectSendTransportVideoParameters} options.parameters - The parameters required for disconnecting the send transport.
 * @param {Producer | null} options.parameters.videoProducer - The primary video producer object.
 * @param {Producer | null} [options.parameters.localVideoProducer] - The local video producer object (optional).
 * @param {Socket} options.parameters.socket - The primary socket object.
 * @param {Socket} [options.parameters.localSocket] - The local socket object (optional).
 * @param {string} options.parameters.islevel - The participant's level.
 * @param {string} options.parameters.roomName - The name of the room.
 * @param {boolean} options.parameters.updateMainWindow - The flag to update the main window.
 * @param {boolean} options.parameters.lock_screen - The flag to lock the screen.
 * @param {Function} options.parameters.updateUpdateMainWindow - The function to update the main window state.
 * @param {Function} options.parameters.updateVideoProducer - The function to update the video producer state.
 * @param {Function} [options.parameters.updateLocalVideoProducer] - The function to update the local video producer state (optional).
 * @param {ReorderStreamsType} options.parameters.reorderStreams - The function to reorder streams.
 * @param {Function} [options.parameters.updateLocalProducerTransport] - The function to update the local producer transport state (optional).
 * @param {Function} [options.parameters.updateProducerTransport] - The function to update the producer transport state (optional).
 *
 * @returns {Promise<void>} A promise that resolves when the disconnection process is complete.
 *
 * @throws {Error} Throws an error if the disconnection process fails.
 *
 * @example
 * const options = {
 *   parameters: {
 *     videoProducer: videoProducerInstance,
 *     localVideoProducer: localVideoProducerInstance,
 *     socket: socketInstance,
 *     localSocket: localSocketInstance,
 *     islevel: '2',
 *     roomName: 'Room A',
 *     updateMainWindow: false,
 *     lock_screen: false,
 *     updateUpdateMainWindow: (state) => console.log('Main window updated:', state),
 *     updateVideoProducer: (producer) => console.log('Video producer updated:', producer),
 *     updateLocalVideoProducer: (producer) => console.log('Local video producer updated:', producer),
 *     reorderStreams: reorderStreamsFunction,
 *   },
 * };
 *
 * disconnectSendTransportVideo(options)
 *   .then(() => console.log('Video send transport disconnected successfully'))
 *   .catch((error) => console.error('Error disconnecting video send transport:', error));
 */


@Injectable({
  providedIn: 'root',
})
export class DisconnectSendTransportVideo {

 /**
   * Disconnects the send transport for video, closes the video producer, and updates the state.
   *
   * This function supports both a primary and a local video producer, delegating local handling to a separate function.
   *
   * @param {DisconnectSendTransportVideoOptions} options - The options for disconnecting the send transport.
   * @param {DisconnectSendTransportVideoParameters} options.parameters - The parameters required for disconnecting the send transport.
   * @param {Producer | null} options.parameters.videoProducer - The primary video producer object.
   * @param {Producer | null} [options.parameters.localVideoProducer] - The local video producer object (optional).
   * @param {Socket} options.parameters.socket - The primary socket object.
   * @param {Socket} [options.parameters.localSocket] - The local socket object (optional).
   * @param {string} options.parameters.islevel - The participant's level.
   * @param {string} options.parameters.roomName - The name of the room.
   * @param {boolean} options.parameters.updateMainWindow - The flag to update the main window.
   * @param {boolean} options.parameters.lock_screen - The flag to lock the screen.
   * @param {Function} options.parameters.updateUpdateMainWindow - The function to update the main window state.
   * @param {Function} options.parameters.updateVideoProducer - The function to update the video producer state.
   * @param {Function} [options.parameters.updateLocalVideoProducer] - The function to update the local video producer state (optional).
   * @param {ReorderStreamsType} options.parameters.reorderStreams - The function to reorder streams.
   * @param {Function} [options.parameters.updateLocalProducerTransport] - The function to update the local producer transport state (optional).
   * @param {Function} [options.parameters.updateProducerTransport] - The function to update the producer transport state (optional).
   *
   * @returns {Promise<void>} A promise that resolves when the disconnection process is complete.
   *
   * @throws {Error} Throws an error if the disconnection process fails.
   *
   * @example
   * const options = {
   *   parameters: {
   *     videoProducer: videoProducerInstance,
   *     localVideoProducer: localVideoProducerInstance,
   *     socket: socketInstance,
   *     localSocket: localSocketInstance,
   *     islevel: '2',
   *     roomName: 'Room A',
   *     updateMainWindow: false,
   *     lock_screen: false,
   *     updateUpdateMainWindow: (state) => console.log('Main window updated:', state),
   *     updateVideoProducer: (producer) => console.log('Video producer updated:', producer),
   *     updateLocalVideoProducer: (producer) => console.log('Local video producer updated:', producer),
   *     reorderStreams: reorderStreamsFunction,
   *   },
   * };
   *
   * disconnectSendTransportVideo(options)
   *   .then(() => console.log('Video send transport disconnected successfully'))
   *   .catch((error) => console.error('Error disconnecting video send transport:', error));
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

      // Handle local video transport regardless of primary success or failure
      try {
        await disconnectLocalSendTransportVideo({ parameters });
      } catch (localError) {
        console.error('Error disconnecting local video send transport:', localError);
      }
    } catch (error: any) {
      // Handle errors during the disconnection process
      console.log('Error disconnecting send transport for video:', error.message);
    }
  }
}
