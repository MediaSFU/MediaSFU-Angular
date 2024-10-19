import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class GenerateRandomWaitingRoomList {
    /**
     * Generates a random list of participants for a waiting room.
     *
     * @param options - Configuration options for generating the waiting room list.
     * @returns An array of `WaitingRoomParticipant` objects, each with a random name, mute status, and unique ID.
     *
     * @example
     * const options = {};
     * const waitingRoomList = generateRandomWaitingRoomList(options);
     * console.log(waitingRoomList);
     */
    generateRandomWaitingRoomList() {
        // Array of random names to assign to participants in the waiting room
        const names = ['Dimen', 'Nore', 'Ker', 'Lor', 'Mik'];
        // Loop through the names array and add participants to the waiting room list
        const waitingRoomList = [];
        for (let i = 0; i < names.length; i++) {
            const randomName = names[i];
            waitingRoomList.push({
                name: randomName,
                id: i.toString(),
            });
        }
        return waitingRoomList;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomWaitingRoomList, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomWaitingRoomList, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomWaitingRoomList, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtcmFuZG9tLXdhaXRpbmctcm9vbS1saXN0LnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy91dGlscy9nZW5lcmF0ZS1yYW5kb20td2FpdGluZy1yb29tLWxpc3Quc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVMzQyxNQUFNLE9BQU8sNkJBQTZCO0lBQ3hDOzs7Ozs7Ozs7O09BVUc7SUFDSCw2QkFBNkI7UUFDM0Isc0VBQXNFO1FBQ3RFLE1BQU0sS0FBSyxHQUFHLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXJELDZFQUE2RTtRQUM3RSxNQUFNLGVBQWUsR0FBRyxFQUFFLENBQUM7UUFDM0IsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUN0QyxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsZUFBZSxDQUFDLElBQUksQ0FBQztnQkFDbkIsSUFBSSxFQUFFLFVBQVU7Z0JBQ2hCLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFO2FBQ2pCLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxPQUFPLGVBQWUsQ0FBQztJQUN6QixDQUFDO3VHQTNCVSw2QkFBNkI7MkdBQTdCLDZCQUE2QixjQUY1QixNQUFNOzsyRkFFUCw2QkFBNkI7a0JBSHpDLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2FpdGluZ1Jvb21QYXJ0aWNpcGFudCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIEdlbmVyYXRlUmFuZG9tV2FpdGluZ1Jvb21MaXN0VHlwZSA9ICgpID0+IFdhaXRpbmdSb29tUGFydGljaXBhbnRbXTtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIEdlbmVyYXRlUmFuZG9tV2FpdGluZ1Jvb21MaXN0IHtcbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBhIHJhbmRvbSBsaXN0IG9mIHBhcnRpY2lwYW50cyBmb3IgYSB3YWl0aW5nIHJvb20uXG4gICAqXG4gICAqIEBwYXJhbSBvcHRpb25zIC0gQ29uZmlndXJhdGlvbiBvcHRpb25zIGZvciBnZW5lcmF0aW5nIHRoZSB3YWl0aW5nIHJvb20gbGlzdC5cbiAgICogQHJldHVybnMgQW4gYXJyYXkgb2YgYFdhaXRpbmdSb29tUGFydGljaXBhbnRgIG9iamVjdHMsIGVhY2ggd2l0aCBhIHJhbmRvbSBuYW1lLCBtdXRlIHN0YXR1cywgYW5kIHVuaXF1ZSBJRC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3Qgb3B0aW9ucyA9IHt9O1xuICAgKiBjb25zdCB3YWl0aW5nUm9vbUxpc3QgPSBnZW5lcmF0ZVJhbmRvbVdhaXRpbmdSb29tTGlzdChvcHRpb25zKTtcbiAgICogY29uc29sZS5sb2cod2FpdGluZ1Jvb21MaXN0KTtcbiAgICovXG4gIGdlbmVyYXRlUmFuZG9tV2FpdGluZ1Jvb21MaXN0KCk6IFdhaXRpbmdSb29tUGFydGljaXBhbnRbXSB7XG4gICAgLy8gQXJyYXkgb2YgcmFuZG9tIG5hbWVzIHRvIGFzc2lnbiB0byBwYXJ0aWNpcGFudHMgaW4gdGhlIHdhaXRpbmcgcm9vbVxuICAgIGNvbnN0IG5hbWVzID0gWydEaW1lbicsICdOb3JlJywgJ0tlcicsICdMb3InLCAnTWlrJ107XG5cbiAgICAvLyBMb29wIHRocm91Z2ggdGhlIG5hbWVzIGFycmF5IGFuZCBhZGQgcGFydGljaXBhbnRzIHRvIHRoZSB3YWl0aW5nIHJvb20gbGlzdFxuICAgIGNvbnN0IHdhaXRpbmdSb29tTGlzdCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IHJhbmRvbU5hbWUgPSBuYW1lc1tpXTtcbiAgICAgIHdhaXRpbmdSb29tTGlzdC5wdXNoKHtcbiAgICAgICAgbmFtZTogcmFuZG9tTmFtZSxcbiAgICAgICAgaWQ6IGkudG9TdHJpbmcoKSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB3YWl0aW5nUm9vbUxpc3Q7XG4gIH1cbn1cbiJdfQ==