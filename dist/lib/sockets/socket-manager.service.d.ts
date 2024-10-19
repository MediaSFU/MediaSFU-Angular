import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
/**
 * Validates the provided API key or token.
 * @param {string} value - The API key or token to validate.
 * @returns {Promise<Boolean>} - True if the API key or token is valid, false otherwise.
 */
export interface ConnectSocketOptions {
    apiUserName: string;
    apiKey?: string;
    apiToken?: string;
    link: string;
}
export interface DisconnectSocketOptions {
    socket: Socket;
}
export type ConnectSocketType = (options: ConnectSocketOptions) => Promise<Socket>;
export type DisconnectSocketType = (options: DisconnectSocketOptions) => Promise<boolean>;
export declare class SocketManager {
    private socket;
    validateApiKeyToken(value: string): Promise<boolean>;
    connectSocket: ({ apiUserName, apiKey, apiToken, link, }: ConnectSocketOptions) => Promise<Socket>;
    disconnectSocket: ({ socket }: DisconnectSocketOptions) => Promise<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SocketManager, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SocketManager>;
}
