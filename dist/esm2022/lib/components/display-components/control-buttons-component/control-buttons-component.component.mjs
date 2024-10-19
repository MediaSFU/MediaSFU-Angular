import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
export class ControlButtonsComponent {
    buttons = [];
    buttonColor = '';
    buttonBackgroundColor = {};
    alignment = 'flex-start';
    vertical = false;
    buttonsContainerStyle = {};
    // Function to get the alignment styles dynamically
    getAlignmentStyle() {
        const alignmentMap = {
            center: { 'justify-content': 'center' },
            'flex-end': { 'justify-content': 'flex-end' },
            'space-between': { 'justify-content': 'space-between' },
            'space-around': { 'justify-content': 'space-around' },
            'space-evenly': { 'justify-content': 'space-evenly' },
            'flex-start': { 'justify-content': 'flex-start' },
        };
        return {
            display: 'flex',
            flexDirection: this.vertical ? 'column' : 'row',
            ...alignmentMap[this.alignment],
        };
    }
    // Utility function to merge multiple styles into one object
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ControlButtonsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: ControlButtonsComponent, isStandalone: true, selector: "app-control-buttons-component", inputs: { buttons: "buttons", buttonColor: "buttonColor", buttonBackgroundColor: "buttonBackgroundColor", alignment: "alignment", vertical: "vertical", buttonsContainerStyle: "buttonsContainerStyle" }, ngImport: i0, template: `
    <div class="container" [ngStyle]="mergeStyles(getAlignmentStyle(), buttonsContainerStyle)">
      <button
        *ngFor="let button of buttons; let i = index"
        class="buttonContainer"
        [ngClass]="{ verticalButton: vertical }"
        [ngStyle]="{
          'background-color': button.show
            ? buttonBackgroundColor?.default || 'transparent'
            : 'transparent',
          display: button.show ? 'flex' : 'none'
        }"
        [disabled]="button.disabled"
        (click)="button.onPress ? button.onPress() : null"
      >
        <!-- Custom component when defined -->
        <ng-container *ngIf="button.customComponent; else iconTemplate">
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

        <!-- Icon logic for active/inactive states -->
        <ng-template #iconTemplate>
          <ng-container *ngIf="button.active && button.alternateIconComponent; else defaultIcon">
            <!-- Alternate icon component when button is active -->
            <ng-container *ngIf="isCustomComponent(button.alternateIconComponent)">
              <ng-container
                *ngComponentOutlet="
                  button.alternateIconComponent.component;
                  injector: button.alternateIconComponent.injector
                "
              ></ng-container>
            </ng-container>
            <ng-container
              *ngIf="
                !isCustomComponent(button.alternateIconComponent) &&
                !isFunctionComponent(button.alternateIconComponent)
              "
            >
              <!-- Handle the HTMLElement case, e.g., render it using [innerHTML] -->
              <div [innerHTML]="button.alternateIconComponent.outerHTML"></div>
            </ng-container>
          </ng-container>

          <!-- Default icon fallback for active/inactive states -->
          <ng-template #defaultIcon>
            <fa-icon
              *ngIf="button.active"
              [icon]="button.alternateIcon! || button.icon"
              [style.color]="button.activeColor || 'transparent'"
            ></fa-icon>
            <fa-icon
              *ngIf="!button.active"
              [icon]="button.icon!"
              [style.color]="button.inActiveColor || '#ffffff'"
            ></fa-icon>
          </ng-template>
        </ng-template>

        <!-- Button text -->
        <span
          *ngIf="button.name"
          class="buttonText"
          [ngStyle]="{ color: button.color || '#ffffff' }"
        >
          {{ button.name }}
        </span>
      </button>
    </div>
  `, isInline: true, styles: [".container{display:flex;width:100%;flex-direction:row;margin-top:0}.buttonContainer{display:flex;align-items:center;justify-content:center;padding:8px;border-radius:5px;margin-right:4px;font-size:medium;border:none}.buttonContainer:hover{cursor:pointer}.verticalButton{flex-direction:column}.buttonText{font-size:12px;margin-top:5px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgComponentOutlet, selector: "[ngComponentOutlet]", inputs: ["ngComponentOutlet", "ngComponentOutletInputs", "ngComponentOutletInjector", "ngComponentOutletContent", "ngComponentOutletNgModule", "ngComponentOutletNgModuleFactory"] }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ControlButtonsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-control-buttons-component', standalone: true, imports: [CommonModule, FontAwesomeModule], template: `
    <div class="container" [ngStyle]="mergeStyles(getAlignmentStyle(), buttonsContainerStyle)">
      <button
        *ngFor="let button of buttons; let i = index"
        class="buttonContainer"
        [ngClass]="{ verticalButton: vertical }"
        [ngStyle]="{
          'background-color': button.show
            ? buttonBackgroundColor?.default || 'transparent'
            : 'transparent',
          display: button.show ? 'flex' : 'none'
        }"
        [disabled]="button.disabled"
        (click)="button.onPress ? button.onPress() : null"
      >
        <!-- Custom component when defined -->
        <ng-container *ngIf="button.customComponent; else iconTemplate">
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

