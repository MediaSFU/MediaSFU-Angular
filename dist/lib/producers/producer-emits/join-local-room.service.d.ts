import { Socket } from 'socket.io-client';
import { ValidateAlphanumeric } from '../../methods/utils/validate-alphanumeric.service';
import { ResponseJoinLocalRoom, PreJoinPageParameters } from '../../@types/types';
import { CheckLimitsAndMakeRequest } from '../../methods/utils/check-limits-and-make-request.service';
import { JoinRoomOnMediaSFU, JoinRoomOnMediaSFUType } from '../../methods/utils/join-room-on-media-sfu.service';
import * as i0 from "@angular/core";
export interface JoinLocalRoomOptions {
    socket: Socket;
    roomName: string;
    islevel: string;
    member: string;
    sec: string;
    apiUserName: string;
    parameters: PreJoinPageParameters;
    checkConnect?: boolean;
    joinMediaSFURoom?: JoinRoomOnMediaSFUType;
    localLink?: string;
}
export type JoinLocalRoomType = (options: JoinLocalRoomOptions) => Promise<ResponseJoinLocalRoom>;
export interface CheckMediasfuURLOptions {
    data: ResponseJoinLocalRoom;
    member: string;
    roomName: string;
    islevel: string;
    socket: Socket;
    parameters: PreJoinPageParameters;
    joinMediaSFURoom?: JoinRoomOnMediaSFUType;
    localLink?: string;
}
export type CheckMediasfuURLType = (options: CheckMediasfuURLOptions) => Promise<void>;
/**
 * Checks the MediaSFU URL and processes the necessary actions based on the URL's validity.
 *
 * @param {CheckMediasfuURLOptions} options - The options for checking and handling the MediaSFU URL.
 * @param {ResponseJoinLocalRoom} options.data - The data received from the room join response.
 * @param {string} options.member - The member identifier.
 * @param {string} options.roomName - The name of the room to join.
 * @param {string} options.islevel - The level of the user.
 * @param {Socket} options.socket - The socket instance to use for communication.
 * @param {PreJoinPageParameters} options.parameters - Additional parameters for pre-join page actions.
 * @param {JoinRoomOnMediaSFUType} options.joinMediaSFURoom - The function to join a room on MediaSFU.
 * @param {string} options.localLink - The local link to use for Community Edition.
 *
 * @returns {Promise<void>} A promise that resolves when the actions are complete.
 *
 * @example
 * ```typescript
 * const options = {
 *   data: {
 *     mediasfuURL: "https://example.com/meet/room123/secret",
 *     allowRecord: true,
 *     apiKey: "1234567890123456789012345678901234567890123456789012345678901234",
 *     apiUserName: "user123",
 *   },
 *   member: "user123",
 *   roomName: "s12345678",
 *   islevel: "1",
 *   socket: socketInstance,
 *   parameters: {
 *     someParameter: "value",
 *   },
 *   joinMediaSFURoom: joinRoomOnMediaSFU,
 *   localLink: "https://socketserver.example.com",
 * };
 *
 * try {
 *   await checkMediasfuURL(options);
 *   console.log("MediaSFU URL processed successfully.");
 * } catch (error) {
 *   console.error("Failed to process MediaSFU URL:", error);
 * }
 * ```
 */
export declare class JoinLocalRoom {
    private validateAlphanumericService;
    private checkLimitsService;
    private joinRoomOnMediaSFU;
    constructor(validateAlphanumericService: ValidateAlphanumeric, checkLimitsService: CheckLimitsAndMakeRequest, joinRoomOnMediaSFU: JoinRoomOnMediaSFU);
    /**
     * Checks the MediaSFU URL and processes the necessary actions based on the URL's validity.
     *
     * @param {CheckMediasfuURLOptions} options - The options for checking and handling the MediaSFU URL.
     * @param {ResponseJoinLocalRoom} options.data - The data received from the room join response.
     * @param {string} options.member - The member identifier.
     * @param {string} options.roomName - The name of the room to join.
     * @param {string} options.islevel - The level of the user.
     * @param {Socket} options.socket - The socket instance to use for communication.
     * @param {PreJoinPageParameters} options.parameters - Additional parameters for pre-join page actions.
     * @param {JoinRoomOnMediaSFUType} options.joinMediaSFURoom - The function to join a room on MediaSFU.
     * @param {string} options.localLink - The local link to use for Community Edition.
     *
     * @returns {Promise<void>} A promise that resolves when the actions are complete.
     *
     * @example
     * ```typescript
     * const options = {
     *   data: {
     *     mediasfuURL: "https://example.com/meet/room123/secret",
     *     allowRecord: true,
     *     apiKey: "1234567890123456789012345678901234567890123456789012345678901234",
     *     apiUserName: "user123",
     *   },
     *   member: "user123",
     *   roomName: "s12345678",
     *   islevel: "1",
     *   socket: socketInstance,
     *   parameters: {
     *     someParameter: "value",
     *   },
     *   joinMediaSFURoom: joinRoomOnMediaSFU,
     *   localLink: "https://socketserver.example.com",
     * };
     *
     * try {
     *   await checkMediasfuURL(options);
     *   console.log("MediaSFU URL processed successfully.");
     * } catch (error) {
     *   console.error("Failed to process MediaSFU URL:", error);
     * }
     * ```
     */
    joinLocalRoom(options: JoinLocalRoomOptions): Promise<ResponseJoinLocalRoom>;
    /**
     * Checks the MediaSFU URL and processes necessary actions based on its validity.
     *
     * @param {Object} options - Contains:
     *   - `data`: Data received from the room join response.
     *   - `member`: User identifier.
     *   - `roomName`: Name of the room to join.
     *   - `islevel`: User's level indicator.
     *   - `socket`: Socket instance for communication.
     *   - `parameters`: Additional parameters for pre-join page actions.
     *   - `joinMediaSFURoom`: Function to join a room on MediaSFU.
     *   - `localLink`: Local link to use for Community Edition.
     */
    private checkMediasfuURL;
    static ɵfac: i0.ɵɵFactoryDeclaration<JoinLocalRoom, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<JoinLocalRoom>;
}
