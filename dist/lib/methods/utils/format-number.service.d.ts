import * as i0 from "@angular/core";
export interface FormatNumberOptions {
    number: number;
}
export type FormatNumberType = (options: FormatNumberOptions) => Promise<string | undefined>;
export declare class FormatNumber {
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
    formatNumber({ number }: FormatNumberOptions): Promise<string | undefined>;
    static ɵfac: i0.ɵɵFactoryDeclaration<FormatNumber, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<FormatNumber>;
}
