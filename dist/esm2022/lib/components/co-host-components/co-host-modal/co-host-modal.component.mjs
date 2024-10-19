/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "../../../methods/co-host-methods/modify-co-host-settings.service";
import * as i2 from "@angular/common";
import * as i3 from "@fortawesome/angular-fontawesome";
import * as i4 from "@angular/forms";
/**
 * CoHostModal component allows managing co-host settings for an event.
 *
 * @selector app-co-host-modal
 * @inputs
 * - `isCoHostModalVisible` (boolean): A boolean value that determines whether the modal is visible. Default is false.
 * - `currentCohost` (string): The current co-host for the event. Default is 'No coHost'.
 * - `participants` (Participant[]): An array of participants in the event.
 * - `coHostResponsibility` (CoHostResponsibility[]): An array of co-host responsibilities.
 * - `position` (string): The position of the modal. Default is 'topRight'.
 * - `backgroundColor` (string): The background color of the modal. Default is '#83c0e9'.
 * - `roomName` (string): The name of the room.
 * - `showAlert` (ShowAlert): A function to show alerts.
 *
 * @outputs
 * - `updateCoHostResponsibility` (coHostResponsibility: CoHostResponsibility[]): A function to update co-host responsibilities.
 * - `updateCoHost` (coHost: string): A function to update the co-host.
 * - `updateIsCoHostModalVisible` (isCoHostModalVisible: boolean): A function to update the visibility of the modal.
 * - `socket` (Socket): The socket object.
 *
 * @methods
 * - `ngOnInit()`: Lifecycle hook that is called after the component is initialized. It sets the default value for `onModifyCoHost` if not provided.
 * - `ngOnChanges(changes: SimpleChanges)`: Lifecycle hook that is called when any data-bound property of the component changes. It initializes the responsibilities and calculates the modal width.
 * - `initializeResponsibilities()`: Initializes the responsibilities.
 * - `get filteredParticipants()`: Returns the filtered participants.
 * - `handleToggleSwitch(key: string)`: Handles the toggle switch for the given key.
 * - `handleSave()`: Handles the save action.
 * - `handleClose()`: Handles the close action.
 * - `calculateModalWidth()`: Calculates the modal width.
 * - `modalContainerStyle()`: Returns the modal container style.
 * - `modalContentStyle()`: Returns the modal content style.
 *
 * @dependencies
 * - `CommonModule`: Angular's common module is imported for common directives.
 * - `FontAwesomeModule`: Angular's font awesome module is imported for icons.
 * - `FormsModule`: Angular's forms module is imported for form-related directives.
 * - `ModifyCoHostSettings`: The ModifyCoHostSettings service is used to modify co-host settings.
 *
 * @styles
 * - `.container`: The container style.
 *
 * @example
 * ```html
 * <app-co-host-modal
 *  [isCoHostModalVisible]="isCoHostModalVisible"
 * [currentCohost]="currentCohost"
 * [participants]="participants"
 * [coHostResponsibility]="coHostResponsibility"
 * [position]="position"
 * [backgroundColor]="backgroundColor"
 * [roomName]="roomName"
 * [showAlert]="showAlert"
 * [updateCoHostResponsibility]="updateCoHostResponsibility"
 * [updateCoHost]="updateCoHost"
 * [updateIsCoHostModalVisible]="updateIsCoHostModalVisible"
 * [socket]="socket"
 * [onCoHostClose]="onCoHostClose"
 * [onModifyCoHost]="onModifyCoHost">
 * </app-co-host-modal>
 * ```
 *
 **/
