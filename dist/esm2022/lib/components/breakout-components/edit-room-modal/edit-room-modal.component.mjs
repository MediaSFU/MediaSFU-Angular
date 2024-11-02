import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes, faPlus, faUsers, faPen } from '@fortawesome/free-solid-svg-icons';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
/**
 * EditRoomModalComponent allows managing participants within a breakout room for an event.
 *
 * @selector app-edit-room-modal
 * @inputs
 * - `editRoomModalVisible` (boolean): Controls the visibility of the edit room modal. Default is false.
 * - `currentRoom` (BreakoutParticipant[]): List of participants currently assigned to the room.
 * - `participantsRef` (Participant[]): Reference list of all participants.
 * - `currentRoomIndex` (number): Index of the room being edited.
 * - `position` (string): Position of the modal on the screen. Default is 'center'.
 * - `backgroundColor` (string): Background color of the modal. Default is '#fff'.
 *
 * @outputs
 * - `setEditRoomModalVisible` (EventEmitter<boolean>): Emits a boolean to toggle the visibility of the modal.
 * - `addParticipant` (EventEmitter<{ roomIndex: number; participant: Participant | BreakoutParticipant; }>): Emits data for adding a participant to the room.
 * - `removeParticipant` (EventEmitter<{ roomIndex: number; participant: Participant | BreakoutParticipant; }>): Emits data for removing a participant from the room.
 *
 * @methods
 * - `ngOnInit()`: Lifecycle hook to initialize modal width and attach resize event listener.
 * - `ngOnDestroy()`: Lifecycle hook to remove the resize event listener.
 * - `calculateModalWidth()`: Dynamically calculates and sets modal width based on screen width.
 * - `modalContainerStyle()`: Returns style object for modal container.
 * - `modalContentStyle()`: Returns style object for modal content.
 * - `handleAddParticipant(roomIndex: number, participant: BreakoutParticipant)`: Emits event to add participant to specified room.
 * - `handleRemoveParticipant(roomIndex: number, participant: BreakoutParticipant)`: Emits event to remove participant from specified room.
 * - `closeModal()`: Closes the modal by emitting a visibility change.
 * - `unassignedParticipants()`: Filters and returns a list of unassigned participants.
 *
 * @dependencies
 * - `CommonModule`: Provides Angular's common directives.
 * - `FontAwesomeModule`: Allows usage of Font Awesome icons.
 *
 * @example
 * ```html
 * <app-edit-room-modal
 *  [editRoomModalVisible]="editRoomModalVisible"
 * [currentRoom]="currentRoom"
 * [participantsRef]="participantsRef"
 * [currentRoomIndex]="currentRoomIndex"
 * [position]="position"
 * [backgroundColor]="backgroundColor"
 * (setEditRoomModalVisible)="setEditRoomModalVisible($event)"
 * (addParticipant)="addParticipant($event)"
 * (removeParticipant)="removeParticipant($event)">
 * </app-edit-room-modal>
 * ```
 *
 **/
