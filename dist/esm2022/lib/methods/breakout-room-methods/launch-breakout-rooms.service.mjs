import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class LaunchBreakoutRooms {
    /**
     * Launches the breakout rooms by toggling the visibility of the breakout rooms modal.
     *
     * @param updateIsBreakoutRoomsModalVisible - Function to update the visibility state of the breakout rooms modal.
     * @param isBreakoutRoomsModalVisible - Current visibility state of the breakout rooms modal.
     */
    launchBreakoutRooms({ updateIsBreakoutRoomsModalVisible, isBreakoutRoomsModalVisible, }) {
        updateIsBreakoutRoomsModalVisible(!isBreakoutRoomsModalVisible);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchBreakoutRooms, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchBreakoutRooms, providedIn: 'root' });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "18.2.8", ngImport: i0, type: LaunchBreakoutRooms, decorators: [{
            type: Injectable,
            args: [{
                    providedIn: 'root',
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF1bmNoLWJyZWFrb3V0LXJvb21zLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9tZWRpYXNmdS1hbmd1bGFyL3NyYy9saWIvbWV0aG9kcy9icmVha291dC1yb29tLW1ldGhvZHMvbGF1bmNoLWJyZWFrb3V0LXJvb21zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7QUFZM0MsTUFBTSxPQUFPLG1CQUFtQjtJQUM5Qjs7Ozs7T0FLRztJQUVILG1CQUFtQixDQUFDLEVBQ2xCLGlDQUFpQyxFQUNqQywyQkFBMkIsR0FDQTtRQUMzQixpQ0FBaUMsQ0FBQyxDQUFDLDJCQUEyQixDQUFDLENBQUM7SUFDbEUsQ0FBQzt1R0FiVSxtQkFBbUI7MkdBQW5CLG1CQUFtQixjQUZsQixNQUFNOzsyRkFFUCxtQkFBbUI7a0JBSC9CLFVBQVU7bUJBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuZXhwb3J0IGludGVyZmFjZSBMYXVuY2hCcmVha291dFJvb21zT3B0aW9ucyB7XG4gIHVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZTogKGlzVmlzaWJsZTogYm9vbGVhbikgPT4gdm9pZDtcbiAgaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlOiBib29sZWFuO1xufVxuXG4vLyBFeHBvcnQgdGhlIHR5cGUgZGVmaW5pdGlvbiBmb3IgdGhlIGZ1bmN0aW9uXG5leHBvcnQgdHlwZSBMYXVuY2hCcmVha291dFJvb21zVHlwZSA9IChvcHRpb25zOiBMYXVuY2hCcmVha291dFJvb21zT3B0aW9ucykgPT4gdm9pZDtcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCcsXG59KVxuZXhwb3J0IGNsYXNzIExhdW5jaEJyZWFrb3V0Um9vbXMge1xuICAvKipcbiAgICogTGF1bmNoZXMgdGhlIGJyZWFrb3V0IHJvb21zIGJ5IHRvZ2dsaW5nIHRoZSB2aXNpYmlsaXR5IG9mIHRoZSBicmVha291dCByb29tcyBtb2RhbC5cbiAgICpcbiAgICogQHBhcmFtIHVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZSAtIEZ1bmN0aW9uIHRvIHVwZGF0ZSB0aGUgdmlzaWJpbGl0eSBzdGF0ZSBvZiB0aGUgYnJlYWtvdXQgcm9vbXMgbW9kYWwuXG4gICAqIEBwYXJhbSBpc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUgLSBDdXJyZW50IHZpc2liaWxpdHkgc3RhdGUgb2YgdGhlIGJyZWFrb3V0IHJvb21zIG1vZGFsLlxuICAgKi9cblxuICBsYXVuY2hCcmVha291dFJvb21zKHtcbiAgICB1cGRhdGVJc0JyZWFrb3V0Um9vbXNNb2RhbFZpc2libGUsXG4gICAgaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlLFxuICB9OiBMYXVuY2hCcmVha291dFJvb21zT3B0aW9ucyk6IHZvaWQge1xuICAgIHVwZGF0ZUlzQnJlYWtvdXRSb29tc01vZGFsVmlzaWJsZSghaXNCcmVha291dFJvb21zTW9kYWxWaXNpYmxlKTtcbiAgfVxufVxuIl19