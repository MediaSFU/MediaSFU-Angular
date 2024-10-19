import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AlertComponentOptions {
  visible: boolean;
  message: string;
  type: 'success' | 'danger'; // Optional prop with 'success' or 'danger' as default values
  duration?: number; // Optional with default value
  onHide?: () => void; // Optional callback function
  textColor?: string; // Optional text color
}

export type AlertComponentType = (options: AlertComponentOptions) => HTMLElement;

/**
 * AlertComponent is a standalone Angular component that displays an alert message.
 * It supports different types of alerts such as 'success' and 'danger', and can be configured
 * to automatically hide after a specified duration.
 *
 * @selector app-alert-component
 * @standalone true
 * @imports CommonModule
 * @templateUrl ./alert.component.html
 * @styleUrls ./alert.component.css
 *
 * @class AlertComponent
 * @implements OnChanges
 *
 * @property {boolean} visible - Determines if the alert is visible.
 * @property {string} message - The message to be displayed in the alert.
 * @property {'success' | 'danger'} type - The type of alert, either 'success' or 'danger'.
 * @property {number} duration - The duration (in milliseconds) for which the alert is visible before hiding.
 * @property {string} textColor - The color of the text in the alert.
 * @property {() => void} onHide - A callback function that is called when the alert is hidden.
 *
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property of a directive changes.
 * @param {SimpleChanges} changes - An object of changes to the data-bound properties.
 *
 * @method handlePress - Manually hides the alert by calling the onHide callback.
 */
@Component({
  selector: 'app-alert-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.component.component.html',
  styleUrls: ['./alert.component.component.css'],
})
export class AlertComponent implements OnChanges {
  @Input() visible = false;
  @Input() message = '';
  @Input() type: 'success' | 'danger' = 'success';
  @Input() duration = 4000;
  @Input() textColor = 'black';
  @Input() onHide!: () => void;

  alertType: 'success' | 'danger' = 'success';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type']) {
      this.alertType = this.type;
    }

    if (changes['visible']) {
      if (this.visible) {
        setTimeout(() => {
          this.onHide();
        }, this.duration);
      }
    }
  }

  handlePress() {
    this.onHide();
  }
}
