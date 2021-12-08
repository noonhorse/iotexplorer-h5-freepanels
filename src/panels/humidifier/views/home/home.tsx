import React from 'react';
import classNames from 'classnames';
import './home.less';
import { ToolsBar } from '@src/panels/humidifier/views/home/components/tools-bar/tools-bar';
import { Detail } from '@src/panels/humidifier/views/home/components/detail/detail';
import { DeviceSateContext } from '@src/panels/humidifier/deviceStateContext';
// import Ticker from '@src/components/custom/common/tiker/ticker';
import { enumWorkMode } from '@src/panels/humidifier/views/home/components/tools-bar/work-mode/work-mode';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import HumidifierDashboard from '@src/components/custom/business/round-dashboard/humidifier-dashboard';
export function Home() {
  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article
          className={classNames(
            'home',
            sdk.deviceData.power_switch === 0 && 'power-off',
          )}
        >
          {/* 工作模式*/}
          <h3 className={classNames('title', 'text-align-center')}>
            <strong className={classNames('font_48')}>
              {enumWorkMode[deviceData.work_mode]}
            </strong>
          </h3>
          {/* 仪表盘*/}
          <section className={classNames('dashboard')}>
            <HumidifierDashboard
              width={760}
              height={676}
              value={deviceData.set_humidity || 0}
              valueWater={deviceData.current_level}
              topTitle={enumWorkMode[deviceData.work_mode]}
              dashboardStatus={
                deviceData.power_switch === 1 ? 'initiate' : 'shutdown'
              }
            />
            {/* <Ticker*/}
            {/*  title={'温度设置'}*/}
            {/*  text={'当前水位|1level'}*/}
            {/*  value={'96'}*/}
            {/*  unit={'%'}*/}
            {/* />*/}
          </section>
          {/* 工具栏*/}
          <ToolsBar />
          {/* 详情区域*/}
          <Detail />
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
}
