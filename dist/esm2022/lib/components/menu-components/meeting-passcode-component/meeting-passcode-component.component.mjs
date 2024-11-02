import { Component, Input } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * Component for displaying and managing a meeting passcode.
 *
 * @selector app-meeting-passcode-component
 * @standalone true
 * @templateUrl ./meeting-passcode-component.component.html
 * @styleUrls ./meeting-passcode-component.component.css
 *
 * @example
 * ```html
 * <app-meeting-passcode-component [meetingPasscode]="'ABC123'"></app-meeting-passcode-component>
 * ```
 */
export class MeetingPasscodeComponent {
    meetingPasscode = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MeetingPasscodeComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: MeetingPasscodeComponent, isStandalone: true, selector: "app-meeting-passcode-component", inputs: { meetingPasscode: "meetingPasscode" }, ngImport: i0, template: "<div class=\"form-group\">\r\n  <label class=\"label\">Event Passcode (Host):</label>\r\n  <input\r\n    class=\"disabled-input\"\r\n    [value]=\"meetingPasscode\"\r\n    readonly\r\n  />\r\n</div>\r\n", styles: [".form-group{margin-top:10px;max-width:300px}.label{font-weight:700}.disabled-input{border-width:1px;border-color:gray;padding:10px;margin-top:5px;background-color:#f0f0f0;color:#000;width:100%;border-radius:5px}\n"] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: MeetingPasscodeComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-meeting-passcode-component', standalone: true, template: "<div class=\"form-group\">\r\n  <label class=\"label\">Event Passcode (Host):</label>\r\n  <input\r\n    class=\"disabled-input\"\r\n    [value]=\"meetingPasscode\"\r\n    readonly\r\n  />\r\n</div>\r\n", styles: [".form-group{margin-top:10px;max-width:300px}.label{font-weight:700}.disabled-input{border-width:1px;border-color:gray;padding:10px;margin-top:5px;background-color:#f0f0f0;color:#000;width:100%;border-radius:5px}\n"] }]
        }], propDecorators: { meetingPasscode: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVldGluZy1wYXNzY29kZS1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvbWVudS1jb21wb25lbnRzL21lZXRpbmctcGFzc2NvZGUtY29tcG9uZW50L21lZXRpbmctcGFzc2NvZGUtY29tcG9uZW50LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21lbnUtY29tcG9uZW50cy9tZWV0aW5nLXBhc3Njb2RlLWNvbXBvbmVudC9tZWV0aW5nLXBhc3Njb2RlLWNvbXBvbmVudC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFVakQ7Ozs7Ozs7Ozs7OztHQVlHO0FBUUgsTUFBTSxPQUFPLHdCQUF3QjtJQUMxQixlQUFlLEdBQUcsRUFBRSxDQUFDO3VHQURuQix3QkFBd0I7MkZBQXhCLHdCQUF3QiwwSUM5QnJDLDRNQVFBOzsyRkRzQmEsd0JBQXdCO2tCQU5wQyxTQUFTOytCQUNFLGdDQUFnQyxjQUM5QixJQUFJOzhCQUtQLGVBQWU7c0JBQXZCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTWVldGluZ1Bhc3Njb2RlQ29tcG9uZW50T3B0aW9ucyB7XG4gIG1lZXRpbmdQYXNzY29kZTogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBNZWV0aW5nUGFzc2NvZGVDb21wb25lbnRUeXBlID0gKFxuICBvcHRpb25zOiBNZWV0aW5nUGFzc2NvZGVDb21wb25lbnRPcHRpb25zLFxuKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBDb21wb25lbnQgZm9yIGRpc3BsYXlpbmcgYW5kIG1hbmFnaW5nIGEgbWVldGluZyBwYXNzY29kZS5cbiAqXG4gKiBAc2VsZWN0b3IgYXBwLW1lZXRpbmctcGFzc2NvZGUtY29tcG9uZW50XG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAdGVtcGxhdGVVcmwgLi9tZWV0aW5nLXBhc3Njb2RlLWNvbXBvbmVudC5jb21wb25lbnQuaHRtbFxuICogQHN0eWxlVXJscyAuL21lZXRpbmctcGFzc2NvZGUtY29tcG9uZW50LmNvbXBvbmVudC5jc3NcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1tZWV0aW5nLXBhc3Njb2RlLWNvbXBvbmVudCBbbWVldGluZ1Bhc3Njb2RlXT1cIidBQkMxMjMnXCI+PC9hcHAtbWVldGluZy1wYXNzY29kZS1jb21wb25lbnQ+XG4gKiBgYGBcbiAqL1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtbWVldGluZy1wYXNzY29kZS1jb21wb25lbnQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICB0ZW1wbGF0ZVVybDogJy4vbWVldGluZy1wYXNzY29kZS1jb21wb25lbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9tZWV0aW5nLXBhc3Njb2RlLWNvbXBvbmVudC5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIE1lZXRpbmdQYXNzY29kZUNvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG1lZXRpbmdQYXNzY29kZSA9ICcnO1xufVxuIiwiPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cclxuICA8bGFiZWwgY2xhc3M9XCJsYWJlbFwiPkV2ZW50IFBhc3Njb2RlIChIb3N0KTo8L2xhYmVsPlxyXG4gIDxpbnB1dFxyXG4gICAgY2xhc3M9XCJkaXNhYmxlZC1pbnB1dFwiXHJcbiAgICBbdmFsdWVdPVwibWVldGluZ1Bhc3Njb2RlXCJcclxuICAgIHJlYWRvbmx5XHJcbiAgLz5cclxuPC9kaXY+XHJcbiJdfQ==