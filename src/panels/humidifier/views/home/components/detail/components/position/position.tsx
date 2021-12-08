/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-27 14:38:56
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import classNames from 'classnames';
import './position.less';
import { DeviceSateContext } from '@src/panels/humidifier/deviceStateContext';
import { setDomClassActive } from '@/utils';

const Position = () => {
  return (
    <DeviceSateContext.Consumer>
      {({ deviceStatus, deviceData }) => (
        <div className={classNames('position-wrap', 'text-align-center')}>
          <ul className={classNames('flex', 'space-between')}>
            <li>
              <strong
                className={classNames(
                  'font_60',
                  setDomClassActive(deviceStatus)
                )}
              >
                {deviceData.eco2}ppm
              </strong>
              <br />
              eCO2
            </li>
            <li>
              <strong
                className={classNames(
                  'font_60',
                  setDomClassActive(deviceStatus)
                )}
              >
                {deviceData.pm25 || 0}
              </strong>
              <br />
              PM2.5
            </li>
            <li>
              <strong
                className={classNames(
                  'font_60',
                  setDomClassActive(deviceStatus)
                )}
              >
                {deviceData.tvoc}ppm
              </strong>
              <br />
              TVOC
            </li>
          </ul>
          {/*<ul className={classNames('position-row', 'flex', 'space-between')}>*/}
          {/*  <li>*/}
          {/*    <strong*/}
          {/*      className={classNames(*/}
          {/*        'font_60',*/}
          {/*        setDomClassActive(deviceStatus)*/}
          {/*      )}*/}
          {/*    >*/}
          {/*      {deviceData.position}*/}
          {/*    </strong>*/}
          {/*    <br />*/}
          {/*    位置*/}
          {/*  </li>*/}
          {/*  <li />*/}
          {/*  <li>*/}
          {/*    <strong*/}
          {/*      className={classNames(*/}
          {/*        'font_60',*/}
          {/*        setDomClassActive(deviceStatus)*/}
          {/*      )}*/}
          {/*    >*/}
          {/*      {deviceData.weather}*/}
          {/*    </strong>*/}
          {/*    <br />*/}
          {/*    天气*/}
          {/*  </li>*/}
          {/*</ul>*/}
        </div>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default Position;
