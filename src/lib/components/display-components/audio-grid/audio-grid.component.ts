import { Component, Input, Injector, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AudioGridOptions {
  componentsToRender: { component: any; inputs?: any }[];
  containerStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: TemplateRef<any>;
}

export type AudioGridType = (options: AudioGridOptions) => HTMLElement;


/**
 * @component AudioGrid
 * 
 * A dynamic grid component specifically designed for rendering audio-only participants with customizable
 * layout and styling. Supports full template customization for complete control over participant presentation.
 *
 * @description
 * AudioGrid provides three levels of customization to display audio-only participants:
 * 
 * 1. **Basic Usage**: Use the default vertical stacked layout for audio participants
 * 2. **Style Customization**: Apply custom styles via `containerStyle` to modify grid appearance
 * 3. **Full Template Override**: Provide a custom `ng-template` via `customTemplate` for complete control
 * 
 * **Key Features:**
 * - Dynamic rendering of audio-only participant components
 * - Efficient injector caching for performance optimization
 * - Automatic cache clearing on component changes to prevent memory leaks
 * - Customizable container styling
 * - Full template override support for custom layouts
 * 
 * @selector app-audio-grid
 * @standalone true
 * @imports CommonModule
 *
 * @example
 * Basic Usage:
 * ```html
 * <app-audio-grid 
 *   [componentsToRender]="[
 *     { component: AudioCard, inputs: { name: 'John Doe', audioLevel: 0.8 } },
 *     { component: AudioCard, inputs: { name: 'Jane Smith', audioLevel: 0.5 } }
 *   ]">
 * </app-audio-grid>
 * ```
 *
 * @example
 * Style Customization:
 * ```html
 * <app-audio-grid 
 *   [componentsToRender]="audioParticipants"
 *   [containerStyle]="{
 *     display: 'flex',
 *     flexWrap: 'wrap',
 *     gap: '12px',
 *     padding: '20px',
 *     backgroundColor: '#f5f5f5',
 *     borderRadius: '8px'
 *   }">
 * </app-audio-grid>
 * ```
 *
 * @example
 * Custom Template Override:
 * ```typescript
 * // In your component
 * @Component({
 *   template: `
 *     <app-audio-grid
 *       [componentsToRender]="audioParticipants"
 *       [customTemplate]="customAudioLayout">
 *     </app-audio-grid>
 *     
 *     <ng-template #customAudioLayout let-gridData>
 *       <div class="custom-audio-grid">
 *         <h3>Audio Participants ({{ gridData.componentsToRender.length }})</h3>
 *         <div class="audio-list">
 *           <div *ngFor="let item of gridData.componentsToRender; let i = index"
 *                class="audio-item"
 *                [class.active]="i === activeIndex">
 *             <span class="index">{{ i + 1 }}</span>
 *             <ng-container *ngComponentOutlet="item.component; injector: createInjector(item.inputs)"></ng-container>
 *           </div>
 *         </div>
 *       </div>
 *     </ng-template>
 *   `
 * })
 * ```
 *
 * @input componentsToRender - Array of components with optional inputs to render in the grid
 * @input containerStyle - Custom CSS styles for the grid container
 * @input customTemplate - Custom ng-template for complete grid layout override
 *
 * @method ngOnChanges - Clears the injector cache on changes to componentsToRender
 * @method createInjector - Creates and caches an injector with specific inputs for each component
 * @method clearInjectorCache - Clears the cache to avoid memory leaks and ensure updated injectors
 **/

@Component({
    selector: 'app-audio-grid',
    imports: [CommonModule],
    template: `
    <div *ngIf="customTemplate; else defaultTemplate" [ngStyle]="computedContainerStyle">
      <ng-container *ngTemplateOutlet="customTemplate; context: {
        $implicit: {
          componentsToRender
        }
      }"></ng-container>
    </div>
    <ng-template #defaultTemplate>
      <div [ngStyle]="computedContainerStyle">
        <ng-container *ngFor="let item of componentsToRender; let i = index">
          <div style="z-index: 9" [attr.key]="i">
            <ng-container
              *ngComponentOutlet="item.component; injector: createInjector(item.inputs)"
            ></ng-container>
          </div>
        </ng-container>
      </div>
    </ng-template>
  `,
    styleUrls: ['./audio-grid.component.css']
})


export class AudioGrid implements OnChanges {
  @Input() componentsToRender: { component: any; inputs?: any }[] = [];
  @Input() containerStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: TemplateRef<any>;

  private injectorCache = new WeakMap<any, Injector>();

  constructor(private injector: Injector) {}

  get computedContainerStyle() {
    const baseStyles = {
      'z-index': '9'
    };
    return {
      ...baseStyles,
      ...(this.containerStyle as any),
    };
  }

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
