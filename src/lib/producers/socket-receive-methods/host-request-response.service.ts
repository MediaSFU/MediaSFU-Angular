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
