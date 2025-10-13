import { ViewContainerRef, OnDestroy, Type, Injector, TemplateRef, OnChanges, SimpleChanges, DoCheck } from '@angular/core';
import { UIOverrideResolverService } from '../services/ui-override-resolver.service';
import { MediasfuUICustomOverrides } from '../@types/ui-overrides.types';
import * as i0 from "@angular/core";
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
export declare class WithOverrideDirective implements OnChanges, OnDestroy, DoCheck {
    private templateRef;
    private viewContainerRef;
    private uiOverrideResolver;
    private injector;
    appWithOverride: keyof MediasfuUICustomOverrides;
    default: Type<any>;
    props?: Record<string, any> | (() => Record<string, any>);
    customInjector?: Injector;
    get appWithOverrideDefault(): Type<any>;
    get appWithOverrideProps(): Record<string, any> | (() => Record<string, any>) | undefined;
    get appWithOverrideInjector(): Injector | undefined;
    private componentRef?;
    private embeddedDefaultView?;
    private renderedDefaultView?;
    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef, uiOverrideResolver: UIOverrideResolverService, injector: Injector);
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    ngDoCheck(): void;
    private destroyRenderedViews;
    private render;
    private resolveProps;
    private updateComponentInstanceProps;
    static ɵfac: i0.ɵɵFactoryDeclaration<WithOverrideDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WithOverrideDirective, "[appWithOverride]", never, { "appWithOverride": { "alias": "appWithOverride"; "required": false; }; "default": { "alias": "appWithOverrideDefault"; "required": false; }; "props": { "alias": "appWithOverrideProps"; "required": false; }; "customInjector": { "alias": "appWithOverrideInjector"; "required": false; }; }, {}, never, never, true, never>;
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
export declare class WithFunctionOverrideDirective {
    private uiOverrideResolver;
    constructor(uiOverrideResolver: UIOverrideResolverService);
    /**
     * Apply function override
     * @param key - The function key
     * @param originalFunction - The original function
     * @returns The wrapped or replaced function
     */
    applyOverride<T extends (...args: any[]) => any>(key: keyof MediasfuUICustomOverrides, originalFunction: T): T;
    static ɵfac: i0.ɵɵFactoryDeclaration<WithFunctionOverrideDirective, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<WithFunctionOverrideDirective, "[appWithFunctionOverride]", never, {}, {}, never, never, false, never>;
}
