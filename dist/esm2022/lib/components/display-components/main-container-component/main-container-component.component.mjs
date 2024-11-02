import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * MainContainerComponent dynamically adjusts its styles based on input properties and window size,
 * providing a responsive container for content.
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
 * @inputs
 * - `backgroundColor` (string): Background color of the container.
 * - `containerWidthFraction` (number): Fraction of the window width the container should occupy. Default is 1.
 * - `containerHeightFraction` (number): Fraction of the window height the container should occupy. Default is 1.
 * - `marginLeft` (number): Left margin of the container in pixels.
 * - `marginRight` (number): Right margin of the container in pixels.
 * - `marginTop` (number): Top margin of the container in pixels.
 * - `marginBottom` (number): Bottom margin of the container in pixels.
 * - `padding` (number): Padding inside the container in pixels.
 *
 * @methods
 * - `ngOnInit()`: Initializes the component, sets up event listeners for resize and orientation changes, and updates container styles.
 * - `ngOnChanges(changes: SimpleChanges)`: Updates container styles when input properties change.
 * - `ngOnDestroy()`: Removes event listeners to avoid memory leaks.
 * - `updateContainerStyles()`: Computes and applies styles to the container based on current window size and input properties.
 *
 * @example
 * ```html
 * <app-main-container-component
 *   [backgroundColor]="'lightgrey'"
 *   [containerWidthFraction]="0.8"
 *   [containerHeightFraction]="0.9"
 *   [marginLeft]="10"
 *   [marginTop]="15"
 *   [padding]="5"
 * ></app-main-container-component>
 * ```
 **/
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi1jb250YWluZXItY29tcG9uZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9tYWluLWNvbnRhaW5lci1jb21wb25lbnQvbWFpbi1jb250YWluZXItY29tcG9uZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBK0MsTUFBTSxlQUFlLENBQUM7QUFDOUYsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDOzs7QUFlL0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQTBDSTtBQVlKLE1BQU0sT0FBTyxzQkFBc0I7SUFDeEIsZUFBZSxHQUFHLEVBQUUsQ0FBQztJQUNyQixzQkFBc0IsR0FBRyxDQUFDLENBQUM7SUFDM0IsdUJBQXVCLEdBQUcsQ0FBQyxDQUFDO0lBQzVCLFVBQVUsR0FBRyxDQUFDLENBQUM7SUFDZixXQUFXLEdBQUcsQ0FBQyxDQUFDO0lBQ2hCLFNBQVMsR0FBRyxDQUFDLENBQUM7SUFDZCxZQUFZLEdBQUcsQ0FBQyxDQUFDO0lBQ2pCLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFFckIsZUFBZSxHQUEyQixFQUFFLENBQUM7SUFFN0MsUUFBUTtRQUNOLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxDQUFDO1FBRTdCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDOUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLG1CQUFtQixFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQzNFLENBQUM7SUFFRCxXQUFXLENBQUMsT0FBc0I7UUFDaEMsSUFDRSxPQUFPLENBQUMseUJBQXlCLENBQUM7WUFDbEMsT0FBTyxDQUFDLHdCQUF3QixDQUFDO1lBQ2pDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQztZQUMxQixPQUFPLENBQUMsWUFBWSxDQUFDO1lBQ3JCLE9BQU8sQ0FBQyxhQUFhLENBQUM7WUFDdEIsT0FBTyxDQUFDLFdBQVcsQ0FBQztZQUNwQixPQUFPLENBQUMsY0FBYyxDQUFDLEVBQ3ZCLENBQUM7WUFDRCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztRQUMvQixDQUFDO0lBQ0gsQ0FBQztJQUVELFdBQVc7UUFDVCxNQUFNLENBQUMsbUJBQW1CLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1FBQ2pFLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsRUFBRSxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQscUJBQXFCLEdBQUcsR0FBRyxFQUFFO1FBQzNCLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFDeEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLFVBQVUsQ0FBQztRQUV0QyxJQUFJLENBQUMsZUFBZSxHQUFHO1lBQ3JCLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxVQUFVLEVBQUUsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJO1lBQ2xDLFdBQVcsRUFBRSxHQUFHLElBQUksQ0FBQyxXQUFXLElBQUk7WUFDcEMsU0FBUyxFQUFFLEdBQUcsSUFBSSxDQUFDLFNBQVMsSUFBSTtZQUNoQyxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUMsWUFBWSxJQUFJO1lBQ3RDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxZQUFZLENBQUMsR0FBRyxJQUFJO1lBQ3RFLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxZQUFZLENBQUMsR0FBRyxJQUFJO1lBQ3pFLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxXQUFXLENBQUMsR0FBRyxJQUFJO1lBQ25FLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxXQUFXLENBQUMsR0FBRyxJQUFJO1lBQ3RFLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUk7WUFDNUIsUUFBUSxFQUFFLFFBQVE7U0FDbkIsQ0FBQztJQUNKLENBQUMsQ0FBQzt1R0F2RFMsc0JBQXNCOzJGQUF0QixzQkFBc0IsbVlBTnZCOzs7O0dBSVQsMkRBTFMsWUFBWTs7MkZBT1gsc0JBQXNCO2tCQVZsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLFVBQVUsRUFBRSxJQUFJO29CQUNoQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLFFBQVEsRUFBRTs7OztHQUlUO2lCQUNGOzhCQUVVLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csc0JBQXNCO3NCQUE5QixLQUFLO2dCQUNHLHVCQUF1QjtzQkFBL0IsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uSW5pdCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWFpbkNvbnRhaW5lckNvbXBvbmVudE9wdGlvbnMge1xuICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIGNvbnRhaW5lcldpZHRoRnJhY3Rpb24/OiBudW1iZXI7XG4gIGNvbnRhaW5lckhlaWdodEZyYWN0aW9uPzogbnVtYmVyO1xuICBtYXJnaW5MZWZ0PzogbnVtYmVyO1xuICBtYXJnaW5SaWdodD86IG51bWJlcjtcbiAgbWFyZ2luVG9wPzogbnVtYmVyO1xuICBtYXJnaW5Cb3R0b20/OiBudW1iZXI7XG4gIHBhZGRpbmc/OiBudW1iZXI7XG59XG5cbmV4cG9ydCB0eXBlIE1haW5Db250YWluZXJDb21wb25lbnRUeXBlID0gKG9wdGlvbnM6IE1haW5Db250YWluZXJDb21wb25lbnRPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBNYWluQ29udGFpbmVyQ29tcG9uZW50IGR5bmFtaWNhbGx5IGFkanVzdHMgaXRzIHN0eWxlcyBiYXNlZCBvbiBpbnB1dCBwcm9wZXJ0aWVzIGFuZCB3aW5kb3cgc2l6ZSxcbiAqIHByb3ZpZGluZyBhIHJlc3BvbnNpdmUgY29udGFpbmVyIGZvciBjb250ZW50LlxuICpcbiAqIEBzZWxlY3RvciBhcHAtbWFpbi1jb250YWluZXItY29tcG9uZW50XG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGVcbiAqXG4gKiBAdGVtcGxhdGVcbiAqIGBgYGh0bWxcbiAqIDxkaXYgW25nU3R5bGVdPVwiY29udGFpbmVyU3R5bGVzXCI+XG4gKiAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAqIDwvZGl2PlxuICogYGBgXG4gKlxuICogQGlucHV0c1xuICogLSBgYmFja2dyb3VuZENvbG9yYCAoc3RyaW5nKTogQmFja2dyb3VuZCBjb2xvciBvZiB0aGUgY29udGFpbmVyLlxuICogLSBgY29udGFpbmVyV2lkdGhGcmFjdGlvbmAgKG51bWJlcik6IEZyYWN0aW9uIG9mIHRoZSB3aW5kb3cgd2lkdGggdGhlIGNvbnRhaW5lciBzaG91bGQgb2NjdXB5LiBEZWZhdWx0IGlzIDEuXG4gKiAtIGBjb250YWluZXJIZWlnaHRGcmFjdGlvbmAgKG51bWJlcik6IEZyYWN0aW9uIG9mIHRoZSB3aW5kb3cgaGVpZ2h0IHRoZSBjb250YWluZXIgc2hvdWxkIG9jY3VweS4gRGVmYXVsdCBpcyAxLlxuICogLSBgbWFyZ2luTGVmdGAgKG51bWJlcik6IExlZnQgbWFyZ2luIG9mIHRoZSBjb250YWluZXIgaW4gcGl4ZWxzLlxuICogLSBgbWFyZ2luUmlnaHRgIChudW1iZXIpOiBSaWdodCBtYXJnaW4gb2YgdGhlIGNvbnRhaW5lciBpbiBwaXhlbHMuXG4gKiAtIGBtYXJnaW5Ub3BgIChudW1iZXIpOiBUb3AgbWFyZ2luIG9mIHRoZSBjb250YWluZXIgaW4gcGl4ZWxzLlxuICogLSBgbWFyZ2luQm90dG9tYCAobnVtYmVyKTogQm90dG9tIG1hcmdpbiBvZiB0aGUgY29udGFpbmVyIGluIHBpeGVscy5cbiAqIC0gYHBhZGRpbmdgIChudW1iZXIpOiBQYWRkaW5nIGluc2lkZSB0aGUgY29udGFpbmVyIGluIHBpeGVscy5cbiAqXG4gKiBAbWV0aG9kc1xuICogLSBgbmdPbkluaXQoKWA6IEluaXRpYWxpemVzIHRoZSBjb21wb25lbnQsIHNldHMgdXAgZXZlbnQgbGlzdGVuZXJzIGZvciByZXNpemUgYW5kIG9yaWVudGF0aW9uIGNoYW5nZXMsIGFuZCB1cGRhdGVzIGNvbnRhaW5lciBzdHlsZXMuXG4gKiAtIGBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKWA6IFVwZGF0ZXMgY29udGFpbmVyIHN0eWxlcyB3aGVuIGlucHV0IHByb3BlcnRpZXMgY2hhbmdlLlxuICogLSBgbmdPbkRlc3Ryb3koKWA6IFJlbW92ZXMgZXZlbnQgbGlzdGVuZXJzIHRvIGF2b2lkIG1lbW9yeSBsZWFrcy5cbiAqIC0gYHVwZGF0ZUNvbnRhaW5lclN0eWxlcygpYDogQ29tcHV0ZXMgYW5kIGFwcGxpZXMgc3R5bGVzIHRvIHRoZSBjb250YWluZXIgYmFzZWQgb24gY3VycmVudCB3aW5kb3cgc2l6ZSBhbmQgaW5wdXQgcHJvcGVydGllcy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1tYWluLWNvbnRhaW5lci1jb21wb25lbnRcbiAqICAgW2JhY2tncm91bmRDb2xvcl09XCInbGlnaHRncmV5J1wiXG4gKiAgIFtjb250YWluZXJXaWR0aEZyYWN0aW9uXT1cIjAuOFwiXG4gKiAgIFtjb250YWluZXJIZWlnaHRGcmFjdGlvbl09XCIwLjlcIlxuICogICBbbWFyZ2luTGVmdF09XCIxMFwiXG4gKiAgIFttYXJnaW5Ub3BdPVwiMTVcIlxuICogICBbcGFkZGluZ109XCI1XCJcbiAqID48L2FwcC1tYWluLWNvbnRhaW5lci1jb21wb25lbnQ+XG4gKiBgYGBcbiAqKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1haW4tY29udGFpbmVyLWNvbXBvbmVudCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgW25nU3R5bGVdPVwiY29udGFpbmVyU3R5bGVzXCI+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIE1haW5Db250YWluZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSwgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgYmFja2dyb3VuZENvbG9yID0gJyc7XG4gIEBJbnB1dCgpIGNvbnRhaW5lcldpZHRoRnJhY3Rpb24gPSAxO1xuICBASW5wdXQoKSBjb250YWluZXJIZWlnaHRGcmFjdGlvbiA9IDE7XG4gIEBJbnB1dCgpIG1hcmdpbkxlZnQgPSAwO1xuICBASW5wdXQoKSBtYXJnaW5SaWdodCA9IDA7XG4gIEBJbnB1dCgpIG1hcmdpblRvcCA9IDA7XG4gIEBJbnB1dCgpIG1hcmdpbkJvdHRvbSA9IDA7XG4gIEBJbnB1dCgpIHBhZGRpbmcgPSAwO1xuXG4gIGNvbnRhaW5lclN0eWxlczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSA9IHt9O1xuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMudXBkYXRlQ29udGFpbmVyU3R5bGVzKCk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy51cGRhdGVDb250YWluZXJTdHlsZXMpO1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMudXBkYXRlQ29udGFpbmVyU3R5bGVzKTtcbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcbiAgICBpZiAoXG4gICAgICBjaGFuZ2VzWydjb250YWluZXJIZWlnaHRGcmFjdGlvbiddIHx8XG4gICAgICBjaGFuZ2VzWydjb250YWluZXJXaWR0aEZyYWN0aW9uJ10gfHxcbiAgICAgIGNoYW5nZXNbJ2JhY2tncm91bmRDb2xvciddIHx8XG4gICAgICBjaGFuZ2VzWydtYXJnaW5MZWZ0J10gfHxcbiAgICAgIGNoYW5nZXNbJ21hcmdpblJpZ2h0J10gfHxcbiAgICAgIGNoYW5nZXNbJ21hcmdpblRvcCddIHx8XG4gICAgICBjaGFuZ2VzWydtYXJnaW5Cb3R0b20nXVxuICAgICkge1xuICAgICAgdGhpcy51cGRhdGVDb250YWluZXJTdHlsZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcigncmVzaXplJywgdGhpcy51cGRhdGVDb250YWluZXJTdHlsZXMpO1xuICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdvcmllbnRhdGlvbmNoYW5nZScsIHRoaXMudXBkYXRlQ29udGFpbmVyU3R5bGVzKTtcbiAgfVxuXG4gIHVwZGF0ZUNvbnRhaW5lclN0eWxlcyA9ICgpID0+IHtcbiAgICBjb25zdCB3aW5kb3dIZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcblxuICAgIHRoaXMuY29udGFpbmVyU3R5bGVzID0ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmJhY2tncm91bmRDb2xvcixcbiAgICAgIG1hcmdpbkxlZnQ6IGAke3RoaXMubWFyZ2luTGVmdH1weGAsXG4gICAgICBtYXJnaW5SaWdodDogYCR7dGhpcy5tYXJnaW5SaWdodH1weGAsXG4gICAgICBtYXJnaW5Ub3A6IGAke3RoaXMubWFyZ2luVG9wfXB4YCxcbiAgICAgIG1hcmdpbkJvdHRvbTogYCR7dGhpcy5tYXJnaW5Cb3R0b219cHhgLFxuICAgICAgaGVpZ2h0OiBNYXRoLmZsb29yKHRoaXMuY29udGFpbmVySGVpZ2h0RnJhY3Rpb24gKiB3aW5kb3dIZWlnaHQpICsgJ3B4JyxcbiAgICAgIG1heEhlaWdodDogTWF0aC5mbG9vcih0aGlzLmNvbnRhaW5lckhlaWdodEZyYWN0aW9uICogd2luZG93SGVpZ2h0KSArICdweCcsXG4gICAgICB3aWR0aDogTWF0aC5mbG9vcih0aGlzLmNvbnRhaW5lcldpZHRoRnJhY3Rpb24gKiB3aW5kb3dXaWR0aCkgKyAncHgnLFxuICAgICAgbWF4V2lkdGg6IE1hdGguZmxvb3IodGhpcy5jb250YWluZXJXaWR0aEZyYWN0aW9uICogd2luZG93V2lkdGgpICsgJ3B4JyxcbiAgICAgIHBhZGRpbmc6IGAke3RoaXMucGFkZGluZ31weGAsXG4gICAgICBvdmVyZmxvdzogJ2hpZGRlbicsXG4gICAgfTtcbiAgfTtcbn1cbiJdfQ==