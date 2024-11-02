import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Service to handle the paused state of media for a producer.
 *
 * @class
 * @name ProducerMediaPaused
 * @description
 * Handles the actions required when media is paused for a specified producer, including UI updates, participant state handling, and managing meeting display optimizations.
 *
 * @method
 * producerMediaPaused
 *
 * @param {ProducerMediaPausedOptions} options - Options to specify the producer and event details:
 *   - `producerId` {string}: The ID of the paused producer.
 *   - `kind` {string}: The type of media paused (e.g., "audio", "video").
 *   - `name` {string}: Name of the producer whose media is paused.
 *   - `parameters` {ProducerMediaPausedParameters}: Configuration and state parameters for the meeting.
 *      - `activeSounds` {string[]}: Active audio streams currently displayed.
 *      - `meetingDisplayType` {string}: Current meeting layout type (e.g., "media", "video").
 *      - `meetingVideoOptimized` {boolean}: Indicates if video is optimized.
 *      - `participants` {Participant[]}: List of all meeting participants.
 *      - `oldSoundIds` {string[]}: List of previously active audio stream IDs.
 *      - `shared` {boolean}: Indicates if the screen is currently shared.
 *      - `shareScreenStarted` {boolean}: Indicates if screen sharing has started.
 *      - `updateMainWindow` {boolean}: Specifies if the main display window should update.
 *      - `hostLabel` {string}: The label representing the host participant.
 *      - `islevel` {string}: The access level of the participant.
 *      - `updateActiveSounds` {Function}: Updates the list of active audio streams.
 *      - `updateUpdateMainWindow` {Function}: Updates the status of the main display window.
 *      - `reorderStreams` {Function}: Reorders media streams for optimized display.
 *      - `prepopulateUserMedia` {Function}: Preloads user media based on display needs.
 *      - `reUpdateInter` {Function}: Refreshes participant interactions on the UI.
 *
 * @returns {Promise<void>} Resolves when media pause handling is complete.
 *
 * @example
 * const options = {
 *   producerId: '12345',
 *   kind: 'audio',
 *   name: 'Participant A',
 *   parameters: {
 *     activeSounds: ['Participant B'],
 *     meetingDisplayType: 'video',
 *     meetingVideoOptimized: false,
 *     participants: [...],
 *     oldSoundIds: ['Participant A'],
 *     shared: false,
 *     shareScreenStarted: false,
 *     updateMainWindow: true,
 *     hostLabel: 'Host',
 *     islevel: '1',
 *     updateActiveSounds: (sounds) => { ... },
 *     updateUpdateMainWindow: (status) => { ... },
 *     reorderStreams: ({ add, screenChanged, parameters }) => { ... },
 *     prepopulateUserMedia: ({ name, parameters }) => { ... },
 *     reUpdateInter: ({ name, add, force, parameters }) => { ... }
 *   }
 * };
 *
 * producerMediaPausedService.producerMediaPaused(options)
 *   .then(() => console.log('Media pause handled'))
 *   .catch(error => console.error('Error:', error));
 */
