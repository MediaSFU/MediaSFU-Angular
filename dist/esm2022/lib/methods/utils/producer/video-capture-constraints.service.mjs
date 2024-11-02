import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * The `VideoCaptureConstraints` service provides various video capture constraints
 * including resolution and frame rate settings for different display sizes (landscape, portrait, and neutral).
 *
 * @service
 * @example
 * ```typescript
 * import { VideoCaptureConstraints } from './path/to/video-capture-constraints.service';
 *
 * constructor(private videoConstraints: VideoCaptureConstraints) {
 *   console.log(this.videoConstraints.hdCons); // Access HD constraints
 * }
 * ```
 *
 * @remarks
 * This service contains predefined constraints that can be used for video capture
 * settings based on the desired quality and aspect ratio. These constraints can
 * be applied when requesting media streams from the user's camera.
 *
 * @property {Object} QnHDCons - Video capture constraints for QnHD resolution (320x180).
 * @property {Object} sdCons - Video capture constraints for SD resolution (640x360).
 * @property {Object} hdCons - Video capture constraints for HD resolution (1280x720).
 * @property {Object} fhdCons - Video capture constraints for FHD resolution (1920x1080).
 * @property {Object} qhdCons - Video capture constraints for QHD resolution (2560x1440).
 *
 * @property {Object} QnHDConsPort - Video capture constraints for QnHD resolution in portrait mode.
 * @property {Object} sdConsPort - Video capture constraints for SD resolution in portrait mode.
 * @property {Object} hdConsPort - Video capture constraints for HD resolution in portrait mode.
 * @property {Object} fhdConsPort - Video capture constraints for FHD resolution in portrait mode.
 * @property {Object} qhdConsPort - Video capture constraints for QHD resolution in portrait mode.
 *
 * @property {Object} QnHDConsNeu - Video capture constraints for QnHD resolution in neutral mode.
 * @property {Object} sdConsNeu - Video capture constraints for SD resolution in neutral mode.
 * @property {Object} hdConsNeu - Video capture constraints for HD resolution in neutral mode.
 * @property {Object} fhdConsNeu - Video capture constraints for FHD resolution in neutral mode.
 * @property {Object} qhdConsNeu - Video capture constraints for QnHD resolution in neutral mode.
 *
 * @property {number} QnHDFrameRate - Frame rate for QnHD video capture (5 FPS).
 * @property {number} sdFrameRate - Frame rate for SD video capture (10 FPS).
 * @property {number} hdFrameRate - Frame rate for HD video capture (15 FPS).
 * @property {number} fhdFrameRate - Frame rate for FHD video capture (20 FPS).
 * @property {number} qhdFrameRate - Frame rate for QHD video capture (30 FPS).
 * @property {number} screenFrameRate - Frame rate for screen capture (30 FPS).
 *
 * @returns {VideoCaptureConstraints} The video capture constraints for use in media requests.
 */
