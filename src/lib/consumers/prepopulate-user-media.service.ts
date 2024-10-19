import { Injectable } from '@angular/core';
import { MiniCard } from '../components/display-components/mini-card/mini-card.component';
import { VideoCard } from '../components/display-components/video-card/video-card.component';
import { AudioCard } from '../components/display-components/audio-card/audio-card.component';
import {
  Participant,
  Stream,
  AudioCardParameters,
  EventType,
  CustomMediaComponent,
} from '../@types/types';

export interface PrepopulateUserMediaParameters extends AudioCardParameters {
  participants: Participant[];
  allVideoStreams: (Stream | Participant)[];
  islevel: string;
  member: string;
  shared: boolean;
  shareScreenStarted: boolean;
  eventType: EventType;
  screenId?: string;
  forceFullDisplay: boolean;
  updateMainWindow: boolean;
  mainScreenFilled: boolean;
  adminOnMainScreen: boolean;
  mainScreenPerson: string;
  videoAlreadyOn: boolean;
  audioAlreadyOn: boolean;
  oldAllStreams: (Stream | Participant)[];
  checkOrientation: () => string;
  screenForceFullDisplay: boolean;
  localStreamScreen: MediaStream | null;
  remoteScreenStream: Stream[];
  localStreamVideo: MediaStream | null;
  mainHeightWidth: number;
  isWideScreen: boolean;
  localUIMode: boolean;
  whiteboardStarted: boolean;
  whiteboardEnded: boolean;
  virtualStream: MediaStream | null;
  keepBackground: boolean;
  annotateScreenStream: boolean;
  updateMainScreenPerson: (person: string) => void;
  updateMainScreenFilled: (filled: boolean) => void;
  updateAdminOnMainScreen: (admin: boolean) => void;
  updateMainHeightWidth: (heightWidth: number) => void;
  updateScreenForceFullDisplay: (force: boolean) => void;
  updateUpdateMainWindow: (update: boolean) => void;
  updateMainGridStream: (components: CustomMediaComponent[]) => void;

  // mediasfu functions
  getUpdatedAllParams: () => PrepopulateUserMediaParameters;
  [key: string]: any;
}

export interface PrepopulateUserMediaOptions {
  name: string;
  parameters: PrepopulateUserMediaParameters;
}

// Export the type definition for the function
export type PrepopulateUserMediaType = (options: {
  name: string;
  parameters: any;
}) => Promise<{ component: any; inputs: any }[] | void>;