        <!-- Icon logic for active/inactive states -->
        <ng-template #iconTemplate>
          <ng-container *ngIf="button.active && button.alternateIconComponent; else defaultIcon">
            <!-- Alternate icon component when button is active -->
            <ng-container *ngIf="isCustomComponent(button.alternateIconComponent)">
              <ng-container
                *ngComponentOutlet="
                  button.alternateIconComponent.component;
                  injector: button.alternateIconComponent.injector
                "
              ></ng-container>
            </ng-container>
            <ng-container
              *ngIf="
                !isCustomComponent(button.alternateIconComponent) &&
                !isFunctionComponent(button.alternateIconComponent)
              "
            >
              <!-- Handle the HTMLElement case, e.g., render it using [innerHTML] -->
              <div [innerHTML]="button.alternateIconComponent.outerHTML"></div>
            </ng-container>
          </ng-container>

          <!-- Default icon fallback for active/inactive states -->
          <ng-template #defaultIcon>
            <fa-icon
              *ngIf="button.active"
              [icon]="button.alternateIcon! || button.icon"
              [style.color]="button.activeColor || 'transparent'"
            ></fa-icon>
            <fa-icon
              *ngIf="!button.active"
              [icon]="button.icon!"
              [style.color]="button.inActiveColor || '#ffffff'"
            ></fa-icon>
          </ng-template>
        </ng-template>

