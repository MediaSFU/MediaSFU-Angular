import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlButtonsAltComponent } from '../control-buttons-alt-component/control-buttons-alt-component.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import * as i0 from "@angular/core";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVudS1yZWNvcmQtd2lkZ2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9jb250cm9sLXdpZGdldHMvbWVudS1yZWNvcmQtd2lkZ2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNsRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLDBCQUEwQixFQUFFLE1BQU0sMEVBQTBFLENBQUM7QUFDdEgsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7O0FBd0JyRSxNQUFNLE9BQU8sZ0JBQWdCO0lBQzNCLE9BQU8sR0FBbUIsRUFBRSxDQUFDO0lBQzdCLFNBQVMsR0FBOEIsWUFBWSxDQUFDO0lBRXBELFlBQ3FCLE9BQXVCLEVBQ3JCLFNBQW9DO1FBRXpELElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO0lBQzdCLENBQUM7dUdBVlUsZ0JBQWdCLGtCQUtqQixTQUFTLGFBQ1QsV0FBVzsyRkFOVixnQkFBZ0Isa0ZBVGpCOzs7Ozs7R0FNVCwyREFDUyxZQUFZLDhCQUFFLGlCQUFpQiwrQkFBRSwwQkFBMEI7OzJGQUUxRCxnQkFBZ0I7a0JBWjVCLFNBQVM7bUJBQUM7b0JBQ1QsUUFBUSxFQUFFLHdCQUF3QjtvQkFDbEMsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLFFBQVEsRUFBRTs7Ozs7O0dBTVQ7b0JBQ0QsT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGlCQUFpQixFQUFFLDBCQUEwQixDQUFDO2lCQUN2RTs7MEJBTUksTUFBTTsyQkFBQyxTQUFTOzswQkFDaEIsTUFBTTsyQkFBQyxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbmplY3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBDb250cm9sQnV0dG9uc0FsdENvbXBvbmVudCB9IGZyb20gJy4uL2NvbnRyb2wtYnV0dG9ucy1hbHQtY29tcG9uZW50L2NvbnRyb2wtYnV0dG9ucy1hbHQtY29tcG9uZW50LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLXN2Zy1jb3JlJztcblxuaW50ZXJmYWNlIFJlY29yZEJ1dHRvbiB7XG4gIGljb24/OiBJY29uRGVmaW5pdGlvbjtcbiAgYWN0aXZlPzogYm9vbGVhbjtcbiAgb25QcmVzcz86ICgpID0+IHZvaWQ7XG4gIGFjdGl2ZUNvbG9yPzogc3RyaW5nO1xuICBpbkFjdGl2ZUNvbG9yPzogc3RyaW5nO1xuICB0ZXh0Pzogc3RyaW5nO1xufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWVudS1yZWNvcmQtd2lkZ2V0JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgdGVtcGxhdGU6IGBcbiAgICA8YXBwLWNvbnRyb2wtYnV0dG9ucy1hbHQtY29tcG9uZW50XG4gICAgICBbYnV0dG9uc109XCJidXR0b25zXCJcbiAgICAgIFtkaXJlY3Rpb25dPVwiZGlyZWN0aW9uXCJcbiAgICAgIFtzaG93QXNwZWN0XT1cInRydWVcIlxuICAgID48L2FwcC1jb250cm9sLWJ1dHRvbnMtYWx0LWNvbXBvbmVudD5cbiAgYCxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGUsIENvbnRyb2xCdXR0b25zQWx0Q29tcG9uZW50XSxcbn0pXG5leHBvcnQgY2xhc3MgTWVudVJlY29yZFdpZGdldCB7XG4gIGJ1dHRvbnM6IFJlY29yZEJ1dHRvbltdID0gW107XG4gIGRpcmVjdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KCdidXR0b25zJykgYnV0dG9uczogUmVjb3JkQnV0dG9uW10sXG4gICAgQEluamVjdCgnZGlyZWN0aW9uJykgZGlyZWN0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnLFxuICApIHtcbiAgICB0aGlzLmJ1dHRvbnMgPSBidXR0b25zO1xuICAgIHRoaXMuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICB9XG59XG4iXX0=