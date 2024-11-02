import { Injectable } from '@angular/core';
import { SoundPlayer } from '../../methods/utils/sound-player.service';

import { EventType, UserRecordingParams } from '../../@types/types';

export interface RecordingNoticeParameters {
  islevel: string;
  userRecordingParams: UserRecordingParams;
  recordElapsedTime: number;
  recordStartTime: number;
  recordStarted: boolean;
  recordPaused: boolean;
  canLaunchRecord: boolean;
  stopLaunchRecord: boolean;
  recordStopped: boolean;
  isTimerRunning: boolean;
  canPauseResume: boolean;
  eventType: EventType;

  updateRecordingProgressTime: (time: string) => void;
  updateShowRecordButtons: (show: boolean) => void;
  updateUserRecordingParams: (params: UserRecordingParams) => void;
  updateRecordingMediaOptions: (options: string) => void;
  updateRecordingAudioOptions: (options: string) => void;
  updateRecordingVideoOptions: (options: string) => void;
  updateRecordingVideoType: (type: string) => void;
  updateRecordingVideoOptimized: (optimized: boolean) => void;
  updateRecordingDisplayType: (type: 'video' | 'media' | 'all') => void;
  updateRecordingAddHLS: (addHLS: boolean) => void;
  updateRecordingNameTags: (nameTags: boolean) => void;
  updateRecordingBackgroundColor: (color: string) => void;
  updateRecordingNameTagsColor: (color: string) => void;
  updateRecordingOrientationVideo: (orientation: string) => void;
  updateRecordingAddText: (addText: boolean) => void;
  updateRecordingCustomText: (text: string) => void;
  updateRecordingCustomTextPosition: (position: string) => void;
  updateRecordingCustomTextColor: (color: string) => void;
  updatePauseRecordCount: (count: number) => void;
  updateRecordElapsedTime: (time: number) => void;
  updateRecordStarted: (started: boolean) => void;
  updateRecordPaused: (paused: boolean) => void;
  updateCanLaunchRecord: (canLaunch: boolean) => void;
  updateStopLaunchRecord: (stop: boolean) => void;
  updateRecordStopped: (stopped: boolean) => void;
  updateIsTimerRunning: (running: boolean) => void;
  updateCanPauseResume: (canPause: boolean) => void;
  updateRecordStartTime: (startTime: number) => void;
  updateRecordState: (state: string) => void;

  // mediasfu functions
  [key: string]: any;
}

export interface RecordingNoticeOptions {
  state: string;
  userRecordingParam: UserRecordingParams | null;
  pauseCount: number;
  timeDone: number;
  parameters: RecordingNoticeParameters;
}

// Export the type definition for the function
export type RecordingNoticeType = (options: RecordingNoticeOptions) => Promise<void>;

/**
 * Service for handling recording notices, managing recording states, and updating related parameters.
 *
 * @class
 * @name RecordingNotice
 * @description Provides methods to handle the recording notice state, manage user recording parameters, and play appropriate sounds for different states.
 *
 * @method
 * RecordingNotice
 *
 * @param {RecordingNoticeOptions} options - The options for recording notices:
 *   - `state` {string}: The current recording state (`pause`, `stop`, etc.).
 *   - `userRecordingParam` {UserRecordingParams | null}: The user recording parameters (if available).
 *   - `pauseCount` {number}: The number of pauses in the recording.
 *   - `timeDone` {number}: The total recording time completed.
 *   - `parameters` {RecordingNoticeParameters}: Functions and properties to update recording details.
 *     - `updateRecordElapsedTime` {Function}: Updates elapsed recording time.
 *     - `updateShowRecordButtons` {Function}: Toggles record button visibility.
 *     - `updateRecordState` {Function}: Sets the record state (e.g., `red`, `green`, `yellow`).
 *     - `updatePauseRecordCount` {Function}: Sets the pause record count.
 *     - `updateRecordStarted`, `updateRecordPaused`, `updateCanLaunchRecord`, etc.: Other update functions to control recording settings and states.
 *
 * @returns {Promise<void>} Resolves when the recording state and parameters have been updated.
 *
 * @example
 * const options = {
 *   state: 'pause',
 *   userRecordingParam: { mainSpecs: { mediaOptions: 'audio', ... } },
 *   pauseCount: 3,
 *   timeDone: 3600,
 *   parameters: {
 *     updateRecordStarted: (started) => console.log(`Recording started: ${started}`),
 *     updateRecordPaused: (paused) => console.log(`Recording paused: ${paused}`),
 *     // Define other update functions similarly
 *   }
 * };
 * await recordingNoticeService.RecordingNotice(options);
 */


