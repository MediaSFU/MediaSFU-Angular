import { Component, Input } from '@angular/core';
import { faTimes, faSyncAlt, faCamera, faMicrophone, faPhotoFilm, } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "../../../methods/stream-methods/switch-audio.service";
import * as i2 from "../../../methods/stream-methods/switch-video.service";
import * as i3 from "../../../methods/stream-methods/switch-video-alt.service";
import * as i4 from "@angular/common";
import * as i5 from "@fortawesome/angular-fontawesome";
import * as i6 from "@angular/forms";
/**
 * Component for displaying and managing media settings in a modal.
 *
 * @selector app-media-settings-modal
 * @templateUrl ./media-settings-modal.component.html
 * @styleUrls ./media-settings-modal.component.css
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, FormsModule]
 *
 * @class MediaSettingsModal
 * @implements OnInit, OnChanges
 *
 * @property {boolean} isMediaSettingsModalVisible - Determines if the media settings modal is visible.
 * @property {() => void} onMediaSettingsClose - Callback function to close the media settings modal.
 * @property {(params: any) => Promise<void>} switchCameraOnPress - Callback function to switch the camera.
 * @property {(params: any) => Promise<void>} switchVideoOnPress - Callback function to switch the video.
 * @property {(params: any) => Promise<void>} switchAudioOnPress - Callback function to switch the audio.
 * @property {MediaSettingsModalParameters} parameters - Parameters for the media settings modal.
 * @property {string} position - Position of the modal on the screen. Default is 'topRight'.
 * @property {string} backgroundColor - Background color of the modal. Default is '#83c0e9'.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for closing the modal.
 * @property {IconDefinition} faSyncAlt - FontAwesome icon for sync.
 * @property {IconDefinition} faCamera - FontAwesome icon for camera.
 * @property {IconDefinition} faMicrophone - FontAwesome icon for microphone.
 * @property {IconDefinition} faPhotoFilm - FontAwesome icon for photo film.
 *
 * @property {string} selectedVideoInput - Currently selected video input device ID.
 * @property {string} selectedAudioInput - Currently selected audio input device ID.
 * @property {string} prevSelectedVideoInput - Previously selected video input device ID.
 * @property {string} prevSelectedAudioInput - Previously selected audio input device ID.
 *
 * @constructor
 * @param {SwitchAudio} switchAudioService - Service for switching audio.
 * @param {SwitchVideo} switchVideoService - Service for switching video.
 * @param {SwitchVideoAlt} switchVideoAltService - Alternative service for switching video.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @method setupDefaultServices - Sets up default services for switching camera, video, and audio if not provided.
 * @method updateParameters - Updates the parameters for the modal.
 * @method ensureDefaultSelections - Ensures that default selections for video and audio inputs are set.
 * @method initializeModalSettings - Initializes settings for the modal.
 * @method modalContentStyle - Returns the style object for the modal content.
 * @method handleSwitchCamera - Handles the action to switch the camera.
 * @method handleVideoSwitch - Handles the action to switch the video input.
 * @method handleAudioSwitch - Handles the action to switch the audio input.
 * @method handleModalClose - Handles the action to close the modal.
 * @method showVirtual - Toggles the visibility of the virtual background modal.
 */
