import { Component, Input, ContentChildren, } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * MainScreenComponent dynamically displays a main screen area with responsive dimensions, adjustable layout, and stacking options based on the screen size and input properties.
 *
 * @selector app-main-screen-component
 * @standalone true
 * @imports CommonModule
 *
 * @template
 * ```html
 * <div [ngStyle]="containerStyle">
 *   <ng-content></ng-content>
 * </div>
 * ```
 *
 * @inputs
 * - `mainSize` (number): Percentage size of the main component. Default is 40.
 * - `doStack` (boolean): Determines if components should be stacked. Default is true.
 * - `containerWidthFraction` (number): Fraction of the container width to use. Default is 1.
 * - `containerHeightFraction` (number): Fraction of the container height to use. Default is 1.
 * - `defaultFraction` (number): Default height fraction for the container when controls are shown. Default is 0.94.
 * - `showControls` (boolean): If true, shows control elements, affecting container height. Default is true.
 * - `updateComponentSizes` (function): Callback for updating component sizes.
 *
 * @ContentChildren('child') children - Query list of child elements within the component.
 *
 * @properties
 * - `containerStyle`: Returns a style object for the container based on dimensions and layout options.
 *
 * @methods
 * - `ngOnInit()`: Initializes the component and sets up event listeners for window resize and orientation changes.
 * - `ngOnChanges(changes: SimpleChanges)`: Updates dimensions and layout if any relevant inputs change.
 * - `ngOnDestroy()`: Removes event listeners to prevent memory leaks.
 * - `ngAfterViewInit()`: Applies computed styles to child elements after view initialization.
 * - `computeDimensions()`: Calculates the dimensions for main and secondary components based on current layout settings.
 * - `updateDimensions()`: Updates component dimensions based on window size and input properties.
 * - `applyChildStyles()`: Applies computed styles to child components.
 *
 * @example
 * ```html
 * <app-main-screen-component
 *   [mainSize]="60"
 *   [doStack]="false"
 *   [containerWidthFraction]="0.8"
 *   [containerHeightFraction]="0.9"
 *   [defaultFraction]="0.9"
 *   [showControls]="true"
 *   [updateComponentSizes]="onUpdateSizes"
 * >
 *   <div #child>Child Component</div>
 * </app-main-screen-component>
 * ```
 **/
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1zY3JlZW4tY29tcG9uZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLXNjcmVlbi1jb21wb25lbnQvbWFpbi1zY3JlZW4tY29tcG9uZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsU0FBUyxFQUNULEtBQUssRUFJTCxlQUFlLEdBTWhCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7O0FBYy9DOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFtREk7QUFZSixNQUFNLE9BQU8sbUJBQW1CO0lBa0JWO0lBakJYLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxhQUFhO0lBQzVCLE9BQU8sR0FBRyxJQUFJLENBQUM7SUFDZixzQkFBc0IsR0FBRyxDQUFDLENBQUM7SUFDM0IsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLGVBQWUsR0FBRyxJQUFJLENBQUM7SUFDdkIsWUFBWSxHQUFHLElBQUksQ0FBQztJQUNwQixvQkFBb0IsR0FBRyxDQUFDLEtBQXFCLEVBQUUsRUFBRTtRQUN4RCxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3JCLENBQUMsQ0FBQztJQUdGLFFBQVEsQ0FBeUI7SUFFakMsV0FBVyxDQUFVO0lBQ3JCLFlBQVksQ0FBVTtJQUN0QixZQUFZLENBQVc7SUFFdkIsWUFBb0IsUUFBbUI7UUFBbkIsYUFBUSxHQUFSLFFBQVEsQ0FBVztJQUFHLENBQUM7SUFFM0MsUUFBUTtRQUNOLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDekQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxXQUFXO1FBQ1QsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUM1RCxNQUFNLENBQUMsbUJBQW1CLENBQUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDekUsQ0FBQztJQUVELFdBQVcsQ0FBQyxPQUFzQjtRQUNoQyxJQUNFLE9BQU8sQ0FBQyxVQUFVLENBQUM7WUFDbkIsT0FBTyxDQUFDLFNBQVMsQ0FBQztZQUNsQixPQUFPLENBQUMsYUFBYSxDQUFDO1lBQ3RCLE9BQU8sQ0FBQyxjQUFjLENBQUM7WUFDdkIsT0FBTyxDQUFDLGNBQWMsQ0FBQztZQUN2QixPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFDMUIsQ0FBQztZQUNELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQzFCLENBQUM7SUFDSCxDQUFDO0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxpQkFBaUI7UUFDZixJQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUNqQixPQUFPLElBQUksQ0FBQyxZQUFZO2dCQUN0QixDQUFDLENBQUM7b0JBQ0UsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDekMsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDMUMsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7b0JBQy9ELFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUM7aUJBQ3pFO2dCQUNILENBQUMsQ0FBQztvQkFDRSxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDakUsV0FBVyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQztvQkFDMUUsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztvQkFDdkMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQztpQkFDekMsQ0FBQztRQUNSLENBQUM7YUFBTSxDQUFDO1lBQ04sT0FBTztnQkFDTCxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUN6QyxXQUFXLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2dCQUMxQyxTQUFTLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUN2QyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ3pDLENBQUM7UUFDSixDQUFDO0lBQ0gsQ0FBQztJQUVELGdCQUFnQixHQUFHLEdBQUcsRUFBRTtRQUN0QixJQUFJLENBQUMsV0FBVyxHQUFHLE1BQU0sQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDO1FBQ25FLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVk7WUFDbkMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxlQUFlO1lBQzFFLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyx1QkFBdUIsQ0FBQztRQUV0RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDO1FBRTVDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxXQUFXLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNyRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztRQUMzQixDQUFDO1FBRUQsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3BGLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7UUFDOUUsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDO0lBRUYsSUFBSSxjQUFjO1FBQ2hCLE9BQU87WUFDTCxPQUFPLEVBQUUsTUFBTTtZQUNmLElBQUksRUFBRSxDQUFDO1lBQ1AsYUFBYSxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUTtZQUNuRCxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsV0FBVyxJQUFJO1lBQzlCLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxZQUFZLElBQUk7WUFDaEMsT0FBTyxFQUFFLENBQUM7WUFDVixNQUFNLEVBQUUsQ0FBQztTQUNWLENBQUM7SUFDSixDQUFDO0lBRUQsZ0JBQWdCO1FBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbEIsTUFBTSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3BGLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUNyQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsT0FBTztvQkFDN0IsQ0FBQyxDQUFDO3dCQUNFLE1BQU0sRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFdBQVc7d0JBQzlDLEtBQUssRUFBRSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFVBQVU7cUJBQzVDO29CQUNILENBQUMsQ0FBQzt3QkFDRSxNQUFNLEVBQUUsVUFBVTt3QkFDbEIsS0FBSyxFQUFFLFNBQVM7cUJBQ2pCLENBQUM7Z0JBRU4sSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsR0FBRyxVQUFVLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztnQkFDaEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLGFBQWEsRUFBRSxPQUFPLEVBQUUsR0FBRyxVQUFVLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztZQUNoRixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7SUFDSCxDQUFDO3VHQXpIVSxtQkFBbUI7MkZBQW5CLG1CQUFtQixxYkFOcEI7Ozs7R0FJVCwyREFMUyxZQUFZOzsyRkFPWCxtQkFBbUI7a0JBVi9CLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLDJCQUEyQjtvQkFDckMsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLE9BQU8sRUFBRSxDQUFDLFlBQVksQ0FBQztvQkFDdkIsUUFBUSxFQUFFOzs7O0dBSVQ7aUJBQ0Y7OEVBRVUsUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csc0JBQXNCO3NCQUE5QixLQUFLO2dCQUNHLHVCQUF1QjtzQkFBL0IsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csb0JBQW9CO3NCQUE1QixLQUFLO2dCQUtOLFFBQVE7c0JBRFAsZUFBZTt1QkFBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgUXVlcnlMaXN0LFxuICBFbGVtZW50UmVmLFxuICBSZW5kZXJlcjIsXG4gIEFmdGVyVmlld0luaXQsXG4gIE9uRGVzdHJveSxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29tcG9uZW50U2l6ZXMgfSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuZXhwb3J0IGludGVyZmFjZSBNYWluU2NyZWVuQ29tcG9uZW50T3B0aW9ucyB7XG4gIG1haW5TaXplPzogbnVtYmVyO1xuICBkb1N0YWNrPzogYm9vbGVhbjtcbiAgY29udGFpbmVyV2lkdGhGcmFjdGlvbj86IG51bWJlcjtcbiAgY29udGFpbmVySGVpZ2h0RnJhY3Rpb24/OiBudW1iZXI7XG4gIGRlZmF1bHRGcmFjdGlvbj86IG51bWJlcjtcbiAgc2hvd0NvbnRyb2xzPzogYm9vbGVhbjtcbiAgdXBkYXRlQ29tcG9uZW50U2l6ZXM6IChzaXplczogQ29tcG9uZW50U2l6ZXMpID0+IHZvaWQ7XG59XG5cbmV4cG9ydCB0eXBlIE1haW5TY3JlZW5Db21wb25lbnRUeXBlID0gKG9wdGlvbnM6IE1haW5TY3JlZW5Db21wb25lbnRPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBNYWluU2NyZWVuQ29tcG9uZW50IGR5bmFtaWNhbGx5IGRpc3BsYXlzIGEgbWFpbiBzY3JlZW4gYXJlYSB3aXRoIHJlc3BvbnNpdmUgZGltZW5zaW9ucywgYWRqdXN0YWJsZSBsYXlvdXQsIGFuZCBzdGFja2luZyBvcHRpb25zIGJhc2VkIG9uIHRoZSBzY3JlZW4gc2l6ZSBhbmQgaW5wdXQgcHJvcGVydGllcy5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLW1haW4tc2NyZWVuLWNvbXBvbmVudFxuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQGltcG9ydHMgQ29tbW9uTW9kdWxlXG4gKlxuICogQHRlbXBsYXRlXG4gKiBgYGBodG1sXG4gKiA8ZGl2IFtuZ1N0eWxlXT1cImNvbnRhaW5lclN0eWxlXCI+XG4gKiAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAqIDwvZGl2PlxuICogYGBgXG4gKlxuICogQGlucHV0c1xuICogLSBgbWFpblNpemVgIChudW1iZXIpOiBQZXJjZW50YWdlIHNpemUgb2YgdGhlIG1haW4gY29tcG9uZW50LiBEZWZhdWx0IGlzIDQwLlxuICogLSBgZG9TdGFja2AgKGJvb2xlYW4pOiBEZXRlcm1pbmVzIGlmIGNvbXBvbmVudHMgc2hvdWxkIGJlIHN0YWNrZWQuIERlZmF1bHQgaXMgdHJ1ZS5cbiAqIC0gYGNvbnRhaW5lcldpZHRoRnJhY3Rpb25gIChudW1iZXIpOiBGcmFjdGlvbiBvZiB0aGUgY29udGFpbmVyIHdpZHRoIHRvIHVzZS4gRGVmYXVsdCBpcyAxLlxuICogLSBgY29udGFpbmVySGVpZ2h0RnJhY3Rpb25gIChudW1iZXIpOiBGcmFjdGlvbiBvZiB0aGUgY29udGFpbmVyIGhlaWdodCB0byB1c2UuIERlZmF1bHQgaXMgMS5cbiAqIC0gYGRlZmF1bHRGcmFjdGlvbmAgKG51bWJlcik6IERlZmF1bHQgaGVpZ2h0IGZyYWN0aW9uIGZvciB0aGUgY29udGFpbmVyIHdoZW4gY29udHJvbHMgYXJlIHNob3duLiBEZWZhdWx0IGlzIDAuOTQuXG4gKiAtIGBzaG93Q29udHJvbHNgIChib29sZWFuKTogSWYgdHJ1ZSwgc2hvd3MgY29udHJvbCBlbGVtZW50cywgYWZmZWN0aW5nIGNvbnRhaW5lciBoZWlnaHQuIERlZmF1bHQgaXMgdHJ1ZS5cbiAqIC0gYHVwZGF0ZUNvbXBvbmVudFNpemVzYCAoZnVuY3Rpb24pOiBDYWxsYmFjayBmb3IgdXBkYXRpbmcgY29tcG9uZW50IHNpemVzLlxuICpcbiAqIEBDb250ZW50Q2hpbGRyZW4oJ2NoaWxkJykgY2hpbGRyZW4gLSBRdWVyeSBsaXN0IG9mIGNoaWxkIGVsZW1lbnRzIHdpdGhpbiB0aGUgY29tcG9uZW50LlxuICpcbiAqIEBwcm9wZXJ0aWVzXG4gKiAtIGBjb250YWluZXJTdHlsZWA6IFJldHVybnMgYSBzdHlsZSBvYmplY3QgZm9yIHRoZSBjb250YWluZXIgYmFzZWQgb24gZGltZW5zaW9ucyBhbmQgbGF5b3V0IG9wdGlvbnMuXG4gKlxuICogQG1ldGhvZHNcbiAqIC0gYG5nT25Jbml0KClgOiBJbml0aWFsaXplcyB0aGUgY29tcG9uZW50IGFuZCBzZXRzIHVwIGV2ZW50IGxpc3RlbmVycyBmb3Igd2luZG93IHJlc2l6ZSBhbmQgb3JpZW50YXRpb24gY2hhbmdlcy5cbiAqIC0gYG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpYDogVXBkYXRlcyBkaW1lbnNpb25zIGFuZCBsYXlvdXQgaWYgYW55IHJlbGV2YW50IGlucHV0cyBjaGFuZ2UuXG4gKiAtIGBuZ09uRGVzdHJveSgpYDogUmVtb3ZlcyBldmVudCBsaXN0ZW5lcnMgdG8gcHJldmVudCBtZW1vcnkgbGVha3MuXG4gKiAtIGBuZ0FmdGVyVmlld0luaXQoKWA6IEFwcGxpZXMgY29tcHV0ZWQgc3R5bGVzIHRvIGNoaWxkIGVsZW1lbnRzIGFmdGVyIHZpZXcgaW5pdGlhbGl6YXRpb24uXG4gKiAtIGBjb21wdXRlRGltZW5zaW9ucygpYDogQ2FsY3VsYXRlcyB0aGUgZGltZW5zaW9ucyBmb3IgbWFpbiBhbmQgc2Vjb25kYXJ5IGNvbXBvbmVudHMgYmFzZWQgb24gY3VycmVudCBsYXlvdXQgc2V0dGluZ3MuXG4gKiAtIGB1cGRhdGVEaW1lbnNpb25zKClgOiBVcGRhdGVzIGNvbXBvbmVudCBkaW1lbnNpb25zIGJhc2VkIG9uIHdpbmRvdyBzaXplIGFuZCBpbnB1dCBwcm9wZXJ0aWVzLlxuICogLSBgYXBwbHlDaGlsZFN0eWxlcygpYDogQXBwbGllcyBjb21wdXRlZCBzdHlsZXMgdG8gY2hpbGQgY29tcG9uZW50cy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1tYWluLXNjcmVlbi1jb21wb25lbnRcbiAqICAgW21haW5TaXplXT1cIjYwXCJcbiAqICAgW2RvU3RhY2tdPVwiZmFsc2VcIlxuICogICBbY29udGFpbmVyV2lkdGhGcmFjdGlvbl09XCIwLjhcIlxuICogICBbY29udGFpbmVySGVpZ2h0RnJhY3Rpb25dPVwiMC45XCJcbiAqICAgW2RlZmF1bHRGcmFjdGlvbl09XCIwLjlcIlxuICogICBbc2hvd0NvbnRyb2xzXT1cInRydWVcIlxuICogICBbdXBkYXRlQ29tcG9uZW50U2l6ZXNdPVwib25VcGRhdGVTaXplc1wiXG4gKiA+XG4gKiAgIDxkaXYgI2NoaWxkPkNoaWxkIENvbXBvbmVudDwvZGl2PlxuICogPC9hcHAtbWFpbi1zY3JlZW4tY29tcG9uZW50PlxuICogYGBgXG4gKiovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tYWluLXNjcmVlbi1jb21wb25lbnQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IFtuZ1N0eWxlXT1cImNvbnRhaW5lclN0eWxlXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE1haW5TY3JlZW5Db21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCkgbWFpblNpemUgPSA0MDsgLy8gcGVyY2VudGFnZVxuICBASW5wdXQoKSBkb1N0YWNrID0gdHJ1ZTtcbiAgQElucHV0KCkgY29udGFpbmVyV2lkdGhGcmFjdGlvbiA9IDE7XG4gIEBJbnB1dCgpIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uID0gMTtcbiAgQElucHV0KCkgZGVmYXVsdEZyYWN0aW9uID0gMC45NDtcbiAgQElucHV0KCkgc2hvd0NvbnRyb2xzID0gdHJ1ZTtcbiAgQElucHV0KCkgdXBkYXRlQ29tcG9uZW50U2l6ZXMgPSAoc2l6ZXM6IENvbXBvbmVudFNpemVzKSA9PiB7XG4gICAgY29uc29sZS5sb2coc2l6ZXMpO1xuICB9O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oJ2NoaWxkJylcbiAgY2hpbGRyZW4hOiBRdWVyeUxpc3Q8RWxlbWVudFJlZj47XG5cbiAgcGFyZW50V2lkdGghOiBudW1iZXI7XG4gIHBhcmVudEhlaWdodCE6IG51bWJlcjtcbiAgaXNXaWRlU2NyZWVuITogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy51cGRhdGVEaW1lbnNpb25zKCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy51cGRhdGVEaW1lbnNpb25zKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignb3JpZW50YXRpb25jaGFuZ2UnLCB0aGlzLnVwZGF0ZURpbWVuc2lvbnMpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHRoaXMudXBkYXRlRGltZW5zaW9ucyk7XG4gICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ29yaWVudGF0aW9uY2hhbmdlJywgdGhpcy51cGRhdGVEaW1lbnNpb25zKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzWydtYWluU2l6ZSddIHx8XG4gICAgICBjaGFuZ2VzWydkb1N0YWNrJ10gfHxcbiAgICAgIGNoYW5nZXNbJ3BhcmVudFdpZHRoJ10gfHxcbiAgICAgIGNoYW5nZXNbJ3BhcmVudEhlaWdodCddIHx8XG4gICAgICBjaGFuZ2VzWydzaG93Q29udHJvbHMnXSB8fFxuICAgICAgY2hhbmdlc1snZGVmYXVsdEZyYWN0aW9uJ11cbiAgICApIHtcbiAgICAgIHRoaXMudXBkYXRlRGltZW5zaW9ucygpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmFwcGx5Q2hpbGRTdHlsZXMoKTtcbiAgfVxuXG4gIGNvbXB1dGVEaW1lbnNpb25zKCkge1xuICAgIGlmICh0aGlzLmRvU3RhY2spIHtcbiAgICAgIHJldHVybiB0aGlzLmlzV2lkZVNjcmVlblxuICAgICAgICA/IHtcbiAgICAgICAgICAgIG1haW5IZWlnaHQ6IE1hdGguZmxvb3IodGhpcy5wYXJlbnRIZWlnaHQpLFxuICAgICAgICAgICAgb3RoZXJIZWlnaHQ6IE1hdGguZmxvb3IodGhpcy5wYXJlbnRIZWlnaHQpLFxuICAgICAgICAgICAgbWFpbldpZHRoOiBNYXRoLmZsb29yKCh0aGlzLm1haW5TaXplIC8gMTAwKSAqIHRoaXMucGFyZW50V2lkdGgpLFxuICAgICAgICAgICAgb3RoZXJXaWR0aDogTWF0aC5mbG9vcigoKDEwMCAtIHRoaXMubWFpblNpemUpIC8gMTAwKSAqIHRoaXMucGFyZW50V2lkdGgpLFxuICAgICAgICAgIH1cbiAgICAgICAgOiB7XG4gICAgICAgICAgICBtYWluSGVpZ2h0OiBNYXRoLmZsb29yKCh0aGlzLm1haW5TaXplIC8gMTAwKSAqIHRoaXMucGFyZW50SGVpZ2h0KSxcbiAgICAgICAgICAgIG90aGVySGVpZ2h0OiBNYXRoLmZsb29yKCgoMTAwIC0gdGhpcy5tYWluU2l6ZSkgLyAxMDApICogdGhpcy5wYXJlbnRIZWlnaHQpLFxuICAgICAgICAgICAgbWFpbldpZHRoOiBNYXRoLmZsb29yKHRoaXMucGFyZW50V2lkdGgpLFxuICAgICAgICAgICAgb3RoZXJXaWR0aDogTWF0aC5mbG9vcih0aGlzLnBhcmVudFdpZHRoKSxcbiAgICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtYWluSGVpZ2h0OiBNYXRoLmZsb29yKHRoaXMucGFyZW50SGVpZ2h0KSxcbiAgICAgICAgb3RoZXJIZWlnaHQ6IE1hdGguZmxvb3IodGhpcy5wYXJlbnRIZWlnaHQpLFxuICAgICAgICBtYWluV2lkdGg6IE1hdGguZmxvb3IodGhpcy5wYXJlbnRXaWR0aCksXG4gICAgICAgIG90aGVyV2lkdGg6IE1hdGguZmxvb3IodGhpcy5wYXJlbnRXaWR0aCksXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZURpbWVuc2lvbnMgPSAoKSA9PiB7XG4gICAgdGhpcy5wYXJlbnRXaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoICogdGhpcy5jb250YWluZXJXaWR0aEZyYWN0aW9uO1xuICAgIHRoaXMucGFyZW50SGVpZ2h0ID0gdGhpcy5zaG93Q29udHJvbHNcbiAgICAgID8gd2luZG93LmlubmVySGVpZ2h0ICogdGhpcy5jb250YWluZXJIZWlnaHRGcmFjdGlvbiAqIHRoaXMuZGVmYXVsdEZyYWN0aW9uXG4gICAgICA6IHdpbmRvdy5pbm5lckhlaWdodCAqIHRoaXMuY29udGFpbmVySGVpZ2h0RnJhY3Rpb247XG5cbiAgICB0aGlzLmlzV2lkZVNjcmVlbiA9IHRoaXMucGFyZW50V2lkdGggPj0gNzY4O1xuXG4gICAgaWYgKCF0aGlzLmlzV2lkZVNjcmVlbiAmJiB0aGlzLnBhcmVudFdpZHRoID4gMS41ICogdGhpcy5wYXJlbnRIZWlnaHQpIHtcbiAgICAgIHRoaXMuaXNXaWRlU2NyZWVuID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IG1haW5IZWlnaHQsIG90aGVySGVpZ2h0LCBtYWluV2lkdGgsIG90aGVyV2lkdGggfSA9IHRoaXMuY29tcHV0ZURpbWVuc2lvbnMoKTtcbiAgICB0aGlzLnVwZGF0ZUNvbXBvbmVudFNpemVzKHsgbWFpbkhlaWdodCwgb3RoZXJIZWlnaHQsIG1haW5XaWR0aCwgb3RoZXJXaWR0aCB9KTtcbiAgICB0aGlzLmFwcGx5Q2hpbGRTdHlsZXMoKTtcbiAgfTtcblxuICBnZXQgY29udGFpbmVyU3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIGZsZXg6IDEsXG4gICAgICBmbGV4RGlyZWN0aW9uOiB0aGlzLmlzV2lkZVNjcmVlbiA/ICdyb3cnIDogJ2NvbHVtbicsXG4gICAgICB3aWR0aDogYCR7dGhpcy5wYXJlbnRXaWR0aH1weGAsXG4gICAgICBoZWlnaHQ6IGAke3RoaXMucGFyZW50SGVpZ2h0fXB4YCxcbiAgICAgIHBhZGRpbmc6IDAsXG4gICAgICBtYXJnaW46IDAsXG4gICAgfTtcbiAgfVxuXG4gIGFwcGx5Q2hpbGRTdHlsZXMoKSB7XG4gICAgaWYgKHRoaXMuY2hpbGRyZW4pIHtcbiAgICAgIGNvbnN0IHsgbWFpbkhlaWdodCwgb3RoZXJIZWlnaHQsIG1haW5XaWR0aCwgb3RoZXJXaWR0aCB9ID0gdGhpcy5jb21wdXRlRGltZW5zaW9ucygpO1xuICAgICAgdGhpcy5jaGlsZHJlbi5mb3JFYWNoKChjaGlsZCwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgY2hpbGRTdHlsZSA9IHRoaXMuZG9TdGFja1xuICAgICAgICAgID8ge1xuICAgICAgICAgICAgICBoZWlnaHQ6IGluZGV4ID09PSAwID8gbWFpbkhlaWdodCA6IG90aGVySGVpZ2h0LFxuICAgICAgICAgICAgICB3aWR0aDogaW5kZXggPT09IDAgPyBtYWluV2lkdGggOiBvdGhlcldpZHRoLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIDoge1xuICAgICAgICAgICAgICBoZWlnaHQ6IG1haW5IZWlnaHQsXG4gICAgICAgICAgICAgIHdpZHRoOiBtYWluV2lkdGgsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY2hpbGQubmF0aXZlRWxlbWVudCwgJ2hlaWdodCcsIGAke2NoaWxkU3R5bGUuaGVpZ2h0fXB4YCk7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUoY2hpbGQubmF0aXZlRWxlbWVudCwgJ3dpZHRoJywgYCR7Y2hpbGRTdHlsZS53aWR0aH1weGApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=