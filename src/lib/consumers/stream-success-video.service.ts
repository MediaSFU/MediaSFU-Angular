import { Injectable } from '@angular/core';
import { types } from 'mediasoup-client';
type Device = types.Device;
type ProducerOptions = types.ProducerOptions;
type Producer = types.Producer;
type RtpCodecCapability = types.RtpCodecCapability;
import { Socket } from 'socket.io-client';
import {
  ConnectSendTransportVideoParameters,
  Participant,
  ShowAlert,
  CreateSendTransportParameters,
  ReorderStreamsParameters,
  SleepType,
  CreateSendTransportType,
  ConnectSendTransportVideoType,
  ReorderStreamsType,
  VParamsType,
  HParamsType,
} from '../@types/types';

export interface StreamSuccessVideoParameters
  extends CreateSendTransportParameters,
    ConnectSendTransportVideoParameters,
    ReorderStreamsParameters {
  socket: Socket;
  participants: Participant[];
  localStream: MediaStream | null;
  transportCreated: boolean;
  transportCreatedVideo: boolean;
  videoAlreadyOn: boolean;
  videoAction: boolean;
  videoParams: ProducerOptions;
  localStreamVideo: MediaStream | null;
  defVideoID: string;
  userDefaultVideoInputDevice: string;
  params: ProducerOptions;
  videoParamse?: ProducerOptions;
  islevel: string;
  member: string;
  updateMainWindow: boolean;
  lock_screen: boolean;
  shared: boolean;
  shareScreenStarted: boolean;
  vParams: VParamsType;
  hParams: HParamsType;
  allowed: boolean;
  currentFacingMode: string;
  device: Device | null;
  keepBackground: boolean;
  appliedBackground: boolean;
  videoProducer: Producer | null;

  // Update functions
  updateTransportCreated: (created: boolean) => void;
  updateTransportCreatedVideo: (created: boolean) => void;
  updateVideoAlreadyOn: (videoOn: boolean) => void;
  updateVideoAction: (videoAction: boolean) => void;
  updateLocalStream: (stream: MediaStream | null) => void;
  updateLocalStreamVideo: (stream: MediaStream | null) => void;
  updateUserDefaultVideoInputDevice: (device: string) => void;
  updateCurrentFacingMode: (mode: string) => void;
  updateDefVideoID: (id: string) => void;
  updateAllowed: (allowed: boolean) => void;
  updateUpdateMainWindow: (updateMainWindow: boolean) => void;
  updateParticipants: (participants: Participant[]) => void;
  updateVideoParams: (params: ProducerOptions) => void;
  updateIsBackgroundModalVisible: (isVisible: boolean) => void;
  updateAutoClickBackground: (autoClick: boolean) => void;

  showAlert?: ShowAlert;

  // Media functions
  createSendTransport: CreateSendTransportType;
  connectSendTransportVideo: ConnectSendTransportVideoType;
  reorderStreams: ReorderStreamsType;
  sleep: SleepType;

  getUpdatedAllParams: () => StreamSuccessVideoParameters;
  [key: string]: any;
}

export interface StreamSuccessVideoOptions {
  stream: MediaStream;
  parameters: StreamSuccessVideoParameters;
}

// Export the type definition for the function
export type StreamSuccessVideoType = (options: StreamSuccessVideoOptions) => Promise<void>;

