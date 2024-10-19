import { Injector, Type } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as i0 from "@angular/core";
export interface CustomComponent {
    component: Type<any>;
    injector: Injector;
}
export interface ButtonTouch {
    name?: string;
    icon?: IconDefinition;
    alternateIcon?: any;
    onPress?: () => void;
    backgroundColor?: {
        default?: string;
    };
    active?: boolean | (() => boolean);
    alternateIconComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
    iconComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
    customComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
    color?: string;
    activeColor?: string | (() => string);
    inActiveColor?: string | (() => string);
    show?: boolean | (() => boolean);
    disabled?: boolean | (() => boolean);
}
export interface ControlButtonsComponentTouchOptions {
    buttons: ButtonTouch[];
    position?: 'left' | 'right' | 'middle';
    location?: 'top' | 'bottom' | 'center';
    direction?: 'horizontal' | 'vertical';
    buttonsContainerStyle?: Partial<CSSStyleDeclaration>;
    showAspect?: boolean;
}
export type ControlButtonsComponentTouchType = (options: ControlButtonsComponentTouchOptions) => HTMLElement;
/**
 * ControlButtonsComponentTouch is an Angular component that displays a set of control buttons.
 * The buttons can be customized with various styles, icons, and actions.
 *
 * @component
 * @selector app-control-buttons-component-touch
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @template
 * The template includes a container div that holds the buttons. Each button can display an icon,
 * a custom component, or a name. The styles and visibility of the buttons are controlled by the
 * component's inputs.
 *
 * @styles
 * The host element is styled to be a flex container centered both horizontally and vertically.
 *
 * @class ControlButtonsComponentTouch
 *
 * @property {any[]} buttons - An array of button configurations. Each button can have properties like
 * `show`, `backgroundColor`, `onPress`, `icon`, `alternateIcon`, `active`, `activeColor`, `inActiveColor`,
 * `customComponent`, and `name`.
 *
 * @property {string} position - The horizontal alignment of the buttons container. Can be 'left', 'right', or 'middle'.
 * Default is 'left'.
 *
 * @property {string} location - The vertical alignment of the buttons container. Can be 'top', 'bottom', or 'center'.
 * Default is 'top'.
 *
 * @property {string} direction - The direction of the buttons layout. Can be 'horizontal' or 'vertical'.
 * Default is 'horizontal'.
 *
 * @property {any} buttonsContainerStyle - Additional styles for the buttons container.
 *
 * @property {boolean} showAspect - A flag to control the visibility of the buttons container.
 *
 * @method getAlignmentStyle
 * Returns the alignment styles based on the `position`, `location`, and `direction` inputs.
 *
 * @method mergeStyles
 * Merges multiple style objects into one.
 *
 * @example
 * <app-control-buttons-component-touch
 *   [buttons]="buttonsArray"
 *   position="right"
 *   location="bottom"
 *   direction="vertical"
 *   [buttonsContainerStyle]="customStyles"
 *   [showAspect]="true">
 * </app-control-buttons-component-touch>
 */
export declare class ControlButtonsComponentTouch {
    buttons: ButtonTouch[];
    position: string;
    location: string;
    direction: string;
    buttonsContainerStyle: any;
    showAspect: boolean;
    getAlignmentStyle(): any;
    mergeStyles(...styles: any[]): any;
    isCustomComponent(comp: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent)): comp is CustomComponent;
    isFunctionComponent(comp: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent)): comp is () => HTMLElement | CustomComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlButtonsComponentTouch, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ControlButtonsComponentTouch, "app-control-buttons-component-touch", never, { "buttons": { "alias": "buttons"; "required": false; }; "position": { "alias": "position"; "required": false; }; "location": { "alias": "location"; "required": false; }; "direction": { "alias": "direction"; "required": false; }; "buttonsContainerStyle": { "alias": "buttonsContainerStyle"; "required": false; }; "showAspect": { "alias": "showAspect"; "required": false; }; }, {}, never, never, true, never>;
}
