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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvbWlzYy1jb21wb25lbnRzL3NoYXJlLWV2ZW50LW1vZGFsL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21pc2MtY29tcG9uZW50cy9zaGFyZS1ldmVudC1tb2RhbC9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQzVELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDJFQUEyRSxDQUFDO0FBQy9HLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxNQUFNLHVGQUF1RixDQUFDO0FBQ2pJLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLGlGQUFpRixDQUFDOzs7O0FBaUJ4SDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBY0gsTUFBTSxPQUFPLGVBQWU7SUFDakIsZUFBZSxHQUFHLDJCQUEyQixDQUFDO0lBQzlDLHdCQUF3QixHQUFHLEtBQUssQ0FBQztJQUNqQyxpQkFBaUIsQ0FBYztJQUMvQixRQUFRLENBQVU7SUFDbEIsYUFBYSxDQUFVO0lBQ3ZCLE9BQU8sQ0FBVTtJQUNqQixRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3RCLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDcEIsU0FBUyxDQUFhO0lBRS9CLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFFbEIsV0FBVztRQUNULElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUFJLG1CQUFtQjtRQUNyQixPQUFPO1lBQ0wsUUFBUSxFQUFFLE9BQU87WUFDakIsR0FBRyxFQUFFLENBQUM7WUFDTixJQUFJLEVBQUUsQ0FBQztZQUNQLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLE1BQU07WUFDZCxlQUFlLEVBQUUsb0JBQW9CO1lBQ3JDLE9BQU8sRUFBRSxJQUFJLENBQUMsd0JBQXdCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUN6RCxNQUFNLEVBQUUsR0FBRztTQUNaLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxpQkFBaUI7UUFDbkIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN0QyxJQUFJLFVBQVUsR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDO1FBQ25DLElBQUksVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDbkIsQ0FBQztRQUVELE9BQU87WUFDTCxRQUFRLEVBQUUsT0FBTztZQUNqQixlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsWUFBWSxFQUFFLE1BQU07WUFDcEIsT0FBTyxFQUFFLE1BQU07WUFDZixLQUFLLEVBQUUsR0FBRyxVQUFVLElBQUk7WUFDeEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLE1BQU07WUFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDcEQsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDMUQsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDdEQsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07U0FDekQsQ0FBQztJQUNKLENBQUM7dUdBbERVLGVBQWU7MkZBQWYsZUFBZSxxWEM3RDVCLHdoQ0FxQkEseUREaUNJLFlBQVksdU5BQ1osaUJBQWlCLDZQQUNqQixrQkFBa0IsNEZBQ2xCLHdCQUF3Qix3R0FDeEIscUJBQXFCOzsyRkFHWixlQUFlO2tCQWIzQixTQUFTOytCQUNFLHVCQUF1QixjQUdyQixJQUFJLFdBQ1A7d0JBQ1AsWUFBWTt3QkFDWixpQkFBaUI7d0JBQ2pCLGtCQUFrQjt3QkFDbEIsd0JBQXdCO3dCQUN4QixxQkFBcUI7cUJBQ3RCOzhCQUdRLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csd0JBQXdCO3NCQUFoQyxLQUFLO2dCQUNHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgZmFUaW1lcyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQgeyBNZWV0aW5nSWRDb21wb25lbnQgfSBmcm9tICcuLi8uLi9tZW51LWNvbXBvbmVudHMvbWVldGluZy1pZC1jb21wb25lbnQvbWVldGluZy1pZC1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lZXRpbmdQYXNzY29kZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL21lbnUtY29tcG9uZW50cy9tZWV0aW5nLXBhc3Njb2RlLWNvbXBvbmVudC9tZWV0aW5nLXBhc3Njb2RlLWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hhcmVCdXR0b25zQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vbWVudS1jb21wb25lbnRzL3NoYXJlLWJ1dHRvbnMtY29tcG9uZW50L3NoYXJlLWJ1dHRvbnMtY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFdmVudFR5cGUgfSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFNoYXJlRXZlbnRNb2RhbE9wdGlvbnMge1xuICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIGlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZTogYm9vbGVhbjtcbiAgb25TaGFyZUV2ZW50Q2xvc2U6ICgpID0+IHZvaWQ7XG4gIHNoYXJlQnV0dG9ucz86IGJvb2xlYW47XG4gIHBvc2l0aW9uPzogc3RyaW5nO1xuICByb29tTmFtZTogc3RyaW5nO1xuICBhZG1pblBhc3Njb2RlPzogc3RyaW5nO1xuICBpc2xldmVsPzogc3RyaW5nO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbn1cblxuZXhwb3J0IHR5cGUgU2hhcmVFdmVudE1vZGFsVHlwZSA9IChvcHRpb25zOiBTaGFyZUV2ZW50TW9kYWxPcHRpb25zKSA9PiB2b2lkO1xuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgZGlzcGxheWluZyBhIG1vZGFsIHRvIHNoYXJlIGV2ZW50IGRldGFpbHMuXG4gKlxuICogQGNvbXBvbmVudFxuICogQHNlbGVjdG9yIGFwcC1zaGFyZS1ldmVudC1tb2RhbFxuICogQHRlbXBsYXRlVXJsIC4vc2hhcmUtZXZlbnQtbW9kYWwuY29tcG9uZW50Lmh0bWxcbiAqIEBzdHlsZVVybHMgLi9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQuY3NzXG4gKlxuICogQGltcG9ydHMgQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgTWVldGluZ0lkQ29tcG9uZW50LCBNZWV0aW5nUGFzc2NvZGVDb21wb25lbnQsIFNoYXJlQnV0dG9uc0NvbXBvbmVudFxuICpcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBiYWNrZ3JvdW5kQ29sb3IgLSBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBtb2RhbCBjb250ZW50LlxuICogQHByb3BlcnR5IHtib29sZWFufSBpc1NoYXJlRXZlbnRNb2RhbFZpc2libGUgLSBWaXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBzaGFyZSBldmVudCBtb2RhbC5cbiAqIEBwcm9wZXJ0eSB7RnVuY3Rpb259IG9uU2hhcmVFdmVudENsb3NlIC0gQ2FsbGJhY2sgZnVuY3Rpb24gdG8gaGFuZGxlIG1vZGFsIGNsb3NlIGV2ZW50LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHJvb21OYW1lIC0gTmFtZSBvZiB0aGUgcm9vbSB0byBiZSBzaGFyZWQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYWRtaW5QYXNzY29kZSAtIEFkbWluIHBhc3Njb2RlIGZvciB0aGUgcm9vbS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBpc2xldmVsIC0gTGV2ZWwgb2YgdGhlIGV2ZW50IChlLmcuLCBhZG1pbiwgdXNlcikuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcG9zaXRpb24gLSBQb3NpdGlvbiBvZiB0aGUgbW9kYWwgb24gdGhlIHNjcmVlbiAoZS5nLiwgdG9wUmlnaHQsIGJvdHRvbUxlZnQpLlxuICogQHByb3BlcnR5IHtib29sZWFufSBzaGFyZUJ1dHRvbnMgLSBGbGFnIHRvIGRpc3BsYXkgc2hhcmUgYnV0dG9ucyBpbiB0aGUgbW9kYWwuXG4gKiBAcHJvcGVydHkge0V2ZW50VHlwZX0gZXZlbnRUeXBlIC0gVHlwZSBvZiBldmVudCAoZS5nLiwgY2hhdCwgYnJvYWRjYXN0LCB3ZWJpbmFyKS5cbiAqXG4gKiBAbWV0aG9kIGhhbmRsZUNsb3NlIC0gQ2xvc2VzIHRoZSBzaGFyZSBldmVudCBtb2RhbCBieSBpbnZva2luZyB0aGUgb25TaGFyZUV2ZW50Q2xvc2UgY2FsbGJhY2suXG4gKlxuICogQGdldHRlciBtb2RhbENvbnRhaW5lclN0eWxlIC0gUmV0dXJucyB0aGUgc3R5bGUgb2JqZWN0IGZvciB0aGUgbW9kYWwgY29udGFpbmVyLlxuICogQGdldHRlciBtb2RhbENvbnRlbnRTdHlsZSAtIFJldHVybnMgdGhlIHN0eWxlIG9iamVjdCBmb3IgdGhlIG1vZGFsIGNvbnRlbnQuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1zaGFyZS1ldmVudC1tb2RhbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaGFyZS1ldmVudC1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NoYXJlLWV2ZW50LW1vZGFsLmNvbXBvbmVudC5jc3MnXSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb250QXdlc29tZU1vZHVsZSxcbiAgICBNZWV0aW5nSWRDb21wb25lbnQsXG4gICAgTWVldGluZ1Bhc3Njb2RlQ29tcG9uZW50LFxuICAgIFNoYXJlQnV0dG9uc0NvbXBvbmVudCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgU2hhcmVFdmVudE1vZGFsIHtcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC4yNSknO1xuICBASW5wdXQoKSBpc1NoYXJlRXZlbnRNb2RhbFZpc2libGUgPSBmYWxzZTtcbiAgQElucHV0KCkgb25TaGFyZUV2ZW50Q2xvc2UhOiAoKSA9PiB2b2lkO1xuICBASW5wdXQoKSByb29tTmFtZSE6IHN0cmluZztcbiAgQElucHV0KCkgYWRtaW5QYXNzY29kZSE6IHN0cmluZztcbiAgQElucHV0KCkgaXNsZXZlbCE6IHN0cmluZztcbiAgQElucHV0KCkgcG9zaXRpb24gPSAndG9wUmlnaHQnO1xuICBASW5wdXQoKSBzaGFyZUJ1dHRvbnMgPSB0cnVlO1xuICBASW5wdXQoKSBldmVudFR5cGUhOiBFdmVudFR5cGU7XG5cbiAgZmFUaW1lcyA9IGZhVGltZXM7XG5cbiAgaGFuZGxlQ2xvc2UoKSB7XG4gICAgdGhpcy5vblNoYXJlRXZlbnRDbG9zZSgpO1xuICB9XG5cbiAgZ2V0IG1vZGFsQ29udGFpbmVyU3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgdG9wOiAwLFxuICAgICAgbGVmdDogMCxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC41KScsXG4gICAgICBkaXNwbGF5OiB0aGlzLmlzU2hhcmVFdmVudE1vZGFsVmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZScsXG4gICAgICB6SW5kZXg6IDk5OSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0IG1vZGFsQ29udGVudFN0eWxlKCkge1xuICAgIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IG1vZGFsV2lkdGggPSAwLjggKiBzY3JlZW5XaWR0aDtcbiAgICBpZiAobW9kYWxXaWR0aCA+IDM1MCkge1xuICAgICAgbW9kYWxXaWR0aCA9IDM1MDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMTBweCcsXG4gICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICB3aWR0aDogYCR7bW9kYWxXaWR0aH1weGAsXG4gICAgICBtYXhIZWlnaHQ6ICc2MCUnLFxuICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICB0b3A6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ3RvcCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgYm90dG9tOiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdib3R0b20nKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICAgIGxlZnQ6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ0xlZnQnKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICAgIHJpZ2h0OiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdSaWdodCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgIH07XG4gIH1cbn1cbiIsIjxkaXYgW25nU3R5bGVdPVwibW9kYWxDb250YWluZXJTdHlsZVwiPlxyXG4gIDxkaXYgW25nU3R5bGVdPVwibW9kYWxDb250ZW50U3R5bGVcIj5cclxuICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7IG1hcmdpbi1ib3R0b206IDE1cHg7XCI+XHJcbiAgICAgIDxkaXYgKGNsaWNrKT1cImhhbmRsZUNsb3NlKClcIiBzdHlsZT1cInBhZGRpbmc6IDVweDtcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRpbWVzXCIgc2l6ZT1cInhsXCIgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGNvbG9yOiBibGFjaztcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8aHIgc3R5bGU9XCJoZWlnaHQ6IDFweDsgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7IG1hcmdpbjogNXB4IDA7XCIgLz5cclxuICAgIDxkaXYgc3R5bGU9XCJmbGV4OiAxO1wiPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMTBweDtcIiAqbmdJZj1cImlzbGV2ZWwgPT09ICcyJ1wiPlxyXG4gICAgICAgIDxhcHAtbWVldGluZy1wYXNzY29kZS1jb21wb25lbnQgW21lZXRpbmdQYXNzY29kZV09XCJhZG1pblBhc3Njb2RlXCI+PC9hcHAtbWVldGluZy1wYXNzY29kZS1jb21wb25lbnQ+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMTBweDtcIj5cclxuICAgICAgICA8YXBwLW1lZXRpbmctaWQtY29tcG9uZW50IFttZWV0aW5nSURdPVwicm9vbU5hbWVcIj48L2FwcC1tZWV0aW5nLWlkLWNvbXBvbmVudD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKm5nSWY9XCJzaGFyZUJ1dHRvbnNcIj5cclxuICAgICAgICA8YXBwLXNoYXJlLWJ1dHRvbnMtY29tcG9uZW50IFttZWV0aW5nSURdPVwicm9vbU5hbWVcIiBbZXZlbnRUeXBlXT1cImV2ZW50VHlwZVwiPjwvYXBwLXNoYXJlLWJ1dHRvbnMtY29tcG9uZW50PlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19