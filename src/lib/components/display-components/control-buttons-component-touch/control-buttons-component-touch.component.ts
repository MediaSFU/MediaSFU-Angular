import { Component, Injector, Input, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
export interface CustomComponent {
  component: Type<any>;
  injector: Injector;
}

export interface ButtonTouch {
  name?: string;
  icon?: IconDefinition;
  alternateIcon?: any;
  onPress?: () => void;
  backgroundColor?: {
    default?: string;
  };
  active?: boolean | (() => boolean);
  alternateIconComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
  iconComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
  customComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
  color?: string;
  activeColor?: string | (() => string);
  inActiveColor?: string | (() => string);
  show?: boolean | (() => boolean);
  disabled?: boolean | (() => boolean);
}

export interface ControlButtonsComponentTouchOptions {
  buttons: ButtonTouch[];
  position?: 'left' | 'right' | 'middle';
  location?: 'top' | 'bottom' | 'center';
  direction?: 'horizontal' | 'vertical';
  buttonsContainerStyle?: Partial<CSSStyleDeclaration>;
  showAspect?: boolean;
}

export type ControlButtonsComponentTouchType = (
  options: ControlButtonsComponentTouchOptions,
) => HTMLElement;

/**
 * ControlButtonsComponentTouch provides customizable touch controls with various icons, colors, and alignment options.
 *
 * @selector app-control-buttons-component-touch
 * @standalone true
 * @imports CommonModule, FontAwesomeModule
 *
 * @inputs
 * - `buttons` (ButtonTouch[]): Array of button configurations with properties for icon, color, action, and visibility.
 * - `position` ('left' | 'right' | 'middle'): Horizontal alignment of the buttons container. Default is 'left'.
 * - `location` ('top' | 'bottom' | 'center'): Vertical alignment of the buttons container. Default is 'top'.
 * - `direction` ('horizontal' | 'vertical'): Layout direction of buttons. Default is 'horizontal'.
 * - `buttonsContainerStyle` (Partial<CSSStyleDeclaration>): Custom styles for the buttons container.
 * - `showAspect` (boolean): Controls the visibility of the buttons container. Default is false.
 *
 * @methods
 * - `getAlignmentStyle()`: Returns alignment styles based on `position`, `location`, and `direction` inputs.
 * - `mergeStyles(...styles: any[])`: Merges multiple style objects into one for flexible styling.
 * - `isCustomComponent(comp)`: Type guard for identifying custom component objects.
 * - `isFunctionComponent(comp)`: Type guard for identifying function components.
 *
 * @example
 * ```html
 * <app-control-buttons-component-touch
 *   [buttons]="[
 *     { name: 'Mute', icon: faMicrophoneSlash, onPress: muteAction, activeColor: 'red' },
 *     { name: 'Unmute', icon: faMicrophone, onPress: unmuteAction, activeColor: 'green' }
 *   ]"
 *   position="right"
 *   location="bottom"
 *   direction="vertical"
 *   [buttonsContainerStyle]="{ backgroundColor: '#333' }"
 *   [showAspect]="true"
 * ></app-control-buttons-component-touch>
 * ```
 **/

@Component({
    selector: 'app-control-buttons-component-touch',
    imports: [CommonModule, FontAwesomeModule],
    template: `
    <div
      class="control-buttons-touch"
      [ngClass]="{ 'control-buttons-touch--vertical': direction === 'vertical' }"
      [ngStyle]="mergeStyles(getContainerStyle(), buttonsContainerStyle)"
    >
      <ng-container *ngFor="let button of buttons">
      <button
        *ngIf="isButtonVisible(button)"
        class="control-buttons-touch__button"
        [class.control-buttons-touch__button--active]="isButtonActive(button)"
        [ngStyle]="getButtonStyle(button)"
        (click)="button.onPress ? button.onPress() : null"
        [disabled]="isButtonDisabled(button)"
        [attr.aria-label]="button.name || 'Control button'"
        [attr.aria-pressed]="isButtonActive(button)"
      >
        <ng-container *ngIf="button.icon">
          <fa-icon
            *ngIf="isButtonActive(button)"
            [icon]="button.alternateIcon || button.icon"
            [style.color]="resolveColor(button.activeColor, '#ffffff')"
          ></fa-icon>
          <fa-icon
            *ngIf="!isButtonActive(button)"
            [icon]="button.icon"
            [style.color]="resolveColor(button.inActiveColor, 'rgba(255, 255, 255, 0.82)')"
          ></fa-icon>
        </ng-container>
        <ng-container *ngIf="!button.icon">
          <ng-container *ngIf="button.customComponent">
            <ng-container *ngIf="isCustomComponent(button.customComponent)">
              <ng-container
                *ngComponentOutlet="
                  button.customComponent.component;
                  injector: button.customComponent.injector
                "
              ></ng-container>
            </ng-container>
            <ng-container
              *ngIf="
                !isCustomComponent(button.customComponent) &&
                !isFunctionComponent(button.customComponent)
              "
            >
              <!-- Handle the HTMLElement case, e.g., render it using [innerHTML] -->
              <div [innerHTML]="button.customComponent.outerHTML"></div>
            </ng-container>
          </ng-container>
        </ng-container>
        <span
          *ngIf="button.name"
          class="control-buttons-touch__label"
          [style.color]="button.color || '#ffffff'"
        >
          {{ button.name }}
        </span>
      </button>
      </ng-container>
    </div>
  `,
    styles: [
        `
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .control-buttons-touch {
        box-shadow: 0 14px 36px rgba(15, 23, 42, 0.24);
        backdrop-filter: blur(16px);
      }

      .control-buttons-touch__button {
        position: relative;
        font-size: 18px;
        transition: transform 160ms ease, background 160ms ease, box-shadow 160ms ease, opacity 160ms ease;
      }

      .control-buttons-touch__button:hover:not(:disabled) {
        transform: translateY(-1px) scale(1.05);
        background: rgba(255, 255, 255, 0.14) !important;
      }

      .control-buttons-touch__button:disabled {
        cursor: not-allowed !important;
        opacity: 0.45;
      }

      .control-buttons-touch__button--active {
        box-shadow: 0 8px 18px rgba(15, 23, 42, 0.24);
      }

      .control-buttons-touch__label {
        display: none;
      }
    `,
    ]
})
export class ControlButtonsComponentTouch {
  @Input() buttons: ButtonTouch[] = [];
  @Input() position = 'left';
  @Input() location = 'top';
  @Input() direction = 'horizontal';
  @Input() buttonsContainerStyle: any = {};
  @Input() showAspect = false;

  getContainerStyle() {
    const style: Record<string, string | number> = {
      position: 'absolute',
      width: 'fit-content',
      padding: '8px',
      margin: '10px',
      elevation: 9,
      'z-index': 9,
      'background-color': 'rgba(0, 0, 0, 0.25)',
      'border-radius': '12px',
      display: this.showAspect ? 'flex' : 'none',
      'flex-direction': this.direction === 'vertical' ? 'column' : 'row',
      'align-items': 'center',
      'justify-content': 'center',
      gap: '4px',
    };

    if (this.location === 'bottom') {
      style['bottom'] = '0';
      style['top'] = 'auto';
    } else if (this.location === 'center') {
      style['top'] = '50%';
      style['bottom'] = 'auto';
      style['transform'] = 'translateY(-50%)';
    } else {
      style['top'] = '0';
      style['bottom'] = 'auto';
    }

    if (this.position === 'right') {
      style['right'] = '0';
      style['left'] = 'auto';
    } else if (this.position === 'middle') {
      style['left'] = '50%';
      style['right'] = 'auto';
      style['transform'] = this.location === 'center' ? 'translate(-50%, -50%)' : 'translateX(-50%)';
    } else {
      style['left'] = '0';
      style['right'] = 'auto';
    }

    return style;
  }

  getButtonStyle(button: ButtonTouch) {
    const isActive = this.isButtonActive(button);

    return {
      width: '48px',
      height: '48px',
      padding: '0',
      margin: '0',
      display: 'flex',
      'align-items': 'center',
      'justify-content': 'center',
      border: 'none',
      'border-radius': '999px',
      cursor: 'pointer',
      'background-color': isActive
        ? button.backgroundColor?.default || 'rgba(255, 255, 255, 0.14)'
        : button.backgroundColor?.default || 'rgba(255, 255, 255, 0.08)',
    };
  }

  isButtonVisible(button: ButtonTouch): boolean {
    const visible = this.resolveBoolean(button.show, true);
    if (!visible) {
      return button.inActiveColor === 'transparent' && button.activeColor === 'transparent';
    }

    return true;
  }

  isButtonActive(button: ButtonTouch): boolean {
    return this.resolveBoolean(button.active, false);
  }

  isButtonDisabled(button: ButtonTouch): boolean {
    return this.resolveBoolean(button.disabled, false);
  }

  resolveColor(value: string | (() => string) | undefined, fallback: string): string {
    return typeof value === 'function' ? value() : value || fallback;
  }

  private resolveBoolean(value: boolean | (() => boolean) | undefined, fallback: boolean): boolean {
    return typeof value === 'function' ? value() : value ?? fallback;
  }

  getAlignmentStyle() {
    let alignmentStyle: any = {};

    if (this.position === 'left' || this.position === 'right' || this.position === 'middle') {
      alignmentStyle['justify-content'] =
        this.position === 'left' ? 'flex-start' : this.position === 'right' ? 'flex-end' : 'center';
    }

    if (this.location === 'top' || this.location === 'bottom' || this.location === 'center') {
      alignmentStyle['align-items'] =
        this.location === 'top' ? 'flex-start' : this.location === 'bottom' ? 'flex-end' : 'center';
    }

    if (this.direction === 'vertical') {
      alignmentStyle['flex-direction'] = 'column';
    } else {
      alignmentStyle['flex-direction'] = 'row';
    }

    return alignmentStyle;
  }

  mergeStyles(...styles: any[]) {
    return Object.assign({}, ...styles);
  }

  isCustomComponent(
    comp: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent),
  ): comp is CustomComponent {
    return (
      comp &&
      typeof comp === 'object' &&
      'component' in comp &&
      typeof comp.component === 'function' &&
      'injector' in comp
    );
  }

  isFunctionComponent(
    comp: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent),
  ): comp is () => HTMLElement | CustomComponent {
    return typeof comp === 'function';
  }
}
