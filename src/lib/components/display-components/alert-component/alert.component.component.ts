import { Component, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AlertComponentOptions {
  visible: boolean;
  message: string;
  type: 'success' | 'danger'; // Optional prop with 'success' or 'danger' as default values
  duration?: number; // Optional with default value
  onHide?: () => void; // Optional callback function
  textColor?: string; // Optional text color
  alertStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: TemplateRef<any>;
}

export type AlertComponentType = (options: AlertComponentOptions) => HTMLElement;

/**
 * AlertComponent - Toast-style notification component for success and error messages
 * 
 * @component
 * @description
 * Displays toast-style alert messages with automatic dismiss timer and manual close option.
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default alert styles with custom message and type
 * 2. **Style Customization**: Override alert appearance with alertStyle prop
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 * 
 * Key Features:
 * - Auto-dismiss with configurable duration
 * - Success/danger type indicators
 * - Manual dismiss capability
 * - Customizable text color and styling
 * - Full template override support
 * 
 * @example
 * Basic Usage:
 * ```html
 * <app-alert-component
 *   [visible]="showAlert"
 *   [message]="'Operation completed successfully!'"
 *   [type]="'success'"
 *   [duration]="5000"
 *   [onHide]="handleAlertClose">
 * </app-alert-component>
 * ```
 * 
 * @example
 * Style Customization:
 * ```html
 * <app-alert-component
 *   [visible]="showError"
 *   [message]="'An error occurred'"
 *   [type]="'danger'"
 *   [textColor]="'white'"
 *   [alertStyle]="{
 *     backgroundColor: '#dc3545',
 *     border: '2px solid #c82333',
 *     borderRadius: '8px',
 *     padding: '15px 20px'
 *   }"
 *   [onHide]="handleErrorClose">
 * </app-alert-component>
 * ```
 * 
 * @example
 * Custom Template Override:
 * ```html
 * <app-alert-component
 *   [visible]="showAlert"
 *   [message]="alertMessage"
 *   [type]="alertType"
 *   [customTemplate]="customAlertTemplate"
 *   [onHide]="handleAlertClose">
 * </app-alert-component>
 * 
 * <ng-template #customAlertTemplate let-visible="visible" let-message="message" let-type="type">
 *   <div class="custom-alert" [class.success]="type === 'success'" [class.danger]="type === 'danger'">
 *     <i [class]="type === 'success' ? 'fa fa-check-circle' : 'fa fa-exclamation-triangle'"></i>
 *     <span>{{ message }}</span>
 *     <button (click)="handleAlertClose()">×</button>
 *   </div>
 * </ng-template>
 * ```
 * 
 * @selector app-alert-component
 * @standalone true
 * @imports CommonModule
 * 
 * @input visible - Whether the alert is currently visible. Default: `false`
 * @input message - The message text to display in the alert. Default: `''`
 * @input type - Alert type ('success' or 'danger') affecting color scheme. Default: `'success'`
 * @input duration - Auto-dismiss duration in milliseconds. Default: `4000`
 * @input textColor - Color of the message text. Default: `'black'`
 * @input onHide - Callback function invoked when alert is dismissed (auto or manual). Default: `undefined`
 * @input alertStyle - Custom CSS styles to apply to the alert container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default alert template. Default: `undefined`
 * 
 * @method ngOnChanges - Handles input changes and triggers auto-dismiss timer when visible
 * @method handlePress - Manually dismisses the alert by invoking onHide callback
 */
@Component({
    selector: 'app-alert-component',
    imports: [CommonModule],
    templateUrl: './alert.component.component.html',
    styleUrls: ['./alert.component.component.css']
})


export class AlertComponent implements OnChanges {
  @Input() visible = false;
  @Input() message = '';
  @Input() type: 'success' | 'danger' = 'success';
  @Input() duration = 4000;
  @Input() textColor = 'black';
  @Input() onHide!: () => void;
  @Input() alertStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<any>;

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
