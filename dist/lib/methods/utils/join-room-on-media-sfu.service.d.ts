import { CreateMediaSFURoomOptions, JoinMediaSFURoomOptions } from '../../@types/types';
import * as i0 from "@angular/core";
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
export declare class JoinRoomOnMediaSFU {
    constructor();
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
    joinRoomOnMediaSFU({ payload, apiUserName, apiKey, localLink, }: {
        payload: JoinMediaSFURoomOptions | CreateMediaSFURoomOptions;
        apiUserName: string;
        apiKey: string;
        localLink?: string;
    }): Promise<{
        data: CreateJoinRoomResponse | CreateJoinRoomError | null;
        success: boolean;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<JoinRoomOnMediaSFU, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JoinRoomOnMediaSFU>;
}
