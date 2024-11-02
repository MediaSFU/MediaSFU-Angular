import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Generates the content for a specific page.
 *
 * @param {GeneratePageContentOptions} options - The options for generating page content.
 * @param {number | string} options.page - The page number to generate content for.
 * @param {GeneratePageContentParameters} options.parameters - The parameters required for generating content.
 * @param {Array<(Participant | Stream)[]>} options.parameters.paginatedStreams - The streams to be paginated.
 * @param {number} options.parameters.currentUserPage - The current page of the user.
 * @param {Function} options.parameters.updateMainWindow - Function to update the main window flag.
 * @param {Function} options.parameters.updateCurrentUserPage - Function to update the current user page.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window update flag.
 * @param {Function} options.parameters.dispStreams - Function to display streams for the specified page.
 * @param {number} [options.breakRoom=-1] - The break room identifier.
 * @param {boolean} [options.inBreakRoom=false] - Flag indicating if the user is in a break room.
 *
 * @returns {Promise<void>} A promise that resolves when the content generation is complete.
 *
 * @throws {Error} Throws an error if content generation fails.
 *
 * @example
 * ```typescript
 * const options = {
 *   page: 1,
 *   parameters: {
 *     paginatedStreams: [
 *       // Page 0 streams
 *       [stream1, stream2],
 *       // Page 1 streams
 *       [stream3, stream4],
 *     ],
 *     currentUserPage: 0,
 *     updateMainWindow: false,
 *     updateCurrentUserPage: (page) => { console.log(`Current page updated to: ${page}`); },
 *     updateUpdateMainWindow: (flag) => { console.log(`Main window update flag: ${flag}`); },
 *     dispStreams: async ({ lStreams, ind }) => {
 *       console.log(`Displaying streams for page ${ind}:`, lStreams);
 *     },
 *     getUpdatedAllParams: () => options.parameters,
 *   },
 *   breakRoom: -1,
 *   inBreakRoom: false,
 * };
 *
 * const generatePageContentService = new GeneratePageContent();
 * await generatePageContentService.generatePageContent(options);
 * ```
 */
