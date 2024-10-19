import * as i0 from "@angular/core";
export interface LoadingModalOptions {
    isVisible: boolean;
    backgroundColor?: string;
    displayColor?: string;
}
export type LoadingModalType = (options: LoadingModalOptions) => HTMLElement;
/**
 * Component representing a loading modal.
 *
 * @selector app-loading-modal
 * @standalone true
 * @imports CommonModule
 *
 * @description
 * This component displays a loading modal with a spinner and a loading text.
 * It is designed to be displayed as an overlay with customizable background and text colors.
 *
 * @example
 * <app-loading-modal [isVisible]="true" [backgroundColor]="'rgba(0, 0, 0, 0.5)'" [displayColor]="'white'"></app-loading-modal>
 *
 * @styles
 * - .spinner: Styles for the loading spinner.
 * - @keyframes spin: Keyframes for the spinner animation.
 * - .modal-content: Styles for the modal content container.
 * - .loading-text: Styles for the loading text.
 *
 * @inputs
 * - `isVisible` (boolean): Determines if the modal is visible. Default is `false`.
 * - `backgroundColor` (string): Background color of the modal. Default is `'rgba(0, 0, 0, 0.5)'`.
 * - `displayColor` (string): Color of the loading text. Default is `'white'`.
 *
 * @properties
 * - `modalContainerStyle` (object): Computed styles for the modal container.
 * - `modalContentStyle` (object): Computed styles for the modal content.
 * - `spinnerContainerStyle` (object): Computed styles for the spinner container.
 * - `loadingTextStyle` (object): Computed styles for the loading text.
 */
export declare class LoadingModal {
    isVisible: boolean;
    backgroundColor?: string;
    displayColor?: string;
    get modalContainerStyle(): {
        position: string;
        top: string;
        left: string;
        width: string;
        height: string;
        backgroundColor: string | undefined;
        display: string;
        alignItems: string;
        justifyContent: string;
        zIndex: string;
    };
    get modalContentStyle(): {
        backgroundColor: string | undefined;
        borderRadius: string;
        padding: string;
        maxWidth: string;
        textAlign: string;
    };
    get spinnerContainerStyle(): {
        marginBottom: string;
    };
    get loadingTextStyle(): {
        color: string | undefined;
    };
    static ɵfac: i0.ɵɵFactoryDeclaration<LoadingModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<LoadingModal, "app-loading-modal", never, { "isVisible": { "alias": "isVisible"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "displayColor": { "alias": "displayColor"; "required": false; }; }, {}, never, never, true, never>;
}
