import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { RenderRequestComponent, } from '../render-request-component/render-request-component.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../methods/requests-methods/respond-to-requests.service";
import * as i2 from "@angular/common";
import * as i3 from "@fortawesome/angular-fontawesome";
/**
 * @component RequestsModal
 * @description A modal component to display and manage requests.
 *
 * @selector app-requests-modal
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, RenderRequestComponent]
 * @templateUrl ./requests-modal.component.html
 * @styleUrls ./requests-modal.component.css
 *
 * @property {boolean} isRequestsModalVisible - Determines if the requests modal is visible.
 * @property {number} requestCounter - Counter for the number of requests.
 * @property {Request[]} requestList - List of requests.
 * @property {string} roomName - Name of the room.
 * @property {Socket} socket - Socket instance for communication.
 * @property {string} backgroundColor - Background color of the modal.
 * @property {string} position - Position of the modal.
 * @property {any} parameters - Additional parameters for the modal.
 * @property {Function} onRequestClose - Callback function when the modal is closed.
 * @property {Function} onRequestFilterChange - Callback function when the request filter changes.
 * @property {Function} onRequestItemPress - Callback function when a request item is pressed.
 * @property {Function} updateRequestList - Function to update the request list.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for closing the modal.
 * @property {any[]} requestList_s - Filtered list of requests.
 * @property {number} requestCounter_s - Counter for the filtered list of requests.
 * @property {boolean} reRender - Flag to trigger re-rendering.
 *
 * @constructor
 * @param {RespondToRequests} respondToRequestsService - Service to handle request responses.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @param {SimpleChanges} changes - Object of current and previous property values.
 *
 * @method updateRequests - Updates the request list and counter based on the current parameters.
 * @method handleModalClose - Handles the modal close action.
 * @method handleFilterChange - Handles the filter change event.
 * @param {Event} event - The filter change event.
 */
