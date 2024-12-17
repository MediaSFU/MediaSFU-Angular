import { Injectable } from '@angular/core';
import {
  CheckPermissionType,
  DisconnectSendTransportAudioParameters,
  DisconnectSendTransportAudioType,
  Participant,
  RequestPermissionAudioType,
  ResumeSendTransportAudioParameters,
  ResumeSendTransportAudioType,
  ShowAlert,
  StreamSuccessAudioParameters,
  StreamSuccessAudioType,
} from '../../@types/types';
import { Socket } from 'socket.io-client';

/* eslint-disable eqeqeq */
export interface ClickAudioParameters
  extends DisconnectSendTransportAudioParameters,
    ResumeSendTransportAudioParameters,
    StreamSuccessAudioParameters {
  checkMediaPermission: boolean;
  hasAudioPermission: boolean;
  audioPaused: boolean;
  audioAlreadyOn: boolean;
  audioOnlyRoom: boolean;
  recordStarted: boolean;
  recordResumed: boolean;
  recordPaused: boolean;
  recordStopped: boolean;
  recordingMediaOptions: string;
  islevel: string;
  youAreCoHost: boolean;
  adminRestrictSetting: boolean;
  audioRequestState: string | null;
  audioRequestTime: number;
  member: string;
  socket: Socket;
  localSocket?: Socket;
  roomName: string;
  userDefaultAudioInputDevice: string;
  micAction: boolean;
  localStream: MediaStream | null;
  audioSetting: string;
  videoSetting: string;
  screenshareSetting: string;
  chatSetting: string;
  updateRequestIntervalSeconds: number;
  participants: Participant[];
  transportCreated: boolean;
  transportCreatedAudio: boolean;

  updateAudioAlreadyOn: (status: boolean) => void;
  updateAudioRequestState: (state: string | null) => void;
  updateAudioPaused: (status: boolean) => void;
  updateLocalStream: (stream: MediaStream | null) => void;
  updateParticipants: (participants: Participant[]) => void;
  updateTransportCreated: (status: boolean) => void;
  updateTransportCreatedAudio: (status: boolean) => void;
  updateMicAction: (action: boolean) => void;
  showAlert?: ShowAlert;

  // mediasfu functions
  checkPermission: CheckPermissionType;
  streamSuccessAudio: StreamSuccessAudioType;
  disconnectSendTransportAudio: DisconnectSendTransportAudioType;
  requestPermissionAudio: RequestPermissionAudioType;
  resumeSendTransportAudio: ResumeSendTransportAudioType;

  getUpdatedAllParams: () => ClickAudioParameters;
  [key: string]: any;
}

export interface ClickAudioOptions {
  parameters: ClickAudioParameters;
}

// Export the type definition for the function
export type ClickAudioType = (options: ClickAudioOptions) => Promise<void>;

