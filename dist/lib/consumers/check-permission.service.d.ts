import * as i0 from "@angular/core";
export interface CheckPermissionOptions {
    audioSetting: string;
    videoSetting: string;
    screenshareSetting: string;
    chatSetting: string;
    permissionType: 'audioSetting' | 'videoSetting' | 'screenshareSetting' | 'chatSetting';
}
export type CheckPermissionType = (options: CheckPermissionOptions) => Promise<number>;
/**
 * Checks the permission based on the provided settings.
 *
 * @param {CheckPermissionOptions} options - The options for checking permissions.
 * @param {string} options.permissionType - The type of permission to check. Can be "audioSetting", "videoSetting", "screenshareSetting", or "chatSetting".
 * @param {string} options.audioSetting - The setting for audio permission. Can be "allow", "approval", or other.
 * @param {string} options.videoSetting - The setting for video permission. Can be "allow", "approval", or other.
 * @param {string} options.screenshareSetting - The setting for screenshare permission. Can be "allow", "approval", or other.
 * @param {string} options.chatSetting - The setting for chat permission. Can be "allow", "approval", or other.
 * @returns {Promise<number>} - Returns 0 if the setting is "allow", 1 if the setting is "approval", and 2 for other settings or invalid permission types.
 * @throws Will throw an error if an unexpected error occurs during the permission check.
 *
 * @example
 * const options = {
 *   permissionType: 'videoSetting',
 *   audioSetting: 'allow',
 *   videoSetting: 'approval',
 *   screenshareSetting: 'deny',
 *   chatSetting: 'allow',
 * };
 *
 * const result = await checkPermissionService.checkPermission(options);
 * console.log(result);
 * // Output: 1 (since videoSetting is 'approval')
 */
export declare class CheckPermission {
    /**
     * Checks the permission based on the provided settings.
     *
     * @param {CheckPermissionOptions} options - The options for checking permissions.
     * @param {string} options.permissionType - The type of permission to check. Can be "audioSetting", "videoSetting", "screenshareSetting", or "chatSetting".
     * @param {string} options.audioSetting - The setting for audio permission. Can be "allow", "approval", or other.
     * @param {string} options.videoSetting - The setting for video permission. Can be "allow", "approval", or other.
     * @param {string} options.screenshareSetting - The setting for screenshare permission. Can be "allow", "approval", or other.
     * @param {string} options.chatSetting - The setting for chat permission. Can be "allow", "approval", or other.
     * @returns {Promise<number>} - Returns 0 if the setting is "allow", 1 if the setting is "approval", and 2 for other settings or invalid permission types.
     * @throws Will throw an error if an unexpected error occurs during the permission check.
     */
    checkPermission({ permissionType, audioSetting, videoSetting, screenshareSetting, chatSetting, }: CheckPermissionOptions): Promise<number>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckPermission, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckPermission>;
}
