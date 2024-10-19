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
 * Component for displaying and modifying display settings in a modal.
 *
 * @selector app-display-settings-modal
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule, FormsModule]
 * @templateUrl ./display-settings-modal.component.html
 * @styleUrls ['./display-settings-modal.component.css']
 *
 * @property {boolean} isDisplaySettingsModalVisible - Determines if the display settings modal is visible.
 * @property {() => void} onDisplaySettingsClose - Callback function to handle closing the display settings modal.
 * @property {(params: any) => void} onModifyDisplaySettings - Callback function to handle modifying display settings.
 * @property {DisplaySettingsModalParameters} parameters - Parameters for the display settings modal.
 * @property {string} position - Position of the modal on the screen. Default is 'topRight'.
 * @property {string} backgroundColor - Background color of the modal. Default is '#83c0e9'.
 *
 * @property {IconDefinition} faTimes - FontAwesome icon for the close button.
 *
 * @property {string} meetingDisplayTypeState - State for the meeting display type.
 * @property {boolean} autoWaveState - State for the auto wave setting. Default is false.
 * @property {boolean} forceFullDisplayState - State for the force full display setting. Default is false.
 * @property {boolean} meetingVideoOptimizedState - State for the meeting video optimized setting. Default is false.
 *
 * @constructor
 * @param {ModifyDisplaySettings} modifyDisplaySettingsService - Service to modify display settings.
 *
 * @method ngOnInit - Initializes the component and sets the initial state based on the input parameters.
 * @method handleSaveSettings - Handles saving the modified display settings.
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
