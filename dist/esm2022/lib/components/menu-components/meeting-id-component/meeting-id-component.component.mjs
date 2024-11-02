import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Component representing a meeting ID.
 *
 * @selector app-meeting-id-component
 * @standalone true
 * @templateUrl ./meeting-id-component.component.html
 * @styleUrls ./meeting-id-component.component.css
 *
 * @example
 * ```html
 * <app-meeting-id-component [meetingID]="'123-456-789'"></app-meeting-id-component>
 * ```
 */
export class MeetingIdComponent {
    meetingID = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MeetingIdComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MeetingIdComponent, isStandalone: true, selector: "app-meeting-id-component", inputs: { meetingID: "meetingID" }, ngImport: i0, template: "<div class=\"form-group\">\r\n  <label class=\"label\">Event ID:</label>\r\n  <input\r\n    class=\"disabled-input\"\r\n    [value]=\"meetingID\"\r\n    readonly\r\n  />\r\n</div>\r\n", styles: [".form-group{margin-top:10px;max-width:300px}.label{font-weight:700}.disabled-input{border-width:1px;border-color:gray;padding:10px;margin-top:5px;background-color:#f0f0f0;color:#000;width:100%;border-radius:5px}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MeetingIdComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-meeting-id-component', standalone: true, template: "<div class=\"form-group\">\r\n  <label class=\"label\">Event ID:</label>\r\n  <input\r\n    class=\"disabled-input\"\r\n    [value]=\"meetingID\"\r\n    readonly\r\n  />\r\n</div>\r\n", styles: [".form-group{margin-top:10px;max-width:300px}.label{font-weight:700}.disabled-input{border-width:1px;border-color:gray;padding:10px;margin-top:5px;background-color:#f0f0f0;color:#000;width:100%;border-radius:5px}\n"] }]
        }], propDecorators: { meetingID: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVldGluZy1pZC1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvbWVudS1jb21wb25lbnRzL21lZXRpbmctaWQtY29tcG9uZW50L21lZXRpbmctaWQtY29tcG9uZW50LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21lbnUtY29tcG9uZW50cy9tZWV0aW5nLWlkLWNvbXBvbmVudC9tZWV0aW5nLWlkLWNvbXBvbmVudC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFRakQ7Ozs7Ozs7Ozs7OztHQVlHO0FBUUgsTUFBTSxPQUFPLGtCQUFrQjtJQUNwQixTQUFTLEdBQUcsRUFBRSxDQUFDO3VHQURiLGtCQUFrQjsyRkFBbEIsa0JBQWtCLHdIQzVCL0IseUxBUUE7OzJGRG9CYSxrQkFBa0I7a0JBTjlCLFNBQVM7K0JBQ0UsMEJBQTBCLGNBR3hCLElBQUk7OEJBR1AsU0FBUztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBNZWV0aW5nSWRDb21wb25lbnRPcHRpb25zIHtcbiAgbWVldGluZ0lEPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBNZWV0aW5nSWRDb21wb25lbnRUeXBlID0gKG9wdGlvbnM6IE1lZXRpbmdJZENvbXBvbmVudE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIENvbXBvbmVudCByZXByZXNlbnRpbmcgYSBtZWV0aW5nIElELlxuICpcbiAqIEBzZWxlY3RvciBhcHAtbWVldGluZy1pZC1jb21wb25lbnRcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEB0ZW1wbGF0ZVVybCAuL21lZXRpbmctaWQtY29tcG9uZW50LmNvbXBvbmVudC5odG1sXG4gKiBAc3R5bGVVcmxzIC4vbWVldGluZy1pZC1jb21wb25lbnQuY29tcG9uZW50LmNzc1xuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLW1lZXRpbmctaWQtY29tcG9uZW50IFttZWV0aW5nSURdPVwiJzEyMy00NTYtNzg5J1wiPjwvYXBwLW1lZXRpbmctaWQtY29tcG9uZW50PlxuICogYGBgXG4gKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLW1lZXRpbmctaWQtY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL21lZXRpbmctaWQtY29tcG9uZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vbWVldGluZy1pZC1jb21wb25lbnQuY29tcG9uZW50LmNzcyddLFxuICBzdGFuZGFsb25lOiB0cnVlLFxufSlcbmV4cG9ydCBjbGFzcyBNZWV0aW5nSWRDb21wb25lbnQge1xuICBASW5wdXQoKSBtZWV0aW5nSUQgPSAnJztcbn1cbiIsIjxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XHJcbiAgPGxhYmVsIGNsYXNzPVwibGFiZWxcIj5FdmVudCBJRDo8L2xhYmVsPlxyXG4gIDxpbnB1dFxyXG4gICAgY2xhc3M9XCJkaXNhYmxlZC1pbnB1dFwiXHJcbiAgICBbdmFsdWVdPVwibWVldGluZ0lEXCJcclxuICAgIHJlYWRvbmx5XHJcbiAgLz5cclxuPC9kaXY+XHJcbiJdfQ==