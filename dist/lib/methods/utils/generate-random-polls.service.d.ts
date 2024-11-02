import { Poll } from '../../@types/types';
import * as i0 from "@angular/core";
export interface GenerateRandomPollsOptions {
    numberOfPolls: number;
}
export type GenerateRandomPollsType = (options: GenerateRandomPollsOptions) => Poll[];
/**
   * Generates an array of random poll objects with varying types and options.
   *
   * Each poll includes a question, a type (e.g., "trueFalse", "yesNo", or "custom"), and multiple choice options.
   * Poll types determine the options generated:
   * - `"trueFalse"` polls have "True" and "False" options.
   * - `"yesNo"` polls have "Yes" and "No" options.
   * - `"custom"` polls generate 2–6 custom options labeled as "Option 1", "Option 2", etc.
   *
   * @param {GenerateRandomPollsOptions} options - An object containing the number of polls to generate.
   * @param {number} options.numberOfPolls - The number of random polls to generate.
   * @returns {Poll[]} An array of generated polls with unique IDs and randomly selected types and options.
   *
   * @example
   * const pollService = new GenerateRandomPolls();
   * const options = { numberOfPolls: 3 };
   * const randomPolls = pollService.generateRandomPolls(options);
   *
   * console.log(randomPolls);
   * // Output:
   * // [
   * //   { id: '1', question: 'Random Question 1', type: 'yesNo', options: ['Yes', 'No'], votes: [0, 0], status: 'inactive', voters: {} },
   * //   { id: '2', question: 'Random Question 2', type: 'trueFalse', options: ['True', 'False'], votes: [0, 0], status: 'inactive', voters: {} },
   * //   { id: '3', question: 'Random Question 3', type: 'custom', options: ['Option 1', 'Option 2', 'Option 3'], votes: [0, 0, 0], status: 'inactive', voters: {} }
   * // ]
   */
export declare class GenerateRandomPolls {
    /**
     * Generates an array of random poll objects.
     *
     * @param {GenerateRandomPollsOptions} options - An object containing the number of polls to generate.
     * @param {number} options.numberOfPolls - The number of random polls to generate.
     * @returns {Poll[]} An array of random poll objects.
     */
    generateRandomPolls({ numberOfPolls }: GenerateRandomPollsOptions): Poll[];
    static ɵfac: i0.ɵɵFactoryDeclaration<GenerateRandomPolls, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GenerateRandomPolls>;
}
