import { Poll } from '../../@types/types';
import * as i0 from "@angular/core";
export interface GenerateRandomPollsOptions {
    numberOfPolls: number;
}
export type GenerateRandomPollsType = (options: GenerateRandomPollsOptions) => Poll[];
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
