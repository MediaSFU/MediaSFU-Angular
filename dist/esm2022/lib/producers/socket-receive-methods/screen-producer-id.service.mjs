import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class ScreenProducerId {
    /**
     * Handles the screen producer id.
     *
     * @param producerId - The id of the producer.
     * @param screenId - The id of the screen.
     * @param membersReceived - Whether the members data has been received.
     * @param shareScreenStarted - Whether the screen sharing has started.
     * @param deferScreenReceived - Whether the screen sharing has been deferred.
     * @param participants - The list of participants.
     * @param updateScreenId - Function to update the screen id.
     * @param updateShareScreenStarted - Function to update the screen sharing status.
     * @param updateDeferScreenReceived - Function to update the screen sharing defer status.
     */
    screenProducerId = ({ producerId, screenId, membersReceived, shareScreenStarted, deferScreenReceived, participants, updateScreenId, updateShareScreenStarted, updateDeferScreenReceived, }) => {
        // Check if members data has been received with the screenId participant in it
        let host = participants.find((participant) => participant.ScreenID === screenId && participant.ScreenOn === true);
        // Operations to update the UI
        if (host && membersReceived) {
            screenId = producerId;
            shareScreenStarted = true;
            deferScreenReceived = false;
            updateScreenId(screenId);
            updateShareScreenStarted(shareScreenStarted);
            updateDeferScreenReceived(deferScreenReceived);
        }
        else {
            deferScreenReceived = true;
            screenId = producerId;
            updateScreenId(screenId);
            updateDeferScreenReceived(deferScreenReceived);
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ScreenProducerId, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ScreenProducerId, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ScreenProducerId, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuLXByb2R1Y2VyLWlkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvc2NyZWVuLXByb2R1Y2VyLWlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFxQjNDLE1BQU0sT0FBTyxnQkFBZ0I7SUFDM0I7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsZ0JBQWdCLEdBQUcsQ0FBQyxFQUNsQixVQUFVLEVBQ1YsUUFBUSxFQUNSLGVBQWUsRUFDZixrQkFBa0IsRUFDbEIsbUJBQW1CLEVBQ25CLFlBQVksRUFDWixjQUFjLEVBQ2Qsd0JBQXdCLEVBQ3hCLHlCQUF5QixHQUNELEVBQVEsRUFBRTtRQUNsQyw4RUFBOEU7UUFDOUUsSUFBSSxJQUFJLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FDMUIsQ0FBQyxXQUF3QixFQUFFLEVBQUUsQ0FDM0IsV0FBVyxDQUFDLFFBQVEsS0FBSyxRQUFRLElBQUksV0FBVyxDQUFDLFFBQVEsS0FBSyxJQUFJLENBQ3JFLENBQUM7UUFFRiw4QkFBOEI7UUFDOUIsSUFBSSxJQUFJLElBQUksZUFBZSxFQUFFLENBQUM7WUFDNUIsUUFBUSxHQUFHLFVBQVUsQ0FBQztZQUN0QixrQkFBa0IsR0FBRyxJQUFJLENBQUM7WUFDMUIsbUJBQW1CLEdBQUcsS0FBSyxDQUFDO1lBRTVCLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6Qix3QkFBd0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1lBQzdDLHlCQUF5QixDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDakQsQ0FBQzthQUFNLENBQUM7WUFDTixtQkFBbUIsR0FBRyxJQUFJLENBQUM7WUFDM0IsUUFBUSxHQUFHLFVBQVUsQ0FBQztZQUV0QixjQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDekIseUJBQXlCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqRCxDQUFDO0lBQ0gsQ0FBQyxDQUFDO3VHQS9DUyxnQkFBZ0I7MkdBQWhCLGdCQUFnQixjQUZmLE1BQU07OzJGQUVQLGdCQUFnQjtrQkFINUIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2NyZWVuUHJvZHVjZXJJZE9wdGlvbnMge1xuICBwcm9kdWNlcklkOiBzdHJpbmc7XG4gIHNjcmVlbklkOiBzdHJpbmc7XG4gIG1lbWJlcnNSZWNlaXZlZDogYm9vbGVhbjtcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICBkZWZlclNjcmVlblJlY2VpdmVkOiBib29sZWFuO1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIHVwZGF0ZVNjcmVlbklkOiAoaWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkOiAoc3RhcnRlZDogYm9vbGVhbikgPT4gdm9pZDtcbiAgdXBkYXRlRGVmZXJTY3JlZW5SZWNlaXZlZDogKHJlY2VpdmVkOiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBTY3JlZW5Qcm9kdWNlcklkVHlwZSA9IChvcHRpb25zOiBTY3JlZW5Qcm9kdWNlcklkT3B0aW9ucykgPT4gdm9pZDtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNjcmVlblByb2R1Y2VySWQge1xuICAvKipcbiAgICogSGFuZGxlcyB0aGUgc2NyZWVuIHByb2R1Y2VyIGlkLlxuICAgKlxuICAgKiBAcGFyYW0gcHJvZHVjZXJJZCAtIFRoZSBpZCBvZiB0aGUgcHJvZHVjZXIuXG4gICAqIEBwYXJhbSBzY3JlZW5JZCAtIFRoZSBpZCBvZiB0aGUgc2NyZWVuLlxuICAgKiBAcGFyYW0gbWVtYmVyc1JlY2VpdmVkIC0gV2hldGhlciB0aGUgbWVtYmVycyBkYXRhIGhhcyBiZWVuIHJlY2VpdmVkLlxuICAgKiBAcGFyYW0gc2hhcmVTY3JlZW5TdGFydGVkIC0gV2hldGhlciB0aGUgc2NyZWVuIHNoYXJpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSBkZWZlclNjcmVlblJlY2VpdmVkIC0gV2hldGhlciB0aGUgc2NyZWVuIHNoYXJpbmcgaGFzIGJlZW4gZGVmZXJyZWQuXG4gICAqIEBwYXJhbSBwYXJ0aWNpcGFudHMgLSBUaGUgbGlzdCBvZiBwYXJ0aWNpcGFudHMuXG4gICAqIEBwYXJhbSB1cGRhdGVTY3JlZW5JZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2NyZWVuIGlkLlxuICAgKiBAcGFyYW0gdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW4gc2hhcmluZyBzdGF0dXMuXG4gICAqIEBwYXJhbSB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW4gc2hhcmluZyBkZWZlciBzdGF0dXMuXG4gICAqL1xuICBzY3JlZW5Qcm9kdWNlcklkID0gKHtcbiAgICBwcm9kdWNlcklkLFxuICAgIHNjcmVlbklkLFxuICAgIG1lbWJlcnNSZWNlaXZlZCxcbiAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgZGVmZXJTY3JlZW5SZWNlaXZlZCxcbiAgICBwYXJ0aWNpcGFudHMsXG4gICAgdXBkYXRlU2NyZWVuSWQsXG4gICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkLFxuICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQsXG4gIH06IFNjcmVlblByb2R1Y2VySWRPcHRpb25zKTogdm9pZCA9PiB7XG4gICAgLy8gQ2hlY2sgaWYgbWVtYmVycyBkYXRhIGhhcyBiZWVuIHJlY2VpdmVkIHdpdGggdGhlIHNjcmVlbklkIHBhcnRpY2lwYW50IGluIGl0XG4gICAgbGV0IGhvc3QgPSBwYXJ0aWNpcGFudHMuZmluZChcbiAgICAgIChwYXJ0aWNpcGFudDogUGFydGljaXBhbnQpID0+XG4gICAgICAgIHBhcnRpY2lwYW50LlNjcmVlbklEID09PSBzY3JlZW5JZCAmJiBwYXJ0aWNpcGFudC5TY3JlZW5PbiA9PT0gdHJ1ZSxcbiAgICApO1xuXG4gICAgLy8gT3BlcmF0aW9ucyB0byB1cGRhdGUgdGhlIFVJXG4gICAgaWYgKGhvc3QgJiYgbWVtYmVyc1JlY2VpdmVkKSB7XG4gICAgICBzY3JlZW5JZCA9IHByb2R1Y2VySWQ7XG4gICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgZGVmZXJTY3JlZW5SZWNlaXZlZCA9IGZhbHNlO1xuXG4gICAgICB1cGRhdGVTY3JlZW5JZChzY3JlZW5JZCk7XG4gICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQoc2hhcmVTY3JlZW5TdGFydGVkKTtcbiAgICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQoZGVmZXJTY3JlZW5SZWNlaXZlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlZmVyU2NyZWVuUmVjZWl2ZWQgPSB0cnVlO1xuICAgICAgc2NyZWVuSWQgPSBwcm9kdWNlcklkO1xuXG4gICAgICB1cGRhdGVTY3JlZW5JZChzY3JlZW5JZCk7XG4gICAgICB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkKGRlZmVyU2NyZWVuUmVjZWl2ZWQpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==