import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * @fileoverview SubAspectComponent is an Angular component that displays a sub-aspect of a media element.
 * It adjusts its size and visibility based on input properties and window events.
 *
 * @component
 * @selector app-sub-aspect-component
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * <div *ngIf="showControls" [ngStyle]="{ position: 'absolute', bottom: '0', margin: '0', backgroundColor: backgroundColor, height: aspectStyles.height + 'px', width: aspectStyles.width + 'px' }">
 *   <ng-content></ng-content>
 * </div>
 *
 * @styles []
 *
 * @class SubAspectComponent
 * @implements OnInit, OnDestroy, OnChanges
 *
 * @property {string} backgroundColor - The background color of the component. Default is 'transparent'.
 * @property {boolean} showControls - Determines whether the controls are shown. Default is true.
 * @property {number} containerWidthFraction - The fraction of the container's width. Default is 1.
 * @property {number} containerHeightFraction - The fraction of the container's height. Default is 1.
 * @property {number} defaultFractionSub - The default fraction for the sub-aspect. Default is 0.0.
 * @property {object} aspectStyles - The styles for the aspect, including height and width.
 * @property {number} aspectStyles.height - The height of the aspect.
 * @property {number} aspectStyles.width - The width of the aspect.
 * @property {number} subAspectFraction - The fraction of the sub-aspect.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized. Adds event listeners for window resize and orientation change.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes. Updates aspect styles if relevant properties change.
 * @method ngOnDestroy - Lifecycle hook that is called just before the component is destroyed. Removes event listeners for window resize and orientation change.
 * @method updateAspectStyles - Updates the aspect styles based on the current window size and input properties.
 */
