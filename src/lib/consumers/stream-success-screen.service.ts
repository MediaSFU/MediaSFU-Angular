import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import {
  SleepType,
  CreateSendTransportType,
  ConnectSendTransportScreenType,
  DisconnectSendTransportScreenType,
  StopShareScreenType,
  ReorderStreamsType,
  PrepopulateUserMediaType,
  RePortType,
  ShowAlert,
  CreateSendTransportParameters,
  ConnectSendTransportScreenParameters,
  DisconnectSendTransportScreenParameters,
  StopShareScreenParameters,
  ReorderStreamsParameters,
  PrepopulateUserMediaParameters,
  EventType,
} from '../@types/types';

export interface StreamSuccessScreenParameters
  extends CreateSendTransportParameters,
    ConnectSendTransportScreenParameters,
    DisconnectSendTransportScreenParameters,
    StopShareScreenParameters,
    ReorderStreamsParameters,
    PrepopulateUserMediaParameters {
  socket: Socket;
  transportCreated: boolean;
  localStreamScreen: MediaStream | null;
  screenAlreadyOn: boolean;
  screenAction: boolean;
  transportCreatedScreen: boolean;
  hostLabel: string;
  eventType: EventType;
  showAlert?: ShowAlert;
  annotateScreenStream: boolean;
  shared: boolean;

  updateTransportCreatedScreen: (transportCreatedScreen: boolean) => void;
  updateScreenAlreadyOn: (screenAlreadyOn: boolean) => void;
  updateScreenAction: (screenAction: boolean) => void;
  updateTransportCreated: (transportCreated: boolean) => void;
  updateLocalStreamScreen: (localStreamScreen: MediaStream | null) => void;
  updateShared: (shared: boolean) => void;
  updateIsScreenboardModalVisible: (isVisible: boolean) => void;

  // mediasfu functions
  sleep: SleepType;
  createSendTransport: CreateSendTransportType;
  connectSendTransportScreen: ConnectSendTransportScreenType;
  disconnectSendTransportScreen: DisconnectSendTransportScreenType;
  stopShareScreen: StopShareScreenType;
  reorderStreams: ReorderStreamsType;
  prepopulateUserMedia: PrepopulateUserMediaType;
  rePort: RePortType;

  getUpdatedAllParams: () => StreamSuccessScreenParameters;
  [key: string]: any;
}

export interface StreamSuccessScreenOptions {
  stream: MediaStream;
  parameters: StreamSuccessScreenParameters;
}

// Export the type definition for the function
export type StreamSuccessScreenType = (options: StreamSuccessScreenOptions) => Promise<void>;

