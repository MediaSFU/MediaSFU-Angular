import { Component, Input, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
/**
 * MenuWidget displays an icon with an optional badge counter, used for notifications or alerts.
 *
 * @selector app-menu-widget
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 *
 * @inputs
 * - `icon` (IconDefinition): FontAwesome icon to display.
 * - `iconColor` (string): Color of the icon. Default is 'black'.
 * - `badgeValue` (number): The numeric value displayed within the badge.
 * - `showBadge` (boolean): Controls the visibility of the badge. Default is false.
 *
 * @example
 * ```html
 * <app-menu-widget
 *   [icon]="faBell"
 *   iconColor="blue"
 *   [badgeValue]="5"
 *   [showBadge]="true"
 * ></app-menu-widget>
 * ```
 **/
export class MenuWidget {
    icon;
    iconColor = 'black';
    badgeValue;
    showBadge = false;
    constructor(icon, iconColor, badgeValue, showBadge) {
        this.icon = icon;
        this.iconColor = iconColor;
        this.badgeValue = badgeValue;
        this.showBadge = showBadge;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MenuWidget, deps: [{ token: 'icon' }, { token: 'iconColor' }, { token: 'badgeValue' }, { token: 'showBadge' }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MenuWidget, isStandalone: true, selector: "app-menu-widget", inputs: { icon: "icon", iconColor: "iconColor", badgeValue: "badgeValue", showBadge: "showBadge" }, ngImport: i0, template: `
    <div style="position: relative; display: inline-block;">
      <fa-icon [icon]="icon" size="lg" [ngStyle]="{ color: iconColor }"></fa-icon>
      <div
        style="
      position: absolute;
      top: -8px;
      right: -8px;
      display: flex;
      align-items: center;
      justify-content: center;
    "
      >
        <div
          style="
        background-color: red;
        border-radius: 8px;
        padding: 4px 8px;
        min-width: 16px; /* Ensure a minimum width for consistent circular shape */
        min-height: 16px; /* Ensure a minimum height for consistent circular shape */
        display: flex;
        align-items: center;
        justify-content: center;
      "
          *ngIf="showBadge"
        >
          <span style="color: white; font-size: 8px; font-weight: bold;">
            {{ badgeValue }}
          </span>
        </div>
      </div>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MenuWidget, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-menu-widget',
                    standalone: true,
                    template: `
    <div style="position: relative; display: inline-block;">
      <fa-icon [icon]="icon" size="lg" [ngStyle]="{ color: iconColor }"></fa-icon>
      <div
        style="
      position: absolute;
      top: -8px;
      right: -8px;
      display: flex;
      align-items: center;
      justify-content: center;
    "
      >
        <div
          style="
        background-color: red;
        border-radius: 8px;
        padding: 4px 8px;
        min-width: 16px; /* Ensure a minimum width for consistent circular shape */
        min-height: 16px; /* Ensure a minimum height for consistent circular shape */
        display: flex;
        align-items: center;
        justify-content: center;
      "
          *ngIf="showBadge"
        >
          <span style="color: white; font-size: 8px; font-weight: bold;">
            {{ badgeValue }}
          </span>
        </div>
      </div>
    </div>
  `,
                    imports: [CommonModule, FontAwesomeModule],
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['icon']
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['iconColor']
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['badgeValue']
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['showBadge']
                }] }], propDecorators: { icon: [{
                type: Input
            }], iconColor: [{
                type: Input
            }], badgeValue: [{
                type: Input
            }], showBadge: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS13aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtd2lkZ2V0cy9tZW51LXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7OztBQUVyRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXNCSTtBQXdDSixNQUFNLE9BQU8sVUFBVTtJQUNaLElBQUksQ0FBa0I7SUFDdEIsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUNwQixVQUFVLENBQVU7SUFDcEIsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUUzQixZQUNrQixJQUFvQixFQUNmLFNBQWlCLEVBQ2hCLFVBQWtCLEVBQ25CLFNBQWtCO1FBRXZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7dUdBaEJVLFVBQVUsa0JBT1gsTUFBTSxhQUNOLFdBQVcsYUFDWCxZQUFZLGFBQ1osV0FBVzsyRkFWVixVQUFVLCtLQW5DWDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ1QsMkRBQ1MsWUFBWSx1TkFBRSxpQkFBaUI7OzJGQUU5QixVQUFVO2tCQXRDdEIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDVDtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUM7aUJBQzNDOzswQkFRSSxNQUFNOzJCQUFDLE1BQU07OzBCQUNiLE1BQU07MkJBQUMsV0FBVzs7MEJBQ2xCLE1BQU07MkJBQUMsWUFBWTs7MEJBQ25CLE1BQU07MkJBQUMsV0FBVzt5Q0FUWixJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcblxuLyoqXG4gKiBNZW51V2lkZ2V0IGRpc3BsYXlzIGFuIGljb24gd2l0aCBhbiBvcHRpb25hbCBiYWRnZSBjb3VudGVyLCB1c2VkIGZvciBub3RpZmljYXRpb25zIG9yIGFsZXJ0cy5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLW1lbnUtd2lkZ2V0XG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXG4gKlxuICogQGlucHV0c1xuICogLSBgaWNvbmAgKEljb25EZWZpbml0aW9uKTogRm9udEF3ZXNvbWUgaWNvbiB0byBkaXNwbGF5LlxuICogLSBgaWNvbkNvbG9yYCAoc3RyaW5nKTogQ29sb3Igb2YgdGhlIGljb24uIERlZmF1bHQgaXMgJ2JsYWNrJy5cbiAqIC0gYGJhZGdlVmFsdWVgIChudW1iZXIpOiBUaGUgbnVtZXJpYyB2YWx1ZSBkaXNwbGF5ZWQgd2l0aGluIHRoZSBiYWRnZS5cbiAqIC0gYHNob3dCYWRnZWAgKGJvb2xlYW4pOiBDb250cm9scyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgYmFkZ2UuIERlZmF1bHQgaXMgZmFsc2UuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtbWVudS13aWRnZXRcbiAqICAgW2ljb25dPVwiZmFCZWxsXCJcbiAqICAgaWNvbkNvbG9yPVwiYmx1ZVwiXG4gKiAgIFtiYWRnZVZhbHVlXT1cIjVcIlxuICogICBbc2hvd0JhZGdlXT1cInRydWVcIlxuICogPjwvYXBwLW1lbnUtd2lkZ2V0PlxuICogYGBgXG4gKiovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tZW51LXdpZGdldCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgZGlzcGxheTogaW5saW5lLWJsb2NrO1wiPlxuICAgICAgPGZhLWljb24gW2ljb25dPVwiaWNvblwiIHNpemU9XCJsZ1wiIFtuZ1N0eWxlXT1cInsgY29sb3I6IGljb25Db2xvciB9XCI+PC9mYS1pY29uPlxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT1cIlxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAtOHB4O1xuICAgICAgcmlnaHQ6IC04cHg7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIFwiXG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT1cIlxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgICAgbWluLXdpZHRoOiAxNnB4OyAvKiBFbnN1cmUgYSBtaW5pbXVtIHdpZHRoIGZvciBjb25zaXN0ZW50IGNpcmN1bGFyIHNoYXBlICovXG4gICAgICAgIG1pbi1oZWlnaHQ6IDE2cHg7IC8qIEVuc3VyZSBhIG1pbmltdW0gaGVpZ2h0IGZvciBjb25zaXN0ZW50IGNpcmN1bGFyIHNoYXBlICovXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgXCJcbiAgICAgICAgICAqbmdJZj1cInNob3dCYWRnZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiB3aGl0ZTsgZm9udC1zaXplOiA4cHg7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPlxuICAgICAgICAgICAge3sgYmFkZ2VWYWx1ZSB9fVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBNZW51V2lkZ2V0IHtcbiAgQElucHV0KCkgaWNvbiE6IEljb25EZWZpbml0aW9uO1xuICBASW5wdXQoKSBpY29uQ29sb3IgPSAnYmxhY2snO1xuICBASW5wdXQoKSBiYWRnZVZhbHVlITogbnVtYmVyO1xuICBASW5wdXQoKSBzaG93QmFkZ2UgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdpY29uJykgaWNvbjogSWNvbkRlZmluaXRpb24sXG4gICAgQEluamVjdCgnaWNvbkNvbG9yJykgaWNvbkNvbG9yOiBzdHJpbmcsXG4gICAgQEluamVjdCgnYmFkZ2VWYWx1ZScpIGJhZGdlVmFsdWU6IG51bWJlcixcbiAgICBASW5qZWN0KCdzaG93QmFkZ2UnKSBzaG93QmFkZ2U6IGJvb2xlYW4sXG4gICkge1xuICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgdGhpcy5pY29uQ29sb3IgPSBpY29uQ29sb3I7XG4gICAgdGhpcy5iYWRnZVZhbHVlID0gYmFkZ2VWYWx1ZTtcbiAgICB0aGlzLnNob3dCYWRnZSA9IHNob3dCYWRnZTtcbiAgfVxufVxuIl19