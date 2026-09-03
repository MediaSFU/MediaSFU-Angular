import { CommonModule } from '@angular/common';
import { Component, Input, TemplateRef } from '@angular/core';

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
@Component({
  selector: 'app-modern-mediasfu-generic-head',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ng-container
      *ngIf="uiTemplate as template"
      [ngTemplateOutlet]="template"
    ></ng-container>
  `,
})
export class ModernMediasfuGenericHeadComponent {
  @Input({ required: true }) parameters!: ModernMediasfuGenericHeadParameters;

  get uiTemplate(): TemplateRef<unknown> | undefined {
    const current = this.parameters?.getCurrentParams?.() ?? this.parameters;
    return current?.renderModernMediasfuUITemplate;
  }
}
