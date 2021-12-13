import { useReducer } from 'react';

export interface DeviceDataState {
  deviceData: any;
  deviceStatus: 0 | 1;
  templateMap: any;
  templateList: any[];
}

function reducer(
  state: DeviceDataState,
  action: {
    type: string;
    payload: any;
  },
) {
  const { type, payload } = action;

  switch (type) {
    case 'data': {
      const { deviceData } = state;

      Object.keys(payload || {}).forEach((key) => {
        deviceData[key] = payload[key].Value;
      });

      return {
        ...state,
        deviceData,
      };
    }
    case 'status':
      return {
        ...state,
        deviceStatus: payload,
      };
  }

  return state;
}

function initState(sdk: any) {
  const templateMap: any = {};

  // 过滤掉 string 和 timestamp 类型
  const templateList = sdk.dataTemplate.properties.filter((item: any) => {
    if (item.define.type !== 'string' && item.define.type !== 'timestamp') {
      templateMap[item.id] = item;

      return true;
    }

    return false;
  });

  return {
    templateMap,
    templateList,
    deviceData: sdk.deviceData,
    deviceStatus: sdk.deviceStatus,
  };
}

export function useDeviceData(sdk: any) {
  const [state, dispatch] = useReducer(reducer, sdk, initState);

  const onDeviceDataChange = (deviceData: any) => {
    dispatch({
      type: 'data',
      payload: deviceData,
    });
  };

  const onDeviceStatusChange = (deviceStatus: 0 | 1) => {
    dispatch({
      type: 'status',
      payload: deviceStatus,
    });
  };

  return [
    state,
    {
      onDeviceDataChange,
      onDeviceStatusChange,
    },
  ];
}
