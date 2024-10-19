import { Injectable } from '@angular/core';
import { Participant, Stream, DispStreamsType, DispStreamsParameters } from '../@types/types';
export interface GeneratePageContentParameters extends DispStreamsParameters {
  paginatedStreams: (Participant | Stream)[][];
  currentUserPage: number;
  updateMainWindow: boolean;
  updateCurrentUserPage: (page: number) => void;
  updateUpdateMainWindow: (flag: boolean) => void;

  // mediasfu functions
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

// Export the type definition for the function
export type GeneratePageContentType = (options: GeneratePageContentOptions) => Promise<void>;

@Injectable({
  providedIn: 'root',
})
export class GeneratePageContent {
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
  async generatePageContent({
    page,
    parameters,
    breakRoom = -1,
    inBreakRoom = false,
  }: GeneratePageContentOptions): Promise<void> {
    try {
      // Destructure parameters
      parameters = parameters.getUpdatedAllParams();

      let {
        paginatedStreams,
        currentUserPage,
        updateMainWindow,
        updateCurrentUserPage,
        updateUpdateMainWindow,
        // mediasfu functions
        dispStreams,
      } = parameters;

      // Convert page to an integer
      page = parseInt(page.toString(), 10);

      // Update current user page
      currentUserPage = page;
      updateCurrentUserPage(currentUserPage);

      // Update main window flag
      updateMainWindow = true;
      updateUpdateMainWindow(updateMainWindow);

      // Display streams for the specified page
      await dispStreams({
        lStreams: paginatedStreams[page],
        ind: page,
        parameters,
        breakRoom,
        inBreakRoom,
      });
    } catch (error: any) {
      // Handle errors during content generation
      console.log('Error generating page content:', error.message);
    }
  }
}
