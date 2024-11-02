import { ModifyDisplaySettings, ModifyDisplaySettingsOptions, ModifyDisplaySettingsParameters } from '../../methods/display-settings-methods/modify-display-settings.service';
import * as i0 from "@angular/core";
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
export declare class DisplaySettingsModal {
    private modifyDisplaySettingsService;
    isDisplaySettingsModalVisible: boolean;
    onDisplaySettingsClose: () => void;
    onModifyDisplaySettings: (params: any) => void;
    parameters: DisplaySettingsModalParameters;
    position: string;
    backgroundColor: string;
    faTimes: import("@fortawesome/fontawesome-common-types").IconDefinition;
    meetingDisplayTypeState: string;
    autoWaveState: boolean;
    forceFullDisplayState: boolean;
    meetingVideoOptimizedState: boolean;
    constructor(modifyDisplaySettingsService: ModifyDisplaySettings);
    ngOnInit(): void;
    handleSaveSettings: () => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<DisplaySettingsModal, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DisplaySettingsModal, "app-display-settings-modal", never, { "isDisplaySettingsModalVisible": { "alias": "isDisplaySettingsModalVisible"; "required": false; }; "onDisplaySettingsClose": { "alias": "onDisplaySettingsClose"; "required": false; }; "onModifyDisplaySettings": { "alias": "onModifyDisplaySettings"; "required": false; }; "parameters": { "alias": "parameters"; "required": false; }; "position": { "alias": "position"; "required": false; }; "backgroundColor": { "alias": "backgroundColor"; "required": false; }; }, {}, never, never, true, never>;
}
