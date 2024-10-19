import { Injectable } from '@angular/core';
export interface FormatNumberOptions {
  number: number;
}

// Export the type definition for the function
export type FormatNumberType = (options: FormatNumberOptions) => Promise<string | undefined>;

@Injectable({
  providedIn: 'root',
})
export class FormatNumber {
  /**
   * Formats a number into a string representation with appropriate suffixes (K, M, B).
   *
   * @param number - The number to format.
   * @returns A promise that resolves to a formatted string or undefined if the input is falsy.
   *
   * @example
   * ```typescript
   * formatNumber(500); // "500"
   * formatNumber(1500); // "1.5K"
   * formatNumber(1500000); // "1.5M"
   * formatNumber(1500000000); // "1.5B"
   * ```
   */

  async formatNumber({ number }: FormatNumberOptions): Promise<string | undefined> {
    if (number) {
      if (number < 1e3) {
        return number.toString();
      } else if (number < 1e6) {
        return (number / 1e3).toFixed(1) + 'K';
      } else if (number < 1e9) {
        return (number / 1e6).toFixed(1) + 'M';
      } else if (number < 1e12) {
        return (number / 1e9).toFixed(1) + 'B';
      }
    }
    // Return undefined for falsy input values
    return undefined;
  }
}
