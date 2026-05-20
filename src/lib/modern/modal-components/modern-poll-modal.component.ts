import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { Socket } from 'socket.io-client';

import {
  HandleCreatePollType,
  HandleEndPollType,
  HandleVotePollType,
  Poll,
  ShowAlert,
} from '../../@types/types';
import { ModernRenderMode, isEmbeddedRenderMode } from '../utils/render-mode.utils';

interface NewPollFormState {
  options: string[];
  question: string;
  type: '' | 'custom' | 'trueFalse' | 'yesNo';
}

@Component({
  selector: 'app-poll-modal',
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  template: `
    <ng-container *ngIf="isVisible() && customTemplate">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            isPollModalVisible: isPollModalVisible,
            onClose: onClose,
            position: position,
            backgroundColor: backgroundColor,
            member: member,
            islevel: islevel,
            polls: polls,
            poll: poll,
            socket: socket,
            roomName: roomName,
            showAlert: showAlert,
            updateIsPollModalVisible: updateIsPollModalVisible,
            handleCreatePoll: handleCreatePoll,
            handleEndPoll: handleEndPoll,
            handleVotePoll: handleVotePoll
          }
        "
      ></ng-container>
    </ng-container>

    <div
      *ngIf="isVisible() && !customTemplate"
      class="ms-modern-poll-overlay"
      [ngStyle]="resolvedOverlayStyle()"
    >
      <section class="ms-modern-poll" [ngStyle]="resolvedContentStyle()">
        <header *ngIf="showHeader" class="ms-modern-poll__header">
          <div class="ms-modern-poll__heading">
            <span class="ms-modern-poll__eyebrow">Audience interaction</span>
            <h2 class="ms-modern-poll__title">Polls</h2>
            <p class="ms-modern-poll__subtitle">
              Create polls, track current responses, and review completed results in one place.
            </p>
          </div>

          <button
            type="button"
            class="ms-modern-poll__close"
            aria-label="Close polls"
            (click)="onClose()"
          >
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </header>

        <div class="ms-modern-poll__body" [class.ms-modern-poll__body--embedded]="isEmbedded()">
          <div *ngIf="isEmbedded()" class="ms-modern-poll__tabs" role="tablist" aria-label="Poll views">
            <button
              type="button"
              class="ms-modern-poll__tab"
              [class.ms-modern-poll__tab--active]="activeTab === 'active'"
              (click)="setActiveTab('active')"
            >
              Active
            </button>
            <button
              *ngIf="canCreatePoll()"
              type="button"
              class="ms-modern-poll__tab"
              [class.ms-modern-poll__tab--active]="activeTab === 'create'"
              (click)="setActiveTab('create')"
            >
              Create
            </button>
            <button
              type="button"
              class="ms-modern-poll__tab"
              [class.ms-modern-poll__tab--active]="activeTab === 'history'"
              (click)="setActiveTab('history')"
            >
              History
            </button>
          </div>

          <ng-container *ngIf="isEmbedded(); else stackedPollLayout">
            <article *ngIf="activeTab === 'active'" class="ms-modern-poll__card">
              <div class="ms-modern-poll__card-header">
                <h3>Current poll</h3>
              </div>
              <ng-container *ngTemplateOutlet="currentPollTemplate"></ng-container>
            </article>

            <article *ngIf="activeTab === 'create' && canCreatePoll()" class="ms-modern-poll__card">
              <div class="ms-modern-poll__card-header">
                <h3>Create a new poll</h3>
              </div>
              <ng-container *ngTemplateOutlet="createPollTemplate"></ng-container>
            </article>

            <article *ngIf="activeTab === 'history'" class="ms-modern-poll__card">
              <div class="ms-modern-poll__card-header">
                <h3>Previous polls</h3>
                <span>{{ polls.length }}</span>
              </div>
              <ng-container *ngTemplateOutlet="historyPollTemplate"></ng-container>
            </article>
          </ng-container>

          <ng-template #stackedPollLayout>
            <section *ngIf="canCreatePoll()" class="ms-modern-poll__stack">
              <article class="ms-modern-poll__card">
                <div class="ms-modern-poll__card-header">
                  <h3>Previous polls</h3>
                  <span>{{ polls.length }}</span>
                </div>
                <ng-container *ngTemplateOutlet="historyPollTemplate"></ng-container>
              </article>

              <article class="ms-modern-poll__card">
                <div class="ms-modern-poll__card-header">
                  <h3>Create a new poll</h3>
                </div>
                <ng-container *ngTemplateOutlet="createPollTemplate"></ng-container>
              </article>
            </section>

            <article class="ms-modern-poll__card">
              <div class="ms-modern-poll__card-header">
                <h3>Current poll</h3>
              </div>
              <ng-container *ngTemplateOutlet="currentPollTemplate"></ng-container>
            </article>
          </ng-template>

          <ng-template #historyPollTemplate>
            <div *ngIf="polls.length === 0" class="ms-modern-poll__empty-state">
              {{ isEmbedded() ? 'No previous polls.' : 'No polls available yet.' }}
            </div>

            <div *ngFor="let polled of polls" class="ms-modern-poll__history-item">
              <ng-container *ngIf="!poll || polled.id !== poll.id || poll.status !== 'active'">
                <strong>{{ polled.question }}</strong>
                <ul class="ms-modern-poll__results">
                  <li *ngFor="let option of polled.options; let i = index">
                    <span>{{ option }}</span>
                    <span>{{ polled.votes[i] }} votes ({{ calculatePercentage(polled.votes, i) }}%)</span>
                  </li>
                </ul>
                <button
                  *ngIf="polled.status === 'active'"
                  type="button"
                  class="ms-modern-poll__inline-action ms-modern-poll__inline-action--danger"
                  (click)="handledEndPoll(polled.id)"
                >
                  End poll
                </button>
              </ng-container>
            </div>
          </ng-template>

          <ng-template #createPollTemplate>
            <form class="ms-modern-poll__form" (ngSubmit)="validateAndCreatePoll()">
              <label class="ms-modern-poll__field">
                <span>Poll question</span>
                <textarea
                  rows="3"
                  maxlength="300"
                  required
                  [(ngModel)]="newPoll.question"
                  name="question"
                ></textarea>
              </label>

              <label class="ms-modern-poll__field">
                <span>Answer type</span>
                <select
                  required
                  (change)="handlePollTypeChange($event)"
                  [(ngModel)]="newPoll.type"
                  name="type"
                >
                  <option value="">Choose...</option>
                  <option value="trueFalse">True / False</option>
                  <option value="yesNo">Yes / No</option>
                  <option value="custom">Custom</option>
                </select>
              </label>

              <div
                *ngIf="newPoll.type === 'trueFalse' || newPoll.type === 'yesNo'"
                class="ms-modern-poll__preset-list"
              >
                <label *ngFor="let option of newPoll.options" class="ms-modern-poll__choice-chip">
                  <input type="radio" name="pollOptionPreset" [value]="option.toLowerCase()" />
                  <span>{{ option }}</span>
                </label>
              </div>

              <div *ngIf="newPoll.type === 'custom'" class="ms-modern-poll__custom-options">
                <label
                  *ngFor="let option of newPoll.options; let i = index"
                  class="ms-modern-poll__field"
                >
                  <span>Option {{ i + 1 }}</span>
                  <input
                    type="text"
                    maxlength="50"
                    [(ngModel)]="newPoll.options[i]"
                    name="option{{ i }}"
                  />
                </label>
              </div>

              <button type="submit" class="ms-modern-poll__primary-action">Create poll</button>
            </form>
          </ng-template>

          <ng-template #currentPollTemplate>
            <ng-container *ngIf="poll && poll.status === 'active'; else noActivePollTemplate">
              <strong class="ms-modern-poll__question">{{ poll.question }}</strong>

              <div *ngFor="let option of poll.options; let i = index" class="ms-modern-poll__live-option">
                <label class="ms-modern-poll__live-choice">
                  <input
                    type="radio"
                    name="pollOptionLive"
                    [value]="i"
                    [checked]="poll.voters?.[member] === i"
                    (change)="handledVotePoll(poll.id, i)"
                  />
                  <span>{{ option }}</span>
                </label>
              </div>

              <button
                *ngIf="poll.status === 'active' && canCreatePoll()"
                type="button"
                class="ms-modern-poll__inline-action ms-modern-poll__inline-action--danger"
                (click)="handledEndPoll(poll.id)"
              >
                End active poll
              </button>
            </ng-container>

            <ng-template #noActivePollTemplate>
              <div class="ms-modern-poll__empty-state">No active poll.</div>
            </ng-template>
          </ng-template>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .ms-modern-poll-overlay {
        position: fixed;
        inset: 0;
        background: rgba(2, 8, 23, 0.66);
        backdrop-filter: blur(10px);
        z-index: 999;
      }

      .ms-modern-poll {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: 28px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: linear-gradient(
          180deg,
          var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.96)) 0%,
          var(--ms-modern-panel-surface, rgba(248, 250, 252, 0.95)) 100%
        );
        box-shadow: 0 28px 70px rgba(15, 23, 42, 0.28);
        color: var(--ms-modern-text-primary, #10233f);
      }

      .ms-modern-poll * {
        box-sizing: border-box;
      }

      .ms-modern-poll__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 22px 22px 16px;
        border-bottom: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
      }

      .ms-modern-poll__eyebrow {
        display: block;
        color: var(--ms-modern-text-muted, rgba(59, 78, 104, 0.72));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .ms-modern-poll__title {
        margin: 6px 0 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1.34rem;
        font-weight: 800;
        line-height: 1.1;
      }

      .ms-modern-poll__subtitle {
        margin: 8px 0 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
        line-height: 1.5;
      }

      .ms-modern-poll__close {
        width: 40px;
        height: 40px;
        flex: 0 0 auto;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.4);
        color: var(--ms-modern-text-primary, #10233f);
        cursor: pointer;
      }

      .ms-modern-poll__body,
      .ms-modern-poll__stack,
      .ms-modern-poll__form,
      .ms-modern-poll__custom-options {
        display: grid;
        gap: 16px;
      }

      .ms-modern-poll__body {
        padding: 18px 22px 22px;
        overflow-y: auto;
        overflow-x: hidden;
      }

      .ms-modern-poll__body--embedded {
        align-content: start;
      }

      .ms-modern-poll__tabs {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
      }

      .ms-modern-poll__tab {
        min-height: 38px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        border-radius: 999px;
        padding: 0 14px;
        background: rgba(255, 255, 255, 0.72);
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.82rem;
        font-weight: 800;
        cursor: pointer;
      }

      .ms-modern-poll__tab--active {
        border-color: transparent;
        background: linear-gradient(
          135deg,
          var(--ms-modern-brand-primary, #4f46e5) 0%,
          var(--ms-modern-brand-secondary, #14b8a6) 100%
        );
        color: #fff;
        box-shadow: 0 14px 24px rgba(79, 70, 229, 0.18);
      }

      .ms-modern-poll__card {
        display: grid;
        min-width: 0;
        gap: 14px;
        padding: 16px;
        border-radius: 22px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.72);
      }

      .ms-modern-poll__card-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }

      .ms-modern-poll__card-header h3,
      .ms-modern-poll__question {
        margin: 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.98rem;
        font-weight: 800;
      }

      .ms-modern-poll__card-header span {
        min-width: 28px;
        min-height: 28px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 8px;
        border-radius: 999px;
        background: rgba(79, 70, 229, 0.08);
        color: var(--ms-modern-brand-primary, #4f46e5);
        font-size: 0.8rem;
        font-weight: 800;
      }

      .ms-modern-poll__history-item {
        display: grid;
        gap: 10px;
        padding-top: 12px;
        border-top: 1px solid rgba(148, 163, 184, 0.18);
      }

      .ms-modern-poll__results {
        margin: 0;
        padding: 0;
        list-style: none;
        display: grid;
        gap: 8px;
      }

      .ms-modern-poll__results li,
      .ms-modern-poll__live-option {
        display: flex;
        min-width: 0;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
        padding: 10px 12px;
        border-radius: 14px;
        background: rgba(255, 255, 255, 0.76);
      }

      .ms-modern-poll__field {
        display: grid;
        min-width: 0;
        gap: 8px;
      }

      .ms-modern-poll__field span {
        color: var(--ms-modern-text-muted, rgba(59, 78, 104, 0.72));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.76rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .ms-modern-poll__field textarea,
      .ms-modern-poll__field select,
      .ms-modern-poll__field input {
        width: 100%;
        max-width: 100%;
        min-width: 0;
        min-height: 46px;
        border-radius: 14px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.94);
        color: var(--ms-modern-text-primary, #10233f);
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.92rem;
        font-weight: 600;
        padding: 10px 14px;
      }

      .ms-modern-poll__field textarea {
        min-height: 92px;
        resize: vertical;
      }

      .ms-modern-poll__preset-list {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .ms-modern-poll__choice-chip,
      .ms-modern-poll__live-choice {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
        font-weight: 600;
      }

      .ms-modern-poll__choice-chip {
        padding: 10px 12px;
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.82);
      }

      .ms-modern-poll__primary-action,
      .ms-modern-poll__inline-action {
        min-height: 42px;
        border-radius: 999px;
        padding: 0 16px;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
        font-weight: 700;
        cursor: pointer;
      }

      .ms-modern-poll__primary-action {
        border: none;
        background: linear-gradient(
          135deg,
          var(--ms-modern-brand-primary, #4f46e5) 0%,
          var(--ms-modern-brand-secondary, #14b8a6) 100%
        );
        color: #fff;
      }

      .ms-modern-poll__inline-action {
        justify-self: flex-start;
        border: none;
        background: rgba(241, 245, 249, 0.92);
        color: var(--ms-modern-text-primary, #10233f);
      }

      .ms-modern-poll__inline-action--danger {
        background: rgba(254, 242, 242, 0.88);
        color: #b91c1c;
      }

      .ms-modern-poll__empty-state {
        padding: 12px 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.88rem;
      }

      @media (max-width: 640px) {
        .ms-modern-poll__results li,
        .ms-modern-poll__live-option {
          flex-direction: column;
          align-items: flex-start;
        }
      }
    `,
  ],
})
export class ModernPollModalComponent implements OnInit, OnChanges {
  @Input() isPollModalVisible = false;
  @Input() onClose: () => void = () => {};
  @Input() position = 'topRight';
  @Input() backgroundColor = 'var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.96))';
  @Input() member = '';
  @Input() islevel = '';
  @Input() polls: Poll[] = [];
  @Input() poll: Poll | null = null;
  @Input() socket: Socket = {} as Socket;
  @Input() roomName = '';
  @Input() showAlert: ShowAlert = () => {};
  @Input() updateIsPollModalVisible: (isVisible: boolean) => void = () => {};
  @Input() handleCreatePoll: HandleCreatePollType = async () => {};
  @Input() handleEndPoll: HandleEndPollType = async () => {};
  @Input() handleVotePoll: HandleVotePollType = async () => {};
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<unknown>;
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;

