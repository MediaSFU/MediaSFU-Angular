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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY28taG9zdC1tb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9jby1ob3N0LWNvbXBvbmVudHMvY28taG9zdC1tb2RhbC9jby1ob3N0LW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2NvLWhvc3QtY29tcG9uZW50cy9jby1ob3N0LW1vZGFsL2NvLWhvc3QtbW9kYWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEseURBQXlEO0FBQ3pELE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDNUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBNkI3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTZESTtBQVdKLE1BQU0sT0FBTyxXQUFXO0lBNkJGO0lBNUJYLG9CQUFvQixHQUFHLEtBQUssQ0FBQztJQUM3QixhQUFhLEdBQUcsV0FBVyxDQUFDO0lBQzVCLFlBQVksR0FBa0IsRUFBRSxDQUFDO0lBQ2pDLG9CQUFvQixHQUEyQixFQUFFLENBQUM7SUFDbEQsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUN0QixlQUFlLEdBQUcsU0FBUyxDQUFDO0lBQzVCLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDZCxTQUFTLEdB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c0JBQWxDLEtBQUs7Z0JBRUcsWUFBWTtzQkFBcEIsS0FBSztnQkFDRywwQkFBMEI7c0JBQWxDLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUVOLGFBQWE7c0JBRFosS0FBSztnQkFHTixjQUFjO3NCQURiLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IGZhVGltZXMgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgTW9kaWZ5Q29Ib3N0U2V0dGluZ3MgfSBmcm9tICcuLi8uLi8uLi9tZXRob2RzL2NvLWhvc3QtbWV0aG9kcy9tb2RpZnktY28taG9zdC1zZXR0aW5ncy5zZXJ2aWNlJztcbmltcG9ydCB7XG4gIFBhcnRpY2lwYW50LFxuICBDb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgTW9kaWZ5Q29Ib3N0U2V0dGluZ3NPcHRpb25zLFxuICBTaG93QWxlcnQsXG59IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBDb0hvc3RNb2RhbE9wdGlvbnMge1xuICBpc0NvSG9zdE1vZGFsVmlzaWJsZTogYm9vbGVhbjtcbiAgY3VycmVudENvaG9zdD86IHN0cmluZztcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgcG9zaXRpb24/OiBzdHJpbmc7XG4gIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eTogKGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdKSA9PiB2b2lkO1xuICB1cGRhdGVDb0hvc3Q6IChjb0hvc3Q6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGU6IChpc0NvSG9zdE1vZGFsVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIG9uQ29Ib3N0Q2xvc2U6ICgpID0+IHZvaWQ7XG4gIG9uTW9kaWZ5RXZlbnRTZXR0aW5ncz86IChzZXR0aW5nczogTW9kaWZ5Q29Ib3N0U2V0dGluZ3NPcHRpb25zKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgdHlwZSBDb0hvc3RNb2RhbFR5cGUgPSAob3B0aW9uczogQ29Ib3N0TW9kYWxPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBDb0hvc3RNb2RhbCBjb21wb25lbnQgYWxsb3dzIG1hbmFnaW5nIGNvLWhvc3Qgc2V0dGluZ3MgZm9yIGFuIGV2ZW50LlxuICpcbiAqIEBzZWxlY3RvciBhcHAtY28taG9zdC1tb2RhbFxuICogQGlucHV0c1xuICogLSBgaXNDb0hvc3RNb2RhbFZpc2libGVgIChib29sZWFuKTogQSBib29sZWFuIHZhbHVlIHRoYXQgZGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBtb2RhbCBpcyB2aXNpYmxlLiBEZWZhdWx0IGlzIGZhbHNlLlxuICogLSBgY3VycmVudENvaG9zdGAgKHN0cmluZyk6IFRoZSBjdXJyZW50IGNvLWhvc3QgZm9yIHRoZSBldmVudC4gRGVmYXVsdCBpcyAnTm8gY29Ib3N0Jy5cbiAqIC0gYHBhcnRpY2lwYW50c2AgKFBhcnRpY2lwYW50W10pOiBBbiBhcnJheSBvZiBwYXJ0aWNpcGFudHMgaW4gdGhlIGV2ZW50LlxuICogLSBgY29Ib3N0UmVzcG9uc2liaWxpdHlgIChDb0hvc3RSZXNwb25zaWJpbGl0eVtdKTogQW4gYXJyYXkgb2YgY28taG9zdCByZXNwb25zaWJpbGl0aWVzLlxuICogLSBgcG9zaXRpb25gIChzdHJpbmcpOiBUaGUgcG9zaXRpb24gb2YgdGhlIG1vZGFsLiBEZWZhdWx0IGlzICd0b3BSaWdodCcuXG4gKiAtIGBiYWNrZ3JvdW5kQ29sb3JgIChzdHJpbmcpOiBUaGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgbW9kYWwuIERlZmF1bHQgaXMgJyM4M2MwZTknLlxuICogLSBgcm9vbU5hbWVgIChzdHJpbmcpOiBUaGUgbmFtZSBvZiB0aGUgcm9vbS5cbiAqIC0gYHNob3dBbGVydGAgKFNob3dBbGVydCk6IEEgZnVuY3Rpb24gdG8gc2hvdyBhbGVydHMuXG4gKlxuICogQG91dHB1dHNcbiAqIC0gYHVwZGF0ZUNvSG9zdFJlc3BvbnNpYmlsaXR5YCAoY29Ib3N0UmVzcG9uc2liaWxpdHk6IENvSG9zdFJlc3BvbnNpYmlsaXR5W10pOiBBIGZ1bmN0aW9uIHRvIHVwZGF0ZSBjby1ob3N0IHJlc3BvbnNpYmlsaXRpZXMuXG4gKiAtIGB1cGRhdGVDb0hvc3RgIChjb0hvc3Q6IHN0cmluZyk6IEEgZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBjby1ob3N0LlxuICogLSBgdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGVgIChpc0NvSG9zdE1vZGFsVmlzaWJsZTogYm9vbGVhbik6IEEgZnVuY3Rpb24gdG8gdXBkYXRlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBtb2RhbC5cbiAqIC0gYHNvY2tldGAgKFNvY2tldCk6IFRoZSBzb2NrZXQgb2JqZWN0LlxuICpcbiAqIEBtZXRob2RzXG4gKiAtIGBuZ09uSW5pdCgpYDogTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgdGhlIGNvbXBvbmVudCBpcyBpbml0aWFsaXplZC4gSXQgc2V0cyB0aGUgZGVmYXVsdCB2YWx1ZSBmb3IgYG9uTW9kaWZ5Q29Ib3N0YCBpZiBub3QgcHJvdmlkZWQuXG4gKiAtIGBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKWA6IExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgcHJvcGVydHkgb2YgdGhlIGNvbXBvbmVudCBjaGFuZ2VzLiBJdCBpbml0aWFsaXplcyB0aGUgcmVzcG9uc2liaWxpdGllcyBhbmQgY2FsY3VsYXRlcyB0aGUgbW9kYWwgd2lkdGguXG4gKiAtIGBpbml0aWFsaXplUmVzcG9uc2liaWxpdGllcygpYDogSW5pdGlhbGl6ZXMgdGhlIHJlc3BvbnNpYmlsaXRpZXMuXG4gKiAtIGBnZXQgZmlsdGVyZWRQYXJ0aWNpcGFudHMoKWA6IFJldHVybnMgdGhlIGZpbHRlcmVkIHBhcnRpY2lwYW50cy5cbiAqIC0gYGhhbmRsZVRvZ2dsZVN3aXRjaChrZXk6IHN0cmluZylgOiBIYW5kbGVzIHRoZSB0b2dnbGUgc3dpdGNoIGZvciB0aGUgZ2l2ZW4ga2V5LlxuICogLSBgaGFuZGxlU2F2ZSgpYDogSGFuZGxlcyB0aGUgc2F2ZSBhY3Rpb24uXG4gKiAtIGBoYW5kbGVDbG9zZSgpYDogSGFuZGxlcyB0aGUgY2xvc2UgYWN0aW9uLlxuICogLSBgY2FsY3VsYXRlTW9kYWxXaWR0aCgpYDogQ2FsY3VsYXRlcyB0aGUgbW9kYWwgd2lkdGguXG4gKiAtIGBtb2RhbENvbnRhaW5lclN0eWxlKClgOiBSZXR1cm5zIHRoZSBtb2RhbCBjb250YWluZXIgc3R5bGUuXG4gKiAtIGBtb2RhbENvbnRlbnRTdHlsZSgpYDogUmV0dXJucyB0aGUgbW9kYWwgY29udGVudCBzdHlsZS5cbiAqXG4gKiBAZGVwZW5kZW5jaWVzXG4gKiAtIGBDb21tb25Nb2R1bGVgOiBBbmd1bGFyJ3MgY29tbW9uIG1vZHVsZSBpcyBpbXBvcnRlZCBmb3IgY29tbW9uIGRpcmVjdGl2ZXMuXG4gKiAtIGBGb250QXdlc29tZU1vZHVsZWA6IEFuZ3VsYXIncyBmb250IGF3ZXNvbWUgbW9kdWxlIGlzIGltcG9ydGVkIGZvciBpY29ucy5cbiAqIC0gYEZvcm1zTW9kdWxlYDogQW5ndWxhcidzIGZvcm1zIG1vZHVsZSBpcyBpbXBvcnRlZCBmb3IgZm9ybS1yZWxhdGVkIGRpcmVjdGl2ZXMuXG4gKiAtIGBNb2RpZnlDb0hvc3RTZXR0aW5nc2A6IFRoZSBNb2RpZnlDb0hvc3RTZXR0aW5ncyBzZXJ2aWNlIGlzIHVzZWQgdG8gbW9kaWZ5IGNvLWhvc3Qgc2V0dGluZ3MuXG4gKlxuICogQHN0eWxlc1xuICogLSBgLmNvbnRhaW5lcmA6IFRoZSBjb250YWluZXIgc3R5bGUuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtY28taG9zdC1tb2RhbFxuICogIFtpc0NvSG9zdE1vZGFsVmlzaWJsZV09XCJpc0NvSG9zdE1vZGFsVmlzaWJsZVwiXG4gKiBbY3VycmVudENvaG9zdF09XCJjdXJyZW50Q29ob3N0XCJcbiAqIFtwYXJ0aWNpcGFudHNdPVwicGFydGljaXBhbnRzXCJcbiAqIFtjb0hvc3RSZXNwb25zaWJpbGl0eV09XCJjb0hvc3RSZXNwb25zaWJpbGl0eVwiXG4gKiBbcG9zaXRpb25dPVwicG9zaXRpb25cIlxuICogW2JhY2tncm91bmRDb2xvcl09XCJiYWNrZ3JvdW5kQ29sb3JcIlxuICogW3Jvb21OYW1lXT1cInJvb21OYW1lXCJcbiAqIFtzaG93QWxlcnRdPVwic2hvd0FsZXJ0XCJcbiAqIFt1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eV09XCJ1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eVwiXG4gKiBbdXBkYXRlQ29Ib3N0XT1cInVwZGF0ZUNvSG9zdFwiXG4gKiBbdXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGVdPVwidXBkYXRlSXNDb0hvc3RNb2RhbFZpc2libGVcIlxuICogW3NvY2tldF09XCJzb2NrZXRcIlxuICogW29uQ29Ib3N0Q2xvc2VdPVwib25Db0hvc3RDbG9zZVwiXG4gKiBbb25Nb2RpZnlDb0hvc3RdPVwib25Nb2RpZnlDb0hvc3RcIj5cbiAqIDwvYXBwLWNvLWhvc3QtbW9kYWw+XG4gKiBgYGBcbiAqXG4gKiovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1jby1ob3N0LW1vZGFsJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGUsIEZvcm1zTW9kdWxlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvLWhvc3QtbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jby1ob3N0LW1vZGFsLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5cblxuZXhwb3J0IGNsYXNzIENvSG9zdE1vZGFsIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKSBpc0NvSG9zdE1vZGFsVmlzaWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBjdXJyZW50Q29ob3N0ID0gJ05vIGNvSG9zdCc7XG4gIEBJbnB1dCgpIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXSA9IFtdO1xuICBASW5wdXQoKSBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXSA9IFtdO1xuICBASW5wdXQoKSBwb3NpdGlvbiA9ICd0b3BSaWdodCc7XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICcjODNjMGU5JztcbiAgQElucHV0KCkgcm9vbU5hbWUgPSAnJztcbiAgQElucHV0KCkgc2hvd0FsZXJ0OiBTaG93QWxlcnQgPSAoKSA9PiB7fTtcbiAgQElucHV0KCkgdXBkYXRlQ29Ib3N0UmVzcG9uc2liaWxpdHk6IChjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXSkgPT4gdm9pZCA9XG4gICAgKCkgPT4ge307XG4gIEBJbnB1dCgpIHVwZGF0ZUNvSG9zdDogKGNvSG9zdDogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIEBJbnB1dCgpIHVwZGF0ZUlzQ29Ib3N0TW9kYWxWaXNpYmxlOiAoaXNDb0hvc3RNb2RhbFZpc2libGU6IGJvb2xlYW4pID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgQElucHV0KCkgc29ja2V0OiBTb2NrZXQgPSB7fSBhcyBTb2NrZXQ7XG4gIEBJbnB1dCgpXG4gIG9uQ29Ib3N0Q2xvc2UhOiAoKSA9PiB2b2lkO1xuICBASW5wdXQoKVxuICBvbk1vZGlmeUNvSG9zdCE6IChzZXR0aW5nczogTW9kaWZ5Q29Ib3N0U2V0dGluZ3NPcHRpb25zKSA9PiB2b2lkO1xuXG4gIGZhVGltZXMgPSBmYVRpbWVzO1xuXG4gIHNlbGVjdGVkQ29ob3N0OiBzdHJpbmcgPSB0aGlzLmN1cnJlbnRDb2hvc3Q7XG4gIENvSG9zdFJlc3BvbnNpYmlsaXR5Q29weTogYW55W10gPSBbXTtcbiAgQ29Ib3N0UmVzcG9uc2liaWxpdHlDb3B5QWx0OiBhbnlbXSA9IFtdO1xuICByZXNwb25zaWJpbGl0aWVzOiB7IFtrZXk6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuICByZXNwb25zaWJpbGl0eUtleXM6IHsgbWFuYWdlS2V5OiBzdHJpbmc7IGRlZGljYXRlS2V5OiBzdHJpbmcgfVtdID0gW107XG5cbiAgbW9kYWxXaWR0aCE6IG51bWJlcjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIG1vZGlmeUNvSG9zdFNldHRpbmdzU2VydmljZTogTW9kaWZ5Q29Ib3N0U2V0dGluZ3MpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gU2V0IGRlZmF1bHQgdmFsdWUgZm9yIG9uTW9kaWZ5Q29Ib3N0IGlmIG5vdCBwcm92aWRlZFxuICAgIGlmICghdGhpcy5vbk1vZGlmeUNvSG9zdCkge1xuICAgICAgdGhpcy5vbk1vZGlmeUNvSG9zdCA9IChwYXJhbXM6IGFueSkgPT5cbiAgICAgICAgdGhpcy5tb2RpZnlDb0hvc3RTZXR0aW5nc1NlcnZpY2UubW9kaWZ5Q29Ib3N0U2V0dGluZ3MocGFyYW1zKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ2lzQ29Ib3N0TW9kYWxWaXNpYmxlJ10gJiYgdGhpcy5pc0NvSG9zdE1vZGFsVmlzaWJsZSkge1xuICAgICAgdGhpcy5pbml0aWFsaXplUmVzcG9uc2liaWxpdGllcygpO1xuICAgICAgdGhpcy5jYWxjdWxhdGVNb2RhbFdpZHRoKCk7XG4gICAgfVxuICB9XG5cbiAgaW5pdGlhbGl6ZVJlc3BvbnNpYmlsaXRpZXMoKSB7XG4gICAgdGhpcy5Db0hvc3RSZXNwb25zaWJpbGl0eUNvcHkgPSBbLi4udGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eV07XG4gICAgdGhpcy5Db0hvc3RSZXNwb25zaWJpbGl0eUNvcHlBbHQgPSBbLi4udGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eV07XG4gICAgdGhpcy5yZXNwb25zaWJpbGl0eUtleXMgPSB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5Lm1hcCgoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgbWFuYWdlS2V5ID0gYG1hbmFnZSR7aXRlbS5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaXRlbS5uYW1lLnNsaWNlKDEpfWA7XG4gICAgICBjb25zdCBkZWRpY2F0ZUtleSA9IGBkZWRpY2F0ZVRvTWFuYWdlJHtcbiAgICAgICAgaXRlbS5uYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgaXRlbS5uYW1lLnNsaWNlKDEpXG4gICAgICB9YDtcbiAgICAgIHJldHVybiB7IG1hbmFnZUtleSwgZGVkaWNhdGVLZXkgfTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGluaXRpYWxSZXNwb25zaWJpbGl0aWVzID0gdGhpcy5Db0hvc3RSZXNwb25zaWJpbGl0eUNvcHlBbHQucmVkdWNlKFxuICAgICAgKGFjYzogYW55LCBpdGVtOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3Qgc3RyMiA9IGl0ZW0ubmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIGl0ZW0ubmFtZS5zbGljZSgxKTtcbiAgICAgICAgYWNjW2BtYW5hZ2Uke3N0cjJ9YF0gPSBpdGVtLnZhbHVlO1xuICAgICAgICBhY2NbYGRlZGljYXRlVG9NYW5hZ2Uke3N0cjJ9YF0gPSBpdGVtLmRlZGljYXRlZDtcbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgIH0sXG4gICAgICB7fSxcbiAgICApO1xuXG4gICAgdGhpcy5yZXNwb25zaWJpbGl0aWVzID0gaW5pdGlhbFJlc3BvbnNpYmlsaXRpZXM7XG4gIH1cblxuICBnZXQgZmlsdGVyZWRQYXJ0aWNpcGFudHMoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFydGljaXBhbnRzLmZpbHRlcihcbiAgICAgIChwYXJ0aWNpcGFudCkgPT4gcGFydGljaXBhbnQubmFtZSAhPT0gdGhpcy5jdXJyZW50Q29ob3N0ICYmIHBhcnRpY2lwYW50LmlzbGV2ZWwgIT09ICcyJyxcbiAgICApO1xuICB9XG5cbiAgaGFuZGxlVG9nZ2xlU3dpdGNoKGtleTogc3RyaW5nKSB7XG4gICAgaWYgKGtleS5zdGFydHNXaXRoKCdkZWRpY2F0ZVRvJykpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNpYmlsaXR5TmFtZSA9IGtleS5yZXBsYWNlKCdkZWRpY2F0ZVRvTWFuYWdlJywgJycpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBjb25zdCBtYW5hZ2VLZXkgPSBgbWFuYWdlJHtcbiAgICAgICAgcmVzcG9uc2liaWxpdHlOYW1lLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgcmVzcG9uc2liaWxpdHlOYW1lLnNsaWNlKDEpXG4gICAgICB9YDtcblxuICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlICdkZWRpY2F0ZWQnIGNoZWNrYm94IGNhbiBvbmx5IGJlIHRvZ2dsZWQgaWYgdGhlIGNvcnJlc3BvbmRpbmcgJ3Jlc3BvbnNpYmlsaXR5JyBpcyBjaGVja2VkXG4gICAgICBpZiAodGhpcy5yZXNwb25zaWJpbGl0aWVzW21hbmFnZUtleV0pIHtcbiAgICAgICAgY29uc3QgcmVzcG9uc2liaWxpdHlEZWRpY2F0ZWQgPSB0aGlzLkNvSG9zdFJlc3BvbnNpYmlsaXR5Q29weS5maW5kKFxuICAgICAgICAgIChpdGVtKSA9PiBpdGVtLm5hbWUgPT09IHJlc3BvbnNpYmlsaXR5TmFtZSxcbiAgICAgICAgKS5kZWRpY2F0ZWQ7XG4gICAgICAgIHRoaXMucmVzcG9uc2liaWxpdGllc1trZXldID0gIXJlc3BvbnNpYmlsaXR5RGVkaWNhdGVkO1xuICAgICAgICB0aGlzLkNvSG9zdFJlc3BvbnNpYmlsaXR5Q29weS5maW5kKChpdGVtKSA9PiBpdGVtLm5hbWUgPT09IHJlc3BvbnNpYmlsaXR5TmFtZSkuZGVkaWNhdGVkID1cbiAgICAgICAgICAhcmVzcG9uc2liaWxpdHlEZWRpY2F0ZWQ7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChrZXkuc3RhcnRzV2l0aCgnbWFuYWdlJykpIHtcbiAgICAgIGNvbnN0IHJlc3BvbnNpYmlsaXR5TmFtZSA9IGtleS5yZXBsYWNlKCdtYW5hZ2UnLCAnJykudG9Mb3dlckNhc2UoKTtcbiAgICAgIGNvbnN0IHJlc3BvbnNpYmlsaXR5VmFsdWUgPSB0aGlzLkNvSG9zdFJlc3BvbnNpYmlsaXR5Q29weS5maW5kKFxuICAgICAgICAoaXRlbSkgPT4gaXRlbS5uYW1lID09PSByZXNwb25zaWJpbGl0eU5hbWUsXG4gICAgICApLnZhbHVlO1xuXG4gICAgICAvLyBUb2dnbGUgdGhlICdyZXNwb25zaWJpbGl0eScgY2hlY2tib3ggYW5kIGVuc3VyZSB0aGUgY29ycmVzcG9uZGluZyAnZGVkaWNhdGVkJyBjaGVja2JveCBpcyBhbHNvIGRpc2FibGVkIGlmIHVuY2hlY2tlZFxuICAgICAgdGhpcy5yZXNwb25zaWJpbGl0aWVzW2tleV0gPSAhcmVzcG9uc2liaWxpdHlWYWx1ZTtcbiAgICAgIHRoaXMuQ29Ib3N0UmVzcG9uc2liaWxpdHlDb3B5LmZpbmQoKGl0ZW0pID0+IGl0ZW0ubmFtZSA9PT0gcmVzcG9uc2liaWxpdHlOYW1lKS52YWx1ZSA9XG4gICAgICAgICFyZXNwb25zaWJpbGl0eVZhbHVlO1xuXG4gICAgICBpZiAoIXRoaXMucmVzcG9uc2liaWxpdGllc1trZXldKSB7XG4gICAgICAgIGNvbnN0IGRlZGljYXRlS2V5ID0gYGRlZGljYXRlVG9NYW5hZ2Uke1xuICAgICAgICAgIHJlc3BvbnNpYmlsaXR5TmFtZS5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHJlc3BvbnNpYmlsaXR5TmFtZS5zbGljZSgxKVxuICAgICAgICB9YDtcbiAgICAgICAgdGhpcy5yZXNwb25zaWJpbGl0aWVzW2RlZGljYXRlS2V5XSA9IGZhbHNlO1xuICAgICAgICB0aGlzLkNvSG9zdFJlc3BvbnNpYmlsaXR5Q29weS5maW5kKChpdGVtKSA9PiBpdGVtLm5hbWUgPT09IHJlc3BvbnNpYmlsaXR5TmFtZSkuZGVkaWNhdGVkID1cbiAgICAgICAgICBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVTYXZlKCkge1xuXG4gICAgdGhpcy5vbk1vZGlmeUNvSG9zdCh7XG4gICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZSxcbiAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQsXG4gICAgICBzZWxlY3RlZFBhcnRpY2lwYW50OiB0aGlzLnNlbGVjdGVkQ29ob3N0LFxuICAgICAgY29Ib3N0OiB0aGlzLmN1cnJlbnRDb2hvc3QsXG4gICAgICBjb0hvc3RSZXNwb25zaWJpbGl0eTogdGhpcy5Db0hvc3RSZXNwb25zaWJpbGl0eUNvcHksXG4gICAgICB1cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eTogdGhpcy51cGRhdGVDb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgICAgIHVwZGF0ZUNvSG9zdDogdGhpcy51cGRhdGVDb0hvc3QsXG4gICAgICB1cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc0NvSG9zdE1vZGFsVmlzaWJsZSxcbiAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQsXG4gICAgfSk7XG4gIH1cblxuICBoYW5kbGVDbG9zZSgpIHtcbiAgICB0aGlzLm9uQ29Ib3N0Q2xvc2UoKTtcbiAgfVxuXG4gIGNhbGN1bGF0ZU1vZGFsV2lkdGgoKSB7XG4gICAgY29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgbW9kYWxXaWR0aCA9IDAuOCAqIHNjcmVlbldpZHRoO1xuICAgIGlmIChtb2RhbFdpZHRoID4gNDAwKSB7XG4gICAgICBtb2RhbFdpZHRoID0gNDAwO1xuICAgIH1cbiAgICB0aGlzLm1vZGFsV2lkdGggPSBtb2RhbFdpZHRoO1xuICB9XG5cbiAgbW9kYWxDb250YWluZXJTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGlzcGxheTogdGhpcy5pc0NvSG9zdE1vZGFsVmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZScsXG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIHRvcDogJzAnLFxuICAgICAgbGVmdDogJzAnLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjUpJyxcbiAgICAgIHpJbmRleDogJzk5OScsXG4gICAgfTtcbiAgfVxuXG4gIG1vZGFsQ29udGVudFN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMTBweCcsXG4gICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICB3aWR0aDogYCR7dGhpcy5tb2RhbFdpZHRofXB4YCxcbiAgICAgIG1heEhlaWdodDogJzY1JScsXG4gICAgICBvdmVyZmxvd1g6ICdoaWRkZW4nLFxuICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIHRvcDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygndG9wJykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICBib3R0b206IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ2JvdHRvbScpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgbGVmdDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnTGVmdCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgcmlnaHQ6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ1JpZ2h0JykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgfTtcbiAgfVxufVxuIiwiPCEtLSBjby1ob3N0LW1vZGFsLmNvbXBvbmVudC5odG1sIC0tPlxyXG48ZGl2IFtuZ1N0eWxlXT1cIm1vZGFsQ29udGFpbmVyU3R5bGUoKVwiPlxyXG4gIDxkaXYgW25nU3R5bGVdPVwibW9kYWxDb250ZW50U3R5bGUoKVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtdGl0bGVcIj5NYW5hZ2UgQ28tSG9zdDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiYnRuLWNsb3NlLXNldHRpbmdzXCIgKGNsaWNrKT1cImhhbmRsZUNsb3NlKClcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRpbWVzXCIgY2xhc3M9XCJpY29uXCI+PC9mYS1pY29uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGhyIGNsYXNzPVwiaHJcIiAvPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb250LXdlaWdodC1ib2xkXCI+Q3VycmVudCBDby1ob3N0OjwvbGFiZWw+XHJcbiAgICAgICAgPGlucHV0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgW3ZhbHVlXT1cImN1cnJlbnRDb2hvc3RcIiByZWFkb25seSAvPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgICA8bGFiZWwgY2xhc3M9XCJmb250LXdlaWdodC1ib2xkXCI+U2VsZWN0IE5ldyBDby1ob3N0OjwvbGFiZWw+XHJcbiAgICAgICAgPHNlbGVjdCBjbGFzcz1cImZvcm0tY29udHJvbFwiIFsobmdNb2RlbCldPVwic2VsZWN0ZWRDb2hvc3RcIj5cclxuICAgICAgICAgIDxvcHRpb24gdmFsdWU9XCJcIj5TZWxlY3QgYSBwYXJ0aWNpcGFudDwvb3B0aW9uPlxyXG4gICAgICAgICAgPG9wdGlvbiAqbmdGb3I9XCJsZXQgcGFydGljaXBhbnQgb2YgZmlsdGVyZWRQYXJ0aWNpcGFudHNcIiBbdmFsdWVdPVwicGFydGljaXBhbnQubmFtZVwiPlxyXG4gICAgICAgICAgICB7eyBwYXJ0aWNpcGFudC5uYW1lIH19XHJcbiAgICAgICAgICA8L29wdGlvbj5cclxuICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyb3dcIj5cclxuICAgICAgICA8ZGl2IGNsYXNzPVwiY29sLTVcIj5cclxuICAgICAgICAgIDxsYWJlbCBzdHlsZT1cImZvbnQtd2VpZ2h0OiBib2xkXCI+UmVzcG9uc2liaWxpdHk8L2xhYmVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtM1wiPlxyXG4gICAgICAgICAgPGxhYmVsIHN0eWxlPVwiZm9udC13ZWlnaHQ6IGJvbGRcIj5TZWxlY3Q8L2xhYmVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNFwiPlxyXG4gICAgICAgICAgPGxhYmVsIHN0eWxlPVwiZm9udC13ZWlnaHQ6IGJvbGRcIj5EZWRpY2F0ZWQ8L2xhYmVsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAqbmdGb3I9XCJsZXQga2V5IG9mIHJlc3BvbnNpYmlsaXR5S2V5c1wiIGNsYXNzPVwicm93XCIgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAxMHB4O1wiPlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtNVwiIHN0eWxlPVwiZm9udC13ZWlnaHQ6IGJvbGRcIj57eyBrZXkubWFuYWdlS2V5LnJlcGxhY2UoJ21hbmFnZScsICcnKSB9fTwvZGl2PlxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjb2wtM1wiPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIFsobmdNb2RlbCldPVwicmVzcG9uc2liaWxpdGllc1trZXkubWFuYWdlS2V5XVwiIChjaGFuZ2UpPVwiaGFuZGxlVG9nZ2xlU3dpdGNoKGtleS5tYW5hZ2VLZXkpXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPGRpdiBjbGFzcz1cImNvbC00XCI+XHJcbiAgICAgICAgICA8aW5wdXQgdHlwZT1cImNoZWNrYm94XCIgWyhuZ01vZGVsKV09XCJyZXNwb25zaWJpbGl0aWVzW2tleS5kZWRpY2F0ZUtleV1cIiAoY2hhbmdlKT1cImhhbmRsZVRvZ2dsZVN3aXRjaChrZXkuZGVkaWNhdGVLZXkpXCIgW2Rpc2FibGVkXT1cIiFyZXNwb25zaWJpbGl0aWVzW2tleS5tYW5hZ2VLZXldXCI+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tYXBwbHktc2V0dGluZ3NcIiAoY2xpY2spPVwiaGFuZGxlU2F2ZSgpXCI+U2F2ZTwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=