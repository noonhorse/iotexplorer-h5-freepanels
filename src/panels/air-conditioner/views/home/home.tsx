import Device from '@src/panels/air-conditioner/views/home/components/device/device';
import { DeviceSateContext } from '../../deviceStateContext';
import Environment from '@src/panels/air-conditioner/views/home/components/environment/environment';
import { Power } from '@src/panels/air-conditioner/views/home/components/power/power';
import React from 'react';
import { ToolsBar } from '@src/panels/air-conditioner/views/home/components/tools-bar/tools-bar';
import classNames from 'classnames';
import { getThemeType } from '@src/utils/business';
// @ts-ignore
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
const themeType = getThemeType();
export function Home() {
  const domPosition = () => {
    switch (themeType) {
      case 'normal':
        return [
          <ToolsBar key={'toolsBar'} />,
          <Power key={'power'} />,
          <Environment key={'environment'} />
        ];
      case 'blueWhite':
      case 'dark':
      case 'colorful':
      case 'morandi':
        return [
          <Power key={'power'} />,
          <Environment key={'environment'} />,
          <ToolsBar key={'toolsBar'} />
        ];
      default:
        return [
          <ToolsBar key={'toolsBar'} />,
          <Power key={'power'} />,
          <Environment key={'environment'} />
        ];
    }
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article
          className={classNames(
            'home',
            sdk.deviceData.power_switch === 0 && 'power-off'
          )}
        >
          <Device />
          {domPosition()}
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
}
