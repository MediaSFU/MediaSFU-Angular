import { Injectable } from '@angular/core';

export type CreateJoinRoomType = (options: {
  payload: any;
  apiUserName: string;
  apiKey: string;
}) => Promise<{
  data: CreateJoinRoomResponse | CreateJoinRoomError | null;
  success: boolean;
}>;

export type CreateRoomOnMediaSFUType = (options: {
  payload: any;
  apiUserName: string;
  apiKey: string;
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

@Injectable({
  providedIn: 'root',
})
export class JoinRoomOnMediaSFU {
  private readonly API_URL = 'https://mediasfu.com/v1/rooms/';

  constructor() {}

  /**
   * Joins a room on MediaSFU.
   *
   * @param payload - The payload for the API request.
   * @param apiUserName - The API username.
   * @param apiKey - The API key.
   * @returns The API response.
   */
  async joinRoomOnMediaSFU({
    payload,
    apiUserName,
    apiKey,
  }: {
    payload: any;
    apiUserName: string;
    apiKey: string;
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

      const response = await fetch(this.API_URL, {
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
    } catch (error: any) {
      const errorMessage = error.reason || error.message || 'unknown error';
      return {
        data: { error: `Unable to join room, ${errorMessage}` },
        success: false,
      };
    }
  }
}
