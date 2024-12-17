import { Injectable } from '@angular/core';
// Socket manager for media socket.
import io, { Socket } from 'socket.io-client'; // Importing socket type
import { MeetingRoomParams, RecordingParams } from "../@types/types";

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

// Export the type definition for the function
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


@Injectable({
  providedIn: 'root',
})
export class SocketManager {
  private socket!: Socket;

  async validateApiKeyToken(value: string): Promise<boolean> {
    if (!/^[a-z0-9]{64}$/i.test(value)) {
      throw new Error('Invalid API key or token.');
    }
    return true;
  }

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

  connectSocket = async ({
    apiUserName,
    apiKey,
    apiToken,
    link,
  }: ConnectSocketOptions): Promise<Socket> => {
    if (!apiUserName) {
      throw new Error('API username required.');
    }
    if (!(apiKey || apiToken)) {
      throw new Error('API key or token required.');
    }
    if (!link) {
      throw new Error('Socket link required.');
    }

    let useKey = false;
    try {
      if (apiKey && apiKey.length === 64) {
        await this.validateApiKeyToken(apiKey);
        useKey = true;
      } else {
        if (apiToken) {
          await this.validateApiKeyToken(apiToken);
        } else {
          throw new Error('API token is required.');
        }
        useKey = false;
      }
    } catch (error) {
      throw new Error('Invalid API key or token.');
    }

    return new Promise((resolve, reject) => {
      const query = useKey ? { apiUserName, apiKey } : { apiUserName, apiToken };

      this.socket = io(`${link}/media`, {
        transports: ['websocket'],
        query,
      });

      this.socket.on('connect', () => {
        console.log('Connected to media socket.', this.socket.id);
        resolve(this.socket);
      });

      this.socket.on('connect_error', () => {
        reject(new Error('Error connecting to media socket.'));
      });
    });
  };


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

  connectLocalSocket = async ({ link }: ConnectLocalSocketOptions): Promise<ResponseLocalConnection> => {
    if (!link) {
      throw new Error("Socket link required.");
    }

    let socket: Socket;

    return new Promise((resolve, reject) => {
      // Connect to socket using the link provided
      socket = io(`${link}/media`, {
        transports: ["websocket"],
      });


      // Handle socket connection events
      socket.on("connection-success", (data: ResponseLocalConnectionData) => {
        //check if link contains mediasfu.com and contains more than one c
        let conn = 'media';
        try {
          if (link.includes('mediasfu.com') && (link.match(/c/g)?.length ?? 0) > 1) {
            conn = 'consume';
          }
        } catch {
          // do nothing
        }
        console.log(`Connected to ${conn} socket with ID: ${socket.id}`);
        resolve({ socket, data });
      });

      socket.on("connect_error", (error: Error) => {
        reject(new Error("Error connecting to media socket: " + error.message));
      });
    });
  }

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

  disconnectSocket = async ({ socket }: DisconnectSocketOptions): Promise<boolean> => {
    if (socket) {
      socket.disconnect();
      return true;
    }
    return false;
  };
}
