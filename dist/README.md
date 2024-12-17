<p align="center">
  <img src="https://www.mediasfu.com/logo192.png" width="100" alt="MediaSFU Logo">
</p>

<p align="center">
  <a href="https://twitter.com/media_sfu">
    <img src="https://img.icons8.com/color/48/000000/twitter--v1.png" alt="Twitter" style="margin-right: 10px;">
  </a>
  <a href="https://www.mediasfu.com/forums">
    <img src="https://img.icons8.com/color/48/000000/communication--v1.png" alt="Community Forum" style="margin-right: 10px;">
  </a>
  <a href="https://github.com/MediaSFU">
    <img src="https://img.icons8.com/fluent/48/000000/github.png" alt="Github" style="margin-right: 10px;">
  </a>
  <a href="https://www.mediasfu.com/">
    <img src="https://img.icons8.com/color/48/000000/domain--v1.png" alt="Website" style="margin-right: 10px;">
  </a>
  <a href="https://www.youtube.com/channel/UCELghZRPKMgjih5qrmXLtqw">
    <img src="https://img.icons8.com/color/48/000000/youtube--v1.png" alt="Youtube" style="margin-right: 10px;">
  </a>
</p>


MediaSFU offers a cutting-edge streaming experience that empowers users to customize their recordings and engage their audience with high-quality streams. Whether you're a content creator, educator, or business professional, MediaSFU provides the tools you need to elevate your streaming game.

<div style="text-align: center;">

<img src="https://mediasfu.com/images/header_1.jpg" alt="Preview Page" title="Preview Page" style="max-height: 600px;">

</div>

---

# MediaSFU Angular Module Documentation

## Unlock the Power of MediaSFU Community Edition  

**MediaSFU Community Edition is free and open-source**—perfect for developers who want to run their own media server without upfront costs. With robust features and simple setup, you can launch your media solution in minutes. **Ready to scale?** Upgrade seamlessly to **MediaSFU Cloud** for enterprise-grade performance and global scalability.  

