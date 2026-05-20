import { Component, Input, OnChanges, OnDestroy, SimpleChanges, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export type AlertTone = 'success' | 'danger' | 'info' | 'warning';

export type AlertPosition =
  | 'top'
  | 'bottom'
  | 'top-right'
  | 'top-left'
  | 'bottom-right'
  | 'bottom-left'
  | 'center';

export interface AlertComponentOptions {
  visible: boolean;
  message: string;
  type: AlertTone;
  duration?: number; // Optional with default value
  onHide?: () => void; // Optional callback function
  textColor?: string; // Optional text color
  position?: AlertPosition;
  isDarkMode?: boolean;
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


export class AlertComponent implements OnChanges, OnDestroy {
  @Input() visible = false;
  @Input() message = '';
  @Input() type: AlertTone = 'success';
  @Input() duration = 4000;
  @Input() textColor = '';
  @Input() position: AlertPosition = 'top';
  @Input() isDarkMode?: boolean;
  @Input() onHide!: () => void;
  @Input() alertStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<any>;

  alertType: AlertTone = 'success';
  private hideTimeout?: ReturnType<typeof setTimeout>;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['type']) {
      this.alertType = this.type;
    }

    if (changes['visible']) {
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
        this.hideTimeout = undefined;
      }

      if (this.visible) {
        this.hideTimeout = setTimeout(() => {
          this.onHide?.();
          this.hideTimeout = undefined;
        }, this.duration);
      }
    }
  }

  ngOnDestroy() {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }
  }

  handlePress() {
    this.onHide?.();
  }

  get alertLabel(): string {
    switch (this.alertType) {
      case 'danger':
        return 'Attention';
      case 'info':
        return 'Update';
      case 'warning':
        return 'Warning';
      default:
        return 'Success';
    }
  }

  get alertMeta(): string {
    switch (this.alertType) {
      case 'danger':
        return 'Action needed';
      case 'info':
        return 'Room update';
      case 'warning':
        return 'Review needed';
      default:
        return 'Completed';
    }
  }

  get alertIcon(): string {
    switch (this.alertType) {
      case 'danger':
        return '!';
      case 'info':
        return 'i';
      case 'warning':
        return '!';
      default:
        return '✓';
    }
  }

  get alertRole(): 'alert' | 'status' {
    return this.alertType === 'danger' || this.alertType === 'warning' ? 'alert' : 'status';
  }

  get shellStyle(): Record<string, string> {
    const positionStyles: Record<AlertPosition, { justifyContent: string; alignItems: string }> = {
      top: { justifyContent: 'center', alignItems: 'flex-start' },
      bottom: { justifyContent: 'center', alignItems: 'flex-end' },
      'top-right': { justifyContent: 'flex-end', alignItems: 'flex-start' },
      'top-left': { justifyContent: 'flex-start', alignItems: 'flex-start' },
      'bottom-right': { justifyContent: 'flex-end', alignItems: 'flex-end' },
      'bottom-left': { justifyContent: 'flex-start', alignItems: 'flex-end' },
      center: { justifyContent: 'center', alignItems: 'center' },
    };

    return positionStyles[this.position] || positionStyles.top;
  }

  get resolvedIsDarkMode(): boolean {
    if (typeof this.isDarkMode === 'boolean') {
      return this.isDarkMode;
    }

    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }
}
