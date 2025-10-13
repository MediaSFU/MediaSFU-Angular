import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCopy } from '@fortawesome/free-solid-svg-icons';

export interface MeetingIdRenderContext {
  isCopied: boolean;
  meetingID: string;
}

export interface MeetingIdComponentOptions {
  meetingID?: string;
  labelText?: string;
  containerAttributes?: { [key: string]: any };
  labelAttributes?: { [key: string]: any };
  inputContainerAttributes?: { [key: string]: any };
  inputAttributes?: { [key: string]: any };
  buttonAttributes?: { [key: string]: any };
  iconAttributes?: { [key: string]: any };
  copyIconColors?: {
    default?: string;
    copied?: string;
  };
  customIcon?: IconDefinition;
  renderContainer?: TemplateRef<MeetingIdRenderContext>;
  renderLabel?: TemplateRef<MeetingIdRenderContext>;
  renderInput?: TemplateRef<MeetingIdRenderContext>;
  renderCopyButton?: TemplateRef<MeetingIdRenderContext>;
  renderIcon?: TemplateRef<MeetingIdRenderContext>;
  renderInputGroup?: TemplateRef<MeetingIdRenderContext>;
  renderContent?: TemplateRef<MeetingIdRenderContext>;
}

export type MeetingIdComponentType = (options: MeetingIdComponentOptions) => HTMLElement;

/**
 * Component representing a meeting ID.
 *
 * @selector app-meeting-id-component
 * @standalone true
 * @templateUrl ./meeting-id-component.component.html
 * @styleUrls ./meeting-id-component.component.css
 *
 * @example
 * ```html
 * <app-meeting-id-component [meetingID]="'123-456-789'"></app-meeting-id-component>
 * ```
 */

@Component({
  selector: 'app-meeting-id-component',
  templateUrl: './meeting-id-component.component.html',
  styleUrls: ['./meeting-id-component.component.css'],
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
})
export class MeetingIdComponent {
  @Input() meetingID = '';
  @Input() labelText?: string;
  @Input() containerAttributes?: { [key: string]: any };
  @Input() labelAttributes?: { [key: string]: any };
  @Input() inputContainerAttributes?: { [key: string]: any };
  @Input() inputAttributes?: { [key: string]: any };
  @Input() buttonAttributes?: { [key: string]: any };
  @Input() iconAttributes?: { [key: string]: any };
  @Input() copyIconColors?: { default?: string; copied?: string };
  @Input() customIcon?: IconDefinition;
  @Input() renderContainer?: TemplateRef<MeetingIdRenderContext>;
  @Input() renderLabel?: TemplateRef<MeetingIdRenderContext>;
  @Input() renderInput?: TemplateRef<MeetingIdRenderContext>;
  @Input() renderCopyButton?: TemplateRef<MeetingIdRenderContext>;
  @Input() renderIcon?: TemplateRef<MeetingIdRenderContext>;
  @Input() renderInputGroup?: TemplateRef<MeetingIdRenderContext>;
  @Input() renderContent?: TemplateRef<MeetingIdRenderContext>;

  isCopied = false;
  readonly copyIcon = faCopy;

  get renderContext(): MeetingIdRenderContext {
    return {
      isCopied: this.isCopied,
      meetingID: this.meetingID,
    };
  }

  async handleCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.meetingID);
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    } catch {
      // Handle error silently
    }
  }

  getIconColor(): string {
    if (this.isCopied) {
      return this.copyIconColors?.copied || '#4CAF50';
    }
    return this.copyIconColors?.default || '#0F0F10FF';
  }

  getLabelText(): string {
    return this.labelText || 'Event ID:';
  }

  getInputValue(): string {
    return this.inputAttributes?.['value'] !== undefined
      ? this.inputAttributes['value']
      : this.meetingID;
  }

  getInputReadOnly(): boolean {
    return this.inputAttributes?.['readonly'] !== undefined
      ? this.inputAttributes['readonly']
      : true;
  }

  getIconStyle(): any {
    const baseStyle = { color: this.getIconColor() };
    if (this.iconAttributes?.['style']) {
      return { ...baseStyle, ...this.iconAttributes['style'] };
    }
    return baseStyle;
  }
}