        <!-- Button text -->
        <span
          *ngIf="button.name"
          class="buttonText"
          [ngStyle]="{ color: button.color || '#ffffff' }"
        >
          {{ button.name }}
        </span>
      </button>
    </div>
  `, styles: [".container{display:flex;width:100%;flex-direction:row;margin-top:0}.buttonContainer{display:flex;align-items:center;justify-content:center;padding:8px;border-radius:5px;margin-right:4px;font-size:medium;border:none}.buttonContainer:hover{cursor:pointer}.verticalButton{flex-direction:column}.buttonText{font-size:12px;margin-top:5px}\n"] }]
        }], propDecorators: { buttons: [{
                type: Input
            }], buttonColor: [{
                type: Input
            }], buttonBackgroundColor: [{
                type: Input
            }], alignment: [{
                type: Input
            }], vertical: [{
                type: Input
            }], buttonsContainerStyle: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJvbC1idXR0b25zLWNvbXBvbmVudC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9kaXNwbGF5LWNvbXBvbmVudHMvY29udHJvbC1idXR0b25zLWNvbXBvbmVudC9jb250cm9sLWJ1dHRvbnMtY29tcG9uZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFZLEtBQUssRUFBUSxNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7Ozs7QUEwSXJFLE1BQU0sT0FBTyx1QkFBdUI7SUFDekIsT0FBTyxHQUFhLEVBQUUsQ0FBQztJQUN2QixXQUFXLEdBQUcsRUFBRSxDQUFDO0lBQ2pCLHFCQUFxQixHQUFRLEVBQUUsQ0FBQztJQUNoQyxTQUFTLEdBQUcsWUFBWSxDQUFDO0lBQ3pCLFFBQVEsR0FBRyxLQUFLLENBQUM7SUFDakIscUJBQXFCLEdBQVEsRUFBRSxDQUFDO0lBRXpDLG1EQUFtRDtJQUNuRCxpQkFBaUI7UUFDZixNQUFNLFlBQVksR0FBUTtZQUN4QixNQUFNLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxRQUFRLEVBQUU7WUFDdkMsVUFBVSxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxFQUFFO1lBQzdDLGVBQWUsRUFBRSxFQUFFLGlCQUFpQixFQUFFLGVBQWUsRUFBRTtZQUN2RCxjQUFjLEVBQUUsRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUU7WUFDckQsY0FBYyxFQUFFLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFO1lBQ3JELFlBQVksRUFBRSxFQUFFLGlCQUFpQixFQUFFLFlBQVksRUFBRTtTQUNsRCxDQUFDO1FBQ0YsT0FBTztZQUNMLE9BQU8sRUFBRSxNQUFNO1lBQ2YsYUFBYSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsS0FBSztZQUMvQyxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDO1NBQ2hDLENBQUM7SUFDSixDQUFDO0lBRUQsNERBQTREO0lBQzVELFdBQVcsQ0FBQyxHQUFHLE1BQWE7UUFDMUIsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFDRCxpQkFBaUIsQ0FDZixJQUEyRTtRQUUzRSxPQUFPLENBQ0wsSUFBSTtZQUNKLE9BQU8sSUFBSSxLQUFLLFFBQVE7WUFDeEIsV0FBVyxJQUFJLElBQUk7WUFDbkIsT0FBTyxJQUFJLENBQUMsU0FBUyxLQUFLLFVBQVU7WUFDcEMsVUFBVSxJQUFJLElBQUksQ0FDbkIsQ0FBQztJQUNKLENBQUM7SUFFRCxtQkFBbUIsQ0FDakIsSUFBMkU7UUFFM0UsT0FBTyxPQUFPLElBQUksS0FBSyxVQUFVLENBQUM7SUFDcEMsQ0FBQzt1R0E3Q1UsdUJBQXVCOzJGQUF2Qix1QkFBdUIsbVNBdkZ4Qjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0ZULHdaQXJGUyxZQUFZLDByQkFBRSxpQkFBaUI7OzJGQXdGOUIsdUJBQXVCO2tCQTNGbkMsU0FBUzsrQkFDRSwrQkFBK0IsY0FDN0IsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDLFlBQ2hDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvRlQ7OEJBSVEsT0FBTztzQkFBZixLQUFLO2dCQUNHLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0cscUJBQXFCO3NCQUE3QixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxxQkFBcUI7c0JBQTdCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEluamVjdG9yLCBJbnB1dCwgVHlwZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgSWNvbkRlZmluaXRpb24gfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEN1c3RvbUNvbXBvbmVudCB7XG4gIGNvbXBvbmVudDogVHlwZTxhbnk+O1xuICBpbmplY3RvcjogSW5qZWN0b3I7XG59XG5leHBvcnQgaW50ZXJmYWNlIEJ1dHRvbiB7XG4gIG5hbWU/OiBzdHJpbmc7XG4gIGljb24/OiBJY29uRGVmaW5pdGlvbjtcbiAgYWx0ZXJuYXRlSWNvbj86IEljb25EZWZpbml0aW9uO1xuICBvblByZXNzPzogKCkgPT4gdm9pZDtcbiAgYWN0aXZlPzogYm9vbGVhbiB8ICgoKSA9PiBib29sZWFuKTtcbiAgYWN0aXZlQ29sb3I/OiBzdHJpbmcgfCAoKCkgPT4gc3RyaW5nKTtcbiAgaW5BY3RpdmVDb2xvcj86IHN0cmluZyB8ICgoKSA9PiBzdHJpbmcpO1xuICBjb2xvcj86IHN0cmluZztcbiAgYmFja2dyb3VuZENvbG9yPzoge1xuICAgIGRlZmF1bHQ/OiBzdHJpbmc7XG4gIH07XG4gIGN1c3RvbUNvbXBvbmVudD86IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50IHwgKCgpID0+IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50KTtcbiAgaWNvbkNvbXBvbmVudD86IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50IHwgKCgpID0+IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50KTtcbiAgYWx0ZXJuYXRlSWNvbkNvbXBvbmVudD86IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50IHwgKCgpID0+IEhUTUxFbGVtZW50IHwgQ3VzdG9tQ29tcG9uZW50KTtcbiAgZGlzYWJsZWQ/OiBib29sZWFuIHwgKCgpID0+IGJvb2xlYW4pO1xuICBzaG93PzogYm9vbGVhbiB8ICgoKSA9PiBib29sZWFuKTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb250cm9sQnV0dG9uc0NvbXBvbmVudE9wdGlvbnMge1xuICBidXR0b25zOiBCdXR0b25bXTtcbiAgYnV0dG9uQ29sb3I/OiBzdHJpbmc7XG4gIGJ1dHRvbkJhY2tncm91bmRDb2xvcj86IHtcbiAgICBkZWZhdWx0Pzogc3RyaW5nO1xuICAgIHByZXNzZWQ/OiBzdHJpbmc7XG4gIH07XG4gIGFsaWdubWVudD86XG4gICAgfCAnZmxleC1zdGFydCdcbiAgICB8ICdjZW50ZXInXG4gICAgfCAnZmxleC1lbmQnXG4gICAgfCAnc3BhY2UtYmV0d2VlbidcbiAgICB8ICdzcGFjZS1hcm91bmQnXG4gICAgfCAnc3BhY2UtZXZlbmx5JztcbiAgdmVydGljYWw/OiBib29sZWFuO1xuICBidXR0b25zQ29udGFpbmVyU3R5bGU/OiBQYXJ0aWFsPENTU1N0eWxlRGVjbGFyYXRpb24+O1xuICBhbHRlcm5hdGVJY29uQ29tcG9uZW50PzogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQ7XG59XG5cbmV4cG9ydCB0eXBlIENvbnRyb2xCdXR0b25zQ29tcG9uZW50VHlwZSA9IChvcHRpb25zOiBDb250cm9sQnV0dG9uc0NvbXBvbmVudE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtY29udHJvbC1idXR0b25zLWNvbXBvbmVudCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8ZGl2IGNsYXNzPVwiY29udGFpbmVyXCIgW25nU3R5bGVdPVwibWVyZ2VTdHlsZXMoZ2V0QWxpZ25tZW50U3R5bGUoKSwgYnV0dG9uc0NvbnRhaW5lclN0eWxlKVwiPlxuICAgICAgPGJ1dHRvblxuICAgICAgICAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIGJ1dHRvbnM7IGxldCBpID0gaW5kZXhcIlxuICAgICAgICBjbGFzcz1cImJ1dHRvbkNvbnRhaW5lclwiXG4gICAgICAgIFtuZ0NsYXNzXT1cInsgdmVydGljYWxCdXR0b246IHZlcnRpY2FsIH1cIlxuICAgICAgICBbbmdTdHlsZV09XCJ7XG4gICAgICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBidXR0b24uc2hvd1xuICAgICAgICAgICAgPyBidXR0b25CYWNrZ3JvdW5kQ29sb3I/LmRlZmF1bHQgfHwgJ3RyYW5zcGFyZW50J1xuICAgICAgICAgICAgOiAndHJhbnNwYXJlbnQnLFxuICAgICAgICAgIGRpc3BsYXk6IGJ1dHRvbi5zaG93ID8gJ2ZsZXgnIDogJ25vbmUnXG4gICAgICAgIH1cIlxuICAgICAgICBbZGlzYWJsZWRdPVwiYnV0dG9uLmRpc2FibGVkXCJcbiAgICAgICAgKGNsaWNrKT1cImJ1dHRvbi5vblByZXNzID8gYnV0dG9uLm9uUHJlc3MoKSA6IG51bGxcIlxuICAgICAgPlxuICAgICAgICA8IS0tIEN1c3RvbSBjb21wb25lbnQgd2hlbiBkZWZpbmVkIC0tPlxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiYnV0dG9uLmN1c3RvbUNvbXBvbmVudDsgZWxzZSBpY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNDdXN0b21Db21wb25lbnQoYnV0dG9uLmN1c3RvbUNvbXBvbmVudClcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgKm5nQ29tcG9uZW50T3V0bGV0PVwiXG4gICAgICAgICAgICAgICAgYnV0dG9uLmN1c3RvbUNvbXBvbmVudC5jb21wb25lbnQ7XG4gICAgICAgICAgICAgICAgaW5qZWN0b3I6IGJ1dHRvbi5jdXN0b21Db21wb25lbnQuaW5qZWN0b3JcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAqbmdJZj1cIlxuICAgICAgICAgICAgICAhaXNDdXN0b21Db21wb25lbnQoYnV0dG9uLmN1c3RvbUNvbXBvbmVudCkgJiZcbiAgICAgICAgICAgICAgIWlzRnVuY3Rpb25Db21wb25lbnQoYnV0dG9uLmN1c3RvbUNvbXBvbmVudClcbiAgICAgICAgICAgIFwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPCEtLSBIYW5kbGUgdGhlIEhUTUxFbGVtZW50IGNhc2UsIGUuZy4sIHJlbmRlciBpdCB1c2luZyBbaW5uZXJIVE1MXSAtLT5cbiAgICAgICAgICAgIDxkaXYgW2lubmVySFRNTF09XCJidXR0b24uY3VzdG9tQ29tcG9uZW50Lm91dGVySFRNTFwiPjwvZGl2PlxuICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICA8IS0tIEljb24gbG9naWMgZm9yIGFjdGl2ZS9pbmFjdGl2ZSBzdGF0ZXMgLS0+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjaWNvblRlbXBsYXRlPlxuICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJidXR0b24uYWN0aXZlICYmIGJ1dHRvbi5hbHRlcm5hdGVJY29uQ29tcG9uZW50OyBlbHNlIGRlZmF1bHRJY29uXCI+XG4gICAgICAgICAgICA8IS0tIEFsdGVybmF0ZSBpY29uIGNvbXBvbmVudCB3aGVuIGJ1dHRvbiBpcyBhY3RpdmUgLS0+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiaXNDdXN0b21Db21wb25lbnQoYnV0dG9uLmFsdGVybmF0ZUljb25Db21wb25lbnQpXCI+XG4gICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAqbmdDb21wb25lbnRPdXRsZXQ9XCJcbiAgICAgICAgICAgICAgICAgIGJ1dHRvbi5hbHRlcm5hdGVJY29uQ29tcG9uZW50LmNvbXBvbmVudDtcbiAgICAgICAgICAgICAgICAgIGluamVjdG9yOiBidXR0b24uYWx0ZXJuYXRlSWNvbkNvbXBvbmVudC5pbmplY3RvclxuICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAqbmdJZj1cIlxuICAgICAgICAgICAgICAgICFpc0N1c3RvbUNvbXBvbmVudChidXR0b24uYWx0ZXJuYXRlSWNvbkNvbXBvbmVudCkgJiZcbiAgICAgICAgICAgICAgICAhaXNGdW5jdGlvbkNvbXBvbmVudChidXR0b24uYWx0ZXJuYXRlSWNvbkNvbXBvbmVudClcbiAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPCEtLSBIYW5kbGUgdGhlIEhUTUxFbGVtZW50IGNhc2UsIGUuZy4sIHJlbmRlciBpdCB1c2luZyBbaW5uZXJIVE1MXSAtLT5cbiAgICAgICAgICAgICAgPGRpdiBbaW5uZXJIVE1MXT1cImJ1dHRvbi5hbHRlcm5hdGVJY29uQ29tcG9uZW50Lm91dGVySFRNTFwiPjwvZGl2PlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgPC9uZy1jb250YWluZXI+XG5cbiAgICAgICAgICA8IS0tIERlZmF1bHQgaWNvbiBmYWxsYmFjayBmb3IgYWN0aXZlL2luYWN0aXZlIHN0YXRlcyAtLT5cbiAgICAgICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRJY29uPlxuICAgICAgICAgICAgPGZhLWljb25cbiAgICAgICAgICAgICAgKm5nSWY9XCJidXR0b24uYWN0aXZlXCJcbiAgICAgICAgICAgICAgW2ljb25dPVwiYnV0dG9uLmFsdGVybmF0ZUljb24hIHx8IGJ1dHRvbi5pY29uXCJcbiAgICAgICAgICAgICAgW3N0eWxlLmNvbG9yXT1cImJ1dHRvbi5hY3RpdmVDb2xvciB8fCAndHJhbnNwYXJlbnQnXCJcbiAgICAgICAgICAgID48L2ZhLWljb24+XG4gICAgICAgICAgICA8ZmEtaWNvblxuICAgICAgICAgICAgICAqbmdJZj1cIiFidXR0b24uYWN0aXZlXCJcbiAgICAgICAgICAgICAgW2ljb25dPVwiYnV0dG9uLmljb24hXCJcbiAgICAgICAgICAgICAgW3N0eWxlLmNvbG9yXT1cImJ1dHRvbi5pbkFjdGl2ZUNvbG9yIHx8ICcjZmZmZmZmJ1wiXG4gICAgICAgICAgICA+PC9mYS1pY29uPlxuICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgPCEtLSBCdXR0b24gdGV4dCAtLT5cbiAgICAgICAgPHNwYW5cbiAgICAgICAgICAqbmdJZj1cImJ1dHRvbi5uYW1lXCJcbiAgICAgICAgICBjbGFzcz1cImJ1dHRvblRleHRcIlxuICAgICAgICAgIFtuZ1N0eWxlXT1cInsgY29sb3I6IGJ1dHRvbi5jb2xvciB8fCAnI2ZmZmZmZicgfVwiXG4gICAgICAgID5cbiAgICAgICAgICB7eyBidXR0b24ubmFtZSB9fVxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L2J1dHRvbj5cbiAgICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVVcmxzOiBbJy4vY29udHJvbC1idXR0b25zLWNvbXBvbmVudC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIENvbnRyb2xCdXR0b25zQ29tcG9uZW50IHtcbiAgQElucHV0KCkgYnV0dG9uczogQnV0dG9uW10gPSBbXTtcbiAgQElucHV0KCkgYnV0dG9uQ29sb3IgPSAnJztcbiAgQElucHV0KCkgYnV0dG9uQmFja2dyb3VuZENvbG9yOiBhbnkgPSB7fTtcbiAgQElucHV0KCkgYWxpZ25tZW50ID0gJ2ZsZXgtc3RhcnQnO1xuICBASW5wdXQoKSB2ZXJ0aWNhbCA9IGZhbHNlO1xuICBASW5wdXQoKSBidXR0b25zQ29udGFpbmVyU3R5bGU6IGFueSA9IHt9O1xuXG4gIC8vIEZ1bmN0aW9uIHRvIGdldCB0aGUgYWxpZ25tZW50IHN0eWxlcyBkeW5hbWljYWxseVxuICBnZXRBbGlnbm1lbnRTdHlsZSgpIHtcbiAgICBjb25zdCBhbGlnbm1lbnRNYXA6IGFueSA9IHtcbiAgICAgIGNlbnRlcjogeyAnanVzdGlmeS1jb250ZW50JzogJ2NlbnRlcicgfSxcbiAgICAgICdmbGV4LWVuZCc6IHsgJ2p1c3RpZnktY29udGVudCc6ICdmbGV4LWVuZCcgfSxcbiAgICAgICdzcGFjZS1iZXR3ZWVuJzogeyAnanVzdGlmeS1jb250ZW50JzogJ3NwYWNlLWJldHdlZW4nIH0sXG4gICAgICAnc3BhY2UtYXJvdW5kJzogeyAnanVzdGlmeS1jb250ZW50JzogJ3NwYWNlLWFyb3VuZCcgfSxcbiAgICAgICdzcGFjZS1ldmVubHknOiB7ICdqdXN0aWZ5LWNvbnRlbnQnOiAnc3BhY2UtZXZlbmx5JyB9LFxuICAgICAgJ2ZsZXgtc3RhcnQnOiB7ICdqdXN0aWZ5LWNvbnRlbnQnOiAnZmxleC1zdGFydCcgfSxcbiAgICB9O1xuICAgIHJldHVybiB7XG4gICAgICBkaXNwbGF5OiAnZmxleCcsXG4gICAgICBmbGV4RGlyZWN0aW9uOiB0aGlzLnZlcnRpY2FsID8gJ2NvbHVtbicgOiAncm93JyxcbiAgICAgIC4uLmFsaWdubWVudE1hcFt0aGlzLmFsaWdubWVudF0sXG4gICAgfTtcbiAgfVxuXG4gIC8vIFV0aWxpdHkgZnVuY3Rpb24gdG8gbWVyZ2UgbXVsdGlwbGUgc3R5bGVzIGludG8gb25lIG9iamVjdFxuICBtZXJnZVN0eWxlcyguLi5zdHlsZXM6IGFueVtdKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIC4uLnN0eWxlcyk7XG4gIH1cbiAgaXNDdXN0b21Db21wb25lbnQoXG4gICAgY29tcDogSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQgfCAoKCkgPT4gSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQpLFxuICApOiBjb21wIGlzIEN1c3RvbUNvbXBvbmVudCB7XG4gICAgcmV0dXJuIChcbiAgICAgIGNvbXAgJiZcbiAgICAgIHR5cGVvZiBjb21wID09PSAnb2JqZWN0JyAmJlxuICAgICAgJ2NvbXBvbmVudCcgaW4gY29tcCAmJlxuICAgICAgdHlwZW9mIGNvbXAuY29tcG9uZW50ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAnaW5qZWN0b3InIGluIGNvbXBcbiAgICApO1xuICB9XG5cbiAgaXNGdW5jdGlvbkNvbXBvbmVudChcbiAgICBjb21wOiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCB8ICgoKSA9PiBIVE1MRWxlbWVudCB8IEN1c3RvbUNvbXBvbmVudCksXG4gICk6IGNvbXAgaXMgKCkgPT4gSFRNTEVsZW1lbnQgfCBDdXN0b21Db21wb25lbnQge1xuICAgIHJldHVybiB0eXBlb2YgY29tcCA9PT0gJ2Z1bmN0aW9uJztcbiAgfVxufVxuIl19