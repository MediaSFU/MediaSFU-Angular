import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class CompareActiveNames {
    /**
     * Compares the current active names with the previous active names and triggers an action if there are changes.
     *
     * @param {Object} options - The options for comparing active names.
     * @param {boolean} [options.restart=false] - Whether to restart the comparison.
     * @param {CompareActiveNamesOptions} options.parameters - The parameters for the comparison.
     * @param {Function} options.parameters.getUpdatedAllParams - Function to get updated parameters.
     * @param {string[]} options.parameters.activeNames - The current active names.
     * @param {string[]} options.parameters.prevActiveNames - The previous active names.
     * @param {Function} options.parameters.updatePrevActiveNames - Function to update the previous active names.
     * @param {Function} options.parameters.trigger - Function to trigger an action when names change.
     *
     * @returns {Promise<void>} A promise that resolves when the comparison is complete.
     *
     * @throws Will log an error message if an error occurs during the comparison.
     */
    async compareActiveNames({ restart = false, parameters, }) {
        try {
            let { getUpdatedAllParams } = parameters;
            parameters = getUpdatedAllParams();
            let { activeNames, prevActiveNames, updatePrevActiveNames, trigger } = parameters;
            // Restart the comparison if needed
            if (restart) {
                await trigger({ ref_ActiveNames: activeNames, parameters });
                return;
            }
            // Array to track changes in activeNames
            let nameChanged = [];
            // Compare each name in activeNames
            for (let i = 0; i < activeNames.length; i++) {
                const currentName = activeNames[i];
                // Check if the name is present in prevActiveNames
                const hasNameChanged = !prevActiveNames.includes(currentName);
                if (hasNameChanged) {
                    nameChanged.push(true);
                    trigger({ ref_ActiveNames: activeNames, parameters });
                    break;
                }
            }
            // Count the number of true in nameChanged
            let count = nameChanged.filter((value) => value === true).length;
            if (count < 1) {
                // Check for new names in prevActiveNames
                for (let i = 0; i < prevActiveNames.length; i++) {
                    const currentName = prevActiveNames[i];
                    // Check if the name is present in activeNames
                    const hasNameChanged = !activeNames.includes(currentName);
                    // Signal change if the name is new
                    if (hasNameChanged) {
                        trigger({ ref_ActiveNames: activeNames, parameters });
                        break;
                    }
                }
            }
            // Update prevActiveNames with current activeNames
            prevActiveNames = [...activeNames];
            updatePrevActiveNames(prevActiveNames);
        }
        catch (error) {
            console.log('compareActiveNames error', error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CompareActiveNames, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CompareActiveNames, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CompareActiveNames, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGFyZS1hY3RpdmUtbmFtZXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvY29tcGFyZS1hY3RpdmUtbmFtZXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQTBCM0MsTUFBTSxPQUFPLGtCQUFrQjtJQUM3Qjs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxLQUFLLENBQUMsa0JBQWtCLENBQUMsRUFDdkIsT0FBTyxHQUFHLEtBQUssRUFDZixVQUFVLEdBQ2dCO1FBQzFCLElBQUksQ0FBQztZQUNILElBQUksRUFBRSxtQkFBbUIsRUFBRSxHQUFHLFVBQVUsQ0FBQztZQUN6QyxVQUFVLEdBQUcsbUJBQW1CLEVBQUUsQ0FBQztZQUVuQyxJQUFJLEVBQUUsV0FBVyxFQUFFLGVBQWUsRUFBRSxxQkFBcUIsRUFBRSxPQUFPLEVBQUUsR0FBRyxVQUFVLENBQUM7WUFFbEYsbUNBQW1DO1lBQ25DLElBQUksT0FBTyxFQUFFLENBQUM7Z0JBQ1osTUFBTSxPQUFPLENBQUMsRUFBRSxlQUFlLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQzVELE9BQU87WUFDVCxDQUFDO1lBRUQsd0NBQXdDO1lBQ3hDLElBQUksV0FBVyxHQUFHLEVBQUUsQ0FBQztZQUVyQixtQ0FBbUM7WUFDbkMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDNUMsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUVuQyxrREFBa0Q7Z0JBQ2xELE1BQU0sY0FBYyxHQUFHLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFFOUQsSUFBSSxjQUFjLEVBQUUsQ0FBQztvQkFDbkIsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDdkIsT0FBTyxDQUFDLEVBQUUsZUFBZSxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO29CQUN0RCxNQUFNO2dCQUNSLENBQUM7WUFDSCxDQUFDO1lBRUQsMENBQTBDO1lBQzFDLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFFakUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ2QseUNBQXlDO2dCQUN6QyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUNoRCxNQUFNLFdBQVcsR0FBRyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRXZDLDhDQUE4QztvQkFDOUMsTUFBTSxjQUFjLEdBQUcsQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUUxRCxtQ0FBbUM7b0JBQ25DLElBQUksY0FBYyxFQUFFLENBQUM7d0JBQ25CLE9BQU8sQ0FBQyxFQUFFLGVBQWUsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQzt3QkFDdEQsTUFBTTtvQkFDUixDQUFDO2dCQUNILENBQUM7WUFDSCxDQUFDO1lBRUQsa0RBQWtEO1lBQ2xELGVBQWUsR0FBRyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUM7WUFDbkMscUJBQXFCLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLDBCQUEwQixFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ2pELENBQUM7SUFDSCxDQUFDO3VHQTNFVSxrQkFBa0I7MkdBQWxCLGtCQUFrQixjQUZqQixNQUFNOzsyRkFFUCxrQkFBa0I7a0JBSDlCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJpZ2dlclR5cGUsIFRyaWdnZXJQYXJhbWV0ZXJzIH0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBDb21wYXJlQWN0aXZlTmFtZXNQYXJhbWV0ZXJzIGV4dGVuZHMgVHJpZ2dlclBhcmFtZXRlcnMge1xuICBhY3RpdmVOYW1lczogc3RyaW5nW107XG4gIHByZXZBY3RpdmVOYW1lczogc3RyaW5nW107XG4gIHVwZGF0ZUFjdGl2ZU5hbWVzOiAoYWN0aXZlTmFtZXM6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICB1cGRhdGVQcmV2QWN0aXZlTmFtZXM6IChwcmV2QWN0aXZlTmFtZXM6IHN0cmluZ1tdKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICB0cmlnZ2VyOiBUcmlnZ2VyVHlwZTtcbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gQ29tcGFyZUFjdGl2ZU5hbWVzUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbXBhcmVBY3RpdmVOYW1lc09wdGlvbnMge1xuICByZXN0YXJ0PzogYm9vbGVhbjtcbiAgcGFyYW1ldGVyczogQ29tcGFyZUFjdGl2ZU5hbWVzUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgQ29tcGFyZUFjdGl2ZU5hbWVzVHlwZSA9IChvcHRpb25zOiBDb21wYXJlQWN0aXZlTmFtZXNPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQ29tcGFyZUFjdGl2ZU5hbWVzIHtcbiAgLyoqXG4gICAqIENvbXBhcmVzIHRoZSBjdXJyZW50IGFjdGl2ZSBuYW1lcyB3aXRoIHRoZSBwcmV2aW91cyBhY3RpdmUgbmFtZXMgYW5kIHRyaWdnZXJzIGFuIGFjdGlvbiBpZiB0aGVyZSBhcmUgY2hhbmdlcy5cbiAgICpcbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgY29tcGFyaW5nIGFjdGl2ZSBuYW1lcy5cbiAgICogQHBhcmFtIHtib29sZWFufSBbb3B0aW9ucy5yZXN0YXJ0PWZhbHNlXSAtIFdoZXRoZXIgdG8gcmVzdGFydCB0aGUgY29tcGFyaXNvbi5cbiAgICogQHBhcmFtIHtDb21wYXJlQWN0aXZlTmFtZXNPcHRpb25zfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIGNvbXBhcmlzb24uXG4gICAqIEBwYXJhbSB7RnVuY3Rpb259IG9wdGlvbnMucGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zIC0gRnVuY3Rpb24gdG8gZ2V0IHVwZGF0ZWQgcGFyYW1ldGVycy5cbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9ucy5wYXJhbWV0ZXJzLmFjdGl2ZU5hbWVzIC0gVGhlIGN1cnJlbnQgYWN0aXZlIG5hbWVzLlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLnBhcmFtZXRlcnMucHJldkFjdGl2ZU5hbWVzIC0gVGhlIHByZXZpb3VzIGFjdGl2ZSBuYW1lcy5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5wYXJhbWV0ZXJzLnVwZGF0ZVByZXZBY3RpdmVOYW1lcyAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgcHJldmlvdXMgYWN0aXZlIG5hbWVzLlxuICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBvcHRpb25zLnBhcmFtZXRlcnMudHJpZ2dlciAtIEZ1bmN0aW9uIHRvIHRyaWdnZXIgYW4gYWN0aW9uIHdoZW4gbmFtZXMgY2hhbmdlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgY29tcGFyaXNvbiBpcyBjb21wbGV0ZS5cbiAgICpcbiAgICogQHRocm93cyBXaWxsIGxvZyBhbiBlcnJvciBtZXNzYWdlIGlmIGFuIGVycm9yIG9jY3VycyBkdXJpbmcgdGhlIGNvbXBhcmlzb24uXG4gICAqL1xuICBhc3luYyBjb21wYXJlQWN0aXZlTmFtZXMoe1xuICAgIHJlc3RhcnQgPSBmYWxzZSxcbiAgICBwYXJhbWV0ZXJzLFxuICB9OiBDb21wYXJlQWN0aXZlTmFtZXNPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGxldCB7IGdldFVwZGF0ZWRBbGxQYXJhbXMgfSA9IHBhcmFtZXRlcnM7XG4gICAgICBwYXJhbWV0ZXJzID0gZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgICBsZXQgeyBhY3RpdmVOYW1lcywgcHJldkFjdGl2ZU5hbWVzLCB1cGRhdGVQcmV2QWN0aXZlTmFtZXMsIHRyaWdnZXIgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIC8vIFJlc3RhcnQgdGhlIGNvbXBhcmlzb24gaWYgbmVlZGVkXG4gICAgICBpZiAocmVzdGFydCkge1xuICAgICAgICBhd2FpdCB0cmlnZ2VyKHsgcmVmX0FjdGl2ZU5hbWVzOiBhY3RpdmVOYW1lcywgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBBcnJheSB0byB0cmFjayBjaGFuZ2VzIGluIGFjdGl2ZU5hbWVzXG4gICAgICBsZXQgbmFtZUNoYW5nZWQgPSBbXTtcblxuICAgICAgLy8gQ29tcGFyZSBlYWNoIG5hbWUgaW4gYWN0aXZlTmFtZXNcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYWN0aXZlTmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgY3VycmVudE5hbWUgPSBhY3RpdmVOYW1lc1tpXTtcblxuICAgICAgICAvLyBDaGVjayBpZiB0aGUgbmFtZSBpcyBwcmVzZW50IGluIHByZXZBY3RpdmVOYW1lc1xuICAgICAgICBjb25zdCBoYXNOYW1lQ2hhbmdlZCA9ICFwcmV2QWN0aXZlTmFtZXMuaW5jbHVkZXMoY3VycmVudE5hbWUpO1xuXG4gICAgICAgIGlmIChoYXNOYW1lQ2hhbmdlZCkge1xuICAgICAgICAgIG5hbWVDaGFuZ2VkLnB1c2godHJ1ZSk7XG4gICAgICAgICAgdHJpZ2dlcih7IHJlZl9BY3RpdmVOYW1lczogYWN0aXZlTmFtZXMsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQ291bnQgdGhlIG51bWJlciBvZiB0cnVlIGluIG5hbWVDaGFuZ2VkXG4gICAgICBsZXQgY291bnQgPSBuYW1lQ2hhbmdlZC5maWx0ZXIoKHZhbHVlKSA9PiB2YWx1ZSA9PT0gdHJ1ZSkubGVuZ3RoO1xuXG4gICAgICBpZiAoY291bnQgPCAxKSB7XG4gICAgICAgIC8vIENoZWNrIGZvciBuZXcgbmFtZXMgaW4gcHJldkFjdGl2ZU5hbWVzXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJldkFjdGl2ZU5hbWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgY29uc3QgY3VycmVudE5hbWUgPSBwcmV2QWN0aXZlTmFtZXNbaV07XG5cbiAgICAgICAgICAvLyBDaGVjayBpZiB0aGUgbmFtZSBpcyBwcmVzZW50IGluIGFjdGl2ZU5hbWVzXG4gICAgICAgICAgY29uc3QgaGFzTmFtZUNoYW5nZWQgPSAhYWN0aXZlTmFtZXMuaW5jbHVkZXMoY3VycmVudE5hbWUpO1xuXG4gICAgICAgICAgLy8gU2lnbmFsIGNoYW5nZSBpZiB0aGUgbmFtZSBpcyBuZXdcbiAgICAgICAgICBpZiAoaGFzTmFtZUNoYW5nZWQpIHtcbiAgICAgICAgICAgIHRyaWdnZXIoeyByZWZfQWN0aXZlTmFtZXM6IGFjdGl2ZU5hbWVzLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFVwZGF0ZSBwcmV2QWN0aXZlTmFtZXMgd2l0aCBjdXJyZW50IGFjdGl2ZU5hbWVzXG4gICAgICBwcmV2QWN0aXZlTmFtZXMgPSBbLi4uYWN0aXZlTmFtZXNdO1xuICAgICAgdXBkYXRlUHJldkFjdGl2ZU5hbWVzKHByZXZBY3RpdmVOYW1lcyk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdjb21wYXJlQWN0aXZlTmFtZXMgZXJyb3InLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=