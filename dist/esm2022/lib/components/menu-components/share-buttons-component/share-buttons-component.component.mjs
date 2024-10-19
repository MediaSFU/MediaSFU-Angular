import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopy, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faWhatsapp, faTelegram } from '@fortawesome/free-brands-svg-icons';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "@fortawesome/angular-fontawesome";
/**
 * @component ShareButtonsComponent
 * @description This component provides a set of share buttons for different social media platforms and email.
 * It allows users to share a meeting link via various channels.
 *
 * @selector app-share-buttons-component
 * @templateUrl ./share-buttons-component.component.html
 * @styleUrls ./share-buttons-component.component.css
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @input {string} meetingID - The ID of the meeting to be shared.
 * @input {ShareButton[]} shareButtons - An array of custom share buttons.
 * @input {string} eventType - The type of event (e.g., 'chat', 'broadcast', 'webinar').
 *
 * @property {ShareButton[]} defaultShareButtons - The default set of share buttons.
 *
 * @getter {string} shareName - Determines the share name based on the event type.
 * @getter {ShareButton[]} filteredShareButtons - Returns the filtered share buttons based on visibility.
 */
export class ShareButtonsComponent {
    meetingID;
    shareButtons = [];
    eventType;
    defaultShareButtons = [
        {
            icon: faCopy,
            action: async () => {
                try {
                    await navigator.clipboard.writeText(`https://${this.shareName}.mediasfu.com/${this.shareName}/${this.meetingID}`);
                }
                catch (error) {
                    console.error('Failed to copy to clipboard:', error);
                }
            },
            show: true,
        },
        {
            icon: faEnvelope,
            action: () => {
                const emailUrl = `mailto:?subject=Join my meeting&body=Here's the link to the meeting: https://${this.shareName}.mediasfu.com/${this.shareName}/${this.meetingID}`;
                window.open(emailUrl, '_blank');
            },
            show: true,
        },
        {
            icon: faFacebook,
            action: () => {
                const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(`https://${this.shareName}.mediasfu.com/${this.shareName}/${this.meetingID}`)}`;
                window.open(facebookUrl, '_blank');
            },
            show: true,
        },
        {
            icon: faWhatsapp,
            action: () => {
                const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`https://${this.shareName}.mediasfu.com/${this.shareName}/${this.meetingID}`)}`;
                window.open(whatsappUrl, '_blank');
            },
            show: true,
        },
        {
            icon: faTelegram,
            action: () => {
                const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(`https://${this.shareName}.mediasfu.com/${this.shareName}/${this.meetingID}`)}`;
                window.open(telegramUrl, '_blank');
            },
            show: true,
        },
    ];
    get shareName() {
        return this.eventType === 'chat'
            ? 'chat'
            : this.eventType === 'broadcast'
                ? 'broadcast'
                : 'meeting';
    }
    get filteredShareButtons() {
        return this.shareButtons.length > 0
            ? this.shareButtons.filter((button) => button.show)
            : this.defaultShareButtons.filter((button) => button.show);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ShareButtonsComponent, deps: [], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "18.2.8", type: ShareButtonsComponent, isStandalone: true, selector: "app-share-buttons-component", inputs: { meetingID: "meetingID", shareButtons: "shareButtons", eventType: "eventType" }, ngImport: i0, template: "<div class=\"share-buttons-container\">\r\n  <div\r\n    *ngFor=\"let button of filteredShareButtons; let i = index\"\r\n    (click)=\"button.action()\"\r\n    [ngStyle]=\"{\r\n      'background-color': button.color || 'black',\r\n      'margin-right': i !== filteredShareButtons.length - 1 ? '10px' : '0'\r\n    }\"\r\n    class=\"share-button\"\r\n  >\r\n    <fa-icon [icon]=\"button.icon\" [ngStyle]=\"{ color: button.iconColor || '#ffffff', 'font-size': '24px' }\"></fa-icon>\r\n  </div>\r\n</div>\r\n", styles: [".share-buttons-container{display:flex;flex-direction:row;margin:10px 0}.share-button{display:flex;align-items:center;justify-content:center;padding:10px;border-radius:5px;margin:0 5px;cursor:pointer}\n"], dependencies: [{ kind: "ngmodule", type: CommonModule }, { kind: "directive", type: i1.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "ngmodule", type: FontAwesomeModule }, { kind: "component", type: i2.FaIconComponent, selector: "fa-icon", inputs: ["icon", "title", "animation", "mask", "flip", "size", "pull", "border", "inverse", "symbol", "rotate", "fixedWidth", "transform", "a11yRole"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ShareButtonsComponent, decorators: [{
            type: Component,
            args: [{ selector: 'app-share-buttons-component', standalone: true, imports: [CommonModule, FontAwesomeModule], template: "<div class=\"share-buttons-container\">\r\n  <div\r\n    *ngFor=\"let button of filteredShareButtons; let i = index\"\r\n    (click)=\"button.action()\"\r\n    [ngStyle]=\"{\r\n      'background-color': button.color || 'black',\r\n      'margin-right': i !== filteredShareButtons.length - 1 ? '10px' : '0'\r\n    }\"\r\n    class=\"share-button\"\r\n  >\r\n    <fa-icon [icon]=\"button.icon\" [ngStyle]=\"{ color: button.iconColor || '#ffffff', 'font-size': '24px' }\"></fa-icon>\r\n  </div>\r\n</div>\r\n", styles: [".share-buttons-container{display:flex;flex-direction:row;margin:10px 0}.share-button{display:flex;align-items:center;justify-content:center;padding:10px;border-radius:5px;margin:0 5px;cursor:pointer}\n"] }]
        }], propDecorators: { meetingID: [{
                type: Input
            }], shareButtons: [{
                type: Input
            }], eventType: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtYnV0dG9ucy1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvbWVudS1jb21wb25lbnRzL3NoYXJlLWJ1dHRvbnMtY29tcG9uZW50L3NoYXJlLWJ1dHRvbnMtY29tcG9uZW50LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21lbnUtY29tcG9uZW50cy9zaGFyZS1idXR0b25zLWNvbXBvbmVudC9zaGFyZS1idXR0b25zLWNvbXBvbmVudC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7OztBQW9CeEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQkc7QUFRSCxNQUFNLE9BQU8scUJBQXFCO0lBQ3ZCLFNBQVMsQ0FBVTtJQUNuQixZQUFZLEdBQWtCLEVBQUUsQ0FBQztJQUNqQyxTQUFTLENBQWE7SUFFL0IsbUJBQW1CLEdBQWtCO1FBQ25DO1lBQ0UsSUFBSSxFQUFFLE1BQU07WUFDWixNQUFNLEVBQUUsS0FBSyxJQUFJLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQztvQkFDSCxNQUFNLFNBQVMsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUNqQyxXQUFXLElBQUksQ0FBQyxTQUFTLGlCQUFpQixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FDN0UsQ0FBQztnQkFDSixDQUFDO2dCQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7b0JBQ2YsT0FBTyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLENBQUMsQ0FBQztnQkFDdkQsQ0FBQztZQUNILENBQUM7WUFDRCxJQUFJLEVBQUUsSUFBSTtTQUNYO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNYLE1BQU0sUUFBUSxHQUFHLGdGQUFnRixJQUFJLENBQUMsU0FBUyxpQkFBaUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ25LLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ2xDLENBQUM7WUFDRCxJQUFJLEVBQUUsSUFBSTtTQUNYO1FBQ0Q7WUFDRSxJQUFJLEVBQUUsVUFBVTtZQUNoQixNQUFNLEVBQUUsR0FBRyxFQUFFO2dCQUNYLE1BQU0sV0FBVyxHQUFHLGdEQUFnRCxrQkFBa0IsQ0FDcEYsV0FBVyxJQUFJLENBQUMsU0FBUyxpQkFBaUIsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQzdFLEVBQUUsQ0FBQztnQkFDSixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNyQyxDQUFDO1lBQ0QsSUFBSSxFQUFFLElBQUk7U0FDWDtRQUNEO1lBQ0UsSUFBSSxFQUFFLFVBQVU7WUFDaEIsTUFBTSxFQUFFLEdBQUcsRUFBRTtnQkFDWCxNQUFNLFdBQVcsR0FBRyx1QkFBdUIsa0JBQWtCLENBQzNELFdBQVcsSUFBSSxDQUFDLFNBQVMsaUJBQWlCLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUM3RSxFQUFFLENBQUM7Z0JBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7WUFDckMsQ0FBQztZQUNELElBQUksRUFBRSxJQUFJO1NBQ1g7UUFDRDtZQUNFLElBQUksRUFBRSxVQUFVO1lBQ2hCLE1BQU0sRUFBRSxHQUFHLEVBQUU7Z0JBQ1gsTUFBTSxXQUFXLEdBQUcsOEJBQThCLGtCQUFrQixDQUNsRSxXQUFXLElBQUksQ0FBQyxTQUFTLGlCQUFpQixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FDN0UsRUFBRSxDQUFDO2dCQUNKLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3JDLENBQUM7WUFDRCxJQUFJLEVBQUUsSUFBSTtTQUNYO0tBQ0YsQ0FBQztJQUVGLElBQUksU0FBUztRQUNYLE9BQU8sSUFBSSxDQUFDLFNBQVMsS0FBSyxNQUFNO1lBQzlCLENBQUMsQ0FBQyxNQUFNO1lBQ1IsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEtBQUssV0FBVztnQkFDaEMsQ0FBQyxDQUFDLFdBQVc7Z0JBQ2IsQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNoQixDQUFDO0lBRUQsSUFBSSxvQkFBb0I7UUFDdEIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ2pDLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztZQUNuRCxDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9ELENBQUM7dUdBdkVVLHFCQUFxQjsyRkFBckIscUJBQXFCLGlMQ25EbEMsMmZBYUEsa1FEb0NZLFlBQVksZ1BBQUUsaUJBQWlCOzsyRkFFOUIscUJBQXFCO2tCQVBqQyxTQUFTOytCQUNFLDZCQUE2QixjQUczQixJQUFJLFdBQ1AsQ0FBQyxZQUFZLEVBQUUsaUJBQWlCLENBQUM7OEJBR2pDLFNBQVM7c0JBQWpCLEtBQUs7Z0JBQ0csWUFBWTtzQkFBcEIsS0FBSztnQkFDRyxTQUFTO3NCQUFqQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEZvbnRBd2Vzb21lTW9kdWxlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2FuZ3VsYXItZm9udGF3ZXNvbWUnO1xuaW1wb3J0IHsgZmFDb3B5LCBmYUVudmVsb3BlIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IGZhRmFjZWJvb2ssIGZhV2hhdHNhcHAsIGZhVGVsZWdyYW0gfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1icmFuZHMtc3ZnLWljb25zJztcbmltcG9ydCB7IEljb25EZWZpbml0aW9uIH0gZnJvbSAnQGZvcnRhd2Vzb21lL2ZyZWUtc29saWQtc3ZnLWljb25zJztcbmltcG9ydCB7IEV2ZW50VHlwZSB9IGZyb20gJy4uLy4uLy4uL0B0eXBlcy90eXBlcyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2hhcmVCdXR0b24ge1xuICBpY29uOiBJY29uRGVmaW5pdGlvbjtcbiAgYWN0aW9uOiAoKSA9PiB2b2lkO1xuICBzaG93OiBib29sZWFuO1xuICBjb2xvcj86IHN0cmluZztcbiAgaWNvbkNvbG9yPzogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFNoYXJlQnV0dG9uc0NvbXBvbmVudE9wdGlvbnMge1xuICBtZWV0aW5nSUQ6IHN0cmluZztcbiAgc2hhcmVCdXR0b25zPzogU2hhcmVCdXR0b25bXTtcbiAgZXZlbnRUeXBlOiBFdmVudFR5cGU7XG59XG5cbmV4cG9ydCB0eXBlIFNoYXJlQnV0dG9uc0NvbXBvbmVudFR5cGUgPSAob3B0aW9uczogU2hhcmVCdXR0b25zQ29tcG9uZW50T3B0aW9ucykgPT4gSFRNTEVsZW1lbnQ7XG5cbi8qKlxuICogQGNvbXBvbmVudCBTaGFyZUJ1dHRvbnNDb21wb25lbnRcbiAqIEBkZXNjcmlwdGlvbiBUaGlzIGNvbXBvbmVudCBwcm92aWRlcyBhIHNldCBvZiBzaGFyZSBidXR0b25zIGZvciBkaWZmZXJlbnQgc29jaWFsIG1lZGlhIHBsYXRmb3JtcyBhbmQgZW1haWwuXG4gKiBJdCBhbGxvd3MgdXNlcnMgdG8gc2hhcmUgYSBtZWV0aW5nIGxpbmsgdmlhIHZhcmlvdXMgY2hhbm5lbHMuXG4gKlxuICogQHNlbGVjdG9yIGFwcC1zaGFyZS1idXR0b25zLWNvbXBvbmVudFxuICogQHRlbXBsYXRlVXJsIC4vc2hhcmUtYnV0dG9ucy1jb21wb25lbnQuY29tcG9uZW50Lmh0bWxcbiAqIEBzdHlsZVVybHMgLi9zaGFyZS1idXR0b25zLWNvbXBvbmVudC5jb21wb25lbnQuY3NzXG4gKiBAc3RhbmRhbG9uZSB0cnVlXG4gKiBAaW1wb3J0cyBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZV1cbiAqXG4gKiBAaW5wdXQge3N0cmluZ30gbWVldGluZ0lEIC0gVGhlIElEIG9mIHRoZSBtZWV0aW5nIHRvIGJlIHNoYXJlZC5cbiAqIEBpbnB1dCB7U2hhcmVCdXR0b25bXX0gc2hhcmVCdXR0b25zIC0gQW4gYXJyYXkgb2YgY3VzdG9tIHNoYXJlIGJ1dHRvbnMuXG4gKiBAaW5wdXQge3N0cmluZ30gZXZlbnRUeXBlIC0gVGhlIHR5cGUgb2YgZXZlbnQgKGUuZy4sICdjaGF0JywgJ2Jyb2FkY2FzdCcsICd3ZWJpbmFyJykuXG4gKlxuICogQHByb3BlcnR5IHtTaGFyZUJ1dHRvbltdfSBkZWZhdWx0U2hhcmVCdXR0b25zIC0gVGhlIGRlZmF1bHQgc2V0IG9mIHNoYXJlIGJ1dHRvbnMuXG4gKlxuICogQGdldHRlciB7c3RyaW5nfSBzaGFyZU5hbWUgLSBEZXRlcm1pbmVzIHRoZSBzaGFyZSBuYW1lIGJhc2VkIG9uIHRoZSBldmVudCB0eXBlLlxuICogQGdldHRlciB7U2hhcmVCdXR0b25bXX0gZmlsdGVyZWRTaGFyZUJ1dHRvbnMgLSBSZXR1cm5zIHRoZSBmaWx0ZXJlZCBzaGFyZSBidXR0b25zIGJhc2VkIG9uIHZpc2liaWxpdHkuXG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FwcC1zaGFyZS1idXR0b25zLWNvbXBvbmVudCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9zaGFyZS1idXR0b25zLWNvbXBvbmVudC5jb21wb25lbnQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL3NoYXJlLWJ1dHRvbnMtY29tcG9uZW50LmNvbXBvbmVudC5jc3MnXSxcbiAgc3RhbmRhbG9uZTogdHJ1ZSxcbiAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgRm9udEF3ZXNvbWVNb2R1bGVdLFxufSlcbmV4cG9ydCBjbGFzcyBTaGFyZUJ1dHRvbnNDb21wb25lbnQge1xuICBASW5wdXQoKSBtZWV0aW5nSUQhOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHNoYXJlQnV0dG9uczogU2hhcmVCdXR0b25bXSA9IFtdO1xuICBASW5wdXQoKSBldmVudFR5cGUhOiBFdmVudFR5cGU7XG5cbiAgZGVmYXVsdFNoYXJlQnV0dG9uczogU2hhcmVCdXR0b25bXSA9IFtcbiAgICB7XG4gICAgICBpY29uOiBmYUNvcHksXG4gICAgICBhY3Rpb246IGFzeW5jICgpID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBhd2FpdCBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChcbiAgICAgICAgICAgIGBodHRwczovLyR7dGhpcy5zaGFyZU5hbWV9Lm1lZGlhc2Z1LmNvbS8ke3RoaXMuc2hhcmVOYW1lfS8ke3RoaXMubWVldGluZ0lEfWAsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdGYWlsZWQgdG8gY29weSB0byBjbGlwYm9hcmQ6JywgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IGZhRW52ZWxvcGUsXG4gICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgY29uc3QgZW1haWxVcmwgPSBgbWFpbHRvOj9zdWJqZWN0PUpvaW4gbXkgbWVldGluZyZib2R5PUhlcmUncyB0aGUgbGluayB0byB0aGUgbWVldGluZzogaHR0cHM6Ly8ke3RoaXMuc2hhcmVOYW1lfS5tZWRpYXNmdS5jb20vJHt0aGlzLnNoYXJlTmFtZX0vJHt0aGlzLm1lZXRpbmdJRH1gO1xuICAgICAgICB3aW5kb3cub3BlbihlbWFpbFVybCwgJ19ibGFuaycpO1xuICAgICAgfSxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiBmYUZhY2Vib29rLFxuICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZhY2Vib29rVXJsID0gYGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIvc2hhcmVyLnBocD91PSR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgIGBodHRwczovLyR7dGhpcy5zaGFyZU5hbWV9Lm1lZGlhc2Z1LmNvbS8ke3RoaXMuc2hhcmVOYW1lfS8ke3RoaXMubWVldGluZ0lEfWAsXG4gICAgICAgICl9YDtcbiAgICAgICAgd2luZG93Lm9wZW4oZmFjZWJvb2tVcmwsICdfYmxhbmsnKTtcbiAgICAgIH0sXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogZmFXaGF0c2FwcCxcbiAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICBjb25zdCB3aGF0c2FwcFVybCA9IGBodHRwczovL3dhLm1lLz90ZXh0PSR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgIGBodHRwczovLyR7dGhpcy5zaGFyZU5hbWV9Lm1lZGlhc2Z1LmNvbS8ke3RoaXMuc2hhcmVOYW1lfS8ke3RoaXMubWVldGluZ0lEfWAsXG4gICAgICAgICl9YDtcbiAgICAgICAgd2luZG93Lm9wZW4od2hhdHNhcHBVcmwsICdfYmxhbmsnKTtcbiAgICAgIH0sXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogZmFUZWxlZ3JhbSxcbiAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICBjb25zdCB0ZWxlZ3JhbVVybCA9IGBodHRwczovL3QubWUvc2hhcmUvdXJsP3VybD0ke2VuY29kZVVSSUNvbXBvbmVudChcbiAgICAgICAgICBgaHR0cHM6Ly8ke3RoaXMuc2hhcmVOYW1lfS5tZWRpYXNmdS5jb20vJHt0aGlzLnNoYXJlTmFtZX0vJHt0aGlzLm1lZXRpbmdJRH1gLFxuICAgICAgICApfWA7XG4gICAgICAgIHdpbmRvdy5vcGVuKHRlbGVncmFtVXJsLCAnX2JsYW5rJyk7XG4gICAgICB9LFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICBdO1xuXG4gIGdldCBzaGFyZU5hbWUoKSB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnRUeXBlID09PSAnY2hhdCdcbiAgICAgID8gJ2NoYXQnXG4gICAgICA6IHRoaXMuZXZlbnRUeXBlID09PSAnYnJvYWRjYXN0J1xuICAgICAgPyAnYnJvYWRjYXN0J1xuICAgICAgOiAnbWVldGluZyc7XG4gIH1cblxuICBnZXQgZmlsdGVyZWRTaGFyZUJ1dHRvbnMoKSB7XG4gICAgcmV0dXJuIHRoaXMuc2hhcmVCdXR0b25zLmxlbmd0aCA+IDBcbiAgICAgID8gdGhpcy5zaGFyZUJ1dHRvbnMuZmlsdGVyKChidXR0b24pID0+IGJ1dHRvbi5zaG93KVxuICAgICAgOiB0aGlzLmRlZmF1bHRTaGFyZUJ1dHRvbnMuZmlsdGVyKChidXR0b24pID0+IGJ1dHRvbi5zaG93KTtcbiAgfVxufVxuIiwiPGRpdiBjbGFzcz1cInNoYXJlLWJ1dHRvbnMtY29udGFpbmVyXCI+XHJcbiAgPGRpdlxyXG4gICAgKm5nRm9yPVwibGV0IGJ1dHRvbiBvZiBmaWx0ZXJlZFNoYXJlQnV0dG9uczsgbGV0IGkgPSBpbmRleFwiXHJcbiAgICAoY2xpY2spPVwiYnV0dG9uLmFjdGlvbigpXCJcclxuICAgIFtuZ1N0eWxlXT1cIntcclxuICAgICAgJ2JhY2tncm91bmQtY29sb3InOiBidXR0b24uY29sb3IgfHwgJ2JsYWNrJyxcclxuICAgICAgJ21hcmdpbi1yaWdodCc6IGkgIT09IGZpbHRlcmVkU2hhcmVCdXR0b25zLmxlbmd0aCAtIDEgPyAnMTBweCcgOiAnMCdcclxuICAgIH1cIlxyXG4gICAgY2xhc3M9XCJzaGFyZS1idXR0b25cIlxyXG4gID5cclxuICAgIDxmYS1pY29uIFtpY29uXT1cImJ1dHRvbi5pY29uXCIgW25nU3R5bGVdPVwieyBjb2xvcjogYnV0dG9uLmljb25Db2xvciB8fCAnI2ZmZmZmZicsICdmb250LXNpemUnOiAnMjRweCcgfVwiPjwvZmEtaWNvbj5cclxuICA8L2Rpdj5cclxuPC9kaXY+XHJcbiJdfQ==