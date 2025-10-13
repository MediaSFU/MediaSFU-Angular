import { TemplateRef } from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { EventType } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface ShareButton {
    icon: IconDefinition;
    action: () => void | Promise<void>;
    show: boolean;
    color?: string;
    iconColor?: string;
    wrapperAttributes?: {
        [key: string]: any;
    };
    iconAttributes?: {
        [key: string]: any;
    };
}
export interface ShareButtonRenderContext {
    button: ShareButton;
    index: number;
    shareUrl: string;
}
export interface ShareButtonsRenderContext {
    buttons: ShareButton[];
    shareUrl: string;
}
export interface ShareButtonsComponentOptions {
    meetingID: string;
    shareButtons?: ShareButton[];
    eventType: EventType;
    localLink?: string;
    containerAttributes?: {
        [key: string]: any;
    };
    renderContainer?: TemplateRef<ShareButtonsRenderContext>;
    renderButtons?: TemplateRef<ShareButtonsRenderContext>;
    renderButton?: TemplateRef<ShareButtonRenderContext>;
    renderIcon?: TemplateRef<ShareButtonRenderContext>;
    getShareUrl?: (options: {
        meetingID: string;
        eventType: EventType;
        localLink?: string;
    }) => string;
}
export type ShareButtonsComponentType = (options: ShareButtonsComponentOptions) => HTMLElement;
/**
 * @component ShareButtonsComponent
 * @selector app-share-buttons-component
 * @description Displays a set of share buttons for sharing a meeting link on social media and email.
 *
 * @example
 * ```html
 * <app-share-buttons-component
 *   [meetingID]="'12345'"
 *   [eventType]="'broadcast'"
 *   [shareButtons]="customShareButtons"
 *   [localLink]="'https://www.google.com'"
 * ></app-share-buttons-component>
 * ```
 *
 * ```typescript
 * const customShareButtons = [
 *   { icon: faEnvelope, action: () => console.log('Email'), show: true },
 *   { icon: faFacebook, action: () => console.log('Facebook'), show: true },
 * ];
 * ```
 */
export declare class ShareButtonsComponent {
    meetingID: string;
    shareButtons: ShareButton[];
    eventType: EventType;
    localLink?: string;
    containerAttributes?: {
        [key: string]: any;
    };
    renderContainer?: TemplateRef<ShareButtonsRenderContext>;
    renderButtons?: TemplateRef<ShareButtonsRenderContext>;
    renderButton?: TemplateRef<ShareButtonRenderContext>;
    renderIcon?: TemplateRef<ShareButtonRenderContext>;
    getShareUrlFn?: (options: {
        meetingID: string;
        eventType: EventType;
        localLink?: string;
    }) => string;
    defaultShareButtons: ShareButton[];
    get shareName(): "chat" | "broadcast" | "meeting";
    getShareUrl(): string;
    get filteredShareButtons(): ShareButton[];
    get shareButtonsRenderContext(): ShareButtonsRenderContext;
    getButtonRenderContext(button: ShareButton, index: number): ShareButtonRenderContext;
    getButtonStyle(button: ShareButton, index: number): any;
    getIconStyle(button: ShareButton): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<ShareButtonsComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ShareButtonsComponent, "app-share-buttons-component", never, { "meetingID": { "alias": "meetingID"; "required": false; }; "shareButtons": { "alias": "shareButtons"; "required": false; }; "eventType": { "alias": "eventType"; "required": false; }; "localLink": { "alias": "localLink"; "required": false; }; "containerAttributes": { "alias": "containerAttributes"; "required": false; }; "renderContainer": { "alias": "renderContainer"; "required": false; }; "renderButtons": { "alias": "renderButtons"; "required": false; }; "renderButton": { "alias": "renderButton"; "required": false; }; "renderIcon": { "alias": "renderIcon"; "required": false; }; "getShareUrlFn": { "alias": "getShareUrlFn"; "required": false; }; }, {}, never, never, true, never>;
}
