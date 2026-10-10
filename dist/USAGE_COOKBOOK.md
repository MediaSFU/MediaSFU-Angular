# MediaSFU Angular Usage Cookbook

Recipe-oriented examples for the most common MediaSFU Angular integration paths.

MediaSFU Angular is still a frontend SDK, so every recipe assumes you have either:

- MediaSFU Cloud credentials, or
- a self-hosted MediaSFU Open deployment reachable through `localLink`.

## Recipe 1: Ship the Prebuilt Room Fast

Use this when you want the quickest path to a production-ready room with the bundled prejoin and room shell.

```typescript
import { Component } from '@angular/core';
import { MediasfuGeneric } from 'mediasfu-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MediasfuGeneric],
  template: `
    <app-mediasfu-generic
      [credentials]="credentials"
      [connectMediaSFU]="true">
    </app-mediasfu-generic>
  `,
})
export class AppComponent {
  readonly credentials = {
    apiUserName: 'your-api-username',
    apiKey: 'your-64-char-api-key',
  };
}
```

Use this path for conference rooms, webinars, broadcasts, or chat when you want MediaSFU to own the UI and real-time orchestration.

## Recipe 2: Point the Same UI at MediaSFU Open

Use this when you want the bundled Angular UI but your own backend deployment.

```typescript
import { Component } from '@angular/core';
import { MediasfuGeneric } from 'mediasfu-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MediasfuGeneric],
  template: `
    <app-mediasfu-generic
      [localLink]="localLink"
      [connectMediaSFU]="true">
    </app-mediasfu-generic>
  `,
})
export class AppComponent {
  readonly localLink = 'http://localhost:3000';
}
```

Set `localLink` to your MediaSFU Open server and keep the rest of the Angular room shell intact.

## Recipe 3: Run Headless and Capture Runtime Helpers

Use this when you want MediaSFU transports, sockets, and room lifecycle helpers, but you plan to render your own Angular UI.

```typescript
import { Component } from '@angular/core';
import { MediasfuGeneric } from 'mediasfu-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MediasfuGeneric],
  template: `
    <app-mediasfu-generic
      [credentials]="credentials"
      [returnUI]="false"
      [noUIPreJoinOptions]="preJoinOptions"
      [sourceParameters]="sourceParameters"
      [updateSourceParameters]="handleSourceParameters">
    </app-mediasfu-generic>

    <app-custom-room-shell
      [helpers]="sourceParameters">
    </app-custom-room-shell>
  `,
})
export class AppComponent {
  readonly credentials = {
    apiUserName: 'your-api-username',
    apiKey: 'your-64-char-api-key',
  };

  sourceParameters: Record<string, unknown> = {};

  readonly preJoinOptions = {
    action: 'join' as const,
    meetingID: 'demo-room',
    userName: 'Ada',
  };

  handleSourceParameters = (data: Record<string, unknown>): void => {
    this.sourceParameters = data;
  };
}
```

This is the easiest bridge from the packaged SDK to a fully custom Angular room experience.

## Recipe 4: Keep the Runtime, Replace the Main Shell

Use this when you want MediaSFU to keep its room state and media helpers, but you want your own workspace layout instead of the default main container.

```typescript
import { Component } from '@angular/core';
import { MediasfuGeneric } from 'mediasfu-angular';
import { CustomRoomShellComponent } from './custom-room-shell.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MediasfuGeneric],
  template: `
    <app-mediasfu-generic
      [credentials]="credentials"
      [customMainComponent]="customRoomShell"
      [connectMediaSFU]="true">
    </app-mediasfu-generic>
  `,
})
export class AppComponent {
  readonly credentials = {
    apiUserName: 'your-api-username',
    apiKey: 'your-64-char-api-key',
  };

  readonly customRoomShell = CustomRoomShellComponent;
}
```

Use `customMainComponent` when you want dashboards, CRM panels, or product-specific workflow chrome wrapped around the MediaSFU runtime.

## Recipe 5: Override Specific UI Surfaces

Use this when the default room is close to what you need and you only want to replace selected cards, modals, or layout surfaces.

```typescript
import { Component } from '@angular/core';
import {
  MediasfuGeneric,
  type MediasfuUICustomOverrides,
} from 'mediasfu-angular';
import { CustomMiniCardComponent } from './custom-mini-card.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MediasfuGeneric],
  template: `
    <app-mediasfu-generic
      [credentials]="credentials"
      [customMiniCard]="customMiniCard"
      [uiOverrides]="uiOverrides"
      [containerStyle]="containerStyle">
    </app-mediasfu-generic>
  `,
})
export class AppComponent {
  readonly credentials = {
    apiUserName: 'your-api-username',
    apiKey: 'your-64-char-api-key',
  };

  readonly customMiniCard = CustomMiniCardComponent;

  readonly containerStyle = {
    minHeight: '100vh',
    background: '#0f172a',
  };

  readonly uiOverrides: MediasfuUICustomOverrides = {
    chat: {
      props: {
        title: 'Support Chat',
      },
    },
  };
}
```

This path is usually the best middle ground when you want product branding and selective behavior changes without re-owning the whole room shell.

## Recipe Picker

- Choose Recipe 1 if speed matters more than customization.
- Choose Recipe 2 if you already run MediaSFU Open.
- Choose Recipe 3 if you want a fully bespoke Angular UI.
- Choose Recipe 4 if you want a custom shell but still want the packaged runtime to drive it.
- Choose Recipe 5 if you only need targeted visual or workflow overrides.