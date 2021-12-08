/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-22 19:37:30
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import './more.less';
import FilterReset from '@src/panels/humidifier/views/more/filter-reset/filter-reset';
import Features from '@src/panels/humidifier/views/more/features/features';
import TemperatureUnit from '@src/panels/humidifier/views/more/temperature-unit/temperature-unit';
import Features2 from '@src/panels/humidifier/views/more/features2/features2';

export function More() {
  return (
    <div className="more-wrap">
      {/* 功能组*/}
      <Features />
      {/* 温标切换*/}
      <TemperatureUnit />
      {/* 滤芯复位*/}
      <FilterReset />
      {/* 功能组2*/}
      <Features2 />
    </div>
  );
}
