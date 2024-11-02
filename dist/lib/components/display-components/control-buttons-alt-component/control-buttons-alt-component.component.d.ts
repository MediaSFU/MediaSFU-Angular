import { Injector, Type } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as i0 from "@angular/core";
export interface CustomComponent {
    component: Type<any>;
    injector: Injector;
}
export interface AltButton {
    name?: string;
    icon?: IconDefinition;
    alternateIcon?: IconDefinition;
    onPress?: () => void;
    active?: boolean | (() => boolean);
    activeColor?: string | (() => string);
    inActiveColor?: string | (() => string);
    color?: string;
    backgroundColor?: {
        default?: string;
    };
    customComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
    iconComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
    alternateIconComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
    show?: boolean | (() => boolean);
}
export interface ControlButtonsAltComponentOptions {
    buttons: AltButton[];
    position?: 'left' | 'right' | 'middle';
    location?: 'top' | 'bottom' | 'center';
    direction?: 'horizontal' | 'vertical';
    buttonsContainerStyle?: Partial<CSSStyleDeclaration>;
    alternateIconComponent?: HTMLElement | CustomComponent;
    iconComponent?: HTMLElement | CustomComponent;
    showAspect?: boolean;
}
export type ControlButtonsAltComponentType = (options: ControlButtonsAltComponentOptions) => HTMLElement;
/**
 * ControlButtonsAltComponent provides configurable button controls with custom icons, colors, and positioning options.
 *
 * @selector app-control-buttons-alt-component
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 *
 * @inputs
 * - `buttons` (AltButton[]): Array of button configurations with options for icon, color, state, and actions.
 * - `position` ('left' | 'right' | 'middle'): Horizontal alignment of buttons. Default is 'left'.
 * - `location` ('top' | 'bottom' | 'center'): Vertical alignment of buttons. Default is 'top'.
 * - `direction` ('horizontal' | 'vertical'): Layout direction for buttons. Default is 'horizontal'.
 * - `buttonsContainerStyle` (Partial<CSSStyleDeclaration>): Custom styles for the container of buttons.
 * - `showAspect` (boolean): Controls the visibility of the button container. Default is false.
 *
 * @methods
 * - `getAlignmentStyle()`: Returns alignment styles based on `position`, `location`, and `direction`.
 * - `getContainerStyle()`: Combines container styles, alignment styles, and visibility settings.
 * - `getButtonStyle(button: AltButton)`: Applies style to each button based on its properties.
 * - `getTextStyle(button: AltButton)`: Sets text styles for button labels.
 * - `isCustomComponent(comp)`: Type guard to identify custom component objects.
 * - `isFunctionComponent(comp)`: Type guard to identify function components.
 *
 * @example
 * ```html
 * <app-control-buttons-alt-component
 *  [buttons]="[
 *    { name: 'Pause', icon: faPause, onPress: pauseAction, activeColor: 'blue' },
 *    { name: 'Play', icon: faPlay, onPress: playAction, color: 'green' }
 *  ]"
 * [position]="'middle'"
 * [location]="'bottom'"
 * [direction]="'vertical'"
 * [buttonsContainerStyle]="{ backgroundColor: '#333' }"
 * [showAspect]="true">
 * </app-control-buttons-alt-component>
 * ```
 **/
export declare class ControlButtonsAltComponent {
    buttons: AltButton[];
    position: 'left' | 'right' | 'middle';
    location: 'top' | 'bottom' | 'center';
    direction: 'horizontal' | 'vertical';
    buttonsContainerStyle: any;
    showAspect: boolean;
    getAlignmentStyle(): any;
    getContainerStyle(): any;
    getButtonStyle(button: AltButton): {
        flexDirection?: string | undefined;
        backgroundColor: string;
        display: string;
        alignItems: string;
        padding: string;
        borderRadius: string;
        marginLeft: string;
        marginRight: string;
        cursor: string;
    };
    getTextStyle(button: AltButton): {
        color: string;
        fontSize: string;
        marginTop: string;
    };
    isCustomComponent(comp: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent)): comp is CustomComponent;
    isFunctionComponent(comp: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent)): comp is () => HTMLElement | CustomComponent;
    styles: {
        container: {
            marginTop: string;
            marginBottom: string;
            zIndex: number;
        };
        buttonContainer: {
            display: string;
            alignItems: string;
            padding: string;
            borderRadius: string;
            marginLeft: string;
            marginRight: string;
            cursor: string;
        };
        verticalButton: {
            flexDirection: string;
        };
        buttonText: {
            fontSize: string;
            marginTop: string;
        };
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlButtonsAltComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ControlButtonsAltComponent, "app-control-buttons-alt-component", never, { "buttons": { "alias": "buttons"; "required": false; }; "position": { "alias": "position"; "required": false; }; "location": { "alias": "location"; "required": false; }; "direction": { "alias": "direction"; "required": false; }; "buttonsContainerStyle": { "alias": "buttonsContainerStyle"; "required": false; }; "showAspect": { "alias": "showAspect"; "required": false; }; }, {}, never, never, true, never>;
}
