import React from 'react';
import { LightBright } from '@custom/LightBright';

const LightBrightPage = ({ deviceData: { brightness, power_switch }, doControlDeviceData }) => (
  <div className={`light-bright ${power_switch ? 'on-switch' : 'off-switch'}`}>
    <LightBright
      defaultValue={brightness}
      status={power_switch}
      onChange={(brightness, endTouch) => endTouch && doControlDeviceData({ brightness })}
    />
  </div>
);

export default LightBrightPage;
