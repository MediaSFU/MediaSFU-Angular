import { Injectable } from '@angular/core';
import {
  DisconnectSendTransportScreenType,
  PrepopulateUserMediaType,
  ReorderStreamsType,
  GetVideosType,
  DisconnectSendTransportScreenParameters,
  PrepopulateUserMediaParameters,
  ReorderStreamsParameters,
  EventType,
} from '../@types/types';
export interface StopShareScreenParameters
  extends DisconnectSendTransportScreenParameters,
  PrepopulateUserMediaParameters,
  ReorderStreamsParameters {
  shared: boolean;
  shareScreenStarted: boolean;
  shareEnded: boolean;
  updateMainWindow: boolean;
  defer_receive: boolean;
  hostLabel: string;
  lock_screen: boolean;
  forceFullDisplay: boolean;
  firstAll: boolean;
  first_round: boolean;
  localStreamScreen: MediaStream | null;
  eventType: EventType;
  prevForceFullDisplay: boolean;
  annotateScreenStream: boolean;

  updateShared: (shared: boolean) => void;
  updateShareScreenStarted: (shareScreenStarted: boolean) => void;
  updateShareEnded: (shareEnded: boolean) => void;
  updateUpdateMainWindow: (updateMainWindow: boolean) => void;
  updateDefer_receive: (defer_receive: boolean) => void;
  updateLock_screen: (lock_screen: boolean) => void;
  updateForceFullDisplay: (forceFullDisplay: boolean) => void;
  updateFirstAll: (firstAll: boolean) => void;
  updateFirst_round: (first_round: boolean) => void;
  updateLocalStreamScreen: (localStreamScreen: MediaStream | null) => void;
  updateMainHeightWidth: (mainHeightWidth: number) => void;
  updateAnnotateScreenStream: (annotateScreenStream: boolean) => void;
  updateIsScreenboardModalVisible: (isVisible: boolean) => void;

  // mediasfu functions
  disconnectSendTransportScreen: DisconnectSendTransportScreenType;
  prepopulateUserMedia: PrepopulateUserMediaType;
  reorderStreams: ReorderStreamsType;
  getVideos: GetVideosType;

  getUpdatedAllParams: () => StopShareScreenParameters;
  [key: string]: any;
}

export interface StopShareScreenOptions {
  parameters: StopShareScreenParameters;
}

// Export the type definition for the function
export type StopShareScreenType = (options: StopShareScreenOptions) => Promise<void>;

/**
 * Stops the screen sharing process and updates the relevant parameters and states.
 *
 * This method updates the internal state to reflect that screen sharing has ended,
 * cleans up local media tracks, and reorders the streams in the application.
 *
 * @param {StopShareScreenOptions} options - The options for stopping the screen share.
 * @param {Object} options.parameters - The parameters required for stopping the screen share.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {boolean} options.parameters.shared - Indicates if the screen is currently shared.
 * @param {boolean} options.parameters.shareScreenStarted - Indicates if the screen sharing has started.
 * @param {boolean} options.parameters.shareEnded - Indicates if the screen sharing has ended.
 * @param {boolean} options.parameters.updateMainWindow - Indicates if the main window needs to be updated.
 * @param {boolean} options.parameters.defer_receive - Indicates if receiving is deferred.
 * @param {string} options.parameters.hostLabel - The label of the host.
 * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
 * @param {boolean} options.parameters.forceFullDisplay - Indicates if full display is forced.
 * @param {boolean} options.parameters.firstAll - Indicates if it is the first all.
 * @param {boolean} options.parameters.first_round - Indicates if it is the first round.
 * @param {MediaStream} options.parameters.localStreamScreen - The local screen stream.
 * @param {string} options.parameters.eventType - The type of event (e.g., "conference").
 * @param {boolean} options.parameters.prevForceFullDisplay - Indicates if full display was previously forced.
 * @param {boolean} options.parameters.annotateScreenStream - Indicates if the screen stream is annotated.
 * @param {Function} options.parameters.updateShared - Function to update the shared state.
 * @param {Function} options.parameters.updateShareScreenStarted - Function to update the share screen started state.
 * @param {Function} options.parameters.updateShareEnded - Function to update the share ended state.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
 * @param {Function} options.parameters.updateDefer_receive - Function to update the defer receive state.
 * @param {Function} options.parameters.updateLock_screen - Function to update the lock screen state.
 * @param {Function} options.parameters.updateForceFullDisplay - Function to update the force full display state.
 * @param {Function} options.parameters.updateFirstAll - Function to update the first all state.
 * @param {Function} options.parameters.updateFirst_round - Function to update the first round state.
 * @param {Function} options.parameters.updateLocalStreamScreen - Function to update the local screen stream.
 * @param {Function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
 * @param {Function} options.parameters.updateAnnotateScreenStream - Function to update the annotate screen stream state.
 * @param {Function} options.parameters.updateIsScreenboardModalVisible - Function to update the screenboard modal visibility.
 * @param {Function} options.parameters.disconnectSendTransportScreen - Function to disconnect the send transport screen.
 * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
 * @param {Function} options.parameters.reorderStreams - Function to reorder streams.
 * @param {Function} options.parameters.getVideos - Function to get videos.
 *
 * @returns {Promise<void>} A promise that resolves when the screen sharing process is stopped.
 *
 * @throws {Error} Throws an error if there is an issue during the screen share stopping process.
 *
 * @example
 * await stopShareScreen({
 *   parameters: {
 *     socket: mySocket,
 *     shared: true,
 *     shareScreenStarted: true,
 *     // other parameters...
 *   },
 * });
 */


