import * as i0 from "@angular/core";
export interface CalculateRowsAndColumnsOptions {
    n: number;
}
export type CalculateRowsAndColumnsType = (options: CalculateRowsAndColumnsOptions) => [number, number];
/**
 * @service CalculateRowsAndColumns
 * @description Service to calculate the optimal number of rows and columns needed to display a given number of items in a grid. Useful for dynamically determining grid layout in responsive designs.
 *
 * @method calculateRowsAndColumns
 * Calculates the optimal number of rows and columns to display a specified number of items in a compact grid format.
 *
 * @param {CalculateRowsAndColumnsOptions} options - Configuration options for row and column calculation.
 * @param {number} options.n - The number of items to display in the grid.
 *
 * @returns {[number, number]} A tuple where the first value is the number of rows and the second is the number of columns.
 *
 * @example
 * ```typescript
 * const [rows, cols] = calculateRowsAndColumnsService.calculateRowsAndColumns({ n: 10 });
 * console.log(rows, cols); // Outputs optimized rows and columns for displaying 10 items
 * ```
 */
export declare class CalculateRowsAndColumns {
    /**
     * Calculates the number of rows and columns needed to display a given number of items in a grid.
     *
     * @param {CalculateRowsAndColumnsOptions} options - The options for calculating rows and columns.
     * @param {number} options.n - The number of items to display.
     * @returns {[number, number]} A tuple containing the number of rows and columns.
     */
    calculateRowsAndColumns({ n }: CalculateRowsAndColumnsOptions): [number, number];
    static ɵfac: i0.ɵɵFactoryDeclaration<CalculateRowsAndColumns, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CalculateRowsAndColumns>;
}
