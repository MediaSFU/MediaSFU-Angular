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

---

# MediaSFU Angular Module Documentation

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

## Installation

Instructions on how to install the module using npm.

1. **Add the package to your project**

    ```bash
    npm install mediasfu-angular
    ```

2. **Bootstrap Integration**

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


3. **Configure MediaSFU's PreJoinPage Requirements**

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
 
4. **Obtain an API key from MediaSFU.** You can get your API key by signing up or logging into your account at [mediasfu.com](https://www.mediasfu.com/).

    <div style="background-color:#f0f0f0; padding: 10px; border-radius: 5px;">
      <h4 style="color:#d9534f;">Important:</h4>
      <p style="font-size: 1.2em;">You must obtain an API key from <a href="https://www.mediasfu.com/">mediasfu.com</a> to use this package.</p>
    </div>



# Basic Usage Guide <a name="basic-usage-guide"></a>

A basic guide on how to use the module for common tasks.

This section will guide users through the initial setup and installation of the npm module.

*If users are interested in the Android/iOS (mobile) versions, they can refer to the Expo React Native project that is configured to produce both web and mobile apps. The source code for this project is available on GitHub at [*MediaSFU/MediaSFU*](https://github.com/MediaSFU/MediaSFU)*. 

*For the community edition, users can visit the GitHub repository at [*MediaSFU/MediaSFUOpen*](https://github.com/MediaSFU/MediaSFUOpen)*.

*Users can follow the instructions provided in the README of the respective GitHub repositories to set up and install the projects for both web and mobile platforms, ensuring a consistent user experience across different platforms*.

*Users can follow the instructions provided here and in the README of the GitHub repository to set up and install the project for both web and mobile platforms using Expo. This allows for seamless development and deployment across multiple platforms, ensuring a consistent user experience*.

## Introduction

MediaSFU is a 2-page application consisting of a prejoin/welcome page and the main events room page. This guide will walk you through the basic usage of the module for setting up these pages.

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

```javascript
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
 ```

### IP Blockage Warning And Local UI Development

Entering the event room without the correct credentials may result in IP blockage, as the page automatically attempts to connect with MediaSFU servers, which rate limit bad requests based on IP address.

If users attempt to enter the event room without valid credentials or tokens, it may lead to IP blockage due to MediaSFU servers' rate limiting mechanism. To avoid unintentional connections to MediaSFU servers during UI development, users can pass the `useLocalUIMode` parameter as `true`.

In this mode, the module will operate locally without making requests to MediaSFU servers. However, to render certain UI elements such as messages, participants, requests, etc., users may need to provide seed data. They can achieve this by importing random data generators and passing the generated data to the event room component.

### Example for Generic UI to Render Broadcast Room

```javascript

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

```javascript
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


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    MediasfuGeneric,
    MediasfuBroadcast,
    MediasfuChat,
    MediasfuWebinar,
    MediasfuConference,
    PreJoinPage,
  ],
  template: `
    <app-mediasfu-generic [PrejoinPage]="PreJoinPage" [credentials]="credentials"></app-mediasfu-generic>

    <!--
    Welcome to the Mediasfu Angular Application!

    Below are different use cases you can run. Uncomment the one you want to try.

    1. Simple Use Case (Welcome Page)
       - Renders the default welcome page.
       - No additional inputs required.

    <app-mediasfu-generic></app-mediasfu-generic>

    -------------------------------------------------

    2. Use Case with Pre-Join Page (Credentials Required)
       - Uses a pre-join page that requires users to enter credentials.
       - Provide your Mediasfu API username and key in the 'credentials' object.

    <app-mediasfu-generic
      [PrejoinPage]="PreJoinPage"
      [credentials]="credentials"
    ></app-mediasfu-generic>

    -------------------------------------------------

    3. Use Case with Local UI Mode (Seed Data Required)
       - Runs the application in local UI mode using seed data.
       - Set 'useSeed' to true and provide seed data in 'seedData'.

    <app-mediasfu-generic
      [useLocalUIMode]="true"
      [useSeed]="true"
      [seedData]="seedData"
    ></app-mediasfu-generic>

    -------------------------------------------------

    4. Use Specific Event Type Components
       - Uncomment the component corresponding to the event type you want to use.
       - Options are 'broadcast', 'chat', 'webinar', 'conference'.
       - Remember to set the 'eventType' property in the class.

    Example for 'broadcast':

    <app-mediasfu-broadcast
      [credentials]="credentials"
      [useLocalUIMode]="useLocalUIMode"
      [useSeed]="useSeed"
      [seedData]="useSeed ? seedData : {}"
    ></app-mediasfu-broadcast>

    -->

    <!-- Uncomment one of the options below to run the corresponding use case -->

    <!-- Simple Use Case (Welcome Page) -->
    <!--
    <app-mediasfu-generic></app-mediasfu-generic>
    -->

    <!-- Use Case with Pre-Join Page (Credentials Required) -->
    <!--
    <app-mediasfu-generic
      [PrejoinPage]="PreJoinPage"
      [credentials]="credentials"
    ></app-mediasfu-generic>
    -->

    <!-- Use Case with Local UI Mode (Seed Data Required) -->
    <!--
    <app-mediasfu-generic
      [useLocalUIMode]="true"
      [useSeed]="true"
      [seedData]="seedData"
    ></app-mediasfu-generic>
    -->

    <!-- MediasfuBroadcast Component -->
    <!-- Uncomment to use the broadcast event type -->
    <!--
    <app-mediasfu-broadcast
      [credentials]="credentials"
      [useLocalUIMode]="useLocalUIMode"
      [useSeed]="useSeed"
      [seedData]="useSeed ? seedData : {}"
    ></app-mediasfu-broadcast>
    -->

    <!-- MediasfuChat Component -->
    <!-- Uncomment to use the chat event type -->
    <!--
    <app-mediasfu-chat
      [credentials]="credentials"
      [useLocalUIMode]="useLocalUIMode"
      [useSeed]="useSeed"
      [seedData]="useSeed ? seedData : {}"
    ></app-mediasfu-chat>
    -->

    <!-- MediasfuWebinar Component -->
    <!-- Uncomment to use the webinar event type -->
    <!--
    <app-mediasfu-webinar
      [credentials]="credentials"
      [useLocalUIMode]="useLocalUIMode"
      [useSeed]="useSeed"
      [seedData]="useSeed ? seedData : {}"
    ></app-mediasfu-webinar>
    -->

    <!-- MediasfuConference Component -->
    <!-- Uncomment to use the conference event type -->
    <!--
    <app-mediasfu-conference
      [credentials]="credentials"
      [useLocalUIMode]="useLocalUIMode"
      [useSeed]="useSeed"
      [seedData]="useSeed ? seedData : {}"
    ></app-mediasfu-conference>
    -->
  `
})
export class AppComponent implements OnInit {
  // Reference to the PreJoinPage component
  PreJoinPage = PreJoinPage;

