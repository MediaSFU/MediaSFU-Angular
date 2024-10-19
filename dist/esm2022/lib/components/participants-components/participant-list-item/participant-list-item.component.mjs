import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMicrophone, faMicrophoneSlash, faComment, faTrash, faDotCircle, } from '@fortawesome/free-solid-svg-icons';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGljaXBhbnQtbGlzdC1pdGVtLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL3BhcnRpY2lwYW50cy1jb21wb25lbnRzL3BhcnRpY2lwYW50LWxpc3QtaXRlbS9wYXJ0aWNpcGFudC1saXN0LWl0ZW0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvcGFydGljaXBhbnRzLWNvbXBvbmVudHMvcGFydGljaXBhbnQtbGlzdC1pdGVtL3BhcnRpY2lwYW50LWxpc3QtaXRlbS5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUNMLFlBQVksRUFDWixpQkFBaUIsRUFDakIsU0FBUyxFQUNULE9BQU8sRUFDUCxXQUFXLEdBQ1osTUFBTSxtQ0FBbUMsQ0FBQzs7OztBQXdDM0MsTUFBTSxPQUFPLG1CQUFtQjtJQUNyQixXQUFXLENBQWU7SUFDMUIsV0FBVyxDQUFXO0lBQ3RCLGtCQUFrQixDQUFrQztJQUNwRCxxQkFBcUIsQ0FBeUI7SUFDOUMsb0JBQW9CLENBQWtDO0lBQ3RELE1BQU0sQ0FBVTtJQUNoQixvQkFBb0IsQ0FBMEI7SUFDOUMsTUFBTSxDQUFVO0lBQ2hCLE9BQU8sQ0FBVTtJQUNqQixTQUFTLENBQWE7SUFDdEIsTUFBTSxDQUFVO0lBQ2hCLFFBQVEsQ0FBVTtJQUNsQiw0QkFBNEIsQ0FBZ0M7SUFDNUQsMEJBQTBCLENBQTZD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b0JBQW9CO3NCQUE1QixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLDRCQUE0QjtzQkFBcEMsS0FBSztnQkFDRywwQkFBMEI7c0JBQWxDLEtBQUs7Z0JBQ0csd0JBQXdCO3NCQUFoQyxLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHtcbiAgZmFNaWNyb3Bob25lLFxuICBmYU1pY3JvcGhvbmVTbGFzaCxcbiAgZmFDb21tZW50LFxuICBmYVRyYXNoLFxuICBmYURvdENpcmNsZSxcbn0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7XG4gIENvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICBNZXNzYWdlUGFydGljaXBhbnRzVHlwZSxcbiAgTXV0ZVBhcnRpY2lwYW50c1R5cGUsXG4gIFBhcnRpY2lwYW50LFxuICBSZW1vdmVQYXJ0aWNpcGFudHNUeXBlLFxuICBTaG93QWxlcnQsXG59IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7IC8vIEFkanVzdCB0aGUgaW1wb3J0IGJhc2VkIG9uIHlvdXIgZmlsZSBzdHJ1Y3R1cmVcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBhcnRpY2lwYW50TGlzdEl0ZW1PcHRpb25zIHtcbiAgcGFydGljaXBhbnQ6IFBhcnRpY2lwYW50O1xuICBpc0Jyb2FkY2FzdDogYm9vbGVhbjtcbiAgb25NdXRlUGFydGljaXBhbnRzOiBNdXRlUGFydGljaXBhbnRzVHlwZTtcbiAgb25NZXNzYWdlUGFydGljaXBhbnRzOiBNZXNzYWdlUGFydGljaXBhbnRzVHlwZTtcbiAgb25SZW1vdmVQYXJ0aWNpcGFudHM6IFJlbW92ZVBhcnRpY2lwYW50c1R5cGU7XG4gIHNvY2tldDogU29ja2V0O1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIGlzbGV2ZWw6IHN0cmluZztcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBjb0hvc3Q6IHN0cmluZztcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsczogKHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZTogKHN0YXJ0OiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVQYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10pID0+IHZvaWQ7XG59XG5cbmV4cG9ydCB0eXBlIFBhcnRpY2lwYW50TGlzdEl0ZW1UeXBlID0gKG9wdGlvbnM6IFBhcnRpY2lwYW50TGlzdEl0ZW1PcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXBhcnRpY2lwYW50LWxpc3QtaXRlbScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHRlbXBsYXRlVXJsOiAnLi9wYXJ0aWNpcGFudC1saXN0LWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wYXJ0aWNpcGFudC1saXN0LWl0ZW0uY29tcG9uZW50LmNzcyddLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFBhcnRpY2lwYW50TGlzdEl0ZW0ge1xuICBASW5wdXQoKSBwYXJ0aWNpcGFudCE6IFBhcnRpY2lwYW50O1xuICBASW5wdXQoKSBpc0Jyb2FkY2FzdCE6IGJvb2xlYW47XG4gIEBJbnB1dCgpIG9uTXV0ZVBhcnRpY2lwYW50cyE6IChwYXJhbXM6IGFueSkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgQElucHV0KCkgb25NZXNzYWdlUGFydGljaXBhbnRzITogKHBhcmFtczogYW55KSA9PiB2b2lkO1xuICBASW5wdXQoKSBvblJlbW92ZVBhcnRpY2lwYW50cyE6IChwYXJhbXM6IGFueSkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgQElucHV0KCkgc29ja2V0ITogU29ja2V0O1xuICBASW5wdXQoKSBjb0hvc3RSZXNwb25zaWJpbGl0eSE6IENvSG9zdFJlc3BvbnNpYmlsaXR5W107XG4gIEBJbnB1dCgpIG1lbWJlciE6IHN0cmluZztcbiAgQElucHV0KCkgaXNsZXZlbCE6IHN0cmluZztcbiAgQElucHV0KCkgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBASW5wdXQoKSBjb0hvc3QhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHJvb21OYW1lITogc3RyaW5nO1xuICBASW5wdXQoKSB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlITogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgQElucHV0KCkgdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHMhOiAocGFydGljaXBhbnQ6IFBhcnRpY2lwYW50IHwgbnVsbCkgPT4gdm9pZDtcbiAgQElucHV0KCkgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlITogKHN0YXJ0OiBib29sZWFuKSA9PiB2b2lkO1xuICBASW5wdXQoKSBwYXJ0aWNpcGFudHMhOiBQYXJ0aWNpcGFudFtdO1xuICBASW5wdXQoKSB1cGRhdGVQYXJ0aWNpcGFudHMhOiAocGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdKSA9PiB2b2lkO1xuXG4gIGZhTWljcm9waG9uZSA9IGZhTWljcm9waG9uZTtcbiAgZmFNaWNyb3Bob25lU2xhc2ggPSBmYU1pY3JvcGhvbmVTbGFzaDtcbiAgZmFDb21tZW50ID0gZmFDb21tZW50O1xuICBmYVRyYXNoID0gZmFUcmFzaDtcbiAgZmFEb3RDaXJjbGUgPSBmYURvdENpcmNsZTtcblxuICBnZXRJY29uTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5wYXJ0aWNpcGFudC5tdXRlZCA/IHRoaXMuZmFNaWNyb3Bob25lU2xhc2ggOiB0aGlzLmZhTWljcm9waG9uZTtcbiAgfVxuXG4gIG11dGVQYXJ0aWNpcGFudCgpIHtcbiAgICBpZiAodGhpcy5vbk11dGVQYXJ0aWNpcGFudHMpIHtcbiAgICAgIHRoaXMub25NdXRlUGFydGljaXBhbnRzKHtcbiAgICAgICAgc29ja2V0OiB0aGlzLnNvY2tldCxcbiAgICAgICAgcGFydGljaXBhbnQ6IHRoaXMucGFydGljaXBhbnQsXG4gICAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLFxuICAgICAgICBpc2xldmVsOiB0aGlzLmlzbGV2ZWwsXG4gICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQsXG4gICAgICAgIGNvSG9zdDogdGhpcy5jb0hvc3QsXG4gICAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbWVzc2FnZVBhcnRpY2lwYW50KCkge1xuICAgIGlmICh0aGlzLm9uTWVzc2FnZVBhcnRpY2lwYW50cykge1xuICAgICAgdGhpcy5vbk1lc3NhZ2VQYXJ0aWNpcGFudHMoe1xuICAgICAgICBwYXJ0aWNpcGFudDogdGhpcy5wYXJ0aWNpcGFudCxcbiAgICAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHksXG4gICAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIsXG4gICAgICAgIGlzbGV2ZWw6IHRoaXMuaXNsZXZlbCxcbiAgICAgICAgc2hvd0FsZXJ0OiB0aGlzLnNob3dBbGVydCxcbiAgICAgICAgY29Ib3N0OiB0aGlzLmNvSG9zdCxcbiAgICAgICAgdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZTogdGhpcy51cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlLFxuICAgICAgICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsczogdGhpcy51cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlscyxcbiAgICAgICAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlOiB0aGlzLnVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlbW92ZVBhcnRpY2lwYW50KCkge1xuICAgIGlmICh0aGlzLm9uUmVtb3ZlUGFydGljaXBhbnRzKSB7XG4gICAgICB0aGlzLm9uUmVtb3ZlUGFydGljaXBhbnRzKHtcbiAgICAgICAgc29ja2V0OiB0aGlzLnNvY2tldCxcbiAgICAgICAgcGFydGljaXBhbnQ6IHRoaXMucGFydGljaXBhbnQsXG4gICAgICAgIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5LFxuICAgICAgICBtZW1iZXI6IHRoaXMubWVtYmVyLFxuICAgICAgICBpc2xldmVsOiB0aGlzLmlzbGV2ZWwsXG4gICAgICAgIHNob3dBbGVydDogdGhpcy5zaG93QWxlcnQsXG4gICAgICAgIGNvSG9zdDogdGhpcy5jb0hvc3QsXG4gICAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLFxuICAgICAgICBwYXJ0aWNpcGFudHM6IHRoaXMucGFydGljaXBhbnRzLFxuICAgICAgICB1cGRhdGVQYXJ0aWNpcGFudHM6IHRoaXMudXBkYXRlUGFydGljaXBhbnRzLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCIgc3R5bGU9XCJkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogcm93OyBhbGlnbi1pdGVtczogY2VudGVyOyBtYXJnaW4tYm90dG9tOiAwcHg7IG1hcmdpbi10b3A6IDBweDtcIj5cclxuICA8ZGl2IGNsYXNzPVwibmFtZUNvbnRhaW5lclwiIHN0eWxlPVwiZmxleDogNDtcIj5cclxuICAgIDxwIGNsYXNzPVwibmFtZVRleHRcIiBzdHlsZT1cImZvbnQtc2l6ZTogMTZweDtcIj5cclxuICAgICAge3sgcGFydGljaXBhbnQuaXNsZXZlbCA9PT0gJzInID8gcGFydGljaXBhbnQubmFtZSArICcgKGhvc3QpJyA6IHBhcnRpY2lwYW50Lm5hbWUgfX1cclxuICAgIDwvcD5cclxuICA8L2Rpdj5cclxuICA8ZGl2ICpuZ0lmPVwiIWlzQnJvYWRjYXN0XCIgY2xhc3M9XCJpY29uQ29udGFpbmVyXCIgc3R5bGU9XCJmbGV4OiAxOyBhbGlnbi1pdGVtczogY2VudGVyO1wiPlxyXG4gICAgPGZhLWljb24gW2ljb25dPVwicGFydGljaXBhbnQubXV0ZWQgPyBmYURvdENpcmNsZSA6IGZhRG90Q2lyY2xlXCIgW3N0eWxlLmZvbnQtc2l6ZS5weF09XCIyMFwiIFtzdHlsZS5jb2xvcl09XCJwYXJ0aWNpcGFudC5tdXRlZCA/ICdyZWQnIDogJ2dyZWVuJ1wiPjwvZmEtaWNvbj5cclxuICA8L2Rpdj5cclxuICA8ZGl2ICpuZ0lmPVwiIWlzQnJvYWRjYXN0XCIgY2xhc3M9XCJidXR0b25Db250YWluZXJcIiBzdHlsZT1cImZsZXg6IDI7IGFsaWduLWl0ZW1zOiBmbGV4LWVuZDtcIj5cclxuICAgIDxidXR0b24gKGNsaWNrKT1cIm11dGVQYXJ0aWNpcGFudCgpXCIgc3R5bGU9XCJwYWRkaW5nOiA1cHg7IGJvcmRlci1yYWRpdXM6IDVweDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogIzAwN2JmZjsgY29sb3I6IHdoaXRlO1wiPlxyXG4gICAgICA8ZmEtaWNvbiBbaWNvbl09XCJnZXRJY29uTmFtZSgpXCIgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7XCI+PC9mYS1pY29uPlxyXG4gICAgPC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiAqbmdJZj1cIiFpc0Jyb2FkY2FzdFwiIGNsYXNzPVwiYnV0dG9uQ29udGFpbmVyXCIgc3R5bGU9XCJmbGV4OiAyOyBhbGlnbi1pdGVtczogZmxleC1lbmQ7XCI+XHJcbiAgICA8YnV0dG9uIChjbGljayk9XCJtZXNzYWdlUGFydGljaXBhbnQoKVwiIHN0eWxlPVwicGFkZGluZzogNXB4OyBib3JkZXItcmFkaXVzOiA1cHg7IGFsaWduLWl0ZW1zOiBjZW50ZXI7IGJhY2tncm91bmQtY29sb3I6ICMwMDdiZmY7IGNvbG9yOiB3aGl0ZTtcIj5cclxuICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFDb21tZW50XCIgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGNvbG9yOiB3aGl0ZTtcIj48L2ZhLWljb24+XHJcbiAgICA8L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwiYnV0dG9uQ29udGFpbmVyXCIgc3R5bGU9XCJmbGV4OiAyOyBhbGlnbi1pdGVtczogZmxleC1lbmQ7XCI+XHJcbiAgICA8YnV0dG9uIChjbGljayk9XCJyZW1vdmVQYXJ0aWNpcGFudCgpXCIgc3R5bGU9XCJwYWRkaW5nOiA1cHg7IGJvcmRlci1yYWRpdXM6IDVweDsgYWxpZ24taXRlbXM6IGNlbnRlcjsgYmFja2dyb3VuZC1jb2xvcjogI2RjMzU0NTsgY29sb3I6IHdoaXRlO1wiPlxyXG4gICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRyYXNoXCIgc3R5bGU9XCJmb250LXNpemU6IDIwcHg7IGNvbG9yOiB3aGl0ZTtcIj48L2ZhLWljb24+XHJcbiAgICA8L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==