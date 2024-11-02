import { Component, Input, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

/**
 * MenuParticipantsWidget displays an icon and a counter for participants in a compact, customizable widget.
 *
 * @selector app-menu-participants-widget
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 *
 * @inputs
 * - `icon` (IconDefinition): The FontAwesome icon to display.
 * - `iconColor` (string): The color of the icon. Default is 'black'.
 * - `participantsCounter` (number): The number of participants displayed next to the icon.
 *
 * @example
 * ```html
 * <app-menu-participants-widget
 *   [icon]="faUsers"
 *   iconColor="blue"
 *   [participantsCounter]="10"
 * ></app-menu-participants-widget>
 * ```
 **/

@Component({
  selector: 'app-menu-participants-widget',
  standalone: true,
  template: `
    <div
      style="background-color: transparent; border-width: 0; padding: 0; margin: 5px; display: flex; flex-direction: row; align-items: center; justify-content: center;"
    >
      <fa-icon [icon]="icon" size="lg" [ngStyle]="{ color: iconColor }"></fa-icon>
      <span style="background-color: transparent; border-width: 0; padding: 0; margin: 0;">
        {{ participantsCounter }}
      </span>
    </div>
  `,
  imports: [CommonModule, FontAwesomeModule],
})
export class MenuParticipantsWidget {
  @Input() icon!: IconDefinition;
  @Input() iconColor = 'black';
  @Input() participantsCounter!: number;

  constructor(
    @Inject('icon') icon: IconDefinition,
    @Inject('iconColor') iconColor: string,
    @Inject('participantsCounter') participantsCounter: number,
  ) {
    this.icon = icon;
    this.iconColor = iconColor;
    this.participantsCounter = participantsCounter;
  }
}
