import { GridSizes, ComponentSizes, EventType } from '../@types/types';
import * as i0 from "@angular/core";
export interface UpdateMiniCardsGridParameters {
    updateGridRows: (rows: number) => void;
    updateGridCols: (cols: number) => void;
    updateAltGridRows: (rows: number) => void;
    updateAltGridCols: (cols: number) => void;
    updateGridSizes: (gridSizes: GridSizes) => void;
    gridSizes: GridSizes;
    paginationDirection: string;
    paginationHeightWidth: number;
    doPaginate: boolean;
    componentSizes: ComponentSizes;
    eventType: EventType;
    getUpdatedAllParams: () => UpdateMiniCardsGridParameters;
    [key: string]: any;
}
export interface UpdateMiniCardsGridOptions {
    rows: number;
    cols: number;
    defal?: boolean;
    actualRows?: number;
    parameters: UpdateMiniCardsGridParameters;
}
export type UpdateMiniCardsGridType = (options: UpdateMiniCardsGridOptions) => Promise<void>;
export declare class UpdateMiniCardsGrid {
    /**
     * Updates the mini cards grid based on the specified rows and columns.
     *
     * @param {object} options - The function parameters.
     * @param {number} options.rows - The number of rows in the grid.
     * @param {number} options.cols - The number of columns in the grid.
     * @param {boolean} options.defal - Flag indicating whether to update the default grid or an alternative grid.
     * @param {number} options.actualRows - The actual number of rows in the grid.
     * @param {number} options.ind - The index parameter.
     * @param {object} options.parameters - Additional parameters needed for the function.
     * @param {function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {function} options.parameters.updateGridRows - Function to update the grid rows.
     * @param {function} options.parameters.updateGridCols - Function to update the grid columns.
     * @param {function} options.parameters.updateAltGridRows - Function to update the alternative grid rows.
     * @param {function} options.parameters.updateAltGridCols - Function to update the alternative grid columns.
     * @param {function} options.parameters.updateGridSizes - Function to update the grid sizes.
     * @param {object} options.parameters.gridSizes - Object containing grid width and height.
     * @param {string} options.parameters.paginationDirection - The direction of pagination ('horizontal' or 'vertical').
     * @param {number} options.parameters.paginationHeightWidth - The height or width of pagination.
     * @param {boolean} options.parameters.doPaginate - Flag indicating whether pagination is enabled.
     * @param {object} options.parameters.componentSizes - Object containing container width and height.
     * @param {string} options.parameters.eventType - The type of event ('chat', etc.).
     * @returns {Promise<void>} - A Promise that resolves after updating the mini cards grid.
     */
    updateMiniCardsGrid({ rows, cols, defal, actualRows, parameters, }: UpdateMiniCardsGridOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<UpdateMiniCardsGrid, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<UpdateMiniCardsGrid>;
}
