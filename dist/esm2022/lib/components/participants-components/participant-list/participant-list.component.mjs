/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantListItem } from '../participant-list-item/participant-list-item.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGljaXBhbnQtbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9wYXJ0aWNpcGFudHMtY29tcG9uZW50cy9wYXJ0aWNpcGFudC1saXN0L3BhcnRpY2lwYW50LWxpc3QuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvcGFydGljaXBhbnRzLWNvbXBvbmVudHMvcGFydGljaXBhbnQtbGlzdC9wYXJ0aWNpcGFudC1saXN0LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHlEQUF5RDtBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMERBQTBELENBQUM7OztBQXFDL0YsTUFBTSxPQUFPLGVBQWU7SUFDakIsWUFBWSxHQUFrQixFQUFFLENBQUM7SUFDakMsV0FBVyxHQUFHLEtBQUssQ0FBQztJQUNwQixrQkFBa0IsQ0FBdUQ7SUFDekUscUJBQXFCLENBQWlEO0lBQ3RFLG9CQUFvQixDQUF5RDtJQUM3RSxNQUFNLEdBQVcsRUFBWSxDQUFDO0lBQzlCLG9CQUFvQixHQUEyQixFQUFFLENBQUM7SUFDbEQsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNaLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFDYixTQUFTLENBQWE7SUFDdEIsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNaLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDZCw0QkFBNEIsR0FBaUMsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBQ3RFLDBCQUEwQixHQUE4QyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFDakYsd0JBQXdCLEdBQTZCLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQUM5RCxrQkFBa0IsR0FBMEMsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO3VHQWhCbkUsZUFBZTsyRkFBZixlQUFlLDRwQkN4QzVCLDQ2QkFxQkEseUREZVksWUFBWSxnUUFBRSxtQkFBbUI7OzJGQUloQyxlQUFlO2tCQVAzQixTQUFTOytCQUNFLHNCQUFzQixjQUNwQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsbUJBQW1CLENBQUM7OEJBS25DLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0cscUJBQXFCO3NCQUE3QixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyw0QkFBNEI7c0JBQXBDLEtBQUs7Z0JBQ0csMEJBQTBCO3NCQUFsQyxLQUFLO2dCQUNHLHdCQUF3QjtzQkFBaEMsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudExpc3RJdGVtIH0gZnJvbSAnLi4vcGFydGljaXBhbnQtbGlzdC1pdGVtL3BhcnRpY2lwYW50LWxpc3QtaXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgQ29Ib3N0UmVzcG9uc2liaWxpdHksXG4gIFBhcnRpY2lwYW50LFxuICBTaG93QWxlcnQsXG4gIE11dGVQYXJ0aWNpcGFudHNPcHRpb25zLFxuICBNZXNzYWdlUGFydGljaXBhbnRzT3B0aW9ucyxcbiAgUmVtb3ZlUGFydGljaXBhbnRzT3B0aW9ucyxcbn0gZnJvbSAnLi4vLi4vLi4vQHR5cGVzL3R5cGVzJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBhcnRpY2lwYW50TGlzdE9wdGlvbnMge1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIGlzQnJvYWRjYXN0OiBib29sZWFuO1xuICBvbk11dGVQYXJ0aWNpcGFudHM6IChvcHRpb25zOiBNdXRlUGFydGljaXBhbnRzT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcbiAgb25NZXNzYWdlUGFydGljaXBhbnRzOiAob3B0aW9uczogTWVzc2FnZVBhcnRpY2lwYW50c09wdGlvbnMpID0+IHZvaWQ7XG4gIG9uUmVtb3ZlUGFydGljaXBhbnRzOiAob3B0aW9uczogUmVtb3ZlUGFydGljaXBhbnRzT3B0aW9ucykgPT4gdm9pZDtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdO1xuICBtZW1iZXI6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIGNvSG9zdDogc3RyaW5nO1xuICByb29tTmFtZTogc3RyaW5nO1xuICB1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlOiAoaXNWaXNpYmxlOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsczogKHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZTogKHN0YXJ0OiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVQYXJ0aWNpcGFudHM6IChwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W10pID0+IHZvaWQ7XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1wYXJ0aWNpcGFudC1saXN0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUGFydGljaXBhbnRMaXN0SXRlbV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9wYXJ0aWNpcGFudC1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcGFydGljaXBhbnQtbGlzdC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFBhcnRpY2lwYW50TGlzdCB7XG4gIEBJbnB1dCgpIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXSA9IFtdO1xuICBASW5wdXQoKSBpc0Jyb2FkY2FzdCA9IGZhbHNlO1xuICBASW5wdXQoKSBvbk11dGVQYXJ0aWNpcGFudHMhOiAob3B0aW9uczogTXV0ZVBhcnRpY2lwYW50c09wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG4gIEBJbnB1dCgpIG9uTWVzc2FnZVBhcnRpY2lwYW50cyE6IChvcHRpb25zOiBNZXNzYWdlUGFydGljaXBhbnRzT3B0aW9ucykgPT4gdm9pZDtcbiAgQElucHV0KCkgb25SZW1vdmVQYXJ0aWNpcGFudHMhOiAob3B0aW9uczogUmVtb3ZlUGFydGljaXBhbnRzT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcbiAgQElucHV0KCkgc29ja2V0OiBTb2NrZXQgPSB7fSBhcyBTb2NrZXQ7XG4gIEBJbnB1dCgpIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdID0gW107XG4gIEBJbnB1dCgpIG1lbWJlciA9ICcnO1xuICBASW5wdXQoKSBpc2xldmVsID0gJyc7XG4gIEBJbnB1dCgpIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgQElucHV0KCkgY29Ib3N0ID0gJyc7XG4gIEBJbnB1dCgpIHJvb21OYW1lID0gJyc7XG4gIEBJbnB1dCgpIHVwZGF0ZUlzTWVzc2FnZXNNb2RhbFZpc2libGU6IChpc1Zpc2libGU6IGJvb2xlYW4pID0+IHZvaWQgPSAoKSA9PiB7fTtcbiAgQElucHV0KCkgdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHM6IChwYXJ0aWNpcGFudDogUGFydGljaXBhbnQgfCBudWxsKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIEBJbnB1dCgpIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZTogKHN0YXJ0OiBib29sZWFuKSA9PiB2b2lkID0gKCkgPT4ge307XG4gIEBJbnB1dCgpIHVwZGF0ZVBhcnRpY2lwYW50czogKHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXSkgPT4gdm9pZCA9ICgpID0+IHt9O1xufVxuIiwiPGRpdiAqbmdGb3I9XCJsZXQgcGFydGljaXBhbnQgb2YgcGFydGljaXBhbnRzOyBsZXQgaSA9IGluZGV4XCI+XHJcbiAgPGFwcC1wYXJ0aWNpcGFudC1saXN0LWl0ZW1cclxuICAgIFtwYXJ0aWNpcGFudF09XCJwYXJ0aWNpcGFudFwiXHJcbiAgICBbaXNCcm9hZGNhc3RdPVwiaXNCcm9hZGNhc3RcIlxyXG4gICAgW29uTXV0ZVBhcnRpY2lwYW50c109XCJvbk11dGVQYXJ0aWNpcGFudHNcIlxyXG4gICAgW29uTWVzc2FnZVBhcnRpY2lwYW50c109XCJvbk1lc3NhZ2VQYXJ0aWNpcGFudHNcIlxyXG4gICAgW29uUmVtb3ZlUGFydGljaXBhbnRzXT1cIm9uUmVtb3ZlUGFydGljaXBhbnRzXCJcclxuICAgIFtzb2NrZXRdPVwic29ja2V0XCJcclxuICAgIFtjb0hvc3RSZXNwb25zaWJpbGl0eV09XCJjb0hvc3RSZXNwb25zaWJpbGl0eVwiXHJcbiAgICBbY29Ib3N0XT1cImNvSG9zdFwiXHJcbiAgICBbbWVtYmVyXT1cIm1lbWJlclwiXHJcbiAgICBbaXNsZXZlbF09XCJpc2xldmVsXCJcclxuICAgIFtyb29tTmFtZV09XCJyb29tTmFtZVwiXHJcbiAgICBbcGFydGljaXBhbnRzXT1cInBhcnRpY2lwYW50c1wiXHJcbiAgICBbdXBkYXRlSXNNZXNzYWdlc01vZGFsVmlzaWJsZV09XCJ1cGRhdGVJc01lc3NhZ2VzTW9kYWxWaXNpYmxlXCJcclxuICAgIFt1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2VdPVwidXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlXCJcclxuICAgIFt1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsc109XCJ1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsc1wiXHJcbiAgICBbdXBkYXRlUGFydGljaXBhbnRzXT1cInVwZGF0ZVBhcnRpY2lwYW50c1wiXHJcbiAgPjwvYXBwLXBhcnRpY2lwYW50LWxpc3QtaXRlbT5cclxuICA8aHIgKm5nSWY9XCJpIDwgcGFydGljaXBhbnRzLmxlbmd0aCAtIDFcIiBjbGFzcz1cInNlcGFyYXRvclwiIC8+XHJcbjwvZGl2PlxyXG4iXX0=