export class GeneratePageContent {
    /**
     * Generates the content for a specific page.
     *
     * @param {Object} options - The options for generating page content.
     * @param {number | string} options.page - The page number to generate content for.
     * @param {Object} options.parameters - The parameters required for generating content.
     * @param {Array} options.parameters.paginatedStreams - The streams to be paginated.
     * @param {number} options.parameters.currentUserPage - The current page of the user.
     * @param {Function} options.parameters.updateMainWindow - Function to update the main window flag.
     * @param {Function} options.parameters.updateCurrentUserPage - Function to update the current user page.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window update flag.
     * @param {Function} options.parameters.dispStreams - Function to display streams for the specified page.
     * @param {number} [options.breakRoom=-1] - The break room identifier.
     * @param {boolean} [options.inBreakRoom=false] - Flag indicating if the user is in a break room.
     * @returns {Promise<void>} A promise that resolves when the content generation is complete.
     * @throws {Error} Throws an error if content generation fails.
     */
    async generatePageContent({ page, parameters, breakRoom = -1, inBreakRoom = false, }) {
        try {
            // Destructure parameters
            parameters = parameters.getUpdatedAllParams();
            let { paginatedStreams, currentUserPage, updateMainWindow, updateCurrentUserPage, updateUpdateMainWindow, 
            // mediasfu functions
            dispStreams, } = parameters;
            // Convert page to an integer
            page = parseInt(page.toString(), 10);
            // Update current user page
            currentUserPage = page;
            updateCurrentUserPage(currentUserPage);
            // Update main window flag
            updateMainWindow = true;
            updateUpdateMainWindow(updateMainWindow);
            // Display streams for the specified page
            await dispStreams({
                lStreams: paginatedStreams[page],
                ind: page,
                parameters,
                breakRoom,
                inBreakRoom,
            });
        }
        catch (error) {
            // Handle errors during content generation
            console.log('Error generating page content:', error.message);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GeneratePageContent, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GeneratePageContent, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GeneratePageContent, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtcGFnZS1jb250ZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2dlbmVyYXRlLXBhZ2UtY29udGVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBeUJ6Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThDRztBQU1MLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxLQUFLLENBQUMsbUJBQW1CLENBQUMsRUFDeEIsSUFBSSxFQUNKLFVBQVUsRUFDVixTQUFTLEdBQUcsQ0FBQyxDQUFDLEVBQ2QsV0FBVyxHQUFHLEtBQUssR0FDUTtRQUMzQixJQUFJLENBQUM7WUFDSCx5QkFBeUI7WUFDekIsVUFBVSxHQUFHLFVBQVUsQ0FBQyxtQkFBbUIsRUFBRSxDQUFDO1lBRTlDLElBQUksRUFDRixnQkFBZ0IsRUFDaEIsZUFBZSxFQUNmLGdCQUFnQixFQUNoQixxQkFBcUIsRUFDckIsc0JBQXNCO1lBQ3RCLHFCQUFxQjtZQUNyQixXQUFXLEdBQ1osR0FBRyxVQUFVLENBQUM7WUFFZiw2QkFBNkI7WUFDN0IsSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFckMsMkJBQTJCO1lBQzNCLGVBQWUsR0FBRyxJQUFJLENBQUM7WUFDdkIscUJBQXFCLENBQUMsZUFBZSxDQUFDLENBQUM7WUFFdkMsMEJBQTBCO1lBQzFCLGdCQUFnQixHQUFHLElBQUksQ0FBQztZQUN4QixzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRXpDLHlDQUF5QztZQUN6QyxNQUFNLFdBQVcsQ0FBQztnQkFDaEIsUUFBUSxFQUFFLGdCQUFnQixDQUFDLElBQUksQ0FBQztnQkFDaEMsR0FBRyxFQUFFLElBQUk7Z0JBQ1QsVUFBVTtnQkFDVixTQUFTO2dCQUNULFdBQVc7YUFDWixDQUFDLENBQUM7UUFDTCxDQUFDO1FBQUMsT0FBTyxLQUFVLEVBQUUsQ0FBQztZQUNwQiwwQ0FBMEM7WUFDMUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDL0QsQ0FBQztJQUNILENBQUM7dUdBN0RVLG1CQUFtQjsyR0FBbkIsbUJBQW1CLGNBRmxCLE1BQU07OzJGQUVQLG1CQUFtQjtrQkFIL0IsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudCwgU3RyZWFtLCBEaXNwU3RyZWFtc1R5cGUsIERpc3BTdHJlYW1zUGFyYW1ldGVycyB9IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIEdlbmVyYXRlUGFnZUNvbnRlbnRQYXJhbWV0ZXJzIGV4dGVuZHMgRGlzcFN0cmVhbXNQYXJhbWV0ZXJzIHtcbiAgcGFnaW5hdGVkU3RyZWFtczogKFBhcnRpY2lwYW50IHwgU3RyZWFtKVtdW107XG4gIGN1cnJlbnRVc2VyUGFnZTogbnVtYmVyO1xuICB1cGRhdGVNYWluV2luZG93OiBib29sZWFuO1xuICB1cGRhdGVDdXJyZW50VXNlclBhZ2U6IChwYWdlOiBudW1iZXIpID0+IHZvaWQ7XG4gIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6IChmbGFnOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBkaXNwU3RyZWFtczogRGlzcFN0cmVhbXNUeXBlO1xuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBHZW5lcmF0ZVBhZ2VDb250ZW50UGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEdlbmVyYXRlUGFnZUNvbnRlbnRPcHRpb25zIHtcbiAgcGFnZTogbnVtYmVyIHwgc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBHZW5lcmF0ZVBhZ2VDb250ZW50UGFyYW1ldGVycztcbiAgYnJlYWtSb29tPzogbnVtYmVyO1xuICBpbkJyZWFrUm9vbT86IGJvb2xlYW47XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEdlbmVyYXRlUGFnZUNvbnRlbnRUeXBlID0gKG9wdGlvbnM6IEdlbmVyYXRlUGFnZUNvbnRlbnRPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgdGhlIGNvbnRlbnQgZm9yIGEgc3BlY2lmaWMgcGFnZS5cbiAgICpcbiAgICogQHBhcmFtIHtHZW5lcmF0ZVBhZ2VDb250ZW50T3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBnZW5lcmF0aW5nIHBhZ2UgY29udGVudC5cbiAgICogQHBhcmFtIHtudW1iZXIgfCBzdHJpbmd9IG9wdGlvbnMucGFnZSAtIFRoZSBwYWdlIG51bWJlciB0byBnZW5lcmF0ZSBjb250ZW50IGZvci5cbiAgICogQHBhcmFtIHtHZW5lcmF0ZVBhZ2VDb250ZW50UGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIGdlbmVyYXRpbmcgY29udGVudC5cbiAgICogQHBhcmFtIHtBcnJheTwoUGFydGljaXBhbnQgfCBTdHJlYW0pW10+fSBvcHRpb25zLnBhcmFtZXRlcnMucGFnaW5hdGVkU3RyZWFtcyAtIFRoZSBzdHJlYW1zIHRvIGJlIHBhZ2luYXRlZC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5jdXJyZW50VXNlclBhZ2UgLSBUaGUgY3VycmVudCBwYWdlIG9mIHRoZSB1c2VyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbldpbmRvdyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cgZmxhZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUN1cnJlbnRVc2VyUGFnZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgY3VycmVudCB1c2VyIHBhZ2UuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVcGRhdGVNYWluV2luZG93IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIHdpbmRvdyB1cGRhdGUgZmxhZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmRpc3BTdHJlYW1zIC0gRnVuY3Rpb24gdG8gZGlzcGxheSBzdHJlYW1zIGZvciB0aGUgc3BlY2lmaWVkIHBhZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5icmVha1Jvb209LTFdIC0gVGhlIGJyZWFrIHJvb20gaWRlbnRpZmllci5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5pbkJyZWFrUm9vbT1mYWxzZV0gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHVzZXIgaXMgaW4gYSBicmVhayByb29tLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgY29udGVudCBnZW5lcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIGNvbnRlbnQgZ2VuZXJhdGlvbiBmYWlscy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBjb25zdCBvcHRpb25zID0ge1xuICAgKiAgIHBhZ2U6IDEsXG4gICAqICAgcGFyYW1ldGVyczoge1xuICAgKiAgICAgcGFnaW5hdGVkU3RyZWFtczogW1xuICAgKiAgICAgICAvLyBQYWdlIDAgc3RyZWFtc1xuICAgKiAgICAgICBbc3RyZWFtMSwgc3RyZWFtMl0sXG4gICAqICAgICAgIC8vIFBhZ2UgMSBzdHJlYW1zXG4gICAqICAgICAgIFtzdHJlYW0zLCBzdHJlYW00XSxcbiAgICogICAgIF0sXG4gICAqICAgICBjdXJyZW50VXNlclBhZ2U6IDAsXG4gICAqICAgICB1cGRhdGVNYWluV2luZG93OiBmYWxzZSxcbiAgICogICAgIHVwZGF0ZUN1cnJlbnRVc2VyUGFnZTogKHBhZ2UpID0+IHsgY29uc29sZS5sb2coYEN1cnJlbnQgcGFnZSB1cGRhdGVkIHRvOiAke3BhZ2V9YCk7IH0sXG4gICAqICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93OiAoZmxhZykgPT4geyBjb25zb2xlLmxvZyhgTWFpbiB3aW5kb3cgdXBkYXRlIGZsYWc6ICR7ZmxhZ31gKTsgfSxcbiAgICogICAgIGRpc3BTdHJlYW1zOiBhc3luYyAoeyBsU3RyZWFtcywgaW5kIH0pID0+IHtcbiAgICogICAgICAgY29uc29sZS5sb2coYERpc3BsYXlpbmcgc3RyZWFtcyBmb3IgcGFnZSAke2luZH06YCwgbFN0cmVhbXMpO1xuICAgKiAgICAgfSxcbiAgICogICAgIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IG9wdGlvbnMucGFyYW1ldGVycyxcbiAgICogICB9LFxuICAgKiAgIGJyZWFrUm9vbTogLTEsXG4gICAqICAgaW5CcmVha1Jvb206IGZhbHNlLFxuICAgKiB9O1xuICAgKlxuICAgKiBjb25zdCBnZW5lcmF0ZVBhZ2VDb250ZW50U2VydmljZSA9IG5ldyBHZW5lcmF0ZVBhZ2VDb250ZW50KCk7XG4gICAqIGF3YWl0IGdlbmVyYXRlUGFnZUNvbnRlbnRTZXJ2aWNlLmdlbmVyYXRlUGFnZUNvbnRlbnQob3B0aW9ucyk7XG4gICAqIGBgYFxuICAgKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgR2VuZXJhdGVQYWdlQ29udGVudCB7XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgdGhlIGNvbnRlbnQgZm9yIGEgc3BlY2lmaWMgcGFnZS5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgZ2VuZXJhdGluZyBwYWdlIGNvbnRlbnQuXG4gICAqIEBwYXJhbSB7bnVtYmVyIHwgc3RyaW5nfSBvcHRpb25zLnBhZ2UgLSBUaGUgcGFnZSBudW1iZXIgdG8gZ2VuZXJhdGUgY29udGVudCBmb3IuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyByZXF1aXJlZCBmb3IgZ2VuZXJhdGluZyBjb250ZW50LlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnBhcmFtZXRlcnMucGFnaW5hdGVkU3RyZWFtcyAtIFRoZSBzdHJlYW1zIHRvIGJlIHBhZ2luYXRlZC5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMucGFyYW1ldGVycy5jdXJyZW50VXNlclBhZ2UgLSBUaGUgY3VycmVudCBwYWdlIG9mIHRoZSB1c2VyLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlTWFpbldpbmRvdyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cgZmxhZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZUN1cnJlbnRVc2VyUGFnZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgY3VycmVudCB1c2VyIHBhZ2UuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVVcGRhdGVNYWluV2luZG93IC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBtYWluIHdpbmRvdyB1cGRhdGUgZmxhZy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLmRpc3BTdHJlYW1zIC0gRnVuY3Rpb24gdG8gZGlzcGxheSBzdHJlYW1zIGZvciB0aGUgc3BlY2lmaWVkIHBhZ2UuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBbb3B0aW9ucy5icmVha1Jvb209LTFdIC0gVGhlIGJyZWFrIHJvb20gaWRlbnRpZmllci5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5pbkJyZWFrUm9vbT1mYWxzZV0gLSBGbGFnIGluZGljYXRpbmcgaWYgdGhlIHVzZXIgaXMgaW4gYSBicmVhayByb29tLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgY29udGVudCBnZW5lcmF0aW9uIGlzIGNvbXBsZXRlLlxuICAgKiBAdGhyb3dzIHtFcnJvcn0gVGhyb3dzIGFuIGVycm9yIGlmIGNvbnRlbnQgZ2VuZXJhdGlvbiBmYWlscy5cbiAgICovXG4gIGFzeW5jIGdlbmVyYXRlUGFnZUNvbnRlbnQoe1xuICAgIHBhZ2UsXG4gICAgcGFyYW1ldGVycyxcbiAgICBicmVha1Jvb20gPSAtMSxcbiAgICBpbkJyZWFrUm9vbSA9IGZhbHNlLFxuICB9OiBHZW5lcmF0ZVBhZ2VDb250ZW50T3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBEZXN0cnVjdHVyZSBwYXJhbWV0ZXJzXG4gICAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICAgIGxldCB7XG4gICAgICAgIHBhZ2luYXRlZFN0cmVhbXMsXG4gICAgICAgIGN1cnJlbnRVc2VyUGFnZSxcbiAgICAgICAgdXBkYXRlTWFpbldpbmRvdyxcbiAgICAgICAgdXBkYXRlQ3VycmVudFVzZXJQYWdlLFxuICAgICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93LFxuICAgICAgICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgICAgICAgZGlzcFN0cmVhbXMsXG4gICAgICB9ID0gcGFyYW1ldGVycztcblxuICAgICAgLy8gQ29udmVydCBwYWdlIHRvIGFuIGludGVnZXJcbiAgICAgIHBhZ2UgPSBwYXJzZUludChwYWdlLnRvU3RyaW5nKCksIDEwKTtcblxuICAgICAgLy8gVXBkYXRlIGN1cnJlbnQgdXNlciBwYWdlXG4gICAgICBjdXJyZW50VXNlclBhZ2UgPSBwYWdlO1xuICAgICAgdXBkYXRlQ3VycmVudFVzZXJQYWdlKGN1cnJlbnRVc2VyUGFnZSk7XG5cbiAgICAgIC8vIFVwZGF0ZSBtYWluIHdpbmRvdyBmbGFnXG4gICAgICB1cGRhdGVNYWluV2luZG93ID0gdHJ1ZTtcbiAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG5cbiAgICAgIC8vIERpc3BsYXkgc3RyZWFtcyBmb3IgdGhlIHNwZWNpZmllZCBwYWdlXG4gICAgICBhd2FpdCBkaXNwU3RyZWFtcyh7XG4gICAgICAgIGxTdHJlYW1zOiBwYWdpbmF0ZWRTdHJlYW1zW3BhZ2VdLFxuICAgICAgICBpbmQ6IHBhZ2UsXG4gICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgIGJyZWFrUm9vbSxcbiAgICAgICAgaW5CcmVha1Jvb20sXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcjogYW55KSB7XG4gICAgICAvLyBIYW5kbGUgZXJyb3JzIGR1cmluZyBjb250ZW50IGdlbmVyYXRpb25cbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBnZW5lcmF0aW5nIHBhZ2UgY29udGVudDonLCBlcnJvci5tZXNzYWdlKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==