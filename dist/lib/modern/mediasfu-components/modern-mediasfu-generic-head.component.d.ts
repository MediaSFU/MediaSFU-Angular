import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export type ModernMediasfuGenericHeadParameters = Record<string, any> & {
    getCurrentParams?: () => ModernMediasfuGenericHeadParameters;
    renderModernMediasfuUITemplate?: TemplateRef<unknown>;
};
/**
 * Instantiates the exact UI template declared by one existing MediasfuGeneric
 * room engine. It owns no socket, media transport, state store, or modal state.
 *
 * Bind the engine with `[returnUI]="false"` and
 * `[renderUIExternally]="true"`, publish its parameter bag, and pass the latest
 * bag here. Rendering performs a pure `getCurrentParams()` read only.
 */
export declare class ModernMediasfuGenericHeadComponent {
    parameters: ModernMediasfuGenericHeadParameters;
    get uiTemplate(): TemplateRef<unknown> | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModernMediasfuGenericHeadComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModernMediasfuGenericHeadComponent, "app-modern-mediasfu-generic-head", never, { "parameters": { "alias": "parameters"; "required": true; }; }, {}, never, never, true, never>;
}
