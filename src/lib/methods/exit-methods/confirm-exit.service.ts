// confirm-exit.service.ts

import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';

export interface ConfirmExitOptions {
  socket: Socket;
  localSocket?: Socket;
  member: string;
  roomName: string;
  ban?: boolean;
}

// Export the type definition for the function
export type ConfirmExitType = (options: ConfirmExitOptions) => Promise<void>;

/**
 * Confirms the exit of a member from a room and optionally bans them.
 *
 * This method emits a socket event to disconnect the specified member from the given room.
 * If the `ban` option is set to true, the member will be banned from rejoining the room.
 *
 * @param {ConfirmExitOptions} options - The options for confirming the exit.
 * @param {Socket} options.socket - The socket instance to emit the event.
 * @param {Socket} [options.localSocket] - The local socket instance to emit the event.
 * @param {string} options.member - The member who is exiting.
 * @param {string} options.roomName - The name of the room the member is exiting from.
 * @param {boolean} [options.ban=false] - Whether to ban the member from the room.
 * @returns {Promise<void>} A promise that resolves when the exit is confirmed.
 *
 * @example
 * ```typescript
 * const confirmExitService = new ConfirmExit();
 * await confirmExitService.confirmExit({
 *   socket: socketInstance,
 *   localSocket: localSocketInstance,
 *   member: 'JohnDoe',
 *   roomName: 'Room1',
 *   ban: true, // Optional: set to true if you want to ban the member
 * });
 * ```
 */

@Injectable({
  providedIn: 'root',
})
export class ConfirmExit {
  /**
   * Confirms the exit of a member from a room and optionally bans them.
   *
   * @param {Object} options - The options for confirming the exit.
   * @param {Socket} options.socket - The socket instance to emit the event.
   * @param {Socket} [options.localSocket] - The local socket instance to emit the event.
   * @param {string} options.member - The member who is exiting.
   * @param {string} options.roomName - The name of the room the member is exiting from.
   * @param {boolean} [options.ban=false] - Whether to ban the member from the room.
   * @returns {Promise<void>} A promise that resolves when the exit is confirmed.
   */
  async confirmExit({ socket, localSocket, member, roomName, ban = false }: ConfirmExitOptions): Promise<void> {
    // Emit a socket event to disconnect the user from the room
    socket.emit('disconnectUser', { member: member, roomName: roomName, ban: ban });

    if (localSocket && localSocket.id) {
      // Emit a local socket event to disconnect the user from the room
      localSocket.emit("disconnectUser", {
        member: member,
        roomName: roomName,
        ban: ban,
      });
    }
  }
}
