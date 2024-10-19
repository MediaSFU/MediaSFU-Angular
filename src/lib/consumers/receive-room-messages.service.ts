import { Injectable } from '@angular/core';
import { Socket } from 'socket.io-client';
import { Message } from '../@types/types';
export interface ReceiveRoomMessagesOptions {
  socket: Socket;
  roomName: string;
  updateMessages: (messages: Message[]) => void;
}

// Export the type definition for the function
export type ReceiveRoomMessagesType = (options: ReceiveRoomMessagesOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class ReceiveRoomMessages {
  /**
   * Asynchronously retrieves and updates messages for a specified room from the server.
   *
   * @param {object} options - The function parameters.
   * @param {object} options.parameters - Additional parameters needed for the function.
   * @param {string} options.parameters.roomName - The name of the room to retrieve messages for.
   * @param {function} options.parameters.updateMessages - Function to update the messages array.
   */
  async receiveRoomMessages({
    socket,
    roomName,
    updateMessages,
  }: ReceiveRoomMessagesOptions): Promise<void> {
    try {
      // Retrieve messages from the server
      await new Promise<void>((resolve, reject) => {
        socket.emit('getMessage', { roomName }, async ({ messages_ }: { messages_: Message[] }) => {
          try {
            const updatedMessages = messages_;
            updateMessages(updatedMessages);
            resolve();
          } catch (err) {
            reject(err);
          }
        });
      });
    } catch (error: any) {
      // Handle errors if any
      console.log('Error tuning messages:', error.message);
    }
  }
}
