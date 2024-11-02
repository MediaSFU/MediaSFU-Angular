import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface MenuItemComponentOptions {
  icon?: IconDefinition;
  name: string;
  onPress: () => void;
}

export type MenuItemComponentType = (options: MenuItemComponentOptions) => HTMLElement;

/**
 * Component representing an individual menu item with an icon, name, and an action handler.
 *
 * @selector app-menu-item-component
 * @standalone true
 * @templateUrl ./menu-item-component.component.html
 * @styleUrls ./menu-item-component.component.css
 *
 * @example
 * ```html
 * <app-menu-item-component
 *   [icon]="faCoffee"
 *   name="Coffee"
 *   [onPress]="handleCoffeePress">
 * </app-menu-item-component>
 * ```
 *
 * ```typescript
 * handleCoffeePress() {
 *   console.log('Coffee icon clicked');
 * }
 * ```
 */


@Component({
  selector: 'app-menu-item-component',
  standalone: true,
  templateUrl: './menu-item-component.component.html',
  styleUrls: ['./menu-item-component.component.css'],
  imports: [CommonModule, FontAwesomeModule],
})
export class MenuItemComponent {
  @Input() icon!: IconDefinition;
  @Input() name!: string;
  @Input() onPress: (() => void) | undefined;

  handlePress() {
    if (this.onPress) {
      this.onPress();
    }
  }
}
