/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-29 17:20:54
 * @LastEditors:
 * @LastEditTime:
 */

import { List, Radio } from 'antd-mobile';
import React, { useState } from 'react';

import { DeviceSateContext } from '@src/panels/humidifier/deviceStateContext';
import IconChecked from '@src/components/custom/base/icon-checked/icon-checked';
import { Modal } from '@src/components/custom/base';
import ModalSprayVolume from '@src/panels/humidifier/views/more/features2/modalSprayVolume/modalSprayVolume';
import PropTypes from 'prop-types';
import { apiControlDeviceData } from '../../../@src/utils/api';
import classNames from 'classnames';
import { enumToArray } from '@/utils';
import { stringKey } from '@/global';

/**
 * 喷雾模式
 * humidity -潮湿 manual -壬动 auto -自动 work-工作 health -健康 baby -亲亲 sleep -睡眠
 */
export const enumSprayMode: stringKey = {
  humidity: '恒湿',
  manual: '手动',
  auto: '自动',
  work: '工作',
  health: '健康'
};

// @ts-ignore
// eslint-disable-next-line react/prop-types
const ModalSprayMode = ({ isShow, onClose }) => {
  const [dataUser, setDataUser] = useState();
  const handleCommit = () => {
    apiControlDeviceData({
      spray_mode: dataUser
    });
    onClose();
  };

  const domList = enumToArray(enumSprayMode).map(({ label, value }) => (
    <List.Item
      key={label}
      prefix={value}
      extra={
        <Radio
          value={label}
          icon={checked => <IconChecked isChecked={checked} />}
        />
      }
    />
  ));

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <Modal
          title={'喷雾模式'}
          visible={isShow}
          onClose={onClose}
          onConfirm={handleCommit}
          confirmText={'完成'}
        >
          <Radio.Group
            value={dataUser}
            onChange={(val: any) => {
              setDataUser(val);
            }}
          >
            <List className={classNames('no-border')}>{domList}</List>
          </Radio.Group>
        </Modal>
      )}
    </DeviceSateContext.Consumer>
  );
};

ModalSprayVolume.propTypes = {
  isShow: PropTypes.bool,
  onClose: PropTypes.func
};

export default ModalSprayMode;
