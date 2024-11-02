import { Injectable } from '@angular/core';
export interface FormatNumberOptions {
  number: number;
}

// Export the type definition for the function
export type FormatNumberType = (options: FormatNumberOptions) => Promise<string | undefined>;

/**
 * The `FormatNumber` service provides functionality to format numeric values
 * into a more readable string representation, appending appropriate suffixes
 * like K (thousands), M (millions), and B (billions).
 *
 * @service
 * @example
 * ```typescript
 * import { FormatNumber } from 'mediasfu-angular';
 *
 * constructor(private formatNumber: FormatNumber) {}
 *
 * async displayFormattedNumber() {
 *   const formatted = await this.formatNumber.formatNumber({ number: 1500 });
 *   console.log(formatted); // Outputs: "1.5K"
 * }
 * ```
 *
 * @remarks
 * This service can be useful for displaying large numbers in a more compact form
 * in user interfaces, especially in dashboards or reports where space is limited.
 *
 * @property {FormatNumberOptions} options - Options containing the number to format.
 *
 * @returns {FormatNumber} The FormatNumber service for formatting numeric values.
 */

@Injectable({
  providedIn: 'root',
})
export class FormatNumber {

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