@Injectable({
  providedIn: 'root',
})
export class StopShareScreen {
  /**
   * Stops the screen sharing process and updates the relevant parameters and states.
   *
   * @param {StopShareScreenOptions} options - The options for stopping the screen share.
   * @param {Object} options.parameters - The parameters required for stopping the screen share.
   * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
   * @param {boolean} options.parameters.shared - Indicates if the screen is currently shared.
   * @param {boolean} options.parameters.shareScreenStarted - Indicates if the screen sharing has started.
   * @param {boolean} options.parameters.shareEnded - Indicates if the screen sharing has ended.
   * @param {boolean} options.parameters.updateMainWindow - Indicates if the main window needs to be updated.
   * @param {boolean} options.parameters.defer_receive - Indicates if receiving is deferred.
   * @param {string} options.parameters.hostLabel - The label of the host.
   * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
   * @param {boolean} options.parameters.forceFullDisplay - Indicates if full display is forced.
   * @param {boolean} options.parameters.firstAll - Indicates if it is the first all.
   * @param {boolean} options.parameters.first_round - Indicates if it is the first round.
   * @param {MediaStream} options.parameters.localStreamScreen - The local screen stream.
   * @param {string} options.parameters.eventType - The type of event.
   * @param {boolean} options.parameters.prevForceFullDisplay - Indicates if full display was previously forced.
   * @param {boolean} options.parameters.annotateScreenStream - Indicates if the screen stream is annotated.
   * @param {Function} options.parameters.updateShared - Function to update the shared state.
   * @param {Function} options.parameters.updateShareScreenStarted - Function to update the share screen started state.
   * @param {Function} options.parameters.updateShareEnded - Function to update the share ended state.
   * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
   * @param {Function} options.parameters.updateDefer_receive - Function to update the defer receive state.
   * @param {Function} options.parameters.updateLock_screen - Function to update the lock screen state.
   * @param {Function} options.parameters.updateForceFullDisplay - Function to update the force full display state.
   * @param {Function} options.parameters.updateFirstAll - Function to update the first all state.
   * @param {Function} options.parameters.updateFirst_round - Function to update the first round state.
   * @param {Function} options.parameters.updateLocalStreamScreen - Function to update the local screen stream.
   * @param {Function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
   * @param {Function} options.parameters.updateAnnotateScreenStream - Function to update the annotate screen stream state.
   * @param {Function} options.parameters.updateIsScreenboardModalVisible - Function to update the screenboard modal visibility.
   * @param {Function} options.parameters.disconnectSendTransportScreen - Function to disconnect the send transport screen.
   * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
   * @param {Function} options.parameters.reorderStreams - Function to reorder streams.
   * @param {Function} options.parameters.getVideos - Function to get videos.
   *
   * @returns {Promise<void>} A promise that resolves when the screen sharing process is stopped.
   */
  stopShareScreen = async ({ parameters }: StopShareScreenOptions): Promise<void> => {
    let { getUpdatedAllParams } = parameters;
    parameters = getUpdatedAllParams();

    let {
      shared,
      shareScreenStarted,
      shareEnded,
      updateMainWindow,
      defer_receive,
      hostLabel,
      lock_screen,
      forceFullDisplay,
      firstAll,
      first_round,
      localStreamScreen,
      eventType,
      prevForceFullDisplay,
      annotateScreenStream,

      // updates for the above
      updateShared,
      updateShareScreenStarted,
      updateShareEnded,
      updateUpdateMainWindow,
      updateDefer_receive,
      updateLock_screen,
      updateForceFullDisplay,
      updateFirstAll,
      updateFirst_round,
      updateLocalStreamScreen,
      updateMainHeightWidth,
      updateAnnotateScreenStream,
      updateIsScreenboardModalVisible,

      // mediasfu functions
      disconnectSendTransportScreen,
      prepopulateUserMedia,
      reorderStreams,
      getVideos,
    } = parameters;

    shared = false;
    updateShared(shared);
    shareScreenStarted = false;
    updateShareScreenStarted(shareScreenStarted);
    shareEnded = true;
    updateShareEnded(shareEnded);
    updateMainWindow = true;
    updateUpdateMainWindow(updateMainWindow);

    if (defer_receive) {
      defer_receive = false;
      updateDefer_receive(defer_receive);
      await getVideos({
        participants: parameters.participants,
        allVideoStreams: parameters.allVideoStreams,
        oldAllStreams: parameters.oldAllStreams,
        adminVidID: parameters.adminVidID,
        updateAllVideoStreams: parameters['updateAllVideoStreams'],
        updateOldAllStreams: parameters['updateOldAllStreams'],
      });
    }

    try {
      localStreamScreen?.getTracks().forEach((track: MediaStreamTrack) => track.stop());
    } catch {
      // do nothing
    }
    updateLocalStreamScreen(localStreamScreen);
    await disconnectSendTransportScreen({ parameters });

    try {
      if (annotateScreenStream) {
        annotateScreenStream = false;
        updateAnnotateScreenStream(annotateScreenStream);
        updateIsScreenboardModalVisible(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        updateIsScreenboardModalVisible(false);
      }
    } catch (error) {
      console.log('Error handling screen annotation:', error);
    }

    if (eventType == 'conference') {
      updateMainHeightWidth(0);
    }

    try {
      await prepopulateUserMedia({ name: hostLabel, parameters });
    } catch (error) {
      console.log('Error in prepopulateUserMedia:', error);
    }

    try {
      await reorderStreams({ add: false, screenChanged: true, parameters });
    } catch (error) {
      console.log('Error in reorderStreams:', error);
    }

    lock_screen = false;
    updateLock_screen(lock_screen);
    forceFullDisplay = prevForceFullDisplay;
    updateForceFullDisplay(forceFullDisplay);
    firstAll = false;
    updateFirstAll(firstAll);
    first_round = false;
    updateFirst_round(first_round);
  };
}
