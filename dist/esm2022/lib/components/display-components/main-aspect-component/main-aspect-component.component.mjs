import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * MainAspectComponent dynamically adjusts its aspect ratio based on window size, providing an adaptable container for content.
 * It listens for window resize and orientation changes to update its layout, making it suitable for responsive applications.
 *
 * @selector app-main-aspect-component
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * ```html
 * <div [ngStyle]="aspectStyles" [style.backgroundColor]="backgroundColor" class="aspect-container">
 *   <ng-content></ng-content>
 * </div>
 * ```
 *
 * @styles
 * - `.aspect-container`: Styles for overflow handling.
 *
 * @inputs
 * - `backgroundColor` (string): The background color of the aspect container.
 * - `showControls` (boolean): Toggles control display, adjusting the container height. Default is true.
 * - `containerWidthFraction` (number): Fraction of window width for container width. Default is 1.
 * - `containerHeightFraction` (number): Fraction of window height for container height. Default is 1.
 * - `defaultFraction` (number): Height adjustment factor when controls are shown. Default is 0.94.
 * - `updateIsWideScreen` (function): Callback to set wide screen status.
 * - `updateIsMediumScreen` (function): Callback to set medium screen status.
 * - `updateIsSmallScreen` (function): Callback to set small screen status.
 *
 * @methods
 * - `ngOnInit()`: Initializes component and sets up resize and orientation listeners.
 * - `ngOnChanges(changes: SimpleChanges)`: Updates layout when relevant inputs change.
 * - `ngOnDestroy()`: Removes event listeners to prevent memory leaks.
 * - `updateAspectStyles()`: Calculates and applies styles based on current window dimensions and component inputs.
 *
 * @example
 * ```html
 * <app-main-aspect-component
 *   [backgroundColor]="'lightblue'"
 *   [showControls]="true"
 *   [containerWidthFraction]="0.9"
 *   [containerHeightFraction]="0.8"
 *   [defaultFraction]="0.95"
 *   [updateIsWideScreen]="onWideScreenUpdate"
 *   [updateIsMediumScreen]="onMediumScreenUpdate"
 *   [updateIsSmallScreen]="onSmallScreenUpdate"
 * ></app-main-aspect-component>
 * ```
 **/
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1hc3BlY3QtY29tcG9uZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLWFzcGVjdC1jb21wb25lbnQvbWFpbi1hc3BlY3QtY29tcG9uZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBK0MsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFlL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBK0NJO0FBdUJKLE1BQU0sT0FBTyxtQkFBbUI7SUFDckIsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUNyQixZQUFZLEdBQUcsSUFBSSxDQUFDO0lBQ3BCLHNCQUFzQixHQUFHLENBQUMsQ0FBQztJQUMzQix1QkFBdUIsR0FBRyxDQUFDLENBQUM7SUFDNUIsZUFBZSxHQUFHLElBQUksQ0FBQztJQUN2QixrQkFBa0IsQ0FBbUM7SUFDckQsb0JBQW9CLENBQXFDO0lBQ3pELG1CQUFtQixDQUFvQztJQUVoRSxZQUFZLEdBQTJCLEVBQUUsQ0FBQztJQUUxQyxRQUFRO1FBQ04sSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFFMUIsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztRQUMzRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDeEUsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUNFLE9BQU8sQ0FBQyxjQUFjLENBQUM7WUFDdkIsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1lBQ2pDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQztZQUNsQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFDMUIsQ0FBQztZQUNELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzVCLENBQUM7SUFDSCxDQUFDO0lBRUQsV0FBVztRQUNULE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDOUQsTUFBTSxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFTyxrQkFBa0IsR0FBRyxHQUFHLEVBQUU7UUFDaEMsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUN4QyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBRXRDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFdBQVcsQ0FBQyxDQUFDO1FBQzFFLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZO1lBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQztZQUNoRixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEdBQUcsWUFBWSxDQUFDLENBQUM7UUFFNUQsSUFBSSxZQUFZLEdBQUcsV0FBVyxJQUFJLEdBQUcsQ0FBQztRQUN0QyxNQUFNLGNBQWMsR0FBRyxXQUFXLElBQUksR0FBRyxJQUFJLFdBQVcsR0FBRyxHQUFHLENBQUM7UUFDL0QsTUFBTSxhQUFhLEdBQUcsV0FBVyxHQUFHLEdBQUcsQ0FBQztRQUV4QyxJQUFJLENBQUMsWUFBWSxJQUFJLFdBQVcsR0FBRyxHQUFHLEdBQUcsWUFBWSxFQUFFLENBQUM7WUFDdEQsWUFBWSxHQUFHLElBQUksQ0FBQztRQUN0QixDQUFDO1FBRUQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3RDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLFlBQVksR0FBRztZQUNsQixNQUFNLEVBQUUsWUFBWSxHQUFHLElBQUk7WUFDM0IsS0FBSyxFQUFFLFdBQVcsR0FBRyxJQUFJO1NBQzFCLENBQUM7SUFDSixDQUFDLENBQUM7dUdBNURTLG1CQUFtQjsyRkFBbkIsbUJBQW1CLHNjQWpCcEI7Ozs7Ozs7O0dBUVQsNkdBVFMsWUFBWTs7MkZBa0JYLG1CQUFtQjtrQkFyQi9CLFNBQVM7K0JBQ0UsMkJBQTJCLGNBQ3pCLElBQUksV0FDUCxDQUFDLFlBQVksQ0FBQyxZQUNiOzs7Ozs7OztHQVFUOzhCQVVRLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxzQkFBc0I7c0JBQTlCLEtBQUs7Z0JBQ0csdUJBQXVCO3NCQUEvQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLO2dCQUNHLG9CQUFvQjtzQkFBNUIsS0FBSztnQkFDRyxtQkFBbUI7c0JBQTNCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzLCBTaW1wbGVDaGFuZ2VzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1haW5Bc3BlY3RDb21wb25lbnRPcHRpb25zIHtcbiAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xuICBzaG93Q29udHJvbHM/OiBib29sZWFuO1xuICBjb250YWluZXJXaWR0aEZyYWN0aW9uPzogbnVtYmVyO1xuICBjb250YWluZXJIZWlnaHRGcmFjdGlvbj86IG51bWJlcjtcbiAgZGVmYXVsdEZyYWN0aW9uPzogbnVtYmVyO1xuICB1cGRhdGVJc1dpZGVTY3JlZW46IChpc1dpZGVTY3JlZW46IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUlzTWVkaXVtU2NyZWVuOiAoaXNNZWRpdW1TY3JlZW46IGJvb2xlYW4pID0+IHZvaWQ7XG4gIHVwZGF0ZUlzU21hbGxTY3JlZW46IChpc1NtYWxsU2NyZWVuOiBib29sZWFuKSA9PiB2b2lkO1xufVxuXG5leHBvcnQgdHlwZSBNYWluQXNwZWN0Q29tcG9uZW50VHlwZSA9IChvcHRpb25zOiBNYWluQXNwZWN0Q29tcG9uZW50T3B0aW9ucykgPT4gSFRNTEVsZW1lbnQ7XG5cbi8qKlxuICogTWFpbkFzcGVjdENvbXBvbmVudCBkeW5hbWljYWxseSBhZGp1c3RzIGl0cyBhc3BlY3QgcmF0aW8gYmFzZWQgb24gd2luZG93IHNpemUsIHByb3ZpZGluZyBhbiBhZGFwdGFibGUgY29udGFpbmVyIGZvciBjb250ZW50LlxuICogSXQgbGlzdGVucyBmb3Igd2luZG93IHJlc2l6ZSBhbmQgb3JpZW50YXRpb24gY2hhbmdlcyB0byB1cGRhdGUgaXRzIGxheW91dCwgbWFraW5nIGl0IHN1aXRhYmxlIGZvciByZXNwb25zaXZlIGFwcGxpY2F0aW9ucy5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLW1haW4tYXNwZWN0LWNvbXBvbmVudFxuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQGltcG9ydHMgQ29tbW9uTW9kdWxlXG4gKlxuICogQHRlbXBsYXRlXG4gKiBgYGBodG1sXG4gKiA8ZGl2IFtuZ1N0eWxlXT1cImFzcGVjdFN0eWxlc1wiIFtzdHlsZS5iYWNrZ3JvdW5kQ29sb3JdPVwiYmFja2dyb3VuZENvbG9yXCIgY2xhc3M9XCJhc3BlY3QtY29udGFpbmVyXCI+XG4gKiAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAqIDwvZGl2PlxuICogYGBgXG4gKlxuICogQHN0eWxlc1xuICogLSBgLmFzcGVjdC1jb250YWluZXJgOiBTdHlsZXMgZm9yIG92ZXJmbG93IGhhbmRsaW5nLlxuICpcbiAqIEBpbnB1dHNcbiAqIC0gYGJhY2tncm91bmRDb2xvcmAgKHN0cmluZyk6IFRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBhc3BlY3QgY29udGFpbmVyLlxuICogLSBgc2hvd0NvbnRyb2xzYCAoYm9vbGVhbik6IFRvZ2dsZXMgY29udHJvbCBkaXNwbGF5LCBhZGp1c3RpbmcgdGhlIGNvbnRhaW5lciBoZWlnaHQuIERlZmF1bHQgaXMgdHJ1ZS5cbiAqIC0gYGNvbnRhaW5lcldpZHRoRnJhY3Rpb25gIChudW1iZXIpOiBGcmFjdGlvbiBvZiB3aW5kb3cgd2lkdGggZm9yIGNvbnRhaW5lciB3aWR0aC4gRGVmYXVsdCBpcyAxLlxuICogLSBgY29udGFpbmVySGVpZ2h0RnJhY3Rpb25gIChudW1iZXIpOiBGcmFjdGlvbiBvZiB3aW5kb3cgaGVpZ2h0IGZvciBjb250YWluZXIgaGVpZ2h0LiBEZWZhdWx0IGlzIDEuXG4gKiAtIGBkZWZhdWx0RnJhY3Rpb25gIChudW1iZXIpOiBIZWlnaHQgYWRqdXN0bWVudCBmYWN0b3Igd2hlbiBjb250cm9scyBhcmUgc2hvd24uIERlZmF1bHQgaXMgMC45NC5cbiAqIC0gYHVwZGF0ZUlzV2lkZVNjcmVlbmAgKGZ1bmN0aW9uKTogQ2FsbGJhY2sgdG8gc2V0IHdpZGUgc2NyZWVuIHN0YXR1cy5cbiAqIC0gYHVwZGF0ZUlzTWVkaXVtU2NyZWVuYCAoZnVuY3Rpb24pOiBDYWxsYmFjayB0byBzZXQgbWVkaXVtIHNjcmVlbiBzdGF0dXMuXG4gKiAtIGB1cGRhdGVJc1NtYWxsU2NyZWVuYCAoZnVuY3Rpb24pOiBDYWxsYmFjayB0byBzZXQgc21hbGwgc2NyZWVuIHN0YXR1cy5cbiAqXG4gKiBAbWV0aG9kc1xuICogLSBgbmdPbkluaXQoKWA6IEluaXRpYWxpemVzIGNvbXBvbmVudCBhbmQgc2V0cyB1cCByZXNpemUgYW5kIG9yaWVudGF0aW9uIGxpc3RlbmVycy5cbiAqIC0gYG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpYDogVXBkYXRlcyBsYXlvdXQgd2hlbiByZWxldmFudCBpbnB1dHMgY2hhbmdlLlxuICogLSBgbmdPbkRlc3Ryb3koKWA6IFJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzIHRvIHByZXZlbnQgbWVtb3J5IGxlYWtzLlxuICogLSBgdXBkYXRlQXNwZWN0U3R5bGVzKClgOiBDYWxjdWxhdGVzIGFuZCBhcHBsaWVzIHN0eWxlcyBiYXNlZCBvbiBjdXJyZW50IHdpbmRvdyBkaW1lbnNpb25zIGFuZCBjb21wb25lbnQgaW5wdXRzLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLW1haW4tYXNwZWN0LWNvbXBvbmVudFxuICogICBbYmFja2dyb3VuZENvbG9yXT1cIidsaWdodGJsdWUnXCJcbiAqICAgW3Nob3dDb250cm9sc109XCJ0cnVlXCJcbiAqICAgW2NvbnRhaW5lcldpZHRoRnJhY3Rpb25dPVwiMC45XCJcbiAqICAgW2NvbnRhaW5lckhlaWdodEZyYWN0aW9uXT1cIjAuOFwiXG4gKiAgIFtkZWZhdWx0RnJhY3Rpb25dPVwiMC45NVwiXG4gKiAgIFt1cGRhdGVJc1dpZGVTY3JlZW5dPVwib25XaWRlU2NyZWVuVXBkYXRlXCJcbiAqICAgW3VwZGF0ZUlzTWVkaXVtU2NyZWVuXT1cIm9uTWVkaXVtU2NyZWVuVXBkYXRlXCJcbiAqICAgW3VwZGF0ZUlzU21hbGxTY3JlZW5dPVwib25TbWFsbFNjcmVlblVwZGF0ZVwiXG4gKiA+PC9hcHAtbWFpbi1hc3BlY3QtY29tcG9uZW50PlxuICogYGBgXG4gKiovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tYWluLWFzcGVjdC1jb21wb25lbnQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbbmdTdHlsZV09XCJhc3BlY3RTdHlsZXNcIlxuICAgICAgW3N0eWxlLmJhY2tncm91bmRDb2xvcl09XCJiYWNrZ3JvdW5kQ29sb3JcIlxuICAgICAgY2xhc3M9XCJhc3BlY3QtY29udGFpbmVyXCJcbiAgICA+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5hc3BlY3QtY29udGFpbmVyIHtcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICAgIH1cbiAgICBgLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBNYWluQXNwZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICcnO1xuICBASW5wdXQoKSBzaG93Q29udHJvbHMgPSB0cnVlO1xuICBASW5wdXQoKSBjb250YWluZXJXaWR0aEZyYWN0aW9uID0gMTtcbiAgQElucHV0KCkgY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gPSAxO1xuICBASW5wdXQoKSBkZWZhdWx0RnJhY3Rpb24gPSAwLjk0O1xuICBASW5wdXQoKSB1cGRhdGVJc1dpZGVTY3JlZW4hOiAoaXNXaWRlU2NyZWVuOiBib29sZWFuKSA9PiB2b2lkO1xuICBASW5wdXQoKSB1cGRhdGVJc01lZGl1bVNjcmVlbiE6IChpc01lZGl1bVNjcmVlbjogYm9vbGVhbikgPT4gdm9pZDtcbiAgQElucHV0KCkgdXBkYXRlSXNTbWFsbFNjcmVlbiE6IChpc1NtYWxsU2NyZWVuOiBib29sZWFuKSA9PiB2b2lkO1xuXG4gIGFzcGVjdFN0eWxlczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXBkYXRlQXNwZWN0U3R5bGVzKCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy51cGRhdGVBc3BlY3RTdHlsZXMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMudXBkYXRlQXNwZWN0U3R5bGVzKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzWydzaG93Q29udHJvbHMnXSB8fFxuICAgICAgY2hhbmdlc1snY29udGFpbmVyV2lkdGhGcmFjdGlvbiddIHx8XG4gICAgICBjaGFuZ2VzWydjb250YWluZXJIZWlnaHRGcmFjdGlvbiddIHx8XG4gICAgICBjaGFuZ2VzWydkZWZhdWx0RnJhY3Rpb24nXVxuICAgICkge1xuICAgICAgdGhpcy51cGRhdGVBc3BlY3RTdHlsZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy51cGRhdGVBc3BlY3RTdHlsZXMpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMudXBkYXRlQXNwZWN0U3R5bGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQXNwZWN0U3R5bGVzID0gKCkgPT4ge1xuICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcbiAgICBjb25zdCB3aW5kb3dXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xuXG4gICAgY29uc3QgcGFyZW50V2lkdGggPSBNYXRoLmZsb29yKHRoaXMuY29udGFpbmVyV2lkdGhGcmFjdGlvbiAqIHdpbmRvd1dpZHRoKTtcbiAgICBjb25zdCBwYXJlbnRIZWlnaHQgPSB0aGlzLnNob3dDb250cm9sc1xuICAgICAgPyBNYXRoLmZsb29yKHRoaXMuY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gKiB3aW5kb3dIZWlnaHQgKiB0aGlzLmRlZmF1bHRGcmFjdGlvbilcbiAgICAgIDogTWF0aC5mbG9vcih0aGlzLmNvbnRhaW5lckhlaWdodEZyYWN0aW9uICogd2luZG93SGVpZ2h0KTtcblxuICAgIGxldCBpc1dpZGVTY3JlZW4gPSBwYXJlbnRXaWR0aCA+PSA3Njg7XG4gICAgY29uc3QgaXNNZWRpdW1TY3JlZW4gPSBwYXJlbnRXaWR0aCA+PSA1NzYgJiYgcGFyZW50V2lkdGggPCA3Njg7XG4gICAgY29uc3QgaXNTbWFsbFNjcmVlbiA9IHBhcmVudFdpZHRoIDwgNTc2O1xuXG4gICAgaWYgKCFpc1dpZGVTY3JlZW4gJiYgcGFyZW50V2lkdGggPiAxLjUgKiBwYXJlbnRIZWlnaHQpIHtcbiAgICAgIGlzV2lkZVNjcmVlbiA9IHRydWU7XG4gICAgfVxuXG4gICAgdGhpcy51cGRhdGVJc1dpZGVTY3JlZW4oaXNXaWRlU2NyZWVuKTtcbiAgICB0aGlzLnVwZGF0ZUlzTWVkaXVtU2NyZWVuKGlzTWVkaXVtU2NyZWVuKTtcbiAgICB0aGlzLnVwZGF0ZUlzU21hbGxTY3JlZW4oaXNTbWFsbFNjcmVlbik7XG5cbiAgICB0aGlzLmFzcGVjdFN0eWxlcyA9IHtcbiAgICAgIGhlaWdodDogcGFyZW50SGVpZ2h0ICsgJ3B4JyxcbiAgICAgIHdpZHRoOiBwYXJlbnRXaWR0aCArICdweCcsXG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==