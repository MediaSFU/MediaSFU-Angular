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
 * AlertComponent displays an alert message of type 'success' or 'danger' with customizable options.
 * It can automatically hide after a set duration and includes a manual dismiss option.
 *
 * @selector app-alert-component
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `visible` (boolean): Determines if the alert is visible. Default is false.
 * - `message` (string): The message displayed in the alert.
 * - `type` ('success' | 'danger'): Type of alert, either 'success' or 'danger'. Default is 'success'.
 * - `duration` (number): Duration in milliseconds for the alert to remain visible before hiding. Default is 4000 ms.
 * - `textColor` (string): Optional color for alert text. Default is 'black'.
 * - `onHide` (function): Optional callback invoked when the alert is hidden.
 *
 * @methods
 * - `ngOnChanges(changes: SimpleChanges)`: Lifecycle hook invoked on input changes; initiates auto-hide based on duration if `visible` is true.
 * - `handlePress()`: Manually hides the alert by invoking the `onHide` callback.
 *
 * @example
 * ```html
 * <app-alert-component
 *  [visible]="showAlert"
 * [message]="alertMessage"
 * [type]="alertType"
 * [duration]="5000"
 * [textColor]="alertTextColor"
 * [onHide]="onAlertHide">
 * </app-alert-component>
 * ```
 **/
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
