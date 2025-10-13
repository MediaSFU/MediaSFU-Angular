import { TemplateRef } from '@angular/core';
import * as i0 from "@angular/core";
export interface MeetingPasscodeRenderContext {
    meetingPasscode: string;
}
export interface MeetingPasscodeComponentOptions {
    meetingPasscode: string;
    labelText?: string;
    containerAttributes?: {
        [key: string]: any;
    };
    labelAttributes?: {
        [key: string]: any;
    };
    inputAttributes?: {
        [key: string]: any;
    };
    renderContainer?: TemplateRef<MeetingPasscodeRenderContext>;
    renderLabel?: TemplateRef<MeetingPasscodeRenderContext>;
    renderInput?: TemplateRef<MeetingPasscodeRenderContext>;
    renderContent?: TemplateRef<MeetingPasscodeRenderContext>;
}
export type MeetingPasscodeComponentType = (options: MeetingPasscodeComponentOptions) => HTMLElement;
/**
 * Component for displaying and managing a meeting passcode.
 *
 * @selector app-meeting-passcode-component
 * @standalone true
 * @templateUrl ./meeting-passcode-component.component.html
 * @styleUrls ./meeting-passcode-component.component.css
 *
 * @example
 * ```html
 * <app-meeting-passcode-component [meetingPasscode]="'ABC123'"></app-meeting-passcode-component>
 * ```
 */
export declare class MeetingPasscodeComponent {
    meetingPasscode: string;
    labelText?: string;
    containerAttributes?: {
        [key: string]: any;
    };
    labelAttributes?: {
        [key: string]: any;
    };
    inputAttributes?: {
        [key: string]: any;
    };
    renderContainer?: TemplateRef<MeetingPasscodeRenderContext>;
    renderLabel?: TemplateRef<MeetingPasscodeRenderContext>;
    renderInput?: TemplateRef<MeetingPasscodeRenderContext>;
    renderContent?: TemplateRef<MeetingPasscodeRenderContext>;
    get renderContext(): MeetingPasscodeRenderContext;
    getLabelText(): string;
    getInputValue(): string;
    getInputReadOnly(): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<MeetingPasscodeComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<MeetingPasscodeComponent, "app-meeting-passcode-component", never, { "meetingPasscode": { "alias": "meetingPasscode"; "required": false; }; "labelText": { "alias": "labelText"; "required": false; }; "containerAttributes": { "alias": "containerAttributes"; "required": false; }; "labelAttributes": { "alias": "labelAttributes"; "required": false; }; "inputAttributes": { "alias": "inputAttributes"; "required": false; }; "renderContainer": { "alias": "renderContainer"; "required": false; }; "renderLabel": { "alias": "renderLabel"; "required": false; }; "renderInput": { "alias": "renderInput"; "required": false; }; "renderContent": { "alias": "renderContent"; "required": false; }; }, {}, never, never, true, never>;
}
