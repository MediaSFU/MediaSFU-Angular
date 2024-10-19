import * as i0 from "@angular/core";
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
