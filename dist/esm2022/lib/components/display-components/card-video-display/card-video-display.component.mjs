import { Component, Input, ViewChild, } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC12aWRlby1kaXNwbGF5LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9jYXJkLXZpZGVvLWRpc3BsYXkvY2FyZC12aWRlby1kaXNwbGF5LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9jYXJkLXZpZGVvLWRpc3BsYXkvY2FyZC12aWRlby1kaXNwbGF5LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQUlMLFNBQVMsR0FFVixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQXFCL0MsTUFBTSxPQUFPLGdCQUFnQjtJQUNsQixnQkFBZ0IsR0FBRyxFQUFFLENBQUM7SUFDdEIsU0FBUyxHQUFjLFNBQVMsQ0FBQztJQUNqQyxnQkFBZ0IsR0FBRyxLQUFLLENBQUM7SUFDekIsV0FBVyxHQUF1QixJQUFJLENBQUM7SUFDdkMsZUFBZSxHQUFHLGFBQWEsQ0FBQztJQUNoQyxRQUFRLEdBQUcsS0FBSyxDQUFDO0lBRW1CLFlBQVksQ0FBZ0M7SUFFekYsbUJBQW1CLENBQU07SUFFekIsUUFBUTtRQUNOLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3pCLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQy9DLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQyxZQUFZLENBQUM7WUFDMUQsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLGFBQWEsQ0FBQztZQUU1RCxJQUNFLENBQUMsY0FBYztnQkFDZixhQUFhLENBQUMsRUFBRSxLQUFLLGNBQWMsQ0FBQyxFQUFFO2dCQUN0QyxhQUFhLENBQUMsTUFBTSxLQUFLLGNBQWMsQ0FBQyxNQUFNLEVBQzlDLENBQUM7Z0JBQ0QsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDM0IsQ0FBQztRQUNILENBQUM7UUFFRCxJQUNFLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztZQUMxQixPQUFPLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxZQUFZLEtBQUssT0FBTyxDQUFDLGlCQUFpQixDQUFDLENBQUMsYUFBYSxFQUNwRixDQUFDO1lBQ0QsSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7UUFDaEMsQ0FBQztJQUNILENBQUM7SUFFRCxpQkFBaUI7UUFDZixJQUFJLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBRXJELDhEQUE4RDtZQUM5RCxJQUFJLFlBQVksQ0FBQyxTQUFTLEtBQUssSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNoRCxZQUFZLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7WUFDNUMsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxtQkFBbUIsR0FBRztZQUN6QixHQUFHLElBQUksQ0FBQywwQkFBMEIsRUFBRTtZQUNwQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7U0FDdEMsQ0FBQztJQUNKLENBQUM7SUFFRCwwQkFBMEI7UUFDeEIsT0FBTztZQUNMLE9BQU8sRUFBRSxNQUFNO1lBQ2YsY0FBYyxFQUFFLFFBQVE7WUFDeEIsVUFBVSxFQUFFLFFBQVE7WUFDcEIsS0FBSyxFQUFFLE1BQU07WUFDYixNQUFNLEVBQUUsTUFBTTtZQUNkLGVBQWUsRUFBRSxPQUFPO1NBQ3pCLENBQUM7SUFDSixDQUFDO0lBRUQsYUFBYTtRQUNYLE1BQU0sVUFBVSxHQUFRO1lBQ3RCLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTTtZQUM5QyxNQUFNLEVBQUUsTUFBTTtZQUNkLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFNBQVMsRUFBRSxNQUFNO1lBQ2pCLFNBQVMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUztZQUN0RCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7U0FDdEMsQ0FBQztRQUVGLElBQUksSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ2xCLFVBQVUsQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUM7UUFDM0MsQ0FBQztRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3BCLENBQUM7dUdBbkZVLGdCQUFnQjsyRkFBaEIsZ0JBQWdCLHlhQzlCN0IsbUpBR0EsK0tEdUJZLFlBQVk7OzJGQUlYLGdCQUFnQjtrQkFQNUIsU0FBUzsrQkFDRSx3QkFBd0IsY0FDdEIsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDOzhCQUtkLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGdCQUFnQjtzQkFBeEIsS0FBSztnQkFDRyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFFdUMsWUFBWTtzQkFBeEQsU0FBUzt1QkFBQyxjQUFjLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFZpZXdDaGlsZCxcbiAgRWxlbWVudFJlZixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBDYXJkVmlkZW9EaXNwbGF5T3B0aW9ucyB7XG4gIHJlbW90ZVByb2R1Y2VySWQ6IHN0cmluZztcbiAgZXZlbnRUeXBlOiBzdHJpbmc7XG4gIGZvcmNlRnVsbERpc3BsYXk6IGJvb2xlYW47XG4gIHZpZGVvU3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGw7XG4gIGJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xuICBkb01pcnJvcj86IGJvb2xlYW47XG59XG5cbmV4cG9ydCB0eXBlIENhcmRWaWRlb0Rpc3BsYXlUeXBlID0gKG9wdGlvbnM6IENhcmRWaWRlb0Rpc3BsYXlPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWNhcmQtdmlkZW8tZGlzcGxheScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICB0ZW1wbGF0ZVVybDogJy4vY2FyZC12aWRlby1kaXNwbGF5LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY2FyZC12aWRlby1kaXNwbGF5LmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgQ2FyZFZpZGVvRGlzcGxheSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgcmVtb3RlUHJvZHVjZXJJZCA9ICcnO1xuICBASW5wdXQoKSBldmVudFR5cGU6IEV2ZW50VHlwZSA9ICd3ZWJpbmFyJztcbiAgQElucHV0KCkgZm9yY2VGdWxsRGlzcGxheSA9IGZhbHNlO1xuICBASW5wdXQoKSB2aWRlb1N0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsID0gbnVsbDtcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJ3RyYW5zcGFyZW50JztcbiAgQElucHV0KCkgZG9NaXJyb3IgPSBmYWxzZTtcblxuICBAVmlld0NoaWxkKCd2aWRlb0VsZW1lbnQnLCB7IHN0YXRpYzogdHJ1ZSB9KSB2aWRlb0VsZW1lbnQhOiBFbGVtZW50UmVmPEhUTUxWaWRlb0VsZW1lbnQ+O1xuXG4gIHZpZGVvQ29udGFpbmVyU3R5bGU6IGFueTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZVZpZGVvU3RyZWFtKCk7XG4gICAgdGhpcy5zZXRWaWRlb0NvbnRhaW5lclN0eWxlKCk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ3ZpZGVvU3RyZWFtJ10gJiYgdGhpcy52aWRlb1N0cmVhbSkge1xuICAgICAgY29uc3QgY3VycmVudFN0cmVhbSA9IGNoYW5nZXNbJ3ZpZGVvU3RyZWFtJ10uY3VycmVudFZhbHVlO1xuICAgICAgY29uc3QgcHJldmlvdXNTdHJlYW0gPSBjaGFuZ2VzWyd2aWRlb1N0cmVhbSddLnByZXZpb3VzVmFsdWU7XG5cbiAgICAgIGlmIChcbiAgICAgICAgIXByZXZpb3VzU3RyZWFtIHx8XG4gICAgICAgIGN1cnJlbnRTdHJlYW0uaWQgIT09IHByZXZpb3VzU3RyZWFtLmlkIHx8XG4gICAgICAgIGN1cnJlbnRTdHJlYW0uYWN0aXZlICE9PSBwcmV2aW91c1N0cmVhbS5hY3RpdmVcbiAgICAgICkge1xuICAgICAgICB0aGlzLnVwZGF0ZVZpZGVvU3RyZWFtKCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgY2hhbmdlc1snYmFja2dyb3VuZENvbG9yJ10gJiZcbiAgICAgIGNoYW5nZXNbJ2JhY2tncm91bmRDb2xvciddLmN1cnJlbnRWYWx1ZSAhPT0gY2hhbmdlc1snYmFja2dyb3VuZENvbG9yJ10ucHJldmlvdXNWYWx1ZVxuICAgICkge1xuICAgICAgdGhpcy5zZXRWaWRlb0NvbnRhaW5lclN0eWxlKCk7XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlVmlkZW9TdHJlYW0oKSB7XG4gICAgaWYgKHRoaXMudmlkZW9FbGVtZW50ICYmIHRoaXMudmlkZW9TdHJlYW0pIHtcbiAgICAgIGNvbnN0IHZpZGVvRWxlbWVudCA9IHRoaXMudmlkZW9FbGVtZW50Lm5hdGl2ZUVsZW1lbnQ7XG5cbiAgICAgIC8vIFVwZGF0ZSB0aGUgdmlkZW8gZWxlbWVudCdzIHNyY09iamVjdCBvbmx5IGlmIGl0IGhhcyBjaGFuZ2VkXG4gICAgICBpZiAodmlkZW9FbGVtZW50LnNyY09iamVjdCAhPT0gdGhpcy52aWRlb1N0cmVhbSkge1xuICAgICAgICB2aWRlb0VsZW1lbnQuc3JjT2JqZWN0ID0gdGhpcy52aWRlb1N0cmVhbTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBzZXRWaWRlb0NvbnRhaW5lclN0eWxlKCkge1xuICAgIHRoaXMudmlkZW9Db250YWluZXJTdHlsZSA9IHtcbiAgICAgIC4uLnRoaXMuZ2V0QmFzZVZpZGVvQ29udGFpbmVyU3R5bGUoKSxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgfTtcbiAgfVxuXG4gIGdldEJhc2VWaWRlb0NvbnRhaW5lclN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICBqdXN0aWZ5Q29udGVudDogJ2NlbnRlcicsXG4gICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ2JsYWNrJyxcbiAgICB9O1xuICB9XG5cbiAgZ2V0VmlkZW9TdHlsZSgpIHtcbiAgICBjb25zdCBiYXNlU3R5bGVzOiBhbnkgPSB7XG4gICAgICB3aWR0aDogdGhpcy5mb3JjZUZ1bGxEaXNwbGF5ID8gJzEwMCUnIDogJ2F1dG8nLFxuICAgICAgaGVpZ2h0OiAnMTAwJScsXG4gICAgICBtYXhXaWR0aDogJzEwMCUnLFxuICAgICAgbWF4SGVpZ2h0OiAnMTAwJScsXG4gICAgICBvYmplY3RGaXQ6IHRoaXMuZm9yY2VGdWxsRGlzcGxheSA/ICdjb3ZlcicgOiAnY29udGFpbicsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgIH07XG5cbiAgICBpZiAodGhpcy5kb01pcnJvcikge1xuICAgICAgYmFzZVN0eWxlcy50cmFuc2Zvcm0gPSAncm90YXRlWSgxODBkZWcpJztcbiAgICB9XG5cbiAgICByZXR1cm4gYmFzZVN0eWxlcztcbiAgfVxufVxuIiwiPGRpdiBbbmdTdHlsZV09XCJ2aWRlb0NvbnRhaW5lclN0eWxlXCI+XHJcbiAgPHZpZGVvICN2aWRlb0VsZW1lbnQgYXV0b3BsYXkgbXV0ZWQgcGxheXNpbmxpbmUgW25nU3R5bGVdPVwiZ2V0VmlkZW9TdHlsZSgpXCI+PC92aWRlbz5cclxuPC9kaXY+XHJcbiJdfQ==