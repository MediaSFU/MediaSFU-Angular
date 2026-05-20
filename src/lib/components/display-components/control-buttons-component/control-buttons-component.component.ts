import { Component, Injector, Input, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface CustomComponent {
  component: Type<any>;
  injector: Injector;
}
export interface Button {
  name?: string | (() => string);
  tooltip?: string;
  customName?: string;
  icon?: IconDefinition;
  alternateIcon?: IconDefinition;
  onPress?: () => void;
  active?: boolean | (() => boolean);
  activeColor?: string | (() => string);
  inActiveColor?: string | (() => string);
  color?: string;
  backgroundColor?: {
    default?: string;
    pressed?: string;
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

interface HoveredTooltipState {
  id: string;
  label: string;
  left: number;
  top: number;
}

@Component({
    selector: 'app-control-buttons-component',
    imports: [CommonModule, FontAwesomeModule],
    template: `
    <div
      class="container"
      [class.container--dark]="resolvedIsDarkMode"
      [class.container--light]="!resolvedIsDarkMode"
      [ngStyle]="getContainerStyle()"
    >
      <ng-container *ngFor="let button of buttons; let i = index">
      <button
        *ngIf="isButtonVisible(button)"
        type="button"
        class="buttonContainer"
        [ngClass]="{ verticalButton: vertical, activeButton: isButtonActive(button) }"
        [ngStyle]="getButtonStyle(button)"
        [disabled]="isButtonDisabled(button)"
        (click)="button.onPress ? button.onPress() : null"
        (mouseenter)="showTooltip(button, i, $event)"
        (focus)="showTooltip(button, i, $event)"
        (mouseleave)="hideTooltip()"
        (blur)="hideTooltip()"
        [attr.aria-label]="getButtonLabel(button)"
        [attr.aria-pressed]="isButtonActive(button)"
        [attr.aria-describedby]="hoveredTooltip && hoveredTooltip.id === getTooltipId(i) ? hoveredTooltip.id : null"
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
              *ngIf="isButtonActive(button)"
              [icon]="button.alternateIcon! || button.icon"
              [style.color]="resolveColor(button.activeColor, '#ffffff')"
            ></fa-icon>
            <fa-icon
              *ngIf="!isButtonActive(button)"
              [icon]="button.icon!"
              [style.color]="resolveColor(button.inActiveColor, 'rgba(255, 255, 255, 0.82)')"
            ></fa-icon>
          </ng-template>
        </ng-template>

        <!-- Button text -->
        <span
          *ngIf="vertical && getButtonName(button) as resolvedName"
          class="buttonText"
          [ngStyle]="{ color: getButtonTextColor(button) }"
        >
          {{ resolvedName }}
        </span>
      </button>
      </ng-container>
    </div>

    <div
      *ngIf="hoveredTooltip"
      [id]="hoveredTooltip.id"
      role="tooltip"
      class="buttonTooltip"
      [class.buttonTooltip--dark]="resolvedIsDarkMode"
      [class.buttonTooltip--light]="!resolvedIsDarkMode"
      [ngStyle]="{
        left: hoveredTooltip.left + 'px',
        top: hoveredTooltip.top + 'px'
      }"
    >
      {{ hoveredTooltip.label }}
    </div>
  `,
    styleUrls: ['./control-buttons-component.component.css']
})
export class ControlButtonsComponent {
  @Input() buttons: Button[] = [];
  @Input() buttonColor = '';
  @Input() buttonBackgroundColor: any = {};
  @Input() isDarkMode?: boolean;
  @Input() alignment = 'flex-start';
  @Input() vertical = false;
  @Input() buttonsContainerStyle: any = {};

  hoveredTooltip: HoveredTooltipState | null = null;

  get resolvedIsDarkMode(): boolean {
    if (typeof this.isDarkMode === 'boolean') {
      return this.isDarkMode;
    }

    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : true;
  }

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

  getContainerStyle() {
    const customStyles = { ...(this.buttonsContainerStyle ?? {}) };

    if (this.isTransparentColor(customStyles['backgroundColor'])) {
      delete customStyles['backgroundColor'];
    }

    return this.mergeStyles(this.getAlignmentStyle(), customStyles);
  }

  getButtonStyle(button: Button) {
    const isActive = this.isButtonActive(button);
    const isVisible = this.isButtonVisible(button);
    const defaultBackground =
      button.backgroundColor?.default || this.buttonBackgroundColor?.default || 'transparent';
    const pressedBackground =
      button.backgroundColor?.pressed ||
      this.buttonBackgroundColor?.pressed ||
      defaultBackground;

    return {
      color: this.getButtonTextColor(button),
      backgroundColor: !isVisible ? 'transparent' : isActive ? pressedBackground : defaultBackground,
      borderColor: 'transparent',
      boxShadow: 'none',
    };
  }

  isButtonVisible(button: Button): boolean {
    return this.resolveBoolean(button.show, true);
  }

  isButtonActive(button: Button): boolean {
    return this.resolveBoolean(button.active, false);
  }

  isButtonDisabled(button: Button): boolean {
    return this.resolveBoolean(button.disabled, false);
  }

  getButtonName(button: Button): string | null {
    const rawName = typeof button.name === 'function' ? button.name() : button.name;
    const normalizedName = typeof rawName === 'string' ? rawName.trim() : '';
    return normalizedName.length > 0 ? normalizedName : null;
  }

  getButtonLabel(button: Button): string {
    return button.tooltip || this.getButtonName(button) || button.customName || 'Control button';
  }

  getButtonTextColor(button: Button): string {
    return button.color || this.buttonColor || '#ffffff';
  }

  showTooltip(button: Button, index: number, event: MouseEvent | FocusEvent): void {
    const label = getResolvedTooltipLabel(this.getButtonLabel(button));
    const target = event.currentTarget as HTMLElement | null;

    if (!label || !target || this.isButtonDisabled(button)) {
      this.hoveredTooltip = null;
      return;
    }

    const rect = target.getBoundingClientRect();
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : rect.right + 24;
    const estimatedHalfWidth = Math.min(Math.max(label.length * 4.5 + 18, 44), 122);
    const centeredLeft = rect.left + rect.width / 2;
    const clampedLeft = Math.min(
      viewportWidth - estimatedHalfWidth - 12,
      Math.max(estimatedHalfWidth + 12, centeredLeft),
    );

    this.hoveredTooltip = {
      id: this.getTooltipId(index),
      label,
      left: clampedLeft,
      top: Math.max(12, rect.top - 14),
    };
  }

  hideTooltip(): void {
    this.hoveredTooltip = null;
  }

  getTooltipId(index: number): string {
    return `control-button-tooltip-${index}`;
  }

  resolveColor(value: string | (() => string) | undefined, fallback: string): string {
    return typeof value === 'function' ? value() : value || fallback;
  }

  private isTransparentColor(value: string | undefined): boolean {
    if (!value) {
      return true;
    }

    const normalized = value.replace(/\s+/g, '').toLowerCase();
    return normalized === 'transparent'
      || normalized === 'rgba(0,0,0,0)'
      || normalized === 'rgba(255,255,255,0)'
      || normalized === 'hsla(0,0%,0%,0)';
  }

  private resolveBoolean(value: boolean | (() => boolean) | undefined, fallback: boolean): boolean {
    return typeof value === 'function' ? value() : value ?? fallback;
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

function getResolvedTooltipLabel(label: string | null): string | null {
  if (!label) {
    return null;
  }

  const trimmed = label.trim();
  return trimmed.length > 0 ? trimmed : null;
}
