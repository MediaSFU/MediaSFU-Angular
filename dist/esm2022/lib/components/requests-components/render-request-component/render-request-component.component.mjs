import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMicrophone, faDesktop, faVideo, faComments, faCheck, faTimes, } from '@fortawesome/free-solid-svg-icons';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
/**
 * @component RenderRequestComponent
 * @description Component to render and manage individual requests in a list. Each request can be responded to with specified actions (e.g., approve, deny).
 *
 * @selector app-render-request-component
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 * @templateUrl ./render-request-component.component.html
 * @styleUrls ./render-request-component.component.css
 *
 * @example
 * ```html
 * <app-render-request-component
 *   [request]="request"
 *   [requestList]="requestList"
 *   [roomName]="roomName"
 *   [socket]="socket"
 *   [onRequestItemPress]="handleRequestPress"
 *   [updateRequestList]="updateRequestList">
 * </app-render-request-component>
 * ```
 */
export class RenderRequestComponent {
    request = {};
    requestList = [];
    roomName;
    socket = {};
    onRequestItemPress;
    updateRequestList;
    faMicrophone = faMicrophone;
    faDesktop = faDesktop;
    faVideo = faVideo;
    faComments = faComments;
    faCheck = faCheck;
    faTimes = faTimes;
    keyMap = {
        'fa-microphone': this.faMicrophone,
        'fa-desktop': this.faDesktop,
        'fa-video': this.faVideo,
        'fa-comments': this.faComments,
    };
    getIcon(iconName) {
        return this.keyMap[iconName];
    }
    handleRequestAction = (action) => {
        this.onRequestItemPress({
            request: this.request,
            updateRequestList: this.updateRequestList,
            requestList: this.requestList,
            action: action,
            roomName: this.roomName,
            socket: this.socket,
        });
    };
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RenderRequestComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: RenderRequestComponent, isStandalone: true, selector: "app-render-request-component", inputs: { request: "request", requestList: "requestList", roomName: "roomName", socket: "socket", onRequestItemPress: "onRequestItemPress", updateRequestList: "updateRequestList" }, ngImport: i0, template: "<div class=\"request-container\" *ngIf=\"request\">\r\n  <div class=\"request-name\">{{ request.name }}</div>\r\n  <div class=\"request-icon\">\r\n    <fa-icon [icon]=\"getIcon(request.icon)\" size=\"lg\" color=\"black\"></fa-icon>\r\n  </div>\r\n  <div class=\"request-action accept\">\r\n    <button (click)=\"handleRequestAction('accepted')\">\r\n      <fa-icon [icon]=\"faCheck\" size=\"lg\" style=\"color: green;\"></fa-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"request-action reject\">\r\n    <button (click)=\"handleRequestAction('rejected')\">\r\n      <fa-icon [icon]=\"faTimes\" size=\"lg\" style=\"color: red;\"></fa-icon>\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [".request-container{display:flex;flex-direction:row;align-items:center;margin:10px 0;padding-bottom:5px}.request-name{flex:5}.request-icon,.request-action{flex:2;display:flex;justify-content:center;align-items:center}.request-action{padding-right:10px}.request-action.accept,.request-action.reject{margin-right:10px}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: RenderRequestComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-render-request-component', standalone: true, imports: [CommonModule, FontAwesomeModule], template: "<div class=\"request-container\" *ngIf=\"request\">\r\n  <div class=\"request-name\">{{ request.name }}</div>\r\n  <div class=\"request-icon\">\r\n    <fa-icon [icon]=\"getIcon(request.icon)\" size=\"lg\" color=\"black\"></fa-icon>\r\n  </div>\r\n  <div class=\"request-action accept\">\r\n    <button (click)=\"handleRequestAction('accepted')\">\r\n      <fa-icon [icon]=\"faCheck\" size=\"lg\" style=\"color: green;\"></fa-icon>\r\n    </button>\r\n  </div>\r\n  <div class=\"request-action reject\">\r\n    <button (click)=\"handleRequestAction('rejected')\">\r\n      <fa-icon [icon]=\"faTimes\" size=\"lg\" style=\"color: red;\"></fa-icon>\r\n    </button>\r\n  </div>\r\n</div>\r\n", styles: [".request-container{display:flex;flex-direction:row;align-items:center;margin:10px 0;padding-bottom:5px}.request-name{flex:5}.request-icon,.request-action{flex:2;display:flex;justify-content:center;align-items:center}.request-action{padding-right:10px}.request-action.accept,.request-action.reject{margin-right:10px}\n"] }]
        }], propDecorators: { request: [{
                type: Input
            }], requestList: [{
                type: Input
            }], roomName: [{
                type: Input
            }], socket: [{
                type: Input
            }], onRequestItemPress: [{
                type: Input
            }], updateRequestList: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVuZGVyLXJlcXVlc3QtY29tcG9uZW50LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL3JlcXVlc3RzLWNvbXBvbmVudHMvcmVuZGVyLXJlcXVlc3QtY29tcG9uZW50L3JlbmRlci1yZXF1ZXN0LWNvbXBvbmVudC5jb21wb25lbnQudHMiLCIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9yZXF1ZXN0cy1jb21wb25lbnRzL3JlbmRlci1yZXF1ZXN0LWNvbXBvbmVudC9yZW5kZXItcmVxdWVzdC1jb21wb25lbnQuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQ3JFLE9BQU8sRUFDTCxZQUFZLEVBQ1osU0FBUyxFQUNULE9BQU8sRUFDUCxVQUFVLEVBQ1YsT0FBTyxFQUNQLE9BQU8sR0FFUixNQUFNLG1DQUFtQyxDQUFDOzs7O0FBZTNDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFTSCxNQUFNLE9BQU8sc0JBQXNCO0lBQ3hCLE9BQU8sR0FBWSxFQUFhLENBQUM7SUFDakMsV0FBVyxHQUFjLEVBQUUsQ0FBQztJQUM1QixRQUFRLENBQVU7SUFDbEIsTUFBTSxHQUFXLEVBQVksQ0FBQztJQUM5QixrQkFBa0IsQ0FBK0M7SUFDakUsaUJBQWlCLENBQXVDO0lBRWpFLFlBQVksR0FBRyxZQUFZLENBQUM7SUFDNUIsU0FBUyxHQUFHLFNBQVMsQ0FBQztJQUN0QixPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQ2xCLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDeEIsT0FBTyxHQUFHLE9BQU8sQ0FBQztJQUNsQixPQUFPLEdBQUcsT0FBTyxDQUFDO0lBRWxCLE1BQU0sR0FBc0M7UUFDMUMsZUFBZSxFQUFFLElBQUksQ0FBQyxZQUFZO1FBQ2xDLFlBQVksRUFBRSxJQUFJLENBQUMsU0FBUztRQUM1QixVQUFVLEVBQUUsSUFBSSxDQUFDLE9BQU87UUFDeEIsYUFBYSxFQUFFLElBQUksQ0FBQyxVQUFVO0tBQy9CLENBQUM7SUFFRixPQUFPLENBQUMsUUFBZ0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCxtQkFBbUIsR0FBRyxDQUFDLE1BQWMsRUFBRSxFQUFFO1FBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztZQUN0QixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87WUFDckIsaUJBQWlCLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjtZQUN6QyxXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsTUFBTSxFQUFFLE1BQU07WUFDZCxRQUFRLEVBQUUsSUFBSSxDQUFDLFFBQVE7WUFDdkIsTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNO1NBQ3BCLENBQUMsQ0FBQztJQUNMLENBQUMsQ0FBQzt1R0FuQ1Msc0JBQXNCOzJGQUF0QixzQkFBc0IsOFFDeERuQyxpckJBZ0JBLHNYRG9DWSxZQUFZLGtJQUFFLGlCQUFpQjs7MkZBSTlCLHNCQUFzQjtrQkFQbEMsU0FBUzsrQkFDRSw4QkFBOEIsY0FDNUIsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDOzhCQUtqQyxPQUFPO3NCQUFmLEtBQUs7Z0JBQ0csV0FBVztzQkFBbkIsS0FBSztnQkFDRyxRQUFRO3NCQUFoQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxrQkFBa0I7c0JBQTFCLEtBQUs7Z0JBQ0csaUJBQWlCO3NCQUF6QixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHtcbiAgZmFNaWNyb3Bob25lLFxuICBmYURlc2t0b3AsXG4gIGZhVmlkZW8sXG4gIGZhQ29tbWVudHMsXG4gIGZhQ2hlY2ssXG4gIGZhVGltZXMsXG4gIEljb25EZWZpbml0aW9uLFxufSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgUmVzcG9uZFRvUmVxdWVzdHNUeXBlLCBSZXNwb25kVG9SZXF1ZXN0c09wdGlvbnMsIFJlcXVlc3QgfSBmcm9tICcuLi8uLi8uLi9AdHlwZXMvdHlwZXMnO1xuaW1wb3J0IHsgU29ja2V0IH0gZnJvbSAnc29ja2V0LmlvLWNsaWVudCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUmVuZGVyUmVxdWVzdENvbXBvbmVudE9wdGlvbnMge1xuICByZXF1ZXN0OiBSZXF1ZXN0O1xuICBvblJlcXVlc3RJdGVtUHJlc3M6IFJlc3BvbmRUb1JlcXVlc3RzVHlwZTtcbiAgcmVxdWVzdExpc3Q6IFJlcXVlc3RbXTtcbiAgdXBkYXRlUmVxdWVzdExpc3Q6IChuZXdSZXF1ZXN0TGlzdDogUmVxdWVzdFtdKSA9PiB2b2lkO1xuICByb29tTmFtZTogc3RyaW5nO1xuICBzb2NrZXQ6IFNvY2tldDtcbn1cblxuZXhwb3J0IHR5cGUgUmVuZGVyUmVxdWVzdENvbXBvbmVudFR5cGUgPSAob3B0aW9uczogUmVuZGVyUmVxdWVzdENvbXBvbmVudE9wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIEBjb21wb25lbnQgUmVuZGVyUmVxdWVzdENvbXBvbmVudFxuICogQGRlc2NyaXB0aW9uIENvbXBvbmVudCB0byByZW5kZXIgYW5kIG1hbmFnZSBpbmRpdmlkdWFsIHJlcXVlc3RzIGluIGEgbGlzdC4gRWFjaCByZXF1ZXN0IGNhbiBiZSByZXNwb25kZWQgdG8gd2l0aCBzcGVjaWZpZWQgYWN0aW9ucyAoZS5nLiwgYXBwcm92ZSwgZGVueSkuXG4gKlxuICogQHNlbGVjdG9yIGFwcC1yZW5kZXItcmVxdWVzdC1jb21wb25lbnRcbiAqIEBzdGFuZGFsb25lIHRydWVcbiAqIEBpbXBvcnRzIFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXVxuICogQHRlbXBsYXRlVXJsIC4vcmVuZGVyLXJlcXVlc3QtY29tcG9uZW50LmNvbXBvbmVudC5odG1sXG4gKiBAc3R5bGVVcmxzIC4vcmVuZGVyLXJlcXVlc3QtY29tcG9uZW50LmNvbXBvbmVudC5jc3NcbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1yZW5kZXItcmVxdWVzdC1jb21wb25lbnRcbiAqICAgW3JlcXVlc3RdPVwicmVxdWVzdFwiXG4gKiAgIFtyZXF1ZXN0TGlzdF09XCJyZXF1ZXN0TGlzdFwiXG4gKiAgIFtyb29tTmFtZV09XCJyb29tTmFtZVwiXG4gKiAgIFtzb2NrZXRdPVwic29ja2V0XCJcbiAqICAgW29uUmVxdWVzdEl0ZW1QcmVzc109XCJoYW5kbGVSZXF1ZXN0UHJlc3NcIlxuICogICBbdXBkYXRlUmVxdWVzdExpc3RdPVwidXBkYXRlUmVxdWVzdExpc3RcIj5cbiAqIDwvYXBwLXJlbmRlci1yZXF1ZXN0LWNvbXBvbmVudD5cbiAqIGBgYFxuICovXG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1yZW5kZXItcmVxdWVzdC1jb21wb25lbnQnLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9yZW5kZXItcmVxdWVzdC1jb21wb25lbnQuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9yZW5kZXItcmVxdWVzdC1jb21wb25lbnQuY29tcG9uZW50LmNzcyddLFxufSlcbmV4cG9ydCBjbGFzcyBSZW5kZXJSZXF1ZXN0Q29tcG9uZW50IHtcbiAgQElucHV0KCkgcmVxdWVzdDogUmVxdWVzdCA9IHt9IGFzIFJlcXVlc3Q7XG4gIEBJbnB1dCgpIHJlcXVlc3RMaXN0OiBSZXF1ZXN0W10gPSBbXTtcbiAgQElucHV0KCkgcm9vbU5hbWUhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNvY2tldDogU29ja2V0ID0ge30gYXMgU29ja2V0O1xuICBASW5wdXQoKSBvblJlcXVlc3RJdGVtUHJlc3MhOiAob3B0aW9uczogUmVzcG9uZFRvUmVxdWVzdHNPcHRpb25zKSA9PiB2b2lkO1xuICBASW5wdXQoKSB1cGRhdGVSZXF1ZXN0TGlzdCE6IChuZXdSZXF1ZXN0TGlzdDogUmVxdWVzdFtdKSA9PiB2b2lkO1xuXG4gIGZhTWljcm9waG9uZSA9IGZhTWljcm9waG9uZTtcbiAgZmFEZXNrdG9wID0gZmFEZXNrdG9wO1xuICBmYVZpZGVvID0gZmFWaWRlbztcbiAgZmFDb21tZW50cyA9IGZhQ29tbWVudHM7XG4gIGZhQ2hlY2sgPSBmYUNoZWNrO1xuICBmYVRpbWVzID0gZmFUaW1lcztcblxuICBrZXlNYXA6IHsgW2tleTogc3RyaW5nXTogSWNvbkRlZmluaXRpb24gfSA9IHtcbiAgICAnZmEtbWljcm9waG9uZSc6IHRoaXMuZmFNaWNyb3Bob25lLFxuICAgICdmYS1kZXNrdG9wJzogdGhpcy5mYURlc2t0b3AsXG4gICAgJ2ZhLXZpZGVvJzogdGhpcy5mYVZpZGVvLFxuICAgICdmYS1jb21tZW50cyc6IHRoaXMuZmFDb21tZW50cyxcbiAgfTtcblxuICBnZXRJY29uKGljb25OYW1lOiBzdHJpbmcpOiBJY29uRGVmaW5pdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMua2V5TWFwW2ljb25OYW1lXTtcbiAgfVxuXG4gIGhhbmRsZVJlcXVlc3RBY3Rpb24gPSAoYWN0aW9uOiBzdHJpbmcpID0+IHtcbiAgICB0aGlzLm9uUmVxdWVzdEl0ZW1QcmVzcyh7XG4gICAgICByZXF1ZXN0OiB0aGlzLnJlcXVlc3QsXG4gICAgICB1cGRhdGVSZXF1ZXN0TGlzdDogdGhpcy51cGRhdGVSZXF1ZXN0TGlzdCxcbiAgICAgIHJlcXVlc3RMaXN0OiB0aGlzLnJlcXVlc3RMaXN0LFxuICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgICByb29tTmFtZTogdGhpcy5yb29tTmFtZSxcbiAgICAgIHNvY2tldDogdGhpcy5zb2NrZXQsXG4gICAgfSk7XG4gIH07XG59XG4iLCI8ZGl2IGNsYXNzPVwicmVxdWVzdC1jb250YWluZXJcIiAqbmdJZj1cInJlcXVlc3RcIj5cclxuICA8ZGl2IGNsYXNzPVwicmVxdWVzdC1uYW1lXCI+e3sgcmVxdWVzdC5uYW1lIH19PC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cInJlcXVlc3QtaWNvblwiPlxyXG4gICAgPGZhLWljb24gW2ljb25dPVwiZ2V0SWNvbihyZXF1ZXN0Lmljb24pXCIgc2l6ZT1cImxnXCIgY29sb3I9XCJibGFja1wiPjwvZmEtaWNvbj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicmVxdWVzdC1hY3Rpb24gYWNjZXB0XCI+XHJcbiAgICA8YnV0dG9uIChjbGljayk9XCJoYW5kbGVSZXF1ZXN0QWN0aW9uKCdhY2NlcHRlZCcpXCI+XHJcbiAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhQ2hlY2tcIiBzaXplPVwibGdcIiBzdHlsZT1cImNvbG9yOiBncmVlbjtcIj48L2ZhLWljb24+XHJcbiAgICA8L2J1dHRvbj5cclxuICA8L2Rpdj5cclxuICA8ZGl2IGNsYXNzPVwicmVxdWVzdC1hY3Rpb24gcmVqZWN0XCI+XHJcbiAgICA8YnV0dG9uIChjbGljayk9XCJoYW5kbGVSZXF1ZXN0QWN0aW9uKCdyZWplY3RlZCcpXCI+XHJcbiAgICAgIDxmYS1pY29uIFtpY29uXT1cImZhVGltZXNcIiBzaXplPVwibGdcIiBzdHlsZT1cImNvbG9yOiByZWQ7XCI+PC9mYS1pY29uPlxyXG4gICAgPC9idXR0b24+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=