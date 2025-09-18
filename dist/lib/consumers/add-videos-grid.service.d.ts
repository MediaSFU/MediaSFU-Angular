import { Participant, Stream, UpdateMiniCardsGridType, UpdateMiniCardsGridParameters, AudioCardParameters, EventType, CustomMediaComponent } from '../@types/types';
import * as i0 from "@angular/core";
export interface AddVideosGridParameters extends UpdateMiniCardsGridParameters, AudioCardParameters {
    eventType: EventType;
    updateAddAltGrid: (addAltGrid: boolean) => void;
    ref_participants: Participant[];
    islevel: string;
    videoAlreadyOn: boolean;
    localStreamVideo: MediaStream | null;
    keepBackground: boolean;
    virtualStream: MediaStream | null;
    forceFullDisplay: boolean;
    otherGridStreams: CustomMediaComponent[][];
    updateOtherGridStreams: (otherGridStreams: CustomMediaComponent[][]) => void;
    customVideoCard?: any;
    customAudioCard?: any;
    customMiniCard?: any;
    updateMiniCardsGrid: UpdateMiniCardsGridType;
    getUpdatedAllParams: () => AddVideosGridParameters;
    [key: string]: any;
}
export interface AddVideosGridOptions {
    mainGridStreams: (Stream | Participant)[];
    altGridStreams: (Stream | Participant)[];
    numtoadd: number;
    numRows: number;
    numCols: number;
    actualRows: number;
    lastrowcols: number;
    removeAltGrid: boolean;
    parameters: AddVideosGridParameters;
}
export type AddVideosGridType = (options: AddVideosGridOptions) => Promise<void>;
/**
 * @service AddVideosGrid
 * @description Service to manage and update video and audio components on a grid in the user interface. This service helps organize and configure participants and streams into different grid layouts.
 *
 * @method addVideosGrid
 * Adds video and audio cards to the main and alternate grids based on the parameters and configuration options provided.
 *
 * @param {AddVideosGridOptions} options - Configuration options for setting up the grid.
 * @param {(Stream | Participant)[]} options.mainGridStreams - Streams or participants to display on the main grid.
 * @param {(Stream | Participant)[]} options.altGridStreams - Streams or participants to display on the alternate grid.
 * @param {number} options.numtoadd - The number of items to add to the grid.
 * @param {number} options.numRows - The number of rows for the main grid.
 * @param {number} options.numCols - The number of columns for the main grid.
 * @param {number} options.actualRows - The actual rows currently displayed.
 * @param {number} options.lastrowcols - The number of columns in the last row of the grid.
 * @param {boolean} options.removeAltGrid - Whether to remove the alternate grid layout.
 * @param {AddVideosGridParameters} options.parameters - Additional parameters for updating the grid, controlling appearance, and handling events.
 *
 * @returns {Promise<void>} A promise that resolves once the grid layout is updated.
 *
 * @example
 * ```typescript
 * await addVideosGridService.addVideosGrid({
 *   mainGridStreams: [...],
 *   altGridStreams: [...],
 *   numtoadd: 4,
 *   numRows: 2,
 *   numCols: 2,
 *   actualRows: 2,
 *   lastrowcols: 2,
 *   removeAltGrid: false,
 *   parameters: {
 *     eventType: 'webinar',
 *     updateAddAltGrid: (value) => {},
 *     ref_participants: participantsList,
 *     islevel: '1',
 *     videoAlreadyOn: true,
 *     localStreamVideo: localStream,
 *     keepBackground: true,
 *     virtualStream: virtualStream,
 *     forceFullDisplay: false,
 *     otherGridStreams: otherStreamsArray,
 *     updateOtherGridStreams: (newStreams) => {},
 *     updateMiniCardsGrid: (params) => {},
 *     getUpdatedAllParams: () => ({ /* updated parameters * / }),
 *   },
 * });
 * ```
 */
export declare class AddVideosGrid {
    addVideosGrid: ({ mainGridStreams, altGridStreams, numtoadd, numRows, numCols, actualRows, lastrowcols, removeAltGrid, parameters, }: AddVideosGridOptions) => Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<AddVideosGrid, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AddVideosGrid>;
}
