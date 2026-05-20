import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import { ParticipantList } from '../../components/participants-components/participant-list/participant-list.component';
import { ParticipantListOthers } from '../../components/participants-components/participant-list-others/participant-list-others.component';
import {
  MessageParticipants,
  MessageParticipantsOptions,
} from '../../methods/participants-methods/message-participants.service';
import {
  MuteParticipants,
  MuteParticipantsOptions,
} from '../../methods/participants-methods/mute-participants.service';
import {
  RemoveParticipants,
  RemoveParticipantsOptions,
} from '../../methods/participants-methods/remove-participants.service';
import {
  ParticipantsModalParameters,
} from '../../components/participants-components/participants-modal/participants-modal.component';
import { ModernRenderMode, isEmbeddedRenderMode } from '../utils/render-mode.utils';

@Component({
  selector: 'app-participants-modal',
  imports: [CommonModule, FontAwesomeModule, ParticipantList, ParticipantListOthers],
  template: `
    <ng-container *ngIf="isVisible() && customTemplate">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            $implicit: {
              isParticipantsModalVisible: isParticipantsModalVisible,
              participantsCounter: participantsCounter_s,
              position: position,
              backgroundColor: backgroundColor,
              parameters: parameters,
              onParticipantsClose: onParticipantsClose,
              onParticipantsFilterChange: onParticipantsFilterChange,
              handleFilterChange: handleFilterChange.bind(this),
              handleClose: handleClose.bind(this)
            }
          }
        "
      ></ng-container>
    </ng-container>

    <div
      *ngIf="isVisible() && !customTemplate"
      class="ms-modern-modal-shell"
      [class.ms-modern-modal-shell--embedded]="isEmbedded()"
      [ngStyle]="resolvedOverlayStyle()"
      (click)="handleOverlayClick()"
    >
      <section
        class="ms-modern-participants-modal"
        [class.ms-modern-participants-modal--embedded]="isEmbedded()"
        [ngStyle]="resolvedContentStyle()"
        (click)="$event.stopPropagation()"
      >
        <header *ngIf="showHeader" class="ms-modern-participants-modal__header">
          <div class="ms-modern-participants-modal__title-wrap">
            <div class="ms-modern-participants-modal__title-row">
              <h2 class="ms-modern-participants-modal__title">Participants</h2>
              <span class="ms-modern-participants-modal__badge">{{ participantsCounter_s }}</span>
            </div>
            <p class="ms-modern-participants-modal__subtitle">
              Search the room roster and take host or co-host actions where permitted.
            </p>
          </div>

          <button
            type="button"
            class="ms-modern-participants-modal__close"
            (click)="handleClose()"
            aria-label="Close participants"
          >
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </header>

        <div class="ms-modern-participants-modal__body">
          <label class="ms-modern-participants-modal__search">
            <input
              type="text"
              class="ms-modern-participants-modal__search-input"
              placeholder="Search participants"
              (input)="handleFilterChange($event)"
            />
          </label>

          <div class="ms-modern-participants-modal__lists">
            <ng-container *ngIf="parameters.participants?.length; else emptyState">
              <div class="ms-modern-participants-modal__list-panel">
                <app-participant-list
                  *ngIf="canShowParticipantList(); else readOnlyList"
                  [participants]="participant_s"
                  [isBroadcast]="parameters.eventType === 'broadcast'"
                  [onMuteParticipants]="resolvedMuteHandler()"
                  [onMessageParticipants]="resolvedMessageHandler()"
                  [onRemoveParticipants]="resolvedRemoveHandler()"
                  [socket]="parameters.socket"
                  [coHostResponsibility]="parameters.coHostResponsibility"
                  [coHost]="parameters.coHost"
                  [member]="parameters.member"
                  [islevel]="parameters.islevel"
                  [roomName]="parameters.roomName"
                  [updateIsMessagesModalVisible]="parameters.updateIsMessagesModalVisible"
                  [updateStartDirectMessage]="parameters.updateStartDirectMessage"
                  [updateDirectMessageDetails]="parameters.updateDirectMessageDetails"
                  [updateParticipants]="parameters.updateParticipants"
                ></app-participant-list>

                <ng-template #readOnlyList>
                  <app-participant-list-others
                    [participants]="participant_s"
                    [coHost]="parameters.coHost"
                    [member]="parameters.member"
                  ></app-participant-list-others>
                </ng-template>
              </div>
            </ng-container>

            <ng-template #emptyState>
              <div class="ms-modern-participants-modal__empty">
                No participants match the current filter.
              </div>
            </ng-template>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .ms-modern-modal-shell {
        position: fixed;
        inset: 0;
        z-index: 999;
        background: rgba(5, 9, 20, 0.56);
      }

      .ms-modern-modal-shell--embedded {
        background: transparent;
        z-index: auto;
      }

      .ms-modern-participants-modal {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        gap: 16px;
        overflow: hidden;
        color: var(--ms-modern-text-primary, #10233f);
        background:
          linear-gradient(
            180deg,
            var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.94)) 0%,
            var(--ms-modern-panel-surface, rgba(255, 255, 255, 0.82)) 100%
          );
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        border-radius: 28px;
        box-shadow: var(--ms-modern-shadow-panel, 0 24px 64px rgba(14, 30, 53, 0.16));
        backdrop-filter: blur(20px);
      }

      .ms-modern-participants-modal--embedded {
        border-radius: 24px;
      }

      .ms-modern-participants-modal__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 20px 22px 0;
      }

      .ms-modern-participants-modal__title-wrap {
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .ms-modern-participants-modal__title-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .ms-modern-participants-modal__title {
        margin: 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1rem;
        font-weight: 700;
        line-height: 1.2;
      }

      .ms-modern-participants-modal__badge {
        min-width: 36px;
        min-height: 32px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0 12px;
        border-radius: 999px;
        background: linear-gradient(135deg, var(--ms-modern-accent, #1476d2), var(--ms-modern-accent-strong, #0d5ca8));
        color: #ffffff;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.8rem;
        font-weight: 700;
      }

      .ms-modern-participants-modal__subtitle {
        margin: 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.82rem;
        line-height: 1.55;
      }

      .ms-modern-participants-modal__close {
        flex: 0 0 auto;
        width: 38px;
        height: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 1px solid var(--ms-modern-border-strong, rgba(46, 108, 188, 0.34));
        background:
          linear-gradient(
            180deg,
            var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.94)) 0%,
            var(--ms-modern-field-background, rgba(248, 250, 252, 0.92)) 100%
          );
        color: var(--ms-modern-text-primary, #10233f);
        box-shadow: 0 12px 28px rgba(14, 30, 53, 0.12);
        cursor: pointer;
      }

      .ms-modern-participants-modal__body {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 0 22px 22px;
      }

      .ms-modern-participants-modal__search {
        display: block;
      }

      .ms-modern-participants-modal__search-input {
        width: 100%;
        min-height: 46px;
        padding: 0 16px;
        border-radius: 18px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        background: var(--ms-modern-field-background, rgba(248, 250, 252, 0.92));
        color: var(--ms-modern-text-primary, #10233f);
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.94rem;
        box-sizing: border-box;
      }

      .ms-modern-participants-modal__lists {
        flex: 1;
        min-height: 0;
        overflow-y: auto;
      }

      .ms-modern-participants-modal__list-panel {
        min-height: 100%;
        padding: 12px;
        border-radius: 20px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        background: var(--ms-modern-panel-surface, rgba(255, 255, 255, 0.82));
        box-sizing: border-box;
      }

      .ms-modern-participants-modal__empty {
        padding: 24px 16px;
        border-radius: 18px;
        border: 1px dashed var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
        text-align: center;
      }

      :host ::ng-deep .container,
      :host ::ng-deep .participant-item,
      :host ::ng-deep .participant-item-others {
        min-width: 0;
      }

      :host ::ng-deep .participant-item {
        display: grid !important;
        grid-template-columns: minmax(0, 1fr) auto !important;
        grid-template-areas:
          'identity danger'
          'actions actions' !important;
        align-items: center !important;
        column-gap: 10px !important;
        row-gap: 10px !important;
      }

      :host ::ng-deep .participant-item__identity {
        grid-area: identity !important;
        min-width: 0;
      }

      :host ::ng-deep .participant-item__status {
        display: none !important;
      }

      :host ::ng-deep .participant-item__actions:not(.participant-item__actions--danger) {
        grid-area: actions !important;
        justify-content: flex-end !important;
      }

      :host ::ng-deep .participant-item__actions--danger {
        grid-area: danger !important;
        justify-self: end !important;
      }

      @media (max-width: 575px) {
        .ms-modern-participants-modal__header,
        .ms-modern-participants-modal__body {
          padding-left: 18px;
          padding-right: 18px;
        }

        .ms-modern-participants-modal__body {
          padding-bottom: 18px;
        }
      }
    `,
  ],
})
export class ModernParticipantsModalComponent implements OnInit, OnChanges {
  @Input() isParticipantsModalVisible = false;
  @Input() onParticipantsClose = () => {};
  @Input() onParticipantsFilterChange = (_filter: string) => {};
  @Input() participantsCounter = 0;
  @Input() onMuteParticipants?: (options: MuteParticipantsOptions) => Promise<void>;
  @Input() onMessageParticipants?: (options: MessageParticipantsOptions) => void;
  @Input() onRemoveParticipants?: (options: RemoveParticipantsOptions) => Promise<void>;
  @Input() parameters: ParticipantsModalParameters = {} as ParticipantsModalParameters;
  @Input() position = 'topRight';
  @Input() backgroundColor = 'var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.94))';
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<unknown>;
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;

