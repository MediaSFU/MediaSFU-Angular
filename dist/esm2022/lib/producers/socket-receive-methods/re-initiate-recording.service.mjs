import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to re-initiate recording in a specific room, considering administrative restrictions.
 *
 * @class
 * @name ReInitiateRecording
 * @description Attempts to re-initiate recording if administrative restrictions permit.
 *
 * @method
 * reInitiateRecording
 *
 * @param {ReInitiateRecordingOptions} options - Configuration options for re-initiating recording:
 *   - `roomName` {string}: The name of the room to start recording in.
 *   - `member` {string}: The name of the member initiating the recording.
 *   - `socket` {Socket}: The socket instance for server communication.
 *   - `adminRestrictSetting` {boolean}: Flag indicating if the admin restrict setting is active, preventing re-initiation.
 *
 * @returns {Promise<void>} Resolves if recording is successfully re-initiated; otherwise, it throws an error if re-initiation fails.
 *
 * @example
 * const options = {
 *   roomName: 'Room101',
 *   member: 'Alice',
 *   socket: mySocketInstance,
 *   adminRestrictSetting: false
 * };
 * reInitiateRecordingService.reInitiateRecording(options)
 *   .then(() => console.log('Recording re-initiated'))
 *   .catch(error => console.error(error.message));
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmUtaW5pdGlhdGUtcmVjb3JkaW5nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcmUtaW5pdGlhdGUtcmVjb3JkaW5nLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFhM0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Qkc7QUFNSCxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCOzs7Ozs7Ozs7O09BVUc7SUFFSCxtQkFBbUIsR0FBRyxLQUFLLEVBQUUsRUFDM0IsUUFBUSxFQUNSLE1BQU0sRUFDTixNQUFNLEVBQ04sb0JBQW9CLEdBQ08sRUFBaUIsRUFBRTtRQUM5QyxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztZQUMxQixNQUFNLElBQUksT0FBTyxDQUFPLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO2dCQUMxQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsUUFBUSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQXdCLEVBQUUsRUFBRTtvQkFDeEYsSUFBSSxPQUFPLEVBQUUsQ0FBQzt3QkFDWixPQUFPLEVBQUUsQ0FBQztvQkFDWixDQUFDO3lCQUFNLENBQUM7d0JBQ04sTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLGtDQUFrQyxDQUFDLENBQUMsQ0FBQztvQkFDeEQsQ0FBQztnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0E5QlMsbUJBQW1COzJHQUFuQixtQkFBbUIsY0FGbEIsTUFBTTs7MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlSW5pdGlhdGVSZWNvcmRpbmdPcHRpb25zIHtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIHNvY2tldDogU29ja2V0O1xuICBhZG1pblJlc3RyaWN0U2V0dGluZzogYm9vbGVhbjtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUmVJbml0aWF0ZVJlY29yZGluZ1R5cGUgPSAob3B0aW9uczogUmVJbml0aWF0ZVJlY29yZGluZ09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogU2VydmljZSB0byByZS1pbml0aWF0ZSByZWNvcmRpbmcgaW4gYSBzcGVjaWZpYyByb29tLCBjb25zaWRlcmluZyBhZG1pbmlzdHJhdGl2ZSByZXN0cmljdGlvbnMuXG4gKlxuICogQGNsYXNzXG4gKiBAbmFtZSBSZUluaXRpYXRlUmVjb3JkaW5nXG4gKiBAZGVzY3JpcHRpb24gQXR0ZW1wdHMgdG8gcmUtaW5pdGlhdGUgcmVjb3JkaW5nIGlmIGFkbWluaXN0cmF0aXZlIHJlc3RyaWN0aW9ucyBwZXJtaXQuXG4gKlxuICogQG1ldGhvZFxuICogcmVJbml0aWF0ZVJlY29yZGluZ1xuICpcbiAqIEBwYXJhbSB7UmVJbml0aWF0ZVJlY29yZGluZ09wdGlvbnN9IG9wdGlvbnMgLSBDb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIHJlLWluaXRpYXRpbmcgcmVjb3JkaW5nOlxuICogICAtIGByb29tTmFtZWAge3N0cmluZ306IFRoZSBuYW1lIG9mIHRoZSByb29tIHRvIHN0YXJ0IHJlY29yZGluZyBpbi5cbiAqICAgLSBgbWVtYmVyYCB7c3RyaW5nfTogVGhlIG5hbWUgb2YgdGhlIG1lbWJlciBpbml0aWF0aW5nIHRoZSByZWNvcmRpbmcuXG4gKiAgIC0gYHNvY2tldGAge1NvY2tldH06IFRoZSBzb2NrZXQgaW5zdGFuY2UgZm9yIHNlcnZlciBjb21tdW5pY2F0aW9uLlxuICogICAtIGBhZG1pblJlc3RyaWN0U2V0dGluZ2Age2Jvb2xlYW59OiBGbGFnIGluZGljYXRpbmcgaWYgdGhlIGFkbWluIHJlc3RyaWN0IHNldHRpbmcgaXMgYWN0aXZlLCBwcmV2ZW50aW5nIHJlLWluaXRpYXRpb24uXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFJlc29sdmVzIGlmIHJlY29yZGluZyBpcyBzdWNjZXNzZnVsbHkgcmUtaW5pdGlhdGVkOyBvdGhlcndpc2UsIGl0IHRocm93cyBhbiBlcnJvciBpZiByZS1pbml0aWF0aW9uIGZhaWxzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBvcHRpb25zID0ge1xuICogICByb29tTmFtZTogJ1Jvb20xMDEnLFxuICogICBtZW1iZXI6ICdBbGljZScsXG4gKiAgIHNvY2tldDogbXlTb2NrZXRJbnN0YW5jZSxcbiAqICAgYWRtaW5SZXN0cmljdFNldHRpbmc6IGZhbHNlXG4gKiB9O1xuICogcmVJbml0aWF0ZVJlY29yZGluZ1NlcnZpY2UucmVJbml0aWF0ZVJlY29yZGluZyhvcHRpb25zKVxuICogICAudGhlbigoKSA9PiBjb25zb2xlLmxvZygnUmVjb3JkaW5nIHJlLWluaXRpYXRlZCcpKVxuICogICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcihlcnJvci5tZXNzYWdlKSk7XG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUmVJbml0aWF0ZVJlY29yZGluZyB7XG4gIC8qKlxuICAgKiBSZS1pbml0aWF0ZXMgcmVjb3JkaW5nIGJhc2VkIG9uIHNwZWNpZmljIGNvbmRpdGlvbnMuXG4gICAqIEBhc3luY1xuICAgKiBAZnVuY3Rpb25cbiAgICogQHBhcmFtIHtSZUluaXRpYXRlUmVjb3JkaW5nT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciByZS1pbml0aWF0aW5nIHJlY29yZGluZy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucm9vbU5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcm9vbSB0byByZS1pbml0aWF0ZSByZWNvcmRpbmcuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm1lbWJlciAtIFRoZSBtZW1iZXIgcmUtaW5pdGlhdGluZyB0aGUgcmVjb3JkaW5nLlxuICAgKiBAcGFyYW0ge1NvY2tldH0gb3B0aW9ucy5zb2NrZXQgLSBUaGUgc29ja2V0IGluc3RhbmNlIGZvciBjb21tdW5pY2F0aW9uLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMuYWRtaW5SZXN0cmljdFNldHRpbmcgLSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgYWRtaW4gcmVzdHJpY3Qgc2V0dGluZyBpcyBlbmFibGVkLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcmVjb3JkaW5nIGlzIHJlLWluaXRpYXRlZC5cbiAgICovXG5cbiAgcmVJbml0aWF0ZVJlY29yZGluZyA9IGFzeW5jICh7XG4gICAgcm9vbU5hbWUsXG4gICAgbWVtYmVyLFxuICAgIHNvY2tldCxcbiAgICBhZG1pblJlc3RyaWN0U2V0dGluZyxcbiAgfTogUmVJbml0aWF0ZVJlY29yZGluZ09wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBpZiAoIWFkbWluUmVzdHJpY3RTZXR0aW5nKSB7XG4gICAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIHNvY2tldC5lbWl0KCdzdGFydFJlY29yZEluZycsIHsgcm9vbU5hbWUsIG1lbWJlciB9LCAoeyBzdWNjZXNzIH06IHsgc3VjY2VzczogYm9vbGVhbiB9KSA9PiB7XG4gICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVqZWN0KG5ldyBFcnJvcignRmFpbGVkIHRvIHJlLWluaXRpYXRlIHJlY29yZGluZy4nKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==