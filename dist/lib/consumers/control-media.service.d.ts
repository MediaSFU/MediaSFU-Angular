import { Socket } from 'socket.io-client';
import { CoHostResponsibility, Participant, ShowAlert } from '../@types/types';
import * as i0 from "@angular/core";
export interface ControlMediaOptions {
    participantId: string;
    participantName: string;
    type: 'audio' | 'video' | 'screenshare' | 'all';
    socket: Socket;
    coHostResponsibility: CoHostResponsibility[];
    participants: Participant[];
    member: string;
    islevel: string;
    showAlert?: ShowAlert;
    coHost: string;
    roomName: string;
}
export type ControlMediaType = (options: ControlMediaOptions) => Promise<void>;
export declare class ControlMedia {
    /**
     * Controls the media of a participant in a media session if certain conditions are met.
     *
     * @param {Object} options - The options for controlling media.
     * @param {string} options.participantId - The ID of the participant to control.
     * @param {string} options.participantName - The name of the participant to control.
     * @param {string} options.type - The type of media to control.
     * @param {Socket} options.socket - The socket instance for communication.
     * @param {Array} options.coHostResponsibility - List of co-host responsibilities.
     * @param {Array} options.participants - List of participants in the session.
     * @param {string} options.member - The current member attempting to control media.
     * @param {string} options.islevel - The level of the current member.
     * @param {Function} [options.showAlert] - Optional function to show alerts.
     * @param {string} options.coHost - The co-host information.
     * @param {string} options.roomName - The name of the room.
     *
     * @returns {Promise<void>} A promise that resolves when the media control operation is complete.
     */
    controlMedia({ participantId, participantName, type, socket, coHostResponsibility, participants, member, islevel, showAlert, coHost, roomName, }: ControlMediaOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlMedia, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ControlMedia>;
}
