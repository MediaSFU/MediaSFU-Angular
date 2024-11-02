import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to manage screen producer ID and screen sharing status for participants.
 *
 * @class
 * @name ScreenProducerId
 * @description This service processes and updates the screen producer ID, manages screen sharing states, and defers screen updates as needed based on participant data.
 *
 * @method
 * screenProducerId
 *
 * @param {ScreenProducerIdOptions} options - Options for handling screen producer ID:
 *   - `producerId` {string}: The ID of the screen producer.
 *   - `screenId` {string}: The current screen ID.
 *   - `membersReceived` {boolean}: Indicates if members data has been received.
 *   - `shareScreenStarted` {boolean}: Indicates if screen sharing has started.
 *   - `deferScreenReceived` {boolean}: Indicates if screen sharing should be deferred.
 *   - `participants` {Participant[]}: The list of current participants.
 *   - `updateScreenId` {Function}: Function to update the screen ID.
 *   - `updateShareScreenStarted` {Function}: Function to update the screen sharing status.
 *   - `updateDeferScreenReceived` {Function}: Function to update the deferred screen status.
 *
 * @returns {void} Updates states directly through provided functions.
 *
 * @example
 * const options = {
 *   producerId: 'abc123',
 *   screenId: 'screen45',
 *   membersReceived: true,
 *   shareScreenStarted: false,
 *   deferScreenReceived: false,
 *   participants: [
 *     { id: 'p1', ScreenID: 'screen45', ScreenOn: true },
 *     // Additional participants
 *   ],
 *   updateScreenId: (id) => console.log(`Screen ID updated to: ${id}`),
 *   updateShareScreenStarted: (started) => console.log(`Screen sharing started: ${started}`),
 *   updateDeferScreenReceived: (received) => console.log(`Screen sharing deferred: ${received}`)
 * };
 *
 * screenProducerIdService.screenProducerId(options);
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuLXByb2R1Y2VyLWlkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvc2NyZWVuLXByb2R1Y2VyLWlkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFrQjNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0NHO0FBTUgsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQjs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxnQkFBZ0IsR0FBRyxDQUFDLEVBQ2xCLFVBQVUsRUFDVixRQUFRLEVBQ1IsZUFBZSxFQUNmLGtCQUFrQixFQUNsQixtQkFBbUIsRUFDbkIsWUFBWSxFQUNaLGNBQWMsRUFDZCx3QkFBd0IsRUFDeEIseUJBQXlCLEdBQ0QsRUFBUSxFQUFFO1FBQ2xDLDhFQUE4RTtRQUM5RSxJQUFJLElBQUksR0FBRyxZQUFZLENBQUMsSUFBSSxDQUMxQixDQUFDLFdBQXdCLEVBQUUsRUFBRSxDQUMzQixXQUFXLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxXQUFXLENBQUMsUUFBUSxLQUFLLElBQUksQ0FDckUsQ0FBQztRQUVGLDhCQUE4QjtRQUM5QixJQUFJLElBQUksSUFBSSxlQUFlLEVBQUUsQ0FBQztZQUM1QixRQUFRLEdBQUcsVUFBVSxDQUFDO1lBQ3RCLGtCQUFrQixHQUFHLElBQUksQ0FBQztZQUMxQixtQkFBbUIsR0FBRyxLQUFLLENBQUM7WUFFNUIsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3pCLHdCQUF3QixDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDN0MseUJBQXlCLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUNqRCxDQUFDO2FBQU0sQ0FBQztZQUNOLG1CQUFtQixHQUFHLElBQUksQ0FBQztZQUMzQixRQUFRLEdBQUcsVUFBVSxDQUFDO1lBRXRCLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6Qix5QkFBeUIsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBQ2pELENBQUM7SUFDSCxDQUFDLENBQUM7dUdBL0NTLGdCQUFnQjsyR0FBaEIsZ0JBQWdCLGNBRmYsTUFBTTs7MkZBRVAsZ0JBQWdCO2tCQUg1QixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFBhcnRpY2lwYW50IH0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBTY3JlZW5Qcm9kdWNlcklkT3B0aW9ucyB7XG4gIHByb2R1Y2VySWQ6IHN0cmluZztcbiAgc2NyZWVuSWQ6IHN0cmluZztcbiAgbWVtYmVyc1JlY2VpdmVkOiBib29sZWFuO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIGRlZmVyU2NyZWVuUmVjZWl2ZWQ6IGJvb2xlYW47XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgdXBkYXRlU2NyZWVuSWQ6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQ6IChzdGFydGVkOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkOiAocmVjZWl2ZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFNjcmVlblByb2R1Y2VySWRUeXBlID0gKG9wdGlvbnM6IFNjcmVlblByb2R1Y2VySWRPcHRpb25zKSA9PiB2b2lkO1xuXG4vKipcbiAqIFNlcnZpY2UgdG8gbWFuYWdlIHNjcmVlbiBwcm9kdWNlciBJRCBhbmQgc2NyZWVuIHNoYXJpbmcgc3RhdHVzIGZvciBwYXJ0aWNpcGFudHMuXG4gKlxuICogQGNsYXNzXG4gKiBAbmFtZSBTY3JlZW5Qcm9kdWNlcklkXG4gKiBAZGVzY3JpcHRpb24gVGhpcyBzZXJ2aWNlIHByb2Nlc3NlcyBhbmQgdXBkYXRlcyB0aGUgc2NyZWVuIHByb2R1Y2VyIElELCBtYW5hZ2VzIHNjcmVlbiBzaGFyaW5nIHN0YXRlcywgYW5kIGRlZmVycyBzY3JlZW4gdXBkYXRlcyBhcyBuZWVkZWQgYmFzZWQgb24gcGFydGljaXBhbnQgZGF0YS5cbiAqXG4gKiBAbWV0aG9kXG4gKiBzY3JlZW5Qcm9kdWNlcklkXG4gKlxuICogQHBhcmFtIHtTY3JlZW5Qcm9kdWNlcklkT3B0aW9uc30gb3B0aW9ucyAtIE9wdGlvbnMgZm9yIGhhbmRsaW5nIHNjcmVlbiBwcm9kdWNlciBJRDpcbiAqICAgLSBgcHJvZHVjZXJJZGAge3N0cmluZ306IFRoZSBJRCBvZiB0aGUgc2NyZWVuIHByb2R1Y2VyLlxuICogICAtIGBzY3JlZW5JZGAge3N0cmluZ306IFRoZSBjdXJyZW50IHNjcmVlbiBJRC5cbiAqICAgLSBgbWVtYmVyc1JlY2VpdmVkYCB7Ym9vbGVhbn06IEluZGljYXRlcyBpZiBtZW1iZXJzIGRhdGEgaGFzIGJlZW4gcmVjZWl2ZWQuXG4gKiAgIC0gYHNoYXJlU2NyZWVuU3RhcnRlZGAge2Jvb2xlYW59OiBJbmRpY2F0ZXMgaWYgc2NyZWVuIHNoYXJpbmcgaGFzIHN0YXJ0ZWQuXG4gKiAgIC0gYGRlZmVyU2NyZWVuUmVjZWl2ZWRgIHtib29sZWFufTogSW5kaWNhdGVzIGlmIHNjcmVlbiBzaGFyaW5nIHNob3VsZCBiZSBkZWZlcnJlZC5cbiAqICAgLSBgcGFydGljaXBhbnRzYCB7UGFydGljaXBhbnRbXX06IFRoZSBsaXN0IG9mIGN1cnJlbnQgcGFydGljaXBhbnRzLlxuICogICAtIGB1cGRhdGVTY3JlZW5JZGAge0Z1bmN0aW9ufTogRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW4gSUQuXG4gKiAgIC0gYHVwZGF0ZVNoYXJlU2NyZWVuU3RhcnRlZGAge0Z1bmN0aW9ufTogRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW4gc2hhcmluZyBzdGF0dXMuXG4gKiAgIC0gYHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWRgIHtGdW5jdGlvbn06IEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgZGVmZXJyZWQgc2NyZWVuIHN0YXR1cy5cbiAqXG4gKiBAcmV0dXJucyB7dm9pZH0gVXBkYXRlcyBzdGF0ZXMgZGlyZWN0bHkgdGhyb3VnaCBwcm92aWRlZCBmdW5jdGlvbnMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGNvbnN0IG9wdGlvbnMgPSB7XG4gKiAgIHByb2R1Y2VySWQ6ICdhYmMxMjMnLFxuICogICBzY3JlZW5JZDogJ3NjcmVlbjQ1JyxcbiAqICAgbWVtYmVyc1JlY2VpdmVkOiB0cnVlLFxuICogICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGZhbHNlLFxuICogICBkZWZlclNjcmVlblJlY2VpdmVkOiBmYWxzZSxcbiAqICAgcGFydGljaXBhbnRzOiBbXG4gKiAgICAgeyBpZDogJ3AxJywgU2NyZWVuSUQ6ICdzY3JlZW40NScsIFNjcmVlbk9uOiB0cnVlIH0sXG4gKiAgICAgLy8gQWRkaXRpb25hbCBwYXJ0aWNpcGFudHNcbiAqICAgXSxcbiAqICAgdXBkYXRlU2NyZWVuSWQ6IChpZCkgPT4gY29uc29sZS5sb2coYFNjcmVlbiBJRCB1cGRhdGVkIHRvOiAke2lkfWApLFxuICogICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQ6IChzdGFydGVkKSA9PiBjb25zb2xlLmxvZyhgU2NyZWVuIHNoYXJpbmcgc3RhcnRlZDogJHtzdGFydGVkfWApLFxuICogICB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkOiAocmVjZWl2ZWQpID0+IGNvbnNvbGUubG9nKGBTY3JlZW4gc2hhcmluZyBkZWZlcnJlZDogJHtyZWNlaXZlZH1gKVxuICogfTtcbiAqXG4gKiBzY3JlZW5Qcm9kdWNlcklkU2VydmljZS5zY3JlZW5Qcm9kdWNlcklkKG9wdGlvbnMpO1xuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFNjcmVlblByb2R1Y2VySWQge1xuICAvKipcbiAgICogSGFuZGxlcyB0aGUgc2NyZWVuIHByb2R1Y2VyIGlkLlxuICAgKlxuICAgKiBAcGFyYW0gcHJvZHVjZXJJZCAtIFRoZSBpZCBvZiB0aGUgcHJvZHVjZXIuXG4gICAqIEBwYXJhbSBzY3JlZW5JZCAtIFRoZSBpZCBvZiB0aGUgc2NyZWVuLlxuICAgKiBAcGFyYW0gbWVtYmVyc1JlY2VpdmVkIC0gV2hldGhlciB0aGUgbWVtYmVycyBkYXRhIGhhcyBiZWVuIHJlY2VpdmVkLlxuICAgKiBAcGFyYW0gc2hhcmVTY3JlZW5TdGFydGVkIC0gV2hldGhlciB0aGUgc2NyZWVuIHNoYXJpbmcgaGFzIHN0YXJ0ZWQuXG4gICAqIEBwYXJhbSBkZWZlclNjcmVlblJlY2VpdmVkIC0gV2hldGhlciB0aGUgc2NyZWVuIHNoYXJpbmcgaGFzIGJlZW4gZGVmZXJyZWQuXG4gICAqIEBwYXJhbSBwYXJ0aWNpcGFudHMgLSBUaGUgbGlzdCBvZiBwYXJ0aWNpcGFudHMuXG4gICAqIEBwYXJhbSB1cGRhdGVTY3JlZW5JZCAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgc2NyZWVuIGlkLlxuICAgKiBAcGFyYW0gdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW4gc2hhcmluZyBzdGF0dXMuXG4gICAqIEBwYXJhbSB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkIC0gRnVuY3Rpb24gdG8gdXBkYXRlIHRoZSBzY3JlZW4gc2hhcmluZyBkZWZlciBzdGF0dXMuXG4gICAqL1xuICBzY3JlZW5Qcm9kdWNlcklkID0gKHtcbiAgICBwcm9kdWNlcklkLFxuICAgIHNjcmVlbklkLFxuICAgIG1lbWJlcnNSZWNlaXZlZCxcbiAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgZGVmZXJTY3JlZW5SZWNlaXZlZCxcbiAgICBwYXJ0aWNpcGFudHMsXG4gICAgdXBkYXRlU2NyZWVuSWQsXG4gICAgdXBkYXRlU2hhcmVTY3JlZW5TdGFydGVkLFxuICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQsXG4gIH06IFNjcmVlblByb2R1Y2VySWRPcHRpb25zKTogdm9pZCA9PiB7XG4gICAgLy8gQ2hlY2sgaWYgbWVtYmVycyBkYXRhIGhhcyBiZWVuIHJlY2VpdmVkIHdpdGggdGhlIHNjcmVlbklkIHBhcnRpY2lwYW50IGluIGl0XG4gICAgbGV0IGhvc3QgPSBwYXJ0aWNpcGFudHMuZmluZChcbiAgICAgIChwYXJ0aWNpcGFudDogUGFydGljaXBhbnQpID0+XG4gICAgICAgIHBhcnRpY2lwYW50LlNjcmVlbklEID09PSBzY3JlZW5JZCAmJiBwYXJ0aWNpcGFudC5TY3JlZW5PbiA9PT0gdHJ1ZSxcbiAgICApO1xuXG4gICAgLy8gT3BlcmF0aW9ucyB0byB1cGRhdGUgdGhlIFVJXG4gICAgaWYgKGhvc3QgJiYgbWVtYmVyc1JlY2VpdmVkKSB7XG4gICAgICBzY3JlZW5JZCA9IHByb2R1Y2VySWQ7XG4gICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQgPSB0cnVlO1xuICAgICAgZGVmZXJTY3JlZW5SZWNlaXZlZCA9IGZhbHNlO1xuXG4gICAgICB1cGRhdGVTY3JlZW5JZChzY3JlZW5JZCk7XG4gICAgICB1cGRhdGVTaGFyZVNjcmVlblN0YXJ0ZWQoc2hhcmVTY3JlZW5TdGFydGVkKTtcbiAgICAgIHVwZGF0ZURlZmVyU2NyZWVuUmVjZWl2ZWQoZGVmZXJTY3JlZW5SZWNlaXZlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlZmVyU2NyZWVuUmVjZWl2ZWQgPSB0cnVlO1xuICAgICAgc2NyZWVuSWQgPSBwcm9kdWNlcklkO1xuXG4gICAgICB1cGRhdGVTY3JlZW5JZChzY3JlZW5JZCk7XG4gICAgICB1cGRhdGVEZWZlclNjcmVlblJlY2VpdmVkKGRlZmVyU2NyZWVuUmVjZWl2ZWQpO1xuICAgIH1cbiAgfTtcbn1cbiJdfQ==