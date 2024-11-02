import { Component, Input, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
/**
 * MenuParticipantsWidget displays an icon and a counter for participants in a compact, customizable widget.
 *
 * @selector app-menu-participants-widget
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 *
 * @inputs
 * - `icon` (IconDefinition): The FontAwesome icon to display.
 * - `iconColor` (string): The color of the icon. Default is 'black'.
 * - `participantsCounter` (number): The number of participants displayed next to the icon.
 *
 * @example
 * ```html
 * <app-menu-participants-widget
 *   [icon]="faUsers"
 *   iconColor="blue"
 *   [participantsCounter]="10"
 * ></app-menu-participants-widget>
 * ```
 **/
export class MenuParticipantsWidget {
    icon;
    iconColor = 'black';
    participantsCounter;
    constructor(icon, iconColor, participantsCounter) {
        this.icon = icon;
        this.iconColor = iconColor;
        this.participantsCounter = participantsCounter;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MenuParticipantsWidget, deps: [{ token: 'icon' }, { token: 'iconColor' }, { token: 'participantsCounter' }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MenuParticipantsWidget, isStandalone: true, selector: "app-menu-participants-widget", inputs: { icon: "icon", iconColor: "iconColor", participantsCounter: "participantsCounter" }, ngImport: i0, template: `
    <div
      style="background-color: transparent; border-width: 0; padding: 0; margin: 5px; display: flex; flex-direction: row; align-items: center; justify-content: center;"
    >
      <fa-icon [icon]="icon" size="lg" [ngStyle]="{ color: iconColor }"></fa-icon>
      <span style="background-color: transparent; border-width: 0; padding: 0; margin: 0;">
        {{ participantsCounter }}
      </span>
    </div>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MenuParticipantsWidget, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-menu-participants-widget',
                    standalone: true,
                    template: `
    <div
      style="background-color: transparent; border-width: 0; padding: 0; margin: 5px; display: flex; flex-direction: row; align-items: center; justify-content: center;"
    >
      <fa-icon [icon]="icon" size="lg" [ngStyle]="{ color: iconColor }"></fa-icon>
      <span style="background-color: transparent; border-width: 0; padding: 0; margin: 0;">
        {{ participantsCounter }}
      </span>
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
                    args: ['participantsCounter']
                }] }], propDecorators: { icon: [{
                type: Input
            }], iconColor: [{
                type: Input
            }], participantsCounter: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1wYXJ0aWNpcGFudHMtd2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvbWVudS1wYXJ0aWNpcGFudHMtd2lkZ2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7O0FBR3JFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQW9CSTtBQWlCSixNQUFNLE9BQU8sc0JBQXNCO0lBQ3hCLElBQUksQ0FBa0I7SUFDdEIsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUNwQixtQkFBbUIsQ0FBVTtJQUV0QyxZQUNrQixJQUFvQixFQUNmLFNBQWlCLEVBQ1AsbUJBQTJCO1FBRTFELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztJQUNqRCxDQUFDO3VHQWJVLHNCQUFzQixrQkFNdkIsTUFBTSxhQUNOLFdBQVcsYUFDWCxxQkFBcUI7MkZBUnBCLHNCQUFzQixzTEFadkI7Ozs7Ozs7OztHQVNULDJEQUNTLFlBQVksbUhBQUUsaUJBQWlCOzsyRkFFOUIsc0JBQXNCO2tCQWZsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUU7Ozs7Ozs7OztHQVNUO29CQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQztpQkFDM0M7OzBCQU9JLE1BQU07MkJBQUMsTUFBTTs7MEJBQ2IsTUFBTTsyQkFBQyxXQUFXOzswQkFDbEIsTUFBTTsyQkFBQyxxQkFBcUI7eUNBUHRCLElBQUk7c0JBQVosS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgSWNvbkRlZmluaXRpb24gfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuXG4vKipcbiAqIE1lbnVQYXJ0aWNpcGFudHNXaWRnZXQgZGlzcGxheXMgYW4gaWNvbiBhbmQgYSBjb3VudGVyIGZvciBwYXJ0aWNpcGFudHMgaW4gYSBjb21wYWN0LCBjdXN0b21pemFibGUgd2lkZ2V0LlxuICpcbiAqIEBzZWxlY3RvciBhcHAtbWVudS1wYXJ0aWNpcGFudHMtd2lkZ2V0XG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXG4gKlxuICogQGlucHV0c1xuICogLSBgaWNvbmAgKEljb25EZWZpbml0aW9uKTogVGhlIEZvbnRBd2Vzb21lIGljb24gdG8gZGlzcGxheS5cbiAqIC0gYGljb25Db2xvcmAgKHN0cmluZyk6IFRoZSBjb2xvciBvZiB0aGUgaWNvbi4gRGVmYXVsdCBpcyAnYmxhY2snLlxuICogLSBgcGFydGljaXBhbnRzQ291bnRlcmAgKG51bWJlcik6IFRoZSBudW1iZXIgb2YgcGFydGljaXBhbnRzIGRpc3BsYXllZCBuZXh0IHRvIHRoZSBpY29uLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLW1lbnUtcGFydGljaXBhbnRzLXdpZGdldFxuICogICBbaWNvbl09XCJmYVVzZXJzXCJcbiAqICAgaWNvbkNvbG9yPVwiYmx1ZVwiXG4gKiAgIFtwYXJ0aWNpcGFudHNDb3VudGVyXT1cIjEwXCJcbiAqID48L2FwcC1tZW51LXBhcnRpY2lwYW50cy13aWRnZXQ+XG4gKiBgYGBcbiAqKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1lbnUtcGFydGljaXBhbnRzLXdpZGdldCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGRpdlxuICAgICAgc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDsgYm9yZGVyLXdpZHRoOiAwOyBwYWRkaW5nOiAwOyBtYXJnaW46IDVweDsgZGlzcGxheTogZmxleDsgZmxleC1kaXJlY3Rpb246IHJvdzsgYWxpZ24taXRlbXM6IGNlbnRlcjsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XCJcbiAgICA+XG4gICAgICA8ZmEtaWNvbiBbaWNvbl09XCJpY29uXCIgc2l6ZT1cImxnXCIgW25nU3R5bGVdPVwieyBjb2xvcjogaWNvbkNvbG9yIH1cIj48L2ZhLWljb24+XG4gICAgICA8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyBib3JkZXItd2lkdGg6IDA7IHBhZGRpbmc6IDA7IG1hcmdpbjogMDtcIj5cbiAgICAgICAge3sgcGFydGljaXBhbnRzQ291bnRlciB9fVxuICAgICAgPC9zcGFuPlxuICAgIDwvZGl2PlxuICBgLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVQYXJ0aWNpcGFudHNXaWRnZXQge1xuICBASW5wdXQoKSBpY29uITogSWNvbkRlZmluaXRpb247XG4gIEBJbnB1dCgpIGljb25Db2xvciA9ICdibGFjayc7XG4gIEBJbnB1dCgpIHBhcnRpY2lwYW50c0NvdW50ZXIhOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnaWNvbicpIGljb246IEljb25EZWZpbml0aW9uLFxuICAgIEBJbmplY3QoJ2ljb25Db2xvcicpIGljb25Db2xvcjogc3RyaW5nLFxuICAgIEBJbmplY3QoJ3BhcnRpY2lwYW50c0NvdW50ZXInKSBwYXJ0aWNpcGFudHNDb3VudGVyOiBudW1iZXIsXG4gICkge1xuICAgIHRoaXMuaWNvbiA9IGljb247XG4gICAgdGhpcy5pY29uQ29sb3IgPSBpY29uQ29sb3I7XG4gICAgdGhpcy5wYXJ0aWNpcGFudHNDb3VudGVyID0gcGFydGljaXBhbnRzQ291bnRlcjtcbiAgfVxufVxuIl19