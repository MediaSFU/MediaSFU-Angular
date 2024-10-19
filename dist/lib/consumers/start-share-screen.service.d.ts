import { StreamSuccessScreenType, StreamSuccessScreenParameters, ShowAlert } from '../@types/types';
import * as i0 from "@angular/core";
export interface StartShareScreenParameters extends StreamSuccessScreenParameters {
    shared: boolean;
    showAlert?: ShowAlert;
    updateShared: (shared: boolean) => void;
    onWeb: boolean;
    targetWidth?: number;
    targetHeight?: number;
    streamSuccessScreen: StreamSuccessScreenType;
    [key: string]: any;
}
export interface StartShareScreenOptions {
    parameters: StartShareScreenParameters;
}
export type StartShareScreenType = (options: StartShareScreenOptions) => Promise<void>;
export declare class StartShareScreen {
    /**
     * Starts the screen sharing process.
     *
     * @param {StartShareScreenOptions} options - The options for starting screen sharing.
     * @param {Object} options.parameters - The parameters for screen sharing.
     * @param {boolean} options.parameters.shared - Indicates if the screen is currently being shared.
     * @param {Function} options.parameters.showAlert - Function to show alert messages.
     * @param {Function} options.parameters.updateShared - Function to update the shared state.
     * @param {boolean} options.parameters.onWeb - Indicates if the application is running on a web platform.
     * @param {number} [options.parameters.targetWidth] - The target width for screen sharing.
     * @param {number} [options.parameters.targetHeight] - The target height for screen sharing.
     * @param {Function} options.parameters.streamSuccessScreen - Function to handle successful screen sharing.
     *
     * @returns {Promise<void>} A promise that resolves when the screen sharing process is complete.
     *
     * @throws Will log an error message if there is an issue starting the screen share.
     */
    startShareScreen: ({ parameters }: StartShareScreenOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<StartShareScreen, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<StartShareScreen>;
}