/**
 * Handles the successful initiation of screen sharing.
 *
 * This method sets up the necessary transport connections for screen sharing,
 * updates relevant application states, and notifies participants of the screen
 * sharing status.
 *
 * @param {StreamSuccessScreenOptions} options - The options for the screen sharing success handler.
 * @param {MediaStream} options.stream - The media stream to be shared.
 * @param {StreamSuccessScreenParameters} options.parameters - The parameters required for screen sharing.
 * @param {Socket} options.parameters.socket - The socket instance for real-time communication.
 * @param {boolean} options.parameters.transportCreated - Flag indicating if the transport is already created.
 * @param {MediaStream | null} options.parameters.localStreamScreen - The local screen media stream.
 * @param {boolean} options.parameters.screenAlreadyOn - Flag indicating if the screen is already being shared.
 * @param {boolean} options.parameters.screenAction - Flag indicating if the screen share action is requested.
 * @param {boolean} options.parameters.transportCreatedScreen - Flag indicating if the screen transport is created.
 * @param {string} options.parameters.hostLabel - The label of the host for this session.
 * @param {string} options.parameters.eventType - The type of event (e.g., conference).
 * @param {ShowAlert} [options.parameters.showAlert] - Optional function to show alert messages.
 * @param {boolean} options.parameters.annotateScreenStream - Flag indicating if screen annotation is enabled.
 * @param {Function} options.parameters.updateTransportCreatedScreen - Function to update the screen transport creation state.
 * @param {Function} options.parameters.updateScreenAlreadyOn - Function to update the screen sharing state.
 * @param {Function} options.parameters.updateScreenAction - Function to update the screen action state.
 * @param {Function} options.parameters.updateTransportCreated - Function to update the transport creation state.
 * @param {Function} options.parameters.updateLocalStreamScreen - Function to update the local screen stream.
 * @param {Function} options.parameters.updateShared - Function to update the shared state.
 * @param {Function} options.parameters.updateIsScreenboardModalVisible - Function to update the screenboard modal visibility.
 * @param {Function} options.parameters.sleep - Function to pause execution for a specified time.
 * @param {Function} options.parameters.createSendTransport - Function to create a send transport for screen sharing.
 * @param {Function} options.parameters.connectSendTransportScreen - Function to connect the send transport for screen sharing.
 * @param {Function} options.parameters.disconnectSendTransportScreen - Function to disconnect the send transport for screen sharing.
 * @param {Function} options.parameters.stopShareScreen - Function to stop the screen sharing process.
 * @param {Function} options.parameters.reorderStreams - Function to reorder streams based on current state.
 * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media based on current settings.
 * @param {Function} options.parameters.rePort - Function to reinitialize ports if needed.
 *
 * @returns {Promise<void>} A promise that resolves when the screen sharing setup is complete.
 *
 * @throws {Error} Throws an error if there is an issue during the screen sharing setup.
 *
 * @example
 * await streamSuccessScreen({
 *   stream: newScreenStream,
 *   parameters: {
 *     socket: socketInstance,
 *     localStreamScreen: null,
 *     // other parameters...
 *   },
 * });
 */

