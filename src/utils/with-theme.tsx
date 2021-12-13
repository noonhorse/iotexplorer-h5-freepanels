/*
 * @Author: wrq
 * @Date: 2021-10-04 19:43:05
 * @Description:
 */
import React from 'react';
import { getThemeType } from '@src/utils/business';
import { toUnderscores } from '.';

export function withTheme(WrappedComponent: React.ReactNode) {
  // 给 body 增加主题标识的 className
  const { body } = document;
  console.log('get bodyed....');
  const theme = getThemeType();
  body.classList.add(`theme_${toUnderscores(theme)}`);

  return WrappedComponent;
}
