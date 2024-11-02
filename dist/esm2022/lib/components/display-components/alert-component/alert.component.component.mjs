import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * AlertComponent displays an alert message of type 'success' or 'danger' with customizable options.
 * It can automatically hide after a set duration and includes a manual dismiss option.
 *
 * @selector app-alert-component
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `visible` (boolean): Determines if the alert is visible. Default is false.
 * - `message` (string): The message displayed in the alert.
 * - `type` ('success' | 'danger'): Type of alert, either 'success' or 'danger'. Default is 'success'.
 * - `duration` (number): Duration in milliseconds for the alert to remain visible before hiding. Default is 4000 ms.
 * - `textColor` (string): Optional color for alert text. Default is 'black'.
 * - `onHide` (function): Optional callback invoked when the alert is hidden.
 *
 * @methods
 * - `ngOnChanges(changes: SimpleChanges)`: Lifecycle hook invoked on input changes; initiates auto-hide based on duration if `visible` is true.
 * - `handlePress()`: Manually hides the alert by invoking the `onHide` callback.
 *
 * @example
 * ```html
 * <app-alert-component
 *  [visible]="showAlert"
 * [message]="alertMessage"
 * [type]="alertType"
 * [duration]="5000"
 * [textColor]="alertTextColor"
 * [onHide]="onAlertHide">
 * </app-alert-component>
 * ```
 **/
