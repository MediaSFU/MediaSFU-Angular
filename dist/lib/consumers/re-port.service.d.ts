import { ScreenState, CompareScreenStatesParameters, CompareScreenStatesType, CompareActiveNamesParameters, CompareActiveNamesType } from '../@types/types';
import * as i0 from "@angular/core";
export interface RePortParameters extends CompareScreenStatesParameters, CompareActiveNamesParameters {
    islevel: string;
    mainScreenPerson: string;
    adminOnMainScreen: boolean;
    mainScreenFilled: boolean;
    recordStarted: boolean;
    recordStopped: boolean;
    recordPaused: boolean;
    recordResumed: boolean;
    screenStates: ScreenState[];
    prevScreenStates: ScreenState[];
    updateScreenStates: (states: ScreenState[]) => void;
    updatePrevScreenStates: (states: ScreenState[]) => void;
    compareActiveNames: CompareActiveNamesType;
    compareScreenStates: CompareScreenStatesType;
    getUpdatedAllParams: () => RePortParameters;
    [key: string]: any;
}
export interface RePortOptions {
    restart?: boolean;
    parameters: RePortParameters;
}
export type RePortType = (options: RePortOptions) => Promise<void>;
export declare class RePort {
    /**
     * RePort function that handles the reporting logic based on the provided parameters.
     *
     * @param {RePortOptions} options - The options for the rePort function.
     * @param {boolean} [options.restart=false] - Flag indicating whether to restart the process.
     * @param {Object} options.parameters - The parameters object containing various states and functions.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {string} options.parameters.islevel - The current level of the process.
     * @param {string} options.parameters.mainScreenPerson - The person on the main screen.
     * @param {boolean} options.parameters.adminOnMainScreen - Flag indicating if admin is on the main screen.
     * @param {boolean} options.parameters.mainScreenFilled - Flag indicating if the main screen is filled.
     * @param {boolean} options.parameters.recordStarted - Flag indicating if recording has started.
     * @param {boolean} options.parameters.recordStopped - Flag indicating if recording has stopped.
     * @param {boolean} options.parameters.recordPaused - Flag indicating if recording is paused.
     * @param {boolean} options.parameters.recordResumed - Flag indicating if recording has resumed.
     * @param {Array} options.parameters.screenStates - Array of current screen states.
     * @param {Function} options.parameters.updateScreenStates - Function to update the current screen states.
     * @param {Function} options.parameters.updatePrevScreenStates - Function to update the previous screen states.
     * @param {Function} options.parameters.compareActiveNames - Function to compare active names.
     * @param {Function} options.parameters.compareScreenStates - Function to compare screen states.
     *
     * @returns {Promise<void>} A promise that resolves when the reporting process is complete.
     *
     * @throws {Error} Throws an error if there is an issue during the reporting process.
     */
    rePort({ restart, parameters }: RePortOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<RePort, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<RePort>;
}
