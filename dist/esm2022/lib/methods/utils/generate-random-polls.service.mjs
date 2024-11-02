import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
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
export class GenerateRandomPolls {
    /**
     * Generates an array of random poll objects.
     *
     * @param {GenerateRandomPollsOptions} options - An object containing the number of polls to generate.
     * @param {number} options.numberOfPolls - The number of random polls to generate.
     * @returns {Poll[]} An array of random poll objects.
     */
    generateRandomPolls({ numberOfPolls }) {
        const pollTypes = ['trueFalse', 'yesNo', 'custom'];
        const polls = [];
        for (let i = 0; i < numberOfPolls; i++) {
            const type = pollTypes[Math.floor(Math.random() * pollTypes.length)];
            let options;
            switch (type) {
                case 'trueFalse':
                    options = ['True', 'False'];
                    break;
                case 'yesNo':
                    options = ['Yes', 'No'];
                    break;
                case 'custom':
                    options = Array.from({ length: Math.floor(Math.random() * 5) + 2 }, (_, idx) => `Option ${idx + 1}`);
                    break;
                default:
                    options = [];
            }
            const poll = {
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
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomPolls, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomPolls, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: GenerateRandomPolls, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VuZXJhdGUtcmFuZG9tLXBvbGxzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy91dGlscy9nZW5lcmF0ZS1yYW5kb20tcG9sbHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztBQVMzQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXlCSztBQUlMLE1BQU0sT0FBTyxtQkFBbUI7SUFDOUI7Ozs7OztPQU1HO0lBQ0gsbUJBQW1CLENBQUMsRUFBRSxhQUFhLEVBQThCO1FBQy9ELE1BQU0sU0FBUyxHQUFhLENBQUMsV0FBVyxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUM3RCxNQUFNLEtBQUssR0FBVyxFQUFFLENBQUM7UUFFekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGFBQWEsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNyRSxJQUFJLE9BQWlCLENBQUM7WUFFdEIsUUFBUSxJQUFJLEVBQUUsQ0FBQztnQkFDYixLQUFLLFdBQVc7b0JBQ2QsT0FBTyxHQUFHLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM1QixNQUFNO2dCQUNSLEtBQUssT0FBTztvQkFDVixPQUFPLEdBQUcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3hCLE1BQU07Z0JBQ1IsS0FBSyxRQUFRO29CQUNYLE9BQU8sR0FBRyxLQUFLLENBQUMsSUFBSSxDQUNsQixFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFDN0MsQ0FBQyxDQUFDLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLEVBQUUsQ0FDaEMsQ0FBQztvQkFDRixNQUFNO2dCQUNSO29CQUNFLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDakIsQ0FBQztZQUVELE1BQU0sSUFBSSxHQUFTO2dCQUNqQixFQUFFLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNkLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDcEMsSUFBSTtnQkFDSixPQUFPO2dCQUNQLEtBQUssRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYztnQkFDbEMsTUFBTSxFQUFFLEVBQUU7YUFDWCxDQUFDO1lBRUYsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixDQUFDO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO3VHQS9DVSxtQkFBbUI7MkdBQW5CLG1CQUFtQixjQUZsQixNQUFNOzsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUG9sbCB9IGZyb20gJy4uLy4uL0B0eXBlcy90eXBlcyc7XG5leHBvcnQgaW50ZXJmYWNlIEdlbmVyYXRlUmFuZG9tUG9sbHNPcHRpb25zIHtcbiAgbnVtYmVyT2ZQb2xsczogbnVtYmVyO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBHZW5lcmF0ZVJhbmRvbVBvbGxzVHlwZSA9IChvcHRpb25zOiBHZW5lcmF0ZVJhbmRvbVBvbGxzT3B0aW9ucykgPT4gUG9sbFtdO1xuXG4vKipcbiAgICogR2VuZXJhdGVzIGFuIGFycmF5IG9mIHJhbmRvbSBwb2xsIG9iamVjdHMgd2l0aCB2YXJ5aW5nIHR5cGVzIGFuZCBvcHRpb25zLlxuICAgKlxuICAgKiBFYWNoIHBvbGwgaW5jbHVkZXMgYSBxdWVzdGlvbiwgYSB0eXBlIChlLmcuLCBcInRydWVGYWxzZVwiLCBcInllc05vXCIsIG9yIFwiY3VzdG9tXCIpLCBhbmQgbXVsdGlwbGUgY2hvaWNlIG9wdGlvbnMuXG4gICAqIFBvbGwgdHlwZXMgZGV0ZXJtaW5lIHRoZSBvcHRpb25zIGdlbmVyYXRlZDpcbiAgICogLSBgXCJ0cnVlRmFsc2VcImAgcG9sbHMgaGF2ZSBcIlRydWVcIiBhbmQgXCJGYWxzZVwiIG9wdGlvbnMuXG4gICAqIC0gYFwieWVzTm9cImAgcG9sbHMgaGF2ZSBcIlllc1wiIGFuZCBcIk5vXCIgb3B0aW9ucy5cbiAgICogLSBgXCJjdXN0b21cImAgcG9sbHMgZ2VuZXJhdGUgMuKAkzYgY3VzdG9tIG9wdGlvbnMgbGFiZWxlZCBhcyBcIk9wdGlvbiAxXCIsIFwiT3B0aW9uIDJcIiwgZXRjLlxuICAgKlxuICAgKiBAcGFyYW0ge0dlbmVyYXRlUmFuZG9tUG9sbHNPcHRpb25zfSBvcHRpb25zIC0gQW4gb2JqZWN0IGNvbnRhaW5pbmcgdGhlIG51bWJlciBvZiBwb2xscyB0byBnZW5lcmF0ZS5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9wdGlvbnMubnVtYmVyT2ZQb2xscyAtIFRoZSBudW1iZXIgb2YgcmFuZG9tIHBvbGxzIHRvIGdlbmVyYXRlLlxuICAgKiBAcmV0dXJucyB7UG9sbFtdfSBBbiBhcnJheSBvZiBnZW5lcmF0ZWQgcG9sbHMgd2l0aCB1bmlxdWUgSURzIGFuZCByYW5kb21seSBzZWxlY3RlZCB0eXBlcyBhbmQgb3B0aW9ucy5cbiAgICpcbiAgICogQGV4YW1wbGVcbiAgICogY29uc3QgcG9sbFNlcnZpY2UgPSBuZXcgR2VuZXJhdGVSYW5kb21Qb2xscygpO1xuICAgKiBjb25zdCBvcHRpb25zID0geyBudW1iZXJPZlBvbGxzOiAzIH07XG4gICAqIGNvbnN0IHJhbmRvbVBvbGxzID0gcG9sbFNlcnZpY2UuZ2VuZXJhdGVSYW5kb21Qb2xscyhvcHRpb25zKTtcbiAgICpcbiAgICogY29uc29sZS5sb2cocmFuZG9tUG9sbHMpO1xuICAgKiAvLyBPdXRwdXQ6XG4gICAqIC8vIFtcbiAgICogLy8gICB7IGlkOiAnMScsIHF1ZXN0aW9uOiAnUmFuZG9tIFF1ZXN0aW9uIDEnLCB0eXBlOiAneWVzTm8nLCBvcHRpb25zOiBbJ1llcycsICdObyddLCB2b3RlczogWzAsIDBdLCBzdGF0dXM6ICdpbmFjdGl2ZScsIHZvdGVyczoge30gfSxcbiAgICogLy8gICB7IGlkOiAnMicsIHF1ZXN0aW9uOiAnUmFuZG9tIFF1ZXN0aW9uIDInLCB0eXBlOiAndHJ1ZUZhbHNlJywgb3B0aW9uczogWydUcnVlJywgJ0ZhbHNlJ10sIHZvdGVzOiBbMCwgMF0sIHN0YXR1czogJ2luYWN0aXZlJywgdm90ZXJzOiB7fSB9LFxuICAgKiAvLyAgIHsgaWQ6ICczJywgcXVlc3Rpb246ICdSYW5kb20gUXVlc3Rpb24gMycsIHR5cGU6ICdjdXN0b20nLCBvcHRpb25zOiBbJ09wdGlvbiAxJywgJ09wdGlvbiAyJywgJ09wdGlvbiAzJ10sIHZvdGVzOiBbMCwgMCwgMF0sIHN0YXR1czogJ2luYWN0aXZlJywgdm90ZXJzOiB7fSB9XG4gICAqIC8vIF1cbiAgICovXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290Jyxcbn0pXG5leHBvcnQgY2xhc3MgR2VuZXJhdGVSYW5kb21Qb2xscyB7XG4gIC8qKlxuICAgKiBHZW5lcmF0ZXMgYW4gYXJyYXkgb2YgcmFuZG9tIHBvbGwgb2JqZWN0cy5cbiAgICpcbiAgICogQHBhcmFtIHtHZW5lcmF0ZVJhbmRvbVBvbGxzT3B0aW9uc30gb3B0aW9ucyAtIEFuIG9iamVjdCBjb250YWluaW5nIHRoZSBudW1iZXIgb2YgcG9sbHMgdG8gZ2VuZXJhdGUuXG4gICAqIEBwYXJhbSB7bnVtYmVyfSBvcHRpb25zLm51bWJlck9mUG9sbHMgLSBUaGUgbnVtYmVyIG9mIHJhbmRvbSBwb2xscyB0byBnZW5lcmF0ZS5cbiAgICogQHJldHVybnMge1BvbGxbXX0gQW4gYXJyYXkgb2YgcmFuZG9tIHBvbGwgb2JqZWN0cy5cbiAgICovXG4gIGdlbmVyYXRlUmFuZG9tUG9sbHMoeyBudW1iZXJPZlBvbGxzIH06IEdlbmVyYXRlUmFuZG9tUG9sbHNPcHRpb25zKTogUG9sbFtdIHtcbiAgICBjb25zdCBwb2xsVHlwZXM6IHN0cmluZ1tdID0gWyd0cnVlRmFsc2UnLCAneWVzTm8nLCAnY3VzdG9tJ107XG4gICAgY29uc3QgcG9sbHM6IFBvbGxbXSA9IFtdO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1iZXJPZlBvbGxzOyBpKyspIHtcbiAgICAgIGNvbnN0IHR5cGUgPSBwb2xsVHlwZXNbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogcG9sbFR5cGVzLmxlbmd0aCldO1xuICAgICAgbGV0IG9wdGlvbnM6IHN0cmluZ1tdO1xuXG4gICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgY2FzZSAndHJ1ZUZhbHNlJzpcbiAgICAgICAgICBvcHRpb25zID0gWydUcnVlJywgJ0ZhbHNlJ107XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ3llc05vJzpcbiAgICAgICAgICBvcHRpb25zID0gWydZZXMnLCAnTm8nXTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnY3VzdG9tJzpcbiAgICAgICAgICBvcHRpb25zID0gQXJyYXkuZnJvbShcbiAgICAgICAgICAgIHsgbGVuZ3RoOiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA1KSArIDIgfSxcbiAgICAgICAgICAgIChfLCBpZHgpID0+IGBPcHRpb24gJHtpZHggKyAxfWAsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBvcHRpb25zID0gW107XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBvbGw6IFBvbGwgPSB7XG4gICAgICAgIGlkOiBgJHtpICsgMX1gLFxuICAgICAgICBxdWVzdGlvbjogYFJhbmRvbSBRdWVzdGlvbiAke2kgKyAxfWAsXG4gICAgICAgIHR5cGUsXG4gICAgICAgIG9wdGlvbnMsXG4gICAgICAgIHZvdGVzOiBBcnJheShvcHRpb25zLmxlbmd0aCkuZmlsbCgwKSxcbiAgICAgICAgc3RhdHVzOiAnaW5hY3RpdmUnLCAvLyBvciAnYWN0aXZlJ1xuICAgICAgICB2b3RlcnM6IHt9LFxuICAgICAgfTtcblxuICAgICAgcG9sbHMucHVzaChwb2xsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcG9sbHM7XG4gIH1cbn1cbiJdfQ==