import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlButtonsAltComponent } from '../control-buttons-alt-component/control-buttons-alt-component.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
/**
 * MenuRecordWidget is a configurable widget that displays a set of record control buttons, with customizable icon, color, and actions.
 *
 * @selector app-menu-record-widget
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, ControlButtonsAltComponent
 *
 * @inputs
 * - `buttons` (RecordButton[]): Array of record button configurations, each with properties for icon, active state, colors, and actions.
 * - `direction` ('horizontal' | 'vertical'): Layout direction for the buttons. Default is 'horizontal'.
 *
 * @example
 * ```html
 * <app-menu-record-widget
 *   [buttons]="[
 *     { icon: faCircle, text: 'Record', onPress: startRecording, activeColor: 'red' },
 *     { icon: faStop, text: 'Stop', onPress: stopRecording, inActiveColor: 'gray' }
 *   ]"
 *   direction="horizontal"
 * ></app-menu-record-widget>
 * ```
 **/
export class MenuRecordWidget {
    buttons = [];
    direction = 'horizontal';
    constructor(buttons, direction) {
        this.buttons = buttons;
        this.direction = direction;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MenuRecordWidget, deps: [{ token: 'buttons' }, { token: 'direction' }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MenuRecordWidget, isStandalone: true, selector: "app-menu-record-widget", ngImport: i0, template: `
    <app-control-buttons-alt-component
      [buttons]="buttons"
      [direction]="direction"
      [showAspect]="true"
    ></app-control-buttons-alt-component>
  `, isInline: true, dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: ControlButtonsAltComponent, selector: "app-control-buttons-alt-component", inputs: ["buttons", "position", "location", "direction", "buttonsContainerStyle", "showAspect"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MenuRecordWidget, decorators: [{
            type: Component,
            args: [{
                    selector: 'app-menu-record-widget',
                    standalone: true,
                    template: `
    <app-control-buttons-alt-component
      [buttons]="buttons"
      [direction]="direction"
      [showAspect]="true"
    ></app-control-buttons-alt-component>
  `,
                    imports: [CommonModule, FontAwesomeModule, ControlButtonsAltComponent],
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: ['buttons']
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: ['direction']
                }] }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1yZWNvcmQtd2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvbWVudS1yZWNvcmQtd2lkZ2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMEVBQTBFLENBQUM7QUFDdEgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0FBWXJFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFxQkk7QUFlSixNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLE9BQU8sR0FBbUIsRUFBRSxDQUFDO0lBQzdCLFNBQVMsR0FBOEIsWUFBWSxDQUFDO0lBRXBELFlBQ3FCLE9BQXVCLEVBQ3JCLFNBQW9DO1FBRXpELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7dUdBVlUsZ0JBQWdCLGtCQUtqQixTQUFTLGFBQ1QsV0FBVzsyRkFOVixnQkFBZ0Isa0ZBVGpCOzs7Ozs7R0FNVCwyREFDUyxZQUFZLDhCQUFFLGlCQUFpQiwrQkFBRSwwQkFBMEI7OzJGQUUxRCxnQkFBZ0I7a0JBWjVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRTs7Ozs7O0dBTVQ7b0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLDBCQUEwQixDQUFDO2lCQUN2RTs7MEJBTUksTUFBTTsyQkFBQyxTQUFTOzswQkFDaEIsTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb250cm9sQnV0dG9uc0FsdENvbXBvbmVudCB9IGZyb20gJy4uL2NvbnRyb2wtYnV0dG9ucy1hbHQtY29tcG9uZW50L2NvbnRyb2wtYnV0dG9ucy1hbHQtY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJztcblxuaW50ZXJmYWNlIFJlY29yZEJ1dHRvbiB7XG4gIGljb24/OiBJY29uRGVmaW5pdGlvbjtcbiAgYWN0aXZlPzogYm9vbGVhbjtcbiAgb25QcmVzcz86ICgpID0+IHZvaWQ7XG4gIGFjdGl2ZUNvbG9yPzogc3RyaW5nO1xuICBpbkFjdGl2ZUNvbG9yPzogc3RyaW5nO1xuICB0ZXh0Pzogc3RyaW5nO1xufVxuXG4vKipcbiAqIE1lbnVSZWNvcmRXaWRnZXQgaXMgYSBjb25maWd1cmFibGUgd2lkZ2V0IHRoYXQgZGlzcGxheXMgYSBzZXQgb2YgcmVjb3JkIGNvbnRyb2wgYnV0dG9ucywgd2l0aCBjdXN0b21pemFibGUgaWNvbiwgY29sb3IsIGFuZCBhY3Rpb25zLlxuICpcbiAqIEBzZWxlY3RvciBhcHAtbWVudS1yZWNvcmQtd2lkZ2V0XG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlLCBDb250cm9sQnV0dG9uc0FsdENvbXBvbmVudFxuICpcbiAqIEBpbnB1dHNcbiAqIC0gYGJ1dHRvbnNgIChSZWNvcmRCdXR0b25bXSk6IEFycmF5IG9mIHJlY29yZCBidXR0b24gY29uZmlndXJhdGlvbnMsIGVhY2ggd2l0aCBwcm9wZXJ0aWVzIGZvciBpY29uLCBhY3RpdmUgc3RhdGUsIGNvbG9ycywgYW5kIGFjdGlvbnMuXG4gKiAtIGBkaXJlY3Rpb25gICgnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnKTogTGF5b3V0IGRpcmVjdGlvbiBmb3IgdGhlIGJ1dHRvbnMuIERlZmF1bHQgaXMgJ2hvcml6b250YWwnLlxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLW1lbnUtcmVjb3JkLXdpZGdldFxuICogICBbYnV0dG9uc109XCJbXG4gKiAgICAgeyBpY29uOiBmYUNpcmNsZSwgdGV4dDogJ1JlY29yZCcsIG9uUHJlc3M6IHN0YXJ0UmVjb3JkaW5nLCBhY3RpdmVDb2xvcjogJ3JlZCcgfSxcbiAqICAgICB7IGljb246IGZhU3RvcCwgdGV4dDogJ1N0b3AnLCBvblByZXNzOiBzdG9wUmVjb3JkaW5nLCBpbkFjdGl2ZUNvbG9yOiAnZ3JheScgfVxuICogICBdXCJcbiAqICAgZGlyZWN0aW9uPVwiaG9yaXpvbnRhbFwiXG4gKiA+PC9hcHAtbWVudS1yZWNvcmQtd2lkZ2V0PlxuICogYGBgXG4gKiovXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1lbnUtcmVjb3JkLXdpZGdldCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIHRlbXBsYXRlOiBgXG4gICAgPGFwcC1jb250cm9sLWJ1dHRvbnMtYWx0LWNvbXBvbmVudFxuICAgICAgW2J1dHRvbnNdPVwiYnV0dG9uc1wiXG4gICAgICBbZGlyZWN0aW9uXT1cImRpcmVjdGlvblwiXG4gICAgICBbc2hvd0FzcGVjdF09XCJ0cnVlXCJcbiAgICA+PC9hcHAtY29udHJvbC1idXR0b25zLWFsdC1jb21wb25lbnQ+XG4gIGAsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlLCBDb250cm9sQnV0dG9uc0FsdENvbXBvbmVudF0sXG59KVxuZXhwb3J0IGNsYXNzIE1lbnVSZWNvcmRXaWRnZXQge1xuICBidXR0b25zOiBSZWNvcmRCdXR0b25bXSA9IFtdO1xuICBkaXJlY3Rpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgQEluamVjdCgnYnV0dG9ucycpIGJ1dHRvbnM6IFJlY29yZEJ1dHRvbltdLFxuICAgIEBJbmplY3QoJ2RpcmVjdGlvbicpIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyxcbiAgKSB7XG4gICAgdGhpcy5idXR0b25zID0gYnV0dG9ucztcbiAgICB0aGlzLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgfVxufVxuIl19