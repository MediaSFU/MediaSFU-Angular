import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Inject,
  Input,
  OnDestroy,
  Optional,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import type { ScreenAudioChoice } from 'mediasfu-shared';

export interface ScreenAudioPromptOptions {
  /** Dark styling (default: follows the system colour scheme). */
  isDarkMode?: boolean;
  title?: string;
  message?: string;
  shareWithAudioLabel?: string;
  shareWithAudioHint?: string;
  shareScreenOnlyLabel?: string;
  shareScreenOnlyHint?: string;
  cancelLabel?: string;
  /** Small note under the choices (e.g. where the browser's own audio switch is). */
  footnote?: string;
  /** Badge on the audio choice; empty string hides it. */
  recommendedLabel?: string;
}

/** Injection token for the options when the prompt is created with an injector. */
export const SCREEN_AUDIO_PROMPT_OPTIONS = 'screenAudioPromptOptions';

const STYLE_ID = 'mediasfu-screen-audio-prompt-style';
const KEYFRAMES = `
@keyframes mediasfuSapFade { from { opacity: 0 } to { opacity: 1 } }
@keyframes mediasfuSapRise { from { opacity: 0; transform: translateY(12px) scale(.97) } to { opacity: 1; transform: none } }
[data-screen-audio-prompt="true"] [data-choice]:focus-visible,
[data-screen-audio-prompt="true"] button:focus-visible { outline: 2px solid var(--sap-accent); outline-offset: 2px }
@media (prefers-reduced-motion: reduce) {
  [data-screen-audio-prompt="true"], [data-screen-audio-prompt="true"] [role="dialog"] { animation: none !important }
}`;

const prefersDark = (): boolean =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia('(prefers-color-scheme: dark)').matches;

// Slate surfaces and a teal accent (the Modern UI's neutral palette).
const DARK = {
  scrim: 'rgba(2, 6, 23, 0.62)', panel: 'rgba(15, 23, 42, 0.94)', border: 'rgba(148, 163, 184, 0.18)',
  text: '#f1f5f9', muted: '#94a3b8', tile: 'rgba(30, 41, 59, 0.75)', tileBorder: 'rgba(148, 163, 184, 0.16)',
  accent: '#2dd4bf', accentSoft: 'rgba(45, 212, 191, 0.14)', accentLine: 'rgba(45, 212, 191, 0.55)',
  icon: '#cbd5e1', onAccent: '#042f2e', shadow: '0 24px 64px rgba(0, 0, 0, 0.55)',
};
const LIGHT = {
  scrim: 'rgba(15, 23, 42, 0.38)', panel: 'rgba(255, 255, 255, 0.97)', border: 'rgba(15, 23, 42, 0.08)',
  text: '#0f172a', muted: '#64748b', tile: '#f8fafc', tileBorder: 'rgba(15, 23, 42, 0.08)',
  accent: '#0d9488', accentSoft: 'rgba(13, 148, 136, 0.09)', accentLine: 'rgba(13, 148, 136, 0.5)',
  icon: '#475569', onAccent: '#ffffff', shadow: '0 24px 64px rgba(15, 23, 42, 0.22)',
};

/**
 * Asks whether a screen share should include the audio of the shared tab or screen. The browser's own picker opens
 * after the choice, so the user still decides what to share there. Emits `choice` once with `audio`, `video`
 * (screen only) or `null` (cancelled). Esc and a click on the backdrop cancel.
 *
 * Usually shown through `ScreenAudioPromptService.ask()`, which the room components pass to the screen-share flow when
 * the media server supports screen audio and the browser can capture it (Chromium desktop).
 *
 * @example
 * ```html
 * <app-screen-audio-prompt [isDarkMode]="true" (choice)="onChoice($event)"></app-screen-audio-prompt>
 * ```
 */
