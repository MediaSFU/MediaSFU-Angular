import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * MainAspectComponent is a standalone Angular component that adjusts its aspect ratio
 * based on the window size and other input properties. It listens to window resize
 * and orientation change events to dynamically update its styles.
 *
 * @selector app-main-aspect-component
 * @standalone true
 * @imports [CommonModule]
 *
 * @template
 * ```html
 * <div [ngStyle]="aspectStyles" [style.backgroundColor]="backgroundColor" class="aspect-container">
 *   <ng-content></ng-content>
 * </div>
 * ```
 *
 * @styles
 * ```css
 * .aspect-container {
 *   overflow: hidden;
 * }
 * ```
 *
 * @class MainAspectComponent
 * @implements OnInit, OnDestroy, OnChanges
 *
 * @property {string} backgroundColor - The background color of the aspect container.
 * @property {boolean} showControls - Flag to show or hide controls.
 * @property {number} containerWidthFraction - Fraction of the window width for the container.
 * @property {number} containerHeightFraction - Fraction of the window height for the container.
 * @property {number} defaultFraction - Default fraction to adjust the height when controls are shown.
 * @property {(isWideScreen: boolean) => void} updateIsWideScreen - Callback to update wide screen status.
 * @property {(isMediumScreen: boolean) => void} updateIsMediumScreen - Callback to update medium screen status.
 * @property {(isSmallScreen: boolean) => void} updateIsSmallScreen - Callback to update small screen status.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @method ngOnDestroy - Lifecycle hook that is called just before the component is destroyed.
 * @method private updateAspectStyles - Updates the aspect styles based on the window size and input properties.
 */
