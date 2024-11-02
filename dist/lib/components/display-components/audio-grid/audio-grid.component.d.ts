import { Injector, OnChanges, SimpleChanges } from '@angular/core';
import * as i0 from "@angular/core";
export interface AudioGridOptions {
    componentsToRender: {
        component: any;
        inputs?: any;
    }[];
}
export type AudioGridType = (options: AudioGridOptions) => HTMLElement;
/**
 * AudioGrid component renders a dynamic grid of components with individually provided inputs.
 *
 * @selector app-audio-grid
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `componentsToRender` ({ component: any; inputs?: any }[]): Array of components with optional inputs to render in the grid.
 *
 * @methods
 * - `ngOnChanges(changes: SimpleChanges)`: Clears the injector cache on changes to `componentsToRender`.
 * - `createInjector(inputs: any)`: Creates and caches an injector with specific inputs for each component.
 * - `clearInjectorCache()`: Clears the cache to avoid memory leaks and ensure updated injectors.
 *
 * @example
 * ```html
 * <app-audio-grid [componentsToRender]="[{ component: AudioCard, inputs: { name: 'Participant 1' } }]"></app-audio-grid>
 * ```
 **/
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
