import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
/**
 * ControlButtonsComponentTouch provides customizable touch controls with various icons, colors, and alignment options.
 *
 * @selector app-control-buttons-component-touch
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 *
 * @inputs
 * - `buttons` (ButtonTouch[]): Array of button configurations with properties for icon, color, action, and visibility.
 * - `position` ('left' | 'right' | 'middle'): Horizontal alignment of the buttons container. Default is 'left'.
 * - `location` ('top' | 'bottom' | 'center'): Vertical alignment of the buttons container. Default is 'top'.
 * - `direction` ('horizontal' | 'vertical'): Layout direction of buttons. Default is 'horizontal'.
 * - `buttonsContainerStyle` (Partial<CSSStyleDeclaration>): Custom styles for the buttons container.
 * - `showAspect` (boolean): Controls the visibility of the buttons container. Default is false.
 *
 * @methods
 * - `getAlignmentStyle()`: Returns alignment styles based on `position`, `location`, and `direction` inputs.
 * - `mergeStyles(...styles: any[])`: Merges multiple style objects into one for flexible styling.
 * - `isCustomComponent(comp)`: Type guard for identifying custom component objects.
 * - `isFunctionComponent(comp)`: Type guard for identifying function components.
 *
 * @example
 * ```html
 * <app-control-buttons-component-touch
 *   [buttons]="[
 *     { name: 'Mute', icon: faMicrophoneSlash, onPress: muteAction, activeColor: 'red' },
 *     { name: 'Unmute', icon: faMicrophone, onPress: unmuteAction, activeColor: 'green' }
 *   ]"
 *   position="right"
 *   location="bottom"
 *   direction="vertical"
 *   [buttonsContainerStyle]="{ backgroundColor: '#333' }"
 *   [showAspect]="true"
 * ></app-control-buttons-component-touch>
 * ```
 **/
export class ControlButtonsComponentTouch {
    buttons = [];
    position = 'left';
    location = 'top';
    direction = 'horizontal';
    buttonsContainerStyle = {};
    showAspect = false;
    getAlignmentStyle() {
        let alignmentStyle = {};
        if (this.position === 'left' || this.position === 'right' || this.position === 'middle') {
            alignmentStyle['justify-content'] =
                this.position === 'left' ? 'flex-start' : this.position === 'right' ? 'flex-end' : 'center';
        }
        if (this.location === 'top' || this.location === 'bottom' || this.location === 'center') {
            alignmentStyle['align-items'] =
                this.location === 'top' ? 'flex-start' : this.location === 'bottom' ? 'flex-end' : 'center';
        }
        if (this.direction === 'vertical') {
            alignmentStyle['flex-direction'] = 'column';
        }
        else {
            alignmentStyle['flex-direction'] = 'row';
        }
        return alignmentStyle;
    }
    mergeStyles(...styles) {
        return Object.assign({}, ...styles);
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ControlButtonsComponentTouch, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: ControlButtonsComponentTouch, isStandalone: true, selector: "app-control-buttons-component-touch", inputs: { buttons: "buttons", position: "position", location: "location", direction: "direction", buttonsContainerStyle: "buttonsContainerStyle", showAspect: "showAspect" }, ngImport: i0, template: `
    <div
      [ngStyle]="
        mergeStyles(getAlignmentStyle(), buttonsContainerStyle, {
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          'margin-top': '5px',
          'margin-bottom': '5px',
          elevation: '9',
          'z-index': '9',
          'background-color': 'transparent',
          display: showAspect ? 'flex' : 'none'
        })
      "
    >
      <button
        *ngFor="let button of buttons"
        [ngStyle]="
          mergeStyles(
            {
              'align-items': 'center',
              padding: '10px',
              'border-radius': '5px',
              'margin-right': '5px',
              'margin-left': '5px',
              'margin-bottom': '5px',
              'margin-top': '5px',
              cursor: 'pointer',
              'background-color': button.show
                ? button.backgroundColor?.default || 'rgba(255, 255, 255, 0.25)'
                : 'transparent',
              border: 'none',
              display: button.show
                ? 'flex'
                : button.inActiveColor === 'transparent' && button.activeColor === 'transparent'
                ? 'flex'
                : 'none'
            },
            direction === 'vertical' ? { 'flex-direction': 'column' } : {}
          )
        "
        (click)="button.onPress ? button.onPress() : null"
        [disabled]="button.disabled"
      >
        <ng-container *ngIf="button.icon">
          <fa-icon
            *ngIf="button.active"
            [icon]="button.alternateIcon || button.icon"
            [style.color]="button.activeColor || 'transparent'"
          ></fa-icon>
          <fa-icon
            *ngIf="!button.active"
            [icon]="button.icon"
            [style.color]="button.inActiveColor || 'transparent'"
          ></fa-icon>
        </ng-container>
        <ng-container *ngIf="!button.icon">
          <ng-container *ngIf="button.customComponent">
            <ng-container *ngIf="isCustomComponent(button.customComponent)">
              <ng-container
                *ngComponentOutlet="
                  button.customComponent.component;
                  injector: button.customComponent.injector
                "
              ></ng-container>
            </ng-container>
            <ng-container
              *ngIf="
                !isCustomComponent(button.customComponent) &&
                !isFunctionComponent(button.customComponent)
              "
            >
              <!-- Handle the HTMLElement case, e.g., render it using [innerHTML] -->
              <div [innerHTML]="button.customComponent.outerHTML"></div>
            </ng-container>
          </ng-container>
        </ng-container>
        <span
          *ngIf="button.name"
          [ngStyle]="{
            color: button.color || 'transparent',
            'font-size': '12px',
            'margin-top': '5px'
          }"
        >
          {{ button.name }}
        </span>
      </button>
    </div>
  `, isInline: true, styles: [":host{display:flex;justify-content:center;align-items:center}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ControlButtonsComponentTouch, decorators: [{
            type: Component,
            args: [{ selector: 'app-control-buttons-component-touch', standalone: true, imports: [CommonModule, FontAwesomeModule], template: `
    <div
      [ngStyle]="
        mergeStyles(getAlignmentStyle(), buttonsContainerStyle, {
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          'margin-top': '5px',
          'margin-bottom': '5px',
          elevation: '9',
          'z-index': '9',
          'background-color': 'transparent',
          display: showAspect ? 'flex' : 'none'
        })
      "
    >
      <button
        *ngFor="let button of buttons"
        [ngStyle]="
          mergeStyles(
            {
              'align-items': 'center',
              padding: '10px',
              'border-radius': '5px',
              'margin-right': '5px',
              'margin-left': '5px',
              'margin-bottom': '5px',
              'margin-top': '5px',
              cursor: 'pointer',
              'background-color': button.show
                ? button.backgroundColor?.default || 'rgba(255, 255, 255, 0.25)'
                : 'transparent',
              border: 'none',
              display: button.show
                ? 'flex'
                : button.inActiveColor === 'transparent' && button.activeColor === 'transparent'
                ? 'flex'
                : 'none'
            },
            direction === 'vertical' ? { 'flex-direction': 'column' } : {}
          )
        "
        (click)="button.onPress ? button.onPress() : null"
        [disabled]="button.disabled"
      >
        <ng-container *ngIf="button.icon">
          <fa-icon
            *ngIf="button.active"
            [icon]="button.alternateIcon || button.icon"
            [style.color]="button.activeColor || 'transparent'"
          ></fa-icon>
          <fa-icon
            *ngIf="!button.active"
            [icon]="button.icon"
            [style.color]="button.inActiveColor || 'transparent'"
          ></fa-icon>
        </ng-container>
        <ng-container *ngIf="!button.icon">
          <ng-container *ngIf="button.customComponent">
            <ng-container *ngIf="isCustomComponent(button.customComponent)">
              <ng-container
                *ngComponentOutlet="
                  button.customComponent.component;
                  injector: button.customComponent.injector
                "
              ></ng-container>
            </ng-container>
            <ng-container
              *ngIf="
                !isCustomComponent(button.customComponent) &&
                !isFunctionComponent(button.customComponent)
              "
            >
              <!-- Handle the HTMLElement case, e.g., render it using [innerHTML] -->
              <div [innerHTML]="button.customComponent.outerHTML"></div>
            </ng-container>
          </ng-container>
        </ng-container>
        <span
          *ngIf="button.name"
          [ngStyle]="{
            color: button.color || 'transparent',
            'font-size': '12px',
            'margin-top': '5px'
          }"
        >
          {{ button.name }}
        </span>
      </button>
    </div>
  `, styles: [":host{display:flex;justify-content:center;align-items:center}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaC9jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFZLEtBQUssRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7QUF1Q3JFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW1DSTtBQTRHSixNQUFNLE9BQU8sNEJBQTRCO0lBQzlCLE9BQU8sR0FBa0IsRUFBRSxDQUFDO0lBQzVCLFFBQVEsR0FBRyxNQUFNLENBQUM7SUFDbEIsUUFBUSxHQUFHLEtBQUssQ0FBQztJQUNqQixTQUFTLEdBQUcsWUFBWSxDQUFDO0lBQ3pCLHFCQUFxQixHQUFRLEVBQUUsQ0FBQztJQUNoQyxVQUFVLEdBQUcsS0FBSyxDQUFDO0lBRTVCLGlCQUFpQjtRQUNmLElBQUksY0FBYyxHQUFRLEVBQUUsQ0FBQztRQUU3QixJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDeEYsY0FBYyxDQUFDLGlCQUFpQixDQUFDO2dCQUMvQixJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDaEcsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUUsQ0FBQztZQUN4RixjQUFjLENBQUMsYUFBYSxDQUFDO2dCQUMzQixJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUM7UUFDaEcsQ0FBQztRQUVELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxVQUFVLEVBQUUsQ0FBQztZQUNsQyxjQUFjLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxRQUFRLENBQUM7UUFDOUMsQ0FBQzthQUFNLENBQUM7WUFDTixjQUFjLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxLQUFLLENBQUM7UUFDM0MsQ0FBQztRQUVELE9BQU8sY0FBYyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxXQUFXLENBQUMsR0FBRyxNQUFhO1FBQzFCLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxNQUFNLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQsaUJBQWlCLENBQ2YsSUFBMkU7UUFFM0UsT0FBTyxDQUNMLElBQUk7WUFDSixPQUFPLElBQUksS0FBSyxRQUFRO1lBQ3hCLFdBQVcsSUFBSSxJQUFJO1lBQ25CLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxVQUFVO1lBQ3BDLFVBQVUsSUFBSSxJQUFJLENBQ25CLENBQUM7SUFDSixDQUFDO0lBRUQsbUJBQW1CLENBQ2pCLElBQTJFO1FBRTNFLE9BQU8sT0FBTyxJQUFJLEtBQUssVUFBVSxDQUFDO0lBQ3BDLENBQUM7dUdBbERVLDRCQUE0QjsyRkFBNUIsNEJBQTRCLDZRQXRHN0I7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyRlQsd0lBNUZTLFlBQVksNGxCQUFFLGlCQUFpQjs7MkZBdUc5Qiw0QkFBNEI7a0JBMUd4QyxTQUFTOytCQUNFLHFDQUFxQyxjQUNuQyxJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUMsWUFDaEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyRlQ7OEJBWVEsT0FBTztzQkFBZixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLHFCQUFxQjtzQkFBN0IsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3RvciwgSW5wdXQsIFR5cGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmV4cG9ydCBpbnRlcmZhY2UgQ3VzdG9tQ29tcG9uZW50IHtcbiAgY29tcG9uZW50OiBUeXBlPGFueT47XG4gIGluamVjdG9yOiBJbmplY3Rvcjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBCdXR0b25Ub3VjaCB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGljb24/OiBJY29uRGVmaW5pdGlvbjtcbiAgYWx0ZXJuYXRlSWNvbj86IGFueTtcbiAgb25QcmVzcz86ICgpID0+IHZvaWQ7XG4gIGJhY2tncm91bmRDb2xvcj86IHtcbiAgICBkZWZhdWx0Pzogc3RyaW5nO1xuICB9O1xuICBhY3RpdmU/OiBib29sZWFuIHwgKCgpID0+IGJvb2xlYW4pO1xuICBhbHRlcm5hdGVJY29uQ29tcG9uZW50PzogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQgfCAoKCkgPT4gSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQpO1xuICBpY29uQ29tcG9uZW50PzogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQgfCAoKCkgPT4gSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQpO1xuICBjdXN0b21Db21wb25lbnQ/OiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCB8ICgoKSA9PiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCk7XG4gIGNvbG9yPzogc3RyaW5nO1xuICBhY3RpdmVDb2xvcj86IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpO1xuICBpbkFjdGl2ZUNvbG9yPzogc3RyaW5nIHwgKCgpID0+IHN0cmluZyk7XG4gIHNob3c/OiBib29sZWFuIHwgKCgpID0+IGJvb2xlYW4pO1xuICBkaXNhYmxlZD86IGJvb2xlYW4gfCAoKCkgPT4gYm9vbGVhbik7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udHJvbEJ1dHRvbnNDb21wb25lbnRUb3VjaE9wdGlvbnMge1xuICBidXR0b25zOiBCdXR0b25Ub3VjaFtdO1xuICBwb3NpdGlvbj86ICdsZWZ0JyB8ICdyaWdodCcgfCAnbWlkZGxlJztcbiAgbG9jYXRpb24/OiAndG9wJyB8ICdib3R0b20nIHwgJ2NlbnRlcic7XG4gIGRpcmVjdGlvbj86ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc7XG4gIGJ1dHRvbnNDb250YWluZXJTdHlsZT86IFBhcnRpYWw8Q1NTU3R5bGVEZWNsYXJhdGlvbj47XG4gIHNob3dBc3BlY3Q/OiBib29sZWFuO1xufVxuXG5leHBvcnQgdHlwZSBDb250cm9sQnV0dG9uc0NvbXBvbmVudFRvdWNoVHlwZSA9IChcbiAgb3B0aW9uczogQ29udHJvbEJ1dHRvbnNDb21wb25lbnRUb3VjaE9wdGlvbnMsXG4pID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIENvbnRyb2xCdXR0b25zQ29tcG9uZW50VG91Y2ggcHJvdmlkZXMgY3VzdG9taXphYmxlIHRvdWNoIGNvbnRyb2xzIHdpdGggdmFyaW91cyBpY29ucywgY29sb3JzLCBhbmQgYWxpZ25tZW50IG9wdGlvbnMuXG4gKlxuICogQHNlbGVjdG9yIGFwcC1jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXG4gKlxuICogQGlucHV0c1xuICogLSBgYnV0dG9uc2AgKEJ1dHRvblRvdWNoW10pOiBBcnJheSBvZiBidXR0b24gY29uZmlndXJhdGlvbnMgd2l0aCBwcm9wZXJ0aWVzIGZvciBpY29uLCBjb2xvciwgYWN0aW9uLCBhbmQgdmlzaWJpbGl0eS5cbiAqIC0gYHBvc2l0aW9uYCAoJ2xlZnQnIHwgJ3JpZ2h0JyB8ICdtaWRkbGUnKTogSG9yaXpvbnRhbCBhbGlnbm1lbnQgb2YgdGhlIGJ1dHRvbnMgY29udGFpbmVyLiBEZWZhdWx0IGlzICdsZWZ0Jy5cbiAqIC0gYGxvY2F0aW9uYCAoJ3RvcCcgfCAnYm90dG9tJyB8ICdjZW50ZXInKTogVmVydGljYWwgYWxpZ25tZW50IG9mIHRoZSBidXR0b25zIGNvbnRhaW5lci4gRGVmYXVsdCBpcyAndG9wJy5cbiAqIC0gYGRpcmVjdGlvbmAgKCdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcpOiBMYXlvdXQgZGlyZWN0aW9uIG9mIGJ1dHRvbnMuIERlZmF1bHQgaXMgJ2hvcml6b250YWwnLlxuICogLSBgYnV0dG9uc0NvbnRhaW5lclN0eWxlYCAoUGFydGlhbDxDU1NTdHlsZURlY2xhcmF0aW9uPik6IEN1c3RvbSBzdHlsZXMgZm9yIHRoZSBidXR0b25zIGNvbnRhaW5lci5cbiAqIC0gYHNob3dBc3BlY3RgIChib29sZWFuKTogQ29udHJvbHMgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGJ1dHRvbnMgY29udGFpbmVyLiBEZWZhdWx0IGlzIGZhbHNlLlxuICpcbiAqIEBtZXRob2RzXG4gKiAtIGBnZXRBbGlnbm1lbnRTdHlsZSgpYDogUmV0dXJucyBhbGlnbm1lbnQgc3R5bGVzIGJhc2VkIG9uIGBwb3NpdGlvbmAsIGBsb2NhdGlvbmAsIGFuZCBgZGlyZWN0aW9uYCBpbnB1dHMuXG4gKiAtIGBtZXJnZVN0eWxlcyguLi5zdHlsZXM6IGFueVtdKWA6IE1lcmdlcyBtdWx0aXBsZSBzdHlsZSBvYmplY3RzIGludG8gb25lIGZvciBmbGV4aWJsZSBzdHlsaW5nLlxuICogLSBgaXNDdXN0b21Db21wb25lbnQoY29tcClgOiBUeXBlIGd1YXJkIGZvciBpZGVudGlmeWluZyBjdXN0b20gY29tcG9uZW50IG9iamVjdHMuXG4gKiAtIGBpc0Z1bmN0aW9uQ29tcG9uZW50KGNvbXApYDogVHlwZSBndWFyZCBmb3IgaWRlbnRpZnlpbmcgZnVuY3Rpb24gY29tcG9uZW50cy5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoXG4gKiAgIFtidXR0b25zXT1cIltcbiAqICAgICB7IG5hbWU6ICdNdXRlJywgaWNvbjogZmFNaWNyb3Bob25lU2xhc2gsIG9uUHJlc3M6IG11dGVBY3Rpb24sIGFjdGl2ZUNvbG9yOiAncmVkJyB9LFxuICogICAgIHsgbmFtZTogJ1VubXV0ZScsIGljb246IGZhTWljcm9waG9uZSwgb25QcmVzczogdW5tdXRlQWN0aW9uLCBhY3RpdmVDb2xvcjogJ2dyZWVuJyB9XG4gKiAgIF1cIlxuICogICBwb3NpdGlvbj1cInJpZ2h0XCJcbiAqICAgbG9jYXRpb249XCJib3R0b21cIlxuICogICBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiXG4gKiAgIFtidXR0b25zQ29udGFpbmVyU3R5bGVdPVwieyBiYWNrZ3JvdW5kQ29sb3I6ICcjMzMzJyB9XCJcbiAqICAgW3Nob3dBc3BlY3RdPVwidHJ1ZVwiXG4gKiA+PC9hcHAtY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaD5cbiAqIGBgYFxuICoqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBbbmdTdHlsZV09XCJcbiAgICAgICAgbWVyZ2VTdHlsZXMoZ2V0QWxpZ25tZW50U3R5bGUoKSwgYnV0dG9uc0NvbnRhaW5lclN0eWxlLCB7XG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgYm90dG9tOiAnMCcsXG4gICAgICAgICAgbGVmdDogJzAnLFxuICAgICAgICAgIHJpZ2h0OiAnMCcsXG4gICAgICAgICAgJ21hcmdpbi10b3AnOiAnNXB4JyxcbiAgICAgICAgICAnbWFyZ2luLWJvdHRvbSc6ICc1cHgnLFxuICAgICAgICAgIGVsZXZhdGlvbjogJzknLFxuICAgICAgICAgICd6LWluZGV4JzogJzknLFxuICAgICAgICAgICdiYWNrZ3JvdW5kLWNvbG9yJzogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICBkaXNwbGF5OiBzaG93QXNwZWN0ID8gJ2ZsZXgnIDogJ25vbmUnXG4gICAgICAgIH0pXG4gICAgICBcIlxuICAgID5cbiAgICAgIDxidXR0b25cbiAgICAgICAgKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBidXR0b25zXCJcbiAgICAgICAgW25nU3R5bGVdPVwiXG4gICAgICAgICAgbWVyZ2VTdHlsZXMoXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICdhbGlnbi1pdGVtcyc6ICdjZW50ZXInLFxuICAgICAgICAgICAgICBwYWRkaW5nOiAnMTBweCcsXG4gICAgICAgICAgICAgICdib3JkZXItcmFkaXVzJzogJzVweCcsXG4gICAgICAgICAgICAgICdtYXJnaW4tcmlnaHQnOiAnNXB4JyxcbiAgICAgICAgICAgICAgJ21hcmdpbi1sZWZ0JzogJzVweCcsXG4gICAgICAgICAgICAgICdtYXJnaW4tYm90dG9tJzogJzVweCcsXG4gICAgICAgICAgICAgICdtYXJnaW4tdG9wJzogJzVweCcsXG4gICAgICAgICAgICAgIGN1cnNvcjogJ3BvaW50ZXInLFxuICAgICAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6IGJ1dHRvbi5zaG93XG4gICAgICAgICAgICAgICAgPyBidXR0b24uYmFja2dyb3VuZENvbG9yPy5kZWZhdWx0IHx8ICdyZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMjUpJ1xuICAgICAgICAgICAgICAgIDogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgYm9yZGVyOiAnbm9uZScsXG4gICAgICAgICAgICAgIGRpc3BsYXk6IGJ1dHRvbi5zaG93XG4gICAgICAgICAgICAgICAgPyAnZmxleCdcbiAgICAgICAgICAgICAgICA6IGJ1dHRvbi5pbkFjdGl2ZUNvbG9yID09PSAndHJhbnNwYXJlbnQnICYmIGJ1dHRvbi5hY3RpdmVDb2xvciA9PT0gJ3RyYW5zcGFyZW50J1xuICAgICAgICAgICAgICAgID8gJ2ZsZXgnXG4gICAgICAgICAgICAgICAgOiAnbm9uZSdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcgPyB7ICdmbGV4LWRpcmVjdGlvbic6ICdjb2x1bW4nIH0gOiB7fVxuICAgICAgICAgIClcbiAgICAgICAgXCJcbiAgICAgICAgKGNsaWNrKT1cImJ1dHRvbi5vblByZXNzID8gYnV0dG9uLm9uUHJlc3MoKSA6IG51bGxcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiYnV0dG9uLmRpc2FibGVkXCJcbiAgICAgID5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImJ1dHRvbi5pY29uXCI+XG4gICAgICAgICAgPGZhLWljb25cbiAgICAgICAgICAgICpuZ0lmPVwiYnV0dG9uLmFjdGl2ZVwiXG4gICAgICAgICAgICBbaWNvbl09XCJidXR0b24uYWx0ZXJuYXRlSWNvbiB8fCBidXR0b24uaWNvblwiXG4gICAgICAgICAgICBbc3R5bGUuY29sb3JdPVwiYnV0dG9uLmFjdGl2ZUNvbG9yIHx8ICd0cmFuc3BhcmVudCdcIlxuICAgICAgICAgID48L2ZhLWljb24+XG4gICAgICAgICAgPGZhLWljb25cbiAgICAgICAgICAgICpuZ0lmPVwiIWJ1dHRvbi5hY3RpdmVcIlxuICAgICAgICAgICAgW2ljb25dPVwiYnV0dG9uLmljb25cIlxuICAgICAgICAgICAgW3N0eWxlLmNvbG9yXT1cImJ1dHRvbi5pbkFjdGl2ZUNvbG9yIHx8ICd0cmFuc3BhcmVudCdcIlxuICAgICAgICAgID48L2ZhLWljb24+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWJ1dHRvbi5pY29uXCI+XG4gICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImJ1dHRvbi5jdXN0b21Db21wb25lbnRcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJpc0N1c3RvbUNvbXBvbmVudChidXR0b24uY3VzdG9tQ29tcG9uZW50KVwiPlxuICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgKm5nQ29tcG9uZW50T3V0bGV0PVwiXG4gICAgICAgICAgICAgICAgICBidXR0b24uY3VzdG9tQ29tcG9uZW50LmNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgIGluamVjdG9yOiBidXR0b24uY3VzdG9tQ29tcG9uZW50LmluamVjdG9yXG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICpuZ0lmPVwiXG4gICAgICAgICAgICAgICAgIWlzQ3VzdG9tQ29tcG9uZW50KGJ1dHRvbi5jdXN0b21Db21wb25lbnQpICYmXG4gICAgICAgICAgICAgICAgIWlzRnVuY3Rpb25Db21wb25lbnQoYnV0dG9uLmN1c3RvbUNvbXBvbmVudClcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPCEtLSBIYW5kbGUgdGhlIEhUTUxFbGVtZW50IGNhc2UsIGUuZy4sIHJlbmRlciBpdCB1c2luZyBbaW5uZXJIVE1MXSAtLT5cbiAgICAgICAgICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cImJ1dHRvbi5jdXN0b21Db21wb25lbnQub3V0ZXJIVE1MXCI+PC9kaXY+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxzcGFuXG4gICAgICAgICAgKm5nSWY9XCJidXR0b24ubmFtZVwiXG4gICAgICAgICAgW25nU3R5bGVdPVwie1xuICAgICAgICAgICAgY29sb3I6IGJ1dHRvbi5jb2xvciB8fCAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgICAgJ2ZvbnQtc2l6ZSc6ICcxMnB4JyxcbiAgICAgICAgICAgICdtYXJnaW4tdG9wJzogJzVweCdcbiAgICAgICAgICB9XCJcbiAgICAgICAgPlxuICAgICAgICAgIHt7IGJ1dHRvbi5uYW1lIH19XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvYnV0dG9uPlxuICAgIDwvZGl2PlxuICBgLFxuICBzdHlsZXM6IFtcbiAgICBgXG4gICAgICA6aG9zdCB7XG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgfVxuICAgIGAsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIENvbnRyb2xCdXR0b25zQ29tcG9uZW50VG91Y2gge1xuICBASW5wdXQoKSBidXR0b25zOiBCdXR0b25Ub3VjaFtdID0gW107XG4gIEBJbnB1dCgpIHBvc2l0aW9uID0gJ2xlZnQnO1xuICBASW5wdXQoKSBsb2NhdGlvbiA9ICd0b3AnO1xuICBASW5wdXQoKSBkaXJlY3Rpb24gPSAnaG9yaXpvbnRhbCc7XG4gIEBJbnB1dCgpIGJ1dHRvbnNDb250YWluZXJTdHlsZTogYW55ID0ge307XG4gIEBJbnB1dCgpIHNob3dBc3BlY3QgPSBmYWxzZTtcblxuICBnZXRBbGlnbm1lbnRTdHlsZSgpIHtcbiAgICBsZXQgYWxpZ25tZW50U3R5bGU6IGFueSA9IHt9O1xuXG4gICAgaWYgKHRoaXMucG9zaXRpb24gPT09ICdsZWZ0JyB8fCB0aGlzLnBvc2l0aW9uID09PSAncmlnaHQnIHx8IHRoaXMucG9zaXRpb24gPT09ICdtaWRkbGUnKSB7XG4gICAgICBhbGlnbm1lbnRTdHlsZVsnanVzdGlmeS1jb250ZW50J10gPVxuICAgICAgICB0aGlzLnBvc2l0aW9uID09PSAnbGVmdCcgPyAnZmxleC1zdGFydCcgOiB0aGlzLnBvc2l0aW9uID09PSAncmlnaHQnID8gJ2ZsZXgtZW5kJyA6ICdjZW50ZXInO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmxvY2F0aW9uID09PSAndG9wJyB8fCB0aGlzLmxvY2F0aW9uID09PSAnYm90dG9tJyB8fCB0aGlzLmxvY2F0aW9uID09PSAnY2VudGVyJykge1xuICAgICAgYWxpZ25tZW50U3R5bGVbJ2FsaWduLWl0ZW1zJ10gPVxuICAgICAgICB0aGlzLmxvY2F0aW9uID09PSAndG9wJyA/ICdmbGV4LXN0YXJ0JyA6IHRoaXMubG9jYXRpb24gPT09ICdib3R0b20nID8gJ2ZsZXgtZW5kJyA6ICdjZW50ZXInO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmRpcmVjdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgYWxpZ25tZW50U3R5bGVbJ2ZsZXgtZGlyZWN0aW9uJ10gPSAnY29sdW1uJztcbiAgICB9IGVsc2Uge1xuICAgICAgYWxpZ25tZW50U3R5bGVbJ2ZsZXgtZGlyZWN0aW9uJ10gPSAncm93JztcbiAgICB9XG5cbiAgICByZXR1cm4gYWxpZ25tZW50U3R5bGU7XG4gIH1cblxuICBtZXJnZVN0eWxlcyguLi5zdHlsZXM6IGFueVtdKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIC4uLnN0eWxlcyk7XG4gIH1cblxuICBpc0N1c3RvbUNvbXBvbmVudChcbiAgICBjb21wOiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCB8ICgoKSA9PiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCksXG4gICk6IGNvbXAgaXMgQ3VzdG9tQ29tcG9uZW50IHtcbiAgICByZXR1cm4gKFxuICAgICAgY29tcCAmJlxuICAgICAgdHlwZW9mIGNvbXAgPT09ICdvYmplY3QnICYmXG4gICAgICAnY29tcG9uZW50JyBpbiBjb21wICYmXG4gICAgICB0eXBlb2YgY29tcC5jb21wb25lbnQgPT09ICdmdW5jdGlvbicgJiZcbiAgICAgICdpbmplY3RvcicgaW4gY29tcFxuICAgICk7XG4gIH1cblxuICBpc0Z1bmN0aW9uQ29tcG9uZW50KFxuICAgIGNvbXA6IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50IHwgKCgpID0+IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50KSxcbiAgKTogY29tcCBpcyAoKSA9PiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCB7XG4gICAgcmV0dXJuIHR5cGVvZiBjb21wID09PSAnZnVuY3Rpb24nO1xuICB9XG59XG4iXX0=