export class MediaSettingsModal {
    switchAudioService;
    switchVideoService;
    switchVideoAltService;
    isMediaSettingsModalVisible = false;
    onMediaSettingsClose;
    switchCameraOnPress;
    switchVideoOnPress;
    switchAudioOnPress;
    parameters;
    position = 'topRight';
    backgroundColor = '#83c0e9';
    faTimes = faTimes;
    faSyncAlt = faSyncAlt;
    faCamera = faCamera;
    faMicrophone = faMicrophone;
    faPhotoFilm = faPhotoFilm;
    selectedVideoInput;
    selectedAudioInput;
    prevSelectedVideoInput;
    prevSelectedAudioInput;
    constructor(switchAudioService, switchVideoService, switchVideoAltService) {
        this.switchAudioService = switchAudioService;
        this.switchVideoService = switchVideoService;
        this.switchVideoAltService = switchVideoAltService;
    }
    ngOnInit() {
        if (this.isMediaSettingsModalVisible) {
            this.updateParameters();
            this.setupDefaultServices();
            this.initializeModalSettings();
            this.ensureDefaultSelections();
        }
    }
    ngOnChanges(changes) {
        if (changes['isMediaSettingsModalVisible'] &&
            this.isMediaSettingsModalVisible &&
            this.parameters) {
            this.updateParameters();
            this.setupDefaultServices();
            this.ensureDefaultSelections();
        }
    }
    setupDefaultServices() {
        if (!this.switchCameraOnPress) {
            this.switchCameraOnPress = (params) => this.switchVideoAltService.switchVideoAlt(params);
        }
        if (!this.switchVideoOnPress) {
            this.switchVideoOnPress = (params) => this.switchVideoService.switchVideo(params);
        }
        if (!this.switchAudioOnPress) {
            this.switchAudioOnPress = (params) => this.switchAudioService.switchAudio(params);
        }
    }
    updateParameters() {
        this.parameters = {
            ...this.parameters,
            ...this.parameters.getUpdatedAllParams(),
        };
    }
    ensureDefaultSelections() {
        if (!this.selectedVideoInput && this.parameters.videoInputs.length > 0) {
            this.selectedVideoInput = this.parameters.videoInputs[0].deviceId;
            this.prevSelectedVideoInput = this.selectedVideoInput;
            this.handleVideoSwitch({ target: { value: this.selectedVideoInput } });
        }
        if (!this.selectedAudioInput && this.parameters.audioInputs.length > 0) {
            this.selectedAudioInput = this.parameters.audioInputs[0].deviceId;
            this.prevSelectedAudioInput = this.selectedAudioInput;
            this.handleAudioSwitch({ target: { value: this.selectedAudioInput } });
        }
    }
    initializeModalSettings() {
        const screenWidth = window.innerWidth;
        let modalWidth = 0.7 * screenWidth;
        if (modalWidth > 350) {
            modalWidth = 350;
        }
    }
    modalContentStyle() {
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
    handleSwitchCamera = async () => {
        await this.switchCameraOnPress({ parameters: this.parameters });
    };
    handleVideoSwitch = async (event) => {
        const value = event.target.value;
        if (value !== this.prevSelectedVideoInput) {
            this.selectedVideoInput = value;
            this.prevSelectedVideoInput = this.selectedVideoInput;
            await this.switchVideoOnPress({ videoPreference: value, parameters: this.parameters });
        }
    };
    handleAudioSwitch = async (event) => {
        const value = event.target.value;
        if (value !== this.prevSelectedAudioInput) {
            this.selectedAudioInput = value;
            this.prevSelectedAudioInput = this.selectedAudioInput;
            await this.switchAudioOnPress({ audioPreference: value, parameters: this.parameters });
        }
    };
    handleModalClose() {
        this.onMediaSettingsClose();
    }
    showVirtual() {
        this.parameters.updateIsBackgroundModalVisible(!this.parameters.isBackgroundModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MediaSettingsModal, deps: [{ token: i1.SwitchAudio }, { token: i2.SwitchVideo }, { token: i3.SwitchVideoAlt }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MediaSettingsModal, isStandalone: true, selector: "app-media-settings-modal", inputs: { isMediaSettingsModalVisible: "isMediaSettingsModalVisible", onMediaSettingsClose: "onMediaSettingsClose", switchCameraOnPress: "switchCameraOnPress", switchVideoOnPress: "switchVideoOnPress", switchAudioOnPress: "switchAudioOnPress", parameters: "parameters", position: "position", backgroundColor: "backgroundColor" }, usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"isMediaSettingsModalVisible\" class=\"modal-container\">\r\n  <div class=\"modal-content\" [ngStyle]=\"modalContentStyle()\">\r\n    <div class=\"modal-header\">\r\n      <div class=\"modal-title\">Media Settings</div>\r\n      <div (click)=\"handleModalClose()\">\r\n        <fa-icon [icon]=\"faTimes\" class=\"icon\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr class=\"hr\" />\r\n    <div class=\"modal-body\">\r\n      <div class=\"form-group\">\r\n        <label>\r\n          <fa-icon [icon]=\"faCamera\" [ngStyle]=\"{'margin-right': '8px'}\"></fa-icon> Select Camera:\r\n        </label>\r\n        <select [(ngModel)]=\"selectedVideoInput\" (change)=\"handleVideoSwitch($event)\" class=\"form-control\">\r\n          <option *ngFor=\"let input of parameters.videoInputs\" [value]=\"input.deviceId\">\r\n            {{ input.label }}\r\n          </option>\r\n        </select>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label>\r\n          <fa-icon [icon]=\"faMicrophone\" [ngStyle]=\"{'margin-right': '8px'}\"></fa-icon> Select Microphone:\r\n        </label>\r\n        <select [(ngModel)]=\"selectedAudioInput\" (change)=\"handleAudioSwitch($event)\" class=\"form-control\">\r\n          <option *ngFor=\"let input of parameters.audioInputs\" [value]=\"input.deviceId\">\r\n            {{ input.label }}\r\n          </option>\r\n        </select>\r\n      </div>\r\n      <hr class=\"hr\" />\r\n      <div class=\"form-group\">\r\n        <button (click)=\"handleSwitchCamera()\" class=\"btn-switch\">\r\n          <fa-icon [icon]=\"faSyncAlt\" [ngStyle]=\"{'margin-right': '8px'}\"></fa-icon> Switch Camera\r\n        </button>\r\n      </div>\r\n      <hr class=\"hr\" />\r\n      <div class=\"form-group\">\r\n        <button (click)=\"showVirtual()\" class=\"btn-virtual\">\r\n          <fa-icon [icon]=\"faPhotoFilm\" [ngStyle]=\"{'margin-right': '8px'}\"></fa-icon> Virtual Background\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:999}.modal-content{position:absolute;display:flex;flex-direction:column}.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px}.modal-title{font-size:18px;font-weight:700;color:#000}.icon{cursor:pointer;color:#000;font-size:24px;font-weight:700}.form-group{margin-bottom:15px}.form-group label{display:flex;align-items:center;font-size:16px;margin-bottom:5px}.form-control{width:100%;padding:8px;font-size:16px;border:1px solid #ccc;border-radius:4px}.hr{margin:10px 0;border:none;border-top:1px solid #ccc}.btn-switch,.btn-virtual{width:100%;padding:10px;border:none;border-radius:5px;cursor:pointer;font-size:16px;margin-bottom:10px}.btn-switch,.btn-virtual{background-color:#83c0e9;color:#000}.btn-switch:hover,.btn-virtual:hover{background-color:#6aa6d1}.btn-switch:focus,.btn-virtual:focus{outline:none}.button{border-radius:5px;color:#fff;padding:5px 10px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i4.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i4.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i4.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i5.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i6.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i6.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i6.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MediaSettingsModal, decorators: [{
            type: Component,
            args: [{ selector: 'app-media-settings-modal', standalone: true, imports: [CommonModule, FontAwesomeModule, FormsModule], template: "<div *ngIf=\"isMediaSettingsModalVisible\" class=\"modal-container\">\r\n  <div class=\"modal-content\" [ngStyle]=\"modalContentStyle()\">\r\n    <div class=\"modal-header\">\r\n      <div class=\"modal-title\">Media Settings</div>\r\n      <div (click)=\"handleModalClose()\">\r\n        <fa-icon [icon]=\"faTimes\" class=\"icon\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr class=\"hr\" />\r\n    <div class=\"modal-body\">\r\n      <div class=\"form-group\">\r\n        <label>\r\n          <fa-icon [icon]=\"faCamera\" [ngStyle]=\"{'margin-right': '8px'}\"></fa-icon> Select Camera:\r\n        </label>\r\n        <select [(ngModel)]=\"selectedVideoInput\" (change)=\"handleVideoSwitch($event)\" class=\"form-control\">\r\n          <option *ngFor=\"let input of parameters.videoInputs\" [value]=\"input.deviceId\">\r\n            {{ input.label }}\r\n          </option>\r\n        </select>\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label>\r\n          <fa-icon [icon]=\"faMicrophone\" [ngStyle]=\"{'margin-right': '8px'}\"></fa-icon> Select Microphone:\r\n        </label>\r\n        <select [(ngModel)]=\"selectedAudioInput\" (change)=\"handleAudioSwitch($event)\" class=\"form-control\">\r\n          <option *ngFor=\"let input of parameters.audioInputs\" [value]=\"input.deviceId\">\r\n            {{ input.label }}\r\n          </option>\r\n        </select>\r\n      </div>\r\n      <hr class=\"hr\" />\r\n      <div class=\"form-group\">\r\n        <button (click)=\"handleSwitchCamera()\" class=\"btn-switch\">\r\n          <fa-icon [icon]=\"faSyncAlt\" [ngStyle]=\"{'margin-right': '8px'}\"></fa-icon> Switch Camera\r\n        </button>\r\n      </div>\r\n      <hr class=\"hr\" />\r\n      <div class=\"form-group\">\r\n        <button (click)=\"showVirtual()\" class=\"btn-virtual\">\r\n          <fa-icon [icon]=\"faPhotoFilm\" [ngStyle]=\"{'margin-right': '8px'}\"></fa-icon> Virtual Background\r\n        </button>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:999}.modal-content{position:absolute;display:flex;flex-direction:column}.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px}.modal-title{font-size:18px;font-weight:700;color:#000}.icon{cursor:pointer;color:#000;font-size:24px;font-weight:700}.form-group{margin-bottom:15px}.form-group label{display:flex;align-items:center;font-size:16px;margin-bottom:5px}.form-control{width:100%;padding:8px;font-size:16px;border:1px solid #ccc;border-radius:4px}.hr{margin:10px 0;border:none;border-top:1px solid #ccc}.btn-switch,.btn-virtual{width:100%;padding:10px;border:none;border-radius:5px;cursor:pointer;font-size:16px;margin-bottom:10px}.btn-switch,.btn-virtual{background-color:#83c0e9;color:#000}.btn-switch:hover,.btn-virtual:hover{background-color:#6aa6d1}.btn-switch:focus,.btn-virtual:focus{outline:none}.button{border-radius:5px;color:#fff;padding:5px 10px}\n"] }]
        }], ctorParameters: () => [{ type: i1.SwitchAudio }, { type: i2.SwitchVideo }, { type: i3.SwitchVideoAlt }], propDecorators: { isMediaSettingsModalVisible: [{
                type: Input
            }], onMediaSettingsClose: [{
                type: Input
            }], switchCameraOnPress: [{
                type: Input
            }], switchVideoOnPress: [{
                type: Input
            }], switchAudioOnPress: [{
                type: Input
            }], parameters: [{
                type: Input
            }], position: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtc2V0dGluZ3MtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvbWVkaWEtc2V0dGluZ3MtY29tcG9uZW50cy9tZWRpYS1zZXR0aW5ncy1tb2RhbC9tZWRpYS1zZXR0aW5ncy1tb2RhbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9tZWRpYS1zZXR0aW5ncy1jb21wb25lbnRzL21lZGlhLXNldHRpbmdzLW1vZGFsL21lZGlhLXNldHRpbmdzLW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQ0wsT0FBTyxFQUNQLFNBQVMsRUFDVCxRQUFRLEVBQ1IsWUFBWSxFQUNaLFdBQVcsR0FDWixNQUFNLG1DQUFtQyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7O0FBNkM3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlERztBQVFILE1BQU0sT0FBTyxrQkFBa0I7SUFzQm5CO0lBQ0E7SUFDQTtJQXZCRCwyQkFBMkIsR0FBRyxLQUFLLENBQUM7SUFDcEMsb0JBQW9CLENBQWM7SUFDbEMsbUJBQW1CLENBQWtDO0lBQ3JELGtCQUFrQixDQUFrQztJQUNwRCxrQkFBa0IsQ0FBa0M7SUFDcEQsVUFBVSxDQUFnQztJ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QUN4RCxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUM7WUFDdEQsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztRQUN6RixDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzVGLENBQUM7dUdBNUlVLGtCQUFrQjsyRkFBbEIsa0JBQWtCLG1iQ2hIL0IscytEQTZDQSw4bENEaUVZLFlBQVksb1ZBQUUsaUJBQWlCLDRQQUFFLFdBQVc7OzJGQUUzQyxrQkFBa0I7a0JBUDlCLFNBQVM7K0JBQ0UsMEJBQTBCLGNBR3hCLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxXQUFXLENBQUM7dUlBRzlDLDJCQUEyQjtzQkFBbkMsS0FBSztnQkFDRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBQ0csbUJBQW1CO3NCQUEzQixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgZmFUaW1lcyxcbiAgZmFTeW5jQWx0LFxuICBmYUNhbWVyYSxcbiAgZmFNaWNyb3Bob25lLFxuICBmYVBob3RvRmlsbSxcbn0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgU3dpdGNoQXVkaW8sXG4gIFN3aXRjaEF1ZGlvT3B0aW9ucyxcbiAgU3dpdGNoQXVkaW9QYXJhbWV0ZXJzLFxufSBmcm9tICcuLi8uLi8uLi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL3N3aXRjaC1hdWRpby5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIFN3aXRjaFZpZGVvLFxuICBTd2l0Y2hWaWRlb09wdGlvbnMsXG4gIFN3aXRjaFZpZGVvUGFyYW1ldGVycyxcbn0gZnJvbSAnLi4vLi4vLi4vbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9zd2l0Y2gtdmlkZW8uc2VydmljZSc7XG5pbXBvcnQge1xuICBTd2l0Y2hWaWRlb0FsdCxcbiAgU3dpdGNoVmlkZW9BbHRPcHRpb25zLFxuICBTd2l0Y2hWaWRlb0FsdFBhcmFtZXRlcnMsXG59IGZyb20gJy4uLy4uLy4uL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvc3dpdGNoLXZpZGVvLWFsdC5zZXJ2aWNlJztcblxuZXhwb3J0IGludGVyZmFjZSBNZWRpYVNldHRpbmdzTW9kYWxQYXJhbWV0ZXJzXG4gIGV4dGVuZHMgU3dpdGNoQXVkaW9QYXJhbWV0ZXJzLFxuICAgIFN3aXRjaFZpZGVvUGFyYW1ldGVycyxcbiAgICBTd2l0Y2hWaWRlb0FsdFBhcmFtZXRlcnMge1xuICB1c2VyRGVmYXVsdFZpZGVvSW5wdXREZXZpY2U6IHN0cmluZztcbiAgdmlkZW9JbnB1dHM6IE1lZGlhRGV2aWNlSW5mb1tdO1xuICBhdWRpb0lucHV0czogTWVkaWFEZXZpY2VJbmZvW107XG4gIHVzZXJEZWZhdWx0QXVkaW9JbnB1dERldmljZTogc3RyaW5nO1xuICBpc0JhY2tncm91bmRNb2RhbFZpc2libGU6IGJvb2xlYW47XG4gIHVwZGF0ZUlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZTogKHZpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IE1lZGlhU2V0dGluZ3NNb2RhbFBhcmFtZXRlcnM7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVkaWFTZXR0aW5nc01vZGFsT3B0aW9ucyB7XG4gIGlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZTogYm9vbGVhbjtcbiAgb25NZWRpYVNldHRpbmdzQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIHN3aXRjaENhbWVyYU9uUHJlc3M/OiAob3B0aW9uczogU3dpdGNoVmlkZW9BbHRPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBzd2l0Y2hWaWRlb09uUHJlc3M/OiAob3B0aW9uczogU3dpdGNoVmlkZW9PcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBzd2l0Y2hBdWRpb09uUHJlc3M/OiAob3B0aW9uczogU3dpdGNoQXVkaW9PcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBwYXJhbWV0ZXJzOiBNZWRpYVNldHRpbmdzTW9kYWxQYXJhbWV0ZXJzO1xuICBwb3NpdGlvbjogc3RyaW5nO1xuICBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWVkaWFTZXR0aW5nc01vZGFsVHlwZSA9IChvcHRpb25zOiBNZWRpYVNldHRpbmdzTW9kYWxPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBDb21wb25lbnQgZm9yIGRpc3BsYXlpbmcgYW5kIG1hbmFnaW5nIG1lZGlhIHNldHRpbmdzIGluIGEgbW9kYWwuXG4gKlxuICogQHNlbGVjdG9yIGFwcC1tZWRpYS1zZXR0aW5ncy1tb2RhbFxuICogQHRlbXBsYXRlVXJsIC4vbWVkaWEtc2V0dGluZ3MtbW9kYWwuY29tcG9uZW50Lmh0bWxcbiAqIEBzdHlsZVVybHMgLi9tZWRpYS1zZXR0aW5ncy1tb2RhbC5jb21wb25lbnQuY3NzXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgRm9ybXNNb2R1bGVdXG4gKlxuICogQGNsYXNzIE1lZGlhU2V0dGluZ3NNb2RhbFxuICogQGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXNcbiAqXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZSAtIERldGVybWluZXMgaWYgdGhlIG1lZGlhIHNldHRpbmdzIG1vZGFsIGlzIHZpc2libGUuXG4gKiBAcHJvcGVydHkgeygpID0+IHZvaWR9IG9uTWVkaWFTZXR0aW5nc0Nsb3NlIC0gQ2FsbGJhY2sgZnVuY3Rpb24gdG8gY2xvc2UgdGhlIG1lZGlhIHNldHRpbmdzIG1vZGFsLlxuICogQHByb3BlcnR5IHsocGFyYW1zOiBhbnkpID0+IFByb21pc2U8dm9pZD59IHN3aXRjaENhbWVyYU9uUHJlc3MgLSBDYWxsYmFjayBmdW5jdGlvbiB0byBzd2l0Y2ggdGhlIGNhbWVyYS5cbiAqIEBwcm9wZXJ0eSB7KHBhcmFtczogYW55KSA9PiBQcm9taXNlPHZvaWQ+fSBzd2l0Y2hWaWRlb09uUHJlc3MgLSBDYWxsYmFjayBmdW5jdGlvbiB0byBzd2l0Y2ggdGhlIHZpZGVvLlxuICogQHByb3BlcnR5IHsocGFyYW1zOiBhbnkpID0+IFByb21pc2U8dm9pZD59IHN3aXRjaEF1ZGlvT25QcmVzcyAtIENhbGxiYWNrIGZ1bmN0aW9uIHRvIHN3aXRjaCB0aGUgYXVkaW8uXG4gKiBAcHJvcGVydHkge01lZGlhU2V0dGluZ3NNb2RhbFBhcmFtZXRlcnN9IHBhcmFtZXRlcnMgLSBQYXJhbWV0ZXJzIGZvciB0aGUgbWVkaWEgc2V0dGluZ3MgbW9kYWwuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcG9zaXRpb24gLSBQb3NpdGlvbiBvZiB0aGUgbW9kYWwgb24gdGhlIHNjcmVlbi4gRGVmYXVsdCBpcyAndG9wUmlnaHQnLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGJhY2tncm91bmRDb2xvciAtIEJhY2tncm91bmQgY29sb3Igb2YgdGhlIG1vZGFsLiBEZWZhdWx0IGlzICcjODNjMGU5Jy5cbiAqXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVRpbWVzIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgY2xvc2luZyB0aGUgbW9kYWwuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVN5bmNBbHQgLSBGb250QXdlc29tZSBpY29uIGZvciBzeW5jLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFDYW1lcmEgLSBGb250QXdlc29tZSBpY29uIGZvciBjYW1lcmEuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYU1pY3JvcGhvbmUgLSBGb250QXdlc29tZSBpY29uIGZvciBtaWNyb3Bob25lLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFQaG90b0ZpbG0gLSBGb250QXdlc29tZSBpY29uIGZvciBwaG90byBmaWxtLlxuICpcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWxlY3RlZFZpZGVvSW5wdXQgLSBDdXJyZW50bHkgc2VsZWN0ZWQgdmlkZW8gaW5wdXQgZGV2aWNlIElELlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlbGVjdGVkQXVkaW9JbnB1dCAtIEN1cnJlbnRseSBzZWxlY3RlZCBhdWRpbyBpbnB1dCBkZXZpY2UgSUQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcHJldlNlbGVjdGVkVmlkZW9JbnB1dCAtIFByZXZpb3VzbHkgc2VsZWN0ZWQgdmlkZW8gaW5wdXQgZGV2aWNlIElELlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHByZXZTZWxlY3RlZEF1ZGlvSW5wdXQgLSBQcmV2aW91c2x5IHNlbGVjdGVkIGF1ZGlvIGlucHV0IGRldmljZSBJRC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7U3dpdGNoQXVkaW99IHN3aXRjaEF1ZGlvU2VydmljZSAtIFNlcnZpY2UgZm9yIHN3aXRjaGluZyBhdWRpby5cbiAqIEBwYXJhbSB7U3dpdGNoVmlkZW99IHN3aXRjaFZpZGVvU2VydmljZSAtIFNlcnZpY2UgZm9yIHN3aXRjaGluZyB2aWRlby5cbiAqIEBwYXJhbSB7U3dpdGNoVmlkZW9BbHR9IHN3aXRjaFZpZGVvQWx0U2VydmljZSAtIEFsdGVybmF0aXZlIHNlcnZpY2UgZm9yIHN3aXRjaGluZyB2aWRlby5cbiAqXG4gKiBAbWV0aG9kIG5nT25Jbml0IC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIGFyZSBpbml0aWFsaXplZC5cbiAqIEBtZXRob2QgbmdPbkNoYW5nZXMgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIGFueSBkYXRhLWJvdW5kIHByb3BlcnR5IGNoYW5nZXMuXG4gKiBAbWV0aG9kIHNldHVwRGVmYXVsdFNlcnZpY2VzIC0gU2V0cyB1cCBkZWZhdWx0IHNlcnZpY2VzIGZvciBzd2l0Y2hpbmcgY2FtZXJhLCB2aWRlbywgYW5kIGF1ZGlvIGlmIG5vdCBwcm92aWRlZC5cbiAqIEBtZXRob2QgdXBkYXRlUGFyYW1ldGVycyAtIFVwZGF0ZXMgdGhlIHBhcmFtZXRlcnMgZm9yIHRoZSBtb2RhbC5cbiAqIEBtZXRob2QgZW5zdXJlRGVmYXVsdFNlbGVjdGlvbnMgLSBFbnN1cmVzIHRoYXQgZGVmYXVsdCBzZWxlY3Rpb25zIGZvciB2aWRlbyBhbmQgYXVkaW8gaW5wdXRzIGFyZSBzZXQuXG4gKiBAbWV0aG9kIGluaXRpYWxpemVNb2RhbFNldHRpbmdzIC0gSW5pdGlhbGl6ZXMgc2V0dGluZ3MgZm9yIHRoZSBtb2RhbC5cbiAqIEBtZXRob2QgbW9kYWxDb250ZW50U3R5bGUgLSBSZXR1cm5zIHRoZSBzdHlsZSBvYmplY3QgZm9yIHRoZSBtb2RhbCBjb250ZW50LlxuICogQG1ldGhvZCBoYW5kbGVTd2l0Y2hDYW1lcmEgLSBIYW5kbGVzIHRoZSBhY3Rpb24gdG8gc3dpdGNoIHRoZSBjYW1lcmEuXG4gKiBAbWV0aG9kIGhhbmRsZVZpZGVvU3dpdGNoIC0gSGFuZGxlcyB0aGUgYWN0aW9uIHRvIHN3aXRjaCB0aGUgdmlkZW8gaW5wdXQuXG4gKiBAbWV0aG9kIGhhbmRsZUF1ZGlvU3dpdGNoIC0gSGFuZGxlcyB0aGUgYWN0aW9uIHRvIHN3aXRjaCB0aGUgYXVkaW8gaW5wdXQuXG4gKiBAbWV0aG9kIGhhbmRsZU1vZGFsQ2xvc2UgLSBIYW5kbGVzIHRoZSBhY3Rpb24gdG8gY2xvc2UgdGhlIG1vZGFsLlxuICogQG1ldGhvZCBzaG93VmlydHVhbCAtIFRvZ2dsZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIHZpcnR1YWwgYmFja2dyb3VuZCBtb2RhbC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1lZGlhLXNldHRpbmdzLW1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lZGlhLXNldHRpbmdzLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVkaWEtc2V0dGluZ3MtbW9kYWwuY29tcG9uZW50LmNzcyddLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgRm9ybXNNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBNZWRpYVNldHRpbmdzTW9kYWwgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBvbk1lZGlhU2V0dGluZ3NDbG9zZSE6ICgpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIHN3aXRjaENhbWVyYU9uUHJlc3MhOiAocGFyYW1zOiBhbnkpID0+IFByb21pc2U8dm9pZD47XG4gIEBJbnB1dCgpIHN3aXRjaFZpZGVvT25QcmVzcyE6IChwYXJhbXM6IGFueSkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgQElucHV0KCkgc3dpdGNoQXVkaW9PblByZXNzITogKHBhcmFtczogYW55KSA9PiBQcm9taXNlPHZvaWQ+O1xuICBASW5wdXQoKSBwYXJhbWV0ZXJzITogTWVkaWFTZXR0aW5nc01vZGFsUGFyYW1ldGVycztcbiAgQElucHV0KCkgcG9zaXRpb24gPSAndG9wUmlnaHQnO1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3IgPSAnIzgzYzBlOSc7XG5cbiAgZmFUaW1lcyA9IGZhVGltZXM7XG4gIGZhU3luY0FsdCA9IGZhU3luY0FsdDtcbiAgZmFDYW1lcmEgPSBmYUNhbWVyYTtcbiAgZmFNaWNyb3Bob25lID0gZmFNaWNyb3Bob25lO1xuICBmYVBob3RvRmlsbSA9IGZhUGhvdG9GaWxtO1xuXG4gIHNlbGVjdGVkVmlkZW9JbnB1dCE6IHN0cmluZztcbiAgc2VsZWN0ZWRBdWRpb0lucHV0ITogc3RyaW5nO1xuICBwcmV2U2VsZWN0ZWRWaWRlb0lucHV0ITogc3RyaW5nO1xuICBwcmV2U2VsZWN0ZWRBdWRpb0lucHV0ITogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3dpdGNoQXVkaW9TZXJ2aWNlOiBTd2l0Y2hBdWRpbyxcbiAgICBwcml2YXRlIHN3aXRjaFZpZGVvU2VydmljZTogU3dpdGNoVmlkZW8sXG4gICAgcHJpdmF0ZSBzd2l0Y2hWaWRlb0FsdFNlcnZpY2U6IFN3aXRjaFZpZGVvQWx0LFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlKSB7XG4gICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcnMoKTtcbiAgICAgIHRoaXMuc2V0dXBEZWZhdWx0U2VydmljZXMoKTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZU1vZGFsU2V0dGluZ3MoKTtcbiAgICAgIHRoaXMuZW5zdXJlRGVmYXVsdFNlbGVjdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKFxuICAgICAgY2hhbmdlc1snaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlJ10gJiZcbiAgICAgIHRoaXMuaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlICYmXG4gICAgICB0aGlzLnBhcmFtZXRlcnNcbiAgICApIHtcbiAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVycygpO1xuICAgICAgdGhpcy5zZXR1cERlZmF1bHRTZXJ2aWNlcygpO1xuICAgICAgdGhpcy5lbnN1cmVEZWZhdWx0U2VsZWN0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIHNldHVwRGVmYXVsdFNlcnZpY2VzKCkge1xuICAgIGlmICghdGhpcy5zd2l0Y2hDYW1lcmFPblByZXNzKSB7XG4gICAgICB0aGlzLnN3aXRjaENhbWVyYU9uUHJlc3MgPSAocGFyYW1zOiBhbnkpID0+IHRoaXMuc3dpdGNoVmlkZW9BbHRTZXJ2aWNlLnN3aXRjaFZpZGVvQWx0KHBhcmFtcyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnN3aXRjaFZpZGVvT25QcmVzcykge1xuICAgICAgdGhpcy5zd2l0Y2hWaWRlb09uUHJlc3MgPSAocGFyYW1zOiBhbnkpID0+IHRoaXMuc3dpdGNoVmlkZW9TZXJ2aWNlLnN3aXRjaFZpZGVvKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnN3aXRjaEF1ZGlvT25QcmVzcykge1xuICAgICAgdGhpcy5zd2l0Y2hBdWRpb09uUHJlc3MgPSAocGFyYW1zOiBhbnkpID0+IHRoaXMuc3dpdGNoQXVkaW9TZXJ2aWNlLnN3aXRjaEF1ZGlvKHBhcmFtcyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUGFyYW1ldGVycygpIHtcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB7XG4gICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXG4gICAgICAuLi50aGlzLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpLFxuICAgIH07XG4gIH1cblxuICBlbnN1cmVEZWZhdWx0U2VsZWN0aW9ucygpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRWaWRlb0lucHV0ICYmIHRoaXMucGFyYW1ldGVycy52aWRlb0lucHV0cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVmlkZW9JbnB1dCA9IHRoaXMucGFyYW1ldGVycy52aWRlb0lucHV0c1swXS5kZXZpY2VJZDtcbiAgICAgIHRoaXMucHJldlNlbGVjdGVkVmlkZW9JbnB1dCA9IHRoaXMuc2VsZWN0ZWRWaWRlb0lucHV0O1xuICAgICAgdGhpcy5oYW5kbGVWaWRlb1N3aXRjaCh7IHRhcmdldDogeyB2YWx1ZTogdGhpcy5zZWxlY3RlZFZpZGVvSW5wdXQgfSB9IGFzIGFueSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkQXVkaW9JbnB1dCAmJiB0aGlzLnBhcmFtZXRlcnMuYXVkaW9JbnB1dHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZWxlY3RlZEF1ZGlvSW5wdXQgPSB0aGlzLnBhcmFtZXRlcnMuYXVkaW9JbnB1dHNbMF0uZGV2aWNlSWQ7XG4gICAgICB0aGlzLnByZXZTZWxlY3RlZEF1ZGlvSW5wdXQgPSB0aGlzLnNlbGVjdGVkQXVkaW9JbnB1dDtcbiAgICAgIHRoaXMuaGFuZGxlQXVkaW9Td2l0Y2goeyB0YXJnZXQ6IHsgdmFsdWU6IHRoaXMuc2VsZWN0ZWRBdWRpb0lucHV0IH0gfSBhcyBhbnkpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRpYWxpemVNb2RhbFNldHRpbmdzKCkge1xuICAgIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IG1vZGFsV2lkdGggPSAwLjcgKiBzY3JlZW5XaWR0aDtcbiAgICBpZiAobW9kYWxXaWR0aCA+IDM1MCkge1xuICAgICAgbW9kYWxXaWR0aCA9IDM1MDtcbiAgICB9XG4gIH1cblxuICBtb2RhbENvbnRlbnRTdHlsZSgpIHtcbiAgICBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBtb2RhbFdpZHRoID0gMC44ICogc2NyZWVuV2lkdGg7XG4gICAgaWYgKG1vZGFsV2lkdGggPiAzNTApIHtcbiAgICAgIG1vZGFsV2lkdGggPSAzNTA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxMHB4JyxcbiAgICAgIHBhZGRpbmc6ICcxMHB4JyxcbiAgICAgIHdpZHRoOiBgJHttb2RhbFdpZHRofXB4YCxcbiAgICAgIG1heEhlaWdodDogJzY1JScsXG4gICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgIHRvcDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygndG9wJykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICBib3R0b206IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ2JvdHRvbScpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgbGVmdDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnTGVmdCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgcmlnaHQ6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ1JpZ2h0JykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZVN3aXRjaENhbWVyYSA9IGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCB0aGlzLnN3aXRjaENhbWVyYU9uUHJlc3MoeyBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMgfSk7XG4gIH07XG5cbiAgaGFuZGxlVmlkZW9Td2l0Y2ggPSBhc3luYyAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50KS52YWx1ZTtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMucHJldlNlbGVjdGVkVmlkZW9JbnB1dCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFZpZGVvSW5wdXQgPSB2YWx1ZTtcbiAgICAgIHRoaXMucHJldlNlbGVjdGVkVmlkZW9JbnB1dCA9IHRoaXMuc2VsZWN0ZWRWaWRlb0lucHV0O1xuICAgICAgYXdhaXQgdGhpcy5zd2l0Y2hWaWRlb09uUHJlc3MoeyB2aWRlb1ByZWZlcmVuY2U6IHZhbHVlLCBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMgfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUF1ZGlvU3dpdGNoID0gYXN5bmMgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MU2VsZWN0RWxlbWVudCkudmFsdWU7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLnByZXZTZWxlY3RlZEF1ZGlvSW5wdXQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRBdWRpb0lucHV0ID0gdmFsdWU7XG4gICAgICB0aGlzLnByZXZTZWxlY3RlZEF1ZGlvSW5wdXQgPSB0aGlzLnNlbGVjdGVkQXVkaW9JbnB1dDtcbiAgICAgIGF3YWl0IHRoaXMuc3dpdGNoQXVkaW9PblByZXNzKHsgYXVkaW9QcmVmZXJlbmNlOiB2YWx1ZSwgcGFyYW1ldGVyczogdGhpcy5wYXJhbWV0ZXJzIH0pO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVNb2RhbENsb3NlKCkge1xuICAgIHRoaXMub25NZWRpYVNldHRpbmdzQ2xvc2UoKTtcbiAgfVxuXG4gIHNob3dWaXJ0dWFsKCkge1xuICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUoIXRoaXMucGFyYW1ldGVycy5pc0JhY2tncm91bmRNb2RhbFZpc2libGUpO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0lmPVwiaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlXCIgY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIj5cclxuICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiIFtuZ1N0eWxlXT1cIm1vZGFsQ29udGVudFN0eWxlKClcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+TWVkaWEgU2V0dGluZ3M8L2Rpdj5cclxuICAgICAgPGRpdiAoY2xpY2spPVwiaGFuZGxlTW9kYWxDbG9zZSgpXCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFUaW1lc1wiIGNsYXNzPVwiaWNvblwiPjwvZmEtaWNvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxociBjbGFzcz1cImhyXCIgLz5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFDYW1lcmFcIiBbbmdTdHlsZV09XCJ7J21hcmdpbi1yaWdodCc6ICc4cHgnfVwiPjwvZmEtaWNvbj4gU2VsZWN0IENhbWVyYTpcclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDxzZWxlY3QgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFZpZGVvSW5wdXRcIiAoY2hhbmdlKT1cImhhbmRsZVZpZGVvU3dpdGNoKCRldmVudClcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgaW5wdXQgb2YgcGFyYW1ldGVycy52aWRlb0lucHV0c1wiIFt2YWx1ZV09XCJpbnB1dC5kZXZpY2VJZFwiPlxyXG4gICAgICAgICAgICB7eyBpbnB1dC5sYWJlbCB9fVxyXG4gICAgICAgICAgPC9vcHRpb24+XHJcbiAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhTWljcm9waG9uZVwiIFtuZ1N0eWxlXT1cInsnbWFyZ2luLXJpZ2h0JzogJzhweCd9XCI+PC9mYS1pY29uPiBTZWxlY3QgTWljcm9waG9uZTpcclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDxzZWxlY3QgWyhuZ01vZGVsKV09XCJzZWxlY3RlZEF1ZGlvSW5wdXRcIiAoY2hhbmdlKT1cImhhbmRsZUF1ZGlvU3dpdGNoKCRldmVudClcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgaW5wdXQgb2YgcGFyYW1ldGVycy5hdWRpb0lucHV0c1wiIFt2YWx1ZV09XCJpbnB1dC5kZXZpY2VJZFwiPlxyXG4gICAgICAgICAgICB7eyBpbnB1dC5sYWJlbCB9fVxyXG4gICAgICAgICAgPC9vcHRpb24+XHJcbiAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8aHIgY2xhc3M9XCJoclwiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiaGFuZGxlU3dpdGNoQ2FtZXJhKClcIiBjbGFzcz1cImJ0bi1zd2l0Y2hcIj5cclxuICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhU3luY0FsdFwiIFtuZ1N0eWxlXT1cInsnbWFyZ2luLXJpZ2h0JzogJzhweCd9XCI+PC9mYS1pY29uPiBTd2l0Y2ggQ2FtZXJhXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8aHIgY2xhc3M9XCJoclwiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwic2hvd1ZpcnR1YWwoKVwiIGNsYXNzPVwiYnRuLXZpcnR1YWxcIj5cclxuICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhUGhvdG9GaWxtXCIgW25nU3R5bGVdPVwieydtYXJnaW4tcmlnaHQnOiAnOHB4J31cIj48L2ZhLWljb24+IFZpcnR1YWwgQmFja2dyb3VuZFxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19