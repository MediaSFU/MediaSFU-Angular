/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessagePanel } from '../message-panel/message-panel.component';
import * as i0 from "@angular/core";
import * as i1 from "../../../methods/message-methods/send-message.service";
import * as i2 from "@angular/common";
import * as i3 from "@fortawesome/angular-fontawesome";
/**
 * @component MessagesModal
 * @description A modal component for managing chat messages in MediaSFU applications, supporting both group and direct messaging, and providing a customizable user interface.
 *
 * @selector app-messages-modal
 * @templateUrl ./messages-modal.component.html
 * @styleUrls ./messages-modal.component.css
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, MessagePanel]
 *
 * @example
 * ```html
 * <app-messages-modal
 *   [isMessagesModalVisible]="true"
 *   [onMessagesClose]="closeMessages"
 *   [messages]="chatMessages"
 *   [position]="'bottomRight'"
 *   [backgroundColor]="'#f5f5f5'"
 *   [eventType]="'webinar'"
 *   [member]="'JohnDoe'"
 *   [islevel]="'2'"
 *   [coHostResponsibility]="coHostRoles"
 *   [coHost]="'coHost123'"
 *   [startDirectMessage]="false"
 *   [directMessageDetails]="selectedParticipant"
 *   [updateStartDirectMessage]="updateDirectMessageStart"
 *   [updateDirectMessageDetails]="updateParticipantDetails"
 *   [showAlert]="displayAlert"
 *   [roomName]="'RoomName'"
 *   [socket]="chatSocket"
 *   [chatSetting]="'enabled'"
 * ></app-messages-modal>
 * ```
 */
