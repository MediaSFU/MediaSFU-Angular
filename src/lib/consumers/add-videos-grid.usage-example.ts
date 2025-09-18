/**
 * Example usage of custom components in MediaSFU Angular
 * 
 * This demonstrates how to use custom VideoCard, AudioCard, and MiniCard components
 * in the AddVideosGrid service. The custom components will replace the default ones
 * when provided in the parameters.
 */

import { Component } from '@angular/core';

// Example custom VideoCard component
@Component({
  selector: 'app-custom-video-card',
  template: `
    <div class="custom-video-card" [style.border]="'3px solid blue'">
      <h3>Custom Video: {{ name }}</h3>
      <video [srcObject]="videoStream" autoplay muted></video>
    </div>
  `,
  standalone: true
})
export class CustomVideoCard {
  // Same inputs as VideoCard
  name!: string;
  videoStream!: MediaStream | null;
  // ... other inputs would match VideoCard interface
}

// Example custom AudioCard component  
@Component({
  selector: 'app-custom-audio-card',
  template: `
    <div class="custom-audio-card" [style.backgroundColor]="'lightblue'">
      <h4>Custom Audio: {{ name }}</h4>
      <div class="audio-indicator">🎤</div>
    </div>
  `,
  standalone: true
})
export class CustomAudioCard {
  name!: string;
  // ... other inputs would match AudioCard interface
}

// Example custom MiniCard component
@Component({
  selector: 'app-custom-mini-card', 
  template: `
    <div class="custom-mini-card" [style.backgroundColor]="'lightgreen'">
      <span>{{ initials }}</span>
    </div>
  `,
  standalone: true
})
export class CustomMiniCard {
  initials!: string;
  // ... other inputs would match MiniCard interface
}

/*
// Usage in your MediaSFU component:

const parameters = {
  // ... all required AddVideosGridParameters
  
  // To use custom components:
  customVideoCard: CustomVideoCard,
  customAudioCard: CustomAudioCard, 
  customMiniCard: CustomMiniCard,
  
  // To use default components, simply omit the custom component properties
};

addVideosGridService.addVideosGrid(parameters);
*/