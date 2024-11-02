import { Component, Input } from '@angular/core';

export interface MeetingIdComponentOptions {
  meetingID?: string;
}

export type MeetingIdComponentType = (options: MeetingIdComponentOptions) => HTMLElement;

/**
 * Component representing a meeting ID.
 *
 * @selector app-meeting-id-component
 * @standalone true
 * @templateUrl ./meeting-id-component.component.html
 * @styleUrls ./meeting-id-component.component.css
 *
 * @example
 * ```html
 * <app-meeting-id-component [meetingID]="'123-456-789'"></app-meeting-id-component>
 * ```
 */

@Component({
  selector: 'app-meeting-id-component',
  templateUrl: './meeting-id-component.component.html',
  styleUrls: ['./meeting-id-component.component.css'],
  standalone: true,
})
export class MeetingIdComponent {
  @Input() meetingID = '';
}