export class MainAspectComponent {
    backgroundColor = '';
    showControls = true;
    containerWidthFraction = 1;
    containerHeightFraction = 1;
    defaultFraction = 0.94;
    updateIsWideScreen;
    updateIsMediumScreen;
    updateIsSmallScreen;
    aspectStyles = {};
    ngOnInit() {
        this.updateAspectStyles();
        window.addEventListener('resize', this.updateAspectStyles);
        window.addEventListener('orientationchange', this.updateAspectStyles);
    }
    ngOnChanges(changes) {
        if (changes['showControls'] ||
            changes['containerWidthFraction'] ||
            changes['containerHeightFraction'] ||
            changes['defaultFraction']) {
            this.updateAspectStyles();
        }
    }
    ngOnDestroy() {
        window.removeEventListener('resize', this.updateAspectStyles);
        window.removeEventListener('orientationchange', this.updateAspectStyles);
    }
    updateAspectStyles = () => {
        const windowHeight = window.innerHeight;
        const windowWidth = window.innerWidth;
        const parentWidth = Math.floor(this.containerWidthFraction * windowWidth);
        const parentHeight = this.showControls
            ? Math.floor(this.containerHeightFraction * windowHeight * this.defaultFraction)
            : Math.floor(this.containerHeightFraction * windowHeight);
        let isWideScreen = parentWidth >= 768;
        const isMediumScreen = parentWidth >= 576 && parentWidth < 768;
        const isSmallScreen = parentWidth < 576;
        if (!isWideScreen && parentWidth > 1.5 * parentHeight) {
            isWideScreen = true;
        }
        this.updateIsWideScreen(isWideScreen);
        this.updateIsMediumScreen(isMediumScreen);
        this.updateIsSmallScreen(isSmallScreen);
        this.aspectStyles = {
            height: parentHeight + 'px',
            width: parentWidth + 'px',
        };
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MainAspectComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MainAspectComponent, isStandalone: true, selector: "app-main-aspect-component", inputs: { backgroundColor: "backgroundColor", showControls: "showControls", containerWidthFraction: "containerWidthFraction", containerHeightFraction: "containerHeightFraction", defaultFraction: "defaultFraction", updateIsWideScreen: "updateIsWideScreen", updateIsMediumScreen: "updateIsMediumScreen", updateIsSmallScreen: "updateIsSmallScreen" }, usesOnChanges: true, ngImport: i0, template: `
    <div
      [ngStyle]="aspectStyles"
      [style.backgroundColor]="backgroundColor"
      class="aspect-container"
    >
      <ng-content></ng-content>
    </div>
  `, isInline: true, styles: [".aspect-container{overflow:hidden}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MainAspectComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-main-aspect-component', standalone: true, imports: [CommonModule], template: `
    <div
      [ngStyle]="aspectStyles"
      [style.backgroundColor]="backgroundColor"
      class="aspect-container"
    >
      <ng-content></ng-content>
    </div>
  `, styles: [".aspect-container{overflow:hidden}\n"] }]
        }], propDecorators: { backgroundColor: [{
                type: Input
            }], showControls: [{
                type: Input
            }], containerWidthFraction: [{
                type: Input
            }], containerHeightFraction: [{
                type: Input
            }], defaultFraction: [{
                type: Input
            }], updateIsWideScreen: [{
                type: Input
            }], updateIsMediumScreen: [{
                type: Input
            }], updateIsSmallScreen: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1hc3BlY3QtY29tcG9uZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLWFzcGVjdC1jb21wb25lbnQvbWFpbi1hc3BlY3QtY29tcG9uZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBK0MsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFlL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVDRztBQXNCSCxNQUFNLE9BQU8sbUJBQW1CO0lBQ3JCLGVBQWUsR0FBRyxFQUFFLENBQUM7SUFDckIsWUFBWSxHQUFHLElBQUksQ0FBQztJQUNwQixzQkFBc0IsR0FBRyxDQUFDLENBQUM7SUFDM0IsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDdkIsa0JBQWtCLENBQW1DO0lBQ3JELG9CQUFvQixDQUFxQztJQUN6RCxtQkFBbUIsQ0FBb0M7SUFFaEUsWUFBWSxHQUEyQixFQUFFLENBQUM7SUFFMUMsUUFBUTtRQUNOLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBRTFCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDM0QsTUFBTSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3hFLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFDRSxPQUFPLENBQUMsY0FBYyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztZQUNqQyxPQUFPLENBQUMseUJBQXlCLENBQUM7WUFDbEMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEVBQzFCLENBQUM7WUFDRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM1QixDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1FBQzlELE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUMzRSxDQUFDO0lBRU8sa0JBQWtCLEdBQUcsR0FBRyxFQUFFO1FBQ2hDLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDeEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUV0QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxXQUFXLENBQUMsQ0FBQztRQUMxRSxNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWTtZQUNwQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsWUFBWSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUM7WUFDaEYsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHVCQUF1QixHQUFHLFlBQVksQ0FBQyxDQUFDO1FBRTVELElBQUksWUFBWSxHQUFHLFdBQVcsSUFBSSxHQUFHLENBQUM7UUFDdEMsTUFBTSxjQUFjLEdBQUcsV0FBVyxJQUFJLEdBQUcsSUFBSSxXQUFXLEdBQUcsR0FBRyxDQUFDO1FBQy9ELE1BQU0sYUFBYSxHQUFHLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFFeEMsSUFBSSxDQUFDLFlBQVksSUFBSSxXQUFXLEdBQUcsR0FBRyxHQUFHLFlBQVksRUFBRSxDQUFDO1lBQ3RELFlBQVksR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQUVELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUN0QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRXhDLElBQUksQ0FBQyxZQUFZLEdBQUc7WUFDbEIsTUFBTSxFQUFFLFlBQVksR0FBRyxJQUFJO1lBQzNCLEtBQUssRUFBRSxXQUFXLEdBQUcsSUFBSTtTQUMxQixDQUFDO0lBQ0osQ0FBQyxDQUFDO3VHQTVEUyxtQkFBbUI7MkZBQW5CLG1CQUFtQixzY0FqQnBCOzs7Ozs7OztHQVFULDZHQVRTLFlBQVk7OzJGQWtCWCxtQkFBbUI7a0JBckIvQixTQUFTOytCQUNFLDJCQUEyQixjQUN6QixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsWUFDYjs7Ozs7Ozs7R0FRVDs4QkFVUSxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csc0JBQXNCO3NCQUE5QixLQUFLO2dCQUNHLHVCQUF1QjtzQkFBL0IsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLGtCQUFrQjtzQkFBMUIsS0FBSztnQkFDRyxvQkFBb0I7c0JBQTVCLEtBQUs7Z0JBQ0csbUJBQW1CO3NCQUEzQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBNYWluQXNwZWN0Q29tcG9uZW50T3B0aW9ucyB7XG4gIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgc2hvd0NvbnRyb2xzPzogYm9vbGVhbjtcbiAgY29udGFpbmVyV2lkdGhGcmFjdGlvbj86IG51bWJlcjtcbiAgY29udGFpbmVySGVpZ2h0RnJhY3Rpb24/OiBudW1iZXI7XG4gIGRlZmF1bHRGcmFjdGlvbj86IG51bWJlcjtcbiAgdXBkYXRlSXNXaWRlU2NyZWVuOiAoaXNXaWRlU2NyZWVuOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVJc01lZGl1bVNjcmVlbjogKGlzTWVkaXVtU2NyZWVuOiBib29sZWFuKSA9PiB2b2lkO1xuICB1cGRhdGVJc1NtYWxsU2NyZWVuOiAoaXNTbWFsbFNjcmVlbjogYm9vbGVhbikgPT4gdm9pZDtcbn1cblxuZXhwb3J0IHR5cGUgTWFpbkFzcGVjdENvbXBvbmVudFR5cGUgPSAob3B0aW9uczogTWFpbkFzcGVjdENvbXBvbmVudE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIE1haW5Bc3BlY3RDb21wb25lbnQgaXMgYSBzdGFuZGFsb25lIEFuZ3VsYXIgY29tcG9uZW50IHRoYXQgYWRqdXN0cyBpdHMgYXNwZWN0IHJhdGlvXG4gKiBiYXNlZCBvbiB0aGUgd2luZG93IHNpemUgYW5kIG90aGVyIGlucHV0IHByb3BlcnRpZXMuIEl0IGxpc3RlbnMgdG8gd2luZG93IHJlc2l6ZVxuICogYW5kIG9yaWVudGF0aW9uIGNoYW5nZSBldmVudHMgdG8gZHluYW1pY2FsbHkgdXBkYXRlIGl0cyBzdHlsZXMuXG4gKlxuICogQHNlbGVjdG9yIGFwcC1tYWluLWFzcGVjdC1jb21wb25lbnRcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIFtDb21tb25Nb2R1bGVdXG4gKlxuICogQHRlbXBsYXRlXG4gKiBgYGBodG1sXG4gKiA8ZGl2IFtuZ1N0eWxlXT1cImFzcGVjdFN0eWxlc1wiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiYmFja2dyb3VuZENvbG9yXCIgY2xhc3M9XCJhc3BlY3QtY29udGFpbmVyXCI+XG4gKiAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAqIDwvZGl2PlxuICogYGBgXG4gKlxuICogQHN0eWxlc1xuICogYGBgY3NzXG4gKiAuYXNwZWN0LWNvbnRhaW5lciB7XG4gKiAgIG92ZXJmbG93OiBoaWRkZW47XG4gKiB9XG4gKiBgYGBcbiAqXG4gKiBAY2xhc3MgTWFpbkFzcGVjdENvbXBvbmVudFxuICogQGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlc1xuICpcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBiYWNrZ3JvdW5kQ29sb3IgLSBUaGUgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgYXNwZWN0IGNvbnRhaW5lci5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc2hvd0NvbnRyb2xzIC0gRmxhZyB0byBzaG93IG9yIGhpZGUgY29udHJvbHMuXG4gKiBAcHJvcGVydHkge251bWJlcn0gY29udGFpbmVyV2lkdGhGcmFjdGlvbiAtIEZyYWN0aW9uIG9mIHRoZSB3aW5kb3cgd2lkdGggZm9yIHRoZSBjb250YWluZXIuXG4gKiBAcHJvcGVydHkge251bWJlcn0gY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gLSBGcmFjdGlvbiBvZiB0aGUgd2luZG93IGhlaWdodCBmb3IgdGhlIGNvbnRhaW5lci5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBkZWZhdWx0RnJhY3Rpb24gLSBEZWZhdWx0IGZyYWN0aW9uIHRvIGFkanVzdCB0aGUgaGVpZ2h0IHdoZW4gY29udHJvbHMgYXJlIHNob3duLlxuICogQHByb3BlcnR5IHsoaXNXaWRlU2NyZWVuOiBib29sZWFuKSA9PiB2b2lkfSB1cGRhdGVJc1dpZGVTY3JlZW4gLSBDYWxsYmFjayB0byB1cGRhdGUgd2lkZSBzY3JlZW4gc3RhdHVzLlxuICogQHByb3BlcnR5IHsoaXNNZWRpdW1TY3JlZW46IGJvb2xlYW4pID0+IHZvaWR9IHVwZGF0ZUlzTWVkaXVtU2NyZWVuIC0gQ2FsbGJhY2sgdG8gdXBkYXRlIG1lZGl1bSBzY3JlZW4gc3RhdHVzLlxuICogQHByb3BlcnR5IHsoaXNTbWFsbFNjcmVlbjogYm9vbGVhbikgPT4gdm9pZH0gdXBkYXRlSXNTbWFsbFNjcmVlbiAtIENhbGxiYWNrIHRvIHVwZGF0ZSBzbWFsbCBzY3JlZW4gc3RhdHVzLlxuICpcbiAqIEBtZXRob2QgbmdPbkluaXQgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBkYXRhLWJvdW5kIHByb3BlcnRpZXMgYXJlIGluaXRpYWxpemVkLlxuICogQG1ldGhvZCBuZ09uQ2hhbmdlcyAtIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIHdoZW4gYW55IGRhdGEtYm91bmQgcHJvcGVydHkgY2hhbmdlcy5cbiAqIEBtZXRob2QgbmdPbkRlc3Ryb3kgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBqdXN0IGJlZm9yZSB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC5cbiAqIEBtZXRob2QgcHJpdmF0ZSB1cGRhdGVBc3BlY3RTdHlsZXMgLSBVcGRhdGVzIHRoZSBhc3BlY3Qgc3R5bGVzIGJhc2VkIG9uIHRoZSB3aW5kb3cgc2l6ZSBhbmQgaW5wdXQgcHJvcGVydGllcy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1haW4tYXNwZWN0LWNvbXBvbmVudCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXZcbiAgICAgIFtuZ1N0eWxlXT1cImFzcGVjdFN0eWxlc1wiXG4gICAgICBbc3R5bGUuYmFja2dyb3VuZENvbG9yXT1cImJhY2tncm91bmRDb2xvclwiXG4gICAgICBjbGFzcz1cImFzcGVjdC1jb250YWluZXJcIlxuICAgID5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLmFzcGVjdC1jb250YWluZXIge1xuICAgICAgICBvdmVyZmxvdzogaGlkZGVuO1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIE1haW5Bc3BlY3RDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJyc7XG4gIEBJbnB1dCgpIHNob3dDb250cm9scyA9IHRydWU7XG4gIEBJbnB1dCgpIGNvbnRhaW5lcldpZHRoRnJhY3Rpb24gPSAxO1xuICBASW5wdXQoKSBjb250YWluZXJIZWlnaHRGcmFjdGlvbiA9IDE7XG4gIEBJbnB1dCgpIGRlZmF1bHRGcmFjdGlvbiA9IDAuOTQ7XG4gIEBJbnB1dCgpIHVwZGF0ZUlzV2lkZVNjcmVlbiE6IChpc1dpZGVTY3JlZW46IGJvb2xlYW4pID0+IHZvaWQ7XG4gIEBJbnB1dCgpIHVwZGF0ZUlzTWVkaXVtU2NyZWVuITogKGlzTWVkaXVtU2NyZWVuOiBib29sZWFuKSA9PiB2b2lkO1xuICBASW5wdXQoKSB1cGRhdGVJc1NtYWxsU2NyZWVuITogKGlzU21hbGxTY3JlZW46IGJvb2xlYW4pID0+IHZvaWQ7XG5cbiAgYXNwZWN0U3R5bGVzOiB7IFtrZXk6IHN0cmluZ106IGFueSB9ID0ge307XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51cGRhdGVBc3BlY3RTdHlsZXMoKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnVwZGF0ZUFzcGVjdFN0eWxlcyk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy51cGRhdGVBc3BlY3RTdHlsZXMpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChcbiAgICAgIGNoYW5nZXNbJ3Nob3dDb250cm9scyddIHx8XG4gICAgICBjaGFuZ2VzWydjb250YWluZXJXaWR0aEZyYWN0aW9uJ10gfHxcbiAgICAgIGNoYW5nZXNbJ2NvbnRhaW5lckhlaWdodEZyYWN0aW9uJ10gfHxcbiAgICAgIGNoYW5nZXNbJ2RlZmF1bHRGcmFjdGlvbiddXG4gICAgKSB7XG4gICAgICB0aGlzLnVwZGF0ZUFzcGVjdFN0eWxlcygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnVwZGF0ZUFzcGVjdFN0eWxlcyk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy51cGRhdGVBc3BlY3RTdHlsZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSB1cGRhdGVBc3BlY3RTdHlsZXMgPSAoKSA9PiB7XG4gICAgY29uc3Qgd2luZG93SGVpZ2h0ID0gd2luZG93LmlubmVySGVpZ2h0O1xuICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cbiAgICBjb25zdCBwYXJlbnRXaWR0aCA9IE1hdGguZmxvb3IodGhpcy5jb250YWluZXJXaWR0aEZyYWN0aW9uICogd2luZG93V2lkdGgpO1xuICAgIGNvbnN0IHBhcmVudEhlaWdodCA9IHRoaXMuc2hvd0NvbnRyb2xzXG4gICAgICA/IE1hdGguZmxvb3IodGhpcy5jb250YWluZXJIZWlnaHRGcmFjdGlvbiAqIHdpbmRvd0hlaWdodCAqIHRoaXMuZGVmYXVsdEZyYWN0aW9uKVxuICAgICAgOiBNYXRoLmZsb29yKHRoaXMuY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gKiB3aW5kb3dIZWlnaHQpO1xuXG4gICAgbGV0IGlzV2lkZVNjcmVlbiA9IHBhcmVudFdpZHRoID49IDc2ODtcbiAgICBjb25zdCBpc01lZGl1bVNjcmVlbiA9IHBhcmVudFdpZHRoID49IDU3NiAmJiBwYXJlbnRXaWR0aCA8IDc2ODtcbiAgICBjb25zdCBpc1NtYWxsU2NyZWVuID0gcGFyZW50V2lkdGggPCA1NzY7XG5cbiAgICBpZiAoIWlzV2lkZVNjcmVlbiAmJiBwYXJlbnRXaWR0aCA+IDEuNSAqIHBhcmVudEhlaWdodCkge1xuICAgICAgaXNXaWRlU2NyZWVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICB0aGlzLnVwZGF0ZUlzV2lkZVNjcmVlbihpc1dpZGVTY3JlZW4pO1xuICAgIHRoaXMudXBkYXRlSXNNZWRpdW1TY3JlZW4oaXNNZWRpdW1TY3JlZW4pO1xuICAgIHRoaXMudXBkYXRlSXNTbWFsbFNjcmVlbihpc1NtYWxsU2NyZWVuKTtcblxuICAgIHRoaXMuYXNwZWN0U3R5bGVzID0ge1xuICAgICAgaGVpZ2h0OiBwYXJlbnRIZWlnaHQgKyAncHgnLFxuICAgICAgd2lkdGg6IHBhcmVudFdpZHRoICsgJ3B4JyxcbiAgICB9O1xuICB9O1xufVxuIl19