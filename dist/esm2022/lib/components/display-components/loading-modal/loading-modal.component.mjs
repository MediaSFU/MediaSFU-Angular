import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Component representing a loading modal.
 *
 * @selector app-loading-modal
 * @standalone true
 * @imports CommonModule
 *
 * @description
 * This component displays a loading modal with a spinner and a loading text.
 * It is designed to be displayed as an overlay with customizable background and text colors.
 *
 * @example
 * <app-loading-modal [isVisible]="true" [backgroundColor]="'rgba(0, 0, 0, 0.5)'" [displayColor]="'white'"></app-loading-modal>
 *
 * @styles
 * - .spinner: Styles for the loading spinner.
 * - @keyframes spin: Keyframes for the spinner animation.
 * - .modal-content: Styles for the modal content container.
 * - .loading-text: Styles for the loading text.
 *
 * @inputs
 * - `isVisible` (boolean): Determines if the modal is visible. Default is `false`.
 * - `backgroundColor` (string): Background color of the modal. Default is `'rgba(0, 0, 0, 0.5)'`.
 * - `displayColor` (string): Color of the loading text. Default is `'white'`.
 *
 * @properties
 * - `modalContainerStyle` (object): Computed styles for the modal container.
 * - `modalContentStyle` (object): Computed styles for the modal content.
 * - `spinnerContainerStyle` (object): Computed styles for the spinner container.
 * - `loadingTextStyle` (object): Computed styles for the loading text.
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZGluZy1tb2RhbC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvbG9hZGluZy1tb2RhbC9sb2FkaW5nLW1vZGFsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQVMvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBOEJHO0FBMENILE1BQU0sT0FBTyxZQUFZO0lBQ2QsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUNsQixlQUFlLEdBQVksb0JBQW9CLENBQUM7SUFDaEQsWUFBWSxHQUFZLE9BQU8sQ0FBQztJQUV6QyxJQUFJLG1CQUFtQjtRQUNyQixPQUFPO1lBQ0wsUUFBUSxFQUFFLE9BQU87WUFDakIsR0FBRyxFQUFFLEdBQUc7WUFDUixJQUFJLEVBQUUsR0FBRztZQUNULEtBQUssRUFBRSxNQUFNO1lBQ2IsTUFBTSxFQUFFLE1BQU07WUFDZCxlQUFlLEVBQUUsSUFBSSxDQUFDLGVBQWU7WUFDckMsT0FBTyxFQUFFLE1BQU07WUFDZixVQUFVLEVBQUUsUUFBUTtZQUNwQixjQUFjLEVBQUUsUUFBUTtZQUN4QixNQUFNLEVBQUUsS0FBSztTQUNkLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxpQkFBaUI7UUFDbkIsT0FBTztZQUNMLGVBQWUsRUFBRSxJQUFJLENBQUMsZUFBZTtZQUNyQyxZQUFZLEVBQUUsTUFBTTtZQUNwQixPQUFPLEVBQUUsTUFBTTtZQUNmLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxRQUFRO1NBQ3BCLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxxQkFBcUI7UUFDdkIsT0FBTztZQUNMLFlBQVksRUFBRSxNQUFNO1NBQ3JCLENBQUM7SUFDSixDQUFDO0lBRUQsSUFBSSxnQkFBZ0I7UUFDbEIsT0FBTztZQUNMLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWTtTQUN6QixDQUFDO0lBQ0osQ0FBQzt1R0F4Q1UsWUFBWTsyRkFBWixZQUFZLG1MQXJDYjs7Ozs7OztHQU9ULDRYQVJTLFlBQVk7OzJGQXNDWCxZQUFZO2tCQXpDeEIsU0FBUzsrQkFDRSxtQkFBbUIsY0FDakIsSUFBSSxXQUNQLENBQUMsWUFBWSxDQUFDLFlBQ2I7Ozs7Ozs7R0FPVDs4QkErQlEsU0FBUztzQkFBakIsS0FBSztnQkFDRyxlQUFlO3NCQUF2QixLQUFLO2dCQUNHLFlBQVk7c0JBQXBCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuZXhwb3J0IGludGVyZmFjZSBMb2FkaW5nTW9kYWxPcHRpb25zIHtcbiAgaXNWaXNpYmxlOiBib29sZWFuO1xuICBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmc7XG4gIGRpc3BsYXlDb2xvcj86IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgTG9hZGluZ01vZGFsVHlwZSA9IChvcHRpb25zOiBMb2FkaW5nTW9kYWxPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBDb21wb25lbnQgcmVwcmVzZW50aW5nIGEgbG9hZGluZyBtb2RhbC5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLWxvYWRpbmctbW9kYWxcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIENvbW1vbk1vZHVsZVxuICpcbiAqIEBkZXNjcmlwdGlvblxuICogVGhpcyBjb21wb25lbnQgZGlzcGxheXMgYSBsb2FkaW5nIG1vZGFsIHdpdGggYSBzcGlubmVyIGFuZCBhIGxvYWRpbmcgdGV4dC5cbiAqIEl0IGlzIGRlc2lnbmVkIHRvIGJlIGRpc3BsYXllZCBhcyBhbiBvdmVybGF5IHdpdGggY3VzdG9taXphYmxlIGJhY2tncm91bmQgYW5kIHRleHQgY29sb3JzLlxuICpcbiAqIEBleGFtcGxlXG4gKiA8YXBwLWxvYWRpbmctbW9kYWwgW2lzVmlzaWJsZV09XCJ0cnVlXCIgW2JhY2tncm91bmRDb2xvcl09XCIncmdiYSgwLCAwLCAwLCAwLjUpJ1wiIFtkaXNwbGF5Q29sb3JdPVwiJ3doaXRlJ1wiPjwvYXBwLWxvYWRpbmctbW9kYWw+XG4gKlxuICogQHN0eWxlc1xuICogLSAuc3Bpbm5lcjogU3R5bGVzIGZvciB0aGUgbG9hZGluZyBzcGlubmVyLlxuICogLSBAa2V5ZnJhbWVzIHNwaW46IEtleWZyYW1lcyBmb3IgdGhlIHNwaW5uZXIgYW5pbWF0aW9uLlxuICogLSAubW9kYWwtY29udGVudDogU3R5bGVzIGZvciB0aGUgbW9kYWwgY29udGVudCBjb250YWluZXIuXG4gKiAtIC5sb2FkaW5nLXRleHQ6IFN0eWxlcyBmb3IgdGhlIGxvYWRpbmcgdGV4dC5cbiAqXG4gKiBAaW5wdXRzXG4gKiAtIGBpc1Zpc2libGVgIChib29sZWFuKTogRGV0ZXJtaW5lcyBpZiB0aGUgbW9kYWwgaXMgdmlzaWJsZS4gRGVmYXVsdCBpcyBgZmFsc2VgLlxuICogLSBgYmFja2dyb3VuZENvbG9yYCAoc3RyaW5nKTogQmFja2dyb3VuZCBjb2xvciBvZiB0aGUgbW9kYWwuIERlZmF1bHQgaXMgYCdyZ2JhKDAsIDAsIDAsIDAuNSknYC5cbiAqIC0gYGRpc3BsYXlDb2xvcmAgKHN0cmluZyk6IENvbG9yIG9mIHRoZSBsb2FkaW5nIHRleHQuIERlZmF1bHQgaXMgYCd3aGl0ZSdgLlxuICpcbiAqIEBwcm9wZXJ0aWVzXG4gKiAtIGBtb2RhbENvbnRhaW5lclN0eWxlYCAob2JqZWN0KTogQ29tcHV0ZWQgc3R5bGVzIGZvciB0aGUgbW9kYWwgY29udGFpbmVyLlxuICogLSBgbW9kYWxDb250ZW50U3R5bGVgIChvYmplY3QpOiBDb21wdXRlZCBzdHlsZXMgZm9yIHRoZSBtb2RhbCBjb250ZW50LlxuICogLSBgc3Bpbm5lckNvbnRhaW5lclN0eWxlYCAob2JqZWN0KTogQ29tcHV0ZWQgc3R5bGVzIGZvciB0aGUgc3Bpbm5lciBjb250YWluZXIuXG4gKiAtIGBsb2FkaW5nVGV4dFN0eWxlYCAob2JqZWN0KTogQ29tcHV0ZWQgc3R5bGVzIGZvciB0aGUgbG9hZGluZyB0ZXh0LlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbG9hZGluZy1tb2RhbCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgKm5nSWY9XCJpc1Zpc2libGVcIiBbbmdTdHlsZV09XCJtb2RhbENvbnRhaW5lclN0eWxlXCI+XG4gICAgICA8ZGl2IFtuZ1N0eWxlXT1cIm1vZGFsQ29udGVudFN0eWxlXCIgY2xhc3M9XCJtb2RhbC1jb250ZW50XCI+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJzcGlubmVyXCIgW25nU3R5bGVdPVwic3Bpbm5lckNvbnRhaW5lclN0eWxlXCI+PC9kaXY+XG4gICAgICAgIDxkaXYgW25nU3R5bGVdPVwibG9hZGluZ1RleHRTdHlsZVwiIGNsYXNzPVwibG9hZGluZy10ZXh0XCI+TG9hZGluZy4uLjwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogW1xuICAgIGBcbiAgICAgIC5zcGlubmVyIHtcbiAgICAgICAgYm9yZGVyOiAxMnB4IHNvbGlkICNmM2YzZjM7IC8qIExpZ2h0IGdyZXkgKi9cbiAgICAgICAgYm9yZGVyLXRvcDogMTJweCBzb2xpZCBibGFjazsgLyogQmxhY2sgKi9cbiAgICAgICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgICAgICB3aWR0aDogNTBweDtcbiAgICAgICAgaGVpZ2h0OiA1MHB4O1xuICAgICAgICBhbmltYXRpb246IHNwaW4gMnMgbGluZWFyIGluZmluaXRlO1xuICAgICAgfVxuICAgICAgQGtleWZyYW1lcyBzcGluIHtcbiAgICAgICAgMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDBkZWcpO1xuICAgICAgICB9XG4gICAgICAgIDEwMCUge1xuICAgICAgICAgIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIC5tb2RhbC1jb250ZW50IHtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIH1cbiAgICAgIC5sb2FkaW5nLXRleHQge1xuICAgICAgICBtYXJnaW4tdG9wOiAxMHB4O1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIExvYWRpbmdNb2RhbCB7XG4gIEBJbnB1dCgpIGlzVmlzaWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBiYWNrZ3JvdW5kQ29sb3I/OiBzdHJpbmcgPSAncmdiYSgwLCAwLCAwLCAwLjUpJztcbiAgQElucHV0KCkgZGlzcGxheUNvbG9yPzogc3RyaW5nID0gJ3doaXRlJztcblxuICBnZXQgbW9kYWxDb250YWluZXJTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcG9zaXRpb246ICdmaXhlZCcsXG4gICAgICB0b3A6ICcwJyxcbiAgICAgIGxlZnQ6ICcwJyxcbiAgICAgIHdpZHRoOiAnMTAwJScsXG4gICAgICBoZWlnaHQ6ICcxMDAlJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogdGhpcy5iYWNrZ3JvdW5kQ29sb3IsXG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgIHpJbmRleDogJzk5OScsXG4gICAgfTtcbiAgfVxuXG4gIGdldCBtb2RhbENvbnRlbnRTdHlsZSgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiB0aGlzLmJhY2tncm91bmRDb2xvcixcbiAgICAgIGJvcmRlclJhZGl1czogJzEwcHgnLFxuICAgICAgcGFkZGluZzogJzEwcHgnLFxuICAgICAgbWF4V2lkdGg6ICcyMDBweCcsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgIH07XG4gIH1cblxuICBnZXQgc3Bpbm5lckNvbnRhaW5lclN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBtYXJnaW5Cb3R0b206ICcyMHB4JyxcbiAgICB9O1xuICB9XG5cbiAgZ2V0IGxvYWRpbmdUZXh0U3R5bGUoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbG9yOiB0aGlzLmRpc3BsYXlDb2xvcixcbiAgICB9O1xuICB9XG59XG4iXX0=