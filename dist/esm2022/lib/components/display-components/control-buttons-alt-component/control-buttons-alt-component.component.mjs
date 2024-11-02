import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
/**
 * ControlButtonsAltComponent provides configurable button controls with custom icons, colors, and positioning options.
 *
 * @selector app-control-buttons-alt-component
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 *
 * @inputs
 * - `buttons` (AltButton[]): Array of button configurations with options for icon, color, state, and actions.
 * - `position` ('left' | 'right' | 'middle'): Horizontal alignment of buttons. Default is 'left'.
 * - `location` ('top' | 'bottom' | 'center'): Vertical alignment of buttons. Default is 'top'.
 * - `direction` ('horizontal' | 'vertical'): Layout direction for buttons. Default is 'horizontal'.
 * - `buttonsContainerStyle` (Partial<CSSStyleDeclaration>): Custom styles for the container of buttons.
 * - `showAspect` (boolean): Controls the visibility of the button container. Default is false.
 *
 * @methods
 * - `getAlignmentStyle()`: Returns alignment styles based on `position`, `location`, and `direction`.
 * - `getContainerStyle()`: Combines container styles, alignment styles, and visibility settings.
 * - `getButtonStyle(button: AltButton)`: Applies style to each button based on its properties.
 * - `getTextStyle(button: AltButton)`: Sets text styles for button labels.
 * - `isCustomComponent(comp)`: Type guard to identify custom component objects.
 * - `isFunctionComponent(comp)`: Type guard to identify function components.
 *
 * @example
 * ```html
 * <app-control-buttons-alt-component
 *  [buttons]="[
 *    { name: 'Pause', icon: faPause, onPress: pauseAction, activeColor: 'blue' },
 *    { name: 'Play', icon: faPlay, onPress: playAction, color: 'green' }
 *  ]"
 * [position]="'middle'"
 * [location]="'bottom'"
 * [direction]="'vertical'"
 * [buttonsContainerStyle]="{ backgroundColor: '#333' }"
 * [showAspect]="true">
 * </app-control-buttons-alt-component>
 * ```
 **/
