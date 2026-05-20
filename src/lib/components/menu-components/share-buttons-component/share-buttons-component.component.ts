import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopy, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faWhatsapp, faTelegram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { EventType } from '../../../@types/types';

export interface ShareButton {
  icon: IconDefinition;
  action: () => void | Promise<void>;
  show: boolean;
  color?: string;
  iconColor?: string;
  wrapperAttributes?: { [key: string]: any };
  iconAttributes?: { [key: string]: any };
}

export interface ShareButtonRenderContext {
  button: ShareButton;
  index: number;
  shareUrl: string;
}

export interface ShareButtonsRenderContext {
  buttons: ShareButton[];
  shareUrl: string;
}

export interface ShareButtonsComponentOptions {
  meetingID: string;
  shareButtons?: ShareButton[];
  eventType: EventType;
  localLink?: string;
  containerAttributes?: { [key: string]: any };
  renderContainer?: TemplateRef<ShareButtonsRenderContext>;
  renderButtons?: TemplateRef<ShareButtonsRenderContext>;
  renderButton?: TemplateRef<ShareButtonRenderContext>;
  renderIcon?: TemplateRef<ShareButtonRenderContext>;
  getShareUrl?: (options: { meetingID: string; eventType: EventType; localLink?: string }) => string;
}

export type ShareButtonsComponentType = (options: ShareButtonsComponentOptions) => HTMLElement;

/**
 * @component ShareButtonsComponent
 * @selector app-share-buttons-component
 * @description Displays a set of share buttons for sharing a meeting link on social media and email.
 *
 * @example
 * ```html
 * <app-share-buttons-component
 *   [meetingID]="'12345'"
 *   [eventType]="'broadcast'"
 *   [shareButtons]="customShareButtons"
 *   [localLink]="'https://www.google.com'"
 * ></app-share-buttons-component>
 * ```
 *
 * ```typescript
 * const customShareButtons = [
 *   { icon: faEnvelope, action: () => console.log('Email'), show: true },
 *   { icon: faFacebook, action: () => console.log('Facebook'), show: true },
 * ];
 * ```
 */

@Component({
  selector: 'app-share-buttons-component',
  templateUrl: './share-buttons-component.component.html',
  styleUrls: ['./share-buttons-component.component.css'],
  imports: [CommonModule, FontAwesomeModule],
})
export class ShareButtonsComponent {
  @Input() meetingID!: string;
  @Input() isDarkMode?: boolean;
  @Input() shareButtons: ShareButton[] = [];
  @Input() eventType!: EventType;
  @Input() localLink?: string;
  @Input() containerAttributes?: { [key: string]: any };
  @Input() renderContainer?: TemplateRef<ShareButtonsRenderContext>;
  @Input() renderButtons?: TemplateRef<ShareButtonsRenderContext>;
  @Input() renderButton?: TemplateRef<ShareButtonRenderContext>;
  @Input() renderIcon?: TemplateRef<ShareButtonRenderContext>;
  @Input() getShareUrlFn?: (options: { meetingID: string; eventType: EventType; localLink?: string }) => string;

  get resolvedIsDarkMode(): boolean {
    if (typeof this.isDarkMode === 'boolean') {
      return this.isDarkMode;
    }

    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }

  defaultShareButtons: ShareButton[] = [
    {
      icon: faCopy,
      action: async () => {
        try {
          await navigator.clipboard.writeText(this.getShareUrl());
        } catch (error) {
          console.error('Failed to copy to clipboard:', error);
        }
      },
      show: true,
      color: '#64748b',
    },
    {
      icon: faEnvelope,
      action: () => {
        const emailUrl = `mailto:?subject=Join my meeting&body=Here's the link to the meeting: ${this.getShareUrl()}`;
        window.open(emailUrl, '_blank');
      },
      show: true,
      color: '#ea4335',
    },
    {
      icon: faFacebook,
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          this.getShareUrl()
        )}`;
        window.open(facebookUrl, '_blank');
      },
      show: true,
      color: '#1877f2',
    },
    {
      icon: faTwitter,
      action: () => {
        const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          `Join my ${this.shareName}: ${this.getShareUrl()}`
        )}`;
        window.open(twitterUrl, '_blank');
      },
      show: true,
      color: '#1da1f2',
    },
    {
      icon: faWhatsapp,
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
          this.getShareUrl()
        )}`;
        window.open(whatsappUrl, '_blank');
      },
      show: true,
      color: '#25d366',
    },
    {
      icon: faTelegram,
      action: () => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
          this.getShareUrl()
        )}`;
        window.open(telegramUrl, '_blank');
      },
      show: true,
      color: '#0088cc',
    },
  ];

  get shareName() {
    return this.eventType === 'chat'
      ? 'chat'
      : this.eventType === 'broadcast'
      ? 'broadcast'
      : 'meeting';
  }

  getShareUrl(): string {
    if (this.getShareUrlFn) {
      return this.getShareUrlFn({
        meetingID: this.meetingID,
        eventType: this.eventType,
        localLink: this.localLink,
      });
    }

    if (this.localLink && !this.localLink.includes('mediasfu.com')) {
      return `${this.localLink}/meeting/${this.meetingID}`;
    }
    return `https://${this.shareName}.mediasfu.com/${this.shareName}/${this.meetingID}`;
  }

  get filteredShareButtons() {
    return this.shareButtons.length > 0
      ? this.shareButtons.filter((button) => button.show)
      : this.defaultShareButtons.filter((button) => button.show);
  }

  get shareButtonsRenderContext(): ShareButtonsRenderContext {
    return {
      buttons: this.filteredShareButtons,
      shareUrl: this.getShareUrl(),
    };
  }

  getButtonRenderContext(button: ShareButton, index: number): ShareButtonRenderContext {
    return {
      button,
      index,
      shareUrl: this.getShareUrl(),
    };
  }

  getButtonStyle(button: ShareButton, index: number): any {
    const isDarkMode = this.resolvedIsDarkMode;
    const baseStyle = {
      width: '44px',
      height: '44px',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0',
      borderRadius: '14px',
      border: isDarkMode ? '1px solid rgba(148, 163, 184, 0.14)' : '1px solid rgba(148, 163, 184, 0.22)',
      backgroundColor: button.color || (isDarkMode ? '#1e293b' : '#0f172a'),
      boxShadow: '0 12px 24px rgba(15, 23, 42, 0.14)',
      cursor: 'pointer',
    };

    if (button.wrapperAttributes?.['style']) {
      return { ...baseStyle, ...button.wrapperAttributes['style'] };
    }

    return baseStyle;
  }

  getIconStyle(button: ShareButton): any {
    const baseStyle = {
      fontSize: '18px',
      color: button.iconColor || 'white',
    };

    if (button.iconAttributes?.['style']) {
      return { ...baseStyle, ...button.iconAttributes['style'] };
    }

    return baseStyle;
  }

  getButtonAriaLabel(index: number): string {
    const labels = ['Copy link', 'Share by email', 'Share on Facebook', 'Share on Twitter', 'Share on WhatsApp', 'Share on Telegram'];
    return labels[index] || 'Share';
  }
}