  // Mediasfu account credentials
  // Replace 'your_api_username' and 'your_api_key' with your actual credentials
  // Only if you are using the PreJoinPage component
  credentials = {
    apiUserName: 'your_api_username',
    apiKey: 'your_api_key',
  };

  // Whether to use seed data for generating random participants and messages
  // Set to true if you want to run the application in local UI mode with seed data
  useSeed = false;
  seedData: any = {};

  // Event type ('broadcast', 'chat', 'webinar', 'conference')
  // Set this to match the component you are using
  eventType: string = 'broadcast';

  // Whether to use local UI mode (prevents requests to Mediasfu servers)
  // Automatically set to true if 'useSeed' is true
  useLocalUIMode: boolean = false;

  // Inject the services in the constructor
  constructor(
    private generateRandomParticipants: GenerateRandomParticipants,
    private generateRandomMessages: GenerateRandomMessages,
    private generateRandomRequestList: GenerateRandomRequestList,
    private generateRandomWaitingRoomList: GenerateRandomWaitingRoomList
  ) { }

  ngOnInit(): void {
    // If using seed data, generate random participants and messages
    if (this.useSeed) {
      const memberName = 'Prince';
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

In the Intermediate Usage Guide, we'll explore the core components and functionalities of the MediaSFU Angular module, focusing on media display, controls, and modal interactions.

#### Core Components Overview

The main items displayed on an event page are media components (such as video, audio, and blank cards) and control components (for pagination, navigation, etc.).

##### Media Display Components:

| Component Name           | Description                                                                                     |
|--------------------------|-------------------------------------------------------------------------------------------------|
| **Main Aspect Component**| Serves as a container for the primary aspect of the user interface, typically containing the main content or focus of the application. |
| **Main Screen Component**| Responsible for rendering the main screen layout of the application, providing the foundation for displaying various elements and content. |
| **Main Grid Component**  | Crucial part of the user interface, organizing and displaying primary content or elements in a grid layout format. |
| **Sub Aspect Component** | Acts as a secondary container within the user interface, often housing additional elements or controls related to the main aspect. |
| **Main Container Component** | Primary container for the application's content, encapsulating all major components and providing structural organization. |
| **Other Grid Component** | Complements the Main Grid Component by offering additional grid layouts, typically used for displaying secondary or auxiliary content. |

### Control Components:

| Component Name                | Description                                                                                     |
|-------------------------------|-------------------------------------------------------------------------------------------------|
| **Control Buttons Component** | Comprises a set of buttons or controls used for navigating, interacting, or managing various aspects of the application's functionality. |
| **Control Buttons Alt Component** | Provides alternative button configurations or styles for controlling different aspects of the application. |
| **Control Buttons Component Touch** | Specialized component designed for touch-enabled devices, offering floating buttons or controls for intuitive interaction with the application's features. |

These components collectively contribute to the overall user interface, facilitating navigation, interaction, and content display within the application.

##### Modal Components:

| Modal Component | Description |
|-----------------|-------------|
| LoadingModal | Modal for displaying loading indicator during data fetching or processing. |
| MainAspectComponent | Component responsible for displaying the main aspect of the event page. |
| ControlButtonsComponent | Component for displaying control buttons such as pagination controls. |
| ControlButtonsAltComponent | Alternate control buttons component for specific use cases. |
| ControlButtonsComponentTouch | Touch-enabled control buttons component for mobile devices. |
| OthergridComponent | Component for displaying additional grid elements on the event page. |
| MainScreenComponent | Component for rendering the main screen content of the event. |
| MainGridComponent | Main grid component for displaying primary event content. |
| SubAspectComponent | Component for displaying secondary aspects of the event page. |
| MainContainerComponent | Main container component for the event page content. |
| AlertComponent | Modal for displaying alert messages to the user. |
| MenuModal | Modal for displaying a menu with various options. |
| RecordingModal | Modal for managing recording functionality during the event. |
| RequestsModal | Modal for handling requests from participants during the event. |
| WaitingRoomModal | Modal for managing waiting room functionality during the event. |
| DisplaySettingsModal | Modal for adjusting display settings during the event. |
| EventSettingsModal | Modal for configuring event settings. |
| CoHostModal | Modal for managing co-host functionality during the event. |
| ParticipantsModal | Modal for displaying participant information and controls. |
| MessagesModal | Modal for managing messages and chat functionality during the event. |
| MediaSettingsModal | Modal for adjusting media settings during the event. |
| ConfirmExitModal | Modal for confirming exit from the event. |
| ConfirmHereModal | Modal for confirming certain actions or selections. |
| ShareEventModal | Modal for sharing the event with others. |
| WelcomePage | Welcome page modal for the event. |
| PreJoinPage | Prejoin page modal for the event. |
| PollModal | Modal for conducting polls or surveys during the event. |
| BreakoutRoomsModal | Modal for managing breakout rooms during the event. |
| ConfigureWhiteboardModal | Modal for configuring whiteboard settings during the event. |                      
| BackgroundModal | Modal for managing background settings during the event. |
| ScreenboardModal | Modal for managing screen share annotations during the event. |

#### Modal Interactions

Each modal has corresponding functions to trigger its usage:

1. `launchMenuModal`: Launches the menu modal for settings and configurations.
2. `launchRecording`: Initiates the recording modal for recording functionalities.
3. `startRecording`: Starts the recording process.
4. `confirmRecording`: Confirms and finalizes the recording.
5. `launchWaiting`: Opens the waiting room modal for managing waiting room interactions.
6. `launchCoHost`: Opens the co-host modal for managing co-host functionalities.
7. `launchMediaSettings`: Launches the media settings modal for adjusting media-related configurations.
8. `launchDisplaySettings`: Opens the display settings modal for adjusting display configurations.
9. `launchSettings`: Initiates the settings modal for general event settings and configurations.
10. `launchRequests`: Opens the requests modal for managing user requests.
11. `launchParticipants`: Displays the participants modal for viewing and managing event participants.
12. `launchMessages`: Opens the messages modal for communication through chat messages.
13. `launchConfirmExit`: Prompts users to confirm before exiting the event.

#### Media Display and Controls

These components facilitate media display and control functionalities:

1. **Pagination**: Handles pagination and page switching.
2. **FlexibleGrid**: Renders flexible grid layouts for media display.
3. **FlexibleVideo**: Displays videos in a flexible manner within the grid.
4. **AudioGrid**: Renders audio components within the grid layout.
5. **Whiteboard**: Manages whiteboard functionalities for collaborative drawing.
6. **Screenboard**: Controls screen share annotations and interactions.

These components enable seamless media presentation and interaction within the event environment, providing users with a rich and immersive experience.

| UI Media Component | Description |
|--------------|-------------|
| MeetingProgressTimer | Component for displaying a timer indicating the progress of a meeting or event. |
| MiniAudio | Component for rendering a compact audio player with basic controls. |
| MiniCard | Component for displaying a minimized card view with essential information. |
| AudioCard | Component for displaying audio content with control elements, details, and audio decibels. |
| VideoCard | Component for displaying video content with control elements, details, and audio decibels. |
| CardVideoDisplay | Video player component for displaying embedded videos with controls and details. |
| MiniCardAudio | Component for rendering a compact card view with audio content and controls. |
| MiniAudioPlayer | Utility method for playing audio and rendering a mini audio modal when the user is not actively displayed on the page. |


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

Here's a tabulated list of advanced control functions along with brief explanations:

| Function                         | Explanation                                                                                             |
|----------------------------------|---------------------------------------------------------------------------------------------------------|
| `connectSocket`                  | Connects to the WebSocket server.                                                                       |
| `disconnectSocket`               | Disconnects from the WebSocket server.                                                                  |
| `joinRoomClient`                 | Joins a room as a client.                                                                               |
| `updateRoomParametersClient`     | Updates room parameters as a client.                                                                    |
| `createDeviceClient`             | Creates a device as a client.                                                                           |
| `switchVideoAlt`                 | Switches video/camera streams.                                                                          |
| `clickVideo`                     | Handles clicking on video controls.                                                                     |
| `clickAudio`                     | Handles clicking on audio controls.                                                                     |
| `clickScreenShare`               | Handles clicking on screen share controls.                                                              |
| `streamSuccessVideo`             | Handles successful video streaming.                                                                     |
| `streamSuccessAudio`             | Handles successful audio streaming.                                                                     |
| `streamSuccessScreen`            | Handles successful screen sharing.                                                                      |
| `streamSuccessAudioSwitch`       | Handles successful audio switching.                                                                     |
| `checkPermission`                | Checks for media access permissions.                                                                    |
| `producerClosed`                 | Handles the closure of a producer.                                                                      |
| `newPipeProducer`                | Creates receive transport for a new piped producer.                                                     |
| `updateMiniCardsGrid`            | Updates the mini-grids (mini cards) grid.                                                               |
| `mixStreams`                     | Mixes streams and prioritizes interesting ones together.                                                |
| `dispStreams`                    | Displays streams (media).                                                                              |
| `stopShareScreen`                | Stops screen sharing.                                                                                  |
| `checkScreenShare`               | Checks for screen sharing availability.                                                                |
| `startShareScreen`               | Starts screen sharing.                                                                                 |
| `requestScreenShare`             | Requests permission for screen sharing.                                                                |
| `reorderStreams`                 | Reorders streams (based on interest level).                                                            |
| `prepopulateUserMedia`           | Populates user media (for main grid).                                                                  |
| `getVideos`                      | Retrieves videos that are pending.                                                                     |
| `rePort`                         | Handles re-porting (updates of changes in UI when recording).                                           |
| `trigger`                        | Triggers actions (reports changes in UI to backend for recording).                                      |
| `consumerResume`                 | Resumes consumers.                                                                                     |
| `connectSendTransportAudio`      | Connects send transport for audio.                                                                     |
| `connectSendTransportVideo`      | Connects send transport for video.                                                                     |
| `connectSendTransportScreen`     | Connects send transport for screen sharing.                                                            |
| `processConsumerTransports`      | Processes consumer transports to pause/resume based on the current active page.                         |
| `resumePauseStreams`             | Resumes or pauses streams.                                                                             |
| `readjust`                       | Readjusts display elements.                                                                            |
| `checkGrid`                      | Checks the grid sizes to display.                                                                      |
| `getEstimate`                    | Gets an estimate of grids to add.                                                                      |
| `calculateRowsAndColumns`        | Calculates rows and columns for the grid.                                                              |
| `addVideosGrid`                  | Adds videos to the grid.                                                                               |
| `onScreenChanges`                | Handles screen changes (orientation and resize).                                                        |
| `sleep`                          | Pauses execution for a specified duration.                                                             |
| `changeVids`                     | Changes videos.                                                                                        |
| `compareActiveNames`             | Compares active names (for recording UI changes reporting).                                             |
| `compareScreenStates`            | Compares screen states (for recording changes in grid sizes reporting).                                 |
| `createSendTransport`            | Creates a send transport.                                                                              |
| `resumeSendTransportAudio`       | Resumes a send transport for audio.                                                                    |
| `receiveAllPipedTransports`      | Receives all piped transports.                                                                         |
| `disconnectSendTransportVideo`   | Disconnects send transport for video.                                                                  |
| `disconnectSendTransportAudio`   | Disconnects send transport for audio.                                                                  |
| `disconnectSendTransportScreen`  | Disconnects send transport for screen sharing.                                                         |
| `connectSendTransport`           | Connects a send transport.                                                                             |
| `getPipedProducersAlt`           | Gets piped producers.                                                                                  |
| `signalNewConsumerTransport`     | Signals a new consumer transport.                                                                      |
| `connectRecvTransport`           | Connects a receive transport.                                                                          |
| `reUpdateInter`                   | Re-updates the interface based on audio decibels.                                                      |
| `updateParticipantAudioDecibels` | Updates participant audio decibels.                                                                    |
| `closeAndResize`                 | Closes and resizes the media elements.                                                                 |
| `autoAdjust`                     | Automatically adjusts display elements.                                                                 |
| `switchUserVideoAlt`             | Switches user video (alternate) (back/front).                                                          |
| `switchUserVideo`                | Switches user video (specific video id).                                                               |
| `switchUserAudio`                | Switches user audio.                                                                                   |
| `receiveRoomMessages`            | Receives room messages.                                                                                |
| `formatNumber`                   | Formats a number (for broadcast viewers).                                                              |
| `connectIps`                     | Connects IPs (connect to consuming servers)
| `startMeetingProgressTimer`      | Starts the meeting progress timer.       |
| `stopRecording`                  | Stops the recording process. |
| `pollUpdated`                    | Handles updated poll data. |
| `handleVotePoll`                 | Handles voting in a poll. |
| `handleCreatePoll`               | Handles creating a poll. |
| `handleEndPoll`                  | Handles ending a poll. |
| `breakoutRoomUpdated`           | Handles updated breakout room data. |
| `captureCanvasStream`            | Captures a canvas stream. |
| `resumePauseAudioStreams`        | Resumes or pauses audio streams. |
|`processConsumerTransportsAudio`  | Processes consumer transports for audio. |

### Room Socket Events

In the context of a room's real-time communication, various events occur, such as user actions, room management updates, media controls, and meeting status changes. To effectively handle these events and synchronize the application's state with the server, specific functions are provided. These functions act as listeners for socket events, allowing the application to react accordingly.

#### Provided Socket Event Handling Functions:

| Function                      | Explanation                                                                                             |
|-------------------------------|---------------------------------------------------------------------------------------------------------|
| `userWaiting`                 | Triggered when a user is waiting.                                                                       |
| `personJoined`                | Triggered when a person joins the room.                                                                 |
| `allWaitingRoomMembers`       | Triggered when information about all waiting room members is received.                                  |
| `roomRecordParams`            | Triggered when room recording parameters are received.                                                  |
| `banParticipant`              | Triggered when a participant is banned.                                                                 |
| `updatedCoHost`               | Triggered when the co-host information is updated.                                                       |
| `participantRequested`        | Triggered when a participant requests access.                                                            |
| `screenProducerId`            | Triggered when the screen producer ID is received.                                                        |
| `updateMediaSettings`         | Triggered when media settings are updated.                                                               |
| `producerMediaPaused`         | Triggered when producer media is paused.                                                                 |
| `producerMediaResumed`        | Triggered when producer media is resumed.                                                                |
| `producerMediaClosed`         | Triggered when producer media is closed.                                                                 |
| `controlMediaHost`            | Triggered when media control is hosted.                                                                  |
| `meetingEnded`                | Triggered when the meeting ends.                                                                         |
| `disconnectUserSelf`          | Triggered when a user disconnects.                                                                       |
| `receiveMessage`              | Triggered when a message is received.                                                                    |
| `meetingTimeRemaining`        | Triggered when meeting time remaining is received.                                                        |
| `meetingStillThere`           | Triggered when the meeting is still active.                                                              |
| `startRecords`                | Triggered when recording starts.                                                                         |
| `reInitiateRecording`         | Triggered when recording needs to be re-initiated.                                                       |
| `getDomains`                  | Triggered when domains are received.                                                                     |
| `updateConsumingDomains`      | Triggered when consuming domains are updated.                                                            |
| `recordingNotice`             | Triggered when a recording notice is received.                                                           |
| `timeLeftRecording`           | Triggered when time left for recording is received.                                                       |
| `stoppedRecording`            | Triggered when recording stops.                                                                          |
| `hostRequestResponse`         | Triggered when the host request response is received.                                                    |
| `allMembers`                  | Triggered when information about all members is received.                                                 |
| `allMembersRest`              | Triggered when information about all members is received (rest of the members).                           |
| `disconnect`                  | Triggered when a disconnect event occurs.                                                                |
| `pollUpdated`                 | Triggered when a poll is updated.                                                                        |
| `breakoutRoomUpdated`         | Triggered when a breakout room is updated.      
| `whiteboardUpdated`            | Handles updated whiteboard data. 
| `whiteboardAction`              | Handles whiteboard actions. |                                                       |

#### Sample Usage:

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
   - Example link to MediaSFU's default implementation: [`prepopulateUserMedia`](https://github.com/MediaSFU/MediaSFU-Angular/src/lib/consumers/prepopulate-user-media.service.ts).

2. **Custom MiniGrid (Participants' Media)**:
   - Modify the UI in the `addVideosGrid` function.
   - Example link to MediaSFU's default implementation: [`addVideosGrid`](https://github.com/MediaSFU/MediaSFU-Angular/src/lib/consumers/add-videos-grid.service.ts).

To create a custom UI, you can refer to existing MediaSFU implementations like:

- [MediasfuGeneric](https://github.com/MediaSFU/MediaSFU-Angular/src/lib/components/mediasfu-components/mediasfu-generic.component.ts)
- [MediasfuBroadcast](https://github.com/MediaSFU/MediaSFU-Angular/src/lib/components/mediasfu-components/mediasfu-broadcast.component.ts)

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