@Injectable({
  providedIn: 'root',
})
export class StreamSuccessScreen {
  /**
   * Handles the successful initiation of screen sharing.
   *
   * @param {StreamSuccessScreenOptions} options - The options for the screen sharing success handler.
   * @param {MediaStream} options.stream - The media stream to be shared.
   * @param {Object} options.parameters - The parameters required for screen sharing.
   * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
   * @param {Socket} options.parameters.socket - The socket instance for communication.
   * @param {boolean} options.parameters.transportCreated - Flag indicating if the transport is already created.
   * @param {MediaStream} options.parameters.localStreamScreen - The local screen media stream.
   * @param {boolean} options.parameters.screenAlreadyOn - Flag indicating if the screen is already being shared.
   * @param {boolean} options.parameters.screenAction - Flag indicating if the screen share action is requested.
   * @param {boolean} options.parameters.transportCreatedScreen - Flag indicating if the screen transport is created.
   * @param {string} options.parameters.hostLabel - The label of the host.
   * @param {string} options.parameters.eventType - The type of the event (e.g., conference).
   * @param {Function} options.parameters.showAlert - Function to show alerts.
   * @param {boolean} options.parameters.annotateScreenStream - Flag indicating if screen annotation is enabled.
   * @param {Function} options.parameters.updateTransportCreatedScreen - Function to update the screen transport creation state.
   * @param {Function} options.parameters.updateScreenAlreadyOn - Function to update the screen sharing state.
   * @param {Function} options.parameters.updateScreenAction - Function to update the screen action state.
   * @param {Function} options.parameters.updateTransportCreated - Function to update the transport creation state.
   * @param {Function} options.parameters.updateLocalStreamScreen - Function to update the local screen stream.
   * @param {Function} options.parameters.updateShared - Function to update the shared state.
   * @param {Function} options.parameters.updateIsScreenboardModalVisible - Function to update the screenboard modal visibility.
   * @param {Function} options.parameters.sleep - Function to pause execution for a specified duration.
   * @param {Function} options.parameters.createSendTransport - Function to create a send transport.
   * @param {Function} options.parameters.connectSendTransportScreen - Function to connect the send transport for screen sharing.
   * @param {Function} options.parameters.disconnectSendTransportScreen - Function to disconnect the send transport for screen sharing.
   * @param {Function} options.parameters.stopShareScreen - Function to stop screen sharing.
   * @param {Function} options.parameters.reorderStreams - Function to reorder streams.
   * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
   * @param {Function} options.parameters.rePort - Function to reinitialize ports.
   *
   * @returns {Promise<void>} A promise that resolves when the screen sharing setup is complete.
   */
  async streamSuccessScreen({ stream, parameters }: StreamSuccessScreenOptions): Promise<void> {
    let { getUpdatedAllParams } = parameters;
    parameters = getUpdatedAllParams();

    let {
      socket,
      transportCreated,
      localStreamScreen,
      screenAlreadyOn,
      screenAction,
      transportCreatedScreen,
      hostLabel,
      eventType,
      showAlert,
      annotateScreenStream,

      // updates for the above
      updateTransportCreatedScreen,
      updateScreenAlreadyOn,
      updateScreenAction,
      updateTransportCreated,
      updateLocalStreamScreen,
      updateShared,
      updateIsScreenboardModalVisible,
      sleep,

      // mediasfu functions
      createSendTransport,
      connectSendTransportScreen,
      disconnectSendTransportScreen,
      stopShareScreen,
      reorderStreams,
      prepopulateUserMedia,
      rePort,
    } = parameters;

    // Share screen on success
    localStreamScreen = stream;
    updateLocalStreamScreen(localStreamScreen);

    try {
      // Create transport if not created else connect transport
      if (!transportCreated) {
        await createSendTransport({
          option: 'screen',
          parameters: { ...parameters, localStreamScreen },
        });
      } else {
        await connectSendTransportScreen({
          stream: localStreamScreen,
          parameters: { ...parameters, localStreamScreen },
        });
      }

      // Alert the socket that you are sharing screen
      socket.emit('startScreenShare');
    } catch (error: any) {
      showAlert?.({
        message: error.message,
        type: 'danger',
        duration: 3000,
      });
    }

    // Reupdate the screen display
    try {
      updateShared(true);
      await prepopulateUserMedia({
        name: hostLabel,
        parameters: { ...parameters, localStreamScreen, shared: true },
      });
    } catch {
      /* handle error */
    }

    // Update the participants array to reflect the change
    screenAlreadyOn = true;
    updateScreenAlreadyOn(screenAlreadyOn);

    // Reorder streams if required
    try {
      if (eventType == 'conference') {
        await reorderStreams({ add: false, screenChanged: true, parameters });
        await prepopulateUserMedia({ name: hostLabel, parameters });
      } else {
        await reorderStreams({ parameters });
      }
    } catch (error) {
      try {
        await rePort({ parameters });
      } catch {
        /* handle error */
      }
    }

    // Handle screen share end
    localStreamScreen.getVideoTracks()[0].onended = async function () {
      // Supports both manual and automatic screen share end
      await disconnectSendTransportScreen({ parameters });
      await stopShareScreen({ parameters });
    };

    // If user requested to share screen, update the screenAction state
    if (screenAction == true) {
      screenAction = false;
    }
    updateScreenAction(screenAction);

    // Update the transport created state
    transportCreatedScreen = true;
    transportCreated = true;
    updateTransportCreatedScreen(transportCreatedScreen);
    updateTransportCreated(transportCreated);

    // Handle screen annotation modal
    try {
      if (annotateScreenStream) {
        annotateScreenStream = false;
        updateIsScreenboardModalVisible(true);
        await sleep({ ms: 500 });
        updateIsScreenboardModalVisible(false);
      }
    } catch (error) {
      //console.log('Error handling screen annotation:', error);
    }
  }
}
