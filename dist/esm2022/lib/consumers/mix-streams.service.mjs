import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Mixes video and audio streams and participants based on specified parameters.
 *
 * @param {MixStreamsOptions} options - The options for mixing streams.
 * @param {Array<Stream | Participant>} options.alVideoStreams - The list of audio and video streams to mix.
 * @param {Array<Participant>} options.non_alVideoStreams - The list of non-audio and video streams to mix.
 * @param {Array<Stream | Participant>} options.ref_participants - The list of reference participants to mix.
 * @returns {Promise<Array<Stream | Participant>>} A promise that resolves with the mixed streams.
 *
 * @throws Will throw an error if there is an issue mixing the streams.
 *
 * @example
 * ```typescript
 * const mixedStreams = await mixStreams({
 *   alVideoStreams: [stream1, stream2],
 *   non_alVideoStreams: [participant1, participant2],
 *   ref_participants: [participant1, participant2],
 * });
 *
 * console.log('Mixed streams:', mixedStreams);
 * ```
 */
export class MixStreams {
    /**
     * Mixes video and audio streams and participants based on specified parameters.
     *
     * @param {Object} options - The options for mixing streams.
     * @param {Array} options.alVideoStreams - The list of audio and video streams to mix.
     * @param {Array} options.non_alVideoStreams - The list of non-audio and video streams to mix.
     * @param {Array} options.ref_participants - The list of reference participants to mix.
     * @returns {Promise<Array>} A promise that resolves with the mixed streams.
     * @throws Will throw an error if there is an issue mixing the streams.
     * @example
     * ```typescript
     * mixStreams({
     *   alVideoStreams: [stream1, stream2],
     *  non_alVideoStreams: [participant1, participant2],
     * ref_participants: [participant1, participant2]
     * });
     *
     * ```
     */
    async mixStreams({ alVideoStreams, non_alVideoStreams, ref_participants, }) {
        try {
            const mixedStreams = [];
            const youyouStream = alVideoStreams.find((obj) => obj.producerId === 'youyou' || obj.producerId === 'youyouyou');
            alVideoStreams = alVideoStreams.filter((obj) => obj.producerId !== 'youyou' && obj.producerId !== 'youyouyou');
            const unmutedAlVideoStreams = alVideoStreams.filter((obj) => {
                const participant = ref_participants.find((p) => p.videoID === obj.producerId);
                return !obj.muted && participant && participant.muted === false;
            });
            const mutedAlVideoStreams = alVideoStreams.filter((obj) => {
                const participant = ref_participants.find((p) => p.videoID === obj.producerId);
                return obj.muted || (participant && participant.muted === true);
            });
            const nonAlVideoStreams = non_alVideoStreams.slice(); // Create a copy of non_alVideoStreams
            // Add unmutedAlVideoStreams to mixedStreams
            mixedStreams.push(...unmutedAlVideoStreams);
            // Interleave the mutedAlVideoStreams and nonAlVideoStreams
            let nonAlIndex = 0;
            for (let i = 0; i < mutedAlVideoStreams.length; i++) {
                if (nonAlIndex < nonAlVideoStreams.length) {
                    mixedStreams.push(nonAlVideoStreams[nonAlIndex]);
                    nonAlIndex++;
                }
                mixedStreams.push(mutedAlVideoStreams[i]);
            }
            // Handle remaining nonAlVideoStreams (if any)
            for (let i = nonAlIndex; i < nonAlVideoStreams.length; i++) {
                mixedStreams.push(nonAlVideoStreams[i]);
            }
            // Unshift 'youyou' or 'youyouyou' stream to mixedStreams
            if (youyouStream) {
                mixedStreams.unshift(youyouStream);
            }
            return mixedStreams;
        }
        catch (error) {
            // Handle errors during the process of mixing streams
            console.log('Error mixing streams:', error.message);
            throw error;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MixStreams, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MixStreams, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MixStreams, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWl4LXN0cmVhbXMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb25zdW1lcnMvbWl4LXN0cmVhbXMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVkzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBcUJHO0FBTUgsTUFBTSxPQUFPLFVBQVU7SUFDckI7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUVILEtBQUssQ0FBQyxVQUFVLENBQUMsRUFDZixjQUFjLEVBQ2Qsa0JBQWtCLEVBQ2xCLGdCQUFnQixHQUNFO1FBQ2xCLElBQUksQ0FBQztZQUNILE1BQU0sWUFBWSxHQUFVLEVBQUUsQ0FBQztZQUMvQixNQUFNLFlBQVksR0FBRyxjQUFjLENBQUMsSUFBSSxDQUN0QyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsS0FBSyxRQUFRLElBQUksR0FBRyxDQUFDLFVBQVUsS0FBSyxXQUFXLENBQzVFLENBQUM7WUFDRixjQUFjLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FDcEMsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLEdBQUcsQ0FBQyxVQUFVLEtBQUssUUFBUSxJQUFJLEdBQUcsQ0FBQyxVQUFVLEtBQUssV0FBVyxDQUM1RSxDQUFDO1lBRUYsTUFBTSxxQkFBcUIsR0FBRyxjQUFjLENBQUMsTUFBTSxDQUFDLENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQy9ELE1BQU0sV0FBVyxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7Z0JBQ3BGLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLFdBQVcsSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQztZQUNsRSxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0sbUJBQW1CLEdBQUcsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQVEsRUFBRSxFQUFFO2dCQUM3RCxNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLEtBQUssR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNwRixPQUFPLEdBQUcsQ0FBQyxLQUFLLElBQUksQ0FBQyxXQUFXLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQztZQUNsRSxDQUFDLENBQUMsQ0FBQztZQUVILE1BQU0saUJBQWlCLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxzQ0FBc0M7WUFFNUYsNENBQTRDO1lBQzVDLFlBQVksQ0FBQyxJQUFJLENBQUMsR0FBRyxxQkFBcUIsQ0FBQyxDQUFDO1lBRTVDLDJEQUEyRDtZQUMzRCxJQUFJLFVBQVUsR0FBRyxDQUFDLENBQUM7WUFDbkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO2dCQUNwRCxJQUFJLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDMUMsWUFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO29CQUNqRCxVQUFVLEVBQUUsQ0FBQztnQkFDZixDQUFDO2dCQUNELFlBQVksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxDQUFDO1lBRUQsOENBQThDO1lBQzlDLEtBQUssSUFBSSxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDM0QsWUFBWSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFDLENBQUM7WUFFRCx5REFBeUQ7WUFDekQsSUFBSSxZQUFZLEVBQUUsQ0FBQztnQkFDakIsWUFBWSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNyQyxDQUFDO1lBRUQsT0FBTyxZQUFZLENBQUM7UUFDdEIsQ0FBQztRQUFDLE9BQU8sS0FBVSxFQUFFLENBQUM7WUFDcEIscURBQXFEO1lBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BELE1BQU0sS0FBSyxDQUFDO1FBQ2QsQ0FBQztJQUNILENBQUM7dUdBNUVVLFVBQVU7MkdBQVYsVUFBVSxjQUZULE1BQU07OzJGQUVQLFVBQVU7a0JBSHRCLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgU3RyZWFtLCBQYXJ0aWNpcGFudCB9IGZyb20gJy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWl4U3RyZWFtc09wdGlvbnMge1xuICBhbFZpZGVvU3RyZWFtczogKFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdO1xuICBub25fYWxWaWRlb1N0cmVhbXM6IFBhcnRpY2lwYW50W107XG4gIHJlZl9wYXJ0aWNpcGFudHM6IChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXTtcbn1cblxuLy8gRXhwb3J0IHRoZSB0eXBlIGRlZmluaXRpb24gZm9yIHRoZSBmdW5jdGlvblxuZXhwb3J0IHR5cGUgTWl4U3RyZWFtc1R5cGUgPSAob3B0aW9uczogTWl4U3RyZWFtc09wdGlvbnMpID0+IFByb21pc2U8KFN0cmVhbSB8IFBhcnRpY2lwYW50KVtdPjtcblxuLyoqXG4gKiBNaXhlcyB2aWRlbyBhbmQgYXVkaW8gc3RyZWFtcyBhbmQgcGFydGljaXBhbnRzIGJhc2VkIG9uIHNwZWNpZmllZCBwYXJhbWV0ZXJzLlxuICpcbiAqIEBwYXJhbSB7TWl4U3RyZWFtc09wdGlvbnN9IG9wdGlvbnMgLSBUaGUgb3B0aW9ucyBmb3IgbWl4aW5nIHN0cmVhbXMuXG4gKiBAcGFyYW0ge0FycmF5PFN0cmVhbSB8IFBhcnRpY2lwYW50Pn0gb3B0aW9ucy5hbFZpZGVvU3RyZWFtcyAtIFRoZSBsaXN0IG9mIGF1ZGlvIGFuZCB2aWRlbyBzdHJlYW1zIHRvIG1peC5cbiAqIEBwYXJhbSB7QXJyYXk8UGFydGljaXBhbnQ+fSBvcHRpb25zLm5vbl9hbFZpZGVvU3RyZWFtcyAtIFRoZSBsaXN0IG9mIG5vbi1hdWRpbyBhbmQgdmlkZW8gc3RyZWFtcyB0byBtaXguXG4gKiBAcGFyYW0ge0FycmF5PFN0cmVhbSB8IFBhcnRpY2lwYW50Pn0gb3B0aW9ucy5yZWZfcGFydGljaXBhbnRzIC0gVGhlIGxpc3Qgb2YgcmVmZXJlbmNlIHBhcnRpY2lwYW50cyB0byBtaXguXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxBcnJheTxTdHJlYW0gfCBQYXJ0aWNpcGFudD4+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBtaXhlZCBzdHJlYW1zLlxuICpcbiAqIEB0aHJvd3MgV2lsbCB0aHJvdyBhbiBlcnJvciBpZiB0aGVyZSBpcyBhbiBpc3N1ZSBtaXhpbmcgdGhlIHN0cmVhbXMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGNvbnN0IG1peGVkU3RyZWFtcyA9IGF3YWl0IG1peFN0cmVhbXMoe1xuICogICBhbFZpZGVvU3RyZWFtczogW3N0cmVhbTEsIHN0cmVhbTJdLFxuICogICBub25fYWxWaWRlb1N0cmVhbXM6IFtwYXJ0aWNpcGFudDEsIHBhcnRpY2lwYW50Ml0sXG4gKiAgIHJlZl9wYXJ0aWNpcGFudHM6IFtwYXJ0aWNpcGFudDEsIHBhcnRpY2lwYW50Ml0sXG4gKiB9KTtcbiAqXG4gKiBjb25zb2xlLmxvZygnTWl4ZWQgc3RyZWFtczonLCBtaXhlZFN0cmVhbXMpO1xuICogYGBgXG4gKi9cblxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgTWl4U3RyZWFtcyB7XG4gIC8qKlxuICAgKiBNaXhlcyB2aWRlbyBhbmQgYXVkaW8gc3RyZWFtcyBhbmQgcGFydGljaXBhbnRzIGJhc2VkIG9uIHNwZWNpZmllZCBwYXJhbWV0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge09iamVjdH0gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGZvciBtaXhpbmcgc3RyZWFtcy5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5hbFZpZGVvU3RyZWFtcyAtIFRoZSBsaXN0IG9mIGF1ZGlvIGFuZCB2aWRlbyBzdHJlYW1zIHRvIG1peC5cbiAgICogQHBhcmFtIHtBcnJheX0gb3B0aW9ucy5ub25fYWxWaWRlb1N0cmVhbXMgLSBUaGUgbGlzdCBvZiBub24tYXVkaW8gYW5kIHZpZGVvIHN0cmVhbXMgdG8gbWl4LlxuICAgKiBAcGFyYW0ge0FycmF5fSBvcHRpb25zLnJlZl9wYXJ0aWNpcGFudHMgLSBUaGUgbGlzdCBvZiByZWZlcmVuY2UgcGFydGljaXBhbnRzIHRvIG1peC5cbiAgICogQHJldHVybnMge1Byb21pc2U8QXJyYXk+fSBBIHByb21pc2UgdGhhdCByZXNvbHZlcyB3aXRoIHRoZSBtaXhlZCBzdHJlYW1zLlxuICAgKiBAdGhyb3dzIFdpbGwgdGhyb3cgYW4gZXJyb3IgaWYgdGhlcmUgaXMgYW4gaXNzdWUgbWl4aW5nIHRoZSBzdHJlYW1zLlxuICAgKiBAZXhhbXBsZVxuICAgKiBgYGB0eXBlc2NyaXB0XG4gICAqIG1peFN0cmVhbXMoe1xuICAgKiAgIGFsVmlkZW9TdHJlYW1zOiBbc3RyZWFtMSwgc3RyZWFtMl0sXG4gICAqICBub25fYWxWaWRlb1N0cmVhbXM6IFtwYXJ0aWNpcGFudDEsIHBhcnRpY2lwYW50Ml0sXG4gICAqIHJlZl9wYXJ0aWNpcGFudHM6IFtwYXJ0aWNpcGFudDEsIHBhcnRpY2lwYW50Ml1cbiAgICogfSk7XG4gICAqXG4gICAqIGBgYFxuICAgKi9cblxuICBhc3luYyBtaXhTdHJlYW1zKHtcbiAgICBhbFZpZGVvU3RyZWFtcyxcbiAgICBub25fYWxWaWRlb1N0cmVhbXMsXG4gICAgcmVmX3BhcnRpY2lwYW50cyxcbiAgfTogTWl4U3RyZWFtc09wdGlvbnMpOiBQcm9taXNlPChTdHJlYW0gfCBQYXJ0aWNpcGFudClbXT4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtaXhlZFN0cmVhbXM6IGFueVtdID0gW107XG4gICAgICBjb25zdCB5b3V5b3VTdHJlYW0gPSBhbFZpZGVvU3RyZWFtcy5maW5kKFxuICAgICAgICAob2JqOiBhbnkpID0+IG9iai5wcm9kdWNlcklkID09PSAneW91eW91JyB8fCBvYmoucHJvZHVjZXJJZCA9PT0gJ3lvdXlvdXlvdScsXG4gICAgICApO1xuICAgICAgYWxWaWRlb1N0cmVhbXMgPSBhbFZpZGVvU3RyZWFtcy5maWx0ZXIoXG4gICAgICAgIChvYmo6IGFueSkgPT4gb2JqLnByb2R1Y2VySWQgIT09ICd5b3V5b3UnICYmIG9iai5wcm9kdWNlcklkICE9PSAneW91eW91eW91JyxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHVubXV0ZWRBbFZpZGVvU3RyZWFtcyA9IGFsVmlkZW9TdHJlYW1zLmZpbHRlcigob2JqOiBhbnkpID0+IHtcbiAgICAgICAgY29uc3QgcGFydGljaXBhbnQgPSByZWZfcGFydGljaXBhbnRzLmZpbmQoKHA6IGFueSkgPT4gcC52aWRlb0lEID09PSBvYmoucHJvZHVjZXJJZCk7XG4gICAgICAgIHJldHVybiAhb2JqLm11dGVkICYmIHBhcnRpY2lwYW50ICYmIHBhcnRpY2lwYW50Lm11dGVkID09PSBmYWxzZTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBtdXRlZEFsVmlkZW9TdHJlYW1zID0gYWxWaWRlb1N0cmVhbXMuZmlsdGVyKChvYmo6IGFueSkgPT4ge1xuICAgICAgICBjb25zdCBwYXJ0aWNpcGFudCA9IHJlZl9wYXJ0aWNpcGFudHMuZmluZCgocDogYW55KSA9PiBwLnZpZGVvSUQgPT09IG9iai5wcm9kdWNlcklkKTtcbiAgICAgICAgcmV0dXJuIG9iai5tdXRlZCB8fCAocGFydGljaXBhbnQgJiYgcGFydGljaXBhbnQubXV0ZWQgPT09IHRydWUpO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IG5vbkFsVmlkZW9TdHJlYW1zID0gbm9uX2FsVmlkZW9TdHJlYW1zLnNsaWNlKCk7IC8vIENyZWF0ZSBhIGNvcHkgb2Ygbm9uX2FsVmlkZW9TdHJlYW1zXG5cbiAgICAgIC8vIEFkZCB1bm11dGVkQWxWaWRlb1N0cmVhbXMgdG8gbWl4ZWRTdHJlYW1zXG4gICAgICBtaXhlZFN0cmVhbXMucHVzaCguLi51bm11dGVkQWxWaWRlb1N0cmVhbXMpO1xuXG4gICAgICAvLyBJbnRlcmxlYXZlIHRoZSBtdXRlZEFsVmlkZW9TdHJlYW1zIGFuZCBub25BbFZpZGVvU3RyZWFtc1xuICAgICAgbGV0IG5vbkFsSW5kZXggPSAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdXRlZEFsVmlkZW9TdHJlYW1zLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChub25BbEluZGV4IDwgbm9uQWxWaWRlb1N0cmVhbXMubGVuZ3RoKSB7XG4gICAgICAgICAgbWl4ZWRTdHJlYW1zLnB1c2gobm9uQWxWaWRlb1N0cmVhbXNbbm9uQWxJbmRleF0pO1xuICAgICAgICAgIG5vbkFsSW5kZXgrKztcbiAgICAgICAgfVxuICAgICAgICBtaXhlZFN0cmVhbXMucHVzaChtdXRlZEFsVmlkZW9TdHJlYW1zW2ldKTtcbiAgICAgIH1cblxuICAgICAgLy8gSGFuZGxlIHJlbWFpbmluZyBub25BbFZpZGVvU3RyZWFtcyAoaWYgYW55KVxuICAgICAgZm9yIChsZXQgaSA9IG5vbkFsSW5kZXg7IGkgPCBub25BbFZpZGVvU3RyZWFtcy5sZW5ndGg7IGkrKykge1xuICAgICAgICBtaXhlZFN0cmVhbXMucHVzaChub25BbFZpZGVvU3RyZWFtc1tpXSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFVuc2hpZnQgJ3lvdXlvdScgb3IgJ3lvdXlvdXlvdScgc3RyZWFtIHRvIG1peGVkU3RyZWFtc1xuICAgICAgaWYgKHlvdXlvdVN0cmVhbSkge1xuICAgICAgICBtaXhlZFN0cmVhbXMudW5zaGlmdCh5b3V5b3VTdHJlYW0pO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbWl4ZWRTdHJlYW1zO1xuICAgIH0gY2F0Y2ggKGVycm9yOiBhbnkpIHtcbiAgICAgIC8vIEhhbmRsZSBlcnJvcnMgZHVyaW5nIHRoZSBwcm9jZXNzIG9mIG1peGluZyBzdHJlYW1zXG4gICAgICBjb25zb2xlLmxvZygnRXJyb3IgbWl4aW5nIHN0cmVhbXM6JywgZXJyb3IubWVzc2FnZSk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG4gIH1cbn1cbiJdfQ==