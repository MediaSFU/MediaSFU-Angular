import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
export class ValidateAlphanumeric {
    /**
     * Validates if the given string contains only alphanumeric characters.
     *
     * @param {ValidateAlphanumericOptions} options - The options containing the string to validate.
     * @param {string} options.str - The string to be validated.
     * @returns {Promise<boolean>} - A promise that resolves to `true` if the string is alphanumeric, otherwise `false`.
     */
    async validateAlphanumeric({ str }) {
        let code, i, len;
        for (i = 0, len = str.length; i < len; i++) {
            code = str.charCodeAt(i);
            if (!(code > 47 && code < 58) && // numeric (0-9)
                !(code > 64 && code < 91) && // upper alpha (A-Z)
                !(code > 96 && code < 123)) {
                // lower alpha (a-z)
                return false;
            }
        }
        return true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ValidateAlphanumeric, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ValidateAlphanumeric, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: ValidateAlphanumeric, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtYWxwaGFudW1lcmljLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy91dGlscy92YWxpZGF0ZS1hbHBoYW51bWVyaWMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVEzQzs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFLSCxNQUFNLE9BQU8sb0JBQW9CO0lBQy9COzs7Ozs7T0FNRztJQUNILEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBK0I7UUFDN0QsSUFBSSxJQUFJLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQztRQUVqQixLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUUsR0FBRyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQzNDLElBQUksR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLElBQ0UsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLGdCQUFnQjtnQkFDN0MsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQyxJQUFJLG9CQUFvQjtnQkFDakQsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLElBQUksSUFBSSxHQUFHLEdBQUcsQ0FBQyxFQUMxQixDQUFDO2dCQUNELG9CQUFvQjtnQkFDcEIsT0FBTyxLQUFLLENBQUM7WUFDZixDQUFDO1FBQ0gsQ0FBQztRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQzt1R0F2QlUsb0JBQW9COzJHQUFwQixvQkFBb0IsY0FGbkIsTUFBTTs7MkZBRVAsb0JBQW9CO2tCQUhoQyxVQUFVO21CQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmV4cG9ydCBpbnRlcmZhY2UgVmFsaWRhdGVBbHBoYW51bWVyaWNPcHRpb25zIHtcbiAgc3RyOiBzdHJpbmc7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFZhbGlkYXRlQWxwaGFudW1lcmljVHlwZSA9IChvcHRpb25zOiBWYWxpZGF0ZUFscGhhbnVtZXJpY09wdGlvbnMpID0+IFByb21pc2U8Ym9vbGVhbj47XG5cbi8qKlxuICogU2VydmljZSB0byB2YWxpZGF0ZSBpZiBhIGdpdmVuIHN0cmluZyBjb250YWlucyBvbmx5IGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzLlxuICpcbiAqIEBjbGFzcyBWYWxpZGF0ZUFscGhhbnVtZXJpY1xuICpcbiAqIEBleGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdGVBbHBoYW51bWVyaWMoKTtcbiAqIHZhbGlkYXRvci52YWxpZGF0ZUFscGhhbnVtZXJpYyh7IHN0cjogJ2FiYzEyMycgfSkudGhlbihpc1ZhbGlkID0+IGNvbnNvbGUubG9nKGlzVmFsaWQpKTsgLy8gdHJ1ZVxuICogdmFsaWRhdG9yLnZhbGlkYXRlQWxwaGFudW1lcmljKHsgc3RyOiAnYWJjIDEyMyEnIH0pLnRoZW4oaXNWYWxpZCA9PiBjb25zb2xlLmxvZyhpc1ZhbGlkKSk7IC8vIGZhbHNlXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0ge1ZhbGlkYXRlQWxwaGFudW1lcmljT3B0aW9uc30gb3B0aW9ucyAtIENvbnRhaW5zIHRoZSBzdHJpbmcgdG8gdmFsaWRhdGUuXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5zdHIgLSBUaGUgaW5wdXQgc3RyaW5nIHRoYXQgbmVlZHMgdG8gYmUgdmFsaWRhdGVkLlxuICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IC0gQSBwcm9taXNlIHJlc29sdmluZyB0byBgdHJ1ZWAgaWYgdGhlIGlucHV0IHN0cmluZyBpcyBhbHBoYW51bWVyaWMsIG90aGVyd2lzZSBgZmFsc2VgLlxuICovXG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnLFxufSlcbmV4cG9ydCBjbGFzcyBWYWxpZGF0ZUFscGhhbnVtZXJpYyB7XG4gIC8qKlxuICAgKiBWYWxpZGF0ZXMgaWYgdGhlIGdpdmVuIHN0cmluZyBjb250YWlucyBvbmx5IGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzLlxuICAgKlxuICAgKiBAcGFyYW0ge1ZhbGlkYXRlQWxwaGFudW1lcmljT3B0aW9uc30gb3B0aW9ucyAtIFRoZSBvcHRpb25zIGNvbnRhaW5pbmcgdGhlIHN0cmluZyB0byB2YWxpZGF0ZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMuc3RyIC0gVGhlIHN0cmluZyB0byBiZSB2YWxpZGF0ZWQuXG4gICAqIEByZXR1cm5zIHtQcm9taXNlPGJvb2xlYW4+fSAtIEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIHRvIGB0cnVlYCBpZiB0aGUgc3RyaW5nIGlzIGFscGhhbnVtZXJpYywgb3RoZXJ3aXNlIGBmYWxzZWAuXG4gICAqL1xuICBhc3luYyB2YWxpZGF0ZUFscGhhbnVtZXJpYyh7IHN0ciB9OiBWYWxpZGF0ZUFscGhhbnVtZXJpY09wdGlvbnMpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBsZXQgY29kZSwgaSwgbGVuO1xuXG4gICAgZm9yIChpID0gMCwgbGVuID0gc3RyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBjb2RlID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICBpZiAoXG4gICAgICAgICEoY29kZSA+IDQ3ICYmIGNvZGUgPCA1OCkgJiYgLy8gbnVtZXJpYyAoMC05KVxuICAgICAgICAhKGNvZGUgPiA2NCAmJiBjb2RlIDwgOTEpICYmIC8vIHVwcGVyIGFscGhhIChBLVopXG4gICAgICAgICEoY29kZSA+IDk2ICYmIGNvZGUgPCAxMjMpXG4gICAgICApIHtcbiAgICAgICAgLy8gbG93ZXIgYWxwaGEgKGEteilcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxufVxuIl19