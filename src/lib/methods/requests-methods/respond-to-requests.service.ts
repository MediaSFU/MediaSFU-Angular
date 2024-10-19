import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { Request, RequestResponse } from '../../@types/types';

export interface RespondToRequestsOptions {
  socket: Socket;
  request: Request;
  updateRequestList: (newRequestList: Request[]) => void;
  requestList: Request[];
  action: string;
  roomName: string;
}

// Export the type definition for the function
export type RespondToRequestsType = (options: RespondToRequestsOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class RespondToRequests {
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

  async respondToRequests({
    socket,
    request,
    updateRequestList,
    requestList,
    action,
    roomName,
  }: RespondToRequestsOptions): Promise<void> {
    // Filter out the request that is being responded to
    let newRequestList = requestList.filter((request_: any) => {
      return !(
        request_.id === request.id &&
        request_.icon === request.icon &&
        request_.name === request.name
      );
    });

    // Update the request list
    updateRequestList(newRequestList);

    // Prepare the request response object
    let requestResponse: RequestResponse = {
      id: request.id,
      name: request.name,
      type: request.icon,
      action: action,
    };

    // Emit the response via the socket
    socket.emit('updateUserofRequestStatus', { requestResponse, roomName });
  }
}
