import { ScreenState, TriggerType, TriggerParameters } from '../@types/types';
import * as i0 from "@angular/core";
export interface CompareScreenStatesParameters extends TriggerParameters {
    recordingDisplayType: 'video' | 'media' | 'all';
    recordingVideoOptimized: boolean;
    screenStates: ScreenState[];
    prevScreenStates: ScreenState[];
    activeNames: string[];
    trigger: TriggerType;
    getUpdatedAllParams: () => CompareScreenStatesParameters;
    [key: string]: any;
}
export interface CompareScreenStatesOptions {
    restart?: boolean;
    parameters: CompareScreenStatesParameters;
}
export type CompareScreenStatesType = (options: CompareScreenStatesOptions) => Promise<void>;
export declare class CompareScreenStates {
    /**
     * Compares the current screen states with the previous screen states and triggers actions based on changes.
     *
     * @param {Object} options - The options for comparing screen states.
     * @param {boolean} [options.restart=false] - Whether to restart the comparison process.
     * @param {CompareScreenStatesOptions} options.parameters - The parameters for the comparison.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {string} options.parameters.recordingDisplayType - The type of display being recorded.
     * @param {boolean} options.parameters.recordingVideoOptimized - Whether the recording is optimized for video.
     * @param {Array<ScreenState>} options.parameters.screenStates - The current screen states.
     * @param {Array<ScreenState>} options.parameters.prevScreenStates - The previous screen states.
     * @param {Array<string>} options.parameters.activeNames - The active names in the current context.
     * @param {Function} options.parameters.trigger - Function to trigger actions based on changes.
     *
     * @returns {Promise<void>} A promise that resolves when the comparison and any triggered actions are complete.
     *
     * @throws Will log an error message if an error occurs during the comparison process.
     */
    compareScreenStates({ restart, parameters, }: CompareScreenStatesOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CompareScreenStates, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CompareScreenStates>;
}
