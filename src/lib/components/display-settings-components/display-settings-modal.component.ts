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
}

export type DisplaySettingsModalType = (options: DisplaySettingsModalOptions) => HTMLElement;

/**
 * DisplaySettingsModal component is a modal dialog for managing display settings in a meeting.
 *
 * @component
 * @selector app-display-settings-modal
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, FormsModule]
 *
 * @example
 * ```html
 * <app-display-settings-modal
 *   [isDisplaySettingsModalVisible]="true"
 *   [onDisplaySettingsClose]="closeModal"
 *   [onModifyDisplaySettings]="saveSettings"
 *   [parameters]="displaySettingsParams"
 *   position="topRight"
 *   backgroundColor="#83c0e9"
 * ></app-display-settings-modal>
 * ```
 *
 * @input {boolean} isDisplaySettingsModalVisible - Determines if the modal is visible.
 * @input {() => void} onDisplaySettingsClose - Callback to close the modal.
 * @input {(params: any) => void} onModifyDisplaySettings - Callback to modify display settings.
 * @input {DisplaySettingsModalParameters} parameters - Input parameters for modal settings.
 * @input {string} position - Modal's screen position, default is 'topRight'.
 * @input {string} backgroundColor - Background color of the modal, default is '#83c0e9'.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for closing the modal.
 *
 * @property {string} meetingDisplayTypeState - State variable for meeting display type.
 * @property {boolean} autoWaveState - State variable for auto wave setting.
 * @property {boolean} forceFullDisplayState - State variable for force full display setting.
 * @property {boolean} meetingVideoOptimizedState - State variable for video optimized setting.
 *
 * @constructor
 * @param {ModifyDisplaySettings} modifyDisplaySettingsService - Service to handle display settings modifications.
 *
 * @method ngOnInit - Initializes component state based on input parameters.
 * @method handleSaveSettings - Triggers the modification of display settings using `onModifyDisplaySettings`.
 */

@Component({
  selector: 'app-display-settings-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, FormsModule],
  templateUrl: './display-settings-modal.component.html',
  styleUrls: ['./display-settings-modal.component.css'],
})
export class DisplaySettingsModal {
  @Input() isDisplaySettingsModalVisible = false;
  @Input() onDisplaySettingsClose!: () => void;
  @Input() onModifyDisplaySettings!: (params: any) => void;
  @Input() parameters!: DisplaySettingsModalParameters;
  @Input() position = 'topRight';
  @Input() backgroundColor = '#83c0e9';

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
}
