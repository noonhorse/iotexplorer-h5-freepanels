/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-26 13:25:07
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import { DeviceSateContext } from '@src/panels/humidifier/deviceStateContext';
import classNames from 'classnames';
import './environment.less';
import { setDomClassActive } from '@/utils';
// import { Slider } from 'antd-mobile';

const Environment = () => {
  return (
    <DeviceSateContext.Consumer>
      {({ deviceData, deviceStatus }) => (
        <article className={classNames('environment')}>
          <div className={'environment-wrap'}>
            <div className={classNames('temperature')}>
              <strong
                className={classNames(
                  'font_72',
                  setDomClassActive(deviceStatus)
                )}
                aria-disabled
              >
                <span className={classNames('scale-wrap')}>
                  {deviceData.current_temp}
                </span>
                <i>&#176;</i>
                <span className={classNames('scale-wrap')}>
                  {deviceData.temp_unit_convert === 1 ? 'F' : 'C'}
                </span>
              </strong>
              <div>环境温度</div>
            </div>
            <span className="line" />
            <div className={classNames('humidity')}>
              <strong
                className={classNames(
                  'font_72',
                  setDomClassActive(deviceStatus)
                )}
              >
                <span className={classNames('scale-wrap')}>
                  {deviceData.current_humidity}%
                </span>
              </strong>
              <div>环境湿度</div>
            </div>
          </div>
          {/*<div className={classNames('progress', 'border-bottom')}>*/}
          {/*  <Slider ticks step={10} />*/}
          {/*</div>*/}
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default Environment;
