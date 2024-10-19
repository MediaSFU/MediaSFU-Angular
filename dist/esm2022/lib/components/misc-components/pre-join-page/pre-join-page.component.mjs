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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJlLWpvaW4tcGFnZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9taXNjLWNvbXBvbmVudHMvcHJlLWpvaW4tcGFnZS9wcmUtam9pbi1wYWdlLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21pc2MtY29tcG9uZW50cy9wcmUtam9pbi1wYWdlL3ByZS1qb2luLXBhZ2UuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRSxPQUFPLEVBQWMsV0FBVyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDL0QsT0FBTyxFQUEwQixVQUFVLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV6RixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGtCQUFrQixDQUFDOzs7Ozs7QUErRDFDLE1BQU0sWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDLCtEQUErRDtBQUN4RixNQUFNLG1CQUFtQixHQUFHLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLDBCQUEwQjtBQUMxRSxNQUFNLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxDQUFDLDRCQUE0QjtBQUU1RDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeURHO0FBUUgsTUFBTSxPQUFPLFdBQVc7SUFVWjtJQUNBO0lBQ0E7SUFYRCxVQUFVLEdBQTBCLEVBQTJC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QUFDO1FBQzNDLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsTUFBTSxZQUFZLEdBQUksS0FBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUUsS0FBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDO1lBQ3JGLE9BQU87Z0JBQ0wsSUFBSSxFQUFFLEVBQUUsS0FBSyxFQUFFLDZDQUE2QyxZQUFZLEVBQUUsRUFBRTtnQkFDNUUsT0FBTyxFQUFFLEtBQUs7YUFDZixDQUFDO1FBQ0osQ0FBQztJQUNILENBQUM7dUdBN1NVLFdBQVcsb0dBYUEsWUFBWSw2QkFDWixhQUFhOzJGQWR4QixXQUFXLCtJQ3pJeEIseXpEQW1DQSxtdENEb0dZLFlBQVksa0lBQUUsbUJBQW1COzsyRkFFaEMsV0FBVztrQkFQdkIsU0FBUzsrQkFDRSxtQkFBbUIsY0FDakIsSUFBSSxXQUdQLENBQUMsWUFBWSxFQUFFLG1CQUFtQixDQUFDOzswQkFlekMsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxZQUFZOzswQkFDL0IsUUFBUTs7MEJBQUksTUFBTTsyQkFBQyxhQUFhO3lDQWIxQixVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdCwgSW5wdXQsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwQ2xpZW50LCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IEZvcm1CdWlsZGVyLCBGb3JtR3JvdXAsIFZhbGlkYXRvcnMsIFJlYWN0aXZlRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBDb29raWVTZXJ2aWNlIH0gZnJvbSAnbmd4LWNvb2tpZS1zZXJ2aWNlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IENvbm5lY3RTb2NrZXRUeXBlIH0gZnJvbSAnLi4vLi4vLi4vc29ja2V0cy9zb2NrZXQtbWFuYWdlci5zZXJ2aWNlJztcbmltcG9ydCB7IFNob3dBbGVydCB9IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJlSm9pblBhZ2VQYXJhbWV0ZXJzIHtcbiAgaW1nU3JjPzogc3RyaW5nO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIHVwZGF0ZUlzTG9hZGluZ01vZGFsVmlzaWJsZTogKHZpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGNvbm5lY3RTb2NrZXQ6IENvbm5lY3RTb2NrZXRUeXBlO1xuICB1cGRhdGVTb2NrZXQ6IChzb2NrZXQ6IFNvY2tldCkgPT4gdm9pZDtcbiAgdXBkYXRlVmFsaWRhdGVkOiAodmFsaWRhdGVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVBcGlVc2VyTmFtZTogKHVzZXJOYW1lOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUFwaVRva2VuOiAodG9rZW46IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlTGluazogKGxpbms6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlUm9vbU5hbWU6IChyb29tTmFtZTogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVNZW1iZXI6IChtZW1iZXI6IHN0cmluZykgPT4gdm9pZDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDcmVkZW50aWFscyB7XG4gIGFwaVVzZXJOYW1lOiBzdHJpbmc7XG4gIGFwaUtleTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByZUpvaW5QYWdlT3B0aW9ucyB7XG4gIHBhcmFtZXRlcnM6IFByZUpvaW5QYWdlUGFyYW1ldGVycztcbiAgY3JlZGVudGlhbHM/OiBDcmVkZW50aWFscztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDcmVhdGVKb2luUm9vbVJlc3BvbnNlIHtcbiAgbWVzc2FnZTogc3RyaW5nO1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzZWN1cmVDb2RlPzogc3RyaW5nO1xuICBwdWJsaWNVUkw6IHN0cmluZztcbiAgbGluazogc3RyaW5nO1xuICBzZWNyZXQ6IHN0cmluZztcbiAgc3VjY2VzczogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDcmVhdGVKb2luUm9vbUVycm9yIHtcbiAgZXJyb3I6IHN0cmluZztcbiAgc3VjY2Vzcz86IGJvb2xlYW47XG59XG5cbmV4cG9ydCB0eXBlIENyZWF0ZUpvaW5Sb29tVHlwZSA9IChvcHRpb25zOiB7XG4gIHBheWxvYWQ6IGFueTtcbiAgYXBpVXNlck5hbWU6IHN0cmluZztcbiAgYXBpS2V5OiBzdHJpbmc7XG59KSA9PiBQcm9taXNlPHtcbiAgZGF0YTogQ3JlYXRlSm9pblJvb21SZXNwb25zZSB8IENyZWF0ZUpvaW5Sb29tRXJyb3IgfCBudWxsO1xuICBzdWNjZXNzOiBib29sZWFuO1xufT47XG5cbmV4cG9ydCB0eXBlIENyZWF0ZVJvb21Pbk1lZGlhU0ZVVHlwZSA9IChvcHRpb25zOiB7XG4gIHBheWxvYWQ6IGFueTtcbiAgYXBpVXNlck5hbWU6IHN0cmluZztcbiAgYXBpS2V5OiBzdHJpbmc7XG59KSA9PiBQcm9taXNlPHtcbiAgZGF0YTogQ3JlYXRlSm9pblJvb21SZXNwb25zZSB8IENyZWF0ZUpvaW5Sb29tRXJyb3IgfCBudWxsO1xuICBzdWNjZXNzOiBib29sZWFuO1xufT47XG5cbmV4cG9ydCB0eXBlIFByZUpvaW5QYWdlVHlwZSA9IChvcHRpb25zOiBQcmVKb2luUGFnZU9wdGlvbnMpID0+IHZvaWQ7XG5cbmNvbnN0IE1BWF9BVFRFTVBUUyA9IDIwOyAvLyBNYXhpbXVtIG51bWJlciBvZiB1bnN1Y2Nlc3NmdWwgYXR0ZW1wdHMgYmVmb3JlIHJhdGUgbGltaXRpbmdcbmNvbnN0IFJBVEVfTElNSVRfRFVSQVRJT04gPSAzICogNjAgKiA2MCAqIDEwMDA7IC8vIDMgaG91cnMgaW4gbWlsbGlzZWNvbmRzXG5jb25zdCBUSU1FT1VUX0RVUkFUSU9OID0gMTAwMDA7IC8vIDUgc2Vjb25kcyBpbiBtaWxsaXNlY29uZHNcblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IFByZUpvaW5QYWdlIGNvbXBvbmVudCBmb3IgaGFuZGxpbmcgcm9vbSBjcmVhdGlvbiBhbmQgam9pbmluZyBvbiBNZWRpYVNGVS5cbiAqXG4gKiBAY29tcG9uZW50XG4gKiBAc2VsZWN0b3IgYXBwLXByZS1qb2luLXBhZ2VcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEB0ZW1wbGF0ZVVybCAuL3ByZS1qb2luLXBhZ2UuY29tcG9uZW50Lmh0bWxcbiAqIEBzdHlsZVVybHMgLi9wcmUtam9pbi1wYWdlLmNvbXBvbmVudC5jc3NcbiAqIEBpbXBvcnRzIFtDb21tb25Nb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGVdXG4gKlxuICogQGRlc2NyaXB0aW9uXG4gKiBUaGlzIGNvbXBvbmVudCBwcm92aWRlcyBmdW5jdGlvbmFsaXR5IGZvciB1c2VycyB0byBjcmVhdGUgb3Igam9pbiBhIHJvb20gb24gTWVkaWFTRlUuXG4gKiBJdCBpbmNsdWRlcyBmb3JtIHZhbGlkYXRpb24sIGVycm9yIGhhbmRsaW5nLCBhbmQgQVBJIHJlcXVlc3RzIHRvIHRoZSBNZWRpYVNGVSBzZXJ2aWNlLlxuICpcbiAqIEBwcm9wZXJ0eSB7YW55fSBwYXJhbWV0ZXJzIC0gSW5wdXQgcGFyYW1ldGVycyBmb3IgdGhlIGNvbXBvbmVudC5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBjcmVkZW50aWFscyAtIEFQSSBjcmVkZW50aWFscyBmb3IgTWVkaWFTRlUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3JlZGVudGlhbHMuYXBpVXNlck5hbWUgLSBBUEkgdXNlcm5hbWUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gY3JlZGVudGlhbHMuYXBpS2V5IC0gQVBJIGtleS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNDcmVhdGVNb2RlIC0gRmxhZyB0byB0b2dnbGUgYmV0d2VlbiBjcmVhdGUgYW5kIGpvaW4gbW9kZXMuXG4gKiBAcHJvcGVydHkge0Zvcm1Hcm91cH0gcHJlSm9pbkZvcm0gLSBGb3JtIGdyb3VwIGZvciBwcmUtam9pbiBmb3JtLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGVycm9yIC0gRXJyb3IgbWVzc2FnZSB0byBkaXNwbGF5LlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQHBhcmFtIHtGb3JtQnVpbGRlcn0gZmIgLSBGb3JtQnVpbGRlciBzZXJ2aWNlIGZvciBjcmVhdGluZyBmb3JtIGdyb3Vwcy5cbiAqIEBwYXJhbSB7SHR0cENsaWVudH0gaHR0cCAtIEh0dHBDbGllbnQgc2VydmljZSBmb3IgbWFraW5nIEhUVFAgcmVxdWVzdHMuXG4gKiBAcGFyYW0ge0Nvb2tpZVNlcnZpY2V9IGNvb2tpZVNlcnZpY2UgLSBDb29raWVTZXJ2aWNlIGZvciBtYW5hZ2luZyBjb29raWVzLlxuICpcbiAqIEBtZXRob2QgbmdPbkluaXRcbiAqIEBkZXNjcmlwdGlvbiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBkYXRhLWJvdW5kIHByb3BlcnRpZXMgYXJlIGluaXRpYWxpemVkLlxuICpcbiAqIEBtZXRob2QgdG9nZ2xlTW9kZVxuICogQGRlc2NyaXB0aW9uIFRvZ2dsZXMgYmV0d2VlbiBjcmVhdGUgYW5kIGpvaW4gbW9kZXMgYW5kIHJlc2V0cyB0aGUgZXJyb3IgbWVzc2FnZS5cbiAqXG4gKiBAbWV0aG9kIGhhbmRsZUNyZWF0ZVJvb21cbiAqIEBkZXNjcmlwdGlvbiBIYW5kbGVzIHRoZSBjcmVhdGlvbiBvZiBhIHJvb20gb24gTWVkaWFTRlUuIFZhbGlkYXRlcyBmb3JtIGlucHV0cywgc2VuZHMgYSByZXF1ZXN0IHRvIGNyZWF0ZSBhIHJvb20sIGFuZCBoYW5kbGVzIHRoZSByZXNwb25zZS5cbiAqXG4gKiBAbWV0aG9kIGhhbmRsZUpvaW5Sb29tXG4gKiBAZGVzY3JpcHRpb24gSGFuZGxlcyBqb2luaW5nIGEgcm9vbSBvbiBNZWRpYVNGVS4gVmFsaWRhdGVzIGZvcm0gaW5wdXRzLCBzZW5kcyBhIHJlcXVlc3QgdG8gam9pbiBhIHJvb20sIGFuZCBoYW5kbGVzIHRoZSByZXNwb25zZS5cbiAqXG4gKiBAbWV0aG9kIGNoZWNrTGltaXRzQW5kTWFrZVJlcXVlc3RcbiAqIEBkZXNjcmlwdGlvbiBDaGVja3MgcmF0ZSBsaW1pdHMgYW5kIG1ha2VzIGEgcmVxdWVzdCB0byBjb25uZWN0IHRvIGEgcm9vbS4gSGFuZGxlcyB1bnN1Y2Nlc3NmdWwgYXR0ZW1wdHMgYW5kIHVwZGF0ZXMgdGhlIHN0YXRlIGFjY29yZGluZ2x5LlxuICpcbiAqIEBtZXRob2QgY3JlYXRlUm9vbU9uTWVkaWFTRlVcbiAqIEBkZXNjcmlwdGlvbiBTZW5kcyBhIHJlcXVlc3QgdG8gY3JlYXRlIGEgcm9vbSBvbiBNZWRpYVNGVS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBwYXJhbXMgLSBQYXJhbWV0ZXJzIGZvciB0aGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7YW55fSBwYXJhbXMucGF5bG9hZCAtIFBheWxvYWQgZm9yIHRoZSByZXF1ZXN0LlxuICogQHBhcmFtIHtzdHJpbmd9IHBhcmFtcy5hcGlVc2VyTmFtZSAtIEFQSSB1c2VybmFtZS5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuYXBpS2V5IC0gQVBJIGtleS5cbiAqIEByZXR1cm5zIHtQcm9taXNlPHsgZGF0YTogQ3JlYXRlSm9pblJvb21SZXNwb25zZSB8IENyZWF0ZUpvaW5Sb29tRXJyb3IgfCBudWxsOyBzdWNjZXNzOiBib29sZWFuIH0+fSBSZXNwb25zZSBmcm9tIHRoZSBBUEkuXG4gKlxuICogQG1ldGhvZCBqb2luUm9vbU9uTWVkaWFTRlVcbiAqIEBkZXNjcmlwdGlvbiBTZW5kcyBhIHJlcXVlc3QgdG8gam9pbiBhIHJvb20gb24gTWVkaWFTRlUuXG4gKiBAcGFyYW0ge09iamVjdH0gcGFyYW1zIC0gUGFyYW1ldGVycyBmb3IgdGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge2FueX0gcGFyYW1zLnBheWxvYWQgLSBQYXlsb2FkIGZvciB0aGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7c3RyaW5nfSBwYXJhbXMuYXBpVXNlck5hbWUgLSBBUEkgdXNlcm5hbWUuXG4gKiBAcGFyYW0ge3N0cmluZ30gcGFyYW1zLmFwaUtleSAtIEFQSSBrZXkuXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx7IGRhdGE6IENyZWF0ZUpvaW5Sb29tUmVzcG9uc2UgfCBDcmVhdGVKb2luUm9vbUVycm9yIHwgbnVsbDsgc3VjY2VzczogYm9vbGVhbiB9Pn0gUmVzcG9uc2UgZnJvbSB0aGUgQVBJLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcHJlLWpvaW4tcGFnZScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHRlbXBsYXRlVXJsOiAnLi9wcmUtam9pbi1wYWdlLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcHJlLWpvaW4tcGFnZS5jb21wb25lbnQuY3NzJ10sXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFJlYWN0aXZlRm9ybXNNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBQcmVKb2luUGFnZSB7XG4gIEBJbnB1dCgpIHBhcmFtZXRlcnM6IFByZUpvaW5QYWdlUGFyYW1ldGVycyA9IHt9IGFzIFByZUpvaW5QYWdlUGFyYW1ldGVycztcbiAgQElucHV0KCkgY3JlZGVudGlhbHMgPSB7IGFwaVVzZXJOYW1lOiAneW91ckFQSVVTRVJOQU1FJywgYXBpS2V5OiAneW91ckFQSUtFWScgfTtcblxuICBpc0NyZWF0ZU1vZGUgPSBmYWxzZTtcbiAgcHJlSm9pbkZvcm06IEZvcm1Hcm91cDtcbiAgZXJyb3IgPSAnJztcbiAgaW1nU3JjOiBzdHJpbmcgPSB0aGlzLnBhcmFtZXRlcnMuaW1nU3JjIHx8ICcnO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgZmI6IEZvcm1CdWlsZGVyLFxuICAgIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCxcbiAgICBwcml2YXRlIGNvb2tpZVNlcnZpY2U6IENvb2tpZVNlcnZpY2UsXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdCgncGFyYW1ldGVycycpIGluamVjdGVkUGFyYW1ldGVyczogUHJlSm9pblBhZ2VQYXJhbWV0ZXJzLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoJ2NyZWRlbnRpYWxzJykgaW5qZWN0ZWRDcmVkZW50aWFsczogQ3JlZGVudGlhbHMsXG4gICkge1xuICAgIHRoaXMucHJlSm9pbkZvcm0gPSB0aGlzLmZiLmdyb3VwKHtcbiAgICAgIG5hbWU6IFsnJywgVmFsaWRhdG9ycy5yZXF1aXJlZF0sXG4gICAgICBkdXJhdGlvbjogWycnXSxcbiAgICAgIGV2ZW50VHlwZTogWycnXSxcbiAgICAgIGNhcGFjaXR5OiBbJyddLFxuICAgICAgZXZlbnRJRDogWycnXSxcbiAgICB9KTtcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSBpbmplY3RlZFBhcmFtZXRlcnMgfHwgdGhpcy5wYXJhbWV0ZXJzO1xuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBpbmplY3RlZENyZWRlbnRpYWxzIHx8IHRoaXMuY3JlZGVudGlhbHM7XG4gIH1cblxuICB0b2dnbGVNb2RlKCkge1xuICAgIHRoaXMuaXNDcmVhdGVNb2RlID0gIXRoaXMuaXNDcmVhdGVNb2RlO1xuICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgfVxuXG4gIGFzeW5jIGhhbmRsZUNyZWF0ZVJvb20oKSB7XG4gICAgaWYgKHRoaXMucHJlSm9pbkZvcm0uaW52YWxpZCkge1xuICAgICAgdGhpcy5lcnJvciA9ICdQbGVhc2UgZmlsbCBhbGwgdGhlIGZpZWxkcy4nO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgbmFtZSwgZHVyYXRpb24sIGV2ZW50VHlwZSwgY2FwYWNpdHkgfSA9IHRoaXMucHJlSm9pbkZvcm0udmFsdWU7XG5cbiAgICBpZiAoIW5hbWUgfHwgIWR1cmF0aW9uIHx8ICFldmVudFR5cGUgfHwgIWNhcGFjaXR5KSB7XG4gICAgICB0aGlzLmVycm9yID0gJ1BsZWFzZSBmaWxsIGFsbCB0aGUgZmllbGRzLic7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgIGFjdGlvbjogJ2NyZWF0ZScsXG4gICAgICBkdXJhdGlvbjogcGFyc2VJbnQoZHVyYXRpb24pLFxuICAgICAgY2FwYWNpdHk6IHBhcnNlSW50KGNhcGFjaXR5KSxcbiAgICAgIGV2ZW50VHlwZSxcbiAgICAgIHVzZXJOYW1lOiBuYW1lLFxuICAgIH07XG5cbiAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKHRydWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5jcmVhdGVSb29tT25NZWRpYVNGVSh7XG4gICAgICAgIHBheWxvYWQsXG4gICAgICAgIGFwaVVzZXJOYW1lOiB0aGlzLmNyZWRlbnRpYWxzLmFwaVVzZXJOYW1lLFxuICAgICAgICBhcGlLZXk6IHRoaXMuY3JlZGVudGlhbHMuYXBpS2V5LFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzICYmIHJlc3BvbnNlLmRhdGEgJiYgJ3Jvb21OYW1lJyBpbiByZXNwb25zZS5kYXRhKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuY2hlY2tMaW1pdHNBbmRNYWtlUmVxdWVzdCh7XG4gICAgICAgICAgYXBpVXNlck5hbWU6IHJlc3BvbnNlLmRhdGEucm9vbU5hbWUsXG4gICAgICAgICAgYXBpVG9rZW46IHJlc3BvbnNlLmRhdGEuc2VjcmV0LFxuICAgICAgICAgIGxpbms6IHJlc3BvbnNlLmRhdGEubGluayxcbiAgICAgICAgICB1c2VyTmFtZTogbmFtZSxcbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuZXJyb3IgPSAnJztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgICAgICB0aGlzLmVycm9yID0gYCR7XG4gICAgICAgICAgcmVzcG9uc2UuZGF0YSA/ICgnZXJyb3InIGluIHJlc3BvbnNlLmRhdGEgPyByZXNwb25zZS5kYXRhLmVycm9yIDogJycpIDogJydcbiAgICAgICAgfWA7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgICAgdGhpcy5lcnJvciA9IGBVbmFibGUgdG8gY29ubmVjdC4gJHsoZXJyb3IgYXMgYW55KS5tZXNzYWdlfWA7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaGFuZGxlSm9pblJvb20oKSB7XG4gICAgaWYgKHRoaXMucHJlSm9pbkZvcm0uaW52YWxpZCkge1xuICAgICAgdGhpcy5lcnJvciA9ICdQbGVhc2UgZmlsbCBhbGwgdGhlIGZpZWxkcy4nO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgbmFtZSwgZXZlbnRJRCB9ID0gdGhpcy5wcmVKb2luRm9ybS52YWx1ZTtcblxuICAgIGlmICghbmFtZSB8fCAhZXZlbnRJRCkge1xuICAgICAgdGhpcy5lcnJvciA9ICdQbGVhc2UgZmlsbCBhbGwgdGhlIGZpZWxkcy4nO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgICBhY3Rpb246ICdqb2luJyxcbiAgICAgIG1lZXRpbmdJRDogZXZlbnRJRCxcbiAgICAgIHVzZXJOYW1lOiBuYW1lLFxuICAgIH07XG5cbiAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKHRydWUpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5qb2luUm9vbU9uTWVkaWFTRlUoe1xuICAgICAgICBwYXlsb2FkLFxuICAgICAgICBhcGlVc2VyTmFtZTogdGhpcy5jcmVkZW50aWFscy5hcGlVc2VyTmFtZSxcbiAgICAgICAgYXBpS2V5OiB0aGlzLmNyZWRlbnRpYWxzLmFwaUtleSxcbiAgICAgIH0pO1xuXG4gICAgICBpZiAocmVzcG9uc2Uuc3VjY2VzcyAmJiByZXNwb25zZS5kYXRhICYmICdyb29tTmFtZScgaW4gcmVzcG9uc2UuZGF0YSkge1xuICAgICAgICBhd2FpdCB0aGlzLmNoZWNrTGltaXRzQW5kTWFrZVJlcXVlc3Qoe1xuICAgICAgICAgIGFwaVVzZXJOYW1lOiByZXNwb25zZS5kYXRhLnJvb21OYW1lLFxuICAgICAgICAgIGFwaVRva2VuOiByZXNwb25zZS5kYXRhLnNlY3JldCxcbiAgICAgICAgICBsaW5rOiByZXNwb25zZS5kYXRhLmxpbmssXG4gICAgICAgICAgdXNlck5hbWU6IG5hbWUsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmVycm9yID0gJyc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICAgICAgdGhpcy5lcnJvciA9IGBVbmFibGUgdG8gY29ubmVjdCB0byByb29tLiAke1xuICAgICAgICAgIHJlc3BvbnNlLmRhdGEgPyAoJ2Vycm9yJyBpbiByZXNwb25zZS5kYXRhID8gcmVzcG9uc2UuZGF0YS5lcnJvciA6ICcnKSA6ICcnXG4gICAgICAgIH1gO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcbiAgICAgIHRoaXMuZXJyb3IgPSBgVW5hYmxlIHRvIGNvbm5lY3QuICR7KGVycm9yIGFzIGFueSkubWVzc2FnZX1gO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNoZWNrTGltaXRzQW5kTWFrZVJlcXVlc3Qoe1xuICAgIGFwaVVzZXJOYW1lLFxuICAgIGFwaVRva2VuLFxuICAgIGxpbmssXG4gICAgYXBpS2V5ID0gJycsXG4gICAgdXNlck5hbWUsXG4gIH06IHtcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICAgIGFwaVRva2VuOiBzdHJpbmc7XG4gICAgbGluazogc3RyaW5nO1xuICAgIGFwaUtleT86IHN0cmluZztcbiAgICB1c2VyTmFtZTogc3RyaW5nO1xuICB9KSB7XG4gICAgbGV0IHVuc3VjY2Vzc2Z1bEF0dGVtcHRzID0gcGFyc2VJbnQodGhpcy5jb29raWVTZXJ2aWNlLmdldCgndW5zdWNjZXNzZnVsQXR0ZW1wdHMnKSkgfHwgMDtcbiAgICBsZXQgbGFzdFJlcXVlc3RUaW1lc3RhbXAgPSBwYXJzZUludCh0aGlzLmNvb2tpZVNlcnZpY2UuZ2V0KCdsYXN0UmVxdWVzdFRpbWVzdGFtcCcpKSB8fCAwO1xuXG4gICAgaWYgKHVuc3VjY2Vzc2Z1bEF0dGVtcHRzID49IE1BWF9BVFRFTVBUUykge1xuICAgICAgaWYgKERhdGUubm93KCkgLSBsYXN0UmVxdWVzdFRpbWVzdGFtcCA8IFJBVEVfTElNSVRfRFVSQVRJT04pIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnVG9vIG1hbnkgdW5zdWNjZXNzZnVsIGF0dGVtcHRzLiBQbGVhc2UgdHJ5IGFnYWluIGxhdGVyLicsXG4gICAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCdsYXN0UmVxdWVzdFRpbWVzdGFtcCcsIERhdGUubm93KCkudG9TdHJpbmcoKSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHVuc3VjY2Vzc2Z1bEF0dGVtcHRzID0gMDtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgndW5zdWNjZXNzZnVsQXR0ZW1wdHMnLCB1bnN1Y2Nlc3NmdWxBdHRlbXB0cy50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgnbGFzdFJlcXVlc3RUaW1lc3RhbXAnLCBEYXRlLm5vdygpLnRvU3RyaW5nKCkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKHRydWUpO1xuXG4gICAgICBjb25zdCBzb2NrZXRQcm9taXNlID0gYXdhaXQgdGhpcy5wYXJhbWV0ZXJzLmNvbm5lY3RTb2NrZXQoe1xuICAgICAgICBhcGlVc2VyTmFtZSxcbiAgICAgICAgYXBpS2V5LFxuICAgICAgICBhcGlUb2tlbixcbiAgICAgICAgbGluayxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB0aW1lb3V0UHJvbWlzZSA9IG5ldyBQcm9taXNlKChfLCByZWplY3QpID0+XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcmVqZWN0KG5ldyBFcnJvcignUmVxdWVzdCB0aW1lZCBvdXQnKSksIFRJTUVPVVRfRFVSQVRJT04pLFxuICAgICAgKTtcblxuICAgICAgY29uc3Qgc29ja2V0ID0gYXdhaXQgUHJvbWlzZS5yYWNlKFtzb2NrZXRQcm9taXNlLCB0aW1lb3V0UHJvbWlzZV0pO1xuXG4gICAgICBpZiAoc29ja2V0ICYmIHNvY2tldCBpbnN0YW5jZW9mIFNvY2tldCAmJiBzb2NrZXQuaWQpIHtcbiAgICAgICAgdW5zdWNjZXNzZnVsQXR0ZW1wdHMgPSAwO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCd1bnN1Y2Nlc3NmdWxBdHRlbXB0cycsIHVuc3VjY2Vzc2Z1bEF0dGVtcHRzLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLmNvb2tpZVNlcnZpY2Uuc2V0KCdsYXN0UmVxdWVzdFRpbWVzdGFtcCcsIERhdGUubm93KCkudG9TdHJpbmcoKSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVTb2NrZXQoc29ja2V0KTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUFwaVVzZXJOYW1lKGFwaVVzZXJOYW1lKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUFwaVRva2VuKGFwaVRva2VuKTtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUxpbmsobGluayk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVSb29tTmFtZShhcGlVc2VyTmFtZSk7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVNZW1iZXIodXNlck5hbWUpO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlVmFsaWRhdGVkKHRydWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdW5zdWNjZXNzZnVsQXR0ZW1wdHMgKz0gMTtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgndW5zdWNjZXNzZnVsQXR0ZW1wdHMnLCB1bnN1Y2Nlc3NmdWxBdHRlbXB0cy50b1N0cmluZygpKTtcbiAgICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgnbGFzdFJlcXVlc3RUaW1lc3RhbXAnLCBEYXRlLm5vdygpLnRvU3RyaW5nKCkpO1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlSXNMb2FkaW5nTW9kYWxWaXNpYmxlKGZhbHNlKTtcblxuICAgICAgICBpZiAodW5zdWNjZXNzZnVsQXR0ZW1wdHMgPj0gTUFYX0FUVEVNUFRTKSB7XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdUb28gbWFueSB1bnN1Y2Nlc3NmdWwgYXR0ZW1wdHMuIFBsZWFzZSB0cnkgYWdhaW4gbGF0ZXIuJyxcbiAgICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwMDAsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgICAgIG1lc3NhZ2U6ICdJbnZhbGlkIGNyZWRlbnRpYWxzLicsXG4gICAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzMDAwLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdVbmFibGUgdG8gY29ubmVjdC4gQ2hlY2sgeW91ciBjcmVkZW50aWFscyBhbmQgdHJ5IGFnYWluLicsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICAgIH0pO1xuXG4gICAgICB1bnN1Y2Nlc3NmdWxBdHRlbXB0cyArPSAxO1xuICAgICAgdGhpcy5jb29raWVTZXJ2aWNlLnNldCgndW5zdWNjZXNzZnVsQXR0ZW1wdHMnLCB1bnN1Y2Nlc3NmdWxBdHRlbXB0cy50b1N0cmluZygpKTtcbiAgICAgIHRoaXMuY29va2llU2VydmljZS5zZXQoJ2xhc3RSZXF1ZXN0VGltZXN0YW1wJywgRGF0ZS5ub3coKS50b1N0cmluZygpKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVJc0xvYWRpbmdNb2RhbFZpc2libGUoZmFsc2UpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNyZWF0ZVJvb21Pbk1lZGlhU0ZVKHtcbiAgICBwYXlsb2FkLFxuICAgIGFwaVVzZXJOYW1lLFxuICAgIGFwaUtleSxcbiAgfToge1xuICAgIHBheWxvYWQ6IGFueTtcbiAgICBhcGlVc2VyTmFtZTogc3RyaW5nO1xuICAgIGFwaUtleTogc3RyaW5nO1xuICB9KTogUHJvbWlzZTx7IGRhdGE6IENyZWF0ZUpvaW5Sb29tUmVzcG9uc2UgfCBDcmVhdGVKb2luUm9vbUVycm9yIHwgbnVsbDsgc3VjY2VzczogYm9vbGVhbiB9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGlmIChcbiAgICAgICAgIWFwaVVzZXJOYW1lIHx8XG4gICAgICAgICFhcGlLZXkgfHxcbiAgICAgICAgYXBpVXNlck5hbWUgPT09ICd5b3VyQVBJVVNFUk5BTUUnIHx8XG4gICAgICAgIGFwaUtleSA9PT0gJ3lvdXJBUElLRVknIHx8XG4gICAgICAgIGFwaUtleS5sZW5ndGggIT09IDY0IHx8XG4gICAgICAgIGFwaVVzZXJOYW1lLmxlbmd0aCA8IDZcbiAgICAgICkge1xuICAgICAgICByZXR1cm4geyBkYXRhOiB7IGVycm9yOiAnSW52YWxpZCBjcmVkZW50aWFscycgfSwgc3VjY2VzczogZmFsc2UgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCB0aGlzLmh0dHBcbiAgICAgICAgLnBvc3Q8YW55PignaHR0cHM6Ly9tZWRpYXNmdS5jb20vdjEvcm9vbXMvJywgcGF5bG9hZCwge1xuICAgICAgICAgIGhlYWRlcnM6IG5ldyBIdHRwSGVhZGVycyh7XG4gICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxuICAgICAgICAgICAgQXV0aG9yaXphdGlvbjogYEJlYXJlciAke2FwaVVzZXJOYW1lfToke2FwaUtleX1gLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9KVxuICAgICAgICAudG9Qcm9taXNlKCk7XG5cbiAgICAgIHJldHVybiB7IGRhdGE6IHJlc3BvbnNlLCBzdWNjZXNzOiB0cnVlIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVycm9yTWVzc2FnZSA9IChlcnJvciBhcyBhbnkpLnJlYXNvbiA/IChlcnJvciBhcyBhbnkpLnJlYXNvbiA6ICd1bmtub3duIGVycm9yJztcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGE6IHsgZXJyb3I6IGBVbmFibGUgdG8gY3JlYXRlIHJvb207IHNvbWV0aGluZyB3ZW50IHdyb25nICR7ZXJyb3JNZXNzYWdlfWAgfSxcbiAgICAgICAgc3VjY2VzczogZmFsc2UsXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGpvaW5Sb29tT25NZWRpYVNGVSh7XG4gICAgcGF5bG9hZCxcbiAgICBhcGlVc2VyTmFtZSxcbiAgICBhcGlLZXksXG4gIH06IHtcbiAgICBwYXlsb2FkOiBhbnk7XG4gICAgYXBpVXNlck5hbWU6IHN0cmluZztcbiAgICBhcGlLZXk6IHN0cmluZztcbiAgfSk6IFByb21pc2U8eyBkYXRhOiBDcmVhdGVKb2luUm9vbVJlc3BvbnNlIHwgQ3JlYXRlSm9pblJvb21FcnJvciB8IG51bGw7IHN1Y2Nlc3M6IGJvb2xlYW4gfT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoXG4gICAgICAgICFhcGlVc2VyTmFtZSB8fFxuICAgICAgICAhYXBpS2V5IHx8XG4gICAgICAgIGFwaVVzZXJOYW1lID09PSAneW91ckFQSVVTRVJOQU1FJyB8fFxuICAgICAgICBhcGlLZXkgPT09ICd5b3VyQVBJS0VZJyB8fFxuICAgICAgICBhcGlLZXkubGVuZ3RoICE9PSA2NCB8fFxuICAgICAgICBhcGlVc2VyTmFtZS5sZW5ndGggPCA2XG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIHsgZGF0YTogeyBlcnJvcjogJ0ludmFsaWQgY3JlZGVudGlhbHMnIH0sIHN1Y2Nlc3M6IGZhbHNlIH07XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5odHRwXG4gICAgICAgIC5wb3N0PGFueT4oJ2h0dHBzOi8vbWVkaWFzZnUuY29tL3YxL3Jvb21zLycsIHBheWxvYWQsIHtcbiAgICAgICAgICBoZWFkZXJzOiBuZXcgSHR0cEhlYWRlcnMoe1xuICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IGBCZWFyZXIgJHthcGlVc2VyTmFtZX06JHthcGlLZXl9YCxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSlcbiAgICAgICAgLnRvUHJvbWlzZSgpO1xuXG4gICAgICByZXR1cm4geyBkYXRhOiByZXNwb25zZSwgc3VjY2VzczogdHJ1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBlcnJvck1lc3NhZ2UgPSAoZXJyb3IgYXMgYW55KS5yZWFzb24gPyAoZXJyb3IgYXMgYW55KS5yZWFzb24gOiAndW5rbm93biBlcnJvcic7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBkYXRhOiB7IGVycm9yOiBgVW5hYmxlIHRvIGpvaW4gcm9vbTsgc29tZXRoaW5nIHdlbnQgd3JvbmcgJHtlcnJvck1lc3NhZ2V9YCB9LFxuICAgICAgICBzdWNjZXNzOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY29udGFpbmVyLWZsdWlkXCI+XHJcbiAgPGRpdiBjbGFzcz1cImxvZ28tY29udGFpbmVyXCI+XHJcbiAgICA8aW1nIFtzcmNdPVwiaW1nU3JjIHx8ICdodHRwczovL21lZGlhc2Z1LmNvbS9pbWFnZXMvbG9nbzE5Mi5wbmcnXCIgY2xhc3M9XCJsb2dvLWltYWdlXCIgYWx0PVwiTG9nb1wiIC8+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cImlucHV0LWNvbnRhaW5lclwiPlxyXG4gICAgPGZvcm0gW2Zvcm1Hcm91cF09XCJwcmVKb2luRm9ybVwiPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkRpc3BsYXkgTmFtZVwiIGZvcm1Db250cm9sTmFtZT1cIm5hbWVcIiBjbGFzcz1cImlucHV0LWZpZWxkXCIgLz5cclxuICAgICAgPGRpdiAqbmdJZj1cImlzQ3JlYXRlTW9kZVwiPlxyXG4gICAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIHBsYWNlaG9sZGVyPVwiRHVyYXRpb24gKG1pbnV0ZXMpXCIgZm9ybUNvbnRyb2xOYW1lPVwiZHVyYXRpb25cIiBjbGFzcz1cImlucHV0LWZpZWxkXCIgLz5cclxuICAgICAgICA8c2VsZWN0IGZvcm1Db250cm9sTmFtZT1cImV2ZW50VHlwZVwiIGNsYXNzPVwic2VsZWN0LWZpZWxkXCI+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiXCI+U2VsZWN0IEV2ZW50IFR5cGU8L29wdGlvbj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJjaGF0XCI+Q2hhdDwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImJyb2FkY2FzdFwiPkJyb2FkY2FzdDwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIndlYmluYXJcIj5XZWJpbmFyPC9vcHRpb24+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiY29uZmVyZW5jZVwiPkNvbmZlcmVuY2U8L29wdGlvbj5cclxuICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIlJvb20gQ2FwYWNpdHlcIiBmb3JtQ29udHJvbE5hbWU9XCJjYXBhY2l0eVwiIGNsYXNzPVwiaW5wdXQtZmllbGRcIiAvPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJoYW5kbGVDcmVhdGVSb29tKClcIiBjbGFzcz1cImFjdGlvbi1idXR0b25cIj5DcmVhdGUgUm9vbTwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdJZj1cIiFpc0NyZWF0ZU1vZGVcIj5cclxuICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBwbGFjZWhvbGRlcj1cIkV2ZW50IElEXCIgZm9ybUNvbnRyb2xOYW1lPVwiZXZlbnRJRFwiIGNsYXNzPVwiaW5wdXQtZmllbGRcIiAvPlxyXG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIChjbGljayk9XCJoYW5kbGVKb2luUm9vbSgpXCIgY2xhc3M9XCJhY3Rpb24tYnV0dG9uXCI+Sm9pbiBSb29tPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8cCAqbmdJZj1cImVycm9yXCIgY2xhc3M9XCJlcnJvclwiPnt7IGVycm9yIH19PC9wPlxyXG4gICAgPC9mb3JtPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJvci1jb250YWluZXJcIj5cclxuICAgIDxzcGFuIGNsYXNzPVwib3ItdGV4dFwiPk9SPC9zcGFuPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJ0b2dnbGUtY29udGFpbmVyXCI+XHJcbiAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiAoY2xpY2spPVwidG9nZ2xlTW9kZSgpXCIgY2xhc3M9XCJ0b2dnbGUtYnV0dG9uXCI+XHJcbiAgICAgIHt7IGlzQ3JlYXRlTW9kZSA/ICdTd2l0Y2ggdG8gSm9pbiBNb2RlJyA6ICdTd2l0Y2ggdG8gQ3JlYXRlIE1vZGUnIH19XHJcbiAgICA8L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==