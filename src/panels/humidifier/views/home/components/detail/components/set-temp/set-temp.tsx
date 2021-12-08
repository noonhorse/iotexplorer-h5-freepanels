/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-30 16:18:21
 * @LastEditors:
 * @LastEditTime:
 */
import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import { DeviceSateContext } from '@src/panels/humidifier/deviceStateContext';
import UINumberSlider from '@src/components/custom/common/number-slider/ui-number-slider';
import { apiControlDeviceData } from '@src/utils/api';
import classNames from 'classnames';
import './set-temp.less';

export const debounce = (
  fn: { apply: (arg0: any, arg1: any) => void },
  t: number,
  immediate = false
) => {
  let timeId: any = null;
  const delay = t || 500;
  return function (this: any, ...args: any) {
    if (timeId) {
      clearTimeout(timeId);
      immediate = false;
    }
    const later = () => {
      timeId = null;
      fn.apply(this, args);
    };
    timeId = setTimeout(later, delay);
    if (immediate) fn.apply(this, args);
  };
};

const SetTemp = () => {
  const upDate = (value: number) => {
    apiControlDeviceData({
      set_temp: value
    });
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <div className={classNames('set-temp-wrap', 'border-bottom')}>
          <UINumberSlider
            max={deviceData.temp_unit_convert === 1 ? 100 : 50}
            min={0}
            defaultValue={deviceData.set_temp}
            onAfterChange={(value: any) => {
              upDate(value);
            }}
          />
          <div className={classNames('text-align-center', 'ui-slider-bar')}>
            室内温度：{deviceData.set_temp}
          </div>
        </div>
      )}
    </DeviceSateContext.Consumer>
  );
};

//SetTemp.propTypes = {
//};

export default SetTemp;
