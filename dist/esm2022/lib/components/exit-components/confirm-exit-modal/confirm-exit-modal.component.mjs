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
 * ConfirmExitModal component renders a modal view for exit confirmation,
 * allowing users to confirm or cancel an exit event from a session or room.
 *
 * @component
 * @selector app-confirm-exit-modal
 * @standalone true
 * @imports [CommonModule, FormsModule, FontAwesomeModule]
 *
 * @example
 * ```html
 * <app-confirm-exit-modal
 *   [isConfirmExitModalVisible]="true"
 *   [onConfirmExitClose]="closeModal"
 *   [exitEventOnConfirm]="confirmExit"
 *   [member]="memberName"
 *   [ban]="false"
 *   [roomName]="currentRoom"
 *   [socket]="socketInstance"
 *   [islevel]="userLevel">
 * </app-confirm-exit-modal>
 * ```
 *
 * @input {boolean} isConfirmExitModalVisible - Determines the visibility of the modal.
 * @input {() => void} onConfirmExitClose - Callback to close the modal.
 * @input {string} position - Position on the screen (default: 'topRight').
 * @input {string} backgroundColor - Background color of the modal (default: '#83c0e9').
 * @input {(options: ConfirmExitOptions) => void} exitEventOnConfirm - Callback function to handle exit confirmation.
 * @input {string} member - Identifies the member for whom the exit is confirmed.
 * @input {boolean} ban - Indicates if the exit action includes a ban.
 * @input {string} roomName - Name of the room involved in the exit action.
 * @input {Socket} socket - Socket instance for real-time interaction.
 * @input {string} islevel - User level information.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for the close button.
 * @property {any} modalContentStyle - Object defining the style for modal content.
 *
 * @constructor
 * @param {ConfirmExit} confirmExitService - Service to handle the exit confirmation.
 *
 * @method ngOnInit - Initializes component properties and default styles for the modal content.
 * @method ngOnChanges - Updates component state upon changes in input properties.
 * @param {SimpleChanges} changes - Object containing the current and previous property values.
 *
 * @method handleConfirmExit - Handles the exit confirmation event, triggering the provided `exitEventOnConfirm` function and then closing the modal.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS1leGl0LW1vZGFsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2V4aXQtY29tcG9uZW50cy9jb25maXJtLWV4aXQtbW9kYWwvY29uZmlybS1leGl0LW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2V4aXQtY29tcG9uZW50cy9jb25maXJtLWV4aXQtbW9kYWwvY29uZmlybS1leGl0LW1vZGFsLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFvQyxNQUFNLGVBQWUsQ0FBQztBQUNuRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzdDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM1RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7Ozs7QUFzQnJFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Q0c7QUFTSCxNQUFNLE9BQU8sZ0JBQWdCO0lBZ0JQO0lBZlgseUJBQXlCLEdBQUcsS0FBSyxDQUFDO0lBQ2xDLGtCQUFrQixDQUFjO0lBQ2hDLFFBQVEsR0FBRyxVQUFVLENBQUM7SUFDdEIsZUFBZSxHQUFHLFNBQVMsQ0FBQztJQUM1QixrQkFBa0IsQ0FBeUM7SUFDM0QsTUFBTSxHQUFHLEVBQUUsQ0FBQztJQUNaLEdBQUcsR0FBRyxLQUFLLENBQUM7SUFDWixRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2QsTUFBTSxHQUFXLEVB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IFNpbXBsZUNoYW5nZXMsIE9uQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgZmFUaW1lcyB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7XG4gIENvbmZpcm1FeGl0LFxuICBDb25maXJtRXhpdE9wdGlvbnMsXG59IGZyb20gJy4uLy4uLy4uL21ldGhvZHMvZXhpdC1tZXRob2RzL2NvbmZpcm0tZXhpdC5zZXJ2aWNlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENvbmZpcm1FeGl0TW9kYWxPcHRpb25zIHtcbiAgaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZTogYm9vbGVhbjtcbiAgb25Db25maXJtRXhpdENsb3NlOiAoKSA9PiB2b2lkO1xuICBwb3NpdGlvbj86ICd0b3BSaWdodCcgfCAndG9wTGVmdCcgfCAnYm90dG9tUmlnaHQnIHwgJ2JvdHRvbUxlZnQnO1xuICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIGV4aXRFdmVudE9uQ29uZmlybT86IChvcHRpb25zOiBDb25maXJtRXhpdE9wdGlvbnMpID0+IHZvaWQ7XG4gIG1lbWJlcjogc3RyaW5nO1xuICBiYW4/OiBib29sZWFuO1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgaXNsZXZlbDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBDb25maXJtRXhpdE1vZGFsVHlwZSA9IChvcHRpb25zOiBDb25maXJtRXhpdE1vZGFsT3B0aW9ucykgPT4gSFRNTEVsZW1lbnQ7XG5cbi8qKlxuICogQ29uZmlybUV4aXRNb2RhbCBjb21wb25lbnQgcmVuZGVycyBhIG1vZGFsIHZpZXcgZm9yIGV4aXQgY29uZmlybWF0aW9uLFxuICogYWxsb3dpbmcgdXNlcnMgdG8gY29uZmlybSBvciBjYW5jZWwgYW4gZXhpdCBldmVudCBmcm9tIGEgc2Vzc2lvbiBvciByb29tLlxuICpcbiAqIEBjb21wb25lbnRcbiAqIEBzZWxlY3RvciBhcHAtY29uZmlybS1leGl0LW1vZGFsXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtY29uZmlybS1leGl0LW1vZGFsXG4gKiAgIFtpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlXT1cInRydWVcIlxuICogICBbb25Db25maXJtRXhpdENsb3NlXT1cImNsb3NlTW9kYWxcIlxuICogICBbZXhpdEV2ZW50T25Db25maXJtXT1cImNvbmZpcm1FeGl0XCJcbiAqICAgW21lbWJlcl09XCJtZW1iZXJOYW1lXCJcbiAqICAgW2Jhbl09XCJmYWxzZVwiXG4gKiAgIFtyb29tTmFtZV09XCJjdXJyZW50Um9vbVwiXG4gKiAgIFtzb2NrZXRdPVwic29ja2V0SW5zdGFuY2VcIlxuICogICBbaXNsZXZlbF09XCJ1c2VyTGV2ZWxcIj5cbiAqIDwvYXBwLWNvbmZpcm0tZXhpdC1tb2RhbD5cbiAqIGBgYFxuICpcbiAqIEBpbnB1dCB7Ym9vbGVhbn0gaXNDb25maXJtRXhpdE1vZGFsVmlzaWJsZSAtIERldGVybWluZXMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIG1vZGFsLlxuICogQGlucHV0IHsoKSA9PiB2b2lkfSBvbkNvbmZpcm1FeGl0Q2xvc2UgLSBDYWxsYmFjayB0byBjbG9zZSB0aGUgbW9kYWwuXG4gKiBAaW5wdXQge3N0cmluZ30gcG9zaXRpb24gLSBQb3NpdGlvbiBvbiB0aGUgc2NyZWVuIChkZWZhdWx0OiAndG9wUmlnaHQnKS5cbiAqIEBpbnB1dCB7c3RyaW5nfSBiYWNrZ3JvdW5kQ29sb3IgLSBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBtb2RhbCAoZGVmYXVsdDogJyM4M2MwZTknKS5cbiAqIEBpbnB1dCB7KG9wdGlvbnM6IENvbmZpcm1FeGl0T3B0aW9ucykgPT4gdm9pZH0gZXhpdEV2ZW50T25Db25maXJtIC0gQ2FsbGJhY2sgZnVuY3Rpb24gdG8gaGFuZGxlIGV4aXQgY29uZmlybWF0aW9uLlxuICogQGlucHV0IHtzdHJpbmd9IG1lbWJlciAtIElkZW50aWZpZXMgdGhlIG1lbWJlciBmb3Igd2hvbSB0aGUgZXhpdCBpcyBjb25maXJtZWQuXG4gKiBAaW5wdXQge2Jvb2xlYW59IGJhbiAtIEluZGljYXRlcyBpZiB0aGUgZXhpdCBhY3Rpb24gaW5jbHVkZXMgYSBiYW4uXG4gKiBAaW5wdXQge3N0cmluZ30gcm9vbU5hbWUgLSBOYW1lIG9mIHRoZSByb29tIGludm9sdmVkIGluIHRoZSBleGl0IGFjdGlvbi5cbiAqIEBpbnB1dCB7U29ja2V0fSBzb2NrZXQgLSBTb2NrZXQgaW5zdGFuY2UgZm9yIHJlYWwtdGltZSBpbnRlcmFjdGlvbi5cbiAqIEBpbnB1dCB7c3RyaW5nfSBpc2xldmVsIC0gVXNlciBsZXZlbCBpbmZvcm1hdGlvbi5cbiAqXG4gKiBAcHJvcGVydHkge0ljb25EZWZpbml0aW9ufSBmYVRpbWVzIC0gRm9udEF3ZXNvbWUgaWNvbiBmb3IgdGhlIGNsb3NlIGJ1dHRvbi5cbiAqIEBwcm9wZXJ0eSB7YW55fSBtb2RhbENvbnRlbnRTdHlsZSAtIE9iamVjdCBkZWZpbmluZyB0aGUgc3R5bGUgZm9yIG1vZGFsIGNvbnRlbnQuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAcGFyYW0ge0NvbmZpcm1FeGl0fSBjb25maXJtRXhpdFNlcnZpY2UgLSBTZXJ2aWNlIHRvIGhhbmRsZSB0aGUgZXhpdCBjb25maXJtYXRpb24uXG4gKlxuICogQG1ldGhvZCBuZ09uSW5pdCAtIEluaXRpYWxpemVzIGNvbXBvbmVudCBwcm9wZXJ0aWVzIGFuZCBkZWZhdWx0IHN0eWxlcyBmb3IgdGhlIG1vZGFsIGNvbnRlbnQuXG4gKiBAbWV0aG9kIG5nT25DaGFuZ2VzIC0gVXBkYXRlcyBjb21wb25lbnQgc3RhdGUgdXBvbiBjaGFuZ2VzIGluIGlucHV0IHByb3BlcnRpZXMuXG4gKiBAcGFyYW0ge1NpbXBsZUNoYW5nZXN9IGNoYW5nZXMgLSBPYmplY3QgY29udGFpbmluZyB0aGUgY3VycmVudCBhbmQgcHJldmlvdXMgcHJvcGVydHkgdmFsdWVzLlxuICpcbiAqIEBtZXRob2QgaGFuZGxlQ29uZmlybUV4aXQgLSBIYW5kbGVzIHRoZSBleGl0IGNvbmZpcm1hdGlvbiBldmVudCwgdHJpZ2dlcmluZyB0aGUgcHJvdmlkZWQgYGV4aXRFdmVudE9uQ29uZmlybWAgZnVuY3Rpb24gYW5kIHRoZW4gY2xvc2luZyB0aGUgbW9kYWwuXG4gKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWNvbmZpcm0tZXhpdC1tb2RhbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9jb25maXJtLWV4aXQtbW9kYWwuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9jb25maXJtLWV4aXQtbW9kYWwuY29tcG9uZW50LmNzcyddLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb3Jtc01vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBDb25maXJtRXhpdE1vZGFsIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBpc0NvbmZpcm1FeGl0TW9kYWxWaXNpYmxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIG9uQ29uZmlybUV4aXRDbG9zZSE6ICgpID0+IHZvaWQ7XG4gIEBJbnB1dCgpIHBvc2l0aW9uID0gJ3RvcFJpZ2h0JztcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJyM4M2MwZTknO1xuICBASW5wdXQoKSBleGl0RXZlbnRPbkNvbmZpcm0hOiAob3B0aW9uczogQ29uZmlybUV4aXRPcHRpb25zKSA9PiB2b2lkO1xuICBASW5wdXQoKSBtZW1iZXIgPSAnJztcbiAgQElucHV0KCkgYmFuID0gZmFsc2U7XG4gIEBJbnB1dCgpIHJvb21OYW1lID0gJyc7XG4gIEBJbnB1dCgpIHNvY2tldDogU29ja2V0ID0ge30gYXMgU29ja2V0O1xuICBASW5wdXQoKSBpc2xldmVsID0gJyc7XG5cbiAgZmFUaW1lcyA9IGZhVGltZXM7XG5cbiAgbW9kYWxDb250ZW50U3R5bGU6IGFueTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGNvbmZpcm1FeGl0U2VydmljZTogQ29uZmlybUV4aXQpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgY29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBsZXQgbW9kYWxXaWR0aCA9IDAuOCAqIHNjcmVlbldpZHRoO1xuICAgIGlmIChtb2RhbFdpZHRoID4gMzUwKSB7XG4gICAgICBtb2RhbFdpZHRoID0gMzUwO1xuICAgIH1cblxuICAgIHRoaXMubW9kYWxDb250ZW50U3R5bGUgPSB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgdG9wOiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCd0b3AnKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICAgIGJvdHRvbTogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnYm90dG9tJykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICBsZWZ0OiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdMZWZ0JykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICByaWdodDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnUmlnaHQnKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICAgIHdpZHRoOiBgJHttb2RhbFdpZHRofXB4YCxcbiAgICB9O1xuXG4gICAgaWYgKCF0aGlzLmV4aXRFdmVudE9uQ29uZmlybSkge1xuICAgICAgdGhpcy5leGl0RXZlbnRPbkNvbmZpcm0gPSB0aGlzLmNvbmZpcm1FeGl0U2VydmljZS5jb25maXJtRXhpdC5iaW5kKHRoaXMuY29uZmlybUV4aXRTZXJ2aWNlKTtcbiAgICB9XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ2lzQ29uZmlybUV4aXRNb2RhbFZpc2libGUnXSAmJiBjaGFuZ2VzWydpc2xldmVsJ10pIHtcbiAgICAgIHRoaXMuaXNsZXZlbCA9IGNoYW5nZXNbJ2lzbGV2ZWwnXS5jdXJyZW50VmFsdWU7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQ29uZmlybUV4aXQoKSB7XG4gICAgdGhpcy5leGl0RXZlbnRPbkNvbmZpcm0oe1xuICAgICAgc29ja2V0OiB0aGlzLnNvY2tldCxcbiAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIsXG4gICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZSxcbiAgICAgIGJhbjogdGhpcy5iYW4sXG4gICAgfSk7XG4gICAgdGhpcy5vbkNvbmZpcm1FeGl0Q2xvc2UoKTtcbiAgfVxufVxuIiwiPGRpdiAqbmdJZj1cImlzQ29uZmlybUV4aXRNb2RhbFZpc2libGVcIiBjbGFzcz1cIm1vZGFsLWNvbnRhaW5lclwiPlxyXG4gIDxkaXYgY2xhc3M9XCJtb2RhbC1jb250ZW50XCIgW25nU3R5bGVdPVwibW9kYWxDb250ZW50U3R5bGVcIj5cclxuICAgIDxkaXYgY2xhc3M9XCJtb2RhbC1oZWFkZXJcIiBzdHlsZT1cImRpc3BsYXk6IGZsZXg7IGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcIj5cclxuICAgICAgPGgyIGNsYXNzPVwibW9kYWwtdGl0bGVcIj5Db25maXJtIEV4aXQ8L2gyPlxyXG4gICAgICA8c3BhbiBjbGFzcz1cImNsb3NlLWljb25cIiAoY2xpY2spPVwib25Db25maXJtRXhpdENsb3NlKClcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRpbWVzXCIgc2l6ZT1cImxnXCI+PC9mYS1pY29uPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxociAvPlxyXG4gICAgPGRpdiBjbGFzcz1cIm1vZGFsLWJvZHlcIj5cclxuICAgICAgPHAgY2xhc3M9XCJjb25maXJtLWV4aXQtdGV4dFwiPlxyXG4gICAgICAgIHt7IGlzbGV2ZWwgPT09ICcyJyA/ICdUaGlzIHdpbGwgZW5kIHRoZSBldmVudCBmb3IgYWxsLiBDb25maXJtIGV4aXQuJyA6ICdBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZXhpdD8nIH19XHJcbiAgICAgIDwvcD5cclxuICAgIDwvZGl2PlxyXG4gICAgPGhyIC8+XHJcbiAgICA8ZGl2IGNsYXNzPVwibW9kYWwtZm9vdGVyXCI+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJjYW5jZWwtYnV0dG9uXCIgKGNsaWNrKT1cIm9uQ29uZmlybUV4aXRDbG9zZSgpXCI+Q2FuY2VsPC9idXR0b24+XHJcbiAgICAgIDxidXR0b24gY2xhc3M9XCJjb25maXJtLWJ1dHRvblwiIChjbGljayk9XCJoYW5kbGVDb25maXJtRXhpdCgpXCI+XHJcbiAgICAgICAge3sgaXNsZXZlbCA9PT0gJzInID8gJ0VuZCBFdmVudCcgOiAnRXhpdCcgfX1cclxuICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==