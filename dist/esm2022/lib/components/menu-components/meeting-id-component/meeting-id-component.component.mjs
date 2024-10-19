import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Component representing a meeting ID.
 *
 * @selector app-meeting-id-component
 * @templateUrl ./meeting-id-component.component.html
 * @styleUrls ./meeting-id-component.component.css
 * @standalone true
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVldGluZy1pZC1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvbWVudS1jb21wb25lbnRzL21lZXRpbmctaWQtY29tcG9uZW50L21lZXRpbmctaWQtY29tcG9uZW50LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21lbnUtY29tcG9uZW50cy9tZWV0aW5nLWlkLWNvbXBvbmVudC9tZWV0aW5nLWlkLWNvbXBvbmVudC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFRakQ7Ozs7Ozs7R0FPRztBQU9ILE1BQU0sT0FBTyxrQkFBa0I7SUFDcEIsU0FBUyxHQUFHLEVBQUUsQ0FBQzt1R0FEYixrQkFBa0I7MkZBQWxCLGtCQUFrQix3SEN0Qi9CLHlMQVFBOzsyRkRjYSxrQkFBa0I7a0JBTjlCLFNBQVM7K0JBQ0UsMEJBQTBCLGNBR3hCLElBQUk7OEJBR1AsU0FBUztzQkFBakIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuZXhwb3J0IGludGVyZmFjZSBNZWV0aW5nSWRDb21wb25lbnRPcHRpb25zIHtcbiAgbWVldGluZ0lEPzogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBNZWV0aW5nSWRDb21wb25lbnRUeXBlID0gKG9wdGlvbnM6IE1lZXRpbmdJZENvbXBvbmVudE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIENvbXBvbmVudCByZXByZXNlbnRpbmcgYSBtZWV0aW5nIElELlxuICpcbiAqIEBzZWxlY3RvciBhcHAtbWVldGluZy1pZC1jb21wb25lbnRcbiAqIEB0ZW1wbGF0ZVVybCAuL21lZXRpbmctaWQtY29tcG9uZW50LmNvbXBvbmVudC5odG1sXG4gKiBAc3R5bGVVcmxzIC4vbWVldGluZy1pZC1jb21wb25lbnQuY29tcG9uZW50LmNzc1xuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWVldGluZy1pZC1jb21wb25lbnQnLFxuICB0ZW1wbGF0ZVVybDogJy4vbWVldGluZy1pZC1jb21wb25lbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tZWV0aW5nLWlkLWNvbXBvbmVudC5jb21wb25lbnQuY3NzJ10sXG4gIHN0YW5kYWxvbmU6IHRydWUsXG59KVxuZXhwb3J0IGNsYXNzIE1lZXRpbmdJZENvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG1lZXRpbmdJRCA9ICcnO1xufVxuIiwiPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiPkV2ZW50IElEOjwvbGFiZWw+XHJcbiAgPGlucHV0XHJcbiAgICBjbGFzcz1cImRpc2FibGVkLWlucHV0XCJcclxuICAgIFt2YWx1ZV09XCJtZWV0aW5nSURcIlxyXG4gICAgcmVhZG9ubHlcclxuICAvPlxyXG48L2Rpdj5cclxuIl19