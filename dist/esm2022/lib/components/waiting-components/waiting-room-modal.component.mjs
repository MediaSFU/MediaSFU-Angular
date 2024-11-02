/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input } from '@angular/core';
import { faTimes, faCheck } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "../../methods/waiting-methods/respond-to-waiting.service";
import * as i2 from "@angular/common";
import * as i3 from "@fortawesome/angular-fontawesome";
/**
 * Component representing a modal for managing participants in a waiting room.
 *
 * @component
 * @selector app-waiting-room-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, FormsModule
 * @templateUrl ./waiting-room-modal.component.html
 * @styleUrls ['./waiting-room-modal.component.css']
 *
 * @property {boolean} isWaitingModalVisible - Visibility state of the modal.
 * @property {number} waitingRoomCounter - Counter for the number of participants in the waiting room.
 * @property {WaitingRoomParticipant[]} waitingRoomList - List of participants in the waiting room.
 * @property {string} roomName - Name of the room.
 * @property {Socket} socket - Socket instance for communication.
 * @property {string} position - Position of the modal on the screen.
 * @property {string} backgroundColor - Background color of the modal.
 * @property {WaitingRoomModalParameters} parameters - Parameters for the waiting room modal.
 * @property {function} onWaitingRoomClose - Function to call when the modal is closed.
 * @property {function} onWaitingRoomFilterChange - Function to call when the filter value changes.
 * @property {function} updateWaitingList - Function to update the waiting list.
 * @property {function} onWaitingRoomItemPress - Function to call when an item in the waiting room is pressed.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for the close button.
 * @property {IconDefinition} faCheck - FontAwesome icon for the check button.
 * @property {WaitingRoomParticipant[]} waitingRoomList_s - Filtered list of participants in the waiting room.
 * @property {number} waitingRoomCounter_s - Counter for the filtered list of participants in the waiting room.
 * @property {boolean} reRender - Flag to trigger re-rendering of the component.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property of a directive changes.
 * @method updateParameters - Updates the parameters for the waiting room modal.
 * @method handleModalClose - Handles the closing of the modal.
 * @method handleFilterChange - Handles the change in the filter input.
 * @method handleItemPress - Handles the pressing of an item in the waiting room.
 *
 * @getter modalContainerStyle - Returns the style object for the modal container.
 * @getter modalContentStyle - Returns the style object for the modal content.
 * @getter inputStyle - Returns the style object for the input field.
 *
 * @example
 * ```html
 * <app-waiting-room-modal
 *  [isWaitingModalVisible]="true"
 * [waitingRoomCounter]="waitingRoomCounter"
 * [waitingRoomList]="waitingRoomList"
 * [roomName]="roomName"
 * [socket]="socket"
 * [position]="'topRight'"
 * [backgroundColor]="'#83c0e9'"
 * [parameters]="waitingRoomModalParams"
 * [onWaitingRoomClose]="closeWaitingRoomModal"
 * [onWaitingRoomFilterChange]="filterWaitingRoom"
 * [updateWaitingList]="updateWaitingList"
 * [onWaitingRoomItemPress]="handleWaitingRoomItemPress"
 * ></app-waiting-room-modal>
 * ```
 *
 */