@Component({
  selector: 'app-screen-audio-prompt',
  imports: [CommonModule],
  template: `
    <div
      data-screen-audio-prompt="true"
      [ngStyle]="scrimStyle()"
      (click)="onBackdropClick($event)"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mediasfu-screen-audio-title"
        aria-describedby="mediasfu-screen-audio-message"
        [ngStyle]="panelStyle()"
      >
        <button
          type="button"
          data-close="true"
          [attr.aria-label]="cancelLabel"
          [ngStyle]="closeButtonStyle"
          (click)="choose(null)"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" [attr.stroke]="colors().muted" stroke-width="2" stroke-linecap="round" />
          </svg>
        </button>

        <h2 id="mediasfu-screen-audio-title" [ngStyle]="titleStyle">{{ title }}</h2>
        <p id="mediasfu-screen-audio-message" [ngStyle]="messageStyle()">{{ message }}</p>

        <div [ngStyle]="{ display: 'grid', gap: '10px' }">
          <button
            #primaryButton
            type="button"
            data-choice="audio"
            [ngStyle]="tileStyle('audio')"
            (mouseenter)="hovered = 'audio'"
            (mouseleave)="hovered = null"
            (click)="choose('audio')"
          >
            <span [ngStyle]="iconWellStyle('audio')">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M4 9.5v5h3.5L12 18.5v-13L7.5 9.5H4Z" [attr.fill]="colors().onAccent" />
                <path
                  d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11"
                  [attr.stroke]="colors().onAccent"
                  stroke-width="1.8"
                  stroke-linecap="round"
                />
              </svg>
            </span>
            <span [ngStyle]="{ display: 'grid', gap: '2px', minWidth: 0 }">
              <span [ngStyle]="{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '15px', fontWeight: 650 }">
                {{ shareWithAudioLabel }}
                <span *ngIf="recommendedLabel" [ngStyle]="badgeStyle()">{{ recommendedLabel }}</span>
              </span>
              <span [ngStyle]="{ fontSize: '13px', color: colors().muted }">{{ shareWithAudioHint }}</span>
            </span>
          </button>

          <button
            type="button"
            data-choice="video"
            [ngStyle]="tileStyle('video')"
            (mouseenter)="hovered = 'video'"
            (mouseleave)="hovered = null"
            (click)="choose('video')"
          >
            <span [ngStyle]="iconWellStyle('video')">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <rect x="3" y="4.5" width="18" height="12" rx="2" [attr.stroke]="colors().icon" stroke-width="1.8" />
                <path d="M9 20h6M12 16.5V20" [attr.stroke]="colors().icon" stroke-width="1.8" stroke-linecap="round" />
              </svg>
            </span>
            <span [ngStyle]="{ display: 'grid', gap: '2px', minWidth: 0 }">
              <span [ngStyle]="{ fontSize: '15px', fontWeight: 650 }">{{ shareScreenOnlyLabel }}</span>
              <span [ngStyle]="{ fontSize: '13px', color: colors().muted }">{{ shareScreenOnlyHint }}</span>
            </span>
          </button>
        </div>

        <div [ngStyle]="footerStyle">
          <span [ngStyle]="{ fontSize: '12px', lineHeight: 1.4, color: colors().muted }">{{ footnote }}</span>
          <button type="button" data-choice="cancel" [ngStyle]="cancelButtonStyle()" (click)="choose(null)">
            {{ cancelLabel }}
          </button>
        </div>
      </div>
    </div>
  `,
})
export class ScreenAudioPromptComponent implements AfterViewInit, OnDestroy {
  @Input() isDarkMode?: boolean;
  @Input() title = 'Share audio too?';
  @Input() message = 'Include the sound from what you share, such as a video or music.';
  @Input() shareWithAudioLabel = 'Screen + audio';
  @Input() shareWithAudioHint = 'Everyone hears the tab or screen you share';
  @Input() shareScreenOnlyLabel = 'Screen only';
  @Input() shareScreenOnlyHint = 'Share the picture without its sound';
  @Input() cancelLabel = 'Cancel';
  @Input() footnote = 'Your browser asks what to share next. For a tab, keep “Share tab audio” on.';
  @Input() recommendedLabel = 'Recommended';

  /** Emits once with `audio`, `video` or `null` (cancelled). */
  @Output() choice = new EventEmitter<ScreenAudioChoice>();

  @ViewChild('primaryButton') primaryButton?: ElementRef<HTMLButtonElement>;

  hovered: 'audio' | 'video' | null = null;
  private chosen = false;

  constructor(@Optional() @Inject(SCREEN_AUDIO_PROMPT_OPTIONS) injectedOptions?: ScreenAudioPromptOptions | null) {
    if (injectedOptions) this.applyOptions(injectedOptions);
  }

  /** Copies the defined options onto the inputs (undefined values keep the defaults). */
  applyOptions(options: ScreenAudioPromptOptions): void {
    for (const [key, value] of Object.entries(options)) {
      if (value !== undefined) (this as unknown as Record<string, unknown>)[key] = value;
    }
  }

