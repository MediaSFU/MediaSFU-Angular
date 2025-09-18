import { PreJoinPageParameters } from '../../@types/types';
import { CookieService } from 'ngx-cookie-service';
import * as i0 from "@angular/core";
export declare class CheckLimitsAndMakeRequest {
    private cookieService;
    constructor(cookieService: CookieService);
    /**
     * Checks rate limits and attempts to make a socket connection.
     *
     * @param params - The parameters required for making the request.
     */
    checkLimitsAndMakeRequest({ apiUserName, apiToken, link, apiKey, userName, parameters, validate, }: {
        apiUserName: string;
        apiToken: string;
        link: string;
        apiKey?: string;
        userName: string;
        parameters: PreJoinPageParameters;
        validate?: boolean;
    }): Promise<void>;
    static ɵfac: i0.ɵɵFactoryDeclaration<CheckLimitsAndMakeRequest, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<CheckLimitsAndMakeRequest>;
}
