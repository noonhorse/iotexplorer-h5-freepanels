import React from 'react';
import { RoundDashboard } from '../components/round-dashboard';
import { CurrentSkinProps } from './SkinProps';
import classNames from 'classnames';
import './style.less';

import { getThemeType } from '@/business';
const themeType = getThemeType();

interface dashboardProps {
  width: number;
  height: number;
  value: number;
  valueWater: number; // 水位
  topTitle?: string;
  dashboardStatus: string;
}

const HumidifierDashboard: React.FC<dashboardProps> = props => {
  const {
    width,
    height,
    value,
    dashboardStatus,
    valueWater = 0,
    topTitle = ' '
  } = props;

  const skinProps = (CurrentSkinProps as any)[dashboardStatus];

  const { centerCicle } = skinProps;

  console.log(centerCicle);

  // 描述信息 关机/开机
  const renderDesWord = (dashboardStatus: string) => {
    return dashboardStatus === 'shutdown' ? (
      <div className="shutdown">已关机</div>
    ) : themeType === 'colorful' || themeType === 'morandi' ? (
      <div className="initiate">
        <div className="top-title">{topTitle}</div>
        <div className="number">
          <strong>{value}</strong>
          <span>%</span>
        </div>
        <div className="title">湿度设置</div>
        <div className="des">
          <span>当前水位</span>
          <span>｜</span>
          <span>{valueWater} level</span>
        </div>
      </div>
    ) : (
      <div className="initiate">
        <div className="title">湿度设置</div>
        <div className="number">
          <strong>{value}</strong>
          <span>%</span>
        </div>
        <div className="des">
          <span>当前水位</span>
          <span>｜</span>
          <span>{valueWater} level</span>
        </div>
      </div>
    );
  };

  console.log(skinProps, '====');

  return (
    <div>
      <div className={classNames('humidifier-dashboard-wrap', themeType)}>
        <RoundDashboard
          step={6}
          isOuterCicle={false}
          businessType="Humidifier"
          {...skinProps}
          {...props}
        />
        {renderDesWord(dashboardStatus)}
      </div>
    </div>
  );
};

export default HumidifierDashboard;
