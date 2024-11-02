import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
    updateMediaSettings = ({ settings, updateAudioSetting, updateVideoSetting, updateScreenshareSetting, updateChatSetting, }) => {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateMediaSettings, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateMediaSettings, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateMediaSettings, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLW1lZGlhLXNldHRpbmdzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdXBkYXRlLW1lZGlhLXNldHRpbmdzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFhM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBTUgsTUFBTSxPQUFPLG1CQUFtQjtJQUM5Qjs7Ozs7Ozs7Ozs7T0FXRztJQUVILG1CQUFtQixHQUFHLENBQUMsRUFDckIsUUFBUSxFQUNSLGtCQUFrQixFQUNsQixrQkFBa0IsRUFDbEIsd0JBQXdCLEVBQ3hCLGlCQUFpQixHQUNVLEVBQVEsRUFBRTtRQUNyQyxNQUFNLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsRUFBRSxXQUFXLENBQUMsR0FBRyxRQUFRLENBQUM7UUFFL0UsdUJBQXVCO1FBQ3ZCLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pDLHVCQUF1QjtRQUN2QixrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqQyw2QkFBNkI7UUFDN0Isd0JBQXdCLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUM3QyxzQkFBc0I7UUFDdEIsaUJBQWlCLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO3VHQS9CUyxtQkFBbUI7MkdBQW5CLG1CQUFtQixjQUZsQixNQUFNOzsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2V0dGluZ3MgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBVcGRhdGVNZWRpYVNldHRpbmdzT3B0aW9ucyB7XG4gIHNldHRpbmdzOiBTZXR0aW5ncztcbiAgdXBkYXRlQXVkaW9TZXR0aW5nOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlVmlkZW9TZXR0aW5nOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlQ2hhdFNldHRpbmc6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBVcGRhdGVNZWRpYVNldHRpbmdzVHlwZSA9IChvcHRpb25zOiBVcGRhdGVNZWRpYVNldHRpbmdzT3B0aW9ucykgPT4gdm9pZDtcblxuLyoqXG4gKiBTZXJ2aWNlIGZvciB1cGRhdGluZyBtZWRpYSBzZXR0aW5ncyBpbmNsdWRpbmcgYXVkaW8sIHZpZGVvLCBzY3JlZW5zaGFyZSwgYW5kIGNoYXQuXG4gKlxuICogQGNsYXNzXG4gKiBAbmFtZSBVcGRhdGVNZWRpYVNldHRpbmdzXG4gKiBAZGVzY3JpcHRpb24gUHJvdmlkZXMgYSBtZXRob2QgdG8gdXBkYXRlIG11bHRpcGxlIG1lZGlhIHNldHRpbmdzIGF0IG9uY2UgdXNpbmcgc3BlY2lmaWVkIHVwZGF0ZSBmdW5jdGlvbnMuXG4gKlxuICogQG1ldGhvZFxuICogdXBkYXRlTWVkaWFTZXR0aW5nc1xuICpcbiAqIEBwYXJhbSB7VXBkYXRlTWVkaWFTZXR0aW5nc09wdGlvbnN9IG9wdGlvbnMgLSBPcHRpb25zIGZvciB1cGRhdGluZyBtZWRpYSBzZXR0aW5nczpcbiAqICAgLSBgc2V0dGluZ3NgIHtTZXR0aW5nc306IFRoZSBzZXR0aW5ncyB2YWx1ZXMgdG8gYXBwbHkuXG4gKiAgIC0gYHVwZGF0ZUF1ZGlvU2V0dGluZ2Age0Z1bmN0aW9ufTogRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhdWRpbyBzZXR0aW5nLlxuICogICAtIGB1cGRhdGVWaWRlb1NldHRpbmdgIHtGdW5jdGlvbn06IEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlkZW8gc2V0dGluZy5cbiAqICAgLSBgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nYCB7RnVuY3Rpb259OiBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHNjcmVlbnNoYXJlIHNldHRpbmcuXG4gKiAgIC0gYHVwZGF0ZUNoYXRTZXR0aW5nYCB7RnVuY3Rpb259OiBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGNoYXQgc2V0dGluZy5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH0gVXBkYXRlcyBzZXR0aW5ncyBkaXJlY3RseSB0aHJvdWdoIHRoZSBwcm92aWRlZCBmdW5jdGlvbnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IHNldHRpbmdzID0gWydtdXRlJywgJ0hEJywgJ2VuYWJsZWQnLCAnZGlzYWJsZWQnXTtcbiAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gKiAgIHNldHRpbmdzLFxuICogICB1cGRhdGVBdWRpb1NldHRpbmc6ICh2YWx1ZSkgPT4gY29uc29sZS5sb2coYEF1ZGlvIHNldHRpbmcgdXBkYXRlZCB0bzogJHt2YWx1ZX1gKSxcbiAqICAgdXBkYXRlVmlkZW9TZXR0aW5nOiAodmFsdWUpID0+IGNvbnNvbGUubG9nKGBWaWRlbyBzZXR0aW5nIHVwZGF0ZWQgdG86ICR7dmFsdWV9YCksXG4gKiAgIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZzogKHZhbHVlKSA9PiBjb25zb2xlLmxvZyhgU2NyZWVuc2hhcmUgc2V0dGluZyB1cGRhdGVkIHRvOiAke3ZhbHVlfWApLFxuICogICB1cGRhdGVDaGF0U2V0dGluZzogKHZhbHVlKSA9PiBjb25zb2xlLmxvZyhgQ2hhdCBzZXR0aW5nIHVwZGF0ZWQgdG86ICR7dmFsdWV9YClcbiAqIH07XG4gKiB1cGRhdGVNZWRpYVNldHRpbmdzU2VydmljZS51cGRhdGVNZWRpYVNldHRpbmdzKG9wdGlvbnMpO1xuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFVwZGF0ZU1lZGlhU2V0dGluZ3Mge1xuICAvKipcbiAgICogVXBkYXRlcyB0aGUgbWVkaWEgc2V0dGluZ3MgYnkgaW52b2tpbmcgdGhlIHByb3ZpZGVkIHVwZGF0ZSBmdW5jdGlvbnMgZm9yIGVhY2ggc2V0dGluZy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdXBkYXRpbmcgdGhlIG1lZGlhIHNldHRpbmdzLlxuICAgKiBAcGFyYW0ge1NldHRpbmdzfSBvcHRpb25zLnNldHRpbmdzIC0gVGhlIG1lZGlhIHNldHRpbmdzIHRvIHVwZGF0ZS5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVBdWRpb1NldHRpbmcgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGF1ZGlvIHNldHRpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlVmlkZW9TZXR0aW5nIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aWRlbyBzZXR0aW5nLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2NyZWVuc2hhcmUgc2V0dGluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVDaGF0U2V0dGluZyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgY2hhdCBzZXR0aW5nLlxuICAgKiBAcmV0dXJucyB7dm9pZH0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbWVkaWEgc2V0dGluZ3MgaGF2ZSBiZWVuIHVwZGF0ZWQuXG4gICAqIEBtZW1iZXJvZiBVcGRhdGVNZWRpYVNldHRpbmdzXG4gICAqL1xuXG4gIHVwZGF0ZU1lZGlhU2V0dGluZ3MgPSAoe1xuICAgIHNldHRpbmdzLFxuICAgIHVwZGF0ZUF1ZGlvU2V0dGluZyxcbiAgICB1cGRhdGVWaWRlb1NldHRpbmcsXG4gICAgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nLFxuICAgIHVwZGF0ZUNoYXRTZXR0aW5nLFxuICB9OiBVcGRhdGVNZWRpYVNldHRpbmdzT3B0aW9ucyk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IFthdWRpb1NldHRpbmcsIHZpZGVvU2V0dGluZywgc2NyZWVuc2hhcmVTZXR0aW5nLCBjaGF0U2V0dGluZ10gPSBzZXR0aW5ncztcblxuICAgIC8vIFVwZGF0ZSBhdWRpbyBzZXR0aW5nXG4gICAgdXBkYXRlQXVkaW9TZXR0aW5nKGF1ZGlvU2V0dGluZyk7XG4gICAgLy8gVXBkYXRlIHZpZGVvIHNldHRpbmdcbiAgICB1cGRhdGVWaWRlb1NldHRpbmcodmlkZW9TZXR0aW5nKTtcbiAgICAvLyBVcGRhdGUgc2NyZWVuc2hhcmUgc2V0dGluZ1xuICAgIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZyhzY3JlZW5zaGFyZVNldHRpbmcpO1xuICAgIC8vIFVwZGF0ZSBjaGF0IHNldHRpbmdcbiAgICB1cGRhdGVDaGF0U2V0dGluZyhjaGF0U2V0dGluZyk7XG4gIH07XG59XG4iXX0=