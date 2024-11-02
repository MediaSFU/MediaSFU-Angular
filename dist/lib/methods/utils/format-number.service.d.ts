import * as i0 from "@angular/core";
export interface FormatNumberOptions {
    number: number;
}
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
export declare class FormatNumber {
    formatNumber({ number }: FormatNumberOptions): Promise<string | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormatNumber, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormatNumber>;
}