/**
 * Streams a video successfully by managing the local stream, updating parameters, and handling video transport.
 *
 * This method initiates the video streaming process by updating the local video stream with the new stream,
 * creating or connecting to the video transport, and notifying participants of the streaming status.
 *
 * @param {StreamSuccessVideoOptions} options - The options for streaming the video.
 * @param {MediaStream} options.stream - The media stream to be used for the video.
 * @param {StreamSuccessVideoParameters} options.parameters - The parameters required for streaming.
 * @param {Socket} options.parameters.socket - The socket instance for real-time communication.
 * @param {Participant[]} options.parameters.participants - The list of participants in the session.
 * @param {MediaStream | null} options.parameters.localStream - The local media stream.
 * @param {boolean} options.parameters.transportCreated - Indicates if the transport has already been created.
 * @param {boolean} options.parameters.transportCreatedVideo - Indicates if the video transport has been created.
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
 * @param {boolean} options.parameters.videoAction - Indicates if a video action is being performed.
 * @param {ProducerOptions} options.parameters.videoParams - The parameters for the video producer.
 * @param {MediaStream | null} options.parameters.localStreamVideo - The local video stream.
 * @param {string} options.parameters.defVideoID - The default video device ID.
 * @param {string} options.parameters.userDefaultVideoInputDevice - The user's default video input device.
 * @param {ProducerOptions} options.parameters.params - Additional parameters for the producer.
 * @param {ProducerOptions} options.parameters.videoParamse - Additional parameters for the video.
 * @param {string} options.parameters.islevel - The level of the user (e.g., host, participant).
 * @param {string} options.parameters.member - The member's name in the session.
 * @param {boolean} options.parameters.updateMainWindow - Indicates if the main window should be updated.
 * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
 * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
 * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
 * @param {Function} options.parameters.showAlert - Function to show alert messages.
 * @param {Function} options.parameters.updateParticipants - Function to update the participants list.
 * @param {Function} options.parameters.updateTransportCreated - Function to update the transport creation state.
 * @param {Function} options.parameters.updateTransportCreatedVideo - Function to update the transport creation state.
 * @param {Function} options.parameters.updateVideoAlreadyOn - Function to update the video status.
 * @param {Function} options.parameters.updateVideoAction - Function to update the video action state.
 * @param {Function} options.parameters.updateLocalStream - Function to update the local stream.
 * @param {Function} options.parameters.updateLocalStreamVideo - Function to update the local video stream.
 * @param {Function} options.parameters.updateUserDefaultVideoInputDevice - Function to update the default video input device.
 * @param {Function} options.parameters.updateCurrentFacingMode - Function to update the current facing mode.
 * @param {Function} options.parameters.updateDefVideoID - Function to update the default video device ID.
 * @param {Function} options.parameters.updateAllowed - Function to update the allowed state.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window state.
 * @param {Function} options.parameters.createSendTransport - Function to create a send transport for video.
 * @param {Function} options.parameters.connectSendTransportVideo - Function to connect the send transport for video.
 * @param {Function} options.parameters.resumeSendTransportAudio - Function to resume audio transport.
 *
 * @returns {Promise<void>} A promise that resolves when the video has been successfully streamed.
 *
 * @throws {Error} Throws an error if there is an issue with streaming the video.
 *
 * @example
 * await streamSuccessVideo({
 *   stream: newVideoStream,
 *   parameters: {
 *     socket: socketInstance,
 *     localStream: null,
 *     // other parameters...
 *   },
 * });
 */

