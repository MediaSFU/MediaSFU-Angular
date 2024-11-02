import { PrepopulateUserMediaType, PrepopulateUserMediaParameters, EventType } from '../@types/types';
import * as i0 from "@angular/core";
export interface ReadjustParameters extends PrepopulateUserMediaParameters {
    eventType: EventType;
    shareScreenStarted: boolean;
    shared: boolean;
    mainHeightWidth: number;
    prevMainHeightWidth: number;
    hostLabel: string;
    first_round: boolean;
    lock_screen: boolean;
    updateMainHeightWidth: (value: number) => void;
    prepopulateUserMedia: PrepopulateUserMediaType;
    getUpdatedAllParams: () => ReadjustParameters;
    [key: string]: any;
}
export interface ReadjustOptions {
    n: number;
    state: number;
    parameters: ReadjustParameters;
}
export type ReadjustType = (options: ReadjustOptions) => Promise<void>;
/**
 * Adjusts the layout parameters based on the provided options.
 *
 * This method calculates the layout dimensions and updates the main window size based on the current event type,
 * the number of participants, and whether screen sharing is active. It also manages the state transitions
 * to ensure that the UI reflects the correct configuration based on user interactions.
 *
 * @param {ReadjustOptions} options - The options for readjusting the layout.
 * @param {number} options.n - The number of participants or elements.
 * @param {number} options.state - The current state of the layout.
 * @param {Object} options.parameters - The parameters for the layout adjustment.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {string} options.parameters.eventType - The type of event (e.g., "broadcast", "chat", "conference").
 * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
 * @param {boolean} options.parameters.shared - Indicates if content is being shared.
 * @param {number} options.parameters.mainHeightWidth - The main height and width value.
 * @param {number} options.parameters.prevMainHeightWidth - The previous main height and width value.
 * @param {string} options.parameters.hostLabel - The label for the host.
 * @param {boolean} options.parameters.first_round - Indicates if it is the first round.
 * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
 * @param {Function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
 * @param {Function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
 *
 * @returns {Promise<void>} A promise that resolves when the layout adjustment is complete.
 *
 * @throws {Error} Throws an error if there is an issue updating the grid sizes.
 *
 * @example
 * ```typescript
 * const options = {
 *   n: 5,
 *   state: 0,
 *   parameters: {
 *     getUpdatedAllParams: () => updatedParams,
 *     eventType: 'conference',
 *     shareScreenStarted: false,
 *     shared: false,
 *     mainHeightWidth: 100,
 *     prevMainHeightWidth: 100,
 *     hostLabel: 'Host Name',
 *     first_round: false,
 *     lock_screen: false,
 *     updateMainHeightWidth: (value) => { console.log(updated) },
 *     prepopulateUserMedia: async ({ name, parameters }) => {  },
 *   },
 * };
 *
 * await readjust(options);
 * ```
 */
export declare class Readjust {
    /**
     * Adjusts the layout parameters based on the provided options.
     *
     * @param {ReadjustOptions} options - The options for readjusting the layout.
     * @param {number} options.n - The number of participants or elements.
     * @param {number} options.state - The current state of the layout.
     * @param {object} options.parameters - The parameters for the layout adjustment.
     * @param {function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {string} options.parameters.eventType - The type of event (e.g., "broadcast", "chat", "conference").
     * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
     * @param {boolean} options.parameters.shared - Indicates if content is being shared.
     * @param {number} options.parameters.mainHeightWidth - The main height and width value.
     * @param {number} options.parameters.prevMainHeightWidth - The previous main height and width value.
     * @param {string} options.parameters.hostLabel - The label for the host.
     * @param {boolean} options.parameters.first_round - Indicates if it is the first round.
     * @param {boolean} options.parameters.lock_screen - Indicates if the screen is locked.
     * @param {function} options.parameters.updateMainHeightWidth - Function to update the main height and width.
     * @param {function} options.parameters.prepopulateUserMedia - Function to prepopulate user media.
     * @returns {Promise<void>} A promise that resolves when the layout adjustment is complete.
     * @throws {Error} Throws an error if there is an issue updating the grid sizes.
     */
    readjust: ({ n, state, parameters }: ReadjustOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<Readjust, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<Readjust>;
}
