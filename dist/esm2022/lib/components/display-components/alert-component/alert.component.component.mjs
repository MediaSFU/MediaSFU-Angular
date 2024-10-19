import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * AlertComponent is a standalone Angular component that displays an alert message.
 * It supports different types of alerts such as 'success' and 'danger', and can be configured
 * to automatically hide after a specified duration.
 *
 * @selector app-alert-component
 * @standalone true
 * @imports CommonModule
 * @templateUrl ./alert.component.html
 * @styleUrls ./alert.component.css
 *
 * @class AlertComponent
 * @implements OnChanges
 *
 * @property {boolean} visible - Determines if the alert is visible.
 * @property {string} message - The message to be displayed in the alert.
 * @property {'success' | 'danger'} type - The type of alert, either 'success' or 'danger'.
 * @property {number} duration - The duration (in milliseconds) for which the alert is visible before hiding.
 * @property {string} textColor - The color of the text in the alert.
 * @property {() => void} onHide - A callback function that is called when the alert is hidden.
 *
 * @method ngOnChanges - Lifecycle hook that is called when any data-bound property of a directive changes.
 * @param {SimpleChanges} changes - An object of changes to the data-bound properties.
 *
 * @method handlePress - Manually hides the alert by calling the onHide callback.
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxlcnQuY29tcG9uZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9hbGVydC1jb21wb25lbnQvYWxlcnQuY29tcG9uZW50LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL2Rpc3BsYXktY29tcG9uZW50cy9hbGVydC1jb21wb25lbnQvYWxlcnQuY29tcG9uZW50LmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUE0QixNQUFNLGVBQWUsQ0FBQztBQUMzRSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7OztBQWEvQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXlCRztBQVFILE1BQU0sT0FBTyxjQUFjO0lBQ2hCLE9BQU8sR0FBRyxLQUFLLENBQUM7SUFDaEIsT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUNiLElBQUksR0FBeUIsU0FBUyxDQUFDO0lBQ3ZDLFFBQVEsR0FBRyxJQUFJLENBQUM7SUFDaEIsU0FBUyxHQUFHLE9BQU8sQ0FBQztJQUNwQixNQUFNLENBQWM7SUFFN0IsU0FBUyxHQUF5QixTQUFTLENBQUM7SUFFNUMsV0FBVyxDQUFDLE9BQXNCO1FBQ2hDLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQzdCLENBQUM7UUFFRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO1lBQ3ZCLElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2dCQUNqQixVQUFVLENBQUMsR0FBRyxFQUFFO29CQUNkLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDaEIsQ0FBQyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUNwQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hCLENBQUM7dUdBMUJVLGNBQWM7MkZBQWQsY0FBYyxzT0MvQzNCLHNTQUtBLGdYRHNDWSxZQUFZOzsyRkFJWCxjQUFjO2tCQVAxQixTQUFTOytCQUNFLHFCQUFxQixjQUNuQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLENBQUM7OEJBS2QsT0FBTztzQkFBZixLQUFLO2dCQUNHLE9BQU87c0JBQWYsS0FBSztnQkFDRyxJQUFJO3NCQUFaLEtBQUs7Z0JBQ0csUUFBUTtzQkFBaEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQsIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcblxuZXhwb3J0IGludGVyZmFjZSBBbGVydENvbXBvbmVudE9wdGlvbnMge1xuICB2aXNpYmxlOiBib29sZWFuO1xuICBtZXNzYWdlOiBzdHJpbmc7XG4gIHR5cGU6ICdzdWNjZXNzJyB8ICdkYW5nZXInOyAvLyBPcHRpb25hbCBwcm9wIHdpdGggJ3N1Y2Nlc3MnIG9yICdkYW5nZXInIGFzIGRlZmF1bHQgdmFsdWVzXG4gIGR1cmF0aW9uPzogbnVtYmVyOyAvLyBPcHRpb25hbCB3aXRoIGRlZmF1bHQgdmFsdWVcbiAgb25IaWRlPzogKCkgPT4gdm9pZDsgLy8gT3B0aW9uYWwgY2FsbGJhY2sgZnVuY3Rpb25cbiAgdGV4dENvbG9yPzogc3RyaW5nOyAvLyBPcHRpb25hbCB0ZXh0IGNvbG9yXG59XG5cbmV4cG9ydCB0eXBlIEFsZXJ0Q29tcG9uZW50VHlwZSA9IChvcHRpb25zOiBBbGVydENvbXBvbmVudE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIEFsZXJ0Q29tcG9uZW50IGlzIGEgc3RhbmRhbG9uZSBBbmd1bGFyIGNvbXBvbmVudCB0aGF0IGRpc3BsYXlzIGFuIGFsZXJ0IG1lc3NhZ2UuXG4gKiBJdCBzdXBwb3J0cyBkaWZmZXJlbnQgdHlwZXMgb2YgYWxlcnRzIHN1Y2ggYXMgJ3N1Y2Nlc3MnIGFuZCAnZGFuZ2VyJywgYW5kIGNhbiBiZSBjb25maWd1cmVkXG4gKiB0byBhdXRvbWF0aWNhbGx5IGhpZGUgYWZ0ZXIgYSBzcGVjaWZpZWQgZHVyYXRpb24uXG4gKlxuICogQHNlbGVjdG9yIGFwcC1hbGVydC1jb21wb25lbnRcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIENvbW1vbk1vZHVsZVxuICogQHRlbXBsYXRlVXJsIC4vYWxlcnQuY29tcG9uZW50Lmh0bWxcbiAqIEBzdHlsZVVybHMgLi9hbGVydC5jb21wb25lbnQuY3NzXG4gKlxuICogQGNsYXNzIEFsZXJ0Q29tcG9uZW50XG4gKiBAaW1wbGVtZW50cyBPbkNoYW5nZXNcbiAqXG4gKiBAcHJvcGVydHkge2Jvb2xlYW59IHZpc2libGUgLSBEZXRlcm1pbmVzIGlmIHRoZSBhbGVydCBpcyB2aXNpYmxlLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IG1lc3NhZ2UgLSBUaGUgbWVzc2FnZSB0byBiZSBkaXNwbGF5ZWQgaW4gdGhlIGFsZXJ0LlxuICogQHByb3BlcnR5IHsnc3VjY2VzcycgfCAnZGFuZ2VyJ30gdHlwZSAtIFRoZSB0eXBlIG9mIGFsZXJ0LCBlaXRoZXIgJ3N1Y2Nlc3MnIG9yICdkYW5nZXInLlxuICogQHByb3BlcnR5IHtudW1iZXJ9IGR1cmF0aW9uIC0gVGhlIGR1cmF0aW9uIChpbiBtaWxsaXNlY29uZHMpIGZvciB3aGljaCB0aGUgYWxlcnQgaXMgdmlzaWJsZSBiZWZvcmUgaGlkaW5nLlxuICogQHByb3BlcnR5IHtzdHJpbmd9IHRleHRDb2xvciAtIFRoZSBjb2xvciBvZiB0aGUgdGV4dCBpbiB0aGUgYWxlcnQuXG4gKiBAcHJvcGVydHkgeygpID0+IHZvaWR9IG9uSGlkZSAtIEEgY2FsbGJhY2sgZnVuY3Rpb24gdGhhdCBpcyBjYWxsZWQgd2hlbiB0aGUgYWxlcnQgaXMgaGlkZGVuLlxuICpcbiAqIEBtZXRob2QgbmdPbkNoYW5nZXMgLSBMaWZlY3ljbGUgaG9vayB0aGF0IGlzIGNhbGxlZCB3aGVuIGFueSBkYXRhLWJvdW5kIHByb3BlcnR5IG9mIGEgZGlyZWN0aXZlIGNoYW5nZXMuXG4gKiBAcGFyYW0ge1NpbXBsZUNoYW5nZXN9IGNoYW5nZXMgLSBBbiBvYmplY3Qgb2YgY2hhbmdlcyB0byB0aGUgZGF0YS1ib3VuZCBwcm9wZXJ0aWVzLlxuICpcbiAqIEBtZXRob2QgaGFuZGxlUHJlc3MgLSBNYW51YWxseSBoaWRlcyB0aGUgYWxlcnQgYnkgY2FsbGluZyB0aGUgb25IaWRlIGNhbGxiYWNrLlxuICovXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtYWxlcnQtY29tcG9uZW50JyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9hbGVydC5jb21wb25lbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9hbGVydC5jb21wb25lbnQuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBBbGVydENvbXBvbmVudCBpbXBsZW1lbnRzIE9uQ2hhbmdlcyB7XG4gIEBJbnB1dCgpIHZpc2libGUgPSBmYWxzZTtcbiAgQElucHV0KCkgbWVzc2FnZSA9ICcnO1xuICBASW5wdXQoKSB0eXBlOiAnc3VjY2VzcycgfCAnZGFuZ2VyJyA9ICdzdWNjZXNzJztcbiAgQElucHV0KCkgZHVyYXRpb24gPSA0MDAwO1xuICBASW5wdXQoKSB0ZXh0Q29sb3IgPSAnYmxhY2snO1xuICBASW5wdXQoKSBvbkhpZGUhOiAoKSA9PiB2b2lkO1xuXG4gIGFsZXJ0VHlwZTogJ3N1Y2Nlc3MnIHwgJ2RhbmdlcicgPSAnc3VjY2Vzcyc7XG5cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xuICAgIGlmIChjaGFuZ2VzWyd0eXBlJ10pIHtcbiAgICAgIHRoaXMuYWxlcnRUeXBlID0gdGhpcy50eXBlO1xuICAgIH1cblxuICAgIGlmIChjaGFuZ2VzWyd2aXNpYmxlJ10pIHtcbiAgICAgIGlmICh0aGlzLnZpc2libGUpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgdGhpcy5vbkhpZGUoKTtcbiAgICAgICAgfSwgdGhpcy5kdXJhdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlUHJlc3MoKSB7XG4gICAgdGhpcy5vbkhpZGUoKTtcbiAgfVxufVxuIiwiPGRpdiAqbmdJZj1cInZpc2libGVcIiAoY2xpY2spPVwiaGFuZGxlUHJlc3MoKVwiIGNsYXNzPVwiY2VudGVyZWRWaWV3XCI+XHJcbiAgPGRpdiBbbmdTdHlsZV09XCJ7ICdiYWNrZ3JvdW5kLWNvbG9yJzogYWxlcnRUeXBlID09PSAnc3VjY2VzcycgPyAnZ3JlZW4nIDogJ3JlZCcgfVwiIGNsYXNzPVwibW9kYWxWaWV3XCI+XHJcbiAgICA8cCBbbmdTdHlsZV09XCJ7IGNvbG9yOiB0ZXh0Q29sb3IgfVwiIGNsYXNzPVwibW9kYWxUZXh0XCI+e3sgbWVzc2FnZSB9fTwvcD5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==