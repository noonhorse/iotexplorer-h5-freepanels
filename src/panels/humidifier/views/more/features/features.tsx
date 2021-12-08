/**
 * @Description: 功能组
 * @Author: RuiXue
 * @Date: 2021-09-29 09:26:13
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import { DeviceSateContext } from '@src/panels/humidifier/deviceStateContext';
import classNames from 'classnames';
import { Card, List } from 'antd-mobile';
import { Switch } from '@src/components/custom/base';
import { toggleBooleanByNumber } from '@/utils';
import { apiControlDeviceData } from '@src/utils/api';
import { useHistory } from 'react-router-dom';

const Features = () => {
  const history = useHistory();
  const handleControlByAction = (key: string, value: any) => {
    apiControlDeviceData({
      [key]: value
    });
  };
  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article className={classNames('Featured-wrap')}>
          <Card>
            <List>
              <List.Item
                prefix={'定时'}
                onClick={() => {
                  history.replace('/timer');
                }}
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
                prefix={'香薰'}
                extra={
                  <Switch
                    name={''}
                    checked={toggleBooleanByNumber(deviceData.fragrance)}
                    onChange={(value: boolean) => {
                      handleControlByAction('fragrance', value);
                    }}
                  />
                }
              />
              <List.Item
                prefix={'除菌'}
                extra={
                  <Switch
                    name={''}
                    checked={toggleBooleanByNumber(deviceData.sterilization)}
                    onChange={(value: boolean) => {
                      handleControlByAction('sterilization', value);
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
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default Features;
