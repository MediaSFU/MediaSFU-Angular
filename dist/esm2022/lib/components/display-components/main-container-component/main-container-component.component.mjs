import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * MainContainerComponent is a standalone Angular component that dynamically adjusts its styles
 * based on the provided input properties and window size changes.
 *
 * @selector app-main-container-component
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * ```html
 * <div [ngStyle]="containerStyles">
 *   <ng-content></ng-content>
 * </div>
 * ```
 *
 * @class MainContainerComponent
 * @implements OnInit, OnDestroy, OnChanges
 *
 * @property {string} backgroundColor - The background color of the container.
 * @property {number} containerWidthFraction - The fraction of the window width the container should occupy.
 * @property {number} containerHeightFraction - The fraction of the window height the container should occupy.
 * @property {number} marginLeft - The left margin of the container in pixels.
 * @property {number} marginRight - The right margin of the container in pixels.
 * @property {number} marginTop - The top margin of the container in pixels.
 * @property {number} marginBottom - The bottom margin of the container in pixels.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized. Sets up event listeners for window resize and orientation change.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes. Updates the container styles accordingly.
 * @method ngOnDestroy - Lifecycle hook that is called just before the component is destroyed. Removes event listeners for window resize and orientation change.
 * @method updateContainerStyles - Updates the container styles based on the current input properties and window size.
 */