/**
 * Handles the click event for toggling audio in a media session.
 *
 * @param {ClickAudioOptions} options - The parameters required for handling the audio click event.
 * @param {Object} options.parameters - The parameters for toggling audio.
 * @param {boolean} options.parameters.checkMediaPermission - Flag indicating whether to check media permission.
 * @param {boolean} options.parameters.hasAudioPermission - Flag indicating if the user has audio permission.
 * @param {boolean} options.parameters.audioPaused - Flag indicating if audio is paused.
 * @param {boolean} options.parameters.audioAlreadyOn - Flag indicating if audio is already turned on.
 * @param {boolean} options.parameters.audioOnlyRoom - Flag indicating if the room is audio-only.
 * @param {boolean} options.parameters.recordStarted - Flag indicating if recording has started.
 * @param {boolean} options.parameters.recordResumed - Flag indicating if recording has resumed.
 * @param {boolean} options.parameters.recordPaused - Flag indicating if recording is paused.
 * @param {boolean} options.parameters.recordStopped - Flag indicating if recording is stopped.
 * @param {string} options.parameters.recordingMediaOptions - Media options for recording (e.g., "video", "audio").
 * @param {string} options.parameters.islevel - User's level in the application.
 * @param {boolean} options.parameters.youAreCoHost - Flag indicating if the user is a co-host.
 * @param {boolean} options.parameters.adminRestrictSetting - Flag indicating if admin restrictions are set.
 * @param {string | null} options.parameters.audioRequestState - Current state of the audio request.
 * @param {number} options.parameters.audioRequestTime - Timestamp of the audio request.
 * @param {string} options.parameters.member - Current member's name.
 * @param {Socket} options.parameters.socket - The socket instance for communication.
 * @param {Socket} options.parameters.localSocket - The local socket instance for communication.
 * @param {string} options.parameters.roomName - The name of the room.
 * @param {string} options.parameters.userDefaultAudioInputDevice - The default audio input device for the user.
 * @param {boolean} options.parameters.micAction - Flag indicating if the microphone action is in progress.
 * @param {MediaStream | null} options.parameters.localStream - The user's local media stream.
 * @param {string} options.parameters.audioSetting - Current audio setting.
 * @param {string} options.parameters.videoSetting - Current video setting.
 * @param {string} options.parameters.screenshareSetting - Current screenshare setting.
 * @param {string} options.parameters.chatSetting - Current chat setting.
 * @param {number} options.parameters.updateRequestIntervalSeconds - Interval for updating request states.
 * @param {Participant[]} options.parameters.participants - List of participants in the room.
 * @param {boolean} options.parameters.transportCreated - Flag indicating if the transport has been created.
 * @param {boolean} options.parameters.transportCreatedAudio - Flag indicating if audio transport has been created.
 *
 * @returns {Promise<void>} A promise that resolves when the audio click event has been handled.
 *
 * @remarks
 * This function performs the following actions:
 * - If the event is audio-only, it shows an alert and exits.
 * - If the audio is already on, it handles the logic for turning it off, including checking recording states and permissions.
 * - If the audio is off, it checks for admin restrictions, user permissions, and handles the logic for turning the audio on.
 * - It updates various states and emits socket events as necessary.
 *
 * @example
 * ```typescript
 * const options: ClickAudioOptions = {
 *   parameters: {
 *     checkMediaPermission: true,
 *     hasAudioPermission: false,
 *     audioPaused: false,
 *     audioAlreadyOn: false,
 *     audioOnlyRoom: false,
 *     recordStarted: false,
 *     recordResumed: false,
 *     recordPaused: false,
 *     recordStopped: false,
 *     recordingMediaOptions: 'audio',
 *     islevel: '1',
 *     youAreCoHost: false,
 *     adminRestrictSetting: false,
 *     audioRequestState: null,
 *     audioRequestTime: 0,
 *     member: 'John Doe',
 *     socket: socketInstance,
 *     localSocket: socketInstance,
 *     roomName: 'exampleRoom',
 *     userDefaultAudioInputDevice: 'default',
 *     micAction: false,
 *     localStream: null,
 *     audioSetting: 'enabled',
 *     videoSetting: 'disabled',
 *     screenshareSetting: 'disabled',
 *     chatSetting: 'enabled',
 *     updateRequestIntervalSeconds: 30,
 *     participants: [],
 *     transportCreated: false,
 *     transportCreatedAudio: false,
 *     updateAudioAlreadyOn: (status) => console.log(status),
 *     updateAudioRequestState: (state) => console.log(state),
 *     updateAudioPaused: (status) => console.log(status),
 *     updateLocalStream: (stream) => console.log(stream),
 *     updateParticipants: (participants) => console.log(participants),
 *     updateTransportCreated: (status) => console.log(status),
 *     updateTransportCreatedAudio: (status) => console.log(status),
 *     updateMicAction: (action) => console.log(action),
 *     checkPermission: async () => 'granted',
 *     streamSuccessAudio: async () => console.log('Audio streaming success'),
 *     disconnectSendTransportAudio: async () => console.log('Audio transport disconnected'),
 *     requestPermissionAudio: async () => 'granted',
 *     resumeSendTransportAudio: async () => console.log('Audio transport resumed'),
 *   },
 * };
 *
 * const clickAudioService = new ClickAudio();
 * await clickAudioService.clickAudio(options);
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class ClickAudio {
  /**
   * Handles the click event for toggling audio in a media session.
   *
   * @param {ClickAudioOptions} parameters - The parameters required for handling the audio click event.
   * @returns {Promise<void>} A promise that resolves when the audio click event has been handled.
   *
   * The function performs the following actions:
   * - If the event is audio-only, it shows an alert and exits.
   * - If the audio is already on, it handles the logic for turning it off, including checking recording states and permissions.
   * - If the audio is off, it checks for admin restrictions, user permissions, and handles the logic for turning the audio on.
   * - It updates various states and emits socket events as necessary.
   *
   * The function makes use of several helper functions and state update functions passed in through the parameters.
   */

  async clickAudio({ parameters }: ClickAudioOptions): Promise<void> {
    let {
      checkMediaPermission,
      hasAudioPermission,
      audioPaused,
      audioAlreadyOn,
      audioOnlyRoom,
      recordStarted,
      recordResumed,
      recordPaused,
      recordStopped,
      recordingMediaOptions,
      islevel,
      youAreCoHost,
      adminRestrictSetting,
      audioRequestState,
      audioRequestTime,
      member,
      socket,
      localSocket,
      roomName,
      userDefaultAudioInputDevice,
      micAction,
      localStream,
      audioSetting,
      videoSetting,
      screenshareSetting,
      chatSetting,
      updateRequestIntervalSeconds,
      participants,
      showAlert,
      transportCreated,
      transportCreatedAudio,

      updateAudioAlreadyOn,
      updateAudioRequestState,
      updateAudioPaused,
      updateLocalStream,
      updateParticipants,
      updateTransportCreated,
      updateTransportCreatedAudio,
      updateMicAction,

      checkPermission,
      streamSuccessAudio,
      requestPermissionAudio,
      resumeSendTransportAudio,
      disconnectSendTransportAudio,
    } = parameters;

    if (audioOnlyRoom) {
      showAlert?.({
        message: 'You cannot turn on your camera in an audio-only event.',
        type: 'danger',
        duration: 3000,
      });
      return;
    }

    if (audioAlreadyOn) {
      if (islevel === '2' && (recordStarted || recordResumed)) {
        if (!(recordPaused || recordStopped)) {
          if (recordingMediaOptions === 'audio') {
            showAlert?.({
              message:
                'You cannot turn off your audio while recording, please pause or stop recording first.',
              type: 'danger',
              duration: 3000,
            });
            return;
          }
        }
      }

      audioAlreadyOn = false;
      updateAudioAlreadyOn(audioAlreadyOn);
      if (localStream) {
        localStream.getAudioTracks()[0].enabled = false;
      }
      updateLocalStream(localStream);
      await disconnectSendTransportAudio({ parameters }); //disconnect function here actuall calls audioProducer.pause() instead of close() as in mediasfu
      audioPaused = true;
      updateAudioPaused(audioPaused);
    } else {
      if (adminRestrictSetting) {
        showAlert?.({
          message: 'You cannot turn on your microphone. Access denied by host.',
          type: 'danger',
          duration: 3000,
        });
        return;
      }

      let response = 2;
      if (!micAction && islevel !== '2' && !youAreCoHost) {
        response = await checkPermission({
          permissionType: 'audioSetting',
          audioSetting,
          videoSetting,
          screenshareSetting,
          chatSetting,
        });
      } else {
        response = 0;
      }

      switch (response) {
        case 1: {
          if (audioRequestState === 'pending') {
            showAlert?.({
              message: 'A request is pending. Please wait for the host to respond.',
              type: 'danger',
              duration: 3000,
            });
            return;
          }

          showAlert?.({
            message: 'Request sent to host.',
            type: 'success',
            duration: 3000,
          });

          audioRequestState = 'pending';
          updateAudioRequestState(audioRequestState);
          //create a request and add to the request list and send to host

          const userRequest = {
            id: socket.id,
            name: member,
            icon: 'fa-microphone',
          };
          socket.emit('participantRequest', { userRequest, roomName });
          break;
        }

        case 2:
          if (
            audioRequestState === 'rejected' &&
            Date.now() - audioRequestTime < updateRequestIntervalSeconds * 1000
          ) {
            showAlert?.({
              message: `A request was rejected. Please wait for ${updateRequestIntervalSeconds} seconds before sending another request.`,
              type: 'danger',
              duration: 3000,
            });
            return;
          }
          break;

        case 0:
          //allow

          if (audioPaused) {
            if (localStream) {
              localStream.getAudioTracks()[0].enabled = true;
            }
            updateAudioAlreadyOn(true);
            await resumeSendTransportAudio({ parameters });
            socket.emit('resumeProducerAudio', { mediaTag: 'audio', roomName });

            try {
              if (localSocket && localSocket.id){
                  localSocket.emit("resumeProducerAudio", { mediaTag: "audio", roomName });
              }
            } catch (error) {
              console.log("Error in resumeProducerAudio", error);

            }

            updateLocalStream(localStream);


            if (micAction == true) {
              micAction = false;
              updateMicAction(micAction);
            }

            participants.forEach((participant) => {
              if (participant['socketId'] === socket.id && participant.name === member) {
                participant.muted = false;
              }
            });
            updateParticipants(participants);

            transportCreated = true;
            updateTransportCreated(transportCreated);

            transportCreatedAudio = true;
            updateTransportCreatedAudio(transportCreatedAudio);
          } else {
            if (!hasAudioPermission && checkMediaPermission) {
              const statusMic = await requestPermissionAudio();
              if (statusMic !== 'granted') {
                showAlert?.({
                  message:
                    'Allow access to your microphone or check if your microphone is not being used by another application.',
                  type: 'danger',
                  duration: 3000,
                });
                return;
              }
            }

            const mediaConstraints = userDefaultAudioInputDevice
              ? { audio: { deviceId: userDefaultAudioInputDevice }, video: false }
              : { audio: true, video: false };

            try {
              const stream = await navigator.mediaDevices.getUserMedia(mediaConstraints);
              await streamSuccessAudio({ stream, parameters });
            } catch (error) {
              console.error(error);
              showAlert?.({
                message:
                  'Allow access to your microphone or check if your microphone is not being used by another application.',
                type: 'danger',
                duration: 3000,
              });
            }
          }
          break;

        default:
      }
    }
  }
}