export class AlertComponent {
    visible = false;
    message = '';
    type = 'success';
    duration = 4000;
    textColor = 'black';
    onHide;
    alertType = 'success';
    ngOnChanges(changes) {
        if (changes['type']) {
            this.alertType = this.type;
        }
        if (changes['visible']) {
            if (this.visible) {
                setTimeout(() => {
                    this.onHide();
                }, this.duration);
            }
        }
    }
    handlePress() {
        this.onHide();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AlertComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: AlertComponent, isStandalone: true, selector: "app-alert-component", inputs: { visible: "visible", message: "message", type: "type", duration: "duration", textColor: "textColor", onHide: "onHide" }, usesOnChanges: true, ngImport: i0, template: "<div *ngIf=\"visible\" (click)=\"handlePress()\" class=\"centeredView\">\r\n  <div [ngStyle]=\"{ 'background-color': alertType === 'success' ? 'green' : 'red' }\" class=\"modalView\">\r\n    <p [ngStyle]=\"{ color: textColor }\" class=\"modalText\">{{ message }}</p>\r\n  </div>\r\n</div>\r\n", styles: [".centeredView{display:flex;justify-content:center;align-items:center;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;z-index:1000}.modalView{background-color:#fff;border-radius:10px;padding:20px;max-width:400px;box-shadow:0 4px 6px #0000001a}.modalText{color:#000;font-size:16px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: AlertComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-alert-component', standalone: true, imports: [CommonModule], template: "<div *ngIf=\"visible\" (click)=\"handlePress()\" class=\"centeredView\">\r\n  <div [ngStyle]=\"{ 'background-color': alertType === 'success' ? 'green' : 'red' }\" class=\"modalView\">\r\n    <p [ngStyle]=\"{ color: textColor }\" class=\"modalText\">{{ message }}</p>\r\n  </div>\r\n</div>\r\n", styles: [".centeredView{display:flex;justify-content:center;align-items:center;position:fixed;top:0;left:0;width:100%;height:100%;background-color:#00000080;z-index:1000}.modalView{background-color:#fff;border-radius:10px;padding:20px;max-width:400px;box-shadow:0 4px 6px #0000001a}.modalText{color:#000;font-size:16px}\n"] }]
        }], propDecorators: { visible: [{
                type: Input
            }], message: [{
                type: Input
            }], type: [{
                type: Input
            }], duration: [{
                type: Input
            }], textColor: [{
                type: Input
            }], onHide: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9hbGVydC1jb21wb25lbnQvYWxlcnQuY29tcG9uZW50LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9hbGVydC1jb21wb25lbnQvYWxlcnQuY29tcG9uZW50LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQWEvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQStCSTtBQVVKLE1BQU0sT0FBTyxjQUFjO0lBQ2hCLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDaEIsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNiLElBQUksR0FBeUIsU0FBUyxDQUFDO0lBQ3ZDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDaEIsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUNwQixNQUFNLENBQWM7SUFFN0IsU0FBUyxHQUF5QixTQUFTLENBQUM7SUFFNUMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzdCLENBQUM7UUFFRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNqQixVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNkLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7dUdBMUJVLGNBQWM7MkZBQWQsY0FBYyxzT0N2RDNCLHNTQUtBLGdYRDRDWSxZQUFZOzsyRkFNWCxjQUFjO2tCQVQxQixTQUFTOytCQUNFLHFCQUFxQixjQUNuQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUM7OEJBT2QsT0FBTztzQkFBZixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBBbGVydENvbXBvbmVudE9wdGlvbnMge1xuICB2aXNpYmxlOiBib29sZWFuO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHR5cGU6ICdzdWNjZXNzJyB8ICdkYW5nZXInOyAvLyBPcHRpb25hbCBwcm9wIHdpdGggJ3N1Y2Nlc3MnIG9yICdkYW5nZXInIGFzIGRlZmF1bHQgdmFsdWVzXG4gIGR1cmF0aW9uPzogbnVtYmVyOyAvLyBPcHRpb25hbCB3aXRoIGRlZmF1bHQgdmFsdWVcbiAgb25IaWRlPzogKCkgPT4gdm9pZDsgLy8gT3B0aW9uYWwgY2FsbGJhY2sgZnVuY3Rpb25cbiAgdGV4dENvbG9yPzogc3RyaW5nOyAvLyBPcHRpb25hbCB0ZXh0IGNvbG9yXG59XG5cbmV4cG9ydCB0eXBlIEFsZXJ0Q29tcG9uZW50VHlwZSA9IChvcHRpb25zOiBBbGVydENvbXBvbmVudE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIEFsZXJ0Q29tcG9uZW50IGRpc3BsYXlzIGFuIGFsZXJ0IG1lc3NhZ2Ugb2YgdHlwZSAnc3VjY2Vzcycgb3IgJ2Rhbmdlcicgd2l0aCBjdXN0b21pemFibGUgb3B0aW9ucy5cbiAqIEl0IGNhbiBhdXRvbWF0aWNhbGx5IGhpZGUgYWZ0ZXIgYSBzZXQgZHVyYXRpb24gYW5kIGluY2x1ZGVzIGEgbWFudWFsIGRpc21pc3Mgb3B0aW9uLlxuICpcbiAqIEBzZWxlY3RvciBhcHAtYWxlcnQtY29tcG9uZW50XG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBDb21tb25Nb2R1bGVcbiAqXG4gKiBAaW5wdXRzXG4gKiAtIGB2aXNpYmxlYCAoYm9vbGVhbik6IERldGVybWluZXMgaWYgdGhlIGFsZXJ0IGlzIHZpc2libGUuIERlZmF1bHQgaXMgZmFsc2UuXG4gKiAtIGBtZXNzYWdlYCAoc3RyaW5nKTogVGhlIG1lc3NhZ2UgZGlzcGxheWVkIGluIHRoZSBhbGVydC5cbiAqIC0gYHR5cGVgICgnc3VjY2VzcycgfCAnZGFuZ2VyJyk6IFR5cGUgb2YgYWxlcnQsIGVpdGhlciAnc3VjY2Vzcycgb3IgJ2RhbmdlcicuIERlZmF1bHQgaXMgJ3N1Y2Nlc3MnLlxuICogLSBgZHVyYXRpb25gIChudW1iZXIpOiBEdXJhdGlvbiBpbiBtaWxsaXNlY29uZHMgZm9yIHRoZSBhbGVydCB0byByZW1haW4gdmlzaWJsZSBiZWZvcmUgaGlkaW5nLiBEZWZhdWx0IGlzIDQwMDAgbXMuXG4gKiAtIGB0ZXh0Q29sb3JgIChzdHJpbmcpOiBPcHRpb25hbCBjb2xvciBmb3IgYWxlcnQgdGV4dC4gRGVmYXVsdCBpcyAnYmxhY2snLlxuICogLSBgb25IaWRlYCAoZnVuY3Rpb24pOiBPcHRpb25hbCBjYWxsYmFjayBpbnZva2VkIHdoZW4gdGhlIGFsZXJ0IGlzIGhpZGRlbi5cbiAqXG4gKiBAbWV0aG9kc1xuICogLSBgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcylgOiBMaWZlY3ljbGUgaG9vayBpbnZva2VkIG9uIGlucHV0IGNoYW5nZXM7IGluaXRpYXRlcyBhdXRvLWhpZGUgYmFzZWQgb24gZHVyYXRpb24gaWYgYHZpc2libGVgIGlzIHRydWUuXG4gKiAtIGBoYW5kbGVQcmVzcygpYDogTWFudWFsbHkgaGlkZXMgdGhlIGFsZXJ0IGJ5IGludm9raW5nIHRoZSBgb25IaWRlYCBjYWxsYmFjay5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1hbGVydC1jb21wb25lbnRcbiAqICBbdmlzaWJsZV09XCJzaG93QWxlcnRcIlxuICogW21lc3NhZ2VdPVwiYWxlcnRNZXNzYWdlXCJcbiAqIFt0eXBlXT1cImFsZXJ0VHlwZVwiXG4gKiBbZHVyYXRpb25dPVwiNTAwMFwiXG4gKiBbdGV4dENvbG9yXT1cImFsZXJ0VGV4dENvbG9yXCJcbiAqIFtvbkhpZGVdPVwib25BbGVydEhpZGVcIj5cbiAqIDwvYXBwLWFsZXJ0LWNvbXBvbmVudD5cbiAqIGBgYFxuICoqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLWFsZXJ0LWNvbXBvbmVudCcsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGVdLFxuICB0ZW1wbGF0ZVVybDogJy4vYWxlcnQuY29tcG9uZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vYWxlcnQuY29tcG9uZW50LmNvbXBvbmVudC5jc3MnXSxcbn0pXG5cblxuZXhwb3J0IGNsYXNzIEFsZXJ0Q29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzIHtcbiAgQElucHV0KCkgdmlzaWJsZSA9IGZhbHNlO1xuICBASW5wdXQoKSBtZXNzYWdlID0gJyc7XG4gIEBJbnB1dCgpIHR5cGU6ICdzdWNjZXNzJyB8ICdkYW5nZXInID0gJ3N1Y2Nlc3MnO1xuICBASW5wdXQoKSBkdXJhdGlvbiA9IDQwMDA7XG4gIEBJbnB1dCgpIHRleHRDb2xvciA9ICdibGFjayc7XG4gIEBJbnB1dCgpIG9uSGlkZSE6ICgpID0+IHZvaWQ7XG5cbiAgYWxlcnRUeXBlOiAnc3VjY2VzcycgfCAnZGFuZ2VyJyA9ICdzdWNjZXNzJztcblxuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKGNoYW5nZXNbJ3R5cGUnXSkge1xuICAgICAgdGhpcy5hbGVydFR5cGUgPSB0aGlzLnR5cGU7XG4gICAgfVxuXG4gICAgaWYgKGNoYW5nZXNbJ3Zpc2libGUnXSkge1xuICAgICAgaWYgKHRoaXMudmlzaWJsZSkge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLm9uSGlkZSgpO1xuICAgICAgICB9LCB0aGlzLmR1cmF0aW9uKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVQcmVzcygpIHtcbiAgICB0aGlzLm9uSGlkZSgpO1xuICB9XG59XG4iLCI8ZGl2ICpuZ0lmPVwidmlzaWJsZVwiIChjbGljayk9XCJoYW5kbGVQcmVzcygpXCIgY2xhc3M9XCJjZW50ZXJlZFZpZXdcIj5cclxuICA8ZGl2IFtuZ1N0eWxlXT1cInsgJ2JhY2tncm91bmQtY29sb3InOiBhbGVydFR5cGUgPT09ICdzdWNjZXNzJyA/ICdncmVlbicgOiAncmVkJyB9XCIgY2xhc3M9XCJtb2RhbFZpZXdcIj5cclxuICAgIDxwIFtuZ1N0eWxlXT1cInsgY29sb3I6IHRleHRDb2xvciB9XCIgY2xhc3M9XCJtb2RhbFRleHRcIj57eyBtZXNzYWdlIH19PC9wPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19