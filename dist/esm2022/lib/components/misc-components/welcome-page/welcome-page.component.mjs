import { Component, Inject, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { ZXingScannerModule } from '@zxing/ngx-scanner'; // Import the zxing-ngx-scanner module
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "ngx-cookie-service";
import * as i3 from "@zxing/ngx-scanner";
import * as i4 from "@angular/common";
import * as i5 from "@fortawesome/angular-fontawesome";
const MAX_ATTEMPTS = 10; // Maximum number of unsuccessful attempts before rate limiting
const RATE_LIMIT_DURATION = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
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
export class WelcomePage {
    fb;
    cookieService;
    welcomeForm;
    error = '';
    isScannerVisible = false;
    scannedData = null;
    parameters = {};
    faQrcode = faQrcode;
    allowedCameras = []; // List of allowed cameras
    currentDevice = null; // Active camera device
    imgSrc = '';
    constructor(fb, cookieService, injectedParameters) {
        this.fb = fb;
        this.cookieService = cookieService;
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
    async checkLimitsAndMakeRequest(apiUserName, apiToken, link, userName) {
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
            }
            else {
                unsuccessfulAttempts = 0;
                this.cookieService.set('unsuccessfulAttempts', unsuccessfulAttempts.toString());
                this.cookieService.set('lastRequestTimestamp', Date.now().toString());
            }
        }
        try {
            this.parameters.updateIsLoadingModalVisible(true);
            const socketPromise = this.parameters.connectSocket({ apiUserName, apiToken, link });
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Request timed out')), TIMEOUT_DURATION));
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
            }
            else {
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
                }
                else {
                    this.parameters.showAlert?.({
                        message: 'Invalid credentials.',
                        type: 'danger',
                        duration: 3000,
                    });
                }
            }
        }
        catch (error) {
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
    handleScanSuccess(data) {
        try {
            const scannedText = data;
            const parts = scannedText.split(';');
            if (parts.length === 5) {
                const [userName, link, userSecret, passWord, meetingID] = parts;
                if (!userName.length ||
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
                    meetingID.toLowerCase().startsWith('d')) {
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
            }
            else {
                this.parameters.showAlert?.({
                    message: 'Invalid scanned data.',
                    type: 'danger',
                    duration: 3000,
                });
            }
        }
        catch (error) {
            this.parameters.showAlert?.({
                message: 'Invalid scanned data.',
                type: 'danger',
                duration: 3000,
            });
        }
    }
    validateAlphanumeric(str) {
        const alphanumericRegex = /^[a-zA-Z0-9]+$/;
        return alphanumericRegex.test(str);
    }
    // Method to list available cameras
    askForCameraPermission() {
        navigator.mediaDevices
            .enumerateDevices()
            .then((devices) => {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: WelcomePage, deps: [{ token: i1.FormBuilder }, { token: i2.CookieService }, { token: 'parameters', optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: WelcomePage, isStandalone: true, selector: "app-welcome-page", providers: [CookieService], ngImport: i0, template: "<div class=\"container\">\r\n  <div class=\"logo-container\">\r\n    <img [src]=\"imgSrc || 'https://mediasfu.com/images/logo192.png'\" class=\"logo-image\" alt=\"Logo\" />\r\n  </div>\r\n  <form [formGroup]=\"welcomeForm\" (ngSubmit)=\"handleConfirm()\">\r\n    <div class=\"input-container\">\r\n      <input\r\n        formControlName=\"name\"\r\n        type=\"text\"\r\n        placeholder=\"Event Display Name\"\r\n        class=\"input-field\"\r\n      />\r\n      <input\r\n        formControlName=\"secret\"\r\n        type=\"text\"\r\n        placeholder=\"Event Token (Secret)\"\r\n        class=\"input-field\"\r\n      />\r\n      <input\r\n        formControlName=\"eventID\"\r\n        type=\"text\"\r\n        placeholder=\"Event ID\"\r\n        class=\"input-field\"\r\n      />\r\n      <input\r\n        formControlName=\"link\"\r\n        type=\"text\"\r\n        placeholder=\"Event Link\"\r\n        class=\"input-field\"\r\n      />\r\n    </div>\r\n    <button type=\"submit\" class=\"confirm-button\">Confirm</button>\r\n  </form>\r\n\r\n  <div class=\"scanner-container\">\r\n    <div class=\"or-container\">\r\n      <hr class=\"horizontal-line\" />\r\n      <span class=\"or-text\">OR</span>\r\n      <hr class=\"horizontal-line\" />\r\n    </div>\r\n    <div *ngIf=\"isScannerVisible\" class=\"scanner-wrapper\">\r\n      <zxing-scanner\r\n        [device]=\"currentDevice!\"\r\n        (scanSuccess)=\"handleScanSuccess($event)\"\r\n        [tryHarder]=\"true\"\r\n      ></zxing-scanner>\r\n    </div>\r\n    <div class=\"scan-button-container\" *ngIf=\"!isScannerVisible\">\r\n      <button (click)=\"toggleScanner()\" class=\"scan-button\">\r\n        <fa-icon [icon]=\"faQrcode\" style=\"margin-right: 5px\"></fa-icon>\r\n        Scan QR Code\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"additional-options-container\">\r\n    <p>\r\n      Provide the event details either by typing manually or scanning the\r\n      QR-code to autofill.\r\n    </p>\r\n    <p>Don't have a secret?</p>\r\n    <a\r\n      href=\"https://meeting.mediasfu.com/meeting/start/\"\r\n      target=\"_blank\"\r\n      class=\"link\"\r\n      >Get one from mediasfu.com</a\r\n    >\r\n  </div>\r\n</div>\r\n", styles: [".container{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100vw;height:100vh;max-width:100vw;max-height:100vh;margin:0;padding:0;background-color:#53c6e0;overflow:auto}.logo-container{margin-top:30px;padding-top:10px;margin-bottom:10px}.logo-image{width:100px;height:100px;border-radius:50%}.input-container{margin-bottom:10px;display:flex;flex-direction:column;align-items:center;justify-content:center}.input-field{height:30px;border-color:gray;border-width:1px;margin-bottom:10px;padding:0 5px;border-radius:5px}.confirm-button{background-color:#000;color:#fff;padding:5px;border-radius:5px;margin-bottom:10px;width:100%}.scanner-container{margin-bottom:10px;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.additional-options-container{text-align:center}.link{color:#00f;text-decoration:none;font-weight:700;margin-left:5px}.scan-button{background-color:#000;color:#fff;padding:10px 20px;border-radius:5px;margin-bottom:20px}.scan-button-container{display:flex;justify-content:center;align-items:center}.or-container{display:flex;align-items:center;justify-content:center;width:100%;margin:10px 0}.horizontal-line{flex-grow:1;height:1px;background-color:gray;margin:0 10px}.or-text{color:#000;font-size:medium;font-weight:700}.scanner-wrapper{width:300px;height:300px;max-width:300px;max-height:300px;overflow:hidden;position:relative}zxing-scanner{width:100%;height:100%;object-fit:cover}\n"], dependencies: [{ kind: "ngmodule", type: ZXingScannerModule }, { kind: "component", type: i3.ZXingScannerComponent, selector: "zxing-scanner", inputs: ["autofocusEnabled", "timeBetweenScans", "delayBetweenScanSuccess", "autostart", "previewFitMode", "poster", "device", "formats", "videoConstraints", "torch", "enable", "tryHarder"], outputs: ["autostarted", "autostarting", "torchCompatible", "scanSuccess", "scanFailure", "scanError", "scanComplete", "camerasFound", "camerasNotFound", "permissionResponse", "hasDevices", "deviceChange"] }, { kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i5.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: WelcomePage, decorators: [{
            type: Component,
            args: [{ selector: 'app-welcome-page', standalone: true, imports: [ZXingScannerModule, CommonModule, FontAwesomeModule, ReactiveFormsModule], providers: [CookieService], template: "<div class=\"container\">\r\n  <div class=\"logo-container\">\r\n    <img [src]=\"imgSrc || 'https://mediasfu.com/images/logo192.png'\" class=\"logo-image\" alt=\"Logo\" />\r\n  </div>\r\n  <form [formGroup]=\"welcomeForm\" (ngSubmit)=\"handleConfirm()\">\r\n    <div class=\"input-container\">\r\n      <input\r\n        formControlName=\"name\"\r\n        type=\"text\"\r\n        placeholder=\"Event Display Name\"\r\n        class=\"input-field\"\r\n      />\r\n      <input\r\n        formControlName=\"secret\"\r\n        type=\"text\"\r\n        placeholder=\"Event Token (Secret)\"\r\n        class=\"input-field\"\r\n      />\r\n      <input\r\n        formControlName=\"eventID\"\r\n        type=\"text\"\r\n        placeholder=\"Event ID\"\r\n        class=\"input-field\"\r\n      />\r\n      <input\r\n        formControlName=\"link\"\r\n        type=\"text\"\r\n        placeholder=\"Event Link\"\r\n        class=\"input-field\"\r\n      />\r\n    </div>\r\n    <button type=\"submit\" class=\"confirm-button\">Confirm</button>\r\n  </form>\r\n\r\n  <div class=\"scanner-container\">\r\n    <div class=\"or-container\">\r\n      <hr class=\"horizontal-line\" />\r\n      <span class=\"or-text\">OR</span>\r\n      <hr class=\"horizontal-line\" />\r\n    </div>\r\n    <div *ngIf=\"isScannerVisible\" class=\"scanner-wrapper\">\r\n      <zxing-scanner\r\n        [device]=\"currentDevice!\"\r\n        (scanSuccess)=\"handleScanSuccess($event)\"\r\n        [tryHarder]=\"true\"\r\n      ></zxing-scanner>\r\n    </div>\r\n    <div class=\"scan-button-container\" *ngIf=\"!isScannerVisible\">\r\n      <button (click)=\"toggleScanner()\" class=\"scan-button\">\r\n        <fa-icon [icon]=\"faQrcode\" style=\"margin-right: 5px\"></fa-icon>\r\n        Scan QR Code\r\n      </button>\r\n    </div>\r\n  </div>\r\n\r\n  <div class=\"additional-options-container\">\r\n    <p>\r\n      Provide the event details either by typing manually or scanning the\r\n      QR-code to autofill.\r\n    </p>\r\n    <p>Don't have a secret?</p>\r\n    <a\r\n      href=\"https://meeting.mediasfu.com/meeting/start/\"\r\n      target=\"_blank\"\r\n      class=\"link\"\r\n      >Get one from mediasfu.com</a\r\n    >\r\n  </div>\r\n</div>\r\n", styles: [".container{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100vw;height:100vh;max-width:100vw;max-height:100vh;margin:0;padding:0;background-color:#53c6e0;overflow:auto}.logo-container{margin-top:30px;padding-top:10px;margin-bottom:10px}.logo-image{width:100px;height:100px;border-radius:50%}.input-container{margin-bottom:10px;display:flex;flex-direction:column;align-items:center;justify-content:center}.input-field{height:30px;border-color:gray;border-width:1px;margin-bottom:10px;padding:0 5px;border-radius:5px}.confirm-button{background-color:#000;color:#fff;padding:5px;border-radius:5px;margin-bottom:10px;width:100%}.scanner-container{margin-bottom:10px;width:100%;display:flex;flex-direction:column;align-items:center;justify-content:center}.additional-options-container{text-align:center}.link{color:#00f;text-decoration:none;font-weight:700;margin-left:5px}.scan-button{background-color:#000;color:#fff;padding:10px 20px;border-radius:5px;margin-bottom:20px}.scan-button-container{display:flex;justify-content:center;align-items:center}.or-container{display:flex;align-items:center;justify-content:center;width:100%;margin:10px 0}.horizontal-line{flex-grow:1;height:1px;background-color:gray;margin:0 10px}.or-text{color:#000;font-size:medium;font-weight:700}.scanner-wrapper{width:300px;height:300px;max-width:300px;max-height:300px;overflow:hidden;position:relative}zxing-scanner{width:100%;height:100%;object-fit:cover}\n"] }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }, { type: i2.CookieService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['parameters']
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2VsY29tZS1wYWdlLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21pc2MtY29tcG9uZW50cy93ZWxjb21lLXBhZ2Uvd2VsY29tZS1wYWdlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21pc2MtY29tcG9uZW50cy93ZWxjb21lLXBhZ2Uvd2VsY29tZS1wYWdlLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFVLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzdELE9BQU8sRUFBMEIsVUFBVSxFQUFFLG1CQUFtQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDekYsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9CQUFvQixDQUFDLENBQUMsc0NBQXNDO0FBQy9GLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7OztBQUkxQyxNQUFNLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQywrREFBK0Q7QUFDeEYsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQywwQkFBMEI7QUF3QjFFOzs7Ozs7Ozs7Ozs7OztHQWNHO0FBV0gsTUFBTSxPQUFP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LENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7UUFDL0MsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztRQUNoQyxDQUFDO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxhQUFhO1FBQ2pCLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsS0FBSyxHQUFHLHVDQUF1QyxDQUFDO1lBQ3JELE9BQU87UUFDVCxDQUFDO1FBRUQsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDO1FBRS9ELE1BQU0sSUFBSSxDQUFDLHlCQUF5QixDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ3BFLENBQUM7dUdBOU5VLFdBQVcsMEVBY0EsWUFBWTsyRkFkdkIsV0FBVywrREFGWCxDQUFDLGFBQWEsQ0FBQywwQkMzRDVCLCtyRUFxRUEsdy9DRFhZLGtCQUFrQiw4ZkFBRSxZQUFZLGtJQUFFLGlCQUFpQiw0UEFBRSxtQkFBbUI7OzJGQUd2RSxXQUFXO2tCQVJ2QixTQUFTOytCQUNFLGtCQUFrQixjQUdoQixJQUFJLFdBQ1AsQ0FBQyxrQkFBa0IsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsbUJBQW1CLENBQUMsYUFDeEUsQ0FBQyxhQUFhLENBQUM7OzBCQWdCdkIsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QsIE9uSW5pdCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IGZhUXJjb2RlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IFpYaW5nU2Nhbm5lck1vZHVsZSB9IGZyb20gJ0B6eGluZy9uZ3gtc2Nhbm5lcic7IC8vIEltcG9ydCB0aGUgenhpbmctbmd4LXNjYW5uZXIgbW9kdWxlXG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IENvbm5lY3RTb2NrZXRUeXBlIH0gZnJvbSAnLi4vLi4vLi4vc29ja2V0cy9zb2NrZXQtbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IFNob3dBbGVydCB9IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmNvbnN0IE1BWF9BVFRFTVBUUyA9IDEwOyAvLyBNYXhpbXVtIG51bWJlciBvZiB1bnN1Y2Nlc3NmdWwgYXR0ZW1wdHMgYmVmb3JlIHJhdGUgbGltaXRpbmdcbmNvbnN0IFJBVEVfTElNSVRfRFVSQVRJT04gPSAzICogNjAgKiA2MCAqIDEwMDA7IC8vIDMgaG91cnMgaW4gbWlsbGlzZWNvbmRzXG5cbmV4cG9ydCBpbnRlcmZhY2UgV2VsY29tZVBhZ2VQYXJhbWV0ZXJzIHtcbiAgaW1nU3JjPzogc3RyaW5nO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZTogKHZpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGNvbm5lY3RTb2NrZXQ6IENvbm5lY3RTb2NrZXRUeXBlO1xuICB1cGRhdGVTb2NrZXQ6IChzb2NrZXQ6IFNvY2tldCkgPT4gdm9pZDtcbiAgdXBkYXRlVmFsaWRhdGVkOiAodmFsaWRhdGVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVBcGlVc2VyTmFtZTogKGFwaVVzZXJOYW1lOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUFwaVRva2VuOiAoYXBpVG9rZW46IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlTGluazogKGxpbms6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlUm9vbU5hbWU6IChyb29tTmFtZTogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVNZW1iZXI6ICh1c2VyTmFtZTogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG4vLyBEZWZpbmUgdGhlIHByb3AgdHlwZSBmb3IgdGhlIGNvbXBvbmVudFxuZXhwb3J0IGludGVyZmFjZSBXZWxjb21lUGFnZU9wdGlvbnMge1xuICBwYXJhbWV0ZXJzOiBXZWxjb21lUGFnZVBhcmFtZXRlcnM7XG59XG5cbi8vIERlZmluZSB0aGUgdHlwZSBmb3IgdGhlIGNvbXBvbmVudCBmdW5jdGlvblxuZXhwb3J0IHR5cGUgV2VsY29tZVBhZ2VUeXBlID0gKG9wdGlvbnM6IFdlbGNvbWVQYWdlT3B0aW9ucykgPT4gSFRNTEVsZW1lbnQ7XG5cbi8qKlxuICogQGNvbXBvbmVudCBXZWxjb21lUGFnZVxuICogQGRlc2NyaXB0aW9uIENvbXBvbmVudCBmb3IgaGFuZGxpbmcgcm9vbSBjcmVhdGlvbiBhbmQgam9pbmluZyBvbiBNZWRpYVNGVSB3aXRoIFFSIHNjYW5uaW5nIGFuZCBmb3JtIHN1Ym1pc3Npb24uXG4gKlxuICogQHNlbGVjdG9yIGFwcC13ZWxjb21lLXBhZ2VcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEB0ZW1wbGF0ZVVybCAuL3dlbGNvbWUtcGFnZS5jb21wb25lbnQuaHRtbFxuICogQHN0eWxlVXJscyBbJy4vd2VsY29tZS1wYWdlLmNvbXBvbmVudC5jc3MnXVxuICogQGltcG9ydHMgW1pYaW5nU2Nhbm5lck1vZHVsZSwgQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZV1cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC13ZWxjb21lLXBhZ2UgW3BhcmFtZXRlcnNdPVwid2VsY29tZVBhcmFtZXRlcnNcIj48L2FwcC13ZWxjb21lLXBhZ2U+XG4gKiBgYGBcbiAqL1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC13ZWxjb21lLXBhZ2UnLFxuICB0ZW1wbGF0ZVVybDogJy4vd2VsY29tZS1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vd2VsY29tZS1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1pYaW5nU2Nhbm5lck1vZHVsZSwgQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZV0sXG4gIHByb3ZpZGVyczogW0Nvb2tpZVNlcnZpY2VdLFxufSlcbmV4cG9ydCBjbGFzcyBXZWxjb21lUGFnZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHdlbGNvbWVGb3JtOiBGb3JtR3JvdXA7XG4gIGVycm9yID0gJyc7XG4gIGlzU2Nhbm5lclZpc2libGUgPSBmYWxzZTtcbiAgc2Nhbm5lZERhdGE6IGFueSA9IG51bGw7XG4gIHBhcmFtZXRlcnM6IFdlbGNvbWVQYWdlUGFyYW1ldGVycyA9IHt9IGFzIFdlbGNvbWVQYWdlUGFyYW1ldGVycztcbiAgZmFRcmNvZGUgPSBmYVFyY29kZTtcbiAgYWxsb3dlZENhbWVyYXM6IE1lZGlhRGV2aWNlSW5mb1tdID0gW107IC8vIExpc3Qgb2YgYWxsb3dlZCBjYW1lcmFzXG4gIGN1cnJlbnREZXZpY2U6IE1lZGlhRGV2aWNlSW5mbyB8IG51bGwgPSBudWxsOyAvLyBBY3RpdmUgY2FtZXJhIGRldmljZVxuICBpbWdTcmMgPSAnJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIGZiOiBGb3JtQnVpbGRlcixcbiAgICBwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgncGFyYW1ldGVycycpIGluamVjdGVkUGFyYW1ldGVyczogV2VsY29tZVBhZ2VQYXJhbWV0ZXJzLFxuICApIHtcbiAgICB0aGlzLndlbGNvbWVGb3JtID0gdGhpcy5mYi5ncm91cCh7XG4gICAgICBuYW1lOiBbXG4gICAgICAgICcnLFxuICAgICAgICBbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5wYXR0ZXJuKCdeW2EtekEtWjAtOV0rJCcpLCBWYWxpZGF0b3JzLm1heExlbmd0aCgxMildLFxuICAgICAgXSxcbiAgICAgIHNlY3JldDogW1xuICAgICAgICAnJyxcbiAgICAgICAgW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMucGF0dGVybignXlthLXpBLVowLTldKyQnKSwgVmFsaWRhdG9ycy5tYXhMZW5ndGgoNjQpXSxcbiAgICAgIF0sXG4gICAgICBldmVudElEOiBbXG4gICAgICAgICcnLFxuICAgICAgICBbVmFsaWRhdG9ycy5yZXF1aXJlZCwgVmFsaWRhdG9ycy5wYXR0ZXJuKCdeW2EtekEtWjAtOV0rJCcpLCBWYWxpZGF0b3JzLm1heExlbmd0aCgzMildLFxuICAgICAgXSxcbiAgICAgIGxpbms6IFsnJywgW1ZhbGlkYXRvcnMucmVxdWlyZWQsIFZhbGlkYXRvcnMucGF0dGVybignXmh0dHBzPzovLy4rbWVkaWFzZnVcXFxcLmNvbS4rJCcpXV0sXG4gICAgfSk7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gaW5qZWN0ZWRQYXJhbWV0ZXJzIHx8IHRoaXMucGFyYW1ldGVycztcbiAgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuYXNrRm9yQ2FtZXJhUGVybWlzc2lvbigpO1xuICB9XG5cbiAgYXN5bmMgY2hlY2tMaW1pdHNBbmRNYWtlUmVxdWVzdChcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nLFxuICAgIGFwaVRva2VuOiBzdHJpbmcsXG4gICAgbGluazogc3RyaW5nLFxuICAgIHVzZXJOYW1lOiBzdHJpbmcsXG4gICkge1xuICAgIGNvbnN0IFRJTUVPVVRfRFVSQVRJT04gPSAxMDAwMDsgLy8gMTAgc2Vjb25kc1xuXG4gICAgbGV0IHVuc3VjY2Vzc2Z1bEF0dGVtcHRzID0gcGFyc2VJbnQodGhpcy5jb29raWVTZXJ2aWNlLmdldCgndW5zdWNjZXNzZnVsQXR0ZW1wdHMnKSkgfHwgMDtcbiAgICBsZXQgbGFzdFJlcXVlc3RUaW1lc3RhbXAgPSBwYXJzZUludCh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KCdsYXN0UmVxdWVzdFRpbWVzdGFtcCcpKSB8fCAwO1xuXG4gICAgaWYgKHVuc3VjY2Vzc2Z1bEF0dGVtcHRzID49IE1BWF9BVFRFTVBUUykge1xuICAgICAgaWYgKERhdGUubm93KCkgLSBsYXN0UmVxdWVzdFRpbWVzdGFtcCA8IFJBVEVfTElNSVRfRFVSQVRJT04pIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnVG9vIG1hbnkgdW5zdWNjZXNzZnVsIGF0dGVtcHRzLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCdsYXN0UmVxdWVzdFRpbWVzdGFtcCcsIERhdGUubm93KCkudG9TdHJpbmcoKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVuc3VjY2Vzc2Z1bEF0dGVtcHRzID0gMDtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgndW5zdWNjZXNzZnVsQXR0ZW1wdHMnLCB1bnN1Y2Nlc3NmdWxBdHRlbXB0cy50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgnbGFzdFJlcXVlc3RUaW1lc3RhbXAnLCBEYXRlLm5vdygpLnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKHRydWUpO1xuXG4gICAgICBjb25zdCBzb2NrZXRQcm9taXNlID0gdGhpcy5wYXJhbWV0ZXJzLmNvbm5lY3RTb2NrZXQoeyBhcGlVc2VyTmFtZSwgYXBpVG9rZW4sIGxpbmsgfSk7XG4gICAgICBjb25zdCB0aW1lb3V0UHJvbWlzZSA9IG5ldyBQcm9taXNlKChfLCByZWplY3QpID0+XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KG5ldyBFcnJvcignUmVxdWVzdCB0aW1lZCBvdXQnKSksIFRJTUVPVVRfRFVSQVRJT04pLFxuICAgICAgKTtcblxuICAgICAgY29uc3Qgc29ja2V0ID0gYXdhaXQgUHJvbWlzZS5yYWNlKFtzb2NrZXRQcm9taXNlLCB0aW1lb3V0UHJvbWlzZV0pO1xuXG4gICAgICBpZiAoc29ja2V0ICYmIHNvY2tldCBpbnN0YW5jZW9mIFNvY2tldCAmJiBzb2NrZXQuaWQpIHtcbiAgICAgICAgdW5zdWNjZXNzZnVsQXR0ZW1wdHMgPSAwO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCd1bnN1Y2Nlc3NmdWxBdHRlbXB0cycsIHVuc3VjY2Vzc2Z1bEF0dGVtcHRzLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCdsYXN0UmVxdWVzdFRpbWVzdGFtcCcsIERhdGUubm93KCkudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVTb2NrZXQoc29ja2V0KTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUFwaVVzZXJOYW1lKGFwaVVzZXJOYW1lKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUFwaVRva2VuKGFwaVRva2VuKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUxpbmsobGluayk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVSb29tTmFtZShhcGlVc2VyTmFtZSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVNZW1iZXIodXNlck5hbWUpO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlVmFsaWRhdGVkKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5zdWNjZXNzZnVsQXR0ZW1wdHMgKz0gMTtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgndW5zdWNjZXNzZnVsQXR0ZW1wdHMnLCB1bnN1Y2Nlc3NmdWxBdHRlbXB0cy50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgnbGFzdFJlcXVlc3RUaW1lc3RhbXAnLCBEYXRlLm5vdygpLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcblxuICAgICAgICBpZiAodW5zdWNjZXNzZnVsQXR0ZW1wdHMgPj0gTUFYX0FUVEVNUFRTKSB7XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdUb28gbWFueSB1bnN1Y2Nlc3NmdWwgYXR0ZW1wdHMuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuJyxcbiAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdJbnZhbGlkIGNyZWRlbnRpYWxzLicsXG4gICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdVbmFibGUgdG8gY29ubmVjdC4gQ2hlY2sgeW91ciBjcmVkZW50aWFscyBhbmQgdHJ5IGFnYWluLicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuXG4gICAgICB1bnN1Y2Nlc3NmdWxBdHRlbXB0cyArPSAxO1xuICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgndW5zdWNjZXNzZnVsQXR0ZW1wdHMnLCB1bnN1Y2Nlc3NmdWxBdHRlbXB0cy50b1N0cmluZygpKTtcbiAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoJ2xhc3RSZXF1ZXN0VGltZXN0YW1wJywgRGF0ZS5ub3coKS50b1N0cmluZygpKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVNjYW5TdWNjZXNzKGRhdGE6IGFueSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBzY2FubmVkVGV4dCA9IGRhdGE7XG4gICAgICBjb25zdCBwYXJ0cyA9IHNjYW5uZWRUZXh0LnNwbGl0KCc7Jyk7XG5cbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDUpIHtcbiAgICAgICAgY29uc3QgW3VzZXJOYW1lLCBsaW5rLCB1c2VyU2VjcmV0LCBwYXNzV29yZCwgbWVldGluZ0lEXSA9IHBhcnRzO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAhdXNlck5hbWUubGVuZ3RoIHx8XG4gICAgICAgICAgIWxpbmsubGVuZ3RoIHx8XG4gICAgICAgICAgIXVzZXJTZWNyZXQubGVuZ3RoIHx8XG4gICAgICAgICAgIXBhc3NXb3JkLmxlbmd0aCB8fFxuICAgICAgICAgICFtZWV0aW5nSUQubGVuZ3RoIHx8XG4gICAgICAgICAgIXRoaXMudmFsaWRhdGVBbHBoYW51bWVyaWModXNlck5hbWUpIHx8XG4gICAgICAgICAgIXRoaXMudmFsaWRhdGVBbHBoYW51bWVyaWModXNlclNlY3JldCkgfHxcbiAgICAgICAgICAhdGhpcy52YWxpZGF0ZUFscGhhbnVtZXJpYyhwYXNzV29yZCkgfHxcbiAgICAgICAgICAhdGhpcy52YWxpZGF0ZUFscGhhbnVtZXJpYyhtZWV0aW5nSUQpIHx8XG4gICAgICAgICAgdXNlclNlY3JldC5sZW5ndGggIT09IDY0IHx8XG4gICAgICAgICAgdXNlck5hbWUubGVuZ3RoID4gMTIgfHxcbiAgICAgICAgICB1c2VyTmFtZS5sZW5ndGggPCAyIHx8XG4gICAgICAgICAgbWVldGluZ0lELmxlbmd0aCA+IDMyIHx8XG4gICAgICAgICAgbWVldGluZ0lELmxlbmd0aCA8IDggfHxcbiAgICAgICAgICAhbGluay5pbmNsdWRlcygnbWVkaWFzZnUuY29tJykgfHxcbiAgICAgICAgICBtZWV0aW5nSUQudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKCdkJylcbiAgICAgICAgKSB7XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdJbnZhbGlkIHNjYW5uZWQgZGF0YS4nLFxuICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLndlbGNvbWVGb3JtLnNldFZhbHVlKHtcbiAgICAgICAgICBuYW1lOiB1c2VyTmFtZSxcbiAgICAgICAgICBzZWNyZXQ6IHVzZXJTZWNyZXQsXG4gICAgICAgICAgZXZlbnRJRDogbWVldGluZ0lELFxuICAgICAgICAgIGxpbms6IGxpbmssXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHRoaXMuaXNTY2FubmVyVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLnNjYW5uZWREYXRhID0gbnVsbDtcblxuICAgICAgICB0aGlzLmNoZWNrTGltaXRzQW5kTWFrZVJlcXVlc3QobWVldGluZ0lELCB1c2VyU2VjcmV0LCBsaW5rLCB1c2VyTmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdJbnZhbGlkIHNjYW5uZWQgZGF0YS4nLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ0ludmFsaWQgc2Nhbm5lZCBkYXRhLicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHZhbGlkYXRlQWxwaGFudW1lcmljKHN0cjogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYWxwaGFudW1lcmljUmVnZXggPSAvXlthLXpBLVowLTldKyQvO1xuICAgIHJldHVybiBhbHBoYW51bWVyaWNSZWdleC50ZXN0KHN0cik7XG4gIH1cblxuICAvLyBNZXRob2QgdG8gbGlzdCBhdmFpbGFibGUgY2FtZXJhc1xuICBhc2tGb3JDYW1lcmFQZXJtaXNzaW9uKCkge1xuICAgIG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAgICAgIC5lbnVtZXJhdGVEZXZpY2VzKClcbiAgICAgIC50aGVuKChkZXZpY2VzOiBNZWRpYURldmljZUluZm9bXSkgPT4ge1xuICAgICAgICB0aGlzLmFsbG93ZWRDYW1lcmFzID0gZGV2aWNlcy5maWx0ZXIoKGRldmljZSkgPT4gZGV2aWNlLmtpbmQgPT09ICd2aWRlb2lucHV0Jyk7XG4gICAgICAgIGlmICh0aGlzLmFsbG93ZWRDYW1lcmFzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICB0aGlzLmN1cnJlbnREZXZpY2UgPSB0aGlzLmFsbG93ZWRDYW1lcmFzWzBdOyAvLyBTZXQgdGhlIGZpcnN0IGF2YWlsYWJsZSBjYW1lcmEgYXMgdGhlIGRlZmF1bHRcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnQ2FtZXJhIGFjY2VzcyBkZW5pZWQuJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgfVxuXG4gIHRvZ2dsZVNjYW5uZXIoKSB7XG4gICAgdGhpcy5pc1NjYW5uZXJWaXNpYmxlID0gIXRoaXMuaXNTY2FubmVyVmlzaWJsZTtcbiAgICBpZiAodGhpcy5pc1NjYW5uZXJWaXNpYmxlKSB7XG4gICAgICB0aGlzLmFza0ZvckNhbWVyYVBlcm1pc3Npb24oKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBoYW5kbGVDb25maXJtKCkge1xuICAgIGlmICh0aGlzLndlbGNvbWVGb3JtLmludmFsaWQpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSAnUGxlYXNlIGZpbGwgYWxsIHRoZSBmaWVsZHMgY29ycmVjdGx5Lic7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBuYW1lLCBzZWNyZXQsIGV2ZW50SUQsIGxpbmsgfSA9IHRoaXMud2VsY29tZUZvcm0udmFsdWU7XG5cbiAgICBhd2FpdCB0aGlzLmNoZWNrTGltaXRzQW5kTWFrZVJlcXVlc3QoZXZlbnRJRCwgc2VjcmV0LCBsaW5rLCBuYW1lKTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gIDxkaXYgY2xhc3M9XCJsb2dvLWNvbnRhaW5lclwiPlxyXG4gICAgPGltZyBbc3JjXT1cImltZ1NyYyB8fCAnaHR0cHM6Ly9tZWRpYXNmdS5jb20vaW1hZ2VzL2xvZ28xOTIucG5nJ1wiIGNsYXNzPVwibG9nby1pbWFnZVwiIGFsdD1cIkxvZ29cIiAvPlxyXG4gIDwvZGl2PlxyXG4gIDxmb3JtIFtmb3JtR3JvdXBdPVwid2VsY29tZUZvcm1cIiAobmdTdWJtaXQpPVwiaGFuZGxlQ29uZmlybSgpXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiaW5wdXQtY29udGFpbmVyXCI+XHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIGZvcm1Db250cm9sTmFtZT1cIm5hbWVcIlxyXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIkV2ZW50IERpc3BsYXkgTmFtZVwiXHJcbiAgICAgICAgY2xhc3M9XCJpbnB1dC1maWVsZFwiXHJcbiAgICAgIC8+XHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIGZvcm1Db250cm9sTmFtZT1cInNlY3JldFwiXHJcbiAgICAgICAgdHlwZT1cInRleHRcIlxyXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRXZlbnQgVG9rZW4gKFNlY3JldClcIlxyXG4gICAgICAgIGNsYXNzPVwiaW5wdXQtZmllbGRcIlxyXG4gICAgICAvPlxyXG4gICAgICA8aW5wdXRcclxuICAgICAgICBmb3JtQ29udHJvbE5hbWU9XCJldmVudElEXCJcclxuICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJFdmVudCBJRFwiXHJcbiAgICAgICAgY2xhc3M9XCJpbnB1dC1maWVsZFwiXHJcbiAgICAgIC8+XHJcbiAgICAgIDxpbnB1dFxyXG4gICAgICAgIGZvcm1Db250cm9sTmFtZT1cImxpbmtcIlxyXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgICBwbGFjZWhvbGRlcj1cIkV2ZW50IExpbmtcIlxyXG4gICAgICAgIGNsYXNzPVwiaW5wdXQtZmllbGRcIlxyXG4gICAgICAvPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImNvbmZpcm0tYnV0dG9uXCI+Q29uZmlybTwvYnV0dG9uPlxyXG4gIDwvZm9ybT5cclxuXHJcbiAgPGRpdiBjbGFzcz1cInNjYW5uZXItY29udGFpbmVyXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwib3ItY29udGFpbmVyXCI+XHJcbiAgICAgIDxociBjbGFzcz1cImhvcml6b250YWwtbGluZVwiIC8+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwib3ItdGV4dFwiPk9SPC9zcGFuPlxyXG4gICAgICA8aHIgY2xhc3M9XCJob3Jpem9udGFsLWxpbmVcIiAvPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2ICpuZ0lmPVwiaXNTY2FubmVyVmlzaWJsZVwiIGNsYXNzPVwic2Nhbm5lci13cmFwcGVyXCI+XHJcbiAgICAgIDx6eGluZy1zY2FubmVyXHJcbiAgICAgICAgW2RldmljZV09XCJjdXJyZW50RGV2aWNlIVwiXHJcbiAgICAgICAgKHNjYW5TdWNjZXNzKT1cImhhbmRsZVNjYW5TdWNjZXNzKCRldmVudClcIlxyXG4gICAgICAgIFt0cnlIYXJkZXJdPVwidHJ1ZVwiXHJcbiAgICAgID48L3p4aW5nLXNjYW5uZXI+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJzY2FuLWJ1dHRvbi1jb250YWluZXJcIiAqbmdJZj1cIiFpc1NjYW5uZXJWaXNpYmxlXCI+XHJcbiAgICAgIDxidXR0b24gKGNsaWNrKT1cInRvZ2dsZVNjYW5uZXIoKVwiIGNsYXNzPVwic2Nhbi1idXR0b25cIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVFyY29kZVwiIHN0eWxlPVwibWFyZ2luLXJpZ2h0OiA1cHhcIj48L2ZhLWljb24+XHJcbiAgICAgICAgU2NhbiBRUiBDb2RlXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcblxyXG4gIDxkaXYgY2xhc3M9XCJhZGRpdGlvbmFsLW9wdGlvbnMtY29udGFpbmVyXCI+XHJcbiAgICA8cD5cclxuICAgICAgUHJvdmlkZSB0aGUgZXZlbnQgZGV0YWlscyBlaXRoZXIgYnkgdHlwaW5nIG1hbnVhbGx5IG9yIHNjYW5uaW5nIHRoZVxyXG4gICAgICBRUi1jb2RlIHRvIGF1dG9maWxsLlxyXG4gICAgPC9wPlxyXG4gICAgPHA+RG9uJ3QgaGF2ZSBhIHNlY3JldD88L3A+XHJcbiAgICA8YVxyXG4gICAgICBocmVmPVwiaHR0cHM6Ly9tZWV0aW5nLm1lZGlhc2Z1LmNvbS9tZWV0aW5nL3N0YXJ0L1wiXHJcbiAgICAgIHRhcmdldD1cIl9ibGFua1wiXHJcbiAgICAgIGNsYXNzPVwibGlua1wiXHJcbiAgICAgID5HZXQgb25lIGZyb20gbWVkaWFzZnUuY29tPC9hXHJcbiAgICA+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=