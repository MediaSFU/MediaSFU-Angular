import { Component, Input, Inject, Optional } from '@angular/core';
import { faDesktop, faBan } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

/**
 * ScreenShareWidget - Component representing a screen share button with an optional disabled state.
 *
 * This component displays a screen share icon (desktop icon) and an overlay ban icon if disabled.
 * The disabled state can be controlled either by an injected dependency or an @Input property.
 *
 * @component
 * @name ScreenShareWidget
 * @example
 * ```html
 * <app-screen-share-button [disabled]="isDisabled"></app-screen-share-button>
 * ```
 *
 * @param {boolean} disabled - Optional input to toggle the disabled state of the button.
 *
 * @property {boolean} computedDisabled - Internal state to determine if the button is disabled, controlled by either injected value or @Input property.
 * @property {faDesktop} faDesktop - FontAwesome desktop icon for screen sharing.
 * @property {faBan} faBan - FontAwesome ban icon indicating a disabled state.
 *
 * @example
 * <app-screen-share-button [disabled]="true"></app-screen-share-button>
 *
 * @constructor
 * @param {boolean} [injectedDisabled] - Optional injected disabled value.
 *
 * @method ngOnChanges - Updates the computedDisabled property based on changes to the @Input disabled.
 */


@Component({
    selector: 'app-screen-share-button',
    imports: [CommonModule, FontAwesomeModule],
    template: `
    <div class="screen-share-widget" [class.screen-share-widget--disabled]="computedDisabled">
      <fa-icon
        [icon]="faDesktop"
        size="lg"
        class="screen-share-widget__icon"
        [style.color]="computedDisabled ? iconColor : '#10b981'"
      >
      </fa-icon>

      <span *ngIf="computedDisabled" class="screen-share-widget__overlay" aria-hidden="true">
        <fa-icon [icon]="faBan" size="xs"></fa-icon>
      </span>
    </div>
  `,
    styles: [
        `
      .screen-share-widget {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        line-height: 1;
      }

      .screen-share-widget__icon {
        filter: drop-shadow(0 1px 2px rgba(15, 23, 42, 0.24));
      }

      .screen-share-widget__overlay {
        position: absolute;
        top: -2px;
        right: -4px;
        width: 12px;
        height: 12px;
        border-radius: 999px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: linear-gradient(135deg, #fb7185 0%, #ef4444 48%, #dc2626 100%);
        color: #ffffff;
        border: 1.5px solid rgba(255, 255, 255, 0.94);
        box-shadow: 0 6px 12px rgba(220, 38, 38, 0.24);
      }
    `,
    ]
})
export class ScreenShareWidget {
  @Input() disabled = false; // Input to toggle disabled state
  @Input() iconColor = 'currentColor';

  faDesktop = faDesktop;
  faBan = faBan;

  computedDisabled: boolean;

  constructor(
    @Optional() @Inject('disabled') private injectedDisabled: boolean,
    @Optional() @Inject('iconColor') private injectedIconColor: string,
  ) {
    // Use the injected value if provided, otherwise fall back to the @Input value
    this.computedDisabled = this.injectedDisabled != null ? this.injectedDisabled : this.disabled;
    this.iconColor = this.injectedIconColor || this.iconColor;
  }

  ngOnChanges() {
    // Update computedDisabled whenever the Input changes
    if (this.injectedDisabled == null) {
      this.computedDisabled = this.disabled;
    }
  }
}
