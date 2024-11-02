import { Injectable } from '@angular/core';
import { ShowAlert, Request, RequestResponse } from '../../@types/types';

export interface HostRequestResponseOptions {
  requestResponse: RequestResponse;

  showAlert?: ShowAlert;
  requestList: Request[];
  updateRequestList: (requestList: Request[]) => void;
  updateMicAction: (action: boolean) => void;
  updateVideoAction: (action: boolean) => void;
  updateScreenAction: (action: boolean) => void;
  updateChatAction: (action: boolean) => void;
  updateAudioRequestState: (state: string | null) => void;
  updateVideoRequestState: (state: string | null) => void;
  updateScreenRequestState: (state: string | null) => void;
  updateChatRequestState: (state: string | null) => void;
  updateAudioRequestTime: (time: number) => void;
  updateVideoRequestTime: (time: number) => void;
  updateScreenRequestTime: (time: number) => void;
  updateChatRequestTime: (time: number) => void;
  updateRequestIntervalSeconds: number;
}

// Export the type definition for the function
export type HostRequestResponseType = (options: HostRequestResponseOptions) => Promise<void>;

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


@Injectable({
  providedIn: 'root',
})
export class HostRequestResponse {
  hostRequestResponse = async ({
    requestResponse,
    showAlert,
    requestList,
    updateRequestList,
    updateMicAction,
    updateVideoAction,
    updateScreenAction,
    updateChatAction,
    updateAudioRequestState,
    updateVideoRequestState,
    updateScreenRequestState,
    updateChatRequestState,
    updateAudioRequestTime,
    updateVideoRequestTime,
    updateScreenRequestTime,
    updateChatRequestTime,
    updateRequestIntervalSeconds,
  }: HostRequestResponseOptions): Promise<void> => {
    // Filter out the request from the list
    const filteredRequests = requestList.filter(
      (request) =>
        request.id !== requestResponse.id &&
        request.icon !== requestResponse.type &&
        request.name !== requestResponse.name &&
        request.username !== requestResponse.username,
    );
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
    } else {
      // Handle rejected actions
      let timerDate: Date;
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
}
