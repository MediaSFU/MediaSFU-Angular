import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLW1lZGlhLXNldHRpbmdzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvdXBkYXRlLW1lZGlhLXNldHRpbmdzLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFnQjNDLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7Ozs7Ozs7Ozs7O09BV0c7SUFFSCxtQkFBbUIsR0FBRyxDQUFDLEVBQ3JCLFFBQVEsRUFDUixrQkFBa0IsRUFDbEIsa0JBQWtCLEVBQ2xCLHdCQUF3QixFQUN4QixpQkFBaUIsR0FDVSxFQUFRLEVBQUU7UUFDckMsTUFBTSxDQUFDLFlBQVksRUFBRSxZQUFZLEVBQUUsa0JBQWtCLEVBQUUsV0FBVyxDQUFDLEdBQUcsUUFBUSxDQUFDO1FBRS9FLHVCQUF1QjtRQUN2QixrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqQyx1QkFBdUI7UUFDdkIsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakMsNkJBQTZCO1FBQzdCLHdCQUF3QixDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDN0Msc0JBQXNCO1FBQ3RCLGlCQUFpQixDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQzt1R0EvQlMsbUJBQW1COzJHQUFuQixtQkFBbUIsY0FGbEIsTUFBTTs7MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNldHRpbmdzIH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlTWVkaWFTZXR0aW5nc09wdGlvbnMge1xuICBzZXR0aW5nczogU2V0dGluZ3M7XG4gIHVwZGF0ZUF1ZGlvU2V0dGluZzogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVZpZGVvU2V0dGluZzogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZzogKHZhbHVlOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUNoYXRTZXR0aW5nOiAodmFsdWU6IHN0cmluZykgPT4gdm9pZDtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgVXBkYXRlTWVkaWFTZXR0aW5nc1R5cGUgPSAob3B0aW9uczogVXBkYXRlTWVkaWFTZXR0aW5nc09wdGlvbnMpID0+IHZvaWQ7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVcGRhdGVNZWRpYVNldHRpbmdzIHtcbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIG1lZGlhIHNldHRpbmdzIGJ5IGludm9raW5nIHRoZSBwcm92aWRlZCB1cGRhdGUgZnVuY3Rpb25zIGZvciBlYWNoIHNldHRpbmcuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHVwZGF0aW5nIHRoZSBtZWRpYSBzZXR0aW5ncy5cbiAgICogQHBhcmFtIHtTZXR0aW5nc30gb3B0aW9ucy5zZXR0aW5ncyAtIFRoZSBtZWRpYSBzZXR0aW5ncyB0byB1cGRhdGUuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlQXVkaW9TZXR0aW5nIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhdWRpbyBzZXR0aW5nLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnVwZGF0ZVZpZGVvU2V0dGluZyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlkZW8gc2V0dGluZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy51cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHNjcmVlbnNoYXJlIHNldHRpbmcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMudXBkYXRlQ2hhdFNldHRpbmcgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGNoYXQgc2V0dGluZy5cbiAgICogQHJldHVybnMge3ZvaWR9IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1lZGlhIHNldHRpbmdzIGhhdmUgYmVlbiB1cGRhdGVkLlxuICAgKiBAbWVtYmVyb2YgVXBkYXRlTWVkaWFTZXR0aW5nc1xuICAgKi9cblxuICB1cGRhdGVNZWRpYVNldHRpbmdzID0gKHtcbiAgICBzZXR0aW5ncyxcbiAgICB1cGRhdGVBdWRpb1NldHRpbmcsXG4gICAgdXBkYXRlVmlkZW9TZXR0aW5nLFxuICAgIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZyxcbiAgICB1cGRhdGVDaGF0U2V0dGluZyxcbiAgfTogVXBkYXRlTWVkaWFTZXR0aW5nc09wdGlvbnMpOiB2b2lkID0+IHtcbiAgICBjb25zdCBbYXVkaW9TZXR0aW5nLCB2aWRlb1NldHRpbmcsIHNjcmVlbnNoYXJlU2V0dGluZywgY2hhdFNldHRpbmddID0gc2V0dGluZ3M7XG5cbiAgICAvLyBVcGRhdGUgYXVkaW8gc2V0dGluZ1xuICAgIHVwZGF0ZUF1ZGlvU2V0dGluZyhhdWRpb1NldHRpbmcpO1xuICAgIC8vIFVwZGF0ZSB2aWRlbyBzZXR0aW5nXG4gICAgdXBkYXRlVmlkZW9TZXR0aW5nKHZpZGVvU2V0dGluZyk7XG4gICAgLy8gVXBkYXRlIHNjcmVlbnNoYXJlIHNldHRpbmdcbiAgICB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcoc2NyZWVuc2hhcmVTZXR0aW5nKTtcbiAgICAvLyBVcGRhdGUgY2hhdCBzZXR0aW5nXG4gICAgdXBkYXRlQ2hhdFNldHRpbmcoY2hhdFNldHRpbmcpO1xuICB9O1xufVxuIl19