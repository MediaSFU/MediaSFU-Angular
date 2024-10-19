import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class AutoAdjust {
    /**
     * Adjusts values based on the provided options.
     *
     * @param {AutoAdjustOptions} options - The options for auto adjustment.
     * @param {number} options.n - The number of participants.
     * @param {string} options.eventType - The type of event (e.g., 'broadcast', 'chat', 'conference').
     * @param {boolean} options.shareScreenStarted - Indicates if screen sharing has started.
     * @param {boolean} options.shared - Indicates if something is shared.
     *
     * @returns {Promise<number[]>} A promise that resolves to an array containing the adjusted values.
     */
    async autoAdjust({ n, eventType, shareScreenStarted, shared, }) {
        // Default values
        let val1 = 6;
        let val2 = 12 - val1;
        // Calculate percentage values
        // Adjust values based on eventType and other conditions
        if (eventType === 'broadcast') {
            val1 = 0;
            val2 = 12 - val1;
        }
        else if (eventType === 'chat' ||
            (eventType === 'conference' && !(shareScreenStarted || shared))) {
            val1 = 12;
            val2 = 12 - val1;
        }
        else {
            if (shareScreenStarted || shared) {
                val2 = 10;
                val1 = 12 - val2;
            }
            else {
                // Adjust values based on the number of participants (n)
                if (n === 0) {
                    val1 = 1;
                    val2 = 12 - val1;
                }
                else if (n >= 1 && n < 4) {
                    val1 = 4;
                    val2 = 12 - val1;
                }
                else if (n >= 4 && n < 6) {
                    val1 = 6;
                    val2 = 12 - val1;
                }
                else if (n >= 6 && n < 9) {
                    val1 = 6;
                    val2 = 12 - val1;
                }
                else if (n >= 9 && n < 12) {
                    val1 = 6;
                    val2 = 12 - val1;
                }
                else if (n >= 12 && n < 20) {
                    val1 = 8;
                    val2 = 12 - val1;
                }
                else if (n >= 20 && n < 50) {
                    val1 = 8;
                    val2 = 12 - val1;
                }
                else {
                    val1 = 10;
                    val2 = 12 - val1;
                }
            }
        }
        // Return an array with adjusted values
        return [val1, val2];
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AutoAdjust, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AutoAdjust, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AutoAdjust, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0by1hZGp1c3Quc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvYXV0by1hZGp1c3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQWUzQyxNQUFNLE9BQU8sVUFBVTtJQUNyQjs7Ozs7Ozs7OztPQVVHO0lBQ0gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUNmLENBQUMsRUFDRCxTQUFTLEVBQ1Qsa0JBQWtCLEVBQ2xCLE1BQU0sR0FDWTtRQUNsQixpQkFBaUI7UUFDakIsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBQ2IsSUFBSSxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUVyQiw4QkFBOEI7UUFFOUIsd0RBQXdEO1FBQ3hELElBQUksU0FBUyxLQUFLLFdBQVcsRUFBRSxDQUFDO1lBQzlCLElBQUksR0FBRyxDQUFDLENBQUM7WUFDVCxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNuQixDQUFDO2FBQU0sSUFDTCxTQUFTLEtBQUssTUFBTTtZQUNwQixDQUFDLFNBQVMsS0FBSyxZQUFZLElBQUksQ0FBQyxDQUFDLGtCQUFrQixJQUFJLE1BQU0sQ0FBQyxDQUFDLEVBQy9ELENBQUM7WUFDRCxJQUFJLEdBQUcsRUFBRSxDQUFDO1lBQ1YsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDbkIsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLGtCQUFrQixJQUFJLE1BQU0sRUFBRSxDQUFDO2dCQUNqQyxJQUFJLEdBQUcsRUFBRSxDQUFDO2dCQUNWLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1lBQ25CLENBQUM7aUJBQU0sQ0FBQztnQkFDTix3REFBd0Q7Z0JBQ3hELElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO29CQUNaLElBQUksR0FBRyxDQUFDLENBQUM7b0JBQ1QsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7Z0JBQ25CLENBQUM7cUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQztvQkFDM0IsSUFBSSxHQUFHLENBQUMsQ0FBQztvQkFDVCxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFDbkIsQ0FBQztxQkFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO29CQUMzQixJQUFJLEdBQUcsQ0FBQyxDQUFDO29CQUNULElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixDQUFDO3FCQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7b0JBQzNCLElBQUksR0FBRyxDQUFDLENBQUM7b0JBQ1QsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7Z0JBQ25CLENBQUM7cUJBQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxHQUFHLENBQUMsQ0FBQztvQkFDVCxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztnQkFDbkIsQ0FBQztxQkFBTSxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDO29CQUM3QixJQUFJLEdBQUcsQ0FBQyxDQUFDO29CQUNULElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixDQUFDO3FCQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUM7b0JBQzdCLElBQUksR0FBRyxDQUFDLENBQUM7b0JBQ1QsSUFBSSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7Z0JBQ25CLENBQUM7cUJBQU0sQ0FBQztvQkFDTixJQUFJLEdBQUcsRUFBRSxDQUFDO29CQUNWLElBQUksR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO2dCQUNuQixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUM7UUFFRCx1Q0FBdUM7UUFDdkMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN0QixDQUFDO3VHQXRFVSxVQUFVOzJHQUFWLFVBQVUsY0FGVCxNQUFNOzsyRkFFUCxVQUFVO2tCQUh0QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQXV0b0FkanVzdE9wdGlvbnMge1xuICBuOiBudW1iZXI7XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHNoYXJlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgQXV0b0FkanVzdFR5cGUgPSAob3B0aW9uczogQXV0b0FkanVzdE9wdGlvbnMpID0+IFByb21pc2U8bnVtYmVyW10+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgQXV0b0FkanVzdCB7XG4gIC8qKlxuICAgKiBBZGp1c3RzIHZhbHVlcyBiYXNlZCBvbiB0aGUgcHJvdmlkZWQgb3B0aW9ucy5cbiAgICpcbiAgICogQHBhcmFtIHtBdXRvQWRqdXN0T3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBhdXRvIGFkanVzdG1lbnQuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLm4gLSBUaGUgbnVtYmVyIG9mIHBhcnRpY2lwYW50cy5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgKGUuZy4sICdicm9hZGNhc3QnLCAnY2hhdCcsICdjb25mZXJlbmNlJykuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5zaGFyZVNjcmVlblN0YXJ0ZWQgLSBJbmRpY2F0ZXMgaWYgc2NyZWVuIHNoYXJpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gb3B0aW9ucy5zaGFyZWQgLSBJbmRpY2F0ZXMgaWYgc29tZXRoaW5nIGlzIHNoYXJlZC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8bnVtYmVyW10+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB0byBhbiBhcnJheSBjb250YWluaW5nIHRoZSBhZGp1c3RlZCB2YWx1ZXMuXG4gICAqL1xuICBhc3luYyBhdXRvQWRqdXN0KHtcbiAgICBuLFxuICAgIGV2ZW50VHlwZSxcbiAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgc2hhcmVkLFxuICB9OiBBdXRvQWRqdXN0T3B0aW9ucyk6IFByb21pc2U8bnVtYmVyW10+IHtcbiAgICAvLyBEZWZhdWx0IHZhbHVlc1xuICAgIGxldCB2YWwxID0gNjtcbiAgICBsZXQgdmFsMiA9IDEyIC0gdmFsMTtcblxuICAgIC8vIENhbGN1bGF0ZSBwZXJjZW50YWdlIHZhbHVlc1xuXG4gICAgLy8gQWRqdXN0IHZhbHVlcyBiYXNlZCBvbiBldmVudFR5cGUgYW5kIG90aGVyIGNvbmRpdGlvbnNcbiAgICBpZiAoZXZlbnRUeXBlID09PSAnYnJvYWRjYXN0Jykge1xuICAgICAgdmFsMSA9IDA7XG4gICAgICB2YWwyID0gMTIgLSB2YWwxO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBldmVudFR5cGUgPT09ICdjaGF0JyB8fFxuICAgICAgKGV2ZW50VHlwZSA9PT0gJ2NvbmZlcmVuY2UnICYmICEoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkpXG4gICAgKSB7XG4gICAgICB2YWwxID0gMTI7XG4gICAgICB2YWwyID0gMTIgLSB2YWwxO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkge1xuICAgICAgICB2YWwyID0gMTA7XG4gICAgICAgIHZhbDEgPSAxMiAtIHZhbDI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBZGp1c3QgdmFsdWVzIGJhc2VkIG9uIHRoZSBudW1iZXIgb2YgcGFydGljaXBhbnRzIChuKVxuICAgICAgICBpZiAobiA9PT0gMCkge1xuICAgICAgICAgIHZhbDEgPSAxO1xuICAgICAgICAgIHZhbDIgPSAxMiAtIHZhbDE7XG4gICAgICAgIH0gZWxzZSBpZiAobiA+PSAxICYmIG4gPCA0KSB7XG4gICAgICAgICAgdmFsMSA9IDQ7XG4gICAgICAgICAgdmFsMiA9IDEyIC0gdmFsMTtcbiAgICAgICAgfSBlbHNlIGlmIChuID49IDQgJiYgbiA8IDYpIHtcbiAgICAgICAgICB2YWwxID0gNjtcbiAgICAgICAgICB2YWwyID0gMTIgLSB2YWwxO1xuICAgICAgICB9IGVsc2UgaWYgKG4gPj0gNiAmJiBuIDwgOSkge1xuICAgICAgICAgIHZhbDEgPSA2O1xuICAgICAgICAgIHZhbDIgPSAxMiAtIHZhbDE7XG4gICAgICAgIH0gZWxzZSBpZiAobiA+PSA5ICYmIG4gPCAxMikge1xuICAgICAgICAgIHZhbDEgPSA2O1xuICAgICAgICAgIHZhbDIgPSAxMiAtIHZhbDE7XG4gICAgICAgIH0gZWxzZSBpZiAobiA+PSAxMiAmJiBuIDwgMjApIHtcbiAgICAgICAgICB2YWwxID0gODtcbiAgICAgICAgICB2YWwyID0gMTIgLSB2YWwxO1xuICAgICAgICB9IGVsc2UgaWYgKG4gPj0gMjAgJiYgbiA8IDUwKSB7XG4gICAgICAgICAgdmFsMSA9IDg7XG4gICAgICAgICAgdmFsMiA9IDEyIC0gdmFsMTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YWwxID0gMTA7XG4gICAgICAgICAgdmFsMiA9IDEyIC0gdmFsMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBhcnJheSB3aXRoIGFkanVzdGVkIHZhbHVlc1xuICAgIHJldHVybiBbdmFsMSwgdmFsMl07XG4gIH1cbn1cbiJdfQ==