export class ControlButtonsAltComponent {
    buttons = [];
    position = 'left';
    location = 'top';
    direction = 'horizontal';
    buttonsContainerStyle = {};
    showAspect = false;
    getAlignmentStyle() {
        let alignmentStyle = {};
        if (this.position === 'left' || this.position === 'right' || this.position === 'middle') {
            alignmentStyle.justifyContent =
                this.position === 'left' ? 'flex-start' : this.position === 'right' ? 'flex-end' : 'center';
        }
        if (this.location === 'top' || this.location === 'bottom' || this.location === 'center') {
            alignmentStyle.alignItems =
                this.location === 'top' ? 'flex-start' : this.location === 'bottom' ? 'flex-end' : 'center';
        }
        alignmentStyle.flexDirection = this.direction === 'vertical' ? 'column' : 'row';
        return alignmentStyle;
    }
    getContainerStyle() {
        return {
            ...this.styles.container,
            ...this.getAlignmentStyle(),
            ...this.buttonsContainerStyle,
            display: this.showAspect ? 'flex' : 'none',
        };
    }
    getButtonStyle(button) {
        return {
            ...this.styles.buttonContainer,
            backgroundColor: button.backgroundColor?.default || 'transparent',
            ...(this.direction === 'vertical' ? this.styles.verticalButton : {}),
        };
    }
    getTextStyle(button) {
        return {
            ...this.styles.buttonText,
            color: button.color || '#ffffff',
        };
    }
    isCustomComponent(comp) {
        return (comp &&
            typeof comp === 'object' &&
            'component' in comp &&
            typeof comp.component === 'function' &&
            'injector' in comp);
    }
    isFunctionComponent(comp) {
        return typeof comp === 'function';
    }
    styles = {
        container: {
            marginTop: '5px',
            marginBottom: '5px',
            zIndex: 9,
        },
        buttonContainer: {
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            borderRadius: '5px',
            marginLeft: '5px',
            marginRight: '5px',
            cursor: 'pointer',
        },
        verticalButton: {
            flexDirection: 'column',
        },
        buttonText: {
            fontSize: '12px',
            marginTop: '5px',
        },
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ControlButtonsAltComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: ControlButtonsAltComponent, isStandalone: true, selector: "app-control-buttons-alt-component", inputs: { buttons: "buttons", position: "position", location: "location", direction: "direction", buttonsContainerStyle: "buttonsContainerStyle", showAspect: "showAspect" }, ngImport: i0, template: "<div [ngStyle]=\"getContainerStyle()\">\r\n  <div\r\n    *ngFor=\"let button of buttons; let i = index\"\r\n    [ngStyle]=\"getButtonStyle(button)\"\r\n    (click)=\"button.onPress && button.onPress()\"\r\n  >\r\n    <ng-container *ngIf=\"button.icon\">\r\n      <fa-icon\r\n        *ngIf=\"button.active\"\r\n        [icon]=\"button.alternateIcon || button.icon\"\r\n        [style.color]=\"button.inActiveColor || 'transparent'\"\r\n      ></fa-icon>\r\n      <fa-icon\r\n        *ngIf=\"!button.active\"\r\n        [icon]=\"button.icon\"\r\n        [style.color]=\"button.inActiveColor || 'transparent'\"\r\n      ></fa-icon>\r\n    </ng-container>\r\n    <ng-container *ngIf=\"!button.icon\">\r\n      <ng-container *ngIf=\"button.customComponent\">\r\n        <ng-container *ngIf=\"isCustomComponent(button.customComponent)\">\r\n          <ng-container\r\n            *ngComponentOutlet=\"\r\n              button.customComponent.component;\r\n              injector: button.customComponent.injector\r\n            \"\r\n          ></ng-container>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!isCustomComponent(button.customComponent) && !isFunctionComponent(button.customComponent)\">\r\n          <!-- Handle the HTMLElement case, e.g., render it using [innerHTML] -->\r\n          <div [innerHTML]=\"button.customComponent.outerHTML\"></div>\r\n        </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n    <span *ngIf=\"button.name\" [ngStyle]=\"getTextStyle(button)\">{{\r\n      button.name\r\n    }}</span>\r\n  </div>\r\n</div>\r\n", styles: [".container{margin-top:5px;margin-bottom:5px;z-index:9}.buttonContainer{display:flex;align-items:center;padding:10px;border-radius:5px;margin-left:5px;margin-right:5px;cursor:pointer}.verticalButton{flex-direction:column}.buttonText{font-size:12px;margin-top:5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ControlButtonsAltComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-control-buttons-alt-component', standalone: true, imports: [CommonModule, FontAwesomeModule], template: "<div [ngStyle]=\"getContainerStyle()\">\r\n  <div\r\n    *ngFor=\"let button of buttons; let i = index\"\r\n    [ngStyle]=\"getButtonStyle(button)\"\r\n    (click)=\"button.onPress && button.onPress()\"\r\n  >\r\n    <ng-container *ngIf=\"button.icon\">\r\n      <fa-icon\r\n        *ngIf=\"button.active\"\r\n        [icon]=\"button.alternateIcon || button.icon\"\r\n        [style.color]=\"button.inActiveColor || 'transparent'\"\r\n      ></fa-icon>\r\n      <fa-icon\r\n        *ngIf=\"!button.active\"\r\n        [icon]=\"button.icon\"\r\n        [style.color]=\"button.inActiveColor || 'transparent'\"\r\n      ></fa-icon>\r\n    </ng-container>\r\n    <ng-container *ngIf=\"!button.icon\">\r\n      <ng-container *ngIf=\"button.customComponent\">\r\n        <ng-container *ngIf=\"isCustomComponent(button.customComponent)\">\r\n          <ng-container\r\n            *ngComponentOutlet=\"\r\n              button.customComponent.component;\r\n              injector: button.customComponent.injector\r\n            \"\r\n          ></ng-container>\r\n        </ng-container>\r\n        <ng-container *ngIf=\"!isCustomComponent(button.customComponent) && !isFunctionComponent(button.customComponent)\">\r\n          <!-- Handle the HTMLElement case, e.g., render it using [innerHTML] -->\r\n          <div [innerHTML]=\"button.customComponent.outerHTML\"></div>\r\n        </ng-container>\r\n      </ng-container>\r\n    </ng-container>\r\n    <span *ngIf=\"button.name\" [ngStyle]=\"getTextStyle(button)\">{{\r\n      button.name\r\n    }}</span>\r\n  </div>\r\n</div>\r\n", styles: [".container{margin-top:5px;margin-bottom:5px;z-index:9}.buttonContainer{display:flex;align-items:center;padding:10px;border-radius:5px;margin-left:5px;margin-right:5px;cursor:pointer}.verticalButton{flex-direction:column}.buttonText{font-size:12px;margin-top:5px}\n"] }]
        }], propDecorators: { buttons: [{
                type: Input
            }], position: [{
                type: Input
            }], location: [{
                type: Input
            }], direction: [{
                type: Input
            }], buttonsContainerStyle: [{
                type: Input
            }], showAspect: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1idXR0b25zLWFsdC1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtYnV0dG9ucy1hbHQtY29tcG9uZW50L2NvbnRyb2wtYnV0dG9ucy1hbHQtY29tcG9uZW50LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLWJ1dHRvbnMtYWx0LWNvbXBvbmVudC9jb250cm9sLWJ1dHRvbnMtYWx0LWNvbXBvbmVudC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFZLEtBQUssRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7QUF5Q3JFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0lBcUNJO0FBVUosTUFBTSxPQUFPLDBCQUEwQjtJQUM1QixPQUFPLEdBQWdCLEVBQUUsQ0FBQztJQUMxQixRQUFRLEdBQWdDLE1BQU0sQ0FBQztJQUMvQyxRQUFRLEdBQWdDLEtBQUssQ0FBQztJQUM5QyxTQUFTLEdBQThCLFlBQVksQ0FBQztJQUNwRCxxQkFBcUIsR0FBUSxFQUFFLENBQUM7SUFDaEMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUU1QixpQkFBaUI7UUFDZixJQUFJLGNBQWMsR0FBUSxFQUFFLENBQUM7UUFFN0IsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sSUFBSSxJQUFJ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QVMsRUFBRSxLQUFLO1NBQ2pCO0tBQ0YsQ0FBQzt1R0ExRlMsMEJBQTBCOzJGQUExQiwwQkFBMEIsMlFDMUZ2Qyw0aURBdUNBLGlVRCtDWSxZQUFZLDRsQkFBRSxpQkFBaUI7OzJGQUk5QiwwQkFBMEI7a0JBUHRDLFNBQVM7K0JBQ0UsbUNBQW1DLGNBQ2pDLElBQUksV0FDUCxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQzs4QkFLakMsT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3RvciwgSW5wdXQsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBDdXN0b21Db21wb25lbnQge1xuICBjb21wb25lbnQ6IFR5cGU8YW55PjtcbiAgaW5qZWN0b3I6IEluamVjdG9yO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEFsdEJ1dHRvbiB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGljb24/OiBJY29uRGVmaW5pdGlvbjtcbiAgYWx0ZXJuYXRlSWNvbj86IEljb25EZWZpbml0aW9uO1xuICBvblByZXNzPzogKCkgPT4gdm9pZDtcbiAgYWN0aXZlPzogYm9vbGVhbiB8ICgoKSA9PiBib29sZWFuKTtcbiAgYWN0aXZlQ29sb3I/OiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKTtcbiAgaW5BY3RpdmVDb2xvcj86IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpO1xuICBjb2xvcj86IHN0cmluZztcbiAgYmFja2dyb3VuZENvbG9yPzoge1xuICAgIGRlZmF1bHQ/OiBzdHJpbmc7XG4gIH07XG4gIGN1c3RvbUNvbXBvbmVudD86IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50IHwgKCgpID0+IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50KTtcbiAgaWNvbkNvbXBvbmVudD86IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50IHwgKCgpID0+IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50KTtcbiAgYWx0ZXJuYXRlSWNvbkNvbXBvbmVudD86IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50IHwgKCgpID0+IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50KTtcbiAgc2hvdz86IGJvb2xlYW4gfCAoKCkgPT4gYm9vbGVhbik7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udHJvbEJ1dHRvbnNBbHRDb21wb25lbnRPcHRpb25zIHtcbiAgYnV0dG9uczogQWx0QnV0dG9uW107XG4gIHBvc2l0aW9uPzogJ2xlZnQnIHwgJ3JpZ2h0JyB8ICdtaWRkbGUnO1xuICBsb2NhdGlvbj86ICd0b3AnIHwgJ2JvdHRvbScgfCAnY2VudGVyJztcbiAgZGlyZWN0aW9uPzogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJztcbiAgYnV0dG9uc0NvbnRhaW5lclN0eWxlPzogUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPjtcbiAgYWx0ZXJuYXRlSWNvbkNvbXBvbmVudD86IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50O1xuICBpY29uQ29tcG9uZW50PzogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQ7XG4gIHNob3dBc3BlY3Q/OiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBDb250cm9sQnV0dG9uc0FsdENvbXBvbmVudFR5cGUgPSAoXG4gIG9wdGlvbnM6IENvbnRyb2xCdXR0b25zQWx0Q29tcG9uZW50T3B0aW9ucyxcbikgPT4gSFRNTEVsZW1lbnQ7XG5cbi8qKlxuICogQ29udHJvbEJ1dHRvbnNBbHRDb21wb25lbnQgcHJvdmlkZXMgY29uZmlndXJhYmxlIGJ1dHRvbiBjb250cm9scyB3aXRoIGN1c3RvbSBpY29ucywgY29sb3JzLCBhbmQgcG9zaXRpb25pbmcgb3B0aW9ucy5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLWNvbnRyb2wtYnV0dG9ucy1hbHQtY29tcG9uZW50XG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXG4gKlxuICogQGlucHV0c1xuICogLSBgYnV0dG9uc2AgKEFsdEJ1dHRvbltdKTogQXJyYXkgb2YgYnV0dG9uIGNvbmZpZ3VyYXRpb25zIHdpdGggb3B0aW9ucyBmb3IgaWNvbiwgY29sb3IsIHN0YXRlLCBhbmQgYWN0aW9ucy5cbiAqIC0gYHBvc2l0aW9uYCAoJ2xlZnQnIHwgJ3JpZ2h0JyB8ICdtaWRkbGUnKTogSG9yaXpvbnRhbCBhbGlnbm1lbnQgb2YgYnV0dG9ucy4gRGVmYXVsdCBpcyAnbGVmdCcuXG4gKiAtIGBsb2NhdGlvbmAgKCd0b3AnIHwgJ2JvdHRvbScgfCAnY2VudGVyJyk6IFZlcnRpY2FsIGFsaWdubWVudCBvZiBidXR0b25zLiBEZWZhdWx0IGlzICd0b3AnLlxuICogLSBgZGlyZWN0aW9uYCAoJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyk6IExheW91dCBkaXJlY3Rpb24gZm9yIGJ1dHRvbnMuIERlZmF1bHQgaXMgJ2hvcml6b250YWwnLlxuICogLSBgYnV0dG9uc0NvbnRhaW5lclN0eWxlYCAoUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPik6IEN1c3RvbSBzdHlsZXMgZm9yIHRoZSBjb250YWluZXIgb2YgYnV0dG9ucy5cbiAqIC0gYHNob3dBc3BlY3RgIChib29sZWFuKTogQ29udHJvbHMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGJ1dHRvbiBjb250YWluZXIuIERlZmF1bHQgaXMgZmFsc2UuXG4gKlxuICogQG1ldGhvZHNcbiAqIC0gYGdldEFsaWdubWVudFN0eWxlKClgOiBSZXR1cm5zIGFsaWdubWVudCBzdHlsZXMgYmFzZWQgb24gYHBvc2l0aW9uYCwgYGxvY2F0aW9uYCwgYW5kIGBkaXJlY3Rpb25gLlxuICogLSBgZ2V0Q29udGFpbmVyU3R5bGUoKWA6IENvbWJpbmVzIGNvbnRhaW5lciBzdHlsZXMsIGFsaWdubWVudCBzdHlsZXMsIGFuZCB2aXNpYmlsaXR5IHNldHRpbmdzLlxuICogLSBgZ2V0QnV0dG9uU3R5bGUoYnV0dG9uOiBBbHRCdXR0b24pYDogQXBwbGllcyBzdHlsZSB0byBlYWNoIGJ1dHRvbiBiYXNlZCBvbiBpdHMgcHJvcGVydGllcy5cbiAqIC0gYGdldFRleHRTdHlsZShidXR0b246IEFsdEJ1dHRvbilgOiBTZXRzIHRleHQgc3R5bGVzIGZvciBidXR0b24gbGFiZWxzLlxuICogLSBgaXNDdXN0b21Db21wb25lbnQoY29tcClgOiBUeXBlIGd1YXJkIHRvIGlkZW50aWZ5IGN1c3RvbSBjb21wb25lbnQgb2JqZWN0cy5cbiAqIC0gYGlzRnVuY3Rpb25Db21wb25lbnQoY29tcClgOiBUeXBlIGd1YXJkIHRvIGlkZW50aWZ5IGZ1bmN0aW9uIGNvbXBvbmVudHMuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtY29udHJvbC1idXR0b25zLWFsdC1jb21wb25lbnRcbiAqICBbYnV0dG9uc109XCJbXG4gKiAgICB7IG5hbWU6ICdQYXVzZScsIGljb246IGZhUGF1c2UsIG9uUHJlc3M6IHBhdXNlQWN0aW9uLCBhY3RpdmVDb2xvcjogJ2JsdWUnIH0sXG4gKiAgICB7IG5hbWU6ICdQbGF5JywgaWNvbjogZmFQbGF5LCBvblByZXNzOiBwbGF5QWN0aW9uLCBjb2xvcjogJ2dyZWVuJyB9XG4gKiAgXVwiXG4gKiBbcG9zaXRpb25dPVwiJ21pZGRsZSdcIlxuICogW2xvY2F0aW9uXT1cIidib3R0b20nXCJcbiAqIFtkaXJlY3Rpb25dPVwiJ3ZlcnRpY2FsJ1wiXG4gKiBbYnV0dG9uc0NvbnRhaW5lclN0eWxlXT1cInsgYmFja2dyb3VuZENvbG9yOiAnIzMzMycgfVwiXG4gKiBbc2hvd0FzcGVjdF09XCJ0cnVlXCI+XG4gKiA8L2FwcC1jb250cm9sLWJ1dHRvbnMtYWx0LWNvbXBvbmVudD5cbiAqIGBgYFxuICoqL1xuXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1jb250cm9sLWJ1dHRvbnMtYWx0LWNvbXBvbmVudCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL2NvbnRyb2wtYnV0dG9ucy1hbHQtY29tcG9uZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vY29udHJvbC1idXR0b25zLWFsdC1jb21wb25lbnQuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBDb250cm9sQnV0dG9uc0FsdENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIGJ1dHRvbnM6IEFsdEJ1dHRvbltdID0gW107XG4gIEBJbnB1dCgpIHBvc2l0aW9uOiAnbGVmdCcgfCAncmlnaHQnIHwgJ21pZGRsZScgPSAnbGVmdCc7XG4gIEBJbnB1dCgpIGxvY2F0aW9uOiAndG9wJyB8ICdib3R0b20nIHwgJ2NlbnRlcicgPSAndG9wJztcbiAgQElucHV0KCkgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuICBASW5wdXQoKSBidXR0b25zQ29udGFpbmVyU3R5bGU6IGFueSA9IHt9O1xuICBASW5wdXQoKSBzaG93QXNwZWN0ID0gZmFsc2U7XG5cbiAgZ2V0QWxpZ25tZW50U3R5bGUoKSB7XG4gICAgbGV0IGFsaWdubWVudFN0eWxlOiBhbnkgPSB7fTtcblxuICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSAnbGVmdCcgfHwgdGhpcy5wb3NpdGlvbiA9PT0gJ3JpZ2h0JyB8fCB0aGlzLnBvc2l0aW9uID09PSAnbWlkZGxlJykge1xuICAgICAgYWxpZ25tZW50U3R5bGUuanVzdGlmeUNvbnRlbnQgPVxuICAgICAgICB0aGlzLnBvc2l0aW9uID09PSAnbGVmdCcgPyAnZmxleC1zdGFydCcgOiB0aGlzLnBvc2l0aW9uID09PSAncmlnaHQnID8gJ2ZsZXgtZW5kJyA6ICdjZW50ZXInO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxvY2F0aW9uID09PSAndG9wJyB8fCB0aGlzLmxvY2F0aW9uID09PSAnYm90dG9tJyB8fCB0aGlzLmxvY2F0aW9uID09PSAnY2VudGVyJykge1xuICAgICAgYWxpZ25tZW50U3R5bGUuYWxpZ25JdGVtcyA9XG4gICAgICAgIHRoaXMubG9jYXRpb24gPT09ICd0b3AnID8gJ2ZsZXgtc3RhcnQnIDogdGhpcy5sb2NhdGlvbiA9PT0gJ2JvdHRvbScgPyAnZmxleC1lbmQnIDogJ2NlbnRlcic7XG4gICAgfVxuXG4gICAgYWxpZ25tZW50U3R5bGUuZmxleERpcmVjdGlvbiA9IHRoaXMuZGlyZWN0aW9uID09PSAndmVydGljYWwnID8gJ2NvbHVtbicgOiAncm93JztcblxuICAgIHJldHVybiBhbGlnbm1lbnRTdHlsZTtcbiAgfVxuXG4gIGdldENvbnRhaW5lclN0eWxlKCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi50aGlzLnN0eWxlcy5jb250YWluZXIsXG4gICAgICAuLi50aGlzLmdldEFsaWdubWVudFN0eWxlKCksXG4gICAgICAuLi50aGlzLmJ1dHRvbnNDb250YWluZXJTdHlsZSxcbiAgICAgIGRpc3BsYXk6IHRoaXMuc2hvd0FzcGVjdCA/ICdmbGV4JyA6ICdub25lJyxcbiAgICB9O1xuICB9XG5cbiAgZ2V0QnV0dG9uU3R5bGUoYnV0dG9uOiBBbHRCdXR0b24pIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4udGhpcy5zdHlsZXMuYnV0dG9uQ29udGFpbmVyLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiBidXR0b24uYmFja2dyb3VuZENvbG9yPy5kZWZhdWx0IHx8ICd0cmFuc3BhcmVudCcsXG4gICAgICAuLi4odGhpcy5kaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcgPyB0aGlzLnN0eWxlcy52ZXJ0aWNhbEJ1dHRvbiA6IHt9KSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0VGV4dFN0eWxlKGJ1dHRvbjogQWx0QnV0dG9uKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnRoaXMuc3R5bGVzLmJ1dHRvblRleHQsXG4gICAgICBjb2xvcjogYnV0dG9uLmNvbG9yIHx8ICcjZmZmZmZmJyxcbiAgICB9O1xuICB9XG5cbiAgaXNDdXN0b21Db21wb25lbnQoXG4gICAgY29tcDogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQgfCAoKCkgPT4gSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQpLFxuICApOiBjb21wIGlzIEN1c3RvbUNvbXBvbmVudCB7XG4gICAgcmV0dXJuIChcbiAgICAgIGNvbXAgJiZcbiAgICAgIHR5cGVvZiBjb21wID09PSAnb2JqZWN0JyAmJlxuICAgICAgJ2NvbXBvbmVudCcgaW4gY29tcCAmJlxuICAgICAgdHlwZW9mIGNvbXAuY29tcG9uZW50ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAnaW5qZWN0b3InIGluIGNvbXBcbiAgICApO1xuICB9XG5cbiAgaXNGdW5jdGlvbkNvbXBvbmVudChcbiAgICBjb21wOiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCB8ICgoKSA9PiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCksXG4gICk6IGNvbXAgaXMgKCkgPT4gSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQge1xuICAgIHJldHVybiB0eXBlb2YgY29tcCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxuXG4gIHN0eWxlcyA9IHtcbiAgICBjb250YWluZXI6IHtcbiAgICAgIG1hcmdpblRvcDogJzVweCcsXG4gICAgICBtYXJnaW5Cb3R0b206ICc1cHgnLFxuICAgICAgekluZGV4OiA5LFxuICAgIH0sXG4gICAgYnV0dG9uQ29udGFpbmVyOiB7XG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICBhbGlnbkl0ZW1zOiAnY2VudGVyJyxcbiAgICAgIHBhZGRpbmc6ICcxMHB4JyxcbiAgICAgIGJvcmRlclJhZGl1czogJzVweCcsXG4gICAgICBtYXJnaW5MZWZ0OiAnNXB4JyxcbiAgICAgIG1hcmdpblJpZ2h0OiAnNXB4JyxcbiAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgIH0sXG4gICAgdmVydGljYWxCdXR0b246IHtcbiAgICAgIGZsZXhEaXJlY3Rpb246ICdjb2x1bW4nLFxuICAgIH0sXG4gICAgYnV0dG9uVGV4dDoge1xuICAgICAgZm9udFNpemU6ICcxMnB4JyxcbiAgICAgIG1hcmdpblRvcDogJzVweCcsXG4gICAgfSxcbiAgfTtcbn1cbiIsIjxkaXYgW25nU3R5bGVdPVwiZ2V0Q29udGFpbmVyU3R5bGUoKVwiPlxyXG4gIDxkaXZcclxuICAgICpuZ0Zvcj1cImxldCBidXR0b24gb2YgYnV0dG9uczsgbGV0IGkgPSBpbmRleFwiXHJcbiAgICBbbmdTdHlsZV09XCJnZXRCdXR0b25TdHlsZShidXR0b24pXCJcclxuICAgIChjbGljayk9XCJidXR0b24ub25QcmVzcyAmJiBidXR0b24ub25QcmVzcygpXCJcclxuICA+XHJcbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYnV0dG9uLmljb25cIj5cclxuICAgICAgPGZhLWljb25cclxuICAgICAgICAqbmdJZj1cImJ1dHRvbi5hY3RpdmVcIlxyXG4gICAgICAgIFtpY29uXT1cImJ1dHRvbi5hbHRlcm5hdGVJY29uIHx8IGJ1dHRvbi5pY29uXCJcclxuICAgICAgICBbc3R5bGUuY29sb3JdPVwiYnV0dG9uLmluQWN0aXZlQ29sb3IgfHwgJ3RyYW5zcGFyZW50J1wiXHJcbiAgICAgID48L2ZhLWljb24+XHJcbiAgICAgIDxmYS1pY29uXHJcbiAgICAgICAgKm5nSWY9XCIhYnV0dG9uLmFjdGl2ZVwiXHJcbiAgICAgICAgW2ljb25dPVwiYnV0dG9uLmljb25cIlxyXG4gICAgICAgIFtzdHlsZS5jb2xvcl09XCJidXR0b24uaW5BY3RpdmVDb2xvciB8fCAndHJhbnNwYXJlbnQnXCJcclxuICAgICAgPjwvZmEtaWNvbj5cclxuICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFidXR0b24uaWNvblwiPlxyXG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYnV0dG9uLmN1c3RvbUNvbXBvbmVudFwiPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0N1c3RvbUNvbXBvbmVudChidXR0b24uY3VzdG9tQ29tcG9uZW50KVwiPlxyXG4gICAgICAgICAgPG5nLWNvbnRhaW5lclxyXG4gICAgICAgICAgICAqbmdDb21wb25lbnRPdXRsZXQ9XCJcclxuICAgICAgICAgICAgICBidXR0b24uY3VzdG9tQ29tcG9uZW50LmNvbXBvbmVudDtcclxuICAgICAgICAgICAgICBpbmplY3RvcjogYnV0dG9uLmN1c3RvbUNvbXBvbmVudC5pbmplY3RvclxyXG4gICAgICAgICAgICBcIlxyXG4gICAgICAgICAgPjwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDwvbmctY29udGFpbmVyPlxyXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhaXNDdXN0b21Db21wb25lbnQoYnV0dG9uLmN1c3RvbUNvbXBvbmVudCkgJiYgIWlzRnVuY3Rpb25Db21wb25lbnQoYnV0dG9uLmN1c3RvbUNvbXBvbmVudClcIj5cclxuICAgICAgICAgIDwhLS0gSGFuZGxlIHRoZSBIVE1MRWxlbWVudCBjYXNlLCBlLmcuLCByZW5kZXIgaXQgdXNpbmcgW2lubmVySFRNTF0gLS0+XHJcbiAgICAgICAgICA8ZGl2IFtpbm5lckhUTUxdPVwiYnV0dG9uLmN1c3RvbUNvbXBvbmVudC5vdXRlckhUTUxcIj48L2Rpdj5cclxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgICAgPC9uZy1jb250YWluZXI+XHJcbiAgICA8L25nLWNvbnRhaW5lcj5cclxuICAgIDxzcGFuICpuZ0lmPVwiYnV0dG9uLm5hbWVcIiBbbmdTdHlsZV09XCJnZXRUZXh0U3R5bGUoYnV0dG9uKVwiPnt7XHJcbiAgICAgIGJ1dHRvbi5uYW1lXHJcbiAgICB9fTwvc3Bhbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==