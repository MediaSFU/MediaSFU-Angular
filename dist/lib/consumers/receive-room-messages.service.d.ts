import { Socket } from 'socket.io-client';
import { Message } from '../@types/types';
import * as i0 from "@angular/core";
export interface ReceiveRoomMessagesOptions {
    socket: Socket;
    roomName: string;
    updateMessages: (messages: Message[]) => void;
}
export type ReceiveRoomMessagesType = (options: ReceiveRoomMessagesOptions) => Promise<void>;
export declare class ReceiveRoomMessages {
    /**
     * Asynchronously retrieves and updates messages for a specified room from the server.
     *
     * @param {object} options - The function parameters.
     * @param {object} options.parameters - Additional parameters needed for the function.
     * @param {string} options.parameters.roomName - The name of the room to retrieve messages for.
     * @param {function} options.parameters.updateMessages - Function to update the messages array.
     */
    receiveRoomMessages({ socket, roomName, updateMessages, }: ReceiveRoomMessagesOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ReceiveRoomMessages, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ReceiveRoomMessages>;
}
