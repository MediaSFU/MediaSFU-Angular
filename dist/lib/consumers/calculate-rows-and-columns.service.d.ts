import * as i0 from "@angular/core";
export interface CalculateRowsAndColumnsOptions {
    n: number;
}
export type CalculateRowsAndColumnsType = (options: CalculateRowsAndColumnsOptions) => [number, number];
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
