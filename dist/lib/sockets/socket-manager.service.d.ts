import { Socket } from 'socket.io-client';
import { MeetingRoomParams, RecordingParams } from "../@types/types";
import * as i0 from "@angular/core";
/**
 * Validates the provided API key or token.
 * @param {string} value - The API key or token to validate.
 * @returns {Promise<Boolean>} - True if the API key or token is valid, false otherwise.
 */
export interface ResponseLocalConnection {
    socket?: Socket;
    data?: ResponseLocalConnectionData;
}
export interface ResponseLocalConnectionData {
    socketId: string;
    mode: string;
    apiUserName?: string;
    apiKey?: string;
    allowRecord: boolean;
    meetingRoomParams_: MeetingRoomParams;
    recordingParams_: RecordingParams;
}
export interface ConnectLocalSocketOptions {
    link: string;
}
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
export type ConnectLocalSocketType = (options: ConnectLocalSocketOptions) => Promise<ResponseLocalConnection>;
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
    /**
     * Connects to a media socket using the provided connection options.
     *
     * @param {ConnectSocketOptions} options - The connection options.
     * @param {string} options.apiUserName - The API username.
     * @param {string} [options.apiKey] - The API key for authentication.
     * @param {string} [options.apiToken] - The API token for authentication.
     * @param {string} options.link - The socket link.
     *
     * @returns {Promise<Socket>} A promise that resolves to the connected socket.
     *
     * @example
     * ```typescript
     * const options = {
     *   apiUserName: 'user123',
     *   apiKey: 'validApiKeyOf64Characters',
     *   link: 'https://socketserver.example.com'
     * };
     *
     * try {
     *   const socket = await connectSocket(options);
     *   console.log('Connected to socket:', socket);
     * } catch (error) {
     *   console.error('Failed to connect to socket:', error);
     * }
     * ```
     */
    connectSocket: ({ apiUserName, apiKey, apiToken, link, }: ConnectSocketOptions) => Promise<Socket>;
    /**
     * Connects to a local media socket using the provided connection options.
     *
     * @param {ConnectLocalSocketOptions} options - The connection options.
     * @param {string} options.link - The socket link.
     *
     * @returns {Promise<ResponseLocalConnection>} A promise that resolves to the connected socket and data.
     *
     * @example
     * ```typescript
     * const options = {
     *   link: "http://localhost:3000",
     * };
     *
     * try {
     *   const { socket, data } = await connectLocalSocket(options);
     *   console.log("Connected to socket:", socket, data);
     * } catch (error) {
     *   console.error("Failed to connect to socket:", error);
     * }
     * ```
     */
    connectLocalSocket: ({ link }: ConnectLocalSocketOptions) => Promise<ResponseLocalConnection>;
    /**
     * Disconnects an active socket connection.
     *
     * @param {DisconnectSocketOptions} options - The options for disconnecting the socket.
     * @param {Socket} options.socket - The socket instance to disconnect.
     *
     * @returns {Promise<boolean>} A promise that resolves to true if the socket was disconnected successfully, or false otherwise.
     *
     * @example
     * ```typescript
     * const options = {
     *   socket: mySocketInstance,
     * };
     *
     * try {
     *   const isDisconnected = await disconnectSocket(options);
     *   console.log("Socket disconnected:", isDisconnected);
     * } catch (error) {
     *   console.error("Failed to disconnect socket:", error);
     * }
     * ```
     */
    disconnectSocket: ({ socket }: DisconnectSocketOptions) => Promise<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<SocketManager, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<SocketManager>;
}
