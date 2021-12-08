/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-22 19:37:30
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import './more.less';
import TemperatureUnit from '@src/panels/air-conditioner/views/more/temperature-unit/temperature-unit';
import Electricity from '@src/panels/air-conditioner/views/more/electricity/electricity';
import WindType from '@src/panels/air-conditioner/views/more/wind-type/wind-type';
import CloudTiming from '@src/panels/air-conditioner/views/more/cloud-timing/cloud-timing';

export function More() {
  return (
    <div className="more-wrap">
      {/*电量显示*/}
      <Electricity />
      {/*风向和风量*/}
      <WindType />
      {/*温标切换功能组*/}
      <TemperatureUnit />
      {/*云定时*/}
      <CloudTiming />
    </div>
  );
}
