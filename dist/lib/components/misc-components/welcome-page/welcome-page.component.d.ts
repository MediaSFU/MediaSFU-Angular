import { OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'socket.io-client';
import { ConnectSocketType } from '../../../sockets/socket-manager.service';
import { ShowAlert } from '../../../@types/types';
import * as i0 from "@angular/core";
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
export interface WelcomePageOptions {
    parameters: WelcomePageParameters;
}
export type WelcomePageType = (options: WelcomePageOptions) => HTMLElement;
export declare class WelcomePage implements OnInit {
    private fb;
    private cookieService;
    welcomeForm: FormGroup;
    error: string;
    isScannerVisible: boolean;
    scannedData: any;
    parameters: WelcomePageParameters;
    faQrcode: import("@fortawesome/fontawesome-common-types").IconDefinition;
    allowedCameras: MediaDeviceInfo[];
    currentDevice: MediaDeviceInfo | null;
    imgSrc: string;
    constructor(fb: FormBuilder, cookieService: CookieService, injectedParameters: WelcomePageParameters);
    ngOnInit(): void;
    checkLimitsAndMakeRequest(apiUserName: string, apiToken: string, link: string, userName: string): Promise<void>;
    handleScanSuccess(data: any): void;
    validateAlphanumeric(str: string): boolean;
    askForCameraPermission(): void;
    toggleScanner(): void;
    handleConfirm(): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<WelcomePage, [null, null, { optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<WelcomePage, "app-welcome-page", never, {}, {}, never, never, true, never>;
}
