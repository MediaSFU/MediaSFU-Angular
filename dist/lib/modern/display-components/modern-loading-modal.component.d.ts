import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export interface ModernLoadingModalOptions {
    isVisible: boolean;
    backgroundColor?: string;
    displayColor?: string;
    isDarkMode?: boolean;
    loadingText?: string;
    showSpinner?: boolean;
    overlayStyle?: Partial<CSSStyleDeclaration>;
    contentStyle?: Partial<CSSStyleDeclaration>;
    spinnerStyle?: Partial<CSSStyleDeclaration>;
    textStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
}
type StyleMap = Record<string, string | number | null | undefined>;
export declare class ModernLoadingModalComponent {
    isVisible: boolean;
    backgroundColor?: string;
    displayColor?: string;
    isDarkMode?: boolean;
    loadingText: string;
    showSpinner: boolean;
    overlayStyle?: Partial<CSSStyleDeclaration>;
    contentStyle?: Partial<CSSStyleDeclaration>;
    spinnerStyle?: Partial<CSSStyleDeclaration>;
    textStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
    get modalContainerStyle(): StyleMap;
    get modalContentStyle(): StyleMap;
    get spinnerContainerStyle(): StyleMap;
    get loadingTextStyle(): StyleMap;
    get resolvedIsDarkMode(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModernLoadingModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModernLoadingModalComponent, "app-modern-loading-modal", never, { "isVisible": { "alias": "isVisible"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "displayColor": { "alias": "displayColor"; "required": false; }; "isDarkMode": { "alias": "isDarkMode"; "required": false; }; "loadingText": { "alias": "loadingText"; "required": false; }; "showSpinner": { "alias": "showSpinner"; "required": false; }; "overlayStyle": { "alias": "overlayStyle"; "required": false; }; "contentStyle": { "alias": "contentStyle"; "required": false; }; "spinnerStyle": { "alias": "spinnerStyle"; "required": false; }; "textStyle": { "alias": "textStyle"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, {}, never, never, true, never>;
}
export {};