export class RequestsModal {
    respondToRequestsService;
    isRequestsModalVisible = false;
    requestCounter = 0;
    requestList = [];
    roomName;
    socket = {};
    backgroundColor = '#83c0e9';
    position = 'topRight';
    parameters;
    onRequestClose;
    onRequestFilterChange;
    onRequestItemPress;
    updateRequestList;
    faTimes = faTimes;
    requestList_s = [];
    requestCounter_s = 0;
    reRender = false;
    constructor(respondToRequestsService) {
        this.respondToRequestsService = respondToRequestsService;
    }
    ngOnInit() {
        if (!this.onRequestItemPress) {
            this.onRequestItemPress = (params) => this.respondToRequestsService.respondToRequests(params);
        }
    }
    ngOnChanges(changes) {
        if (changes['requestList'] || changes['reRender'] || changes['requestCounter']) {
            this.updateRequests();
        }
        if (changes['isRequestsModalVisible'] && this.isRequestsModalVisible) {
            this.parameters = this.parameters.getUpdatedAllParams();
            this.updateRequests();
        }
    }
    updateRequests() {
        this.parameters = this.parameters.getUpdatedAllParams();
        this.requestList_s = this.parameters.filteredRequestList || [];
        this.requestCounter_s = this.parameters.filteredRequestList.length;
    }
    handleModalClose() {
        this.onRequestClose();
    }
    handleFilterChange(event) {
        const input = event.target;
        this.onRequestFilterChange(input.value);
        this.parameters = this.parameters.getUpdatedAllParams();
        this.reRender = !this.reRender;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RequestsModal, deps: [{ token: i1.RespondToRequests }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: RequestsModal, isStandalone: true, selector: "app-requests-modal", inputs: { isRequestsModalVisible: "isRequestsModalVisible", requestCounter: "requestCounter", requestList: "requestList", roomName: "roomName", socket: "socket", backgroundColor: "backgroundColor", position: "position", parameters: "parameters", onRequestClose: "onRequestClose", onRequestFilterChange: "onRequestFilterChange", onRequestItemPress: "onRequestItemPress", updateRequestList: "updateRequestList" }, usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"isRequestsModalVisible\" class=\"modal-container\" [ngStyle]=\"{'background-color': 'rgba(0, 0, 0, 0.5)'}\">\r\n  <div class=\"modal-content\" [ngStyle]=\"{'background-color': backgroundColor, 'top': position.includes('top') ? '10px' : 'auto', 'bottom': position.includes('bottom') ? '10px' : 'auto', 'left': position.includes('Left') ? '10px' : 'auto', 'right': position.includes('Right') ? '10px' : 'auto'}\">\r\n    <div class=\"modal-header\">\r\n      <div>\r\n        Requests <span class=\"badge text-dark\">{{ requestCounter_s }}</span>\r\n      </div>\r\n      <div class=\"close-icon\" (click)=\"handleModalClose()\">\r\n        <fa-icon [icon]=\"faTimes\" size=\"lg\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr class=\"separator\" />\r\n    <div class=\"modal-body\">\r\n      <input type=\"text\" class=\"filter-input\" placeholder=\"Search ...\" (input)=\"handleFilterChange($event)\">\r\n      <div class=\"request-list\">\r\n        <ng-container *ngFor=\"let requestItem of requestList_s; let i = index\">\r\n          <app-render-request-component\r\n            [request]=\"requestItem\"\r\n            [requestList]=\"requestList\"\r\n            [roomName]=\"roomName\"\r\n            [socket]=\"socket\"\r\n            [onRequestItemPress]=\"onRequestItemPress\"\r\n            [updateRequestList]=\"updateRequestList\">\r\n          </app-render-request-component>\r\n        </ng-container>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:block;z-index:999}.modal-content{position:fixed;background-color:#83c0e9;border-radius:10px;padding:10px;width:80%;max-width:350px;max-height:65%;overflow-y:auto;top:10px;right:10px}.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px}.modal-title{font-size:18px;font-weight:700;color:#000}.close-button{border:none;background:none;cursor:pointer}.separator{height:1px;background-color:#000;margin:5px 0}.modal-body{margin-bottom:20px}.filter-input{width:90%;padding:10px;border-radius:5px;border:1px solid #000;font-size:16px;margin-bottom:10px}.request-list{max-height:calc(100% - 150px);overflow-y:auto}.icon{font-size:20px;color:#000}.text-dark{color:#000}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i3.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }, { kind: "component", type: RenderRequestComponent, selector: "app-render-request-component", inputs: ["request", "requestList", "roomName", "socket", "onRequestItemPress", "updateRequestList"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RequestsModal, decorators: [{
            type: Component,
            args: [{ selector: 'app-requests-modal', standalone: true, imports: [CommonModule, FontAwesomeModule, RenderRequestComponent], template: "<div *ngIf=\"isRequestsModalVisible\" class=\"modal-container\" [ngStyle]=\"{'background-color': 'rgba(0, 0, 0, 0.5)'}\">\r\n  <div class=\"modal-content\" [ngStyle]=\"{'background-color': backgroundColor, 'top': position.includes('top') ? '10px' : 'auto', 'bottom': position.includes('bottom') ? '10px' : 'auto', 'left': position.includes('Left') ? '10px' : 'auto', 'right': position.includes('Right') ? '10px' : 'auto'}\">\r\n    <div class=\"modal-header\">\r\n      <div>\r\n        Requests <span class=\"badge text-dark\">{{ requestCounter_s }}</span>\r\n      </div>\r\n      <div class=\"close-icon\" (click)=\"handleModalClose()\">\r\n        <fa-icon [icon]=\"faTimes\" size=\"lg\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr class=\"separator\" />\r\n    <div class=\"modal-body\">\r\n      <input type=\"text\" class=\"filter-input\" placeholder=\"Search ...\" (input)=\"handleFilterChange($event)\">\r\n      <div class=\"request-list\">\r\n        <ng-container *ngFor=\"let requestItem of requestList_s; let i = index\">\r\n          <app-render-request-component\r\n            [request]=\"requestItem\"\r\n            [requestList]=\"requestList\"\r\n            [roomName]=\"roomName\"\r\n            [socket]=\"socket\"\r\n            [onRequestItemPress]=\"onRequestItemPress\"\r\n            [updateRequestList]=\"updateRequestList\">\r\n          </app-render-request-component>\r\n        </ng-container>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:block;z-index:999}.modal-content{position:fixed;background-color:#83c0e9;border-radius:10px;padding:10px;width:80%;max-width:350px;max-height:65%;overflow-y:auto;top:10px;right:10px}.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px}.modal-title{font-size:18px;font-weight:700;color:#000}.close-button{border:none;background:none;cursor:pointer}.separator{height:1px;background-color:#000;margin:5px 0}.modal-body{margin-bottom:20px}.filter-input{width:90%;padding:10px;border-radius:5px;border:1px solid #000;font-size:16px;margin-bottom:10px}.request-list{max-height:calc(100% - 150px);overflow-y:auto}.icon{font-size:20px;color:#000}.text-dark{color:#000}\n"] }]
        }], ctorParameters: () => [{ type: i1.RespondToRequests }], propDecorators: { isRequestsModalVisible: [{
                type: Input
            }], requestCounter: [{
                type: Input
            }], requestList: [{
                type: Input
            }], roomName: [{
                type: Input
            }], socket: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], position: [{
                type: Input
            }], parameters: [{
                type: Input
            }], onRequestClose: [{
                type: Input
            }], onRequestFilterChange: [{
                type: Input
            }], onRequestItemPress: [{
                type: Input
            }], updateRequestList: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdHMtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvcmVxdWVzdHMtY29tcG9uZW50cy9yZXF1ZXN0cy1tb2RhbC9yZXF1ZXN0cy1tb2RhbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9yZXF1ZXN0cy1jb21wb25lbnRzL3JlcXVlc3RzLW1vZGFsL3JlcXVlc3RzLW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzVELE9BQU8sRUFDTCxzQkFBc0IsR0FFdkIsTUFBTSxnRUFBZ0UsQ0FBQzs7Ozs7QUE4QnhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Q0c7QUFRSCxNQUFNLE9BQU8sYUFBYTtJQW1CSjtJQWxCWCxzQkFBc0IsR0FBRyxLQUFLLENBQUM7SUFDL0IsY0FBYyxHQUFHLENBQUMsQ0FBQztJQUNuQixXQUFXLEdBQWMsRUFBRSxDQUFDO0lBQzVCLFFBQVEsQ0FBVTtJQUNsQixNQUFNLEdBQVcsRUFBWSxDQUFDO0lBQzlCLGVBQWUsR0FBRyxTQUFTLENBQUM7SUFDNUIsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUN0QixVQUFVLENBQU07SUFDaEIsY0FBYyxDQUFjO0lBQzVCLHFCQUFxQixDQUE0QjtJQUNqRCxrQkFBa0IsQ0FBeUI7SUFDM0MsaUJBQWlCLENBQW1DO0lBRTdELE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDbEIsYUFBYSxHQUFVLEVBQUUsQ0FBQztJQUMxQixnQkFBZ0IsR0FBRyxDQUFDLENBQUM7SUFDckIsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUVqQixZQUFvQix3QkFBMkM7UUFBM0MsNkJBQXdCLEdBQXhCLHdCQUF3QixDQUFtQjtJQUFHLENBQUM7SUFFbkUsUUFBUTtRQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUN4QyxJQUFJLENBQUMsd0JBQXdCLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsQ0FBQztJQUNILENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksT0FBTyxDQUFDLFVBQVUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7WUFDL0UsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLENBQUM7UUFFRCxJQUFJLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQyxJQUFJLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBQ3hELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixDQUFDO0lBQ0gsQ0FBQztJQUVELGNBQWM7UUFDWixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLElBQUksRUFBRSxDQUFDO1FBQy9ELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQztJQUNyRSxDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxrQkFBa0IsQ0FBQyxLQUFZO1FBQzdCLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxNQUEwQixDQUFDO1FBQy9DLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDakMsQ0FBQzt1R0F0RFUsYUFBYTsyRkFBYixhQUFhLCtmQ3BGMUIscTlDQTRCQSxnMkJEb0RZLFlBQVksb1ZBQUUsaUJBQWlCLDZQQUFFLHNCQUFzQjs7MkZBSXRELGFBQWE7a0JBUHpCLFNBQVM7K0JBQ0Usb0JBQW9CLGNBQ2xCLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxzQkFBc0IsQ0FBQztzRkFLekQsc0JBQXNCO3NCQUE5QixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IGZhVGltZXMgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHtcbiAgUmVuZGVyUmVxdWVzdENvbXBvbmVudCxcbiAgUmVuZGVyUmVxdWVzdENvbXBvbmVudE9wdGlvbnMsXG59IGZyb20gJy4uL3JlbmRlci1yZXF1ZXN0LWNvbXBvbmVudC9yZW5kZXItcmVxdWVzdC1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7XG4gIFJlc3BvbmRUb1JlcXVlc3RzLFxuICBSZXNwb25kVG9SZXF1ZXN0c1R5cGUsXG59IGZyb20gJy4uLy4uLy4uL21ldGhvZHMvcmVxdWVzdHMtbWV0aG9kcy9yZXNwb25kLXRvLXJlcXVlc3RzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5pbXBvcnQgeyBSZXF1ZXN0IH0gZnJvbSAnLi4vLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0c01vZGFsUGFyYW1ldGVycyB7XG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IHsgZmlsdGVyZWRSZXF1ZXN0TGlzdDogUmVxdWVzdFtdIH07XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBSZXF1ZXN0c01vZGFsT3B0aW9ucyB7XG4gIGlzUmVxdWVzdHNNb2RhbFZpc2libGU6IGJvb2xlYW47XG4gIHJlcXVlc3RDb3VudGVyOiBudW1iZXI7XG4gIHJlcXVlc3RMaXN0OiBSZXF1ZXN0W107XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHNvY2tldDogU29ja2V0O1xuICBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcbiAgcG9zaXRpb246IHN0cmluZztcbiAgcGFyYW1ldGVyczogUmVxdWVzdHNNb2RhbFBhcmFtZXRlcnM7XG4gIG9uUmVxdWVzdENsb3NlOiAoKSA9PiB2b2lkO1xuICBvblJlcXVlc3RGaWx0ZXJDaGFuZ2U6IChmaWx0ZXI6IHN0cmluZykgPT4gdm9pZDtcbiAgb25SZXF1ZXN0SXRlbVByZXNzPzogUmVzcG9uZFRvUmVxdWVzdHNUeXBlO1xuICB1cGRhdGVSZXF1ZXN0TGlzdDogKG5ld1JlcXVlc3RMaXN0OiBhbnlbXSkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IHR5cGUgUmVxdWVzdHNNb2RhbFR5cGUgPSAob3B0aW9uczogUmVuZGVyUmVxdWVzdENvbXBvbmVudE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIEBjb21wb25lbnQgUmVxdWVzdHNNb2RhbFxuICogQGRlc2NyaXB0aW9uIEEgbW9kYWwgY29tcG9uZW50IHRvIGRpc3BsYXkgYW5kIG1hbmFnZSByZXF1ZXN0cy5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLXJlcXVlc3RzLW1vZGFsXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgUmVuZGVyUmVxdWVzdENvbXBvbmVudF1cbiAqIEB0ZW1wbGF0ZVVybCAuL3JlcXVlc3RzLW1vZGFsLmNvbXBvbmVudC5odG1sXG4gKiBAc3R5bGVVcmxzIC4vcmVxdWVzdHMtbW9kYWwuY29tcG9uZW50LmNzc1xuICpcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNSZXF1ZXN0c01vZGFsVmlzaWJsZSAtIERldGVybWluZXMgaWYgdGhlIHJlcXVlc3RzIG1vZGFsIGlzIHZpc2libGUuXG4gKiBAcHJvcGVydHkge251bWJlcn0gcmVxdWVzdENvdW50ZXIgLSBDb3VudGVyIGZvciB0aGUgbnVtYmVyIG9mIHJlcXVlc3RzLlxuICogQHByb3BlcnR5IHtSZXF1ZXN0W119IHJlcXVlc3RMaXN0IC0gTGlzdCBvZiByZXF1ZXN0cy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSByb29tTmFtZSAtIE5hbWUgb2YgdGhlIHJvb20uXG4gKiBAcHJvcGVydHkge1NvY2tldH0gc29ja2V0IC0gU29ja2V0IGluc3RhbmNlIGZvciBjb21tdW5pY2F0aW9uLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGJhY2tncm91bmRDb2xvciAtIEJhY2tncm91bmQgY29sb3Igb2YgdGhlIG1vZGFsLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBvc2l0aW9uIC0gUG9zaXRpb24gb2YgdGhlIG1vZGFsLlxuICogQHByb3BlcnR5IHthbnl9IHBhcmFtZXRlcnMgLSBBZGRpdGlvbmFsIHBhcmFtZXRlcnMgZm9yIHRoZSBtb2RhbC5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IG9uUmVxdWVzdENsb3NlIC0gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB0aGUgbW9kYWwgaXMgY2xvc2VkLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gb25SZXF1ZXN0RmlsdGVyQ2hhbmdlIC0gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiB0aGUgcmVxdWVzdCBmaWx0ZXIgY2hhbmdlcy5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IG9uUmVxdWVzdEl0ZW1QcmVzcyAtIENhbGxiYWNrIGZ1bmN0aW9uIHdoZW4gYSByZXF1ZXN0IGl0ZW0gaXMgcHJlc3NlZC5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IHVwZGF0ZVJlcXVlc3RMaXN0IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSByZXF1ZXN0IGxpc3QuXG4gKlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFUaW1lcyAtIEZvbnRBd2Vzb21lIGljb24gZm9yIGNsb3NpbmcgdGhlIG1vZGFsLlxuICogQHByb3BlcnR5IHthbnlbXX0gcmVxdWVzdExpc3RfcyAtIEZpbHRlcmVkIGxpc3Qgb2YgcmVxdWVzdHMuXG4gKiBAcHJvcGVydHkge251bWJlcn0gcmVxdWVzdENvdW50ZXJfcyAtIENvdW50ZXIgZm9yIHRoZSBmaWx0ZXJlZCBsaXN0IG9mIHJlcXVlc3RzLlxuICogQHByb3BlcnR5IHtib29sZWFufSByZVJlbmRlciAtIEZsYWcgdG8gdHJpZ2dlciByZS1yZW5kZXJpbmcuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge1Jlc3BvbmRUb1JlcXVlc3RzfSByZXNwb25kVG9SZXF1ZXN0c1NlcnZpY2UgLSBTZXJ2aWNlIHRvIGhhbmRsZSByZXF1ZXN0IHJlc3BvbnNlcy5cbiAqXG4gKiBAbWV0aG9kIG5nT25Jbml0IC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIGFyZSBpbml0aWFsaXplZC5cbiAqIEBtZXRob2QgbmdPbkNoYW5nZXMgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIGFueSBkYXRhLWJvdW5kIHByb3BlcnR5IGNoYW5nZXMuXG4gKiBAcGFyYW0ge1NpbXBsZUNoYW5nZXN9IGNoYW5nZXMgLSBPYmplY3Qgb2YgY3VycmVudCBhbmQgcHJldmlvdXMgcHJvcGVydHkgdmFsdWVzLlxuICpcbiAqIEBtZXRob2QgdXBkYXRlUmVxdWVzdHMgLSBVcGRhdGVzIHRoZSByZXF1ZXN0IGxpc3QgYW5kIGNvdW50ZXIgYmFzZWQgb24gdGhlIGN1cnJlbnQgcGFyYW1ldGVycy5cbiAqIEBtZXRob2QgaGFuZGxlTW9kYWxDbG9zZSAtIEhhbmRsZXMgdGhlIG1vZGFsIGNsb3NlIGFjdGlvbi5cbiAqIEBtZXRob2QgaGFuZGxlRmlsdGVyQ2hhbmdlIC0gSGFuZGxlcyB0aGUgZmlsdGVyIGNoYW5nZSBldmVudC5cbiAqIEBwYXJhbSB7RXZlbnR9IGV2ZW50IC0gVGhlIGZpbHRlciBjaGFuZ2UgZXZlbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1yZXF1ZXN0cy1tb2RhbCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlLCBSZW5kZXJSZXF1ZXN0Q29tcG9uZW50XSxcbiAgdGVtcGxhdGVVcmw6ICcuL3JlcXVlc3RzLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcmVxdWVzdHMtbW9kYWwuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBSZXF1ZXN0c01vZGFsIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBpc1JlcXVlc3RzTW9kYWxWaXNpYmxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHJlcXVlc3RDb3VudGVyID0gMDtcbiAgQElucHV0KCkgcmVxdWVzdExpc3Q6IFJlcXVlc3RbXSA9IFtdO1xuICBASW5wdXQoKSByb29tTmFtZSE6IHN0cmluZztcbiAgQElucHV0KCkgc29ja2V0OiBTb2NrZXQgPSB7fSBhcyBTb2NrZXQ7XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICcjODNjMGU5JztcbiAgQElucHV0KCkgcG9zaXRpb24gPSAndG9wUmlnaHQnO1xuICBASW5wdXQoKSBwYXJhbWV0ZXJzOiBhbnk7XG4gIEBJbnB1dCgpIG9uUmVxdWVzdENsb3NlITogKCkgPT4gdm9pZDtcbiAgQElucHV0KCkgb25SZXF1ZXN0RmlsdGVyQ2hhbmdlITogKGZpbHRlcjogc3RyaW5nKSA9PiB2b2lkO1xuICBASW5wdXQoKSBvblJlcXVlc3RJdGVtUHJlc3MhOiAocGFyYW1zOiBhbnkpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIHVwZGF0ZVJlcXVlc3RMaXN0ITogKG5ld1JlcXVlc3RMaXN0OiBhbnlbXSkgPT4gdm9pZDtcblxuICBmYVRpbWVzID0gZmFUaW1lcztcbiAgcmVxdWVzdExpc3RfczogYW55W10gPSBbXTtcbiAgcmVxdWVzdENvdW50ZXJfcyA9IDA7XG4gIHJlUmVuZGVyID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSByZXNwb25kVG9SZXF1ZXN0c1NlcnZpY2U6IFJlc3BvbmRUb1JlcXVlc3RzKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5vblJlcXVlc3RJdGVtUHJlc3MpIHtcbiAgICAgIHRoaXMub25SZXF1ZXN0SXRlbVByZXNzID0gKHBhcmFtczogYW55KSA9PlxuICAgICAgICB0aGlzLnJlc3BvbmRUb1JlcXVlc3RzU2VydmljZS5yZXNwb25kVG9SZXF1ZXN0cyhwYXJhbXMpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1sncmVxdWVzdExpc3QnXSB8fCBjaGFuZ2VzWydyZVJlbmRlciddIHx8IGNoYW5nZXNbJ3JlcXVlc3RDb3VudGVyJ10pIHtcbiAgICAgIHRoaXMudXBkYXRlUmVxdWVzdHMoKTtcbiAgICB9XG5cbiAgICBpZiAoY2hhbmdlc1snaXNSZXF1ZXN0c01vZGFsVmlzaWJsZSddICYmIHRoaXMuaXNSZXF1ZXN0c01vZGFsVmlzaWJsZSkge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzID0gdGhpcy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcbiAgICAgIHRoaXMudXBkYXRlUmVxdWVzdHMoKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVSZXF1ZXN0cygpIHtcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB0aGlzLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgIHRoaXMucmVxdWVzdExpc3RfcyA9IHRoaXMucGFyYW1ldGVycy5maWx0ZXJlZFJlcXVlc3RMaXN0IHx8IFtdO1xuICAgIHRoaXMucmVxdWVzdENvdW50ZXJfcyA9IHRoaXMucGFyYW1ldGVycy5maWx0ZXJlZFJlcXVlc3RMaXN0Lmxlbmd0aDtcbiAgfVxuXG4gIGhhbmRsZU1vZGFsQ2xvc2UoKSB7XG4gICAgdGhpcy5vblJlcXVlc3RDbG9zZSgpO1xuICB9XG5cbiAgaGFuZGxlRmlsdGVyQ2hhbmdlKGV2ZW50OiBFdmVudCkge1xuICAgIGNvbnN0IGlucHV0ID0gZXZlbnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgdGhpcy5vblJlcXVlc3RGaWx0ZXJDaGFuZ2UoaW5wdXQudmFsdWUpO1xuICAgIHRoaXMucGFyYW1ldGVycyA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgdGhpcy5yZVJlbmRlciA9ICF0aGlzLnJlUmVuZGVyO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0lmPVwiaXNSZXF1ZXN0c01vZGFsVmlzaWJsZVwiIGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogJ3JnYmEoMCwgMCwgMCwgMC41KSd9XCI+XHJcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBiYWNrZ3JvdW5kQ29sb3IsICd0b3AnOiBwb3NpdGlvbi5pbmNsdWRlcygndG9wJykgPyAnMTBweCcgOiAnYXV0bycsICdib3R0b20nOiBwb3NpdGlvbi5pbmNsdWRlcygnYm90dG9tJykgPyAnMTBweCcgOiAnYXV0bycsICdsZWZ0JzogcG9zaXRpb24uaW5jbHVkZXMoJ0xlZnQnKSA/ICcxMHB4JyA6ICdhdXRvJywgJ3JpZ2h0JzogcG9zaXRpb24uaW5jbHVkZXMoJ1JpZ2h0JykgPyAnMTBweCcgOiAnYXV0byd9XCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgUmVxdWVzdHMgPHNwYW4gY2xhc3M9XCJiYWRnZSB0ZXh0LWRhcmtcIj57eyByZXF1ZXN0Q291bnRlcl9zIH19PC9zcGFuPlxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiBjbGFzcz1cImNsb3NlLWljb25cIiAoY2xpY2spPVwiaGFuZGxlTW9kYWxDbG9zZSgpXCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFUaW1lc1wiIHNpemU9XCJsZ1wiPjwvZmEtaWNvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxociBjbGFzcz1cInNlcGFyYXRvclwiIC8+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBjbGFzcz1cImZpbHRlci1pbnB1dFwiIHBsYWNlaG9sZGVyPVwiU2VhcmNoIC4uLlwiIChpbnB1dCk9XCJoYW5kbGVGaWx0ZXJDaGFuZ2UoJGV2ZW50KVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwicmVxdWVzdC1saXN0XCI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdGb3I9XCJsZXQgcmVxdWVzdEl0ZW0gb2YgcmVxdWVzdExpc3RfczsgbGV0IGkgPSBpbmRleFwiPlxyXG4gICAgICAgICAgPGFwcC1yZW5kZXItcmVxdWVzdC1jb21wb25lbnRcclxuICAgICAgICAgICAgW3JlcXVlc3RdPVwicmVxdWVzdEl0ZW1cIlxyXG4gICAgICAgICAgICBbcmVxdWVzdExpc3RdPVwicmVxdWVzdExpc3RcIlxyXG4gICAgICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWVcIlxyXG4gICAgICAgICAgICBbc29ja2V0XT1cInNvY2tldFwiXHJcbiAgICAgICAgICAgIFtvblJlcXVlc3RJdGVtUHJlc3NdPVwib25SZXF1ZXN0SXRlbVByZXNzXCJcclxuICAgICAgICAgICAgW3VwZGF0ZVJlcXVlc3RMaXN0XT1cInVwZGF0ZVJlcXVlc3RMaXN0XCI+XHJcbiAgICAgICAgICA8L2FwcC1yZW5kZXItcmVxdWVzdC1jb21wb25lbnQ+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=