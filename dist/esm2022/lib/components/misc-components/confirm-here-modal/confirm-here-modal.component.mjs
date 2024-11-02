import { Component, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * @component ConfirmHereModal
 * @description Displays a confirmation modal with a countdown timer, allowing users to confirm their presence or be automatically disconnected after the timer expires.
 *
 * @selector app-confirm-here-modal
 * @templateUrl ./confirm-here-modal.component.html
 * @styleUrls ./confirm-here-modal.component.css
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @example
 * ```html
 * <app-confirm-here-modal
 *   [isConfirmHereModalVisible]="true"
 *   [position]="'center'"
 *   [backgroundColor]="'#83c0e9'"
 *   [displayColor]="'#000000'"
 *   [onConfirmHereClose]="closeConfirmModal"
 *   [countdownDuration]="120"
 *   [socket]="socketInstance"
 *   [roomName]="'exampleRoom'"
 *   [member]="'exampleMember'"
 * ></app-confirm-here-modal>
 * ```
 */
export class ConfirmHereModal {
    isConfirmHereModalVisible = false;
    position = 'center';
    backgroundColor = '#83c0e9';
    displayColor = '#000000';
    onConfirmHereClose;
    countdownDuration = 120;
    socket;
    roomName;
    member;
    faSpinner = faSpinner;
    counter;
    countdownInterval;
    ngOnInit() {
        this.counter = this.countdownDuration ? this.countdownDuration : 120;
        if (this.isConfirmHereModalVisible) {
            this.startCountdown();
        }
    }
    ngOnChanges(changes) {
        if (changes['isConfirmHereModalVisible'] && changes['isConfirmHereModalVisible'].currentValue) {
            this.counter = this.countdownDuration ? this.countdownDuration : 120;
            this.startCountdown();
        }
        else {
            this.clearCountdown();
        }
    }
    ngOnDestroy() {
        this.clearCountdown();
    }
    startCountdown = () => {
        this.countdownInterval = setInterval(() => {
            this.counter--;
            if (this.counter <= 0) {
                this.clearCountdown();
                this.socket.emit('disconnectUser', {
                    member: this.member,
                    roomName: this.roomName,
                    ban: false,
                });
                this.onConfirmHereClose();
            }
        }, 1000);
    };
    clearCountdown = () => {
        if (this.countdownInterval) {
            clearInterval(this.countdownInterval);
        }
    };
    handleConfirmHere() {
        this.clearCountdown();
        this.onConfirmHereClose();
    }
    get spinnerContainerStyle() {
        return {
            marginBottom: '20px',
        };
    }
    get modalContainerStyle() {
        return {
            'background-color': this.backgroundColor || 'rgba(0, 0, 0, 0.5)',
            display: this.isConfirmHereModalVisible ? 'block' : 'none',
        };
    }
    get modalContentStyle() {
        return {
            'background-color': this.backgroundColor,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConfirmHereModal, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: ConfirmHereModal, isStandalone: true, selector: "app-confirm-here-modal", inputs: { isConfirmHereModalVisible: "isConfirmHereModalVisible", position: "position", backgroundColor: "backgroundColor", displayColor: "displayColor", onConfirmHereClose: "onConfirmHereClose", countdownDuration: "countdownDuration", socket: "socket", roomName: "roomName", member: "member" }, usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"isConfirmHereModalVisible\" [ngStyle]=\"modalContainerStyle\" class=\"modal-container\">\r\n  <div [ngStyle]=\"modalContentStyle\" class=\"modal-content\">\r\n    <div class=\"spinner\" [ngStyle]=\"spinnerContainerStyle\"></div>\r\n    <h2 style=\"font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; color: black;\">Are you still there?</h2>\r\n    <p style=\"font-size: 1rem; color: black; margin-bottom: 1.5rem;\">Please confirm if you are still present.</p>\r\n    <p style=\"font-size: 0.9rem; color: black; margin-bottom: 1rem;\">Time remaining: <strong>{{ counter }}</strong></p>\r\n    <button (click)=\"handleConfirmHere()\" style=\"background-color: #dc3545; color: white; padding: 0.5rem 1rem; border-radius: 5px; border: none; cursor: pointer; font-weight: bold; font-size: 1rem;\">\r\n      Yes\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;z-index:999}.modal-content{position:fixed;border-radius:10px;padding:10px;width:100%;max-height:100%;overflow-y:auto}\n", ".spinner{border:12px solid #f3f3f3;border-top:12px solid black;border-radius:50%;width:50px;height:50px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.modal-content{display:flex;flex-direction:column;align-items:center}.loading-text{margin-top:10px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConfirmHereModal, decorators: [{
            type: Component,
            args: [{ selector: 'app-confirm-here-modal', standalone: true, imports: [CommonModule, FontAwesomeModule], template: "<div *ngIf=\"isConfirmHereModalVisible\" [ngStyle]=\"modalContainerStyle\" class=\"modal-container\">\r\n  <div [ngStyle]=\"modalContentStyle\" class=\"modal-content\">\r\n    <div class=\"spinner\" [ngStyle]=\"spinnerContainerStyle\"></div>\r\n    <h2 style=\"font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; color: black;\">Are you still there?</h2>\r\n    <p style=\"font-size: 1rem; color: black; margin-bottom: 1.5rem;\">Please confirm if you are still present.</p>\r\n    <p style=\"font-size: 0.9rem; color: black; margin-bottom: 1rem;\">Time remaining: <strong>{{ counter }}</strong></p>\r\n    <button (click)=\"handleConfirmHere()\" style=\"background-color: #dc3545; color: white; padding: 0.5rem 1rem; border-radius: 5px; border: none; cursor: pointer; font-weight: bold; font-size: 1rem;\">\r\n      Yes\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;z-index:999}.modal-content{position:fixed;border-radius:10px;padding:10px;width:100%;max-height:100%;overflow-y:auto}\n", ".spinner{border:12px solid #f3f3f3;border-top:12px solid black;border-radius:50%;width:50px;height:50px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.modal-content{display:flex;flex-direction:column;align-items:center}.loading-text{margin-top:10px}\n"] }]
        }], propDecorators: { isConfirmHereModalVisible: [{
                type: Input
            }], position: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], displayColor: [{
                type: Input
            }], onConfirmHereClose: [{
                type: Input
            }], countdownDuration: [{
                type: Input
            }], socket: [{
                type: Input
            }], roomName: [{
                type: Input
            }], member: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1oZXJlLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21pc2MtY29tcG9uZW50cy9jb25maXJtLWhlcmUtbW9kYWwvY29uZmlybS1oZXJlLW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21pc2MtY29tcG9uZW50cy9jb25maXJtLWhlcmUtbW9kYWwvY29uZmlybS1oZXJlLW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7QUFpQnJFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFxQ0gsTUFBTSxPQUFPLGdCQUFnQjtJQUNsQix5QkFBeUIsR0FBRyxLQUFLLENBQUM7SUFDbEMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUNwQixlQUFlLEdBQUcsU0FBUyxDQUFDO0lBQzVCLFlBQVksR0FBRyxTQUFTLENBQUM7SUFDekIsa0JBQWtCLENBQWM7SUFDaEMsaUJBQWlCLEdBQVksR0FBRyxDQUFDO0lBQ2pDLE1BQU0sQ0FBVTtJQUNoQixRQUFRLENBQVU7SUFDbEIsTUFBTSxDQUFVO0lBRXpCLFNBQVMsR0FBRyxTQUFTLENBQUM7SUFDdEIsT0FBTyxDQUFVO0lBQ2pCLGlCQUFpQixDQUFNO0lBRXZCLFFBQVE7UUFDTixJQUFJ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QUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLGlCQUFpQjtzQkFBekIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSwgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmFTcGlubmVyIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1IZXJlTW9kYWxPcHRpb25zIHtcbiAgaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZTogYm9vbGVhbjtcbiAgcG9zaXRpb246IHN0cmluZztcbiAgYmFja2dyb3VuZENvbG9yOiBzdHJpbmc7XG4gIGRpc3BsYXlDb2xvcjogc3RyaW5nO1xuICBvbkNvbmZpcm1IZXJlQ2xvc2U6ICgpID0+IHZvaWQ7XG4gIHNvY2tldDogU29ja2V0O1xuICByb29tTmFtZTogc3RyaW5nO1xuICBtZW1iZXI6IHN0cmluZztcbiAgY291bnRkb3duRHVyYXRpb24/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIENvbmZpcm1IZXJlTW9kYWxUeXBlID0gKG9wdGlvbnM6IENvbmZpcm1IZXJlTW9kYWxPcHRpb25zKSA9PiB2b2lkO1xuXG4vKipcbiAqIEBjb21wb25lbnQgQ29uZmlybUhlcmVNb2RhbFxuICogQGRlc2NyaXB0aW9uIERpc3BsYXlzIGEgY29uZmlybWF0aW9uIG1vZGFsIHdpdGggYSBjb3VudGRvd24gdGltZXIsIGFsbG93aW5nIHVzZXJzIHRvIGNvbmZpcm0gdGhlaXIgcHJlc2VuY2Ugb3IgYmUgYXV0b21hdGljYWxseSBkaXNjb25uZWN0ZWQgYWZ0ZXIgdGhlIHRpbWVyIGV4cGlyZXMuXG4gKlxuICogQHNlbGVjdG9yIGFwcC1jb25maXJtLWhlcmUtbW9kYWxcbiAqIEB0ZW1wbGF0ZVVybCAuL2NvbmZpcm0taGVyZS1tb2RhbC5jb21wb25lbnQuaHRtbFxuICogQHN0eWxlVXJscyAuL2NvbmZpcm0taGVyZS1tb2RhbC5jb21wb25lbnQuY3NzXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZV1cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1jb25maXJtLWhlcmUtbW9kYWxcbiAqICAgW2lzQ29uZmlybUhlcmVNb2RhbFZpc2libGVdPVwidHJ1ZVwiXG4gKiAgIFtwb3NpdGlvbl09XCInY2VudGVyJ1wiXG4gKiAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJyM4M2MwZTknXCJcbiAqICAgW2Rpc3BsYXlDb2xvcl09XCInIzAwMDAwMCdcIlxuICogICBbb25Db25maXJtSGVyZUNsb3NlXT1cImNsb3NlQ29uZmlybU1vZGFsXCJcbiAqICAgW2NvdW50ZG93bkR1cmF0aW9uXT1cIjEyMFwiXG4gKiAgIFtzb2NrZXRdPVwic29ja2V0SW5zdGFuY2VcIlxuICogICBbcm9vbU5hbWVdPVwiJ2V4YW1wbGVSb29tJ1wiXG4gKiAgIFttZW1iZXJdPVwiJ2V4YW1wbGVNZW1iZXInXCJcbiAqID48L2FwcC1jb25maXJtLWhlcmUtbW9kYWw+XG4gKiBgYGBcbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtY29uZmlybS1oZXJlLW1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpcm0taGVyZS1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbmZpcm0taGVyZS1tb2RhbC5jb21wb25lbnQuY3NzJ10sXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXSxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLnNwaW5uZXIge1xuICAgICAgICBib3JkZXI6IDEycHggc29saWQgI2YzZjNmMzsgLyogTGlnaHQgZ3JleSAqL1xuICAgICAgICBib3JkZXItdG9wOiAxMnB4IHNvbGlkIGJsYWNrOyAvKiBCbGFjayAqL1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgIGFuaW1hdGlvbjogc3BpbiAycyBsaW5lYXIgaW5maW5pdGU7XG4gICAgICB9XG4gICAgICBAa2V5ZnJhbWVzIHNwaW4ge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLm1vZGFsLWNvbnRlbnQge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgfVxuICAgICAgLmxvYWRpbmctdGV4dCB7XG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICB9XG4gICAgYCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlybUhlcmVNb2RhbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBwb3NpdGlvbiA9ICdjZW50ZXInO1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3IgPSAnIzgzYzBlOSc7XG4gIEBJbnB1dCgpIGRpc3BsYXlDb2xvciA9ICcjMDAwMDAwJztcbiAgQElucHV0KCkgb25Db25maXJtSGVyZUNsb3NlITogKCkgPT4gdm9pZDtcbiAgQElucHV0KCkgY291bnRkb3duRHVyYXRpb24/OiBudW1iZXIgPSAxMjA7XG4gIEBJbnB1dCgpIHNvY2tldCE6IFNvY2tldDtcbiAgQElucHV0KCkgcm9vbU5hbWUhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1lbWJlciE6IHN0cmluZztcblxuICBmYVNwaW5uZXIgPSBmYVNwaW5uZXI7XG4gIGNvdW50ZXIhOiBudW1iZXI7XG4gIGNvdW50ZG93bkludGVydmFsOiBhbnk7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb3VudGVyID0gdGhpcy5jb3VudGRvd25EdXJhdGlvbiA/IHRoaXMuY291bnRkb3duRHVyYXRpb24gOiAxMjA7XG4gICAgaWYgKHRoaXMuaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZSkge1xuICAgICAgdGhpcy5zdGFydENvdW50ZG93bigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1snaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZSddICYmIGNoYW5nZXNbJ2lzQ29uZmlybUhlcmVNb2RhbFZpc2libGUnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMuY291bnRlciA9IHRoaXMuY291bnRkb3duRHVyYXRpb24gPyB0aGlzLmNvdW50ZG93bkR1cmF0aW9uIDogMTIwO1xuICAgICAgdGhpcy5zdGFydENvdW50ZG93bigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsZWFyQ291bnRkb3duKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbGVhckNvdW50ZG93bigpO1xuICB9XG5cbiAgc3RhcnRDb3VudGRvd24gPSAoKSA9PiB7XG4gICAgdGhpcy5jb3VudGRvd25JbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMuY291bnRlci0tO1xuICAgICAgaWYgKHRoaXMuY291bnRlciA8PSAwKSB7XG4gICAgICAgIHRoaXMuY2xlYXJDb3VudGRvd24oKTtcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnZGlzY29ubmVjdFVzZXInLCB7XG4gICAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlcixcbiAgICAgICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZSxcbiAgICAgICAgICBiYW46IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbkNvbmZpcm1IZXJlQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfTtcblxuICBjbGVhckNvdW50ZG93biA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5jb3VudGRvd25JbnRlcnZhbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmNvdW50ZG93bkludGVydmFsKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ29uZmlybUhlcmUoKSB7XG4gICAgdGhpcy5jbGVhckNvdW50ZG93bigpO1xuICAgIHRoaXMub25Db25maXJtSGVyZUNsb3NlKCk7XG4gIH1cblxuICBnZXQgc3Bpbm5lckNvbnRhaW5lclN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtYXJnaW5Cb3R0b206ICcyMHB4JyxcbiAgICB9O1xuICB9XG5cbiAgZ2V0IG1vZGFsQ29udGFpbmVyU3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdGhpcy5iYWNrZ3JvdW5kQ29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgMC41KScsXG4gICAgICBkaXNwbGF5OiB0aGlzLmlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgIH07XG4gIH1cblxuICBnZXQgbW9kYWxDb250ZW50U3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICB0b3A6ICc1MCUnLFxuICAgICAgbGVmdDogJzUwJScsXG4gICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknLFxuICAgIH07XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJpc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlXCIgW25nU3R5bGVdPVwibW9kYWxDb250YWluZXJTdHlsZVwiIGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCI+XHJcbiAgPGRpdiBbbmdTdHlsZV09XCJtb2RhbENvbnRlbnRTdHlsZVwiIGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInNwaW5uZXJcIiBbbmdTdHlsZV09XCJzcGlubmVyQ29udGFpbmVyU3R5bGVcIj48L2Rpdj5cclxuICAgIDxoMiBzdHlsZT1cImZvbnQtc2l6ZTogMS41cmVtOyBmb250LXdlaWdodDogYm9sZDsgbWFyZ2luLWJvdHRvbTogMXJlbTsgY29sb3I6IGJsYWNrO1wiPkFyZSB5b3Ugc3RpbGwgdGhlcmU/PC9oMj5cclxuICAgIDxwIHN0eWxlPVwiZm9udC1zaXplOiAxcmVtOyBjb2xvcjogYmxhY2s7IG1hcmdpbi1ib3R0b206IDEuNXJlbTtcIj5QbGVhc2UgY29uZmlybSBpZiB5b3UgYXJlIHN0aWxsIHByZXNlbnQuPC9wPlxyXG4gICAgPHAgc3R5bGU9XCJmb250LXNpemU6IDAuOXJlbTsgY29sb3I6IGJsYWNrOyBtYXJnaW4tYm90dG9tOiAxcmVtO1wiPlRpbWUgcmVtYWluaW5nOiA8c3Ryb25nPnt7IGNvdW50ZXIgfX08L3N0cm9uZz48L3A+XHJcbiAgICA8YnV0dG9uIChjbGljayk9XCJoYW5kbGVDb25maXJtSGVyZSgpXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjZGMzNTQ1OyBjb2xvcjogd2hpdGU7IHBhZGRpbmc6IDAuNXJlbSAxcmVtOyBib3JkZXItcmFkaXVzOiA1cHg7IGJvcmRlcjogbm9uZTsgY3Vyc29yOiBwb2ludGVyOyBmb250LXdlaWdodDogYm9sZDsgZm9udC1zaXplOiAxcmVtO1wiPlxyXG4gICAgICBZZXNcclxuICAgIDwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19