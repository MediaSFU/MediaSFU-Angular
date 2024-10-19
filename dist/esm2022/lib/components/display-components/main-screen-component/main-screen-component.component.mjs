import { Component, Input, ContentChildren, } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * MainScreenComponent is responsible for displaying a main screen with dynamic dimensions
 * and layout based on the input properties and screen size.
 *
 * @selector app-main-screen-component
 * @standalone true
 * @imports CommonModule
 *
 * @property {number} mainSize - The size of the main component as a percentage.
 * @property {boolean} doStack - Determines if the components should be stacked.
 * @property {number} containerWidthFraction - Fraction of the container width.
 * @property {number} containerHeightFraction - Fraction of the container height.
 * @property {number} defaultFraction - Default fraction for height calculation.
 * @property {boolean} showControls - Flag to show or hide controls.
 * @property {(sizes: ComponentSizes) => void} updateComponentSizes - Callback to update component sizes.
 *
 * @ContentChildren('child') children - Query list of child elements.
 *
 * @property {number} parentWidth - The width of the parent container.
 * @property {number} parentHeight - The height of the parent container.
 * @property {boolean} isWideScreen - Flag to determine if the screen is wide.
 *
 * @method ngOnInit - Lifecycle hook that is called after data-bound properties are initialized.
 * @method ngOnDestroy - Lifecycle hook that is called when the component is destroyed.
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property changes.
 * @method ngAfterViewInit - Lifecycle hook that is called after the component's view has been fully initialized.
 * @method computeDimensions - Computes the dimensions of the main and other components based on the input properties.
 * @method updateDimensions - Updates the dimensions of the parent container and child components.
 * @method get containerStyle - Returns the style object for the container.
 * @method applyChildStyles - Applies the computed styles to the child components.
 */
