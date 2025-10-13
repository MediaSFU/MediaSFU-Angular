import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CoHostResponsibility, EventType, Message, Participant, ShowAlert } from '../../../@types/types';
import { SendMessage, SendMessageOptions } from '../../../methods/message-methods/send-message.service';
import { Socket } from 'socket.io-client';
import * as i0 from "@angular/core";
export interface MessagesModalOptions {
    isMessagesModalVisible: boolean;
    onMessagesClose: () => void;
    onSendMessagePress?: (options: SendMessageOptions) => Promise<void>;
    messages: Message[];
    position?: string;
    backgroundColor?: string;
    activeTabBackgroundColor?: string;
    eventType: EventType;
    member: string;
    islevel: string;
    coHostResponsibility: CoHostResponsibility[];
    coHost: string;
    startDirectMessage: boolean;
    directMessageDetails: Participant | null;
    updateStartDirectMessage: (start: boolean) => void;
    updateDirectMessageDetails: (participant: Participant | null) => void;
    showAlert?: ShowAlert;
    roomName: string;
    socket: Socket;
    chatSetting: string;
    overlayStyle?: Partial<CSSStyleDeclaration>;
    contentStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: any;
}
export type MessagesModalType = (options: MessagesModalOptions) => void;
/**
 * MessagesModal - Full-featured chat modal with group and direct messaging
 *
 * @component
 * @selector app-messages-modal
 * @templateUrl ./messages-modal.component.html
 * @styleUrls ./messages-modal.component.css
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, MessagePanel]
 *
 * @description
 * A comprehensive chat modal supporting group and direct messaging with full UI customization.
 * Supports three levels of customization:
 * 1. **Style Overrides**: Customize appearance with `overlayStyle` and `contentStyle`
 * 2. **Component Integration**: Integrates with MediaSFU messaging system
 * 3. **Complete Replacement**: Use `customTemplate` for full UI control
 *
 * Features:
 * - Group chat for all participants
 * - Direct messaging between participants
 * - Message history and real-time updates
 * - Read receipts and sender identification
 * - Host/co-host message controls
 * - Socket-based real-time messaging
 *
 * @example
 * **Basic Usage**
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
 *   [roomName]="'RoomName'"
 *   [socket]="chatSocket">
 * </app-messages-modal>
 * ```
 *
 * @example
 * **With Style Customization**
 * ```html
 * <app-messages-modal
 *   [isMessagesModalVisible]="true"
 *   [overlayStyle]="{ backgroundColor: 'rgba(0, 0, 0, 0.85)' }"
 *   [contentStyle]="{ borderRadius: '12px', maxHeight: '600px' }"
 *   [onMessagesClose]="closeMessages"
 *   [messages]="chatMessages"
 *   [socket]="chatSocket">
 * </app-messages-modal>
 * ```
 *
 * @example
 * **Custom Template Override**
 * ```html
 * <app-messages-modal
 *   [isMessagesModalVisible]="true"
 *   [customTemplate]="customChatTemplate"
 *   [messages]="chatMessages"
 *   [onMessagesClose]="closeMessages">
 * </app-messages-modal>
 *
 * <ng-template #customChatTemplate let-context>
 *   <div class="my-chat-modal">
 *     <h2>Chat ({{ context.messages.length }} messages)</h2>
 *     <div *ngFor="let message of context.messages">
 *       <strong>{{ message.sender }}:</strong> {{ message.message }}
 *     </div>
 *   </div>
 * </ng-template>
 * ```
 *
 * @input {boolean} isMessagesModalVisible - Controls modal visibility
 * @input {() => void} onMessagesClose - Callback when modal is closed
 * @input {Message[]} messages - Array of chat messages
 * @input {string} position - Modal position (default: 'bottomRight')
 * @input {string} backgroundColor - Modal background color (default: '#f5f5f5')
 * @input {EventType} eventType - Type of event (meeting, webinar, etc.)
 * @input {string} member - Current user's name/ID
 * @input {string} islevel - User's privilege level
 * @input {Socket} socket - Socket.io connection for real-time messaging
 * @input {string} roomName - Room identifier
 * @input {Partial<CSSStyleDeclaration>} overlayStyle - Custom overlay styles
 * @input {Partial<CSSStyleDeclaration>} contentStyle - Custom content styles
 * @input {TemplateRef<any>} customTemplate - Complete template override
 */
