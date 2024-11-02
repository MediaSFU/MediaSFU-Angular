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
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div style="position: relative; display: inline-block;">
      <!-- Desktop icon, change color based on disabled state -->
      <fa-icon [icon]="faDesktop" size="lg" [style.color]="computedDisabled ? 'black' : 'green'">
      </fa-icon>

      <!-- Red Ban icon on top if disabled -->
      <fa-icon
        *ngIf="computedDisabled"
        [icon]="faBan"
        size="lg"
        style="color: red; position: absolute; top: 0; right: 0;"
      >
      </fa-icon>
    </div>
  `,
})
export class ScreenShareWidget {
  @Input() disabled = false; // Input to toggle disabled state

  faDesktop = faDesktop;
  faBan = faBan;

  computedDisabled: boolean;

  constructor(@Optional() @Inject('disabled') private injectedDisabled: boolean) {
    // Use the injected value if provided, otherwise fall back to the @Input value
    this.computedDisabled = this.injectedDisabled != null ? this.injectedDisabled : this.disabled;
  }

  ngOnChanges() {
    // Update computedDisabled whenever the Input changes
    if (this.injectedDisabled == null) {
      this.computedDisabled = this.disabled;
    }
  }
}
