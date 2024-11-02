import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Triggers an update to the screen client based on the provided parameters.
 *
 * This function handles various conditions to determine the main screen person,
 * adjusts the screen states, and emits an update to the screen client via socket.
 *
 * @param {TriggerOptions} options - The options for triggering the update.
 * @param {string[]} options.ref_ActiveNames - Reference to the active names.
 * @param {TriggerParameters} options.parameters - The parameters for the trigger.
 * @returns {Promise<void>} A promise that resolves when the trigger is complete.
 *
 * @throws Will throw an error if the updateScreenClient operation fails.
 *
 * @example
 * ```typescript
 * await trigger({
 *   ref_ActiveNames: ["user1", "user2"],
 *   parameters: {
 *     socket: socketInstance,
 *     roomName: "room1",
 *     screenStates: [{ mainScreenPerson: "user1", mainScreenFilled: true, adminOnMainScreen: false }],
 *     participants: [{ name: "admin", islevel: "2" }],
 *     updateDateState: 0,
 *     lastUpdate: null,
 *     nForReadjust: 0,
 *     eventType: "conference",
 *     shared: false,
 *     shareScreenStarted: false,
 *     whiteboardStarted: false,
 *     whiteboardEnded: false,
 *     updateUpdateDateState: (date) => {},
 *     updateLastUpdate: (date) => {},
 *     updateNForReadjust: (n) => {},
 *     autoAdjust: async ({ n, parameters }) => [n, 0],
 *   },
 * });
 * ```
 */
