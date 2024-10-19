import { Component, Input, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1wYXJ0aWNpcGFudHMtd2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvbWVudS1wYXJ0aWNpcGFudHMtd2lkZ2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDOzs7O0FBa0JyRSxNQUFNLE9BQU8sc0JBQXNCO0lBQ3hCLElBQUksQ0FBa0I7SUFDdEIsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUNwQixtQkFBbUIsQ0FBVTtJQUV0QyxZQUNrQixJQUFvQixFQUNmLFNBQWlCLEVBQ1AsbUJBQTJCO1FBRTFELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxtQkFBbUIsQ0FBQztJQUNqRCxDQUFDO3VHQWJVLHNCQUFzQixrQkFNdkIsTUFBTSxhQUNOLFdBQVcsYUFDWCxxQkFBcUI7MkZBUnBCLHNCQUFzQixzTEFadkI7Ozs7Ozs7OztHQVNULDJEQUNTLFlBQVksbUhBQUUsaUJBQWlCOzsyRkFFOUIsc0JBQXNCO2tCQWZsQyxTQUFTO21CQUFDO29CQUNULFFBQVEsRUFBRSw4QkFBOEI7b0JBQ3hDLFVBQVUsRUFBRSxJQUFJO29CQUNoQixRQUFRLEVBQUU7Ozs7Ozs7OztHQVNUO29CQUNELE9BQU8sRUFBRSxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQztpQkFDM0M7OzBCQU9JLE1BQU07MkJBQUMsTUFBTTs7MEJBQ2IsTUFBTTsyQkFBQyxXQUFXOzswQkFDbEIsTUFBTTsyQkFBQyxxQkFBcUI7eUNBUHRCLElBQUk7c0JBQVosS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLG1CQUFtQjtzQkFBM0IsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIEluamVjdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgSWNvbkRlZmluaXRpb24gfSBmcm9tICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtc3ZnLWNvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWVudS1wYXJ0aWNpcGFudHMtd2lkZ2V0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2XG4gICAgICBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50OyBib3JkZXItd2lkdGg6IDA7IHBhZGRpbmc6IDA7IG1hcmdpbjogNXB4OyBkaXNwbGF5OiBmbGV4OyBmbGV4LWRpcmVjdGlvbjogcm93OyBhbGlnbi1pdGVtczogY2VudGVyOyBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcIlxuICAgID5cbiAgICAgIDxmYS1pY29uIFtpY29uXT1cImljb25cIiBzaXplPVwibGdcIiBbbmdTdHlsZV09XCJ7IGNvbG9yOiBpY29uQ29sb3IgfVwiPjwvZmEtaWNvbj5cbiAgICAgIDxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7IGJvcmRlci13aWR0aDogMDsgcGFkZGluZzogMDsgbWFyZ2luOiAwO1wiPlxuICAgICAgICB7eyBwYXJ0aWNpcGFudHNDb3VudGVyIH19XG4gICAgICA8L3NwYW4+XG4gICAgPC9kaXY+XG4gIGAsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgTWVudVBhcnRpY2lwYW50c1dpZGdldCB7XG4gIEBJbnB1dCgpIGljb24hOiBJY29uRGVmaW5pdGlvbjtcbiAgQElucHV0KCkgaWNvbkNvbG9yID0gJ2JsYWNrJztcbiAgQElucHV0KCkgcGFydGljaXBhbnRzQ291bnRlciE6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdpY29uJykgaWNvbjogSWNvbkRlZmluaXRpb24sXG4gICAgQEluamVjdCgnaWNvbkNvbG9yJykgaWNvbkNvbG9yOiBzdHJpbmcsXG4gICAgQEluamVjdCgncGFydGljaXBhbnRzQ291bnRlcicpIHBhcnRpY2lwYW50c0NvdW50ZXI6IG51bWJlcixcbiAgKSB7XG4gICAgdGhpcy5pY29uID0gaWNvbjtcbiAgICB0aGlzLmljb25Db2xvciA9IGljb25Db2xvcjtcbiAgICB0aGlzLnBhcnRpY2lwYW50c0NvdW50ZXIgPSBwYXJ0aWNpcGFudHNDb3VudGVyO1xuICB9XG59XG4iXX0=