  ngAfterViewInit(): void {
    ensureKeyframes();
    this.primaryButton?.nativeElement.focus();
  }

  ngOnDestroy(): void {
    this.chosen = true;
  }

  @HostListener('document:keydown', ['$event'])
  onKeydown(event: KeyboardEvent): void {
    if (event.key === 'Escape') this.choose(null);
  }

  onBackdropClick(event: Event): void {
    if (event.target === event.currentTarget) this.choose(null);
  }

  choose(choice: ScreenAudioChoice): void {
    if (this.chosen) return;
    this.chosen = true;
    this.choice.emit(choice);
  }

  colors() {
    return this.isDarkMode ?? prefersDark() ? DARK : LIGHT;
  }

  scrimStyle(): Record<string, string | number> {
    return {
      position: 'fixed',
      inset: 0,
      zIndex: 2147483000,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
      background: this.colors().scrim,
      backdropFilter: 'blur(6px)',
      '-webkit-backdrop-filter': 'blur(6px)',
      animation: 'mediasfuSapFade .18s ease-out',
      '--sap-accent': this.colors().accent,
    };
  }

  panelStyle(): Record<string, string | number> {
    const c = this.colors();
    return {
      position: 'relative',
      width: '100%',
      maxWidth: '400px',
      borderRadius: '20px',
      padding: '22px 20px 18px',
      background: c.panel,
      color: c.text,
      border: `1px solid ${c.border}`,
      boxShadow: c.shadow,
      backdropFilter: 'blur(18px) saturate(140%)',
      '-webkit-backdrop-filter': 'blur(18px) saturate(140%)',
      fontFamily: 'inherit',
      animation: 'mediasfuSapRise .22s cubic-bezier(.2,.8,.2,1)',
    };
  }

  readonly closeButtonStyle = {
    position: 'absolute', top: '12px', right: '12px', width: '32px', height: '32px', borderRadius: '10px',
    border: 'none', background: 'transparent', display: 'grid', placeItems: 'center', cursor: 'pointer',
  };

  readonly titleStyle = { margin: '0 36px 6px 2px', fontSize: '18px', fontWeight: 700, letterSpacing: '-0.01em' };

  messageStyle(): Record<string, string | number> {
    return { margin: '0 0 16px 2px', fontSize: '14px', lineHeight: 1.5, color: this.colors().muted };
  }

  tileStyle(choice: 'audio' | 'video'): Record<string, string | number> {
    const c = this.colors();
    const featured = choice === 'audio';
    const active = this.hovered === choice;
    return {
      display: 'flex',
      alignItems: 'center',
      gap: '14px',
      width: '100%',
      textAlign: 'left',
      padding: '14px 16px',
      borderRadius: '14px',
      cursor: 'pointer',
      font: 'inherit',
      color: c.text,
      background: featured || active ? c.accentSoft : c.tile,
      border: `1px solid ${featured || active ? c.accentLine : c.tileBorder}`,
      boxShadow: active ? `0 0 0 3px ${c.accentSoft}` : 'none',
      transform: active ? 'translateY(-1px)' : 'none',
      transition: 'background .15s ease, border-color .15s ease, box-shadow .15s ease, transform .15s ease',
    };
  }

  iconWellStyle(choice: 'audio' | 'video'): Record<string, string | number> {
    const c = this.colors();
    return {
      flex: '0 0 auto',
      width: '42px',
      height: '42px',
      borderRadius: '12px',
      display: 'grid',
      placeItems: 'center',
      background: choice === 'audio' ? c.accent : c.tile,
      border: choice === 'audio' ? 'none' : `1px solid ${c.tileBorder}`,
    };
  }

  badgeStyle(): Record<string, string | number> {
    const c = this.colors();
    return {
      fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px',
      color: c.accent, background: c.accentSoft, border: `1px solid ${c.accentLine}`,
    };
  }

  readonly footerStyle = {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginTop: '14px',
  };

  cancelButtonStyle(): Record<string, string | number> {
    return {
      flex: '0 0 auto', padding: '8px 12px', borderRadius: '10px', border: 'none', background: 'transparent',
      color: this.colors().muted, fontSize: '14px', fontWeight: 600, cursor: 'pointer',
    };
  }
}

function ensureKeyframes(): void {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = KEYFRAMES;
  document.head.appendChild(style);
}
