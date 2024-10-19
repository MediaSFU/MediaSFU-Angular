import { Component, Injector, Input, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface CustomComponent {
  component: Type<any>;
  injector: Injector;
}
export interface Button {
  name?: string;
  icon?: IconDefinition;
  alternateIcon?: IconDefinition;
  onPress?: () => void;
  active?: boolean | (() => boolean);
  activeColor?: string | (() => string);
  inActiveColor?: string | (() => string);
  color?: string;
  backgroundColor?: {
    default?: string;
  };
  customComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
  iconComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
  alternateIconComponent?: HTMLElement | CustomComponent | (() => HTMLElement | CustomComponent);
  disabled?: boolean | (() => boolean);
  show?: boolean | (() => boolean);
}

export interface ControlButtonsComponentOptions {
  buttons: Button[];
  buttonColor?: string;
  buttonBackgroundColor?: {
    default?: string;
    pressed?: string;
  };
  alignment?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  vertical?: boolean;
  buttonsContainerStyle?: Partial<CSSStyleDeclaration>;
  alternateIconComponent?: HTMLElement | CustomComponent;
}

export type ControlButtonsComponentType = (options: ControlButtonsComponentOptions) => HTMLElement;

@Component({
  selector: 'app-control-buttons-component',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  template: `
    <div class="container" [ngStyle]="mergeStyles(getAlignmentStyle(), buttonsContainerStyle)">
      <button
        *ngFor="let button of buttons; let i = index"
        class="buttonContainer"
        [ngClass]="{ verticalButton: vertical }"
        [ngStyle]="{
          'background-color': button.show
            ? buttonBackgroundColor?.default || 'transparent'
            : 'transparent',
          display: button.show ? 'flex' : 'none'
        }"
        [disabled]="button.disabled"
        (click)="button.onPress ? button.onPress() : null"
      >
        <!-- Custom component when defined -->
        <ng-container *ngIf="button.customComponent; else iconTemplate">
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

        <!-- Icon logic for active/inactive states -->
        <ng-template #iconTemplate>
          <ng-container *ngIf="button.active && button.alternateIconComponent; else defaultIcon">
            <!-- Alternate icon component when button is active -->
            <ng-container *ngIf="isCustomComponent(button.alternateIconComponent)">
              <ng-container
                *ngComponentOutlet="
                  button.alternateIconComponent.component;
                  injector: button.alternateIconComponent.injector
                "
              ></ng-container>
            </ng-container>
            <ng-container
              *ngIf="
                !isCustomComponent(button.alternateIconComponent) &&
                !isFunctionComponent(button.alternateIconComponent)
              "
            >
              <!-- Handle the HTMLElement case, e.g., render it using [innerHTML] -->
              <div [innerHTML]="button.alternateIconComponent.outerHTML"></div>
            </ng-container>
          </ng-container>

          <!-- Default icon fallback for active/inactive states -->
          <ng-template #defaultIcon>
            <fa-icon
              *ngIf="button.active"
              [icon]="button.alternateIcon! || button.icon"
              [style.color]="button.activeColor || 'transparent'"
            ></fa-icon>
            <fa-icon
              *ngIf="!button.active"
              [icon]="button.icon!"
              [style.color]="button.inActiveColor || '#ffffff'"
            ></fa-icon>
          </ng-template>
        </ng-template>

        <!-- Button text -->
        <span
          *ngIf="button.name"
          class="buttonText"
          [ngStyle]="{ color: button.color || '#ffffff' }"
        >
          {{ button.name }}
        </span>
      </button>
    </div>
  `,
  styleUrls: ['./control-buttons-component.component.css'],
})
export class ControlButtonsComponent {
  @Input() buttons: Button[] = [];
  @Input() buttonColor = '';
  @Input() buttonBackgroundColor: any = {};
  @Input() alignment = 'flex-start';
  @Input() vertical = false;
  @Input() buttonsContainerStyle: any = {};

  // Function to get the alignment styles dynamically
  getAlignmentStyle() {
    const alignmentMap: any = {
      center: { 'justify-content': 'center' },
      'flex-end': { 'justify-content': 'flex-end' },
      'space-between': { 'justify-content': 'space-between' },
      'space-around': { 'justify-content': 'space-around' },
      'space-evenly': { 'justify-content': 'space-evenly' },
      'flex-start': { 'justify-content': 'flex-start' },
    };
    return {
      display: 'flex',
      flexDirection: this.vertical ? 'column' : 'row',
      ...alignmentMap[this.alignment],
    };
  }

  // Utility function to merge multiple styles into one object
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
