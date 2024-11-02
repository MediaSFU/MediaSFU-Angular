import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { MeetingIdComponent } from '../../menu-components/meeting-id-component/meeting-id-component.component';
import { MeetingPasscodeComponent } from '../../menu-components/meeting-passcode-component/meeting-passcode-component.component';
import { ShareButtonsComponent } from '../../menu-components/share-buttons-component/share-buttons-component.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
/**
 * Component for displaying a modal to share event details.
 *
 * @component
 * @selector app-share-event-modal
 * @templateUrl ./share-event-modal.component.html
 * @styleUrls ./share-event-modal.component.css
 *
 * @imports CommonModule, FontAwesomeModule, MeetingIdComponent, MeetingPasscodeComponent, ShareButtonsComponent
 *
 * @property {string} backgroundColor - Background color of the modal content.
 * @property {boolean} isShareEventModalVisible - Visibility state of the share event modal.
 * @property {Function} onShareEventClose - Callback function to handle modal close event.
 * @property {string} roomName - Name of the room to be shared.
 * @property {string} adminPasscode - Admin passcode for the room.
 * @property {string} islevel - Level of the event (e.g., admin, user).
 * @property {string} position - Position of the modal on the screen (e.g., topRight, bottomLeft).
 * @property {boolean} shareButtons - Flag to display share buttons in the modal.
 * @property {EventType} eventType - Type of event (e.g., chat, broadcast, webinar).
 *
 * @method handleClose - Closes the share event modal by invoking the onShareEventClose callback.
 *
 * @getter modalContainerStyle - Returns the style object for the modal container.
 * @getter modalContentStyle - Returns the style object for the modal content.
 * @example
 * ```html
 * <app-share-event-modal
 *   [backgroundColor]="'rgba(255, 255, 255, 0.25)'"
 *   [isShareEventModalVisible]="isModalVisible"
 *   [onShareEventClose]="handleModalClose"
 *   [roomName]="roomName"
 *   [adminPasscode]="adminPasscode"
 *   [islevel]="userLevel"
 *   [position]="'topRight'"
 *   [shareButtons]="true"
 *   [eventType]="eventType"
 * ></app-share-event-modal>
 * ```
 */