export class Trigger {
    /**
     * Triggers an update to the screen client based on the provided parameters.
     *
     * @param {TriggerOptions} options - The options for triggering the update.
     * @param {string[]} options.ref_ActiveNames - Reference to the active names.
     * @param {Parameters} options.parameters - The parameters for the trigger.
     * @returns {Promise<void>} A promise that resolves when the trigger is complete.
     *
     * @throws Will throw an error if the updateScreenClient operation fails.
     *
     * @remarks
     * This function handles various conditions to determine the main screen person,
     * adjusts the screen states, and emits an update to the screen client via socket.
     *
     * @example
     * ```typescript
     * await trigger({
     *   ref_ActiveNames: ["user1", "user2"],
     *   parameters: {
     *     socket: socketInstance,
     *     roomName: "room1",
     *     screenStates: [{ mainScreenPerson: "user1", mainScreenFilled: true, adminOnMainScreen: false }],
     *     participants: [{ name: "admin", islevel: "2" }],
     *     updateDateState: 0,
     *     lastUpdate: null,
     *     nForReadjust: 0,
     *     eventType: "conference",
     *     shared: false,
     *     shareScreenStarted: false,
     *     whiteboardStarted: false,
     *     whiteboardEnded: false,
     *     updateUpdateDateState: (date) => {},
     *     updateLastUpdate: (date) => {},
     *     updateNForReadjust: (n) => {},
     *     autoAdjust: async ({ n, parameters }) => [n, 0],
     *   },
     * });
     * ```
     */
    async trigger({ ref_ActiveNames, parameters }) {
        // Function to trigger the updateScreen event
        try {
            let { socket, roomName, screenStates, participants, updateDateState, lastUpdate, nForReadjust, eventType, shared, shareScreenStarted, whiteboardStarted, whiteboardEnded, updateUpdateDateState, updateLastUpdate, updateNForReadjust, autoAdjust, } = parameters;
            let personOnMainScreen = screenStates[0].mainScreenPerson;
            let adminName = '';
            const admin = participants.filter((participant) => participant.islevel == '2');
            if (admin.length > 0) {
                adminName = admin[0].name || '';
            }
            if (personOnMainScreen === 'WhiteboardActive') {
                personOnMainScreen = adminName;
            }
            let mainfilled = screenStates[0].mainScreenFilled;
            let adminOnMain = screenStates[0].adminOnMainScreen;
            let nForReadjust_;
            let val1;
            let noww = new Date().getTime();
            // get now in seconds
            let timestamp = Math.floor(noww / 1000);
            let eventPass = false;
            if (eventType === 'conference' && !(shared || shareScreenStarted)) {
                eventPass = true;
                personOnMainScreen = adminName;
                if (!ref_ActiveNames.includes(adminName)) {
                    ref_ActiveNames.unshift(adminName);
                }
            }
            if ((mainfilled && personOnMainScreen != null && adminOnMain) || eventPass) {
                if (eventType === 'conference') {
                    nForReadjust = nForReadjust + 1;
                    updateNForReadjust(nForReadjust);
                }
                if (!ref_ActiveNames.includes(adminName) && whiteboardStarted && !whiteboardEnded) {
                    ref_ActiveNames.unshift(adminName);
                }
                nForReadjust_ = ref_ActiveNames.length;
                if (nForReadjust_ === 0 && eventType === 'webinar') {
                    val1 = 0;
                }
                else {
                    const [val11] = await autoAdjust({
                        n: nForReadjust_,
                        eventType,
                        shared,
                        shareScreenStarted,
                    });
                    val1 = val11;
                }
                let calc1 = Math.floor((val1 / 12) * 100);
                let calc2 = 100 - calc1;
                // check if lastUpdate is not null and at least same seconds
                if (lastUpdate == null || updateDateState != timestamp) {
                    let now = new Date();
                    socket.emit('updateScreenClient', {
                        roomName,
                        names: ref_ActiveNames,
                        mainPercent: calc2,
                        mainScreenPerson: personOnMainScreen,
                        viewType: eventType,
                    }, ({ success, reason }) => {
                        updateDateState = timestamp;
                        updateUpdateDateState(updateDateState);
                        lastUpdate = Math.floor(now.getTime() / 1000);
                        updateLastUpdate(lastUpdate);
                        if (success) {
                            // handle success
                        }
                        else {
                            console.log(reason, 'updateScreenClient failed');
                        }
                    });
                }
            }
            else if (mainfilled && personOnMainScreen != null && !adminOnMain) {
                nForReadjust_ = ref_ActiveNames.length;
                if (!ref_ActiveNames.includes(adminName)) {
                    ref_ActiveNames.unshift(adminName);
                    nForReadjust_ = ref_ActiveNames.length;
                }
                const [val11] = await autoAdjust({
                    n: nForReadjust_,
                    eventType,
                    shared,
                    shareScreenStarted,
                });
                val1 = val11;
                const calc1 = Math.floor((val1 / 12) * 100);
                const calc2 = 100 - calc1;
                if (lastUpdate == null || updateDateState != timestamp) {
                    let now = new Date();
                    socket.emit('updateScreenClient', {
                        roomName,
                        names: ref_ActiveNames,
                        mainPercent: calc2,
                        mainScreenPerson: personOnMainScreen,
                        viewType: eventType,
                    }, ({ success, reason }) => {
                        updateDateState = timestamp;
                        updateUpdateDateState(updateDateState);
                        lastUpdate = Math.floor(now.getTime() / 1000);
                        updateLastUpdate(lastUpdate);
                        if (success) {
                            // handle success
                        }
                        else {
                            console.log(reason, 'updateScreenClient failed');
                        }
                    });
                }
            }
            else {
                // stop recording
                console.log('trigger stopRecording');
            }
        }
        catch (error) {
            console.log('Error triggering updateScreen:', error);
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: Trigger, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: Trigger, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: Trigger, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy90cmlnZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFvQzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUNHO0FBTUgsTUFBTSxPQUFPLE9BQU87SUFDbEI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09Bc0NHO0lBQ0gsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQWtCO1FBQzNELDZDQUE2QztRQUU3QyxJQUFJLENBQUM7WUFDSCxJQUFJLEVBQ0YsTUFBTSxFQUNOLFFBQVEsRUFDUixZQUFZLEVBQ1osWUFBWSxFQUNaLGVBQWUsRUFDZixVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFDVCxNQUFNLEVBQ04sa0JBQWtCLEVBQ2xCLGlCQUFpQixFQUNqQixlQUFlLEVBRWYscUJBQXFCLEVBQ3JCLGdCQUFnQixFQUNoQixrQkFBa0IsRUFFbEIsVUFBVSxHQUNYLEdBQUcsVUFBVSxDQUFDO1lBRWYsSUFBSSxrQkFBa0IsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUM7WUFFMUQsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1lBQ25CLE1BQU0sS0FBSyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQyxXQUF3QixFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsT0FBTyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1lBQzVGLElBQUksS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsQ0FBQztnQkFDckIsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJ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SSxFQUFFLENBQUM7b0JBRXJCLE1BQU0sQ0FBQyxJQUFJLENBQ1Qsb0JBQW9CLEVBQ3BCO3dCQUNFLFFBQVE7d0JBQ1IsS0FBSyxFQUFFLGVBQWU7d0JBQ3RCLFdBQVcsRUFBRSxLQUFLO3dCQUNsQixnQkFBZ0IsRUFBRSxrQkFBa0I7d0JBQ3BDLFFBQVEsRUFBRSxTQUFTO3FCQUNwQixFQUNELENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUF3QyxFQUFFLEVBQUU7d0JBQzVELGVBQWUsR0FBRyxTQUFTLENBQUM7d0JBQzVCLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUN2QyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBQzlDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUM3QixJQUFJLE9BQU8sRUFBRSxDQUFDOzRCQUNaLGlCQUFpQjt3QkFDbkIsQ0FBQzs2QkFBTSxDQUFDOzRCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLDJCQUEyQixDQUFDLENBQUM7d0JBQ25ELENBQUM7b0JBQ0gsQ0FBQyxDQUNGLENBQUM7Z0JBQ0osQ0FBQztZQUNILENBQUM7aUJBQU0sQ0FBQztnQkFDTixpQkFBaUI7Z0JBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUMsQ0FBQztZQUN2QyxDQUFDO1FBQ0gsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDZixPQUFPLENBQUMsR0FBRyxDQUFDLGdDQUFnQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3ZELENBQUM7SUFDSCxDQUFDO3VHQXZNVSxPQUFPOzJHQUFQLE9BQU8sY0FGTixNQUFNOzsyRkFFUCxPQUFPO2tCQUhuQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFNvY2tldCB9IGZyb20gJ3NvY2tldC5pby1jbGllbnQnO1xuaW1wb3J0IHsgUGFydGljaXBhbnQsIEF1dG9BZGp1c3RUeXBlLCBTY3JlZW5TdGF0ZSwgRXZlbnRUeXBlIH0gZnJvbSAnLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBUcmlnZ2VyUGFyYW1ldGVycyB7XG4gIHNvY2tldDogU29ja2V0O1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzY3JlZW5TdGF0ZXM6IFNjcmVlblN0YXRlW107XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgdXBkYXRlRGF0ZVN0YXRlPzogbnVtYmVyIHwgbnVsbDtcbiAgbGFzdFVwZGF0ZTogbnVtYmVyIHwgbnVsbDtcbiAgbkZvclJlYWRqdXN0OiBudW1iZXI7XG4gIGV2ZW50VHlwZTogRXZlbnRUeXBlO1xuICBzaGFyZWQ6IGJvb2xlYW47XG4gIHNoYXJlU2NyZWVuU3RhcnRlZDogYm9vbGVhbjtcbiAgd2hpdGVib2FyZFN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHdoaXRlYm9hcmRFbmRlZDogYm9vbGVhbjtcbiAgdXBkYXRlVXBkYXRlRGF0ZVN0YXRlOiAodGltZXN0YW1wOiBudW1iZXIgfCBudWxsKSA9PiB2b2lkO1xuICB1cGRhdGVMYXN0VXBkYXRlOiAobGFzdFVwZGF0ZTogbnVtYmVyIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlTkZvclJlYWRqdXN0OiAobkZvclJlYWRqdXN0OiBudW1iZXIpID0+IHZvaWQ7XG5cbiAgLy8gbWVkaWFzZnUgZnVuY3Rpb25zXG4gIGF1dG9BZGp1c3Q6IEF1dG9BZGp1c3RUeXBlO1xuXG4gIGdldFVwZGF0ZWRBbGxQYXJhbXM6ICgpID0+IFRyaWdnZXJQYXJhbWV0ZXJzO1xuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJpZ2dlck9wdGlvbnMge1xuICByZWZfQWN0aXZlTmFtZXM6IHN0cmluZ1tdO1xuICBwYXJhbWV0ZXJzOiBUcmlnZ2VyUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgVHJpZ2dlclR5cGUgPSAob3B0aW9uczogVHJpZ2dlck9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogVHJpZ2dlcnMgYW4gdXBkYXRlIHRvIHRoZSBzY3JlZW4gY2xpZW50IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzLlxuICpcbiAqIFRoaXMgZnVuY3Rpb24gaGFuZGxlcyB2YXJpb3VzIGNvbmRpdGlvbnMgdG8gZGV0ZXJtaW5lIHRoZSBtYWluIHNjcmVlbiBwZXJzb24sXG4gKiBhZGp1c3RzIHRoZSBzY3JlZW4gc3RhdGVzLCBhbmQgZW1pdHMgYW4gdXBkYXRlIHRvIHRoZSBzY3JlZW4gY2xpZW50IHZpYSBzb2NrZXQuXG4gKlxuICogQHBhcmFtIHtUcmlnZ2VyT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB0cmlnZ2VyaW5nIHRoZSB1cGRhdGUuXG4gKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLnJlZl9BY3RpdmVOYW1lcyAtIFJlZmVyZW5jZSB0byB0aGUgYWN0aXZlIG5hbWVzLlxuICogQHBhcmFtIHtUcmlnZ2VyUGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHRoZSB0cmlnZ2VyLlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHRyaWdnZXIgaXMgY29tcGxldGUuXG4gKlxuICogQHRocm93cyBXaWxsIHRocm93IGFuIGVycm9yIGlmIHRoZSB1cGRhdGVTY3JlZW5DbGllbnQgb3BlcmF0aW9uIGZhaWxzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBhd2FpdCB0cmlnZ2VyKHtcbiAqICAgcmVmX0FjdGl2ZU5hbWVzOiBbXCJ1c2VyMVwiLCBcInVzZXIyXCJdLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgc29ja2V0OiBzb2NrZXRJbnN0YW5jZSxcbiAqICAgICByb29tTmFtZTogXCJyb29tMVwiLFxuICogICAgIHNjcmVlblN0YXRlczogW3sgbWFpblNjcmVlblBlcnNvbjogXCJ1c2VyMVwiLCBtYWluU2NyZWVuRmlsbGVkOiB0cnVlLCBhZG1pbk9uTWFpblNjcmVlbjogZmFsc2UgfV0sXG4gKiAgICAgcGFydGljaXBhbnRzOiBbeyBuYW1lOiBcImFkbWluXCIsIGlzbGV2ZWw6IFwiMlwiIH1dLFxuICogICAgIHVwZGF0ZURhdGVTdGF0ZTogMCxcbiAqICAgICBsYXN0VXBkYXRlOiBudWxsLFxuICogICAgIG5Gb3JSZWFkanVzdDogMCxcbiAqICAgICBldmVudFR5cGU6IFwiY29uZmVyZW5jZVwiLFxuICogICAgIHNoYXJlZDogZmFsc2UsXG4gKiAgICAgc2hhcmVTY3JlZW5TdGFydGVkOiBmYWxzZSxcbiAqICAgICB3aGl0ZWJvYXJkU3RhcnRlZDogZmFsc2UsXG4gKiAgICAgd2hpdGVib2FyZEVuZGVkOiBmYWxzZSxcbiAqICAgICB1cGRhdGVVcGRhdGVEYXRlU3RhdGU6IChkYXRlKSA9PiB7fSxcbiAqICAgICB1cGRhdGVMYXN0VXBkYXRlOiAoZGF0ZSkgPT4ge30sXG4gKiAgICAgdXBkYXRlTkZvclJlYWRqdXN0OiAobikgPT4ge30sXG4gKiAgICAgYXV0b0FkanVzdDogYXN5bmMgKHsgbiwgcGFyYW1ldGVycyB9KSA9PiBbbiwgMF0sXG4gKiAgIH0sXG4gKiB9KTtcbiAqIGBgYFxuICovXG5cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFRyaWdnZXIge1xuICAvKipcbiAgICogVHJpZ2dlcnMgYW4gdXBkYXRlIHRvIHRoZSBzY3JlZW4gY2xpZW50IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge1RyaWdnZXJPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHRyaWdnZXJpbmcgdGhlIHVwZGF0ZS5cbiAgICogQHBhcmFtIHtzdHJpbmdbXX0gb3B0aW9ucy5yZWZfQWN0aXZlTmFtZXMgLSBSZWZlcmVuY2UgdG8gdGhlIGFjdGl2ZSBuYW1lcy5cbiAgICogQHBhcmFtIHtQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIHRyaWdnZXIuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPHZvaWQ+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aGVuIHRoZSB0cmlnZ2VyIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlIHVwZGF0ZVNjcmVlbkNsaWVudCBvcGVyYXRpb24gZmFpbHMuXG4gICAqXG4gICAqIEByZW1hcmtzXG4gICAqIFRoaXMgZnVuY3Rpb24gaGFuZGxlcyB2YXJpb3VzIGNvbmRpdGlvbnMgdG8gZGV0ZXJtaW5lIHRoZSBtYWluIHNjcmVlbiBwZXJzb24sXG4gICAqIGFkanVzdHMgdGhlIHNjcmVlbiBzdGF0ZXMsIGFuZCBlbWl0cyBhbiB1cGRhdGUgdG8gdGhlIHNjcmVlbiBjbGllbnQgdmlhIHNvY2tldC5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogYGBgdHlwZXNjcmlwdFxuICAgKiBhd2FpdCB0cmlnZ2VyKHtcbiAgICogICByZWZfQWN0aXZlTmFtZXM6IFtcInVzZXIxXCIsIFwidXNlcjJcIl0sXG4gICAqICAgcGFyYW1ldGVyczoge1xuICAgKiAgICAgc29ja2V0OiBzb2NrZXRJbnN0YW5jZSxcbiAgICogICAgIHJvb21OYW1lOiBcInJvb20xXCIsXG4gICAqICAgICBzY3JlZW5TdGF0ZXM6IFt7IG1haW5TY3JlZW5QZXJzb246IFwidXNlcjFcIiwgbWFpblNjcmVlbkZpbGxlZDogdHJ1ZSwgYWRtaW5Pbk1haW5TY3JlZW46IGZhbHNlIH1dLFxuICAgKiAgICAgcGFydGljaXBhbnRzOiBbeyBuYW1lOiBcImFkbWluXCIsIGlzbGV2ZWw6IFwiMlwiIH1dLFxuICAgKiAgICAgdXBkYXRlRGF0ZVN0YXRlOiAwLFxuICAgKiAgICAgbGFzdFVwZGF0ZTogbnVsbCxcbiAgICogICAgIG5Gb3JSZWFkanVzdDogMCxcbiAgICogICAgIGV2ZW50VHlwZTogXCJjb25mZXJlbmNlXCIsXG4gICAqICAgICBzaGFyZWQ6IGZhbHNlLFxuICAgKiAgICAgc2hhcmVTY3JlZW5TdGFydGVkOiBmYWxzZSxcbiAgICogICAgIHdoaXRlYm9hcmRTdGFydGVkOiBmYWxzZSxcbiAgICogICAgIHdoaXRlYm9hcmRFbmRlZDogZmFsc2UsXG4gICAqICAgICB1cGRhdGVVcGRhdGVEYXRlU3RhdGU6IChkYXRlKSA9PiB7fSxcbiAgICogICAgIHVwZGF0ZUxhc3RVcGRhdGU6IChkYXRlKSA9PiB7fSxcbiAgICogICAgIHVwZGF0ZU5Gb3JSZWFkanVzdDogKG4pID0+IHt9LFxuICAgKiAgICAgYXV0b0FkanVzdDogYXN5bmMgKHsgbiwgcGFyYW1ldGVycyB9KSA9PiBbbiwgMF0sXG4gICAqICAgfSxcbiAgICogfSk7XG4gICAqIGBgYFxuICAgKi9cbiAgYXN5bmMgdHJpZ2dlcih7IHJlZl9BY3RpdmVOYW1lcywgcGFyYW1ldGVycyB9OiBUcmlnZ2VyT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIEZ1bmN0aW9uIHRvIHRyaWdnZXIgdGhlIHVwZGF0ZVNjcmVlbiBldmVudFxuXG4gICAgdHJ5IHtcbiAgICAgIGxldCB7XG4gICAgICAgIHNvY2tldCxcbiAgICAgICAgcm9vbU5hbWUsXG4gICAgICAgIHNjcmVlblN0YXRlcyxcbiAgICAgICAgcGFydGljaXBhbnRzLFxuICAgICAgICB1cGRhdGVEYXRlU3RhdGUsXG4gICAgICAgIGxhc3RVcGRhdGUsXG4gICAgICAgIG5Gb3JSZWFkanVzdCxcbiAgICAgICAgZXZlbnRUeXBlLFxuICAgICAgICBzaGFyZWQsXG4gICAgICAgIHNoYXJlU2NyZWVuU3RhcnRlZCxcbiAgICAgICAgd2hpdGVib2FyZFN0YXJ0ZWQsXG4gICAgICAgIHdoaXRlYm9hcmRFbmRlZCxcblxuICAgICAgICB1cGRhdGVVcGRhdGVEYXRlU3RhdGUsXG4gICAgICAgIHVwZGF0ZUxhc3RVcGRhdGUsXG4gICAgICAgIHVwZGF0ZU5Gb3JSZWFkanVzdCxcblxuICAgICAgICBhdXRvQWRqdXN0LFxuICAgICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICAgIGxldCBwZXJzb25Pbk1haW5TY3JlZW4gPSBzY3JlZW5TdGF0ZXNbMF0ubWFpblNjcmVlblBlcnNvbjtcblxuICAgICAgbGV0IGFkbWluTmFtZSA9ICcnO1xuICAgICAgY29uc3QgYWRtaW4gPSBwYXJ0aWNpcGFudHMuZmlsdGVyKChwYXJ0aWNpcGFudDogUGFydGljaXBhbnQpID0+IHBhcnRpY2lwYW50LmlzbGV2ZWwgPT0gJzInKTtcbiAgICAgIGlmIChhZG1pbi5sZW5ndGggPiAwKSB7XG4gICAgICAgIGFkbWluTmFtZSA9IGFkbWluWzBdLm5hbWUgfHwgJyc7XG4gICAgICB9XG4gICAgICBpZiAocGVyc29uT25NYWluU2NyZWVuID09PSAnV2hpdGVib2FyZEFjdGl2ZScpIHtcbiAgICAgICAgcGVyc29uT25NYWluU2NyZWVuID0gYWRtaW5OYW1lO1xuICAgICAgfVxuXG4gICAgICBsZXQgbWFpbmZpbGxlZCA9IHNjcmVlblN0YXRlc1swXS5tYWluU2NyZWVuRmlsbGVkO1xuICAgICAgbGV0IGFkbWluT25NYWluID0gc2NyZWVuU3RhdGVzWzBdLmFkbWluT25NYWluU2NyZWVuO1xuICAgICAgbGV0IG5Gb3JSZWFkanVzdF87XG4gICAgICBsZXQgdmFsMTtcblxuICAgICAgbGV0IG5vd3cgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcbiAgICAgIC8vIGdldCBub3cgaW4gc2Vjb25kc1xuICAgICAgbGV0IHRpbWVzdGFtcCA9IE1hdGguZmxvb3Iobm93dyAvIDEwMDApO1xuXG4gICAgICBsZXQgZXZlbnRQYXNzID0gZmFsc2U7XG4gICAgICBpZiAoZXZlbnRUeXBlID09PSAnY29uZmVyZW5jZScgJiYgIShzaGFyZWQgfHwgc2hhcmVTY3JlZW5TdGFydGVkKSkge1xuICAgICAgICBldmVudFBhc3MgPSB0cnVlO1xuICAgICAgICBwZXJzb25Pbk1haW5TY3JlZW4gPSBhZG1pbk5hbWU7XG4gICAgICAgIGlmICghcmVmX0FjdGl2ZU5hbWVzLmluY2x1ZGVzKGFkbWluTmFtZSkpIHtcbiAgICAgICAgICByZWZfQWN0aXZlTmFtZXMudW5zaGlmdChhZG1pbk5hbWUpO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICgobWFpbmZpbGxlZCAmJiBwZXJzb25Pbk1haW5TY3JlZW4gIT0gbnVsbCAmJiBhZG1pbk9uTWFpbikgfHwgZXZlbnRQYXNzKSB7XG4gICAgICAgIGlmIChldmVudFR5cGUgPT09ICdjb25mZXJlbmNlJykge1xuICAgICAgICAgIG5Gb3JSZWFkanVzdCA9IG5Gb3JSZWFkanVzdCArIDE7XG4gICAgICAgICAgdXBkYXRlTkZvclJlYWRqdXN0KG5Gb3JSZWFkanVzdCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXJlZl9BY3RpdmVOYW1lcy5pbmNsdWRlcyhhZG1pbk5hbWUpICYmIHdoaXRlYm9hcmRTdGFydGVkICYmICF3aGl0ZWJvYXJkRW5kZWQpIHtcbiAgICAgICAgICByZWZfQWN0aXZlTmFtZXMudW5zaGlmdChhZG1pbk5hbWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgbkZvclJlYWRqdXN0XyA9IHJlZl9BY3RpdmVOYW1lcy5sZW5ndGg7XG5cbiAgICAgICAgaWYgKG5Gb3JSZWFkanVzdF8gPT09IDAgJiYgZXZlbnRUeXBlID09PSAnd2ViaW5hcicpIHtcbiAgICAgICAgICB2YWwxID0gMDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBbdmFsMTFdID0gYXdhaXQgYXV0b0FkanVzdCh7XG4gICAgICAgICAgICBuOiBuRm9yUmVhZGp1c3RfLFxuICAgICAgICAgICAgZXZlbnRUeXBlLFxuICAgICAgICAgICAgc2hhcmVkLFxuICAgICAgICAgICAgc2hhcmVTY3JlZW5TdGFydGVkLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHZhbDEgPSB2YWwxMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjYWxjMSA9IE1hdGguZmxvb3IoKHZhbDEgLyAxMikgKiAxMDApO1xuICAgICAgICBsZXQgY2FsYzIgPSAxMDAgLSBjYWxjMTtcblxuICAgICAgICAvLyBjaGVjayBpZiBsYXN0VXBkYXRlIGlzIG5vdCBudWxsIGFuZCBhdCBsZWFzdCBzYW1lIHNlY29uZHNcbiAgICAgICAgaWYgKGxhc3RVcGRhdGUgPT0gbnVsbCB8fCB1cGRhdGVEYXRlU3RhdGUgIT0gdGltZXN0YW1wKSB7XG4gICAgICAgICAgbGV0IG5vdyA9IG5ldyBEYXRlKCk7XG5cbiAgICAgICAgICBzb2NrZXQuZW1pdChcbiAgICAgICAgICAgICd1cGRhdGVTY3JlZW5DbGllbnQnLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICByb29tTmFtZSxcbiAgICAgICAgICAgICAgbmFtZXM6IHJlZl9BY3RpdmVOYW1lcyxcbiAgICAgICAgICAgICAgbWFpblBlcmNlbnQ6IGNhbGMyLFxuICAgICAgICAgICAgICBtYWluU2NyZWVuUGVyc29uOiBwZXJzb25Pbk1haW5TY3JlZW4sXG4gICAgICAgICAgICAgIHZpZXdUeXBlOiBldmVudFR5cGUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgKHsgc3VjY2VzcywgcmVhc29uIH06IHsgc3VjY2VzczogYm9vbGVhbjsgcmVhc29uOiBzdHJpbmcgfSkgPT4ge1xuICAgICAgICAgICAgICB1cGRhdGVEYXRlU3RhdGUgPSB0aW1lc3RhbXA7XG4gICAgICAgICAgICAgIHVwZGF0ZVVwZGF0ZURhdGVTdGF0ZSh1cGRhdGVEYXRlU3RhdGUpO1xuICAgICAgICAgICAgICBsYXN0VXBkYXRlID0gTWF0aC5mbG9vcihub3cuZ2V0VGltZSgpIC8gMTAwMCk7XG4gICAgICAgICAgICAgIHVwZGF0ZUxhc3RVcGRhdGUobGFzdFVwZGF0ZSk7XG4gICAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XG4gICAgICAgICAgICAgICAgLy8gaGFuZGxlIHN1Y2Nlc3NcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWFzb24sICd1cGRhdGVTY3JlZW5DbGllbnQgZmFpbGVkJyk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChtYWluZmlsbGVkICYmIHBlcnNvbk9uTWFpblNjcmVlbiAhPSBudWxsICYmICFhZG1pbk9uTWFpbikge1xuICAgICAgICBuRm9yUmVhZGp1c3RfID0gcmVmX0FjdGl2ZU5hbWVzLmxlbmd0aDtcblxuICAgICAgICBpZiAoIXJlZl9BY3RpdmVOYW1lcy5pbmNsdWRlcyhhZG1pbk5hbWUpKSB7XG4gICAgICAgICAgcmVmX0FjdGl2ZU5hbWVzLnVuc2hpZnQoYWRtaW5OYW1lKTtcbiAgICAgICAgICBuRm9yUmVhZGp1c3RfID0gcmVmX0FjdGl2ZU5hbWVzLmxlbmd0aDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IFt2YWwxMV0gPSBhd2FpdCBhdXRvQWRqdXN0KHtcbiAgICAgICAgICBuOiBuRm9yUmVhZGp1c3RfLFxuICAgICAgICAgIGV2ZW50VHlwZSxcbiAgICAgICAgICBzaGFyZWQsXG4gICAgICAgICAgc2hhcmVTY3JlZW5TdGFydGVkLFxuICAgICAgICB9KTtcblxuICAgICAgICB2YWwxID0gdmFsMTE7XG5cbiAgICAgICAgY29uc3QgY2FsYzEgPSBNYXRoLmZsb29yKCh2YWwxIC8gMTIpICogMTAwKTtcbiAgICAgICAgY29uc3QgY2FsYzIgPSAxMDAgLSBjYWxjMTtcblxuICAgICAgICBpZiAobGFzdFVwZGF0ZSA9PSBudWxsIHx8IHVwZGF0ZURhdGVTdGF0ZSAhPSB0aW1lc3RhbXApIHtcbiAgICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcblxuICAgICAgICAgIHNvY2tldC5lbWl0KFxuICAgICAgICAgICAgJ3VwZGF0ZVNjcmVlbkNsaWVudCcsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJvb21OYW1lLFxuICAgICAgICAgICAgICBuYW1lczogcmVmX0FjdGl2ZU5hbWVzLFxuICAgICAgICAgICAgICBtYWluUGVyY2VudDogY2FsYzIsXG4gICAgICAgICAgICAgIG1haW5TY3JlZW5QZXJzb246IHBlcnNvbk9uTWFpblNjcmVlbixcbiAgICAgICAgICAgICAgdmlld1R5cGU6IGV2ZW50VHlwZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoeyBzdWNjZXNzLCByZWFzb24gfTogeyBzdWNjZXNzOiBib29sZWFuOyByZWFzb246IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgICAgIHVwZGF0ZURhdGVTdGF0ZSA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgdXBkYXRlVXBkYXRlRGF0ZVN0YXRlKHVwZGF0ZURhdGVTdGF0ZSk7XG4gICAgICAgICAgICAgIGxhc3RVcGRhdGUgPSBNYXRoLmZsb29yKG5vdy5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgICAgICAgICAgICAgdXBkYXRlTGFzdFVwZGF0ZShsYXN0VXBkYXRlKTtcbiAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAvLyBoYW5kbGUgc3VjY2Vzc1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbiwgJ3VwZGF0ZVNjcmVlbkNsaWVudCBmYWlsZWQnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBzdG9wIHJlY29yZGluZ1xuICAgICAgICBjb25zb2xlLmxvZygndHJpZ2dlciBzdG9wUmVjb3JkaW5nJyk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnNvbGUubG9nKCdFcnJvciB0cmlnZ2VyaW5nIHVwZGF0ZVNjcmVlbjonLCBlcnJvcik7XG4gICAgfVxuICB9XG59XG4iXX0=