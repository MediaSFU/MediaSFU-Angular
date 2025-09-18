import { Injectable } from '@angular/core';
import { CreateJoinRoomResponse, CreateJoinRoomError, CreateJoinRoomType, CreateMediaSFURoomOptions, JoinMediaSFURoomOptions } from '../../@types/types';

/**
 * Asynchronously creates a room on MediaSFU.
 *
 * This method sends a POST request to the MediaSFU API to create a new room.
 * It validates the provided credentials and dynamically constructs the API endpoint,
 * supporting the Community Edition via a custom `localLink`. The method includes
 * a 30-second protection mechanism to prevent duplicate room creation requests.
 *
 * @param {object} options - Configuration options for creating the room.
 * @param {CreateMediaSFURoomOptions | JoinMediaSFURoomOptions} options.payload -
 *   The payload containing the room creation details.
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
* const response = await createRoomOnMediaSFU.createRoomOnMediaSFU({
*   payload: {
*     action: 'create',
*     duration: 60, // Duration in minutes
*     capacity: 10, // Max participants
*     userName: 'hostUser',
*     scheduledDate: Date.now() + 3600000, // One hour from now
*     secureCode: 'secure123', // Optional
*     eventType: 'conference', // Optional
*   },
*   apiUserName: 'yourAPIUSERNAME',
*   apiKey: 'yourAPIKEY',
*   localLink: 'http://localhost:3000', // Optional for Community Edition
* });
*
* if (response.success) {
*   console.log('Room created successfully:', response.data);
* } else {
*   console.error('Failed to create room:', response.data?.error);
* }
*/

@Injectable({
  providedIn: 'root',
})
export class CreateRoomOnMediaSFU {


  constructor() {}

  /**
 * Asynchronously creates a room on MediaSFU.
 *
 * This method sends a POST request to the MediaSFU API to create a new room.
 * It validates the provided credentials and dynamically constructs the API endpoint,
 * supporting the Community Edition via a custom `localLink`. The method includes
 * a 30-second protection mechanism to prevent duplicate room creation requests.
 *
 * @param {object} options - Configuration options for creating the room.
 * @param {CreateMediaSFURoomOptions | JoinMediaSFURoomOptions} options.payload -
 *   The payload containing the room creation details.
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
  * const response = await createRoomOnMediaSFU.createRoomOnMediaSFU({
  *   payload: {
  *     action: 'create',
  *     duration: 60, // Duration in minutes
  *     capacity: 10, // Max participants
  *     userName: 'hostUser',
  *     scheduledDate: Date.now() + 3600000, // One hour from now
  *     secureCode: 'secure123', // Optional
  *     eventType: 'conference', // Optional
  *   },
  *   apiUserName: 'yourAPIUSERNAME',
  *   apiKey: 'yourAPIKEY',
  *   localLink: 'http://localhost:3000', // Optional for Community Edition
  * });
  *
  * if (response.success) {
  *   console.log('Room created successfully:', response.data);
  * } else {
  *   console.error('Failed to create room:', response.data?.error);
  * }
  */

  async createRoomOnMediaSFU({
    payload,
    apiUserName,
    apiKey,
    localLink,
  }: {
    payload: CreateMediaSFURoomOptions | JoinMediaSFURoomOptions;
    apiUserName: string;
    apiKey: string;
    localLink?: string;
  }): Promise<{
    data: CreateJoinRoomResponse | CreateJoinRoomError | null;
    success: boolean;
  }> {
    // Create a unique key for this room creation request
    const roomIdentifier = payload.action === 'create'
      ? `create_${(payload as CreateMediaSFURoomOptions).userName}_${(payload as CreateMediaSFURoomOptions).duration}_${(payload as CreateMediaSFURoomOptions).capacity}`
      : `join_${(payload as JoinMediaSFURoomOptions).meetingID}_${payload.userName}`;

    const pendingKey = `mediasfu_pending_${roomIdentifier}`;
    const PENDING_TIMEOUT = 30 * 1000; // 30 seconds

    try {
      // Check if there's already a pending request for this room
      const pendingRequest = localStorage.getItem(pendingKey);
      if (pendingRequest) {
        const pendingData = JSON.parse(pendingRequest);
        const timeSincePending = Date.now() - pendingData.timestamp;

        if (timeSincePending < PENDING_TIMEOUT) {
          return {
            data: { error: "Room creation already in progress" },
            success: false,
          };
        } else {
          // Timeout exceeded, clear stale pending request
          localStorage.removeItem(pendingKey);
        }
      }

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

      let API_URL = 'https://mediasfu.com/v1/rooms/';

      if (localLink && localLink.trim() !== '' && !localLink.includes('mediasfu.com')) {
        localLink = localLink.replace(/\/$/, '');
        API_URL = localLink + '/createRoom';
      }

      // Mark request as pending
      localStorage.setItem(pendingKey, JSON.stringify({
        timestamp: Date.now(),
        payload: {
          action: payload.action,
          userName: payload.userName,
          meetingID: (payload as any).meetingID || 'create'
        }
      }));

      // Set timeout to clear pending status
      setTimeout(() => {
        try {
          localStorage.removeItem(pendingKey);
        } catch (error) {
          // Ignore localStorage errors
        }
      }, PENDING_TIMEOUT);

      const response = await fetch(API_URL, {
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

      const data: CreateJoinRoomResponse = await response.json();

      // Clear pending status on success
      localStorage.removeItem(pendingKey);

      return { data, success: true };
    } catch (error) {
      // Clear pending status on error
      try {
        localStorage.removeItem(pendingKey);
      } catch (e) {
        // Ignore localStorage errors
      }

      const errorMessage = (error as Error).message || 'unknown error';
      return {
        data: { error: `Unable to create room, ${errorMessage}` },
        success: false,
      };
    }
  }
}
