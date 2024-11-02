import { Settings } from '../../@types/types';
import * as i0 from "@angular/core";
export interface UpdateMediaSettingsOptions {
    settings: Settings;
    updateAudioSetting: (value: string) => void;
    updateVideoSetting: (value: string) => void;
    updateScreenshareSetting: (value: string) => void;
    updateChatSetting: (value: string) => void;
}
export type UpdateMediaSettingsType = (options: UpdateMediaSettingsOptions) => void;
/**
 * Service for updating media settings including audio, video, screenshare, and chat.
 *
 * @class
 * @name UpdateMediaSettings
 * @description Provides a method to update multiple media settings at once using specified update functions.
 *
 * @method
 * updateMediaSettings
 *
 * @param {UpdateMediaSettingsOptions} options - Options for updating media settings:
 *   - `settings` {Settings}: The settings values to apply.
 *   - `updateAudioSetting` {Function}: Function to update the audio setting.
 *   - `updateVideoSetting` {Function}: Function to update the video setting.
 *   - `updateScreenshareSetting` {Function}: Function to update the screenshare setting.
 *   - `updateChatSetting` {Function}: Function to update the chat setting.
 *
 * @returns {void} Updates settings directly through the provided functions.
 *
 * @example
 * const settings = ['mute', 'HD', 'enabled', 'disabled'];
 * const options = {
 *   settings,
 *   updateAudioSetting: (value) => console.log(`Audio setting updated to: ${value}`),
 *   updateVideoSetting: (value) => console.log(`Video setting updated to: ${value}`),
 *   updateScreenshareSetting: (value) => console.log(`Screenshare setting updated to: ${value}`),
 *   updateChatSetting: (value) => console.log(`Chat setting updated to: ${value}`)
 * };
 * updateMediaSettingsService.updateMediaSettings(options);
 */
export declare class UpdateMediaSettings {
    /**
     * Updates the media settings by invoking the provided update functions for each setting.
     *
     * @param {Object} options - The options for updating the media settings.
     * @param {Settings} options.settings - The media settings to update.
     * @param {Function} options.updateAudioSetting - Function to update the audio setting.
     * @param {Function} options.updateVideoSetting - Function to update the video setting.
     * @param {Function} options.updateScreenshareSetting - Function to update the screenshare setting.
     * @param {Function} options.updateChatSetting - Function to update the chat setting.
     * @returns {void} A promise that resolves when the media settings have been updated.
     * @memberof UpdateMediaSettings
     */
    updateMediaSettings: ({ settings, updateAudioSetting, updateVideoSetting, updateScreenshareSetting, updateChatSetting, }: UpdateMediaSettingsOptions) => void;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdateMediaSettings, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UpdateMediaSettings>;
}
