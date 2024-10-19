import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';

export interface DisconnectUserSelfOptions {
  member: string;
  roomName: string;
  socket: Socket;
}

// Export the type definition for the function
export type DisconnectUserSelfType = (options: DisconnectUserSelfOptions) => Promise<void>;
@Injectable({
  providedIn: 'root',
})
export class DisconnectUserSelf {
  /**
   * Disconnects the user from the specified room and bans them.
   *
   * @param {DisconnectUserSelfOptions} options - The options for disconnecting the user.
   * @param {Object} options.member - The member object representing the user to disconnect.
   * @param {string} options.roomName - The name of the room from which the user will be disconnected.
   * @param {Socket} options.socket - The socket instance used to emit the disconnection request.
   * @returns {Promise<void>} A promise that resolves when the disconnection request has been emitted.
   */
  disconnectUserSelf = async ({
    member,
    roomName,
    socket,
  }: DisconnectUserSelfOptions): Promise<void> => {
    // Update that the user needs to be disconnected; this is initiated by the host when banning a user
    socket.emit('disconnectUser', { member, roomName, ban: true });
  };
}
