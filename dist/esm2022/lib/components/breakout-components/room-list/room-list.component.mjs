import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPen, faTimes, faUsers } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
export class RoomListComponent {
    rooms = [];
    editRoom = new EventEmitter();
    deleteRoom = new EventEmitter();
    removeParticipant = new EventEmitter();
    faPen = faPen;
    faTimes = faTimes;
    faUsers = faUsers;
    handleEditRoom(roomIndex) {
        this.editRoom.emit(roomIndex);
    }
    handleDeleteRoom(roomIndex) {
        this.deleteRoom.emit(roomIndex);
    }
    handleRemoveParticipant(roomIndex, participant) {
        this.removeParticipant.emit({ roomIndex, participant });
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RoomListComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: RoomListComponent, isStandalone: true, selector: "app-room-list", inputs: { rooms: "rooms" }, outputs: { editRoom: "editRoom", deleteRoom: "deleteRoom", removeParticipant: "removeParticipant" }, ngImport: i0, template: "<div *ngFor=\"let room of rooms; let roomIndex = index\" class=\"card mb-3 text-dark\">\r\n    <div class=\"card-header d-flex justify-content-between align-items-center\">\r\n      <span>Room {{ roomIndex + 1 }} <fa-icon [icon]=\"faUsers\"></fa-icon></span>\r\n      <div>\r\n        <button class=\"btn btn-secondary btn-sm\" (click)=\"handleEditRoom(roomIndex)\">\r\n          <fa-icon [icon]=\"faPen\"></fa-icon>\r\n        </button>\r\n        <button class=\"btn btn-danger btn-sm\" (click)=\"handleDeleteRoom(roomIndex)\">\r\n          <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <ul class=\"list-group\">\r\n        <li *ngFor=\"let participant of room; let index = index\" class=\"list-group-item d-flex justify-content-between align-items-center text-dark\">\r\n          {{ participant.name }}\r\n          <button class=\"btn btn-danger btn-sm\" (click)=\"handleRemoveParticipant(roomIndex, participant)\">\r\n            <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n          </button>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RoomListComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-room-list', standalone: true, imports: [CommonModule, FontAwesomeModule], template: "<div *ngFor=\"let room of rooms; let roomIndex = index\" class=\"card mb-3 text-dark\">\r\n    <div class=\"card-header d-flex justify-content-between align-items-center\">\r\n      <span>Room {{ roomIndex + 1 }} <fa-icon [icon]=\"faUsers\"></fa-icon></span>\r\n      <div>\r\n        <button class=\"btn btn-secondary btn-sm\" (click)=\"handleEditRoom(roomIndex)\">\r\n          <fa-icon [icon]=\"faPen\"></fa-icon>\r\n        </button>\r\n        <button class=\"btn btn-danger btn-sm\" (click)=\"handleDeleteRoom(roomIndex)\">\r\n          <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n        </button>\r\n      </div>\r\n    </div>\r\n    <div class=\"card-body\">\r\n      <ul class=\"list-group\">\r\n        <li *ngFor=\"let participant of room; let index = index\" class=\"list-group-item d-flex justify-content-between align-items-center text-dark\">\r\n          {{ participant.name }}\r\n          <button class=\"btn btn-danger btn-sm\" (click)=\"handleRemoveParticipant(roomIndex, participant)\">\r\n            <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n          </button>\r\n        </li>\r\n      </ul>\r\n    </div>\r\n  </div>\r\n" }]
        }], propDecorators: { rooms: [{
                type: Input
            }], editRoom: [{
                type: Output
            }], deleteRoom: [{
                type: Output
            }], removeParticipant: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vbS1saXN0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2JyZWFrb3V0LWNvbXBvbmVudHMvcm9vbS1saXN0L3Jvb20tbGlzdC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9icmVha291dC1jb21wb25lbnRzL3Jvb20tbGlzdC9yb29tLWxpc3QuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM1RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7Ozs7QUFVL0MsTUFBTSxPQUFPLGlCQUFpQjtJQUU1QixLQUFLLEdBQTRCLEVBQUUsQ0FBQztJQUMxQixRQUFRLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUN0QyxVQUFVLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUN4QyxpQkFBaUIsR0FBRyxJQUFJLFlBQVksRUFHMUMsQ0FBQztJQUVMLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDZCxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ2xCLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFFbEIsY0FBYyxDQUFDLFNBQWlCO1FBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxTQUFpQjtRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsdUJBQXVCLENBQUMsU0FBaUIsRUFBRSxXQUE4QztRQUN2RixJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDMUQsQ0FBQzt1R0F4QlUsaUJBQWlCOzJGQUFqQixpQkFBaUIsME1DYjlCLDJuQ0F1QkEseUREZFksWUFBWSwySkFBRSxpQkFBaUI7OzJGQUk5QixpQkFBaUI7a0JBUDdCLFNBQVM7K0JBQ0UsZUFBZSxjQUNiLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQzs4QkFNMUMsS0FBSztzQkFESixLQUFLO2dCQUVJLFFBQVE7c0JBQWpCLE1BQU07Z0JBQ0csVUFBVTtzQkFBbkIsTUFBTTtnQkFDRyxpQkFBaUI7c0JBQTFCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XG5pbXBvcnQgeyBmYVBlbiwgZmFUaW1lcywgZmFVc2VycyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQnJlYWtvdXRQYXJ0aWNpcGFudCwgUGFydGljaXBhbnQgfSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcm9vbS1saXN0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdLFxuICB0ZW1wbGF0ZVVybDogJy4vcm9vbS1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcm9vbS1saXN0LmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgUm9vbUxpc3RDb21wb25lbnQge1xuICBASW5wdXQoKVxuICByb29tczogQnJlYWtvdXRQYXJ0aWNpcGFudFtdW10gPSBbXTtcbiAgQE91dHB1dCgpIGVkaXRSb29tID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSBkZWxldGVSb29tID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gIEBPdXRwdXQoKSByZW1vdmVQYXJ0aWNpcGFudCA9IG5ldyBFdmVudEVtaXR0ZXI8e1xuICAgIHJvb21JbmRleDogbnVtYmVyO1xuICAgIHBhcnRpY2lwYW50OiBCcmVha291dFBhcnRpY2lwYW50IHwgUGFydGljaXBhbnQ7XG4gIH0+KCk7XG5cbiAgZmFQZW4gPSBmYVBlbjtcbiAgZmFUaW1lcyA9IGZhVGltZXM7XG4gIGZhVXNlcnMgPSBmYVVzZXJzO1xuXG4gIGhhbmRsZUVkaXRSb29tKHJvb21JbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5lZGl0Um9vbS5lbWl0KHJvb21JbmRleCk7XG4gIH1cblxuICBoYW5kbGVEZWxldGVSb29tKHJvb21JbmRleDogbnVtYmVyKSB7XG4gICAgdGhpcy5kZWxldGVSb29tLmVtaXQocm9vbUluZGV4KTtcbiAgfVxuXG4gIGhhbmRsZVJlbW92ZVBhcnRpY2lwYW50KHJvb21JbmRleDogbnVtYmVyLCBwYXJ0aWNpcGFudDogQnJlYWtvdXRQYXJ0aWNpcGFudCB8IFBhcnRpY2lwYW50KSB7XG4gICAgdGhpcy5yZW1vdmVQYXJ0aWNpcGFudC5lbWl0KHsgcm9vbUluZGV4LCBwYXJ0aWNpcGFudCB9KTtcbiAgfVxufVxuIiwiPGRpdiAqbmdGb3I9XCJsZXQgcm9vbSBvZiByb29tczsgbGV0IHJvb21JbmRleCA9IGluZGV4XCIgY2xhc3M9XCJjYXJkIG1iLTMgdGV4dC1kYXJrXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZC1oZWFkZXIgZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlclwiPlxyXG4gICAgICA8c3Bhbj5Sb29tIHt7IHJvb21JbmRleCArIDEgfX0gPGZhLWljb24gW2ljb25dPVwiZmFVc2Vyc1wiPjwvZmEtaWNvbj48L3NwYW4+XHJcbiAgICAgIDxkaXY+XHJcbiAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5IGJ0bi1zbVwiIChjbGljayk9XCJoYW5kbGVFZGl0Um9vbShyb29tSW5kZXgpXCI+XHJcbiAgICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVBlblwiPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuLXNtXCIgKGNsaWNrKT1cImhhbmRsZURlbGV0ZVJvb20ocm9vbUluZGV4KVwiPlxyXG4gICAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFUaW1lc1wiPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJjYXJkLWJvZHlcIj5cclxuICAgICAgPHVsIGNsYXNzPVwibGlzdC1ncm91cFwiPlxyXG4gICAgICAgIDxsaSAqbmdGb3I9XCJsZXQgcGFydGljaXBhbnQgb2Ygcm9vbTsgbGV0IGluZGV4ID0gaW5kZXhcIiBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbSBkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gYWxpZ24taXRlbXMtY2VudGVyIHRleHQtZGFya1wiPlxyXG4gICAgICAgICAge3sgcGFydGljaXBhbnQubmFtZSB9fVxyXG4gICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tZGFuZ2VyIGJ0bi1zbVwiIChjbGljayk9XCJoYW5kbGVSZW1vdmVQYXJ0aWNpcGFudChyb29tSW5kZXgsIHBhcnRpY2lwYW50KVwiPlxyXG4gICAgICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRpbWVzXCI+PC9mYS1pY29uPlxyXG4gICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgPC9saT5cclxuICAgICAgPC91bD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG4iXX0=