import { Component, Input, Inject } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ControlIconBadgeWidgetComponent } from './control-icon-badge-widget.component';


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
    template: `
    <app-control-icon-badge-widget
      [icon]="icon"
      [iconColor]="iconColor"
      [badgeValue]="badgeValue"
      [showBadge]="showBadge"
    ></app-control-icon-badge-widget>
  `,
    imports: [ControlIconBadgeWidgetComponent]
})
export class MessageWidget {
  @Input() icon!: IconDefinition;
  @Input() iconColor = 'black';
  @Input() badgeValue!: number | string;
  @Input() showBadge = false;

  constructor(
    @Inject('icon') icon: IconDefinition,
    @Inject('iconColor') iconColor: string,
    @Inject('badgeValue') badgeValue: number | string,
    @Inject('showBadge') showBadge: boolean,
  ) {
    this.icon = icon;
    this.iconColor = iconColor;
    this.badgeValue = badgeValue;
    this.showBadge = showBadge;
  }
}
