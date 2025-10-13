import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import {
  ModifyDisplaySettings,
  ModifyDisplaySettingsOptions,
  ModifyDisplaySettingsParameters,
} from '../../methods/display-settings-methods/modify-display-settings.service';

export interface DisplaySettingsModalParameters extends ModifyDisplaySettingsParameters {
  meetingDisplayType: string;
  autoWave: boolean;
  forceFullDisplay: boolean;
  meetingVideoOptimized: boolean;
}

export interface DisplaySettingsModalOptions {
  isDisplaySettingsModalVisible: boolean;
  onDisplaySettingsClose: () => void;
  onModifyDisplaySettings: (options: ModifyDisplaySettingsOptions) => void;
  parameters: DisplaySettingsModalParameters;
  position: string;
  backgroundColor: string;
  overlayStyle?: Partial<CSSStyleDeclaration>;
  contentStyle?: Partial<CSSStyleDeclaration>;
  customTemplate?: any;
}

export type DisplaySettingsModalType = (options: DisplaySettingsModalOptions) => HTMLElement;

/**
 * DisplaySettingsModal - Modal for configuring video grid layout and display preferences
 * 
 * @component
 * @description
 * Provides controls for customizing the meeting video display layout and behavior.
 * Includes display type (video, media, all), auto-wave, force full display, and video optimization settings.
 * 
 * Supports three levels of customization:
 * 1. **Basic Usage**: Use default modal UI with layout toggles and checkboxes
 * 2. **Style Customization**: Override modal appearance with overlayStyle and contentStyle
 * 3. **Full Override**: Provide a custom template via customTemplate for complete control
 * 
 * Key Features:
 * - Display type selection (video, media, all)
 * - Auto-wave toggle (show waveform on audio detection)
 * - Force full display toggle
 * - Video optimization toggle
 * - Real-time layout updates
 * 
 * @example
 * Basic Usage:
 * ```html
 * <app-display-settings-modal
 *   [isDisplaySettingsModalVisible]="showDisplaySettings"
 *   [parameters]="displayParams"
 *   [onModifyDisplaySettings]="saveDisplaySettings"
 *   [onDisplaySettingsClose]="closeDisplaySettings">
 * </app-display-settings-modal>
 * ```
 * 
 * @example
 * Style Customization:
 * ```html
 * <app-display-settings-modal
 *   [isDisplaySettingsModalVisible]="showDisplaySettings"
 *   [parameters]="displayParams"
 *   [overlayStyle]="{
 *     backgroundColor: 'rgba(0, 0, 0, 0.7)'
 *   }"
 *   [contentStyle]="{
 *     backgroundColor: '#ffffff',
 *     borderRadius: '12px',
 *     padding: '25px',
 *     boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
 *   }"
 *   [position]="'center'"
 *   [backgroundColor]="'#f0f0f0'"
 *   [onDisplaySettingsClose]="closeDisplaySettings">
 * </app-display-settings-modal>
 * ```
 * 
 * @example
 * Custom Template Override:
 * ```html
 * <app-display-settings-modal
 *   [isDisplaySettingsModalVisible]="showDisplaySettings"
 *   [customTemplate]="customDisplayTemplate"
 *   [onDisplaySettingsClose]="closeDisplaySettings">
 * </app-display-settings-modal>
 * 
 * <ng-template #customDisplayTemplate let-displayType="meetingDisplayType" let-autoWave="autoWave" let-onSave="onSave">
 *   <div class="custom-display-settings">
 *     <h3>Layout Settings</h3>
 *     <label>
 *       Display Type:
 *       <select [(ngModel)]="displayType">
 *         <option value="video">Video Only</option>
 *         <option value="media">Media Only</option>
 *         <option value="all">All Participants</option>
 *       </select>
 *     </label>
 *     <label>
 *       <input type="checkbox" [(ngModel)]="autoWave">
 *       Show audio waveforms
 *     </label>
 *     <button (click)="onSave()">Apply Settings</button>
 *   </div>
 * </ng-template>
 * ```
 * 
 * @selector app-display-settings-modal
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, FormsModule
 * 
 * @input isDisplaySettingsModalVisible - Whether the modal is currently visible. Default: `false`
 * @input onDisplaySettingsClose - Callback function to close the modal. Default: `() => {}`
 * @input onModifyDisplaySettings - Callback to save modified display settings. Default: `modifyDisplaySettingsService.modifyDisplaySettings`
 * @input parameters - Object containing current display settings (meetingDisplayType, autoWave, forceFullDisplay, meetingVideoOptimized). Default: `{}`
 * @input position - Modal position on screen ('topRight', 'center', etc.). Default: `'topRight'`
 * @input backgroundColor - Background color of the modal content. Default: `'#83c0e9'`
 * @input overlayStyle - Custom CSS styles for the modal overlay backdrop. Default: `undefined`
 * @input contentStyle - Custom CSS styles for the modal content container. Default: `undefined`
 * @input customTemplate - Custom TemplateRef to completely replace default modal template. Default: `undefined`
 * 
 * @method ngOnInit - Initializes component and synchronizes state with parameters
 * @method handleSaveSettings - Saves modified display settings and closes modal
 * @method getCombinedOverlayStyle - Merges default and custom overlay styles
 * @method getCombinedContentStyle - Merges default and custom content styles
 */

@Component({
    selector: 'app-display-settings-modal',
    imports: [CommonModule, FontAwesomeModule, FormsModule],
    templateUrl: './display-settings-modal.component.html',
    styleUrls: ['./display-settings-modal.component.css']
})
export class DisplaySettingsModal {
  @Input() isDisplaySettingsModalVisible = false;
  @Input() onDisplaySettingsClose!: () => void;
  @Input() onModifyDisplaySettings!: (params: any) => void;
  @Input() parameters!: DisplaySettingsModalParameters;
  @Input() position = 'topRight';
  @Input() backgroundColor = '#83c0e9';
  @Input() overlayStyle?: Partial<CSSStyleDeclaration>;
  @Input() contentStyle?: Partial<CSSStyleDeclaration>;
  @Input() customTemplate?: any;

  faTimes = faTimes;

  meetingDisplayTypeState!: string;
  autoWaveState = false;
  forceFullDisplayState = false;
  meetingVideoOptimizedState = false;

  constructor(private modifyDisplaySettingsService: ModifyDisplaySettings) {}

  ngOnInit(): void {
    this.meetingDisplayTypeState = this.parameters.meetingDisplayType;
    this.autoWaveState = this.parameters.autoWave;
    this.forceFullDisplayState = this.parameters.forceFullDisplay;
    this.meetingVideoOptimizedState = this.parameters.meetingVideoOptimized;

    if (!this.onModifyDisplaySettings) {
      this.onModifyDisplaySettings = this.modifyDisplaySettingsService.modifyDisplaySettings.bind(
        this.modifyDisplaySettingsService,
      );
    }
  }

  handleSaveSettings = async () => {
    await this.onModifyDisplaySettings({
      parameters: {
        ...this.parameters,
        meetingDisplayType: this.meetingDisplayTypeState,
        autoWave: this.autoWaveState,
        forceFullDisplay: this.forceFullDisplayState,
        meetingVideoOptimized: this.meetingVideoOptimizedState,
      },
    });
  };

  getCombinedOverlayStyle() {
    return {
      ...(this.overlayStyle || {})
    };
  }

  getCombinedContentStyle() {
    return {
      'background-color': this.backgroundColor,
      ...(this.contentStyle || {})
    };
  }
}
