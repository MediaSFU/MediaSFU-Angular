import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class FormatNumber {
    /**
     * Formats a number into a string representation with appropriate suffixes (K, M, B).
     *
     * @param number - The number to format.
     * @returns A promise that resolves to a formatted string or undefined if the input is falsy.
     *
     * @example
     * ```typescript
     * formatNumber(500); // "500"
     * formatNumber(1500); // "1.5K"
     * formatNumber(1500000); // "1.5M"
     * formatNumber(1500000000); // "1.5B"
     * ```
     */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybWF0LW51bWJlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvdXRpbHMvZm9ybWF0LW51bWJlci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBVzNDLE1BQU0sT0FBTyxZQUFZO0lBQ3ZCOzs7Ozs7Ozs7Ozs7O09BYUc7SUFFSCxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsTUFBTSxFQUF1QjtRQUNoRCxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQ1gsSUFBSSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0JBQ2pCLE9BQU8sTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzNCLENBQUM7aUJBQU0sSUFBSSxNQUFNLEdBQUcsR0FBRyxFQUFFLENBQUM7Z0JBQ3hCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztZQUN6QyxDQUFDO2lCQUFNLElBQUksTUFBTSxHQUFHLEdBQUcsRUFBRSxDQUFDO2dCQUN4QixPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7WUFDekMsQ0FBQztpQkFBTSxJQUFJLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQztnQkFDekIsT0FBTyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO1lBQ3pDLENBQUM7UUFDSCxDQUFDO1FBQ0QsMENBQTBDO1FBQzFDLE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7dUdBOUJVLFlBQVk7MkdBQVosWUFBWSxjQUZYLE1BQU07OzJGQUVQLFlBQVk7a0JBSHhCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBGb3JtYXROdW1iZXJPcHRpb25zIHtcbiAgbnVtYmVyOiBudW1iZXI7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEZvcm1hdE51bWJlclR5cGUgPSAob3B0aW9uczogRm9ybWF0TnVtYmVyT3B0aW9ucykgPT4gUHJvbWlzZTxzdHJpbmcgfCB1bmRlZmluZWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgRm9ybWF0TnVtYmVyIHtcbiAgLyoqXG4gICAqIEZvcm1hdHMgYSBudW1iZXIgaW50byBhIHN0cmluZyByZXByZXNlbnRhdGlvbiB3aXRoIGFwcHJvcHJpYXRlIHN1ZmZpeGVzIChLLCBNLCBCKS5cbiAgICpcbiAgICogQHBhcmFtIG51bWJlciAtIFRoZSBudW1iZXIgdG8gZm9ybWF0LlxuICAgKiBAcmV0dXJucyBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhIGZvcm1hdHRlZCBzdHJpbmcgb3IgdW5kZWZpbmVkIGlmIHRoZSBpbnB1dCBpcyBmYWxzeS5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBmb3JtYXROdW1iZXIoNTAwKTsgLy8gXCI1MDBcIlxuICAgKiBmb3JtYXROdW1iZXIoMTUwMCk7IC8vIFwiMS41S1wiXG4gICAqIGZvcm1hdE51bWJlcigxNTAwMDAwKTsgLy8gXCIxLjVNXCJcbiAgICogZm9ybWF0TnVtYmVyKDE1MDAwMDAwMDApOyAvLyBcIjEuNUJcIlxuICAgKiBgYGBcbiAgICovXG5cbiAgYXN5bmMgZm9ybWF0TnVtYmVyKHsgbnVtYmVyIH06IEZvcm1hdE51bWJlck9wdGlvbnMpOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuICAgIGlmIChudW1iZXIpIHtcbiAgICAgIGlmIChudW1iZXIgPCAxZTMpIHtcbiAgICAgICAgcmV0dXJuIG51bWJlci50b1N0cmluZygpO1xuICAgICAgfSBlbHNlIGlmIChudW1iZXIgPCAxZTYpIHtcbiAgICAgICAgcmV0dXJuIChudW1iZXIgLyAxZTMpLnRvRml4ZWQoMSkgKyAnSyc7XG4gICAgICB9IGVsc2UgaWYgKG51bWJlciA8IDFlOSkge1xuICAgICAgICByZXR1cm4gKG51bWJlciAvIDFlNikudG9GaXhlZCgxKSArICdNJztcbiAgICAgIH0gZWxzZSBpZiAobnVtYmVyIDwgMWUxMikge1xuICAgICAgICByZXR1cm4gKG51bWJlciAvIDFlOSkudG9GaXhlZCgxKSArICdCJztcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gUmV0dXJuIHVuZGVmaW5lZCBmb3IgZmFsc3kgaW5wdXQgdmFsdWVzXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxufVxuIl19