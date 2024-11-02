// estimate.service.ts
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Estimates the number of rows and columns for a given set of parameters.
 *
 * @param {GetEstimateOptions} options - The options for the estimation.
 * @param {number} options.n - The number of items to estimate for.
 * @param {GetEstimateParameters} options.parameters - The parameters for the estimation.
 * @param {number} options.parameters.fixedPageLimit - The fixed page limit.
 * @param {number} options.parameters.screenPageLimit - The screen page limit.
 * @param {boolean} options.parameters.shareScreenStarted - Indicates if screen sharing has started.
 * @param {boolean} [options.parameters.shared=false] - Indicates if sharing is active.
 * @param {EventType} options.parameters.eventType - The type of event (e.g., "chat", "conference").
 * @param {boolean} options.parameters.removeAltGrid - Indicates if the alternate grid should be removed.
 * @param {boolean} options.parameters.isWideScreen - Indicates if the screen is wide.
 * @param {boolean} options.parameters.isMediumScreen - Indicates if the screen is medium-sized.
 * @param {Function} options.parameters.updateRemoveAltGrid - Function to update the removeAltGrid parameter.
 * @param {CalculateRowsAndColumnsType} options.parameters.calculateRowsAndColumns - Function to calculate rows and columns.
 *
 * @returns {[number, number, number]} An array containing:
 * - Estimated number of items,
 * - Estimated number of rows,
 * - Estimated number of columns.
 *
 * @throws Will log an error message if an error occurs during estimation.
 *
 * @example
 * ```typescript
 * const estimateOptions = {
 *   n: 20,
 *   parameters: {
 *     fixedPageLimit: 10,
 *     screenPageLimit: 15,
 *     shareScreenStarted: false,
 *     shared: false,
 *     eventType: 'conference',
 *     removeAltGrid: false,
 *     isWideScreen: true,
 *     isMediumScreen: false,
 *     updateRemoveAltGrid: (value) => console.log(`Remove Alt Grid: ${value}`),
 *     calculateRowsAndColumns: ({ n }) => {
 *       const sqrt = Math.sqrt(n);
 *       return [Math.ceil(sqrt), Math.floor(sqrt)];
 *     },
 *   },
 * };
 *
 * const estimateService = new GetEstimate();
 * const [estimatedItems, estimatedRows, estimatedCols] = estimateService.getEstimate(estimateOptions);
 * console.log(`Estimated Items: ${estimatedItems}, Rows: ${estimatedRows}, Columns: ${estimatedCols}`);
 * ```
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWVzdGltYXRlLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2dldC1lc3RpbWF0ZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLHNCQUFzQjtBQUN0QixPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQTZCekM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpREc7QUFNTCxNQUFNLE9BQU8sV0FBVztJQUN0Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FvQkc7SUFDSCxXQUFXLENBQUMsRUFBRSxDQUFDLEVBQUUsVUFBVSxFQUFzQjtRQUMvQyxJQUFJLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsSUFBSSxFQUNGLGNBQWMsRUFDZCxlQUFlLEVBQ2Ysa0JBQWtCLEVBQ2xCLE1BQU0sRUFDTixTQUFTLEVBQ1QsYUFBYSxFQUNiLFlBQVksRUFDWixjQUFjLEVBQ2QsbUJBQW1CO1lBQ25CLHFCQUFxQjtZQUNyQix1QkFBdUIsR0FDeEIsR0FBRyxVQUFVLENBQUM7WUFFZiw2QkFBNkI7WUFDN0IsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyx1QkFBdUIsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFcEQseUNBQXlDO1lBQ3pDLElBQUksQ0FBQyxHQUFHLGNBQWMsSUFBSSxDQUFDLENBQUMsa0JBQWtCLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLGVBQWUsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDO2dCQUN0RixhQUFhLEdBQUcsSUFBSSxDQUFDO2dCQUNyQixtQkFBbUIsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFFbkMsZ0RBQWdEO2dCQUNoRCxJQUFJLENBQUMsQ0FBQyxjQUFjLElBQUksWUFBWSxDQUFDLEVBQUUsQ0FBQztvQkFDdEMsT0FBTyxTQUFTLEtBQUssTUFBTTt3QkFDekIsQ0FBQyxTQUFTLEtBQUssWUFBWSxJQUFJLENBQUMsQ0FBQyxrQkFBa0IsSUFBSSxNQUFNLENBQUMsQ0FBQzt3QkFDL0QsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7d0JBQ1gsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDaEIsQ0FBQztxQkFBTSxDQUFDO29CQUNOLE9BQU8sU0FBUyxLQUFLLE1BQU07d0JBQ3pCLENBQUMsU0FBUyxLQUFLLFlBQVksSUFBSSxDQUFDLENBQUMsa0JBQWtCLElBQUksTUFBTSxDQUFDLENBQUM7d0JBQy9ELENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3dCQUNYLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLENBQUM7WUFDSCxDQUFDO1lBRUQsT0FBTyxDQUFDLElBQUksR0FBRyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFBQyxPQUFPLEtBQVUsRUFBRSxDQUFDO1lBQ3BCLGtDQUFrQztZQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRSxlQUFlO1lBQ2YsT0FBTyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDbkIsQ0FBQztJQUNILENBQUM7dUdBcEVVLFdBQVc7MkdBQVgsV0FBVyxjQUZWLE1BQU07OzJGQUVQLFdBQVc7a0JBSHZCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiLy8gZXN0aW1hdGUuc2VydmljZS50c1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQgeyBDYWxjdWxhdGVSb3dzQW5kQ29sdW1uc1R5cGUsIEV2ZW50VHlwZSB9IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2V0RXN0aW1hdGVQYXJhbWV0ZXJzIHtcbiAgZml4ZWRQYWdlTGltaXQ6IG51bWJlcjtcbiAgc2NyZWVuUGFnZUxpbWl0OiBudW1iZXI7XG4gIHNoYXJlU2NyZWVuU3RhcnRlZDogYm9vbGVhbjtcbiAgc2hhcmVkPzogYm9vbGVhbjtcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG4gIHJlbW92ZUFsdEdyaWQ6IGJvb2xlYW47XG4gIGlzV2lkZVNjcmVlbjogYm9vbGVhbjtcbiAgaXNNZWRpdW1TY3JlZW46IGJvb2xlYW47XG4gIHVwZGF0ZVJlbW92ZUFsdEdyaWQ6ICh2YWx1ZTogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvLyBtZWRpYVNmdSBmdW5jdGlvbnNcbiAgY2FsY3VsYXRlUm93c0FuZENvbHVtbnM6IENhbGN1bGF0ZVJvd3NBbmRDb2x1bW5zVHlwZTtcblxuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgR2V0RXN0aW1hdGVPcHRpb25zIHtcbiAgbjogbnVtYmVyO1xuICBwYXJhbWV0ZXJzOiBHZXRFc3RpbWF0ZVBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEdldEVzdGltYXRlVHlwZSA9IChvcHRpb25zOiBHZXRFc3RpbWF0ZU9wdGlvbnMpID0+IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXTtcblxuICAvKipcbiAgICogRXN0aW1hdGVzIHRoZSBudW1iZXIgb2Ygcm93cyBhbmQgY29sdW1ucyBmb3IgYSBnaXZlbiBzZXQgb2YgcGFyYW1ldGVycy5cbiAgICpcbiAgICogQHBhcmFtIHtHZXRFc3RpbWF0ZU9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdGhlIGVzdGltYXRpb24uXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLm4gLSBUaGUgbnVtYmVyIG9mIGl0ZW1zIHRvIGVzdGltYXRlIGZvci5cbiAgICogQHBhcmFtIHtHZXRFc3RpbWF0ZVBhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgZXN0aW1hdGlvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5maXhlZFBhZ2VMaW1pdCAtIFRoZSBmaXhlZCBwYWdlIGxpbWl0LlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNjcmVlblBhZ2VMaW1pdCAtIFRoZSBzY3JlZW4gcGFnZSBsaW1pdC5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVTY3JlZW5TdGFydGVkIC0gSW5kaWNhdGVzIGlmIHNjcmVlbiBzaGFyaW5nIGhhcyBzdGFydGVkLlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IFtvcHRpb25zLnBhcmFtZXRlcnMuc2hhcmVkPWZhbHNlXSAtIEluZGljYXRlcyBpZiBzaGFyaW5nIGlzIGFjdGl2ZS5cbiAgICogQHBhcmFtIHtFdmVudFR5cGV9IG9wdGlvbnMucGFyYW1ldGVycy5ldmVudFR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCAoZS5nLiwgXCJjaGF0XCIsIFwiY29uZmVyZW5jZVwiKS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVtb3ZlQWx0R3JpZCAtIEluZGljYXRlcyBpZiB0aGUgYWx0ZXJuYXRlIGdyaWQgc2hvdWxkIGJlIHJlbW92ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzV2lkZVNjcmVlbiAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIHdpZGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzTWVkaXVtU2NyZWVuIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgbWVkaXVtLXNpemVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVtb3ZlQWx0R3JpZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVtb3ZlQWx0R3JpZCBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7Q2FsY3VsYXRlUm93c0FuZENvbHVtbnNUeXBlfSBvcHRpb25zLnBhcmFtZXRlcnMuY2FsY3VsYXRlUm93c0FuZENvbHVtbnMgLSBGdW5jdGlvbiB0byBjYWxjdWxhdGUgcm93cyBhbmQgY29sdW1ucy5cbiAgICpcbiAgICogQHJldHVybnMge1tudW1iZXIsIG51bWJlciwgbnVtYmVyXX0gQW4gYXJyYXkgY29udGFpbmluZzpcbiAgICogLSBFc3RpbWF0ZWQgbnVtYmVyIG9mIGl0ZW1zLFxuICAgKiAtIEVzdGltYXRlZCBudW1iZXIgb2Ygcm93cyxcbiAgICogLSBFc3RpbWF0ZWQgbnVtYmVyIG9mIGNvbHVtbnMuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCBsb2cgYW4gZXJyb3IgbWVzc2FnZSBpZiBhbiBlcnJvciBvY2N1cnMgZHVyaW5nIGVzdGltYXRpb24uXG4gICAqXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3QgZXN0aW1hdGVPcHRpb25zID0ge1xuICAgKiAgIG46IDIwLFxuICAgKiAgIHBhcmFtZXRlcnM6IHtcbiAgICogICAgIGZpeGVkUGFnZUxpbWl0OiAxMCxcbiAgICogICAgIHNjcmVlblBhZ2VMaW1pdDogMTUsXG4gICAqICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGZhbHNlLFxuICAgKiAgICAgc2hhcmVkOiBmYWxzZSxcbiAgICogICAgIGV2ZW50VHlwZTogJ2NvbmZlcmVuY2UnLFxuICAgKiAgICAgcmVtb3ZlQWx0R3JpZDogZmFsc2UsXG4gICAqICAgICBpc1dpZGVTY3JlZW46IHRydWUsXG4gICAqICAgICBpc01lZGl1bVNjcmVlbjogZmFsc2UsXG4gICAqICAgICB1cGRhdGVSZW1vdmVBbHRHcmlkOiAodmFsdWUpID0+IGNvbnNvbGUubG9nKGBSZW1vdmUgQWx0IEdyaWQ6ICR7dmFsdWV9YCksXG4gICAqICAgICBjYWxjdWxhdGVSb3dzQW5kQ29sdW1uczogKHsgbiB9KSA9PiB7XG4gICAqICAgICAgIGNvbnN0IHNxcnQgPSBNYXRoLnNxcnQobik7XG4gICAqICAgICAgIHJldHVybiBbTWF0aC5jZWlsKHNxcnQpLCBNYXRoLmZsb29yKHNxcnQpXTtcbiAgICogICAgIH0sXG4gICAqICAgfSxcbiAgICogfTtcbiAgICpcbiAgICogY29uc3QgZXN0aW1hdGVTZXJ2aWNlID0gbmV3IEdldEVzdGltYXRlKCk7XG4gICAqIGNvbnN0IFtlc3RpbWF0ZWRJdGVtcywgZXN0aW1hdGVkUm93cywgZXN0aW1hdGVkQ29sc10gPSBlc3RpbWF0ZVNlcnZpY2UuZ2V0RXN0aW1hdGUoZXN0aW1hdGVPcHRpb25zKTtcbiAgICogY29uc29sZS5sb2coYEVzdGltYXRlZCBJdGVtczogJHtlc3RpbWF0ZWRJdGVtc30sIFJvd3M6ICR7ZXN0aW1hdGVkUm93c30sIENvbHVtbnM6ICR7ZXN0aW1hdGVkQ29sc31gKTtcbiAgICogYGBgXG4gICAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBHZXRFc3RpbWF0ZSB7XG4gIC8qKlxuICAgKiBFc3RpbWF0ZXMgdGhlIG51bWJlciBvZiByb3dzIGFuZCBjb2x1bW5zIGZvciBhIGdpdmVuIHNldCBvZiBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge0dldEVzdGltYXRlT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB0aGUgZXN0aW1hdGlvbi5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMubiAtIFRoZSBudW1iZXIgb2YgaXRlbXMgdG8gZXN0aW1hdGUgZm9yLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHRoZSBlc3RpbWF0aW9uLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmZpeGVkUGFnZUxpbWl0IC0gVGhlIGZpeGVkIHBhZ2UgbGltaXQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMuc2NyZWVuUGFnZUxpbWl0IC0gVGhlIHNjcmVlbiBwYWdlIGxpbWl0LlxuICAgKiBAcGFyYW0ge2Jvb2xlYW59IG9wdGlvbnMucGFyYW1ldGVycy5zaGFyZVNjcmVlblN0YXJ0ZWQgLSBJbmRpY2F0ZXMgaWYgc2NyZWVuIHNoYXJpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnNoYXJlZCAtIEluZGljYXRlcyBpZiBzaGFyaW5nIGlzIGFjdGl2ZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucGFyYW1ldGVycy5ldmVudFR5cGUgLSBUaGUgdHlwZSBvZiBldmVudCAoZS5nLiwgXCJjaGF0XCIsIFwiY29uZmVyZW5jZVwiKS5cbiAgICogQHBhcmFtIHtib29sZWFufSBvcHRpb25zLnBhcmFtZXRlcnMucmVtb3ZlQWx0R3JpZCAtIEluZGljYXRlcyBpZiB0aGUgYWx0ZXJuYXRlIGdyaWQgc2hvdWxkIGJlIHJlbW92ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzV2lkZVNjcmVlbiAtIEluZGljYXRlcyBpZiB0aGUgc2NyZWVuIGlzIHdpZGUuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmlzTWVkaXVtU2NyZWVuIC0gSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgbWVkaXVtLXNpemVkLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlUmVtb3ZlQWx0R3JpZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcmVtb3ZlQWx0R3JpZCBwYXJhbWV0ZXIuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5jYWxjdWxhdGVSb3dzQW5kQ29sdW1ucyAtIEZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSByb3dzIGFuZCBjb2x1bW5zLlxuICAgKlxuICAgKiBAcmV0dXJucyB7bnVtYmVyW119IEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIGVzdGltYXRlZCBudW1iZXIgb2YgaXRlbXMsIHJvd3MsIGFuZCBjb2x1bW5zLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgbG9nIGFuIGVycm9yIG1lc3NhZ2UgaWYgYW4gZXJyb3Igb2NjdXJzIGR1cmluZyBlc3RpbWF0aW9uLlxuICAgKi9cbiAgZ2V0RXN0aW1hdGUoeyBuLCBwYXJhbWV0ZXJzIH06IEdldEVzdGltYXRlT3B0aW9ucyk6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIERlc3RydWN0dXJlIHBhcmFtZXRlcnNcbiAgICAgIGxldCB7XG4gICAgICAgIGZpeGVkUGFnZUxpbWl0LFxuICAgICAgICBzY3JlZW5QYWdlTGltaXQsXG4gICAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICAgICAgc2hhcmVkLFxuICAgICAgICBldmVudFR5cGUsXG4gICAgICAgIHJlbW92ZUFsdEdyaWQsXG4gICAgICAgIGlzV2lkZVNjcmVlbixcbiAgICAgICAgaXNNZWRpdW1TY3JlZW4sXG4gICAgICAgIHVwZGF0ZVJlbW92ZUFsdEdyaWQsXG4gICAgICAgIC8vIG1lZGlhU2Z1IGZ1bmN0aW9uc1xuICAgICAgICBjYWxjdWxhdGVSb3dzQW5kQ29sdW1ucyxcbiAgICAgIH0gPSBwYXJhbWV0ZXJzO1xuXG4gICAgICAvLyBDYWxjdWxhdGUgcm93cyBhbmQgY29sdW1uc1xuICAgICAgY29uc3QgW3Jvd3MsIGNvbHNdID0gY2FsY3VsYXRlUm93c0FuZENvbHVtbnMoeyBuIH0pO1xuXG4gICAgICAvLyBDaGVjayBjb25kaXRpb25zIGZvciByZW1vdmluZyBhbHQgZ3JpZFxuICAgICAgaWYgKG4gPCBmaXhlZFBhZ2VMaW1pdCB8fCAoKHNoYXJlU2NyZWVuU3RhcnRlZCB8fCBzaGFyZWQpICYmIG4gPCBzY3JlZW5QYWdlTGltaXQgKyAxKSkge1xuICAgICAgICByZW1vdmVBbHRHcmlkID0gdHJ1ZTtcbiAgICAgICAgdXBkYXRlUmVtb3ZlQWx0R3JpZChyZW1vdmVBbHRHcmlkKTtcblxuICAgICAgICAvLyBSZXR1cm4gZXN0aW1hdGVkIHZhbHVlcyBiYXNlZCBvbiBzY3JlZW4gd2lkdGhcbiAgICAgICAgaWYgKCEoaXNNZWRpdW1TY3JlZW4gfHwgaXNXaWRlU2NyZWVuKSkge1xuICAgICAgICAgIHJldHVybiBldmVudFR5cGUgPT09ICdjaGF0JyB8fFxuICAgICAgICAgICAgKGV2ZW50VHlwZSA9PT0gJ2NvbmZlcmVuY2UnICYmICEoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkpXG4gICAgICAgICAgICA/IFtuLCBuLCAxXVxuICAgICAgICAgICAgOiBbbiwgMSwgbl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGV2ZW50VHlwZSA9PT0gJ2NoYXQnIHx8XG4gICAgICAgICAgICAoZXZlbnRUeXBlID09PSAnY29uZmVyZW5jZScgJiYgIShzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSlcbiAgICAgICAgICAgID8gW24sIDEsIG5dXG4gICAgICAgICAgICA6IFtuLCBuLCAxXTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gW3Jvd3MgKiBjb2xzLCByb3dzLCBjb2xzXTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAvLyBIYW5kbGUgZXJyb3JzIGR1cmluZyBlc3RpbWF0aW9uXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgZXN0aW1hdGluZyByb3dzIGFuZCBjb2x1bW5zOicsIGVycm9yLm1lc3NhZ2UpO1xuICAgICAgLy8gdGhyb3cgZXJyb3I7XG4gICAgICByZXR1cm4gWzAsIDAsIDBdO1xuICAgIH1cbiAgfVxufVxuIl19