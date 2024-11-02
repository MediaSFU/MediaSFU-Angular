import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * The `FormatNumber` service provides functionality to format numeric values
 * into a more readable string representation, appending appropriate suffixes
 * like K (thousands), M (millions), and B (billions).
 *
 * @service
 * @example
 * ```typescript
 * import { FormatNumber } from 'mediasfu-angular';
 *
 * constructor(private formatNumber: FormatNumber) {}
 *
 * async displayFormattedNumber() {
 *   const formatted = await this.formatNumber.formatNumber({ number: 1500 });
 *   console.log(formatted); // Outputs: "1.5K"
 * }
 * ```
 *
 * @remarks
 * This service can be useful for displaying large numbers in a more compact form
 * in user interfaces, especially in dashboards or reports where space is limited.
 *
 * @property {FormatNumberOptions} options - Options containing the number to format.
 *
 * @returns {FormatNumber} The FormatNumber service for formatting numeric values.
 */
export class FormatNumber {
    async formatNumber({ number }) {
        if (number) {
            if (number < 1e3) {
                return number.toString();
            }
            else if (number < 1e6) {
                return (number / 1e3).toFixed(1) + 'K';
            }
            else if (number < 1e9) {
                return (number / 1e6).toFixed(1) + 'M';
            }
            else if (number < 1e12) {
                return (number / 1e9).toFixed(1) + 'B';
            }
        }
        // Return undefined for falsy input values
        return undefined;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: FormatNumber, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: FormatNumber, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: FormatNumber, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LW51bWJlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvdXRpbHMvZm9ybWF0LW51bWJlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBUTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBS0gsTUFBTSxPQUFPLFlBQVk7SUFFdkIsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLE1BQU0sRUFBdUI7UUFDaEQsSUFBSSxNQUFNLEVBQUUsQ0FBQztZQUNYLElBQUksTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO2dCQUNqQixPQUFPLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzQixDQUFDO2lCQUFNLElBQUksTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO2dCQUN4QixPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDekMsQ0FBQztpQkFBTSxJQUFJLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQztnQkFDeEIsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3pDLENBQUM7aUJBQU0sSUFBSSxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUM7Z0JBQ3pCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUN6QyxDQUFDO1FBQ0gsQ0FBQztRQUNELDBDQUEwQztRQUMxQyxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO3VHQWhCVSxZQUFZOzJHQUFaLFlBQVksY0FGWCxNQUFNOzsyRkFFUCxZQUFZO2tCQUh4QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgRm9ybWF0TnVtYmVyT3B0aW9ucyB7XG4gIG51bWJlcjogbnVtYmVyO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBGb3JtYXROdW1iZXJUeXBlID0gKG9wdGlvbnM6IEZvcm1hdE51bWJlck9wdGlvbnMpID0+IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPjtcblxuLyoqXG4gKiBUaGUgYEZvcm1hdE51bWJlcmAgc2VydmljZSBwcm92aWRlcyBmdW5jdGlvbmFsaXR5IHRvIGZvcm1hdCBudW1lcmljIHZhbHVlc1xuICogaW50byBhIG1vcmUgcmVhZGFibGUgc3RyaW5nIHJlcHJlc2VudGF0aW9uLCBhcHBlbmRpbmcgYXBwcm9wcmlhdGUgc3VmZml4ZXNcbiAqIGxpa2UgSyAodGhvdXNhbmRzKSwgTSAobWlsbGlvbnMpLCBhbmQgQiAoYmlsbGlvbnMpLlxuICpcbiAqIEBzZXJ2aWNlXG4gKiBAZXhhbXBsZVxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHsgRm9ybWF0TnVtYmVyIH0gZnJvbSAnbWVkaWFzZnUtYW5ndWxhcic7XG4gKlxuICogY29uc3RydWN0b3IocHJpdmF0ZSBmb3JtYXROdW1iZXI6IEZvcm1hdE51bWJlcikge31cbiAqXG4gKiBhc3luYyBkaXNwbGF5Rm9ybWF0dGVkTnVtYmVyKCkge1xuICogICBjb25zdCBmb3JtYXR0ZWQgPSBhd2FpdCB0aGlzLmZvcm1hdE51bWJlci5mb3JtYXROdW1iZXIoeyBudW1iZXI6IDE1MDAgfSk7XG4gKiAgIGNvbnNvbGUubG9nKGZvcm1hdHRlZCk7IC8vIE91dHB1dHM6IFwiMS41S1wiXG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAcmVtYXJrc1xuICogVGhpcyBzZXJ2aWNlIGNhbiBiZSB1c2VmdWwgZm9yIGRpc3BsYXlpbmcgbGFyZ2UgbnVtYmVycyBpbiBhIG1vcmUgY29tcGFjdCBmb3JtXG4gKiBpbiB1c2VyIGludGVyZmFjZXMsIGVzcGVjaWFsbHkgaW4gZGFzaGJvYXJkcyBvciByZXBvcnRzIHdoZXJlIHNwYWNlIGlzIGxpbWl0ZWQuXG4gKlxuICogQHByb3BlcnR5IHtGb3JtYXROdW1iZXJPcHRpb25zfSBvcHRpb25zIC0gT3B0aW9ucyBjb250YWluaW5nIHRoZSBudW1iZXIgdG8gZm9ybWF0LlxuICpcbiAqIEByZXR1cm5zIHtGb3JtYXROdW1iZXJ9IFRoZSBGb3JtYXROdW1iZXIgc2VydmljZSBmb3IgZm9ybWF0dGluZyBudW1lcmljIHZhbHVlcy5cbiAqL1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWF0TnVtYmVyIHtcblxuICBhc3luYyBmb3JtYXROdW1iZXIoeyBudW1iZXIgfTogRm9ybWF0TnVtYmVyT3B0aW9ucyk6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gICAgaWYgKG51bWJlcikge1xuICAgICAgaWYgKG51bWJlciA8IDFlMykge1xuICAgICAgICByZXR1cm4gbnVtYmVyLnRvU3RyaW5nKCk7XG4gICAgICB9IGVsc2UgaWYgKG51bWJlciA8IDFlNikge1xuICAgICAgICByZXR1cm4gKG51bWJlciAvIDFlMykudG9GaXhlZCgxKSArICdLJztcbiAgICAgIH0gZWxzZSBpZiAobnVtYmVyIDwgMWU5KSB7XG4gICAgICAgIHJldHVybiAobnVtYmVyIC8gMWU2KS50b0ZpeGVkKDEpICsgJ00nO1xuICAgICAgfSBlbHNlIGlmIChudW1iZXIgPCAxZTEyKSB7XG4gICAgICAgIHJldHVybiAobnVtYmVyIC8gMWU5KS50b0ZpeGVkKDEpICsgJ0InO1xuICAgICAgfVxuICAgIH1cbiAgICAvLyBSZXR1cm4gdW5kZWZpbmVkIGZvciBmYWxzeSBpbnB1dCB2YWx1ZXNcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG59XG4iXX0=