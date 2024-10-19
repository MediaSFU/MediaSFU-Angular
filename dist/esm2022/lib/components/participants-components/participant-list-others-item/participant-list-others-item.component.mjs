import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
import * as i0 from "@angular/core";
import * as i1 from "@fortawesome/angular-fontawesome";
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFydGljaXBhbnQtbGlzdC1vdGhlcnMtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvY29tcG9uZW50cy9wYXJ0aWNpcGFudHMtY29tcG9uZW50cy9wYXJ0aWNpcGFudC1saXN0LW90aGVycy1pdGVtL3BhcnRpY2lwYW50LWxpc3Qtb3RoZXJzLWl0ZW0uY29tcG9uZW50LnRzIiwiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvcGFydGljaXBhbnRzLWNvbXBvbmVudHMvcGFydGljaXBhbnQtbGlzdC1vdGhlcnMtaXRlbS9wYXJ0aWNpcGFudC1saXN0LW90aGVycy1pdGVtLmNvbXBvbmVudC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sbUNBQW1DLENBQUM7OztBQW9CN0QsTUFBTSxPQUFPLHlCQUF5QjtJQUMzQixXQUFXLENBQWU7SUFDMUIsTUFBTSxDQUFVO0lBQ2hCLE1BQU0sQ0FBVTtJQUV6QixRQUFRLEdBQUcsUUFBUSxDQUFDO0lBRXBCLHlCQUF5QjtRQUN2QixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBQ3JDLE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLE1BQU07Z0JBQzFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxRQUFRO2dCQUNsQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksU0FBUyxDQUFDO1FBQ3hDLENBQUM7YUFBTSxDQUFDO1lBQ04sSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQzFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksUUFBUSxDQUFDO1lBQzFDLENBQUM7aUJBQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ2pELE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksWUFBWSxDQUFDO1lBQzlDLENBQUM7aUJBQU0sQ0FBQztnQkFDTixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQy9CLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQzt1R0FyQlUseUJBQXlCOzJGQUF6Qix5QkFBeUIsd0tDdkJ0QywwVUFVQSxvUERTWSxZQUFZLDhCQUFFLGlCQUFpQjs7MkZBSTlCLHlCQUF5QjtrQkFQckMsU0FBUzsrQkFDRSxrQ0FBa0MsY0FDaEMsSUFBSSxXQUNQLENBQUMsWUFBWSxFQUFFLGlCQUFpQixDQUFDOzhCQUtqQyxXQUFXO3NCQUFuQixLQUFLO2dCQUNHLE1BQU07c0JBQWQsS0FBSztnQkFDRyxNQUFNO3NCQUFkLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XG5pbXBvcnQgeyBmYUNpcmNsZSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLXNvbGlkLXN2Zy1pY29ucyc7XG5pbXBvcnQgeyBQYXJ0aWNpcGFudCB9IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGFydGljaXBhbnRMaXN0T3RoZXJzSXRlbU9wdGlvbnMge1xuICBwYXJ0aWNpcGFudDogUGFydGljaXBhbnQ7XG4gIG1lbWJlcjogc3RyaW5nO1xuICBjb0hvc3Q6IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgUGFydGljaXBhbnRMaXN0T3RoZXJzSXRlbVR5cGUgPSAoXG4gIG9wdGlvbnM6IFBhcnRpY2lwYW50TGlzdE90aGVyc0l0ZW1PcHRpb25zLFxuKSA9PiBIVE1MRWxlbWVudDtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXBhcnRpY2lwYW50LWxpc3Qtb3RoZXJzLWl0ZW0nLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZV0sXG4gIHRlbXBsYXRlVXJsOiAnLi9wYXJ0aWNpcGFudC1saXN0LW90aGVycy1pdGVtLmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vcGFydGljaXBhbnQtbGlzdC1vdGhlcnMtaXRlbS5jb21wb25lbnQuY3NzJ10sXG59KVxuZXhwb3J0IGNsYXNzIFBhcnRpY2lwYW50TGlzdE90aGVyc0l0ZW0ge1xuICBASW5wdXQoKSBwYXJ0aWNpcGFudCE6IFBhcnRpY2lwYW50O1xuICBASW5wdXQoKSBtZW1iZXIhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGNvSG9zdCE6IHN0cmluZztcblxuICBmYUNpcmNsZSA9IGZhQ2lyY2xlO1xuXG4gIGdldFBhcnRpY2lwYW50RGlzcGxheU5hbWUoKTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5wYXJ0aWNpcGFudC5pc2xldmVsID09PSAnMicpIHtcbiAgICAgIHJldHVybiB0aGlzLnBhcnRpY2lwYW50Lm5hbWUgPT09IHRoaXMubWVtYmVyXG4gICAgICAgID8gYCR7dGhpcy5wYXJ0aWNpcGFudC5uYW1lfSAoeW91KWBcbiAgICAgICAgOiBgJHt0aGlzLnBhcnRpY2lwYW50Lm5hbWV9IChob3N0KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLnBhcnRpY2lwYW50Lm5hbWUgPT09IHRoaXMubWVtYmVyKSB7XG4gICAgICAgIHJldHVybiBgJHt0aGlzLnBhcnRpY2lwYW50Lm5hbWV9ICh5b3UpYDtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5jb0hvc3QgPT09IHRoaXMucGFydGljaXBhbnQubmFtZSkge1xuICAgICAgICByZXR1cm4gYCR7dGhpcy5wYXJ0aWNpcGFudC5uYW1lfSAoY28taG9zdClgO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucGFydGljaXBhbnQubmFtZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiIsIjxkaXYgY2xhc3M9XCJjb250YWluZXJcIj5cclxuICA8ZGl2IGNsYXNzPVwibmFtZS1jb250YWluZXJcIj5cclxuICAgIDxzcGFuIGNsYXNzPVwibmFtZS10ZXh0XCI+XHJcbiAgICAgIHt7IGdldFBhcnRpY2lwYW50RGlzcGxheU5hbWUoKSB9fVxyXG4gICAgPC9zcGFuPlxyXG4gIDwvZGl2PlxyXG4gIDxkaXYgY2xhc3M9XCJpY29uLWNvbnRhaW5lclwiPlxyXG4gICAgPGZhLWljb24gW2ljb25dPVwiZmFDaXJjbGVcIiBbc3R5bGUuY29sb3JdPVwicGFydGljaXBhbnQubXV0ZWQgPyAncmVkJyA6ICdncmVlbidcIj48L2ZhLWljb24+XHJcbiAgPC9kaXY+XHJcbjwvZGl2PlxyXG4iXX0=