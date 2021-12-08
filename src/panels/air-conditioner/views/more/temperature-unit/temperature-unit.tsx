/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-29 09:51:47
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import { DeviceSateContext } from '@src/panels/air-conditioner/deviceStateContext';
import classNames from 'classnames';
import { Button, Switch } from '@src/components/custom/base';
import { Card, List } from 'antd-mobile';
import { apiControlDeviceData } from '@src/utils/api';
import './temperature-unit.less';
import { toggleBooleanByNumber } from '@src/utils';
import IconTheme from '@src/components/custom/common/icon/icon-theme';
import SetTemp from '@src/panels/air-conditioner/views/more/temperature-unit/set-temp/set-temp';

const TemperatureUnit = () => {
  const handleControlByAction = (key: string, value: any) => {
    apiControlDeviceData({
      [key]: value,
    });
  };

  const handleCommit = (value: string) => {
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
                {/* <SvgIcon*/}
                {/*  name="icon-temp_unit_convert"*/}
                {/*  className={'svg-icon'}*/}
                {/*  width={66}*/}
                {/*  height={56}*/}
                {/* />*/}
                温标切换
              </div>
            }
          >
            <div
              className={classNames('flex', 'space-between', 'btn-temperature')}
            >
              <Button
                className={classNames(deviceData.temp_unit_convert === 'celsius' ? 'active' : null)}
                onClick={() => {
                  handleCommit('celsius');
                }}
              >
                &#176;C
              </Button>
              <Button
                className={classNames(deviceData.temp_unit_convert === 'fahrenheit'
                  ? 'active'
                  : null)}
                onClick={() => {
                  handleCommit('fahrenheit');
                }}
              >
                &#176;F
              </Button>
            </div>
            <List>
              {/* 湿度设置*/}
              <SetTemp />
              <List.Item
                prefix={'3D扫风'}
                extra={
                  <Switch
                    name={''}
                    checked={toggleBooleanByNumber(deviceData.swing_3d)}
                    onChange={(value: boolean) => {
                      handleControlByAction('swing_3d', value);
                    }}
                  />
                }
              />
              <List.Item
                prefix={'烘干'}
                extra={
                  <Switch
                    name={''}
                    checked={toggleBooleanByNumber(deviceData.drying)}
                    onChange={(value: boolean) => {
                      handleControlByAction('drying', value);
                    }}
                  />
                }
              />
              <List.Item
                prefix={'自动'}
                extra={
                  <Switch
                    name={''}
                    checked={toggleBooleanByNumber(deviceData.auto)}
                    onChange={(value: boolean) => {
                      handleControlByAction('auto', value);
                    }}
                  />
                }
              />
              <List.Item
                prefix={'ECO模式'}
                extra={
                  <Switch
                    name={''}
                    checked={toggleBooleanByNumber(deviceData.eco)}
                    onChange={(value: boolean) => {
                      handleControlByAction('eco', value);
                    }}
                  />
                }
              />
              <List.Item
                prefix={'换气模式'}
                extra={
                  <Switch
                    name={''}
                    checked={toggleBooleanByNumber(deviceData.ventilation)}
                    onChange={(value: boolean) => {
                      handleControlByAction('ventilation', value);
                    }}
                  />
                }
              />
              <List.Item
                prefix={'负离子'}
                extra={
                  <Switch
                    name={''}
                    checked={toggleBooleanByNumber(deviceData.anion)}
                    onChange={(value: boolean) => {
                      handleControlByAction('anion', value);
                    }}
                  />
                }
              />
              <List.Item
                prefix={'自清洁'}
                extra={
                  <Switch
                    name={''}
                    checked={toggleBooleanByNumber(deviceData.cleaning)}
                    onChange={(value: boolean) => {
                      handleControlByAction('cleaning', value);
                    }}
                  />
                }
              />
              <List.Item
                prefix={'加热'}
                extra={
                  <Switch
                    name={''}
                    checked={toggleBooleanByNumber(deviceData.heat)}
                    onChange={(value: boolean) => {
                      handleControlByAction('heat', value);
                    }}
                  />
                }
              />
            </List>
          </Card>
        </>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default TemperatureUnit;
