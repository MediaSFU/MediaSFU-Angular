import { Component, Input, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS13aWRnZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvZGlzcGxheS1jb21wb25lbnRzL2NvbnRyb2wtd2lkZ2V0cy9tZXNzYWdlLXdpZGdldC5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRXpELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQzs7OztBQXdDckUsTUFBTSxPQUFPLGFBQWE7SUFDZixJQUFJLENBQWtCO0lBQ3RCLFNBQVMsR0FBRyxPQUFPLENBQUM7SUFDcEIsVUFBVSxDQUFVO0lBQ3BCLFNBQVMsR0FBRyxLQUFLLENBQUM7SUFFM0IsWUFDa0IsSUFBb0IsRUFDZixTQUFpQixFQUNoQixVQUFrQixFQUNuQixTQUFrQjtRQUV2QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUM3QixDQUFDO3VHQWhCVSxhQUFhLGtCQU9kLE1BQU0sYUFDTixXQUFXLGFBQ1gsWUFBWSxhQUNaLFdBQVc7MkZBVlYsYUFBYSxrTEFuQ2Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBZ0NULDJEQUNTLFlBQVksdU5BQUUsaUJBQWlCOzsyRkFFOUIsYUFBYTtrQkF0Q3pCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLG9CQUFvQjtvQkFDOUIsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ1Q7b0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDO2lCQUMzQzs7MEJBUUksTUFBTTsyQkFBQyxNQUFNOzswQkFDYixNQUFNOzJCQUFDLFdBQVc7OzBCQUNsQixNQUFNOzJCQUFDLFlBQVk7OzBCQUNuQixNQUFNOzJCQUFDLFdBQVc7eUNBVFosSUFBSTtzQkFBWixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csVUFBVTtzQkFBbEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgSW5qZWN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBJY29uRGVmaW5pdGlvbiB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1zdmctY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1tZXNzYWdlLXdpZGdldCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdiBzdHlsZT1cInBvc2l0aW9uOiByZWxhdGl2ZTsgZGlzcGxheTogaW5saW5lLWJsb2NrO1wiPlxuICAgICAgPGZhLWljb24gW2ljb25dPVwiaWNvblwiIHNpemU9XCJsZ1wiIFtuZ1N0eWxlXT1cInsgY29sb3I6IGljb25Db2xvciB9XCI+PC9mYS1pY29uPlxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT1cIlxuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgdG9wOiAtOHB4O1xuICAgICAgcmlnaHQ6IC04cHg7XG4gICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIFwiXG4gICAgICA+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBzdHlsZT1cIlxuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiByZWQ7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDhweDtcbiAgICAgICAgcGFkZGluZzogNHB4IDhweDtcbiAgICAgICAgbWluLXdpZHRoOiAxNnB4OyAvKiBFbnN1cmUgYSBtaW5pbXVtIHdpZHRoIGZvciBjb25zaXN0ZW50IGNpcmN1bGFyIHNoYXBlICovXG4gICAgICAgIG1pbi1oZWlnaHQ6IDE2cHg7IC8qIEVuc3VyZSBhIG1pbmltdW0gaGVpZ2h0IGZvciBjb25zaXN0ZW50IGNpcmN1bGFyIHNoYXBlICovXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgICAgXCJcbiAgICAgICAgICAqbmdJZj1cInNob3dCYWRnZVwiXG4gICAgICAgID5cbiAgICAgICAgICA8c3BhbiBzdHlsZT1cImNvbG9yOiB3aGl0ZTsgZm9udC1zaXplOiA4cHg7IGZvbnQtd2VpZ2h0OiBib2xkO1wiPlxuICAgICAgICAgICAge3sgYmFkZ2VWYWx1ZSB9fVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBNZXNzYWdlV2lkZ2V0IHtcbiAgQElucHV0KCkgaWNvbiE6IEljb25EZWZpbml0aW9uO1xuICBASW5wdXQoKSBpY29uQ29sb3IgPSAnYmxhY2snO1xuICBASW5wdXQoKSBiYWRnZVZhbHVlITogbnVtYmVyO1xuICBASW5wdXQoKSBzaG93QmFkZ2UgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdpY29uJykgaWNvbjogSWNvbkRlZmluaXRpb24sXG4gICAgQEluamVjdCgnaWNvbkNvbG9yJykgaWNvbkNvbG9yOiBzdHJpbmcsXG4gICAgQEluamVjdCgnYmFkZ2VWYWx1ZScpIGJhZGdlVmFsdWU6IG51bWJlcixcbiAgICBASW5qZWN0KCdzaG93QmFkZ2UnKSBzaG93QmFkZ2U6IGJvb2xlYW4sXG4gICkge1xuICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgdGhpcy5pY29uQ29sb3IgPSBpY29uQ29sb3I7XG4gICAgdGhpcy5iYWRnZVZhbHVlID0gYmFkZ2VWYWx1ZTtcbiAgICB0aGlzLnNob3dCYWRnZSA9IHNob3dCYWRnZTtcbiAgfVxufVxuIl19