import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlButtonsAltComponent } from '../control-buttons-alt-component/control-buttons-alt-component.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface RecordButton {
  icon?: IconDefinition;
  active?: boolean;
  onPress?: () => void;
  activeColor?: string;
  inActiveColor?: string;
  text?: string;
}

/**
 * MenuRecordWidget is a configurable widget that displays a set of record control buttons, with customizable icon, color, and actions.
 *
 * @selector app-menu-record-widget
 * @standalone true
 * @imports CommonModule, FontAwesomeModule, ControlButtonsAltComponent
 *
 * @inputs
 * - `buttons` (RecordButton[]): Array of record button configurations, each with properties for icon, active state, colors, and actions.
 * - `direction` ('horizontal' | 'vertical'): Layout direction for the buttons. Default is 'horizontal'.
 *
 * @example
 * ```html
 * <app-menu-record-widget
 *   [buttons]="[
 *     { icon: faCircle, text: 'Record', onPress: startRecording, activeColor: 'red' },
 *     { icon: faStop, text: 'Stop', onPress: stopRecording, inActiveColor: 'gray' }
 *   ]"
 *   direction="horizontal"
 * ></app-menu-record-widget>
 * ```
 **/


@Component({
  selector: 'app-menu-record-widget',
  standalone: true,
  template: `
    <app-control-buttons-alt-component
      [buttons]="buttons"
      [direction]="direction"
      [showAspect]="true"
    ></app-control-buttons-alt-component>
  `,
  imports: [CommonModule, FontAwesomeModule, ControlButtonsAltComponent],
})
export class MenuRecordWidget {
  buttons: RecordButton[] = [];
  direction: 'horizontal' | 'vertical' = 'horizontal';

  constructor(
    @Inject('buttons') buttons: RecordButton[],
    @Inject('direction') direction: 'horizontal' | 'vertical',
  ) {
    this.buttons = buttons;
    this.direction = direction;
  }
}