export class EditRoomModalComponent {
    editRoomModalVisible = false;
    currentRoom = [];
    participantsRef = [];
    currentRoomIndex = -1;
    position = 'center';
    backgroundColor = '#fff';
    setEditRoomModalVisible = new EventEmitter();
    addParticipant = new EventEmitter();
    removeParticipant = new EventEmitter();
    faTimes = faTimes;
    faPlus = faPlus;
    faUsers = faUsers;
    faPen = faPen;
    modalWidth = 400;
    ngOnInit() {
        this.calculateModalWidth();
        window.addEventListener('resize', this.calculateModalWidth.bind(this));
    }
    ngOnDestroy() {
        window.removeEventListener('resize', this.calculateModalWidth.bind(this));
    }
    calculateModalWidth() {
        const screenWidth = window.innerWidth;
        this.modalWidth = screenWidth > 500 ? 400 : screenWidth * 0.8;
    }
    modalContainerStyle() {
        return {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        };
    }
    modalContentStyle() {
        return {
            backgroundColor: this.backgroundColor,
            borderRadius: '10px',
            padding: '20px',
            width: `${this.modalWidth}px`,
            maxHeight: '80%',
            overflowY: 'auto',
        };
    }
    handleAddParticipant(roomIndex, participant) {
        this.addParticipant.emit({ roomIndex, participant });
    }
    handleRemoveParticipant(roomIndex, participant) {
        this.removeParticipant.emit({ roomIndex, participant });
    }
    closeModal() {
        this.setEditRoomModalVisible.emit(false);
    }
    unassignedParticipants() {
        return this.participantsRef.filter((participant) => participant['breakRoom'] == null);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: EditRoomModalComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: EditRoomModalComponent, isStandalone: true, selector: "app-edit-room-modal", inputs: { editRoomModalVisible: "editRoomModalVisible", currentRoom: "currentRoom", participantsRef: "participantsRef", currentRoomIndex: "currentRoomIndex", position: "position", backgroundColor: "backgroundColor" }, outputs: { setEditRoomModalVisible: "setEditRoomModalVisible", addParticipant: "addParticipant", removeParticipant: "removeParticipant" }, ngImport: i0, template: "<div *ngIf=\"editRoomModalVisible\" class=\"modal-container\" [ngStyle]=\"modalContainerStyle()\">\r\n  <div class=\"modal-content text-dark\" [ngStyle]=\"modalContentStyle()\">\r\n    <div class=\"modal-header\">\r\n      <h5 class=\"modal-title\">Edit Room {{ currentRoomIndex + 1 }} <fa-icon [icon]=\"faPen\"></fa-icon></h5>\r\n      <button type=\"button\" class=\"close\" (click)=\"closeModal()\">\r\n        <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n      </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <div class=\"list-container\">\r\n        <h5>Assigned Participants <fa-icon [icon]=\"faUsers\"></fa-icon></h5>\r\n        <ul class=\"list-group\">\r\n          <li *ngFor=\"let participant of currentRoom; let i = index\" class=\"list-group-item d-flex justify-content-between align-items-center text-dark\">\r\n            {{ participant.name }}\r\n            <button class=\"btn btn-danger btn-sm\" (click)=\"handleRemoveParticipant(currentRoomIndex, participant)\">\r\n              <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n            </button>\r\n          </li>\r\n          <li *ngIf=\"currentRoom.length === 0\" class=\"list-group-item d-flex justify-content-between align-items-center text-dark\">\r\n            None assigned\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div class=\"list-container\">\r\n        <h5>Unassigned Participants <fa-icon [icon]=\"faUsers\"></fa-icon></h5>\r\n        <ul class=\"list-group\">\r\n          <li *ngFor=\"let participant of unassignedParticipants(); let i = index\" class=\"list-group-item d-flex justify-content-between align-items-center text-dark\">\r\n            {{ participant.name }}\r\n            <button class=\"btn btn-primary btn-sm\" (click)=\"handleAddParticipant(currentRoomIndex, participant)\">\r\n              <fa-icon [icon]=\"faPlus\"></fa-icon>\r\n            </button>\r\n          </li>\r\n          <li *ngIf=\"unassignedParticipants().length === 0\" class=\"list-group-item d-flex justify-content-between align-items-center text-dark\">\r\n            None pending\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n      <button type=\"button\" class=\"btn btn-secondary\" (click)=\"closeModal()\">Close</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-content{background-color:#fff;border-radius:10px;padding:20px;max-width:500px;max-height:80%;overflow-y:auto}.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.modal-title{font-size:1.25rem;font-weight:700}.list-container{border:1px solid #ccc;border-radius:5px;padding:10px;margin-bottom:20px}.list-group-item{display:flex;justify-content:space-between;align-items:center}.modal-footer{display:flex;justify-content:flex-end;margin-top:20px}.close-button{border:none;background:none;cursor:pointer}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: EditRoomModalComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-edit-room-modal', standalone: true, imports: [CommonModule, FontAwesomeModule], template: "<div *ngIf=\"editRoomModalVisible\" class=\"modal-container\" [ngStyle]=\"modalContainerStyle()\">\r\n  <div class=\"modal-content text-dark\" [ngStyle]=\"modalContentStyle()\">\r\n    <div class=\"modal-header\">\r\n      <h5 class=\"modal-title\">Edit Room {{ currentRoomIndex + 1 }} <fa-icon [icon]=\"faPen\"></fa-icon></h5>\r\n      <button type=\"button\" class=\"close\" (click)=\"closeModal()\">\r\n        <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n      </button>\r\n    </div>\r\n    <div class=\"modal-body\">\r\n      <div class=\"list-container\">\r\n        <h5>Assigned Participants <fa-icon [icon]=\"faUsers\"></fa-icon></h5>\r\n        <ul class=\"list-group\">\r\n          <li *ngFor=\"let participant of currentRoom; let i = index\" class=\"list-group-item d-flex justify-content-between align-items-center text-dark\">\r\n            {{ participant.name }}\r\n            <button class=\"btn btn-danger btn-sm\" (click)=\"handleRemoveParticipant(currentRoomIndex, participant)\">\r\n              <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n            </button>\r\n          </li>\r\n          <li *ngIf=\"currentRoom.length === 0\" class=\"list-group-item d-flex justify-content-between align-items-center text-dark\">\r\n            None assigned\r\n          </li>\r\n        </ul>\r\n      </div>\r\n      <div class=\"list-container\">\r\n        <h5>Unassigned Participants <fa-icon [icon]=\"faUsers\"></fa-icon></h5>\r\n        <ul class=\"list-group\">\r\n          <li *ngFor=\"let participant of unassignedParticipants(); let i = index\" class=\"list-group-item d-flex justify-content-between align-items-center text-dark\">\r\n            {{ participant.name }}\r\n            <button class=\"btn btn-primary btn-sm\" (click)=\"handleAddParticipant(currentRoomIndex, participant)\">\r\n              <fa-icon [icon]=\"faPlus\"></fa-icon>\r\n            </button>\r\n          </li>\r\n          <li *ngIf=\"unassignedParticipants().length === 0\" class=\"list-group-item d-flex justify-content-between align-items-center text-dark\">\r\n            None pending\r\n          </li>\r\n        </ul>\r\n      </div>\r\n    </div>\r\n    <div class=\"modal-footer\">\r\n      <button type=\"button\" class=\"btn btn-secondary\" (click)=\"closeModal()\">Close</button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-content{background-color:#fff;border-radius:10px;padding:20px;max-width:500px;max-height:80%;overflow-y:auto}.modal-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}.modal-title{font-size:1.25rem;font-weight:700}.list-container{border:1px solid #ccc;border-radius:5px;padding:10px;margin-bottom:20px}.list-group-item{display:flex;justify-content:space-between;align-items:center}.modal-footer{display:flex;justify-content:flex-end;margin-top:20px}.close-button{border:none;background:none;cursor:pointer}\n"] }]
        }], propDecorators: { editRoomModalVisible: [{
                type: Input
            }], currentRoom: [{
                type: Input
            }], participantsRef: [{
                type: Input
            }], currentRoomIndex: [{
                type: Input
            }], position: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], setEditRoomModalVisible: [{
                type: Output
            }], addParticipant: [{
                type: Output
            }], removeParticipant: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWRpdC1yb29tLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2JyZWFrb3V0LWNvbXBvbmVudHMvZWRpdC1yb29tLW1vZGFsL2VkaXQtcm9vbS1tb2RhbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9icmVha291dC1jb21wb25lbnRzL2VkaXQtcm9vbS1tb2RhbC9lZGl0LXJvb20tbW9kYWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBVSxNQUFNLGVBQWUsQ0FBQztBQUMvRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7O0FBR3BGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQStDSTtBQVVKLE1BQU0sT0FBTyxzQkFBc0I7SUFDeEIsb0JBQW9CLEdBQUcsS0FBSyxDQUFDO0lBQzdCLFdBQVcsR0FBMEIsRUFBRSxDQUFDO0lBQ3hDLGVBQWUsR0FBa0IsRUFBRSxDQUFDO0lBQ3BDLGdCQUFnQixHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RCLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDcEIsZUFBZSxHQUFHLE1BQU0sQ0FBQztJQUV4Qix1QkFBdUIsR0FBRyxJQUFJLFlBQVksRUFBVyxDQUFDO0lBQ3RELGNBQWMs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aEMsTUFBTTtnQkFDRyxjQUFjO3NCQUF2QixNQUFNO2dCQUlHLGlCQUFpQjtzQkFBMUIsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IGZhVGltZXMsIGZhUGx1cywgZmFVc2VycywgZmFQZW4gfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgQnJlYWtvdXRQYXJ0aWNpcGFudCwgUGFydGljaXBhbnQgfSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG4vKipcbiAqIEVkaXRSb29tTW9kYWxDb21wb25lbnQgYWxsb3dzIG1hbmFnaW5nIHBhcnRpY2lwYW50cyB3aXRoaW4gYSBicmVha291dCByb29tIGZvciBhbiBldmVudC5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLWVkaXQtcm9vbS1tb2RhbFxuICogQGlucHV0c1xuICogLSBgZWRpdFJvb21Nb2RhbFZpc2libGVgIChib29sZWFuKTogQ29udHJvbHMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGVkaXQgcm9vbSBtb2RhbC4gRGVmYXVsdCBpcyBmYWxzZS5cbiAqIC0gYGN1cnJlbnRSb29tYCAoQnJlYWtvdXRQYXJ0aWNpcGFudFtdKTogTGlzdCBvZiBwYXJ0aWNpcGFudHMgY3VycmVudGx5IGFzc2lnbmVkIHRvIHRoZSByb29tLlxuICogLSBgcGFydGljaXBhbnRzUmVmYCAoUGFydGljaXBhbnRbXSk6IFJlZmVyZW5jZSBsaXN0IG9mIGFsbCBwYXJ0aWNpcGFudHMuXG4gKiAtIGBjdXJyZW50Um9vbUluZGV4YCAobnVtYmVyKTogSW5kZXggb2YgdGhlIHJvb20gYmVpbmcgZWRpdGVkLlxuICogLSBgcG9zaXRpb25gIChzdHJpbmcpOiBQb3NpdGlvbiBvZiB0aGUgbW9kYWwgb24gdGhlIHNjcmVlbi4gRGVmYXVsdCBpcyAnY2VudGVyJy5cbiAqIC0gYGJhY2tncm91bmRDb2xvcmAgKHN0cmluZyk6IEJhY2tncm91bmQgY29sb3Igb2YgdGhlIG1vZGFsLiBEZWZhdWx0IGlzICcjZmZmJy5cbiAqXG4gKiBAb3V0cHV0c1xuICogLSBgc2V0RWRpdFJvb21Nb2RhbFZpc2libGVgIChFdmVudEVtaXR0ZXI8Ym9vbGVhbj4pOiBFbWl0cyBhIGJvb2xlYW4gdG8gdG9nZ2xlIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBtb2RhbC5cbiAqIC0gYGFkZFBhcnRpY2lwYW50YCAoRXZlbnRFbWl0dGVyPHsgcm9vbUluZGV4OiBudW1iZXI7IHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCB8IEJyZWFrb3V0UGFydGljaXBhbnQ7IH0+KTogRW1pdHMgZGF0YSBmb3IgYWRkaW5nIGEgcGFydGljaXBhbnQgdG8gdGhlIHJvb20uXG4gKiAtIGByZW1vdmVQYXJ0aWNpcGFudGAgKEV2ZW50RW1pdHRlcjx7IHJvb21JbmRleDogbnVtYmVyOyBwYXJ0aWNpcGFudDogUGFydGljaXBhbnQgfCBCcmVha291dFBhcnRpY2lwYW50OyB9Pik6IEVtaXRzIGRhdGEgZm9yIHJlbW92aW5nIGEgcGFydGljaXBhbnQgZnJvbSB0aGUgcm9vbS5cbiAqXG4gKiBAbWV0aG9kc1xuICogLSBgbmdPbkluaXQoKWA6IExpZmVjeWNsZSBob29rIHRvIGluaXRpYWxpemUgbW9kYWwgd2lkdGggYW5kIGF0dGFjaCByZXNpemUgZXZlbnQgbGlzdGVuZXIuXG4gKiAtIGBuZ09uRGVzdHJveSgpYDogTGlmZWN5Y2xlIGhvb2sgdG8gcmVtb3ZlIHRoZSByZXNpemUgZXZlbnQgbGlzdGVuZXIuXG4gKiAtIGBjYWxjdWxhdGVNb2RhbFdpZHRoKClgOiBEeW5hbWljYWxseSBjYWxjdWxhdGVzIGFuZCBzZXRzIG1vZGFsIHdpZHRoIGJhc2VkIG9uIHNjcmVlbiB3aWR0aC5cbiAqIC0gYG1vZGFsQ29udGFpbmVyU3R5bGUoKWA6IFJldHVybnMgc3R5bGUgb2JqZWN0IGZvciBtb2RhbCBjb250YWluZXIuXG4gKiAtIGBtb2RhbENvbnRlbnRTdHlsZSgpYDogUmV0dXJucyBzdHlsZSBvYmplY3QgZm9yIG1vZGFsIGNvbnRlbnQuXG4gKiAtIGBoYW5kbGVBZGRQYXJ0aWNpcGFudChyb29tSW5kZXg6IG51bWJlciwgcGFydGljaXBhbnQ6IEJyZWFrb3V0UGFydGljaXBhbnQpYDogRW1pdHMgZXZlbnQgdG8gYWRkIHBhcnRpY2lwYW50IHRvIHNwZWNpZmllZCByb29tLlxuICogLSBgaGFuZGxlUmVtb3ZlUGFydGljaXBhbnQocm9vbUluZGV4OiBudW1iZXIsIHBhcnRpY2lwYW50OiBCcmVha291dFBhcnRpY2lwYW50KWA6IEVtaXRzIGV2ZW50IHRvIHJlbW92ZSBwYXJ0aWNpcGFudCBmcm9tIHNwZWNpZmllZCByb29tLlxuICogLSBgY2xvc2VNb2RhbCgpYDogQ2xvc2VzIHRoZSBtb2RhbCBieSBlbWl0dGluZyBhIHZpc2liaWxpdHkgY2hhbmdlLlxuICogLSBgdW5hc3NpZ25lZFBhcnRpY2lwYW50cygpYDogRmlsdGVycyBhbmQgcmV0dXJucyBhIGxpc3Qgb2YgdW5hc3NpZ25lZCBwYXJ0aWNpcGFudHMuXG4gKlxuICogQGRlcGVuZGVuY2llc1xuICogLSBgQ29tbW9uTW9kdWxlYDogUHJvdmlkZXMgQW5ndWxhcidzIGNvbW1vbiBkaXJlY3RpdmVzLlxuICogLSBgRm9udEF3ZXNvbWVNb2R1bGVgOiBBbGxvd3MgdXNhZ2Ugb2YgRm9udCBBd2Vzb21lIGljb25zLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLWVkaXQtcm9vbS1tb2RhbFxuICogIFtlZGl0Um9vbU1vZGFsVmlzaWJsZV09XCJlZGl0Um9vbU1vZGFsVmlzaWJsZVwiXG4gKiBbY3VycmVudFJvb21dPVwiY3VycmVudFJvb21cIlxuICogW3BhcnRpY2lwYW50c1JlZl09XCJwYXJ0aWNpcGFudHNSZWZcIlxuICogW2N1cnJlbnRSb29tSW5kZXhdPVwiY3VycmVudFJvb21JbmRleFwiXG4gKiBbcG9zaXRpb25dPVwicG9zaXRpb25cIlxuICogW2JhY2tncm91bmRDb2xvcl09XCJiYWNrZ3JvdW5kQ29sb3JcIlxuICogKHNldEVkaXRSb29tTW9kYWxWaXNpYmxlKT1cInNldEVkaXRSb29tTW9kYWxWaXNpYmxlKCRldmVudClcIlxuICogKGFkZFBhcnRpY2lwYW50KT1cImFkZFBhcnRpY2lwYW50KCRldmVudClcIlxuICogKHJlbW92ZVBhcnRpY2lwYW50KT1cInJlbW92ZVBhcnRpY2lwYW50KCRldmVudClcIj5cbiAqIDwvYXBwLWVkaXQtcm9vbS1tb2RhbD5cbiAqIGBgYFxuICpcbiAqKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWVkaXQtcm9vbS1tb2RhbCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2VkaXQtcm9vbS1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2VkaXQtcm9vbS1tb2RhbC5jb21wb25lbnQuY3NzJ10sXG59KVxuXG5leHBvcnQgY2xhc3MgRWRpdFJvb21Nb2RhbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGVkaXRSb29tTW9kYWxWaXNpYmxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIGN1cnJlbnRSb29tOiBCcmVha291dFBhcnRpY2lwYW50W10gPSBbXTtcbiAgQElucHV0KCkgcGFydGljaXBhbnRzUmVmOiBQYXJ0aWNpcGFudFtdID0gW107XG4gIEBJbnB1dCgpIGN1cnJlbnRSb29tSW5kZXggPSAtMTtcbiAgQElucHV0KCkgcG9zaXRpb24gPSAnY2VudGVyJztcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJyNmZmYnO1xuXG4gIEBPdXRwdXQoKSBzZXRFZGl0Um9vbU1vZGFsVmlzaWJsZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcbiAgQE91dHB1dCgpIGFkZFBhcnRpY2lwYW50ID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgcm9vbUluZGV4OiBudW1iZXI7XG4gICAgcGFydGljaXBhbnQ6IFBhcnRpY2lwYW50IHwgQnJlYWtvdXRQYXJ0aWNpcGFudDtcbiAgfT4oKTtcbiAgQE91dHB1dCgpIHJlbW92ZVBhcnRpY2lwYW50ID0gbmV3IEV2ZW50RW1pdHRlcjx7XG4gICAgcm9vbUluZGV4OiBudW1iZXI7XG4gICAgcGFydGljaXBhbnQ6IFBhcnRpY2lwYW50IHwgQnJlYWtvdXRQYXJ0aWNpcGFudDtcbiAgfT4oKTtcblxuICBmYVRpbWVzID0gZmFUaW1lcztcbiAgZmFQbHVzID0gZmFQbHVzO1xuICBmYVVzZXJzID0gZmFVc2VycztcbiAgZmFQZW4gPSBmYVBlbjtcblxuICBtb2RhbFdpZHRoID0gNDAwO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuY2FsY3VsYXRlTW9kYWxXaWR0aCgpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLmNhbGN1bGF0ZU1vZGFsV2lkdGguYmluZCh0aGlzKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy5jYWxjdWxhdGVNb2RhbFdpZHRoLmJpbmQodGhpcykpO1xuICB9XG5cbiAgY2FsY3VsYXRlTW9kYWxXaWR0aCgpIHtcbiAgICBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIHRoaXMubW9kYWxXaWR0aCA9IHNjcmVlbldpZHRoID4gNTAwID8gNDAwIDogc2NyZWVuV2lkdGggKiAwLjg7XG4gIH1cblxuICBtb2RhbENvbnRhaW5lclN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNSknLFxuICAgICAgekluZGV4OiAxMDAwLFxuICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgfTtcbiAgfVxuXG4gIG1vZGFsQ29udGVudFN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMTBweCcsXG4gICAgICBwYWRkaW5nOiAnMjBweCcsXG4gICAgICB3aWR0aDogYCR7dGhpcy5tb2RhbFdpZHRofXB4YCxcbiAgICAgIG1heEhlaWdodDogJzgwJScsXG4gICAgICBvdmVyZmxvd1k6ICdhdXRvJyxcbiAgICB9O1xuICB9XG5cbiAgaGFuZGxlQWRkUGFydGljaXBhbnQocm9vbUluZGV4OiBudW1iZXIsIHBhcnRpY2lwYW50OiBCcmVha291dFBhcnRpY2lwYW50KSB7XG4gICAgdGhpcy5hZGRQYXJ0aWNpcGFudC5lbWl0KHsgcm9vbUluZGV4LCBwYXJ0aWNpcGFudCB9KTtcbiAgfVxuXG4gIGhhbmRsZVJlbW92ZVBhcnRpY2lwYW50KHJvb21JbmRleDogbnVtYmVyLCBwYXJ0aWNpcGFudDogQnJlYWtvdXRQYXJ0aWNpcGFudCkge1xuICAgIHRoaXMucmVtb3ZlUGFydGljaXBhbnQuZW1pdCh7IHJvb21JbmRleCwgcGFydGljaXBhbnQgfSk7XG4gIH1cblxuICBjbG9zZU1vZGFsKCkge1xuICAgIHRoaXMuc2V0RWRpdFJvb21Nb2RhbFZpc2libGUuZW1pdChmYWxzZSk7XG4gIH1cblxuICB1bmFzc2lnbmVkUGFydGljaXBhbnRzKCk6IFBhcnRpY2lwYW50W10ge1xuICAgIHJldHVybiB0aGlzLnBhcnRpY2lwYW50c1JlZi5maWx0ZXIoKHBhcnRpY2lwYW50KSA9PiBwYXJ0aWNpcGFudFsnYnJlYWtSb29tJ10gPT0gbnVsbCk7XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJlZGl0Um9vbU1vZGFsVmlzaWJsZVwiIGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCIgW25nU3R5bGVdPVwibW9kYWxDb250YWluZXJTdHlsZSgpXCI+XHJcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnQgdGV4dC1kYXJrXCIgW25nU3R5bGVdPVwibW9kYWxDb250ZW50U3R5bGUoKVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICA8aDUgY2xhc3M9XCJtb2RhbC10aXRsZVwiPkVkaXQgUm9vbSB7eyBjdXJyZW50Um9vbUluZGV4ICsgMSB9fSA8ZmEtaWNvbiBbaWNvbl09XCJmYVBlblwiPjwvZmEtaWNvbj48L2g1PlxyXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgKGNsaWNrKT1cImNsb3NlTW9kYWwoKVwiPlxyXG4gICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhVGltZXNcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICA8ZGl2IGNsYXNzPVwibGlzdC1jb250YWluZXJcIj5cclxuICAgICAgICA8aDU+QXNzaWduZWQgUGFydGljaXBhbnRzIDxmYS1pY29uIFtpY29uXT1cImZhVXNlcnNcIj48L2ZhLWljb24+PC9oNT5cclxuICAgICAgICA8dWwgY2xhc3M9XCJsaXN0LWdyb3VwXCI+XHJcbiAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IHBhcnRpY2lwYW50IG9mIGN1cnJlbnRSb29tOyBsZXQgaSA9IGluZGV4XCIgY2xhc3M9XCJsaXN0LWdyb3VwLWl0ZW0gZC1mbGV4IGp1c3RpZnktY29udGVudC1iZXR3ZWVuIGFsaWduLWl0ZW1zLWNlbnRlciB0ZXh0LWRhcmtcIj5cclxuICAgICAgICAgICAge3sgcGFydGljaXBhbnQubmFtZSB9fVxyXG4gICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgYnRuLXNtXCIgKGNsaWNrKT1cImhhbmRsZVJlbW92ZVBhcnRpY2lwYW50KGN1cnJlbnRSb29tSW5kZXgsIHBhcnRpY2lwYW50KVwiPlxyXG4gICAgICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhVGltZXNcIj48L2ZhLWljb24+XHJcbiAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICAgIDxsaSAqbmdJZj1cImN1cnJlbnRSb29tLmxlbmd0aCA9PT0gMFwiIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBhbGlnbi1pdGVtcy1jZW50ZXIgdGV4dC1kYXJrXCI+XHJcbiAgICAgICAgICAgIE5vbmUgYXNzaWduZWRcclxuICAgICAgICAgIDwvbGk+XHJcbiAgICAgICAgPC91bD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgY2xhc3M9XCJsaXN0LWNvbnRhaW5lclwiPlxyXG4gICAgICAgIDxoNT5VbmFzc2lnbmVkIFBhcnRpY2lwYW50cyA8ZmEtaWNvbiBbaWNvbl09XCJmYVVzZXJzXCI+PC9mYS1pY29uPjwvaDU+XHJcbiAgICAgICAgPHVsIGNsYXNzPVwibGlzdC1ncm91cFwiPlxyXG4gICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBwYXJ0aWNpcGFudCBvZiB1bmFzc2lnbmVkUGFydGljaXBhbnRzKCk7IGxldCBpID0gaW5kZXhcIiBjbGFzcz1cImxpc3QtZ3JvdXAtaXRlbSBkLWZsZXgganVzdGlmeS1jb250ZW50LWJldHdlZW4gYWxpZ24taXRlbXMtY2VudGVyIHRleHQtZGFya1wiPlxyXG4gICAgICAgICAgICB7eyBwYXJ0aWNpcGFudC5uYW1lIH19XHJcbiAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLXNtXCIgKGNsaWNrKT1cImhhbmRsZUFkZFBhcnRpY2lwYW50KGN1cnJlbnRSb29tSW5kZXgsIHBhcnRpY2lwYW50KVwiPlxyXG4gICAgICAgICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhUGx1c1wiPjwvZmEtaWNvbj5cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2xpPlxyXG4gICAgICAgICAgPGxpICpuZ0lmPVwidW5hc3NpZ25lZFBhcnRpY2lwYW50cygpLmxlbmd0aCA9PT0gMFwiIGNsYXNzPVwibGlzdC1ncm91cC1pdGVtIGQtZmxleCBqdXN0aWZ5LWNvbnRlbnQtYmV0d2VlbiBhbGlnbi1pdGVtcy1jZW50ZXIgdGV4dC1kYXJrXCI+XHJcbiAgICAgICAgICAgIE5vbmUgcGVuZGluZ1xyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICA8L3VsPlxyXG4gICAgICA8L2Rpdj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxyXG4gICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tc2Vjb25kYXJ5XCIgKGNsaWNrKT1cImNsb3NlTW9kYWwoKVwiPkNsb3NlPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==