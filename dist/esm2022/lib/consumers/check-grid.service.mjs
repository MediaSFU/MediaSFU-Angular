import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CheckGrid {
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
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2stZ3JpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy9jaGVjay1ncmlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFlM0MsTUFBTSxPQUFPLFNBQVM7SUFDcEI7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUNkLElBQUksRUFDSixJQUFJLEVBQ0osT0FBTyxHQUNVO1FBQ2pCLElBQUksQ0FBQztZQUNILElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQztZQUNoQixJQUFJLE9BQU8sR0FBRyxDQUFDLENBQUM7WUFDaEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDO1lBQ2hCLElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQztZQUNwQixJQUFJLGVBQWUsR0FBRyxDQUFDLENBQUM7WUFDeEIsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO1lBQ2pCLElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQztZQUNuQixJQUFJLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFFMUIsSUFBSSxJQUFJLEdBQUcsSUFBSSxLQUFLLE9BQU8sRUFBRSxDQUFDO2dCQUM1QixJQUFJLElBQUksR0FBRyxJQUFJLEdBQUcsT0FBTyxFQUFFLENBQUM7b0JBQzFCLE1BQU0sR0FBRyxHQUFHLE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7b0JBQ3hDLElBQUksSUFBSSxHQUFHLEdBQUcsR0FBRyxHQUFHLEVBQUUsQ0FBQzt3QkFDckIsT0FBTyxHQUFHLElBQUksQ0FBQzt3QkFDZixXQUFXLEdBQUcsR0FBRyxDQUFDO3dCQUNsQixlQUFlLEdBQUcsV0FBVyxDQUFDO29CQUNoQyxDQUFDO3lCQUFNLENBQUM7d0JBQ04sV0FBVyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7d0JBQ3pCLE9BQU8sR0FBRyxJQUFJLEdBQUcsQ0FBQyxDQUFDO3dCQUNuQixlQUFlLEdBQUcsV0FBVyxDQUFDO29CQUNoQyxDQUFDO29CQUVELE9BQU8sR0FBRyxPQUFPLEdBQUcsQ0FBQyxDQUFDO29CQUN0QixPQUFPLEdBQUcsSUFBSSxDQUFDO29CQUNmLFFBQVEsR0FBRyxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUM7b0JBQ25DLFVBQVUsR0FBRyxPQUFPLENBQUM7b0JBRXJCLGFBQWEsR0FBRyxLQUFLLENBQUM7Z0JBQ3hCLENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sY0FBYztnQkFDZCxPQUFPLEdBQUcsSUFBSSxDQUFDO2dCQUNmLE9BQU8sR0FBRyxJQUFJLENBQUM7Z0JBQ2YsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDZixXQUFXLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixlQUFlLEdBQUcsQ0FBQyxDQUFDO2dCQUNwQixRQUFRLEdBQUcsT0FBTyxHQUFHLE9BQU8sQ0FBQztnQkFDN0IsVUFBVSxHQUFHLE9BQU8sQ0FBQztnQkFDckIsYUFBYSxHQUFHLElBQUksQ0FBQztZQUN2QixDQUFDO1lBRUQsT0FBTyxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFLE9BQU8sRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQy9GLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN0QyxNQUFNLEtBQUssQ0FBQztRQUNkLENBQUM7SUFDSCxDQUFDO3VHQXZFVSxTQUFTOzJHQUFULFNBQVMsY0FGUixNQUFNOzsyRkFFUCxTQUFTO2tCQUhyQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBDaGVja0dyaWRPcHRpb25zIHtcbiAgcm93czogbnVtYmVyO1xuICBjb2xzOiBudW1iZXI7XG4gIGFjdGl2ZXM6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgQ2hlY2tHcmlkVHlwZSA9IChcbiAgb3B0aW9uczogQ2hlY2tHcmlkT3B0aW9ucyxcbikgPT4gUHJvbWlzZTxbYm9vbGVhbiwgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gfCB2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIENoZWNrR3JpZCB7XG4gIC8qKlxuICAgKiBDaGVja3MgdGhlIGdyaWQgY29uZmlndXJhdGlvbiBhbmQgY2FsY3VsYXRlcyB2YXJpb3VzIHBhcmFtZXRlcnMgYmFzZWQgb24gdGhlIG51bWJlciBvZiByb3dzLCBjb2x1bW5zLCBhbmQgYWN0aXZlIGVsZW1lbnRzLlxuICAgKlxuICAgKiBAcGFyYW0ge0NoZWNrR3JpZE9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY2hlY2tpbmcgdGhlIGdyaWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnJvd3MgLSBUaGUgbnVtYmVyIG9mIHJvd3MgaW4gdGhlIGdyaWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmNvbHMgLSBUaGUgbnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIGdyaWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmFjdGl2ZXMgLSBUaGUgbnVtYmVyIG9mIGFjdGl2ZSBlbGVtZW50cyBpbiB0aGUgZ3JpZC5cbiAgICogQHJldHVybnMge1Byb21pc2U8W2Jvb2xlYW4sIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXJdIHwgdm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGEgdHVwbGUgY29udGFpbmluZzpcbiAgICogLSBgcmVtb3ZlQWx0R3JpZGAgKGJvb2xlYW4pOiBJbmRpY2F0ZXMgd2hldGhlciB0byByZW1vdmUgdGhlIGFsdGVybmF0ZSBncmlkLlxuICAgKiAtIGBudW10b2FkZGAgKG51bWJlcik6IFRoZSBudW1iZXIgb2YgZWxlbWVudHMgdG8gYWRkLlxuICAgKiAtIGBudW1Sb3dzYCAobnVtYmVyKTogVGhlIG51bWJlciBvZiByb3dzLlxuICAgKiAtIGBudW1Db2xzYCAobnVtYmVyKTogVGhlIG51bWJlciBvZiBjb2x1bW5zLlxuICAgKiAtIGByZW1haW5pbmdWaWRlb3NgIChudW1iZXIpOiBUaGUgbnVtYmVyIG9mIHJlbWFpbmluZyB2aWRlb3MuXG4gICAqIC0gYGFjdHVhbFJvd3NgIChudW1iZXIpOiBUaGUgYWN0dWFsIG51bWJlciBvZiByb3dzLlxuICAgKiAtIGBsYXN0cm93Y29sc2AgKG51bWJlcik6IFRoZSBudW1iZXIgb2YgY29sdW1ucyBpbiB0aGUgbGFzdCByb3cuXG4gICAqXG4gICAqIElmIGFuIGVycm9yIG9jY3VycywgaXQgbG9ncyB0aGUgZXJyb3IgdG8gdGhlIGNvbnNvbGUuXG4gICAqL1xuICBhc3luYyBjaGVja0dyaWQoe1xuICAgIHJvd3MsXG4gICAgY29scyxcbiAgICBhY3RpdmVzLFxuICB9OiBDaGVja0dyaWRPcHRpb25zKTogUHJvbWlzZTxbYm9vbGVhbiwgbnVtYmVyLCBudW1iZXIsIG51bWJlciwgbnVtYmVyLCBudW1iZXIsIG51bWJlcl0gfCB2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBudW1Sb3dzID0gMDtcbiAgICAgIGxldCBudW1Db2xzID0gMDtcbiAgICAgIGxldCBsYXN0cm93ID0gMDtcbiAgICAgIGxldCBsYXN0cm93Y29scyA9IDA7XG4gICAgICBsZXQgcmVtYWluaW5nVmlkZW9zID0gMDtcbiAgICAgIGxldCBudW10b2FkZCA9IDA7XG4gICAgICBsZXQgYWN0dWFsUm93cyA9IDA7XG4gICAgICBsZXQgcmVtb3ZlQWx0R3JpZCA9IGZhbHNlO1xuXG4gICAgICBpZiAocm93cyAqIGNvbHMgIT09IGFjdGl2ZXMpIHtcbiAgICAgICAgaWYgKHJvd3MgKiBjb2xzID4gYWN0aXZlcykge1xuICAgICAgICAgIGNvbnN0IHJlcyA9IGFjdGl2ZXMgLSAocm93cyAtIDEpICogY29scztcbiAgICAgICAgICBpZiAoY29scyAqIDAuNSA8IHJlcykge1xuICAgICAgICAgICAgbGFzdHJvdyA9IHJvd3M7XG4gICAgICAgICAgICBsYXN0cm93Y29scyA9IHJlcztcbiAgICAgICAgICAgIHJlbWFpbmluZ1ZpZGVvcyA9IGxhc3Ryb3djb2xzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsYXN0cm93Y29scyA9IHJlcyArIGNvbHM7XG4gICAgICAgICAgICBsYXN0cm93ID0gcm93cyAtIDE7XG4gICAgICAgICAgICByZW1haW5pbmdWaWRlb3MgPSBsYXN0cm93Y29scztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBudW1Sb3dzID0gbGFzdHJvdyAtIDE7XG4gICAgICAgICAgbnVtQ29scyA9IGNvbHM7XG4gICAgICAgICAgbnVtdG9hZGQgPSAobGFzdHJvdyAtIDEpICogbnVtQ29scztcbiAgICAgICAgICBhY3R1YWxSb3dzID0gbGFzdHJvdztcblxuICAgICAgICAgIHJlbW92ZUFsdEdyaWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gUGVyZmVjdCBmaXRcbiAgICAgICAgbnVtQ29scyA9IGNvbHM7XG4gICAgICAgIG51bVJvd3MgPSByb3dzO1xuICAgICAgICBsYXN0cm93ID0gcm93cztcbiAgICAgICAgbGFzdHJvd2NvbHMgPSBjb2xzO1xuICAgICAgICByZW1haW5pbmdWaWRlb3MgPSAwO1xuICAgICAgICBudW10b2FkZCA9IGxhc3Ryb3cgKiBudW1Db2xzO1xuICAgICAgICBhY3R1YWxSb3dzID0gbGFzdHJvdztcbiAgICAgICAgcmVtb3ZlQWx0R3JpZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBbcmVtb3ZlQWx0R3JpZCwgbnVtdG9hZGQsIG51bVJvd3MsIG51bUNvbHMsIHJlbWFpbmluZ1ZpZGVvcywgYWN0dWFsUm93cywgbGFzdHJvd2NvbHNdO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zb2xlLmxvZygnY2hlY2tHcmlkIGVycm9yJywgZXJyb3IpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG4iXX0=