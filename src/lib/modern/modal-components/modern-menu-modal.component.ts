import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faArrowLeft,
  faBars,
  faMoon,
  faSun,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';

import { EventType } from '../../@types/types';
import { CustomButton, CustomButtons } from '../../components/menu-components/custom-buttons/custom-buttons.component';
import { MeetingIdComponent } from '../../components/menu-components/meeting-id-component/meeting-id-component.component';
import { MeetingPasscodeComponent } from '../../components/menu-components/meeting-passcode-component/meeting-passcode-component.component';
import { ShareButtonsComponent } from '../../components/menu-components/share-buttons-component/share-buttons-component.component';
import { ModernRenderMode, isEmbeddedRenderMode } from '../utils/render-mode.utils';

@Component({
  selector: 'app-modern-menu-modal',
  imports: [
    CommonModule,
    FontAwesomeModule,
    CustomButtons,
    MeetingIdComponent,
    MeetingPasscodeComponent,
    ShareButtonsComponent,
  ],
  template: `
    <ng-container *ngIf="isVisible && customTemplate">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            $implicit: {
              isVisible: isVisible,
              isDarkMode: resolvedIsDarkMode,
              customButtons: customButtons,
              roomName: roomName,
              adminPasscode: adminPasscode,
              islevel: islevel,
              eventType: eventType,
              localLink: localLink,
              onToggleTheme: onToggleTheme,
              onClose: onClose
            }
          }
        "
      ></ng-container>
    </ng-container>

    <div
      *ngIf="isVisible && !customTemplate"
      class="ms-modern-modal-shell"
      [class.ms-modern-modal-shell--embedded]="isEmbedded()"
      [ngStyle]="resolvedOverlayStyle()"
      (click)="handleOverlayClick()"
    >
      <section
        class="ms-modern-menu-modal"
        [class.ms-modern-menu-modal--embedded]="isEmbedded()"
        [class.ms-modern-menu-modal--dark]="resolvedIsDarkMode"
        [ngStyle]="resolvedContentStyle()"
        (click)="$event.stopPropagation()"
      >
        <header *ngIf="showHeader" class="ms-modern-menu-modal__header">
          <button
            *ngIf="showBackButton"
            type="button"
            class="ms-modern-menu-modal__back"
            [attr.aria-label]="backLabel || 'Back'"
            (click)="handleBack()"
          >
            <fa-icon [icon]="faArrowLeft"></fa-icon>
            <span>{{ backLabel || 'Back' }}</span>
          </button>

          <div class="ms-modern-menu-modal__title-wrap">
            <span class="ms-modern-menu-modal__eyebrow">{{ headerEyebrow() }}</span>
            <h2 class="ms-modern-menu-modal__title">
              <fa-icon [icon]="faBars"></fa-icon>
              <span>{{ title || 'Menu' }}</span>
            </h2>
            <p class="ms-modern-menu-modal__subtitle">
              {{ headerSubtitle() }}
            </p>
          </div>

          <button
            type="button"
            class="ms-modern-menu-modal__close"
            aria-label="Close menu"
            (click)="handleClose()"
          >
            <fa-icon [icon]="faTimes"></fa-icon>
          </button>
        </header>

        <div class="ms-modern-menu-modal__body">
          <ng-container *ngIf="showDefaultSections">
            <section class="ms-modern-menu-modal__panel">
              <div class="ms-modern-menu-modal__panel-heading">
                <span class="ms-modern-menu-modal__panel-label">Theme</span>
                <span class="ms-modern-menu-modal__panel-copy">Switch the room shell without leaving the sidebar.</span>
              </div>

              <div class="ms-modern-menu-modal__theme-toggle" role="group" aria-label="Theme mode">
                <button
                  type="button"
                  class="ms-modern-menu-modal__theme-button"
                  [class.ms-modern-menu-modal__theme-button--active]="resolvedIsDarkMode"
                  (click)="toggleTheme(true)"
                >
                  <fa-icon [icon]="faMoon"></fa-icon>
                  <span>Dark</span>
                </button>

                <button
                  type="button"
                  class="ms-modern-menu-modal__theme-button"
                  [class.ms-modern-menu-modal__theme-button--active]="!resolvedIsDarkMode"
                  (click)="toggleTheme(false)"
                >
                  <fa-icon [icon]="faSun"></fa-icon>
                  <span>Light</span>
                </button>
              </div>
            </section>

            <section class="ms-modern-menu-modal__panel">
              <div class="ms-modern-menu-modal__panel-heading">
                <span class="ms-modern-menu-modal__panel-label">Actions</span>
                <span class="ms-modern-menu-modal__panel-copy">Launch secondary room tools from the same sidebar surface.</span>
              </div>

              <app-custom-buttons
                [buttons]="customButtons"
                [isDarkMode]="resolvedIsDarkMode"
                [containerAttributes]="{
                  style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }
                }"
              ></app-custom-buttons>
            </section>

            <section class="ms-modern-menu-modal__panel">
              <div class="ms-modern-menu-modal__panel-heading">
                <span class="ms-modern-menu-modal__panel-label">Meeting ID</span>
                <span class="ms-modern-menu-modal__panel-copy">Copy the active room identifier instantly.</span>
              </div>

              <app-meeting-id-component
                [meetingID]="roomName"
                [labelText]="'Meeting ID'"
                [isDarkMode]="resolvedIsDarkMode"
              ></app-meeting-id-component>
            </section>

            <section *ngIf="islevel === '2'" class="ms-modern-menu-modal__panel">
              <div class="ms-modern-menu-modal__panel-heading">
                <span class="ms-modern-menu-modal__panel-label">Host Passcode</span>
                <span class="ms-modern-menu-modal__panel-copy">Keep moderator access details close by while you manage the room.</span>
              </div>

              <app-meeting-passcode-component
                [meetingPasscode]="adminPasscode"
                [labelText]="'Host Passcode'"
                [isDarkMode]="resolvedIsDarkMode"
              ></app-meeting-passcode-component>
            </section>

            <section *ngIf="shareButtons" class="ms-modern-menu-modal__panel">
              <div class="ms-modern-menu-modal__panel-heading">
                <span class="ms-modern-menu-modal__panel-label">Share</span>
                <span class="ms-modern-menu-modal__panel-copy">Send room access through the built-in sharing actions.</span>
              </div>

              <app-share-buttons-component
                [meetingID]="roomName"
                [eventType]="eventType"
                [isDarkMode]="resolvedIsDarkMode"
                [localLink]="localLink"
              ></app-share-buttons-component>
            </section>
          </ng-container>

          <ng-content></ng-content>
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

      .ms-modern-menu-modal {
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

      .ms-modern-menu-modal--embedded {
        border-radius: 24px;
      }

      .ms-modern-menu-modal__header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 16px;
        padding: 16px 18px 0;
      }

      .ms-modern-menu-modal__back {
        flex: 0 0 auto;
        min-height: 36px;
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 0 14px;
        border-radius: 999px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        background: color-mix(in srgb, var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.94)) 88%, rgba(226, 232, 240, 0.72));
        color: var(--ms-modern-text-primary, #10233f);
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.78rem;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 10px 24px rgba(14, 30, 53, 0.12);
      }

      .ms-modern-menu-modal__title-wrap {
        min-width: 0;
        flex: 1 1 220px;
        display: flex;
        flex-direction: column;
        gap: 6px;
      }

      .ms-modern-menu-modal__eyebrow {
        color: var(--ms-modern-text-muted, rgba(59, 78, 104, 0.72));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.68rem;
        font-weight: 800;
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }

      .ms-modern-menu-modal__title {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.94rem;
        font-weight: 800;
        line-height: 1.2;
      }

      .ms-modern-menu-modal__subtitle {
        margin: 0;
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.78rem;
        line-height: 1.5;
      }

      .ms-modern-menu-modal__close {
        flex: 0 0 auto;
        width: 36px;
        height: 36px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 999px;
        border: 1px solid var(--ms-modern-border-strong, rgba(46, 108, 188, 0.34));
        background: color-mix(in srgb, var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.94)) 86%, rgba(226, 232, 240, 0.8));
        color: var(--ms-modern-text-primary, #10233f);
        box-shadow: 0 12px 28px rgba(14, 30, 53, 0.12);
        cursor: pointer;
      }

      .ms-modern-menu-modal__body {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
        gap: 12px;
        padding: 0 18px 18px;
        overflow-y: auto;
      }

      .ms-modern-menu-modal__panel {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding: 14px 16px;
        border-radius: 18px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        background: color-mix(in srgb, var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.94)) 92%, rgba(226, 232, 240, 0.68));
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.34);
        box-sizing: border-box;
      }

      .ms-modern-menu-modal__panel-heading {
        display: flex;
        flex-direction: column;
        gap: 4px;
      }

      .ms-modern-menu-modal__panel-label {
        color: var(--ms-modern-text-secondary, rgba(16, 35, 63, 0.78));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.72rem;
        font-weight: 800;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .ms-modern-menu-modal__panel-copy {
        color: var(--ms-modern-text-muted, rgba(59, 78, 104, 0.72));
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.78rem;
        line-height: 1.45;
      }

      .ms-modern-menu-modal__theme-toggle {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 10px;
      }

      .ms-modern-menu-modal__theme-button {
        min-height: 38px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border-radius: 14px;
        border: 1px solid var(--ms-modern-border-subtle, rgba(120, 143, 173, 0.28));
        background: color-mix(in srgb, var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.94)) 86%, rgba(226, 232, 240, 0.72));
        color: var(--ms-modern-text-primary, #10233f);
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
        font-size: 0.86rem;
        font-weight: 700;
        cursor: pointer;
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.24);
      }

      .ms-modern-menu-modal__theme-button--active {
        border-color: var(--ms-modern-border-strong, rgba(46, 108, 188, 0.34));
        background: color-mix(in srgb, var(--ms-modern-accent-strong, rgba(37, 99, 235, 1)) 18%, var(--ms-modern-panel-surface-elevated, rgba(255, 255, 255, 0.94)));
      }

      .ms-modern-menu-modal--dark {
        color: #e2e8f0;
        background:
          linear-gradient(
            180deg,
            var(--ms-modern-panel-surface-elevated, rgba(15, 27, 49, 0.94)) 0%,
            var(--ms-modern-panel-surface, rgba(7, 15, 28, 0.88)) 100%
          );
        border-color: rgba(96, 165, 250, 0.2);
        box-shadow: 0 24px 64px rgba(2, 8, 23, 0.34);
      }

      .ms-modern-menu-modal--dark .ms-modern-menu-modal__eyebrow,
      .ms-modern-menu-modal--dark .ms-modern-menu-modal__panel-copy {
        color: rgba(226, 232, 240, 0.72);
      }

      .ms-modern-menu-modal--dark .ms-modern-menu-modal__back {
        color: #e2e8f0;
        border-color: rgba(148, 163, 184, 0.18);
        background: color-mix(in srgb, var(--ms-modern-panel-surface-elevated, rgba(15, 27, 49, 0.9)) 88%, rgba(2, 8, 23, 0.46));
        box-shadow: 0 10px 24px rgba(2, 8, 23, 0.28);
      }

      .ms-modern-menu-modal--dark .ms-modern-menu-modal__subtitle,
      .ms-modern-menu-modal--dark .ms-modern-menu-modal__panel-label {
        color: rgba(226, 232, 240, 0.78);
      }

      .ms-modern-menu-modal--dark .ms-modern-menu-modal__panel {
        background: color-mix(in srgb, var(--ms-modern-panel-surface-elevated, rgba(15, 27, 49, 0.9)) 88%, rgba(2, 8, 23, 0.42));
        border-color: rgba(148, 163, 184, 0.22);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
      }

      .ms-modern-menu-modal--dark .ms-modern-menu-modal__close,
      .ms-modern-menu-modal--dark .ms-modern-menu-modal__theme-button {
        color: #e2e8f0;
        background: color-mix(in srgb, var(--ms-modern-panel-surface-elevated, rgba(15, 27, 49, 0.9)) 84%, rgba(2, 8, 23, 0.38));
        border-color: rgba(148, 163, 184, 0.2);
        box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
      }

      .ms-modern-menu-modal--dark .ms-modern-menu-modal__theme-button--active {
        border-color: rgba(139, 219, 255, 0.38);
        background: color-mix(in srgb, var(--ms-modern-accent-strong, #8bdbff) 22%, var(--ms-modern-panel-surface-elevated, rgba(15, 27, 49, 0.9)));
      }

      @media (max-width: 575px) {
        .ms-modern-menu-modal__header,
        .ms-modern-menu-modal__body {
          padding-left: 18px;
          padding-right: 18px;
        }

        .ms-modern-menu-modal__body {
          padding-bottom: 18px;
        }
      }
    `,
  ],
})
export class ModernMenuModalComponent {
  @Input() backgroundColor = '';
  @Input() isVisible = false;
  @Input() isDarkMode?: boolean;
  @Input() onToggleTheme?: (value: boolean) => void;
  @Input() customButtons: CustomButton[] = [];
  @Input() shareButtons = true;
  @Input() position = 'bottomRight';
  @Input() roomName = '';
  @Input() adminPasscode = '';
  @Input() islevel = '';
  @Input() eventType!: EventType;
  @Input() localLink?: string;
  @Input() title?: string;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<unknown>;
  @Input() onClose = () => {};
  @Input() renderMode: ModernRenderMode = 'modal';
  @Input() showHeader = true;
  @Input() showDefaultSections = true;
  @Input() showBackButton = false;
  @Input() backLabel = 'Back';
  @Input() onBack = () => {};

