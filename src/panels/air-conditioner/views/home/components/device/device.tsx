/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-13 18:58:24
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import './device.less';
import classNames from 'classnames';
import IconTheme from '@src/components/custom/common/icon/icon-theme';
import { DeviceSateContext } from '@src/panels/air-conditioner/deviceStateContext';
const airDeviceImg = require('./images/air_device.png');
const Device = () => (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article className="device-wrap">
          <img
            className={'icon-theme-air_conditioner'}
            src={airDeviceImg}
            alt=""
          />
          {deviceData.power_switch === 1 && <IconTheme kind={'air_cloud'} />}
          <section className="content">
            <div className={classNames('text-primary')}>
              <span>
                {deviceData.temp_unit_convert === 'fahrenheit'
                  ? deviceData.temp_set_f
                  : deviceData.temp_set}
              </span>
              <i>&#176;</i>
              <span>C</span>
            </div>
            <div>
              当前温度{' '}
              {deviceData.temp_unit_convert === 'fahrenheit'
                ? deviceData.temp_current_f
                : deviceData.temp_current}
              <i>&#176;</i>
              {deviceData.temp_unit_convert === 'fahrenheit' ? 'F' : 'C'}
            </div>
          </section>
        </article>
      )}
    </DeviceSateContext.Consumer>
);

Device.propTypes = {};

export default Device;