export class MainContainerComponent {
    backgroundColor = '';
    containerWidthFraction = 1;
    containerHeightFraction = 1;
    marginLeft = 0;
    marginRight = 0;
    marginTop = 0;
    marginBottom = 0;
    padding = 0;
    containerStyles = {};
    ngOnInit() {
        this.updateContainerStyles();
        window.addEventListener('resize', this.updateContainerStyles);
        window.addEventListener('orientationchange', this.updateContainerStyles);
    }
    ngOnChanges(changes) {
        if (changes['containerHeightFraction'] ||
            changes['containerWidthFraction'] ||
            changes['backgroundColor'] ||
            changes['marginLeft'] ||
            changes['marginRight'] ||
            changes['marginTop'] ||
            changes['marginBottom']) {
            this.updateContainerStyles();
        }
    }
    ngOnDestroy() {
        window.removeEventListener('resize', this.updateContainerStyles);
        window.removeEventListener('orientationchange', this.updateContainerStyles);
    }
    updateContainerStyles = () => {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        this.containerStyles = {
            backgroundColor: this.backgroundColor,
            marginLeft: `${this.marginLeft}px`,
            marginRight: `${this.marginRight}px`,
            marginTop: `${this.marginTop}px`,
            marginBottom: `${this.marginBottom}px`,
            height: Math.floor(this.containerHeightFraction * windowHeight) + 'px',
            maxHeight: Math.floor(this.containerHeightFraction * windowHeight) + 'px',
            width: Math.floor(this.containerWidthFraction * windowWidth) + 'px',
            maxWidth: Math.floor(this.containerWidthFraction * windowWidth) + 'px',
            padding: `${this.padding}px`,
            overflow: 'hidden',
        };
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MainContainerComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MainContainerComponent, isStandalone: true, selector: "app-main-container-component", inputs: { backgroundColor: "backgroundColor", containerWidthFraction: "containerWidthFraction", containerHeightFraction: "containerHeightFraction", marginLeft: "marginLeft", marginRight: "marginRight", marginTop: "marginTop", marginBottom: "marginBottom", padding: "padding" }, usesOnChanges: true, ngImport: i0, template: `
    <div [ngStyle]="containerStyles">
      <ng-content></ng-content>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MainContainerComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-main-container-component',
                    standalone: true,
                    imports: [CommonModule],
                    template: `
    <div [ngStyle]="containerStyles">
      <ng-content></ng-content>
    </div>
  `,
                }]
        }], propDecorators: { backgroundColor: [{
                type: Input
            }], containerWidthFraction: [{
                type: Input
            }], containerHeightFraction: [{
                type: Input
            }], marginLeft: [{
                type: Input
            }], marginRight: [{
                type: Input
            }], marginTop: [{
                type: Input
            }], marginBottom: [{
                type: Input
            }], padding: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1jb250YWluZXItY29tcG9uZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLWNvbnRhaW5lci1jb21wb25lbnQvbWFpbi1jb250YWluZXItY29tcG9uZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBK0MsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFjL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCRztBQVdILE1BQU0sT0FBTyxzQkFBc0I7SUFDeEIsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUNyQixzQkFBc0IsR0FBRyxDQUFDLENBQUM7SUFDM0IsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDZixXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDZCxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFFckIsZUFBZSxHQUEyQixFQUFFLENBQUM7SUFFN0MsUUFBUTtRQUNOLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRTdCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDOUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFDRSxPQUFPLENBQUMseUJBQXlCLENBQUM7WUFDbEMsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztZQUMxQixPQUFPLENBQUMsWUFBWSxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDdEIsT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUNwQixPQUFPLENBQUMsY0FBYyxDQUFDLEVBQ3ZCLENBQUM7WUFDRCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQscUJBQXFCLEdBQUcsR0FBRyxFQUFFO1FBQzNCLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDeEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUV0QyxJQUFJLENBQUMsZUFBZSxHQUFHO1lBQ3JCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJO1lBQ2xDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUk7WUFDcEMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSTtZQUNoQyxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJO1lBQ3RDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxZQUFZLENBQUMsR0FBRyxJQUFJO1lBQ3RFLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxZQUFZLENBQUMsR0FBRyxJQUFJO1lBQ3pFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxXQUFXLENBQUMsR0FBRyxJQUFJO1lBQ25FLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxXQUFXLENBQUMsR0FBRyxJQUFJO1lBQ3RFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUk7WUFDNUIsUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQztJQUNKLENBQUMsQ0FBQzt1R0F2RFMsc0JBQXNCOzJGQUF0QixzQkFBc0IsbVlBTnZCOzs7O0dBSVQsMkRBTFMsWUFBWTs7MkZBT1gsc0JBQXNCO2tCQVZsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFFBQVEsRUFBRTs7OztHQUlUO2lCQUNGOzhCQUVVLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csc0JBQXNCO3NCQUE5QixLQUFLO2dCQUNHLHVCQUF1QjtzQkFBL0IsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFpbkNvbnRhaW5lckNvbXBvbmVudE9wdGlvbnMge1xuICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIGNvbnRhaW5lcldpZHRoRnJhY3Rpb24/OiBudW1iZXI7XG4gIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uPzogbnVtYmVyO1xuICBtYXJnaW5MZWZ0PzogbnVtYmVyO1xuICBtYXJnaW5SaWdodD86IG51bWJlcjtcbiAgbWFyZ2luVG9wPzogbnVtYmVyO1xuICBtYXJnaW5Cb3R0b20/OiBudW1iZXI7XG4gIHBhZGRpbmc/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIE1haW5Db250YWluZXJDb21wb25lbnRUeXBlID0gKG9wdGlvbnM6IE1haW5Db250YWluZXJDb21wb25lbnRPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcbi8qKlxuICogTWFpbkNvbnRhaW5lckNvbXBvbmVudCBpcyBhIHN0YW5kYWxvbmUgQW5ndWxhciBjb21wb25lbnQgdGhhdCBkeW5hbWljYWxseSBhZGp1c3RzIGl0cyBzdHlsZXNcbiAqIGJhc2VkIG9uIHRoZSBwcm92aWRlZCBpbnB1dCBwcm9wZXJ0aWVzIGFuZCB3aW5kb3cgc2l6ZSBjaGFuZ2VzLlxuICpcbiAqIEBzZWxlY3RvciBhcHAtbWFpbi1jb250YWluZXItY29tcG9uZW50XG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGVcbiAqXG4gKiBAdGVtcGxhdGVcbiAqIGBgYGh0bWxcbiAqIDxkaXYgW25nU3R5bGVdPVwiY29udGFpbmVyU3R5bGVzXCI+XG4gKiAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAqIDwvZGl2PlxuICogYGBgXG4gKlxuICogQGNsYXNzIE1haW5Db250YWluZXJDb21wb25lbnRcbiAqIEBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXNcbiAqXG4gKiBAcHJvcGVydHkge3N0cmluZ30gYmFja2dyb3VuZENvbG9yIC0gVGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIGNvbnRhaW5lci5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjb250YWluZXJXaWR0aEZyYWN0aW9uIC0gVGhlIGZyYWN0aW9uIG9mIHRoZSB3aW5kb3cgd2lkdGggdGhlIGNvbnRhaW5lciBzaG91bGQgb2NjdXB5LlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGNvbnRhaW5lckhlaWdodEZyYWN0aW9uIC0gVGhlIGZyYWN0aW9uIG9mIHRoZSB3aW5kb3cgaGVpZ2h0IHRoZSBjb250YWluZXIgc2hvdWxkIG9jY3VweS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtYXJnaW5MZWZ0IC0gVGhlIGxlZnQgbWFyZ2luIG9mIHRoZSBjb250YWluZXIgaW4gcGl4ZWxzLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IG1hcmdpblJpZ2h0IC0gVGhlIHJpZ2h0IG1hcmdpbiBvZiB0aGUgY29udGFpbmVyIGluIHBpeGVscy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtYXJnaW5Ub3AgLSBUaGUgdG9wIG1hcmdpbiBvZiB0aGUgY29udGFpbmVyIGluIHBpeGVscy5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBtYXJnaW5Cb3R0b20gLSBUaGUgYm90dG9tIG1hcmdpbiBvZiB0aGUgY29udGFpbmVyIGluIHBpeGVscy5cbiAqXG4gKiBAbWV0aG9kIG5nT25Jbml0IC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgYWZ0ZXIgZGF0YS1ib3VuZCBwcm9wZXJ0aWVzIGFyZSBpbml0aWFsaXplZC4gU2V0cyB1cCBldmVudCBsaXN0ZW5lcnMgZm9yIHdpbmRvdyByZXNpemUgYW5kIG9yaWVudGF0aW9uIGNoYW5nZS5cbiAqIEBtZXRob2QgbmdPbkNoYW5nZXMgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIGFueSBkYXRhLWJvdW5kIHByb3BlcnR5IGNoYW5nZXMuIFVwZGF0ZXMgdGhlIGNvbnRhaW5lciBzdHlsZXMgYWNjb3JkaW5nbHkuXG4gKiBAbWV0aG9kIG5nT25EZXN0cm95IC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQganVzdCBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuIFJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzIGZvciB3aW5kb3cgcmVzaXplIGFuZCBvcmllbnRhdGlvbiBjaGFuZ2UuXG4gKiBAbWV0aG9kIHVwZGF0ZUNvbnRhaW5lclN0eWxlcyAtIFVwZGF0ZXMgdGhlIGNvbnRhaW5lciBzdHlsZXMgYmFzZWQgb24gdGhlIGN1cnJlbnQgaW5wdXQgcHJvcGVydGllcyBhbmQgd2luZG93IHNpemUuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tYWluLWNvbnRhaW5lci1jb21wb25lbnQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtuZ1N0eWxlXT1cImNvbnRhaW5lclN0eWxlc1wiPlxuICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBNYWluQ29udGFpbmVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICcnO1xuICBASW5wdXQoKSBjb250YWluZXJXaWR0aEZyYWN0aW9uID0gMTtcbiAgQElucHV0KCkgY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gPSAxO1xuICBASW5wdXQoKSBtYXJnaW5MZWZ0ID0gMDtcbiAgQElucHV0KCkgbWFyZ2luUmlnaHQgPSAwO1xuICBASW5wdXQoKSBtYXJnaW5Ub3AgPSAwO1xuICBASW5wdXQoKSBtYXJnaW5Cb3R0b20gPSAwO1xuICBASW5wdXQoKSBwYWRkaW5nID0gMDtcblxuICBjb250YWluZXJTdHlsZXM6IHsgW2tleTogc3RyaW5nXTogYW55IH0gPSB7fTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZUNvbnRhaW5lclN0eWxlcygpO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudXBkYXRlQ29udGFpbmVyU3R5bGVzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnVwZGF0ZUNvbnRhaW5lclN0eWxlcyk7XG4gIH1cblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKFxuICAgICAgY2hhbmdlc1snY29udGFpbmVySGVpZ2h0RnJhY3Rpb24nXSB8fFxuICAgICAgY2hhbmdlc1snY29udGFpbmVyV2lkdGhGcmFjdGlvbiddIHx8XG4gICAgICBjaGFuZ2VzWydiYWNrZ3JvdW5kQ29sb3InXSB8fFxuICAgICAgY2hhbmdlc1snbWFyZ2luTGVmdCddIHx8XG4gICAgICBjaGFuZ2VzWydtYXJnaW5SaWdodCddIHx8XG4gICAgICBjaGFuZ2VzWydtYXJnaW5Ub3AnXSB8fFxuICAgICAgY2hhbmdlc1snbWFyZ2luQm90dG9tJ11cbiAgICApIHtcbiAgICAgIHRoaXMudXBkYXRlQ29udGFpbmVyU3R5bGVzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudXBkYXRlQ29udGFpbmVyU3R5bGVzKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnVwZGF0ZUNvbnRhaW5lclN0eWxlcyk7XG4gIH1cblxuICB1cGRhdGVDb250YWluZXJTdHlsZXMgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cbiAgICB0aGlzLmNvbnRhaW5lclN0eWxlcyA9IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBtYXJnaW5MZWZ0OiBgJHt0aGlzLm1hcmdpbkxlZnR9cHhgLFxuICAgICAgbWFyZ2luUmlnaHQ6IGAke3RoaXMubWFyZ2luUmlnaHR9cHhgLFxuICAgICAgbWFyZ2luVG9wOiBgJHt0aGlzLm1hcmdpblRvcH1weGAsXG4gICAgICBtYXJnaW5Cb3R0b206IGAke3RoaXMubWFyZ2luQm90dG9tfXB4YCxcbiAgICAgIGhlaWdodDogTWF0aC5mbG9vcih0aGlzLmNvbnRhaW5lckhlaWdodEZyYWN0aW9uICogd2luZG93SGVpZ2h0KSArICdweCcsXG4gICAgICBtYXhIZWlnaHQ6IE1hdGguZmxvb3IodGhpcy5jb250YWluZXJIZWlnaHRGcmFjdGlvbiAqIHdpbmRvd0hlaWdodCkgKyAncHgnLFxuICAgICAgd2lkdGg6IE1hdGguZmxvb3IodGhpcy5jb250YWluZXJXaWR0aEZyYWN0aW9uICogd2luZG93V2lkdGgpICsgJ3B4JyxcbiAgICAgIG1heFdpZHRoOiBNYXRoLmZsb29yKHRoaXMuY29udGFpbmVyV2lkdGhGcmFjdGlvbiAqIHdpbmRvd1dpZHRoKSArICdweCcsXG4gICAgICBwYWRkaW5nOiBgJHt0aGlzLnBhZGRpbmd9cHhgLFxuICAgICAgb3ZlcmZsb3c6ICdoaWRkZW4nLFxuICAgIH07XG4gIH07XG59XG4iXX0=