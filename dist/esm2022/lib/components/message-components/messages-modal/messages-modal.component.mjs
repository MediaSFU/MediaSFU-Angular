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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZXMtbW9kYWwuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvbWVzc2FnZS1jb21wb25lbnRzL21lc3NhZ2VzLW1vZGFsL21lc3NhZ2VzLW1vZGFsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21lc3NhZ2UtY29tcG9uZW50cy9tZXNzYWdlcy1tb2RhbC9tZXNzYWdlcy1tb2RhbC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSx5REFBeUQ7QUFDekQsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQW9DLE1BQU0sZUFBZSxDQUFDO0FBQ25GLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUM1RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLDBDQUEwQyxDQUFDOzs7OztBQThDeEUsTUFBTSxPQUFPLGFBQWE7SUFDSjtJQUFwQixZQUFvQixrQkFBK0I7UUFBL0IsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFhO0lBQUcsQ0FBQztJQUU5QyxzQkFBc0IsR0FBRyxLQUFLLENBQUM7SUFDL0IsZUFBZSxHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztJQUMzQixrQkFBa0IsQ0FBa0Q7SUFDcEUsUUFBUSxHQUFjLEVBQUUsQ0FBQztJQUN6QixRQUFRLEdBQUcsVUFBVSxDQUFDO0lBQ3RCLGVBQWUsR0FBRyxTQUFTLENBQUM7SUFDNUIsd0JBQXdCLEdBQUcsU0FBUyxDQUFDO0lBQ3JDLFNBQVMsR0FB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SztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csd0JBQXdCO3NCQUFoQyxLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBQ0csd0JBQXdCO3NCQUFoQyxLQUFLO2dCQUdHLDBCQUEwQjtzQkFBbEMsS0FBSztnQkFHRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cbmltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYVRpbWVzIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IE1lc3NhZ2VQYW5lbCB9IGZyb20gJy4uL21lc3NhZ2UtcGFuZWwvbWVzc2FnZS1wYW5lbC5jb21wb25lbnQnO1xuaW1wb3J0IHtcbiAgQ29Ib3N0UmVzcG9uc2liaWxpdHksXG4gIEV2ZW50VHlwZSxcbiAgTWVzc2FnZSxcbiAgUGFydGljaXBhbnQsXG4gIFNob3dBbGVydCxcbn0gZnJvbSAnLi4vLi4vLi4vQHR5cGVzL3R5cGVzJztcbmltcG9ydCB7XG4gIFNlbmRNZXNzYWdlLFxuICBTZW5kTWVzc2FnZU9wdGlvbnMsXG59IGZyb20gJy4uLy4uLy4uL21ldGhvZHMvbWVzc2FnZS1tZXRob2RzL3NlbmQtbWVzc2FnZS5zZXJ2aWNlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1lc3NhZ2VzTW9kYWxPcHRpb25zIHtcbiAgaXNNZXNzYWdlc01vZGFsVmlzaWJsZTogYm9vbGVhbjtcbiAgb25NZXNzYWdlc0Nsb3NlOiAoKSA9PiB2b2lkO1xuICBvblNlbmRNZXNzYWdlUHJlc3M/OiAob3B0aW9uczogU2VuZE1lc3NhZ2VPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBtZXNzYWdlczogTWVzc2FnZVtdO1xuICBwb3NpdGlvbj86IHN0cmluZztcbiAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xuICBhY3RpdmVUYWJCYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuICBtZW1iZXI6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXTtcbiAgY29Ib3N0OiBzdHJpbmc7XG4gIHN0YXJ0RGlyZWN0TWVzc2FnZTogYm9vbGVhbjtcbiAgZGlyZWN0TWVzc2FnZURldGFpbHM6IFBhcnRpY2lwYW50IHwgbnVsbDtcbiAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlOiAoc3RhcnQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzOiAocGFydGljaXBhbnQ6IFBhcnRpY2lwYW50IHwgbnVsbCkgPT4gdm9pZDtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgY2hhdFNldHRpbmc6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWVzc2FnZXNNb2RhbFR5cGUgPSAob3B0aW9uczogTWVzc2FnZXNNb2RhbE9wdGlvbnMpID0+IHZvaWQ7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tZXNzYWdlcy1tb2RhbCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9tZXNzYWdlcy1tb2RhbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21lc3NhZ2VzLW1vZGFsLmNvbXBvbmVudC5jc3MnXSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGUsIE1lc3NhZ2VQYW5lbF0sXG59KVxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VzTW9kYWwgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgU2VuZE1lc3NhZ2VTZXJ2aWNlOiBTZW5kTWVzc2FnZSkge31cblxuICBASW5wdXQoKSBpc01lc3NhZ2VzTW9kYWxWaXNpYmxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIG9uTWVzc2FnZXNDbG9zZSA9ICgpID0+IHt9O1xuICBASW5wdXQoKSBvblNlbmRNZXNzYWdlUHJlc3MhOiAob3B0aW9uczogU2VuZE1lc3NhZ2VPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBASW5wdXQoKSBtZXNzYWdlczogTWVzc2FnZVtdID0gW107XG4gIEBJbnB1dCgpIHBvc2l0aW9uID0gJ3RvcFJpZ2h0JztcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJyNmNWY1ZjUnO1xuICBASW5wdXQoKSBhY3RpdmVUYWJCYWNrZ3JvdW5kQ29sb3IgPSAnIzJiN2NlNSc7XG4gIEBJbnB1dCgpIGV2ZW50VHlwZTogRXZlbnRUeXBlID0gJ3dlYmluYXInO1xuICBASW5wdXQoKSBtZW1iZXIgPSAnJztcbiAgQElucHV0KCkgaXNsZXZlbCA9ICcnO1xuICBASW5wdXQoKSBjb0hvc3RSZXNwb25zaWJpbGl0eTogQ29Ib3N0UmVzcG9uc2liaWxpdHlbXSA9IFtdO1xuICBASW5wdXQoKSBjb0hvc3QgPSAnJztcbiAgQElucHV0KCkgc3RhcnREaXJlY3RNZXNzYWdlID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRpcmVjdE1lc3NhZ2VEZXRhaWxzOiBQYXJ0aWNpcGFudCB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKSB1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2UgPSAoc3RhcnQ6IGJvb2xlYW4pID0+IHtcbiAgICBjb25zb2xlLmxvZyhzdGFydCk7XG4gIH07XG4gIEBJbnB1dCgpIHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzID0gKHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCB8IG51bGwpID0+IHtcbiAgICBjb25zb2xlLmxvZyhwYXJ0aWNpcGFudCk7XG4gIH07XG4gIEBJbnB1dCgpIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgQElucHV0KCkgcm9vbU5hbWUgPSAnJztcbiAgQElucHV0KCkgc29ja2V0OiBTb2NrZXQgPSB7fSBhcyBTb2NrZXQ7XG4gIEBJbnB1dCgpIGNoYXRTZXR0aW5nID0gJyc7XG5cbiAgZmFUaW1lcyA9IGZhVGltZXM7XG5cbiAgZGlyZWN0TWVzc2FnZXM6IEFycmF5PGFueT4gPSBbXTtcbiAgZ3JvdXBNZXNzYWdlczogQXJyYXk8YW55PiA9IFtdO1xuICBhY3RpdmVUYWIgPSAnZ3JvdXAnO1xuICBmb2N1c2VkSW5wdXQgPSBmYWxzZTtcbiAgcmVSZW5kZXIgPSBmYWxzZTtcblxuICBtb2RhbENvbnRhaW5lclN0eWxlOiBhbnk7XG4gIG1vZGFsQ29udGVudFN0eWxlOiBhbnk7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgaWYgKCF0aGlzLm9uU2VuZE1lc3NhZ2VQcmVzcykge1xuICAgICAgdGhpcy5vblNlbmRNZXNzYWdlUHJlc3MgPSB0aGlzLlNlbmRNZXNzYWdlU2VydmljZS5zZW5kTWVzc2FnZS5iaW5kKHRoaXMuU2VuZE1lc3NhZ2VTZXJ2aWNlKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5ldmVudFR5cGUgPT0gJ3dlYmluYXInIHx8IHRoaXMuZXZlbnRUeXBlID09ICdjb25mZXJlbmNlJykge1xuICAgICAgdGhpcy5hY3RpdmVUYWIgPSAnZGlyZWN0JztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hY3RpdmVUYWIgPSAnZ3JvdXAnO1xuICAgICAgdGhpcy5zd2l0Y2hUb0dyb3VwVGFiKCk7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVNb2RhbFN0eWxlcygpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWydpc01lc3NhZ2VzTW9kYWxWaXNpYmxlJ10pIHtcbiAgICAgIHRoaXMudXBkYXRlTW9kYWxTdHlsZXMoKTtcblxuICAgICAgaWYgKFxuICAgICAgICB0aGlzLmV2ZW50VHlwZSAhPSAnd2ViaW5hcicgJiZcbiAgICAgICAgdGhpcy5ldmVudFR5cGUgIT0gJ2NvbmZlcmVuY2UnICYmXG4gICAgICAgIHRoaXMuYWN0aXZlVGFiID09ICdkaXJlY3QnXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5hY3RpdmVUYWIgPSAnZ3JvdXAnO1xuICAgICAgICB0aGlzLmZvY3VzZWRJbnB1dCA9IGZhbHNlO1xuICAgICAgICB0aGlzLnN3aXRjaFRvR3JvdXBUYWIoKTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5ldmVudFR5cGUgPT0gJ3dlYmluYXInIHx8IHRoaXMuZXZlbnRUeXBlID09ICdjb25mZXJlbmNlJykge1xuICAgICAgICBpZiAodGhpcy5zdGFydERpcmVjdE1lc3NhZ2UgJiYgdGhpcy5kaXJlY3RNZXNzYWdlRGV0YWlscykge1xuICAgICAgICAgIHRoaXMuYWN0aXZlVGFiID0gJ2RpcmVjdCc7XG4gICAgICAgICAgdGhpcy5mb2N1c2VkSW5wdXQgPSB0cnVlO1xuICAgICAgICAgIHRoaXMuc3dpdGNoVG9EaXJlY3RUYWIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc01lc3NhZ2VzTW9kYWxWaXNpYmxlKSB7XG4gICAgICAgIHRoaXMucG9wdWxhdGVNZXNzYWdlcygpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snbWVzc2FnZXMnXSkge1xuICAgICAgdGhpcy5wb3B1bGF0ZU1lc3NhZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgc3dpdGNoVG9EaXJlY3RUYWIoKSB7XG4gICAgdGhpcy5hY3RpdmVUYWIgPSAnZGlyZWN0JztcbiAgICB0aGlzLnJlUmVuZGVyID0gIXRoaXMucmVSZW5kZXI7XG4gIH1cblxuICBzd2l0Y2hUb0dyb3VwVGFiKCkge1xuICAgIHRoaXMuYWN0aXZlVGFiID0gJ2dyb3VwJztcbiAgICB0aGlzLnJlUmVuZGVyID0gIXRoaXMucmVSZW5kZXI7XG4gIH1cblxuICBwb3B1bGF0ZU1lc3NhZ2VzKCkge1xuICAgIGxldCBjaGF0VmFsdWUgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgY2hhdFZhbHVlID1cbiAgICAgICAgdGhpcy5jb0hvc3RSZXNwb25zaWJpbGl0eT8uZmluZCgoaXRlbTogYW55KSA9PiBpdGVtLm5hbWUgPT0gJ2NoYXQnKT8udmFsdWUgfHwgZmFsc2U7XG4gICAgfSBjYXRjaCB7XG4gICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICB9XG5cbiAgICBsZXQgZGlyZWN0TXNncyA9IHRoaXMubWVzc2FnZXMgPyB0aGlzLm1lc3NhZ2VzLmZpbHRlcigobWVzc2FnZSkgPT4gIW1lc3NhZ2UuZ3JvdXApIDogW107XG4gICAgZGlyZWN0TXNncyA9IGRpcmVjdE1zZ3MuZmlsdGVyKFxuICAgICAgKG1lc3NhZ2UpID0+XG4gICAgICAgIG1lc3NhZ2Uuc2VuZGVyID09IHRoaXMubWVtYmVyIHx8XG4gICAgICAgIG1lc3NhZ2UucmVjZWl2ZXJzLmluY2x1ZGVzKHRoaXMubWVtYmVyKSB8fFxuICAgICAgICB0aGlzLmlzbGV2ZWwgPT0gJzInIHx8XG4gICAgICAgICh0aGlzLmNvSG9zdCA9PSB0aGlzLm1lbWJlciAmJiBjaGF0VmFsdWUgPT0gdHJ1ZSksXG4gICAgKTtcbiAgICB0aGlzLmRpcmVjdE1lc3NhZ2VzID0gZGlyZWN0TXNncztcblxuICAgIGNvbnN0IGdyb3VwTXNncyA9IHRoaXMubWVzc2FnZXMgPyB0aGlzLm1lc3NhZ2VzLmZpbHRlcigobWVzc2FnZSkgPT4gbWVzc2FnZS5ncm91cCkgOiBbXTtcbiAgICB0aGlzLmdyb3VwTWVzc2FnZXMgPSBncm91cE1zZ3M7XG4gIH1cblxuICBjbG9zZU1lc3NhZ2VzTW9kYWwoKSB7XG4gICAgdGhpcy5vbk1lc3NhZ2VzQ2xvc2UoKTtcbiAgfVxuXG4gIHVwZGF0ZU1vZGFsU3R5bGVzKCkge1xuICAgIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG4gICAgY29uc3QgbW9kYWxXaWR0aCA9IE1hdGgubWluKDAuOCAqIHNjcmVlbldpZHRoLCA0MDApO1xuXG4gICAgdGhpcy5tb2RhbENvbnRhaW5lclN0eWxlID0ge1xuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICB0b3A6IDAsXG4gICAgICBsZWZ0OiAwLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAncmdiYSgwLCAwLCAwLCAwLjUpJyxcbiAgICAgIGRpc3BsYXk6IHRoaXMuaXNNZXNzYWdlc01vZGFsVmlzaWJsZSA/ICdibG9jaycgOiAnbm9uZScsXG4gICAgICB6SW5kZXg6IDk5OSxcbiAgICB9O1xuXG4gICAgdGhpcy5tb2RhbENvbnRlbnRTdHlsZSA9IHtcbiAgICAgIHBvc2l0aW9uOiAnZml4ZWQnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmJhY2tncm91bmRDb2xvcixcbiAgICAgIGJvcmRlclJhZGl1czogJzEwcHgnLFxuICAgICAgcGFkZGluZzogJzEwcHgnLFxuICAgICAgd2lkdGg6IGAke21vZGFsV2lkdGh9cHhgLFxuICAgICAgbWF4V2lkdGg6IGAke21vZGFsV2lkdGh9cHhgLFxuICAgICAgbWF4SGVpZ2h0OiAnNzUlJyxcbiAgICAgIG92ZXJmbG93WTogJ2F1dG8nLFxuICAgICAgb3ZlcmZsb3dYOiAnaGlkZGVuJyxcbiAgICAgIHRvcDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygndG9wJykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgICBib3R0b206IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ2JvdHRvbScpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgbGVmdDogdGhpcy5wb3NpdGlvbi5pbmNsdWRlcygnTGVmdCcpID8gJzEwcHgnIDogJ2F1dG8nLFxuICAgICAgcmlnaHQ6IHRoaXMucG9zaXRpb24uaW5jbHVkZXMoJ1JpZ2h0JykgPyAnMTBweCcgOiAnYXV0bycsXG4gICAgfTtcbiAgfVxuXG4gIGdldFRhYlN0eWxlKHRhYjogc3RyaW5nKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuc3R5bGVzLnRhYlRleHQsXG4gICAgICAuLi4odGhpcy5hY3RpdmVUYWIgPT0gdGFiID8gdGhpcy5zdHlsZXMuYWN0aXZlVGFiVGV4dCA6IHt9KSxcbiAgICAgIC4uLih0aGlzLmFjdGl2ZVRhYiA9PSB0YWIgPyB7IGJhY2tncm91bmRDb2xvcjogdGhpcy5hY3RpdmVUYWJCYWNrZ3JvdW5kQ29sb3IgfSA6IHt9KSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0QnV0dG9uQ2xvc2VTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5zdHlsZXMuYnRuQ2xvc2VNZXNzYWdlcyxcbiAgICAgIG1hcmdpbkxlZnQ6IHRoaXMuZXZlbnRUeXBlID09ICd3ZWJpbmFyJyB8fCB0aGlzLmV2ZW50VHlwZSA9PSAnY29uZmVyZW5jZScgPyAnMjAlJyA6ICc2NSUnLFxuICAgIH07XG4gIH1cblxuICBnZXQgc3R5bGVzKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtb2RhbENvbnRlbnQ6IHtcbiAgICAgICAgYm9yZGVyUmFkaXVzOiAnMTBweCcsXG4gICAgICAgIHBhZGRpbmc6ICcxMHB4JyxcbiAgICAgIH0sXG4gICAgICBtb2RhbEJvZHk6IHtcbiAgICAgICAgbWFyZ2luVG9wOiAnMTBweCcsXG4gICAgICB9LFxuICAgICAgdGFiVGV4dDoge1xuICAgICAgICBwYWRkaW5nUmlnaHQ6ICcxMHB4JyxcbiAgICAgICAgcGFkZGluZ0xlZnQ6ICcxMHB4JyxcbiAgICAgICAgcGFkZGluZ1RvcDogJzVweCcsXG4gICAgICAgIHBhZGRpbmdCb3R0b206ICc1cHgnLFxuICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgIG1hcmdpblJpZ2h0OiAnMTBweCcsXG4gICAgICAgIG1hcmdpbkxlZnQ6ICcxMHB4JyxcbiAgICAgIH0sXG4gICAgICBhY3RpdmVUYWJUZXh0OiB7XG4gICAgICAgIGNvbG9yOiAnI2ZmZmZmZicsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMyYjdjZTUnLFxuICAgICAgICBib3JkZXJSYWRpdXM6ICc0cHgnLFxuICAgICAgfSxcbiAgICAgIHNlcGFyYXRvcjoge1xuICAgICAgICBoZWlnaHQ6ICcxcHgnLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdibGFjaycsXG4gICAgICAgIG1hcmdpblZlcnRpY2FsOiAnMXB4JyxcbiAgICAgIH0sXG4gICAgICBidG5DbG9zZU1lc3NhZ2VzOiB7XG4gICAgICAgIHBhZGRpbmc6ICc1cHgnLFxuICAgICAgICBtYXJnaW5SaWdodDogJzAnLFxuICAgICAgICBwYWRkaW5nUmlnaHQ6ICcwJyxcbiAgICAgIH0sXG4gICAgICBpY29uOiB7XG4gICAgICAgIGZvbnRTaXplOiAnMjRweCcsXG4gICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG59XG4iLCI8ZGl2IFtuZ1N0eWxlXT1cIm1vZGFsQ29udGFpbmVyU3R5bGVcIj5cclxuICA8ZGl2IFtuZ1N0eWxlXT1cIm1vZGFsQ29udGVudFN0eWxlXCI+XHJcbiAgICA8ZGl2XHJcbiAgICAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgICBmbGV4RGlyZWN0aW9uOiAncm93JyxcclxuICAgICAgICBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLFxyXG4gICAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInXHJcbiAgICAgIH1cIlxyXG4gICAgPlxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgKm5nSWY9XCJldmVudFR5cGUgPT09ICd3ZWJpbmFyJyB8fCBldmVudFR5cGUgPT09ICdjb25mZXJlbmNlJ1wiXHJcbiAgICAgICAgKGNsaWNrKT1cInN3aXRjaFRvRGlyZWN0VGFiKClcIlxyXG4gICAgICAgIFtuZ1N0eWxlXT1cImdldFRhYlN0eWxlKCdkaXJlY3QnKVwiXHJcbiAgICAgID5cclxuICAgICAgICBEaXJlY3RcclxuICAgICAgPC9idXR0b24+XHJcbiAgICAgIDxidXR0b25cclxuICAgICAgICAqbmdJZj1cImV2ZW50VHlwZSA9PT0gJ3dlYmluYXInIHx8IGV2ZW50VHlwZSA9PT0gJ2NvbmZlcmVuY2UnXCJcclxuICAgICAgICAoY2xpY2spPVwic3dpdGNoVG9Hcm91cFRhYigpXCJcclxuICAgICAgICBbbmdTdHlsZV09XCJnZXRUYWJTdHlsZSgnZ3JvdXAnKVwiXHJcbiAgICAgID5cclxuICAgICAgICBHcm91cFxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgICAgPHNwYW4gKGNsaWNrKT1cImNsb3NlTWVzc2FnZXNNb2RhbCgpXCIgW25nU3R5bGVdPVwiZ2V0QnV0dG9uQ2xvc2VTdHlsZSgpXCI+XHJcbiAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFUaW1lc1wiIGNsYXNzPVwiaWNvblwiIHNpemU9XCJ4bFwiPjwvZmEtaWNvbj5cclxuICAgICAgPC9zcGFuPlxyXG4gICAgPC9kaXY+XHJcbiAgICA8aHIgW25nU3R5bGVdPVwic3R5bGVzLnNlcGFyYXRvclwiIC8+XHJcbiAgICA8ZGl2IFtuZ1N0eWxlXT1cInN0eWxlcy5tb2RhbEJvZHlcIj5cclxuICAgICAgPGFwcC1tZXNzYWdlLXBhbmVsXHJcbiAgICAgICAgKm5nSWY9XCJcclxuICAgICAgICAgIGFjdGl2ZVRhYiA9PT0gJ2RpcmVjdCcgJiZcclxuICAgICAgICAgIChldmVudFR5cGUgPT09ICd3ZWJpbmFyJyB8fCBldmVudFR5cGUgPT09ICdjb25mZXJlbmNlJylcclxuICAgICAgICBcIlxyXG4gICAgICAgIFttZXNzYWdlc109XCJkaXJlY3RNZXNzYWdlc1wiXHJcbiAgICAgICAgW21lc3NhZ2VzTGVuZ3RoXT1cIm1lc3NhZ2VzLmxlbmd0aFwiXHJcbiAgICAgICAgdHlwZT1cImRpcmVjdFwiXHJcbiAgICAgICAgW29uU2VuZE1lc3NhZ2VQcmVzc109XCJvblNlbmRNZXNzYWdlUHJlc3NcIlxyXG4gICAgICAgIFt1c2VybmFtZV09XCJtZW1iZXJcIlxyXG4gICAgICAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiYmFja2dyb3VuZENvbG9yXCJcclxuICAgICAgICBbZm9jdXNlZElucHV0XT1cImZvY3VzZWRJbnB1dFwiXHJcbiAgICAgICAgW3Nob3dBbGVydF09XCJzaG93QWxlcnRcIlxyXG4gICAgICAgIFtldmVudFR5cGVdPVwiZXZlbnRUeXBlXCJcclxuICAgICAgICBbbWVtYmVyXT1cIm1lbWJlclwiXHJcbiAgICAgICAgW2lzbGV2ZWxdPVwiaXNsZXZlbFwiXHJcbiAgICAgICAgW2NvSG9zdFJlc3BvbnNpYmlsaXR5XT1cImNvSG9zdFJlc3BvbnNpYmlsaXR5XCJcclxuICAgICAgICBbY29Ib3N0XT1cImNvSG9zdFwiXHJcbiAgICAgICAgW2RpcmVjdE1lc3NhZ2VEZXRhaWxzXT1cImRpcmVjdE1lc3NhZ2VEZXRhaWxzXCJcclxuICAgICAgICBbdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlXT1cInVwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZVwiXHJcbiAgICAgICAgW3VwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzXT1cInVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzXCJcclxuICAgICAgICBbcm9vbU5hbWVdPVwicm9vbU5hbWVcIlxyXG4gICAgICAgIFtzb2NrZXRdPVwic29ja2V0XCJcclxuICAgICAgICBbY2hhdFNldHRpbmddPVwiY2hhdFNldHRpbmdcIlxyXG4gICAgICAgIFtzdGFydERpcmVjdE1lc3NhZ2VdPVwic3RhcnREaXJlY3RNZXNzYWdlXCJcclxuICAgICAgPlxyXG4gICAgICA8L2FwcC1tZXNzYWdlLXBhbmVsPlxyXG5cclxuICAgICAgPGFwcC1tZXNzYWdlLXBhbmVsXHJcbiAgICAgICAgKm5nSWY9XCJhY3RpdmVUYWIgPT09ICdncm91cCdcIlxyXG4gICAgICAgIFttZXNzYWdlc109XCJncm91cE1lc3NhZ2VzXCJcclxuICAgICAgICBbbWVzc2FnZXNMZW5ndGhdPVwibWVzc2FnZXMubGVuZ3RoXCJcclxuICAgICAgICB0eXBlPVwiZ3JvdXBcIlxyXG4gICAgICAgIFtvblNlbmRNZXNzYWdlUHJlc3NdPVwib25TZW5kTWVzc2FnZVByZXNzXCJcclxuICAgICAgICBbdXNlcm5hbWVdPVwibWVtYmVyXCJcclxuICAgICAgICBbYmFja2dyb3VuZENvbG9yXT1cImJhY2tncm91bmRDb2xvclwiXHJcbiAgICAgICAgW2ZvY3VzZWRJbnB1dF09XCJmb2N1c2VkSW5wdXRcIlxyXG4gICAgICAgIFtzaG93QWxlcnRdPVwic2hvd0FsZXJ0XCJcclxuICAgICAgICBbZXZlbnRUeXBlXT1cImV2ZW50VHlwZVwiXHJcbiAgICAgICAgW21lbWJlcl09XCJtZW1iZXJcIlxyXG4gICAgICAgIFtpc2xldmVsXT1cImlzbGV2ZWxcIlxyXG4gICAgICAgIFtjb0hvc3RSZXNwb25zaWJpbGl0eV09XCJjb0hvc3RSZXNwb25zaWJpbGl0eVwiXHJcbiAgICAgICAgW2NvSG9zdF09XCJjb0hvc3RcIlxyXG4gICAgICAgIFtkaXJlY3RNZXNzYWdlRGV0YWlsc109XCJkaXJlY3RNZXNzYWdlRGV0YWlsc1wiXHJcbiAgICAgICAgW3VwZGF0ZVN0YXJ0RGlyZWN0TWVzc2FnZV09XCJ1cGRhdGVTdGFydERpcmVjdE1lc3NhZ2VcIlxyXG4gICAgICAgIFt1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsc109XCJ1cGRhdGVEaXJlY3RNZXNzYWdlRGV0YWlsc1wiXHJcbiAgICAgICAgW3Jvb21OYW1lXT1cInJvb21OYW1lXCJcclxuICAgICAgICBbc29ja2V0XT1cInNvY2tldFwiXHJcbiAgICAgICAgW2NoYXRTZXR0aW5nXT1cImNoYXRTZXR0aW5nXCJcclxuICAgICAgICBbc3RhcnREaXJlY3RNZXNzYWdlXT1cInN0YXJ0RGlyZWN0TWVzc2FnZVwiXHJcbiAgICAgID5cclxuICAgICAgPC9hcHAtbWVzc2FnZS1wYW5lbD5cclxuICAgIDwvZGl2PlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19