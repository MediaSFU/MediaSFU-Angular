import { TemplateRef } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as i0 from "@angular/core";
export interface MeetingIdRenderContext {
    isCopied: boolean;
    meetingID: string;
}
export interface MeetingIdComponentOptions {
    meetingID?: string;
    labelText?: string;
    containerAttributes?: {
        [key: string]: any;
    };
    labelAttributes?: {
        [key: string]: any;
    };
    inputContainerAttributes?: {
        [key: string]: any;
    };
    inputAttributes?: {
        [key: string]: any;
    };
    buttonAttributes?: {
        [key: string]: any;
    };
    iconAttributes?: {
        [key: string]: any;
    };
    copyIconColors?: {
        default?: string;
        copied?: string;
    };
    customIcon?: IconDefinition;
    renderContainer?: TemplateRef<MeetingIdRenderContext>;
    renderLabel?: TemplateRef<MeetingIdRenderContext>;
    renderInput?: TemplateRef<MeetingIdRenderContext>;
    renderCopyButton?: TemplateRef<MeetingIdRenderContext>;
    renderIcon?: TemplateRef<MeetingIdRenderContext>;
    renderInputGroup?: TemplateRef<MeetingIdRenderContext>;
    renderContent?: TemplateRef<MeetingIdRenderContext>;
}
export type MeetingIdComponentType = (options: MeetingIdComponentOptions) => HTMLElement;
/**
 * Component representing a meeting ID.
 *
 * @selector app-meeting-id-component
 * @standalone true
 * @templateUrl ./meeting-id-component.component.html
 * @styleUrls ./meeting-id-component.component.css
 *
 * @example
 * ```html
 * <app-meeting-id-component [meetingID]="'123-456-789'"></app-meeting-id-component>
 * ```
 */
export declare class MeetingIdComponent {
    meetingID: string;
    labelText?: string;
    containerAttributes?: {
        [key: string]: any;
    };
    labelAttributes?: {
        [key: string]: any;
    };
    inputContainerAttributes?: {
        [key: string]: any;
    };
    inputAttributes?: {
        [key: string]: any;
    };
    buttonAttributes?: {
        [key: string]: any;
    };
    iconAttributes?: {
        [key: string]: any;
    };
    copyIconColors?: {
        default?: string;
        copied?: string;
    };
    customIcon?: IconDefinition;
    renderContainer?: TemplateRef<MeetingIdRenderContext>;
    renderLabel?: TemplateRef<MeetingIdRenderContext>;
    renderInput?: TemplateRef<MeetingIdRenderContext>;
    renderCopyButton?: TemplateRef<MeetingIdRenderContext>;
    renderIcon?: TemplateRef<MeetingIdRenderContext>;
    renderInputGroup?: TemplateRef<MeetingIdRenderContext>;
    renderContent?: TemplateRef<MeetingIdRenderContext>;
    isCopied: boolean;
    readonly copyIcon: IconDefinition;
    get renderContext(): MeetingIdRenderContext;
    handleCopy(): Promise<void>;
    getIconColor(): string;
    getLabelText(): string;
    getInputValue(): string;
    getInputReadOnly(): boolean;
    getIconStyle(): any;
    static ɵfac: i0.ɵɵFactoryDeclaration<MeetingIdComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MeetingIdComponent, "app-meeting-id-component", never, { "meetingID": { "alias": "meetingID"; "required": false; }; "labelText": { "alias": "labelText"; "required": false; }; "containerAttributes": { "alias": "containerAttributes"; "required": false; }; "labelAttributes": { "alias": "labelAttributes"; "required": false; }; "inputContainerAttributes": { "alias": "inputContainerAttributes"; "required": false; }; "inputAttributes": { "alias": "inputAttributes"; "required": false; }; "buttonAttributes": { "alias": "buttonAttributes"; "required": false; }; "iconAttributes": { "alias": "iconAttributes"; "required": false; }; "copyIconColors": { "alias": "copyIconColors"; "required": false; }; "customIcon": { "alias": "customIcon"; "required": false; }; "renderContainer": { "alias": "renderContainer"; "required": false; }; "renderLabel": { "alias": "renderLabel"; "required": false; }; "renderInput": { "alias": "renderInput"; "required": false; }; "renderCopyButton": { "alias": "renderCopyButton"; "required": false; }; "renderIcon": { "alias": "renderIcon"; "required": false; }; "renderInputGroup": { "alias": "renderInputGroup"; "required": false; }; "renderContent": { "alias": "renderContent"; "required": false; }; }, {}, never, never, true, never>;
}