**[Get started now on GitHub!](https://github.com/MediaSFU/MediaSFUOpen)** 

---

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Basic Usage Guide](#basic-usage-guide)
- [Intermediate Usage Guide](#intermediate-usage-guide)
- [Advanced Usage Guide](#advanced-usage-guide)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

# Features <a name="features"></a>

MediaSFU's Angular SDK comes with a host of powerful features out of the box:

1. **Screen Sharing with Annotation Support**: Share your screen with participants and annotate in real-time for enhanced presentations and collaborations.
2. **Collaborative Whiteboards**: Create and share whiteboards for real-time collaborative drawing and brainstorming sessions.
3. **Breakout Rooms**: Create multiple sub-meetings within a single session to enhance collaboration and focus.
4. **Pagination**: Efficiently handle large participant lists with seamless pagination.
5. **Polls**: Conduct real-time polls to gather instant feedback from participants.
6. **Media Access Requests Management**: Manage media access requests with ease to ensure smooth operations.
7. **Video Effects**: Apply various video effects, including virtual backgrounds, to enhance the visual experience.
8. **Chat (Direct & Group)**: Facilitate communication with direct and group chat options.
9. **Cloud Recording (track-based)**: Customize recordings with track-based options, including watermarks, name tags, background colors, and more.
10. **Managed Events**: Manage events with features to handle abandoned and inactive participants, as well as enforce time and capacity limits.

# Getting Started <a name="getting-started"></a>

This section will guide users through the initial setup and installation of the npm module.

### Documentation Reference

For comprehensive documentation on the available methods, components, and functions, please visit [mediasfu.com](https://www.mediasfu.com/angular/). This resource provides detailed information for this guide and additional documentation.


## Installation

Instructions on how to install the module using npm.

### 1. **Add the package to your project**

    ```bash
    npm install mediasfu-angular
    ```

### 2. **Bootstrap Integration**

    The `mediasfu-angular` package requires Bootstrap for styling. Bootstrap is included by default with the package, so you do not need to install it separately. Ensure that Bootstrap's CSS is correctly added to your project's styles.

    1. **Check `angular.json`:**

      Ensure that `node_modules/bootstrap/dist/css/bootstrap.min.css` is listed in the `styles` array of your Angular application's build options.

      ```json
      {
        "projects": {
          "your-app-name": {
            "architect": {
              "build": {
                "options": {
                  "styles": [
                    "node_modules/bootstrap/dist/css/bootstrap.min.css",
                    "src/styles.css"
                  ],
                  // ... other configurations
                }
              }
            }
          }
        }
      }
      ```

   **Note:** The `mediasfu-angular` package should handle the Bootstrap's package installation automatically. If it's not present, you may need to add it manually install Bootstrap.


### 3. **Configure MediaSFU's PreJoinPage Requirements**

    If you intend to use MediaSFU's `PreJoinPage` component, additional configuration is required. You need to provide the `HttpClient` and `CookieService` providers in your application's configuration. These packages should have been installed by default as well else add manually. 

    #### Update `app.config.ts`

    Add the necessary providers to your `app.config.ts` file. Below is an example configuration:

    ```typescript
    // app.config.ts
    import { ApplicationConfig } from '@angular/core';
    import { provideZoneChangeDetection } from '@angular/core';
    import { provideClientHydration } from '@angular/platform-browser';
    import { provideHttpClient } from '@angular/common/http';
    import { CookieService } from 'ngx-cookie-service';

    export const appConfig: ApplicationConfig = {
      providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideClientHydration(),
        provideHttpClient(),
        CookieService
      ],
    };

    ```

### 4. Obtain an API Key (If Required) 
   You can get your API key by signing up or logging into your account at [mediasfu.com](https://www.mediasfu.com/).

  <div style="background-color:#f0f0f0; padding: 10px; border-radius: 5px;">
      <h4 style="color:#d9534f;">Important:</h4>
      <p style="font-size: 1.2em; color: black;">You must obtain an API key from <a href="https://www.mediasfu.com/">mediasfu.com</a> to use this package with MediaSFU Cloud. You do not need the API Key if self-hosting.</p>
    </div>

## **Self-Hosting MediaSFU**  

If you plan to self-host MediaSFU or use it without MediaSFU Cloud services, you don't need an API key. You can access the open-source version of MediaSFU from the [MediaSFU Open Repository](https://github.com/MediaSFU/MediaSFUOpen).  

This setup allows full flexibility and customization while bypassing the need for cloud-dependent credentials.  


# Basic Usage Guide <a name="basic-usage-guide"></a>

A basic guide on how to use the module for common tasks.

This section will guide users through the initial setup and installation of the npm module.
## Introduction

MediaSFU is a 2-page application consisting of a prejoin/welcome page and the main events room page. This guide will walk you through the basic usage of the module for setting up these pages.

### Documentation Reference

For comprehensive documentation on the available methods, components, and functions, please visit [mediasfu.com](https://www.mediasfu.com/angular/). This resource provides detailed information for this guide and additional documentation.

## Prebuilt Event Rooms

MediaSFU provides prebuilt event rooms for various purposes. These rooms are rendered as full pages and can be easily imported and used in your application. Here are the available prebuilt event rooms:

1. **MediasfuGeneric**: A generic event room suitable for various types of events.
2. **MediasfuBroadcast**: A room optimized for broadcasting events.
3. **MediasfuWebinar**: Specifically designed for hosting webinars.
4. **MediasfuConference**: Ideal for hosting conferences.
5. **MediasfuChat**: A room tailored for interactive chat sessions.

Users can easily pick an interface and render it in their app.

If no API credentials are provided, a default home page will be displayed where users can scan or manually enter the event details.

To use these prebuilt event rooms, simply import them into your application:

```javascript
## Simplest Usage

The simplest way to use MediaSFU in your Angular application is by directly rendering the prebuilt event room component, such as `MediasfuGeneric`.

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { MediasfuGeneric } from 'mediasfu-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MediasfuGeneric],
  template: `
    <app-mediasfu-generic></app-mediasfu-generic>
  `,
})
export class AppComponent { }
```

## Programmatically Fetching Tokens

If you prefer to fetch the required tokens programmatically without visiting MediaSFU's website, you can use the `PreJoinPage` component and pass your credentials as inputs.

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { MediasfuGeneric, PreJoinPage } from 'mediasfu-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MediasfuGeneric],
  template: `
    <div class="container">
      <app-mediasfu-generic
        [PrejoinPage]="PreJoinPage"
        [credentials]="credentials">
      </app-mediasfu-generic>
    </div>
  `,
})
export class AppComponent {
  // Reference to the PreJoinPage component
  PreJoinPage = PreJoinPage;

  // MediaSFU account credentials
  credentials = {
    apiUserName: 'yourAPIUserName',
    apiKey: 'yourAPIKey',
  };
}
```

<div style="text-align: center;">

### Preview of Welcome Page

<img src="https://mediasfu.com/images/prejoin.png" alt="Preview of Welcome Page" title="Welcome Page" style="max-height: 500px;">

<!-- Add a blank line for spacing -->
&nbsp;

### Preview of Prejoin Page

<img src="https://mediasfu.com/images/prejoin3.png" alt="Preview of Prejoin Page" title="Prejoin Page" style="max-height: 500px;">

</div>




## Custom Welcome/Prejoin Page

Alternatively, you can design your own welcome/prejoin page. The core function of this page is to fetch user tokens from MediaSFU's API and establish a connection with the returned link if valid.

### Parameters Passed to Custom Page

MediaSFU passes relevant parameters to the custom welcome/prejoin page:

```javascript
let { showAlert, updateIsLoadingModalVisible, connectSocket, updateSocket, updateValidated,
     updateApiUserName, updateApiToken, updateLink, updateRoomName, updateMember } = parameters;
```

Ensure that your custom page implements the following updates:

```javascript
updateSocket(socket);
updateApiUserName(apiUserName);
updateApiToken(apiToken);
updateLink(link);
updateRoomName(apiUserName);
updateMember(userName);
updateValidated(true);
```

See the following code for the PreJoinPage page logic:

```typescript
 import { Component, Inject, Input, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Socket } from 'socket.io-client';
import {
  ConnectSocketType, ShowAlert,
  ConnectLocalSocketType, ResponseLocalConnection,
  ResponseLocalConnectionData, RecordingParams, MeetingRoomParams,
  CreateMediaSFURoomOptions,JoinMediaSFURoomOptions,
} from '../../../@types/types';
import { CheckLimitsAndMakeRequest } from '../../../methods/utils/check-limits-and-make-request.service';
import { CreateRoomOnMediaSFU } from '../../../methods/utils/create-room-on-media-sfu.service';
import { CreateRoomOnMediaSFUType, JoinRoomOnMediaSFUType, JoinRoomOnMediaSFU } from '../../../methods/utils/join-room-on-media-sfu.service';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

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
  returnUI?: boolean;
  noUIPreJoinOptions?: CreateMediaSFURoomOptions | JoinMediaSFURoomOptions;
  createMediaSFURoom?: CreateRoomOnMediaSFUType;
  joinMediaSFURoom?: JoinRoomOnMediaSFUType;
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
  @Input() returnUI?: boolean;
  @Input() noUIPreJoinOptions?: CreateMediaSFURoomOptions | JoinMediaSFURoomOptions;
  @Input() createMediaSFURoom?: CreateRoomOnMediaSFUType;
  @Input() joinMediaSFURoom?: JoinRoomOnMediaSFUType;


  isCreateMode = false;
  preJoinForm: FormGroup;
  error = '';

  imgSrc: string = this.parameters.imgSrc || '';

  localConnected = false;
  localData: ResponseLocalConnectionData | undefined = undefined;
  initSocket: Socket | undefined = undefined;

  pending = new BehaviorSubject<boolean>(false);

  constructor(
    private fb: FormBuilder,
    @Optional() @Inject('parameters') injectedParameters: PreJoinPageParameters,
    @Optional() @Inject('credentials') injectedCredentials: Credentials,
    @Optional() @Inject('localLink') injectedLocalLink: string,
    @Optional() @Inject('connectMediaSFU') injectedConnectMediaSFU: boolean,
    @Optional() @Inject('returnUI') injectedReturnUI: boolean,
    @Optional() @Inject('noUIPreJoinOptions') injectedNoUIPreJoinOptions: CreateMediaSFURoomOptions | JoinMediaSFURoomOptions,
    @Optional() @Inject('createMediaSFURoom') injectedCreateMediaSFURoom: CreateRoomOnMediaSFUType,
    @Optional() @Inject('joinMediaSFURoom') injectedJoinMediaSFURoom: JoinRoomOnMediaSFUType,


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
    this.returnUI = injectedReturnUI !== undefined ? injectedReturnUI : this.returnUI;
    this.noUIPreJoinOptions = injectedNoUIPreJoinOptions || this.noUIPreJoinOptions;
    this.createMediaSFURoom = injectedCreateMediaSFURoom || this.createMediaSFURoom;
    this.joinMediaSFURoom = injectedJoinMediaSFURoom || this.joinMediaSFURoom;

  }

  ngOnInit(): void {
    // If we have a localLink and not connected yet, try to connect
    if (this.localLink && !this.localConnected && !this.initSocket) {
      this.connectLocalSocket().then(() => {
        this.checkProceed();
      });
    } else {
      // If no localLink or already connected, try to proceed
      this.checkProceed();
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

  private async checkProceed(): Promise<void> {
    // If we do not need to return UI and we have noUIPreJoinOptions, proceed like in the React code
    if (!this.returnUI && this.noUIPreJoinOptions) {
      if ('action' in this.noUIPreJoinOptions && this.noUIPreJoinOptions.action === 'create') {
        const createOptions = this.noUIPreJoinOptions as CreateMediaSFURoomOptions;
        if (!createOptions.userName || !createOptions.duration || !createOptions.eventType || !createOptions.capacity) {
          throw new Error('Please provide all the required parameters: userName, duration, eventType, capacity');
        }
        await this.handleCreateRoom();
      } else if ('action' in this.noUIPreJoinOptions && this.noUIPreJoinOptions.action === 'join') {
        const joinOptions = this.noUIPreJoinOptions as JoinMediaSFURoomOptions;
        if (!joinOptions.userName || !joinOptions.meetingID) {
          throw new Error('Please provide all the required parameters: userName, meetingID');
        }
        await this.handleJoinRoom();
      } else {
        throw new Error('Invalid options provided for creating/joining a room without UI.');
      }
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
    if (!this.createMediaSFURoom) {
      this.createMediaSFURoom = this.createRoomService.createRoomOnMediaSFU;
    }
    const response = await this.createMediaSFURoom({
      payload,
      apiUserName,
      apiKey,
      localLink: this.localLink,
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

    if (this.pending.value) {
      return;
    }
    this.pending.next(true);
    let payload = {} as CreateMediaSFURoomOptions;

    if (this.returnUI) {
        const { name, duration, eventType, capacity } = this.preJoinForm.value;

        if (!name || !duration || !eventType || !capacity) {
          this.error = 'Please fill all the fields.';
          return;
        }

        payload = {
          action: 'create',
          duration: parseInt(duration),
          capacity: parseInt(capacity),
          eventType,
          userName: name,
          recordOnly: false,
        };
      } else {
        if (this.noUIPreJoinOptions && 'action' in this.noUIPreJoinOptions && this.noUIPreJoinOptions.action === 'create') {
          payload = this.noUIPreJoinOptions as CreateMediaSFURoomOptions;
        } else {
          this.error = 'Invalid options provided for creating a room without UI.';
          this.pending.next(false);
          return;
        }
      }

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
      eventRoomParams!.type = payload.eventType as 'chat' | 'broadcast' | 'webinar' | 'conference';

      const createData: CreateLocalRoomParameters = {
        eventID: eventID,
        duration: payload.duration,
        capacity: payload.capacity,
        userName: payload.userName,
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
          createData.secureCode = response.data.secureCode;
          createData.mediasfuURL = response.data.publicURL;
          await this.createLocalRoom({ createData: createData, link: response.data.link });
        } else {
          this.pending.next(false);
          this.parameters.updateIsLoadingModalVisible(false);
          this.error = 'Unable to create room on MediaSFU.';
          try {
            this.parameters.updateSocket(this.initSocket!);
            await this.createLocalRoom({ createData: createData });
          } catch (error: any) {
            this.pending.next(false);
            this.parameters.updateIsLoadingModalVisible(false);
            this.error = `Unable to create room. ${error}`;
          }
        }
      } else {
        try {
          this.parameters.updateSocket(this.initSocket!);
          await this.createLocalRoom({ createData: createData });
        } catch (error: any) {
          this.pending.next(false);
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
      this.pending.next(false);
    }
  }

  async handleJoinRoom(): Promise<void> {
    if (this.pending.value) {
      return;
    }
    this.pending.next(true);
    let payload = {} as JoinMediaSFURoomOptions;

    if (this.returnUI) {
      const { name, eventID } = this.preJoinForm.value;

      if (!name || !eventID) {
        this.error = 'Please fill all the fields.';
        return;
      }

      payload = {
        action: 'join',
        meetingID: eventID,
        userName: name,
      };
    } else {
      if (this.noUIPreJoinOptions && 'action' in this.noUIPreJoinOptions && this.noUIPreJoinOptions.action === 'join') {
        payload = this.noUIPreJoinOptions as JoinMediaSFURoomOptions;
      } else {
        this.error = 'Invalid options provided for joining a room without UI.';
        this.pending.next(false);
        return;
      }
    }

    if (this.localLink && !this.localLink.includes('mediasfu.com')) {
      const joinData: JoinLocalEventRoomParameters = {
        eventID: payload.meetingID,
        userName: payload.userName,
        secureCode: '',
        videoPreference: null,
        audioPreference: null,
        audioOutputPreference: null,
      };

      await this.joinLocalRoom({ joinData: joinData });
      this.pending.next(false);
      return;
    }

    this.parameters.updateIsLoadingModalVisible(true);
    try {
      if (!this.joinMediaSFURoom) {
        this.joinMediaSFURoom = this.joinRoomService.joinRoomOnMediaSFU;
      }
    const response = await this.joinMediaSFURoom({
      payload,
      apiUserName: this.credentials.apiUserName,
      apiKey: this.credentials.apiKey,
      localLink: this.localLink,
    });

    if (response.success && response.data && 'roomName' in response.data) {
      await this.checkLimitsService.checkLimitsAndMakeRequest({
        apiUserName: response.data.roomName,
        apiToken: response.data.secret,
        link: response.data.link,
        userName: payload.userName,
        parameters: this.parameters,
        validate: true,
      });
    this.error = '';
    this.pending.next(false);
    } else {
      this.parameters.updateIsLoadingModalVisible(false);
        this.pending.next(false);
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
 ```

### IP Blockage Warning And Local UI Development

 **Note:** Local UI Development Mode is deprecated. Rather use your own Community Edition (CE) server for UI development and testing. You can later switch to MediaSFU Cloud for production. Nothing changes in the codebase, and you can use the same code for both environments.

Entering the event room without the correct credentials may result in IP blockage, as the page automatically attempts to connect with MediaSFU servers, which rate limit bad requests based on IP address.

If users attempt to enter the event room without valid credentials or tokens, it may lead to IP blockage due to MediaSFU servers' rate limiting mechanism. To avoid unintentional connections to MediaSFU servers during UI development, users can pass the `useLocalUIMode` parameter as `true`.

In this mode, the module will operate locally without making requests to MediaSFU servers. However, to render certain UI elements such as messages, participants, requests, etc., users may need to provide seed data. They can achieve this by importing random data generators and passing the generated data to the event room component.

### Example for Generic UI to Render Broadcast Room

```typescript
import { Component, OnInit } from '@angular/core';
import {
  MediasfuBroadcast,
  GenerateRandomParticipants,
  GenerateRandomMessages,
  GenerateRandomRequestList,
  GenerateRandomWaitingRoomList
} from 'mediasfu-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MediasfuBroadcast],
  template: `
    <div class="container">
      <app-mediasfu-broadcast
        [useLocalUIMode]="useLocalUIMode"
        [useSeed]="useSeed"
        [seedData]="seedData">
      </app-mediasfu-broadcast>
    </div>
  `,
  providers: [
    GenerateRandomParticipants,
    GenerateRandomMessages,
  ],
})
export class AppComponent implements OnInit {
  // Whether to use seed data for generating random participants and messages
  useSeed = true;
  seedData: any = {};
  eventType = 'broadcast';


  // Whether to use local UI mode (prevents requests to MediaSFU servers)
  useLocalUIMode = false;

  constructor(
    private generateRandomParticipants: GenerateRandomParticipants,
    private generateRandomMessages: GenerateRandomMessages,
    private generateRandomRequestList: GenerateRandomRequestList,
    private generateRandomWaitingRoomList: GenerateRandomWaitingRoomList
  ) { }

  ngOnInit(): void {
    if (this.useSeed) {
        const memberName = 'Alice';
        const hostName = 'Fred';



         // Generate random participants
        const participants_ =
          this.generateRandomParticipants.generateRandomParticipants({
            member: memberName,
            coHost: '',
            host: hostName,
            forChatBroadcast:
              this.eventType === 'broadcast' || this.eventType === 'chat',
          });

        // Generate random messages
        const messages_ = this.generateRandomMessages.generateRandomMessages({
          participants: participants_,
          member: memberName,
          host: hostName,
          forChatBroadcast:
            this.eventType === 'broadcast' || this.eventType === 'chat',
        });

        // Generate random request list
        const requests_ =
          this.generateRandomRequestList.generateRandomRequestList({
            participants: participants_,
            hostName: memberName,
            coHostName: '',
            numberOfRequests: 3,
          });

        // Generate random waiting room list
        const waitingList_ =
          this.generateRandomWaitingRoomList.generateRandomWaitingRoomList();

        // Assign generated data to seedData
        this.seedData = {
          participants: participants_,
          messages: messages_,
          requests: requests_,
          waitingList: waitingList_,
          member: memberName,
          host: hostName,
          eventType: this.eventType,
        };
      }

    // Determine whether to use local UI mode
    this.useLocalUIMode = this.useSeed;
  }
}

```

### Example for Generic View

```typescript
import { Component, OnInit } from '@angular/core';
import {
  GenerateRandomParticipants,
  GenerateRandomMessages,
  GenerateRandomRequestList,
  GenerateRandomWaitingRoomList,
  MediasfuGeneric,
  MediasfuBroadcast,
  MediasfuChat,
  MediasfuWebinar,
  MediasfuConference,
  PreJoinPage,
} from 'mediasfu-angular';

// Assume all missing imports are similar to the previous example


/**
 * AppComponent
 *
 * This component demonstrates how to:
 * - Configure credentials for MediaSFU Cloud and/or Community Edition (CE).
 * - Use MediaSFU with or without a custom server.
 * - Integrate a pre-join page.
 * - Disable the default MediaSFU UI and manage state through `sourceParameters` for a fully custom frontend.
 *
 * Basic instructions:
 * 1. Set `localLink` to your CE server if you have one, or leave it blank to use MediaSFU Cloud.
 * 2. Set `connectMediaSFU` to determine whether you're connecting to MediaSFU Cloud services.
 * 3. Provide credentials if using MediaSFU Cloud (dummy credentials are acceptable in certain scenarios).
 * 4. If you prefer a custom UI, set `returnUI` to false and handle all interactions via `sourceParameters` and `updateSourceParameters`.
 * 5. For secure production usage, use custom `createMediaSFURoom` and `joinMediaSFURoom` functions to forward requests through your backend.
 */
@Component({
  selector: 'app-root',
  imports: [MediasfuGeneric],
  template: `
    <app-mediasfu-generic
      [PrejoinPage]="PreJoinPage"
      [credentials]="credentials"
      [localLink]="localLink"
      [connectMediaSFU]="connectMediaSFU"
      [returnUI]="returnUI"
      [noUIPreJoinOptions]="!returnUI ? noUIPreJoinOptions : undefined"
      [sourceParameters]="!returnUI ? sourceParameters : undefined"
      [updateSourceParameters]="!returnUI ? updateSourceParameters : undefined"
      [createMediaSFURoom]="createRoomOnMediaSFU.createRoomOnMediaSFU"
      [joinMediaSFURoom]="joinRoomOnMediaSFU.joinRoomOnMediaSFU">
    </app-mediasfu-generic>
  `,
  providers: [
    GenerateRandomParticipants,
    GenerateRandomMessages,
    GenerateRandomRequestList,
    GenerateRandomWaitingRoomList
  ],
})
export class AppComponent implements OnInit {
  // =========================================================
  //                API CREDENTIALS CONFIGURATION
  // =========================================================
  //
  // Scenario A: Not using MediaSFU Cloud at all.
  // - No credentials needed. Just set localLink to your CE server.
  // Example:
  /*
  credentials = {};
  localLink = 'http://your-ce-server.com'; // e.g., 'http://localhost:3000'
  connectMediaSFU = localLink.trim() !== '';
  */

  // Scenario B: Using MediaSFU CE + MediaSFU Cloud for Egress only.
  // - Use dummy credentials (8 characters for userName, 64 characters for apiKey).
  // - Your CE backend will forward requests with your real credentials.
  /*
  credentials = {
    apiUserName: 'dummyUsr', // 8 characters
    apiKey: '1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', // 64 characters
  };
  localLink = 'http://your-ce-server.com'; // e.g., 'http://localhost:3000'
  connectMediaSFU = localLink.trim() !== '';
  */

  // Scenario C: Using MediaSFU Cloud without your own server.
  // - For development, use your actual or dummy credentials.
  // - In production, securely handle credentials server-side and use custom room functions.
  credentials = {
    apiUserName: 'yourDevUser', // 8 characters recommended for dummy
    apiKey: 'yourDevApiKey1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef', // 64 characters
  };
  localLink = ''; // Leave empty if not using your own server
  connectMediaSFU = true; // Set to true if using MediaSFU Cloud since localLink is empty

  // =========================================================
  //                    UI RENDERING OPTIONS
  // =========================================================
  //
  // If you want a fully custom UI (e.g., a custom layout inspired by WhatsApp):
  // 1. Set `returnUI = false` to prevent the default MediaSFU UI from rendering.
  // 2. Provide `noUIPreJoinOptions` to simulate what would have been entered on a pre-join page.
  // 3. Use `sourceParameters` and `updateSourceParameters` to access and update state/actions.
  // 4. No need for any of the above if you're using the default MediaSFU UI.
  //
  // Example noUIPreJoinOptions for creating a room:
  noUIPreJoinOptions: CreateMediaSFURoomOptions | JoinMediaSFURoomOptions = {
    action: 'create',
    capacity: 10,
    duration: 15,
    eventType: 'broadcast',
    userName: 'Prince',
  };

  // Example noUIPreJoinOptions for joining a room:
  // noUIPreJoinOptions: CreateMediaSFURoomOptions | JoinMediaSFURoomOptions = {
  //   action: 'join',
  //   userName: 'Prince',
  //   meetingID: 'yourMeetingID'
  // };

  returnUI = true; // Set to false for custom UI, true for default MediaSFU UI

  sourceParameters: { [key: string]: any } = {};

  /**
   * Function to update sourceParameters state.
   *
   * @param data - The data to update sourceParameters with.
   */
  updateSourceParameters = (data: { [key: string]: any }) => {
    this.sourceParameters = data;
  };

  // =========================================================
  //                CUSTOM ROOM FUNCTIONS (OPTIONAL)
  // =========================================================
  //
  // To securely forward requests to MediaSFU:
  // - Implement custom `createMediaSFURoom` and `joinMediaSFURoom` functions.
  // - These functions send requests to your server, which then communicates with MediaSFU Cloud.
  //
  // The imported `createRoomOnMediaSFU` and `joinRoomOnMediaSFU` are examples.
  //
  // If using MediaSFU CE backend, ensure your server endpoints:
  // - Validate dummy credentials.
  // - Forward requests to mediasfu.com with real credentials.

  // =========================================================
  //              COMPONENT SELECTION AND RENDERING
  // =========================================================
  //
  // Multiple components are available depending on your event type:
  // MediasfuBroadcast, MediasfuChat, MediasfuWebinar, MediasfuConference
  //
  // By default, we'll use MediasfuGeneric with custom settings.
  //
  // Uncomment the desired component below and comment out the others as needed.
  //
  // Example of MediaSFU CE with no MediaSFU Cloud
  // return (
  //   <app-mediasfu-generic
  //     [PrejoinPage]="PreJoinPage"
  //     [localLink]="localLink">
  //   </app-mediasfu-generic>
  // );

  // Example of MediaSFU CE + MediaSFU Cloud for Egress only
  // return (
  //   <app-mediasfu-generic
  //     [PrejoinPage]="PreJoinPage"
  //     [credentials]="credentials"
  //     [localLink]="localLink"
  //     [connectMediaSFU]="connectMediaSFU">
  //   </app-mediasfu-generic>
  // );

  // Example of MediaSFU Cloud only
  // return (
  //   <app-mediasfu-generic
  //     [PrejoinPage]="PreJoinPage"
  //     [credentials]="credentials"
  //     [connectMediaSFU]="connectMediaSFU">
  //   </app-mediasfu-generic>
  // );

  // Example of MediaSFU CE + MediaSFU Cloud for Egress only with custom UI
  // return (
  //   <app-mediasfu-generic
  //     [PrejoinPage]="PreJoinPage"
  //     [credentials]="credentials"
  //     [localLink]="localLink"
  //     [connectMediaSFU]="connectMediaSFU"
  //     [returnUI]="false"
  //     [noUIPreJoinOptions]="noUIPreJoinOptions"
  //     [sourceParameters]="sourceParameters"
  //     [updateSourceParameters]="updateSourceParameters"
  //     [createMediaSFURoom]="createRoomOnMediaSFU"
  //     [joinMediaSFURoom]="joinRoomOnMediaSFU">
  //   </app-mediasfu-generic>
  // );

  // Example of MediaSFU Cloud only with custom UI
  // return (
  //   <app-mediasfu-generic
  //     [PrejoinPage]="PreJoinPage"
  //     [credentials]="credentials"
  //     [connectMediaSFU]="connectMediaSFU"
  //     [returnUI]="false"
  //     [noUIPreJoinOptions]="noUIPreJoinOptions"
  //     [sourceParameters]="sourceParameters"
  //     [updateSourceParameters]="updateSourceParameters"
  //     [createMediaSFURoom]="createRoomOnMediaSFU"
  //     [joinMediaSFURoom]="joinRoomOnMediaSFU">
  //   </app-mediasfu-generic>
  // );

  // Example of using MediaSFU CE only with custom UI
  // return (
  //   <app-mediasfu-generic
  //     [PrejoinPage]="PreJoinPage"
  //     [localLink]="localLink"
  //     [connectMediaSFU]="false"
  //     [returnUI]="false"
  //     [noUIPreJoinOptions]="noUIPreJoinOptions"
  //     [sourceParameters]="sourceParameters"
  //     [updateSourceParameters]="updateSourceParameters">
  //   </app-mediasfu-generic>
  // );

  /**
   * Default Rendering: MediasfuGeneric with Updated Configuration
   *
   * Renders the MediasfuGeneric component with specified server and cloud connection settings.
   * Configured for custom UI usage if `returnUI` is set to false.
   */
  ngOnInit(): void {
    // Deprecated Feature: useSeed and seedData for generating random participants and messages
    // Uncomment and configure the following section if you intend to use seed data

    /*
    if (this.useSeed) {
      const memberName = 'Alice';
      const hostName = 'Fred';

      // Generate random participants
      const participants_ = this.generateRandomParticipants.generateRandomParticipants({
        member: memberName,
        coHost: '',
        host: hostName,
        forChatBroadcast: this.eventType === 'broadcast' || this.eventType === 'chat',
      });

      // Generate random messages
      const messages_ = this.generateRandomMessages.generateRandomMessages({
        participants: participants_,
        member: memberName,
        host: hostName,
        forChatBroadcast: this.eventType === 'broadcast' || this.eventType === 'chat',
      });

      // Generate random request list
      const requests_ = this.generateRandomRequestList.generateRandomRequestList({
        participants: participants_,
        hostName: memberName,
        coHostName: '',
        numberOfRequests: 3,
      });

      // Generate random waiting room list
      const waitingList_ = this.generateRandomWaitingRoomList.generateRandomWaitingRoomList();

      // Assign generated data to seedData
      this.seedData = {
        participants: participants_,
        messages: messages_,
        requests: requests_,
        waitingList: waitingList_,
        member: memberName,
        host: hostName,
        eventType: this.eventType,
      };
    }

    // Determine whether to use local UI mode
    this.useLocalUIMode = this.useSeed;
    */
  }

  // ========================
  // ====== COMPONENT SELECTION ======
  // ========================

  /**
   * Choose the Mediasfu component based on the event type and use case.
   * Uncomment the component corresponding to your specific use case.
   */

  // ------------------------
  // ====== SIMPLE USE CASE ======
  // ------------------------

  /**
   * **Simple Use Case (Welcome Page)**
   *
   * Renders the default welcome page.
   * No additional inputs required.
   */
  // return <MediasfuWebinar />;

  // ------------------------
  // ====== PRE-JOIN USE CASE ======
  // ------------------------

  /**
   * **Use Case with Pre-Join Page (Credentials Required)**
   *
   * Uses a pre-join page that requires users to enter credentials.
   */
  // return <MediasfuWebinar PrejoinPage={PreJoinPage} credentials={credentials} />;

  // ------------------------
  // ====== SEED DATA USE CASE ======
  // ------------------------

  /**
   * **Use Case with Seed Data (Deprecated)**
   *
   * Runs the application using seed data.
   *
   * @deprecated Due to updates for strong typing, this feature is deprecated.
   */
  // return <MediasfuWebinar useSeed={useSeed} seedData={useSeed ? seedData : {}} />;

  // ------------------------
  // ====== WEBINAR EVENT TYPE ======
  // ------------------------

  /**
   * **MediasfuWebinar Component**
   *
   * Uncomment to use the webinar event type.
   */
  /*
  return (
    <MediasfuWebinar
      credentials={credentials}
      localLink={localLink}
      connectMediaSFU={connectMediaSFU}
      // seedData={useSeed ? seedData : {}}
    />
  );
  */

  // ========================
  // ====== DEFAULT COMPONENT ======
  // ========================

  /**
   * **Default to MediasfuWebinar with Updated Configuration**
   *
   * Renders the MediasfuWebinar component with specified server and cloud connection settings.
   * This is the default use case if no specific event type is selected.
   */

  // Reference to the PreJoinPage component
  PreJoinPage = PreJoinPage;

  constructor(
    private generateRandomParticipants: GenerateRandomParticipants,
    private generateRandomMessages: GenerateRandomMessages,
    private generateRandomRequestList: GenerateRandomRequestList,
    private generateRandomWaitingRoomList: GenerateRandomWaitingRoomList,
    public createRoomOnMediaSFU: CreateRoomOnMediaSFU,
    public joinRoomOnMediaSFU: JoinRoomOnMediaSFU
  ) { }

  // Deprecated Feature: useSeed and seedData for generating random participants and messages
  // Uncomment and configure the following section if you intend to use seed data

  // useSeed = false;
  // eventType = 'webinar';
  // useLocalUIMode = false;

}

export default AppComponent;

/**
 * =========================================================
 *                     ADDITIONAL NOTES
 * =========================================================
 *
 * Handling Core Methods:
 * Once `sourceParameters` is populated, you can call core methods like `clickVideo` or `clickAudio` directly:
 * Example:
 * sourceParameters.clickVideo({ ...sourceParameters });
 * sourceParameters.clickAudio({ ...sourceParameters });
 *
 * This allows your custom UI to directly interact with MediaSFU functionalities.
 *
 * Deprecated Features (Seed Data):
 * The seed data generation feature is deprecated. Avoid using `useLocalUIMode` or `useSeed` in new implementations.
 *
 * Security Considerations:
 * - **Protect API Credentials:** Ensure that API credentials are not exposed in the frontend. Use environment variables and secure backend services to handle sensitive information.
 * - **Use HTTPS:** Always use HTTPS to secure data transmission between the client and server.
 * - **Validate Inputs:** Implement proper validation and error handling on both client and server sides to prevent malicious inputs.
 *
 * Example CE Backend Setup:
 * If using MediaSFU CE + MediaSFU Cloud, your backend might look like this:
 *
 * ```javascript
 * // Endpoint for `createRoom`
 * app.post("/createRoom", async (req, res) => {
 *   try {
 *     const payload = req.body;
 *     const [apiUserName, apiKey] = req.headers.authorization
 *       .replace("Bearer ", "")
 *       .split(":");
 *
 *     // Verify temporary credentials
 *     if (!apiUserName || !apiKey || !verifyCredentials(apiUserName, apiKey)) {
 *       return res.status(401).json({ error: "Invalid or expired credentials" });
 *     }
 *
 *     const response = await fetch("https://mediasfu.com/v1/rooms/", {
 *       method: "POST",
 *       headers: {
 *         "Content-Type": "application/json",
 *         Authorization: `Bearer ${actualApiUserName}:${actualApiKey}`,
 *       },
 *       body: JSON.stringify(payload),
 *     });
 *
 *     const result = await response.json();
 *     res.status(response.status).json(result);
 *   } catch (error) {
 *     console.error("Error creating room:", error);
 *     res.status(500).json({ error: "Internal server error" });
 *   }
 * });
 *
 * // Endpoint for `joinRoom`
 * app.post("/joinRoom", async (req, res) => {
 *   try {
 *     const payload = req.body;
 *     const [apiUserName, apiKey] = req.headers.authorization
 *       .replace("Bearer ", "")
 *       .split(":");
 *
 *     // Verify temporary credentials
 *     if (!apiUserName || !apiKey || !verifyCredentials(apiUserName, apiKey)) {
 *       return res.status(401).json({ error: "Invalid or expired credentials" });
 *     }
 *
 *     const response = await fetch("https://mediasfu.com/v1/rooms", {
 *       method: "POST",
 *       headers: {
 *         "Content-Type": "application/json",
 *         Authorization: `Bearer ${actualApiUserName}:${actualApiKey}`,
 *       },
 *       body: JSON.stringify(payload),
 *     });
 *
 *     const result = await response.json();
 *     res.status(response.status).json(result);
 *   } catch (error) {
 *     console.error("Error joining room:", error);
 *     res.status(500).json({ error: "Internal server error" });
 *   }
 * });
 * ```
 *
 * Custom Room Function Implementation:
 * Below are examples of how to implement custom functions for creating and joining rooms securely:
 *
 * ```typescript
 * import { CreateJoinRoomError, CreateJoinRoomResponse, CreateJoinRoomType, CreateMediaSFURoomOptions, JoinMediaSFURoomOptions } from '../../@types/types';
 *
 *
 *  * Async function to create a room on MediaSFU.
 *  *
 *  * @param {object} options - The options for creating a room.
 *  * @param {CreateMediaSFURoomOptions} options.payload - The payload for the API request.
 *  * @param {string} options.apiUserName - The API username.
 *  * @param {string} options.apiKey - The API key.
 *  * @param {string} options.localLink - The local link.
 *  * @returns {Promise<{ data: CreateJoinRoomResponse | CreateJoinRoomError | null; success: boolean; }>} The response from the API.
 *
 * export const createRoomOnMediaSFU: CreateJoinRoomType = async ({
 *     payload,
 *     apiUserName,
 *     apiKey,
 *     localLink = '',
 * }) => {
 *     try {
 *         let finalLink = 'https://mediasfu.com/v1/rooms/';
 *
 *         // Update finalLink if using a local server
 *         if (localLink) {
 *             finalLink = `${localLink}/createRoom`;
 *         }
 *
 *         const response = await fetch(finalLink, {
 *             method: 'POST',
 *             headers: {
 *                 'Content-Type': 'application/json',
 *                 Authorization: `Bearer ${apiUserName}:${apiKey}`,
 *             },
 *             body: JSON.stringify(payload),
 *         });
 *
 *         if (!response.ok) {
 *             throw new Error(`HTTP error! Status: ${response.status}`);
 *         }
 *
 *         const data: CreateJoinRoomResponse = await response.json();
 *         return { data, success: true };
 *     } catch (error) {
 *         const errorMessage = (error as Error).message || 'unknown error';
 *         return {
 *             data: { error: `Unable to create room, ${errorMessage}` },
 *             success: false,
 *         };
 *     }
 * };
 *
 *
 *  * Async function to join a room on MediaSFU.
 *  *
 *  * @param {object} options - The options for joining a room.
 *  * @param {JoinMediaSFURoomOptions} options.payload - The payload for the API request.
 *  * @param {string} options.apiUserName - The API username.
 *  * @param {string} options.apiKey - The API key.
 *  * @param {string} options.localLink - The local link.
 *  * @returns {Promise<{ data: CreateJoinRoomResponse | CreateJoinRoomError | null; success: boolean; }>} The response from the API.
 *
 * export const joinRoomOnMediaSFU: JoinRoomOnMediaSFUType = async ({
 *     payload,
 *     apiUserName,
 *     apiKey,
 *     localLink = '',
 * }) => {
 *     try {
 *         let finalLink = 'https://mediasfu.com/v1/rooms/join';
 *
 *         // Update finalLink if using a local server
 *         if (localLink) {
 *             finalLink = `${localLink}/joinRoom`;
 *         }
 *
 *         const response = await fetch(finalLink, {
 *             method: 'POST',
 *             headers: {
 *                 'Content-Type': 'application/json',
 *                 Authorization: `Bearer ${apiUserName}:${apiKey}`,
 *             },
 *             body: JSON.stringify(payload),
 *         });
 *
 *         if (!response.ok) {
 *             throw new Error(`HTTP error! Status: ${response.status}`);
 *         }
 *
 *         const data: CreateJoinRoomResponse = await response.json();
 *         return { data, success: true };
 *     } catch (error) {
 *         const errorMessage = (error as Error).message || 'unknown error';
 *         return {
 *             data: { error: `Unable to join room, ${errorMessage}` },
 *             success: false,
 *         };
 *     }
 * };
 * ```
 *
 * =======================
 * ====== END OF GUIDE ======
 * =======================
 */

```

In the provided examples, users can set `useLocalUIMode` to `true` during UI development to prevent unwanted connections to MediaSFU servers. Additionally, they can generate seed data for rendering UI components locally by using random data generators provided by the module.

### Local UI Development in MediaSFU Angular Module



During local UI development, the MediaSFU view is designed to be responsive to changes in screen size and orientation, adapting its layout accordingly. However, since UI changes are typically linked to communication with servers, developing the UI locally might result in less responsiveness due to the lack of real-time data updates. To mitigate this, users can force trigger changes in the UI by rotating the device, resizing the window, or simulating server responses by clicking on buttons within the page.

While developing locally, users may encounter occasional error warnings as the UI attempts to communicate with the server. These warnings can be safely ignored, as they are simply indicative of unsuccessful server requests in the local development environment.

If users experience responsiveness issues, whether during local development or in production, they can optimize their HTML configuration to ensure proper scaling and viewport settings. By adding the following meta tag to the HTML `<head>` section, users can specify viewport settings for optimal display:

```html
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
```




# Intermediate Usage Guide <a name="intermediate-usage-guide"></a>

Expands on the basic usage, covering more advanced features and scenarios.

### Intermediate Usage Guide

In the Intermediate Usage Guide, we'll explore the core components and functionalities of the MediaSFU Angular module, focusing on media display, controls, and modal interactions. **Click on any listed component/method to open the full documentation.**


#### Core Components Overview

The main items displayed on an event page are media components (such as video, audio, and blank cards) and control components (for pagination, navigation, etc.).

> ##### **Media Display Components**

| Component Name           | Description                                                                                     |
|--------------------------|-------------------------------------------------------------------------------------------------|
| **[MainAspectComponent](https://www.mediasfu.com/angular/classes/MainAspectComponent)** | Serves as a container for the primary aspect of the user interface, typically containing the main content or focus of the application. |
| **[MainScreenComponent](https://www.mediasfu.com/angular/classes/MainScreenComponent)** | Responsible for rendering the main screen layout of the application, providing the foundation for displaying various elements and content. |
| **[MainGridComponent](https://www.mediasfu.com/angular/classes/MainGridComponent)**  | Crucial part of the user interface, organizing and displaying primary content or elements in a grid layout format. |
| **[SubAspectComponent](https://www.mediasfu.com/angular/classes/SubAspectComponent)** | Acts as a secondary container within the user interface, often housing additional elements or controls related to the main aspect. |
| **[MainContainerComponent](https://www.mediasfu.com/angular/classes/MainContainerComponent)** | Primary container for the application's content, encapsulating all major components and providing structural organization. |
| **[OtherGridComponent](https://www.mediasfu.com/angular/classes/OtherGridComponent)** | Complements the Main Grid Component by offering additional grid layouts, typically used for displaying secondary or auxiliary content. |

> ##### **Control Components**

| Component Name                | Description                                                                                     |
|-------------------------------|-------------------------------------------------------------------------------------------------|
| **[ControlButtonsComponent](https://www.mediasfu.com/angular/classes/ControlButtonsComponent)** | Comprises a set of buttons or controls used for navigating, interacting, or managing various aspects of the application's functionality. |
| **[ControlButtonsAltComponent](https://www.mediasfu.com/angular/classes/ControlButtonsAltComponent)** | Provides alternative button configurations or styles for controlling different aspects of the application. |
| **[ControlButtonsComponentTouch](https://www.mediasfu.com/angular/classes/ControlButtonsComponentTouch)** | Specialized component designed for touch-enabled devices, offering floating buttons or controls for intuitive interaction with the application's features. |


These components collectively contribute to the overall user interface, facilitating navigation, interaction, and content display within the application.

> ##### **Modal Components**

| Modal Component | Description |
|-----------------|-------------|
| **[LoadingModal](https://www.mediasfu.com/angular/classes/LoadingModal)** | Modal for displaying loading indicator during data fetching or processing. |
| **[MainAspectComponent](https://www.mediasfu.com/angular/classes/MainAspectComponent)** | Component responsible for displaying the main aspect of the event page. |
| **[ControlButtonsComponent](https://www.mediasfu.com/angular/classes/ControlButtonsComponent)** | Component for displaying control buttons such as pagination controls. |
| **[ControlButtonsAltComponent](https://www.mediasfu.com/angular/classes/ControlButtonsAltComponent)** | Alternate control buttons component for specific use cases. |
| **[ControlButtonsComponentTouch](https://www.mediasfu.com/angular/classes/ControlButtonsComponentTouch)** | Touch-enabled control buttons component for mobile devices. |
| **[OtherGridComponent](https://www.mediasfu.com/angular/classes/OtherGridComponent)** | Component for displaying additional grid elements on the event page. |
| **[MainScreenComponent](https://www.mediasfu.com/angular/classes/MainScreenComponent)** | Component for rendering the main screen content of the event. |
| **[MainGridComponent](https://www.mediasfu.com/angular/classes/MainGridComponent)** | Main grid component for displaying primary event content. |
| **[SubAspectComponent](https://www.mediasfu.com/angular/classes/SubAspectComponent)** | Component for displaying secondary aspects of the event page. |
| **[MainContainerComponent](https://www.mediasfu.com/angular/classes/MainContainerComponent)** | Main container component for the event page content. |
| **[AlertComponent](https://www.mediasfu.com/angular/classes/AlertComponent)** | Modal for displaying alert messages to the user. |
| **[MenuModal](https://www.mediasfu.com/angular/classes/MenuModal)** | Modal for displaying a menu with various options. |
| **[RecordingModal](https://www.mediasfu.com/angular/classes/RecordingModal)** | Modal for managing recording functionality during the event. |
| **[RequestsModal](https://www.mediasfu.com/angular/classes/RequestsModal)** | Modal for handling requests from participants during the event. |
| **[WaitingRoomModal](https://www.mediasfu.com/angular/classes/WaitingRoomModal)** | Modal for managing waiting room functionality during the event. |
| **[DisplaySettingsModal](https://www.mediasfu.com/angular/classes/DisplaySettingsModal)** | Modal for adjusting display settings during the event. |
| **[EventSettingsModal](https://www.mediasfu.com/angular/classes/EventSettingsModal)** | Modal for configuring event settings. |
| **[CoHostModal](https://www.mediasfu.com/angular/classes/CoHostModal)** | Modal for managing co-host functionality during the event. |
| **[ParticipantsModal](https://www.mediasfu.com/angular/classes/ParticipantsModal)** | Modal for displaying participant information and controls. |
| **[MessagesModal](https://www.mediasfu.com/angular/classes/MessagesModal)** | Modal for managing messages and chat functionality during the event. |
| **[MediaSettingsModal](https://www.mediasfu.com/angular/classes/MediaSettingsModal)** | Modal for adjusting media settings during the event. |
| **[ConfirmExitModal](https://www.mediasfu.com/angular/classes/ConfirmExitModal)** | Modal for confirming exit from the event. |
| **[ConfirmHereModal](https://www.mediasfu.com/angular/classes/ConfirmHereModal)** | Modal for confirming certain actions or selections. |
| **[ShareEventModal](https://www.mediasfu.com/angular/classes/ShareEventModal)** | Modal for sharing the event with others. |
| **[WelcomePage](https://www.mediasfu.com/angular/classes/WelcomePage)** | Welcome page modal for the event. |
| **[PreJoinPage](https://www.mediasfu.com/angular/classes/PreJoinPage)** | Prejoin page modal for the event. |
| **[PollModal](https://www.mediasfu.com/angular/classes/PollModal)** | Modal for conducting polls or surveys during the event. |
| **[BreakoutRoomsModal](https://www.mediasfu.com/angular/classes/BreakoutRoomsModal)** | Modal for managing breakout rooms during the event. |
| **[ConfigureWhiteboardModal](https://www.mediasfu.com/angular/classes/ConfigureWhiteboardModal)** | Modal for configuring whiteboard settings during the event. |                      
| **[BackgroundModal](https://www.mediasfu.com/angular/classes/BackgroundModal)**  | Modal for managing background settings during the event. |
| **[ScreenboardModal](https://www.mediasfu.com/angular/classes/ScreenboardModal)** | Modal for managing screen share annotations during the event. |

#### Modal Interactions

Each modal has corresponding functions to trigger its usage:

1. [`launchMenuModal`](https://www.mediasfu.com/angular/classes/launchMenuModal): Launches the menu modal for settings and configurations.
2. [`launchRecording`](https://www.mediasfu.com/angular/classes/launchRecording): Initiates the recording modal for recording functionalities.
3. [`startRecording`](https://www.mediasfu.com/angular/classes/startRecording): Starts the recording process.
4. [`confirmRecording`](https://www.mediasfu.com/angular/classes/confirmRecording): Confirms and finalizes the recording.
5. [`launchWaiting`](https://www.mediasfu.com/angular/classes/launchWaiting): Opens the waiting room modal for managing waiting room interactions.
6. [`launchCoHost`](https://www.mediasfu.com/angular/classes/launchCoHost): Opens the co-host modal for managing co-host functionalities.
7. [`launchMediaSettings`](https://www.mediasfu.com/angular/classes/launchMediaSettings): Launches the media settings modal for adjusting media-related configurations.
8. [`launchDisplaySettings`](https://www.mediasfu.com/angular/classes/launchDisplaySettings): Opens the display settings modal for adjusting display configurations.
9. [`launchSettings`](https://www.mediasfu.com/angular/classes/launchSettings): Initiates the settings modal for general event settings and configurations.
10. [`launchRequests`](https://www.mediasfu.com/angular/classes/launchRequests): Opens the requests modal for managing user requests.
11. [`launchParticipants`](https://www.mediasfu.com/angular/classes/launchParticipants): Displays the participants modal for viewing and managing event participants.
12. [`launchMessages`](https://www.mediasfu.com/angular/classes/launchMessages): Opens the messages modal for communication through chat messages.
13. [`launchConfirmExit`](https://www.mediasfu.com/angular/classes/launchConfirmExit): Prompts users to confirm before exiting the event.

#### Media Display and Controls

These components facilitate media display and control functionalities:

1. **[Pagination](https://www.mediasfu.com/angular/classes/Pagination)**: Handles pagination and page switching.
2. **[FlexibleGrid](https://www.mediasfu.com/angular/classes/FlexibleGrid)**: Renders flexible grid layouts for media display.
3. **[FlexibleVideo](https://www.mediasfu.com/angular/classes/FlexibleVideo)**: Displays videos in a flexible manner within the grid.
4. **[AudioGrid](https://www.mediasfu.com/angular/classes/AudioGrid)**: Renders audio components within the grid layout.
5. **[Whiteboard](https://www.mediasfu.com/angular/classes/Whiteboard)**: Manages whiteboard functionalities for collaborative drawing.
6. **[Screenboard](https://www.mediasfu.com/angular/classes/Screenboard)**: Controls screen share annotations and interactions.

These components enable seamless media presentation and interaction within the event environment, providing users with a rich and immersive experience.

| UI Media Component | Description |
|--------------|-------------|
| **[MeetingProgressTimer](https://www.mediasfu.com/angular/classes/MeetingProgressTimer)** | Component for displaying a timer indicating the progress of a meeting or event. |
| **[MiniAudio](https://www.mediasfu.com/angular/classes/MiniAudio)** | Component for rendering a compact audio player with basic controls. |
| **[MiniCard](https://www.mediasfu.com/angular/classes/MiniCard)** | Component for displaying a minimized card view with essential information. |
| **[AudioCard](https://www.mediasfu.com/angular/classes/AudioCard)** | Component for displaying audio content with control elements, details, and audio decibels. |
| **[VideoCard](https://www.mediasfu.com/angular/classes/VideoCard)** | Component for displaying video content with control elements, details, and audio decibels. |
| **[CardVideoDisplay](https://www.mediasfu.com/angular/classes/CardVideoDisplay)** | Video player component for displaying embedded videos with controls and details. |
| **[MiniCardAudio](https://www.mediasfu.com/angular/classes/MiniCardAudio)** | Component for rendering a compact card view with audio content and controls. |
| **[MiniAudioPlayer](https://www.mediasfu.com/angular/classes/MiniAudioPlayer)** | Utility method for playing audio and rendering a mini audio modal when the user is not actively displayed on the page. |

---
With the Intermediate Usage Guide, users can explore and leverage the core components and functionalities of the MediaSFU Angular module to enhance their event hosting and participation experiences.

Here's a sample import and usage code for a Broadcast screen:

```javascript
import {
  Component,
  HostListener,
  Injector,
  ChangeDetectorRef,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Subscription, combineLatest } from 'rxjs';
import { Socket } from 'socket.io-client';
import {
  faMicrophoneSlash,
  faVideoSlash,
} from '@fortawesome/free-solid-svg-icons';


// Components for display - sample
import { MainAspectComponent } from 'mediasfu-angular';
import { LoadingModal } from 'mediasfu-angular';
import {
  WelcomePage,
  WelcomePageOptions,
} from 'mediasfu-angular';

// Import methods for control
import { LaunchRecording } from 'mediasfu-angular';
import { StartRecording } from 'mediasfu-angular';
import { ConfirmRecording } from 'mediasfu-angular';
import { LaunchParticipants } from 'mediasfu-angular';


@Component({
  selector: 'app-mediasfu-broadcast',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    AlertComponent,
    AudioGrid,
    ControlButtonsComponentTouch,
    FlexibleVideo,
    LoadingModal,
    ConfirmExitModal,
  ],
  template: `
    <div
      class="MediaSFU"
      [ngStyle]="{
        height: '100vh',
        width: '100vw',
        maxWidth: '100vw',
        maxHeight: '100vh',
        overflow: 'hidden'
      }"
    >
      <!-- Conditional Rendering: PrejoinPage or Main Content -->
      <ng-container *ngIf="!validated.value; else mainContent">
        <ng-container
          *ngComponentOutlet="
            PrejoinPageComponent.component;
            injector: PrejoinPageComponent.injector
          "
        >
        </ng-container>
      </ng-container>

      <!-- Main Content -->
      <ng-template #mainContent>
        <app-main-container-component>
          <!-- Main Aspect Component -->
          <app-main-aspect-component
            [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
            [defaultFraction]="1 - controlHeight.value"
            [showControls]="eventType.value === 'webinar' || eventType.value === 'conference'"
            [updateIsWideScreen]="updateIsWideScreen"
            [updateIsMediumScreen]="updateIsMediumScreen"
            [updateIsSmallScreen]="updateIsSmallScreen"
          >
            <!-- Main Screen Component -->
            <app-main-screen-component
              [doStack]="true"
              [mainSize]="mainHeightWidth.value"
              [defaultFraction]="1 - controlHeight.value"
              [showControls]="eventType.value === 'webinar' || eventType.value === 'conference'"
              [updateComponentSizes]="updateComponentSizes"
            >
              <!-- Main Grid Component -->
              <app-main-grid-component
                [height]="componentSizes.value.mainHeight"
                [width]="componentSizes.value.mainWidth"
                [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
                [mainSize]="mainHeightWidth.value"
                [showAspect]="mainHeightWidth.value > 0"
                [timeBackgroundColor]="recordState.value"
                [meetingProgressTime]="meetingProgressTime.value"
              >
                <app-flexible-video
                  [customWidth]="componentSizes.value.mainWidth"
                  [customHeight]="componentSizes.value.mainHeight"
                  [rows]="1"
                  [columns]="1"
                  [componentsToRender]="mainGridStream.value"
                  [showAspect]="
                    mainGridStream.value.length > 0 &&
                    !(whiteboardStarted.value && !whiteboardEnded.value)
                  "
                >
                </app-flexible-video>

                <!-- Control Buttons for Broadcast -->
                <app-control-buttons-component-touch
                  [buttons]="controlBroadcastButtons"
                  [position]="'right'"
                  [location]="'bottom'"
                  [direction]="'vertical'"
                  [showAspect]="eventType.value === 'broadcast'"
                ></app-control-buttons-component-touch>

                <!-- Recording Buttons -->
                <app-control-buttons-component-touch
                  [buttons]="recordButton"
                  [direction]="'horizontal'"
                  [showAspect]="
                    eventType.value === 'broadcast' &&
                    !showRecordButtons.value &&
                    islevel.value === '2'
                  "
                  [location]="'bottom'"
                  [position]="'middle'"
                ></app-control-buttons-component-touch>

                <app-control-buttons-component-touch
                  [buttons]="recordButtons"
                  [direction]="'horizontal'"
                  [showAspect]="
                    eventType.value === 'broadcast' &&
                    showRecordButtons.value &&
                    islevel.value === '2'
                  "
                  [location]="'bottom'"
                  [position]="'middle'"
                ></app-control-buttons-component-touch>

                <!-- AudioGrid -->
                <app-audio-grid [componentsToRender]="audioOnlyStreams.value"></app-audio-grid>
              </app-main-grid-component>

              <!-- Other Grid Component is not included in MediasfuBroadcast -->
            </app-main-screen-component>
          </app-main-aspect-component>
        </app-main-container-component>
      </ng-template>

      <!-- Modals to include -->
      <app-participants-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isParticipantsModalVisible]="isParticipantsModalVisible.value"
        [onParticipantsClose]="onParticipantsClose"
        [participantsCounter]="participantsCounter.value"
        [onParticipantsFilterChange]="onParticipantsFilterChange"
        [parameters]="{
          updateParticipants: updateParticipants,
          updateIsParticipantsModalVisible: updateIsParticipantsModalVisible,
          updateDirectMessageDetails: updateDirectMessageDetails,
          updateStartDirectMessage: updateStartDirectMessage,
          updateIsMessagesModalVisible: updateIsMessagesModalVisible,
          showAlert: showAlert,
          filteredParticipants: filteredParticipants.value,
          participants: filteredParticipants.value,
          roomName: roomName.value,
          islevel: islevel.value,
          member: member.value,
          coHostResponsibility: coHostResponsibility.value,
          coHost: coHost.value,
          eventType: eventType.value,
          startDirectMessage: startDirectMessage.value,
          directMessageDetails: directMessageDetails.value,
          socket: socket.value,
          getUpdatedAllParams: getUpdatedAllParams,
        }"
      ></app-participants-modal>

      <app-recording-modal
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        [isRecordingModalVisible]="isRecordingModalVisible.value"
        [onClose]="onRecordingClose"
        [startRecording]="startRecording.startRecording"
        [confirmRecording]="confirmRecording.confirmRecording"
        [parameters]="mediaSFUParameters"
      ></app-recording-modal>

      <app-messages-modal
        [backgroundColor]="
          eventType.value === 'webinar' || eventType.value === 'conference'
            ? '#f5f5f5'
            : 'rgba(255, 255, 255, 0.25)'
        "
        [isMessagesModalVisible]="isMessagesModalVisible.value"
        [onMessagesClose]="onMessagesClose"
        [messages]="messages.value"
        [eventType]="eventType.value"
        [member]="member.value"
        [islevel]="islevel.value"
        [coHostResponsibility]="coHostResponsibility.value"
        [coHost]="coHost.value"
        [startDirectMessage]="startDirectMessage.value"
        [directMessageDetails]="directMessageDetails.value"
        [updateStartDirectMessage]="updateStartDirectMessage"
        [updateDirectMessageDetails]="updateDirectMessageDetails"
        [showAlert]="showAlert"
        [roomName]="roomName.value"
        [socket]="socket.value"
        [chatSetting]="chatSetting.value"
      ></app-messages-modal>

      <app-confirm-exit-modal
        [backgroundColor]="'rgba(181, 233, 229, 0.97)'"
        [isConfirmExitModalVisible]="isConfirmExitModalVisible.value"
        [onConfirmExitClose]="onConfirmExitClose"
        [position]="'topRight'"
        [member]="member.value"
        [roomName]="roomName.value"
        [socket]="socket.value"
        [islevel]="islevel.value"
      ></app-confirm-exit-modal>

      <app-confirm-here-modal
        [backgroundColor]="'rgba(181, 233, 229, 0.97)'"
        [isConfirmHereModalVisible]="isConfirmHereModalVisible.value"
        [onConfirmHereClose]="onConfirmHereClose"
        [member]="member.value"
        [roomName]="roomName.value"
        [socket]="socket.value"
      ></app-confirm-here-modal>

      <app-share-event-modal
        [isShareEventModalVisible]="isShareEventModalVisible.value"
        [onShareEventClose]="onShareEventClose"
        [roomName]="roomName.value"
        [islevel]="islevel.value"
        [adminPasscode]="adminPasscode.value"
        [eventType]="eventType.value"
      ></app-share-event-modal>

      <app-alert-component
        [visible]="alertVisible.value"
        [message]="alertMessage.value"
        [type]="alertType.value"
        [duration]="alertDuration.value"
        [onHide]="onAlertHide"
        textColor="#ffffff"
      ></app-alert-component>

      <app-loading-modal
        [isVisible]="isLoadingModalVisible.value"
        [backgroundColor]="'rgba(217, 227, 234, 0.99)'"
        displayColor="black"
      ></app-loading-modal>
    </div>
  `,
  styles: [
    `
      .MediaSFU {
        /* Add any component-specific styles here */
      }
    `,
  ],
  providers: [CookieService],
})
export class MediasfuBroadcast implements OnInit, OnDestroy {
  @Input()
  PrejoinPage: any = WelcomePage;
  @Input() credentials: { apiUserName: string; apiKey: string } = { apiUserName: '', apiKey: '' };
  @Input() useLocalUIMode = false;
  @Input() seedData?: SeedData;
  @Input() useSeed = false;
  @Input() imgSrc = 'https://mediasfu.com/images/logo192.png';

  title = 'MediaSFU-Broadcast';


  constructor(
    private cdr: ChangeDetectorRef,
    private injector: Injector,
    
    public launchRecording: LaunchRecording,
    public startRecording: StartRecording,
    public confirmRecording: ConfirmRecording,
    public launchParticipants: LaunchParticipants,
    
  ) {}


  // Initial values and constants
  validated = new BehaviorSubject<boolean>(false);
  localUIMode = new BehaviorSubject<boolean>(false);
  socket = new BehaviorSubject<Socket>({} as Socket);
  roomName = new BehaviorSubject<string>('');
 
 
  // Sample component sizes
  componentSizes = new BehaviorSubject<ComponentSizes>({
    mainHeight: 0,
    otherHeight: 0,
    mainWidth: 0,
    otherWidth: 0,
  });

  
  // Sample function to update component sizes
  updateComponentSizes = (sizes: ComponentSizes) => {
    this.componentSizes.next(sizes);
  };

}

```

This sample code demonstrates the import and usage of various components and features for a Broadcast screen, including rendering different UI components based on the validation state, handling socket connections, displaying video streams, controlling recording, and managing component sizes.

Here's a sample usage of the control button components as used above:

```jsx
     recordButton = [
        {
          icon: this.faRecordVinyl,
          text: 'Record',
          onPress: () => {
            this.launchRecording.launchRecording({
              updateIsRecordingModalVisible: this.updateIsRecordingModalVisible.bind(this),
              isRecordingModalVisible: this.isRecordingModalVisible.value,
              showAlert: this.showAlert.bind(this),
              stopLaunchRecord: this.stopLaunchRecord.value,
              canLaunchRecord: this.canLaunchRecord.value,
              recordingAudioSupport: this.recordingAudioSupport.value,
              recordingVideoSupport: this.recordingVideoSupport.value,
              updateCanRecord: this.updateCanRecord.bind(this),
              updateClearedToRecord: this.updateClearedToRecord.bind(this),
              recordStarted: this.recordStarted.value,
              recordPaused: this.recordPaused.value,
              localUIMode: this.localUIMode.value,
            });
          },
          activeColor: 'black',
          inActiveColor: 'black',
          show: true,
        },
      ];
    
       recordButtons: MainButtonAlt[] = [];

      recordButtonsArray: MainButtonAlt[] = [
        {
          icon: this.faPlayCircle,
          active: () => !this.recordPaused.value,
          onPress: () =>
            this.updateRecording.updateRecording({
              parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
            }),
          activeColor: 'black',
          inActiveColor: 'black',
          alternateIcon: this.faPauseCircle,
          show: () => true,
        },
        {
          icon: this.faStopCircle,
          active: () => false,
          onPress: () =>
            this.stopRecording.stopRecording({
              parameters: { ...this.getAllParams(), ...this.mediaSFUFunctions() },
            }),
          activeColor: 'green',
          inActiveColor: 'black',
          show: () => true,
        },
        {
          customComponent: () => this.updateRecordTimerWidget(),
          show: () => true,
          active: () => false,
        },
        {
          icon: this.faDotCircle,
          active: () => false,
          onPress: () => console.log('Status pressed'),
          activeColor: 'black',
          inActiveColor: () => (this.recordPaused.value ? 'yellow' : 'red'),
          show: () => true,
        },
        {
          icon: this.faCog,
          active: () => false,
          onPress: () =>
            this.launchRecording.launchRecording({
              updateIsRecordingModalVisible: this.updateIsRecordingModalVisible.bind(this),
              isRecordingModalVisible: this.isRecordingModalVisible.value,
              showAlert: this.showAlert.bind(this),
              stopLaunchRecord: this.stopLaunchRecord.value,
              canLaunchRecord: this.canLaunchRecord.value,
              recordingAudioSupport: this.recordingAudioSupport.value,
              recordingVideoSupport: this.recordingVideoSupport.value,
              updateCanRecord: this.updateCanRecord.bind(this),
              updateClearedToRecord: this.updateClearedToRecord.bind(this),
              recordStarted: this.recordStarted.value,
              recordPaused: this.recordPaused.value,
              localUIMode: this.localUIMode.value,
            }),
          activeColor: 'green',
          inActiveColor: 'black',
          show: () => true,
        },
      ];

      controlBroadcastButtonsArray: ButtonTouch[] = [
          {
            icon: this.faUsers,
            active: true,
            alternateIcon: this.faUsers,
            onPress: () =>
              this.launchParticipants.launchParticipants({
                updateIsParticipantsModalVisible: this.updateIsParticipantsModalVisible.bind(this),
                isParticipantsModalVisible: this.isParticipantsModalVisible.value,
              }),
            activeColor: 'black',
            inActiveColor: 'black',
            show: () => this.islevel.value == '2',
          },
          {
            icon: this.faShareAlt,
            active: true,
            alternateIcon: this.faShareAlt,
            onPress: () => this.updateIsShareEventModalVisible(!this.isShareEventModalVisible.value),
            activeColor: 'black',
            inActiveColor: 'black',
            show: () => true,
          },
          {
            customComponent: this.messageWidget,
            onPress: () =>
              this.launchMessages.launchMessages({
                updateIsMessagesModalVisible: this.updateIsMessagesModalVisible.bind(this),
                isMessagesModalVisible: this.isMessagesModalVisible.value,
              }),
            show: () => true,
          },
          {
            icon: this.faSync,
            active: true,
            alternateIcon: this.faSync,
            onPress: () =>
              this.switchVideoAlt.switchVideoAlt({
                parameters: {
                  ...this.getAllParams(),
                  ...this.mediaSFUFunctions(),
                },
              }),
            activeColor: 'black',
            inActiveColor: 'black',
            show: () => this.islevel.value == '2',
          },
          {
            icon: this.faVideoSlash,
            alternateIcon: this.faVideo,
            active: () => this.videoActive.value,
            onPress: () =>
              this.clickVideo.clickVideo({
                parameters: {
                  ...this.getAllParams(),
                  ...this.mediaSFUFunctions(),
                },
              }),
            show: () => this.islevel.value == '2',
            activeColor: 'green',
            inActiveColor: 'red',
          },
          {
            icon: this.faMicrophoneSlash,
            alternateIcon: this.faMicrophone,
            active: () => this.micActive.value,
            onPress: () =>
              this.clickAudio.clickAudio({
                parameters: {
                  ...this.getAllParams(),
                  ...this.mediaSFUFunctions(),
                },
              }),
            activeColor: 'green',
            inActiveColor: 'red',
            show: () => this.islevel.value == '2',
          },
          {
            customComponent: () => this.menuParticipantsWidget,
            show: () => this.islevel.value == '2',
          },
          {
            icon: this.faPhone,
            active: this.endCallActive.value,
            onPress: () =>
              this.launchConfirmExit.launchConfirmExit({
                updateIsConfirmExitModalVisible: this.updateIsConfirmExitModalVisible.bind(this),
                isConfirmExitModalVisible: this.isConfirmExitModalVisible.value,
              }),
            activeColor: 'green',
            inActiveColor: 'red',
            show: () => true,
          },
          {
            icon: this.faPhone,
            active: this.endCallActive.value,
            onPress: () => console.log('End Call pressed'),
            activeColor: 'transparent',
            inActiveColor: 'transparent',
            backgroundColor: { default: 'transparent' },
            show: () => false,
          },
        ];
```

This sample code defines arrays `recordButtons` and `controlBroadcastButtons`, each containing configuration objects for different control buttons. These configurations include properties such as icon, active state, onPress function, activeColor, inActiveColor, and show flag to control the visibility of each button.

You can customize these configurations according to your requirements, adding, removing, or modifying buttons as needed. Additionally, you can refer to the relevant component files (`ControlButtonsAltComponent` and `ControlButtonsComponentTouch`) for more details on how to add custom buttons.

<div style="text-align: center;">
  Preview of Broadcast Page

<img src="https://mediasfu.com/images/broadcast.png" alt="Preview of Welcome Page" title="Welcome Page" style="max-height: 500px;">

<!-- Add a blank line for spacing -->
&nbsp;
  
  Preview of Conference Page

<img src="https://mediasfu.com/images/conference1.png" alt="Preview of Prejoin Page" title="Prejoin Page" style="max-height: 500px;">


### Preview of Conference Page's Mini Grids

<img src="https://mediasfu.com/images/conference2.png" alt="Preview of Prejoin Page" title="Prejoin Page" style="max-height: 500px;">

</div>
<br />


# Advanced Usage Guide <a name="advanced-usage-guide"></a>

In-depth documentation for advanced users, covering complex functionalities and customization options.

**Introduction to Advanced Media Control Functions:**

In advanced usage scenarios, users often encounter complex tasks related to media control, connectivity, and streaming management within their applications. To facilitate these tasks, a comprehensive set of functions is provided, offering granular control over various aspects of media handling and communication with servers.

These advanced media control functions encompass a wide range of functionalities, including connecting to and disconnecting from WebSocket servers, joining and updating room parameters, managing device creation, switching between different media streams, handling permissions, processing consumer transports, managing screen sharing, adjusting layouts dynamically, and much more.

This robust collection of functions empowers developers to tailor their applications to specific requirements, whether it involves intricate media streaming setups, real-time communication protocols, or sophisticated user interface interactions. With these tools at their disposal, developers can create rich and responsive media experiences that meet the demands of their users and applications.

Here's a tabulated list of advanced control functions along with brief explanations (click the function(link) for full usage guide):

| Function                         | Explanation                                                                                             |
|----------------------------------|---------------------------------------------------------------------------------------------------------|
| [`connectSocket`](https://www.mediasfu.com/angular/classes/connectSocket)                  | Connects to the WebSocket server.                                                                       |
| [`disconnectSocket`](https://www.mediasfu.com/angular/classes/disconnectSocket)               | Disconnects from the WebSocket server.                                                                  |
| [`joinRoomClient`](https://www.mediasfu.com/angular/classes/joinRoomClient)                 | Joins a room as a client.                                                                               |
| [`updateRoomParametersClient`](https://www.mediasfu.com/angular/classes/updateRoomParametersClient)     | Updates room parameters as a client.                                                                    |
| [`createDeviceClient`](https://www.mediasfu.com/angular/classes/createDeviceClient)             | Creates a device as a client.                                                                           |
| [`switchVideoAlt`](https://www.mediasfu.com/angular/classes/switchVideoAlt)                 | Switches video/camera streams.                                                                          |
| [`clickVideo`](https://www.mediasfu.com/angular/classes/clickVideo)                     | Handles clicking on video controls.                                                                     |
| [`clickAudio`](https://www.mediasfu.com/angular/classes/clickAudio)                     | Handles clicking on audio controls.                                                                     |
| [`clickScreenShare`](https://www.mediasfu.com/angular/classes/clickScreenShare)               | Handles clicking on screen share controls.                                                              |
| [`streamSuccessVideo`](https://www.mediasfu.com/angular/classes/streamSuccessVideo)             | Handles successful video streaming.                                                                     |
| [`streamSuccessAudio`](https://www.mediasfu.com/angular/classes/streamSuccessAudio)             | Handles successful audio streaming.                                                                     |
| [`streamSuccessScreen`](https://www.mediasfu.com/angular/classes/streamSuccessScreen)            | Handles successful screen sharing.                                                                      |
| [`streamSuccessAudioSwitch`](https://www.mediasfu.com/angular/classes/streamSuccessAudioSwitch)       | Handles successful audio switching.                                                                     |
| [`checkPermission`](https://www.mediasfu.com/angular/classes/checkPermission)                | Checks for media access permissions.                                                                    |
| [`producerClosed`](https://www.mediasfu.com/angular/classes/producerClosed)                 | Handles the closure of a producer.                                                                      |
| [`newPipeProducer`](https://www.mediasfu.com/angular/classes/newPipeProducer)                | Creates receive transport for a new piped producer.                                                     |
| [`updateMiniCardsGrid`](https://www.mediasfu.com/angular/classes/updateMiniCardsGrid)            | Updates the mini-grids (mini cards) grid.                                                               |
| [`mixStreams`](https://www.mediasfu.com/angular/classes/mixStreams)                     | Mixes streams and prioritizes interesting ones together.                                                |
| [`dispStreams`](https://www.mediasfu.com/angular/classes/dispStreams)                    | Displays streams (media).                                                                              |
| [`stopShareScreen`](https://www.mediasfu.com/angular/classes/stopShareScreen)                | Stops screen sharing.                                                                                  |
| [`checkScreenShare`](https://www.mediasfu.com/angular/classes/checkScreenShare)               | Checks for screen sharing availability.                                                                |
| [`startShareScreen`](https://www.mediasfu.com/angular/classes/startShareScreen)               | Starts screen sharing.                                                                                 |
| [`requestScreenShare`](https://www.mediasfu.com/angular/classes/requestScreenShare)             | Requests permission for screen sharing.                                                                |
| [`reorderStreams`](https://www.mediasfu.com/angular/classes/reorderStreams)                 | Reorders streams (based on interest level).                                                            |
| [`prepopulateUserMedia`](https://www.mediasfu.com/angular/classes/prepopulateUserMedia)           | Populates user media (for main grid).                                                                  |
| [`getVideos`](https://www.mediasfu.com/angular/classes/getVideos)                      | Retrieves videos that are pending.                                                                     |
| [`rePort`](https://www.mediasfu.com/angular/classes/rePort)                         | Handles re-porting (updates of changes in UI when recording).                                           |
| [`trigger`](https://www.mediasfu.com/angular/classes/trigger)                        | Triggers actions (reports changes in UI to backend for recording).                                      |
| [`consumerResume`](https://www.mediasfu.com/angular/classes/consumerResume)                 | Resumes consumers.                                                                                     |
| [`connectSendTransportAudio`](https://www.mediasfu.com/angular/classes/connectSendTransportAudio)      | Connects send transport for audio.                                                                     |
| [`connectSendTransportVideo`](https://www.mediasfu.com/angular/classes/connectSendTransportVideo)      | Connects send transport for video.                                                                     |
| [`connectSendTransportScreen`](https://www.mediasfu.com/angular/classes/connectSendTransportScreen)    | Connects send transport for screen sharing.                                                            |
| [`processConsumerTransports`](https://www.mediasfu.com/angular/classes/processConsumerTransports)      | Processes consumer transports to pause/resume based on the current active page.                         |
| [`resumePauseStreams`](https://www.mediasfu.com/angular/classes/resumePauseStreams)             | Resumes or pauses streams.                                                                             |
| [`readjust`](https://www.mediasfu.com/angular/classes/readjust)                       | Readjusts display elements.                                                                            |
| [`checkGrid`](https://www.mediasfu.com/angular/classes/checkGrid)                      | Checks the grid sizes to display.                                                                      |
| [`getEstimate`](https://www.mediasfu.com/angular/classes/getEstimate)                    | Gets an estimate of grids to add.                                                                      |
| [`calculateRowsAndColumns`](https://www.mediasfu.com/angular/classes/calculateRowsAndColumns)        | Calculates rows and columns for the grid.                                                              |
| [`addVideosGrid`](https://www.mediasfu.com/angular/classes/addVideosGrid)                  | Adds videos to the grid.                                                                               |
| [`onScreenChanges`](https://www.mediasfu.com/angular/classes/onScreenChanges)                | Handles screen changes (orientation and resize).                                                        |
| [`sleep`](https://www.mediasfu.com/angular/classes/sleep)                          | Pauses execution for a specified duration.                                                             |
| [`changeVids`](https://www.mediasfu.com/angular/classes/changeVids)                     | Changes videos.                                                                                        |
| [`compareActiveNames`](https://www.mediasfu.com/angular/classes/compareActiveNames)             | Compares active names (for recording UI changes reporting).                                             |
| [`compareScreenStates`](https://www.mediasfu.com/angular/classes/compareScreenStates)           | Compares screen states (for recording changes in grid sizes reporting).                                 |
| [`createSendTransport`](https://www.mediasfu.com/angular/classes/createSendTransport)            | Creates a send transport.                                                                              |
| [`resumeSendTransportAudio`](https://www.mediasfu.com/angular/classes/resumeSendTransportAudio)       | Resumes a send transport for audio.                                                                    |
| [`receiveAllPipedTransports`](https://www.mediasfu.com/angular/classes/receiveAllPipedTransports)      | Receives all piped transports.                                                                         |
| [`disconnectSendTransportVideo`](https://www.mediasfu.com/angular/classes/disconnectSendTransportVideo)   | Disconnects send transport for video.                                                                  |
| [`disconnectSendTransportAudio`](https://www.mediasfu.com/angular/classes/disconnectSendTransportAudio)   | Disconnects send transport for audio.                                                                  |
| [`disconnectSendTransportScreen`](https://www.mediasfu.com/angular/classes/disconnectSendTransportScreen)  | Disconnects send transport for screen sharing.                                                         |
| [`connectSendTransport`](https://www.mediasfu.com/angular/classes/connectSendTransport)           | Connects a send transport.                                                                             |
| [`getPipedProducersAlt`](https://www.mediasfu.com/angular/classes/getPipedProducersAlt)           | Gets piped producers.                                                                                  |
| [`signalNewConsumerTransport`](https://www.mediasfu.com/angular/classes/signalNewConsumerTransport)     | Signals a new consumer transport.                                                                      |
| [`connectRecvTransport`](https://www.mediasfu.com/angular/classes/connectRecvTransport)           | Connects a receive transport.                                                                          |
| [`reUpdateInter`](https://www.mediasfu.com/angular/classes/reUpdateInter)                   | Re-updates the interface based on audio decibels.                                                      |
| [`updateParticipantAudioDecibels`](https://www.mediasfu.com/angular/classes/updateParticipantAudioDecibels) | Updates participant audio decibels.                                                                    |
| [`closeAndResize`](https://www.mediasfu.com/angular/classes/closeAndResize)                 | Closes and resizes the media elements.                                                                 |
| [`autoAdjust`](https://www.mediasfu.com/angular/classes/autoAdjust)                     | Automatically adjusts display elements.                                                                 |
| [`switchUserVideoAlt`](https://www.mediasfu.com/angular/classes/switchUserVideoAlt)             | Switches user video (alternate) (back/front).                                                          |
| [`switchUserVideo`](https://www.mediasfu.com/angular/classes/switchUserVideo)                | Switches user video (specific video id).                                                               |
| [`switchUserAudio`](https://www.mediasfu.com/angular/classes/switchUserAudio)                | Switches user audio.                                                                                   |
| [`receiveRoomMessages`](https://www.mediasfu.com/angular/classes/receiveRoomMessages)            | Receives room messages.                                                                                |
| [`formatNumber`](https://www.mediasfu.com/angular/classes/formatNumber)                   | Formats a number (for broadcast viewers).                                                              |
| [`connectIps`](https://www.mediasfu.com/angular/classes/connectIps)                     | Connects IPs (connect to consuming servers)                                                            |
| [`startMeetingProgressTimer`](https://www.mediasfu.com/angular/classes/startMeetingProgressTimer)      | Starts the meeting progress timer.       |
| [`stopRecording`](https://www.mediasfu.com/angular/classes/stopRecording)                  | Stops the recording process. |
| [`pollUpdated`](https://www.mediasfu.com/angular/classes/pollUpdated)                    | Handles updated poll data. |
| [`handleVotePoll`](https://www.mediasfu.com/angular/classes/handleVotePoll)                 | Handles voting in a poll. |
| [`handleCreatePoll`](https://www.mediasfu.com/angular/classes/handleCreatePoll)               | Handles creating a poll. |
| [`handleEndPoll`](https://www.mediasfu.com/angular/classes/handleEndPoll)                 | Handles ending a poll. |
| [`breakoutRoomUpdated`](https://www.mediasfu.com/angular/classes/breakoutRoomUpdated)           | Handles updated breakout room data. |
| [`captureCanvasStream`](https://www.mediasfu.com/angular/classes/captureCanvasStream)            | Captures a canvas stream. |
| [`resumePauseAudioStreams`](https://www.mediasfu.com/angular/classes/resumePauseAudioStreams)        | Resumes or pauses audio streams. |
| [`processConsumerTransportsAudio`](https://www.mediasfu.com/angular/classes/processConsumerTransportsAudio)  | Processes consumer transports for audio. |


### Room Socket Events

In the context of a room's real-time communication, various events occur, such as user actions, room management updates, media controls, and meeting status changes. To effectively handle these events and synchronize the application's state with the server, specific functions are provided. These functions act as listeners for socket events, allowing the application to react accordingly.

#### Provided Socket Event Handling Functions:

| Function                      | Explanation                                                                                             |
|-------------------------------|---------------------------------------------------------------------------------------------------------|
| [`userWaiting`](https://www.mediasfu.com/angular/classes/userWaiting)                 | Triggered when a user is waiting.                                                                       |
| [`personJoined`](https://www.mediasfu.com/angular/classes/personJoined)                | Triggered when a person joins the room.                                                                 |
| [`allWaitingRoomMembers`](https://www.mediasfu.com/angular/classes/allWaitingRoomMembers)       | Triggered when information about all waiting room members is received.                                  |
| [`roomRecordParams`](https://www.mediasfu.com/angular/classes/roomRecordParams)            | Triggered when room recording parameters are received.                                                  |
| [`banParticipant`](https://www.mediasfu.com/angular/classes/banParticipant)              | Triggered when a participant is banned.                                                                 |
| [`updatedCoHost`](https://www.mediasfu.com/angular/classes/updatedCoHost)               | Triggered when the co-host information is updated.                                                      |
| [`participantRequested`](https://www.mediasfu.com/angular/classes/participantRequested)        | Triggered when a participant requests access.                                                            |
| [`screenProducerId`](https://www.mediasfu.com/angular/classes/screenProducerId)            | Triggered when the screen producer ID is received.                                                       |
| [`updateMediaSettings`](https://www.mediasfu.com/angular/classes/updateMediaSettings)         | Triggered when media settings are updated.                                                               |
| [`producerMediaPaused`](https://www.mediasfu.com/angular/classes/producerMediaPaused)         | Triggered when producer media is paused.                                                                 |
| [`producerMediaResumed`](https://www.mediasfu.com/angular/classes/producerMediaResumed)        | Triggered when producer media is resumed.                                                                |
| [`producerMediaClosed`](https://www.mediasfu.com/angular/classes/producerMediaClosed)         | Triggered when producer media is closed.                                                                 |
| [`controlMediaHost`](https://www.mediasfu.com/angular/classes/controlMediaHost)            | Triggered when media control is hosted.                                                                  |
| [`meetingEnded`](https://www.mediasfu.com/angular/classes/meetingEnded)                | Triggered when the meeting ends.                                                                         |
| [`disconnectUserSelf`](https://www.mediasfu.com/angular/classes/disconnectUserSelf)          | Triggered when a user disconnects.                                                                       |
| [`receiveMessage`](https://www.mediasfu.com/angular/classes/receiveMessage)              | Triggered when a message is received.                                                                    |
| [`meetingTimeRemaining`](https://www.mediasfu.com/angular/classes/meetingTimeRemaining)        | Triggered when meeting time remaining is received.                                                        |
| [`meetingStillThere`](https://www.mediasfu.com/angular/classes/meetingStillThere)           | Triggered when the meeting is still active.                                                              |
| [`startRecords`](https://www.mediasfu.com/angular/classes/startRecords)                | Triggered when recording starts.                                                                         |
| [`reInitiateRecording`](https://www.mediasfu.com/angular/classes/reInitiateRecording)         | Triggered when recording needs to be re-initiated.                                                       |
| [`getDomains`](https://www.mediasfu.com/angular/classes/getDomains)                  | Triggered when domains are received.                                                                     |
| [`updateConsumingDomains`](https://www.mediasfu.com/angular/classes/updateConsumingDomains)      | Triggered when consuming domains are updated.                                                            |
| [`recordingNotice`](https://www.mediasfu.com/angular/classes/recordingNotice)             | Triggered when a recording notice is received.                                                           |
| [`timeLeftRecording`](https://www.mediasfu.com/angular/classes/timeLeftRecording)           | Triggered when time left for recording is received.                                                       |
| [`stoppedRecording`](https://www.mediasfu.com/angular/classes/stoppedRecording)           | Triggered when recording stops.                                                                          |
| [`hostRequestResponse`](https://www.mediasfu.com/angular/classes/hostRequestResponse)         | Triggered when the host request response is received.                                                    |
| [`allMembers`](https://www.mediasfu.com/angular/classes/allMembers)                  | Triggered when information about all members is received.                                                 |
| [`allMembersRest`](https://www.mediasfu.com/angular/classes/allMembersRest)              | Triggered when information about all members is received (rest of the members).                           |
| [`disconnect`](https://www.mediasfu.com/angular/classes/disconnect)                  | Triggered when a disconnect event occurs.                                                                |
| [`pollUpdated`](https://www.mediasfu.com/angular/classes/pollUpdated)                 | Triggered when a poll is updated.                                                                        |
| [`breakoutRoomUpdated`](https://www.mediasfu.com/angular/classes/breakoutRoomUpdated)         | Triggered when a breakout room is updated.  
| [`whiteboardUpdated`](https://www.mediasfu.com/angular/classes/whiteboardUpdated)            | Handles updated whiteboard data. 
| [`whiteboardAction`](https://www.mediasfu.com/angular/classes/whiteboardAction)              | Handles whiteboard actions. |       

#### Sample Usage

```javascript
// Example usage of provided socket event handling functions

// your-component.component.ts
import { Component, OnInit } from '@angular/core';
import { 
  ParticipantRequested, 
  ScreenProducerId, 
  UpdateMediaSettings 
} from 'mediasfu-angular';

@Component({
  selector: 'app-your-component',
  standalone: true,
  imports: [
    // Import necessary MediasfuAngular components if any
  ],
  template: `
    <!-- Your component template goes here -->
  `,
  providers: [
    ParticipantRequested,
    ScreenProducerId,
    UpdateMediaSettings,
    // Add other providers as needed
  ],
})

export class YourComponent implements OnInit {
  // Inject MediasfuAngular services as public properties
  constructor(
    public participantRequested: ParticipantRequested,
    public screenProducerId: ScreenProducerId,
    public updateMediaSettings: UpdateMediaSettings,
    // Inject other services if necessary
  ) {}
 

 // truncated and simplified for brevity

  this.socket.value.on(
    'participantRequested',
    async ({ userRequest }: { userRequest: Request }) => {
      await this.participantRequested.participantRequested({
        userRequest,
        requestList: this.requestList.value,
        waitingRoomList: this.waitingRoomList.value,
        updateTotalReqWait: this.updateTotalReqWait.bind(this),
        updateRequestList: this.updateRequestList.bind(this),
      });
    },
  );

  this.socket.value.on('screenProducerId', async ({ producerId }: { producerId: string }) => {
    this.screenProducerId.screenProducerId({
      producerId,
      screenId: this.screenId.value,
      membersReceived: this.membersReceived.value,
      shareScreenStarted: this.shareScreenStarted.value,
      deferScreenReceived: this.deferScreenReceived.value,
      participants: this.participants.value,
      updateScreenId: this.updateScreenId.bind(this),
      updateShareScreenStarted: this.updateShareScreenStarted.bind(this),
      updateDeferScreenReceived: this.updateDeferScreenReceived.bind(this),
    });
  });


  this.socket.value.on('updateMediaSettings', async ({ settings }: { settings: Settings }) => {
    this.updateMediaSettings.updateMediaSettings({
      settings,
      updateAudioSetting: this.updateAudioSetting.bind(this),
      updateVideoSetting: this.updateVideoSetting.bind(this),
      updateScreenshareSetting: this.updateScreenshareSetting.bind(this),
      updateChatSetting: this.updateChatSetting.bind(this),
    });
  });

}
```

These functions enable seamless interaction with the server and ensure that the application stays synchronized with the real-time events occurring within the room.

### Customizing Media Display in MediaSFU

By default, media display in MediaSFU is handled by the following key functions:

- **`prepopulateUserMedia`**: This function controls the main media grid, such as the host's video in webinar or broadcast views (MainGrid).
- **`addVideosGrid`**: This function manages the mini grid's media, such as participants' media in MiniGrid views (MiniCards, AudioCards, VideoCards).

#### Customizing the Media Display

If you want to modify the default content displayed by MediaSFU components, such as the `MiniCard`, `AudioCard`, or `VideoCard`, you can replace the default UI with your own custom components.

To implement your custom UI for media display:

1. **Custom MainGrid (Host's Video)**: 
   - Modify the UI in the `prepopulateUserMedia` function. 
   - Example link to MediaSFU's default implementation: [`prepopulateUserMedia`](https://github.com/MediaSFU/MediaSFU-Angular/tree/main/src/lib/consumers/prepopulate-user-media.service.ts).

2. **Custom MiniGrid (Participants' Media)**:
   - Modify the UI in the `addVideosGrid` function.
   - Example link to MediaSFU's default implementation: [`addVideosGrid`](https://github.com/MediaSFU/MediaSFU-Angular/tree/main/src/lib/consumers/add-videos-grid.service.ts).

To create a custom UI, you can refer to existing MediaSFU implementations like:

- [MediasfuGeneric](https://github.com/MediaSFU/MediaSFU-Angular/tree/main/src/lib/components/mediasfu-components/mediasfu-generic.component.ts)
- [MediasfuBroadcast](https://github.com/MediaSFU/MediaSFU-Angular/tree/main/src/lib/components/mediasfu-components/mediasfu-broadcast.component.ts)

Once your custom components are built, modify the imports of `prepopulateUserMedia` and `addVideosGrid` to point to your custom implementations instead of the default MediaSFU ones.

This allows for full flexibility in how media is displayed in both the main and mini grids, giving you the ability to tailor the user experience to your specific needs.


# API Reference <a name="api-reference"></a>

For detailed information on the API methods and usage, please refer to the [MediaSFU API Documentation](https://mediasfu.com/developers).

If you need further assistance or have any questions, feel free to ask!

For sample codes and practical implementations, visit the [MediaSFU Sandbox](https://www.mediasfu.com/sandbox).

# Troubleshooting <a name="troubleshooting"></a>

1. **Optimizing HTML Configuration**:
   If users experience responsiveness issues, whether during local development or in production, they can optimize their HTML configuration to ensure proper scaling and viewport settings. By adding the following meta tag to the HTML `<head>` section, users can specify viewport settings for optimal display:
   ```html
   <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
   ```

2. **Issues with Starting User Media (Audio/Video)**:
   If users encounter issues with starting user media (audio/video), they should try running in HTTPS mode. To enable HTTPS mode, users can modify their start script using:
   ```json
       ng serve --ssl true
   ```

3. **Handling Overflow in Prebuilt Components**:
    If users experience overflow issues when using any of the prebuilt MediaSFU components such as app-mediasfu-generic, app-mediasfu-broadcast, app-mediasfu-chat, etc., they can add a CSS rule in their main styles.css file to manage component dimensions and overflow behavior. For example, to handle overflow in the generic component, users can add:
  
    ```css
       app-mediasfu-generic {
          flex: 1;
          width: 100%;
          max-width: 100%;
          overflow: auto;
        }

        app-mediasfu-chat {
          flex: 1;
          width: 100%;
          max-width: 100%;
          overflow: auto;
        }

        // same for rest
      ```


4. **Interactive Testing with MediaSFU's Frontend**:
   Users can interactively join MediaSFU's frontend in the same room to analyze if various events or media transmissions are happening as expected. For example, adding a user there to check changes made by the host and vice versa.

These troubleshooting steps should help users address common issues and optimize their experience with MediaSFU. If the issues persist or additional assistance is needed, users can refer to the [documentation](https://mediasfu.com/docs) or reach out to the support team for further assistance.

<div style="text-align: center;">

https://github.com/MediaSFU/MediaSFU-ReactJS/assets/157974639/a6396722-5b2f-4e93-a5b3-dd53ffd20eb7

</div>

# Contributing <a name="contributing"></a>

We welcome contributions from the community to improve the project! If you'd like to contribute, please check out our [GitHub repository](https://github.com/MediaSFU-Angular) and follow the guidelines outlined in the README.

If you encounter any issues or have suggestions for improvement, please feel free to open an issue on GitHub.

We appreciate your interest in contributing to the project!

If you need further assistance or have any questions, feel free to ask!
```



