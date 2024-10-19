import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGVyc29uLWpvaW5lZC5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL3Byb2R1Y2Vycy9zb2NrZXQtcmVjZWl2ZS1tZXRob2RzL3BlcnNvbi1qb2luZWQuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWMzQyxNQUFNLE9BQU8sWUFBWTtJQUN2Qjs7Ozs7OztPQU9HO0lBQ0gsWUFBWSxHQUFHLENBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUF1QixFQUFRLEVBQUU7UUFDaEUsbUVBQW1FO1FBQ25FLFNBQVMsRUFBRSxDQUFDO1lBQ1YsT0FBTyxFQUFFLEdBQUcsSUFBSSxvQkFBb0I7WUFDcEMsSUFBSSxFQUFFLFNBQVM7WUFDZixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQzt1R0FoQlMsWUFBWTsyR0FBWixZQUFZLGNBRlgsTUFBTTs7MkZBRVAsWUFBWTtrQkFIeEIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTaG93QWxlcnQgfSBmcm9tICcuLi8uLi9AdHlwZXMvdHlwZXMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIFBlcnNvbkpvaW5lZE9wdGlvbnMge1xuICBzaG93QWxlcnQ/OiBTaG93QWxlcnQ7XG4gIG5hbWU6IHN0cmluZztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUGVyc29uSm9pbmVkVHlwZSA9IChvcHRpb25zOiBQZXJzb25Kb2luZWRPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUGVyc29uSm9pbmVkIHtcbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGV2ZW50IHdoZW4gYSBwZXJzb24gam9pbnMuXG4gICAqXG4gICAqIEBwYXJhbSB7UGVyc29uSm9pbmVkT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB0aGUgcGVyc29uIGpvaW5lZCBldmVudC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwZXJzb24gd2hvIGpvaW5lZC5cbiAgICogQHBhcmFtIHtGdW5jdGlvbn0gb3B0aW9ucy5zaG93QWxlcnQgLSBBIGZ1bmN0aW9uIHRvIGRpc3BsYXkgYW4gYWxlcnQvbm90aWZpY2F0aW9uLlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgYWxlcnQgaGFzIGJlZW4gc2hvd24uXG4gICAqL1xuICBwZXJzb25Kb2luZWQgPSAoeyBuYW1lLCBzaG93QWxlcnQgfTogUGVyc29uSm9pbmVkT3B0aW9ucyk6IHZvaWQgPT4ge1xuICAgIC8vIERpc3BsYXkgYW4gYWxlcnQvbm90aWZpY2F0aW9uIGFib3V0IHRoZSBwZXJzb24gam9pbmluZyB0aGUgZXZlbnRcbiAgICBzaG93QWxlcnQ/Lih7XG4gICAgICBtZXNzYWdlOiBgJHtuYW1lfSBqb2luZWQgdGhlIGV2ZW50LmAsXG4gICAgICB0eXBlOiAnc3VjY2VzcycsXG4gICAgICBkdXJhdGlvbjogMzAwMCxcbiAgICB9KTtcbiAgfTtcbn1cbiJdfQ==