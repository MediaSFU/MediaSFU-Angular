import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheck, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { Socket } from 'socket.io-client';

import { WaitingRoomParticipant } from '../../@types/types';
import {
  RespondToWaiting,
  RespondToWaitingOptions,
  RespondToWaitingType,
} from '../../methods/waiting-methods/respond-to-waiting.service';
import { ModernRenderMode, isEmbeddedRenderMode } from '../utils/render-mode.utils';

interface WaitingRoomModalParameters {
  filteredWaitingRoomList: WaitingRoomParticipant[];
  getUpdatedAllParams?: () => WaitingRoomModalParameters;
  [key: string]: unknown;
}

@Component({
  selector: 'app-waiting-room-modal',
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  template: `
    <ng-container *ngIf="isVisible() && customTemplate">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            $implicit: {
              isWaitingModalVisible: isWaitingModalVisible,
              waitingRoomCounter: waitingRoomCounterState,
              waitingRoomList: waitingRoomListState,
              position: position,
              backgroundColor: backgroundColor,
              roomName: roomName,
              socket: socket,
              onWaitingRoomClose: onWaitingRoomClose,
              onWaitingRoomFilterChange: onWaitingRoomFilterChange,
              handleFilterChange: handleFilterChange.bind(this),
              handleItemPress: handleItemPress.bind(this),
              handleModalClose: handleModalClose.bind(this)
            }
          }
        "
      ></ng-container>
    </ng-container>

    <div
      *ngIf="isVisible() && !customTemplate"
      class="ms-modern-waiting-overlay"
      [ngStyle]="resolvedOverlayStyle()"
    >
      <section class="ms-modern-waiting" [ngStyle]="resolvedContentStyle()">
        <header *ngIf="showHeader" class="ms-modern-waiting__header">
          <div class="ms-modern-waiting__heading">
            <span class="ms-modern-waiting__eyebrow">Lobby control</span>
            <h2 class="ms-modern-waiting__title">
              Waiting room
              <span class="ms-modern-waiting__badge">{{ waitingRoomCounterState }}</span>
            </h2>
            <p class="ms-modern-waiting__subtitle">
              Review pending participants and admit or reject them without leaving the room.
            </p>
          </div>

          <button
            type="button"
            class="ms-modern-waiting__close"
            aria-label="Close waiting room"
            (click)="handleModalClose()"
          >
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </header>

        <div class="ms-modern-waiting__body">
          <label class="ms-modern-waiting__search">
            <fa-icon [icon]="faSearch" class="ms-modern-waiting__search-icon"></fa-icon>
            <input
              type="search"
              placeholder="Search waiting list..."
              [value]="waitingFilterValue"
              (input)="handleFilterChange($event)"
            />
          </label>

          <section class="ms-modern-waiting__list" *ngIf="waitingRoomListState.length; else emptyState">
            <article
              *ngFor="let participant of waitingRoomListState"
              class="ms-modern-waiting__item"
            >
              <div class="ms-modern-waiting__participant-copy">
                <strong>{{ participant.name }}</strong>
                <p>Pending admission to {{ roomName || 'this room' }}.</p>
              </div>

              <div class="ms-modern-waiting__actions">
                <button
                  type="button"
                  class="ms-modern-waiting__action ms-modern-waiting__action--approve"
                  (click)="handleItemPress(participant, true)"
                >
                  <fa-icon [icon]="faCheck"></fa-icon>
                  Admit
                </button>

                <button
                  type="button"
                  class="ms-modern-waiting__action ms-modern-waiting__action--reject"
                  (click)="handleItemPress(participant, false)"
                >
                  <fa-icon [icon]="faTimes"></fa-icon>
                  Reject
                </button>
              </div>
            </article>
          </section>

          <ng-template #emptyState>
            <div class="ms-modern-waiting__empty-state">
              <strong>{{ waitingEmptyTitle() }}</strong>
              <p>{{ waitingEmptyDetail() }}</p>
            </div>
          </ng-template>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .ms-modern-waiting-overlay {
        position: fixed;
        inset: 0;
        background: rgba(2, 8, 23, 0.66);
        backdrop-filter: blur(10px);
        z-index: 999;
      }

      .ms-modern-waiting {
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

      .ms-modern-waiting__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 22px 22px 16px;
        border-bottom: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
      }

      .ms-modern-waiting__eyebrow {
        display: block;
        color: var(--ms-modern-text-muted, rgba(59, 78, 104, 0.72));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.7rem;
        font-weight: 800;
        letter-spacing: 0.12em;
        text-transform: uppercase;
      }

      .ms-modern-waiting__title {
        display: flex;
        align-items: center;
        gap: 10px;
        margin: 6px 0 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1.34rem;
        font-weight: 800;
        line-height: 1.1;
      }

      .ms-modern-waiting__badge {
        min-width: 30px;
        min-height: 30px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 10px;
        border-radius: 999px;
        background: linear-gradient(
          135deg,
          var(--ms-modern-brand-primary, #4f46e5) 0%,
          var(--ms-modern-brand-secondary, #14b8a6) 100%
        );
        color: #fff;
        font-size: 0.86rem;
      }

      .ms-modern-waiting__subtitle {
        margin: 8px 0 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
        line-height: 1.5;
      }

      .ms-modern-waiting__close {
        width: 40px;
        height: 40px;
        flex: 0 0 auto;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        border-radius: 999px;
        background: rgba(255, 255, 255, 0.4);
        color: var(--ms-modern-text-primary, #10233f);
        cursor: pointer;
      }

      .ms-modern-waiting__body {
        display: grid;
        gap: 16px;
        padding: 18px 22px 22px;
      }

      .ms-modern-waiting__search {
        position: relative;
        display: block;
      }

      .ms-modern-waiting__search input {
        min-height: 46px;
        width: 100%;
        border-radius: 14px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.94);
        color: var(--ms-modern-text-primary, #10233f);
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.92rem;
        font-weight: 600;
        padding: 0 14px 0 42px;
        box-sizing: border-box;
      }

      .ms-modern-waiting__search-icon {
        position: absolute;
        top: 50%;
        left: 14px;
        transform: translateY(-50%);
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.52));
        pointer-events: none;
      }

      .ms-modern-waiting__list {
        display: grid;
        gap: 12px;
      }

      .ms-modern-waiting__item,
      .ms-modern-waiting__empty-state {
        border-radius: 20px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(148, 163, 184, 0.22));
        background: rgba(255, 255, 255, 0.72);
      }

      .ms-modern-waiting__item {
        display: grid;
        gap: 14px;
        grid-template-columns: minmax(0, 1fr) auto;
        align-items: center;
        padding: 16px;
      }

      .ms-modern-waiting__participant-copy strong {
        display: block;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.95rem;
        font-weight: 800;
      }

      .ms-modern-waiting__participant-copy p,
      .ms-modern-waiting__empty-state p {
        margin: 4px 0 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.82rem;
        line-height: 1.45;
      }

      .ms-modern-waiting__actions {
        display: inline-flex;
        gap: 10px;
      }

      .ms-modern-waiting__action {
        min-height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border-radius: 999px;
        padding: 0 14px;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.86rem;
        font-weight: 700;
        cursor: pointer;
      }

      .ms-modern-waiting__action--approve {
        border: none;
        background: linear-gradient(135deg, #14b8a6 0%, #22c55e 100%);
        color: #fff;
      }

      .ms-modern-waiting__action--reject {
        border: 1px solid rgba(239, 68, 68, 0.22);
        background: rgba(254, 242, 242, 0.88);
        color: #b91c1c;
      }

      .ms-modern-waiting__empty-state {
        padding: 24px;
        text-align: center;
      }

      .ms-modern-waiting__empty-state strong {
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.96rem;
        font-weight: 800;
      }

      @media (max-width: 640px) {
        .ms-modern-waiting__item {
          grid-template-columns: 1fr;
        }

        .ms-modern-waiting__actions {
          width: 100%;
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }
    `,
  ],
})
export class ModernWaitingRoomModalComponent implements OnChanges, OnInit {
  @Input() isWaitingModalVisible = false;
  @Input() onWaitingRoomClose: () => void = () => {};
  @Input() waitingRoomCounter = 0;
  @Input() onWaitingRoomFilterChange: (filter: string) => void = () => {};
  @Input() waitingRoomList: WaitingRoomParticipant[] = [];
  @Input() updateWaitingList: (updatedList: WaitingRoomParticipant[]) => void = () => {};
  @Input() roomName = '';
  @Input() socket: Socket = {} as Socket;
  @Input() position = 'topRight';
  @Input() backgroundColor = 'var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.96))';
  @Input() parameters: WaitingRoomModalParameters = {} as WaitingRoomModalParameters;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<unknown>;
  @Input() onWaitingRoomItemPress?: RespondToWaitingType;
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;

