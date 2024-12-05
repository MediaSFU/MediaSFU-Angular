import { Component, Input, Injector, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AudioGridOptions {
  componentsToRender: { component: any; inputs?: any }[];
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

@Component({
    selector: 'app-audio-grid',
    imports: [CommonModule],
    template: `
    <div style="z-index: 9">
      <ng-container *ngFor="let item of componentsToRender; let i = index">
        <div style="z-index: 9" [attr.key]="i">
          <ng-container
            *ngComponentOutlet="item.component; injector: createInjector(item.inputs)"
          ></ng-container>
        </div>
      </ng-container>
    </div>
  `,
    styleUrls: ['./audio-grid.component.css']
})


export class AudioGrid implements OnChanges {
  @Input() componentsToRender: { component: any; inputs?: any }[] = [];

  private injectorCache = new WeakMap<any, Injector>();

  constructor(private injector: Injector) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['componentsToRender']) {
      this.clearInjectorCache();
    }
  }

  createInjector(inputs: any) {
    if (!this.injectorCache.has(inputs)) {
      const injector = Injector.create({
        providers: Object.keys(inputs).map((key) => ({ provide: key, useValue: inputs[key] })),
        parent: this.injector,
      });
      this.injectorCache.set(inputs, injector);
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.injectorCache.get(inputs)!;
  }

  private clearInjectorCache() {
    this.injectorCache = new WeakMap<any, Injector>();
  }
}
