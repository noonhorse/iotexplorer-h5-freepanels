/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-22 14:58:28
 * @LastEditors:
 * @LastEditTime:
 */
import React from 'react';
import { DeviceSateContext } from '@src/panels/humidifier/deviceStateContext';
// @ts-ignore
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import './power.less';
import { apiControlDeviceData } from '@src/utils/api';
import IconTheme from '@src/components/custom/common/icon/icon-theme';

export enum enumTempKey {
  set_temp,
  set_fahrenheit
}

export function Power() {
  // const [isPowerSwitch, setIsPowerSwitch] = useState(
  //   sdk.deviceData.power_switch || 0
  // );
  //根据当前温度单位，控制最大值

  /*按钮改为控制湿度*/
  const handleToggle = (isAdd: boolean) => {
    const oldVal = sdk.deviceData.set_humidity || 0;
    if (isAdd) {
      if (oldVal < 100)
        apiControlDeviceData({
          set_humidity: oldVal + 1
        });
    } else {
      if (oldVal > 0)
        apiControlDeviceData({
          set_humidity: oldVal - 1
        });
    }

    // const { temp_unit_convert } = sdk.deviceData;
    // const action = enumTempKey[temp_unit_convert || 0];
    // const max = temp_unit_convert === 1 ? 100 : 50;
    // const oldVal = sdk.deviceData[action] || 0;
    // if (isAdd) {
    //   if (oldVal < max) {
    //     apiControlDeviceData({
    //       [action]: oldVal + 1
    //     });
    //   }
    // } else {
    //   if (oldVal > 0) {
    //     apiControlDeviceData({
    //       [action]: oldVal - 1
    //     });
    //   }
    // }
  };
  const handlePowerSwitch = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 0 ? 1 : 0
    });
  };
  return (
    <DeviceSateContext.Consumer>
      {() => (
        <article className={classNames('power-tools-bar', 'border-bottom')}>
          <button
            className={classNames('button-circle', 'box-shadow', 'reduce')}
            onClick={() => {
              handleToggle(false);
            }}
          >
            <IconTheme kind={'reduce'} size={82} />
          </button>
          <button
            id={'power'}
            className={classNames(
              'button-circle',
              'box-shadow',
              'btn-power-switch'
            )}
            onClick={handlePowerSwitch}
          >
            <IconTheme kind={'power_humidifier'} size={94} />
          </button>
          <button
            className={classNames('button-circle', 'box-shadow', 'add')}
            onClick={() => {
              handleToggle(true);
            }}
          >
            <IconTheme kind={'add'} size={82} />
          </button>
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
}
