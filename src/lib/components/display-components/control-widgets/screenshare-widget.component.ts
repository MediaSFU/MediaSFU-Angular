import { Component, Input, Inject, Optional } from '@angular/core';
import { faDesktop, faBan } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

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
