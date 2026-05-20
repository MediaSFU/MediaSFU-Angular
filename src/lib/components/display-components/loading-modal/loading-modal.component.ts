import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
export interface LoadingModalOptions {
  isVisible: boolean;
  backgroundColor?: string;
  displayColor?: string;
  isDarkMode?: boolean;
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  spinnerStyle?: Partial<CSSStyleDeclaration>;
  textStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: TemplateRef<any>;
}

export type LoadingModalType = (options: LoadingModalOptions) => HTMLElement;

/**
 * LoadingModal displays a loading spinner and a customizable "Loading..." text as an overlay.
 *
 * @selector app-loading-modal
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `isVisible` (boolean): Controls the visibility of the modal overlay. Default is `false`.
 * - `backgroundColor` (string): Background color of the modal overlay. Default is `'rgba(0, 0, 0, 0.5)'`.
 * - `displayColor` (string): Color of the loading text. Default is `'white'`.
 *
 * @properties
 * - `modalContainerStyle` (object): Computed styles for the modal container.
 * - `modalContentStyle` (object): Computed styles for the modal content.
 * - `spinnerContainerStyle` (object): Computed styles for the spinner container.
 * - `loadingTextStyle` (object): Computed styles for the loading text.
 *
 * @example
 * ```html
 * <app-loading-modal
 *   [isVisible]="true"
 *   [backgroundColor]="'rgba(0, 0, 0, 0.5)'"
 *   [displayColor]="'white'">
 * </app-loading-modal>
 * ```
 *
 * @styles
 * - `.spinner`: Styles for the loading spinner.
 * - `@keyframes spin`: Keyframes for the spinner rotation animation.
 * - `.modal-content`: Styles for the modal content container.
 * - `.loading-text`: Styles for the loading text.
 **/

@Component({
    selector: 'app-loading-modal',
    imports: [CommonModule],
    template: `
    <div *ngIf="isVisible && customTemplate" [ngStyle]="modalContainerStyle" class="loading-overlay">
      <ng-container *ngTemplateOutlet="customTemplate; context: {
        $implicit: {
          isVisible,
          backgroundColor,
          displayColor
        }
      }"></ng-container>
    </div>
    <div *ngIf="isVisible && !customTemplate" [ngStyle]="modalContainerStyle" class="loading-overlay">
      <div [ngStyle]="modalContentStyle" class="modal-content loading-panel">
        <div class="spinner-shell">
          <div class="spinner-halo" aria-hidden="true"></div>
          <div class="spinner" [ngStyle]="spinnerContainerStyle"></div>
        </div>
        <div [ngStyle]="loadingTextStyle" class="loading-text">{{ loadingText }}</div>
      </div>
    </div>
  `,
    styles: [
        `
      .loading-overlay {
        animation: loading-fade-in 180ms ease-out;
      }
      .loading-panel {
        animation: loading-panel-in 220ms cubic-bezier(0.22, 1, 0.36, 1);
      }
      .spinner {
        border: 4px solid rgba(255, 255, 255, 0.16);
        border-top: 4px solid #60a5fa;
        border-radius: 50%;
        width: 52px;
        height: 52px;
        animation: spin 1s linear infinite;
      }
      .spinner-shell {
        position: relative;
        width: 72px;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(59, 130, 246, 0.18) 0%, rgba(79, 70, 229, 0.18) 100%);
        animation: loading-pulse 1.6s ease-in-out infinite;
      }
      .spinner-halo {
        position: absolute;
        inset: -8px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(96, 165, 250, 0.18) 0%, rgba(96, 165, 250, 0) 72%);
        animation: loading-halo 1.8s ease-in-out infinite;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .modal-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
      }
      .loading-text {
        margin-top: 0;
      }
      @keyframes loading-fade-in {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
      @keyframes loading-panel-in {
        from {
          opacity: 0;
          transform: translateY(10px) scale(0.96);
        }
        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      @keyframes loading-pulse {
        0%,
        100% {
          transform: scale(0.98);
        }
        50% {
          transform: scale(1.02);
        }
      }
      @keyframes loading-halo {
        0%,
        100% {
          opacity: 0.65;
          transform: scale(0.96);
        }
        50% {
          opacity: 1;
          transform: scale(1.04);
        }
      }
      @media (prefers-reduced-motion: reduce) {
        .loading-overlay,
        .loading-panel,
        .spinner-shell,
        .spinner-halo,
        .spinner {
          animation: none;
        }
      }
    `,
    ]
})
export class LoadingModal {
  @Input() isVisible = false;
  @Input() backgroundColor?: string = '';
  @Input() displayColor?: string = '';
  @Input() isDarkMode?: boolean;
  @Input() loadingText = 'Loading...';
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() spinnerStyle?: Partial<CSSStyleDeclaration>;
  @Input() textStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<any>;

  get modalContainerStyle() {
    const isDarkMode = this.resolvedIsDarkMode;
    const baseStyles = {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: this.backgroundColor || (isDarkMode ? 'rgba(2, 6, 23, 0.72)' : 'rgba(15, 23, 42, 0.34)'),
      backdropFilter: 'blur(14px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '999',
    };
    return {
      ...baseStyles,
      ...(this.overlayStyle ?? {}),
    };
  }

  get modalContentStyle() {
    const isDarkMode = this.resolvedIsDarkMode;
    const baseStyles = {
      background: isDarkMode
        ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.94) 0%, rgba(30, 41, 59, 0.92) 100%)'
        : 'linear-gradient(135deg, rgba(255, 255, 255, 0.96) 0%, rgba(241, 245, 249, 0.94) 100%)',
      borderRadius: '28px',
      padding: '28px 32px',
      minWidth: '240px',
      border: isDarkMode
        ? '1px solid rgba(148, 163, 184, 0.18)'
        : '1px solid rgba(148, 163, 184, 0.24)',
      boxShadow: '0 28px 56px rgba(15, 23, 42, 0.24), 0 0 28px rgba(96, 165, 250, 0.12)',
      textAlign: 'center',
    };
    return {
      ...baseStyles,
      ...(this.contentStyle ?? {}),
    };
  }

  get spinnerContainerStyle() {
    const baseStyles = {
      marginBottom: '0',
    };
    return {
      ...baseStyles,
      ...(this.spinnerStyle ?? {}),
    };
  }

  get loadingTextStyle() {
    const isDarkMode = this.resolvedIsDarkMode;
    const baseStyles = {
      color: this.displayColor || (isDarkMode ? '#e2e8f0' : '#0f172a'),
      fontSize: '0.98rem',
      fontWeight: '700',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    };
    return {
      ...baseStyles,
      ...(this.textStyle ?? {}),
    };
  }

  get resolvedIsDarkMode(): boolean {
    if (typeof this.isDarkMode === 'boolean') {
      return this.isDarkMode;
    }

    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }
}
