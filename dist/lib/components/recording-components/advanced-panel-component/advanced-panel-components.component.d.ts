import { OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { EventType } from '../../../@types/types';
import * as i0 from "@angular/core";
export interface AdvancedPanelParameters {
    recordingOrientationVideo: string;
    recordingNameTags: boolean;
    recordingVideoType: string;
    recordingDisplayType: 'video' | 'media' | 'all';
    recordingAddText: boolean;
    recordingCustomText: string;
    recordingCustomTextPosition: string;
    recordingBackgroundColor: string;
    recordingCustomTextColor: string;
    recordingNameTagsColor: string;
    updateRecordingOrientationVideo: (orientation: string) => void;
    updateRecordingNameTags: (nameTags: boolean) => void;
    updateRecordingVideoType: (videoType: string) => void;
    updateRecordingDisplayType: (displayType: 'video' | 'media' | 'all') => void;
    updateRecordingAddText: (addText: boolean) => void;
    updateRecordingCustomText: (customText: string) => void;
    updateRecordingCustomTextPosition: (position: string) => void;
    updateRecordingBackgroundColor: (color: string) => void;
    updateRecordingCustomTextColor: (color: string) => void;
    updateRecordingNameTagsColor: (color: string) => void;
    eventType: EventType;
}
export type AdvancedPanelType = (options: AdvancedPanelParameters) => HTMLElement;
/**
 * Component for configuring advanced recording options in a MediaSFU session.
 *
 * @component
 * @selector app-advanced-panel-component
 * @standalone true
 * @templateUrl ./advanced-panel-component.component.html
 * @styleUrls ['./advanced-panel-component.component.css']
 * @imports [CommonModule, FormsModule]
 *
 * @example
 * ```html
 * <app-advanced-panel-component [parameters]="advancedPanelOptions"></app-advanced-panel-component>
 * ```
 */
export declare class AdvancedPanelComponent implements OnInit, OnChanges {
    parameters: AdvancedPanelParameters;
    selectedOrientationVideo: string;
    selectedRecordingNameTags: boolean;
    selectedRecordingVideoType: string;
    selectedRecordingDisplayType: 'video' | 'media' | 'all';
    showBackgroundColorModal: boolean;
    showNameTagsColorModal: boolean;
    selectedColorType: string;
    recordingText: boolean;
    customText: string;
    recordingPosition: string;
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    validateTextInput(input: string): boolean;
    handleTextChange(value: boolean): void;
    onChangeTextHandler(text: string): void;
    handleColorChange(selectedColor: string, event: Event): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<AdvancedPanelComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AdvancedPanelComponent, "app-advanced-panel-component", never, { "parameters": { "alias": "parameters"; "required": false; }; }, {}, never, never, true, never>;
}
