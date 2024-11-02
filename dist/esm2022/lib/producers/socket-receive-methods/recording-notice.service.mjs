import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "../../methods/utils/sound-player.service";
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
export class RecordingNotice {
    SoundPlayerService;
    constructor(SoundPlayerService) {
        this.SoundPlayerService = SoundPlayerService;
    }
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
    RecordingNotice = async ({ state, userRecordingParam, pauseCount, timeDone, parameters, }) => {
        let { islevel, userRecordingParams, pauseRecordCount, recordElapsedTime, recordStartTime, recordStarted, recordPaused, canLaunchRecord, stopLaunchRecord, recordStopped, isTimerRunning, canPauseResume, eventType, updateRecordingProgressTime, updateShowRecordButtons, updateUserRecordingParams, updateRecordingMediaOptions, updateRecordingAudioOptions, updateRecordingVideoOptions, updateRecordingVideoType, updateRecordingVideoOptimized, updateRecordingDisplayType, updateRecordingAddHLS, updateRecordingNameTags, updateRecordingBackgroundColor, updateRecordingNameTagsColor, updateRecordingOrientationVideo, updateRecordingAddText, updateRecordingCustomText, updateRecordingCustomTextPosition, updateRecordingCustomTextColor, updatePauseRecordCount, updateRecordElapsedTime, updateRecordStartTime, updateRecordStarted, updateRecordPaused, updateCanLaunchRecord, updateStopLaunchRecord, updateRecordStopped, updateIsTimerRunning, updateCanPauseResume, updateRecordState, } = parameters;
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
                }
                else if (state === 'stop') {
                    updateRecordStarted(true);
                    updateRecordStopped(true);
                    updateRecordState('green');
                    eventType !== 'broadcast' &&
                        this.SoundPlayerService.playSound({
                            soundUrl: 'https://www.mediasfu.com/sounds/record-stopped.mp3',
                        });
                }
                else {
                    updateRecordState('red');
                    updateRecordStarted(true);
                    updateRecordPaused(false);
                    eventType !== 'broadcast' &&
                        this.SoundPlayerService.playSound({
                            soundUrl: 'https://www.mediasfu.com/sounds/record-progress.mp3',
                        });
                }
            }
            else {
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
                        updateRecordingCustomTextPosition(userRecordingParams.textSpecs?.customTextPosition ?? '');
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
                }
                else if (state === 'stop') {
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
                }
                else {
                    updateRecordState('red');
                    updateRecordStarted(true);
                    updateRecordPaused(false);
                    this.SoundPlayerService.playSound({
                        soundUrl: 'https://www.mediasfu.com/sounds/record-progress.mp3',
                    });
                }
            }
        }
        catch (error) {
            console.log('Error in RecordingNotice: ', error);
            // throw new Error("Failed to handle recording state and status.");
        }
    };
    formatElapsedTime = (recordElapsedTime) => {
        const hours = Math.floor(recordElapsedTime / 3600);
        const minutes = Math.floor((recordElapsedTime % 3600) / 60);
        const seconds = recordElapsedTime % 60;
        return `${this.padNumber(hours)}:${this.padNumber(minutes)}:${this.padNumber(seconds)}`;
    };
    padNumber = (number) => {
        return number.toString().padStart(2, '0');
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordingNotice, deps: [{ token: i1.SoundPlayer }], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordingNotice, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RecordingNotice, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }], ctorParameters: () => [{ type: i1.SoundPlayer }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3JkaW5nLW5vdGljZS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3JlY29yZGluZy1ub3RpY2Uuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7QUFnRTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUNHO0FBTUgsTUFBTSxPQUFPLGVBQWU7SUFDTjtJQUFwQixZQUFvQixrQkFBK0I7UUFBL0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFhO0lBQUcsQ0FBQztJQUV2RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXVERztJQUNILGVBQWUsR0FBRyxLQUFLLEVBQUUsRUFDdkIsS0FBSyxFQUNMLGtCQUFrQixFQUNsQixVQUFVLEVBQ1YsUUFBUSxFQUNSLFVBQVUsR0FDYSxFQUFpQixFQUFFO1FBQzFDLElBQUksRUFDRixPQUFPLEVBQ1AsbUJBQW1CLEVBQ25CLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsZUFBZSxFQUNmLGFBQWEsRUFDYixZQUFZLEVBQ1osZUFBZSxFQUNmLGdCQUFnQixFQUNoQixhQUFhLEVBQ2IsY0FBYyxFQUNkLGNBQWMsRUFDZCxTQUFTLEVBRVQsMkJBQTJCLEVBQzNCLHVCQUF1QixFQUN2Qix5QkFBeUIsRUFDekIsMkJBQTJCLEVBQzNCLDJCQUEyQixFQUMzQiwyQkFBMkIsRUFDM0Isd0JBQXdCLEVBQ3hCLDZCQUE2QixFQUM3QiwwQkFBMEIsRUFDMUIscUJBQXFCLEVBQ3JCLHVCQUF1QixFQUN2Qiw4QkFBOEIsRUFDOUIsNEJBQTRCLEVBQzVCLCtCQUErQixFQUMvQixzQkFBc0Is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WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb3VuZFBsYXllciB9IGZyb20gJy4uLy4uL21ldGhvZHMvdXRpbHMvc291bmQtcGxheWVyLnNlcnZpY2UnO1xuXG5pbXBvcnQgeyBFdmVudFR5cGUsIFVzZXJSZWNvcmRpbmdQYXJhbXMgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlY29yZGluZ05vdGljZVBhcmFtZXRlcnMge1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHVzZXJSZWNvcmRpbmdQYXJhbXM6IFVzZXJSZWNvcmRpbmdQYXJhbXM7XG4gIHJlY29yZEVsYXBzZWRUaW1lOiBudW1iZXI7XG4gIHJlY29yZFN0YXJ0VGltZTogbnVtYmVyO1xuICByZWNvcmRTdGFydGVkOiBib29sZWFuO1xuICByZWNvcmRQYXVzZWQ6IGJvb2xlYW47XG4gIGNhbkxhdW5jaFJlY29yZDogYm9vbGVhbjtcbiAgc3RvcExhdW5jaFJlY29yZDogYm9vbGVhbjtcbiAgcmVjb3JkU3RvcHBlZDogYm9vbGVhbjtcbiAgaXNUaW1lclJ1bm5pbmc6IGJvb2xlYW47XG4gIGNhblBhdXNlUmVzdW1lOiBib29sZWFuO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcblxuICB1cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWU6ICh0aW1lOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVNob3dSZWNvcmRCdXR0b25zOiAoc2hvdzogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlVXNlclJlY29yZGluZ1BhcmFtczogKHBhcmFtczogVXNlclJlY29yZGluZ1BhcmFtcykgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkaW5nTWVkaWFPcHRpb25zOiAob3B0aW9uczogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVSZWNvcmRpbmdBdWRpb09wdGlvbnM6IChvcHRpb25zOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW9uczogKG9wdGlvbnM6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkaW5nVmlkZW9UeXBlOiAodHlwZTogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVSZWNvcmRpbmdWaWRlb09wdGltaXplZDogKG9wdGltaXplZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkaW5nRGlzcGxheVR5cGU6ICh0eXBlOiAndmlkZW8nIHwgJ21lZGlhJyB8ICdhbGwnKSA9PiB2b2lkO1xuICB1cGRhdGVSZWNvcmRpbmdBZGRITFM6IChhZGRITFM6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZGluZ05hbWVUYWdzOiAobmFtZVRhZ3M6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZGluZ0JhY2tncm91bmRDb2xvcjogKGNvbG9yOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZGluZ05hbWVUYWdzQ29sb3I6IChjb2xvcjogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVSZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvOiAob3JpZW50YXRpb246IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkaW5nQWRkVGV4dDogKGFkZFRleHQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHQ6ICh0ZXh0OiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbjogKHBvc2l0aW9uOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRDb2xvcjogKGNvbG9yOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVBhdXNlUmVjb3JkQ291bnQ6IChjb3VudDogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVSZWNvcmRFbGFwc2VkVGltZTogKHRpbWU6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkU3RhcnRlZDogKHN0YXJ0ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZFBhdXNlZDogKHBhdXNlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQ2FuTGF1bmNoUmVjb3JkOiAoY2FuTGF1bmNoOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVTdG9wTGF1bmNoUmVjb3JkOiAoc3RvcDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkU3RvcHBlZDogKHN0b3BwZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUlzVGltZXJSdW5uaW5nOiAocnVubmluZzogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQ2FuUGF1c2VSZXN1bWU6IChjYW5QYXVzZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUmVjb3JkU3RhcnRUaW1lOiAoc3RhcnRUaW1lOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZVJlY29yZFN0YXRlOiAoc3RhdGU6IHN0cmluZykgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlY29yZGluZ05vdGljZU9wdGlvbnMge1xuICBzdGF0ZTogc3RyaW5nO1xuICB1c2VyUmVjb3JkaW5nUGFyYW06IFVzZXJSZWNvcmRpbmdQYXJhbXMgfCBudWxsO1xuICBwYXVzZUNvdW50OiBudW1iZXI7XG4gIHRpbWVEb25lOiBudW1iZXI7XG4gIHBhcmFtZXRlcnM6IFJlY29yZGluZ05vdGljZVBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFJlY29yZGluZ05vdGljZVR5cGUgPSAob3B0aW9uczogUmVjb3JkaW5nTm90aWNlT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBTZXJ2aWNlIGZvciBoYW5kbGluZyByZWNvcmRpbmcgbm90aWNlcywgbWFuYWdpbmcgcmVjb3JkaW5nIHN0YXRlcywgYW5kIHVwZGF0aW5nIHJlbGF0ZWQgcGFyYW1ldGVycy5cbiAqXG4gKiBAY2xhc3NcbiAqIEBuYW1lIFJlY29yZGluZ05vdGljZVxuICogQGRlc2NyaXB0aW9uIFByb3ZpZGVzIG1ldGhvZHMgdG8gaGFuZGxlIHRoZSByZWNvcmRpbmcgbm90aWNlIHN0YXRlLCBtYW5hZ2UgdXNlciByZWNvcmRpbmcgcGFyYW1ldGVycywgYW5kIHBsYXkgYXBwcm9wcmlhdGUgc291bmRzIGZvciBkaWZmZXJlbnQgc3RhdGVzLlxuICpcbiAqIEBtZXRob2RcbiAqIFJlY29yZGluZ05vdGljZVxuICpcbiAqIEBwYXJhbSB7UmVjb3JkaW5nTm90aWNlT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZWNvcmRpbmcgbm90aWNlczpcbiAqICAgLSBgc3RhdGVgIHtzdHJpbmd9OiBUaGUgY3VycmVudCByZWNvcmRpbmcgc3RhdGUgKGBwYXVzZWAsIGBzdG9wYCwgZXRjLikuXG4gKiAgIC0gYHVzZXJSZWNvcmRpbmdQYXJhbWAge1VzZXJSZWNvcmRpbmdQYXJhbXMgfCBudWxsfTogVGhlIHVzZXIgcmVjb3JkaW5nIHBhcmFtZXRlcnMgKGlmIGF2YWlsYWJsZSkuXG4gKiAgIC0gYHBhdXNlQ291bnRgIHtudW1iZXJ9OiBUaGUgbnVtYmVyIG9mIHBhdXNlcyBpbiB0aGUgcmVjb3JkaW5nLlxuICogICAtIGB0aW1lRG9uZWAge251bWJlcn06IFRoZSB0b3RhbCByZWNvcmRpbmcgdGltZSBjb21wbGV0ZWQuXG4gKiAgIC0gYHBhcmFtZXRlcnNgIHtSZWNvcmRpbmdOb3RpY2VQYXJhbWV0ZXJzfTogRnVuY3Rpb25zIGFuZCBwcm9wZXJ0aWVzIHRvIHVwZGF0ZSByZWNvcmRpbmcgZGV0YWlscy5cbiAqICAgICAtIGB1cGRhdGVSZWNvcmRFbGFwc2VkVGltZWAge0Z1bmN0aW9ufTogVXBkYXRlcyBlbGFwc2VkIHJlY29yZGluZyB0aW1lLlxuICogICAgIC0gYHVwZGF0ZVNob3dSZWNvcmRCdXR0b25zYCB7RnVuY3Rpb259OiBUb2dnbGVzIHJlY29yZCBidXR0b24gdmlzaWJpbGl0eS5cbiAqICAgICAtIGB1cGRhdGVSZWNvcmRTdGF0ZWAge0Z1bmN0aW9ufTogU2V0cyB0aGUgcmVjb3JkIHN0YXRlIChlLmcuLCBgcmVkYCwgYGdyZWVuYCwgYHllbGxvd2ApLlxuICogICAgIC0gYHVwZGF0ZVBhdXNlUmVjb3JkQ291bnRgIHtGdW5jdGlvbn06IFNldHMgdGhlIHBhdXNlIHJlY29yZCBjb3VudC5cbiAqICAgICAtIGB1cGRhdGVSZWNvcmRTdGFydGVkYCwgYHVwZGF0ZVJlY29yZFBhdXNlZGAsIGB1cGRhdGVDYW5MYXVuY2hSZWNvcmRgLCBldGMuOiBPdGhlciB1cGRhdGUgZnVuY3Rpb25zIHRvIGNvbnRyb2wgcmVjb3JkaW5nIHNldHRpbmdzIGFuZCBzdGF0ZXMuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFJlc29sdmVzIHdoZW4gdGhlIHJlY29yZGluZyBzdGF0ZSBhbmQgcGFyYW1ldGVycyBoYXZlIGJlZW4gdXBkYXRlZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgc3RhdGU6ICdwYXVzZScsXG4gKiAgIHVzZXJSZWNvcmRpbmdQYXJhbTogeyBtYWluU3BlY3M6IHsgbWVkaWFPcHRpb25zOiAnYXVkaW8nLCAuLi4gfSB9LFxuICogICBwYXVzZUNvdW50OiAzLFxuICogICB0aW1lRG9uZTogMzYwMCxcbiAqICAgcGFyYW1ldGVyczoge1xuICogICAgIHVwZGF0ZVJlY29yZFN0YXJ0ZWQ6IChzdGFydGVkKSA9PiBjb25zb2xlLmxvZyhgUmVjb3JkaW5nIHN0YXJ0ZWQ6ICR7c3RhcnRlZH1gKSxcbiAqICAgICB1cGRhdGVSZWNvcmRQYXVzZWQ6IChwYXVzZWQpID0+IGNvbnNvbGUubG9nKGBSZWNvcmRpbmcgcGF1c2VkOiAke3BhdXNlZH1gKSxcbiAqICAgICAvLyBEZWZpbmUgb3RoZXIgdXBkYXRlIGZ1bmN0aW9ucyBzaW1pbGFybHlcbiAqICAgfVxuICogfTtcbiAqIGF3YWl0IHJlY29yZGluZ05vdGljZVNlcnZpY2UuUmVjb3JkaW5nTm90aWNlKG9wdGlvbnMpO1xuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJlY29yZGluZ05vdGljZSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgU291bmRQbGF5ZXJTZXJ2aWNlOiBTb3VuZFBsYXllcikge31cblxuICAvKipcbiAgICogSGFuZGxlcyB0aGUgcmVjb3JkaW5nIG5vdGljZSBzdGF0ZSBhbmQgdXBkYXRlcyB2YXJpb3VzIHJlY29yZGluZyBwYXJhbWV0ZXJzIGFjY29yZGluZ2x5LlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIG9iamVjdC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc3RhdGUgLSBUaGUgY3VycmVudCBzdGF0ZSBvZiB0aGUgcmVjb3JkaW5nIChlLmcuLCBcInBhdXNlXCIsIFwic3RvcFwiKS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMudXNlclJlY29yZGluZ1BhcmFtIC0gVGhlIHVzZXIgcmVjb3JkaW5nIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhdXNlQ291bnQgLSBUaGUgY291bnQgb2YgcGF1c2VzIGR1cmluZyB0aGUgcmVjb3JkaW5nLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy50aW1lRG9uZSAtIFRoZSBlbGFwc2VkIHRpbWUgb2YgdGhlIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIG9iamVjdCBjb250YWluaW5nIHZhcmlvdXMgdXBkYXRlIGZ1bmN0aW9ucyBhbmQgc3RhdGUgdmFyaWFibGVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzbGV2ZWwgLSBUaGUgbGV2ZWwgb2YgdGhlIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMucGFyYW1ldGVycy51c2VyUmVjb3JkaW5nUGFyYW1zIC0gVGhlIHVzZXIgcmVjb3JkaW5nIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMucGF1c2VSZWNvcmRDb3VudCAtIFRoZSBjb3VudCBvZiBwYXVzZXMgZHVyaW5nIHRoZSByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkRWxhcHNlZFRpbWUgLSBUaGUgZWxhcHNlZCB0aW1lIG9mIHRoZSByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkU3RhcnRUaW1lIC0gVGhlIHN0YXJ0IHRpbWUgb2YgdGhlIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkU3RhcnRlZCAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIGhhcyBzdGFydGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5yZWNvcmRQYXVzZWQgLSBJbmRpY2F0ZXMgaWYgdGhlIHJlY29yZGluZyBpcyBwYXVzZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNhbkxhdW5jaFJlY29yZCAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIGNhbiBiZSBsYXVuY2hlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc3RvcExhdW5jaFJlY29yZCAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIGxhdW5jaCBzaG91bGQgYmUgc3RvcHBlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVjb3JkU3RvcHBlZCAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIGlzIHN0b3BwZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzVGltZXJSdW5uaW5nIC0gSW5kaWNhdGVzIGlmIHRoZSB0aW1lciBpcyBydW5uaW5nLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5jYW5QYXVzZVJlc3VtZSAtIEluZGljYXRlcyBpZiB0aGUgcmVjb3JkaW5nIGNhbiBiZSBwYXVzZWQgb3IgcmVzdW1lZC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5ldmVudFR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCB0cmlnZ2VyaW5nIHRoZSByZWNvcmRpbmcgbm90aWNlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkaW5nUHJvZ3Jlc3NUaW1lIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSByZWNvcmRpbmcgcHJvZ3Jlc3MgdGltZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVNob3dSZWNvcmRCdXR0b25zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHJlY29yZCBidXR0b25zLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVXNlclJlY29yZGluZ1BhcmFtcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB1c2VyIHJlY29yZGluZyBwYXJhbWV0ZXJzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkaW5nTWVkaWFPcHRpb25zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHJlY29yZGluZyBtZWRpYSBvcHRpb25zLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkaW5nQXVkaW9PcHRpb25zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHJlY29yZGluZyBhdWRpbyBvcHRpb25zLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpb25zIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHJlY29yZGluZyB2aWRlbyBvcHRpb25zLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkaW5nVmlkZW9UeXBlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHJlY29yZGluZyB2aWRlbyB0eXBlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkaW5nVmlkZW9PcHRpbWl6ZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgcmVjb3JkaW5nIHZpZGVvIG9wdGltaXphdGlvbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZGluZ0Rpc3BsYXlUeXBlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHJlY29yZGluZyBkaXNwbGF5IHR5cGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZWNvcmRpbmdBZGRITFMgLSBGdW5jdGlvbiB0byB1cGRhdGUgSExTIGFkZGl0aW9uIGluIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZGluZ05hbWVUYWdzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHJlY29yZGluZyBuYW1lIHRhZ3MuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZWNvcmRpbmdCYWNrZ3JvdW5kQ29sb3IgLSBGdW5jdGlvbiB0byB1cGRhdGUgcmVjb3JkaW5nIGJhY2tncm91bmQgY29sb3IuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZWNvcmRpbmdOYW1lVGFnc0NvbG9yIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHJlY29yZGluZyBuYW1lIHRhZ3MgY29sb3IuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHJlY29yZGluZyBvcmllbnRhdGlvbiB2aWRlby5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZGluZ0FkZFRleHQgLSBGdW5jdGlvbiB0byB1cGRhdGUgcmVjb3JkaW5nIHRleHQgYWRkaXRpb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0IC0gRnVuY3Rpb24gdG8gdXBkYXRlIGN1c3RvbSB0ZXh0IGluIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRQb3NpdGlvbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBjdXN0b20gdGV4dCBwb3NpdGlvbi5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRDb2xvciAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBjdXN0b20gdGV4dCBjb2xvci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVBhdXNlUmVjb3JkQ291bnQgLSBGdW5jdGlvbiB0byB1cGRhdGUgcGF1c2UgcmVjb3JkIGNvdW50LlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkRWxhcHNlZFRpbWUgLSBGdW5jdGlvbiB0byB1cGRhdGUgcmVjb3JkIGVsYXBzZWQgdGltZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZFN0YXJ0VGltZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSByZWNvcmQgc3RhcnQgdGltZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZFN0YXJ0ZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgcmVjb3JkIHN0YXJ0ZWQgc3RhdHVzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVjb3JkUGF1c2VkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHJlY29yZCBwYXVzZWQgc3RhdHVzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQ2FuTGF1bmNoUmVjb3JkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGNhbiBsYXVuY2ggcmVjb3JkIHN0YXR1cy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVN0b3BMYXVuY2hSZWNvcmQgLSBGdW5jdGlvbiB0byB1cGRhdGUgc3RvcCBsYXVuY2ggcmVjb3JkIHN0YXR1cy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZFN0b3BwZWQgLSBGdW5jdGlvbiB0byB1cGRhdGUgcmVjb3JkIHN0b3BwZWQgc3RhdHVzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlSXNUaW1lclJ1bm5pbmcgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGltZXIgcnVubmluZyBzdGF0dXMuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVDYW5QYXVzZVJlc3VtZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBjYW4gcGF1c2UvcmVzdW1lIHN0YXR1cy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVJlY29yZFN0YXRlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSByZWNvcmQgc3RhdGUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSByZWNvcmRpbmcgbm90aWNlIGhhbmRsaW5nIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIGhhbmRsaW5nIHRoZSByZWNvcmRpbmcgc3RhdGUgYW5kIHN0YXR1cyBmYWlscy5cbiAgICovXG4gIFJlY29yZGluZ05vdGljZSA9IGFzeW5jICh7XG4gICAgc3RhdGUsXG4gICAgdXNlclJlY29yZGluZ1BhcmFtLFxuICAgIHBhdXNlQ291bnQsXG4gICAgdGltZURvbmUsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogUmVjb3JkaW5nTm90aWNlT3B0aW9ucyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGxldCB7XG4gICAgICBpc2xldmVsLFxuICAgICAgdXNlclJlY29yZGluZ1BhcmFtcyxcbiAgICAgIHBhdXNlUmVjb3JkQ291bnQsXG4gICAgICByZWNvcmRFbGFwc2VkVGltZSxcbiAgICAgIHJlY29yZFN0YXJ0VGltZSxcbiAgICAgIHJlY29yZFN0YXJ0ZWQsXG4gICAgICByZWNvcmRQYXVzZWQsXG4gICAgICBjYW5MYXVuY2hSZWNvcmQsXG4gICAgICBzdG9wTGF1bmNoUmVjb3JkLFxuICAgICAgcmVjb3JkU3RvcHBlZCxcbiAgICAgIGlzVGltZXJSdW5uaW5nLFxuICAgICAgY2FuUGF1c2VSZXN1bWUsXG4gICAgICBldmVudFR5cGUsXG5cbiAgICAgIHVwZGF0ZVJlY29yZGluZ1Byb2dyZXNzVGltZSxcbiAgICAgIHVwZGF0ZVNob3dSZWNvcmRCdXR0b25zLFxuICAgICAgdXBkYXRlVXNlclJlY29yZGluZ1BhcmFtcyxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ01lZGlhT3B0aW9ucyxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0F1ZGlvT3B0aW9ucyxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW9ucyxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvVHlwZSxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW1pemVkLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nRGlzcGxheVR5cGUsXG4gICAgICB1cGRhdGVSZWNvcmRpbmdBZGRITFMsXG4gICAgICB1cGRhdGVSZWNvcmRpbmdOYW1lVGFncyxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0JhY2tncm91bmRDb2xvcixcbiAgICAgIHVwZGF0ZVJlY29yZGluZ05hbWVUYWdzQ29sb3IsXG4gICAgICB1cGRhdGVSZWNvcmRpbmdPcmllbnRhdGlvblZpZGVvLFxuICAgICAgdXBkYXRlUmVjb3JkaW5nQWRkVGV4dCxcbiAgICAgIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHQsXG4gICAgICB1cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0UG9zaXRpb24sXG4gICAgICB1cGRhdGVSZWNvcmRpbmdDdXN0b21UZXh0Q29sb3IsXG4gICAgICB1cGRhdGVQYXVzZVJlY29yZENvdW50LFxuICAgICAgdXBkYXRlUmVjb3JkRWxhcHNlZFRpbWUsXG4gICAgICB1cGRhdGVSZWNvcmRTdGFydFRpbWUsXG4gICAgICB1cGRhdGVSZWNvcmRTdGFydGVkLFxuICAgICAgdXBkYXRlUmVjb3JkUGF1c2VkLFxuICAgICAgdXBkYXRlQ2FuTGF1bmNoUmVjb3JkLFxuICAgICAgdXBkYXRlU3RvcExhdW5jaFJlY29yZCxcbiAgICAgIHVwZGF0ZVJlY29yZFN0b3BwZWQsXG4gICAgICB1cGRhdGVJc1RpbWVyUnVubmluZyxcbiAgICAgIHVwZGF0ZUNhblBhdXNlUmVzdW1lLFxuICAgICAgdXBkYXRlUmVjb3JkU3RhdGUsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICB0cnkge1xuICAgICAgaWYgKGlzbGV2ZWwgIT09ICcyJykge1xuICAgICAgICBpZiAoc3RhdGUgPT09ICdwYXVzZScpIHtcbiAgICAgICAgICB1cGRhdGVSZWNvcmRTdGFydGVkKHRydWUpO1xuICAgICAgICAgIHVwZGF0ZVJlY29yZFBhdXNlZCh0cnVlKTtcbiAgICAgICAgICB1cGRhdGVSZWNvcmRTdGF0ZSgneWVsbG93Jyk7XG4gICAgICAgICAgZXZlbnRUeXBlICE9PSAnYnJvYWRjYXN0JyAmJlxuICAgICAgICAgICAgdGhpcy5Tb3VuZFBsYXllclNlcnZpY2UucGxheVNvdW5kKHtcbiAgICAgICAgICAgICAgc291bmRVcmw6ICdodHRwczovL3d3dy5tZWRpYXNmdS5jb20vc291bmRzL3JlY29yZC1wYXVzZWQubXAzJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSAnc3RvcCcpIHtcbiAgICAgICAgICB1cGRhdGVSZWNvcmRTdGFydGVkKHRydWUpO1xuICAgICAgICAgIHVwZGF0ZVJlY29yZFN0b3BwZWQodHJ1ZSk7XG4gICAgICAgICAgdXBkYXRlUmVjb3JkU3RhdGUoJ2dyZWVuJyk7XG4gICAgICAgICAgZXZlbnRUeXBlICE9PSAnYnJvYWRjYXN0JyAmJlxuICAgICAgICAgICAgdGhpcy5Tb3VuZFBsYXllclNlcnZpY2UucGxheVNvdW5kKHtcbiAgICAgICAgICAgICAgc291bmRVcmw6ICdodHRwczovL3d3dy5tZWRpYXNmdS5jb20vc291bmRzL3JlY29yZC1zdG9wcGVkLm1wMycsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB1cGRhdGVSZWNvcmRTdGF0ZSgncmVkJyk7XG4gICAgICAgICAgdXBkYXRlUmVjb3JkU3RhcnRlZCh0cnVlKTtcbiAgICAgICAgICB1cGRhdGVSZWNvcmRQYXVzZWQoZmFsc2UpO1xuICAgICAgICAgIGV2ZW50VHlwZSAhPT0gJ2Jyb2FkY2FzdCcgJiZcbiAgICAgICAgICAgIHRoaXMuU291bmRQbGF5ZXJTZXJ2aWNlLnBsYXlTb3VuZCh7XG4gICAgICAgICAgICAgIHNvdW5kVXJsOiAnaHR0cHM6Ly93d3cubWVkaWFzZnUuY29tL3NvdW5kcy9yZWNvcmQtcHJvZ3Jlc3MubXAzJyxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAoc3RhdGUgPT09ICdwYXVzZScpIHtcbiAgICAgICAgICB1cGRhdGVSZWNvcmRTdGF0ZSgneWVsbG93Jyk7XG4gICAgICAgICAgaWYgKHVzZXJSZWNvcmRpbmdQYXJhbSkge1xuICAgICAgICAgICAgdXNlclJlY29yZGluZ1BhcmFtcy5tYWluU3BlY3MgPSB1c2VyUmVjb3JkaW5nUGFyYW0ubWFpblNwZWNzO1xuICAgICAgICAgICAgdXNlclJlY29yZGluZ1BhcmFtcy5kaXNwU3BlY3MgPSB1c2VyUmVjb3JkaW5nUGFyYW0uZGlzcFNwZWNzO1xuICAgICAgICAgICAgdXNlclJlY29yZGluZ1BhcmFtcy50ZXh0U3BlY3MgPSB1c2VyUmVjb3JkaW5nUGFyYW0udGV4dFNwZWNzO1xuXG4gICAgICAgICAgICB1cGRhdGVVc2VyUmVjb3JkaW5nUGFyYW1zKHVzZXJSZWNvcmRpbmdQYXJhbXMpO1xuICAgICAgICAgICAgdXBkYXRlUmVjb3JkaW5nTWVkaWFPcHRpb25zKHVzZXJSZWNvcmRpbmdQYXJhbXMubWFpblNwZWNzLm1lZGlhT3B0aW9ucyk7XG4gICAgICAgICAgICB1cGRhdGVSZWNvcmRpbmdBdWRpb09wdGlvbnModXNlclJlY29yZGluZ1BhcmFtcy5tYWluU3BlY3MuYXVkaW9PcHRpb25zKTtcbiAgICAgICAgICAgIHVwZGF0ZVJlY29yZGluZ1ZpZGVvT3B0aW9ucyh1c2VyUmVjb3JkaW5nUGFyYW1zLm1haW5TcGVjcy52aWRlb09wdGlvbnMpO1xuICAgICAgICAgICAgdXBkYXRlUmVjb3JkaW5nVmlkZW9UeXBlKHVzZXJSZWNvcmRpbmdQYXJhbXMubWFpblNwZWNzLnZpZGVvVHlwZSk7XG4gICAgICAgICAgICB1cGRhdGVSZWNvcmRpbmdWaWRlb09wdGltaXplZCh1c2VyUmVjb3JkaW5nUGFyYW1zLm1haW5TcGVjcy52aWRlb09wdGltaXplZCk7XG4gICAgICAgICAgICB1cGRhdGVSZWNvcmRpbmdEaXNwbGF5VHlwZSh1c2VyUmVjb3JkaW5nUGFyYW1zLm1haW5TcGVjcy5yZWNvcmRpbmdEaXNwbGF5VHlwZSk7XG4gICAgICAgICAgICB1cGRhdGVSZWNvcmRpbmdBZGRITFModXNlclJlY29yZGluZ1BhcmFtcy5tYWluU3BlY3MuYWRkSExTKTtcbiAgICAgICAgICAgIHVwZGF0ZVJlY29yZGluZ05hbWVUYWdzKHVzZXJSZWNvcmRpbmdQYXJhbXMuZGlzcFNwZWNzLm5hbWVUYWdzKTtcbiAgICAgICAgICAgIHVwZGF0ZVJlY29yZGluZ0JhY2tncm91bmRDb2xvcih1c2VyUmVjb3JkaW5nUGFyYW1zLmRpc3BTcGVjcy5iYWNrZ3JvdW5kQ29sb3IpO1xuICAgICAgICAgICAgdXBkYXRlUmVjb3JkaW5nTmFtZVRhZ3NDb2xvcih1c2VyUmVjb3JkaW5nUGFyYW1zLmRpc3BTcGVjcy5uYW1lVGFnc0NvbG9yKTtcbiAgICAgICAgICAgIHVwZGF0ZVJlY29yZGluZ09yaWVudGF0aW9uVmlkZW8odXNlclJlY29yZGluZ1BhcmFtcy5kaXNwU3BlY3Mub3JpZW50YXRpb25WaWRlbyk7XG4gICAgICAgICAgICB1cGRhdGVSZWNvcmRpbmdBZGRUZXh0KHVzZXJSZWNvcmRpbmdQYXJhbXMudGV4dFNwZWNzPy5hZGRUZXh0ID8/IGZhbHNlKTtcbiAgICAgICAgICAgIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHQodXNlclJlY29yZGluZ1BhcmFtcy50ZXh0U3BlY3M/LmN1c3RvbVRleHQgPz8gJycpO1xuICAgICAgICAgICAgdXBkYXRlUmVjb3JkaW5nQ3VzdG9tVGV4dFBvc2l0aW9uKFxuICAgICAgICAgICAgICB1c2VyUmVjb3JkaW5nUGFyYW1zLnRleHRTcGVjcz8uY3VzdG9tVGV4dFBvc2l0aW9uID8/ICcnLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHVwZGF0ZVJlY29yZGluZ0N1c3RvbVRleHRDb2xvcih1c2VyUmVjb3JkaW5nUGFyYW1zLnRleHRTcGVjcz8uY3VzdG9tVGV4dENvbG9yID8/ICcnKTtcblxuICAgICAgICAgICAgcGF1c2VSZWNvcmRDb3VudCA9IHBhdXNlQ291bnQ7XG4gICAgICAgICAgICB1cGRhdGVQYXVzZVJlY29yZENvdW50KHBhdXNlUmVjb3JkQ291bnQpO1xuXG4gICAgICAgICAgICByZWNvcmRFbGFwc2VkVGltZSA9IHRpbWVEb25lO1xuICAgICAgICAgICAgcmVjb3JkRWxhcHNlZFRpbWUgPSBNYXRoLmZsb29yKHJlY29yZEVsYXBzZWRUaW1lIC8gMTAwMCk7XG4gICAgICAgICAgICByZWNvcmRTdGFydFRpbWUgPSBNYXRoLmZsb29yKERhdGUubm93KCkgLyAxMDAwKSAtIHJlY29yZEVsYXBzZWRUaW1lO1xuICAgICAgICAgICAgdXBkYXRlUmVjb3JkU3RhcnRUaW1lKHJlY29yZFN0YXJ0VGltZSk7XG4gICAgICAgICAgICB1cGRhdGVSZWNvcmRFbGFwc2VkVGltZShyZWNvcmRFbGFwc2VkVGltZSk7XG5cbiAgICAgICAgICAgIHJlY29yZFN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgcmVjb3JkUGF1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIGNhbkxhdW5jaFJlY29yZCA9IGZhbHNlO1xuICAgICAgICAgICAgcmVjb3JkU3RvcHBlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICB1cGRhdGVSZWNvcmRTdGFydGVkKHJlY29yZFN0YXJ0ZWQpO1xuICAgICAgICAgICAgdXBkYXRlUmVjb3JkUGF1c2VkKHJlY29yZFBhdXNlZCk7XG4gICAgICAgICAgICB1cGRhdGVDYW5MYXVuY2hSZWNvcmQoY2FuTGF1bmNoUmVjb3JkKTtcbiAgICAgICAgICAgIHVwZGF0ZVJlY29yZFN0b3BwZWQocmVjb3JkU3RvcHBlZCk7XG4gICAgICAgICAgICB1cGRhdGVTaG93UmVjb3JkQnV0dG9ucyh0cnVlKTtcblxuICAgICAgICAgICAgaXNUaW1lclJ1bm5pbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIGNhblBhdXNlUmVzdW1lID0gdHJ1ZTtcblxuICAgICAgICAgICAgdXBkYXRlSXNUaW1lclJ1bm5pbmcoaXNUaW1lclJ1bm5pbmcpO1xuICAgICAgICAgICAgdXBkYXRlQ2FuUGF1c2VSZXN1bWUoY2FuUGF1c2VSZXN1bWUpO1xuXG4gICAgICAgICAgICBjb25zdCBmb3JtYXR0ZWRUaW1lID0gdGhpcy5mb3JtYXRFbGFwc2VkVGltZShyZWNvcmRFbGFwc2VkVGltZSk7XG4gICAgICAgICAgICB1cGRhdGVSZWNvcmRpbmdQcm9ncmVzc1RpbWUoZm9ybWF0dGVkVGltZSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHRoaXMuU291bmRQbGF5ZXJTZXJ2aWNlLnBsYXlTb3VuZCh7XG4gICAgICAgICAgICBzb3VuZFVybDogJ2h0dHBzOi8vd3d3Lm1lZGlhc2Z1LmNvbS9zb3VuZHMvcmVjb3JkLXBhdXNlZC5tcDMnLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlID09PSAnc3RvcCcpIHtcbiAgICAgICAgICB1cGRhdGVSZWNvcmRTdGFydGVkKHRydWUpO1xuICAgICAgICAgIHVwZGF0ZVJlY29yZFN0b3BwZWQodHJ1ZSk7XG4gICAgICAgICAgY2FuTGF1bmNoUmVjb3JkID0gZmFsc2U7XG4gICAgICAgICAgc3RvcExhdW5jaFJlY29yZCA9IHRydWU7XG5cbiAgICAgICAgICB1cGRhdGVSZWNvcmRTdGFydGVkKHJlY29yZFN0YXJ0ZWQpO1xuICAgICAgICAgIHVwZGF0ZVJlY29yZFN0b3BwZWQocmVjb3JkU3RvcHBlZCk7XG4gICAgICAgICAgdXBkYXRlQ2FuTGF1bmNoUmVjb3JkKGNhbkxhdW5jaFJlY29yZCk7XG4gICAgICAgICAgdXBkYXRlU3RvcExhdW5jaFJlY29yZChzdG9wTGF1bmNoUmVjb3JkKTtcbiAgICAgICAgICB1cGRhdGVTaG93UmVjb3JkQnV0dG9ucyhmYWxzZSk7XG5cbiAgICAgICAgICB1cGRhdGVSZWNvcmRTdGF0ZSgnZ3JlZW4nKTtcbiAgICAgICAgICB0aGlzLlNvdW5kUGxheWVyU2VydmljZS5wbGF5U291bmQoe1xuICAgICAgICAgICAgc291bmRVcmw6ICdodHRwczovL3d3dy5tZWRpYXNmdS5jb20vc291bmRzL3JlY29yZC1zdG9wcGVkLm1wMycsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdXBkYXRlUmVjb3JkU3RhdGUoJ3JlZCcpO1xuICAgICAgICAgIHVwZGF0ZVJlY29yZFN0YXJ0ZWQodHJ1ZSk7XG4gICAgICAgICAgdXBkYXRlUmVjb3JkUGF1c2VkKGZhbHNlKTtcbiAgICAgICAgICB0aGlzLlNvdW5kUGxheWVyU2VydmljZS5wbGF5U291bmQoe1xuICAgICAgICAgICAgc291bmRVcmw6ICdodHRwczovL3d3dy5tZWRpYXNmdS5jb20vc291bmRzL3JlY29yZC1wcm9ncmVzcy5tcDMnLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBpbiBSZWNvcmRpbmdOb3RpY2U6ICcsIGVycm9yKTtcbiAgICAgIC8vIHRocm93IG5ldyBFcnJvcihcIkZhaWxlZCB0byBoYW5kbGUgcmVjb3JkaW5nIHN0YXRlIGFuZCBzdGF0dXMuXCIpO1xuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIGZvcm1hdEVsYXBzZWRUaW1lID0gKHJlY29yZEVsYXBzZWRUaW1lOiBudW1iZXIpOiBzdHJpbmcgPT4ge1xuICAgIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihyZWNvcmRFbGFwc2VkVGltZSAvIDM2MDApO1xuICAgIGNvbnN0IG1pbnV0ZXMgPSBNYXRoLmZsb29yKChyZWNvcmRFbGFwc2VkVGltZSAlIDM2MDApIC8gNjApO1xuICAgIGNvbnN0IHNlY29uZHMgPSByZWNvcmRFbGFwc2VkVGltZSAlIDYwO1xuXG4gICAgcmV0dXJuIGAke3RoaXMucGFkTnVtYmVyKGhvdXJzKX06JHt0aGlzLnBhZE51bWJlcihtaW51dGVzKX06JHt0aGlzLnBhZE51bWJlcihzZWNvbmRzKX1gO1xuICB9O1xuXG4gIHByaXZhdGUgcGFkTnVtYmVyID0gKG51bWJlcjogbnVtYmVyKTogc3RyaW5nID0+IHtcbiAgICByZXR1cm4gbnVtYmVyLnRvU3RyaW5nKCkucGFkU3RhcnQoMiwgJzAnKTtcbiAgfTtcbn1cbiJdfQ==