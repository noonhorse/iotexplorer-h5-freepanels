/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-16 10:17:06
 * @LastEditors:
 * @LastEditTime:
 */

import React, { Component } from 'react';
import { DeviceSateContext } from '@src/panels/air-conditioner/deviceStateContext';
import classNames from 'classnames';
import { Card } from 'antd-mobile';
import './electricity.less';

class Electricity extends Component {
  render() {
    return (
      <DeviceSateContext.Consumer>
        {({ deviceData }) => (
          <article className={classNames('electricity-wrap')}>
            <Card className="flex">
              <section className="text-regular">
                <strong className="text-primary">
                  {deviceData.power_consumption}Kwh
                </strong>{' '}
                <br />
                耗电
              </section>
              <section className="text-regular">
                <strong className="text-primary">
                  {deviceData.temp_unit_convert === 'fahrenheit'
                    ? deviceData.temp_current_f
                    : deviceData.temp_current}
                  <i>&#176;</i>
                  {deviceData.temp_unit_convert === 'fahrenheit' ? 'F' : 'C'}
                </strong>{' '}
                <br />
                当前温度
              </section>
            </Card>
          </article>
        )}
      </DeviceSateContext.Consumer>
    );
  }
}

export default Electricity;
