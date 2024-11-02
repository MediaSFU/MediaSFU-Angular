import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMicrophone, faMicrophoneSlash, faComment, faTrash, faDotCircle, } from '@fortawesome/free-solid-svg-icons';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
/**
 * Component representing an individual participant item in the participant list.
 * Provides controls for muting, messaging, and removing a participant.
 *
 * @component
 * @selector app-participant-list-item
 * @standalone true
 * @templateUrl ./participant-list-item.component.html
 * @styleUrls ['./participant-list-item.component.css']
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @example
 * ```html
 * <app-participant-list-item [participant]="participant" [isBroadcast]="isBroadcast"
 *                            [onMuteParticipants]="muteHandler" [onMessageParticipants]="messageHandler"
 *                            [onRemoveParticipants]="removeHandler" [socket]="socket" [member]="member">
 * </app-participant-list-item>
 * ```
 */
export class ParticipantListItem {
    participant;
    isBroadcast;
    onMuteParticipants;
    onMessageParticipants;
    onRemoveParticipants;
    socket;
    coHostResponsibility;
    member;
    islevel;
    showAlert;
    coHost;
    roomName;
    updateIsMessagesModalVisible;
    updateDirectMessageDetails;
    updateStartDirectMessage;
    participants;
    updateParticipants;
    faMicrophone = faMicrophone;
    faMicrophoneSlash = faMicrophoneSlash;
    faComment = faComment;
    faTrash = faTrash;
    faDotCircle = faDotCircle;
    getIconName() {
        return this.participant.muted ? this.faMicrophoneSlash : this.faMicrophone;
    }
    muteParticipant() {
        if (this.onMuteParticipants) {
            this.onMuteParticipants({
                socket: this.socket,
                participant: this.participant,
                coHostResponsibility: this.coHostResponsibility,
                member: this.member,
                islevel: this.islevel,
                showAlert: this.showAlert,
                coHost: this.coHost,
                roomName: this.roomName,
            });
        }
    }
    messageParticipant() {
        if (this.onMessageParticipants) {
            this.onMessageParticipants({
                participant: this.participant,
                coHostResponsibility: this.coHostResponsibility,
                member: this.member,
                islevel: this.islevel,
                showAlert: this.showAlert,
                coHost: this.coHost,
                updateIsMessagesModalVisible: this.updateIsMessagesModalVisible,
                updateDirectMessageDetails: this.updateDirectMessageDetails,
                updateStartDirectMessage: this.updateStartDirectMessage,
            });
        }
    }
    removeParticipant() {
        if (this.onRemoveParticipants) {
            this.onRemoveParticipants({
                socket: this.socket,
                participant: this.participant,
                coHostResponsibility: this.coHostResponsibility,
                member: this.member,
                islevel: this.islevel,
                showAlert: this.showAlert,
                coHost: this.coHost,
                roomName: this.roomName,
                participants: this.participants,
                updateParticipants: this.updateParticipants,
            });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ParticipantListItem, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: ParticipantListItem, isStandalone: true, selector: "app-participant-list-item", inputs: { participant: "participant", isBroadcast: "isBroadcast", onMuteParticipants: "onMuteParticipants", onMessageParticipants: "onMessageParticipants", onRemoveParticipants: "onRemoveParticipants", socket: "socket", coHostResponsibility: "coHostResponsibility", member: "member", islevel: "islevel", showAlert: "showAlert", coHost: "coHost", roomName: "roomName", updateIsMessagesModalVisible: "updateIsMessagesModalVisible", updateDirectMessageDetails: "updateDirectMessageDetails", updateStartDirectMessage: "updateStartDirectMessage", participants: "participants", updateParticipants: "updateParticipants" }, ngImport: i0, template: "<div class=\"container\" style=\"display: flex; flex-direction: row; align-items: center; margin-bottom: 0px; margin-top: 0px;\">\r\n  <div class=\"nameContainer\" style=\"flex: 4;\">\r\n    <p class=\"nameText\" style=\"font-size: 16px;\">\r\n      {{ participant.islevel === '2' ? participant.name + ' (host)' : participant.name }}\r\n    </p>\r\n  </div>\r\n  <div *ngIf=\"!isBroadcast\" class=\"iconContainer\" style=\"flex: 1; align-items: center;\">\r\n    <fa-icon [icon]=\"participant.muted ? faDotCircle : faDotCircle\" [style.font-size.px]=\"20\" [style.color]=\"participant.muted ? 'red' : 'green'\"></fa-icon>\r\n  </div>\r\n  <div *ngIf=\"!isBroadcast\" class=\"buttonContainer\" style=\"flex: 2; align-items: flex-end;\">\r\n    <button (click)=\"muteParticipant()\" style=\"padding: 5px; border-radius: 5px; align-items: center; background-color: #007bff; color: white;\">\r\n      <fa-icon [icon]=\"getIconName()\" style=\"font-size: 20px;\"></fa-icon>\r\n    </button>\r\n  </div>\r\n  <div *ngIf=\"!isBroadcast\" class=\"buttonContainer\" style=\"flex: 2; align-items: flex-end;\">\r\n    <button (click)=\"messageParticipant()\" style=\"padding: 5px; border-radius: 5px; align-items: center; background-color: #007bff; color: white;\">\r\n      <fa-icon [icon]=\"faComment\" style=\"font-size: 20px; color: white;\"></fa-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"buttonContainer\" style=\"flex: 2; align-items: flex-end;\">\r\n    <button (click)=\"removeParticipant()\" style=\"padding: 5px; border-radius: 5px; align-items: center; background-color: #dc3545; color: white;\">\r\n      <fa-icon [icon]=\"faTrash\" style=\"font-size: 20px; color: white;\"></fa-icon>\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [".container{display:flex;flex-direction:row;align-items:center;margin-bottom:0;margin-top:0}.nameContainer{flex:4}.nameText{font-size:16px}.iconContainer,.buttonContainer{flex:2;align-items:center}button{padding:5px;border-radius:5px;background-color:#007bff;color:#fff}button.remove{background-color:#dc3545}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ParticipantListItem, decorators: [{
            type: Component,
            args: [{ selector: 'app-participant-list-item', standalone: true, imports: [CommonModule, FontAwesomeModule], template: "<div class=\"container\" style=\"display: flex; flex-direction: row; align-items: center; margin-bottom: 0px; margin-top: 0px;\">\r\n  <div class=\"nameContainer\" style=\"flex: 4;\">\r\n    <p class=\"nameText\" style=\"font-size: 16px;\">\r\n      {{ participant.islevel === '2' ? participant.name + ' (host)' : participant.name }}\r\n    </p>\r\n  </div>\r\n  <div *ngIf=\"!isBroadcast\" class=\"iconContainer\" style=\"flex: 1; align-items: center;\">\r\n    <fa-icon [icon]=\"participant.muted ? faDotCircle : faDotCircle\" [style.font-size.px]=\"20\" [style.color]=\"participant.muted ? 'red' : 'green'\"></fa-icon>\r\n  </div>\r\n  <div *ngIf=\"!isBroadcast\" class=\"buttonContainer\" style=\"flex: 2; align-items: flex-end;\">\r\n    <button (click)=\"muteParticipant()\" style=\"padding: 5px; border-radius: 5px; align-items: center; background-color: #007bff; color: white;\">\r\n      <fa-icon [icon]=\"getIconName()\" style=\"font-size: 20px;\"></fa-icon>\r\n    </button>\r\n  </div>\r\n  <div *ngIf=\"!isBroadcast\" class=\"buttonContainer\" style=\"flex: 2; align-items: flex-end;\">\r\n    <button (click)=\"messageParticipant()\" style=\"padding: 5px; border-radius: 5px; align-items: center; background-color: #007bff; color: white;\">\r\n      <fa-icon [icon]=\"faComment\" style=\"font-size: 20px; color: white;\"></fa-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"buttonContainer\" style=\"flex: 2; align-items: flex-end;\">\r\n    <button (click)=\"removeParticipant()\" style=\"padding: 5px; border-radius: 5px; align-items: center; background-color: #dc3545; color: white;\">\r\n      <fa-icon [icon]=\"faTrash\" style=\"font-size: 20px; color: white;\"></fa-icon>\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [".container{display:flex;flex-direction:row;align-items:center;margin-bottom:0;margin-top:0}.nameContainer{flex:4}.nameText{font-size:16px}.iconContainer,.buttonContainer{flex:2;align-items:center}button{padding:5px;border-radius:5px;background-color:#007bff;color:#fff}button.remove{background-color:#dc3545}\n"] }]
        }], propDecorators: { participant: [{
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
            }], participants: [{
                type: Input
            }], updateParticipants: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGljaXBhbnQtbGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL3BhcnRpY2lwYW50cy1jb21wb25lbnRzL3BhcnRpY2lwYW50LWxpc3QtaXRlbS9wYXJ0aWNpcGFudC1saXN0LWl0ZW0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvcGFydGljaXBhbnRzLWNvbXBvbmVudHMvcGFydGljaXBhbnQtbGlzdC1pdGVtL3BhcnRpY2lwYW50LWxpc3QtaXRlbS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUNMLFlBQVksRUFDWixpQkFBaUIsRUFDakIsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEdBQ1osTUFBTSxtQ0FBbUMsQ0FBQzs7OztBQWtDM0M7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRztBQVNILE1BQU0sT0FBTyxtQkFBbUI7SUFDckIsV0FBVyxDQUFlO0lBQzFCLFdBQVcsQ0FBVztJQUN0QixrQkFBa0IsQ0FBa0M7SUFDcEQscUJBQXFCLENBQXlCO0lBQzlDLG9CQUFvQixDQUFrQztJQUN0RCxNQUFNLENBQVU7SUFDaEIsb0JBQW9CLENBQTBCO0lBQzlDLE1BQU0sQ0FBVTtJQUNoQixPQUFPLENBQVU7SUFDakIsU0FBUyxDQUFhO0lBQ3RCLE1BQU0sQ0FBVTtJQUNoQixRQUFRLENBQVU7SUFDbEIsNEJB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Q0cscUJBQXFCO3NCQUE3QixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyw0QkFBNEI7c0JBQXBDLEtBQUs7Z0JBQ0csMEJBQTBCO3NCQUFsQyxLQUFLO2dCQUNHLHdCQUF3QjtzQkFBaEMsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7XG4gIGZhTWljcm9waG9uZSxcbiAgZmFNaWNyb3Bob25lU2xhc2gsXG4gIGZhQ29tbWVudCxcbiAgZmFUcmFzaCxcbiAgZmFEb3RDaXJjbGUsXG59IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQge1xuICBDb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgTWVzc2FnZVBhcnRpY2lwYW50c1R5cGUsXG4gIE11dGVQYXJ0aWNpcGFudHNUeXBlLFxuICBQYXJ0aWNpcGFudCxcbiAgUmVtb3ZlUGFydGljaXBhbnRzVHlwZSxcbiAgU2hvd0FsZXJ0LFxufSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnOyAvLyBBZGp1c3QgdGhlIGltcG9ydCBiYXNlZCBvbiB5b3VyIGZpbGUgc3RydWN0dXJlXG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcblxuZXhwb3J0IGludGVyZmFjZSBQYXJ0aWNpcGFudExpc3RJdGVtT3B0aW9ucyB7XG4gIHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudDtcbiAgaXNCcm9hZGNhc3Q6IGJvb2xlYW47XG4gIG9uTXV0ZVBhcnRpY2lwYW50czogTXV0ZVBhcnRpY2lwYW50c1R5cGU7XG4gIG9uTWVzc2FnZVBhcnRpY2lwYW50czogTWVzc2FnZVBhcnRpY2lwYW50c1R5cGU7XG4gIG9uUmVtb3ZlUGFydGljaXBhbnRzOiBSZW1vdmVQYXJ0aWNpcGFudHNUeXBlO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IENvSG9zdFJlc3BvbnNpYmlsaXR5W107XG4gIG1lbWJlcjogc3RyaW5nO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgY29Ib3N0OiBzdHJpbmc7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHM6IChwYXJ0aWNpcGFudDogUGFydGljaXBhbnQgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2U6IChzdGFydDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlUGFydGljaXBhbnRzOiAocGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgdHlwZSBQYXJ0aWNpcGFudExpc3RJdGVtVHlwZSA9IChvcHRpb25zOiBQYXJ0aWNpcGFudExpc3RJdGVtT3B0aW9ucykgPT4gSFRNTEVsZW1lbnQ7XG5cblxuLyoqXG4gKiBDb21wb25lbnQgcmVwcmVzZW50aW5nIGFuIGluZGl2aWR1YWwgcGFydGljaXBhbnQgaXRlbSBpbiB0aGUgcGFydGljaXBhbnQgbGlzdC5cbiAqIFByb3ZpZGVzIGNvbnRyb2xzIGZvciBtdXRpbmcsIG1lc3NhZ2luZywgYW5kIHJlbW92aW5nIGEgcGFydGljaXBhbnQuXG4gKlxuICogQGNvbXBvbmVudFxuICogQHNlbGVjdG9yIGFwcC1wYXJ0aWNpcGFudC1saXN0LWl0ZW1cbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEB0ZW1wbGF0ZVVybCAuL3BhcnRpY2lwYW50LWxpc3QtaXRlbS5jb21wb25lbnQuaHRtbFxuICogQHN0eWxlVXJscyBbJy4vcGFydGljaXBhbnQtbGlzdC1pdGVtLmNvbXBvbmVudC5jc3MnXVxuICogQGltcG9ydHMgW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtcGFydGljaXBhbnQtbGlzdC1pdGVtIFtwYXJ0aWNpcGFudF09XCJwYXJ0aWNpcGFudFwiIFtpc0Jyb2FkY2FzdF09XCJpc0Jyb2FkY2FzdFwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbb25NdXRlUGFydGljaXBhbnRzXT1cIm11dGVIYW5kbGVyXCIgW29uTWVzc2FnZVBhcnRpY2lwYW50c109XCJtZXNzYWdlSGFuZGxlclwiXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbb25SZW1vdmVQYXJ0aWNpcGFudHNdPVwicmVtb3ZlSGFuZGxlclwiIFtzb2NrZXRdPVwic29ja2V0XCIgW21lbWJlcl09XCJtZW1iZXJcIj5cbiAqIDwvYXBwLXBhcnRpY2lwYW50LWxpc3QtaXRlbT5cbiAqIGBgYFxuICovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1wYXJ0aWNpcGFudC1saXN0LWl0ZW0nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICB0ZW1wbGF0ZVVybDogJy4vcGFydGljaXBhbnQtbGlzdC1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcGFydGljaXBhbnQtbGlzdC1pdGVtLmNvbXBvbmVudC5jc3MnXSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBQYXJ0aWNpcGFudExpc3RJdGVtIHtcbiAgQElucHV0KCkgcGFydGljaXBhbnQhOiBQYXJ0aWNpcGFudDtcbiAgQElucHV0KCkgaXNCcm9hZGNhc3QhOiBib29sZWFuO1xuICBASW5wdXQoKSBvbk11dGVQYXJ0aWNpcGFudHMhOiAocGFyYW1zOiBhbnkpID0+IFByb21pc2U8dm9pZD47XG4gIEBJbnB1dCgpIG9uTWVzc2FnZVBhcnRpY2lwYW50cyE6IChwYXJhbXM6IGFueSkgPT4gdm9pZDtcbiAgQElucHV0KCkgb25SZW1vdmVQYXJ0aWNpcGFudHMhOiAocGFyYW1zOiBhbnkpID0+IFByb21pc2U8dm9pZD47XG4gIEBJbnB1dCgpIHNvY2tldCE6IFNvY2tldDtcbiAgQElucHV0KCkgY29Ib3N0UmVzcG9uc2liaWxpdHkhOiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdO1xuICBASW5wdXQoKSBtZW1iZXIhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGlzbGV2ZWwhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgQElucHV0KCkgY29Ib3N0ITogc3RyaW5nO1xuICBASW5wdXQoKSByb29tTmFtZSE6IHN0cmluZztcbiAgQElucHV0KCkgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZSE6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIEBJbnB1dCgpIHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzITogKHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCB8IG51bGwpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZSE6IChzdGFydDogYm9vbGVhbikgPT4gdm9pZDtcbiAgQElucHV0KCkgcGFydGljaXBhbnRzITogUGFydGljaXBhbnRbXTtcbiAgQElucHV0KCkgdXBkYXRlUGFydGljaXBhbnRzITogKHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXSkgPT4gdm9pZDtcblxuICBmYU1pY3JvcGhvbmUgPSBmYU1pY3JvcGhvbmU7XG4gIGZhTWljcm9waG9uZVNsYXNoID0gZmFNaWNyb3Bob25lU2xhc2g7XG4gIGZhQ29tbWVudCA9IGZhQ29tbWVudDtcbiAgZmFUcmFzaCA9IGZhVHJhc2g7XG4gIGZhRG90Q2lyY2xlID0gZmFEb3RDaXJjbGU7XG5cbiAgZ2V0SWNvbk5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMucGFydGljaXBhbnQubXV0ZWQgPyB0aGlzLmZhTWljcm9waG9uZVNsYXNoIDogdGhpcy5mYU1pY3JvcGhvbmU7XG4gIH1cblxuICBtdXRlUGFydGljaXBhbnQoKSB7XG4gICAgaWYgKHRoaXMub25NdXRlUGFydGljaXBhbnRzKSB7XG4gICAgICB0aGlzLm9uTXV0ZVBhcnRpY2lwYW50cyh7XG4gICAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQsXG4gICAgICAgIHBhcnRpY2lwYW50OiB0aGlzLnBhcnRpY2lwYW50LFxuICAgICAgICBjb0hvc3RSZXNwb25zaWJpbGl0eTogdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlcixcbiAgICAgICAgaXNsZXZlbDogdGhpcy5pc2xldmVsLFxuICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LFxuICAgICAgICBjb0hvc3Q6IHRoaXMuY29Ib3N0LFxuICAgICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG1lc3NhZ2VQYXJ0aWNpcGFudCgpIHtcbiAgICBpZiAodGhpcy5vbk1lc3NhZ2VQYXJ0aWNpcGFudHMpIHtcbiAgICAgIHRoaXMub25NZXNzYWdlUGFydGljaXBhbnRzKHtcbiAgICAgICAgcGFydGljaXBhbnQ6IHRoaXMucGFydGljaXBhbnQsXG4gICAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLFxuICAgICAgICBpc2xldmVsOiB0aGlzLmlzbGV2ZWwsXG4gICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQsXG4gICAgICAgIGNvSG9zdDogdGhpcy5jb0hvc3QsXG4gICAgICAgIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGU6IHRoaXMudXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZSxcbiAgICAgICAgdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHM6IHRoaXMudXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHMsXG4gICAgICAgIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZTogdGhpcy51cGRhdGVTdGFydERpcmVjdE1lc3NhZ2UsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZW1vdmVQYXJ0aWNpcGFudCgpIHtcbiAgICBpZiAodGhpcy5vblJlbW92ZVBhcnRpY2lwYW50cykge1xuICAgICAgdGhpcy5vblJlbW92ZVBhcnRpY2lwYW50cyh7XG4gICAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQsXG4gICAgICAgIHBhcnRpY2lwYW50OiB0aGlzLnBhcnRpY2lwYW50LFxuICAgICAgICBjb0hvc3RSZXNwb25zaWJpbGl0eTogdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlcixcbiAgICAgICAgaXNsZXZlbDogdGhpcy5pc2xldmVsLFxuICAgICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LFxuICAgICAgICBjb0hvc3Q6IHRoaXMuY29Ib3N0LFxuICAgICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZSxcbiAgICAgICAgcGFydGljaXBhbnRzOiB0aGlzLnBhcnRpY2lwYW50cyxcbiAgICAgICAgdXBkYXRlUGFydGljaXBhbnRzOiB0aGlzLnVwZGF0ZVBhcnRpY2lwYW50cyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiIHN0eWxlPVwiZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IHJvdzsgYWxpZ24taXRlbXM6IGNlbnRlcjsgbWFyZ2luLWJvdHRvbTogMHB4OyBtYXJnaW4tdG9wOiAwcHg7XCI+XHJcbiAgPGRpdiBjbGFzcz1cIm5hbWVDb250YWluZXJcIiBzdHlsZT1cImZsZXg6IDQ7XCI+XHJcbiAgICA8cCBjbGFzcz1cIm5hbWVUZXh0XCIgc3R5bGU9XCJmb250LXNpemU6IDE2cHg7XCI+XHJcbiAgICAgIHt7IHBhcnRpY2lwYW50LmlzbGV2ZWwgPT09ICcyJyA/IHBhcnRpY2lwYW50Lm5hbWUgKyAnIChob3N0KScgOiBwYXJ0aWNpcGFudC5uYW1lIH19XHJcbiAgICA8L3A+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiAqbmdJZj1cIiFpc0Jyb2FkY2FzdFwiIGNsYXNzPVwiaWNvbkNvbnRhaW5lclwiIHN0eWxlPVwiZmxleDogMTsgYWxpZ24taXRlbXM6IGNlbnRlcjtcIj5cclxuICAgIDxmYS1pY29uIFtpY29uXT1cInBhcnRpY2lwYW50Lm11dGVkID8gZmFEb3RDaXJjbGUgOiBmYURvdENpcmNsZVwiIFtzdHlsZS5mb250LXNpemUucHhdPVwiMjBcIiBbc3R5bGUuY29sb3JdPVwicGFydGljaXBhbnQubXV0ZWQgPyAncmVkJyA6ICdncmVlbidcIj48L2ZhLWljb24+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiAqbmdJZj1cIiFpc0Jyb2FkY2FzdFwiIGNsYXNzPVwiYnV0dG9uQ29udGFpbmVyXCIgc3R5bGU9XCJmbGV4OiAyOyBhbGlnbi1pdGVtczogZmxleC1lbmQ7XCI+XHJcbiAgICA8YnV0dG9uIChjbGljayk9XCJtdXRlUGFydGljaXBhbnQoKVwiIHN0eWxlPVwicGFkZGluZzogNXB4OyBib3JkZXItcmFkaXVzOiA1cHg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGJhY2tncm91bmQtY29sb3I6ICMwMDdiZmY7IGNvbG9yOiB3aGl0ZTtcIj5cclxuICAgICAgPGZhLWljb24gW2ljb25dPVwiZ2V0SWNvbk5hbWUoKVwiIHN0eWxlPVwiZm9udC1zaXplOiAyMHB4O1wiPjwvZmEtaWNvbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgKm5nSWY9XCIhaXNCcm9hZGNhc3RcIiBjbGFzcz1cImJ1dHRvbkNvbnRhaW5lclwiIHN0eWxlPVwiZmxleDogMjsgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1wiPlxyXG4gICAgPGJ1dHRvbiAoY2xpY2spPVwibWVzc2FnZVBhcnRpY2lwYW50KClcIiBzdHlsZT1cInBhZGRpbmc6IDVweDsgYm9yZGVyLXJhZGl1czogNXB4OyBhbGlnbi1pdGVtczogY2VudGVyOyBiYWNrZ3JvdW5kLWNvbG9yOiAjMDA3YmZmOyBjb2xvcjogd2hpdGU7XCI+XHJcbiAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhQ29tbWVudFwiIHN0eWxlPVwiZm9udC1zaXplOiAyMHB4OyBjb2xvcjogd2hpdGU7XCI+PC9mYS1pY29uPlxyXG4gICAgPC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cImJ1dHRvbkNvbnRhaW5lclwiIHN0eWxlPVwiZmxleDogMjsgYWxpZ24taXRlbXM6IGZsZXgtZW5kO1wiPlxyXG4gICAgPGJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlUGFydGljaXBhbnQoKVwiIHN0eWxlPVwicGFkZGluZzogNXB4OyBib3JkZXItcmFkaXVzOiA1cHg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGJhY2tncm91bmQtY29sb3I6ICNkYzM1NDU7IGNvbG9yOiB3aGl0ZTtcIj5cclxuICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFUcmFzaFwiIHN0eWxlPVwiZm9udC1zaXplOiAyMHB4OyBjb2xvcjogd2hpdGU7XCI+PC9mYS1pY29uPlxyXG4gICAgPC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=