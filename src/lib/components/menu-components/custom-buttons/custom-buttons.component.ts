import { Component, Input, Injector, Type } from '@angular/core';
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
  action: () => void;
  show: boolean | (() => boolean);
  backgroundColor?: string;
  disabled?: boolean;
  icon?: IconDefinition;
  iconStyle?: Partial<CSSStyleDeclaration>;
  text?: string;
  textStyle?: Partial<CSSStyleDeclaration>;
  customComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
  injector?: Injector;
}

export interface CustomButtonsOptions {
  buttons: CustomButton[];
}

export type CustomButtonsType = (options: CustomButtonsOptions) => HTMLElement;

@Component({
  selector: 'app-custom-buttons',
  templateUrl: './custom-buttons.component.html',
  styleUrls: ['./custom-buttons.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
})
export class CustomButtons {
  /**
   * CustomButtons component renders a list of customizable buttons.
   *
   * @component
   * @param {CustomButtonsOptions} props - The properties for the CustomButtons component.
   * @param {Array} props.buttons - An array of button configurations.
   * @param {Object} props.buttons[].action - The function to be called when the button is clicked.
   * @param {boolean} props.buttons[].show - Determines if the button should be displayed.
   * @param {string} props.buttons[].backgroundColor - The background color of the button.
   * @param {boolean} props.buttons[].disabled - Determines if the button should be disabled.
   * @param {Object} [props.buttons[].icon] - The icon to be displayed on the button.
   * @param {Object} [props.buttons[].iconStyle] - The style to be applied to the icon.
   * @param {string} [props.buttons[].text] - The text to be displayed on the button.
   * @param {Object} [props.buttons[].textStyle] - The style to be applied to the text.
   * @param {React.ReactNode} [props.buttons[].customComponent] - A custom component to be rendered inside the button.
   * @param {Injector} [props.buttons[].injector] - The injector to be used for the custom component.
   * @returns {HTMLElement} The CustomButtons component.
   * @example
   * ```html
   * <app-custom-buttons [buttons]="buttons"></app-custom-buttons>
   * ```
   * @example
   * ```typescript
   * const buttons = [
   *  {
   *   action: () => console.log('Button 1 clicked'),
   *  show: true,
   * backgroundColor: 'blue',
   * disabled: false,
   * icon: faCoffee,
   * iconStyle: { color: 'white' },
   * text: 'Button 1',
   * textStyle: { color: 'white' },
   * customComponent: <CustomComponent />,
   * injector: Injector.create({ providers: [{ provide: 'customProp', useValue: 'customValue' }] }),
   * },
   * {
   *  action: () => console.log('Button 2 clicked'),
   * show: true,
   * backgroundColor: 'red',
   * disabled: false,
   * icon: faCoffee,
   * iconStyle: { color: 'white' },
   * text: 'Button 2',
   * textStyle: { color: 'white' },
   * customComponent: <CustomComponent />,
   * injector: Injector.create({ providers: [{ provide: 'customProp', useValue: 'customValue' }] }),
   * },
   * ];
   * ```
   */

  @Input() buttons!: CustomButton[];

  faSpinner = faSpinner;

  mergeStyles(defaultStyle: any, customStyle: any): any {
    return { ...defaultStyle, ...customStyle };
  }

  get customButtonIcon(): any {
    return {
      fontSize: '20px',
      marginRight: '5px',
    };
  }

  // Type guard to check if customComponent is of type CustomComponentConfig
  isCustomComponentConfig(obj: any): obj is CustomComponent {
    return obj && typeof obj === 'object' && 'component' in obj && 'injector' in obj;
  }
}
