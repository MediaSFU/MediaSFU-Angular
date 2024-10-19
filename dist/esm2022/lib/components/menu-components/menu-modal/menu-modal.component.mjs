import { Component, Input } from '@angular/core';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { CustomButtons } from '../custom-buttons/custom-buttons.component';
import { MeetingIdComponent } from '../meeting-id-component/meeting-id-component.component';
import { MeetingPasscodeComponent } from '../meeting-passcode-component/meeting-passcode-component.component';
import { ShareButtonsComponent } from '../share-buttons-component/share-buttons-component.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
/**
 * @component MenuModal
 *
 * @description
 * The MenuModal component is a standalone Angular component that displays a modal dialog.
 * It includes various customizable properties and imports necessary modules and components.
 *
 * @selector app-menu-modal
 * @templateUrl ./menu-modal.component.html
 * @styleUrls ./menu-modal.component.css
 *
 * @inputs
 * @input {string} backgroundColor - The background color of the modal content. Default is '#83c0e9'.
 * @input {boolean} isVisible - Determines whether the modal is visible.
 * @input {CustomButton[]} customButtons - An array of custom buttons to be displayed in the modal.
 * @input {boolean} shareButtons - Determines whether share buttons are displayed. Default is true.
 * @input {string} position - The position of the modal on the screen. Default is 'bottomRight'.
 * @input {string} roomName - The name of the room.
 * @input {string} adminPasscode - The admin passcode for the room.
 * @input {string} islevel - The level of the user.
 * @input {() => void} onClose - A function to be called when the modal is closed.
 *
 * @methods
 * @method modalContainerStyle - Returns the style object for the modal container.
 * @method modalContentStyle - Returns the style object for the modal content.
 * @method handleClose - Calls the onClose function to handle closing the modal.
 *
 * @dependencies
 * - CommonModule
 * - FontAwesomeModule
 * - FormsModule
 * - CustomButtons
 * - MeetingIdComponent
 * - MeetingPasscodeComponent
 * - ShareButtonsComponent
 */
