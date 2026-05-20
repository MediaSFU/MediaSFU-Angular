import { Injectable } from '@angular/core';
import { validateAlphanumeric as sharedValidateAlphanumeric } from 'mediasfu-shared';
export interface ValidateAlphanumericOptions {
  str: string;
}

// Export the type definition for the function
export type ValidateAlphanumericType = (options: ValidateAlphanumericOptions) => Promise<boolean>;

/**
 * Service to validate if a given string contains only alphanumeric characters.
 *
 * @class ValidateAlphanumeric
 *
 * @example
 * ```typescript
 * const validator = new ValidateAlphanumeric();
 * validator.validateAlphanumeric({ str: 'abc123' }).then(isValid => console.log(isValid)); // true
 * validator.validateAlphanumeric({ str: 'abc 123!' }).then(isValid => console.log(isValid)); // false
 * ```
 *
 * @param {ValidateAlphanumericOptions} options - Contains the string to validate.
 * @param {string} options.str - The input string that needs to be validated.
 * @returns {Promise<boolean>} - A promise resolving to `true` if the input string is alphanumeric, otherwise `false`.
 */

@Injectable({
  providedIn: 'root',
})
export class ValidateAlphanumeric {
  /**
   * Validates if the given string contains only alphanumeric characters.
   *
   * @param {ValidateAlphanumericOptions} options - The options containing the string to validate.
   * @param {string} options.str - The string to be validated.
   * @returns {Promise<boolean>} - A promise that resolves to `true` if the string is alphanumeric, otherwise `false`.
   */
  async validateAlphanumeric({ str }: ValidateAlphanumericOptions): Promise<boolean> {
    return sharedValidateAlphanumeric({ str });
  }
}
