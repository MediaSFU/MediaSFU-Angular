import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

export interface ModernLoadingModalOptions {
  isVisible: boolean;
  backgroundColor?: string;
  displayColor?: string;
  isDarkMode?: boolean;
  loadingText?: string;
  showSpinner?: boolean;
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  spinnerStyle?: Partial<CSSStyleDeclaration>;
  textStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: TemplateRef<any>;
}

type StyleMap = Record<string, string | number | null | undefined>;

@Component({
  selector: 'app-modern-loading-modal',
  imports: [CommonModule],
  template: `
    <div *ngIf="isVisible && customTemplate" [ngStyle]="modalContainerStyle" class="ms-modern-loading-overlay">
      <ng-container
        *ngTemplateOutlet="
          customTemplate;
          context: {
            $implicit: {
              isVisible,
              backgroundColor,
              displayColor,
              loadingText,
              showSpinner
            }
          }
        "
      ></ng-container>
    </div>

    <div *ngIf="isVisible && !customTemplate" [ngStyle]="modalContainerStyle" class="ms-modern-loading-overlay">
      <div [ngStyle]="modalContentStyle" class="ms-modern-loading-panel">
        <div *ngIf="showSpinner" class="ms-modern-loading-spinner-shell">
          <div class="ms-modern-loading-spinner-halo" aria-hidden="true"></div>
          <div class="ms-modern-loading-spinner" [ngStyle]="spinnerContainerStyle"></div>
        </div>
        <div [ngStyle]="loadingTextStyle" class="ms-modern-loading-text">{{ loadingText }}</div>
      </div>
    </div>
  `,
  styles: [
    `
      .ms-modern-loading-overlay {
        animation: ms-modern-loading-fade-in var(--ms-modern-motion-fast, 160ms) ease-out;
      }

      .ms-modern-loading-panel {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 14px;
        animation: ms-modern-loading-panel-in var(--ms-modern-motion-base, 220ms)
          var(--ms-modern-motion-easing, cubic-bezier(0.22, 1, 0.36, 1));
      }

      .ms-modern-loading-spinner {
        border: 4px solid rgba(255, 255, 255, 0.16);
        border-top: 4px solid var(--ms-modern-accent, #1476d2);
        border-radius: 50%;
        width: 52px;
        height: 52px;
        animation: ms-modern-loading-spin 1s linear infinite;
      }

      .ms-modern-loading-spinner-shell {
        position: relative;
        width: 72px;
        height: 72px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        background: linear-gradient(135deg, rgba(20, 118, 210, 0.16) 0%, rgba(15, 109, 181, 0.2) 100%);
        animation: ms-modern-loading-pulse 1.6s ease-in-out infinite;
      }

      .ms-modern-loading-spinner-halo {
        position: absolute;
        inset: -8px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(20, 118, 210, 0.18) 0%, rgba(20, 118, 210, 0) 72%);
        animation: ms-modern-loading-halo 1.8s ease-in-out infinite;
      }

      .ms-modern-loading-text {
        margin-top: 0;
        font-family: var(--ms-modern-font-family, 'Segoe UI', sans-serif);
      }

      @keyframes ms-modern-loading-spin {
        0% {
          transform: rotate(0deg);
        }

        100% {
          transform: rotate(360deg);
        }
      }

      @keyframes ms-modern-loading-fade-in {
        from {
          opacity: 0;
        }

        to {
          opacity: 1;
        }
      }

      @keyframes ms-modern-loading-panel-in {
        from {
          opacity: 0;
          transform: translateY(10px) scale(0.96);
        }

        to {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }

      @keyframes ms-modern-loading-pulse {
        0%,
        100% {
          transform: scale(0.98);
        }

        50% {
          transform: scale(1.02);
        }
      }

      @keyframes ms-modern-loading-halo {
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
        .ms-modern-loading-overlay,
        .ms-modern-loading-panel,
        .ms-modern-loading-spinner-shell,
        .ms-modern-loading-spinner-halo,
        .ms-modern-loading-spinner {
          animation: none;
        }
      }
    `,
  ],
})
export class ModernLoadingModalComponent {
  @Input() isVisible = false;
  @Input() backgroundColor?: string = '';
  @Input() displayColor?: string = '';
  @Input() isDarkMode?: boolean;
  @Input() loadingText = 'Loading...';
  @Input() showSpinner = true;
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() spinnerStyle?: Partial<CSSStyleDeclaration>;
  @Input() textStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<any>;

  get modalContainerStyle(): StyleMap {
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
      ...((this.overlayStyle as StyleMap | undefined) ?? {}),
    };
  }

  get modalContentStyle(): StyleMap {
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
      boxShadow: '0 28px 56px rgba(15, 23, 42, 0.24), 0 0 28px rgba(20, 118, 210, 0.12)',
      textAlign: 'center',
    };

    return {
      ...baseStyles,
      ...((this.contentStyle as StyleMap | undefined) ?? {}),
    };
  }

  get spinnerContainerStyle(): StyleMap {
    return {
      marginBottom: '0',
      ...((this.spinnerStyle as StyleMap | undefined) ?? {}),
    };
  }

  get loadingTextStyle(): StyleMap {
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
      ...((this.textStyle as StyleMap | undefined) ?? {}),
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