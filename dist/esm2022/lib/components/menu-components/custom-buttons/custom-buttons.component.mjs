import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
export class CustomButtons {
    /**
     * CustomButtons component renders a list of customizable buttons.
     *
     * @component
     * @param {CustomButtonsOptions} props - The properties for the CustomButtons component.
     * @param {Array} props.buttons - An array of button configurations.
     * @param {Object} props.buttons[].action - The function to be called when the button is clicked.
     * @param {boolean} props.buttons[].show - Determines if the button should be displayed.
     * @param {string} props.buttons[].backgroundColor - The background color of the button.
     * @param {boolean} props.buttons[].disabled - Determines if the button should be disabled.
     * @param {Object} [props.buttons[].icon] - The icon to be displayed on the button.
     * @param {Object} [props.buttons[].iconStyle] - The style to be applied to the icon.
     * @param {string} [props.buttons[].text] - The text to be displayed on the button.
     * @param {Object} [props.buttons[].textStyle] - The style to be applied to the text.
     * @param {React.ReactNode} [props.buttons[].customComponent] - A custom component to be rendered inside the button.
     * @param {Injector} [props.buttons[].injector] - The injector to be used for the custom component.
     * @returns {HTMLElement} The CustomButtons component.
     * @example
     * ```html
     * <app-custom-buttons [buttons]="buttons"></app-custom-buttons>
     * ```
     * @example
     * ```typescript
     * const buttons = [
     *  {
     *   action: () => console.log('Button 1 clicked'),
     *  show: true,
     * backgroundColor: 'blue',
     * disabled: false,
     * icon: faCoffee,
     * iconStyle: { color: 'white' },
     * text: 'Button 1',
     * textStyle: { color: 'white' },
     * customComponent: <CustomComponent />,
     * injector: Injector.create({ providers: [{ provide: 'customProp', useValue: 'customValue' }] }),
     * },
     * {
     *  action: () => console.log('Button 2 clicked'),
     * show: true,
     * backgroundColor: 'red',
     * disabled: false,
     * icon: faCoffee,
     * iconStyle: { color: 'white' },
     * text: 'Button 2',
     * textStyle: { color: 'white' },
     * customComponent: <CustomComponent />,
     * injector: Injector.create({ providers: [{ provide: 'customProp', useValue: 'customValue' }] }),
     * },
     * ];
     * ```
     */
    buttons;
    faSpinner = faSpinner;
    mergeStyles(defaultStyle, customStyle) {
        return { ...defaultStyle, ...customStyle };
    }
    get customButtonIcon() {
        return {
            fontSize: '20px',
            marginRight: '5px',
        };
    }
    // Type guard to check if customComponent is of type CustomComponentConfig
    isCustomComponentConfig(obj) {
        return obj && typeof obj === 'object' && 'component' in obj && 'injector' in obj;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CustomButtons, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: CustomButtons, isStandalone: true, selector: "app-custom-buttons", inputs: { buttons: "buttons" }, ngImport: i0, template: "<div class=\"customButtonsContainer\">\r\n  <button\r\n    *ngFor=\"let button of buttons; let i = index\"\r\n    (click)=\"button.action()\"\r\n    class=\"customButton\"\r\n    [ngStyle]=\"{\r\n      'background-color': button.show ? button.backgroundColor : 'transparent',\r\n      'display': button.show ? 'flex' : 'none'\r\n    }\"\r\n    [disabled]=\"button.disabled\"\r\n  >\r\n    <div class=\"buttonContent\">\r\n      <ng-container *ngIf=\"button.icon; else customOrSpinner\">\r\n        <fa-icon [icon]=\"button.icon\" [ngStyle]=\"mergeStyles(customButtonIcon, button.iconStyle)\"></fa-icon>\r\n        <span *ngIf=\"button.text\" class=\"customButtonText\" [ngStyle]=\"button.textStyle\">{{ button.text }}</span>\r\n      </ng-container>\r\n      <ng-template #customOrSpinner>\r\n        <ng-container *ngIf=\"isCustomComponentConfig(button.customComponent)\">\r\n          <ng-container *ngComponentOutlet=\"button.customComponent.component; injector: button.customComponent.injector\"></ng-container>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"button.customComponent && !isCustomComponentConfig(button.customComponent)\">\r\n          <div #customElementContainer></div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!button.customComponent\">\r\n          <fa-icon [icon]=\"faSpinner\"></fa-icon>\r\n        </ng-container>\r\n      </ng-template>\r\n    </div>\r\n  </button>\r\n</div>\r\n", styles: [".customButtonsContainer{display:flex;flex-direction:column;flex-wrap:wrap;justify-content:space-between;align-items:left}.customButton{width:100%;margin:10px 0;padding:10px;border-radius:5px;background-color:transparent;align-items:left;justify-content:left;border:none}.buttonContent{display:flex;align-items:left;justify-content:left}.customButtonIcon{font-size:20px;color:#000;margin-right:4px}.customButtonText{color:#000}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FormsModule }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: CustomButtons, decorators: [{
            type: Component,
            args: [{ selector: 'app-custom-buttons', standalone: true, imports: [CommonModule, FormsModule, FontAwesomeModule], template: "<div class=\"customButtonsContainer\">\r\n  <button\r\n    *ngFor=\"let button of buttons; let i = index\"\r\n    (click)=\"button.action()\"\r\n    class=\"customButton\"\r\n    [ngStyle]=\"{\r\n      'background-color': button.show ? button.backgroundColor : 'transparent',\r\n      'display': button.show ? 'flex' : 'none'\r\n    }\"\r\n    [disabled]=\"button.disabled\"\r\n  >\r\n    <div class=\"buttonContent\">\r\n      <ng-container *ngIf=\"button.icon; else customOrSpinner\">\r\n        <fa-icon [icon]=\"button.icon\" [ngStyle]=\"mergeStyles(customButtonIcon, button.iconStyle)\"></fa-icon>\r\n        <span *ngIf=\"button.text\" class=\"customButtonText\" [ngStyle]=\"button.textStyle\">{{ button.text }}</span>\r\n      </ng-container>\r\n      <ng-template #customOrSpinner>\r\n        <ng-container *ngIf=\"isCustomComponentConfig(button.customComponent)\">\r\n          <ng-container *ngComponentOutlet=\"button.customComponent.component; injector: button.customComponent.injector\"></ng-container>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"button.customComponent && !isCustomComponentConfig(button.customComponent)\">\r\n          <div #customElementContainer></div>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!button.customComponent\">\r\n          <fa-icon [icon]=\"faSpinner\"></fa-icon>\r\n        </ng-container>\r\n      </ng-template>\r\n    </div>\r\n  </button>\r\n</div>\r\n", styles: [".customButtonsContainer{display:flex;flex-direction:column;flex-wrap:wrap;justify-content:space-between;align-items:left}.customButton{width:100%;margin:10px 0;padding:10px;border-radius:5px;background-color:transparent;align-items:left;justify-content:left;border:none}.buttonContent{display:flex;align-items:left;justify-content:left}.customButtonIcon{font-size:20px;color:#000;margin-right:4px}.customButtonText{color:#000}\n"] }]
        }], propDecorators: { buttons: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWJ1dHRvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvbWVudS1jb21wb25lbnRzL2N1c3RvbS1idXR0b25zL2N1c3RvbS1idXR0b25zLmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21lbnUtY29tcG9uZW50cy9jdXN0b20tYnV0dG9ucy9jdXN0b20tYnV0dG9ucy5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBa0IsTUFBTSxlQUFlLENBQUM7QUFDakUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sbUNBQW1DLENBQUM7Ozs7QUFrQzlELE1BQU0sT0FBTyxhQUFhO0lBQ3hCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtERztJQUVNLE9BQU8sQ0FBa0I7SUFFbEMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUV0QixXQUFXLENBQUMsWUFBaUIsRUFBRSxXQUFnQjtRQUM3QyxPQUFPLEVBQUUsR0FBRyxZQUFZLEVBQUUsR0FBRyxXQUFXLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQsSUFBSSxnQkFBZ0I7UUFDbEIsT0FBTztZQUNMLFFBQVEsRUFBRSxNQUFNO1lBQ2hCLFdBQVcsRUFBRSxLQUFLO1NBQ25CLENBQUM7SUFDSixDQUFDO0lBRUQsMEVBQTBFO0lBQzFFLHVCQUF1QixDQUFDLEdBQVE7UUFDOUIsT0FBTyxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLFdBQVcsSUFBSSxHQUFHLElBQUksVUFBVSxJQUFJLEdBQUcsQ0FBQztJQUNuRixDQUFDO3VHQXZFVSxhQUFhOzJGQUFiLGFBQWEsOEdDdEMxQiwrNUNBOEJBLHFlRE1ZLFlBQVksNGxCQUFFLFdBQVcsOEJBQUUsaUJBQWlCOzsyRkFFM0MsYUFBYTtrQkFQekIsU0FBUzsrQkFDRSxvQkFBb0IsY0FHbEIsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQzs4QkF1RDlDLE9BQU87c0JBQWYsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdG9yLCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9ybXNNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IGZhU3Bpbm5lciB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQgeyBJY29uRGVmaW5pdGlvbiB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tQ29tcG9uZW50IHtcbiAgY29tcG9uZW50OiBUeXBlPGFueT47XG4gIGluamVjdG9yOiBJbmplY3Rvcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21CdXR0b24ge1xuICBhY3Rpb246ICgpID0+IHZvaWQ7XG4gIHNob3c6IGJvb2xlYW4gfCAoKCkgPT4gYm9vbGVhbik7XG4gIGJhY2tncm91bmRDb2xvcj86IHN0cmluZztcbiAgZGlzYWJsZWQ/OiBib29sZWFuO1xuICBpY29uPzogSWNvbkRlZmluaXRpb247XG4gIGljb25TdHlsZT86IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj47XG4gIHRleHQ/OiBzdHJpbmc7XG4gIHRleHRTdHlsZT86IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj47XG4gIGN1c3RvbUNvbXBvbmVudD86IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50IHwgKCgpID0+IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50KTtcbiAgaW5qZWN0b3I/OiBJbmplY3Rvcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21CdXR0b25zT3B0aW9ucyB7XG4gIGJ1dHRvbnM6IEN1c3RvbUJ1dHRvbltdO1xufVxuXG5leHBvcnQgdHlwZSBDdXN0b21CdXR0b25zVHlwZSA9IChvcHRpb25zOiBDdXN0b21CdXR0b25zT3B0aW9ucykgPT4gSFRNTEVsZW1lbnQ7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1jdXN0b20tYnV0dG9ucycsXG4gIHRlbXBsYXRlVXJsOiAnLi9jdXN0b20tYnV0dG9ucy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2N1c3RvbS1idXR0b25zLmNvbXBvbmVudC5jc3MnXSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9ybXNNb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgQ3VzdG9tQnV0dG9ucyB7XG4gIC8qKlxuICAgKiBDdXN0b21CdXR0b25zIGNvbXBvbmVudCByZW5kZXJzIGEgbGlzdCBvZiBjdXN0b21pemFibGUgYnV0dG9ucy5cbiAgICpcbiAgICogQGNvbXBvbmVudFxuICAgKiBAcGFyYW0ge0N1c3RvbUJ1dHRvbnNPcHRpb25zfSBwcm9wcyAtIFRoZSBwcm9wZXJ0aWVzIGZvciB0aGUgQ3VzdG9tQnV0dG9ucyBjb21wb25lbnQuXG4gICAqIEBwYXJhbSB7QXJyYXl9IHByb3BzLmJ1dHRvbnMgLSBBbiBhcnJheSBvZiBidXR0b24gY29uZmlndXJhdGlvbnMuXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBwcm9wcy5idXR0b25zW10uYWN0aW9uIC0gVGhlIGZ1bmN0aW9uIHRvIGJlIGNhbGxlZCB3aGVuIHRoZSBidXR0b24gaXMgY2xpY2tlZC5cbiAgICogQHBhcmFtIHtib29sZWFufSBwcm9wcy5idXR0b25zW10uc2hvdyAtIERldGVybWluZXMgaWYgdGhlIGJ1dHRvbiBzaG91bGQgYmUgZGlzcGxheWVkLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvcHMuYnV0dG9uc1tdLmJhY2tncm91bmRDb2xvciAtIFRoZSBiYWNrZ3JvdW5kIGNvbG9yIG9mIHRoZSBidXR0b24uXG4gICAqIEBwYXJhbSB7Ym9vbGVhbn0gcHJvcHMuYnV0dG9uc1tdLmRpc2FibGVkIC0gRGV0ZXJtaW5lcyBpZiB0aGUgYnV0dG9uIHNob3VsZCBiZSBkaXNhYmxlZC5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wcy5idXR0b25zW10uaWNvbl0gLSBUaGUgaWNvbiB0byBiZSBkaXNwbGF5ZWQgb24gdGhlIGJ1dHRvbi5cbiAgICogQHBhcmFtIHtPYmplY3R9IFtwcm9wcy5idXR0b25zW10uaWNvblN0eWxlXSAtIFRoZSBzdHlsZSB0byBiZSBhcHBsaWVkIHRvIHRoZSBpY29uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gW3Byb3BzLmJ1dHRvbnNbXS50ZXh0XSAtIFRoZSB0ZXh0IHRvIGJlIGRpc3BsYXllZCBvbiB0aGUgYnV0dG9uLlxuICAgKiBAcGFyYW0ge09iamVjdH0gW3Byb3BzLmJ1dHRvbnNbXS50ZXh0U3R5bGVdIC0gVGhlIHN0eWxlIHRvIGJlIGFwcGxpZWQgdG8gdGhlIHRleHQuXG4gICAqIEBwYXJhbSB7UmVhY3QuUmVhY3ROb2RlfSBbcHJvcHMuYnV0dG9uc1tdLmN1c3RvbUNvbXBvbmVudF0gLSBBIGN1c3RvbSBjb21wb25lbnQgdG8gYmUgcmVuZGVyZWQgaW5zaWRlIHRoZSBidXR0b24uXG4gICAqIEBwYXJhbSB7SW5qZWN0b3J9IFtwcm9wcy5idXR0b25zW10uaW5qZWN0b3JdIC0gVGhlIGluamVjdG9yIHRvIGJlIHVzZWQgZm9yIHRoZSBjdXN0b20gY29tcG9uZW50LlxuICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR9IFRoZSBDdXN0b21CdXR0b25zIGNvbXBvbmVudC5cbiAgICogQGV4YW1wbGVcbiAgICogYGBgaHRtbFxuICAgKiA8YXBwLWN1c3RvbS1idXR0b25zIFtidXR0b25zXT1cImJ1dHRvbnNcIj48L2FwcC1jdXN0b20tYnV0dG9ucz5cbiAgICogYGBgXG4gICAqIEBleGFtcGxlXG4gICAqIGBgYHR5cGVzY3JpcHRcbiAgICogY29uc3QgYnV0dG9ucyA9IFtcbiAgICogIHtcbiAgICogICBhY3Rpb246ICgpID0+IGNvbnNvbGUubG9nKCdCdXR0b24gMSBjbGlja2VkJyksXG4gICAqICBzaG93OiB0cnVlLFxuICAgKiBiYWNrZ3JvdW5kQ29sb3I6ICdibHVlJyxcbiAgICogZGlzYWJsZWQ6IGZhbHNlLFxuICAgKiBpY29uOiBmYUNvZmZlZSxcbiAgICogaWNvblN0eWxlOiB7IGNvbG9yOiAnd2hpdGUnIH0sXG4gICAqIHRleHQ6ICdCdXR0b24gMScsXG4gICAqIHRleHRTdHlsZTogeyBjb2xvcjogJ3doaXRlJyB9LFxuICAgKiBjdXN0b21Db21wb25lbnQ6IDxDdXN0b21Db21wb25lbnQgLz4sXG4gICAqIGluamVjdG9yOiBJbmplY3Rvci5jcmVhdGUoeyBwcm92aWRlcnM6IFt7IHByb3ZpZGU6ICdjdXN0b21Qcm9wJywgdXNlVmFsdWU6ICdjdXN0b21WYWx1ZScgfV0gfSksXG4gICAqIH0sXG4gICAqIHtcbiAgICogIGFjdGlvbjogKCkgPT4gY29uc29sZS5sb2coJ0J1dHRvbiAyIGNsaWNrZWQnKSxcbiAgICogc2hvdzogdHJ1ZSxcbiAgICogYmFja2dyb3VuZENvbG9yOiAncmVkJyxcbiAgICogZGlzYWJsZWQ6IGZhbHNlLFxuICAgKiBpY29uOiBmYUNvZmZlZSxcbiAgICogaWNvblN0eWxlOiB7IGNvbG9yOiAnd2hpdGUnIH0sXG4gICAqIHRleHQ6ICdCdXR0b24gMicsXG4gICAqIHRleHRTdHlsZTogeyBjb2xvcjogJ3doaXRlJyB9LFxuICAgKiBjdXN0b21Db21wb25lbnQ6IDxDdXN0b21Db21wb25lbnQgLz4sXG4gICAqIGluamVjdG9yOiBJbmplY3Rvci5jcmVhdGUoeyBwcm92aWRlcnM6IFt7IHByb3ZpZGU6ICdjdXN0b21Qcm9wJywgdXNlVmFsdWU6ICdjdXN0b21WYWx1ZScgfV0gfSksXG4gICAqIH0sXG4gICAqIF07XG4gICAqIGBgYFxuICAgKi9cblxuICBASW5wdXQoKSBidXR0b25zITogQ3VzdG9tQnV0dG9uW107XG5cbiAgZmFTcGlubmVyID0gZmFTcGlubmVyO1xuXG4gIG1lcmdlU3R5bGVzKGRlZmF1bHRTdHlsZTogYW55LCBjdXN0b21TdHlsZTogYW55KTogYW55IHtcbiAgICByZXR1cm4geyAuLi5kZWZhdWx0U3R5bGUsIC4uLmN1c3RvbVN0eWxlIH07XG4gIH1cblxuICBnZXQgY3VzdG9tQnV0dG9uSWNvbigpOiBhbnkge1xuICAgIHJldHVybiB7XG4gICAgICBmb250U2l6ZTogJzIwcHgnLFxuICAgICAgbWFyZ2luUmlnaHQ6ICc1cHgnLFxuICAgIH07XG4gIH1cblxuICAvLyBUeXBlIGd1YXJkIHRvIGNoZWNrIGlmIGN1c3RvbUNvbXBvbmVudCBpcyBvZiB0eXBlIEN1c3RvbUNvbXBvbmVudENvbmZpZ1xuICBpc0N1c3RvbUNvbXBvbmVudENvbmZpZyhvYmo6IGFueSk6IG9iaiBpcyBDdXN0b21Db21wb25lbnQge1xuICAgIHJldHVybiBvYmogJiYgdHlwZW9mIG9iaiA9PT0gJ29iamVjdCcgJiYgJ2NvbXBvbmVudCcgaW4gb2JqICYmICdpbmplY3RvcicgaW4gb2JqO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwiY3VzdG9tQnV0dG9uc0NvbnRhaW5lclwiPlxyXG4gIDxidXR0b25cclxuICAgICpuZ0Zvcj1cImxldCBidXR0b24gb2YgYnV0dG9uczsgbGV0IGkgPSBpbmRleFwiXHJcbiAgICAoY2xpY2spPVwiYnV0dG9uLmFjdGlvbigpXCJcclxuICAgIGNsYXNzPVwiY3VzdG9tQnV0dG9uXCJcclxuICAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBidXR0b24uc2hvdyA/IGJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3IgOiAndHJhbnNwYXJlbnQnLFxyXG4gICAgICAnZGlzcGxheSc6IGJ1dHRvbi5zaG93ID8gJ2ZsZXgnIDogJ25vbmUnXHJcbiAgICB9XCJcclxuICAgIFtkaXNhYmxlZF09XCJidXR0b24uZGlzYWJsZWRcIlxyXG4gID5cclxuICAgIDxkaXYgY2xhc3M9XCJidXR0b25Db250ZW50XCI+XHJcbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJidXR0b24uaWNvbjsgZWxzZSBjdXN0b21PclNwaW5uZXJcIj5cclxuICAgICAgICA8ZmEtaWNvbiBbaWNvbl09XCJidXR0b24uaWNvblwiIFtuZ1N0eWxlXT1cIm1lcmdlU3R5bGVzKGN1c3RvbUJ1dHRvbkljb24sIGJ1dHRvbi5pY29uU3R5bGUpXCI+PC9mYS1pY29uPlxyXG4gICAgICAgIDxzcGFuICpuZ0lmPVwiYnV0dG9uLnRleHRcIiBjbGFzcz1cImN1c3RvbUJ1dHRvblRleHRcIiBbbmdTdHlsZV09XCJidXR0b24udGV4dFN0eWxlXCI+e3sgYnV0dG9uLnRleHQgfX08L3NwYW4+XHJcbiAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8bmctdGVtcGxhdGUgI2N1c3RvbU9yU3Bpbm5lcj5cclxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNDdXN0b21Db21wb25lbnRDb25maWcoYnV0dG9uLmN1c3RvbUNvbXBvbmVudClcIj5cclxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nQ29tcG9uZW50T3V0bGV0PVwiYnV0dG9uLmN1c3RvbUNvbXBvbmVudC5jb21wb25lbnQ7IGluamVjdG9yOiBidXR0b24uY3VzdG9tQ29tcG9uZW50LmluamVjdG9yXCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImJ1dHRvbi5jdXN0b21Db21wb25lbnQgJiYgIWlzQ3VzdG9tQ29tcG9uZW50Q29uZmlnKGJ1dHRvbi5jdXN0b21Db21wb25lbnQpXCI+XHJcbiAgICAgICAgICA8ZGl2ICNjdXN0b21FbGVtZW50Q29udGFpbmVyPjwvZGl2PlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhYnV0dG9uLmN1c3RvbUNvbXBvbmVudFwiPlxyXG4gICAgICAgICAgPGZhLWljb24gW2ljb25dPVwiZmFTcGlubmVyXCI+PC9mYS1pY29uPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICA8L25nLXRlbXBsYXRlPlxyXG4gICAgPC9kaXY+XHJcbiAgPC9idXR0b24+XHJcbjwvZGl2PlxyXG4iXX0=