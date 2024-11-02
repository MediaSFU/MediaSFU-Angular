import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopy, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faWhatsapp, faTelegram } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { EventType } from '../../../@types/types';

export interface ShareButton {
  icon: IconDefinition;
  action: () => void;
  show: boolean;
  color?: string;
  iconColor?: string;
}

export interface ShareButtonsComponentOptions {
  meetingID: string;
  shareButtons?: ShareButton[];
  eventType: EventType;
}

export type ShareButtonsComponentType = (options: ShareButtonsComponentOptions) => HTMLElement;

/**
 * @component ShareButtonsComponent
 * @selector app-share-buttons-component
 * @standalone true
 * @description Displays a set of share buttons for sharing a meeting link on social media and email.
 *
 * @example
 * ```html
 * <app-share-buttons-component
 *   [meetingID]="'12345'"
 *   [eventType]="'broadcast'"
 *   [shareButtons]="customShareButtons"
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
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class ShareButtonsComponent {
  @Input() meetingID!: string;
  @Input() shareButtons: ShareButton[] = [];
  @Input() eventType!: EventType;

  defaultShareButtons: ShareButton[] = [
    {
      icon: faCopy,
      action: async () => {
        try {
          await navigator.clipboard.writeText(
            `https://${this.shareName}.mediasfu.com/${this.shareName}/${this.meetingID}`,
          );
        } catch (error) {
          console.error('Failed to copy to clipboard:', error);
        }
      },
      show: true,
    },
    {
      icon: faEnvelope,
      action: () => {
        const emailUrl = `mailto:?subject=Join my meeting&body=Here's the link to the meeting: https://${this.shareName}.mediasfu.com/${this.shareName}/${this.meetingID}`;
        window.open(emailUrl, '_blank');
      },
      show: true,
    },
    {
      icon: faFacebook,
      action: () => {
        const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          `https://${this.shareName}.mediasfu.com/${this.shareName}/${this.meetingID}`,
        )}`;
        window.open(facebookUrl, '_blank');
      },
      show: true,
    },
    {
      icon: faWhatsapp,
      action: () => {
        const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
          `https://${this.shareName}.mediasfu.com/${this.shareName}/${this.meetingID}`,
        )}`;
        window.open(whatsappUrl, '_blank');
      },
      show: true,
    },
    {
      icon: faTelegram,
      action: () => {
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(
          `https://${this.shareName}.mediasfu.com/${this.shareName}/${this.meetingID}`,
        )}`;
        window.open(telegramUrl, '_blank');
      },
      show: true,
    },
  ];

  get shareName() {
    return this.eventType === 'chat'
      ? 'chat'
      : this.eventType === 'broadcast'
      ? 'broadcast'
      : 'meeting';
  }

  get filteredShareButtons() {
    return this.shareButtons.length > 0
      ? this.shareButtons.filter((button) => button.show)
      : this.defaultShareButtons.filter((button) => button.show);
  }
}