export class MenuModal {
    backgroundColor = '#83c0e9';
    isVisible;
    customButtons = [];
    shareButtons = true;
    position = 'bottomRight';
    roomName;
    adminPasscode;
    islevel;
    eventType;
    // Define inputs for functions
    onClose;
    faBars = faBars;
    faTimes = faTimes;
    modalContainerStyle() {
        return {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: this.isVisible ? 'block' : 'none',
            zIndex: 999,
        };
    }
    modalContentStyle() {
        const screenWidth = window.innerWidth;
        let modalWidth = 0.7 * screenWidth;
        if (modalWidth > 400) {
            modalWidth = 400;
        }
        return {
            backgroundColor: this.backgroundColor,
            borderRadius: '10px',
            padding: '5px',
            width: `${modalWidth}px`,
            maxHeight: '80%',
            overflowY: 'auto',
            top: this.position.includes('top') ? '10px' : 'auto',
            bottom: this.position.includes('bottom') ? '10px' : 'auto',
            left: this.position.includes('Left') ? '10px' : 'auto',
            right: this.position.includes('Right') ? '10px' : 'auto',
        };
    }
    handleClose() {
        this.onClose();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MenuModal, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MenuModal, isStandalone: true, selector: "app-menu-modal", inputs: { backgroundColor: "backgroundColor", isVisible: "isVisible", customButtons: "customButtons", shareButtons: "shareButtons", position: "position", roomName: "roomName", adminPasscode: "adminPasscode", islevel: "islevel", eventType: "eventType", onClose: "onClose" }, ngImport: i0, template: "<div [ngStyle]=\"modalContainerStyle()\">\r\n  <div class=\"modal-content\" [ngStyle]=\"modalContentStyle()\">\r\n    <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;\">\r\n      <div style=\"font-size: 18px; font-weight: bold; color: black;\">\r\n        <fa-icon [icon]=\"faBars\" style=\"font-size: 20px; color: black;\"></fa-icon> Menu\r\n      </div>\r\n      <div (click)=\"handleClose()\" style=\"padding: 5px;\">\r\n        <fa-icon [icon]=\"faTimes\" style=\"font-size: 20px; color: black;\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr style=\"height: 1px; background-color: black; margin: 5px 0;\" />\r\n    <div style=\"flex: 1;\">\r\n      <div style=\"max-height: calc(70% - 70px); overflow-y: auto;\">\r\n        <app-custom-buttons [buttons]=\"customButtons\"></app-custom-buttons>\r\n        <div style=\"height: 1px; background-color: #ffffff; margin: 10px 0;\"></div>\r\n        <ng-container *ngIf=\"islevel === '2'\">\r\n          <app-meeting-passcode-component\r\n            [meetingPasscode]=\"adminPasscode\"\r\n          ></app-meeting-passcode-component>\r\n        </ng-container>\r\n        <div style=\"margin-bottom: 10px;\">\r\n          <app-meeting-id-component [meetingID]=\"roomName\"></app-meeting-id-component>\r\n        </div>\r\n        <ng-container *ngIf=\"true\">\r\n          <app-share-buttons-component [meetingID]=\"roomName\" [eventType]=\"eventType\"></app-share-buttons-component>\r\n        </ng-container>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:9}.modal-content{position:absolute;display:flex;flex-direction:column}.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px}.modal-title{font-size:18px;font-weight:700;color:#000}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }, { kind: "ngmodule", type: FormsModule }, { kind: "component", type: CustomButtons, selector: "app-custom-buttons", inputs: ["buttons"] }, { kind: "component", type: MeetingIdComponent, selector: "app-meeting-id-component", inputs: ["meetingID"] }, { kind: "component", type: MeetingPasscodeComponent, selector: "app-meeting-passcode-component", inputs: ["meetingPasscode"] }, { kind: "component", type: ShareButtonsComponent, selector: "app-share-buttons-component", inputs: ["meetingID", "shareButtons", "eventType"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MenuModal, decorators: [{
            type: Component,
            args: [{ selector: 'app-menu-modal', standalone: true, imports: [
                        CommonModule,
                        FontAwesomeModule,
                        FormsModule,
                        CustomButtons,
                        MeetingIdComponent,
                        MeetingPasscodeComponent,
                        ShareButtonsComponent,
                    ], template: "<div [ngStyle]=\"modalContainerStyle()\">\r\n  <div class=\"modal-content\" [ngStyle]=\"modalContentStyle()\">\r\n    <div style=\"display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;\">\r\n      <div style=\"font-size: 18px; font-weight: bold; color: black;\">\r\n        <fa-icon [icon]=\"faBars\" style=\"font-size: 20px; color: black;\"></fa-icon> Menu\r\n      </div>\r\n      <div (click)=\"handleClose()\" style=\"padding: 5px;\">\r\n        <fa-icon [icon]=\"faTimes\" style=\"font-size: 20px; color: black;\"></fa-icon>\r\n      </div>\r\n    </div>\r\n    <hr style=\"height: 1px; background-color: black; margin: 5px 0;\" />\r\n    <div style=\"flex: 1;\">\r\n      <div style=\"max-height: calc(70% - 70px); overflow-y: auto;\">\r\n        <app-custom-buttons [buttons]=\"customButtons\"></app-custom-buttons>\r\n        <div style=\"height: 1px; background-color: #ffffff; margin: 10px 0;\"></div>\r\n        <ng-container *ngIf=\"islevel === '2'\">\r\n          <app-meeting-passcode-component\r\n            [meetingPasscode]=\"adminPasscode\"\r\n          ></app-meeting-passcode-component>\r\n        </ng-container>\r\n        <div style=\"margin-bottom: 10px;\">\r\n          <app-meeting-id-component [meetingID]=\"roomName\"></app-meeting-id-component>\r\n        </div>\r\n        <ng-container *ngIf=\"true\">\r\n          <app-share-buttons-component [meetingID]=\"roomName\" [eventType]=\"eventType\"></app-share-buttons-component>\r\n        </ng-container>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;display:flex;justify-content:center;align-items:center;z-index:9}.modal-content{position:absolute;display:flex;flex-direction:column}.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:15px}.modal-title{font-size:18px;font-weight:700;color:#000}\n"] }]
        }], propDecorators: { backgroundColor: [{
                type: Input
            }], isVisible: [{
                type: Input
            }], customButtons: [{
                type: Input
            }], shareButtons: [{
                type: Input
            }], position: [{
                type: Input
            }], roomName: [{
                type: Input
            }], adminPasscode: [{
                type: Input
            }], islevel: [{
                type: Input
            }], eventType: [{
                type: Input
            }], onClose: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1tb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9tZW51LWNvbXBvbmVudHMvbWVudS1tb2RhbC9tZW51LW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21lbnUtY29tcG9uZW50cy9tZW51LW1vZGFsL21lbnUtbW9kYWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBZ0IsYUFBYSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDNUYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDOUcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOERBQThELENBQUM7Ozs7QUFtQnJHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1DRztBQWdCSCxNQUFNLE9BQU8sU0FBUztJQUNYLGVBQWUsR0FBRyxTQUFTLENBQUM7SUFDNUIsU0FBUyxDQUFXO0lBQ3BCLGFBQWEsR0FBbUIsRUFBRSxDQUFDO0lBQ25DLFlBQVksR0FBRyxJQUFJLENBQUM7SUFDcEIsUUFBUSxHQUFHLGFBQWEsQ0FBQztJQUN6QixRQUFRLENBQVU7SUFDbEIsYUFBYSxDQUFVO0lBQ3ZCLE9BQU8sQ0FBVTtJQUNqQixTQUFTLENBQWE7SUFDL0IsOEJBQThCO0lBQ3JCLE9BQU8sQ0FBYztJQUU5QixNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ2hCLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFFbEIsbUJBQW1CO1FBQ2pCLE9BQU87WUFDTCxRQUFRLEVBQUUsT0FBTztZQUNqQixHQUFHLEVBQUUsQ0FBQztZQUNOLElBQUksRUFBRSxDQUFDO1lBQ1AsS0FBSyxFQUFFLE1BQU07WUFDYixNQUFNLEVBQUUsTUFBTTtZQUNkLGVBQWUsRUFBRSxvQkFBb0I7WUFDckMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUMxQyxNQUFNLEVBQUUsR0FBRztTQUNaLENBQUM7SUFDSixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUN0QyxJQUFJLFVBQVUsR0FBRyxHQUFHLEdBQUcsV0FBVyxDQUFDO1FBRW5DLElBQUksVUFBVSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ3JCLFVBQVUsR0FBRyxHQUFHLENBQUM7UUFDbkIsQ0FBQztRQUVELE9BQU87WUFDTCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsWUFBWSxFQUFFLE1BQU07WUFDcEIsT0FBTyxFQUFFLEtBQUs7WUFDZCxLQUFLLEVBQUUsR0FBRyxVQUFVLElBQUk7WUFDeEIsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLE1BQU07WUFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDcEQsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDMUQsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDdEQsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07U0FDekQsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO0lBQ2pCLENBQUM7dUdBckRVLFNBQVM7MkZBQVQsU0FBUyw0VkMvRXRCLHlpREE4QkEscWJEd0NJLFlBQVksdU5BQ1osaUJBQWlCLDRQQUNqQixXQUFXLCtCQUNYLGFBQWEsb0ZBQ2Isa0JBQWtCLDRGQUNsQix3QkFBd0Isd0dBQ3hCLHFCQUFxQjs7MkZBR1osU0FBUztrQkFmckIsU0FBUzsrQkFDRSxnQkFBZ0IsY0FHZCxJQUFJLFdBQ1A7d0JBQ1AsWUFBWTt3QkFDWixpQkFBaUI7d0JBQ2pCLFdBQVc7d0JBQ1gsYUFBYTt3QkFDYixrQkFBa0I7d0JBQ2xCLHdCQUF3Qjt3QkFDeEIscUJBQXFCO3FCQUN0Qjs4QkFHUSxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csYUFBYTtzQkFBckIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUVHLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZhQmFycywgZmFUaW1lcyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XG5pbXBvcnQgeyBGb3Jtc01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcblxuaW1wb3J0IHsgQ3VzdG9tQnV0dG9uLCBDdXN0b21CdXR0b25zIH0gZnJvbSAnLi4vY3VzdG9tLWJ1dHRvbnMvY3VzdG9tLWJ1dHRvbnMuY29tcG9uZW50JztcbmltcG9ydCB7IE1lZXRpbmdJZENvbXBvbmVudCB9IGZyb20gJy4uL21lZXRpbmctaWQtY29tcG9uZW50L21lZXRpbmctaWQtY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNZWV0aW5nUGFzc2NvZGVDb21wb25lbnQgfSBmcm9tICcuLi9tZWV0aW5nLXBhc3Njb2RlLWNvbXBvbmVudC9tZWV0aW5nLXBhc3Njb2RlLWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgU2hhcmVCdXR0b25zQ29tcG9uZW50IH0gZnJvbSAnLi4vc2hhcmUtYnV0dG9ucy1jb21wb25lbnQvc2hhcmUtYnV0dG9ucy1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVudU1vZGFsT3B0aW9ucyB7XG4gIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgaXNWaXNpYmxlOiBib29sZWFuO1xuICBjdXN0b21CdXR0b25zPzogQ3VzdG9tQnV0dG9uW107XG4gIHNoYXJlQnV0dG9ucz86IGJvb2xlYW47XG4gIHBvc2l0aW9uPzogc3RyaW5nO1xuICByb29tTmFtZTogc3RyaW5nO1xuICBhZG1pblBhc3Njb2RlOiBzdHJpbmc7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG5cbiAgb25DbG9zZTogKCkgPT4gdm9pZDtcbn1cblxuZXhwb3J0IHR5cGUgTWVudU1vZGFsVHlwZSA9IChvcHRpb25zOiBNZW51TW9kYWxPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBAY29tcG9uZW50IE1lbnVNb2RhbFxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogVGhlIE1lbnVNb2RhbCBjb21wb25lbnQgaXMgYSBzdGFuZGFsb25lIEFuZ3VsYXIgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYSBtb2RhbCBkaWFsb2cuXG4gKiBJdCBpbmNsdWRlcyB2YXJpb3VzIGN1c3RvbWl6YWJsZSBwcm9wZXJ0aWVzIGFuZCBpbXBvcnRzIG5lY2Vzc2FyeSBtb2R1bGVzIGFuZCBjb21wb25lbnRzLlxuICpcbiAqIEBzZWxlY3RvciBhcHAtbWVudS1tb2RhbFxuICogQHRlbXBsYXRlVXJsIC4vbWVudS1tb2RhbC5jb21wb25lbnQuaHRtbFxuICogQHN0eWxlVXJscyAuL21lbnUtbW9kYWwuY29tcG9uZW50LmNzc1xuICpcbiAqIEBpbnB1dHNcbiAqIEBpbnB1dCB7c3RyaW5nfSBiYWNrZ3JvdW5kQ29sb3IgLSBUaGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgbW9kYWwgY29udGVudC4gRGVmYXVsdCBpcyAnIzgzYzBlOScuXG4gKiBAaW5wdXQge2Jvb2xlYW59IGlzVmlzaWJsZSAtIERldGVybWluZXMgd2hldGhlciB0aGUgbW9kYWwgaXMgdmlzaWJsZS5cbiAqIEBpbnB1dCB7Q3VzdG9tQnV0dG9uW119IGN1c3RvbUJ1dHRvbnMgLSBBbiBhcnJheSBvZiBjdXN0b20gYnV0dG9ucyB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIG1vZGFsLlxuICogQGlucHV0IHtib29sZWFufSBzaGFyZUJ1dHRvbnMgLSBEZXRlcm1pbmVzIHdoZXRoZXIgc2hhcmUgYnV0dG9ucyBhcmUgZGlzcGxheWVkLiBEZWZhdWx0IGlzIHRydWUuXG4gKiBAaW5wdXQge3N0cmluZ30gcG9zaXRpb24gLSBUaGUgcG9zaXRpb24gb2YgdGhlIG1vZGFsIG9uIHRoZSBzY3JlZW4uIERlZmF1bHQgaXMgJ2JvdHRvbVJpZ2h0Jy5cbiAqIEBpbnB1dCB7c3RyaW5nfSByb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSByb29tLlxuICogQGlucHV0IHtzdHJpbmd9IGFkbWluUGFzc2NvZGUgLSBUaGUgYWRtaW4gcGFzc2NvZGUgZm9yIHRoZSByb29tLlxuICogQGlucHV0IHtzdHJpbmd9IGlzbGV2ZWwgLSBUaGUgbGV2ZWwgb2YgdGhlIHVzZXIuXG4gKiBAaW5wdXQgeygpID0+IHZvaWR9IG9uQ2xvc2UgLSBBIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBtb2RhbCBpcyBjbG9zZWQuXG4gKlxuICogQG1ldGhvZHNcbiAqIEBtZXRob2QgbW9kYWxDb250YWluZXJTdHlsZSAtIFJldHVybnMgdGhlIHN0eWxlIG9iamVjdCBmb3IgdGhlIG1vZGFsIGNvbnRhaW5lci5cbiAqIEBtZXRob2QgbW9kYWxDb250ZW50U3R5bGUgLSBSZXR1cm5zIHRoZSBzdHlsZSBvYmplY3QgZm9yIHRoZSBtb2RhbCBjb250ZW50LlxuICogQG1ldGhvZCBoYW5kbGVDbG9zZSAtIENhbGxzIHRoZSBvbkNsb3NlIGZ1bmN0aW9uIHRvIGhhbmRsZSBjbG9zaW5nIHRoZSBtb2RhbC5cbiAqXG4gKiBAZGVwZW5kZW5jaWVzXG4gKiAtIENvbW1vbk1vZHVsZVxuICogLSBGb250QXdlc29tZU1vZHVsZVxuICogLSBGb3Jtc01vZHVsZVxuICogLSBDdXN0b21CdXR0b25zXG4gKiAtIE1lZXRpbmdJZENvbXBvbmVudFxuICogLSBNZWV0aW5nUGFzc2NvZGVDb21wb25lbnRcbiAqIC0gU2hhcmVCdXR0b25zQ29tcG9uZW50XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tZW51LW1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lbnUtbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tZW51LW1vZGFsLmNvbXBvbmVudC5jc3MnXSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb250QXdlc29tZU1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBDdXN0b21CdXR0b25zLFxuICAgIE1lZXRpbmdJZENvbXBvbmVudCxcbiAgICBNZWV0aW5nUGFzc2NvZGVDb21wb25lbnQsXG4gICAgU2hhcmVCdXR0b25zQ29tcG9uZW50LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNZW51TW9kYWwge1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3IgPSAnIzgzYzBlOSc7XG4gIEBJbnB1dCgpIGlzVmlzaWJsZSE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIGN1c3RvbUJ1dHRvbnM6IEN1c3RvbUJ1dHRvbltdID0gW107XG4gIEBJbnB1dCgpIHNoYXJlQnV0dG9ucyA9IHRydWU7XG4gIEBJbnB1dCgpIHBvc2l0aW9uID0gJ2JvdHRvbVJpZ2h0JztcbiAgQElucHV0KCkgcm9vbU5hbWUhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGFkbWluUGFzc2NvZGUhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlzbGV2ZWwhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGV2ZW50VHlwZSE6IEV2ZW50VHlwZTtcbiAgLy8gRGVmaW5lIGlucHV0cyBmb3IgZnVuY3Rpb25zXG4gIEBJbnB1dCgpIG9uQ2xvc2UhOiAoKSA9PiB2b2lkO1xuXG4gIGZhQmFycyA9IGZhQmFycztcbiAgZmFUaW1lcyA9IGZhVGltZXM7XG5cbiAgbW9kYWxDb250YWluZXJTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjUpJyxcbiAgICAgIGRpc3BsYXk6IHRoaXMuaXNWaXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgIHpJbmRleDogOTk5LFxuICAgIH07XG4gIH1cblxuICBtb2RhbENvbnRlbnRTdHlsZSgpIHtcbiAgICBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBtb2RhbFdpZHRoID0gMC43ICogc2NyZWVuV2lkdGg7XG5cbiAgICBpZiAobW9kYWxXaWR0aCA+IDQwMCkge1xuICAgICAgbW9kYWxXaWR0aCA9IDQwMDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmJhY2tncm91bmRDb2xvcixcbiAgICAgIGJvcmRlclJhZGl1czogJzEwcHgnLFxuICAgICAgcGFkZGluZzogJzVweCcsXG4gICAgICB3aWR0aDogYCR7bW9kYWxXaWR0aH1weGAsXG4gICAgICBtYXhIZWlnaHQ6ICc4MCUnLFxuICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICB0b3A6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ3RvcCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgYm90dG9tOiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdib3R0b20nKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICAgIGxlZnQ6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ0xlZnQnKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICAgIHJpZ2h0OiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdSaWdodCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgIH07XG4gIH1cblxuICBoYW5kbGVDbG9zZSgpIHtcbiAgICB0aGlzLm9uQ2xvc2UoKTtcbiAgfVxufVxuIiwiPGRpdiBbbmdTdHlsZV09XCJtb2RhbENvbnRhaW5lclN0eWxlKClcIj5cclxuICA8ZGl2IGNsYXNzPVwibW9kYWwtY29udGVudFwiIFtuZ1N0eWxlXT1cIm1vZGFsQ29udGVudFN0eWxlKClcIj5cclxuICAgIDxkaXYgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47IGFsaWduLWl0ZW1zOiBjZW50ZXI7IG1hcmdpbi1ib3R0b206IDEwcHg7XCI+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJmb250LXNpemU6IDE4cHg7IGZvbnQtd2VpZ2h0OiBib2xkOyBjb2xvcjogYmxhY2s7XCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFCYXJzXCIgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGNvbG9yOiBibGFjaztcIj48L2ZhLWljb24+IE1lbnVcclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgKGNsaWNrKT1cImhhbmRsZUNsb3NlKClcIiBzdHlsZT1cInBhZGRpbmc6IDVweDtcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRpbWVzXCIgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGNvbG9yOiBibGFjaztcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8aHIgc3R5bGU9XCJoZWlnaHQ6IDFweDsgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7IG1hcmdpbjogNXB4IDA7XCIgLz5cclxuICAgIDxkaXYgc3R5bGU9XCJmbGV4OiAxO1wiPlxyXG4gICAgICA8ZGl2IHN0eWxlPVwibWF4LWhlaWdodDogY2FsYyg3MCUgLSA3MHB4KTsgb3ZlcmZsb3cteTogYXV0bztcIj5cclxuICAgICAgICA8YXBwLWN1c3RvbS1idXR0b25zIFtidXR0b25zXT1cImN1c3RvbUJ1dHRvbnNcIj48L2FwcC1jdXN0b20tYnV0dG9ucz5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwiaGVpZ2h0OiAxcHg7IGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7IG1hcmdpbjogMTBweCAwO1wiPjwvZGl2PlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc2xldmVsID09PSAnMidcIj5cclxuICAgICAgICAgIDxhcHAtbWVldGluZy1wYXNzY29kZS1jb21wb25lbnRcclxuICAgICAgICAgICAgW21lZXRpbmdQYXNzY29kZV09XCJhZG1pblBhc3Njb2RlXCJcclxuICAgICAgICAgID48L2FwcC1tZWV0aW5nLXBhc3Njb2RlLWNvbXBvbmVudD5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLWJvdHRvbTogMTBweDtcIj5cclxuICAgICAgICAgIDxhcHAtbWVldGluZy1pZC1jb21wb25lbnQgW21lZXRpbmdJRF09XCJyb29tTmFtZVwiPjwvYXBwLW1lZXRpbmctaWQtY29tcG9uZW50PlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0cnVlXCI+XHJcbiAgICAgICAgICA8YXBwLXNoYXJlLWJ1dHRvbnMtY29tcG9uZW50IFttZWV0aW5nSURdPVwicm9vbU5hbWVcIiBbZXZlbnRUeXBlXT1cImV2ZW50VHlwZVwiPjwvYXBwLXNoYXJlLWJ1dHRvbnMtY29tcG9uZW50PlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19