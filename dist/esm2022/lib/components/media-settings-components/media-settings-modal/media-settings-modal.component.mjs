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
 * MediaSettingsModal component renders a modal interface for managing media settings.
 * Users can switch between different audio and video input devices and adjust other settings.
 *
 * @component
 * @selector app-media-settings-modal
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, FormsModule]
 *
 * @example
 * ```html
 * <app-media-settings-modal
 *   [isMediaSettingsModalVisible]="true"
 *   [onMediaSettingsClose]="closeModal"
 *   [switchCameraOnPress]="handleCameraSwitch"
 *   [switchVideoOnPress]="handleVideoSwitch"
 *   [switchAudioOnPress]="handleAudioSwitch"
 *   [parameters]="mediaSettingsParams"
 *   position="topRight"
 *   backgroundColor="#83c0e9">
 * </app-media-settings-modal>
 * ```
 *
 * @input {boolean} isMediaSettingsModalVisible - Indicates whether the modal is visible.
 * @input {() => void} onMediaSettingsClose - Function to close the modal.
 * @input {(params: SwitchVideoAltOptions) => Promise<void>} switchCameraOnPress - Function to handle camera switching.
 * @input {(params: SwitchVideoOptions) => Promise<void>} switchVideoOnPress - Function to handle video switching.
 * @input {(params: SwitchAudioOptions) => Promise<void>} switchAudioOnPress - Function to handle audio switching.
 * @input {MediaSettingsModalParameters} parameters - Parameters for the modal.
 * @input {string} position - Position of the modal on the screen (default: 'topRight').
 * @input {string} backgroundColor - Background color of the modal (default: '#83c0e9').
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
 * @method ngOnInit - Initializes the component and sets up default selections and services.
 * @method ngOnChanges - Updates component state based on input changes.
 * @method setupDefaultServices - Configures default services for switching camera, video, and audio.
 * @method updateParameters - Updates the modal parameters.
 * @method ensureDefaultSelections - Ensures default selections for video and audio inputs.
 * @method initializeModalSettings - Initializes the modal settings.
 * @method modalContentStyle - Returns the style object for the modal content.
 * @method handleSwitchCamera - Initiates camera switching.
 * @method handleVideoSwitch - Initiates video input switching.
 * @method handleAudioSwitch - Initiates audio input switching.
 * @method handleModalClose - Closes the modal.
 * @method showVirtual - Toggles the virtual background modal.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVkaWEtc2V0dGluZ3MtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvbWVkaWEtc2V0dGluZ3MtY29tcG9uZW50cy9tZWRpYS1zZXR0aW5ncy1tb2RhbC9tZWRpYS1zZXR0aW5ncy1tb2RhbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9tZWRpYS1zZXR0aW5ncy1jb21wb25lbnRzL21lZGlhLXNldHRpbmdzLW1vZGFsL21lZGlhLXNldHRpbmdzLW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQ0wsT0FBTyxFQUNQLFNBQVMsRUFDVCxRQUFRLEVBQ1IsWUFBWSxFQUNaLFdBQVcsR0FDWixNQUFNLG1DQUFtQyxDQUFDO0FBQzNDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7Ozs7Ozs7O0FBNkM3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNERHO0FBU0gsTUFBTSxPQUFPLGtCQUFrQjtJQXNCbkI7SUFDQTtJQUNBO0lBdkJELDJCQUEyQixHQUFHLEtBQUssQ0FBQztJQUNwQyxvQkFBb0IsQ0FBYztJQUNsQyxtQkFBbUIsQ0FBa0M7SUFDckQsa0JBQWtCLENBQWtDO0lBQ3BELGtCQUFrQixDQUFrQztJQUNwRCxVQUFVLENBQWdDO0lBQzFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDdEIsZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUVyQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ2xCLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDdEIsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUNwQixZQUFZLEdBQUcsWUFBWSxDQUFDO0lBQzVCLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFFMUIsa0JBQWtCLENBQVU7SUFDNUIsa0JBQWtCLENBQVU7SUFDNUIsc0JBQXNCLENBQVU7SUFDaEMsc0JBQXNCLENBQVU7SUFFaEMsWUFDVSxrQkFBK0IsRUFDL0Isa0JBQStCLEVBQy9CLHFCQUFxQztRQUZyQyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQWE7UUFDL0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFhO1FBQy9CLDBCQUFxQixHQUFyQixxQkFBcUIsQ0FBZ0I7SUFDNUMsQ0FBQztJQUVKLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQywyQkFBMkIsRUFBRSxDQUFDO1lBQ3JDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO1lBQzVCLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1lBQy9CLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQ0UsT0FBTyxDQUFDLDZCQUE2QixDQUFDO1lBQ3RDLElBQUksQ0FBQywyQkFBMkI7WUFDaEMsSUFBSSxDQUFDLFVBQVUsRUFDZixDQUFDO1lBQ0QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7WUFDNUIsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7UUFDakMsQ0FBQztJQUNILENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQzlCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRyxDQUFDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RixDQUFDO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6RixDQUFDO0lBQ0gsQ0FBQztJQUVELGdCQUFnQjtRQUNkLElBQUksQ0FBQyxVQUFVLEdBQUc7WUFDaEIsR0FBRyxJQUFJLENBQUMsVUFBVTtZQUNsQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUU7U0FDekMsQ0FBQztJQUNKLENBQUM7SUFFRCx1QkFBdUI7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDdkUsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUNsRSxJQUFJLENBQUMsc0JBQXNCLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO1lBQ3RELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBUyxDQUFDLENBQUM7UUFDaEYsQ0FBQztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ3ZFLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7WUFDbEUsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUN0RCxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFLEVBQVMsQ0FBQyxDQUFDO1FBQ2hGLENBQUM7SUFDSCxDQUFDO0lBRUQsdUJBQXVCO1FBQ3JCLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdEMsSUFBSSxVQUFVLEdBQUcsR0FBRyxHQUFHLFdBQVcsQ0FBQztRQUNuQyxJQUFJLFVBQVUsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNyQixVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ25CLENBQUM7SUFDSCxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN0QyxJQUFJLFVBQVUsR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDO1FBQ25DLElBQUksVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDbkIsQ0FBQztRQUVELE9BQU87WUFDTCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsWUFBWSxFQUFFLE1BQU07WUFDcEIsT0FBTyxFQUFFLE1BQU07WUFDZixLQUFLLEVBQUUsR0FBRyxVQUFVLElBQUk7WUFDeEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLE1BQU07WUFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDcEQsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDMUQsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDdEQsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07U0FDekQsQ0FBQztJQUNKLENBQUM7SUFFRCxrQkFBa0IsR0FBRyxLQUFLLElBQUksRUFBRTtRQUM5QixNQUFNLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQztJQUNsRSxDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxLQUFLLEVBQUUsS0FBWSxFQUFFLEVBQUU7UUFDekMsTUFBTSxLQUFLLEdBQUksS0FBSyxDQUFDLE1BQTRCLENBQUMsS0FBSyxDQUFDO1FBQ3hELElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7WUFDaEMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUN0RCxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixpQkFBaUIsR0FBRyxLQUFLLEVBQUUsS0FBWSxFQUFFLEVBQUU7UUFDekMsTUFBTSxLQUFLLEdBQUksS0FBSyxDQUFDLE1BQTRCLENBQUMsS0FBSyxDQUFDO1FBQ3hELElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxLQUFLLENBQUM7WUFDaEMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUN0RCxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBQ3pGLENBQUM7SUFDSCxDQUFDLENBQUM7SUFFRixnQkFBZ0I7UUFDZCxJQUFJLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLENBQUM7SUFDNUYsQ0FBQzt1R0E1SVUsa0JBQWtCOzJGQUFsQixrQkFBa0IsbWJDNUgvQixzK0RBNkNBLDhsQ0Q2RVksWUFBWSxvVkFBRSxpQkFBaUIsNFBBQUUsV0FBVzs7MkZBRTNDLGtCQUFrQjtrQkFQOUIsU0FBUzsrQkFDRSwwQkFBMEIsY0FHeEIsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLFdBQVcsQ0FBQzt1SUFHOUMsMkJBQTJCO3NCQUFuQyxLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBmYVRpbWVzLFxuICBmYVN5bmNBbHQsXG4gIGZhQ2FtZXJhLFxuICBmYU1pY3JvcGhvbmUsXG4gIGZhUGhvdG9GaWxtLFxufSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBTd2l0Y2hBdWRpbyxcbiAgU3dpdGNoQXVkaW9PcHRpb25zLFxuICBTd2l0Y2hBdWRpb1BhcmFtZXRlcnMsXG59IGZyb20gJy4uLy4uLy4uL21ldGhvZHMvc3RyZWFtLW1ldGhvZHMvc3dpdGNoLWF1ZGlvLnNlcnZpY2UnO1xuaW1wb3J0IHtcbiAgU3dpdGNoVmlkZW8sXG4gIFN3aXRjaFZpZGVvT3B0aW9ucyxcbiAgU3dpdGNoVmlkZW9QYXJhbWV0ZXJzLFxufSBmcm9tICcuLi8uLi8uLi9tZXRob2RzL3N0cmVhbS1tZXRob2RzL3N3aXRjaC12aWRlby5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIFN3aXRjaFZpZGVvQWx0LFxuICBTd2l0Y2hWaWRlb0FsdE9wdGlvbnMsXG4gIFN3aXRjaFZpZGVvQWx0UGFyYW1ldGVycyxcbn0gZnJvbSAnLi4vLi4vLi4vbWV0aG9kcy9zdHJlYW0tbWV0aG9kcy9zd2l0Y2gtdmlkZW8tYWx0LnNlcnZpY2UnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lZGlhU2V0dGluZ3NNb2RhbFBhcmFtZXRlcnNcbiAgZXh0ZW5kcyBTd2l0Y2hBdWRpb1BhcmFtZXRlcnMsXG4gICAgU3dpdGNoVmlkZW9QYXJhbWV0ZXJzLFxuICAgIFN3aXRjaFZpZGVvQWx0UGFyYW1ldGVycyB7XG4gIHVzZXJEZWZhdWx0VmlkZW9JbnB1dERldmljZTogc3RyaW5nO1xuICB2aWRlb0lucHV0czogTWVkaWFEZXZpY2VJbmZvW107XG4gIGF1ZGlvSW5wdXRzOiBNZWRpYURldmljZUluZm9bXTtcbiAgdXNlckRlZmF1bHRBdWRpb0lucHV0RGV2aWNlOiBzdHJpbmc7XG4gIGlzQmFja2dyb3VuZE1vZGFsVmlzaWJsZTogYm9vbGVhbjtcbiAgdXBkYXRlSXNCYWNrZ3JvdW5kTW9kYWxWaXNpYmxlOiAodmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gTWVkaWFTZXR0aW5nc01vZGFsUGFyYW1ldGVycztcbn1cblxuZXhwb3J0IGludGVyZmFjZSBNZWRpYVNldHRpbmdzTW9kYWxPcHRpb25zIHtcbiAgaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlOiBib29sZWFuO1xuICBvbk1lZGlhU2V0dGluZ3NDbG9zZTogKCkgPT4gdm9pZDtcbiAgc3dpdGNoQ2FtZXJhT25QcmVzcz86IChvcHRpb25zOiBTd2l0Y2hWaWRlb0FsdE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG4gIHN3aXRjaFZpZGVvT25QcmVzcz86IChvcHRpb25zOiBTd2l0Y2hWaWRlb09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG4gIHN3aXRjaEF1ZGlvT25QcmVzcz86IChvcHRpb25zOiBTd2l0Y2hBdWRpb09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG4gIHBhcmFtZXRlcnM6IE1lZGlhU2V0dGluZ3NNb2RhbFBhcmFtZXRlcnM7XG4gIHBvc2l0aW9uOiBzdHJpbmc7XG4gIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBNZWRpYVNldHRpbmdzTW9kYWxUeXBlID0gKG9wdGlvbnM6IE1lZGlhU2V0dGluZ3NNb2RhbE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIE1lZGlhU2V0dGluZ3NNb2RhbCBjb21wb25lbnQgcmVuZGVycyBhIG1vZGFsIGludGVyZmFjZSBmb3IgbWFuYWdpbmcgbWVkaWEgc2V0dGluZ3MuXG4gKiBVc2VycyBjYW4gc3dpdGNoIGJldHdlZW4gZGlmZmVyZW50IGF1ZGlvIGFuZCB2aWRlbyBpbnB1dCBkZXZpY2VzIGFuZCBhZGp1c3Qgb3RoZXIgc2V0dGluZ3MuXG4gKlxuICogQGNvbXBvbmVudFxuICogQHNlbGVjdG9yIGFwcC1tZWRpYS1zZXR0aW5ncy1tb2RhbFxuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQGltcG9ydHMgW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGUsIEZvcm1zTW9kdWxlXVxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLW1lZGlhLXNldHRpbmdzLW1vZGFsXG4gKiAgIFtpc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGVdPVwidHJ1ZVwiXG4gKiAgIFtvbk1lZGlhU2V0dGluZ3NDbG9zZV09XCJjbG9zZU1vZGFsXCJcbiAqICAgW3N3aXRjaENhbWVyYU9uUHJlc3NdPVwiaGFuZGxlQ2FtZXJhU3dpdGNoXCJcbiAqICAgW3N3aXRjaFZpZGVvT25QcmVzc109XCJoYW5kbGVWaWRlb1N3aXRjaFwiXG4gKiAgIFtzd2l0Y2hBdWRpb09uUHJlc3NdPVwiaGFuZGxlQXVkaW9Td2l0Y2hcIlxuICogICBbcGFyYW1ldGVyc109XCJtZWRpYVNldHRpbmdzUGFyYW1zXCJcbiAqICAgcG9zaXRpb249XCJ0b3BSaWdodFwiXG4gKiAgIGJhY2tncm91bmRDb2xvcj1cIiM4M2MwZTlcIj5cbiAqIDwvYXBwLW1lZGlhLXNldHRpbmdzLW1vZGFsPlxuICogYGBgXG4gKlxuICogQGlucHV0IHtib29sZWFufSBpc01lZGlhU2V0dGluZ3NNb2RhbFZpc2libGUgLSBJbmRpY2F0ZXMgd2hldGhlciB0aGUgbW9kYWwgaXMgdmlzaWJsZS5cbiAqIEBpbnB1dCB7KCkgPT4gdm9pZH0gb25NZWRpYVNldHRpbmdzQ2xvc2UgLSBGdW5jdGlvbiB0byBjbG9zZSB0aGUgbW9kYWwuXG4gKiBAaW5wdXQgeyhwYXJhbXM6IFN3aXRjaFZpZGVvQWx0T3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPn0gc3dpdGNoQ2FtZXJhT25QcmVzcyAtIEZ1bmN0aW9uIHRvIGhhbmRsZSBjYW1lcmEgc3dpdGNoaW5nLlxuICogQGlucHV0IHsocGFyYW1zOiBTd2l0Y2hWaWRlb09wdGlvbnMpID0+IFByb21pc2U8dm9pZD59IHN3aXRjaFZpZGVvT25QcmVzcyAtIEZ1bmN0aW9uIHRvIGhhbmRsZSB2aWRlbyBzd2l0Y2hpbmcuXG4gKiBAaW5wdXQgeyhwYXJhbXM6IFN3aXRjaEF1ZGlvT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPn0gc3dpdGNoQXVkaW9PblByZXNzIC0gRnVuY3Rpb24gdG8gaGFuZGxlIGF1ZGlvIHN3aXRjaGluZy5cbiAqIEBpbnB1dCB7TWVkaWFTZXR0aW5nc01vZGFsUGFyYW1ldGVyc30gcGFyYW1ldGVycyAtIFBhcmFtZXRlcnMgZm9yIHRoZSBtb2RhbC5cbiAqIEBpbnB1dCB7c3RyaW5nfSBwb3NpdGlvbiAtIFBvc2l0aW9uIG9mIHRoZSBtb2RhbCBvbiB0aGUgc2NyZWVuIChkZWZhdWx0OiAndG9wUmlnaHQnKS5cbiAqIEBpbnB1dCB7c3RyaW5nfSBiYWNrZ3JvdW5kQ29sb3IgLSBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBtb2RhbCAoZGVmYXVsdDogJyM4M2MwZTknKS5cbiAqXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVRpbWVzIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgY2xvc2luZyB0aGUgbW9kYWwuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVN5bmNBbHQgLSBGb250QXdlc29tZSBpY29uIGZvciBzeW5jLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFDYW1lcmEgLSBGb250QXdlc29tZSBpY29uIGZvciBjYW1lcmEuXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYU1pY3JvcGhvbmUgLSBGb250QXdlc29tZSBpY29uIGZvciBtaWNyb3Bob25lLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFQaG90b0ZpbG0gLSBGb250QXdlc29tZSBpY29uIGZvciBwaG90byBmaWxtLlxuICpcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBzZWxlY3RlZFZpZGVvSW5wdXQgLSBDdXJyZW50bHkgc2VsZWN0ZWQgdmlkZW8gaW5wdXQgZGV2aWNlIElELlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHNlbGVjdGVkQXVkaW9JbnB1dCAtIEN1cnJlbnRseSBzZWxlY3RlZCBhdWRpbyBpbnB1dCBkZXZpY2UgSUQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcHJldlNlbGVjdGVkVmlkZW9JbnB1dCAtIFByZXZpb3VzbHkgc2VsZWN0ZWQgdmlkZW8gaW5wdXQgZGV2aWNlIElELlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHByZXZTZWxlY3RlZEF1ZGlvSW5wdXQgLSBQcmV2aW91c2x5IHNlbGVjdGVkIGF1ZGlvIGlucHV0IGRldmljZSBJRC5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7U3dpdGNoQXVkaW99IHN3aXRjaEF1ZGlvU2VydmljZSAtIFNlcnZpY2UgZm9yIHN3aXRjaGluZyBhdWRpby5cbiAqIEBwYXJhbSB7U3dpdGNoVmlkZW99IHN3aXRjaFZpZGVvU2VydmljZSAtIFNlcnZpY2UgZm9yIHN3aXRjaGluZyB2aWRlby5cbiAqIEBwYXJhbSB7U3dpdGNoVmlkZW9BbHR9IHN3aXRjaFZpZGVvQWx0U2VydmljZSAtIEFsdGVybmF0aXZlIHNlcnZpY2UgZm9yIHN3aXRjaGluZyB2aWRlby5cbiAqXG4gKiBAbWV0aG9kIG5nT25Jbml0IC0gSW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudCBhbmQgc2V0cyB1cCBkZWZhdWx0IHNlbGVjdGlvbnMgYW5kIHNlcnZpY2VzLlxuICogQG1ldGhvZCBuZ09uQ2hhbmdlcyAtIFVwZGF0ZXMgY29tcG9uZW50IHN0YXRlIGJhc2VkIG9uIGlucHV0IGNoYW5nZXMuXG4gKiBAbWV0aG9kIHNldHVwRGVmYXVsdFNlcnZpY2VzIC0gQ29uZmlndXJlcyBkZWZhdWx0IHNlcnZpY2VzIGZvciBzd2l0Y2hpbmcgY2FtZXJhLCB2aWRlbywgYW5kIGF1ZGlvLlxuICogQG1ldGhvZCB1cGRhdGVQYXJhbWV0ZXJzIC0gVXBkYXRlcyB0aGUgbW9kYWwgcGFyYW1ldGVycy5cbiAqIEBtZXRob2QgZW5zdXJlRGVmYXVsdFNlbGVjdGlvbnMgLSBFbnN1cmVzIGRlZmF1bHQgc2VsZWN0aW9ucyBmb3IgdmlkZW8gYW5kIGF1ZGlvIGlucHV0cy5cbiAqIEBtZXRob2QgaW5pdGlhbGl6ZU1vZGFsU2V0dGluZ3MgLSBJbml0aWFsaXplcyB0aGUgbW9kYWwgc2V0dGluZ3MuXG4gKiBAbWV0aG9kIG1vZGFsQ29udGVudFN0eWxlIC0gUmV0dXJucyB0aGUgc3R5bGUgb2JqZWN0IGZvciB0aGUgbW9kYWwgY29udGVudC5cbiAqIEBtZXRob2QgaGFuZGxlU3dpdGNoQ2FtZXJhIC0gSW5pdGlhdGVzIGNhbWVyYSBzd2l0Y2hpbmcuXG4gKiBAbWV0aG9kIGhhbmRsZVZpZGVvU3dpdGNoIC0gSW5pdGlhdGVzIHZpZGVvIGlucHV0IHN3aXRjaGluZy5cbiAqIEBtZXRob2QgaGFuZGxlQXVkaW9Td2l0Y2ggLSBJbml0aWF0ZXMgYXVkaW8gaW5wdXQgc3dpdGNoaW5nLlxuICogQG1ldGhvZCBoYW5kbGVNb2RhbENsb3NlIC0gQ2xvc2VzIHRoZSBtb2RhbC5cbiAqIEBtZXRob2Qgc2hvd1ZpcnR1YWwgLSBUb2dnbGVzIHRoZSB2aXJ0dWFsIGJhY2tncm91bmQgbW9kYWwuXG4gKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1lZGlhLXNldHRpbmdzLW1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lZGlhLXNldHRpbmdzLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVkaWEtc2V0dGluZ3MtbW9kYWwuY29tcG9uZW50LmNzcyddLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgRm9ybXNNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBNZWRpYVNldHRpbmdzTW9kYWwgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGlzTWVkaWFTZXR0aW5nc01vZGFsVmlzaWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBvbk1lZGlhU2V0dGluZ3NDbG9zZSE6ICgpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIHN3aXRjaENhbWVyYU9uUHJlc3MhOiAocGFyYW1zOiBhbnkpID0+IFByb21pc2U8dm9pZD47XG4gIEBJbnB1dCgpIHN3aXRjaFZpZGVvT25QcmVzcyE6IChwYXJhbXM6IGFueSkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgQElucHV0KCkgc3dpdGNoQXVkaW9PblByZXNzITogKHBhcmFtczogYW55KSA9PiBQcm9taXNlPHZvaWQ+O1xuICBASW5wdXQoKSBwYXJhbWV0ZXJzITogTWVkaWFTZXR0aW5nc01vZGFsUGFyYW1ldGVycztcbiAgQElucHV0KCkgcG9zaXRpb24gPSAndG9wUmlnaHQnO1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3IgPSAnIzgzYzBlOSc7XG5cbiAgZmFUaW1lcyA9IGZhVGltZXM7XG4gIGZhU3luY0FsdCA9IGZhU3luY0FsdDtcbiAgZmFDYW1lcmEgPSBmYUNhbWVyYTtcbiAgZmFNaWNyb3Bob25lID0gZmFNaWNyb3Bob25lO1xuICBmYVBob3RvRmlsbSA9IGZhUGhvdG9GaWxtO1xuXG4gIHNlbGVjdGVkVmlkZW9JbnB1dCE6IHN0cmluZztcbiAgc2VsZWN0ZWRBdWRpb0lucHV0ITogc3RyaW5nO1xuICBwcmV2U2VsZWN0ZWRWaWRlb0lucHV0ITogc3RyaW5nO1xuICBwcmV2U2VsZWN0ZWRBdWRpb0lucHV0ITogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgc3dpdGNoQXVkaW9TZXJ2aWNlOiBTd2l0Y2hBdWRpbyxcbiAgICBwcml2YXRlIHN3aXRjaFZpZGVvU2VydmljZTogU3dpdGNoVmlkZW8sXG4gICAgcHJpdmF0ZSBzd2l0Y2hWaWRlb0FsdFNlcnZpY2U6IFN3aXRjaFZpZGVvQWx0LFxuICApIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKHRoaXMuaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlKSB7XG4gICAgICB0aGlzLnVwZGF0ZVBhcmFtZXRlcnMoKTtcbiAgICAgIHRoaXMuc2V0dXBEZWZhdWx0U2VydmljZXMoKTtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZU1vZGFsU2V0dGluZ3MoKTtcbiAgICAgIHRoaXMuZW5zdXJlRGVmYXVsdFNlbGVjdGlvbnMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKFxuICAgICAgY2hhbmdlc1snaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlJ10gJiZcbiAgICAgIHRoaXMuaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlICYmXG4gICAgICB0aGlzLnBhcmFtZXRlcnNcbiAgICApIHtcbiAgICAgIHRoaXMudXBkYXRlUGFyYW1ldGVycygpO1xuICAgICAgdGhpcy5zZXR1cERlZmF1bHRTZXJ2aWNlcygpO1xuICAgICAgdGhpcy5lbnN1cmVEZWZhdWx0U2VsZWN0aW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIHNldHVwRGVmYXVsdFNlcnZpY2VzKCkge1xuICAgIGlmICghdGhpcy5zd2l0Y2hDYW1lcmFPblByZXNzKSB7XG4gICAgICB0aGlzLnN3aXRjaENhbWVyYU9uUHJlc3MgPSAocGFyYW1zOiBhbnkpID0+IHRoaXMuc3dpdGNoVmlkZW9BbHRTZXJ2aWNlLnN3aXRjaFZpZGVvQWx0KHBhcmFtcyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnN3aXRjaFZpZGVvT25QcmVzcykge1xuICAgICAgdGhpcy5zd2l0Y2hWaWRlb09uUHJlc3MgPSAocGFyYW1zOiBhbnkpID0+IHRoaXMuc3dpdGNoVmlkZW9TZXJ2aWNlLnN3aXRjaFZpZGVvKHBhcmFtcyk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnN3aXRjaEF1ZGlvT25QcmVzcykge1xuICAgICAgdGhpcy5zd2l0Y2hBdWRpb09uUHJlc3MgPSAocGFyYW1zOiBhbnkpID0+IHRoaXMuc3dpdGNoQXVkaW9TZXJ2aWNlLnN3aXRjaEF1ZGlvKHBhcmFtcyk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUGFyYW1ldGVycygpIHtcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB7XG4gICAgICAuLi50aGlzLnBhcmFtZXRlcnMsXG4gICAgICAuLi50aGlzLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpLFxuICAgIH07XG4gIH1cblxuICBlbnN1cmVEZWZhdWx0U2VsZWN0aW9ucygpIHtcbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRWaWRlb0lucHV0ICYmIHRoaXMucGFyYW1ldGVycy52aWRlb0lucHV0cy5sZW5ndGggPiAwKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVmlkZW9JbnB1dCA9IHRoaXMucGFyYW1ldGVycy52aWRlb0lucHV0c1swXS5kZXZpY2VJZDtcbiAgICAgIHRoaXMucHJldlNlbGVjdGVkVmlkZW9JbnB1dCA9IHRoaXMuc2VsZWN0ZWRWaWRlb0lucHV0O1xuICAgICAgdGhpcy5oYW5kbGVWaWRlb1N3aXRjaCh7IHRhcmdldDogeyB2YWx1ZTogdGhpcy5zZWxlY3RlZFZpZGVvSW5wdXQgfSB9IGFzIGFueSk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnNlbGVjdGVkQXVkaW9JbnB1dCAmJiB0aGlzLnBhcmFtZXRlcnMuYXVkaW9JbnB1dHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5zZWxlY3RlZEF1ZGlvSW5wdXQgPSB0aGlzLnBhcmFtZXRlcnMuYXVkaW9JbnB1dHNbMF0uZGV2aWNlSWQ7XG4gICAgICB0aGlzLnByZXZTZWxlY3RlZEF1ZGlvSW5wdXQgPSB0aGlzLnNlbGVjdGVkQXVkaW9JbnB1dDtcbiAgICAgIHRoaXMuaGFuZGxlQXVkaW9Td2l0Y2goeyB0YXJnZXQ6IHsgdmFsdWU6IHRoaXMuc2VsZWN0ZWRBdWRpb0lucHV0IH0gfSBhcyBhbnkpO1xuICAgIH1cbiAgfVxuXG4gIGluaXRpYWxpemVNb2RhbFNldHRpbmdzKCkge1xuICAgIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IG1vZGFsV2lkdGggPSAwLjcgKiBzY3JlZW5XaWR0aDtcbiAgICBpZiAobW9kYWxXaWR0aCA+IDM1MCkge1xuICAgICAgbW9kYWxXaWR0aCA9IDM1MDtcbiAgICB9XG4gIH1cblxuICBtb2RhbENvbnRlbnRTdHlsZSgpIHtcbiAgICBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBtb2RhbFdpZHRoID0gMC44ICogc2NyZWVuV2lkdGg7XG4gICAgaWYgKG1vZGFsV2lkdGggPiAzNTApIHtcbiAgICAgIG1vZGFsV2lkdGggPSAzNTA7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxMHB4JyxcbiAgICAgIHBhZGRpbmc6ICcxMHB4JyxcbiAgICAgIHdpZHRoOiBgJHttb2RhbFdpZHRofXB4YCxcbiAgICAgIG1heEhlaWdodDogJzY1JScsXG4gICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgIHRvcDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygndG9wJykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICBib3R0b206IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ2JvdHRvbScpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgbGVmdDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnTGVmdCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgcmlnaHQ6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ1JpZ2h0JykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZVN3aXRjaENhbWVyYSA9IGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCB0aGlzLnN3aXRjaENhbWVyYU9uUHJlc3MoeyBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMgfSk7XG4gIH07XG5cbiAgaGFuZGxlVmlkZW9Td2l0Y2ggPSBhc3luYyAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgY29uc3QgdmFsdWUgPSAoZXZlbnQudGFyZ2V0IGFzIEhUTUxTZWxlY3RFbGVtZW50KS52YWx1ZTtcbiAgICBpZiAodmFsdWUgIT09IHRoaXMucHJldlNlbGVjdGVkVmlkZW9JbnB1dCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFZpZGVvSW5wdXQgPSB2YWx1ZTtcbiAgICAgIHRoaXMucHJldlNlbGVjdGVkVmlkZW9JbnB1dCA9IHRoaXMuc2VsZWN0ZWRWaWRlb0lucHV0O1xuICAgICAgYXdhaXQgdGhpcy5zd2l0Y2hWaWRlb09uUHJlc3MoeyB2aWRlb1ByZWZlcmVuY2U6IHZhbHVlLCBwYXJhbWV0ZXJzOiB0aGlzLnBhcmFtZXRlcnMgfSk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZUF1ZGlvU3dpdGNoID0gYXN5bmMgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gKGV2ZW50LnRhcmdldCBhcyBIVE1MU2VsZWN0RWxlbWVudCkudmFsdWU7XG4gICAgaWYgKHZhbHVlICE9PSB0aGlzLnByZXZTZWxlY3RlZEF1ZGlvSW5wdXQpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRBdWRpb0lucHV0ID0gdmFsdWU7XG4gICAgICB0aGlzLnByZXZTZWxlY3RlZEF1ZGlvSW5wdXQgPSB0aGlzLnNlbGVjdGVkQXVkaW9JbnB1dDtcbiAgICAgIGF3YWl0IHRoaXMuc3dpdGNoQXVkaW9PblByZXNzKHsgYXVkaW9QcmVmZXJlbmNlOiB2YWx1ZSwgcGFyYW1ldGVyczogdGhpcy5wYXJhbWV0ZXJzIH0pO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVNb2RhbENsb3NlKCkge1xuICAgIHRoaXMub25NZWRpYVNldHRpbmdzQ2xvc2UoKTtcbiAgfVxuXG4gIHNob3dWaXJ0dWFsKCkge1xuICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVJc0JhY2tncm91bmRNb2RhbFZpc2libGUoIXRoaXMucGFyYW1ldGVycy5pc0JhY2tncm91bmRNb2RhbFZpc2libGUpO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0lmPVwiaXNNZWRpYVNldHRpbmdzTW9kYWxWaXNpYmxlXCIgY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIj5cclxuICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiIFtuZ1N0eWxlXT1cIm1vZGFsQ29udGVudFN0eWxlKClcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cIm1vZGFsLXRpdGxlXCI+TWVkaWEgU2V0dGluZ3M8L2Rpdj5cclxuICAgICAgPGRpdiAoY2xpY2spPVwiaGFuZGxlTW9kYWxDbG9zZSgpXCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFUaW1lc1wiIGNsYXNzPVwiaWNvblwiPjwvZmEtaWNvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxociBjbGFzcz1cImhyXCIgLz5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGxhYmVsPlxyXG4gICAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFDYW1lcmFcIiBbbmdTdHlsZV09XCJ7J21hcmdpbi1yaWdodCc6ICc4cHgnfVwiPjwvZmEtaWNvbj4gU2VsZWN0IENhbWVyYTpcclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDxzZWxlY3QgWyhuZ01vZGVsKV09XCJzZWxlY3RlZFZpZGVvSW5wdXRcIiAoY2hhbmdlKT1cImhhbmRsZVZpZGVvU3dpdGNoKCRldmVudClcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgaW5wdXQgb2YgcGFyYW1ldGVycy52aWRlb0lucHV0c1wiIFt2YWx1ZV09XCJpbnB1dC5kZXZpY2VJZFwiPlxyXG4gICAgICAgICAgICB7eyBpbnB1dC5sYWJlbCB9fVxyXG4gICAgICAgICAgPC9vcHRpb24+XHJcbiAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbD5cclxuICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhTWljcm9waG9uZVwiIFtuZ1N0eWxlXT1cInsnbWFyZ2luLXJpZ2h0JzogJzhweCd9XCI+PC9mYS1pY29uPiBTZWxlY3QgTWljcm9waG9uZTpcclxuICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgIDxzZWxlY3QgWyhuZ01vZGVsKV09XCJzZWxlY3RlZEF1ZGlvSW5wdXRcIiAoY2hhbmdlKT1cImhhbmRsZUF1ZGlvU3dpdGNoKCRldmVudClcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiPlxyXG4gICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgaW5wdXQgb2YgcGFyYW1ldGVycy5hdWRpb0lucHV0c1wiIFt2YWx1ZV09XCJpbnB1dC5kZXZpY2VJZFwiPlxyXG4gICAgICAgICAgICB7eyBpbnB1dC5sYWJlbCB9fVxyXG4gICAgICAgICAgPC9vcHRpb24+XHJcbiAgICAgICAgPC9zZWxlY3Q+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8aHIgY2xhc3M9XCJoclwiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwiaGFuZGxlU3dpdGNoQ2FtZXJhKClcIiBjbGFzcz1cImJ0bi1zd2l0Y2hcIj5cclxuICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhU3luY0FsdFwiIFtuZ1N0eWxlXT1cInsnbWFyZ2luLXJpZ2h0JzogJzhweCd9XCI+PC9mYS1pY29uPiBTd2l0Y2ggQ2FtZXJhXHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8aHIgY2xhc3M9XCJoclwiIC8+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGJ1dHRvbiAoY2xpY2spPVwic2hvd1ZpcnR1YWwoKVwiIGNsYXNzPVwiYnRuLXZpcnR1YWxcIj5cclxuICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhUGhvdG9GaWxtXCIgW25nU3R5bGVdPVwieydtYXJnaW4tcmlnaHQnOiAnOHB4J31cIj48L2ZhLWljb24+IFZpcnR1YWwgQmFja2dyb3VuZFxyXG4gICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19