import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface MenuItemRenderContext {
  iconNode?: any;
  textNode?: any;
}

export interface MenuItemComponentOptions {
  icon?: IconDefinition;
  name: string;
  onPress: () => void;
  buttonAttributes?: { [key: string]: any };
  iconAttributes?: { [key: string]: any };
  textAttributes?: { [key: string]: any };
  customIcon?: IconDefinition;
  renderButton?: TemplateRef<MenuItemRenderContext>;
  renderIcon?: TemplateRef<any>;
  renderText?: TemplateRef<any>;
  renderContent?: TemplateRef<MenuItemRenderContext>;
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
    templateUrl: './menu-item-component.component.html',
    styleUrls: ['./menu-item-component.component.css'],
    imports: [CommonModule, FontAwesomeModule]
})
export class MenuItemComponent {
  @Input() icon?: IconDefinition;
  @Input() name!: string;
  @Input() onPress: (() => void) | undefined;
  @Input() buttonAttributes?: { [key: string]: any };
  @Input() iconAttributes?: { [key: string]: any };
  @Input() textAttributes?: { [key: string]: any };
  @Input() customIcon?: IconDefinition;
  @Input() renderButton?: TemplateRef<MenuItemRenderContext>;
  @Input() renderIcon?: TemplateRef<any>;
  @Input() renderText?: TemplateRef<any>;
  @Input() renderContent?: TemplateRef<MenuItemRenderContext>;

  get renderContext(): MenuItemRenderContext {
    return {
      iconNode: null,
      textNode: null,
    };
  }

  getResolvedIcon(): IconDefinition | undefined {
    return this.customIcon || this.icon;
  }

  handlePress(event?: Event): void {
    if (event && this.buttonAttributes?.['onClick']) {
      this.buttonAttributes['onClick'](event);
      if (event.defaultPrevented) {
        return;
      }
    }
    if (this.onPress) {
      this.onPress();
    }
  }
}
