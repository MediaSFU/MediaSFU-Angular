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
}

export type PollModalType = (options: PollModalOptions) => HTMLElement;

/**
 * Component for displaying a poll modal, allowing users to create, vote, and end polls within a session.
 *
 * @component
 * @selector app-poll-modal
 * @standalone true
 * @templateUrl ./poll-modal.component.html
 * @styleUrls ['./poll-modal.component.css']
 * @imports [CommonModule, FontAwesomeModule, FormsModule]
 *
 * @example
 * ```html
 * <app-poll-modal
 *   [isPollModalVisible]="true"
 *   [onClose]="closeModalFunction"
 *   [member]="currentMember"
 *   [islevel]="'2'"
 *   [polls]="pollList"
 *   [poll]="selectedPoll"
 *   [socket]="socketInstance"
 *   [roomName]="'exampleRoom'"
 *   [handleCreatePoll]="createPollFunction"
 *   [handleEndPoll]="endPollFunction"
 *   [handleVotePoll]="votePollFunction"
 * ></app-poll-modal>
 * ```
 */


@Component({
  selector: 'app-poll-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './poll-modal.component.html',
  styleUrls: ['./poll-modal.component.css'],
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
}
