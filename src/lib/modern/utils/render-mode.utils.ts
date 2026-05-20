export type ModernRenderMode = 'modal' | 'sidebar' | 'inline';

export const isEmbeddedRenderMode = (renderMode: ModernRenderMode): boolean => {
  return renderMode === 'sidebar' || renderMode === 'inline';
};

export const resolveModernHeaderTitle = (
  title: string | false | null | undefined,
  fallbackTitle: string,
): string => {
  if (typeof title === 'string' && title.trim()) {
    return title;
  }

  return fallbackTitle;
};