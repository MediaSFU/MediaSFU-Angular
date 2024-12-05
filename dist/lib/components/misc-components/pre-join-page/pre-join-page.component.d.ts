import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Socket } from 'socket.io-client';
import { ConnectSocketType, ShowAlert, ConnectLocalSocketType, ResponseLocalConnectionData, RecordingParams, MeetingRoomParams } from '../../../@types/types';
import { CheckLimitsAndMakeRequest } from '../../../methods/utils/check-limits-and-make-request.service';
import { CreateRoomOnMediaSFU } from '../../../methods/utils/create-room-on-media-sfu.service';
import { JoinRoomOnMediaSFU } from '../../../methods/utils/join-room-on-media-sfu.service';
import * as i0 from "@angular/core";
export interface JoinLocalEventRoomParameters {
    eventID: string;
    userName: string;
    secureCode?: string;
    videoPreference?: string | null;
    audioPreference?: string | null;
    audioOutputPreference?: string | null;
}
export interface JoinLocalEventRoomOptions {
    joinData: JoinLocalEventRoomParameters;
    link?: string;
}
export interface CreateLocalRoomParameters {
    eventID: string;
    duration: number;
    capacity: number;
    userName: string;
    scheduledDate: Date;
    secureCode: string;
    waitRoom?: boolean;
    recordingParams?: RecordingParams;
    eventRoomParams?: MeetingRoomParams;
    videoPreference?: string | null;
    audioPreference?: string | null;
    audioOutputPreference?: string | null;
    mediasfuURL?: string;
}
export interface CreateLocalRoomOptions {
    createData: CreateLocalRoomParameters;
    link?: string;
}
export interface CreateJoinLocalRoomResponse {
    success: boolean;
    secret: string;
    reason?: string;
    url?: string;
}
export interface PreJoinPageParameters {
    imgSrc?: string;
    showAlert?: ShowAlert;
    updateIsLoadingModalVisible: (visible: boolean) => void;
    connectSocket: ConnectSocketType;
    connectLocalSocket?: ConnectLocalSocketType;
    updateSocket: (socket: Socket) => void;
    updateLocalSocket?: (socket: Socket) => void;
    updateValidated: (validated: boolean) => void;
    updateApiUserName: (userName: string) => void;
    updateApiToken: (token: string) => void;
    updateLink: (link: string) => void;
    updateRoomName: (roomName: string) => void;
    updateMember: (member: string) => void;
}
export interface Credentials {
    apiUserName: string;
    apiKey: string;
}
export interface PreJoinPageOptions {
    localLink?: string;
    connectMediaSFU?: boolean;
    parameters: PreJoinPageParameters;
    credentials?: Credentials;
}
export type PreJoinPageType = (options: PreJoinPageOptions) => HTMLElement;
/**
 * @fileoverview PreJoinPage component for handling room creation and joining on MediaSFU.
 *
 * @component
 * @selector app-pre-join-page
 * @standalone true
 * @templateUrl ./pre-join-page.component.html
 * @styleUrls ./pre-join-page.component.css
 * @imports [CommonModule, ReactiveFormsModule]
 *
 * @description
 * This component provides functionality for users to create or join a room on MediaSFU.
 * It includes form validation, error handling, and API requests to the MediaSFU service.
 *
 * @property {any} parameters - Input parameters for the component.
 * @property {Object} credentials - API credentials for MediaSFU.
 * @property {string} credentials.apiUserName - API username.
 * @property {string} credentials.apiKey - API key.
 * @property {boolean} isCreateMode - Flag to toggle between create and join modes.
 * @property {FormGroup} preJoinForm - Form group for pre-join form.
 * @property {string} error - Error message to display.
 *
 * @constructor
 * @param {FormBuilder} fb - FormBuilder service for creating form groups.
 * @param {HttpClient} http - HttpClient service for making HTTP requests.
 * @param {CookieService} cookieService - CookieService for managing cookies.
 *
 * @method ngOnInit
 * @description Lifecycle hook that is called after data-bound properties are initialized.
 *
 * @method toggleMode
 * @description Toggles between create and join modes and resets the error message.
 *
 * @method handleCreateRoom
 * @description Handles the creation of a room on MediaSFU. Validates form inputs, sends a request to create a room, and handles the response.
 *
 * @method handleJoinRoom
 * @description Handles joining a room on MediaSFU. Validates form inputs, sends a request to join a room, and handles the response.
 *
 * @method checkLimitsAndMakeRequest
 * @description Checks rate limits and makes a request to connect to a room. Handles unsuccessful attempts and updates the state accordingly.
 *
 * @method createRoomOnMediaSFU
 * @description Sends a request to create a room on MediaSFU.
 * @param {Object} params - Parameters for the request.
 * @param {any} params.payload - Payload for the request.
 * @param {string} params.apiUserName - API username.
 * @param {string} params.apiKey - API key.
 * @returns {Promise<{ data: CreateJoinRoomResponse | CreateJoinRoomError | null; success: boolean }>} Response from the API.
 *
 * @method joinRoomOnMediaSFU
 * @description Sends a request to join a room on MediaSFU.
 * @param {Object} params - Parameters for the request.
 * @param {any} params.payload - Payload for the request.
 * @param {string} params.apiUserName - API username.
 * @param {string} params.apiKey - API key.
 * @returns {Promise<{ data: CreateJoinRoomResponse | CreateJoinRoomError | null; success: boolean }>} Response from the API.
 *
 * @example
 * ```html
 * <app-pre-join-page
 *   [parameters]="preJoinPageParameters"
 *   [credentials]="{ apiUserName: 'username', apiKey: 'apiKey' }"
 *   [localLink]="'http://localhost:3000'"
 *   [connectMediaSFU]="false"
 * ></app-pre-join-page>
 * ```
 */
export declare class PreJoinPage implements OnInit {
    private fb;
    private checkLimitsService;
    private createRoomService;
    private joinRoomService;
    parameters: PreJoinPageParameters;
    credentials: Credentials;
    localLink: string | undefined;
    connectMediaSFU: boolean | undefined;
    isCreateMode: boolean;
    preJoinForm: FormGroup;
    error: string;
    imgSrc: string;
    localConnected: boolean;
    localData: ResponseLocalConnectionData | undefined;
    initSocket: Socket | undefined;
    constructor(fb: FormBuilder, injectedParameters: PreJoinPageParameters, injectedCredentials: Credentials, injectedLocalLink: string, injectedConnectMediaSFU: boolean, checkLimitsService: CheckLimitsAndMakeRequest, createRoomService: CreateRoomOnMediaSFU, joinRoomService: JoinRoomOnMediaSFU);
    ngOnInit(): void;
    private connectLocalSocket;
    toggleMode(): void;
    joinLocalRoom(options: JoinLocalEventRoomOptions): Promise<void>;
    createLocalRoom(options: CreateLocalRoomOptions): Promise<void>;
    roomCreator(options: {
        payload: any;
        apiUserName: string;
        apiKey: string;
        validate?: boolean;
    }): Promise<any>;
    handleCreateRoom(): Promise<void>;
    handleJoinRoom(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PreJoinPage, [null, { optional: true; }, { optional: true; }, { optional: true; }, { optional: true; }, null, null, null]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PreJoinPage, "app-pre-join-page", never, { "parameters": { "alias": "parameters"; "required": false; }; "credentials": { "alias": "credentials"; "required": false; }; "localLink": { "alias": "localLink"; "required": false; }; "connectMediaSFU": { "alias": "connectMediaSFU"; "required": false; }; }, {}, never, never, true, never>;
}