export class SubAspectComponent {
    backgroundColor = 'transparent';
    showControls = true;
    containerWidthFraction = 1;
    containerHeightFraction = 1;
    defaultFractionSub = 0.0;
    aspectStyles = {
        height: 0,
        width: 0,
    };
    ngOnInit() {
        this.updateAspectStyles();
        window.addEventListener('resize', this.updateAspectStyles.bind(this));
        window.addEventListener('orientationchange', this.updateAspectStyles.bind(this));
    }
    ngOnChanges(changes) {
        if (changes['showControls'] ||
            changes['containerWidthFraction'] ||
            changes['containerHeightFraction'] ||
            changes['defaultFractionSub']) {
            this.updateAspectStyles();
        }
    }
    ngOnDestroy() {
        window.removeEventListener('resize', this.updateAspectStyles.bind(this));
        window.removeEventListener('orientationchange', this.updateAspectStyles.bind(this));
    }
    updateAspectStyles() {
        const windowWidth = window.innerWidth;
        this.aspectStyles = {
            height: this.showControls ? 40 : 0,
            width: this.containerWidthFraction ? this.containerWidthFraction * windowWidth : windowWidth,
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SubAspectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: SubAspectComponent, isStandalone: true, selector: "app-sub-aspect-component", inputs: { backgroundColor: "backgroundColor", showControls: "showControls", containerWidthFraction: "containerWidthFraction", containerHeightFraction: "containerHeightFraction", defaultFractionSub: "defaultFractionSub" }, usesOnChanges: true, ngImport: i0, template: `
    <div
      *ngIf="showControls"
      [ngStyle]="{
        position: 'absolute',
        bottom: '0',
        margin: '0',
        backgroundColor: backgroundColor,
        height: aspectStyles.height + 'px',
        width: aspectStyles.width + 'px'
      }"
    >
      <ng-content></ng-content>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: SubAspectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-sub-aspect-component', standalone: true, imports: [CommonModule], template: `
    <div
      *ngIf="showControls"
      [ngStyle]="{
        position: 'absolute',
        bottom: '0',
        margin: '0',
        backgroundColor: backgroundColor,
        height: aspectStyles.height + 'px',
        width: aspectStyles.width + 'px'
      }"
    >
      <ng-content></ng-content>
    </div>
  ` }]
        }], propDecorators: { backgroundColor: [{
                type: Input
            }], showControls: [{
                type: Input
            }], containerWidthFraction: [{
                type: Input
            }], containerHeightFraction: [{
                type: Input
            }], defaultFractionSub: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViLWFzcGVjdC1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvZGlzcGxheS1jb21wb25lbnRzL3N1Yi1hc3BlY3QtY29tcG9uZW50L3N1Yi1hc3BlY3QtY29tcG9uZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBK0MsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFZL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWlDRztBQXNCSCxNQUFNLE9BQU8sa0JBQWtCO0lBQ3BCLGVBQWUsR0FBRyxhQUFhLENBQUM7SUFDaEMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUNwQixzQkFBc0IsR0FBRyxDQUFDLENBQUM7SUFDM0IsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLGtCQUFrQixHQUFHLEdBQUcsQ0FBQztJQUVsQyxZQUFZLEdBQUc7UUFDYixNQUFNLEVBQUUsQ0FBQztRQUNULEtBQUssRUFBRSxDQUFDO0tBQ1QsQ0FBQztJQUVGLFFBQVE7UUFDTixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN0RSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFDRSxPQUFPLENBQUMsY0FBYyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztZQUNqQyxPQUFPLENBQUMseUJBQXlCLENBQUM7WUFDbEMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEVBQzdCLENBQUM7WUFDRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM1QixDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6RSxNQUFNLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUV0QyxJQUFJLENBQUMsWUFBWSxHQUFHO1lBQ2xCLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsS0FBSyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVztTQUM3RixDQUFDO0lBQ0osQ0FBQzt1R0F6Q1Usa0JBQWtCOzJGQUFsQixrQkFBa0IsdVVBakJuQjs7Ozs7Ozs7Ozs7Ozs7R0FjVCwyREFmUyxZQUFZOzsyRkFrQlgsa0JBQWtCO2tCQXJCOUIsU0FBUzsrQkFDRSwwQkFBMEIsY0FDeEIsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLFlBQ2I7Ozs7Ozs7Ozs7Ozs7O0dBY1Q7OEJBSVEsZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLHNCQUFzQjtzQkFBOUIsS0FBSztnQkFDRyx1QkFBdUI7c0JBQS9CLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBTdWJBc3BlY3RDb21wb25lbnRPcHRpb25zIHtcbiAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xuICBzaG93Q29udHJvbHM/OiBib29sZWFuO1xuICBjb250YWluZXJXaWR0aEZyYWN0aW9uPzogbnVtYmVyO1xuICBjb250YWluZXJIZWlnaHRGcmFjdGlvbj86IG51bWJlcjtcbiAgZGVmYXVsdEZyYWN0aW9uU3ViPzogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdWJBc3BlY3RDb21wb25lbnRUeXBlID0gKG9wdGlvbnM6IFN1YkFzcGVjdENvbXBvbmVudE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIEBmaWxlb3ZlcnZpZXcgU3ViQXNwZWN0Q29tcG9uZW50IGlzIGFuIEFuZ3VsYXIgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYSBzdWItYXNwZWN0IG9mIGEgbWVkaWEgZWxlbWVudC5cbiAqIEl0IGFkanVzdHMgaXRzIHNpemUgYW5kIHZpc2liaWxpdHkgYmFzZWQgb24gaW5wdXQgcHJvcGVydGllcyBhbmQgd2luZG93IGV2ZW50cy5cbiAqXG4gKiBAY29tcG9uZW50XG4gKiBAc2VsZWN0b3IgYXBwLXN1Yi1hc3BlY3QtY29tcG9uZW50XG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGVcbiAqXG4gKiBAdGVtcGxhdGVcbiAqIDxkaXYgKm5nSWY9XCJzaG93Q29udHJvbHNcIiBbbmdTdHlsZV09XCJ7IHBvc2l0aW9uOiAnYWJzb2x1dGUnLCBib3R0b206ICcwJywgbWFyZ2luOiAnMCcsIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yLCBoZWlnaHQ6IGFzcGVjdFN0eWxlcy5oZWlnaHQgKyAncHgnLCB3aWR0aDogYXNwZWN0U3R5bGVzLndpZHRoICsgJ3B4JyB9XCI+XG4gKiAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAqIDwvZGl2PlxuICpcbiAqIEBzdHlsZXMgW11cbiAqXG4gKiBAY2xhc3MgU3ViQXNwZWN0Q29tcG9uZW50XG4gKiBAaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzXG4gKlxuICogQHByb3BlcnR5IHtzdHJpbmd9IGJhY2tncm91bmRDb2xvciAtIFRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBjb21wb25lbnQuIERlZmF1bHQgaXMgJ3RyYW5zcGFyZW50Jy5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc2hvd0NvbnRyb2xzIC0gRGV0ZXJtaW5lcyB3aGV0aGVyIHRoZSBjb250cm9scyBhcmUgc2hvd24uIERlZmF1bHQgaXMgdHJ1ZS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjb250YWluZXJXaWR0aEZyYWN0aW9uIC0gVGhlIGZyYWN0aW9uIG9mIHRoZSBjb250YWluZXIncyB3aWR0aC4gRGVmYXVsdCBpcyAxLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGNvbnRhaW5lckhlaWdodEZyYWN0aW9uIC0gVGhlIGZyYWN0aW9uIG9mIHRoZSBjb250YWluZXIncyBoZWlnaHQuIERlZmF1bHQgaXMgMS5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkZWZhdWx0RnJhY3Rpb25TdWIgLSBUaGUgZGVmYXVsdCBmcmFjdGlvbiBmb3IgdGhlIHN1Yi1hc3BlY3QuIERlZmF1bHQgaXMgMC4wLlxuICogQHByb3BlcnR5IHtvYmplY3R9IGFzcGVjdFN0eWxlcyAtIFRoZSBzdHlsZXMgZm9yIHRoZSBhc3BlY3QsIGluY2x1ZGluZyBoZWlnaHQgYW5kIHdpZHRoLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGFzcGVjdFN0eWxlcy5oZWlnaHQgLSBUaGUgaGVpZ2h0IG9mIHRoZSBhc3BlY3QuXG4gKiBAcHJvcGVydHkge251bWJlcn0gYXNwZWN0U3R5bGVzLndpZHRoIC0gVGhlIHdpZHRoIG9mIHRoZSBhc3BlY3QuXG4gKiBAcHJvcGVydHkge251bWJlcn0gc3ViQXNwZWN0RnJhY3Rpb24gLSBUaGUgZnJhY3Rpb24gb2YgdGhlIHN1Yi1hc3BlY3QuXG4gKlxuICogQG1ldGhvZCBuZ09uSW5pdCAtIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIGFmdGVyIGRhdGEtYm91bmQgcHJvcGVydGllcyBhcmUgaW5pdGlhbGl6ZWQuIEFkZHMgZXZlbnQgbGlzdGVuZXJzIGZvciB3aW5kb3cgcmVzaXplIGFuZCBvcmllbnRhdGlvbiBjaGFuZ2UuXG4gKiBAbWV0aG9kIG5nT25DaGFuZ2VzIC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBjaGFuZ2VzLiBVcGRhdGVzIGFzcGVjdCBzdHlsZXMgaWYgcmVsZXZhbnQgcHJvcGVydGllcyBjaGFuZ2UuXG4gKiBAbWV0aG9kIG5nT25EZXN0cm95IC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQganVzdCBiZWZvcmUgdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuIFJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzIGZvciB3aW5kb3cgcmVzaXplIGFuZCBvcmllbnRhdGlvbiBjaGFuZ2UuXG4gKiBAbWV0aG9kIHVwZGF0ZUFzcGVjdFN0eWxlcyAtIFVwZGF0ZXMgdGhlIGFzcGVjdCBzdHlsZXMgYmFzZWQgb24gdGhlIGN1cnJlbnQgd2luZG93IHNpemUgYW5kIGlucHV0IHByb3BlcnRpZXMuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1zdWItYXNwZWN0LWNvbXBvbmVudCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgICpuZ0lmPVwic2hvd0NvbnRyb2xzXCJcbiAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgIGJvdHRvbTogJzAnLFxuICAgICAgICBtYXJnaW46ICcwJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kQ29sb3IsXG4gICAgICAgIGhlaWdodDogYXNwZWN0U3R5bGVzLmhlaWdodCArICdweCcsXG4gICAgICAgIHdpZHRoOiBhc3BlY3RTdHlsZXMud2lkdGggKyAncHgnXG4gICAgICB9XCJcbiAgICA+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW10sXG59KVxuZXhwb3J0IGNsYXNzIFN1YkFzcGVjdENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMge1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3IgPSAndHJhbnNwYXJlbnQnO1xuICBASW5wdXQoKSBzaG93Q29udHJvbHMgPSB0cnVlO1xuICBASW5wdXQoKSBjb250YWluZXJXaWR0aEZyYWN0aW9uID0gMTtcbiAgQElucHV0KCkgY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gPSAxO1xuICBASW5wdXQoKSBkZWZhdWx0RnJhY3Rpb25TdWIgPSAwLjA7XG5cbiAgYXNwZWN0U3R5bGVzID0ge1xuICAgIGhlaWdodDogMCxcbiAgICB3aWR0aDogMCxcbiAgfTtcblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZUFzcGVjdFN0eWxlcygpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnVwZGF0ZUFzcGVjdFN0eWxlcy5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnVwZGF0ZUFzcGVjdFN0eWxlcy5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzWydzaG93Q29udHJvbHMnXSB8fFxuICAgICAgY2hhbmdlc1snY29udGFpbmVyV2lkdGhGcmFjdGlvbiddIHx8XG4gICAgICBjaGFuZ2VzWydjb250YWluZXJIZWlnaHRGcmFjdGlvbiddIHx8XG4gICAgICBjaGFuZ2VzWydkZWZhdWx0RnJhY3Rpb25TdWInXVxuICAgICkge1xuICAgICAgdGhpcy51cGRhdGVBc3BlY3RTdHlsZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy51cGRhdGVBc3BlY3RTdHlsZXMuYmluZCh0aGlzKSk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy51cGRhdGVBc3BlY3RTdHlsZXMuYmluZCh0aGlzKSk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZUFzcGVjdFN0eWxlcygpIHtcbiAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4gICAgdGhpcy5hc3BlY3RTdHlsZXMgPSB7XG4gICAgICBoZWlnaHQ6IHRoaXMuc2hvd0NvbnRyb2xzID8gNDAgOiAwLFxuICAgICAgd2lkdGg6IHRoaXMuY29udGFpbmVyV2lkdGhGcmFjdGlvbiA/IHRoaXMuY29udGFpbmVyV2lkdGhGcmFjdGlvbiAqIHdpbmRvd1dpZHRoIDogd2luZG93V2lkdGgsXG4gICAgfTtcbiAgfVxufVxuIl19