import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { joinRoom as sharedJoinRoom } from 'mediasfu-shared';

export interface JoinRoomOptions {
  socket: Socket;
  roomName: string;
  islevel: string;
  member: string;
  sec: string;
  apiUserName: string;
}

// Export the type definition for the function
export type JoinRoomType = (
  socket: Socket,
  roomName: string,
  islevel: string,
  member: string,
  sec: string,
  apiUserName: string,
) => Promise<object>;

/**
 * Joins a user to a room using socket communication with validation checks.
 *
 * @param {JoinRoomOptions} options - Contains:
 *   - `socket`: Socket instance for communication.
 *   - `roomName`: Name of the room to join.
 *   - `islevel`: User's level indicator.
 *   - `member`: User identifier.
 *   - `sec`: Security token.
 *   - `apiUserName`: API username for authentication.
 *
 * - **Validation**:
 *   - Ensures `roomName`, `apiUserName`, and `member` are alphanumeric.
 *   - Verifies that `roomName` starts with 's' or 'p' and meets length requirements.
 *   - Validates `sec`, `islevel`, and `apiUserName` against specified length and format conditions.
 *
 * - **Response Handling**:
 *   - Resolves with the server's response upon a successful join.
 *   - Rejects with a descriptive error if the user is banned, suspended, or if the host has not yet joined the room.
 *
 * @returns {Promise<object>} Resolves with data from the 'joinRoom' event or rejects with validation errors.
 * @throws {Error} Throws errors encountered during validation or join process.
 *
 * @example
 * ```typescript
 * const joinOptions = {
 *   socket: mySocket,
 *   roomName: 'sMyRoom',
 *   islevel: '1',
 *   member: 'participant123',
 *   sec: '64-character-secure-key...',
 *   apiUserName: 'apiUser123',
 * };
 * joinRoom(joinOptions)
 *   .then(response => console.log('Room joined:', response))
 *   .catch(error => console.error('Join failed:', error));
 * ```
 */


@Injectable({
  providedIn: 'root',
})
export class JoinRoom {
  async joinRoom({
    socket,
    roomName,
    islevel,
    member,
    sec,
    apiUserName,
  }: JoinRoomOptions): Promise<object> {
    return sharedJoinRoom(
      {
        socket,
        roomName,
        islevel,
        member,
        sec,
        apiUserName,
      } as unknown as Parameters<typeof sharedJoinRoom>[0],
    ) as unknown as Promise<object>;
  }
}
