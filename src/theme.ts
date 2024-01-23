export type ColorTheme = {
  primary: string;
  mainBg: string;
  label: string;
  labelInvert: string;
};

export type FontSize = {
  small: string;
  medium: string;
  large: string;
  title: string;
};

export type AppTheme = {
  color: ColorTheme;
  fontSize: FontSize;
};

export const fontSize: FontSize = {
  small: '12px',
  medium: '16px',
  large: '20px',
  title: '28px',
};

export const colorTheme: ColorTheme = {
  primary: '#00263E',
  mainBg: '#EDEDED',
  label: '#0E151B',
  labelInvert: '#FFFFFF',
};

export const appTheme: AppTheme = {
  color: colorTheme,
  fontSize,
};
