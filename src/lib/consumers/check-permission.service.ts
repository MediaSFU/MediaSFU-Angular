import { Injectable } from '@angular/core';
export interface CheckPermissionOptions {
  audioSetting: string;
  videoSetting: string;
  screenshareSetting: string;
  chatSetting: string;
  permissionType: 'audioSetting' | 'videoSetting' | 'screenshareSetting' | 'chatSetting';
}

// Export the type definition for the function
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


@Injectable({
  providedIn: 'root',
})
export class CheckPermission {
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

  async checkPermission({
    permissionType,
    audioSetting,
    videoSetting,
    screenshareSetting,
    chatSetting,
  }: CheckPermissionOptions): Promise<number> {
    try {
      // Perform a switch case to check for the permissionType and return the response
      switch (permissionType) {
        case 'audioSetting':
          if (audioSetting === 'allow') {
            return 0;
          } else if (audioSetting === 'approval') {
            return 1;
          } else {
            return 2;
          }
        case 'videoSetting':
          if (videoSetting === 'allow') {
            return 0;
          } else if (videoSetting === 'approval') {
            return 1;
          } else {
            return 2;
          }
        case 'screenshareSetting':
          if (screenshareSetting === 'allow') {
            return 0;
          } else if (screenshareSetting === 'approval') {
            return 1;
          } else {
            return 2;
          }
        case 'chatSetting':
          if (chatSetting === 'allow') {
            return 0;
          } else if (chatSetting === 'approval') {
            return 1;
          } else {
            return 2;
          }
        default:
          // throw new Error(`Invalid permissionType: ${permissionType}`);
          return 2;
      }
    } catch (error) {
      // console.log('checkPermission error', error);
      // throw error;
      return 2;
    }
  }
}
