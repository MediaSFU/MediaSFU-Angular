import { Component, Input } from '@angular/core';

export interface MeetingPasscodeComponentOptions {
  meetingPasscode: string;
}

export type MeetingPasscodeComponentType = (
  options: MeetingPasscodeComponentOptions,
) => HTMLElement;

/**
 * Component for displaying and managing a meeting passcode.
 *
 * @selector app-meeting-passcode-component
 * @standalone true
 * @templateUrl ./meeting-passcode-component.component.html
 * @styleUrls ./meeting-passcode-component.component.css
 */
@Component({
  selector: 'app-meeting-passcode-component',
  standalone: true,
  templateUrl: './meeting-passcode-component.component.html',
  styleUrls: ['./meeting-passcode-component.component.css'],
})
export class MeetingPasscodeComponent {
  @Input() meetingPasscode = '';
}