import { Injectable } from '@angular/core';
import { JoinRoom } from '../../producers/producer-emits/join-room.service';
import { JoinConRoom } from '../../producers/producer-emits/join-con-room.service';
import { Socket } from 'socket.io-client';
import { ResponseJoinRoom } from '../../@types/types';

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
@Injectable({
  providedIn: 'root',
})
export class JoinRoomClient {
  constructor(private JoinRoomService: JoinRoom, private JoinConRoomService: JoinConRoom) {}

  /**
   * Joins a room by emitting the `joinRoom` event to the server using the provided socket.
   *
   * @param {Object} options - The options for joining the room.
   * @param {Socket} options.socket - The socket instance to use for communication.
   * @param {string} options.roomName - The name of the room to join.
   * @param {boolean} options.islevel - The level indicator for the room.
   * @param {string} options.member - The member identifier.
   * @param {string} options.sec - The security token or identifier.
   * @param {string} options.apiUserName - The API username for authentication.
   * @param {boolean} [options.consume=false] - Flag to determine which join function to use.
   * @returns {Promise<any>} A promise that resolves with the data returned from the server.
   * @throws {Error} Throws an error if the room joining process fails.
   */
  async joinRoomClient({
    socket,
    roomName,
    islevel,
    member,
    sec,
    apiUserName,
    consume = false,
  }: JoinRoomClientOptions): Promise<any> {
    try {
      let data: Partial<ResponseJoinRoom>;

      if (consume) {
        data = await this.JoinConRoomService.joinConRoom({
          socket,
          roomName,
          islevel,
          member,
          sec,
          apiUserName,
        });
      } else {
        data = await this.JoinRoomService.joinRoom({
          socket,
          roomName,
          islevel,
          member,
          sec,
          apiUserName,
        });
      }

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to join the room. Please check your connection and try again.');
    }
  }
}
