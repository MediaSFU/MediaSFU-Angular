import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
export class CheckGrid {
    async checkGrid({ rows, cols, actives, }) {
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
                    }
                    else {
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
            }
            else {
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
        }
        catch (error) {
            console.log('checkGrid error', error);
            throw error;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CheckGrid, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CheckGrid, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CheckGrid, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stZ3JpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jaGVjay1ncmlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFZekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0ErQkc7QUFLTCxNQUFNLE9BQU8sU0FBUztJQUVwQixLQUFLLENBQUMsU0FBUyxDQUFDLEVBQ2QsSUFBSSxFQUNKLElBQUksRUFDSixPQUFPLEdBQ1U7UUFDakIsSUFBSSxDQUFDO1lBQ0gsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDaEIsSUFBSSxXQUFXLEdBQUcsQ0FBQyxDQUFDO1lBQ3BCLElBQUksZUFBZSxHQUFHLENBQUMsQ0FBQztZQUN4QixJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7WUFDakIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLElBQUksYUFBYSxHQUFHLEtBQUssQ0FBQztZQUUxQixJQUFJLElBQUksR0FBRyxJQUFJLEtBQUssT0FBTyxFQUFFLENBQUM7Z0JBQzVCLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxPQUFPLEVBQUUsQ0FBQztvQkFDMUIsTUFBTSxHQUFHLEdBQUcsT0FBTyxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztvQkFDeEMsSUFBSSxJQUFJLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDO3dCQUNyQixPQUFPLEdBQUcsSUFBSSxDQUFDO3dCQUNmLFdBQVcsR0FBRyxHQUFHLENBQUM7d0JBQ2xCLGVBQWUsR0FBRyxXQUFXLENBQUM7b0JBQ2hDLENBQUM7eUJBQU0sQ0FBQzt3QkFDTixXQUFXLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQzt3QkFDekIsT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUM7d0JBQ25CLGVBQWUsR0FBRyxXQUFXLENBQUM7b0JBQ2hDLENBQUM7b0JBRUQsT0FBTyxHQUFHLE9BQU8sR0FBRyxDQUFDLENBQUM7b0JBQ3RCLE9BQU8sR0FBRyxJQUFJLENBQUM7b0JBQ2YsUUFBUSxHQUFHLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxHQUFHLE9BQU8sQ0FBQztvQkFDbkMsVUFBVSxHQUFHLE9BQU8sQ0FBQztvQkFFckIsYUFBYSxHQUFHLEtBQUssQ0FBQztnQkFDeEIsQ0FBQztZQUNILENBQUM7aUJBQU0sQ0FBQztnQkFDTixjQUFjO2dCQUNkLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ2YsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDZixPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNmLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ25CLGVBQWUsR0FBRyxDQUFDLENBQUM7Z0JBQ3BCLFFBQVEsR0FBRyxPQUFPLEdBQUcsT0FBTyxDQUFDO2dCQUM3QixVQUFVLEdBQUcsT0FBTyxDQUFDO2dCQUNyQixhQUFhLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLENBQUM7WUFFRCxPQUFPLENBQUMsYUFBYSxFQUFFLFFBQVEsRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFDL0YsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7dUdBdERVLFNBQVM7MkdBQVQsU0FBUyxjQUZSLE1BQU07OzJGQUVQLFNBQVM7a0JBSHJCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIENoZWNrR3JpZE9wdGlvbnMge1xuICByb3dzOiBudW1iZXI7XG4gIGNvbHM6IG51bWJlcjtcbiAgYWN0aXZlczogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBDaGVja0dyaWRUeXBlID0gKFxuICBvcHRpb25zOiBDaGVja0dyaWRPcHRpb25zLFxuKSA9PiBQcm9taXNlPFtib29sZWFuLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyXSB8IHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIGdyaWQgY29uZmlndXJhdGlvbiBhbmQgY2FsY3VsYXRlcyB2YXJpb3VzIHBhcmFtZXRlcnMgYmFzZWQgb24gdGhlIG51bWJlciBvZiByb3dzLCBjb2x1bW5zLCBhbmQgYWN0aXZlIGVsZW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0NoZWNrR3JpZE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY2hlY2tpbmcgdGhlIGdyaWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnJvd3MgLSBUaGUgbnVtYmVyIG9mIHJvd3MgaW4gdGhlIGdyaWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmNvbHMgLSBUaGUgbnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIGdyaWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmFjdGl2ZXMgLSBUaGUgbnVtYmVyIG9mIGFjdGl2ZSBlbGVtZW50cyBpbiB0aGUgZ3JpZC5cbiAgICogQHJldHVybnMge1Byb21pc2U8W2Jvb2xlYW4sIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHwgdm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdHVwbGUgY29udGFpbmluZzpcbiAgICogLSBgcmVtb3ZlQWx0R3JpZGAgKGJvb2xlYW4pOiBJbmRpY2F0ZXMgd2hldGhlciB0byByZW1vdmUgdGhlIGFsdGVybmF0ZSBncmlkLlxuICAgKiAtIGBudW10b2FkZGAgKG51bWJlcik6IFRoZSBudW1iZXIgb2YgZWxlbWVudHMgdG8gYWRkLlxuICAgKiAtIGBudW1Sb3dzYCAobnVtYmVyKTogVGhlIG51bWJlciBvZiByb3dzLlxuICAgKiAtIGBudW1Db2xzYCAobnVtYmVyKTogVGhlIG51bWJlciBvZiBjb2x1bW5zLlxuICAgKiAtIGByZW1haW5pbmdWaWRlb3NgIChudW1iZXIpOiBUaGUgbnVtYmVyIG9mIHJlbWFpbmluZyB2aWRlb3MuXG4gICAqIC0gYGFjdHVhbFJvd3NgIChudW1iZXIpOiBUaGUgYWN0dWFsIG51bWJlciBvZiByb3dzLlxuICAgKiAtIGBsYXN0cm93Y29sc2AgKG51bWJlcik6IFRoZSBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgbGFzdCByb3cuXG4gICAqXG4gICAqIElmIGFuIGVycm9yIG9jY3VycywgaXQgbG9ncyB0aGUgZXJyb3IgdG8gdGhlIGNvbnNvbGUuXG4gICAqXG4gICAqICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAqICAgcm93czogMyxcbiAgICogICBjb2xzOiA0LFxuICAgKiAgIGFjdGl2ZXM6IDEwLFxuICAgKiB9O1xuICAgKlxuICAgKiBjb25zdCByZXN1bHQgPSBhd2FpdCBjaGVja0dyaWRTZXJ2aWNlLmNoZWNrR3JpZChvcHRpb25zKTtcbiAgICogY29uc29sZS5sb2cocmVzdWx0KTtcbiAgICogLy8gT3V0cHV0IGNvdWxkIGJlOiBbZmFsc2UsIDIsIDMsIDQsIDIsIDMsIDJdXG4gICAqIGBgYFxuICAgKi9cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrR3JpZCB7XG5cbiAgYXN5bmMgY2hlY2tHcmlkKHtcbiAgICByb3dzLFxuICAgIGNvbHMsXG4gICAgYWN0aXZlcyxcbiAgfTogQ2hlY2tHcmlkT3B0aW9ucyk6IFByb21pc2U8W2Jvb2xlYW4sIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHwgdm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBsZXQgbnVtUm93cyA9IDA7XG4gICAgICBsZXQgbnVtQ29scyA9IDA7XG4gICAgICBsZXQgbGFzdHJvdyA9IDA7XG4gICAgICBsZXQgbGFzdHJvd2NvbHMgPSAwO1xuICAgICAgbGV0IHJlbWFpbmluZ1ZpZGVvcyA9IDA7XG4gICAgICBsZXQgbnVtdG9hZGQgPSAwO1xuICAgICAgbGV0IGFjdHVhbFJvd3MgPSAwO1xuICAgICAgbGV0IHJlbW92ZUFsdEdyaWQgPSBmYWxzZTtcblxuICAgICAgaWYgKHJvd3MgKiBjb2xzICE9PSBhY3RpdmVzKSB7XG4gICAgICAgIGlmIChyb3dzICogY29scyA+IGFjdGl2ZXMpIHtcbiAgICAgICAgICBjb25zdCByZXMgPSBhY3RpdmVzIC0gKHJvd3MgLSAxKSAqIGNvbHM7XG4gICAgICAgICAgaWYgKGNvbHMgKiAwLjUgPCByZXMpIHtcbiAgICAgICAgICAgIGxhc3Ryb3cgPSByb3dzO1xuICAgICAgICAgICAgbGFzdHJvd2NvbHMgPSByZXM7XG4gICAgICAgICAgICByZW1haW5pbmdWaWRlb3MgPSBsYXN0cm93Y29scztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbGFzdHJvd2NvbHMgPSByZXMgKyBjb2xzO1xuICAgICAgICAgICAgbGFzdHJvdyA9IHJvd3MgLSAxO1xuICAgICAgICAgICAgcmVtYWluaW5nVmlkZW9zID0gbGFzdHJvd2NvbHM7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbnVtUm93cyA9IGxhc3Ryb3cgLSAxO1xuICAgICAgICAgIG51bUNvbHMgPSBjb2xzO1xuICAgICAgICAgIG51bXRvYWRkID0gKGxhc3Ryb3cgLSAxKSAqIG51bUNvbHM7XG4gICAgICAgICAgYWN0dWFsUm93cyA9IGxhc3Ryb3c7XG5cbiAgICAgICAgICByZW1vdmVBbHRHcmlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIFBlcmZlY3QgZml0XG4gICAgICAgIG51bUNvbHMgPSBjb2xzO1xuICAgICAgICBudW1Sb3dzID0gcm93cztcbiAgICAgICAgbGFzdHJvdyA9IHJvd3M7XG4gICAgICAgIGxhc3Ryb3djb2xzID0gY29scztcbiAgICAgICAgcmVtYWluaW5nVmlkZW9zID0gMDtcbiAgICAgICAgbnVtdG9hZGQgPSBsYXN0cm93ICogbnVtQ29scztcbiAgICAgICAgYWN0dWFsUm93cyA9IGxhc3Ryb3c7XG4gICAgICAgIHJlbW92ZUFsdEdyaWQgPSB0cnVlO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW3JlbW92ZUFsdEdyaWQsIG51bXRvYWRkLCBudW1Sb3dzLCBudW1Db2xzLCByZW1haW5pbmdWaWRlb3MsIGFjdHVhbFJvd3MsIGxhc3Ryb3djb2xzXTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ2NoZWNrR3JpZCBlcnJvcicsIGVycm9yKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxufVxuIl19