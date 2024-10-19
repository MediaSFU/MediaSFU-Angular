import { Injectable } from '@angular/core';
export interface ValidateAlphanumericOptions {
  str: string;
}

// Export the type definition for the function
export type ValidateAlphanumericType = (options: ValidateAlphanumericOptions) => Promise<boolean>;

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
    let code, i, len;

    for (i = 0, len = str.length; i < len; i++) {
      code = str.charCodeAt(i);
      if (
        !(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)
      ) {
        // lower alpha (a-z)
        return false;
      }
    }
    return true;
  }
}
