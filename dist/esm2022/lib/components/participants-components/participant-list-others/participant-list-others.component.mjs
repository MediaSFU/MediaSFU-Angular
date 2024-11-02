import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParticipantListOthersItem } from '../participant-list-others-item/participant-list-others-item.component';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * Component for displaying a list of other participants.
 * It renders individual participant items within the list.
 *
 * @component
 * @selector app-participant-list-others
 * @standalone true
 * @templateUrl ./participant-list-others.component.html
 * @styleUrls ['./participant-list-others.component.css']
 * @imports [CommonModule, ParticipantListOthersItem]
 *
 * @example
 * ```html
 * <app-participant-list-others [participants]="participantsList" [coHost]="coHostID" [member]="memberID">
 * </app-participant-list-others>
 * ```
 */
export class ParticipantListOthers {
    participants = [];
    coHost = '';
    member = '';
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ParticipantListOthers, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: ParticipantListOthers, isStandalone: true, selector: "app-participant-list-others", inputs: { participants: "participants", coHost: "coHost", member: "member" }, ngImport: i0, template: "<div *ngFor=\"let participant of participants; let i = index\">\r\n  <app-participant-list-others-item\r\n    [participant]=\"participant\"\r\n    [coHost]=\"coHost\"\r\n    [member]=\"member\"\r\n  ></app-participant-list-others-item>\r\n  <hr *ngIf=\"i < participants.length - 1\" class=\"separator\" />\r\n</div>\r\n", styles: [".separator{border:none;border-top:1px solid #e0e0e0;margin:10px 0}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "component", type: ParticipantListOthersItem, selector: "app-participant-list-others-item", inputs: ["participant", "member", "coHost"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ParticipantListOthers, decorators: [{
            type: Component,
            args: [{ selector: 'app-participant-list-others', standalone: true, imports: [CommonModule, ParticipantListOthersItem], template: "<div *ngFor=\"let participant of participants; let i = index\">\r\n  <app-participant-list-others-item\r\n    [participant]=\"participant\"\r\n    [coHost]=\"coHost\"\r\n    [member]=\"member\"\r\n  ></app-participant-list-others-item>\r\n  <hr *ngIf=\"i < participants.length - 1\" class=\"separator\" />\r\n</div>\r\n", styles: [".separator{border:none;border-top:1px solid #e0e0e0;margin:10px 0}\n"] }]
        }], propDecorators: { participants: [{
                type: Input
            }], coHost: [{
                type: Input
            }], member: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGljaXBhbnQtbGlzdC1vdGhlcnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvcGFydGljaXBhbnRzLWNvbXBvbmVudHMvcGFydGljaXBhbnQtbGlzdC1vdGhlcnMvcGFydGljaXBhbnQtbGlzdC1vdGhlcnMuY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvcGFydGljaXBhbnRzLWNvbXBvbmVudHMvcGFydGljaXBhbnQtbGlzdC1vdGhlcnMvcGFydGljaXBhbnQtbGlzdC1vdGhlcnMuY29tcG9uZW50Lmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxNQUFNLHdFQUF3RSxDQUFDOzs7QUFXbkg7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQkc7QUFVSCxNQUFNLE9BQU8scUJBQXFCO0lBQ3ZCLFlBQVksR0FBa0IsRUFBRSxDQUFDO0lBQ2pDLE1BQU0sR0FBRyxFQUFFLENBQUM7SUFDWixNQUFNLEdBQUcsRUFBRSxDQUFDO3VHQUhWLHFCQUFxQjsyRkFBckIscUJBQXFCLHFLQ3ZDbEMsaVVBUUEsNkhEMkJZLFlBQVksZ1FBQUUseUJBQXlCOzsyRkFJdEMscUJBQXFCO2tCQVBqQyxTQUFTOytCQUNFLDZCQUE2QixjQUMzQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUseUJBQXlCLENBQUM7OEJBS3pDLFlBQVk7c0JBQXBCLEtBQUs7Z0JBQ0csTUFBTTtzQkFBZCxLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudExpc3RPdGhlcnNJdGVtIH0gZnJvbSAnLi4vcGFydGljaXBhbnQtbGlzdC1vdGhlcnMtaXRlbS9wYXJ0aWNpcGFudC1saXN0LW90aGVycy1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudCB9IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFydGljaXBhbnRMaXN0T3RoZXJzT3B0aW9ucyB7XG4gIHBhcnRpY2lwYW50czogUGFydGljaXBhbnRbXTtcbiAgY29Ib3N0OiBzdHJpbmc7XG4gIG1lbWJlcjogc3RyaW5nO1xufVxuXG5leHBvcnQgdHlwZSBQYXJ0aWNpcGFudExpc3RPdGhlcnNUeXBlID0gKG9wdGlvbnM6IFBhcnRpY2lwYW50TGlzdE90aGVyc09wdGlvbnMpID0+IEhUTUxFbGVtZW50O1xuXG4vKipcbiAqIENvbXBvbmVudCBmb3IgZGlzcGxheWluZyBhIGxpc3Qgb2Ygb3RoZXIgcGFydGljaXBhbnRzLlxuICogSXQgcmVuZGVycyBpbmRpdmlkdWFsIHBhcnRpY2lwYW50IGl0ZW1zIHdpdGhpbiB0aGUgbGlzdC5cbiAqXG4gKiBAY29tcG9uZW50XG4gKiBAc2VsZWN0b3IgYXBwLXBhcnRpY2lwYW50LWxpc3Qtb3RoZXJzXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAdGVtcGxhdGVVcmwgLi9wYXJ0aWNpcGFudC1saXN0LW90aGVycy5jb21wb25lbnQuaHRtbFxuICogQHN0eWxlVXJscyBbJy4vcGFydGljaXBhbnQtbGlzdC1vdGhlcnMuY29tcG9uZW50LmNzcyddXG4gKiBAaW1wb3J0cyBbQ29tbW9uTW9kdWxlLCBQYXJ0aWNpcGFudExpc3RPdGhlcnNJdGVtXVxuICpcbiAqIEBleGFtcGxlXG4gKiBgYGBodG1sXG4gKiA8YXBwLXBhcnRpY2lwYW50LWxpc3Qtb3RoZXJzIFtwYXJ0aWNpcGFudHNdPVwicGFydGljaXBhbnRzTGlzdFwiIFtjb0hvc3RdPVwiY29Ib3N0SURcIiBbbWVtYmVyXT1cIm1lbWJlcklEXCI+XG4gKiA8L2FwcC1wYXJ0aWNpcGFudC1saXN0LW90aGVycz5cbiAqIGBgYFxuICovXG5cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXBhcnRpY2lwYW50LWxpc3Qtb3RoZXJzJyxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgUGFydGljaXBhbnRMaXN0T3RoZXJzSXRlbV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9wYXJ0aWNpcGFudC1saXN0LW90aGVycy5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3BhcnRpY2lwYW50LWxpc3Qtb3RoZXJzLmNvbXBvbmVudC5jc3MnXSxcbn0pXG5leHBvcnQgY2xhc3MgUGFydGljaXBhbnRMaXN0T3RoZXJzIHtcbiAgQElucHV0KCkgcGFydGljaXBhbnRzOiBQYXJ0aWNpcGFudFtdID0gW107XG4gIEBJbnB1dCgpIGNvSG9zdCA9ICcnO1xuICBASW5wdXQoKSBtZW1iZXIgPSAnJztcbn1cbiIsIjxkaXYgKm5nRm9yPVwibGV0IHBhcnRpY2lwYW50IG9mIHBhcnRpY2lwYW50czsgbGV0IGkgPSBpbmRleFwiPlxyXG4gIDxhcHAtcGFydGljaXBhbnQtbGlzdC1vdGhlcnMtaXRlbVxyXG4gICAgW3BhcnRpY2lwYW50XT1cInBhcnRpY2lwYW50XCJcclxuICAgIFtjb0hvc3RdPVwiY29Ib3N0XCJcclxuICAgIFttZW1iZXJdPVwibWVtYmVyXCJcclxuICA+PC9hcHAtcGFydGljaXBhbnQtbGlzdC1vdGhlcnMtaXRlbT5cclxuICA8aHIgKm5nSWY9XCJpIDwgcGFydGljaXBhbnRzLmxlbmd0aCAtIDFcIiBjbGFzcz1cInNlcGFyYXRvclwiIC8+XHJcbjwvZGl2PlxyXG4iXX0=