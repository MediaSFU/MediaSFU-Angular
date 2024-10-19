import { Socket } from 'socket.io-client';
import { ShowAlert } from '../../@types/types';
import * as i0 from "@angular/core";
export interface HandleVotePollOptions {
    pollId: string;
    optionIndex: number;
    socket: Socket;
    showAlert?: ShowAlert;
    member: string;
    roomName: string;
    updateIsPollModalVisible: (isVisible: boolean) => void;
}
export type HandleVotePollType = (options: HandleVotePollOptions) => Promise<void>;
export declare class HandleVotePoll {
    /**
     * Handles the voting process for a poll.
     *
     * @param {Object} options - The options for handling the vote.
     * @param {string} options.pollId - The ID of the poll.
     * @param {number} options.optionIndex - The index of the selected option.
     * @param {Socket} options.socket - The socket instance for communication.
     * @param {Function} [options.showAlert] - Optional function to show alerts.
     * @param {Object} options.member - The member who is voting.
     * @param {string} options.roomName - The name of the room where the poll is conducted.
     * @param {Function} options.updateIsPollModalVisible - Function to update the visibility of the poll modal.
     * @returns {Promise<void>} A promise that resolves when the vote is handled.
     *
     * @throws Will log an error message if there is an issue submitting the vote.
     */
    handleVotePoll({ pollId, optionIndex, socket, showAlert, member, roomName, updateIsPollModalVisible, }: HandleVotePollOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<HandleVotePoll, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<HandleVotePoll>;
}
