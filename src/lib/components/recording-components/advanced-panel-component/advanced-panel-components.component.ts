import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventType } from '../../../@types/types';

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

@Component({
  selector: 'app-advanced-panel-component',
  standalone: true,
  templateUrl: './advanced-panel-component.component.html',
  styleUrls: ['./advanced-panel-component.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AdvancedPanelComponent implements OnInit, OnChanges {
  @Input() parameters: AdvancedPanelParameters = {} as AdvancedPanelParameters;

  selectedOrientationVideo!: string;
  selectedRecordingNameTags!: boolean;
  selectedRecordingVideoType!: string;
  selectedRecordingDisplayType!: 'video' | 'media' | 'all';
  showBackgroundColorModal = false;
  showNameTagsColorModal = false;
  selectedColorType = '';
  recordingText!: boolean;
  customText!: string;
  recordingPosition!: string;

  ngOnInit() {
    this.selectedOrientationVideo = this.parameters?.recordingOrientationVideo ?? '';
    this.selectedRecordingNameTags = this.parameters?.recordingNameTags ?? false;
    this.selectedRecordingVideoType = this.parameters?.recordingVideoType ?? '';
    this.selectedRecordingDisplayType = this.parameters?.recordingDisplayType ?? 'media';
    this.recordingText = this.parameters?.recordingAddText ?? false;
    this.customText = this.parameters?.recordingCustomText ?? '';
    this.recordingPosition = this.parameters?.recordingCustomTextPosition ?? '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['parameters']) {
      this.parameters = changes['parameters'].currentValue;
      this.selectedOrientationVideo = this.parameters.recordingOrientationVideo;
      this.selectedRecordingNameTags = this.parameters.recordingNameTags;
      this.selectedRecordingVideoType = this.parameters.recordingVideoType;
      this.selectedRecordingDisplayType = this.parameters.recordingDisplayType;
      this.recordingText = this.parameters.recordingAddText;
      this.customText = this.parameters.recordingCustomText;
      this.recordingPosition = this.parameters.recordingCustomTextPosition;
    }
  }

  validateTextInput(input: string): boolean {
    const regex = /^[a-zA-Z0-9\s]{1,40}$/;
    return regex.test(input);
  }

  handleTextChange(value: boolean) {
    this.recordingText = value;
    this.parameters.updateRecordingAddText(value);
  }

  onChangeTextHandler(text: string) {
    if (text && text.length > 0 && !this.validateTextInput(text)) {
      return;
    }
    this.parameters.updateRecordingCustomText(text);
    this.customText = text;
  }

  handleColorChange(selectedColor: string, event: Event) {
    const input = event.target as HTMLInputElement;
    const color = input.value;
    if (selectedColor === 'backgroundColor') {
      this.parameters.updateRecordingBackgroundColor(color);
    } else if (selectedColor === 'customTextColor') {
      this.parameters.updateRecordingCustomTextColor(color);
    } else if (selectedColor === 'nameTagsColor') {
      this.parameters.updateRecordingNameTagsColor(color);
    }
  }
}
