import { Injectable } from '@angular/core';
import { checkLimitsAndMakeRequest as sharedCheckLimitsAndMakeRequest } from 'mediasfu-shared';
import { PreJoinPageParameters } from '../../@types/types';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CheckLimitsAndMakeRequest {
  constructor(private cookieService: CookieService) {}

  /**
   * Checks rate limits and attempts to make a socket connection.
   *
   * @param params - The parameters required for making the request.
   */
  async checkLimitsAndMakeRequest({
    apiUserName,
    apiToken,
    link,
    apiKey = '',
    userName,
    parameters,
    validate = true,
  }: {
    apiUserName: string;
    apiToken: string;
    link: string;
    apiKey?: string;
    userName: string;
    parameters: PreJoinPageParameters;
    validate?: boolean;
  }): Promise<void> {
    await (sharedCheckLimitsAndMakeRequest as unknown as (options: {
      apiUserName: string;
      apiToken: string;
      link: string;
      apiKey?: string;
      userName: string;
      parameters: PreJoinPageParameters;
      validate?: boolean;
    }) => Promise<void>)({
      apiUserName,
      apiToken,
      link,
      apiKey,
      userName,
      parameters,
      validate,
    });
  }
}
