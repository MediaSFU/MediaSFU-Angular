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
 * ControlButtonsComponentTouch is an Angular component that displays a set of control buttons.
 * The buttons can be customized with various styles, icons, and actions.
 *
 * @component
 * @selector app-control-buttons-component-touch
 * @standalone true
 * @imports [CommonModule, FontAwesomeModule]
 *
 * @template
 * The template includes a container div that holds the buttons. Each button can display an icon,
 * a custom component, or a name. The styles and visibility of the buttons are controlled by the
 * component's inputs.
 *
 * @styles
 * The host element is styled to be a flex container centered both horizontally and vertically.
 *
 * @class ControlButtonsComponentTouch
 *
 * @property {any[]} buttons - An array of button configurations. Each button can have properties like
 * `show`, `backgroundColor`, `onPress`, `icon`, `alternateIcon`, `active`, `activeColor`, `inActiveColor`,
 * `customComponent`, and `name`.
 *
 * @property {string} position - The horizontal alignment of the buttons container. Can be 'left', 'right', or 'middle'.
 * Default is 'left'.
 *
 * @property {string} location - The vertical alignment of the buttons container. Can be 'top', 'bottom', or 'center'.
 * Default is 'top'.
 *
 * @property {string} direction - The direction of the buttons layout. Can be 'horizontal' or 'vertical'.
 * Default is 'horizontal'.
 *
 * @property {any} buttonsContainerStyle - Additional styles for the buttons container.
 *
 * @property {boolean} showAspect - A flag to control the visibility of the buttons container.
 *
 * @method getAlignmentStyle
 * Returns the alignment styles based on the `position`, `location`, and `direction` inputs.
 *
 * @method mergeStyles
 * Merges multiple style objects into one.
 *
 * @example
 * <app-control-buttons-component-touch
 *   [buttons]="buttonsArray"
 *   position="right"
 *   location="bottom"
 *   direction="vertical"
 *   [buttonsContainerStyle]="customStyles"
 *   [showAspect]="true">
 * </app-control-buttons-component-touch>
 */
@Component({
  selector: 'app-control-buttons-component-touch',
  standalone: true,
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
  ],
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
