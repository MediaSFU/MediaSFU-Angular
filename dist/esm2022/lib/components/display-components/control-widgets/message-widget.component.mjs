import { Component, Input, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
/**
 * MessageWidget displays an icon with an optional badge counter, useful for unread message notifications.
 *
 * @selector app-message-widget
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 *
 * @inputs
 * - `icon` (IconDefinition): FontAwesome icon to represent the message feature.
 * - `iconColor` (string): Color of the icon. Default is 'black'.
 * - `badgeValue` (number): Numeric value displayed in the badge, e.g., unread message count.
 * - `showBadge` (boolean): Controls the visibility of the badge. Default is false.
 *
 * @example
 * ```html
 * <app-message-widget
 *   [icon]="faEnvelope"
 *   iconColor="blue"
 *   [badgeValue]="3"
 *   [showBadge]="true"
 * ></app-message-widget>
 * ```
 **/
export class MessageWidget {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MessageWidget, deps: [{ token: 'icon' }, { token: 'iconColor' }, { token: 'badgeValue' }, { token: 'showBadge' }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MessageWidget, isStandalone: true, selector: "app-message-widget", inputs: { icon: "icon", iconColor: "iconColor", badgeValue: "badgeValue", showBadge: "showBadge" }, ngImport: i0, template: `
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
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MessageWidget, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-message-widget',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS13aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtd2lkZ2V0cy9tZXNzYWdlLXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7OztBQUdyRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXNCSTtBQXdDSixNQUFNLE9BQU8sYUFBYTtJQUNmLElBQUksQ0FBa0I7SUFDdEIsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUNwQixVQUFVLENBQVU7SUFDcEIsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUUzQixZQUNrQixJQUFvQixFQUNmLFNBQWlCLEVBQ2hCLFVBQWtCLEVBQ25CLFNBQWtCO1FBRXZDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7dUdBaEJVLGFBQWEsa0JBT2QsTUFBTSxhQUNOLFdBQVcsYUFDWCxZQUFZLGFBQ1osV0FBVzsyRkFWVixhQUFhLGtMQW5DZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ1QsMkRBQ1MsWUFBWSx1TkFBRSxpQkFBaUI7OzJGQUU5QixhQUFhO2tCQXRDekIsU0FBUzttQkFBQztvQkFDVCxRQUFRLEVBQUUsb0JBQW9CO29CQUM5QixVQUFVLEVBQUUsSUFBSTtvQkFDaEIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWdDVDtvQkFDRCxPQUFPLEVBQUUsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUM7aUJBQzNDOzswQkFRSSxNQUFNOzJCQUFDLE1BQU07OzBCQUNiLE1BQU07MkJBQUMsV0FBVzs7MEJBQ2xCLE1BQU07MkJBQUMsWUFBWTs7MEJBQ25CLE1BQU07MkJBQUMsV0FBVzt5Q0FUWixJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csU0FBUztzQkFBakIsS0FBSztnQkFDRyxVQUFVO3NCQUFsQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcblxuXG4vKipcbiAqIE1lc3NhZ2VXaWRnZXQgZGlzcGxheXMgYW4gaWNvbiB3aXRoIGFuIG9wdGlvbmFsIGJhZGdlIGNvdW50ZXIsIHVzZWZ1bCBmb3IgdW5yZWFkIG1lc3NhZ2Ugbm90aWZpY2F0aW9ucy5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLW1lc3NhZ2Utd2lkZ2V0XG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXG4gKlxuICogQGlucHV0c1xuICogLSBgaWNvbmAgKEljb25EZWZpbml0aW9uKTogRm9udEF3ZXNvbWUgaWNvbiB0byByZXByZXNlbnQgdGhlIG1lc3NhZ2UgZmVhdHVyZS5cbiAqIC0gYGljb25Db2xvcmAgKHN0cmluZyk6IENvbG9yIG9mIHRoZSBpY29uLiBEZWZhdWx0IGlzICdibGFjaycuXG4gKiAtIGBiYWRnZVZhbHVlYCAobnVtYmVyKTogTnVtZXJpYyB2YWx1ZSBkaXNwbGF5ZWQgaW4gdGhlIGJhZGdlLCBlLmcuLCB1bnJlYWQgbWVzc2FnZSBjb3VudC5cbiAqIC0gYHNob3dCYWRnZWAgKGJvb2xlYW4pOiBDb250cm9scyB0aGUgdmlzaWJpbGl0eSBvZiB0aGUgYmFkZ2UuIERlZmF1bHQgaXMgZmFsc2UuXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtbWVzc2FnZS13aWRnZXRcbiAqICAgW2ljb25dPVwiZmFFbnZlbG9wZVwiXG4gKiAgIGljb25Db2xvcj1cImJsdWVcIlxuICogICBbYmFkZ2VWYWx1ZV09XCIzXCJcbiAqICAgW3Nob3dCYWRnZV09XCJ0cnVlXCJcbiAqID48L2FwcC1tZXNzYWdlLXdpZGdldD5cbiAqIGBgYFxuICoqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWVzc2FnZS13aWRnZXQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICB0ZW1wbGF0ZTogYFxuICAgIDxkaXYgc3R5bGU9XCJwb3NpdGlvbjogcmVsYXRpdmU7IGRpc3BsYXk6IGlubGluZS1ibG9jaztcIj5cbiAgICAgIDxmYS1pY29uIFtpY29uXT1cImljb25cIiBzaXplPVwibGdcIiBbbmdTdHlsZV09XCJ7IGNvbG9yOiBpY29uQ29sb3IgfVwiPjwvZmEtaWNvbj5cbiAgICAgIDxkaXZcbiAgICAgICAgc3R5bGU9XCJcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICAgIHRvcDogLThweDtcbiAgICAgIHJpZ2h0OiAtOHB4O1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICBcIlxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgc3R5bGU9XCJcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmVkO1xuICAgICAgICBib3JkZXItcmFkaXVzOiA4cHg7XG4gICAgICAgIHBhZGRpbmc6IDRweCA4cHg7XG4gICAgICAgIG1pbi13aWR0aDogMTZweDsgLyogRW5zdXJlIGEgbWluaW11bSB3aWR0aCBmb3IgY29uc2lzdGVudCBjaXJjdWxhciBzaGFwZSAqL1xuICAgICAgICBtaW4taGVpZ2h0OiAxNnB4OyAvKiBFbnN1cmUgYSBtaW5pbXVtIGhlaWdodCBmb3IgY29uc2lzdGVudCBjaXJjdWxhciBzaGFwZSAqL1xuICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIFwiXG4gICAgICAgICAgKm5nSWY9XCJzaG93QmFkZ2VcIlxuICAgICAgICA+XG4gICAgICAgICAgPHNwYW4gc3R5bGU9XCJjb2xvcjogd2hpdGU7IGZvbnQtc2l6ZTogOHB4OyBmb250LXdlaWdodDogYm9sZDtcIj5cbiAgICAgICAgICAgIHt7IGJhZGdlVmFsdWUgfX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTWVzc2FnZVdpZGdldCB7XG4gIEBJbnB1dCgpIGljb24hOiBJY29uRGVmaW5pdGlvbjtcbiAgQElucHV0KCkgaWNvbkNvbG9yID0gJ2JsYWNrJztcbiAgQElucHV0KCkgYmFkZ2VWYWx1ZSE6IG51bWJlcjtcbiAgQElucHV0KCkgc2hvd0JhZGdlID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnaWNvbicpIGljb246IEljb25EZWZpbml0aW9uLFxuICAgIEBJbmplY3QoJ2ljb25Db2xvcicpIGljb25Db2xvcjogc3RyaW5nLFxuICAgIEBJbmplY3QoJ2JhZGdlVmFsdWUnKSBiYWRnZVZhbHVlOiBudW1iZXIsXG4gICAgQEluamVjdCgnc2hvd0JhZGdlJykgc2hvd0JhZGdlOiBib29sZWFuLFxuICApIHtcbiAgICB0aGlzLmljb24gPSBpY29uO1xuICAgIHRoaXMuaWNvbkNvbG9yID0gaWNvbkNvbG9yO1xuICAgIHRoaXMuYmFkZ2VWYWx1ZSA9IGJhZGdlVmFsdWU7XG4gICAgdGhpcy5zaG93QmFkZ2UgPSBzaG93QmFkZ2U7XG4gIH1cbn1cbiJdfQ==