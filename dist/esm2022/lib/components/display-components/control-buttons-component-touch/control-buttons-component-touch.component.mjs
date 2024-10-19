import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
/**
 * ControlButtonsComponentTouch is an Angular component that displays a set of control buttons.
 * The buttons can be customized with various styles, icons, and actions.
 *
 * @component
 * @selector app-control-buttons-component-touch
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @template
 * The template includes a container div that holds the buttons. Each button can display an icon,
 * a custom component, or a name. The styles and visibility of the buttons are controlled by the
 * component's inputs.
 *
 * @styles
 * The host element is styled to be a flex container centered both horizontally and vertically.
 *
 * @class ControlButtonsComponentTouch
 *
 * @property {any[]} buttons - An array of button configurations. Each button can have properties like
 * `show`, `backgroundColor`, `onPress`, `icon`, `alternateIcon`, `active`, `activeColor`, `inActiveColor`,
 * `customComponent`, and `name`.
 *
 * @property {string} position - The horizontal alignment of the buttons container. Can be 'left', 'right', or 'middle'.
 * Default is 'left'.
 *
 * @property {string} location - The vertical alignment of the buttons container. Can be 'top', 'bottom', or 'center'.
 * Default is 'top'.
 *
 * @property {string} direction - The direction of the buttons layout. Can be 'horizontal' or 'vertical'.
 * Default is 'horizontal'.
 *
 * @property {any} buttonsContainerStyle - Additional styles for the buttons container.
 *
 * @property {boolean} showAspect - A flag to control the visibility of the buttons container.
 *
 * @method getAlignmentStyle
 * Returns the alignment styles based on the `position`, `location`, and `direction` inputs.
 *
 * @method mergeStyles
 * Merges multiple style objects into one.
 *
 * @example
 * <app-control-buttons-component-touch
 *   [buttons]="buttonsArray"
 *   position="right"
 *   location="bottom"
 *   direction="vertical"
 *   [buttonsContainerStyle]="customStyles"
 *   [showAspect]="true">
 * </app-control-buttons-component-touch>
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaC9jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LXRvdWNoLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFZLEtBQUssRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7QUF1Q3JFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtREc7QUEyR0gsTUFBTSxPQUFPLDRCQUE0QjtJQUM5QixPQUFPLEdBQWtCLEVBQUUsQ0FBQztJQUM1QixRQUFRLEdBQUcsTUFBTSxDQUFDO0lBQ2xCLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDakIsU0FBUyxHQUFHLFlBQVksQ0FBQztJQUN6QixxQkFBcUIsR0FBUSxFQUFFLENBQUM7SUFDaEMsVUFBVSxHQUFHLEtBQUssQ0FBQztJQUU1QixpQkFBaUI7UUFDZixJQUFJLGNBQWMsR0FBUSxFQUFFLENBQUM7UUFFN0IsSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLE9BQU8sSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRSxDQUFDO1lBQ3hGLGNBQWMsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDL0IsSUFBSSxDQUFDLFFBQVEsS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2hHLENBQUM7UUFFRCxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFLENBQUM7WUFDeEYsY0FBYyxDQUFDLGFBQWEsQ0FBQztnQkFDM0IsSUFBSSxDQUFDLFFBQVEsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQ2hHLENBQUM7UUFFRCxJQUFJLElBQUksQ0FBQyxTQUFTLEtBQUssVUFBVSxFQUFFLENBQUM7WUFDbEMsY0FBYyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsUUFBUSxDQUFDO1FBQzlDLENBQUM7YUFBTSxDQUFDO1lBQ04sY0FBYyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQzNDLENBQUM7UUFFRCxPQUFPLGNBQWMsQ0FBQztJQUN4QixDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQUcsTUFBYTtRQUMxQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELGlCQUFpQixDQUNmLElBQTJFO1FBRTNFLE9BQU8sQ0FDTCxJQUFJO1lBQ0osT0FBTyxJQUFJLEtBQUssUUFBUTtZQUN4QixXQUFXLElBQUksSUFBSTtZQUNuQixPQUFPLElBQUksQ0FBQyxTQUFTLEtBQUssVUFBVTtZQUNwQyxVQUFVLElBQUksSUFBSSxDQUNuQixDQUFDO0lBQ0osQ0FBQztJQUVELG1CQUFtQixDQUNqQixJQUEyRTtRQUUzRSxPQUFPLE9BQU8sSUFBSSxLQUFLLFVBQVUsQ0FBQztJQUNwQyxDQUFDO3VHQWxEVSw0QkFBNEI7MkZBQTVCLDRCQUE0Qiw2UUF0RzdCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkZULHdJQTVGUyxZQUFZLDRsQkFBRSxpQkFBaUI7OzJGQXVHOUIsNEJBQTRCO2tCQTFHeEMsU0FBUzsrQkFDRSxxQ0FBcUMsY0FDbkMsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLFlBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkZUOzhCQVlRLE9BQU87c0JBQWYsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLFFBQVE7c0JBQWhCLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxxQkFBcUI7c0JBQTdCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5qZWN0b3IsIElucHV0LCBUeXBlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XG5pbXBvcnQgeyBJY29uRGVmaW5pdGlvbiB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbUNvbXBvbmVudCB7XG4gIGNvbXBvbmVudDogVHlwZTxhbnk+O1xuICBpbmplY3RvcjogSW5qZWN0b3I7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQnV0dG9uVG91Y2gge1xuICBuYW1lPzogc3RyaW5nO1xuICBpY29uPzogSWNvbkRlZmluaXRpb247XG4gIGFsdGVybmF0ZUljb24/OiBhbnk7XG4gIG9uUHJlc3M/OiAoKSA9PiB2b2lkO1xuICBiYWNrZ3JvdW5kQ29sb3I/OiB7XG4gICAgZGVmYXVsdD86IHN0cmluZztcbiAgfTtcbiAgYWN0aXZlPzogYm9vbGVhbiB8ICgoKSA9PiBib29sZWFuKTtcbiAgYWx0ZXJuYXRlSWNvbkNvbXBvbmVudD86IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50IHwgKCgpID0+IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50KTtcbiAgaWNvbkNvbXBvbmVudD86IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50IHwgKCgpID0+IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50KTtcbiAgY3VzdG9tQ29tcG9uZW50PzogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQgfCAoKCkgPT4gSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQpO1xuICBjb2xvcj86IHN0cmluZztcbiAgYWN0aXZlQ29sb3I/OiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKTtcbiAgaW5BY3RpdmVDb2xvcj86IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpO1xuICBzaG93PzogYm9vbGVhbiB8ICgoKSA9PiBib29sZWFuKTtcbiAgZGlzYWJsZWQ/OiBib29sZWFuIHwgKCgpID0+IGJvb2xlYW4pO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbnRyb2xCdXR0b25zQ29tcG9uZW50VG91Y2hPcHRpb25zIHtcbiAgYnV0dG9uczogQnV0dG9uVG91Y2hbXTtcbiAgcG9zaXRpb24/OiAnbGVmdCcgfCAncmlnaHQnIHwgJ21pZGRsZSc7XG4gIGxvY2F0aW9uPzogJ3RvcCcgfCAnYm90dG9tJyB8ICdjZW50ZXInO1xuICBkaXJlY3Rpb24/OiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuICBidXR0b25zQ29udGFpbmVyU3R5bGU/OiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+O1xuICBzaG93QXNwZWN0PzogYm9vbGVhbjtcbn1cblxuZXhwb3J0IHR5cGUgQ29udHJvbEJ1dHRvbnNDb21wb25lbnRUb3VjaFR5cGUgPSAoXG4gIG9wdGlvbnM6IENvbnRyb2xCdXR0b25zQ29tcG9uZW50VG91Y2hPcHRpb25zLFxuKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBDb250cm9sQnV0dG9uc0NvbXBvbmVudFRvdWNoIGlzIGFuIEFuZ3VsYXIgY29tcG9uZW50IHRoYXQgZGlzcGxheXMgYSBzZXQgb2YgY29udHJvbCBidXR0b25zLlxuICogVGhlIGJ1dHRvbnMgY2FuIGJlIGN1c3RvbWl6ZWQgd2l0aCB2YXJpb3VzIHN0eWxlcywgaWNvbnMsIGFuZCBhY3Rpb25zLlxuICpcbiAqIEBjb21wb25lbnRcbiAqIEBzZWxlY3RvciBhcHAtY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaFxuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQGltcG9ydHMgW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdXG4gKlxuICogQHRlbXBsYXRlXG4gKiBUaGUgdGVtcGxhdGUgaW5jbHVkZXMgYSBjb250YWluZXIgZGl2IHRoYXQgaG9sZHMgdGhlIGJ1dHRvbnMuIEVhY2ggYnV0dG9uIGNhbiBkaXNwbGF5IGFuIGljb24sXG4gKiBhIGN1c3RvbSBjb21wb25lbnQsIG9yIGEgbmFtZS4gVGhlIHN0eWxlcyBhbmQgdmlzaWJpbGl0eSBvZiB0aGUgYnV0dG9ucyBhcmUgY29udHJvbGxlZCBieSB0aGVcbiAqIGNvbXBvbmVudCdzIGlucHV0cy5cbiAqXG4gKiBAc3R5bGVzXG4gKiBUaGUgaG9zdCBlbGVtZW50IGlzIHN0eWxlZCB0byBiZSBhIGZsZXggY29udGFpbmVyIGNlbnRlcmVkIGJvdGggaG9yaXpvbnRhbGx5IGFuZCB2ZXJ0aWNhbGx5LlxuICpcbiAqIEBjbGFzcyBDb250cm9sQnV0dG9uc0NvbXBvbmVudFRvdWNoXG4gKlxuICogQHByb3BlcnR5IHthbnlbXX0gYnV0dG9ucyAtIEFuIGFycmF5IG9mIGJ1dHRvbiBjb25maWd1cmF0aW9ucy4gRWFjaCBidXR0b24gY2FuIGhhdmUgcHJvcGVydGllcyBsaWtlXG4gKiBgc2hvd2AsIGBiYWNrZ3JvdW5kQ29sb3JgLCBgb25QcmVzc2AsIGBpY29uYCwgYGFsdGVybmF0ZUljb25gLCBgYWN0aXZlYCwgYGFjdGl2ZUNvbG9yYCwgYGluQWN0aXZlQ29sb3JgLFxuICogYGN1c3RvbUNvbXBvbmVudGAsIGFuZCBgbmFtZWAuXG4gKlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHBvc2l0aW9uIC0gVGhlIGhvcml6b250YWwgYWxpZ25tZW50IG9mIHRoZSBidXR0b25zIGNvbnRhaW5lci4gQ2FuIGJlICdsZWZ0JywgJ3JpZ2h0Jywgb3IgJ21pZGRsZScuXG4gKiBEZWZhdWx0IGlzICdsZWZ0Jy5cbiAqXG4gKiBAcHJvcGVydHkge3N0cmluZ30gbG9jYXRpb24gLSBUaGUgdmVydGljYWwgYWxpZ25tZW50IG9mIHRoZSBidXR0b25zIGNvbnRhaW5lci4gQ2FuIGJlICd0b3AnLCAnYm90dG9tJywgb3IgJ2NlbnRlcicuXG4gKiBEZWZhdWx0IGlzICd0b3AnLlxuICpcbiAqIEBwcm9wZXJ0eSB7c3RyaW5nfSBkaXJlY3Rpb24gLSBUaGUgZGlyZWN0aW9uIG9mIHRoZSBidXR0b25zIGxheW91dC4gQ2FuIGJlICdob3Jpem9udGFsJyBvciAndmVydGljYWwnLlxuICogRGVmYXVsdCBpcyAnaG9yaXpvbnRhbCcuXG4gKlxuICogQHByb3BlcnR5IHthbnl9IGJ1dHRvbnNDb250YWluZXJTdHlsZSAtIEFkZGl0aW9uYWwgc3R5bGVzIGZvciB0aGUgYnV0dG9ucyBjb250YWluZXIuXG4gKlxuICogQHByb3BlcnR5IHtib29sZWFufSBzaG93QXNwZWN0IC0gQSBmbGFnIHRvIGNvbnRyb2wgdGhlIHZpc2liaWxpdHkgb2YgdGhlIGJ1dHRvbnMgY29udGFpbmVyLlxuICpcbiAqIEBtZXRob2QgZ2V0QWxpZ25tZW50U3R5bGVcbiAqIFJldHVybnMgdGhlIGFsaWdubWVudCBzdHlsZXMgYmFzZWQgb24gdGhlIGBwb3NpdGlvbmAsIGBsb2NhdGlvbmAsIGFuZCBgZGlyZWN0aW9uYCBpbnB1dHMuXG4gKlxuICogQG1ldGhvZCBtZXJnZVN0eWxlc1xuICogTWVyZ2VzIG11bHRpcGxlIHN0eWxlIG9iamVjdHMgaW50byBvbmUuXG4gKlxuICogQGV4YW1wbGVcbiAqIDxhcHAtY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaFxuICogICBbYnV0dG9uc109XCJidXR0b25zQXJyYXlcIlxuICogICBwb3NpdGlvbj1cInJpZ2h0XCJcbiAqICAgbG9jYXRpb249XCJib3R0b21cIlxuICogICBkaXJlY3Rpb249XCJ2ZXJ0aWNhbFwiXG4gKiAgIFtidXR0b25zQ29udGFpbmVyU3R5bGVdPVwiY3VzdG9tU3R5bGVzXCJcbiAqICAgW3Nob3dBc3BlY3RdPVwidHJ1ZVwiPlxuICogPC9hcHAtY29udHJvbC1idXR0b25zLWNvbXBvbmVudC10b3VjaD5cbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWNvbnRyb2wtYnV0dG9ucy1jb21wb25lbnQtdG91Y2gnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZV0sXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgW25nU3R5bGVdPVwiXG4gICAgICAgIG1lcmdlU3R5bGVzKGdldEFsaWdubWVudFN0eWxlKCksIGJ1dHRvbnNDb250YWluZXJTdHlsZSwge1xuICAgICAgICAgIHBvc2l0aW9uOiAnYWJzb2x1dGUnLFxuICAgICAgICAgIGJvdHRvbTogJzAnLFxuICAgICAgICAgIGxlZnQ6ICcwJyxcbiAgICAgICAgICByaWdodDogJzAnLFxuICAgICAgICAgICdtYXJnaW4tdG9wJzogJzVweCcsXG4gICAgICAgICAgJ21hcmdpbi1ib3R0b20nOiAnNXB4JyxcbiAgICAgICAgICBlbGV2YXRpb246ICc5JyxcbiAgICAgICAgICAnei1pbmRleCc6ICc5JyxcbiAgICAgICAgICAnYmFja2dyb3VuZC1jb2xvcic6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgZGlzcGxheTogc2hvd0FzcGVjdCA/ICdmbGV4JyA6ICdub25lJ1xuICAgICAgICB9KVxuICAgICAgXCJcbiAgICA+XG4gICAgICA8YnV0dG9uXG4gICAgICAgICpuZ0Zvcj1cImxldCBidXR0b24gb2YgYnV0dG9uc1wiXG4gICAgICAgIFtuZ1N0eWxlXT1cIlxuICAgICAgICAgIG1lcmdlU3R5bGVzKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAnYWxpZ24taXRlbXMnOiAnY2VudGVyJyxcbiAgICAgICAgICAgICAgcGFkZGluZzogJzEwcHgnLFxuICAgICAgICAgICAgICAnYm9yZGVyLXJhZGl1cyc6ICc1cHgnLFxuICAgICAgICAgICAgICAnbWFyZ2luLXJpZ2h0JzogJzVweCcsXG4gICAgICAgICAgICAgICdtYXJnaW4tbGVmdCc6ICc1cHgnLFxuICAgICAgICAgICAgICAnbWFyZ2luLWJvdHRvbSc6ICc1cHgnLFxuICAgICAgICAgICAgICAnbWFyZ2luLXRvcCc6ICc1cHgnLFxuICAgICAgICAgICAgICBjdXJzb3I6ICdwb2ludGVyJyxcbiAgICAgICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBidXR0b24uc2hvd1xuICAgICAgICAgICAgICAgID8gYnV0dG9uLmJhY2tncm91bmRDb2xvcj8uZGVmYXVsdCB8fCAncmdiYSgyNTUsIDI1NSwgMjU1LCAwLjI1KSdcbiAgICAgICAgICAgICAgICA6ICd0cmFuc3BhcmVudCcsXG4gICAgICAgICAgICAgIGJvcmRlcjogJ25vbmUnLFxuICAgICAgICAgICAgICBkaXNwbGF5OiBidXR0b24uc2hvd1xuICAgICAgICAgICAgICAgID8gJ2ZsZXgnXG4gICAgICAgICAgICAgICAgOiBidXR0b24uaW5BY3RpdmVDb2xvciA9PT0gJ3RyYW5zcGFyZW50JyAmJiBidXR0b24uYWN0aXZlQ29sb3IgPT09ICd0cmFuc3BhcmVudCdcbiAgICAgICAgICAgICAgICA/ICdmbGV4J1xuICAgICAgICAgICAgICAgIDogJ25vbmUnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGlyZWN0aW9uID09PSAndmVydGljYWwnID8geyAnZmxleC1kaXJlY3Rpb24nOiAnY29sdW1uJyB9IDoge31cbiAgICAgICAgICApXG4gICAgICAgIFwiXG4gICAgICAgIChjbGljayk9XCJidXR0b24ub25QcmVzcyA/IGJ1dHRvbi5vblByZXNzKCkgOiBudWxsXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImJ1dHRvbi5kaXNhYmxlZFwiXG4gICAgICA+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJidXR0b24uaWNvblwiPlxuICAgICAgICAgIDxmYS1pY29uXG4gICAgICAgICAgICAqbmdJZj1cImJ1dHRvbi5hY3RpdmVcIlxuICAgICAgICAgICAgW2ljb25dPVwiYnV0dG9uLmFsdGVybmF0ZUljb24gfHwgYnV0dG9uLmljb25cIlxuICAgICAgICAgICAgW3N0eWxlLmNvbG9yXT1cImJ1dHRvbi5hY3RpdmVDb2xvciB8fCAndHJhbnNwYXJlbnQnXCJcbiAgICAgICAgICA+PC9mYS1pY29uPlxuICAgICAgICAgIDxmYS1pY29uXG4gICAgICAgICAgICAqbmdJZj1cIiFidXR0b24uYWN0aXZlXCJcbiAgICAgICAgICAgIFtpY29uXT1cImJ1dHRvbi5pY29uXCJcbiAgICAgICAgICAgIFtzdHlsZS5jb2xvcl09XCJidXR0b24uaW5BY3RpdmVDb2xvciB8fCAndHJhbnNwYXJlbnQnXCJcbiAgICAgICAgICA+PC9mYS1pY29uPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFidXR0b24uaWNvblwiPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJidXR0b24uY3VzdG9tQ29tcG9uZW50XCI+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNDdXN0b21Db21wb25lbnQoYnV0dG9uLmN1c3RvbUNvbXBvbmVudClcIj5cbiAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgICpuZ0NvbXBvbmVudE91dGxldD1cIlxuICAgICAgICAgICAgICAgICAgYnV0dG9uLmN1c3RvbUNvbXBvbmVudC5jb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgICBpbmplY3RvcjogYnV0dG9uLmN1c3RvbUNvbXBvbmVudC5pbmplY3RvclxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAqbmdJZj1cIlxuICAgICAgICAgICAgICAgICFpc0N1c3RvbUNvbXBvbmVudChidXR0b24uY3VzdG9tQ29tcG9uZW50KSAmJlxuICAgICAgICAgICAgICAgICFpc0Z1bmN0aW9uQ29tcG9uZW50KGJ1dHRvbi5jdXN0b21Db21wb25lbnQpXG4gICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDwhLS0gSGFuZGxlIHRoZSBIVE1MRWxlbWVudCBjYXNlLCBlLmcuLCByZW5kZXIgaXQgdXNpbmcgW2lubmVySFRNTF0gLS0+XG4gICAgICAgICAgICAgIDxkaXYgW2lubmVySFRNTF09XCJidXR0b24uY3VzdG9tQ29tcG9uZW50Lm91dGVySFRNTFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8c3BhblxuICAgICAgICAgICpuZ0lmPVwiYnV0dG9uLm5hbWVcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cIntcbiAgICAgICAgICAgIGNvbG9yOiBidXR0b24uY29sb3IgfHwgJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICdmb250LXNpemUnOiAnMTJweCcsXG4gICAgICAgICAgICAnbWFyZ2luLXRvcCc6ICc1cHgnXG4gICAgICAgICAgfVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eyBidXR0b24ubmFtZSB9fVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbXG4gICAgYFxuICAgICAgOmhvc3Qge1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIH1cbiAgICBgLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBDb250cm9sQnV0dG9uc0NvbXBvbmVudFRvdWNoIHtcbiAgQElucHV0KCkgYnV0dG9uczogQnV0dG9uVG91Y2hbXSA9IFtdO1xuICBASW5wdXQoKSBwb3NpdGlvbiA9ICdsZWZ0JztcbiAgQElucHV0KCkgbG9jYXRpb24gPSAndG9wJztcbiAgQElucHV0KCkgZGlyZWN0aW9uID0gJ2hvcml6b250YWwnO1xuICBASW5wdXQoKSBidXR0b25zQ29udGFpbmVyU3R5bGU6IGFueSA9IHt9O1xuICBASW5wdXQoKSBzaG93QXNwZWN0ID0gZmFsc2U7XG5cbiAgZ2V0QWxpZ25tZW50U3R5bGUoKSB7XG4gICAgbGV0IGFsaWdubWVudFN0eWxlOiBhbnkgPSB7fTtcblxuICAgIGlmICh0aGlzLnBvc2l0aW9uID09PSAnbGVmdCcgfHwgdGhpcy5wb3NpdGlvbiA9PT0gJ3JpZ2h0JyB8fCB0aGlzLnBvc2l0aW9uID09PSAnbWlkZGxlJykge1xuICAgICAgYWxpZ25tZW50U3R5bGVbJ2p1c3RpZnktY29udGVudCddID1cbiAgICAgICAgdGhpcy5wb3NpdGlvbiA9PT0gJ2xlZnQnID8gJ2ZsZXgtc3RhcnQnIDogdGhpcy5wb3NpdGlvbiA9PT0gJ3JpZ2h0JyA/ICdmbGV4LWVuZCcgOiAnY2VudGVyJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5sb2NhdGlvbiA9PT0gJ3RvcCcgfHwgdGhpcy5sb2NhdGlvbiA9PT0gJ2JvdHRvbScgfHwgdGhpcy5sb2NhdGlvbiA9PT0gJ2NlbnRlcicpIHtcbiAgICAgIGFsaWdubWVudFN0eWxlWydhbGlnbi1pdGVtcyddID1cbiAgICAgICAgdGhpcy5sb2NhdGlvbiA9PT0gJ3RvcCcgPyAnZmxleC1zdGFydCcgOiB0aGlzLmxvY2F0aW9uID09PSAnYm90dG9tJyA/ICdmbGV4LWVuZCcgOiAnY2VudGVyJztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5kaXJlY3Rpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIGFsaWdubWVudFN0eWxlWydmbGV4LWRpcmVjdGlvbiddID0gJ2NvbHVtbic7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFsaWdubWVudFN0eWxlWydmbGV4LWRpcmVjdGlvbiddID0gJ3Jvdyc7XG4gICAgfVxuXG4gICAgcmV0dXJuIGFsaWdubWVudFN0eWxlO1xuICB9XG5cbiAgbWVyZ2VTdHlsZXMoLi4uc3R5bGVzOiBhbnlbXSkge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKHt9LCAuLi5zdHlsZXMpO1xuICB9XG5cbiAgaXNDdXN0b21Db21wb25lbnQoXG4gICAgY29tcDogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQgfCAoKCkgPT4gSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQpLFxuICApOiBjb21wIGlzIEN1c3RvbUNvbXBvbmVudCB7XG4gICAgcmV0dXJuIChcbiAgICAgIGNvbXAgJiZcbiAgICAgIHR5cGVvZiBjb21wID09PSAnb2JqZWN0JyAmJlxuICAgICAgJ2NvbXBvbmVudCcgaW4gY29tcCAmJlxuICAgICAgdHlwZW9mIGNvbXAuY29tcG9uZW50ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAnaW5qZWN0b3InIGluIGNvbXBcbiAgICApO1xuICB9XG5cbiAgaXNGdW5jdGlvbkNvbXBvbmVudChcbiAgICBjb21wOiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCB8ICgoKSA9PiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCksXG4gICk6IGNvbXAgaXMgKCkgPT4gSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQge1xuICAgIHJldHVybiB0eXBlb2YgY29tcCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxufVxuIl19