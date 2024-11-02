import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to handle actions when a person joins an event.
 *
 * @class
 * @name PersonJoined
 * @description
 * Displays a notification when a person joins the event, using the `showAlert` function if provided.
 *
 * @method
 * personJoined
 *
 * @param {PersonJoinedOptions} options - Contains information about the person and alert display function:
 *   - `name` {string}: The name of the person who joined.
 *   - `showAlert` {Function} (optional): Function to display a notification when the person joins.
 *
 * @returns {void} Executes alert display through `showAlert` if defined.
 *
 * @example
 * const options = {
 *   name: 'Alice',
 *   showAlert: ({ message, type, duration }) => console.log(message)
 * };
 * personJoinedService.personJoined(options);
 * // Logs: "Alice joined the event."
 */
export class PersonJoined {
    /**
     * Handles the event when a person joins.
     *
     * @param {PersonJoinedOptions} options - The options for the person joined event.
     * @param {string} options.name - The name of the person who joined.
     * @param {Function} options.showAlert - A function to display an alert/notification.
     * @returns {Promise<void>} A promise that resolves when the alert has been shown.
     */
    personJoined = ({ name, showAlert }) => {
        // Display an alert/notification about the person joining the event
        showAlert?.({
            message: `${name} joined the event.`,
            type: 'success',
            duration: 3000,
        });
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: PersonJoined, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: PersonJoined, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: PersonJoined, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uLWpvaW5lZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3BlcnNvbi1qb2luZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVczQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBS0gsTUFBTSxPQUFPLFlBQVk7SUFDdkI7Ozs7Ozs7T0FPRztJQUNILFlBQVksR0FBRyxDQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBdUIsRUFBUSxFQUFFO1FBQ2hFLG1FQUFtRTtRQUNuRSxTQUFTLEVBQUUsQ0FBQztZQUNWLE9BQU8sRUFBRSxHQUFHLElBQUksb0JBQW9CO1lBQ3BDLElBQUksRUFBRSxTQUFTO1lBQ2YsUUFBUSxFQUFFLElBQUk7U0FDZixDQUFDLENBQUM7SUFDTCxDQUFDLENBQUM7dUdBaEJTLFlBQVk7MkdBQVosWUFBWSxjQUZYLE1BQU07OzJGQUVQLFlBQVk7a0JBSHhCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU2hvd0FsZXJ0IH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBQZXJzb25Kb2luZWRPcHRpb25zIHtcbiAgc2hvd0FsZXJ0PzogU2hvd0FsZXJ0O1xuICBuYW1lOiBzdHJpbmc7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFBlcnNvbkpvaW5lZFR5cGUgPSAob3B0aW9uczogUGVyc29uSm9pbmVkT3B0aW9ucykgPT4gUHJvbWlzZTx2b2lkPjtcblxuLyoqXG4gKiBTZXJ2aWNlIHRvIGhhbmRsZSBhY3Rpb25zIHdoZW4gYSBwZXJzb24gam9pbnMgYW4gZXZlbnQuXG4gKlxuICogQGNsYXNzXG4gKiBAbmFtZSBQZXJzb25Kb2luZWRcbiAqIEBkZXNjcmlwdGlvblxuICogRGlzcGxheXMgYSBub3RpZmljYXRpb24gd2hlbiBhIHBlcnNvbiBqb2lucyB0aGUgZXZlbnQsIHVzaW5nIHRoZSBgc2hvd0FsZXJ0YCBmdW5jdGlvbiBpZiBwcm92aWRlZC5cbiAqXG4gKiBAbWV0aG9kXG4gKiBwZXJzb25Kb2luZWRcbiAqXG4gKiBAcGFyYW0ge1BlcnNvbkpvaW5lZE9wdGlvbnN9IG9wdGlvbnMgLSBDb250YWlucyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgcGVyc29uIGFuZCBhbGVydCBkaXNwbGF5IGZ1bmN0aW9uOlxuICogICAtIGBuYW1lYCB7c3RyaW5nfTogVGhlIG5hbWUgb2YgdGhlIHBlcnNvbiB3aG8gam9pbmVkLlxuICogICAtIGBzaG93QWxlcnRgIHtGdW5jdGlvbn0gKG9wdGlvbmFsKTogRnVuY3Rpb24gdG8gZGlzcGxheSBhIG5vdGlmaWNhdGlvbiB3aGVuIHRoZSBwZXJzb24gam9pbnMuXG4gKlxuICogQHJldHVybnMge3ZvaWR9IEV4ZWN1dGVzIGFsZXJ0IGRpc3BsYXkgdGhyb3VnaCBgc2hvd0FsZXJ0YCBpZiBkZWZpbmVkLlxuICpcbiAqIEBleGFtcGxlXG4gKiBjb25zdCBvcHRpb25zID0ge1xuICogICBuYW1lOiAnQWxpY2UnLFxuICogICBzaG93QWxlcnQ6ICh7IG1lc3NhZ2UsIHR5cGUsIGR1cmF0aW9uIH0pID0+IGNvbnNvbGUubG9nKG1lc3NhZ2UpXG4gKiB9O1xuICogcGVyc29uSm9pbmVkU2VydmljZS5wZXJzb25Kb2luZWQob3B0aW9ucyk7XG4gKiAvLyBMb2dzOiBcIkFsaWNlIGpvaW5lZCB0aGUgZXZlbnQuXCJcbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUGVyc29uSm9pbmVkIHtcbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGV2ZW50IHdoZW4gYSBwZXJzb24gam9pbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7UGVyc29uSm9pbmVkT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB0aGUgcGVyc29uIGpvaW5lZCBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwZXJzb24gd2hvIGpvaW5lZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5zaG93QWxlcnQgLSBBIGZ1bmN0aW9uIHRvIGRpc3BsYXkgYW4gYWxlcnQvbm90aWZpY2F0aW9uLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYWxlcnQgaGFzIGJlZW4gc2hvd24uXG4gICAqL1xuICBwZXJzb25Kb2luZWQgPSAoeyBuYW1lLCBzaG93QWxlcnQgfTogUGVyc29uSm9pbmVkT3B0aW9ucyk6IHZvaWQgPT4ge1xuICAgIC8vIERpc3BsYXkgYW4gYWxlcnQvbm90aWZpY2F0aW9uIGFib3V0IHRoZSBwZXJzb24gam9pbmluZyB0aGUgZXZlbnRcbiAgICBzaG93QWxlcnQ/Lih7XG4gICAgICBtZXNzYWdlOiBgJHtuYW1lfSBqb2luZWQgdGhlIGV2ZW50LmAsXG4gICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==