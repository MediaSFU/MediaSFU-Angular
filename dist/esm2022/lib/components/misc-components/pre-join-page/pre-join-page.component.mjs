import { Component, Inject, Input, Optional } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
import * as i1 from "@angular/forms";
import * as i2 from "@angular/common/http";
import * as i3 from "ngx-cookie-service";
import * as i4 from "@angular/common";
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
export class PreJoinPage {
    fb;
    http;
    cookieService;
    parameters = {};
    credentials = { apiUserName: 'yourAPIUSERNAME', apiKey: 'yourAPIKEY' };
    isCreateMode = false;
    preJoinForm;
    error = '';
    imgSrc = this.parameters.imgSrc || '';
    constructor(fb, http, cookieService, injectedParameters, injectedCredentials) {
        this.fb = fb;
        this.http = http;
        this.cookieService = cookieService;
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
            }
            else {
                this.parameters.updateIsLoadingModalVisible(false);
                this.error = `${response.data ? ('error' in response.data ? response.data.error : '') : ''}`;
            }
        }
        catch (error) {
            this.parameters.updateIsLoadingModalVisible(false);
            this.error = `Unable to connect. ${error.message}`;
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
            }
            else {
                this.parameters.updateIsLoadingModalVisible(false);
                this.error = `Unable to connect to room. ${response.data ? ('error' in response.data ? response.data.error : '') : ''}`;
            }
        }
        catch (error) {
            this.parameters.updateIsLoadingModalVisible(false);
            this.error = `Unable to connect. ${error.message}`;
        }
    }
    async checkLimitsAndMakeRequest({ apiUserName, apiToken, link, apiKey = '', userName, }) {
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
            const socketPromise = await this.parameters.connectSocket({
                apiUserName,
                apiKey,
                apiToken,
                link,
            });
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
    async createRoomOnMediaSFU({ payload, apiUserName, apiKey, }) {
        try {
            if (!apiUserName ||
                !apiKey ||
                apiUserName === 'yourAPIUSERNAME' ||
                apiKey === 'yourAPIKEY' ||
                apiKey.length !== 64 ||
                apiUserName.length < 6) {
                return { data: { error: 'Invalid credentials' }, success: false };
            }
            const response = await this.http
                .post('https://mediasfu.com/v1/rooms/', payload, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiUserName}:${apiKey}`,
                }),
            })
                .toPromise();
            return { data: response, success: true };
        }
        catch (error) {
            const errorMessage = error.reason ? error.reason : 'unknown error';
            return {
                data: { error: `Unable to create room; something went wrong ${errorMessage}` },
                success: false,
            };
        }
    }
    async joinRoomOnMediaSFU({ payload, apiUserName, apiKey, }) {
        try {
            if (!apiUserName ||
                !apiKey ||
                apiUserName === 'yourAPIUSERNAME' ||
                apiKey === 'yourAPIKEY' ||
                apiKey.length !== 64 ||
                apiUserName.length < 6) {
                return { data: { error: 'Invalid credentials' }, success: false };
            }
            const response = await this.http
                .post('https://mediasfu.com/v1/rooms/', payload, {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${apiUserName}:${apiKey}`,
                }),
            })
                .toPromise();
            return { data: response, success: true };
        }
        catch (error) {
            const errorMessage = error.reason ? error.reason : 'unknown error';
            return {
                data: { error: `Unable to join room; something went wrong ${errorMessage}` },
                success: false,
            };
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: PreJoinPage, deps: [{ token: i1.FormBuilder }, { token: i2.HttpClient }, { token: i3.CookieService }, { token: 'parameters', optional: true }, { token: 'credentials', optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: PreJoinPage, isStandalone: true, selector: "app-pre-join-page", inputs: { parameters: "parameters", credentials: "credentials" }, ngImport: i0, template: "<div class=\"container-fluid\">\r\n  <div class=\"logo-container\">\r\n    <img [src]=\"imgSrc || 'https://mediasfu.com/images/logo192.png'\" class=\"logo-image\" alt=\"Logo\" />\r\n  </div>\r\n  <div class=\"input-container\">\r\n    <form [formGroup]=\"preJoinForm\">\r\n      <input type=\"text\" placeholder=\"Display Name\" formControlName=\"name\" class=\"input-field\" />\r\n      <div *ngIf=\"isCreateMode\">\r\n        <input type=\"text\" placeholder=\"Duration (minutes)\" formControlName=\"duration\" class=\"input-field\" />\r\n        <select formControlName=\"eventType\" class=\"select-field\">\r\n          <option value=\"\">Select Event Type</option>\r\n          <option value=\"chat\">Chat</option>\r\n          <option value=\"broadcast\">Broadcast</option>\r\n          <option value=\"webinar\">Webinar</option>\r\n          <option value=\"conference\">Conference</option>\r\n        </select>\r\n        <input type=\"text\" placeholder=\"Room Capacity\" formControlName=\"capacity\" class=\"input-field\" />\r\n        <button type=\"button\" (click)=\"handleCreateRoom()\" class=\"action-button\">Create Room</button>\r\n      </div>\r\n      <div *ngIf=\"!isCreateMode\">\r\n        <input type=\"text\" placeholder=\"Event ID\" formControlName=\"eventID\" class=\"input-field\" />\r\n        <button type=\"button\" (click)=\"handleJoinRoom()\" class=\"action-button\">Join Room</button>\r\n      </div>\r\n      <p *ngIf=\"error\" class=\"error\">{{ error }}</p>\r\n    </form>\r\n  </div>\r\n  <div class=\"or-container\">\r\n    <span class=\"or-text\">OR</span>\r\n  </div>\r\n  <div class=\"toggle-container\">\r\n    <button type=\"button\" (click)=\"toggleMode()\" class=\"toggle-button\">\r\n      {{ isCreateMode ? 'Switch to Join Mode' : 'Switch to Create Mode' }}\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [".container-fluid{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;height:100vh;background-color:#53c6e0;overflow:auto}.logo-container{display:flex;flex-direction:column;align-items:center;justify-content:center;margin-top:30px;padding-top:10px;margin-bottom:10px}.logo-image{width:100px;height:100px;border-radius:50%}.input-container{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%}.input-field,.select-field{display:block;width:100%;max-width:300px;height:30px;border:1px solid gray;margin-bottom:10px;padding:0 5px;border-radius:5px}.action-button,.toggle-button{display:block;width:100%;max-width:300px;background-color:#000;color:#fff;padding:5px 20px;border-radius:5px;margin-bottom:10px;margin-top:10px;text-align:center;cursor:pointer}.error{color:red;margin-bottom:10px;width:100%;max-width:300px;text-align:center}.or-container{display:flex;flex-direction:column;align-items:center;justify-content:center;margin:10px 0}.or-text{color:#000;font-size:medium;font-weight:700;text-align:center}.toggle-container{display:flex;flex-direction:column;align-items:center;justify-content:center}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: ReactiveFormsModule }, { kind: "directive", type: i1.ɵNgNoValidate, selector: "form:not([ngNoForm]):not([ngNativeValidate])" }, { kind: "directive", type: i1.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i1.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i1.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i1.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i1.NgControlStatusGroup, selector: "[formGroupName],[formArrayName],[ngModelGroup],[formGroup],form:not([ngNoForm]),[ngForm]" }, { kind: "directive", type: i1.FormGroupDirective, selector: "[formGroup]", inputs: ["formGroup"], outputs: ["ngSubmit"], exportAs: ["ngForm"] }, { kind: "directive", type: i1.FormControlName, selector: "[formControlName]", inputs: ["formControlName", "disabled", "ngModel"], outputs: ["ngModelChange"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: PreJoinPage, decorators: [{
            type: Component,
            args: [{ selector: 'app-pre-join-page', standalone: true, imports: [CommonModule, ReactiveFormsModule], template: "<div class=\"container-fluid\">\r\n  <div class=\"logo-container\">\r\n    <img [src]=\"imgSrc || 'https://mediasfu.com/images/logo192.png'\" class=\"logo-image\" alt=\"Logo\" />\r\n  </div>\r\n  <div class=\"input-container\">\r\n    <form [formGroup]=\"preJoinForm\">\r\n      <input type=\"text\" placeholder=\"Display Name\" formControlName=\"name\" class=\"input-field\" />\r\n      <div *ngIf=\"isCreateMode\">\r\n        <input type=\"text\" placeholder=\"Duration (minutes)\" formControlName=\"duration\" class=\"input-field\" />\r\n        <select formControlName=\"eventType\" class=\"select-field\">\r\n          <option value=\"\">Select Event Type</option>\r\n          <option value=\"chat\">Chat</option>\r\n          <option value=\"broadcast\">Broadcast</option>\r\n          <option value=\"webinar\">Webinar</option>\r\n          <option value=\"conference\">Conference</option>\r\n        </select>\r\n        <input type=\"text\" placeholder=\"Room Capacity\" formControlName=\"capacity\" class=\"input-field\" />\r\n        <button type=\"button\" (click)=\"handleCreateRoom()\" class=\"action-button\">Create Room</button>\r\n      </div>\r\n      <div *ngIf=\"!isCreateMode\">\r\n        <input type=\"text\" placeholder=\"Event ID\" formControlName=\"eventID\" class=\"input-field\" />\r\n        <button type=\"button\" (click)=\"handleJoinRoom()\" class=\"action-button\">Join Room</button>\r\n      </div>\r\n      <p *ngIf=\"error\" class=\"error\">{{ error }}</p>\r\n    </form>\r\n  </div>\r\n  <div class=\"or-container\">\r\n    <span class=\"or-text\">OR</span>\r\n  </div>\r\n  <div class=\"toggle-container\">\r\n    <button type=\"button\" (click)=\"toggleMode()\" class=\"toggle-button\">\r\n      {{ isCreateMode ? 'Switch to Join Mode' : 'Switch to Create Mode' }}\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [".container-fluid{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:20px;height:100vh;background-color:#53c6e0;overflow:auto}.logo-container{display:flex;flex-direction:column;align-items:center;justify-content:center;margin-top:30px;padding-top:10px;margin-bottom:10px}.logo-image{width:100px;height:100px;border-radius:50%}.input-container{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%}.input-field,.select-field{display:block;width:100%;max-width:300px;height:30px;border:1px solid gray;margin-bottom:10px;padding:0 5px;border-radius:5px}.action-button,.toggle-button{display:block;width:100%;max-width:300px;background-color:#000;color:#fff;padding:5px 20px;border-radius:5px;margin-bottom:10px;margin-top:10px;text-align:center;cursor:pointer}.error{color:red;margin-bottom:10px;width:100%;max-width:300px;text-align:center}.or-container{display:flex;flex-direction:column;align-items:center;justify-content:center;margin:10px 0}.or-text{color:#000;font-size:medium;font-weight:700;text-align:center}.toggle-container{display:flex;flex-direction:column;align-items:center;justify-content:center}\n"] }]
        }], ctorParameters: () => [{ type: i1.FormBuilder }, { type: i2.HttpClient }, { type: i3.CookieService }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['parameters']
                }] }, { type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['credentials']
                }] }], propDecorators: { parameters: [{
                type: Input
            }], credentials: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlLWpvaW4tcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9taXNjLWNvbXBvbmVudHMvcHJlLWpvaW4tcGFnZS9wcmUtam9pbi1wYWdlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21pc2MtY29tcG9uZW50cy9wcmUtam9pbi1wYWdlL3ByZS1qb2luLXBhZ2UuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUEwQixVQUFVLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7QUErRDFDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDLCtEQUErRDtBQUN4RixNQUFNLG1CQUFtQixHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLDBCQUEwQjtBQUMxRSxNQUFNLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxDQUFDLDRCQUE0QjtBQUU1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpRUc7QUFRSCxNQUFNLE9BQU8sV0FBVztJQVVaO0lBQ0E7SUFDQTtJQVhELFVBQVUsR0FB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SSxFQUFFLENBQUM7UUFDM0MsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixNQUFNLFlBQVksR0FBSSxLQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBRSxLQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUM7WUFDckYsT0FBTztnQkFDTCxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsNkNBQTZDLFlBQVksRUFBRSxFQUFFO2dCQUM1RSxPQUFPLEVBQUUsS0FBSzthQUNmLENBQUM7UUFDSixDQUFDO0lBQ0gsQ0FBQzt1R0E3U1UsV0FBVyxvR0FhQSxZQUFZLDZCQUNaLGFBQWE7MkZBZHhCLFdBQVcsK0lDakp4Qix5ekRBbUNBLG10Q0Q0R1ksWUFBWSxrSUFBRSxtQkFBbUI7OzJGQUVoQyxXQUFXO2tCQVB2QixTQUFTOytCQUNFLG1CQUFtQixjQUNqQixJQUFJLFdBR1AsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUM7OzBCQWV6QyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLFlBQVk7OzBCQUMvQixRQUFROzswQkFBSSxNQUFNOzJCQUFDLGFBQWE7eUNBYjFCLFVBQVU7c0JBQWxCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0LCBJbnB1dCwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEh0dHBDbGllbnQsIEh0dHBIZWFkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgRm9ybUJ1aWxkZXIsIEZvcm1Hcm91cCwgVmFsaWRhdG9ycywgUmVhY3RpdmVGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IENvb2tpZVNlcnZpY2UgfSBmcm9tICduZ3gtY29va2llLXNlcnZpY2UnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgQ29ubmVjdFNvY2tldFR5cGUgfSBmcm9tICcuLi8uLi8uLi9zb2NrZXRzL3NvY2tldC1tYW5hZ2VyLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2hvd0FsZXJ0IH0gZnJvbSAnLi4vLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBQcmVKb2luUGFnZVBhcmFtZXRlcnMge1xuICBpbWdTcmM/OiBzdHJpbmc7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgdXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlOiAodmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgY29ubmVjdFNvY2tldDogQ29ubmVjdFNvY2tldFR5cGU7XG4gIHVwZGF0ZVNvY2tldDogKHNvY2tldDogU29ja2V0KSA9PiB2b2lkO1xuICB1cGRhdGVWYWxpZGF0ZWQ6ICh2YWxpZGF0ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUFwaVVzZXJOYW1lOiAodXNlck5hbWU6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlQXBpVG9rZW46ICh0b2tlbjogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVMaW5rOiAobGluazogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVSb29tTmFtZTogKHJvb21OYW1lOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZU1lbWJlcjogKG1lbWJlcjogc3RyaW5nKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENyZWRlbnRpYWxzIHtcbiAgYXBpVXNlck5hbWU6IHN0cmluZztcbiAgYXBpS2V5OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJlSm9pblBhZ2VPcHRpb25zIHtcbiAgcGFyYW1ldGVyczogUHJlSm9pblBhZ2VQYXJhbWV0ZXJzO1xuICBjcmVkZW50aWFscz86IENyZWRlbnRpYWxzO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENyZWF0ZUpvaW5Sb29tUmVzcG9uc2Uge1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHNlY3VyZUNvZGU/OiBzdHJpbmc7XG4gIHB1YmxpY1VSTDogc3RyaW5nO1xuICBsaW5rOiBzdHJpbmc7XG4gIHNlY3JldDogc3RyaW5nO1xuICBzdWNjZXNzOiBib29sZWFuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENyZWF0ZUpvaW5Sb29tRXJyb3Ige1xuICBlcnJvcjogc3RyaW5nO1xuICBzdWNjZXNzPzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgQ3JlYXRlSm9pblJvb21UeXBlID0gKG9wdGlvbnM6IHtcbiAgcGF5bG9hZDogYW55O1xuICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICBhcGlLZXk6IHN0cmluZztcbn0pID0+IFByb21pc2U8e1xuICBkYXRhOiBDcmVhdGVKb2luUm9vbVJlc3BvbnNlIHwgQ3JlYXRlSm9pblJvb21FcnJvciB8IG51bGw7XG4gIHN1Y2Nlc3M6IGJvb2xlYW47XG59PjtcblxuZXhwb3J0IHR5cGUgQ3JlYXRlUm9vbU9uTWVkaWFTRlVUeXBlID0gKG9wdGlvbnM6IHtcbiAgcGF5bG9hZDogYW55O1xuICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICBhcGlLZXk6IHN0cmluZztcbn0pID0+IFByb21pc2U8e1xuICBkYXRhOiBDcmVhdGVKb2luUm9vbVJlc3BvbnNlIHwgQ3JlYXRlSm9pblJvb21FcnJvciB8IG51bGw7XG4gIHN1Y2Nlc3M6IGJvb2xlYW47XG59PjtcblxuZXhwb3J0IHR5cGUgUHJlSm9pblBhZ2VUeXBlID0gKG9wdGlvbnM6IFByZUpvaW5QYWdlT3B0aW9ucykgPT4gdm9pZDtcblxuY29uc3QgTUFYX0FUVEVNUFRTID0gMjA7IC8vIE1heGltdW0gbnVtYmVyIG9mIHVuc3VjY2Vzc2Z1bCBhdHRlbXB0cyBiZWZvcmUgcmF0ZSBsaW1pdGluZ1xuY29uc3QgUkFURV9MSU1JVF9EVVJBVElPTiA9IDMgKiA2MCAqIDYwICogMTAwMDsgLy8gMyBob3VycyBpbiBtaWxsaXNlY29uZHNcbmNvbnN0IFRJTUVPVVRfRFVSQVRJT04gPSAxMDAwMDsgLy8gNSBzZWNvbmRzIGluIG1pbGxpc2Vjb25kc1xuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXcgUHJlSm9pblBhZ2UgY29tcG9uZW50IGZvciBoYW5kbGluZyByb29tIGNyZWF0aW9uIGFuZCBqb2luaW5nIG9uIE1lZGlhU0ZVLlxuICpcbiAqIEBjb21wb25lbnRcbiAqIEBzZWxlY3RvciBhcHAtcHJlLWpvaW4tcGFnZVxuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQHRlbXBsYXRlVXJsIC4vcHJlLWpvaW4tcGFnZS5jb21wb25lbnQuaHRtbFxuICogQHN0eWxlVXJscyAuL3ByZS1qb2luLXBhZ2UuY29tcG9uZW50LmNzc1xuICogQGltcG9ydHMgW0NvbW1vbk1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZV1cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoaXMgY29tcG9uZW50IHByb3ZpZGVzIGZ1bmN0aW9uYWxpdHkgZm9yIHVzZXJzIHRvIGNyZWF0ZSBvciBqb2luIGEgcm9vbSBvbiBNZWRpYVNGVS5cbiAqIEl0IGluY2x1ZGVzIGZvcm0gdmFsaWRhdGlvbiwgZXJyb3IgaGFuZGxpbmcsIGFuZCBBUEkgcmVxdWVzdHMgdG8gdGhlIE1lZGlhU0ZVIHNlcnZpY2UuXG4gKlxuICogQHByb3BlcnR5IHthbnl9IHBhcmFtZXRlcnMgLSBJbnB1dCBwYXJhbWV0ZXJzIGZvciB0aGUgY29tcG9uZW50LlxuICogQHByb3BlcnR5IHtPYmplY3R9IGNyZWRlbnRpYWxzIC0gQVBJIGNyZWRlbnRpYWxzIGZvciBNZWRpYVNGVS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjcmVkZW50aWFscy5hcGlVc2VyTmFtZSAtIEFQSSB1c2VybmFtZS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjcmVkZW50aWFscy5hcGlLZXkgLSBBUEkga2V5LlxuICogQHByb3BlcnR5IHtib29sZWFufSBpc0NyZWF0ZU1vZGUgLSBGbGFnIHRvIHRvZ2dsZSBiZXR3ZWVuIGNyZWF0ZSBhbmQgam9pbiBtb2Rlcy5cbiAqIEBwcm9wZXJ0eSB7Rm9ybUdyb3VwfSBwcmVKb2luRm9ybSAtIEZvcm0gZ3JvdXAgZm9yIHByZS1qb2luIGZvcm0uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZXJyb3IgLSBFcnJvciBtZXNzYWdlIHRvIGRpc3BsYXkuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0Zvcm1CdWlsZGVyfSBmYiAtIEZvcm1CdWlsZGVyIHNlcnZpY2UgZm9yIGNyZWF0aW5nIGZvcm0gZ3JvdXBzLlxuICogQHBhcmFtIHtIdHRwQ2xpZW50fSBodHRwIC0gSHR0cENsaWVudCBzZXJ2aWNlIGZvciBtYWtpbmcgSFRUUCByZXF1ZXN0cy5cbiAqIEBwYXJhbSB7Q29va2llU2VydmljZX0gY29va2llU2VydmljZSAtIENvb2tpZVNlcnZpY2UgZm9yIG1hbmFnaW5nIGNvb2tpZXMuXG4gKlxuICogQG1ldGhvZCBuZ09uSW5pdFxuICogQGRlc2NyaXB0aW9uIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGRhdGEtYm91bmQgcHJvcGVydGllcyBhcmUgaW5pdGlhbGl6ZWQuXG4gKlxuICogQG1ldGhvZCB0b2dnbGVNb2RlXG4gKiBAZGVzY3JpcHRpb24gVG9nZ2xlcyBiZXR3ZWVuIGNyZWF0ZSBhbmQgam9pbiBtb2RlcyBhbmQgcmVzZXRzIHRoZSBlcnJvciBtZXNzYWdlLlxuICpcbiAqIEBtZXRob2QgaGFuZGxlQ3JlYXRlUm9vbVxuICogQGRlc2NyaXB0aW9uIEhhbmRsZXMgdGhlIGNyZWF0aW9uIG9mIGEgcm9vbSBvbiBNZWRpYVNGVS4gVmFsaWRhdGVzIGZvcm0gaW5wdXRzLCBzZW5kcyBhIHJlcXVlc3QgdG8gY3JlYXRlIGEgcm9vbSwgYW5kIGhhbmRsZXMgdGhlIHJlc3BvbnNlLlxuICpcbiAqIEBtZXRob2QgaGFuZGxlSm9pblJvb21cbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIGpvaW5pbmcgYSByb29tIG9uIE1lZGlhU0ZVLiBWYWxpZGF0ZXMgZm9ybSBpbnB1dHMsIHNlbmRzIGEgcmVxdWVzdCB0byBqb2luIGEgcm9vbSwgYW5kIGhhbmRsZXMgdGhlIHJlc3BvbnNlLlxuICpcbiAqIEBtZXRob2QgY2hlY2tMaW1pdHNBbmRNYWtlUmVxdWVzdFxuICogQGRlc2NyaXB0aW9uIENoZWNrcyByYXRlIGxpbWl0cyBhbmQgbWFrZXMgYSByZXF1ZXN0IHRvIGNvbm5lY3QgdG8gYSByb29tLiBIYW5kbGVzIHVuc3VjY2Vzc2Z1bCBhdHRlbXB0cyBhbmQgdXBkYXRlcyB0aGUgc3RhdGUgYWNjb3JkaW5nbHkuXG4gKlxuICogQG1ldGhvZCBjcmVhdGVSb29tT25NZWRpYVNGVVxuICogQGRlc2NyaXB0aW9uIFNlbmRzIGEgcmVxdWVzdCB0byBjcmVhdGUgYSByb29tIG9uIE1lZGlhU0ZVLlxuICogQHBhcmFtIHtPYmplY3R9IHBhcmFtcyAtIFBhcmFtZXRlcnMgZm9yIHRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHthbnl9IHBhcmFtcy5wYXlsb2FkIC0gUGF5bG9hZCBmb3IgdGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmFwaVVzZXJOYW1lIC0gQVBJIHVzZXJuYW1lLlxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5hcGlLZXkgLSBBUEkga2V5LlxuICogQHJldHVybnMge1Byb21pc2U8eyBkYXRhOiBDcmVhdGVKb2luUm9vbVJlc3BvbnNlIHwgQ3JlYXRlSm9pblJvb21FcnJvciB8IG51bGw7IHN1Y2Nlc3M6IGJvb2xlYW4gfT59IFJlc3BvbnNlIGZyb20gdGhlIEFQSS5cbiAqXG4gKiBAbWV0aG9kIGpvaW5Sb29tT25NZWRpYVNGVVxuICogQGRlc2NyaXB0aW9uIFNlbmRzIGEgcmVxdWVzdCB0byBqb2luIGEgcm9vbSBvbiBNZWRpYVNGVS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBQYXJhbWV0ZXJzIGZvciB0aGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7YW55fSBwYXJhbXMucGF5bG9hZCAtIFBheWxvYWQgZm9yIHRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5hcGlVc2VyTmFtZSAtIEFQSSB1c2VybmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuYXBpS2V5IC0gQVBJIGtleS5cbiAqIEByZXR1cm5zIHtQcm9taXNlPHsgZGF0YTogQ3JlYXRlSm9pblJvb21SZXNwb25zZSB8IENyZWF0ZUpvaW5Sb29tRXJyb3IgfCBudWxsOyBzdWNjZXNzOiBib29sZWFuIH0+fSBSZXNwb25zZSBmcm9tIHRoZSBBUEkuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtcHJlLWpvaW4tcGFnZVxuICogICBbcGFyYW1ldGVyc109XCJwcmVKb2luUGFnZVBhcmFtZXRlcnNcIlxuICogICBbY3JlZGVudGlhbHNdPVwieyBhcGlVc2VyTmFtZTogJ3VzZXJuYW1lJywgYXBpS2V5OiAnYXBpS2V5JyB9XCJcbiAqID48L2FwcC1wcmUtam9pbi1wYWdlPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1wcmUtam9pbi1wYWdlJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgdGVtcGxhdGVVcmw6ICcuL3ByZS1qb2luLXBhZ2UuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wcmUtam9pbi1wYWdlLmNvbXBvbmVudC5jc3MnXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUmVhY3RpdmVGb3Jtc01vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFByZUpvaW5QYWdlIHtcbiAgQElucHV0KCkgcGFyYW1ldGVyczogUHJlSm9pblBhZ2VQYXJhbWV0ZXJzID0ge30gYXMgUHJlSm9pblBhZ2VQYXJhbWV0ZXJzO1xuICBASW5wdXQoKSBjcmVkZW50aWFscyA9IHsgYXBpVXNlck5hbWU6ICd5b3VyQVBJVVNFUk5BTUUnLCBhcGlLZXk6ICd5b3VyQVBJS0VZJyB9O1xuXG4gIGlzQ3JlYXRlTW9kZSA9IGZhbHNlO1xuICBwcmVKb2luRm9ybTogRm9ybUdyb3VwO1xuICBlcnJvciA9ICcnO1xuICBpbWdTcmM6IHN0cmluZyA9IHRoaXMucGFyYW1ldGVycy5pbWdTcmMgfHwgJyc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBmYjogRm9ybUJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LFxuICAgIHByaXZhdGUgY29va2llU2VydmljZTogQ29va2llU2VydmljZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KCdwYXJhbWV0ZXJzJykgaW5qZWN0ZWRQYXJhbWV0ZXJzOiBQcmVKb2luUGFnZVBhcmFtZXRlcnMsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgnY3JlZGVudGlhbHMnKSBpbmplY3RlZENyZWRlbnRpYWxzOiBDcmVkZW50aWFscyxcbiAgKSB7XG4gICAgdGhpcy5wcmVKb2luRm9ybSA9IHRoaXMuZmIuZ3JvdXAoe1xuICAgICAgbmFtZTogWycnLCBWYWxpZGF0b3JzLnJlcXVpcmVkXSxcbiAgICAgIGR1cmF0aW9uOiBbJyddLFxuICAgICAgZXZlbnRUeXBlOiBbJyddLFxuICAgICAgY2FwYWNpdHk6IFsnJ10sXG4gICAgICBldmVudElEOiBbJyddLFxuICAgIH0pO1xuICAgIHRoaXMucGFyYW1ldGVycyA9IGluamVjdGVkUGFyYW1ldGVycyB8fCB0aGlzLnBhcmFtZXRlcnM7XG4gICAgdGhpcy5jcmVkZW50aWFscyA9IGluamVjdGVkQ3JlZGVudGlhbHMgfHwgdGhpcy5jcmVkZW50aWFscztcbiAgfVxuXG4gIHRvZ2dsZU1vZGUoKSB7XG4gICAgdGhpcy5pc0NyZWF0ZU1vZGUgPSAhdGhpcy5pc0NyZWF0ZU1vZGU7XG4gICAgdGhpcy5lcnJvciA9ICcnO1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlQ3JlYXRlUm9vbSgpIHtcbiAgICBpZiAodGhpcy5wcmVKb2luRm9ybS5pbnZhbGlkKSB7XG4gICAgICB0aGlzLmVycm9yID0gJ1BsZWFzZSBmaWxsIGFsbCB0aGUgZmllbGRzLic7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBuYW1lLCBkdXJhdGlvbiwgZXZlbnRUeXBlLCBjYXBhY2l0eSB9ID0gdGhpcy5wcmVKb2luRm9ybS52YWx1ZTtcblxuICAgIGlmICghbmFtZSB8fCAhZHVyYXRpb24gfHwgIWV2ZW50VHlwZSB8fCAhY2FwYWNpdHkpIHtcbiAgICAgIHRoaXMuZXJyb3IgPSAnUGxlYXNlIGZpbGwgYWxsIHRoZSBmaWVsZHMuJztcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYXlsb2FkID0ge1xuICAgICAgYWN0aW9uOiAnY3JlYXRlJyxcbiAgICAgIGR1cmF0aW9uOiBwYXJzZUludChkdXJhdGlvbiksXG4gICAgICBjYXBhY2l0eTogcGFyc2VJbnQoY2FwYWNpdHkpLFxuICAgICAgZXZlbnRUeXBlLFxuICAgICAgdXNlck5hbWU6IG5hbWUsXG4gICAgfTtcblxuICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUodHJ1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmNyZWF0ZVJvb21Pbk1lZGlhU0ZVKHtcbiAgICAgICAgcGF5bG9hZCxcbiAgICAgICAgYXBpVXNlck5hbWU6IHRoaXMuY3JlZGVudGlhbHMuYXBpVXNlck5hbWUsXG4gICAgICAgIGFwaUtleTogdGhpcy5jcmVkZW50aWFscy5hcGlLZXksXG4gICAgICB9KTtcblxuICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MgJiYgcmVzcG9uc2UuZGF0YSAmJiAncm9vbU5hbWUnIGluIHJlc3BvbnNlLmRhdGEpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5jaGVja0xpbWl0c0FuZE1ha2VSZXF1ZXN0KHtcbiAgICAgICAgICBhcGlVc2VyTmFtZTogcmVzcG9uc2UuZGF0YS5yb29tTmFtZSxcbiAgICAgICAgICBhcGlUb2tlbjogcmVzcG9uc2UuZGF0YS5zZWNyZXQsXG4gICAgICAgICAgbGluazogcmVzcG9uc2UuZGF0YS5saW5rLFxuICAgICAgICAgIHVzZXJOYW1lOiBuYW1lLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5lcnJvciA9ICcnO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgICAgIHRoaXMuZXJyb3IgPSBgJHtcbiAgICAgICAgICByZXNwb25zZS5kYXRhID8gKCdlcnJvcicgaW4gcmVzcG9uc2UuZGF0YSA/IHJlc3BvbnNlLmRhdGEuZXJyb3IgOiAnJykgOiAnJ1xuICAgICAgICB9YDtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgICB0aGlzLmVycm9yID0gYFVuYWJsZSB0byBjb25uZWN0LiAkeyhlcnJvciBhcyBhbnkpLm1lc3NhZ2V9YDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBoYW5kbGVKb2luUm9vbSgpIHtcbiAgICBpZiAodGhpcy5wcmVKb2luRm9ybS5pbnZhbGlkKSB7XG4gICAgICB0aGlzLmVycm9yID0gJ1BsZWFzZSBmaWxsIGFsbCB0aGUgZmllbGRzLic7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBuYW1lLCBldmVudElEIH0gPSB0aGlzLnByZUpvaW5Gb3JtLnZhbHVlO1xuXG4gICAgaWYgKCFuYW1lIHx8ICFldmVudElEKSB7XG4gICAgICB0aGlzLmVycm9yID0gJ1BsZWFzZSBmaWxsIGFsbCB0aGUgZmllbGRzLic7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIGFjdGlvbjogJ2pvaW4nLFxuICAgICAgbWVldGluZ0lEOiBldmVudElELFxuICAgICAgdXNlck5hbWU6IG5hbWUsXG4gICAgfTtcblxuICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUodHJ1ZSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmpvaW5Sb29tT25NZWRpYVNGVSh7XG4gICAgICAgIHBheWxvYWQsXG4gICAgICAgIGFwaVVzZXJOYW1lOiB0aGlzLmNyZWRlbnRpYWxzLmFwaVVzZXJOYW1lLFxuICAgICAgICBhcGlLZXk6IHRoaXMuY3JlZGVudGlhbHMuYXBpS2V5LFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzICYmIHJlc3BvbnNlLmRhdGEgJiYgJ3Jvb21OYW1lJyBpbiByZXNwb25zZS5kYXRhKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuY2hlY2tMaW1pdHNBbmRNYWtlUmVxdWVzdCh7XG4gICAgICAgICAgYXBpVXNlck5hbWU6IHJlc3BvbnNlLmRhdGEucm9vbU5hbWUsXG4gICAgICAgICAgYXBpVG9rZW46IHJlc3BvbnNlLmRhdGEuc2VjcmV0LFxuICAgICAgICAgIGxpbms6IHJlc3BvbnNlLmRhdGEubGluayxcbiAgICAgICAgICB1c2VyTmFtZTogbmFtZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgICAgICB0aGlzLmVycm9yID0gYFVuYWJsZSB0byBjb25uZWN0IHRvIHJvb20uICR7XG4gICAgICAgICAgcmVzcG9uc2UuZGF0YSA/ICgnZXJyb3InIGluIHJlc3BvbnNlLmRhdGEgPyByZXNwb25zZS5kYXRhLmVycm9yIDogJycpIDogJydcbiAgICAgICAgfWA7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgICAgdGhpcy5lcnJvciA9IGBVbmFibGUgdG8gY29ubmVjdC4gJHsoZXJyb3IgYXMgYW55KS5tZXNzYWdlfWA7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY2hlY2tMaW1pdHNBbmRNYWtlUmVxdWVzdCh7XG4gICAgYXBpVXNlck5hbWUsXG4gICAgYXBpVG9rZW4sXG4gICAgbGluayxcbiAgICBhcGlLZXkgPSAnJyxcbiAgICB1c2VyTmFtZSxcbiAgfToge1xuICAgIGFwaVVzZXJOYW1lOiBzdHJpbmc7XG4gICAgYXBpVG9rZW46IHN0cmluZztcbiAgICBsaW5rOiBzdHJpbmc7XG4gICAgYXBpS2V5Pzogc3RyaW5nO1xuICAgIHVzZXJOYW1lOiBzdHJpbmc7XG4gIH0pIHtcbiAgICBsZXQgdW5zdWNjZXNzZnVsQXR0ZW1wdHMgPSBwYXJzZUludCh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KCd1bnN1Y2Nlc3NmdWxBdHRlbXB0cycpKSB8fCAwO1xuICAgIGxldCBsYXN0UmVxdWVzdFRpbWVzdGFtcCA9IHBhcnNlSW50KHRoaXMuY29va2llU2VydmljZS5nZXQoJ2xhc3RSZXF1ZXN0VGltZXN0YW1wJykpIHx8IDA7XG5cbiAgICBpZiAodW5zdWNjZXNzZnVsQXR0ZW1wdHMgPj0gTUFYX0FUVEVNUFRTKSB7XG4gICAgICBpZiAoRGF0ZS5ub3coKSAtIGxhc3RSZXF1ZXN0VGltZXN0YW1wIDwgUkFURV9MSU1JVF9EVVJBVElPTikge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdUb28gbWFueSB1bnN1Y2Nlc3NmdWwgYXR0ZW1wdHMuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoJ2xhc3RSZXF1ZXN0VGltZXN0YW1wJywgRGF0ZS5ub3coKS50b1N0cmluZygpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5zdWNjZXNzZnVsQXR0ZW1wdHMgPSAwO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCd1bnN1Y2Nlc3NmdWxBdHRlbXB0cycsIHVuc3VjY2Vzc2Z1bEF0dGVtcHRzLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCdsYXN0UmVxdWVzdFRpbWVzdGFtcCcsIERhdGUubm93KCkudG9TdHJpbmcoKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUodHJ1ZSk7XG5cbiAgICAgIGNvbnN0IHNvY2tldFByb21pc2UgPSBhd2FpdCB0aGlzLnBhcmFtZXRlcnMuY29ubmVjdFNvY2tldCh7XG4gICAgICAgIGFwaVVzZXJOYW1lLFxuICAgICAgICBhcGlLZXksXG4gICAgICAgIGFwaVRva2VuLFxuICAgICAgICBsaW5rLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHRpbWVvdXRQcm9taXNlID0gbmV3IFByb21pc2UoKF8sIHJlamVjdCkgPT5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiByZWplY3QobmV3IEVycm9yKCdSZXF1ZXN0IHRpbWVkIG91dCcpKSwgVElNRU9VVF9EVVJBVElPTiksXG4gICAgICApO1xuXG4gICAgICBjb25zdCBzb2NrZXQgPSBhd2FpdCBQcm9taXNlLnJhY2UoW3NvY2tldFByb21pc2UsIHRpbWVvdXRQcm9taXNlXSk7XG5cbiAgICAgIGlmIChzb2NrZXQgJiYgc29ja2V0IGluc3RhbmNlb2YgU29ja2V0ICYmIHNvY2tldC5pZCkge1xuICAgICAgICB1bnN1Y2Nlc3NmdWxBdHRlbXB0cyA9IDA7XG4gICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoJ3Vuc3VjY2Vzc2Z1bEF0dGVtcHRzJywgdW5zdWNjZXNzZnVsQXR0ZW1wdHMudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoJ2xhc3RSZXF1ZXN0VGltZXN0YW1wJywgRGF0ZS5ub3coKS50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVNvY2tldChzb2NrZXQpO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlQXBpVXNlck5hbWUoYXBpVXNlck5hbWUpO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlQXBpVG9rZW4oYXBpVG9rZW4pO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlTGluayhsaW5rKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZVJvb21OYW1lKGFwaVVzZXJOYW1lKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZU1lbWJlcih1c2VyTmFtZSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVWYWxpZGF0ZWQodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1bnN1Y2Nlc3NmdWxBdHRlbXB0cyArPSAxO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCd1bnN1Y2Nlc3NmdWxBdHRlbXB0cycsIHVuc3VjY2Vzc2Z1bEF0dGVtcHRzLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCdsYXN0UmVxdWVzdFRpbWVzdGFtcCcsIERhdGUubm93KCkudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuXG4gICAgICAgIGlmICh1bnN1Y2Nlc3NmdWxBdHRlbXB0cyA+PSBNQVhfQVRURU1QVFMpIHtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgbWVzc2FnZTogJ1RvbyBtYW55IHVuc3VjY2Vzc2Z1bCBhdHRlbXB0cy4gUGxlYXNlIHRyeSBhZ2FpbiBsYXRlci4nLFxuICAgICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgICAgbWVzc2FnZTogJ0ludmFsaWQgY3JlZGVudGlhbHMuJyxcbiAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1VuYWJsZSB0byBjb25uZWN0LiBDaGVjayB5b3VyIGNyZWRlbnRpYWxzIGFuZCB0cnkgYWdhaW4uJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgfSk7XG5cbiAgICAgIHVuc3VjY2Vzc2Z1bEF0dGVtcHRzICs9IDE7XG4gICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCd1bnN1Y2Nlc3NmdWxBdHRlbXB0cycsIHVuc3VjY2Vzc2Z1bEF0dGVtcHRzLnRvU3RyaW5nKCkpO1xuICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgnbGFzdFJlcXVlc3RUaW1lc3RhbXAnLCBEYXRlLm5vdygpLnRvU3RyaW5nKCkpO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZShmYWxzZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgY3JlYXRlUm9vbU9uTWVkaWFTRlUoe1xuICAgIHBheWxvYWQsXG4gICAgYXBpVXNlck5hbWUsXG4gICAgYXBpS2V5LFxuICB9OiB7XG4gICAgcGF5bG9hZDogYW55O1xuICAgIGFwaVVzZXJOYW1lOiBzdHJpbmc7XG4gICAgYXBpS2V5OiBzdHJpbmc7XG4gIH0pOiBQcm9taXNlPHsgZGF0YTogQ3JlYXRlSm9pblJvb21SZXNwb25zZSB8IENyZWF0ZUpvaW5Sb29tRXJyb3IgfCBudWxsOyBzdWNjZXNzOiBib29sZWFuIH0+IHtcbiAgICB0cnkge1xuICAgICAgaWYgKFxuICAgICAgICAhYXBpVXNlck5hbWUgfHxcbiAgICAgICAgIWFwaUtleSB8fFxuICAgICAgICBhcGlVc2VyTmFtZSA9PT0gJ3lvdXJBUElVU0VSTkFNRScgfHxcbiAgICAgICAgYXBpS2V5ID09PSAneW91ckFQSUtFWScgfHxcbiAgICAgICAgYXBpS2V5Lmxlbmd0aCAhPT0gNjQgfHxcbiAgICAgICAgYXBpVXNlck5hbWUubGVuZ3RoIDwgNlxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiB7IGRhdGE6IHsgZXJyb3I6ICdJbnZhbGlkIGNyZWRlbnRpYWxzJyB9LCBzdWNjZXNzOiBmYWxzZSB9O1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IHRoaXMuaHR0cFxuICAgICAgICAucG9zdDxhbnk+KCdodHRwczovL21lZGlhc2Z1LmNvbS92MS9yb29tcy8nLCBwYXlsb2FkLCB7XG4gICAgICAgICAgaGVhZGVyczogbmV3IEh0dHBIZWFkZXJzKHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICAgICBBdXRob3JpemF0aW9uOiBgQmVhcmVyICR7YXBpVXNlck5hbWV9OiR7YXBpS2V5fWAsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0pXG4gICAgICAgIC50b1Byb21pc2UoKTtcblxuICAgICAgcmV0dXJuIHsgZGF0YTogcmVzcG9uc2UsIHN1Y2Nlc3M6IHRydWUgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgZXJyb3JNZXNzYWdlID0gKGVycm9yIGFzIGFueSkucmVhc29uID8gKGVycm9yIGFzIGFueSkucmVhc29uIDogJ3Vua25vd24gZXJyb3InO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGF0YTogeyBlcnJvcjogYFVuYWJsZSB0byBjcmVhdGUgcm9vbTsgc29tZXRoaW5nIHdlbnQgd3JvbmcgJHtlcnJvck1lc3NhZ2V9YCB9LFxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgam9pblJvb21Pbk1lZGlhU0ZVKHtcbiAgICBwYXlsb2FkLFxuICAgIGFwaVVzZXJOYW1lLFxuICAgIGFwaUtleSxcbiAgfToge1xuICAgIHBheWxvYWQ6IGFueTtcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICAgIGFwaUtleTogc3RyaW5nO1xuICB9KTogUHJvbWlzZTx7IGRhdGE6IENyZWF0ZUpvaW5Sb29tUmVzcG9uc2UgfCBDcmVhdGVKb2luUm9vbUVycm9yIHwgbnVsbDsgc3VjY2VzczogYm9vbGVhbiB9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChcbiAgICAgICAgIWFwaVVzZXJOYW1lIHx8XG4gICAgICAgICFhcGlLZXkgfHxcbiAgICAgICAgYXBpVXNlck5hbWUgPT09ICd5b3VyQVBJVVNFUk5BTUUnIHx8XG4gICAgICAgIGFwaUtleSA9PT0gJ3lvdXJBUElLRVknIHx8XG4gICAgICAgIGFwaUtleS5sZW5ndGggIT09IDY0IHx8XG4gICAgICAgIGFwaVVzZXJOYW1lLmxlbmd0aCA8IDZcbiAgICAgICkge1xuICAgICAgICByZXR1cm4geyBkYXRhOiB7IGVycm9yOiAnSW52YWxpZCBjcmVkZW50aWFscycgfSwgc3VjY2VzczogZmFsc2UgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHBcbiAgICAgICAgLnBvc3Q8YW55PignaHR0cHM6Ly9tZWRpYXNmdS5jb20vdjEvcm9vbXMvJywgcGF5bG9hZCwge1xuICAgICAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FwaVVzZXJOYW1lfToke2FwaUtleX1gLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9KVxuICAgICAgICAudG9Qcm9taXNlKCk7XG5cbiAgICAgIHJldHVybiB7IGRhdGE6IHJlc3BvbnNlLCBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IChlcnJvciBhcyBhbnkpLnJlYXNvbiA/IChlcnJvciBhcyBhbnkpLnJlYXNvbiA6ICd1bmtub3duIGVycm9yJztcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IHsgZXJyb3I6IGBVbmFibGUgdG8gam9pbiByb29tOyBzb21ldGhpbmcgd2VudCB3cm9uZyAke2Vycm9yTWVzc2FnZX1gIH0sXG4gICAgICAgIHN1Y2Nlc3M6IGZhbHNlLFxuICAgICAgfTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJjb250YWluZXItZmx1aWRcIj5cclxuICA8ZGl2IGNsYXNzPVwibG9nby1jb250YWluZXJcIj5cclxuICAgIDxpbWcgW3NyY109XCJpbWdTcmMgfHwgJ2h0dHBzOi8vbWVkaWFzZnUuY29tL2ltYWdlcy9sb2dvMTkyLnBuZydcIiBjbGFzcz1cImxvZ28taW1hZ2VcIiBhbHQ9XCJMb2dvXCIgLz5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiaW5wdXQtY29udGFpbmVyXCI+XHJcbiAgICA8Zm9ybSBbZm9ybUdyb3VwXT1cInByZUpvaW5Gb3JtXCI+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiRGlzcGxheSBOYW1lXCIgZm9ybUNvbnRyb2xOYW1lPVwibmFtZVwiIGNsYXNzPVwiaW5wdXQtZmllbGRcIiAvPlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiaXNDcmVhdGVNb2RlXCI+XHJcbiAgICAgICAgPGlucHV0IHR5cGU9XCJ0ZXh0XCIgcGxhY2Vob2xkZXI9XCJEdXJhdGlvbiAobWludXRlcylcIiBmb3JtQ29udHJvbE5hbWU9XCJkdXJhdGlvblwiIGNsYXNzPVwiaW5wdXQtZmllbGRcIiAvPlxyXG4gICAgICAgIDxzZWxlY3QgZm9ybUNvbnRyb2xOYW1lPVwiZXZlbnRUeXBlXCIgY2xhc3M9XCJzZWxlY3QtZmllbGRcIj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgRXZlbnQgVHlwZTwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImNoYXRcIj5DaGF0PC9vcHRpb24+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYnJvYWRjYXN0XCI+QnJvYWRjYXN0PC9vcHRpb24+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwid2ViaW5hclwiPldlYmluYXI8L29wdGlvbj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJjb25mZXJlbmNlXCI+Q29uZmVyZW5jZTwvb3B0aW9uPlxyXG4gICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiUm9vbSBDYXBhY2l0eVwiIGZvcm1Db250cm9sTmFtZT1cImNhcGFjaXR5XCIgY2xhc3M9XCJpbnB1dC1maWVsZFwiIC8+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImhhbmRsZUNyZWF0ZVJvb20oKVwiIGNsYXNzPVwiYWN0aW9uLWJ1dHRvblwiPkNyZWF0ZSBSb29tPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ0lmPVwiIWlzQ3JlYXRlTW9kZVwiPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiRXZlbnQgSURcIiBmb3JtQ29udHJvbE5hbWU9XCJldmVudElEXCIgY2xhc3M9XCJpbnB1dC1maWVsZFwiIC8+XHJcbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgKGNsaWNrKT1cImhhbmRsZUpvaW5Sb29tKClcIiBjbGFzcz1cImFjdGlvbi1idXR0b25cIj5Kb2luIFJvb208L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxwICpuZ0lmPVwiZXJyb3JcIiBjbGFzcz1cImVycm9yXCI+e3sgZXJyb3IgfX08L3A+XHJcbiAgICA8L2Zvcm0+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cIm9yLWNvbnRhaW5lclwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJvci10ZXh0XCI+T1I8L3NwYW4+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cInRvZ2dsZS1jb250YWluZXJcIj5cclxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJ0b2dnbGVNb2RlKClcIiBjbGFzcz1cInRvZ2dsZS1idXR0b25cIj5cclxuICAgICAge3sgaXNDcmVhdGVNb2RlID8gJ1N3aXRjaCB0byBKb2luIE1vZGUnIDogJ1N3aXRjaCB0byBDcmVhdGUgTW9kZScgfX1cclxuICAgIDwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19