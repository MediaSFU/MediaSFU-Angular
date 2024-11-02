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
 * @example
 * ```html
 * <app-requests-modal
 *   [isRequestsModalVisible]="isModalVisible"
 *   [requestCounter]="requestCounter"
 *   [requestList]="requests"
 *   [roomName]="roomName"
 *   [socket]="socket"
 *   [backgroundColor]="'#83c0e9'"
 *   [position]="'topRight'"
 *   [parameters]="requestParams"
 *   (onRequestClose)="handleModalClose()"
 *   (onRequestFilterChange)="handleFilterChange($event)"
 *   (onRequestItemPress)="handleRequestPress($event)"
 *   [updateRequestList]="updateRequestList">
 * </app-requests-modal>
 * ```
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVxdWVzdHMtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvcmVxdWVzdHMtY29tcG9uZW50cy9yZXF1ZXN0cy1tb2RhbC9yZXF1ZXN0cy1tb2RhbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9yZXF1ZXN0cy1jb21wb25lbnRzL3JlcXVlc3RzLW1vZGFsL3JlcXVlc3RzLW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzVELE9BQU8sRUFDTCxzQkFBc0IsR0FFdkIsTUFBTSxnRUFBZ0UsQ0FBQzs7Ozs7QUE4QnhFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdERztBQVFILE1BQU0sT0FBTyxhQUFhO0lBbUJKO0lBbEJYLHNCQUFzQixHQUFHLEtBQUssQ0FBQztJQUMvQixjQUFjLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLFdBQVcsR0FBYyxFQUFFLENBQUM7SUFDNUIsUUFBUSxDQUFVO0lBQ2xCLE1BQU0sR0FBVyxFQUFZLENBQUM7SUFDOUIsZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUM1QixRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3RCLFVBQVUsQ0FBTTtJQUNoQixjQUFjLENBQWM7SUFDNUIscUJBQXFCLENBQTRCO0lBQ2pELGtCQUFrQixDQUF5QjtJQUMzQyxpQkFBaUIsQ0FBbUM7SUFFN0QsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNsQixhQUFhLEdBQVUsRUFBRSxDQUFDO0lBQzFCLGdCQUFnQixHQUFHLENBQUMsQ0FBQztJQUNyQixRQUFRLEdBQUcsS0FBSyxDQUFDO0lBRWpCLFlBQW9CLHdCQUEyQztRQUEzQyw2QkFBd0IsR0FBeEIsd0JBQXdCLENBQW1CO0lBQUcsQ0FBQztJQUVuRSxRQUFRO1FBQ04sSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1lBQzdCLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLE1BQVcsRUFBRSxFQUFFLENBQ3hDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1RCxDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQyxhQUFhLENBQUMsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksT0FBTyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQztZQUMvRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsQ0FBQztRQUVELElBQUksT0FBTyxDQUFDLHdCQUF3QixDQUFDLElBQUksSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFDckUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7WUFDeEQsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLENBQUM7SUFDSCxDQUFDO0lBRUQsY0FBYztRQUNaLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3hELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsSUFBSSxFQUFFLENBQUM7UUFDL0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDO0lBQ3JFLENBQUM7SUFFRCxnQkFBZ0I7UUFDZCxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELGtCQUFrQixDQUFDLEtBQVk7UUFDN0IsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE1BQTBCLENBQUM7UUFDL0MsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUN4RCxJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNqQyxDQUFDO3VHQXREVSxhQUFhOzJGQUFiLGFBQWEsK2ZDckcxQixxOUNBNEJBLGcyQkRxRVksWUFBWSxvVkFBRSxpQkFBaUIsNlBBQUUsc0JBQXNCOzsyRkFJdEQsYUFBYTtrQkFQekIsU0FBUzsrQkFDRSxvQkFBb0IsY0FDbEIsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLHNCQUFzQixDQUFDO3NGQUt6RCxzQkFBc0I7c0JBQTlCLEtBQUs7Z0JBQ0csY0FBYztzQkFBdEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLGNBQWM7c0JBQXRCLEtBQUs7Z0JBQ0cscUJBQXFCO3NCQUE3QixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxpQkFBaUI7c0JBQXpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgZmFUaW1lcyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQge1xuICBSZW5kZXJSZXF1ZXN0Q29tcG9uZW50LFxuICBSZW5kZXJSZXF1ZXN0Q29tcG9uZW50T3B0aW9ucyxcbn0gZnJvbSAnLi4vcmVuZGVyLXJlcXVlc3QtY29tcG9uZW50L3JlbmRlci1yZXF1ZXN0LWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgUmVzcG9uZFRvUmVxdWVzdHMsXG4gIFJlc3BvbmRUb1JlcXVlc3RzVHlwZSxcbn0gZnJvbSAnLi4vLi4vLi4vbWV0aG9kcy9yZXF1ZXN0cy1tZXRob2RzL3Jlc3BvbmQtdG8tcmVxdWVzdHMuc2VydmljZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IFJlcXVlc3QgfSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RzTW9kYWxQYXJhbWV0ZXJzIHtcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4geyBmaWx0ZXJlZFJlcXVlc3RMaXN0OiBSZXF1ZXN0W10gfTtcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFJlcXVlc3RzTW9kYWxPcHRpb25zIHtcbiAgaXNSZXF1ZXN0c01vZGFsVmlzaWJsZTogYm9vbGVhbjtcbiAgcmVxdWVzdENvdW50ZXI6IG51bWJlcjtcbiAgcmVxdWVzdExpc3Q6IFJlcXVlc3RbXTtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuICBwb3NpdGlvbjogc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBSZXF1ZXN0c01vZGFsUGFyYW1ldGVycztcbiAgb25SZXF1ZXN0Q2xvc2U6ICgpID0+IHZvaWQ7XG4gIG9uUmVxdWVzdEZpbHRlckNoYW5nZTogKGZpbHRlcjogc3RyaW5nKSA9PiB2b2lkO1xuICBvblJlcXVlc3RJdGVtUHJlc3M/OiBSZXNwb25kVG9SZXF1ZXN0c1R5cGU7XG4gIHVwZGF0ZVJlcXVlc3RMaXN0OiAobmV3UmVxdWVzdExpc3Q6IGFueVtdKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgdHlwZSBSZXF1ZXN0c01vZGFsVHlwZSA9IChvcHRpb25zOiBSZW5kZXJSZXF1ZXN0Q29tcG9uZW50T3B0aW9ucykgPT4gSFRNTEVsZW1lbnQ7XG5cbi8qKlxuICogQGNvbXBvbmVudCBSZXF1ZXN0c01vZGFsXG4gKiBAZGVzY3JpcHRpb24gQSBtb2RhbCBjb21wb25lbnQgdG8gZGlzcGxheSBhbmQgbWFuYWdlIHJlcXVlc3RzLlxuICpcbiAqIEBzZWxlY3RvciBhcHAtcmVxdWVzdHMtbW9kYWxcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlLCBSZW5kZXJSZXF1ZXN0Q29tcG9uZW50XVxuICogQHRlbXBsYXRlVXJsIC4vcmVxdWVzdHMtbW9kYWwuY29tcG9uZW50Lmh0bWxcbiAqIEBzdHlsZVVybHMgLi9yZXF1ZXN0cy1tb2RhbC5jb21wb25lbnQuY3NzXG4gKlxuICogQHByb3BlcnR5IHtib29sZWFufSBpc1JlcXVlc3RzTW9kYWxWaXNpYmxlIC0gRGV0ZXJtaW5lcyBpZiB0aGUgcmVxdWVzdHMgbW9kYWwgaXMgdmlzaWJsZS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSByZXF1ZXN0Q291bnRlciAtIENvdW50ZXIgZm9yIHRoZSBudW1iZXIgb2YgcmVxdWVzdHMuXG4gKiBAcHJvcGVydHkge1JlcXVlc3RbXX0gcmVxdWVzdExpc3QgLSBMaXN0IG9mIHJlcXVlc3RzLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHJvb21OYW1lIC0gTmFtZSBvZiB0aGUgcm9vbS5cbiAqIEBwcm9wZXJ0eSB7U29ja2V0fSBzb2NrZXQgLSBTb2NrZXQgaW5zdGFuY2UgZm9yIGNvbW11bmljYXRpb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYmFja2dyb3VuZENvbG9yIC0gQmFja2dyb3VuZCBjb2xvciBvZiB0aGUgbW9kYWwuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcG9zaXRpb24gLSBQb3NpdGlvbiBvZiB0aGUgbW9kYWwuXG4gKiBAcHJvcGVydHkge2FueX0gcGFyYW1ldGVycyAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycyBmb3IgdGhlIG1vZGFsLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gb25SZXF1ZXN0Q2xvc2UgLSBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHRoZSBtb2RhbCBpcyBjbG9zZWQuXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBvblJlcXVlc3RGaWx0ZXJDaGFuZ2UgLSBDYWxsYmFjayBmdW5jdGlvbiB3aGVuIHRoZSByZXF1ZXN0IGZpbHRlciBjaGFuZ2VzLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gb25SZXF1ZXN0SXRlbVByZXNzIC0gQ2FsbGJhY2sgZnVuY3Rpb24gd2hlbiBhIHJlcXVlc3QgaXRlbSBpcyBwcmVzc2VkLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gdXBkYXRlUmVxdWVzdExpc3QgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIHJlcXVlc3QgbGlzdC5cbiAqXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVRpbWVzIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgY2xvc2luZyB0aGUgbW9kYWwuXG4gKiBAcHJvcGVydHkge2FueVtdfSByZXF1ZXN0TGlzdF9zIC0gRmlsdGVyZWQgbGlzdCBvZiByZXF1ZXN0cy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSByZXF1ZXN0Q291bnRlcl9zIC0gQ291bnRlciBmb3IgdGhlIGZpbHRlcmVkIGxpc3Qgb2YgcmVxdWVzdHMuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHJlUmVuZGVyIC0gRmxhZyB0byB0cmlnZ2VyIHJlLXJlbmRlcmluZy5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7UmVzcG9uZFRvUmVxdWVzdHN9IHJlc3BvbmRUb1JlcXVlc3RzU2VydmljZSAtIFNlcnZpY2UgdG8gaGFuZGxlIHJlcXVlc3QgcmVzcG9uc2VzLlxuICpcbiAqIEBtZXRob2QgbmdPbkluaXQgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBkYXRhLWJvdW5kIHByb3BlcnRpZXMgYXJlIGluaXRpYWxpemVkLlxuICogQG1ldGhvZCBuZ09uQ2hhbmdlcyAtIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgcHJvcGVydHkgY2hhbmdlcy5cbiAqIEBwYXJhbSB7U2ltcGxlQ2hhbmdlc30gY2hhbmdlcyAtIE9iamVjdCBvZiBjdXJyZW50IGFuZCBwcmV2aW91cyBwcm9wZXJ0eSB2YWx1ZXMuXG4gKlxuICogQG1ldGhvZCB1cGRhdGVSZXF1ZXN0cyAtIFVwZGF0ZXMgdGhlIHJlcXVlc3QgbGlzdCBhbmQgY291bnRlciBiYXNlZCBvbiB0aGUgY3VycmVudCBwYXJhbWV0ZXJzLlxuICogQG1ldGhvZCBoYW5kbGVNb2RhbENsb3NlIC0gSGFuZGxlcyB0aGUgbW9kYWwgY2xvc2UgYWN0aW9uLlxuICogQG1ldGhvZCBoYW5kbGVGaWx0ZXJDaGFuZ2UgLSBIYW5kbGVzIHRoZSBmaWx0ZXIgY2hhbmdlIGV2ZW50LlxuICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBUaGUgZmlsdGVyIGNoYW5nZSBldmVudC5cbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLXJlcXVlc3RzLW1vZGFsXG4gKiAgIFtpc1JlcXVlc3RzTW9kYWxWaXNpYmxlXT1cImlzTW9kYWxWaXNpYmxlXCJcbiAqICAgW3JlcXVlc3RDb3VudGVyXT1cInJlcXVlc3RDb3VudGVyXCJcbiAqICAgW3JlcXVlc3RMaXN0XT1cInJlcXVlc3RzXCJcbiAqICAgW3Jvb21OYW1lXT1cInJvb21OYW1lXCJcbiAqICAgW3NvY2tldF09XCJzb2NrZXRcIlxuICogICBbYmFja2dyb3VuZENvbG9yXT1cIicjODNjMGU5J1wiXG4gKiAgIFtwb3NpdGlvbl09XCIndG9wUmlnaHQnXCJcbiAqICAgW3BhcmFtZXRlcnNdPVwicmVxdWVzdFBhcmFtc1wiXG4gKiAgIChvblJlcXVlc3RDbG9zZSk9XCJoYW5kbGVNb2RhbENsb3NlKClcIlxuICogICAob25SZXF1ZXN0RmlsdGVyQ2hhbmdlKT1cImhhbmRsZUZpbHRlckNoYW5nZSgkZXZlbnQpXCJcbiAqICAgKG9uUmVxdWVzdEl0ZW1QcmVzcyk9XCJoYW5kbGVSZXF1ZXN0UHJlc3MoJGV2ZW50KVwiXG4gKiAgIFt1cGRhdGVSZXF1ZXN0TGlzdF09XCJ1cGRhdGVSZXF1ZXN0TGlzdFwiPlxuICogPC9hcHAtcmVxdWVzdHMtbW9kYWw+XG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXJlcXVlc3RzLW1vZGFsJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGUsIFJlbmRlclJlcXVlc3RDb21wb25lbnRdLFxuICB0ZW1wbGF0ZVVybDogJy4vcmVxdWVzdHMtbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9yZXF1ZXN0cy1tb2RhbC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFJlcXVlc3RzTW9kYWwgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGlzUmVxdWVzdHNNb2RhbFZpc2libGUgPSBmYWxzZTtcbiAgQElucHV0KCkgcmVxdWVzdENvdW50ZXIgPSAwO1xuICBASW5wdXQoKSByZXF1ZXN0TGlzdDogUmVxdWVzdFtdID0gW107XG4gIEBJbnB1dCgpIHJvb21OYW1lITogc3RyaW5nO1xuICBASW5wdXQoKSBzb2NrZXQ6IFNvY2tldCA9IHt9IGFzIFNvY2tldDtcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJyM4M2MwZTknO1xuICBASW5wdXQoKSBwb3NpdGlvbiA9ICd0b3BSaWdodCc7XG4gIEBJbnB1dCgpIHBhcmFtZXRlcnM6IGFueTtcbiAgQElucHV0KCkgb25SZXF1ZXN0Q2xvc2UhOiAoKSA9PiB2b2lkO1xuICBASW5wdXQoKSBvblJlcXVlc3RGaWx0ZXJDaGFuZ2UhOiAoZmlsdGVyOiBzdHJpbmcpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIG9uUmVxdWVzdEl0ZW1QcmVzcyE6IChwYXJhbXM6IGFueSkgPT4gdm9pZDtcbiAgQElucHV0KCkgdXBkYXRlUmVxdWVzdExpc3QhOiAobmV3UmVxdWVzdExpc3Q6IGFueVtdKSA9PiB2b2lkO1xuXG4gIGZhVGltZXMgPSBmYVRpbWVzO1xuICByZXF1ZXN0TGlzdF9zOiBhbnlbXSA9IFtdO1xuICByZXF1ZXN0Q291bnRlcl9zID0gMDtcbiAgcmVSZW5kZXIgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlc3BvbmRUb1JlcXVlc3RzU2VydmljZTogUmVzcG9uZFRvUmVxdWVzdHMpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLm9uUmVxdWVzdEl0ZW1QcmVzcykge1xuICAgICAgdGhpcy5vblJlcXVlc3RJdGVtUHJlc3MgPSAocGFyYW1zOiBhbnkpID0+XG4gICAgICAgIHRoaXMucmVzcG9uZFRvUmVxdWVzdHNTZXJ2aWNlLnJlc3BvbmRUb1JlcXVlc3RzKHBhcmFtcyk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xuICAgIGlmIChjaGFuZ2VzWydyZXF1ZXN0TGlzdCddIHx8IGNoYW5nZXNbJ3JlUmVuZGVyJ10gfHwgY2hhbmdlc1sncmVxdWVzdENvdW50ZXInXSkge1xuICAgICAgdGhpcy51cGRhdGVSZXF1ZXN0cygpO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWydpc1JlcXVlc3RzTW9kYWxWaXNpYmxlJ10gJiYgdGhpcy5pc1JlcXVlc3RzTW9kYWxWaXNpYmxlKSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMgPSB0aGlzLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgICAgdGhpcy51cGRhdGVSZXF1ZXN0cygpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVJlcXVlc3RzKCkge1xuICAgIHRoaXMucGFyYW1ldGVycyA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgdGhpcy5yZXF1ZXN0TGlzdF9zID0gdGhpcy5wYXJhbWV0ZXJzLmZpbHRlcmVkUmVxdWVzdExpc3QgfHwgW107XG4gICAgdGhpcy5yZXF1ZXN0Q291bnRlcl9zID0gdGhpcy5wYXJhbWV0ZXJzLmZpbHRlcmVkUmVxdWVzdExpc3QubGVuZ3RoO1xuICB9XG5cbiAgaGFuZGxlTW9kYWxDbG9zZSgpIHtcbiAgICB0aGlzLm9uUmVxdWVzdENsb3NlKCk7XG4gIH1cblxuICBoYW5kbGVGaWx0ZXJDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc3QgaW5wdXQgPSBldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICB0aGlzLm9uUmVxdWVzdEZpbHRlckNoYW5nZShpbnB1dC52YWx1ZSk7XG4gICAgdGhpcy5wYXJhbWV0ZXJzID0gdGhpcy5wYXJhbWV0ZXJzLmdldFVwZGF0ZWRBbGxQYXJhbXMoKTtcbiAgICB0aGlzLnJlUmVuZGVyID0gIXRoaXMucmVSZW5kZXI7XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJpc1JlcXVlc3RzTW9kYWxWaXNpYmxlXCIgY2xhc3M9XCJtb2RhbC1jb250YWluZXJcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiAncmdiYSgwLCAwLCAwLCAwLjUpJ31cIj5cclxuICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGJhY2tncm91bmRDb2xvciwgJ3RvcCc6IHBvc2l0aW9uLmluY2x1ZGVzKCd0b3AnKSA/ICcxMHB4JyA6ICdhdXRvJywgJ2JvdHRvbSc6IHBvc2l0aW9uLmluY2x1ZGVzKCdib3R0b20nKSA/ICcxMHB4JyA6ICdhdXRvJywgJ2xlZnQnOiBwb3NpdGlvbi5pbmNsdWRlcygnTGVmdCcpID8gJzEwcHgnIDogJ2F1dG8nLCAncmlnaHQnOiBwb3NpdGlvbi5pbmNsdWRlcygnUmlnaHQnKSA/ICcxMHB4JyA6ICdhdXRvJ31cIj5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIj5cclxuICAgICAgPGRpdj5cclxuICAgICAgICBSZXF1ZXN0cyA8c3BhbiBjbGFzcz1cImJhZGdlIHRleHQtZGFya1wiPnt7IHJlcXVlc3RDb3VudGVyX3MgfX08L3NwYW4+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IGNsYXNzPVwiY2xvc2UtaWNvblwiIChjbGljayk9XCJoYW5kbGVNb2RhbENsb3NlKClcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRpbWVzXCIgc2l6ZT1cImxnXCI+PC9mYS1pY29uPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGhyIGNsYXNzPVwic2VwYXJhdG9yXCIgLz5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1ib2R5XCI+XHJcbiAgICAgIDxpbnB1dCB0eXBlPVwidGV4dFwiIGNsYXNzPVwiZmlsdGVyLWlucHV0XCIgcGxhY2Vob2xkZXI9XCJTZWFyY2ggLi4uXCIgKGlucHV0KT1cImhhbmRsZUZpbHRlckNoYW5nZSgkZXZlbnQpXCI+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJyZXF1ZXN0LWxpc3RcIj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0Zvcj1cImxldCByZXF1ZXN0SXRlbSBvZiByZXF1ZXN0TGlzdF9zOyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgICAgICAgICA8YXBwLXJlbmRlci1yZXF1ZXN0LWNvbXBvbmVudFxyXG4gICAgICAgICAgICBbcmVxdWVzdF09XCJyZXF1ZXN0SXRlbVwiXHJcbiAgICAgICAgICAgIFtyZXF1ZXN0TGlzdF09XCJyZXF1ZXN0TGlzdFwiXHJcbiAgICAgICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZVwiXHJcbiAgICAgICAgICAgIFtzb2NrZXRdPVwic29ja2V0XCJcclxuICAgICAgICAgICAgW29uUmVxdWVzdEl0ZW1QcmVzc109XCJvblJlcXVlc3RJdGVtUHJlc3NcIlxyXG4gICAgICAgICAgICBbdXBkYXRlUmVxdWVzdExpc3RdPVwidXBkYXRlUmVxdWVzdExpc3RcIj5cclxuICAgICAgICAgIDwvYXBwLXJlbmRlci1yZXF1ZXN0LWNvbXBvbmVudD5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==