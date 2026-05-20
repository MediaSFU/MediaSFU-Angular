export type ModernRenderMode = 'modal' | 'sidebar' | 'inline';
export declare const isEmbeddedRenderMode: (renderMode: ModernRenderMode) => boolean;
export declare const resolveModernHeaderTitle: (title: string | false | null | undefined, fallbackTitle: string) => string;
