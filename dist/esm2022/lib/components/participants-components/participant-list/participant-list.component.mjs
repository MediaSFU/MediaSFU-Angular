/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantListItem } from '../participant-list-item/participant-list-item.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * @component ParticipantList
 * @description Displays a list of participants and provides actions like muting, messaging, and removing participants.
 *
 * @selector app-participant-list
 * @standalone true
 * @templateUrl ./participant-list.component.html
 * @styleUrls ['./participant-list.component.css']
 * @imports [CommonModule, ParticipantListItem]
 *
 * @example
 * ```html
 * <app-participant-list [participants]="participants" [isBroadcast]="isBroadcast"
 *                       [onMuteParticipants]="muteParticipantsHandler"
 *                       [onMessageParticipants]="messageParticipantsHandler"
 *                       [onRemoveParticipants]="removeParticipantsHandler">
 * </app-participant-list>
 * ```
 */
export class ParticipantList {
    participants = [];
    isBroadcast = false;
    onMuteParticipants;
    onMessageParticipants;
    onRemoveParticipants;
    socket = {};
    coHostResponsibility = [];
    member = '';
    islevel = '';
    showAlert;
    coHost = '';
    roomName = '';
    updateIsMessagesModalVisible = () => { };
    updateDirectMessageDetails = () => { };
    updateStartDirectMessage = () => { };
    updateParticipants = () => { };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ParticipantList, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: ParticipantList, isStandalone: true, selector: "app-participant-list", inputs: { participants: "participants", isBroadcast: "isBroadcast", onMuteParticipants: "onMuteParticipants", onMessageParticipants: "onMessageParticipants", onRemoveParticipants: "onRemoveParticipants", socket: "socket", coHostResponsibility: "coHostResponsibility", member: "member", islevel: "islevel", showAlert: "showAlert", coHost: "coHost", roomName: "roomName", updateIsMessagesModalVisible: "updateIsMessagesModalVisible", updateDirectMessageDetails: "updateDirectMessageDetails", updateStartDirectMessage: "updateStartDirectMessage", updateParticipants: "updateParticipants" }, ngImport: i0, template: "<div *ngFor=\"let participant of participants; let i = index\">\r\n  <app-participant-list-item\r\n    [participant]=\"participant\"\r\n    [isBroadcast]=\"isBroadcast\"\r\n    [onMuteParticipants]=\"onMuteParticipants\"\r\n    [onMessageParticipants]=\"onMessageParticipants\"\r\n    [onRemoveParticipants]=\"onRemoveParticipants\"\r\n    [socket]=\"socket\"\r\n    [coHostResponsibility]=\"coHostResponsibility\"\r\n    [coHost]=\"coHost\"\r\n    [member]=\"member\"\r\n    [islevel]=\"islevel\"\r\n    [roomName]=\"roomName\"\r\n    [participants]=\"participants\"\r\n    [updateIsMessagesModalVisible]=\"updateIsMessagesModalVisible\"\r\n    [updateStartDirectMessage]=\"updateStartDirectMessage\"\r\n    [updateDirectMessageDetails]=\"updateDirectMessageDetails\"\r\n    [updateParticipants]=\"updateParticipants\"\r\n  ></app-participant-list-item>\r\n  <hr *ngIf=\"i < participants.length - 1\" class=\"separator\" />\r\n</div>\r\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ParticipantListItem, selector: "app-participant-list-item", inputs: ["participant", "isBroadcast", "onMuteParticipants", "onMessageParticipants", "onRemoveParticipants", "socket", "coHostResponsibility", "member", "islevel", "showAlert", "coHost", "roomName", "updateIsMessagesModalVisible", "updateDirectMessageDetails", "updateStartDirectMessage", "participants", "updateParticipants"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ParticipantList, decorators: [{
            type: Component,
            args: [{ selector: 'app-participant-list', standalone: true, imports: [CommonModule, ParticipantListItem], template: "<div *ngFor=\"let participant of participants; let i = index\">\r\n  <app-participant-list-item\r\n    [participant]=\"participant\"\r\n    [isBroadcast]=\"isBroadcast\"\r\n    [onMuteParticipants]=\"onMuteParticipants\"\r\n    [onMessageParticipants]=\"onMessageParticipants\"\r\n    [onRemoveParticipants]=\"onRemoveParticipants\"\r\n    [socket]=\"socket\"\r\n    [coHostResponsibility]=\"coHostResponsibility\"\r\n    [coHost]=\"coHost\"\r\n    [member]=\"member\"\r\n    [islevel]=\"islevel\"\r\n    [roomName]=\"roomName\"\r\n    [participants]=\"participants\"\r\n    [updateIsMessagesModalVisible]=\"updateIsMessagesModalVisible\"\r\n    [updateStartDirectMessage]=\"updateStartDirectMessage\"\r\n    [updateDirectMessageDetails]=\"updateDirectMessageDetails\"\r\n    [updateParticipants]=\"updateParticipants\"\r\n  ></app-participant-list-item>\r\n  <hr *ngIf=\"i < participants.length - 1\" class=\"separator\" />\r\n</div>\r\n" }]
        }], propDecorators: { participants: [{
                type: Input
            }], isBroadcast: [{
                type: Input
            }], onMuteParticipants: [{
                type: Input
            }], onMessageParticipants: [{
                type: Input
            }], onRemoveParticipants: [{
                type: Input
            }], socket: [{
                type: Input
            }], coHostResponsibility: [{
                type: Input
            }], member: [{
                type: Input
            }], islevel: [{
                type: Input
            }], showAlert: [{
                type: Input
            }], coHost: [{
                type: Input
            }], roomName: [{
                type: Input
            }], updateIsMessagesModalVisible: [{
                type: Input
            }], updateDirectMessageDetails: [{
                type: Input
            }], updateStartDirectMessage: [{
                type: Input
            }], updateParticipants: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGljaXBhbnQtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9wYXJ0aWNpcGFudHMtY29tcG9uZW50cy9wYXJ0aWNpcGFudC1saXN0L3BhcnRpY2lwYW50LWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvcGFydGljaXBhbnRzLWNvbXBvbmVudHMvcGFydGljaXBhbnQtbGlzdC9wYXJ0aWNpcGFudC1saXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHlEQUF5RDtBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMERBQTBELENBQUM7OztBQThCL0Y7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQVVILE1BQU0sT0FBTyxlQUFlO0lBQ2pCLFlBQVksR0FBa0IsRUFBRSxDQUFDO0lBQ2pDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDcEIsa0JBQWtCLENBQXVEO0lBQ3pFLHFCQUFxQixDQUFpRDtJQUN0RSxvQkFBb0IsQ0FBeUQ7SUFDN0UsTUFBTSxHQUFXLEVBQVksQ0FBQztJQUM5QixvQkFBb0IsR0FBMkIsRUFBRSxDQUFDO0lBQ2xELE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDWixPQUFPLEdBQUcsRUFBRSxDQUFDO0lBQ2IsU0FBUyxDQUFhO0lBQ3RCLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDWixRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2QsNEJBQTRCLEdBQWlDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQUN0RSwwQkFBMEIsR0FBOEMsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBQ2pGLHdCQUF3QixHQUE2QixHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFDOUQsa0JBQWtCLEdBQTBDLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQzt1R0FoQm5FLGVBQWU7MkZBQWYsZUFBZSw0cEJDN0Q1Qiw0NkJBcUJBLHlERG9DWSxZQUFZLGdRQUFFLG1CQUFtQjs7MkZBSWhDLGVBQWU7a0JBUDNCLFNBQVM7K0JBQ0Usc0JBQXNCLGNBQ3BCLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxtQkFBbUIsQ0FBQzs4QkFLbkMsWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLDRCQUE0QjtzQkFBcEMsS0FBSztnQkFDRywwQkFBMEI7c0JBQWxDLEtBQUs7Z0JBQ0csd0JBQXdCO3NCQUFoQyxLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvbiAqL1xuaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IFBhcnRpY2lwYW50TGlzdEl0ZW0gfSBmcm9tICcuLi9wYXJ0aWNpcGFudC1saXN0LWl0ZW0vcGFydGljaXBhbnQtbGlzdC1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQge1xuICBDb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgUGFydGljaXBhbnQsXG4gIFNob3dBbGVydCxcbiAgTXV0ZVBhcnRpY2lwYW50c09wdGlvbnMsXG4gIE1lc3NhZ2VQYXJ0aWNpcGFudHNPcHRpb25zLFxuICBSZW1vdmVQYXJ0aWNpcGFudHNPcHRpb25zLFxufSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFydGljaXBhbnRMaXN0T3B0aW9ucyB7XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgaXNCcm9hZGNhc3Q6IGJvb2xlYW47XG4gIG9uTXV0ZVBhcnRpY2lwYW50czogKG9wdGlvbnM6IE11dGVQYXJ0aWNpcGFudHNPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBvbk1lc3NhZ2VQYXJ0aWNpcGFudHM6IChvcHRpb25zOiBNZXNzYWdlUGFydGljaXBhbnRzT3B0aW9ucykgPT4gdm9pZDtcbiAgb25SZW1vdmVQYXJ0aWNpcGFudHM6IChvcHRpb25zOiBSZW1vdmVQYXJ0aWNpcGFudHNPcHRpb25zKSA9PiB2b2lkO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IENvSG9zdFJlc3BvbnNpYmlsaXR5W107XG4gIG1lbWJlcjogc3RyaW5nO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgY29Ib3N0OiBzdHJpbmc7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzOiAocGFydGljaXBhbnQ6IFBhcnRpY2lwYW50IHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlOiAoc3RhcnQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZVBhcnRpY2lwYW50czogKHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXSkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBAY29tcG9uZW50IFBhcnRpY2lwYW50TGlzdFxuICogQGRlc2NyaXB0aW9uIERpc3BsYXlzIGEgbGlzdCBvZiBwYXJ0aWNpcGFudHMgYW5kIHByb3ZpZGVzIGFjdGlvbnMgbGlrZSBtdXRpbmcsIG1lc3NhZ2luZywgYW5kIHJlbW92aW5nIHBhcnRpY2lwYW50cy5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLXBhcnRpY2lwYW50LWxpc3RcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEB0ZW1wbGF0ZVVybCAuL3BhcnRpY2lwYW50LWxpc3QuY29tcG9uZW50Lmh0bWxcbiAqIEBzdHlsZVVybHMgWycuL3BhcnRpY2lwYW50LWxpc3QuY29tcG9uZW50LmNzcyddXG4gKiBAaW1wb3J0cyBbQ29tbW9uTW9kdWxlLCBQYXJ0aWNpcGFudExpc3RJdGVtXVxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLXBhcnRpY2lwYW50LWxpc3QgW3BhcnRpY2lwYW50c109XCJwYXJ0aWNpcGFudHNcIiBbaXNCcm9hZGNhc3RdPVwiaXNCcm9hZGNhc3RcIlxuICogICAgICAgICAgICAgICAgICAgICAgIFtvbk11dGVQYXJ0aWNpcGFudHNdPVwibXV0ZVBhcnRpY2lwYW50c0hhbmRsZXJcIlxuICogICAgICAgICAgICAgICAgICAgICAgIFtvbk1lc3NhZ2VQYXJ0aWNpcGFudHNdPVwibWVzc2FnZVBhcnRpY2lwYW50c0hhbmRsZXJcIlxuICogICAgICAgICAgICAgICAgICAgICAgIFtvblJlbW92ZVBhcnRpY2lwYW50c109XCJyZW1vdmVQYXJ0aWNpcGFudHNIYW5kbGVyXCI+XG4gKiA8L2FwcC1wYXJ0aWNpcGFudC1saXN0PlxuICogYGBgXG4gKi9cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcGFydGljaXBhbnQtbGlzdCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIFBhcnRpY2lwYW50TGlzdEl0ZW1dLFxuICB0ZW1wbGF0ZVVybDogJy4vcGFydGljaXBhbnQtbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BhcnRpY2lwYW50LWxpc3QuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBQYXJ0aWNpcGFudExpc3Qge1xuICBASW5wdXQoKSBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10gPSBbXTtcbiAgQElucHV0KCkgaXNCcm9hZGNhc3QgPSBmYWxzZTtcbiAgQElucHV0KCkgb25NdXRlUGFydGljaXBhbnRzITogKG9wdGlvbnM6IE11dGVQYXJ0aWNpcGFudHNPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBASW5wdXQoKSBvbk1lc3NhZ2VQYXJ0aWNpcGFudHMhOiAob3B0aW9uczogTWVzc2FnZVBhcnRpY2lwYW50c09wdGlvbnMpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIG9uUmVtb3ZlUGFydGljaXBhbnRzITogKG9wdGlvbnM6IFJlbW92ZVBhcnRpY2lwYW50c09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG4gIEBJbnB1dCgpIHNvY2tldDogU29ja2V0ID0ge30gYXMgU29ja2V0O1xuICBASW5wdXQoKSBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXSA9IFtdO1xuICBASW5wdXQoKSBtZW1iZXIgPSAnJztcbiAgQElucHV0KCkgaXNsZXZlbCA9ICcnO1xuICBASW5wdXQoKSBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIEBJbnB1dCgpIGNvSG9zdCA9ICcnO1xuICBASW5wdXQoKSByb29tTmFtZSA9ICcnO1xuICBASW5wdXQoKSB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIEBJbnB1dCgpIHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzOiAocGFydGljaXBhbnQ6IFBhcnRpY2lwYW50IHwgbnVsbCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuICBASW5wdXQoKSB1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2U6IChzdGFydDogYm9vbGVhbikgPT4gdm9pZCA9ICgpID0+IHt9O1xuICBASW5wdXQoKSB1cGRhdGVQYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10pID0+IHZvaWQgPSAoKSA9PiB7fTtcbn1cbiIsIjxkaXYgKm5nRm9yPVwibGV0IHBhcnRpY2lwYW50IG9mIHBhcnRpY2lwYW50czsgbGV0IGkgPSBpbmRleFwiPlxyXG4gIDxhcHAtcGFydGljaXBhbnQtbGlzdC1pdGVtXHJcbiAgICBbcGFydGljaXBhbnRdPVwicGFydGljaXBhbnRcIlxyXG4gICAgW2lzQnJvYWRjYXN0XT1cImlzQnJvYWRjYXN0XCJcclxuICAgIFtvbk11dGVQYXJ0aWNpcGFudHNdPVwib25NdXRlUGFydGljaXBhbnRzXCJcclxuICAgIFtvbk1lc3NhZ2VQYXJ0aWNpcGFudHNdPVwib25NZXNzYWdlUGFydGljaXBhbnRzXCJcclxuICAgIFtvblJlbW92ZVBhcnRpY2lwYW50c109XCJvblJlbW92ZVBhcnRpY2lwYW50c1wiXHJcbiAgICBbc29ja2V0XT1cInNvY2tldFwiXHJcbiAgICBbY29Ib3N0UmVzcG9uc2liaWxpdHldPVwiY29Ib3N0UmVzcG9uc2liaWxpdHlcIlxyXG4gICAgW2NvSG9zdF09XCJjb0hvc3RcIlxyXG4gICAgW21lbWJlcl09XCJtZW1iZXJcIlxyXG4gICAgW2lzbGV2ZWxdPVwiaXNsZXZlbFwiXHJcbiAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWVcIlxyXG4gICAgW3BhcnRpY2lwYW50c109XCJwYXJ0aWNpcGFudHNcIlxyXG4gICAgW3VwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGVdPVwidXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZVwiXHJcbiAgICBbdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlXT1cInVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZVwiXHJcbiAgICBbdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHNdPVwidXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHNcIlxyXG4gICAgW3VwZGF0ZVBhcnRpY2lwYW50c109XCJ1cGRhdGVQYXJ0aWNpcGFudHNcIlxyXG4gID48L2FwcC1wYXJ0aWNpcGFudC1saXN0LWl0ZW0+XHJcbiAgPGhyICpuZ0lmPVwiaSA8IHBhcnRpY2lwYW50cy5sZW5ndGggLSAxXCIgY2xhc3M9XCJzZXBhcmF0b3JcIiAvPlxyXG48L2Rpdj5cclxuIl19