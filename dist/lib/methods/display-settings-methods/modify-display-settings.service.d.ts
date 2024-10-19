import { OnScreenChangesParameters, OnScreenChangesType, ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface ModifyDisplaySettingsParameters extends OnScreenChangesParameters {
    showAlert?: ShowAlert;
    meetingDisplayType: string;
    autoWave: boolean;
    forceFullDisplay: boolean;
    meetingVideoOptimized: boolean;
    islevel: string;
    recordStarted: boolean;
    recordResumed: boolean;
    recordStopped: boolean;
    recordPaused: boolean;
    recordingDisplayType: 'video' | 'media' | 'all';
    recordingVideoOptimized: boolean;
    prevForceFullDisplay: boolean;
    prevMeetingDisplayType: string;
    updateMeetingDisplayType: (displayType: string) => void;
    updateAutoWave: (autoWave: boolean) => void;
    updateForceFullDisplay: (forceFullDisplay: boolean) => void;
    updateMeetingVideoOptimized: (optimized: boolean) => void;
    updatePrevForceFullDisplay: (forceFullDisplay: boolean) => void;
    updatePrevMeetingDisplayType: (displayType: string) => void;
    updateIsDisplaySettingsModalVisible: (isVisible: boolean) => void;
    updateFirstAll: (firstAll: boolean) => void;
    updateUpdateMainWindow: (update: boolean) => void;
    breakOutRoomStarted: boolean;
    breakOutRoomEnded: boolean;
    onScreenChanges: OnScreenChangesType;
    [key: string]: any;
}
export interface ModifyDisplaySettingsOptions {
    parameters: ModifyDisplaySettingsParameters;
}
export type ModifyDisplaySettingsType = (options: ModifyDisplaySettingsOptions) => Promise<void>;
export declare class ModifyDisplaySettings {
    /**
     * Modifies the display settings based on the provided parameters.
     *
     * @param {ModifyDisplaySettingsOptions} options - The options containing the parameters to modify the display settings.
     * @param {Object} options.parameters - The parameters for modifying the display settings.
     * @param {Function} options.parameters.showAlert - Function to show alert messages.
     * @param {string} options.parameters.meetingDisplayType - The current meeting display type.
     * @param {boolean} options.parameters.autoWave - Flag indicating if auto wave is enabled.
     * @param {boolean} options.parameters.forceFullDisplay - Flag indicating if full display is forced.
     * @param {boolean} options.parameters.meetingVideoOptimized - Flag indicating if the meeting video is optimized.
     * @param {string} options.parameters.islevel - The current level of the meeting.
     * @param {boolean} options.parameters.recordStarted - Flag indicating if recording has started.
     * @param {boolean} options.parameters.recordResumed - Flag indicating if recording has resumed.
     * @param {boolean} options.parameters.recordStopped - Flag indicating if recording has stopped.
     * @param {boolean} options.parameters.recordPaused - Flag indicating if recording is paused.
     * @param {string} options.parameters.recordingDisplayType - The current recording display type.
     * @param {boolean} options.parameters.recordingVideoOptimized - Flag indicating if the recording video is optimized.
     * @param {string} options.parameters.prevForceFullDisplay - The previous force full display value.
     * @param {string} options.parameters.prevMeetingDisplayType - The previous meeting display type.
     * @param {Function} options.parameters.updateMeetingDisplayType - Function to update the meeting display type.
     * @param {Function} options.parameters.updateAutoWave - Function to update the auto wave setting.
     * @param {Function} options.parameters.updateForceFullDisplay - Function to update the force full display setting.
     * @param {Function} options.parameters.updateMeetingVideoOptimized - Function to update the meeting video optimization setting.
     * @param {Function} options.parameters.updatePrevForceFullDisplay - Function to update the previous force full display setting.
     * @param {Function} options.parameters.updatePrevMeetingDisplayType - Function to update the previous meeting display type.
     * @param {Function} options.parameters.updateIsDisplaySettingsModalVisible - Function to update the visibility of the display settings modal.
     * @param {Function} options.parameters.updateFirstAll - Function to update the first all setting.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window.
     * @param {boolean} options.parameters.breakOutRoomStarted - Flag indicating if a breakout room has started.
     * @param {boolean} options.parameters.breakOutRoomEnded - Flag indicating if a breakout room has ended.
     * @param {Function} options.parameters.onScreenChanges - Function to handle screen changes.
     *
     * @returns {Promise<void>} A promise that resolves when the display settings have been modified.
     */
    modifyDisplaySettings: ({ parameters }: ModifyDisplaySettingsOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModifyDisplaySettings, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ModifyDisplaySettings>;
}
