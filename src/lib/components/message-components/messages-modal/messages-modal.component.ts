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
}

export type MessagesModalType = (options: MessagesModalOptions) => void;

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

@Component({
  selector: 'app-messages-modal',
  templateUrl: './messages-modal.component.html',
  styleUrls: ['./messages-modal.component.css'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, MessagePanel],
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
}