export declare class MessagesModal implements OnInit, OnChanges {
    private SendMessageService;
    constructor(SendMessageService: SendMessage);
    isMessagesModalVisible: boolean;
    onMessagesClose: () => void;
    onSendMessagePress: (options: SendMessageOptions) => Promise<void>;
    messages: Message[];
    position: string;
    backgroundColor: string;
    activeTabBackgroundColor: string;
    eventType: EventType;
    member: string;
    islevel: string;
    coHostResponsibility: CoHostResponsibility[];
    coHost: string;
    startDirectMessage: boolean;
    directMessageDetails: Participant | null;
    updateStartDirectMessage: (start: boolean) => void;
    updateDirectMessageDetails: (participant: Participant | null) => void;
    showAlert?: ShowAlert;
    roomName: string;
    socket: Socket;
    chatSetting: string;
    overlayStyle?: Partial<CSSStyleDeclaration>;
    contentStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: any;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    directMessages: Array<any>;
    groupMessages: Array<any>;
    activeTab: string;
    focusedInput: boolean;
    reRender: boolean;
    modalContainerStyle: any;
    modalContentStyle: any;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    switchToDirectTab(): void;
    switchToGroupTab(): void;
    populateMessages(): void;
    closeMessagesModal(): void;
    updateModalStyles(): void;
    getTabStyle(tab: string): {
        backgroundColor?: string | undefined;
        color?: string | undefined;
        borderRadius?: string | undefined;
        paddingRight: string;
        paddingLeft: string;
        paddingTop: string;
        paddingBottom: string;
        fontWeight: string;
        marginRight: string;
        marginLeft: string;
    };
    getButtonCloseStyle(): {
        marginLeft: string;
        padding: string;
        marginRight: string;
        paddingRight: string;
    };
    get styles(): {
        modalContent: {
            borderRadius: string;
            padding: string;
        };
        modalBody: {
            marginTop: string;
        };
        tabText: {
            paddingRight: string;
            paddingLeft: string;
            paddingTop: string;
            paddingBottom: string;
            fontWeight: string;
            marginRight: string;
            marginLeft: string;
        };
        activeTabText: {
            color: string;
            backgroundColor: string;
            borderRadius: string;
        };
        separator: {
            height: string;
            backgroundColor: string;
            marginVertical: string;
        };
        btnCloseMessages: {
            padding: string;
            marginRight: string;
            paddingRight: string;
        };
        icon: {
            fontSize: string;
            color: string;
        };
    };
    getCombinedOverlayStyle(): any;
    getCombinedContentStyle(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<MessagesModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MessagesModal, "app-messages-modal", never, { "isMessagesModalVisible": { "alias": "isMessagesModalVisible"; "required": false; }; "onMessagesClose": { "alias": "onMessagesClose"; "required": false; }; "onSendMessagePress": { "alias": "onSendMessagePress"; "required": false; }; "messages": { "alias": "messages"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "activeTabBackgroundColor": { "alias": "activeTabBackgroundColor"; "required": false; }; "eventType": { "alias": "eventType"; "required": false; }; "member": { "alias": "member"; "required": false; }; "islevel": { "alias": "islevel"; "required": false; }; "coHostResponsibility": { "alias": "coHostResponsibility"; "required": false; }; "coHost": { "alias": "coHost"; "required": false; }; "startDirectMessage": { "alias": "startDirectMessage"; "required": false; }; "directMessageDetails": { "alias": "directMessageDetails"; "required": false; }; "updateStartDirectMessage": { "alias": "updateStartDirectMessage"; "required": false; }; "updateDirectMessageDetails": { "alias": "updateDirectMessageDetails"; "required": false; }; "showAlert": { "alias": "showAlert"; "required": false; }; "roomName": { "alias": "roomName"; "required": false; }; "socket": { "alias": "socket"; "required": false; }; "chatSetting": { "alias": "chatSetting"; "required": false; }; "overlayStyle": { "alias": "overlayStyle"; "required": false; }; "contentStyle": { "alias": "contentStyle"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, {}, never, never, true, never>;
}
