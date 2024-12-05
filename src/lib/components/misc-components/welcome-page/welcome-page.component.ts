import { Component, Inject, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ZXingScannerModule } from '@zxing/ngx-scanner'; // Import the zxing-ngx-scanner module
import { Socket } from 'socket.io-client';
import { ConnectSocketType } from '../../../sockets/socket-manager.service';
import { ShowAlert } from '../../../@types/types';

const MAX_ATTEMPTS = 10; // Maximum number of unsuccessful attempts before rate limiting
const RATE_LIMIT_DURATION = 3 * 60 * 60 * 1000; // 3 hours in milliseconds

export interface WelcomePageParameters {
  imgSrc?: string;
  showAlert?: ShowAlert;
  updateIsLoadingModalVisible: (visible: boolean) => void;
  connectSocket: ConnectSocketType;
  updateSocket: (socket: Socket) => void;
  updateValidated: (validated: boolean) => void;
  updateApiUserName: (apiUserName: string) => void;
  updateApiToken: (apiToken: string) => void;
  updateLink: (link: string) => void;
  updateRoomName: (roomName: string) => void;
  updateMember: (userName: string) => void;
}

// Define the prop type for the component
export interface WelcomePageOptions {
  parameters: WelcomePageParameters;
}

// Define the type for the component function
export type WelcomePageType = (options: WelcomePageOptions) => HTMLElement;

/**
 * @component WelcomePage
 * @description Component for handling room creation and joining on MediaSFU with QR scanning and form submission.
 *
 * @selector app-welcome-page
 * @standalone true
 * @templateUrl ./welcome-page.component.html
 * @styleUrls ['./welcome-page.component.css']
 * @imports [ZXingScannerModule, CommonModule, FontAwesomeModule, ReactiveFormsModule]
 *
 * @example
 * ```html
 * <app-welcome-page [parameters]="welcomeParameters"></app-welcome-page>
 * ```
 */


@Component({
    selector: 'app-welcome-page',
    templateUrl: './welcome-page.component.html',
    styleUrls: ['./welcome-page.component.css'],
    imports: [ZXingScannerModule, CommonModule, FontAwesomeModule, ReactiveFormsModule],
    providers: [CookieService]
})
export class WelcomePage implements OnInit {
  welcomeForm: FormGroup;
  error = '';
  isScannerVisible = false;
  scannedData: any = null;
  parameters: WelcomePageParameters = {} as WelcomePageParameters;
  faQrcode = faQrcode;
  allowedCameras: MediaDeviceInfo[] = []; // List of allowed cameras
  currentDevice: MediaDeviceInfo | null = null; // Active camera device
  imgSrc = '';

  constructor(
    private fb: FormBuilder,
    private cookieService: CookieService,
    @Optional() @Inject('parameters') injectedParameters: WelcomePageParameters,
  ) {
    this.welcomeForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(12)],
      ],
      secret: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(64)],
      ],
      eventID: [
        '',
        [Validators.required, Validators.pattern('^[a-zA-Z0-9]+$'), Validators.maxLength(32)],
      ],
      link: ['', [Validators.required, Validators.pattern('^https?://.+mediasfu\\.com.+$')]],
    });
    this.parameters = injectedParameters || this.parameters;
  }

  ngOnInit() {
    this.askForCameraPermission();
  }

  async checkLimitsAndMakeRequest(
    apiUserName: string,
    apiToken: string,
    link: string,
    userName: string,
  ) {
    const TIMEOUT_DURATION = 10000; // 10 seconds

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

      const socketPromise = this.parameters.connectSocket({ apiUserName, apiToken, link });
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

  handleScanSuccess(data: any) {
    try {
      const scannedText = data;
      const parts = scannedText.split(';');

      if (parts.length === 5) {
        const [userName, link, userSecret, passWord, meetingID] = parts;

        if (
          !userName.length ||
          !link.length ||
          !userSecret.length ||
          !passWord.length ||
          !meetingID.length ||
          !this.validateAlphanumeric(userName) ||
          !this.validateAlphanumeric(userSecret) ||
          !this.validateAlphanumeric(passWord) ||
          !this.validateAlphanumeric(meetingID) ||
          userSecret.length !== 64 ||
          userName.length > 12 ||
          userName.length < 2 ||
          meetingID.length > 32 ||
          meetingID.length < 8 ||
          !link.includes('mediasfu.com') ||
          meetingID.toLowerCase().startsWith('d')
        ) {
          this.parameters.showAlert?.({
            message: 'Invalid scanned data.',
            type: 'danger',
            duration: 3000,
          });
          return;
        }

        this.welcomeForm.setValue({
          name: userName,
          secret: userSecret,
          eventID: meetingID,
          link: link,
        });

        this.isScannerVisible = false;
        this.scannedData = null;

        this.checkLimitsAndMakeRequest(meetingID, userSecret, link, userName);
      } else {
        this.parameters.showAlert?.({
          message: 'Invalid scanned data.',
          type: 'danger',
          duration: 3000,
        });
      }
    } catch (error) {
      this.parameters.showAlert?.({
        message: 'Invalid scanned data.',
        type: 'danger',
        duration: 3000,
      });
    }
  }

  validateAlphanumeric(str: string): boolean {
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(str);
  }

  // Method to list available cameras
  askForCameraPermission() {
    navigator.mediaDevices
      .enumerateDevices()
      .then((devices: MediaDeviceInfo[]) => {
        this.allowedCameras = devices.filter((device) => device.kind === 'videoinput');
        if (this.allowedCameras.length > 0) {
          this.currentDevice = this.allowedCameras[0]; // Set the first available camera as the default
        }
      })
      .catch((err) => {
        console.error(err);
        this.parameters.showAlert?.({
          message: 'Camera access denied.',
          type: 'danger',
          duration: 3000,
        });
      });
  }

  toggleScanner() {
    this.isScannerVisible = !this.isScannerVisible;
    if (this.isScannerVisible) {
      this.askForCameraPermission();
    }
  }

  async handleConfirm() {
    if (this.welcomeForm.invalid) {
      this.error = 'Please fill all the fields correctly.';
      return;
    }

    const { name, secret, eventID, link } = this.welcomeForm.value;

    await this.checkLimitsAndMakeRequest(eventID, secret, link, name);
  }
}
