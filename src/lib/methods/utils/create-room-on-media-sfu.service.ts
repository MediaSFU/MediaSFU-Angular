import { Injectable } from '@angular/core';
import { CreateJoinRoomResponse, CreateJoinRoomError, CreateJoinRoomType, CreateMediaSFURoomOptions, JoinMediaSFURoomOptions } from '../../@types/types';

/**
 * Async function to create a room on MediaSFU.
 *
 * @param {CreateJoinRoomOptions} options - Contains: payload, apiUserName, apiKey, localLink.
 * @param {any} options.payload - The payload for the API request.
 * @param {string} options.apiUserName - The API username.
 * @param {string} options.apiKey - The API key.
 * @param {string} options.localLink - The local link for Community Edition.
 * @returns {Promise<{ data: CreateJoinRoomResponse | CreateJoinRoomError | null; success: boolean; }>} The response from the API.
 */
@Injectable({
  providedIn: 'root',
})
export class CreateRoomOnMediaSFU {
  private API_URL = 'https://mediasfu.com/v1/rooms/';

  constructor() {}

  async createRoomOnMediaSFU({
    payload,
    apiUserName,
    apiKey,
    localLink,
  }: {
    payload: any;
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

      if (localLink && localLink.trim() !== '' && !localLink.includes('mediasfu.com')) {
        localLink = localLink.replace(/\/$/, '');
        this.API_URL = localLink + '/joinRoom';
      }

      const response = await fetch(this.API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${apiUserName}:${apiKey}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return { data, success: true };
    } catch (error) {
      const errorMessage = (error as any).reason ? (error as any).reason : 'unknown error';
      return {
        data: { error: `Unable to create room, ${errorMessage}` },
        success: false,
      };
    }
  }
}
