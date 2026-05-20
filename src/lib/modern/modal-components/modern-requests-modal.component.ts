import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  IconDefinition,
  faCheck,
  faComments,
  faDesktop,
  faMicrophone,
  faSearch,
  faTimes,
  faVideo,
} from '@fortawesome/free-solid-svg-icons';
import { Socket } from 'socket.io-client';

import { Request } from '../../@types/types';
import {
  RespondToRequests,
  RespondToRequestsType,
} from '../../methods/requests-methods/respond-to-requests.service';
import { ModernRenderMode, isEmbeddedRenderMode } from '../utils/render-mode.utils';

export interface ModernRequestsModalParameters {
  filteredRequestList?: Request[];
  getUpdatedAllParams?: () => { filteredRequestList: Request[] };
  [key: string]: any;
}

@Component({
  selector: 'app-requests-modal',
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <ng-container *ngIf="isVisible() && customTemplate">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            $implicit: {
              isRequestsModalVisible: isRequestsModalVisible,
              requestCounter: requestCounter_s,
              requestList: requestList_s,
              roomName: roomName,
              socket: socket,
              onRequestClose: onRequestClose,
              onRequestFilterChange: onRequestFilterChange,
              handleFilterChange: handleFilterChange.bind(this),
              handleModalClose: handleModalClose.bind(this)
            }
          }
        "
      ></ng-container>
    </ng-container>

    <div
      *ngIf="isVisible() && !customTemplate"
      class="ms-modern-requests-overlay"
      [class.ms-modern-requests-overlay--embedded]="isEmbedded()"
      [ngStyle]="resolvedOverlayStyle()"
      (click)="handleOverlayClick()"
    >
      <section
        class="ms-modern-requests-modal"
        [class.ms-modern-requests-modal--embedded]="isEmbedded()"
        [ngStyle]="resolvedContentStyle()"
        (click)="$event.stopPropagation()"
      >
        <header *ngIf="showHeader" class="ms-modern-requests-modal__header">
          <div class="ms-modern-requests-modal__title-wrap">
            <div class="ms-modern-requests-modal__title-row">
              <h2 class="ms-modern-requests-modal__title">Requests</h2>
              <span class="ms-modern-requests-modal__badge">{{ requestCounter_s }}</span>
            </div>
            <p class="ms-modern-requests-modal__subtitle">
              Review participant requests and respond without leaving the room workflow.
            </p>
          </div>

          <button
            type="button"
            class="ms-modern-requests-modal__close"
            aria-label="Close requests"
            (click)="handleModalClose()"
          >
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </header>

        <div class="ms-modern-requests-modal__body">
          <label class="ms-modern-requests-modal__search">
            <fa-icon [icon]="faSearch" class="ms-modern-requests-modal__search-icon"></fa-icon>
            <input
              type="text"
              class="ms-modern-requests-modal__search-input"
              placeholder="Search requests..."
              [value]="requestFilterValue"
              (input)="handleFilterChange($event)"
            />
          </label>

          <div class="ms-modern-requests-modal__list">
            <ng-container *ngIf="requestList_s.length; else emptyState">
              <article
                *ngFor="let requestItem of requestList_s"
                class="ms-modern-requests-modal__item"
              >
                <div class="ms-modern-requests-modal__item-main">
                  <div class="ms-modern-requests-modal__icon-wrap">
                    <fa-icon
                      [icon]="getIcon(requestItem.icon)"
                      class="ms-modern-requests-modal__icon"
                    ></fa-icon>
                  </div>
                  <div class="ms-modern-requests-modal__copy">
                    <div class="ms-modern-requests-modal__name">
                      {{ requestItem.name || requestItem.username || 'Participant' }}
                    </div>
                    <div class="ms-modern-requests-modal__detail">
                      {{ describeRequest(requestItem.icon) }}
                    </div>
                  </div>
                </div>

                <div class="ms-modern-requests-modal__actions">
                  <button
                    type="button"
                    class="ms-modern-requests-modal__action ms-modern-requests-modal__action--accept"
                    aria-label="Accept request"
                    (click)="handleRequestAction(requestItem, 'accepted')"
                  >
                    <fa-icon [icon]="faCheck"></fa-icon>
                  </button>
                  <button
                    type="button"
                    class="ms-modern-requests-modal__action ms-modern-requests-modal__action--reject"
                    aria-label="Reject request"
                    (click)="handleRequestAction(requestItem, 'rejected')"
                  >
                    <fa-icon [icon]="faTimes"></fa-icon>
                  </button>
                </div>
              </article>
            </ng-container>

            <ng-template #emptyState>
              <div class="ms-modern-requests-modal__empty">
                {{ emptyStateCopy() }}
              </div>
            </ng-template>
          </div>
        </div>
      </section>
    </div>
  `,
  styles: [
    `
      .ms-modern-requests-overlay {
        position: fixed;
        inset: 0;
        z-index: 999;
        background: rgba(2, 8, 23, 0.62);
        backdrop-filter: blur(8px);
        -webkit-backdrop-filter: blur(8px);
      }

      .ms-modern-requests-overlay--embedded {
        position: static;
        inset: auto;
        width: 100%;
        height: 100%;
        min-height: 0;
        background: transparent;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
        z-index: auto;
      }

      .ms-modern-requests-modal {
        position: fixed;
        width: min(420px, calc(100vw - 32px));
        max-height: min(580px, calc(100vh - 32px));
        display: flex;
        flex-direction: column;
        overflow: hidden;
        border-radius: 28px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        background:
          linear-gradient(
            180deg,
            var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.94)) 0%,
            var(--ms-modern-panel-surface, rgba(255, 255, 255, 0.82)) 100%
          );
        color: var(--ms-modern-text-primary, #10233f);
        box-shadow: var(--ms-modern-shadow-panel, 0 24px 64px rgba(14, 30, 53, 0.16));
      }

      .ms-modern-requests-modal--embedded {
        position: relative;
        width: 100%;
        max-width: none;
        max-height: none;
        height: 100%;
        border-radius: 24px;
      }

      .ms-modern-requests-modal__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;
        padding: 22px 22px 18px;
        border-bottom: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
      }

      .ms-modern-requests-modal__title-wrap {
        min-width: 0;
      }

      .ms-modern-requests-modal__title-row {
        display: flex;
        align-items: center;
        gap: 10px;
      }

      .ms-modern-requests-modal__title {
        margin: 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 1.08rem;
        font-weight: 700;
      }

      .ms-modern-requests-modal__badge {
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

      .ms-modern-requests-modal__subtitle {
        margin: 8px 0 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.82rem;
        line-height: 1.55;
      }

      .ms-modern-requests-modal__close {
        width: 40px;
        height: 40px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 1px solid var(--ms-modern-border-strong, rgba(46, 108, 188, 0.34));
        background: var(--ms-modern-field-background, rgba(248, 250, 252, 0.92));
        color: var(--ms-modern-text-primary, #10233f);
        cursor: pointer;
      }

      .ms-modern-requests-modal__body {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 14px;
        padding: 22px;
      }

      .ms-modern-requests-modal__search-input {
        width: 100%;
        min-height: 46px;
        padding: 0 16px 0 42px;
        border-radius: 18px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        background: var(--ms-modern-field-background, rgba(248, 250, 252, 0.92));
        color: var(--ms-modern-text-primary, #10233f);
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.94rem;
        box-sizing: border-box;
      }

      .ms-modern-requests-modal__search {
        position: relative;
        display: block;
      }

      .ms-modern-requests-modal__search-icon {
        position: absolute;
        top: 50%;
        left: 16px;
        transform: translateY(-50%);
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.52));
        pointer-events: none;
      }

      .ms-modern-requests-modal__list {
        flex: 1;
        min-height: 0;
        display: grid;
        gap: 12px;
        overflow-y: auto;
      }

      .ms-modern-requests-modal__item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 14px;
        padding: 14px 16px;
        border-radius: 18px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        background: var(--ms-modern-panel-surface, rgba(255, 255, 255, 0.82));
      }

      .ms-modern-requests-modal__item-main {
        min-width: 0;
        display: flex;
        align-items: center;
        gap: 12px;
      }

      .ms-modern-requests-modal__icon-wrap {
        width: 42px;
        height: 42px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 14px;
        background: color-mix(in srgb, var(--ms-modern-accent, #1476d2) 14%, transparent);
        color: var(--ms-modern-accent, #1476d2);
      }

      .ms-modern-requests-modal__copy {
        min-width: 0;
      }

      .ms-modern-requests-modal__name {
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.94rem;
        font-weight: 700;
      }

      .ms-modern-requests-modal__detail {
        margin-top: 4px;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.82rem;
        line-height: 1.5;
      }

      .ms-modern-requests-modal__actions {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      .ms-modern-requests-modal__action {
        width: 38px;
        height: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 1px solid transparent;
        cursor: pointer;
      }

      .ms-modern-requests-modal__action--accept {
        background: color-mix(in srgb, var(--ms-modern-success, #147d64) 16%, transparent);
        color: var(--ms-modern-success, #147d64);
      }

      .ms-modern-requests-modal__action--reject {
        background: color-mix(in srgb, var(--ms-modern-danger, #d9485f) 14%, transparent);
        color: var(--ms-modern-danger, #d9485f);
      }

      .ms-modern-requests-modal__empty {
        padding: 24px 16px;
        border-radius: 18px;
        border: 1px dashed var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.9rem;
        text-align: center;
      }

      @media (max-width: 575px) {
        .ms-modern-requests-modal__header,
        .ms-modern-requests-modal__body {
          padding-left: 18px;
          padding-right: 18px;
        }

        .ms-modern-requests-modal__item {
          align-items: flex-start;
          flex-direction: column;
        }

        .ms-modern-requests-modal__actions {
          width: 100%;
          justify-content: flex-end;
        }
      }
    `,
  ],
})
export class ModernRequestsModalComponent implements OnInit, OnChanges {
  @Input() isRequestsModalVisible = false;
  @Input() requestCounter = 0;
  @Input() requestList: Request[] = [];
  @Input() roomName = '';
  @Input() socket: Socket = {} as Socket;
  @Input() backgroundColor = 'var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.94))';
  @Input() position = 'topRight';
  @Input() parameters: ModernRequestsModalParameters = {};
  @Input() onRequestClose = () => {};
  @Input() onRequestFilterChange = (_filter: string) => {};
  @Input() onRequestItemPress?: RespondToRequestsType;
  @Input() updateRequestList = (_newRequestList: Request[]) => {};
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<unknown>;
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;

  faTimes = faTimes;
  faCheck = faCheck;
  faSearch = faSearch;

  requestList_s: Request[] = [];
  requestCounter_s = 0;
  requestFilterValue = '';

  private readonly iconMap: Record<string, IconDefinition> = {
    'fa-microphone': faMicrophone,
    'fa-desktop': faDesktop,
    'fa-video': faVideo,
    'fa-comments': faComments,
  };

  constructor(private readonly respondToRequestsService: RespondToRequests) {}

  ngOnInit() {
    this.ensureHandler();
    this.updateRequests();
  }

  ngOnChanges(_changes: SimpleChanges) {
    this.ensureHandler();
    this.updateRequests();
  }

  isVisible(): boolean {
    return this.isEmbedded() || this.isRequestsModalVisible;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  handleOverlayClick() {
    if (!this.isEmbedded()) {
      this.handleModalClose();
    }
  }

  handleModalClose() {
    this.onRequestClose();
  }

  handleFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.requestFilterValue = input.value;
    this.onRequestFilterChange(this.requestFilterValue);
    this.updateRequests();
  }

  emptyStateCopy(): string {
    return this.requestFilterValue.trim()
      ? 'No requests match the current filter.'
      : 'No pending requests.';
  }

  handleRequestAction(request: Request, action: string) {
    this.resolvedRequestHandler()({
      request,
      updateRequestList: this.updateRequestList,
      requestList: this.requestList,
      action,
      roomName: this.roomName,
      socket: this.socket,
    });
  }

  getIcon(iconName: string): IconDefinition {
    return this.iconMap[iconName] ?? faComments;
  }

  describeRequest(iconName: string): string {
    switch (iconName) {
      case 'fa-microphone':
        return 'Wants permission to unmute and speak.';
      case 'fa-desktop':
        return 'Asked to share a screen or presentation.';
      case 'fa-video':
        return 'Requested camera access in the active room.';
      case 'fa-comments':
        return 'Needs a host response through the room chat flow.';
      default:
        return 'Needs a host response.';
    }
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
          background: 'rgba(2, 8, 23, 0.62)',
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
        }
      : {
          position: 'fixed',
          top: this.position.includes('top') ? '16px' : 'auto',
          bottom: this.position.includes('bottom') ? '16px' : 'auto',
          left: this.position.includes('Left') ? '16px' : 'auto',
          right: this.position.includes('Right') ? '16px' : 'auto',
        };

    return { ...baseStyle, ...this.normalizeStyle(this.contentStyle) };
  }

  private ensureHandler() {
    if (!this.onRequestItemPress) {
      this.onRequestItemPress = this.respondToRequestsService.respondToRequests.bind(
        this.respondToRequestsService,
      );
    }
  }

  private resolvedRequestHandler(): RespondToRequestsType {
    return (
      this.onRequestItemPress ??
      this.respondToRequestsService.respondToRequests.bind(this.respondToRequestsService)
    );
  }

  private updateRequests() {
    const freshParameters = this.parameters?.getUpdatedAllParams
      ? this.parameters.getUpdatedAllParams()
      : this.parameters;

    this.requestList_s = freshParameters?.filteredRequestList ?? this.requestList ?? [];
    this.requestCounter_s = this.requestList_s.length;
  }

  private normalizeStyle(
    style?: Partial<CSSStyleDeclaration>,
  ): Record<string, string | number> {
    return style ? ({ ...style } as Record<string, string | number>) : {};
  }
}