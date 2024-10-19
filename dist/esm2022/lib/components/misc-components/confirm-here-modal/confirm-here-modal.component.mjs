import { Component, Input } from '@angular/core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Component representing a confirmation modal with a countdown timer.
 *
 * @selector app-confirm-here-modal
 * @templateUrl ./confirm-here-modal.component.html
 * @styleUrls ./confirm-here-modal.component.css
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @styles
 * - .spinner: Styles for the loading spinner.
 * - @keyframes spin: Keyframes for spinner animation.
 * - .modal-content: Styles for the modal content container.
 * - .loading-text: Styles for the loading text.
 *
 * @class ConfirmHereModal
 * @implements OnInit, OnDestroy
 *
 * @property {boolean} isConfirmHereModalVisible - Determines if the modal is visible.
 * @property {string} position - Position of the modal.
 * @property {string} backgroundColor - Background color of the modal.
 * @property {string} displayColor - Display color of the modal.
 * @property {Function} onConfirmHereClose - Callback function to execute when the modal is closed.
 * @property {number} [countdownDuration=120] - Duration of the countdown in seconds.
 * @property {Socket} socket - Socket instance for communication.
 * @property {string} roomName - Name of the room for socket communication.
 * @property {string} member - Member identifier for socket communication.
 * @property {IconDefinition} faSpinner - FontAwesome spinner icon.
 * @property {number} counter - Countdown counter.
 * @property {any} countdownInterval - Interval ID for the countdown timer.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @method ngOnDestroy - Lifecycle hook that is called just before the component is destroyed.
 * @method startCountdown - Starts the countdown timer.
 * @method clearCountdown - Clears the countdown timer.
 * @method handleConfirmHere - Handles the confirmation action and closes the modal.
 *
 * @getter spinnerContainerStyle - Returns the style object for the spinner container.
 * @getter modalContainerStyle - Returns the style object for the modal container.
 * @getter modalContentStyle - Returns the style object for the modal content.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1oZXJlLW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21pc2MtY29tcG9uZW50cy9jb25maXJtLWhlcmUtbW9kYWwvY29uZmlybS1oZXJlLW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21pc2MtY29tcG9uZW50cy9jb25maXJtLWhlcmUtbW9kYWwvY29uZmlybS1oZXJlLW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7QUFpQnJFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlDRztBQW9DSCxNQUFNLE9BQU8sZ0JBQWdCO0lBQ2xCLHlCQUF5QixHQUFHLEtBQUssQ0FBQztJQUNsQyxRQUFRLEdBQUcsUUFBUSxDQUFDO0lBQ3BCLGVBQWUsR0FBRyxTQUFTLENBQUM7SUFDNUIsWUFBWSxHQUFHLFNBQVMsQ0FBQztJQUN6QixrQkFBa0IsQ0FBYztJQUNoQyxpQkFBaUIsR0FBWSxHQUFHLENBQUM7SUFDakMsTUFBTSxDQUFVO0lBQ2hCLFFBQVEsQ0FBVTtJQUNsQixNQUFNLENBQVU7SUFFekIsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUN0QixPQUFPLENBQVU7SUFDakIsaUJBQWlCLENBQU07SUFFdkIsUUFBUTtRQUNOLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztRQUNyRSxJQUFJLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUFJLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxJQUFJLE9BQU8sQ0FBQywyQkFBMkIsQ0FBQyxDQUFDLFlBQVksRUFBRSxDQUFDO1lBQzlGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQztZQUNyRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsQ0FBQztJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxjQUFjLEdBQUcsR0FBRyxFQUFFO1FBQ3BCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxXQUFXLENBQUMsR0FBRyxFQUFFO1lBQ3hDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNmLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDakMsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO29CQUNuQixRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7b0JBQ3ZCLEdBQUcsRUFBRSxLQUFLO2lCQUNYLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztZQUM1QixDQUFDO1FBQ0gsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ1gsQ0FBQyxDQUFDO0lBRUYsY0FBYyxHQUFHLEdBQUcsRUFBRTtRQUNwQixJQUFJLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNCLGFBQWEsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQUN4QyxDQUFDO0lBQ0gsQ0FBQyxDQUFDO0lBRUYsaUJBQWlCO1FBQ2YsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFRCxJQUFJLHFCQUFxQjtRQUN2QixPQUFPO1lBQ0wsWUFBWSxFQUFFLE1BQU07U0FDckIsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJLG1CQUFtQjtRQUNyQixPQUFPO1lBQ0wsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGVBQWUsSUFBSSxvQkFBb0I7WUFDaEUsT0FBTyxFQUFFLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNO1NBQzNELENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTztZQUNMLGtCQUFrQixFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3hDLEdBQUcsRUFBRSxLQUFLO1lBQ1YsSUFBSSxFQUFFLEtBQUs7WUFDWCxTQUFTLEVBQUUsdUJBQXVCO1NBQ25DLENBQUM7SUFDSixDQUFDO3VHQWpGVSxnQkFBZ0I7MkZBQWhCLGdCQUFnQiwrWUNqRzdCLHUyQkFXQSwyaUJEd0RZLFlBQVksdU5BQUUsaUJBQWlCOzsyRkE4QjlCLGdCQUFnQjtrQkFuQzVCLFNBQVM7K0JBQ0Usd0JBQXdCLGNBR3RCLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQzs4QkErQmpDLHlCQUF5QjtzQkFBakMsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYVNwaW5uZXIgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybUhlcmVNb2RhbE9wdGlvbnMge1xuICBpc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlOiBib29sZWFuO1xuICBwb3NpdGlvbjogc3RyaW5nO1xuICBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcbiAgZGlzcGxheUNvbG9yOiBzdHJpbmc7XG4gIG9uQ29uZmlybUhlcmVDbG9zZTogKCkgPT4gdm9pZDtcbiAgc29ja2V0OiBTb2NrZXQ7XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIG1lbWJlcjogc3RyaW5nO1xuICBjb3VudGRvd25EdXJhdGlvbj86IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgQ29uZmlybUhlcmVNb2RhbFR5cGUgPSAob3B0aW9uczogQ29uZmlybUhlcmVNb2RhbE9wdGlvbnMpID0+IHZvaWQ7XG5cbi8qKlxuICogQ29tcG9uZW50IHJlcHJlc2VudGluZyBhIGNvbmZpcm1hdGlvbiBtb2RhbCB3aXRoIGEgY291bnRkb3duIHRpbWVyLlxuICpcbiAqIEBzZWxlY3RvciBhcHAtY29uZmlybS1oZXJlLW1vZGFsXG4gKiBAdGVtcGxhdGVVcmwgLi9jb25maXJtLWhlcmUtbW9kYWwuY29tcG9uZW50Lmh0bWxcbiAqIEBzdHlsZVVybHMgLi9jb25maXJtLWhlcmUtbW9kYWwuY29tcG9uZW50LmNzc1xuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQGltcG9ydHMgW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdXG4gKlxuICogQHN0eWxlc1xuICogLSAuc3Bpbm5lcjogU3R5bGVzIGZvciB0aGUgbG9hZGluZyBzcGlubmVyLlxuICogLSBAa2V5ZnJhbWVzIHNwaW46IEtleWZyYW1lcyBmb3Igc3Bpbm5lciBhbmltYXRpb24uXG4gKiAtIC5tb2RhbC1jb250ZW50OiBTdHlsZXMgZm9yIHRoZSBtb2RhbCBjb250ZW50IGNvbnRhaW5lci5cbiAqIC0gLmxvYWRpbmctdGV4dDogU3R5bGVzIGZvciB0aGUgbG9hZGluZyB0ZXh0LlxuICpcbiAqIEBjbGFzcyBDb25maXJtSGVyZU1vZGFsXG4gKiBAaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveVxuICpcbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZSAtIERldGVybWluZXMgaWYgdGhlIG1vZGFsIGlzIHZpc2libGUuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcG9zaXRpb24gLSBQb3NpdGlvbiBvZiB0aGUgbW9kYWwuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYmFja2dyb3VuZENvbG9yIC0gQmFja2dyb3VuZCBjb2xvciBvZiB0aGUgbW9kYWwuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gZGlzcGxheUNvbG9yIC0gRGlzcGxheSBjb2xvciBvZiB0aGUgbW9kYWwuXG4gKiBAcHJvcGVydHkge0Z1bmN0aW9ufSBvbkNvbmZpcm1IZXJlQ2xvc2UgLSBDYWxsYmFjayBmdW5jdGlvbiB0byBleGVjdXRlIHdoZW4gdGhlIG1vZGFsIGlzIGNsb3NlZC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBbY291bnRkb3duRHVyYXRpb249MTIwXSAtIER1cmF0aW9uIG9mIHRoZSBjb3VudGRvd24gaW4gc2Vjb25kcy5cbiAqIEBwcm9wZXJ0eSB7U29ja2V0fSBzb2NrZXQgLSBTb2NrZXQgaW5zdGFuY2UgZm9yIGNvbW11bmljYXRpb24uXG4gKiBAcHJvcGVydHkge3N0cmluZ30gcm9vbU5hbWUgLSBOYW1lIG9mIHRoZSByb29tIGZvciBzb2NrZXQgY29tbXVuaWNhdGlvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBtZW1iZXIgLSBNZW1iZXIgaWRlbnRpZmllciBmb3Igc29ja2V0IGNvbW11bmljYXRpb24uXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVNwaW5uZXIgLSBGb250QXdlc29tZSBzcGlubmVyIGljb24uXG4gKiBAcHJvcGVydHkge251bWJlcn0gY291bnRlciAtIENvdW50ZG93biBjb3VudGVyLlxuICogQHByb3BlcnR5IHthbnl9IGNvdW50ZG93bkludGVydmFsIC0gSW50ZXJ2YWwgSUQgZm9yIHRoZSBjb3VudGRvd24gdGltZXIuXG4gKlxuICogQG1ldGhvZCBuZ09uSW5pdCAtIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGRhdGEtYm91bmQgcHJvcGVydGllcyBhcmUgaW5pdGlhbGl6ZWQuXG4gKiBAbWV0aG9kIG5nT25DaGFuZ2VzIC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBjaGFuZ2VzLlxuICogQG1ldGhvZCBuZ09uRGVzdHJveSAtIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGp1c3QgYmVmb3JlIHRoZSBjb21wb25lbnQgaXMgZGVzdHJveWVkLlxuICogQG1ldGhvZCBzdGFydENvdW50ZG93biAtIFN0YXJ0cyB0aGUgY291bnRkb3duIHRpbWVyLlxuICogQG1ldGhvZCBjbGVhckNvdW50ZG93biAtIENsZWFycyB0aGUgY291bnRkb3duIHRpbWVyLlxuICogQG1ldGhvZCBoYW5kbGVDb25maXJtSGVyZSAtIEhhbmRsZXMgdGhlIGNvbmZpcm1hdGlvbiBhY3Rpb24gYW5kIGNsb3NlcyB0aGUgbW9kYWwuXG4gKlxuICogQGdldHRlciBzcGlubmVyQ29udGFpbmVyU3R5bGUgLSBSZXR1cm5zIHRoZSBzdHlsZSBvYmplY3QgZm9yIHRoZSBzcGlubmVyIGNvbnRhaW5lci5cbiAqIEBnZXR0ZXIgbW9kYWxDb250YWluZXJTdHlsZSAtIFJldHVybnMgdGhlIHN0eWxlIG9iamVjdCBmb3IgdGhlIG1vZGFsIGNvbnRhaW5lci5cbiAqIEBnZXR0ZXIgbW9kYWxDb250ZW50U3R5bGUgLSBSZXR1cm5zIHRoZSBzdHlsZSBvYmplY3QgZm9yIHRoZSBtb2RhbCBjb250ZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtY29uZmlybS1oZXJlLW1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpcm0taGVyZS1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbmZpcm0taGVyZS1tb2RhbC5jb21wb25lbnQuY3NzJ10sXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXSxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLnNwaW5uZXIge1xuICAgICAgICBib3JkZXI6IDEycHggc29saWQgI2YzZjNmMzsgLyogTGlnaHQgZ3JleSAqL1xuICAgICAgICBib3JkZXItdG9wOiAxMnB4IHNvbGlkIGJsYWNrOyAvKiBCbGFjayAqL1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgIGFuaW1hdGlvbjogc3BpbiAycyBsaW5lYXIgaW5maW5pdGU7XG4gICAgICB9XG4gICAgICBAa2V5ZnJhbWVzIHNwaW4ge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLm1vZGFsLWNvbnRlbnQge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgfVxuICAgICAgLmxvYWRpbmctdGV4dCB7XG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICB9XG4gICAgYCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQ29uZmlybUhlcmVNb2RhbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBwb3NpdGlvbiA9ICdjZW50ZXInO1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3IgPSAnIzgzYzBlOSc7XG4gIEBJbnB1dCgpIGRpc3BsYXlDb2xvciA9ICcjMDAwMDAwJztcbiAgQElucHV0KCkgb25Db25maXJtSGVyZUNsb3NlITogKCkgPT4gdm9pZDtcbiAgQElucHV0KCkgY291bnRkb3duRHVyYXRpb24/OiBudW1iZXIgPSAxMjA7XG4gIEBJbnB1dCgpIHNvY2tldCE6IFNvY2tldDtcbiAgQElucHV0KCkgcm9vbU5hbWUhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG1lbWJlciE6IHN0cmluZztcblxuICBmYVNwaW5uZXIgPSBmYVNwaW5uZXI7XG4gIGNvdW50ZXIhOiBudW1iZXI7XG4gIGNvdW50ZG93bkludGVydmFsOiBhbnk7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb3VudGVyID0gdGhpcy5jb3VudGRvd25EdXJhdGlvbiA/IHRoaXMuY291bnRkb3duRHVyYXRpb24gOiAxMjA7XG4gICAgaWYgKHRoaXMuaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZSkge1xuICAgICAgdGhpcy5zdGFydENvdW50ZG93bigpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1snaXNDb25maXJtSGVyZU1vZGFsVmlzaWJsZSddICYmIGNoYW5nZXNbJ2lzQ29uZmlybUhlcmVNb2RhbFZpc2libGUnXS5jdXJyZW50VmFsdWUpIHtcbiAgICAgIHRoaXMuY291bnRlciA9IHRoaXMuY291bnRkb3duRHVyYXRpb24gPyB0aGlzLmNvdW50ZG93bkR1cmF0aW9uIDogMTIwO1xuICAgICAgdGhpcy5zdGFydENvdW50ZG93bigpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNsZWFyQ291bnRkb3duKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbGVhckNvdW50ZG93bigpO1xuICB9XG5cbiAgc3RhcnRDb3VudGRvd24gPSAoKSA9PiB7XG4gICAgdGhpcy5jb3VudGRvd25JbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIHRoaXMuY291bnRlci0tO1xuICAgICAgaWYgKHRoaXMuY291bnRlciA8PSAwKSB7XG4gICAgICAgIHRoaXMuY2xlYXJDb3VudGRvd24oKTtcbiAgICAgICAgdGhpcy5zb2NrZXQuZW1pdCgnZGlzY29ubmVjdFVzZXInLCB7XG4gICAgICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlcixcbiAgICAgICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZSxcbiAgICAgICAgICBiYW46IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5vbkNvbmZpcm1IZXJlQ2xvc2UoKTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcbiAgfTtcblxuICBjbGVhckNvdW50ZG93biA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5jb3VudGRvd25JbnRlcnZhbCkge1xuICAgICAgY2xlYXJJbnRlcnZhbCh0aGlzLmNvdW50ZG93bkludGVydmFsKTtcbiAgICB9XG4gIH07XG5cbiAgaGFuZGxlQ29uZmlybUhlcmUoKSB7XG4gICAgdGhpcy5jbGVhckNvdW50ZG93bigpO1xuICAgIHRoaXMub25Db25maXJtSGVyZUNsb3NlKCk7XG4gIH1cblxuICBnZXQgc3Bpbm5lckNvbnRhaW5lclN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtYXJnaW5Cb3R0b206ICcyMHB4JyxcbiAgICB9O1xuICB9XG5cbiAgZ2V0IG1vZGFsQ29udGFpbmVyU3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdGhpcy5iYWNrZ3JvdW5kQ29sb3IgfHwgJ3JnYmEoMCwgMCwgMCwgMC41KScsXG4gICAgICBkaXNwbGF5OiB0aGlzLmlzQ29uZmlybUhlcmVNb2RhbFZpc2libGUgPyAnYmxvY2snIDogJ25vbmUnLFxuICAgIH07XG4gIH1cblxuICBnZXQgbW9kYWxDb250ZW50U3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICB0b3A6ICc1MCUnLFxuICAgICAgbGVmdDogJzUwJScsXG4gICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGUoLTUwJSwgLTUwJSknLFxuICAgIH07XG4gIH1cbn1cbiIsIjxkaXYgKm5nSWY9XCJpc0NvbmZpcm1IZXJlTW9kYWxWaXNpYmxlXCIgW25nU3R5bGVdPVwibW9kYWxDb250YWluZXJTdHlsZVwiIGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCI+XHJcbiAgPGRpdiBbbmdTdHlsZV09XCJtb2RhbENvbnRlbnRTdHlsZVwiIGNsYXNzPVwibW9kYWwtY29udGVudFwiPlxyXG4gICAgPGRpdiBjbGFzcz1cInNwaW5uZXJcIiBbbmdTdHlsZV09XCJzcGlubmVyQ29udGFpbmVyU3R5bGVcIj48L2Rpdj5cclxuICAgIDxoMiBzdHlsZT1cImZvbnQtc2l6ZTogMS41cmVtOyBmb250LXdlaWdodDogYm9sZDsgbWFyZ2luLWJvdHRvbTogMXJlbTsgY29sb3I6IGJsYWNrO1wiPkFyZSB5b3Ugc3RpbGwgdGhlcmU/PC9oMj5cclxuICAgIDxwIHN0eWxlPVwiZm9udC1zaXplOiAxcmVtOyBjb2xvcjogYmxhY2s7IG1hcmdpbi1ib3R0b206IDEuNXJlbTtcIj5QbGVhc2UgY29uZmlybSBpZiB5b3UgYXJlIHN0aWxsIHByZXNlbnQuPC9wPlxyXG4gICAgPHAgc3R5bGU9XCJmb250LXNpemU6IDAuOXJlbTsgY29sb3I6IGJsYWNrOyBtYXJnaW4tYm90dG9tOiAxcmVtO1wiPlRpbWUgcmVtYWluaW5nOiA8c3Ryb25nPnt7IGNvdW50ZXIgfX08L3N0cm9uZz48L3A+XHJcbiAgICA8YnV0dG9uIChjbGljayk9XCJoYW5kbGVDb25maXJtSGVyZSgpXCIgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAjZGMzNTQ1OyBjb2xvcjogd2hpdGU7IHBhZGRpbmc6IDAuNXJlbSAxcmVtOyBib3JkZXItcmFkaXVzOiA1cHg7IGJvcmRlcjogbm9uZTsgY3Vyc29yOiBwb2ludGVyOyBmb250LXdlaWdodDogYm9sZDsgZm9udC1zaXplOiAxcmVtO1wiPlxyXG4gICAgICBZZXNcclxuICAgIDwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19