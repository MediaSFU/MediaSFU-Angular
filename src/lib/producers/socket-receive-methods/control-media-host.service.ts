import { Injectable } from '@angular/core';
import {
  OnScreenChangesType,
  StopShareScreenType,
  DisconnectSendTransportVideoType,
  DisconnectSendTransportAudioType,
  DisconnectSendTransportScreenType,
  OnScreenChangesParameters,
  StopShareScreenParameters,
  DisconnectSendTransportVideoParameters,
  DisconnectSendTransportAudioParameters,
  DisconnectSendTransportScreenParameters,
} from '../../@types/types';
export interface ControlMediaHostParameters
  extends OnScreenChangesParameters,
    StopShareScreenParameters,
    DisconnectSendTransportVideoParameters,
    DisconnectSendTransportAudioParameters,
    DisconnectSendTransportScreenParameters {
  updateAdminRestrictSetting: (value: boolean) => void;
  localStream: MediaStream | null;
  updateLocalStream: (stream: MediaStream | null) => void;
  updateAudioAlreadyOn: (value: boolean) => void;
  localStreamScreen: MediaStream | null;
  updateLocalStreamScreen: (stream: MediaStream | null) => void;
  localStreamVideo: MediaStream | null;
  updateLocalStreamVideo: (stream: MediaStream | null) => void;

  updateScreenAlreadyOn: (value: boolean) => void;
  updateVideoAlreadyOn: (value: boolean) => void;
  updateChatAlreadyOn: (value: boolean) => void;

  // mediasfu functions
  onScreenChanges: OnScreenChangesType;
  stopShareScreen: StopShareScreenType;
  disconnectSendTransportVideo: DisconnectSendTransportVideoType;
  disconnectSendTransportAudio: DisconnectSendTransportAudioType;
  disconnectSendTransportScreen: DisconnectSendTransportScreenType;

  getUpdatedAllParams: () => ControlMediaHostParameters;
  [key: string]: any;
}

export interface ControlMediaHostOptions {
  type: 'audio' | 'video' | 'screenshare' | 'chat' | 'all';
  parameters: ControlMediaHostParameters;
}

