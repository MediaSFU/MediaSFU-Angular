import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * LoadingModal displays a loading spinner and a customizable "Loading..." text as an overlay.
 *
 * @selector app-loading-modal
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `isVisible` (boolean): Controls the visibility of the modal overlay. Default is `false`.
 * - `backgroundColor` (string): Background color of the modal overlay. Default is `'rgba(0, 0, 0, 0.5)'`.
 * - `displayColor` (string): Color of the loading text. Default is `'white'`.
 *
 * @properties
 * - `modalContainerStyle` (object): Computed styles for the modal container.
 * - `modalContentStyle` (object): Computed styles for the modal content.
 * - `spinnerContainerStyle` (object): Computed styles for the spinner container.
 * - `loadingTextStyle` (object): Computed styles for the loading text.
 *
 * @example
 * ```html
 * <app-loading-modal
 *   [isVisible]="true"
 *   [backgroundColor]="'rgba(0, 0, 0, 0.5)'"
 *   [displayColor]="'white'">
 * </app-loading-modal>
 * ```
 *
 * @styles
 * - `.spinner`: Styles for the loading spinner.
 * - `@keyframes spin`: Keyframes for the spinner rotation animation.
 * - `.modal-content`: Styles for the modal content container.
 * - `.loading-text`: Styles for the loading text.
 **/
