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
 * @selector app-share-buttons-component
 * @standalone true
 * @description Displays a set of share buttons for sharing a meeting link on social media and email.
 *
 * @example
 * ```html
 * <app-share-buttons-component
 *   [meetingID]="'12345'"
 *   [eventType]="'broadcast'"
 *   [shareButtons]="customShareButtons"
 * ></app-share-buttons-component>
 * ```
 *
 * ```typescript
 * const customShareButtons = [
 *   { icon: faEnvelope, action: () => console.log('Email'), show: true },
 *   { icon: faFacebook, action: () => console.log('Facebook'), show: true },
 * ];
 * ```
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmUtYnV0dG9ucy1jb21wb25lbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvbWVkaWFzZnUtYW5ndWxhci9zcmMvbGliL2NvbXBvbmVudHMvbWVudS1jb21wb25lbnRzL3NoYXJlLWJ1dHRvbnMtY29tcG9uZW50L3NoYXJlLWJ1dHRvbnMtY29tcG9uZW50LmNvbXBvbmVudC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9jb21wb25lbnRzL21lbnUtY29tcG9uZW50cy9zaGFyZS1idXR0b25zLWNvbXBvbmVudC9zaGFyZS1idXR0b25zLWNvbXBvbmVudC5jb21wb25lbnQuaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFDckUsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsTUFBTSxvQ0FBb0MsQ0FBQzs7OztBQW9CeEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQVNILE1BQU0sT0FBTyxxQkFBcUI7SUFDdkIsU0FBUyxDQUFVO0lBQ25CLFlBQVksR0FBa0IsRUFBRSxDQUFDO0lBQ2pDLFNBQVMsQ0FBYTtJQUUvQixtQkFBbUIsR0FBa0I7UUFDbkM7WUFDRSxJQUFJLEVBQUUsTUFBTTtZQUNaLE1BQU0sRUFBRSxLQUFLLElBQUksRUFBRTtnQkFDakIsSUFBSSxDQUFDO29CQUNILE1BQU0sU0FBUyxDQUFDLFNBQVMsQ0FBQyxTQUFT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QUksV0FDUCxDQUFDLFlBQVksRUFBRSxpQkFBaUIsQ0FBQzs4QkFHakMsU0FBUztzQkFBakIsS0FBSztnQkFDRyxZQUFZO3NCQUFwQixLQUFLO2dCQUNHLFNBQVM7c0JBQWpCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRm9udEF3ZXNvbWVNb2R1bGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvYW5ndWxhci1mb250YXdlc29tZSc7XG5pbXBvcnQgeyBmYUNvcHksIGZhRW52ZWxvcGUgfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgZmFGYWNlYm9vaywgZmFXaGF0c2FwcCwgZmFUZWxlZ3JhbSB9IGZyb20gJ0Bmb3J0YXdlc29tZS9mcmVlLWJyYW5kcy1zdmctaWNvbnMnO1xuaW1wb3J0IHsgSWNvbkRlZmluaXRpb24gfSBmcm9tICdAZm9ydGF3ZXNvbWUvZnJlZS1zb2xpZC1zdmctaWNvbnMnO1xuaW1wb3J0IHsgRXZlbnRUeXBlIH0gZnJvbSAnLi4vLi4vLi4vQHR5cGVzL3R5cGVzJztcblxuZXhwb3J0IGludGVyZmFjZSBTaGFyZUJ1dHRvbiB7XG4gIGljb246IEljb25EZWZpbml0aW9uO1xuICBhY3Rpb246ICgpID0+IHZvaWQ7XG4gIHNob3c6IGJvb2xlYW47XG4gIGNvbG9yPzogc3RyaW5nO1xuICBpY29uQ29sb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2hhcmVCdXR0b25zQ29tcG9uZW50T3B0aW9ucyB7XG4gIG1lZXRpbmdJRDogc3RyaW5nO1xuICBzaGFyZUJ1dHRvbnM/OiBTaGFyZUJ1dHRvbltdO1xuICBldmVudFR5cGU6IEV2ZW50VHlwZTtcbn1cblxuZXhwb3J0IHR5cGUgU2hhcmVCdXR0b25zQ29tcG9uZW50VHlwZSA9IChvcHRpb25zOiBTaGFyZUJ1dHRvbnNDb21wb25lbnRPcHRpb25zKSA9PiBIVE1MRWxlbWVudDtcblxuLyoqXG4gKiBAY29tcG9uZW50IFNoYXJlQnV0dG9uc0NvbXBvbmVudFxuICogQHNlbGVjdG9yIGFwcC1zaGFyZS1idXR0b25zLWNvbXBvbmVudFxuICogQHN0YW5kYWxvbmUgdHJ1ZVxuICogQGRlc2NyaXB0aW9uIERpc3BsYXlzIGEgc2V0IG9mIHNoYXJlIGJ1dHRvbnMgZm9yIHNoYXJpbmcgYSBtZWV0aW5nIGxpbmsgb24gc29jaWFsIG1lZGlhIGFuZCBlbWFpbC5cbiAqXG4gKiBAZXhhbXBsZVxuICogYGBgaHRtbFxuICogPGFwcC1zaGFyZS1idXR0b25zLWNvbXBvbmVudFxuICogICBbbWVldGluZ0lEXT1cIicxMjM0NSdcIlxuICogICBbZXZlbnRUeXBlXT1cIidicm9hZGNhc3QnXCJcbiAqICAgW3NoYXJlQnV0dG9uc109XCJjdXN0b21TaGFyZUJ1dHRvbnNcIlxuICogPjwvYXBwLXNoYXJlLWJ1dHRvbnMtY29tcG9uZW50PlxuICogYGBgXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogY29uc3QgY3VzdG9tU2hhcmVCdXR0b25zID0gW1xuICogICB7IGljb246IGZhRW52ZWxvcGUsIGFjdGlvbjogKCkgPT4gY29uc29sZS5sb2coJ0VtYWlsJyksIHNob3c6IHRydWUgfSxcbiAqICAgeyBpY29uOiBmYUZhY2Vib29rLCBhY3Rpb246ICgpID0+IGNvbnNvbGUubG9nKCdGYWNlYm9vaycpLCBzaG93OiB0cnVlIH0sXG4gKiBdO1xuICogYGBgXG4gKi9cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYXBwLXNoYXJlLWJ1dHRvbnMtY29tcG9uZW50JyxcbiAgdGVtcGxhdGVVcmw6ICcuL3NoYXJlLWJ1dHRvbnMtY29tcG9uZW50LmNvbXBvbmVudC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vc2hhcmUtYnV0dG9ucy1jb21wb25lbnQuY29tcG9uZW50LmNzcyddLFxuICBzdGFuZGFsb25lOiB0cnVlLFxuICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlLCBGb250QXdlc29tZU1vZHVsZV0sXG59KVxuZXhwb3J0IGNsYXNzIFNoYXJlQnV0dG9uc0NvbXBvbmVudCB7XG4gIEBJbnB1dCgpIG1lZXRpbmdJRCE6IHN0cmluZztcbiAgQElucHV0KCkgc2hhcmVCdXR0b25zOiBTaGFyZUJ1dHRvbltdID0gW107XG4gIEBJbnB1dCgpIGV2ZW50VHlwZSE6IEV2ZW50VHlwZTtcblxuICBkZWZhdWx0U2hhcmVCdXR0b25zOiBTaGFyZUJ1dHRvbltdID0gW1xuICAgIHtcbiAgICAgIGljb246IGZhQ29weSxcbiAgICAgIGFjdGlvbjogYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KFxuICAgICAgICAgICAgYGh0dHBzOi8vJHt0aGlzLnNoYXJlTmFtZX0ubWVkaWFzZnUuY29tLyR7dGhpcy5zaGFyZU5hbWV9LyR7dGhpcy5tZWV0aW5nSUR9YCxcbiAgICAgICAgICApO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0ZhaWxlZCB0byBjb3B5IHRvIGNsaXBib2FyZDonLCBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gICAge1xuICAgICAgaWNvbjogZmFFbnZlbG9wZSxcbiAgICAgIGFjdGlvbjogKCkgPT4ge1xuICAgICAgICBjb25zdCBlbWFpbFVybCA9IGBtYWlsdG86P3N1YmplY3Q9Sm9pbiBteSBtZWV0aW5nJmJvZHk9SGVyZSdzIHRoZSBsaW5rIHRvIHRoZSBtZWV0aW5nOiBodHRwczovLyR7dGhpcy5zaGFyZU5hbWV9Lm1lZGlhc2Z1LmNvbS8ke3RoaXMuc2hhcmVOYW1lfS8ke3RoaXMubWVldGluZ0lEfWA7XG4gICAgICAgIHdpbmRvdy5vcGVuKGVtYWlsVXJsLCAnX2JsYW5rJyk7XG4gICAgICB9LFxuICAgICAgc2hvdzogdHJ1ZSxcbiAgICB9LFxuICAgIHtcbiAgICAgIGljb246IGZhRmFjZWJvb2ssXG4gICAgICBhY3Rpb246ICgpID0+IHtcbiAgICAgICAgY29uc3QgZmFjZWJvb2tVcmwgPSBgaHR0cHM6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci9zaGFyZXIucGhwP3U9JHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgYGh0dHBzOi8vJHt0aGlzLnNoYXJlTmFtZX0ubWVkaWFzZnUuY29tLyR7dGhpcy5zaGFyZU5hbWV9LyR7dGhpcy5tZWV0aW5nSUR9YCxcbiAgICAgICAgKX1gO1xuICAgICAgICB3aW5kb3cub3BlbihmYWNlYm9va1VybCwgJ19ibGFuaycpO1xuICAgICAgfSxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiBmYVdoYXRzYXBwLFxuICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHdoYXRzYXBwVXJsID0gYGh0dHBzOi8vd2EubWUvP3RleHQ9JHtlbmNvZGVVUklDb21wb25lbnQoXG4gICAgICAgICAgYGh0dHBzOi8vJHt0aGlzLnNoYXJlTmFtZX0ubWVkaWFzZnUuY29tLyR7dGhpcy5zaGFyZU5hbWV9LyR7dGhpcy5tZWV0aW5nSUR9YCxcbiAgICAgICAgKX1gO1xuICAgICAgICB3aW5kb3cub3Blbih3aGF0c2FwcFVybCwgJ19ibGFuaycpO1xuICAgICAgfSxcbiAgICAgIHNob3c6IHRydWUsXG4gICAgfSxcbiAgICB7XG4gICAgICBpY29uOiBmYVRlbGVncmFtLFxuICAgICAgYWN0aW9uOiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHRlbGVncmFtVXJsID0gYGh0dHBzOi8vdC5tZS9zaGFyZS91cmw/dXJsPSR7ZW5jb2RlVVJJQ29tcG9uZW50KFxuICAgICAgICAgIGBodHRwczovLyR7dGhpcy5zaGFyZU5hbWV9Lm1lZGlhc2Z1LmNvbS8ke3RoaXMuc2hhcmVOYW1lfS8ke3RoaXMubWVldGluZ0lEfWAsXG4gICAgICAgICl9YDtcbiAgICAgICAgd2luZG93Lm9wZW4odGVsZWdyYW1VcmwsICdfYmxhbmsnKTtcbiAgICAgIH0sXG4gICAgICBzaG93OiB0cnVlLFxuICAgIH0sXG4gIF07XG5cbiAgZ2V0IHNoYXJlTmFtZSgpIHtcbiAgICByZXR1cm4gdGhpcy5ldmVudFR5cGUgPT09ICdjaGF0J1xuICAgICAgPyAnY2hhdCdcbiAgICAgIDogdGhpcy5ldmVudFR5cGUgPT09ICdicm9hZGNhc3QnXG4gICAgICA/ICdicm9hZGNhc3QnXG4gICAgICA6ICdtZWV0aW5nJztcbiAgfVxuXG4gIGdldCBmaWx0ZXJlZFNoYXJlQnV0dG9ucygpIHtcbiAgICByZXR1cm4gdGhpcy5zaGFyZUJ1dHRvbnMubGVuZ3RoID4gMFxuICAgICAgPyB0aGlzLnNoYXJlQnV0dG9ucy5maWx0ZXIoKGJ1dHRvbikgPT4gYnV0dG9uLnNob3cpXG4gICAgICA6IHRoaXMuZGVmYXVsdFNoYXJlQnV0dG9ucy5maWx0ZXIoKGJ1dHRvbikgPT4gYnV0dG9uLnNob3cpO1xuICB9XG59XG4iLCI8ZGl2IGNsYXNzPVwic2hhcmUtYnV0dG9ucy1jb250YWluZXJcIj5cclxuICA8ZGl2XHJcbiAgICAqbmdGb3I9XCJsZXQgYnV0dG9uIG9mIGZpbHRlcmVkU2hhcmVCdXR0b25zOyBsZXQgaSA9IGluZGV4XCJcclxuICAgIChjbGljayk9XCJidXR0b24uYWN0aW9uKClcIlxyXG4gICAgW25nU3R5bGVdPVwie1xyXG4gICAgICAnYmFja2dyb3VuZC1jb2xvcic6IGJ1dHRvbi5jb2xvciB8fCAnYmxhY2snLFxyXG4gICAgICAnbWFyZ2luLXJpZ2h0JzogaSAhPT0gZmlsdGVyZWRTaGFyZUJ1dHRvbnMubGVuZ3RoIC0gMSA/ICcxMHB4JyA6ICcwJ1xyXG4gICAgfVwiXHJcbiAgICBjbGFzcz1cInNoYXJlLWJ1dHRvblwiXHJcbiAgPlxyXG4gICAgPGZhLWljb24gW2ljb25dPVwiYnV0dG9uLmljb25cIiBbbmdTdHlsZV09XCJ7IGNvbG9yOiBidXR0b24uaWNvbkNvbG9yIHx8ICcjZmZmZmZmJywgJ2ZvbnQtc2l6ZSc6ICcyNHB4JyB9XCI+PC9mYS1pY29uPlxyXG4gIDwvZGl2PlxyXG48L2Rpdj5cclxuIl19