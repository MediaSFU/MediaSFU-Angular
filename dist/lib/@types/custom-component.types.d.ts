/**
 * Custom component injection types for MediaSFU Angular
 * This file defines interfaces and types for custom component injection patterns
 * similar to React's component injection but adapted for Angular's architecture
 */
import { Type, Injector, TemplateRef } from '@angular/core';
/**
 * Custom component structure for Angular component injection
 * Can be either a traditional component with injector or a function that returns an element
 */
export interface CustomComponent<T = any> {
    component: Type<T>;
    injector?: Injector;
}
/**
 * Function-based custom component
 */
export type CustomComponentFunction = () => HTMLElement;
/**
 * Union type for all supported custom component types
 */
export type CustomComponentType<T = any> = CustomComponent<T> | CustomComponentFunction | HTMLElement;
/**
 * Options for PrejoinPage custom component injection
 */
export interface PrejoinPageCustomOptions {
    /** Custom welcome/prejoin page component */
    customWelcomeComponent?: CustomComponentType;
    /** Custom form component for room creation/joining */
    customFormComponent?: CustomComponentType;
    /** Custom branding/logo component */
    customBrandingComponent?: CustomComponentType;
}
/**
 * Options for VideoCard custom component injection
 */
export interface VideoCardCustomOptions {
    /** Custom info overlay component */
    customInfoComponent?: CustomComponentType;
    /** Custom controls overlay component */
    customControlsComponent?: CustomComponentType;
    /** Custom entire video card wrapper */
    customVideoCardComponent?: CustomComponentType;
}
/**
 * Options for AudioCard custom component injection
 */
export interface AudioCardCustomOptions {
    /** Custom info overlay component */
    customInfoComponent?: CustomComponentType;
    /** Custom controls overlay component */
    customControlsComponent?: CustomComponentType;
    /** Custom entire audio card wrapper */
    customAudioCardComponent?: CustomComponentType;
}
/**
 * Options for MiniCard custom component injection
 */
export interface MiniCardCustomOptions {
    /** Custom mini card component */
    customMiniCardComponent?: CustomComponentType;
    /** Custom overlay component */
    customOverlayComponent?: CustomComponentType;
}
/**
 * Options for main UI component customization
 */
export interface MainUICustomOptions {
    /** Custom main container component */
    customMainContainerComponent?: CustomComponentType;
    /** Custom main screen component */
    customMainScreenComponent?: CustomComponentType;
    /** Custom main aspect component */
    customMainAspectComponent?: CustomComponentType;
    /** Custom main grid component */
    customMainGridComponent?: CustomComponentType;
    /** Custom control buttons component */
    customControlButtonsComponent?: CustomComponentType;
}
/**
 * Comprehensive custom component options for MediaSFU
 */
export interface MediaSFUCustomComponents {
    prejoinPage?: PrejoinPageCustomOptions;
    videoCard?: VideoCardCustomOptions;
    audioCard?: AudioCardCustomOptions;
    miniCard?: MiniCardCustomOptions;
    mainUI?: MainUICustomOptions;
}
/**
 * Component injection configuration
 */
export interface ComponentInjectionConfig {
    /** Enable/disable custom component injection */
    enabled: boolean;
    /** Override default components with custom ones */
    overrideDefaults: boolean;
    /** Fallback to default if custom component fails */
    fallbackToDefault: boolean;
}
/**
 * Parameters passed to custom components
 */
export interface CustomComponentParameters {
    /** Component-specific parameters */
    [key: string]: any;
}
/**
 * Custom component context for dependency injection
 */
export interface CustomComponentContext {
    /** Component parameters */
    parameters: CustomComponentParameters;
    /** Injector instance for dependency injection */
    injector?: Injector;
    /** Component configuration */
    config?: ComponentInjectionConfig;
}
/**
 * Angular equivalent of React CustomComponentType for full UI replacement
 * Component that receives all MediaSFU parameters and replaces the entire interface
 */
export type CustomFullUIComponentType = Type<any> | TemplateRef<any>;
/**
 * Parameters passed to custom full UI components
 */
export interface CustomFullUIParameters {
    /** All MediaSFU parameters and functions */
    [key: string]: any;
}