export class LoadingModal {
    isVisible = false;
    backgroundColor = 'rgba(0, 0, 0, 0.5)';
    displayColor = 'white';
    get modalContainerStyle() {
        return {
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: this.backgroundColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '999',
        };
    }
    get modalContentStyle() {
        return {
            backgroundColor: this.backgroundColor,
            borderRadius: '10px',
            padding: '10px',
            maxWidth: '200px',
            textAlign: 'center',
        };
    }
    get spinnerContainerStyle() {
        return {
            marginBottom: '20px',
        };
    }
    get loadingTextStyle() {
        return {
            color: this.displayColor,
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LoadingModal, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: LoadingModal, isStandalone: true, selector: "app-loading-modal", inputs: { isVisible: "isVisible", backgroundColor: "backgroundColor", displayColor: "displayColor" }, ngImport: i0, template: `
    <div *ngIf="isVisible" [ngStyle]="modalContainerStyle">
      <div [ngStyle]="modalContentStyle" class="modal-content">
        <div class="spinner" [ngStyle]="spinnerContainerStyle"></div>
        <div [ngStyle]="loadingTextStyle" class="loading-text">Loading...</div>
      </div>
    </div>
  `, isInline: true, styles: [".spinner{border:12px solid #f3f3f3;border-top:12px solid black;border-radius:50%;width:50px;height:50px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.modal-content{display:flex;flex-direction:column;align-items:center}.loading-text{margin-top:10px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LoadingModal, decorators: [{
            type: Component,
            args: [{ selector: 'app-loading-modal', standalone: true, imports: [CommonModule], template: `
    <div *ngIf="isVisible" [ngStyle]="modalContainerStyle">
      <div [ngStyle]="modalContentStyle" class="modal-content">
        <div class="spinner" [ngStyle]="spinnerContainerStyle"></div>
        <div [ngStyle]="loadingTextStyle" class="loading-text">Loading...</div>
      </div>
    </div>
  `, styles: [".spinner{border:12px solid #f3f3f3;border-top:12px solid black;border-radius:50%;width:50px;height:50px;animation:spin 2s linear infinite}@keyframes spin{0%{transform:rotate(0)}to{transform:rotate(360deg)}}.modal-content{display:flex;flex-direction:column;align-items:center}.loading-text{margin-top:10px}\n"] }]
        }], propDecorators: { isVisible: [{
                type: Input
            }], backgroundColor: [{
                type: Input
            }], displayColor: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1tb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvbG9hZGluZy1tb2RhbC9sb2FkaW5nLW1vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQVMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFnQ0k7QUEyQ0osTUFBTSxPQUFPLFlBQVk7SUFDZCxTQUFTLEdBQUcsS0FBSyxDQUFDO0lBQ2xCLGVBQWUsR0FBWSxvQkFBb0IsQ0FBQztJQUNoRCxZQUFZLEdBQVksT0FBTyxDQUFDO0lBRXpDLElBQUksbUJBQW1CO1FBQ3JCLE9BQU87WUFDTCxRQUFRLEVBQUUsT0FBTztZQUNqQixHQUFHLEVBQUUsR0FBRztZQUNSLElBQUksRUFBRSxHQUFHO1lBQ1QsS0FBSyxFQUFFLE1BQU07WUFDYixNQUFNLEVBQUUsTUFBTTtZQUNkLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxPQUFPLEVBQUUsTUFBTTtZQUNmLFVBQVUsRUFBRSxRQUFRO1lBQ3BCLGNBQWMsRUFBRSxRQUFRO1lBQ3hCLE1BQU0sRUFBRSxLQUFLO1NBQ2QsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJLGlCQUFpQjtRQUNuQixPQUFPO1lBQ0wsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQ3JDLFlBQVksRUFBRSxNQUFNO1lBQ3BCLE9BQU8sRUFBRSxNQUFNO1lBQ2YsUUFBUSxFQUFFLE9BQU87WUFDakIsU0FBUyxFQUFFLFFBQVE7U0FDcEIsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJLHFCQUFxQjtRQUN2QixPQUFPO1lBQ0wsWUFBWSxFQUFFLE1BQU07U0FDckIsQ0FBQztJQUNKLENBQUM7SUFFRCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPO1lBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZO1NBQ3pCLENBQUM7SUFDSixDQUFDO3VHQXhDVSxZQUFZOzJGQUFaLFlBQVksbUxBckNiOzs7Ozs7O0dBT1QsNFhBUlMsWUFBWTs7MkZBc0NYLFlBQVk7a0JBekN4QixTQUFTOytCQUNFLG1CQUFtQixjQUNqQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUMsWUFDYjs7Ozs7OztHQU9UOzhCQStCUSxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLGVBQWU7c0JBQXZCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5leHBvcnQgaW50ZXJmYWNlIExvYWRpbmdNb2RhbE9wdGlvbnMge1xuICBpc1Zpc2libGU6IGJvb2xlYW47XG4gIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgZGlzcGxheUNvbG9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBMb2FkaW5nTW9kYWxUeXBlID0gKG9wdGlvbnM6IExvYWRpbmdNb2RhbE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIExvYWRpbmdNb2RhbCBkaXNwbGF5cyBhIGxvYWRpbmcgc3Bpbm5lciBhbmQgYSBjdXN0b21pemFibGUgXCJMb2FkaW5nLi4uXCIgdGV4dCBhcyBhbiBvdmVybGF5LlxuICpcbiAqIEBzZWxlY3RvciBhcHAtbG9hZGluZy1tb2RhbFxuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQGltcG9ydHMgQ29tbW9uTW9kdWxlXG4gKlxuICogQGlucHV0c1xuICogLSBgaXNWaXNpYmxlYCAoYm9vbGVhbik6IENvbnRyb2xzIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBtb2RhbCBvdmVybGF5LiBEZWZhdWx0IGlzIGBmYWxzZWAuXG4gKiAtIGBiYWNrZ3JvdW5kQ29sb3JgIChzdHJpbmcpOiBCYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBtb2RhbCBvdmVybGF5LiBEZWZhdWx0IGlzIGAncmdiYSgwLCAwLCAwLCAwLjUpJ2AuXG4gKiAtIGBkaXNwbGF5Q29sb3JgIChzdHJpbmcpOiBDb2xvciBvZiB0aGUgbG9hZGluZyB0ZXh0LiBEZWZhdWx0IGlzIGAnd2hpdGUnYC5cbiAqXG4gKiBAcHJvcGVydGllc1xuICogLSBgbW9kYWxDb250YWluZXJTdHlsZWAgKG9iamVjdCk6IENvbXB1dGVkIHN0eWxlcyBmb3IgdGhlIG1vZGFsIGNvbnRhaW5lci5cbiAqIC0gYG1vZGFsQ29udGVudFN0eWxlYCAob2JqZWN0KTogQ29tcHV0ZWQgc3R5bGVzIGZvciB0aGUgbW9kYWwgY29udGVudC5cbiAqIC0gYHNwaW5uZXJDb250YWluZXJTdHlsZWAgKG9iamVjdCk6IENvbXB1dGVkIHN0eWxlcyBmb3IgdGhlIHNwaW5uZXIgY29udGFpbmVyLlxuICogLSBgbG9hZGluZ1RleHRTdHlsZWAgKG9iamVjdCk6IENvbXB1dGVkIHN0eWxlcyBmb3IgdGhlIGxvYWRpbmcgdGV4dC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1sb2FkaW5nLW1vZGFsXG4gKiAgIFtpc1Zpc2libGVdPVwidHJ1ZVwiXG4gKiAgIFtiYWNrZ3JvdW5kQ29sb3JdPVwiJ3JnYmEoMCwgMCwgMCwgMC41KSdcIlxuICogICBbZGlzcGxheUNvbG9yXT1cIid3aGl0ZSdcIj5cbiAqIDwvYXBwLWxvYWRpbmctbW9kYWw+XG4gKiBgYGBcbiAqXG4gKiBAc3R5bGVzXG4gKiAtIGAuc3Bpbm5lcmA6IFN0eWxlcyBmb3IgdGhlIGxvYWRpbmcgc3Bpbm5lci5cbiAqIC0gYEBrZXlmcmFtZXMgc3BpbmA6IEtleWZyYW1lcyBmb3IgdGhlIHNwaW5uZXIgcm90YXRpb24gYW5pbWF0aW9uLlxuICogLSBgLm1vZGFsLWNvbnRlbnRgOiBTdHlsZXMgZm9yIHRoZSBtb2RhbCBjb250ZW50IGNvbnRhaW5lci5cbiAqIC0gYC5sb2FkaW5nLXRleHRgOiBTdHlsZXMgZm9yIHRoZSBsb2FkaW5nIHRleHQuXG4gKiovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1sb2FkaW5nLW1vZGFsJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiAqbmdJZj1cImlzVmlzaWJsZVwiIFtuZ1N0eWxlXT1cIm1vZGFsQ29udGFpbmVyU3R5bGVcIj5cbiAgICAgIDxkaXYgW25nU3R5bGVdPVwibW9kYWxDb250ZW50U3R5bGVcIiBjbGFzcz1cIm1vZGFsLWNvbnRlbnRcIj5cbiAgICAgICAgPGRpdiBjbGFzcz1cInNwaW5uZXJcIiBbbmdTdHlsZV09XCJzcGlubmVyQ29udGFpbmVyU3R5bGVcIj48L2Rpdj5cbiAgICAgICAgPGRpdiBbbmdTdHlsZV09XCJsb2FkaW5nVGV4dFN0eWxlXCIgY2xhc3M9XCJsb2FkaW5nLXRleHRcIj5Mb2FkaW5nLi4uPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgLnNwaW5uZXIge1xuICAgICAgICBib3JkZXI6IDEycHggc29saWQgI2YzZjNmMzsgLyogTGlnaHQgZ3JleSAqL1xuICAgICAgICBib3JkZXItdG9wOiAxMnB4IHNvbGlkIGJsYWNrOyAvKiBCbGFjayAqL1xuICAgICAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgICAgIHdpZHRoOiA1MHB4O1xuICAgICAgICBoZWlnaHQ6IDUwcHg7XG4gICAgICAgIGFuaW1hdGlvbjogc3BpbiAycyBsaW5lYXIgaW5maW5pdGU7XG4gICAgICB9XG4gICAgICBAa2V5ZnJhbWVzIHNwaW4ge1xuICAgICAgICAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMGRlZyk7XG4gICAgICAgIH1cbiAgICAgICAgMTAwJSB7XG4gICAgICAgICAgdHJhbnNmb3JtOiByb3RhdGUoMzYwZGVnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgLm1vZGFsLWNvbnRlbnQge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgfVxuICAgICAgLmxvYWRpbmctdGV4dCB7XG4gICAgICAgIG1hcmdpbi10b3A6IDEwcHg7XG4gICAgICB9XG4gICAgYCxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgTG9hZGluZ01vZGFsIHtcbiAgQElucHV0KCkgaXNWaXNpYmxlID0gZmFsc2U7XG4gIEBJbnB1dCgpIGJhY2tncm91bmRDb2xvcj86IHN0cmluZyA9ICdyZ2JhKDAsIDAsIDAsIDAuNSknO1xuICBASW5wdXQoKSBkaXNwbGF5Q29sb3I/OiBzdHJpbmcgPSAnd2hpdGUnO1xuXG4gIGdldCBtb2RhbENvbnRhaW5lclN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBwb3NpdGlvbjogJ2ZpeGVkJyxcbiAgICAgIHRvcDogJzAnLFxuICAgICAgbGVmdDogJzAnLFxuICAgICAgd2lkdGg6ICcxMDAlJyxcbiAgICAgIGhlaWdodDogJzEwMCUnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmJhY2tncm91bmRDb2xvcixcbiAgICAgIGRpc3BsYXk6ICdmbGV4JyxcbiAgICAgIGFsaWduSXRlbXM6ICdjZW50ZXInLFxuICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgekluZGV4OiAnOTk5JyxcbiAgICB9O1xuICB9XG5cbiAgZ2V0IG1vZGFsQ29udGVudFN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRoaXMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgYm9yZGVyUmFkaXVzOiAnMTBweCcsXG4gICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICBtYXhXaWR0aDogJzIwMHB4JyxcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgfTtcbiAgfVxuXG4gIGdldCBzcGlubmVyQ29udGFpbmVyU3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG1hcmdpbkJvdHRvbTogJzIwcHgnLFxuICAgIH07XG4gIH1cblxuICBnZXQgbG9hZGluZ1RleHRTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY29sb3I6IHRoaXMuZGlzcGxheUNvbG9yLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==