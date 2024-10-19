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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FpdGluZy1yb29tLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL3dhaXRpbmctY29tcG9uZW50cy93YWl0aW5nLXJvb20tbW9kYWwuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvd2FpdGluZy1jb21wb25lbnRzL3dhaXRpbmctcm9vbS1tb2RhbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5REFBeUQ7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7QUEyQzdDLE1BQU0sT0FBTyxnQkFBZ0I7SUFDUDtJQUFwQixZQUFvQix1QkFBeUM7UUFBekMsNEJBQXVCLEdBQXZCLHVCQUF1QixDQUFrQjtJQUFHLENBQUM7SUFFeEQscUJBQXFCLEdBQUcsS0FBSyxDQUFDO0lBQzlCLGtCQUFrQixHQUFHLENBQUMsQ0FBQztJQUN2QixlQUFlLEdBQTZCLEVBQUUsQ0FBQztJQUMvQyxRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2QsTUFBTSxHQUFXLEVBQVksQ0FBQztJQUM5QixRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3RCLGVBQWUsR0FBRyxTQUFTLENBQUM7SUFDNUIsVUFBVSxHQUErQixFQUFnQyxDQUFDO0lBQzFF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OzJGQUkzQyxnQkFBZ0I7a0JBUDVCLFNBQVM7K0JBQ0Usd0JBQXdCLGNBQ3RCLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxXQUFXLENBQUM7cUZBTzlDLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0cseUJBQXlCO3NCQUFqQyxLQUFLO2dCQUNHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFDRyxzQkFBc0I7c0JBQTlCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcywgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYVRpbWVzLCBmYUNoZWNrIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgV2FpdGluZ1Jvb21QYXJ0aWNpcGFudCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5pbXBvcnQge1xuICBSZXNwb25kVG9XYWl0aW5nLFxuICBSZXNwb25kVG9XYWl0aW5nT3B0aW9ucyxcbiAgUmVzcG9uZFRvV2FpdGluZ1R5cGUsXG59IGZyb20gJy4uLy4uL21ldGhvZHMvd2FpdGluZy1tZXRob2RzL3Jlc3BvbmQtdG8td2FpdGluZy5zZXJ2aWNlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFdhaXRpbmdSb29tTW9kYWxQYXJhbWV0ZXJzIHtcbiAgZmlsdGVyZWRXYWl0aW5nUm9vbUxpc3Q6IFdhaXRpbmdSb29tUGFydGljaXBhbnRbXTtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gV2FpdGluZ1Jvb21Nb2RhbFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBXYWl0aW5nUm9vbU1vZGFsT3B0aW9ucyB7XG4gIGlzV2FpdGluZ01vZGFsVmlzaWJsZTogYm9vbGVhbjtcbiAgb25XYWl0aW5nUm9vbUNsb3NlOiAoKSA9PiB2b2lkO1xuICB3YWl0aW5nUm9vbUNvdW50ZXI6IG51bWJlcjtcbiAgb25XYWl0aW5nUm9vbUZpbHRlckNoYW5nZTogKGZpbHRlcjogc3RyaW5nKSA9PiB2b2lkO1xuICB3YWl0aW5nUm9vbUxpc3Q6IFdhaXRpbmdSb29tUGFydGljaXBhbnRbXTtcbiAgdXBkYXRlV2FpdGluZ0xpc3Q6ICh1cGRhdGVkTGlzdDogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgcG9zaXRpb24/OiBzdHJpbmc7XG4gIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgcGFyYW1ldGVyczogV2FpdGluZ1Jvb21Nb2RhbFBhcmFtZXRlcnM7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIG9uV2FpdGluZ1Jvb21JdGVtUHJlc3M/OiBSZXNwb25kVG9XYWl0aW5nVHlwZTtcbn1cblxuZXhwb3J0IHR5cGUgV2FpdGluZ1Jvb21Nb2RhbFR5cGUgPSAob3B0aW9uczogV2FpdGluZ1Jvb21Nb2RhbE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtd2FpdGluZy1yb29tLW1vZGFsJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGUsIEZvcm1zTW9kdWxlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3dhaXRpbmctcm9vbS1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3dhaXRpbmctcm9vbS1tb2RhbC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFdhaXRpbmdSb29tTW9kYWwgaW1wbGVtZW50cyBPbkNoYW5nZXMsIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVzcG9uZFRvV2FpdGluZ1NlcnZpY2U6IFJlc3BvbmRUb1dhaXRpbmcpIHt9XG5cbiAgQElucHV0KCkgaXNXYWl0aW5nTW9kYWxWaXNpYmxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHdhaXRpbmdSb29tQ291bnRlciA9IDA7XG4gIEBJbnB1dCgpIHdhaXRpbmdSb29tTGlzdDogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdID0gW107XG4gIEBJbnB1dCgpIHJvb21OYW1lID0gJyc7XG4gIEBJbnB1dCgpIHNvY2tldDogU29ja2V0ID0ge30gYXMgU29ja2V0O1xuICBASW5wdXQoKSBwb3NpdGlvbiA9ICd0b3BSaWdodCc7XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICcjODNjMGU5JztcbiAgQElucHV0KCkgcGFyYW1ldGVyczogV2FpdGluZ1Jvb21Nb2RhbFBhcmFtZXRlcnMgPSB7fSBhcyBXYWl0aW5nUm9vbU1vZGFsUGFyYW1ldGVycztcbiAgQElucHV0KCkgb25XYWl0aW5nUm9vbUNsb3NlOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIEBJbnB1dCgpIG9uV2FpdGluZ1Jvb21GaWx0ZXJDaGFuZ2U6ICh2YWx1ZTogc3RyaW5nKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIEBJbnB1dCgpIHVwZGF0ZVdhaXRpbmdMaXN0OiAoZGF0YTogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIEBJbnB1dCgpIG9uV2FpdGluZ1Jvb21JdGVtUHJlc3MhOiAoZGF0YTogUmVzcG9uZFRvV2FpdGluZ09wdGlvbnMpID0+IHZvaWQ7XG5cbiAgZmFUaW1lcyA9IGZhVGltZXM7XG4gIGZhQ2hlY2sgPSBmYUNoZWNrO1xuICB3YWl0aW5nUm9vbUxpc3RfczogV2FpdGluZ1Jvb21QYXJ0aWNpcGFudFtdID0gW107XG4gIHdhaXRpbmdSb29tQ291bnRlcl9zID0gMDtcbiAgcmVSZW5kZXIgPSBmYWxzZTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMub25XYWl0aW5nUm9vbUl0ZW1QcmVzcykge1xuICAgICAgdGhpcy5vbldhaXRpbmdSb29tSXRlbVByZXNzID0gKGRhdGE6IGFueSkgPT5cbiAgICAgICAgdGhpcy5yZXNwb25kVG9XYWl0aW5nU2VydmljZS5yZXNwb25kVG9XYWl0aW5nKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1snd2FpdGluZ1Jvb21MaXN0J10gfHwgY2hhbmdlc1sncmVSZW5kZXInXSkge1xuICAgICAgdGhpcy51cGRhdGVQYXJhbWV0ZXJzKCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlUGFyYW1ldGVycygpIHtcbiAgICBsZXQgeyBnZXRVcGRhdGVkQWxsUGFyYW1zIH0gPSB0aGlzLnBhcmFtZXRlcnM7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgdGhpcy53YWl0aW5nUm9vbUxpc3RfcyA9IHRoaXMucGFyYW1ldGVycy5maWx0ZXJlZFdhaXRpbmdSb29tTGlzdDtcbiAgICB0aGlzLndhaXRpbmdSb29tQ291bnRlcl9zID0gdGhpcy5wYXJhbWV0ZXJzLmZpbHRlcmVkV2FpdGluZ1Jvb21MaXN0Lmxlbmd0aDtcbiAgfVxuXG4gIGhhbmRsZU1vZGFsQ2xvc2UoKSB7XG4gICAgdGhpcy5vbldhaXRpbmdSb29tQ2xvc2UoKTtcbiAgfVxuXG4gIGhhbmRsZUZpbHRlckNoYW5nZShldmVudDogRXZlbnQpIHtcbiAgICBjb25zdCBpbnB1dEVsZW1lbnQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCB2YWx1ZSA9IGlucHV0RWxlbWVudD8udmFsdWUgfHwgJyc7XG4gICAgdGhpcy5vbldhaXRpbmdSb29tRmlsdGVyQ2hhbmdlKHZhbHVlKTtcbiAgICB0aGlzLnJlUmVuZGVyID0gIXRoaXMucmVSZW5kZXI7XG4gIH1cblxuICBoYW5kbGVJdGVtUHJlc3MocGFydGljaXBhbnQ6IFdhaXRpbmdSb29tUGFydGljaXBhbnQsIHR5cGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLm9uV2FpdGluZ1Jvb21JdGVtUHJlc3Moe1xuICAgICAgcGFydGljaXBhbnRJZDogcGFydGljaXBhbnQuaWQsXG4gICAgICBwYXJ0aWNpcGFudE5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICB1cGRhdGVXYWl0aW5nTGlzdDogdGhpcy51cGRhdGVXYWl0aW5nTGlzdCxcbiAgICAgIHdhaXRpbmdMaXN0OiB0aGlzLndhaXRpbmdSb29tTGlzdCxcbiAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLFxuICAgICAgdHlwZTogdHlwZSwgLy8gdHJ1ZSBmb3IgYWNjZXB0ZWQsIGZhbHNlIGZvciByZWplY3RlZFxuICAgICAgc29ja2V0OiB0aGlzLnNvY2tldCxcbiAgICB9KTtcbiAgfVxuXG4gIGdldCBtb2RhbENvbnRhaW5lclN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIHRvcDogJzAnLFxuICAgICAgbGVmdDogJzAnLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjUpJyxcbiAgICAgIGRpc3BsYXk6IHRoaXMuaXNXYWl0aW5nTW9kYWxWaXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgIHpJbmRleDogJzk5OScsXG4gICAgfTtcbiAgfVxuXG4gIGdldCBtb2RhbENvbnRlbnRTdHlsZSgpIHtcbiAgICBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBtb2RhbFdpZHRoID0gMC44ICogc2NyZWVuV2lkdGg7XG4gICAgaWYgKG1vZGFsV2lkdGggPiAzNTApIHtcbiAgICAgIG1vZGFsV2lkdGggPSAzNTA7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBib3JkZXJSYWRpdXM6ICcxMHB4JyxcbiAgICAgIHBhZGRpbmc6ICcxMHB4JyxcbiAgICAgIHdpZHRoOiBgJHttb2RhbFdpZHRofXB4YCxcbiAgICAgIG1heEhlaWdodDogJzY1JScsXG4gICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgIHRvcDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygndG9wJykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICBib3R0b206IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ2JvdHRvbScpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgbGVmdDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnTGVmdCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgcmlnaHQ6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ1JpZ2h0JykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgfTtcbiAgfVxuXG4gIGdldCBpbnB1dFN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICB3aWR0aDogJzkwJScsXG4gICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICBib3JkZXJSYWRpdXM6ICc1cHgnLFxuICAgICAgYm9yZGVyOiAnMXB4IHNvbGlkICMwMDAnLFxuICAgICAgZm9udFNpemU6ICcxNnB4JyxcbiAgICAgIG1hcmdpbkJvdHRvbTogJzEwcHgnLFxuICAgIH07XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJpc1dhaXRpbmdNb2RhbFZpc2libGVcIiBbbmdTdHlsZV09XCJtb2RhbENvbnRhaW5lclN0eWxlXCI+XHJcbiAgPGRpdiBbbmdTdHlsZV09XCJtb2RhbENvbnRlbnRTdHlsZVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtdGl0bGVcIj5cclxuICAgICAgICBXYWl0aW5nIDxzcGFuIGNsYXNzPVwiYmFkZ2VcIj57eyB3YWl0aW5nUm9vbUNvdW50ZXJfcyB9fTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKGNsaWNrKT1cImhhbmRsZU1vZGFsQ2xvc2UoKVwiIGNsYXNzPVwiYnRuLWNsb3NlLXdhaXRpbmdzXCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFUaW1lc1wiIGNsYXNzPVwiaWNvblwiPjwvZmEtaWNvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxociBjbGFzcz1cImhyXCIgLz5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgICAgPGlucHV0XHJcbiAgICAgICAgICBjbGFzcz1cImZvcm0tY29udHJvbFwiXHJcbiAgICAgICAgICBbbmdTdHlsZV09XCJpbnB1dFN0eWxlXCJcclxuICAgICAgICAgIHBsYWNlaG9sZGVyPVwiU2VhcmNoIC4uLlwiXHJcbiAgICAgICAgICAoaW5wdXQpPVwiaGFuZGxlRmlsdGVyQ2hhbmdlKCRldmVudClcIlxyXG4gICAgICAgIC8+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwid2FpdGluZy1saXN0XCI+XHJcbiAgICAgICAgPGRpdlxyXG4gICAgICAgICAgKm5nRm9yPVwibGV0IHBhcnRpY2lwYW50IG9mIHdhaXRpbmdSb29tTGlzdF9zXCJcclxuICAgICAgICAgIGNsYXNzPVwid2FpdGluZy1pdGVtXCJcclxuICAgICAgICA+XHJcbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiY29sN1wiPnt7IHBhcnRpY2lwYW50Lm5hbWUgfX08L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wyXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImhhbmRsZUl0ZW1QcmVzcyhwYXJ0aWNpcGFudCwgdHJ1ZSlcIj5cclxuICAgICAgICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYUNoZWNrXCIgc2l6ZT1cImxnXCIgY29sb3I9XCJncmVlblwiPjwvZmEtaWNvbj5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb2wyXCI+XHJcbiAgICAgICAgICAgIDxidXR0b24gKGNsaWNrKT1cImhhbmRsZUl0ZW1QcmVzcyhwYXJ0aWNpcGFudCwgZmFsc2UpXCI+XHJcbiAgICAgICAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFUaW1lc1wiIHNpemU9XCJsZ1wiIGNvbG9yPVwicmVkXCI+PC9mYS1pY29uPlxyXG4gICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgPGRpdiBjbGFzcz1cImNvbDFcIj48L2Rpdj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==