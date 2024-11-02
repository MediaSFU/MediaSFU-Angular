import { Injectable } from '@angular/core';
// Socket manager for media socket.
import io, { Socket } from 'socket.io-client'; // Importing socket type

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

// Export the type definition for the function
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

  disconnectSocket = async ({ socket }: DisconnectSocketOptions): Promise<boolean> => {
    if (socket) {
      socket.disconnect();
      return true;
    }
    return false;
  };
}
