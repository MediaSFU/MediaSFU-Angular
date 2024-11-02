import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to handle host responses to participant requests, including updating states and showing relevant alerts.
 *
 * @class
 * @name HostRequestResponse
 * @description
 * Manages host responses to requests (e.g., microphone, video, screenshare, chat) by updating the state of actions and triggering alerts based on acceptance or rejection.
 *
 * @method
 * hostRequestResponse
 * @async
 *
 * @param {HostRequestResponseOptions} options - Options for handling the host request response:
 *   - `requestResponse` {RequestResponse}: The request response object.
 *   - `showAlert` {Function}: Optional alert function for notifications.
 *   - `requestList` {Request[]}: The current list of requests.
 *   - `updateRequestList` {Function}: Updates the request list.
 *   - `updateMicAction`, `updateVideoAction`, `updateScreenAction`, `updateChatAction` {Function}: Update functions for respective actions.
 *   - `updateAudioRequestState`, `updateVideoRequestState`, `updateScreenRequestState`, `updateChatRequestState` {Function}: Updates request states.
 *   - `updateAudioRequestTime`, `updateVideoRequestTime`, `updateScreenRequestTime`, `updateChatRequestTime` {Function}: Update functions for request timers.
 *   - `updateRequestIntervalSeconds` {number}: Interval in seconds to update request time.
 *
 * @returns {Promise<void>} Resolves once the request response has been handled.
 *
 * @example
 * const options = {
 *   requestResponse: { id: '1', type: 'fa-microphone', action: 'accepted' },
 *   showAlert: alert => console.log(alert.message),
 *   requestList: [{ id: '1', type: 'fa-microphone' }],
 *   updateRequestList: list => console.log(list),
 *   updateMicAction: state => console.log(state),
 *   updateAudioRequestState: state => console.log(state),
 *   updateAudioRequestTime: time => console.log(time),
 *   updateRequestIntervalSeconds: 30,
 * };
 * hostRequestResponseService.hostRequestResponse(options);
 */
