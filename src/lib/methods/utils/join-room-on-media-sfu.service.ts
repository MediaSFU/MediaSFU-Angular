import { Injectable } from '@angular/core';
import {
  CreateMediaSFURoomOptions,
  JoinMediaSFURoomOptions,
} from '../../@types/types';

export type CreateJoinRoomType = (options: {
  payload: CreateMediaSFURoomOptions | JoinMediaSFURoomOptions;
  apiUserName: string;
  apiKey: string;
  localLink?: string;
}) => Promise<{
  data: CreateJoinRoomResponse | CreateJoinRoomError | null;
  success: boolean;
}>;

export type CreateRoomOnMediaSFUType = (options: {
  payload: CreateMediaSFURoomOptions;
  apiUserName: string;
  apiKey: string;
  localLink?: string;
}) => Promise<{
  data: CreateJoinRoomResponse | CreateJoinRoomError | null;
  success: boolean;
}>;


export interface CreateJoinRoomResponse {
  message: string;
  roomName: string;
  secureCode?: string;
  publicURL: string;
  link: string;
  secret: string;
  success: boolean;
}

export interface CreateJoinRoomError {
  error: string;
  success?: boolean;
}

export type JoinRoomOnMediaSFUType = (options: {
  payload: JoinMediaSFURoomOptions;
  apiUserName: string;
  apiKey: string;
  localLink?: string;
}) => Promise<{
  data: CreateJoinRoomResponse | CreateJoinRoomError | null;
  success: boolean;
}>;

/**
 * Asynchronously joins a room on MediaSFU.
 *
 * This method sends a POST request to the MediaSFU API to join an existing room.
 * It validates the provided credentials and dynamically constructs the API endpoint,
 * including support for the Community Edition via a custom `localLink`.
 *
 * @param {object} options - Configuration options for joining the room.
 * @param {JoinMediaSFURoomOptions | CreateMediaSFURoomOptions} options.payload -
 *   The payload containing the room details and action (`join` or `create`).
 * @param {string} options.apiUserName - The API username, used for authentication.
 * @param {string} options.apiKey - The API key, used for authentication.
 * @param {string} [options.localLink=""] -
 *   The local link for Community Edition users. If provided, it overrides the default API URL.
 *
 * @returns {Promise<{
*   data: CreateJoinRoomResponse | CreateJoinRoomError | null;
*   success: boolean;
* }>} A promise resolving to an object containing the API response:
* - `data`: The response object, either `CreateJoinRoomResponse` or `CreateJoinRoomError`.
* - `success`: Boolean indicating whether the operation was successful.
*
* @throws {Error} Throws an error if the request fails or if the provided credentials are invalid.
*
* @example
* const response = await joinRoomOnMediaSFU.joinRoomOnMediaSFU({
*   payload: {
*     action: 'join',
*     meetingID: '123456',
*     userName: 'user123',
*   },
*   apiUserName: 'yourAPIUSERNAME',
*   apiKey: 'yourAPIKEY',
*   localLink: 'http://localhost:3000', // Optional for Community Edition
* });
*
* if (response.success) {
*   console.log('Joined room successfully:', response.data);
* } else {
*   console.error('Failed to join room:', response.data?.error);
* }
*/


@Injectable({
  providedIn: 'root',
})
export class JoinRoomOnMediaSFU {

  constructor() {}

  /**
 * Asynchronously joins a room on MediaSFU.
 *
 * This method sends a POST request to the MediaSFU API to join an existing room.
 * It validates the provided credentials and dynamically constructs the API endpoint,
 * including support for the Community Edition via a custom `localLink`.
 *
 * @param {object} options - Configuration options for joining the room.
 * @param {JoinMediaSFURoomOptions | CreateMediaSFURoomOptions} options.payload -
 *   The payload containing the room details and action (`join` or `create`).
 * @param {string} options.apiUserName - The API username, used for authentication.
 * @param {string} options.apiKey - The API key, used for authentication.
 * @param {string} [options.localLink=""] -
 *   The local link for Community Edition users. If provided, it overrides the default API URL.
 *
 * @returns {Promise<{
 *   data: CreateJoinRoomResponse | CreateJoinRoomError | null;
  *   success: boolean;
  * }>} A promise resolving to an object containing the API response:
  * - `data`: The response object, either `CreateJoinRoomResponse` or `CreateJoinRoomError`.
  * - `success`: Boolean indicating whether the operation was successful.
  *
  * @throws {Error} Throws an error if the request fails or if the provided credentials are invalid.
  *
  * @example
  * const response = await joinRoomOnMediaSFU.joinRoomOnMediaSFU({
  *   payload: {
  *     action: 'join',
  *     meetingID: '123456',
  *     userName: 'user123',
  *   },
  *   apiUserName: 'yourAPIUSERNAME',
  *   apiKey: 'yourAPIKEY',
  *   localLink: 'http://localhost:3000', // Optional for Community Edition
  * });
  *
  * if (response.success) {
  *   console.log('Joined room successfully:', response.data);
  * } else {
  *   console.error('Failed to join room:', response.data?.error);
  * }
  */

  async joinRoomOnMediaSFU({
    payload,
    apiUserName,
    apiKey,
    localLink,
  }: {
    payload: JoinMediaSFURoomOptions | CreateMediaSFURoomOptions;
    apiUserName: string;
    apiKey: string;
    localLink?: string;
  }): Promise<{
    data: CreateJoinRoomResponse | CreateJoinRoomError | null;
    success: boolean;
  }> {
    try {
      if (
        !apiUserName ||
        !apiKey ||
        apiUserName === 'yourAPIUSERNAME' ||
        apiKey === 'yourAPIKEY' ||
        apiKey.length !== 64 ||
        apiUserName.length < 6
      ) {
        return { data: { error: 'Invalid credentials' }, success: false };
      }

      let API_URL =  'https://mediasfu.com/v1/rooms/';

      if (localLink && localLink.trim() !== '' && !localLink.includes('mediasfu.com')) {
        localLink = localLink.replace(/\/$/, '');
        API_URL = localLink + '/joinRoom';
      }


      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiUserName}:${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
      }

      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      const errorMessage = (error as any).reason ? (error as any).reason : 'unknown error';
      return {
        data: { error: `Unable to join room, ${errorMessage}` },
        success: false,
      };
    }
  }
}
