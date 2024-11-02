import { Socket } from 'socket.io-client';
import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface ModifySettingsOptions {
    showAlert?: ShowAlert;
    roomName: string;
    audioSet: string;
    videoSet: string;
    screenshareSet: string;
    chatSet: string;
    socket: Socket;
    updateAudioSetting: (audioSet: string) => void;
    updateVideoSetting: (videoSet: string) => void;
    updateScreenshareSetting: (screenshareSet: string) => void;
    updateChatSetting: (chatSet: string) => void;
    updateIsSettingsModalVisible: (isVisible: boolean) => void;
}
export type ModifySettingsType = (options: ModifySettingsOptions) => Promise<void>;
/**
 * Modifies the settings for a given room and updates the state accordingly.
 *
 * @param {ModifySettingsOptions} options - The options for modifying settings.
 * @param {Function} options.showAlert - Function to show alert messages.
 * @param {string} options.roomName - The name of the room.
 * @param {string} options.audioSet - The audio setting to be applied.
 * @param {string} options.videoSet - The video setting to be applied.
 * @param {string} options.screenshareSet - The screenshare setting to be applied.
 * @param {string} options.chatSet - The chat setting to be applied.
 * @param {Socket} options.socket - The socket instance for emitting events.
 * @param {Function} options.updateAudioSetting - Function to update the audio setting state.
 * @param {Function} options.updateVideoSetting - Function to update the video setting state.
 * @param {Function} options.updateScreenshareSetting - Function to update the screenshare setting state.
 * @param {Function} options.updateChatSetting - Function to update the chat setting state.
 * @param {Function} options.updateIsSettingsModalVisible - Function to update the visibility of the settings modal.
 *
 * @returns {Promise<void>} A promise that resolves when the settings have been modified.
 *
 * @throws Will show an alert if any setting is set to "approval" in demo mode (room name starts with "d").
 *
 * @example
 * ```typescript
 * const options: ModifySettingsOptions = {
 *   showAlert: (alert) => console.log(alert),
 *   roomName: 'exampleRoom',
 *   audioSet: 'enabled',
 *   videoSet: 'disabled',
 *   screenshareSet: 'approval',
 *   chatSet: 'enabled',
 *   socket: socketInstance,
 *   updateAudioSetting: (audio) => console.log('Audio setting updated:', audio),
 *   updateVideoSetting: (video) => console.log('Video setting updated:', video),
 *   updateScreenshareSetting: (screenshare) => console.log('Screenshare setting updated:', screenshare),
 *   updateChatSetting: (chat) => console.log('Chat setting updated:', chat),
 *   updateIsSettingsModalVisible: (visible) => console.log('Settings modal visibility:', visible),
 * };
 *
 * const modifySettingsService = new ModifySettings();
 * await modifySettingsService.modifySettings(options);
 * ```
 */
export declare class ModifySettings {
    /**
     * Modifies the settings for a given room and updates the state accordingly.
     *
     * @param {Object} options - The options for modifying settings.
     * @param {Function} options.showAlert - Function to show alert messages.
     * @param {string} options.roomName - The name of the room.
     * @param {string} options.audioSet - The audio setting to be applied.
     * @param {string} options.videoSet - The video setting to be applied.
     * @param {string} options.screenshareSet - The screenshare setting to be applied.
     * @param {string} options.chatSet - The chat setting to be applied.
     * @param {Object} options.socket - The socket instance for emitting events.
     * @param {Function} options.updateAudioSetting - Function to update the audio setting state.
     * @param {Function} options.updateVideoSetting - Function to update the video setting state.
     * @param {Function} options.updateScreenshareSetting - Function to update the screenshare setting state.
     * @param {Function} options.updateChatSetting - Function to update the chat setting state.
     * @param {Function} options.updateIsSettingsModalVisible - Function to update the visibility of the settings modal.
     *
     * @returns {Promise<void>} A promise that resolves when the settings have been modified.
     *
     * @throws Will show an alert if any setting is set to "approval" in demo mode (room name starts with "d").
     */
    modifySettings: ({ showAlert, roomName, audioSet, videoSet, screenshareSet, chatSet, socket, updateAudioSetting, updateVideoSetting, updateScreenshareSetting, updateChatSetting, updateIsSettingsModalVisible, }: ModifySettingsOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModifySettings, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ModifySettings>;
}