export class HostRequestResponse {
    hostRequestResponse = async ({ requestResponse, showAlert, requestList, updateRequestList, updateMicAction, updateVideoAction, updateScreenAction, updateChatAction, updateAudioRequestState, updateVideoRequestState, updateScreenRequestState, updateChatRequestState, updateAudioRequestTime, updateVideoRequestTime, updateScreenRequestTime, updateChatRequestTime, updateRequestIntervalSeconds, }) => {
        // Filter out the request from the list
        const filteredRequests = requestList.filter((request) => request.id !== requestResponse.id &&
            request.icon !== requestResponse.type &&
            request.name !== requestResponse.name &&
            request.username !== requestResponse.username);
        updateRequestList(filteredRequests);
        const requestType = requestResponse.type;
        // Handle accepted actions
        if (requestResponse.action === 'accepted') {
            switch (requestType) {
                case 'fa-microphone':
                    showAlert?.({
                        message: 'Unmute request was accepted; click the mic button again to begin.',
                        type: 'success',
                        duration: 10000,
                    });
                    updateMicAction(true);
                    updateAudioRequestState('accepted');
                    break;
                case 'fa-video':
                    showAlert?.({
                        message: 'Video request was accepted; click the video button again to begin.',
                        type: 'success',
                        duration: 10000,
                    });
                    updateVideoAction(true);
                    updateVideoRequestState('accepted');
                    break;
                case 'fa-desktop':
                    showAlert?.({
                        message: 'Screenshare request was accepted; click the screen button again to begin.',
                        type: 'success',
                        duration: 10000,
                    });
                    updateScreenAction(true);
                    updateScreenRequestState('accepted');
                    break;
                case 'fa-comments':
                    showAlert?.({
                        message: 'Chat request was accepted; click the chat button again to begin.',
                        type: 'success',
                        duration: 10000,
                    });
                    updateChatAction(true);
                    updateChatRequestState('accepted');
                    break;
            }
        }
        else {
            // Handle rejected actions
            let timerDate;
            switch (requestType) {
                case 'fa-microphone':
                    showAlert?.({
                        message: 'Unmute request was not accepted',
                        type: 'danger',
                        duration: 10000,
                    });
                    updateAudioRequestState('rejected');
                    timerDate = new Date();
                    timerDate.setSeconds(timerDate.getSeconds() + updateRequestIntervalSeconds);
                    updateAudioRequestTime(timerDate.getTime());
                    break;
                case 'fa-video':
                    showAlert?.({
                        message: 'Video request was not accepted',
                        type: 'danger',
                        duration: 10000,
                    });
                    updateVideoRequestState('rejected');
                    timerDate = new Date();
                    timerDate.setSeconds(timerDate.getSeconds() + updateRequestIntervalSeconds);
                    updateVideoRequestTime(timerDate.getTime());
                    break;
                case 'fa-desktop':
                    showAlert?.({
                        message: 'Screenshare request was not accepted',
                        type: 'danger',
                        duration: 10000,
                    });
                    updateScreenRequestState('rejected');
                    timerDate = new Date();
                    timerDate.setSeconds(timerDate.getSeconds() + updateRequestIntervalSeconds);
                    updateScreenRequestTime(timerDate.getTime());
                    break;
                case 'fa-comments':
                    showAlert?.({
                        message: 'Chat request was not accepted',
                        type: 'danger',
                        duration: 10000,
                    });
                    updateChatRequestState('rejected');
                    timerDate = new Date();
                    timerDate.setSeconds(timerDate.getSeconds() + updateRequestIntervalSeconds);
                    updateChatRequestTime(timerDate.getTime());
                    break;
            }
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HostRequestResponse, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HostRequestResponse, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: HostRequestResponse, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9zdC1yZXF1ZXN0LXJlc3BvbnNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvaG9zdC1yZXF1ZXN0LXJlc3BvbnNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUEyQjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQ0c7QUFNSCxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLG1CQUFtQixHQUFHLEtBQUssRUFBRSxFQUMzQixlQUFlLEVBQ2YsU0FBUyxFQUNULFdBQVcsRUFDWCxpQkFBaUIsRUFDakIsZUFBZSxFQUNmLGlCQUFpQixFQUNqQixrQkFBa0IsRUFDbEIsZ0JBQWdCLEVBQ2hCLHVCQUF1QixFQUN2Qix1QkFBdUIsRUFDdkIsd0JBQXdCLEVBQ3hCLHNCQUFzQixFQUN0QixzQkFBc0IsRUFDdEIsc0JBQXNCLEVBQ3RCLHVCQUF1QixFQUN2QixxQkFBcUIsRUFDckIsNEJBQTRCLEdBQ0QsRUFBaUIsRUFBRTtRQUM5Qyx1Q0FBdUM7UUFDdkMsTUFBTSxnQkFBZ0IsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUN6QyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQ1YsT0FBTyxDQUFDLEVBQUUsS0FBSyxlQUFlLENBQUMsRUFBRTtZQUNqQyxPQUFPLENBQUMsSUFBSSxLQUFLLGVBQWUsQ0FBQyxJQUFJO1lBQ3JDLE9BQU8sQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLElBQUk7WUFDckMsT0FBTyxDQUFDLFFBQVEsS0FBSyxlQUFlLENBQUMsUUFBUSxDQUNoRCxDQUFDO1FBQ0YsaUJBQWlCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUVwQyxNQUFNLFdBQVcsR0FBRyxlQUFl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QUFJLElBQUksRUFBRSxDQUFDO29CQUN2QixTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyw0QkFBNEIsQ0FBQyxDQUFDO29CQUM1RSx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDN0MsTUFBTTtnQkFDUixLQUFLLGFBQWE7b0JBQ2hCLFNBQVMsRUFBRSxDQUFDO3dCQUNWLE9BQU8sRUFBRSwrQkFBK0I7d0JBQ3hDLElBQUksRUFBRSxRQUFRO3dCQUNkLFFBQVEsRUFBRSxLQUFLO3FCQUNoQixDQUFDLENBQUM7b0JBQ0gsc0JBQXNCLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ25DLFNBQVMsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO29CQUN2QixTQUFTLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsR0FBRyw0QkFBNEIsQ0FBQyxDQUFDO29CQUM1RSxxQkFBcUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztvQkFDM0MsTUFBTTtZQUNWLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQTFIUyxtQkFBbUI7MkdBQW5CLG1CQUFtQixjQUZsQixNQUFNOzsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hvd0FsZXJ0LCBSZXF1ZXN0LCBSZXF1ZXN0UmVzcG9uc2UgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEhvc3RSZXF1ZXN0UmVzcG9uc2VPcHRpb25zIHtcbiAgcmVxdWVzdFJlc3BvbnNlOiBSZXF1ZXN0UmVzcG9uc2U7XG5cbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICByZXF1ZXN0TGlzdDogUmVxdWVzdFtdO1xuICB1cGRhdGVSZXF1ZXN0TGlzdDogKHJlcXVlc3RMaXN0OiBSZXF1ZXN0W10pID0+IHZvaWQ7XG4gIHVwZGF0ZU1pY0FjdGlvbjogKGFjdGlvbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlVmlkZW9BY3Rpb246IChhY3Rpb246IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVNjcmVlbkFjdGlvbjogKGFjdGlvbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQ2hhdEFjdGlvbjogKGFjdGlvbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQXVkaW9SZXF1ZXN0U3RhdGU6IChzdGF0ZTogc3RyaW5nIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGU6IChzdGF0ZTogc3RyaW5nIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlU2NyZWVuUmVxdWVzdFN0YXRlOiAoc3RhdGU6IHN0cmluZyB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZUNoYXRSZXF1ZXN0U3RhdGU6IChzdGF0ZTogc3RyaW5nIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlQXVkaW9SZXF1ZXN0VGltZTogKHRpbWU6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlVmlkZW9SZXF1ZXN0VGltZTogKHRpbWU6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlU2NyZWVuUmVxdWVzdFRpbWU6ICh0aW1lOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZUNoYXRSZXF1ZXN0VGltZTogKHRpbWU6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kczogbnVtYmVyO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBIb3N0UmVxdWVzdFJlc3BvbnNlVHlwZSA9IChvcHRpb25zOiBIb3N0UmVxdWVzdFJlc3BvbnNlT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBTZXJ2aWNlIHRvIGhhbmRsZSBob3N0IHJlc3BvbnNlcyB0byBwYXJ0aWNpcGFudCByZXF1ZXN0cywgaW5jbHVkaW5nIHVwZGF0aW5nIHN0YXRlcyBhbmQgc2hvd2luZyByZWxldmFudCBhbGVydHMuXG4gKlxuICogQGNsYXNzXG4gKiBAbmFtZSBIb3N0UmVxdWVzdFJlc3BvbnNlXG4gKiBAZGVzY3JpcHRpb25cbiAqIE1hbmFnZXMgaG9zdCByZXNwb25zZXMgdG8gcmVxdWVzdHMgKGUuZy4sIG1pY3JvcGhvbmUsIHZpZGVvLCBzY3JlZW5zaGFyZSwgY2hhdCkgYnkgdXBkYXRpbmcgdGhlIHN0YXRlIG9mIGFjdGlvbnMgYW5kIHRyaWdnZXJpbmcgYWxlcnRzIGJhc2VkIG9uIGFjY2VwdGFuY2Ugb3IgcmVqZWN0aW9uLlxuICpcbiAqIEBtZXRob2RcbiAqIGhvc3RSZXF1ZXN0UmVzcG9uc2VcbiAqIEBhc3luY1xuICpcbiAqIEBwYXJhbSB7SG9zdFJlcXVlc3RSZXNwb25zZU9wdGlvbnN9IG9wdGlvbnMgLSBPcHRpb25zIGZvciBoYW5kbGluZyB0aGUgaG9zdCByZXF1ZXN0IHJlc3BvbnNlOlxuICogICAtIGByZXF1ZXN0UmVzcG9uc2VgIHtSZXF1ZXN0UmVzcG9uc2V9OiBUaGUgcmVxdWVzdCByZXNwb25zZSBvYmplY3QuXG4gKiAgIC0gYHNob3dBbGVydGAge0Z1bmN0aW9ufTogT3B0aW9uYWwgYWxlcnQgZnVuY3Rpb24gZm9yIG5vdGlmaWNhdGlvbnMuXG4gKiAgIC0gYHJlcXVlc3RMaXN0YCB7UmVxdWVzdFtdfTogVGhlIGN1cnJlbnQgbGlzdCBvZiByZXF1ZXN0cy5cbiAqICAgLSBgdXBkYXRlUmVxdWVzdExpc3RgIHtGdW5jdGlvbn06IFVwZGF0ZXMgdGhlIHJlcXVlc3QgbGlzdC5cbiAqICAgLSBgdXBkYXRlTWljQWN0aW9uYCwgYHVwZGF0ZVZpZGVvQWN0aW9uYCwgYHVwZGF0ZVNjcmVlbkFjdGlvbmAsIGB1cGRhdGVDaGF0QWN0aW9uYCB7RnVuY3Rpb259OiBVcGRhdGUgZnVuY3Rpb25zIGZvciByZXNwZWN0aXZlIGFjdGlvbnMuXG4gKiAgIC0gYHVwZGF0ZUF1ZGlvUmVxdWVzdFN0YXRlYCwgYHVwZGF0ZVZpZGVvUmVxdWVzdFN0YXRlYCwgYHVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZWAsIGB1cGRhdGVDaGF0UmVxdWVzdFN0YXRlYCB7RnVuY3Rpb259OiBVcGRhdGVzIHJlcXVlc3Qgc3RhdGVzLlxuICogICAtIGB1cGRhdGVBdWRpb1JlcXVlc3RUaW1lYCwgYHVwZGF0ZVZpZGVvUmVxdWVzdFRpbWVgLCBgdXBkYXRlU2NyZWVuUmVxdWVzdFRpbWVgLCBgdXBkYXRlQ2hhdFJlcXVlc3RUaW1lYCB7RnVuY3Rpb259OiBVcGRhdGUgZnVuY3Rpb25zIGZvciByZXF1ZXN0IHRpbWVycy5cbiAqICAgLSBgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kc2Age251bWJlcn06IEludGVydmFsIGluIHNlY29uZHMgdG8gdXBkYXRlIHJlcXVlc3QgdGltZS5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gUmVzb2x2ZXMgb25jZSB0aGUgcmVxdWVzdCByZXNwb25zZSBoYXMgYmVlbiBoYW5kbGVkLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBvcHRpb25zID0ge1xuICogICByZXF1ZXN0UmVzcG9uc2U6IHsgaWQ6ICcxJywgdHlwZTogJ2ZhLW1pY3JvcGhvbmUnLCBhY3Rpb246ICdhY2NlcHRlZCcgfSxcbiAqICAgc2hvd0FsZXJ0OiBhbGVydCA9PiBjb25zb2xlLmxvZyhhbGVydC5tZXNzYWdlKSxcbiAqICAgcmVxdWVzdExpc3Q6IFt7IGlkOiAnMScsIHR5cGU6ICdmYS1taWNyb3Bob25lJyB9XSxcbiAqICAgdXBkYXRlUmVxdWVzdExpc3Q6IGxpc3QgPT4gY29uc29sZS5sb2cobGlzdCksXG4gKiAgIHVwZGF0ZU1pY0FjdGlvbjogc3RhdGUgPT4gY29uc29sZS5sb2coc3RhdGUpLFxuICogICB1cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZTogc3RhdGUgPT4gY29uc29sZS5sb2coc3RhdGUpLFxuICogICB1cGRhdGVBdWRpb1JlcXVlc3RUaW1lOiB0aW1lID0+IGNvbnNvbGUubG9nKHRpbWUpLFxuICogICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzOiAzMCxcbiAqIH07XG4gKiBob3N0UmVxdWVzdFJlc3BvbnNlU2VydmljZS5ob3N0UmVxdWVzdFJlc3BvbnNlKG9wdGlvbnMpO1xuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEhvc3RSZXF1ZXN0UmVzcG9uc2Uge1xuICBob3N0UmVxdWVzdFJlc3BvbnNlID0gYXN5bmMgKHtcbiAgICByZXF1ZXN0UmVzcG9uc2UsXG4gICAgc2hvd0FsZXJ0LFxuICAgIHJlcXVlc3RMaXN0LFxuICAgIHVwZGF0ZVJlcXVlc3RMaXN0LFxuICAgIHVwZGF0ZU1pY0FjdGlvbixcbiAgICB1cGRhdGVWaWRlb0FjdGlvbixcbiAgICB1cGRhdGVTY3JlZW5BY3Rpb24sXG4gICAgdXBkYXRlQ2hhdEFjdGlvbixcbiAgICB1cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZSxcbiAgICB1cGRhdGVWaWRlb1JlcXVlc3RTdGF0ZSxcbiAgICB1cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGUsXG4gICAgdXBkYXRlQ2hhdFJlcXVlc3RTdGF0ZSxcbiAgICB1cGRhdGVBdWRpb1JlcXVlc3RUaW1lLFxuICAgIHVwZGF0ZVZpZGVvUmVxdWVzdFRpbWUsXG4gICAgdXBkYXRlU2NyZWVuUmVxdWVzdFRpbWUsXG4gICAgdXBkYXRlQ2hhdFJlcXVlc3RUaW1lLFxuICAgIHVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHMsXG4gIH06IEhvc3RSZXF1ZXN0UmVzcG9uc2VPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgLy8gRmlsdGVyIG91dCB0aGUgcmVxdWVzdCBmcm9tIHRoZSBsaXN0XG4gICAgY29uc3QgZmlsdGVyZWRSZXF1ZXN0cyA9IHJlcXVlc3RMaXN0LmZpbHRlcihcbiAgICAgIChyZXF1ZXN0KSA9PlxuICAgICAgICByZXF1ZXN0LmlkICE9PSByZXF1ZXN0UmVzcG9uc2UuaWQgJiZcbiAgICAgICAgcmVxdWVzdC5pY29uICE9PSByZXF1ZXN0UmVzcG9uc2UudHlwZSAmJlxuICAgICAgICByZXF1ZXN0Lm5hbWUgIT09IHJlcXVlc3RSZXNwb25zZS5uYW1lICYmXG4gICAgICAgIHJlcXVlc3QudXNlcm5hbWUgIT09IHJlcXVlc3RSZXNwb25zZS51c2VybmFtZSxcbiAgICApO1xuICAgIHVwZGF0ZVJlcXVlc3RMaXN0KGZpbHRlcmVkUmVxdWVzdHMpO1xuXG4gICAgY29uc3QgcmVxdWVzdFR5cGUgPSByZXF1ZXN0UmVzcG9uc2UudHlwZTtcblxuICAgIC8vIEhhbmRsZSBhY2NlcHRlZCBhY3Rpb25zXG4gICAgaWYgKHJlcXVlc3RSZXNwb25zZS5hY3Rpb24gPT09ICdhY2NlcHRlZCcpIHtcbiAgICAgIHN3aXRjaCAocmVxdWVzdFR5cGUpIHtcbiAgICAgICAgY2FzZSAnZmEtbWljcm9waG9uZSc6XG4gICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgbWVzc2FnZTogJ1VubXV0ZSByZXF1ZXN0IHdhcyBhY2NlcHRlZDsgY2xpY2sgdGhlIG1pYyBidXR0b24gYWdhaW4gdG8gYmVnaW4uJyxcbiAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB1cGRhdGVNaWNBY3Rpb24odHJ1ZSk7XG4gICAgICAgICAgdXBkYXRlQXVkaW9SZXF1ZXN0U3RhdGUoJ2FjY2VwdGVkJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZhLXZpZGVvJzpcbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiAnVmlkZW8gcmVxdWVzdCB3YXMgYWNjZXB0ZWQ7IGNsaWNrIHRoZSB2aWRlbyBidXR0b24gYWdhaW4gdG8gYmVnaW4uJyxcbiAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB1cGRhdGVWaWRlb0FjdGlvbih0cnVlKTtcbiAgICAgICAgICB1cGRhdGVWaWRlb1JlcXVlc3RTdGF0ZSgnYWNjZXB0ZWQnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmEtZGVza3RvcCc6XG4gICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgbWVzc2FnZTogJ1NjcmVlbnNoYXJlIHJlcXVlc3Qgd2FzIGFjY2VwdGVkOyBjbGljayB0aGUgc2NyZWVuIGJ1dHRvbiBhZ2FpbiB0byBiZWdpbi4nLFxuICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHVwZGF0ZVNjcmVlbkFjdGlvbih0cnVlKTtcbiAgICAgICAgICB1cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGUoJ2FjY2VwdGVkJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZhLWNvbW1lbnRzJzpcbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiAnQ2hhdCByZXF1ZXN0IHdhcyBhY2NlcHRlZDsgY2xpY2sgdGhlIGNoYXQgYnV0dG9uIGFnYWluIHRvIGJlZ2luLicsXG4gICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdXBkYXRlQ2hhdEFjdGlvbih0cnVlKTtcbiAgICAgICAgICB1cGRhdGVDaGF0UmVxdWVzdFN0YXRlKCdhY2NlcHRlZCcpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBIYW5kbGUgcmVqZWN0ZWQgYWN0aW9uc1xuICAgICAgbGV0IHRpbWVyRGF0ZTogRGF0ZTtcbiAgICAgIHN3aXRjaCAocmVxdWVzdFR5cGUpIHtcbiAgICAgICAgY2FzZSAnZmEtbWljcm9waG9uZSc6XG4gICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgbWVzc2FnZTogJ1VubXV0ZSByZXF1ZXN0IHdhcyBub3QgYWNjZXB0ZWQnLFxuICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdXBkYXRlQXVkaW9SZXF1ZXN0U3RhdGUoJ3JlamVjdGVkJyk7XG4gICAgICAgICAgdGltZXJEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICB0aW1lckRhdGUuc2V0U2Vjb25kcyh0aW1lckRhdGUuZ2V0U2Vjb25kcygpICsgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kcyk7XG4gICAgICAgICAgdXBkYXRlQXVkaW9SZXF1ZXN0VGltZSh0aW1lckRhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmEtdmlkZW8nOlxuICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdWaWRlbyByZXF1ZXN0IHdhcyBub3QgYWNjZXB0ZWQnLFxuICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdXBkYXRlVmlkZW9SZXF1ZXN0U3RhdGUoJ3JlamVjdGVkJyk7XG4gICAgICAgICAgdGltZXJEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICB0aW1lckRhdGUuc2V0U2Vjb25kcyh0aW1lckRhdGUuZ2V0U2Vjb25kcygpICsgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kcyk7XG4gICAgICAgICAgdXBkYXRlVmlkZW9SZXF1ZXN0VGltZSh0aW1lckRhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmEtZGVza3RvcCc6XG4gICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgbWVzc2FnZTogJ1NjcmVlbnNoYXJlIHJlcXVlc3Qgd2FzIG5vdCBhY2NlcHRlZCcsXG4gICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB1cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGUoJ3JlamVjdGVkJyk7XG4gICAgICAgICAgdGltZXJEYXRlID0gbmV3IERhdGUoKTtcbiAgICAgICAgICB0aW1lckRhdGUuc2V0U2Vjb25kcyh0aW1lckRhdGUuZ2V0U2Vjb25kcygpICsgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kcyk7XG4gICAgICAgICAgdXBkYXRlU2NyZWVuUmVxdWVzdFRpbWUodGltZXJEYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2ZhLWNvbW1lbnRzJzpcbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiAnQ2hhdCByZXF1ZXN0IHdhcyBub3QgYWNjZXB0ZWQnLFxuICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdXBkYXRlQ2hhdFJlcXVlc3RTdGF0ZSgncmVqZWN0ZWQnKTtcbiAgICAgICAgICB0aW1lckRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgIHRpbWVyRGF0ZS5zZXRTZWNvbmRzKHRpbWVyRGF0ZS5nZXRTZWNvbmRzKCkgKyB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzKTtcbiAgICAgICAgICB1cGRhdGVDaGF0UmVxdWVzdFRpbWUodGltZXJEYXRlLmdldFRpbWUoKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfVxuICB9O1xufVxuIl19