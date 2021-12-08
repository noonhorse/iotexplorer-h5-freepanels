/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-16 14:58:45
 * @LastEditors:
 * @LastEditTime:
 */

import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { DeviceSateContext } from '@src/panels/air-conditioner/deviceStateContext';
import classNames from 'classnames';
import { Card, List } from 'antd-mobile';
import { useHistory } from 'react-router-dom';

const CloudTiming = () => {
  const history = useHistory();
  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <Card className={classNames('CloudTiming-wrap')}>
          <List>
            <List.Item
              prefix={'云定时'}
              extra={''}
              onClick={() => {
                history.replace('/timer');
              }}
            />
          </List>
        </Card>
      )}
    </DeviceSateContext.Consumer>
  );
};

//CloudTiming.propTypes = {
//};

export default CloudTiming;
