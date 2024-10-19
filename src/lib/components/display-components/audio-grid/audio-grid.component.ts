import { Component, Input, Injector, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AudioGridOptions {
  componentsToRender: { component: any; inputs?: any }[];
}

export type AudioGridType = (options: AudioGridOptions) => HTMLElement;

@Component({
  selector: 'app-audio-grid',
  standalone: true,
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
  styleUrls: ['./audio-grid.component.css'],
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