export class ShareEventModal {
    backgroundColor = 'rgba(255, 255, 255, 0.25)';
    isShareEventModalVisible = false;
    onShareEventClose;
    roomName;
    adminPasscode;
    islevel;
    position = 'topRight';
    shareButtons = true;
    eventType;
    faTimes = faTimes;
    handleClose() {
        this.onShareEventClose();
    }
    get modalContainerStyle() {
        return {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: this.isShareEventModalVisible ? 'block' : 'none',
            zIndex: 999,
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
            maxHeight: '60%',
            overflowY: 'auto',
            top: this.position.includes('top') ? '10px' : 'auto',
            bottom: this.position.includes('bottom') ? '10px' : 'auto',
            left: this.position.includes('Left') ? '10px' : 'auto',
            right: this.position.includes('Right') ? '10px' : 'auto',
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ShareEventModal, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: ShareEventModal, isStandalone: true, selector: "app-share-event-modal", inputs: { backgroundColor: "backgroundColor", isShareEventModalVisible: "isShareEventModalVisible", onShareEventClose: "onShareEventClose", roomName: "roomName", adminPasscode: "adminPasscode", islevel: "islevel", position: "position", shareButtons: "shareButtons", eventType: "eventType" }, ngImport: i0, template: "<div [ngStyle]=\"modalContainerStyle\">\r\n  <div [ngStyle]=\"modalContentStyle\">\r\n    <div style=\"display: flex; flex-direction: row-reverse; margin-bottom: 15px;\">\r\n      <div (click)=\"handleClose()\" style=\"padding: 5px;\">\r\n        <fa-icon [icon]=\"faTimes\" size=\"xl\" style=\"font-size: 20px; color: black;\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr style=\"height: 1px; background-color: black; margin: 5px 0;\" />\r\n    <div style=\"flex: 1;\">\r\n      <div style=\"margin-bottom: 10px;\" *ngIf=\"islevel === '2'\">\r\n        <app-meeting-passcode-component [meetingPasscode]=\"adminPasscode\"></app-meeting-passcode-component>\r\n      </div>\r\n      <div style=\"margin-bottom: 10px;\">\r\n        <app-meeting-id-component [meetingID]=\"roomName\"></app-meeting-id-component>\r\n      </div>\r\n      <div *ngIf=\"shareButtons\">\r\n        <app-share-buttons-component [meetingID]=\"roomName\" [eventType]=\"eventType\"></app-share-buttons-component>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }, { kind: "component", type: MeetingIdComponent, selector: "app-meeting-id-component", inputs: ["meetingID"] }, { kind: "component", type: MeetingPasscodeComponent, selector: "app-meeting-passcode-component", inputs: ["meetingPasscode"] }, { kind: "component", type: ShareButtonsComponent, selector: "app-share-buttons-component", inputs: ["meetingID", "shareButtons", "eventType"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ShareEventModal, decorators: [{
            type: Component,
            args: [{ selector: 'app-share-event-modal', standalone: true, imports: [
                        CommonModule,
                        FontAwesomeModule,
                        MeetingIdComponent,
                        MeetingPasscodeComponent,
                        ShareButtonsComponent,
                    ], template: "<div [ngStyle]=\"modalContainerStyle\">\r\n  <div [ngStyle]=\"modalContentStyle\">\r\n    <div style=\"display: flex; flex-direction: row-reverse; margin-bottom: 15px;\">\r\n      <div (click)=\"handleClose()\" style=\"padding: 5px;\">\r\n        <fa-icon [icon]=\"faTimes\" size=\"xl\" style=\"font-size: 20px; color: black;\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr style=\"height: 1px; background-color: black; margin: 5px 0;\" />\r\n    <div style=\"flex: 1;\">\r\n      <div style=\"margin-bottom: 10px;\" *ngIf=\"islevel === '2'\">\r\n        <app-meeting-passcode-component [meetingPasscode]=\"adminPasscode\"></app-meeting-passcode-component>\r\n      </div>\r\n      <div style=\"margin-bottom: 10px;\">\r\n        <app-meeting-id-component [meetingID]=\"roomName\"></app-meeting-id-component>\r\n      </div>\r\n      <div *ngIf=\"shareButtons\">\r\n        <app-share-buttons-component [meetingID]=\"roomName\" [eventType]=\"eventType\"></app-share-buttons-component>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n" }]
        }], propDecorators: { backgroundColor: [{
                type: Input
            }], isShareEventModalVisible: [{
                type: Input
            }], onShareEventClose: [{
                type: Input
            }], roomName: [{
                type: Input
            }], adminPasscode: [{
                type: Input
            }], islevel: [{
                type: Input
            }], position: [{
                type: Input
            }], shareButtons: [{
                type: Input
            }], eventType: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvbWlzYy1jb21wb25lbnRzL3NoYXJlLWV2ZW50LW1vZGFsL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21pc2MtY29tcG9uZW50cy9zaGFyZS1ldmVudC1tb2RhbC9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJFQUEyRSxDQUFDO0FBQy9HLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVGQUF1RixDQUFDO0FBQ2pJLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlGQUFpRixDQUFDOzs7O0FBaUJ4SDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQ0c7QUFjSCxNQUFNLE9BQU8sZUFBZTtJQUNqQixlQUFlLEdBQUcsMkJBQTJCLENBQUM7SUFDOUMsd0JBQXdCLEdBQUcsS0FBSyxDQUFDO0lBQ2pDLGlCQUFpQixDQUFjO0lBQy9CLFFBQVEsQ0FBVTtJQUNsQixhQUFhLENBQVU7SUFDdkIsT0FBTyxDQUFVO0lBQ2pCLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDdEIsWUFBWSxHQUFHLElBQUksQ0FBQztJQUNwQixTQUFTLENBQWE7SUFFL0IsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUVsQixXQUFXO1FBQ1QsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELElBQUksbUJBQW1CO1FBQ3JCLE9BQU87WUFDTCxRQUFRLEVBQUUsT0FBTztZQUNqQixHQUFHLEVBQUUsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSyxFQUFFLE1BQU07WUFDYixNQUFNLEVBQUUsTUFBTTtZQUNkLGVBQWUsRUFBRSxvQkFBb0I7WUFDckMsT0FBTyxFQUFFLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNO1lBQ3pELE1BQU0sRUFBRSxHQUFHO1NBQ1osQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJLGlCQUFpQjtRQUNuQixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3RDLElBQUksVUFBVSxHQUFHLEdBQUcsR0FBRyxXQUFXLENBQUM7UUFDbkMsSUFBSSxVQUFVLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDckIsVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUNuQixDQUFDO1FBRUQsT0FBTztZQUNMLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxZQUFZLEVBQUUsTUFBTTtZQUNwQixPQUFPLEVBQUUsTUFBTTtZQUNmLEtBQUssRUFBRSxHQUFHLFVBQVUsSUFBSTtZQUN4QixTQUFTLEVBQUUsS0FBSztZQUNoQixTQUFTLEVBQUUsTUFBTTtZQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUNwRCxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUMxRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUN0RCxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTTtTQUN6RCxDQUFDO0lBQ0osQ0FBQzt1R0FsRFUsZUFBZTsyRkFBZixlQUFlLHFYQzNFNUIsd2hDQXFCQSx5REQrQ0ksWUFBWSx1TkFDWixpQkFBaUIsNlBBQ2pCLGtCQUFrQiw0RkFDbEIsd0JBQXdCLHdHQUN4QixxQkFBcUI7OzJGQUdaLGVBQWU7a0JBYjNCLFNBQVM7K0JBQ0UsdUJBQXVCLGNBR3JCLElBQUksV0FDUDt3QkFDUCxZQUFZO3dCQUNaLGlCQUFpQjt3QkFDakIsa0JBQWtCO3dCQUNsQix3QkFBd0I7d0JBQ3hCLHFCQUFxQjtxQkFDdEI7OEJBR1EsZUFBZTtzQkFBdkIsS0FBSztnQkFDRyx3QkFBd0I7c0JBQWhDLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XG5pbXBvcnQgeyBmYVRpbWVzIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IE1lZXRpbmdJZENvbXBvbmVudCB9IGZyb20gJy4uLy4uL21lbnUtY29tcG9uZW50cy9tZWV0aW5nLWlkLWNvbXBvbmVudC9tZWV0aW5nLWlkLWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVldGluZ1Bhc3Njb2RlQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbWVudS1jb21wb25lbnRzL21lZXRpbmctcGFzc2NvZGUtY29tcG9uZW50L21lZXRpbmctcGFzc2NvZGUtY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaGFyZUJ1dHRvbnNDb21wb25lbnQgfSBmcm9tICcuLi8uLi9tZW51LWNvbXBvbmVudHMvc2hhcmUtYnV0dG9ucy1jb21wb25lbnQvc2hhcmUtYnV0dG9ucy1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2hhcmVFdmVudE1vZGFsT3B0aW9ucyB7XG4gIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgaXNTaGFyZUV2ZW50TW9kYWxWaXNpYmxlOiBib29sZWFuO1xuICBvblNoYXJlRXZlbnRDbG9zZTogKCkgPT4gdm9pZDtcbiAgc2hhcmVCdXR0b25zPzogYm9vbGVhbjtcbiAgcG9zaXRpb24/OiBzdHJpbmc7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIGFkbWluUGFzc2NvZGU/OiBzdHJpbmc7XG4gIGlzbGV2ZWw/OiBzdHJpbmc7XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xufVxuXG5leHBvcnQgdHlwZSBTaGFyZUV2ZW50TW9kYWxUeXBlID0gKG9wdGlvbnM6IFNoYXJlRXZlbnRNb2RhbE9wdGlvbnMpID0+IHZvaWQ7XG5cbi8qKlxuICogQ29tcG9uZW50IGZvciBkaXNwbGF5aW5nIGEgbW9kYWwgdG8gc2hhcmUgZXZlbnQgZGV0YWlscy5cbiAqXG4gKiBAY29tcG9uZW50XG4gKiBAc2VsZWN0b3IgYXBwLXNoYXJlLWV2ZW50LW1vZGFsXG4gKiBAdGVtcGxhdGVVcmwgLi9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQuaHRtbFxuICogQHN0eWxlVXJscyAuL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudC5jc3NcbiAqXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlLCBNZWV0aW5nSWRDb21wb25lbnQsIE1lZXRpbmdQYXNzY29kZUNvbXBvbmVudCwgU2hhcmVCdXR0b25zQ29tcG9uZW50XG4gKlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGJhY2tncm91bmRDb2xvciAtIEJhY2tncm91bmQgY29sb3Igb2YgdGhlIG1vZGFsIGNvbnRlbnQuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZSAtIFZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIHNoYXJlIGV2ZW50IG1vZGFsLlxuICogQHByb3BlcnR5IHtGdW5jdGlvbn0gb25TaGFyZUV2ZW50Q2xvc2UgLSBDYWxsYmFjayBmdW5jdGlvbiB0byBoYW5kbGUgbW9kYWwgY2xvc2UgZXZlbnQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcm9vbU5hbWUgLSBOYW1lIG9mIHRoZSByb29tIHRvIGJlIHNoYXJlZC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBhZG1pblBhc3Njb2RlIC0gQWRtaW4gcGFzc2NvZGUgZm9yIHRoZSByb29tLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGlzbGV2ZWwgLSBMZXZlbCBvZiB0aGUgZXZlbnQgKGUuZy4sIGFkbWluLCB1c2VyKS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwb3NpdGlvbiAtIFBvc2l0aW9uIG9mIHRoZSBtb2RhbCBvbiB0aGUgc2NyZWVuIChlLmcuLCB0b3BSaWdodCwgYm90dG9tTGVmdCkuXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHNoYXJlQnV0dG9ucyAtIEZsYWcgdG8gZGlzcGxheSBzaGFyZSBidXR0b25zIGluIHRoZSBtb2RhbC5cbiAqIEBwcm9wZXJ0eSB7RXZlbnRUeXBlfSBldmVudFR5cGUgLSBUeXBlIG9mIGV2ZW50IChlLmcuLCBjaGF0LCBicm9hZGNhc3QsIHdlYmluYXIpLlxuICpcbiAqIEBtZXRob2QgaGFuZGxlQ2xvc2UgLSBDbG9zZXMgdGhlIHNoYXJlIGV2ZW50IG1vZGFsIGJ5IGludm9raW5nIHRoZSBvblNoYXJlRXZlbnRDbG9zZSBjYWxsYmFjay5cbiAqXG4gKiBAZ2V0dGVyIG1vZGFsQ29udGFpbmVyU3R5bGUgLSBSZXR1cm5zIHRoZSBzdHlsZSBvYmplY3QgZm9yIHRoZSBtb2RhbCBjb250YWluZXIuXG4gKiBAZ2V0dGVyIG1vZGFsQ29udGVudFN0eWxlIC0gUmV0dXJucyB0aGUgc3R5bGUgb2JqZWN0IGZvciB0aGUgbW9kYWwgY29udGVudC5cbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLXNoYXJlLWV2ZW50LW1vZGFsXG4gKiAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSknXCJcbiAqICAgW2lzU2hhcmVFdmVudE1vZGFsVmlzaWJsZV09XCJpc01vZGFsVmlzaWJsZVwiXG4gKiAgIFtvblNoYXJlRXZlbnRDbG9zZV09XCJoYW5kbGVNb2RhbENsb3NlXCJcbiAqICAgW3Jvb21OYW1lXT1cInJvb21OYW1lXCJcbiAqICAgW2FkbWluUGFzc2NvZGVdPVwiYWRtaW5QYXNzY29kZVwiXG4gKiAgIFtpc2xldmVsXT1cInVzZXJMZXZlbFwiXG4gKiAgIFtwb3NpdGlvbl09XCIndG9wUmlnaHQnXCJcbiAqICAgW3NoYXJlQnV0dG9uc109XCJ0cnVlXCJcbiAqICAgW2V2ZW50VHlwZV09XCJldmVudFR5cGVcIlxuICogPjwvYXBwLXNoYXJlLWV2ZW50LW1vZGFsPlxuICogYGBgXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1zaGFyZS1ldmVudC1tb2RhbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudC5jc3MnXSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb250QXdlc29tZU1vZHVsZSxcbiAgICBNZWV0aW5nSWRDb21wb25lbnQsXG4gICAgTWVldGluZ1Bhc3Njb2RlQ29tcG9uZW50LFxuICAgIFNoYXJlQnV0dG9uc0NvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVFdmVudE1vZGFsIHtcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSknO1xuICBASW5wdXQoKSBpc1NoYXJlRXZlbnRNb2RhbFZpc2libGUgPSBmYWxzZTtcbiAgQElucHV0KCkgb25TaGFyZUV2ZW50Q2xvc2UhOiAoKSA9PiB2b2lkO1xuICBASW5wdXQoKSByb29tTmFtZSE6IHN0cmluZztcbiAgQElucHV0KCkgYWRtaW5QYXNzY29kZSE6IHN0cmluZztcbiAgQElucHV0KCkgaXNsZXZlbCE6IHN0cmluZztcbiAgQElucHV0KCkgcG9zaXRpb24gPSAndG9wUmlnaHQnO1xuICBASW5wdXQoKSBzaGFyZUJ1dHRvbnMgPSB0cnVlO1xuICBASW5wdXQoKSBldmVudFR5cGUhOiBFdmVudFR5cGU7XG5cbiAgZmFUaW1lcyA9IGZhVGltZXM7XG5cbiAgaGFuZGxlQ2xvc2UoKSB7XG4gICAgdGhpcy5vblNoYXJlRXZlbnRDbG9zZSgpO1xuICB9XG5cbiAgZ2V0IG1vZGFsQ29udGFpbmVyU3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMCxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC41KScsXG4gICAgICBkaXNwbGF5OiB0aGlzLmlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZScsXG4gICAgICB6SW5kZXg6IDk5OSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0IG1vZGFsQ29udGVudFN0eWxlKCkge1xuICAgIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IG1vZGFsV2lkdGggPSAwLjggKiBzY3JlZW5XaWR0aDtcbiAgICBpZiAobW9kYWxXaWR0aCA+IDM1MCkge1xuICAgICAgbW9kYWxXaWR0aCA9IDM1MDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMTBweCcsXG4gICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICB3aWR0aDogYCR7bW9kYWxXaWR0aH1weGAsXG4gICAgICBtYXhIZWlnaHQ6ICc2MCUnLFxuICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICB0b3A6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ3RvcCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgYm90dG9tOiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdib3R0b20nKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICAgIGxlZnQ6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ0xlZnQnKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICAgIHJpZ2h0OiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdSaWdodCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgIH07XG4gIH1cbn1cbiIsIjxkaXYgW25nU3R5bGVdPVwibW9kYWxDb250YWluZXJTdHlsZVwiPlxyXG4gIDxkaXYgW25nU3R5bGVdPVwibW9kYWxDb250ZW50U3R5bGVcIj5cclxuICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7IG1hcmdpbi1ib3R0b206IDE1cHg7XCI+XHJcbiAgICAgIDxkaXYgKGNsaWNrKT1cImhhbmRsZUNsb3NlKClcIiBzdHlsZT1cInBhZGRpbmc6IDVweDtcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRpbWVzXCIgc2l6ZT1cInhsXCIgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGNvbG9yOiBibGFjaztcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8aHIgc3R5bGU9XCJoZWlnaHQ6IDFweDsgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7IG1hcmdpbjogNXB4IDA7XCIgLz5cclxuICAgIDxkaXYgc3R5bGU9XCJmbGV4OiAxO1wiPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMTBweDtcIiAqbmdJZj1cImlzbGV2ZWwgPT09ICcyJ1wiPlxyXG4gICAgICAgIDxhcHAtbWVldGluZy1wYXNzY29kZS1jb21wb25lbnQgW21lZXRpbmdQYXNzY29kZV09XCJhZG1pblBhc3Njb2RlXCI+PC9hcHAtbWVldGluZy1wYXNzY29kZS1jb21wb25lbnQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMTBweDtcIj5cclxuICAgICAgICA8YXBwLW1lZXRpbmctaWQtY29tcG9uZW50IFttZWV0aW5nSURdPVwicm9vbU5hbWVcIj48L2FwcC1tZWV0aW5nLWlkLWNvbXBvbmVudD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJzaGFyZUJ1dHRvbnNcIj5cclxuICAgICAgICA8YXBwLXNoYXJlLWJ1dHRvbnMtY29tcG9uZW50IFttZWV0aW5nSURdPVwicm9vbU5hbWVcIiBbZXZlbnRUeXBlXT1cImV2ZW50VHlwZVwiPjwvYXBwLXNoYXJlLWJ1dHRvbnMtY29tcG9uZW50PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19