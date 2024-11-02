import { Component, Inject, Input, Optional } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { Socket } from 'socket.io-client';
import { ConnectSocketType } from '../../../sockets/socket-manager.service';
import { ShowAlert } from '../../../@types/types';

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

const MAX_ATTEMPTS = 20; // Maximum number of unsuccessful attempts before rate limiting
const RATE_LIMIT_DURATION = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
const TIMEOUT_DURATION = 10000; // 5 seconds in milliseconds

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
 * ></app-pre-join-page>
 * ```
 */
@Component({
  selector: 'app-pre-join-page',
  standalone: true,
  templateUrl: './pre-join-page.component.html',
  styleUrls: ['./pre-join-page.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class PreJoinPage {
  @Input() parameters: PreJoinPageParameters = {} as PreJoinPageParameters;
  @Input() credentials = { apiUserName: 'yourAPIUSERNAME', apiKey: 'yourAPIKEY' };

  isCreateMode = false;
  preJoinForm: FormGroup;
  error = '';
  imgSrc: string = this.parameters.imgSrc || '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cookieService: CookieService,
    @Optional() @Inject('parameters') injectedParameters: PreJoinPageParameters,
    @Optional() @Inject('credentials') injectedCredentials: Credentials,
  ) {
    this.preJoinForm = this.fb.group({
      name: ['', Validators.required],
      duration: [''],
      eventType: [''],
      capacity: [''],
      eventID: [''],
    });
    this.parameters = injectedParameters || this.parameters;
    this.credentials = injectedCredentials || this.credentials;
  }

  toggleMode() {
    this.isCreateMode = !this.isCreateMode;
    this.error = '';
  }

  async handleCreateRoom() {
    if (this.preJoinForm.invalid) {
      this.error = 'Please fill all the fields.';
      return;
    }

    const { name, duration, eventType, capacity } = this.preJoinForm.value;

    if (!name || !duration || !eventType || !capacity) {
      this.error = 'Please fill all the fields.';
      return;
    }

    const payload = {
      action: 'create',
      duration: parseInt(duration),
      capacity: parseInt(capacity),
      eventType,
      userName: name,
    };

    this.parameters.updateIsLoadingModalVisible(true);

    try {
      const response = await this.createRoomOnMediaSFU({
        payload,
        apiUserName: this.credentials.apiUserName,
        apiKey: this.credentials.apiKey,
      });

      if (response.success && response.data && 'roomName' in response.data) {
        await this.checkLimitsAndMakeRequest({
          apiUserName: response.data.roomName,
          apiToken: response.data.secret,
          link: response.data.link,
          userName: name,
        });
        this.error = '';
      } else {
        this.parameters.updateIsLoadingModalVisible(false);
        this.error = `${
          response.data ? ('error' in response.data ? response.data.error : '') : ''
        }`;
      }
    } catch (error) {
      this.parameters.updateIsLoadingModalVisible(false);
      this.error = `Unable to connect. ${(error as any).message}`;
    }
  }

  async handleJoinRoom() {
    if (this.preJoinForm.invalid) {
      this.error = 'Please fill all the fields.';
      return;
    }

    const { name, eventID } = this.preJoinForm.value;

    if (!name || !eventID) {
      this.error = 'Please fill all the fields.';
      return;
    }

    const payload = {
      action: 'join',
      meetingID: eventID,
      userName: name,
    };

    this.parameters.updateIsLoadingModalVisible(true);

    try {
      const response = await this.joinRoomOnMediaSFU({
        payload,
        apiUserName: this.credentials.apiUserName,
        apiKey: this.credentials.apiKey,
      });

      if (response.success && response.data && 'roomName' in response.data) {
        await this.checkLimitsAndMakeRequest({
          apiUserName: response.data.roomName,
          apiToken: response.data.secret,
          link: response.data.link,
          userName: name,
        });
        this.error = '';
      } else {
        this.parameters.updateIsLoadingModalVisible(false);
        this.error = `Unable to connect to room. ${
          response.data ? ('error' in response.data ? response.data.error : '') : ''
        }`;
      }
    } catch (error) {
      this.parameters.updateIsLoadingModalVisible(false);
      this.error = `Unable to connect. ${(error as any).message}`;
    }
  }

  async checkLimitsAndMakeRequest({
    apiUserName,
    apiToken,
    link,
    apiKey = '',
    userName,
  }: {
    apiUserName: string;
    apiToken: string;
    link: string;
    apiKey?: string;
    userName: string;
  }) {
    let unsuccessfulAttempts = parseInt(this.cookieService.get('unsuccessfulAttempts')) || 0;
    let lastRequestTimestamp = parseInt(this.cookieService.get('lastRequestTimestamp')) || 0;

    if (unsuccessfulAttempts >= MAX_ATTEMPTS) {
      if (Date.now() - lastRequestTimestamp < RATE_LIMIT_DURATION) {
        this.parameters.showAlert?.({
          message: 'Too many unsuccessful attempts. Please try again later.',
          type: 'danger',
          duration: 3000,
        });
        this.cookieService.set('lastRequestTimestamp', Date.now().toString());
        return;
      } else {
        unsuccessfulAttempts = 0;
        this.cookieService.set('unsuccessfulAttempts', unsuccessfulAttempts.toString());
        this.cookieService.set('lastRequestTimestamp', Date.now().toString());
      }
    }

    try {
      this.parameters.updateIsLoadingModalVisible(true);

      const socketPromise = await this.parameters.connectSocket({
        apiUserName,
        apiKey,
        apiToken,
        link,
      });

      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), TIMEOUT_DURATION),
      );

      const socket = await Promise.race([socketPromise, timeoutPromise]);

      if (socket && socket instanceof Socket && socket.id) {
        unsuccessfulAttempts = 0;
        this.cookieService.set('unsuccessfulAttempts', unsuccessfulAttempts.toString());
        this.cookieService.set('lastRequestTimestamp', Date.now().toString());
        this.parameters.updateSocket(socket);
        this.parameters.updateApiUserName(apiUserName);
        this.parameters.updateApiToken(apiToken);
        this.parameters.updateLink(link);
        this.parameters.updateRoomName(apiUserName);
        this.parameters.updateMember(userName);
        this.parameters.updateValidated(true);
      } else {
        unsuccessfulAttempts += 1;
        this.cookieService.set('unsuccessfulAttempts', unsuccessfulAttempts.toString());
        this.cookieService.set('lastRequestTimestamp', Date.now().toString());
        this.parameters.updateIsLoadingModalVisible(false);

        if (unsuccessfulAttempts >= MAX_ATTEMPTS) {
          this.parameters.showAlert?.({
            message: 'Too many unsuccessful attempts. Please try again later.',
            type: 'danger',
            duration: 3000,
          });
        } else {
          this.parameters.showAlert?.({
            message: 'Invalid credentials.',
            type: 'danger',
            duration: 3000,
          });
        }
      }
    } catch (error) {
      this.parameters.showAlert?.({
        message: 'Unable to connect. Check your credentials and try again.',
        type: 'danger',
        duration: 3000,
      });

      unsuccessfulAttempts += 1;
      this.cookieService.set('unsuccessfulAttempts', unsuccessfulAttempts.toString());
      this.cookieService.set('lastRequestTimestamp', Date.now().toString());
      this.parameters.updateIsLoadingModalVisible(false);
    }
  }

  async createRoomOnMediaSFU({
    payload,
    apiUserName,
    apiKey,
  }: {
    payload: any;
    apiUserName: string;
    apiKey: string;
  }): Promise<{ data: CreateJoinRoomResponse | CreateJoinRoomError | null; success: boolean }> {
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

      const response = await this.http
        .post<any>('https://mediasfu.com/v1/rooms/', payload, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiUserName}:${apiKey}`,
          }),
        })
        .toPromise();

      return { data: response, success: true };
    } catch (error) {
      const errorMessage = (error as any).reason ? (error as any).reason : 'unknown error';
      return {
        data: { error: `Unable to create room; something went wrong ${errorMessage}` },
        success: false,
      };
    }
  }

  async joinRoomOnMediaSFU({
    payload,
    apiUserName,
    apiKey,
  }: {
    payload: any;
    apiUserName: string;
    apiKey: string;
  }): Promise<{ data: CreateJoinRoomResponse | CreateJoinRoomError | null; success: boolean }> {
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

      const response = await this.http
        .post<any>('https://mediasfu.com/v1/rooms/', payload, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${apiUserName}:${apiKey}`,
          }),
        })
        .toPromise();

      return { data: response, success: true };
    } catch (error) {
      const errorMessage = (error as any).reason ? (error as any).reason : 'unknown error';
      return {
        data: { error: `Unable to join room; something went wrong ${errorMessage}` },
        success: false,
      };
    }
  }
}
