import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
export class CalculateRowsAndColumns {
    /**
     * Calculates the number of rows and columns needed to display a given number of items in a grid.
     *
     * @param {CalculateRowsAndColumnsOptions} options - The options for calculating rows and columns.
     * @param {number} options.n - The number of items to display.
     * @returns {[number, number]} A tuple containing the number of rows and columns.
     */
    calculateRowsAndColumns({ n }) {
        // Calculate the square root of n
        const sqrt = Math.sqrt(n);
        // Initialize columns based on the floor of the square root
        let cols = Math.floor(sqrt);
        // Calculate the number of rows needed to display n videos
        let rows = Math.ceil(n / cols);
        // Calculate the product of rows and columns
        let prod = rows * cols;
        // Adjust rows and columns until the product is greater than or equal to n
        while (prod < n) {
            if (cols < rows) {
                cols++;
            }
            else {
                rows++;
            }
            prod = rows * cols;
        }
        // Return an array with the calculated number of rows and columns
        return [rows, cols];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CalculateRowsAndColumns, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CalculateRowsAndColumns, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CalculateRowsAndColumns, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRlLXJvd3MtYW5kLWNvbHVtbnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvY2FsY3VsYXRlLXJvd3MtYW5kLWNvbHVtbnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVczQzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQkc7QUFNSCxNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDOzs7Ozs7T0FNRztJQUNILHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxFQUFrQztRQUMzRCxpQ0FBaUM7UUFDakMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUxQiwyREFBMkQ7UUFDM0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU1QiwwREFBMEQ7UUFDMUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFL0IsNENBQTRDO1FBQzVDLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7UUFFdkIsMEVBQTBFO1FBQzFFLE9BQU8sSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDO2dCQUNoQixJQUFJLEVBQUUsQ0FBQztZQUNULENBQUM7aUJBQU0sQ0FBQztnQkFDTixJQUFJLEVBQUUsQ0FBQztZQUNULENBQUM7WUFDRCxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBRUQsaUVBQWlFO1FBQ2pFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQzt1R0FqQ1UsdUJBQXVCOzJHQUF2Qix1QkFBdUIsY0FGdEIsTUFBTTs7MkZBRVAsdUJBQXVCO2tCQUhuQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBDYWxjdWxhdGVSb3dzQW5kQ29sdW1uc09wdGlvbnMge1xuICBuOiBudW1iZXI7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zVHlwZSA9IChcbiAgb3B0aW9uczogQ2FsY3VsYXRlUm93c0FuZENvbHVtbnNPcHRpb25zLFxuKSA9PiBbbnVtYmVyLCBudW1iZXJdO1xuXG4vKipcbiAqIEBzZXJ2aWNlIENhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zXG4gKiBAZGVzY3JpcHRpb24gU2VydmljZSB0byBjYWxjdWxhdGUgdGhlIG9wdGltYWwgbnVtYmVyIG9mIHJvd3MgYW5kIGNvbHVtbnMgbmVlZGVkIHRvIGRpc3BsYXkgYSBnaXZlbiBudW1iZXIgb2YgaXRlbXMgaW4gYSBncmlkLiBVc2VmdWwgZm9yIGR5bmFtaWNhbGx5IGRldGVybWluaW5nIGdyaWQgbGF5b3V0IGluIHJlc3BvbnNpdmUgZGVzaWducy5cbiAqXG4gKiBAbWV0aG9kIGNhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zXG4gKiBDYWxjdWxhdGVzIHRoZSBvcHRpbWFsIG51bWJlciBvZiByb3dzIGFuZCBjb2x1bW5zIHRvIGRpc3BsYXkgYSBzcGVjaWZpZWQgbnVtYmVyIG9mIGl0ZW1zIGluIGEgY29tcGFjdCBncmlkIGZvcm1hdC5cbiAqXG4gKiBAcGFyYW0ge0NhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zT3B0aW9uc30gb3B0aW9ucyAtIENvbmZpZ3VyYXRpb24gb3B0aW9ucyBmb3Igcm93IGFuZCBjb2x1bW4gY2FsY3VsYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5uIC0gVGhlIG51bWJlciBvZiBpdGVtcyB0byBkaXNwbGF5IGluIHRoZSBncmlkLlxuICpcbiAqIEByZXR1cm5zIHtbbnVtYmVyLCBudW1iZXJdfSBBIHR1cGxlIHdoZXJlIHRoZSBmaXJzdCB2YWx1ZSBpcyB0aGUgbnVtYmVyIG9mIHJvd3MgYW5kIHRoZSBzZWNvbmQgaXMgdGhlIG51bWJlciBvZiBjb2x1bW5zLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCBbcm93cywgY29sc10gPSBjYWxjdWxhdGVSb3dzQW5kQ29sdW1uc1NlcnZpY2UuY2FsY3VsYXRlUm93c0FuZENvbHVtbnMoeyBuOiAxMCB9KTtcbiAqIGNvbnNvbGUubG9nKHJvd3MsIGNvbHMpOyAvLyBPdXRwdXRzIG9wdGltaXplZCByb3dzIGFuZCBjb2x1bW5zIGZvciBkaXNwbGF5aW5nIDEwIGl0ZW1zXG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBDYWxjdWxhdGVSb3dzQW5kQ29sdW1ucyB7XG4gIC8qKlxuICAgKiBDYWxjdWxhdGVzIHRoZSBudW1iZXIgb2Ygcm93cyBhbmQgY29sdW1ucyBuZWVkZWQgdG8gZGlzcGxheSBhIGdpdmVuIG51bWJlciBvZiBpdGVtcyBpbiBhIGdyaWQuXG4gICAqXG4gICAqIEBwYXJhbSB7Q2FsY3VsYXRlUm93c0FuZENvbHVtbnNPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGNhbGN1bGF0aW5nIHJvd3MgYW5kIGNvbHVtbnMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLm4gLSBUaGUgbnVtYmVyIG9mIGl0ZW1zIHRvIGRpc3BsYXkuXG4gICAqIEByZXR1cm5zIHtbbnVtYmVyLCBudW1iZXJdfSBBIHR1cGxlIGNvbnRhaW5pbmcgdGhlIG51bWJlciBvZiByb3dzIGFuZCBjb2x1bW5zLlxuICAgKi9cbiAgY2FsY3VsYXRlUm93c0FuZENvbHVtbnMoeyBuIH06IENhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zT3B0aW9ucyk6IFtudW1iZXIsIG51bWJlcl0ge1xuICAgIC8vIENhbGN1bGF0ZSB0aGUgc3F1YXJlIHJvb3Qgb2YgblxuICAgIGNvbnN0IHNxcnQgPSBNYXRoLnNxcnQobik7XG5cbiAgICAvLyBJbml0aWFsaXplIGNvbHVtbnMgYmFzZWQgb24gdGhlIGZsb29yIG9mIHRoZSBzcXVhcmUgcm9vdFxuICAgIGxldCBjb2xzID0gTWF0aC5mbG9vcihzcXJ0KTtcblxuICAgIC8vIENhbGN1bGF0ZSB0aGUgbnVtYmVyIG9mIHJvd3MgbmVlZGVkIHRvIGRpc3BsYXkgbiB2aWRlb3NcbiAgICBsZXQgcm93cyA9IE1hdGguY2VpbChuIC8gY29scyk7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIHByb2R1Y3Qgb2Ygcm93cyBhbmQgY29sdW1uc1xuICAgIGxldCBwcm9kID0gcm93cyAqIGNvbHM7XG5cbiAgICAvLyBBZGp1c3Qgcm93cyBhbmQgY29sdW1ucyB1bnRpbCB0aGUgcHJvZHVjdCBpcyBncmVhdGVyIHRoYW4gb3IgZXF1YWwgdG8gblxuICAgIHdoaWxlIChwcm9kIDwgbikge1xuICAgICAgaWYgKGNvbHMgPCByb3dzKSB7XG4gICAgICAgIGNvbHMrKztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvd3MrKztcbiAgICAgIH1cbiAgICAgIHByb2QgPSByb3dzICogY29scztcbiAgICB9XG5cbiAgICAvLyBSZXR1cm4gYW4gYXJyYXkgd2l0aCB0aGUgY2FsY3VsYXRlZCBudW1iZXIgb2Ygcm93cyBhbmQgY29sdW1uc1xuICAgIHJldHVybiBbcm93cywgY29sc107XG4gIH1cbn1cbiJdfQ==