import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

export interface ModernFieldOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-modern-field',
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ModernFieldComponent),
      multi: true,
    },
  ],
  template: `
    <label class="ms-modern-field">
      <span *ngIf="label" class="ms-modern-field__label">{{ label }}</span>

      <ng-container [ngSwitch]="controlType">
        <select
          *ngSwitchCase="'select'"
          class="ms-modern-field__control"
          [disabled]="isDisabled"
          [value]="internalValue"
          (change)="handleValueChange($event)"
          (blur)="handleBlur()"
        >
          <option *ngFor="let option of options; trackBy: trackOption" [value]="option.value">
            {{ option.label }}
          </option>
        </select>

        <textarea
          *ngSwitchCase="'textarea'"
          class="ms-modern-field__control ms-modern-field__control--textarea"
          [attr.placeholder]="placeholder || null"
          [disabled]="isDisabled"
          [value]="internalValue"
          [attr.rows]="rows"
          (input)="handleValueChange($event)"
          (blur)="handleBlur()"
        ></textarea>

        <input
          *ngSwitchDefault
          class="ms-modern-field__control"
          [attr.type]="type"
          [attr.placeholder]="placeholder || null"
          [attr.inputmode]="inputMode || null"
          [attr.autocomplete]="autocomplete || null"
          [disabled]="isDisabled"
          [value]="internalValue"
          (input)="handleValueChange($event)"
          (blur)="handleBlur()"
        />
      </ng-container>

      <span *ngIf="hint" class="ms-modern-field__hint">{{ hint }}</span>
    </label>
  `,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
      }

      .ms-modern-field {
        display: flex;
        flex-direction: column;
        gap: 6px;
        width: 100%;
      }

      .ms-modern-field__label {
        color: var(--ms-modern-text-secondary);
        font-family: var(--ms-modern-font-family);
        font-size: var(--ms-modern-font-label);
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .ms-modern-field__control {
        width: 100%;
        box-sizing: border-box;
        min-height: 50px;
        border: 1px solid var(--ms-modern-border-subtle);
        border-radius: var(--ms-modern-radius-md);
        background: var(--ms-modern-field-background);
        color: var(--ms-modern-text-primary);
        font-family: var(--ms-modern-font-family);
        font-size: var(--ms-modern-font-body);
        padding: 0 16px;
        transition:
          border-color var(--ms-modern-motion-base) var(--ms-modern-motion-easing),
          box-shadow var(--ms-modern-motion-base) var(--ms-modern-motion-easing),
          background var(--ms-modern-motion-base) var(--ms-modern-motion-easing);
      }

      .ms-modern-field__control--textarea {
        min-height: 120px;
        padding-top: 14px;
        padding-bottom: 14px;
        resize: vertical;
      }

      .ms-modern-field__control:focus {
        outline: none;
        border-color: var(--ms-modern-border-strong);
        box-shadow: var(--ms-modern-focus-ring);
      }

      .ms-modern-field__control::placeholder {
        color: var(--ms-modern-text-muted);
      }

      .ms-modern-field__hint {
        color: var(--ms-modern-text-muted);
        font-family: var(--ms-modern-font-family);
        font-size: var(--ms-modern-font-caption);
      }
    `,
  ],
})
export class ModernFieldComponent implements ControlValueAccessor {
  @Input() controlType: 'input' | 'select' | 'textarea' = 'input';
  @Input() type = 'text';
  @Input() label = '';
  @Input() hint = '';
  @Input() placeholder = '';
  @Input() inputMode = '';
  @Input() autocomplete = '';
  @Input() rows = 4;
  @Input() options: ReadonlyArray<ModernFieldOption> = [];
  @Output() blurred = new EventEmitter<void>();

  internalValue = '';
  isDisabled = false;

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string | null | undefined): void {
    this.internalValue = value ?? '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  handleValueChange(event: Event): void {
    const nextValue = (event.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement)
      .value;
    this.internalValue = nextValue;
    this.onChange(nextValue);
  }

  handleBlur(): void {
    this.onTouched();
    this.blurred.emit();
  }

  trackOption = (_index: number, option: ModernFieldOption): string => option.value;
}