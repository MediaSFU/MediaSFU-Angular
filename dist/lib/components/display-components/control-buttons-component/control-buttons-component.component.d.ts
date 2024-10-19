import { Injector, Type } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import * as i0 from "@angular/core";
export interface CustomComponent {
    component: Type<any>;
    injector: Injector;
}
export interface Button {
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
    disabled?: boolean | (() => boolean);
    show?: boolean | (() => boolean);
}
export interface ControlButtonsComponentOptions {
    buttons: Button[];
    buttonColor?: string;
    buttonBackgroundColor?: {
        default?: string;
        pressed?: string;
    };
    alignment?: 'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly';
    vertical?: boolean;
    buttonsContainerStyle?: Partial<CSSStyleDeclaration>;
    alternateIconComponent?: HTMLElement | CustomComponent;
}
export type ControlButtonsComponentType = (options: ControlButtonsComponentOptions) => HTMLElement;
export declare class ControlButtonsComponent {
    buttons: Button[];
    buttonColor: string;
    buttonBackgroundColor: any;
    alignment: string;
    vertical: boolean;
    buttonsContainerStyle: any;
    getAlignmentStyle(): any;
    mergeStyles(...styles: any[]): any;
    isCustomComponent(comp: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent)): comp is CustomComponent;
    isFunctionComponent(comp: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent)): comp is () => HTMLElement | CustomComponent;
    static ɵfac: i0.ɵɵFactoryDeclaration<ControlButtonsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ControlButtonsComponent, "app-control-buttons-component", never, { "buttons": { "alias": "buttons"; "required": false; }; "buttonColor": { "alias": "buttonColor"; "required": false; }; "buttonBackgroundColor": { "alias": "buttonBackgroundColor"; "required": false; }; "alignment": { "alias": "alignment"; "required": false; }; "vertical": { "alias": "vertical"; "required": false; }; "buttonsContainerStyle": { "alias": "buttonsContainerStyle"; "required": false; }; }, {}, never, never, true, never>;
}