export class MessagesModal {
    SendMessageService;
    constructor(SendMessageService) {
        this.SendMessageService = SendMessageService;
    }
    isMessagesModalVisible = false;
    onMessagesClose = () => { };
    onSendMessagePress;
    messages = [];
    position = 'topRight';
    backgroundColor = '#f5f5f5';
    activeTabBackgroundColor = '#2b7ce5';
    eventType = 'webinar';
    member = '';
    islevel = '';
    coHostResponsibility = [];
    coHost = '';
    startDirectMessage = false;
    directMessageDetails = null;
    updateStartDirectMessage = (start) => {
        console.log(start);
    };
    updateDirectMessageDetails = (participant) => {
        console.log(participant);
    };
    showAlert;
    roomName = '';
    socket = {};
    chatSetting = '';
    faTimes = faTimes;
    directMessages = [];
    groupMessages = [];
    activeTab = 'group';
    focusedInput = false;
    reRender = false;
    modalContainerStyle;
    modalContentStyle;
    ngOnInit() {
        if (!this.onSendMessagePress) {
            this.onSendMessagePress = this.SendMessageService.sendMessage.bind(this.SendMessageService);
        }
        if (this.eventType == 'webinar' || this.eventType == 'conference') {
            this.activeTab = 'direct';
        }
        else {
            this.activeTab = 'group';
            this.switchToGroupTab();
        }
        this.updateModalStyles();
    }
    ngOnChanges(changes) {
        if (changes['isMessagesModalVisible']) {
            this.updateModalStyles();
            if (this.eventType != 'webinar' &&
                this.eventType != 'conference' &&
                this.activeTab == 'direct') {
                this.activeTab = 'group';
                this.focusedInput = false;
                this.switchToGroupTab();
            }
            else if (this.eventType == 'webinar' || this.eventType == 'conference') {
                if (this.startDirectMessage && this.directMessageDetails) {
                    this.activeTab = 'direct';
                    this.focusedInput = true;
                    this.switchToDirectTab();
                }
            }
            if (this.isMessagesModalVisible) {
                this.populateMessages();
            }
        }
        if (changes['messages']) {
            this.populateMessages();
        }
    }
    switchToDirectTab() {
        this.activeTab = 'direct';
        this.reRender = !this.reRender;
    }
    switchToGroupTab() {
        this.activeTab = 'group';
        this.reRender = !this.reRender;
    }
    populateMessages() {
        let chatValue = false;
        try {
            chatValue =
                this.coHostResponsibility?.find((item) => item.name == 'chat')?.value || false;
        }
        catch {
            /* handle error */
        }
        let directMsgs = this.messages ? this.messages.filter((message) => !message.group) : [];
        directMsgs = directMsgs.filter((message) => message.sender == this.member ||
            message.receivers.includes(this.member) ||
            this.islevel == '2' ||
            (this.coHost == this.member && chatValue == true));
        this.directMessages = directMsgs;
        const groupMsgs = this.messages ? this.messages.filter((message) => message.group) : [];
        this.groupMessages = groupMsgs;
    }
    closeMessagesModal() {
        this.onMessagesClose();
    }
    updateModalStyles() {
        const screenWidth = window.innerWidth;
        const modalWidth = Math.min(0.8 * screenWidth, 400);
        this.modalContainerStyle = {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: this.isMessagesModalVisible ? 'block' : 'none',
            zIndex: 999,
        };
        this.modalContentStyle = {
            position: 'fixed',
            backgroundColor: this.backgroundColor,
            borderRadius: '10px',
            padding: '10px',
            width: `${modalWidth}px`,
            maxWidth: `${modalWidth}px`,
            maxHeight: '75%',
            overflowY: 'auto',
            overflowX: 'hidden',
            top: this.position.includes('top') ? '10px' : 'auto',
            bottom: this.position.includes('bottom') ? '10px' : 'auto',
            left: this.position.includes('Left') ? '10px' : 'auto',
            right: this.position.includes('Right') ? '10px' : 'auto',
        };
    }
    getTabStyle(tab) {
        return {
            ...this.styles.tabText,
            ...(this.activeTab == tab ? this.styles.activeTabText : {}),
            ...(this.activeTab == tab ? { backgroundColor: this.activeTabBackgroundColor } : {}),
        };
    }
    getButtonCloseStyle() {
        return {
            ...this.styles.btnCloseMessages,
            marginLeft: this.eventType == 'webinar' || this.eventType == 'conference' ? '20%' : '65%',
        };
    }
    get styles() {
        return {
            modalContent: {
                borderRadius: '10px',
                padding: '10px',
            },
            modalBody: {
                marginTop: '10px',
            },
            tabText: {
                paddingRight: '10px',
                paddingLeft: '10px',
                paddingTop: '5px',
                paddingBottom: '5px',
                fontWeight: 'bold',
                marginRight: '10px',
                marginLeft: '10px',
            },
            activeTabText: {
                color: '#ffffff',
                backgroundColor: '#2b7ce5',
                borderRadius: '4px',
            },
            separator: {
                height: '1px',
                backgroundColor: 'black',
                marginVertical: '1px',
            },
            btnCloseMessages: {
                padding: '5px',
                marginRight: '0',
                paddingRight: '0',
            },
            icon: {
                fontSize: '24px',
                color: 'black',
            },
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MessagesModal, deps: [{ token: i1.SendMessage }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MessagesModal, isStandalone: true, selector: "app-messages-modal", inputs: { isMessagesModalVisible: "isMessagesModalVisible", onMessagesClose: "onMessagesClose", onSendMessagePress: "onSendMessagePress", messages: "messages", position: "position", backgroundColor: "backgroundColor", activeTabBackgroundColor: "activeTabBackgroundColor", eventType: "eventType", member: "member", islevel: "islevel", coHostResponsibility: "coHostResponsibility", coHost: "coHost", startDirectMessage: "startDirectMessage", directMessageDetails: "directMessageDetails", updateStartDirectMessage: "updateStartDirectMessage", updateDirectMessageDetails: "updateDirectMessageDetails", showAlert: "showAlert", roomName: "roomName", socket: "socket", chatSetting: "chatSetting" }, usesOnChanges: true, ngImport: i0, template: "<div [ngStyle]=\"modalContainerStyle\">\r\n  <div [ngStyle]=\"modalContentStyle\">\r\n    <div\r\n      [ngStyle]=\"{\r\n        flexDirection: 'row',\r\n        justifyContent: 'space-between',\r\n        alignItems: 'center'\r\n      }\"\r\n    >\r\n      <button\r\n        *ngIf=\"eventType === 'webinar' || eventType === 'conference'\"\r\n        (click)=\"switchToDirectTab()\"\r\n        [ngStyle]=\"getTabStyle('direct')\"\r\n      >\r\n        Direct\r\n      </button>\r\n      <button\r\n        *ngIf=\"eventType === 'webinar' || eventType === 'conference'\"\r\n        (click)=\"switchToGroupTab()\"\r\n        [ngStyle]=\"getTabStyle('group')\"\r\n      >\r\n        Group\r\n      </button>\r\n      <span (click)=\"closeMessagesModal()\" [ngStyle]=\"getButtonCloseStyle()\">\r\n        <fa-icon [icon]=\"faTimes\" class=\"icon\" size=\"xl\"></fa-icon>\r\n      </span>\r\n    </div>\r\n    <hr [ngStyle]=\"styles.separator\" />\r\n    <div [ngStyle]=\"styles.modalBody\">\r\n      <app-message-panel\r\n        *ngIf=\"\r\n          activeTab === 'direct' &&\r\n          (eventType === 'webinar' || eventType === 'conference')\r\n        \"\r\n        [messages]=\"directMessages\"\r\n        [messagesLength]=\"messages.length\"\r\n        type=\"direct\"\r\n        [onSendMessagePress]=\"onSendMessagePress\"\r\n        [username]=\"member\"\r\n        [backgroundColor]=\"backgroundColor\"\r\n        [focusedInput]=\"focusedInput\"\r\n        [showAlert]=\"showAlert\"\r\n        [eventType]=\"eventType\"\r\n        [member]=\"member\"\r\n        [islevel]=\"islevel\"\r\n        [coHostResponsibility]=\"coHostResponsibility\"\r\n        [coHost]=\"coHost\"\r\n        [directMessageDetails]=\"directMessageDetails\"\r\n        [updateStartDirectMessage]=\"updateStartDirectMessage\"\r\n        [updateDirectMessageDetails]=\"updateDirectMessageDetails\"\r\n        [roomName]=\"roomName\"\r\n        [socket]=\"socket\"\r\n        [chatSetting]=\"chatSetting\"\r\n        [startDirectMessage]=\"startDirectMessage\"\r\n      >\r\n      </app-message-panel>\r\n\r\n      <app-message-panel\r\n        *ngIf=\"activeTab === 'group'\"\r\n        [messages]=\"groupMessages\"\r\n        [messagesLength]=\"messages.length\"\r\n        type=\"group\"\r\n        [onSendMessagePress]=\"onSendMessagePress\"\r\n        [username]=\"member\"\r\n        [backgroundColor]=\"backgroundColor\"\r\n        [focusedInput]=\"focusedInput\"\r\n        [showAlert]=\"showAlert\"\r\n        [eventType]=\"eventType\"\r\n        [member]=\"member\"\r\n        [islevel]=\"islevel\"\r\n        [coHostResponsibility]=\"coHostResponsibility\"\r\n        [coHost]=\"coHost\"\r\n        [directMessageDetails]=\"directMessageDetails\"\r\n        [updateStartDirectMessage]=\"updateStartDirectMessage\"\r\n        [updateDirectMessageDetails]=\"updateDirectMessageDetails\"\r\n        [roomName]=\"roomName\"\r\n        [socket]=\"socket\"\r\n        [chatSetting]=\"chatSetting\"\r\n        [startDirectMessage]=\"startDirectMessage\"\r\n      >\r\n      </app-message-panel>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modalContent{border-radius:10px;padding:10px}.modalBody{margin-top:10px}.tabText{padding:5px 10px;font-weight:700;margin-right:10px;margin-left:10px}.activeTabText{color:#fff;background-color:#2b7ce5;border-radius:4px}.separator{height:1px;background-color:#000;margin-top:1px;margin-bottom:1px}.btnCloseMessages{padding:5px 0 5px 5px;margin-right:0}.icon{font-size:24px;color:#000}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i3.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }, { kind: "component", type: MessagePanel, selector: "app-message-panel", inputs: ["messages", "messagesLength", "type", "username", "onSendMessagePress", "backgroundColor", "focusedInput", "eventType", "member", "islevel", "startDirectMessage", "updateStartDirectMessage", "directMessageDetails", "updateDirectMessageDetails", "coHostResponsibility", "coHost", "roomName", "socket", "chatSetting", "showAlert"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MessagesModal, decorators: [{
            type: Component,
            args: [{ selector: 'app-messages-modal', standalone: true, imports: [CommonModule, FontAwesomeModule, MessagePanel], template: "<div [ngStyle]=\"modalContainerStyle\">\r\n  <div [ngStyle]=\"modalContentStyle\">\r\n    <div\r\n      [ngStyle]=\"{\r\n        flexDirection: 'row',\r\n        justifyContent: 'space-between',\r\n        alignItems: 'center'\r\n      }\"\r\n    >\r\n      <button\r\n        *ngIf=\"eventType === 'webinar' || eventType === 'conference'\"\r\n        (click)=\"switchToDirectTab()\"\r\n        [ngStyle]=\"getTabStyle('direct')\"\r\n      >\r\n        Direct\r\n      </button>\r\n      <button\r\n        *ngIf=\"eventType === 'webinar' || eventType === 'conference'\"\r\n        (click)=\"switchToGroupTab()\"\r\n        [ngStyle]=\"getTabStyle('group')\"\r\n      >\r\n        Group\r\n      </button>\r\n      <span (click)=\"closeMessagesModal()\" [ngStyle]=\"getButtonCloseStyle()\">\r\n        <fa-icon [icon]=\"faTimes\" class=\"icon\" size=\"xl\"></fa-icon>\r\n      </span>\r\n    </div>\r\n    <hr [ngStyle]=\"styles.separator\" />\r\n    <div [ngStyle]=\"styles.modalBody\">\r\n      <app-message-panel\r\n        *ngIf=\"\r\n          activeTab === 'direct' &&\r\n          (eventType === 'webinar' || eventType === 'conference')\r\n        \"\r\n        [messages]=\"directMessages\"\r\n        [messagesLength]=\"messages.length\"\r\n        type=\"direct\"\r\n        [onSendMessagePress]=\"onSendMessagePress\"\r\n        [username]=\"member\"\r\n        [backgroundColor]=\"backgroundColor\"\r\n        [focusedInput]=\"focusedInput\"\r\n        [showAlert]=\"showAlert\"\r\n        [eventType]=\"eventType\"\r\n        [member]=\"member\"\r\n        [islevel]=\"islevel\"\r\n        [coHostResponsibility]=\"coHostResponsibility\"\r\n        [coHost]=\"coHost\"\r\n        [directMessageDetails]=\"directMessageDetails\"\r\n        [updateStartDirectMessage]=\"updateStartDirectMessage\"\r\n        [updateDirectMessageDetails]=\"updateDirectMessageDetails\"\r\n        [roomName]=\"roomName\"\r\n        [socket]=\"socket\"\r\n        [chatSetting]=\"chatSetting\"\r\n        [startDirectMessage]=\"startDirectMessage\"\r\n      >\r\n      </app-message-panel>\r\n\r\n      <app-message-panel\r\n        *ngIf=\"activeTab === 'group'\"\r\n        [messages]=\"groupMessages\"\r\n        [messagesLength]=\"messages.length\"\r\n        type=\"group\"\r\n        [onSendMessagePress]=\"onSendMessagePress\"\r\n        [username]=\"member\"\r\n        [backgroundColor]=\"backgroundColor\"\r\n        [focusedInput]=\"focusedInput\"\r\n        [showAlert]=\"showAlert\"\r\n        [eventType]=\"eventType\"\r\n        [member]=\"member\"\r\n        [islevel]=\"islevel\"\r\n        [coHostResponsibility]=\"coHostResponsibility\"\r\n        [coHost]=\"coHost\"\r\n        [directMessageDetails]=\"directMessageDetails\"\r\n        [updateStartDirectMessage]=\"updateStartDirectMessage\"\r\n        [updateDirectMessageDetails]=\"updateDirectMessageDetails\"\r\n        [roomName]=\"roomName\"\r\n        [socket]=\"socket\"\r\n        [chatSetting]=\"chatSetting\"\r\n        [startDirectMessage]=\"startDirectMessage\"\r\n      >\r\n      </app-message-panel>\r\n    </div>\r\n  </div>\r\n</div>\r\n", styles: [".modalContent{border-radius:10px;padding:10px}.modalBody{margin-top:10px}.tabText{padding:5px 10px;font-weight:700;margin-right:10px;margin-left:10px}.activeTabText{color:#fff;background-color:#2b7ce5;border-radius:4px}.separator{height:1px;background-color:#000;margin-top:1px;margin-bottom:1px}.btnCloseMessages{padding:5px 0 5px 5px;margin-right:0}.icon{font-size:24px;color:#000}\n"] }]
        }], ctorParameters: () => [{ type: i1.SendMessage }], propDecorators: { isMessagesModalVisible: [{
                type: Input
            }], onMessagesClose: [{
                type: Input
            }], onSendMessagePress: [{
                type: Input
            }], messages: [{
                type: Input
            }], position: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], activeTabBackgroundColor: [{
                type: Input
            }], eventType: [{
                type: Input
            }], member: [{
                type: Input
            }], islevel: [{
                type: Input
            }], coHostResponsibility: [{
                type: Input
            }], coHost: [{
                type: Input
            }], startDirectMessage: [{
                type: Input
            }], directMessageDetails: [{
                type: Input
            }], updateStartDirectMessage: [{
                type: Input
            }], updateDirectMessageDetails: [{
                type: Input
            }], showAlert: [{
                type: Input
            }], roomName: [{
                type: Input
            }], socket: [{
                type: Input
            }], chatSetting: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvbWVzc2FnZS1jb21wb25lbnRzL21lc3NhZ2VzLW1vZGFsL21lc3NhZ2VzLW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21lc3NhZ2UtY29tcG9uZW50cy9tZXNzYWdlcy1tb2RhbC9tZXNzYWdlcy1tb2RhbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5REFBeUQ7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7OztBQXVDeEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQVNILE1BQU0sT0FBTyxhQUFhO0lBQ0o7SUFBcEIsWUFBb0Isa0JBQStCO1FBQS9CLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBYTtJQUFHLENBQUM7SUFFOUMsc0JBQXNCLEdBQUcsS0FBSyxDQUFDO0lBQy9CLGVBQWUsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7SUFDM0Isa0JBQWtCLENBQWtEO0lBQ3BFLFFBQVEsR0FBYyxFQUFFLENBQUM7SUFDekIsUUFBUSxHQUFHLFVBQVUsQ0FBQztJQUN0QixlQUFlLEdBQUcsU0FBUyxDQUFD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QyxzQkFBc0I7c0JBQTlCLEtBQUs7Z0JBQ0csZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csd0JBQXdCO3NCQUFoQyxLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBQ0csd0JBQXdCO3NCQUFoQyxLQUFLO2dCQUdHLDBCQUEwQjtzQkFBbEMsS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYVRpbWVzIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IE1lc3NhZ2VQYW5lbCB9IGZyb20gJy4uL21lc3NhZ2UtcGFuZWwvbWVzc2FnZS1wYW5lbC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgQ29Ib3N0UmVzcG9uc2liaWxpdHksXG4gIEV2ZW50VHlwZSxcbiAgTWVzc2FnZSxcbiAgUGFydGljaXBhbnQsXG4gIFNob3dBbGVydCxcbn0gZnJvbSAnLi4vLi4vLi4vQHR5cGVzL3R5cGVzJztcbmltcG9ydCB7XG4gIFNlbmRNZXNzYWdlLFxuICBTZW5kTWVzc2FnZU9wdGlvbnMsXG59IGZyb20gJy4uLy4uLy4uL21ldGhvZHMvbWVzc2FnZS1tZXRob2RzL3NlbmQtbWVzc2FnZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lc3NhZ2VzTW9kYWxPcHRpb25zIHtcbiAgaXNNZXNzYWdlc01vZGFsVmlzaWJsZTogYm9vbGVhbjtcbiAgb25NZXNzYWdlc0Nsb3NlOiAoKSA9PiB2b2lkO1xuICBvblNlbmRNZXNzYWdlUHJlc3M/OiAob3B0aW9uczogU2VuZE1lc3NhZ2VPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBtZXNzYWdlczogTWVzc2FnZVtdO1xuICBwb3NpdGlvbj86IHN0cmluZztcbiAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xuICBhY3RpdmVUYWJCYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuICBtZW1iZXI6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgY29Ib3N0OiBzdHJpbmc7XG4gIHN0YXJ0RGlyZWN0TWVzc2FnZTogYm9vbGVhbjtcbiAgZGlyZWN0TWVzc2FnZURldGFpbHM6IFBhcnRpY2lwYW50IHwgbnVsbDtcbiAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlOiAoc3RhcnQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzOiAocGFydGljaXBhbnQ6IFBhcnRpY2lwYW50IHwgbnVsbCkgPT4gdm9pZDtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgY2hhdFNldHRpbmc6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWVzc2FnZXNNb2RhbFR5cGUgPSAob3B0aW9uczogTWVzc2FnZXNNb2RhbE9wdGlvbnMpID0+IHZvaWQ7XG5cbi8qKlxuICogQGNvbXBvbmVudCBNZXNzYWdlc01vZGFsXG4gKiBAZGVzY3JpcHRpb24gQSBtb2RhbCBjb21wb25lbnQgZm9yIG1hbmFnaW5nIGNoYXQgbWVzc2FnZXMgaW4gTWVkaWFTRlUgYXBwbGljYXRpb25zLCBzdXBwb3J0aW5nIGJvdGggZ3JvdXAgYW5kIGRpcmVjdCBtZXNzYWdpbmcsIGFuZCBwcm92aWRpbmcgYSBjdXN0b21pemFibGUgdXNlciBpbnRlcmZhY2UuXG4gKlxuICogQHNlbGVjdG9yIGFwcC1tZXNzYWdlcy1tb2RhbFxuICogQHRlbXBsYXRlVXJsIC4vbWVzc2FnZXMtbW9kYWwuY29tcG9uZW50Lmh0bWxcbiAqIEBzdHlsZVVybHMgLi9tZXNzYWdlcy1tb2RhbC5jb21wb25lbnQuY3NzXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgTWVzc2FnZVBhbmVsXVxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLW1lc3NhZ2VzLW1vZGFsXG4gKiAgIFtpc01lc3NhZ2VzTW9kYWxWaXNpYmxlXT1cInRydWVcIlxuICogICBbb25NZXNzYWdlc0Nsb3NlXT1cImNsb3NlTWVzc2FnZXNcIlxuICogICBbbWVzc2FnZXNdPVwiY2hhdE1lc3NhZ2VzXCJcbiAqICAgW3Bvc2l0aW9uXT1cIidib3R0b21SaWdodCdcIlxuICogICBbYmFja2dyb3VuZENvbG9yXT1cIicjZjVmNWY1J1wiXG4gKiAgIFtldmVudFR5cGVdPVwiJ3dlYmluYXInXCJcbiAqICAgW21lbWJlcl09XCInSm9obkRvZSdcIlxuICogICBbaXNsZXZlbF09XCInMidcIlxuICogICBbY29Ib3N0UmVzcG9uc2liaWxpdHldPVwiY29Ib3N0Um9sZXNcIlxuICogICBbY29Ib3N0XT1cIidjb0hvc3QxMjMnXCJcbiAqICAgW3N0YXJ0RGlyZWN0TWVzc2FnZV09XCJmYWxzZVwiXG4gKiAgIFtkaXJlY3RNZXNzYWdlRGV0YWlsc109XCJzZWxlY3RlZFBhcnRpY2lwYW50XCJcbiAqICAgW3VwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZV09XCJ1cGRhdGVEaXJlY3RNZXNzYWdlU3RhcnRcIlxuICogICBbdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHNdPVwidXBkYXRlUGFydGljaXBhbnREZXRhaWxzXCJcbiAqICAgW3Nob3dBbGVydF09XCJkaXNwbGF5QWxlcnRcIlxuICogICBbcm9vbU5hbWVdPVwiJ1Jvb21OYW1lJ1wiXG4gKiAgIFtzb2NrZXRdPVwiY2hhdFNvY2tldFwiXG4gKiAgIFtjaGF0U2V0dGluZ109XCInZW5hYmxlZCdcIlxuICogPjwvYXBwLW1lc3NhZ2VzLW1vZGFsPlxuICogYGBgXG4gKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1lc3NhZ2VzLW1vZGFsJyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lc3NhZ2VzLW1vZGFsLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVzc2FnZXMtbW9kYWwuY29tcG9uZW50LmNzcyddLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgTWVzc2FnZVBhbmVsXSxcbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZXNNb2RhbCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBTZW5kTWVzc2FnZVNlcnZpY2U6IFNlbmRNZXNzYWdlKSB7fVxuXG4gIEBJbnB1dCgpIGlzTWVzc2FnZXNNb2RhbFZpc2libGUgPSBmYWxzZTtcbiAgQElucHV0KCkgb25NZXNzYWdlc0Nsb3NlID0gKCkgPT4ge307XG4gIEBJbnB1dCgpIG9uU2VuZE1lc3NhZ2VQcmVzcyE6IChvcHRpb25zOiBTZW5kTWVzc2FnZU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG4gIEBJbnB1dCgpIG1lc3NhZ2VzOiBNZXNzYWdlW10gPSBbXTtcbiAgQElucHV0KCkgcG9zaXRpb24gPSAndG9wUmlnaHQnO1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3IgPSAnI2Y1ZjVmNSc7XG4gIEBJbnB1dCgpIGFjdGl2ZVRhYkJhY2tncm91bmRDb2xvciA9ICcjMmI3Y2U1JztcbiAgQElucHV0KCkgZXZlbnRUeXBlOiBFdmVudFR5cGUgPSAnd2ViaW5hcic7XG4gIEBJbnB1dCgpIG1lbWJlciA9ICcnO1xuICBASW5wdXQoKSBpc2xldmVsID0gJyc7XG4gIEBJbnB1dCgpIGNvSG9zdFJlc3BvbnNpYmlsaXR5OiBDb0hvc3RSZXNwb25zaWJpbGl0eVtdID0gW107XG4gIEBJbnB1dCgpIGNvSG9zdCA9ICcnO1xuICBASW5wdXQoKSBzdGFydERpcmVjdE1lc3NhZ2UgPSBmYWxzZTtcbiAgQElucHV0KCkgZGlyZWN0TWVzc2FnZURldGFpbHM6IFBhcnRpY2lwYW50IHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIHVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZSA9IChzdGFydDogYm9vbGVhbikgPT4ge1xuICAgIGNvbnNvbGUubG9nKHN0YXJ0KTtcbiAgfTtcbiAgQElucHV0KCkgdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHMgPSAocGFydGljaXBhbnQ6IFBhcnRpY2lwYW50IHwgbnVsbCkgPT4ge1xuICAgIGNvbnNvbGUubG9nKHBhcnRpY2lwYW50KTtcbiAgfTtcbiAgQElucHV0KCkgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBASW5wdXQoKSByb29tTmFtZSA9ICcnO1xuICBASW5wdXQoKSBzb2NrZXQ6IFNvY2tldCA9IHt9IGFzIFNvY2tldDtcbiAgQElucHV0KCkgY2hhdFNldHRpbmcgPSAnJztcblxuICBmYVRpbWVzID0gZmFUaW1lcztcblxuICBkaXJlY3RNZXNzYWdlczogQXJyYXk8YW55PiA9IFtdO1xuICBncm91cE1lc3NhZ2VzOiBBcnJheTxhbnk+ID0gW107XG4gIGFjdGl2ZVRhYiA9ICdncm91cCc7XG4gIGZvY3VzZWRJbnB1dCA9IGZhbHNlO1xuICByZVJlbmRlciA9IGZhbHNlO1xuXG4gIG1vZGFsQ29udGFpbmVyU3R5bGU6IGFueTtcbiAgbW9kYWxDb250ZW50U3R5bGU6IGFueTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAoIXRoaXMub25TZW5kTWVzc2FnZVByZXNzKSB7XG4gICAgICB0aGlzLm9uU2VuZE1lc3NhZ2VQcmVzcyA9IHRoaXMuU2VuZE1lc3NhZ2VTZXJ2aWNlLnNlbmRNZXNzYWdlLmJpbmQodGhpcy5TZW5kTWVzc2FnZVNlcnZpY2UpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmV2ZW50VHlwZSA9PSAnd2ViaW5hcicgfHwgdGhpcy5ldmVudFR5cGUgPT0gJ2NvbmZlcmVuY2UnKSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9ICdkaXJlY3QnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFjdGl2ZVRhYiA9ICdncm91cCc7XG4gICAgICB0aGlzLnN3aXRjaFRvR3JvdXBUYWIoKTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZU1vZGFsU3R5bGVzKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ2lzTWVzc2FnZXNNb2RhbFZpc2libGUnXSkge1xuICAgICAgdGhpcy51cGRhdGVNb2RhbFN0eWxlcygpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuZXZlbnRUeXBlICE9ICd3ZWJpbmFyJyAmJlxuICAgICAgICB0aGlzLmV2ZW50VHlwZSAhPSAnY29uZmVyZW5jZScgJiZcbiAgICAgICAgdGhpcy5hY3RpdmVUYWIgPT0gJ2RpcmVjdCdcbiAgICAgICkge1xuICAgICAgICB0aGlzLmFjdGl2ZVRhYiA9ICdncm91cCc7XG4gICAgICAgIHRoaXMuZm9jdXNlZElucHV0ID0gZmFsc2U7XG4gICAgICAgIHRoaXMuc3dpdGNoVG9Hcm91cFRhYigpO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmV2ZW50VHlwZSA9PSAnd2ViaW5hcicgfHwgdGhpcy5ldmVudFR5cGUgPT0gJ2NvbmZlcmVuY2UnKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXJ0RGlyZWN0TWVzc2FnZSAmJiB0aGlzLmRpcmVjdE1lc3NhZ2VEZXRhaWxzKSB7XG4gICAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSAnZGlyZWN0JztcbiAgICAgICAgICB0aGlzLmZvY3VzZWRJbnB1dCA9IHRydWU7XG4gICAgICAgICAgdGhpcy5zd2l0Y2hUb0RpcmVjdFRhYigpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmlzTWVzc2FnZXNNb2RhbFZpc2libGUpIHtcbiAgICAgICAgdGhpcy5wb3B1bGF0ZU1lc3NhZ2VzKCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChjaGFuZ2VzWydtZXNzYWdlcyddKSB7XG4gICAgICB0aGlzLnBvcHVsYXRlTWVzc2FnZXMoKTtcbiAgICB9XG4gIH1cblxuICBzd2l0Y2hUb0RpcmVjdFRhYigpIHtcbiAgICB0aGlzLmFjdGl2ZVRhYiA9ICdkaXJlY3QnO1xuICAgIHRoaXMucmVSZW5kZXIgPSAhdGhpcy5yZVJlbmRlcjtcbiAgfVxuXG4gIHN3aXRjaFRvR3JvdXBUYWIoKSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSAnZ3JvdXAnO1xuICAgIHRoaXMucmVSZW5kZXIgPSAhdGhpcy5yZVJlbmRlcjtcbiAgfVxuXG4gIHBvcHVsYXRlTWVzc2FnZXMoKSB7XG4gICAgbGV0IGNoYXRWYWx1ZSA9IGZhbHNlO1xuICAgIHRyeSB7XG4gICAgICBjaGF0VmFsdWUgPVxuICAgICAgICB0aGlzLmNvSG9zdFJlc3BvbnNpYmlsaXR5Py5maW5kKChpdGVtOiBhbnkpID0+IGl0ZW0ubmFtZSA9PSAnY2hhdCcpPy52YWx1ZSB8fCBmYWxzZTtcbiAgICB9IGNhdGNoIHtcbiAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgIH1cblxuICAgIGxldCBkaXJlY3RNc2dzID0gdGhpcy5tZXNzYWdlcyA/IHRoaXMubWVzc2FnZXMuZmlsdGVyKChtZXNzYWdlKSA9PiAhbWVzc2FnZS5ncm91cCkgOiBbXTtcbiAgICBkaXJlY3RNc2dzID0gZGlyZWN0TXNncy5maWx0ZXIoXG4gICAgICAobWVzc2FnZSkgPT5cbiAgICAgICAgbWVzc2FnZS5zZW5kZXIgPT0gdGhpcy5tZW1iZXIgfHxcbiAgICAgICAgbWVzc2FnZS5yZWNlaXZlcnMuaW5jbHVkZXModGhpcy5tZW1iZXIpIHx8XG4gICAgICAgIHRoaXMuaXNsZXZlbCA9PSAnMicgfHxcbiAgICAgICAgKHRoaXMuY29Ib3N0ID09IHRoaXMubWVtYmVyICYmIGNoYXRWYWx1ZSA9PSB0cnVlKSxcbiAgICApO1xuICAgIHRoaXMuZGlyZWN0TWVzc2FnZXMgPSBkaXJlY3RNc2dzO1xuXG4gICAgY29uc3QgZ3JvdXBNc2dzID0gdGhpcy5tZXNzYWdlcyA/IHRoaXMubWVzc2FnZXMuZmlsdGVyKChtZXNzYWdlKSA9PiBtZXNzYWdlLmdyb3VwKSA6IFtdO1xuICAgIHRoaXMuZ3JvdXBNZXNzYWdlcyA9IGdyb3VwTXNncztcbiAgfVxuXG4gIGNsb3NlTWVzc2FnZXNNb2RhbCgpIHtcbiAgICB0aGlzLm9uTWVzc2FnZXNDbG9zZSgpO1xuICB9XG5cbiAgdXBkYXRlTW9kYWxTdHlsZXMoKSB7XG4gICAgY29uc3Qgc2NyZWVuV2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICBjb25zdCBtb2RhbFdpZHRoID0gTWF0aC5taW4oMC44ICogc2NyZWVuV2lkdGgsIDQwMCk7XG5cbiAgICB0aGlzLm1vZGFsQ29udGFpbmVyU3R5bGUgPSB7XG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIHRvcDogMCxcbiAgICAgIGxlZnQ6IDAsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdyZ2JhKDAsIDAsIDAsIDAuNSknLFxuICAgICAgZGlzcGxheTogdGhpcy5pc01lc3NhZ2VzTW9kYWxWaXNpYmxlID8gJ2Jsb2NrJyA6ICdub25lJyxcbiAgICAgIHpJbmRleDogOTk5LFxuICAgIH07XG5cbiAgICB0aGlzLm1vZGFsQ29udGVudFN0eWxlID0ge1xuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMTBweCcsXG4gICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICB3aWR0aDogYCR7bW9kYWxXaWR0aH1weGAsXG4gICAgICBtYXhXaWR0aDogYCR7bW9kYWxXaWR0aH1weGAsXG4gICAgICBtYXhIZWlnaHQ6ICc3NSUnLFxuICAgICAgb3ZlcmZsb3dZOiAnYXV0bycsXG4gICAgICBvdmVyZmxvd1g6ICdoaWRkZW4nLFxuICAgICAgdG9wOiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCd0b3AnKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICAgIGJvdHRvbTogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnYm90dG9tJykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICBsZWZ0OiB0aGlzLnBvc2l0aW9uLmluY2x1ZGVzKCdMZWZ0JykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICByaWdodDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnUmlnaHQnKSA/ICcxMHB4JyA6ICdhdXRvJyxcbiAgICB9O1xuICB9XG5cbiAgZ2V0VGFiU3R5bGUodGFiOiBzdHJpbmcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5zdHlsZXMudGFiVGV4dCxcbiAgICAgIC4uLih0aGlzLmFjdGl2ZVRhYiA9PSB0YWIgPyB0aGlzLnN0eWxlcy5hY3RpdmVUYWJUZXh0IDoge30pLFxuICAgICAgLi4uKHRoaXMuYWN0aXZlVGFiID09IHRhYiA/IHsgYmFja2dyb3VuZENvbG9yOiB0aGlzLmFjdGl2ZVRhYkJhY2tncm91bmRDb2xvciB9IDoge30pLFxuICAgIH07XG4gIH1cblxuICBnZXRCdXR0b25DbG9zZVN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLnN0eWxlcy5idG5DbG9zZU1lc3NhZ2VzLFxuICAgICAgbWFyZ2luTGVmdDogdGhpcy5ldmVudFR5cGUgPT0gJ3dlYmluYXInIHx8IHRoaXMuZXZlbnRUeXBlID09ICdjb25mZXJlbmNlJyA/ICcyMCUnIDogJzY1JScsXG4gICAgfTtcbiAgfVxuXG4gIGdldCBzdHlsZXMoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1vZGFsQ29udGVudDoge1xuICAgICAgICBib3JkZXJSYWRpdXM6ICcxMHB4JyxcbiAgICAgICAgcGFkZGluZzogJzEwcHgnLFxuICAgICAgfSxcbiAgICAgIG1vZGFsQm9keToge1xuICAgICAgICBtYXJnaW5Ub3A6ICcxMHB4JyxcbiAgICAgIH0sXG4gICAgICB0YWJUZXh0OiB7XG4gICAgICAgIHBhZGRpbmdSaWdodDogJzEwcHgnLFxuICAgICAgICBwYWRkaW5nTGVmdDogJzEwcHgnLFxuICAgICAgICBwYWRkaW5nVG9wOiAnNXB4JyxcbiAgICAgICAgcGFkZGluZ0JvdHRvbTogJzVweCcsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgbWFyZ2luUmlnaHQ6ICcxMHB4JyxcbiAgICAgICAgbWFyZ2luTGVmdDogJzEwcHgnLFxuICAgICAgfSxcbiAgICAgIGFjdGl2ZVRhYlRleHQ6IHtcbiAgICAgICAgY29sb3I6ICcjZmZmZmZmJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzJiN2NlNScsXG4gICAgICAgIGJvcmRlclJhZGl1czogJzRweCcsXG4gICAgICB9LFxuICAgICAgc2VwYXJhdG9yOiB7XG4gICAgICAgIGhlaWdodDogJzFweCcsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgbWFyZ2luVmVydGljYWw6ICcxcHgnLFxuICAgICAgfSxcbiAgICAgIGJ0bkNsb3NlTWVzc2FnZXM6IHtcbiAgICAgICAgcGFkZGluZzogJzVweCcsXG4gICAgICAgIG1hcmdpblJpZ2h0OiAnMCcsXG4gICAgICAgIHBhZGRpbmdSaWdodDogJzAnLFxuICAgICAgfSxcbiAgICAgIGljb246IHtcbiAgICAgICAgZm9udFNpemU6ICcyNHB4JyxcbiAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICB9LFxuICAgIH07XG4gIH1cbn1cbiIsIjxkaXYgW25nU3R5bGVdPVwibW9kYWxDb250YWluZXJTdHlsZVwiPlxyXG4gIDxkaXYgW25nU3R5bGVdPVwibW9kYWxDb250ZW50U3R5bGVcIj5cclxuICAgIDxkaXZcclxuICAgICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAgIGZsZXhEaXJlY3Rpb246ICdyb3cnLFxyXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnc3BhY2UtYmV0d2VlbicsXHJcbiAgICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcidcclxuICAgICAgfVwiXHJcbiAgICA+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICAqbmdJZj1cImV2ZW50VHlwZSA9PT0gJ3dlYmluYXInIHx8IGV2ZW50VHlwZSA9PT0gJ2NvbmZlcmVuY2UnXCJcclxuICAgICAgICAoY2xpY2spPVwic3dpdGNoVG9EaXJlY3RUYWIoKVwiXHJcbiAgICAgICAgW25nU3R5bGVdPVwiZ2V0VGFiU3R5bGUoJ2RpcmVjdCcpXCJcclxuICAgICAgPlxyXG4gICAgICAgIERpcmVjdFxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPGJ1dHRvblxyXG4gICAgICAgICpuZ0lmPVwiZXZlbnRUeXBlID09PSAnd2ViaW5hcicgfHwgZXZlbnRUeXBlID09PSAnY29uZmVyZW5jZSdcIlxyXG4gICAgICAgIChjbGljayk9XCJzd2l0Y2hUb0dyb3VwVGFiKClcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cImdldFRhYlN0eWxlKCdncm91cCcpXCJcclxuICAgICAgPlxyXG4gICAgICAgIEdyb3VwXHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgICA8c3BhbiAoY2xpY2spPVwiY2xvc2VNZXNzYWdlc01vZGFsKClcIiBbbmdTdHlsZV09XCJnZXRCdXR0b25DbG9zZVN0eWxlKClcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVRpbWVzXCIgY2xhc3M9XCJpY29uXCIgc2l6ZT1cInhsXCI+PC9mYS1pY29uPlxyXG4gICAgICA8L3NwYW4+XHJcbiAgICA8L2Rpdj5cclxuICAgIDxociBbbmdTdHlsZV09XCJzdHlsZXMuc2VwYXJhdG9yXCIgLz5cclxuICAgIDxkaXYgW25nU3R5bGVdPVwic3R5bGVzLm1vZGFsQm9keVwiPlxyXG4gICAgICA8YXBwLW1lc3NhZ2UtcGFuZWxcclxuICAgICAgICAqbmdJZj1cIlxyXG4gICAgICAgICAgYWN0aXZlVGFiID09PSAnZGlyZWN0JyAmJlxyXG4gICAgICAgICAgKGV2ZW50VHlwZSA9PT0gJ3dlYmluYXInIHx8IGV2ZW50VHlwZSA9PT0gJ2NvbmZlcmVuY2UnKVxyXG4gICAgICAgIFwiXHJcbiAgICAgICAgW21lc3NhZ2VzXT1cImRpcmVjdE1lc3NhZ2VzXCJcclxuICAgICAgICBbbWVzc2FnZXNMZW5ndGhdPVwibWVzc2FnZXMubGVuZ3RoXCJcclxuICAgICAgICB0eXBlPVwiZGlyZWN0XCJcclxuICAgICAgICBbb25TZW5kTWVzc2FnZVByZXNzXT1cIm9uU2VuZE1lc3NhZ2VQcmVzc1wiXHJcbiAgICAgICAgW3VzZXJuYW1lXT1cIm1lbWJlclwiXHJcbiAgICAgICAgW2JhY2tncm91bmRDb2xvcl09XCJiYWNrZ3JvdW5kQ29sb3JcIlxyXG4gICAgICAgIFtmb2N1c2VkSW5wdXRdPVwiZm9jdXNlZElucHV0XCJcclxuICAgICAgICBbc2hvd0FsZXJ0XT1cInNob3dBbGVydFwiXHJcbiAgICAgICAgW2V2ZW50VHlwZV09XCJldmVudFR5cGVcIlxyXG4gICAgICAgIFttZW1iZXJdPVwibWVtYmVyXCJcclxuICAgICAgICBbaXNsZXZlbF09XCJpc2xldmVsXCJcclxuICAgICAgICBbY29Ib3N0UmVzcG9uc2liaWxpdHldPVwiY29Ib3N0UmVzcG9uc2liaWxpdHlcIlxyXG4gICAgICAgIFtjb0hvc3RdPVwiY29Ib3N0XCJcclxuICAgICAgICBbZGlyZWN0TWVzc2FnZURldGFpbHNdPVwiZGlyZWN0TWVzc2FnZURldGFpbHNcIlxyXG4gICAgICAgIFt1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2VdPVwidXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlXCJcclxuICAgICAgICBbdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHNdPVwidXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHNcIlxyXG4gICAgICAgIFtyb29tTmFtZV09XCJyb29tTmFtZVwiXHJcbiAgICAgICAgW3NvY2tldF09XCJzb2NrZXRcIlxyXG4gICAgICAgIFtjaGF0U2V0dGluZ109XCJjaGF0U2V0dGluZ1wiXHJcbiAgICAgICAgW3N0YXJ0RGlyZWN0TWVzc2FnZV09XCJzdGFydERpcmVjdE1lc3NhZ2VcIlxyXG4gICAgICA+XHJcbiAgICAgIDwvYXBwLW1lc3NhZ2UtcGFuZWw+XHJcblxyXG4gICAgICA8YXBwLW1lc3NhZ2UtcGFuZWxcclxuICAgICAgICAqbmdJZj1cImFjdGl2ZVRhYiA9PT0gJ2dyb3VwJ1wiXHJcbiAgICAgICAgW21lc3NhZ2VzXT1cImdyb3VwTWVzc2FnZXNcIlxyXG4gICAgICAgIFttZXNzYWdlc0xlbmd0aF09XCJtZXNzYWdlcy5sZW5ndGhcIlxyXG4gICAgICAgIHR5cGU9XCJncm91cFwiXHJcbiAgICAgICAgW29uU2VuZE1lc3NhZ2VQcmVzc109XCJvblNlbmRNZXNzYWdlUHJlc3NcIlxyXG4gICAgICAgIFt1c2VybmFtZV09XCJtZW1iZXJcIlxyXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiYmFja2dyb3VuZENvbG9yXCJcclxuICAgICAgICBbZm9jdXNlZElucHV0XT1cImZvY3VzZWRJbnB1dFwiXHJcbiAgICAgICAgW3Nob3dBbGVydF09XCJzaG93QWxlcnRcIlxyXG4gICAgICAgIFtldmVudFR5cGVdPVwiZXZlbnRUeXBlXCJcclxuICAgICAgICBbbWVtYmVyXT1cIm1lbWJlclwiXHJcbiAgICAgICAgW2lzbGV2ZWxdPVwiaXNsZXZlbFwiXHJcbiAgICAgICAgW2NvSG9zdFJlc3BvbnNpYmlsaXR5XT1cImNvSG9zdFJlc3BvbnNpYmlsaXR5XCJcclxuICAgICAgICBbY29Ib3N0XT1cImNvSG9zdFwiXHJcbiAgICAgICAgW2RpcmVjdE1lc3NhZ2VEZXRhaWxzXT1cImRpcmVjdE1lc3NhZ2VEZXRhaWxzXCJcclxuICAgICAgICBbdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlXT1cInVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZVwiXHJcbiAgICAgICAgW3VwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzXT1cInVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzXCJcclxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWVcIlxyXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0XCJcclxuICAgICAgICBbY2hhdFNldHRpbmddPVwiY2hhdFNldHRpbmdcIlxyXG4gICAgICAgIFtzdGFydERpcmVjdE1lc3NhZ2VdPVwic3RhcnREaXJlY3RNZXNzYWdlXCJcclxuICAgICAgPlxyXG4gICAgICA8L2FwcC1tZXNzYWdlLXBhbmVsPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=