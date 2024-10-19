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
