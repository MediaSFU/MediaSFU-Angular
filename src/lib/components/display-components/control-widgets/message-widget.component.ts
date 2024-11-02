import { Component, Input, Inject } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


/**
 * MessageWidget displays an icon with an optional badge counter, useful for unread message notifications.
 *
 * @selector app-message-widget
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 *
 * @inputs
 * - `icon` (IconDefinition): FontAwesome icon to represent the message feature.
 * - `iconColor` (string): Color of the icon. Default is 'black'.
 * - `badgeValue` (number): Numeric value displayed in the badge, e.g., unread message count.
 * - `showBadge` (boolean): Controls the visibility of the badge. Default is false.
 *
 * @example
 * ```html
 * <app-message-widget
 *   [icon]="faEnvelope"
 *   iconColor="blue"
 *   [badgeValue]="3"
 *   [showBadge]="true"
 * ></app-message-widget>
 * ```
 **/

@Component({
  selector: 'app-message-widget',
  standalone: true,
  template: `
    <div style="position: relative; display: inline-block;">
      <fa-icon [icon]="icon" size="lg" [ngStyle]="{ color: iconColor }"></fa-icon>
      <div
        style="
      position: absolute;
      top: -8px;
      right: -8px;
      display: flex;
      align-items: center;
      justify-content: center;
    "
      >
        <div
          style="
        background-color: red;
        border-radius: 8px;
        padding: 4px 8px;
        min-width: 16px; /* Ensure a minimum width for consistent circular shape */
        min-height: 16px; /* Ensure a minimum height for consistent circular shape */
        display: flex;
        align-items: center;
        justify-content: center;
      "
          *ngIf="showBadge"
        >
          <span style="color: white; font-size: 8px; font-weight: bold;">
            {{ badgeValue }}
          </span>
        </div>
      </div>
    </div>
  `,
  imports: [CommonModule, FontAwesomeModule],
})
export class MessageWidget {
  @Input() icon!: IconDefinition;
  @Input() iconColor = 'black';
  @Input() badgeValue!: number;
  @Input() showBadge = false;

  constructor(
    @Inject('icon') icon: IconDefinition,
    @Inject('iconColor') iconColor: string,
    @Inject('badgeValue') badgeValue: number,
    @Inject('showBadge') showBadge: boolean,
  ) {
    this.icon = icon;
    this.iconColor = iconColor;
    this.badgeValue = badgeValue;
    this.showBadge = showBadge;
  }
}
