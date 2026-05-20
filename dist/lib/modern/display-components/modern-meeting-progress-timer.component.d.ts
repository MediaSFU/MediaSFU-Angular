import * as i0 from "@angular/core";
export interface ModernMeetingProgressTimerOptions {
    meetingProgressTime: string;
    initialBackgroundColor?: string;
    position?: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    textStyle?: {
        [key: string]: string | number;
    };
    showTimer?: boolean;
}
export type ModernMeetingProgressTimerType = (options: ModernMeetingProgressTimerOptions) => HTMLElement;
export declare class ModernMeetingProgressTimerComponent {
    meetingProgressTime: string;
    initialBackgroundColor: string;
    position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
    textStyle: {
        [key: string]: string | number;
    };
    showTimer: boolean;
    readonly faClock: import("@fortawesome/fontawesome-common-types").IconDefinition;
    get positionStyle(): {
        [key: string]: string;
    };
    get badgeStyle(): {
        [key: string]: string;
    };
    get iconToneClass(): string;
    get badgeTitle(): string;
    get ariaLabel(): string;
    isRecordingState(): boolean;
    private get resolvedTone();
    private getAccentColor;
    private getResolvedBackground;
    private isCustomBackground;
    private parseTimeInSeconds;
    private normalizeColor;
    private withAlpha;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModernMeetingProgressTimerComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModernMeetingProgressTimerComponent, "app-modern-meeting-progress-timer", never, { "meetingProgressTime": { "alias": "meetingProgressTime"; "required": false; }; "initialBackgroundColor": { "alias": "initialBackgroundColor"; "required": false; }; "position": { "alias": "position"; "required": false; }; "textStyle": { "alias": "textStyle"; "required": false; }; "showTimer": { "alias": "showTimer"; "required": false; }; }, {}, never, never, true, never>;
}
