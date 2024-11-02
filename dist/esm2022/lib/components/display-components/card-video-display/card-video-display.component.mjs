import { Component, Input, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * CardVideoDisplay component displays a video stream with options for full display, mirroring, and background color customization.
 *
 * @selector app-card-video-display
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `remoteProducerId` (string): Identifier for the remote producer.
 * - `eventType` (EventType): Type of event, such as 'webinar'. Default is 'webinar'.
 * - `forceFullDisplay` (boolean): Forces full video display if true. Default is false.
 * - `videoStream` (MediaStream | null): The media stream to display in the video element.
 * - `backgroundColor` (string): Background color for the video container. Default is 'transparent'.
 * - `doMirror` (boolean): Mirrors the video if true. Default is false.
 *
 * @methods
 * - `ngOnInit()`: Initializes the video stream and sets the container style on component load.
 * - `ngOnChanges(changes: SimpleChanges)`: Updates the video stream or container style when inputs change.
 * - `updateVideoStream()`: Assigns the video stream to the video element if it differs from the current stream.
 * - `setVideoContainerStyle()`: Sets the style of the video container based on the provided background color.
 * - `getBaseVideoContainerStyle()`: Returns base styles for the video container.
 * - `getVideoStyle()`: Returns styles for the video element, including optional mirroring and sizing.
 *
 * @example
 * ```html
 * <app-card-video-display
 *  [remoteProducerId]="producerId"
 * [eventType]="'conference'"
 * [forceFullDisplay]="true"
 * [videoStream]="stream"
 * [backgroundColor]="'black'"
 * [doMirror]="true">
 * </app-card-video-display>
 * ```
 **/
export class CardVideoDisplay {
    remoteProducerId = '';
    eventType = 'webinar';
    forceFullDisplay = false;
    videoStream = null;
    backgroundColor = 'transparent';
    doMirror = false;
    videoElement;
    videoContainerStyle;
    ngOnInit() {
        this.updateVideoStream();
        this.setVideoContainerStyle();
    }
    ngOnChanges(changes) {
        if (changes['videoStream'] && this.videoStream) {
            const currentStream = changes['videoStream'].currentValue;
            const previousStream = changes['videoStream'].previousValue;
            if (!previousStream ||
                currentStream.id !== previousStream.id ||
                currentStream.active !== previousStream.active) {
                this.updateVideoStream();
            }
        }
        if (changes['backgroundColor'] &&
            changes['backgroundColor'].currentValue !== changes['backgroundColor'].previousValue) {
            this.setVideoContainerStyle();
        }
    }
    updateVideoStream() {
        if (this.videoElement && this.videoStream) {
            const videoElement = this.videoElement.nativeElement;
            // Update the video element's srcObject only if it has changed
            if (videoElement.srcObject !== this.videoStream) {
                videoElement.srcObject = this.videoStream;
            }
        }
    }
    setVideoContainerStyle() {
        this.videoContainerStyle = {
            ...this.getBaseVideoContainerStyle(),
            backgroundColor: this.backgroundColor,
        };
    }
    getBaseVideoContainerStyle() {
        return {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            backgroundColor: 'black',
        };
    }
    getVideoStyle() {
        const baseStyles = {
            width: this.forceFullDisplay ? '100%' : 'auto',
            height: '100%',
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: this.forceFullDisplay ? 'cover' : 'contain',
            backgroundColor: this.backgroundColor,
        };
        if (this.doMirror) {
            baseStyles.transform = 'rotateY(180deg)';
        }
        return baseStyles;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CardVideoDisplay, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: CardVideoDisplay, isStandalone: true, selector: "app-card-video-display", inputs: { remoteProducerId: "remoteProducerId", eventType: "eventType", forceFullDisplay: "forceFullDisplay", videoStream: "videoStream", backgroundColor: "backgroundColor", doMirror: "doMirror" }, viewQueries: [{ propertyName: "videoElement", first: true, predicate: ["videoElement"], descendants: true, static: true }], usesOnChanges: true, ngImport: i0, template: "<div [ngStyle]=\"videoContainerStyle\">\r\n  <video #videoElement autoplay muted playsinline [ngStyle]=\"getVideoStyle()\"></video>\r\n</div>\r\n", styles: [".videoContainer{display:flex;justify-content:center;align-items:center;width:100%;height:100%;background-color:#000}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CardVideoDisplay, decorators: [{
            type: Component,
            args: [{ selector: 'app-card-video-display', standalone: true, imports: [CommonModule], template: "<div [ngStyle]=\"videoContainerStyle\">\r\n  <video #videoElement autoplay muted playsinline [ngStyle]=\"getVideoStyle()\"></video>\r\n</div>\r\n", styles: [".videoContainer{display:flex;justify-content:center;align-items:center;width:100%;height:100%;background-color:#000}\n"] }]
        }], propDecorators: { remoteProducerId: [{
                type: Input
            }], eventType: [{
                type: Input
            }], forceFullDisplay: [{
                type: Input
            }], videoStream: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], doMirror: [{
                type: Input
            }], videoElement: [{
                type: ViewChild,
                args: ['videoElement', { static: true }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC12aWRlby1kaXNwbGF5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9jYXJkLXZpZGVvLWRpc3BsYXkvY2FyZC12aWRlby1kaXNwbGF5LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9jYXJkLXZpZGVvLWRpc3BsYXkvY2FyZC12aWRlby1kaXNwbGF5LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUlMLFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQWMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWtDSTtBQVVKLE1BQU0sT0FBTyxnQkFBZ0I7SUFDbEIsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0lBQ3RCLFNBQVMsR0FBYyxTQUFTLENBQUM7SUFDakMsZ0JBQWdCLEdBQUcsS0FBSyxDQUFDO0lBQ3pCLFdBQVcsR0FBdUIsSUFBSSxDQUFDO0lBQ3ZDLGVBQWUsR0FBRyxhQUFhLENBQUM7SUFDaEMsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUVtQixZQUFZLENBQWdDO0lBRXpGLG1CQUFtQixDQUFNO0lBRXpCLFFBQVE7UUFDTixJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN6QixJQUFJLENBQUMsc0JBQXNCLEVBQUUsQ0FBQztJQUNoQyxDQUFDO0lBRUQsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMvQyxNQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsWUFBWSxDQUFDO1lBQzFELE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxhQUFhLENBQUM7WUFFNUQsSUFDRSxDQUFDLGNBQWM7Z0JBQ2YsYUFBYSxDQUFDLEVBQUUsS0FBSyxjQUFjLENBQUMsRUFBRTtnQkFDdEMsYUFBYSxDQUFDLE1BQU0sS0FBSyxjQUFjLENBQUMsTUFBTSxFQUM5QyxDQUFDO2dCQUNELElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQzNCLENBQUM7UUFDSCxDQUFDO1FBRUQsSUFDRSxPQUFPLENBQUMsaUJBQWlCLENBQUM7WUFDMUIsT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsWUFBWSxLQUFLLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLGFBQWEsRUFDcEYsQ0FBQztZQUNELElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO1FBQ2hDLENBQUM7SUFDSCxDQUFDO0lBRUQsaUJBQWlCO1FBQ2YsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxQyxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUVyRCw4REFBOEQ7WUFDOUQsSUFBSSxZQUFZLENBQUMsU0FBUyxLQUFLLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztnQkFDaEQsWUFBWSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQzVDLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUVELHNCQUFzQjtRQUNwQixJQUFJLENBQUMsbUJBQW1CLEdBQUc7WUFDekIsR0FBRyxJQUFJLENBQUMsMEJBQTBCLEVBQUU7WUFDcEMsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1NBQ3RDLENBQUM7SUFDSixDQUFDO0lBRUQsMEJBQTBCO1FBQ3hCLE9BQU87WUFDTCxPQUFPLEVBQUUsTUFBTTtZQUNmLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLFVBQVUsRUFBRSxRQUFRO1lBQ3BCLEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLE1BQU07WUFDZCxlQUFlLEVBQUUsT0FBTztTQUN6QixDQUFDO0lBQ0osQ0FBQztJQUVELGFBQWE7UUFDWCxNQUFNLFVBQVUsR0FBUTtZQUN0QixLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU07WUFDOUMsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsTUFBTTtZQUNoQixTQUFTLEVBQUUsTUFBTTtZQUNqQixTQUFTLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVM7WUFDdEQsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1NBQ3RDLENBQUM7UUFFRixJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNsQixVQUFVLENBQUMsU0FBUyxHQUFHLGlCQUFpQixDQUFDO1FBQzNDLENBQUM7UUFFRCxPQUFPLFVBQVUsQ0FBQztJQUNwQixDQUFDO3VHQW5GVSxnQkFBZ0I7MkZBQWhCLGdCQUFnQix5YUNuRTdCLG1KQUdBLCtLRDREWSxZQUFZOzsyRkFJWCxnQkFBZ0I7a0JBUDVCLFNBQVM7K0JBQ0Usd0JBQXdCLGNBQ3RCLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQzs4QkFLZCxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxnQkFBZ0I7c0JBQXhCLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBRXVDLFlBQVk7c0JBQXhELFNBQVM7dUJBQUMsY0FBYyxFQUFFLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7XG4gIENvbXBvbmVudCxcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT25DaGFuZ2VzLFxuICBTaW1wbGVDaGFuZ2VzLFxuICBWaWV3Q2hpbGQsXG4gIEVsZW1lbnRSZWYsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FyZFZpZGVvRGlzcGxheU9wdGlvbnMge1xuICByZW1vdGVQcm9kdWNlcklkOiBzdHJpbmc7XG4gIGV2ZW50VHlwZTogc3RyaW5nO1xuICBmb3JjZUZ1bGxEaXNwbGF5OiBib29sZWFuO1xuICB2aWRlb1N0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsO1xuICBiYWNrZ3JvdW5kQ29sb3I6IHN0cmluZztcbiAgZG9NaXJyb3I/OiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBDYXJkVmlkZW9EaXNwbGF5VHlwZSA9IChvcHRpb25zOiBDYXJkVmlkZW9EaXNwbGF5T3B0aW9ucykgPT4gSFRNTEVsZW1lbnQ7XG5cbi8qKlxuICogQ2FyZFZpZGVvRGlzcGxheSBjb21wb25lbnQgZGlzcGxheXMgYSB2aWRlbyBzdHJlYW0gd2l0aCBvcHRpb25zIGZvciBmdWxsIGRpc3BsYXksIG1pcnJvcmluZywgYW5kIGJhY2tncm91bmQgY29sb3IgY3VzdG9taXphdGlvbi5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLWNhcmQtdmlkZW8tZGlzcGxheVxuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQGltcG9ydHMgQ29tbW9uTW9kdWxlXG4gKlxuICogQGlucHV0c1xuICogLSBgcmVtb3RlUHJvZHVjZXJJZGAgKHN0cmluZyk6IElkZW50aWZpZXIgZm9yIHRoZSByZW1vdGUgcHJvZHVjZXIuXG4gKiAtIGBldmVudFR5cGVgIChFdmVudFR5cGUpOiBUeXBlIG9mIGV2ZW50LCBzdWNoIGFzICd3ZWJpbmFyJy4gRGVmYXVsdCBpcyAnd2ViaW5hcicuXG4gKiAtIGBmb3JjZUZ1bGxEaXNwbGF5YCAoYm9vbGVhbik6IEZvcmNlcyBmdWxsIHZpZGVvIGRpc3BsYXkgaWYgdHJ1ZS4gRGVmYXVsdCBpcyBmYWxzZS5cbiAqIC0gYHZpZGVvU3RyZWFtYCAoTWVkaWFTdHJlYW0gfCBudWxsKTogVGhlIG1lZGlhIHN0cmVhbSB0byBkaXNwbGF5IGluIHRoZSB2aWRlbyBlbGVtZW50LlxuICogLSBgYmFja2dyb3VuZENvbG9yYCAoc3RyaW5nKTogQmFja2dyb3VuZCBjb2xvciBmb3IgdGhlIHZpZGVvIGNvbnRhaW5lci4gRGVmYXVsdCBpcyAndHJhbnNwYXJlbnQnLlxuICogLSBgZG9NaXJyb3JgIChib29sZWFuKTogTWlycm9ycyB0aGUgdmlkZW8gaWYgdHJ1ZS4gRGVmYXVsdCBpcyBmYWxzZS5cbiAqXG4gKiBAbWV0aG9kc1xuICogLSBgbmdPbkluaXQoKWA6IEluaXRpYWxpemVzIHRoZSB2aWRlbyBzdHJlYW0gYW5kIHNldHMgdGhlIGNvbnRhaW5lciBzdHlsZSBvbiBjb21wb25lbnQgbG9hZC5cbiAqIC0gYG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpYDogVXBkYXRlcyB0aGUgdmlkZW8gc3RyZWFtIG9yIGNvbnRhaW5lciBzdHlsZSB3aGVuIGlucHV0cyBjaGFuZ2UuXG4gKiAtIGB1cGRhdGVWaWRlb1N0cmVhbSgpYDogQXNzaWducyB0aGUgdmlkZW8gc3RyZWFtIHRvIHRoZSB2aWRlbyBlbGVtZW50IGlmIGl0IGRpZmZlcnMgZnJvbSB0aGUgY3VycmVudCBzdHJlYW0uXG4gKiAtIGBzZXRWaWRlb0NvbnRhaW5lclN0eWxlKClgOiBTZXRzIHRoZSBzdHlsZSBvZiB0aGUgdmlkZW8gY29udGFpbmVyIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBiYWNrZ3JvdW5kIGNvbG9yLlxuICogLSBgZ2V0QmFzZVZpZGVvQ29udGFpbmVyU3R5bGUoKWA6IFJldHVybnMgYmFzZSBzdHlsZXMgZm9yIHRoZSB2aWRlbyBjb250YWluZXIuXG4gKiAtIGBnZXRWaWRlb1N0eWxlKClgOiBSZXR1cm5zIHN0eWxlcyBmb3IgdGhlIHZpZGVvIGVsZW1lbnQsIGluY2x1ZGluZyBvcHRpb25hbCBtaXJyb3JpbmcgYW5kIHNpemluZy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1jYXJkLXZpZGVvLWRpc3BsYXlcbiAqICBbcmVtb3RlUHJvZHVjZXJJZF09XCJwcm9kdWNlcklkXCJcbiAqIFtldmVudFR5cGVdPVwiJ2NvbmZlcmVuY2UnXCJcbiAqIFtmb3JjZUZ1bGxEaXNwbGF5XT1cInRydWVcIlxuICogW3ZpZGVvU3RyZWFtXT1cInN0cmVhbVwiXG4gKiBbYmFja2dyb3VuZENvbG9yXT1cIidibGFjaydcIlxuICogW2RvTWlycm9yXT1cInRydWVcIj5cbiAqIDwvYXBwLWNhcmQtdmlkZW8tZGlzcGxheT5cbiAqIGBgYFxuICoqL1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1jYXJkLXZpZGVvLWRpc3BsYXknLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhcmQtdmlkZW8tZGlzcGxheS5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2NhcmQtdmlkZW8tZGlzcGxheS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIENhcmRWaWRlb0Rpc3BsYXkgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHJlbW90ZVByb2R1Y2VySWQgPSAnJztcbiAgQElucHV0KCkgZXZlbnRUeXBlOiBFdmVudFR5cGUgPSAnd2ViaW5hcic7XG4gIEBJbnB1dCgpIGZvcmNlRnVsbERpc3BsYXkgPSBmYWxzZTtcbiAgQElucHV0KCkgdmlkZW9TdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCA9IG51bGw7XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gIEBJbnB1dCgpIGRvTWlycm9yID0gZmFsc2U7XG5cbiAgQFZpZXdDaGlsZCgndmlkZW9FbGVtZW50JywgeyBzdGF0aWM6IHRydWUgfSkgdmlkZW9FbGVtZW50ITogRWxlbWVudFJlZjxIVE1MVmlkZW9FbGVtZW50PjtcblxuICB2aWRlb0NvbnRhaW5lclN0eWxlOiBhbnk7XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51cGRhdGVWaWRlb1N0cmVhbSgpO1xuICAgIHRoaXMuc2V0VmlkZW9Db250YWluZXJTdHlsZSgpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWyd2aWRlb1N0cmVhbSddICYmIHRoaXMudmlkZW9TdHJlYW0pIHtcbiAgICAgIGNvbnN0IGN1cnJlbnRTdHJlYW0gPSBjaGFuZ2VzWyd2aWRlb1N0cmVhbSddLmN1cnJlbnRWYWx1ZTtcbiAgICAgIGNvbnN0IHByZXZpb3VzU3RyZWFtID0gY2hhbmdlc1sndmlkZW9TdHJlYW0nXS5wcmV2aW91c1ZhbHVlO1xuXG4gICAgICBpZiAoXG4gICAgICAgICFwcmV2aW91c1N0cmVhbSB8fFxuICAgICAgICBjdXJyZW50U3RyZWFtLmlkICE9PSBwcmV2aW91c1N0cmVhbS5pZCB8fFxuICAgICAgICBjdXJyZW50U3RyZWFtLmFjdGl2ZSAhPT0gcHJldmlvdXNTdHJlYW0uYWN0aXZlXG4gICAgICApIHtcbiAgICAgICAgdGhpcy51cGRhdGVWaWRlb1N0cmVhbSgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGNoYW5nZXNbJ2JhY2tncm91bmRDb2xvciddICYmXG4gICAgICBjaGFuZ2VzWydiYWNrZ3JvdW5kQ29sb3InXS5jdXJyZW50VmFsdWUgIT09IGNoYW5nZXNbJ2JhY2tncm91bmRDb2xvciddLnByZXZpb3VzVmFsdWVcbiAgICApIHtcbiAgICAgIHRoaXMuc2V0VmlkZW9Db250YWluZXJTdHlsZSgpO1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZVZpZGVvU3RyZWFtKCkge1xuICAgIGlmICh0aGlzLnZpZGVvRWxlbWVudCAmJiB0aGlzLnZpZGVvU3RyZWFtKSB7XG4gICAgICBjb25zdCB2aWRlb0VsZW1lbnQgPSB0aGlzLnZpZGVvRWxlbWVudC5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAvLyBVcGRhdGUgdGhlIHZpZGVvIGVsZW1lbnQncyBzcmNPYmplY3Qgb25seSBpZiBpdCBoYXMgY2hhbmdlZFxuICAgICAgaWYgKHZpZGVvRWxlbWVudC5zcmNPYmplY3QgIT09IHRoaXMudmlkZW9TdHJlYW0pIHtcbiAgICAgICAgdmlkZW9FbGVtZW50LnNyY09iamVjdCA9IHRoaXMudmlkZW9TdHJlYW07XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgc2V0VmlkZW9Db250YWluZXJTdHlsZSgpIHtcbiAgICB0aGlzLnZpZGVvQ29udGFpbmVyU3R5bGUgPSB7XG4gICAgICAuLi50aGlzLmdldEJhc2VWaWRlb0NvbnRhaW5lclN0eWxlKCksXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgIH07XG4gIH1cblxuICBnZXRCYXNlVmlkZW9Db250YWluZXJTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgYWxpZ25JdGVtczogJ2NlbnRlcicsXG4gICAgICB3aWR0aDogJzEwMCUnLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICdibGFjaycsXG4gICAgfTtcbiAgfVxuXG4gIGdldFZpZGVvU3R5bGUoKSB7XG4gICAgY29uc3QgYmFzZVN0eWxlczogYW55ID0ge1xuICAgICAgd2lkdGg6IHRoaXMuZm9yY2VGdWxsRGlzcGxheSA/ICcxMDAlJyA6ICdhdXRvJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgbWF4V2lkdGg6ICcxMDAlJyxcbiAgICAgIG1heEhlaWdodDogJzEwMCUnLFxuICAgICAgb2JqZWN0Rml0OiB0aGlzLmZvcmNlRnVsbERpc3BsYXkgPyAnY292ZXInIDogJ2NvbnRhaW4nLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmJhY2tncm91bmRDb2xvcixcbiAgICB9O1xuXG4gICAgaWYgKHRoaXMuZG9NaXJyb3IpIHtcbiAgICAgIGJhc2VTdHlsZXMudHJhbnNmb3JtID0gJ3JvdGF0ZVkoMTgwZGVnKSc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJhc2VTdHlsZXM7XG4gIH1cbn1cbiIsIjxkaXYgW25nU3R5bGVdPVwidmlkZW9Db250YWluZXJTdHlsZVwiPlxyXG4gIDx2aWRlbyAjdmlkZW9FbGVtZW50IGF1dG9wbGF5IG11dGVkIHBsYXlzaW5saW5lIFtuZ1N0eWxlXT1cImdldFZpZGVvU3R5bGUoKVwiPjwvdmlkZW8+XHJcbjwvZGl2PlxyXG4iXX0=