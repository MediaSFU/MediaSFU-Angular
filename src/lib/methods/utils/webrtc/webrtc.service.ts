import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class WebRTC {
  public mediaDevices: MediaDevices;
  public MediaStream: any;
  public MediaStreamTrack: any;

  constructor() {
    this.mediaDevices = navigator.mediaDevices;
    this.MediaStream = window.MediaStream;
    this.MediaStreamTrack = window.MediaStreamTrack;
  }

  // Method to ensure mediaDevices is ready before returning it
  public async getMediaDevices(): Promise<MediaDevices> {
    try {
      // Example of awaiting something that might be necessary before accessing media devices
      await this.mediaDevices.getUserMedia({ audio: true, video: true });

      // Now mediaDevices is ready and can be returned
      return this.mediaDevices;
    } catch (error) {
      console.error('Error accessing media devices.', error);
      throw error;
    }
  }
}
