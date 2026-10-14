import {
  ApplicationRef,
  ComponentRef,
  EnvironmentInjector,
  Injectable,
  Type,
  createComponent,
} from '@angular/core';
import type { ScreenAudioChoice } from 'mediasfu-shared';
import { ScreenAudioPromptComponent, ScreenAudioPromptOptions } from './screen-audio-prompt.component';

export interface PromptScreenAudioChoiceOptions extends ScreenAudioPromptOptions {
  /**
   * Replace the default dialog. It receives the options as inputs and must emit its answer (`audio`, `video` or
   * `null`) from an output named `choice`.
   */
  promptComponent?: Type<unknown>;
}

/**
 * Shows the "Share audio too?" choice and resolves with the answer: `audio`, `video` (screen only) or `null`
 * (cancelled). The room components call it from the click that starts the screen share, so the dialog's own click
 * can start `getDisplayMedia`.
 *
 * @example
 * ```typescript
 * const choice = await this.screenAudioPrompt.ask({ isDarkMode: true });
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class ScreenAudioPromptService {
  constructor(
    private appRef: ApplicationRef,
    private environmentInjector: EnvironmentInjector,
  ) {}

  ask = (options: PromptScreenAudioChoiceOptions = {}): Promise<ScreenAudioChoice> =>
    new Promise((resolve) => {
      if (typeof document === 'undefined') {
        resolve('video');
        return;
      }
      const { promptComponent, ...inputs } = options;
      const host = document.createElement('div');
      host.setAttribute('data-screen-audio-prompt-root', 'true');
      document.body.appendChild(host);

      const ref: ComponentRef<any> = createComponent(promptComponent ?? ScreenAudioPromptComponent, {
        environmentInjector: this.environmentInjector,
        hostElement: host,
      });
      for (const [key, value] of Object.entries(inputs)) {
        if (value === undefined) continue;
        try {
          ref.setInput(key, value);
        } catch {
          /* a custom prompt without this input */
        }
      }

      let settled = false;
      const finish = (choice: ScreenAudioChoice) => {
        if (settled) return;
        settled = true;
        subscription?.unsubscribe?.();
        resolve(choice ?? null);
        setTimeout(() => {
          this.appRef.detachView(ref.hostView);
          ref.destroy();
          host.remove();
        }, 0);
      };
      const subscription = ref.instance?.choice?.subscribe?.(finish);
      if (!subscription) {
        // A prompt that cannot answer would block the share: fall back to the screen without audio.
        finish('video');
        return;
      }

      this.appRef.attachView(ref.hostView);
      ref.changeDetectorRef.detectChanges();
    });
}
