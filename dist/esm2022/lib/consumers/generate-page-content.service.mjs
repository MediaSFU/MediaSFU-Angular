import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtcGFnZS1jb250ZW50LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29uc3VtZXJzL2dlbmVyYXRlLXBhZ2UtY29udGVudC5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBNEIzQyxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsS0FBSyxDQUFDLG1CQUFtQixDQUFDLEVBQ3hCLElBQUksRUFDSixVQUFVLEVBQ1YsU0FBUyxHQUFHLENBQUMsQ0FBQyxFQUNkLFdBQVcsR0FBRyxLQUFLLEdBQ1E7UUFDM0IsSUFBSSxDQUFDO1lBQ0gseUJBQXlCO1lBQ3pCLFVBQVUsR0FBRyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztZQUU5QyxJQUFJLEVBQ0YsZ0JBQWdCLEVBQ2hCLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIscUJBQXFCLEVBQ3JCLHNCQUFzQjtZQUN0QixxQkFBcUI7WUFDckIsV0FBVyxHQUNaLEdBQUcsVUFBVSxDQUFDO1lBRWYsNkJBQTZCO1lBQzdCLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRXJDLDJCQUEyQjtZQUMzQixlQUFlLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRXZDLDBCQUEwQjtZQUMxQixnQkFBZ0IsR0FBRyxJQUFJLENBQUM7WUFDeEIsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUV6Qyx5Q0FBeUM7WUFDekMsTUFBTSxXQUFXLENBQUM7Z0JBQ2hCLFFBQVEsRUFBRSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hDLEdBQUcsRUFBRSxJQUFJO2dCQUNULFVBQVU7Z0JBQ1YsU0FBUztnQkFDVCxXQUFXO2FBQ1osQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIsMENBQTBDO1lBQzFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQy9ELENBQUM7SUFDSCxDQUFDO3VHQTdEVSxtQkFBbUI7MkdBQW5CLG1CQUFtQixjQUZsQixNQUFNOzsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUGFydGljaXBhbnQsIFN0cmVhbSwgRGlzcFN0cmVhbXNUeXBlLCBEaXNwU3RyZWFtc1BhcmFtZXRlcnMgfSBmcm9tICcuLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBHZW5lcmF0ZVBhZ2VDb250ZW50UGFyYW1ldGVycyBleHRlbmRzIERpc3BTdHJlYW1zUGFyYW1ldGVycyB7XG4gIHBhZ2luYXRlZFN0cmVhbXM6IChQYXJ0aWNpcGFudCB8IFN0cmVhbSlbXVtdO1xuICBjdXJyZW50VXNlclBhZ2U6IG51bWJlcjtcbiAgdXBkYXRlTWFpbldpbmRvdzogYm9vbGVhbjtcbiAgdXBkYXRlQ3VycmVudFVzZXJQYWdlOiAocGFnZTogbnVtYmVyKSA9PiB2b2lkO1xuICB1cGRhdGVVcGRhdGVNYWluV2luZG93OiAoZmxhZzogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgZGlzcFN0cmVhbXM6IERpc3BTdHJlYW1zVHlwZTtcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gR2VuZXJhdGVQYWdlQ29udGVudFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBHZW5lcmF0ZVBhZ2VDb250ZW50T3B0aW9ucyB7XG4gIHBhZ2U6IG51bWJlciB8IHN0cmluZztcbiAgcGFyYW1ldGVyczogR2VuZXJhdGVQYWdlQ29udGVudFBhcmFtZXRlcnM7XG4gIGJyZWFrUm9vbT86IG51bWJlcjtcbiAgaW5CcmVha1Jvb20/OiBib29sZWFuO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBHZW5lcmF0ZVBhZ2VDb250ZW50VHlwZSA9IChvcHRpb25zOiBHZW5lcmF0ZVBhZ2VDb250ZW50T3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdlbmVyYXRlUGFnZUNvbnRlbnQge1xuICAvKipcbiAgICogR2VuZXJhdGVzIHRoZSBjb250ZW50IGZvciBhIHNwZWNpZmljIHBhZ2UuXG4gICAqXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIGdlbmVyYXRpbmcgcGFnZSBjb250ZW50LlxuICAgKiBAcGFyYW0ge251bWJlciB8IHN0cmluZ30gb3B0aW9ucy5wYWdlIC0gVGhlIHBhZ2UgbnVtYmVyIHRvIGdlbmVyYXRlIGNvbnRlbnQgZm9yLlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgcmVxdWlyZWQgZm9yIGdlbmVyYXRpbmcgY29udGVudC5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5wYXJhbWV0ZXJzLnBhZ2luYXRlZFN0cmVhbXMgLSBUaGUgc3RyZWFtcyB0byBiZSBwYWdpbmF0ZWQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLnBhcmFtZXRlcnMuY3VycmVudFVzZXJQYWdlIC0gVGhlIGN1cnJlbnQgcGFnZSBvZiB0aGUgdXNlci5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZU1haW5XaW5kb3cgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIG1haW4gd2luZG93IGZsYWcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy51cGRhdGVDdXJyZW50VXNlclBhZ2UgLSBGdW5jdGlvbiB0byB1cGRhdGUgdGhlIGN1cnJlbnQgdXNlciBwYWdlLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudXBkYXRlVXBkYXRlTWFpbldpbmRvdyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgbWFpbiB3aW5kb3cgdXBkYXRlIGZsYWcuXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5kaXNwU3RyZWFtcyAtIEZ1bmN0aW9uIHRvIGRpc3BsYXkgc3RyZWFtcyBmb3IgdGhlIHNwZWNpZmllZCBwYWdlLlxuICAgKiBAcGFyYW0ge251bWJlcn0gW29wdGlvbnMuYnJlYWtSb29tPS0xXSAtIFRoZSBicmVhayByb29tIGlkZW50aWZpZXIuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gW29wdGlvbnMuaW5CcmVha1Jvb209ZmFsc2VdIC0gRmxhZyBpbmRpY2F0aW5nIGlmIHRoZSB1c2VyIGlzIGluIGEgYnJlYWsgcm9vbS5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIGNvbnRlbnQgZ2VuZXJhdGlvbiBpcyBjb21wbGV0ZS5cbiAgICogQHRocm93cyB7RXJyb3J9IFRocm93cyBhbiBlcnJvciBpZiBjb250ZW50IGdlbmVyYXRpb24gZmFpbHMuXG4gICAqL1xuICBhc3luYyBnZW5lcmF0ZVBhZ2VDb250ZW50KHtcbiAgICBwYWdlLFxuICAgIHBhcmFtZXRlcnMsXG4gICAgYnJlYWtSb29tID0gLTEsXG4gICAgaW5CcmVha1Jvb20gPSBmYWxzZSxcbiAgfTogR2VuZXJhdGVQYWdlQ29udGVudE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0cnkge1xuICAgICAgLy8gRGVzdHJ1Y3R1cmUgcGFyYW1ldGVyc1xuICAgICAgcGFyYW1ldGVycyA9IHBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgICBsZXQge1xuICAgICAgICBwYWdpbmF0ZWRTdHJlYW1zLFxuICAgICAgICBjdXJyZW50VXNlclBhZ2UsXG4gICAgICAgIHVwZGF0ZU1haW5XaW5kb3csXG4gICAgICAgIHVwZGF0ZUN1cnJlbnRVc2VyUGFnZSxcbiAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyxcbiAgICAgICAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gICAgICAgIGRpc3BTdHJlYW1zLFxuICAgICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIC8vIENvbnZlcnQgcGFnZSB0byBhbiBpbnRlZ2VyXG4gICAgICBwYWdlID0gcGFyc2VJbnQocGFnZS50b1N0cmluZygpLCAxMCk7XG5cbiAgICAgIC8vIFVwZGF0ZSBjdXJyZW50IHVzZXIgcGFnZVxuICAgICAgY3VycmVudFVzZXJQYWdlID0gcGFnZTtcbiAgICAgIHVwZGF0ZUN1cnJlbnRVc2VyUGFnZShjdXJyZW50VXNlclBhZ2UpO1xuXG4gICAgICAvLyBVcGRhdGUgbWFpbiB3aW5kb3cgZmxhZ1xuICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IHRydWU7XG4gICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93KHVwZGF0ZU1haW5XaW5kb3cpO1xuXG4gICAgICAvLyBEaXNwbGF5IHN0cmVhbXMgZm9yIHRoZSBzcGVjaWZpZWQgcGFnZVxuICAgICAgYXdhaXQgZGlzcFN0cmVhbXMoe1xuICAgICAgICBsU3RyZWFtczogcGFnaW5hdGVkU3RyZWFtc1twYWdlXSxcbiAgICAgICAgaW5kOiBwYWdlLFxuICAgICAgICBwYXJhbWV0ZXJzLFxuICAgICAgICBicmVha1Jvb20sXG4gICAgICAgIGluQnJlYWtSb29tLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICAgICAgLy8gSGFuZGxlIGVycm9ycyBkdXJpbmcgY29udGVudCBnZW5lcmF0aW9uXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgZ2VuZXJhdGluZyBwYWdlIGNvbnRlbnQ6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgfVxuICB9XG59XG4iXX0=