  protected readonly faArrowLeft = faArrowLeft;
  protected readonly faBars = faBars;
  protected readonly faTimes = faTimes;
  protected readonly faMoon = faMoon;
  protected readonly faSun = faSun;

  get resolvedIsDarkMode(): boolean {
    return !!this.isDarkMode;
  }

  isEmbedded(): boolean {
    return isEmbeddedRenderMode(this.renderMode);
  }

  headerEyebrow(): string {
    return this.showBackButton ? 'Menu Panel' : 'Workspace';
  }

  headerSubtitle(): string {
    if (this.showBackButton) {
      return 'This panel stays inside the detached menu so you can move back without reopening it.';
    }

    return 'Quick controls, room details, and sharing actions for the current session.';
  }

  resolvedOverlayStyle(): Partial<CSSStyleDeclaration> {
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;

    if (this.isEmbedded()) {
      return {
        display: 'block',
        position: 'static',
        inset: 'auto',
        background: 'transparent',
        ...this.overlayStyle,
      };
    }

    return {
      display: 'flex',
      alignItems: this.position.includes('top') ? 'flex-start' : this.position.includes('bottom') ? 'flex-end' : 'center',
      justifyContent: this.position.includes('Left') ? 'flex-start' : this.position.includes('Right') ? 'flex-end' : 'center',
      padding: viewportWidth <= 575 ? '10px' : '18px',
      ...this.overlayStyle,
    };
  }

