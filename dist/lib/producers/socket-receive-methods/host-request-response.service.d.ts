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
export declare class HostRequestResponse {
    hostRequestResponse: ({ requestResponse, showAlert, requestList, updateRequestList, updateMicAction, updateVideoAction, updateScreenAction, updateChatAction, updateAudioRequestState, updateVideoRequestState, updateScreenRequestState, updateChatRequestState, updateAudioRequestTime, updateVideoRequestTime, updateScreenRequestTime, updateChatRequestTime, updateRequestIntervalSeconds, }: HostRequestResponseOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HostRequestResponse, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HostRequestResponse>;
}