export class ProducerMediaPaused {
    /**
     * Handles the event when media is paused for a producer.
     *
     * @param {ProducerMediaPausedOptions} options - The options for the producer media paused event.
     * @param {string} options.producerId - The ID of the producer.
     * @param {string} options.kind - The kind of media (e.g., "audio", "video").
     * @param {string} options.name - The name of the producer.
     * @param {Parameters} options.parameters - The parameters for the event.
     *
     * @returns {Promise<void>} A promise that resolves when the media paused handling is complete.
     *
     * @description
     * This function handles the event when media is paused for a producer. It performs the following tasks:
     * - Updates the parameters.
     * - Iterates through participants and updates the UI based on their muted status and other conditions.
     * - Handles meeting display type and optimizes the UI accordingly.
     * - Manages audio media by updating the relevant participant's state.
     */
    producerMediaPaused = async ({ producerId, kind, name, parameters, }) => {
        parameters = parameters.getUpdatedAllParams();
        let { activeSounds, meetingDisplayType, meetingVideoOptimized, participants, oldSoundIds, shared, shareScreenStarted, updateMainWindow, hostLabel, islevel, updateActiveSounds, updateUpdateMainWindow, reorderStreams, prepopulateUserMedia, reUpdateInter, } = parameters;
        await Promise.all(participants.map(async (participant) => {
            if (participant.muted) {
                try {
                    if (participant.islevel == '2' &&
                        !participant.videoID &&
                        !shared &&
                        !shareScreenStarted &&
                        islevel != '2') {
                        updateMainWindow = true;
                        updateUpdateMainWindow(updateMainWindow);
                        await prepopulateUserMedia({ name: hostLabel, parameters });
                        updateMainWindow = false;
                        updateUpdateMainWindow(updateMainWindow);
                    }
                }
                catch {
                    /* handle error */
                }
                if (shareScreenStarted || shared) {
                    if (activeSounds.includes(participant.name)) {
                        activeSounds = activeSounds.filter((audioStream) => audioStream != participant.name);
                        updateActiveSounds(activeSounds);
                    }
                    await reUpdateInter({ name: participant.name, add: false, force: true, parameters });
                }
            }
        }));
        let checker = false;
        if (meetingDisplayType == 'media' ||
            (meetingDisplayType == 'video' && !meetingVideoOptimized)) {
            const participant = participants.find((obj) => obj.name == name);
            checker = !!participant?.videoID;
            if (!checker && !shareScreenStarted && !shared) {
                await reorderStreams({ add: false, screenChanged: true, parameters });
            }
        }
        if (kind == 'audio') {
            try {
                const participant = participants.find((obj) => obj.audioID == producerId) ||
                    participants.find((obj) => obj.name == name);
                if (participant &&
                    ((participant.name && oldSoundIds.includes(participant.name)) ||
                        (name && oldSoundIds.includes(name)))) {
                    reUpdateInter({
                        name: participant.name ?? '',
                        add: false,
                        force: true,
                        parameters,
                    });
                }
            }
            catch {
                /* handle error */
            }
        }
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProducerMediaPaused, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProducerMediaPaused, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ProducerMediaPaused, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjZXItbWVkaWEtcGF1c2VkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcHJvZHVjZXItbWVkaWEtcGF1c2VkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUErQzNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkRHO0FBTUgsTUFBTSxPQUFPLG1CQUFtQjtJQUM5Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxtQkFBbUIsR0FBRyxLQUFLLEVBQUUsRUFDM0IsVUFBVSxFQUNWLElBQUksRUFDSixJQUFJLEVBQ0osVUFBVSxHQUNpQixFQUFpQixFQUFFO1FBQzlDLFVBQVUsR0FBRyxVQUFVLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztRQUU5QyxJQUFJLEVBQ0YsWUFBWSxFQUNaLGtCQUFrQixFQUNsQixxQkFBcUIsRUFDckIsWUFBWSxFQUNaLFdBQVcsRUFDWCxNQUFNLEVBQ04sa0JBQWtCLEVBQ2xCLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsT0FBTyxFQUNQLGtCQUFrQixFQUNsQixzQkFBc0IsRUFDdEIsY0FBYyxFQUNkLG9CQUFvQixFQUNwQixhQUFhLEdBQ2QsR0FBRyxVQUFVLENBQUM7UUFFZixNQUFNLE9BQU8sQ0FBQyxHQUFHLENBQ2YsWUFBWSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsV0FBZ0IsRUFBRSxFQUFFO1lBQzFDLElBQUksV0FBVyxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUN0QixJQUFJLENBQUM7b0JBQ0gsSUFDRSxXQUFXLENBQUMsT0FBTyxJQUFJLEdBQUc7d0JBQzFCLENBQUMsV0FBVyxDQUFDLE9BQU87d0JBQ3BCLENBQUMsTUFBTTt3QkFDUCxDQUFDLGtCQUFrQjt3QkFDbkIsT0FBTyxJQUFJLEdBQUcsRUFDZCxDQUFDO3dCQUNELGdCQUFnQixHQUFHLElBQUksQ0FBQzt3QkFDeEIsc0JBQXNCLENBQUMsZ0JBQWdCLENBQUMsQ0FBQzt3QkFDekMsTUFBTSxvQkFBb0IsQ0FBQyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLENBQUMsQ0FBQzt3QkFDNUQsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO3dCQUN6QixzQkFBc0IsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO29CQUMzQyxDQUFDO2dCQUNILENBQUM7Z0JBQUMsTUFBTSxDQUFDO29CQUNQLGtCQUFrQjtnQkFDcEIsQ0FBQztnQkFFRCxJQUFJLGtCQUFrQixJQUFJLE1BQU0sRUFBRSxDQUFDO29CQUNqQyxJQUFJLFlBQVksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7d0JBQzVDLFlBQVksR0FBRyxZQUFZLENBQUMsTUFBTSxDQUNoQyxDQUFDLFdBQWdCLEVBQUUsRUFBRSxDQUFDLFdBQVcsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUN0RCxDQUFDO3dCQUNGLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO29CQUNuQyxDQUFDO29CQUNELE1BQU0sYUFBYSxDQUFDLEVBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7Z0JBQ3ZGLENBQUM7WUFDSCxDQUFDO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztRQUVGLElBQUksT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNwQixJQUNFLGtCQUFrQixJQUFJLE9BQU87WUFDN0IsQ0FBQyxrQkFBa0IsSUFBSSxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxFQUN6RCxDQUFDO1lBQ0QsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQztZQUN0RSxPQUFPLEdBQUcsQ0FBQyxDQUFDLFdBQVcsRUFBRSxPQUFPLENBQUM7WUFDakMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQy9DLE1BQU0sY0FBYyxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFDeEUsQ0FBQztRQUNILENBQUM7UUFFRCxJQUFJLElBQUksSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUM7Z0JBQ0gsTUFBTSxXQUFXLEdBQ2YsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLE9BQU8sSUFBSSxVQUFVLENBQUM7b0JBQzFELFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUM7Z0JBQ3BELElBQ0UsV0FBVztvQkFDWCxDQUFDLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDM0QsQ0FBQyxJQUFJLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ3ZDLENBQUM7b0JBQ0QsYUFBYSxDQUFDO3dCQUNaLElBQUksRUFBRSxXQUFXLENBQUMsSUFBSSxJQUFJLEVBQUU7d0JBQzVCLEdBQUcsRUFBRSxLQUFLO3dCQUNWLEtBQUssRUFBRSxJQUFJO3dCQUNYLFVBQVU7cUJBQ1gsQ0FBQyxDQUFDO2dCQUNMLENBQUM7WUFDSCxDQUFDO1lBQUMsTUFBTSxDQUFDO2dCQUNQLGtCQUFrQjtZQUNwQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUMsQ0FBQzt1R0FoSFMsbUJBQW1COzJHQUFuQixtQkFBbUIsY0FGbEIsTUFBTTs7MkZBRVAsbUJBQW1CO2tCQUgvQixVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFBhcnRpY2lwYW50LFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVR5cGUsXG4gIFJlb3JkZXJTdHJlYW1zVHlwZSxcbiAgUmVVcGRhdGVJbnRlclBhcmFtZXRlcnMsXG4gIFJlVXBkYXRlSW50ZXJUeXBlLFxuICBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbn0gZnJvbSAnLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBQcm9kdWNlck1lZGlhUGF1c2VkUGFyYW1ldGVyc1xuICBleHRlbmRzIFByZXBvcHVsYXRlVXNlck1lZGlhUGFyYW1ldGVycyxcbiAgICBSZW9yZGVyU3RyZWFtc1BhcmFtZXRlcnMsXG4gICAgUmVVcGRhdGVJbnRlclBhcmFtZXRlcnMge1xuICBhY3RpdmVTb3VuZHM6IHN0cmluZ1tdO1xuICBtZWV0aW5nRGlzcGxheVR5cGU6IHN0cmluZztcbiAgbWVldGluZ1ZpZGVvT3B0aW1pemVkOiBib29sZWFuO1xuICBwYXJ0aWNpcGFudHM6IFBhcnRpY2lwYW50W107XG4gIG9sZFNvdW5kSWRzOiBzdHJpbmdbXTtcbiAgc2hhcmVkOiBib29sZWFuO1xuICBzaGFyZVNjcmVlblN0YXJ0ZWQ6IGJvb2xlYW47XG4gIHVwZGF0ZU1haW5XaW5kb3c6IGJvb2xlYW47XG4gIGhvc3RMYWJlbDogc3RyaW5nO1xuICBpc2xldmVsOiBzdHJpbmc7XG4gIHVwZGF0ZUFjdGl2ZVNvdW5kczogKGFjdGl2ZVNvdW5kczogc3RyaW5nW10pID0+IHZvaWQ7XG4gIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6ICh1cGRhdGVNYWluV2luZG93OiBib29sZWFuKSA9PiB2b2lkO1xuXG4gIC8vIG1lZGlhc2Z1IGZ1bmN0aW9uc1xuICByZW9yZGVyU3RyZWFtczogUmVvcmRlclN0cmVhbXNUeXBlO1xuICBwcmVwb3B1bGF0ZVVzZXJNZWRpYTogUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlO1xuICByZVVwZGF0ZUludGVyOiBSZVVwZGF0ZUludGVyVHlwZTtcblxuICBnZXRVcGRhdGVkQWxsUGFyYW1zOiAoKSA9PiBQcm9kdWNlck1lZGlhUGF1c2VkUGFyYW1ldGVycztcbiAgW2tleTogc3RyaW5nXTogYW55O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFByb2R1Y2VyTWVkaWFQYXVzZWRPcHRpb25zIHtcbiAgcHJvZHVjZXJJZDogc3RyaW5nO1xuICBraW5kOiAnYXVkaW8nIHwgJ3ZpZGVvJyB8ICdzY3JlZW5zaGFyZScgfCAnc2NyZWVuJztcbiAgbmFtZTogc3RyaW5nO1xuICBwYXJhbWV0ZXJzOiBQcm9kdWNlck1lZGlhUGF1c2VkUGFyYW1ldGVycztcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgUHJvZHVjZXJNZWRpYVBhdXNlZFR5cGUgPSAob3B0aW9uczogUHJvZHVjZXJNZWRpYVBhdXNlZE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogU2VydmljZSB0byBoYW5kbGUgdGhlIHBhdXNlZCBzdGF0ZSBvZiBtZWRpYSBmb3IgYSBwcm9kdWNlci5cbiAqXG4gKiBAY2xhc3NcbiAqIEBuYW1lIFByb2R1Y2VyTWVkaWFQYXVzZWRcbiAqIEBkZXNjcmlwdGlvblxuICogSGFuZGxlcyB0aGUgYWN0aW9ucyByZXF1aXJlZCB3aGVuIG1lZGlhIGlzIHBhdXNlZCBmb3IgYSBzcGVjaWZpZWQgcHJvZHVjZXIsIGluY2x1ZGluZyBVSSB1cGRhdGVzLCBwYXJ0aWNpcGFudCBzdGF0ZSBoYW5kbGluZywgYW5kIG1hbmFnaW5nIG1lZXRpbmcgZGlzcGxheSBvcHRpbWl6YXRpb25zLlxuICpcbiAqIEBtZXRob2RcbiAqIHByb2R1Y2VyTWVkaWFQYXVzZWRcbiAqXG4gKiBAcGFyYW0ge1Byb2R1Y2VyTWVkaWFQYXVzZWRPcHRpb25zfSBvcHRpb25zIC0gT3B0aW9ucyB0byBzcGVjaWZ5IHRoZSBwcm9kdWNlciBhbmQgZXZlbnQgZGV0YWlsczpcbiAqICAgLSBgcHJvZHVjZXJJZGAge3N0cmluZ306IFRoZSBJRCBvZiB0aGUgcGF1c2VkIHByb2R1Y2VyLlxuICogICAtIGBraW5kYCB7c3RyaW5nfTogVGhlIHR5cGUgb2YgbWVkaWEgcGF1c2VkIChlLmcuLCBcImF1ZGlvXCIsIFwidmlkZW9cIikuXG4gKiAgIC0gYG5hbWVgIHtzdHJpbmd9OiBOYW1lIG9mIHRoZSBwcm9kdWNlciB3aG9zZSBtZWRpYSBpcyBwYXVzZWQuXG4gKiAgIC0gYHBhcmFtZXRlcnNgIHtQcm9kdWNlck1lZGlhUGF1c2VkUGFyYW1ldGVyc306IENvbmZpZ3VyYXRpb24gYW5kIHN0YXRlIHBhcmFtZXRlcnMgZm9yIHRoZSBtZWV0aW5nLlxuICogICAgICAtIGBhY3RpdmVTb3VuZHNgIHtzdHJpbmdbXX06IEFjdGl2ZSBhdWRpbyBzdHJlYW1zIGN1cnJlbnRseSBkaXNwbGF5ZWQuXG4gKiAgICAgIC0gYG1lZXRpbmdEaXNwbGF5VHlwZWAge3N0cmluZ306IEN1cnJlbnQgbWVldGluZyBsYXlvdXQgdHlwZSAoZS5nLiwgXCJtZWRpYVwiLCBcInZpZGVvXCIpLlxuICogICAgICAtIGBtZWV0aW5nVmlkZW9PcHRpbWl6ZWRgIHtib29sZWFufTogSW5kaWNhdGVzIGlmIHZpZGVvIGlzIG9wdGltaXplZC5cbiAqICAgICAgLSBgcGFydGljaXBhbnRzYCB7UGFydGljaXBhbnRbXX06IExpc3Qgb2YgYWxsIG1lZXRpbmcgcGFydGljaXBhbnRzLlxuICogICAgICAtIGBvbGRTb3VuZElkc2Age3N0cmluZ1tdfTogTGlzdCBvZiBwcmV2aW91c2x5IGFjdGl2ZSBhdWRpbyBzdHJlYW0gSURzLlxuICogICAgICAtIGBzaGFyZWRgIHtib29sZWFufTogSW5kaWNhdGVzIGlmIHRoZSBzY3JlZW4gaXMgY3VycmVudGx5IHNoYXJlZC5cbiAqICAgICAgLSBgc2hhcmVTY3JlZW5TdGFydGVkYCB7Ym9vbGVhbn06IEluZGljYXRlcyBpZiBzY3JlZW4gc2hhcmluZyBoYXMgc3RhcnRlZC5cbiAqICAgICAgLSBgdXBkYXRlTWFpbldpbmRvd2Age2Jvb2xlYW59OiBTcGVjaWZpZXMgaWYgdGhlIG1haW4gZGlzcGxheSB3aW5kb3cgc2hvdWxkIHVwZGF0ZS5cbiAqICAgICAgLSBgaG9zdExhYmVsYCB7c3RyaW5nfTogVGhlIGxhYmVsIHJlcHJlc2VudGluZyB0aGUgaG9zdCBwYXJ0aWNpcGFudC5cbiAqICAgICAgLSBgaXNsZXZlbGAge3N0cmluZ306IFRoZSBhY2Nlc3MgbGV2ZWwgb2YgdGhlIHBhcnRpY2lwYW50LlxuICogICAgICAtIGB1cGRhdGVBY3RpdmVTb3VuZHNgIHtGdW5jdGlvbn06IFVwZGF0ZXMgdGhlIGxpc3Qgb2YgYWN0aXZlIGF1ZGlvIHN0cmVhbXMuXG4gKiAgICAgIC0gYHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3dgIHtGdW5jdGlvbn06IFVwZGF0ZXMgdGhlIHN0YXR1cyBvZiB0aGUgbWFpbiBkaXNwbGF5IHdpbmRvdy5cbiAqICAgICAgLSBgcmVvcmRlclN0cmVhbXNgIHtGdW5jdGlvbn06IFJlb3JkZXJzIG1lZGlhIHN0cmVhbXMgZm9yIG9wdGltaXplZCBkaXNwbGF5LlxuICogICAgICAtIGBwcmVwb3B1bGF0ZVVzZXJNZWRpYWAge0Z1bmN0aW9ufTogUHJlbG9hZHMgdXNlciBtZWRpYSBiYXNlZCBvbiBkaXNwbGF5IG5lZWRzLlxuICogICAgICAtIGByZVVwZGF0ZUludGVyYCB7RnVuY3Rpb259OiBSZWZyZXNoZXMgcGFydGljaXBhbnQgaW50ZXJhY3Rpb25zIG9uIHRoZSBVSS5cbiAqXG4gKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gUmVzb2x2ZXMgd2hlbiBtZWRpYSBwYXVzZSBoYW5kbGluZyBpcyBjb21wbGV0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogY29uc3Qgb3B0aW9ucyA9IHtcbiAqICAgcHJvZHVjZXJJZDogJzEyMzQ1JyxcbiAqICAga2luZDogJ2F1ZGlvJyxcbiAqICAgbmFtZTogJ1BhcnRpY2lwYW50IEEnLFxuICogICBwYXJhbWV0ZXJzOiB7XG4gKiAgICAgYWN0aXZlU291bmRzOiBbJ1BhcnRpY2lwYW50IEInXSxcbiAqICAgICBtZWV0aW5nRGlzcGxheVR5cGU6ICd2aWRlbycsXG4gKiAgICAgbWVldGluZ1ZpZGVvT3B0aW1pemVkOiBmYWxzZSxcbiAqICAgICBwYXJ0aWNpcGFudHM6IFsuLi5dLFxuICogICAgIG9sZFNvdW5kSWRzOiBbJ1BhcnRpY2lwYW50IEEnXSxcbiAqICAgICBzaGFyZWQ6IGZhbHNlLFxuICogICAgIHNoYXJlU2NyZWVuU3RhcnRlZDogZmFsc2UsXG4gKiAgICAgdXBkYXRlTWFpbldpbmRvdzogdHJ1ZSxcbiAqICAgICBob3N0TGFiZWw6ICdIb3N0JyxcbiAqICAgICBpc2xldmVsOiAnMScsXG4gKiAgICAgdXBkYXRlQWN0aXZlU291bmRzOiAoc291bmRzKSA9PiB7IC4uLiB9LFxuICogICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3c6IChzdGF0dXMpID0+IHsgLi4uIH0sXG4gKiAgICAgcmVvcmRlclN0cmVhbXM6ICh7IGFkZCwgc2NyZWVuQ2hhbmdlZCwgcGFyYW1ldGVycyB9KSA9PiB7IC4uLiB9LFxuICogICAgIHByZXBvcHVsYXRlVXNlck1lZGlhOiAoeyBuYW1lLCBwYXJhbWV0ZXJzIH0pID0+IHsgLi4uIH0sXG4gKiAgICAgcmVVcGRhdGVJbnRlcjogKHsgbmFtZSwgYWRkLCBmb3JjZSwgcGFyYW1ldGVycyB9KSA9PiB7IC4uLiB9XG4gKiAgIH1cbiAqIH07XG4gKlxuICogcHJvZHVjZXJNZWRpYVBhdXNlZFNlcnZpY2UucHJvZHVjZXJNZWRpYVBhdXNlZChvcHRpb25zKVxuICogICAudGhlbigoKSA9PiBjb25zb2xlLmxvZygnTWVkaWEgcGF1c2UgaGFuZGxlZCcpKVxuICogICAuY2F0Y2goZXJyb3IgPT4gY29uc29sZS5lcnJvcignRXJyb3I6JywgZXJyb3IpKTtcbiAqL1xuXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBQcm9kdWNlck1lZGlhUGF1c2VkIHtcbiAgLyoqXG4gICAqIEhhbmRsZXMgdGhlIGV2ZW50IHdoZW4gbWVkaWEgaXMgcGF1c2VkIGZvciBhIHByb2R1Y2VyLlxuICAgKlxuICAgKiBAcGFyYW0ge1Byb2R1Y2VyTWVkaWFQYXVzZWRPcHRpb25zfSBvcHRpb25zIC0gVGhlIG9wdGlvbnMgZm9yIHRoZSBwcm9kdWNlciBtZWRpYSBwYXVzZWQgZXZlbnQuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnByb2R1Y2VySWQgLSBUaGUgSUQgb2YgdGhlIHByb2R1Y2VyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5raW5kIC0gVGhlIGtpbmQgb2YgbWVkaWEgKGUuZy4sIFwiYXVkaW9cIiwgXCJ2aWRlb1wiKS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMubmFtZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm9kdWNlci5cbiAgICogQHBhcmFtIHtQYXJhbWV0ZXJzfSBvcHRpb25zLnBhcmFtZXRlcnMgLSBUaGUgcGFyYW1ldGVycyBmb3IgdGhlIGV2ZW50LlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTx2b2lkPn0gQSBwcm9taXNlIHRoYXQgcmVzb2x2ZXMgd2hlbiB0aGUgbWVkaWEgcGF1c2VkIGhhbmRsaW5nIGlzIGNvbXBsZXRlLlxuICAgKlxuICAgKiBAZGVzY3JpcHRpb25cbiAgICogVGhpcyBmdW5jdGlvbiBoYW5kbGVzIHRoZSBldmVudCB3aGVuIG1lZGlhIGlzIHBhdXNlZCBmb3IgYSBwcm9kdWNlci4gSXQgcGVyZm9ybXMgdGhlIGZvbGxvd2luZyB0YXNrczpcbiAgICogLSBVcGRhdGVzIHRoZSBwYXJhbWV0ZXJzLlxuICAgKiAtIEl0ZXJhdGVzIHRocm91Z2ggcGFydGljaXBhbnRzIGFuZCB1cGRhdGVzIHRoZSBVSSBiYXNlZCBvbiB0aGVpciBtdXRlZCBzdGF0dXMgYW5kIG90aGVyIGNvbmRpdGlvbnMuXG4gICAqIC0gSGFuZGxlcyBtZWV0aW5nIGRpc3BsYXkgdHlwZSBhbmQgb3B0aW1pemVzIHRoZSBVSSBhY2NvcmRpbmdseS5cbiAgICogLSBNYW5hZ2VzIGF1ZGlvIG1lZGlhIGJ5IHVwZGF0aW5nIHRoZSByZWxldmFudCBwYXJ0aWNpcGFudCdzIHN0YXRlLlxuICAgKi9cbiAgcHJvZHVjZXJNZWRpYVBhdXNlZCA9IGFzeW5jICh7XG4gICAgcHJvZHVjZXJJZCxcbiAgICBraW5kLFxuICAgIG5hbWUsXG4gICAgcGFyYW1ldGVycyxcbiAgfTogUHJvZHVjZXJNZWRpYVBhdXNlZE9wdGlvbnMpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBwYXJhbWV0ZXJzID0gcGFyYW1ldGVycy5nZXRVcGRhdGVkQWxsUGFyYW1zKCk7XG5cbiAgICBsZXQge1xuICAgICAgYWN0aXZlU291bmRzLFxuICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlLFxuICAgICAgbWVldGluZ1ZpZGVvT3B0aW1pemVkLFxuICAgICAgcGFydGljaXBhbnRzLFxuICAgICAgb2xkU291bmRJZHMsXG4gICAgICBzaGFyZWQsXG4gICAgICBzaGFyZVNjcmVlblN0YXJ0ZWQsXG4gICAgICB1cGRhdGVNYWluV2luZG93LFxuICAgICAgaG9zdExhYmVsLFxuICAgICAgaXNsZXZlbCxcbiAgICAgIHVwZGF0ZUFjdGl2ZVNvdW5kcyxcbiAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3csXG4gICAgICByZW9yZGVyU3RyZWFtcyxcbiAgICAgIHByZXBvcHVsYXRlVXNlck1lZGlhLFxuICAgICAgcmVVcGRhdGVJbnRlcixcbiAgICB9ID0gcGFyYW1ldGVycztcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgcGFydGljaXBhbnRzLm1hcChhc3luYyAocGFydGljaXBhbnQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAocGFydGljaXBhbnQubXV0ZWQpIHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBwYXJ0aWNpcGFudC5pc2xldmVsID09ICcyJyAmJlxuICAgICAgICAgICAgICAhcGFydGljaXBhbnQudmlkZW9JRCAmJlxuICAgICAgICAgICAgICAhc2hhcmVkICYmXG4gICAgICAgICAgICAgICFzaGFyZVNjcmVlblN0YXJ0ZWQgJiZcbiAgICAgICAgICAgICAgaXNsZXZlbCAhPSAnMidcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB1cGRhdGVNYWluV2luZG93ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh1cGRhdGVNYWluV2luZG93KTtcbiAgICAgICAgICAgICAgYXdhaXQgcHJlcG9wdWxhdGVVc2VyTWVkaWEoeyBuYW1lOiBob3N0TGFiZWwsIHBhcmFtZXRlcnMgfSk7XG4gICAgICAgICAgICAgIHVwZGF0ZU1haW5XaW5kb3cgPSBmYWxzZTtcbiAgICAgICAgICAgICAgdXBkYXRlVXBkYXRlTWFpbldpbmRvdyh1cGRhdGVNYWluV2luZG93KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIHtcbiAgICAgICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChzaGFyZVNjcmVlblN0YXJ0ZWQgfHwgc2hhcmVkKSB7XG4gICAgICAgICAgICBpZiAoYWN0aXZlU291bmRzLmluY2x1ZGVzKHBhcnRpY2lwYW50Lm5hbWUpKSB7XG4gICAgICAgICAgICAgIGFjdGl2ZVNvdW5kcyA9IGFjdGl2ZVNvdW5kcy5maWx0ZXIoXG4gICAgICAgICAgICAgICAgKGF1ZGlvU3RyZWFtOiBhbnkpID0+IGF1ZGlvU3RyZWFtICE9IHBhcnRpY2lwYW50Lm5hbWUsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHVwZGF0ZUFjdGl2ZVNvdW5kcyhhY3RpdmVTb3VuZHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgYXdhaXQgcmVVcGRhdGVJbnRlcih7IG5hbWU6IHBhcnRpY2lwYW50Lm5hbWUsIGFkZDogZmFsc2UsIGZvcmNlOiB0cnVlLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcblxuICAgIGxldCBjaGVja2VyID0gZmFsc2U7XG4gICAgaWYgKFxuICAgICAgbWVldGluZ0Rpc3BsYXlUeXBlID09ICdtZWRpYScgfHxcbiAgICAgIChtZWV0aW5nRGlzcGxheVR5cGUgPT0gJ3ZpZGVvJyAmJiAhbWVldGluZ1ZpZGVvT3B0aW1pemVkKVxuICAgICkge1xuICAgICAgY29uc3QgcGFydGljaXBhbnQgPSBwYXJ0aWNpcGFudHMuZmluZCgob2JqOiBhbnkpID0+IG9iai5uYW1lID09IG5hbWUpO1xuICAgICAgY2hlY2tlciA9ICEhcGFydGljaXBhbnQ/LnZpZGVvSUQ7XG4gICAgICBpZiAoIWNoZWNrZXIgJiYgIXNoYXJlU2NyZWVuU3RhcnRlZCAmJiAhc2hhcmVkKSB7XG4gICAgICAgIGF3YWl0IHJlb3JkZXJTdHJlYW1zKHsgYWRkOiBmYWxzZSwgc2NyZWVuQ2hhbmdlZDogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoa2luZCA9PSAnYXVkaW8nKSB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBwYXJ0aWNpcGFudCA9XG4gICAgICAgICAgcGFydGljaXBhbnRzLmZpbmQoKG9iajogYW55KSA9PiBvYmouYXVkaW9JRCA9PSBwcm9kdWNlcklkKSB8fFxuICAgICAgICAgIHBhcnRpY2lwYW50cy5maW5kKChvYmo6IGFueSkgPT4gb2JqLm5hbWUgPT0gbmFtZSk7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBwYXJ0aWNpcGFudCAmJlxuICAgICAgICAgICgocGFydGljaXBhbnQubmFtZSAmJiBvbGRTb3VuZElkcy5pbmNsdWRlcyhwYXJ0aWNpcGFudC5uYW1lKSkgfHxcbiAgICAgICAgICAgIChuYW1lICYmIG9sZFNvdW5kSWRzLmluY2x1ZGVzKG5hbWUpKSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgcmVVcGRhdGVJbnRlcih7XG4gICAgICAgICAgICBuYW1lOiBwYXJ0aWNpcGFudC5uYW1lID8/ICcnLFxuICAgICAgICAgICAgYWRkOiBmYWxzZSxcbiAgICAgICAgICAgIGZvcmNlOiB0cnVlLFxuICAgICAgICAgICAgcGFyYW1ldGVycyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8qIGhhbmRsZSBlcnJvciAqL1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbiJdfQ==