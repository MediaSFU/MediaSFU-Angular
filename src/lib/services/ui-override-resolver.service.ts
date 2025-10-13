import { Injectable, Type, Inject, Optional, ComponentRef, ViewContainerRef, Injector } from '@angular/core';
import {
  MediasfuUICustomOverrides,
  CustomComponentOverride,
  CustomFunctionOverride,
  MEDIASFU_UI_OVERRIDES,
} from '../@types/ui-overrides.types';

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
@Injectable({
  providedIn: 'root',
})
export class UIOverrideResolverService {
  private overrides: MediasfuUICustomOverrides = {};

  constructor(
    @Optional() @Inject(MEDIASFU_UI_OVERRIDES) injectedOverrides?: MediasfuUICustomOverrides
  ) {
    if (injectedOverrides) {
      this.overrides = injectedOverrides;
    }
  }

  /**
   * Set UI overrides programmatically
   * @param overrides - The overrides configuration
   */
  setOverrides(overrides: MediasfuUICustomOverrides): void {
    this.overrides = { ...this.overrides, ...overrides };
  }

  /**
   * Get all current overrides
   * @returns Current override configuration
   */
  getOverrides(): MediasfuUICustomOverrides {
    return this.overrides;
  }

  /**
   * Check if a specific component has an override
   * @param key - The component key to check
   * @returns True if an override exists
   */
  hasOverride(key: keyof MediasfuUICustomOverrides): boolean {
    return !!this.overrides[key];
  }

  /**
   * Get the override configuration for a specific component
   * @param key - The component key
   * @returns The override configuration or undefined
   */
  getComponentOverride<T = any>(key: keyof MediasfuUICustomOverrides): CustomComponentOverride<T> | undefined {
    const override = this.overrides[key];
    if (override && 'component' in override) {
      return override as CustomComponentOverride<T>;
    }
    return undefined;
  }

  /**
   * Get the function override for a specific function
   * @param key - The function key
   * @returns The function override or undefined
   */
  getFunctionOverride<T extends (...args: any[]) => any>(
    key: keyof MediasfuUICustomOverrides
  ): CustomFunctionOverride<T> | undefined {
    const override = this.overrides[key];
    if (override && ('implementation' in override || 'wrap' in override)) {
      return override as unknown as CustomFunctionOverride<T>;
    }
    return undefined;
  }

  /**
   * Resolve the component to use (default or override)
   * @param key - The component key
   * @param defaultComponent - The default component type
   * @returns The component to render
   */
  resolveComponent<T>(
    key: keyof MediasfuUICustomOverrides,
    defaultComponent: Type<T>
  ): Type<T> {
    const override = this.getComponentOverride<T>(key);
    if (override?.component) {
      return override.component;
    }
    return defaultComponent;
  }

  /**
   * Apply function override (wrap or replace)
   * @param key - The function key
   * @param originalFunction - The original function implementation
   * @returns The wrapped or replaced function
   */
  applyFunctionOverride<T extends (...args: any[]) => any>(
    key: keyof MediasfuUICustomOverrides,
    originalFunction: T
  ): T {
    const override = this.getFunctionOverride<T>(key);

    if (!override) {
      return originalFunction;
    }

    // If there's a complete replacement, use it
    if (override.implementation) {
      return override.implementation;
    }

    // If there's a wrapper, apply it
    if (override.wrap) {
      return override.wrap(originalFunction);
    }

    return originalFunction;
  }

  /**
   * Create a component instance with potential override
   * @param viewContainerRef - The view container to create the component in
   * @param key - The component key
   * @param defaultComponent - The default component type
   * @param injector - Optional custom injector
   * @returns The created component reference
   */
  createComponent<T>(
    viewContainerRef: ViewContainerRef,
    key: keyof MediasfuUICustomOverrides,
    defaultComponent: Type<T>,
    injector?: Injector
  ): ComponentRef<T> {
    const component = this.resolveComponent(key, defaultComponent);
    return viewContainerRef.createComponent(component, { injector });
  }

  /**
   * Clear all overrides
   */
  clearOverrides(): void {
    this.overrides = {};
  }

  /**
   * Clear a specific override
   * @param key - The override key to clear
   */
  clearOverride(key: keyof MediasfuUICustomOverrides): void {
    delete this.overrides[key];
  }

  /**
   * Check if render override exists for a component
   * @param key - The component key
   * @returns True if a render override exists
   */
  hasRenderOverride(key: keyof MediasfuUICustomOverrides): boolean {
    const override = this.getComponentOverride(key);
    return !!override?.render;
  }

  /**
   * Get the render override function for a component
   * @param key - The component key
   * @returns The render function or undefined
   */
  getRenderOverride(key: keyof MediasfuUICustomOverrides): ((props: any, defaultRender?: () => any) => any) | undefined {
    const override = this.getComponentOverride(key);
    return override?.render;
  }
}
