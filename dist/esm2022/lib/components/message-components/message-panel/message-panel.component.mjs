import { Component, Input } from '@angular/core';
import { faPaperPlane, faReply } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
/**
 * @fileoverview MessagePanel component for handling message interactions in the MediaSFU-Angular application.
 *
 * @component
 * @selector app-message-panel
 * @templateUrl ./message-panel.component.html
 * @styleUrls ['./message-panel.component.css']
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, FormsModule]
 *
 * @description
 * The MessagePanel component is responsible for displaying and managing messages in a chat interface.
 * It supports both group and direct messaging, and includes various input properties to customize its behavior.
 *
 * @property {Array<any>} messages - Array of messages to be displayed.
 * @property {number} messagesLength - The length of the messages array.
 * @property {string} type - The type of chat, either 'group' or 'direct'.
 * @property {string} username - The username of the current user.
 * @property {(options: SendMessageOptions) => Promise<void>} onSendMessagePress - Function to handle sending messages.
 * @property {string} backgroundColor - Background color of the message panel.
 * @property {boolean} focusedInput - Indicates if the input field is focused.
 * @property {EventType} eventType - The type of event, e.g., 'webinar'.
 * @property {string} member - The member associated with the chat.
 * @property {string} islevel - The level of the user.
 * @property {boolean} startDirectMessage - Indicates if a direct message should be started.
 * @property {(start: boolean) => void} updateStartDirectMessage - Function to update the startDirectMessage state.
 * @property {Participant | null} directMessageDetails - Details of the participant for direct messaging.
 * @property {(participant: Participant | null) => void} updateDirectMessageDetails - Function to update directMessageDetails.
 * @property {CoHostResponsibility[]} coHostResponsibility - Array of co-host responsibilities.
 * @property {string} coHost - The co-host of the chat.
 * @property {string} roomName - The name of the chat room.
 * @property {Socket} socket - The socket connection for real-time communication.
 * @property {string} chatSetting - Settings for the chat.
 * @property {ShowAlert} [showAlert] - Optional function to show alerts.
 *
 * @property {IconDefinition} faPaperPlane - FontAwesome icon for paper plane.
 * @property {IconDefinition} faReply - FontAwesome icon for reply.
 *
 * @property {any} replyInfo - Information about the reply.
 * @property {string | null} senderId - ID of the sender.
 * @property {string} directMessageText - Text of the direct message.
 * @property {string} groupMessageText - Text of the group message.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method defaultSendMessage - Default implementation for sending a message.
 * @method handleTextInputChange - Handles changes in the text input field.
 * @method openReplyInput - Opens the reply input for a specific sender.
 * @method handleSendButton - Handles the send button click event.
 */
