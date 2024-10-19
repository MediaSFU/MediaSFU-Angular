import { Component, Injector, Input, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

export interface CustomComponent {
  component: Type<any>;
  injector: Injector;
}

export interface AltButton {
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
  show?: boolean | (() => boolean);
}

export interface ControlButtonsAltComponentOptions {
  buttons: AltButton[];
  position?: 'left' | 'right' | 'middle';
  location?: 'top' | 'bottom' | 'center';
  direction?: 'horizontal' | 'vertical';
  buttonsContainerStyle?: Partial<CSSStyleDeclaration>;
  alternateIconComponent?: HTMLElement | CustomComponent;
  iconComponent?: HTMLElement | CustomComponent;
  showAspect?: boolean;
}

export type ControlButtonsAltComponentType = (
  options: ControlButtonsAltComponentOptions,
) => HTMLElement;

@Component({
  selector: 'app-control-buttons-alt-component',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './control-buttons-alt-component.component.html',
  styleUrls: ['./control-buttons-alt-component.component.css'],
})
export class ControlButtonsAltComponent {
  @Input() buttons: AltButton[] = [];
  @Input() position: 'left' | 'right' | 'middle' = 'left';
  @Input() location: 'top' | 'bottom' | 'center' = 'top';
  @Input() direction: 'horizontal' | 'vertical' = 'horizontal';
  @Input() buttonsContainerStyle: any = {};
  @Input() showAspect = false;

  getAlignmentStyle() {
    let alignmentStyle: any = {};

    if (this.position === 'left' || this.position === 'right' || this.position === 'middle') {
      alignmentStyle.justifyContent =
        this.position === 'left' ? 'flex-start' : this.position === 'right' ? 'flex-end' : 'center';
    }

    if (this.location === 'top' || this.location === 'bottom' || this.location === 'center') {
      alignmentStyle.alignItems =
        this.location === 'top' ? 'flex-start' : this.location === 'bottom' ? 'flex-end' : 'center';
    }

    alignmentStyle.flexDirection = this.direction === 'vertical' ? 'column' : 'row';

    return alignmentStyle;
  }

  getContainerStyle() {
    return {
      ...this.styles.container,
      ...this.getAlignmentStyle(),
      ...this.buttonsContainerStyle,
      display: this.showAspect ? 'flex' : 'none',
    };
  }

  getButtonStyle(button: AltButton) {
    return {
      ...this.styles.buttonContainer,
      backgroundColor: button.backgroundColor?.default || 'transparent',
      ...(this.direction === 'vertical' ? this.styles.verticalButton : {}),
    };
  }

  getTextStyle(button: AltButton) {
    return {
      ...this.styles.buttonText,
      color: button.color || '#ffffff',
    };
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

  styles = {
    container: {
      marginTop: '5px',
      marginBottom: '5px',
      zIndex: 9,
    },
    buttonContainer: {
      display: 'flex',
      alignItems: 'center',
      padding: '10px',
      borderRadius: '5px',
      marginLeft: '5px',
      marginRight: '5px',
      cursor: 'pointer',
    },
    verticalButton: {
      flexDirection: 'column',
    },
    buttonText: {
      fontSize: '12px',
      marginTop: '5px',
    },
  };
}
