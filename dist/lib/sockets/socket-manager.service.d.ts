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
/**
 * Manages connections to a media socket, allowing users to connect or disconnect based on API credentials.
 *
 * @class
 * @name SocketManager
 * @description Provides methods to connect and disconnect from a media socket using a provided API key or token.
 *
 * @method
 * validateApiKeyToken - Validates the API key or token for correct format.
 * connectSocket - Establishes a connection to the media socket using either the API key or token.
 * disconnectSocket - Disconnects an active socket connection.
 *
 * @example
 * ```typescript
 * const socketManager = new SocketManager();
 *
 * // Example of connecting to the socket
 * const socketConnection = await socketManager.connectSocket({
 *   apiUserName: 'user123',
 *   apiKey: 'validApiKeyOf64Characters',
 *   link: 'https://socketserver.example.com'
 * });
 *
 * // Example of disconnecting the socket
 * const isDisconnected = await socketManager.disconnectSocket({
 *   socket: socketConnection
 * });
 * ```
 *
 * @typedef {Object} ConnectSocketOptions
 * @property {string} apiUserName - Username for the API.
 * @property {string} [apiKey] - The API key for authentication.
 * @property {string} [apiToken] - The API token for authentication.
 * @property {string} link - The socket server link.
 *
 * @typedef {Object} DisconnectSocketOptions
 * @property {Socket} socket - The socket instance to disconnect.
 *
 * @returns {Promise<Socket | boolean>} The active socket instance on connection, or a boolean indicating disconnection success.
 */
export declare class SocketManager {
    private socket;
    validateApiKeyToken(value: string): Promise<boolean>;
    connectSocket: ({ apiUserName, apiKey, apiToken, link, }: ConnectSocketOptions) => Promise<Socket>;
    disconnectSocket: ({ socket }: DisconnectSocketOptions) => Promise<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SocketManager, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SocketManager>;
}
