import { JoinConRoom } from '../../producers/producer-emits/join-con-room.service';
import { Socket } from 'socket.io-client';
import { ReceiveAllPipedTransportsType, ReceiveAllPipedTransportsParameters, CreateDeviceClientType } from '../../@types/types';
import { Device, RtpCapabilities } from 'mediasoup-client/lib/types';
import * as i0 from "@angular/core";
export interface JoinConsumeRoomParameters extends ReceiveAllPipedTransportsParameters {
    roomName: string;
    islevel: string;
    member: string;
    device: Device | null;
    updateDevice: (device: Device | null) => void;
    receiveAllPipedTransports: ReceiveAllPipedTransportsType;
    createDeviceClient: CreateDeviceClientType;
    [key: string]: any;
}
export interface JoinConsumeRoomOptions {
    remote_sock: Socket;
    apiToken: string;
    apiUserName: string;
    parameters: JoinConsumeRoomParameters;
}
interface JoinConsumeRoomResponse {
    success: boolean;
    rtpCapabilities?: RtpCapabilities;
}
export type JoinConsumeRoomType = (options: JoinConsumeRoomOptions) => Promise<JoinConsumeRoomResponse>;
export declare class JoinConsumeRoom {
    private JoinConRoomService;
    constructor(JoinConRoomService: JoinConRoom);
    /**
     * Joins a consumption room by sending a request to the server and handles the necessary setup.
     * @param {Object} options - The options object containing necessary variables.
     * @param {any} options.remote_sock - The remote socket information.
     * @param {string} options.apiToken - The API token for authentication.
     * @param {string} options.apiUserName - The API username for authentication.
     * @param {any} options.parameters - Additional parameters required for the function.
     * @returns {Promise<any>} - A promise that resolves with data related to the success of joining the room.
     */
    joinConsumeRoom: ({ remote_sock, apiToken, apiUserName, parameters, }: JoinConsumeRoomOptions) => Promise<JoinConsumeRoomResponse>;
    static ɵfac: i0.ɵɵFactoryDeclaration<JoinConsumeRoom, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JoinConsumeRoom>;
}
export {};
