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
 * @description This component provides a set of share buttons for different social media platforms and email.
 * It allows users to share a meeting link via various channels.
 *
 * @selector app-share-buttons-component
 * @templateUrl ./share-buttons-component.component.html
 * @styleUrls ./share-buttons-component.component.css
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @input {string} meetingID - The ID of the meeting to be shared.
 * @input {ShareButton[]} shareButtons - An array of custom share buttons.
 * @input {string} eventType - The type of event (e.g., 'chat', 'broadcast', 'webinar').
 *
 * @property {ShareButton[]} defaultShareButtons - The default set of share buttons.
 *
 * @getter {string} shareName - Determines the share name based on the event type.
 * @getter {ShareButton[]} filteredShareButtons - Returns the filtered share buttons based on visibility.
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
