import { Injectable } from '@angular/core';
import { PreJoinPageParameters } from '../../@types/types';
import { Socket } from 'socket.io-client';
import { CookieService } from 'ngx-cookie-service';

const MAX_ATTEMPTS = 10; // Maximum number of unsuccessful attempts before rate limiting
const RATE_LIMIT_DURATION = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
const TIMEOUT_DURATION = 10000; // 10 seconds

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
    let unsuccessfulAttempts =
      parseInt(this.cookieService.get('unsuccessfulAttempts'), 10) || 0;
    let lastRequestTimestamp =
      parseInt(this.cookieService.get('lastRequestTimestamp'), 10) || 0;

    if (
      unsuccessfulAttempts >= MAX_ATTEMPTS &&
      Date.now() - lastRequestTimestamp < RATE_LIMIT_DURATION
    ) {
      parameters.showAlert?.({
        message: 'Too many unsuccessful attempts. Please try again later.',
        type: 'danger',
        duration: 3000,
      });
      this.cookieService.set('lastRequestTimestamp', Date.now().toString());
      return;
    } else {
      // Reset attempts if the rate limit duration has passed
      if (Date.now() - lastRequestTimestamp >= RATE_LIMIT_DURATION) {
        unsuccessfulAttempts = 0;
        this.cookieService.set('unsuccessfulAttempts', '0');
        this.cookieService.set('lastRequestTimestamp', Date.now().toString());
      }
    }

    try {
      parameters.updateIsLoadingModalVisible(true);

      // Initiate socket connection
      const socket: Socket = await Promise.race([
        parameters.connectSocket({
          apiUserName,
          apiKey,
          apiToken,
          link,
        }),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('Request timed out')), TIMEOUT_DURATION)
        ),
      ]);

      if (socket && socket instanceof Socket && socket.id) {
        // Successful connection
        unsuccessfulAttempts = 0;
        this.cookieService.set('unsuccessfulAttempts', '0');
        this.cookieService.set('lastRequestTimestamp', Date.now().toString());

        if (validate) {
          parameters.updateSocket(socket);
        } else {
          parameters.updateLocalSocket?.(socket);
        }

        parameters.updateApiUserName(apiUserName);
        parameters.updateApiToken(apiToken);
        parameters.updateLink(link);
        parameters.updateRoomName(apiUserName);
        parameters.updateMember(userName);

        if (validate) {
          parameters.updateValidated(true);
        }

        parameters.updateIsLoadingModalVisible(false);
      } else {
        // Unsuccessful connection
        unsuccessfulAttempts += 1;
        this.cookieService.set('unsuccessfulAttempts', unsuccessfulAttempts.toString());
        this.cookieService.set('lastRequestTimestamp', Date.now().toString());
        parameters.updateIsLoadingModalVisible(false);

        if (unsuccessfulAttempts >= MAX_ATTEMPTS) {
          parameters.showAlert?.({
            message: 'Too many unsuccessful attempts. Please try again later.',
            type: 'danger',
            duration: 3000,
          });
        } else {
          parameters.showAlert?.({
            message: 'Invalid credentials.',
            type: 'danger',
            duration: 3000,
          });
        }
      }
    } catch (error) {
      // Handle errors (e.g., timeout)
      parameters.showAlert?.({
        message: 'Unable to connect. Check your credentials and try again.',
        type: 'danger',
        duration: 3000,
      });

      unsuccessfulAttempts += 1;
      this.cookieService.set('unsuccessfulAttempts', unsuccessfulAttempts.toString());
      this.cookieService.set('lastRequestTimestamp', Date.now().toString());
      parameters.updateIsLoadingModalVisible(false);
    }
  }
}