  readonly faCheck = faCheck;
  readonly faSearch = faSearch;
  readonly faTimes = faTimes;

  waitingRoomCounterState = 0;
  waitingRoomListState: WaitingRoomParticipant[] = [];
  waitingFilterValue = '';

  constructor(private readonly respondToWaitingService: RespondToWaiting) {}

  ngOnInit() {
    if (!this.onWaitingRoomItemPress) {
      this.onWaitingRoomItemPress = (data: RespondToWaitingOptions) =>
        this.respondToWaitingService.respondToWaiting(data);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      this.isVisible() &&
      (changes['isWaitingModalVisible'] || changes['waitingRoomList'] || changes['parameters'])
    ) {
      this.updateParameters();
    }
  }

  isVisible(): boolean {
    return this.isEmbedded() || this.isWaitingModalVisible;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  handleModalClose() {
    this.onWaitingRoomClose();
  }

  handleFilterChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const value = inputElement?.value || '';
    this.waitingFilterValue = value;
    this.onWaitingRoomFilterChange(value);
    this.updateParameters();
  }

  waitingEmptyTitle(): string {
    return this.waitingFilterValue.trim() ? 'No matching participants' : 'No one is waiting';
  }

  waitingEmptyDetail(): string {
    return this.waitingFilterValue.trim()
      ? 'No waiting-room entries match the current filter.'
      : 'The waiting room is currently clear.';
  }