@Injectable({
  providedIn: 'root',
})
export class RecordingNotice {
  constructor(private SoundPlayerService: SoundPlayer) {}

  /**
   * Handles the recording notice state and updates various recording parameters accordingly.
   *
   * @param {Object} options - The options object.
   * @param {string} options.state - The current state of the recording (e.g., "pause", "stop").
   * @param {Object} options.userRecordingParam - The user recording parameters.
   * @param {number} options.pauseCount - The count of pauses during the recording.
   * @param {number} options.timeDone - The elapsed time of the recording.
   * @param {Object} options.parameters - The parameters object containing various update functions and state variables.
   * @param {string} options.parameters.islevel - The level of the recording.
   * @param {Object} options.parameters.userRecordingParams - The user recording parameters.
   * @param {number} options.parameters.pauseRecordCount - The count of pauses during the recording.
   * @param {number} options.parameters.recordElapsedTime - The elapsed time of the recording.
   * @param {number} options.parameters.recordStartTime - The start time of the recording.
   * @param {boolean} options.parameters.recordStarted - Indicates if the recording has started.
   * @param {boolean} options.parameters.recordPaused - Indicates if the recording is paused.
   * @param {boolean} options.parameters.canLaunchRecord - Indicates if the recording can be launched.
   * @param {boolean} options.parameters.stopLaunchRecord - Indicates if the recording launch should be stopped.
   * @param {boolean} options.parameters.recordStopped - Indicates if the recording is stopped.
   * @param {boolean} options.parameters.isTimerRunning - Indicates if the timer is running.
   * @param {boolean} options.parameters.canPauseResume - Indicates if the recording can be paused or resumed.
   * @param {string} options.parameters.eventType - The type of event triggering the recording notice.
   * @param {Function} options.parameters.updateRecordingProgressTime - Function to update the recording progress time.
   * @param {Function} options.parameters.updateShowRecordButtons - Function to update the visibility of record buttons.
   * @param {Function} options.parameters.updateUserRecordingParams - Function to update user recording parameters.
   * @param {Function} options.parameters.updateRecordingMediaOptions - Function to update recording media options.
   * @param {Function} options.parameters.updateRecordingAudioOptions - Function to update recording audio options.
   * @param {Function} options.parameters.updateRecordingVideoOptions - Function to update recording video options.
   * @param {Function} options.parameters.updateRecordingVideoType - Function to update recording video type.
   * @param {Function} options.parameters.updateRecordingVideoOptimized - Function to update recording video optimization.
   * @param {Function} options.parameters.updateRecordingDisplayType - Function to update recording display type.
   * @param {Function} options.parameters.updateRecordingAddHLS - Function to update HLS addition in recording.
   * @param {Function} options.parameters.updateRecordingNameTags - Function to update recording name tags.
   * @param {Function} options.parameters.updateRecordingBackgroundColor - Function to update recording background color.
   * @param {Function} options.parameters.updateRecordingNameTagsColor - Function to update recording name tags color.
   * @param {Function} options.parameters.updateRecordingOrientationVideo - Function to update recording orientation video.
   * @param {Function} options.parameters.updateRecordingAddText - Function to update recording text addition.
   * @param {Function} options.parameters.updateRecordingCustomText - Function to update custom text in recording.
   * @param {Function} options.parameters.updateRecordingCustomTextPosition - Function to update custom text position.
   * @param {Function} options.parameters.updateRecordingCustomTextColor - Function to update custom text color.
   * @param {Function} options.parameters.updatePauseRecordCount - Function to update pause record count.
   * @param {Function} options.parameters.updateRecordElapsedTime - Function to update record elapsed time.
   * @param {Function} options.parameters.updateRecordStartTime - Function to update record start time.
   * @param {Function} options.parameters.updateRecordStarted - Function to update record started status.
   * @param {Function} options.parameters.updateRecordPaused - Function to update record paused status.
   * @param {Function} options.parameters.updateCanLaunchRecord - Function to update can launch record status.
   * @param {Function} options.parameters.updateStopLaunchRecord - Function to update stop launch record status.
   * @param {Function} options.parameters.updateRecordStopped - Function to update record stopped status.
   * @param {Function} options.parameters.updateIsTimerRunning - Function to update timer running status.
   * @param {Function} options.parameters.updateCanPauseResume - Function to update can pause/resume status.
   * @param {Function} options.parameters.updateRecordState - Function to update the record state.
   *
   * @returns {Promise<void>} A promise that resolves when the recording notice handling is complete.
   *
   * @throws {Error} Throws an error if handling the recording state and status fails.
   */
  RecordingNotice = async ({
    state,
    userRecordingParam,
    pauseCount,
    timeDone,
    parameters,
  }: RecordingNoticeOptions): Promise<void> => {
    let {
      islevel,
      userRecordingParams,
      pauseRecordCount,
      recordElapsedTime,
      recordStartTime,
      recordStarted,
      recordPaused,
      canLaunchRecord,
      stopLaunchRecord,
      recordStopped,
      isTimerRunning,
      canPauseResume,
      eventType,

      updateRecordingProgressTime,
      updateShowRecordButtons,
      updateUserRecordingParams,
      updateRecordingMediaOptions,
      updateRecordingAudioOptions,
      updateRecordingVideoOptions,
      updateRecordingVideoType,
      updateRecordingVideoOptimized,
      updateRecordingDisplayType,
      updateRecordingAddHLS,
      updateRecordingNameTags,
      updateRecordingBackgroundColor,
      updateRecordingNameTagsColor,
      updateRecordingOrientationVideo,
      updateRecordingAddText,
      updateRecordingCustomText,
      updateRecordingCustomTextPosition,
      updateRecordingCustomTextColor,
      updatePauseRecordCount,
      updateRecordElapsedTime,
      updateRecordStartTime,
      updateRecordStarted,
      updateRecordPaused,
      updateCanLaunchRecord,
      updateStopLaunchRecord,
      updateRecordStopped,
      updateIsTimerRunning,
      updateCanPauseResume,
      updateRecordState,
    } = parameters;

    try {
      if (islevel !== '2') {
        if (state === 'pause') {
          updateRecordStarted(true);
          updateRecordPaused(true);
          updateRecordState('yellow');
          eventType !== 'broadcast' &&
            this.SoundPlayerService.playSound({
              soundUrl: 'https://www.mediasfu.com/sounds/record-paused.mp3',
            });
        } else if (state === 'stop') {
          updateRecordStarted(true);
          updateRecordStopped(true);
          updateRecordState('green');
          eventType !== 'broadcast' &&
            this.SoundPlayerService.playSound({
              soundUrl: 'https://www.mediasfu.com/sounds/record-stopped.mp3',
            });
        } else {
          updateRecordState('red');
          updateRecordStarted(true);
          updateRecordPaused(false);
          eventType !== 'broadcast' &&
            this.SoundPlayerService.playSound({
              soundUrl: 'https://www.mediasfu.com/sounds/record-progress.mp3',
            });
        }
      } else {
        if (state === 'pause') {
          updateRecordState('yellow');
          if (userRecordingParam) {
            userRecordingParams.mainSpecs = userRecordingParam.mainSpecs;
            userRecordingParams.dispSpecs = userRecordingParam.dispSpecs;
            userRecordingParams.textSpecs = userRecordingParam.textSpecs;

            updateUserRecordingParams(userRecordingParams);
            updateRecordingMediaOptions(userRecordingParams.mainSpecs.mediaOptions);
            updateRecordingAudioOptions(userRecordingParams.mainSpecs.audioOptions);
            updateRecordingVideoOptions(userRecordingParams.mainSpecs.videoOptions);
            updateRecordingVideoType(userRecordingParams.mainSpecs.videoType);
            updateRecordingVideoOptimized(userRecordingParams.mainSpecs.videoOptimized);
            updateRecordingDisplayType(userRecordingParams.mainSpecs.recordingDisplayType);
            updateRecordingAddHLS(userRecordingParams.mainSpecs.addHLS);
            updateRecordingNameTags(userRecordingParams.dispSpecs.nameTags);
            updateRecordingBackgroundColor(userRecordingParams.dispSpecs.backgroundColor);
            updateRecordingNameTagsColor(userRecordingParams.dispSpecs.nameTagsColor);
            updateRecordingOrientationVideo(userRecordingParams.dispSpecs.orientationVideo);
            updateRecordingAddText(userRecordingParams.textSpecs?.addText ?? false);
            updateRecordingCustomText(userRecordingParams.textSpecs?.customText ?? '');
            updateRecordingCustomTextPosition(
              userRecordingParams.textSpecs?.customTextPosition ?? '',
            );
            updateRecordingCustomTextColor(userRecordingParams.textSpecs?.customTextColor ?? '');

            pauseRecordCount = pauseCount;
            updatePauseRecordCount(pauseRecordCount);

            recordElapsedTime = timeDone;
            recordElapsedTime = Math.floor(recordElapsedTime / 1000);
            recordStartTime = Math.floor(Date.now() / 1000) - recordElapsedTime;
            updateRecordStartTime(recordStartTime);
            updateRecordElapsedTime(recordElapsedTime);

            recordStarted = true;
            recordPaused = true;
            canLaunchRecord = false;
            recordStopped = false;

            updateRecordStarted(recordStarted);
            updateRecordPaused(recordPaused);
            updateCanLaunchRecord(canLaunchRecord);
            updateRecordStopped(recordStopped);
            updateShowRecordButtons(true);

            isTimerRunning = false;
            canPauseResume = true;

            updateIsTimerRunning(isTimerRunning);
            updateCanPauseResume(canPauseResume);

            const formattedTime = this.formatElapsedTime(recordElapsedTime);
            updateRecordingProgressTime(formattedTime);
          }
          this.SoundPlayerService.playSound({
            soundUrl: 'https://www.mediasfu.com/sounds/record-paused.mp3',
          });
        } else if (state === 'stop') {
          updateRecordStarted(true);
          updateRecordStopped(true);
          canLaunchRecord = false;
          stopLaunchRecord = true;

          updateRecordStarted(recordStarted);
          updateRecordStopped(recordStopped);
          updateCanLaunchRecord(canLaunchRecord);
          updateStopLaunchRecord(stopLaunchRecord);
          updateShowRecordButtons(false);

          updateRecordState('green');
          this.SoundPlayerService.playSound({
            soundUrl: 'https://www.mediasfu.com/sounds/record-stopped.mp3',
          });
        } else {
          updateRecordState('red');
          updateRecordStarted(true);
          updateRecordPaused(false);
          this.SoundPlayerService.playSound({
            soundUrl: 'https://www.mediasfu.com/sounds/record-progress.mp3',
          });
        }
      }
    } catch (error) {
      console.log('Error in RecordingNotice: ', error);
      // throw new Error("Failed to handle recording state and status.");
    }
  };

  private formatElapsedTime = (recordElapsedTime: number): string => {
    const hours = Math.floor(recordElapsedTime / 3600);
    const minutes = Math.floor((recordElapsedTime % 3600) / 60);
    const seconds = recordElapsedTime % 60;

    return `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
  };

  private padNumber = (number: number): string => {
    return number.toString().padStart(2, '0');
  };
}
