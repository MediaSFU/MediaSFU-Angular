// estimate.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class GetEstimate {
    /**
     * Estimates the number of rows and columns for a given set of parameters.
     *
     * @param {GetEstimateOptions} options - The options for the estimation.
     * @param {number} options.n - The number of items to estimate for.
     * @param {Object} options.parameters - The parameters for the estimation.
     * @param {number} options.parameters.fixedPageLimit - The fixed page limit.
     * @param {number} options.parameters.screenPageLimit - The screen page limit.
     * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
     * @param {boolean} options.parameters.shared - Indicates if sharing is active.
     * @param {string} options.parameters.eventType - The type of event (e.g., "chat", "conference").
     * @param {boolean} options.parameters.removeAltGrid - Indicates if the alternate grid should be removed.
     * @param {boolean} options.parameters.isWideScreen - Indicates if the screen is wide.
     * @param {boolean} options.parameters.isMediumScreen - Indicates if the screen is medium-sized.
     * @param {Function} options.parameters.updateRemoveAltGrid - Function to update the removeAltGrid parameter.
     * @param {Function} options.parameters.calculateRowsAndColumns - Function to calculate rows and columns.
     *
     * @returns {number[]} An array containing the estimated number of items, rows, and columns.
     *
     * @throws Will log an error message if an error occurs during estimation.
     */
    getEstimate({ n, parameters }) {
        try {
            // Destructure parameters
            let { fixedPageLimit, screenPageLimit, shareScreenStarted, shared, eventType, removeAltGrid, isWideScreen, isMediumScreen, updateRemoveAltGrid, 
            // mediaSfu functions
            calculateRowsAndColumns, } = parameters;
            // Calculate rows and columns
            const [rows, cols] = calculateRowsAndColumns({ n });
            // Check conditions for removing alt grid
            if (n < fixedPageLimit || ((shareScreenStarted || shared) && n < screenPageLimit + 1)) {
                removeAltGrid = true;
                updateRemoveAltGrid(removeAltGrid);
                // Return estimated values based on screen width
                if (!(isMediumScreen || isWideScreen)) {
                    return eventType === 'chat' ||
                        (eventType === 'conference' && !(shareScreenStarted || shared))
                        ? [n, n, 1]
                        : [n, 1, n];
                }
                else {
                    return eventType === 'chat' ||
                        (eventType === 'conference' && !(shareScreenStarted || shared))
                        ? [n, 1, n]
                        : [n, n, 1];
                }
            }
            return [rows * cols, rows, cols];
        }
        catch (error) {
            // Handle errors during estimation
            console.log('Error estimating rows and columns:', error.message);
            // throw error;
            return [0, 0, 0];
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GetEstimate, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GetEstimate, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GetEstimate, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWVzdGltYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2dldC1lc3RpbWF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNCQUFzQjtBQUN0QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWdDM0MsTUFBTSxPQUFPLFdBQVc7SUFDdEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bb0JHO0lBQ0gsV0FBVyxDQUFDLEVBQUUsQ0FBQyxFQUFFLFVBQVUsRUFBc0I7UUFDL0MsSUFBSSxDQUFDO1lBQ0gseUJBQXlCO1lBQ3pCLElBQUksRUFDRixjQUFjLEVBQ2QsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixNQUFNLEVBQ04sU0FBUyxFQUNULGFBQWEsRUFDYixZQUFZLEVBQ1osY0FBYyxFQUNkLG1CQUFtQjtZQUNuQixxQkFBcUI7WUFDckIsdUJBQXVCLEdBQ3hCLEdBQUcsVUFBVSxDQUFDO1lBRWYsNkJBQTZCO1lBQzdCLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsdUJBQXVCLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBRXBELHlDQUF5QztZQUN6QyxJQUFJLENBQUMsR0FBRyxjQUFjLElBQUksQ0FBQyxDQUFDLGtCQUFrQixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxlQUFlLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDdEYsYUFBYSxHQUFHLElBQUksQ0FBQztnQkFDckIsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBRW5DLGdEQUFnRDtnQkFDaEQsSUFBSSxDQUFDLENBQUMsY0FBYyxJQUFJLFlBQVksQ0FBQyxFQUFFLENBQUM7b0JBQ3RDLE9BQU8sU0FBUyxLQUFLLE1BQU07d0JBQ3pCLENBQUMsU0FBUyxLQUFLLFlBQVksSUFBSSxDQUFDLENBQUMsa0JBQWtCLElBQUksTUFBTSxDQUFDLENBQUM7d0JBQy9ELENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNYLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLENBQUM7cUJBQU0sQ0FBQztvQkFDTixPQUFPLFNBQVMsS0FBSyxNQUFNO3dCQUN6QixDQUFDLFNBQVMsS0FBSyxZQUFZLElBQUksQ0FBQyxDQUFDLGtCQUFrQixJQUFJLE1BQU0sQ0FBQyxDQUFDO3dCQUMvRCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDWCxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixDQUFDO1lBQ0gsQ0FBQztZQUVELE9BQU8sQ0FBQyxJQUFJLEdBQUcsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztZQUNwQixrQ0FBa0M7WUFDbEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQ0FBb0MsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDakUsZUFBZTtZQUNmLE9BQU8sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ25CLENBQUM7SUFDSCxDQUFDO3VHQXBFVSxXQUFXOzJHQUFYLFdBQVcsY0FGVixNQUFNOzsyRkFFUCxXQUFXO2tCQUh2QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbIi8vIGVzdGltYXRlLnNlcnZpY2UudHNcbmltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgQ2FsY3VsYXRlUm93c0FuZENvbHVtbnNUeXBlLCBFdmVudFR5cGUgfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEdldEVzdGltYXRlUGFyYW1ldGVycyB7XG4gIGZpeGVkUGFnZUxpbWl0OiBudW1iZXI7XG4gIHNjcmVlblBhZ2VMaW1pdDogbnVtYmVyO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHNoYXJlZD86IGJvb2xlYW47XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuICByZW1vdmVBbHRHcmlkOiBib29sZWFuO1xuICBpc1dpZGVTY3JlZW46IGJvb2xlYW47XG4gIGlzTWVkaXVtU2NyZWVuOiBib29sZWFuO1xuICB1cGRhdGVSZW1vdmVBbHRHcmlkOiAodmFsdWU6IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFTZnUgZnVuY3Rpb25zXG4gIGNhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zOiBDYWxjdWxhdGVSb3dzQW5kQ29sdW1uc1R5cGU7XG5cbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdldEVzdGltYXRlT3B0aW9ucyB7XG4gIG46IG51bWJlcjtcbiAgcGFyYW1ldGVyczogR2V0RXN0aW1hdGVQYXJhbWV0ZXJzO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBHZXRFc3RpbWF0ZVR5cGUgPSAob3B0aW9uczogR2V0RXN0aW1hdGVPcHRpb25zKSA9PiBbbnVtYmVyLCBudW1iZXIsIG51bWJlcl07XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBHZXRFc3RpbWF0ZSB7XG4gIC8qKlxuICAgKiBFc3RpbWF0ZXMgdGhlIG51bWJlciBvZiByb3dzIGFuZCBjb2x1bW5zIGZvciBhIGdpdmVuIHNldCBvZiBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge0dldEVzdGltYXRlT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB0aGUgZXN0aW1hdGlvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMubiAtIFRoZSBudW1iZXIgb2YgaXRlbXMgdG8gZXN0aW1hdGUgZm9yLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHRoZSBlc3RpbWF0aW9uLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmZpeGVkUGFnZUxpbWl0IC0gVGhlIGZpeGVkIHBhZ2UgbGltaXQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuUGFnZUxpbWl0IC0gVGhlIHNjcmVlbiBwYWdlIGxpbWl0LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZVNjcmVlblN0YXJ0ZWQgLSBJbmRpY2F0ZXMgaWYgc2NyZWVuIHNoYXJpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlZCAtIEluZGljYXRlcyBpZiBzaGFyaW5nIGlzIGFjdGl2ZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5ldmVudFR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCAoZS5nLiwgXCJjaGF0XCIsIFwiY29uZmVyZW5jZVwiKS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVtb3ZlQWx0R3JpZCAtIEluZGljYXRlcyBpZiB0aGUgYWx0ZXJuYXRlIGdyaWQgc2hvdWxkIGJlIHJlbW92ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzV2lkZVNjcmVlbiAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIHdpZGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzTWVkaXVtU2NyZWVuIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgbWVkaXVtLXNpemVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVtb3ZlQWx0R3JpZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVtb3ZlQWx0R3JpZCBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jYWxjdWxhdGVSb3dzQW5kQ29sdW1ucyAtIEZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSByb3dzIGFuZCBjb2x1bW5zLlxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyW119IEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIGVzdGltYXRlZCBudW1iZXIgb2YgaXRlbXMsIHJvd3MsIGFuZCBjb2x1bW5zLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgbG9nIGFuIGVycm9yIG1lc3NhZ2UgaWYgYW4gZXJyb3Igb2NjdXJzIGR1cmluZyBlc3RpbWF0aW9uLlxuICAgKi9cbiAgZ2V0RXN0aW1hdGUoeyBuLCBwYXJhbWV0ZXJzIH06IEdldEVzdGltYXRlT3B0aW9ucyk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIERlc3RydWN0dXJlIHBhcmFtZXRlcnNcbiAgICAgIGxldCB7XG4gICAgICAgIGZpeGVkUGFnZUxpbWl0LFxuICAgICAgICBzY3JlZW5QYWdlTGltaXQsXG4gICAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICAgICAgc2hhcmVkLFxuICAgICAgICBldmVudFR5cGUsXG4gICAgICAgIHJlbW92ZUFsdEdyaWQsXG4gICAgICAgIGlzV2lkZVNjcmVlbixcbiAgICAgICAgaXNNZWRpdW1TY3JlZW4sXG4gICAgICAgIHVwZGF0ZVJlbW92ZUFsdEdyaWQsXG4gICAgICAgIC8vIG1lZGlhU2Z1IGZ1bmN0aW9uc1xuICAgICAgICBjYWxjdWxhdGVSb3dzQW5kQ29sdW1ucyxcbiAgICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICAvLyBDYWxjdWxhdGUgcm93cyBhbmQgY29sdW1uc1xuICAgICAgY29uc3QgW3Jvd3MsIGNvbHNdID0gY2FsY3VsYXRlUm93c0FuZENvbHVtbnMoeyBuIH0pO1xuXG4gICAgICAvLyBDaGVjayBjb25kaXRpb25zIGZvciByZW1vdmluZyBhbHQgZ3JpZFxuICAgICAgaWYgKG4gPCBmaXhlZFBhZ2VMaW1pdCB8fCAoKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpICYmIG4gPCBzY3JlZW5QYWdlTGltaXQgKyAxKSkge1xuICAgICAgICByZW1vdmVBbHRHcmlkID0gdHJ1ZTtcbiAgICAgICAgdXBkYXRlUmVtb3ZlQWx0R3JpZChyZW1vdmVBbHRHcmlkKTtcblxuICAgICAgICAvLyBSZXR1cm4gZXN0aW1hdGVkIHZhbHVlcyBiYXNlZCBvbiBzY3JlZW4gd2lkdGhcbiAgICAgICAgaWYgKCEoaXNNZWRpdW1TY3JlZW4gfHwgaXNXaWRlU2NyZWVuKSkge1xuICAgICAgICAgIHJldHVybiBldmVudFR5cGUgPT09ICdjaGF0JyB8fFxuICAgICAgICAgICAgKGV2ZW50VHlwZSA9PT0gJ2NvbmZlcmVuY2UnICYmICEoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkpXG4gICAgICAgICAgICA/IFtuLCBuLCAxXVxuICAgICAgICAgICAgOiBbbiwgMSwgbl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGV2ZW50VHlwZSA9PT0gJ2NoYXQnIHx8XG4gICAgICAgICAgICAoZXZlbnRUeXBlID09PSAnY29uZmVyZW5jZScgJiYgIShzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSlcbiAgICAgICAgICAgID8gW24sIDEsIG5dXG4gICAgICAgICAgICA6IFtuLCBuLCAxXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gW3Jvd3MgKiBjb2xzLCByb3dzLCBjb2xzXTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAvLyBIYW5kbGUgZXJyb3JzIGR1cmluZyBlc3RpbWF0aW9uXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgZXN0aW1hdGluZyByb3dzIGFuZCBjb2x1bW5zOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgLy8gdGhyb3cgZXJyb3I7XG4gICAgICByZXR1cm4gWzAsIDAsIDBdO1xuICAgIH1cbiAgfVxufVxuIl19