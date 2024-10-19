import * as i0 from "@angular/core";
export interface ValidateAlphanumericOptions {
    str: string;
}
export type ValidateAlphanumericType = (options: ValidateAlphanumericOptions) => Promise<boolean>;
export declare class ValidateAlphanumeric {
    /**
     * Validates if the given string contains only alphanumeric characters.
     *
     * @param {ValidateAlphanumericOptions} options - The options containing the string to validate.
     * @param {string} options.str - The string to be validated.
     * @returns {Promise<boolean>} - A promise that resolves to `true` if the string is alphanumeric, otherwise `false`.
     */
    validateAlphanumeric({ str }: ValidateAlphanumericOptions): Promise<boolean>;
    static ɵfac: i0.ɵɵFactoryDeclaration<ValidateAlphanumeric, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<ValidateAlphanumeric>;
}
