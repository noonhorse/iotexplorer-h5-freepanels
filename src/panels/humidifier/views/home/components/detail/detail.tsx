import React from 'react';
import './detail.less';
import { DeviceSateContext } from '@src/panels/humidifier/deviceStateContext';
import { Power } from '@src/panels/humidifier/views/home/components/detail/components/power/power';
// import { useDeviceData } from '@src/hooks/useDeviceData';
// import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
// const IconAdd = require('@/assets/icons/common/power.svg');
import classNames from 'classnames';
import Environment from '@src/panels/humidifier/views/home/components/detail/components/environment/environment';
import Position from '@src/panels/humidifier/views/home/components/detail/components/position/position';
import UINumberSlider from '@src/components/custom/common/number-slider/ui-number-slider';
import SetTemp from '@src/panels/humidifier/views/home/components/detail/components/set-temp/set-temp';

/**
 * 首页-详情盒子
 */
// class Detail extends Component {
//   constructor(props: {} | Readonly<{}>) {
//     super(props);
//   }
//
//   componentDidMount() {}
//
//   render() {
//     return (
//       <article>
//         +++
//         <DeviceSateContext.Consumer>
//           {({ deviceStatus, togglePower }) => (
//             <div>
//               <Power />
//               <div>{deviceStatus}</div>
//             </div>
//           )}
//         </DeviceSateContext.Consumer>
//       </article>
//     );
//   }
// }
//
// export default Detail;

export function Detail() {
  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article className={classNames('detail')}>
          {/* 电源操作栏*/}
          <Power />
          {/* 温度和湿度*/}
          <Environment />
          {/* 温度设置*/}
          <SetTemp />
          {/* 地理信息部分*/}
          <Position />
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
}
