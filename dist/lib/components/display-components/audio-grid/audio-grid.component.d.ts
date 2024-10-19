import { Injector, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export interface AudioGridOptions {
    componentsToRender: {
        component: any;
        inputs?: any;
    }[];
}
export type AudioGridType = (options: AudioGridOptions) => HTMLElement;
export declare class AudioGrid implements OnChanges {
    private injector;
    componentsToRender: {
        component: any;
        inputs?: any;
    }[];
    private injectorCache;
    constructor(injector: Injector);
    ngOnChanges(changes: SimpleChanges): void;
    createInjector(inputs: any): Injector;
    private clearInjectorCache;
    static ɵfac: i0.ɵɵFactoryDeclaration<AudioGrid, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AudioGrid, "app-audio-grid", never, { "componentsToRender": { "alias": "componentsToRender"; "required": false; }; }, {}, never, never, true, never>;
}