  resolvedContentStyle(): Partial<CSSStyleDeclaration> {
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1280;
    const isEmbedded = this.isEmbedded();
    const width = viewportWidth <= 575
      ? Math.min(Math.max(viewportWidth - 20, 0), 380)
      : Math.min(viewportWidth * 0.72, 420);
    const modalHeight = viewportWidth <= 575
      ? 'calc(100vh - 20px)'
      : 'min(calc(100vh - 96px), 720px)';

    const resolvedStyle: Partial<CSSStyleDeclaration> = {
      width: isEmbedded ? '100%' : `${width}px`,
      maxWidth: isEmbedded ? '100%' : 'calc(100vw - 20px)',
      height: isEmbedded ? '100%' : modalHeight,
      minHeight: isEmbedded ? '100%' : modalHeight,
      maxHeight: isEmbedded ? '100%' : modalHeight,
      margin: '0',
    };

    if (!this.isTransparentBackground(this.backgroundColor)) {
      resolvedStyle.background = this.backgroundColor;
    }

    return {
      ...resolvedStyle,
      ...this.contentStyle,
    };
  }

  toggleTheme(value: boolean): void {
    this.onToggleTheme?.(value);
  }

  handleClose(): void {
    this.onClose();
  }

  handleBack(): void {
    this.onBack();
  }

  handleOverlayClick(): void {
    if (!this.isEmbedded()) {
      this.handleClose();
    }
  }

  private isTransparentBackground(value: string | undefined): boolean {
    if (!value) {
      return true;
    }

    const normalized = value.replace(/\s+/g, '').toLowerCase();
    return normalized === 'transparent'
      || normalized === 'rgba(0,0,0,0)'
      || normalized === 'rgba(255,255,255,0)'
      || normalized === 'hsla(0,0%,0%,0)';
  }
}