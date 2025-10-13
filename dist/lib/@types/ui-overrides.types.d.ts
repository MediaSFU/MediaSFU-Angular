/**
 * MediaSFU UI Overrides - Angular Implementation
 *
 * This file provides TypeScript interfaces for the UI override system,
 * mirroring the React SDK's customization capabilities.
 *
 * The override system allows three customization strategies:
 * 1. Component overrides - Replace entire components with custom Angular components
 * 2. Render overrides - Wrap or enhance existing component rendering
 * 3. Function overrides - Replace or wrap helper functions with custom logic
 */
import { Type, InjectionToken, TemplateRef } from '@angular/core';
/**
 * Base interface for component overrides
 * Allows replacing a component or wrapping its render output
 */
export interface CustomComponentOverride<TComponent = any, TProps = any> {
    /**
     * Replace the component entirely with a custom Angular component
     */
    component?: Type<TComponent>;
    /**
     * Wrap or enhance the default render output
     * @param props - Props passed to the component
     * @param defaultRender - Function that returns the default component
     */
    render?: (props: TProps, defaultRender?: () => any) => TemplateRef<any> | Type<any>;
}
/**
 * Base interface for function overrides
 * Allows replacing a function or wrapping its execution
 */
export interface CustomFunctionOverride<TFunction extends (...args: any[]) => any> {
    /**
     * Completely replace the function implementation
     */
    implementation?: TFunction;
    /**
     * Wrap the original function to add pre/post logic
     * @param original - The original function implementation
     * @returns Wrapped function with custom logic
     */
    wrap?: (original: TFunction) => TFunction;
}
/**
 * Main UI Overrides interface
 * Contains all customizable components and functions in MediaSFU
 */
export interface MediasfuUICustomOverrides {
    /**
     * Main container component - Root wrapper for the entire UI
     */
    mainContainer?: CustomComponentOverride;
    /**
     * Main aspect component - Controls aspect ratio and layout
     */
    mainAspect?: CustomComponentOverride;
    /**
     * Main screen component - Primary video/content display area
     */
    mainScreen?: CustomComponentOverride;
    /**
     * Main grid component - Grid layout for participants
     */
    mainGrid?: CustomComponentOverride;
    /**
     * Sub aspect component - Secondary layout container
     */
    subAspect?: CustomComponentOverride;
    /**
     * Other grid component - Additional participant grid
     */
    otherGrid?: CustomComponentOverride;
    /**
     * Flexible grid component - Dynamic participant grid
     */
    flexibleGrid?: CustomComponentOverride;
    /**
     * Alternative flexible grid component
     */
    flexibleGridAlt?: CustomComponentOverride;
    /**
     * Flexible video component - Individual video display
     */
    flexibleVideo?: CustomComponentOverride;
    /**
     * Audio grid component - Grid for audio-only participants
     */
    audioGrid?: CustomComponentOverride;
    /**
     * Pagination component - Page navigation controls
     */
    pagination?: CustomComponentOverride;
    /**
     * Primary control buttons component
     */
    controlButtons?: CustomComponentOverride;
    /**
     * Alternative control buttons component
     */
    controlButtonsAlt?: CustomComponentOverride;
    /**
     * Touch-optimized control buttons component
     */
    controlButtonsTouch?: CustomComponentOverride;
    /**
     * Video card component - Individual video participant display
     */
    videoCard?: CustomComponentOverride;
    /**
     * Audio card component - Individual audio-only participant display
     */
    audioCard?: CustomComponentOverride;
    /**
     * Mini card component - Minimized participant display
     */
    miniCard?: CustomComponentOverride;
    /**
     * Mini audio component - Minimized audio indicator
     */
    miniAudio?: CustomComponentOverride;
    /**
     * Meeting progress timer widget
     */
    meetingProgressTimer?: CustomComponentOverride;
    /**
     * Mini audio player widget
     */
    miniAudioPlayer?: CustomComponentOverride;
    /**
     * Loading modal - Displayed during connection/loading
     */
    loadingModal?: CustomComponentOverride;
    /**
     * Alert component - System notifications and alerts
     */
    alert?: CustomComponentOverride;
    /**
     * Menu modal - Quick actions menu
     */
    menuModal?: CustomComponentOverride;
    /**
     * Event settings modal - Host controls and settings
     */
    eventSettingsModal?: CustomComponentOverride;
    /**
     * Requests modal - Media access requests
     */
    requestsModal?: CustomComponentOverride;
    /**
     * Waiting room modal - Participant admission queue
     */
    waitingRoomModal?: CustomComponentOverride;
    /**
     * Co-host modal - Co-host management
     */
    coHostModal?: CustomComponentOverride;
    /**
     * Media settings modal - Camera/microphone settings
     */
    mediaSettingsModal?: CustomComponentOverride;
    /**
     * Participants modal - Participant list and management
     */
    participantsModal?: CustomComponentOverride;
    /**
     * Messages modal - Chat interface
     */
    messagesModal?: CustomComponentOverride;
    /**
     * Display settings modal - Layout and display preferences
     */
    displaySettingsModal?: CustomComponentOverride;
    /**
     * Confirm exit modal - Exit confirmation dialog
     */
    confirmExitModal?: CustomComponentOverride;
    /**
     * Confirm here modal - Attendance confirmation
     */
    confirmHereModal?: CustomComponentOverride;
    /**
     * Share event modal - Event sharing interface
     */
    shareEventModal?: CustomComponentOverride;
    /**
     * Recording modal - Recording controls
     */
    recordingModal?: CustomComponentOverride;
    /**
     * Poll modal - Polling interface
     */
    pollModal?: CustomComponentOverride;
    /**
     * Background modal - Virtual background settings
     */
    backgroundModal?: CustomComponentOverride;
    /**
     * Breakout rooms modal - Breakout room management
     */
    breakoutRoomsModal?: CustomComponentOverride;
    /**
     * Configure whiteboard modal - Whiteboard settings
     */
    configureWhiteboardModal?: CustomComponentOverride;
    /**
     * Whiteboard component - Collaborative whiteboard
     */
    whiteboard?: CustomComponentOverride;
    /**
     * Screenboard component - Screen annotation layer
     */
    screenboard?: CustomComponentOverride;
    /**
     * Screenboard modal - Screen sharing annotation controls
     */
    screenboardModal?: CustomComponentOverride;
    /**
     * Welcome page - Pre-join welcome/marketing page
     */
    welcomePage?: CustomComponentOverride;
    /**
     * Pre-join page - Room entry wizard
     */
    preJoinPage?: CustomComponentOverride;
    /**
     * Custom menu buttons renderer - Custom button group renderer
     */
    customMenuButtonsRenderer?: CustomComponentOverride;
    /**
     * Consumer resume function - Handles resuming paused media consumers
     */
    consumerResume?: CustomFunctionOverride<(params: any) => Promise<void>>;
    /**
     * Add videos grid function - Handles adding videos to the grid layout
     */
    addVideosGrid?: CustomFunctionOverride<(params: any) => Promise<void>>;
    /**
     * Prepopulate user media function - Handles initial setup of user media streams
     */
    prepopulateUserMedia?: CustomFunctionOverride<(params: any) => Promise<any>>;
}
/**
 * Injection token for UI overrides
 * Use this token to provide overrides at the component or module level
 */