export class CoHostModal {
    modifyCoHostSettingsService;
    isCoHostModalVisible = false;
    currentCohost = 'No coHost';
    participants = [];
    coHostResponsibility = [];
    position = 'topRight';
    backgroundColor = '#83c0e9';
    roomName = '';
    showAlert = () => { };
    updateCoHostResponsibility = () => { };
    updateCoHost = () => { };
    updateIsCoHostModalVisible = () => { };
    socket = {};
    onCoHostClose;
    onModifyCoHost;
    faTimes = faTimes;
    selectedCohost = this.currentCohost;
    CoHostResponsibilityCopy = [];
    CoHostResponsibilityCopyAlt = [];
    responsibilities = {};
    responsibilityKeys = [];
    modalWidth;
    constructor(modifyCoHostSettingsService) {
        this.modifyCoHostSettingsService = modifyCoHostSettingsService;
    }
    ngOnInit() {
        // Set default value for onModifyCoHost if not provided
        if (!this.onModifyCoHost) {
            this.onModifyCoHost = (params) => this.modifyCoHostSettingsService.modifyCoHostSettings(params);
        }
    }
    ngOnChanges(changes) {
        if (changes['isCoHostModalVisible'] && this.isCoHostModalVisible) {
            this.initializeResponsibilities();
            this.calculateModalWidth();
        }
    }
    initializeResponsibilities() {
        this.CoHostResponsibilityCopy = [...this.coHostResponsibility];
        this.CoHostResponsibilityCopyAlt = [...this.coHostResponsibility];
        this.responsibilityKeys = this.coHostResponsibility.map((item) => {
            const manageKey = `manage${item.name.charAt(0).toUpperCase() + item.name.slice(1)}`;
            const dedicateKey = `dedicateToManage${item.name.charAt(0).toUpperCase() + item.name.slice(1)}`;
            return { manageKey, dedicateKey };
        });
        const initialResponsibilities = this.CoHostResponsibilityCopyAlt.reduce((acc, item) => {
            const str2 = item.name.charAt(0).toUpperCase() + item.name.slice(1);
            acc[`manage${str2}`] = item.value;
            acc[`dedicateToManage${str2}`] = item.dedicated;
            return acc;
        }, {});
        this.responsibilities = initialResponsibilities;
    }
    get filteredParticipants() {
        return this.participants.filter((participant) => participant.name !== this.currentCohost && participant.islevel !== '2');
    }
    handleToggleSwitch(key) {
        if (key.startsWith('dedicateTo')) {
            const responsibilityName = key.replace('dedicateToManage', '').toLowerCase();
            const manageKey = `manage${responsibilityName.charAt(0).toUpperCase() + responsibilityName.slice(1)}`;
            // Ensure that the 'dedicated' checkbox can only be toggled if the corresponding 'responsibility' is checked
            if (this.responsibilities[manageKey]) {
                const responsibilityDedicated = this.CoHostResponsibilityCopy.find((item) => item.name === responsibilityName).dedicated;
                this.responsibilities[key] = !responsibilityDedicated;
                this.CoHostResponsibilityCopy.find((item) => item.name === responsibilityName).dedicated =
                    !responsibilityDedicated;
            }
        }
        else if (key.startsWith('manage')) {
            const responsibilityName = key.replace('manage', '').toLowerCase();
            const responsibilityValue = this.CoHostResponsibilityCopy.find((item) => item.name === responsibilityName).value;
            // Toggle the 'responsibility' checkbox and ensure the corresponding 'dedicated' checkbox is also disabled if unchecked
            this.responsibilities[key] = !responsibilityValue;
            this.CoHostResponsibilityCopy.find((item) => item.name === responsibilityName).value =
                !responsibilityValue;
            if (!this.responsibilities[key]) {
                const dedicateKey = `dedicateToManage${responsibilityName.charAt(0).toUpperCase() + responsibilityName.slice(1)}`;
                this.responsibilities[dedicateKey] = false;
                this.CoHostResponsibilityCopy.find((item) => item.name === responsibilityName).dedicated =
                    false;
            }
        }
    }
    handleSave() {
        console.log('handleSave');
        this.onModifyCoHost({
            roomName: this.roomName,
            showAlert: this.showAlert,
            selectedParticipant: this.selectedCohost,
            coHost: this.currentCohost,
            coHostResponsibility: this.CoHostResponsibilityCopy,
            updateCoHostResponsibility: this.updateCoHostResponsibility,
            updateCoHost: this.updateCoHost,
            updateIsCoHostModalVisible: this.updateIsCoHostModalVisible,
            socket: this.socket,
        });
    }
    handleClose() {
        this.onCoHostClose();
    }
    calculateModalWidth() {
        const screenWidth = window.innerWidth;
        let modalWidth = 0.8 * screenWidth;
        if (modalWidth > 400) {
            modalWidth = 400;
        }
        this.modalWidth = modalWidth;
    }
    modalContainerStyle() {
        return {
            display: this.isCoHostModalVisible ? 'block' : 'none',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '999',
        };
    }
    modalContentStyle() {
        return {
            backgroundColor: this.backgroundColor,
            borderRadius: '10px',
            padding: '10px',
            width: `${this.modalWidth}px`,
            maxHeight: '65%',
            overflowX: 'hidden',
            overflowY: 'auto',
            position: 'fixed',
            top: this.position.includes('top') ? '10px' : 'auto',
            bottom: this.position.includes('bottom') ? '10px' : 'auto',
            left: this.position.includes('Left') ? '10px' : 'auto',
            right: this.position.includes('Right') ? '10px' : 'auto',
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CoHostModal, deps: [{ token: i1.ModifyCoHostSettings }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: CoHostModal, isStandalone: true, selector: "app-co-host-modal", inputs: { isCoHostModalVisible: "isCoHostModalVisible", currentCohost: "currentCohost", participants: "participants", coHostResponsibility: "coHostResponsibility", position: "position", backgroundColor: "backgroundColor", roomName: "roomName", showAlert: "showAlert", updateCoHostResponsibility: "updateCoHostResponsibility", updateCoHost: "updateCoHost", updateIsCoHostModalVisible: "updateIsCoHostModalVisible", socket: "socket", onCoHostClose: "onCoHostClose", onModifyCoHost: "onModifyCoHost" }, usesOnChanges: true, ngImport: i0, template: "<!-- co-host-modal.component.html -->\r\n<div [ngStyle]=\"modalContainerStyle()\">\r\n  <div [ngStyle]=\"modalContentStyle()\">\r\n    <div class=\"modal-header\">\r\n      <div class=\"modal-title\">Manage Co-Host</div>\r\n      <div class=\"btn-close-settings\" (click)=\"handleClose()\">\r\n        <fa-icon [icon]=\"faTimes\" class=\"icon\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr class=\"hr\" />\r\n    <div class=\"modal-body\">\r\n      <div class=\"form-group\">\r\n        <label class=\"font-weight-bold\">Current Co-host:</label>\r\n        <input class=\"form-control\" [value]=\"currentCohost\" readonly />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label class=\"font-weight-bold\">Select New Co-host:</label>\r\n        <select class=\"form-control\" [(ngModel)]=\"selectedCohost\">\r\n          <option value=\"\">Select a participant</option>\r\n          <option *ngFor=\"let participant of filteredParticipants\" [value]=\"participant.name\">\r\n            {{ participant.name }}\r\n          </option>\r\n        </select>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-5\">\r\n          <label style=\"font-weight: bold\">Responsibility</label>\r\n        </div>\r\n        <div class=\"col-3\">\r\n          <label style=\"font-weight: bold\">Select</label>\r\n        </div>\r\n        <div class=\"col-4\">\r\n          <label style=\"font-weight: bold\">Dedicated</label>\r\n        </div>\r\n      </div>\r\n      <div *ngFor=\"let key of responsibilityKeys\" class=\"row\" style=\"margin-bottom: 10px;\">\r\n        <div class=\"col-5\" style=\"font-weight: bold\">{{ key.manageKey.replace('manage', '') }}</div>\r\n        <div class=\"col-3\">\r\n          <input type=\"checkbox\" [(ngModel)]=\"responsibilities[key.manageKey]\" (change)=\"handleToggleSwitch(key.manageKey)\">\r\n        </div>\r\n        <div class=\"col-4\">\r\n          <input type=\"checkbox\" [(ngModel)]=\"responsibilities[key.dedicateKey]\" (change)=\"handleToggleSwitch(key.dedicateKey)\" [disabled]=\"!responsibilities[key.manageKey]\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n      <button class=\"btn-apply-settings\" (click)=\"handleSave()\">Save</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#e7caca80;z-index:999;display:flex;justify-content:center;align-items:center}.modal-content{background-color:#83c0e9;border-radius:10px;padding:10px;width:400px;max-height:65%;overflow-x:hidden;overflow-y:auto}.modal-header{display:flex;justify-content:space-between;align-items:center}.modal-title{font-size:1.25rem;font-weight:700}.btn-close-settings{cursor:pointer}.hr{margin:10px 0}.form-group{margin-bottom:15px}.modal-footer{display:flex;justify-content:flex-end}.btn-apply-settings{background-color:#007bff;color:#fff;border:none;padding:10px 20px;border-radius:5px;cursor:pointer}.btn-apply-settings:hover{background-color:#0056b3}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i3.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i4.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i4.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i4.CheckboxControlValueAccessor, selector: "input[type=checkbox][formControlName],input[type=checkbox][formControl],input[type=checkbox][ngModel]" }, { kind: "directive", type: i4.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i4.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CoHostModal, decorators: [{
            type: Component,
            args: [{ selector: 'app-co-host-modal', standalone: true, imports: [CommonModule, FontAwesomeModule, FormsModule], template: "<!-- co-host-modal.component.html -->\r\n<div [ngStyle]=\"modalContainerStyle()\">\r\n  <div [ngStyle]=\"modalContentStyle()\">\r\n    <div class=\"modal-header\">\r\n      <div class=\"modal-title\">Manage Co-Host</div>\r\n      <div class=\"btn-close-settings\" (click)=\"handleClose()\">\r\n        <fa-icon [icon]=\"faTimes\" class=\"icon\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr class=\"hr\" />\r\n    <div class=\"modal-body\">\r\n      <div class=\"form-group\">\r\n        <label class=\"font-weight-bold\">Current Co-host:</label>\r\n        <input class=\"form-control\" [value]=\"currentCohost\" readonly />\r\n      </div>\r\n      <div class=\"form-group\">\r\n        <label class=\"font-weight-bold\">Select New Co-host:</label>\r\n        <select class=\"form-control\" [(ngModel)]=\"selectedCohost\">\r\n          <option value=\"\">Select a participant</option>\r\n          <option *ngFor=\"let participant of filteredParticipants\" [value]=\"participant.name\">\r\n            {{ participant.name }}\r\n          </option>\r\n        </select>\r\n      </div>\r\n      <div class=\"row\">\r\n        <div class=\"col-5\">\r\n          <label style=\"font-weight: bold\">Responsibility</label>\r\n        </div>\r\n        <div class=\"col-3\">\r\n          <label style=\"font-weight: bold\">Select</label>\r\n        </div>\r\n        <div class=\"col-4\">\r\n          <label style=\"font-weight: bold\">Dedicated</label>\r\n        </div>\r\n      </div>\r\n      <div *ngFor=\"let key of responsibilityKeys\" class=\"row\" style=\"margin-bottom: 10px;\">\r\n        <div class=\"col-5\" style=\"font-weight: bold\">{{ key.manageKey.replace('manage', '') }}</div>\r\n        <div class=\"col-3\">\r\n          <input type=\"checkbox\" [(ngModel)]=\"responsibilities[key.manageKey]\" (change)=\"handleToggleSwitch(key.manageKey)\">\r\n        </div>\r\n        <div class=\"col-4\">\r\n          <input type=\"checkbox\" [(ngModel)]=\"responsibilities[key.dedicateKey]\" (change)=\"handleToggleSwitch(key.dedicateKey)\" [disabled]=\"!responsibilities[key.manageKey]\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n      <button class=\"btn-apply-settings\" (click)=\"handleSave()\">Save</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#e7caca80;z-index:999;display:flex;justify-content:center;align-items:center}.modal-content{background-color:#83c0e9;border-radius:10px;padding:10px;width:400px;max-height:65%;overflow-x:hidden;overflow-y:auto}.modal-header{display:flex;justify-content:space-between;align-items:center}.modal-title{font-size:1.25rem;font-weight:700}.btn-close-settings{cursor:pointer}.hr{margin:10px 0}.form-group{margin-bottom:15px}.modal-footer{display:flex;justify-content:flex-end}.btn-apply-settings{background-color:#007bff;color:#fff;border:none;padding:10px 20px;border-radius:5px;cursor:pointer}.btn-apply-settings:hover{background-color:#0056b3}\n"] }]
        }], ctorParameters: () => [{ type: i1.ModifyCoHostSettings }], propDecorators: { isCoHostModalVisible: [{
                type: Input
            }], currentCohost: [{
                type: Input
            }], participants: [{
                type: Input
            }], coHostResponsibility: [{
                type: Input
            }], position: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], roomName: [{
                type: Input
            }], showAlert: [{
                type: Input
            }], updateCoHostResponsibility: [{
                type: Input
            }], updateCoHost: [{
                type: Input
            }], updateIsCoHostModalVisible: [{
                type: Input
            }], socket: [{
                type: Input
            }], onCoHostClose: [{
                type: Input
            }], onModifyCoHost: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY28taG9zdC1tb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9jby1ob3N0LWNvbXBvbmVudHMvY28taG9zdC1tb2RhbC9jby1ob3N0LW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2NvLWhvc3QtY29tcG9uZW50cy9jby1ob3N0LW1vZGFsL2NvLWhvc3QtbW9kYWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseURBQXlEO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBcUM3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTZESTtBQUNKLE1BQU0sT0FBTyxXQUFXO0lBNkJGO0lBNUJYLG9CQUFvQixHQUFHLEtBQUssQ0FBQztJQUM3QixhQUFhLEdBQUcsV0FBVyxDQUFDO0lBQzVCLFlBQVksR0FBa0IsRUFBRSxDQUFDO0lBQ2pDLG9CQUFvQixHQUEyQixFQUFFLENBQUM7SUFDbEQsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUN0QixlQUFlLEdBQUcsU0FBUyxDQUFDO0lBQzVCLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDZCxTQUFTLEdB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QixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csMEJBQTBCO3NCQUFsQyxLQUFLO2dCQUVHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csMEJBQTBCO3NCQUFsQyxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFFTixhQUFhO3NCQURaLEtBQUs7Z0JBR04sY0FBYztzQkFEYixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWVtcHR5LWZ1bmN0aW9uICovXG5pbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XG5pbXBvcnQgeyBmYVRpbWVzIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7IE1vZGlmeUNvSG9zdFNldHRpbmdzIH0gZnJvbSAnLi4vLi4vLi4vbWV0aG9kcy9jby1ob3N0LW1ldGhvZHMvbW9kaWZ5LWNvLWhvc3Qtc2V0dGluZ3Muc2VydmljZSc7XG5pbXBvcnQge1xuICBQYXJ0aWNpcGFudCxcbiAgQ29Ib3N0UmVzcG9uc2liaWxpdHksXG4gIE1vZGlmeUNvSG9zdFNldHRpbmdzT3B0aW9ucyxcbiAgU2hvd0FsZXJ0LFxufSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29Ib3N0TW9kYWxPcHRpb25zIHtcbiAgaXNDb0hvc3RNb2RhbFZpc2libGU6IGJvb2xlYW47XG4gIGN1cnJlbnRDb2hvc3Q/OiBzdHJpbmc7XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IENvSG9zdFJlc3BvbnNpYmlsaXR5W107XG4gIHBvc2l0aW9uPzogc3RyaW5nO1xuICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHk6IChjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXSkgPT4gdm9pZDtcbiAgdXBkYXRlQ29Ib3N0OiAoY29Ib3N0OiBzdHJpbmcpID0+IHZvaWQ7XG4gIHVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlOiAoaXNDb0hvc3RNb2RhbFZpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHNvY2tldDogU29ja2V0O1xuICBvbkNvSG9zdENsb3NlOiAoKSA9PiB2b2lkO1xuICBvbk1vZGlmeUV2ZW50U2V0dGluZ3M/OiAoc2V0dGluZ3M6IE1vZGlmeUNvSG9zdFNldHRpbmdzT3B0aW9ucykgPT4gdm9pZDtcbn1cblxuZXhwb3J0IHR5cGUgQ29Ib3N0TW9kYWxUeXBlID0gKG9wdGlvbnM6IENvSG9zdE1vZGFsT3B0aW9ucykgPT4gSFRNTEVsZW1lbnQ7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1jby1ob3N0LW1vZGFsJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGUsIEZvcm1zTW9kdWxlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvLWhvc3QtbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jby1ob3N0LW1vZGFsLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5cbi8qKlxuICogQ29Ib3N0TW9kYWwgY29tcG9uZW50IGFsbG93cyBtYW5hZ2luZyBjby1ob3N0IHNldHRpbmdzIGZvciBhbiBldmVudC5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLWNvLWhvc3QtbW9kYWxcbiAqIEBpbnB1dHNcbiAqIC0gYGlzQ29Ib3N0TW9kYWxWaXNpYmxlYCAoYm9vbGVhbik6IEEgYm9vbGVhbiB2YWx1ZSB0aGF0IGRldGVybWluZXMgd2hldGhlciB0aGUgbW9kYWwgaXMgdmlzaWJsZS4gRGVmYXVsdCBpcyBmYWxzZS5cbiAqIC0gYGN1cnJlbnRDb2hvc3RgIChzdHJpbmcpOiBUaGUgY3VycmVudCBjby1ob3N0IGZvciB0aGUgZXZlbnQuIERlZmF1bHQgaXMgJ05vIGNvSG9zdCcuXG4gKiAtIGBwYXJ0aWNpcGFudHNgIChQYXJ0aWNpcGFudFtdKTogQW4gYXJyYXkgb2YgcGFydGljaXBhbnRzIGluIHRoZSBldmVudC5cbiAqIC0gYGNvSG9zdFJlc3BvbnNpYmlsaXR5YCAoQ29Ib3N0UmVzcG9uc2liaWxpdHlbXSk6IEFuIGFycmF5IG9mIGNvLWhvc3QgcmVzcG9uc2liaWxpdGllcy5cbiAqIC0gYHBvc2l0aW9uYCAoc3RyaW5nKTogVGhlIHBvc2l0aW9uIG9mIHRoZSBtb2RhbC4gRGVmYXVsdCBpcyAndG9wUmlnaHQnLlxuICogLSBgYmFja2dyb3VuZENvbG9yYCAoc3RyaW5nKTogVGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIG1vZGFsLiBEZWZhdWx0IGlzICcjODNjMGU5Jy5cbiAqIC0gYHJvb21OYW1lYCAoc3RyaW5nKTogVGhlIG5hbWUgb2YgdGhlIHJvb20uXG4gKiAtIGBzaG93QWxlcnRgIChTaG93QWxlcnQpOiBBIGZ1bmN0aW9uIHRvIHNob3cgYWxlcnRzLlxuICpcbiAqIEBvdXRwdXRzXG4gKiAtIGB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eWAgKGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdKTogQSBmdW5jdGlvbiB0byB1cGRhdGUgY28taG9zdCByZXNwb25zaWJpbGl0aWVzLlxuICogLSBgdXBkYXRlQ29Ib3N0YCAoY29Ib3N0OiBzdHJpbmcpOiBBIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgY28taG9zdC5cbiAqIC0gYHVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlYCAoaXNDb0hvc3RNb2RhbFZpc2libGU6IGJvb2xlYW4pOiBBIGZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgbW9kYWwuXG4gKiAtIGBzb2NrZXRgIChTb2NrZXQpOiBUaGUgc29ja2V0IG9iamVjdC5cbiAqXG4gKiBAbWV0aG9kc1xuICogLSBgbmdPbkluaXQoKWA6IExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIHRoZSBjb21wb25lbnQgaXMgaW5pdGlhbGl6ZWQuIEl0IHNldHMgdGhlIGRlZmF1bHQgdmFsdWUgZm9yIGBvbk1vZGlmeUNvSG9zdGAgaWYgbm90IHByb3ZpZGVkLlxuICogLSBgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcylgOiBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIGFueSBkYXRhLWJvdW5kIHByb3BlcnR5IG9mIHRoZSBjb21wb25lbnQgY2hhbmdlcy4gSXQgaW5pdGlhbGl6ZXMgdGhlIHJlc3BvbnNpYmlsaXRpZXMgYW5kIGNhbGN1bGF0ZXMgdGhlIG1vZGFsIHdpZHRoLlxuICogLSBgaW5pdGlhbGl6ZVJlc3BvbnNpYmlsaXRpZXMoKWA6IEluaXRpYWxpemVzIHRoZSByZXNwb25zaWJpbGl0aWVzLlxuICogLSBgZ2V0IGZpbHRlcmVkUGFydGljaXBhbnRzKClgOiBSZXR1cm5zIHRoZSBmaWx0ZXJlZCBwYXJ0aWNpcGFudHMuXG4gKiAtIGBoYW5kbGVUb2dnbGVTd2l0Y2goa2V5OiBzdHJpbmcpYDogSGFuZGxlcyB0aGUgdG9nZ2xlIHN3aXRjaCBmb3IgdGhlIGdpdmVuIGtleS5cbiAqIC0gYGhhbmRsZVNhdmUoKWA6IEhhbmRsZXMgdGhlIHNhdmUgYWN0aW9uLlxuICogLSBgaGFuZGxlQ2xvc2UoKWA6IEhhbmRsZXMgdGhlIGNsb3NlIGFjdGlvbi5cbiAqIC0gYGNhbGN1bGF0ZU1vZGFsV2lkdGgoKWA6IENhbGN1bGF0ZXMgdGhlIG1vZGFsIHdpZHRoLlxuICogLSBgbW9kYWxDb250YWluZXJTdHlsZSgpYDogUmV0dXJucyB0aGUgbW9kYWwgY29udGFpbmVyIHN0eWxlLlxuICogLSBgbW9kYWxDb250ZW50U3R5bGUoKWA6IFJldHVybnMgdGhlIG1vZGFsIGNvbnRlbnQgc3R5bGUuXG4gKlxuICogQGRlcGVuZGVuY2llc1xuICogLSBgQ29tbW9uTW9kdWxlYDogQW5ndWxhcidzIGNvbW1vbiBtb2R1bGUgaXMgaW1wb3J0ZWQgZm9yIGNvbW1vbiBkaXJlY3RpdmVzLlxuICogLSBgRm9udEF3ZXNvbWVNb2R1bGVgOiBBbmd1bGFyJ3MgZm9udCBhd2Vzb21lIG1vZHVsZSBpcyBpbXBvcnRlZCBmb3IgaWNvbnMuXG4gKiAtIGBGb3Jtc01vZHVsZWA6IEFuZ3VsYXIncyBmb3JtcyBtb2R1bGUgaXMgaW1wb3J0ZWQgZm9yIGZvcm0tcmVsYXRlZCBkaXJlY3RpdmVzLlxuICogLSBgTW9kaWZ5Q29Ib3N0U2V0dGluZ3NgOiBUaGUgTW9kaWZ5Q29Ib3N0U2V0dGluZ3Mgc2VydmljZSBpcyB1c2VkIHRvIG1vZGlmeSBjby1ob3N0IHNldHRpbmdzLlxuICpcbiAqIEBzdHlsZXNcbiAqIC0gYC5jb250YWluZXJgOiBUaGUgY29udGFpbmVyIHN0eWxlLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLWNvLWhvc3QtbW9kYWxcbiAqICBbaXNDb0hvc3RNb2RhbFZpc2libGVdPVwiaXNDb0hvc3RNb2RhbFZpc2libGVcIlxuICogW2N1cnJlbnRDb2hvc3RdPVwiY3VycmVudENvaG9zdFwiXG4gKiBbcGFydGljaXBhbnRzXT1cInBhcnRpY2lwYW50c1wiXG4gKiBbY29Ib3N0UmVzcG9uc2liaWxpdHldPVwiY29Ib3N0UmVzcG9uc2liaWxpdHlcIlxuICogW3Bvc2l0aW9uXT1cInBvc2l0aW9uXCJcbiAqIFtiYWNrZ3JvdW5kQ29sb3JdPVwiYmFja2dyb3VuZENvbG9yXCJcbiAqIFtyb29tTmFtZV09XCJyb29tTmFtZVwiXG4gKiBbc2hvd0FsZXJ0XT1cInNob3dBbGVydFwiXG4gKiBbdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHldPVwidXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHlcIlxuICogW3VwZGF0ZUNvSG9zdF09XCJ1cGRhdGVDb0hvc3RcIlxuICogW3VwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlXT1cInVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlXCJcbiAqIFtzb2NrZXRdPVwic29ja2V0XCJcbiAqIFtvbkNvSG9zdENsb3NlXT1cIm9uQ29Ib3N0Q2xvc2VcIlxuICogW29uTW9kaWZ5Q29Ib3N0XT1cIm9uTW9kaWZ5Q29Ib3N0XCI+XG4gKiA8L2FwcC1jby1ob3N0LW1vZGFsPlxuICogYGBgXG4gKlxuICoqL1xuZXhwb3J0IGNsYXNzIENvSG9zdE1vZGFsIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKSBpc0NvSG9zdE1vZGFsVmlzaWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBjdXJyZW50Q29ob3N0ID0gJ05vIGNvSG9zdCc7XG4gIEBJbnB1dCgpIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXSA9IFtdO1xuICBASW5wdXQoKSBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXSA9IFtdO1xuICBASW5wdXQoKSBwb3NpdGlvbiA9ICd0b3BSaWdodCc7XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICcjODNjMGU5JztcbiAgQElucHV0KCkgcm9vbU5hbWUgPSAnJztcbiAgQElucHV0KCkgc2hvd0FsZXJ0OiBTaG93QWxlcnQgPSAoKSA9PiB7fTtcbiAgQElucHV0KCkgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHk6IChjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXSkgPT4gdm9pZCA9XG4gICAgKCkgPT4ge307XG4gIEBJbnB1dCgpIHVwZGF0ZUNvSG9zdDogKGNvSG9zdDogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIEBJbnB1dCgpIHVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlOiAoaXNDb0hvc3RNb2RhbFZpc2libGU6IGJvb2xlYW4pID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgQElucHV0KCkgc29ja2V0OiBTb2NrZXQgPSB7fSBhcyBTb2NrZXQ7XG4gIEBJbnB1dCgpXG4gIG9uQ29Ib3N0Q2xvc2UhOiAoKSA9PiB2b2lkO1xuICBASW5wdXQoKVxuICBvbk1vZGlmeUNvSG9zdCE6IChzZXR0aW5nczogTW9kaWZ5Q29Ib3N0U2V0dGluZ3NPcHRpb25zKSA9PiB2b2lkO1xuXG4gIGZhVGltZXMgPSBmYVRpbWVzO1xuXG4gIHNlbGVjdGVkQ29ob3N0OiBzdHJpbmcgPSB0aGlzLmN1cnJlbnRDb2hvc3Q7XG4gIENvSG9zdFJlc3BvbnNpYmlsaXR5Q29weTogYW55W10gPSBbXTtcbiAgQ29Ib3N0UmVzcG9uc2liaWxpdHlDb3B5QWx0OiBhbnlbXSA9IFtdO1xuICByZXNwb25zaWJpbGl0aWVzOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuICByZXNwb25zaWJpbGl0eUtleXM6IHsgbWFuYWdlS2V5OiBzdHJpbmc7IGRlZGljYXRlS2V5OiBzdHJpbmcgfVtdID0gW107XG5cbiAgbW9kYWxXaWR0aCE6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGlmeUNvSG9zdFNldHRpbmdzU2VydmljZTogTW9kaWZ5Q29Ib3N0U2V0dGluZ3MpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gU2V0IGRlZmF1bHQgdmFsdWUgZm9yIG9uTW9kaWZ5Q29Ib3N0IGlmIG5vdCBwcm92aWRlZFxuICAgIGlmICghdGhpcy5vbk1vZGlmeUNvSG9zdCkge1xuICAgICAgdGhpcy5vbk1vZGlmeUNvSG9zdCA9IChwYXJhbXM6IGFueSkgPT5cbiAgICAgICAgdGhpcy5tb2RpZnlDb0hvc3RTZXR0aW5nc1NlcnZpY2UubW9kaWZ5Q29Ib3N0U2V0dGluZ3MocGFyYW1zKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ2lzQ29Ib3N0TW9kYWxWaXNpYmxlJ10gJiYgdGhpcy5pc0NvSG9zdE1vZGFsVmlzaWJsZSkge1xuICAgICAgdGhpcy5pbml0aWFsaXplUmVzcG9uc2liaWxpdGllcygpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVNb2RhbFdpZHRoKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhbGl6ZVJlc3BvbnNpYmlsaXRpZXMoKSB7XG4gICAgdGhpcy5Db0hvc3RSZXNwb25zaWJpbGl0eUNvcHkgPSBbLi4udGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eV07XG4gICAgdGhpcy5Db0hvc3RSZXNwb25zaWJpbGl0eUNvcHlBbHQgPSBbLi4udGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eV07XG4gICAgdGhpcy5yZXNwb25zaWJpbGl0eUtleXMgPSB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgbWFuYWdlS2V5ID0gYG1hbmFnZSR7aXRlbS5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaXRlbS5uYW1lLnNsaWNlKDEpfWA7XG4gICAgICBjb25zdCBkZWRpY2F0ZUtleSA9IGBkZWRpY2F0ZVRvTWFuYWdlJHtcbiAgICAgICAgaXRlbS5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaXRlbS5uYW1lLnNsaWNlKDEpXG4gICAgICB9YDtcbiAgICAgIHJldHVybiB7IG1hbmFnZUtleSwgZGVkaWNhdGVLZXkgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGluaXRpYWxSZXNwb25zaWJpbGl0aWVzID0gdGhpcy5Db0hvc3RSZXNwb25zaWJpbGl0eUNvcHlBbHQucmVkdWNlKFxuICAgICAgKGFjYzogYW55LCBpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3Qgc3RyMiA9IGl0ZW0ubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGl0ZW0ubmFtZS5zbGljZSgxKTtcbiAgICAgICAgYWNjW2BtYW5hZ2Uke3N0cjJ9YF0gPSBpdGVtLnZhbHVlO1xuICAgICAgICBhY2NbYGRlZGljYXRlVG9NYW5hZ2Uke3N0cjJ9YF0gPSBpdGVtLmRlZGljYXRlZDtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sXG4gICAgICB7fSxcbiAgICApO1xuXG4gICAgdGhpcy5yZXNwb25zaWJpbGl0aWVzID0gaW5pdGlhbFJlc3BvbnNpYmlsaXRpZXM7XG4gIH1cblxuICBnZXQgZmlsdGVyZWRQYXJ0aWNpcGFudHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFydGljaXBhbnRzLmZpbHRlcihcbiAgICAgIChwYXJ0aWNpcGFudCkgPT4gcGFydGljaXBhbnQubmFtZSAhPT0gdGhpcy5jdXJyZW50Q29ob3N0ICYmIHBhcnRpY2lwYW50LmlzbGV2ZWwgIT09ICcyJyxcbiAgICApO1xuICB9XG5cbiAgaGFuZGxlVG9nZ2xlU3dpdGNoKGtleTogc3RyaW5nKSB7XG4gICAgaWYgKGtleS5zdGFydHNXaXRoKCdkZWRpY2F0ZVRvJykpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNpYmlsaXR5TmFtZSA9IGtleS5yZXBsYWNlKCdkZWRpY2F0ZVRvTWFuYWdlJywgJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBtYW5hZ2VLZXkgPSBgbWFuYWdlJHtcbiAgICAgICAgcmVzcG9uc2liaWxpdHlOYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmVzcG9uc2liaWxpdHlOYW1lLnNsaWNlKDEpXG4gICAgICB9YDtcblxuICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlICdkZWRpY2F0ZWQnIGNoZWNrYm94IGNhbiBvbmx5IGJlIHRvZ2dsZWQgaWYgdGhlIGNvcnJlc3BvbmRpbmcgJ3Jlc3BvbnNpYmlsaXR5JyBpcyBjaGVja2VkXG4gICAgICBpZiAodGhpcy5yZXNwb25zaWJpbGl0aWVzW21hbmFnZUtleV0pIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2liaWxpdHlEZWRpY2F0ZWQgPSB0aGlzLkNvSG9zdFJlc3BvbnNpYmlsaXR5Q29weS5maW5kKFxuICAgICAgICAgIChpdGVtKSA9PiBpdGVtLm5hbWUgPT09IHJlc3BvbnNpYmlsaXR5TmFtZSxcbiAgICAgICAgKS5kZWRpY2F0ZWQ7XG4gICAgICAgIHRoaXMucmVzcG9uc2liaWxpdGllc1trZXldID0gIXJlc3BvbnNpYmlsaXR5RGVkaWNhdGVkO1xuICAgICAgICB0aGlzLkNvSG9zdFJlc3BvbnNpYmlsaXR5Q29weS5maW5kKChpdGVtKSA9PiBpdGVtLm5hbWUgPT09IHJlc3BvbnNpYmlsaXR5TmFtZSkuZGVkaWNhdGVkID1cbiAgICAgICAgICAhcmVzcG9uc2liaWxpdHlEZWRpY2F0ZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChrZXkuc3RhcnRzV2l0aCgnbWFuYWdlJykpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNpYmlsaXR5TmFtZSA9IGtleS5yZXBsYWNlKCdtYW5hZ2UnLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNpYmlsaXR5VmFsdWUgPSB0aGlzLkNvSG9zdFJlc3BvbnNpYmlsaXR5Q29weS5maW5kKFxuICAgICAgICAoaXRlbSkgPT4gaXRlbS5uYW1lID09PSByZXNwb25zaWJpbGl0eU5hbWUsXG4gICAgICApLnZhbHVlO1xuXG4gICAgICAvLyBUb2dnbGUgdGhlICdyZXNwb25zaWJpbGl0eScgY2hlY2tib3ggYW5kIGVuc3VyZSB0aGUgY29ycmVzcG9uZGluZyAnZGVkaWNhdGVkJyBjaGVja2JveCBpcyBhbHNvIGRpc2FibGVkIGlmIHVuY2hlY2tlZFxuICAgICAgdGhpcy5yZXNwb25zaWJpbGl0aWVzW2tleV0gPSAhcmVzcG9uc2liaWxpdHlWYWx1ZTtcbiAgICAgIHRoaXMuQ29Ib3N0UmVzcG9uc2liaWxpdHlDb3B5LmZpbmQoKGl0ZW0pID0+IGl0ZW0ubmFtZSA9PT0gcmVzcG9uc2liaWxpdHlOYW1lKS52YWx1ZSA9XG4gICAgICAgICFyZXNwb25zaWJpbGl0eVZhbHVlO1xuXG4gICAgICBpZiAoIXRoaXMucmVzcG9uc2liaWxpdGllc1trZXldKSB7XG4gICAgICAgIGNvbnN0IGRlZGljYXRlS2V5ID0gYGRlZGljYXRlVG9NYW5hZ2Uke1xuICAgICAgICAgIHJlc3BvbnNpYmlsaXR5TmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHJlc3BvbnNpYmlsaXR5TmFtZS5zbGljZSgxKVxuICAgICAgICB9YDtcbiAgICAgICAgdGhpcy5yZXNwb25zaWJpbGl0aWVzW2RlZGljYXRlS2V5XSA9IGZhbHNlO1xuICAgICAgICB0aGlzLkNvSG9zdFJlc3BvbnNpYmlsaXR5Q29weS5maW5kKChpdGVtKSA9PiBpdGVtLm5hbWUgPT09IHJlc3BvbnNpYmlsaXR5TmFtZSkuZGVkaWNhdGVkID1cbiAgICAgICAgICBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVTYXZlKCkge1xuICAgIGNvbnNvbGUubG9nKCdoYW5kbGVTYXZlJyk7XG5cbiAgICB0aGlzLm9uTW9kaWZ5Q29Ib3N0KHtcbiAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLFxuICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydCxcbiAgICAgIHNlbGVjdGVkUGFydGljaXBhbnQ6IHRoaXMuc2VsZWN0ZWRDb2hvc3QsXG4gICAgICBjb0hvc3Q6IHRoaXMuY3VycmVudENvaG9zdCxcbiAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiB0aGlzLkNvSG9zdFJlc3BvbnNpYmlsaXR5Q29weSxcbiAgICAgIHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5OiB0aGlzLnVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgICAgdXBkYXRlQ29Ib3N0OiB0aGlzLnVwZGF0ZUNvSG9zdCxcbiAgICAgIHVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlOiB0aGlzLnVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlLFxuICAgICAgc29ja2V0OiB0aGlzLnNvY2tldCxcbiAgICB9KTtcbiAgfVxuXG4gIGhhbmRsZUNsb3NlKCkge1xuICAgIHRoaXMub25Db0hvc3RDbG9zZSgpO1xuICB9XG5cbiAgY2FsY3VsYXRlTW9kYWxXaWR0aCgpIHtcbiAgICBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBtb2RhbFdpZHRoID0gMC44ICogc2NyZWVuV2lkdGg7XG4gICAgaWYgKG1vZGFsV2lkdGggPiA0MDApIHtcbiAgICAgIG1vZGFsV2lkdGggPSA0MDA7XG4gICAgfVxuICAgIHRoaXMubW9kYWxXaWR0aCA9IG1vZGFsV2lkdGg7XG4gIH1cblxuICBtb2RhbENvbnRhaW5lclN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkaXNwbGF5OiB0aGlzLmlzQ29Ib3N0TW9kYWxWaXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgdG9wOiAnMCcsXG4gICAgICBsZWZ0OiAnMCcsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNSknLFxuICAgICAgekluZGV4OiAnOTk5JyxcbiAgICB9O1xuICB9XG5cbiAgbW9kYWxDb250ZW50U3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxMHB4JyxcbiAgICAgIHBhZGRpbmc6ICcxMHB4JyxcbiAgICAgIHdpZHRoOiBgJHt0aGlzLm1vZGFsV2lkdGh9cHhgLFxuICAgICAgbWF4SGVpZ2h0OiAnNjUlJyxcbiAgICAgIG92ZXJmbG93WDogJ2hpZGRlbicsXG4gICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgdG9wOiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCd0b3AnKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICAgIGJvdHRvbTogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnYm90dG9tJykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICBsZWZ0OiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdMZWZ0JykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICByaWdodDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnUmlnaHQnKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICB9O1xuICB9XG59XG4iLCI8IS0tIGNvLWhvc3QtbW9kYWwuY29tcG9uZW50Lmh0bWwgLS0+XHJcbjxkaXYgW25nU3R5bGVdPVwibW9kYWxDb250YWluZXJTdHlsZSgpXCI+XHJcbiAgPGRpdiBbbmdTdHlsZV09XCJtb2RhbENvbnRlbnRTdHlsZSgpXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJtb2RhbC10aXRsZVwiPk1hbmFnZSBDby1Ib3N0PC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJidG4tY2xvc2Utc2V0dGluZ3NcIiAoY2xpY2spPVwiaGFuZGxlQ2xvc2UoKVwiPlxyXG4gICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhVGltZXNcIiBjbGFzcz1cImljb25cIj48L2ZhLWljb24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8aHIgY2xhc3M9XCJoclwiIC8+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImZvbnQtd2VpZ2h0LWJvbGRcIj5DdXJyZW50IENvLWhvc3Q6PC9sYWJlbD5cclxuICAgICAgICA8aW5wdXQgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBbdmFsdWVdPVwiY3VycmVudENvaG9zdFwiIHJlYWRvbmx5IC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICAgIDxsYWJlbCBjbGFzcz1cImZvbnQtd2VpZ2h0LWJvbGRcIj5TZWxlY3QgTmV3IENvLWhvc3Q6PC9sYWJlbD5cclxuICAgICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgWyhuZ01vZGVsKV09XCJzZWxlY3RlZENvaG9zdFwiPlxyXG4gICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPlNlbGVjdCBhIHBhcnRpY2lwYW50PC9vcHRpb24+XHJcbiAgICAgICAgICA8b3B0aW9uICpuZ0Zvcj1cImxldCBwYXJ0aWNpcGFudCBvZiBmaWx0ZXJlZFBhcnRpY2lwYW50c1wiIFt2YWx1ZV09XCJwYXJ0aWNpcGFudC5uYW1lXCI+XHJcbiAgICAgICAgICAgIHt7IHBhcnRpY2lwYW50Lm5hbWUgfX1cclxuICAgICAgICAgIDwvb3B0aW9uPlxyXG4gICAgICAgIDwvc2VsZWN0PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cInJvd1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNVwiPlxyXG4gICAgICAgICAgPGxhYmVsIHN0eWxlPVwiZm9udC13ZWlnaHQ6IGJvbGRcIj5SZXNwb25zaWJpbGl0eTwvbGFiZWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICA8bGFiZWwgc3R5bGU9XCJmb250LXdlaWdodDogYm9sZFwiPlNlbGVjdDwvbGFiZWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC00XCI+XHJcbiAgICAgICAgICA8bGFiZWwgc3R5bGU9XCJmb250LXdlaWdodDogYm9sZFwiPkRlZGljYXRlZDwvbGFiZWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2ICpuZ0Zvcj1cImxldCBrZXkgb2YgcmVzcG9uc2liaWxpdHlLZXlzXCIgY2xhc3M9XCJyb3dcIiBzdHlsZT1cIm1hcmdpbi1ib3R0b206IDEwcHg7XCI+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC01XCIgc3R5bGU9XCJmb250LXdlaWdodDogYm9sZFwiPnt7IGtleS5tYW5hZ2VLZXkucmVwbGFjZSgnbWFuYWdlJywgJycpIH19PC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC0zXCI+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgWyhuZ01vZGVsKV09XCJyZXNwb25zaWJpbGl0aWVzW2tleS5tYW5hZ2VLZXldXCIgKGNoYW5nZSk9XCJoYW5kbGVUb2dnbGVTd2l0Y2goa2V5Lm1hbmFnZUtleSlcIj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTRcIj5cclxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBbKG5nTW9kZWwpXT1cInJlc3BvbnNpYmlsaXRpZXNba2V5LmRlZGljYXRlS2V5XVwiIChjaGFuZ2UpPVwiaGFuZGxlVG9nZ2xlU3dpdGNoKGtleS5kZWRpY2F0ZUtleSlcIiBbZGlzYWJsZWRdPVwiIXJlc3BvbnNpYmlsaXRpZXNba2V5Lm1hbmFnZUtleV1cIj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1hcHBseS1zZXR0aW5nc1wiIChjbGljayk9XCJoYW5kbGVTYXZlKClcIj5TYXZlPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==