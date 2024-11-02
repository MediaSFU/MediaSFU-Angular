import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
    async updateMiniCardsGrid({ rows, cols, defal = true, actualRows = 2, parameters, }) {
        let { getUpdatedAllParams } = parameters;
        parameters = getUpdatedAllParams();
        let { updateGridRows, updateGridCols, updateAltGridRows, updateAltGridCols, updateGridSizes, gridSizes, paginationDirection, paginationHeightWidth, doPaginate, componentSizes, eventType, } = parameters;
        let containerWidth = componentSizes.otherWidth;
        let containerHeight = componentSizes.otherHeight;
        if (doPaginate) {
            // if pagination is enabled and direction is horizontal
            if (paginationDirection == 'horizontal') {
                containerHeight = containerHeight - paginationHeightWidth;
            }
            else {
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
        }
        else {
            cardWidth = Math.floor((containerWidth - totalSpacingHorizontal) / cols);
            cardHeight = Math.floor((containerHeight - totalSpacingVertical) / actualRows);
        }
        if (defal) {
            updateGridRows(rows);
            updateGridCols(cols);
            gridSizes = { ...gridSizes, gridWidth: cardWidth, gridHeight: cardHeight };
            updateGridSizes(gridSizes);
        }
        else {
            updateAltGridRows(rows);
            updateAltGridCols(cols);
            gridSizes = { ...gridSizes, altGridWidth: cardWidth, altGridHeight: cardHeight };
            updateGridSizes(gridSizes);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateMiniCardsGrid, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateMiniCardsGrid, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: UpdateMiniCardsGrid, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLW1pbmktY2FyZHMtZ3JpZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy91cGRhdGUtbWluaS1jYXJkcy1ncmlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUE4QjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFERztBQU1ILE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BdUJHO0lBQ0gsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQ3hCLElBQUksRUFDSixJQUFJLEVBQ0osS0FBSyxHQUFHLElBQUksRUFDWixVQUFVLEdBQUcsQ0FBQyxFQUNkLFVBQVUsR0FDaUI7UUFDM0IsSUFBSSxFQUFFLG1CQUFtQixFQUFFLEdBQUcsVUFBVSxDQUFDO1FBQ3pDLFVBQVUsR0FBRyxtQkFBbUIsRUFBRSxDQUFDO1FBRW5DLElBQUksRUFDRixjQUFjLEVBQ2QsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixpQkFBaUIsRUFDakIsZUFBZSxFQUVmLFNBQVMsRUFDVCxtQkFBbUIsRUFDbkIscUJBQXFCLEVBQ3JCLFVBQVUsRUFDVixjQUFjLEVBQ2QsU0FBUyxHQUNWLEdBQUcsVUFBVSxDQUFDO1FBRWYsSUFBSSxjQUFjLEdBQUcsY0FBYyxDQUFDLFVBQVUsQ0FBQztRQUMvQyxJQUFJLGVBQWUsR0FBRyxjQUFjLENBQUMsV0FBVyxDQUFDO1FBRWpELElBQUksVUFBVSxFQUFFLENBQUM7WUFDZix1REFBdUQ7WUFDdkQsSUFBSSxtQkFBbUIsSUFBSSxZQUFZLEVBQUUsQ0FBQztnQkFDeEMsZUFBZSxHQUFHLGVBQWUsR0FBRyxxQkFBcUIsQ0FBQztZQUM1RCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sY0FBYyxHQUFHLGNBQWMsR0FBRyxxQkFBcUIsQ0FBQztZQUMxRCxDQUFDO1FBQ0gsQ0FBQztRQUVELElBQUksV0FBVyxHQUFHLENBQUMsQ0FBQyxDQUFDLDJCQUEyQjtRQUNoRCxJQUFJLFNBQVMsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUN4QixXQUFXLEdBQUcsQ0FBQyxDQUFDO1FBQ2xCLENBQUM7UUFDRCxJQUFJLHNCQUFzQixHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztRQUN0RCxJQUFJLG9CQUFvQixHQUFHLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztRQUMxRCxJQUFJLFNBQVMsQ0FBQztRQUNkLElBQUksVUFBVSxDQUFDO1FBQ2YsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLFVBQVUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNqQyxTQUFTLEdBQUcsQ0FBQyxDQUFDO1lBQ2QsVUFBVSxHQUFHLENBQUMsQ0FBQztRQUNqQixDQUFDO2FBQU0sQ0FBQztZQUNOLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsY0FBYyxHQUFHLHNCQUFzQixDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDekUsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxlQUFlLEdBQUcsb0JBQW9CLENBQUMsR0FBRyxVQUFVLENBQUMsQ0FBQztRQUNqRixDQUFDO1FBRUQsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUNWLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQixjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFckIsU0FBUyxHQUFHLEVBQUUsR0FBRyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsVUFBVSxFQUFFLENBQUM7WUFDM0UsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdCLENBQUM7YUFBTSxDQUFDO1lBQ04saUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDeEIsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFeEIsU0FBUyxHQUFHLEVBQUUsR0FBRyxTQUFTLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLENBQUM7WUFDakYsZUFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQzdCLENBQUM7SUFDSCxDQUFDO3VHQTNGVSxtQkFBbUI7MkdBQW5CLG1CQUFtQixjQUZsQixNQUFNOzsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgR3JpZFNpemVzLCBDb21wb25lbnRTaXplcywgRXZlbnRUeXBlIH0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlTWluaUNhcmRzR3JpZFBhcmFtZXRlcnMge1xuICB1cGRhdGVHcmlkUm93czogKHJvd3M6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlR3JpZENvbHM6IChjb2xzOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZUFsdEdyaWRSb3dzOiAocm93czogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVBbHRHcmlkQ29sczogKGNvbHM6IG51bWJlcikgPT4gdm9pZDtcbiAgdXBkYXRlR3JpZFNpemVzOiAoZ3JpZFNpemVzOiBHcmlkU2l6ZXMpID0+IHZvaWQ7XG4gIGdyaWRTaXplczogR3JpZFNpemVzO1xuICBwYWdpbmF0aW9uRGlyZWN0aW9uOiBzdHJpbmc7XG4gIHBhZ2luYXRpb25IZWlnaHRXaWR0aDogbnVtYmVyO1xuICBkb1BhZ2luYXRlOiBib29sZWFuO1xuICBjb21wb25lbnRTaXplczogQ29tcG9uZW50U2l6ZXM7XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFVwZGF0ZU1pbmlDYXJkc0dyaWRQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVXBkYXRlTWluaUNhcmRzR3JpZE9wdGlvbnMge1xuICByb3dzOiBudW1iZXI7XG4gIGNvbHM6IG51bWJlcjtcbiAgZGVmYWw/OiBib29sZWFuO1xuICBhY3R1YWxSb3dzPzogbnVtYmVyO1xuICBwYXJhbWV0ZXJzOiBVcGRhdGVNaW5pQ2FyZHNHcmlkUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgVXBkYXRlTWluaUNhcmRzR3JpZFR5cGUgPSAob3B0aW9uczogVXBkYXRlTWluaUNhcmRzR3JpZE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogVXBkYXRlcyB0aGUgbWluaSBjYXJkcyBncmlkIGJhc2VkIG9uIHRoZSBzcGVjaWZpZWQgcm93cyBhbmQgY29sdW1ucy5cbiAqXG4gKiBUaGlzIG1ldGhvZCBjYWxjdWxhdGVzIHRoZSBkaW1lbnNpb25zIGZvciB0aGUgbWluaSBjYXJkcyBiYXNlZCBvbiB0aGUgcHJvdmlkZWRcbiAqIHJvd3MgYW5kIGNvbHVtbnMsIGFzIHdlbGwgYXMgdGhlIGNvbnRhaW5lciBzaXplcy4gSXQgYWxzbyBjb25zaWRlcnMgcGFnaW5hdGlvblxuICogc2V0dGluZ3MgYW5kIHVwZGF0ZXMgdGhlIGdyaWQgc2l6ZXMgYWNjb3JkaW5nbHkuIFRoZSBtZXRob2QgY2FuIHVwZGF0ZSBlaXRoZXJcbiAqIHRoZSBkZWZhdWx0IGdyaWQgb3IgYW4gYWx0ZXJuYXRpdmUgZ3JpZCBiYXNlZCBvbiB0aGUgYGRlZmFsYCBwYXJhbWV0ZXIuXG4gKlxuICogQHBhcmFtIHtVcGRhdGVNaW5pQ2FyZHNHcmlkT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB1cGRhdGluZyB0aGUgbWluaSBjYXJkcyBncmlkLlxuICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucm93cyAtIFRoZSBudW1iZXIgb2Ygcm93cyBpbiB0aGUgZ3JpZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmNvbHMgLSBUaGUgbnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIGdyaWQuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLmRlZmFsPXRydWVdIC0gRmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgdG8gdXBkYXRlIHRoZSBkZWZhdWx0IGdyaWQgb3IgYW4gYWx0ZXJuYXRpdmUgZ3JpZC5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5hY3R1YWxSb3dzPTJdIC0gVGhlIGFjdHVhbCBudW1iZXIgb2Ygcm93cyBpbiB0aGUgZ3JpZC5cbiAqIEBwYXJhbSB7VXBkYXRlTWluaUNhcmRzR3JpZFBhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIEFkZGl0aW9uYWwgcGFyYW1ldGVycyBuZWVkZWQgZm9yIHRoZSBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zIC0gRnVuY3Rpb24gdG8gZ2V0IHVwZGF0ZWQgcGFyYW1ldGVycy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVHcmlkUm93cyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZ3JpZCByb3dzLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUdyaWRDb2xzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBncmlkIGNvbHVtbnMuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlQWx0R3JpZFJvd3MgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGFsdGVybmF0aXZlIGdyaWQgcm93cy5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVBbHRHcmlkQ29scyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYWx0ZXJuYXRpdmUgZ3JpZCBjb2x1bW5zLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUdyaWRTaXplcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZ3JpZCBzaXplcy5cbiAqIEBwYXJhbSB7R3JpZFNpemVzfSBvcHRpb25zLnBhcmFtZXRlcnMuZ3JpZFNpemVzIC0gT2JqZWN0IGNvbnRhaW5pbmcgZ3JpZCB3aWR0aCBhbmQgaGVpZ2h0LlxuICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5wYWdpbmF0aW9uRGlyZWN0aW9uIC0gVGhlIGRpcmVjdGlvbiBvZiBwYWdpbmF0aW9uICgnaG9yaXpvbnRhbCcgb3IgJ3ZlcnRpY2FsJykuXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnBhZ2luYXRpb25IZWlnaHRXaWR0aCAtIFRoZSBoZWlnaHQgb3Igd2lkdGggb2YgcGFnaW5hdGlvbi5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmRvUGFnaW5hdGUgLSBGbGFnIGluZGljYXRpbmcgd2hldGhlciBwYWdpbmF0aW9uIGlzIGVuYWJsZWQuXG4gKiBAcGFyYW0ge0NvbXBvbmVudFNpemVzfSBvcHRpb25zLnBhcmFtZXRlcnMuY29tcG9uZW50U2l6ZXMgLSBPYmplY3QgY29udGFpbmluZyBjb250YWluZXIgd2lkdGggYW5kIGhlaWdodC5cbiAqIEBwYXJhbSB7RXZlbnRUeXBlfSBvcHRpb25zLnBhcmFtZXRlcnMuZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgKCdjaGF0JywgZXRjLikuXG4gKlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IC0gQSBQcm9taXNlIHRoYXQgcmVzb2x2ZXMgYWZ0ZXIgdXBkYXRpbmcgdGhlIG1pbmkgY2FyZHMgZ3JpZC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3QgZ3JpZE9wdGlvbnMgPSB7XG4gKiAgIHJvd3M6IDMsXG4gKiAgIGNvbHM6IDQsXG4gKiAgIHBhcmFtZXRlcnM6IHtcbiAqICAgICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiB1cGRhdGVkUGFyYW1zLFxuICogICAgIHVwZGF0ZUdyaWRSb3dzOiAocm93cykgPT4gY29uc29sZS5sb2coYEdyaWQgUm93cyBVcGRhdGVkOiAke3Jvd3N9YCksXG4gKiAgICAgdXBkYXRlR3JpZENvbHM6IChjb2xzKSA9PiBjb25zb2xlLmxvZyhgR3JpZCBDb2xzIFVwZGF0ZWQ6ICR7Y29sc31gKSxcbiAqICAgICB1cGRhdGVBbHRHcmlkUm93czogKHJvd3MpID0+IGNvbnNvbGUubG9nKGBBbHQgR3JpZCBSb3dzIFVwZGF0ZWQ6ICR7cm93c31gKSxcbiAqICAgICB1cGRhdGVBbHRHcmlkQ29sczogKGNvbHMpID0+IGNvbnNvbGUubG9nKGBBbHQgR3JpZCBDb2xzIFVwZGF0ZWQ6ICR7Y29sc31gKSxcbiAqICAgICB1cGRhdGVHcmlkU2l6ZXM6IChzaXplcykgPT4gY29uc29sZS5sb2coYEdyaWQgU2l6ZXMgVXBkYXRlZDogJHtKU09OLnN0cmluZ2lmeShzaXplcyl9YCksXG4gKiAgICAgZ3JpZFNpemVzOiB7IGdyaWRXaWR0aDogMTAwLCBncmlkSGVpZ2h0OiAxMDAgfSxcbiAqICAgICBwYWdpbmF0aW9uRGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcsXG4gKiAgICAgcGFnaW5hdGlvbkhlaWdodFdpZHRoOiA1MCxcbiAqICAgICBkb1BhZ2luYXRlOiB0cnVlLFxuICogICAgIGNvbXBvbmVudFNpemVzOiB7IG90aGVyV2lkdGg6IDgwMCwgb3RoZXJIZWlnaHQ6IDYwMCB9LFxuICogICAgIGV2ZW50VHlwZTogJ2NoYXQnLFxuICogICB9LFxuICogfTtcbiAqXG4gKiBjb25zdCBtaW5pQ2FyZEdyaWRTZXJ2aWNlID0gbmV3IFVwZGF0ZU1pbmlDYXJkc0dyaWQoKTtcbiAqIG1pbmlDYXJkR3JpZFNlcnZpY2UudXBkYXRlTWluaUNhcmRzR3JpZChncmlkT3B0aW9ucyk7XG4gKiBgYGBcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBVcGRhdGVNaW5pQ2FyZHNHcmlkIHtcbiAgLyoqXG4gICAqIFVwZGF0ZXMgdGhlIG1pbmkgY2FyZHMgZ3JpZCBiYXNlZCBvbiB0aGUgc3BlY2lmaWVkIHJvd3MgYW5kIGNvbHVtbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7b2JqZWN0fSBvcHRpb25zIC0gVGhlIGZ1bmN0aW9uIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnJvd3MgLSBUaGUgbnVtYmVyIG9mIHJvd3MgaW4gdGhlIGdyaWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmNvbHMgLSBUaGUgbnVtYmVyIG9mIGNvbHVtbnMgaW4gdGhlIGdyaWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5kZWZhbCAtIEZsYWcgaW5kaWNhdGluZyB3aGV0aGVyIHRvIHVwZGF0ZSB0aGUgZGVmYXVsdCBncmlkIG9yIGFuIGFsdGVybmF0aXZlIGdyaWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLmFjdHVhbFJvd3MgLSBUaGUgYWN0dWFsIG51bWJlciBvZiByb3dzIGluIHRoZSBncmlkLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5pbmQgLSBUaGUgaW5kZXggcGFyYW1ldGVyLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gQWRkaXRpb25hbCBwYXJhbWV0ZXJzIG5lZWRlZCBmb3IgdGhlIGZ1bmN0aW9uLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcyAtIEZ1bmN0aW9uIHRvIGdldCB1cGRhdGVkIHBhcmFtZXRlcnMuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVHcmlkUm93cyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZ3JpZCByb3dzLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlR3JpZENvbHMgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGdyaWQgY29sdW1ucy5cbiAgICogQHBhcmFtIHtmdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUFsdEdyaWRSb3dzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBhbHRlcm5hdGl2ZSBncmlkIHJvd3MuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVBbHRHcmlkQ29scyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgYWx0ZXJuYXRpdmUgZ3JpZCBjb2x1bW5zLlxuICAgKiBAcGFyYW0ge2Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlR3JpZFNpemVzIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBncmlkIHNpemVzLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLmdyaWRTaXplcyAtIE9iamVjdCBjb250YWluaW5nIGdyaWQgd2lkdGggYW5kIGhlaWdodC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5wYWdpbmF0aW9uRGlyZWN0aW9uIC0gVGhlIGRpcmVjdGlvbiBvZiBwYWdpbmF0aW9uICgnaG9yaXpvbnRhbCcgb3IgJ3ZlcnRpY2FsJykuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMucGFnaW5hdGlvbkhlaWdodFdpZHRoIC0gVGhlIGhlaWdodCBvciB3aWR0aCBvZiBwYWdpbmF0aW9uLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5kb1BhZ2luYXRlIC0gRmxhZyBpbmRpY2F0aW5nIHdoZXRoZXIgcGFnaW5hdGlvbiBpcyBlbmFibGVkLlxuICAgKiBAcGFyYW0ge29iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzLmNvbXBvbmVudFNpemVzIC0gT2JqZWN0IGNvbnRhaW5pbmcgY29udGFpbmVyIHdpZHRoIGFuZCBoZWlnaHQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBhcmFtZXRlcnMuZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgKCdjaGF0JywgZXRjLikuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSAtIEEgUHJvbWlzZSB0aGF0IHJlc29sdmVzIGFmdGVyIHVwZGF0aW5nIHRoZSBtaW5pIGNhcmRzIGdyaWQuXG4gICAqL1xuICBhc3luYyB1cGRhdGVNaW5pQ2FyZHNHcmlkKHtcbiAgICByb3dzLFxuICAgIGNvbHMsXG4gICAgZGVmYWwgPSB0cnVlLFxuICAgIGFjdHVhbFJvd3MgPSAyLFxuICAgIHBhcmFtZXRlcnMsXG4gIH06IFVwZGF0ZU1pbmlDYXJkc0dyaWRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHsgZ2V0VXBkYXRlZEFsbFBhcmFtcyB9ID0gcGFyYW1ldGVycztcbiAgICBwYXJhbWV0ZXJzID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgbGV0IHtcbiAgICAgIHVwZGF0ZUdyaWRSb3dzLFxuICAgICAgdXBkYXRlR3JpZENvbHMsXG4gICAgICB1cGRhdGVBbHRHcmlkUm93cyxcbiAgICAgIHVwZGF0ZUFsdEdyaWRDb2xzLFxuICAgICAgdXBkYXRlR3JpZFNpemVzLFxuXG4gICAgICBncmlkU2l6ZXMsXG4gICAgICBwYWdpbmF0aW9uRGlyZWN0aW9uLFxuICAgICAgcGFnaW5hdGlvbkhlaWdodFdpZHRoLFxuICAgICAgZG9QYWdpbmF0ZSxcbiAgICAgIGNvbXBvbmVudFNpemVzLFxuICAgICAgZXZlbnRUeXBlLFxuICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgbGV0IGNvbnRhaW5lcldpZHRoID0gY29tcG9uZW50U2l6ZXMub3RoZXJXaWR0aDtcbiAgICBsZXQgY29udGFpbmVySGVpZ2h0ID0gY29tcG9uZW50U2l6ZXMub3RoZXJIZWlnaHQ7XG5cbiAgICBpZiAoZG9QYWdpbmF0ZSkge1xuICAgICAgLy8gaWYgcGFnaW5hdGlvbiBpcyBlbmFibGVkIGFuZCBkaXJlY3Rpb24gaXMgaG9yaXpvbnRhbFxuICAgICAgaWYgKHBhZ2luYXRpb25EaXJlY3Rpb24gPT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgIGNvbnRhaW5lckhlaWdodCA9IGNvbnRhaW5lckhlaWdodCAtIHBhZ2luYXRpb25IZWlnaHRXaWR0aDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRhaW5lcldpZHRoID0gY29udGFpbmVyV2lkdGggLSBwYWdpbmF0aW9uSGVpZ2h0V2lkdGg7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbGV0IGNhcmRTcGFjaW5nID0gMzsgLy8gM3B4IG1hcmdpbiBiZXR3ZWVuIGNhcmRzXG4gICAgaWYgKGV2ZW50VHlwZSA9PSAnY2hhdCcpIHtcbiAgICAgIGNhcmRTcGFjaW5nID0gMDtcbiAgICB9XG4gICAgbGV0IHRvdGFsU3BhY2luZ0hvcml6b250YWwgPSAoY29scyAtIDEpICogY2FyZFNwYWNpbmc7XG4gICAgbGV0IHRvdGFsU3BhY2luZ1ZlcnRpY2FsID0gKGFjdHVhbFJvd3MgLSAxKSAqIGNhcmRTcGFjaW5nO1xuICAgIGxldCBjYXJkV2lkdGg7XG4gICAgbGV0IGNhcmRIZWlnaHQ7XG4gICAgaWYgKGNvbHMgPT0gMCB8fCBhY3R1YWxSb3dzID09IDApIHtcbiAgICAgIGNhcmRXaWR0aCA9IDA7XG4gICAgICBjYXJkSGVpZ2h0ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgY2FyZFdpZHRoID0gTWF0aC5mbG9vcigoY29udGFpbmVyV2lkdGggLSB0b3RhbFNwYWNpbmdIb3Jpem9udGFsKSAvIGNvbHMpO1xuICAgICAgY2FyZEhlaWdodCA9IE1hdGguZmxvb3IoKGNvbnRhaW5lckhlaWdodCAtIHRvdGFsU3BhY2luZ1ZlcnRpY2FsKSAvIGFjdHVhbFJvd3MpO1xuICAgIH1cblxuICAgIGlmIChkZWZhbCkge1xuICAgICAgdXBkYXRlR3JpZFJvd3Mocm93cyk7XG4gICAgICB1cGRhdGVHcmlkQ29scyhjb2xzKTtcblxuICAgICAgZ3JpZFNpemVzID0geyAuLi5ncmlkU2l6ZXMsIGdyaWRXaWR0aDogY2FyZFdpZHRoLCBncmlkSGVpZ2h0OiBjYXJkSGVpZ2h0IH07XG4gICAgICB1cGRhdGVHcmlkU2l6ZXMoZ3JpZFNpemVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdXBkYXRlQWx0R3JpZFJvd3Mocm93cyk7XG4gICAgICB1cGRhdGVBbHRHcmlkQ29scyhjb2xzKTtcblxuICAgICAgZ3JpZFNpemVzID0geyAuLi5ncmlkU2l6ZXMsIGFsdEdyaWRXaWR0aDogY2FyZFdpZHRoLCBhbHRHcmlkSGVpZ2h0OiBjYXJkSGVpZ2h0IH07XG4gICAgICB1cGRhdGVHcmlkU2l6ZXMoZ3JpZFNpemVzKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==