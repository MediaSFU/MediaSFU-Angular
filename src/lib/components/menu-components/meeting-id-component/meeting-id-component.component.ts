import { Component, Input } from '@angular/core';

export interface MeetingIdComponentOptions {
  meetingID?: string;
}

export type MeetingIdComponentType = (options: MeetingIdComponentOptions) => HTMLElement;

/**
 * Component representing a meeting ID.
 *
 * @selector app-meeting-id-component
 * @templateUrl ./meeting-id-component.component.html
 * @styleUrls ./meeting-id-component.component.css
 * @standalone true
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