  faTimes = faTimes;
  participant_s = [] as ParticipantsModalParameters['participants'];
  participantsCounter_s = 0;

  constructor(
    private readonly muteParticipantsService: MuteParticipants,
    private readonly messageParticipantsService: MessageParticipants,
    private readonly removeParticipantsService: RemoveParticipants,
  ) {}

  ngOnInit() {
    this.ensureHandlers();
    this.updateParticipantsData();
  }

  ngOnChanges(_changes: SimpleChanges) {
    this.ensureHandlers();
    this.updateParticipantsData();
  }

  isVisible(): boolean {
    return this.isEmbedded() || this.isParticipantsModalVisible;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  handleOverlayClick() {
    if (!this.isEmbedded()) {
      this.handleClose();
    }
  }

  handleFilterChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    this.onParticipantsFilterChange(inputElement.value);
  }

  handleClose() {
    this.onParticipantsClose();
  }

  canShowParticipantList() {
    const participantsValue = this.parameters.coHostResponsibility?.find(
      (item: any) => item.name === 'participants',
    )?.value;

    return (
      this.parameters.islevel === '2' ||
      (this.parameters.coHost === this.parameters.member && participantsValue === true)
    );
  }

  resolvedMuteHandler(): (options: MuteParticipantsOptions) => Promise<void> {
    return (
      this.onMuteParticipants ??
      this.muteParticipantsService.muteParticipants.bind(this.muteParticipantsService)
    );
  }