  readonly faTimes = faTimes;

  activeTab: 'active' | 'create' | 'history' = 'active';
  newPoll: NewPollFormState = { question: '', type: '', options: [] };

  ngOnInit() {
    this.renderPolls();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isPollModalVisible'] || changes['polls'] || changes['poll']) {
      this.renderPolls();
    }

    if (!this.canCreatePoll() && this.activeTab === 'create') {
      this.activeTab = 'active';
    }
  }

  isVisible(): boolean {
    return this.isEmbedded() || this.isPollModalVisible;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  renderPolls = () => {
    let activePollCount = 0;

    this.polls.forEach((polled) => {
      if (polled.status === 'active' && this.poll && polled.id === this.poll.id) {
        activePollCount++;
      }
    });

    if (this.islevel == '2' && activePollCount === 0 && this.poll && this.poll.status === 'active') {
      this.poll.status = 'inactive';
    }
  };

  calculatePercentage(votes: number[], optionIndex: number): number {
    const totalVotes = votes.reduce((sum, value) => sum + value, 0);
    return totalVotes > 0 ? parseFloat(((votes[optionIndex] / totalVotes) * 100).toFixed(2)) : 0;
  }

  handlePollTypeChange(event: Event) {
    const type = (event.target as HTMLSelectElement).value as NewPollFormState['type'];
    let options: string[] = [];

    switch (type) {
      case 'trueFalse':
        options = ['True', 'False'];
        break;
      case 'yesNo':
        options = ['Yes', 'No'];
        break;
      case 'custom':
        options = ['', '', '', '', ''];
        break;
      default:
        options = [];
        break;
    }

    this.newPoll = { ...this.newPoll, type, options };
  }

  canCreatePoll(): boolean {
    return this.islevel === '2';
  }

  setActiveTab(tab: 'active' | 'create' | 'history') {
    if (tab === 'create' && !this.canCreatePoll()) {
      return;
    }

    this.activeTab = tab;
  }

  async validateAndCreatePoll() {
    this.newPoll.options = this.newPoll.options.filter((option) => option.trim() !== '');

    if (this.newPoll.options.length > 0) {
      await this.handleCreatePoll({
        poll: this.newPoll as Poll,
        socket: this.socket,
        roomName: this.roomName,
        showAlert: this.showAlert,
        updateIsPollModalVisible: this.updateIsPollModalVisible,
      });
      this.activeTab = 'active';
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

  resolvedOverlayStyle(): Record<string, string | number> {
    const baseStyle: Record<string, string | number> = this.isEmbedded()
      ? {
          position: 'static',
          inset: 'auto',
          width: '100%',
          height: '100%',
          minHeight: 0,
          background: 'transparent',
          zIndex: 'auto',
        }
      : {
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(2, 8, 23, 0.66)',
          zIndex: 999,
        };

    return { ...baseStyle, ...this.normalizeStyle(this.overlayStyle) };
  }

  resolvedContentStyle(): Record<string, string | number> {
    const baseStyle: Record<string, string | number> = this.isEmbedded()
      ? {
          position: 'relative',
          inset: 'auto',
          width: '100%',
          maxWidth: 'none',
          height: '100%',
          maxHeight: 'none',
          margin: 0,
          overflowY: 'auto',
          background: this.backgroundColor,
        }
      : (() => {
          const screenWidth = window.innerWidth;
          let modalWidth = 0.82 * screenWidth;
          if (modalWidth > 460) {
            modalWidth = 460;
          }

          return {
            position: 'fixed',
            width: `${modalWidth}px`,
            maxHeight: 'min(82vh, 860px)',
            overflowY: 'auto',
            background: this.backgroundColor,
            ...this.resolvePositionStyle(),
          };
        })();

    return { ...baseStyle, ...this.normalizeStyle(this.contentStyle) };
  }

  private resolvePositionStyle(): Record<string, string> {
    const normalizedPosition = this.position.toLowerCase();

    if (normalizedPosition.includes('center')) {
      return {
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      };
    }

    return {
      top: this.position.includes('top') ? '16px' : 'auto',
      bottom: this.position.includes('bottom') ? '16px' : 'auto',
      left: this.position.includes('Left') ? '16px' : 'auto',
      right: this.position.includes('Right') ? '16px' : 'auto',
    };
  }

  private normalizeStyle(style?: Partial<CSSStyleDeclaration>): Record<string, string | number> {
    return style ? ({ ...style } as Record<string, string | number>) : {};
  }
}