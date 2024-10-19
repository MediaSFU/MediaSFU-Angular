import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsY3VsYXRlLXJvd3MtYW5kLWNvbHVtbnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvY2FsY3VsYXRlLXJvd3MtYW5kLWNvbHVtbnMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWMzQyxNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDOzs7Ozs7T0FNRztJQUNILHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxFQUFrQztRQUMzRCxpQ0FBaUM7UUFDakMsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUUxQiwyREFBMkQ7UUFDM0QsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU1QiwwREFBMEQ7UUFDMUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFFL0IsNENBQTRDO1FBQzVDLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7UUFFdkIsMEVBQTBFO1FBQzFFLE9BQU8sSUFBSSxHQUFHLENBQUMsRUFBRSxDQUFDO1lBQ2hCLElBQUksSUFBSSxHQUFHLElBQUksRUFBRSxDQUFDO2dCQUNoQixJQUFJLEVBQUUsQ0FBQztZQUNULENBQUM7aUJBQU0sQ0FBQztnQkFDTixJQUFJLEVBQUUsQ0FBQztZQUNULENBQUM7WUFDRCxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNyQixDQUFDO1FBRUQsaUVBQWlFO1FBQ2pFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDdEIsQ0FBQzt1R0FqQ1UsdUJBQXVCOzJHQUF2Qix1QkFBdUIsY0FGdEIsTUFBTTs7MkZBRVAsdUJBQXVCO2tCQUhuQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBDYWxjdWxhdGVSb3dzQW5kQ29sdW1uc09wdGlvbnMge1xuICBuOiBudW1iZXI7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIENhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zVHlwZSA9IChcbiAgb3B0aW9uczogQ2FsY3VsYXRlUm93c0FuZENvbHVtbnNPcHRpb25zLFxuKSA9PiBbbnVtYmVyLCBudW1iZXJdO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ2FsY3VsYXRlUm93c0FuZENvbHVtbnMge1xuICAvKipcbiAgICogQ2FsY3VsYXRlcyB0aGUgbnVtYmVyIG9mIHJvd3MgYW5kIGNvbHVtbnMgbmVlZGVkIHRvIGRpc3BsYXkgYSBnaXZlbiBudW1iZXIgb2YgaXRlbXMgaW4gYSBncmlkLlxuICAgKlxuICAgKiBAcGFyYW0ge0NhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBjYWxjdWxhdGluZyByb3dzIGFuZCBjb2x1bW5zLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5uIC0gVGhlIG51bWJlciBvZiBpdGVtcyB0byBkaXNwbGF5LlxuICAgKiBAcmV0dXJucyB7W251bWJlciwgbnVtYmVyXX0gQSB0dXBsZSBjb250YWluaW5nIHRoZSBudW1iZXIgb2Ygcm93cyBhbmQgY29sdW1ucy5cbiAgICovXG4gIGNhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zKHsgbiB9OiBDYWxjdWxhdGVSb3dzQW5kQ29sdW1uc09wdGlvbnMpOiBbbnVtYmVyLCBudW1iZXJdIHtcbiAgICAvLyBDYWxjdWxhdGUgdGhlIHNxdWFyZSByb290IG9mIG5cbiAgICBjb25zdCBzcXJ0ID0gTWF0aC5zcXJ0KG4pO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSBjb2x1bW5zIGJhc2VkIG9uIHRoZSBmbG9vciBvZiB0aGUgc3F1YXJlIHJvb3RcbiAgICBsZXQgY29scyA9IE1hdGguZmxvb3Ioc3FydCk7XG5cbiAgICAvLyBDYWxjdWxhdGUgdGhlIG51bWJlciBvZiByb3dzIG5lZWRlZCB0byBkaXNwbGF5IG4gdmlkZW9zXG4gICAgbGV0IHJvd3MgPSBNYXRoLmNlaWwobiAvIGNvbHMpO1xuXG4gICAgLy8gQ2FsY3VsYXRlIHRoZSBwcm9kdWN0IG9mIHJvd3MgYW5kIGNvbHVtbnNcbiAgICBsZXQgcHJvZCA9IHJvd3MgKiBjb2xzO1xuXG4gICAgLy8gQWRqdXN0IHJvd3MgYW5kIGNvbHVtbnMgdW50aWwgdGhlIHByb2R1Y3QgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIG5cbiAgICB3aGlsZSAocHJvZCA8IG4pIHtcbiAgICAgIGlmIChjb2xzIDwgcm93cykge1xuICAgICAgICBjb2xzKys7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb3dzKys7XG4gICAgICB9XG4gICAgICBwcm9kID0gcm93cyAqIGNvbHM7XG4gICAgfVxuXG4gICAgLy8gUmV0dXJuIGFuIGFycmF5IHdpdGggdGhlIGNhbGN1bGF0ZWQgbnVtYmVyIG9mIHJvd3MgYW5kIGNvbHVtbnNcbiAgICByZXR1cm4gW3Jvd3MsIGNvbHNdO1xuICB9XG59XG4iXX0=