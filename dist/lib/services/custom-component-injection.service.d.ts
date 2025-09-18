/**
 * Custom Component Injection Service
 * Manages custom component injection and rendering for MediaSFU Angular components
 */
import { Injector, ComponentRef, ViewContainerRef, Type } from '@angular/core';
import { CustomComponent, CustomComponentType, CustomComponentFunction, CustomComponentParameters, CustomComponentContext } from '../@types/custom-component.types';
import * as i0 from "@angular/core";
export declare class CustomComponentInjectionService {
    private defaultConfig;
    constructor();
    /**
     * Creates an injector with custom parameters for component injection
     * @param parameters Custom parameters to inject
     * @param parentInjector Parent injector to inherit from
     * @returns New injector with custom parameters
     */
    createCustomInjector(parameters: CustomComponentParameters, parentInjector?: Injector): Injector;
    /**
     * Checks if a component is a custom Angular component
     */
    isCustomComponent<T>(comp: CustomComponentType<T>): comp is CustomComponent<T>;
    /**
     * Checks if a component is a function-based component
     */
    isFunctionComponent(comp: CustomComponentType): comp is CustomComponentFunction;
    /**
     * Checks if a component is an HTML element
     */
    isHTMLElement(comp: CustomComponentType): comp is HTMLElement;
    /**
     * Safely gets the outerHTML of an HTMLElement component
     * @param comp Component that could be HTMLElement or CustomComponent
     * @returns outerHTML string or empty string if not HTMLElement
     */
    getHtmlElementOuterHTML<T>(comp: CustomComponentType<T>): string;
    /**
     * Renders a custom component in the specified container
     * @param customComponent The custom component to render
     * @param container ViewContainerRef where the component should be rendered
     * @param context Component context with parameters and configuration
     * @returns ComponentRef or HTMLElement reference
     */
    renderCustomComponent<T>(customComponent: CustomComponentType<T>, container: ViewContainerRef, context: CustomComponentContext): ComponentRef<T> | HTMLElement | null;
    /**
     * Creates a component object with injector for dynamic component rendering
     * @param componentType Component type
     * @param parameters Parameters to inject
     * @param parentInjector Parent injector
     * @returns Component object with injector
     */
    createComponentWithInjector<T>(componentType: Type<T>, parameters?: CustomComponentParameters, parentInjector?: Injector): CustomComponent<T>;
    /**
     * Validates if a custom component can be rendered
     * @param customComponent Component to validate
     * @returns boolean indicating if component is valid
     */
    validateCustomComponent<T>(customComponent: CustomComponentType<T>): boolean;
    /**
     * Merges custom component options with defaults
     * @param customOptions Custom component options
     * @param defaultOptions Default component options
     * @returns Merged options
     */
    mergeComponentOptions<T>(customOptions: Partial<T>, defaultOptions: T): T;
    /**
     * Destroys a custom component and cleans up resources
     * @param componentRef Component reference to destroy
     */
    destroyCustomComponent<T>(componentRef: ComponentRef<T> | HTMLElement | null): void;
    /**
     * Helper method to resolve component from custom or default
     * This is useful for the pattern: customComponent || defaultComponent
     * @param customComponent Custom component (can be undefined)
     * @param defaultComponent Default fallback component
     * @returns The resolved component
     */
    resolveComponent<T>(customComponent: CustomComponentType<T> | undefined, defaultComponent: CustomComponentType<T>): CustomComponentType<T>;
    /**
     * Checks if we should use custom main component (for template restructuring)
     * @param customMainComponent Custom main component
     * @returns boolean indicating if custom main component should be used
     */
    shouldUseCustomMainComponent<T>(customMainComponent: CustomComponentType<T> | undefined): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<CustomComponentInjectionService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CustomComponentInjectionService>;
}
