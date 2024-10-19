import { ShowAlert, Request, RequestResponse } from '../../@types/types';
import * as i0 from "@angular/core";
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
export declare class HostRequestResponse {
    hostRequestResponse: ({ requestResponse, showAlert, requestList, updateRequestList, updateMicAction, updateVideoAction, updateScreenAction, updateChatAction, updateAudioRequestState, updateVideoRequestState, updateScreenRequestState, updateChatRequestState, updateAudioRequestTime, updateVideoRequestTime, updateScreenRequestTime, updateChatRequestTime, updateRequestIntervalSeconds, }: HostRequestResponseOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HostRequestResponse, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HostRequestResponse>;
}
