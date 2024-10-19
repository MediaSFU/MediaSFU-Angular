import { Poll, ShowAlert } from '../../@types/types';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface HandleCreatePollOptions {
    poll: Poll;
    socket: Socket;
    roomName: string;
    showAlert?: ShowAlert;
    updateIsPollModalVisible: (visible: boolean) => void;
}
export type HandleCreatePollType = (options: HandleCreatePollOptions) => Promise<void>;
export declare class HandleCreatePoll {
    /**
     * Handles the creation of a poll.
     *
     * @param {Object} options - The options for creating the poll.
     * @param {Poll} options.poll - The poll object containing the poll details.
     * @param {Object} options.parameters - Additional parameters for creating the poll.
     * @returns {Promise<void>} - A promise that resolves when the poll is created successfully.
     */
    handleCreatePoll({ poll, socket, roomName, showAlert, updateIsPollModalVisible, }: HandleCreatePollOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HandleCreatePoll, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HandleCreatePoll>;
}
