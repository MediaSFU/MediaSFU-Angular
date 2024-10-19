import { TriggerType, TriggerParameters } from '../@types/types';
import * as i0 from "@angular/core";
export interface CompareActiveNamesParameters extends TriggerParameters {
    activeNames: string[];
    prevActiveNames: string[];
    updateActiveNames: (activeNames: string[]) => void;
    updatePrevActiveNames: (prevActiveNames: string[]) => void;
    trigger: TriggerType;
    getUpdatedAllParams: () => CompareActiveNamesParameters;
    [key: string]: any;
}
export interface CompareActiveNamesOptions {
    restart?: boolean;
    parameters: CompareActiveNamesParameters;
}
export type CompareActiveNamesType = (options: CompareActiveNamesOptions) => Promise<void>;
export declare class CompareActiveNames {
    /**
     * Compares the current active names with the previous active names and triggers an action if there are changes.
     *
     * @param {Object} options - The options for comparing active names.
     * @param {boolean} [options.restart=false] - Whether to restart the comparison.
     * @param {CompareActiveNamesOptions} options.parameters - The parameters for the comparison.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {string[]} options.parameters.activeNames - The current active names.
     * @param {string[]} options.parameters.prevActiveNames - The previous active names.
     * @param {Function} options.parameters.updatePrevActiveNames - Function to update the previous active names.
     * @param {Function} options.parameters.trigger - Function to trigger an action when names change.
     *
     * @returns {Promise<void>} A promise that resolves when the comparison is complete.
     *
     * @throws Will log an error message if an error occurs during the comparison.
     */
    compareActiveNames({ restart, parameters, }: CompareActiveNamesOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CompareActiveNames, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CompareActiveNames>;
}
