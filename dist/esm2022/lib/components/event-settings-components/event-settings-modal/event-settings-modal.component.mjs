// event-settings-modal.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import * as i0 from "@angular/core";
import * as i1 from "../../../methods/settings-methods/modify-settings.service";
import * as i2 from "@angular/common";
import * as i3 from "@fortawesome/angular-fontawesome";
import * as i4 from "@angular/forms";
/**
 * EventSettingsModal component provides a modal interface to manage and update event settings like audio, video, screenshare, and chat settings.
 *
 * @component
 * @selector app-event-settings-modal
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, FormsModule]
 *
 * @example
 * ```html
 * <app-event-settings-modal
 *   [isEventSettingsModalVisible]="true"
 *   [onEventSettingsClose]="closeModal"
 *   [onModifyEventSettings]="saveSettings"
 *   [audioSetting]="audio"
 *   [videoSetting]="video"
 *   [screenshareSetting]="screenshare"
 *   [chatSetting]="chat"
 *   [position]="'topRight'"
 *   [backgroundColor]="'#83c0e9'"
 * ></app-event-settings-modal>
 * ```
 *
 * @input {boolean} isEventSettingsModalVisible - Indicates if the event settings modal is visible.
 * @input {() => void} onEventSettingsClose - Callback to close the modal.
 * @input {(options: ModifySettingsOptions) => Promise<void>} onModifyEventSettings - Callback to handle event settings modifications.
 * @input {string} position - Position of the modal on the screen, default is 'topRight'.
 * @input {string} backgroundColor - Background color of the modal, default is '#83c0e9'.
 * @input {string} audioSetting - Current audio setting.
 * @input {string} videoSetting - Current video setting.
 * @input {string} screenshareSetting - Current screenshare setting.
 * @input {string} chatSetting - Current chat setting.
 * @input {(setting: string) => void} updateAudioSetting - Function to update audio setting.
 * @input {(setting: string) => void} updateVideoSetting - Function to update video setting.
 * @input {(setting: string) => void} updateScreenshareSetting - Function to update screenshare setting.
 * @input {(setting: string) => void} updateChatSetting - Function to update chat setting.
 * @input {(isVisible: boolean) => void} updateIsSettingsModalVisible - Function to update modal visibility.
 * @input {string} roomName - Room name associated with the settings.
 * @input {Socket} socket - Socket for real-time communication.
 * @input {ShowAlert} [showAlert] - Optional alert function.
 *
 * @property {string} audioState - Internal state for audio setting.
 * @property {string} videoState - Internal state for video setting.
 * @property {string} screenshareState - Internal state for screenshare setting.
 * @property {string} chatState - Internal state for chat setting.
 * @property {IconDefinition} faTimes - FontAwesome icon for the close button.
 *
 * @constructor
 * @param {ModifySettings} modifySettingsService - Service for modifying settings.
 *
 * @method ngOnInit - Initializes the component and binds the settings modification service.
 * @method ngOnChanges - Updates internal states when `isEventSettingsModalVisible` changes.
 * @param {SimpleChanges} changes - Object containing previous and current values of bound properties.
 *
 * @method updateStatesFromParameters - Sets internal state variables based on input parameters.
 * @method getModalContentStyle - Returns style object for modal content with dynamic positioning and size.
 * @returns {Object} Style object for modal content.
 *
 * @method handleSaveSettings - Invokes the settings modification function with updated values.
 * @returns {Promise<void>} Promise that resolves after saving settings.
 *
 * @method closeModal - Closes the modal.
 */
