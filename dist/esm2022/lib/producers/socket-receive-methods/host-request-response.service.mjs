import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to handle host request responses.
 *
 * @example
 * ```typescript
 * const hostRequestResponseService = new HostRequestResponse();
 * await hostRequestResponseService.hostRequestResponse({
 *   requestResponse: { id: '1', type: 'fa-microphone', name: 'John Doe', username: 'johndoe', action: 'accepted' },
 *   showAlert: (alert) => console.log(alert),
 *   requestList: [],
 *   updateRequestList: (list) => console.log(list),
 *   updateMicAction: (state) => console.log(state),
 *   updateVideoAction: (state) => console.log(state),
 *   updateScreenAction: (state) => console.log(state),
 *   updateChatAction: (state) => console.log(state),
 *   updateAudioRequestState: (state) => console.log(state),
 *   updateVideoRequestState: (state) => console.log(state),
 *   updateScreenRequestState: (state) => console.log(state),
 *   updateChatRequestState: (state) => console.log(state),
 *   updateAudioRequestTime: (time) => console.log(time),
 *   updateVideoRequestTime: (time) => console.log(time),
 *   updateScreenRequestTime: (time) => console.log(time),
 *   updateChatRequestTime: (time) => console.log(time),
 *   updateRequestIntervalSeconds: 30,
 * });
 * ```
 *
 * @typedef {Object} HostRequestResponseOptions
 * @property {Object} requestResponse - The request response object.
 * @property {Function} showAlert - Function to show alert messages.
 * @property {Array} requestList - List of current requests.
 * @property {Function} updateRequestList - Function to update the request list.
 * @property {Function} updateMicAction - Function to update microphone action state.
 * @property {Function} updateVideoAction - Function to update video action state.
 * @property {Function} updateScreenAction - Function to update screen action state.
 * @property {Function} updateChatAction - Function to update chat action state.
 * @property {Function} updateAudioRequestState - Function to update audio request state.
 * @property {Function} updateVideoRequestState - Function to update video request state.
 * @property {Function} updateScreenRequestState - Function to update screen request state.
 * @property {Function} updateChatRequestState - Function to update chat request state.
 * @property {Function} updateAudioRequestTime - Function to update audio request time.
 * @property {Function} updateVideoRequestTime - Function to update video request time.
 * @property {Function} updateScreenRequestTime - Function to update screen request time.
 * @property {Function} updateChatRequestTime - Function to update chat request time.
 * @property {number} updateRequestIntervalSeconds - Interval in seconds to update request time.
 *
 * @class
 * @classdesc This service handles the responses to host requests, updating the state and showing alerts based on the response.
 *
 * @method hostRequestResponse
 * @async
 * @param {HostRequestResponseOptions} options - The options for handling the host request response.
 * @returns {Promise<void>} A promise that resolves when the request response has been handled.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9zdC1yZXF1ZXN0LXJlc3BvbnNlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvaG9zdC1yZXF1ZXN0LXJlc3BvbnNlLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUEyQjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFERztBQUlILE1BQU0sT0FBTyxtQkFBbUI7SUFDOUIsbUJBQW1CLEdBQUcsS0FBSyxFQUFFLEVBQzNCLGVBQWUsRUFDZixTQUFTLEVBQ1QsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixlQUFlLEVBQ2YsaUJBQWlCLEVBQ2pCLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsdUJBQXVCLEVBQ3ZCLHVCQUF1QixFQUN2Qix3QkFBd0IsRUFDeEIsc0JBQXNCLEVBQ3RCLHNCQUFzQixFQUN0QixzQkFBc0IsRUFDdEIsdUJBQXVCLEVBQ3ZCLHFCQUFxQixFQUNyQiw0QkFBNEIsR0FDRCxFQUFpQixFQUFFO1FBQzlDLHVDQUF1QztRQUN2QyxNQUFNLGdCQUFnQixHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQ3pDLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FDVixPQUFPLENBQUMsRUFBRSxLQUFLLGVBQWUsQ0FBQyxFQUFFO1lBQ2pDLE9BQU8sQ0FBQyxJQUFJLEtBQUssZUFBZSxDQUFDLElBQUk7WUFDckMsT0FBTyxDQUFDLElBQUksS0FBSyxlQUFlLENBQUMsSUFBSTtZQUNyQyxPQUFPLENBQUMsUUFBUSxLQUFLLGVBQWUsQ0FBQyxRQUFRLENBQ2hELENBQUM7UUFDRixpQkFBaUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBRXBDLE1B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QkFDckMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ3ZCLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxHQUFHLDRCQUE0QixDQUFDLENBQUM7b0JBQzVFLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUM3QyxNQUFNO2dCQUNSLEtBQUssYUFBYTtvQkFDaEIsU0FBUyxFQUFFLENBQUM7d0JBQ1YsT0FBTyxFQUFFLCtCQUErQjt3QkFDeEMsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsUUFBUSxFQUFFLEtBQUs7cUJBQ2hCLENBQUMsQ0FBQztvQkFDSCxzQkFBc0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztvQkFDbkMsU0FBUyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0JBQ3ZCLFNBQVMsQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxHQUFHLDRCQUE0QixDQUFDLENBQUM7b0JBQzVFLHFCQUFxQixDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUMzQyxNQUFNO1lBQ1YsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDLENBQUM7dUdBMUhTLG1CQUFtQjsyR0FBbkIsbUJBQW1CLGNBRmxCLE1BQU07OzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaG93QWxlcnQsIFJlcXVlc3QsIFJlcXVlc3RSZXNwb25zZSB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgSG9zdFJlcXVlc3RSZXNwb25zZU9wdGlvbnMge1xuICByZXF1ZXN0UmVzcG9uc2U6IFJlcXVlc3RSZXNwb25zZTtcblxuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIHJlcXVlc3RMaXN0OiBSZXF1ZXN0W107XG4gIHVwZGF0ZVJlcXVlc3RMaXN0OiAocmVxdWVzdExpc3Q6IFJlcXVlc3RbXSkgPT4gdm9pZDtcbiAgdXBkYXRlTWljQWN0aW9uOiAoYWN0aW9uOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVWaWRlb0FjdGlvbjogKGFjdGlvbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlU2NyZWVuQWN0aW9uOiAoYWN0aW9uOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVDaGF0QWN0aW9uOiAoYWN0aW9uOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZTogKHN0YXRlOiBzdHJpbmcgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVWaWRlb1JlcXVlc3RTdGF0ZTogKHN0YXRlOiBzdHJpbmcgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVTY3JlZW5SZXF1ZXN0U3RhdGU6IChzdGF0ZTogc3RyaW5nIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlQ2hhdFJlcXVlc3RTdGF0ZTogKHN0YXRlOiBzdHJpbmcgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVBdWRpb1JlcXVlc3RUaW1lOiAodGltZTogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVWaWRlb1JlcXVlc3RUaW1lOiAodGltZTogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVTY3JlZW5SZXF1ZXN0VGltZTogKHRpbWU6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlQ2hhdFJlcXVlc3RUaW1lOiAodGltZTogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzOiBudW1iZXI7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEhvc3RSZXF1ZXN0UmVzcG9uc2VUeXBlID0gKG9wdGlvbnM6IEhvc3RSZXF1ZXN0UmVzcG9uc2VPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gaGFuZGxlIGhvc3QgcmVxdWVzdCByZXNwb25zZXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IGhvc3RSZXF1ZXN0UmVzcG9uc2VTZXJ2aWNlID0gbmV3IEhvc3RSZXF1ZXN0UmVzcG9uc2UoKTtcbiAqIGF3YWl0IGhvc3RSZXF1ZXN0UmVzcG9uc2VTZXJ2aWNlLmhvc3RSZXF1ZXN0UmVzcG9uc2Uoe1xuICogICByZXF1ZXN0UmVzcG9uc2U6IHsgaWQ6ICcxJywgdHlwZTogJ2ZhLW1pY3JvcGhvbmUnLCBuYW1lOiAnSm9obiBEb2UnLCB1c2VybmFtZTogJ2pvaG5kb2UnLCBhY3Rpb246ICdhY2NlcHRlZCcgfSxcbiAqICAgc2hvd0FsZXJ0OiAoYWxlcnQpID0+IGNvbnNvbGUubG9nKGFsZXJ0KSxcbiAqICAgcmVxdWVzdExpc3Q6IFtdLFxuICogICB1cGRhdGVSZXF1ZXN0TGlzdDogKGxpc3QpID0+IGNvbnNvbGUubG9nKGxpc3QpLFxuICogICB1cGRhdGVNaWNBY3Rpb246IChzdGF0ZSkgPT4gY29uc29sZS5sb2coc3RhdGUpLFxuICogICB1cGRhdGVWaWRlb0FjdGlvbjogKHN0YXRlKSA9PiBjb25zb2xlLmxvZyhzdGF0ZSksXG4gKiAgIHVwZGF0ZVNjcmVlbkFjdGlvbjogKHN0YXRlKSA9PiBjb25zb2xlLmxvZyhzdGF0ZSksXG4gKiAgIHVwZGF0ZUNoYXRBY3Rpb246IChzdGF0ZSkgPT4gY29uc29sZS5sb2coc3RhdGUpLFxuICogICB1cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZTogKHN0YXRlKSA9PiBjb25zb2xlLmxvZyhzdGF0ZSksXG4gKiAgIHVwZGF0ZVZpZGVvUmVxdWVzdFN0YXRlOiAoc3RhdGUpID0+IGNvbnNvbGUubG9nKHN0YXRlKSxcbiAqICAgdXBkYXRlU2NyZWVuUmVxdWVzdFN0YXRlOiAoc3RhdGUpID0+IGNvbnNvbGUubG9nKHN0YXRlKSxcbiAqICAgdXBkYXRlQ2hhdFJlcXVlc3RTdGF0ZTogKHN0YXRlKSA9PiBjb25zb2xlLmxvZyhzdGF0ZSksXG4gKiAgIHVwZGF0ZUF1ZGlvUmVxdWVzdFRpbWU6ICh0aW1lKSA9PiBjb25zb2xlLmxvZyh0aW1lKSxcbiAqICAgdXBkYXRlVmlkZW9SZXF1ZXN0VGltZTogKHRpbWUpID0+IGNvbnNvbGUubG9nKHRpbWUpLFxuICogICB1cGRhdGVTY3JlZW5SZXF1ZXN0VGltZTogKHRpbWUpID0+IGNvbnNvbGUubG9nKHRpbWUpLFxuICogICB1cGRhdGVDaGF0UmVxdWVzdFRpbWU6ICh0aW1lKSA9PiBjb25zb2xlLmxvZyh0aW1lKSxcbiAqICAgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kczogMzAsXG4gKiB9KTtcbiAqIGBgYFxuICpcbiAqIEB0eXBlZGVmIHtPYmplY3R9IEhvc3RSZXF1ZXN0UmVzcG9uc2VPcHRpb25zXG4gKiBAcHJvcGVydHkge09iamVjdH0gcmVxdWVzdFJlc3BvbnNlIC0gVGhlIHJlcXVlc3QgcmVzcG9uc2Ugb2JqZWN0LlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gc2hvd0FsZXJ0IC0gRnVuY3Rpb24gdG8gc2hvdyBhbGVydCBtZXNzYWdlcy5cbiAqIEBwcm9wZXJ0eSB7QXJyYXl9IHJlcXVlc3RMaXN0IC0gTGlzdCBvZiBjdXJyZW50IHJlcXVlc3RzLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlUmVxdWVzdExpc3QgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJlcXVlc3QgbGlzdC5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZU1pY0FjdGlvbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBtaWNyb3Bob25lIGFjdGlvbiBzdGF0ZS5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZVZpZGVvQWN0aW9uIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHZpZGVvIGFjdGlvbiBzdGF0ZS5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZVNjcmVlbkFjdGlvbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBzY3JlZW4gYWN0aW9uIHN0YXRlLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlQ2hhdEFjdGlvbiAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBjaGF0IGFjdGlvbiBzdGF0ZS5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZUF1ZGlvUmVxdWVzdFN0YXRlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGF1ZGlvIHJlcXVlc3Qgc3RhdGUuXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVWaWRlb1JlcXVlc3RTdGF0ZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB2aWRlbyByZXF1ZXN0IHN0YXRlLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlU2NyZWVuUmVxdWVzdFN0YXRlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHNjcmVlbiByZXF1ZXN0IHN0YXRlLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlQ2hhdFJlcXVlc3RTdGF0ZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBjaGF0IHJlcXVlc3Qgc3RhdGUuXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSB1cGRhdGVBdWRpb1JlcXVlc3RUaW1lIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGF1ZGlvIHJlcXVlc3QgdGltZS5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZVZpZGVvUmVxdWVzdFRpbWUgLSBGdW5jdGlvbiB0byB1cGRhdGUgdmlkZW8gcmVxdWVzdCB0aW1lLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlU2NyZWVuUmVxdWVzdFRpbWUgLSBGdW5jdGlvbiB0byB1cGRhdGUgc2NyZWVuIHJlcXVlc3QgdGltZS5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZUNoYXRSZXF1ZXN0VGltZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSBjaGF0IHJlcXVlc3QgdGltZS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzIC0gSW50ZXJ2YWwgaW4gc2Vjb25kcyB0byB1cGRhdGUgcmVxdWVzdCB0aW1lLlxuICpcbiAqIEBjbGFzc1xuICogQGNsYXNzZGVzYyBUaGlzIHNlcnZpY2UgaGFuZGxlcyB0aGUgcmVzcG9uc2VzIHRvIGhvc3QgcmVxdWVzdHMsIHVwZGF0aW5nIHRoZSBzdGF0ZSBhbmQgc2hvd2luZyBhbGVydHMgYmFzZWQgb24gdGhlIHJlc3BvbnNlLlxuICpcbiAqIEBtZXRob2QgaG9zdFJlcXVlc3RSZXNwb25zZVxuICogQGFzeW5jXG4gKiBAcGFyYW0ge0hvc3RSZXF1ZXN0UmVzcG9uc2VPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGhhbmRsaW5nIHRoZSBob3N0IHJlcXVlc3QgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgcmVxdWVzdCByZXNwb25zZSBoYXMgYmVlbiBoYW5kbGVkLlxuICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgSG9zdFJlcXVlc3RSZXNwb25zZSB7XG4gIGhvc3RSZXF1ZXN0UmVzcG9uc2UgPSBhc3luYyAoe1xuICAgIHJlcXVlc3RSZXNwb25zZSxcbiAgICBzaG93QWxlcnQsXG4gICAgcmVxdWVzdExpc3QsXG4gICAgdXBkYXRlUmVxdWVzdExpc3QsXG4gICAgdXBkYXRlTWljQWN0aW9uLFxuICAgIHVwZGF0ZVZpZGVvQWN0aW9uLFxuICAgIHVwZGF0ZVNjcmVlbkFjdGlvbixcbiAgICB1cGRhdGVDaGF0QWN0aW9uLFxuICAgIHVwZGF0ZUF1ZGlvUmVxdWVzdFN0YXRlLFxuICAgIHVwZGF0ZVZpZGVvUmVxdWVzdFN0YXRlLFxuICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZSxcbiAgICB1cGRhdGVDaGF0UmVxdWVzdFN0YXRlLFxuICAgIHVwZGF0ZUF1ZGlvUmVxdWVzdFRpbWUsXG4gICAgdXBkYXRlVmlkZW9SZXF1ZXN0VGltZSxcbiAgICB1cGRhdGVTY3JlZW5SZXF1ZXN0VGltZSxcbiAgICB1cGRhdGVDaGF0UmVxdWVzdFRpbWUsXG4gICAgdXBkYXRlUmVxdWVzdEludGVydmFsU2Vjb25kcyxcbiAgfTogSG9zdFJlcXVlc3RSZXNwb25zZU9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAvLyBGaWx0ZXIgb3V0IHRoZSByZXF1ZXN0IGZyb20gdGhlIGxpc3RcbiAgICBjb25zdCBmaWx0ZXJlZFJlcXVlc3RzID0gcmVxdWVzdExpc3QuZmlsdGVyKFxuICAgICAgKHJlcXVlc3QpID0+XG4gICAgICAgIHJlcXVlc3QuaWQgIT09IHJlcXVlc3RSZXNwb25zZS5pZCAmJlxuICAgICAgICByZXF1ZXN0Lmljb24gIT09IHJlcXVlc3RSZXNwb25zZS50eXBlICYmXG4gICAgICAgIHJlcXVlc3QubmFtZSAhPT0gcmVxdWVzdFJlc3BvbnNlLm5hbWUgJiZcbiAgICAgICAgcmVxdWVzdC51c2VybmFtZSAhPT0gcmVxdWVzdFJlc3BvbnNlLnVzZXJuYW1lLFxuICAgICk7XG4gICAgdXBkYXRlUmVxdWVzdExpc3QoZmlsdGVyZWRSZXF1ZXN0cyk7XG5cbiAgICBjb25zdCByZXF1ZXN0VHlwZSA9IHJlcXVlc3RSZXNwb25zZS50eXBlO1xuXG4gICAgLy8gSGFuZGxlIGFjY2VwdGVkIGFjdGlvbnNcbiAgICBpZiAocmVxdWVzdFJlc3BvbnNlLmFjdGlvbiA9PT0gJ2FjY2VwdGVkJykge1xuICAgICAgc3dpdGNoIChyZXF1ZXN0VHlwZSkge1xuICAgICAgICBjYXNlICdmYS1taWNyb3Bob25lJzpcbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiAnVW5tdXRlIHJlcXVlc3Qgd2FzIGFjY2VwdGVkOyBjbGljayB0aGUgbWljIGJ1dHRvbiBhZ2FpbiB0byBiZWdpbi4nLFxuICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHVwZGF0ZU1pY0FjdGlvbih0cnVlKTtcbiAgICAgICAgICB1cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZSgnYWNjZXB0ZWQnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmEtdmlkZW8nOlxuICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdWaWRlbyByZXF1ZXN0IHdhcyBhY2NlcHRlZDsgY2xpY2sgdGhlIHZpZGVvIGJ1dHRvbiBhZ2FpbiB0byBiZWdpbi4nLFxuICAgICAgICAgICAgdHlwZTogJ3N1Y2Nlc3MnLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHVwZGF0ZVZpZGVvQWN0aW9uKHRydWUpO1xuICAgICAgICAgIHVwZGF0ZVZpZGVvUmVxdWVzdFN0YXRlKCdhY2NlcHRlZCcpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmYS1kZXNrdG9wJzpcbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiAnU2NyZWVuc2hhcmUgcmVxdWVzdCB3YXMgYWNjZXB0ZWQ7IGNsaWNrIHRoZSBzY3JlZW4gYnV0dG9uIGFnYWluIHRvIGJlZ2luLicsXG4gICAgICAgICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICAgICAgICBkdXJhdGlvbjogMTAwMDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdXBkYXRlU2NyZWVuQWN0aW9uKHRydWUpO1xuICAgICAgICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZSgnYWNjZXB0ZWQnKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmEtY29tbWVudHMnOlxuICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdDaGF0IHJlcXVlc3Qgd2FzIGFjY2VwdGVkOyBjbGljayB0aGUgY2hhdCBidXR0b24gYWdhaW4gdG8gYmVnaW4uJyxcbiAgICAgICAgICAgIHR5cGU6ICdzdWNjZXNzJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB1cGRhdGVDaGF0QWN0aW9uKHRydWUpO1xuICAgICAgICAgIHVwZGF0ZUNoYXRSZXF1ZXN0U3RhdGUoJ2FjY2VwdGVkJyk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEhhbmRsZSByZWplY3RlZCBhY3Rpb25zXG4gICAgICBsZXQgdGltZXJEYXRlOiBEYXRlO1xuICAgICAgc3dpdGNoIChyZXF1ZXN0VHlwZSkge1xuICAgICAgICBjYXNlICdmYS1taWNyb3Bob25lJzpcbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiAnVW5tdXRlIHJlcXVlc3Qgd2FzIG5vdCBhY2NlcHRlZCcsXG4gICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB1cGRhdGVBdWRpb1JlcXVlc3RTdGF0ZSgncmVqZWN0ZWQnKTtcbiAgICAgICAgICB0aW1lckRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgIHRpbWVyRGF0ZS5zZXRTZWNvbmRzKHRpbWVyRGF0ZS5nZXRTZWNvbmRzKCkgKyB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzKTtcbiAgICAgICAgICB1cGRhdGVBdWRpb1JlcXVlc3RUaW1lKHRpbWVyRGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmYS12aWRlbyc6XG4gICAgICAgICAgc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgbWVzc2FnZTogJ1ZpZGVvIHJlcXVlc3Qgd2FzIG5vdCBhY2NlcHRlZCcsXG4gICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB1cGRhdGVWaWRlb1JlcXVlc3RTdGF0ZSgncmVqZWN0ZWQnKTtcbiAgICAgICAgICB0aW1lckRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgIHRpbWVyRGF0ZS5zZXRTZWNvbmRzKHRpbWVyRGF0ZS5nZXRTZWNvbmRzKCkgKyB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzKTtcbiAgICAgICAgICB1cGRhdGVWaWRlb1JlcXVlc3RUaW1lKHRpbWVyRGF0ZS5nZXRUaW1lKCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdmYS1kZXNrdG9wJzpcbiAgICAgICAgICBzaG93QWxlcnQ/Lih7XG4gICAgICAgICAgICBtZXNzYWdlOiAnU2NyZWVuc2hhcmUgcmVxdWVzdCB3YXMgbm90IGFjY2VwdGVkJyxcbiAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgZHVyYXRpb246IDEwMDAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHVwZGF0ZVNjcmVlblJlcXVlc3RTdGF0ZSgncmVqZWN0ZWQnKTtcbiAgICAgICAgICB0aW1lckRhdGUgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgIHRpbWVyRGF0ZS5zZXRTZWNvbmRzKHRpbWVyRGF0ZS5nZXRTZWNvbmRzKCkgKyB1cGRhdGVSZXF1ZXN0SW50ZXJ2YWxTZWNvbmRzKTtcbiAgICAgICAgICB1cGRhdGVTY3JlZW5SZXF1ZXN0VGltZSh0aW1lckRhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZmEtY29tbWVudHMnOlxuICAgICAgICAgIHNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdDaGF0IHJlcXVlc3Qgd2FzIG5vdCBhY2NlcHRlZCcsXG4gICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAxMDAwMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB1cGRhdGVDaGF0UmVxdWVzdFN0YXRlKCdyZWplY3RlZCcpO1xuICAgICAgICAgIHRpbWVyRGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgICAgICAgdGltZXJEYXRlLnNldFNlY29uZHModGltZXJEYXRlLmdldFNlY29uZHMoKSArIHVwZGF0ZVJlcXVlc3RJbnRlcnZhbFNlY29uZHMpO1xuICAgICAgICAgIHVwZGF0ZUNoYXRSZXF1ZXN0VGltZSh0aW1lckRhdGUuZ2V0VGltZSgpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG4iXX0=