import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
import * as i1 from "../../../methods/exit-methods/confirm-exit.service";
import * as i2 from "@angular/common";
import * as i3 from "@fortawesome/angular-fontawesome";
/**
 * Component for displaying a confirmation modal when exiting.
 *
 * @selector app-confirm-exit-modal
 * @templateUrl ./confirm-exit-modal.component.html
 * @styleUrls ./confirm-exit-modal.component.css
 * @standalone true
 * @imports [CommonModule, FormsModule, FontAwesomeModule]
 *
 * @class ConfirmExitModal
 * @implements OnInit, OnChanges
 *
 * @property {boolean} isConfirmExitModalVisible - Visibility state of the confirmation modal.
 * @property {() => void} onConfirmExitClose - Callback function to close the modal.
 * @property {string} position - Position of the modal on the screen.
 * @property {string} backgroundColor - Background color of the modal.
 * @property {(options: ConfirmExitOptions) => void} exitEventOnConfirm - Event triggered on confirming exit.
 * @property {string} member - Member information.
 * @property {boolean} ban - Ban status.
 * @property {string} roomName - Name of the room.
 * @property {Socket} socket - Socket instance.
 * @property {string} islevel - Level information.
 * @property {IconDefinition} faTimes - FontAwesome icon for close button.
 * @property {any} modalContentStyle - Style object for modal content.
 *
 * @constructor
 * @param {ConfirmExit} confirmExitService - Service for handling exit confirmation.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @param {SimpleChanges} changes - Object of current and previous property values.
 * @method handleConfirmExit - Handles the exit confirmation event.
 */
