/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-29 09:55:40
 * @LastEditors:
 * @LastEditTime:
 */

import React, { useState } from 'react';
import { DeviceSateContext } from '@src/panels/humidifier/deviceStateContext';
import classNames from 'classnames';
import { Card, List } from 'antd-mobile';
import { Switch } from '@src/components/custom/base';
import { toggleBooleanByNumber } from '@/utils';
import ModalSprayVolume, {
  enumSprayVolume,
} from '@src/panels/humidifier/views/more/features2/modalSprayVolume/modalSprayVolume';
import ModalSprayMode, {
  enumSprayMode,
} from '@src/panels/humidifier/views/more/features2/modalSprayMode/modalSprayMode';
import { apiControlDeviceData } from '@src/utils/api';

export const enumSpray = {};

const Features2 = () => {
  const [isShowModalSprayVolume, setIsShowModalSprayVolume] = useState(false);
  const [isShowModalSprayMode, setIsShowModalSprayMode] = useState(false);

  const handleControlByAction = (key: string, value: any) => {
    apiControlDeviceData({
      [key]: value,
    });
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article className={classNames('Features2-wrap')}>
          <Card>
            <List>
              {/* PRD没有此属性*/}
              {/* <List.Item prefix={'喷雾开关'} extra={<Switch name={''} />} />*/}
              <List.Item
                prefix={'喷雾量'}
                extra={enumSprayVolume[deviceData.spray_volume] || ''}
                onClick={() => {
                  setIsShowModalSprayVolume(true);
                }}
              />
              <List.Item
                prefix={'喷雾模式'}
                extra={enumSprayMode[deviceData.spray_mode]}
                onClick={() => {
                  setIsShowModalSprayMode(true);
                }}
              />
              <List.Item
                prefix={'睡眠'}
                extra={
                  <Switch
                    name={''}
                    checked={toggleBooleanByNumber(deviceData.sleep)}
                    onChange={(value: boolean) => {
                      handleControlByAction('sleep', value);
                    }}
                  />
                }
              />
              <List.Item
                prefix={'童锁开关'}
                extra={
                  <Switch
                    name={''}
                    checked={toggleBooleanByNumber(deviceData.childjock)}
                    onChange={(value: boolean) => {
                      handleControlByAction('childjock', value);
                    }}
                  />
                }
              />
              <List.Item prefix={'滤网寿命'} extra={deviceData.filterlife} />
              <List.Item
                prefix={'等离子'}
                extra={
                  <Switch
                    name={''}
                    checked={toggleBooleanByNumber(deviceData.plasma)}
                    onChange={(value: boolean) => {
                      handleControlByAction('plasma', value);
                    }}
                  />
                }
              />
            </List>
          </Card>
          {/* 喷雾量弹窗*/}
          <ModalSprayVolume
            isShow={isShowModalSprayVolume}
            onClose={() => {
              setIsShowModalSprayVolume(false);
            }}
          />
          {/* 喷雾类型弹窗*/}
          <ModalSprayMode
            isShow={isShowModalSprayMode}
            onClose={() => {
              setIsShowModalSprayMode(false);
            }}
          />
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default Features2;
