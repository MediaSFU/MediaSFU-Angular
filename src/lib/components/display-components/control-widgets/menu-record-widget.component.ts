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
