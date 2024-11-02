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
 * ControlButtonsComponentTouch provides customizable touch controls with various icons, colors, and alignment options.
 *
 * @selector app-control-buttons-component-touch
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 *
 * @inputs
 * - `buttons` (ButtonTouch[]): Array of button configurations with properties for icon, color, action, and visibility.
 * - `position` ('left' | 'right' | 'middle'): Horizontal alignment of the buttons container. Default is 'left'.
 * - `location` ('top' | 'bottom' | 'center'): Vertical alignment of the buttons container. Default is 'top'.
 * - `direction` ('horizontal' | 'vertical'): Layout direction of buttons. Default is 'horizontal'.
 * - `buttonsContainerStyle` (Partial<CSSStyleDeclaration>): Custom styles for the buttons container.
 * - `showAspect` (boolean): Controls the visibility of the buttons container. Default is false.
 *
 * @methods
 * - `getAlignmentStyle()`: Returns alignment styles based on `position`, `location`, and `direction` inputs.
 * - `mergeStyles(...styles: any[])`: Merges multiple style objects into one for flexible styling.
 * - `isCustomComponent(comp)`: Type guard for identifying custom component objects.
 * - `isFunctionComponent(comp)`: Type guard for identifying function components.
 *
 * @example
 * ```html
 * <app-control-buttons-component-touch
 *   [buttons]="[
 *     { name: 'Mute', icon: faMicrophoneSlash, onPress: muteAction, activeColor: 'red' },
 *     { name: 'Unmute', icon: faMicrophone, onPress: unmuteAction, activeColor: 'green' }
 *   ]"
 *   position="right"
 *   location="bottom"
 *   direction="vertical"
 *   [buttonsContainerStyle]="{ backgroundColor: '#333' }"
 *   [showAspect]="true"
 * ></app-control-buttons-component-touch>
 * ```
 **/
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
