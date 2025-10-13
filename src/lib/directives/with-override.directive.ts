import {
  Directive,
  Input,
  ViewContainerRef,
  ComponentRef,
  OnDestroy,
  Type,
  Injector,
  TemplateRef,
  EmbeddedViewRef,
  OnChanges,
  SimpleChanges,
  DoCheck,
} from '@angular/core';
import { UIOverrideResolverService } from '../services/ui-override-resolver.service';
import { MediasfuUICustomOverrides } from '../@types/ui-overrides.types';

/**
 * Directive: appWithOverride
 *
 * Apply UI overrides to components dynamically.
 * This directive checks for overrides and either:
 * 1. Renders the custom component if an override exists
 * 2. Renders the default component if no override exists
 *
 * Usage:
 * ```html
 * <ng-container
 *   *appWithOverride="'mainContainer';
 *   default: defaultMainContainer;
 *   props: componentProps">
 * </ng-container>
 * ```
 */
@Directive({
  selector: '[appWithOverride]',
  standalone: true
})
export class WithOverrideDirective implements OnChanges, OnDestroy, DoCheck {
  @Input('appWithOverride') appWithOverride!: keyof MediasfuUICustomOverrides;
  @Input('appWithOverrideDefault') default!: Type<any>;
  @Input('appWithOverrideProps') props?: Record<string, any> | (() => Record<string, any>);
  @Input('appWithOverrideInjector') customInjector?: Injector;

  // Keep the old names for backward compatibility in the code
  get appWithOverrideDefault() { return this.default; }
  get appWithOverrideProps() { return this.props; }
  get appWithOverrideInjector() { return this.customInjector; }

  private componentRef?: ComponentRef<any>;
  private embeddedDefaultView?: EmbeddedViewRef<any>;
  private renderedDefaultView?: EmbeddedViewRef<any>;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private uiOverrideResolver: UIOverrideResolverService,
    private injector: Injector
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['appWithOverride'] || changes['appWithOverrideProps']) {
      this.render();
    }
  }

  ngOnDestroy(): void {
    this.destroyRenderedViews();
  }

  ngDoCheck(): void {
    if (this.componentRef) {
      this.updateComponentInstanceProps();
    }
  }

  private destroyRenderedViews(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = undefined;
    }
    if (this.embeddedDefaultView) {
      this.embeddedDefaultView.destroy();
      this.embeddedDefaultView = undefined;
    }
    if (this.renderedDefaultView) {
      this.renderedDefaultView.destroy();
      this.renderedDefaultView = undefined;
    }
  }

  private render(): void {
    this.destroyRenderedViews();
    this.viewContainerRef.clear();

    const override = this.uiOverrideResolver.getComponentOverride(this.appWithOverride);

    // Helper to render the default template
    const renderDefaultTemplate = () => {
      this.renderedDefaultView = this.viewContainerRef.createEmbeddedView(this.templateRef);
    };

    // If there is a render override, allow it to provide a TemplateRef or component type
    if (override?.render) {
      const props = this.resolveProps();
      const rendered = override.render(props, () => this.templateRef);

      if (rendered instanceof TemplateRef) {
        this.renderedDefaultView = this.viewContainerRef.createEmbeddedView(rendered);
        return;
      }

      if (rendered) {
        const componentRef = this.viewContainerRef.createComponent(rendered as Type<any>, {
          injector: this.appWithOverrideInjector || this.injector,
        });
        if (props && componentRef.instance) {
          Object.assign(componentRef.instance, props);
        }
        this.componentRef = componentRef;
        this.componentRef.changeDetectorRef.detectChanges();
        return;
      }

      renderDefaultTemplate();
      return;
    }

    const componentType = override?.component
      ? override.component
      : this.uiOverrideResolver.resolveComponent(
          this.appWithOverride,
          this.appWithOverrideDefault
        );

    if (!override?.component) {
      // No component override - render the default template directly
      renderDefaultTemplate();
      return;
    }

    // When overriding with a custom component, project the default template
    this.embeddedDefaultView = this.templateRef.createEmbeddedView({});
    this.embeddedDefaultView.detectChanges();

    const projectableNodes = [this.embeddedDefaultView.rootNodes];
    const injectorToUse = this.appWithOverrideInjector || this.injector;

    const componentRef = this.viewContainerRef.createComponent(componentType, {
      injector: injectorToUse,
      projectableNodes,
    });

    const props = this.resolveProps();
    if (props && componentRef.instance) {
      Object.assign(componentRef.instance, props);
    }

    this.componentRef = componentRef;
    this.componentRef.changeDetectorRef.detectChanges();
  }

  private resolveProps(): Record<string, any> | undefined {
    if (!this.appWithOverrideProps) {
      return undefined;
    }

    if (typeof this.appWithOverrideProps === 'function') {
      try {
        return this.appWithOverrideProps();
      } catch (error) {
        console.warn('Error resolving override props for', this.appWithOverride, error);
        return undefined;
      }
    }

    return this.appWithOverrideProps;
  }

  private updateComponentInstanceProps(): void {
    if (!this.componentRef) {
      return;
    }

    const props = this.resolveProps();
    if (!props) {
      return;
    }

    let hasChanges = false;
    const instance = this.componentRef.instance as Record<string, any>;

    for (const key of Object.keys(props)) {
      const newValue = props[key];
      if (instance[key] !== newValue) {
        instance[key] = newValue;
        hasChanges = true;
      }
    }

    if (hasChanges) {
      this.componentRef.changeDetectorRef.markForCheck();
    }
  }
}

/**
 * Directive: appWithFunctionOverride
 *
 * Apply function overrides to method calls.
 * This directive wraps a function with override logic.
 *
 * Usage in TypeScript:
 * ```typescript
 * @ViewChild(WithFunctionOverrideDirective) functionOverride!: WithFunctionOverrideDirective;
 *
 * const wrappedFunction = this.functionOverride.applyOverride(
 *   'consumerResume',
 *   this.originalConsumerResume
 * );
 * ```
 */
@Directive({
  selector: '[appWithFunctionOverride]',
  standalone: false,
})
export class WithFunctionOverrideDirective {
  constructor(private uiOverrideResolver: UIOverrideResolverService) {}

  /**
   * Apply function override
   * @param key - The function key
   * @param originalFunction - The original function
   * @returns The wrapped or replaced function
   */
  applyOverride<T extends (...args: any[]) => any>(
    key: keyof MediasfuUICustomOverrides,
    originalFunction: T
  ): T {
    return this.uiOverrideResolver.applyFunctionOverride(key, originalFunction);
  }
}
