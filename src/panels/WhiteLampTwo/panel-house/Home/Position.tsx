import React, { useState } from 'react';
import { StyledProps } from '@libs/global';
import { Circular } from '@custom/Circular';
import { Icon } from '@custom/Icon';
export interface LightColorProps extends StyledProps {
  defaultValue?: number; // 0 - 1000
}
export function Position({
  deviceData: { brightness = 80, color_mode, set_temp = 150, power_switch },
  doControlDeviceData,
}) {
  const [deg, setDeg] = useState((set_temp * 360) / 1000);
  const isPowerOff = power_switch !== 1;
  const onChange = (deg) => {
    setDeg(deg);
    doControlDeviceData('set_temp', Math.round((deg * 1000) / 360));
  };
  const onSwitchChange = () => {
    doControlDeviceData({ power_switch: power_switch ? 0 : 1 });
  };
  const cls = isPowerOff ? 'off-switch' : 'on-switch';
  const sceneCls = color_mode === 1 ? 'scene-type' : '';
  // TODO 需要找设计给图
  return (
    <div className={`position_card  center ${cls} ${sceneCls}`}>
      <div className="main-bg center">
        <div className="circle-ring" onClick={onSwitchChange}>
          <div className="bg">
            <div
              className="circle outer center"
              style={{ opacity: brightness / 100 }}
            >
              <div className="circle inner"></div>
            </div>
            <div className="bg-img center">
              <Icon name={isPowerOff ? 'switch' : 'switch-checked'}></Icon>
            </div>
          </div>
          <Circular value={deg} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}