  resolvedMessageHandler(): (options: MessageParticipantsOptions) => void {
    return (
      this.onMessageParticipants ??
      this.messageParticipantsService.messageParticipants.bind(this.messageParticipantsService)
    );
  }

  resolvedRemoveHandler(): (options: RemoveParticipantsOptions) => Promise<void> {
    return (
      this.onRemoveParticipants ??
      this.removeParticipantsService.removeParticipants.bind(this.removeParticipantsService)
    );
  }

  resolvedOverlayStyle(): Record<string, string | number> {
    const baseStyle: Record<string, string | number> = this.isEmbedded()
      ? {
          position: 'static',
          inset: 'auto',
          width: '100%',
          height: '100%',
          minHeight: 0,
          display: 'block',
          background: 'transparent',
          zIndex: 'auto',
        }
      : {
          position: 'fixed',
          inset: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(5, 9, 20, 0.56)',
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
          background: this.backgroundColor,
        }
      : {
          position: 'fixed',
          top: this.position.includes('top') ? '16px' : 'auto',
          bottom: this.position.includes('bottom') ? '16px' : 'auto',
          left: this.position.includes('Left') ? '16px' : 'auto',
          right: this.position.includes('Right') ? '16px' : 'auto',
          width: 'min(460px, calc(100% - 32px))',
          maxWidth: 'calc(100% - 32px)',
          maxHeight: 'calc(100% - 32px)',
          background: this.backgroundColor,
        };

    return { ...baseStyle, ...this.normalizeStyle(this.contentStyle) };
  }

  private ensureHandlers() {
    if (!this.onMuteParticipants) {
      this.onMuteParticipants = this.muteParticipantsService.muteParticipants.bind(
        this.muteParticipantsService,
      );
    }

    if (!this.onMessageParticipants) {
      this.onMessageParticipants = this.messageParticipantsService.messageParticipants.bind(
        this.messageParticipantsService,
      );
    }

    if (!this.onRemoveParticipants) {
      this.onRemoveParticipants = this.removeParticipantsService.removeParticipants.bind(
        this.removeParticipantsService,
      );
    }
  }

  private updateParticipantsData() {
    const freshParameters = this.parameters?.getUpdatedAllParams
      ? this.parameters.getUpdatedAllParams()
      : this.parameters;

    this.parameters = freshParameters ?? ({} as ParticipantsModalParameters);
    this.participant_s = this.parameters.filteredParticipants ?? [];
    this.participantsCounter_s = this.participant_s.length;
  }

  private normalizeStyle(
    style?: Partial<CSSStyleDeclaration>,
  ): Record<string, string | number> {
    return style ? ({ ...style } as Record<string, string | number>) : {};
  }
}