export class EventSettingsModal {
    modifySettingsService;
    isEventSettingsModalVisible = false;
    onEventSettingsClose;
    onModifyEventSettings;
    position = 'topRight';
    backgroundColor = '#83c0e9';
    audioSetting = '';
    videoSetting = '';
    screenshareSetting = '';
    chatSetting = '';
    updateAudioSetting;
    updateVideoSetting;
    updateScreenshareSetting;
    updateChatSetting;
    updateIsSettingsModalVisible;
    roomName = '';
    socket = {};
    showAlert;
    audioState;
    videoState;
    screenshareState;
    chatState;
    faTimes = faTimes;
    constructor(modifySettingsService) {
        this.modifySettingsService = modifySettingsService;
    }
    ngOnInit() {
        if (!this.onModifyEventSettings) {
            this.onModifyEventSettings = this.modifySettingsService.modifySettings.bind(this.modifySettingsService);
        }
    }
    ngOnChanges(changes) {
        if (changes['isEventSettingsModalVisible']) {
            if (this.isEventSettingsModalVisible) {
                this.updateStatesFromParameters();
            }
        }
    }
    updateStatesFromParameters() {
        this.audioState = this.audioSetting;
        this.videoState = this.videoSetting;
        this.screenshareState = this.screenshareSetting;
        this.chatState = this.chatSetting;
    }
    getModalContentStyle() {
        const screenWidth = window.innerWidth;
        let modalWidth = 0.8 * screenWidth;
        if (modalWidth > 350) {
            modalWidth = 350;
        }
        return {
            backgroundColor: this.backgroundColor,
            borderRadius: '10px',
            padding: '10px',
            width: `${modalWidth}px`,
            maxHeight: '65%',
            overflowY: 'auto',
            top: this.position.includes('top') ? '10px' : 'auto',
            bottom: this.position.includes('bottom') ? '10px' : 'auto',
            left: this.position.includes('Left') ? '10px' : 'auto',
            right: this.position.includes('Right') ? '10px' : 'auto',
        };
    }
    async handleSaveSettings() {
        await this.onModifyEventSettings({
            audioSet: this.audioState,
            videoSet: this.videoState,
            screenshareSet: this.screenshareState,
            chatSet: this.chatState,
            updateAudioSetting: this.updateAudioSetting,
            updateVideoSetting: this.updateVideoSetting,
            updateScreenshareSetting: this.updateScreenshareSetting,
            updateChatSetting: this.updateChatSetting,
            updateIsSettingsModalVisible: this.updateIsSettingsModalVisible,
            roomName: this.roomName,
            socket: this.socket,
            showAlert: this.showAlert,
        });
    }
    closeModal() {
        this.onEventSettingsClose();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: EventSettingsModal, deps: [{ token: i1.ModifySettings }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: EventSettingsModal, isStandalone: true, selector: "app-event-settings-modal", inputs: { isEventSettingsModalVisible: "isEventSettingsModalVisible", onEventSettingsClose: "onEventSettingsClose", onModifyEventSettings: "onModifyEventSettings", position: "position", backgroundColor: "backgroundColor", audioSetting: "audioSetting", videoSetting: "videoSetting", screenshareSetting: "screenshareSetting", chatSetting: "chatSetting", updateAudioSetting: "updateAudioSetting", updateVideoSetting: "updateVideoSetting", updateScreenshareSetting: "updateScreenshareSetting", updateChatSetting: "updateChatSetting", updateIsSettingsModalVisible: "updateIsSettingsModalVisible", roomName: "roomName", socket: "socket", showAlert: "showAlert" }, usesOnChanges: true, ngImport: i0, template: "<!-- event-settings-modal.component.html -->\r\n\r\n<div *ngIf=\"isEventSettingsModalVisible\" class=\"modal-container\">\r\n  <div class=\"modal-content\" [ngStyle]=\"getModalContentStyle()\">\r\n    <div class=\"modal-header\">\r\n      <div class=\"modal-title\">Event Settings</div>\r\n      <div (click)=\"closeModal()\" class=\"icon-close\">\r\n        <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr class=\"hr\" />\r\n    <div class=\"modal-body\">\r\n      <div class=\"form-group\">\r\n        <label class=\"label\">User audio:</label>\r\n        <select class=\"picker-select\" [(ngModel)]=\"audioState\">\r\n          <option value=\"disallow\">Disallow</option>\r\n          <option value=\"allow\">Allow</option>\r\n          <option value=\"approval\">Upon approval</option>\r\n        </select>\r\n      </div>\r\n      <div class=\"sep\"></div>\r\n      <div class=\"form-group\">\r\n        <label class=\"label\">User video:</label>\r\n        <select class=\"picker-select\" [(ngModel)]=\"videoState\">\r\n          <option value=\"disallow\">Disallow</option>\r\n          <option value=\"allow\">Allow</option>\r\n          <option value=\"approval\">Upon approval</option>\r\n        </select>\r\n      </div>\r\n      <div class=\"sep\"></div>\r\n      <div class=\"form-group\">\r\n        <label class=\"label\">User screenshare:</label>\r\n        <select class=\"picker-select\" [(ngModel)]=\"screenshareState\">\r\n          <option value=\"disallow\">Disallow</option>\r\n          <option value=\"allow\">Allow</option>\r\n          <option value=\"approval\">Upon approval</option>\r\n        </select>\r\n      </div>\r\n      <div class=\"sep\"></div>\r\n      <div class=\"form-group\">\r\n        <label class=\"label\">User chat:</label>\r\n        <select class=\"picker-select\" [(ngModel)]=\"chatState\">\r\n          <option value=\"disallow\">Disallow</option>\r\n          <option value=\"allow\">Allow</option>\r\n        </select>\r\n      </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n      <button class=\"btn-apply-settings\" (click)=\"handleSaveSettings()\">Save</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:999}.modal-content{position:absolute;display:flex;flex-direction:column}.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px}.modal-title{font-size:18px;font-weight:700;color:#000}.icon-close{cursor:pointer}.hr{height:1px;background-color:#000;margin:5px 0}.modal-body .form-group{margin-bottom:10px}.label{font-size:medium;color:#000;margin-bottom:5px;font-weight:700;margin-right:10px}.picker-select{font-size:medium;padding:6px 5px;border:1px solid gray;border-radius:4px;color:#000;background-color:#fff}.sep{height:1px;background-color:#fff;margin:2px 0}.modal-footer{margin-top:10px;display:flex;justify-content:flex-end}.btn-apply-settings{padding:5px 10px;border-radius:5px;background-color:#000;color:#fff;font-size:medium;cursor:pointer}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i3.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i4.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i4.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i4.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: EventSettingsModal, decorators: [{
            type: Component,
            args: [{ selector: 'app-event-settings-modal', standalone: true, imports: [CommonModule, FontAwesomeModule, FormsModule], template: "<!-- event-settings-modal.component.html -->\r\n\r\n<div *ngIf=\"isEventSettingsModalVisible\" class=\"modal-container\">\r\n  <div class=\"modal-content\" [ngStyle]=\"getModalContentStyle()\">\r\n    <div class=\"modal-header\">\r\n      <div class=\"modal-title\">Event Settings</div>\r\n      <div (click)=\"closeModal()\" class=\"icon-close\">\r\n        <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr class=\"hr\" />\r\n    <div class=\"modal-body\">\r\n      <div class=\"form-group\">\r\n        <label class=\"label\">User audio:</label>\r\n        <select class=\"picker-select\" [(ngModel)]=\"audioState\">\r\n          <option value=\"disallow\">Disallow</option>\r\n          <option value=\"allow\">Allow</option>\r\n          <option value=\"approval\">Upon approval</option>\r\n        </select>\r\n      </div>\r\n      <div class=\"sep\"></div>\r\n      <div class=\"form-group\">\r\n        <label class=\"label\">User video:</label>\r\n        <select class=\"picker-select\" [(ngModel)]=\"videoState\">\r\n          <option value=\"disallow\">Disallow</option>\r\n          <option value=\"allow\">Allow</option>\r\n          <option value=\"approval\">Upon approval</option>\r\n        </select>\r\n      </div>\r\n      <div class=\"sep\"></div>\r\n      <div class=\"form-group\">\r\n        <label class=\"label\">User screenshare:</label>\r\n        <select class=\"picker-select\" [(ngModel)]=\"screenshareState\">\r\n          <option value=\"disallow\">Disallow</option>\r\n          <option value=\"allow\">Allow</option>\r\n          <option value=\"approval\">Upon approval</option>\r\n        </select>\r\n      </div>\r\n      <div class=\"sep\"></div>\r\n      <div class=\"form-group\">\r\n        <label class=\"label\">User chat:</label>\r\n        <select class=\"picker-select\" [(ngModel)]=\"chatState\">\r\n          <option value=\"disallow\">Disallow</option>\r\n          <option value=\"allow\">Allow</option>\r\n        </select>\r\n      </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n      <button class=\"btn-apply-settings\" (click)=\"handleSaveSettings()\">Save</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:999}.modal-content{position:absolute;display:flex;flex-direction:column}.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px}.modal-title{font-size:18px;font-weight:700;color:#000}.icon-close{cursor:pointer}.hr{height:1px;background-color:#000;margin:5px 0}.modal-body .form-group{margin-bottom:10px}.label{font-size:medium;color:#000;margin-bottom:5px;font-weight:700;margin-right:10px}.picker-select{font-size:medium;padding:6px 5px;border:1px solid gray;border-radius:4px;color:#000;background-color:#fff}.sep{height:1px;background-color:#fff;margin:2px 0}.modal-footer{margin-top:10px;display:flex;justify-content:flex-end}.btn-apply-settings{padding:5px 10px;border-radius:5px;background-color:#000;color:#fff;font-size:medium;cursor:pointer}\n"] }]
        }], ctorParameters: () => [{ type: i1.ModifySettings }], propDecorators: { isEventSettingsModalVisible: [{
                type: Input
            }], onEventSettingsClose: [{
                type: Input
            }], onModifyEventSettings: [{
                type: Input
            }], position: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], audioSetting: [{
                type: Input
            }], videoSetting: [{
                type: Input
            }], screenshareSetting: [{
                type: Input
            }], chatSetting: [{
                type: Input
            }], updateAudioSetting: [{
                type: Input
            }], updateVideoSetting: [{
                type: Input
            }], updateScreenshareSetting: [{
                type: Input
            }], updateChatSetting: [{
                type: Input
            }], updateIsSettingsModalVisible: [{
                type: Input
            }], roomName: [{
                type: Input
            }], socket: [{
                type: Input
            }], showAlert: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtc2V0dGluZ3MtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvZXZlbnQtc2V0dGluZ3MtY29tcG9uZW50cy9ldmVudC1zZXR0aW5ncy1tb2RhbC9ldmVudC1zZXR0aW5ncy1tb2RhbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9ldmVudC1zZXR0aW5ncy1jb21wb25lbnRzL2V2ZW50LXNldHRpbmdzLW1vZGFsL2V2ZW50LXNldHRpbmdzLW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9DQUFvQztBQUVwQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7OztBQThCNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOERHO0FBU0gsTUFBTSxPQUFPLGtCQUFrQjtJQTJCVDtJQTFCWCwyQkFBMkIsR0FBRyxLQUFLLENBQUM7SUFDcEMsb0JBQW9CLENBQWM7SUFFM0MscUJBQXFCLENBQXFEO0lBQ2pFLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDdEIsZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUM1QixZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ2xC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QUFwQyxLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBldmVudC1zZXR0aW5ncy1tb2RhbC5jb21wb25lbnQudHNcblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgZmFUaW1lcyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQge1xuICBNb2RpZnlTZXR0aW5ncyxcbiAgTW9kaWZ5U2V0dGluZ3NPcHRpb25zLFxufSBmcm9tICcuLi8uLi8uLi9tZXRob2RzL3NldHRpbmdzLW1ldGhvZHMvbW9kaWZ5LXNldHRpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQgeyBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEV2ZW50U2V0dGluZ3NNb2RhbE9wdGlvbnMge1xuICBpc0V2ZW50U2V0dGluZ3NNb2RhbFZpc2libGU6IGJvb2xlYW47XG4gIG9uRXZlbnRTZXR0aW5nc0Nsb3NlOiAoKSA9PiB2b2lkO1xuICBvbk1vZGlmeUV2ZW50U2V0dGluZ3M/OiAob3B0aW9uczogTW9kaWZ5U2V0dGluZ3NPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBwb3NpdGlvbj86ICd0b3BMZWZ0JyB8ICd0b3BSaWdodCcgfCAnYm90dG9tTGVmdCcgfCAnYm90dG9tUmlnaHQnO1xuICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIGF1ZGlvU2V0dGluZzogc3RyaW5nO1xuICB2aWRlb1NldHRpbmc6IHN0cmluZztcbiAgc2NyZWVuc2hhcmVTZXR0aW5nOiBzdHJpbmc7XG4gIGNoYXRTZXR0aW5nOiBzdHJpbmc7XG4gIHVwZGF0ZUF1ZGlvU2V0dGluZzogKHNldHRpbmc6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlVmlkZW9TZXR0aW5nOiAoc2V0dGluZzogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmc6IChzZXR0aW5nOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUNoYXRTZXR0aW5nOiAoc2V0dGluZzogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xufVxuXG5leHBvcnQgdHlwZSBFdmVudFNldHRpbmdzTW9kYWxUeXBlID0gKG9wdGlvbnM6IEV2ZW50U2V0dGluZ3NNb2RhbE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIEV2ZW50U2V0dGluZ3NNb2RhbCBjb21wb25lbnQgcHJvdmlkZXMgYSBtb2RhbCBpbnRlcmZhY2UgdG8gbWFuYWdlIGFuZCB1cGRhdGUgZXZlbnQgc2V0dGluZ3MgbGlrZSBhdWRpbywgdmlkZW8sIHNjcmVlbnNoYXJlLCBhbmQgY2hhdCBzZXR0aW5ncy5cbiAqXG4gKiBAY29tcG9uZW50XG4gKiBAc2VsZWN0b3IgYXBwLWV2ZW50LXNldHRpbmdzLW1vZGFsXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgRm9ybXNNb2R1bGVdXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtZXZlbnQtc2V0dGluZ3MtbW9kYWxcbiAqICAgW2lzRXZlbnRTZXR0aW5nc01vZGFsVmlzaWJsZV09XCJ0cnVlXCJcbiAqICAgW29uRXZlbnRTZXR0aW5nc0Nsb3NlXT1cImNsb3NlTW9kYWxcIlxuICogICBbb25Nb2RpZnlFdmVudFNldHRpbmdzXT1cInNhdmVTZXR0aW5nc1wiXG4gKiAgIFthdWRpb1NldHRpbmddPVwiYXVkaW9cIlxuICogICBbdmlkZW9TZXR0aW5nXT1cInZpZGVvXCJcbiAqICAgW3NjcmVlbnNoYXJlU2V0dGluZ109XCJzY3JlZW5zaGFyZVwiXG4gKiAgIFtjaGF0U2V0dGluZ109XCJjaGF0XCJcbiAqICAgW3Bvc2l0aW9uXT1cIid0b3BSaWdodCdcIlxuICogICBbYmFja2dyb3VuZENvbG9yXT1cIicjODNjMGU5J1wiXG4gKiA+PC9hcHAtZXZlbnQtc2V0dGluZ3MtbW9kYWw+XG4gKiBgYGBcbiAqXG4gKiBAaW5wdXQge2Jvb2xlYW59IGlzRXZlbnRTZXR0aW5nc01vZGFsVmlzaWJsZSAtIEluZGljYXRlcyBpZiB0aGUgZXZlbnQgc2V0dGluZ3MgbW9kYWwgaXMgdmlzaWJsZS5cbiAqIEBpbnB1dCB7KCkgPT4gdm9pZH0gb25FdmVudFNldHRpbmdzQ2xvc2UgLSBDYWxsYmFjayB0byBjbG9zZSB0aGUgbW9kYWwuXG4gKiBAaW5wdXQgeyhvcHRpb25zOiBNb2RpZnlTZXR0aW5nc09wdGlvbnMpID0+IFByb21pc2U8dm9pZD59IG9uTW9kaWZ5RXZlbnRTZXR0aW5ncyAtIENhbGxiYWNrIHRvIGhhbmRsZSBldmVudCBzZXR0aW5ncyBtb2RpZmljYXRpb25zLlxuICogQGlucHV0IHtzdHJpbmd9IHBvc2l0aW9uIC0gUG9zaXRpb24gb2YgdGhlIG1vZGFsIG9uIHRoZSBzY3JlZW4sIGRlZmF1bHQgaXMgJ3RvcFJpZ2h0Jy5cbiAqIEBpbnB1dCB7c3RyaW5nfSBiYWNrZ3JvdW5kQ29sb3IgLSBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBtb2RhbCwgZGVmYXVsdCBpcyAnIzgzYzBlOScuXG4gKiBAaW5wdXQge3N0cmluZ30gYXVkaW9TZXR0aW5nIC0gQ3VycmVudCBhdWRpbyBzZXR0aW5nLlxuICogQGlucHV0IHtzdHJpbmd9IHZpZGVvU2V0dGluZyAtIEN1cnJlbnQgdmlkZW8gc2V0dGluZy5cbiAqIEBpbnB1dCB7c3RyaW5nfSBzY3JlZW5zaGFyZVNldHRpbmcgLSBDdXJyZW50IHNjcmVlbnNoYXJlIHNldHRpbmcuXG4gKiBAaW5wdXQge3N0cmluZ30gY2hhdFNldHRpbmcgLSBDdXJyZW50IGNoYXQgc2V0dGluZy5cbiAqIEBpbnB1dCB7KHNldHRpbmc6IHN0cmluZykgPT4gdm9pZH0gdXBkYXRlQXVkaW9TZXR0aW5nIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGF1ZGlvIHNldHRpbmcuXG4gKiBAaW5wdXQgeyhzZXR0aW5nOiBzdHJpbmcpID0+IHZvaWR9IHVwZGF0ZVZpZGVvU2V0dGluZyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB2aWRlbyBzZXR0aW5nLlxuICogQGlucHV0IHsoc2V0dGluZzogc3RyaW5nKSA9PiB2b2lkfSB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmcgLSBGdW5jdGlvbiB0byB1cGRhdGUgc2NyZWVuc2hhcmUgc2V0dGluZy5cbiAqIEBpbnB1dCB7KHNldHRpbmc6IHN0cmluZykgPT4gdm9pZH0gdXBkYXRlQ2hhdFNldHRpbmcgLSBGdW5jdGlvbiB0byB1cGRhdGUgY2hhdCBzZXR0aW5nLlxuICogQGlucHV0IHsoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkfSB1cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIG1vZGFsIHZpc2liaWxpdHkuXG4gKiBAaW5wdXQge3N0cmluZ30gcm9vbU5hbWUgLSBSb29tIG5hbWUgYXNzb2NpYXRlZCB3aXRoIHRoZSBzZXR0aW5ncy5cbiAqIEBpbnB1dCB7U29ja2V0fSBzb2NrZXQgLSBTb2NrZXQgZm9yIHJlYWwtdGltZSBjb21tdW5pY2F0aW9uLlxuICogQGlucHV0IHtTaG93QWxlcnR9IFtzaG93QWxlcnRdIC0gT3B0aW9uYWwgYWxlcnQgZnVuY3Rpb24uXG4gKlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGF1ZGlvU3RhdGUgLSBJbnRlcm5hbCBzdGF0ZSBmb3IgYXVkaW8gc2V0dGluZy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB2aWRlb1N0YXRlIC0gSW50ZXJuYWwgc3RhdGUgZm9yIHZpZGVvIHNldHRpbmcuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2NyZWVuc2hhcmVTdGF0ZSAtIEludGVybmFsIHN0YXRlIGZvciBzY3JlZW5zaGFyZSBzZXR0aW5nLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNoYXRTdGF0ZSAtIEludGVybmFsIHN0YXRlIGZvciBjaGF0IHNldHRpbmcuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVRpbWVzIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgdGhlIGNsb3NlIGJ1dHRvbi5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7TW9kaWZ5U2V0dGluZ3N9IG1vZGlmeVNldHRpbmdzU2VydmljZSAtIFNlcnZpY2UgZm9yIG1vZGlmeWluZyBzZXR0aW5ncy5cbiAqXG4gKiBAbWV0aG9kIG5nT25Jbml0IC0gSW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudCBhbmQgYmluZHMgdGhlIHNldHRpbmdzIG1vZGlmaWNhdGlvbiBzZXJ2aWNlLlxuICogQG1ldGhvZCBuZ09uQ2hhbmdlcyAtIFVwZGF0ZXMgaW50ZXJuYWwgc3RhdGVzIHdoZW4gYGlzRXZlbnRTZXR0aW5nc01vZGFsVmlzaWJsZWAgY2hhbmdlcy5cbiAqIEBwYXJhbSB7U2ltcGxlQ2hhbmdlc30gY2hhbmdlcyAtIE9iamVjdCBjb250YWluaW5nIHByZXZpb3VzIGFuZCBjdXJyZW50IHZhbHVlcyBvZiBib3VuZCBwcm9wZXJ0aWVzLlxuICpcbiAqIEBtZXRob2QgdXBkYXRlU3RhdGVzRnJvbVBhcmFtZXRlcnMgLSBTZXRzIGludGVybmFsIHN0YXRlIHZhcmlhYmxlcyBiYXNlZCBvbiBpbnB1dCBwYXJhbWV0ZXJzLlxuICogQG1ldGhvZCBnZXRNb2RhbENvbnRlbnRTdHlsZSAtIFJldHVybnMgc3R5bGUgb2JqZWN0IGZvciBtb2RhbCBjb250ZW50IHdpdGggZHluYW1pYyBwb3NpdGlvbmluZyBhbmQgc2l6ZS5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFN0eWxlIG9iamVjdCBmb3IgbW9kYWwgY29udGVudC5cbiAqXG4gKiBAbWV0aG9kIGhhbmRsZVNhdmVTZXR0aW5ncyAtIEludm9rZXMgdGhlIHNldHRpbmdzIG1vZGlmaWNhdGlvbiBmdW5jdGlvbiB3aXRoIHVwZGF0ZWQgdmFsdWVzLlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IFByb21pc2UgdGhhdCByZXNvbHZlcyBhZnRlciBzYXZpbmcgc2V0dGluZ3MuXG4gKlxuICogQG1ldGhvZCBjbG9zZU1vZGFsIC0gQ2xvc2VzIHRoZSBtb2RhbC5cbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtZXZlbnQtc2V0dGluZ3MtbW9kYWwnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgRm9ybXNNb2R1bGVdLFxuICB0ZW1wbGF0ZVVybDogJy4vZXZlbnQtc2V0dGluZ3MtbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9ldmVudC1zZXR0aW5ncy1tb2RhbC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEV2ZW50U2V0dGluZ3NNb2RhbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgaXNFdmVudFNldHRpbmdzTW9kYWxWaXNpYmxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIG9uRXZlbnRTZXR0aW5nc0Nsb3NlITogKCkgPT4gdm9pZDtcbiAgQElucHV0KClcbiAgb25Nb2RpZnlFdmVudFNldHRpbmdzITogKG9wdGlvbnM6IE1vZGlmeVNldHRpbmdzT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcbiAgQElucHV0KCkgcG9zaXRpb24gPSAndG9wUmlnaHQnO1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3IgPSAnIzgzYzBlOSc7XG4gIEBJbnB1dCgpIGF1ZGlvU2V0dGluZyA9ICcnO1xuICBASW5wdXQoKSB2aWRlb1NldHRpbmcgPSAnJztcbiAgQElucHV0KCkgc2NyZWVuc2hhcmVTZXR0aW5nID0gJyc7XG4gIEBJbnB1dCgpIGNoYXRTZXR0aW5nID0gJyc7XG4gIEBJbnB1dCgpIHVwZGF0ZUF1ZGlvU2V0dGluZyE6IChzZXR0aW5nOiBzdHJpbmcpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIHVwZGF0ZVZpZGVvU2V0dGluZyE6IChzZXR0aW5nOiBzdHJpbmcpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZyE6IChzZXR0aW5nOiBzdHJpbmcpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIHVwZGF0ZUNoYXRTZXR0aW5nITogKHNldHRpbmc6IHN0cmluZykgPT4gdm9pZDtcbiAgQElucHV0KCkgdXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZSE6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIEBJbnB1dCgpIHJvb21OYW1lID0gJyc7XG4gIEBJbnB1dCgpIHNvY2tldDogU29ja2V0ID0ge30gYXMgU29ja2V0O1xuICBASW5wdXQoKSBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG5cbiAgYXVkaW9TdGF0ZSE6IHN0cmluZztcbiAgdmlkZW9TdGF0ZSE6IHN0cmluZztcbiAgc2NyZWVuc2hhcmVTdGF0ZSE6IHN0cmluZztcbiAgY2hhdFN0YXRlITogc3RyaW5nO1xuXG4gIGZhVGltZXMgPSBmYVRpbWVzO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgbW9kaWZ5U2V0dGluZ3NTZXJ2aWNlOiBNb2RpZnlTZXR0aW5ncykge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMub25Nb2RpZnlFdmVudFNldHRpbmdzKSB7XG4gICAgICB0aGlzLm9uTW9kaWZ5RXZlbnRTZXR0aW5ncyA9IHRoaXMubW9kaWZ5U2V0dGluZ3NTZXJ2aWNlLm1vZGlmeVNldHRpbmdzLmJpbmQoXG4gICAgICAgIHRoaXMubW9kaWZ5U2V0dGluZ3NTZXJ2aWNlLFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ2lzRXZlbnRTZXR0aW5nc01vZGFsVmlzaWJsZSddKSB7XG4gICAgICBpZiAodGhpcy5pc0V2ZW50U2V0dGluZ3NNb2RhbFZpc2libGUpIHtcbiAgICAgICAgdGhpcy51cGRhdGVTdGF0ZXNGcm9tUGFyYW1ldGVycygpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVN0YXRlc0Zyb21QYXJhbWV0ZXJzKCkge1xuICAgIHRoaXMuYXVkaW9TdGF0ZSA9IHRoaXMuYXVkaW9TZXR0aW5nO1xuICAgIHRoaXMudmlkZW9TdGF0ZSA9IHRoaXMudmlkZW9TZXR0aW5nO1xuICAgIHRoaXMuc2NyZWVuc2hhcmVTdGF0ZSA9IHRoaXMuc2NyZWVuc2hhcmVTZXR0aW5nO1xuICAgIHRoaXMuY2hhdFN0YXRlID0gdGhpcy5jaGF0U2V0dGluZztcbiAgfVxuXG4gIGdldE1vZGFsQ29udGVudFN0eWxlKCkge1xuICAgIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IG1vZGFsV2lkdGggPSAwLjggKiBzY3JlZW5XaWR0aDtcbiAgICBpZiAobW9kYWxXaWR0aCA+IDM1MCkge1xuICAgICAgbW9kYWxXaWR0aCA9IDM1MDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmJhY2tncm91bmRDb2xvcixcbiAgICAgIGJvcmRlclJhZGl1czogJzEwcHgnLFxuICAgICAgcGFkZGluZzogJzEwcHgnLFxuICAgICAgd2lkdGg6IGAke21vZGFsV2lkdGh9cHhgLFxuICAgICAgbWF4SGVpZ2h0OiAnNjUlJyxcbiAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgdG9wOiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCd0b3AnKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICAgIGJvdHRvbTogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnYm90dG9tJykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICBsZWZ0OiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdMZWZ0JykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICByaWdodDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnUmlnaHQnKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlU2F2ZVNldHRpbmdzKCkge1xuICAgIGF3YWl0IHRoaXMub25Nb2RpZnlFdmVudFNldHRpbmdzKHtcbiAgICAgIGF1ZGlvU2V0OiB0aGlzLmF1ZGlvU3RhdGUsXG4gICAgICB2aWRlb1NldDogdGhpcy52aWRlb1N0YXRlLFxuICAgICAgc2NyZWVuc2hhcmVTZXQ6IHRoaXMuc2NyZWVuc2hhcmVTdGF0ZSxcbiAgICAgIGNoYXRTZXQ6IHRoaXMuY2hhdFN0YXRlLFxuICAgICAgdXBkYXRlQXVkaW9TZXR0aW5nOiB0aGlzLnVwZGF0ZUF1ZGlvU2V0dGluZyxcbiAgICAgIHVwZGF0ZVZpZGVvU2V0dGluZzogdGhpcy51cGRhdGVWaWRlb1NldHRpbmcsXG4gICAgICB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmc6IHRoaXMudXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nLFxuICAgICAgdXBkYXRlQ2hhdFNldHRpbmc6IHRoaXMudXBkYXRlQ2hhdFNldHRpbmcsXG4gICAgICB1cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUsXG4gICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZSxcbiAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQsXG4gICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LFxuICAgIH0pO1xuICB9XG5cbiAgY2xvc2VNb2RhbCgpIHtcbiAgICB0aGlzLm9uRXZlbnRTZXR0aW5nc0Nsb3NlKCk7XG4gIH1cbn1cbiIsIjwhLS0gZXZlbnQtc2V0dGluZ3MtbW9kYWwuY29tcG9uZW50Lmh0bWwgLS0+XHJcblxyXG48ZGl2ICpuZ0lmPVwiaXNFdmVudFNldHRpbmdzTW9kYWxWaXNpYmxlXCIgY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIj5cclxuICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiIFtuZ1N0eWxlXT1cImdldE1vZGFsQ29udGVudFN0eWxlKClcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+RXZlbnQgU2V0dGluZ3M8L2Rpdj5cclxuICAgICAgPGRpdiAoY2xpY2spPVwiY2xvc2VNb2RhbCgpXCIgY2xhc3M9XCJpY29uLWNsb3NlXCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFUaW1lc1wiPjwvZmEtaWNvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxociBjbGFzcz1cImhyXCIgLz5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIj5Vc2VyIGF1ZGlvOjwvbGFiZWw+XHJcbiAgICAgICAgPHNlbGVjdCBjbGFzcz1cInBpY2tlci1zZWxlY3RcIiBbKG5nTW9kZWwpXT1cImF1ZGlvU3RhdGVcIj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJkaXNhbGxvd1wiPkRpc2FsbG93PC9vcHRpb24+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYWxsb3dcIj5BbGxvdzwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFwcHJvdmFsXCI+VXBvbiBhcHByb3ZhbDwvb3B0aW9uPlxyXG4gICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInNlcFwiPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCI+VXNlciB2aWRlbzo8L2xhYmVsPlxyXG4gICAgICAgIDxzZWxlY3QgY2xhc3M9XCJwaWNrZXItc2VsZWN0XCIgWyhuZ01vZGVsKV09XCJ2aWRlb1N0YXRlXCI+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZGlzYWxsb3dcIj5EaXNhbGxvdzwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFsbG93XCI+QWxsb3c8L29wdGlvbj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhcHByb3ZhbFwiPlVwb24gYXBwcm92YWw8L29wdGlvbj5cclxuICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzZXBcIj48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiPlVzZXIgc2NyZWVuc2hhcmU6PC9sYWJlbD5cclxuICAgICAgICA8c2VsZWN0IGNsYXNzPVwicGlja2VyLXNlbGVjdFwiIFsobmdNb2RlbCldPVwic2NyZWVuc2hhcmVTdGF0ZVwiPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRpc2FsbG93XCI+RGlzYWxsb3c8L29wdGlvbj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhbGxvd1wiPkFsbG93PC9vcHRpb24+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYXBwcm92YWxcIj5VcG9uIGFwcHJvdmFsPC9vcHRpb24+XHJcbiAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwic2VwXCI+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIj5Vc2VyIGNoYXQ6PC9sYWJlbD5cclxuICAgICAgICA8c2VsZWN0IGNsYXNzPVwicGlja2VyLXNlbGVjdFwiIFsobmdNb2RlbCldPVwiY2hhdFN0YXRlXCI+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZGlzYWxsb3dcIj5EaXNhbGxvdzwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFsbG93XCI+QWxsb3c8L29wdGlvbj5cclxuICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1hcHBseS1zZXR0aW5nc1wiIChjbGljayk9XCJoYW5kbGVTYXZlU2V0dGluZ3MoKVwiPlNhdmU8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19