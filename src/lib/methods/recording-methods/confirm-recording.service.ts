import { Injectable } from '@angular/core';
import {
  ShowAlert,
  MainSpecs,
  DispSpecs,
  TextSpecs,
  EventType,
  UserRecordingParams,
} from '../../@types/types';

export interface ConfirmRecordingParameters {
  showAlert?: ShowAlert;
  recordingMediaOptions: string;
  recordingAudioOptions: string;
  recordingVideoOptions: string;
  recordingVideoType: string;
  recordingDisplayType: 'video' | 'media' | 'all';
  recordingNameTags: boolean;
  recordingBackgroundColor: string;
  recordingNameTagsColor: string;
  recordingOrientationVideo: string;
  recordingAddHLS: boolean;
  recordingAddText: boolean;
  recordingCustomText: string;
  recordingCustomTextPosition: string;
  recordingCustomTextColor: string;
  meetingDisplayType: string;
  recordingVideoParticipantsFullRoomSupport: boolean;
  recordingAllParticipantsSupport: boolean;
  recordingVideoParticipantsSupport: boolean;
  recordingSupportForOtherOrientation: boolean;
  recordingPreferredOrientation: string;
  recordingMultiFormatsSupport: boolean;
  recordingVideoOptimized: boolean;
  recordingAllParticipantsFullRoomSupport: boolean;
  meetingVideoOptimized: boolean;
  eventType: EventType;
  breakOutRoomStarted: boolean;
  breakOutRoomEnded: boolean;
  updateRecordingDisplayType: (value: 'video' | 'media' | 'all') => void;
  updateRecordingVideoOptimized: (value: boolean) => void;
  updateUserRecordingParams: (params: UserRecordingParams) => void;
  updateConfirmedToRecord: (value: boolean) => void;

  // Mediasfu functions
  getUpdatedAllParams: () => ConfirmRecordingParameters;
  [key: string]: any;
}

export interface ConfirmRecordingOptions {
  parameters: ConfirmRecordingParameters;
}

