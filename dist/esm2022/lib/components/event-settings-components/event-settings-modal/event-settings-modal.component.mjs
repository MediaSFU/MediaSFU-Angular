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
 * Component for managing event settings modal.
 *
 * @selector app-event-settings-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, FormsModule
 * @templateUrl ./event-settings-modal.component.html
 * @styleUrls ./event-settings-modal.component.css
 *
 * @class EventSettingsModal
 * @implements OnInit, OnChanges
 *
 * @property {boolean} isEventSettingsModalVisible - Indicates if the event settings modal is visible.
 * @property {() => void} onEventSettingsClose - Callback function to close the event settings modal.
 * @property {(options: ModifySettingsOptions) => Promise<void>} onModifyEventSettings - Callback function to modify event settings.
 * @property {string} position - Position of the modal on the screen.
 * @property {string} backgroundColor - Background color of the modal.
 * @property {string} audioSetting - Current audio setting.
 * @property {string} videoSetting - Current video setting.
 * @property {string} screenshareSetting - Current screenshare setting.
 * @property {string} chatSetting - Current chat setting.
 * @property {(setting: string) => void} updateAudioSetting - Callback function to update audio setting.
 * @property {(setting: string) => void} updateVideoSetting - Callback function to update video setting.
 * @property {(setting: string) => void} updateScreenshareSetting - Callback function to update screenshare setting.
 * @property {(setting: string) => void} updateChatSetting - Callback function to update chat setting.
 * @property {(isVisible: boolean) => void} updateIsSettingsModalVisible - Callback function to update modal visibility.
 * @property {string} roomName - Name of the room.
 * @property {Socket} socket - Socket instance for communication.
 * @property {ShowAlert} [showAlert] - Optional alert function.
 *
 * @property {string} audioState - State of the audio setting.
 * @property {string} videoState - State of the video setting.
 * @property {string} screenshareState - State of the screenshare setting.
 * @property {string} chatState - State of the chat setting.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for close button.
 *
 * @constructor
 * @param {ModifySettings} modifySettingsService - Service for modifying settings.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @param {SimpleChanges} changes - Object of current and previous property values.
 *
 * @method updateStatesFromParameters - Updates the state variables from the input parameters.
 *
 * @method getModalContentStyle - Returns the style object for the modal content.
 * @returns {Object} Style object for the modal content.
 *
 * @method handleSaveSettings - Handles the save settings action.
 * @returns {Promise<void>} Promise that resolves when settings are saved.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnQtc2V0dGluZ3MtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvZXZlbnQtc2V0dGluZ3MtY29tcG9uZW50cy9ldmVudC1zZXR0aW5ncy1tb2RhbC9ldmVudC1zZXR0aW5ncy1tb2RhbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9ldmVudC1zZXR0aW5ncy1jb21wb25lbnRzL2V2ZW50LXNldHRpbmdzLW1vZGFsL2V2ZW50LXNldHRpbmdzLW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLG9DQUFvQztBQUVwQyxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBb0MsTUFBTSxlQUFlLENBQUM7QUFDbkYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7OztBQThCNUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcURHO0FBUUgsTUFBTSxPQUFPLGtCQUFrQjtJQTJCVDtJQTFCWCwyQkFBMkIsR0FBRyxLQUFLLENBQUM7SUFDcEMsb0JBQW9CLENBQWM7SUFFM0MscUJBQXFCLENBQXFEO0lBQ2pFLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDdEIsZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUM1QixZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLFlBQVksR0FB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O2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBldmVudC1zZXR0aW5ncy1tb2RhbC5jb21wb25lbnQudHNcblxuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgZmFUaW1lcyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQge1xuICBNb2RpZnlTZXR0aW5ncyxcbiAgTW9kaWZ5U2V0dGluZ3NPcHRpb25zLFxufSBmcm9tICcuLi8uLi8uLi9tZXRob2RzL3NldHRpbmdzLW1ldGhvZHMvbW9kaWZ5LXNldHRpbmdzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQgeyBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEV2ZW50U2V0dGluZ3NNb2RhbE9wdGlvbnMge1xuICBpc0V2ZW50U2V0dGluZ3NNb2RhbFZpc2libGU6IGJvb2xlYW47XG4gIG9uRXZlbnRTZXR0aW5nc0Nsb3NlOiAoKSA9PiB2b2lkO1xuICBvbk1vZGlmeUV2ZW50U2V0dGluZ3M/OiAob3B0aW9uczogTW9kaWZ5U2V0dGluZ3NPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBwb3NpdGlvbj86ICd0b3BMZWZ0JyB8ICd0b3BSaWdodCcgfCAnYm90dG9tTGVmdCcgfCAnYm90dG9tUmlnaHQnO1xuICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIGF1ZGlvU2V0dGluZzogc3RyaW5nO1xuICB2aWRlb1NldHRpbmc6IHN0cmluZztcbiAgc2NyZWVuc2hhcmVTZXR0aW5nOiBzdHJpbmc7XG4gIGNoYXRTZXR0aW5nOiBzdHJpbmc7XG4gIHVwZGF0ZUF1ZGlvU2V0dGluZzogKHNldHRpbmc6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlVmlkZW9TZXR0aW5nOiAoc2V0dGluZzogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmc6IChzZXR0aW5nOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUNoYXRTZXR0aW5nOiAoc2V0dGluZzogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xufVxuXG5leHBvcnQgdHlwZSBFdmVudFNldHRpbmdzTW9kYWxUeXBlID0gKG9wdGlvbnM6IEV2ZW50U2V0dGluZ3NNb2RhbE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgbWFuYWdpbmcgZXZlbnQgc2V0dGluZ3MgbW9kYWwuXG4gKlxuICogQHNlbGVjdG9yIGFwcC1ldmVudC1zZXR0aW5ncy1tb2RhbFxuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQGltcG9ydHMgQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgRm9ybXNNb2R1bGVcbiAqIEB0ZW1wbGF0ZVVybCAuL2V2ZW50LXNldHRpbmdzLW1vZGFsLmNvbXBvbmVudC5odG1sXG4gKiBAc3R5bGVVcmxzIC4vZXZlbnQtc2V0dGluZ3MtbW9kYWwuY29tcG9uZW50LmNzc1xuICpcbiAqIEBjbGFzcyBFdmVudFNldHRpbmdzTW9kYWxcbiAqIEBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzXG4gKlxuICogQHByb3BlcnR5IHtib29sZWFufSBpc0V2ZW50U2V0dGluZ3NNb2RhbFZpc2libGUgLSBJbmRpY2F0ZXMgaWYgdGhlIGV2ZW50IHNldHRpbmdzIG1vZGFsIGlzIHZpc2libGUuXG4gKiBAcHJvcGVydHkgeygpID0+IHZvaWR9IG9uRXZlbnRTZXR0aW5nc0Nsb3NlIC0gQ2FsbGJhY2sgZnVuY3Rpb24gdG8gY2xvc2UgdGhlIGV2ZW50IHNldHRpbmdzIG1vZGFsLlxuICogQHByb3BlcnR5IHsob3B0aW9uczogTW9kaWZ5U2V0dGluZ3NPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+fSBvbk1vZGlmeUV2ZW50U2V0dGluZ3MgLSBDYWxsYmFjayBmdW5jdGlvbiB0byBtb2RpZnkgZXZlbnQgc2V0dGluZ3MuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcG9zaXRpb24gLSBQb3NpdGlvbiBvZiB0aGUgbW9kYWwgb24gdGhlIHNjcmVlbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBiYWNrZ3JvdW5kQ29sb3IgLSBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBtb2RhbC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhdWRpb1NldHRpbmcgLSBDdXJyZW50IGF1ZGlvIHNldHRpbmcuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdmlkZW9TZXR0aW5nIC0gQ3VycmVudCB2aWRlbyBzZXR0aW5nLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNjcmVlbnNoYXJlU2V0dGluZyAtIEN1cnJlbnQgc2NyZWVuc2hhcmUgc2V0dGluZy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjaGF0U2V0dGluZyAtIEN1cnJlbnQgY2hhdCBzZXR0aW5nLlxuICogQHByb3BlcnR5IHsoc2V0dGluZzogc3RyaW5nKSA9PiB2b2lkfSB1cGRhdGVBdWRpb1NldHRpbmcgLSBDYWxsYmFjayBmdW5jdGlvbiB0byB1cGRhdGUgYXVkaW8gc2V0dGluZy5cbiAqIEBwcm9wZXJ0eSB7KHNldHRpbmc6IHN0cmluZykgPT4gdm9pZH0gdXBkYXRlVmlkZW9TZXR0aW5nIC0gQ2FsbGJhY2sgZnVuY3Rpb24gdG8gdXBkYXRlIHZpZGVvIHNldHRpbmcuXG4gKiBAcHJvcGVydHkgeyhzZXR0aW5nOiBzdHJpbmcpID0+IHZvaWR9IHVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZyAtIENhbGxiYWNrIGZ1bmN0aW9uIHRvIHVwZGF0ZSBzY3JlZW5zaGFyZSBzZXR0aW5nLlxuICogQHByb3BlcnR5IHsoc2V0dGluZzogc3RyaW5nKSA9PiB2b2lkfSB1cGRhdGVDaGF0U2V0dGluZyAtIENhbGxiYWNrIGZ1bmN0aW9uIHRvIHVwZGF0ZSBjaGF0IHNldHRpbmcuXG4gKiBAcHJvcGVydHkgeyhpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWR9IHVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUgLSBDYWxsYmFjayBmdW5jdGlvbiB0byB1cGRhdGUgbW9kYWwgdmlzaWJpbGl0eS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSByb29tTmFtZSAtIE5hbWUgb2YgdGhlIHJvb20uXG4gKiBAcHJvcGVydHkge1NvY2tldH0gc29ja2V0IC0gU29ja2V0IGluc3RhbmNlIGZvciBjb21tdW5pY2F0aW9uLlxuICogQHByb3BlcnR5IHtTaG93QWxlcnR9IFtzaG93QWxlcnRdIC0gT3B0aW9uYWwgYWxlcnQgZnVuY3Rpb24uXG4gKlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGF1ZGlvU3RhdGUgLSBTdGF0ZSBvZiB0aGUgYXVkaW8gc2V0dGluZy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB2aWRlb1N0YXRlIC0gU3RhdGUgb2YgdGhlIHZpZGVvIHNldHRpbmcuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gc2NyZWVuc2hhcmVTdGF0ZSAtIFN0YXRlIG9mIHRoZSBzY3JlZW5zaGFyZSBzZXR0aW5nLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGNoYXRTdGF0ZSAtIFN0YXRlIG9mIHRoZSBjaGF0IHNldHRpbmcuXG4gKlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFUaW1lcyAtIEZvbnRBd2Vzb21lIGljb24gZm9yIGNsb3NlIGJ1dHRvbi5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7TW9kaWZ5U2V0dGluZ3N9IG1vZGlmeVNldHRpbmdzU2VydmljZSAtIFNlcnZpY2UgZm9yIG1vZGlmeWluZyBzZXR0aW5ncy5cbiAqXG4gKiBAbWV0aG9kIG5nT25Jbml0IC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIGFyZSBpbml0aWFsaXplZC5cbiAqIEBtZXRob2QgbmdPbkNoYW5nZXMgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIGFueSBkYXRhLWJvdW5kIHByb3BlcnR5IGNoYW5nZXMuXG4gKiBAcGFyYW0ge1NpbXBsZUNoYW5nZXN9IGNoYW5nZXMgLSBPYmplY3Qgb2YgY3VycmVudCBhbmQgcHJldmlvdXMgcHJvcGVydHkgdmFsdWVzLlxuICpcbiAqIEBtZXRob2QgdXBkYXRlU3RhdGVzRnJvbVBhcmFtZXRlcnMgLSBVcGRhdGVzIHRoZSBzdGF0ZSB2YXJpYWJsZXMgZnJvbSB0aGUgaW5wdXQgcGFyYW1ldGVycy5cbiAqXG4gKiBAbWV0aG9kIGdldE1vZGFsQ29udGVudFN0eWxlIC0gUmV0dXJucyB0aGUgc3R5bGUgb2JqZWN0IGZvciB0aGUgbW9kYWwgY29udGVudC5cbiAqIEByZXR1cm5zIHtPYmplY3R9IFN0eWxlIG9iamVjdCBmb3IgdGhlIG1vZGFsIGNvbnRlbnQuXG4gKlxuICogQG1ldGhvZCBoYW5kbGVTYXZlU2V0dGluZ3MgLSBIYW5kbGVzIHRoZSBzYXZlIHNldHRpbmdzIGFjdGlvbi5cbiAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiBzZXR0aW5ncyBhcmUgc2F2ZWQuXG4gKlxuICogQG1ldGhvZCBjbG9zZU1vZGFsIC0gQ2xvc2VzIHRoZSBtb2RhbC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWV2ZW50LXNldHRpbmdzLW1vZGFsJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGUsIEZvcm1zTW9kdWxlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2V2ZW50LXNldHRpbmdzLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZXZlbnQtc2V0dGluZ3MtbW9kYWwuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBFdmVudFNldHRpbmdzTW9kYWwgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGlzRXZlbnRTZXR0aW5nc01vZGFsVmlzaWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBvbkV2ZW50U2V0dGluZ3NDbG9zZSE6ICgpID0+IHZvaWQ7XG4gIEBJbnB1dCgpXG4gIG9uTW9kaWZ5RXZlbnRTZXR0aW5ncyE6IChvcHRpb25zOiBNb2RpZnlTZXR0aW5nc09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG4gIEBJbnB1dCgpIHBvc2l0aW9uID0gJ3RvcFJpZ2h0JztcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJyM4M2MwZTknO1xuICBASW5wdXQoKSBhdWRpb1NldHRpbmcgPSAnJztcbiAgQElucHV0KCkgdmlkZW9TZXR0aW5nID0gJyc7XG4gIEBJbnB1dCgpIHNjcmVlbnNoYXJlU2V0dGluZyA9ICcnO1xuICBASW5wdXQoKSBjaGF0U2V0dGluZyA9ICcnO1xuICBASW5wdXQoKSB1cGRhdGVBdWRpb1NldHRpbmchOiAoc2V0dGluZzogc3RyaW5nKSA9PiB2b2lkO1xuICBASW5wdXQoKSB1cGRhdGVWaWRlb1NldHRpbmchOiAoc2V0dGluZzogc3RyaW5nKSA9PiB2b2lkO1xuICBASW5wdXQoKSB1cGRhdGVTY3JlZW5zaGFyZVNldHRpbmchOiAoc2V0dGluZzogc3RyaW5nKSA9PiB2b2lkO1xuICBASW5wdXQoKSB1cGRhdGVDaGF0U2V0dGluZyE6IChzZXR0aW5nOiBzdHJpbmcpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIHVwZGF0ZUlzU2V0dGluZ3NNb2RhbFZpc2libGUhOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICBASW5wdXQoKSByb29tTmFtZSA9ICcnO1xuICBASW5wdXQoKSBzb2NrZXQ6IFNvY2tldCA9IHt9IGFzIFNvY2tldDtcbiAgQElucHV0KCkgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuXG4gIGF1ZGlvU3RhdGUhOiBzdHJpbmc7XG4gIHZpZGVvU3RhdGUhOiBzdHJpbmc7XG4gIHNjcmVlbnNoYXJlU3RhdGUhOiBzdHJpbmc7XG4gIGNoYXRTdGF0ZSE6IHN0cmluZztcblxuICBmYVRpbWVzID0gZmFUaW1lcztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGlmeVNldHRpbmdzU2VydmljZTogTW9kaWZ5U2V0dGluZ3MpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLm9uTW9kaWZ5RXZlbnRTZXR0aW5ncykge1xuICAgICAgdGhpcy5vbk1vZGlmeUV2ZW50U2V0dGluZ3MgPSB0aGlzLm1vZGlmeVNldHRpbmdzU2VydmljZS5tb2RpZnlTZXR0aW5ncy5iaW5kKFxuICAgICAgICB0aGlzLm1vZGlmeVNldHRpbmdzU2VydmljZSxcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydpc0V2ZW50U2V0dGluZ3NNb2RhbFZpc2libGUnXSkge1xuICAgICAgaWYgKHRoaXMuaXNFdmVudFNldHRpbmdzTW9kYWxWaXNpYmxlKSB7XG4gICAgICAgIHRoaXMudXBkYXRlU3RhdGVzRnJvbVBhcmFtZXRlcnMoKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1cGRhdGVTdGF0ZXNGcm9tUGFyYW1ldGVycygpIHtcbiAgICB0aGlzLmF1ZGlvU3RhdGUgPSB0aGlzLmF1ZGlvU2V0dGluZztcbiAgICB0aGlzLnZpZGVvU3RhdGUgPSB0aGlzLnZpZGVvU2V0dGluZztcbiAgICB0aGlzLnNjcmVlbnNoYXJlU3RhdGUgPSB0aGlzLnNjcmVlbnNoYXJlU2V0dGluZztcbiAgICB0aGlzLmNoYXRTdGF0ZSA9IHRoaXMuY2hhdFNldHRpbmc7XG4gIH1cblxuICBnZXRNb2RhbENvbnRlbnRTdHlsZSgpIHtcbiAgICBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBtb2RhbFdpZHRoID0gMC44ICogc2NyZWVuV2lkdGg7XG4gICAgaWYgKG1vZGFsV2lkdGggPiAzNTApIHtcbiAgICAgIG1vZGFsV2lkdGggPSAzNTA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxMHB4JyxcbiAgICAgIHBhZGRpbmc6ICcxMHB4JyxcbiAgICAgIHdpZHRoOiBgJHttb2RhbFdpZHRofXB4YCxcbiAgICAgIG1heEhlaWdodDogJzY1JScsXG4gICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgIHRvcDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygndG9wJykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICBib3R0b206IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ2JvdHRvbScpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgbGVmdDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnTGVmdCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgcmlnaHQ6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ1JpZ2h0JykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGhhbmRsZVNhdmVTZXR0aW5ncygpIHtcbiAgICBhd2FpdCB0aGlzLm9uTW9kaWZ5RXZlbnRTZXR0aW5ncyh7XG4gICAgICBhdWRpb1NldDogdGhpcy5hdWRpb1N0YXRlLFxuICAgICAgdmlkZW9TZXQ6IHRoaXMudmlkZW9TdGF0ZSxcbiAgICAgIHNjcmVlbnNoYXJlU2V0OiB0aGlzLnNjcmVlbnNoYXJlU3RhdGUsXG4gICAgICBjaGF0U2V0OiB0aGlzLmNoYXRTdGF0ZSxcbiAgICAgIHVwZGF0ZUF1ZGlvU2V0dGluZzogdGhpcy51cGRhdGVBdWRpb1NldHRpbmcsXG4gICAgICB1cGRhdGVWaWRlb1NldHRpbmc6IHRoaXMudXBkYXRlVmlkZW9TZXR0aW5nLFxuICAgICAgdXBkYXRlU2NyZWVuc2hhcmVTZXR0aW5nOiB0aGlzLnVwZGF0ZVNjcmVlbnNoYXJlU2V0dGluZyxcbiAgICAgIHVwZGF0ZUNoYXRTZXR0aW5nOiB0aGlzLnVwZGF0ZUNoYXRTZXR0aW5nLFxuICAgICAgdXBkYXRlSXNTZXR0aW5nc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc1NldHRpbmdzTW9kYWxWaXNpYmxlLFxuICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUsXG4gICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LFxuICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydCxcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlTW9kYWwoKSB7XG4gICAgdGhpcy5vbkV2ZW50U2V0dGluZ3NDbG9zZSgpO1xuICB9XG59XG4iLCI8IS0tIGV2ZW50LXNldHRpbmdzLW1vZGFsLmNvbXBvbmVudC5odG1sIC0tPlxyXG5cclxuPGRpdiAqbmdJZj1cImlzRXZlbnRTZXR0aW5nc01vZGFsVmlzaWJsZVwiIGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCI+XHJcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIiBbbmdTdHlsZV09XCJnZXRNb2RhbENvbnRlbnRTdHlsZSgpXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC10aXRsZVwiPkV2ZW50IFNldHRpbmdzPC9kaXY+XHJcbiAgICAgIDxkaXYgKGNsaWNrKT1cImNsb3NlTW9kYWwoKVwiIGNsYXNzPVwiaWNvbi1jbG9zZVwiPlxyXG4gICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhVGltZXNcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8aHIgY2xhc3M9XCJoclwiIC8+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCI+VXNlciBhdWRpbzo8L2xhYmVsPlxyXG4gICAgICAgIDxzZWxlY3QgY2xhc3M9XCJwaWNrZXItc2VsZWN0XCIgWyhuZ01vZGVsKV09XCJhdWRpb1N0YXRlXCI+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiZGlzYWxsb3dcIj5EaXNhbGxvdzwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFsbG93XCI+QWxsb3c8L29wdGlvbj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhcHByb3ZhbFwiPlVwb24gYXBwcm92YWw8L29wdGlvbj5cclxuICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJzZXBcIj48L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiPlVzZXIgdmlkZW86PC9sYWJlbD5cclxuICAgICAgICA8c2VsZWN0IGNsYXNzPVwicGlja2VyLXNlbGVjdFwiIFsobmdNb2RlbCldPVwidmlkZW9TdGF0ZVwiPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRpc2FsbG93XCI+RGlzYWxsb3c8L29wdGlvbj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhbGxvd1wiPkFsbG93PC9vcHRpb24+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYXBwcm92YWxcIj5VcG9uIGFwcHJvdmFsPC9vcHRpb24+XHJcbiAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwic2VwXCI+PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIj5Vc2VyIHNjcmVlbnNoYXJlOjwvbGFiZWw+XHJcbiAgICAgICAgPHNlbGVjdCBjbGFzcz1cInBpY2tlci1zZWxlY3RcIiBbKG5nTW9kZWwpXT1cInNjcmVlbnNoYXJlU3RhdGVcIj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJkaXNhbGxvd1wiPkRpc2FsbG93PC9vcHRpb24+XHJcbiAgICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYWxsb3dcIj5BbGxvdzwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImFwcHJvdmFsXCI+VXBvbiBhcHByb3ZhbDwvb3B0aW9uPlxyXG4gICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInNlcFwiPjwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImxhYmVsXCI+VXNlciBjaGF0OjwvbGFiZWw+XHJcbiAgICAgICAgPHNlbGVjdCBjbGFzcz1cInBpY2tlci1zZWxlY3RcIiBbKG5nTW9kZWwpXT1cImNoYXRTdGF0ZVwiPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cImRpc2FsbG93XCI+RGlzYWxsb3c8L29wdGlvbj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJhbGxvd1wiPkFsbG93PC9vcHRpb24+XHJcbiAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tYXBwbHktc2V0dGluZ3NcIiAoY2xpY2spPVwiaGFuZGxlU2F2ZVNldHRpbmdzKClcIj5TYXZlPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==