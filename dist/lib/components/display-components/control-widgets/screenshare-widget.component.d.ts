import * as i0 from "@angular/core";
/**
 * ScreenShareWidget - Component representing a screen share button with an optional disabled state.
 *
 * This component displays a screen share icon (desktop icon) and an overlay ban icon if disabled.
 * The disabled state can be controlled either by an injected dependency or an @Input property.
 *
 * @component
 * @name ScreenShareWidget
 * @example
 * ```html
 * <app-screen-share-button [disabled]="isDisabled"></app-screen-share-button>
 * ```
 *
 * @param {boolean} disabled - Optional input to toggle the disabled state of the button.
 *
 * @property {boolean} computedDisabled - Internal state to determine if the button is disabled, controlled by either injected value or @Input property.
 * @property {faDesktop} faDesktop - FontAwesome desktop icon for screen sharing.
 * @property {faBan} faBan - FontAwesome ban icon indicating a disabled state.
 *
 * @example
 * <app-screen-share-button [disabled]="true"></app-screen-share-button>
 *
 * @constructor
 * @param {boolean} [injectedDisabled] - Optional injected disabled value.
 *
 * @method ngOnChanges - Updates the computedDisabled property based on changes to the @Input disabled.
 */
export declare class ScreenShareWidget {
    private injectedDisabled;
    disabled: boolean;
    faDesktop: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faBan: import("@fortawesome/fontawesome-common-types").IconDefinition;
    computedDisabled: boolean;
    constructor(injectedDisabled: boolean);
    ngOnChanges(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<ScreenShareWidget, [{ optional: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ScreenShareWidget, "app-screen-share-button", never, { "disabled": { "alias": "disabled"; "required": false; }; }, {}, never, never, true, never>;
}