export class ConfirmExitModal {
    confirmExitService;
    isConfirmExitModalVisible = false;
    onConfirmExitClose;
    position = 'topRight';
    backgroundColor = '#83c0e9';
    exitEventOnConfirm;
    member = '';
    ban = false;
    roomName = '';
    socket = {};
    islevel = '';
    faTimes = faTimes;
    modalContentStyle;
    constructor(confirmExitService) {
        this.confirmExitService = confirmExitService;
    }
    ngOnInit() {
        const screenWidth = window.innerWidth;
        let modalWidth = 0.8 * screenWidth;
        if (modalWidth > 350) {
            modalWidth = 350;
        }
        this.modalContentStyle = {
            backgroundColor: this.backgroundColor,
            top: this.position.includes('top') ? '10px' : 'auto',
            bottom: this.position.includes('bottom') ? '10px' : 'auto',
            left: this.position.includes('Left') ? '10px' : 'auto',
            right: this.position.includes('Right') ? '10px' : 'auto',
            width: `${modalWidth}px`,
        };
        if (!this.exitEventOnConfirm) {
            this.exitEventOnConfirm = this.confirmExitService.confirmExit.bind(this.confirmExitService);
        }
    }
    ngOnChanges(changes) {
        if (changes['isConfirmExitModalVisible'] && changes['islevel']) {
            this.islevel = changes['islevel'].currentValue;
        }
    }
    handleConfirmExit() {
        this.exitEventOnConfirm({
            socket: this.socket,
            member: this.member,
            roomName: this.roomName,
            ban: this.ban,
        });
        this.onConfirmExitClose();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConfirmExitModal, deps: [{ token: i1.ConfirmExit }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: ConfirmExitModal, isStandalone: true, selector: "app-confirm-exit-modal", inputs: { isConfirmExitModalVisible: "isConfirmExitModalVisible", onConfirmExitClose: "onConfirmExitClose", position: "position", backgroundColor: "backgroundColor", exitEventOnConfirm: "exitEventOnConfirm", member: "member", ban: "ban", roomName: "roomName", socket: "socket", islevel: "islevel" }, usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"isConfirmExitModalVisible\" class=\"modal-container\">\r\n  <div class=\"modal-content\" [ngStyle]=\"modalContentStyle\">\r\n    <div class=\"modal-header\" style=\"display: flex; justify-content: space-between;\">\r\n      <h2 class=\"modal-title\">Confirm Exit</h2>\r\n      <span class=\"close-icon\" (click)=\"onConfirmExitClose()\">\r\n        <fa-icon [icon]=\"faTimes\" size=\"lg\"></fa-icon>\r\n      </span>\r\n    </div>\r\n    <hr />\r\n    <div class=\"modal-body\">\r\n      <p class=\"confirm-exit-text\">\r\n        {{ islevel === '2' ? 'This will end the event for all. Confirm exit.' : 'Are you sure you want to exit?' }}\r\n      </p>\r\n    </div>\r\n    <hr />\r\n    <div class=\"modal-footer\">\r\n      <button class=\"cancel-button\" (click)=\"onConfirmExitClose()\">Cancel</button>\r\n      <button class=\"confirm-button\" (click)=\"handleConfirmExit()\">\r\n        {{ islevel === '2' ? 'End Event' : 'Exit' }}\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;z-index:999}.modal-content{position:fixed;background-color:#83c0e9;border-radius:10px;padding:10px;width:80%;max-width:350px;max-height:65%;overflow-y:auto}.modal-header{display:flex;justify-content:space-between}.close-icon{cursor:pointer;color:#000;font-size:large;font-weight:700;margin-right:20px}.modal-footer{display:flex;justify-content:flex-end}.cancel-button,.confirm-button{border-radius:5px;color:#fff;padding:5px 10px}.cancel-button{background-color:#000;margin-right:20px}.confirm-button{background-color:red}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i3.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ConfirmExitModal, decorators: [{
            type: Component,
            args: [{ selector: 'app-confirm-exit-modal', standalone: true, imports: [CommonModule, FormsModule, FontAwesomeModule], template: "<div *ngIf=\"isConfirmExitModalVisible\" class=\"modal-container\">\r\n  <div class=\"modal-content\" [ngStyle]=\"modalContentStyle\">\r\n    <div class=\"modal-header\" style=\"display: flex; justify-content: space-between;\">\r\n      <h2 class=\"modal-title\">Confirm Exit</h2>\r\n      <span class=\"close-icon\" (click)=\"onConfirmExitClose()\">\r\n        <fa-icon [icon]=\"faTimes\" size=\"lg\"></fa-icon>\r\n      </span>\r\n    </div>\r\n    <hr />\r\n    <div class=\"modal-body\">\r\n      <p class=\"confirm-exit-text\">\r\n        {{ islevel === '2' ? 'This will end the event for all. Confirm exit.' : 'Are you sure you want to exit?' }}\r\n      </p>\r\n    </div>\r\n    <hr />\r\n    <div class=\"modal-footer\">\r\n      <button class=\"cancel-button\" (click)=\"onConfirmExitClose()\">Cancel</button>\r\n      <button class=\"confirm-button\" (click)=\"handleConfirmExit()\">\r\n        {{ islevel === '2' ? 'End Event' : 'Exit' }}\r\n      </button>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modal-container{position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;z-index:999}.modal-content{position:fixed;background-color:#83c0e9;border-radius:10px;padding:10px;width:80%;max-width:350px;max-height:65%;overflow-y:auto}.modal-header{display:flex;justify-content:space-between}.close-icon{cursor:pointer;color:#000;font-size:large;font-weight:700;margin-right:20px}.modal-footer{display:flex;justify-content:flex-end}.cancel-button,.confirm-button{border-radius:5px;color:#fff;padding:5px 10px}.cancel-button{background-color:#000;margin-right:20px}.confirm-button{background-color:red}\n"] }]
        }], ctorParameters: () => [{ type: i1.ConfirmExit }], propDecorators: { isConfirmExitModalVisible: [{
                type: Input
            }], onConfirmExitClose: [{
                type: Input
            }], position: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], exitEventOnConfirm: [{
                type: Input
            }], member: [{
                type: Input
            }], ban: [{
                type: Input
            }], roomName: [{
                type: Input
            }], socket: [{
                type: Input
            }], islevel: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1leGl0LW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2V4aXQtY29tcG9uZW50cy9jb25maXJtLWV4aXQtbW9kYWwvY29uZmlybS1leGl0LW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2V4aXQtY29tcG9uZW50cy9jb25maXJtLWV4aXQtbW9kYWwvY29uZmlybS1leGl0LW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7QUFxQnJFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDRztBQVFILE1BQU0sT0FBTyxnQkFBZ0I7SUFnQlA7SUFmWCx5QkFBeUIsR0FBRyxLQUFLLENBQUM7SUFDbEMsa0JBQWtCLENBQWM7SUFDaEMsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUN0QixlQUFlLEdBQUcsU0FBUyxDQUFDO0lBQzVCLGtCQUFrQixDQUF5QztJQUMzRCxNQUFNLEdBQUcsRUFBRSxDQUFDO0lBQ1osR0FBRyxHQUFHLEtBQUssQ0FBQztJQUNaLFFBQVEsR0FBRyxFQUFFLENBQUM7SUFDZCxNQUFNLEdBQVcsRUFBWSxDQUFDO0lBQzlC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cywgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBmYVRpbWVzIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHtcbiAgQ29uZmlybUV4aXQsXG4gIENvbmZpcm1FeGl0T3B0aW9ucyxcbn0gZnJvbSAnLi4vLi4vLi4vbWV0aG9kcy9leGl0LW1ldGhvZHMvY29uZmlybS1leGl0LnNlcnZpY2UnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29uZmlybUV4aXRNb2RhbE9wdGlvbnMge1xuICBpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlOiBib29sZWFuO1xuICBvbkNvbmZpcm1FeGl0Q2xvc2U6ICgpID0+IHZvaWQ7XG4gIHBvc2l0aW9uPzogJ3RvcFJpZ2h0JyB8ICd0b3BMZWZ0JyB8ICdib3R0b21SaWdodCcgfCAnYm90dG9tTGVmdCc7XG4gIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgZXhpdEV2ZW50T25Db25maXJtPzogKG9wdGlvbnM6IENvbmZpcm1FeGl0T3B0aW9ucykgPT4gdm9pZDtcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIGJhbj86IGJvb2xlYW47XG4gIHJvb21OYW1lOiBzdHJpbmc7XG4gIHNvY2tldDogU29ja2V0O1xuICBpc2xldmVsOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIENvbmZpcm1FeGl0TW9kYWxUeXBlID0gKG9wdGlvbnM6IENvbmZpcm1FeGl0TW9kYWxPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcbi8qKlxuICogQ29tcG9uZW50IGZvciBkaXNwbGF5aW5nIGEgY29uZmlybWF0aW9uIG1vZGFsIHdoZW4gZXhpdGluZy5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLWNvbmZpcm0tZXhpdC1tb2RhbFxuICogQHRlbXBsYXRlVXJsIC4vY29uZmlybS1leGl0LW1vZGFsLmNvbXBvbmVudC5odG1sXG4gKiBAc3R5bGVVcmxzIC4vY29uZmlybS1leGl0LW1vZGFsLmNvbXBvbmVudC5jc3NcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZV1cbiAqXG4gKiBAY2xhc3MgQ29uZmlybUV4aXRNb2RhbFxuICogQGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXNcbiAqXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUgLSBWaXNpYmlsaXR5IHN0YXRlIG9mIHRoZSBjb25maXJtYXRpb24gbW9kYWwuXG4gKiBAcHJvcGVydHkgeygpID0+IHZvaWR9IG9uQ29uZmlybUV4aXRDbG9zZSAtIENhbGxiYWNrIGZ1bmN0aW9uIHRvIGNsb3NlIHRoZSBtb2RhbC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBwb3NpdGlvbiAtIFBvc2l0aW9uIG9mIHRoZSBtb2RhbCBvbiB0aGUgc2NyZWVuLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGJhY2tncm91bmRDb2xvciAtIEJhY2tncm91bmQgY29sb3Igb2YgdGhlIG1vZGFsLlxuICogQHByb3BlcnR5IHsob3B0aW9uczogQ29uZmlybUV4aXRPcHRpb25zKSA9PiB2b2lkfSBleGl0RXZlbnRPbkNvbmZpcm0gLSBFdmVudCB0cmlnZ2VyZWQgb24gY29uZmlybWluZyBleGl0LlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1lbWJlciAtIE1lbWJlciBpbmZvcm1hdGlvbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gYmFuIC0gQmFuIHN0YXR1cy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSByb29tTmFtZSAtIE5hbWUgb2YgdGhlIHJvb20uXG4gKiBAcHJvcGVydHkge1NvY2tldH0gc29ja2V0IC0gU29ja2V0IGluc3RhbmNlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGlzbGV2ZWwgLSBMZXZlbCBpbmZvcm1hdGlvbi5cbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhVGltZXMgLSBGb250QXdlc29tZSBpY29uIGZvciBjbG9zZSBidXR0b24uXG4gKiBAcHJvcGVydHkge2FueX0gbW9kYWxDb250ZW50U3R5bGUgLSBTdHlsZSBvYmplY3QgZm9yIG1vZGFsIGNvbnRlbnQuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0NvbmZpcm1FeGl0fSBjb25maXJtRXhpdFNlcnZpY2UgLSBTZXJ2aWNlIGZvciBoYW5kbGluZyBleGl0IGNvbmZpcm1hdGlvbi5cbiAqXG4gKiBAbWV0aG9kIG5nT25Jbml0IC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIGFyZSBpbml0aWFsaXplZC5cbiAqIEBtZXRob2QgbmdPbkNoYW5nZXMgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIGFueSBkYXRhLWJvdW5kIHByb3BlcnR5IGNoYW5nZXMuXG4gKiBAcGFyYW0ge1NpbXBsZUNoYW5nZXN9IGNoYW5nZXMgLSBPYmplY3Qgb2YgY3VycmVudCBhbmQgcHJldmlvdXMgcHJvcGVydHkgdmFsdWVzLlxuICogQG1ldGhvZCBoYW5kbGVDb25maXJtRXhpdCAtIEhhbmRsZXMgdGhlIGV4aXQgY29uZmlybWF0aW9uIGV2ZW50LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtY29uZmlybS1leGl0LW1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbmZpcm0tZXhpdC1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NvbmZpcm0tZXhpdC1tb2RhbC5jb21wb25lbnQuY3NzJ10sXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvcm1zTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIENvbmZpcm1FeGl0TW9kYWwgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGlzQ29uZmlybUV4aXRNb2RhbFZpc2libGUgPSBmYWxzZTtcbiAgQElucHV0KCkgb25Db25maXJtRXhpdENsb3NlITogKCkgPT4gdm9pZDtcbiAgQElucHV0KCkgcG9zaXRpb24gPSAndG9wUmlnaHQnO1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3IgPSAnIzgzYzBlOSc7XG4gIEBJbnB1dCgpIGV4aXRFdmVudE9uQ29uZmlybSE6IChvcHRpb25zOiBDb25maXJtRXhpdE9wdGlvbnMpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIG1lbWJlciA9ICcnO1xuICBASW5wdXQoKSBiYW4gPSBmYWxzZTtcbiAgQElucHV0KCkgcm9vbU5hbWUgPSAnJztcbiAgQElucHV0KCkgc29ja2V0OiBTb2NrZXQgPSB7fSBhcyBTb2NrZXQ7XG4gIEBJbnB1dCgpIGlzbGV2ZWwgPSAnJztcblxuICBmYVRpbWVzID0gZmFUaW1lcztcblxuICBtb2RhbENvbnRlbnRTdHlsZTogYW55O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgY29uZmlybUV4aXRTZXJ2aWNlOiBDb25maXJtRXhpdCkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBjb25zdCBzY3JlZW5XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuICAgIGxldCBtb2RhbFdpZHRoID0gMC44ICogc2NyZWVuV2lkdGg7XG4gICAgaWYgKG1vZGFsV2lkdGggPiAzNTApIHtcbiAgICAgIG1vZGFsV2lkdGggPSAzNTA7XG4gICAgfVxuXG4gICAgdGhpcy5tb2RhbENvbnRlbnRTdHlsZSA9IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICB0b3A6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ3RvcCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgYm90dG9tOiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdib3R0b20nKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICAgIGxlZnQ6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ0xlZnQnKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICAgIHJpZ2h0OiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdSaWdodCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgd2lkdGg6IGAke21vZGFsV2lkdGh9cHhgLFxuICAgIH07XG5cbiAgICBpZiAoIXRoaXMuZXhpdEV2ZW50T25Db25maXJtKSB7XG4gICAgICB0aGlzLmV4aXRFdmVudE9uQ29uZmlybSA9IHRoaXMuY29uZmlybUV4aXRTZXJ2aWNlLmNvbmZpcm1FeGl0LmJpbmQodGhpcy5jb25maXJtRXhpdFNlcnZpY2UpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoY2hhbmdlc1snaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZSddICYmIGNoYW5nZXNbJ2lzbGV2ZWwnXSkge1xuICAgICAgdGhpcy5pc2xldmVsID0gY2hhbmdlc1snaXNsZXZlbCddLmN1cnJlbnRWYWx1ZTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVDb25maXJtRXhpdCgpIHtcbiAgICB0aGlzLmV4aXRFdmVudE9uQ29uZmlybSh7XG4gICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LFxuICAgICAgbWVtYmVyOiB0aGlzLm1lbWJlcixcbiAgICAgIHJvb21OYW1lOiB0aGlzLnJvb21OYW1lLFxuICAgICAgYmFuOiB0aGlzLmJhbixcbiAgICB9KTtcbiAgICB0aGlzLm9uQ29uZmlybUV4aXRDbG9zZSgpO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0lmPVwiaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZVwiIGNsYXNzPVwibW9kYWwtY29udGFpbmVyXCI+XHJcbiAgPGRpdiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIiBbbmdTdHlsZV09XCJtb2RhbENvbnRlbnRTdHlsZVwiPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRlclwiIHN0eWxlPVwiZGlzcGxheTogZmxleDsganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1wiPlxyXG4gICAgICA8aDIgY2xhc3M9XCJtb2RhbC10aXRsZVwiPkNvbmZpcm0gRXhpdDwvaDI+XHJcbiAgICAgIDxzcGFuIGNsYXNzPVwiY2xvc2UtaWNvblwiIChjbGljayk9XCJvbkNvbmZpcm1FeGl0Q2xvc2UoKVwiPlxyXG4gICAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhVGltZXNcIiBzaXplPVwibGdcIj48L2ZhLWljb24+XHJcbiAgICAgIDwvc3Bhbj5cclxuICAgIDwvZGl2PlxyXG4gICAgPGhyIC8+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxyXG4gICAgICA8cCBjbGFzcz1cImNvbmZpcm0tZXhpdC10ZXh0XCI+XHJcbiAgICAgICAge3sgaXNsZXZlbCA9PT0gJzInID8gJ1RoaXMgd2lsbCBlbmQgdGhlIGV2ZW50IGZvciBhbGwuIENvbmZpcm0gZXhpdC4nIDogJ0FyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBleGl0PycgfX1cclxuICAgICAgPC9wPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8aHIgLz5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1mb290ZXJcIj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImNhbmNlbC1idXR0b25cIiAoY2xpY2spPVwib25Db25maXJtRXhpdENsb3NlKClcIj5DYW5jZWw8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvbiBjbGFzcz1cImNvbmZpcm0tYnV0dG9uXCIgKGNsaWNrKT1cImhhbmRsZUNvbmZpcm1FeGl0KClcIj5cclxuICAgICAgICB7eyBpc2xldmVsID09PSAnMicgPyAnRW5kIEV2ZW50JyA6ICdFeGl0JyB9fVxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19