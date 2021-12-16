declare module '*.png';
declare module '*.gif';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.styl';
declare module 'qcloud-iotexplorer-h5-panel-sdk';
declare const wx;

/**
 * 表示组件支持通过 className 和 style 进行样式定制
 */
declare interface StyledProps {
  /**
   * 组件自定义类名
   */
  className?: string;

  /**
   * 组件自定义样式
   */
  style?: React.CSSProperties;
}

declare interface SelectorOption {
  text: string;
  value: string;
}

declare interface ListResponse<T> {
  list: T[];
  total: number;
}

declare interface ReducerAction<T> {
  type: T;
  payload?: any;
}

declare interface TemplateData {
  id: string;
  name: string;
  mode: string;
  define: {
    type: string;
    mapping: HashMap;
    min: string | number;
    max: string | number;
    start: string | number;
    step: string | number;
    unit: string;
  };
  desc?: string;
  required?: boolean;
}

declare interface HashMap {
  [key: string]: string | number | boolean | HashMap | any[];
}

// 主题类型 normal-黑白色 blueWhite-蓝白色 dark-暗黑色 colorful-多彩色 morandi-莫兰迪色
export declare type ThemeType =
  | 'normal'
  | 'blueWhite'
  | 'dark'
  | 'colorful'
  | 'morandi';

// eslint-disable-next-line no-unused-vars
declare interface ThemeProps {
  theme?: ThemeType;
}

export interface stringKey {
  [key: string]: string;
}