export declare const MEDIASFU_UI_OVERRIDES: InjectionToken<MediasfuUICustomOverrides>;
/**
 * Injection token for container styling
 * Allows injecting custom styles for the root container
 */
export declare const MEDIASFU_CONTAINER_STYLE: InjectionToken<Record<string, any>>;
/**
 * Props structure for custom video card components
 */
export interface CustomVideoCardProps {
    participant: any;
    showControls?: boolean;
    showInfo?: boolean;
    customStyle?: Record<string, any>;
    parameters?: any;
}
/**
 * Type definition for custom video card component
 */
export type CustomVideoCardType = Type<any>;
/**
 * Props structure for custom audio card components
 */
export interface CustomAudioCardProps {
    participant: any;
    showControls?: boolean;
    showInfo?: boolean;
    barColor?: string;
    customStyle?: Record<string, any>;
    parameters?: any;
}
/**
 * Type definition for custom audio card component
 */
export type CustomAudioCardType = Type<any>;
/**
 * Props structure for custom mini card components
 */
export interface CustomMiniCardProps {
    participant: any;
    showControls?: boolean;
    customStyle?: Record<string, any>;
    parameters?: any;
}
/**
 * Type definition for custom mini card component
 */
export type CustomMiniCardType = Type<any>;
/**
 * Type definition for custom component that replaces entire UI
 */
export type CustomFullComponentType = Type<any>;
/**
 * Helper type for component override props
 */
export type OverrideComponentProps<T = any> = T;
/**
 * Helper type for extracting component type from override
 */
export type ExtractComponentType<T> = T extends CustomComponentOverride<infer C> ? C : never;
/**
 * Helper type for extracting props type from override
 */
export type ExtractPropsType<T> = T extends CustomComponentOverride<any, infer P> ? P : never;
