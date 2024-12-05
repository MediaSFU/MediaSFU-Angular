import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Socket } from 'socket.io-client';
import {
  ConnectSocketType, ShowAlert,
  ConnectLocalSocketType, ResponseLocalConnection,
  ResponseLocalConnectionData, RecordingParams, MeetingRoomParams
} from '../../../@types/types';
import { CheckLimitsAndMakeRequest } from '../../../methods/utils/check-limits-and-make-request.service';
import { CreateRoomOnMediaSFU } from '../../../methods/utils/create-room-on-media-sfu.service';
import { JoinRoomOnMediaSFU } from '../../../methods/utils/join-room-on-media-sfu.service';

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

// Type definitions for parameters and credentials
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

@Component({
  selector: 'app-pre-join-page',
  templateUrl: './pre-join-page.component.html',
  styleUrls: ['./pre-join-page.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class PreJoinPage implements OnInit {
  @Input() parameters: PreJoinPageParameters = {} as PreJoinPageParameters;
  @Input() credentials: Credentials = { apiUserName: 'yourAPIUSERNAME', apiKey: 'yourAPIKEY' };
  @Input() localLink: string | undefined = "";
  @Input() connectMediaSFU: boolean | undefined = true;

  isCreateMode = false;
  preJoinForm: FormGroup;
  error = '';

  imgSrc: string = this.parameters.imgSrc || '';

  localConnected = false;
  localData: ResponseLocalConnectionData | undefined = undefined;
  initSocket: Socket | undefined = undefined;

  constructor(
    private fb: FormBuilder,
    @Optional() @Inject('parameters') injectedParameters: PreJoinPageParameters,
    @Optional() @Inject('credentials') injectedCredentials: Credentials,
    @Optional() @Inject('localLink') injectedLocalLink: string,
    @Optional() @Inject('connectMediaSFU') injectedConnectMediaSFU: boolean,
    private checkLimitsService: CheckLimitsAndMakeRequest,
    private createRoomService: CreateRoomOnMediaSFU,
    private joinRoomService: JoinRoomOnMediaSFU
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
    this.localLink = injectedLocalLink || this.localLink;
    this.connectMediaSFU = injectedConnectMediaSFU !== undefined ? injectedConnectMediaSFU : this.connectMediaSFU;

  }

  ngOnInit(): void {
    if (this.localLink && !this.localConnected && !this.initSocket) {
      this.connectLocalSocket();
    }
  }

  private async connectLocalSocket(): Promise<void> {
    try {
      const response = await this.parameters.connectLocalSocket?.({ link: this.localLink! }) as ResponseLocalConnection;
      if (response) {
        this.localData = response.data;
        this.initSocket = response.socket;
        this.localConnected = true;
      }
    } catch (error: any) {
      this.parameters.showAlert?.({
        message: `Unable to connect to ${this.localLink}. ${error}`,
        type: 'danger',
        duration: 3000,
      });
    }
  }

  toggleMode(): void {
    this.isCreateMode = !this.isCreateMode;
    this.error = '';
  }

  async joinLocalRoom(options: JoinLocalEventRoomOptions): Promise<void> {
    this.initSocket?.emit('joinEventRoom', options.joinData, (response: CreateJoinLocalRoomResponse) => {
      if (response.success) {
        this.parameters.updateSocket(this.initSocket!);
        this.parameters.updateApiUserName(this.localData?.apiUserName || '');
        this.parameters.updateApiToken(response.secret);
        this.parameters.updateLink(options.link || '');
        this.parameters.updateRoomName(options.joinData.eventID);
        this.parameters.updateMember(options.joinData.userName);
        this.parameters.updateIsLoadingModalVisible(false);
        this.parameters.updateValidated(true);
      } else {
        this.parameters.updateIsLoadingModalVisible(false);
        this.error = `Unable to join room. ${response.reason}`;
      }
    });
  }

  async createLocalRoom(options: CreateLocalRoomOptions): Promise<void> {
    this.initSocket?.emit('createRoom', options.createData, (response: CreateJoinLocalRoomResponse) => {
      if (response.success) {
        this.parameters.updateSocket(this.initSocket!);
        this.parameters.updateApiUserName(this.localData?.apiUserName || '');
        this.parameters.updateApiToken(response.secret);
        this.parameters.updateLink(options.link || '');
        this.parameters.updateRoomName(options.createData.eventID);
        // Update member as `userName` + "_2" to split in the room
        this.parameters.updateMember(`${options.createData.userName}_2`);
        this.parameters.updateIsLoadingModalVisible(false);
        this.parameters.updateValidated(true);
      } else {
        this.parameters.updateIsLoadingModalVisible(false);
        this.error = `Unable to create room. ${response.reason}`;
      }
    });
  }

  async roomCreator(options: { payload: any; apiUserName: string; apiKey: string; validate?: boolean }): Promise<any> {
    const { payload, apiUserName, apiKey, validate = true } = options;
    const response = await this.createRoomService.createRoomOnMediaSFU({
      payload,
      apiUserName,
      apiKey,
    });

    if (response.success && response.data && 'roomName' in response.data) {
      await this.checkLimitsService.checkLimitsAndMakeRequest({
        apiUserName: response.data.roomName,
        apiToken: response.data.secret,
        link: response.data.link,
        userName: payload.userName,
        parameters: this.parameters,
        validate: validate,
      });
      return response;
    } else {
      this.parameters.updateIsLoadingModalVisible(false);
      this.error = `Unable to create room. ${
        response.data
          ? 'error' in response.data
            ? response.data.error
            : ''
          : ''
      }`;
    }
  }

  async handleCreateRoom(): Promise<void> {

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
      recordOnly: false,
    };

    this.parameters.updateIsLoadingModalVisible(true);

    if (this.localLink) {
      const secureCode =
        Math.random().toString(30).substring(2, 14) +
        Math.random().toString(30).substring(2, 14);
      let eventID =
        new Date().getTime().toString(30) +
        new Date().getUTCMilliseconds() +
        Math.floor(10 + Math.random() * 99).toString();
      eventID = 'm' + eventID;
      const eventRoomParams = this.localData?.meetingRoomParams_;
      eventRoomParams!.type = eventType as 'chat' | 'broadcast' | 'webinar' | 'conference';

      const createData: CreateLocalRoomParameters = {
        eventID: eventID,
        duration: parseInt(duration, 10),
        capacity: parseInt(capacity, 10),
        userName: name,
        scheduledDate: new Date(),
        secureCode: secureCode,
        waitRoom: false,
        recordingParams: this.localData?.recordingParams_,
        eventRoomParams: eventRoomParams,
        videoPreference: null,
        audioPreference: null,
        audioOutputPreference: null,
        mediasfuURL: '',
      };

      if (
        this.connectMediaSFU &&
        this.initSocket &&
        this.localData &&
        this.localData.apiUserName &&
        this.localData.apiKey
      ) {
        payload.recordOnly = true; // allow production to MediaSFU only; no consumption
        const response = await this.roomCreator({
          payload,
          apiUserName: this.localData.apiUserName,
          apiKey: this.localData.apiKey,
          validate: false,
        });

        if (response && response.success && response.data && 'roomName' in response.data) {
          createData.eventID = response.data.roomName;
          createData.secureCode = response.data.secret;
          createData.mediasfuURL = response.data.publicURL;
          await this.createLocalRoom({ createData: createData, link: response.data.link });
        } else {
          this.parameters.updateIsLoadingModalVisible(false);
          this.error = 'Unable to create room on MediaSFU.';
          try {
            this.parameters.updateSocket(this.initSocket!);
            await this.createLocalRoom({ createData: createData });
          } catch (error: any) {
            this.parameters.updateIsLoadingModalVisible(false);
            this.error = `Unable to create room. ${error}`;
          }
        }
      } else {
        try {
          this.parameters.updateSocket(this.initSocket!);
          await this.createLocalRoom({ createData: createData });
        } catch (error: any) {
          this.parameters.updateIsLoadingModalVisible(false);
          this.error = `Unable to create room. ${error}`;
        }
      }
    } else {
      await this.roomCreator({
        payload,
        apiUserName: this.credentials.apiUserName,
        apiKey: this.credentials.apiKey,
        validate: true,
      });
    }
  }

  async handleJoinRoom(): Promise<void> {
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

    if (this.localLink && !this.localLink.includes('mediasfu.com')) {
      const joinData = {
        eventID: eventID,
        userName: name,
        secureCode: '',
        videoPreference: null,
        audioPreference: null,
        audioOutputPreference: null,
      };

      await this.joinLocalRoom({ joinData: joinData });
      return;
    }

    this.parameters.updateIsLoadingModalVisible(true);
    try {
    const response = await this.joinRoomService.joinRoomOnMediaSFU({
      payload,
      apiUserName: this.credentials.apiUserName,
      apiKey: this.credentials.apiKey,
    });

    if (response.success && response.data && 'roomName' in response.data) {
      await this.checkLimitsService.checkLimitsAndMakeRequest({
        apiUserName: response.data.roomName,
        apiToken: response.data.secret,
        link: response.data.link,
        userName: name,
        parameters: this.parameters,
        validate: true,
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
}
