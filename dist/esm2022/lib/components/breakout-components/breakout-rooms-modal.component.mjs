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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJlYWtvdXQtcm9vbXMtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvYnJlYWtvdXQtY29tcG9uZW50cy9icmVha291dC1yb29tcy1tb2RhbC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9icmVha291dC1jb21wb25lbnRzL2JyZWFrb3V0LXJvb21zLW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUdMLFNBQVMsR0FHVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFDTCxVQUFVLEVBQ1YsT0FBTyxFQUNQLFFBQVEsRUFDUixhQUFhLEVBQ2IsTUFBTSxFQUNOLE1BQU0sRUFDTixNQUFNLEVBQ04sU0FBUyxFQUNULE1BQU0sRUFDTixPQUFPLEdBQ1IsTUFBTSxtQ0FBbUMsQ0FBQztBQUMzQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUNwRSxPQUFPLEVBQUUsc0JBQXNCLEVBQUUsTUFBTSw2Q0FBNkMsQ0FBQzs7Ozs7QUF1RHJGLE1BQU0sT0FBTyxrQkFBa0I7SUFDcEIsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUNsQixVQUFVLENBQWdDO0lBQzFDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDdEIsZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUM1QixvQkFBb0IsR0FBZSxHQUFHLEVBQUU7UUFDL0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQ3ZDLENBQUMsQ0FBQztJQUMyQixpQkFBaUIsQ0FBYztJQUU1RCxVQUFVLEdBQUcsVUFBVSxDQUFDO0lBQ3hCLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFDbEIsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUNwQixhQUFhLEdBQUcsYUFBYSxDQUFDO0lBQzlCLE1BQU0sR0FBRyxNQUFNLENBQUM7SUFDaEIsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUNoQixNQUFNLEdBQUcsTUFBTSxDQUFDO0lBQ2hCLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDdEIsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUNoQixPQUFPLEdBQUcsT0FBTyxDQUFDO0lBRWxCLGVBQWUsR0FBa0IsRUFBRSxDQUFDO0lBQ3BDLGdCQUFnQixHQUE0QixFQUFFLENBQUM7SUFFL0MsUUFBUSxHQUFHLEVBQUUsQ0FBQztJQUNkLG9CQUFvQixHQUFHLG1CQUFtQixDQUFDO0lBQzNDLFdBQVcsR0FBaUMsSUFBSSxDQUFDO0lBQ2pELG9CQUFvQixHQUFHLEtBQUssQ0FBQztJQUU3QiwwQkFBMEIsR0FBRyxLQUFLLENBQUM7SUFDbkMseUJBQXlCLEdBQUcsS0FBSyxDQUFDO0lBRWxDLFVBQVUsR0FBRyxHQUFHLENBQUM7SUFFakIsbUJBQW1CO1FBQ2pCLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUM7UUFDdEMsSUFBSSxVQUFVLEdBQUcsSUFBSSxHQUFHLFdBQVcsQ0FBQztRQUNwQyxJQUFJLFVBQVUsR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNyQixVQUFVLEdBQUcsR0FBRyxDQUFDO1FBQ25CLENBQUM7UUFDRCxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztJQUMvQixDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLE9BQU87WUFDTCxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNO1lBQzFDLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLEdBQUcsRUFBRSxHQUFHO1lBQ1IsSUFBSSxFQUFFLEdBQUc7WUFDVCxLQUFLLEVBQUUsTUFBTTtZQUNiLE1BQU0sRUFBRSxNQUFNO1lBQ2QsZUFBZSxFQUFFLG9CQUFvQjtZQUNyQyxNQUFNLEVBQUUsS0FBSztTQUNkLENBQUM7SUFDSixDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsT0FBTztZQUNMLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxZQUFZLEVBQUUsTUFBTTtZQUNwQixPQUFPLEVBQUUsTUFBTTtZQUNmLEtBQUssRUFBRSxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUk7WUFDN0IsU0FBUyxFQUFFLEtBQUs7WUFDaEIsU0FBUyxFQUFFLFFBQVE7WUFDbkIsU0FBUyxFQUFFLE1BQU07WUFDakIsUUFBUSxFQUFFLE9BQU87WUFDakIsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDcEQsTUFBTSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDMUQsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDdEQsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07U0FDekQsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzNDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQ2pDLENBQUM7SUFDSCxDQUFDO0lBRUQsUUFBUTtRQUNOLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCx1QkFBdUIsR0FBRyxHQUFHLEVBQUU7UUFDN0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDeEQsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQzlELENBQUMsV0FBZ0IsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQ2pELENBQUM7UUFDRixJQUFJLENBQUMsZUFBZSxHQUFHLG9CQUFvQixDQUFDO1FBQzVDLElBQUksQ0FBQyxnQkFBZ0I7WUFDbkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQ3ZFLENBQUMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUM7Z0JBQ3BDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDVCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUMvQixDQUFDLENBQUM7SUFFRixrQkFBa0I7UUFDaEIsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUMxQixPQUFPLEVBQUUsc0NBQXNDO2dCQUMvQyxJQUFJLEVBQUUsUUFBUTthQUNmLENBQUMsQ0FBQztZQUNILE9BQU87UUFDVCxDQUFDO1FBRUQsTUFBTSxnQkFBZ0IsR0FBNEIsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVoRyxNQUFNLG9CQUFvQixHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQztRQUV2RixvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLEVBQUU7WUFDbEQsTUFBTSxTQUFTLEdBQUcsS0FBSyxHQUFHLFdBQVcsQ0FBQztZQUN0QyxJQUFJLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUN2RSxNQUFNLFlBQVksR0FBd0IsRUFBRSxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLENBQUM7Z0JBQzNGLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztnQkFDL0MsV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUN2QyxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNyQyxJQUFJLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO3dCQUMvRCxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7d0JBQ3RDLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQzdCLE1BQU07b0JBQ1IsQ0FBQztnQkFDSCxDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxrQkFBa0I7UUFDaEIsTUFBTSxXQUFXLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsV0FBVyxJQUFJLFdBQVcsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDO2dCQUMxQixPQUFPLEVBQUUsc0NBQXNDO2dCQUMvQyxJQUFJLEVBQUUsUUFBUTthQUNmLENBQUMsQ0FBQztZQUNILE9BQU87UUFDVCxDQUFDO1FBRUQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRUQsYUFBYTtRQUNYLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUM7SUFDL0IsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsT0FBTyxFQUFFLDBCQUEwQixFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ3hGLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUN0RixDQUFDO0lBQ0gsQ0FBQztJQUVELGFBQWE7UUFDWCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUM1RixPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7UUFFRCxLQUFLLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3ZDLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDcEYsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDO1lBRUQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsTUFBTSxXQUFXLEdBQUcsSUFBSSxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUM5QyxJQUFJLGdCQUFnQixDQUFDLE1BQU0sSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7b0JBQzFCLE9BQU8sRUFBRSx1Q0FBdUM7b0JBQ2hELElBQUksRUFBRSxRQUFRO2lCQUNmLENBQUMsQ0FBQztnQkFDSCxPQUFPLEtBQUssQ0FBQztZQUNmLENBQUM7WUFFRCxJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFDaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztvQkFDMUIsT0FBTyxFQUFFLHNDQUFzQztvQkFDL0MsSUFBSSxFQUFFLFFBQVE7aUJBQ2YsQ0FBQyxDQUFDO2dCQUNILE9BQU8sS0FBSyxDQUFDO1lBQ2YsQ0FBQztRQUNILENBQUM7UUFFRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxxQkFBcUIsR0FBRyxHQUFHLEVBQUU7UUFDM0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFDeEQsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDckMsSUFBSSxDQUFDLDBCQUEwQixHQUFHLElBQUksQ0FBQztZQUN2QyxJQUFJLENBQUMseUJBQXlCO2dCQUM1QixJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQztRQUM5RSxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQywwQkFBMEIsR0FBRyxLQUFLLENBQUM7WUFDeEMsSUFBSSxDQUFDLHlCQUF5QixHQUFHLEtBQUssQ0FBQztRQUN6QyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsbUJBQW1CLEdBQUcsR0FBRyxFQUFFO1FBQ3pCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1FBQ3hELElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pFLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQzFCLE9BQU8sRUFBRSxnRUFBZ0U7Z0JBQ3pFLElBQUksRUFBRSxRQUFRO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsT0FBTztRQUNULENBQUM7UUFFRCxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUNyQyxNQUFNLFFBQVEsR0FDWixJQUFJLENBQUMsVUFBVSxDQUFDLG1CQUFtQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxpQkFBaUI7Z0JBQ3ZFLENBQUMsQ0FBQyxnQkFBZ0I7Z0JBQ2xCLENBQUMsQ0FBQyxlQUFlLENBQUM7WUFDdEIsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FDL0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUMsQ0FDekQsQ0FBQztZQUNGLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDekIsUUFBUSxFQUNSO2dCQUNFLGFBQWEsRUFBRSxxQkFBcUI7Z0JBQ3BDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxvQkFBb0I7Z0JBQy9DLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVE7YUFDbkMsRUFDRCxDQUFDLFFBQXVDLEVBQUUsRUFBRTtnQkFDMUMsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUM7b0JBQ3JCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7b0JBQ25GLElBQUksQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBRS9DLElBQUksQ0FBQyxvQkFBb0IsRUFBRSxDQUFDO29CQUM1QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLElBQUksS0FBSyxFQUFFLENBQUM7d0JBQ2hELElBQUksQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ2xELENBQUM7Z0JBQ0gsQ0FBQztxQkFBTSxDQUFDO29CQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDNUUsQ0FBQztZQUNILENBQUMsQ0FDRixDQUFDO1FBQ0osQ0FBQztJQUNILENBQUMsQ0FBQztJQUVGLGtCQUFrQjtRQUNoQixJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQ3pCLGNBQWMsRUFDZCxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUN0QyxDQUFDLFFBQXVDLEVBQUUsRUFBRTtZQUMxQyxJQUFJLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxFQUFFLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFDcEYsSUFBSSxDQUFDLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakQsSUFBSSxDQUFDLFVBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFFOUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLENBQUM7Z0JBQzVCLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixFQUFFLENBQUM7b0JBQ2pGLElBQUksQ0FBQyxVQUFVLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO2dCQUNuRixDQUFDO1lBQ0gsQ0FBQztpQkFBTSxDQUFDO2dCQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztZQUM1RSxDQUFDO1FBQ0gsQ0FBQyxDQUNGLENBQUM7SUFDSixDQUFDO0lBRUQsY0FBYyxDQUFDLFNBQWlCO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsc0JBQXNCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDbEQsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztRQUNqQyxJQUFJLENBQUMsVUFBVSxDQUFDLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxnQkFBZ0IsQ0FBQyxTQUFpQjtRQUNoQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7WUFDckMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzlELE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3BELGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFdEMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNqRSxDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQztZQUN6QyxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQztJQUVELG9CQUFvQixDQUFDLEtBQThEO1FBQ2pGLE1BQU0sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ3pDLElBQUksSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzVFLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3BELGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM5QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUM7WUFDekMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxHQUFHLFNBQVMsQ0FBQztZQUNyQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsZ0JBQWdCLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ3hELENBQUM7UUFDSCxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzNFLENBQUM7SUFDSCxDQUFDO0lBRUQsdUJBQXVCLENBQUMsS0FBOEQ7UUFDcEYsTUFBTSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFDekMsTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEQsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksV0FBVyxDQUFDLENBQUM7UUFDMUYsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDO1FBQ3pDLFdBQVcsQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLENBQUM7UUFDaEMsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixJQUFJLElBQUksRUFBRSxDQUFDO1lBQzdDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3hELENBQUM7SUFDSCxDQUFDO3VHQWhVVSxrQkFBa0I7MkZBQWxCLGtCQUFrQixvWUNoRi9CLHUvRkEyQ0EseURENEJJLFlBQVksdU5BQ1osV0FBVywycUNBQ1gsaUJBQWlCLDZQQUNqQixpQkFBaUIsdUlBQ2pCLHNCQUFzQjs7MkZBS2Isa0JBQWtCO2tCQWI5QixTQUFTOytCQUNFLDBCQUEwQixjQUN4QixJQUFJLFdBQ1A7d0JBQ1AsWUFBWTt3QkFDWixXQUFXO3dCQUNYLGlCQUFpQjt3QkFDakIsaUJBQWlCO3dCQUNqQixzQkFBc0I7cUJBQ3ZCOzhCQUtRLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUd1QixpQkFBaUI7c0JBQTdDLFNBQVM7dUJBQUMsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG4gIE9uSW5pdCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7XG4gIGZhRG9vck9wZW4sXG4gIGZhVGltZXMsXG4gIGZhUmFuZG9tLFxuICBmYUhhbmRQb2ludGVyLFxuICBmYVBsdXMsXG4gIGZhU2F2ZSxcbiAgZmFQbGF5LFxuICBmYVN5bmNBbHQsXG4gIGZhU3RvcCxcbiAgZmFVc2Vycyxcbn0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IFJvb21MaXN0Q29tcG9uZW50IH0gZnJvbSAnLi9yb29tLWxpc3Qvcm9vbS1saXN0LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBFZGl0Um9vbU1vZGFsQ29tcG9uZW50IH0gZnJvbSAnLi9lZGl0LXJvb20tbW9kYWwvZWRpdC1yb29tLW1vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IFBhcnRpY2lwYW50LCBTaG93QWxlcnQsIEJyZWFrb3V0UGFydGljaXBhbnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEJyZWFrb3V0Um9vbXNNb2RhbFBhcmFtZXRlcnMge1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIGl0ZW1QYWdlTGltaXQ6IG51bWJlcjtcbiAgbWVldGluZ0Rpc3BsYXlUeXBlOiBzdHJpbmc7XG4gIHByZXZNZWV0aW5nRGlzcGxheVR5cGU6IHN0cmluZztcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBzaGFyZWQ6IGJvb2xlYW47XG4gIGJyZWFrT3V0Um9vbVN0YXJ0ZWQ6IGJvb2xlYW47XG4gIGJyZWFrT3V0Um9vbUVuZGVkOiBib29sZWFuO1xuICBpc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGU6IGJvb2xlYW47XG4gIGN1cnJlbnRSb29tSW5kZXg6IG51bWJlciB8IG51bGw7XG4gIGNhblN0YXJ0QnJlYWtvdXQ6IGJvb2xlYW47XG4gIGJyZWFrb3V0Um9vbXM6IEJyZWFrb3V0UGFydGljaXBhbnRbXVtdO1xuICB1cGRhdGVCcmVha091dFJvb21TdGFydGVkOiAoc3RhcnRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQnJlYWtPdXRSb29tRW5kZWQ6IChlbmRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlQ3VycmVudFJvb21JbmRleDogKHJvb21JbmRleDogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVDYW5TdGFydEJyZWFrb3V0OiAoY2FuU3RhcnQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUJyZWFrb3V0Um9vbXM6IChicmVha291dFJvb21zOiBCcmVha291dFBhcnRpY2lwYW50W11bXSkgPT4gdm9pZDtcbiAgdXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlOiAoZGlzcGxheVR5cGU6IHN0cmluZykgPT4gdm9pZDtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBCcmVha291dFJvb21zTW9kYWxQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEJyZWFrb3V0Um9vbXNNb2RhbFR5cGUgPSAob3B0aW9uczogQnJlYWtvdXRSb29tc01vZGFsT3B0aW9ucykgPT4gSFRNTEVsZW1lbnQ7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnJlYWtvdXRSb29tc01vZGFsT3B0aW9ucyB7XG4gIGlzVmlzaWJsZTogYm9vbGVhbjtcbiAgcGFyYW1ldGVyczogQnJlYWtvdXRSb29tc01vZGFsUGFyYW1ldGVycztcbiAgcG9zaXRpb24/OiAndG9wUmlnaHQnIHwgJ3RvcExlZnQnIHwgJ2JvdHRvbVJpZ2h0JyB8ICdib3R0b21MZWZ0JztcbiAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xuICBvbkJyZWFrb3V0Um9vbXNDbG9zZTogKCkgPT4gdm9pZDtcbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWJyZWFrb3V0LXJvb21zLW1vZGFsJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBGb3Jtc01vZHVsZSxcbiAgICBGb250QXdlc29tZU1vZHVsZSxcbiAgICBSb29tTGlzdENvbXBvbmVudCxcbiAgICBFZGl0Um9vbU1vZGFsQ29tcG9uZW50LFxuICBdLFxuICB0ZW1wbGF0ZVVybDogJy4vYnJlYWtvdXQtcm9vbXMtbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9icmVha291dC1yb29tcy1tb2RhbC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIEJyZWFrb3V0Um9vbXNNb2RhbCBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgQElucHV0KCkgaXNWaXNpYmxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIHBhcmFtZXRlcnMhOiBCcmVha291dFJvb21zTW9kYWxQYXJhbWV0ZXJzO1xuICBASW5wdXQoKSBwb3NpdGlvbiA9ICd0b3BSaWdodCc7XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICcjODNjMGU5JztcbiAgQElucHV0KCkgb25CcmVha291dFJvb21zQ2xvc2U6ICgpID0+IHZvaWQgPSAoKSA9PiB7XG4gICAgY29uc29sZS5sb2coJ0JyZWFrb3V0IHJvb21zIGNsb3NlZCcpO1xuICB9O1xuICBAVmlld0NoaWxkKCdyb29tc0NvbnRhaW5lcicpIHJvb21zQ29udGFpbmVyUmVmITogRWxlbWVudFJlZjtcblxuICBmYURvb3JPcGVuID0gZmFEb29yT3BlbjtcbiAgZmFUaW1lcyA9IGZhVGltZXM7XG4gIGZhUmFuZG9tID0gZmFSYW5kb207XG4gIGZhSGFuZFBvaW50ZXIgPSBmYUhhbmRQb2ludGVyO1xuICBmYVBsdXMgPSBmYVBsdXM7XG4gIGZhU2F2ZSA9IGZhU2F2ZTtcbiAgZmFQbGF5ID0gZmFQbGF5O1xuICBmYVN5bmNBbHQgPSBmYVN5bmNBbHQ7XG4gIGZhU3RvcCA9IGZhU3RvcDtcbiAgZmFVc2VycyA9IGZhVXNlcnM7XG5cbiAgcGFydGljaXBhbnRzUmVmOiBQYXJ0aWNpcGFudFtdID0gW107XG4gIGJyZWFrb3V0Um9vbXNSZWY6IEJyZWFrb3V0UGFydGljaXBhbnRbXVtdID0gW107XG5cbiAgbnVtUm9vbXMgPSAnJztcbiAgbmV3UGFydGljaXBhbnRBY3Rpb24gPSAnYXV0b0Fzc2lnbk5ld1Jvb20nO1xuICBjdXJyZW50Um9vbTogQnJlYWtvdXRQYXJ0aWNpcGFudFtdIHwgbnVsbCA9IG51bGw7XG4gIGVkaXRSb29tTW9kYWxWaXNpYmxlID0gZmFsc2U7XG5cbiAgc3RhcnRCcmVha291dEJ1dHRvblZpc2libGUgPSBmYWxzZTtcbiAgc3RvcEJyZWFrb3V0QnV0dG9uVmlzaWJsZSA9IGZhbHNlO1xuXG4gIG1vZGFsV2lkdGggPSA0MDA7XG5cbiAgY2FsY3VsYXRlTW9kYWxXaWR0aCgpIHtcbiAgICBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBtb2RhbFdpZHRoID0gMC44NSAqIHNjcmVlbldpZHRoO1xuICAgIGlmIChtb2RhbFdpZHRoID4gNzAwKSB7XG4gICAgICBtb2RhbFdpZHRoID0gNzAwO1xuICAgIH1cbiAgICB0aGlzLm1vZGFsV2lkdGggPSBtb2RhbFdpZHRoO1xuICB9XG5cbiAgbW9kYWxDb250YWluZXJTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGlzcGxheTogdGhpcy5pc1Zpc2libGUgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICB0b3A6ICcwJyxcbiAgICAgIGxlZnQ6ICcwJyxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3JnYmEoMCwgMCwgMCwgMC41KScsXG4gICAgICB6SW5kZXg6ICc5OTknLFxuICAgIH07XG4gIH1cblxuICBtb2RhbENvbnRlbnRTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmJhY2tncm91bmRDb2xvcixcbiAgICAgIGJvcmRlclJhZGl1czogJzEwcHgnLFxuICAgICAgcGFkZGluZzogJzEwcHgnLFxuICAgICAgd2lkdGg6IGAke3RoaXMubW9kYWxXaWR0aH1weGAsXG4gICAgICBtYXhIZWlnaHQ6ICc3NSUnLFxuICAgICAgb3ZlcmZsb3dYOiAnaGlkZGVuJyxcbiAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICB0b3A6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ3RvcCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgYm90dG9tOiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdib3R0b20nKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICAgIGxlZnQ6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ0xlZnQnKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICAgIHJpZ2h0OiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdSaWdodCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgIH07XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ2lzVmlzaWJsZSddICYmIHRoaXMuaXNWaXNpYmxlKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVCcmVha291dFJvb21zKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jYWxjdWxhdGVNb2RhbFdpZHRoKCk7XG4gIH1cblxuICBpbml0aWFsaXplQnJlYWtvdXRSb29tcyA9ICgpID0+IHtcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB0aGlzLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgIGNvbnN0IGZpbHRlcmVkUGFydGljaXBhbnRzID0gdGhpcy5wYXJhbWV0ZXJzLnBhcnRpY2lwYW50cy5maWx0ZXIoXG4gICAgICAocGFydGljaXBhbnQ6IGFueSkgPT4gcGFydGljaXBhbnQuaXNsZXZlbCAhPSAnMicsXG4gICAgKTtcbiAgICB0aGlzLnBhcnRpY2lwYW50c1JlZiA9IGZpbHRlcmVkUGFydGljaXBhbnRzO1xuICAgIHRoaXMuYnJlYWtvdXRSb29tc1JlZiA9XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuYnJlYWtvdXRSb29tcyAmJiB0aGlzLnBhcmFtZXRlcnMuYnJlYWtvdXRSb29tcy5sZW5ndGggPiAwXG4gICAgICAgID8gWy4uLnRoaXMucGFyYW1ldGVycy5icmVha291dFJvb21zXVxuICAgICAgICA6IFtdO1xuICAgIHRoaXMuY2hlY2tDYW5TdGFydEJyZWFrb3V0KCk7XG4gIH07XG5cbiAgaGFuZGxlUmFuZG9tQXNzaWduKCkge1xuICAgIGNvbnN0IG51bVJvb21zSW50ID0gcGFyc2VJbnQodGhpcy5udW1Sb29tcyk7XG4gICAgaWYgKCFudW1Sb29tc0ludCB8fCBudW1Sb29tc0ludCA8PSAwKSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oe1xuICAgICAgICBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgdmFsaWQgbnVtYmVyIG9mIHJvb21zJyxcbiAgICAgICAgdHlwZTogJ2RhbmdlcicsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdCcmVha291dFJvb21zOiBCcmVha291dFBhcnRpY2lwYW50W11bXSA9IEFycmF5LmZyb20oeyBsZW5ndGg6IG51bVJvb21zSW50IH0sICgpID0+IFtdKTtcblxuICAgIGNvbnN0IHNodWZmbGVkUGFydGljaXBhbnRzID0gWy4uLnRoaXMucGFydGljaXBhbnRzUmVmXS5zb3J0KCgpID0+IDAuNSAtIE1hdGgucmFuZG9tKCkpO1xuXG4gICAgc2h1ZmZsZWRQYXJ0aWNpcGFudHMuZm9yRWFjaCgocGFydGljaXBhbnQsIGluZGV4KSA9PiB7XG4gICAgICBjb25zdCByb29tSW5kZXggPSBpbmRleCAlIG51bVJvb21zSW50O1xuICAgICAgaWYgKG5ld0JyZWFrb3V0Um9vbXNbcm9vbUluZGV4XS5sZW5ndGggPCB0aGlzLnBhcmFtZXRlcnMuaXRlbVBhZ2VMaW1pdCkge1xuICAgICAgICBjb25zdCBwYXJ0aWNpcGFudF86IEJyZWFrb3V0UGFydGljaXBhbnQgPSB7IG5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsIGJyZWFrUm9vbTogcm9vbUluZGV4IH07XG4gICAgICAgIG5ld0JyZWFrb3V0Um9vbXNbcm9vbUluZGV4XS5wdXNoKHBhcnRpY2lwYW50Xyk7XG4gICAgICAgIHBhcnRpY2lwYW50WydicmVha1Jvb20nXSA9IHJvb21JbmRleDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtUm9vbXNJbnQ7IGkrKykge1xuICAgICAgICAgIGlmIChuZXdCcmVha291dFJvb21zW2ldLmxlbmd0aCA8IHRoaXMucGFyYW1ldGVycy5pdGVtUGFnZUxpbWl0KSB7XG4gICAgICAgICAgICBuZXdCcmVha291dFJvb21zW2ldLnB1c2gocGFydGljaXBhbnQpO1xuICAgICAgICAgICAgcGFydGljaXBhbnRbJ2JyZWFrUm9vbSddID0gaTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMuYnJlYWtvdXRSb29tc1JlZiA9IG5ld0JyZWFrb3V0Um9vbXM7XG4gICAgdGhpcy5jaGVja0NhblN0YXJ0QnJlYWtvdXQoKTtcbiAgfVxuXG4gIGhhbmRsZU1hbnVhbEFzc2lnbigpIHtcbiAgICBjb25zdCBudW1Sb29tc0ludCA9IHBhcnNlSW50KHRoaXMubnVtUm9vbXMpO1xuICAgIGlmICghbnVtUm9vbXNJbnQgfHwgbnVtUm9vbXNJbnQgPD0gMCkge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgbWVzc2FnZTogJ1BsZWFzZSBlbnRlciBhIHZhbGlkIG51bWJlciBvZiByb29tcycsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5icmVha291dFJvb21zUmVmID0gQXJyYXkuZnJvbSh7IGxlbmd0aDogbnVtUm9vbXNJbnQgfSwgKCkgPT4gW10pO1xuICAgIHRoaXMucGFyYW1ldGVycy51cGRhdGVDYW5TdGFydEJyZWFrb3V0KGZhbHNlKTtcbiAgICB0aGlzLmNoZWNrQ2FuU3RhcnRCcmVha291dCgpO1xuICB9XG5cbiAgaGFuZGxlQWRkUm9vbSgpIHtcbiAgICB0aGlzLmJyZWFrb3V0Um9vbXNSZWYgPSBbLi4udGhpcy5icmVha291dFJvb21zUmVmLCBbXV07XG4gICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUNhblN0YXJ0QnJlYWtvdXQoZmFsc2UpO1xuICAgIHRoaXMuY2hlY2tDYW5TdGFydEJyZWFrb3V0KCk7XG4gIH1cblxuICBoYW5kbGVTYXZlUm9vbXMoKSB7XG4gICAgaWYgKHRoaXMudmFsaWRhdGVSb29tcygpKSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlQnJlYWtvdXRSb29tcyh0aGlzLmJyZWFrb3V0Um9vbXNSZWYpO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUNhblN0YXJ0QnJlYWtvdXQodHJ1ZSk7XG4gICAgICB0aGlzLmNoZWNrQ2FuU3RhcnRCcmVha291dCgpO1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHsgbWVzc2FnZTogJ1Jvb21zIHNhdmVkIHN1Y2Nlc3NmdWxseScsIHR5cGU6ICdzdWNjZXNzJyB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHsgbWVzc2FnZTogJ1Jvb21zIHZhbGlkYXRpb24gZmFpbGVkJywgdHlwZTogJ2RhbmdlcicgfSk7XG4gICAgfVxuICB9XG5cbiAgdmFsaWRhdGVSb29tcygpIHtcbiAgICBpZiAodGhpcy5icmVha291dFJvb21zUmVmLmxlbmd0aCA9PSAwKSB7XG4gICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiAnVGhlcmUgbXVzdCBiZSBhdCBsZWFzdCBvbmUgcm9vbScsIHR5cGU6ICdkYW5nZXInIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZvciAobGV0IHJvb20gb2YgdGhpcy5icmVha291dFJvb21zUmVmKSB7XG4gICAgICBpZiAocm9vbS5sZW5ndGggPT0gMCkge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiAnUm9vbXMgbXVzdCBub3QgYmUgZW1wdHknLCB0eXBlOiAnZGFuZ2VyJyB9KTtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJ0aWNpcGFudE5hbWVzID0gcm9vbS5tYXAoKHApID0+IHAubmFtZSk7XG4gICAgICBjb25zdCB1bmlxdWVOYW1lcyA9IG5ldyBTZXQocGFydGljaXBhbnROYW1lcyk7XG4gICAgICBpZiAocGFydGljaXBhbnROYW1lcy5sZW5ndGggIT0gdW5pcXVlTmFtZXMuc2l6ZSkge1xuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oe1xuICAgICAgICAgIG1lc3NhZ2U6ICdEdXBsaWNhdGUgcGFydGljaXBhbnQgbmFtZXMgaW4gYSByb29tJyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJvb20ubGVuZ3RoID4gdGhpcy5wYXJhbWV0ZXJzLml0ZW1QYWdlTGltaXQpIHtcbiAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHtcbiAgICAgICAgICBtZXNzYWdlOiAnQSByb29tIGV4Y2VlZHMgdGhlIHBhcnRpY2lwYW50IGxpbWl0JyxcbiAgICAgICAgICB0eXBlOiAnZGFuZ2VyJyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGNoZWNrQ2FuU3RhcnRCcmVha291dCA9ICgpID0+IHtcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB0aGlzLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuY2FuU3RhcnRCcmVha291dCkge1xuICAgICAgdGhpcy5zdGFydEJyZWFrb3V0QnV0dG9uVmlzaWJsZSA9IHRydWU7XG4gICAgICB0aGlzLnN0b3BCcmVha291dEJ1dHRvblZpc2libGUgPVxuICAgICAgICB0aGlzLnBhcmFtZXRlcnMuYnJlYWtPdXRSb29tU3RhcnRlZCAmJiAhdGhpcy5wYXJhbWV0ZXJzLmJyZWFrT3V0Um9vbUVuZGVkO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnN0YXJ0QnJlYWtvdXRCdXR0b25WaXNpYmxlID0gZmFsc2U7XG4gICAgICB0aGlzLnN0b3BCcmVha291dEJ1dHRvblZpc2libGUgPSBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlU3RhcnRCcmVha291dCA9ICgpID0+IHtcbiAgICB0aGlzLnBhcmFtZXRlcnMgPSB0aGlzLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuc2hhcmVTY3JlZW5TdGFydGVkIHx8IHRoaXMucGFyYW1ldGVycy5zaGFyZWQpIHtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zaG93QWxlcnQ/Lih7XG4gICAgICAgIG1lc3NhZ2U6ICdZb3UgY2Fubm90IHN0YXJ0IGJyZWFrb3V0IHJvb21zIHdoaWxlIHNjcmVlbiBzaGFyaW5nIGlzIGFjdGl2ZScsXG4gICAgICAgIHR5cGU6ICdkYW5nZXInLFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucGFyYW1ldGVycy5jYW5TdGFydEJyZWFrb3V0KSB7XG4gICAgICBjb25zdCBlbWl0TmFtZSA9XG4gICAgICAgIHRoaXMucGFyYW1ldGVycy5icmVha091dFJvb21TdGFydGVkICYmICF0aGlzLnBhcmFtZXRlcnMuYnJlYWtPdXRSb29tRW5kZWRcbiAgICAgICAgICA/ICd1cGRhdGVCcmVha291dCdcbiAgICAgICAgICA6ICdzdGFydEJyZWFrb3V0JztcbiAgICAgIGNvbnN0IGZpbHRlcmVkQnJlYWtvdXRSb29tcyA9IHRoaXMuYnJlYWtvdXRSb29tc1JlZi5tYXAoKHJvb20pID0+XG4gICAgICAgIHJvb20ubWFwKCh7IG5hbWUsIGJyZWFrUm9vbSB9KSA9PiAoeyBuYW1lLCBicmVha1Jvb20gfSkpLFxuICAgICAgKTtcbiAgICAgIHRoaXMucGFyYW1ldGVycy5zb2NrZXQuZW1pdChcbiAgICAgICAgZW1pdE5hbWUsXG4gICAgICAgIHtcbiAgICAgICAgICBicmVha291dFJvb21zOiBmaWx0ZXJlZEJyZWFrb3V0Um9vbXMsXG4gICAgICAgICAgbmV3UGFydGljaXBhbnRBY3Rpb246IHRoaXMubmV3UGFydGljaXBhbnRBY3Rpb24sXG4gICAgICAgICAgcm9vbU5hbWU6IHRoaXMucGFyYW1ldGVycy5yb29tTmFtZSxcbiAgICAgICAgfSxcbiAgICAgICAgKHJlc3BvbnNlOiB7IHN1Y2Nlc3M6IGFueTsgcmVhc29uOiBhbnkgfSkgPT4ge1xuICAgICAgICAgIGlmIChyZXNwb25zZS5zdWNjZXNzKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiAnQnJlYWtvdXQgcm9vbXMgYWN0aXZlJywgdHlwZTogJ3N1Y2Nlc3MnIH0pO1xuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUJyZWFrT3V0Um9vbVN0YXJ0ZWQodHJ1ZSk7XG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlQnJlYWtPdXRSb29tRW5kZWQoZmFsc2UpO1xuXG4gICAgICAgICAgICB0aGlzLm9uQnJlYWtvdXRSb29tc0Nsb3NlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLm1lZXRpbmdEaXNwbGF5VHlwZSAhPSAnYWxsJykge1xuICAgICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlKCdhbGwnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHsgbWVzc2FnZTogcmVzcG9uc2UucmVhc29uLCB0eXBlOiAnZGFuZ2VyJyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICApO1xuICAgIH1cbiAgfTtcblxuICBoYW5kbGVTdG9wQnJlYWtvdXQoKSB7XG4gICAgdGhpcy5wYXJhbWV0ZXJzLnNvY2tldC5lbWl0KFxuICAgICAgJ3N0b3BCcmVha291dCcsXG4gICAgICB7IHJvb21OYW1lOiB0aGlzLnBhcmFtZXRlcnMucm9vbU5hbWUgfSxcbiAgICAgIChyZXNwb25zZTogeyBzdWNjZXNzOiBhbnk7IHJlYXNvbjogYW55IH0pID0+IHtcbiAgICAgICAgaWYgKHJlc3BvbnNlLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMuc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiAnQnJlYWtvdXQgcm9vbXMgc3RvcHBlZCcsIHR5cGU6ICdzdWNjZXNzJyB9KTtcbiAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlQnJlYWtPdXRSb29tU3RhcnRlZChmYWxzZSk7XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnVwZGF0ZUJyZWFrT3V0Um9vbUVuZGVkKHRydWUpO1xuXG4gICAgICAgICAgdGhpcy5vbkJyZWFrb3V0Um9vbXNDbG9zZSgpO1xuICAgICAgICAgIGlmICh0aGlzLnBhcmFtZXRlcnMubWVldGluZ0Rpc3BsYXlUeXBlICE9IHRoaXMucGFyYW1ldGVycy5wcmV2TWVldGluZ0Rpc3BsYXlUeXBlKSB7XG4gICAgICAgICAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlTWVldGluZ0Rpc3BsYXlUeXBlKHRoaXMucGFyYW1ldGVycy5wcmV2TWVldGluZ0Rpc3BsYXlUeXBlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHsgbWVzc2FnZTogcmVzcG9uc2UucmVhc29uLCB0eXBlOiAnZGFuZ2VyJyB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICApO1xuICB9XG5cbiAgaGFuZGxlRWRpdFJvb20ocm9vbUluZGV4OiBudW1iZXIpIHtcbiAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlQ3VycmVudFJvb21JbmRleChyb29tSW5kZXgpO1xuICAgIHRoaXMuY3VycmVudFJvb20gPSB0aGlzLmJyZWFrb3V0Um9vbXNSZWZbcm9vbUluZGV4XTtcbiAgICB0aGlzLmVkaXRSb29tTW9kYWxWaXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLnBhcmFtZXRlcnMudXBkYXRlQ2FuU3RhcnRCcmVha291dChmYWxzZSk7XG4gICAgdGhpcy5jaGVja0NhblN0YXJ0QnJlYWtvdXQoKTtcbiAgfVxuXG4gIGhhbmRsZURlbGV0ZVJvb20ocm9vbUluZGV4OiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5icmVha291dFJvb21zUmVmLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IHJvb20gPSB0aGlzLmJyZWFrb3V0Um9vbXNSZWZbcm9vbUluZGV4XTtcbiAgICAgIHJvb20uZm9yRWFjaCgocGFydGljaXBhbnQpID0+IChwYXJ0aWNpcGFudC5icmVha1Jvb20gPSBudWxsKSk7XG4gICAgICBjb25zdCBuZXdCcmVha291dFJvb21zID0gWy4uLnRoaXMuYnJlYWtvdXRSb29tc1JlZl07XG4gICAgICBuZXdCcmVha291dFJvb21zLnNwbGljZShyb29tSW5kZXgsIDEpO1xuXG4gICAgICBuZXdCcmVha291dFJvb21zLmZvckVhY2goKHJvb20sIGluZGV4KSA9PiB7XG4gICAgICAgIHJvb20uZm9yRWFjaCgocGFydGljaXBhbnQpID0+IChwYXJ0aWNpcGFudC5icmVha1Jvb20gPSBpbmRleCkpO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuYnJlYWtvdXRSb29tc1JlZiA9IG5ld0JyZWFrb3V0Um9vbXM7XG4gICAgICB0aGlzLmNoZWNrQ2FuU3RhcnRCcmVha291dCgpO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUFkZFBhcnRpY2lwYW50KGV2ZW50OiB7IHJvb21JbmRleDogbnVtYmVyOyBwYXJ0aWNpcGFudDogQnJlYWtvdXRQYXJ0aWNpcGFudCB9KSB7XG4gICAgY29uc3QgeyByb29tSW5kZXgsIHBhcnRpY2lwYW50IH0gPSBldmVudDtcbiAgICBpZiAodGhpcy5icmVha291dFJvb21zUmVmW3Jvb21JbmRleF0ubGVuZ3RoIDwgdGhpcy5wYXJhbWV0ZXJzLml0ZW1QYWdlTGltaXQpIHtcbiAgICAgIGNvbnN0IG5ld0JyZWFrb3V0Um9vbXMgPSBbLi4udGhpcy5icmVha291dFJvb21zUmVmXTtcbiAgICAgIG5ld0JyZWFrb3V0Um9vbXNbcm9vbUluZGV4XS5wdXNoKHBhcnRpY2lwYW50KTtcbiAgICAgIHRoaXMuYnJlYWtvdXRSb29tc1JlZiA9IG5ld0JyZWFrb3V0Um9vbXM7XG4gICAgICBwYXJ0aWNpcGFudFsnYnJlYWtSb29tJ10gPSByb29tSW5kZXg7XG4gICAgICBpZiAodGhpcy5wYXJhbWV0ZXJzLmN1cnJlbnRSb29tSW5kZXggIT0gbnVsbCkge1xuICAgICAgICB0aGlzLmhhbmRsZUVkaXRSb29tKHRoaXMucGFyYW1ldGVycy5jdXJyZW50Um9vbUluZGV4KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5wYXJhbWV0ZXJzLnNob3dBbGVydD8uKHsgbWVzc2FnZTogJ1Jvb20gaXMgZnVsbCcsIHR5cGU6ICdkYW5nZXInIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZVJlbW92ZVBhcnRpY2lwYW50KGV2ZW50OiB7IHJvb21JbmRleDogbnVtYmVyOyBwYXJ0aWNpcGFudDogQnJlYWtvdXRQYXJ0aWNpcGFudCB9KSB7XG4gICAgY29uc3QgeyByb29tSW5kZXgsIHBhcnRpY2lwYW50IH0gPSBldmVudDtcbiAgICBjb25zdCBuZXdCcmVha291dFJvb21zID0gWy4uLnRoaXMuYnJlYWtvdXRSb29tc1JlZl07XG4gICAgbmV3QnJlYWtvdXRSb29tc1tyb29tSW5kZXhdID0gbmV3QnJlYWtvdXRSb29tc1tyb29tSW5kZXhdLmZpbHRlcigocCkgPT4gcCAhPSBwYXJ0aWNpcGFudCk7XG4gICAgdGhpcy5icmVha291dFJvb21zUmVmID0gbmV3QnJlYWtvdXRSb29tcztcbiAgICBwYXJ0aWNpcGFudFsnYnJlYWtSb29tJ10gPSBudWxsO1xuICAgIGlmICh0aGlzLnBhcmFtZXRlcnMuY3VycmVudFJvb21JbmRleCAhPSBudWxsKSB7XG4gICAgICB0aGlzLmhhbmRsZUVkaXRSb29tKHRoaXMucGFyYW1ldGVycy5jdXJyZW50Um9vbUluZGV4KTtcbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJpc1Zpc2libGVcIiBjbGFzcz1cIm1vZGFsLWNvbnRhaW5lclwiIFtuZ1N0eWxlXT1cIm1vZGFsQ29udGFpbmVyU3R5bGUoKVwiPlxyXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCIgW25nU3R5bGVdPVwibW9kYWxDb250ZW50U3R5bGUoKVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiPlxyXG4gICAgICA8aDI+QnJlYWtvdXQgUm9vbXMgPGZhLWljb24gW2ljb25dPVwiZmFEb29yT3BlblwiPjwvZmEtaWNvbj48L2gyPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiY2xvc2UtYnRuXCIgKGNsaWNrKT1cIm9uQnJlYWtvdXRSb29tc0Nsb3NlKClcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRpbWVzXCI+PC9mYS1pY29uPlxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGhyPlxyXG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICAgICAgPGxhYmVsIGZvcj1cIm51bVJvb21zXCI+TnVtYmVyIG9mIFJvb21zIDxmYS1pY29uIFtpY29uXT1cImZhVXNlcnNcIj48L2ZhLWljb24+PC9sYWJlbD5cclxuICAgICAgPGlucHV0IHR5cGU9XCJudW1iZXJcIiBjbGFzcz1cImZvcm0tY29udHJvbFwiIGlkPVwibnVtUm9vbXNcIiBbKG5nTW9kZWwpXT1cIm51bVJvb21zXCI+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiAoY2xpY2spPVwiaGFuZGxlUmFuZG9tQXNzaWduKClcIj5SYW5kb20gQXNzaWduIDxmYS1pY29uIFtpY29uXT1cImZhUmFuZG9tXCI+PC9mYS1pY29uPjwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1zZWNvbmRhcnlcIiAoY2xpY2spPVwiaGFuZGxlTWFudWFsQXNzaWduKClcIj5NYW51YWwgQXNzaWduIDxmYS1pY29uIFtpY29uXT1cImZhSGFuZFBvaW50ZXJcIj48L2ZhLWljb24+PC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXN1Y2Nlc3NcIiAoY2xpY2spPVwiaGFuZGxlQWRkUm9vbSgpXCI+QWRkIFJvb20gPGZhLWljb24gW2ljb25dPVwiZmFQbHVzXCI+PC9mYS1pY29uPjwvYnV0dG9uPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1pbmZvXCIgKGNsaWNrKT1cImhhbmRsZVNhdmVSb29tcygpXCI+U2F2ZSBSb29tcyA8ZmEtaWNvbiBbaWNvbl09XCJmYVNhdmVcIj48L2ZhLWljb24+PC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgICAgIDxsYWJlbCBmb3I9XCJuZXdQYXJ0aWNpcGFudEFjdGlvblwiPk5ldyBQYXJ0aWNpcGFudCBBY3Rpb24gPGZhLWljb24gW2ljb25dPVwiZmFVc2Vyc1wiPjwvZmEtaWNvbj48L2xhYmVsPlxyXG4gICAgICA8c2VsZWN0IGNsYXNzPVwiZm9ybS1jb250cm9sXCIgaWQ9XCJuZXdQYXJ0aWNpcGFudEFjdGlvblwiIFsobmdNb2RlbCldPVwibmV3UGFydGljaXBhbnRBY3Rpb25cIj5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYXV0b0Fzc2lnbk5ld1Jvb21cIj5BZGQgdG8gbmV3IHJvb208L29wdGlvbj5cclxuICAgICAgICA8b3B0aW9uIHZhbHVlPVwiYXV0b0Fzc2lnbkF2YWlsYWJsZVJvb21cIj5BZGQgdG8gb3BlbiByb29tPC9vcHRpb24+XHJcbiAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIm1hbnVhbEFzc2lnblwiPk5vIGFjdGlvbjwvb3B0aW9uPlxyXG4gICAgICA8L3NlbGVjdD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiAjcm9vbXNDb250YWluZXI+XHJcbiAgICAgIDxhcHAtcm9vbS1saXN0IFtyb29tc109XCJicmVha291dFJvb21zUmVmXCIgKGVkaXRSb29tKT1cImhhbmRsZUVkaXRSb29tKCRldmVudClcIiAoZGVsZXRlUm9vbSk9XCJoYW5kbGVEZWxldGVSb29tKCRldmVudClcIiAocmVtb3ZlUGFydGljaXBhbnQpPVwiaGFuZGxlUmVtb3ZlUGFydGljaXBhbnQoJGV2ZW50KVwiPjwvYXBwLXJvb20tbGlzdD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGRpdiAqbmdJZj1cInN0YXJ0QnJlYWtvdXRCdXR0b25WaXNpYmxlXCI+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgbXItMiBtYi0yXCIgKGNsaWNrKT1cImhhbmRsZVN0YXJ0QnJlYWtvdXQoKVwiPlxyXG4gICAgICAgIHt7IHBhcmFtZXRlcnMuYnJlYWtPdXRSb29tU3RhcnRlZCAmJiAhcGFyYW1ldGVycy5icmVha091dFJvb21FbmRlZCA/ICdVcGRhdGUgQnJlYWtvdXQnIDogJ1N0YXJ0IEJyZWFrb3V0JyB9fSA8ZmEtaWNvbiBbaWNvbl09XCJwYXJhbWV0ZXJzLmJyZWFrT3V0Um9vbVN0YXJ0ZWQgJiYgIXBhcmFtZXRlcnMuYnJlYWtPdXRSb29tRW5kZWQgPyBmYVN5bmNBbHQgOiBmYVBsYXlcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8ZGl2ICpuZ0lmPVwic3RvcEJyZWFrb3V0QnV0dG9uVmlzaWJsZVwiPlxyXG4gICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1kYW5nZXIgbXItMiBtYi0yXCIgKGNsaWNrKT1cImhhbmRsZVN0b3BCcmVha291dCgpXCI+XHJcbiAgICAgICAgU3RvcCBCcmVha291dCA8ZmEtaWNvbiBbaWNvbl09XCJmYVN0b3BcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbiAgPGFwcC1lZGl0LXJvb20tbW9kYWwgW2VkaXRSb29tTW9kYWxWaXNpYmxlXT1cImVkaXRSb29tTW9kYWxWaXNpYmxlXCIgW2N1cnJlbnRSb29tXT1cImN1cnJlbnRSb29tIVwiIFtwYXJ0aWNpcGFudHNSZWZdPVwicGFydGljaXBhbnRzUmVmXCIgW2N1cnJlbnRSb29tSW5kZXhdPVwicGFyYW1ldGVycy5jdXJyZW50Um9vbUluZGV4IVwiIChzZXRFZGl0Um9vbU1vZGFsVmlzaWJsZSk9XCJlZGl0Um9vbU1vZGFsVmlzaWJsZSA9ICRldmVudFwiIChhZGRQYXJ0aWNpcGFudCk9XCJoYW5kbGVBZGRQYXJ0aWNpcGFudCgkZXZlbnQpXCIgKHJlbW92ZVBhcnRpY2lwYW50KT1cImhhbmRsZVJlbW92ZVBhcnRpY2lwYW50KCRldmVudClcIj48L2FwcC1lZGl0LXJvb20tbW9kYWw+XHJcbjwvZGl2PlxyXG4iXX0=