/**
 * Custom Component Injection Service
 * Manages custom component injection and rendering for MediaSFU Angular components
 */

import { Injectable, Injector, ComponentRef, ViewContainerRef, Type, ElementRef } from '@angular/core';
import {
  CustomComponent,
  CustomComponentType,
  CustomComponentFunction,
  CustomComponentParameters,
  CustomComponentContext,
  ComponentInjectionConfig
} from '../@types/custom-component.types';

@Injectable({
  providedIn: 'root'
})
export class CustomComponentInjectionService {

  private defaultConfig: ComponentInjectionConfig = {
    enabled: true,
    overrideDefaults: false,
    fallbackToDefault: true
  };

  constructor() {}

  /**
   * Creates an injector with custom parameters for component injection
   * @param parameters Custom parameters to inject
   * @param parentInjector Parent injector to inherit from
   * @returns New injector with custom parameters
   */
  createCustomInjector(
    parameters: CustomComponentParameters,
    parentInjector?: Injector
  ): Injector {
    const providers = Object.keys(parameters).map(key => ({
      provide: key,
      useValue: parameters[key]
    }));

    return Injector.create({
      providers,
      parent: parentInjector
    });
  }

  /**
   * Checks if a component is a custom Angular component
   */
  isCustomComponent<T>(comp: CustomComponentType<T>): comp is CustomComponent<T> {
    return comp && typeof comp === 'object' && 'component' in comp && typeof comp.component === 'function';
  }

  /**
   * Checks if a component is a function-based component
   */
  isFunctionComponent(comp: CustomComponentType): comp is CustomComponentFunction {
    return typeof comp === 'function';
  }

  /**
   * Checks if a component is an HTML element
   */
  isHTMLElement(comp: CustomComponentType): comp is HTMLElement {
    return comp instanceof HTMLElement;
  }

  /**
   * Safely gets the outerHTML of an HTMLElement component
   * @param comp Component that could be HTMLElement or CustomComponent
   * @returns outerHTML string or empty string if not HTMLElement
   */
  getHtmlElementOuterHTML<T>(comp: CustomComponentType<T>): string {
    if (!comp || this.isCustomComponent(comp) || this.isFunctionComponent(comp)) {
      return '';
    }
    return this.isHTMLElement(comp) ? comp.outerHTML || '' : '';
  }

  /**
   * Renders a custom component in the specified container
   * @param customComponent The custom component to render
   * @param container ViewContainerRef where the component should be rendered
   * @param context Component context with parameters and configuration
   * @returns ComponentRef or HTMLElement reference
   */
  renderCustomComponent<T>(
    customComponent: CustomComponentType<T>,
    container: ViewContainerRef,
    context: CustomComponentContext
  ): ComponentRef<T> | HTMLElement | null {
    if (!customComponent || !container) {
      return null;
    }

    const config = { ...this.defaultConfig, ...context.config };

    try {
      // Handle Angular Component
      if (this.isCustomComponent(customComponent)) {
        const injector = customComponent.injector ||
          this.createCustomInjector(context.parameters, context.injector);

        const componentRef = container.createComponent(
          customComponent.component,
          { injector }
        );

        return componentRef;
      }

      // Handle Function Component
      if (this.isFunctionComponent(customComponent)) {
        const element = customComponent();
        if (element) {
          const elementRef = container.element.nativeElement;
          elementRef.appendChild(element);
          return element;
        }
      }

      // Handle HTML Element
      if (this.isHTMLElement(customComponent)) {
        const elementRef = container.element.nativeElement;
        elementRef.appendChild(customComponent);
        return customComponent;
      }

    } catch (error) {
      console.error('Error rendering custom component:', error);

      if (config.fallbackToDefault) {
        console.warn('Falling back to default component rendering');
        return null; // Let the calling component handle fallback
      }

      throw error;
    }

    return null;
  }

  /**
   * Creates a component object with injector for dynamic component rendering
   * @param componentType Component type
   * @param parameters Parameters to inject
   * @param parentInjector Parent injector
   * @returns Component object with injector
   */
  createComponentWithInjector<T>(
    componentType: Type<T>,
    parameters: CustomComponentParameters = {},
    parentInjector?: Injector
  ): CustomComponent<T> {
    const injector = this.createCustomInjector(parameters, parentInjector);

    return {
      component: componentType,
      injector
    };
  }

  /**
   * Validates if a custom component can be rendered
   * @param customComponent Component to validate
   * @returns boolean indicating if component is valid
   */
  validateCustomComponent<T>(customComponent: CustomComponentType<T>): boolean {
    if (!customComponent) {
      return false;
    }

    if (this.isCustomComponent(customComponent)) {
      return !!customComponent.component;
    }

    if (this.isFunctionComponent(customComponent)) {
      return true;
    }

    if (this.isHTMLElement(customComponent)) {
      return true;
    }

    return false;
  }

  /**
   * Merges custom component options with defaults
   * @param customOptions Custom component options
   * @param defaultOptions Default component options
   * @returns Merged options
   */
  mergeComponentOptions<T>(
    customOptions: Partial<T>,
    defaultOptions: T
  ): T {
    return { ...defaultOptions, ...customOptions };
  }

  /**
   * Destroys a custom component and cleans up resources
   * @param componentRef Component reference to destroy
   */
  destroyCustomComponent<T>(componentRef: ComponentRef<T> | HTMLElement | null): void {
    if (!componentRef) {
      return;
    }

    try {
      if ('destroy' in componentRef && typeof componentRef.destroy === 'function') {
        // Angular ComponentRef
        componentRef.destroy();
      } else if (componentRef instanceof HTMLElement && componentRef.parentNode) {
        // HTML Element
        componentRef.parentNode.removeChild(componentRef);
      }
    } catch (error) {
      console.error('Error destroying custom component:', error);
    }
  }

  /**
   * Helper method to resolve component from custom or default
   * This is useful for the pattern: customComponent || defaultComponent
   * @param customComponent Custom component (can be undefined)
   * @param defaultComponent Default fallback component
   * @returns The resolved component
   */
  resolveComponent<T>(
    customComponent: CustomComponentType<T> | undefined,
    defaultComponent: CustomComponentType<T>
  ): CustomComponentType<T> {
    return customComponent || defaultComponent;
  }

  /**
   * Checks if we should use custom main component (for template restructuring)
   * @param customMainComponent Custom main component
   * @returns boolean indicating if custom main component should be used
   */
  shouldUseCustomMainComponent<T>(customMainComponent: CustomComponentType<T> | undefined): boolean {
    return !!customMainComponent;
  }
}
