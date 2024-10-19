import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stcGVybWlzc2lvbi5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jaGVjay1wZXJtaXNzaW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFlM0MsTUFBTSxPQUFPLGVBQWU7SUFDMUI7Ozs7Ozs7Ozs7O09BV0c7SUFFSCxLQUFLLENBQUMsZUFBZSxDQUFDLEVBQ3BCLGNBQWMsRUFDZCxZQUFZLEVBQ1osWUFBWSxFQUNaLGtCQUFrQixFQUNsQixXQUFXLEdBQ1k7UUFDdkIsSUFBSSxDQUFDO1lBQ0gsZ0ZBQWdGO1lBQ2hGLFFBQVEsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLEtBQUssY0FBYztvQkFDakIsSUFBSSxZQUFZLEtBQUssT0FBTyxFQUFFLENBQUM7d0JBQzdCLE9BQU8sQ0FBQyxDQUFDO29CQUNYLENBQUM7eUJBQU0sSUFBSSxZQUFZLEtBQUssVUFBVSxFQUFFLENBQUM7d0JBQ3ZDLE9BQU8sQ0FBQyxDQUFDO29CQUNYLENBQUM7eUJBQU0sQ0FBQzt3QkFDTixPQUFPLENBQUMsQ0FBQztvQkFDWCxDQUFDO2dCQUNILEtBQUssY0FBYztvQkFDakIsSUFBSSxZQUFZLEtBQUssT0FBTyxFQUFFLENBQUM7d0JBQzdCLE9BQU8sQ0FBQyxDQUFDO29CQUNYLENBQUM7eUJBQU0sSUFBSSxZQUFZLEtBQUssVUFBVSxFQUFFLENBQUM7d0JBQ3ZDLE9BQU8sQ0FBQyxDQUFDO29CQUNYLENBQUM7eUJBQU0sQ0FBQzt3QkFDTixPQUFPLENBQUMsQ0FBQztvQkFDWCxDQUFDO2dCQUNILEtBQUssb0JBQW9CO29CQUN2QixJQUFJLGtCQUFrQixLQUFLLE9BQU8sRUFBRSxDQUFDO3dCQUNuQyxPQUFPLENBQUMsQ0FBQztvQkFDWCxDQUFDO3lCQUFNLElBQUksa0JBQWtCLEtBQUssVUFBVSxFQUFFLENBQUM7d0JBQzdDLE9BQU8sQ0FBQyxDQUFDO29CQUNYLENBQUM7eUJBQU0sQ0FBQzt3QkFDTixPQUFPLENBQUMsQ0FBQztvQkFDWCxDQUFDO2dCQUNILEtBQUssYUFBYTtvQkFDaEIsSUFBSSxXQUFXLEtBQUssT0FBTyxFQUFFLENBQUM7d0JBQzVCLE9BQU8sQ0FBQyxDQUFDO29CQUNYLENBQUM7eUJBQU0sSUFBSSxXQUFXLEtBQUssVUFBVSxFQUFFLENBQUM7d0JBQ3RDLE9BQU8sQ0FBQyxDQUFDO29CQUNYLENBQUM7eUJBQU0sQ0FBQzt3QkFDTixPQUFPLENBQUMsQ0FBQztvQkFDWCxDQUFDO2dCQUNIO29CQUNFLGdFQUFnRTtvQkFDaEUsT0FBTyxDQUFDLENBQUM7WUFDYixDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZiwrQ0FBK0M7WUFDL0MsZUFBZTtZQUNmLE9BQU8sQ0FBQyxDQUFDO1FBQ1gsQ0FBQztJQUNILENBQUM7dUdBakVVLGVBQWU7MkdBQWYsZUFBZSxjQUZkLE1BQU07OzJGQUVQLGVBQWU7a0JBSDNCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBDaGVja1Blcm1pc3Npb25PcHRpb25zIHtcbiAgYXVkaW9TZXR0aW5nOiBzdHJpbmc7XG4gIHZpZGVvU2V0dGluZzogc3RyaW5nO1xuICBzY3JlZW5zaGFyZVNldHRpbmc6IHN0cmluZztcbiAgY2hhdFNldHRpbmc6IHN0cmluZztcbiAgcGVybWlzc2lvblR5cGU6ICdhdWRpb1NldHRpbmcnIHwgJ3ZpZGVvU2V0dGluZycgfCAnc2NyZWVuc2hhcmVTZXR0aW5nJyB8ICdjaGF0U2V0dGluZyc7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENoZWNrUGVybWlzc2lvblR5cGUgPSAob3B0aW9uczogQ2hlY2tQZXJtaXNzaW9uT3B0aW9ucykgPT4gUHJvbWlzZTxudW1iZXI+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2hlY2tQZXJtaXNzaW9uIHtcbiAgLyoqXG4gICAqIENoZWNrcyB0aGUgcGVybWlzc2lvbiBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgc2V0dGluZ3MuXG4gICAqXG4gICAqIEBwYXJhbSB7Q2hlY2tQZXJtaXNzaW9uT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBjaGVja2luZyBwZXJtaXNzaW9ucy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGVybWlzc2lvblR5cGUgLSBUaGUgdHlwZSBvZiBwZXJtaXNzaW9uIHRvIGNoZWNrLiBDYW4gYmUgXCJhdWRpb1NldHRpbmdcIiwgXCJ2aWRlb1NldHRpbmdcIiwgXCJzY3JlZW5zaGFyZVNldHRpbmdcIiwgb3IgXCJjaGF0U2V0dGluZ1wiLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5hdWRpb1NldHRpbmcgLSBUaGUgc2V0dGluZyBmb3IgYXVkaW8gcGVybWlzc2lvbi4gQ2FuIGJlIFwiYWxsb3dcIiwgXCJhcHByb3ZhbFwiLCBvciBvdGhlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMudmlkZW9TZXR0aW5nIC0gVGhlIHNldHRpbmcgZm9yIHZpZGVvIHBlcm1pc3Npb24uIENhbiBiZSBcImFsbG93XCIsIFwiYXBwcm92YWxcIiwgb3Igb3RoZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnNjcmVlbnNoYXJlU2V0dGluZyAtIFRoZSBzZXR0aW5nIGZvciBzY3JlZW5zaGFyZSBwZXJtaXNzaW9uLiBDYW4gYmUgXCJhbGxvd1wiLCBcImFwcHJvdmFsXCIsIG9yIG90aGVyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5jaGF0U2V0dGluZyAtIFRoZSBzZXR0aW5nIGZvciBjaGF0IHBlcm1pc3Npb24uIENhbiBiZSBcImFsbG93XCIsIFwiYXBwcm92YWxcIiwgb3Igb3RoZXIuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPG51bWJlcj59IC0gUmV0dXJucyAwIGlmIHRoZSBzZXR0aW5nIGlzIFwiYWxsb3dcIiwgMSBpZiB0aGUgc2V0dGluZyBpcyBcImFwcHJvdmFsXCIsIGFuZCAyIGZvciBvdGhlciBzZXR0aW5ncyBvciBpbnZhbGlkIHBlcm1pc3Npb24gdHlwZXMuXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiBhbiB1bmV4cGVjdGVkIGVycm9yIG9jY3VycyBkdXJpbmcgdGhlIHBlcm1pc3Npb24gY2hlY2suXG4gICAqL1xuXG4gIGFzeW5jIGNoZWNrUGVybWlzc2lvbih7XG4gICAgcGVybWlzc2lvblR5cGUsXG4gICAgYXVkaW9TZXR0aW5nLFxuICAgIHZpZGVvU2V0dGluZyxcbiAgICBzY3JlZW5zaGFyZVNldHRpbmcsXG4gICAgY2hhdFNldHRpbmcsXG4gIH06IENoZWNrUGVybWlzc2lvbk9wdGlvbnMpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBQZXJmb3JtIGEgc3dpdGNoIGNhc2UgdG8gY2hlY2sgZm9yIHRoZSBwZXJtaXNzaW9uVHlwZSBhbmQgcmV0dXJuIHRoZSByZXNwb25zZVxuICAgICAgc3dpdGNoIChwZXJtaXNzaW9uVHlwZSkge1xuICAgICAgICBjYXNlICdhdWRpb1NldHRpbmcnOlxuICAgICAgICAgIGlmIChhdWRpb1NldHRpbmcgPT09ICdhbGxvdycpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYXVkaW9TZXR0aW5nID09PSAnYXBwcm92YWwnKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICd2aWRlb1NldHRpbmcnOlxuICAgICAgICAgIGlmICh2aWRlb1NldHRpbmcgPT09ICdhbGxvdycpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmlkZW9TZXR0aW5nID09PSAnYXBwcm92YWwnKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdzY3JlZW5zaGFyZVNldHRpbmcnOlxuICAgICAgICAgIGlmIChzY3JlZW5zaGFyZVNldHRpbmcgPT09ICdhbGxvdycpIHtcbiAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2NyZWVuc2hhcmVTZXR0aW5nID09PSAnYXBwcm92YWwnKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgfVxuICAgICAgICBjYXNlICdjaGF0U2V0dGluZyc6XG4gICAgICAgICAgaWYgKGNoYXRTZXR0aW5nID09PSAnYWxsb3cnKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICB9IGVsc2UgaWYgKGNoYXRTZXR0aW5nID09PSAnYXBwcm92YWwnKSB7XG4gICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIDI7XG4gICAgICAgICAgfVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIC8vIHRocm93IG5ldyBFcnJvcihgSW52YWxpZCBwZXJtaXNzaW9uVHlwZTogJHtwZXJtaXNzaW9uVHlwZX1gKTtcbiAgICAgICAgICByZXR1cm4gMjtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgLy8gY29uc29sZS5sb2coJ2NoZWNrUGVybWlzc2lvbiBlcnJvcicsIGVycm9yKTtcbiAgICAgIC8vIHRocm93IGVycm9yO1xuICAgICAgcmV0dXJuIDI7XG4gICAgfVxuICB9XG59XG4iXX0=