@Injectable({
  providedIn: 'root',
})
export class PrepopulateUserMedia {
  /**
   * Prepopulates the user media based on the provided options.
   *
   * @param {PrepopulateUserMediaOptions} options - The options for prepopulating user media.
   * @param {string} options.name - The name of the user.
   * @param {Parameters} options.parameters - The parameters for prepopulating user media.
   * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
   * @param {Array<Participant>} options.parameters.participants - List of participants.
   * @param {Array<Stream>} options.parameters.allVideoStreams - List of all video streams.
   * @param {string} options.parameters.islevel - The level of the user.
   * @param {string} options.parameters.member - The member name.
   * @param {boolean} options.parameters.shared - Indicates if the screen is shared.
   * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
   * @param {string} options.parameters.eventType - The type of event.
   * @param {string} options.parameters.screenId - The screen ID.
   * @param {boolean} options.parameters.forceFullDisplay - Indicates if full display is forced.
   * @param {Function} options.parameters.updateMainWindow - Function to update the main window.
   * @param {boolean} options.parameters.mainScreenFilled - Indicates if the main screen is filled.
   * @param {boolean} options.parameters.adminOnMainScreen - Indicates if admin is on the main screen.
   * @param {string} options.parameters.mainScreenPerson - The person on the main screen.
   * @param {boolean} options.parameters.videoAlreadyOn - Indicates if the video is already on.
   * @param {boolean} options.parameters.audioAlreadyOn - Indicates if the audio is already on.
   * @param {Array<Stream>} options.parameters.oldAllStreams - List of old all streams.
   * @param {Function} options.parameters.checkOrientation - Function to check orientation.
   * @param {boolean} options.parameters.screenForceFullDisplay - Indicates if screen force full display is enabled.
   * @param {Stream} options.parameters.localStreamScreen - The local screen stream.
   * @param {Array<Stream>} options.parameters.remoteScreenStream - List of remote screen streams.
   * @param {Stream} options.parameters.localStreamVideo - The local video stream.
   * @param {number} options.parameters.mainHeightWidth - The main height and width.
   * @param {boolean} options.parameters.isWideScreen - Indicates if the screen is wide.
   * @param {boolean} options.parameters.localUIMode - Indicates if local UI mode is enabled.
   * @param {boolean} options.parameters.whiteboardStarted - Indicates if whiteboard has started.
   * @param {boolean} options.parameters.whiteboardEnded - Indicates if whiteboard has ended.
   * @param {Stream} options.parameters.virtualStream - The virtual stream.
   * @param {boolean} options.parameters.keepBackground - Indicates if background should be kept.
   * @param {Stream} options.parameters.annotateScreenStream - The annotate screen stream.
   * @param {Function} options.parameters.updateMainScreenPerson - Function to update the main screen person.
   * @param {Function} options.parameters.updateMainScreenFilled - Function to update if the main screen is filled.
   * @param {Function} options.parameters.updateAdminOnMainScreen - Function to update if admin is on the main screen.
   * @param {Function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
   * @param {Function} options.parameters.updateScreenForceFullDisplay - Function to update screen force full display.
   * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window update status.
   * @param {Function} options.parameters.updateMainGridStream - Function to update the main grid stream.
   *
   * @returns {Promise<{ component: any, inputs: any }[] | void>} A promise that resolves with the components and inputs or void.
   */
  prepopulateUserMedia = async ({
    name,
    parameters,
  }: PrepopulateUserMediaOptions): Promise<{ component: any; inputs: any }[] | void> => {
    try {
      // Destructure parameters

      let { getUpdatedAllParams } = parameters;
      parameters = getUpdatedAllParams();

      let {
        participants,
        allVideoStreams,
        islevel,
        member,
        shared,
        shareScreenStarted,
        eventType,
        screenId,
        forceFullDisplay,
        updateMainWindow,
        mainScreenFilled,
        adminOnMainScreen,
        mainScreenPerson,
        videoAlreadyOn,
        audioAlreadyOn,
        oldAllStreams,
        checkOrientation,
        screenForceFullDisplay,

        localStreamScreen,
        remoteScreenStream,
        localStreamVideo,
        mainHeightWidth,
        isWideScreen,
        localUIMode,
        whiteboardStarted,
        whiteboardEnded,

        virtualStream,
        keepBackground,
        annotateScreenStream,

        updateMainScreenPerson,
        updateMainScreenFilled,
        updateAdminOnMainScreen,
        updateMainHeightWidth,
        updateScreenForceFullDisplay,
        updateUpdateMainWindow,
        updateMainGridStream,
      } = parameters;

      // If the event type is 'chat', return early
      if (eventType == 'chat') {
        return;
      }

      // Initialize variables
      let host: Participant | null;
      let hostStream: any;
      let newComponents: { component: any; inputs: any }[] = [];

      // Check if screen sharing is started or shared
      if (shareScreenStarted || shared) {
        // Handle main grid visibility based on the event type
        if (eventType == 'conference') {
          if (shared || shareScreenStarted) {
            if (mainHeightWidth == 0) {
              // Add the main grid if not present
              updateMainHeightWidth(84);
            }
          } else {
            // Remove the main grid if not shared or started
            updateMainHeightWidth(0);
          }
        }

        // Switch display to optimize for screen share
        screenForceFullDisplay = forceFullDisplay;

        updateScreenForceFullDisplay(screenForceFullDisplay);

        // Get the orientation and adjust forceFullDisplay
        let orientation = checkOrientation();
        if (orientation == 'portrait' || !isWideScreen) {
          if (shareScreenStarted || shared) {
            screenForceFullDisplay = false;
            updateScreenForceFullDisplay(screenForceFullDisplay);
          }
        }

        // Check if the user is sharing the screen
        if (shared) {
          // User is sharing
          host = { name: member, audioID: '', videoID: '' };
          hostStream = localStreamScreen;

          // Update admin on the main screen
          adminOnMainScreen = islevel == '2';
          updateAdminOnMainScreen(adminOnMainScreen);

          // Update main screen person
          mainScreenPerson = host.name || '';
          updateMainScreenPerson(mainScreenPerson);
        } else {
          //someone else is sharing
          host =
            participants.find(
              (participant: Participant) =>
                participant.ScreenID == screenId && participant.ScreenOn == true,
            ) ?? null;

          if (whiteboardStarted && !whiteboardEnded) {
            host = { name: 'WhiteboardActive', islevel: '2', audioID: '', videoID: '' };
            hostStream = { producerId: 'WhiteboardActive' };
          }

          if (host == null) {
            // remoteScreenStream
            host =
              participants.find((participant: Participant) => participant.ScreenOn == true) ?? null;
          }

          // check remoteScreenStream
          if (host != null && !host?.name?.includes('WhiteboardActive')) {
            if (remoteScreenStream.length == 0) {
              hostStream =
                allVideoStreams.find(
                  (stream: Stream | Participant) => stream.producerId == host?.ScreenID,
                ) ?? null;
            } else {
              hostStream = remoteScreenStream[0];
            }
          }

          // Update admin on the main screen
          adminOnMainScreen = (host && host.islevel == '2') ?? false;
          updateAdminOnMainScreen(adminOnMainScreen);

          // Update main screen person
          mainScreenPerson = host?.name ?? '';
          updateMainScreenPerson(mainScreenPerson);
        }
      } else {
        // Screen share not started
        if (eventType == 'conference') {
          // No main grid for conferences
          return;
        }

        // Find the host with level '2'
        host = participants.find((participant: Participant) => participant.islevel == '2') ?? null;

        // Update main screen person
        mainScreenPerson = host?.name ?? '';
        updateMainScreenPerson(mainScreenPerson);
      }

      // If host is not null, check if host videoIsOn
      if (host) {
        // Populate the main screen with the host video
        if (shareScreenStarted || shared) {
          forceFullDisplay = screenForceFullDisplay;
          if (whiteboardStarted && !whiteboardEnded) {
            // Whiteboard is active
          } else {
            newComponents.push({
              component: VideoCard,
              inputs: {
                videoStream: shared ? hostStream : hostStream.stream,
                remoteProducerId: host.ScreenID,
                eventType,
                forceFullDisplay: annotateScreenStream && shared ? false : forceFullDisplay,
                customStyle: {
                  border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                },
                participant: host,
                backgroundColor: 'rgba(217, 227, 234, 0.99)',
                showControls: false,
                showInfo: true,
                name: host.name,
                doMirror: false,
                parameters,
              },
            });
          }

          updateMainGridStream(newComponents);

          mainScreenFilled = true;
          updateMainScreenFilled(mainScreenFilled);
          adminOnMainScreen = host.islevel == '2';
          updateAdminOnMainScreen(adminOnMainScreen);
          mainScreenPerson = host.name ?? '';
          updateMainScreenPerson(mainScreenPerson);

          return newComponents;
        }

        // Check if video is already on or not
        if (
          (islevel != '2' && !host['videoOn']) ||
          (islevel == '2' && (!host['videoOn'] || !videoAlreadyOn)) ||
          localUIMode == true
        ) {
          // Video is off
          if (islevel == '2' && videoAlreadyOn) {
            // Admin's video is on
            newComponents.push({
              component: VideoCard,
              inputs: {
                videoStream: keepBackground && virtualStream ? virtualStream : localStreamVideo,
                remoteProducerId: host.videoID,
                eventType,
                forceFullDisplay,
                customStyle: {
                  border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                },
                participant: host,
                backgroundColor: 'rgba(217, 227, 234, 0.99)',
                showControls: false,
                showInfo: true,
                name: host.name,
                doMirror: true,
                parameters,
              },
            });
            updateMainGridStream(newComponents);

            mainScreenFilled = true;
            updateMainScreenFilled(mainScreenFilled);
            adminOnMainScreen = true;
            updateAdminOnMainScreen(adminOnMainScreen);
            mainScreenPerson = host.name ?? '';
            updateMainScreenPerson(mainScreenPerson);
          } else {
            // Video is off and not admin
            let audOn;

            if (islevel == '2' && audioAlreadyOn) {
              audOn = true;
            } else {
              if (host != null && islevel != '2') {
                audOn = host['muted'] == false;
              }
            }

            if (audOn) {
              // Audio is on
              try {
                newComponents.push({
                  component: AudioCard,
                  inputs: {
                    name: host.name,
                    barColor: 'red',
                    textColor: 'white',
                    customStyle: {
                      backgroundColor: 'transparent',
                      border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                    },
                    controlsPosition: 'topLeft',
                    infoPosition: 'topRight',
                    showWaveform: true,
                    roundedImage: true,
                    parameters: parameters,
                    showControls: false,
                    backgroundColor: 'transparent',
                  },
                });

                updateMainGridStream(newComponents);
              } catch (error) {
                // Handle audio card creation error
              }

              mainScreenFilled = true;
              updateMainScreenFilled(mainScreenFilled);
              adminOnMainScreen = islevel == '2';
              updateAdminOnMainScreen(adminOnMainScreen);
              mainScreenPerson = host.name ?? '';
              updateMainScreenPerson(mainScreenPerson);
            } else {
              // Audio is off
              try {
                newComponents.push({
                  component: MiniCard,
                  inputs: {
                    initials: name,
                    fontSize: 20,
                    customStyle: {
                      backgroundColor: 'transparent',
                      border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                    },
                  },
                });
                updateMainGridStream(newComponents);
              } catch (error) {
                // Handle mini card creation error
              }

              mainScreenFilled = false;
              updateMainScreenFilled(mainScreenFilled);
              adminOnMainScreen = islevel == '2';
              updateAdminOnMainScreen(adminOnMainScreen);
              mainScreenPerson = host.name ?? '';
              updateMainScreenPerson(mainScreenPerson);
            }
          }
        } else {
          // Video is on
          if (shareScreenStarted || shared) {
            // Screen share is on
            if (whiteboardStarted && !whiteboardEnded) {
              // Whiteboard is active
            } else {
              try {
                newComponents.push({
                  component: VideoCard,
                  inputs: {
                    videoStream: shared ? hostStream : hostStream.stream,
                    remoteProducerId: host.ScreenID,
                    eventType,
                    forceFullDisplay,
                    customStyle: {
                      border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                    },
                    participant: host,
                    backgroundColor: 'rgba(217, 227, 234, 0.99)',
                    showControls: false,
                    showInfo: true,
                    name: host.name,
                    doMirror: false,
                    parameters,
                  },
                });

                updateMainGridStream(newComponents);

                mainScreenFilled = true;
                updateMainScreenFilled(mainScreenFilled);
                adminOnMainScreen = host.islevel == '2';
                updateAdminOnMainScreen(adminOnMainScreen);
                mainScreenPerson = host.name ?? '';
                updateMainScreenPerson(mainScreenPerson);
              } catch (error) {
                // Handle video card creation error
              }
            }
          } else {
            // Screen share is off
            let streame;
            if (islevel == '2') {
              host['stream'] = keepBackground && virtualStream ? virtualStream : localStreamVideo;
            } else {
              streame = oldAllStreams.find(
                (streame: Stream | Participant) => streame.producerId == host.videoID,
              );
              host['stream'] = streame && streame.stream;
            }

            try {
              if (host['stream']) {
                newComponents.push({
                  component: VideoCard,
                  inputs: {
                    videoStream: host['stream'],
                    remoteProducerId: host.videoID,
                    eventType,
                    forceFullDisplay,
                    customStyle: {
                      border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                    },
                    participant: host,
                    backgroundColor: 'rgba(217, 227, 234, 0.99)',
                    showControls: false,
                    showInfo: true,
                    name: host.name,
                    doMirror: member == host.name,
                    parameters,
                  },
                });

                updateMainGridStream(newComponents);

                mainScreenFilled = true;
                adminOnMainScreen = host.islevel == '2';
                mainScreenPerson = host.name ?? '';
              } else {
                newComponents.push({
                  component: MiniCard,
                  inputs: {
                    initials: name,
                    fontSize: 20,
                    customStyle: {
                      backgroundColor: 'transparent',
                      border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
                    },
                  },
                });

                updateMainGridStream(newComponents);
                mainScreenFilled = false;
                adminOnMainScreen = islevel == '2';
                mainScreenPerson = host.name ?? '';
              }

              updateMainScreenFilled(mainScreenFilled);

              updateAdminOnMainScreen(adminOnMainScreen);

              updateMainScreenPerson(mainScreenPerson);
            } catch (error) {
              // Handle video card creation error
            }
          }
        }
      } else {
        // Host is null, add a mini card
        try {
          newComponents.push({
            component: MiniCard,
            inputs: {
              initials: name,
              fontSize: 20,
              customStyle: {
                backgroundColor: 'transparent',
                border: eventType !== 'broadcast' ? '2px solid black' : '0px solid black',
              },
            },
          });

          updateMainGridStream(newComponents);

          mainScreenFilled = false;
          adminOnMainScreen = false;
          mainScreenPerson = '';
          updateMainScreenFilled(mainScreenFilled);
          updateAdminOnMainScreen(adminOnMainScreen);
          updateMainScreenPerson(mainScreenPerson);
        } catch (error) {
          // Handle mini card creation error
        }
      }

      updateMainWindow = false;
      updateUpdateMainWindow(updateMainWindow);

      return newComponents;
    } catch (error: any) {
      // Handle errors during the process of preparing and populating the main screen
      console.log('Error preparing and populating the main screen:', error.message);
      return [];
    }
  };
}
