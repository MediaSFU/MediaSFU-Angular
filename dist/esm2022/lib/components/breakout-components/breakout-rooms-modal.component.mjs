import { Component, Input, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDoorOpen, faTimes, faRandom, faHandPointer, faPlus, faSave, faPlay, faSyncAlt, faStop, faUsers, } from '@fortawesome/free-solid-svg-icons';
import { RoomListComponent } from './room-list/room-list.component';
import { EditRoomModalComponent } from './edit-room-modal/edit-room-modal.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@angular/forms";
import * as i3 from "@fortawesome/angular-fontawesome";
/**
 * BreakoutRoomsModal component manages the creation, modification, and assignment of breakout rooms.
 *
 * @selector app-breakout-rooms-modal
 * @inputs
 * - `isVisible` (boolean): Controls the visibility of the breakout rooms modal. Default is false.
 * - `parameters` (BreakoutRoomsModalParameters): Parameters for managing breakout room settings and behavior.
 * - `position` (string): Position of the modal on the screen. Default is 'topRight'.
 * - `backgroundColor` (string): Background color of the modal. Default is '#83c0e9'.
 * - `onBreakoutRoomsClose` (function): Callback function triggered when the modal is closed.
 *
 * @methods
 * - `ngOnInit()`: Lifecycle hook to initialize modal width and breakout rooms.
 * - `ngOnChanges(changes: SimpleChanges)`: Lifecycle hook called when any data-bound input properties change.
 * - `calculateModalWidth()`: Dynamically calculates and sets modal width based on screen width.
 * - `modalContainerStyle()`: Returns style object for modal container.
 * - `modalContentStyle()`: Returns style object for modal content.
 * - `initializeBreakoutRooms()`: Initializes the breakout rooms based on the current participants and parameters.
 * - `handleRandomAssign()`: Randomly assigns participants to breakout rooms.
 * - `handleManualAssign()`: Initializes manual room assignment by setting empty breakout rooms.
 * - `handleAddRoom()`: Adds a new breakout room.
 * - `handleSaveRooms()`: Validates and saves breakout room configurations.
 * - `validateRooms()`: Validates room configurations and participants' uniqueness and quantity.
 * - `checkCanStartBreakout()`: Checks conditions to enable the start of breakout rooms.
 * - `handleStartBreakout()`: Starts the breakout session if conditions are met.
 * - `handleStopBreakout()`: Stops the breakout session and reverts to the initial meeting display type.
 * - `handleEditRoom(roomIndex: number)`: Opens the modal to edit the specified breakout room.
 * - `handleDeleteRoom(roomIndex: number)`: Deletes a breakout room and updates participants' room assignments.
 * - `handleAddParticipant(event)`: Adds a participant to a specified breakout room.
 * - `handleRemoveParticipant(event)`: Removes a participant from a specified breakout room.
 *
 * @dependencies
 * - `CommonModule`: Angular's common directives.
 * - `FormsModule`: Angular's forms module for form handling.
 * - `FontAwesomeModule`: Font Awesome icons for UI elements.
 * - `RoomListComponent`: Component for listing rooms.
 * - `EditRoomModalComponent`: Component for editing room participants.
 *
 * @example
 * ```html
 * <app-breakout-rooms-modal
 *  [isVisible]="isBreakoutRoomsModalVisible"
 * [parameters]="breakoutRoomsParams"
 * [position]="modalPosition"
 * [backgroundColor]="modalBgColor"
 * [onBreakoutRoomsClose]="onCloseBreakoutRooms">
 * </app-breakout-rooms-modal>
 * ```
 *
 **/