export class VideoCaptureConstraints {
    // Landscape display sizes
    QnHDCons = { width: { ideal: 320 }, height: { ideal: 180 } };
    sdCons = { width: { ideal: 640 }, height: { ideal: 360 } };
    hdCons = { width: { ideal: 1280 }, height: { ideal: 720 } };
    fhdCons = { width: { ideal: 1920 }, height: { ideal: 1080 } };
    qhdCons = { width: { ideal: 2560 }, height: { ideal: 1440 } };
    // Portrait display sizes
    QnHDConsPort = { width: { ideal: 180 }, height: { ideal: 320 } };
    sdConsPort = { width: { ideal: 360 }, height: { ideal: 640 } };
    hdConsPort = { width: { ideal: 720 }, height: { ideal: 1280 } };
    fhdConsPort = { width: { ideal: 1080 }, height: { ideal: 1920 } };
    qhdConsPort = { width: { ideal: 1440 }, height: { ideal: 2560 } };
    // Neutral (Square) display sizes
    QnHDConsNeu = { width: { ideal: 240 }, height: { ideal: 240 } };
    sdConsNeu = { width: { ideal: 480 }, height: { ideal: 480 } };
    hdConsNeu = { width: { ideal: 960 }, height: { ideal: 960 } };
    fhdConsNeu = { width: { ideal: 1440 }, height: { ideal: 1440 } };
    qhdConsNeu = { width: { ideal: 1920 }, height: { ideal: 1920 } };
    // Frame rates for video capture
    QnHDFrameRate = 5;
    sdFrameRate = 10;
    hdFrameRate = 15;
    fhdFrameRate = 20;
    qhdFrameRate = 30;
    screenFrameRate = 30;
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: VideoCaptureConstraints, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: VideoCaptureConstraints, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: VideoCaptureConstraints, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tY2FwdHVyZS1jb25zdHJhaW50cy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL21ldGhvZHMvdXRpbHMvcHJvZHVjZXIvdmlkZW8tY2FwdHVyZS1jb25zdHJhaW50cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7O0FBRTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Q0c7QUFLSCxNQUFNLE9BQU8sdUJBQXVCO0lBQ2xDLDBCQUEwQjtJQUMxQixRQUFRLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7SUFDN0QsTUFBTSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO0lBQzNELE1BQU0sR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztJQUM1RCxPQUFPLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7SUFDOUQsT0FBTyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO0lBRTlELHlCQUF5QjtJQUN6QixZQUFZLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7SUFDakUsVUFBVSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO0lBQy9ELFVBQVUsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsQ0FBQztJQUNoRSxXQUFXLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7SUFDbEUsV0FBVyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO0lBRWxFLGlDQUFpQztJQUNqQyxXQUFXLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUM7SUFDaEUsU0FBUyxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDO0lBQzlELFNBQVMsR0FBRyxFQUFFLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQztJQUM5RCxVQUFVLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLENBQUM7SUFDakUsVUFBVSxHQUFHLEVBQUUsS0FBSyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxFQUFFLE1BQU0sRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO0lBRWpFLGdDQUFnQztJQUNoQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO0lBQ2xCLFdBQVcsR0FBRyxFQUFFLENBQUM7SUFDakIsV0FBVyxHQUFHLEVBQUUsQ0FBQztJQUNqQixZQUFZLEdBQUcsRUFBRSxDQUFDO0lBQ2xCLFlBQVksR0FBRyxFQUFFLENBQUM7SUFDbEIsZUFBZSxHQUFHLEVBQUUsQ0FBQzt1R0E1QlYsdUJBQXVCOzJHQUF2Qix1QkFBdUIsY0FGdEIsTUFBTTs7MkZBRVAsdUJBQXVCO2tCQUhuQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuLyoqXG4gKiBUaGUgYFZpZGVvQ2FwdHVyZUNvbnN0cmFpbnRzYCBzZXJ2aWNlIHByb3ZpZGVzIHZhcmlvdXMgdmlkZW8gY2FwdHVyZSBjb25zdHJhaW50c1xuICogaW5jbHVkaW5nIHJlc29sdXRpb24gYW5kIGZyYW1lIHJhdGUgc2V0dGluZ3MgZm9yIGRpZmZlcmVudCBkaXNwbGF5IHNpemVzIChsYW5kc2NhcGUsIHBvcnRyYWl0LCBhbmQgbmV1dHJhbCkuXG4gKlxuICogQHNlcnZpY2VcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBWaWRlb0NhcHR1cmVDb25zdHJhaW50cyB9IGZyb20gJy4vcGF0aC90by92aWRlby1jYXB0dXJlLWNvbnN0cmFpbnRzLnNlcnZpY2UnO1xuICpcbiAqIGNvbnN0cnVjdG9yKHByaXZhdGUgdmlkZW9Db25zdHJhaW50czogVmlkZW9DYXB0dXJlQ29uc3RyYWludHMpIHtcbiAqICAgY29uc29sZS5sb2codGhpcy52aWRlb0NvbnN0cmFpbnRzLmhkQ29ucyk7IC8vIEFjY2VzcyBIRCBjb25zdHJhaW50c1xuICogfVxuICogYGBgXG4gKlxuICogQHJlbWFya3NcbiAqIFRoaXMgc2VydmljZSBjb250YWlucyBwcmVkZWZpbmVkIGNvbnN0cmFpbnRzIHRoYXQgY2FuIGJlIHVzZWQgZm9yIHZpZGVvIGNhcHR1cmVcbiAqIHNldHRpbmdzIGJhc2VkIG9uIHRoZSBkZXNpcmVkIHF1YWxpdHkgYW5kIGFzcGVjdCByYXRpby4gVGhlc2UgY29uc3RyYWludHMgY2FuXG4gKiBiZSBhcHBsaWVkIHdoZW4gcmVxdWVzdGluZyBtZWRpYSBzdHJlYW1zIGZyb20gdGhlIHVzZXIncyBjYW1lcmEuXG4gKlxuICogQHByb3BlcnR5IHtPYmplY3R9IFFuSERDb25zIC0gVmlkZW8gY2FwdHVyZSBjb25zdHJhaW50cyBmb3IgUW5IRCByZXNvbHV0aW9uICgzMjB4MTgwKS5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBzZENvbnMgLSBWaWRlbyBjYXB0dXJlIGNvbnN0cmFpbnRzIGZvciBTRCByZXNvbHV0aW9uICg2NDB4MzYwKS5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBoZENvbnMgLSBWaWRlbyBjYXB0dXJlIGNvbnN0cmFpbnRzIGZvciBIRCByZXNvbHV0aW9uICgxMjgweDcyMCkuXG4gKiBAcHJvcGVydHkge09iamVjdH0gZmhkQ29ucyAtIFZpZGVvIGNhcHR1cmUgY29uc3RyYWludHMgZm9yIEZIRCByZXNvbHV0aW9uICgxOTIweDEwODApLlxuICogQHByb3BlcnR5IHtPYmplY3R9IHFoZENvbnMgLSBWaWRlbyBjYXB0dXJlIGNvbnN0cmFpbnRzIGZvciBRSEQgcmVzb2x1dGlvbiAoMjU2MHgxNDQwKS5cbiAqXG4gKiBAcHJvcGVydHkge09iamVjdH0gUW5IRENvbnNQb3J0IC0gVmlkZW8gY2FwdHVyZSBjb25zdHJhaW50cyBmb3IgUW5IRCByZXNvbHV0aW9uIGluIHBvcnRyYWl0IG1vZGUuXG4gKiBAcHJvcGVydHkge09iamVjdH0gc2RDb25zUG9ydCAtIFZpZGVvIGNhcHR1cmUgY29uc3RyYWludHMgZm9yIFNEIHJlc29sdXRpb24gaW4gcG9ydHJhaXQgbW9kZS5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBoZENvbnNQb3J0IC0gVmlkZW8gY2FwdHVyZSBjb25zdHJhaW50cyBmb3IgSEQgcmVzb2x1dGlvbiBpbiBwb3J0cmFpdCBtb2RlLlxuICogQHByb3BlcnR5IHtPYmplY3R9IGZoZENvbnNQb3J0IC0gVmlkZW8gY2FwdHVyZSBjb25zdHJhaW50cyBmb3IgRkhEIHJlc29sdXRpb24gaW4gcG9ydHJhaXQgbW9kZS5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBxaGRDb25zUG9ydCAtIFZpZGVvIGNhcHR1cmUgY29uc3RyYWludHMgZm9yIFFIRCByZXNvbHV0aW9uIGluIHBvcnRyYWl0IG1vZGUuXG4gKlxuICogQHByb3BlcnR5IHtPYmplY3R9IFFuSERDb25zTmV1IC0gVmlkZW8gY2FwdHVyZSBjb25zdHJhaW50cyBmb3IgUW5IRCByZXNvbHV0aW9uIGluIG5ldXRyYWwgbW9kZS5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBzZENvbnNOZXUgLSBWaWRlbyBjYXB0dXJlIGNvbnN0cmFpbnRzIGZvciBTRCByZXNvbHV0aW9uIGluIG5ldXRyYWwgbW9kZS5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBoZENvbnNOZXUgLSBWaWRlbyBjYXB0dXJlIGNvbnN0cmFpbnRzIGZvciBIRCByZXNvbHV0aW9uIGluIG5ldXRyYWwgbW9kZS5cbiAqIEBwcm9wZXJ0eSB7T2JqZWN0fSBmaGRDb25zTmV1IC0gVmlkZW8gY2FwdHVyZSBjb25zdHJhaW50cyBmb3IgRkhEIHJlc29sdXRpb24gaW4gbmV1dHJhbCBtb2RlLlxuICogQHByb3BlcnR5IHtPYmplY3R9IHFoZENvbnNOZXUgLSBWaWRlbyBjYXB0dXJlIGNvbnN0cmFpbnRzIGZvciBRbkhEIHJlc29sdXRpb24gaW4gbmV1dHJhbCBtb2RlLlxuICpcbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBRbkhERnJhbWVSYXRlIC0gRnJhbWUgcmF0ZSBmb3IgUW5IRCB2aWRlbyBjYXB0dXJlICg1IEZQUykuXG4gKiBAcHJvcGVydHkge251bWJlcn0gc2RGcmFtZVJhdGUgLSBGcmFtZSByYXRlIGZvciBTRCB2aWRlbyBjYXB0dXJlICgxMCBGUFMpLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGhkRnJhbWVSYXRlIC0gRnJhbWUgcmF0ZSBmb3IgSEQgdmlkZW8gY2FwdHVyZSAoMTUgRlBTKS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBmaGRGcmFtZVJhdGUgLSBGcmFtZSByYXRlIGZvciBGSEQgdmlkZW8gY2FwdHVyZSAoMjAgRlBTKS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBxaGRGcmFtZVJhdGUgLSBGcmFtZSByYXRlIGZvciBRSEQgdmlkZW8gY2FwdHVyZSAoMzAgRlBTKS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBzY3JlZW5GcmFtZVJhdGUgLSBGcmFtZSByYXRlIGZvciBzY3JlZW4gY2FwdHVyZSAoMzAgRlBTKS5cbiAqXG4gKiBAcmV0dXJucyB7VmlkZW9DYXB0dXJlQ29uc3RyYWludHN9IFRoZSB2aWRlbyBjYXB0dXJlIGNvbnN0cmFpbnRzIGZvciB1c2UgaW4gbWVkaWEgcmVxdWVzdHMuXG4gKi9cblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIFZpZGVvQ2FwdHVyZUNvbnN0cmFpbnRzIHtcbiAgLy8gTGFuZHNjYXBlIGRpc3BsYXkgc2l6ZXNcbiAgUW5IRENvbnMgPSB7IHdpZHRoOiB7IGlkZWFsOiAzMjAgfSwgaGVpZ2h0OiB7IGlkZWFsOiAxODAgfSB9O1xuICBzZENvbnMgPSB7IHdpZHRoOiB7IGlkZWFsOiA2NDAgfSwgaGVpZ2h0OiB7IGlkZWFsOiAzNjAgfSB9O1xuICBoZENvbnMgPSB7IHdpZHRoOiB7IGlkZWFsOiAxMjgwIH0sIGhlaWdodDogeyBpZGVhbDogNzIwIH0gfTtcbiAgZmhkQ29ucyA9IHsgd2lkdGg6IHsgaWRlYWw6IDE5MjAgfSwgaGVpZ2h0OiB7IGlkZWFsOiAxMDgwIH0gfTtcbiAgcWhkQ29ucyA9IHsgd2lkdGg6IHsgaWRlYWw6IDI1NjAgfSwgaGVpZ2h0OiB7IGlkZWFsOiAxNDQwIH0gfTtcblxuICAvLyBQb3J0cmFpdCBkaXNwbGF5IHNpemVzXG4gIFFuSERDb25zUG9ydCA9IHsgd2lkdGg6IHsgaWRlYWw6IDE4MCB9LCBoZWlnaHQ6IHsgaWRlYWw6IDMyMCB9IH07XG4gIHNkQ29uc1BvcnQgPSB7IHdpZHRoOiB7IGlkZWFsOiAzNjAgfSwgaGVpZ2h0OiB7IGlkZWFsOiA2NDAgfSB9O1xuICBoZENvbnNQb3J0ID0geyB3aWR0aDogeyBpZGVhbDogNzIwIH0sIGhlaWdodDogeyBpZGVhbDogMTI4MCB9IH07XG4gIGZoZENvbnNQb3J0ID0geyB3aWR0aDogeyBpZGVhbDogMTA4MCB9LCBoZWlnaHQ6IHsgaWRlYWw6IDE5MjAgfSB9O1xuICBxaGRDb25zUG9ydCA9IHsgd2lkdGg6IHsgaWRlYWw6IDE0NDAgfSwgaGVpZ2h0OiB7IGlkZWFsOiAyNTYwIH0gfTtcblxuICAvLyBOZXV0cmFsIChTcXVhcmUpIGRpc3BsYXkgc2l6ZXNcbiAgUW5IRENvbnNOZXUgPSB7IHdpZHRoOiB7IGlkZWFsOiAyNDAgfSwgaGVpZ2h0OiB7IGlkZWFsOiAyNDAgfSB9O1xuICBzZENvbnNOZXUgPSB7IHdpZHRoOiB7IGlkZWFsOiA0ODAgfSwgaGVpZ2h0OiB7IGlkZWFsOiA0ODAgfSB9O1xuICBoZENvbnNOZXUgPSB7IHdpZHRoOiB7IGlkZWFsOiA5NjAgfSwgaGVpZ2h0OiB7IGlkZWFsOiA5NjAgfSB9O1xuICBmaGRDb25zTmV1ID0geyB3aWR0aDogeyBpZGVhbDogMTQ0MCB9LCBoZWlnaHQ6IHsgaWRlYWw6IDE0NDAgfSB9O1xuICBxaGRDb25zTmV1ID0geyB3aWR0aDogeyBpZGVhbDogMTkyMCB9LCBoZWlnaHQ6IHsgaWRlYWw6IDE5MjAgfSB9O1xuXG4gIC8vIEZyYW1lIHJhdGVzIGZvciB2aWRlbyBjYXB0dXJlXG4gIFFuSERGcmFtZVJhdGUgPSA1O1xuICBzZEZyYW1lUmF0ZSA9IDEwO1xuICBoZEZyYW1lUmF0ZSA9IDE1O1xuICBmaGRGcmFtZVJhdGUgPSAyMDtcbiAgcWhkRnJhbWVSYXRlID0gMzA7XG4gIHNjcmVlbkZyYW1lUmF0ZSA9IDMwO1xufVxuIl19