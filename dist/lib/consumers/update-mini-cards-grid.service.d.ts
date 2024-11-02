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
/**
 * Updates the mini cards grid based on the specified rows and columns.
 *
 * This method calculates the dimensions for the mini cards based on the provided
 * rows and columns, as well as the container sizes. It also considers pagination
 * settings and updates the grid sizes accordingly. The method can update either
 * the default grid or an alternative grid based on the `defal` parameter.
 *
 * @param {UpdateMiniCardsGridOptions} options - The options for updating the mini cards grid.
 * @param {number} options.rows - The number of rows in the grid.
 * @param {number} options.cols - The number of columns in the grid.
 * @param {boolean} [options.defal=true] - Flag indicating whether to update the default grid or an alternative grid.
 * @param {number} [options.actualRows=2] - The actual number of rows in the grid.
 * @param {UpdateMiniCardsGridParameters} options.parameters - Additional parameters needed for the function.
 * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
 * @param {Function} options.parameters.updateGridRows - Function to update the grid rows.
 * @param {Function} options.parameters.updateGridCols - Function to update the grid columns.
 * @param {Function} options.parameters.updateAltGridRows - Function to update the alternative grid rows.
 * @param {Function} options.parameters.updateAltGridCols - Function to update the alternative grid columns.
 * @param {Function} options.parameters.updateGridSizes - Function to update the grid sizes.
 * @param {GridSizes} options.parameters.gridSizes - Object containing grid width and height.
 * @param {string} options.parameters.paginationDirection - The direction of pagination ('horizontal' or 'vertical').
 * @param {number} options.parameters.paginationHeightWidth - The height or width of pagination.
 * @param {boolean} options.parameters.doPaginate - Flag indicating whether pagination is enabled.
 * @param {ComponentSizes} options.parameters.componentSizes - Object containing container width and height.
 * @param {EventType} options.parameters.eventType - The type of event ('chat', etc.).
 *
 * @returns {Promise<void>} - A Promise that resolves after updating the mini cards grid.
 *
 * @example
 * ```typescript
 * const gridOptions = {
 *   rows: 3,
 *   cols: 4,
 *   parameters: {
 *     getUpdatedAllParams: () => updatedParams,
 *     updateGridRows: (rows) => console.log(`Grid Rows Updated: ${rows}`),
 *     updateGridCols: (cols) => console.log(`Grid Cols Updated: ${cols}`),
 *     updateAltGridRows: (rows) => console.log(`Alt Grid Rows Updated: ${rows}`),
 *     updateAltGridCols: (cols) => console.log(`Alt Grid Cols Updated: ${cols}`),
 *     updateGridSizes: (sizes) => console.log(`Grid Sizes Updated: ${JSON.stringify(sizes)}`),
 *     gridSizes: { gridWidth: 100, gridHeight: 100 },
 *     paginationDirection: 'horizontal',
 *     paginationHeightWidth: 50,
 *     doPaginate: true,
 *     componentSizes: { otherWidth: 800, otherHeight: 600 },
 *     eventType: 'chat',
 *   },
 * };
 *
 * const miniCardGridService = new UpdateMiniCardsGrid();
 * miniCardGridService.updateMiniCardsGrid(gridOptions);
 * ```
 */
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