export class BreakoutRoomsModal {
    isVisible = false;
    parameters;
    position = 'topRight';
    backgroundColor = '#83c0e9';
    onBreakoutRoomsClose = () => {
        console.log('Breakout rooms closed');
    };
    roomsContainerRef;
    faDoorOpen = faDoorOpen;
    faTimes = faTimes;
    faRandom = faRandom;
    faHandPointer = faHandPointer;
    faPlus = faPlus;
    faSave = faSave;
    faPlay = faPlay;
    faSyncAlt = faSyncAlt;
    faStop = faStop;
    faUsers = faUsers;
    participantsRef = [];
    breakoutRoomsRef = [];
    numRooms = '';
    newParticipantAction = 'autoAssignNewRoom';
    currentRoom = null;
    editRoomModalVisible = false;
    startBreakoutButtonVisible = false;
    stopBreakoutButtonVisible = false;
    modalWidth = 400;
    calculateModalWidth() {
        const screenWidth = window.innerWidth;
        let modalWidth = 0.85 * screenWidth;
        if (modalWidth > 700) {
            modalWidth = 700;
        }
        this.modalWidth = modalWidth;
    }
    modalContainerStyle() {
        return {
            display: this.isVisible ? 'block' : 'none',
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: '999',
        };
    }
    modalContentStyle() {
        return {
            backgroundColor: this.backgroundColor,
            borderRadius: '10px',
            padding: '10px',
            width: `${this.modalWidth}px`,
            maxHeight: '75%',
            overflowX: 'hidden',
            overflowY: 'auto',
            position: 'fixed',
            top: this.position.includes('top') ? '10px' : 'auto',
            bottom: this.position.includes('bottom') ? '10px' : 'auto',
            left: this.position.includes('Left') ? '10px' : 'auto',
            right: this.position.includes('Right') ? '10px' : 'auto',
        };
    }
    ngOnChanges(changes) {
        if (changes['isVisible'] && this.isVisible) {
            this.initializeBreakoutRooms();
        }
    }
    ngOnInit() {
        this.calculateModalWidth();
    }
    initializeBreakoutRooms = () => {
        this.parameters = this.parameters.getUpdatedAllParams();
        const filteredParticipants = this.parameters.participants.filter((participant) => participant.islevel != '2');
        this.participantsRef = filteredParticipants;
        this.breakoutRoomsRef =
            this.parameters.breakoutRooms && this.parameters.breakoutRooms.length > 0
                ? [...this.parameters.breakoutRooms]
                : [];
        this.checkCanStartBreakout();
    };
    handleRandomAssign() {
        const numRoomsInt = parseInt(this.numRooms);
        if (!numRoomsInt || numRoomsInt <= 0) {
            this.parameters.showAlert?.({
                message: 'Please enter a valid number of rooms',
                type: 'danger',
            });
            return;
        }
        const newBreakoutRooms = Array.from({ length: numRoomsInt }, () => []);
        const shuffledParticipants = [...this.participantsRef].sort(() => 0.5 - Math.random());
        shuffledParticipants.forEach((participant, index) => {
            const roomIndex = index % numRoomsInt;
            if (newBreakoutRooms[roomIndex].length < this.parameters.itemPageLimit) {
                const participant_ = { name: participant.name, breakRoom: roomIndex };
                newBreakoutRooms[roomIndex].push(participant_);
                participant['breakRoom'] = roomIndex;
            }
            else {
                for (let i = 0; i < numRoomsInt; i++) {
                    if (newBreakoutRooms[i].length < this.parameters.itemPageLimit) {
                        newBreakoutRooms[i].push(participant);
                        participant['breakRoom'] = i;
                        break;
                    }
                }
            }
        });
        this.breakoutRoomsRef = newBreakoutRooms;
        this.checkCanStartBreakout();
    }
    handleManualAssign() {
        const numRoomsInt = parseInt(this.numRooms);
        if (!numRoomsInt || numRoomsInt <= 0) {
            this.parameters.showAlert?.({
                message: 'Please enter a valid number of rooms',
                type: 'danger',
            });
            return;
        }
        this.breakoutRoomsRef = Array.from({ length: numRoomsInt }, () => []);
        this.parameters.updateCanStartBreakout(false);
        this.checkCanStartBreakout();
    }
    handleAddRoom() {
        this.breakoutRoomsRef = [...this.breakoutRoomsRef, []];
        this.parameters.updateCanStartBreakout(false);
        this.checkCanStartBreakout();
    }
    handleSaveRooms() {
        if (this.validateRooms()) {
            this.parameters.updateBreakoutRooms(this.breakoutRoomsRef);
            this.parameters.updateCanStartBreakout(true);
            this.checkCanStartBreakout();
            this.parameters.showAlert?.({ message: 'Rooms saved successfully', type: 'success' });
        }
        else {
            this.parameters.showAlert?.({ message: 'Rooms validation failed', type: 'danger' });
        }
    }
    validateRooms() {
        if (this.breakoutRoomsRef.length == 0) {
            this.parameters.showAlert?.({ message: 'There must be at least one room', type: 'danger' });
            return false;
        }
        for (let room of this.breakoutRoomsRef) {
            if (room.length == 0) {
                this.parameters.showAlert?.({ message: 'Rooms must not be empty', type: 'danger' });
                return false;
            }
            const participantNames = room.map((p) => p.name);
            const uniqueNames = new Set(participantNames);
            if (participantNames.length != uniqueNames.size) {
                this.parameters.showAlert?.({
                    message: 'Duplicate participant names in a room',
                    type: 'danger',
                });
                return false;
            }
            if (room.length > this.parameters.itemPageLimit) {
                this.parameters.showAlert?.({
                    message: 'A room exceeds the participant limit',
                    type: 'danger',
                });
                return false;
            }
        }
        return true;
    }
    checkCanStartBreakout = () => {
        this.parameters = this.parameters.getUpdatedAllParams();
        if (this.parameters.canStartBreakout) {
            this.startBreakoutButtonVisible = true;
            this.stopBreakoutButtonVisible =
                this.parameters.breakOutRoomStarted && !this.parameters.breakOutRoomEnded;
        }
        else {
            this.startBreakoutButtonVisible = false;
            this.stopBreakoutButtonVisible = false;
        }
    };
    handleStartBreakout = () => {
        this.parameters = this.parameters.getUpdatedAllParams();
        if (this.parameters.shareScreenStarted || this.parameters.shared) {
            this.parameters.showAlert?.({
                message: 'You cannot start breakout rooms while screen sharing is active',
                type: 'danger',
            });
            return;
        }
        if (this.parameters.canStartBreakout) {
            const emitName = this.parameters.breakOutRoomStarted && !this.parameters.breakOutRoomEnded
                ? 'updateBreakout'
                : 'startBreakout';
            const filteredBreakoutRooms = this.breakoutRoomsRef.map((room) => room.map(({ name, breakRoom }) => ({ name, breakRoom })));
            this.parameters.socket.emit(emitName, {
                breakoutRooms: filteredBreakoutRooms,
                newParticipantAction: this.newParticipantAction,
                roomName: this.parameters.roomName,
            }, (response) => {
                if (response.success) {
                    this.parameters.showAlert?.({ message: 'Breakout rooms active', type: 'success' });
                    this.parameters.updateBreakOutRoomStarted(true);
                    this.parameters.updateBreakOutRoomEnded(false);
                    this.onBreakoutRoomsClose();
                    if (this.parameters.meetingDisplayType != 'all') {
                        this.parameters.updateMeetingDisplayType('all');
                    }
                }
                else {
                    this.parameters.showAlert?.({ message: response.reason, type: 'danger' });
                }
            });
        }
    };
    handleStopBreakout() {
        this.parameters.socket.emit('stopBreakout', { roomName: this.parameters.roomName }, (response) => {
            if (response.success) {
                this.parameters.showAlert?.({ message: 'Breakout rooms stopped', type: 'success' });
                this.parameters.updateBreakOutRoomStarted(false);
                this.parameters.updateBreakOutRoomEnded(true);
                this.onBreakoutRoomsClose();
                if (this.parameters.meetingDisplayType != this.parameters.prevMeetingDisplayType) {
                    this.parameters.updateMeetingDisplayType(this.parameters.prevMeetingDisplayType);
                }
            }
            else {
                this.parameters.showAlert?.({ message: response.reason, type: 'danger' });
            }
        });
    }
    handleEditRoom(roomIndex) {
        this.parameters.updateCurrentRoomIndex(roomIndex);
        this.currentRoom = this.breakoutRoomsRef[roomIndex];
        this.editRoomModalVisible = true;
        this.parameters.updateCanStartBreakout(false);
        this.checkCanStartBreakout();
    }
    handleDeleteRoom(roomIndex) {
        if (this.breakoutRoomsRef.length > 0) {
            const room = this.breakoutRoomsRef[roomIndex];
            room.forEach((participant) => (participant.breakRoom = null));
            const newBreakoutRooms = [...this.breakoutRoomsRef];
            newBreakoutRooms.splice(roomIndex, 1);
            newBreakoutRooms.forEach((room, index) => {
                room.forEach((participant) => (participant.breakRoom = index));
            });
            this.breakoutRoomsRef = newBreakoutRooms;
            this.checkCanStartBreakout();
        }
    }
    handleAddParticipant(event) {
        const { roomIndex, participant } = event;
        if (this.breakoutRoomsRef[roomIndex].length < this.parameters.itemPageLimit) {
            const newBreakoutRooms = [...this.breakoutRoomsRef];
            newBreakoutRooms[roomIndex].push(participant);
            this.breakoutRoomsRef = newBreakoutRooms;
            participant['breakRoom'] = roomIndex;
            if (this.parameters.currentRoomIndex != null) {
                this.handleEditRoom(this.parameters.currentRoomIndex);
            }
        }
        else {
            this.parameters.showAlert?.({ message: 'Room is full', type: 'danger' });
        }
    }
    handleRemoveParticipant(event) {
        const { roomIndex, participant } = event;
        const newBreakoutRooms = [...this.breakoutRoomsRef];
        newBreakoutRooms[roomIndex] = newBreakoutRooms[roomIndex].filter((p) => p != participant);
        this.breakoutRoomsRef = newBreakoutRooms;
        participant['breakRoom'] = null;
        if (this.parameters.currentRoomIndex != null) {
            this.handleEditRoom(this.parameters.currentRoomIndex);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: BreakoutRoomsModal, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: BreakoutRoomsModal, isStandalone: true, selector: "app-breakout-rooms-modal", inputs: { isVisible: "isVisible", parameters: "parameters", position: "position", backgroundColor: "backgroundColor", onBreakoutRoomsClose: "onBreakoutRoomsClose" }, viewQueries: [{ propertyName: "roomsContainerRef", first: true, predicate: ["roomsContainer"], descendants: true }], usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"isVisible\" class=\"modal-container\" [ngStyle]=\"modalContainerStyle()\">\r\n  <div class=\"modal-content\" [ngStyle]=\"modalContentStyle()\">\r\n    <div class=\"modal-header\">\r\n      <h2>Breakout Rooms <fa-icon [icon]=\"faDoorOpen\"></fa-icon></h2>\r\n      <button class=\"close-btn\" (click)=\"onBreakoutRoomsClose()\">\r\n        <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n      </button>\r\n    </div>\r\n    <hr>\r\n    <div class=\"form-group\">\r\n      <label for=\"numRooms\">Number of Rooms <fa-icon [icon]=\"faUsers\"></fa-icon></label>\r\n      <input type=\"number\" class=\"form-control\" id=\"numRooms\" [(ngModel)]=\"numRooms\">\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <button class=\"btn btn-primary\" (click)=\"handleRandomAssign()\">Random Assign <fa-icon [icon]=\"faRandom\"></fa-icon></button>\r\n      <button class=\"btn btn-secondary\" (click)=\"handleManualAssign()\">Manual Assign <fa-icon [icon]=\"faHandPointer\"></fa-icon></button>\r\n      <button class=\"btn btn-success\" (click)=\"handleAddRoom()\">Add Room <fa-icon [icon]=\"faPlus\"></fa-icon></button>\r\n      <button class=\"btn btn-info\" (click)=\"handleSaveRooms()\">Save Rooms <fa-icon [icon]=\"faSave\"></fa-icon></button>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"newParticipantAction\">New Participant Action <fa-icon [icon]=\"faUsers\"></fa-icon></label>\r\n      <select class=\"form-control\" id=\"newParticipantAction\" [(ngModel)]=\"newParticipantAction\">\r\n        <option value=\"autoAssignNewRoom\">Add to new room</option>\r\n        <option value=\"autoAssignAvailableRoom\">Add to open room</option>\r\n        <option value=\"manualAssign\">No action</option>\r\n      </select>\r\n    </div>\r\n    <div #roomsContainer>\r\n      <app-room-list [rooms]=\"breakoutRoomsRef\" (editRoom)=\"handleEditRoom($event)\" (deleteRoom)=\"handleDeleteRoom($event)\" (removeParticipant)=\"handleRemoveParticipant($event)\"></app-room-list>\r\n    </div>\r\n    <div *ngIf=\"startBreakoutButtonVisible\">\r\n      <button class=\"btn btn-primary mr-2 mb-2\" (click)=\"handleStartBreakout()\">\r\n        {{ parameters.breakOutRoomStarted && !parameters.breakOutRoomEnded ? 'Update Breakout' : 'Start Breakout' }} <fa-icon [icon]=\"parameters.breakOutRoomStarted && !parameters.breakOutRoomEnded ? faSyncAlt : faPlay\"></fa-icon>\r\n      </button>\r\n    </div>\r\n    <div *ngIf=\"stopBreakoutButtonVisible\">\r\n      <button class=\"btn btn-danger mr-2 mb-2\" (click)=\"handleStopBreakout()\">\r\n        Stop Breakout <fa-icon [icon]=\"faStop\"></fa-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <app-edit-room-modal [editRoomModalVisible]=\"editRoomModalVisible\" [currentRoom]=\"currentRoom!\" [participantsRef]=\"participantsRef\" [currentRoomIndex]=\"parameters.currentRoomIndex!\" (setEditRoomModalVisible)=\"editRoomModalVisible = $event\" (addParticipant)=\"handleAddParticipant($event)\" (removeParticipant)=\"handleRemoveParticipant($event)\"></app-edit-room-modal>\r\n</div>\r\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FormsModule }, { kind: "directive", type: i2.NgSelectOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.ɵNgSelectMultipleOption, selector: "option", inputs: ["ngValue", "value"] }, { kind: "directive", type: i2.DefaultValueAccessor, selector: "input:not([type=checkbox])[formControlName],textarea[formControlName],input:not([type=checkbox])[formControl],textarea[formControl],input:not([type=checkbox])[ngModel],textarea[ngModel],[ngDefaultControl]" }, { kind: "directive", type: i2.NumberValueAccessor, selector: "input[type=number][formControlName],input[type=number][formControl],input[type=number][ngModel]" }, { kind: "directive", type: i2.SelectControlValueAccessor, selector: "select:not([multiple])[formControlName],select:not([multiple])[formControl],select:not([multiple])[ngModel]", inputs: ["compareWith"] }, { kind: "directive", type: i2.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i2.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i3.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }, { kind: "component", type: RoomListComponent, selector: "app-room-list", inputs: ["rooms"], outputs: ["editRoom", "deleteRoom", "removeParticipant"] }, { kind: "component", type: EditRoomModalComponent, selector: "app-edit-room-modal", inputs: ["editRoomModalVisible", "currentRoom", "participantsRef", "currentRoomIndex", "position", "backgroundColor"], outputs: ["setEditRoomModalVisible", "addParticipant", "removeParticipant"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: BreakoutRoomsModal, decorators: [{
            type: Component,
            args: [{ selector: 'app-breakout-rooms-modal', standalone: true, imports: [
                        CommonModule,
                        FormsModule,
                        FontAwesomeModule,
                        RoomListComponent,
                        EditRoomModalComponent,
                    ], template: "<div *ngIf=\"isVisible\" class=\"modal-container\" [ngStyle]=\"modalContainerStyle()\">\r\n  <div class=\"modal-content\" [ngStyle]=\"modalContentStyle()\">\r\n    <div class=\"modal-header\">\r\n      <h2>Breakout Rooms <fa-icon [icon]=\"faDoorOpen\"></fa-icon></h2>\r\n      <button class=\"close-btn\" (click)=\"onBreakoutRoomsClose()\">\r\n        <fa-icon [icon]=\"faTimes\"></fa-icon>\r\n      </button>\r\n    </div>\r\n    <hr>\r\n    <div class=\"form-group\">\r\n      <label for=\"numRooms\">Number of Rooms <fa-icon [icon]=\"faUsers\"></fa-icon></label>\r\n      <input type=\"number\" class=\"form-control\" id=\"numRooms\" [(ngModel)]=\"numRooms\">\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <button class=\"btn btn-primary\" (click)=\"handleRandomAssign()\">Random Assign <fa-icon [icon]=\"faRandom\"></fa-icon></button>\r\n      <button class=\"btn btn-secondary\" (click)=\"handleManualAssign()\">Manual Assign <fa-icon [icon]=\"faHandPointer\"></fa-icon></button>\r\n      <button class=\"btn btn-success\" (click)=\"handleAddRoom()\">Add Room <fa-icon [icon]=\"faPlus\"></fa-icon></button>\r\n      <button class=\"btn btn-info\" (click)=\"handleSaveRooms()\">Save Rooms <fa-icon [icon]=\"faSave\"></fa-icon></button>\r\n    </div>\r\n    <div class=\"form-group\">\r\n      <label for=\"newParticipantAction\">New Participant Action <fa-icon [icon]=\"faUsers\"></fa-icon></label>\r\n      <select class=\"form-control\" id=\"newParticipantAction\" [(ngModel)]=\"newParticipantAction\">\r\n        <option value=\"autoAssignNewRoom\">Add to new room</option>\r\n        <option value=\"autoAssignAvailableRoom\">Add to open room</option>\r\n        <option value=\"manualAssign\">No action</option>\r\n      </select>\r\n    </div>\r\n    <div #roomsContainer>\r\n      <app-room-list [rooms]=\"breakoutRoomsRef\" (editRoom)=\"handleEditRoom($event)\" (deleteRoom)=\"handleDeleteRoom($event)\" (removeParticipant)=\"handleRemoveParticipant($event)\"></app-room-list>\r\n    </div>\r\n    <div *ngIf=\"startBreakoutButtonVisible\">\r\n      <button class=\"btn btn-primary mr-2 mb-2\" (click)=\"handleStartBreakout()\">\r\n        {{ parameters.breakOutRoomStarted && !parameters.breakOutRoomEnded ? 'Update Breakout' : 'Start Breakout' }} <fa-icon [icon]=\"parameters.breakOutRoomStarted && !parameters.breakOutRoomEnded ? faSyncAlt : faPlay\"></fa-icon>\r\n      </button>\r\n    </div>\r\n    <div *ngIf=\"stopBreakoutButtonVisible\">\r\n      <button class=\"btn btn-danger mr-2 mb-2\" (click)=\"handleStopBreakout()\">\r\n        Stop Breakout <fa-icon [icon]=\"faStop\"></fa-icon>\r\n      </button>\r\n    </div>\r\n  </div>\r\n  <app-edit-room-modal [editRoomModalVisible]=\"editRoomModalVisible\" [currentRoom]=\"currentRoom!\" [participantsRef]=\"participantsRef\" [currentRoomIndex]=\"parameters.currentRoomIndex!\" (setEditRoomModalVisible)=\"editRoomModalVisible = $event\" (addParticipant)=\"handleAddParticipant($event)\" (removeParticipant)=\"handleRemoveParticipant($event)\"></app-edit-room-modal>\r\n</div>\r\n" }]
        }], propDecorators: { isVisible: [{
                type: Input
            }], parameters: [{
                type: Input
            }], position: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], onBreakoutRoomsClose: [{
                type: Input
            }], roomsContainerRef: [{
                type: ViewChild,
                args: ['roomsContainer']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtvdXQtcm9vbXMtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvYnJlYWtvdXQtY29tcG9uZW50cy9icmVha291dC1yb29tcy1tb2RhbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9icmVha291dC1jb21wb25lbnRzL2JyZWFrb3V0LXJvb21zLW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLFNBQVMsR0FHVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNQLFFBQVEsRUFDUixhQUFhLEVBQ2IsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFNLEVBQ04sU0FBUyxFQUNULE1BQU0sRUFDTixPQUFPLEdBQ1IsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7Ozs7QUEwQ3JGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBaURJO0FBZ0JKLE1BQU0sT0FBTyxrQkFBa0I7SUFDcEIsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUNsQixVQUFVLENBQWdDO0lBQzFDLFFB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dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7XG4gIGZhRG9vck9wZW4sXG4gIGZhVGltZXMsXG4gIGZhUmFuZG9tLFxuICBmYUhhbmRQb2ludGVyLFxuICBmYVBsdXMsXG4gIGZhU2F2ZSxcbiAgZmFQbGF5LFxuICBmYVN5bmNBbHQsXG4gIGZhU3RvcCxcbiAgZmFVc2Vycyxcbn0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IFJvb21MaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9yb29tLWxpc3Qvcm9vbS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFZGl0Um9vbU1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9lZGl0LXJvb20tbW9kYWwvZWRpdC1yb29tLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IFBhcnRpY2lwYW50LCBTaG93QWxlcnQsIEJyZWFrb3V0UGFydGljaXBhbnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJyZWFrb3V0Um9vbXNNb2RhbFBhcmFtZXRlcnMge1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIGl0ZW1QYWdlTGltaXQ6IG51bWJlcjtcbiAgbWVldGluZ0Rpc3BsYXlUeXBlOiBzdHJpbmc7XG4gIHByZXZNZWV0aW5nRGlzcGxheVR5cGU6IHN0cmluZztcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBzaGFyZWQ6IGJvb2xlYW47XG4gIGJyZWFrT3V0Um9vbVN0YXJ0ZWQ6IGJvb2xlYW47XG4gIGJyZWFrT3V0Um9vbUVuZGVkOiBib29sZWFuO1xuICBpc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGU6IGJvb2xlYW47XG4gIGN1cnJlbnRSb29tSW5kZXg6IG51bWJlciB8IG51bGw7XG4gIGNhblN0YXJ0QnJlYWtvdXQ6IGJvb2xlYW47XG4gIGJyZWFrb3V0Um9vbXM6IEJyZWFrb3V0UGFydGljaXBhbnRbXVtdO1xuICB1cGRhdGVCcmVha091dFJvb21TdGFydGVkOiAoc3RhcnRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQnJlYWtPdXRSb29tRW5kZWQ6IChlbmRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQ3VycmVudFJvb21JbmRleDogKHJvb21JbmRleDogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVDYW5TdGFydEJyZWFrb3V0OiAoY2FuU3RhcnQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUJyZWFrb3V0Um9vbXM6IChicmVha291dFJvb21zOiBCcmVha291dFBhcnRpY2lwYW50W11bXSkgPT4gdm9pZDtcbiAgdXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlOiAoZGlzcGxheVR5cGU6IHN0cmluZykgPT4gdm9pZDtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBCcmVha291dFJvb21zTW9kYWxQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEJyZWFrb3V0Um9vbXNNb2RhbFR5cGUgPSAob3B0aW9uczogQnJlYWtvdXRSb29tc01vZGFsT3B0aW9ucykgPT4gSFRNTEVsZW1lbnQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnJlYWtvdXRSb29tc01vZGFsT3B0aW9ucyB7XG4gIGlzVmlzaWJsZTogYm9vbGVhbjtcbiAgcGFyYW1ldGVyczogQnJlYWtvdXRSb29tc01vZGFsUGFyYW1ldGVycztcbiAgcG9zaXRpb24/OiAndG9wUmlnaHQnIHwgJ3RvcExlZnQnIHwgJ2JvdHRvbVJpZ2h0JyB8ICdib3R0b21MZWZ0JztcbiAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xuICBvbkJyZWFrb3V0Um9vbXNDbG9zZTogKCkgPT4gdm9pZDtcbn1cblxuLyoqXG4gKiBCcmVha291dFJvb21zTW9kYWwgY29tcG9uZW50IG1hbmFnZXMgdGhlIGNyZWF0aW9uLCBtb2RpZmljYXRpb24sIGFuZCBhc3NpZ25tZW50IG9mIGJyZWFrb3V0IHJvb21zLlxuICpcbiAqIEBzZWxlY3RvciBhcHAtYnJlYWtvdXQtcm9vbXMtbW9kYWxcbiAqIEBpbnB1dHNcbiAqIC0gYGlzVmlzaWJsZWAgKGJvb2xlYW4pOiBDb250cm9scyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgYnJlYWtvdXQgcm9vbXMgbW9kYWwuIERlZmF1bHQgaXMgZmFsc2UuXG4gKiAtIGBwYXJhbWV0ZXJzYCAoQnJlYWtvdXRSb29tc01vZGFsUGFyYW1ldGVycyk6IFBhcmFtZXRlcnMgZm9yIG1hbmFnaW5nIGJyZWFrb3V0IHJvb20gc2V0dGluZ3MgYW5kIGJlaGF2aW9yLlxuICogLSBgcG9zaXRpb25gIChzdHJpbmcpOiBQb3NpdGlvbiBvZiB0aGUgbW9kYWwgb24gdGhlIHNjcmVlbi4gRGVmYXVsdCBpcyAndG9wUmlnaHQnLlxuICogLSBgYmFja2dyb3VuZENvbG9yYCAoc3RyaW5nKTogQmFja2dyb3VuZCBjb2xvciBvZiB0aGUgbW9kYWwuIERlZmF1bHQgaXMgJyM4M2MwZTknLlxuICogLSBgb25CcmVha291dFJvb21zQ2xvc2VgIChmdW5jdGlvbik6IENhbGxiYWNrIGZ1bmN0aW9uIHRyaWdnZXJlZCB3aGVuIHRoZSBtb2RhbCBpcyBjbG9zZWQuXG4gKlxuICogQG1ldGhvZHNcbiAqIC0gYG5nT25Jbml0KClgOiBMaWZlY3ljbGUgaG9vayB0byBpbml0aWFsaXplIG1vZGFsIHdpZHRoIGFuZCBicmVha291dCByb29tcy5cbiAqIC0gYG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpYDogTGlmZWN5Y2xlIGhvb2sgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgaW5wdXQgcHJvcGVydGllcyBjaGFuZ2UuXG4gKiAtIGBjYWxjdWxhdGVNb2RhbFdpZHRoKClgOiBEeW5hbWljYWxseSBjYWxjdWxhdGVzIGFuZCBzZXRzIG1vZGFsIHdpZHRoIGJhc2VkIG9uIHNjcmVlbiB3aWR0aC5cbiAqIC0gYG1vZGFsQ29udGFpbmVyU3R5bGUoKWA6IFJldHVybnMgc3R5bGUgb2JqZWN0IGZvciBtb2RhbCBjb250YWluZXIuXG4gKiAtIGBtb2RhbENvbnRlbnRTdHlsZSgpYDogUmV0dXJucyBzdHlsZSBvYmplY3QgZm9yIG1vZGFsIGNvbnRlbnQuXG4gKiAtIGBpbml0aWFsaXplQnJlYWtvdXRSb29tcygpYDogSW5pdGlhbGl6ZXMgdGhlIGJyZWFrb3V0IHJvb21zIGJhc2VkIG9uIHRoZSBjdXJyZW50IHBhcnRpY2lwYW50cyBhbmQgcGFyYW1ldGVycy5cbiAqIC0gYGhhbmRsZVJhbmRvbUFzc2lnbigpYDogUmFuZG9tbHkgYXNzaWducyBwYXJ0aWNpcGFudHMgdG8gYnJlYWtvdXQgcm9vbXMuXG4gKiAtIGBoYW5kbGVNYW51YWxBc3NpZ24oKWA6IEluaXRpYWxpemVzIG1hbnVhbCByb29tIGFzc2lnbm1lbnQgYnkgc2V0dGluZyBlbXB0eSBicmVha291dCByb29tcy5cbiAqIC0gYGhhbmRsZUFkZFJvb20oKWA6IEFkZHMgYSBuZXcgYnJlYWtvdXQgcm9vbS5cbiAqIC0gYGhhbmRsZVNhdmVSb29tcygpYDogVmFsaWRhdGVzIGFuZCBzYXZlcyBicmVha291dCByb29tIGNvbmZpZ3VyYXRpb25zLlxuICogLSBgdmFsaWRhdGVSb29tcygpYDogVmFsaWRhdGVzIHJvb20gY29uZmlndXJhdGlvbnMgYW5kIHBhcnRpY2lwYW50cycgdW5pcXVlbmVzcyBhbmQgcXVhbnRpdHkuXG4gKiAtIGBjaGVja0NhblN0YXJ0QnJlYWtvdXQoKWA6IENoZWNrcyBjb25kaXRpb25zIHRvIGVuYWJsZSB0aGUgc3RhcnQgb2YgYnJlYWtvdXQgcm9vbXMuXG4gKiAtIGBoYW5kbGVTdGFydEJyZWFrb3V0KClgOiBTdGFydHMgdGhlIGJyZWFrb3V0IHNlc3Npb24gaWYgY29uZGl0aW9ucyBhcmUgbWV0LlxuICogLSBgaGFuZGxlU3RvcEJyZWFrb3V0KClgOiBTdG9wcyB0aGUgYnJlYWtvdXQgc2Vzc2lvbiBhbmQgcmV2ZXJ0cyB0byB0aGUgaW5pdGlhbCBtZWV0aW5nIGRpc3BsYXkgdHlwZS5cbiAqIC0gYGhhbmRsZUVkaXRSb29tKHJvb21JbmRleDogbnVtYmVyKWA6IE9wZW5zIHRoZSBtb2RhbCB0byBlZGl0IHRoZSBzcGVjaWZpZWQgYnJlYWtvdXQgcm9vbS5cbiAqIC0gYGhhbmRsZURlbGV0ZVJvb20ocm9vbUluZGV4OiBudW1iZXIpYDogRGVsZXRlcyBhIGJyZWFrb3V0IHJvb20gYW5kIHVwZGF0ZXMgcGFydGljaXBhbnRzJyByb29tIGFzc2lnbm1lbnRzLlxuICogLSBgaGFuZGxlQWRkUGFydGljaXBhbnQoZXZlbnQpYDogQWRkcyBhIHBhcnRpY2lwYW50IHRvIGEgc3BlY2lmaWVkIGJyZWFrb3V0IHJvb20uXG4gKiAtIGBoYW5kbGVSZW1vdmVQYXJ0aWNpcGFudChldmVudClgOiBSZW1vdmVzIGEgcGFydGljaXBhbnQgZnJvbSBhIHNwZWNpZmllZCBicmVha291dCByb29tLlxuICpcbiAqIEBkZXBlbmRlbmNpZXNcbiAqIC0gYENvbW1vbk1vZHVsZWA6IEFuZ3VsYXIncyBjb21tb24gZGlyZWN0aXZlcy5cbiAqIC0gYEZvcm1zTW9kdWxlYDogQW5ndWxhcidzIGZvcm1zIG1vZHVsZSBmb3IgZm9ybSBoYW5kbGluZy5cbiAqIC0gYEZvbnRBd2Vzb21lTW9kdWxlYDogRm9udCBBd2Vzb21lIGljb25zIGZvciBVSSBlbGVtZW50cy5cbiAqIC0gYFJvb21MaXN0Q29tcG9uZW50YDogQ29tcG9uZW50IGZvciBsaXN0aW5nIHJvb21zLlxuICogLSBgRWRpdFJvb21Nb2RhbENvbXBvbmVudGA6IENvbXBvbmVudCBmb3IgZWRpdGluZyByb29tIHBhcnRpY2lwYW50cy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1icmVha291dC1yb29tcy1tb2RhbFxuICogIFtpc1Zpc2libGVdPVwiaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlXCJcbiAqIFtwYXJhbWV0ZXJzXT1cImJyZWFrb3V0Um9vbXNQYXJhbXNcIlxuICogW3Bvc2l0aW9uXT1cIm1vZGFsUG9zaXRpb25cIlxuICogW2JhY2tncm91bmRDb2xvcl09XCJtb2RhbEJnQ29sb3JcIlxuICogW29uQnJlYWtvdXRSb29tc0Nsb3NlXT1cIm9uQ2xvc2VCcmVha291dFJvb21zXCI+XG4gKiA8L2FwcC1icmVha291dC1yb29tcy1tb2RhbD5cbiAqIGBgYFxuICpcbiAqKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1icmVha291dC1yb29tcy1tb2RhbCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGUsXG4gICAgRm9ybXNNb2R1bGUsXG4gICAgRm9udEF3ZXNvbWVNb2R1bGUsXG4gICAgUm9vbUxpc3RDb21wb25lbnQsXG4gICAgRWRpdFJvb21Nb2RhbENvbXBvbmVudCxcbiAgXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2JyZWFrb3V0LXJvb21zLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYnJlYWtvdXQtcm9vbXMtbW9kYWwuY29tcG9uZW50LmNzcyddLFxufSlcblxuXG5leHBvcnQgY2xhc3MgQnJlYWtvdXRSb29tc01vZGFsIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkluaXQge1xuICBASW5wdXQoKSBpc1Zpc2libGUgPSBmYWxzZTtcbiAgQElucHV0KCkgcGFyYW1ldGVycyE6IEJyZWFrb3V0Um9vbXNNb2RhbFBhcmFtZXRlcnM7XG4gIEBJbnB1dCgpIHBvc2l0aW9uID0gJ3RvcFJpZ2h0JztcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJyM4M2MwZTknO1xuICBASW5wdXQoKSBvbkJyZWFrb3V0Um9vbXNDbG9zZTogKCkgPT4gdm9pZCA9ICgpID0+IHtcbiAgICBjb25zb2xlLmxvZygnQnJlYWtvdXQgcm9vbXMgY2xvc2VkJyk7XG4gIH07XG4gIEBWaWV3Q2hpbGQoJ3Jvb21zQ29udGFpbmVyJykgcm9vbXNDb250YWluZXJSZWYhOiBFbGVtZW50UmVmO1xuXG4gIGZhRG9vck9wZW4gPSBmYURvb3JPcGVuO1xuICBmYVRpbWVzID0gZmFUaW1lcztcbiAgZmFSYW5kb20gPSBmYVJhbmRvbTtcbiAgZmFIYW5kUG9pbnRlciA9IGZhSGFuZFBvaW50ZXI7XG4gIGZhUGx1cyA9IGZhUGx1cztcbiAgZmFTYXZlID0gZmFTYXZlO1xuICBmYVBsYXkgPSBmYVBsYXk7XG4gIGZhU3luY0FsdCA9IGZhU3luY0FsdDtcbiAgZmFTdG9wID0gZmFTdG9wO1xuICBmYVVzZXJzID0gZmFVc2VycztcblxuICBwYXJ0aWNpcGFudHNSZWY6IFBhcnRpY2lwYW50W10gPSBbXTtcbiAgYnJlYWtvdXRSb29tc1JlZjogQnJlYWtvdXRQYXJ0aWNpcGFudFtdW10gPSBbXTtcblxuICBudW1Sb29tcyA9ICcnO1xuICBuZXdQYXJ0aWNpcGFudEFjdGlvbiA9ICdhdXRvQXNzaWduTmV3Um9vbSc7XG4gIGN1cnJlbnRSb29tOiBCcmVha291dFBhcnRpY2lwYW50W10gfCBudWxsID0gbnVsbDtcbiAgZWRpdFJvb21Nb2RhbFZpc2libGUgPSBmYWxzZTtcblxuICBzdGFydEJyZWFrb3V0QnV0dG9uVmlzaWJsZSA9IGZhbHNlO1xuICBzdG9wQnJlYWtvdXRCdXR0b25WaXNpYmxlID0gZmFsc2U7XG5cbiAgbW9kYWxXaWR0aCA9IDQwMDtcblxuICBjYWxjdWxhdGVNb2RhbFdpZHRoKCkge1xuICAgIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgbGV0IG1vZGFsV2lkdGggPSAwLjg1ICogc2NyZWVuV2lkdGg7XG4gICAgaWYgKG1vZGFsV2lkdGggPiA3MDApIHtcbiAgICAgIG1vZGFsV2lkdGggPSA3MDA7XG4gICAgfVxuICAgIHRoaXMubW9kYWxXaWR0aCA9IG1vZGFsV2lkdGg7XG4gIH1cblxuICBtb2RhbENvbnRhaW5lclN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkaXNwbGF5OiB0aGlzLmlzVmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZScsXG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIHRvcDogJzAnLFxuICAgICAgbGVmdDogJzAnLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjUpJyxcbiAgICAgIHpJbmRleDogJzk5OScsXG4gICAgfTtcbiAgfVxuXG4gIG1vZGFsQ29udGVudFN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMTBweCcsXG4gICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICB3aWR0aDogYCR7dGhpcy5tb2RhbFdpZHRofXB4YCxcbiAgICAgIG1heEhlaWdodDogJzc1JScsXG4gICAgICBvdmVyZmxvd1g6ICdoaWRkZW4nLFxuICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIHRvcDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygndG9wJykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICBib3R0b206IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ2JvdHRvbScpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgbGVmdDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnTGVmdCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgcmlnaHQ6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ1JpZ2h0JykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgfTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1snaXNWaXNpYmxlJ10gJiYgdGhpcy5pc1Zpc2libGUpIHtcbiAgICAgIHRoaXMuaW5pdGlhbGl6ZUJyZWFrb3V0Um9vbXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZU1vZGFsV2lkdGgoKTtcbiAgfVxuXG4gIGluaXRpYWxpemVCcmVha291dFJvb21zID0gKCkgPT4ge1xuICAgIHRoaXMucGFyYW1ldGVycyA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgY29uc3QgZmlsdGVyZWRQYXJ0aWNpcGFudHMgPSB0aGlzLnBhcmFtZXRlcnMucGFydGljaXBhbnRzLmZpbHRlcihcbiAgICAgIChwYXJ0aWNpcGFudDogYW55KSA9PiBwYXJ0aWNpcGFudC5pc2xldmVsICE9ICcyJyxcbiAgICApO1xuICAgIHRoaXMucGFydGljaXBhbnRzUmVmID0gZmlsdGVyZWRQYXJ0aWNpcGFudHM7XG4gICAgdGhpcy5icmVha291dFJvb21zUmVmID1cbiAgICAgIHRoaXMucGFyYW1ldGVycy5icmVha291dFJvb21zICYmIHRoaXMucGFyYW1ldGVycy5icmVha291dFJvb21zLmxlbmd0aCA+IDBcbiAgICAgICAgPyBbLi4udGhpcy5wYXJhbWV0ZXJzLmJyZWFrb3V0Um9vbXNdXG4gICAgICAgIDogW107XG4gICAgdGhpcy5jaGVja0NhblN0YXJ0QnJlYWtvdXQoKTtcbiAgfTtcblxuICBoYW5kbGVSYW5kb21Bc3NpZ24oKSB7XG4gICAgY29uc3QgbnVtUm9vbXNJbnQgPSBwYXJzZUludCh0aGlzLm51bVJvb21zKTtcbiAgICBpZiAoIW51bVJvb21zSW50IHx8IG51bVJvb21zSW50IDw9IDApIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdQbGVhc2UgZW50ZXIgYSB2YWxpZCBudW1iZXIgb2Ygcm9vbXMnLFxuICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0JyZWFrb3V0Um9vbXM6IEJyZWFrb3V0UGFydGljaXBhbnRbXVtdID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogbnVtUm9vbXNJbnQgfSwgKCkgPT4gW10pO1xuXG4gICAgY29uc3Qgc2h1ZmZsZWRQYXJ0aWNpcGFudHMgPSBbLi4udGhpcy5wYXJ0aWNpcGFudHNSZWZdLnNvcnQoKCkgPT4gMC41IC0gTWF0aC5yYW5kb20oKSk7XG5cbiAgICBzaHVmZmxlZFBhcnRpY2lwYW50cy5mb3JFYWNoKChwYXJ0aWNpcGFudCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IHJvb21JbmRleCA9IGluZGV4ICUgbnVtUm9vbXNJbnQ7XG4gICAgICBpZiAobmV3QnJlYWtvdXRSb29tc1tyb29tSW5kZXhdLmxlbmd0aCA8IHRoaXMucGFyYW1ldGVycy5pdGVtUGFnZUxpbWl0KSB7XG4gICAgICAgIGNvbnN0IHBhcnRpY2lwYW50XzogQnJlYWtvdXRQYXJ0aWNpcGFudCA9IHsgbmFtZTogcGFydGljaXBhbnQubmFtZSwgYnJlYWtSb29tOiByb29tSW5kZXggfTtcbiAgICAgICAgbmV3QnJlYWtvdXRSb29tc1tyb29tSW5kZXhdLnB1c2gocGFydGljaXBhbnRfKTtcbiAgICAgICAgcGFydGljaXBhbnRbJ2JyZWFrUm9vbSddID0gcm9vbUluZGV4O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1Sb29tc0ludDsgaSsrKSB7XG4gICAgICAgICAgaWYgKG5ld0JyZWFrb3V0Um9vbXNbaV0ubGVuZ3RoIDwgdGhpcy5wYXJhbWV0ZXJzLml0ZW1QYWdlTGltaXQpIHtcbiAgICAgICAgICAgIG5ld0JyZWFrb3V0Um9vbXNbaV0ucHVzaChwYXJ0aWNpcGFudCk7XG4gICAgICAgICAgICBwYXJ0aWNpcGFudFsnYnJlYWtSb29tJ10gPSBpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGhpcy5icmVha291dFJvb21zUmVmID0gbmV3QnJlYWtvdXRSb29tcztcbiAgICB0aGlzLmNoZWNrQ2FuU3RhcnRCcmVha291dCgpO1xuICB9XG5cbiAgaGFuZGxlTWFudWFsQXNzaWduKCkge1xuICAgIGNvbnN0IG51bVJvb21zSW50ID0gcGFyc2VJbnQodGhpcy5udW1Sb29tcyk7XG4gICAgaWYgKCFudW1Sb29tc0ludCB8fCBudW1Sb29tc0ludCA8PSAwKSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgbnVtYmVyIG9mIHJvb21zJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmJyZWFrb3V0Um9vbXNSZWYgPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiBudW1Sb29tc0ludCB9LCAoKSA9PiBbXSk7XG4gICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUNhblN0YXJ0QnJlYWtvdXQoZmFsc2UpO1xuICAgIHRoaXMuY2hlY2tDYW5TdGFydEJyZWFrb3V0KCk7XG4gIH1cblxuICBoYW5kbGVBZGRSb29tKCkge1xuICAgIHRoaXMuYnJlYWtvdXRSb29tc1JlZiA9IFsuLi50aGlzLmJyZWFrb3V0Um9vbXNSZWYsIFtdXTtcbiAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlQ2FuU3RhcnRCcmVha291dChmYWxzZSk7XG4gICAgdGhpcy5jaGVja0NhblN0YXJ0QnJlYWtvdXQoKTtcbiAgfVxuXG4gIGhhbmRsZVNhdmVSb29tcygpIHtcbiAgICBpZiAodGhpcy52YWxpZGF0ZVJvb21zKCkpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVCcmVha291dFJvb21zKHRoaXMuYnJlYWtvdXRSb29tc1JlZik7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlQ2FuU3RhcnRCcmVha291dCh0cnVlKTtcbiAgICAgIHRoaXMuY2hlY2tDYW5TdGFydEJyZWFrb3V0KCk7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiAnUm9vbXMgc2F2ZWQgc3VjY2Vzc2Z1bGx5JywgdHlwZTogJ3N1Y2Nlc3MnIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiAnUm9vbXMgdmFsaWRhdGlvbiBmYWlsZWQnLCB0eXBlOiAnZGFuZ2VyJyB9KTtcbiAgICB9XG4gIH1cblxuICB2YWxpZGF0ZVJvb21zKCkge1xuICAgIGlmICh0aGlzLmJyZWFrb3V0Um9vbXNSZWYubGVuZ3RoID09IDApIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaG93QWxlcnQ/Lih7IG1lc3NhZ2U6ICdUaGVyZSBtdXN0IGJlIGF0IGxlYXN0IG9uZSByb29tJywgdHlwZTogJ2RhbmdlcicgfSk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9yIChsZXQgcm9vbSBvZiB0aGlzLmJyZWFrb3V0Um9vbXNSZWYpIHtcbiAgICAgIGlmIChyb29tLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zaG93QWxlcnQ/Lih7IG1lc3NhZ2U6ICdSb29tcyBtdXN0IG5vdCBiZSBlbXB0eScsIHR5cGU6ICdkYW5nZXInIH0pO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcnRpY2lwYW50TmFtZXMgPSByb29tLm1hcCgocCkgPT4gcC5uYW1lKTtcbiAgICAgIGNvbnN0IHVuaXF1ZU5hbWVzID0gbmV3IFNldChwYXJ0aWNpcGFudE5hbWVzKTtcbiAgICAgIGlmIChwYXJ0aWNpcGFudE5hbWVzLmxlbmd0aCAhPSB1bmlxdWVOYW1lcy5zaXplKSB7XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5zaG93QWxlcnQ/Lih7XG4gICAgICAgICAgbWVzc2FnZTogJ0R1cGxpY2F0ZSBwYXJ0aWNpcGFudCBuYW1lcyBpbiBhIHJvb20nLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBpZiAocm9vbS5sZW5ndGggPiB0aGlzLnBhcmFtZXRlcnMuaXRlbVBhZ2VMaW1pdCkge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdBIHJvb20gZXhjZWVkcyB0aGUgcGFydGljaXBhbnQgbGltaXQnLFxuICAgICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY2hlY2tDYW5TdGFydEJyZWFrb3V0ID0gKCkgPT4ge1xuICAgIHRoaXMucGFyYW1ldGVycyA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgaWYgKHRoaXMucGFyYW1ldGVycy5jYW5TdGFydEJyZWFrb3V0KSB7XG4gICAgICB0aGlzLnN0YXJ0QnJlYWtvdXRCdXR0b25WaXNpYmxlID0gdHJ1ZTtcbiAgICAgIHRoaXMuc3RvcEJyZWFrb3V0QnV0dG9uVmlzaWJsZSA9XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5icmVha091dFJvb21TdGFydGVkICYmICF0aGlzLnBhcmFtZXRlcnMuYnJlYWtPdXRSb29tRW5kZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc3RhcnRCcmVha291dEJ1dHRvblZpc2libGUgPSBmYWxzZTtcbiAgICAgIHRoaXMuc3RvcEJyZWFrb3V0QnV0dG9uVmlzaWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTdGFydEJyZWFrb3V0ID0gKCkgPT4ge1xuICAgIHRoaXMucGFyYW1ldGVycyA9IHRoaXMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG4gICAgaWYgKHRoaXMucGFyYW1ldGVycy5zaGFyZVNjcmVlblN0YXJ0ZWQgfHwgdGhpcy5wYXJhbWV0ZXJzLnNoYXJlZCkge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1lvdSBjYW5ub3Qgc3RhcnQgYnJlYWtvdXQgcm9vbXMgd2hpbGUgc2NyZWVuIHNoYXJpbmcgaXMgYWN0aXZlJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmNhblN0YXJ0QnJlYWtvdXQpIHtcbiAgICAgIGNvbnN0IGVtaXROYW1lID1cbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLmJyZWFrT3V0Um9vbVN0YXJ0ZWQgJiYgIXRoaXMucGFyYW1ldGVycy5icmVha091dFJvb21FbmRlZFxuICAgICAgICAgID8gJ3VwZGF0ZUJyZWFrb3V0J1xuICAgICAgICAgIDogJ3N0YXJ0QnJlYWtvdXQnO1xuICAgICAgY29uc3QgZmlsdGVyZWRCcmVha291dFJvb21zID0gdGhpcy5icmVha291dFJvb21zUmVmLm1hcCgocm9vbSkgPT5cbiAgICAgICAgcm9vbS5tYXAoKHsgbmFtZSwgYnJlYWtSb29tIH0pID0+ICh7IG5hbWUsIGJyZWFrUm9vbSB9KSksXG4gICAgICApO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNvY2tldC5lbWl0KFxuICAgICAgICBlbWl0TmFtZSxcbiAgICAgICAge1xuICAgICAgICAgIGJyZWFrb3V0Um9vbXM6IGZpbHRlcmVkQnJlYWtvdXRSb29tcyxcbiAgICAgICAgICBuZXdQYXJ0aWNpcGFudEFjdGlvbjogdGhpcy5uZXdQYXJ0aWNpcGFudEFjdGlvbixcbiAgICAgICAgICByb29tTmFtZTogdGhpcy5wYXJhbWV0ZXJzLnJvb21OYW1lLFxuICAgICAgICB9LFxuICAgICAgICAocmVzcG9uc2U6IHsgc3VjY2VzczogYW55OyByZWFzb246IGFueSB9KSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5zaG93QWxlcnQ/Lih7IG1lc3NhZ2U6ICdCcmVha291dCByb29tcyBhY3RpdmUnLCB0eXBlOiAnc3VjY2VzcycgfSk7XG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlQnJlYWtPdXRSb29tU3RhcnRlZCh0cnVlKTtcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVCcmVha091dFJvb21FbmRlZChmYWxzZSk7XG5cbiAgICAgICAgICAgIHRoaXMub25CcmVha291dFJvb21zQ2xvc2UoKTtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMubWVldGluZ0Rpc3BsYXlUeXBlICE9ICdhbGwnKSB7XG4gICAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUoJ2FsbCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiByZXNwb25zZS5yZWFzb24sIHR5cGU6ICdkYW5nZXInIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICk7XG4gICAgfVxuICB9O1xuXG4gIGhhbmRsZVN0b3BCcmVha291dCgpIHtcbiAgICB0aGlzLnBhcmFtZXRlcnMuc29ja2V0LmVtaXQoXG4gICAgICAnc3RvcEJyZWFrb3V0JyxcbiAgICAgIHsgcm9vbU5hbWU6IHRoaXMucGFyYW1ldGVycy5yb29tTmFtZSB9LFxuICAgICAgKHJlc3BvbnNlOiB7IHN1Y2Nlc3M6IGFueTsgcmVhc29uOiBhbnkgfSkgPT4ge1xuICAgICAgICBpZiAocmVzcG9uc2Uuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy5zaG93QWxlcnQ/Lih7IG1lc3NhZ2U6ICdCcmVha291dCByb29tcyBzdG9wcGVkJywgdHlwZTogJ3N1Y2Nlc3MnIH0pO1xuICAgICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVCcmVha091dFJvb21TdGFydGVkKGZhbHNlKTtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlQnJlYWtPdXRSb29tRW5kZWQodHJ1ZSk7XG5cbiAgICAgICAgICB0aGlzLm9uQnJlYWtvdXRSb29tc0Nsb3NlKCk7XG4gICAgICAgICAgaWYgKHRoaXMucGFyYW1ldGVycy5tZWV0aW5nRGlzcGxheVR5cGUgIT0gdGhpcy5wYXJhbWV0ZXJzLnByZXZNZWV0aW5nRGlzcGxheVR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVNZWV0aW5nRGlzcGxheVR5cGUodGhpcy5wYXJhbWV0ZXJzLnByZXZNZWV0aW5nRGlzcGxheVR5cGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiByZXNwb25zZS5yZWFzb24sIHR5cGU6ICdkYW5nZXInIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICk7XG4gIH1cblxuICBoYW5kbGVFZGl0Um9vbShyb29tSW5kZXg6IG51bWJlcikge1xuICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVDdXJyZW50Um9vbUluZGV4KHJvb21JbmRleCk7XG4gICAgdGhpcy5jdXJyZW50Um9vbSA9IHRoaXMuYnJlYWtvdXRSb29tc1JlZltyb29tSW5kZXhdO1xuICAgIHRoaXMuZWRpdFJvb21Nb2RhbFZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVDYW5TdGFydEJyZWFrb3V0KGZhbHNlKTtcbiAgICB0aGlzLmNoZWNrQ2FuU3RhcnRCcmVha291dCgpO1xuICB9XG5cbiAgaGFuZGxlRGVsZXRlUm9vbShyb29tSW5kZXg6IG51bWJlcikge1xuICAgIGlmICh0aGlzLmJyZWFrb3V0Um9vbXNSZWYubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3Qgcm9vbSA9IHRoaXMuYnJlYWtvdXRSb29tc1JlZltyb29tSW5kZXhdO1xuICAgICAgcm9vbS5mb3JFYWNoKChwYXJ0aWNpcGFudCkgPT4gKHBhcnRpY2lwYW50LmJyZWFrUm9vbSA9IG51bGwpKTtcbiAgICAgIGNvbnN0IG5ld0JyZWFrb3V0Um9vbXMgPSBbLi4udGhpcy5icmVha291dFJvb21zUmVmXTtcbiAgICAgIG5ld0JyZWFrb3V0Um9vbXMuc3BsaWNlKHJvb21JbmRleCwgMSk7XG5cbiAgICAgIG5ld0JyZWFrb3V0Um9vbXMuZm9yRWFjaCgocm9vbSwgaW5kZXgpID0+IHtcbiAgICAgICAgcm9vbS5mb3JFYWNoKChwYXJ0aWNpcGFudCkgPT4gKHBhcnRpY2lwYW50LmJyZWFrUm9vbSA9IGluZGV4KSk7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy5icmVha291dFJvb21zUmVmID0gbmV3QnJlYWtvdXRSb29tcztcbiAgICAgIHRoaXMuY2hlY2tDYW5TdGFydEJyZWFrb3V0KCk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQWRkUGFydGljaXBhbnQoZXZlbnQ6IHsgcm9vbUluZGV4OiBudW1iZXI7IHBhcnRpY2lwYW50OiBCcmVha291dFBhcnRpY2lwYW50IH0pIHtcbiAgICBjb25zdCB7IHJvb21JbmRleCwgcGFydGljaXBhbnQgfSA9IGV2ZW50O1xuICAgIGlmICh0aGlzLmJyZWFrb3V0Um9vbXNSZWZbcm9vbUluZGV4XS5sZW5ndGggPCB0aGlzLnBhcmFtZXRlcnMuaXRlbVBhZ2VMaW1pdCkge1xuICAgICAgY29uc3QgbmV3QnJlYWtvdXRSb29tcyA9IFsuLi50aGlzLmJyZWFrb3V0Um9vbXNSZWZdO1xuICAgICAgbmV3QnJlYWtvdXRSb29tc1tyb29tSW5kZXhdLnB1c2gocGFydGljaXBhbnQpO1xuICAgICAgdGhpcy5icmVha291dFJvb21zUmVmID0gbmV3QnJlYWtvdXRSb29tcztcbiAgICAgIHBhcnRpY2lwYW50WydicmVha1Jvb20nXSA9IHJvb21JbmRleDtcbiAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuY3VycmVudFJvb21JbmRleCAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuaGFuZGxlRWRpdFJvb20odGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRSb29tSW5kZXgpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiAnUm9vbSBpcyBmdWxsJywgdHlwZTogJ2RhbmdlcicgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUmVtb3ZlUGFydGljaXBhbnQoZXZlbnQ6IHsgcm9vbUluZGV4OiBudW1iZXI7IHBhcnRpY2lwYW50OiBCcmVha291dFBhcnRpY2lwYW50IH0pIHtcbiAgICBjb25zdCB7IHJvb21JbmRleCwgcGFydGljaXBhbnQgfSA9IGV2ZW50O1xuICAgIGNvbnN0IG5ld0JyZWFrb3V0Um9vbXMgPSBbLi4udGhpcy5icmVha291dFJvb21zUmVmXTtcbiAgICBuZXdCcmVha291dFJvb21zW3Jvb21JbmRleF0gPSBuZXdCcmVha291dFJvb21zW3Jvb21JbmRleF0uZmlsdGVyKChwKSA9PiBwICE9IHBhcnRpY2lwYW50KTtcbiAgICB0aGlzLmJyZWFrb3V0Um9vbXNSZWYgPSBuZXdCcmVha291dFJvb21zO1xuICAgIHBhcnRpY2lwYW50WydicmVha1Jvb20nXSA9IG51bGw7XG4gICAgaWYgKHRoaXMucGFyYW1ldGVycy5jdXJyZW50Um9vbUluZGV4ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuaGFuZGxlRWRpdFJvb20odGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRSb29tSW5kZXgpO1xuICAgIH1cbiAgfVxufVxuIiwiPGRpdiAqbmdJZj1cImlzVmlzaWJsZVwiIGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCIgW25nU3R5bGVdPVwibW9kYWxDb250YWluZXJTdHlsZSgpXCI+XHJcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIiBbbmdTdHlsZV09XCJtb2RhbENvbnRlbnRTdHlsZSgpXCI+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtaGVhZGVyXCI+XHJcbiAgICAgIDxoMj5CcmVha291dCBSb29tcyA8ZmEtaWNvbiBbaWNvbl09XCJmYURvb3JPcGVuXCI+PC9mYS1pY29uPjwvaDI+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJjbG9zZS1idG5cIiAoY2xpY2spPVwib25CcmVha291dFJvb21zQ2xvc2UoKVwiPlxyXG4gICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhVGltZXNcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8aHI+XHJcbiAgICA8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxyXG4gICAgICA8bGFiZWwgZm9yPVwibnVtUm9vbXNcIj5OdW1iZXIgb2YgUm9vbXMgPGZhLWljb24gW2ljb25dPVwiZmFVc2Vyc1wiPjwvZmEtaWNvbj48L2xhYmVsPlxyXG4gICAgICA8aW5wdXQgdHlwZT1cIm51bWJlclwiIGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJudW1Sb29tc1wiIFsobmdNb2RlbCldPVwibnVtUm9vbXNcIj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIChjbGljayk9XCJoYW5kbGVSYW5kb21Bc3NpZ24oKVwiPlJhbmRvbSBBc3NpZ24gPGZhLWljb24gW2ljb25dPVwiZmFSYW5kb21cIj48L2ZhLWljb24+PC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXNlY29uZGFyeVwiIChjbGljayk9XCJoYW5kbGVNYW51YWxBc3NpZ24oKVwiPk1hbnVhbCBBc3NpZ24gPGZhLWljb24gW2ljb25dPVwiZmFIYW5kUG9pbnRlclwiPjwvZmEtaWNvbj48L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tc3VjY2Vzc1wiIChjbGljayk9XCJoYW5kbGVBZGRSb29tKClcIj5BZGQgUm9vbSA8ZmEtaWNvbiBbaWNvbl09XCJmYVBsdXNcIj48L2ZhLWljb24+PC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWluZm9cIiAoY2xpY2spPVwiaGFuZGxlU2F2ZVJvb21zKClcIj5TYXZlIFJvb21zIDxmYS1pY29uIFtpY29uXT1cImZhU2F2ZVwiPjwvZmEtaWNvbj48L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgPGxhYmVsIGZvcj1cIm5ld1BhcnRpY2lwYW50QWN0aW9uXCI+TmV3IFBhcnRpY2lwYW50IEFjdGlvbiA8ZmEtaWNvbiBbaWNvbl09XCJmYVVzZXJzXCI+PC9mYS1pY29uPjwvbGFiZWw+XHJcbiAgICAgIDxzZWxlY3QgY2xhc3M9XCJmb3JtLWNvbnRyb2xcIiBpZD1cIm5ld1BhcnRpY2lwYW50QWN0aW9uXCIgWyhuZ01vZGVsKV09XCJuZXdQYXJ0aWNpcGFudEFjdGlvblwiPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJhdXRvQXNzaWduTmV3Um9vbVwiPkFkZCB0byBuZXcgcm9vbTwvb3B0aW9uPlxyXG4gICAgICAgIDxvcHRpb24gdmFsdWU9XCJhdXRvQXNzaWduQXZhaWxhYmxlUm9vbVwiPkFkZCB0byBvcGVuIHJvb208L29wdGlvbj5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwibWFudWFsQXNzaWduXCI+Tm8gYWN0aW9uPC9vcHRpb24+XHJcbiAgICAgIDwvc2VsZWN0PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2ICNyb29tc0NvbnRhaW5lcj5cclxuICAgICAgPGFwcC1yb29tLWxpc3QgW3Jvb21zXT1cImJyZWFrb3V0Um9vbXNSZWZcIiAoZWRpdFJvb20pPVwiaGFuZGxlRWRpdFJvb20oJGV2ZW50KVwiIChkZWxldGVSb29tKT1cImhhbmRsZURlbGV0ZVJvb20oJGV2ZW50KVwiIChyZW1vdmVQYXJ0aWNpcGFudCk9XCJoYW5kbGVSZW1vdmVQYXJ0aWNpcGFudCgkZXZlbnQpXCI+PC9hcHAtcm9vbS1saXN0PlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2ICpuZ0lmPVwic3RhcnRCcmVha291dEJ1dHRvblZpc2libGVcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeSBtci0yIG1iLTJcIiAoY2xpY2spPVwiaGFuZGxlU3RhcnRCcmVha291dCgpXCI+XHJcbiAgICAgICAge3sgcGFyYW1ldGVycy5icmVha091dFJvb21TdGFydGVkICYmICFwYXJhbWV0ZXJzLmJyZWFrT3V0Um9vbUVuZGVkID8gJ1VwZGF0ZSBCcmVha291dCcgOiAnU3RhcnQgQnJlYWtvdXQnIH19IDxmYS1pY29uIFtpY29uXT1cInBhcmFtZXRlcnMuYnJlYWtPdXRSb29tU3RhcnRlZCAmJiAhcGFyYW1ldGVycy5icmVha091dFJvb21FbmRlZCA/IGZhU3luY0FsdCA6IGZhUGxheVwiPjwvZmEtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgKm5nSWY9XCJzdG9wQnJlYWtvdXRCdXR0b25WaXNpYmxlXCI+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLWRhbmdlciBtci0yIG1iLTJcIiAoY2xpY2spPVwiaGFuZGxlU3RvcEJyZWFrb3V0KClcIj5cclxuICAgICAgICBTdG9wIEJyZWFrb3V0IDxmYS1pY29uIFtpY29uXT1cImZhU3RvcFwiPjwvZmEtaWNvbj5cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuICA8YXBwLWVkaXQtcm9vbS1tb2RhbCBbZWRpdFJvb21Nb2RhbFZpc2libGVdPVwiZWRpdFJvb21Nb2RhbFZpc2libGVcIiBbY3VycmVudFJvb21dPVwiY3VycmVudFJvb20hXCIgW3BhcnRpY2lwYW50c1JlZl09XCJwYXJ0aWNpcGFudHNSZWZcIiBbY3VycmVudFJvb21JbmRleF09XCJwYXJhbWV0ZXJzLmN1cnJlbnRSb29tSW5kZXghXCIgKHNldEVkaXRSb29tTW9kYWxWaXNpYmxlKT1cImVkaXRSb29tTW9kYWxWaXNpYmxlID0gJGV2ZW50XCIgKGFkZFBhcnRpY2lwYW50KT1cImhhbmRsZUFkZFBhcnRpY2lwYW50KCRldmVudClcIiAocmVtb3ZlUGFydGljaXBhbnQpPVwiaGFuZGxlUmVtb3ZlUGFydGljaXBhbnQoJGV2ZW50KVwiPjwvYXBwLWVkaXQtcm9vbS1tb2RhbD5cclxuPC9kaXY+XHJcbiJdfQ==