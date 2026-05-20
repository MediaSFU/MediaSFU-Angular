import { Component, Input, Inject } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ControlIconBadgeWidgetComponent } from './control-icon-badge-widget.component';

/**
 * MenuWidget displays an icon with an optional badge counter, used for notifications or alerts.
 *
 * @selector app-menu-widget
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 *
 * @inputs
 * - `icon` (IconDefinition): FontAwesome icon to display.
 * - `iconColor` (string): Color of the icon. Default is 'black'.
 * - `badgeValue` (number): The numeric value displayed within the badge.
 * - `showBadge` (boolean): Controls the visibility of the badge. Default is false.
 *
 * @example
 * ```html
 * <app-menu-widget
 *   [icon]="faBell"
 *   iconColor="blue"
 *   [badgeValue]="5"
 *   [showBadge]="true"
 * ></app-menu-widget>
 * ```
 **/

@Component({
    selector: 'app-menu-widget',
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
export class MenuWidget {
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
