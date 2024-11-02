import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import * as i0 from "@angular/core";
import * as i1 from "@fortawesome/angular-fontawesome";
/**
 * Component for displaying an individual participant item in the "others" participant list.
 * Provides a display name with conditional labels for roles such as host, co-host, or self.
 *
 * @component
 * @selector app-participant-list-others-item
 * @standalone true
 * @templateUrl ./participant-list-others-item.component.html
 * @styleUrls ['./participant-list-others-item.component.css']
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @example
 * ```html
 * <app-participant-list-others-item [participant]="participant" [member]="currentMember" [coHost]="coHostID">
 * </app-participant-list-others-item>
 * ```
 */
export class ParticipantListOthersItem {
    participant;
    member;
    coHost;
    faCircle = faCircle;
    getParticipantDisplayName() {
        if (this.participant.islevel === '2') {
            return this.participant.name === this.member
                ? `${this.participant.name} (you)`
                : `${this.participant.name} (host)`;
        }
        else {
            if (this.participant.name === this.member) {
                return `${this.participant.name} (you)`;
            }
            else if (this.coHost === this.participant.name) {
                return `${this.participant.name} (co-host)`;
            }
            else {
                return this.participant.name;
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ParticipantListOthersItem, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: ParticipantListOthersItem, isStandalone: true, selector: "app-participant-list-others-item", inputs: { participant: "participant", member: "member", coHost: "coHost" }, ngImport: i0, template: "<div class=\"container\">\r\n  <div class=\"name-container\">\r\n    <span class=\"name-text\">\r\n      {{ getParticipantDisplayName() }}\r\n    </span>\r\n  </div>\r\n  <div class=\"icon-container\">\r\n    <fa-icon [icon]=\"faCircle\" [style.color]=\"participant.muted ? 'red' : 'green'\"></fa-icon>\r\n  </div>\r\n</div>\r\n", styles: [".container{display:flex;flex-direction:row;align-items:center;margin-bottom:10px}.name-container{flex:8}.name-text{font-size:16px}.icon-container{flex:4;display:flex;align-items:center}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i1.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ParticipantListOthersItem, decorators: [{
            type: Component,
            args: [{ selector: 'app-participant-list-others-item', standalone: true, imports: [CommonModule, FontAwesomeModule], template: "<div class=\"container\">\r\n  <div class=\"name-container\">\r\n    <span class=\"name-text\">\r\n      {{ getParticipantDisplayName() }}\r\n    </span>\r\n  </div>\r\n  <div class=\"icon-container\">\r\n    <fa-icon [icon]=\"faCircle\" [style.color]=\"participant.muted ? 'red' : 'green'\"></fa-icon>\r\n  </div>\r\n</div>\r\n", styles: [".container{display:flex;flex-direction:row;align-items:center;margin-bottom:10px}.name-container{flex:8}.name-text{font-size:16px}.icon-container{flex:4;display:flex;align-items:center}\n"] }]
        }], propDecorators: { participant: [{
                type: Input
            }], member: [{
                type: Input
            }], coHost: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGljaXBhbnQtbGlzdC1vdGhlcnMtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9wYXJ0aWNpcGFudHMtY29tcG9uZW50cy9wYXJ0aWNpcGFudC1saXN0LW90aGVycy1pdGVtL3BhcnRpY2lwYW50LWxpc3Qtb3RoZXJzLWl0ZW0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvcGFydGljaXBhbnRzLWNvbXBvbmVudHMvcGFydGljaXBhbnQtbGlzdC1vdGhlcnMtaXRlbS9wYXJ0aWNpcGFudC1saXN0LW90aGVycy1pdGVtLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7OztBQWE3RDs7Ozs7Ozs7Ozs7Ozs7OztHQWdCRztBQVVILE1BQU0sT0FBTyx5QkFBeUI7SUFDM0IsV0FBVyxDQUFlO0lBQzFCLE1BQU0sQ0FBVTtJQUNoQixNQUFNLENBQVU7SUFFekIsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUVwQix5QkFBeUI7UUFDdkIsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sS0FBSyxHQUFHLEVBQUUsQ0FBQztZQUNyQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxNQUFNO2dCQUMxQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksUUFBUTtnQkFDbEMsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFNBQVMsQ0FBQztRQUN4QyxDQUFDO2FBQU0sQ0FBQztZQUNOLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUMxQyxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFFBQVEsQ0FBQztZQUMxQyxDQUFDO2lCQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUNqRCxPQUFPLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLFlBQVksQ0FBQztZQUM5QyxDQUFDO2lCQUFNLENBQUM7Z0JBQ04sT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUMvQixDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7dUdBckJVLHlCQUF5QjsyRkFBekIseUJBQXlCLHdLQzFDdEMsMFVBVUEsb1BENEJZLFlBQVksOEJBQUUsaUJBQWlCOzsyRkFJOUIseUJBQXlCO2tCQVByQyxTQUFTOytCQUNFLGtDQUFrQyxjQUNoQyxJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUM7OEJBS2pDLFdBQVc7c0JBQW5CLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBGb250QXdlc29tZU1vZHVsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9hbmd1bGFyLWZvbnRhd2Vzb21lJztcbmltcG9ydCB7IGZhQ2lyY2xlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IFBhcnRpY2lwYW50IH0gZnJvbSAnLi4vLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBQYXJ0aWNpcGFudExpc3RPdGhlcnNJdGVtT3B0aW9ucyB7XG4gIHBhcnRpY2lwYW50OiBQYXJ0aWNpcGFudDtcbiAgbWVtYmVyOiBzdHJpbmc7XG4gIGNvSG9zdDogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBQYXJ0aWNpcGFudExpc3RPdGhlcnNJdGVtVHlwZSA9IChcbiAgb3B0aW9uczogUGFydGljaXBhbnRMaXN0T3RoZXJzSXRlbU9wdGlvbnMsXG4pID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgZGlzcGxheWluZyBhbiBpbmRpdmlkdWFsIHBhcnRpY2lwYW50IGl0ZW0gaW4gdGhlIFwib3RoZXJzXCIgcGFydGljaXBhbnQgbGlzdC5cbiAqIFByb3ZpZGVzIGEgZGlzcGxheSBuYW1lIHdpdGggY29uZGl0aW9uYWwgbGFiZWxzIGZvciByb2xlcyBzdWNoIGFzIGhvc3QsIGNvLWhvc3QsIG9yIHNlbGYuXG4gKlxuICogQGNvbXBvbmVudFxuICogQHNlbGVjdG9yIGFwcC1wYXJ0aWNpcGFudC1saXN0LW90aGVycy1pdGVtXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAdGVtcGxhdGVVcmwgLi9wYXJ0aWNpcGFudC1saXN0LW90aGVycy1pdGVtLmNvbXBvbmVudC5odG1sXG4gKiBAc3R5bGVVcmxzIFsnLi9wYXJ0aWNpcGFudC1saXN0LW90aGVycy1pdGVtLmNvbXBvbmVudC5jc3MnXVxuICogQGltcG9ydHMgW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdXG4gKlxuICogQGV4YW1wbGVcbiAqIGBgYGh0bWxcbiAqIDxhcHAtcGFydGljaXBhbnQtbGlzdC1vdGhlcnMtaXRlbSBbcGFydGljaXBhbnRdPVwicGFydGljaXBhbnRcIiBbbWVtYmVyXT1cImN1cnJlbnRNZW1iZXJcIiBbY29Ib3N0XT1cImNvSG9zdElEXCI+XG4gKiA8L2FwcC1wYXJ0aWNpcGFudC1saXN0LW90aGVycy1pdGVtPlxuICogYGBgXG4gKi9cblxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhcHAtcGFydGljaXBhbnQtbGlzdC1vdGhlcnMtaXRlbScsXG4gIHN0YW5kYWxvbmU6IHRydWUsXG4gIGltcG9ydHM6IFtDb21tb25Nb2R1bGUsIEZvbnRBd2Vzb21lTW9kdWxlXSxcbiAgdGVtcGxhdGVVcmw6ICcuL3BhcnRpY2lwYW50LWxpc3Qtb3RoZXJzLWl0ZW0uY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9wYXJ0aWNpcGFudC1saXN0LW90aGVycy1pdGVtLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgUGFydGljaXBhbnRMaXN0T3RoZXJzSXRlbSB7XG4gIEBJbnB1dCgpIHBhcnRpY2lwYW50ITogUGFydGljaXBhbnQ7XG4gIEBJbnB1dCgpIG1lbWJlciE6IHN0cmluZztcbiAgQElucHV0KCkgY29Ib3N0ITogc3RyaW5nO1xuXG4gIGZhQ2lyY2xlID0gZmFDaXJjbGU7XG5cbiAgZ2V0UGFydGljaXBhbnREaXNwbGF5TmFtZSgpOiBzdHJpbmcge1xuICAgIGlmICh0aGlzLnBhcnRpY2lwYW50LmlzbGV2ZWwgPT09ICcyJykge1xuICAgICAgcmV0dXJuIHRoaXMucGFydGljaXBhbnQubmFtZSA9PT0gdGhpcy5tZW1iZXJcbiAgICAgICAgPyBgJHt0aGlzLnBhcnRpY2lwYW50Lm5hbWV9ICh5b3UpYFxuICAgICAgICA6IGAke3RoaXMucGFydGljaXBhbnQubmFtZX0gKGhvc3QpYDtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMucGFydGljaXBhbnQubmFtZSA9PT0gdGhpcy5tZW1iZXIpIHtcbiAgICAgICAgcmV0dXJuIGAke3RoaXMucGFydGljaXBhbnQubmFtZX0gKHlvdSlgO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLmNvSG9zdCA9PT0gdGhpcy5wYXJ0aWNpcGFudC5uYW1lKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnBhcnRpY2lwYW50Lm5hbWV9IChjby1ob3N0KWA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdGhpcy5wYXJ0aWNpcGFudC5uYW1lO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cImNvbnRhaW5lclwiPlxyXG4gIDxkaXYgY2xhc3M9XCJuYW1lLWNvbnRhaW5lclwiPlxyXG4gICAgPHNwYW4gY2xhc3M9XCJuYW1lLXRleHRcIj5cclxuICAgICAge3sgZ2V0UGFydGljaXBhbnREaXNwbGF5TmFtZSgpIH19XHJcbiAgICA8L3NwYW4+XHJcbiAgPC9kaXY+XHJcbiAgPGRpdiBjbGFzcz1cImljb24tY29udGFpbmVyXCI+XHJcbiAgICA8ZmEtaWNvbiBbaWNvbl09XCJmYUNpcmNsZVwiIFtzdHlsZS5jb2xvcl09XCJwYXJ0aWNpcGFudC5tdXRlZCA/ICdyZWQnIDogJ2dyZWVuJ1wiPjwvZmEtaWNvbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==