/**
 * Pauses the execution for a specified number of milliseconds.
 *
 * @param {SleepOptions} options - An object containing the sleep duration.
 * @param {number} options.ms - The number of milliseconds to sleep.
 * @returns {Promise<void>} A promise that resolves after the specified duration.
 */
export function sleep({ ms }) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2xlZXAudXRpbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL21lZGlhc2Z1LWFuZ3VsYXIvc3JjL2xpYi9tZXRob2RzL3V0aWxzL3NsZWVwLnV0aWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBT0E7Ozs7OztHQU1HO0FBRUgsTUFBTSxVQUFVLEtBQUssQ0FBQyxFQUFFLEVBQUUsRUFBZ0I7SUFDeEMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgaW50ZXJmYWNlIFNsZWVwT3B0aW9ucyB7XG4gIG1zOiBudW1iZXI7XG59XG5cbi8vIEV4cG9ydCB0aGUgdHlwZSBkZWZpbml0aW9uIGZvciB0aGUgZnVuY3Rpb25cbmV4cG9ydCB0eXBlIFNsZWVwVHlwZSA9IChvcHRpb25zOiBTbGVlcE9wdGlvbnMpID0+IFByb21pc2U8dm9pZD47XG5cbi8qKlxuICogUGF1c2VzIHRoZSBleGVjdXRpb24gZm9yIGEgc3BlY2lmaWVkIG51bWJlciBvZiBtaWxsaXNlY29uZHMuXG4gKlxuICogQHBhcmFtIHtTbGVlcE9wdGlvbnN9IG9wdGlvbnMgLSBBbiBvYmplY3QgY29udGFpbmluZyB0aGUgc2xlZXAgZHVyYXRpb24uXG4gKiBAcGFyYW0ge251bWJlcn0gb3B0aW9ucy5tcyAtIFRoZSBudW1iZXIgb2YgbWlsbGlzZWNvbmRzIHRvIHNsZWVwLlxuICogQHJldHVybnMge1Byb21pc2U8dm9pZD59IEEgcHJvbWlzZSB0aGF0IHJlc29sdmVzIGFmdGVyIHRoZSBzcGVjaWZpZWQgZHVyYXRpb24uXG4gKi9cblxuZXhwb3J0IGZ1bmN0aW9uIHNsZWVwKHsgbXMgfTogU2xlZXBPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSkgPT4gc2V0VGltZW91dChyZXNvbHZlLCBtcykpO1xufVxuIl19