export class MessagePanel {
    messages = [];
    messagesLength = 0;
    type = 'group';
    username = '';
    onSendMessagePress;
    backgroundColor = '#f5f5f5';
    focusedInput = false;
    eventType = 'webinar';
    member = '';
    islevel = '';
    startDirectMessage = false;
    updateStartDirectMessage;
    directMessageDetails = null;
    updateDirectMessageDetails;
    coHostResponsibility = [];
    coHost = '';
    roomName = '';
    socket = {};
    chatSetting = '';
    showAlert;
    faPaperPlane = faPaperPlane;
    faReply = faReply;
    replyInfo = null;
    senderId = null;
    directMessageText = '';
    groupMessageText = '';
    ngOnInit() {
        if (!this.onSendMessagePress) {
            this.onSendMessagePress = this.defaultSendMessage.bind(this);
        }
    }
    defaultSendMessage() {
        // Default send message implementation
        return Promise.resolve();
    }
    handleTextInputChange(event) {
        const text = event.target.value;
        if (this.type === 'direct') {
            this.directMessageText = text;
        }
        else {
            this.groupMessageText = text;
        }
    }
    ngOnChanges() {
        if (this.startDirectMessage && this.directMessageDetails) {
            this.openReplyInput(this.directMessageDetails['name']);
        }
    }
    openReplyInput(senderId) {
        this.replyInfo = {
            text: 'Replying to: ',
            username: senderId,
        };
        this.senderId = senderId;
    }
    async handleSendButton() {
        const message = this.type === 'direct' ? this.directMessageText : this.groupMessageText;
        if (!message) {
            this.showAlert?.({ message: 'Please enter a message', type: 'danger' });
            return;
        }
        if (message.length > 350) {
            this.showAlert?.({ message: 'Message is too long.', type: 'danger' });
            return;
        }
        if (message.trim() === '') {
            this.showAlert?.({ message: 'Message cannot be empty.', type: 'danger' });
            return;
        }
        if (this.type === 'direct' && !this.senderId && this.islevel == '2') {
            this.showAlert?.({ message: 'Please select a user to send a message to.', type: 'danger' });
            return;
        }
        await this.onSendMessagePress({
            message,
            receivers: this.type === 'direct' && this.senderId ? [this.senderId] : [],
            group: this.type === 'group',
            messagesLength: this.messagesLength,
            member: this.member,
            sender: this.username,
            islevel: this.islevel,
            showAlert: this.showAlert,
            coHostResponsibility: this.coHostResponsibility,
            coHost: this.coHost,
            roomName: this.roomName,
            socket: this.socket,
            chatSetting: this.chatSetting,
        });
        if (this.type === 'direct') {
            this.directMessageText = '';
        }
        else {
            this.groupMessageText = '';
        }
        this.replyInfo = null;
        this.senderId = null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MessagePanel, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MessagePanel, isStandalone: true, selector: "app-message-panel", inputs: { messages: "messages", messagesLength: "messagesLength", type: "type", username: "username", onSendMessagePress: "onSendMessagePress", backgroundColor: "backgroundColor", focusedInput: "focusedInput", eventType: "eventType", member: "member", islevel: "islevel", startDirectMessage: "startDirectMessage", updateStartDirectMessage: "updateStartDirectMessage", directMessageDetails: "directMessageDetails", updateDirectMessageDetails: "updateDirectMessageDetails", coHostResponsibility: "coHostResponsibility", coHost: "coHost", roomName: "roomName", socket: "socket", chatSetting: "chatSetting", showAlert: "showAlert" }, usesOnChanges: true, ngImport: i0, template: "<div [style.maxHeight]=\"'100%'\" [style.backgroundColor]=\"backgroundColor\" style=\"overflow-y: auto;\">\r\n  <!-- Message rendering logic -->\r\n  <div *ngFor=\"let message of messages; let index = index\" [ngStyle]=\"{ marginBottom: '10px' }\">\r\n    <div [ngStyle]=\"{ display: 'flex', flexDirection: 'column', alignItems: message.sender === username ? 'flex-end' : 'flex-start', marginBottom: '10px' }\">\r\n      <div [ngStyle]=\"{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '3px' }\">\r\n        <span *ngIf=\"message.sender === username && !message.group\" [ngStyle]=\"{ fontWeight: 'bold', color: 'black', fontSize: '8px', marginLeft: '6px' }\">To: {{ message.receivers.join(', ') }}</span>\r\n        <span [ngStyle]=\"{ fontWeight: 'bold', color: 'black', fontSize: '8px', marginRight: '10px' }\">{{ message.sender === username ? '' : message.sender }}</span>\r\n        <span [ngStyle]=\"{ fontSize: '8px', color: '#0D0D0DFF' }\">{{ message.timestamp }}</span>\r\n        <div *ngIf=\"message.sender !== username && !message.group\" (click)=\"openReplyInput(message.sender)\" [ngStyle]=\"{ padding: '1px', marginLeft: '5px', borderRadius: '2px', backgroundColor: 'transparent' }\">\r\n          <fa-icon [icon]=\"faReply\" size=\"xs\" color=\"black\"></fa-icon>\r\n        </div>\r\n      </div>\r\n      <div [ngStyle]=\"{ backgroundColor: message.sender === member ? '#DCF8C6' : '#1ce5c7', padding: '10px', borderRadius: '10px' }\">\r\n        <span [ngStyle]=\"{ color: 'black' }\">{{ message.message }}</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Reply info -->\r\n  <div *ngIf=\"replyInfo\" [ngStyle]=\"{ flexDirection: 'row', alignItems: 'center', padding: '2px', backgroundColor: '#e6e6e6', borderRadius: '5px', marginBottom: '1px' }\">\r\n    <span [ngStyle]=\"{ fontWeight: 'bold', marginRight: '2px', fontSize: '8px' }\">Replying to: </span>\r\n    <span [ngStyle]=\"{ color: 'red', fontSize: '8px' }\">{{ replyInfo.username }}</span>\r\n  </div>\r\n\r\n  <!-- Input area -->\r\n  <div [ngStyle]=\"{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', marginTop: 'auto' }\">\r\n    <input\r\n      type=\"text\"\r\n      [ngStyle]=\"{ flex: 1, minHeight: '40px', maxHeight: '80px', resize: 'vertical', border: '1px solid gray', borderRadius: '5px', padding: '10px', overflowY: 'auto' }\"\r\n      placeholder=\"{{ type === 'direct' ? (focusedInput && startDirectMessage && directMessageDetails ? 'Send a direct message to ' + directMessageDetails.name : 'Select a message to reply to') : (eventType === 'chat' ? 'Send a message' : 'Send a message to everyone') }}\"\r\n      maxLength=\"350\"\r\n      (input)=\"handleTextInputChange($event)\"\r\n      [value]=\"type === 'direct' ? directMessageText : groupMessageText\"\r\n    />\r\n    <button [ngStyle]=\"{ backgroundColor: '#83c0e9', padding: '10px', borderRadius: '5px', display: 'flex', alignItems: 'center' }\" (click)=\"handleSendButton()\">\r\n      <fa-icon [icon]=\"faPaperPlane\" size=\"sm\" color=\"white\"></fa-icon>\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [""], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }, { kind: "ngmodule", type: FormsModule }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MessagePanel, decorators: [{
            type: Component,
            args: [{ selector: 'app-message-panel', standalone: true, imports: [CommonModule, FontAwesomeModule, FormsModule], template: "<div [style.maxHeight]=\"'100%'\" [style.backgroundColor]=\"backgroundColor\" style=\"overflow-y: auto;\">\r\n  <!-- Message rendering logic -->\r\n  <div *ngFor=\"let message of messages; let index = index\" [ngStyle]=\"{ marginBottom: '10px' }\">\r\n    <div [ngStyle]=\"{ display: 'flex', flexDirection: 'column', alignItems: message.sender === username ? 'flex-end' : 'flex-start', marginBottom: '10px' }\">\r\n      <div [ngStyle]=\"{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '3px' }\">\r\n        <span *ngIf=\"message.sender === username && !message.group\" [ngStyle]=\"{ fontWeight: 'bold', color: 'black', fontSize: '8px', marginLeft: '6px' }\">To: {{ message.receivers.join(', ') }}</span>\r\n        <span [ngStyle]=\"{ fontWeight: 'bold', color: 'black', fontSize: '8px', marginRight: '10px' }\">{{ message.sender === username ? '' : message.sender }}</span>\r\n        <span [ngStyle]=\"{ fontSize: '8px', color: '#0D0D0DFF' }\">{{ message.timestamp }}</span>\r\n        <div *ngIf=\"message.sender !== username && !message.group\" (click)=\"openReplyInput(message.sender)\" [ngStyle]=\"{ padding: '1px', marginLeft: '5px', borderRadius: '2px', backgroundColor: 'transparent' }\">\r\n          <fa-icon [icon]=\"faReply\" size=\"xs\" color=\"black\"></fa-icon>\r\n        </div>\r\n      </div>\r\n      <div [ngStyle]=\"{ backgroundColor: message.sender === member ? '#DCF8C6' : '#1ce5c7', padding: '10px', borderRadius: '10px' }\">\r\n        <span [ngStyle]=\"{ color: 'black' }\">{{ message.message }}</span>\r\n      </div>\r\n    </div>\r\n  </div>\r\n\r\n  <!-- Reply info -->\r\n  <div *ngIf=\"replyInfo\" [ngStyle]=\"{ flexDirection: 'row', alignItems: 'center', padding: '2px', backgroundColor: '#e6e6e6', borderRadius: '5px', marginBottom: '1px' }\">\r\n    <span [ngStyle]=\"{ fontWeight: 'bold', marginRight: '2px', fontSize: '8px' }\">Replying to: </span>\r\n    <span [ngStyle]=\"{ color: 'red', fontSize: '8px' }\">{{ replyInfo.username }}</span>\r\n  </div>\r\n\r\n  <!-- Input area -->\r\n  <div [ngStyle]=\"{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px', marginTop: 'auto' }\">\r\n    <input\r\n      type=\"text\"\r\n      [ngStyle]=\"{ flex: 1, minHeight: '40px', maxHeight: '80px', resize: 'vertical', border: '1px solid gray', borderRadius: '5px', padding: '10px', overflowY: 'auto' }\"\r\n      placeholder=\"{{ type === 'direct' ? (focusedInput && startDirectMessage && directMessageDetails ? 'Send a direct message to ' + directMessageDetails.name : 'Select a message to reply to') : (eventType === 'chat' ? 'Send a message' : 'Send a message to everyone') }}\"\r\n      maxLength=\"350\"\r\n      (input)=\"handleTextInputChange($event)\"\r\n      [value]=\"type === 'direct' ? directMessageText : groupMessageText\"\r\n    />\r\n    <button [ngStyle]=\"{ backgroundColor: '#83c0e9', padding: '10px', borderRadius: '5px', display: 'flex', alignItems: 'center' }\" (click)=\"handleSendButton()\">\r\n      <fa-icon [icon]=\"faPaperPlane\" size=\"sm\" color=\"white\"></fa-icon>\r\n    </button>\r\n  </div>\r\n</div>\r\n" }]
        }], propDecorators: { messages: [{
                type: Input
            }], messagesLength: [{
                type: Input
            }], type: [{
                type: Input
            }], username: [{
                type: Input
            }], onSendMessagePress: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], focusedInput: [{
                type: Input
            }], eventType: [{
                type: Input
            }], member: [{
                type: Input
            }], islevel: [{
                type: Input
            }], startDirectMessage: [{
                type: Input
            }], updateStartDirectMessage: [{
                type: Input
            }], directMessageDetails: [{
                type: Input
            }], updateDirectMessageDetails: [{
                type: Input
            }], coHostResponsibility: [{
                type: Input
            }], coHost: [{
                type: Input
            }], roomName: [{
                type: Input
            }], socket: [{
                type: Input
            }], chatSetting: [{
                type: Input
            }], showAlert: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS1wYW5lbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9tZXNzYWdlLWNvbXBvbmVudHMvbWVzc2FnZS1wYW5lbC9tZXNzYWdlLXBhbmVsLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21lc3NhZ2UtY29tcG9uZW50cy9tZXNzYWdlLXBhbmVsL21lc3NhZ2UtcGFuZWwuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQXFCLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDMUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7OztBQW1DN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdERztBQVFILE1BQU0sT0FBTyxZQUFZO0lBQ2QsUUFBUSxHQUFlLEVBQUUsQ0FBQztJQUMxQixjQUFjLEdBQUcsQ0FBQyxDQUFDO0lBQ25CLElBQUksR0FBRyxPQUFPLENBQUM7SUFDZixRQUFRLEdBQUcsRUFBRSxDQUFDO0lBQ2Qsa0JBQWtCLENBQWtEO0lBQ3BFLGVBQWUsR0FBRyxTQUFTLENBQUM7SUFDNUIsWUFBWSxHQUFHLEtBQUssQ0FBQztJQUNyQixTQUFTLEdBQWMsU0FBUyxDQUFDO0lBQ2pDLE1BQU0sR0FBRyxFQUFFLENBQUM7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SSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO0lBQ3ZCLENBQUM7dUdBL0dVLFlBQVk7MkZBQVosWUFBWSx3dEJDL0Z6QixrbEdBdUNBLHlERHNEWSxZQUFZLG9WQUFFLGlCQUFpQiw0UEFBRSxXQUFXOzsyRkFFM0MsWUFBWTtrQkFQeEIsU0FBUzsrQkFDRSxtQkFBbUIsY0FHakIsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLFdBQVcsQ0FBQzs4QkFHOUMsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxjQUFjO3NCQUF0QixLQUFLO2dCQUNHLElBQUk7c0JBQVosS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUs7Z0JBQ0csT0FBTztzQkFBZixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyx3QkFBd0I7c0JBQWhDLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUNHLDBCQUEwQjtzQkFBbEMsS0FBSztnQkFDRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25DaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYVBhcGVyUGxhbmUsIGZhUmVwbHkgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBTZW5kTWVzc2FnZU9wdGlvbnMgfSBmcm9tICcuLi8uLi8uLi9tZXRob2RzL21lc3NhZ2UtbWV0aG9kcy9zZW5kLW1lc3NhZ2Uuc2VydmljZSc7XG5pbXBvcnQge1xuICBDb0hvc3RSZXNwb25zaWJpbGl0eSxcbiAgRXZlbnRUeXBlLFxuICBNZXNzYWdlLFxuICBQYXJ0aWNpcGFudCxcbiAgU2hvd0FsZXJ0LFxufSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVzc2FnZVBhbmVsT3B0aW9ucyB7XG4gIG1lc3NhZ2VzOiBNZXNzYWdlW107XG4gIG1lc3NhZ2VzTGVuZ3RoOiBudW1iZXI7XG4gIHR5cGU6IHN0cmluZztcbiAgdXNlcm5hbWU6IHN0cmluZztcbiAgb25TZW5kTWVzc2FnZVByZXNzOiAob3B0aW9uczogU2VuZE1lc3NhZ2VPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBmb2N1c2VkSW5wdXQ6IGJvb2xlYW47XG4gIHNob3dBbGVydD86IFNob3dBbGVydDtcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG4gIG1lbWJlcjogc3RyaW5nO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHN0YXJ0RGlyZWN0TWVzc2FnZTogYm9vbGVhbjtcbiAgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlOiAoc3RhcnQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gIGRpcmVjdE1lc3NhZ2VEZXRhaWxzOiBQYXJ0aWNpcGFudCB8IG51bGw7XG4gIHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzOiAocGFydGljaXBhbnQ6IFBhcnRpY2lwYW50IHwgbnVsbCkgPT4gdm9pZDtcbiAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IENvSG9zdFJlc3BvbnNpYmlsaXR5W107XG4gIGNvSG9zdDogc3RyaW5nO1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgY2hhdFNldHRpbmc6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTWVzc2FnZVBhbmVsVHlwZSA9IChvcHRpb25zOiBNZXNzYWdlUGFuZWxPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBAZmlsZW92ZXJ2aWV3IE1lc3NhZ2VQYW5lbCBjb21wb25lbnQgZm9yIGhhbmRsaW5nIG1lc3NhZ2UgaW50ZXJhY3Rpb25zIGluIHRoZSBNZWRpYVNGVS1Bbmd1bGFyIGFwcGxpY2F0aW9uLlxuICpcbiAqIEBjb21wb25lbnRcbiAqIEBzZWxlY3RvciBhcHAtbWVzc2FnZS1wYW5lbFxuICogQHRlbXBsYXRlVXJsIC4vbWVzc2FnZS1wYW5lbC5jb21wb25lbnQuaHRtbFxuICogQHN0eWxlVXJscyBbJy4vbWVzc2FnZS1wYW5lbC5jb21wb25lbnQuY3NzJ11cbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlLCBGb3Jtc01vZHVsZV1cbiAqXG4gKiBAZGVzY3JpcHRpb25cbiAqIFRoZSBNZXNzYWdlUGFuZWwgY29tcG9uZW50IGlzIHJlc3BvbnNpYmxlIGZvciBkaXNwbGF5aW5nIGFuZCBtYW5hZ2luZyBtZXNzYWdlcyBpbiBhIGNoYXQgaW50ZXJmYWNlLlxuICogSXQgc3VwcG9ydHMgYm90aCBncm91cCBhbmQgZGlyZWN0IG1lc3NhZ2luZywgYW5kIGluY2x1ZGVzIHZhcmlvdXMgaW5wdXQgcHJvcGVydGllcyB0byBjdXN0b21pemUgaXRzIGJlaGF2aW9yLlxuICpcbiAqIEBwcm9wZXJ0eSB7QXJyYXk8YW55Pn0gbWVzc2FnZXMgLSBBcnJheSBvZiBtZXNzYWdlcyB0byBiZSBkaXNwbGF5ZWQuXG4gKiBAcHJvcGVydHkge251bWJlcn0gbWVzc2FnZXNMZW5ndGggLSBUaGUgbGVuZ3RoIG9mIHRoZSBtZXNzYWdlcyBhcnJheS5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSB0eXBlIC0gVGhlIHR5cGUgb2YgY2hhdCwgZWl0aGVyICdncm91cCcgb3IgJ2RpcmVjdCcuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gdXNlcm5hbWUgLSBUaGUgdXNlcm5hbWUgb2YgdGhlIGN1cnJlbnQgdXNlci5cbiAqIEBwcm9wZXJ0eSB7KG9wdGlvbnM6IFNlbmRNZXNzYWdlT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPn0gb25TZW5kTWVzc2FnZVByZXNzIC0gRnVuY3Rpb24gdG8gaGFuZGxlIHNlbmRpbmcgbWVzc2FnZXMuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYmFja2dyb3VuZENvbG9yIC0gQmFja2dyb3VuZCBjb2xvciBvZiB0aGUgbWVzc2FnZSBwYW5lbC5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gZm9jdXNlZElucHV0IC0gSW5kaWNhdGVzIGlmIHRoZSBpbnB1dCBmaWVsZCBpcyBmb2N1c2VkLlxuICogQHByb3BlcnR5IHtFdmVudFR5cGV9IGV2ZW50VHlwZSAtIFRoZSB0eXBlIG9mIGV2ZW50LCBlLmcuLCAnd2ViaW5hcicuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbWVtYmVyIC0gVGhlIG1lbWJlciBhc3NvY2lhdGVkIHdpdGggdGhlIGNoYXQuXG4gKiBAcHJvcGVydHkge3N0cmluZ30gaXNsZXZlbCAtIFRoZSBsZXZlbCBvZiB0aGUgdXNlci5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc3RhcnREaXJlY3RNZXNzYWdlIC0gSW5kaWNhdGVzIGlmIGEgZGlyZWN0IG1lc3NhZ2Ugc2hvdWxkIGJlIHN0YXJ0ZWQuXG4gKiBAcHJvcGVydHkgeyhzdGFydDogYm9vbGVhbikgPT4gdm9pZH0gdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzdGFydERpcmVjdE1lc3NhZ2Ugc3RhdGUuXG4gKiBAcHJvcGVydHkge1BhcnRpY2lwYW50IHwgbnVsbH0gZGlyZWN0TWVzc2FnZURldGFpbHMgLSBEZXRhaWxzIG9mIHRoZSBwYXJ0aWNpcGFudCBmb3IgZGlyZWN0IG1lc3NhZ2luZy5cbiAqIEBwcm9wZXJ0eSB7KHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCB8IG51bGwpID0+IHZvaWR9IHVwZGF0ZURpcmVjdE1lc3NhZ2VEZXRhaWxzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIGRpcmVjdE1lc3NhZ2VEZXRhaWxzLlxuICogQHByb3BlcnR5IHtDb0hvc3RSZXNwb25zaWJpbGl0eVtdfSBjb0hvc3RSZXNwb25zaWJpbGl0eSAtIEFycmF5IG9mIGNvLWhvc3QgcmVzcG9uc2liaWxpdGllcy5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjb0hvc3QgLSBUaGUgY28taG9zdCBvZiB0aGUgY2hhdC5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSByb29tTmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBjaGF0IHJvb20uXG4gKiBAcHJvcGVydHkge1NvY2tldH0gc29ja2V0IC0gVGhlIHNvY2tldCBjb25uZWN0aW9uIGZvciByZWFsLXRpbWUgY29tbXVuaWNhdGlvbi5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBjaGF0U2V0dGluZyAtIFNldHRpbmdzIGZvciB0aGUgY2hhdC5cbiAqIEBwcm9wZXJ0eSB7U2hvd0FsZXJ0fSBbc2hvd0FsZXJ0XSAtIE9wdGlvbmFsIGZ1bmN0aW9uIHRvIHNob3cgYWxlcnRzLlxuICpcbiAqIEBwcm9wZXJ0eSB7SWNvbkRlZmluaXRpb259IGZhUGFwZXJQbGFuZSAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHBhcGVyIHBsYW5lLlxuICogQHByb3BlcnR5IHtJY29uRGVmaW5pdGlvbn0gZmFSZXBseSAtIEZvbnRBd2Vzb21lIGljb24gZm9yIHJlcGx5LlxuICpcbiAqIEBwcm9wZXJ0eSB7YW55fSByZXBseUluZm8gLSBJbmZvcm1hdGlvbiBhYm91dCB0aGUgcmVwbHkuXG4gKiBAcHJvcGVydHkge3N0cmluZyB8IG51bGx9IHNlbmRlcklkIC0gSUQgb2YgdGhlIHNlbmRlci5cbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkaXJlY3RNZXNzYWdlVGV4dCAtIFRleHQgb2YgdGhlIGRpcmVjdCBtZXNzYWdlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGdyb3VwTWVzc2FnZVRleHQgLSBUZXh0IG9mIHRoZSBncm91cCBtZXNzYWdlLlxuICpcbiAqIEBtZXRob2QgbmdPbkluaXQgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBkYXRhLWJvdW5kIHByb3BlcnRpZXMgYXJlIGluaXRpYWxpemVkLlxuICogQG1ldGhvZCBkZWZhdWx0U2VuZE1lc3NhZ2UgLSBEZWZhdWx0IGltcGxlbWVudGF0aW9uIGZvciBzZW5kaW5nIGEgbWVzc2FnZS5cbiAqIEBtZXRob2QgaGFuZGxlVGV4dElucHV0Q2hhbmdlIC0gSGFuZGxlcyBjaGFuZ2VzIGluIHRoZSB0ZXh0IGlucHV0IGZpZWxkLlxuICogQG1ldGhvZCBvcGVuUmVwbHlJbnB1dCAtIE9wZW5zIHRoZSByZXBseSBpbnB1dCBmb3IgYSBzcGVjaWZpYyBzZW5kZXIuXG4gKiBAbWV0aG9kIGhhbmRsZVNlbmRCdXR0b24gLSBIYW5kbGVzIHRoZSBzZW5kIGJ1dHRvbiBjbGljayBldmVudC5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1lc3NhZ2UtcGFuZWwnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWVzc2FnZS1wYW5lbC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL21lc3NhZ2UtcGFuZWwuY29tcG9uZW50LmNzcyddLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZSwgRm9ybXNNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlUGFuZWwgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIG1lc3NhZ2VzOiBBcnJheTxhbnk+ID0gW107XG4gIEBJbnB1dCgpIG1lc3NhZ2VzTGVuZ3RoID0gMDtcbiAgQElucHV0KCkgdHlwZSA9ICdncm91cCc7XG4gIEBJbnB1dCgpIHVzZXJuYW1lID0gJyc7XG4gIEBJbnB1dCgpIG9uU2VuZE1lc3NhZ2VQcmVzcyE6IChvcHRpb25zOiBTZW5kTWVzc2FnZU9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICcjZjVmNWY1JztcbiAgQElucHV0KCkgZm9jdXNlZElucHV0ID0gZmFsc2U7XG4gIEBJbnB1dCgpIGV2ZW50VHlwZTogRXZlbnRUeXBlID0gJ3dlYmluYXInO1xuICBASW5wdXQoKSBtZW1iZXIgPSAnJztcbiAgQElucHV0KCkgaXNsZXZlbCA9ICcnO1xuICBASW5wdXQoKSBzdGFydERpcmVjdE1lc3NhZ2UgPSBmYWxzZTtcbiAgQElucHV0KCkgdXBkYXRlU3RhcnREaXJlY3RNZXNzYWdlITogKHN0YXJ0OiBib29sZWFuKSA9PiB2b2lkO1xuICBASW5wdXQoKSBkaXJlY3RNZXNzYWdlRGV0YWlsczogUGFydGljaXBhbnQgfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgdXBkYXRlRGlyZWN0TWVzc2FnZURldGFpbHMhOiAocGFydGljaXBhbnQ6IFBhcnRpY2lwYW50IHwgbnVsbCkgPT4gdm9pZDtcbiAgQElucHV0KCkgY29Ib3N0UmVzcG9uc2liaWxpdHk6IENvSG9zdFJlc3BvbnNpYmlsaXR5W10gPSBbXTtcbiAgQElucHV0KCkgY29Ib3N0ID0gJyc7XG4gIEBJbnB1dCgpIHJvb21OYW1lID0gJyc7XG4gIEBJbnB1dCgpIHNvY2tldDogU29ja2V0ID0ge30gYXMgU29ja2V0O1xuICBASW5wdXQoKSBjaGF0U2V0dGluZyA9ICcnO1xuICBASW5wdXQoKSBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG5cbiAgZmFQYXBlclBsYW5lID0gZmFQYXBlclBsYW5lO1xuICBmYVJlcGx5ID0gZmFSZXBseTtcblxuICByZXBseUluZm86IGFueSA9IG51bGw7XG4gIHNlbmRlcklkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgZGlyZWN0TWVzc2FnZVRleHQgPSAnJztcbiAgZ3JvdXBNZXNzYWdlVGV4dCA9ICcnO1xuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICghdGhpcy5vblNlbmRNZXNzYWdlUHJlc3MpIHtcbiAgICAgIHRoaXMub25TZW5kTWVzc2FnZVByZXNzID0gdGhpcy5kZWZhdWx0U2VuZE1lc3NhZ2UuYmluZCh0aGlzKTtcbiAgICB9XG4gIH1cblxuICBkZWZhdWx0U2VuZE1lc3NhZ2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gRGVmYXVsdCBzZW5kIG1lc3NhZ2UgaW1wbGVtZW50YXRpb25cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICBoYW5kbGVUZXh0SW5wdXRDaGFuZ2UoZXZlbnQ6IEV2ZW50KSB7XG4gICAgY29uc3QgdGV4dCA9IChldmVudC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudCkudmFsdWU7XG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2RpcmVjdCcpIHtcbiAgICAgIHRoaXMuZGlyZWN0TWVzc2FnZVRleHQgPSB0ZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdyb3VwTWVzc2FnZVRleHQgPSB0ZXh0O1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKCkge1xuICAgIGlmICh0aGlzLnN0YXJ0RGlyZWN0TWVzc2FnZSAmJiB0aGlzLmRpcmVjdE1lc3NhZ2VEZXRhaWxzKSB7XG4gICAgICB0aGlzLm9wZW5SZXBseUlucHV0KHRoaXMuZGlyZWN0TWVzc2FnZURldGFpbHNbJ25hbWUnXSk7XG4gICAgfVxuICB9XG5cbiAgb3BlblJlcGx5SW5wdXQoc2VuZGVySWQ6IHN0cmluZykge1xuICAgIHRoaXMucmVwbHlJbmZvID0ge1xuICAgICAgdGV4dDogJ1JlcGx5aW5nIHRvOiAnLFxuICAgICAgdXNlcm5hbWU6IHNlbmRlcklkLFxuICAgIH07XG4gICAgdGhpcy5zZW5kZXJJZCA9IHNlbmRlcklkO1xuICB9XG5cbiAgYXN5bmMgaGFuZGxlU2VuZEJ1dHRvbigpIHtcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcy50eXBlID09PSAnZGlyZWN0JyA/IHRoaXMuZGlyZWN0TWVzc2FnZVRleHQgOiB0aGlzLmdyb3VwTWVzc2FnZVRleHQ7XG5cbiAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgIHRoaXMuc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiAnUGxlYXNlIGVudGVyIGEgbWVzc2FnZScsIHR5cGU6ICdkYW5nZXInIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChtZXNzYWdlLmxlbmd0aCA+IDM1MCkge1xuICAgICAgdGhpcy5zaG93QWxlcnQ/Lih7IG1lc3NhZ2U6ICdNZXNzYWdlIGlzIHRvbyBsb25nLicsIHR5cGU6ICdkYW5nZXInIH0pO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChtZXNzYWdlLnRyaW0oKSA9PT0gJycpIHtcbiAgICAgIHRoaXMuc2hvd0FsZXJ0Py4oeyBtZXNzYWdlOiAnTWVzc2FnZSBjYW5ub3QgYmUgZW1wdHkuJywgdHlwZTogJ2RhbmdlcicgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudHlwZSA9PT0gJ2RpcmVjdCcgJiYgIXRoaXMuc2VuZGVySWQgJiYgdGhpcy5pc2xldmVsID09ICcyJykge1xuICAgICAgdGhpcy5zaG93QWxlcnQ/Lih7IG1lc3NhZ2U6ICdQbGVhc2Ugc2VsZWN0IGEgdXNlciB0byBzZW5kIGEgbWVzc2FnZSB0by4nLCB0eXBlOiAnZGFuZ2VyJyB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLm9uU2VuZE1lc3NhZ2VQcmVzcyh7XG4gICAgICBtZXNzYWdlLFxuICAgICAgcmVjZWl2ZXJzOiB0aGlzLnR5cGUgPT09ICdkaXJlY3QnICYmIHRoaXMuc2VuZGVySWQgPyBbdGhpcy5zZW5kZXJJZF0gOiBbXSxcbiAgICAgIGdyb3VwOiB0aGlzLnR5cGUgPT09ICdncm91cCcsXG4gICAgICBtZXNzYWdlc0xlbmd0aDogdGhpcy5tZXNzYWdlc0xlbmd0aCxcbiAgICAgIG1lbWJlcjogdGhpcy5tZW1iZXIsXG4gICAgICBzZW5kZXI6IHRoaXMudXNlcm5hbWUsXG4gICAgICBpc2xldmVsOiB0aGlzLmlzbGV2ZWwsXG4gICAgICBzaG93QWxlcnQ6IHRoaXMuc2hvd0FsZXJ0LFxuICAgICAgY29Ib3N0UmVzcG9uc2liaWxpdHk6IHRoaXMuY29Ib3N0UmVzcG9uc2liaWxpdHksXG4gICAgICBjb0hvc3Q6IHRoaXMuY29Ib3N0LFxuICAgICAgcm9vbU5hbWU6IHRoaXMucm9vbU5hbWUsXG4gICAgICBzb2NrZXQ6IHRoaXMuc29ja2V0LFxuICAgICAgY2hhdFNldHRpbmc6IHRoaXMuY2hhdFNldHRpbmcsXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy50eXBlID09PSAnZGlyZWN0Jykge1xuICAgICAgdGhpcy5kaXJlY3RNZXNzYWdlVGV4dCA9ICcnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmdyb3VwTWVzc2FnZVRleHQgPSAnJztcbiAgICB9XG5cbiAgICB0aGlzLnJlcGx5SW5mbyA9IG51bGw7XG4gICAgdGhpcy5zZW5kZXJJZCA9IG51bGw7XG4gIH1cbn1cbiIsIjxkaXYgW3N0eWxlLm1heEhlaWdodF09XCInMTAwJSdcIiBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImJhY2tncm91bmRDb2xvclwiIHN0eWxlPVwib3ZlcmZsb3cteTogYXV0bztcIj5cclxuICA8IS0tIE1lc3NhZ2UgcmVuZGVyaW5nIGxvZ2ljIC0tPlxyXG4gIDxkaXYgKm5nRm9yPVwibGV0IG1lc3NhZ2Ugb2YgbWVzc2FnZXM7IGxldCBpbmRleCA9IGluZGV4XCIgW25nU3R5bGVdPVwieyBtYXJnaW5Cb3R0b206ICcxMHB4JyB9XCI+XHJcbiAgICA8ZGl2IFtuZ1N0eWxlXT1cInsgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAnY29sdW1uJywgYWxpZ25JdGVtczogbWVzc2FnZS5zZW5kZXIgPT09IHVzZXJuYW1lID8gJ2ZsZXgtZW5kJyA6ICdmbGV4LXN0YXJ0JywgbWFyZ2luQm90dG9tOiAnMTBweCcgfVwiPlxyXG4gICAgICA8ZGl2IFtuZ1N0eWxlXT1cInsgZGlzcGxheTogJ2ZsZXgnLCBmbGV4RGlyZWN0aW9uOiAncm93JywganVzdGlmeUNvbnRlbnQ6ICdzcGFjZS1iZXR3ZWVuJywgbWFyZ2luQm90dG9tOiAnM3B4JyB9XCI+XHJcbiAgICAgICAgPHNwYW4gKm5nSWY9XCJtZXNzYWdlLnNlbmRlciA9PT0gdXNlcm5hbWUgJiYgIW1lc3NhZ2UuZ3JvdXBcIiBbbmdTdHlsZV09XCJ7IGZvbnRXZWlnaHQ6ICdib2xkJywgY29sb3I6ICdibGFjaycsIGZvbnRTaXplOiAnOHB4JywgbWFyZ2luTGVmdDogJzZweCcgfVwiPlRvOiB7eyBtZXNzYWdlLnJlY2VpdmVycy5qb2luKCcsICcpIH19PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIFtuZ1N0eWxlXT1cInsgZm9udFdlaWdodDogJ2JvbGQnLCBjb2xvcjogJ2JsYWNrJywgZm9udFNpemU6ICc4cHgnLCBtYXJnaW5SaWdodDogJzEwcHgnIH1cIj57eyBtZXNzYWdlLnNlbmRlciA9PT0gdXNlcm5hbWUgPyAnJyA6IG1lc3NhZ2Uuc2VuZGVyIH19PC9zcGFuPlxyXG4gICAgICAgIDxzcGFuIFtuZ1N0eWxlXT1cInsgZm9udFNpemU6ICc4cHgnLCBjb2xvcjogJyMwRDBEMERGRicgfVwiPnt7IG1lc3NhZ2UudGltZXN0YW1wIH19PC9zcGFuPlxyXG4gICAgICAgIDxkaXYgKm5nSWY9XCJtZXNzYWdlLnNlbmRlciAhPT0gdXNlcm5hbWUgJiYgIW1lc3NhZ2UuZ3JvdXBcIiAoY2xpY2spPVwib3BlblJlcGx5SW5wdXQobWVzc2FnZS5zZW5kZXIpXCIgW25nU3R5bGVdPVwieyBwYWRkaW5nOiAnMXB4JywgbWFyZ2luTGVmdDogJzVweCcsIGJvcmRlclJhZGl1czogJzJweCcsIGJhY2tncm91bmRDb2xvcjogJ3RyYW5zcGFyZW50JyB9XCI+XHJcbiAgICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYVJlcGx5XCIgc2l6ZT1cInhzXCIgY29sb3I9XCJibGFja1wiPjwvZmEtaWNvbj5cclxuICAgICAgICA8L2Rpdj5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxkaXYgW25nU3R5bGVdPVwieyBiYWNrZ3JvdW5kQ29sb3I6IG1lc3NhZ2Uuc2VuZGVyID09PSBtZW1iZXIgPyAnI0RDRjhDNicgOiAnIzFjZTVjNycsIHBhZGRpbmc6ICcxMHB4JywgYm9yZGVyUmFkaXVzOiAnMTBweCcgfVwiPlxyXG4gICAgICAgIDxzcGFuIFtuZ1N0eWxlXT1cInsgY29sb3I6ICdibGFjaycgfVwiPnt7IG1lc3NhZ2UubWVzc2FnZSB9fTwvc3Bhbj5cclxuICAgICAgPC9kaXY+XHJcbiAgICA8L2Rpdj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPCEtLSBSZXBseSBpbmZvIC0tPlxyXG4gIDxkaXYgKm5nSWY9XCJyZXBseUluZm9cIiBbbmdTdHlsZV09XCJ7IGZsZXhEaXJlY3Rpb246ICdyb3cnLCBhbGlnbkl0ZW1zOiAnY2VudGVyJywgcGFkZGluZzogJzJweCcsIGJhY2tncm91bmRDb2xvcjogJyNlNmU2ZTYnLCBib3JkZXJSYWRpdXM6ICc1cHgnLCBtYXJnaW5Cb3R0b206ICcxcHgnIH1cIj5cclxuICAgIDxzcGFuIFtuZ1N0eWxlXT1cInsgZm9udFdlaWdodDogJ2JvbGQnLCBtYXJnaW5SaWdodDogJzJweCcsIGZvbnRTaXplOiAnOHB4JyB9XCI+UmVwbHlpbmcgdG86IDwvc3Bhbj5cclxuICAgIDxzcGFuIFtuZ1N0eWxlXT1cInsgY29sb3I6ICdyZWQnLCBmb250U2l6ZTogJzhweCcgfVwiPnt7IHJlcGx5SW5mby51c2VybmFtZSB9fTwvc3Bhbj5cclxuICA8L2Rpdj5cclxuXHJcbiAgPCEtLSBJbnB1dCBhcmVhIC0tPlxyXG4gIDxkaXYgW25nU3R5bGVdPVwieyBkaXNwbGF5OiAnZmxleCcsIGFsaWduSXRlbXM6ICdjZW50ZXInLCBqdXN0aWZ5Q29udGVudDogJ3NwYWNlLWJldHdlZW4nLCBtYXJnaW5Cb3R0b206ICcxMHB4JywgbWFyZ2luVG9wOiAnYXV0bycgfVwiPlxyXG4gICAgPGlucHV0XHJcbiAgICAgIHR5cGU9XCJ0ZXh0XCJcclxuICAgICAgW25nU3R5bGVdPVwieyBmbGV4OiAxLCBtaW5IZWlnaHQ6ICc0MHB4JywgbWF4SGVpZ2h0OiAnODBweCcsIHJlc2l6ZTogJ3ZlcnRpY2FsJywgYm9yZGVyOiAnMXB4IHNvbGlkIGdyYXknLCBib3JkZXJSYWRpdXM6ICc1cHgnLCBwYWRkaW5nOiAnMTBweCcsIG92ZXJmbG93WTogJ2F1dG8nIH1cIlxyXG4gICAgICBwbGFjZWhvbGRlcj1cInt7IHR5cGUgPT09ICdkaXJlY3QnID8gKGZvY3VzZWRJbnB1dCAmJiBzdGFydERpcmVjdE1lc3NhZ2UgJiYgZGlyZWN0TWVzc2FnZURldGFpbHMgPyAnU2VuZCBhIGRpcmVjdCBtZXNzYWdlIHRvICcgKyBkaXJlY3RNZXNzYWdlRGV0YWlscy5uYW1lIDogJ1NlbGVjdCBhIG1lc3NhZ2UgdG8gcmVwbHkgdG8nKSA6IChldmVudFR5cGUgPT09ICdjaGF0JyA/ICdTZW5kIGEgbWVzc2FnZScgOiAnU2VuZCBhIG1lc3NhZ2UgdG8gZXZlcnlvbmUnKSB9fVwiXHJcbiAgICAgIG1heExlbmd0aD1cIjM1MFwiXHJcbiAgICAgIChpbnB1dCk9XCJoYW5kbGVUZXh0SW5wdXRDaGFuZ2UoJGV2ZW50KVwiXHJcbiAgICAgIFt2YWx1ZV09XCJ0eXBlID09PSAnZGlyZWN0JyA/IGRpcmVjdE1lc3NhZ2VUZXh0IDogZ3JvdXBNZXNzYWdlVGV4dFwiXHJcbiAgICAvPlxyXG4gICAgPGJ1dHRvbiBbbmdTdHlsZV09XCJ7IGJhY2tncm91bmRDb2xvcjogJyM4M2MwZTknLCBwYWRkaW5nOiAnMTBweCcsIGJvcmRlclJhZGl1czogJzVweCcsIGRpc3BsYXk6ICdmbGV4JywgYWxpZ25JdGVtczogJ2NlbnRlcicgfVwiIChjbGljayk9XCJoYW5kbGVTZW5kQnV0dG9uKClcIj5cclxuICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFQYXBlclBsYW5lXCIgc2l6ZT1cInNtXCIgY29sb3I9XCJ3aGl0ZVwiPjwvZmEtaWNvbj5cclxuICAgIDwvYnV0dG9uPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19