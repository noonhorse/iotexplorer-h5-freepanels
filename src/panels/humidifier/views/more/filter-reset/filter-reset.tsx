/**
 * @Description:滤芯复位
 * @Author: RuiXue
 * @Date: 2021-09-29 09:01:12
 * @LastEditors:
 * @LastEditTime:
 */

import React, { useState } from 'react';
import { DeviceSateContext } from '@src/panels/humidifier/deviceStateContext';
import classNames from 'classnames';
import { Card, List } from 'antd-mobile';
import { Modal } from '@src/components/custom/base';
import './filter-reset.less';
import { apiControlDeviceData } from '@src/utils/api';

const FilterReset = () => {
  const [isShow, setIsShow] = useState(false);

  const handleCommit = () => {
    apiControlDeviceData({
      filter_reset: 1
    });
  };

  const handleOpen = () => {
    setIsShow(true);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article className={classNames('filter-reset-wrap')}>
          <Card>
            <List>
              <List.Item prefix={'滤芯复位'} onClick={handleOpen} />
            </List>
          </Card>
          <Modal
            visible={isShow}
            onClose={handleClose}
            onConfirm={handleCommit}
            confirmText={'完成'}
          >
            <div className={classNames('text-align-center', 'text-margin')}>
              确定要复位滤网吗?
            </div>
          </Modal>
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default FilterReset;