// Export the type definition for the function
export type ConfirmRecordingType = (options: ConfirmRecordingOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ConfirmRecording {
  /**
   * Confirms the recording settings based on the provided parameters and updates the recording state.
   *
   * @param {ConfirmRecordingOptions} options - The options for confirming the recording.
   * @param {Parameters} options.parameters - The parameters for the recording.
   *
   * @returns {Promise<void>} A promise that resolves when the recording settings have been confirmed.
   *
   * @remarks
   * This function performs several checks to ensure that the recording settings are valid based on the provided parameters.
   * If any of the checks fail, an alert is shown and the function returns early without updating the recording state.
   *
   * The function checks for the following conditions:
   * - Whether recording videos of all participants is allowed.
   * - Whether recording all participants is allowed.
   * - Whether recording other video participants is allowed.
   * - Whether recording all orientations is allowed.
   * - Whether recording the preferred orientation is allowed.
   * - Whether recording all formats is allowed.
   * - Whether the recording display type is valid based on the meeting display type.
   * - Whether recording all participants with media is allowed.
   *
   * If all checks pass, the function constructs the `mainSpecs`, `dispSpecs`, and `textSpecs` objects based on the state variables,
   * updates the user recording parameters, and confirms the recording.
   *
   * @example
   * ```typescript
   * const options: ConfirmRecordingOptions = { parameters: someParameters };
   * await confirmRecording(options);
   * ```
   */

  confirmRecording = async ({ parameters }: ConfirmRecordingOptions): Promise<void> => {
    let { getUpdatedAllParams } = parameters;
    parameters = getUpdatedAllParams();

    let {
      showAlert,
      recordingMediaOptions,
      recordingAudioOptions,
      recordingVideoOptions,
      recordingVideoType,
      recordingDisplayType,
      recordingNameTags,
      recordingBackgroundColor,
      recordingNameTagsColor,
      recordingOrientationVideo,
      recordingAddHLS,
      recordingAddText,
      recordingCustomText,
      recordingCustomTextPosition,
      recordingCustomTextColor,
      meetingDisplayType,
      recordingVideoParticipantsFullRoomSupport,
      recordingAllParticipantsSupport,
      recordingVideoParticipantsSupport,
      recordingSupportForOtherOrientation,
      recordingPreferredOrientation,
      recordingMultiFormatsSupport,
      recordingVideoOptimized,
      recordingAllParticipantsFullRoomSupport,
      meetingVideoOptimized,
      eventType,
      breakOutRoomStarted,
      breakOutRoomEnded,

      updateRecordingDisplayType,
      updateRecordingVideoOptimized,
      updateRecordingVideoParticipantsFullRoomSupport,
      updateRecordingAllParticipantsSupport,
      updateRecordingVideoParticipantsSupport,
      updateRecordingSupportForOtherOrientation,
      updateRecordingPreferredOrientation,
      updateRecordingMultiFormatsSupport,
      updateUserRecordingParams,
      updateConfirmedToRecord,
    } = parameters;

    // Retrieve the values from the state

    const mediaOptions = recordingMediaOptions;

    // Other variables not provided in the guide
    const selectedRecordOption = recordingDisplayType;

    // Additional logic similar to the provided guide
    // recordingVideoParticipantsFullRoomSupport = minigrid and main video
    if (eventType !== 'broadcast') {
      if (
        !recordingVideoParticipantsFullRoomSupport &&
        recordingVideoOptions === 'all' &&
        mediaOptions === 'video'
      ) {
        if (meetingDisplayType == 'all') {
          if (breakOutRoomStarted && !breakOutRoomEnded) {
            // breakout rooms are started
          } else {
            showAlert?.({
              message:
                'You are not allowed to record videos of all participants; change the meeting display type to video or video optimized.',
              type: 'danger',
              duration: 3000,
            });

            return;
          }
        }
      }

      // recordingAllParticipantsSupport  = others other than host screen (video + audio)
      if (!recordingAllParticipantsSupport && recordingVideoOptions === 'all') {
        showAlert?.({
          message: 'You are only allowed to record yourself.',
          type: 'danger',
          duration: 3000,
        });

        return;
      }

      // recordingVideoParticipantsSupport (maingrid + non-host screenshare person)
      if (!recordingVideoParticipantsSupport && recordingDisplayType === 'video') {
        showAlert?.({
          message: 'You are not allowed to record other video participants.',
          type: 'danger',
          duration: 3000,
        });

        return;
      }
    }

    if (!recordingSupportForOtherOrientation && recordingOrientationVideo === 'all') {
      showAlert?.({
        message: 'You are not allowed to record all orientations.',
        type: 'danger',
        duration: 3000,
      });

      return;
    }

    if (
      recordingPreferredOrientation === 'landscape' &&
      recordingOrientationVideo === 'portrait' &&
      !recordingSupportForOtherOrientation
    ) {
      showAlert?.({
        message: 'You are not allowed to record portrait orientation.',
        type: 'danger',
        duration: 3000,
      });

      return;
    } else if (
      recordingPreferredOrientation === 'portrait' &&
      recordingOrientationVideo === 'landscape' &&
      !recordingSupportForOtherOrientation
    ) {
      showAlert?.({
        message: 'You are not allowed to record landscape orientation.',
        type: 'danger',
        duration: 3000,
      });

      return;
    }

    if (!recordingMultiFormatsSupport && recordingVideoType === 'all') {
      showAlert?.({
        message: 'You are not allowed to record all formats.',
        type: 'danger',
        duration: 3000,
      });

      return;
    }

    if (eventType !== 'broadcast') {
      if (recordingMediaOptions === 'video') {
        if (meetingDisplayType === 'media') {
          if (recordingDisplayType === 'all') {
            showAlert?.({
              message:
                'Recording display type can be either video, video optimized, or media when meeting display type is media.',
              type: 'danger',
              duration: 3000,
            });

            recordingDisplayType = meetingDisplayType;
            return;
          }
        } else if (meetingDisplayType === 'video') {
          if (recordingDisplayType === 'all' || recordingDisplayType === 'media') {
            showAlert?.({
              message:
                'Recording display type can be either video or video optimized when meeting display type is video.',
              type: 'danger',
              duration: 3000,
            });

            recordingDisplayType = meetingDisplayType;
            return;
          }

          if (meetingVideoOptimized && !recordingVideoOptimized) {
            showAlert?.({
              message:
                'Recording display type can be only video optimized when meeting display type is video optimized.',
              type: 'danger',
              duration: 3000,
            });

            recordingVideoOptimized = meetingVideoOptimized;
            return;
          }
        }
      } else {
        if (recordingDisplayType === 'all' || recordingDisplayType === 'media') {
          // do nothing
        } else {
          recordingDisplayType = 'media';
        }
        recordingVideoOptimized = false;
      }
    }

    if (recordingDisplayType === 'all' && !recordingAllParticipantsFullRoomSupport) {
      showAlert?.({
        message: 'You can only record all participants with media.',
        type: 'danger',
        duration: 3000,
      });

      return;
    }
    // Construct mainSpecs and dispSpecs objects based on the state variables
    const mainSpecs: MainSpecs = {
      mediaOptions: recordingMediaOptions,
      audioOptions: recordingAudioOptions,
      videoOptions: recordingVideoOptions,
      videoType: recordingVideoType,
      videoOptimized: recordingVideoOptimized,
      recordingDisplayType: recordingDisplayType,
      addHLS: recordingAddHLS,
    };

    const dispSpecs: DispSpecs = {
      nameTags: recordingNameTags,
      backgroundColor: recordingBackgroundColor,
      nameTagsColor: recordingNameTagsColor,
      orientationVideo: recordingOrientationVideo,
    };

    const textSpecs: TextSpecs = {
      addText: recordingAddText,
      customText: recordingCustomText,
      customTextPosition: recordingCustomTextPosition,
      customTextColor: recordingCustomTextColor,
    };

    // Construct userRecordingParams object
    const userRecordingParams = { mainSpecs, dispSpecs, textSpecs };
    // Update state variables based on the logic
    updateUserRecordingParams(userRecordingParams);
    updateConfirmedToRecord(true);
    updateRecordingDisplayType(selectedRecordOption);
    updateRecordingVideoOptimized(recordingVideoOptimized);
    updateRecordingVideoParticipantsFullRoomSupport(recordingVideoParticipantsFullRoomSupport);
    updateRecordingAllParticipantsSupport(recordingAllParticipantsSupport);
    updateRecordingVideoParticipantsSupport(recordingVideoParticipantsSupport);
    updateRecordingSupportForOtherOrientation(recordingSupportForOtherOrientation);
    updateRecordingPreferredOrientation(recordingPreferredOrientation);
    updateRecordingMultiFormatsSupport(recordingMultiFormatsSupport);
  };
}
