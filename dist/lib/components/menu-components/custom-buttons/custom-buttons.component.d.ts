import { Injector, Type } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as i0 from "@angular/core";
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
export declare class CustomButtons {
    buttons: CustomButton[];
    faSpinner: IconDefinition;
    mergeStyles(defaultStyle: any, customStyle: any): any;
    get customButtonIcon(): any;
    isCustomComponentConfig(obj: any): obj is CustomComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomButtons, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<CustomButtons, "app-custom-buttons", never, { "buttons": { "alias": "buttons"; "required": false; }; }, {}, never, never, true, never>;
}
