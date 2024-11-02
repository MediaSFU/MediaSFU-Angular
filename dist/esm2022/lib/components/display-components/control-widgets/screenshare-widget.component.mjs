import { Component, Input, Inject, Optional } from '@angular/core';
import { faDesktop, faBan } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
/**
 * ScreenShareWidget - Component representing a screen share button with an optional disabled state.
 *
 * This component displays a screen share icon (desktop icon) and an overlay ban icon if disabled.
 * The disabled state can be controlled either by an injected dependency or an @Input property.
 *
 * @component
 * @name ScreenShareWidget
 * @example
 * ```html
 * <app-screen-share-button [disabled]="isDisabled"></app-screen-share-button>
 * ```
 *
 * @param {boolean} disabled - Optional input to toggle the disabled state of the button.
 *
 * @property {boolean} computedDisabled - Internal state to determine if the button is disabled, controlled by either injected value or @Input property.
 * @property {faDesktop} faDesktop - FontAwesome desktop icon for screen sharing.
 * @property {faBan} faBan - FontAwesome ban icon indicating a disabled state.
 *
 * @example
 * <app-screen-share-button [disabled]="true"></app-screen-share-button>
 *
 * @constructor
 * @param {boolean} [injectedDisabled] - Optional injected disabled value.
 *
 * @method ngOnChanges - Updates the computedDisabled property based on changes to the @Input disabled.
 */
