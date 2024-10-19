import { Injectable } from '@angular/core';
import { Settings } from '../../@types/types';
export interface UpdateMediaSettingsOptions {
  settings: Settings;
  updateAudioSetting: (value: string) => void;
  updateVideoSetting: (value: string) => void;
  updateScreenshareSetting: (value: string) => void;
  updateChatSetting: (value: string) => void;
}

// Export the type definition for the function
export type UpdateMediaSettingsType = (options: UpdateMediaSettingsOptions) => void;

@Injectable({
  providedIn: 'root',
})
export class UpdateMediaSettings {
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

  updateMediaSettings = ({
    settings,
    updateAudioSetting,
    updateVideoSetting,
    updateScreenshareSetting,
    updateChatSetting,
  }: UpdateMediaSettingsOptions): void => {
    const [audioSetting, videoSetting, screenshareSetting, chatSetting] = settings;

    // Update audio setting
    updateAudioSetting(audioSetting);
    // Update video setting
    updateVideoSetting(videoSetting);
    // Update screenshare setting
    updateScreenshareSetting(screenshareSetting);
    // Update chat setting
    updateChatSetting(chatSetting);
  };
}
