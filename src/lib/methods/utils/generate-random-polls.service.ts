import { Injectable } from '@angular/core';
import { Poll } from '../../@types/types';
export interface GenerateRandomPollsOptions {
  numberOfPolls: number;
}

// Export the type definition for the function
export type GenerateRandomPollsType = (options: GenerateRandomPollsOptions) => Poll[];

@Injectable({
  providedIn: 'root',
})
export class GenerateRandomPolls {
  /**
   * Generates an array of random poll objects.
   *
   * @param {GenerateRandomPollsOptions} options - An object containing the number of polls to generate.
   * @param {number} options.numberOfPolls - The number of random polls to generate.
   * @returns {Poll[]} An array of random poll objects.
   */
  generateRandomPolls({ numberOfPolls }: GenerateRandomPollsOptions): Poll[] {
    const pollTypes: string[] = ['trueFalse', 'yesNo', 'custom'];
    const polls: Poll[] = [];

    for (let i = 0; i < numberOfPolls; i++) {
      const type = pollTypes[Math.floor(Math.random() * pollTypes.length)];
      let options: string[];

      switch (type) {
        case 'trueFalse':
          options = ['True', 'False'];
          break;
        case 'yesNo':
          options = ['Yes', 'No'];
          break;
        case 'custom':
          options = Array.from(
            { length: Math.floor(Math.random() * 5) + 2 },
            (_, idx) => `Option ${idx + 1}`,
          );
          break;
        default:
          options = [];
      }

      const poll: Poll = {
        id: `${i + 1}`,
        question: `Random Question ${i + 1}`,
        type,
        options,
        votes: Array(options.length).fill(0),
        status: 'inactive', // or 'active'
        voters: {},
      };

      polls.push(poll);
    }

    return polls;
  }
}
