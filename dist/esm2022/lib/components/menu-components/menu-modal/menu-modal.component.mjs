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
 * Component for displaying a customizable menu modal with various options.
 *
 * @selector app-menu-modal
 * @standalone true
 * @templateUrl ./menu-modal.component.html
 * @styleUrls ./menu-modal.component.css
 *
 * @example
 * ```html
 * <app-menu-modal
 *   [isVisible]="true"
 *   backgroundColor="#83c0e9"
 *   roomName="Room 123"
 *   adminPasscode="AdminPass"
 *   [customButtons]="customButtons"
 *   [shareButtons]="true"
 *   position="bottomRight"
 *   (onClose)="closeMenu()"
 * ></app-menu-modal>
 * ```
 *
 * ```typescript
 * const customButtons = [
 *   { action: () => console.log('Clicked'), show: true, text: 'Button' },
 * ];
 * closeMenu() { console.log('Menu closed'); }
 * ```
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1tb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9tZW51LWNvbXBvbmVudHMvbWVudS1tb2RhbC9tZW51LW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21lbnUtY29tcG9uZW50cy9tZW51LW1vZGFsL21lbnUtbW9kYWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRTdDLE9BQU8sRUFBZ0IsYUFBYSxFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDekYsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDNUYsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sb0VBQW9FLENBQUM7QUFDOUcsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sOERBQThELENBQUM7Ozs7QUFtQnJHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNEJHO0FBa0JILE1BQU0sT0FBTyxTQUFTO0lBQ1gsZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUM1QixTQUFTLENBQVc7SUFDcEIsYUFBYSxHQUFtQixFQUFFLENBQUM7SUFDbkMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUNwQixRQUFRLEdBQUcsYUFBYSxDQUFDO0lBQ3pCLFFBQVEsQ0FBVTtJQUNsQixhQUFhLENBQVU7SUFDdkIsT0FBTyxDQUFVO0lBQ2pCLFNBQVMsQ0FBYTtJQUMvQiw4QkFBOEI7SUFDckIsT0FBTyxDQUFjO0lBRTlCLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDaEIsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUVsQixtQkFBbUI7UUFDakIsT0FBTztZQUNMLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLEdBQUcsRUFBRSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUM7WUFDUCxLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsZUFBZSxFQUFFLG9CQUFvQjtZQUNyQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNO1lBQzFDLE1BQU0sRUFBRSxHQUFHO1NBQ1osQ0FBQztJQUNKLENBQUM7SUFFRCxpQkFBaUI7UUFDZixNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3RDLElBQUksVUFBVSxHQUFHLEdBQUcsR0FBRyxXQUFXLENBQUM7UUFFbkMsSUFBSSxVQUFVLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDckIsVUFBVSxHQUFHLEdBQUcsQ0FBQztRQUNuQixDQUFDO1FBRUQsT0FBTztZQUNMLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxZQUFZLEVBQUUsTUFBTTtZQUNwQixPQUFPLEVBQUUsS0FBSztZQUNkLEtBQUssRUFBRSxHQUFHLFVBQVUsSUFBSTtZQUN4QixTQUFTLEVBQUUsS0FBSztZQUNoQixTQUFTLEVBQUUsTUFBTTtZQUNqQixHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUNwRCxNQUFNLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUMxRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUN0RCxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTTtTQUN6RCxDQUFDO0lBQ0osQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7SUFDakIsQ0FBQzt1R0FyRFUsU0FBUzsyRkFBVCxTQUFTLDRWQzFFdEIseWlEQThCQSxxYkRtQ0ksWUFBWSx1TkFDWixpQkFBaUIsNFBBQ2pCLFdBQVcsK0JBQ1gsYUFBYSxvRkFDYixrQkFBa0IsNEZBQ2xCLHdCQUF3Qix3R0FDeEIscUJBQXFCOzsyRkFHWixTQUFTO2tCQWZyQixTQUFTOytCQUNFLGdCQUFnQixjQUdkLElBQUksV0FDUDt3QkFDUCxZQUFZO3dCQUNaLGlCQUFpQjt3QkFDakIsV0FBVzt3QkFDWCxhQUFhO3dCQUNiLGtCQUFrQjt3QkFDbEIsd0JBQXdCO3dCQUN4QixxQkFBcUI7cUJBQ3RCOzhCQUdRLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxhQUFhO3NCQUFyQixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGFBQWE7c0JBQXJCLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBRUcsT0FBTztzQkFBZixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmFCYXJzLCBmYVRpbWVzIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuXG5pbXBvcnQgeyBDdXN0b21CdXR0b24sIEN1c3RvbUJ1dHRvbnMgfSBmcm9tICcuLi9jdXN0b20tYnV0dG9ucy9jdXN0b20tYnV0dG9ucy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWVldGluZ0lkQ29tcG9uZW50IH0gZnJvbSAnLi4vbWVldGluZy1pZC1jb21wb25lbnQvbWVldGluZy1pZC1jb21wb25lbnQuY29tcG9uZW50JztcbmltcG9ydCB7IE1lZXRpbmdQYXNzY29kZUNvbXBvbmVudCB9IGZyb20gJy4uL21lZXRpbmctcGFzc2NvZGUtY29tcG9uZW50L21lZXRpbmctcGFzc2NvZGUtY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTaGFyZUJ1dHRvbnNDb21wb25lbnQgfSBmcm9tICcuLi9zaGFyZS1idXR0b25zLWNvbXBvbmVudC9zaGFyZS1idXR0b25zLWNvbXBvbmVudC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBNZW51TW9kYWxPcHRpb25zIHtcbiAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG4gIGN1c3RvbUJ1dHRvbnM/OiBDdXN0b21CdXR0b25bXTtcbiAgc2hhcmVCdXR0b25zPzogYm9vbGVhbjtcbiAgcG9zaXRpb24/OiBzdHJpbmc7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIGFkbWluUGFzc2NvZGU6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcblxuICBvbkNsb3NlOiAoKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgdHlwZSBNZW51TW9kYWxUeXBlID0gKG9wdGlvbnM6IE1lbnVNb2RhbE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgZGlzcGxheWluZyBhIGN1c3RvbWl6YWJsZSBtZW51IG1vZGFsIHdpdGggdmFyaW91cyBvcHRpb25zLlxuICpcbiAqIEBzZWxlY3RvciBhcHAtbWVudS1tb2RhbFxuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQHRlbXBsYXRlVXJsIC4vbWVudS1tb2RhbC5jb21wb25lbnQuaHRtbFxuICogQHN0eWxlVXJscyAuL21lbnUtbW9kYWwuY29tcG9uZW50LmNzc1xuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLW1lbnUtbW9kYWxcbiAqICAgW2lzVmlzaWJsZV09XCJ0cnVlXCJcbiAqICAgYmFja2dyb3VuZENvbG9yPVwiIzgzYzBlOVwiXG4gKiAgIHJvb21OYW1lPVwiUm9vbSAxMjNcIlxuICogICBhZG1pblBhc3Njb2RlPVwiQWRtaW5QYXNzXCJcbiAqICAgW2N1c3RvbUJ1dHRvbnNdPVwiY3VzdG9tQnV0dG9uc1wiXG4gKiAgIFtzaGFyZUJ1dHRvbnNdPVwidHJ1ZVwiXG4gKiAgIHBvc2l0aW9uPVwiYm90dG9tUmlnaHRcIlxuICogICAob25DbG9zZSk9XCJjbG9zZU1lbnUoKVwiXG4gKiA+PC9hcHAtbWVudS1tb2RhbD5cbiAqIGBgYFxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IGN1c3RvbUJ1dHRvbnMgPSBbXG4gKiAgIHsgYWN0aW9uOiAoKSA9PiBjb25zb2xlLmxvZygnQ2xpY2tlZCcpLCBzaG93OiB0cnVlLCB0ZXh0OiAnQnV0dG9uJyB9LFxuICogXTtcbiAqIGNsb3NlTWVudSgpIHsgY29uc29sZS5sb2coJ01lbnUgY2xvc2VkJyk7IH1cbiAqIGBgYFxuICovXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1lbnUtbW9kYWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWVudS1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21lbnUtbW9kYWwuY29tcG9uZW50LmNzcyddLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlLFxuICAgIEZvbnRBd2Vzb21lTW9kdWxlLFxuICAgIEZvcm1zTW9kdWxlLFxuICAgIEN1c3RvbUJ1dHRvbnMsXG4gICAgTWVldGluZ0lkQ29tcG9uZW50LFxuICAgIE1lZXRpbmdQYXNzY29kZUNvbXBvbmVudCxcbiAgICBTaGFyZUJ1dHRvbnNDb21wb25lbnQsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVNb2RhbCB7XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICcjODNjMGU5JztcbiAgQElucHV0KCkgaXNWaXNpYmxlITogYm9vbGVhbjtcbiAgQElucHV0KCkgY3VzdG9tQnV0dG9uczogQ3VzdG9tQnV0dG9uW10gPSBbXTtcbiAgQElucHV0KCkgc2hhcmVCdXR0b25zID0gdHJ1ZTtcbiAgQElucHV0KCkgcG9zaXRpb24gPSAnYm90dG9tUmlnaHQnO1xuICBASW5wdXQoKSByb29tTmFtZSE6IHN0cmluZztcbiAgQElucHV0KCkgYWRtaW5QYXNzY29kZSE6IHN0cmluZztcbiAgQElucHV0KCkgaXNsZXZlbCE6IHN0cmluZztcbiAgQElucHV0KCkgZXZlbnRUeXBlITogRXZlbnRUeXBlO1xuICAvLyBEZWZpbmUgaW5wdXRzIGZvciBmdW5jdGlvbnNcbiAgQElucHV0KCkgb25DbG9zZSE6ICgpID0+IHZvaWQ7XG5cbiAgZmFCYXJzID0gZmFCYXJzO1xuICBmYVRpbWVzID0gZmFUaW1lcztcblxuICBtb2RhbENvbnRhaW5lclN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNSknLFxuICAgICAgZGlzcGxheTogdGhpcy5pc1Zpc2libGUgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgICAgekluZGV4OiA5OTksXG4gICAgfTtcbiAgfVxuXG4gIG1vZGFsQ29udGVudFN0eWxlKCkge1xuICAgIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IG1vZGFsV2lkdGggPSAwLjcgKiBzY3JlZW5XaWR0aDtcblxuICAgIGlmIChtb2RhbFdpZHRoID4gNDAwKSB7XG4gICAgICBtb2RhbFdpZHRoID0gNDAwO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMTBweCcsXG4gICAgICBwYWRkaW5nOiAnNXB4JyxcbiAgICAgIHdpZHRoOiBgJHttb2RhbFdpZHRofXB4YCxcbiAgICAgIG1heEhlaWdodDogJzgwJScsXG4gICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICAgIHRvcDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygndG9wJykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICBib3R0b206IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ2JvdHRvbScpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgbGVmdDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnTGVmdCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgcmlnaHQ6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ1JpZ2h0JykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgfTtcbiAgfVxuXG4gIGhhbmRsZUNsb3NlKCkge1xuICAgIHRoaXMub25DbG9zZSgpO1xuICB9XG59XG4iLCI8ZGl2IFtuZ1N0eWxlXT1cIm1vZGFsQ29udGFpbmVyU3R5bGUoKVwiPlxyXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCIgW25nU3R5bGVdPVwibW9kYWxDb250ZW50U3R5bGUoKVwiPlxyXG4gICAgPGRpdiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjsgYWxpZ24taXRlbXM6IGNlbnRlcjsgbWFyZ2luLWJvdHRvbTogMTBweDtcIj5cclxuICAgICAgPGRpdiBzdHlsZT1cImZvbnQtc2l6ZTogMThweDsgZm9udC13ZWlnaHQ6IGJvbGQ7IGNvbG9yOiBibGFjaztcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYUJhcnNcIiBzdHlsZT1cImZvbnQtc2l6ZTogMjBweDsgY29sb3I6IGJsYWNrO1wiPjwvZmEtaWNvbj4gTWVudVxyXG4gICAgICA8L2Rpdj5cclxuICAgICAgPGRpdiAoY2xpY2spPVwiaGFuZGxlQ2xvc2UoKVwiIHN0eWxlPVwicGFkZGluZzogNXB4O1wiPlxyXG4gICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhVGltZXNcIiBzdHlsZT1cImZvbnQtc2l6ZTogMjBweDsgY29sb3I6IGJsYWNrO1wiPjwvZmEtaWNvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxociBzdHlsZT1cImhlaWdodDogMXB4OyBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjazsgbWFyZ2luOiA1cHggMDtcIiAvPlxyXG4gICAgPGRpdiBzdHlsZT1cImZsZXg6IDE7XCI+XHJcbiAgICAgIDxkaXYgc3R5bGU9XCJtYXgtaGVpZ2h0OiBjYWxjKDcwJSAtIDcwcHgpOyBvdmVyZmxvdy15OiBhdXRvO1wiPlxyXG4gICAgICAgIDxhcHAtY3VzdG9tLWJ1dHRvbnMgW2J1dHRvbnNdPVwiY3VzdG9tQnV0dG9uc1wiPjwvYXBwLWN1c3RvbS1idXR0b25zPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJoZWlnaHQ6IDFweDsgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjsgbWFyZ2luOiAxMHB4IDA7XCI+PC9kaXY+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImlzbGV2ZWwgPT09ICcyJ1wiPlxyXG4gICAgICAgICAgPGFwcC1tZWV0aW5nLXBhc3Njb2RlLWNvbXBvbmVudFxyXG4gICAgICAgICAgICBbbWVldGluZ1Bhc3Njb2RlXT1cImFkbWluUGFzc2NvZGVcIlxyXG4gICAgICAgICAgPjwvYXBwLW1lZXRpbmctcGFzc2NvZGUtY29tcG9uZW50PlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tYm90dG9tOiAxMHB4O1wiPlxyXG4gICAgICAgICAgPGFwcC1tZWV0aW5nLWlkLWNvbXBvbmVudCBbbWVldGluZ0lEXT1cInJvb21OYW1lXCI+PC9hcHAtbWVldGluZy1pZC1jb21wb25lbnQ+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cInRydWVcIj5cclxuICAgICAgICAgIDxhcHAtc2hhcmUtYnV0dG9ucy1jb21wb25lbnQgW21lZXRpbmdJRF09XCJyb29tTmFtZVwiIFtldmVudFR5cGVdPVwiZXZlbnRUeXBlXCI+PC9hcHAtc2hhcmUtYnV0dG9ucy1jb21wb25lbnQ+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=