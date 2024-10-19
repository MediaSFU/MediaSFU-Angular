import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjZXItbWVkaWEtcGF1c2VkLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvcHJvZHVjZXJzL3NvY2tldC1yZWNlaXZlLW1ldGhvZHMvcHJvZHVjZXItbWVkaWEtcGF1c2VkLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFrRDNDLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsbUJBQW1CLEdBQUcsS0FBSyxFQUFFLEVBQzNCLFVBQVUsRUFDVixJQUFJLEVBQ0osSUFBSSxFQUNKLFVBQVUsR0FDaUIsRUFBaUIsRUFBRTtRQUM5QyxVQUFVLEdBQUcsVUFBVSxDQUFDLG1CQUFtQixFQUFFLENBQUM7UUFFOUMsSUFBSSxFQUNGLFlBQVksRUFDWixrQkFBa0IsRUFDbEIscUJBQXFCLEVBQ3JCLFlBQVksRUFDWixXQUFXLEVBQ1gsTUFBTSxFQUNOLGtCQUFrQixFQUNsQixnQkFBZ0IsRUFDaEIsU0FBUyxFQUNULE9BQU8sRUFDUCxrQkFBa0IsRUFDbEIsc0JBQXNCLEVBQ3RCLGNBQWMsRUFDZCxvQkFBb0IsRUFDcEIsYUFBYSxHQUNkLEdBQUcsVUFBVSxDQUFDO1FBRWYsTUFBTSxPQUFPLENBQUMsR0FBRyxDQUNmLFlBQVksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLFdBQWdCLEVBQUUsRUFBRTtZQUMxQyxJQUFJLFdBQVcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDdEIsSUFBSSxDQUFDO29CQUNILElBQ0UsV0FBVyxDQUFDLE9BQU8sSUFBSSxHQUFHO3dCQUMxQixDQUFDLFdBQVcsQ0FBQyxPQUFPO3dCQUNwQixDQUFDLE1BQU07d0JBQ1AsQ0FBQyxrQkFBa0I7d0JBQ25CLE9BQU8sSUFBSSxHQUFHLEVB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QztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBQYXJ0aWNpcGFudCxcbiAgUHJlcG9wdWxhdGVVc2VyTWVkaWFUeXBlLFxuICBSZW9yZGVyU3RyZWFtc1R5cGUsXG4gIFJlVXBkYXRlSW50ZXJQYXJhbWV0ZXJzLFxuICBSZVVwZGF0ZUludGVyVHlwZSxcbiAgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMsXG59IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZHVjZXJNZWRpYVBhdXNlZFBhcmFtZXRlcnNcbiAgZXh0ZW5kcyBQcmVwb3B1bGF0ZVVzZXJNZWRpYVBhcmFtZXRlcnMsXG4gICAgUmVvcmRlclN0cmVhbXNQYXJhbWV0ZXJzLFxuICAgIFJlVXBkYXRlSW50ZXJQYXJhbWV0ZXJzIHtcbiAgYWN0aXZlU291bmRzOiBzdHJpbmdbXTtcbiAgbWVldGluZ0Rpc3BsYXlUeXBlOiBzdHJpbmc7XG4gIG1lZXRpbmdWaWRlb09wdGltaXplZDogYm9vbGVhbjtcbiAgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdO1xuICBvbGRTb3VuZElkczogc3RyaW5nW107XG4gIHNoYXJlZDogYm9vbGVhbjtcbiAgc2hhcmVTY3JlZW5TdGFydGVkOiBib29sZWFuO1xuICB1cGRhdGVNYWluV2luZG93OiBib29sZWFuO1xuICBob3N0TGFiZWw6IHN0cmluZztcbiAgaXNsZXZlbDogc3RyaW5nO1xuICB1cGRhdGVBY3RpdmVTb3VuZHM6IChhY3RpdmVTb3VuZHM6IHN0cmluZ1tdKSA9PiB2b2lkO1xuICB1cGRhdGVVcGRhdGVNYWluV2luZG93OiAodXBkYXRlTWFpbldpbmRvdzogYm9vbGVhbikgPT4gdm9pZDtcblxuICAvLyBtZWRpYXNmdSBmdW5jdGlvbnNcbiAgcmVvcmRlclN0cmVhbXM6IFJlb3JkZXJTdHJlYW1zVHlwZTtcbiAgcHJlcG9wdWxhdGVVc2VyTWVkaWE6IFByZXBvcHVsYXRlVXNlck1lZGlhVHlwZTtcbiAgcmVVcGRhdGVJbnRlcjogUmVVcGRhdGVJbnRlclR5cGU7XG5cbiAgZ2V0VXBkYXRlZEFsbFBhcmFtczogKCkgPT4gUHJvZHVjZXJNZWRpYVBhdXNlZFBhcmFtZXRlcnM7XG4gIFtrZXk6IHN0cmluZ106IGFueTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBQcm9kdWNlck1lZGlhUGF1c2VkT3B0aW9ucyB7XG4gIHByb2R1Y2VySWQ6IHN0cmluZztcbiAga2luZDogJ2F1ZGlvJyB8ICd2aWRlbycgfCAnc2NyZWVuc2hhcmUnIHwgJ3NjcmVlbic7XG4gIG5hbWU6IHN0cmluZztcbiAgcGFyYW1ldGVyczogUHJvZHVjZXJNZWRpYVBhdXNlZFBhcmFtZXRlcnM7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFByb2R1Y2VyTWVkaWFQYXVzZWRUeXBlID0gKG9wdGlvbnM6IFByb2R1Y2VyTWVkaWFQYXVzZWRPcHRpb25zKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgUHJvZHVjZXJNZWRpYVBhdXNlZCB7XG4gIC8qKlxuICAgKiBIYW5kbGVzIHRoZSBldmVudCB3aGVuIG1lZGlhIGlzIHBhdXNlZCBmb3IgYSBwcm9kdWNlci5cbiAgICpcbiAgICogQHBhcmFtIHtQcm9kdWNlck1lZGlhUGF1c2VkT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciB0aGUgcHJvZHVjZXIgbWVkaWEgcGF1c2VkIGV2ZW50LlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5wcm9kdWNlcklkIC0gVGhlIElEIG9mIHRoZSBwcm9kdWNlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMua2luZCAtIFRoZSBraW5kIG9mIG1lZGlhIChlLmcuLCBcImF1ZGlvXCIsIFwidmlkZW9cIikuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLm5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvZHVjZXIuXG4gICAqIEBwYXJhbSB7UGFyYW1ldGVyc30gb3B0aW9ucy5wYXJhbWV0ZXJzIC0gVGhlIHBhcmFtZXRlcnMgZm9yIHRoZSBldmVudC5cbiAgICpcbiAgICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHdoZW4gdGhlIG1lZGlhIHBhdXNlZCBoYW5kbGluZyBpcyBjb21wbGV0ZS5cbiAgICpcbiAgICogQGRlc2NyaXB0aW9uXG4gICAqIFRoaXMgZnVuY3Rpb24gaGFuZGxlcyB0aGUgZXZlbnQgd2hlbiBtZWRpYSBpcyBwYXVzZWQgZm9yIGEgcHJvZHVjZXIuIEl0IHBlcmZvcm1zIHRoZSBmb2xsb3dpbmcgdGFza3M6XG4gICAqIC0gVXBkYXRlcyB0aGUgcGFyYW1ldGVycy5cbiAgICogLSBJdGVyYXRlcyB0aHJvdWdoIHBhcnRpY2lwYW50cyBhbmQgdXBkYXRlcyB0aGUgVUkgYmFzZWQgb24gdGhlaXIgbXV0ZWQgc3RhdHVzIGFuZCBvdGhlciBjb25kaXRpb25zLlxuICAgKiAtIEhhbmRsZXMgbWVldGluZyBkaXNwbGF5IHR5cGUgYW5kIG9wdGltaXplcyB0aGUgVUkgYWNjb3JkaW5nbHkuXG4gICAqIC0gTWFuYWdlcyBhdWRpbyBtZWRpYSBieSB1cGRhdGluZyB0aGUgcmVsZXZhbnQgcGFydGljaXBhbnQncyBzdGF0ZS5cbiAgICovXG4gIHByb2R1Y2VyTWVkaWFQYXVzZWQgPSBhc3luYyAoe1xuICAgIHByb2R1Y2VySWQsXG4gICAga2luZCxcbiAgICBuYW1lLFxuICAgIHBhcmFtZXRlcnMsXG4gIH06IFByb2R1Y2VyTWVkaWFQYXVzZWRPcHRpb25zKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgcGFyYW1ldGVycyA9IHBhcmFtZXRlcnMuZ2V0VXBkYXRlZEFsbFBhcmFtcygpO1xuXG4gICAgbGV0IHtcbiAgICAgIGFjdGl2ZVNvdW5kcyxcbiAgICAgIG1lZXRpbmdEaXNwbGF5VHlwZSxcbiAgICAgIG1lZXRpbmdWaWRlb09wdGltaXplZCxcbiAgICAgIHBhcnRpY2lwYW50cyxcbiAgICAgIG9sZFNvdW5kSWRzLFxuICAgICAgc2hhcmVkLFxuICAgICAgc2hhcmVTY3JlZW5TdGFydGVkLFxuICAgICAgdXBkYXRlTWFpbldpbmRvdyxcbiAgICAgIGhvc3RMYWJlbCxcbiAgICAgIGlzbGV2ZWwsXG4gICAgICB1cGRhdGVBY3RpdmVTb3VuZHMsXG4gICAgICB1cGRhdGVVcGRhdGVNYWluV2luZG93LFxuICAgICAgcmVvcmRlclN0cmVhbXMsXG4gICAgICBwcmVwb3B1bGF0ZVVzZXJNZWRpYSxcbiAgICAgIHJlVXBkYXRlSW50ZXIsXG4gICAgfSA9IHBhcmFtZXRlcnM7XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIHBhcnRpY2lwYW50cy5tYXAoYXN5bmMgKHBhcnRpY2lwYW50OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHBhcnRpY2lwYW50Lm11dGVkKSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgcGFydGljaXBhbnQuaXNsZXZlbCA9PSAnMicgJiZcbiAgICAgICAgICAgICAgIXBhcnRpY2lwYW50LnZpZGVvSUQgJiZcbiAgICAgICAgICAgICAgIXNoYXJlZCAmJlxuICAgICAgICAgICAgICAhc2hhcmVTY3JlZW5TdGFydGVkICYmXG4gICAgICAgICAgICAgIGlzbGV2ZWwgIT0gJzInXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgdXBkYXRlTWFpbldpbmRvdyA9IHRydWU7XG4gICAgICAgICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG4gICAgICAgICAgICAgIGF3YWl0IHByZXBvcHVsYXRlVXNlck1lZGlhKHsgbmFtZTogaG9zdExhYmVsLCBwYXJhbWV0ZXJzIH0pO1xuICAgICAgICAgICAgICB1cGRhdGVNYWluV2luZG93ID0gZmFsc2U7XG4gICAgICAgICAgICAgIHVwZGF0ZVVwZGF0ZU1haW5XaW5kb3codXBkYXRlTWFpbldpbmRvdyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBjYXRjaCB7XG4gICAgICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoc2hhcmVTY3JlZW5TdGFydGVkIHx8IHNoYXJlZCkge1xuICAgICAgICAgICAgaWYgKGFjdGl2ZVNvdW5kcy5pbmNsdWRlcyhwYXJ0aWNpcGFudC5uYW1lKSkge1xuICAgICAgICAgICAgICBhY3RpdmVTb3VuZHMgPSBhY3RpdmVTb3VuZHMuZmlsdGVyKFxuICAgICAgICAgICAgICAgIChhdWRpb1N0cmVhbTogYW55KSA9PiBhdWRpb1N0cmVhbSAhPSBwYXJ0aWNpcGFudC5uYW1lLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB1cGRhdGVBY3RpdmVTb3VuZHMoYWN0aXZlU291bmRzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGF3YWl0IHJlVXBkYXRlSW50ZXIoeyBuYW1lOiBwYXJ0aWNpcGFudC5uYW1lLCBhZGQ6IGZhbHNlLCBmb3JjZTogdHJ1ZSwgcGFyYW1ldGVycyB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICk7XG5cbiAgICBsZXQgY2hlY2tlciA9IGZhbHNlO1xuICAgIGlmIChcbiAgICAgIG1lZXRpbmdEaXNwbGF5VHlwZSA9PSAnbWVkaWEnIHx8XG4gICAgICAobWVldGluZ0Rpc3BsYXlUeXBlID09ICd2aWRlbycgJiYgIW1lZXRpbmdWaWRlb09wdGltaXplZClcbiAgICApIHtcbiAgICAgIGNvbnN0IHBhcnRpY2lwYW50ID0gcGFydGljaXBhbnRzLmZpbmQoKG9iajogYW55KSA9PiBvYmoubmFtZSA9PSBuYW1lKTtcbiAgICAgIGNoZWNrZXIgPSAhIXBhcnRpY2lwYW50Py52aWRlb0lEO1xuICAgICAgaWYgKCFjaGVja2VyICYmICFzaGFyZVNjcmVlblN0YXJ0ZWQgJiYgIXNoYXJlZCkge1xuICAgICAgICBhd2FpdCByZW9yZGVyU3RyZWFtcyh7IGFkZDogZmFsc2UsIHNjcmVlbkNoYW5nZWQ6IHRydWUsIHBhcmFtZXRlcnMgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGtpbmQgPT0gJ2F1ZGlvJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhbnQgPVxuICAgICAgICAgIHBhcnRpY2lwYW50cy5maW5kKChvYmo6IGFueSkgPT4gb2JqLmF1ZGlvSUQgPT0gcHJvZHVjZXJJZCkgfHxcbiAgICAgICAgICBwYXJ0aWNpcGFudHMuZmluZCgob2JqOiBhbnkpID0+IG9iai5uYW1lID09IG5hbWUpO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgcGFydGljaXBhbnQgJiZcbiAgICAgICAgICAoKHBhcnRpY2lwYW50Lm5hbWUgJiYgb2xkU291bmRJZHMuaW5jbHVkZXMocGFydGljaXBhbnQubmFtZSkpIHx8XG4gICAgICAgICAgICAobmFtZSAmJiBvbGRTb3VuZElkcy5pbmNsdWRlcyhuYW1lKSkpXG4gICAgICAgICkge1xuICAgICAgICAgIHJlVXBkYXRlSW50ZXIoe1xuICAgICAgICAgICAgbmFtZTogcGFydGljaXBhbnQubmFtZSA/PyAnJyxcbiAgICAgICAgICAgIGFkZDogZmFsc2UsXG4gICAgICAgICAgICBmb3JjZTogdHJ1ZSxcbiAgICAgICAgICAgIHBhcmFtZXRlcnMsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2gge1xuICAgICAgICAvKiBoYW5kbGUgZXJyb3IgKi9cbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG4iXX0=