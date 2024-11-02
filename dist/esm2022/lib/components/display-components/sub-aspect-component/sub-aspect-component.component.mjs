import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * SubAspectComponent is an Angular component that displays a sub-aspect of a media element with customizable dimensions and background color.
 * The component adapts its size and visibility based on the provided properties and listens for window resize and orientation change events.
 *
 * @selector app-sub-aspect-component
 * @standalone true
 * @imports CommonModule
 *
 * @example
 * ```html
 * <app-sub-aspect-component [backgroundColor]="'blue'" [showControls]="true" [containerWidthFraction]="0.8"></app-sub-aspect-component>
 * ```
 *
 * @input {string} backgroundColor - The background color of the component. Default is 'transparent'.
 * @input {boolean} showControls - Determines if controls are shown within the component. Default is true.
 * @input {number} containerWidthFraction - Fraction of the window width for the component width. Default is 1.
 * @input {number} containerHeightFraction - Fraction of the window height for the component height. Default is 1.
 * @input {number} defaultFractionSub - The default fraction for the sub-aspect height. Default is 0.0.
 *
 * @property {object} aspectStyles - Contains calculated styles for the component's height and width.
 * @property {number} aspectStyles.height - Calculated height of the component.
 * @property {number} aspectStyles.width - Calculated width of the component.
 *
 * @method ngOnInit - Initializes the component and adds event listeners for responsive adjustments.
 * @method ngOnChanges - Updates the aspect styles when any of the input properties change.
 * @method ngOnDestroy - Removes event listeners when the component is destroyed.
 * @method updateAspectStyles - Calculates and applies updated styles based on the window size and input properties.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3ViLWFzcGVjdC1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvZGlzcGxheS1jb21wb25lbnRzL3N1Yi1hc3BlY3QtY29tcG9uZW50L3N1Yi1hc3BlY3QtY29tcG9uZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBK0MsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFZL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQXVCSCxNQUFNLE9BQU8sa0JBQWtCO0lBQ3BCLGVBQWUsR0FBRyxhQUFhLENBQUM7SUFDaEMsWUFBWSxHQUFHLElBQUksQ0FBQztJQUNwQixzQkFBc0IsR0FBRyxDQUFDLENBQUM7SUFDM0IsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLGtCQUFrQixHQUFHLEdBQUcsQ0FBQztJQUVsQyxZQUFZLEdBQUc7UUFDYixNQUFNLEVBQUUsQ0FBQztRQUNULEtBQUssRUFBRSxDQUFDO0tBQ1QsQ0FBQztJQUVGLFFBQVE7UUFDTixJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUMxQixNQUFNLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN0RSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ25GLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFDRSxPQUFPLENBQUMsY0FBYyxDQUFDO1lBQ3ZCLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztZQUNqQyxPQUFPLENBQUMseUJBQXlCLENBQUM7WUFDbEMsT0FBTyxDQUFDLG9CQUFvQixDQUFDLEVBQzdCLENBQUM7WUFDRCxJQUFJLENBQUMsa0JBQWtCLEVBQUUsQ0FBQztRQUM1QixDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUN6RSxNQUFNLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RGLENBQUM7SUFFTyxrQkFBa0I7UUFDeEIsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUV0QyxJQUFJLENBQUMsWUFBWSxHQUFHO1lBQ2xCLE1BQU0sRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsS0FBSyxFQUFFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLHNCQUFzQixHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsV0FBVztTQUM3RixDQUFDO0lBQ0osQ0FBQzt1R0F6Q1Usa0JBQWtCOzJGQUFsQixrQkFBa0IsdVVBakJuQjs7Ozs7Ozs7Ozs7Ozs7R0FjVCwyREFmUyxZQUFZOzsyRkFrQlgsa0JBQWtCO2tCQXJCOUIsU0FBUzsrQkFDRSwwQkFBMEIsY0FDeEIsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLFlBQ2I7Ozs7Ozs7Ozs7Ozs7O0dBY1Q7OEJBSVEsZUFBZTtzQkFBdkIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLHNCQUFzQjtzQkFBOUIsS0FBSztnQkFDRyx1QkFBdUI7c0JBQS9CLEtBQUs7Z0JBQ0csa0JBQWtCO3NCQUExQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBTdWJBc3BlY3RDb21wb25lbnRPcHRpb25zIHtcbiAgYmFja2dyb3VuZENvbG9yPzogc3RyaW5nO1xuICBzaG93Q29udHJvbHM/OiBib29sZWFuO1xuICBjb250YWluZXJXaWR0aEZyYWN0aW9uPzogbnVtYmVyO1xuICBjb250YWluZXJIZWlnaHRGcmFjdGlvbj86IG51bWJlcjtcbiAgZGVmYXVsdEZyYWN0aW9uU3ViPzogbnVtYmVyO1xufVxuXG5leHBvcnQgdHlwZSBTdWJBc3BlY3RDb21wb25lbnRUeXBlID0gKG9wdGlvbnM6IFN1YkFzcGVjdENvbXBvbmVudE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIFN1YkFzcGVjdENvbXBvbmVudCBpcyBhbiBBbmd1bGFyIGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGEgc3ViLWFzcGVjdCBvZiBhIG1lZGlhIGVsZW1lbnQgd2l0aCBjdXN0b21pemFibGUgZGltZW5zaW9ucyBhbmQgYmFja2dyb3VuZCBjb2xvci5cbiAqIFRoZSBjb21wb25lbnQgYWRhcHRzIGl0cyBzaXplIGFuZCB2aXNpYmlsaXR5IGJhc2VkIG9uIHRoZSBwcm92aWRlZCBwcm9wZXJ0aWVzIGFuZCBsaXN0ZW5zIGZvciB3aW5kb3cgcmVzaXplIGFuZCBvcmllbnRhdGlvbiBjaGFuZ2UgZXZlbnRzLlxuICpcbiAqIEBzZWxlY3RvciBhcHAtc3ViLWFzcGVjdC1jb21wb25lbnRcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIENvbW1vbk1vZHVsZVxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLXN1Yi1hc3BlY3QtY29tcG9uZW50IFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ2JsdWUnXCIgW3Nob3dDb250cm9sc109XCJ0cnVlXCIgW2NvbnRhaW5lcldpZHRoRnJhY3Rpb25dPVwiMC44XCI+PC9hcHAtc3ViLWFzcGVjdC1jb21wb25lbnQ+XG4gKiBgYGBcbiAqXG4gKiBAaW5wdXQge3N0cmluZ30gYmFja2dyb3VuZENvbG9yIC0gVGhlIGJhY2tncm91bmQgY29sb3Igb2YgdGhlIGNvbXBvbmVudC4gRGVmYXVsdCBpcyAndHJhbnNwYXJlbnQnLlxuICogQGlucHV0IHtib29sZWFufSBzaG93Q29udHJvbHMgLSBEZXRlcm1pbmVzIGlmIGNvbnRyb2xzIGFyZSBzaG93biB3aXRoaW4gdGhlIGNvbXBvbmVudC4gRGVmYXVsdCBpcyB0cnVlLlxuICogQGlucHV0IHtudW1iZXJ9IGNvbnRhaW5lcldpZHRoRnJhY3Rpb24gLSBGcmFjdGlvbiBvZiB0aGUgd2luZG93IHdpZHRoIGZvciB0aGUgY29tcG9uZW50IHdpZHRoLiBEZWZhdWx0IGlzIDEuXG4gKiBAaW5wdXQge251bWJlcn0gY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gLSBGcmFjdGlvbiBvZiB0aGUgd2luZG93IGhlaWdodCBmb3IgdGhlIGNvbXBvbmVudCBoZWlnaHQuIERlZmF1bHQgaXMgMS5cbiAqIEBpbnB1dCB7bnVtYmVyfSBkZWZhdWx0RnJhY3Rpb25TdWIgLSBUaGUgZGVmYXVsdCBmcmFjdGlvbiBmb3IgdGhlIHN1Yi1hc3BlY3QgaGVpZ2h0LiBEZWZhdWx0IGlzIDAuMC5cbiAqXG4gKiBAcHJvcGVydHkge29iamVjdH0gYXNwZWN0U3R5bGVzIC0gQ29udGFpbnMgY2FsY3VsYXRlZCBzdHlsZXMgZm9yIHRoZSBjb21wb25lbnQncyBoZWlnaHQgYW5kIHdpZHRoLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGFzcGVjdFN0eWxlcy5oZWlnaHQgLSBDYWxjdWxhdGVkIGhlaWdodCBvZiB0aGUgY29tcG9uZW50LlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGFzcGVjdFN0eWxlcy53aWR0aCAtIENhbGN1bGF0ZWQgd2lkdGggb2YgdGhlIGNvbXBvbmVudC5cbiAqXG4gKiBAbWV0aG9kIG5nT25Jbml0IC0gSW5pdGlhbGl6ZXMgdGhlIGNvbXBvbmVudCBhbmQgYWRkcyBldmVudCBsaXN0ZW5lcnMgZm9yIHJlc3BvbnNpdmUgYWRqdXN0bWVudHMuXG4gKiBAbWV0aG9kIG5nT25DaGFuZ2VzIC0gVXBkYXRlcyB0aGUgYXNwZWN0IHN0eWxlcyB3aGVuIGFueSBvZiB0aGUgaW5wdXQgcHJvcGVydGllcyBjaGFuZ2UuXG4gKiBAbWV0aG9kIG5nT25EZXN0cm95IC0gUmVtb3ZlcyBldmVudCBsaXN0ZW5lcnMgd2hlbiB0aGUgY29tcG9uZW50IGlzIGRlc3Ryb3llZC5cbiAqIEBtZXRob2QgdXBkYXRlQXNwZWN0U3R5bGVzIC0gQ2FsY3VsYXRlcyBhbmQgYXBwbGllcyB1cGRhdGVkIHN0eWxlcyBiYXNlZCBvbiB0aGUgd2luZG93IHNpemUgYW5kIGlucHV0IHByb3BlcnRpZXMuXG4gKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXN1Yi1hc3BlY3QtY29tcG9uZW50JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgKm5nSWY9XCJzaG93Q29udHJvbHNcIlxuICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICBwb3NpdGlvbjogJ2Fic29sdXRlJyxcbiAgICAgICAgYm90dG9tOiAnMCcsXG4gICAgICAgIG1hcmdpbjogJzAnLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvcixcbiAgICAgICAgaGVpZ2h0OiBhc3BlY3RTdHlsZXMuaGVpZ2h0ICsgJ3B4JyxcbiAgICAgICAgd2lkdGg6IGFzcGVjdFN0eWxlcy53aWR0aCArICdweCdcbiAgICAgIH1cIlxuICAgID5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXSxcbn0pXG5leHBvcnQgY2xhc3MgU3ViQXNwZWN0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvciA9ICd0cmFuc3BhcmVudCc7XG4gIEBJbnB1dCgpIHNob3dDb250cm9scyA9IHRydWU7XG4gIEBJbnB1dCgpIGNvbnRhaW5lcldpZHRoRnJhY3Rpb24gPSAxO1xuICBASW5wdXQoKSBjb250YWluZXJIZWlnaHRGcmFjdGlvbiA9IDE7XG4gIEBJbnB1dCgpIGRlZmF1bHRGcmFjdGlvblN1YiA9IDAuMDtcblxuICBhc3BlY3RTdHlsZXMgPSB7XG4gICAgaGVpZ2h0OiAwLFxuICAgIHdpZHRoOiAwLFxuICB9O1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXBkYXRlQXNwZWN0U3R5bGVzKCk7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudXBkYXRlQXNwZWN0U3R5bGVzLmJpbmQodGhpcykpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMudXBkYXRlQXNwZWN0U3R5bGVzLmJpbmQodGhpcykpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChcbiAgICAgIGNoYW5nZXNbJ3Nob3dDb250cm9scyddIHx8XG4gICAgICBjaGFuZ2VzWydjb250YWluZXJXaWR0aEZyYWN0aW9uJ10gfHxcbiAgICAgIGNoYW5nZXNbJ2NvbnRhaW5lckhlaWdodEZyYWN0aW9uJ10gfHxcbiAgICAgIGNoYW5nZXNbJ2RlZmF1bHRGcmFjdGlvblN1YiddXG4gICAgKSB7XG4gICAgICB0aGlzLnVwZGF0ZUFzcGVjdFN0eWxlcygpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnVwZGF0ZUFzcGVjdFN0eWxlcy5iaW5kKHRoaXMpKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnVwZGF0ZUFzcGVjdFN0eWxlcy5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlQXNwZWN0U3R5bGVzKCkge1xuICAgIGNvbnN0IHdpbmRvd1dpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cbiAgICB0aGlzLmFzcGVjdFN0eWxlcyA9IHtcbiAgICAgIGhlaWdodDogdGhpcy5zaG93Q29udHJvbHMgPyA0MCA6IDAsXG4gICAgICB3aWR0aDogdGhpcy5jb250YWluZXJXaWR0aEZyYWN0aW9uID8gdGhpcy5jb250YWluZXJXaWR0aEZyYWN0aW9uICogd2luZG93V2lkdGggOiB3aW5kb3dXaWR0aCxcbiAgICB9O1xuICB9XG59XG4iXX0=