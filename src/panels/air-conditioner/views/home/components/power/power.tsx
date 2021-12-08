/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-22 14:58:28
 * @LastEditors:
 * @LastEditTime:
 */
import React from 'react';
import { DeviceSateContext } from '@src/panels/air-conditioner/deviceStateContext';
// @ts-ignore
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import './power.less';
import { apiControlDeviceData } from '@src/utils/api';
import IconTheme from '@src/components/custom/common/icon/icon-theme';

export enum enumTempKey {
  celsius = 'temp_set',
  fahrenheit = 'temp_set_f'
}

export function Power() {
  // const [isPowerSwitch, setIsPowerSwitch] = useState(
  //   sdk.deviceData.power_switch || 0
  // );
  // 根据当前温度单位，控制最大值

  const handleToggle = (isAdd: boolean) => {
    const { temp_unit_convert } = sdk.deviceData;
    const action = (enumTempKey as any)[temp_unit_convert || 'celsius'];
    const max = temp_unit_convert === 'fahrenheit' ? 100 : 50; // 摄氏度
    const oldVal = sdk.deviceData[action] || 0;
    if (isAdd) {
      if (oldVal < max) {
        apiControlDeviceData({
          [action]: oldVal + 1,
        });
      }
    } else {
      if (oldVal > 0) {
        apiControlDeviceData({
          [action]: oldVal - 1,
        });
      }
    }
  };
  const handlePowerSwitch = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 0 ? 1 : 0,
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
              'btn-power-switch',
            )}
            onClick={handlePowerSwitch}
          >
            <IconTheme kind={'power'} size={82} />
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
