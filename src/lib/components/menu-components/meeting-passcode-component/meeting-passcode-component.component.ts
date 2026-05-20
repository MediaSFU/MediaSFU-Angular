import { Component, Input, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopy, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export interface MeetingPasscodeRenderContext {
  meetingPasscode: string;
}

export interface MeetingPasscodeComponentOptions {
  meetingPasscode: string;
  labelText?: string;
  containerAttributes?: { [key: string]: any };
  labelAttributes?: { [key: string]: any };
  inputAttributes?: { [key: string]: any };
  renderContainer?: TemplateRef<MeetingPasscodeRenderContext>;
  renderLabel?: TemplateRef<MeetingPasscodeRenderContext>;
  renderInput?: TemplateRef<MeetingPasscodeRenderContext>;
  renderContent?: TemplateRef<MeetingPasscodeRenderContext>;
}

export type MeetingPasscodeComponentType = (
  options: MeetingPasscodeComponentOptions,
) => HTMLElement;

/**
 * Component for displaying and managing a meeting passcode.
 *
 * @selector app-meeting-passcode-component
 * @standalone true
 * @templateUrl ./meeting-passcode-component.component.html
 * @styleUrls ./meeting-passcode-component.component.css
 *
 * @example
 * ```html
 * <app-meeting-passcode-component [meetingPasscode]="'ABC123'"></app-meeting-passcode-component>
 * ```
 */

@Component({
  selector: 'app-meeting-passcode-component',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './meeting-passcode-component.component.html',
  styleUrls: ['./meeting-passcode-component.component.css'],
})
export class MeetingPasscodeComponent {
  @Input() meetingPasscode = '';
  @Input() isDarkMode?: boolean;
  @Input() labelText?: string;
  @Input() containerAttributes?: { [key: string]: any };
  @Input() labelAttributes?: { [key: string]: any };
  @Input() inputAttributes?: { [key: string]: any };
  @Input() renderContainer?: TemplateRef<MeetingPasscodeRenderContext>;
  @Input() renderLabel?: TemplateRef<MeetingPasscodeRenderContext>;
  @Input() renderInput?: TemplateRef<MeetingPasscodeRenderContext>;
  @Input() renderContent?: TemplateRef<MeetingPasscodeRenderContext>;

  readonly copyIcon = faCopy;
  readonly revealIcon = faEye;
  readonly hideIcon = faEyeSlash;
  isCopied = false;
  isRevealed = false;

  get renderContext(): MeetingPasscodeRenderContext {
    return {
      meetingPasscode: this.meetingPasscode,
    };
  }

  get resolvedIsDarkMode(): boolean {
    if (typeof this.isDarkMode === 'boolean') {
      return this.isDarkMode;
    }

    return typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(prefers-color-scheme: dark)').matches
      : false;
  }

  async handleCopy(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.meetingPasscode);
      this.isCopied = true;
      setTimeout(() => {
        this.isCopied = false;
      }, 2000);
    } catch {
      // Handle error silently
    }
  }

  toggleVisibility(): void {
    this.isRevealed = !this.isRevealed;
  }

  getLabelText(): string {
    return this.labelText || 'Event Passcode (Host):';
  }

  getInputValue(): string {
    return this.inputAttributes?.['value'] !== undefined
      ? this.inputAttributes['value']
      : this.isRevealed
      ? this.meetingPasscode
      : '•'.repeat(Math.max(this.meetingPasscode.length, 6));
  }

  getInputReadOnly(): boolean {
    return this.inputAttributes?.['readonly'] !== undefined
      ? this.inputAttributes['readonly']
      : true;
  }
}
