import { Socket } from 'socket.io-client';
import { Request } from '../../@types/types';
import * as i0 from "@angular/core";
export interface RespondToRequestsOptions {
    socket: Socket;
    request: Request;
    updateRequestList: (newRequestList: Request[]) => void;
    requestList: Request[];
    action: string;
    roomName: string;
}
export type RespondToRequestsType = (options: RespondToRequestsOptions) => Promise<void>;
/**
 * Responds to incoming requests by updating the request list and emitting a response to the server.
 *
 * @param {RespondToRequestsOptions} options - The options for responding to requests.
 * @param {Socket} options.socket - The socket instance used to emit the response.
 * @param {Request} options.request - The request object containing details of the request.
 * @param {Function} options.updateRequestList - The function to update the request list.
 * @param {Request[]} options.requestList - The current list of requests.
 * @param {string} options.action - The action to be taken on the request.
 * @param {string} options.roomName - The name of the room to which the response should be emitted.
 *
 * @returns {Promise<void>} A promise that resolves when the response has been emitted.
 *
 * @remarks
 * This method filters out the request that is being responded to from the current request list,
 * updates the list, and emits the response to the server using the provided socket.
 * It ensures that the state of the requests is accurately reflected in the application.
 *
 * @example
 * ```typescript
 * const options: RespondToRequestsOptions = {
 *   socket: socketInstance,
 *   request: {
 *     id: 'request_id',
 *     name: 'Request Name',
 *     icon: 'request_icon'
 *   },
 *   updateRequestList: (newRequestList) => {
 *     console.log('Updated request list:', newRequestList);
 *   },
 *   requestList: currentRequestList,
 *   action: 'accept',
 *   roomName: 'Room 1',
 * };
 *
 * const respondToRequestsService = new RespondToRequests();
 * await respondToRequestsService.respondToRequests(options);
 * ```
 */
export declare class RespondToRequests {
    /**
     * Responds to incoming requests by updating the request list and emitting a response to the server.
     *
     * @param {Object} options - The options for responding to requests.
     * @param {Socket} options.socket - The socket instance used to emit the response.
     * @param {Request} options.request - The request object containing details of the request.
     * @param {Function} options.updateRequestList - The function to update the request list.
     * @param {Request[]} options.requestList - The current list of requests.
     * @param {string} options.action - The action to be taken on the request.
     * @param {string} options.roomName - The name of the room to which the response should be emitted.
     *
     * @returns {Promise<void>} A promise that resolves when the response has been emitted.
     */
    respondToRequests({ socket, request, updateRequestList, requestList, action, roomName, }: RespondToRequestsOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RespondToRequests, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RespondToRequests>;
}
