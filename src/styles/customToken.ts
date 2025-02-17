import type { GetCustomToken } from 'antd-style';
import { rgba } from 'polished';

declare module 'antd-style' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface CustomToken extends SiteToken {}
}

interface SiteToken {
  headerHeight: number;
  footerHeight: number;
  sidebarWidth: number;
  tocWidth: number;
  /**
   * 文本内容的最大宽度 1152
   */
  contentMaxWidth: number;

  gradientColor1: string;
  gradientColor2: string;
  gradientColor3: string;

  gradientHeroBgG: string;
  gradientIconDefault: string;

  colorSolid: string;
  fontFamilyHighlighter: string;
}

export const getCustomToken: GetCustomToken<SiteToken> = ({ isDarkMode, token }) => {
  const gradientColor1 = token.blue;
  const gradientColor2 = isDarkMode ? token.pink : token.cyan;
  const gradientColor3 = token.purple;
  const colorSolid = isDarkMode ? token.colorWhite : '#000';

  return {
    headerHeight: 64,
    footerHeight: 300,
    sidebarWidth: 240,
    tocWidth: 176,
    contentMaxWidth: 1152,
    fontFamilyHighlighter:
      "'Fira Code', 'Fira Mono', Menlo, Consolas, 'DejaVu Sans Mono', monospace",

    colorSolid,

    gradientColor1,
    gradientColor2,
    gradientColor3,
    gradientHeroBgG: `radial-gradient(at 80% 20%, ${gradientColor1} 0%, ${gradientColor2} 80%, ${gradientColor3} 130%)`,

    gradientIconDefault: `radial-gradient(
        100% 100% at 50% 0,
        ${rgba(colorSolid, isDarkMode ? 0.2 : 0.2)} 0,
        ${rgba(colorSolid, isDarkMode ? 0.1 : 0.4)} 100%
      )`,
  };
};
