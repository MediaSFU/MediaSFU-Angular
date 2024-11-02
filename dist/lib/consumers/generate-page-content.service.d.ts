import { Participant, Stream, DispStreamsType, DispStreamsParameters } from '../@types/types';
import * as i0 from "@angular/core";
export interface GeneratePageContentParameters extends DispStreamsParameters {
    paginatedStreams: (Participant | Stream)[][];
    currentUserPage: number;
    updateMainWindow: boolean;
    updateCurrentUserPage: (page: number) => void;
    updateUpdateMainWindow: (flag: boolean) => void;
    dispStreams: DispStreamsType;
    getUpdatedAllParams: () => GeneratePageContentParameters;
    [key: string]: any;
}
export interface GeneratePageContentOptions {
    page: number | string;
    parameters: GeneratePageContentParameters;
    breakRoom?: number;
    inBreakRoom?: boolean;
}
export type GeneratePageContentType = (options: GeneratePageContentOptions) => Promise<void>;
/**
 * Generates the content for a specific page.
 *
 * @param {GeneratePageContentOptions} options - The options for generating page content.
 * @param {number | string} options.page - The page number to generate content for.
 * @param {GeneratePageContentParameters} options.parameters - The parameters required for generating content.
 * @param {Array<(Participant | Stream)[]>} options.parameters.paginatedStreams - The streams to be paginated.
 * @param {number} options.parameters.currentUserPage - The current page of the user.
 * @param {Function} options.parameters.updateMainWindow - Function to update the main window flag.
 * @param {Function} options.parameters.updateCurrentUserPage - Function to update the current user page.
 * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window update flag.
 * @param {Function} options.parameters.dispStreams - Function to display streams for the specified page.
 * @param {number} [options.breakRoom=-1] - The break room identifier.
 * @param {boolean} [options.inBreakRoom=false] - Flag indicating if the user is in a break room.
 *
 * @returns {Promise<void>} A promise that resolves when the content generation is complete.
 *
 * @throws {Error} Throws an error if content generation fails.
 *
 * @example
 * ```typescript
 * const options = {
 *   page: 1,
 *   parameters: {
 *     paginatedStreams: [
 *       // Page 0 streams
 *       [stream1, stream2],
 *       // Page 1 streams
 *       [stream3, stream4],
 *     ],
 *     currentUserPage: 0,
 *     updateMainWindow: false,
 *     updateCurrentUserPage: (page) => { console.log(`Current page updated to: ${page}`); },
 *     updateUpdateMainWindow: (flag) => { console.log(`Main window update flag: ${flag}`); },
 *     dispStreams: async ({ lStreams, ind }) => {
 *       console.log(`Displaying streams for page ${ind}:`, lStreams);
 *     },
 *     getUpdatedAllParams: () => options.parameters,
 *   },
 *   breakRoom: -1,
 *   inBreakRoom: false,
 * };
 *
 * const generatePageContentService = new GeneratePageContent();
 * await generatePageContentService.generatePageContent(options);
 * ```
 */
export declare class GeneratePageContent {
    /**
     * Generates the content for a specific page.
     *
     * @param {Object} options - The options for generating page content.
     * @param {number | string} options.page - The page number to generate content for.
     * @param {Object} options.parameters - The parameters required for generating content.
     * @param {Array} options.parameters.paginatedStreams - The streams to be paginated.
     * @param {number} options.parameters.currentUserPage - The current page of the user.
     * @param {Function} options.parameters.updateMainWindow - Function to update the main window flag.
     * @param {Function} options.parameters.updateCurrentUserPage - Function to update the current user page.
     * @param {Function} options.parameters.updateUpdateMainWindow - Function to update the main window update flag.
     * @param {Function} options.parameters.dispStreams - Function to display streams for the specified page.
     * @param {number} [options.breakRoom=-1] - The break room identifier.
     * @param {boolean} [options.inBreakRoom=false] - Flag indicating if the user is in a break room.
     * @returns {Promise<void>} A promise that resolves when the content generation is complete.
     * @throws {Error} Throws an error if content generation fails.
     */
    generatePageContent({ page, parameters, breakRoom, inBreakRoom, }: GeneratePageContentOptions): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<GeneratePageContent, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<GeneratePageContent>;
}
