/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MessagePanel } from '../message-panel/message-panel.component';
import {
  CoHostResponsibility,
  EventType,
  Message,
  Participant,
  ShowAlert,
} from '../../../@types/types';
import {
  SendMessage,
  SendMessageOptions,
} from '../../../methods/message-methods/send-message.service';
import { Socket } from 'socket.io-client';

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

@Component({
    selector: 'app-messages-modal',
    templateUrl: './messages-modal.component.html',
    styleUrls: ['./messages-modal.component.css'],
    imports: [CommonModule, FontAwesomeModule, MessagePanel]
})
export class MessagesModal implements OnInit, OnChanges {
  constructor(private SendMessageService: SendMessage) {}

  @Input() isMessagesModalVisible = false;
  @Input() onMessagesClose = () => {};
  @Input() onSendMessagePress!: (options: SendMessageOptions) => Promise<void>;
  @Input() messages: Message[] = [];
  @Input() position = 'topRight';
  @Input() backgroundColor = '#f5f5f5';
  @Input() activeTabBackgroundColor = '#2b7ce5';
  @Input() eventType: EventType = 'webinar';
  @Input() member = '';
  @Input() islevel = '';
  @Input() coHostResponsibility: CoHostResponsibility[] = [];
  @Input() coHost = '';
  @Input() startDirectMessage = false;
  @Input() directMessageDetails: Participant | null = null;
  @Input() updateStartDirectMessage = (start: boolean) => {
    console.log(start);
  };
  @Input() updateDirectMessageDetails = (participant: Participant | null) => {
    console.log(participant);
  };
  @Input() showAlert?: ShowAlert;
  @Input() roomName = '';
  @Input() socket: Socket = {} as Socket;
  @Input() chatSetting = '';
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;

  faTimes = faTimes;

  directMessages: Array<any> = [];
  groupMessages: Array<any> = [];
  activeTab = 'group';
  focusedInput = false;
  reRender = false;

  modalContainerStyle: any;
  modalContentStyle: any;

  ngOnInit() {
    if (!this.onSendMessagePress) {
      this.onSendMessagePress = this.SendMessageService.sendMessage.bind(this.SendMessageService);
    }

    if (this.eventType == 'webinar' || this.eventType == 'conference') {
      this.activeTab = 'direct';
    } else {
      this.activeTab = 'group';
      this.switchToGroupTab();
    }

    this.updateModalStyles();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isMessagesModalVisible']) {
      this.updateModalStyles();

      if (
        this.eventType != 'webinar' &&
        this.eventType != 'conference' &&
        this.activeTab == 'direct'
      ) {
        this.activeTab = 'group';
        this.focusedInput = false;
        this.switchToGroupTab();
      } else if (this.eventType == 'webinar' || this.eventType == 'conference') {
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
        this.coHostResponsibility?.find((item: any) => item.name == 'chat')?.value || false;
    } catch {
      /* handle error */
    }

    let directMsgs = this.messages ? this.messages.filter((message) => !message.group) : [];
    directMsgs = directMsgs.filter(
      (message) =>
        message.sender == this.member ||
        message.receivers.includes(this.member) ||
        this.islevel == '2' ||
        (this.coHost == this.member && chatValue == true),
    );
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

  getTabStyle(tab: string) {
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

  getCombinedOverlayStyle() {
    return {
      ...this.modalContainerStyle,
      ...(this.overlayStyle || {})
    };
  }

  getCombinedContentStyle() {
    return {
      ...this.modalContentStyle,
      ...(this.contentStyle || {})
    };
  }
}
