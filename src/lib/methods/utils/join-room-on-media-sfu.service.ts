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

@Injectable({
  providedIn: 'root',
})
export class JoinRoomOnMediaSFU {

  constructor() {}

  /**
   * Joins a room on MediaSFU.
   *
   * @param payload - The payload for the API request.
   * @param apiUserName - The API username.
   * @param apiKey - The API key.
   * @param localLink - The local link for the Community Edition.
   * @returns The API response.
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
