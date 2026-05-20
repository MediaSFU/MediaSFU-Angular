import { Component, Input, Injector, Type, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface CustomComponent {
  component: Type<any>;
  injector: Injector;
}

export interface CustomButton {
  action?: (() => void) | (() => Promise<void>);
  show?: boolean | (() => boolean);
  backgroundColor?: string;
  disabled?: boolean;
  icon?: IconDefinition;
  iconStyle?: Partial<CSSStyleDeclaration>;
  text?: string;
  textStyle?: Partial<CSSStyleDeclaration>;
  customComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
  injector?: Injector;
  buttonAttributes?: { [key: string]: any };
  contentAttributes?: { [key: string]: any };
  iconAttributes?: { [key: string]: any };
  renderAsButton?: boolean;
}

export interface CustomButtonsOptions {
  buttons: CustomButton[];
  containerAttributes?: { [key: string]: any };
  fallbackSpinner?: TemplateRef<any>;
}

export type CustomButtonsType = (options: CustomButtonsOptions) => HTMLElement;

/**
 * CustomButtons component renders a list of customizable buttons.
 *
 * @selector app-custom-buttons
 * @standalone true
 * @imports [CommonModule, FormsModule, FontAwesomeModule]
 *
 * @input {CustomButton[]} buttons - Array of button configurations.
 * Each button configuration includes properties such as:
 * - **action**: Function executed on button click.
 * - **show**: Boolean or function determining button visibility.
 * - **backgroundColor**: Background color of the button.
 * - **disabled**: Boolean to disable button if set to true.
 * - **icon**: Optional FontAwesome icon displayed on the button.
 * - **iconStyle**: Style applied to the icon.
 * - **text**: Text displayed on the button.
 * - **textStyle**: Style applied to the text.
 * - **customComponent**: A custom Angular component or HTML element rendered within the button.
 * - **injector**: Injector used for providing dependencies to the custom component.
 *
 * @example
 * ```html
 * <app-custom-buttons [buttons]="buttonsArray"></app-custom-buttons>
 * ```
 *
 * @example
 * ```typescript
 * const buttonsArray: CustomButton[] = [
 *   {
 *     action: () => console.log('Button 1 clicked'),
 *     show: true,
 *     backgroundColor: 'blue',
 *     disabled: false,
 *     icon: faCoffee,
 *     iconStyle: { color: 'white' },
 *     text: 'Button 1',
 *     textStyle: { color: 'white' },
 *     customComponent: <CustomComponent />,
 *     injector: Injector.create({
 *       providers: [{ provide: 'customProp', useValue: 'customValue' }]
 *     }),
 *   },
 * ];
 * ```
 *
 * @class CustomButtons
 * @method mergeStyles - Merges default styles with user-provided custom styles.
 * @method isCustomComponentConfig - Type guard to check if an object is of type CustomComponent.
 */

@Component({
    selector: 'app-custom-buttons',
    templateUrl: './custom-buttons.component.html',
    styleUrls: ['./custom-buttons.component.css'],
    imports: [CommonModule, FormsModule, FontAwesomeModule]
})
export class CustomButtons {

  @Input() buttons!: CustomButton[];
  @Input() isDarkMode?: boolean;
  @Input() containerAttributes?: { [key: string]: any };
  @Input() fallbackSpinner?: TemplateRef<any>;

  faSpinner = faSpinner;

  mergeStyles(defaultStyle: any, customStyle: any): any {
    return { ...defaultStyle, ...customStyle };
  }

  get resolvedIsDarkMode(): boolean {
    if (typeof this.isDarkMode === 'boolean') {
      return this.isDarkMode;
    }

    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }

  isButtonVisible(button: CustomButton): boolean {
    const resolvedShow = typeof button.show === 'function' ? button.show() : button.show;
    return resolvedShow !== false;
  }

  getButtonStyles(button: CustomButton): any {
    const isDarkMode = this.resolvedIsDarkMode;
    const backgroundColor = button.backgroundColor || (isDarkMode
      ? 'rgba(255, 255, 255, 0.06)'
      : 'rgba(148, 163, 184, 0.12)');
    const baseStyle = {
      display: this.isButtonVisible(button) ? 'flex' : 'none',
      width: '100%',
      padding: '14px 16px',
      borderRadius: '18px',
      border: isDarkMode ? '1px solid rgba(148, 163, 184, 0.16)' : '1px solid rgba(148, 163, 184, 0.24)',
      background: backgroundColor,
      color: isDarkMode ? '#e2e8f0' : '#0f172a',
      boxShadow: '0 12px 24px rgba(15, 23, 42, 0.12)',
      opacity: button.disabled ? '0.55' : '1',
      cursor: button.disabled ? 'not-allowed' : 'pointer',
    };

    if (button.buttonAttributes?.['style']) {
      return { ...baseStyle, ...button.buttonAttributes['style'] };
    }

    return baseStyle;
  }

  get customButtonIcon(): any {
    return {
      fontSize: '18px',
      color: 'inherit',
    };
  }

  // Type guard to check if customComponent is of type CustomComponentConfig
  isCustomComponentConfig(obj: any): obj is CustomComponent {
    return obj && typeof obj === 'object' && 'component' in obj && 'injector' in obj;
  }
}
