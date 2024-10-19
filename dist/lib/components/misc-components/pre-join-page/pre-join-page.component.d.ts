import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'socket.io-client';
import { ConnectSocketType } from '../../../sockets/socket-manager.service';
import { ShowAlert } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface PreJoinPageParameters {
    imgSrc?: string;
    showAlert?: ShowAlert;
    updateIsLoadingModalVisible: (visible: boolean) => void;
    connectSocket: ConnectSocketType;
    updateSocket: (socket: Socket) => void;
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
    parameters: PreJoinPageParameters;
    credentials?: Credentials;
}
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
export type PreJoinPageType = (options: PreJoinPageOptions) => void;
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
 */
export declare class PreJoinPage {
    private fb;
    private http;
    private cookieService;
    parameters: PreJoinPageParameters;
    credentials: {
        apiUserName: string;
        apiKey: string;
    };
    isCreateMode: boolean;
    preJoinForm: FormGroup;
    error: string;
    imgSrc: string;
    constructor(fb: FormBuilder, http: HttpClient, cookieService: CookieService, injectedParameters: PreJoinPageParameters, injectedCredentials: Credentials);
    toggleMode(): void;
    handleCreateRoom(): Promise<void>;
    handleJoinRoom(): Promise<void>;
    checkLimitsAndMakeRequest({ apiUserName, apiToken, link, apiKey, userName, }: {
        apiUserName: string;
        apiToken: string;
        link: string;
        apiKey?: string;
        userName: string;
    }): Promise<void>;
    createRoomOnMediaSFU({ payload, apiUserName, apiKey, }: {
        payload: any;
        apiUserName: string;
        apiKey: string;
    }): Promise<{
        data: CreateJoinRoomResponse | CreateJoinRoomError | null;
        success: boolean;
    }>;
    joinRoomOnMediaSFU({ payload, apiUserName, apiKey, }: {
        payload: any;
        apiUserName: string;
        apiKey: string;
    }): Promise<{
        data: CreateJoinRoomResponse | CreateJoinRoomError | null;
        success: boolean;
    }>;
    static ɵfac: i0.ɵɵFactoryDeclaration<PreJoinPage, [null, null, null, { optional: true; }, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<PreJoinPage, "app-pre-join-page", never, { "parameters": { "alias": "parameters"; "required": false; }; "credentials": { "alias": "credentials"; "required": false; }; }, {}, never, never, true, never>;
}