@Injectable({
  providedIn: 'root',
})
export class StreamSuccessVideo {
  /**
   * Streams a video successfully by managing the local stream, updating parameters, and handling video transport.
   *
   * @param {StreamSuccessVideoOptions} options - The options for streaming the video.
   * @param {MediaStream} options.stream - The media stream to be used for the video.
   * @param {Object} options.parameters - The parameters required for streaming.
   * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
   *
   * @returns {Promise<void>} A promise that resolves when the video has been successfully streamed.
   *
   * @throws Will throw an error if there is an issue with streaming the video.
   */
  streamSuccessVideo = async ({ stream, parameters }: StreamSuccessVideoOptions): Promise<void> => {
    let { getUpdatedAllParams } = parameters;
    parameters = getUpdatedAllParams();

    try {
      let {
        socket,
        participants,
        localStream,
        transportCreated,
        transportCreatedVideo,
        videoAlreadyOn,
        videoAction,
        videoParams,
        localStreamVideo,
        defVideoID,
        userDefaultVideoInputDevice,
        params,
        videoParamse,
        islevel,
        member,
        updateMainWindow,
        lock_screen,
        shared,
        shareScreenStarted,
        vParams,
        hParams,
        allowed,
        currentFacingMode,
        device,
        keepBackground,
        appliedBackground,
        videoProducer,

        // update functions
        updateTransportCreated,
        updateTransportCreatedVideo,
        updateVideoAlreadyOn,
        updateVideoAction,
        updateLocalStream,
        updateLocalStreamVideo,
        updateUserDefaultVideoInputDevice,
        updateCurrentFacingMode,
        updateDefVideoID,
        updateAllowed,
        updateUpdateMainWindow,
        updateParticipants,
        updateVideoParams,
        updateIsBackgroundModalVisible,
        updateAutoClickBackground,

        // mediasfu functions
        createSendTransport,
        connectSendTransportVideo,
        showAlert,
        reorderStreams,
        sleep,
      } = parameters;

      localStreamVideo = stream;
      updateLocalStreamVideo(localStreamVideo);

      // Add the video stream track to localStream
      if (localStream == null) {
        localStream = new MediaStream([localStreamVideo.getVideoTracks()[0]]);
        updateLocalStream(localStream);
      } else {
        // Remove all video tracks that are currently in the localStream
        localStream.getVideoTracks().forEach((track: MediaStreamTrack) => {
          localStream?.removeTrack(track);
        });
        // Add the new video track to the localStream
        localStream.addTrack(localStreamVideo.getVideoTracks()[0]);
        updateLocalStream(localStream);
      }

      // Get the video track settings
      const videoTracked = localStream.getVideoTracks()[0];
      defVideoID = videoTracked.getSettings().deviceId ?? '';
      userDefaultVideoInputDevice = defVideoID;
      currentFacingMode = videoTracked.getSettings().facingMode ?? 'user';

      // Update the state variables
      if (defVideoID) {
        updateDefVideoID(defVideoID);
      }
      if (userDefaultVideoInputDevice) {
        updateUserDefaultVideoInputDevice(userDefaultVideoInputDevice);
      }
      if (currentFacingMode) {
        updateCurrentFacingMode(currentFacingMode);
      }

      allowed = true;
      updateAllowed(allowed);

      try {
        // Apply the video constraints
        if (islevel == '2') {
          if (!shared || !shareScreenStarted) {
            params = hParams;
            videoParamse = { ...params };
          } else {
            params = vParams;
            videoParamse = { ...params };
          }
        } else {
          params = vParams;
          videoParamse = { ...params };
        }

        // Remove VP9 codec from the video codecs; support only VP8 and H264
        let codec = device?.rtpCapabilities?.codecs?.filter(
          (codec: RtpCodecCapability) =>
            codec.mimeType.toLowerCase() !== 'video/vp9' && codec.kind === 'video',
        );

        // Create transport if not created else connect transport
        if (codec && codec.length > 0) {
          videoParams = {
            track: localStream.getVideoTracks()[0],
            ...videoParamse,
            codec: codec[0],
          };
        } else {
          throw new Error('No suitable video codec found');
        }
        updateVideoParams(videoParams);

        if (keepBackground && appliedBackground) {
          videoAlreadyOn = true;
          updateVideoAlreadyOn(videoAlreadyOn);

          updateAutoClickBackground(true);
          updateIsBackgroundModalVisible(true);
          await sleep({ ms: 500 });
          updateIsBackgroundModalVisible(false);
          updateAutoClickBackground(false);
        } else {
          if (!transportCreated) {
            try {
              await createSendTransport({
                parameters: {
                  ...parameters,
                  videoParams: videoParams,
                },
                option: 'video',
              });
            } catch (error) {
              console.log('Error creating send transport:', error);
            }
          } else {
            try {
              videoProducer?.close();
              await sleep({ ms: 500 });
            } catch {
              /* handle error */
            }
            await connectSendTransportVideo({
              parameters: parameters,
              videoParams: videoParams,
            });
          }
        }
      } catch (error: any) {
        showAlert?.({
          message: error.message,
          type: 'danger',
          duration: 3000,
        });
      }

      // Update the videoAlreadyOn state
      videoAlreadyOn = true;
      updateVideoAlreadyOn(videoAlreadyOn);

      // If user requested to share video, update the videoAction state
      if (videoAction) {
        videoAction = false;
        updateVideoAction(videoAction);
      }

      // Update the display screen if host
      if (islevel == '2') {
        updateMainWindow = true;
        updateUpdateMainWindow(updateMainWindow);
      }

      // Update the participants array to reflect the change
      participants.forEach((participant: any) => {
        if (participant.socketId == socket.id && participant.name == member) {
          participant.videoOn = true;
        }
      });
      updateParticipants(participants);

      // Update the transport created state
      transportCreatedVideo = true;
      transportCreated = true;
      updateTransportCreated(transportCreated);
      updateTransportCreatedVideo(transportCreatedVideo);

      // Reupdate the screen display
      if (lock_screen) {
        try {
          await reorderStreams({
            add: true,
            screenChanged: true,
            parameters: { ...parameters, videoAlreadyOn },
          });
        } catch (error) {
          console.log('Error reordering streams with lock screen:', error);
        }
      } else {
        try {
          await reorderStreams({
            add: false,
            screenChanged: true,
            parameters: { ...parameters, videoAlreadyOn },
          });
        } catch (error) {
          console.log('Error reordering streams without lock screen:', error);
        }
      }
    } catch (error: any) {
      const { showAlert } = parameters;
      console.log('Error in streamSuccessVideo:', error);
      showAlert?.({
        message: error.message,
        type: 'danger',
        duration: 3000,
      });
    }
  };
}