export class WaitingRoomModal {
    respondToWaitingService;
    constructor(respondToWaitingService) {
        this.respondToWaitingService = respondToWaitingService;
    }
    isWaitingModalVisible = false;
    waitingRoomCounter = 0;
    waitingRoomList = [];
    roomName = '';
    socket = {};
    position = 'topRight';
    backgroundColor = '#83c0e9';
    parameters = {};
    onWaitingRoomClose = () => { };
    onWaitingRoomFilterChange = () => { };
    updateWaitingList = () => { };
    onWaitingRoomItemPress;
    faTimes = faTimes;
    faCheck = faCheck;
    waitingRoomList_s = [];
    waitingRoomCounter_s = 0;
    reRender = false;
    ngOnInit() {
        if (!this.onWaitingRoomItemPress) {
            this.onWaitingRoomItemPress = (data) => this.respondToWaitingService.respondToWaiting(data);
        }
    }
    ngOnChanges(changes) {
        if (changes['waitingRoomList'] || changes['reRender']) {
            this.updateParameters();
        }
    }
    updateParameters() {
        let { getUpdatedAllParams } = this.parameters;
        this.parameters = getUpdatedAllParams();
        this.waitingRoomList_s = this.parameters.filteredWaitingRoomList;
        this.waitingRoomCounter_s = this.parameters.filteredWaitingRoomList.length;
    }
    handleModalClose() {
        this.onWaitingRoomClose();
    }
    handleFilterChange(event) {
        const inputElement = event.target;
        const value = inputElement?.value || '';
        this.onWaitingRoomFilterChange(value);
        this.reRender = !this.reRender;
    }
    handleItemPress(participant, type) {
        this.onWaitingRoomItemPress({
            participantId: participant.id,
            participantName: participant.name,
            updateWaitingList: this.updateWaitingList,
            waitingList: this.waitingRoomList,
            roomName: this.roomName,
            type: type, // true for accepted, false for rejected
            socket: this.socket,
        });
    }
    get modalContainerStyle() {
        return {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: this.isWaitingModalVisible ? 'block' : 'none',
            zIndex: '999',
        };
    }
    get modalContentStyle() {
        const screenWidth = window.innerWidth;
        let modalWidth = 0.8 * screenWidth;
        if (modalWidth > 350) {
            modalWidth = 350;
        }
        return {
            position: 'fixed',
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
    get inputStyle() {
        return {
            width: '90%',
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #000',
            fontSize: '16px',
            marginBottom: '10px',
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: WaitingRoomModal, deps: [{ token: i1.RespondToWaiting }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: WaitingRoomModal, isStandalone: true, selector: "app-waiting-room-modal", inputs: { isWaitingModalVisible: "isWaitingModalVisible", waitingRoomCounter: "waitingRoomCounter", waitingRoomList: "waitingRoomList", roomName: "roomName", socket: "socket", position: "position", backgroundColor: "backgroundColor", parameters: "parameters", onWaitingRoomClose: "onWaitingRoomClose", onWaitingRoomFilterChange: "onWaitingRoomFilterChange", updateWaitingList: "updateWaitingList", onWaitingRoomItemPress: "onWaitingRoomItemPress" }, usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"isWaitingModalVisible\" [ngStyle]=\"modalContainerStyle\">\r\n  <div [ngStyle]=\"modalContentStyle\">\r\n    <div class=\"modal-header\">\r\n      <div class=\"modal-title\">\r\n        Waiting <span class=\"badge\">{{ waitingRoomCounter_s }}</span>\r\n      </div>\r\n      <div (click)=\"handleModalClose()\" class=\"btn-close-waitings\">\r\n        <fa-icon [icon]=\"faTimes\" class=\"icon\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr class=\"hr\" />\r\n    <div class=\"modal-body\">\r\n      <div class=\"form-group\">\r\n        <input\r\n          class=\"form-control\"\r\n          [ngStyle]=\"inputStyle\"\r\n          placeholder=\"Search ...\"\r\n          (input)=\"handleFilterChange($event)\"\r\n        />\r\n      </div>\r\n      <div class=\"waiting-list\">\r\n        <div\r\n          *ngFor=\"let participant of waitingRoomList_s\"\r\n          class=\"waiting-item\"\r\n        >\r\n          <div class=\"col7\">{{ participant.name }}</div>\r\n          <div class=\"col2\">\r\n            <button (click)=\"handleItemPress(participant, true)\">\r\n              <fa-icon [icon]=\"faCheck\" size=\"lg\" color=\"green\"></fa-icon>\r\n            </button>\r\n          </div>\r\n          <div class=\"col2\">\r\n            <button (click)=\"handleItemPress(participant, false)\">\r\n              <fa-icon [icon]=\"faTimes\" size=\"lg\" color=\"red\"></fa-icon>\r\n            </button>\r\n          </div>\r\n          <div class=\"col1\"></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:block;z-index:999}.modal-content{position:fixed;border-radius:10px;padding:10px;max-height:65%;overflow-y:auto;top:10px;right:10px;width:80vw;max-width:350px}.form-control{width:90%;padding:10px;border-radius:5px;border:1px solid #000;font-size:16px;margin-bottom:10px}.modal-header{display:flex;justify-content:space-between;align-items:center}.modal-title{font-size:1.2em}.badge{background-color:#fff;color:#000;border-radius:10px;padding:5px}.btn-close-waitings{cursor:pointer}.waiting-list{display:flex;flex-direction:column}.waiting-item{display:flex;flex-direction:row;margin-top:5px}.col7{flex:5;display:flex;align-items:center}.col2{flex:2;display:flex;align-items:center;justify-content:center}.col1{flex:1}.hr{margin:.5em 0;border:0;border-top:1px solid #ccc}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i3.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }, { kind: "ngmodule", type: FormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: WaitingRoomModal, decorators: [{
            type: Component,
            args: [{ selector: 'app-waiting-room-modal', standalone: true, imports: [CommonModule, FontAwesomeModule, FormsModule], template: "<div *ngIf=\"isWaitingModalVisible\" [ngStyle]=\"modalContainerStyle\">\r\n  <div [ngStyle]=\"modalContentStyle\">\r\n    <div class=\"modal-header\">\r\n      <div class=\"modal-title\">\r\n        Waiting <span class=\"badge\">{{ waitingRoomCounter_s }}</span>\r\n      </div>\r\n      <div (click)=\"handleModalClose()\" class=\"btn-close-waitings\">\r\n        <fa-icon [icon]=\"faTimes\" class=\"icon\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr class=\"hr\" />\r\n    <div class=\"modal-body\">\r\n      <div class=\"form-group\">\r\n        <input\r\n          class=\"form-control\"\r\n          [ngStyle]=\"inputStyle\"\r\n          placeholder=\"Search ...\"\r\n          (input)=\"handleFilterChange($event)\"\r\n        />\r\n      </div>\r\n      <div class=\"waiting-list\">\r\n        <div\r\n          *ngFor=\"let participant of waitingRoomList_s\"\r\n          class=\"waiting-item\"\r\n        >\r\n          <div class=\"col7\">{{ participant.name }}</div>\r\n          <div class=\"col2\">\r\n            <button (click)=\"handleItemPress(participant, true)\">\r\n              <fa-icon [icon]=\"faCheck\" size=\"lg\" color=\"green\"></fa-icon>\r\n            </button>\r\n          </div>\r\n          <div class=\"col2\">\r\n            <button (click)=\"handleItemPress(participant, false)\">\r\n              <fa-icon [icon]=\"faTimes\" size=\"lg\" color=\"red\"></fa-icon>\r\n            </button>\r\n          </div>\r\n          <div class=\"col1\"></div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:block;z-index:999}.modal-content{position:fixed;border-radius:10px;padding:10px;max-height:65%;overflow-y:auto;top:10px;right:10px;width:80vw;max-width:350px}.form-control{width:90%;padding:10px;border-radius:5px;border:1px solid #000;font-size:16px;margin-bottom:10px}.modal-header{display:flex;justify-content:space-between;align-items:center}.modal-title{font-size:1.2em}.badge{background-color:#fff;color:#000;border-radius:10px;padding:5px}.btn-close-waitings{cursor:pointer}.waiting-list{display:flex;flex-direction:column}.waiting-item{display:flex;flex-direction:row;margin-top:5px}.col7{flex:5;display:flex;align-items:center}.col2{flex:2;display:flex;align-items:center;justify-content:center}.col1{flex:1}.hr{margin:.5em 0;border:0;border-top:1px solid #ccc}\n"] }]
        }], ctorParameters: () => [{ type: i1.RespondToWaiting }], propDecorators: { isWaitingModalVisible: [{
                type: Input
            }], waitingRoomCounter: [{
                type: Input
            }], waitingRoomList: [{
                type: Input
            }], roomName: [{
                type: Input
            }], socket: [{
                type: Input
            }], position: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], parameters: [{
                type: Input
            }], onWaitingRoomClose: [{
                type: Input
            }], onWaitingRoomFilterChange: [{
                type: Input
            }], updateWaitingList: [{
                type: Input
            }], onWaitingRoomItemPress: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FpdGluZy1yb29tLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL3dhaXRpbmctY29tcG9uZW50cy93YWl0aW5nLXJvb20tbW9kYWwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvd2FpdGluZy1jb21wb25lbnRzL3dhaXRpbmctcm9vbS1tb2RhbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5REFBeUQ7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUFvQzdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMERHO0FBUUgsTUFBTSxPQUFPLGdCQUFnQjtJQUNQO0lBQXBCLFlBQW9CLHVCQUF5QztRQUF6Qyw0QkFBdUIsR0FBdkIsdUJBQXVCLENBQWtCO0lBQUcsQ0FBQztJQUV4RCxxQkFBcUIsR0FBRyxLQUFLLENBQUM7SUFDOUIsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLGVBQWUsR0FBNkIsRUFBRSxDQUFDO0lBQy9DLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDZCxNQUFNLEdBQVcsRUFBWSxDQUFDO0lBQzlCLFFBQVEsR0FBRyxV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OzJGQUFoQixnQkFBZ0IseWlCQzNHN0IsZ2lEQTBDQSxtNkJENkRZLFlBQVksb1ZBQUUsaUJBQWlCLDRQQUFFLFdBQVc7OzJGQUkzQyxnQkFBZ0I7a0JBUDVCLFNBQVM7K0JBQ0Usd0JBQXdCLGNBQ3RCLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxXQUFXLENBQUM7cUZBTzlDLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0cseUJBQXlCO3NCQUFqQyxLQUFLO2dCQUNHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFDRyxzQkFBc0I7c0JBQTlCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYVRpbWVzLCBmYUNoZWNrIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgV2FpdGluZ1Jvb21QYXJ0aWNpcGFudCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5pbXBvcnQge1xuICBSZXNwb25kVG9XYWl0aW5nLFxuICBSZXNwb25kVG9XYWl0aW5nT3B0aW9ucyxcbiAgUmVzcG9uZFRvV2FpdGluZ1R5cGUsXG59IGZyb20gJy4uLy4uL21ldGhvZHMvd2FpdGluZy1tZXRob2RzL3Jlc3BvbmQtdG8td2FpdGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFdhaXRpbmdSb29tTW9kYWxQYXJhbWV0ZXJzIHtcbiAgZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3Q6IFdhaXRpbmdSb29tUGFydGljaXBhbnRbXTtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gV2FpdGluZ1Jvb21Nb2RhbFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXYWl0aW5nUm9vbU1vZGFsT3B0aW9ucyB7XG4gIGlzV2FpdGluZ01vZGFsVmlzaWJsZTogYm9vbGVhbjtcbiAgb25XYWl0aW5nUm9vbUNsb3NlOiAoKSA9PiB2b2lkO1xuICB3YWl0aW5nUm9vbUNvdW50ZXI6IG51bWJlcjtcbiAgb25XYWl0aW5nUm9vbUZpbHRlckNoYW5nZTogKGZpbHRlcjogc3RyaW5nKSA9PiB2b2lkO1xuICB3YWl0aW5nUm9vbUxpc3Q6IFdhaXRpbmdSb29tUGFydGljaXBhbnRbXTtcbiAgdXBkYXRlV2FpdGluZ0xpc3Q6ICh1cGRhdGVkTGlzdDogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgcG9zaXRpb24/OiBzdHJpbmc7XG4gIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgcGFyYW1ldGVyczogV2FpdGluZ1Jvb21Nb2RhbFBhcmFtZXRlcnM7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIG9uV2FpdGluZ1Jvb21JdGVtUHJlc3M/OiBSZXNwb25kVG9XYWl0aW5nVHlwZTtcbn1cblxuZXhwb3J0IHR5cGUgV2FpdGluZ1Jvb21Nb2RhbFR5cGUgPSAob3B0aW9uczogV2FpdGluZ1Jvb21Nb2RhbE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIENvbXBvbmVudCByZXByZXNlbnRpbmcgYSBtb2RhbCBmb3IgbWFuYWdpbmcgcGFydGljaXBhbnRzIGluIGEgd2FpdGluZyByb29tLlxuICpcbiAqIEBjb21wb25lbnRcbiAqIEBzZWxlY3RvciBhcHAtd2FpdGluZy1yb29tLW1vZGFsXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlLCBGb3Jtc01vZHVsZVxuICogQHRlbXBsYXRlVXJsIC4vd2FpdGluZy1yb29tLW1vZGFsLmNvbXBvbmVudC5odG1sXG4gKiBAc3R5bGVVcmxzIFsnLi93YWl0aW5nLXJvb20tbW9kYWwuY29tcG9uZW50LmNzcyddXG4gKlxuICogQHByb3BlcnR5IHtib29sZWFufSBpc1dhaXRpbmdNb2RhbFZpc2libGUgLSBWaXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBtb2RhbC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSB3YWl0aW5nUm9vbUNvdW50ZXIgLSBDb3VudGVyIGZvciB0aGUgbnVtYmVyIG9mIHBhcnRpY2lwYW50cyBpbiB0aGUgd2FpdGluZyByb29tLlxuICogQHByb3BlcnR5IHtXYWl0aW5nUm9vbVBhcnRpY2lwYW50W119IHdhaXRpbmdSb29tTGlzdCAtIExpc3Qgb2YgcGFydGljaXBhbnRzIGluIHRoZSB3YWl0aW5nIHJvb20uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcm9vbU5hbWUgLSBOYW1lIG9mIHRoZSByb29tLlxuICogQHByb3BlcnR5IHtTb2NrZXR9IHNvY2tldCAtIFNvY2tldCBpbnN0YW5jZSBmb3IgY29tbXVuaWNhdGlvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwb3NpdGlvbiAtIFBvc2l0aW9uIG9mIHRoZSBtb2RhbCBvbiB0aGUgc2NyZWVuLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGJhY2tncm91bmRDb2xvciAtIEJhY2tncm91bmQgY29sb3Igb2YgdGhlIG1vZGFsLlxuICogQHByb3BlcnR5IHtXYWl0aW5nUm9vbU1vZGFsUGFyYW1ldGVyc30gcGFyYW1ldGVycyAtIFBhcmFtZXRlcnMgZm9yIHRoZSB3YWl0aW5nIHJvb20gbW9kYWwuXG4gKiBAcHJvcGVydHkge2Z1bmN0aW9ufSBvbldhaXRpbmdSb29tQ2xvc2UgLSBGdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIG1vZGFsIGlzIGNsb3NlZC5cbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IG9uV2FpdGluZ1Jvb21GaWx0ZXJDaGFuZ2UgLSBGdW5jdGlvbiB0byBjYWxsIHdoZW4gdGhlIGZpbHRlciB2YWx1ZSBjaGFuZ2VzLlxuICogQHByb3BlcnR5IHtmdW5jdGlvbn0gdXBkYXRlV2FpdGluZ0xpc3QgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHdhaXRpbmcgbGlzdC5cbiAqIEBwcm9wZXJ0eSB7ZnVuY3Rpb259IG9uV2FpdGluZ1Jvb21JdGVtUHJlc3MgLSBGdW5jdGlvbiB0byBjYWxsIHdoZW4gYW4gaXRlbSBpbiB0aGUgd2FpdGluZyByb29tIGlzIHByZXNzZWQuXG4gKlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFUaW1lcyAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHRoZSBjbG9zZSBidXR0b24uXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYUNoZWNrIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgdGhlIGNoZWNrIGJ1dHRvbi5cbiAqIEBwcm9wZXJ0eSB7V2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdfSB3YWl0aW5nUm9vbUxpc3RfcyAtIEZpbHRlcmVkIGxpc3Qgb2YgcGFydGljaXBhbnRzIGluIHRoZSB3YWl0aW5nIHJvb20uXG4gKiBAcHJvcGVydHkge251bWJlcn0gd2FpdGluZ1Jvb21Db3VudGVyX3MgLSBDb3VudGVyIGZvciB0aGUgZmlsdGVyZWQgbGlzdCBvZiBwYXJ0aWNpcGFudHMgaW4gdGhlIHdhaXRpbmcgcm9vbS5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gcmVSZW5kZXIgLSBGbGFnIHRvIHRyaWdnZXIgcmUtcmVuZGVyaW5nIG9mIHRoZSBjb21wb25lbnQuXG4gKlxuICogQG1ldGhvZCBuZ09uSW5pdCAtIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGRhdGEtYm91bmQgcHJvcGVydGllcyBhcmUgaW5pdGlhbGl6ZWQuXG4gKiBAbWV0aG9kIG5nT25DaGFuZ2VzIC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBvZiBhIGRpcmVjdGl2ZSBjaGFuZ2VzLlxuICogQG1ldGhvZCB1cGRhdGVQYXJhbWV0ZXJzIC0gVXBkYXRlcyB0aGUgcGFyYW1ldGVycyBmb3IgdGhlIHdhaXRpbmcgcm9vbSBtb2RhbC5cbiAqIEBtZXRob2QgaGFuZGxlTW9kYWxDbG9zZSAtIEhhbmRsZXMgdGhlIGNsb3Npbmcgb2YgdGhlIG1vZGFsLlxuICogQG1ldGhvZCBoYW5kbGVGaWx0ZXJDaGFuZ2UgLSBIYW5kbGVzIHRoZSBjaGFuZ2UgaW4gdGhlIGZpbHRlciBpbnB1dC5cbiAqIEBtZXRob2QgaGFuZGxlSXRlbVByZXNzIC0gSGFuZGxlcyB0aGUgcHJlc3Npbmcgb2YgYW4gaXRlbSBpbiB0aGUgd2FpdGluZyByb29tLlxuICpcbiAqIEBnZXR0ZXIgbW9kYWxDb250YWluZXJTdHlsZSAtIFJldHVybnMgdGhlIHN0eWxlIG9iamVjdCBmb3IgdGhlIG1vZGFsIGNvbnRhaW5lci5cbiAqIEBnZXR0ZXIgbW9kYWxDb250ZW50U3R5bGUgLSBSZXR1cm5zIHRoZSBzdHlsZSBvYmplY3QgZm9yIHRoZSBtb2RhbCBjb250ZW50LlxuICogQGdldHRlciBpbnB1dFN0eWxlIC0gUmV0dXJucyB0aGUgc3R5bGUgb2JqZWN0IGZvciB0aGUgaW5wdXQgZmllbGQuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtd2FpdGluZy1yb29tLW1vZGFsXG4gKiAgW2lzV2FpdGluZ01vZGFsVmlzaWJsZV09XCJ0cnVlXCJcbiAqIFt3YWl0aW5nUm9vbUNvdW50ZXJdPVwid2FpdGluZ1Jvb21Db3VudGVyXCJcbiAqIFt3YWl0aW5nUm9vbUxpc3RdPVwid2FpdGluZ1Jvb21MaXN0XCJcbiAqIFtyb29tTmFtZV09XCJyb29tTmFtZVwiXG4gKiBbc29ja2V0XT1cInNvY2tldFwiXG4gKiBbcG9zaXRpb25dPVwiJ3RvcFJpZ2h0J1wiXG4gKiBbYmFja2dyb3VuZENvbG9yXT1cIicjODNjMGU5J1wiXG4gKiBbcGFyYW1ldGVyc109XCJ3YWl0aW5nUm9vbU1vZGFsUGFyYW1zXCJcbiAqIFtvbldhaXRpbmdSb29tQ2xvc2VdPVwiY2xvc2VXYWl0aW5nUm9vbU1vZGFsXCJcbiAqIFtvbldhaXRpbmdSb29tRmlsdGVyQ2hhbmdlXT1cImZpbHRlcldhaXRpbmdSb29tXCJcbiAqIFt1cGRhdGVXYWl0aW5nTGlzdF09XCJ1cGRhdGVXYWl0aW5nTGlzdFwiXG4gKiBbb25XYWl0aW5nUm9vbUl0ZW1QcmVzc109XCJoYW5kbGVXYWl0aW5nUm9vbUl0ZW1QcmVzc1wiXG4gKiA+PC9hcHAtd2FpdGluZy1yb29tLW1vZGFsPlxuICogYGBgXG4gKlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtd2FpdGluZy1yb29tLW1vZGFsJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGUsIEZvcm1zTW9kdWxlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3dhaXRpbmctcm9vbS1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dhaXRpbmctcm9vbS1tb2RhbC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFdhaXRpbmdSb29tTW9kYWwgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVzcG9uZFRvV2FpdGluZ1NlcnZpY2U6IFJlc3BvbmRUb1dhaXRpbmcpIHt9XG5cbiAgQElucHV0KCkgaXNXYWl0aW5nTW9kYWxWaXNpYmxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHdhaXRpbmdSb29tQ291bnRlciA9IDA7XG4gIEBJbnB1dCgpIHdhaXRpbmdSb29tTGlzdDogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdID0gW107XG4gIEBJbnB1dCgpIHJvb21OYW1lID0gJyc7XG4gIEBJbnB1dCgpIHNvY2tldDogU29ja2V0ID0ge30gYXMgU29ja2V0O1xuICBASW5wdXQoKSBwb3NpdGlvbiA9ICd0b3BSaWdodCc7XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICcjODNjMGU5JztcbiAgQElucHV0KCkgcGFyYW1ldGVyczogV2FpdGluZ1Jvb21Nb2RhbFBhcmFtZXRlcnMgPSB7fSBhcyBXYWl0aW5nUm9vbU1vZGFsUGFyYW1ldGVycztcbiAgQElucHV0KCkgb25XYWl0aW5nUm9vbUNsb3NlOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIEBJbnB1dCgpIG9uV2FpdGluZ1Jvb21GaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIEBJbnB1dCgpIHVwZGF0ZVdhaXRpbmdMaXN0OiAoZGF0YTogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIEBJbnB1dCgpIG9uV2FpdGluZ1Jvb21JdGVtUHJlc3MhOiAoZGF0YTogUmVzcG9uZFRvV2FpdGluZ09wdGlvbnMpID0+IHZvaWQ7XG5cbiAgZmFUaW1lcyA9IGZhVGltZXM7XG4gIGZhQ2hlY2sgPSBmYUNoZWNrO1xuICB3YWl0aW5nUm9vbUxpc3RfczogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdID0gW107XG4gIHdhaXRpbmdSb29tQ291bnRlcl9zID0gMDtcbiAgcmVSZW5kZXIgPSBmYWxzZTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMub25XYWl0aW5nUm9vbUl0ZW1QcmVzcykge1xuICAgICAgdGhpcy5vbldhaXRpbmdSb29tSXRlbVByZXNzID0gKGRhdGE6IGFueSkgPT5cbiAgICAgICAgdGhpcy5yZXNwb25kVG9XYWl0aW5nU2VydmljZS5yZXNwb25kVG9XYWl0aW5nKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1snd2FpdGluZ1Jvb21MaXN0J10gfHwgY2hhbmdlc1sncmVSZW5kZXInXSkge1xuICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUGFyYW1ldGVycygpIHtcbiAgICBsZXQgeyBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSB0aGlzLnBhcmFtZXRlcnM7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgdGhpcy53YWl0aW5nUm9vbUxpc3RfcyA9IHRoaXMucGFyYW1ldGVycy5maWx0ZXJlZFdhaXRpbmdSb29tTGlzdDtcbiAgICB0aGlzLndhaXRpbmdSb29tQ291bnRlcl9zID0gdGhpcy5wYXJhbWV0ZXJzLmZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0Lmxlbmd0aDtcbiAgfVxuXG4gIGhhbmRsZU1vZGFsQ2xvc2UoKSB7XG4gICAgdGhpcy5vbldhaXRpbmdSb29tQ2xvc2UoKTtcbiAgfVxuXG4gIGhhbmRsZUZpbHRlckNoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCB2YWx1ZSA9IGlucHV0RWxlbWVudD8udmFsdWUgfHwgJyc7XG4gICAgdGhpcy5vbldhaXRpbmdSb29tRmlsdGVyQ2hhbmdlKHZhbHVlKTtcbiAgICB0aGlzLnJlUmVuZGVyID0gIXRoaXMucmVSZW5kZXI7XG4gIH1cblxuICBoYW5kbGVJdGVtUHJlc3MocGFydGljaXBhbnQ6IFdhaXRpbmdSb29tUGFydGljaXBhbnQsIHR5cGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLm9uV2FpdGluZ1Jvb21JdGVtUHJlc3Moe1xuICAgICAgcGFydGljaXBhbnRJZDogcGFydGljaXBhbnQuaWQsXG4gICAgICBwYXJ0aWNpcGFudE5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICB1cGRhdGVXYWl0aW5nTGlzdDogdGhpcy51cGRhdGVXYWl0aW5nTGlzdCxcbiAgICAgIHdhaXRpbmdMaXN0OiB0aGlzLndhaXRpbmdSb29tTGlzdCxcbiAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLFxuICAgICAgdHlwZTogdHlwZSwgLy8gdHJ1ZSBmb3IgYWNjZXB0ZWQsIGZhbHNlIGZvciByZWplY3RlZFxuICAgICAgc29ja2V0OiB0aGlzLnNvY2tldCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBtb2RhbENvbnRhaW5lclN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIHRvcDogJzAnLFxuICAgICAgbGVmdDogJzAnLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjUpJyxcbiAgICAgIGRpc3BsYXk6IHRoaXMuaXNXYWl0aW5nTW9kYWxWaXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgIHpJbmRleDogJzk5OScsXG4gICAgfTtcbiAgfVxuXG4gIGdldCBtb2RhbENvbnRlbnRTdHlsZSgpIHtcbiAgICBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBtb2RhbFdpZHRoID0gMC44ICogc2NyZWVuV2lkdGg7XG4gICAgaWYgKG1vZGFsV2lkdGggPiAzNTApIHtcbiAgICAgIG1vZGFsV2lkdGggPSAzNTA7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxMHB4JyxcbiAgICAgIHBhZGRpbmc6ICcxMHB4JyxcbiAgICAgIHdpZHRoOiBgJHttb2RhbFdpZHRofXB4YCxcbiAgICAgIG1heEhlaWdodDogJzY1JScsXG4gICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgIHRvcDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygndG9wJykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICBib3R0b206IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ2JvdHRvbScpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgbGVmdDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnTGVmdCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgcmlnaHQ6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ1JpZ2h0JykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgfTtcbiAgfVxuXG4gIGdldCBpbnB1dFN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogJzkwJScsXG4gICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICBib3JkZXJSYWRpdXM6ICc1cHgnLFxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICMwMDAnLFxuICAgICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICAgIG1hcmdpbkJvdHRvbTogJzEwcHgnLFxuICAgIH07XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJpc1dhaXRpbmdNb2RhbFZpc2libGVcIiBbbmdTdHlsZV09XCJtb2RhbENvbnRhaW5lclN0eWxlXCI+XHJcbiAgPGRpdiBbbmdTdHlsZV09XCJtb2RhbENvbnRlbnRTdHlsZVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtdGl0bGVcIj5cclxuICAgICAgICBXYWl0aW5nIDxzcGFuIGNsYXNzPVwiYmFkZ2VcIj57eyB3YWl0aW5nUm9vbUNvdW50ZXJfcyB9fTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKGNsaWNrKT1cImhhbmRsZU1vZGFsQ2xvc2UoKVwiIGNsYXNzPVwiYnRuLWNsb3NlLXdhaXRpbmdzXCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFUaW1lc1wiIGNsYXNzPVwiaWNvblwiPjwvZmEtaWNvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxociBjbGFzcz1cImhyXCIgLz5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICBbbmdTdHlsZV09XCJpbnB1dFN0eWxlXCJcclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIC4uLlwiXHJcbiAgICAgICAgICAoaW5wdXQpPVwiaGFuZGxlRmlsdGVyQ2hhbmdlKCRldmVudClcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwid2FpdGluZy1saXN0XCI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IHBhcnRpY2lwYW50IG9mIHdhaXRpbmdSb29tTGlzdF9zXCJcclxuICAgICAgICAgIGNsYXNzPVwid2FpdGluZy1pdGVtXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sN1wiPnt7IHBhcnRpY2lwYW50Lm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wyXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImhhbmRsZUl0ZW1QcmVzcyhwYXJ0aWNpcGFudCwgdHJ1ZSlcIj5cclxuICAgICAgICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYUNoZWNrXCIgc2l6ZT1cImxnXCIgY29sb3I9XCJncmVlblwiPjwvZmEtaWNvbj5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wyXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImhhbmRsZUl0ZW1QcmVzcyhwYXJ0aWNpcGFudCwgZmFsc2UpXCI+XHJcbiAgICAgICAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFUaW1lc1wiIHNpemU9XCJsZ1wiIGNvbG9yPVwicmVkXCI+PC9mYS1pY29uPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbDFcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==