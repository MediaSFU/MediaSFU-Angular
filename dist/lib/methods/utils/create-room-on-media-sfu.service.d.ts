import { CreateJoinRoomResponse, CreateJoinRoomError, CreateMediaSFURoomOptions, JoinMediaSFURoomOptions } from '../../@types/types';
import * as i0 from "@angular/core";
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
export declare class CreateRoomOnMediaSFU {
    constructor();
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
    createRoomOnMediaSFU({ payload, apiUserName, apiKey, localLink, }: {
        payload: CreateMediaSFURoomOptions | JoinMediaSFURoomOptions;
        apiUserName: string;
        apiKey: string;
        localLink?: string;
    }): Promise<{
        data: CreateJoinRoomResponse | CreateJoinRoomError | null;
        success: boolean;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CreateRoomOnMediaSFU, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CreateRoomOnMediaSFU>;
}