export class ScreenShareWidget {
    injectedDisabled;
    disabled = false; // Input to toggle disabled state
    faDesktop = faDesktop;
    faBan = faBan;
    computedDisabled;
    constructor(injectedDisabled) {
        this.injectedDisabled = injectedDisabled;
        // Use the injected value if provided, otherwise fall back to the @Input value
        this.computedDisabled = this.injectedDisabled != null ? this.injectedDisabled : this.disabled;
    }
    ngOnChanges() {
        // Update computedDisabled whenever the Input changes
        if (this.injectedDisabled == null) {
            this.computedDisabled = this.disabled;
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ScreenShareWidget, deps: [{ token: 'disabled', optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: ScreenShareWidget, isStandalone: true, selector: "app-screen-share-button", inputs: { disabled: "disabled" }, usesOnChanges: true, ngImport: i0, template: `
    <div style="position: relative; display: inline-block;">
      <!-- Desktop icon, change color based on disabled state -->
      <fa-icon [icon]="faDesktop" size="lg" [style.color]="computedDisabled ? 'black' : 'green'">
      </fa-icon>

      <!-- Red Ban icon on top if disabled -->
      <fa-icon
        *ngIf="computedDisabled"
        [icon]="faBan"
        size="lg"
        style="color: red; position: absolute; top: 0; right: 0;"
      >
      </fa-icon>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ScreenShareWidget, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-screen-share-button',
                    standalone: true,
                    imports: [CommonModule, FontAwesomeModule],
                    template: `
    <div style="position: relative; display: inline-block;">
      <!-- Desktop icon, change color based on disabled state -->
      <fa-icon [icon]="faDesktop" size="lg" [style.color]="computedDisabled ? 'black' : 'green'">
      </fa-icon>

      <!-- Red Ban icon on top if disabled -->
      <fa-icon
        *ngIf="computedDisabled"
        [icon]="faBan"
        size="lg"
        style="color: red; position: absolute; top: 0; right: 0;"
      >
      </fa-icon>
    </div>
  `,
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Optional
                }, {
                    type: Inject,
                    args: ['disabled']
                }] }], propDecorators: { disabled: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuc2hhcmUtd2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvc2NyZWVuc2hhcmUtd2lkZ2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25FLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDckUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7O0FBRXJFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQXdCSCxNQUFNLE9BQU8saUJBQWlCO0lBUXdCO0lBUDNDLFFBQVEsR0FBRyxLQUFLLENBQUMsQ0FBQyxpQ0FBaUM7SUFFNUQsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUN0QixLQUFLLEdBQUcsS0FBSyxDQUFDO0lBRWQsZ0JBQWdCLENBQVU7SUFFMUIsWUFBb0QsZ0JBQXlCO1FBQXpCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUztRQUMzRSw4RUFBOEU7UUFDOUUsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztJQUNoRyxDQUFDO0lBRUQsV0FBVztRQUNULHFEQUFxRDtRQUNyRCxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUUsQ0FBQztZQUNsQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztRQUN4QyxDQUFDO0lBQ0gsQ0FBQzt1R0FsQlUsaUJBQWlCLGtCQVFJLFVBQVU7MkZBUi9CLGlCQUFpQiwwSUFqQmxCOzs7Ozs7Ozs7Ozs7Ozs7R0FlVCwyREFoQlMsWUFBWSxrSUFBRSxpQkFBaUI7OzJGQWtCOUIsaUJBQWlCO2tCQXJCN0IsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUseUJBQXlCO29CQUNuQyxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDO29CQUMxQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7OztHQWVUO2lCQUNGOzswQkFTYyxRQUFROzswQkFBSSxNQUFNOzJCQUFDLFVBQVU7eUNBUGpDLFFBQVE7c0JBQWhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmYURlc2t0b3AsIGZhQmFuIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcblxuLyoqXG4gKiBTY3JlZW5TaGFyZVdpZGdldCAtIENvbXBvbmVudCByZXByZXNlbnRpbmcgYSBzY3JlZW4gc2hhcmUgYnV0dG9uIHdpdGggYW4gb3B0aW9uYWwgZGlzYWJsZWQgc3RhdGUuXG4gKlxuICogVGhpcyBjb21wb25lbnQgZGlzcGxheXMgYSBzY3JlZW4gc2hhcmUgaWNvbiAoZGVza3RvcCBpY29uKSBhbmQgYW4gb3ZlcmxheSBiYW4gaWNvbiBpZiBkaXNhYmxlZC5cbiAqIFRoZSBkaXNhYmxlZCBzdGF0ZSBjYW4gYmUgY29udHJvbGxlZCBlaXRoZXIgYnkgYW4gaW5qZWN0ZWQgZGVwZW5kZW5jeSBvciBhbiBASW5wdXQgcHJvcGVydHkuXG4gKlxuICogQGNvbXBvbmVudFxuICogQG5hbWUgU2NyZWVuU2hhcmVXaWRnZXRcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLXNjcmVlbi1zaGFyZS1idXR0b24gW2Rpc2FibGVkXT1cImlzRGlzYWJsZWRcIj48L2FwcC1zY3JlZW4tc2hhcmUtYnV0dG9uPlxuICogYGBgXG4gKlxuICogQHBhcmFtIHtib29sZWFufSBkaXNhYmxlZCAtIE9wdGlvbmFsIGlucHV0IHRvIHRvZ2dsZSB0aGUgZGlzYWJsZWQgc3RhdGUgb2YgdGhlIGJ1dHRvbi5cbiAqXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IGNvbXB1dGVkRGlzYWJsZWQgLSBJbnRlcm5hbCBzdGF0ZSB0byBkZXRlcm1pbmUgaWYgdGhlIGJ1dHRvbiBpcyBkaXNhYmxlZCwgY29udHJvbGxlZCBieSBlaXRoZXIgaW5qZWN0ZWQgdmFsdWUgb3IgQElucHV0IHByb3BlcnR5LlxuICogQHByb3BlcnR5IHtmYURlc2t0b3B9IGZhRGVza3RvcCAtIEZvbnRBd2Vzb21lIGRlc2t0b3AgaWNvbiBmb3Igc2NyZWVuIHNoYXJpbmcuXG4gKiBAcHJvcGVydHkge2ZhQmFufSBmYUJhbiAtIEZvbnRBd2Vzb21lIGJhbiBpY29uIGluZGljYXRpbmcgYSBkaXNhYmxlZCBzdGF0ZS5cbiAqXG4gKiBAZXhhbXBsZVxuICogPGFwcC1zY3JlZW4tc2hhcmUtYnV0dG9uIFtkaXNhYmxlZF09XCJ0cnVlXCI+PC9hcHAtc2NyZWVuLXNoYXJlLWJ1dHRvbj5cbiAqXG4gKiBAY29uc3RydWN0b3JcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luamVjdGVkRGlzYWJsZWRdIC0gT3B0aW9uYWwgaW5qZWN0ZWQgZGlzYWJsZWQgdmFsdWUuXG4gKlxuICogQG1ldGhvZCBuZ09uQ2hhbmdlcyAtIFVwZGF0ZXMgdGhlIGNvbXB1dGVkRGlzYWJsZWQgcHJvcGVydHkgYmFzZWQgb24gY2hhbmdlcyB0byB0aGUgQElucHV0IGRpc2FibGVkLlxuICovXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXNjcmVlbi1zaGFyZS1idXR0b24nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgZGlzcGxheTogaW5saW5lLWJsb2NrO1wiPlxuICAgICAgPCEtLSBEZXNrdG9wIGljb24sIGNoYW5nZSBjb2xvciBiYXNlZCBvbiBkaXNhYmxlZCBzdGF0ZSAtLT5cbiAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhRGVza3RvcFwiIHNpemU9XCJsZ1wiIFtzdHlsZS5jb2xvcl09XCJjb21wdXRlZERpc2FibGVkID8gJ2JsYWNrJyA6ICdncmVlbidcIj5cbiAgICAgIDwvZmEtaWNvbj5cblxuICAgICAgPCEtLSBSZWQgQmFuIGljb24gb24gdG9wIGlmIGRpc2FibGVkIC0tPlxuICAgICAgPGZhLWljb25cbiAgICAgICAgKm5nSWY9XCJjb21wdXRlZERpc2FibGVkXCJcbiAgICAgICAgW2ljb25dPVwiZmFCYW5cIlxuICAgICAgICBzaXplPVwibGdcIlxuICAgICAgICBzdHlsZT1cImNvbG9yOiByZWQ7IHBvc2l0aW9uOiBhYnNvbHV0ZTsgdG9wOiAwOyByaWdodDogMDtcIlxuICAgICAgPlxuICAgICAgPC9mYS1pY29uPlxuICAgIDwvZGl2PlxuICBgLFxufSlcbmV4cG9ydCBjbGFzcyBTY3JlZW5TaGFyZVdpZGdldCB7XG4gIEBJbnB1dCgpIGRpc2FibGVkID0gZmFsc2U7IC8vIElucHV0IHRvIHRvZ2dsZSBkaXNhYmxlZCBzdGF0ZVxuXG4gIGZhRGVza3RvcCA9IGZhRGVza3RvcDtcbiAgZmFCYW4gPSBmYUJhbjtcblxuICBjb21wdXRlZERpc2FibGVkOiBib29sZWFuO1xuXG4gIGNvbnN0cnVjdG9yKEBPcHRpb25hbCgpIEBJbmplY3QoJ2Rpc2FibGVkJykgcHJpdmF0ZSBpbmplY3RlZERpc2FibGVkOiBib29sZWFuKSB7XG4gICAgLy8gVXNlIHRoZSBpbmplY3RlZCB2YWx1ZSBpZiBwcm92aWRlZCwgb3RoZXJ3aXNlIGZhbGwgYmFjayB0byB0aGUgQElucHV0IHZhbHVlXG4gICAgdGhpcy5jb21wdXRlZERpc2FibGVkID0gdGhpcy5pbmplY3RlZERpc2FibGVkICE9IG51bGwgPyB0aGlzLmluamVjdGVkRGlzYWJsZWQgOiB0aGlzLmRpc2FibGVkO1xuICB9XG5cbiAgbmdPbkNoYW5nZXMoKSB7XG4gICAgLy8gVXBkYXRlIGNvbXB1dGVkRGlzYWJsZWQgd2hlbmV2ZXIgdGhlIElucHV0IGNoYW5nZXNcbiAgICBpZiAodGhpcy5pbmplY3RlZERpc2FibGVkID09IG51bGwpIHtcbiAgICAgIHRoaXMuY29tcHV0ZWREaXNhYmxlZCA9IHRoaXMuZGlzYWJsZWQ7XG4gICAgfVxuICB9XG59XG4iXX0=