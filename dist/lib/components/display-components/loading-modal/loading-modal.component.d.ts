import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export interface LoadingModalOptions {
    isVisible: boolean;
    backgroundColor?: string;
    displayColor?: string;
    overlayStyle?: Partial<CSSStyleDeclaration>;
    contentStyle?: Partial<CSSStyleDeclaration>;
    spinnerStyle?: Partial<CSSStyleDeclaration>;
    textStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
}
export type LoadingModalType = (options: LoadingModalOptions) => HTMLElement;
/**
 * LoadingModal displays a loading spinner and a customizable "Loading..." text as an overlay.
 *
 * @selector app-loading-modal
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `isVisible` (boolean): Controls the visibility of the modal overlay. Default is `false`.
 * - `backgroundColor` (string): Background color of the modal overlay. Default is `'rgba(0, 0, 0, 0.5)'`.
 * - `displayColor` (string): Color of the loading text. Default is `'white'`.
 *
 * @properties
 * - `modalContainerStyle` (object): Computed styles for the modal container.
 * - `modalContentStyle` (object): Computed styles for the modal content.
 * - `spinnerContainerStyle` (object): Computed styles for the spinner container.
 * - `loadingTextStyle` (object): Computed styles for the loading text.
 *
 * @example
 * ```html
 * <app-loading-modal
 *   [isVisible]="true"
 *   [backgroundColor]="'rgba(0, 0, 0, 0.5)'"
 *   [displayColor]="'white'">
 * </app-loading-modal>
 * ```
 *
 * @styles
 * - `.spinner`: Styles for the loading spinner.
 * - `@keyframes spin`: Keyframes for the spinner rotation animation.
 * - `.modal-content`: Styles for the modal content container.
 * - `.loading-text`: Styles for the loading text.
 **/
export declare class LoadingModal {
    isVisible: boolean;
    backgroundColor?: string;
    displayColor?: string;
    overlayStyle?: Partial<CSSStyleDeclaration>;
    contentStyle?: Partial<CSSStyleDeclaration>;
    spinnerStyle?: Partial<CSSStyleDeclaration>;
    textStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<any>;
    get modalContainerStyle(): any;
    get modalContentStyle(): any;
    get spinnerContainerStyle(): any;
    get loadingTextStyle(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoadingModal, "app-loading-modal", never, { "isVisible": { "alias": "isVisible"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "displayColor": { "alias": "displayColor"; "required": false; }; "overlayStyle": { "alias": "overlayStyle"; "required": false; }; "contentStyle": { "alias": "contentStyle"; "required": false; }; "spinnerStyle": { "alias": "spinnerStyle"; "required": false; }; "textStyle": { "alias": "textStyle"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; }, {}, never, never, true, never>;
}
