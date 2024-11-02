import { Injectable } from '@angular/core';

export interface CheckGridOptions {
  rows: number;
  cols: number;
  actives: number;
}

export type CheckGridType = (
  options: CheckGridOptions,
) => Promise<[boolean, number, number, number, number, number, number] | void>;

  /**
   * Checks the grid configuration and calculates various parameters based on the number of rows, columns, and active elements.
   *
   * @param {CheckGridOptions} options - The options for checking the grid.
   * @param {number} options.rows - The number of rows in the grid.
   * @param {number} options.cols - The number of columns in the grid.
   * @param {number} options.actives - The number of active elements in the grid.
   * @returns {Promise<[boolean, number, number, number, number, number, number] | void>} A promise that resolves to a tuple containing:
   * - `removeAltGrid` (boolean): Indicates whether to remove the alternate grid.
   * - `numtoadd` (number): The number of elements to add.
   * - `numRows` (number): The number of rows.
   * - `numCols` (number): The number of columns.
   * - `remainingVideos` (number): The number of remaining videos.
   * - `actualRows` (number): The actual number of rows.
   * - `lastrowcols` (number): The number of columns in the last row.
   *
   * If an error occurs, it logs the error to the console.
   *
   *   *
   * @example
   * ```typescript
   * const options = {
   *   rows: 3,
   *   cols: 4,
   *   actives: 10,
   * };
   *
   * const result = await checkGridService.checkGrid(options);
   * console.log(result);
   * // Output could be: [false, 2, 3, 4, 2, 3, 2]
   * ```
   */

@Injectable({
  providedIn: 'root',
})
export class CheckGrid {

  async checkGrid({
    rows,
    cols,
    actives,
  }: CheckGridOptions): Promise<[boolean, number, number, number, number, number, number] | void> {
    try {
      let numRows = 0;
      let numCols = 0;
      let lastrow = 0;
      let lastrowcols = 0;
      let remainingVideos = 0;
      let numtoadd = 0;
      let actualRows = 0;
      let removeAltGrid = false;

      if (rows * cols !== actives) {
        if (rows * cols > actives) {
          const res = actives - (rows - 1) * cols;
          if (cols * 0.5 < res) {
            lastrow = rows;
            lastrowcols = res;
            remainingVideos = lastrowcols;
          } else {
            lastrowcols = res + cols;
            lastrow = rows - 1;
            remainingVideos = lastrowcols;
          }

          numRows = lastrow - 1;
          numCols = cols;
          numtoadd = (lastrow - 1) * numCols;
          actualRows = lastrow;

          removeAltGrid = false;
        }
      } else {
        // Perfect fit
        numCols = cols;
        numRows = rows;
        lastrow = rows;
        lastrowcols = cols;
        remainingVideos = 0;
        numtoadd = lastrow * numCols;
        actualRows = lastrow;
        removeAltGrid = true;
      }

      return [removeAltGrid, numtoadd, numRows, numCols, remainingVideos, actualRows, lastrowcols];
    } catch (error) {
      console.log('checkGrid error', error);
      throw error;
    }
  }
}
