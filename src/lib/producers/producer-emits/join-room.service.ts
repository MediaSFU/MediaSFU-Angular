import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { ValidateAlphanumeric } from '../../methods/utils/validate-alphanumeric.service';

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
  constructor(private validateAlphanumeric: ValidateAlphanumeric) {}

  /**
   * Joins a user to a specified room via a socket connection.
   *
   * @param {Object} options - The options for joining the room.
   * @param {Socket} options.socket - The socket instance to use for communication.
   * @param {string} options.roomName - The name of the room to join.
   * @param {string} options.islevel - The level of the user.
   * @param {string} options.member - The member identifier.
   * @param {string} options.sec - The security token.
   * @param {string} options.apiUserName - The API username of the user.
   *
   * @returns {Promise<object>} A promise that resolves with the data received from the 'joinRoom' event or rejects with a validation error.
   *
   * @throws {Error} Throws an error if the user is banned, suspended, or if the host has not joined the room yet.
   */
  async joinRoom({
    socket,
    roomName,
    islevel,
    member,
    sec,
    apiUserName,
  }: JoinRoomOptions): Promise<object> {
    return new Promise((resolve, reject) => {
      // Validate inputs
      if (!(sec && roomName && islevel && apiUserName && member)) {
        const validationError = {
          success: false,
          rtpCapabilities: null,
          reason: 'Missing required parameters',
        };
        reject(validationError);
        return;
      }

      // Validate alphanumeric for roomName, apiUserName, and member
      try {
        this.validateAlphanumeric.validateAlphanumeric({ str: roomName });
        this.validateAlphanumeric.validateAlphanumeric({ str: apiUserName });
        this.validateAlphanumeric.validateAlphanumeric({ str: member });
      } catch (error) {
        const validationError = {
          success: false,
          rtpCapabilities: null,
          reason: 'Invalid roomName or apiUserName or member',
        };
        reject(validationError);
        return;
      }

      // Validate roomName starts with 's' or 'p'
      if (!(roomName.startsWith('s') || roomName.startsWith('p'))) {
        const validationError = {
          success: false,
          rtpCapabilities: null,
          reason: 'Invalid roomName, must start with s or p',
        };
        reject(validationError);
        return;
      }

      // Validate other conditions for sec, roomName, islevel, apiUserName
      if (
        !(
          sec.length === 64 &&
          roomName.length >= 8 &&
          islevel.length === 1 &&
          apiUserName.length >= 6 &&
          (islevel === '0' || islevel === '1' || islevel === '2')
        )
      ) {
        const validationError = {
          success: false,
          rtpCapabilities: null,
          reason: 'Invalid roomName or islevel or apiUserName or secret',
        };
        reject(validationError);
        return;
      }

      socket.emit(
        'joinRoom',
        { roomName, islevel, member, sec, apiUserName },
        async (data: any) => {
          try {
            // Check if rtpCapabilities is null
            if (data.rtpCapabilities === null) {
              // Check if banned, suspended, or noAdmin
              if (data.banned) {
                throw new Error('User is banned.');
              }
              if (data.suspended) {
                throw new Error('User is suspended.');
              }
              if (data.noAdmin) {
                throw new Error('Host has not joined the room yet.');
              }

              // Resolve with the data received from the 'joinRoom' event
              resolve(data);
            } else {
              // Resolve with the data received from the 'joinRoom' event
              resolve(data);
            }
          } catch (error) {
            // Handle errors during the joinRoom process
            console.log('Error joining room:', error);
            reject(error);
          }
        },
      );
    });
  }
}
