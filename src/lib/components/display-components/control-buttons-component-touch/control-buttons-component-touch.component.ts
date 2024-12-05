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
      [ngStyle]="
        mergeStyles(getAlignmentStyle(), buttonsContainerStyle, {
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          'margin-top': '5px',
          'margin-bottom': '5px',
          elevation: '9',
          'z-index': '9',
          'background-color': 'transparent',
          display: showAspect ? 'flex' : 'none'
        })
      "
    >
      <button
        *ngFor="let button of buttons"
        [ngStyle]="
          mergeStyles(
            {
              'align-items': 'center',
              padding: '10px',
              'border-radius': '5px',
              'margin-right': '5px',
              'margin-left': '5px',
              'margin-bottom': '5px',
              'margin-top': '5px',
              cursor: 'pointer',
              'background-color': button.show
                ? button.backgroundColor?.default || 'rgba(255, 255, 255, 0.25)'
                : 'transparent',
              border: 'none',
              display: button.show
                ? 'flex'
                : button.inActiveColor === 'transparent' && button.activeColor === 'transparent'
                ? 'flex'
                : 'none'
            },
            direction === 'vertical' ? { 'flex-direction': 'column' } : {}
          )
        "
        (click)="button.onPress ? button.onPress() : null"
        [disabled]="button.disabled"
      >
        <ng-container *ngIf="button.icon">
          <fa-icon
            *ngIf="button.active"
            [icon]="button.alternateIcon || button.icon"
            [style.color]="button.activeColor || 'transparent'"
          ></fa-icon>
          <fa-icon
            *ngIf="!button.active"
            [icon]="button.icon"
            [style.color]="button.inActiveColor || 'transparent'"
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
          [ngStyle]="{
            color: button.color || 'transparent',
            'font-size': '12px',
            'margin-top': '5px'
          }"
        >
          {{ button.name }}
        </span>
      </button>
    </div>
  `,
    styles: [
        `
      :host {
        display: flex;
        justify-content: center;
        align-items: center;
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
