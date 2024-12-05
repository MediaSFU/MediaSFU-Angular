import { Injectable } from '@angular/core';
import { Producer } from 'mediasoup-client/lib/types';
import { Socket } from 'socket.io-client';

export interface DisconnectSendTransportScreenParameters {
  screenProducer: Producer | null;
  socket: Socket;
  localSocket?: Socket;
  roomName: string;
  updateScreenProducer: (screenProducer: Producer | null) => void;
  updateLocalScreenProducer?: (localScreenProducer: Producer | null) => void;

  getUpdatedAllParams: () => DisconnectSendTransportScreenParameters;
  [key: string]: any;
}
export interface DisconnectSendTransportScreenOptions {
  parameters: DisconnectSendTransportScreenParameters;
}

// Export the type definition for the function
export type DisconnectSendTransportScreenType = (
  options: DisconnectSendTransportScreenOptions,
) => Promise<void>;

export const disconnectLocalSendTransportScreen = async ({ parameters }: DisconnectSendTransportScreenOptions): Promise<void> => {

  try {
    // Destructure parameters
    let {
      localScreenProducer,
      localSocket,
      roomName,
      updateLocalScreenProducer,
    } = parameters;

    if (localSocket && localSocket.id) {
      localScreenProducer!.close();
      updateLocalScreenProducer!(localScreenProducer);

      // Notify the server about closing the screen producer and pausing screen sharing
      localSocket.emit('closeScreenProducer');
      localSocket.emit('pauseProducerMedia', { mediaTag: 'screen', roomName: roomName });
    }
  } catch {
    console.log('Error disconnecting local send transport for screen');
  }

};


/**
 * Disconnects the send transport for screen sharing.
 *
 * This function closes the screen producer, updates the state, and notifies the server
 * about the closure and pausing of screen sharing.
 *
 * @param {DisconnectSendTransportScreenOptions} options - The options for disconnecting the send transport.
 * @param {Object} options.parameters - The parameters required for disconnection.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {Producer | null} options.parameters.screenProducer - The screen producer to be closed.
 * @param {Socket} options.parameters.socket - The socket connection to notify the server.
 * @param {Socket} [options.parameters.localSocket] - The local socket connection for communication.
 * @param {string} options.parameters.roomName - The name of the room.
 * @param {Function} options.parameters.updateScreenProducer - Function to update the screen producer state.
 * @param {Function} [options.parameters.updateLocalScreenProducer] - Function to update the local screen producer state.
 * @returns {Promise<void>} A promise that resolves when the disconnection process is complete.
 * @throws {Error} If an error occurs during the disconnection process.
 *
 * @example
 * const options = {
 *   parameters: {
 *     screenProducer: screenProducerInstance,
 *     socket: socketInstance,
 *     localSocket: localSocketInstance,
 *     roomName: 'Room 1',
 *     updateScreenProducer: (producer) => console.log('Updated screen producer:', producer),
 *     updateLocalScreenProducer: (localProducer) => console.log('Updated local screen producer:', localProducer),
 *     getUpdatedAllParams: () => ({
 *       screenProducer: screenProducerInstance,
 *       socket: socketInstance,
 *       roomName: 'Room 1',
 *     }),
 *   },
 * };
 *
 * disconnectSendTransportScreen(options)
 *   .then(() => {
 *     console.log('Screen send transport disconnected successfully');
 *   })
 *   .catch((error) => {
 *     console.error('Error disconnecting screen send transport:', error);
 *   });
 */

@Injectable({
  providedIn: 'root',
})
export class DisconnectSendTransportScreen {

  /**
   * Disconnects the send transport for screen sharing.
   *
   * This function closes the screen producer, updates the state, and notifies the server
   * about the closure and pausing of screen sharing.
   *
   * @param {DisconnectSendTransportScreenOptions} options - The options for disconnecting the send transport.
   * @param {Object} options.parameters - The parameters required for disconnection.
   * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
   * @param {Producer | null} options.parameters.screenProducer - The screen producer to be closed.
   * @param {Socket} options.parameters.socket - The socket connection to notify the server.
   * @param {Socket} [options.parameters.localSocket] - The local socket connection for communication.
   * @param {string} options.parameters.roomName - The name of the room.
   * @param {Function} options.parameters.updateScreenProducer - Function to update the screen producer state.
   * @param {Function} [options.parameters.updateLocalScreenProducer] - Function to update the local screen producer state.
   * @returns {Promise<void>} A promise that resolves when the disconnection process is complete.
   * @throws {Error} If an error occurs during the disconnection process.
   *
   * @example
   * const options = {
   *   parameters: {
   *     screenProducer: screenProducerInstance,
   *     socket: socketInstance,
   *     localSocket: localSocketInstance,
   *     roomName: 'Room 1',
   *     updateScreenProducer: (producer) => console.log('Updated screen producer:', producer),
   *     updateLocalScreenProducer: (localProducer) => console.log('Updated local screen producer:', localProducer),
   *     getUpdatedAllParams: () => ({
   *       screenProducer: screenProducerInstance,
   *       socket: socketInstance,
   *       roomName: 'Room 1',
   *     }),
   *   },
   * };
   *
   * disconnectSendTransportScreen(options)
   *   .then(() => {
   *     console.log('Screen send transport disconnected successfully');
   *   })
   *   .catch((error) => {
   *     console.error('Error disconnecting screen send transport:', error);
   *   });
   */

  async disconnectSendTransportScreen({
    parameters,
  }: DisconnectSendTransportScreenOptions): Promise<void> {
    try {
      // Destructure parameters
      let { screenProducer, socket, roomName, updateScreenProducer } =
        parameters.getUpdatedAllParams();

      // Close the screen producer and update the state
      screenProducer?.close();
      updateScreenProducer(screenProducer);

      // Notify the server about closing the screen producer and pausing screen sharing
      socket.emit('closeScreenProducer');
      socket.emit('pauseProducerMedia', { mediaTag: 'screen', roomName });
    } catch (error: any) {
      // Handle errors during the disconnection process
      console.log('Error disconnecting send transport for screen:', error.message);
    }

    try {
      // Disconnect the local screen producer
      await disconnectLocalSendTransportScreen({ parameters });
    } catch {
      // Handle errors during the disconnection process
    }
  }
}
