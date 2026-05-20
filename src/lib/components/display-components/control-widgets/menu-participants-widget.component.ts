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
    template: `
    <div class="menu-participants-widget">
      <span class="menu-participants-widget__icon" [style.color]="iconColor">
        <fa-icon [icon]="icon" size="lg"></fa-icon>
      </span>
      <span class="menu-participants-widget__value">{{ normalizedCount }}</span>
    </div>
  `,
    styles: [
        `
      .menu-participants-widget {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        min-height: 26px;
        padding: 0 9px 0 7px;
        margin: 0;
        border-radius: 999px;
        background: rgba(15, 23, 42, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.24);
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.14);
        line-height: 1;
        backdrop-filter: blur(10px);
      }

      .menu-participants-widget__icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0 1px 2px rgba(15, 23, 42, 0.18));
      }

      .menu-participants-widget__value {
        color: currentColor;
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.02em;
      }
    `,
    ],
    imports: [CommonModule, FontAwesomeModule]
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

  get normalizedCount(): string {
    return this.participantsCounter > 99 ? '99+' : String(Math.max(this.participantsCounter, 0));
  }
}
