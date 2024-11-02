import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
    async checkPermission({ permissionType, audioSetting, videoSetting, screenshareSetting, chatSetting, }) {
        try {
            // Perform a switch case to check for the permissionType and return the response
            switch (permissionType) {
                case 'audioSetting':
                    if (audioSetting === 'allow') {
                        return 0;
                    }
                    else if (audioSetting === 'approval') {
                        return 1;
                    }
                    else {
                        return 2;
                    }
                case 'videoSetting':
                    if (videoSetting === 'allow') {
                        return 0;
                    }
                    else if (videoSetting === 'approval') {
                        return 1;
                    }
                    else {
                        return 2;
                    }
                case 'screenshareSetting':
                    if (screenshareSetting === 'allow') {
                        return 0;
                    }
                    else if (screenshareSetting === 'approval') {
                        return 1;
                    }
                    else {
                        return 2;
                    }
                case 'chatSetting':
                    if (chatSetting === 'allow') {
                        return 0;
                    }
                    else if (chatSetting === 'approval') {
                        return 1;
                    }
                    else {
                        return 2;
                    }
                default:
                    // throw new Error(`Invalid permissionType: ${permissionType}`);
                    return 2;
            }
        }
        catch (error) {
            // console.log('checkPermission error', error);
            // throw error;
            return 2;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CheckPermission, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CheckPermission, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CheckPermission, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stcGVybWlzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jaGVjay1wZXJtaXNzaW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFZekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQU1MLE1BQU0sT0FBTyxlQUFlO0lBQzFCOzs7Ozs7Ozs7OztPQVdHO0lBRUgsS0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUNwQixjQUFjLEVBQ2QsWUFBWSxFQUNaLFlBQVksRUFDWixrQkFBa0IsRUFDbEIsV0FBVyxHQUNZO1FBQ3ZCLElBQUksQ0FBQztZQUNILGdGQUFnRjtZQUNoRixRQUFRLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixLQUFLLGNBQWM7b0JBQ2pCLElBQUksWUFBWSxLQUFLLE9BQU8sRUFBRSxDQUFDO3dCQUM3QixPQUFPLENBQUMsQ0FBQztvQkFDWCxDQUFDO3lCQUFNLElBQUksWUFBWSxLQUFLLFVBQVUsRUFBRSxDQUFDO3dCQUN2QyxPQUFPLENBQUMsQ0FBQztvQkFDWCxDQUFDO3lCQUFNLENBQUM7d0JBQ04sT0FBTyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztnQkFDSCxLQUFLLGNBQWM7b0JBQ2pCLElBQUksWUFBWSxLQUFLLE9BQU8sRUFBRSxDQUFDO3dCQUM3QixPQUFPLENBQUMsQ0FBQztvQkFDWCxDQUFDO3lCQUFNLElBQUksWUFBWSxLQUFLLFVBQVUsRUFBRSxDQUFDO3dCQUN2QyxPQUFPLENBQUMsQ0FBQztvQkFDWCxDQUFDO3lCQUFNLENBQUM7d0JBQ04sT0FBTyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztnQkFDSCxLQUFLLG9CQUFvQjtvQkFDdkIsSUFBSSxrQkFBa0IsS0FBSyxPQUFPLEVBQUUsQ0FBQzt3QkFDbkMsT0FBTyxDQUFDLENBQUM7b0JBQ1gsQ0FBQzt5QkFBTSxJQUFJLGtCQUFrQixLQUFLLFVBQVUsRUFBRSxDQUFDO3dCQUM3QyxPQUFPLENBQUMsQ0FBQztvQkFDWCxDQUFDO3lCQUFNLENBQUM7d0JBQ04sT0FBTyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztnQkFDSCxLQUFLLGFBQWE7b0JBQ2hCLElBQUksV0FBVyxLQUFLLE9BQU8sRUFBRSxDQUFDO3dCQUM1QixPQUFPLENBQUMsQ0FBQztvQkFDWCxDQUFDO3lCQUFNLElBQUksV0FBVyxLQUFLLFVBQVUsRUFBRSxDQUFDO3dCQUN0QyxPQUFPLENBQUMsQ0FBQztvQkFDWCxDQUFDO3lCQUFNLENBQUM7d0JBQ04sT0FBTyxDQUFDLENBQUM7b0JBQ1gsQ0FBQztnQkFDSDtvQkFDRSxnRUFBZ0U7b0JBQ2hFLE9BQU8sQ0FBQyxDQUFDO1lBQ2IsQ0FBQztRQUNILENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsK0NBQStDO1lBQy9DLGVBQWU7WUFDZixPQUFPLENBQUMsQ0FBQztRQUNYLENBQUM7SUFDSCxDQUFDO3VHQWpFVSxlQUFlOzJHQUFmLGVBQWUsY0FGZCxNQUFNOzsyRkFFUCxlQUFlO2tCQUgzQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgQ2hlY2tQZXJtaXNzaW9uT3B0aW9ucyB7XG4gIGF1ZGlvU2V0dGluZzogc3RyaW5nO1xuICB2aWRlb1NldHRpbmc6IHN0cmluZztcbiAgc2NyZWVuc2hhcmVTZXR0aW5nOiBzdHJpbmc7XG4gIGNoYXRTZXR0aW5nOiBzdHJpbmc7XG4gIHBlcm1pc3Npb25UeXBlOiAnYXVkaW9TZXR0aW5nJyB8ICd2aWRlb1NldHRpbmcnIHwgJ3NjcmVlbnNoYXJlU2V0dGluZycgfCAnY2hhdFNldHRpbmcnO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBDaGVja1Blcm1pc3Npb25UeXBlID0gKG9wdGlvbnM6IENoZWNrUGVybWlzc2lvbk9wdGlvbnMpID0+IFByb21pc2U8bnVtYmVyPjtcblxuICAvKipcbiAgICogQ2hlY2tzIHRoZSBwZXJtaXNzaW9uIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBzZXR0aW5ncy5cbiAgICpcbiAgICogQHBhcmFtIHtDaGVja1Blcm1pc3Npb25PcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNoZWNraW5nIHBlcm1pc3Npb25zLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wZXJtaXNzaW9uVHlwZSAtIFRoZSB0eXBlIG9mIHBlcm1pc3Npb24gdG8gY2hlY2suIENhbiBiZSBcImF1ZGlvU2V0dGluZ1wiLCBcInZpZGVvU2V0dGluZ1wiLCBcInNjcmVlbnNoYXJlU2V0dGluZ1wiLCBvciBcImNoYXRTZXR0aW5nXCIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmF1ZGlvU2V0dGluZyAtIFRoZSBzZXR0aW5nIGZvciBhdWRpbyBwZXJtaXNzaW9uLiBDYW4gYmUgXCJhbGxvd1wiLCBcImFwcHJvdmFsXCIsIG9yIG90aGVyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy52aWRlb1NldHRpbmcgLSBUaGUgc2V0dGluZyBmb3IgdmlkZW8gcGVybWlzc2lvbi4gQ2FuIGJlIFwiYWxsb3dcIiwgXCJhcHByb3ZhbFwiLCBvciBvdGhlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc2NyZWVuc2hhcmVTZXR0aW5nIC0gVGhlIHNldHRpbmcgZm9yIHNjcmVlbnNoYXJlIHBlcm1pc3Npb24uIENhbiBiZSBcImFsbG93XCIsIFwiYXBwcm92YWxcIiwgb3Igb3RoZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNoYXRTZXR0aW5nIC0gVGhlIHNldHRpbmcgZm9yIGNoYXQgcGVybWlzc2lvbi4gQ2FuIGJlIFwiYWxsb3dcIiwgXCJhcHByb3ZhbFwiLCBvciBvdGhlci5cbiAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn0gLSBSZXR1cm5zIDAgaWYgdGhlIHNldHRpbmcgaXMgXCJhbGxvd1wiLCAxIGlmIHRoZSBzZXR0aW5nIGlzIFwiYXBwcm92YWxcIiwgYW5kIDIgZm9yIG90aGVyIHNldHRpbmdzIG9yIGludmFsaWQgcGVybWlzc2lvbiB0eXBlcy5cbiAgICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIGFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJzIGR1cmluZyB0aGUgcGVybWlzc2lvbiBjaGVjay5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgb3B0aW9ucyA9IHtcbiAgICogICBwZXJtaXNzaW9uVHlwZTogJ3ZpZGVvU2V0dGluZycsXG4gICAqICAgYXVkaW9TZXR0aW5nOiAnYWxsb3cnLFxuICAgKiAgIHZpZGVvU2V0dGluZzogJ2FwcHJvdmFsJyxcbiAgICogICBzY3JlZW5zaGFyZVNldHRpbmc6ICdkZW55JyxcbiAgICogICBjaGF0U2V0dGluZzogJ2FsbG93JyxcbiAgICogfTtcbiAgICpcbiAgICogY29uc3QgcmVzdWx0ID0gYXdhaXQgY2hlY2tQZXJtaXNzaW9uU2VydmljZS5jaGVja1Blcm1pc3Npb24ob3B0aW9ucyk7XG4gICAqIGNvbnNvbGUubG9nKHJlc3VsdCk7XG4gICAqIC8vIE91dHB1dDogMSAoc2luY2UgdmlkZW9TZXR0aW5nIGlzICdhcHByb3ZhbCcpXG4gICAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDaGVja1Blcm1pc3Npb24ge1xuICAvKipcbiAgICogQ2hlY2tzIHRoZSBwZXJtaXNzaW9uIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBzZXR0aW5ncy5cbiAgICpcbiAgICogQHBhcmFtIHtDaGVja1Blcm1pc3Npb25PcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNoZWNraW5nIHBlcm1pc3Npb25zLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wZXJtaXNzaW9uVHlwZSAtIFRoZSB0eXBlIG9mIHBlcm1pc3Npb24gdG8gY2hlY2suIENhbiBiZSBcImF1ZGlvU2V0dGluZ1wiLCBcInZpZGVvU2V0dGluZ1wiLCBcInNjcmVlbnNoYXJlU2V0dGluZ1wiLCBvciBcImNoYXRTZXR0aW5nXCIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmF1ZGlvU2V0dGluZyAtIFRoZSBzZXR0aW5nIGZvciBhdWRpbyBwZXJtaXNzaW9uLiBDYW4gYmUgXCJhbGxvd1wiLCBcImFwcHJvdmFsXCIsIG9yIG90aGVyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy52aWRlb1NldHRpbmcgLSBUaGUgc2V0dGluZyBmb3IgdmlkZW8gcGVybWlzc2lvbi4gQ2FuIGJlIFwiYWxsb3dcIiwgXCJhcHByb3ZhbFwiLCBvciBvdGhlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc2NyZWVuc2hhcmVTZXR0aW5nIC0gVGhlIHNldHRpbmcgZm9yIHNjcmVlbnNoYXJlIHBlcm1pc3Npb24uIENhbiBiZSBcImFsbG93XCIsIFwiYXBwcm92YWxcIiwgb3Igb3RoZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLmNoYXRTZXR0aW5nIC0gVGhlIHNldHRpbmcgZm9yIGNoYXQgcGVybWlzc2lvbi4gQ2FuIGJlIFwiYWxsb3dcIiwgXCJhcHByb3ZhbFwiLCBvciBvdGhlci5cbiAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyPn0gLSBSZXR1cm5zIDAgaWYgdGhlIHNldHRpbmcgaXMgXCJhbGxvd1wiLCAxIGlmIHRoZSBzZXR0aW5nIGlzIFwiYXBwcm92YWxcIiwgYW5kIDIgZm9yIG90aGVyIHNldHRpbmdzIG9yIGludmFsaWQgcGVybWlzc2lvbiB0eXBlcy5cbiAgICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIGFuIHVuZXhwZWN0ZWQgZXJyb3Igb2NjdXJzIGR1cmluZyB0aGUgcGVybWlzc2lvbiBjaGVjay5cbiAgICovXG5cbiAgYXN5bmMgY2hlY2tQZXJtaXNzaW9uKHtcbiAgICBwZXJtaXNzaW9uVHlwZSxcbiAgICBhdWRpb1NldHRpbmcsXG4gICAgdmlkZW9TZXR0aW5nLFxuICAgIHNjcmVlbnNoYXJlU2V0dGluZyxcbiAgICBjaGF0U2V0dGluZyxcbiAgfTogQ2hlY2tQZXJtaXNzaW9uT3B0aW9ucyk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIFBlcmZvcm0gYSBzd2l0Y2ggY2FzZSB0byBjaGVjayBmb3IgdGhlIHBlcm1pc3Npb25UeXBlIGFuZCByZXR1cm4gdGhlIHJlc3BvbnNlXG4gICAgICBzd2l0Y2ggKHBlcm1pc3Npb25UeXBlKSB7XG4gICAgICAgIGNhc2UgJ2F1ZGlvU2V0dGluZyc6XG4gICAgICAgICAgaWYgKGF1ZGlvU2V0dGluZyA9PT0gJ2FsbG93Jykge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSBlbHNlIGlmIChhdWRpb1NldHRpbmcgPT09ICdhcHByb3ZhbCcpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3ZpZGVvU2V0dGluZyc6XG4gICAgICAgICAgaWYgKHZpZGVvU2V0dGluZyA9PT0gJ2FsbG93Jykge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSBlbHNlIGlmICh2aWRlb1NldHRpbmcgPT09ICdhcHByb3ZhbCcpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ3NjcmVlbnNoYXJlU2V0dGluZyc6XG4gICAgICAgICAgaWYgKHNjcmVlbnNoYXJlU2V0dGluZyA9PT0gJ2FsbG93Jykge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfSBlbHNlIGlmIChzY3JlZW5zaGFyZVNldHRpbmcgPT09ICdhcHByb3ZhbCcpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICB9XG4gICAgICAgIGNhc2UgJ2NoYXRTZXR0aW5nJzpcbiAgICAgICAgICBpZiAoY2hhdFNldHRpbmcgPT09ICdhbGxvdycpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY2hhdFNldHRpbmcgPT09ICdhcHByb3ZhbCcpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gMjtcbiAgICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgLy8gdGhyb3cgbmV3IEVycm9yKGBJbnZhbGlkIHBlcm1pc3Npb25UeXBlOiAke3Blcm1pc3Npb25UeXBlfWApO1xuICAgICAgICAgIHJldHVybiAyO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBjb25zb2xlLmxvZygnY2hlY2tQZXJtaXNzaW9uIGVycm9yJywgZXJyb3IpO1xuICAgICAgLy8gdGhyb3cgZXJyb3I7XG4gICAgICByZXR1cm4gMjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==