// Export the type definition for the function
export type ControlMediaHostType = (options: ControlMediaHostOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ControlMediaHost {
  /**
   * Controls the media (audio, video, screenshare, chat) of a participant as a host.
   *
   * @param {object} options - The function parameters.
   * @param {string} options.type - The type of media to control ('audio', 'video', 'screenshare', 'chat', 'all').
   * @param {object} options.parameters - Additional parameters needed for the function.
   * @param {boolean} options.parameters.adminRestrictSetting - The setting to restrict host control.
   * @param {function} options.parameters.updateAdminRestrictSetting - Function to update the adminRestrictSetting.
   * @param {MediaStream} options.parameters.localStream - The local audio and video stream.
   * @param {function} options.parameters.updateLocalStream - Function to update the local audio and video stream.
   * @param {boolean} options.parameters.audioAlreadyOn - Indicates whether audio is currently on.
   * @param {function} options.parameters.updateAudioAlreadyOn - Function to update the audioAlreadyOn status.
   * @param {MediaStream} options.parameters.localStreamScreen - The local screenshare stream.
   * @param {function} options.parameters.updateLocalStreamScreen - Function to update the local screenshare stream.
   * @param {MediaStream} options.parameters.localStreamVideo - The local video stream.
   * @param {function} options.parameters.updateLocalStreamVideo - Function to update the local video stream.
   * @param {boolean} options.parameters.screenAlreadyOn - Indicates whether screenshare is currently on.
   * @param {function} options.parameters.updateScreenAlreadyOn - Function to update the screenAlreadyOn status.
   * @param {boolean} options.parameters.videoAlreadyOn - Indicates whether video is currently on.
   * @param {function} options.parameters.updateVideoAlreadyOn - Function to update the videoAlreadyOn status.
   * @param {boolean} options.parameters.chatAlreadyOn - Indicates whether chat is currently on.
   * @param {function} options.parameters.updateChatAlreadyOn - Function to update the chatAlreadyOn status.
   * @param {function} options.parameters.onScreenChanges - Function to handle changes in screen status.
   * @param {function} options.parameters.stopShareScreen - Function to stop sharing the screen.
   * @param {function} options.parameters.disconnectSendTransportVideo - Function to disconnect video send transport.
   * @param {function} options.parameters.disconnectSendTransportAudio - Function to disconnect audio send transport.
   * @param {function} options.parameters.disconnectSendTransportScreen - Function to disconnect screenshare send transport.
   */
  controlMediaHost = async ({ type, parameters }: ControlMediaHostOptions): Promise<void> => {
    let {
      updateAdminRestrictSetting,
      updateLocalStream,
      updateAudioAlreadyOn,
      updateLocalStreamScreen,
      updateLocalStreamVideo,
      updateScreenAlreadyOn,
      updateVideoAlreadyOn,
      updateChatAlreadyOn,
      onScreenChanges,
      stopShareScreen,
      disconnectSendTransportVideo,
      disconnectSendTransportAudio,
      disconnectSendTransportScreen,
    } = parameters;

    let { localStream, localStreamScreen, localStreamVideo } = parameters.getUpdatedAllParams();

    try {
      updateAdminRestrictSetting(true);

      if (type === 'audio') {
        if (localStream) {
          localStream.getAudioTracks()[0].enabled = false;
        }
        updateLocalStream(localStream);
        await disconnectSendTransportAudio({ parameters });
        updateAudioAlreadyOn(false);
      } else if (type === 'video') {
        try {
          if (localStream) {
            localStream.getVideoTracks()[0].enabled = false;
          }
          updateLocalStream(localStream);
          await disconnectSendTransportVideo({ parameters });
          await onScreenChanges({ changed: true, parameters });
          updateVideoAlreadyOn(false);
        } catch {
          /* handle error */
        }
        try {
          if (localStreamVideo) {
            localStreamVideo.getVideoTracks()[0].enabled = false;
            updateLocalStreamVideo(localStreamVideo);
            await disconnectSendTransportVideo({ parameters });
            await onScreenChanges({ changed: true, parameters });
            updateVideoAlreadyOn(false);
          }
        } catch (error) {
          onScreenChanges({ changed: true, parameters });
        }
      } else if (type === 'screenshare') {
        if (localStreamScreen) {
          localStreamScreen.getVideoTracks()[0].enabled = false;
        }
        updateLocalStreamScreen(localStreamScreen);
        await disconnectSendTransportScreen({ parameters });
        await stopShareScreen({ parameters });
        updateScreenAlreadyOn(false);
      } else if (type === 'chat') {
        updateChatAlreadyOn(false);
      } else if (type === 'all') {
        try {
          if (localStream) {
            localStream.getAudioTracks()[0].enabled = false;
          }
          updateLocalStream(localStream);
          await disconnectSendTransportAudio({ parameters });
          updateAudioAlreadyOn(false);
        } catch {
          /* handle error */
        }

        try {
          if (localStreamScreen) {
            localStreamScreen.getVideoTracks()[0].enabled = false;
          }
          updateLocalStreamScreen(localStreamScreen);
          await disconnectSendTransportScreen({ parameters });
          await stopShareScreen({ parameters });
          updateScreenAlreadyOn(false);
        } catch {
          /* handle error */
        }

        try {
          if (localStream) {
            localStream.getVideoTracks()[0].enabled = false;
          }
          updateLocalStream(localStream);
          await disconnectSendTransportVideo({ parameters });
          await onScreenChanges({ changed: true, parameters });
          updateVideoAlreadyOn(false);
        } catch {
          /* handle error */
        }
        try {
          if (localStreamVideo) {
            localStreamVideo.getVideoTracks()[0].enabled = false;
          }
          updateLocalStreamVideo(localStreamVideo);
          await disconnectSendTransportVideo({ parameters });
          await onScreenChanges({ changed: true, parameters });
          updateVideoAlreadyOn(false);
        } catch (error) {
          onScreenChanges({ changed: true, parameters });
        }
      }
    } catch (error) {
      console.error('Error in controlMediaHost:', error);
    }
  };
}
