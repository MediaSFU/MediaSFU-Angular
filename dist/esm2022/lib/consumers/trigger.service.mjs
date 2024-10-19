import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJpZ2dlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbnN1bWVycy90cmlnZ2VyLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUF1QzNDLE1BQU0sT0FBTyxPQUFPO0lBQ2xCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNDRztJQUNILEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFrQjtRQUMzRCw2Q0FBNkM7UUFFN0MsSUFBSSxDQUFDO1lBQ0gsSUFBSSxFQUNGLE1BQU0sRUFDTixRQUFRLEVBQ1IsWUFBWSxFQUNaLFlBQVksRUFDWixlQUFlLEVBQ2YsVUFBVSxFQUNWLFlBQVksRUFDWixTQUFTLEVBQ1QsTUFBTSxFQUNOLGtCQUFrQixFQUNsQixpQkFBaUIsRUFDakIsZUFBZSxFQUVmLHFCQUFxQixFQUNyQixnQkFBZ0IsRUFDaEIsa0JBQWtCLEVBRWxCLFVBQVUsR0FDWCxHQUFHLFVBQVUsQ0FBQztZQUVmLElBQUksa0JBQWtCLEdBQUcsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDO1lBRTFELElBQUksU0FBUyxHQUFHLEVBQUUsQ0FBQztZQUNuQixNQUFNLEtBQUssR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsV0FBd0IsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsQ0FBQztZQUM1RixJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFLENBQUM7Z0JBQ3JCLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNsQyxDQUFDO1lBQ0QsSUFBSSxrQkFBa0IsS0FBSyxrQkFBa0IsRUFBRSxDQUFDO2dCQUM5QyxrQkFBa0IsR0FBRyxTQUFTLENBQUM7WUFDakMsQ0FBQztZQUVELElBQUksVUFBVSxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsQ0FBQztZQUNsRCxJQUFJLFdBQVcsR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUM7WUFDcEQsSUFBSSxhQUFhLENBQUM7WUFDbEIsSUFBSSxJQUFJLENBQUM7WUFFVCxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFDO1lBQ2hDLHFCQUFxQjtZQUNyQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztZQUV4QyxJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxTQUFTLEtBQUssWUFBWSxJQUFJLENBQUMsQ0FBQyxNQUFNLElBQUksa0JBQWtCLENBQUMsRUFBRSxDQUFDO2dCQUNsRSxTQUFTLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixrQkFBa0IsR0FBRyxTQUFTLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUM7b0JBQ3pDLGVBQWUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JDLENBQUM7WUFDSCxDQUFDO1lBRUQsSUFBSSxDQUFDLFVBQVUsSUFBSSxrQkFBa0IsSUFBSSxJQUFJLElBQUksV0FBVyxDQUFDLElBQUksU0FBUyxFQUFFLENBQUM7Z0JBQzNFLElBQUksU0FBUyxLQUFLLFlBQVksRUFBRSxDQUFDO29CQUMvQixZQUFZLEdBQUcsWUFBWSxHQUFHLENBQUMsQ0FBQztvQkFDaEMsa0JBQWtCLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQ25DLENBQUM7Z0JBRUQsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLElBQUksaUJBQWlCLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztvQkFDbEYsZUFBZSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckMsQ0FBQztnQkFFRCxhQUFhLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQztnQkFFdkMsSUFBSSxhQUFhLEtBQUssQ0FBQyxJQUFJLFNBQVMsS0FBSyxTQUFTLEVBQUUsQ0FBQztvQkFDbkQsSUFBSSxHQUFHLENBQUMsQ0FBQztnQkFDWCxDQUFDO3FCQUFNLENBQUM7b0JBQ04sTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sVUFBVSxDQUFDO3dCQUMvQixDQUFDLEVBQUUsYUFBYTt3QkFDaEIsU0FBUzt3QkFDVCxNQUFNO3dCQUNOLGtCQUFrQjtxQkFDbkIsQ0FBQyxDQUFDO29CQUNILElBQUksR0FBRyxLQUFLLENBQUM7Z0JBQ2YsQ0FBQztnQkFFRCxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO2dCQUV4Qiw0REFBNEQ7Z0JBQzVELElBQUksVUFBVSxJQUFJLElBQUksSUFBSSxlQUFlLElBQUksU0FBUyxFQUFFLENBQUM7b0JBQ3ZELElBQUksR0FBRyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7b0JBRXJCLE1BQU0sQ0FBQyxJQUFJLENBQ1Qsb0JBQW9CLEVBQ3BCO3dCQUNFLFFBQVE7d0JBQ1IsS0FBSyxFQUFFLGVBQWU7d0JBQ3RCLFdBQVcsRUFBRSxLQUFLO3dCQUNsQixnQkFBZ0IsRUFBRSxrQkFBa0I7d0JBQ3BDLFFBQVEsRUFBRSxTQUFTO3FCQUNwQixFQUNELENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUF3QyxFQUFFLEVBQUU7d0JBQzVELGVBQWUsR0FBRyxTQUFTLENBQUM7d0JBQzVCLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO3dCQUN2QyxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLENBQUM7d0JBQzlDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO3dCQUM3QixJQUFJLE9BQU8sRUFBRSxDQUFDOzRCQUNaLGlCQUFpQjt3QkFDbkIsQ0FBQzs2QkFBTSxDQUFDOzRCQUNOLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLDJCQUEyQixDQUFDLENBQUM7d0JBQ25ELENBQUM7b0JBQ0gsQ0FBQyxDQUNGLENBQUM7Z0JBQ0osQ0FBQztZQUNILENBQUM7aUJBQU0sSUFBSSxVQUFVLElBQUksa0JBQWtCLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7Z0JBQ3BFLGFBQWEsR0FBRyxlQUFlLENBQUMsTUFBTSxDQUFDO2dCQUV2QyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO29CQUN6QyxlQUFlLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUNuQyxhQUFhLEdBQUcsZUFBZSxDQUFDLE1BQU0sQ0FBQztnQkFDekMsQ0FBQztnQkFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsTUFBTSxVQUFVLENBQUM7b0JBQy9CLENBQUMsRUFBRSxhQUFhO29CQUNoQixTQUFTO29CQUNULE1BQU07b0JBQ04sa0JBQWtCO2lCQUNuQixDQUFDLENBQUM7Z0JBRUgsSUFBSSxHQUFHLEtBQUssQ0FBQztnQkFFYixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO2dCQUM1QyxNQUFNLEtBQUssR0FBRyxHQUFHLEdBQUcsS0FBSyxDQUFDO2dCQUUxQixJQUFJLFVBQVUsSUFBSSxJQUFJLElBQUksZUFBZSxJQUFJLFNBQVMsRUFBRSxDQUFDO29CQUN2RCxJQUFJLEdBQUcsR0FBRyxJQUFJLElBQUksRUFBRSxDQUFDO29CQUVyQixNQUFNLENBQUMsSUFBSSxDQUNULG9CQUFvQixFQUNwQjt3QkFDRSxRQUFRO3dCQUNSLEtBQUssRUFBRSxlQUFlO3dCQUN0QixXQUFXLEVBQUUsS0FBSzt3QkFDbEIsZ0JBQWdCLEVBQUUsa0JBQWtCO3dCQUNwQyxRQUFRLEVBQUUsU0FBUztxQkFDcEIsRUFDRCxDQUFDLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBd0MsRUFBRSxFQUFFO3dCQUM1RCxlQUFlLEdBQUcsU0FBUyxDQUFDO3dCQUM1QixxQkFBcUIsQ0FBQyxlQUFlLENBQUMsQ0FBQzt3QkFDdkMsVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO3dCQUM5QyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDN0IsSUFBSSxPQUFPLEVBQUUsQ0FBQzs0QkFDWixpQkFBaUI7d0JBQ25CLENBQUM7NkJBQU0sQ0FBQzs0QkFDTixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSwyQkFBMkIsQ0FBQyxDQUFDO3dCQUNuRCxDQUFDO29CQUNILENBQUMsQ0FDRixDQUFDO2dCQUNKLENBQUM7WUFDSCxDQUFDO2lCQUFNLENBQUM7Z0JBQ04saUJBQWlCO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7WUFDdkMsQ0FBQztRQUNILENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2YsT0FBTyxDQUFDLEdBQUcsQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN2RCxDQUFDO0lBQ0gsQ0FBQzt1R0F2TVUsT0FBTzsyR0FBUCxPQUFPLGNBRk4sTUFBTTs7MkZBRVAsT0FBTztrQkFIbkIsVUFBVTttQkFBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTb2NrZXQgfSBmcm9tICdzb2NrZXQuaW8tY2xpZW50JztcbmltcG9ydCB7IFBhcnRpY2lwYW50LCBBdXRvQWRqdXN0VHlwZSwgU2NyZWVuU3RhdGUsIEV2ZW50VHlwZSB9IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgVHJpZ2dlclBhcmFtZXRlcnMge1xuICBzb2NrZXQ6IFNvY2tldDtcbiAgcm9vbU5hbWU6IHN0cmluZztcbiAgc2NyZWVuU3RhdGVzOiBTY3JlZW5TdGF0ZVtdO1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIHVwZGF0ZURhdGVTdGF0ZT86IG51bWJlciB8IG51bGw7XG4gIGxhc3RVcGRhdGU6IG51bWJlciB8IG51bGw7XG4gIG5Gb3JSZWFkanVzdDogbnVtYmVyO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbiAgc2hhcmVkOiBib29sZWFuO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHdoaXRlYm9hcmRTdGFydGVkOiBib29sZWFuO1xuICB3aGl0ZWJvYXJkRW5kZWQ6IGJvb2xlYW47XG4gIHVwZGF0ZVVwZGF0ZURhdGVTdGF0ZTogKHRpbWVzdGFtcDogbnVtYmVyIHwgbnVsbCkgPT4gdm9pZDtcbiAgdXBkYXRlTGFzdFVwZGF0ZTogKGxhc3RVcGRhdGU6IG51bWJlciB8IG51bGwpID0+IHZvaWQ7XG4gIHVwZGF0ZU5Gb3JSZWFkanVzdDogKG5Gb3JSZWFkanVzdDogbnVtYmVyKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICBhdXRvQWRqdXN0OiBBdXRvQWRqdXN0VHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBUcmlnZ2VyUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyaWdnZXJPcHRpb25zIHtcbiAgcmVmX0FjdGl2ZU5hbWVzOiBzdHJpbmdbXTtcbiAgcGFyYW1ldGVyczogVHJpZ2dlclBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFRyaWdnZXJUeXBlID0gKG9wdGlvbnM6IFRyaWdnZXJPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgVHJpZ2dlciB7XG4gIC8qKlxuICAgKiBUcmlnZ2VycyBhbiB1cGRhdGUgdG8gdGhlIHNjcmVlbiBjbGllbnQgYmFzZWQgb24gdGhlIHByb3ZpZGVkIHBhcmFtZXRlcnMuXG4gICAqXG4gICAqIEBwYXJhbSB7VHJpZ2dlck9wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgdHJpZ2dlcmluZyB0aGUgdXBkYXRlLlxuICAgKiBAcGFyYW0ge3N0cmluZ1tdfSBvcHRpb25zLnJlZl9BY3RpdmVOYW1lcyAtIFJlZmVyZW5jZSB0byB0aGUgYWN0aXZlIG5hbWVzLlxuICAgKiBAcGFyYW0ge1BhcmFtZXRlcnN9IG9wdGlvbnMucGFyYW1ldGVycyAtIFRoZSBwYXJhbWV0ZXJzIGZvciB0aGUgdHJpZ2dlci5cbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIHRyaWdnZXIgaXMgY29tcGxldGUuXG4gICAqXG4gICAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGUgdXBkYXRlU2NyZWVuQ2xpZW50IG9wZXJhdGlvbiBmYWlscy5cbiAgICpcbiAgICogQHJlbWFya3NcbiAgICogVGhpcyBmdW5jdGlvbiBoYW5kbGVzIHZhcmlvdXMgY29uZGl0aW9ucyB0byBkZXRlcm1pbmUgdGhlIG1haW4gc2NyZWVuIHBlcnNvbixcbiAgICogYWRqdXN0cyB0aGUgc2NyZWVuIHN0YXRlcywgYW5kIGVtaXRzIGFuIHVwZGF0ZSB0byB0aGUgc2NyZWVuIGNsaWVudCB2aWEgc29ja2V0LlxuICAgKlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIGF3YWl0IHRyaWdnZXIoe1xuICAgKiAgIHJlZl9BY3RpdmVOYW1lczogW1widXNlcjFcIiwgXCJ1c2VyMlwiXSxcbiAgICogICBwYXJhbWV0ZXJzOiB7XG4gICAqICAgICBzb2NrZXQ6IHNvY2tldEluc3RhbmNlLFxuICAgKiAgICAgcm9vbU5hbWU6IFwicm9vbTFcIixcbiAgICogICAgIHNjcmVlblN0YXRlczogW3sgbWFpblNjcmVlblBlcnNvbjogXCJ1c2VyMVwiLCBtYWluU2NyZWVuRmlsbGVkOiB0cnVlLCBhZG1pbk9uTWFpblNjcmVlbjogZmFsc2UgfV0sXG4gICAqICAgICBwYXJ0aWNpcGFudHM6IFt7IG5hbWU6IFwiYWRtaW5cIiwgaXNsZXZlbDogXCIyXCIgfV0sXG4gICAqICAgICB1cGRhdGVEYXRlU3RhdGU6IDAsXG4gICAqICAgICBsYXN0VXBkYXRlOiBudWxsLFxuICAgKiAgICAgbkZvclJlYWRqdXN0OiAwLFxuICAgKiAgICAgZXZlbnRUeXBlOiBcImNvbmZlcmVuY2VcIixcbiAgICogICAgIHNoYXJlZDogZmFsc2UsXG4gICAqICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGZhbHNlLFxuICAgKiAgICAgd2hpdGVib2FyZFN0YXJ0ZWQ6IGZhbHNlLFxuICAgKiAgICAgd2hpdGVib2FyZEVuZGVkOiBmYWxzZSxcbiAgICogICAgIHVwZGF0ZVVwZGF0ZURhdGVTdGF0ZTogKGRhdGUpID0+IHt9LFxuICAgKiAgICAgdXBkYXRlTGFzdFVwZGF0ZTogKGRhdGUpID0+IHt9LFxuICAgKiAgICAgdXBkYXRlTkZvclJlYWRqdXN0OiAobikgPT4ge30sXG4gICAqICAgICBhdXRvQWRqdXN0OiBhc3luYyAoeyBuLCBwYXJhbWV0ZXJzIH0pID0+IFtuLCAwXSxcbiAgICogICB9LFxuICAgKiB9KTtcbiAgICogYGBgXG4gICAqL1xuICBhc3luYyB0cmlnZ2VyKHsgcmVmX0FjdGl2ZU5hbWVzLCBwYXJhbWV0ZXJzIH06IFRyaWdnZXJPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gRnVuY3Rpb24gdG8gdHJpZ2dlciB0aGUgdXBkYXRlU2NyZWVuIGV2ZW50XG5cbiAgICB0cnkge1xuICAgICAgbGV0IHtcbiAgICAgICAgc29ja2V0LFxuICAgICAgICByb29tTmFtZSxcbiAgICAgICAgc2NyZWVuU3RhdGVzLFxuICAgICAgICBwYXJ0aWNpcGFudHMsXG4gICAgICAgIHVwZGF0ZURhdGVTdGF0ZSxcbiAgICAgICAgbGFzdFVwZGF0ZSxcbiAgICAgICAgbkZvclJlYWRqdXN0LFxuICAgICAgICBldmVudFR5cGUsXG4gICAgICAgIHNoYXJlZCxcbiAgICAgICAgc2hhcmVTY3JlZW5TdGFydGVkLFxuICAgICAgICB3aGl0ZWJvYXJkU3RhcnRlZCxcbiAgICAgICAgd2hpdGVib2FyZEVuZGVkLFxuXG4gICAgICAgIHVwZGF0ZVVwZGF0ZURhdGVTdGF0ZSxcbiAgICAgICAgdXBkYXRlTGFzdFVwZGF0ZSxcbiAgICAgICAgdXBkYXRlTkZvclJlYWRqdXN0LFxuXG4gICAgICAgIGF1dG9BZGp1c3QsXG4gICAgICB9ID0gcGFyYW1ldGVycztcblxuICAgICAgbGV0IHBlcnNvbk9uTWFpblNjcmVlbiA9IHNjcmVlblN0YXRlc1swXS5tYWluU2NyZWVuUGVyc29uO1xuXG4gICAgICBsZXQgYWRtaW5OYW1lID0gJyc7XG4gICAgICBjb25zdCBhZG1pbiA9IHBhcnRpY2lwYW50cy5maWx0ZXIoKHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudCkgPT4gcGFydGljaXBhbnQuaXNsZXZlbCA9PSAnMicpO1xuICAgICAgaWYgKGFkbWluLmxlbmd0aCA+IDApIHtcbiAgICAgICAgYWRtaW5OYW1lID0gYWRtaW5bMF0ubmFtZSB8fCAnJztcbiAgICAgIH1cbiAgICAgIGlmIChwZXJzb25Pbk1haW5TY3JlZW4gPT09ICdXaGl0ZWJvYXJkQWN0aXZlJykge1xuICAgICAgICBwZXJzb25Pbk1haW5TY3JlZW4gPSBhZG1pbk5hbWU7XG4gICAgICB9XG5cbiAgICAgIGxldCBtYWluZmlsbGVkID0gc2NyZWVuU3RhdGVzWzBdLm1haW5TY3JlZW5GaWxsZWQ7XG4gICAgICBsZXQgYWRtaW5Pbk1haW4gPSBzY3JlZW5TdGF0ZXNbMF0uYWRtaW5Pbk1haW5TY3JlZW47XG4gICAgICBsZXQgbkZvclJlYWRqdXN0XztcbiAgICAgIGxldCB2YWwxO1xuXG4gICAgICBsZXQgbm93dyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgLy8gZ2V0IG5vdyBpbiBzZWNvbmRzXG4gICAgICBsZXQgdGltZXN0YW1wID0gTWF0aC5mbG9vcihub3d3IC8gMTAwMCk7XG5cbiAgICAgIGxldCBldmVudFBhc3MgPSBmYWxzZTtcbiAgICAgIGlmIChldmVudFR5cGUgPT09ICdjb25mZXJlbmNlJyAmJiAhKHNoYXJlZCB8fCBzaGFyZVNjcmVlblN0YXJ0ZWQpKSB7XG4gICAgICAgIGV2ZW50UGFzcyA9IHRydWU7XG4gICAgICAgIHBlcnNvbk9uTWFpblNjcmVlbiA9IGFkbWluTmFtZTtcbiAgICAgICAgaWYgKCFyZWZfQWN0aXZlTmFtZXMuaW5jbHVkZXMoYWRtaW5OYW1lKSkge1xuICAgICAgICAgIHJlZl9BY3RpdmVOYW1lcy51bnNoaWZ0KGFkbWluTmFtZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKChtYWluZmlsbGVkICYmIHBlcnNvbk9uTWFpblNjcmVlbiAhPSBudWxsICYmIGFkbWluT25NYWluKSB8fCBldmVudFBhc3MpIHtcbiAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ2NvbmZlcmVuY2UnKSB7XG4gICAgICAgICAgbkZvclJlYWRqdXN0ID0gbkZvclJlYWRqdXN0ICsgMTtcbiAgICAgICAgICB1cGRhdGVORm9yUmVhZGp1c3QobkZvclJlYWRqdXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghcmVmX0FjdGl2ZU5hbWVzLmluY2x1ZGVzKGFkbWluTmFtZSkgJiYgd2hpdGVib2FyZFN0YXJ0ZWQgJiYgIXdoaXRlYm9hcmRFbmRlZCkge1xuICAgICAgICAgIHJlZl9BY3RpdmVOYW1lcy51bnNoaWZ0KGFkbWluTmFtZSk7XG4gICAgICAgIH1cblxuICAgICAgICBuRm9yUmVhZGp1c3RfID0gcmVmX0FjdGl2ZU5hbWVzLmxlbmd0aDtcblxuICAgICAgICBpZiAobkZvclJlYWRqdXN0XyA9PT0gMCAmJiBldmVudFR5cGUgPT09ICd3ZWJpbmFyJykge1xuICAgICAgICAgIHZhbDEgPSAwO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IFt2YWwxMV0gPSBhd2FpdCBhdXRvQWRqdXN0KHtcbiAgICAgICAgICAgIG46IG5Gb3JSZWFkanVzdF8sXG4gICAgICAgICAgICBldmVudFR5cGUsXG4gICAgICAgICAgICBzaGFyZWQsXG4gICAgICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdmFsMSA9IHZhbDExO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IGNhbGMxID0gTWF0aC5mbG9vcigodmFsMSAvIDEyKSAqIDEwMCk7XG4gICAgICAgIGxldCBjYWxjMiA9IDEwMCAtIGNhbGMxO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGxhc3RVcGRhdGUgaXMgbm90IG51bGwgYW5kIGF0IGxlYXN0IHNhbWUgc2Vjb25kc1xuICAgICAgICBpZiAobGFzdFVwZGF0ZSA9PSBudWxsIHx8IHVwZGF0ZURhdGVTdGF0ZSAhPSB0aW1lc3RhbXApIHtcbiAgICAgICAgICBsZXQgbm93ID0gbmV3IERhdGUoKTtcblxuICAgICAgICAgIHNvY2tldC5lbWl0KFxuICAgICAgICAgICAgJ3VwZGF0ZVNjcmVlbkNsaWVudCcsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHJvb21OYW1lLFxuICAgICAgICAgICAgICBuYW1lczogcmVmX0FjdGl2ZU5hbWVzLFxuICAgICAgICAgICAgICBtYWluUGVyY2VudDogY2FsYzIsXG4gICAgICAgICAgICAgIG1haW5TY3JlZW5QZXJzb246IHBlcnNvbk9uTWFpblNjcmVlbixcbiAgICAgICAgICAgICAgdmlld1R5cGU6IGV2ZW50VHlwZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAoeyBzdWNjZXNzLCByZWFzb24gfTogeyBzdWNjZXNzOiBib29sZWFuOyByZWFzb246IHN0cmluZyB9KSA9PiB7XG4gICAgICAgICAgICAgIHVwZGF0ZURhdGVTdGF0ZSA9IHRpbWVzdGFtcDtcbiAgICAgICAgICAgICAgdXBkYXRlVXBkYXRlRGF0ZVN0YXRlKHVwZGF0ZURhdGVTdGF0ZSk7XG4gICAgICAgICAgICAgIGxhc3RVcGRhdGUgPSBNYXRoLmZsb29yKG5vdy5nZXRUaW1lKCkgLyAxMDAwKTtcbiAgICAgICAgICAgICAgdXBkYXRlTGFzdFVwZGF0ZShsYXN0VXBkYXRlKTtcbiAgICAgICAgICAgICAgaWYgKHN1Y2Nlc3MpIHtcbiAgICAgICAgICAgICAgICAvLyBoYW5kbGUgc3VjY2Vzc1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlYXNvbiwgJ3VwZGF0ZVNjcmVlbkNsaWVudCBmYWlsZWQnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG1haW5maWxsZWQgJiYgcGVyc29uT25NYWluU2NyZWVuICE9IG51bGwgJiYgIWFkbWluT25NYWluKSB7XG4gICAgICAgIG5Gb3JSZWFkanVzdF8gPSByZWZfQWN0aXZlTmFtZXMubGVuZ3RoO1xuXG4gICAgICAgIGlmICghcmVmX0FjdGl2ZU5hbWVzLmluY2x1ZGVzKGFkbWluTmFtZSkpIHtcbiAgICAgICAgICByZWZfQWN0aXZlTmFtZXMudW5zaGlmdChhZG1pbk5hbWUpO1xuICAgICAgICAgIG5Gb3JSZWFkanVzdF8gPSByZWZfQWN0aXZlTmFtZXMubGVuZ3RoO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgW3ZhbDExXSA9IGF3YWl0IGF1dG9BZGp1c3Qoe1xuICAgICAgICAgIG46IG5Gb3JSZWFkanVzdF8sXG4gICAgICAgICAgZXZlbnRUeXBlLFxuICAgICAgICAgIHNoYXJlZCxcbiAgICAgICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHZhbDEgPSB2YWwxMTtcblxuICAgICAgICBjb25zdCBjYWxjMSA9IE1hdGguZmxvb3IoKHZhbDEgLyAxMikgKiAxMDApO1xuICAgICAgICBjb25zdCBjYWxjMiA9IDEwMCAtIGNhbGMxO1xuXG4gICAgICAgIGlmIChsYXN0VXBkYXRlID09IG51bGwgfHwgdXBkYXRlRGF0ZVN0YXRlICE9IHRpbWVzdGFtcCkge1xuICAgICAgICAgIGxldCBub3cgPSBuZXcgRGF0ZSgpO1xuXG4gICAgICAgICAgc29ja2V0LmVtaXQoXG4gICAgICAgICAgICAndXBkYXRlU2NyZWVuQ2xpZW50JyxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgcm9vbU5hbWUsXG4gICAgICAgICAgICAgIG5hbWVzOiByZWZfQWN0aXZlTmFtZXMsXG4gICAgICAgICAgICAgIG1haW5QZXJjZW50OiBjYWxjMixcbiAgICAgICAgICAgICAgbWFpblNjcmVlblBlcnNvbjogcGVyc29uT25NYWluU2NyZWVuLFxuICAgICAgICAgICAgICB2aWV3VHlwZTogZXZlbnRUeXBlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICh7IHN1Y2Nlc3MsIHJlYXNvbiB9OiB7IHN1Y2Nlc3M6IGJvb2xlYW47IHJlYXNvbjogc3RyaW5nIH0pID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlRGF0ZVN0YXRlID0gdGltZXN0YW1wO1xuICAgICAgICAgICAgICB1cGRhdGVVcGRhdGVEYXRlU3RhdGUodXBkYXRlRGF0ZVN0YXRlKTtcbiAgICAgICAgICAgICAgbGFzdFVwZGF0ZSA9IE1hdGguZmxvb3Iobm93LmdldFRpbWUoKSAvIDEwMDApO1xuICAgICAgICAgICAgICB1cGRhdGVMYXN0VXBkYXRlKGxhc3RVcGRhdGUpO1xuICAgICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xuICAgICAgICAgICAgICAgIC8vIGhhbmRsZSBzdWNjZXNzXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVhc29uLCAndXBkYXRlU2NyZWVuQ2xpZW50IGZhaWxlZCcpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIHN0b3AgcmVjb3JkaW5nXG4gICAgICAgIGNvbnNvbGUubG9nKCd0cmlnZ2VyIHN0b3BSZWNvcmRpbmcnKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5sb2coJ0Vycm9yIHRyaWdnZXJpbmcgdXBkYXRlU2NyZWVuOicsIGVycm9yKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==