/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from '@angular/forms';
import { Socket } from 'socket.io-client';
import {
  Poll,
  ShowAlert,
  HandleCreatePollType,
  HandleEndPollType,
  HandleVotePollType,
} from '../../../@types/types';

export interface PollModalOptions {
  isPollModalVisible: boolean;
  onClose: () => void;
  position?: string;
  backgroundColor?: string;
  member: string;
  islevel: string;
  polls: Poll[];
  poll: Poll | null;
  socket: Socket;
  roomName: string;
  showAlert?: ShowAlert;
  updateIsPollModalVisible: (isVisible: boolean) => void;

  handleCreatePoll: HandleCreatePollType;
  handleEndPoll: HandleEndPollType;
  handleVotePoll: HandleVotePollType;
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: any;
}

export type PollModalType = (options: PollModalOptions) => HTMLElement;

/**
 * PollModal - Modal for creating, voting, and managing live polls
 * 
 * @component
 * @description
 * Allows hosts to create/end polls and participants to vote on active polls.
 * Supports multiple-choice questions with real-time result updates.
 * 
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with poll creation/voting forms
 * 2. **Style Customization**: Override modal appearance with overlayStyle and contentStyle
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 * 
 * Key Features:
 * - Create polls with question and options (host only)
 * - Vote on active polls (all participants)
 * - View poll results in real-time
 * - End active polls (host only)
 * - Socket-based live updates
 * 
 * @selector app-poll-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, FormsModule
 * 
 * @input isPollModalVisible - Whether the modal is currently visible. Default: `false`
 * @input onClose - Callback function to close the modal. Default: `() => {}`
 * @input position - Modal position on screen ('topRight', 'center', etc.). Default: `'topRight'`
 * @input backgroundColor - Background color of the modal content. Default: `'#83c0e9'`
 * @input member - Name/ID of current participant. Default: `''`
 * @input islevel - User level/role ('0' for host, '2' for participant). Default: `'2'`
 * @input polls - Array of all poll objects. Default: `[]`
 * @input poll - Currently active poll object. Default: `null`
 * @input socket - Socket.io client instance for real-time communication. Default: `undefined`
 * @input roomName - Name of the room/session. Default: `''`
 * @input showAlert - Optional alert function for displaying messages. Default: `undefined`
 * @input updateIsPollModalVisible - Function to update modal visibility. Default: `() => {}`
 * @input handleCreatePoll - Function to create new poll. Default: `() => {}`
 * @input handleEndPoll - Function to end active poll. Default: `() => {}`
 * @input handleVotePoll - Function to submit vote. Default: `() => {}`
 * @input overlayStyle - Custom CSS styles for the modal overlay backdrop. Default: `undefined`
 * @input contentStyle - Custom CSS styles for the modal content container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default modal template. Default: `undefined`
 * 
 * @method ngOnInit - Initializes component state
 * @method ngOnChanges - Updates poll state when inputs change
 * @method getCombinedOverlayStyle - Merges default and custom overlay styles
 * @method getCombinedContentStyle - Merges default and custom content styles
 */


@Component({
    selector: 'app-poll-modal',
    imports: [CommonModule, FontAwesomeModule, FormsModule],
    templateUrl: './poll-modal.component.html',
    styleUrls: ['./poll-modal.component.css']
})
export class PollModal implements OnInit, OnChanges {
  @Input() isPollModalVisible = false;
  @Input() onClose!: () => void;
  @Input() position = 'topRight';
  @Input() backgroundColor = '#f5f5f5';
  @Input() member = '';
  @Input() islevel = '';
  @Input() polls: Poll[] = [];
  @Input() poll: Poll | null = null;
  @Input() socket: Socket = {} as Socket;
  @Input() roomName = '';
  @Input() showAlert: ShowAlert = () => {};
  @Input() updateIsPollModalVisible: (isVisible: boolean) => void = () => {};
  @Input() handleCreatePoll!: HandleCreatePollType;
  @Input() handleEndPoll!: HandleEndPollType;
  @Input() handleVotePoll!: HandleVotePollType;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;

  faTimes = faTimes;
  newPoll: any = { question: '', type: '', options: [] };

  screenWidth: number = window.innerWidth;
  modalWidth: number = this.screenWidth > 500 ? 350 : 0.7 * this.screenWidth;

  ngOnInit() {
    this.renderPolls();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isPollModalVisible']) {
      this.renderPolls();
    }
  }

  renderPolls = () => {
    let activePollCount = 0;

    this.polls &&
      this.polls.forEach((polled: any) => {
        if (polled.status === 'active' && this.poll && polled.id === this.poll.id) {
          activePollCount++;
        }
      });

    if (this.islevel == '2' && activePollCount === 0) {
      if (this.poll && this.poll.status === 'active') {
        this.poll.status = 'inactive';
      }
    }
  };

  calculatePercentage(votes: number[], optionIndex: number): number {
    const totalVotes = votes.reduce((a, b) => a + b, 0);
    return totalVotes > 0 ? parseFloat(((votes[optionIndex] / totalVotes) * 100).toFixed(2)) : 0;
  }

  handlePollTypeChange(event: any) {
    const type = event.target.value;
    let options: string[] = [];

    switch (type) {
      case 'trueFalse':
        options = ['True', 'False'];
        break;
      case 'yesNo':
        options = ['Yes', 'No'];
        break;
      case 'custom':
        options = ['', '', '', '', '']; // Preload 5 empty options
        break;
      default:
        options = [];
        break;
    }

    this.newPoll = { ...this.newPoll, type, options };
  }

  async validateAndCreatePoll() {
    // Remove empty options before creating the poll
    this.newPoll.options = this.newPoll.options.filter((option: string) => option.trim() !== '');

    // Ensure there's at least one valid option
    if (this.newPoll.options.length > 0) {
      await this.handleCreatePoll({
        poll: this.newPoll,
        socket: this.socket,
        roomName: this.roomName,
        showAlert: this.showAlert,
        updateIsPollModalVisible: this.updateIsPollModalVisible,
      });
    }
  }

  handledVotePoll(pollId: string, optionIndex: number) {
    this.handleVotePoll({
      pollId,
      optionIndex,
      socket: this.socket,
      member: this.member,
      roomName: this.roomName,
      showAlert: this.showAlert,
      updateIsPollModalVisible: this.updateIsPollModalVisible,
    });
  }

  handledEndPoll(pollId: string) {
    this.handleEndPoll({
      pollId,
      socket: this.socket,
      roomName: this.roomName,
      showAlert: this.showAlert,
      updateIsPollModalVisible: this.updateIsPollModalVisible,
    });
  }

  get modalContainerStyle() {
    return {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: this.isPollModalVisible ? 'block' : 'none',
      zIndex: 999,
    };
  }

  get modalContentStyle() {
    return {
      position: 'fixed',
      backgroundColor: this.backgroundColor,
      borderRadius: '10px',
      padding: '10px',
      width: `${this.modalWidth}px`,
      maxHeight: '75%',
      overflowY: 'auto',
      top: this.position.includes('top') ? '10px' : 'auto',
      bottom: this.position.includes('bottom') ? '10px' : 'auto',
      left: this.position.includes('Left') ? '10px' : 'auto',
      right: this.position.includes('Right') ? '10px' : 'auto',
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
