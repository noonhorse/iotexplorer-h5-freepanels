/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-29 09:51:47
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import { DeviceSateContext } from '@src/panels/humidifier/deviceStateContext';
import classNames from 'classnames';
import { Button } from '@src/components/custom/base';
import { Card } from 'antd-mobile';
import { apiControlDeviceData } from '@src/utils/api';
import './temperature-unit.less';
import { SvgIcon } from '@src/components/custom/common/icon';
import IconTheme from '@src/components/custom/common/icon/icon-theme';

const TemperatureUnit = () => {
  const handleCommit = (value: number) => {
    apiControlDeviceData({
      temp_unit_convert: value,
    });
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <>
          <Card
            className={classNames('temperatureUnit-wrap')}
            title={
              <div>
                <IconTheme kind={'temp_unit_convert'} width={66} height={56} />
                温标切换
              </div>
            }
          >
            <div
              className={classNames('flex', 'space-between', 'btn-temperature')}
            >
              <Button
                className={classNames(deviceData.temp_unit_convert === 0 ? 'active' : null)}
                onClick={() => {
                  handleCommit(0);
                }}
              >
                &#176;C
              </Button>
              <Button
                className={classNames(deviceData.temp_unit_convert === 1 ? 'active' : null)}
                onClick={() => {
                  handleCommit(1);
                }}
              >
                &#176;F
              </Button>
            </div>
          </Card>
        </>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default TemperatureUnit;
