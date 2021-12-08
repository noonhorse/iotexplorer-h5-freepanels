/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-16 11:33:05
 * @LastEditors:
 * @LastEditTime:
 */

import React, { useRef, useState } from 'react';
import { DeviceSateContext } from '@src/panels/air-conditioner/deviceStateContext';
import classNames from 'classnames';
import { Card, List } from 'antd-mobile';
import UINumberSlider from '@src/components/custom/common/number-slider/ui-number-slider';
import './wind-type.less';
import UpDown, {
  enumUpDown,
} from '@src/panels/air-conditioner/views/more/wind-type/components/up-down/up-down';
import { Modal } from '@src/components/custom/base';
// import WorkMode from '@src/panels/air-conditioner/views/home/components/tools-bar/work-mode/work-mode';
// import Gear from '@src/panels/air-conditioner/views/home/components/tools-bar/gear/gear';
import LeftRight, {
  enumLeftRight,
} from '@src/panels/air-conditioner/views/more/wind-type/components/left-right/left-rigth';
import { apiControlDeviceData } from '@src/utils/api';

// const saveWindNumberByType = (type: string, val: any) => {
//   if (!type) return;
//   if (type === 'upDown') {
//     apiControlDeviceData({
//       angle_vertical: val
//     });
//   } else {
//     apiControlDeviceData({
//       angle_horizontal: val
//     });
//   }
// };

const WindType = () => {
  const [modalType, setModalType] = useState('');
  const cRefUpDown = useRef();
  const cRefLeftRight = useRef();
  const handleCommit = () => {
    if (modalType === 'upDown') {
      (cRefUpDown.current as any).commit();
    } else {
      (cRefLeftRight.current as any).commit();
    }
  };

  const handleClose = () => {
    setModalType('');
  };

  const toggleTitleModal = () => {
    if (modalType === 'upDown') {
      return '上下摆风档位';
    }
    return '左右摆风档位';
  };
  const toggleChildren = () => {
    if (modalType === 'upDown') {
      return <UpDown cRef={cRefUpDown} />;
    }
    return <LeftRight cRef={cRefLeftRight} />;
  };

  const handleClick = (name: string) => {
    setModalType(name);
  };
  const saveWindGear = (key: string, val: string) => {
    apiControlDeviceData({
      [key]: val,
    });
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <>
          <Card className={classNames('WindType-wrap')}>
            <List>
              <List.Item
                prefix={'上下摆风档位'}
                extra={enumUpDown[deviceData.gear_vertical]}
                onClick={() => {
                  handleClick('upDown');
                }}
              />
            </List>
            <List className={classNames('ui-number-slider-wrap')}>
              <UINumberSlider
                max={180}
                step={1}
                onChange={(value: any) => {
                  saveWindGear('angle_vertical', value);
                }}
                defaultValue={deviceData.angle_vertical}
                onAfterChange={(value: any) => {
                  saveWindGear('angle_vertical', value);
                }}
              />
            </List>
            <List>
              <List.Item
                prefix={'左右摆风档位'}
                extra={enumLeftRight[deviceData.gear_horizontal]}
                onClick={() => {
                  handleClick('leftRight');
                }}
              />
            </List>
            <List className={classNames('ui-number-slider-wrap')}>
              <UINumberSlider
                max={180}
                step={1}
                defaultValue={deviceData.angle_horizontal}
                onChange={(value: any) => {
                  saveWindGear('angle_horizontal', value);
                }}
                onAfterChange={(value: any) => {
                  saveWindGear('angle_horizontal', value);
                }}
              />
            </List>
          </Card>
          <Modal
            title={toggleTitleModal()}
            visible={!!modalType}
            onConfirm={handleCommit}
            onClose={handleClose}
          >
            {toggleChildren()}
          </Modal>
        </>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default WindType;
