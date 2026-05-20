import { OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { ModifyDisplaySettings, ModifyDisplaySettingsOptions, ModifyDisplaySettingsParameters } from '../../methods/display-settings-methods/modify-display-settings.service';
import { ModernRenderMode } from '../utils/render-mode.utils';
import * as i0 from "@angular/core";
export interface ModernDisplaySettingsModalParameters extends ModifyDisplaySettingsParameters {
    meetingDisplayType: string;
    autoWave: boolean;
    forceFullDisplay: boolean;
    meetingVideoOptimized: boolean;
    showSubtitlesOnCards?: boolean;
}
export declare class ModernDisplaySettingsModalComponent implements OnInit, OnChanges {
    private readonly modifyDisplaySettingsService;
    isDisplaySettingsModalVisible: boolean;
    onDisplaySettingsClose: () => void;
    onModifyDisplaySettings?: (options: ModifyDisplaySettingsOptions) => Promise<void> | void;
    parameters: ModernDisplaySettingsModalParameters;
    position: string;
    backgroundColor: string;
    overlayStyle?: Partial<CSSStyleDeclaration>;
    contentStyle?: Partial<CSSStyleDeclaration>;
    customTemplate?: TemplateRef<unknown>;
    renderMode: ModernRenderMode;
    showHeader: boolean;
    faCheck: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faDisplay: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faExpand: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faGaugeHigh: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faVideo: import("@fortawesome/fontawesome-common-types").IconDefinition;
    faWaveSquare: import("@fortawesome/fontawesome-common-types").IconDefinition;
    meetingDisplayTypeState: string;
    autoWaveState: boolean;
    forceFullDisplayState: boolean;
    showSubtitlesOnCardsState: boolean;
    meetingVideoOptimizedState: boolean;
    readonly displayOptions: {
        value: string;
        label: string;
        description: string;
        icon: import("@fortawesome/fontawesome-common-types").IconDefinition;
    }[];
    constructor(modifyDisplaySettingsService: ModifyDisplaySettings);
    ngOnInit(): void;
    ngOnChanges(_changes: SimpleChanges): void;
    isVisible(): boolean;
    isEmbedded(): boolean;
    handleOverlayClick(): void;
    handleSaveSettings(): Promise<void>;
    resolvedOverlayStyle(): Record<string, string | number>;
    resolvedContentStyle(): Record<string, string | number>;
    resolvedAccentColor(): string;
    private ensureHandler;
    private resolvedModifyHandler;
    private syncFromParameters;
    private normalizeStyle;
    static ɵfac: i0.ɵɵFactoryDeclaration<ModernDisplaySettingsModalComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<ModernDisplaySettingsModalComponent, "app-display-settings-modal", never, { "isDisplaySettingsModalVisible": { "alias": "isDisplaySettingsModalVisible"; "required": false; }; "onDisplaySettingsClose": { "alias": "onDisplaySettingsClose"; "required": false; }; "onModifyDisplaySettings": { "alias": "onModifyDisplaySettings"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; "overlayStyle": { "alias": "overlayStyle"; "required": false; }; "contentStyle": { "alias": "contentStyle"; "required": false; }; "customTemplate": { "alias": "customTemplate"; "required": false; }; "renderMode": { "alias": "renderMode"; "required": false; }; "showHeader": { "alias": "showHeader"; "required": false; }; }, {}, never, never, true, never>;
}
