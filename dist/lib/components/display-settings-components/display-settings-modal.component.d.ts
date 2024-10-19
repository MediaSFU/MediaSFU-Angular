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
