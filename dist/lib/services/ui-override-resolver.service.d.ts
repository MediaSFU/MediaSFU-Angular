import { Type, ComponentRef, ViewContainerRef, Injector } from '@angular/core';
import { MediasfuUICustomOverrides, CustomComponentOverride, CustomFunctionOverride } from '../@types/ui-overrides.types';
import * as i0 from "@angular/core";
/**
 * UI Override Resolver Service
 *
 * This service manages the resolution and application of UI overrides throughout MediaSFU.
 * It provides methods to:
 * - Check if a component has an override
 * - Resolve the appropriate component to render
 * - Wrap functions with custom logic
 * - Apply function overrides
 */
export declare class UIOverrideResolverService {
    private overrides;
    constructor(injectedOverrides?: MediasfuUICustomOverrides);
    /**
     * Set UI overrides programmatically
     * @param overrides - The overrides configuration
     */
    setOverrides(overrides: MediasfuUICustomOverrides): void;
    /**
     * Get all current overrides
     * @returns Current override configuration
     */
    getOverrides(): MediasfuUICustomOverrides;
    /**
     * Check if a specific component has an override
     * @param key - The component key to check
     * @returns True if an override exists
     */
    hasOverride(key: keyof MediasfuUICustomOverrides): boolean;
    /**
     * Get the override configuration for a specific component
     * @param key - The component key
     * @returns The override configuration or undefined
     */
    getComponentOverride<T = any>(key: keyof MediasfuUICustomOverrides): CustomComponentOverride<T> | undefined;
    /**
     * Get the function override for a specific function
     * @param key - The function key
     * @returns The function override or undefined
     */
    getFunctionOverride<T extends (...args: any[]) => any>(key: keyof MediasfuUICustomOverrides): CustomFunctionOverride<T> | undefined;
    /**
     * Resolve the component to use (default or override)
     * @param key - The component key
     * @param defaultComponent - The default component type
     * @returns The component to render
     */
    resolveComponent<T>(key: keyof MediasfuUICustomOverrides, defaultComponent: Type<T>): Type<T>;
    /**
     * Apply function override (wrap or replace)
     * @param key - The function key
     * @param originalFunction - The original function implementation
     * @returns The wrapped or replaced function
     */
    applyFunctionOverride<T extends (...args: any[]) => any>(key: keyof MediasfuUICustomOverrides, originalFunction: T): T;
    /**
     * Create a component instance with potential override
     * @param viewContainerRef - The view container to create the component in
     * @param key - The component key
     * @param defaultComponent - The default component type
     * @param injector - Optional custom injector
     * @returns The created component reference
     */
    createComponent<T>(viewContainerRef: ViewContainerRef, key: keyof MediasfuUICustomOverrides, defaultComponent: Type<T>, injector?: Injector): ComponentRef<T>;
    /**
     * Clear all overrides
     */
    clearOverrides(): void;
    /**
     * Clear a specific override
     * @param key - The override key to clear
     */
    clearOverride(key: keyof MediasfuUICustomOverrides): void;
    /**
     * Check if render override exists for a component
     * @param key - The component key
     * @returns True if a render override exists
     */
    hasRenderOverride(key: keyof MediasfuUICustomOverrides): boolean;
    /**
     * Get the render override function for a component
     * @param key - The component key
     * @returns The render function or undefined
     */
    getRenderOverride(key: keyof MediasfuUICustomOverrides): ((props: any, defaultRender?: () => any) => any) | undefined;
    static ɵfac: i0.ɵɵFactoryDeclaration<UIOverrideResolverService, [{ optional: true; }]>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UIOverrideResolverService>;
}
