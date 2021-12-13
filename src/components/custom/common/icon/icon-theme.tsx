/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-12 17:12:43
 * @LastEditors:
 * @LastEditTime:
 */

import '@src/styles/themes/icons';
import './icon-theme.less';

import { px2vw, toUnderscores } from '@src/utils';

import React from 'react';
import classNames from 'classnames';
import { getThemeType } from '@src/utils/business';

const themeType = getThemeType();
export interface IconProps {
  color?: string;
  className?: string;
  height?: number;
  kind?: string | any;
  onClick?: () => void;
  preview?: boolean;
  size?: number;
  style?: any;
  width?: number;
  wrapperStyle?: any;
  isFillNone?: boolean; //
}

const IconTheme = ({
  kind,
  color,
  width,
  height,
  size,
  onClick = () => {},
  isFillNone = false,
}: IconProps) => {
  // 根据 theme 类型，渲染不同类型的 icon
  let iconName = `#icon-${kind}`;
  if ((themeType === 'dark' || themeType === 'colorful') && !isFillNone) {
    iconName += `_${themeType}`;
  }
  const iconStyle = () => {
    const style: any = {};

    if (color) {
      style.color = color;
    }
    if (width) {
      style.width = px2vw(width) as string;
    }
    if (height) {
      style.height = px2vw(height) as string;
    }
    if (size) {
      style.width = style.height = px2vw(size) as string;
    }
    return style;
  };

  return (
    <svg
      className={classNames(
        'icon-theme',
        `icon-theme-${kind}`,
        `icon-theme-${toUnderscores(themeType || 'normal')}`,
      )}
      style={iconStyle()}
      onClick={onClick}
    >
      <use xlinkHref={iconName} />
    </svg>
  );
};

export default IconTheme;
