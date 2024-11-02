import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
export interface LoadingModalOptions {
  isVisible: boolean;
  backgroundColor?: string;
  displayColor?: string;
}

export type LoadingModalType = (options: LoadingModalOptions) => HTMLElement;

/**
 * LoadingModal displays a loading spinner and a customizable "Loading..." text as an overlay.
 *
 * @selector app-loading-modal
 * @standalone true
 * @imports CommonModule
 *
 * @inputs
 * - `isVisible` (boolean): Controls the visibility of the modal overlay. Default is `false`.
 * - `backgroundColor` (string): Background color of the modal overlay. Default is `'rgba(0, 0, 0, 0.5)'`.
 * - `displayColor` (string): Color of the loading text. Default is `'white'`.
 *
 * @properties
 * - `modalContainerStyle` (object): Computed styles for the modal container.
 * - `modalContentStyle` (object): Computed styles for the modal content.
 * - `spinnerContainerStyle` (object): Computed styles for the spinner container.
 * - `loadingTextStyle` (object): Computed styles for the loading text.
 *
 * @example
 * ```html
 * <app-loading-modal
 *   [isVisible]="true"
 *   [backgroundColor]="'rgba(0, 0, 0, 0.5)'"
 *   [displayColor]="'white'">
 * </app-loading-modal>
 * ```
 *
 * @styles
 * - `.spinner`: Styles for the loading spinner.
 * - `@keyframes spin`: Keyframes for the spinner rotation animation.
 * - `.modal-content`: Styles for the modal content container.
 * - `.loading-text`: Styles for the loading text.
 **/

@Component({
  selector: 'app-loading-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="isVisible" [ngStyle]="modalContainerStyle">
      <div [ngStyle]="modalContentStyle" class="modal-content">
        <div class="spinner" [ngStyle]="spinnerContainerStyle"></div>
        <div [ngStyle]="loadingTextStyle" class="loading-text">Loading...</div>
      </div>
    </div>
  `,
  styles: [
    `
      .spinner {
        border: 12px solid #f3f3f3; /* Light grey */
        border-top: 12px solid black; /* Black */
        border-radius: 50%;
        width: 50px;
        height: 50px;
        animation: spin 2s linear infinite;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .modal-content {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .loading-text {
        margin-top: 10px;
      }
    `,
  ],
})
export class LoadingModal {
  @Input() isVisible = false;
  @Input() backgroundColor?: string = 'rgba(0, 0, 0, 0.5)';
  @Input() displayColor?: string = 'white';

  get modalContainerStyle() {
    return {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundColor: this.backgroundColor,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '999',
    };
  }

  get modalContentStyle() {
    return {
      backgroundColor: this.backgroundColor,
      borderRadius: '10px',
      padding: '10px',
      maxWidth: '200px',
      textAlign: 'center',
    };
  }

  get spinnerContainerStyle() {
    return {
      marginBottom: '20px',
    };
  }

  get loadingTextStyle() {
    return {
      color: this.displayColor,
    };
  }
}
