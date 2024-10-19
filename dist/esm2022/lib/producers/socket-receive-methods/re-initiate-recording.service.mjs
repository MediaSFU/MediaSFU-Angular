import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ReInitiateRecording {
    /**
     * Re-initiates recording based on specific conditions.
     * @async
     * @function
     * @param {ReInitiateRecordingOptions} options - The options for re-initiating recording.
     * @param {string} options.roomName - The name of the room to re-initiate recording.
     * @param {string} options.member - The member re-initiating the recording.
     * @param {Socket} options.socket - The socket instance for communication.
     * @param {boolean} options.adminRestrictSetting - Indicates whether the admin restrict setting is enabled.
     * @returns {Promise<void>} A promise that resolves when the recording is re-initiated.
     */
    reInitiateRecording = async ({ roomName, member, socket, adminRestrictSetting, }) => {
        if (!adminRestrictSetting) {
            await new Promise((resolve, reject) => {
                socket.emit('startRecordIng', { roomName, member }, ({ success }) => {
                    if (success) {
                        resolve();
                    }
                    else {
                        reject(new Error('Failed to re-initiate recording.'));
                    }
                });
            });
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReInitiateRecording, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReInitiateRecording, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ReInitiateRecording, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmUtaW5pdGlhdGUtcmVjb3JkaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcmUtaW5pdGlhdGUtcmVjb3JkaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFnQjNDLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7Ozs7Ozs7Ozs7T0FVRztJQUVILG1CQUFtQixHQUFHLEtBQUssRUFBRSxFQUMzQixRQUFRLEVBQ1IsTUFBTSxFQUNOLE1BQU0sRUFDTixvQkFBb0IsR0FDTyxFQUFpQixFQUFFO1FBQzlDLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzFCLE1BQU0sSUFBSSxPQUFPLENBQU8sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7Z0JBQzFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBd0IsRUFBRSxFQUFFO29CQUN4RixJQUFJLE9BQU8sRUFBRSxDQUFDO3dCQUNaLE9BQU8sRUFBRSxDQUFDO29CQUNaLENBQUM7eUJBQU0sQ0FBQzt3QkFDTixNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsa0NBQWtDLENBQUMsQ0FBQyxDQUFDO29CQUN4RCxDQUFDO2dCQUNILENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQTlCUyxtQkFBbUI7MkdBQW5CLG1CQUFtQixjQUZsQixNQUFNOzsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVJbml0aWF0ZVJlY29yZGluZ09wdGlvbnMge1xuICByb29tTmFtZTogc3RyaW5nO1xuICBtZW1iZXI6IHN0cmluZztcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIGFkbWluUmVzdHJpY3RTZXR0aW5nOiBib29sZWFuO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBSZUluaXRpYXRlUmVjb3JkaW5nVHlwZSA9IChvcHRpb25zOiBSZUluaXRpYXRlUmVjb3JkaW5nT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFJlSW5pdGlhdGVSZWNvcmRpbmcge1xuICAvKipcbiAgICogUmUtaW5pdGlhdGVzIHJlY29yZGluZyBiYXNlZCBvbiBzcGVjaWZpYyBjb25kaXRpb25zLlxuICAgKiBAYXN5bmNcbiAgICogQGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB7UmVJbml0aWF0ZVJlY29yZGluZ09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgcmUtaW5pdGlhdGluZyByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnJvb21OYW1lIC0gVGhlIG5hbWUgb2YgdGhlIHJvb20gdG8gcmUtaW5pdGlhdGUgcmVjb3JkaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5tZW1iZXIgLSBUaGUgbWVtYmVyIHJlLWluaXRpYXRpbmcgdGhlIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtTb2NrZXR9IG9wdGlvbnMuc29ja2V0IC0gVGhlIHNvY2tldCBpbnN0YW5jZSBmb3IgY29tbXVuaWNhdGlvbi5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLmFkbWluUmVzdHJpY3RTZXR0aW5nIC0gSW5kaWNhdGVzIHdoZXRoZXIgdGhlIGFkbWluIHJlc3RyaWN0IHNldHRpbmcgaXMgZW5hYmxlZC5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHJlY29yZGluZyBpcyByZS1pbml0aWF0ZWQuXG4gICAqL1xuXG4gIHJlSW5pdGlhdGVSZWNvcmRpbmcgPSBhc3luYyAoe1xuICAgIHJvb21OYW1lLFxuICAgIG1lbWJlcixcbiAgICBzb2NrZXQsXG4gICAgYWRtaW5SZXN0cmljdFNldHRpbmcsXG4gIH06IFJlSW5pdGlhdGVSZWNvcmRpbmdPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgaWYgKCFhZG1pblJlc3RyaWN0U2V0dGluZykge1xuICAgICAgYXdhaXQgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBzb2NrZXQuZW1pdCgnc3RhcnRSZWNvcmRJbmcnLCB7IHJvb21OYW1lLCBtZW1iZXIgfSwgKHsgc3VjY2VzcyB9OiB7IHN1Y2Nlc3M6IGJvb2xlYW4gfSkgPT4ge1xuICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgRXJyb3IoJ0ZhaWxlZCB0byByZS1pbml0aWF0ZSByZWNvcmRpbmcuJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG4iXX0=