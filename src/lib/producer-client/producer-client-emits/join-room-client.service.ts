import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { joinRoomClient as sharedJoinRoomClient } from 'mediasfu-shared';

export interface JoinRoomClientOptions {
  socket: Socket;
  roomName: string;
  islevel: string;
  member: string;
  sec: string;
  apiUserName: string;
  consume?: boolean;
}

// Export the type definition for the function
export type JoinRoomClientType = (params: JoinRoomClientOptions) => Promise<any>;

/**
 * Facilitates joining a room by emitting the `joinRoom` event to the server through a socket connection.
 *
 * @param {JoinRoomClientOptions} options - Configuration options for joining the room.
 * @param {Socket} options.socket - The socket instance for server communication.
 * @param {string} options.roomName - The name of the room to join.
 * @param {string} options.islevel - Level identifier for the user in the room.
 * @param {string} options.member - Member identifier for the joining user.
 * @param {string} options.sec - Security token or identifier for access.
 * @param {string} options.apiUserName - API username for server authentication.
 * @param {boolean} [options.consume=false] - If `true`, joins via `joinConRoom`; otherwise, joins via `joinRoom`.
 * @returns {Promise<any>} - A promise resolving with the server response data.
 * @throws {Error} - Throws an error if the room joining attempt fails.
 *
 * @example
 * ```typescript
 * const joinRoomClient = new JoinRoomClient(joinRoomService, joinConRoomService);
 * const response = await joinRoomClient.joinRoomClient({
 *   socket: mySocket,
 *   roomName: 'myRoom',
 *   islevel: '1',
 *   member: 'user123',
 *   sec: 'secureToken',
 *   apiUserName: 'apiUser',
 *   consume: true,
 * });
 * console.log('Joined room with response:', response);
 * ```
 *
 * This example demonstrates using `joinRoomClient` to join a room, either as a consumer or a producer, based on the `consume` flag.
 */

@Injectable({
  providedIn: 'root',
})
export class JoinRoomClient {
  async joinRoomClient({
    socket,
    roomName,
    islevel,
    member,
    sec,
    apiUserName,
    consume = false,
  }: JoinRoomClientOptions): Promise<any> {
    return sharedJoinRoomClient(
      {
        socket,
        roomName,
        islevel,
        member,
        sec,
        apiUserName,
        consume,
      } as unknown as Parameters<typeof sharedJoinRoomClient>[0],
    ) as unknown as Promise<any>;
  }
}