  handleItemPress(participant: WaitingRoomParticipant, type: boolean) {
    this.onWaitingRoomItemPress?.({
      participantId: participant.id,
      participantName: participant.name,
      updateWaitingList: this.updateWaitingList,
      waitingList: this.waitingRoomList,
      roomName: this.roomName,
      type,
      socket: this.socket,
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
          let modalWidth = 0.84 * screenWidth;
          if (modalWidth > 440) {
            modalWidth = 440;
          }

          return {
            position: 'fixed',
            width: `${modalWidth}px`,
            maxHeight: 'min(82vh, 760px)',
            overflowY: 'auto',
            background: this.backgroundColor,
            ...this.resolvePositionStyle(),
          };
        })();

    return { ...baseStyle, ...this.normalizeStyle(this.contentStyle) };
  }

  private updateParameters() {
    const freshParameters = this.parameters?.getUpdatedAllParams
      ? this.parameters.getUpdatedAllParams()
      : this.parameters;
    const filteredWaitingRoomList = Array.isArray(freshParameters?.filteredWaitingRoomList)
      ? freshParameters.filteredWaitingRoomList
      : this.waitingRoomList;

    this.waitingRoomListState = filteredWaitingRoomList;
    this.waitingRoomCounterState = filteredWaitingRoomList.length || this.waitingRoomCounter;
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