export class MainScreenComponent {
    renderer;
    mainSize = 40; // percentage
    doStack = true;
    containerWidthFraction = 1;
    containerHeightFraction = 1;
    defaultFraction = 0.94;
    showControls = true;
    updateComponentSizes = (sizes) => {
        console.log(sizes);
    };
    children;
    parentWidth;
    parentHeight;
    isWideScreen;
    constructor(renderer) {
        this.renderer = renderer;
    }
    ngOnInit() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
        window.addEventListener('orientationchange', this.updateDimensions);
    }
    ngOnDestroy() {
        window.removeEventListener('resize', this.updateDimensions);
        window.removeEventListener('orientationchange', this.updateDimensions);
    }
    ngOnChanges(changes) {
        if (changes['mainSize'] ||
            changes['doStack'] ||
            changes['parentWidth'] ||
            changes['parentHeight'] ||
            changes['showControls'] ||
            changes['defaultFraction']) {
            this.updateDimensions();
        }
    }
    ngAfterViewInit() {
        this.applyChildStyles();
    }
    computeDimensions() {
        if (this.doStack) {
            return this.isWideScreen
                ? {
                    mainHeight: Math.floor(this.parentHeight),
                    otherHeight: Math.floor(this.parentHeight),
                    mainWidth: Math.floor((this.mainSize / 100) * this.parentWidth),
                    otherWidth: Math.floor(((100 - this.mainSize) / 100) * this.parentWidth),
                }
                : {
                    mainHeight: Math.floor((this.mainSize / 100) * this.parentHeight),
                    otherHeight: Math.floor(((100 - this.mainSize) / 100) * this.parentHeight),
                    mainWidth: Math.floor(this.parentWidth),
                    otherWidth: Math.floor(this.parentWidth),
                };
        }
        else {
            return {
                mainHeight: Math.floor(this.parentHeight),
                otherHeight: Math.floor(this.parentHeight),
                mainWidth: Math.floor(this.parentWidth),
                otherWidth: Math.floor(this.parentWidth),
            };
        }
    }
    updateDimensions = () => {
        this.parentWidth = window.innerWidth * this.containerWidthFraction;
        this.parentHeight = this.showControls
            ? window.innerHeight * this.containerHeightFraction * this.defaultFraction
            : window.innerHeight * this.containerHeightFraction;
        this.isWideScreen = this.parentWidth >= 768;
        if (!this.isWideScreen && this.parentWidth > 1.5 * this.parentHeight) {
            this.isWideScreen = true;
        }
        const { mainHeight, otherHeight, mainWidth, otherWidth } = this.computeDimensions();
        this.updateComponentSizes({ mainHeight, otherHeight, mainWidth, otherWidth });
        this.applyChildStyles();
    };
    get containerStyle() {
        return {
            display: 'flex',
            flex: 1,
            flexDirection: this.isWideScreen ? 'row' : 'column',
            width: `${this.parentWidth}px`,
            height: `${this.parentHeight}px`,
            padding: 0,
            margin: 0,
        };
    }
    applyChildStyles() {
        if (this.children) {
            const { mainHeight, otherHeight, mainWidth, otherWidth } = this.computeDimensions();
            this.children.forEach((child, index) => {
                const childStyle = this.doStack
                    ? {
                        height: index === 0 ? mainHeight : otherHeight,
                        width: index === 0 ? mainWidth : otherWidth,
                    }
                    : {
                        height: mainHeight,
                        width: mainWidth,
                    };
                this.renderer.setStyle(child.nativeElement, 'height', `${childStyle.height}px`);
                this.renderer.setStyle(child.nativeElement, 'width', `${childStyle.width}px`);
            });
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MainScreenComponent, deps: [{ token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MainScreenComponent, isStandalone: true, selector: "app-main-screen-component", inputs: { mainSize: "mainSize", doStack: "doStack", containerWidthFraction: "containerWidthFraction", containerHeightFraction: "containerHeightFraction", defaultFraction: "defaultFraction", showControls: "showControls", updateComponentSizes: "updateComponentSizes" }, queries: [{ propertyName: "children", predicate: ["child"] }], usesOnChanges: true, ngImport: i0, template: `
    <div [ngStyle]="containerStyle">
      <ng-content></ng-content>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MainScreenComponent, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-main-screen-component',
                    standalone: true,
                    imports: [CommonModule],
                    template: `
    <div [ngStyle]="containerStyle">
      <ng-content></ng-content>
    </div>
  `,
                }]
        }], ctorParameters: () => [{ type: i0.Renderer2 }], propDecorators: { mainSize: [{
                type: Input
            }], doStack: [{
                type: Input
            }], containerWidthFraction: [{
                type: Input
            }], containerHeightFraction: [{
                type: Input
            }], defaultFraction: [{
                type: Input
            }], showControls: [{
                type: Input
            }], updateComponentSizes: [{
                type: Input
            }], children: [{
                type: ContentChildren,
                args: ['child']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1zY3JlZW4tY29tcG9uZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLXNjcmVlbi1jb21wb25lbnQvbWFpbi1zY3JlZW4tY29tcG9uZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFJTCxlQUFlLEdBTWhCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBYy9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E4Qkc7QUFXSCxNQUFNLE9BQU8sbUJBQW1CO0lBa0JWO0lBakJYLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFhO0lBQzVCLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDZixzQkFBc0IsR0FBRyxDQUFDLENBQUM7SUFDM0IsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDdkIsWUFBWSxHQUFHLElBQUksQ0FBQztJQUNwQixvQkFBb0IsR0FBRyxDQUFDLEtBQXFCLEVBQUUsRUFBRTtRQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUMsQ0FBQztJQUdGLFFBQVEsQ0FBeUI7SUFFakMsV0FBVyxDQUFVO0lBQ3JCLFlBQVksQ0FBVTtJQUN0QixZQUFZLENBQVc7SUFFdkIsWUFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUFHLENBQUM7SUFFM0MsUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFD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QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUtOLFFBQVE7c0JBRFAsZUFBZTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBFbGVtZW50UmVmLFxuICBSZW5kZXJlcjIsXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50U2l6ZXMgfSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBNYWluU2NyZWVuQ29tcG9uZW50T3B0aW9ucyB7XG4gIG1haW5TaXplPzogbnVtYmVyO1xuICBkb1N0YWNrPzogYm9vbGVhbjtcbiAgY29udGFpbmVyV2lkdGhGcmFjdGlvbj86IG51bWJlcjtcbiAgY29udGFpbmVySGVpZ2h0RnJhY3Rpb24/OiBudW1iZXI7XG4gIGRlZmF1bHRGcmFjdGlvbj86IG51bWJlcjtcbiAgc2hvd0NvbnRyb2xzPzogYm9vbGVhbjtcbiAgdXBkYXRlQ29tcG9uZW50U2l6ZXM6IChzaXplczogQ29tcG9uZW50U2l6ZXMpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCB0eXBlIE1haW5TY3JlZW5Db21wb25lbnRUeXBlID0gKG9wdGlvbnM6IE1haW5TY3JlZW5Db21wb25lbnRPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBNYWluU2NyZWVuQ29tcG9uZW50IGlzIHJlc3BvbnNpYmxlIGZvciBkaXNwbGF5aW5nIGEgbWFpbiBzY3JlZW4gd2l0aCBkeW5hbWljIGRpbWVuc2lvbnNcbiAqIGFuZCBsYXlvdXQgYmFzZWQgb24gdGhlIGlucHV0IHByb3BlcnRpZXMgYW5kIHNjcmVlbiBzaXplLlxuICpcbiAqIEBzZWxlY3RvciBhcHAtbWFpbi1zY3JlZW4tY29tcG9uZW50XG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGVcbiAqXG4gKiBAcHJvcGVydHkge251bWJlcn0gbWFpblNpemUgLSBUaGUgc2l6ZSBvZiB0aGUgbWFpbiBjb21wb25lbnQgYXMgYSBwZXJjZW50YWdlLlxuICogQHByb3BlcnR5IHtib29sZWFufSBkb1N0YWNrIC0gRGV0ZXJtaW5lcyBpZiB0aGUgY29tcG9uZW50cyBzaG91bGQgYmUgc3RhY2tlZC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjb250YWluZXJXaWR0aEZyYWN0aW9uIC0gRnJhY3Rpb24gb2YgdGhlIGNvbnRhaW5lciB3aWR0aC5cbiAqIEBwcm9wZXJ0eSB7bnVtYmVyfSBjb250YWluZXJIZWlnaHRGcmFjdGlvbiAtIEZyYWN0aW9uIG9mIHRoZSBjb250YWluZXIgaGVpZ2h0LlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGRlZmF1bHRGcmFjdGlvbiAtIERlZmF1bHQgZnJhY3Rpb24gZm9yIGhlaWdodCBjYWxjdWxhdGlvbi5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gc2hvd0NvbnRyb2xzIC0gRmxhZyB0byBzaG93IG9yIGhpZGUgY29udHJvbHMuXG4gKiBAcHJvcGVydHkgeyhzaXplczogQ29tcG9uZW50U2l6ZXMpID0+IHZvaWR9IHVwZGF0ZUNvbXBvbmVudFNpemVzIC0gQ2FsbGJhY2sgdG8gdXBkYXRlIGNvbXBvbmVudCBzaXplcy5cbiAqXG4gKiBAQ29udGVudENoaWxkcmVuKCdjaGlsZCcpIGNoaWxkcmVuIC0gUXVlcnkgbGlzdCBvZiBjaGlsZCBlbGVtZW50cy5cbiAqXG4gKiBAcHJvcGVydHkge251bWJlcn0gcGFyZW50V2lkdGggLSBUaGUgd2lkdGggb2YgdGhlIHBhcmVudCBjb250YWluZXIuXG4gKiBAcHJvcGVydHkge251bWJlcn0gcGFyZW50SGVpZ2h0IC0gVGhlIGhlaWdodCBvZiB0aGUgcGFyZW50IGNvbnRhaW5lci5cbiAqIEBwcm9wZXJ0eSB7Ym9vbGVhbn0gaXNXaWRlU2NyZWVuIC0gRmxhZyB0byBkZXRlcm1pbmUgaWYgdGhlIHNjcmVlbiBpcyB3aWRlLlxuICpcbiAqIEBtZXRob2QgbmdPbkluaXQgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciBkYXRhLWJvdW5kIHByb3BlcnRpZXMgYXJlIGluaXRpYWxpemVkLlxuICogQG1ldGhvZCBuZ09uRGVzdHJveSAtIExpZmVjeWNsZSBob29rIHRoYXQgaXMgY2FsbGVkIHdoZW4gdGhlIGNvbXBvbmVudCBpcyBkZXN0cm95ZWQuXG4gKiBAbWV0aG9kIG5nT25DaGFuZ2VzIC0gTGlmZWN5Y2xlIGhvb2sgdGhhdCBpcyBjYWxsZWQgd2hlbiBhbnkgZGF0YS1ib3VuZCBwcm9wZXJ0eSBjaGFuZ2VzLlxuICogQG1ldGhvZCBuZ0FmdGVyVmlld0luaXQgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCBhZnRlciB0aGUgY29tcG9uZW50J3MgdmlldyBoYXMgYmVlbiBmdWxseSBpbml0aWFsaXplZC5cbiAqIEBtZXRob2QgY29tcHV0ZURpbWVuc2lvbnMgLSBDb21wdXRlcyB0aGUgZGltZW5zaW9ucyBvZiB0aGUgbWFpbiBhbmQgb3RoZXIgY29tcG9uZW50cyBiYXNlZCBvbiB0aGUgaW5wdXQgcHJvcGVydGllcy5cbiAqIEBtZXRob2QgdXBkYXRlRGltZW5zaW9ucyAtIFVwZGF0ZXMgdGhlIGRpbWVuc2lvbnMgb2YgdGhlIHBhcmVudCBjb250YWluZXIgYW5kIGNoaWxkIGNvbXBvbmVudHMuXG4gKiBAbWV0aG9kIGdldCBjb250YWluZXJTdHlsZSAtIFJldHVybnMgdGhlIHN0eWxlIG9iamVjdCBmb3IgdGhlIGNvbnRhaW5lci5cbiAqIEBtZXRob2QgYXBwbHlDaGlsZFN0eWxlcyAtIEFwcGxpZXMgdGhlIGNvbXB1dGVkIHN0eWxlcyB0byB0aGUgY2hpbGQgY29tcG9uZW50cy5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1haW4tc2NyZWVuLWNvbXBvbmVudCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW25nU3R5bGVdPVwiY29udGFpbmVyU3R5bGVcIj5cbiAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cbiAgYCxcbn0pXG5leHBvcnQgY2xhc3MgTWFpblNjcmVlbkNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoKSBtYWluU2l6ZSA9IDQwOyAvLyBwZXJjZW50YWdlXG4gIEBJbnB1dCgpIGRvU3RhY2sgPSB0cnVlO1xuICBASW5wdXQoKSBjb250YWluZXJXaWR0aEZyYWN0aW9uID0gMTtcbiAgQElucHV0KCkgY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gPSAxO1xuICBASW5wdXQoKSBkZWZhdWx0RnJhY3Rpb24gPSAwLjk0O1xuICBASW5wdXQoKSBzaG93Q29udHJvbHMgPSB0cnVlO1xuICBASW5wdXQoKSB1cGRhdGVDb21wb25lbnRTaXplcyA9IChzaXplczogQ29tcG9uZW50U2l6ZXMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhzaXplcyk7XG4gIH07XG5cbiAgQENvbnRlbnRDaGlsZHJlbignY2hpbGQnKVxuICBjaGlsZHJlbiE6IFF1ZXJ5TGlzdDxFbGVtZW50UmVmPjtcblxuICBwYXJlbnRXaWR0aCE6IG51bWJlcjtcbiAgcGFyZW50SGVpZ2h0ITogbnVtYmVyO1xuICBpc1dpZGVTY3JlZW4hOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLnVwZGF0ZURpbWVuc2lvbnMoKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCB0aGlzLnVwZGF0ZURpbWVuc2lvbnMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMudXBkYXRlRGltZW5zaW9ucyk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy51cGRhdGVEaW1lbnNpb25zKTtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnVwZGF0ZURpbWVuc2lvbnMpO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChcbiAgICAgIGNoYW5nZXNbJ21haW5TaXplJ10gfHxcbiAgICAgIGNoYW5nZXNbJ2RvU3RhY2snXSB8fFxuICAgICAgY2hhbmdlc1sncGFyZW50V2lkdGgnXSB8fFxuICAgICAgY2hhbmdlc1sncGFyZW50SGVpZ2h0J10gfHxcbiAgICAgIGNoYW5nZXNbJ3Nob3dDb250cm9scyddIHx8XG4gICAgICBjaGFuZ2VzWydkZWZhdWx0RnJhY3Rpb24nXVxuICAgICkge1xuICAgICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgIHRoaXMuYXBwbHlDaGlsZFN0eWxlcygpO1xuICB9XG5cbiAgY29tcHV0ZURpbWVuc2lvbnMoKSB7XG4gICAgaWYgKHRoaXMuZG9TdGFjaykge1xuICAgICAgcmV0dXJuIHRoaXMuaXNXaWRlU2NyZWVuXG4gICAgICAgID8ge1xuICAgICAgICAgICAgbWFpbkhlaWdodDogTWF0aC5mbG9vcih0aGlzLnBhcmVudEhlaWdodCksXG4gICAgICAgICAgICBvdGhlckhlaWdodDogTWF0aC5mbG9vcih0aGlzLnBhcmVudEhlaWdodCksXG4gICAgICAgICAgICBtYWluV2lkdGg6IE1hdGguZmxvb3IoKHRoaXMubWFpblNpemUgLyAxMDApICogdGhpcy5wYXJlbnRXaWR0aCksXG4gICAgICAgICAgICBvdGhlcldpZHRoOiBNYXRoLmZsb29yKCgoMTAwIC0gdGhpcy5tYWluU2l6ZSkgLyAxMDApICogdGhpcy5wYXJlbnRXaWR0aCksXG4gICAgICAgICAgfVxuICAgICAgICA6IHtcbiAgICAgICAgICAgIG1haW5IZWlnaHQ6IE1hdGguZmxvb3IoKHRoaXMubWFpblNpemUgLyAxMDApICogdGhpcy5wYXJlbnRIZWlnaHQpLFxuICAgICAgICAgICAgb3RoZXJIZWlnaHQ6IE1hdGguZmxvb3IoKCgxMDAgLSB0aGlzLm1haW5TaXplKSAvIDEwMCkgKiB0aGlzLnBhcmVudEhlaWdodCksXG4gICAgICAgICAgICBtYWluV2lkdGg6IE1hdGguZmxvb3IodGhpcy5wYXJlbnRXaWR0aCksXG4gICAgICAgICAgICBvdGhlcldpZHRoOiBNYXRoLmZsb29yKHRoaXMucGFyZW50V2lkdGgpLFxuICAgICAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1haW5IZWlnaHQ6IE1hdGguZmxvb3IodGhpcy5wYXJlbnRIZWlnaHQpLFxuICAgICAgICBvdGhlckhlaWdodDogTWF0aC5mbG9vcih0aGlzLnBhcmVudEhlaWdodCksXG4gICAgICAgIG1haW5XaWR0aDogTWF0aC5mbG9vcih0aGlzLnBhcmVudFdpZHRoKSxcbiAgICAgICAgb3RoZXJXaWR0aDogTWF0aC5mbG9vcih0aGlzLnBhcmVudFdpZHRoKSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgdXBkYXRlRGltZW5zaW9ucyA9ICgpID0+IHtcbiAgICB0aGlzLnBhcmVudFdpZHRoID0gd2luZG93LmlubmVyV2lkdGggKiB0aGlzLmNvbnRhaW5lcldpZHRoRnJhY3Rpb247XG4gICAgdGhpcy5wYXJlbnRIZWlnaHQgPSB0aGlzLnNob3dDb250cm9sc1xuICAgICAgPyB3aW5kb3cuaW5uZXJIZWlnaHQgKiB0aGlzLmNvbnRhaW5lckhlaWdodEZyYWN0aW9uICogdGhpcy5kZWZhdWx0RnJhY3Rpb25cbiAgICAgIDogd2luZG93LmlubmVySGVpZ2h0ICogdGhpcy5jb250YWluZXJIZWlnaHRGcmFjdGlvbjtcblxuICAgIHRoaXMuaXNXaWRlU2NyZWVuID0gdGhpcy5wYXJlbnRXaWR0aCA+PSA3Njg7XG5cbiAgICBpZiAoIXRoaXMuaXNXaWRlU2NyZWVuICYmIHRoaXMucGFyZW50V2lkdGggPiAxLjUgKiB0aGlzLnBhcmVudEhlaWdodCkge1xuICAgICAgdGhpcy5pc1dpZGVTY3JlZW4gPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgbWFpbkhlaWdodCwgb3RoZXJIZWlnaHQsIG1haW5XaWR0aCwgb3RoZXJXaWR0aCB9ID0gdGhpcy5jb21wdXRlRGltZW5zaW9ucygpO1xuICAgIHRoaXMudXBkYXRlQ29tcG9uZW50U2l6ZXMoeyBtYWluSGVpZ2h0LCBvdGhlckhlaWdodCwgbWFpbldpZHRoLCBvdGhlcldpZHRoIH0pO1xuICAgIHRoaXMuYXBwbHlDaGlsZFN0eWxlcygpO1xuICB9O1xuXG4gIGdldCBjb250YWluZXJTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgZGlzcGxheTogJ2ZsZXgnLFxuICAgICAgZmxleDogMSxcbiAgICAgIGZsZXhEaXJlY3Rpb246IHRoaXMuaXNXaWRlU2NyZWVuID8gJ3JvdycgOiAnY29sdW1uJyxcbiAgICAgIHdpZHRoOiBgJHt0aGlzLnBhcmVudFdpZHRofXB4YCxcbiAgICAgIGhlaWdodDogYCR7dGhpcy5wYXJlbnRIZWlnaHR9cHhgLFxuICAgICAgcGFkZGluZzogMCxcbiAgICAgIG1hcmdpbjogMCxcbiAgICB9O1xuICB9XG5cbiAgYXBwbHlDaGlsZFN0eWxlcygpIHtcbiAgICBpZiAodGhpcy5jaGlsZHJlbikge1xuICAgICAgY29uc3QgeyBtYWluSGVpZ2h0LCBvdGhlckhlaWdodCwgbWFpbldpZHRoLCBvdGhlcldpZHRoIH0gPSB0aGlzLmNvbXB1dGVEaW1lbnNpb25zKCk7XG4gICAgICB0aGlzLmNoaWxkcmVuLmZvckVhY2goKGNoaWxkLCBpbmRleCkgPT4ge1xuICAgICAgICBjb25zdCBjaGlsZFN0eWxlID0gdGhpcy5kb1N0YWNrXG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIGhlaWdodDogaW5kZXggPT09IDAgPyBtYWluSGVpZ2h0IDogb3RoZXJIZWlnaHQsXG4gICAgICAgICAgICAgIHdpZHRoOiBpbmRleCA9PT0gMCA/IG1haW5XaWR0aCA6IG90aGVyV2lkdGgsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgOiB7XG4gICAgICAgICAgICAgIGhlaWdodDogbWFpbkhlaWdodCxcbiAgICAgICAgICAgICAgd2lkdGg6IG1haW5XaWR0aCxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjaGlsZC5uYXRpdmVFbGVtZW50LCAnaGVpZ2h0JywgYCR7Y2hpbGRTdHlsZS5oZWlnaHR9cHhgKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZShjaGlsZC5uYXRpdmVFbGVtZW50LCAnd2lkdGgnLCBgJHtjaGlsZFN0eWxlLndpZHRofXB4YCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==