import { Injectable } from '@angular/core';
import { GridSizes, ComponentSizes, EventType } from '../@types/types';
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

// Export the type definition for the function
export type UpdateMiniCardsGridType = (options: UpdateMiniCardsGridOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class UpdateMiniCardsGrid {
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
  async updateMiniCardsGrid({
    rows,
    cols,
    defal = true,
    actualRows = 2,
    parameters,
  }: UpdateMiniCardsGridOptions): Promise<void> {
    let { getUpdatedAllParams } = parameters;
    parameters = getUpdatedAllParams();

    let {
      updateGridRows,
      updateGridCols,
      updateAltGridRows,
      updateAltGridCols,
      updateGridSizes,

      gridSizes,
      paginationDirection,
      paginationHeightWidth,
      doPaginate,
      componentSizes,
      eventType,
    } = parameters;

    let containerWidth = componentSizes.otherWidth;
    let containerHeight = componentSizes.otherHeight;

    if (doPaginate) {
      // if pagination is enabled and direction is horizontal
      if (paginationDirection == 'horizontal') {
        containerHeight = containerHeight - paginationHeightWidth;
      } else {
        containerWidth = containerWidth - paginationHeightWidth;
      }
    }

    let cardSpacing = 3; // 3px margin between cards
    if (eventType == 'chat') {
      cardSpacing = 0;
    }
    let totalSpacingHorizontal = (cols - 1) * cardSpacing;
    let totalSpacingVertical = (actualRows - 1) * cardSpacing;
    let cardWidth;
    let cardHeight;
    if (cols == 0 || actualRows == 0) {
      cardWidth = 0;
      cardHeight = 0;
    } else {
      cardWidth = Math.floor((containerWidth - totalSpacingHorizontal) / cols);
      cardHeight = Math.floor((containerHeight - totalSpacingVertical) / actualRows);
    }

    if (defal) {
      updateGridRows(rows);
      updateGridCols(cols);

      gridSizes = { ...gridSizes, gridWidth: cardWidth, gridHeight: cardHeight };
      updateGridSizes(gridSizes);
    } else {
      updateAltGridRows(rows);
      updateAltGridCols(cols);

      gridSizes = { ...gridSizes, altGridWidth: cardWidth, altGridHeight: cardHeight };
      updateGridSizes(gridSizes);
    }
  }
}
